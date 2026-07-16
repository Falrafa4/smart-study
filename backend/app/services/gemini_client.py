import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY belum diatur di .env")

genai.configure(api_key=GEMINI_API_KEY)


def ask_gemini(prompt: str) -> str:
    """Kirim prompt ke Gemini, kembalikan teks jawaban mentah."""
    model = genai.GenerativeModel(GEMINI_MODEL)
    response = model.generate_content(prompt)
    return response.text