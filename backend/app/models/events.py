from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional
from enum import Enum


class ReactionType(str, Enum):
    """Enum for reaction types"""
    SPEED_UP = "SPEED_UP"
    SLOW_DOWN = "SLOW_DOWN"
    SHOW_CODE = "SHOW_CODE"
    IM_LOST = "IM_LOST"


class ReactionEvent(BaseModel):
    """Model for audience reaction events"""
    reaction_type: ReactionType
    session_id: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[str] = Field(None, max_length=100)
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        """Validate session_id format"""
        if not v.replace('-', '').replace('_', '').isalnum():
            raise ValueError('session_id must contain only alphanumeric characters, dashes, and underscores')
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "reaction_type": "SPEED_UP",
                "session_id": "demo-session-123",
                "user_id": "user-456"
            }
        }


class QuestionEvent(BaseModel):
    """Model for audience question events"""
    question_text: str = Field(..., min_length=1, max_length=500)
    session_id: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[str] = Field(None, max_length=100)
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        """Validate session_id format"""
        if not v.replace('-', '').replace('_', '').isalnum():
            raise ValueError('session_id must contain only alphanumeric characters, dashes, and underscores')
        return v
    
    @field_validator('question_text')
    @classmethod
    def validate_question_text(cls, v: str) -> str:
        """Validate question text is not just whitespace"""
        if not v.strip():
            raise ValueError('question_text cannot be empty or just whitespace')
        return v.strip()
    
    class Config:
        json_schema_extra = {
            "example": {
                "question_text": "Can you explain the database schema?",
                "session_id": "demo-session-123",
                "user_id": "user-789"
            }
        }


class SessionInfo(BaseModel):
    """Model for session information"""
    session_id: str = Field(..., min_length=1, max_length=100)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        """Validate session_id format"""
        if not v.replace('-', '').replace('_', '').isalnum():
            raise ValueError('session_id must contain only alphanumeric characters, dashes, and underscores')
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "demo-session-123",
                "created_at": "2024-01-15T10:30:00Z",
                "is_active": True
            }
        }


# Response models
class ReactionResponse(BaseModel):
    """Response model for reaction submission"""
    success: bool
    message: str
    reaction: ReactionEvent


class QuestionResponse(BaseModel):
    """Response model for question submission"""
    success: bool
    message: str
    question: QuestionEvent


class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)