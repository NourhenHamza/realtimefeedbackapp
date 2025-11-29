'use client';

import { api, ReactionType } from '@/lib/api';
import { getUserId } from '@/lib/userUtils';
import { useRef, useState } from 'react';

interface ReactionButton {
  type: ReactionType;
  label: string;
  icon: string;
  color: string;
  hoverColor: string;
}

const reactions: ReactionButton[] = [
  {
    type: 'SPEED_UP',
    label: 'Speed Up',
    icon: '⚡',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  {
    type: 'SLOW_DOWN',
    label: 'Slow Down',
    icon: '🐌',
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
  },
  {
    type: 'SHOW_CODE',
    label: 'Show me Code',
    icon: '💻',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  {
    type: 'IM_LOST',
    label: "I'm Lost",
    icon: '😵',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
  },
];

interface ReactionButtonsProps {
  sessionId: string;
  userName: string;
}

export default function ReactionButtons({ sessionId, userName }: ReactionButtonsProps) {
  const [pressedButton, setPressedButton] = useState<ReactionType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<ReactionType, boolean>>({
    SPEED_UP: false,
    SLOW_DOWN: false,
    SHOW_CODE: false,
    IM_LOST: false,
  });

  // Track last submission time per reaction type to prevent duplicates
  const lastSubmitTime = useRef<Record<ReactionType, number>>({
    SPEED_UP: 0,
    SLOW_DOWN: 0,
    SHOW_CODE: 0,
    IM_LOST: 0,
  });

  // Track if a submission is in progress for each type
  const submittingType = useRef<Record<ReactionType, boolean>>({
    SPEED_UP: false,
    SLOW_DOWN: false,
    SHOW_CODE: false,
    IM_LOST: false,
  });

  const handleReaction = async (reactionType: ReactionType) => {
    // Check if already submitting this specific type
    if (submittingType.current[reactionType]) {
      console.log(`⏳ Already submitting ${reactionType}, ignoring duplicate click`);
      return;
    }

    // Check cooldown for this specific type
    if (cooldowns[reactionType]) {
      console.log(`⏳ ${reactionType} is in cooldown`);
      return;
    }

    // Additional time-based check (prevent duplicates within 800ms)
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime.current[reactionType];
    if (timeSinceLastSubmit < 800) {
      console.log(`⏳ Debouncing ${reactionType} - too soon (${timeSinceLastSubmit}ms)`);
      return;
    }

    // Mark as submitting
    submittingType.current[reactionType] = true;
    lastSubmitTime.current[reactionType] = now;

    setPressedButton(reactionType);
    setIsSubmitting(true);
    setMessage(null);

    try {
      const userId = getUserId();
      
      console.log(`📤 Sending reaction: ${reactionType}`);
      await api.submitReaction({
        reaction_type: reactionType,
        session_id: sessionId,
        user_id: userId,
        user_name: userName,
      });

      console.log(`✅ Reaction sent successfully: ${reactionType}`);
      setMessage({ type: 'success', text: 'Reaction sent!' });

      // Set cooldown for this specific button (1.5 seconds)
      setCooldowns((prev) => ({ ...prev, [reactionType]: true }));
      setTimeout(() => {
        setCooldowns((prev) => ({ ...prev, [reactionType]: false }));
      }, 1500);

    } catch (error) {
      console.error(`❌ Error sending reaction ${reactionType}:`, error);
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to send reaction',
      });
    } finally {
      // Mark as not submitting
      submittingType.current[reactionType] = false;
      setIsSubmitting(false);
      setTimeout(() => setPressedButton(null), 300);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        How are you feeling?
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {reactions.map((reaction) => (
          <button
            key={reaction.type}
            onClick={() => handleReaction(reaction.type)}
            disabled={cooldowns[reaction.type] || submittingType.current[reaction.type]}
            className={`
              relative overflow-hidden
              ${reaction.color} ${reaction.hoverColor}
              text-white font-semibold rounded-xl
              py-8 px-6
              transition-all duration-200
              transform active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl
              ${pressedButton === reaction.type ? 'scale-95' : 'scale-100'}
              min-h-[120px] sm:min-h-[140px]
            `}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-4xl sm:text-5xl" role="img" aria-label={reaction.label}>
                {reaction.icon}
              </span>
              <span className="text-base sm:text-lg">{reaction.label}</span>
            </div>

            {pressedButton === reaction.type && (
              <span className="absolute inset-0 bg-white opacity-30 rounded-xl ripple" />
            )}

            {cooldowns[reaction.type] && (
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-xl">
                <span className="text-white text-sm font-medium">Ready in 1s...</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {message && (
        <div
          className={`
            p-4 rounded-lg text-center font-medium transition-all
            ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
          `}
        >
          {message.text}
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
          💡 Your reactions help the presenter adjust in real-time
        </p>
      </div>
    </div>
  );
}