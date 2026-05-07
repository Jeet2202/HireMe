"""
Voice Navigator API route.

POST /voice — Main voice interaction endpoint.
POST /voice/seed — Seed sample jobs into MongoDB (dev utility).

Pipeline: Audio → STT → Intent → Business Logic → TTS → Response
"""

import logging
from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional

from app.services.stt import speech_to_text
from app.services.intent import detect_intent
from app.services.tts import text_to_speech
from app.services import jobs as job_service

logger = logging.getLogger(__name__)

router = APIRouter()


# ── Session state (in-memory per-server for simplicity) ──────────
# In production, use Redis or DB-backed sessions keyed by user ID.
class SessionState:
    """Tracks per-session voice navigator state."""

    def __init__(self):
        self.current_job: Optional[dict] = None
        self.current_index: int = -1
        self.last_response: str = "Welcome. Say 'best job' or 'summary' to begin."
        self.pending_action: Optional[str] = None  # "ACCEPT" or "REJECT"


# Single session for MVP — extend to per-user sessions with auth
session = SessionState()


class VoiceResponse(BaseModel):
    """Response payload for the voice endpoint."""
    text: str
    audio: str  # base64-encoded WAV
    intent: str
    state: str  # idle | awaiting_confirmation


# ── Initialization endpoint (system speaks first) ────────────────

class InitResponse(BaseModel):
    """Response for the voice init endpoint."""
    text: str
    audio: str  # base64-encoded WAV
    state: str  # idle | awaiting_confirmation


