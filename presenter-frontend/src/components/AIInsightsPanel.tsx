'use client';

import { useMemo, useState } from 'react';

interface AIAlert {
  type: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: string;
  ai_analysis?: {
    assessment: string;
    recommendation: string;
    sentiment: string;
  };
  reaction_summary?: Record<string, number>;
  themes?: Array<{
    theme: string;
    count: number;
    representative_question: string;
    questions: Array<{
      text: string;
      user_name: string;
      timestamp: string;
    }>;
  }>;
  data?: any;
}

interface AIInsightsPanelProps {
  alerts: AIAlert[];
}

type FilterType = 'all' | 'important' | 'not-important';

const severityConfig = {
  info: {
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950',
    borderColor: 'border-blue-300 dark:border-blue-700',
    textColor: 'text-blue-800 dark:text-blue-200',
    icon: 'ℹ️',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    isImportant: false,
  },
  warning: {
    bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950',
    borderColor: 'border-yellow-300 dark:border-yellow-700',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    icon: '⚠️',
    glowColor: 'rgba(245, 158, 11, 0.7)',
    isImportant: true,
  },
  critical: {
    bgColor: 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950',
    borderColor: 'border-red-300 dark:border-red-700',
    textColor: 'text-red-800 dark:text-red-200',
    icon: '🚨',
    glowColor: 'rgba(239, 68, 68, 0.8)',
    isImportant: true,
  },
  success: {
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950',
    borderColor: 'border-green-300 dark:border-green-700',
    textColor: 'text-green-800 dark:text-green-200',
    icon: '✅',
    glowColor: 'rgba(34, 197, 94, 0.6)',
    isImportant: false,
  },
};

export default function AIInsightsPanel({ alerts }: AIInsightsPanelProps) {
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<FilterType>('all');
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const filteredAlerts = useMemo(() => {
    if (filter === 'all') return alerts;
    
    return alerts.filter(alert => {
      const config = severityConfig[alert.severity];
      if (filter === 'important') return config.isImportant;
      if (filter === 'not-important') return !config.isImportant;
      return true;
    });
  }, [alerts, filter]);

  const toggleAlert = (index: number) => {
    const newExpanded = new Set(expandedAlerts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedAlerts(newExpanded);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date().getTime();
    const time = new Date(timestamp).getTime();
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
          <span className="text-4xl">🤖</span>
          AI Insights
        </h2>
        <div className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-lg text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
          {filteredAlerts.length} {filteredAlerts.length === 1 ? 'alert' : 'alerts'}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
            filter === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-600'
          }`}
        >
          All Alerts
        </button>
        <button
          onClick={() => setFilter('important')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
            filter === 'important'
              ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-600'
          }`}
        >
          🚨 Important
        </button>
        <button
          onClick={() => setFilter('not-important')}
          className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
            filter === 'not-important'
              ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-600'
          }`}
        >
          ℹ️ Info Only
        </button>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {filteredAlerts.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12 text-center shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <div className="text-6xl mb-4">🤖</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
              {filter === 'all' 
                ? 'AI insights will appear here as your audience interacts'
                : `No ${filter === 'important' ? 'important' : 'informational'} alerts at the moment`}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert, index) => {
            const config = severityConfig[alert.severity];
            const isExpanded = expandedAlerts.has(index);
            const isHovered = hoveredIcon === index;

            return (
              <div
                key={`${alert.timestamp}-${index}`}
                className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl shadow-xl backdrop-blur-sm`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="transition-all duration-300"
                      onMouseEnter={() => setHoveredIcon(index)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 20px ${config.glowColor})` : 'none',
                        transform: isHovered ? 'scale(1.2)' : 'scale(1)'
                      }}
                    >
                      <span className="text-4xl">{config.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${config.textColor}`}>
                        {alert.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 font-medium">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                      {getTimeAgo(alert.timestamp)}
                    </span>
                    {(alert.ai_analysis || alert.themes) && (
                      <button
                        onClick={() => toggleAlert(index)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full"
                      >
                        {isExpanded ? '▲ Hide' : '▼ Show'} details
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && alert.ai_analysis && (
                  <div className="mt-5 pt-5 border-t-2 border-gray-200/50 dark:border-gray-600/50">
                    <h4 className="font-bold text-base mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      AI Assessment:
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium leading-relaxed">
                      {alert.ai_analysis.assessment}
                    </p>
                    
                    {alert.reaction_summary && (
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        {Object.entries(alert.reaction_summary).map(([type, count]) => (
                          <div
                            key={type}
                            className="bg-white dark:bg-gray-800 rounded-xl px-3 py-3 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                              {count}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 font-semibold mt-1">
                              {type.replace('_', ' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Question Themes */}
                {isExpanded && alert.themes && (
                  <div className="mt-5 pt-5 border-t-2 border-gray-200/50 dark:border-gray-600/50">
                    <h4 className="font-bold text-base mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <span className="text-xl">💬</span>
                      Question Themes:
                    </h4>
                    <div className="space-y-3">
                      {alert.themes.map((theme, themeIndex) => (
                        <div
                          key={themeIndex}
                          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-base text-gray-800 dark:text-gray-200">
                              {theme.theme}
                            </h5>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-bold shadow-sm">
                              {theme.count} {theme.count === 1 ? 'question' : 'questions'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic font-medium">
                            "{theme.representative_question}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}