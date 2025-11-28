"""
Unified Backend Server (Port 8000)
WITH SESSION LIFECYCLE CONTROL
- Audience can only join active sessions
- Sessions are deleted when presenter ends them
"""

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Set
from datetime import datetime
from enum import Enum
import asyncio
import logging
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# MODELS
# ============================================================================

class ReactionType(str, Enum):
    SPEED_UP = "SPEED_UP"
    SLOW_DOWN = "SLOW_DOWN"
    SHOW_CODE = "SHOW_CODE"
    IM_LOST = "IM_LOST"


class ReactionEvent(BaseModel):
    reaction_type: ReactionType
    session_id: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[str] = None
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class QuestionEvent(BaseModel):
    question_text: str = Field(..., min_length=1, max_length=500)
    session_id: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_id: Optional[str] = None
    
    @validator('question_text')
    def validate_question(cls, v):
        v = v.strip()
        if not v:
            raise ValueError('Question text cannot be empty')
        return v
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }


class SessionCreateRequest(BaseModel):
    session_id: str = Field(..., min_length=1, max_length=100)


class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    active_connections: int
    active_sessions: int


# ============================================================================
# IN-MEMORY STORAGE WITH SESSION CONTROL
# ============================================================================

class MemoryStorage:
    """Storage with session lifecycle management"""
    
    def __init__(self, max_reactions: int = 1000):
        self.reactions: List[Dict] = []
        self.questions: List[Dict] = []
        self.max_reactions = max_reactions
        
        # Track active sessions (created by presenters)
        self.active_sessions: Set[str] = set()
        self.session_metadata: Dict[str, Dict] = {}
        
        self._lock = asyncio.Lock()
    
    async def create_session(self, session_id: str) -> Dict:
        """Create a new session"""
        async with self._lock:
            if session_id in self.active_sessions:
                return {
                    "status": "exists",
                    "message": "Session already exists",
                    "session_id": session_id
                }
            
            self.active_sessions.add(session_id)
            self.session_metadata[session_id] = {
                'created_at': datetime.utcnow().isoformat(),
                'reaction_count': 0,
                'question_count': 0,
                'status': 'active'
            }
            
            logger.info(f"✅ Session created: {session_id}")
            return {
                "status": "created",
                "message": "Session created successfully",
                "session_id": session_id
            }
    
    async def end_session(self, session_id: str) -> Dict:
        """End a session and clean up all data"""
        async with self._lock:
            if session_id not in self.active_sessions:
                return {
                    "status": "not_found",
                    "message": "Session does not exist"
                }
            
            # Remove session
            self.active_sessions.discard(session_id)
            
            # Remove all reactions for this session
            self.reactions = [r for r in self.reactions if r['session_id'] != session_id]
            
            # Remove all questions for this session
            self.questions = [q for q in self.questions if q['session_id'] != session_id]
            
            # Remove metadata
            if session_id in self.session_metadata:
                del self.session_metadata[session_id]
            
            logger.info(f"❌ Session ended and cleaned: {session_id}")
            return {
                "status": "ended",
                "message": "Session ended and all data removed",
                "session_id": session_id
            }
    
    async def is_session_active(self, session_id: str) -> bool:
        """Check if session is active"""
        async with self._lock:
            return session_id in self.active_sessions
    
    async def add_reaction(self, reaction: ReactionEvent) -> Dict:
        """Add a reaction (only if session is active)"""
        async with self._lock:
            # Check if session is active
            if reaction.session_id not in self.active_sessions:
                raise ValueError("Session not active or does not exist")
            
            reaction_dict = reaction.dict()
            reaction_dict['timestamp'] = reaction_dict['timestamp'].isoformat()
            
            self.reactions.append(reaction_dict)
            
            # Keep only the most recent reactions
            if len(self.reactions) > self.max_reactions:
                self.reactions = self.reactions[-self.max_reactions:]
            
            # Update session metadata
            if reaction.session_id in self.session_metadata:
                self.session_metadata[reaction.session_id]['reaction_count'] += 1
                self.session_metadata[reaction.session_id]['last_activity'] = datetime.utcnow().isoformat()
            
            logger.info(f"Reaction added: {reaction.reaction_type} for session {reaction.session_id} by user {reaction.user_id}")
            return reaction_dict
    
    async def add_question(self, question: QuestionEvent) -> Dict:
        """Add a question (only if session is active)"""
        async with self._lock:
            # Check if session is active
            if question.session_id not in self.active_sessions:
                raise ValueError("Session not active or does not exist")
            
            question_dict = question.dict()
            question_dict['timestamp'] = question_dict['timestamp'].isoformat()
            question_dict['question_id'] = f"q_{len(self.questions) + 1}"
            
            self.questions.append(question_dict)
            
            # Update session metadata
            if question.session_id in self.session_metadata:
                self.session_metadata[question.session_id]['question_count'] += 1
                self.session_metadata[question.session_id]['last_activity'] = datetime.utcnow().isoformat()
            
            logger.info(f"Question added for session {question.session_id} by user {question.user_id}: {question.question_text[:50]}...")
            return question_dict
    
    async def get_recent_reactions(self, session_id: str, limit: int = 50) -> List[Dict]:
        """Get recent reactions for a session"""
        async with self._lock:
            session_reactions = [
                r for r in self.reactions 
                if r['session_id'] == session_id
            ]
            return session_reactions[-limit:]
    
    async def get_questions(self, session_id: str) -> List[Dict]:
        """Get all questions for a session"""
        async with self._lock:
            return [
                q for q in self.questions 
                if q['session_id'] == session_id
            ]
    
    def get_active_sessions_count(self) -> int:
        """Get count of active sessions"""
        return len(self.active_sessions)
    
    def get_active_sessions_list(self) -> List[str]:
        """Get list of active session IDs"""
        return list(self.active_sessions)


