"""
Backend with PostgreSQL Database and AI Agents
Install: pip install fastapi uvicorn sqlalchemy psycopg2-binary asyncpg google-generativeai python-dotenv
"""

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Set
from datetime import datetime, timezone
from enum import Enum
import asyncio
import logging
import json

from sqlalchemy import create_engine, Column, String, DateTime, Integer, Text, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import StaticPool

# Import AI Agent components
from agent_manager import get_agent_manager, remove_agent_manager
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================

DATABASE_URL = "postgresql://postgres:admin@localhost:5432/feedback_db"
# DATABASE_URL = "sqlite:///./feedback.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    poolclass=StaticPool if "sqlite" in DATABASE_URL else None,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ============================================================================
# DATABASE MODELS
# ============================================================================

class ReactionType(str, Enum):
    SPEED_UP = "SPEED_UP"
    SLOW_DOWN = "SLOW_DOWN"
    SHOW_CODE = "SHOW_CODE"
    IM_LOST = "IM_LOST"


class SessionDB(Base):
    __tablename__ = "sessions"
    
    session_id = Column(String(100), primary_key=True, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    status = Column(String(20), default="active")
    reaction_count = Column(Integer, default=0)
    question_count = Column(Integer, default=0)
    last_activity = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class ReactionDB(Base):
    __tablename__ = "reactions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    reaction_type = Column(SQLEnum(ReactionType))
    session_id = Column(String(100), index=True)
    user_id = Column(String(200))
    user_name = Column(String(100))
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class QuestionDB(Base):
    __tablename__ = "questions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question_text = Column(Text)
    session_id = Column(String(100), index=True)
    user_id = Column(String(200))
    user_name = Column(String(100))
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))


Base.metadata.create_all(bind=engine)

# ============================================================================
# PYDANTIC MODELS
# ============================================================================

class ReactionEvent(BaseModel):
    reaction_type: ReactionType
    session_id: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    user_id: Optional[str] = None
    user_name: Optional[str] = Field(None, max_length=100)
    
    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}


class QuestionEvent(BaseModel):
    question_text: str = Field(..., min_length=1, max_length=500)
    session_id: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    user_id: Optional[str] = None
    user_name: Optional[str] = Field(None, max_length=100)
    
    @validator('question_text')
    def validate_question(cls, v):
        v = v.strip()
        if not v:
            raise ValueError('Question text cannot be empty')
        return v
    
    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}


class SessionCreateRequest(BaseModel):
    session_id: str = Field(..., min_length=1, max_length=100)


# ============================================================================
# DATABASE DEPENDENCY
# ============================================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ============================================================================
# WEBSOCKET CONNECTION MANAGER
# ============================================================================

