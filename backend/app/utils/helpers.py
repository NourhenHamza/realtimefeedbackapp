from datetime import datetime
from typing import Any, Dict
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)


def format_timestamp(dt: datetime) -> str:
    """
    Format a datetime object to ISO 8601 string.
    
    Args:
        dt: datetime object
        
    Returns:
        ISO formatted string
    """
    return dt.isoformat()


def parse_timestamp(timestamp_str: str) -> datetime:
    """
    Parse an ISO 8601 timestamp string.
    
    Args:
        timestamp_str: ISO formatted timestamp
        
    Returns:
        datetime object
    """
    return datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))


def create_event_message(event_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a standardized event message for WebSocket broadcasting.
    
    Args:
        event_type: Type of event (e.g., 'reaction', 'question')
        data: Event data
        
    Returns:
        Formatted message dictionary
    """
    return {
        "type": event_type,
        "data": data,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


def sanitize_session_id(session_id: str) -> str:
    """
    Sanitize session ID to prevent injection.
    
    Args:
        session_id: Raw session ID
        
    Returns:
        Sanitized session ID
    """
    # Remove any characters that aren't alphanumeric, dash, or underscore
    return ''.join(c for c in session_id if c.isalnum() or c in '-_')