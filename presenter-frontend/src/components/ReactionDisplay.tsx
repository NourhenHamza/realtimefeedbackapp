'use client';

import { useMemo } from 'react';
import { Reaction, ReactionType } from '../lib/api';

interface ReactionDisplayProps {
  reactions: Reaction[];
}

const reactionConfig: Record<
  ReactionType,
  { label: string; icon: string; color: string; bgColor: string }
> = {
  SPEED_UP: {
    label: 'Speed Up',
    icon: '⚡',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  SLOW_DOWN: {
    label: 'Slow Down',
    icon: '🐌',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  SHOW_CODE: {
    label: 'Show Code',
    icon: '💻',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  IM_LOST: {
    label: "I'm Lost",
    icon: '😵',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
};

export default function ReactionDisplay({ reactions }: ReactionDisplayProps) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Live Reactions
        </h2>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Total: {totalReactions}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {(Object.keys(reactionConfig) as ReactionType[]).map((type) => {
          const config = reactionConfig[type];
          const count = reactionCounts[type];
          const percentage = getPercentage(count);

          return (
            <div
              key={type}
              className={`${config.bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl" role="img" aria-label={config.label}>
                    {config.icon}
                  </span>
                  <span className={`font-semibold ${config.color}`}>
                    {config.label}
                  </span>
                </div>
                <span className={`text-3xl font-bold ${config.color}`}>
                  {count}
                </span>
              </div>

              <div className="w-full bg-white dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${config.color.replace('text-', 'bg-')} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className={`text-right text-sm mt-1 ${config.color} font-medium`}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent reactions timeline */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
          {reactions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No reactions yet
            </p>
          ) : (
            <div className="space-y-2">
              {reactions.slice(0, 10).map((reaction, index) => {
                const config = reactionConfig[reaction.reaction_type];
                const time = new Date(reaction.timestamp).toLocaleTimeString();
                return (
                  <div
                    key={`${reaction.timestamp}-${index}`}
                    className="flex items-center justify-between text-sm bg-white dark:bg-gray-600 rounded-lg px-3 py-2 pulse-once"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{config.icon}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {config.label}
                      </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
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
