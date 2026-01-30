'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface FeedbackNotification {
  id: string;
  type: 'acknowledged' | 'status_changed' | 'resolved' | 'rejected';
  title: string;
  body: string | null;
  is_read: boolean;
  submission_id: string | null;
  task_id: string | null;
  created_at: string;
}

export interface UseNotificationsResult {
  notifications: FeedbackNotification[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refresh: () => Promise<void>;
}

const POLL_INTERVAL = 60000; // 60 seconds

export function useNotifications(merchantId: string | null): UseNotificationsResult {
  const [notifications, setNotifications] = useState<FeedbackNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Keep a ref to merchantId for stable interval callback
  const merchantIdRef = useRef(merchantId);
  merchantIdRef.current = merchantId;

  const fetchNotifications = useCallback(async () => {
    if (!merchantIdRef.current) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/feedback/notifications?merchantId=${merchantIdRef.current}`);
      if (!res.ok) {
        console.error('Failed to fetch notifications:', res.status);
        return;
      }
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount ?? 0);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []); // stable: uses ref internally

  // Fetch on mount + poll every 60s
  useEffect(() => {
    if (!merchantId) {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    fetchNotifications();
    const interval = setInterval(fetchNotifications, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [merchantId, fetchNotifications]);

  const markAsRead = useCallback(
    async (id: string) => {
      // Optimistic update
      const prevNotifications = notifications;
      const prevUnreadCount = unreadCount;

      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));

      try {
        const res = await fetch('/api/feedback/notifications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationId: id }),
        });
        if (!res.ok) {
          throw new Error('Failed to mark as read');
        }
      } catch (error) {
        console.error('Error marking notification as read:', error);
        // Revert on error
        setNotifications(prevNotifications);
        setUnreadCount(prevUnreadCount);
      }
    },
    [notifications, unreadCount]
  );

  const markAllAsRead = useCallback(async () => {
    if (!merchantIdRef.current) return;

    // Optimistic update
    const prevNotifications = notifications;
    const prevUnreadCount = unreadCount;

    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);

    try {
      const res = await fetch('/api/feedback/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          markAllRead: true,
          merchantId: merchantIdRef.current,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to mark all as read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      // Revert on error
      setNotifications(prevNotifications);
      setUnreadCount(prevUnreadCount);
    }
  }, [notifications, unreadCount]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
}
