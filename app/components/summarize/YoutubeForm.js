'use client';

import { useState } from 'react';
import { useSummarize } from '../../contexts/SummarizeContext';
import {
  OUTPUT_TYPES,
  SUMMARY_LENGTHS,
  SUMMARY_STYLES,
  DEFAULT_QUIZ_QUESTIONS
} from '../../utils/constants';
import { isValidYouTubeUrl } from '../../utils/validation';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

/**
 * Form for summarizing YouTube videos
 */
export default function YoutubeForm() {
  // Form state
  const [videoUrl, setVideoUrl] = useState('');
  const [outputType, setOutputType] = useState('summary');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryStyle, setSummaryStyle] = useState('narrative');
  const [includeTimestamps, setIncludeTimestamps] = useState(true);
  const [focusTopics, setFocusTopics] = useState('');
  const [numQuizQuestions, setNumQuizQuestions] = useState(DEFAULT_QUIZ_QUESTIONS);

  // Form validation
  const [urlError, setUrlError] = useState('');

  // Get summarize context
  const { summarizeYoutubeVideo, isLoading } = useSummarize();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!isValidYouTubeUrl(videoUrl)) {
      setUrlError('Please enter a valid YouTube URL');
      return;
    }

    // Clear validation errors
    setUrlError('');

    // Create FormData object for API submission
    const formData = new FormData();
    formData.append('video_url', videoUrl);
    formData.append('output_type', outputType);
    formData.append('summary_length', summaryLength);
    formData.append('summary_style', summaryStyle);
    formData.append('include_timestamps', includeTimestamps.toString());

    if (focusTopics.trim()) {
      formData.append('focus_topics', focusTopics.trim());
    }

    if (outputType === 'quiz') {
      formData.append('num_quiz_questions', numQuizQuestions.toString());
    }

    // Call API
    await summarizeYoutubeVideo(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* YouTube URL */}
      <Input
        id="video-url"
        name="video-url"
        label="YouTube URL"
        placeholder="https://www.youtube.com/watch?v=..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        error={urlError}
        disabled={isLoading}
        required
        fullWidth
      />

      {/* Output type */}
      <Select
        id="output-type"
        name="output-type"
        label="Output Type"
        options={OUTPUT_TYPES}
        value={outputType}
        onChange={(e) => setOutputType(e.target.value)}
        disabled={isLoading}
        fullWidth
      />

      {/* Summary options (when output type is summary) */}
      {outputType === 'summary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Summary length */}
            <Select
              id="summary-length"
              name="summary-length"
              label="Summary Length"
              options={SUMMARY_LENGTHS}
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
              disabled={isLoading}
              fullWidth
            />

            {/* Summary style */}
            <Select
              id="summary-style"
              name="summary-style"
              label="Summary Style"
              options={SUMMARY_STYLES}
              value={summaryStyle}
              onChange={(e) => setSummaryStyle(e.target.value)}
              disabled={isLoading}
              fullWidth
            />
          </div>

          {/* Include timestamps */}
          <Checkbox
            id="include-timestamps"
            name="include-timestamps"
            label="Include timestamps in the summary"
            checked={includeTimestamps}
            onChange={(e) => setIncludeTimestamps(e.target.checked)}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Quiz options (when output type is quiz) */}
      {outputType === 'quiz' && (
        <div className="space-y-4">
          <Input
            id="num-quiz-questions"
            name="num-quiz-questions"
            label="Number of Quiz Questions"
            type="number"
            min="1"
            max="20"
            value={numQuizQuestions}
            onChange={(e) => setNumQuizQuestions(parseInt(e.target.value))}
            disabled={isLoading}
            fullWidth
          />
        </div>
      )}

      {/* Focus topics (optional) */}
      <Input
        id="focus-topics"
        name="focus-topics"
        label="Focus Topics (optional)"
        placeholder="Comma-separated list of topics to focus on"
        value={focusTopics}
        onChange={(e) => setFocusTopics(e.target.value)}
        disabled={isLoading}
        fullWidth
      />

      {/* Submit button */}
      <Button
        type="submit"
        disabled={isLoading}
        fullWidth
      >
        {isLoading ? 'Processing...' : 'Summarize Video'}
      </Button>
    </form>
  );
}