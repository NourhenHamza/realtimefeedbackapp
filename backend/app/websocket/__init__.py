"""
WebSocket package for real-time communication.
"""

from .manager import ConnectionManager, manager, keepalive_task

__all__ = ["ConnectionManager", "manager", "keepalive_task"]