class WebSocketConnectionManager:
    """Manages WebSocket connections"""
    
    def __init__(self):
        self.session_users: Dict[str, Set[str]] = {}
        self.active_connections: Dict[str, List[WebSocket]] = {}
        self.ws_to_user: Dict[WebSocket, str] = {}
        self._lock = asyncio.Lock()
    
    async def connect(self, websocket: WebSocket, session_id: str, user_id: Optional[str] = None):
        await websocket.accept()
        
        async with self._lock:
            if session_id not in self.active_connections:
                self.active_connections[session_id] = []
                self.session_users[session_id] = set()
            
            self.active_connections[session_id].append(websocket)
            
            if user_id:
                self.session_users[session_id].add(user_id)
                self.ws_to_user[websocket] = user_id
        
        logger.info(f"✅ WebSocket connected for session: {session_id}")
        
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "session_id": session_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        })
    
    async def disconnect(self, websocket: WebSocket, session_id: str):
        async with self._lock:
            if session_id in self.active_connections:
                if websocket in self.active_connections[session_id]:
                    self.active_connections[session_id].remove(websocket)
                
                if websocket in self.ws_to_user:
                    user_id = self.ws_to_user[websocket]
                    del self.ws_to_user[websocket]
                    
                    if not any(self.ws_to_user.get(ws) == user_id 
                              for ws in self.active_connections[session_id]):
                        if session_id in self.session_users:
                            self.session_users[session_id].discard(user_id)
                
                if not self.active_connections[session_id]:
                    del self.active_connections[session_id]
                    if session_id in self.session_users:
                        del self.session_users[session_id]
        
        logger.info(f"❌ WebSocket disconnected for session: {session_id}")
    
    async def disconnect_all_from_session(self, session_id: str):
        async with self._lock:
            if session_id not in self.active_connections:
                return
            
            connections = self.active_connections[session_id].copy()
        
        for connection in connections:
            try:
                await connection.send_json({
                    "type": "session_ended",
                    "message": "The presenter has ended this session",
                    "timestamp": datetime.now(timezone.utc).isoformat()
                })
                await connection.close()
            except Exception as e:
                logger.error(f"Error closing connection: {e}")
        
        async with self._lock:
            if session_id in self.active_connections:
                for ws in self.active_connections[session_id]:
                    if ws in self.ws_to_user:
                        del self.ws_to_user[ws]
                
                del self.active_connections[session_id]
            if session_id in self.session_users:
                del self.session_users[session_id]
        
        logger.info(f"🔌 All connections closed for session: {session_id}")
    
    async def broadcast_to_session(self, session_id: str, message: dict):
        async with self._lock:
            if session_id not in self.active_connections:
                return
            
            connections = self.active_connections[session_id].copy()
        
        disconnected = []
        for connection in connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                logger.error(f"Error sending to connection: {e}")
                disconnected.append(connection)
        
        if disconnected:
            async with self._lock:
                if session_id in self.active_connections:
                    for conn in disconnected:
                        if conn in self.active_connections[session_id]:
                            self.active_connections[session_id].remove(conn)
                    
                    if not self.active_connections[session_id]:
                        del self.active_connections[session_id]
    
    def get_connection_count_for_session(self, session_id: str) -> int:
        return len(self.active_connections.get(session_id, []))
    
    def get_connection_count(self) -> int:
        return sum(len(conns) for conns in self.active_connections.values())


# ============================================================================
# FASTAPI APP
# ============================================================================

