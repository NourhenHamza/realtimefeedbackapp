"""
Gemini Service - Wrapper for Google Gemini API
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging
from typing import Optional, Dict, Any, List
import asyncio
import time
import re

load_dotenv()

logger = logging.getLogger(__name__)


class GeminiService:
    """
    Service for interacting with Google Gemini API
    """

    PREFERRED_MODELS = [
        "gemini-2.0-flash-exp",
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-1.0-pro"
    ]

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")

        genai.configure(api_key=api_key)

        self.model_name = None
        self.model = None
        for m in self.PREFERRED_MODELS:
            try:
                self.model = genai.GenerativeModel(m)
                self.model_name = m
                logger.info(f"Gemini Service initialized with model: {m}")
                break
            except Exception as e:
                logger.warning(f"Could not initialize model {m}: {str(e)[:200]}")
                continue

        if self.model is None:
            self.model_name = self.PREFERRED_MODELS[0]
            self.model = genai.GenerativeModel(self.model_name)
            logger.info(f"Fallback: Gemini Service initialized with model: {self.model_name}")

        # Safety settings to reduce blocks
        self.safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ]

        self.last_request_time = 0
        self.min_request_interval = 1.0

        logger.info("Gemini Service ready")

    async def _wait_for_rate_limit(self):
        """Ensure we don't exceed rate limits"""
        current_time = time.time()
        time_since_last = current_time - self.last_request_time

        if time_since_last < self.min_request_interval:
            wait_time = self.min_request_interval - time_since_last
            logger.debug(f"Rate limiting: waiting {wait_time:.2f}s")
            await asyncio.sleep(wait_time)

        self.last_request_time = time.time()

    async def _try_switch_model_on_404(self, error_msg: str) -> bool:
        """Switch to next available model on 404"""
        if any(token in error_msg.lower() for token in ("404", "not found", "model not found")):
            logger.warning("Model not found error detected. Attempting to switch models...")
            try:
                current_index = self.PREFERRED_MODELS.index(self.model_name)
            except ValueError:
                current_index = -1

            for next_model in self.PREFERRED_MODELS[current_index + 1:]:
                try:
                    self.model = genai.GenerativeModel(next_model)
                    self.model_name = next_model
                    logger.info(f"Switched Gemini model to: {next_model}")
                    return True
                except Exception as e:
                    logger.warning(f"Failed to initialize fallback model {next_model}: {str(e)[:200]}")
                    continue
            logger.error("No fallback models available or initialization failed.")
        return False

    async def generate_content(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 1000,
        retry_count: int = 3
    ) -> Optional[str]:
        """
        Generate content using Gemini API with retry logic and safety handling
        """
        for attempt in range(retry_count):
            try:
                await self._wait_for_rate_limit()

                generation_config = genai.types.GenerationConfig(
                    temperature=temperature,
                    max_output_tokens=max_tokens,
                )

                response = await asyncio.to_thread(
                    self.model.generate_content,
                    prompt,
                    generation_config=generation_config,
                    safety_settings=self.safety_settings
                )

                # Check if response was blocked by safety filters
                if hasattr(response, 'prompt_feedback'):
                    block_reason = getattr(response.prompt_feedback, 'block_reason', None)
                    if block_reason and block_reason != 0:
                        logger.warning(f"Content blocked by safety filter: {block_reason}")
                        return None

                # Check if response has parts
                if not hasattr(response, 'parts') or not response.parts:
                    # Check finish_reason
                    if hasattr(response, 'candidates') and response.candidates:
                        finish_reason = response.candidates[0].finish_reason
                        if finish_reason == 2:  # SAFETY
                            logger.warning("Response blocked by safety filters (finish_reason=2)")
                            return None
                        elif finish_reason == 3:  # RECITATION
                            logger.warning("Response blocked due to recitation (finish_reason=3)")
                            return None
                    
                    logger.warning(f"No valid parts in response (attempt {attempt + 1}/{retry_count})")
                    raise RuntimeError("No valid parts in response")

                # Extract text safely
                text = None
                try:
                    text = response.text
                except ValueError as e:
                    logger.warning(f"Could not access response.text: {e}")
                    # Try to extract from parts directly
                    if response.parts:
                        text = ''.join(part.text for part in response.parts if hasattr(part, 'text'))
                
                if text:
                    return text.strip()
                
                logger.warning(f"No text extracted from response (attempt {attempt + 1}/{retry_count})")
                raise RuntimeError("No text in response")

            except Exception as e:
                error_msg = str(e)
                logger.debug(f"Generate attempt {attempt+1} error: {error_msg[:500]}")

                # Try to switch model on 404
                switched = await self._try_switch_model_on_404(error_msg)
                if switched:
                    logger.info("Retrying generation with fallback model...")
                    continue

                # Handle rate limits
                if "429" in error_msg or "quota" in error_msg.lower() or "resource exhausted" in error_msg.lower():
                    if attempt < retry_count - 1:
                        retry_delay = 10
                        match = re.search(r'(\d+\.?\d*)\s*s', error_msg.lower())
                        if match:
                            try:
                                retry_delay = float(match.group(1))
                            except:
                                pass
                        logger.warning(f"Rate limit hit. Retrying in {retry_delay}s (attempt {attempt+1}/{retry_count})")
                        await asyncio.sleep(retry_delay)
                        continue
                    else:
                        logger.error("Rate limit exceeded after retries")
                        return None

                # Backoff for transient errors
                if attempt < retry_count - 1:
                    backoff = 2 ** attempt
                    logger.warning(f"Transient error, retrying in {backoff}s (attempt {attempt+1}/{retry_count})")
                    await asyncio.sleep(backoff)
                    continue

                logger.error(f"Error generating content: {error_msg[:500]}")
                return None

        return None

    async def analyze_pacing(
        self,
        reaction_summary: Dict[str, int],
        time_window_minutes: int = 2
    ) -> Optional[Dict[str, Any]]:
        """Analyze presentation pacing based on reactions"""
        prompt = f"""You are an AI assistant helping presenters improve their presentation delivery.

Analyze the following audience reactions from the last {time_window_minutes} minutes:

{self._format_reactions(reaction_summary)}

Provide a brief analysis with:
1. Assessment: How is the audience engaging? (1-2 sentences)
2. Recommendation: One specific actionable suggestion for the presenter (1 sentence)
3. Sentiment: Overall audience sentiment (one word: positive, neutral, concerned, or struggling)

Format your response as:
ASSESSMENT: [your assessment]
RECOMMENDATION: [your recommendation]
SENTIMENT: [sentiment word]
"""

        try:
            response_text = await self.generate_content(prompt, temperature=0.5)

            if not response_text:
                return None

            lines = response_text.strip().split('\n')
            result = {
                'assessment': '',
                'recommendation': '',
                'sentiment': 'neutral'
            }

            for line in lines:
                line = line.strip()
                if line.upper().startswith('ASSESSMENT:'):
                    result['assessment'] = line.split(':', 1)[1].strip()
                elif line.upper().startswith('RECOMMENDATION:'):
                    result['recommendation'] = line.split(':', 1)[1].strip()
                elif line.upper().startswith('SENTIMENT:'):
                    result['sentiment'] = line.split(':', 1)[1].strip().lower()

            return result

        except Exception as e:
            logger.error(f"Error analyzing pacing: {e}")
            return None

    async def group_questions(
        self,
        questions: list,
        max_themes: int = 5
    ) -> Optional[Dict[str, Any]]:
        """Group similar questions by theme"""
        if not questions:
            return None

        questions_text = "\n".join([
            f"- {q['text']} (asked by {q.get('user_name','unknown')})"
            for q in questions
        ])

        prompt = f"""You are helping a presenter understand questions from their audience.

Here are {len(questions)} questions from the audience:

{questions_text}

Group these questions into up to {max_themes} main themes or topics.

For each theme, provide:
1. Theme name (concise, 3-5 words)
2. Number of questions in this theme
3. One representative question that best captures the theme

Format your response as:
THEME: [theme name]
COUNT: [number]
QUESTION: [representative question text]

[Repeat for each theme]
"""

        try:
            response_text = await self.generate_content(prompt, temperature=0.3)

            if not response_text:
                return None

            themes = []
            current_theme = {}

            lines = response_text.strip().split('\n')
            for line in lines:
                line = line.strip()
                if line.upper().startswith('THEME:'):
                    if current_theme:
                        themes.append(current_theme)
                    current_theme = {
                        'theme': line.split(':', 1)[1].strip(),
                        'count': 0,
                        'representative_question': ''
                    }
                elif line.upper().startswith('COUNT:'):
                    try:
                        current_theme['count'] = int(line.split(':', 1)[1].strip())
                    except:
                        current_theme['count'] = 1
                elif line.upper().startswith('QUESTION:'):
                    current_theme['representative_question'] = line.split(':', 1)[1].strip()

            if current_theme:
                themes.append(current_theme)

            for theme in themes:
                theme['questions'] = []
                rep_q = theme['representative_question'].lower()
                rep_words = [w for w in re.split(r'\W+', rep_q) if len(w) > 3]
                for q in questions:
                    q_text = q['text'].lower()
                    if any(word in q_text for word in rep_words):
                        theme['questions'].append(q)

                if not theme['questions'] and questions:
                    theme['questions'] = questions[:min(2, len(questions))]

            return {
                'themes': themes,
                'total_questions': len(questions)
            }

        except Exception as e:
            logger.error(f"Error grouping questions: {e}")
            return None

    async def analyze_question_sentiment(
        self,
        questions: List[Dict[str, str]]
    ) -> Optional[Dict[str, Any]]:
        """Analyze sentiment/emotion of multiple questions"""
        if not questions:
            return None

        questions_text = "\n".join([
            f"{i+1}. {q['text']}"
            for i, q in enumerate(questions)
        ])

        prompt = f"""Analyze the emotional sentiment of each question from an audience during a presentation.

Classify each question as ONE of: interested, confused, frustrated, excited, neutral

Questions:
{questions_text}

Respond with ONLY the number and sentiment, like:
1. confused
2. interested
3. excited

Your analysis:"""

        try:
            response_text = await self.generate_content(prompt, temperature=0.3, max_tokens=300)

            if not response_text:
                return None

            sentiments = []
            lines = response_text.strip().split('\n')
            categories = ['interested', 'confused', 'frustrated', 'excited', 'neutral']

            for line in lines:
                line = line.strip().lower()
                for category in categories:
                    if category in line:
                        sentiments.append(category)
                        break

            while len(sentiments) < len(questions):
                sentiments.append('neutral')

            from collections import defaultdict
            distribution = defaultdict(int)
            for sentiment in sentiments[:len(questions)]:
                distribution[sentiment] += 1

            dominant = max(distribution.items(), key=lambda x: x[1])[0]

            return {
                'sentiments': sentiments[:len(questions)],
                'distribution': dict(distribution),
                'dominant_sentiment': dominant
            }

        except Exception as e:
            logger.error(f"Error analyzing sentiment: {e}")
            return None

    def _format_reactions(self, reaction_summary: Dict[str, int]) -> str:
        """Format reaction summary for prompt"""
        if not reaction_summary:
            return "No reactions recorded"

        formatted = []
        for reaction_type, count in reaction_summary.items():
            formatted.append(f"- {reaction_type.replace('_', ' ').title()}: {count}")

        return "\n".join(formatted)


# Singleton instance
_gemini_service = None


def get_gemini_service() -> GeminiService:
    """Get or create Gemini service instance"""
    global _gemini_service
    if _gemini_service is None:
        _gemini_service = GeminiService()
    return _gemini_service