from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.services.dashboard_service import DashboardService
from app.utils.security import get_current_user

router = APIRouter(tags=["Dashboard"])
dashboard_service = DashboardService()

@router.get("/dashboard")
async def get_dashboard(
    current_user: dict = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get user dashboard data."""
    try:
        user_id = int(current_user["sub"])
        return await dashboard_service.get_user_stats(db, user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/insights")
async def get_insights(
    current_user: dict = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get user insights and analytics."""
    try:
        user_id = int(current_user["sub"])
        return await dashboard_service.get_insights(db, user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))