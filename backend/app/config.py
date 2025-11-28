from typing import List


class Settings:
    """Application settings"""
    
    # CORS settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # Audience frontend
        "http://localhost:3001",  # Presenter frontend
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]
    
    # API settings
    API_V1_PREFIX: str = "/api"
    PROJECT_NAME: str = "Real-Time Audience Feedback System"
    
    # Storage settings
    MAX_REACTIONS_PER_SESSION: int = 1000
    MAX_QUESTIONS_PER_SESSION: int = 500
    
    # WebSocket settings
    WS_KEEPALIVE_INTERVAL: int = 30  # seconds


settings = Settings()