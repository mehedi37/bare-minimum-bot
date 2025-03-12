'use client';

/**
 * Reusable TextArea component
 */
export default function TextArea({
  placeholder = '',
  value,
  onChange,
  id,
  name,
  label = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  fullWidth = false,
  rows = 4,
  maxLength,
  ...props
}) {
  // Base styles
  let textareaClasses = 'px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:ring-blue-600 dark:focus:border-blue-600';

  // Error state
  if (error) {
    textareaClasses = textareaClasses.replace('border-gray-300', 'border-red-500');
    textareaClasses = textareaClasses.replace('focus:ring-blue-500 focus:border-blue-500', 'focus:ring-red-500 focus:border-red-500');
    textareaClasses = textareaClasses.replace('dark:border-gray-700', 'dark:border-red-600');
    textareaClasses = textareaClasses.replace('dark:focus:ring-blue-600 dark:focus:border-blue-600', 'dark:focus:ring-red-600 dark:focus:border-red-600');
  }

  // Width style
  const widthClass = fullWidth ? 'w-full' : '';

  // Combine all styles
  textareaClasses = `${textareaClasses} ${widthClass} ${className}`;

  // Character count
  const charCount = value ? value.length : 0;
  const showCharCount = typeof maxLength !== 'undefined';

  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={textareaClasses}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />

      {showCharCount && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
          {charCount} / {maxLength}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}