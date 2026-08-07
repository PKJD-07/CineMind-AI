from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from app.services.tmdb_service import TMDBService
from app.schemas.movie import MovieDetail, MovieSearchParams
from app.utils.security import get_current_user

router = APIRouter(prefix="/movies", tags=["Movies"])
tmdb_service = TMDBService()

@router.get("/search")
async def search_movies(
    query: Optional[str] = None,
    genre: Optional[str] = None,
    language: Optional[str] = None,
    year: Optional[int] = None,
    page: int = 1,
    
):
    """Search movies with filters."""
    try:
        result = await tmdb_service.search_movies(
            query=query,
            genre=genre,
            language=language,
            year=year,
            page=page
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{movie_id}")
async def get_movie_details(
    movie_id: int,
    current_user: dict = Depends(get_current_user)
):
    """Get detailed movie information."""
    try:
        movie = await tmdb_service.get_movie_details(movie_id)
        return movie
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/genres/list")
async def get_genres(current_user: dict = Depends(get_current_user)):
    """Get list of all genres."""
    try:
        genres = await tmdb_service.get_genres()
        return genres
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))