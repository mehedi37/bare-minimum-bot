'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Bug } from 'lucide-react';

/**
 * Debug View component for displaying raw API responses in development
 */
export default function DebugView({ rawResponse }) {
  const [showDebug, setShowDebug] = useState(false);

  // Toggle debug info visibility
  const toggleDebug = () => {
    setShowDebug(!showDebug);
  };

  // Only render if we're in a dev environment and have a response to show
  if (!rawResponse || process.env.NEXT_PUBLIC_DEBUG !== 'true') {
    return null;
  }

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
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
  );
}
