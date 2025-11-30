'use client';

import { useMemo, useState } from 'react';
import { Reaction, ReactionType } from '../lib/api';

interface ReactionDisplayProps {
  reactions: Reaction[];
}

const reactionConfig: Record<
  ReactionType,
  { label: string; icon: string; color: string; bgColor: string; gradient: string; glowColor: string }
> = {
  SPEED_UP: {
    label: 'Speed Up',
    icon: '⚡',
    color: 'text-emerald-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950',
    gradient: 'from-emerald-400 to-teal-400',
    glowColor: 'rgba(16, 185, 129, 0.8)',
  },
  SLOW_DOWN: {
    label: 'Slow Down',
    icon: '🐌',
    color: 'text-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950',
    gradient: 'from-amber-400 to-orange-400',
    glowColor: 'rgba(245, 158, 11, 0.8)',
  },
  SHOW_CODE: {
    label: 'Show Code',
    icon: '💻',
    color: 'text-violet-600',
    bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950',
    gradient: 'from-violet-400 to-purple-400',
    glowColor: 'rgba(139, 92, 246, 0.8)',
  },
  IM_LOST: {
    label: "I'm Lost",
    icon: '😵',
    color: 'text-rose-600',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950',
    gradient: 'from-rose-400 to-pink-400',
    glowColor: 'rgba(244, 63, 94, 0.8)',
  },
};

export default function ReactionDisplay({ reactions }: ReactionDisplayProps) {
  const [hoveredReaction, setHoveredReaction] = useState<ReactionType | null>(null);

  const reactionCounts = useMemo(() => {
    const counts: Record<ReactionType, number> = {
      SPEED_UP: 0,
      SLOW_DOWN: 0,
      SHOW_CODE: 0,
      IM_LOST: 0,
    };

    reactions.forEach((reaction) => {
      counts[reaction.reaction_type] = (counts[reaction.reaction_type] || 0) + 1;
    });

    return counts;
  }, [reactions]);

  const totalReactions = useMemo(() => {
    return Object.values(reactionCounts).reduce((sum, count) => sum + count, 0);
  }, [reactionCounts]);

  const getPercentage = (count: number) => {
    if (totalReactions === 0) return 0;
    return Math.round((count / totalReactions) * 100);
  };

  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Live Reactions
        </h2>
        <div className="px-5 py-2 bg-white dark:bg-gray-700 rounded-full shadow-lg text-base font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
          Total: {totalReactions}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {(Object.keys(reactionConfig) as ReactionType[]).map((type) => {
          const config = reactionConfig[type];
          const count = reactionCounts[type];
          const percentage = getPercentage(count);
          const isHovered = hoveredReaction === type;

          return (
            <div
              key={type}
              className={`${config.bgColor} rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-xl backdrop-blur-sm border-2 border-white/50 dark:border-gray-700/50`}
              onMouseEnter={() => setHoveredReaction(type)}
              onMouseLeave={() => setHoveredReaction(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-md transition-all duration-300"
                    style={{
                      filter: isHovered ? `drop-shadow(0 0 20px ${config.glowColor})` : 'none',
                      transform: isHovered ? 'scale(1.15)' : 'scale(1)'
                    }}
                  >
                    <span className="text-3xl" role="img" aria-label={config.label}>
                      {config.icon}
                    </span>
                  </div>
                  <span className={`font-bold ${config.color} text-base`}>
                    {config.label}
                  </span>
                </div>
                <span className={`text-4xl font-bold ${config.color}`}>
                  {count}
                </span>
              </div>

              <div className="w-full bg-white/60 dark:bg-gray-700/60 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${config.gradient} transition-all duration-700 ease-out rounded-full`}
                  style={{ 
                    width: `${percentage}%`,
                    boxShadow: isHovered ? `0 0 15px ${config.glowColor}` : 'none'
                  }}
                />
              </div>
              <div className={`text-right text-sm mt-2 ${config.color} font-bold`}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent reactions timeline */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Recent Activity
        </h3>
        <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-6 max-h-48 overflow-y-auto shadow-xl border-2 border-white/50 dark:border-gray-600/50">
          {reactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8 font-medium">
              No reactions yet
            </p>
          ) : (
            <div className="space-y-3">
              {reactions.slice(0, 10).map((reaction, index) => {
                const config = reactionConfig[reaction.reaction_type];
                const time = new Date(reaction.timestamp).toLocaleTimeString();
                return (
                  <div
                    key={`${reaction.timestamp}-${index}`}
                    className="flex items-center justify-between bg-white dark:bg-gray-600 rounded-xl px-5 py-3 pulse-once shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102 border border-gray-100 dark:border-gray-500"
                  >
                    <div className="flex items-center space-x-3">
                      <span 
                        className="text-2xl transition-transform duration-300 hover:scale-125"
                        style={{
                          filter: `drop-shadow(0 0 8px ${config.glowColor})`
                        }}
                      >
                        {config.icon}
                      </span>
                      <span className={`font-semibold ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                      {time}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}