'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  getSessionOrders,
  subscribeToOrderStatus,
  Order,
  OrderStatus,
} from '../../lib/order-service';
import { currencyPreferencesStore } from '../../lib/currency-preferences';
import { formatConvertedPrice } from '../../lib/currency-converter';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { HomeHeader } from '../../components/HomeHeader';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import Link from 'next/link';

/**
 * Orders Page - Real-time order tracking with Supabase integration
 */

const statusConfig: Record<
  OrderStatus,
  { label: string; labelIt: string; color: string; bgColor: string; icon: string; step: number }
> = {
  pending: {
    label: 'Pending',
    labelIt: 'In Attesa',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: '⏳',
    step: 0,
  },
  confirmed: {
    label: 'Confirmed',
    labelIt: 'Confermato',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: '✓',
    step: 1,
  },
  preparing: {
    label: 'Preparing',
    labelIt: 'In Preparazione',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: '👨‍🍳',
    step: 2,
  },
  ready: {
    label: 'Ready!',
    labelIt: 'Pronto!',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: '🔔',
    step: 3,
  },
  delivered: {
    label: 'Delivered',
    labelIt: 'Consegnato',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: '✅',
    step: 4,
  },
  cancelled: {
    label: 'Cancelled',
    labelIt: 'Annullato',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: '✕',
    step: -1,
  },
};

const steps = [
  { key: 'confirmed', label: 'Confermato' },
  { key: 'preparing', label: 'Preparazione' },
  { key: 'ready', label: 'Pronto' },
];

