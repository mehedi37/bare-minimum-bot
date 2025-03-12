'use client';

import Card from '../ui/Card';

/**
 * Common Quiz component for all quiz types (YouTube, PDF, Text)
 * Displays quiz questions, options, and explanations in a consistent format
 */
export default function Quiz({ quiz, sourceType }) {
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Quiz</h2>
        <div className="space-y-8">
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 text-purple-500 dark:text-lime-300">
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
              {/* Common source info */}
              {quiz.source_info.title && (
                <p className="mb-2"><span className="font-medium">Title:</span> {quiz.source_info.title}</p>
              )}

              {/* YouTube specific source info */}
              {sourceType === 'youtube' && (
                <>
                  {quiz.source_info.url && (
                    <p className="mb-2"><span className="font-medium">URL:</span>
                      <a href={quiz.source_info.url} target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 hover:underline dark:text-blue-400 ml-1">
                        {quiz.source_info.url}
                      </a>
                    </p>
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
                </>
              )}

              {/* PDF specific source info */}
              {sourceType === 'pdf' && (
                <>
                  {quiz.source_info.pages && (
                    <p className="mb-2"><span className="font-medium">Pages:</span> {quiz.source_info.pages}</p>
                  )}
                  {quiz.source_info.size && (
                    <p className="mb-2"><span className="font-medium">Size:</span> {Math.round(quiz.source_info.size / 1024)} KB</p>
                  )}
                  {quiz.source_info.last_modified && (
                    <p><span className="font-medium">Last Modified:</span> {new Date(quiz.source_info.last_modified).toLocaleString()}</p>
                  )}
                </>
              )}

              {/* Text specific source info */}
              {sourceType === 'text' && (
                <>
                  {quiz.source_info.word_count && (
                    <p className="mb-2"><span className="font-medium">Word Count:</span> {quiz.source_info.word_count}</p>
                  )}
                  {quiz.source_info.character_count && (
                    <p><span className="font-medium">Character Count:</span> {quiz.source_info.character_count}</p>
                  )}
                </>
              )}

              {/* Author info (common for all types) */}
              {quiz.source_info.author && (
                <p className="mb-2"><span className="font-medium">Author:</span> {quiz.source_info.author}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
