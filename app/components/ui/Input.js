'use client';

/**
 * Reusable Input component
 */
export default function Input({
  type = 'text',
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
  ...props
}) {
  // Base styles
  let inputClasses = 'px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:ring-blue-600 dark:focus:border-blue-600';

  // Error state
  if (error) {
    inputClasses = inputClasses.replace('border-gray-300', 'border-red-500');
    inputClasses = inputClasses.replace('focus:ring-blue-500 focus:border-blue-500', 'focus:ring-red-500 focus:border-red-500');
    inputClasses = inputClasses.replace('dark:border-gray-700', 'dark:border-red-600');
    inputClasses = inputClasses.replace('dark:focus:ring-blue-600 dark:focus:border-blue-600', 'dark:focus:ring-red-600 dark:focus:border-red-600');
  }

  // Width style
  const widthClass = fullWidth ? 'w-full' : '';

  // Combine all styles
  inputClasses = `${inputClasses} ${widthClass} ${className}`;

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

      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}