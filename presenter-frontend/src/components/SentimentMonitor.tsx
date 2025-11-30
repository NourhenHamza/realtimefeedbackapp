import { useMemo, useState } from 'react';

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
  const [hoveredSentiment, setHoveredSentiment] = useState<string | null>(null);

  // Get latest sentiment analysis
  const latestSentiment = useMemo(() => {
    return alerts.find(alert => 
      alert.type === 'sentiment_analysis' || 
      alert.type === 'sentiment_trend'
    );
  }, [alerts]);

  // Get sentiment trend
  const sentimentTrend = useMemo(() => {
    const trendAlerts = alerts
      .filter(a => a.type === 'sentiment_trend')
      .slice(0, 2);
    
    if (trendAlerts.length > 0) {
      return trendAlerts[0].severity === 'success' ? 'improving' : 'declining';
    }
    return 'stable';
  }, [alerts]);

  // ENHANCED: 7 sentiment categories (added "bored" for too slow)
  const sentimentConfig = {
    overwhelmed: {
      emoji: '🚨',
      color: 'text-red-700',
      glowColor: 'rgba(220, 38, 38, 0.8)',
      bg: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900',
      border: 'border-red-400 dark:border-red-600',
      label: 'Overwhelmed',
      description: '🚨 URGENT! Audience cannot keep up - SLOW DOWN immediately!',
      bgPulse: 'animate-pulse'
    },
    bored: {
      emoji: '😴',
      color: 'text-orange-600',
      glowColor: 'rgba(234, 88, 12, 0.8)',
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900',
      border: 'border-orange-400 dark:border-orange-600',
      label: 'Bored',
      description: '⚡ Audience wants you to SPEED UP - pace is too slow!',
      bgPulse: ''
    },
    frustrated: {
      emoji: '😤',
      color: 'text-red-600',
      glowColor: 'rgba(239, 68, 68, 0.7)',
      bg: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950 dark:to-pink-950',
      border: 'border-red-300 dark:border-red-700',
      label: 'Frustrated',
      description: 'Audience is struggling with content - address concerns now!',
      bgPulse: ''
    },
    confused: {
      emoji: '🤔',
      color: 'text-yellow-600',
      glowColor: 'rgba(202, 138, 4, 0.7)',
      bg: 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950',
      border: 'border-yellow-300 dark:border-yellow-700',
      label: 'Confused',
      description: 'Some audience members need clarification',
      bgPulse: ''
    },
    neutral: {
      emoji: 'ℹ️',
      color: 'text-gray-600',
      glowColor: 'rgba(107, 114, 128, 0.5)',
      bg: 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900',
      border: 'border-gray-300 dark:border-gray-700',
      label: 'Neutral',
      description: 'Audience sentiment is neutral',
      bgPulse: ''
    },
    interested: {
      emoji: '👍',
      color: 'text-blue-600',
      glowColor: 'rgba(37, 99, 235, 0.7)',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950',
      border: 'border-blue-300 dark:border-blue-700',
      label: 'Interested',
      description: 'Audience is engaged and attentive',
      bgPulse: ''
    },
    excited: {
      emoji: '🎉',
      color: 'text-green-600',
      glowColor: 'rgba(34, 197, 94, 0.8)',
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950',
      border: 'border-green-300 dark:border-green-700',
      label: 'Excited',
      description: 'Audience is highly engaged and enthusiastic!',
      bgPulse: ''
    }
  };

  const dominant = latestSentiment?.data?.dominant_sentiment || 'neutral';
  const config = sentimentConfig[dominant as keyof typeof sentimentConfig] || sentimentConfig.neutral;
  const distribution = latestSentiment?.data?.distribution || {};
  const questionCount = latestSentiment?.data?.question_count || 0;
  const negativePercentage = latestSentiment?.data?.negative_percentage || 0;

  const trend = sentimentTrend;

  return (
    <div className="space-y-6">
      {/* Main Sentiment Display */}
      <div className={`${config.bg} ${config.bgPulse} rounded-3xl p-8 border-2 ${config.border} shadow-2xl backdrop-blur-sm transition-all duration-500`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div 
              className="transition-all duration-300 transform hover:scale-125"
              style={{
                filter: `drop-shadow(0 0 30px ${config.glowColor}) brightness(110%)`,
              }}
            >
              <span className="text-7xl">{config.emoji}</span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Audience Mood
              </h3>
              <p className={`text-3xl font-bold ${config.color}`}>
                {config.label}
              </p>
            </div>
          </div>
          
          {/* Trend Indicator */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${trend.bg} ${trend.color} shadow-md transform transition-all duration-300 hover:scale-105`}>
            <span className="text-2xl">{trend.icon}</span>
            <span className="text-sm font-bold">{trend.label}</span>
          </div>
        </div>

        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 font-medium">
          {config.description}
        </p>

        {/* SPEED UP WARNING for bored audience */}
        {dominant === 'bored' && (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-l-4 border-orange-600 p-5 rounded-xl mb-6 shadow-lg">
            <p className="text-lg font-bold text-orange-900 dark:text-orange-100 flex items-center gap-2 mb-2">
              <span className="text-2xl">⚡</span>
              Audience wants you to SPEED UP!
            </p>
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200 space-y-1">
              <span className="block">→ Pick up the pace - they're ready for more</span>
              <span className="block">→ Skip basic explanations, move to advanced topics</span>
              <span className="block">→ Add more interactive elements or demos</span>
            </p>
          </div>
        )}

        {/* CRITICAL WARNING for overwhelmed */}
        {dominant === 'overwhelmed' && (
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-l-4 border-red-700 p-5 rounded-xl mb-6 shadow-lg animate-pulse">
            <p className="text-lg font-bold text-red-900 dark:text-red-100 flex items-center gap-2 mb-2">
              <span className="text-2xl">🚨</span>
              CRITICAL: Your pace is TOO FAST! Audience is lost!
            </p>
            <p className="text-sm font-medium text-red-800 dark:text-red-200 space-y-1">
              <span className="block">→ Stop immediately and ask "What's confusing?"</span>
              <span className="block">→ Revisit the last concept more slowly</span>
              <span className="block">→ Check for understanding before continuing</span>
            </p>
          </div>
        )}

        {/* Warning for high negative sentiment */}
        {negativePercentage >= 60 && dominant !== 'overwhelmed' && (
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded-xl mb-6 shadow-lg">
            <p className="text-sm font-bold text-red-800 dark:text-red-200">
              ⚠️ {negativePercentage.toFixed(0)}% of questions show confusion or frustration
            </p>
          </div>
        )}

        {/* Question count */}
        {questionCount > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Based on {questionCount} recent {questionCount === 1 ? 'question' : 'questions'}
          </p>
        )}
      </div>

      {/* Sentiment Distribution */}
      {Object.keys(distribution).length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Sentiment Breakdown
          </h4>
          
          <div className="space-y-4">
            {Object.entries(distribution)
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([sentiment, count]) => {
                const sentConfig = sentimentConfig[sentiment as keyof typeof sentimentConfig] || sentimentConfig.neutral;
                const percentage = questionCount > 0 ? ((count as number) / questionCount) * 100 : 0;
                const isHovered = hoveredSentiment === sentiment;
                
                return (
                  <div 
                    key={sentiment} 
                    className="flex items-center gap-4 transition-all duration-300"
                    onMouseEnter={() => setHoveredSentiment(sentiment)}
                    onMouseLeave={() => setHoveredSentiment(null)}
                  >
                    <div 
                      className="transition-all duration-300"
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 20px ${sentConfig.glowColor})` : 'none',
                        transform: isHovered ? 'scale(1.2)' : 'scale(1)'
                      }}
                    >
                      <span className="text-3xl">{sentConfig.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                          {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                        </span>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${
                            sentConfig.color.replace('text-', 'bg-')
                          }`}
                          style={{ 
                            width: `${percentage}%`,
                            boxShadow: isHovered ? `0 0 20px ${sentConfig.glowColor}` : 'none'
                          }}
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
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 rounded-2xl p-6 border-2 border-purple-300 dark:border-purple-700 shadow-xl">
          <h4 className="text-base font-bold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            AI Recommendation
          </h4>
          <p className="text-sm text-purple-800 dark:text-purple-200 font-medium leading-relaxed">
            {latestSentiment.message}
          </p>
        </div>
      )}

      {/* Quick Tips based on sentiment */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
        <h4 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          What to Do
        </h4>
        <ul className="space-y-3">
          {dominant === 'bored' && (
            <>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-orange-600 text-lg flex-shrink-0">⚡</span>
                <span className="font-bold">Speed up! Audience is ready for more.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-orange-600 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Skip introductory material, dive into advanced topics</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-orange-600 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Add interactive demos or live coding</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-orange-600 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Move through slides/concepts faster</span>
              </li>
            </>
          )}
          {dominant === 'overwhelmed' && (
            <>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-red-700 text-lg flex-shrink-0">🚨</span>
                <span className="font-bold">STOP! Take a breath. Your audience is drowning.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-red-700 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Ask: "Let's pause. What's the most confusing part?"</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-red-700 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Revisit the last 2-3 concepts at HALF your current speed</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-red-700 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Use concrete examples and live demos</span>
              </li>
            </>
          )}
          {dominant === 'frustrated' && (
            <>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-red-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Pause and ask: "What's causing frustration? Let me help."</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-red-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Address technical issues or clarify confusing concepts</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-red-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Provide working examples and troubleshooting tips</span>
              </li>
            </>
          )}
          {dominant === 'confused' && (
            <>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-yellow-600 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Address common questions from the Q&A feed</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-yellow-600 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Provide a quick recap of key points</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-yellow-600 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Use analogies or visual aids to clarify</span>
              </li>
            </>
          )}
          {dominant === 'interested' && (
            <>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-blue-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Great pace! Keep going with current approach</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-blue-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Consider diving deeper into advanced topics</span>
              </li>
            </>
          )}
          {dominant === 'excited' && (
            <>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-green-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Audience is highly engaged - excellent!</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-green-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Now is a great time for interactive demos</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-green-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">You can pick up the pace slightly if desired</span>
              </li>
            </>
          )}
          {dominant === 'neutral' && (
            <>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-gray-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Add interactive elements to boost engagement</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 transition-all duration-200 hover:translate-x-1">
                <span className="text-gray-500 text-lg flex-shrink-0">•</span>
                <span className="font-medium">Ask questions to check understanding</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}