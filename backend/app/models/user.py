from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User:
    """User model representation for database operations."""
    
    def __init__(self, id: int, email: str, username: str, password_hash: str, created_at: str):
        self.id = id
        self.email = email
        self.username = username
        self.password_hash = password_hash
        self.created_at = created_at
    
    @staticmethod
    def from_row(row):
        """Create User instance from database row."""
        if row is None:
            return None
        return User(
            id=row['id'],
            email=row['email'],
            username=row['username'],
            password_hash=row['password_hash'],
            created_at=row['created_at']
        )
    
    def to_dict(self):
        """Convert user to dictionary (excluding password)."""
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "created_at": self.created_at
        }