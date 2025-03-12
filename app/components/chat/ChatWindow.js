'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatContext';
import Message from './Message';
import ChatInput from './ChatInput';

/**
 * Chat window component to display messages
 */
export default function ChatWindow() {
  const { messages, isLoading, error } = useChat();
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <svg
              className="w-12 h-12 text-gray-400 mb-4 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Start a conversation by sending a message below.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message
              key={message.id || index}
              message={message}
              isLastMessage={index === messages.length - 1}
            />
          ))
        )}

        {/* Show loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2 dark:bg-gray-800 dark:text-gray-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Show error message */}
        {error && (
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 text-red-800 rounded-lg px-4 py-2 dark:bg-red-900 dark:text-red-100">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <ChatInput />
    </div>
  );
}
