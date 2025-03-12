'use client';

import { useState } from 'react';
import { useSummarize } from '@/app/contexts/SummarizeContext';
import PdfForm from '@/app/components/summarize/PdfForm';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

/**
 * PDF Summarization Page
 * This page allows users to upload PDF files and generate summaries or quizzes
 */
export default function PDFSummarizePage() {
  const { summary, quiz, isLoading, error, clearSummary, rawResponse } = useSummarize();
  const [showDebug, setShowDebug] = useState(false);

  // Handle back button click
  const handleBack = () => {
    clearSummary();
  };

  // Toggle debug info visibility
  const toggleDebug = () => {
    setShowDebug(!showDebug);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-32 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">PDF Summarizer</h1>

      {(summary || quiz) && (
        <Button
          onClick={handleBack}
          className="mb-6 flex items-center"
          variant="outline"
        >
          <ChevronLeftIcon className="h-4 w-4 mr-2" /> Back
        </Button>
      )}

      {!summary && !quiz ? (
        <>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Upload a PDF document and get a concise summary or a quiz based on its content.
          </p>
          <Card>
            <PdfForm />
          </Card>
        </>
      ) : (
        <div className="space-y-6 mb-20">
          {error && (
            <div className="bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Debug information - collapsible and only shown in development */}
          {process.env.NODE_ENV === 'development' && rawResponse && (
            <Card>
              <div className="flex justify-between items-center cursor-pointer" onClick={toggleDebug}>
                <h2 className="text-xl font-semibold">Debug: Raw API Response</h2>
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

          {summary && (
            <Card>
              <h2 className="text-xl font-semibold mb-4">Summary</h2>
              <div className="prose max-w-none dark:prose-invert">
                <p className="whitespace-pre-wrap">{summary.summary}</p>
              </div>

              {summary.key_points && summary.key_points.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Key Points</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {summary.key_points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.source_info && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-3">Source</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {summary.source_info.title && (
                      <p><span className="font-medium">Title:</span> {summary.source_info.title}</p>
                    )}
                    {summary.source_info.pages && (
                      <p><span className="font-medium">Pages:</span> {summary.source_info.pages}</p>
                    )}
                    {summary.source_info.size && (
                      <p><span className="font-medium">Size:</span> {Math.round(summary.source_info.size / 1024)} KB</p>
                    )}
                    {summary.source_info.last_modified && (
                      <p><span className="font-medium">Last Modified:</span> {new Date(summary.source_info.last_modified).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )}

          {quiz && (
            <Card>
              <h2 className="text-xl font-semibold mb-4">Quiz</h2>
              <div className="space-y-8">
                {quiz.questions && quiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">
                      {qIndex + 1}. {q.question}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {q.options && q.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={`p-3 rounded-md ${
                            q.correct_answer === oIndex
                              ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800'
                              : 'bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                          }`}
                        >
                          <span className={q.correct_answer === oIndex ? 'font-medium' : ''}>
                            {option}
                          </span>
                          {q.correct_answer === oIndex && (
                            <span className="ml-2 text-green-700 dark:text-green-400 text-sm">✓ Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                    {q.explanation && (
                      <div className="bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 p-3 rounded-md">
                        <span className="font-medium">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {quiz.source_info && (
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-3">Source</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {quiz.source_info.title && (
                      <p><span className="font-medium">Title:</span> {quiz.source_info.title}</p>
                    )}
                    {quiz.source_info.pages && (
                      <p><span className="font-medium">Pages:</span> {quiz.source_info.pages}</p>
                    )}
                    {quiz.source_info.size && (
                      <p><span className="font-medium">Size:</span> {Math.round(quiz.source_info.size / 1024)} KB</p>
                    )}
                    {quiz.source_info.last_modified && (
                      <p><span className="font-medium">Last Modified:</span> {new Date(quiz.source_info.last_modified).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}