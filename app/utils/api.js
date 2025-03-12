/**
 * API Utility functions for making requests to the backend
 */

/**
 * Send a message to the chatbot
 * @param {string} message - Message to send to the chatbot
 * @returns {Promise<Object>} - Chat response
 */
export async function sendChatMessage(message) {
  const formData = new FormData();
  formData.append('message', message);

  try {
    const response = await fetch('/api/v1/chat/message', {
      method: 'POST',
      body: formData,
      credentials: 'include', // Include cookies for session management
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

/**
 * Summarize a YouTube video
 * @param {Object} options - Summarization options
 * @returns {Promise<Object>} - Summary or quiz response
 */
export async function summarizeYouTube({
  videoUrl,
  outputType = 'summary',
  summaryLength = 'medium',
  summaryStyle = 'narrative',
  includeTimestamps = true,
  focusTopics = null,
  numQuizQuestions = 5
}) {
  const formData = new FormData();
  formData.append('video_url', videoUrl);
  formData.append('output_type', outputType);
  formData.append('summary_length', summaryLength);
  formData.append('summary_style', summaryStyle);
  formData.append('include_timestamps', includeTimestamps);

  if (focusTopics) {
    formData.append('focus_topics', focusTopics);
  }

  if (outputType === 'quiz' && numQuizQuestions) {
    formData.append('num_quiz_questions', numQuizQuestions);
  }

  try {
    const response = await fetch('/api/v1/summarize/youtube', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to summarize YouTube video');
    }

    return await response.json();
  } catch (error) {
    console.error('Error summarizing YouTube video:', error);
    throw error;
  }
}

/**
 * Summarize a PDF document
 * @param {Object} options - Summarization options
 * @returns {Promise<Object>} - Summary or quiz response
 */
export async function summarizePDF({
  file,
  outputType = 'summary',
  summaryLength = 'medium',
  summaryStyle = 'narrative',
  pageRange = null,
  focusTopics = null,
  numQuizQuestions = 5
}) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('output_type', outputType);
  formData.append('summary_length', summaryLength);
  formData.append('summary_style', summaryStyle);

  if (pageRange) {
    formData.append('page_range', pageRange);
  }

  if (focusTopics) {
    formData.append('focus_topics', focusTopics);
  }

  if (outputType === 'quiz' && numQuizQuestions) {
    formData.append('num_quiz_questions', numQuizQuestions);
  }

  try {
    const response = await fetch('/api/v1/summarize/pdf', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to summarize PDF');
    }

    return await response.json();
  } catch (error) {
    console.error('Error summarizing PDF:', error);
    throw error;
  }
}

/**
 * Summarize text content
 * @param {Object} options - Summarization options
 * @returns {Promise<Object>} - Summary or quiz response
 */
export async function summarizeText({
  text,
  outputType = 'summary',
  summaryLength = 'medium',
  summaryStyle = 'narrative',
  focusTopics = null,
  numQuizQuestions = 5
}) {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('output_type', outputType);
  formData.append('summary_length', summaryLength);
  formData.append('summary_style', summaryStyle);

  if (focusTopics) {
    formData.append('focus_topics', focusTopics);
  }

  if (outputType === 'quiz' && numQuizQuestions) {
    formData.append('num_quiz_questions', numQuizQuestions);
  }

  try {
    const response = await fetch('/api/v1/summarize/text', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to summarize text');
    }

    return await response.json();
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
}

/**
 * Check API health
 * @returns {Promise<Object>} - Health check response
 */
export async function checkApiHealth() {
  try {
    const response = await fetch('/api/v1/health', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('API health check failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API health check error:', error);
    throw error;
  }
}