'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ChatContext = createContext();

// Custom hook to use the context
export function useChat() {
  return useContext(ChatContext);
}

/**
 * Provider component for chat functionality
 */
export function ChatProvider({ children }) {
  // Chat state
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null); // For debugging

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (err) {
        console.error('Error parsing saved messages:', err);
        localStorage.removeItem('chatMessages');
      }
    }
  }, []);

  // Save messages to localStorage when updated
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  /**
   * Send a message to the API
   */
  const sendMessage = async (messageText) => {
    if (!messageText || messageText.trim() === '') {
      return;
    }

    // Create user message
    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    // Add user message to state
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);
    setRawResponse(null);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('message', messageText);

      // Debug log
      console.log('Sending message:', messageText);

      // Send request to API (using local API route)
      const response = await fetch(`/api/v1/chat/message`, {
        method: 'POST',
        body: formData,
      });

      console.log('Chat API Response Status:', response.status);

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
      setRawResponse(data);
      console.log('Chat API Response Data:', JSON.stringify(data, null, 2));

      // Add bot message to state
      if (data.message) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      } else {
        console.warn('No message in response:', data);
        // Try to handle alternative formats
        if (data.content && data.role) {
          setMessages((prevMessages) => [...prevMessages, data]);
        } else if (typeof data === 'string') {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'assistant',
              content: data,
              timestamp: new Date().toISOString(),
            },
          ]);
        }
      }

      // Update suggestions if available
      if (data.suggestions && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'An error occurred while sending your message');

      // Add error message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'system',
          content: `Error: ${err.message || 'Something went wrong. Please try again later.'}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear all messages
   */
  const clearMessages = () => {
    setMessages([]);
    setSuggestions([]);
    setRawResponse(null);
    localStorage.removeItem('chatMessages');
  };

  // Context value
  const value = {
    messages,
    suggestions,
    isLoading,
    error,
    rawResponse,
    sendMessage,
    clearMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}