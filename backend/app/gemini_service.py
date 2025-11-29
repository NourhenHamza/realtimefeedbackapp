"""
Gemini Service - Wrapper for Google Gemini API
"""
import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging
from typing import Optional, Dict, Any
import asyncio
import time
import re

load_dotenv()

logger = logging.getLogger(__name__)


class GeminiService:
    """
    Service for interacting with Google Gemini API

    Uses gemini-1.5-flash by default (free, fast).
    Falls back to alternate models if the chosen model is not supported.
    """

    # Preferred model list in order of preference
    PREFERRED_MODELS = [
        "gemini-2.5-flash",
        "gemini-1.5-pro",
        "gemini-1.0-pro"
    ]

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")

        genai.configure(api_key=api_key)

        # Try to initialize a model from the preferred list
        self.model_name = None
        self.model = None
        for m in self.PREFERRED_MODELS:
            try:
                self.model = genai.GenerativeModel(m)
                # a quick lightweight call to validate model support could be added here,
                # but we'll rely on generate_content calls to surface issues.
                self.model_name = m
                logger.info(f"Gemini Service initialized with model: {m}")
                break
            except Exception as e:
                logger.warning(f"Could not initialize model {m}: {str(e)[:200]}")
                continue

        if self.model is None:
            # As a last resort, initialize the first preferred model (will likely fail on generate)
            self.model_name = self.PREFERRED_MODELS[0]
            self.model = genai.GenerativeModel(self.model_name)
            logger.info(f"Fallback: Gemini Service initialized with model: {self.model_name}")

        # Rate limiting tracking
        self.last_request_time = 0
        # flash is quick; 1s interval is generally safe, increase if you hit quota errors
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
        """
        If 404 / model not found detected, try to switch to the next model in PREFERRED_MODELS.
        Returns True if switched and ready to retry, False otherwise.
        """
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
        Generate content using Gemini API with retry logic

        Args:
            prompt: The prompt to send to Gemini
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            retry_count: Number of retries on failure

        Returns:
            Generated text or None if error
        """
        for attempt in range(retry_count):
            try:
                # Wait for rate limit
                await self._wait_for_rate_limit()

                generation_config = genai.types.GenerationConfig(
                    temperature=temperature,
                    max_output_tokens=max_tokens,
                )

                # Some genai clients are blocking — use to_thread to avoid blocking event loop
                response = await asyncio.to_thread(
                    self.model.generate_content,
                    prompt,
                    generation_config=generation_config
                )

                # Many SDK responses have .text or choices — handle common cases
                if response is None:
                    logger.warning(f"Empty response object from Gemini (attempt {attempt + 1}/{retry_count})")
                    raise RuntimeError("Empty response")

                # Preferred property
                text = getattr(response, "text", None)
                if not text:
                    # Try alternative shapes
                    try:
                        # If response.choices exists
                        choices = getattr(response, "choices", None)
                        if choices and len(choices) > 0:
                            text = choices[0].get("message", {}).get("content") if isinstance(choices[0], dict) else getattr(choices[0], "text", None)
                    except Exception:
                        text = None

                if text:
                    return text

                logger.warning(f"No text extracted from response (attempt {attempt + 1}/{retry_count})")
                raise RuntimeError("No text in response")

            except Exception as e:
                error_msg = str(e)
                logger.debug(f"Generate attempt {attempt+1} error: {error_msg[:500]}")

                # Model not found -> try switching model
                switched = await self._try_switch_model_on_404(error_msg)
                if switched:
                    # Try again immediately with the new model
                    logger.info("Retrying generation with fallback model...")
                    continue

                # Rate limit-like errors
                if "429" in error_msg or "quota" in error_msg.lower() or "resource exhausted" in error_msg.lower():
                    if attempt < retry_count - 1:
                        # Attempt to parse suggested retry time
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

                # For other transient errors, small backoff and retry
                if attempt < retry_count - 1:
                    backoff = 2 ** attempt
                    logger.warning(f"Transient error, retrying in {backoff}s (attempt {attempt+1}/{retry_count})")
                    await asyncio.sleep(backoff)
                    continue

                # Final failure
                logger.error(f"Error generating content: {error_msg[:500]}")
                return None

        return None

    async def analyze_pacing(
        self,
        reaction_summary: Dict[str, int],
        time_window_minutes: int = 2
    ) -> Optional[Dict[str, Any]]:
        """
        Analyze presentation pacing based on reactions
        """
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

            # Parse the response
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
        """
        Group similar questions by theme
        """
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

            # Parse themes
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

            # Add last theme
            if current_theme:
                themes.append(current_theme)

            # Match questions to themes (simple heuristic)
            for theme in themes:
                theme['questions'] = []
                rep_q = theme['representative_question'].lower()
                rep_words = [w for w in re.split(r'\W+', rep_q) if len(w) > 3]
                for q in questions:
                    q_text = q['text'].lower()
                    if any(word in q_text for word in rep_words):
                        theme['questions'].append(q)

                # If no matches, add first few questions
                if not theme['questions'] and questions:
                    theme['questions'] = questions[:min(2, len(questions))]

            return {
                'themes': themes,
                'total_questions': len(questions)
            }

        except Exception as e:
            logger.error(f"Error grouping questions: {e}")
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
