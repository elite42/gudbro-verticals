'use client';

import { useState, useEffect } from 'react';
import { orderHistoryStore, Order } from '../../lib/order-history-store';
import { currencyPreferencesStore } from '../../lib/currency-preferences';
import { formatConvertedPrice } from '../../lib/currency-converter';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import Link from 'next/link';

/**
 * Orders Page - Chat-like timeline interface
 * Inspired by PokeWow's intuitive action history design
 */
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [isClient, setIsClient] = useState(false);

  // Load orders client-side only
  useEffect(() => {
    setIsClient(true);
    loadOrders();
  }, []);

  // Listen for order history updates
  useEffect(() => {
    const handleOrderHistoryUpdate = () => {
      loadOrders();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('order-history-updated', handleOrderHistoryUpdate);
      return () => window.removeEventListener('order-history-updated', handleOrderHistoryUpdate);
    }
  }, []);

  // Listen for currency preferences changes
  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    }
  }, []);

  const loadOrders = () => {
    const sessionOrders = orderHistoryStore.getSessionOrders();
    setOrders(sessionOrders);
  };

  // Format price based on currency preferences
  const formatPrice = (price: number) => {
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  };

  // Get relative time (e.g., "5 minutes ago", "Just now")
  const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'Adesso';
    if (minutes === 1) return '1 minuto fa';
    if (minutes < 60) return `${minutes} minuti fa`;
    if (hours === 1) return '1 ora fa';
    if (hours < 24) return `${hours} ore fa`;
    if (days === 1) return 'Ieri';
    return `${days} giorni fa`;
  };

  // Get absolute time (e.g., "14:30")
  const getAbsoluteTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status: Order['status']): string => {
    const colors: Record<Order['status'], string> = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
      'preparing': 'bg-orange-100 text-orange-800 border-orange-200',
      'ready': 'bg-green-100 text-green-800 border-green-200',
      'delivered': 'bg-theme-bg-secondary text-theme-text-primary border-theme-bg-tertiary',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status];
  };

  // Get status label
  const getStatusLabel = (status: Order['status']): string => {
    const labels: Record<Order['status'], string> = {
      'pending': 'In Attesa',
      'confirmed': 'Confermato',
      'preparing': 'In Preparazione',
      'ready': 'Pronto',
      'delivered': 'Consegnato',
      'cancelled': 'Annullato',
    };
    return labels[status];
  };

  // Get status icon
  const getStatusIcon = (status: Order['status']): string => {
    const icons: Record<Order['status'], string> = {
      'pending': '🕐',
      'confirmed': '✓',
      'preparing': '👨‍🍳',
      'ready': '✅',
      'delivered': '🎉',
      'cancelled': '❌',
    };
    return icons[status];
  };

  if (!isClient) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="min-h-screen bg-theme-bg-secondary pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/menu">
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">I Miei Ordini</h1>
                <p className="text-sm text-white/80">Timeline delle tue azioni</p>
              </div>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              <span className="font-bold text-lg">{orders.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-32 h-32 bg-theme-bg-tertiary rounded-full flex items-center justify-center mb-6">
              <svg className="w-16 h-16 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-theme-text-primary mb-2">Nessun Ordine Ancora</h2>
            <p className="text-theme-text-secondary mb-6">Inizia a ordinare dal menu!</p>
            <Link href="/menu">
              <button className="bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transition-all">
                Vai al Menu
              </button>
            </Link>
          </div>
        ) : (
          /* Timeline - Chat-like interface */
          <div className="space-y-4">
            {/* Today label */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="h-px bg-theme-bg-tertiary flex-1"></div>
              <span className="text-sm font-semibold text-theme-text-secondary uppercase">Oggi</span>
              <div className="h-px bg-theme-bg-tertiary flex-1"></div>
            </div>

            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-theme-bg-elevated rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Order Header - Like a chat message */}
                <div className="bg-theme-bg-secondary border-b border-theme-bg-tertiary p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-theme-brand-primary rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                        📦
                      </div>
                      {/* Order info */}
                      <div>
                        <div className="font-bold text-theme-text-primary text-lg">Ordine Effettuato</div>
                        <div className="text-sm text-theme-text-secondary">
                          {order.table_context.table_number ? (
                            <span className="font-semibold">
                              Tavolo {order.table_context.table_number}
                              {order.table_context.customer_name && ` • ${order.table_context.customer_name}`}
                            </span>
                          ) : (
                            <span className="font-semibold">
                              {order.table_context.service_type === 'takeaway' && 'Da Asporto'}
                              {order.table_context.service_type === 'counter-pickup' && 'Ritiro al Banco'}
                              {!order.table_context.service_type && 'Ritiro al Banco'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Status badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)} flex items-center gap-1`}>
                      <span>{getStatusIcon(order.status)}</span>
                      <span>{getStatusLabel(order.status)}</span>
                    </div>
                  </div>

                  {/* Time - Prominent display like PokeWow */}
                  <div className="flex items-center gap-2 mt-3 text-sm">
                    <svg className="w-4 h-4 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-amber-700">{getRelativeTime(order.submittedAt)}</span>
                    <span className="text-theme-text-tertiary">•</span>
                    <span className="text-theme-text-secondary">{getAbsoluteTime(order.submittedAt)}</span>
                  </div>
                </div>

                {/* Order Items - Expandable like chat details */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 pb-3 border-b border-theme-bg-tertiary last:border-0 last:pb-0">
                        {/* Image */}
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        {/* Item details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="font-semibold text-theme-text-primary">
                                {item.quantity}x {item.dish.name}
                              </div>
                              {item.extras.length > 0 && (
                                <div className="text-xs text-theme-text-secondary mt-1">
                                  {item.extras.map(extra => `+ ${extra.name}`).join(', ')}
                                </div>
                              )}
                            </div>
                            <div className="text-sm font-bold text-amber-700 flex-shrink-0">
                              {formatPrice((item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-4 pt-4 border-t-2 border-theme-bg-tertiary flex items-center justify-between">
                    <span className="text-lg font-semibold text-theme-text-primary">Totale</span>
                    <span className="text-2xl font-bold text-green-600">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavLocal />
    </div>
  );
}
