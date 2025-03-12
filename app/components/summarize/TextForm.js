'use client';

import { useState } from 'react';
import { useSummarize } from '../../contexts/SummarizeContext';
import {
  OUTPUT_TYPES,
  SUMMARY_LENGTHS,
  SUMMARY_STYLES,
  DEFAULT_QUIZ_QUESTIONS,
  MAX_MESSAGE_LENGTH
} from '../../utils/constants';
import { isValidText } from '../../utils/validation';
import TextArea from '../ui/TextArea';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

/**
 * Form for summarizing text content
 */
export default function TextForm() {
  // Form state
  const [text, setText] = useState('');
  const [outputType, setOutputType] = useState('summary');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryStyle, setSummaryStyle] = useState('narrative');
  const [focusTopics, setFocusTopics] = useState('');
  const [numQuizQuestions, setNumQuizQuestions] = useState(DEFAULT_QUIZ_QUESTIONS);

  // Form validation
  const [textError, setTextError] = useState('');

  // Get summarize context
  const { summarizeTextContent, isLoading } = useSummarize();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!isValidText(text)) {
      setTextError('Please enter some text to summarize');
      return;
    }

    // Clear validation errors
    setTextError('');

    // Create FormData object for API submission
    const formData = new FormData();
    formData.append('text', text);
    formData.append('output_type', outputType);
    formData.append('summary_length', summaryLength);
    formData.append('summary_style', summaryStyle);

    if (focusTopics.trim()) {
      formData.append('focus_topics', focusTopics.trim());
    }

    if (outputType === 'quiz') {
      formData.append('num_quiz_questions', numQuizQuestions.toString());
    }

    // Call API
    await summarizeTextContent(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Text Content */}
      <TextArea
        id="text-content"
        name="text-content"
        label="Text Content"
        placeholder="Enter or paste the text you want to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        error={textError}
        disabled={isLoading}
        required
        fullWidth
        rows={8}
        maxLength={MAX_MESSAGE_LENGTH * 5}
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
        {isLoading ? 'Processing...' : 'Summarize Text'}
      </Button>
    </form>
  );
}