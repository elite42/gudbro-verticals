'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Brain,
  ShoppingCart,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

export type NotificationType = 'ai' | 'operations' | 'feedback' | 'business' | 'system';
export type NotificationPriority = 'high' | 'medium' | 'low';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const typeConfig: Record<NotificationType, { icon: typeof Bell; color: string; bg: string }> = {
  ai: { icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100' },
  operations: { icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-100' },
  feedback: { icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  business: { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  system: { icon: Settings, color: 'text-gray-600', bg: 'bg-gray-100' },
};

const priorityStyles: Record<NotificationPriority, string> = {
  high: 'border-l-4 border-l-red-500',
  medium: 'border-l-4 border-l-amber-500',
  low: '',
};

// Mock notifications - in production these would come from API/database
const generateMockNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'ai',
    priority: 'medium',
    title: 'Nuovo suggerimento AI',
    message:
      'Con il meteo di oggi, considera di promuovere le bevande fredde. Potenziale +15% vendite.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    read: false,
    actionUrl: '/dashboard',
    actionLabel: 'Vedi dettagli',
  },
  {
    id: '2',
    type: 'feedback',
    priority: 'low',
    title: 'Nuova recensione',
    message: 'Hai ricevuto una recensione 5 stelle! "Ottimo caffè e servizio veloce"',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    read: false,
    actionUrl: '/customers',
    actionLabel: 'Vedi recensione',
  },
  {
    id: '3',
    type: 'business',
    priority: 'low',
    title: 'Obiettivo raggiunto!',
    message: 'Hai superato il target di vendite giornaliero del 12%',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: '4',
    type: 'ai',
    priority: 'medium',
    title: 'Analisi completata',
    message:
      'Il report settimanale AI è pronto. 3 opportunità identificate per ottimizzare i margini.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true,
    actionUrl: '/analytics',
    actionLabel: 'Vedi report',
  },
  {
    id: '5',
    type: 'system',
    priority: 'low',
    title: 'Menu sincronizzato',
    message: 'Il tuo menu digitale è stato aggiornato con successo su tutti i canali.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true,
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    setNotifications(generateMockNotifications());
  }, []);

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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (!mounted) {
    return (
      <button className="relative rounded-lg p-2 text-gray-400">
        <Bell className="h-5 w-5" />
      </button>
    );
  }

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
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <CheckCircle className="mb-2 h-8 w-8 text-green-500" />
                <p className="text-sm font-medium">Tutto in ordine!</p>
                <p className="text-xs">Nessuna notifica al momento</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const config = typeConfig[notification.type];
                  const Icon = config.icon;

                  return (
                    <div
                      key={notification.id}
                      className={`relative flex gap-3 p-4 transition-colors hover:bg-gray-50 ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      } ${priorityStyles[notification.priority]}`}
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 rounded-lg p-2 ${config.bg}`}>
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}
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
                        <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(notification.timestamp, {
                              addSuffix: true,
                              locale: it,
                            })}
                          </span>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Segna come letta
                              </button>
                            )}
                            {notification.actionUrl && (
                              <a
                                href={notification.actionUrl}
                                onClick={() => markAsRead(notification.id)}
                                className="flex items-center gap-0.5 text-xs font-medium text-blue-600 hover:text-blue-700"
                              >
                                {notification.actionLabel || 'Vedi'}
                                <ChevronRight className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
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
                href="/notifications"
                className="flex items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Vedi tutte le notifiche
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
