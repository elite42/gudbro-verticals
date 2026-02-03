'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle, X, CaretRight, WarningCircle, SpinnerGap } from '@phosphor-icons/react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';
import { useNotifications } from '@/hooks/useNotifications';

export type NotificationType = 'acknowledged' | 'status_changed' | 'resolved' | 'rejected';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string | null;
  is_read: boolean;
  submission_id: string | null;
  task_id: string | null;
  created_at: string;
}

const typeConfig: Record<NotificationType, { icon: typeof Bell; color: string; bg: string }> = {
  acknowledged: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  status_changed: { icon: CaretRight, color: 'text-blue-600', bg: 'bg-blue-100' },
  resolved: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  rejected: { icon: X, color: 'text-red-600', bg: 'bg-red-100' },
};

const defaultTypeConfig = { icon: WarningCircle, color: 'text-gray-600', bg: 'bg-gray-100' };

function getTypeConfig(type: string) {
  return typeConfig[type as NotificationType] || defaultTypeConfig;
}

interface NotificationDropdownProps {
  merchantId?: string | null;
}

export function NotificationDropdown({ merchantId }: NotificationDropdownProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications: feedbackNotifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
  } = useNotifications(merchantId || null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter out dismissed notifications (visual-only dismiss)
  const notifications = feedbackNotifications.filter((n) => !dismissed.has(n.id));

  const dismissNotification = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
    // Also mark as read when dismissing
    const notification = feedbackNotifications.find((n) => n.id === id);
    if (notification && !notification.is_read) {
      markAsRead(id);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        title="Notifiche"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Notifiche</h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                  {unreadCount} nuove
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Segna tutte come lette
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <SpinnerGap className="mb-2 h-6 w-6 animate-spin text-gray-400" />
                <p className="text-sm">Caricamento...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <CheckCircle className="mb-2 h-8 w-8 text-green-500" />
                <p className="text-sm font-medium">Tutto in ordine!</p>
                <p className="text-xs">Nessuna notifica al momento</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const config = getTypeConfig(notification.type);
                  const Icon = config.icon;

                  return (
                    <div
                      key={notification.id}
                      className={`relative flex gap-3 p-4 transition-colors hover:bg-gray-50 ${
                        !notification.is_read ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 rounded-lg p-2 ${config.bg}`}>
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm font-medium ${!notification.is_read ? 'text-gray-900' : 'text-gray-700'}`}
                          >
                            {notification.title}
                          </p>
                          <button
                            onClick={() => dismissNotification(notification.id)}
                            className="flex-shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        {notification.body && (
                          <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">
                            {notification.body}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(notification.created_at), {
                              addSuffix: true,
                              locale: it,
                            })}
                          </span>
                          <div className="flex items-center gap-2">
                            {!notification.is_read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Segna come letta
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notification.is_read && (
                        <div className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-2">
              <a
                href="/settings/feedback"
                className="flex items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Vedi tutte le notifiche
                <CaretRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
