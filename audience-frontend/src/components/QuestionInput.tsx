'use client';

import { api } from '@/lib/api';
import { getUserId } from '@/lib/userUtils';
import { ChangeEvent, FormEvent, useState } from 'react';

interface QuestionInputProps {
  sessionId: string;
  userName: string;
}

const MAX_CHARACTERS = 500;

export default function QuestionInput({ sessionId, userName }: QuestionInputProps) {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const remainingChars = MAX_CHARACTERS - question.length;
  const isOverLimit = remainingChars < 0;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    setMessage(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      setMessage({ type: 'error', text: 'Please enter a question' });
      return;
    }

    if (isOverLimit) {
      setMessage({ type: 'error', text: 'Question is too long' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Get unique user ID
      const userId = getUserId();
      
      await api.submitQuestion({
        question_text: question.trim(),
        session_id: sessionId,
        user_id: userId,
        user_name: userName, // Include user name
      });

      setMessage({ type: 'success', text: 'Question submitted successfully!' });
      setQuestion('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to submit question',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        Ask a Question
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={handleChange}
            placeholder="Type your question here..."
            rows={4}
            disabled={isSubmitting}
            className={`
              w-full px-4 py-3 
              border-2 rounded-lg 
              resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              ${isOverLimit ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            `}
          />
          <div
            className={`
              absolute bottom-3 right-3 text-sm font-medium
              ${isOverLimit ? 'text-red-600' : remainingChars < 50 ? 'text-yellow-600' : 'text-gray-500'}
            `}
          >
            {remainingChars} chars left
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !question.trim() || isOverLimit}
          className={`
            w-full py-3 px-6
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold rounded-lg
            transition-all duration-200
            transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            shadow-md hover:shadow-lg
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Question'
          )}
        </button>
      </form>

      {message && (
        <div
          className={`
            mt-4 p-4 rounded-lg text-center font-medium
            ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
          `}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}