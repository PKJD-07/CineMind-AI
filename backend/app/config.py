from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    tmdb_api_key: str
    groq_api_key: str
    jwt_secret: str

    database_url: str = "sqlite:///./cinemind.db"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60 * 24 * 7

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings():
    return Settings()