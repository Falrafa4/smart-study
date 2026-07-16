import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

_configured = False


def _ensure_configured():
    """Lazy-configure the Gemini SDK only once, on first actual use."""
    global _configured
    if _configured:
        return

    if not GEMINI_API_KEY:
        raise RuntimeError(
            "GEMINI_API_KEY belum diatur. "
            "Buat file backend/.env dan isi GEMINI_API_KEY dengan API key Gemini kamu."
        )

    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)
    _configured = True
    logger.info("Gemini SDK berhasil dikonfigurasi (model: %s)", GEMINI_MODEL)


def ask_gemini(prompt: str) -> str:
    """Kirim prompt ke Gemini, kembalikan teks jawaban mentah."""
    _ensure_configured()

    import google.generativeai as genai
    model = genai.GenerativeModel(GEMINI_MODEL)
    response = model.generate_content(prompt)
    return response.text


def ask_gemini_with_retry(prompt: str, retries: int = 2) -> str:
    """Call Gemini with exponential back-off. Raises after `retries` attempts."""
    import time
    for attempt in range(retries + 1):
        try:
            return ask_gemini(prompt)
        except Exception as exc:
            if attempt == retries:
                raise exc
            wait = 2 ** attempt
            logger.warning("Gemini call failed (attempt %d/%d), retrying in %ds: %s",
                           attempt + 1, retries + 1, wait, exc)
            time.sleep(wait)
