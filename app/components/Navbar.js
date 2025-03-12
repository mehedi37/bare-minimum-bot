'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Navbar component for the application
 */
export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine if a path is active (exact match or starts with path for nested routes)
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                BareMinimum
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  isActive('/')
                    ? 'border-blue-500 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } text-sm font-medium transition-colors duration-200`}
              >
                Chat
              </Link>

              <Link
                href="/summarize"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  isActive('/summarize')
                    ? 'border-blue-500 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } text-sm font-medium transition-colors duration-200`}
              >
                Summarize
              </Link>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center">
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              isActive('/')
                ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
            } text-base font-medium`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Chat
          </Link>

          <Link
            href="/summarize"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              isActive('/summarize')
                ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
            } text-base font-medium`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Summarize
          </Link>
        </div>
      </div>
    </nav>
  );
}

