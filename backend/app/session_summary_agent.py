"""
Session Summary Agent - Generates comprehensive session summary and advice
"""
import asyncio
from datetime import datetime, timezone, timedelta
from typing import Dict, List, Optional
import logging
import json
import re

# Use the gemini_service instead of direct API calls
from gemini_service import get_gemini_service

logger = logging.getLogger(__name__)


class SessionSummaryAgent:
    """
    Generates a comprehensive summary of the presentation session
    including Q&A themes, pacing analysis, and actionable advice
    """
    
    def __init__(self, session_id: str):
        self.session_id = session_id
        # Use the centralized Gemini service (handles model selection from config)
        self.gemini = get_gemini_service()
        logger.info(f"📊 Session Summary Agent initialized for session {session_id}")
    
    async def generate_session_summary(
        self, 
        reactions: List[Dict],
        questions: List[Dict],
        alerts: List[Dict],
        session_duration_minutes: float
    ) -> Dict:
        """
        Generate comprehensive session summary
        
        Args:
            reactions: List of all reactions during session
            questions: List of all questions asked
            alerts: List of all AI alerts generated
            session_duration_minutes: Total session duration in minutes
            
        Returns:
            Summary dictionary with insights and recommendations
        """
        try:
            logger.info(f"📊 Generating session summary for {self.session_id}...")
            
            # Analyze reaction patterns
            reaction_analysis = self._analyze_reactions(reactions)
            
            # Analyze question themes
            question_analysis = await self._analyze_questions(questions)
            
            # Analyze pacing and engagement
            pacing_analysis = self._analyze_pacing(reactions, alerts, session_duration_minutes)
            
            # Generate AI-powered overall summary
            overall_summary = await self._generate_ai_summary(
                reaction_analysis,
                question_analysis,
                pacing_analysis,
                session_duration_minutes
            )
            
            # Generate actionable recommendations
            recommendations = await self._generate_recommendations(
                reaction_analysis,
                question_analysis,
                pacing_analysis
            )
            
            summary = {
                "session_id": self.session_id,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "session_duration_minutes": round(session_duration_minutes, 1),
                "overall_summary": overall_summary,
                "reaction_analysis": reaction_analysis,
                "question_analysis": question_analysis,
                "pacing_analysis": pacing_analysis,
                "recommendations": recommendations,
                "statistics": {
                    "total_reactions": len(reactions),
                    "total_questions": len(questions),
                    "total_alerts": len(alerts),
                    "reactions_per_minute": round(len(reactions) / max(session_duration_minutes, 1), 2),
                    "questions_per_minute": round(len(questions) / max(session_duration_minutes, 1), 2)
                }
            }
            
            logger.info(f"✅ Session summary generated successfully")
            return summary
            
        except Exception as e:
            logger.error(f"❌ Error generating session summary: {e}", exc_info=True)
            return self._generate_fallback_summary(reactions, questions, session_duration_minutes)
    
    def _analyze_reactions(self, reactions: List[Dict]) -> Dict:
        """Analyze reaction patterns"""
        if not reactions:
            return {
                "total": 0,
                "breakdown": {},
                "dominant_reaction": None,
                "engagement_level": "No reactions",
                "sentiment": "neutral",
                "code_requests": 0,
                "confusion_signals": 0
            }
        
        # Count reaction types
        breakdown = {}
        for r in reactions:
            rtype = r.get('reaction_type', 'UNKNOWN')
            breakdown[rtype] = breakdown.get(rtype, 0) + 1
        
        # Determine dominant reaction
        dominant = max(breakdown.items(), key=lambda x: x[1])
        
        # Calculate engagement level
        total = len(reactions)
        if total < 10:
            engagement = "Low engagement"
        elif total < 30:
            engagement = "Moderate engagement"
        elif total < 60:
            engagement = "High engagement"
        else:
            engagement = "Very high engagement"
        
        # Analyze sentiment from reactions
        positive_reactions = breakdown.get('SPEED_UP', 0)
        negative_reactions = breakdown.get('SLOW_DOWN', 0) + breakdown.get('IM_LOST', 0)
        code_requests = breakdown.get('SHOW_CODE', 0)
        
        sentiment = "neutral"
        if positive_reactions > negative_reactions * 1.5:
            sentiment = "positive"
        elif negative_reactions > positive_reactions * 1.5:
            sentiment = "concerning"
        
        return {
            "total": total,
            "breakdown": breakdown,
            "dominant_reaction": {
                "type": dominant[0],
                "count": dominant[1],
                "percentage": round((dominant[1] / total) * 100, 1)
            },
            "engagement_level": engagement,
            "sentiment": sentiment,
            "code_requests": code_requests,
            "confusion_signals": breakdown.get('IM_LOST', 0) + breakdown.get('SLOW_DOWN', 0)
        }
    
    async def _analyze_questions(self, questions: List[Dict]) -> Dict:
        """Analyze question themes using AI"""
        if not questions:
            return {
                "total": 0,
                "themes": [],
                "top_concerns": [],
                "quality_assessment": "No questions asked"
            }
        
        try:
            # Use Gemini to identify themes
            question_texts = [q.get('question_text', '') for q in questions[:50]]
            
            # Sanitize questions to avoid safety filters
            sanitized_questions = []
            for i, q in enumerate(question_texts):
                # Clean the text - remove special chars, limit length
                clean_q = q.strip().replace('\n', ' ').replace('"', "'")[:200]
                sanitized_questions.append(f"{i+1}. {clean_q}")
            
            prompt = f"""You are analyzing audience questions from a technical presentation.

{len(sanitized_questions)} questions were asked:
{chr(10).join(sanitized_questions)}

Categorize these into themes and identify concerns.

IMPORTANT: Return ONLY valid JSON, no markdown, no extra text.

Response format:
{{
    "themes": [{{"theme": "topic name", "count": 1, "example": "sample question"}}],
    "concerns": ["concern 1", "concern 2"],
    "quality_assessment": "brief assessment"
}}"""

            # Use gemini service
            response = await self.gemini.generate_content(
                prompt,
                temperature=0.2,  # Lower temp for more consistent JSON
                max_tokens=800,
                retry_count=2  # Fewer retries for faster fallback
            )
            
            if not response:
                logger.warning("Empty response from Gemini, using fallback")
                raise Exception("Empty response from Gemini")
            
            # Parse AI response with robust error handling
            # Clean markdown formatting if present
            clean_response = response.strip()
            clean_response = re.sub(r'^```json\s*', '', clean_response)
            clean_response = re.sub(r'```\s*$', '', clean_response)
            clean_response = clean_response.strip()
            
            # Try to find JSON in response if there's extra text
            json_match = re.search(r'\{.*\}', clean_response, re.DOTALL)
            if json_match:
                clean_response = json_match.group(0)
            
            try:
                analysis = json.loads(clean_response)
            except json.JSONDecodeError as je:
                logger.error(f"JSON parsing error at position {je.pos}: {je.msg}")
                logger.error(f"Failed JSON: {clean_response[:500]}")
                raise
            
            return {
                "total": len(questions),
                "themes": analysis.get('themes', [])[:5],  # Limit themes
                "top_concerns": analysis.get('concerns', [])[:5],  # Limit concerns
                "quality_assessment": analysis.get('quality_assessment', 'N/A')
            }
            
        except Exception as e:
            logger.error(f"❌ Error in AI question analysis: {e}")
            # Return simple fallback analysis
            return {
                "total": len(questions),
                "themes": [{"theme": "Technical Questions", "count": len(questions), "example": questions[0].get('question_text', 'N/A') if questions else 'N/A'}],
                "top_concerns": ["Questions require manual review"],
                "quality_assessment": f"{len(questions)} questions received during session"
            }
    
    def _analyze_pacing(self, reactions: List[Dict], alerts: List[Dict], duration: float) -> Dict:
        """Analyze pacing and timing issues"""
        pacing_alerts = [a for a in alerts if a.get('type') == 'pacing']
        critical_alerts = [a for a in alerts if a.get('severity') == 'critical']
        
        speed_up_count = sum(1 for r in reactions if r.get('reaction_type') == 'SPEED_UP')
        slow_down_count = sum(1 for r in reactions if r.get('reaction_type') == 'SLOW_DOWN')
        
        if slow_down_count > speed_up_count * 2:
            assessment = "Too fast - audience struggled to keep up"
        elif speed_up_count > slow_down_count * 2:
            assessment = "Too slow - audience wanted faster pace"
        elif slow_down_count > 5 or speed_up_count > 5:
            assessment = "Mixed feedback - some sections too fast, others too slow"
        else:
            assessment = "Good pace - audience kept up well"
        
        return {
            "assessment": assessment,
            "total_pacing_alerts": len(pacing_alerts),
            "critical_moments": len(critical_alerts),
            "speed_up_requests": speed_up_count,
            "slow_down_requests": slow_down_count,
            "pacing_score": self._calculate_pacing_score(speed_up_count, slow_down_count, duration)
        }
    
    def _calculate_pacing_score(self, speed_up: int, slow_down: int, duration: float) -> int:
        """Calculate pacing score 0-100"""
        total_adjustments = speed_up + slow_down
        adjustments_per_minute = total_adjustments / max(duration, 1)
        
        if adjustments_per_minute < 0.5:
            return 90
        elif adjustments_per_minute < 1.0:
            return 75
        elif adjustments_per_minute < 2.0:
            return 60
        elif adjustments_per_minute < 3.0:
            return 40
        else:
            return 20
    
    async def _generate_ai_summary(
        self, 
        reaction_analysis: Dict,
        question_analysis: Dict,
        pacing_analysis: Dict,
        duration: float
    ) -> str:
        """Generate AI-powered overall summary"""
        try:
            prompt = f"""Summarize this presentation session in 2-3 sentences.

Session metrics:
- Duration: {duration:.1f} minutes
- Reactions: {reaction_analysis['total']}
- Questions: {question_analysis['total']}  
- Engagement: {reaction_analysis['engagement_level']}
- Pacing: {pacing_analysis['assessment']}

Provide a constructive summary focusing on what went well and improvement areas."""

            # Use gemini service
            response = await self.gemini.generate_content(
                prompt,
                temperature=0.3,
                max_tokens=300,
                retry_count=2
            )
            
            if response:
                return response.strip()
            else:
                raise Exception("Empty response")
            
        except Exception as e:
            logger.error(f"❌ Error generating AI summary: {e}")
            return f"Session lasted {duration:.1f} minutes with {reaction_analysis['total']} reactions and {question_analysis['total']} questions. {reaction_analysis['engagement_level']}."
    
    async def _generate_recommendations(
        self,
        reaction_analysis: Dict,
        question_analysis: Dict,
        pacing_analysis: Dict
    ) -> List[Dict]:
        """Generate actionable recommendations"""
        try:
            prompt = f"""Provide 3-5 actionable recommendations to improve this presentation.

Session data:
- Engagement: {reaction_analysis['engagement_level']}
- Sentiment: {reaction_analysis['sentiment']}
- Code requests: {reaction_analysis.get('code_requests', 0)}
- Confusion signals: {reaction_analysis.get('confusion_signals', 0)}
- Questions: {question_analysis['total']}
- Pacing score: {pacing_analysis['pacing_score']}/100

IMPORTANT: Return ONLY valid JSON array, no markdown, no extra text.

Format:
[{{"category": "pacing", "priority": "high", "recommendation": "specific advice", "rationale": "reason"}}]"""

            # Use gemini service with reduced parameters
            response = await self.gemini.generate_content(
                prompt,
                temperature=0.2,
                max_tokens=1000,
                retry_count=2
            )
            
            if not response:
                logger.warning("Empty response for recommendations, using fallback")
                raise Exception("Empty response")
            
            # Clean markdown formatting
            clean_response = response.strip()
            clean_response = re.sub(r'^```json\s*', '', clean_response)
            clean_response = re.sub(r'```\s*$', '', clean_response)
            clean_response = clean_response.strip()
            
            # Try to find JSON array in response
            json_match = re.search(r'\[.*\]', clean_response, re.DOTALL)
            if json_match:
                clean_response = json_match.group(0)
            
            recommendations = json.loads(clean_response)
            
            # Validate structure
            if not isinstance(recommendations, list):
                raise ValueError("Response is not a list")
            
            # Ensure each recommendation has required fields
            valid_recommendations = []
            for rec in recommendations:
                if isinstance(rec, dict) and all(k in rec for k in ['category', 'priority', 'recommendation', 'rationale']):
                    valid_recommendations.append(rec)
            
            if valid_recommendations:
                return valid_recommendations[:5]  # Limit to 5
            else:
                raise ValueError("No valid recommendations in response")
            
        except Exception as e:
            logger.error(f"❌ Error generating recommendations: {e}")
            return self._generate_fallback_recommendations(
                reaction_analysis, 
                question_analysis,
                pacing_analysis
            )
    
    def _generate_fallback_recommendations(
        self,
        reaction_analysis: Dict,
        question_analysis: Dict,
        pacing_analysis: Dict
    ) -> List[Dict]:
        """Generate simple rule-based recommendations"""
        recommendations = []
        
        if pacing_analysis['pacing_score'] < 60:
            recommendations.append({
                "category": "pacing",
                "priority": "high",
                "recommendation": "Adjust your presentation pace based on audience feedback",
                "rationale": f"Received {pacing_analysis['slow_down_requests']} slow down and {pacing_analysis['speed_up_requests']} speed up requests"
            })
        
        if reaction_analysis.get('code_requests', 0) > 5:
            recommendations.append({
                "category": "content",
                "priority": "high",
                "recommendation": "Include more live coding demonstrations",
                "rationale": f"Audience requested code examples {reaction_analysis['code_requests']} times"
            })
        
        if reaction_analysis.get('confusion_signals', 0) > 10:
            recommendations.append({
                "category": "clarity",
                "priority": "high",
                "recommendation": "Simplify complex concepts and provide more examples",
                "rationale": f"Received {reaction_analysis['confusion_signals']} confusion signals from audience"
            })
        
        if reaction_analysis['total'] < 20:
            recommendations.append({
                "category": "engagement",
                "priority": "medium",
                "recommendation": "Increase audience interaction and ask more questions",
                "rationale": "Low overall engagement during the session"
            })
        
        if question_analysis['total'] > 20:
            recommendations.append({
                "category": "interaction",
                "priority": "medium",
                "recommendation": "Allocate more time for Q&A or address common questions proactively",
                "rationale": f"Received {question_analysis['total']} questions - high audience curiosity"
            })
        
        return recommendations[:5]
    
    def _generate_fallback_summary(
        self, 
        reactions: List[Dict],
        questions: List[Dict],
        duration: float
    ) -> Dict:
        """Generate basic summary without AI"""
        return {
            "session_id": self.session_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "session_duration_minutes": round(duration, 1),
            "overall_summary": f"Session lasted {duration:.1f} minutes with {len(reactions)} reactions and {len(questions)} questions.",
            "reaction_analysis": {
                "total": len(reactions),
                "breakdown": {},
                "dominant_reaction": None,
                "engagement_level": "Unknown",
                "sentiment": "neutral",
                "code_requests": 0,
                "confusion_signals": 0
            },
            "question_analysis": {
                "total": len(questions),
                "themes": [],
                "top_concerns": [],
                "quality_assessment": "Unable to analyze"
            },
            "pacing_analysis": {
                "assessment": "Unable to analyze",
                "total_pacing_alerts": 0,
                "critical_moments": 0,
                "speed_up_requests": 0,
                "slow_down_requests": 0,
                "pacing_score": 50
            },
            "statistics": {
                "total_reactions": len(reactions),
                "total_questions": len(questions),
                "total_alerts": 0,
                "reactions_per_minute": round(len(reactions) / max(duration, 1), 2),
                "questions_per_minute": round(len(questions) / max(duration, 1), 2)
            },
            "recommendations": [
                {
                    "category": "general",
                    "priority": "low",
                    "recommendation": "Continue engaging with your audience",
                    "rationale": "Session completed successfully"
                }
            ],
            "error": "AI analysis unavailable - using basic summary"
        }