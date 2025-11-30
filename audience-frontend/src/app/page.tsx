"use client"

import Link from "next/link"
import { useState } from "react"

export default function ModernLandingPage() {
  const [hoveredCard, setHoveredCard] = useState<"audience" | "presenter" | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* Background gradient orbs - now with yellow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Live Feedback Platform
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-4">
                Connect with your audience in real-time with instant reactions and questions
              </p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Modern, intuitive, and powerful feedback experience
              </p>
            </div>
          </div>

          {/* Choice Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-16">
            {/* Audience Card */}
            <Link href="/audience">
              <div
                onMouseEnter={() => setHoveredCard("audience")}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  bg-white dark:bg-gray-800/50 
                  backdrop-blur-xl
                  rounded-3xl shadow-xl hover:shadow-2xl
                  p-8 md:p-10
                  cursor-pointer transform transition-all duration-300
                  ${hoveredCard === "audience" ? "scale-105" : "scale-100"}
                  border-2 border-gray-200 dark:border-gray-700
                  ${hoveredCard === "audience" ? "border-cyan-500 dark:border-cyan-400" : "border-transparent"}
                  group
                `}
              >
                <div className="text-center">
                  <div className="text-6xl md:text-7xl mb-6 group-hover:scale-110 transition-all duration-300">👥</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Join as Audience
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">Participate and share your real-time feedback</p>

                  {/* Features */}
                  <div className="space-y-3 text-left mb-10">
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-500 text-xl flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Send reactions with beautiful hover animations
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-500 text-xl flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Ask questions anonymously or identified
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-cyan-500 text-xl flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Seamless mobile and desktop experience
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Join Session →
                  </button>
                </div>
              </div>
            </Link>

            {/* Presenter Card */}
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
              <div
                onMouseEnter={() => setHoveredCard("presenter")}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  bg-white dark:bg-gray-800/50
                  backdrop-blur-xl
                  rounded-3xl shadow-xl hover:shadow-2xl
                  p-8 md:p-10
                  cursor-pointer transform transition-all duration-300
                  ${hoveredCard === "presenter" ? "scale-105" : "scale-100"}
                  border-2 border-gray-200 dark:border-gray-700
                  ${hoveredCard === "presenter" ? "border-purple-500 dark:border-purple-400" : "border-transparent"}
                  group
                `}
              >
                <div className="text-center">
                  <div className="text-6xl md:text-7xl mb-6 group-hover:scale-110 transition-all duration-300">🎤</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Create Session</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">Present with real-time audience insights</p>

                  {/* Features */}
                  <div className="space-y-3 text-left mb-10">
                    <div className="flex items-start gap-3">
                      <span className="text-purple-500 text-xl flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Live reaction heatmaps and analytics
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-500 text-xl flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        AI-powered insights and sentiment analysis
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-500 text-xl flex-shrink-0">✓</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">Comprehensive session summaries</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Presenting →
                  </button>
                </div>
              </div>
            </a>
          </div>

          {/* Features Section */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto mb-16 border border-gray-200 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">✨ Why Choose Us</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-all duration-300">⚡</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Real-Time</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Instant feedback via WebSocket</p>
              </div>
              <div className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-all duration-300">🎨</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Modern Design</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Beautiful, responsive interface</p>
              </div>
              <div className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-all duration-300">📊</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Detailed session insights</p>
              </div>
              <div className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-all duration-300">🌙</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dark Mode</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Easy on the eyes anytime</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>Made with 💜 for better presentations</p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </main>
  )
}
