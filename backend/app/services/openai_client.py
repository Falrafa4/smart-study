import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-5.5")

if not OPENAI_API_KEY:
    print("WARNING: OPENAI_API_KEY belum diatur di .env")

client = OpenAI(api_key=OPENAI_API_KEY)


def ask_openai(prompt: str) -> str:
    """Kirim prompt ke OpenAI, kembalikan teks jawaban mentah."""
    
    response = client.responses.create(
        model=OPENAI_MODEL,
        input=prompt,
    )

    return response.output_text