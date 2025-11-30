"use client"

import { api, type ReactionType } from "@/lib/api"
import { getUserId } from "@/lib/userUtils"
import { useRef, useState } from "react"
import FloatingEmoji from "./FloatingEmoji"
import ReactionButton from "./ReactionButton"

interface ReactionButtonData {
  type: ReactionType
  label: string
  icon: string
}

const reactions: ReactionButtonData[] = [
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

interface FloatingEmojiData {
  id: number
  emoji: string
  x: number
  y: number
  xOffset: number
  xOffsetEnd: number
  rotation: number
  rotationEnd: number
  duration: number
  delay: number
}

interface ModernReactionButtonsProps {
  sessionId: string
  userName: string
}

export default function ModernReactionButtons({ sessionId, userName }: ModernReactionButtonsProps) {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [cooldowns, setCooldowns] = useState<Record<ReactionType, boolean>>({
    SPEED_UP: false,
    SLOW_DOWN: false,
    SHOW_CODE: false,
    IM_LOST: false,
  })
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmojiData[]>([])

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

  const createFloatingEmojis = (emoji: string, buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    // Start from the top-center of the button emoji (subtract half height and add small offset)
    const centerY = rect.top + rect.height - 200 // Start from upper portion of emoji

    const newEmojis: FloatingEmojiData[] = []
    const count = Math.floor(Math.random() * 3) + 4 // 4-6 emojis

    for (let i = 0; i < count; i++) {
      // Create emojis in a burst pattern from the button center
      const spreadAngle = (Math.random() - 0.5) * 60 // -30 to +30 degrees spread
      const baseAngle = -90 + spreadAngle // Mostly upward with some spread
      const angleRad = (baseAngle * Math.PI) / 180
      
      // Small initial offset for burst effect
      const initialRadius = Math.random() * 15
      const startX = centerX + Math.cos(angleRad) * initialRadius
      const startY = centerY + Math.sin(angleRad) * initialRadius
      
      newEmojis.push({
        id: emojiIdCounter.current++,
        emoji,
        x: startX,
        y: startY,
        xOffset: (Math.random() - 0.5) * 150, // Horizontal drift during flight
        xOffsetEnd: (Math.random() - 0.5) * 250,
        rotation: Math.random() * 360,
        rotationEnd: Math.random() * 720 - 360,
        duration: 1.8 + Math.random() * 0.7,
        delay: i * 0.08, // Stagger the emojis slightly
      })
    }

    setFloatingEmojis(prev => [...prev, ...newEmojis])

    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)))
    }, 3500)
  }

  const handleReaction = async (
    reactionType: ReactionType, 
    emoji: string, 
    buttonRef: React.RefObject<HTMLButtonElement>
  ) => {
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

    createFloatingEmojis(emoji, buttonRef)
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
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 relative">
      <FloatingEmoji emojis={floatingEmojis} />

      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent relative z-10">
        How are you feeling?
      </h2>

      <div className="flex items-center justify-center gap-6 md:gap-8 mb-8 relative z-10">
        {reactions.map((reaction) => (
          <ReactionButton
            key={reaction.type}
            reaction={reaction}
            onReact={handleReaction}
            isDisabled={cooldowns[reaction.type] || submittingType.current[reaction.type]}
          />
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