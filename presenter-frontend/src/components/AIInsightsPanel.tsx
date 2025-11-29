'use client';

import { useState } from 'react';

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

const severityConfig = {
  info: {
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-800 dark:text-blue-200',
    icon: 'ℹ️',
  },
  warning: {
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    icon: '⚠️',
  },
  critical: {
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-800 dark:text-red-200',
    icon: '🚨',
  },
  success: {
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-800 dark:text-green-200',
    icon: '✅',
  },
};

export default function AIInsightsPanel({ alerts }: AIInsightsPanelProps) {
  const [expandedAlerts, setExpandedAlerts] = useState<Set<number>>(new Set());

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
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          🤖 AI Insights
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {alerts.length} {alerts.length === 1 ? 'alert' : 'alerts'}
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {alerts.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="text-4xl mb-3">🤖</div>
            <p className="text-gray-600 dark:text-gray-400">
              AI insights will appear here as your audience interacts
            </p>
          </div>
        ) : (
          alerts.map((alert, index) => {
            const config = severityConfig[alert.severity];
            const isExpanded = expandedAlerts.has(index);

            return (
              <div
                key={`${alert.timestamp}-${index}`}
                className={`${config.bgColor} ${config.borderColor} border-l-4 rounded-lg p-4 transition-all duration-200 hover:shadow-md`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{config.icon}</span>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${config.textColor}`}>
                        {alert.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getTimeAgo(alert.timestamp)}
                    </span>
                    {(alert.ai_analysis || alert.themes) && (
                      <button
                        onClick={() => toggleAlert(index)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {isExpanded ? 'Hide details' : 'Show details'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && alert.ai_analysis && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
                      AI Assessment:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {alert.ai_analysis.assessment}
                    </p>
                    
                    {alert.reaction_summary && (
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {Object.entries(alert.reaction_summary).map(([type, count]) => (
                          <div
                            key={type}
                            className="bg-white dark:bg-gray-800 rounded px-2 py-1 text-center"
                          >
                            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                              {count}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
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
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-300">
                      Question Themes:
                    </h4>
                    <div className="space-y-3">
                      {alert.themes.map((theme, themeIndex) => (
                        <div
                          key={themeIndex}
                          className="bg-white dark:bg-gray-800 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                              {theme.theme}
                            </h5>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                              {theme.count} {theme.count === 1 ? 'question' : 'questions'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
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