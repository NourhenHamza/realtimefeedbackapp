import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_PRESENTER_BACKEND_URL || 'http://localhost:8000';

export type ReactionType = 'SPEED_UP' | 'SLOW_DOWN' | 'SHOW_CODE' | 'IM_LOST';

export interface Reaction {
  reaction_type: ReactionType;
  timestamp: string;
  session_id: string;
  user_id?: string;
  user_name?: string;  // Added user_name
}

export interface Question {
  question_text: string;
  timestamp: string;
  session_id: string;
  user_id?: string;
  user_name?: string;  // Added user_name
}

export const api = {
  /**
   * Fetch recent reactions
   */
  async getReactions(sessionId: string, limit: number = 50): Promise<Reaction[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/presenter/reactions`, {
        params: { session_id: sessionId, limit },
        timeout: 5000,
      });
      return response.data.reactions || [];
    } catch (error) {
      console.error('Error fetching reactions:', error);
      return [];
    }
  },

  /**
   * Fetch questions
   */
  async getQuestions(sessionId: string): Promise<Question[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/presenter/questions`, {
        params: { session_id: sessionId },
        timeout: 5000,
      });
      return response.data.questions || [];
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  },

  /**
   * Submit a reaction
   */
  async submitReaction(data: {
    reaction_type: ReactionType;
    session_id: string;
    user_id?: string;
    user_name?: string;
  }): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/api/audience/reaction`, data, {
        timeout: 5000,
      });
    } catch (error) {
      console.error('Error submitting reaction:', error);
      throw new Error('Failed to submit reaction');
    }
  },

  /**
   * Submit a question
   */
  async submitQuestion(data: {
    question_text: string;
    session_id: string;
    user_id?: string;
    user_name?: string;
  }): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/api/audience/question`, data, {
        timeout: 5000,
      });
    } catch (error) {
      console.error('Error submitting question:', error);
      throw new Error('Failed to submit question');
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

  /**
   * Get WebSocket URL
   */
  getWebSocketUrl(sessionId: string): string {
    const wsProtocol = API_BASE_URL.startsWith('https') ? 'wss' : 'ws';
    const baseUrl = API_BASE_URL.replace(/^https?:\/\//, '');
    return `${wsProtocol}://${baseUrl}/ws/presenter/${sessionId}`;
  },
};