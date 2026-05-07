"""
Intent Detection service using Groq LLM.

Classifies user speech into a finite set of intents.
This is NOT a chatbot — only predefined intents are recognized.
"""

import os
import httpx

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions"
INTENT_MODEL = "llama-3.3-70b-versatile"

# All valid intents
VALID_INTENTS = {
    "READ_SUMMARY",
    "BEST_JOB",
    "NEXT_JOB",
    "REPEAT",
    "ACCEPT",
    "REJECT",
    "STOP",
    "CONFIRM",
    "DENY",
    "SHOW_MY_JOBS",
    "OPEN_PROFILE",
    "TOGGLE_AVAILABILITY",
    "UNKNOWN",
}

SYSTEM_PROMPT = """You are an intent classifier for a voice-based labour job navigator used by Hindi-speaking workers in India.

Given the user's spoken text (may be Hindi, Hinglish, or English), classify it into EXACTLY ONE of these intents:

- READ_SUMMARY        → User wants to hear a summary of available jobs
- BEST_JOB            → User wants the best/highest paying job
- NEXT_JOB            → User wants to hear the next job
- REPEAT              → User wants to hear the last response again
- ACCEPT              → User wants to accept the current job
- REJECT              → User wants to reject/skip the current job
- STOP                → User wants to stop or exit
- CONFIRM             → User is confirming a previous action
- DENY                → User is denying/cancelling a previous action
- SHOW_MY_JOBS        → User wants to see/view their job requests list on screen
- OPEN_PROFILE        → User wants to open/view their profile page
- TOGGLE_AVAILABILITY → User wants to go online/offline or change their availability
- UNKNOWN             → Speech doesn't match any intent

RULES:
- Return ONLY the intent string, nothing else
- No explanations, no punctuation, no extra words
- Be very generous in interpretation — match common Hindi/Hinglish/English phrases

Hindi/Hinglish mappings (use these as strong hints):
CONFIRM  → "haan", "ha", "yes", "theek hai", "sahi hai", "kar do", "bilkul", "zaroor", "ok", "sure", "agree", "le leta hu", "mujhe chahiye"
DENY     → "nahi", "na", "no", "nako", "mat karo", "rehne do", "cancel", "band karo", "nahin chahiye", "chhod do"
NEXT_JOB → "next", "agle", "dusra", "koi aur", "aur dikhao", "badlo", "aur kaam", "aage", "agla"
BEST_JOB → "best", "sabse accha", "top", "sabse zyada", "sabse behtar", "accha wala", "number one", "best job"
ACCEPT   → "accept", "le lo", "le leta hu", "mujhe yeh kaam chahiye", "haan le leta hu", "kaam karta hu", "theek hai le leta hu", "manzoor hai"
REJECT   → "reject", "skip", "chhod do", "nahi chahiye", "mat do", "yeh nahi", "pasand nahi"
STOP     → "stop", "band karo", "ruk", "bye", "bas", "khatam karo", "rokko", "exit", "chalo bye"
REPEAT   → "repeat", "phir se", "dobara", "suno", "dobara bolo", "ek baar aur", "kya bola"
READ_SUMMARY → "summary", "batao", "kya hai", "kitne kaam", "sab batao", "overview", "poora batao", "status"
SHOW_MY_JOBS → "show my jobs", "meri jobs dikhao", "job requests", "mera kaam dikhao", "jobs dikhao", "kaam ki list", "mere jobs", "show jobs", "open jobs"
OPEN_PROFILE → "open profile", "mera profile", "profile dikhao", "meri profile", "profile kholo", "show profile", "my profile"
TOGGLE_AVAILABILITY → "go online", "go offline", "online karo", "offline karo", "available", "unavailable", "availability", "status change karo"
"""


async def detect_intent(text: str) -> str:
    """
    Classify user text into a single intent string.

    Args:
        text: Transcribed user speech.

    Returns:
        One of the VALID_INTENTS strings.
    """
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is not set in environment variables.")

    if not text or not text.strip():
        return "UNKNOWN"

    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(
            GROQ_CHAT_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": INTENT_MODEL,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": text},
                ],
                "temperature": 0,
                "max_tokens": 10,
            },
        )
        response.raise_for_status()

    result = response.json()
    raw_intent = result["choices"][0]["message"]["content"].strip().upper()

    # Sanitize: only return valid intents
    if raw_intent in VALID_INTENTS:
        return raw_intent

    return "UNKNOWN"