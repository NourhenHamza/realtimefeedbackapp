"""
WebSocket Connection Manager
Handles real-time connections between backend and presenter dashboards.
Supports multiple concurrent connections with graceful error handling.
"""

import logging
import json
import asyncio
from typing import List, Dict, Set, Optional
from datetime import datetime
from fastapi import WebSocket, WebSocketDisconnect

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ConnectionManager:
    """
    Manages WebSocket connections for real-time communication with presenter dashboards.
    
    Features:
    - Multiple concurrent connections
    - Session-based connection tracking
    - Graceful error handling
    - Automatic cleanup of dead connections
    - Broadcast to all or specific sessions
    """
    
    def __init__(self):
        # List of all active WebSocket connections
        self.active_connections: List[WebSocket] = []
        
        # Map session_id to list of WebSocket connections (multiple presenters per session)
        self.session_connections: Dict[str, List[WebSocket]] = {}
        
        # Map WebSocket to session_id for quick lookup
        self.connection_sessions: Dict[WebSocket, str] = {}
        
        # Track connection metadata
        self.connection_metadata: Dict[WebSocket, Dict] = {}
        
        logger.info("ConnectionManager initialized")
    
    async def connect(self, websocket: WebSocket, session_id: str) -> bool:
        """
        Accept and register a new WebSocket connection.
        
        Args:
            websocket: The WebSocket connection to register
            session_id: The session ID this connection belongs to
            
        Returns:
            bool: True if connection successful, False otherwise
        """
        try:
            # Accept the WebSocket connection
            await websocket.accept()
            
            # Add to active connections
            self.active_connections.append(websocket)
            
            # Add to session-specific connections
            if session_id not in self.session_connections:
                self.session_connections[session_id] = []
            self.session_connections[session_id].append(websocket)
            
            # Map connection to session
            self.connection_sessions[websocket] = session_id
            
            # Store metadata
            self.connection_metadata[websocket] = {
                "session_id": session_id,
                "connected_at": datetime.utcnow().isoformat(),
                "messages_sent": 0
            }
            
            logger.info(
                f"New WebSocket connection established for session '{session_id}'. "
                f"Total connections: {len(self.active_connections)}"
            )
            
            # Send welcome message
            await self.send_personal_message(
                {
                    "type": "connection",
                    "status": "connected",
                    "session_id": session_id,
                    "timestamp": datetime.utcnow().isoformat(),
                    "message": "Successfully connected to presenter dashboard"
                },
                websocket
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Error connecting WebSocket: {str(e)}")
            return False
    
    async def disconnect(self, websocket: WebSocket) -> None:
        """
        Remove a WebSocket connection and clean up associated data.
        
        Args:
            websocket: The WebSocket connection to remove
        """
        try:
            # Get session_id before cleanup
            session_id = self.connection_sessions.get(websocket, "unknown")
            
            # Remove from active connections
            if websocket in self.active_connections:
                self.active_connections.remove(websocket)
            
            # Remove from session connections
            if session_id in self.session_connections:
                if websocket in self.session_connections[session_id]:
                    self.session_connections[session_id].remove(websocket)
                
                # Clean up empty session lists
                if len(self.session_connections[session_id]) == 0:
                    del self.session_connections[session_id]
            
            # Remove from connection-session mapping
            if websocket in self.connection_sessions:
                del self.connection_sessions[websocket]
            
            # Remove metadata
            if websocket in self.connection_metadata:
                del self.connection_metadata[websocket]
            
            logger.info(
                f"WebSocket disconnected for session '{session_id}'. "
                f"Remaining connections: {len(self.active_connections)}"
            )
            
        except Exception as e:
            logger.error(f"Error disconnecting WebSocket: {str(e)}")
    
    async def send_personal_message(self, message: dict, websocket: WebSocket) -> bool:
        """
        Send a message to a specific WebSocket connection.
        
        Args:
            message: Dictionary to send as JSON
            websocket: Target WebSocket connection
            
        Returns:
            bool: True if sent successfully, False otherwise
        """
        try:
            await websocket.send_json(message)
            
            # Update metadata
            if websocket in self.connection_metadata:
                self.connection_metadata[websocket]["messages_sent"] += 1
            
            return True
            
        except WebSocketDisconnect:
            logger.warning("WebSocket disconnected while sending personal message")
            await self.disconnect(websocket)
            return False
            
        except Exception as e:
            logger.error(f"Error sending personal message: {str(e)}")
            await self.disconnect(websocket)
            return False
    
    async def broadcast(self, message: dict, exclude: Optional[WebSocket] = None) -> int:
        """
        Broadcast a message to all connected WebSockets.
        
        Args:
            message: Dictionary to send as JSON
            exclude: Optional WebSocket to exclude from broadcast
            
        Returns:
            int: Number of successful deliveries
        """
        successful_sends = 0
        failed_connections = []
        
        # Add timestamp if not present
        if "timestamp" not in message:
            message["timestamp"] = datetime.utcnow().isoformat()
        
        for connection in self.active_connections:
            if connection == exclude:
                continue
            
            try:
                await connection.send_json(message)
                successful_sends += 1
                
                # Update metadata
                if connection in self.connection_metadata:
                    self.connection_metadata[connection]["messages_sent"] += 1
                    
            except WebSocketDisconnect:
                logger.warning("WebSocket disconnected during broadcast")
                failed_connections.append(connection)
                
            except Exception as e:
                logger.error(f"Error broadcasting to WebSocket: {str(e)}")
                failed_connections.append(connection)
        
        # Clean up failed connections
        for failed_conn in failed_connections:
            await self.disconnect(failed_conn)
        
        if failed_connections:
            logger.info(f"Cleaned up {len(failed_connections)} failed connections during broadcast")
        
        logger.debug(f"Broadcast message to {successful_sends} connections")
        return successful_sends
    
    async def broadcast_to_session(self, message: dict, session_id: str) -> int:
        """
        Broadcast a message to all connections in a specific session.
        
        Args:
            message: Dictionary to send as JSON
            session_id: Target session ID
            
        Returns:
            int: Number of successful deliveries
        """
        if session_id not in self.session_connections:
            logger.warning(f"No connections found for session '{session_id}'")
            return 0
        
        successful_sends = 0
        failed_connections = []
        
        # Add timestamp if not present
        if "timestamp" not in message:
            message["timestamp"] = datetime.utcnow().isoformat()
        
        # Add session_id to message
        message["session_id"] = session_id
        
        for connection in self.session_connections[session_id]:
            try:
                await connection.send_json(message)
                successful_sends += 1
                
                # Update metadata
                if connection in self.connection_metadata:
                    self.connection_metadata[connection]["messages_sent"] += 1
                    
            except WebSocketDisconnect:
                logger.warning(f"WebSocket disconnected during session broadcast to '{session_id}'")
                failed_connections.append(connection)
                
            except Exception as e:
                logger.error(f"Error broadcasting to session '{session_id}': {str(e)}")
                failed_connections.append(connection)
        
        # Clean up failed connections
        for failed_conn in failed_connections:
            await self.disconnect(failed_conn)
        
        logger.debug(f"Broadcast to session '{session_id}': {successful_sends} successful")
        return successful_sends
    
    def get_active_sessions(self) -> List[str]:
        """
        Get list of all active session IDs.
        
        Returns:
            List of session IDs
        """
        return list(self.session_connections.keys())
    
    def get_connection_count(self, session_id: Optional[str] = None) -> int:
        """
        Get number of active connections.
        
        Args:
            session_id: Optional - get count for specific session
            
        Returns:
            Number of connections
        """
        if session_id:
            return len(self.session_connections.get(session_id, []))
        return len(self.active_connections)
    
    def get_session_info(self, session_id: str) -> Dict:
        """
        Get information about a specific session.
        
        Args:
            session_id: Session ID to query
            
        Returns:
            Dictionary with session information
        """
        connections = self.session_connections.get(session_id, [])
        
        return {
            "session_id": session_id,
            "active": session_id in self.session_connections,
            "connection_count": len(connections),
            "connections": [
                self.connection_metadata.get(conn, {})
                for conn in connections
            ]
        }
    
    async def send_keepalive(self, websocket: WebSocket) -> bool:
        """
        Send a keepalive ping to a WebSocket connection.
        
        Args:
            websocket: Target WebSocket
            
        Returns:
            bool: True if successful
        """
        try:
            await websocket.send_json({
                "type": "ping",
                "timestamp": datetime.utcnow().isoformat()
            })
            return True
        except Exception as e:
            logger.error(f"Keepalive failed: {str(e)}")
            await self.disconnect(websocket)
            return False
    
    async def broadcast_keepalive(self) -> int:
        """
        Send keepalive pings to all active connections.
        
        Returns:
            Number of successful pings
        """
        successful = 0
        for connection in self.active_connections[:]:  # Copy list to avoid modification during iteration
            if await self.send_keepalive(connection):
                successful += 1
        return successful
    
    def get_stats(self) -> Dict:
        """
        Get statistics about the connection manager.
        
        Returns:
            Dictionary with connection statistics
        """
        total_messages = sum(
            meta.get("messages_sent", 0)
            for meta in self.connection_metadata.values()
        )
        
        return {
            "total_connections": len(self.active_connections),
            "active_sessions": len(self.session_connections),
            "session_details": {
                session_id: len(connections)
                for session_id, connections in self.session_connections.items()
            },
            "total_messages_sent": total_messages,
            "timestamp": datetime.utcnow().isoformat()
        }


# Global instance for use across the application
manager = ConnectionManager()


# Optional: Periodic keepalive task
async def keepalive_task(manager: ConnectionManager, interval: int = 30):
    """
    Background task to send periodic keepalive pings.
    
    Args:
        manager: ConnectionManager instance
        interval: Seconds between keepalive pings
    """
    while True:
        await asyncio.sleep(interval)
        if manager.active_connections:
            successful = await manager.broadcast_keepalive()
            logger.debug(f"Keepalive sent to {successful} connections")