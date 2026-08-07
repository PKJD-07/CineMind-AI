from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.user import UserRegister, UserLogin, TokenResponse
from app.services.auth_service import AuthService
from app.database import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserRegister, db=Depends(get_db)):
    try:
        return await AuthService.register_user(db, user_data)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin, db = Depends(get_db)):
    """Login user."""
    try:
        result = await AuthService.login_user(db, user_data.email, user_data.password)
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )