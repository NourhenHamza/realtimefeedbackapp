"use client"

import { api } from "@/lib/api"
import { getUserId } from "@/lib/userUtils"
import { type ChangeEvent, type FormEvent, useRef, useState } from "react"

interface QuestionInputProps {
  sessionId: string
  userName: string
}

const MAX_CHARACTERS = 500

export default function QuestionInput({ sessionId, userName }: QuestionInputProps) {
  const [question, setQuestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  // Track last submission to prevent duplicates
  const lastSubmitTime = useRef<number>(0)
  const lastSubmittedQuestion = useRef<string>("")
  const isSubmittingRef = useRef<boolean>(false)

  const remainingChars = MAX_CHARACTERS - question.length
  const isOverLimit = remainingChars < 0

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value)
    setMessage(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const trimmedQuestion = question.trim()

    if (!trimmedQuestion) {
      setMessage({ type: "error", text: "Please enter a question" })
      return
    }

    if (isOverLimit) {
      setMessage({ type: "error", text: "Question is too long" })
      return
    }

    // Check if already submitting
    if (isSubmittingRef.current) {
      console.log("⏳ Already submitting a question, ignoring duplicate submission")
      return
    }

    // Prevent duplicate submissions of the same question within 3 seconds
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime.current
    const isSameQuestion = trimmedQuestion === lastSubmittedQuestion.current

    if (isSameQuestion && timeSinceLastSubmit < 3000) {
      console.log(`⏳ Duplicate question detected (${timeSinceLastSubmit}ms ago), skipping...`)
      setMessage({ type: "error", text: "Question already submitted!" })
      setTimeout(() => setMessage(null), 2000)
      return
    }

    // Mark as submitting
    isSubmittingRef.current = true
    setIsSubmitting(true)
    setMessage(null)
    lastSubmitTime.current = now
    lastSubmittedQuestion.current = trimmedQuestion

    try {
      const userId = getUserId()

      console.log(`📤 Sending question: "${trimmedQuestion.substring(0, 50)}..."`)

      await api.submitQuestion({
        question_text: trimmedQuestion,
        session_id: sessionId,
        user_id: userId,
        user_name: userName,
      })

      console.log("✅ Question sent successfully")
      setMessage({ type: "success", text: "Question submitted successfully!" })
      setQuestion("")

      // Clear the last submitted question after 5 seconds (allow asking similar questions later)
      setTimeout(() => {
        lastSubmittedQuestion.current = ""
      }, 5000)
    } catch (error) {
      console.error("❌ Error submitting question:", error)
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to submit question",
      })
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-cyan-600 dark:from-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
        Ask a Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <textarea
            value={question}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type your question here..."
            rows={4}
            disabled={isSubmitting}
            className={`
              w-full px-6 py-4 
              border-2 rounded-2xl 
              resize-none
              focus:outline-none 
              disabled:opacity-50 disabled:cursor-not-allowed
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              transition-all duration-300
              ${isOverLimit 
                ? "border-red-500 dark:border-red-400" 
                : isFocused 
                  ? "border-blue-500 dark:border-blue-400 shadow-lg shadow-blue-500/20" 
                  : "border-gray-300 dark:border-gray-600"
              }
            `}
            style={{
              filter: isFocused && !isOverLimit
                ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
                : 'none'
            }}
          />
          <div
            className={`
              absolute bottom-4 right-4 text-sm font-semibold
              transition-all duration-300
              ${isOverLimit 
                ? "text-red-600 dark:text-red-400 scale-110" 
                : remainingChars < 50 
                  ? "text-yellow-600 dark:text-yellow-400" 
                  : "text-gray-500 dark:text-gray-400"
              }
            `}
          >
            {remainingChars} chars left
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !question.trim() || isOverLimit}
          className={`
            relative w-full py-4 px-6
            bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700
            dark:from-pink-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600
            text-white font-bold text-lg rounded-2xl
            transition-all duration-300
            transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            shadow-lg hover:shadow-2xl
            overflow-hidden group
            ${!isSubmitting && !isOverLimit && question.trim() ? 'hover:scale-105' : ''}
          `}
          style={{
            filter: !isSubmitting && !isOverLimit && question.trim()
              ? 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))'
              : 'none'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="text-2xl">📤</span>
              Submit Question
            </span>
          )}
        </button>
      </form>

      {message && (
        <div
          className={`
            mt-6 p-4 rounded-2xl text-center font-semibold transition-all duration-300 transform
            animate-slideIn shadow-xl
            ${
              message.type === "success"
                ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/50 dark:to-emerald-900/50 dark:text-green-200 border-2 border-green-300 dark:border-green-700"
                : "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:from-red-900/50 dark:to-rose-900/50 dark:text-red-200 border-2 border-red-300 dark:border-red-700"
            }
          `}
        >
          <span className="text-xl mr-2">{message.type === "success" ? "✅" : "⚠️"}</span>
          {message.text}
        </div>
      )}

      <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
          <span className="text-xl mr-2">💡</span>
          <strong>Tip:</strong> Be specific and concise for the best response
        </p>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}