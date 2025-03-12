'use client';

import { useState } from 'react';
import ChatWindow from './components/chat/ChatWindow';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import { useChat } from './contexts/ChatContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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

  return (
    <div className="container mx-auto px-4 py-8 pb-32 min-h-screen max-w-5xl">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            BareMinimum Bot
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Chat with our AI assistant or use the summarization tools to process content.
          </p>
        </div>

        <Card className="flex-1 overflow-hidden">
          <div className="h-full">
            <ChatWindow />
          </div>
        </Card>

        {/* Debug information - collapsible and only shown in development */}
        {process.env.NODE_ENV === 'development' && rawResponse && (
          <Card className="mt-4 mb-12">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleDebug}>
              <h2 className="text-xl font-semibold">Debug: Raw Chat Response</h2>
              <Button variant="ghost" size="sm">
                {showDebug ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </Button>
            </div>
            {showDebug && (
              <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-h-[300px]">
                <pre className="text-xs dark:text-gray-300">{JSON.stringify(rawResponse, null, 2)}</pre>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