# ============================================================================
# WEBSOCKET CONNECTION MANAGER
# ============================================================================

class WebSocketConnectionManager:
    """Manages WebSocket connections"""
    
    def __init__(self):
        # Map: session_id -> set of unique user_ids
        self.session_users: Dict[str, Set[str]] = {}
        
        # Map: session_id -> list of websocket connections
        self.active_connections: Dict[str, List[WebSocket]] = {}
        
        # Map: websocket -> user_id (for cleanup)
        self.ws_to_user: Dict[WebSocket, str] = {}
        
        self._lock = asyncio.Lock()
    
    async def connect(self, websocket: WebSocket, session_id: str, user_id: Optional[str] = None):
        """Accept and register a new WebSocket connection"""
        await websocket.accept()
        
        async with self._lock:
            if session_id not in self.active_connections:
                self.active_connections[session_id] = []
                self.session_users[session_id] = set()
            
            self.active_connections[session_id].append(websocket)
            
            # Track user if provided
            if user_id:
                self.session_users[session_id].add(user_id)
                self.ws_to_user[websocket] = user_id
        
        logger.info(f"✅ WebSocket connected for session: {session_id} (user: {user_id}). "
                   f"Total connections: {len(self.active_connections[session_id])}, "
                   f"Unique users: {len(self.session_users.get(session_id, set()))}")
        
        # Send welcome message
        await websocket.send_json({
            "type": "connection",
            "status": "connected",
            "session_id": session_id,
            "user_id": user_id,
            "timestamp": datetime.utcnow().isoformat(),
            "message": "Connected to presenter dashboard"
        })
    
    async def disconnect(self, websocket: WebSocket, session_id: str):
        """Remove a WebSocket connection"""
        async with self._lock:
            if session_id in self.active_connections:
                if websocket in self.active_connections[session_id]:
                    self.active_connections[session_id].remove(websocket)
                
                # Clean up user tracking
                if websocket in self.ws_to_user:
                    user_id = self.ws_to_user[websocket]
                    del self.ws_to_user[websocket]
                    
                    # Remove user if no more connections from them
                    if not any(self.ws_to_user.get(ws) == user_id 
                              for ws in self.active_connections[session_id]):
                        if session_id in self.session_users:
                            self.session_users[session_id].discard(user_id)
                
                # Clean up empty session lists
                if not self.active_connections[session_id]:
                    del self.active_connections[session_id]
                    if session_id in self.session_users:
                        del self.session_users[session_id]
        
        logger.info(f"❌ WebSocket disconnected for session: {session_id}")
    
    async def disconnect_all_from_session(self, session_id: str):
        """Disconnect all WebSockets from a session (when presenter ends session)"""
        async with self._lock:
            if session_id not in self.active_connections:
                return
            
            connections = self.active_connections[session_id].copy()
        
        # Send session ended message to all connections
        for connection in connections:
            try:
                await connection.send_json({
                    "type": "session_ended",
                    "message": "The presenter has ended this session",
                    "timestamp": datetime.utcnow().isoformat()
                })
                await connection.close()
            except Exception as e:
                logger.error(f"Error closing connection: {e}")
        
        # Clean up
        async with self._lock:
            if session_id in self.active_connections:
                del self.active_connections[session_id]
            if session_id in self.session_users:
                del self.session_users[session_id]
        
        logger.info(f"🔌 All connections closed for session: {session_id}")
    
    async def broadcast_to_session(self, session_id: str, message: dict):
        """Broadcast to session"""
        async with self._lock:
            if session_id not in self.active_connections:
                logger.debug(f"No active connections for session: {session_id}")
                return
            
            connections = self.active_connections[session_id].copy()
        
        # Send to all connections
        disconnected = []
        for connection in connections:
            try:
                await connection.send_json(message)
                logger.debug(f"📤 Message sent to presenter for session {session_id}")
            except Exception as e:
                logger.error(f"Error sending to connection: {e}")
                disconnected.append(connection)
        
        # Clean up disconnected clients
        if disconnected:
            async with self._lock:
                if session_id in self.active_connections:
                    for conn in disconnected:
                        if conn in self.active_connections[session_id]:
                            self.active_connections[session_id].remove(conn)
                    
                    if not self.active_connections[session_id]:
                        del self.active_connections[session_id]
    
    def get_connection_count(self) -> int:
        """Get total number of active connections"""
        return sum(len(conns) for conns in self.active_connections.values())
    
    def get_unique_user_count(self, session_id: Optional[str] = None) -> int:
        """Get count of unique users"""
        if session_id:
            return len(self.session_users.get(session_id, set()))
        return sum(len(users) for users in self.session_users.values())
    
    def get_sessions(self) -> List[str]:
        """Get list of sessions with active connections"""
        return list(self.active_connections.keys())


