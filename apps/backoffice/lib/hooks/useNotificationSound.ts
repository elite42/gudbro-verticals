'use client';

import { useCallback, useRef, useEffect } from 'react';

export type NotificationSoundType = 'success' | 'error' | 'warning' | 'info' | 'alert';

interface SoundSettings {
  enabled: boolean;
  volume: number; // 0-1
  enabledTypes: Record<NotificationSoundType, boolean>;
}

const DEFAULT_SETTINGS: SoundSettings = {
  enabled: true,
  volume: 0.5,
  enabledTypes: {
    success: true,
    error: true,
    warning: true,
    info: false, // Info is less critical, off by default
    alert: true,
  },
};

const STORAGE_KEY = 'gudbro_notification_sounds';

// Base64 encoded short notification sounds (royalty-free beeps)
// These are tiny placeholder sounds - can be replaced with custom .mp3 files
const SOUND_DATA: Record<NotificationSoundType, string> = {
  // Success: pleasant ding (C5 note, 200ms)
  success:
    'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2JkZuTgHNxeYOLkpCDdXBzeIKKjYqAdXFzeICHiomAdnNzdnyCh4iCd3R0dXmAhIV/d3R0dnqAg4R/eHV1dXh9gYJ/eHV2dXh8f4F+eHZ2dXh7fn9+eHZ2dnd6fX5+eHd3d3d6fH1+eHd3d3d5e3x9eHd3d3d5e3x8d3d3d3d5enx8d3h4d3d5enx7d3h4eHd4eXt7d3h4eHd4eXp6d3h4eHh4eXp6d3h4eHh4eHp5d3l5eHh4eHl5d3l5eXh4eHl4eHl5eXl4eHh4eHl5eXl5eHh4eHh4eXl5eXl4eHh4eHh4eXl5eXl4eHh4eHh4eHl5eXl4eHh4eHh4eHh5eXl4eHh4eHh4eHh4eXh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4',

  // Error: low buzz (G3 note, 300ms)
  error:
    'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgoSGiIqMjpCSlJaYmpyeoKKkpqiqrK6wsrS2uLq8vr7AvL66uLa0sq6sqKainpyamJaUkpCOjIqIhoSCgH5+gIKEhoiKjI6QkpSWmJqcnqCipKaoqqyusLK0trq8vr7AwL68urq4trSysK6sqKimoqCenJqYlpSSkI6MioiGhIKAgH5+foB+gIKEhoeJi42PkZOVl5mcnqGjpaepq62vsrS2uLq8vsDAwL6+vLq4tra0srCurKqopaOhoJ6cnJqYlpSSkI6MioiGhIKAgH5+fn5+fn6A',

  // Warning: double beep (A4, 150ms x2)
  warning:
    'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgICAgH58en1/goWIi4yLiYaDgH17eXl7fYCDhomLjIuJhoOAfXt5eXt9gIOGiYuMi4mGg4B9e3l5e32Ag4aJi4yLiYaDgH17eXl7fYCDhomLjIuJhoN/fXt5eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh5e32Ag4aJi4yLiYaDgH17eXl7fYCDhomLjIuJhoOAfXt5eXt9gIOGiYuMi4mGg4B9e3l5e32Ag4aJi4yLiYaDgH17eXl7fYCDhomLjIuJhoOAfXt5eXh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4',

  // Info: soft chime (E5, 150ms)
  info: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgIB/f39/gICAf39/f4CAgH9/f3+AgIB/f39/gICAf39/f4CAgH9/f3+AgIB/f39/gIGBgYGBgYGBgYKCgoKCgoKCgoKCgoKCgoKCgoKCgoGBgYGBgYGBgYCAgICAgIB/f39/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5+f39/f39/f4CAgICAgICAgICBgYGBgYGBgYGBgYGBgYGBgYGBgYGAgICAgICAgH9/f39/f39+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+',

  // Alert: urgent triple beep (F5, 100ms x3)
  alert:
    'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYmNkZWZmpuamZeTj4uHg398eXZ1dnd6foKGio6Sl5qbnJuZlpKOioaDf3x5d3Z3eXyAhIiMkJSYm5ycm5mWko6KhoJ/fHl3dnd5fICEiIyQlJibm5uamZaSjoqGgn98eXd3eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHyAhIiMkJSYm5ycm5mWko6KhoJ/fHl3d3d5fICEiIyQlJibm5uamZaSjoqGgn98eXd3d3l8gISIjJCUmJubm5qZlpKOioaCf3x5d3d4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4',
};

/**
 * Hook for managing notification sounds
 *
 * Usage:
 * const { playSound, settings, updateSettings } = useNotificationSound();
 * playSound('success');
 */
export function useNotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const settingsRef = useRef<SoundSettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          settingsRef.current = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
      } catch {
        // Use defaults if parsing fails
      }
    }
  }, []);

  const getSettings = useCallback((): SoundSettings => {
    return settingsRef.current;
  }, []);

  const updateSettings = useCallback((updates: Partial<SoundSettings>) => {
    settingsRef.current = { ...settingsRef.current, ...updates };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsRef.current));
    }
  }, []);

  const playSound = useCallback((type: NotificationSoundType) => {
    const settings = settingsRef.current;

    // Check if sounds are enabled globally and for this type
    if (!settings.enabled || !settings.enabledTypes[type]) {
      return;
    }

    try {
      // Create audio element if needed
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audio = audioRef.current;
      audio.src = SOUND_DATA[type];
      audio.volume = settings.volume;

      // Reset and play
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Silently fail if autoplay is blocked
        // User interaction is required for first play in most browsers
      });
    } catch {
      // Silently fail - sounds are non-critical
    }
  }, []);

  const testSound = useCallback((type: NotificationSoundType) => {
    // Force play for testing, ignoring settings
    try {
      const audio = new Audio(SOUND_DATA[type]);
      audio.volume = settingsRef.current.volume;
      audio.play();
    } catch {
      // Silently fail
    }
  }, []);

  return {
    playSound,
    testSound,
    getSettings,
    updateSettings,
    SOUND_TYPES: ['success', 'error', 'warning', 'info', 'alert'] as NotificationSoundType[],
  };
}

// Export settings type for external use
export type { SoundSettings };
