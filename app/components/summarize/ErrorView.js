'use client';

/**
 * Error View component for displaying error messages
 */
export default function ErrorView({ error }) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg shadow-sm">
      {error}
    </div>
  );
}