app = FastAPI(
    title="Presentation Feedback API with AI Agents",
    version="5.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ws_manager = WebSocketConnectionManager()


# ============================================================================
# SESSION ENDPOINTS
# ============================================================================

@app.post("/api/session/create", tags=["Session"])
async def create_session(request: SessionCreateRequest, db: Session = Depends(get_db)):
    """Create a new session"""
    try:
        existing = db.query(SessionDB).filter(SessionDB.session_id == request.session_id).first()
        
        if existing:
            return {
                "status": "exists",
                "message": "Session already exists",
                "session_id": request.session_id
            }
        
        new_session = SessionDB(
            session_id=request.session_id,
            status="active",
            created_at=datetime.now(timezone.utc),
            last_activity=datetime.now(timezone.utc)
        )
        db.add(new_session)
        db.commit()
        
        # Initialize AI agents for this session
        agent_manager = get_agent_manager(request.session_id, ws_manager)
        await agent_manager.start()
        
        logger.info(f"✅ Session created with AI agents: {request.session_id}")
        return {
            "status": "created",
            "message": "Session created successfully with AI agents",
            "session_id": request.session_id
        }
    except Exception as e:
        logger.error(f"Error creating session: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/session/{session_id}", tags=["Session"])
async def end_session(session_id: str, db: Session = Depends(get_db)):
    """End a session and clean up"""
    try:
        # Stop AI agents
        await remove_agent_manager(session_id)
        
        await ws_manager.disconnect_all_from_session(session_id)
        
        session = db.query(SessionDB).filter(SessionDB.session_id == session_id).first()
        if session:
            db.delete(session)
        
        db.query(ReactionDB).filter(ReactionDB.session_id == session_id).delete()
        db.query(QuestionDB).filter(QuestionDB.session_id == session_id).delete()
        db.commit()
        
        logger.info(f"❌ Session ended: {session_id}")
        return {
            "status": "ended",
            "message": "Session ended and data removed",
            "session_id": session_id
        }
    except Exception as e:
        logger.error(f"Error ending session: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/session/{session_id}/status", tags=["Session"])
async def check_session_status(session_id: str, db: Session = Depends(get_db)):
    """Check if session is active"""
    session = db.query(SessionDB).filter(SessionDB.session_id == session_id).first()
    is_active = session is not None and session.status == "active"
    
    # Get agent status if active
    agent_status = None
    if is_active:
        try:
            agent_manager = get_agent_manager(session_id, ws_manager)
            agent_status = agent_manager.get_status()
        except:
            pass
    
    return {
        "session_id": session_id,
        "active": is_active,
        "message": "Session is active" if is_active else "Session not found or has ended",
        "agent_status": agent_status
    }


# ============================================================================
# PRESENTER ENDPOINTS
# ============================================================================

@app.get("/api/presenter/reactions", tags=["Presenter"])
async def get_reactions(
    session_id: str = Query(...),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db)
):
    """Get reactions for a session"""
    try:
        reactions = db.query(ReactionDB)\
            .filter(ReactionDB.session_id == session_id)\
            .order_by(ReactionDB.timestamp.desc())\
            .limit(limit)\
            .all()
        
        return {
            "reactions": [
                {
                    "reaction_type": r.reaction_type.value,
                    "timestamp": r.timestamp.isoformat(),
                    "session_id": r.session_id,
                    "user_id": r.user_id,
                    "user_name": r.user_name
                }
                for r in reactions
            ]
        }
    except Exception as e:
        logger.error(f"Error fetching reactions: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/presenter/questions", tags=["Presenter"])
