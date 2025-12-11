'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clearTableContext, getTableContext } from '../lib/table-context-store';
import { selectionsStore } from '../lib/selections-store';
import { cartStore } from '../lib/cart-store';
import { orderHistoryStore } from '../lib/order-history-store';
import { favoritesStore } from '../lib/favorites-store';
import { languagePreferencesStore } from '../lib/language-preferences';
import { currencyPreferencesStore } from '../lib/currency-preferences';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { CallStaffModal } from './CallStaffModal';

interface MoreMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResetConfirmType = 'table' | 'selections' | 'all' | null;

export function MoreMenuModal({ isOpen, onClose }: MoreMenuModalProps) {
  const router = useRouter();
  const [showResetConfirm, setShowResetConfirm] = useState<ResetConfirmType>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [showWiFiModal, setShowWiFiModal] = useState(false);
  const [showCallStaffModal, setShowCallStaffModal] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);

  if (!isOpen) return null;

  const tableContext = getTableContext();
  // @ts-ignore - wifi feature may not be in type
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
      action: () => setShowWiFiModal(true)
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
      }
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
      }
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
      }
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
      }
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
      }
    }
  ];

  const resetItems = [
    {
      id: 'reset-table',
      icon: '🪑',
      label: 'Reset Table',
      description: tableContext.table_number ? `Clear "Tavolo ${tableContext.table_number}"` : 'No table set',
      color: 'bg-gray-500',
      disabled: !tableContext.table_number,
      action: () => setShowResetConfirm('table')
    },
    {
      id: 'reset-selections',
      icon: '🛒',
      label: 'Reset Selections',
      description: 'Clear your order list',
      color: 'bg-yellow-600',
      action: () => setShowResetConfirm('selections')
    },
    {
      id: 'reset-all',
      icon: '🔄',
      label: 'Reset Everything',
      description: 'Clear all data (for testing)',
      color: 'bg-red-600',
      action: () => setShowResetConfirm('all')
    }
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
    console.log('Staff called:', reason);
    // In production, this would send to backend/websocket
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10001] max-w-md mx-auto max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-theme-border-light">
          <h2 className="text-xl font-bold text-theme-text-primary">More Options</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-theme-bg-tertiary flex items-center justify-center hover:bg-theme-bg-secondary transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {resetSuccess && (
          <div className="mx-4 mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-center font-medium">
            {resetSuccess}
          </div>
        )}

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                disabled={'disabled' in item && item.disabled}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-colors ${
                  'disabled' in item && item.disabled
                    ? 'opacity-50 cursor-not-allowed bg-theme-bg-secondary'
                    : 'bg-theme-bg-secondary hover:bg-theme-bg-tertiary'
                }`}
              >
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-2xl`}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-theme-text-primary text-center">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-theme-border-light my-4" />

          {/* Reset Section (for testing) */}
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide mb-3">
              Developer Tools
            </h3>
            <div className="space-y-2">
              {resetItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  disabled={'disabled' in item && item.disabled}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    'disabled' in item && item.disabled
                      ? 'opacity-50 cursor-not-allowed bg-theme-bg-secondary'
                      : 'bg-theme-bg-secondary hover:bg-theme-bg-tertiary'
                  }`}
                >
                  <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-xl`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-theme-text-primary">{item.label}</div>
                    <div className="text-xs text-theme-text-secondary">{item.description}</div>
                  </div>
                  <svg className="w-5 h-5 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
            className="fixed inset-0 bg-black/40 z-[10002]"
            onClick={() => setShowWiFiModal(false)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10003] max-w-sm mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📶</span>
                </div>
                <h3 className="text-xl font-bold text-theme-text-primary">WiFi</h3>
              </div>
              <button
                onClick={() => setShowWiFiModal(false)}
                className="w-10 h-10 rounded-full bg-theme-bg-tertiary flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Network Info */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-medium text-theme-text-tertiary mb-1 block">Network</label>
                <div className="bg-theme-bg-secondary px-4 py-3 rounded-xl">
                  <span className="font-mono font-bold text-theme-text-primary">{wifi.ssid}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-theme-text-tertiary mb-1 block">Password</label>
                <div className="bg-theme-bg-secondary px-4 py-3 rounded-xl flex items-center justify-between">
                  <span className="font-mono font-bold text-theme-text-primary">{wifi.password}</span>
                  <button
                    onClick={copyWiFiPassword}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
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
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
              <p className="text-center text-sm text-theme-text-secondary mb-3">Scan to connect</p>
              <div className="bg-white rounded-lg p-2 flex justify-center">
                <img
                  src={getWiFiQRUrl()}
                  alt="WiFi QR Code"
                  className="w-40 h-40"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[10002]"
            onClick={() => setShowResetConfirm(null)}
          />
          <div className="fixed inset-x-8 top-1/2 -translate-y-1/2 bg-theme-bg-elevated rounded-2xl shadow-2xl z-[10003] max-w-sm mx-auto p-6">
            <h3 className="text-lg font-bold text-theme-text-primary mb-2">
              {showResetConfirm === 'table' && 'Reset Table?'}
              {showResetConfirm === 'selections' && 'Reset Selections?'}
              {showResetConfirm === 'all' && 'Reset Everything?'}
            </h3>
            <p className="text-theme-text-secondary mb-6">
              {showResetConfirm === 'table' && 'This will clear the current table context.'}
              {showResetConfirm === 'selections' && 'This will clear all items in your order list.'}
              {showResetConfirm === 'all' && 'This will clear ALL stored data including table, orders, favorites, and preferences. The page will reload.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-theme-bg-tertiary text-theme-text-primary font-medium hover:bg-theme-bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReset(showResetConfirm)}
                className="flex-1 py-3 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
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
