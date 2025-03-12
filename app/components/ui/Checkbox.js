'use client';

/**
 * Reusable Checkbox component
 */
export default function Checkbox({
  checked,
  onChange,
  id,
  name,
  label = '',
  error = '',
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  // Base styles for container
  const containerClasses = `flex items-center ${className}`;

  // Base styles for checkbox
  let checkboxClasses = 'h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-blue-600';

  // Error state
  if (error) {
    checkboxClasses = checkboxClasses.replace('border-gray-300', 'border-red-500');
    checkboxClasses = checkboxClasses.replace('focus:ring-blue-500', 'focus:ring-red-500');
    checkboxClasses = checkboxClasses.replace('dark:border-gray-600', 'dark:border-red-600');
    checkboxClasses = checkboxClasses.replace('dark:focus:ring-blue-600', 'dark:focus:ring-red-600');
  }

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={checkboxClasses}
          {...props}
        />

        {label && (
          <label
            htmlFor={id}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}