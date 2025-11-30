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

  if (step === "session" && !isSessionSet) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full backdrop-blur-xl border border-gray-200 dark:border-gray-700">
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
      </main>
    )
  }

  if (step === "name" && !isSessionSet) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full backdrop-blur-xl border border-gray-200 dark:border-gray-700">
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
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 mb-8 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">
                Audience Feedback
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Session: <span className="font-mono font-semibold">{sessionId}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Name: <span className="font-semibold">{name}</span>
              </p>
            </div>
            <button
              onClick={handleLeaveSession}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Leave
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
    </main>
  )
}
