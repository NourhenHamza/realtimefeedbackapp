import { useEffect, useState } from 'react';

interface Recommendation {
  category: string;
  priority: 'high' | 'medium' | 'low';
  recommendation: string;
  rationale: string;
}

interface SessionSummary {
  session_id: string;
  timestamp: string;
  session_duration_minutes: number;
  overall_summary: string;
  reaction_analysis: {
    total: number;
    breakdown: Record<string, number>;
    dominant_reaction: {
      type: string;
      count: number;
      percentage: number;
    };
    engagement_level: string;
    sentiment: string;
    code_requests: number;
    confusion_signals: number;
  };
  question_analysis: {
    total: number;
    themes: Array<{
      theme: string;
      count: number;
      example?: string;
    }>;
    top_concerns: string[];
    quality_assessment: string;
  };
  pacing_analysis: {
    assessment: string;
    total_pacing_alerts: number;
    critical_moments: number;
    speed_up_requests: number;
    slow_down_requests: number;
    pacing_score: number;
  };
  recommendations: Recommendation[];
  statistics: {
    total_reactions: number;
    total_questions: number;
    total_alerts: number;
    reactions_per_minute: number;
    questions_per_minute: number;
  };
}

interface SessionSummaryModalProps {
  summary: SessionSummary | null;
  onClose: () => void;
}

export default function SessionSummaryModal({ summary, onClose }: SessionSummaryModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (summary) {
      setIsVisible(true);
    }
  }, [summary]);

  if (!summary || !isVisible) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'pacing': return '⚡';
      case 'engagement': return '🎯';
      case 'content': return '📚';
      case 'interaction': return '💬';
      case 'clarity': return '💡';
      default: return '📌';
    }
  };

  const getPacingScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const downloadSummary = () => {
    const dataStr = JSON.stringify(summary, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `session_summary_${summary.session_id}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                📊 Session Summary
              </h2>
              <p className="text-purple-100 mt-2">
                Duration: {summary.session_duration_minutes.toFixed(1)} minutes • 
                Session ID: {summary.session_id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overall Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              ✨ Overall Assessment
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {summary.overall_summary}
            </p>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-600">{summary.statistics.total_reactions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Reactions</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border-2 border-green-200">
              <div className="text-3xl font-bold text-green-600">{summary.statistics.total_questions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Questions Asked</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center border-2 border-purple-200">
              <div className="text-3xl font-bold text-purple-600">{summary.statistics.total_alerts}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Alerts</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center border-2 border-yellow-200">
              <div className="text-3xl font-bold text-yellow-600">{summary.statistics.reactions_per_minute.toFixed(1)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reactions/min</div>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 text-center border-2 border-pink-200">
              <div className={`text-3xl font-bold ${getPacingScoreColor(summary.pacing_analysis.pacing_score)}`}>
                {summary.pacing_analysis.pacing_score}/100
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Pacing Score</div>
            </div>
          </div>

          {/* Engagement & Reactions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                👥 Engagement Analysis
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Level:</span>
                  <span className="ml-2 font-semibold text-gray-800 dark:text-white">
                    {summary.reaction_analysis.engagement_level}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sentiment:</span>
                  <span className={`ml-2 font-semibold ${
                    summary.reaction_analysis.sentiment === 'positive' ? 'text-green-600' :
                    summary.reaction_analysis.sentiment === 'concerning' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {summary.reaction_analysis.sentiment}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Code Requests:</span>
                  <span className="ml-2 font-semibold text-blue-600">
                    {summary.reaction_analysis.code_requests}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Confusion Signals:</span>
                  <span className="ml-2 font-semibold text-orange-600">
                    {summary.reaction_analysis.confusion_signals}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                ⚡ Pacing Analysis
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {summary.pacing_analysis.assessment}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">
                    {summary.pacing_analysis.speed_up_requests}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Speed Up</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                  <div className="text-2xl font-bold text-yellow-600">
                    {summary.pacing_analysis.slow_down_requests}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Slow Down</div>
                </div>
              </div>
            </div>
          </div>

          {/* Question Themes */}
          {summary.question_analysis.themes.length > 0 && (
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                💬 Question Themes
              </h3>
              <div className="space-y-3">
                {summary.question_analysis.themes.map((theme, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{theme.theme}</h4>
                      <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                        {theme.count} questions
                      </span>
                    </div>
                    {theme.example && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        "{theme.example}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Concerns */}
          {summary.question_analysis.top_concerns.length > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                ⚠️ Top Concerns
              </h3>
              <ul className="space-y-2">
                {summary.question_analysis.top_concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              🎯 Recommendations for Next Time
            </h3>
            <div className="space-y-4">
              {summary.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg p-4 border-2 ${getPriorityColor(rec.priority)}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryIcon(rec.category)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                          {rec.recommendation}
                        </h4>
                        <span className="text-xs font-bold uppercase px-2 py-1 rounded">
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {rec.rationale}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={downloadSummary}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Summary (JSON)
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}