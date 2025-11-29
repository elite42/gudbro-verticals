'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getSessionOrders, subscribeToOrderStatus, Order, OrderStatus } from '../../lib/order-service';
import { currencyPreferencesStore } from '../../lib/currency-preferences';
import { formatConvertedPrice } from '../../lib/currency-converter';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { HomeHeader } from '../../components/HomeHeader';
import Link from 'next/link';

/**
 * Orders Page - Real-time order tracking with Supabase integration
 */

const statusConfig: Record<OrderStatus, { label: string; labelIt: string; color: string; bgColor: string; icon: string; step: number }> = {
  pending: { label: 'Pending', labelIt: 'In Attesa', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: '⏳', step: 0 },
  confirmed: { label: 'Confirmed', labelIt: 'Confermato', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: '✓', step: 1 },
  preparing: { label: 'Preparing', labelIt: 'In Preparazione', color: 'text-orange-600', bgColor: 'bg-orange-100', icon: '👨‍🍳', step: 2 },
  ready: { label: 'Ready!', labelIt: 'Pronto!', color: 'text-green-600', bgColor: 'bg-green-100', icon: '🔔', step: 3 },
  delivered: { label: 'Delivered', labelIt: 'Consegnato', color: 'text-gray-600', bgColor: 'bg-gray-100', icon: '✅', step: 4 },
  cancelled: { label: 'Cancelled', labelIt: 'Annullato', color: 'text-red-600', bgColor: 'bg-red-100', icon: '✕', step: -1 },
};

const steps = [
  { key: 'confirmed', label: 'Confermato' },
  { key: 'preparing', label: 'Preparazione' },
  { key: 'ready', label: 'Pronto' },
];

