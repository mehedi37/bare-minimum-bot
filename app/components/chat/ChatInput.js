'use client';

import { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { MAX_MESSAGE_LENGTH } from '../../utils/constants';

/**
 * Chat input component for sending messages
 */
export default function ChatInput() {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading, suggestions } = useChat();

  // Character count
  const charCount = message.length;
  const isMaxLength = charCount >= MAX_MESSAGE_LENGTH;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || isLoading) return;

    // Send message
    await sendMessage(message);

    // Clear input
    setMessage('');
  };

  // Handle click on suggestion
  const handleSuggestionClick = (suggestion) => {
    if (isLoading) return;

    sendMessage(suggestion);
  };

  return (
    <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 py-4">
      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="mb-4 px-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isLoading}
              className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="px-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={1}
            maxLength={MAX_MESSAGE_LENGTH}
            disabled={isLoading}
            className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-600 dark:focus:border-blue-600"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          {/* Character count */}
          {message.length > 0 && (
            <div
              className={`absolute right-14 bottom-2 text-xs ${
                isMaxLength ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {charCount}/{MAX_MESSAGE_LENGTH}
            </div>
          )}

          {/* Send button */}
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="absolute right-2 bottom-2 p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed dark:text-blue-400 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Send message</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}