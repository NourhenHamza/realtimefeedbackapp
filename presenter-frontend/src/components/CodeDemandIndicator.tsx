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
          className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-300 hover:from-purple-700 hover:to-purple-500 relative group"
          style={{ 
            height: `${(count / maxCount) * 100}%`,
            minHeight: count > 0 ? '8px' : '2px',
            opacity: count > 0 ? 1 : 0.2
          }}
        >
          {count > 0 && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {count}
            </div>
          )}
        </div>
      ))}
    </div>
  );
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
      bg: 'bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600',
      text: 'text-white',
      icon: '🔥',
      label: 'HIGH DEMAND',
      border: 'border-pink-400',
      shadow: 'shadow-pink-500/50',
      glow: 'shadow-2xl shadow-pink-500/30'
    },
    medium: {
      bg: 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500',
      text: 'text-white',
      icon: '⚡',
      label: 'MODERATE',
      border: 'border-purple-400',
      shadow: 'shadow-purple-500/50',
      glow: 'shadow-xl shadow-purple-500/30'
    },
    low: {
      bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600',
      text: 'text-white',
      icon: '💻',
      label: 'REQUESTS',
      border: 'border-purple-400',
      shadow: 'shadow-purple-500/40',
      glow: 'shadow-lg shadow-purple-500/20'
    },
    none: {
      bg: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
      text: 'text-gray-600 dark:text-gray-400',
      icon: '💤',
      label: 'NO REQUESTS',
      border: 'border-gray-300 dark:border-gray-600',
      shadow: 'shadow-gray-500/20',
      glow: ''
    }
  };

  const config = urgencyConfig[urgency];

  return (
    <div className="space-y-4">
      {/* Main Indicator */}
      <div 
        className={`${config.bg} ${config.text} rounded-2xl p-8 ${config.glow} transition-all duration-500 ${
          pulse ? 'scale-105' : 'scale-100'
        } border-2 ${config.border} relative overflow-hidden`}
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl drop-shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                {config.icon}
              </div>
              <div>
                <h3 className="text-base font-bold opacity-95 tracking-wide">
                  CODE EXAMPLE DEMAND
                </h3>
                <p className="text-sm opacity-80 font-medium">Last 30 seconds</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black tracking-tight drop-shadow-lg">
                {recentCodeRequests}
              </div>
              <div className="text-sm font-bold tracking-wider mt-1">{config.label}</div>
            </div>
          </div>

          {/* Enhanced Progress bar */}
          <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-white to-white/80 transition-all duration-500 rounded-full shadow-lg"
              style={{ 
                width: `${Math.min((recentCodeRequests / 10) * 100, 100)}%` 
              }}
            />
          </div>

          {/* AI Recommendation */}
          {latestCodeDemandAlert && (
            <div className="mt-5 pt-5 border-t-2 border-white/30">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <span className="text-2xl">💡</span>
                <p className="text-sm font-semibold leading-relaxed">
                  {latestCodeDemandAlert.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {urgency !== 'none' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Recommended Actions
            </span>
          </h4>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            {urgency === 'high' && (
              <>
                <li className="flex items-start gap-3 bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg border-l-4 border-pink-500">
                  <span className="text-pink-600 dark:text-pink-400 font-black text-lg">1.</span>
                  <span className="font-semibold">Switch to live coding NOW - audience is ready!</span>
                </li>
                <li className="flex items-start gap-3 bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg border-l-4 border-pink-500">
                  <span className="text-pink-600 dark:text-pink-400 font-black text-lg">2.</span>
                  <span className="font-semibold">Share your screen with IDE/code editor</span>
                </li>
              </>
            )}
            {urgency === 'medium' && (
              <>
                <li className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border-l-4 border-purple-500">
                  <span className="text-purple-600 dark:text-purple-400 font-black text-lg">•</span>
                  <span className="font-medium">Prepare to show code examples soon</span>
                </li>
                <li className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border-l-4 border-purple-500">
                  <span className="text-purple-600 dark:text-purple-400 font-black text-lg">•</span>
                  <span className="font-medium">Consider a quick demo or walkthrough</span>
                </li>
              </>
            )}
            {urgency === 'low' && (
              <li className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border-l-4 border-indigo-500">
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-lg">•</span>
                <span className="font-medium">Some audience members want code examples</span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Historical trend */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-md">
        <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 mb-4">
          <span className="font-bold flex items-center gap-2">
            <span className="text-lg">📊</span>
            Code Request Trend
          </span>
          <span className="text-xs bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full font-semibold text-purple-700 dark:text-purple-300">
            Last 5 minutes
          </span>
        </div>
        <CodeDemandMiniChart reactions={reactions} />
      </div>
    </div>
  );
}