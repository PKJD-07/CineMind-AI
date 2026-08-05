import httpx
import json
from typing import List, Dict
from app.config import get_settings
from app.utils.decorators import log_execution_time

class AIService:
    """Service for AI-powered movie recommendations using DeepSeek."""
    
    def __init__(self):
        settings = get_settings()
        self.api_key = settings.deepseek_api_key
        self.base_url = "https://api.deepseek.com/v1"
    
    @log_execution_time
    async def get_recommendations(
        self, 
        genres: List[str],
        languages: List[str],
        mood: str,
        favorite_movie: str = None
    ) -> Dict:
        """Get AI-powered movie recommendations."""
        
        # Build the prompt
        prompt = self._build_prompt(genres, languages, mood, favorite_movie)
        
        # Call DeepSeek API
        recommendations = await self._call_deepseek(prompt)
        
        return {
            "recommendations": recommendations,
            "user_preferences": {
                "genres": genres,
                "languages": languages,
                "mood": mood,
                "favorite_movie": favorite_movie
            }
        }
    
    def _build_prompt(
        self, 
        genres: List[str], 
        languages: List[str], 
        mood: str, 
        favorite_movie: str = None
    ) -> str:
        """Build the prompt for DeepSeek."""
        
        prompt = f"""You are a movie recommendation expert. Based on the following preferences, recommend exactly 10 movies.

User Preferences:
- Genres: {', '.join(genres) if genres else 'Any'}
- Languages: {', '.join(languages) if languages else 'Any'}
- Mood: {mood if mood else 'Any'}
"""
        
        if favorite_movie:
            prompt += f"- Favorite Movie: {favorite_movie}\n"
        
        prompt += """
For each recommendation, provide:
1. Movie name (must be a real, well-known movie)
2. A personalized reason explaining why this movie matches their preferences (be specific, mention the mood, genre, or style connection)
3. A confidence score (0-100) representing how well this matches their preferences

IMPORTANT: 
- Recommendations must be highly personalized based on the mood and preferences
- Never give generic reasons
- Each reason should be unique and specific to that movie
- Consider the emotional tone matching the specified mood

Return ONLY a JSON array of exactly 10 objects with this structure:
[
  {
    "title": "Movie Name",
    "reason": "Personalized explanation",
    "confidence": 95
  }
]

Do not include any other text or markdown formatting. Return ONLY the JSON array.
"""
        return prompt
    
    async def _call_deepseek(self, prompt: str) -> List[Dict]:
        """Call DeepSeek API and parse response."""
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a movie recommendation expert. You always respond with valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7,
            "max_tokens": 2000
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            data = response.json()
        
        # Extract the response content
        content = data['choices'][0]['message']['content']
        
        # Clean and parse JSON
        # Remove any markdown code blocks if present
        content = content.strip()
        if content.startswith('```'):
            content = content.split('\n', 1)[1]
            if content.endswith('```'):
                content = content[:-3]
        
        recommendations = json.loads(content)
        
        # Ensure we have exactly 10 recommendations
        return recommendations[:10]