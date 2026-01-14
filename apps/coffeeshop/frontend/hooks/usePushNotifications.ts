'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * Push Notifications Hook
 *
 * Handles:
 * - Browser support detection
 * - Permission request
 * - Push subscription management
 * - Saving subscription to backend
 */

export type NotificationPermission = 'default' | 'granted' | 'denied';

interface UsePushNotificationsReturn {
  isSupported: boolean;
  permission: NotificationPermission;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  subscribe: (orderId?: string) => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
}

// VAPID public key - in production this should come from env
// Generate with: npx web-push generate-vapid-keys
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';

/**
 * Convert base64 string to Uint8Array for applicationServerKey
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check browser support and current state
  useEffect(() => {
    const checkSupport = async () => {
      // Check if push is supported
      const supported =
        'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

      setIsSupported(supported);

      if (!supported) {
        return;
      }

      // Check current permission
      setPermission(Notification.permission as NotificationPermission);

      // Check if already subscribed
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      } catch (err) {
        console.error('[Push] Error checking subscription:', err);
      }
    };

    checkSupport();
  }, []);

  /**
   * Subscribe to push notifications
   */
  const subscribe = useCallback(
    async (orderId?: string): Promise<boolean> => {
      if (!isSupported) {
        setError('Push notifications not supported');
        return false;
      }

      if (!VAPID_PUBLIC_KEY) {
        setError('Push notifications not configured');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Request notification permission
        const permissionResult = await Notification.requestPermission();
        setPermission(permissionResult as NotificationPermission);

        if (permissionResult !== 'granted') {
          setError('Notification permission denied');
          return false;
        }

        // Get service worker registration
        const registration = await navigator.serviceWorker.ready;

        // Check for existing subscription
        let subscription = await registration.pushManager.getSubscription();

        // Subscribe if not already
        if (!subscription) {
          const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey.buffer as ArrayBuffer,
          });
        }

        // Save subscription to backend
        const response = await fetch('/api/push-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription: subscription.toJSON(),
            orderId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save subscription');
        }

        setIsSubscribed(true);
        console.log('[Push] Successfully subscribed');
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Subscription failed';
        console.error('[Push] Subscribe error:', err);
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isSupported]
  );

  /**
   * Unsubscribe from push notifications
   */
  const unsubscribe = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Unsubscribe from push
        await subscription.unsubscribe();

        // Remove from backend
        await fetch('/api/push-subscription', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
          }),
        });
      }

      setIsSubscribed(false);
      console.log('[Push] Successfully unsubscribed');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unsubscribe failed';
      console.error('[Push] Unsubscribe error:', err);
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe,
  };
}
