'use client';

import Card from '../ui/Card';

/**
 * Common Summary View component for all summarization types
 * Displays the summary, key points, and source information in a consistent format
 */
export default function SummaryView({ summary, sourceType }) {
  if (!summary) return null;

  return (
    <Card className="shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Summary</h2>
        <div className="prose max-w-none dark:prose-invert">
          <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{summary.summary}</p>
        </div>

        {/* YouTube specific: Key Moments section */}
        {sourceType === 'youtube' && ((summary.sections && summary.sections.length > 0) ||
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

        {/* Common: Key Points section */}
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

        {/* Source Information section */}
        {summary.source_info && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-medium mb-4">Source</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {/* Common source info */}
              {summary.source_info.title && (
                <p className="mb-2"><span className="font-medium">Title:</span> {summary.source_info.title}</p>
              )}

              {/* YouTube specific source info */}
              {sourceType === 'youtube' && (
                <>
                  {summary.source_info.url && (
                    <p className="mb-2">
                      <span className="font-medium">URL:</span>{' '}
                      <a href={summary.source_info.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                        {summary.source_info.url}
                      </a>
                    </p>
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
                </>
              )}

              {/* PDF specific source info */}
              {sourceType === 'pdf' && (
                <>
                  {summary.source_info.pages && (
                    <p className="mb-2"><span className="font-medium">Pages:</span> {summary.source_info.pages}</p>
                  )}
                  {summary.source_info.size && (
                    <p className="mb-2"><span className="font-medium">Size:</span> {Math.round(summary.source_info.size / 1024)} KB</p>
                  )}
                  {summary.source_info.last_modified && (
                    <p><span className="font-medium">Last Modified:</span> {new Date(summary.source_info.last_modified).toLocaleString()}</p>
                  )}
                </>
              )}

              {/* Text specific source info */}
              {sourceType === 'text' && (
                <>
                  {summary.source_info.word_count && (
                    <p className="mb-2"><span className="font-medium">Word Count:</span> {summary.source_info.word_count}</p>
                  )}
                  {summary.source_info.character_count && (
                    <p><span className="font-medium">Character Count:</span> {summary.source_info.character_count}</p>
                  )}
                </>
              )}

              {/* Author info (common for all types) */}
              {summary.source_info.author && (
                <p className="mb-2"><span className="font-medium">Author:</span> {summary.source_info.author}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
