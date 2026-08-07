from pydantic import BaseModel
from datetime import datetime

from typing import Optional, List

class MovieBase(BaseModel):
    id: int
    title: str
    poster_path: Optional[str] = None
    overview: Optional[str] = None
    release_date: Optional[str] = None
    vote_average: Optional[float] = None
    genre_ids: Optional[List[int]] = None

class MovieDetail(MovieBase):
    runtime: Optional[int] = None
    budget: Optional[int] = None
    revenue: Optional[int] = None
    production_companies: Optional[List[dict]] = None
    cast: Optional[List[dict]] = None
    director: Optional[str] = None
    genres: Optional[List[dict]] = None
    videos: Optional[List[dict]] = None

class MovieSearchParams(BaseModel):
    query: Optional[str] = None
    genre: Optional[str] = None
    language: Optional[str] = None
    year: Optional[int] = None
    page: int = 1

class FavoriteCreate(BaseModel):
    movie_id: int
    title: str
    poster_path: Optional[str] = None
    rating: Optional[float] = None
    genres: Optional[str] = None

class FavoriteResponse(BaseModel):
    id: int
    movie_id: int
    title: str
    poster_path: Optional[str] = None
    rating: Optional[float] = None
    genres: Optional[str] = None
    added_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True