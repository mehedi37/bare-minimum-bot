'use client';

import { useState } from 'react';
import { useSummarize } from '@/app/contexts/SummarizeContext';
import YoutubeForm from '@/app/components/summarize/YoutubeForm';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { ChevronLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Bug, Video } from 'lucide-react';

/**
 * YouTube Summarization Page
 * This page allows users to input YouTube video URLs and generate summaries or quizzes
 */
export default function YoutubeSummarizePage() {
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

  // Check if we should show debug info
  const isDevEnvironment = (process.env.NEXT_PUBLIC_DEBUG === 'true');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          <p className='flex'><Video className='me-2' color="green" size="42"/>YouTube Summarizer</p>
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
            Enter a YouTube video URL and get a concise summary or a quiz based on its content.
          </p>
          <Card className="shadow-sm hover:shadow transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
            <YoutubeForm />
          </Card>
        </>
      ) : (
        <div className="space-y-6 mb-20">
          {error && (
            <div className="bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          {/* Debug information - collapsible and only shown in development */}
          {isDevEnvironment && rawResponse && (
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
          )}

          {summary && (
            <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Summary</h2>
                <div className="prose max-w-none dark:prose-invert">
                  <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{summary.summary}</p>
                </div>

                {/* Handle both sections and timestamps arrays */}
                {((summary.sections && summary.sections.length > 0) ||
                  (summary.timestamps && summary.timestamps.length > 0)) && (
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Key Moments</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      {summary.sections && summary.sections.map((section, index) => (
                        <li key={`section-${index}`}>
                          <span className="font-medium">{section.time}:</span> {section.text}
                        </li>
                      ))}
                      {summary.timestamps && summary.timestamps.map((timestamp, index) => (
                        <li key={`timestamp-${index}`}>
                          <span className="font-medium">{timestamp.time}:</span> {timestamp.description || timestamp.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {summary.key_points && summary.key_points.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Key Points</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      {summary.key_points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {summary.source_info && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-medium mb-4">Source</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {summary.source_info.title && (
                        <p className="mb-2"><span className="font-medium">Title:</span> {summary.source_info.title}</p>
                      )}
                      {summary.source_info.url && (
                        <p className="mb-2"><span className="font-medium">URL:</span> <a href={summary.source_info.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">{summary.source_info.url}</a></p>
                      )}
                      {summary.source_info.duration && (
                        <p className="mb-2"><span className="font-medium">Duration:</span> {summary.source_info.duration}</p>
                      )}
                      {summary.source_info.channel && (
                        <p className="mb-2"><span className="font-medium">Channel:</span> {summary.source_info.channel}</p>
                      )}
                      {summary.source_info.published && (
                        <p><span className="font-medium">Published:</span> {summary.source_info.published}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {quiz && (
            <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Quiz</h2>
                <div className="space-y-8">
                  {quiz.questions && quiz.questions.map((q, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-medium mb-4">
                        {qIndex + 1}. {q.question}
                      </h3>
                      <div className="space-y-3 mb-6">
                        {q.options && q.options.map((option, oIndex) => (
                          <div
                            key={oIndex}
                            className={`p-4 rounded-lg ${
                              q.correct_answer === oIndex
                                ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800'
                                : 'bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                            } transition-colors duration-150`}
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
                        <div className="bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 p-4 rounded-lg">
                          <span className="font-medium">Explanation:</span> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {quiz.source_info && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-medium mb-4">Source</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {quiz.source_info.title && (
                        <p className="mb-2"><span className="font-medium">Title:</span> {quiz.source_info.title}</p>
                      )}
                      {quiz.source_info.url && (
                        <p className="mb-2"><span className="font-medium">URL:</span> <a href={quiz.source_info.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">{quiz.source_info.url}</a></p>
                      )}
                      {quiz.source_info.duration && (
                        <p className="mb-2"><span className="font-medium">Duration:</span> {quiz.source_info.duration}</p>
                      )}
                      {quiz.source_info.channel && (
                        <p className="mb-2"><span className="font-medium">Channel:</span> {quiz.source_info.channel}</p>
                      )}
                      {quiz.source_info.published && (
                        <p><span className="font-medium">Published:</span> {quiz.source_info.published}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}