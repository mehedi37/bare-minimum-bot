'use client';

import { useState } from 'react';
import { formatDate, markdownToHtml } from '../../utils/formatting';
import { DEFAULT_BOT_NAME, DEFAULT_USER_NAME } from '../../utils/constants';

/**
 * Chat message component
 */
export default function Message({
  message,
  isLastMessage = false,
}) {
  const { role, content, timestamp } = message;
  const isBot = role === 'bot';
  const isUser = role === 'user';
  const isSystem = role === 'system';

  // Format date
  const formattedDate = timestamp ? formatDate(timestamp) : '';

  // Convert markdown to HTML (for bot messages)
  const messageContent = isBot ? markdownToHtml(content) : content;

  return (
    <div
      className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4 ${isLastMessage ? 'animate-fadeIn' : ''}`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] px-4 py-3 rounded-lg ${
          isBot
            ? 'bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-800 dark:text-gray-100'
            : isUser
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 w-full max-w-full'
        }`}
      >
        {/* Message header */}
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-xs">
            {isBot
              ? DEFAULT_BOT_NAME
              : isUser
                ? DEFAULT_USER_NAME
                : 'System'}
          </span>
          {timestamp && (
            <span className="text-xs opacity-70">{formattedDate}</span>
          )}
        </div>

        {/* Message content */}
        {isBot ? (
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: messageContent }}
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
}