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
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Ask a Question</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={handleChange}
            placeholder="Type your question here..."
            rows={4}
            disabled={isSubmitting}
            className={`
              w-full px-4 py-3 
              border-2 rounded-lg 
              resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              transition-colors
              ${isOverLimit ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
            `}
          />
          <div
            className={`
              absolute bottom-3 right-3 text-sm font-medium
              ${isOverLimit ? "text-red-600 dark:text-red-400" : remainingChars < 50 ? "text-yellow-600 dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}
            `}
          >
            {remainingChars} chars left
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !question.trim() || isOverLimit}
          className={`
            w-full py-3 px-6
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold rounded-lg
            transition-all duration-200
            transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            shadow-md hover:shadow-lg
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            "📤 Submit Question"
          )}
        </button>
      </form>

      {message && (
        <div
          className={`
            mt-4 p-4 rounded-lg text-center font-medium transition-all
            ${
              message.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }
          `}
        >
          {message.text}
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> Be specific and concise for the best response
        </p>
      </div>
    </div>
  )
}
