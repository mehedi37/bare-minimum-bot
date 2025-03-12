'use client';

import { useState, useRef } from 'react';
import { formatFileSize } from '@/app/utils/formatting';

/**
 * Reusable FileUpload component
 */
export default function FileUpload({
  onChange,
  id,
  name,
  label = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  fullWidth = false,
  accept = '',
  maxSize = 10485760, // 10MB
  ...props
}) {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  // Base styles
  let containerClasses = 'flex flex-col';
  if (fullWidth) containerClasses += ' w-full';
  if (className) containerClasses += ` ${className}`;

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFileError('');

    if (!file) {
      setFileName('');
      setFileSize(0);
      if (onChange) onChange(e);
      return;
    }

    // Check file size
    if (file.size > maxSize) {
      setFileError(`File size exceeds maximum allowed (${formatFileSize(maxSize)})`);
      setFileName('');
      setFileSize(0);
      e.target.value = '';
      return;
    }

    setFileName(file.name);
    setFileSize(file.size);

    if (onChange) onChange(e);
  };

  // Handle click on button
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={containerClasses}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="flex flex-col w-full">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="file"
            ref={fileInputRef}
            id={id}
            name={name}
            onChange={handleFileChange}
            disabled={disabled}
            required={required}
            accept={accept}
            className="hidden"
            {...props}
          />

          <div className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 text-sm truncate dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {fileName ? (
              <div className="flex justify-between">
                <span className="truncate">{fileName}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {formatFileSize(fileSize)}
                </span>
              </div>
            ) : (
              <span>No file selected</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleBrowseClick}
            disabled={disabled}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Browse
          </button>
        </div>

        {(fileError || error) && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">
            {fileError || error}
          </p>
        )}

        {accept && (
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Accepted file types: {accept.split(',').join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}