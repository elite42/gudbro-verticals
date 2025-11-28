'use client';

/**
 * Theme Context - React Context for theme management
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, ThemeMode, getTheme, themeToCSSVariables } from './theme-definitions';
import { getThemePreferences, saveThemePreferences, watchSystemTheme } from './theme-store';

interface ThemeContextValue {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    // Initialize from localStorage or system preference
    return getThemePreferences().mode;
  });

  const theme = getTheme(themeMode);

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cssVars = themeToCSSVariables(theme);
    const root = document.documentElement;

    // Apply all CSS variables to :root
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Add data attribute for theme-specific styling
    root.setAttribute('data-theme', themeMode);

    // Update HTML class for Tailwind dark mode
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, themeMode]);

  // Listen for theme changes from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleThemeUpdate = (event: CustomEvent) => {
      setThemeModeState(event.detail.mode);
    };

    window.addEventListener('theme-updated', handleThemeUpdate as EventListener);
    return () => window.removeEventListener('theme-updated', handleThemeUpdate as EventListener);
  }, []);

  // Watch system theme changes (optional - user preference takes priority)
  useEffect(() => {
    // Only watch system theme if user hasn't set a preference
    const prefs = getThemePreferences();
    const hasUserPreference = localStorage.getItem('digital-menu-theme') !== null;

    if (hasUserPreference) return;

    return watchSystemTheme((mode) => {
      setThemeModeState(mode);
    });
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    saveThemePreferences({ mode });
  };

  const toggleTheme = () => {
    const newMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  const value: ThemeContextValue = {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to use theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
