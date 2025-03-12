/**
 * API Configuration
 * Central place to manage API endpoints and settings
 */

// Base URL for the FastAPI backend
export const API_BASE_URL = 'http://127.0.0.1:8000';

// API Endpoints - relative to API_BASE_URL
export const API_ENDPOINTS = {
  // Chat endpoints
  CHAT: {
    MESSAGE: '/api/v1/chat/message',
  },

  // Summarize endpoints
  SUMMARIZE: {
    TEXT: '/api/v1/summarize/text',
    PDF: '/api/v1/summarize/pdf',
    YOUTUBE: '/api/v1/summarize/youtube',
  },

  // Health check endpoint
  HEALTH: '/api/v1/health',
};

/**
 * Helper function to get the full API URL
 * @param {string} endpoint - The API endpoint path
 * @returns {string} The full API URL
 */
export function getApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}
