"use client"

import { api, type ReactionType } from "@/lib/api"
import { getUserId } from "@/lib/userUtils"
import { useRef, useState } from "react"

interface ReactionButton {
  type: ReactionType
  label: string
  icon: string
}

const reactions: ReactionButton[] = [
  {
    type: "SPEED_UP",
    label: "Speed Up",
    icon: "⚡",
  },
  {
    type: "SLOW_DOWN",
    label: "Slow Down",
    icon: "🐌",
  },
  {
    type: "SHOW_CODE",
    label: "Show Code",
    icon: "💻",
  },
  {
    type: "IM_LOST",
    label: "I'm Lost",
    icon: "😵",
  },
]

interface FloatingEmoji {
  id: number
  emoji: string
  x: number
  y: number
}

interface ModernReactionButtonsProps {
  sessionId: string
  userName: string
}

export default function ModernReactionButtons({ sessionId, userName }: ModernReactionButtonsProps) {
  const [pressedButton, setPressedButton] = useState<ReactionType | null>(null)
  const [hoveredButton, setHoveredButton] = useState<ReactionType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [cooldowns, setCooldowns] = useState<Record<ReactionType, boolean>>({
    SPEED_UP: false,
    SLOW_DOWN: false,
    SHOW_CODE: false,
    IM_LOST: false,
  })
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([])

  const lastSubmitTime = useRef<Record<ReactionType, number>>({
    SPEED_UP: 0,
    SLOW_DOWN: 0,
    SHOW_CODE: 0,
    IM_LOST: 0,
  })

  const submittingType = useRef<Record<ReactionType, boolean>>({
    SPEED_UP: false,
    SLOW_DOWN: false,
    SHOW_CODE: false,
    IM_LOST: false,
  })

  const emojiIdCounter = useRef(0)

  const createFloatingEmojis = (emoji: string) => {
    const newEmojis: FloatingEmoji[] = []
    const count = Math.floor(Math.random() * 3) + 3 // 3-5 emojis
    
    for (let i = 0; i < count; i++) {
      newEmojis.push({
        id: emojiIdCounter.current++,
        emoji,
        x: Math.random() * 100,
        y: Math.random() * 20 + 40, // Start from middle-bottom area
      })
    }

    setFloatingEmojis(prev => [...prev, ...newEmojis])

    // Remove emojis after animation
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)))
    }, 2000)
  }

  const handleReaction = async (reactionType: ReactionType) => {
    if (submittingType.current[reactionType]) {
      console.log(`⏳ Already submitting ${reactionType}, ignoring duplicate click`)
      return
    }

    if (cooldowns[reactionType]) {
      console.log(`⏳ ${reactionType} is in cooldown`)
      return
    }

    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime.current[reactionType]
    if (timeSinceLastSubmit < 800) {
      console.log(`⏳ Debouncing ${reactionType} - too soon (${timeSinceLastSubmit}ms)`)
      return
    }

    submittingType.current[reactionType] = true
    lastSubmitTime.current[reactionType] = now

    // Find emoji for this reaction
    const reaction = reactions.find(r => r.type === reactionType)
    if (reaction) {
      createFloatingEmojis(reaction.icon)
    }

    setPressedButton(reactionType)
    setIsSubmitting(true)
    setMessage(null)

    try {
      const userId = getUserId()

      console.log(`📤 Sending reaction: ${reactionType}`)
      await api.submitReaction({
        reaction_type: reactionType,
        session_id: sessionId,
        user_id: userId,
        user_name: userName,
      })

      console.log(`✅ Reaction sent successfully: ${reactionType}`)
      setMessage({ type: "success", text: "Reaction sent!" })

      setCooldowns((prev) => ({ ...prev, [reactionType]: true }))
      setTimeout(() => {
        setCooldowns((prev) => ({ ...prev, [reactionType]: false }))
      }, 1500)
    } catch (error) {
      console.error(`❌ Error sending reaction ${reactionType}:`, error)
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to send reaction",
      })
    } finally {
      submittingType.current[reactionType] = false
      setIsSubmitting(false)
      setTimeout(() => setPressedButton(null), 300)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 relative">
      {/* Floating Emojis Background Effect (TikTok-style) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingEmojis.map((emoji) => (
          <div
            key={emoji.id}
            className="absolute animate-float-up"
            style={{
              left: `${emoji.x}%`,
              bottom: `${emoji.y}%`,
              fontSize: '3rem',
              animation: 'floatUp 2s ease-out forwards',
            }}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-200px) scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-400px) scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent relative z-10">
        How are you feeling?
      </h2>

      {/* Reactions in a single line */}
      <div className="flex items-center justify-center gap-6 md:gap-8 mb-8 relative z-10">
        {reactions.map((reaction) => (
          <div
            key={reaction.type}
            className="relative group"
            onMouseEnter={() => setHoveredButton(reaction.type)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <button
              onClick={() => handleReaction(reaction.type)}
              disabled={cooldowns[reaction.type] || submittingType.current[reaction.type]}
              className={`
                relative
                text-5xl md:text-6xl
                transition-all duration-300
                transform
                ${hoveredButton === reaction.type ? "scale-125" : "scale-100"}
                ${pressedButton === reaction.type ? "scale-90" : ""}
                active:scale-90
                disabled:opacity-40 disabled:cursor-not-allowed
                cursor-pointer
                filter
                ${hoveredButton === reaction.type ? "drop-shadow-2xl brightness-110" : "drop-shadow-lg"}
              `}
              style={{
                filter: hoveredButton === reaction.type 
                  ? 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))' 
                  : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
              }}
            >
              {reaction.icon}
            </button>

            {/* Tooltip - Facebook style (appears on hover) */}
            <div
              className={`
                absolute -top-12 left-1/2 transform -translate-x-1/2
                transition-all duration-200
                ${hoveredButton === reaction.type ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
              `}
            >
              <div className="bg-gray-900 dark:bg-gray-800 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                {reaction.label}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div
          className={`
            p-4 rounded-lg text-center font-medium transition-all mb-4 relative z-10
            ${message.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}
          `}
        >
          {message.text}
        </div>
      )}

      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 relative z-10">
        <p className="text-sm text-purple-900 dark:text-purple-200 text-center">
          💡 Your instant reactions help the presenter adjust in real-time
        </p>
      </div>
    </div>
  )
}