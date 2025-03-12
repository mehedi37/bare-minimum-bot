/**
 * Formatting utility functions
 */

/**
 * Format a timestamp (HH:MM:SS or MM:SS)
 * @param {string} timestamp - Timestamp to format
 * @returns {string} - Formatted timestamp
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return '';

  // Ensure timestamp is in the correct format
  const timestampRegex = /^(\d{1,2}:)?(\d{1,2}):(\d{1,2})$/;
  if (!timestampRegex.test(timestamp)) return timestamp;

  return timestamp;
}

/**
 * Format a date to a readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;

  return `${text.substring(0, maxLength - 3)}...`;
}

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Convert markdown formatted text to HTML
 * @param {string} markdown - Markdown text
 * @returns {string} - HTML string
 */
export function markdownToHtml(markdown) {
  if (!markdown) return '';

  // Simple markdown conversion (not complete)
  return markdown
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\_(.*?)\_/g, '<em>$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Headers
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    // Lists
    .replace(/^\* (.*?)$/gm, '<li>$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br>');
}