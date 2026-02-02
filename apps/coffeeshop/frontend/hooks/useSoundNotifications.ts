'use client';

/**
 * useSoundNotifications Hook
 *
 * Hook per riprodurre suoni di notifica quando lo stato dell'ordine cambia.
 * Supporta audio HTML5 con fallback silenzioso.
 */

import { useCallback, useRef, useEffect } from 'react';
import { OrderStatus } from '@/lib/order-service';

interface UseSoundNotificationsOptions {
  /** Enable sound notifications (default: true) */
  enabled?: boolean;
  /** Volume level 0-1 (default: 0.5) */
  volume?: number;
}

interface UseSoundNotificationsReturn {
  /** Play sound for a specific status change */
  playStatusSound: (status: OrderStatus) => void;
  /** Play success sound */
  playSuccess: () => void;
  /** Play notification sound */
  playNotification: () => void;
  /** Play error sound */
  playError: () => void;
  /** Check if audio is supported */
  isSupported: boolean;
}

// Sound file paths (relative to public folder)
// Using WAV format for better browser compatibility
const SOUNDS = {
  orderReady: '/sounds/order-ready.wav',
  orderUpdate: '/sounds/order-update.wav',
  success: '/sounds/success.wav',
  notification: '/sounds/notification.wav',
  error: '/sounds/error.wav',
};

// Map order status to sound
const STATUS_SOUNDS: Partial<Record<OrderStatus, keyof typeof SOUNDS>> = {
  confirmed: 'orderUpdate',
  preparing: 'orderUpdate',
  ready: 'orderReady',
  delivered: 'success',
};

export function useSoundNotifications(
  options: UseSoundNotificationsOptions = {}
): UseSoundNotificationsReturn {
  const { enabled = true, volume = 0.5 } = options;

  // Cache audio elements
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const isSupported = useRef(false);

  // Check audio support on mount
  useEffect(() => {
    isSupported.current = typeof Audio !== 'undefined';
  }, []);

  // Get or create audio element
  const getAudio = useCallback(
    (soundKey: keyof typeof SOUNDS): HTMLAudioElement | null => {
      if (!isSupported.current || !enabled) return null;

      const cached = audioCache.current.get(soundKey);
      if (cached) {
        cached.volume = volume;
        return cached;
      }

      try {
        const audio = new Audio(SOUNDS[soundKey]);
        audio.volume = volume;
        audio.preload = 'auto';
        audioCache.current.set(soundKey, audio);
        return audio;
      } catch (e) {
        console.warn('[Sound] Failed to create audio:', e);
        return null;
      }
    },
    [enabled, volume]
  );

  // Play a sound
  const playSound = useCallback(
    (soundKey: keyof typeof SOUNDS) => {
      const audio = getAudio(soundKey);
      if (!audio) return;

      // Reset and play
      audio.currentTime = 0;
      audio.play().catch((e) => {
        // Autoplay policy may block - user interaction required
        console.warn('[Sound] Play blocked:', e.message);
      });
    },
    [getAudio]
  );

  // Play sound for status change
  const playStatusSound = useCallback(
    (status: OrderStatus) => {
      const soundKey = STATUS_SOUNDS[status];
      if (soundKey) {
        playSound(soundKey);
      }
    },
    [playSound]
  );

  const playSuccess = useCallback(() => playSound('success'), [playSound]);
  const playNotification = useCallback(() => playSound('notification'), [playSound]);
  const playError = useCallback(() => playSound('error'), [playSound]);

  return {
    playStatusSound,
    playSuccess,
    playNotification,
    playError,
    isSupported: isSupported.current,
  };
}

export default useSoundNotifications;
