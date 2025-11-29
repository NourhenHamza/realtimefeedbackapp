'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<'audience' | 'presenter' | null>(null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6 animate-bounce">🎤</div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Real-Time Feedback
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Interactive Presentation Platform with AI Insights
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Get instant feedback from your audience or participate in live sessions
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Audience Card - Links to /audience route */}
          <Link href="/audience">
            <div
              onMouseEnter={() => setHoveredCard('audience')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border-4 ${
                hoveredCard === 'audience'
                  ? 'border-blue-500 dark:border-blue-400'
                  : 'border-transparent'
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-6">👥</div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Join as Audience
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Participate in a live presentation session
                </p>
                
                {/* Features */}
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Send real-time reactions (Speed up, Slow down, Show code, I'm lost)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Ask questions anonymously or with your name
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Simple and intuitive interface
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    💡 You'll need a <strong>Session ID</strong> from the presenter
                  </p>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg hover:shadow-xl">
                  Join Session →
                </button>
              </div>
            </div>
          </Link>

          {/* Presenter Card - Links to localhost:3001 (presenter frontend) */}
          <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
            <div
              onMouseEnter={() => setHoveredCard('presenter')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border-4 ${
                hoveredCard === 'presenter'
                  ? 'border-purple-500 dark:border-purple-400'
                  : 'border-transparent'
              }`}
            >
              <div className="text-center">
                <div className="text-6xl mb-6">🎤</div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Create Session
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Start presenting with AI-powered insights
                </p>
                
                {/* Features */}
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Real-time audience reaction heatmaps
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      AI-powered pacing alerts and sentiment analysis
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Question grouping and comprehensive session summaries
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mb-6">
                  <p className="text-xs text-purple-800 dark:text-purple-200">
                    🤖 Powered by <strong>AI insights</strong> - Get instant feedback
                  </p>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg hover:shadow-xl">
                  Start Presenting →
                </button>
              </div>
            </div>
          </a>
        </div>

        {/* Features Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ Key Features
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🔴</div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Real-Time
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Instant feedback via WebSocket
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  AI Insights
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Smart analysis with Gemini
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Analytics
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Detailed session summaries
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                  Easy to Use
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  No setup required
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Made with ❤️ for better presentations</p>
        </div>
      </div>
    </main>
  );
}
