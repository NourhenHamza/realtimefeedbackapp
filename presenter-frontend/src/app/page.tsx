"use client"

import AIInsightsPanel from "@/components/AIInsightsPanel"
import AlertNotification from "@/components/AlertNotification"
import CodeDemandIndicator from "@/components/CodeDemandIndicator"
import ConnectionStatus from "@/components/ConnectionStatus"
import QuestionFeed from "@/components/QuestionFeed"
import ReactionDisplay from "@/components/ReactionDisplay"
import ReactionHeatmap from "@/components/ReactionHeatmap"
import SentimentMonitor from "@/components/SentimentMonitor"
import SessionSummaryModal from "@/components/SessionSummaryModal"
import { useWebSocket } from "@/hooks/useWebSocket"
import { api, type Question, type Reaction } from "@/lib/api"
import { useCallback, useEffect, useState } from "react"

interface AIAlert {
  type: string
  severity: "info" | "warning" | "critical" | "success"
  title: string
  message: string
  timestamp: string
  ai_analysis?: any
  reaction_summary?: Record<string, number>
  themes?: any[]
  data?: any
}

interface SessionSummary {
  session_id: string
  timestamp: string
  session_duration_minutes: number
  overall_summary: string
  reaction_analysis: any
  question_analysis: any
  pacing_analysis: any
  recommendations: any[]
  statistics: any
}

