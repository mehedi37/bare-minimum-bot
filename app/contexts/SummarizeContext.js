'use client';

import { createContext, useContext, useState } from 'react';

// Create the summarize context
const SummarizeContext = createContext();

/**
 * Custom hook to use the context
 */
export function useSummarize() {
  return useContext(SummarizeContext);
}

/**
 * Provider component for summarization functionality
 */
export function SummarizeProvider({ children }) {
  // State for all summarization types
  const [summary, setSummary] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sourceType, setSourceType] = useState(null);
  const [sourceInfo, setSourceInfo] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  // Reset state
  const resetState = () => {
    setSummary(null);
    setQuiz(null);
    setError('');
    setSourceType(null);
    setSourceInfo(null);
    setRawResponse(null);
  };

  /**
   * Process API response to set the appropriate state
   */
  const processApiResponse = (data) => {
    console.log('API Response:', data);
    setRawResponse(data);

    // Store the raw response for debugging
    if (!data) {
      setError('No data received from API');
      return;
    }

    // Check if the data is a summary response
    if (data.summary || (data.content && data.source_type)) {
      // Handle both possible formats from the API
      const summaryData = {
        summary: data.summary || data.content,
        source_type: data.source_type,
        source_info: data.source_info || {},
        timestamp: data.timestamp || new Date().toISOString(),
        key_points: data.key_points || [],
        metadata: data.metadata || {}
      };

      // Handle sections/timestamps for YouTube videos
      if (data.sections) {
        summaryData.sections = data.sections;
      }

      // Handle alternative format (backward compatibility)
      if (data.timestamps) {
        summaryData.timestamps = data.timestamps;
      }

      setSummary(summaryData);
      setSourceType(data.source_type);
      setSourceInfo(data.source_info);
      return;
    }

    // Check if the data is a quiz response
    if (data.questions || data.quiz) {
      // Handle both possible formats from the API
      const quizData = {
        questions: data.questions || data.quiz || [],
        source_type: data.source_type,
        source_info: data.source_info || {},
        timestamp: data.timestamp || new Date().toISOString(),
        metadata: data.metadata || {}
      };

      setQuiz(quizData);
      setSourceType(data.source_type);
      setSourceInfo(data.source_info);
      return;
    }

    // If we got here, we don't recognize the response format
    setError('Unrecognized response format from API. Check console for details.');
    console.error('Unrecognized API response format:', data);
  };

  /**
   * Generic API call function to reduce duplication
   */
  const callSummarizeApi = async (endpoint, formData) => {
    try {
      setIsLoading(true);
      setError('');
      setSummary(null);
      setQuiz(null);
      setRawResponse(null);

      // Ensure formData is properly prepared
      let apiFormData = formData instanceof FormData ? formData : new FormData();

      // If we received an object, convert it to FormData
      if (!(formData instanceof FormData)) {
        for (const key in formData) {
          if (formData[key] !== null && formData[key] !== undefined) {
            apiFormData.append(key, formData[key]);
          }
        }
      }

      // Debug the formData contents
      console.log(`${endpoint} form data being sent:`);
      for (const [key, value] of apiFormData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch(`/api/v1/summarize/${endpoint}`, {
        method: 'POST',
        body: apiFormData,
      });

      console.log(`${endpoint} API Response Status:`, response.status);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { detail: await response.text() };
        }
        throw new Error(errorData.detail || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      processApiResponse(data);
    } catch (err) {
      setError(err.message || `An error occurred while processing ${endpoint}`);
      console.error(`${endpoint} summarization error:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified API functions using the generic helper
  const summarizeYoutubeVideo = async (formData) => {
    await callSummarizeApi('youtube', formData);
  };

  const summarizePdfDocument = async (formData) => {
    await callSummarizeApi('pdf', formData);
  };

  const summarizeTextContent = async (formData) => {
    await callSummarizeApi('text', formData);
  };

  // Clear the summarization results
  const clearSummary = () => {
    resetState();
    setError('');
  };

  // The context value object
  const value = {
    summary,
    quiz,
    isLoading,
    error,
    sourceType,
    sourceInfo,
    rawResponse,  // Expose raw response for debugging
    clearSummary,
    summarizeYoutubeVideo,
    summarizePdfDocument,
    summarizeTextContent,
  };

  return <SummarizeContext.Provider value={value}>{children}</SummarizeContext.Provider>;
}