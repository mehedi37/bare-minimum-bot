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
  const [mounted, setMounted] = useState(false);

  // Check system preference on mount
  useEffect(() => {
    setMounted(true);
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
    if (!mounted) return;

    // Apply theme to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }

    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    console.log('Theme updated:', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, mounted]);

  // Toggle theme
  const toggleTheme = () => {
    console.log('Toggling theme. Current:', isDarkMode ? 'dark' : 'light');
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