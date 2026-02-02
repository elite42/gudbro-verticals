'use client';

/**
 * ConnectedNotificationPrompt
 *
 * NotificationPrompt connesso all'hook usePushNotifications.
 * Gestisce automaticamente lo stato delle notifiche push.
 */

import { useState, useEffect, useCallback } from 'react';
import { NotificationPrompt } from '../NotificationPrompt';
import { usePushNotifications } from '@/hooks/usePushNotifications';

interface ConnectedNotificationPromptProps {
  /** Order ID to associate with subscription */
  orderId?: string;
  /** Auto-show after order placement */
  autoShow?: boolean;
  /** Delay before auto-showing (ms) */
  autoShowDelay?: number;
  /** Display mode */
  mode?: 'banner' | 'modal';
  /** Callback when enabled successfully */
  onEnabled?: () => void;
  /** Callback when dismissed */
  onDismiss?: () => void;
}

// Local storage key for dismissal tracking
const DISMISS_KEY = 'notification-prompt-dismissed';
const DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function ConnectedNotificationPrompt({
  orderId,
  autoShow = true,
  autoShowDelay = 2000,
  mode = 'banner',
  onEnabled,
  onDismiss,
}: ConnectedNotificationPromptProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    error,
    subscribe,
  } = usePushNotifications();

  // Check if should show prompt
  useEffect(() => {
    if (!autoShow) return;
    if (!isSupported) return;
    if (isSubscribed) return;
    if (permission === 'denied') return;

    // Check if recently dismissed
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const dismissTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissTime < DISMISS_DURATION) {
        return;
      }
    }

    // Auto-show after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, autoShowDelay);

    return () => clearTimeout(timer);
  }, [autoShow, autoShowDelay, isSupported, isSubscribed, permission]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Remember dismissal
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    onDismiss?.();
  }, [onDismiss]);

  const handleEnable = useCallback(async () => {
    const success = await subscribe(orderId);
    if (success) {
      setIsOpen(false);
      onEnabled?.();
    }
  }, [subscribe, orderId, onEnabled]);

  // Don't render if not supported or already subscribed
  if (!isSupported || isSubscribed || permission === 'denied') {
    return null;
  }

  return (
    <NotificationPrompt
      isOpen={isOpen}
      onClose={handleClose}
      onEnable={handleEnable}
      permission={permission}
      isSubscribed={isSubscribed}
      isLoading={isLoading}
      error={error}
      mode={mode}
      orderId={orderId}
    />
  );
}

export default ConnectedNotificationPrompt;
