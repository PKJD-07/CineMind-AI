import json

from openai import OpenAI

from app.config import get_settings


class AIService:

    def __init__(self):
        settings = get_settings()

        self.client = OpenAI(
            api_key=settings.groq_api_key,
            base_url="https://api.groq.com/openai/v1",
        )

    async def get_recommendations(
        self,
        genres,
        languages,
        mood,
        favorite_movie=None,
    ):

        prompt = f"""
You are CineMind AI.

Recommend EXACTLY 10 real movies.

User Preferences

Genres:
{genres}

Languages:
{languages}

Mood:
{mood}

Favorite Movie:
{favorite_movie}

Return ONLY JSON.

Example:

[
 {{
   "title":"Prisoners",
   "reason":"Excellent psychological thriller.",
   "confidence":95,
   "mood_match":"Excellent",
   "why_youll_like_it":"You'll love the suspense."
 }}
]
"""

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            temperature=0.8,
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        data = json.loads(response.choices[0].message.content)

        return {
            "recommendations": data["recommendations"],
            "user_preferences": {
                "genres": genres,
                "languages": languages,
                "mood": mood,
                "favorite_movie": favorite_movie,
            },
        }