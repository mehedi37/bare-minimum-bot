/**
 * Validation utility functions
 */

/**
 * Validate a YouTube URL
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
export function isValidYouTubeUrl(url) {
  if (!url) return false;

  // Regular expression to match YouTube URLs
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
}

/**
 * Validate if file is a PDF
 * @param {File} file - File to validate
 * @returns {boolean} - Whether file is a PDF
 */
export function isValidPdfFile(file) {
  if (!file) return false;

  // Check if file type is PDF
  return file.type === 'application/pdf';
}

/**
 * Validate if text is not empty
 * @param {string} text - Text to validate
 * @returns {boolean} - Whether text is not empty
 */
export function isValidText(text) {
  return !!text && text.trim().length > 0;
}

/**
 * Validate page range format (e.g., '1-5,10,15-20')
 * @param {string} pageRange - Page range to validate
 * @returns {boolean} - Whether page range is valid
 */
export function isValidPageRange(pageRange) {
  if (!pageRange || pageRange.trim() === '') return true; // Empty is valid (all pages)

  // Regular expression to match page range format
  const pageRangeRegex = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/;
  return pageRangeRegex.test(pageRange);
}

/**
 * Validate focus topics format (comma-separated list)
 * @param {string} focusTopics - Focus topics to validate
 * @returns {boolean} - Whether focus topics format is valid
 */
export function isValidFocusTopics(focusTopics) {
  if (!focusTopics || focusTopics.trim() === '') return true; // Empty is valid (no focus)

  // Check if it's a comma-separated list with no empty items
  return focusTopics.split(',').every(topic => topic.trim().length > 0);
}

/**
 * Validate number of quiz questions
 * @param {number} numQuestions - Number of questions to validate
 * @returns {boolean} - Whether number is valid
 */
export function isValidQuizQuestionCount(numQuestions) {
  // Must be a positive integer
  return Number.isInteger(numQuestions) && numQuestions > 0 && numQuestions <= 20;
}