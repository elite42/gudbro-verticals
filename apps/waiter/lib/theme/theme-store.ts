/**
 * Theme Store - LocalStorage persistence for waiter theme preferences
 */

import { ThemeMode } from './theme-definitions';

const THEME_STORAGE_KEY = 'waiter-theme';

export interface ThemePreferences {
  mode: ThemeMode;
}

export function getThemePreferences(): ThemePreferences {
  if (typeof window === 'undefined') {
    return { mode: 'light' };
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        mode: parsed.mode === 'dark' ? 'dark' : 'light',
      };
    }
  } catch (error) {
    console.error('Failed to load theme preferences:', error);
  }

  // Check system preference as fallback
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return { mode: 'dark' };
  }

  return { mode: 'light' };
}

export function saveThemePreferences(preferences: ThemePreferences): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preferences));
    window.dispatchEvent(new CustomEvent('theme-updated', { detail: preferences }));
  } catch (error) {
    console.error('Failed to save theme preferences:', error);
  }
}

export function watchSystemTheme(callback: (mode: ThemeMode) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}
