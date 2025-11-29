import { useEffect, useMemo, useState } from 'react';

interface Reaction {
  reaction_type: 'SPEED_UP' | 'SLOW_DOWN' | 'SHOW_CODE' | 'IM_LOST';
  timestamp: string;
  user_name?: string;
}

interface ReactionHeatmapProps {
  reactions: Reaction[];
  timeWindowMinutes?: number;
}

type ReactionType = 'SPEED_UP' | 'SLOW_DOWN' | 'SHOW_CODE' | 'IM_LOST';

interface TimeSlot {
  timestamp: number;
  counts: Record<ReactionType, number>;
}

const reactionColors: Record<ReactionType, string> = {
  SPEED_UP: '#10b981',
  SLOW_DOWN: '#f59e0b',
  SHOW_CODE: '#3b82f6',
  IM_LOST: '#ef4444',
};

const reactionIcons: Record<ReactionType, string> = {
  SPEED_UP: '⚡',
  SLOW_DOWN: '🐌',
  SHOW_CODE: '💻',
  IM_LOST: '😵',
};

export default function ReactionHeatmap({ 
  reactions, 
  timeWindowMinutes = 5 
}: ReactionHeatmapProps) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second for real-time effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Debug: Log reactions
  useEffect(() => {
    console.log('🔍 Heatmap reactions:', reactions.length);
    if (reactions.length > 0) {
      console.log('Latest reaction:', reactions[0]);
    }
  }, [reactions]);

  // Group reactions into time slots (30-second intervals)
  const timeSlots = useMemo(() => {
    const slots: TimeSlot[] = [];
    const slotDuration = 30000; // 30 seconds in milliseconds
    const windowMs = timeWindowMinutes * 60 * 1000;
    const startTime = currentTime - windowMs;
    
    // Create time slots
    const numSlots = Math.ceil(windowMs / slotDuration);
    for (let i = 0; i < numSlots; i++) {
      const slotTime = startTime + (i * slotDuration);
      slots.push({
        timestamp: slotTime,
        counts: {
          SPEED_UP: 0,
          SLOW_DOWN: 0,
          SHOW_CODE: 0,
          IM_LOST: 0,
        }
      });
    }

    // Fill slots with reaction data
    reactions.forEach(reaction => {
      try {
        const reactionTime = new Date(reaction.timestamp).getTime();
        
        // Check if reaction is within our time window
        if (reactionTime >= startTime && reactionTime <= currentTime) {
          // Find the appropriate slot
          const slotIndex = Math.floor((reactionTime - startTime) / slotDuration);
          
          if (slotIndex >= 0 && slotIndex < slots.length) {
            slots[slotIndex].counts[reaction.reaction_type]++;
          }
        }
      } catch (error) {
        console.error('Error processing reaction timestamp:', reaction.timestamp, error);
      }
    });

    return slots;
  }, [reactions, currentTime, timeWindowMinutes]);

  // Calculate max count for scaling
  const maxCount = useMemo(() => {
    const allCounts = timeSlots.flatMap(slot => Object.values(slot.counts));
    return Math.max(1, ...allCounts);
  }, [timeSlots]);

  // Count total reactions in window
  const totalInWindow = useMemo(() => {
    const windowMs = timeWindowMinutes * 60 * 1000;
    const startTime = currentTime - windowMs;
    
    return reactions.filter(r => {
      try {
        const reactionTime = new Date(r.timestamp).getTime();
        return reactionTime >= startTime && reactionTime <= currentTime;
      } catch {
        return false;
      }
    }).length;
  }, [reactions, currentTime, timeWindowMinutes]);

  // Get intensity for heatmap color
  const getIntensity = (count: number): number => {
    return count / maxCount;
  };

  // Format time label
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          📊 Live Reaction Heatmap
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Last {timeWindowMinutes} minutes
          </span>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            {totalInWindow} reactions
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs">
        {(Object.keys(reactionColors) as ReactionType[]).map(type => (
          <div key={type} className="flex items-center gap-1">
            <span className="text-sm">{reactionIcons[type]}</span>
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: reactionColors[type] }}
            />
            <span className="text-gray-600 dark:text-gray-400">
              {type.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 overflow-x-auto">
        {totalInWindow === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No reactions in the last {timeWindowMinutes} minutes
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Total reactions received: {reactions.length}
            </p>
          </div>
        ) : (
          <div className="min-w-full">
            {/* Type labels */}
            <div className="grid grid-cols-1 gap-2">
              {(Object.keys(reactionColors) as ReactionType[]).map(type => {
                const totalForType = timeSlots.reduce((sum, slot) => sum + slot.counts[type], 0);
                
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-24 text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1">
                        <span>{reactionIcons[type]}</span>
                        <span className="truncate">{type.split('_')[0]}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {totalForType}
                      </span>
                    </div>
                    <div className="flex-1 flex gap-1">
                      {timeSlots.map((slot, idx) => {
                        const count = slot.counts[type];
                        const intensity = getIntensity(count);
                        const bgColor = reactionColors[type];
                        
                        return (
                          <div
                            key={idx}
                            className="flex-1 h-8 rounded transition-all duration-300 hover:ring-2 ring-white dark:ring-gray-600 cursor-pointer relative group"
                            style={{
                              backgroundColor: bgColor,
                              opacity: count > 0 ? 0.3 + (intensity * 0.7) : 0.1,
                              minWidth: '8px'
                            }}
                            title={`${count} ${type} at ${formatTime(slot.timestamp)}`}
                          >
                            {count > 0 && (
                              <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30 rounded">
                                {count}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time labels */}
            <div className="flex items-center gap-2 mt-3">
              <div className="w-24" />
              <div className="flex-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{formatTime(timeSlots[0]?.timestamp || currentTime - (timeWindowMinutes * 60000))}</span>
                <span className="font-semibold">Now</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity indicator */}
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Live updating every second</span>
        </div>
        <span>
          Max per slot: {maxCount}
        </span>
      </div>
    </div>
  );
}