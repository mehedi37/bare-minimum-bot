'use client';

import { useState } from 'react';
import ChatWindow from './components/chat/ChatWindow';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import { useChat } from './contexts/ChatContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Bug } from 'lucide-react';

export default function Home() {
  const { messages, isLoading, sendMessage, clearMessages, rawResponse } = useChat();
  const [showDebug, setShowDebug] = useState(false);

  // Handle clear chat button click
  const handleClearChat = () => {
    clearMessages();
  };

  // Toggle debug info visibility
  const toggleDebug = () => {
    setShowDebug(!showDebug);
  };

  // Check if we should show debug info
  const isDevEnvironment = (process.env.NEXT_PUBLIC_DEBUG === 'true');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          BareMinimum Bot
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Chat with our AI assistant or use the summarization tools to process content.
        </p>
      </div>

      <Card className="flex-1 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
        <div className="h-full">
          <ChatWindow />
        </div>
      </Card>

      {/* Debug information - collapsible and only shown in development */}
      {isDevEnvironment && rawResponse && (
        <Card className="mt-6 mb-12 shadow-sm border border-gray-200 dark:border-gray-800">
          <div
            className="flex justify-between items-center cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-150"
            onClick={toggleDebug}
          >
            <h2 className="text-xl font-semibold">
            <p className='flex'><Bug className='mx-2' color="orange" size={28} /> Debug: Raw API Response</p>
            </h2>
            <Button variant="ghost" size="sm">
              {showDebug ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
            </Button>
          </div>
          {showDebug && (
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md m-4 overflow-auto max-h-[300px]">
              <pre className="text-xs whitespace-pre-wrap dark:text-gray-300">{JSON.stringify(rawResponse, null, 2)}</pre>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
