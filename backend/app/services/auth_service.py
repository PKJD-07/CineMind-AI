import aiosqlite
from typing import Optional
from app.models.user import User
from app.utils.security import hash_password, verify_password, create_access_token
from app.schemas.user import UserRegister

class AuthService:
    """Service for handling authentication operations."""
    
    @staticmethod
    async def register_user(db: aiosqlite.Connection, user_data: UserRegister) -> dict:
        """Register a new user."""
        # Check if user already exists
        cursor = await db.execute(
            "SELECT id FROM users WHERE email = ? OR username = ?",
            (user_data.email, user_data.username)
        )
        existing_user = await cursor.fetchone()
        
        if existing_user:
            raise ValueError("User with this email or username already exists")
        
        # Create user
        password_hash = hash_password(user_data.password)
        cursor = await db.execute(
            "INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)",
            (user_data.email, user_data.username, password_hash)
        )
        await db.commit()
        
        user_id = cursor.lastrowid
        
        # Generate token
        access_token = create_access_token(data={"sub": str(user_id), "email": user_data.email})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "email": user_data.email,
                "username": user_data.username
            }
        }
    
    @staticmethod
    async def login_user(db: aiosqlite.Connection, email: str, password: str) -> dict:
        """Authenticate user and return token."""
        cursor = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        )
        user_row = await cursor.fetchone()
        
        if not user_row:
            raise ValueError("Invalid email or password")
        
        user = User.from_row(user_row)
        
        if not verify_password(password, user.password_hash):
            raise ValueError("Invalid email or password")
        
        # Generate token
        access_token = create_access_token(data={"sub": str(user.id), "email": user.email})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user.to_dict()
        }