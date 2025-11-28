# test_websocket_manager.py
import pytest
import asyncio
from fastapi import WebSocket
from app.websocket.manager import ConnectionManager
from unittest.mock import AsyncMock, MagicMock


@pytest.mark.asyncio
async def test_connect():
    """Test WebSocket connection."""
    manager = ConnectionManager()
    mock_ws = AsyncMock(spec=WebSocket)
    
    result = await manager.connect(mock_ws, "test-session")
    
    assert result == True
    assert len(manager.active_connections) == 1
    assert "test-session" in manager.session_connections


@pytest.mark.asyncio
async def test_disconnect():
    """Test WebSocket disconnection."""
    manager = ConnectionManager()
    mock_ws = AsyncMock(spec=WebSocket)
    
    await manager.connect(mock_ws, "test-session")
    await manager.disconnect(mock_ws)
    
    assert len(manager.active_connections) == 0
    assert "test-session" not in manager.session_connections


@pytest.mark.asyncio
async def test_broadcast():
    """Test broadcasting to all connections."""
    manager = ConnectionManager()
    mock_ws1 = AsyncMock(spec=WebSocket)
    mock_ws2 = AsyncMock(spec=WebSocket)
    
    await manager.connect(mock_ws1, "session1")
    await manager.connect(mock_ws2, "session2")
    
    result = await manager.broadcast({"type": "test", "data": "hello"})
    
    assert result == 2
    assert mock_ws1.send_json.called
    assert mock_ws2.send_json.called


@pytest.mark.asyncio
async def test_broadcast_to_session():
    """Test broadcasting to specific session."""
    manager = ConnectionManager()
    mock_ws1 = AsyncMock(spec=WebSocket)
    mock_ws2 = AsyncMock(spec=WebSocket)
    
    await manager.connect(mock_ws1, "session1")
    await manager.connect(mock_ws2, "session2")
    
    result = await manager.broadcast_to_session(
        {"type": "test"},
        "session1"
    )
    
    assert result == 1
    assert mock_ws1.send_json.called
    assert not mock_ws2.send_json.called


def test_get_stats():
    """Test getting connection statistics."""
    manager = ConnectionManager()
    stats = manager.get_stats()
    
    assert "total_connections" in stats
    assert "active_sessions" in stats
    assert stats["total_connections"] == 0