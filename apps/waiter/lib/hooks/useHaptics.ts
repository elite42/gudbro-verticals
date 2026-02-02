'use client';

/**
 * Haptic Feedback Hook
 *
 * Provides haptic feedback for touch interactions.
 * Falls back gracefully on devices without vibration support.
 */

import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const hapticPatterns: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 10],
  warning: [25, 50, 25],
  error: [50, 100, 50, 100, 50],
};

export function useHaptics() {
  const vibrate = useCallback((type: HapticType = 'light') => {
    // Check if vibration is supported
    if (typeof navigator === 'undefined' || !navigator.vibrate) {
      return false;
    }

    try {
      const pattern = hapticPatterns[type];
      return navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Haptic feedback failed:', error);
      return false;
    }
  }, []);

  const lightTap = useCallback(() => vibrate('light'), [vibrate]);
  const mediumTap = useCallback(() => vibrate('medium'), [vibrate]);
  const heavyTap = useCallback(() => vibrate('heavy'), [vibrate]);
  const success = useCallback(() => vibrate('success'), [vibrate]);
  const warning = useCallback(() => vibrate('warning'), [vibrate]);
  const error = useCallback(() => vibrate('error'), [vibrate]);

  // Check if haptics are available
  const isAvailable = typeof navigator !== 'undefined' && !!navigator.vibrate;

  return {
    vibrate,
    lightTap,
    mediumTap,
    heavyTap,
    success,
    warning,
    error,
    isAvailable,
  };
}

/**
 * Utility function for one-off haptic feedback
 */
export function triggerHaptic(type: HapticType = 'light'): boolean {
  if (typeof navigator === 'undefined' || !navigator.vibrate) {
    return false;
  }

  try {
    const pattern = hapticPatterns[type];
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
}