function generateSessionId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
  let result = ""
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default function PresenterPage() {
  const [sessionId, setSessionId] = useState<string>("")
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [aiAlerts, setAiAlerts] = useState<AIAlert[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [sessionSummary, setSessionSummary] = useState<SessionSummary | null>(null)
  const [isEndingSession, setIsEndingSession] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleWebSocketMessage = useCallback(
    (data: any) => {
      console.log("📨 WebSocket message received:", data.type)

      if (data.type === "initial_data") {
        console.log("📦 Loading initial data from server...")

        if (data.data.reactions) {
          setReactions(data.data.reactions)
          console.log(`✅ Loaded ${data.data.reactions.length} reactions`)
        }

        if (data.data.questions) {
          setQuestions(data.data.questions)
          console.log(`✅ Loaded ${data.data.questions.length} questions`)
        }

        if (data.data.alerts) {
          setAiAlerts(data.data.alerts)
          console.log(`✅ Loaded ${data.data.alerts.length} AI alerts from database`)
        }

        return
      }

      if (data.type === "reaction") {
        console.log("👍 New reaction:", data.data.reaction_type)
        setReactions((prev) => [data.data, ...prev].slice(0, 100))
      } else if (data.type === "question") {
        console.log("❓ New question:", data.data.question_text)
        setQuestions((prev) => [data.data, ...prev])
      } else if (data.type === "ai_alert") {
        console.log("🚨 New AI Alert:", data.data.title)
        setAiAlerts((prev) => [data.data, ...prev].slice(0, 20))

        if (data.data.severity === "critical" && "Notification" in window) {
          if (Notification.permission === "granted") {
            new Notification(data.data.title, {
              body: data.data.message,
              icon: "/icon.png",
            })
          }
        }
      } else if (data.type === "connection") {
        console.log("✅ WebSocket connected to session:", data.session_id)
      } else if (data.type === "session_ended") {
        console.log("🛑 Session ended by server")
        if (!isEndingSession) {
          alert("Session has been ended")
          localStorage.removeItem("presenter_session_id")
          setSessionId("")
          setIsSessionActive(false)
          setReactions([])
          setQuestions([])
          setAiAlerts([])
        }
      }
    },
    [isEndingSession],
  )

  const { status, reconnect, sendMessage, disconnect } = useWebSocket({
    url: isSessionActive && !isEndingSession ? api.getWebSocketUrl(sessionId) : "",
    onMessage: handleWebSocketMessage,
  })

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    const storedSessionId = localStorage.getItem("presenter_session_id")
    if (storedSessionId) {
      console.log("♻️ Restoring session from localStorage:", storedSessionId)
      setSessionId(storedSessionId)
      setIsSessionActive(true)
    }
    const savedDarkMode = localStorage.getItem("dashboard_dark_mode") === "true"
    setIsDarkMode(savedDarkMode)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newState = !prev
      localStorage.setItem("dashboard_dark_mode", String(newState))
      return newState
    })
  }

  const handleCreateSession = async () => {
    setIsCreating(true)

    const newSessionId = generateSessionId()
    setSessionId(newSessionId)

    try {
      const response = await fetch("http://localhost:8000/api/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: newSessionId }),
      })

      const result = await response.json()

      if (response.ok) {
        localStorage.setItem("presenter_session_id", newSessionId)
        setIsSessionActive(true)
        console.log("✅ Session created:", newSessionId)
      } else {
        alert(`Failed to create session: ${result.detail || "Unknown error"}`)
        setSessionId("")
      }
    } catch (error) {
      console.error("Error creating session:", error)
      alert("Failed to create session. Is the backend running?")
      setSessionId("")
    } finally {
      setIsCreating(false)
    }
  }

  const handleEndSession = async () => {
    if (!window.confirm("Are you sure you want to end this session? You will receive a detailed summary.")) return

    setIsEndingSession(true)

    try {
      sendMessage({ type: "end_session" })

      await new Promise((resolve) => setTimeout(resolve, 100))

      disconnect()

      console.log("📊 Requesting session summary...")
      const response = await fetch(`http://localhost:8000/api/session/${sessionId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const data = await response.json()
        console.log("📊 Received session summary:", data.summary)

        if (data.summary && !data.summary.error) {
          setSessionSummary(data.summary)
          console.log("✅ Summary modal should now display")
        } else {
          console.error("Summary generation failed:", data.summary?.error)
          alert("Session ended, but summary generation failed. Check console for details.")
          clearSessionState()
        }
      } else {
        console.error("Failed to end session")
        alert("Failed to end session properly")
        clearSessionState()
      }
    } catch (error) {
      console.error("Error ending session:", error)
      alert("Error ending session")
      clearSessionState()
    } finally {
      setIsEndingSession(false)
    }
  }

  const clearSessionState = useCallback(() => {
    localStorage.removeItem("presenter_session_id")
    setSessionId("")
    setIsSessionActive(false)
    setReactions([])
    setQuestions([])
    setAiAlerts([])
    console.log("✅ Session state cleared")
  }, [])

  const handleSummaryClose = useCallback(() => {
    setSessionSummary(null)
    clearSessionState()
  }, [clearSessionState])

  if (!isSessionActive) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-900 p-4 sm:p-6">
          {/* Background gradient orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🎤</div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
                    Presenter Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">Create a new session with AI insights</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 border-2 border-cyan-300 dark:border-cyan-700/50 rounded-xl p-4">
                    <p className="text-sm text-cyan-900 dark:text-cyan-200 text-center">
                      <span className="font-semibold">✨ Auto-generated Session ID</span>
                      <br />
                      <span className="text-xs">A unique ID will be created for your session</span>
                    </p>
                  </div>

                  <button
                    onClick={handleCreateSession}
                    disabled={isCreating}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating Session...
                      </span>
                    ) : (
                      "🚀 Create New Session"
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      💡 The session ID will be automatically generated and displayed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <SessionSummaryModal summary={sessionSummary} onClose={handleSummaryClose} />
      </div>
    )
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-900 transition-colors duration-300">
        {/* Background gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-300 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000" />
        </div>

        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-6 border border-white/20 dark:border-gray-700/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent mb-3 flex items-center gap-2">
                    Presenter Dashboard
                    <span className="text-2xl">🤖</span>
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Session ID:{" "}
                      <span className="font-mono font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                        {sessionId}
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(sessionId)
                        alert("Session ID copied to clipboard! Share it with your audience.")
                      }}
                      className="text-xs px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 hover:from-cyan-200 hover:to-blue-200 dark:hover:from-cyan-900/50 dark:hover:to-blue-900/50 text-cyan-700 dark:text-cyan-300 rounded-md transition-all font-medium border border-cyan-300 dark:border-cyan-700/50"
                    >
                      📋 Copy ID
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Share this ID with your audience to join the session
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? "☀️" : "🌙"}
                  </button>
                  <div className="hidden sm:block">
                    <AlertNotification alerts={aiAlerts} enableSound={true} />
                  </div>
                  <div className="hidden sm:block">
                    <ConnectionStatus status={status} onReconnect={reconnect} />
                  </div>
                  <button
                    onClick={handleEndSession}
                    disabled={isEndingSession}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isEndingSession ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>Ending...</span>
                      </>
                    ) : (
                      <>
                        <span>End</span>
                        <span className="hidden sm:inline text-xs">(Summary)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile alert section */}
              <div className="sm:hidden mt-4 space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <AlertNotification alerts={aiAlerts} enableSound={true} />
                <ConnectionStatus status={status} onReconnect={reconnect} />
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - AI Insights */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300">
                  <CodeDemandIndicator alerts={aiAlerts} reactions={reactions} />
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300">
                  <SentimentMonitor alerts={aiAlerts} />
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 overflow-y-auto max-h-[600px]">
                  <AIInsightsPanel alerts={aiAlerts} />
                </div>
              </div>

              {/* Right Column - Reactions & Questions */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 overflow-x-auto">
                  <ReactionHeatmap reactions={reactions} timeWindowMinutes={5} />
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300">
                  <ReactionDisplay reactions={reactions} />
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-2xl transition-all duration-300 overflow-y-auto max-h-[600px]">
                  <QuestionFeed questions={questions} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>🔴 Live • Real-time updates • AI-powered insights • Sound notifications</p>
            </div>
          </div>
        </div>
      </main>

      {/* Session Summary Modal */}
      <SessionSummaryModal summary={sessionSummary} onClose={handleSummaryClose} />
    </div>
  )
}
