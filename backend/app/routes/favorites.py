from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from app.database import get_db
from app.schemas.movie import FavoriteCreate, FavoriteResponse
from app.utils.security import get_current_user

router = APIRouter(prefix="/favorites", tags=["Favorites"])

@router.post("")
async def add_favorite(
    favorite: FavoriteCreate,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_db)
):
    """Add movie to favorites."""
    user_id = int(current_user["sub"])
    
    try:
        cursor = await db.execute(
            """
            INSERT INTO favorites (user_id, movie_id, title, poster_path, rating, genres)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (user_id, favorite.movie_id, favorite.title, 
             favorite.poster_path, favorite.rating, favorite.genres)
        )
        await db.commit()
        
        return {"message": "Movie added to favorites", "id": cursor.lastrowid}
    except Exception as e:
        if "UNIQUE constraint" in str(e):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Movie already in favorites"
            )
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{movie_id}")
async def remove_favorite(
    movie_id: int,
    current_user: dict = Depends(get_current_user),
    db = Depends(get_db)
):
    """Remove movie from favorites."""
    user_id = int(current_user["sub"])
    
    cursor = await db.execute(
        "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
        (user_id, movie_id)
    )
    await db.commit()
    
    if cursor.rowcount == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Movie not found in favorites"
        )
    
    return {"message": "Movie removed from favorites"}

@router.get("")
async def get_favorites(
    sort_by: Optional[str] = "added_at",
    order: Optional[str] = "desc",
    current_user: dict = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get user's favorite movies."""
    user_id = int(current_user["sub"])
    
    # Validate sort field to prevent SQL injection
    allowed_sort_fields = ["added_at", "rating", "title"]
    if sort_by not in allowed_sort_fields:
        sort_by = "added_at"
    
    order_direction = "DESC" if order.lower() == "desc" else "ASC"
    
    cursor = await db.execute(
        f"""
        SELECT id, movie_id, title, poster_path, rating, genres, added_at
        FROM favorites 
        WHERE user_id = ?
        ORDER BY {sort_by} {order_direction}
        """,
        (user_id,)
    )
    
    favorites = [
        {
            "id": row[0],
            "movie_id": row[1],
            "title": row[2],
            "poster_path": row[3],
            "rating": row[4],
            "genres": row[5],
            "added_at": row[6]
        }
        for row in await cursor.fetchall()
    ]
    
    return favorites