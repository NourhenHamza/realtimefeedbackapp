"""
Configuration for AI Agents - Optimized with 6 Enhanced Sentiment Categories
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

# Sentiment Agent Configuration - ENHANCED WITH 6 CATEGORIES
SENTIMENT_AGENT_CONFIG = {
    # Minimum questions to analyze - batch questions for efficiency
    "min_questions_for_analysis": 2,  # Analyze in batches of 2+
    
    # Analysis interval - INCREASED to avoid rate limits
    "analysis_interval_seconds": 30,  # Check every 30 seconds, but rate limit enforced
    
    # ENHANCED: 7 Sentiment categories for better pacing detection
    "sentiment_categories": [
        "overwhelmed",  # Pacing too fast, can't keep up (CRITICAL - SLOW DOWN)
        "bored",        # NEW: Pacing too slow, audience wants faster (WARNING - SPEED UP)
        "frustrated",   # Struggling with content (CRITICAL)
        "confused",     # Need clarification (WARNING)
        "neutral",      # Neutral engagement (INFO)
        "interested",   # Engaged and curious (SUCCESS)
        "excited"       # Highly enthusiastic (SUCCESS)
    ],
    
    # Trend tracking window (in minutes)
    "trend_window_minutes": 10,
    
    # Alert on negative sentiment threshold
    "negative_sentiment_threshold": 0.6,  # 60% negative triggers warning
    
    # Minimum time between analyses to enforce rate limiting (seconds)
    "min_analysis_interval": 15,  # Minimum 15 seconds between AI calls
}

# Session Summary Agent Configuration
SESSION_SUMMARY_CONFIG = {
    # Enable/disable summary generation
    "enabled": True,
    
    # Save summaries to JSON files
    "save_to_file": True,
    "summary_directory": "./session_summaries/",
    
    # Include in summary
    "include_detailed_analysis": True,
    "include_recommendations": True,
    "max_recommendations": 5,
    
    # Top themes to show
    "max_themes": 5,
    
    # Minimum session duration (in minutes) to generate full summary
    "min_session_duration_minutes": 5,
}

# Gemini API Configuration
GEMINI_CONFIG = {
    # Model to use (gemini-2.0-flash-exp for latest features)
    "model": "gemini-2.0-flash-exp",
    
    # Generation parameters
    "temperature": 0.7,
    "max_tokens": 1000,
    
    # Rate limiting (requests per minute)
    "rate_limit": 15,  # Free tier limit for gemini-flash
    
    # Retry configuration
    "max_retries": 3,
    "retry_delay_seconds": 2,
}

# Pattern matching rules for enhanced sentiment detection
SENTIMENT_PATTERNS = {
    "overwhelmed": [
        # Requests to slow down (audience can't keep up - TOO FAST)
        r'\b(too fast|slow down|slower|going too quick|can\'t keep up|cannot keep up)\b',
        r'\b(please slow|pls slow|plz slow|way too fast|you\'re going too fast)\b',
        r'\b(losing me|lost me|you lost me|i\'m losing you)\b',
        r'\bslow\b',  # Just "slow" as keyword
    ],
    "bored": [
        # NEW: Audience is bored - TOO SLOW (opposite of overwhelmed)
        r'\b(speed up|faster|too slow|going too slow|pick up the pace)\b',
        r'\b(please speed|pls speed|plz speed|can you speed|you are so slow)\b',
        r'\b(boring|bored|this is slow|move faster)\b',
        r'\b(hurry|hurry up|speed this up)\b',
    ],
    "frustrated": [
        r'\b(frustrated|stuck|problem|issue|not working|doesn\'t work|broken)\b',
        r'\b(i don\'t get|don\'t understand this|makes no sense)\b',
        r'\b(struggling|having trouble|can\'t figure)\b',
    ],
    "confused": [
        r'\b(confused|lost|unclear|don\'t understand|dont understand)\b',
        r'\b(what do you mean|what does|can you explain|help)\b',
        r'\b(not sure|unsure|unclear|clarify|clarification)\b',
    ],
    "interested": [
        r'\b(how do|how can|what if|could you|can you show)\b',
        r'\b(interesting|curious|wondering|question about)\b',
        r'\b(tell me more|more about|elaborate|details)\b',
    ],
    "excited": [
        r'\b(amazing|awesome|great|excellent|love this|this is cool)\b',
        r'\b(thank you|thanks|appreciated|wow|incredible)\b',
        r'\b(brilliant|fantastic|wonderful)\b',
    ],
}