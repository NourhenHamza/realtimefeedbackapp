import { useEffect, useMemo, useState } from 'react';

interface CodeDemandIndicatorProps {
  alerts: Array<{
    type: string;
    severity: string;
    title: string;
    message: string;
    timestamp: string;
    data?: {
      request_count?: number;
      urgency?: string;
      window_seconds?: number;
    };
  }>;
  reactions: Array<{
    reaction_type: string;
    timestamp: string;
  }>;
}

export default function CodeDemandIndicator({ alerts, reactions }: CodeDemandIndicatorProps) {
  const [pulse, setPulse] = useState(false);

  // Get latest code demand alert
  const latestCodeDemandAlert = useMemo(() => {
    return alerts.find(alert => 
      alert.type === 'code_demand' || 
      alert.type === 'code_insights'
    );
  }, [alerts]);

  // Count SHOW_CODE reactions in last 30 seconds
  const recentCodeRequests = useMemo(() => {
    const thirtySecondsAgo = Date.now() - 30000;
    return reactions.filter(r => {
      try {
        return r.reaction_type === 'SHOW_CODE' && 
               new Date(r.timestamp).getTime() > thirtySecondsAgo;
      } catch {
        return false;
      }
    }).length;
  }, [reactions]);

  // Determine urgency level
  const urgency = useMemo(() => {
    if (recentCodeRequests >= 7) return 'high';
    if (recentCodeRequests >= 5) return 'medium';
    if (recentCodeRequests >= 3) return 'low';
    return 'none';
  }, [recentCodeRequests]);

  // Pulse effect when new requests come in
  useEffect(() => {
    if (recentCodeRequests > 0) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [recentCodeRequests]);

  const urgencyConfig = {
    high: {
      bg: 'bg-gradient-to-r from-red-500 to-orange-500',
      text: 'text-white',
      icon: '🔥',
      label: 'HIGH DEMAND',
      border: 'border-red-500'
    },
    medium: {
      bg: 'bg-gradient-to-r from-yellow-400 to-orange-400',
      text: 'text-gray-900',
      icon: '⚡',
      label: 'MODERATE',
      border: 'border-yellow-500'
    },
    low: {
      bg: 'bg-gradient-to-r from-blue-400 to-blue-500',
      text: 'text-white',
      icon: '💻',
      label: 'REQUESTS',
      border: 'border-blue-500'
    },
    none: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-600 dark:text-gray-400',
      icon: '💤',
      label: 'NO REQUESTS',
      border: 'border-gray-300'
    }
  };

  const config = urgencyConfig[urgency];

  return (
    <div className="space-y-3">
      {/* Main Indicator */}
      <div 
        className={`${config.bg} ${config.text} rounded-xl p-6 shadow-lg transition-all duration-300 ${
          pulse ? 'scale-105' : 'scale-100'
        } border-2 ${config.border}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{config.icon}</span>
            <div>
              <h3 className="text-sm font-semibold opacity-90">
                CODE EXAMPLE DEMAND
              </h3>
              <p className="text-xs opacity-75">Last 30 seconds</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{recentCodeRequests}</div>
            <div className="text-xs font-semibold">{config.label}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-500"
            style={{ 
              width: `${Math.min((recentCodeRequests / 10) * 100, 100)}%` 
            }}
          />
        </div>

        {/* AI Recommendation */}
        {latestCodeDemandAlert && (
          <div className="mt-4 pt-4 border-t border-white border-opacity-30">
            <p className="text-sm font-medium">
              💡 {latestCodeDemandAlert.message}
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {urgency !== 'none' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <span>🎯</span>
            Recommended Actions
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {urgency === 'high' && (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">1.</span>
                  <span>Switch to live coding NOW - audience is ready!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">2.</span>
                  <span>Share your screen with IDE/code editor</span>
                </li>
              </>
            )}
            {urgency === 'medium' && (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Prepare to show code examples soon</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Consider a quick demo or walkthrough</span>
                </li>
              </>
            )}
            {urgency === 'low' && (
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>Some audience members want code examples</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Historical trend (last 5 minutes) */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-semibold">Code Request Trend</span>
          <span>Last 5 minutes</span>
        </div>
        <CodeDemandMiniChart reactions={reactions} />
      </div>
    </div>
  );
}

// Mini chart component
function CodeDemandMiniChart({ reactions }: { reactions: Array<{ reaction_type: string; timestamp: string }> }) {
  const chartData = useMemo(() => {
    const fiveMinutesAgo = Date.now() - 300000;
    const slots = 10; // 10 bars for 5 minutes (30-second intervals)
    const slotDuration = 30000; // 30 seconds
    
    const counts = new Array(slots).fill(0);
    
    reactions
      .filter(r => r.reaction_type === 'SHOW_CODE')
      .forEach(r => {
        try {
          const time = new Date(r.timestamp).getTime();
          if (time > fiveMinutesAgo) {
            const slotIndex = Math.floor((time - fiveMinutesAgo) / slotDuration);
            if (slotIndex >= 0 && slotIndex < slots) {
              counts[slotIndex]++;
            }
          }
        } catch {}
      });
    
    return counts;
  }, [reactions]);

  const maxCount = Math.max(...chartData, 1);

  return (
    <div className="flex items-end justify-between gap-1 h-16">
      {chartData.map((count, idx) => (
        <div
          key={idx}
          className="flex-1 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 relative group"
          style={{ 
            height: `${(count / maxCount) * 100}%`,
            minHeight: count > 0 ? '8px' : '2px',
            opacity: count > 0 ? 1 : 0.2
          }}
        >
          {count > 0 && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {count}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}