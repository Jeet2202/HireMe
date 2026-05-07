"""
Voice Navigator API route.

POST /voice  — Main voice interaction endpoint.
GET  /init   — System-first greeting (shortened, plays once).
POST /seed   — Seed sample jobs into MongoDB (dev utility).

Pipeline: Audio → STT → Intent → Business Logic → TTS → Response
"""

import logging
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services.stt import speech_to_text
from app.services.intent import detect_intent
from app.services.tts import text_to_speech
from app.services import jobs as job_service

logger = logging.getLogger(__name__)

router = APIRouter()


# ── Bilingual message dictionary ─────────────────────────────────

MSG = {
    "welcome": {
        "hi": "Namaste {name} ji. Aapke liye {count} kaam uplabdh hain. 'Best job' bolein shuru karne ke liye.",
        "en": "Welcome {name}. You have {count} jobs available. Say 'best job' to start.",
    },
    "welcome_empty": {
        "hi": "Namaste {name} ji. Abhi koi kaam uplabdh nahi hai.",
        "en": "Welcome {name}. No jobs available right now.",
    },
    "how_can_help": {
        "hi": "Haan, batayein?",
        "en": "How can I help you?",
    },
    "stt_fail": {
        "hi": "Aapki awaaz nahi suni. Kripya dobara bolein.",
        "en": "I didn't catch that. Please try again.",
    },
    "unknown_intent": {
        "hi": "Samajh nahi aaya. 'Best job', 'next', 'accept', ya 'stop' bolein.",
        "en": "I didn't understand. Say 'best job', 'next', 'accept', or 'stop'.",
    },
    "no_jobs": {
        "hi": "Abhi koi kaam uplabdh nahi hai.",
        "en": "No jobs available right now.",
    },
    "no_more_jobs": {
        "hi": "Aur koi kaam uplabdh nahi hai.",
        "en": "No more jobs available.",
    },
    "want_accept": {
        "hi": " Kya aap yeh kaam lena chahte hain?",
        "en": " Do you want to accept this job?",
    },
    "no_job_selected": {
        "hi": "Koi kaam select nahi hua. 'Best job' bolein.",
        "en": "No job selected. Say 'best job' first.",
    },
    "confirm_accept": {
        "hi": "Kya aap pakka yeh kaam lena chahte hain? Haan ya naa bolein.",
        "en": "Are you sure you want to accept? Say yes or no.",
    },
    "confirm_reject": {
        "hi": "Kya aap pakka yeh kaam nahi chahte? Haan ya naa bolein.",
        "en": "Are you sure you want to reject? Say yes or no.",
    },
    "accepted": {
        "hi": "Bahut accha! Kaam accept ho gaya. 'Next job' bolein aage ke liye.",
        "en": "Job accepted! Say 'next job' to continue.",
    },
    "accept_fail": {
        "hi": "Kaam accept nahi ho saka. Dobara try karein.",
        "en": "Could not accept. Please try again.",
    },
    "rejected": {
        "hi": "Theek hai, skip kar diya. 'Next job' bolein.",
        "en": "Job skipped. Say 'next job' to continue.",
    },
    "reject_fail": {
        "hi": "Kaam reject nahi ho saka. Dobara try karein.",
        "en": "Could not reject. Please try again.",
    },
    "cancelled": {
        "hi": "Theek hai, ruk jaate hain. Aap kya karna chahenge?",
        "en": "Cancelled. What would you like to do?",
    },
    "say_yes_no": {
        "hi": "Kripya haan ya naa bolein.",
        "en": "Please say yes or no.",
    },
    "goodbye": {
        "hi": "Theek hai, band karta hoon. Phir milenge!",
        "en": "Goodbye! Talk to you later.",
    },
    "show_jobs": {
        "hi": "Aapke job requests khol raha hoon.",
        "en": "Opening your job requests.",
    },
    "open_profile": {
        "hi": "Aapki profile khol raha hoon.",
        "en": "Opening your profile.",
    },
    "toggle_online": {
        "hi": "Aapka status change kar raha hoon.",
        "en": "Toggling your availability.",
    },
    "best_job_intro": {
        "hi": "Sabse accha kaam: ",
        "en": "Best job: ",
    },
}


def t(key: str, lang: str = "hi", **kwargs) -> str:
    """Get a translated message string."""
    template = MSG.get(key, {}).get(lang, MSG.get(key, {}).get("en", ""))
    return template.format(**kwargs) if kwargs else template


# ── Session state ────────────────────────────────────────────────

class SessionState:
    """Tracks per-session voice navigator state."""

    def __init__(self):
        self.current_job: Optional[dict] = None
        self.current_index: int = -1
        self.last_response: str = ""
        self.pending_action: Optional[str] = None


session = SessionState()


# ── Response models ──────────────────────────────────────────────

class VoiceResponse(BaseModel):
    """Response payload for the voice endpoint."""
    text: str
    audio: str
    intent: str
    state: str
    user_text: str = ""       # STT transcript for visual feedback
    ui_action: Optional[str] = None  # Frontend action command