function OrderCard({
  order,
  onStatusUpdate,
  formatPrice,
}: {
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
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-md transition-all ${isReady ? 'ring-2 ring-green-500' : ''}`}
    >
      {/* Header */}
      <div className={`${isReady ? 'bg-green-600' : 'bg-theme-bg-elevated'} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${isReady ? 'bg-white/20' : 'bg-theme-brand-primary text-white'}`}
            >
              {isReady ? '🔔' : '📦'}
            </div>
            <div>
              <p
                className={`text-2xl font-bold ${isReady ? 'text-white' : 'text-theme-text-primary'}`}
              >
                {order.order_code}
              </p>
              <p className={`text-sm ${isReady ? 'text-green-100' : 'text-theme-text-secondary'}`}>
                {order.table_number
                  ? `Tavolo ${order.table_number}`
                  : order.consumption_type === 'takeaway'
                    ? 'Da Asporto'
                    : 'Ritiro al Banco'}
              </p>
            </div>
          </div>
          <div
            className={`rounded-full px-3 py-1 text-sm font-medium ${config.bgColor} ${config.color}`}
          >
            {config.icon} {config.labelIt}
          </div>
        </div>

        {/* Time */}
        <div className={`mt-3 flex items-center gap-2 text-sm ${isReady ? 'text-green-100' : ''}`}>
          <svg
            className={`h-4 w-4 ${isReady ? 'text-green-200' : 'text-theme-text-secondary'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className={`font-semibold ${isReady ? 'text-white' : 'text-amber-700'}`}>
            {getRelativeTime(order.submitted_at)}
          </span>
          <span className={isReady ? 'text-green-200' : 'text-theme-text-tertiary'}>•</span>
          <span className={isReady ? 'text-green-100' : 'text-theme-text-secondary'}>
            {getAbsoluteTime(order.submitted_at)}
          </span>
        </div>
      </div>

      {/* Progress Bar (for active orders) */}
      {isActive && order.status !== 'pending' && (
        <div className="bg-theme-bg-secondary border-theme-border border-t px-4 py-4">
          <div className="mb-2 flex items-center justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = config.step >= stepNumber;
              const isCurrent = config.step === stepNumber;

              return (
                <div key={step.key} className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                          ? 'animate-pulse bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? '✓' : stepNumber}
                  </div>
                  <span
                    className={`mt-1 text-center text-xs ${isCompleted || isCurrent ? 'text-theme-text-primary font-medium' : 'text-theme-text-tertiary'}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress line */}
          <div className="relative mx-6 -mt-8 mb-6 h-1 rounded-full bg-gray-200">
            <div
              className="absolute h-full rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${Math.max(0, ((config.step - 1) / (steps.length - 1)) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Items */}
      <div className="bg-theme-bg-elevated border-theme-border border-t p-4">
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="border-theme-bg-tertiary flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-theme-text-primary font-semibold">
                      {item.quantity}x {item.name}
                    </div>
                    {item.extras && item.extras.length > 0 && (
                      <div className="text-theme-text-secondary mt-1 text-xs">
                        {item.extras.map((extra: { name: string }) => `+ ${extra.name}`).join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-sm font-bold text-amber-700">
                    {formatPrice(item.subtotal)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-theme-bg-tertiary mt-4 flex items-center justify-between border-t-2 pt-4">
          <span className="text-theme-text-primary text-lg font-semibold">Totale</span>
          <span className="text-2xl font-bold text-green-600">{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* Ready notification */}
      {isReady && (
        <div className="animate-pulse bg-green-600 p-4 text-center">
          <p className="text-lg font-bold text-white">Il tuo ordine è pronto! 🎉</p>
          <p className="mt-1 text-sm text-green-100">Vai al bancone per ritirarlo</p>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const _router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'active' | 'past'>('active');
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [isClient, setIsClient] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Push notifications hook
  const {
    isSupported: isPushSupported,
    permission: pushPermission,
    isSubscribed: isPushSubscribed,
    isLoading: isPushLoading,
    subscribe: subscribePush,
    unsubscribe: unsubscribePush,
  } = usePushNotifications();

  // Play notification sound when order is ready
  const playReadySound = useCallback(() => {
    if (!soundEnabled) return;

    // Try to play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback: try Web Audio API beep if audio file fails
        try {
          const audioContext = new (
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          )();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.value = 800; // Hz
          oscillator.type = 'sine';
          gainNode.gain.value = 0.3;

          oscillator.start();
          setTimeout(() => {
            oscillator.stop();
            audioContext.close();
          }, 300);
        } catch {
          // Silently fail if audio not available
        }
      });
    }
  }, [soundEnabled]);

  useEffect(() => {
    setIsClient(true);
    loadOrders();
    // Load sound preference from localStorage
    const savedPref = localStorage.getItem('orderSoundEnabled');
    if (savedPref !== null) {
      setSoundEnabled(savedPref === 'true');
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

  const handleStatusUpdate = useCallback(
    (orderId: string, newStatus: OrderStatus) => {
      setOrders((prev) => {
        const order = prev.find((o) => o.id === orderId);
        // Play sound only when transitioning TO 'ready' status
        if (order && order.status !== 'ready' && newStatus === 'ready') {
          playReadySound();
        }
        return prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      });
    },
    [playReadySound]
  );

  // Format price based on currency preferences
  const formatPrice = useCallback(
    (price: number) => {
      if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
        return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
      }
      const priceInK = Math.round(price / 1000);
      return `${priceInK}K`;
    },
    [currencyPrefs]
  );

  const activeOrders = orders.filter((o) =>
    ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status)
  );
  const pastOrders = orders.filter((o) => ['delivered', 'cancelled'].includes(o.status));
  const displayedOrders = filter === 'active' ? activeOrders : pastOrders;

  // Sort: ready orders first (for active), then by time
  const sortedOrders = [...displayedOrders].sort((a, b) => {
    if (filter === 'active') {
      // Ready orders first
      if (a.status === 'ready' && b.status !== 'ready') return -1;
      if (b.status === 'ready' && a.status !== 'ready') return 1;
    }
    // Then by submitted time (newest first for past, oldest first for active)
    return filter === 'active' ? a.submitted_at - b.submitted_at : b.submitted_at - a.submitted_at;
  });

  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-theme-bg-secondary min-h-screen pb-28">
        <HomeHeader />
        <div className="flex items-center justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-amber-600"></div>
        </div>
        <BottomNavLocal />
      </div>
    );
  }

  // Toggle sound preference
  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('orderSoundEnabled', String(newValue));
  };

  // Toggle push notifications
  const togglePush = async () => {
    if (isPushLoading) return;
    if (isPushSubscribed) {
      await unsubscribePush();
    } else {
      await subscribePush();
    }
  };

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28">
      {/* Hidden audio element for notification sound */}
      <audio
        ref={audioRef}
        preload="auto"
        src="data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"
      >
        {/* Fallback: empty audio, Web Audio API will be used as backup */}
      </audio>

      <HomeHeader />

      {/* Hero */}
      <div className="from-theme-brand-primary to-theme-brand-primary bg-gradient-to-r px-4 py-6 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">📋 I Miei Ordini</h1>
            <p className="text-lg opacity-90">Segui i tuoi ordini in tempo reale</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Push notifications toggle */}
            {isPushSupported && (
              <button
                onClick={togglePush}
                disabled={isPushLoading || pushPermission === 'denied'}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  isPushSubscribed
                    ? 'bg-green-500/30 hover:bg-green-500/40'
                    : pushPermission === 'denied'
                      ? 'cursor-not-allowed bg-red-500/20'
                      : 'bg-white/20 hover:bg-white/30'
                } ${isPushLoading ? 'opacity-50' : ''}`}
                title={
                  pushPermission === 'denied'
                    ? 'Notifiche bloccate nelle impostazioni'
                    : isPushSubscribed
                      ? 'Disattiva notifiche push'
                      : 'Attiva notifiche push'
                }
              >
                <span className="text-xl">
                  {isPushLoading
                    ? '⏳'
                    : isPushSubscribed
                      ? '📲'
                      : pushPermission === 'denied'
                        ? '🚫'
                        : '📱'}
                </span>
                <span className="hidden text-sm sm:inline">
                  {isPushLoading
                    ? '...'
                    : isPushSubscribed
                      ? 'Push ON'
                      : pushPermission === 'denied'
                        ? 'Bloccato'
                        : 'Push OFF'}
                </span>
              </button>
            )}
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 transition-colors hover:bg-white/30"
              title={soundEnabled ? 'Disattiva suoni' : 'Attiva suoni'}
            >
              <span className="text-xl">{soundEnabled ? '🔔' : '🔕'}</span>
              <span className="hidden text-sm sm:inline">
                {soundEnabled ? 'Suono ON' : 'Suono OFF'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 rounded-xl py-3 font-medium transition-colors ${
              filter === 'active'
                ? 'bg-amber-600 text-white'
                : 'bg-theme-bg-elevated text-theme-text-secondary'
            }`}
          >
            Attivi ({activeOrders.length})
            {activeOrders.some((o) => o.status === 'ready') && (
              <span className="ml-2 inline-flex h-2 w-2 animate-ping rounded-full bg-green-400"></span>
            )}
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`flex-1 rounded-xl py-3 font-medium transition-colors ${
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
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">{filter === 'active' ? '🍽️' : '📜'}</div>
            <h3 className="text-theme-text-primary mb-2 text-xl font-bold">
              {filter === 'active' ? 'Nessun ordine attivo' : 'Nessun ordine passato'}
            </h3>
            <p className="text-theme-text-secondary mb-6">
              {filter === 'active'
                ? 'Ordina dal menu per iniziare!'
                : 'La cronologia dei tuoi ordini apparirà qui'}
            </p>
            {filter === 'active' && (
              <Link href="/menu">
                <button className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-3 font-bold text-white">
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
