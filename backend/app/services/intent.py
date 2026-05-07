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
    "UNKNOWN",
}

SYSTEM_PROMPT = """You are an intent classifier for a voice-based labour job navigator.

Given the user's spoken text, classify it into EXACTLY ONE of these intents:

- READ_SUMMARY  → User wants to hear a summary of available jobs or current job details
- BEST_JOB      → User wants the best/highest paying job
- NEXT_JOB      → User wants to hear the next job
- REPEAT         → User wants to hear the last response again
- ACCEPT         → User wants to accept the current job
- REJECT         → User wants to reject/skip the current job
- STOP           → User wants to stop or exit
- CONFIRM        → User is confirming a previous action (yes, sure, ok, confirm, haan, ha)
- DENY           → User is denying/cancelling a previous action (no, cancel, nahi, nako)
- UNKNOWN        → Speech doesn't match any intent

RULES:
- Return ONLY the intent string, nothing else
- No explanations, no punctuation, no extra words
- Be generous in interpretation — match common Hindi/English phrases to intents
- "haan" / "ha" / "yes" / "sure" / "ok" → CONFIRM
- "nahi" / "no" / "cancel" / "nako" → DENY
- "next" / "agle" / "dusra" → NEXT_JOB
- "best" / "sabse accha" / "top" → BEST_JOB
- "accept" / "le lo" / "theek hai le leta hu" → ACCEPT
- "reject" / "skip" / "chhod do" / "nahi chahiye" → REJECT
- "stop" / "band karo" / "ruk" / "bye" → STOP
- "repeat" / "phir se" / "dobara" → REPEAT
- "summary" / "batao" / "kya hai" → READ_SUMMARY
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