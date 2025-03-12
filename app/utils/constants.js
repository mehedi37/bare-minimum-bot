/**
 * Application constants
 */

// Summary options
export const SUMMARY_LENGTHS = [
  { value: 'short', label: 'Short' },
  { value: 'medium', label: 'Medium' },
  { value: 'long', label: 'Long' },
];

export const SUMMARY_STYLES = [
  { value: 'narrative', label: 'Narrative' },
  { value: 'bullet_points', label: 'Bullet Points' },
  { value: 'academic', label: 'Academic' },
  { value: 'simplified', label: 'Simplified' },
];

export const OUTPUT_TYPES = [
  { value: 'summary', label: 'Summary' },
  { value: 'quiz', label: 'Quiz' },
];

// Default number of quiz questions
export const DEFAULT_QUIZ_QUESTIONS = 5;

// Chat related constants
export const MAX_MESSAGE_LENGTH = 2000;
export const DEFAULT_BOT_NAME = 'BareMinimum Bot';
export const DEFAULT_USER_NAME = 'You';

// UI constants
export const MOBILE_BREAKPOINT = 768;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  YOUTUBE_INVALID_URL: 'Please enter a valid YouTube URL.',
  PDF_INVALID_FILE: 'Please upload a valid PDF file.',
  TEXT_EMPTY: 'Please enter some text to summarize.',
  MESSAGE_EMPTY: 'Please enter a message.',
  SESSION_EXPIRED: 'Your session has expired. Please refresh the page.',
};