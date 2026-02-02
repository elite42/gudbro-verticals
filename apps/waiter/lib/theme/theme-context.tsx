'use client';

/**
 * Theme Context for Waiter PWA
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
    return getThemePreferences().mode;
  });

  const theme = getTheme(themeMode);

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cssVars = themeToCSSVariables(theme);
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.setAttribute('data-theme', themeMode);

    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, themeMode]);

  // Listen for theme changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleThemeUpdate = (event: CustomEvent) => {
      setThemeModeState(event.detail.mode);
    };

    window.addEventListener('theme-updated', handleThemeUpdate as EventListener);
    return () => window.removeEventListener('theme-updated', handleThemeUpdate as EventListener);
  }, []);

  // Watch system theme changes
  useEffect(() => {
    const hasUserPreference = localStorage.getItem('waiter-theme') !== null;
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

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
