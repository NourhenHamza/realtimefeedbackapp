'use client';

import { api, ReactionType } from '@/lib/api';
import { getUserId } from '@/lib/userUtils';
import { useState } from 'react';

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
  userName: string;  // <-- ADDED userName prop
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

  const handleReaction = async (reactionType: ReactionType) => {
    if (isSubmitting || cooldowns[reactionType]) return;

    setPressedButton(reactionType);
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Get unique user ID
      const userId = getUserId();
      
      await api.submitReaction({
        reaction_type: reactionType,
        session_id: sessionId,
        user_id: userId,
        user_name: userName,  // <-- ADDED user_name to API call
      });

      setMessage({ type: 'success', text: 'Reaction sent!' });

      // Set cooldown for this specific button
      setCooldowns((prev) => ({ ...prev, [reactionType]: true }));
      setTimeout(() => {
        setCooldowns((prev) => ({ ...prev, [reactionType]: false }));
      }, 1000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to send reaction',
      });
    } finally {
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
            disabled={isSubmitting || cooldowns[reaction.type]}
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
                <span className="text-white text-sm font-medium">Wait...</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {message && (
        <div
          className={`
            p-4 rounded-lg text-center font-medium
            ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          `}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}