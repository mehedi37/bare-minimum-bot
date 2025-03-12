'use client';

import { useState } from 'react';
import { useSummarize } from '../../contexts/SummarizeContext';
import {
  OUTPUT_TYPES,
  SUMMARY_LENGTHS,
  SUMMARY_STYLES,
  DEFAULT_QUIZ_QUESTIONS
} from '../../utils/constants';
import { isValidPdfFile, isValidPageRange } from '../../utils/validation';
import FileUpload from '../ui/FileUpload';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

/**
 * Form for summarizing PDF documents
 */
export default function PdfForm() {
  // Form state
  const [file, setFile] = useState(null);
  const [outputType, setOutputType] = useState('summary');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [summaryStyle, setSummaryStyle] = useState('narrative');
  const [pageRange, setPageRange] = useState('');
  const [focusTopics, setFocusTopics] = useState('');
  const [numQuizQuestions, setNumQuizQuestions] = useState(DEFAULT_QUIZ_QUESTIONS);

  // Form validation
  const [fileError, setFileError] = useState('');
  const [pageRangeError, setPageRangeError] = useState('');

  // Get summarize context
  const { summarizePdfDocument, isLoading } = useSummarize();

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Validate file type
    if (selectedFile && !isValidPdfFile(selectedFile)) {
      setFileError('Please upload a valid PDF file');
    } else {
      setFileError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    let hasError = false;

    if (!file) {
      setFileError('Please select a PDF file');
      hasError = true;
    } else if (!isValidPdfFile(file)) {
      setFileError('Please upload a valid PDF file');
      hasError = true;
    } else {
      setFileError('');
    }

    if (pageRange && !isValidPageRange(pageRange)) {
      setPageRangeError('Please enter a valid page range (e.g., "1-5,10,15-20")');
      hasError = true;
    } else {
      setPageRangeError('');
    }

    if (hasError) return;

    // Call API
    await summarizePdfDocument({
      file,
      outputType,
      summaryLength,
      summaryStyle,
      pageRange: pageRange.trim() || null,
      focusTopics: focusTopics.trim() || null,
      numQuizQuestions: outputType === 'quiz' ? numQuizQuestions : null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PDF File Upload */}
      <FileUpload
        id="pdf-file"
        name="pdf-file"
        label="PDF Document"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        error={fileError}
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

          {/* Page range */}
          <Input
            id="page-range"
            name="page-range"
            label="Page Range (optional)"
            placeholder="e.g., 1-5,10,15-20"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            error={pageRangeError}
            disabled={isLoading}
            fullWidth
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

          {/* Page range for quiz */}
          <Input
            id="page-range-quiz"
            name="page-range-quiz"
            label="Page Range (optional)"
            placeholder="e.g., 1-5,10,15-20"
            value={pageRange}
            onChange={(e) => setPageRange(e.target.value)}
            error={pageRangeError}
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
        {isLoading ? 'Processing...' : 'Summarize PDF'}
      </Button>
    </form>
  );
}