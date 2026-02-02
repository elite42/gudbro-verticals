'use client';

/**
 * Settings Store
 *
 * Persisted user preferences for the waiter app.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ViewMode = 'auto' | 'cards' | 'compact';
export type ThemeMode = 'system' | 'light' | 'dark';

interface SettingsState {
  // View preferences
  viewMode: ViewMode;
  autoSwitchThreshold: number; // Number of tables to switch to compact

  // Notifications
  vibrateOnNewRequest: boolean;
  soundOnUrgentRequest: boolean;
  soundOnEveryRequest: boolean;

  // Theme
  themeMode: ThemeMode;

  // Actions
  setViewMode: (mode: ViewMode) => void;
  setVibrateOnNewRequest: (enabled: boolean) => void;
  setSoundOnUrgentRequest: (enabled: boolean) => void;
  setSoundOnEveryRequest: (enabled: boolean) => void;
  setThemeMode: (mode: ThemeMode) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Defaults
      viewMode: 'auto',
      autoSwitchThreshold: 6,
      vibrateOnNewRequest: true,
      soundOnUrgentRequest: true,
      soundOnEveryRequest: false,
      themeMode: 'system',

      // Actions
      setViewMode: (mode) => set({ viewMode: mode }),
      setVibrateOnNewRequest: (enabled) => set({ vibrateOnNewRequest: enabled }),
      setSoundOnUrgentRequest: (enabled) => set({ soundOnUrgentRequest: enabled }),
      setSoundOnEveryRequest: (enabled) => set({ soundOnEveryRequest: enabled }),
      setThemeMode: (mode) => set({ themeMode: mode }),
    }),
    {
      name: 'waiter-settings',
    }
  )
);

/**
 * Determine effective view mode based on settings and table count
 */
export function getEffectiveViewMode(
  viewMode: ViewMode,
  tableCount: number,
  threshold: number = 6
): 'cards' | 'compact' {
  if (viewMode === 'auto') {
    return tableCount <= threshold ? 'cards' : 'compact';
  }
  return viewMode === 'cards' ? 'cards' : 'compact';
}
