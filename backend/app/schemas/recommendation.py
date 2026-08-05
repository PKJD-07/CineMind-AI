from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class RecommendationRequest(BaseModel):
    genres: List[str] = []
    languages: List[str] = []
    mood: str = ""
    favorite_movie: Optional[str] = None
    favorite_movie_id: Optional[int] = None

class MovieRecommendation(BaseModel):
    title: str
    reason: str
    confidence: int
    tmdb_id: Optional[int] = None
    poster_path: Optional[str] = None
    rating: Optional[float] = None
    year: Optional[str] = None

class RecommendationResponse(BaseModel):
    recommendations: List[MovieRecommendation]
    user_preferences: dict
    generated_at: datetime