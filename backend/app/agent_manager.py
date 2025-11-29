"""
Agent Manager - Coordinates all AI agents for a session - WITH STATE RESTORATION & SUMMARY
"""
import asyncio
from datetime import datetime, timezone, timedelta
from typing import Dict, Optional
import logging
import os
import json

from pacing_agent import PacingAgent
from qa_grouper_agent import QAGrouperAgent
from code_demand_agent import CodeDemandAgent
from sentiment_agent import SentimentAgent

logger = logging.getLogger(__name__)


class AgentManager:
    """
    Manages all AI agents for a presentation session
    """
    
    def __init__(self, session_id: str, websocket_manager, db_session):
        self.session_id = session_id
        self.ws_manager = websocket_manager
        self.db = db_session
        
        # Initialize all agents
        self.pacing_agent = PacingAgent(session_id)
        self.qa_grouper = QAGrouperAgent(session_id)
        self.code_demand_agent = CodeDemandAgent(session_id)
        self.sentiment_agent = SentimentAgent(session_id)
        
        # Background tasks
        self.running = False
        self.tasks = []
        
        # Restore state from database
        self._restore_state_from_db()
        
        logger.info(f"✅ Agent Manager initialized for session {session_id} with 4 agents")
    
    def _restore_state_from_db(self):
        """Restore agent state from database on initialization"""
        try:
            from main import ReactionDB, QuestionDB
            
            # Restore reactions from last 10 minutes
            ten_minutes_ago = datetime.now(timezone.utc) - timedelta(minutes=10)
            reactions = self.db.query(ReactionDB)\
                .filter(
                    ReactionDB.session_id == self.session_id,
                    ReactionDB.timestamp >= ten_minutes_ago
                )\
                .order_by(ReactionDB.timestamp.asc())\
                .all()
            
            # Restore questions from last hour
            one_hour_ago = datetime.now(timezone.utc) - timedelta(hours=1)
            questions = self.db.query(QuestionDB)\
                .filter(
                    QuestionDB.session_id == self.session_id,
                    QuestionDB.timestamp >= one_hour_ago
                )\
                .order_by(QuestionDB.timestamp.asc())\
                .all()
            
            # Repopulate pacing agent with reactions
            for r in reactions:
                # Ensure timestamp is timezone-aware
                timestamp = r.timestamp
                if timestamp.tzinfo is None:
                    timestamp = timestamp.replace(tzinfo=timezone.utc)
                self.pacing_agent.add_reaction(r.reaction_type.value, timestamp)
            
            # Repopulate code demand agent with SHOW_CODE reactions
            for r in reactions:
                if r.reaction_type.value == 'SHOW_CODE':
                    timestamp = r.timestamp
                    if timestamp.tzinfo is None:
                        timestamp = timestamp.replace(tzinfo=timezone.utc)
                    self.code_demand_agent.add_code_request(timestamp)
            
            # Repopulate QA grouper and sentiment agent with questions
            for q in questions:
                user_name = q.user_name if q.user_name else "Anonymous"
                timestamp = q.timestamp
                if timestamp.tzinfo is None:
                    timestamp = timestamp.replace(tzinfo=timezone.utc)
                self.qa_grouper.add_question(q.question_text, user_name, timestamp)
                self.sentiment_agent.add_question(q.question_text, user_name, timestamp)
            
            logger.info(f"♻️ State restored: {len(reactions)} reactions, {len(questions)} questions")
        
        except Exception as e:
            logger.error(f"❌ Error restoring agent state: {e}", exc_info=True)
    
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
        """Handle new reaction event"""
        logger.info(f"🎯 Reaction received: {reaction_type} at {timestamp}")
        
        # Ensure timestamp is timezone-aware
        if timestamp.tzinfo is None:
            timestamp = timestamp.replace(tzinfo=timezone.utc)
        
        # Add to pacing agent
        self.pacing_agent.add_reaction(reaction_type, timestamp)
        logger.debug(f"📊 Pacing agent buffer: {len(self.pacing_agent.reaction_buffer)} reactions")
        
        # Check for immediate pacing alerts
        alert = await self.pacing_agent.check_for_alerts()
        if alert:
            logger.info(f"🚨 Immediate alert triggered: {alert['title']}")
            await self._send_alert(alert)
        
        # If it's a SHOW_CODE reaction, add to code demand agent
        if reaction_type == 'SHOW_CODE':
            self.code_demand_agent.add_code_request(timestamp)
            
            # Check for immediate code demand alert
            code_alert = await self.code_demand_agent.check_for_alert()
            if code_alert:
                logger.info(f"💻 Code demand alert triggered: {code_alert['title']}")
                await self._send_alert(code_alert)
    
    async def on_question(self, question_text: str, user_name: str, timestamp: datetime):
        """Handle new question event"""
        logger.info(f"📥 Question: '{question_text[:40]}...' from {user_name}")
        
        # Ensure timestamp is timezone-aware
        if timestamp.tzinfo is None:
            timestamp = timestamp.replace(tzinfo=timezone.utc)
        
        # Add to Q&A grouper
        self.qa_grouper.add_question(question_text, user_name, timestamp)
        
        # Add to sentiment agent for emotional analysis
        self.sentiment_agent.add_question(question_text, user_name, timestamp)
        
        # Try to group if conditions are met
        grouped_alert = await self.qa_grouper.group_questions()
        if grouped_alert:
            logger.info(f"💬 Question grouping alert: {grouped_alert['title']}")
            await self._send_alert(grouped_alert)
    
    async def generate_session_summary(self) -> Optional[Dict]:
        """
        Generate comprehensive end-of-session summary
        
        Returns:
            Summary dictionary with insights and recommendations
        """
        try:
            from session_summary_agent import SessionSummaryAgent
            from main import SessionDB, ReactionDB, QuestionDB, AIAlertDB
            from config import SESSION_SUMMARY_CONFIG
            
            logger.info(f"📊 Generating session summary for {self.session_id}...")
            
            # Get session details
            session = self.db.query(SessionDB).filter(
                SessionDB.session_id == self.session_id
            ).first()
            
            if not session:
                logger.error("Session not found in database")
                return None
            
            # Calculate session duration - FIX TIMEZONE ISSUE HERE
            session_end = datetime.now(timezone.utc)
            
            # Make session.created_at timezone-aware if it isn't already
            if session.created_at.tzinfo is None:
                session_start = session.created_at.replace(tzinfo=timezone.utc)
            else:
                session_start = session.created_at
            
            duration_minutes = (session_end - session_start).total_seconds() / 60
            
            # Fetch ALL session data
            reactions = self.db.query(ReactionDB).filter(
                ReactionDB.session_id == self.session_id
            ).all()
            
            questions = self.db.query(QuestionDB).filter(
                QuestionDB.session_id == self.session_id
            ).all()
            
            alerts = self.db.query(AIAlertDB).filter(
                AIAlertDB.session_id == self.session_id
            ).all()
            
            # Convert to dictionaries - FIX TIMESTAMPS HERE TOO
            reactions_data = []
            for r in reactions:
                timestamp = r.timestamp
                if timestamp.tzinfo is None:
                    timestamp = timestamp.replace(tzinfo=timezone.utc)
                reactions_data.append({
                    'reaction_type': r.reaction_type.value,
                    'timestamp': timestamp.isoformat(),
                    'user_name': r.user_name
                })
            
            questions_data = []
            for q in questions:
                timestamp = q.timestamp
                if timestamp.tzinfo is None:
                    timestamp = timestamp.replace(tzinfo=timezone.utc)
                questions_data.append({
                    'question_text': q.question_text,
                    'timestamp': timestamp.isoformat(),
                    'user_name': q.user_name
                })
            
            alerts_data = []
            for a in alerts:
                timestamp = a.timestamp
                if timestamp.tzinfo is None:
                    timestamp = timestamp.replace(tzinfo=timezone.utc)
                alerts_data.append({
                    'type': a.alert_type,
                    'severity': a.severity,
                    'title': a.title,
                    'message': a.message,
                    'timestamp': timestamp.isoformat()
                })
            
            # Generate summary using Session Summary Agent
            summary_agent = SessionSummaryAgent(self.session_id)
            summary = await summary_agent.generate_session_summary(
                reactions_data,
                questions_data,
                alerts_data,
                duration_minutes
            )
            
            # Save summary to file if configured
            if SESSION_SUMMARY_CONFIG.get('save_to_file', False):
                self._save_summary_to_file(summary)
            
            logger.info(f"✅ Session summary generated successfully")
            return summary
            
        except Exception as e:
            logger.error(f"❌ Error generating session summary: {e}", exc_info=True)
            return {
                "error": str(e),
                "session_id": self.session_id,
                "message": "Failed to generate summary"
            }
    
    def _save_summary_to_file(self, summary: Dict):
        """Save summary to JSON file"""
        try:
            from config import SESSION_SUMMARY_CONFIG
            
            # Create directory if it doesn't exist
            directory = SESSION_SUMMARY_CONFIG.get('summary_directory', './session_summaries/')
            os.makedirs(directory, exist_ok=True)
            
            # Generate filename with timestamp
            timestamp = datetime.now(timezone.utc).strftime('%Y%m%d_%H%M%S')
            filename = f"{directory}summary_{self.session_id}_{timestamp}.json"
            
            # Save summary
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(summary, f, indent=2, ensure_ascii=False)
            
            logger.info(f"💾 Summary saved to: {filename}")
            
        except Exception as e:
            logger.error(f"❌ Error saving summary to file: {e}")
    
    async def _periodic_ai_insights(self):
        """Periodically generate AI insights about pacing"""
        while self.running:
            try:
                await asyncio.sleep(120)  # Every 2 minutes
                
                if not self.running:
                    break
                
                logger.info("🔄 Periodic AI insights check starting...")
                insights = await self.pacing_agent.generate_ai_insights()
                logger.info(f"✅ AI insights generated: {insights['title']}")
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
                    logger.info(f"💬 Question grouping completed")
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
                    logger.info(f"💻 Code insights generated")
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
                    logger.info(f"😊 Sentiment analysis completed")
                    await self._send_alert(sentiment_alert)
                
                # Check for sentiment trends (only if we have data)
                if len(self.sentiment_agent.sentiment_timeline) >= 2:
                    trend_alert = await self.sentiment_agent.generate_trend_alert()
                    if trend_alert:
                        logger.info(f"📈 Sentiment trend detected")
                        await self._send_alert(trend_alert)
            
            except asyncio.CancelledError:
                break
            except Exception as e:
                logger.error(f"❌ Error in periodic sentiment analysis: {e}", exc_info=True)
    
    async def _send_alert(self, alert: Dict):
        """Send alert to presenter via WebSocket AND save to database"""
        try:
            # Save to database first
            self._save_alert_to_db(alert)
            
            # Then broadcast via WebSocket
            await self.ws_manager.broadcast_to_session(
                self.session_id,
                {
                    "type": "ai_alert",
                    "data": alert
                }
            )
            logger.info(f"📢 Alert sent and saved: {alert['title']}")
        except Exception as e:
            logger.error(f"❌ Error sending alert: {e}")
    
    def _save_alert_to_db(self, alert: Dict):
        """Save alert to database"""
        try:
            from main import AIAlertDB
            
            alert_type = alert.get('type', 'unknown')
            severity = alert.get('severity', 'info')
            title = alert.get('title', '')
            message = alert.get('message', '')
            
            timestamp_str = alert.get('timestamp')
            if isinstance(timestamp_str, str):
                timestamp = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            elif isinstance(timestamp_str, datetime):
                timestamp = timestamp_str
                if timestamp.tzinfo is None:
                    timestamp = timestamp.replace(tzinfo=timezone.utc)
            else:
                timestamp = datetime.now(timezone.utc)
            
            data = {k: v for k, v in alert.items() 
                   if k not in ['type', 'severity', 'title', 'message', 'timestamp']}
            
            new_alert = AIAlertDB(
                session_id=self.session_id,
                alert_type=alert_type,
                severity=severity,
                title=title,
                message=message,
                timestamp=timestamp,
                data=data
            )
            
            self.db.add(new_alert)
            self.db.commit()
            logger.info(f"💾 Alert saved to DB: {title}")
        
        except Exception as e:
            logger.error(f"❌ Error saving alert to DB: {e}", exc_info=True)
            try:
                self.db.rollback()
            except:
                pass
    
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


def get_agent_manager(session_id: str, websocket_manager, db_session) -> AgentManager:
    """Get or create agent manager for a session"""
    if session_id not in _agent_managers:
        _agent_managers[session_id] = AgentManager(session_id, websocket_manager, db_session)
    return _agent_managers[session_id]


async def remove_agent_manager(session_id: str):
    """Stop and remove agent manager for a session"""
    if session_id in _agent_managers:
        await _agent_managers[session_id].stop()
        del _agent_managers[session_id]
        logger.info(f"🗑️ Agent Manager removed for session {session_id}")