from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional, List, Dict
from enum import Enum


class SessionStatus(str, Enum):
    """Enum for session status"""
    ACTIVE = "ACTIVE"
    PAUSED = "PAUSED"
    ENDED = "ENDED"


class SessionInfo(BaseModel):
    """Extended model for session information with metadata"""
    session_id: str = Field(..., min_length=1, max_length=100)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)
    status: SessionStatus = Field(default=SessionStatus.ACTIVE)
    presenter_name: Optional[str] = Field(None, max_length=200)
    session_title: Optional[str] = Field(None, max_length=300)
    total_reactions: int = Field(default=0)
    total_questions: int = Field(default=0)
    total_audience_members: int = Field(default=0)
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        """Validate session_id format"""
        if not v.replace('-', '').replace('_', '').isalnum():
            raise ValueError('session_id must contain only alphanumeric characters, dashes, and underscores')
        return v
    
    def update_timestamp(self):
        """Update the updated_at timestamp"""
        self.updated_at = datetime.utcnow()
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "demo-session-123",
                "created_at": "2024-01-15T10:30:00Z",
                "is_active": True,
                "status": "ACTIVE",
                "presenter_name": "John Doe",
                "session_title": "Introduction to FastAPI",
                "total_reactions": 45,
                "total_questions": 12,
                "total_audience_members": 25
            }
        }


class SessionCreate(BaseModel):
    """Model for creating a new session"""
    session_id: str = Field(..., min_length=1, max_length=100)
    presenter_name: Optional[str] = Field(None, max_length=200)
    session_title: Optional[str] = Field(None, max_length=300)
    
    @field_validator('session_id')
    @classmethod
    def validate_session_id(cls, v: str) -> str:
        """Validate session_id format"""
        if not v.replace('-', '').replace('_', '').isalnum():
            raise ValueError('session_id must contain only alphanumeric characters, dashes, and underscores')
        return v


class SessionUpdate(BaseModel):
    """Model for updating session information"""
    status: Optional[SessionStatus] = None
    presenter_name: Optional[str] = Field(None, max_length=200)
    session_title: Optional[str] = Field(None, max_length=300)
    is_active: Optional[bool] = None


class SessionStats(BaseModel):
    """Model for session statistics"""
    session_id: str
    total_reactions: int
    total_questions: int
    reaction_breakdown: Dict[str, int]
    active_duration_minutes: int
    last_activity: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "session_id": "demo-session-123",
                "total_reactions": 45,
                "total_questions": 12,
                "reaction_breakdown": {
                    "SPEED_UP": 15,
                    "SLOW_DOWN": 8,
                    "SHOW_CODE": 12,
                    "IM_LOST": 10
                },
                "active_duration_minutes": 45,
                "last_activity": "2024-01-15T11:15:00Z"
            }
        }


class AudienceMember(BaseModel):
    """Model for tracking audience members"""
    user_id: str = Field(..., max_length=100)
    session_id: str = Field(..., max_length=100)
    joined_at: datetime = Field(default_factory=datetime.utcnow)
    last_activity: datetime = Field(default_factory=datetime.utcnow)
    total_reactions: int = Field(default=0)
    total_questions: int = Field(default=0)
    is_active: bool = Field(default=True)