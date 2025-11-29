"""
Pacing Agent - Monitors audience reactions and provides pacing insights
"""
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Optional
from collections import defaultdict
import logging

from config import PACING_AGENT_CONFIG
from gemini_service import get_gemini_service

logger = logging.getLogger(__name__)


class PacingAgent:
    """
    AI Agent that monitors audience reactions and provides pacing recommendations
    """
    
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.gemini = get_gemini_service()
        
        # Buffer of recent reactions
        self.reaction_buffer: List[Dict] = []
        
        # Last alert timestamps to prevent spam
        self.last_alerts: Dict[str, datetime] = {}
        
        # Configuration
        self.config = PACING_AGENT_CONFIG
        
        logger.info(f"Pacing Agent initialized for session {session_id}")
    
    def _ensure_timezone_aware(self, dt: datetime) -> datetime:
        """
        Ensure datetime is timezone-aware (UTC)
        
        Args:
            dt: datetime object that might be naive or aware
            
        Returns:
            Timezone-aware datetime in UTC
        """
        if dt.tzinfo is None:
            # Naive datetime - assume it's UTC and make it aware
            return dt.replace(tzinfo=timezone.utc)
        return dt
    
    def add_reaction(self, reaction_type: str, timestamp: datetime):
        """
        Add a reaction to the buffer
        
        Args:
            reaction_type: Type of reaction (SPEED_UP, SLOW_DOWN, etc.)
            timestamp: When the reaction occurred
        """
        # Ensure timestamp is timezone-aware
        timestamp = self._ensure_timezone_aware(timestamp)
        
        self.reaction_buffer.append({
            'type': reaction_type,
            'timestamp': timestamp
        })
        
        # Keep only reactions from last 10 minutes
        cutoff = datetime.now(timezone.utc) - timedelta(minutes=10)
        self.reaction_buffer = [
            r for r in self.reaction_buffer 
            if r['timestamp'] > cutoff
        ]
        
        logger.debug(f"Reaction added: {reaction_type}. Buffer size: {len(self.reaction_buffer)}")
    
    def get_recent_reactions(self, seconds: int) -> List[Dict]:
        """Get reactions from the last N seconds"""
        cutoff = datetime.now(timezone.utc) - timedelta(seconds=seconds)
        return [
            r for r in self.reaction_buffer 
            if r['timestamp'] > cutoff
        ]
    
    async def check_for_alerts(self) -> Optional[Dict]:
        """
        Check if any threshold conditions are met for immediate alerts
        
        Returns:
            Alert dictionary if threshold met, None otherwise
        """
        now = datetime.now(timezone.utc)
        
        # Check "I'm Lost" critical threshold
        im_lost_window = self.config['im_lost_window_seconds']
        recent_im_lost = [
            r for r in self.get_recent_reactions(im_lost_window)
            if r['type'] == 'IM_LOST'
        ]
        
        if len(recent_im_lost) >= self.config['im_lost_threshold']:
            # Check cooldown
            if self._check_cooldown('im_lost_critical'):
                return {
                    'type': 'pacing_alert',
                    'severity': 'critical',
                    'title': '🚨 Many Students Lost!',
                    'message': f'{len(recent_im_lost)} students marked "I\'m Lost" in {im_lost_window} seconds',
                    'timestamp': now.isoformat(),
                    'reaction_summary': self._get_reaction_summary(im_lost_window)
                }
        
        # Check Speed Up requests
        speed_window = self.config['reaction_window_seconds']
        recent_speed_up = [
            r for r in self.get_recent_reactions(speed_window)
            if r['type'] == 'SPEED_UP'
        ]
        
        if len(recent_speed_up) >= self.config['speed_up_threshold']:
            if self._check_cooldown('speed_up'):
                return {
                    'type': 'pacing_alert',
                    'severity': 'info',
                    'title': '⚡ Audience Wants Faster Pace',
                    'message': f'{len(recent_speed_up)} speed-up requests in {speed_window} seconds',
                    'timestamp': now.isoformat(),
                    'reaction_summary': self._get_reaction_summary(speed_window)
                }
        
        # Check Slow Down requests
        recent_slow_down = [
            r for r in self.get_recent_reactions(speed_window)
            if r['type'] == 'SLOW_DOWN'
        ]
        
        if len(recent_slow_down) >= self.config['slow_down_threshold']:
            if self._check_cooldown('slow_down'):
                return {
                    'type': 'pacing_alert',
                    'severity': 'warning',
                    'title': '🐌 Slow Down Requested',
                    'message': f'{len(recent_slow_down)} slow-down requests in {speed_window} seconds',
                    'timestamp': now.isoformat(),
                    'reaction_summary': self._get_reaction_summary(speed_window)
                }
        
        # Check Code Example requests
        recent_show_code = [
            r for r in self.get_recent_reactions(speed_window)
            if r['type'] == 'SHOW_CODE'
        ]
        
        if len(recent_show_code) >= self.config.get('show_code_threshold', 3):
            if self._check_cooldown('show_code'):
                return {
                    'type': 'code_demand',
                    'severity': 'info',
                    'title': '💻 Code Examples Requested',
                    'message': f'{len(recent_show_code)} requests for code examples',
                    'timestamp': now.isoformat(),
                    'reaction_summary': self._get_reaction_summary(speed_window)
                }
        
        return None
    
    async def generate_ai_insights(self) -> Dict:
        """
        Generate AI-powered insights using Gemini
        
        Returns:
            Alert dictionary with AI analysis
        """
        # Get reaction summary for last 2 minutes
        reaction_summary = self._get_reaction_summary(120)
        
        if sum(reaction_summary.values()) == 0:
            return {
                'type': 'sentiment',
                'severity': 'info',
                'title': '📊 Audience Engagement',
                'message': 'No reactions in the last 2 minutes',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'reaction_summary': reaction_summary
            }
        
        # Get AI analysis
        ai_analysis = await self.gemini.analyze_pacing(
            reaction_summary,
            time_window_minutes=2
        )
        
        if not ai_analysis:
            return {
                'type': 'sentiment',
                'severity': 'info',
                'title': '📊 Audience Activity',
                'message': f'Received {sum(reaction_summary.values())} reactions',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'reaction_summary': reaction_summary
            }
        
        # Determine severity based on sentiment
        severity_map = {
            'positive': 'success',
            'neutral': 'info',
            'concerned': 'warning',
            'struggling': 'critical'
        }
        severity = severity_map.get(ai_analysis['sentiment'], 'info')
        
        return {
            'type': 'sentiment',
            'severity': severity,
            'title': '🤖 AI Engagement Analysis',
            'message': ai_analysis['recommendation'],
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'ai_analysis': ai_analysis,
            'reaction_summary': reaction_summary
        }
    
    def _get_reaction_summary(self, seconds: int) -> Dict[str, int]:
        """Get count of each reaction type in the time window"""
        recent = self.get_recent_reactions(seconds)
        summary = defaultdict(int)
        
        for reaction in recent:
            summary[reaction['type']] += 1
        
        return dict(summary)
    
    def _check_cooldown(self, alert_type: str, cooldown_seconds: int = 30) -> bool:
        """
        Check if enough time has passed since last alert of this type
        
        Args:
            alert_type: Type of alert
            cooldown_seconds: Minimum seconds between alerts
        
        Returns:
            True if alert can be sent, False if in cooldown
        """
        now = datetime.now(timezone.utc)
        
        if alert_type in self.last_alerts:
            time_since_last = (now - self.last_alerts[alert_type]).total_seconds()
            if time_since_last < cooldown_seconds:
                return False
        
        self.last_alerts[alert_type] = now
        return True