'use client';

/**
 * Reusable Card component
 */
export default function Card({
  children,
  title = '',
  className = '',
  footer = null,
  ...props
}) {
  // Base styles
  let cardClasses = 'bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700';

  // Combine styles
  if (className) {
    cardClasses = `${cardClasses} ${className}`;
  }

  return (
    <div className={cardClasses} {...props}>
      {title && (
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
      )}

      <div className="p-6">
        {children}
      </div>

      {footer && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
          {footer}
        </div>
      )}
    </div>
  );
}
