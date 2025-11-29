"""
Sentiment Agent - Analyzes question text for emotional engagement
"""
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Optional
from collections import defaultdict, deque
import logging

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
        
        logger.info(f"Sentiment Agent initialized for session {session_id}")
    
    def add_question(self, question_text: str, user_name: str, timestamp: datetime):
        """
        Add a question for sentiment analysis
        
        Args:
            question_text: The question text
            user_name: Name of the person asking
            timestamp: When the question was asked
        """
        question_data = {
            'text': question_text,
            'user_name': user_name,
            'timestamp': timestamp,
            'sentiment': None,  # To be analyzed
            'analyzed': False
        }
        
        self.unanalyzed_questions.append(question_data)
        logger.debug(f"Question queued for sentiment analysis: {question_text[:50]}...")
    
    async def analyze_pending_questions(self) -> Optional[Dict]:
        """
        Analyze sentiment of pending questions
        
        Returns:
            Alert with sentiment analysis or None
        """
        min_questions = self.config['min_questions_for_analysis']
        
        if len(self.unanalyzed_questions) < min_questions:
            return None
        
        # Get questions to analyze (batch up to 10 at a time)
        batch_size = min(10, len(self.unanalyzed_questions))
        questions_to_analyze = []
        
        for _ in range(batch_size):
            if self.unanalyzed_questions:
                questions_to_analyze.append(self.unanalyzed_questions.popleft())
        
        if not questions_to_analyze:
            return None
        
        logger.info(f"Analyzing sentiment for {len(questions_to_analyze)} questions...")
        
        # Analyze with Gemini
        analysis_result = await self._analyze_sentiment_batch(questions_to_analyze)
        
        if not analysis_result:
            # Return questions to queue on failure
            self.unanalyzed_questions.extendleft(reversed(questions_to_analyze))
            return None
        
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
        
        # Create alert
        return self._create_sentiment_alert(analysis_result, len(questions_to_analyze))
    
    async def _analyze_sentiment_batch(self, questions: List[Dict]) -> Optional[Dict]:
        """
        Analyze sentiment of a batch of questions using Gemini
        
        Args:
            questions: List of question dictionaries
            
        Returns:
            Analysis result with sentiments and distribution
        """
        questions_text = "\n".join([
            f"{i+1}. {q['text']}"
            for i, q in enumerate(questions)
        ])
        
        categories = self.config['sentiment_categories']
        categories_str = ", ".join(categories)
        
        prompt = f"""You are analyzing audience questions during a presentation to understand their emotional engagement.

Analyze the sentiment/emotion of each question. Choose ONE category for each:
{categories_str}

Questions:
{questions_text}

For each question, respond with ONLY the number and category, like:
1. confused
2. interested
3. frustrated

Your analysis:"""

        try:
            response = await self.gemini.generate_content(
                prompt,
                temperature=0.3,
                max_tokens=300
            )
            
            if not response:
                return None
            
            # Parse sentiments from response
            sentiments = []
            lines = response.strip().split('\n')
            
            for line in lines:
                line = line.strip().lower()
                # Look for pattern like "1. confused" or "1: confused"
                for category in categories:
                    if category.lower() in line:
                        sentiments.append(category)
                        break
            
            # If parsing failed, assign neutral
            while len(sentiments) < len(questions):
                sentiments.append('neutral')
            
            # Calculate distribution
            distribution = defaultdict(int)
            for sentiment in sentiments[:len(questions)]:
                distribution[sentiment] += 1
            
            # Find dominant sentiment
            dominant_sentiment = max(distribution.items(), key=lambda x: x[1])[0]
            
            return {
                'sentiments': sentiments[:len(questions)],
                'distribution': dict(distribution),
                'dominant_sentiment': dominant_sentiment
            }
            
        except Exception as e:
            logger.error(f"Error analyzing sentiment batch: {e}")
            return None
    
    def _create_sentiment_alert(self, analysis: Dict, question_count: int) -> Dict:
        """
        Create an alert based on sentiment analysis
        
        Args:
            analysis: Analysis result
            question_count: Number of questions analyzed
            
        Returns:
            Alert dictionary
        """
        dominant = analysis['dominant_sentiment']
        distribution = analysis['distribution']
        
        # Determine severity and emoji
        sentiment_config = {
            'excited': {'emoji': '🎉', 'severity': 'success', 'desc': 'excited and engaged'},
            'interested': {'emoji': '👍', 'severity': 'success', 'desc': 'interested'},
            'neutral': {'emoji': 'ℹ️', 'severity': 'info', 'desc': 'neutral'},
            'confused': {'emoji': '🤔', 'severity': 'warning', 'desc': 'confused'},
            'frustrated': {'emoji': '😤', 'severity': 'critical', 'desc': 'frustrated'}
        }
        
        config = sentiment_config.get(dominant, sentiment_config['neutral'])
        
        # Calculate negative sentiment percentage
        negative_sentiments = ['confused', 'frustrated']
        negative_count = sum(distribution.get(s, 0) for s in negative_sentiments)
        negative_percentage = (negative_count / question_count) * 100 if question_count > 0 else 0
        
        # Build distribution text
        dist_text = ", ".join([f"{count} {sent}" for sent, count in sorted(distribution.items(), key=lambda x: -x[1])])
        
        message = f"Audience is feeling {config['desc']}. ({dist_text})"
        
        # Add warning if high negative sentiment
        threshold = self.config['negative_sentiment_threshold']
        if negative_percentage >= (threshold * 100):
            message += f" ⚠️ {negative_percentage:.0f}% need clarification!"
        
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
                'negative_percentage': round(negative_percentage, 1)
            }
        }
    
    def get_sentiment_trend(self) -> Optional[Dict]:
        """
        Get sentiment trend over the session
        
        Returns:
            Trend data or None if insufficient data
        """
        if len(self.sentiment_timeline) < 2:
            return None
        
        # Get recent timeline entries
        window_minutes = self.config['trend_window_minutes']
        cutoff = datetime.now(timezone.utc) - timedelta(minutes=window_minutes)
        
        recent_timeline = [
            entry for entry in self.sentiment_timeline
            if entry['timestamp'] > cutoff
        ]
        
        if len(recent_timeline) < 2:
            return None
        
        # Calculate trend
        sentiments = [entry['dominant_sentiment'] for entry in recent_timeline]
        
        return {
            'timeline': recent_timeline,
            'recent_sentiments': sentiments,
            'current': sentiments[-1] if sentiments else 'neutral',
            'previous': sentiments[-2] if len(sentiments) >= 2 else 'neutral'
        }
    
    async def generate_trend_alert(self) -> Optional[Dict]:
        """
        Generate alert about sentiment trends
        
        Returns:
            Trend alert or None
        """
        trend = self.get_sentiment_trend()
        
        if not trend:
            return None
        
        current = trend['current']
        previous = trend['previous']
        
        # Only alert on significant changes
        if current == previous:
            return None
        
        # Determine if trend is improving or declining
        positive_sentiments = ['excited', 'interested']
        negative_sentiments = ['confused', 'frustrated']
        
        is_improving = (
            (previous in negative_sentiments and current not in negative_sentiments) or
            (current in positive_sentiments)
        )
        
        is_declining = (
            (previous in positive_sentiments and current in negative_sentiments) or
            (current in negative_sentiments)
        )
        
        if is_improving:
            return {
                'type': 'sentiment_trend',
                'severity': 'success',
                'title': '📈 Audience Mood Improving',
                'message': f'Sentiment shifted from {previous} to {current}',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'data': trend
            }
        elif is_declining:
            return {
                'type': 'sentiment_trend',
                'severity': 'warning',
                'title': '📉 Audience Mood Declining',
                'message': f'Sentiment shifted from {previous} to {current}',
                'timestamp': datetime.now(timezone.utc).isoformat(),
                'data': trend
            }
        
        return None
    
    def get_status(self) -> Dict:
        """Get current status of the agent"""
        return {
            'total_questions': len(self.questions_with_sentiment),
            'unanalyzed': len(self.unanalyzed_questions),
            'timeline_entries': len(self.sentiment_timeline)
        }
 