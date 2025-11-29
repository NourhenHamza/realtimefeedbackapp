"""
Sentiment Agent - Analyzes question text for emotional engagement (ENHANCED)
"""
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Optional
from collections import defaultdict, deque
import logging
import asyncio
import re

from config import SENTIMENT_AGENT_CONFIG
from gemini_service import get_gemini_service

logger = logging.getLogger(__name__)


class SentimentAgent:
    """
    AI Agent that analyzes question sentiment and tracks emotional engagement trends
    """
    
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.gemini = get_gemini_service()
        
        # Store questions with their analyzed sentiment
        self.questions_with_sentiment: List[Dict] = []
        
        # Track questions that haven't been analyzed yet
        self.unanalyzed_questions: deque = deque()
        
        # Sentiment trend tracking (timestamp -> dominant sentiment)
        self.sentiment_timeline: List[Dict] = []
        
        # Configuration
        self.config = SENTIMENT_AGENT_CONFIG
        
        # Rate limiting
        self.last_analysis_time = None
        self.min_analysis_interval = 15  # Minimum 15 seconds between analyses
        self.is_analyzing = False  # Prevent concurrent analyses
        
        logger.info(f"✅ Enhanced Sentiment Agent initialized for session {session_id}")
    
    def _ensure_timezone_aware(self, dt: datetime) -> datetime:
        """Ensure datetime is timezone-aware (UTC)"""
        if dt.tzinfo is None:
            return dt.replace(tzinfo=timezone.utc)
        return dt
    
    def add_question(self, question_text: str, user_name: str, timestamp: datetime):
        """Add a question for sentiment analysis"""
        timestamp = self._ensure_timezone_aware(timestamp)
        
        question_data = {
            'text': question_text,
            'user_name': user_name,
            'timestamp': timestamp,
            'sentiment': None,
            'analyzed': False
        }
        
        self.unanalyzed_questions.append(question_data)
        logger.info(f"✅ Question queued: '{question_text[:40]}...' (Queue: {len(self.unanalyzed_questions)})")
    
    def _can_analyze_now(self) -> bool:
        """Check if enough time has passed since last analysis"""
        if self.is_analyzing:
            logger.debug("⏳ Analysis already in progress, skipping")
            return False
            
        if self.last_analysis_time is None:
            return True
            
        time_since_last = (datetime.now(timezone.utc) - self.last_analysis_time).total_seconds()
        if time_since_last < self.min_analysis_interval:
            logger.debug(f"⏳ Rate limit: {time_since_last:.1f}s since last (min: {self.min_analysis_interval}s)")
            return False
            
        return True
    
    def _rule_based_sentiment(self, question_text: str) -> str:
        """
        ENHANCED rule-based sentiment analysis using config patterns
        
        Args:
            question_text: The question text
            
        Returns:
            Sentiment category: overwhelmed, bored, frustrated, confused, neutral, interested, excited
        """
        text = question_text.lower()
        
        # Import patterns from config
        from config import SENTIMENT_PATTERNS
        
        # Check patterns in order of priority (pacing issues first, then content issues)
        priority_order = ['overwhelmed', 'bored', 'frustrated', 'confused', 'excited', 'interested']
        
        for sentiment in priority_order:
            if sentiment in SENTIMENT_PATTERNS:
                for pattern in SENTIMENT_PATTERNS[sentiment]:
                    if re.search(pattern, text):
                        logger.debug(f"✅ Matched '{sentiment}' pattern in: '{question_text[:40]}'")
                        return sentiment
        
        # Default to neutral
        return 'neutral'
    
    async def analyze_pending_questions(self) -> Optional[Dict]:
        """Analyze sentiment of pending questions"""
        min_questions = self.config['min_questions_for_analysis']
        
        logger.debug(f"🔍 Check: {len(self.unanalyzed_questions)} unanalyzed, need {min_questions}")
        
        if len(self.unanalyzed_questions) < min_questions:
            return None
        
        if not self._can_analyze_now():
            return None
        
        self.is_analyzing = True
        self.last_analysis_time = datetime.now(timezone.utc)
        
        try:
            batch_size = min(5, len(self.unanalyzed_questions))
            questions_to_analyze = []
            
            for _ in range(batch_size):
                if self.unanalyzed_questions:
                    questions_to_analyze.append(self.unanalyzed_questions.popleft())
            
            if not questions_to_analyze:
                return None
            
            logger.info(f"🤖 Analyzing {len(questions_to_analyze)} questions...")
            
            # Try AI analysis first
            analysis_result = await self._analyze_sentiment_batch(questions_to_analyze)
            
            # If AI fails, use ENHANCED rule-based fallback
            if not analysis_result:
                logger.warning("⚠️ AI analysis failed, using ENHANCED rule-based fallback")
                analysis_result = self._fallback_analysis(questions_to_analyze)
            
            if not analysis_result:
                logger.error("❌ Both AI and fallback failed, returning questions to queue")
                self.unanalyzed_questions.extendleft(reversed(questions_to_analyze))
                return None
            
            logger.info(f"✅ Analysis complete: {analysis_result['dominant_sentiment']}")
            
            # Store analyzed questions
            for i, question in enumerate(questions_to_analyze):
                if i < len(analysis_result['sentiments']):
                    question['sentiment'] = analysis_result['sentiments'][i]
                    question['analyzed'] = True
                    self.questions_with_sentiment.append(question)
            
            # Update sentiment timeline
            now = datetime.now(timezone.utc)
            self.sentiment_timeline.append({
                'timestamp': now,
                'dominant_sentiment': analysis_result['dominant_sentiment'],
                'distribution': analysis_result['distribution']
            })
            
            return self._create_sentiment_alert(analysis_result, len(questions_to_analyze))
            
        finally:
            self.is_analyzing = False
    
    def _fallback_analysis(self, questions: List[Dict]) -> Optional[Dict]:
        """ENHANCED rule-based sentiment analysis fallback"""
        try:
            sentiments = []
            for q in questions:
                sentiment = self._rule_based_sentiment(q['text'])
                sentiments.append(sentiment)
                logger.debug(f"📝 '{q['text'][:30]}...' → {sentiment}")
            
            distribution = defaultdict(int)
            for sentiment in sentiments:
                distribution[sentiment] += 1
            
            dominant_sentiment = max(distribution.items(), key=lambda x: x[1])[0]
            
            logger.info(f"📊 Fallback analysis: {dict(distribution)}, dominant: {dominant_sentiment}")
            
            return {
                'sentiments': sentiments,
                'distribution': dict(distribution),
                'dominant_sentiment': dominant_sentiment,
                'method': 'rule-based'
            }
        except Exception as e:
            logger.error(f"❌ Fallback analysis failed: {e}")
            return None
    
    async def _analyze_sentiment_batch(self, questions: List[Dict]) -> Optional[Dict]:
        """Analyze sentiment using Gemini with improved prompt"""
        questions_list = []
        for i, q in enumerate(questions):
            text = q['text'].strip()
            if len(text) > 100:
                text = text[:97] + "..."
            questions_list.append(f"{i+1}. {text}")
        
        questions_text = "\n".join(questions_list)
        
        # IMPROVED PROMPT - simpler, more direct
        prompt = f"""Classify each question's sentiment from a presentation audience.

Categories: overwhelmed, frustrated, confused, neutral, interested, excited

Questions:
{questions_text}

Respond ONLY with numbers and categories:
1. [category]
2. [category]

Classification:"""

        try:
            logger.info(f"🔮 Sending {len(questions)} questions to Gemini...")
            
            response = await self.gemini.generate_content(
                prompt,
                temperature=0.1,
                max_tokens=200
            )
            
            if not response:
                logger.error("❌ Empty response from Gemini")
                return None
            
            logger.debug(f"📄 Gemini response: {response[:150]}...")
            
            # Parse sentiments
            sentiments = []
            lines = response.strip().split('\n')
            categories = ['overwhelmed', 'frustrated', 'confused', 'neutral', 'interested', 'excited']
            
            for line in lines:
                line = line.strip().lower()
                for category in categories:
                    if category in line:
                        sentiments.append(category)
                        break
                
                if len(sentiments) >= len(questions):
                    break
            
            if len(sentiments) < len(questions):
                logger.warning(f"⚠️ Only got {len(sentiments)}/{len(questions)} sentiments, using fallback")
                return None
            
            distribution = defaultdict(int)
            for sentiment in sentiments[:len(questions)]:
                distribution[sentiment] += 1
            
            dominant = max(distribution.items(), key=lambda x: x[1])[0]
            
            logger.info(f"📊 AI analysis: {dict(distribution)}, dominant: {dominant}")
            
            return {
                'sentiments': sentiments[:len(questions)],
                'distribution': dict(distribution),
                'dominant_sentiment': dominant,
                'method': 'ai'
            }
            
        except Exception as e:
            logger.error(f"❌ Error in AI sentiment analysis: {e}")
            return None
    
    def _create_sentiment_alert(self, analysis: Dict, question_count: int) -> Dict:
        """Create alert with ENHANCED sentiment categories"""
        dominant = analysis['dominant_sentiment']
        distribution = analysis['distribution']
        method = analysis.get('method', 'ai')
        
        # ENHANCED sentiment config with 6 categories
        sentiment_config = {
            'overwhelmed': {
                'emoji': '🚨',
                'severity': 'critical',
                'desc': 'overwhelmed - URGENT pacing issue'
            },
            'frustrated': {
                'emoji': '😤',
                'severity': 'critical',
                'desc': 'frustrated with content'
            },
            'confused': {
                'emoji': '🤔',
                'severity': 'warning',
                'desc': 'confused and need help'
            },
            'neutral': {
                'emoji': 'ℹ️',
                'severity': 'info',
                'desc': 'neutral'
            },
            'interested': {
                'emoji': '👍',
                'severity': 'success',
                'desc': 'interested and engaged'
            },
            'excited': {
                'emoji': '🎉',
                'severity': 'success',
                'desc': 'excited and enthusiastic'
            }
        }
        
        config = sentiment_config.get(dominant, sentiment_config['neutral'])
        
        # Calculate negative sentiment percentage
        negative_sentiments = ['overwhelmed', 'frustrated', 'confused']
        negative_count = sum(distribution.get(s, 0) for s in negative_sentiments)
        negative_percentage = (negative_count / question_count) * 100 if question_count > 0 else 0
        
        # Build distribution text
        dist_items = sorted(distribution.items(), key=lambda x: -x[1])
        dist_text = ", ".join([f"{count} {sent}" for sent, count in dist_items])
        
        message = f"Analyzed {question_count} questions - audience is {config['desc']}. ({dist_text})"
        
        if method == 'rule-based':
            message += " [Enhanced pattern matching]"
        
        # Add URGENT warning for overwhelmed
        if dominant == 'overwhelmed':
            message = f"⚠️ SLOW DOWN! {message}"
        elif negative_percentage >= 60:
            message += f" ⚠️ {negative_percentage:.0f}% need help!"
        
        return {
            'type': 'sentiment_analysis',
            'severity': config['severity'],
            'title': f"{config['emoji']} Audience Mood: {dominant.title()}",
            'message': message,
            'timestamp': datetime.now(timezone.utc).isoformat(),
            'data': {
                'dominant_sentiment': dominant,
                'distribution': distribution,
                'question_count': question_count,
                'negative_percentage': round(negative_percentage, 1),
                'method': method
            }
        }
    
    def get_sentiment_trend(self) -> Optional[Dict]:
        """Get sentiment trend over the session"""
        if len(self.sentiment_timeline) < 2:
            return None
        
        window_minutes = self.config['trend_window_minutes']
        cutoff = datetime.now(timezone.utc) - timedelta(minutes=window_minutes)
        
        recent_timeline = [
            entry for entry in self.sentiment_timeline
            if self._ensure_timezone_aware(entry['timestamp']) > cutoff
        ]
        
        if len(recent_timeline) < 2:
            return None
        
        sentiments = [entry['dominant_sentiment'] for entry in recent_timeline]
        
        return {
            'timeline': recent_timeline,
            'recent_sentiments': sentiments,
            'current': sentiments[-1] if sentiments else 'neutral',
            'previous': sentiments[-2] if len(sentiments) >= 2 else 'neutral'
        }
    
    async def generate_trend_alert(self) -> Optional[Dict]:
        """Generate alert about sentiment trends"""
        trend = self.get_sentiment_trend()
        
        if not trend:
            return None
        
        current = trend['current']
        previous = trend['previous']
        
        if current == previous:
            return None
        
        # ENHANCED: Better trend detection
        positive_sentiments = ['excited', 'interested']
        negative_sentiments = ['overwhelmed', 'frustrated', 'confused']
        
        is_improving = (
            (previous in negative_sentiments and current not in negative_sentiments) or
            (current in positive_sentiments and previous not in positive_sentiments)
        )
        
        is_declining = (
            (previous in positive_sentiments and current in negative_sentiments) or
            (current in negative_sentiments and previous not in negative_sentiments)
        )
        
        if is_improving:
            return {
                'type': 'sentiment_trend',
                'severity': 'success',
                'title': '📈 Audience Mood Improving',
                'message': f'Sentiment improved from {previous} to {current}',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'data': trend
            }
        elif is_declining:
            severity = 'critical' if current == 'overwhelmed' else 'warning'
            return {
                'type': 'sentiment_trend',
                'severity': severity,
                'title': '📉 Audience Mood Declining',
                'message': f'Sentiment worsened from {previous} to {current}',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'data': trend
            }
        
        return None
    
    def get_status(self) -> Dict:
        """Get current status of the agent"""
        return {
            'total_questions': len(self.questions_with_sentiment),
            'unanalyzed': len(self.unanalyzed_questions),
            'timeline_entries': len(self.sentiment_timeline),
            'is_analyzing': self.is_analyzing
        }