import { useMemo } from 'react';

interface SentimentMonitorProps {
  alerts: Array<{
    type: string;
    severity: string;
    title: string;
    message: string;
    timestamp: string;
    data?: {
      dominant_sentiment?: string;
      distribution?: Record<string, number>;
      question_count?: number;
      negative_percentage?: number;
    };
  }>;
}

export default function SentimentMonitor({ alerts }: SentimentMonitorProps) {
  // Get latest sentiment analysis
  const latestSentiment = useMemo(() => {
    return alerts.find(alert => 
      alert.type === 'sentiment_analysis' || 
      alert.type === 'sentiment_trend'
    );
  }, [alerts]);

  // Get sentiment trend (improving/declining)
  const sentimentTrend = useMemo(() => {
    const trendAlerts = alerts
      .filter(a => a.type === 'sentiment_trend')
      .slice(0, 2);
    
    if (trendAlerts.length > 0) {
      return trendAlerts[0].severity === 'success' ? 'improving' : 'declining';
    }
    return 'stable';
  }, [alerts]);

  const sentimentConfig = {
    excited: {
      emoji: '🎉',
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500',
      label: 'Excited',
      description: 'Audience is highly engaged and enthusiastic!'
    },
    interested: {
      emoji: '👍',
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-500',
      label: 'Interested',
      description: 'Audience is engaged and attentive'
    },
    neutral: {
      emoji: 'ℹ️',
      color: 'text-gray-600',
      bg: 'bg-gray-50 dark:bg-gray-700',
      border: 'border-gray-400',
      label: 'Neutral',
      description: 'Audience sentiment is neutral'
    },
    confused: {
      emoji: '🤔',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-500',
      label: 'Confused',
      description: 'Some audience members need clarification'
    },
    frustrated: {
      emoji: '😤',
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-500',
      label: 'Frustrated',
      description: 'Audience is struggling - address concerns!'
    }
  };

  const dominant = latestSentiment?.data?.dominant_sentiment || 'neutral';
  const config = sentimentConfig[dominant as keyof typeof sentimentConfig] || sentimentConfig.neutral;
  const distribution = latestSentiment?.data?.distribution || {};
  const questionCount = latestSentiment?.data?.question_count || 0;
  const negativePercentage = latestSentiment?.data?.negative_percentage || 0;

  // Trend indicator
  const trendConfig = {
    improving: { icon: '📈', color: 'text-green-600', label: 'Improving' },
    declining: { icon: '📉', color: 'text-red-600', label: 'Declining' },
    stable: { icon: '➡️', color: 'text-gray-600', label: 'Stable' }
  };
  const trend = trendConfig[sentimentTrend];

  return (
    <div className="space-y-4">
      {/* Main Sentiment Display */}
      <div className={`${config.bg} rounded-xl p-6 border-2 ${config.border} shadow-lg`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{config.emoji}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Audience Mood
              </h3>
              <p className={`text-2xl font-bold ${config.color}`}>
                {config.label}
              </p>
            </div>
          </div>
          
          {/* Trend Indicator */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-800 ${trend.color}`}>
            <span className="text-xl">{trend.icon}</span>
            <span className="text-sm font-semibold">{trend.label}</span>
          </div>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {config.description}
        </p>

        {/* Warning for negative sentiment */}
        {negativePercentage >= 60 && (
          <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-3 rounded">
            <p className="text-sm font-semibold text-red-800 dark:text-red-200">
              ⚠️ {negativePercentage.toFixed(0)}% of questions show confusion or frustration
            </p>
          </div>
        )}

        {/* Question count */}
        {questionCount > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Based on {questionCount} recent {questionCount === 1 ? 'question' : 'questions'}
          </p>
        )}
      </div>

      {/* Sentiment Distribution */}
      {Object.keys(distribution).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span>📊</span>
            Sentiment Breakdown
          </h4>
          
          <div className="space-y-2">
            {Object.entries(distribution)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([sentiment, count]) => {
                const sentConfig = sentimentConfig[sentiment as keyof typeof sentimentConfig] || sentimentConfig.neutral;
                const percentage = questionCount > 0 ? ((count as number) / questionCount) * 100 : 0;
                
                return (
                  <div key={sentiment} className="flex items-center gap-3">
                    <span className="text-xl">{sentConfig.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                          {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                        </span>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            sentConfig.color.replace('text-', 'bg-')
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Actionable Insights */}
      {latestSentiment && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <span>💡</span>
            AI Recommendation
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {latestSentiment.message}
          </p>
        </div>
      )}

      {/* Quick Tips based on sentiment */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <span>🎯</span>
          What to Do
        </h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {dominant === 'frustrated' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Pause and ask: "What's confusing? Let me clarify."</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Slow down and revisit recent concepts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                <span>Provide concrete examples or demos</span>
              </li>
            </>
          )}
          {dominant === 'confused' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Address common questions from the Q&A feed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                <span>Provide a quick recap of key points</span>
              </li>
            </>
          )}
          {dominant === 'interested' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Great pace! Keep going with current approach</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Consider diving deeper into advanced topics</span>
              </li>
            </>
          )}
          {dominant === 'excited' && (
            <>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>Audience is highly engaged - excellent!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                <span>Now is a great time for interactive demos</span>
              </li>
            </>
          )}
          {dominant === 'neutral' && (
            <li className="flex items-start gap-2">
              <span className="text-gray-500">•</span>
              <span>Consider adding interactive elements to boost engagement</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}