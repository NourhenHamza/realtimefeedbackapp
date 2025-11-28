import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_AUDIENCE_BACKEND_URL || 'http://localhost:8000';

export type ReactionType = 'SPEED_UP' | 'SLOW_DOWN' | 'SHOW_CODE' | 'IM_LOST';

export interface ReactionPayload {
  reaction_type: ReactionType;
  session_id: string;
  user_id?: string;
}

export interface QuestionPayload {
  question_text: string;
  session_id: string;
  user_id?: string;
}

export const api = {
  /**
   * Submit a reaction to the backend
   */
  async submitReaction(payload: ReactionPayload): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/api/audience/reaction`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });
    } catch (error) {
      console.error('Error submitting reaction:', error);
      throw new Error('Failed to submit reaction. Please try again.');
    }
  },

  /**
   * Submit a question to the backend
   */
  async submitQuestion(payload: QuestionPayload): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/api/audience/question`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      });
    } catch (error) {
      console.error('Error submitting question:', error);
      throw new Error('Failed to submit question. Please try again.');
    }
  },

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};