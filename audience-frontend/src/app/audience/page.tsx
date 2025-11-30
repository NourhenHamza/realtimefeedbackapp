"use client"

import QuestionInput from "@/components/QuestionInput"
import ModernReactionButtons from "@/components/ReactionButtons"
import { getUserName, setUserName } from "@/lib/userUtils"
import type React from "react"
import { useEffect, useState } from "react"

export default function AudiencePage() {
  const [sessionId, setSessionId] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [isSessionSet, setIsSessionSet] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState<string>("")
  const [step, setStep] = useState<"session" | "name">("session")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check system preference and stored preference
    const storedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    const shouldBeDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark)
    setIsDarkMode(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    const storedSessionId = localStorage.getItem("audience_session_id")
    const storedName = getUserName()

    if (storedSessionId && storedName) {
      setSessionId(storedSessionId)
      setName(storedName)
      validateAndJoinSession(storedSessionId)
    } else if (storedSessionId) {
      setSessionId(storedSessionId)
      setStep("name")
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

  const validateAndJoinSession = async (sessionIdToValidate: string) => {
    setIsValidating(true)
    setError("")

    try {
      const response = await fetch(`http://localhost:8000/api/session/${sessionIdToValidate}/status`)
      const result = await response.json()

      if (result.active) {
        setIsSessionSet(true)
      } else {
        setError("Session not found or has ended")
        localStorage.removeItem("audience_session_id")
        setIsSessionSet(false)
        setStep("session")
      }
    } catch (err) {
      setError("Failed to connect to server. Is the backend running?")
      setIsSessionSet(false)
      setStep("session")
    } finally {
      setIsValidating(false)
    }
  }

  const handleSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sessionId.trim()) {
      setIsValidating(true)
      setError("")

      try {
        const response = await fetch(`http://localhost:8000/api/session/${sessionId.trim()}/status`)
        const result = await response.json()

        if (result.active) {
          localStorage.setItem("audience_session_id", sessionId)
          setStep("name")
        } else {
          setError("Session not found or has ended")
        }
      } catch (err) {
        setError("Failed to connect to server. Is the backend running?")
      } finally {
        setIsValidating(false)
      }
    }
  }

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      setUserName(name.trim())
      await validateAndJoinSession(sessionId)
    }
  }

  const handleLeaveSession = () => {
    localStorage.removeItem("audience_session_id")
    setSessionId("")
    setName("")
    setIsSessionSet(false)
    setError("")
    setStep("session")
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

  if (step === "session" && !isSessionSet) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-4">
        <DarkModeToggle />
        
        {/* Background gradient circles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-40 animate-blob" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full opacity-40 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full opacity-40 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full backdrop-blur-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👥</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
              Join Session
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Enter the session ID provided by your presenter</p>
          </div>

          <form onSubmit={handleSessionSubmit} className="space-y-6">
            <div>
              <label htmlFor="sessionId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Session ID
              </label>
              <input
                type="text"
                id="sessionId"
                value={sessionId}
                onChange={(e) => {
                  setSessionId(e.target.value)
                  setError("")
                }}
                placeholder="e.g., session-123"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={isValidating}
              />
              {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">⚠️ {error}</p>}
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? "Validating..." : "Continue"}
            </button>
          </form>
        </div>

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

  if (step === "name" && !isSessionSet) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-4">
        <DarkModeToggle />
        
        {/* Background gradient circles */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-40 animate-blob" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full opacity-40 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full opacity-40 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full backdrop-blur-xl border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✏️</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
              Enter Your Name
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Let the presenter know who you are</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Session: <span className="font-mono font-semibold">{sessionId}</span>
            </p>
          </div>

          <form onSubmit={handleNameSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
                disabled={isValidating}
                maxLength={50}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("session")
                  setSessionId("")
                  localStorage.removeItem("audience_session_id")
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isValidating}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? "Joining..." : "Join Session"}
              </button>
            </div>
          </form>
        </div>

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-8">
      <DarkModeToggle />
      
      {/* Background gradient circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-40 animate-blob" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full opacity-40 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 mb-8 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                👋 Hello, {name}!
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Welcome to the session! We're glad to have you here ✨
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Session: <span className="font-mono font-semibold">{sessionId}</span>
              </p>
            </div>
            <button
              onClick={handleLeaveSession}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              👋 Leave Session
            </button>
          </div>
        </div>

        {/* Reactions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
          <ModernReactionButtons sessionId={sessionId} userName={name} />
        </div>

        {/* Questions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
          <QuestionInput sessionId={sessionId} userName={name} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
          <p>Your feedback helps improve the presentation in real-time ✨</p>
        </div>
      </div>

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