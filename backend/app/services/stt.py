"""
Speech-to-Text service using Groq Whisper API.

Converts audio file uploads to text transcriptions.
Uses whisper-large-v3-turbo for fast, accurate STT.
"""

import os
import httpx
from fastapi import UploadFile

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_STT_URL = "https://api.groq.com/openai/v1/audio/transcriptions"
STT_MODEL = "whisper-large-v3-turbo"


async def speech_to_text(audio_file: UploadFile) -> str:
    """
    Convert uploaded audio to text using Groq Whisper.

    Args:
        audio_file: FastAPI UploadFile containing audio data.

    Returns:
        Transcribed text string.

    Raises:
        ValueError: If transcription fails or returns empty.
        httpx.HTTPStatusError: If Groq API returns an error status.
    """
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is not set in environment variables.")

    audio_bytes = await audio_file.read()

    if not audio_bytes:
        raise ValueError("Empty audio file received.")

    # Determine filename for content type hint
    filename = audio_file.filename or "audio.webm"

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            GROQ_STT_URL,
            headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
            files={"file": (filename, audio_bytes, audio_file.content_type or "audio/webm")},
            data={"model": STT_MODEL},
        )
        response.raise_for_status()

    result = response.json()
    text = result.get("text", "").strip()

    if not text:
        raise ValueError("Whisper returned empty transcription.")

    return text