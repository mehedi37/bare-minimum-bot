'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

/**
 * Provider component for theme functionality
 */
export function ThemeProvider({ children }) {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference on mount
  useEffect(() => {
    // Check if dark mode is preferred
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      // Use saved preference
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Use system preference
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  // Update document class when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // The context value object
  const value = {
    isDarkMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook for using the theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}