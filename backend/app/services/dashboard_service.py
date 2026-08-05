import aiosqlite
from typing import Dict, List
from collections import Counter

class DashboardService:
    """Service for dashboard and insights data."""
    
    @staticmethod
    async def get_user_stats(db: aiosqlite.Connection, user_id: int) -> Dict:
        """Get user dashboard statistics."""
        
        # Get favorites count
        cursor = await db.execute(
            "SELECT COUNT(*) as count FROM favorites WHERE user_id = ?",
            (user_id,)
        )
        favorites_count = (await cursor.fetchone())[0]
        
        # Get watch history count
        cursor = await db.execute(
            "SELECT COUNT(*) as count FROM watch_history WHERE user_id = ?",
            (user_id,)
        )
        watch_count = (await cursor.fetchone())[0]
        
        # Get recommendations count
        cursor = await db.execute(
            "SELECT COUNT(*) as count FROM recommendation_history WHERE user_id = ?",
            (user_id,)
        )
        recommendations_count = (await cursor.fetchone())[0]
        
        # Get average rating of favorites
        cursor = await db.execute(
            "SELECT AVG(rating) as avg_rating FROM favorites WHERE user_id = ? AND rating IS NOT NULL",
            (user_id,)
        )
        avg_rating_row = await cursor.fetchone()
        avg_rating = round(avg_rating_row[0], 1) if avg_rating_row[0] else 0
        
        # Get favorite genres
        cursor = await db.execute(
            "SELECT genres FROM favorites WHERE user_id = ? AND genres IS NOT NULL",
            (user_id,)
        )
        genre_rows = await cursor.fetchall()
        
        all_genres = []
        for row in genre_rows:
            if row[0]:
                all_genres.extend(row[0].split(','))
        
        genre_counts = Counter(all_genres)
        favorite_genre = genre_counts.most_common(1)[0][0] if genre_counts else "None"
        
        # Get recent activity
        cursor = await db.execute(
            """
            SELECT 'favorite' as type, title, added_at as date 
            FROM favorites 
            WHERE user_id = ? 
            UNION ALL 
            SELECT 'watched' as type, title, watched_at as date 
            FROM watch_history 
            WHERE user_id = ?
            ORDER BY date DESC 
            LIMIT 5
            """,
            (user_id, user_id)
        )
        recent_activity = [
            {
                "type": row[0],
                "title": row[1],
                "date": row[2]
            }
            for row in await cursor.fetchall()
        ]
        
        return {
            "stats": {
                "favorite_genre": favorite_genre,
                "movies_saved": favorites_count,
                "movies_watched": watch_count,
                "movies_recommended": recommendations_count,
                "average_rating": avg_rating
            },
            "recent_activity": recent_activity
        }
    
    @staticmethod
    async def get_insights(db: aiosqlite.Connection, user_id: int) -> Dict:
        """Get detailed insights for the insights page."""
        
        # Get genre distribution
        cursor = await db.execute(
            "SELECT genres FROM favorites WHERE user_id = ? AND genres IS NOT NULL",
            (user_id,)
        )
        genre_rows = await cursor.fetchall()
        
        all_genres = []
        for row in genre_rows:
            if row[0]:
                all_genres.extend(row[0].split(','))
        
        genre_distribution = dict(Counter(all_genres).most_common(10))
        
        # Get rating distribution
        cursor = await db.execute(
            "SELECT rating FROM favorites WHERE user_id = ? AND rating IS NOT NULL",
            (user_id,)
        )
        rating_rows = await cursor.fetchall()
        
        ratings = [row[0] for row in rating_rows]
        rating_distribution = {
            "9-10": len([r for r in ratings if r >= 9]),
            "7-8": len([r for r in ratings if 7 <= r < 9]),
            "5-6": len([r for r in ratings if 5 <= r < 7]),
            "3-4": len([r for r in ratings if 3 <= r < 5]),
            "1-2": len([r for r in ratings if r < 3])
        }
        
        # Get top rated movies
        cursor = await db.execute(
            """
            SELECT title, rating, poster_path 
            FROM favorites 
            WHERE user_id = ? AND rating IS NOT NULL 
            ORDER BY rating DESC 
            LIMIT 5
            """,
            (user_id,)
        )
        top_rated = [
            {
                "title": row[0],
                "rating": row[1],
                "poster_path": row[2]
            }
            for row in await cursor.fetchall()
        ]
        
        return {
            "genre_distribution": genre_distribution,
            "rating_distribution": rating_distribution,
            "top_rated": top_rated
        }