"""
Text-to-Speech service using Google TTS (gTTS).

Supports both Hindi ('hi') and English ('en') output.
No API key required — uses Google Translate TTS.
"""

import asyncio
import base64
import io
from gtts import gTTS


async def text_to_speech(text: str, lang: str = "hi") -> str:
    """
    Convert text to speech using Google TTS.

    Args:
        text: The response text.
        lang: Language code — 'hi' for Hindi, 'en' for English.

    Returns:
        Base64-encoded audio string (MP3 format).
    """
    if not text or not text.strip():
        raise ValueError("Cannot convert empty text to speech.")

    # Normalize language code
    tts_lang = "hi" if lang == "hi" else "en"

    def _generate() -> bytes:
        tts = gTTS(text=text, lang=tts_lang, slow=False)
        buf = io.BytesIO()
        tts.write_to_fp(buf)
        buf.seek(0)
        return buf.read()

    loop = asyncio.get_event_loop()
    audio_bytes = await loop.run_in_executor(None, _generate)

    if not audio_bytes:
        raise ValueError("gTTS returned empty audio.")

    return base64.b64encode(audio_bytes).decode("utf-8")