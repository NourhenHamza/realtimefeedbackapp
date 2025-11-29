'use client';

import AIInsightsPanel from '@/components/AIInsightsPanel';
import AlertNotification from '@/components/AlertNotification';
import CodeDemandIndicator from '@/components/CodeDemandIndicator';
import ConnectionStatus from '@/components/ConnectionStatus';
import QuestionFeed from '@/components/QuestionFeed';
import ReactionDisplay from '@/components/ReactionDisplay';
import ReactionHeatmap from '@/components/ReactionHeatmap';
import SentimentMonitor from '@/components/SentimentMonitor';
import { useWebSocket } from '@/hooks/useWebSocket';
import { api, Question, Reaction } from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';

interface AIAlert {
  type: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: string;
  ai_analysis?: any;
  reaction_summary?: Record<string, number>;
  themes?: any[];
  data?: any;
}

// Fonction pour générer un ID de session aléatoire
function generateSessionId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function PresenterPage() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [aiAlerts, setAiAlerts] = useState<AIAlert[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleWebSocketMessage = useCallback((data: any) => {
    console.log('WebSocket message received:', data);

    if (data.type === 'reaction') {
      setReactions((prev) => [data.data, ...prev].slice(0, 100));
    } else if (data.type === 'question') {
      setQuestions((prev) => [data.data, ...prev]);
    } else if (data.type === 'ai_alert') {
      setAiAlerts((prev) => [data.data, ...prev].slice(0, 20));
      
      if (data.data.severity === 'critical' && 'Notification' in window) {
        if (Notification.permission === 'granted') {
          new Notification(data.data.title, {
            body: data.data.message,
            icon: '/icon.png',
          });
        }
      }
    }
  }, []);

  const { status, reconnect, sendMessage, disconnect } = useWebSocket({
    url: isSessionActive ? api.getWebSocketUrl(sessionId) : '',
    onMessage: handleWebSocketMessage,
  });

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

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

  useEffect(() => {
    const storedSessionId = localStorage.getItem('presenter_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setIsSessionActive(true);
    }
  }, []);

  const handleCreateSession = async () => {
    setIsCreating(true);
    
    // Générer un nouvel ID de session
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);

    try {
      const response = await fetch('http://localhost:8000/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: newSessionId }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('presenter_session_id', newSessionId);
        setIsSessionActive(true);
      } else {
        alert(`Failed to create session: ${result.detail || 'Unknown error'}`);
        setSessionId('');
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Is the backend running?');
      setSessionId('');
    } finally {
      setIsCreating(false);
    }
  };

  const handleEndSession = async () => {
    if (!window.confirm('Are you sure you want to end this session?')) return;

    try {
      sendMessage({ type: 'end_session' });
      await new Promise((resolve) => setTimeout(resolve, 100));
      disconnect();

      await fetch(`http://localhost:8000/api/session/${sessionId}`, { method: 'DELETE' });

      localStorage.removeItem('presenter_session_id');
      setSessionId('');
      setIsSessionActive(false);
      setReactions([]);
      setQuestions([]);
      setAiAlerts([]);
    } catch (error) {
      console.error('Error ending session:', error);
      localStorage.removeItem('presenter_session_id');
      setSessionId('');
      setIsSessionActive(false);
      setReactions([]);
      setQuestions([]);
      setAiAlerts([]);
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
              Create a new session with AI insights
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                <span className="font-semibold">✨ Auto-generated Session ID</span>
                <br />
                <span className="text-xs">A unique ID will be created for your session</span>
              </p>
            </div>

            <button
              onClick={handleCreateSession}
              disabled={isCreating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Session...
                </span>
              ) : (
                '🚀 Create New Session'
              )}
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 The session ID will be automatically generated and displayed
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                Presenter Dashboard
                <span className="text-lg">🤖</span>
              </h1>
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Session ID: <span className="font-mono font-semibold text-lg text-blue-600 dark:text-blue-400">{sessionId}</span>
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sessionId);
                    alert('Session ID copied to clipboard! Share it with your audience.');
                  }}
                  className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-md transition-colors font-medium"
                >
                  📋 Copy ID
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Share this ID with your audience to join the session
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <AlertNotification alerts={aiAlerts} enableSound={true} />
              <ConnectionStatus status={status} onReconnect={reconnect} />
              <button
                onClick={handleEndSession}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                End Session
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <CodeDemandIndicator alerts={aiAlerts} reactions={reactions} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <SentimentMonitor alerts={aiAlerts} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <AIInsightsPanel alerts={aiAlerts} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <ReactionHeatmap reactions={reactions} timeWindowMinutes={5} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <ReactionDisplay reactions={reactions} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <QuestionFeed questions={questions} />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>🔴 Live • Real-time updates • AI-powered insights • Sound notifications</p>
        </div>
      </div>
    </main>
  );
}