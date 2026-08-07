from urllib import response

from fastapi import params
import httpx
from typing import Optional, List, Dict
from app.config import get_settings
from app.utils.decorators import log_execution_time

class TMDBService:
    """Service for interacting with TMDB API."""
    
    def __init__(self):
        settings = get_settings()
        self.api_key = settings.tmdb_api_key
        self.base_url = "https://api.themoviedb.org/3"
        self.image_base_url = "https://image.tmdb.org/t/p"
    
    async def _make_request(self, endpoint: str, params: dict = None) -> dict:
        if params is None:
             params = {}

        params["api_key"] = self.api_key
        params["language"] = params.get("language", "en-US")

        print("=" * 60)
        print("URL:", f"{self.base_url}{endpoint}")
        print("PARAMS:", params)

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.get(
                    f"{self.base_url}{endpoint}",
                    params=params,
                )

                print("STATUS:", response.status_code)
                print("RESPONSE:")
                print(response.text)

                response.raise_for_status()

                return response.json()

            except Exception as e:
                import traceback
                traceback.print_exc()
                print("EXCEPTION TYPE:", type(e).__name__)
                print("EXCEPTION:", repr(e))
                raise
    
    @log_execution_time
    async def search_movies(
        self, 
        query: str = "", 
        genre: str = None, 
        language: str = None,
        year: int = None,
        page: int = 1
    ) -> dict:
        """Search movies with filters."""
        params = {"page": page}
        
        if query:
            params['query'] = query
            endpoint = "/search/movie"
        else:
            # Discover movies with filters
            endpoint = "/discover/movie"
            if genre:
                params['with_genres'] = genre
            if language:
                params['with_original_language'] = language
            if year:
                params['primary_release_year'] = year
            params['sort_by'] = 'popularity.desc'
        
        return await self._make_request(endpoint, params)
    
    @log_execution_time
    async def get_movie_details(self, movie_id: int) -> dict:
        """Get detailed movie information."""
        params = {
            'append_to_response': 'credits,videos,similar'
        }
        data = await self._make_request(f"/movie/{movie_id}", params)
        
        # Extract and format relevant information
        return {
            "id": data.get("id"),
            "title": data.get("title"),
            "overview": data.get("overview"),
            "poster_path": f"{self.image_base_url}/w500{data.get('poster_path')}" if data.get('poster_path') else None,
            "backdrop_path": f"{self.image_base_url}/original{data.get('backdrop_path')}" if data.get('backdrop_path') else None,
            "release_date": data.get("release_date"),
            "runtime": data.get("runtime"),
            "vote_average": data.get("vote_average"),
            "vote_count": data.get("vote_count"),
            "budget": data.get("budget"),
            "revenue": data.get("revenue"),
            "genres": data.get("genres", []),
            "production_companies": data.get("production_companies", []),
            "tagline": data.get("tagline"),
            "status": data.get("status"),
            "cast": [{
                "name": cast.get("name"),
                "character": cast.get("character"),
                "profile_path": f"{self.image_base_url}/w185{cast.get('profile_path')}" if cast.get('profile_path') else None
            } for cast in data.get("credits", {}).get("cast", [])[:10]],
            "director": next((
                crew.get("name") for crew in data.get("credits", {}).get("crew", [])
                if crew.get("job") == "Director"
            ), None),
            "videos": [{
                "key": video.get("key"),
                "name": video.get("name"),
                "site": video.get("site"),
                "type": video.get("type")
            } for video in data.get("videos", {}).get("results", []) if video.get("site") == "YouTube"],
            "similar": [{
                "id": movie.get("id"),
                "title": movie.get("title"),
                "poster_path": f"{self.image_base_url}/w342{movie.get('poster_path')}" if movie.get('poster_path') else None,
                "vote_average": movie.get("vote_average"),
                "release_date": movie.get("release_date")
            } for movie in data.get("similar", {}).get("results", [])[:6]]
        }
    
    @log_execution_time
    async def get_movie_by_id(self, movie_id: int) -> dict:
        """Get basic movie information by ID."""
        data = await self._make_request(f"/movie/{movie_id}")
        return {
            "id": data.get("id"),
            "title": data.get("title"),
            "poster_path": f"{self.image_base_url}/w342{data.get('poster_path')}" if data.get('poster_path') else None,
            "vote_average": data.get("vote_average"),
            "release_date": data.get("release_date"),
            "genres": [genre["name"] for genre in data.get("genres", [])],
            "overview": data.get("overview")
        }
    
    @log_execution_time
    async def get_genres(self) -> List[Dict]:
        """Get list of movie genres."""
        data = await self._make_request("/genre/movie/list")
        return data.get("genres", [])