function OrderCard({ order, onStatusUpdate, formatPrice }: {
  order: Order;
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
  formatPrice: (price: number) => string;
}) {
  const config = statusConfig[order.status];
  const isActive = ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status);
  const isReady = order.status === 'ready';

  useEffect(() => {
    // Subscribe to real-time status updates
    const unsubscribe = subscribeToOrderStatus(order.id, (newStatus) => {
      onStatusUpdate(order.id, newStatus);
    });

    return unsubscribe;
  }, [order.id, onStatusUpdate]);

  // Get relative time
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

  const getAbsoluteTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`rounded-2xl shadow-md overflow-hidden transition-all ${isReady ? 'ring-2 ring-green-500' : ''}`}>
      {/* Header */}
      <div className={`${isReady ? 'bg-green-600' : 'bg-theme-bg-elevated'} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isReady ? 'bg-white/20' : 'bg-theme-brand-primary text-white'}`}>
              {isReady ? '🔔' : '📦'}
            </div>
            <div>
              <p className={`text-2xl font-bold ${isReady ? 'text-white' : 'text-theme-text-primary'}`}>
                {order.order_code}
              </p>
              <p className={`text-sm ${isReady ? 'text-green-100' : 'text-theme-text-secondary'}`}>
                {order.table_number ? `Tavolo ${order.table_number}` : order.consumption_type === 'takeaway' ? 'Da Asporto' : 'Ritiro al Banco'}
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}>
            {config.icon} {config.labelIt}
          </div>
        </div>

        {/* Time */}
        <div className={`flex items-center gap-2 mt-3 text-sm ${isReady ? 'text-green-100' : ''}`}>
          <svg className={`w-4 h-4 ${isReady ? 'text-green-200' : 'text-theme-text-secondary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`font-semibold ${isReady ? 'text-white' : 'text-amber-700'}`}>{getRelativeTime(order.submitted_at)}</span>
          <span className={isReady ? 'text-green-200' : 'text-theme-text-tertiary'}>•</span>
          <span className={isReady ? 'text-green-100' : 'text-theme-text-secondary'}>{getAbsoluteTime(order.submitted_at)}</span>
        </div>
      </div>

      {/* Progress Bar (for active orders) */}
      {isActive && order.status !== 'pending' && (
        <div className="bg-theme-bg-secondary px-4 py-4 border-t border-theme-border">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = config.step >= stepNumber;
              const isCurrent = config.step === stepNumber;

              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-orange-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? '✓' : stepNumber}
                  </div>
                  <span className={`text-xs mt-1 text-center ${isCompleted || isCurrent ? 'text-theme-text-primary font-medium' : 'text-theme-text-tertiary'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress line */}
          <div className="relative h-1 bg-gray-200 rounded-full mx-6 -mt-8 mb-6">
            <div
              className="absolute h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(0, (config.step - 1) / (steps.length - 1) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Items */}
      <div className="bg-theme-bg-elevated p-4 border-t border-theme-border">
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 pb-3 border-b border-theme-bg-tertiary last:border-0 last:pb-0">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="font-semibold text-theme-text-primary">
                      {item.quantity}x {item.name}
                    </div>
                    {item.extras && item.extras.length > 0 && (
                      <div className="text-xs text-theme-text-secondary mt-1">
                        {item.extras.map((extra: { name: string }) => `+ ${extra.name}`).join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-bold text-amber-700 flex-shrink-0">
                    {formatPrice(item.subtotal)}
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

      {/* Ready notification */}
      {isReady && (
        <div className="bg-green-600 p-4 text-center animate-pulse">
          <p className="text-white font-bold text-lg">Il tuo ordine è pronto! 🎉</p>
          <p className="text-green-100 text-sm mt-1">Vai al bancone per ritirarlo</p>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'active' | 'past'>('active');
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadOrders();
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

  const loadOrders = async () => {
    try {
      const sessionOrders = await getSessionOrders();
      setOrders(sessionOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  }, []);

  // Format price based on currency preferences
  const formatPrice = useCallback((price: number) => {
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  }, [currencyPrefs]);

  const activeOrders = orders.filter(o => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status));
  const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status));
  const displayedOrders = filter === 'active' ? activeOrders : pastOrders;

  // Sort: ready orders first (for active), then by time
  const sortedOrders = [...displayedOrders].sort((a, b) => {
    if (filter === 'active') {
      // Ready orders first
      if (a.status === 'ready' && b.status !== 'ready') return -1;
      if (b.status === 'ready' && a.status !== 'ready') return 1;
    }
    // Then by submitted time (newest first for past, oldest first for active)
    return filter === 'active'
      ? a.submitted_at - b.submitted_at
      : b.submitted_at - a.submitted_at;
  });

  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg-secondary pb-28">
        <HomeHeader />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
        <BottomNavLocal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg-secondary pb-28">
      <HomeHeader />

      {/* Hero */}
      <div className="bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">📋 I Miei Ordini</h1>
          <p className="text-lg opacity-90">
            Segui i tuoi ordini in tempo reale
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              filter === 'active'
                ? 'bg-amber-600 text-white'
                : 'bg-theme-bg-elevated text-theme-text-secondary'
            }`}
          >
            Attivi ({activeOrders.length})
            {activeOrders.some(o => o.status === 'ready') && (
              <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping"></span>
            )}
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              filter === 'past'
                ? 'bg-amber-600 text-white'
                : 'bg-theme-bg-elevated text-theme-text-secondary'
            }`}
          >
            Passati ({pastOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="container mx-auto px-4 pb-6">
        {sortedOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              {filter === 'active' ? '🍽️' : '📜'}
            </div>
            <h3 className="text-xl font-bold text-theme-text-primary mb-2">
              {filter === 'active' ? 'Nessun ordine attivo' : 'Nessun ordine passato'}
            </h3>
            <p className="text-theme-text-secondary mb-6">
              {filter === 'active'
                ? 'Ordina dal menu per iniziare!'
                : 'La cronologia dei tuoi ordini apparirà qui'}
            </p>
            {filter === 'active' && (
              <Link href="/menu">
                <button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-xl font-bold">
                  Vai al Menu
                </button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNavLocal />
    </div>
  );
}
