"""
Configuration for AI Agents - Optimized to avoid rate limits
"""

# Pacing Agent Configuration
PACING_AGENT_CONFIG = {
    # Critical threshold - immediate alert if this many "I'm Lost" reactions
    "im_lost_threshold": 5,
    "im_lost_window_seconds": 10,
    
    # Pacing thresholds
    "speed_up_threshold": 3,
    "slow_down_threshold": 3,
    "show_code_threshold": 3,
    "reaction_window_seconds": 30,
    
    # AI insights generation
    "ai_insights_interval_seconds": 120,  # Every 2 minutes
    
    # Alert cooldown to prevent spam
    "alert_cooldown_seconds": 30,
}

# Q&A Grouper Configuration
QA_GROUPER_CONFIG = {
    # Minimum questions before attempting to group
    "min_questions_for_grouping": 3,
    
    # How often to check for new questions to group
    "grouping_interval_seconds": 120,  # Every 2 minutes to avoid rate limits
    
    # Maximum number of themes to identify
    "max_themes": 5,
    
    # Maximum questions to analyze at once
    "max_questions_per_group": 20,
}

# Code Demand Agent Configuration
CODE_DEMAND_AGENT_CONFIG = {
    # Threshold for "Show Code" button clicks
    "code_request_threshold": 3,
    "code_request_window_seconds": 30,
    
    # Urgency levels based on frequency
    "urgency_levels": {
        "low": {"min": 3, "max": 4},      # 3-4 clicks
        "medium": {"min": 5, "max": 6},   # 5-6 clicks
        "high": {"min": 7, "max": 999},   # 7+ clicks
    },
    
    # Alert cooldown
    "alert_cooldown_seconds": 45,
    
    # AI analysis interval
    "ai_analysis_interval_seconds": 90,  # Every 90 seconds to reduce API calls
}

# Sentiment Agent Configuration
SENTIMENT_AGENT_CONFIG = {
    # Minimum questions to analyze - keep at 1 but analysis is rate-limited
    "min_questions_for_analysis": 2,  # Back to 2 to batch questions
    
    # Analysis interval - INCREASED to avoid rate limits
    "analysis_interval_seconds": 30,  # Check every 30 seconds, but rate limit enforced
    
    # Sentiment categories
    "sentiment_categories": [
        "interested",
        "confused",
        "frustrated",
        "excited",
        "neutral"
    ],
    
    # Trend tracking window (in minutes)
    "trend_window_minutes": 10,
    
    # Alert on negative sentiment threshold
    "negative_sentiment_threshold": 0.6,  # 60% negative
}

# Gemini API Configuration
GEMINI_CONFIG = {
    # Model to use (gemini-2.5-flash is available on free tier)
    "model": "gemini-2.5-flash",
    
    # Generation parameters
    "temperature": 0.7,
    "max_tokens": 1000,
    
    # Rate limiting (requests per minute)
    "rate_limit": 15,  # Free tier limit for gemini-flash
}