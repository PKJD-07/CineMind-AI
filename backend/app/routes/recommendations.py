from fastapi import APIRouter, Depends, HTTPException
from app.schemas.recommendation import RecommendationRequest, RecommendationResponse
from app.services.ai_service import AIService
from app.services.tmdb_service import TMDBService
from app.database import get_db
from app.utils.security import get_current_user
from datetime import datetime
import json

router = APIRouter(prefix="/recommend", tags=["Recommendations"])
ai_service = AIService()
tmdb_service = TMDBService()

@router.post("")
async def get_recommendations(
    request: RecommendationRequest,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get AI-powered movie recommendations."""
    try:
        user_id = int(current_user["sub"])
        
        # Get AI recommendations
        ai_response = await ai_service.get_recommendations(
            genres=request.genres,
            languages=request.languages,
            mood=request.mood,
            favorite_movie=request.favorite_movie
        )
        
        # Enhance recommendations with TMDB data
        enhanced_recommendations = []
        for rec in ai_response["recommendations"]:
            try:
                # Search TMDB for the movie                
                search_result = await tmdb_service.search_movies(query=rec["title"], page=1)
                
                if search_result.get("results") and len(search_result["results"]) > 0:
                    movie = search_result["results"][0]
                    enhanced_recommendations.append({
                        "title": rec["title"],
                        "reason": rec["reason"],
                        "confidence": rec["confidence"],
                        "mood_match": rec.get("mood_match"),
                        "why_youll_like_it": rec.get("why_youll_like_it"),
                        "tmdb_id": movie.get("id"),
                        "poster_path": f"https://image.tmdb.org/t/p/w342{movie.get('poster_path')}" if movie.get('poster_path') else None,
                        "rating": movie.get("vote_average"),
                        "year": movie.get("release_date", "")[:4] if movie.get("release_date") else None
                    })
                else:
                    # If not found on TMDB, still include the recommendation
                    enhanced_recommendations.append({
                        "title": rec["title"],
                        "reason": rec["reason"],
                        "confidence": rec["confidence"],
                        "tmdb_id": None,
                        "poster_path": None,
                        "rating": None,
                        "year": None
                    })
            except Exception:
                # If TMDB search fails, still include the recommendation
                enhanced_recommendations.append({
                    "title": rec["title"],
                    "reason": rec["reason"],
                    "confidence": rec["confidence"],
                    "tmdb_id": None,
                    "poster_path": None,
                    "rating": None,
                    "year": None
                })
        
        # Save recommendation history
        await db.execute(
            """
            INSERT INTO recommendation_history (user_id, preferences, recommendations)
            VALUES (?, ?, ?)
            """,
            (
                user_id,
                json.dumps(ai_response["user_preferences"]),
                json.dumps(enhanced_recommendations)
            )
        )
        await db.commit()
        
        return {
            "recommendations": enhanced_recommendations,
            "user_preferences": ai_response["user_preferences"],
            "generated_at": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate recommendations: {str(e)}")