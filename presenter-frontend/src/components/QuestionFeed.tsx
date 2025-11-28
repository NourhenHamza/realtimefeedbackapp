'use client';

import { Question } from '../lib/api';

interface QuestionFeedProps {
  questions: Question[];
}

export default function QuestionFeed({ questions }: QuestionFeedProps) {
  const sortedQuestions = [...questions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date().getTime();
    const time = new Date(timestamp).getTime();
    const diff = Math.floor((now - time) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Questions
        </h2>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {questions.length} {questions.length === 1 ? 'question' : 'questions'}
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {sortedQuestions.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-gray-600 dark:text-gray-400">
              No questions yet. They'll appear here in real-time.
            </p>
          </div>
        ) : (
          sortedQuestions.map((question, index) => (
            <div
              key={`${question.timestamp}-${index}`}
              className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 pulse-once border-l-4 border-blue-500"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-300 text-sm font-bold">
                      Q
                    </span>
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {getTimeAgo(question.timestamp)}
                  </span>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {formatTime(question.timestamp)}
                </span>
              </div>

              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {question.question_text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}