# ============================================================================
# FASTAPI APP
# ============================================================================

app = FastAPI(
    title="Unified Presentation Feedback API",
    description="Backend with session lifecycle control",
    version="3.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize storage and connection manager
storage = MemoryStorage()
ws_manager = WebSocketConnectionManager()


# ============================================================================
# SESSION MANAGEMENT ENDPOINTS
# ============================================================================

@app.post("/api/session/create", tags=["Session"])
async def create_session(request: SessionCreateRequest):
    """Create a new session (called by presenter)"""
    try:
        result = await storage.create_session(request.session_id)
        return result
    except Exception as e:
        logger.error(f"Error creating session: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/session/{session_id}", tags=["Session"])
async def end_session(session_id: str):
    """End a session and clean up all data (called by presenter)"""
    try:
        # Disconnect all WebSocket connections
        await ws_manager.disconnect_all_from_session(session_id)
        
        # Clean up storage
        result = await storage.end_session(session_id)
        return result
    except Exception as e:
        logger.error(f"Error ending session: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/session/{session_id}/status", tags=["Session"])
async def check_session_status(session_id: str):
    """Check if a session is active"""
    is_active = await storage.is_session_active(session_id)
    return {
        "session_id": session_id,
        "active": is_active,
        "message": "Session is active" if is_active else "Session not found or has ended"
    }


# ============================================================================
# WEBSOCKET ENDPOINT - PRESENTER DASHBOARD
# ============================================================================

@app.websocket("/ws/presenter/{session_id}")
async def websocket_presenter_endpoint(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for presenter dashboards"""
    
    # Check if session exists, if not create it
    # This prevents auto-recreation after intentional deletion
    is_active = await storage.is_session_active(session_id)
    if not is_active:
        # Only create if it truly doesn't exist
        await storage.create_session(session_id)
    
    # Accept connection
    await ws_manager.connect(websocket, session_id)
    
    # Track if this is the LAST presenter connection
    is_last_presenter = False
    
    try:
        # Send initial data
        recent_reactions = await storage.get_recent_reactions(session_id, limit=20)
        recent_questions = await storage.get_questions(session_id)
        
        await websocket.send_json({
            "type": "initial_data",
            "data": {
                "reactions": recent_reactions,
                "questions": recent_questions
            },
            "timestamp": datetime.utcnow().isoformat()
        })
        
        # Keep connection alive
        while True:
            try:
                data = await websocket.receive_text()
                
                try:
                    message = json.loads(data)
                    message_type = message.get("type")
                    
                    if message_type == "ping":
                        await websocket.send_json({
                            "type": "pong",
                            "timestamp": datetime.utcnow().isoformat()
                        })
                    
                    elif message_type == "request_data":
                        reactions = await storage.get_recent_reactions(session_id, limit=50)
                        questions = await storage.get_questions(session_id)
                        await websocket.send_json({
                            "type": "data_update",
                            "data": {
                                "reactions": reactions,
                                "questions": questions
                            },
                            "timestamp": datetime.utcnow().isoformat()
                        })
                    
                    elif message_type == "end_session":
                        # Explicit end session command from presenter
                        logger.info(f"🛑 Explicit end session command received for: {session_id}")
                        is_last_presenter = True
                        break
                
                except json.JSONDecodeError:
                    logger.warning(f"Invalid JSON received from presenter: {data}")
            
            except asyncio.TimeoutError:
                await websocket.send_json({
                    "type": "keepalive",
                    "timestamp": datetime.utcnow().isoformat()
                })
    
    except WebSocketDisconnect:
        pass
    
    except Exception as e:
        logger.error(f"WebSocket error for session {session_id}: {e}")
    
    finally:
        # Always disconnect this websocket
        await ws_manager.disconnect(websocket, session_id)
        
        # Check if there are still other presenter connections
        remaining_connections = ws_manager.get_connection_count_for_session(session_id)
        
        # Only end session if:
        # 1. Explicit end command was received, OR
        # 2. This was the last presenter connection
        if is_last_presenter or remaining_connections == 0:
            logger.info(f"Presenter disconnected from session: {session_id}, ending session...")
            await storage.end_session(session_id)
            await ws_manager.disconnect_all_from_session(session_id)
        else:
            logger.info(f"Presenter connection closed for session: {session_id}, but {remaining_connections} connections remain")


# ============================================================================
# AUDIENCE API ENDPOINTS
# ============================================================================

@app.post("/api/audience/reaction", tags=["Audience"])
async def submit_reaction(reaction: ReactionEvent):
    """Submit an audience reaction"""
    try:
        # Check if session is active
        if not await storage.is_session_active(reaction.session_id):
            raise HTTPException(
                status_code=404, 
                detail="Session not found or has ended"
            )
        
        # Store the reaction
        reaction_dict = await storage.add_reaction(reaction)
        
        # Broadcast to connected presenters
        await ws_manager.broadcast_to_session(reaction.session_id, {
            "type": "reaction",
            "data": reaction_dict,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        logger.info(f"📢 Reaction broadcasted to session {reaction.session_id}")
        
        return {
            "status": "success",
            "message": "Reaction recorded",
            "reaction": reaction_dict
        }
    
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error processing reaction: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/audience/question", tags=["Audience"])
async def submit_question(question: QuestionEvent):
    """Submit an audience question"""
    try:
        # Check if session is active
        if not await storage.is_session_active(question.session_id):
            raise HTTPException(
                status_code=404, 
                detail="Session not found or has ended"
            )
        
        # Store the question
        question_dict = await storage.add_question(question)
        
        # Broadcast to connected presenters
        await ws_manager.broadcast_to_session(question.session_id, {
            "type": "question",
            "data": question_dict,
            "timestamp": datetime.utcnow().isoformat()
        })
        
        logger.info(f"📢 Question broadcasted to session {question.session_id}")
        
        return {
            "status": "success",
            "message": "Question recorded",
            "question": question_dict
        }
    
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        logger.error(f"Error processing question: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# PRESENTER API ENDPOINTS
# ============================================================================

@app.get("/api/presenter/reactions", tags=["Presenter"])
async def get_reactions(
    session_id: str = Query(..., description="Session ID"),
    limit: int = Query(50, description="Maximum number of reactions to return")
):
    """Get recent reactions for a session"""
    try:
        reactions = await storage.get_recent_reactions(session_id, limit)
        return {
            "session_id": session_id,
            "count": len(reactions),
            "reactions": reactions,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Error fetching reactions: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/presenter/questions", tags=["Presenter"])
async def get_questions(
    session_id: str = Query(..., description="Session ID")
):
    """Get all questions for a session"""
    try:
        questions = await storage.get_questions(session_id)
        return {
            "session_id": session_id,
            "count": len(questions),
            "questions": questions,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        logger.error(f"Error fetching questions: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ============================================================================
# GENERAL ENDPOINTS
# ============================================================================

@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "Unified Presentation Feedback API",
        "version": "3.0.0 (Session Control)",
        "status": "running"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow(),
        active_connections=ws_manager.get_connection_count(),
        active_sessions=storage.get_active_sessions_count()
    )


@app.get("/api/stats", tags=["Statistics"])
async def get_statistics():
    """Get overall statistics"""
    return {
        "total_reactions": len(storage.reactions),
        "total_questions": len(storage.questions),
        "active_sessions": storage.get_active_sessions_list(),
        "active_websocket_connections": ws_manager.get_connection_count(),
        "unique_users": ws_manager.get_unique_user_count(),
        "timestamp": datetime.utcnow().isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )