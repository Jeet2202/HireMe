"""
Text-to-Speech service using Groq Orpheus API.

Converts response text to speech audio and returns base64-encoded data.
"""

import os
import base64
import httpx

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_TTS_URL = "https://api.groq.com/openai/v1/audio/speech"
TTS_MODEL = "canopylabs/orpheus-v1-english"
TTS_VOICE = "daniel"  # Valid voices: autumn, diana, hannah, austin, daniel, troy


async def text_to_speech(text: str) -> str:
    """
    Convert text to speech using Groq Orpheus TTS API.

    Args:
        text: The response text to convert to audio.

    Returns:
        Base64-encoded audio string (WAV format).

    Raises:
        ValueError: If API key is missing or text is empty.
        httpx.HTTPStatusError: If Groq API returns an error.
    """
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is not set in environment variables.")

    if not text or not text.strip():
        raise ValueError("Cannot convert empty text to speech.")

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            GROQ_TTS_URL,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": TTS_MODEL,
                "input": text,
                "voice": TTS_VOICE,
                "response_format": "wav",
            },
        )
        response.raise_for_status()

    audio_bytes = response.content

    if not audio_bytes:
        raise ValueError("TTS API returned empty audio.")

    return base64.b64encode(audio_bytes).decode("utf-8")