"""
Agent Manager - Coordinates all AI agents for a session
"""
import asyncio
from datetime import datetime
from typing import Dict, Optional
import logging

from pacing_agent import PacingAgent
from qa_grouper_agent import QAGrouperAgent
from code_demand_agent import CodeDemandAgent
from sentiment_agent import SentimentAgent

logger = logging.getLogger(__name__)


class AgentManager:
    """
    Manages all AI agents for a presentation session
    """
    
    def __init__(self, session_id: str, websocket_manager):
        self.session_id = session_id
        self.ws_manager = websocket_manager
        
        # Initialize all agents
        self.pacing_agent = PacingAgent(session_id)
        self.qa_grouper = QAGrouperAgent(session_id)
        self.code_demand_agent = CodeDemandAgent(session_id)
        self.sentiment_agent = SentimentAgent(session_id)
        
        # Background tasks
        self.running = False
        self.tasks = []
        
        logger.info(f"✅ Agent Manager initialized for session {session_id} with 4 agents")
    
    async def start(self):
        """Start all background agent tasks"""
        if self.running:
            return
        
        self.running = True
        
        # Start periodic AI insights (every 2 minutes) - Pacing Agent
        self.tasks.append(
            asyncio.create_task(self._periodic_ai_insights())
        )
        
        # Start periodic question grouping check (every 90 seconds) - QA Grouper
        self.tasks.append(
            asyncio.create_task(self._periodic_question_grouping())
        )
        
        # Start periodic code demand insights (every 60 seconds) - Code Demand Agent
        self.tasks.append(
            asyncio.create_task(self._periodic_code_insights())
        )
        
        # Start periodic sentiment analysis (every 30 seconds) - Sentiment Agent
        self.tasks.append(
            asyncio.create_task(self._periodic_sentiment_analysis())
        )
        
        logger.info(f"🚀 Agent Manager started for session {self.session_id} - 4 background tasks running")
    
    async def stop(self):
        """Stop all background agent tasks"""
        self.running = False
        
        for task in self.tasks:
            task.cancel()
        
        await asyncio.gather(*self.tasks, return_exceptions=True)
        self.tasks.clear()
        
        logger.info(f"⛔ Agent Manager stopped for session {self.session_id}")
    
    async def on_reaction(self, reaction_type: str, timestamp: datetime):
        """
        Handle new reaction event
        
        Args:
            reaction_type: Type of reaction
            timestamp: When the reaction occurred
        """
        # Add to pacing agent
        self.pacing_agent.add_reaction(reaction_type, timestamp)
        
        # Check for immediate pacing alerts
        alert = await self.pacing_agent.check_for_alerts()
        if alert:
            await self._send_alert(alert)
        
        # If it's a SHOW_CODE reaction, add to code demand agent
        if reaction_type == 'SHOW_CODE':
            self.code_demand_agent.add_code_request(timestamp)
            
            # Check for immediate code demand alert
            code_alert = await self.code_demand_agent.check_for_alert()
            if code_alert:
                await self._send_alert(code_alert)
    
    async def on_question(self, question_text: str, user_name: str, timestamp: datetime):
        """
        Handle new question event
        
        Args:
            question_text: The question text
            user_name: Name of the person asking
            timestamp: When the question was asked
        """
        logger.info(f"📥 Question: '{question_text[:40]}...' from {user_name}")
        
        # Add to Q&A grouper
        self.qa_grouper.add_question(question_text, user_name, timestamp)
        
        # Add to sentiment agent for emotional analysis
        # DON'T trigger immediate analysis - let the periodic task handle it
        # This prevents rate limiting
        self.sentiment_agent.add_question(question_text, user_name, timestamp)
        
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
                
                logger.debug("🔄 Periodic AI insights check")
                insights = await self.pacing_agent.generate_ai_insights()
                await self._send_alert(insights)
            
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"❌ Error in periodic AI insights: {e}", exc_info=True)
    
    async def _periodic_question_grouping(self):
        """Periodically check if questions should be grouped"""
        from config import QA_GROUPER_CONFIG
        interval = QA_GROUPER_CONFIG['grouping_interval_seconds']
        
        while self.running:
            try:
                await asyncio.sleep(interval)
                
                if not self.running:
                    break
                
                logger.debug("🔄 Periodic question grouping check")
                grouped_alert = await self.qa_grouper.group_questions()
                if grouped_alert:
                    await self._send_alert(grouped_alert)
            
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"❌ Error in periodic question grouping: {e}", exc_info=True)
    
    async def _periodic_code_insights(self):
        """Periodically generate insights about code demand"""
        from config import CODE_DEMAND_AGENT_CONFIG
        interval = CODE_DEMAND_AGENT_CONFIG['ai_analysis_interval_seconds']
        
        while self.running:
            try:
                await asyncio.sleep(interval)
                
                if not self.running:
                    break
                
                logger.debug("🔄 Periodic code insights check")
                insights = await self.code_demand_agent.generate_periodic_insights()
                if insights:
                    await self._send_alert(insights)
            
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"❌ Error in periodic code insights: {e}", exc_info=True)
    
    async def _periodic_sentiment_analysis(self):
        """Periodically analyze question sentiment"""
        from config import SENTIMENT_AGENT_CONFIG
        interval = SENTIMENT_AGENT_CONFIG['analysis_interval_seconds']
        
        logger.info(f"🔄 Starting sentiment analysis loop (every {interval}s)")
        
        while self.running:
            try:
                await asyncio.sleep(interval)
                
                if not self.running:
                    break
                
                logger.debug(f"🔄 Periodic sentiment analysis check")
                
                # Analyze pending questions
                sentiment_alert = await self.sentiment_agent.analyze_pending_questions()
                if sentiment_alert:
                    await self._send_alert(sentiment_alert)
                
                # Check for sentiment trends (only if we have data)
                if len(self.sentiment_agent.sentiment_timeline) >= 2:
                    trend_alert = await self.sentiment_agent.generate_trend_alert()
                    if trend_alert:
                        await self._send_alert(trend_alert)
            
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"❌ Error in periodic sentiment analysis: {e}", exc_info=True)
    
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
            logger.info(f"📢 Alert: {alert['title']}")
        except Exception as e:
            logger.error(f"❌ Error sending alert: {e}")
    
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
            },
            "code_demand_agent": self.code_demand_agent.get_status(),
            "sentiment_agent": self.sentiment_agent.get_status()
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
        logger.info(f"🗑️ Agent Manager removed for session {session_id}")