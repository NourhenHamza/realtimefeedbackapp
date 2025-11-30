"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ModernLandingPage() {
  const [hoveredCard, setHoveredCard] = useState<"audience" | "presenter" | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
   
    const storedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    const shouldBeDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark)
    setIsDarkMode(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const DarkModeToggle = () => (
    <button
      onClick={toggleDarkMode}
      className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-gray-200 dark:border-gray-700"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      <DarkModeToggle />
      
      {/* Background gradient circles - same as audience page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-40 animate-blob" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full opacity-40 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-8 md:mb-8">
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
                  <div className="text-6xl md:text-7xl mb-6 group-hover:scale-110 transition-all duration-300">💥</div>
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

                  <button className="w-full bg-gradient-to-r from-cyan-100 to-blue-400 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
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

                  <button className="w-full bg-gradient-to-r from-purple-200 to-pink-400 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Start Presenting →
                  </button>
                </div>
              </div>
            </a>
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
      `}</style>
    </main>
  )
}