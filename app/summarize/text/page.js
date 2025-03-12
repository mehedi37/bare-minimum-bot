'use client';

import { useSummarize } from '@/app/contexts/SummarizeContext';
import TextForm from '@/app/components/summarize/TextForm';
import Quiz from '@/app/components/summarize/Quiz';
import SummaryView from '@/app/components/summarize/SummaryView';
import DebugView from '@/app/components/summarize/DebugView';
import ErrorView from '@/app/components/summarize/ErrorView';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { FileText } from 'lucide-react';

/**
 * Text Summarization Page
 * This page allows users to input text and generate summaries or quizzes
 */
export default function TextSummarizePage() {
  const { summary, quiz, isLoading, error, clearSummary, rawResponse } = useSummarize();

  // Handle back button click
  const handleBack = () => {
    clearSummary();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          <p className='flex'><FileText className='me-2' color="orange" size="40"/>Text Summarizer</p>
        </h1>

        {(summary || quiz) && (
          <Button
            onClick={handleBack}
            className="flex items-center"
            variant="outline"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" /> Back
          </Button>
        )}
      </div>

      {!summary && !quiz ? (
        <>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Enter your text and get a concise summary or a quiz based on its content.
          </p>
          <Card className="shadow-sm hover:shadow transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
            <TextForm />
          </Card>
        </>
      ) : (
        <div className="space-y-6 mb-20">
          <ErrorView error={error} />
          <DebugView rawResponse={rawResponse} />
          {summary && <SummaryView summary={summary} sourceType="text" />}
          {quiz && <Quiz quiz={quiz} sourceType="text" />}
        </div>
      )}
    </div>
  );
}