async def get_questions(
    session_id: str = Query(...),
    db: Session = Depends(get_db)
):
    """Get questions for a session"""
    try:
        questions = db.query(QuestionDB)\
            .filter(QuestionDB.session_id == session_id)\
            .order_by(QuestionDB.timestamp.desc())\
            .all()
        
        return {
            "questions": [
                {
                    "question_text": q.question_text,
                    "timestamp": q.timestamp.isoformat(),
                    "session_id": q.session_id,
                    "user_id": q.user_id,
                    "user_name": q.user_name
                }
                for q in questions
            ]
        }
    except Exception as e:
        logger.error(f"Error fetching questions: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# WEBSOCKET ENDPOINT
# ============================================================================

@app.websocket("/ws/presenter/{session_id}")
async def websocket_presenter_endpoint(websocket: WebSocket, session_id: str):
    """WebSocket for presenters"""
    db = SessionLocal()
    
    try:
        session = db.query(SessionDB).filter(SessionDB.session_id == session_id).first()
        if not session:
            new_session = SessionDB(session_id=session_id, status="active")
            db.add(new_session)
            db.commit()
            
            # Start AI agents
            agent_manager = get_agent_manager(session_id, ws_manager)
            await agent_manager.start()
        
        await ws_manager.connect(websocket, session_id)
        
        reactions = db.query(ReactionDB).filter(ReactionDB.session_id == session_id).order_by(ReactionDB.timestamp.desc()).limit(20).all()
        questions = db.query(QuestionDB).filter(QuestionDB.session_id == session_id).order_by(QuestionDB.timestamp.desc()).all()
        
        await websocket.send_json({
            "type": "initial_data",
            "data": {
                "reactions": [
                    {
                        "reaction_type": r.reaction_type.value,
                        "user_name": r.user_name,
                        "timestamp": r.timestamp.isoformat()
                    } for r in reactions
                ],
                "questions": [
                    {
                        "question_text": q.question_text,
                        "user_name": q.user_name,
                        "timestamp": q.timestamp.isoformat()
                    } for q in questions
                ]
            },
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        is_last_presenter = False
        
        while True:
            try:
                data = await websocket.receive_text()
                message = json.loads(data)
                
                if message.get("type") == "end_session":
                    is_last_presenter = True
                    break
                    
            except asyncio.TimeoutError:
                await websocket.send_json({"type": "keepalive"})
    
    except WebSocketDisconnect:
        pass
    finally:
        await ws_manager.disconnect(websocket, session_id)
        
        if is_last_presenter or ws_manager.get_connection_count_for_session(session_id) == 0:
            await remove_agent_manager(session_id)
            session = db.query(SessionDB).filter(SessionDB.session_id == session_id).first()
            if session:
                db.delete(session)
            db.query(ReactionDB).filter(ReactionDB.session_id == session_id).delete()
            db.query(QuestionDB).filter(QuestionDB.session_id == session_id).delete()
            db.commit()
            await ws_manager.disconnect_all_from_session(session_id)
        
        db.close()


# ============================================================================
# AUDIENCE ENDPOINTS
# ============================================================================

@app.post("/api/audience/reaction", tags=["Audience"])
async def submit_reaction(reaction: ReactionEvent, db: Session = Depends(get_db)):
    """Submit reaction"""
    try:
        session = db.query(SessionDB).filter(SessionDB.session_id == reaction.session_id).first()
        if not session or session.status != "active":
            raise HTTPException(status_code=404, detail="Session not found or has ended")
        
        new_reaction = ReactionDB(
            reaction_type=reaction.reaction_type,
            session_id=reaction.session_id,
            user_id=reaction.user_id,
            user_name=reaction.user_name,
            timestamp=datetime.now(timezone.utc)
        )
        db.add(new_reaction)
        
        session.reaction_count += 1
        session.last_activity = datetime.now(timezone.utc)
        db.commit()
        
        # Notify AI agents
        agent_manager = get_agent_manager(reaction.session_id, ws_manager)
        await agent_manager.on_reaction(reaction.reaction_type.value, new_reaction.timestamp)
        
        await ws_manager.broadcast_to_session(reaction.session_id, {
            "type": "reaction",
            "data": {
                "reaction_type": reaction.reaction_type.value,
                "user_name": reaction.user_name,
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        })
        
        return {"status": "success", "message": "Reaction recorded"}
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/audience/question", tags=["Audience"])
async def submit_question(question: QuestionEvent, db: Session = Depends(get_db)):
    """Submit question"""
    try:
        session = db.query(SessionDB).filter(SessionDB.session_id == question.session_id).first()
        if not session or session.status != "active":
            raise HTTPException(status_code=404, detail="Session not found or has ended")
        
        # Create timestamp
        question_timestamp = datetime.now(timezone.utc)
        
        new_question = QuestionDB(
            question_text=question.question_text,
            session_id=question.session_id,
            user_id=question.user_id,
            user_name=question.user_name,
            timestamp=question_timestamp
        )
        db.add(new_question)
        
        session.question_count += 1
        session.last_activity = datetime.now(timezone.utc)
        db.commit()
        
        # Notify AI agents - ensure user_name is not None
        agent_manager = get_agent_manager(question.session_id, ws_manager)
        user_name = question.user_name if question.user_name else "Anonymous"
        
        # Pass the timestamp we just created
        await agent_manager.on_question(
            question.question_text, 
            user_name,
            question_timestamp
        )
        
        await ws_manager.broadcast_to_session(question.session_id, {
            "type": "question",
            "data": {
                "question_text": question.question_text,
                "user_name": question.user_name,
                "timestamp": question_timestamp.isoformat()
            }
        })
        
        return {"status": "success", "message": "Question recorded"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting question: {e}")
        import traceback
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/", tags=["Root"])
async def root():
    return {"service": "Feedback API with AI Agents", "version": "5.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)