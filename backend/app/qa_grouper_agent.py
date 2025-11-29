"""
Q&A Grouper Agent - Groups similar questions by theme
"""
from datetime import datetime
from typing import List, Dict, Optional
import logging

from config import QA_GROUPER_CONFIG
from gemini_service import get_gemini_service

logger = logging.getLogger(__name__)


class QAGrouperAgent:
    """
    AI Agent that groups similar questions and identifies key themes
    """
    
    def __init__(self, session_id: str):
        self.session_id = session_id
        self.gemini = get_gemini_service()
        
        # Store all questions
        self.questions: List[Dict] = []
        
        # Track which questions have been grouped
        self.grouped_question_ids: set = set()
        
        # Configuration
        self.config = QA_GROUPER_CONFIG
        
        logger.info(f"Q&A Grouper Agent initialized for session {session_id}")
    
    def add_question(self, question_text: str, user_name: str, timestamp: datetime):
        """
        Add a question to the collection
        
        Args:
            question_text: The question text
            user_name: Name of the person asking
            timestamp: When the question was asked
        """
        question_id = len(self.questions)
        self.questions.append({
            'id': question_id,
            'text': question_text,
            'user_name': user_name,
            'timestamp': timestamp
        })
        
        logger.info(f"Question added: {question_text[:50]}...")
    
    def get_ungrouped_questions(self) -> List[Dict]:
        """Get questions that haven't been grouped yet"""
        return [
            q for q in self.questions 
            if q['id'] not in self.grouped_question_ids
        ]
    
    def get_question_count(self) -> int:
        """Get total number of questions"""
        return len(self.questions)
    
    def _safe_timestamp_to_iso(self, timestamp) -> str:
        """
        Safely convert timestamp to ISO format string
        
        Args:
            timestamp: datetime object or ISO string
            
        Returns:
            ISO format string
        """
        if isinstance(timestamp, str):
            return timestamp
        elif isinstance(timestamp, datetime):
            return timestamp.isoformat()
        else:
            # Fallback to current time if invalid
            return datetime.utcnow().isoformat()
    
    async def group_questions(self) -> Optional[Dict]:
        """
        Group ungrouped questions if conditions are met
        
        Returns:
            Alert dictionary with grouped questions, or None if not ready
        """
        try:
            ungrouped = self.get_ungrouped_questions()
            
            # Check if we have enough questions to group
            min_questions = self.config['min_questions_for_grouping']
            if len(ungrouped) < min_questions:
                return None
            
            logger.info(f"Grouping {len(ungrouped)} questions...")
            
            # Prepare questions for Gemini
            questions_for_ai = [
                {
                    'text': q['text'],
                    'user_name': q['user_name']
                }
                for q in ungrouped
            ]
            
            # Get AI grouping
            grouped_result = await self.gemini.group_questions(
                questions_for_ai,
                max_themes=self.config['max_themes']
            )
            
            if not grouped_result:
                logger.warning("AI grouping failed, using simple fallback")
                # Fallback: Create a simple grouped alert without themes
                for q in ungrouped:
                    self.grouped_question_ids.add(q['id'])
                
                return {
                    'type': 'qa_grouped',
                    'severity': 'info',
                    'title': '💬 New Questions Received',
                    'message': f'Received {len(ungrouped)} new questions (AI grouping temporarily unavailable)',
                    'timestamp': datetime.utcnow().isoformat(),
                    'themes': [{
                        'theme': 'Recent Questions',
                        'count': len(ungrouped),
                        'representative_question': ungrouped[0]['text'],
                        'questions': [
                            {
                                'text': q['text'],
                                'user_name': q['user_name'],
                                'timestamp': self._safe_timestamp_to_iso(q['timestamp'])
                            }
                            for q in ungrouped[:5]  # Show first 5
                        ]
                    }]
                }
            
            # Mark these questions as grouped
            for q in ungrouped:
                self.grouped_question_ids.add(q['id'])
            
            # Format themes with full question data
            themes = []
            for theme_data in grouped_result.get('themes', []):
                # Get questions for this theme - they reference the original ungrouped questions
                theme_questions = []
                for q_ref in theme_data.get('questions', []):
                    # q_ref might just be the text, need to find the full question from ungrouped
                    matching_q = None
                    if isinstance(q_ref, dict):
                        # If it's already a dict, use it
                        matching_q = q_ref
                    else:
                        # If it's just text, find the matching question
                        for uq in ungrouped:
                            if uq['text'] == q_ref or (isinstance(q_ref, dict) and q_ref.get('text') == uq['text']):
                                matching_q = uq
                                break
                    
                    if matching_q:
                        theme_questions.append({
                            'text': matching_q.get('text', ''),
                            'user_name': matching_q.get('user_name', 'Anonymous'),
                            'timestamp': self._safe_timestamp_to_iso(matching_q.get('timestamp', datetime.utcnow()))
                        })
                
                theme = {
                    'theme': theme_data.get('theme', 'Misc Questions'),
                    'count': theme_data.get('count', len(theme_questions)),
                    'representative_question': theme_data.get('representative_question', 
                                                              theme_questions[0]['text'] if theme_questions else ''),
                    'questions': theme_questions
                }
                themes.append(theme)
            
            return {
                'type': 'qa_grouped',
                'severity': 'info',
                'title': '💬 Questions Grouped by Theme',
                'message': f'Identified {len(themes)} themes from {len(ungrouped)} questions',
                'timestamp': datetime.utcnow().isoformat(),
                'themes': themes
            }
        
        except Exception as e:
            logger.error(f"Error in group_questions: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return None
    
    def clear_old_grouped_ids(self):
        """Clear grouped IDs if list gets too long (memory management)"""
        if len(self.grouped_question_ids) > 100:
            # Keep only the most recent 50
            recent_ids = set(q['id'] for q in self.questions[-50:])
            self.grouped_question_ids = self.grouped_question_ids.intersection(recent_ids)