@router.get("/init", response_model=InitResponse)
async def voice_init(user_name: str = "User"):
    """
    Initialize a voice session with a greeting + job summary.
    The system speaks first when the user taps the voice button.

    Returns a personalized greeting like:
    "Welcome back Marcus. There are 3 jobs available for you.
     The best fitted job is an Electrical job for 1200 rupees.
     Would you like to accept, or hear the next one?"
    """
    try:
        # Reset session
        session.current_job = None
        session.current_index = -1
        session.pending_action = None

        total = await job_service.get_job_count()

        if total == 0:
            greeting = (
                f"Welcome back {user_name}. "
                "There are no jobs available for you right now. "
                "Check back later."
            )
            session.last_response = greeting
            try:
                audio_b64 = await text_to_speech(greeting)
            except Exception:
                audio_b64 = ""
            return InitResponse(text=greeting, audio=audio_b64, state="idle")

        # Get best job
        best_job = await job_service.get_best_job()

        greeting_parts = [f"Welcome back {user_name}."]
        greeting_parts.append(
            f"There {'is' if total == 1 else 'are'} {total} "
            f"job{'s' if total != 1 else ''} available for you."
        )

        if best_job:
            session.current_job = best_job
            session.current_index = 0
            job_desc = job_service.format_job(best_job)
            greeting_parts.append(f"The best fitted job is: {job_desc}")
            greeting_parts.append(
                "Would you like to accept this job, or say next to hear more?"
            )

        greeting = " ".join(greeting_parts)
        session.last_response = greeting

        try:
            audio_b64 = await text_to_speech(greeting)
        except Exception as e:
            logger.error(f"TTS failed during init: {e}")
            audio_b64 = ""

        return InitResponse(text=greeting, audio=audio_b64, state="idle")

    except Exception as e:
        logger.exception(f"Voice init error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ── Main voice endpoint ──────────────────────────────────────────

@router.post("/", response_model=VoiceResponse)
async def handle_voice(audio: UploadFile = File(...)):
    """
    Process a voice command through the full pipeline.

    1. STT: Convert audio to text
    2. Intent: Classify the text
    3. Logic: Execute the business action
    4. TTS: Convert response to speech
    5. Return text + audio
    """
    try:
        # ── Step 1: Speech-to-Text ────────────────────────
        try:
            user_text = await speech_to_text(audio)
            logger.info(f"STT result: '{user_text}'")
        except ValueError as e:
            logger.warning(f"STT failed: {e}")
            response_text = "I didn't catch that. Please try again."
            audio_b64 = await text_to_speech(response_text)
            return VoiceResponse(
                text=response_text, audio=audio_b64,
                intent="UNKNOWN", state="idle"
            )

        # ── Step 2: Intent Detection ──────────────────────
        intent = await detect_intent(user_text)
        logger.info(f"Intent: {intent}")

        # ── Step 3: Business Logic ────────────────────────
        response_text, state = await process_intent(intent)
        logger.info(f"Response: '{response_text}' | State: {state}")

        # ── Step 4: Text-to-Speech ────────────────────────
        try:
            audio_b64 = await text_to_speech(response_text)
        except Exception as e:
            logger.error(f"TTS failed: {e}")
            # Return text-only response if TTS fails
            return VoiceResponse(
                text=response_text, audio="",
                intent=intent, state=state
            )

        # ── Step 5: Return ────────────────────────────────
        return VoiceResponse(
            text=response_text,
            audio=audio_b64,
            intent=intent,
            state=state,
        )

    except Exception as e:
        logger.exception(f"Voice pipeline error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ── Intent Processing Engine ─────────────────────────────────────

async def process_intent(intent: str) -> tuple[str, str]:
    """
    Execute business logic based on detected intent.

    Returns:
        Tuple of (response_text, ui_state).
    """

    # ── Handle confirmation flow first ────────────────────
    if session.pending_action:
        return await handle_confirmation(intent)

    # ── Standard intents ──────────────────────────────────
    if intent == "READ_SUMMARY":
        return await handle_summary()

    elif intent == "BEST_JOB":
        return await handle_best_job()

    elif intent == "NEXT_JOB":
        return await handle_next_job()

    elif intent == "REPEAT":
        return handle_repeat()

    elif intent == "ACCEPT":
        return handle_accept_request()

    elif intent == "REJECT":
        return handle_reject_request()

    elif intent == "STOP":
        return handle_stop()

    else:
        return (
            "I didn't understand. Say 'best job', 'next job', 'accept', or 'stop'.",
            "idle",
        )


# ── Intent Handlers ──────────────────────────────────────────────

async def handle_summary() -> tuple[str, str]:
    """Handle READ_SUMMARY intent."""
    summary = await job_service.get_summary()
    session.last_response = summary
    return summary, "idle"


async def handle_best_job() -> tuple[str, str]:
    """Handle BEST_JOB intent."""
    job = await job_service.get_best_job()

    if not job:
        text = "No jobs available right now. Check back later."
        session.last_response = text
        return text, "idle"

    session.current_job = job
    session.current_index = 0

    text = job_service.format_job(job) + " Do you want to accept?"
    session.last_response = text
    return text, "idle"


async def handle_next_job() -> tuple[str, str]:
    """Handle NEXT_JOB intent."""
    job, new_index = await job_service.get_next_job(session.current_index)

    if not job:
        text = "No more jobs available."
        session.last_response = text
        return text, "idle"

    session.current_job = job
    session.current_index = new_index

    text = job_service.format_job(job) + " Do you want to accept?"
    session.last_response = text
    return text, "idle"


def handle_repeat() -> tuple[str, str]:
    """Handle REPEAT intent."""
    return session.last_response, "idle"


def handle_accept_request() -> tuple[str, str]:
    """
    Handle ACCEPT intent — enters confirmation flow.
    Does NOT execute immediately.
    """
    if not session.current_job:
        text = "No job selected. Say 'best job' to find one."
        session.last_response = text
        return text, "idle"

    session.pending_action = "ACCEPT"
    text = "Are you sure you want to accept this job? Say yes or no."
    session.last_response = text
    return text, "awaiting_confirmation"


def handle_reject_request() -> tuple[str, str]:
    """
    Handle REJECT intent — enters confirmation flow.
    Does NOT execute immediately.
    """
    if not session.current_job:
        text = "No job selected. Say 'best job' to find one."
        session.last_response = text
        return text, "idle"

    session.pending_action = "REJECT"
    text = "Are you sure you want to reject this job? Say yes or no."
    session.last_response = text
    return text, "awaiting_confirmation"


async def handle_confirmation(intent: str) -> tuple[str, str]:
    """
    Handle CONFIRM/DENY after an ACCEPT/REJECT request.
    """
    action = session.pending_action
    session.pending_action = None  # Clear pending state

    if intent == "CONFIRM":
        if action == "ACCEPT":
            success = await job_service.accept_job(session.current_job["_id"])
            if success:
                text = "Job accepted. Say 'next job' to continue."
                session.current_job = None
            else:
                text = "Could not accept the job. Please try again."
            session.last_response = text
            return text, "idle"

        elif action == "REJECT":
            success = await job_service.reject_job(session.current_job["_id"])
            if success:
                text = "Job rejected. Say 'next job' to continue."
                session.current_job = None
            else:
                text = "Could not reject the job. Please try again."
            session.last_response = text
            return text, "idle"

    elif intent == "DENY":
        text = "Cancelled. The job is still available. What would you like to do?"
        session.last_response = text
        return text, "idle"

    else:
        # Re-ask confirmation on any other intent
        session.pending_action = action
        text = f"Please say yes or no to {action.lower()} this job."
        session.last_response = text
        return text, "awaiting_confirmation"


def handle_stop() -> tuple[str, str]:
    """Handle STOP intent — reset session."""
    session.current_job = None
    session.current_index = -1
    session.pending_action = None
    text = "Goodbye. Say anything to start again."
    session.last_response = text
    return text, "idle"


# ── Seed endpoint (development utility) ──────────────────────────

@router.post("/seed")
async def seed_jobs():
    """
    Seed sample jobs into the MongoDB jobs collection.
    For development/testing only.
    """
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

    # Clear existing seeded jobs
    await job_service.jobs_collection.delete_many({"status": {"$in": ["open", "accepted", "rejected"]}})

    result = await job_service.jobs_collection.insert_many(sample_jobs)

    return {
        "message": f"Seeded {len(result.inserted_ids)} jobs.",
        "count": len(result.inserted_ids),
    }
