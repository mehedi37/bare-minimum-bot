'use client';

import { useRouter } from 'next/navigation';
import Card from '@/app/components/ui/Card';
import {
  DocumentTextIcon,
  DocumentIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

/**
 * Summarization Landing Page
 * Displays options for different types of content summarization
 */
export default function SummarizePage() {
  const router = useRouter();

  // Summarization options
  const options = [
    {
      title: 'Text',
      description: 'Summarize or create a quiz from text that you provide',
      icon: DocumentTextIcon,
      path: '/summarize/text',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'PDF',
      description: 'Upload a PDF document to summarize or create a quiz',
      icon: DocumentIcon,
      path: '/summarize/pdf',
      color: 'bg-red-50 text-red-700',
    },
    {
      title: 'YouTube',
      description: 'Enter a YouTube video URL to summarize or create a quiz',
      icon: VideoCameraIcon,
      path: '/summarize/youtube',
      color: 'bg-green-50 text-green-700',
    },
  ];

  // Navigate to selected option
  const handleOptionClick = (path) => {
    router.push(path);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Content Summarization</h1>
      <p className="text-gray-600 mb-8">
        Choose the type of content you want to summarize or create a quiz from.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <Card
            key={option.title}
            className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-md"
            onClick={() => handleOptionClick(option.path)}
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className={`${option.color} p-3 rounded-full mb-4`}>
                <option.icon className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{option.title}</h2>
              <p className="text-gray-600">{option.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}