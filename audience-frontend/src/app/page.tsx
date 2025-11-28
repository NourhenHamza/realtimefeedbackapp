'use client';

import QuestionInput from '@/components/QuestionInput';
import ReactionButtons from '@/components/ReactionButtons';
import React, { useEffect, useState } from 'react';

export default function AudiencePage() {
  const [sessionId, setSessionId] = useState<string>('');
  const [isSessionSet, setIsSessionSet] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Try to get session ID from localStorage
    const storedSessionId = localStorage.getItem('audience_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      validateAndJoinSession(storedSessionId);
    }
  }, []);

  const validateAndJoinSession = async (sessionIdToValidate: string) => {
    setIsValidating(true);
    setError('');

    try {
      // Check if session is active
      const response = await fetch(
        `http://localhost:8000/api/session/${sessionIdToValidate}/status`
      );
      const result = await response.json();

      if (result.active) {
        setIsSessionSet(true);
      } else {
        setError('Session not found or has ended');
        localStorage.removeItem('audience_session_id');
        setIsSessionSet(false);
      }
    } catch (err) {
      setError('Failed to connect to server. Is the backend running?');
      setIsSessionSet(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionId.trim()) {
      await validateAndJoinSession(sessionId.trim());
      if (!error) {
        localStorage.setItem('audience_session_id', sessionId);
      }
    }
  };

  const handleLeaveSession = () => {
    localStorage.removeItem('audience_session_id');
    setSessionId('');
    setIsSessionSet(false);
    setError('');
  };

  if (!isSessionSet) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Join Session
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Enter the session ID provided by your presenter
            </p>
          </div>

          <form onSubmit={handleSessionSubmit} className="space-y-6">
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
                onChange={(e) => {
                  setSessionId(e.target.value);
                  setError('');
                }}
                placeholder="e.g., session-123"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={isValidating}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  ⚠️ {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Validating...
                </span>
              ) : (
                'Join Session'
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                Audience Feedback
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Session: <span className="font-mono font-semibold">{sessionId}</span>
              </p>
            </div>
            <button
              onClick={handleLeaveSession}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Leave
            </button>
          </div>
        </div>

        {/* Reactions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <ReactionButtons sessionId={sessionId} />
        </div>

        {/* Questions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <QuestionInput sessionId={sessionId} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
          <p>Your feedback helps improve the presentation in real-time</p>
        </div>
      </div>
    </main>
  );
}