class InitResponse(BaseModel):
    """Response for the voice init endpoint."""
    text: str
    audio: str
    state: str


# ── Initialization endpoint ──────────────────────────────────────

@router.get("/init", response_model=InitResponse)
async def voice_init(
    user_name: str = "User",
    is_first_time: bool = True,
    lang: str = "hi",
):
    """
    Initialize a voice session.
    - First time: short greeting with job count.
    - Subsequent: just "How can I help?"
    """
    try:
        # Reset session
        session.current_job = None
        session.current_index = -1
        session.pending_action = None

        if not is_first_time:
            greeting = t("how_can_help", lang)
            session.last_response = greeting
            try:
                audio_b64 = await text_to_speech(greeting, lang)
            except Exception:
                audio_b64 = ""
            return InitResponse(text=greeting, audio=audio_b64, state="idle")

        # First time — short intro with job count
        total = await job_service.get_job_count()

        if total == 0:
            greeting = t("welcome_empty", lang, name=user_name)
        else:
            greeting = t("welcome", lang, name=user_name, count=total)

        session.last_response = greeting

        try:
            audio_b64 = await text_to_speech(greeting, lang)
        except Exception as e:
            logger.error(f"TTS failed during init: {e}")
            audio_b64 = ""

        return InitResponse(text=greeting, audio=audio_b64, state="idle")

    except Exception as e:
        logger.exception(f"Voice init error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ── Main voice endpoint ─────────────────────────────────────────

@router.post("/", response_model=VoiceResponse)
async def handle_voice(
    audio: UploadFile = File(...),
    lang: str = Form("hi"),
):
    """
    Process a voice command through the full pipeline.
    1. STT  2. Intent  3. Logic  4. TTS  5. Return
    """
    try:
        # ── Step 1: Speech-to-Text ────────────────────────
        user_text = ""
        try:
            user_text = await speech_to_text(audio)
            logger.info(f"STT result: '{user_text}'")
        except ValueError as e:
            logger.warning(f"STT failed: {e}")
            response_text = t("stt_fail", lang)
            audio_b64 = await text_to_speech(response_text, lang)
            return VoiceResponse(
                text=response_text, audio=audio_b64,
                intent="UNKNOWN", state="idle", user_text=""
            )

        # ── Step 2: Intent Detection ──────────────────────
        intent = await detect_intent(user_text)
        logger.info(f"Intent: {intent}")

        # ── Step 3: Business Logic ────────────────────────
        response_text, state, ui_action = await process_intent(intent, lang)
        logger.info(f"Response: '{response_text}' | State: {state} | Action: {ui_action}")

        # ── Step 4: Text-to-Speech ────────────────────────
        try:
            audio_b64 = await text_to_speech(response_text, lang)
        except Exception as e:
            logger.error(f"TTS failed: {e}")
            return VoiceResponse(
                text=response_text, audio="",
                intent=intent, state=state,
                user_text=user_text, ui_action=ui_action
            )

        # ── Step 5: Return ────────────────────────────────
        return VoiceResponse(
            text=response_text,
            audio=audio_b64,
            intent=intent,
            state=state,
            user_text=user_text,
            ui_action=ui_action,
        )

    except Exception as e:
        logger.exception(f"Voice pipeline error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ── Text input endpoint (from Web Speech API live transcript) ────

@router.post("/text-input", response_model=VoiceResponse)
async def handle_text_input(
    text: str = Form(...),
    lang: str = Form("hi"),
):
    """
    Process a text command (from browser Web Speech API).
    Skips STT — goes directly Intent → Logic → TTS.
    """
    try:
        user_text = text.strip()
        if not user_text:
            response_text = t("stt_fail", lang)
            audio_b64 = await text_to_speech(response_text, lang)
            return VoiceResponse(
                text=response_text, audio=audio_b64,
                intent="UNKNOWN", state="idle", user_text=""
            )

        logger.info(f"Text input: '{user_text}'")
        intent = await detect_intent(user_text)
        logger.info(f"Intent: {intent}")

        response_text, state, ui_action = await process_intent(intent, lang)
        logger.info(f"Response: '{response_text}' | State: {state} | Action: {ui_action}")

        try:
            audio_b64 = await text_to_speech(response_text, lang)
        except Exception as e:
            logger.error(f"TTS failed: {e}")
            return VoiceResponse(
                text=response_text, audio="",
                intent=intent, state=state,
                user_text=user_text, ui_action=ui_action
            )

        return VoiceResponse(
            text=response_text, audio=audio_b64,
            intent=intent, state=state,
            user_text=user_text, ui_action=ui_action,
        )

    except Exception as e:
        logger.exception(f"Text input pipeline error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ── Intent Processing Engine ────────────────────────────────────

async def process_intent(intent: str, lang: str = "hi") -> tuple[str, str, Optional[str]]:
    """
    Execute business logic based on detected intent.
    Returns: (response_text, ui_state, ui_action)
    """

    if intent == "READ_SUMMARY":
        text, state = await handle_summary(lang)
        return text, state, None

    elif intent == "BEST_JOB":
        text, state = await handle_best_job(lang)
        return text, state, None

    elif intent == "NEXT_JOB":
        text, state = await handle_next_job(lang)
        return text, state, None

    elif intent == "REPEAT":
        text, state = handle_repeat()
        return text, state, None

    elif intent in ["ACCEPT", "CONFIRM"]:
        if session.current_job:
            success = await job_service.accept_job(session.current_job["_id"])
            text = t("accepted", lang) if success else t("accept_fail", lang)
            if success:
                session.current_job = None
            session.last_response = text
            return text, "idle", None
        else:
            text = t("no_job_selected", lang)
            session.last_response = text
            return text, "idle", None

    elif intent in ["REJECT", "DENY"]:
        if session.current_job:
            success = await job_service.reject_job(session.current_job["_id"])
            text = t("rejected", lang) if success else t("reject_fail", lang)
            if success:
                session.current_job = None
            session.last_response = text
            return text, "idle", None
        else:
            text = t("cancelled", lang)
            session.last_response = text
            return text, "idle", None

    elif intent == "STOP":
        text, state = handle_stop(lang)
        return text, state, None

    # ── Agentic UI intents ────────────────────────────────
    elif intent == "SHOW_MY_JOBS":
        text = t("show_jobs", lang)
        session.last_response = text
        return text, "idle", "NAVIGATE_JOB_REQUESTS"

    elif intent == "OPEN_PROFILE":
        text = t("open_profile", lang)
        session.last_response = text
        return text, "idle", "NAVIGATE_PROFILE"

    elif intent == "TOGGLE_AVAILABILITY":
        text = t("toggle_online", lang)
        session.last_response = text
        return text, "idle", "TOGGLE_AVAILABILITY"

    else:
        return t("unknown_intent", lang), "idle", None


# ── Intent Handlers ──────────────────────────────────────────────

async def handle_summary(lang: str) -> tuple[str, str]:
    summary = await job_service.get_summary(lang)
    session.last_response = summary
    return summary, "idle"


async def handle_best_job(lang: str) -> tuple[str, str]:
    job = await job_service.get_best_job()
    if not job:
        text = t("no_jobs", lang)
        session.last_response = text
        return text, "idle"

    session.current_job = job
    session.current_index = 0
    text = t("best_job_intro", lang) + job_service.format_job(job, lang) + t("want_accept", lang)
    session.last_response = text
    return text, "idle"


async def handle_next_job(lang: str) -> tuple[str, str]:
    job, new_index = await job_service.get_next_job(session.current_index)
    if not job:
        text = t("no_more_jobs", lang)
        session.last_response = text
        return text, "idle"

    session.current_job = job
    session.current_index = new_index
    text = job_service.format_job(job, lang) + t("want_accept", lang)
    session.last_response = text
    return text, "idle"


def handle_repeat() -> tuple[str, str]:
    return session.last_response, "idle"





def handle_stop(lang: str) -> tuple[str, str]:
    session.current_job = None
    session.current_index = -1
    session.pending_action = None
    text = t("goodbye", lang)
    session.last_response = text
    return text, "idle"


# ── Seed endpoint (development utility) ──────────────────────────

@router.post("/seed")
async def seed_jobs():
    """Seed sample jobs into the MongoDB jobs collection."""
    sample_jobs = [
        {"type": "Masonry", "salary": 800, "time": "9 AM", "location": "2 km away", "skill": "Brick laying", "status": "open"},
        {"type": "Plumbing", "salary": 1000, "time": "10 AM", "location": "3 km away", "skill": "Pipe fitting", "status": "open"},
        {"type": "Painting", "salary": 700, "time": "8 AM", "location": "1 km away", "skill": "Wall painting", "status": "open"},
        {"type": "Carpentry", "salary": 900, "time": "7 AM", "location": "5 km away", "skill": "Wood work", "status": "open"},
        {"type": "Electrical", "salary": 1200, "time": "11 AM", "location": "4 km away", "skill": "Wiring", "status": "open"},
        {"type": "Masonry", "salary": 850, "time": "6 AM", "location": "1.5 km away", "skill": "Plastering", "status": "open"},
        {"type": "Labour", "salary": 600, "time": "8 AM", "location": "0.5 km away", "skill": "General", "status": "open"},
        {"type": "Welding", "salary": 1100, "time": "9 AM", "location": "6 km away", "skill": "Arc welding", "status": "open"},
    ]

    await job_service.jobs_collection.delete_many({"status": {"$in": ["open", "accepted", "rejected"]}})
    result = await job_service.jobs_collection.insert_many(sample_jobs)

    return {
        "message": f"Seeded {len(result.inserted_ids)} jobs.",
        "count": len(result.inserted_ids),
    }
