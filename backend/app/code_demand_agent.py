"""
Code Demand Agent - Monitors "Show Code" button clicks and provides recommendations
"""
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Optional
import logging

from config import CODE_DEMAND_AGENT_CONFIG
from gemini_service import get_gemini_service

logger = logging.getLogger(__name__)


class CodeDemandAgent:
    """
    AI Agent that monitors code example requests and provides urgency-based recommendations
    """
    
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.gemini = get_gemini_service()
        
        # Buffer of code request timestamps
        self.code_requests: List[datetime] = []
        
        # Last alert timestamp to prevent spam
        self.last_alert: Optional[datetime] = None
        
        # Configuration
        self.config = CODE_DEMAND_AGENT_CONFIG
        
        logger.info(f"Code Demand Agent initialized for session {session_id}")
    
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
    
    def add_code_request(self, timestamp: datetime):
        """
        Add a code request to the buffer
        
        Args:
            timestamp: When the code request occurred
        """
        # Ensure timestamp is timezone-aware
        timestamp = self._ensure_timezone_aware(timestamp)
        
        self.code_requests.append(timestamp)
        
        # Keep only requests from last 5 minutes
        cutoff = datetime.now(timezone.utc) - timedelta(minutes=5)
        self.code_requests = [
            t for t in self.code_requests 
            if t > cutoff
        ]
        
        logger.debug(f"Code request added. Total in buffer: {len(self.code_requests)}")
    
    def get_recent_requests(self, seconds: int) -> List[datetime]:
        """Get code requests from the last N seconds"""
        cutoff = datetime.now(timezone.utc) - timedelta(seconds=seconds)
        return [t for t in self.code_requests if t > cutoff]
    
    def _determine_urgency(self, count: int) -> str:
        """
        Determine urgency level based on request count
        
        Args:
            count: Number of code requests
            
        Returns:
            Urgency level: 'low', 'medium', or 'high'
        """
        levels = self.config['urgency_levels']
        
        if count >= levels['high']['min']:
            return 'high'
        elif count >= levels['medium']['min']:
            return 'medium'
        elif count >= levels['low']['min']:
            return 'low'
        
        return 'low'
    
    async def check_for_alert(self) -> Optional[Dict]:
        """
        Check if code request threshold is met
        
        Returns:
            Alert dictionary if threshold met, None otherwise
        """
        window_seconds = self.config['code_request_window_seconds']
        recent_requests = self.get_recent_requests(window_seconds)
        count = len(recent_requests)
        
        threshold = self.config['code_request_threshold']
        
        if count >= threshold:
            # Check cooldown
            if not self._check_cooldown():
                return None
            
            urgency = self._determine_urgency(count)
            
            # Get AI recommendation
            ai_recommendation = await self._generate_ai_recommendation(count, urgency)
            
            # Determine severity
            severity_map = {
                'low': 'info',
                'medium': 'warning',
                'high': 'critical'
            }
            severity = severity_map.get(urgency, 'info')
            
            # Create alert message
            urgency_emoji = {
                'low': '💻',
                'medium': '⚡',
                'high': '🔥'
            }
            
            return {
                'type': 'code_demand',
                'severity': severity,
                'title': f'{urgency_emoji[urgency]} Code Examples Requested',
                'message': ai_recommendation or f'{count} audience members want to see code examples',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'data': {
                    'request_count': count,
                    'urgency': urgency,
                    'window_seconds': window_seconds
                }
            }
        
        return None
    
    async def _generate_ai_recommendation(self, count: int, urgency: str) -> Optional[str]:
        """
        Generate AI-powered recommendation using Gemini
        
        Args:
            count: Number of code requests
            urgency: Urgency level (low, medium, high)
            
        Returns:
            Recommendation message or None if error
        """
        prompt = f"""You are an AI assistant helping a presenter during a live coding presentation.

{count} audience members have clicked "Show Code" in the last 30 seconds, indicating a {urgency.upper()} urgency demand for code examples.

Provide ONE brief, actionable recommendation (1 sentence, max 100 characters) for the presenter.

Examples:
- "Show a quick code example to satisfy the audience"
- "Switch to live coding now - high demand!"
- "Consider showing your IDE or code snippet"

Your recommendation:"""

        try:
            response = await self.gemini.generate_content(
                prompt, 
                temperature=0.5,
                max_tokens=100
            )
            
            if response:
                # Clean up the response
                recommendation = response.strip()
                # Remove quotes if present
                recommendation = recommendation.strip('"\'')
                # Limit length
                if len(recommendation) > 120:
                    recommendation = recommendation[:117] + "..."
                
                return recommendation
            
            return None
            
        except Exception as e:
            logger.error(f"Error generating AI recommendation: {e}")
            return None
    
    async def generate_periodic_insights(self) -> Optional[Dict]:
        """
        Generate periodic insights about code demand patterns
        
        Returns:
            Alert dictionary with insights or None
        """
        total_requests = len(self.code_requests)
        
        if total_requests == 0:
            return None
        
        # Calculate request frequency
        if total_requests >= 2:
            time_span = (self.code_requests[-1] - self.code_requests[0]).total_seconds()
            avg_interval = time_span / (total_requests - 1) if total_requests > 1 else 0
        else:
            avg_interval = 0
        
        prompt = f"""You are analyzing audience code example requests during a presentation.

Statistics:
- Total requests in last 5 minutes: {total_requests}
- Average time between requests: {avg_interval:.1f} seconds

Provide a brief insight (1-2 sentences) about the audience's need for code examples.

Your insight:"""

        try:
            response = await self.gemini.generate_content(
                prompt,
                temperature=0.6,
                max_tokens=150
            )
            
            if response:
                return {
                    'type': 'code_insights',
                    'severity': 'info',
                    'title': '📊 Code Example Demand Analysis',
                    'message': response.strip(),
                    'timestamp': datetime.now(timezone.utc).isoformat(),
                    'data': {
                        'total_requests': total_requests,
                        'avg_interval_seconds': round(avg_interval, 1)
                    }
                }
            
            return None
            
        except Exception as e:
            logger.error(f"Error generating periodic insights: {e}")
            return None
    
    def _check_cooldown(self) -> bool:
        """
        Check if enough time has passed since last alert
        
        Returns:
            True if alert can be sent, False if in cooldown
        """
        now = datetime.now(timezone.utc)
        cooldown = self.config['alert_cooldown_seconds']
        
        if self.last_alert:
            # Ensure last_alert is timezone-aware
            last_alert_aware = self._ensure_timezone_aware(self.last_alert)
            time_since_last = (now - last_alert_aware).total_seconds()
            if time_since_last < cooldown:
                return False
        
        self.last_alert = now
        return True
    
    def get_status(self) -> Dict:
        """Get current status of the agent"""
        return {
            'total_requests': len(self.code_requests),
            'recent_30s': len(self.get_recent_requests(30)),
            'recent_60s': len(self.get_recent_requests(60))
        }