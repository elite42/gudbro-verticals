'use client';

/**
 * ThemeToggle Component
 *
 * Allows users to switch between light and dark themes
 * Displays a sun icon for light mode and moon icon for dark mode
 */

import React from 'react';
import { useTheme } from '@/lib/theme/theme-context';

export function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full flex items-center justify-center bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-theme-interactive-primary focus:ring-offset-2"
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon (light mode) */}
      {themeMode === 'light' && (
        <svg
          className="w-6 h-6 text-theme-text-primary transition-transform duration-300 animate-fade-in"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}

      {/* Moon icon (dark mode) */}
      {themeMode === 'dark' && (
        <svg
          className="w-6 h-6 text-theme-text-primary transition-transform duration-300 animate-fade-in"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

/**
 * Compact ThemeToggle for headers/navbars
 */
export function ThemeToggleCompact() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-theme-interactive-primary"
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
    >
      {themeMode === 'light' ? (
        <svg className="w-5 h-5 text-theme-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-theme-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
