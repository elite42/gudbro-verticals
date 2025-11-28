/**
 * Theme Store - LocalStorage persistence for theme preferences
 */

import { ThemeMode } from './theme-definitions';

const THEME_STORAGE_KEY = 'digital-menu-theme';

export interface ThemePreferences {
  mode: ThemeMode;
}

/**
 * Get theme preferences from localStorage
 */
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

/**
 * Save theme preferences to localStorage
 */
export function saveThemePreferences(preferences: ThemePreferences): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preferences));

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('theme-updated', { detail: preferences }));
  } catch (error) {
    console.error('Failed to save theme preferences:', error);
  }
}

/**
 * Toggle between light and dark mode
 */
export function toggleTheme(): ThemeMode {
  const current = getThemePreferences();
  const newMode: ThemeMode = current.mode === 'light' ? 'dark' : 'light';
  saveThemePreferences({ mode: newMode });
  return newMode;
}

/**
 * Listen for system theme changes
 */
export function watchSystemTheme(callback: (mode: ThemeMode) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent) => {
    const mode: ThemeMode = e.matches ? 'dark' : 'light';
    callback(mode);
  };

  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  // Fallback for older browsers
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}
