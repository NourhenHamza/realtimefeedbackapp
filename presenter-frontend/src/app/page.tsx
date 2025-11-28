'use client';

import ConnectionStatus from '@/components/ConnectionStatus';
import QuestionFeed from '@/components/QuestionFeed';
import ReactionDisplay from '@/components/ReactionDisplay';
import { useWebSocket } from '@/hooks/useWebSocket';
import { api, Question, Reaction } from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';

export default function PresenterPage() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback((data: any) => {
    console.log('WebSocket message received:', data);

    if (data.type === 'reaction') {
      setReactions((prev) => [data.data, ...prev].slice(0, 100));
    } else if (data.type === 'question') {
      setQuestions((prev) => [data.data, ...prev]);
    }
  }, []);

  // WebSocket connection
  const { status, reconnect, sendMessage, disconnect } = useWebSocket({
    url: isSessionActive ? api.getWebSocketUrl(sessionId) : '',
    onMessage: handleWebSocketMessage,
  });

  // Load initial data when session starts
  useEffect(() => {
    if (isSessionActive && sessionId) {
      const loadInitialData = async () => {
        const [reactionsData, questionsData] = await Promise.all([
          api.getReactions(sessionId, 50),
          api.getQuestions(sessionId),
        ]);
        setReactions(reactionsData);
        setQuestions(questionsData);
      };

      loadInitialData();
    }
  }, [isSessionActive, sessionId]);

  // Session management from localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem('presenter_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setIsSessionActive(true);
    }
  }, []);

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionId.trim()) {
      try {
        // Create session on backend
        const response = await fetch('http://localhost:8000/api/session/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem('presenter_session_id', sessionId);
          setIsSessionActive(true);
        } else {
          alert(`Failed to create session: ${result.detail || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error creating session:', error);
        alert('Failed to create session. Is the backend running?');
      }
    }
  };

  const handleEndSession = async () => {
    if (!window.confirm('Are you sure you want to end this session? All data will be deleted.')) {
      return;
    }

    try {
      // Send end_session message via WebSocket first
      sendMessage({ type: 'end_session' });

      // Wait a bit for WebSocket message to be sent
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Disconnect WebSocket
      disconnect();

      // Call API to end the session
      const response = await fetch(`http://localhost:8000/api/session/${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        localStorage.removeItem('presenter_session_id');
        setSessionId('');
        setIsSessionActive(false);
        setReactions([]);
        setQuestions([]);
      } else {
        const result = await response.json();
        alert(`Failed to end session: ${result.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error ending session:', error);
      // Still cleanup locally even if API call fails
      localStorage.removeItem('presenter_session_id');
      setSessionId('');
      setIsSessionActive(false);
      setReactions([]);
      setQuestions([]);
    }
  };

  if (!isSessionActive) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎤</div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Presenter Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create a session to start
            </p>
          </div>

          <form onSubmit={handleStartSession} className="space-y-6">
            <div>
              <label
                htmlFor="sessionId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Session ID
              </label>
              <input
                type="text"
                id="sessionId"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                placeholder="e.g., session-123"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Share this ID with your audience to let them join
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg"
            >
              Start Session
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Presenter Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Session: <span className="font-mono font-semibold">{sessionId}</span>
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sessionId);
                    alert('Session ID copied to clipboard!');
                  }}
                  className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
                >
                  Copy ID
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ConnectionStatus status={status} onReconnect={reconnect} />
              <button
                onClick={handleEndSession}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                End Session
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reactions Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <ReactionDisplay reactions={reactions} />
          </div>

          {/* Questions Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <QuestionFeed questions={questions} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Updates appear in real-time • Audience joins at localhost:3000</p>
        </div>
      </div>
    </main>
  );
}