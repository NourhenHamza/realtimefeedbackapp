from collections import deque
from typing import List, Dict, Optional
from datetime import datetime, timedelta
from app.models.events import ReactionEvent, QuestionEvent, SessionInfo
import asyncio
import logging

logger = logging.getLogger(__name__)


class InMemoryStorage:
    """
    In-memory storage for reactions, questions, and session data.
    Uses deque for efficient FIFO operations and automatic size limiting.
    """
    
    def __init__(self, max_reactions: int = 1000, max_questions: int = 500):
        """
        Initialize the storage with size limits.
        
        Args:
            max_reactions: Maximum number of reactions to store per session
            max_questions: Maximum number of questions to store per session
        """
        # Store reactions by session_id
        self.reactions: Dict[str, deque] = {}
        
        # Store questions by session_id
        self.questions: Dict[str, deque] = {}
        
        # Store session information
        self.sessions: Dict[str, SessionInfo] = {}
        
        # Configuration
        self.max_reactions = max_reactions
        self.max_questions = max_questions
        
        # Lock for thread-safe operations
        self._lock = asyncio.Lock()
    
    async def add_reaction(self, reaction: ReactionEvent) -> bool:
        """
        Add a reaction to storage.
        
        Args:
            reaction: ReactionEvent to store
            
        Returns:
            True if successfully added
        """
        async with self._lock:
            session_id = reaction.session_id
            
            # Initialize deque for session if it doesn't exist
            if session_id not in self.reactions:
                self.reactions[session_id] = deque(maxlen=self.max_reactions)
            
            # Add reaction (oldest will be automatically removed if at max)
            self.reactions[session_id].append(reaction)
            
            logger.info(f"Added reaction {reaction.reaction_type} to session {session_id}. Total: {len(self.reactions[session_id])}")
            
            return True
    
    async def add_question(self, question: QuestionEvent) -> bool:
        """
        Add a question to storage.
        
        Args:
            question: QuestionEvent to store
            
        Returns:
            True if successfully added
        """
        async with self._lock:
            session_id = question.session_id
            
            # Initialize deque for session if it doesn't exist
            if session_id not in self.questions:
                self.questions[session_id] = deque(maxlen=self.max_questions)
            
            # Add question
            self.questions[session_id].append(question)
            
            logger.info(f"Added question to session {session_id}. Total: {len(self.questions[session_id])}")
            
            return True
    
    async def get_recent_reactions(
        self, 
        session_id: str, 
        limit: int = 50,
        since: Optional[datetime] = None
    ) -> List[ReactionEvent]:
        """
        Get recent reactions for a session.
        
        Args:
            session_id: Session ID to query
            limit: Maximum number of reactions to return
            since: Optional datetime to filter reactions after this time
            
        Returns:
            List of ReactionEvent objects, newest first
        """
        async with self._lock:
            if session_id not in self.reactions:
                return []
            
            reactions = list(self.reactions[session_id])
            
            # Filter by time if specified
            if since:
                reactions = [r for r in reactions if r.timestamp > since]
            
            # Return newest first, limited to 'limit'
            return reactions[-limit:][::-1]
    
    async def get_questions(
        self, 
        session_id: str,
        since: Optional[datetime] = None
    ) -> List[QuestionEvent]:
        """
        Get questions for a session.
        
        Args:
            session_id: Session ID to query
            since: Optional datetime to filter questions after this time
            
        Returns:
            List of QuestionEvent objects, newest first
        """
        async with self._lock:
            if session_id not in self.questions:
                return []
            
            questions = list(self.questions[session_id])
            
            # Filter by time if specified
            if since:
                questions = [q for q in questions if q.timestamp > since]
            
            # Return newest first
            return questions[::-1]
    
    async def get_reaction_counts(
        self, 
        session_id: str,
        time_window: Optional[timedelta] = None
    ) -> Dict[str, int]:
        """
        Get counts of each reaction type for a session.
        
        Args:
            session_id: Session ID to query
            time_window: Optional timedelta to only count recent reactions
            
        Returns:
            Dictionary mapping reaction types to counts
        """
        since = None
        if time_window:
            since = datetime.utcnow() - time_window
        
        reactions = await self.get_recent_reactions(session_id, limit=self.max_reactions, since=since)
        
        counts = {
            "SPEED_UP": 0,
            "SLOW_DOWN": 0,
            "SHOW_CODE": 0,
            "IM_LOST": 0
        }
        
        for reaction in reactions:
            counts[reaction.reaction_type.value] += 1
        
        return counts
    
    async def create_session(self, session_id: str) -> SessionInfo:
        """
        Create a new session.
        
        Args:
            session_id: Session ID to create
            
        Returns:
            SessionInfo object
        """
        async with self._lock:
            session = SessionInfo(session_id=session_id)
            self.sessions[session_id] = session
            logger.info(f"Created session {session_id}")
            return session
    
    async def get_session(self, session_id: str) -> Optional[SessionInfo]:
        """
        Get session information.
        
        Args:
            session_id: Session ID to query
            
        Returns:
            SessionInfo object or None
        """
        return self.sessions.get(session_id)
    
    async def deactivate_session(self, session_id: str) -> bool:
        """
        Mark a session as inactive.
        
        Args:
            session_id: Session ID to deactivate
            
        Returns:
            True if successful
        """
        async with self._lock:
            if session_id in self.sessions:
                self.sessions[session_id].is_active = False
                logger.info(f"Deactivated session {session_id}")
                return True
            return False
    
    async def clear_session_data(self, session_id: str) -> bool:
        """
        Clear all data for a session (useful for cleanup).
        
        Args:
            session_id: Session ID to clear
            
        Returns:
            True if successful
        """
        async with self._lock:
            cleared = False
            
            if session_id in self.reactions:
                del self.reactions[session_id]
                cleared = True
            
            if session_id in self.questions:
                del self.questions[session_id]
                cleared = True
            
            if session_id in self.sessions:
                del self.sessions[session_id]
                cleared = True
            
            if cleared:
                logger.info(f"Cleared all data for session {session_id}")
            
            return cleared
    
    async def get_all_sessions(self) -> List[SessionInfo]:
        """
        Get all sessions.
        
        Returns:
            List of SessionInfo objects
        """
        return list(self.sessions.values())
    
    async def get_stats(self) -> Dict:
        """
        Get storage statistics.
        
        Returns:
            Dictionary with storage stats
        """
        async with self._lock:
            return {
                "total_sessions": len(self.sessions),
                "active_sessions": sum(1 for s in self.sessions.values() if s.is_active),
                "total_reactions": sum(len(r) for r in self.reactions.values()),
                "total_questions": sum(len(q) for q in self.questions.values()),
                "sessions_with_reactions": len(self.reactions),
                "sessions_with_questions": len(self.questions)
            }


# Global singleton instance
storage = InMemoryStorage()