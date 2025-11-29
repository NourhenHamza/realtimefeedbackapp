"""
Agent Manager - Coordinates all AI agents for a session
"""
import asyncio
from datetime import datetime
from typing import Dict, Optional
import logging

from pacing_agent import PacingAgent
from qa_grouper_agent import QAGrouperAgent

logger = logging.getLogger(__name__)


class AgentManager:
    """
    Manages all AI agents for a presentation session
    """
    
    def __init__(self, session_id: str, websocket_manager):
        self.session_id = session_id
        self.ws_manager = websocket_manager
        
        # Initialize agents
        self.pacing_agent = PacingAgent(session_id)
        self.qa_grouper = QAGrouperAgent(session_id)
        
        # Background tasks
        self.running = False
        self.tasks = []
        
        logger.info(f"Agent Manager initialized for session {session_id}")
    
    async def start(self):
        """Start all background agent tasks"""
        if self.running:
            return
        
        self.running = True
        
        # Start periodic AI insights (every 2 minutes)
        self.tasks.append(
            asyncio.create_task(self._periodic_ai_insights())
        )
        
        # Start periodic question grouping check (every 30 seconds)
        self.tasks.append(
            asyncio.create_task(self._periodic_question_grouping())
        )
        
        logger.info(f"Agent Manager started for session {self.session_id}")
    
    async def stop(self):
        """Stop all background agent tasks"""
        self.running = False
        
        for task in self.tasks:
            task.cancel()
        
        await asyncio.gather(*self.tasks, return_exceptions=True)
        self.tasks.clear()
        
        logger.info(f"Agent Manager stopped for session {self.session_id}")
    
    async def on_reaction(self, reaction_type: str, timestamp: datetime):
        """
        Handle new reaction event
        
        Args:
            reaction_type: Type of reaction
            timestamp: When the reaction occurred
        """
        # Add to pacing agent
        self.pacing_agent.add_reaction(reaction_type, timestamp)
        
        # Check for immediate alerts
        alert = await self.pacing_agent.check_for_alerts()
        if alert:
            await self._send_alert(alert)
    
    async def on_question(self, question_text: str, user_name: str, timestamp: datetime):
        """
        Handle new question event
        
        Args:
            question_text: The question text
            user_name: Name of the person asking
            timestamp: When the question was asked
        """
        # Add to Q&A grouper
        self.qa_grouper.add_question(question_text, user_name, timestamp)
        
        # Try to group if conditions are met
        grouped_alert = await self.qa_grouper.group_questions()
        if grouped_alert:
            await self._send_alert(grouped_alert)
    
    async def _periodic_ai_insights(self):
        """Periodically generate AI insights about pacing"""
        while self.running:
            try:
                await asyncio.sleep(120)  # Every 2 minutes
                
                if not self.running:
                    break
                
                insights = await self.pacing_agent.generate_ai_insights()
                await self._send_alert(insights)
            
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"Error in periodic AI insights: {e}")
    
    async def _periodic_question_grouping(self):
            """Periodically check if questions should be grouped"""
            from config import QA_GROUPER_CONFIG
            interval = QA_GROUPER_CONFIG['grouping_interval_seconds']
        
            while self.running:
                try:
                    await asyncio.sleep(interval)
                
                    if not self.running:
                        break
                
                    grouped_alert = await self.qa_grouper.group_questions()
                    if grouped_alert:
                        await self._send_alert(grouped_alert)
            
                except asyncio.CancelledError:
                    break
                except Exception as e:
                    logger.error(f"Error in periodic question grouping: {e}")
    
    async def _send_alert(self, alert: Dict):
        """
        Send alert to presenter via WebSocket
        
        Args:
            alert: Alert dictionary to send
        """
        try:
            await self.ws_manager.broadcast_to_session(
                self.session_id,
                {
                    "type": "ai_alert",
                    "data": alert
                }
            )
            logger.info(f"Alert sent: {alert['type']} - {alert['title']}")
        except Exception as e:
            logger.error(f"Error sending alert: {e}")
    
    def get_status(self) -> Dict:
        """Get current status of all agents"""
        return {
            "session_id": self.session_id,
            "running": self.running,
            "pacing_agent": {
                "reaction_buffer_size": len(self.pacing_agent.reaction_buffer),
                "recent_reactions": len(self.pacing_agent.get_recent_reactions(60))
            },
            "qa_grouper": {
                "total_questions": self.qa_grouper.get_question_count(),
                "ungrouped_questions": len(self.qa_grouper.get_ungrouped_questions())
            }
        }


# Global registry of agent managers
_agent_managers: Dict[str, AgentManager] = {}


def get_agent_manager(session_id: str, websocket_manager) -> AgentManager:
    """Get or create agent manager for a session"""
    if session_id not in _agent_managers:
        _agent_managers[session_id] = AgentManager(session_id, websocket_manager)
    return _agent_managers[session_id]


async def remove_agent_manager(session_id: str):
    """Stop and remove agent manager for a session"""
    if session_id in _agent_managers:
        await _agent_managers[session_id].stop()
        del _agent_managers[session_id]
        logger.info(f"Agent Manager removed for session {session_id}")