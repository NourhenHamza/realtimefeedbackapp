"""
Configuration for AI Agents
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
    
    # How often to check for new questions to group (increased to reduce API calls)
    "grouping_interval_seconds": 90,  # 1.5 minutes to reduce rate limit hits
    
    # Maximum number of themes to identify
    "max_themes": 5,
    
    # Maximum questions to analyze at once
    "max_questions_per_group": 20,
}

# Gemini API Configuration
GEMINI_CONFIG = {
    # Model to use (gemini-1.5-flash is available on free tier)
    "model": "gemini-2.5-flash",
    
    # Generation parameters
    "temperature": 0.7,
    "max_tokens": 1000,
    
    # Rate limiting (requests per minute)
    "rate_limit": 15,  # Free tier limit for gemini-1.5-flash
}