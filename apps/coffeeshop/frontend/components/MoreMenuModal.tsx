'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { clearTableContext, getTableContext } from '../lib/table-context-store';
import { selectionsStore } from '../lib/selections-store';
import { cartStore } from '../lib/cart-store';
import { orderHistoryStore } from '../lib/order-history-store';
import { favoritesStore } from '../lib/favorites-store';
import { languagePreferencesStore } from '../lib/language-preferences';
import { currencyPreferencesStore } from '../lib/currency';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { CallStaffModal } from './CallStaffModal';
import { Event } from '@/types/event';

interface MoreMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  events?: Event[]; // Pass events to show count and active promos
}

type ResetConfirmType = 'table' | 'selections' | 'all' | null;

export function MoreMenuModal({ isOpen, onClose, events = [] }: MoreMenuModalProps) {
  const router = useRouter();
  const [showResetConfirm, setShowResetConfirm] = useState<ResetConfirmType>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [showWiFiModal, setShowWiFiModal] = useState(false);
  const [showCallStaffModal, setShowCallStaffModal] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);

  // Calculate event stats
  const eventStats = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // Events happening now
    const activeEvents = events.filter((event) => {
      if (event.status !== 'published') return false;
      const start = new Date(`${event.startDate}T${event.startTime}`);
      const end = new Date(`${event.endDate}T${event.endTime}`);
      return now >= start && now <= end;
    });

    // Events coming up today
    const upcomingToday = events.filter((event) => {
      if (event.status !== 'published') return false;
      if (event.startDate !== today) return false;
      const start = new Date(`${event.startDate}T${event.startTime}`);
      return now < start;
    });

    // Active promotions from active events
    const activePromos = activeEvents.flatMap((e) => e.promotions || []);

    // Upcoming events this week
    const weekFromNow = new Date(now);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    const upcomingThisWeek = events.filter((event) => {
      if (event.status !== 'published') return false;
      const start = new Date(`${event.startDate}T${event.startTime}`);
      return start > now && start <= weekFromNow;
    });

    return {
      activeNow: activeEvents.length,
      upcomingToday: upcomingToday.length,
      upcomingThisWeek: upcomingThisWeek.length,
      activePromos: activePromos.length,
      hasLiveEvent: activeEvents.length > 0,
    };
  }, [events]);

  if (!isOpen) return null;

  const tableContext = getTableContext();
  const wifi = coffeeshopConfig.wifi;

  // Generate WiFi QR code URL
  const getWiFiQRUrl = () => {
    if (!wifi) return '';
    const wifiString = `WIFI:T:${wifi.security || 'WPA'};S:${wifi.ssid};P:${wifi.password};H:false;;`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wifiString)}`;
  };

  // Copy WiFi password
  const copyWiFiPassword = () => {
    if (wifi && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(wifi.password);
      setWifiCopied(true);
      setTimeout(() => setWifiCopied(false), 2000);
    }
  };

  const menuItems = [
    {
      id: 'wifi',
      icon: '📶',
      label: 'WiFi',
      description: wifi ? wifi.ssid : 'Not configured',
      color: 'bg-blue-500',
      disabled: !wifi,
      action: () => setShowWiFiModal(true),
    },
    {
      id: 'call-staff',
      icon: '🔔',
      label: 'Call Staff',
      description: 'Request assistance',
      color: 'bg-orange-500',
      action: () => {
        onClose();
        setTimeout(() => setShowCallStaffModal(true), 100);
      },
    },
    {
      id: 'language',
      icon: '🌐',
      label: 'Language',
      description: 'Change language',
      color: 'bg-indigo-500',
      action: () => {
        onClose();
        router.push('/account');
      },
    },
    {
      id: 'currency',
      icon: '💱',
      label: 'Currency',
      description: 'Change currency',
      color: 'bg-teal-500',
      action: () => {
        onClose();
        router.push('/account');
      },
    },
    {
      id: 'events',
      icon: eventStats.hasLiveEvent ? '🔴' : '🎉',
      label: 'Eventi',
      description: eventStats.hasLiveEvent
        ? `${eventStats.activeNow} in corso ora!`
        : eventStats.upcomingThisWeek > 0
          ? `${eventStats.upcomingThisWeek} questa settimana`
          : 'Scopri gli eventi',
      color: eventStats.hasLiveEvent ? 'bg-red-500 animate-pulse' : 'bg-pink-500',
      badge: eventStats.hasLiveEvent
        ? 'LIVE'
        : eventStats.upcomingThisWeek > 0
          ? String(eventStats.upcomingThisWeek)
          : undefined,
      action: () => {
        onClose();
        router.push('/events');
      },
    },
    {
      id: 'promos',
      icon: '🏷️',
      label: 'Offerte',
      description:
        eventStats.activePromos > 0
          ? `${eventStats.activePromos} promozioni attive`
          : 'Nessuna offerta attiva',
      color: eventStats.activePromos > 0 ? 'bg-orange-500' : 'bg-gray-400',
      badge: eventStats.activePromos > 0 ? String(eventStats.activePromos) : undefined,
      disabled: eventStats.activePromos === 0,
      action: () => {
        onClose();
        router.push('/events?filter=promos');
      },
    },
    {
      id: 'orders',
      icon: '📦',
      label: 'My Orders',
      description: 'View order history',
      color: 'bg-purple-500',
      action: () => {
        onClose();
        router.push('/orders');
      },
    },
    {
      id: 'favorites',
      icon: '❤️',
      label: 'Favorites',
      description: `${favoritesStore.count()} saved items`,
      color: 'bg-red-500',
      action: () => {
        onClose();
        router.push('/menu?filter=favorites');
      },
    },
    {
      id: 'team',
      icon: '👨‍🍳',
      label: coffeeshopConfig.ui.labels.team,
      description: 'Conosci il nostro staff',
      color: 'bg-pink-500',
      action: () => {
        onClose();
        router.push('/team');
      },
    },
  ];

  const resetItems = [
    {
      id: 'reset-table',
      icon: '🪑',
      label: 'Reset Table',
      description: tableContext.table_number
        ? `Clear "Tavolo ${tableContext.table_number}"`
        : 'No table set',
      color: 'bg-gray-500',
      disabled: !tableContext.table_number,
      action: () => setShowResetConfirm('table'),
    },
    {
      id: 'reset-selections',
      icon: '🛒',
      label: 'Reset Selections',
      description: 'Clear your order list',
      color: 'bg-yellow-600',
      action: () => setShowResetConfirm('selections'),
    },
    {
      id: 'reset-all',
      icon: '🔄',
      label: 'Reset Everything',
      description: 'Clear all data (for testing)',
      color: 'bg-red-600',
      action: () => setShowResetConfirm('all'),
    },
  ];

  const handleReset = (type: ResetConfirmType) => {
    switch (type) {
      case 'table':
        clearTableContext();
        setResetSuccess('Table context cleared!');
        break;
      case 'selections':
        selectionsStore.clear();
        cartStore.clear();
        setResetSuccess('Selections cleared!');
        break;
      case 'all':
        clearTableContext();
        selectionsStore.clear();
        cartStore.clear();
        orderHistoryStore.clear();
        favoritesStore.clear();
        languagePreferencesStore.clear();
        currencyPreferencesStore.clear();
        setResetSuccess('All data cleared! Refreshing...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
    }
    setShowResetConfirm(null);

    if (type !== 'all') {
      setTimeout(() => setResetSuccess(null), 2000);
    }
  };

  const handleCallStaffConfirm = (reason: string) => {
    // TODO: Send to backend/websocket in production
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="bg-theme-bg-elevated fixed inset-x-4 top-1/2 z-[10001] mx-auto max-h-[80vh] max-w-md -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="border-theme-border-light flex items-center justify-between border-b p-4">
          <h2 className="text-theme-text-primary text-xl font-bold">More Options</h2>
          <button
            onClick={onClose}
            className="bg-theme-bg-tertiary hover:bg-theme-bg-secondary flex h-10 w-10 items-center justify-center rounded-full transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="text-theme-text-secondary h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {resetSuccess && (
          <div className="mx-4 mt-4 rounded-lg bg-green-100 p-3 text-center font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
            {resetSuccess}
          </div>
        )}

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {/* Quick Actions */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                disabled={'disabled' in item && item.disabled}
                className={`relative flex flex-col items-center gap-2 rounded-xl p-3 transition-colors ${
                  'disabled' in item && item.disabled
                    ? 'bg-theme-bg-secondary cursor-not-allowed opacity-50'
                    : 'bg-theme-bg-secondary hover:bg-theme-bg-tertiary'
                }`}
              >
                {/* Badge */}
                {'badge' in item && item.badge && (
                  <span
                    className={`absolute -right-1 -top-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      item.badge === 'LIVE'
                        ? 'animate-pulse bg-red-500 text-white'
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <div
                  className={`h-12 w-12 ${item.color} flex items-center justify-center rounded-full text-2xl`}
                >
                  {item.icon}
                </div>
                <span className="text-theme-text-primary text-center text-xs font-medium">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-theme-border-light my-4 border-t" />

          {/* Reset Section (for testing) */}
          <div className="mb-2">
            <h3 className="text-theme-text-secondary mb-3 text-sm font-semibold uppercase tracking-wide">
              Developer Tools
            </h3>
            <div className="space-y-2">
              {resetItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  disabled={'disabled' in item && item.disabled}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 transition-colors ${
                    'disabled' in item && item.disabled
                      ? 'bg-theme-bg-secondary cursor-not-allowed opacity-50'
                      : 'bg-theme-bg-secondary hover:bg-theme-bg-tertiary'
                  }`}
                >
                  <div
                    className={`h-10 w-10 ${item.color} flex items-center justify-center rounded-full text-xl`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-theme-text-primary font-medium">{item.label}</div>
                    <div className="text-theme-text-secondary text-xs">{item.description}</div>
                  </div>
                  <svg
                    className="text-theme-text-secondary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WiFi Modal */}
      {showWiFiModal && wifi && (
        <>
          <div
            className="fixed inset-0 z-[10002] bg-black/40"
            onClick={() => setShowWiFiModal(false)}
          />
          <div className="bg-theme-bg-elevated fixed inset-x-4 top-1/2 z-[10003] mx-auto max-w-sm -translate-y-1/2 rounded-2xl p-6 shadow-2xl">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-cyan-500">
                  <span className="text-2xl">📶</span>
                </div>
                <h3 className="text-theme-text-primary text-xl font-bold">WiFi</h3>
              </div>
              <button
                onClick={() => setShowWiFiModal(false)}
                className="bg-theme-bg-tertiary flex h-10 w-10 items-center justify-center rounded-full"
              >
                <svg
                  className="text-theme-text-secondary h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Network Info */}
            <div className="mb-4 space-y-3">
              <div>
                <label className="text-theme-text-tertiary mb-1 block text-xs font-medium">
                  Network
                </label>
                <div className="bg-theme-bg-secondary rounded-xl px-4 py-3">
                  <span className="text-theme-text-primary font-mono font-bold">{wifi.ssid}</span>
                </div>
              </div>
              <div>
                <label className="text-theme-text-tertiary mb-1 block text-xs font-medium">
                  Password
                </label>
                <div className="bg-theme-bg-secondary flex items-center justify-between rounded-xl px-4 py-3">
                  <span className="text-theme-text-primary font-mono font-bold">
                    {wifi.password}
                  </span>
                  <button
                    onClick={copyWiFiPassword}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      wifiCopied
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {wifiCopied ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:from-blue-900/20 dark:to-cyan-900/20">
              <p className="text-theme-text-secondary mb-3 text-center text-sm">Scan to connect</p>
              <div className="flex justify-center rounded-lg bg-white p-2">
                <img src={getWiFiQRUrl()} alt="WiFi QR Code" className="h-40 w-40" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <>
          <div
            className="fixed inset-0 z-[10002] bg-black/40"
            onClick={() => setShowResetConfirm(null)}
          />
          <div className="bg-theme-bg-elevated fixed inset-x-8 top-1/2 z-[10003] mx-auto max-w-sm -translate-y-1/2 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-theme-text-primary mb-2 text-lg font-bold">
              {showResetConfirm === 'table' && 'Reset Table?'}
              {showResetConfirm === 'selections' && 'Reset Selections?'}
              {showResetConfirm === 'all' && 'Reset Everything?'}
            </h3>
            <p className="text-theme-text-secondary mb-6">
              {showResetConfirm === 'table' && 'This will clear the current table context.'}
              {showResetConfirm === 'selections' && 'This will clear all items in your order list.'}
              {showResetConfirm === 'all' &&
                'This will clear ALL stored data including table, orders, favorites, and preferences. The page will reload.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(null)}
                className="bg-theme-bg-tertiary text-theme-text-primary hover:bg-theme-bg-secondary flex-1 rounded-xl px-4 py-3 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReset(showResetConfirm)}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition-colors hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>
        </>
      )}

      {/* Call Staff Modal */}
      <CallStaffModal
        isOpen={showCallStaffModal}
        onClose={() => setShowCallStaffModal(false)}
        onConfirm={handleCallStaffConfirm}
      />
    </>
  );
}
