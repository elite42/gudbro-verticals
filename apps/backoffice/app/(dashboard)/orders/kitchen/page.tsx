'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
type ItemStatus = 'pending' | 'preparing' | 'ready' | 'served';
type LayoutMode = 'grid' | 'columns';
type ViewMode = 'order' | 'item'; // NEW: Order-level or Item-level view

const STATION = 'kitchen'; // Auto-set station for this display

interface OrderItem {
  id: string;
  item_name: { en?: string; vi?: string };
  quantity: number;
  extras: Array<{ id: string; name: string; price: number }>;
  special_instructions: string | null;
  item_status: ItemStatus;
  station: string | null;
  preparing_at: string | null;
  ready_at: string | null;
}

interface Order {
  id: string;
  order_code: string;
  customer_name: string | null;
  table_number: string | null;
  consumption_type: 'dine-in' | 'takeaway';
  status: OrderStatus;
  submitted_at: string;
  confirmed_at: string | null;
  preparing_at: string | null;
  customer_notes: string | null;
  order_items?: OrderItem[];
  isNew?: boolean;
}

// Generate alert sound using Web Audio API
function playAlertSound(audioContext: AudioContext | null) {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);

  setTimeout(() => {
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.setValueAtTime(1108.73, audioContext.currentTime);
    osc2.type = 'sine';
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    osc2.start(audioContext.currentTime);
    osc2.stop(audioContext.currentTime + 0.4);
  }, 150);
}

function getElapsedMinutes(dateString: string): number {
  const now = new Date();
  const date = new Date(dateString);
  return Math.floor((now.getTime() - date.getTime()) / 60000);
}

function getElapsedSeconds(dateString: string): number {
  const now = new Date();
  const date = new Date(dateString);
  return Math.floor((now.getTime() - date.getTime()) / 1000);
}

function getTimerColor(minutes: number, status: OrderStatus | ItemStatus): string {
  if (status === 'ready') return 'text-green-600';
  if (minutes > 15) return 'text-red-600';
  if (minutes > 10) return 'text-orange-600';
  if (minutes > 5) return 'text-yellow-600';
  return 'text-gray-600';
}

function formatTimer(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatTimerSeconds(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (minutes < 60) return `${minutes}:${secs.toString().padStart(2, '0')}`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export default function KitchenDisplayPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid');
  const [viewMode, setViewMode] = useState<ViewMode>('order'); // NEW
  const [showSettings, setShowSettings] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const previousOrderIdsRef = useRef<Set<string>>(new Set());

  // Initialize audio context on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        )();
      }
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, []);

  const fetchOrders = useCallback(
    async (isRealtime = false) => {
      try {
        const { data: ordersData, error } = await supabase
          .from('orders')
          .select('*')
          .in('status', ['confirmed', 'preparing', 'ready'])
          .order('submitted_at', { ascending: true });

        if (error) throw error;

        // Fetch items for each order with timing columns
        const ordersWithItems = await Promise.all(
          (ordersData || []).map(async (order) => {
            const { data: items } = await supabase
              .from('order_items')
              .select(
                'id, item_name, quantity, extras, special_instructions, item_status, station, preparing_at, ready_at'
              )
              .eq('order_id', order.id);
            return { ...order, order_items: items || [] };
          })
        );

        // Check for new orders and mark them + play sound
        const currentIds = new Set(ordersWithItems.map((o) => o.id));
        const newOrderIds = ordersWithItems
          .filter((o) => !previousOrderIdsRef.current.has(o.id) && o.status === 'confirmed')
          .map((o) => o.id);

        if (newOrderIds.length > 0 && isRealtime && soundEnabled) {
          playAlertSound(audioContextRef.current);
        }

        const ordersWithNewFlag = ordersWithItems.map((o) => ({
          ...o,
          isNew: newOrderIds.includes(o.id),
        }));

        setOrders(ordersWithNewFlag);
        previousOrderIdsRef.current = currentIds;

        if (newOrderIds.length > 0) {
          setTimeout(() => {
            setOrders((prev) => prev.map((o) => ({ ...o, isNew: false })));
          }, 3000);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    },
    [soundEnabled]
  );

  // Update ORDER status
  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const previousStatus = order.status;

    // Optimistic update
    if (newStatus === 'delivered') {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } else {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    }

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // When starting an order, also update all pending items to preparing
      if (newStatus === 'preparing') {
        const pendingItems = order.order_items?.filter((i) => i.item_status === 'pending') || [];
        for (const item of pendingItems) {
          await updateItemStatus(item.id, 'preparing', false);
        }
      }

      // When marking order ready, update all preparing items to ready
      if (newStatus === 'ready') {
        const preparingItems =
          order.order_items?.filter((i) => i.item_status === 'preparing') || [];
        for (const item of preparingItems) {
          await updateItemStatus(item.id, 'ready', false);
        }
      }

      // Send push notification when order is ready
      if (newStatus === 'ready') {
        try {
          const { data: orderData } = await supabase
            .from('orders')
            .select('session_id')
            .eq('id', orderId)
            .single();

          if (orderData?.session_id) {
            await fetch('/api/send-push', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                sessionId: orderData.session_id,
                orderCode: order.order_code,
              }),
            }).catch(() => {
              /* Push non-blocking */
            });
          }
        } catch {
          // Push notification non-blocking
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      if (newStatus === 'delivered') {
        setOrders((prev) =>
          [...prev, order].sort(
            (a, b) => new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()
          )
        );
      } else {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: previousStatus } : o))
        );
      }
    }
  };

  // Update ITEM status (NEW)
  const updateItemStatus = async (itemId: string, newStatus: ItemStatus, refetch = true) => {
    try {
      // Call API to update item status with station tracking
      const response = await fetch(`/api/orders/items/${itemId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          station: STATION,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item status');
      }

      // Refresh orders to get updated item statuses
      if (refetch) {
        await fetchOrders(false);
      }

      // Check if all items in an order are ready -> update order status
      const item = orders.flatMap((o) => o.order_items || []).find((i) => i.id === itemId);
      if (item && newStatus === 'ready') {
        const order = orders.find((o) => o.order_items?.some((i) => i.id === itemId));
        if (order) {
          const allItemsReady = order.order_items?.every((i) =>
            i.id === itemId ? true : i.item_status === 'ready' || i.item_status === 'served'
          );
          if (allItemsReady && order.status !== 'ready') {
            await updateOrderStatus(order.id, 'ready');
          }
        }
      }
    } catch (err) {
      console.error('Error updating item status:', err);
    }
  };

  useEffect(() => {
    fetchOrders(false);

    // Update timer every second for item-level timing
    const timerInterval = setInterval(
      () => {
        setNow(new Date());
      },
      viewMode === 'item' ? 1000 : 60000
    );

    const refreshInterval = setInterval(() => fetchOrders(false), 30000);

    const channel = supabase
      .channel('kitchen-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders(true);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, () => {
        fetchOrders(false);
      })
      .subscribe();

    return () => {
      clearInterval(timerInterval);
      clearInterval(refreshInterval);
      supabase.removeChannel(channel);
    };
  }, [fetchOrders, viewMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key;

      if (key >= '1' && key <= '9') {
        const index = parseInt(key) - 1;
        if (confirmedOrders[index]) {
          updateOrderStatus(confirmedOrders[index].id, 'preparing');
        }
      }

      const prepKeys = ['q', 'w', 'e', 'r', 't'];
      const prepIndex = prepKeys.indexOf(key.toLowerCase());
      if (prepIndex !== -1 && preparingOrders[prepIndex]) {
        updateOrderStatus(preparingOrders[prepIndex].id, 'ready');
      }

      const readyKeys = ['a', 's', 'd', 'f', 'g'];
      const readyIndex = readyKeys.indexOf(key.toLowerCase());
      if (readyIndex !== -1 && readyOrders[readyIndex]) {
        updateOrderStatus(readyOrders[readyIndex].id, 'delivered');
      }

      if (key.toLowerCase() === 'm') {
        setSoundEnabled((prev) => !prev);
      }

      if (key.toLowerCase() === 'l') {
        setLayoutMode((prev) => (prev === 'grid' ? 'columns' : 'grid'));
      }

      if (key.toLowerCase() === 'v') {
        setViewMode((prev) => (prev === 'order' ? 'item' : 'order'));
      }

      if (key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const confirmedOrders = orders.filter((o) => o.status === 'confirmed');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const readyOrders = orders.filter((o) => o.status === 'ready');

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Item status button component
  const ItemStatusButton = ({ item, orderId }: { item: OrderItem; orderId: string }) => {
    const elapsed = item.preparing_at ? getElapsedSeconds(item.preparing_at) : 0;
    const elapsedMinutes = Math.floor(elapsed / 60);

    const getNextStatus = (): ItemStatus | null => {
      switch (item.item_status) {
        case 'pending':
          return 'preparing';
        case 'preparing':
          return 'ready';
        default:
          return null;
      }
    };

    const nextStatus = getNextStatus();

    const getButtonStyle = () => {
      switch (item.item_status) {
        case 'pending':
          return 'bg-blue-600 hover:bg-blue-700';
        case 'preparing':
          return 'bg-orange-600 hover:bg-orange-700';
        case 'ready':
          return 'bg-green-600';
        case 'served':
          return 'bg-gray-600';
        default:
          return 'bg-gray-600';
      }
    };

    const getStatusIcon = () => {
      switch (item.item_status) {
        case 'pending':
          return '⏳';
        case 'preparing':
          return '🔥';
        case 'ready':
          return '✓';
        case 'served':
          return '✓✓';
        default:
          return '';
      }
    };

    return (
      <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-2 text-sm">
        <div className="flex-1">
          <span className="font-medium text-white">
            <span className="text-orange-400">{item.quantity}×</span>{' '}
            {item.item_name.en || item.item_name.vi}
          </span>
          {item.special_instructions && <span className="ml-1 text-yellow-400">⚠️</span>}
          {item.item_status === 'preparing' && (
            <span
              className={`ml-2 font-mono text-xs ${getTimerColor(elapsedMinutes, item.item_status)}`}
            >
              {formatTimerSeconds(elapsed)}
            </span>
          )}
          {item.item_status === 'ready' && item.preparing_at && item.ready_at && (
            <span className="ml-2 text-xs text-green-400">
              (
              {Math.floor(
                (new Date(item.ready_at).getTime() - new Date(item.preparing_at).getTime()) / 1000
              )}
              s)
            </span>
          )}
        </div>
        {nextStatus ? (
          <button
            onClick={() => updateItemStatus(item.id, nextStatus)}
            className={`ml-2 rounded px-2 py-1 text-xs font-bold text-white ${getButtonStyle()}`}
          >
            {getStatusIcon()} {nextStatus === 'preparing' ? 'START' : 'DONE'}
          </button>
        ) : (
          <span
            className={`ml-2 rounded px-2 py-1 text-xs font-bold text-white ${getButtonStyle()}`}
          >
            {getStatusIcon()}
          </span>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white">Kitchen Display</h1>
            <InfoTooltip contentKey="pages.kitchenDisplay" kbPageId="kitchen-display" />
          </div>
          <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
            Live
          </span>
          {viewMode === 'item' && (
            <span className="rounded-full bg-orange-600 px-3 py-1 text-sm font-medium text-white">
              Per-Item Mode
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden text-lg text-gray-400 sm:block">
            {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'order' ? 'item' : 'order')}
            className={`rounded-lg p-2 transition-colors ${
              viewMode === 'item'
                ? 'bg-orange-700 text-white hover:bg-orange-600'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            title={viewMode === 'order' ? 'Switch to Item Mode (V)' : 'Switch to Order Mode (V)'}
          >
            {viewMode === 'order' ? '📦' : '🍽️'}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`rounded-lg p-2 transition-colors ${
              soundEnabled
                ? 'bg-green-700 text-white hover:bg-green-600'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            title={soundEnabled ? 'Sound ON (M)' : 'Sound OFF (M)'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Layout Toggle */}
          <button
            onClick={() => setLayoutMode(layoutMode === 'grid' ? 'columns' : 'grid')}
            className="rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-700"
            title={`${layoutMode === 'grid' ? 'Grid' : 'Columns'} View (L)`}
          >
            {layoutMode === 'grid' ? '⊞' : '☰'}
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-700"
            title="Keyboard Shortcuts"
          >
            ⌨️
          </button>

          <button
            onClick={toggleFullscreen}
            className="rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-700"
            title="Fullscreen (F)"
          >
            {isFullscreen ? '⊙' : '⛶'}
          </button>

          <a
            href="/orders/bar"
            className="hidden rounded-lg bg-purple-800 px-4 py-2 text-white hover:bg-purple-700 sm:block"
            title="Switch to Bar Display"
          >
            🍹 Bar
          </a>

          <a
            href="/orders"
            className="hidden rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 sm:block"
          >
            ← Orders
          </a>
        </div>
      </div>

      {/* Keyboard Shortcuts Panel */}
      {showSettings && (
        <div className="mb-6 rounded-xl border border-gray-700 bg-gray-800 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">⌨️ Keyboard Shortcuts (Bump Bar)</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-blue-900/50 p-3">
              <p className="mb-2 font-medium text-blue-300">Queue → Preparing</p>
              <div className="flex flex-wrap gap-1">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((k) => (
                  <kbd key={k} className="rounded bg-gray-700 px-2 py-1 text-sm text-white">
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-orange-900/50 p-3">
              <p className="mb-2 font-medium text-orange-300">Preparing → Ready</p>
              <div className="flex flex-wrap gap-1">
                {['Q', 'W', 'E', 'R', 'T'].map((k) => (
                  <kbd key={k} className="rounded bg-gray-700 px-2 py-1 text-sm text-white">
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-green-900/50 p-3">
              <p className="mb-2 font-medium text-green-300">Ready → Picked Up</p>
              <div className="flex flex-wrap gap-1">
                {['A', 'S', 'D', 'F', 'G'].map((k) => (
                  <kbd key={k} className="rounded bg-gray-700 px-2 py-1 text-sm text-white">
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
            <span>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-white">M</kbd> Toggle sound
            </span>
            <span>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-white">L</kbd> Toggle layout
            </span>
            <span>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-white">V</kbd> Toggle view mode
            </span>
            <span>
              <kbd className="rounded bg-gray-700 px-2 py-1 text-white">F</kbd> Fullscreen
            </span>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-blue-700 bg-blue-900/50 p-4 text-center">
          <p className="text-sm font-medium text-blue-400">Queue</p>
          <p className="text-4xl font-bold text-blue-300">{confirmedOrders.length}</p>
        </div>
        <div className="rounded-xl border border-orange-700 bg-orange-900/50 p-4 text-center">
          <p className="text-sm font-medium text-orange-400">Preparing</p>
          <p className="text-4xl font-bold text-orange-300">{preparingOrders.length}</p>
        </div>
        <div className="rounded-xl border border-green-700 bg-green-900/50 p-4 text-center">
          <p className="text-sm font-medium text-green-400">Ready</p>
          <p className="text-4xl font-bold text-green-300">{readyOrders.length}</p>
        </div>
      </div>

      {/* Orders - Column Layout */}
      {layoutMode === 'columns' ? (
        <div className="grid min-h-[60vh] grid-cols-3 gap-4">
          {/* Queue Column */}
          <div className="rounded-xl border border-blue-700 bg-blue-900/20 p-3">
            <h2 className="mb-4 text-center text-xl font-bold text-blue-300">
              QUEUE ({confirmedOrders.length})
            </h2>
            <div className="space-y-3">
              {confirmedOrders.map((order, index) => {
                const elapsed = getElapsedMinutes(order.submitted_at);
                return (
                  <div
                    key={order.id}
                    className={`rounded-xl border-2 border-blue-600 bg-blue-900/30 p-3 ${
                      order.isNew ? 'animate-pulse ring-4 ring-yellow-400' : ''
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <kbd className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                          {index + 1}
                        </kbd>
                        <span className="text-xl font-bold text-white">{order.order_code}</span>
                      </div>
                      <span
                        className={`font-mono font-bold ${getTimerColor(elapsed, order.status)}`}
                      >
                        {formatTimer(elapsed)}
                      </span>
                    </div>
                    <p className="mb-2 text-xs text-blue-300">
                      {order.customer_name || 'Guest'} •{' '}
                      {order.consumption_type === 'takeaway' ? 'TAKE' : 'DINE'}
                      {order.table_number ? ` • T${order.table_number}` : ''}
                    </p>
                    <div className="mb-3 space-y-1">
                      {viewMode === 'item' ? (
                        order.order_items?.map((item) => (
                          <ItemStatusButton key={item.id} item={item} orderId={order.id} />
                        ))
                      ) : (
                        <>
                          {order.order_items?.slice(0, 3).map((item) => (
                            <p key={item.id} className="text-sm text-white">
                              <span className="text-blue-400">{item.quantity}×</span>{' '}
                              {item.item_name.en || item.item_name.vi}
                              {item.special_instructions && (
                                <span className="ml-1 text-yellow-400">⚠️</span>
                              )}
                            </p>
                          ))}
                          {(order.order_items?.length || 0) > 3 && (
                            <p className="text-xs text-blue-400">
                              +{(order.order_items?.length || 0) - 3} more...
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="w-full rounded-lg bg-orange-600 py-2 font-bold text-white hover:bg-orange-700"
                    >
                      START ALL
                    </button>
                  </div>
                );
              })}
              {confirmedOrders.length === 0 && (
                <p className="py-8 text-center text-blue-400">No orders in queue</p>
              )}
            </div>
          </div>

          {/* Preparing Column */}
          <div className="rounded-xl border border-orange-700 bg-orange-900/20 p-3">
            <h2 className="mb-4 text-center text-xl font-bold text-orange-300">
              PREPARING ({preparingOrders.length})
            </h2>
            <div className="space-y-3">
              {preparingOrders.map((order, index) => {
                const elapsed = getElapsedMinutes(order.preparing_at || order.submitted_at);
                const prepKeys = ['Q', 'W', 'E', 'R', 'T'];
                return (
                  <div
                    key={order.id}
                    className="rounded-xl border-2 border-orange-500 bg-orange-900/30 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {index < 5 && (
                          <kbd className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                            {prepKeys[index]}
                          </kbd>
                        )}
                        <span className="text-xl font-bold text-white">{order.order_code}</span>
                      </div>
                      <span
                        className={`font-mono font-bold ${getTimerColor(elapsed, order.status)}`}
                      >
                        {formatTimer(elapsed)}
                      </span>
                    </div>
                    <p className="mb-2 text-xs text-orange-300">
                      {order.customer_name || 'Guest'} •{' '}
                      {order.consumption_type === 'takeaway' ? 'TAKE' : 'DINE'}
                      {order.table_number ? ` • T${order.table_number}` : ''}
                    </p>
                    <div className="mb-3 space-y-1">
                      {viewMode === 'item'
                        ? order.order_items?.map((item) => (
                            <ItemStatusButton key={item.id} item={item} orderId={order.id} />
                          ))
                        : order.order_items?.map((item) => (
                            <p key={item.id} className="text-sm text-white">
                              <span className="text-orange-400">{item.quantity}×</span>{' '}
                              {item.item_name.en || item.item_name.vi}
                              {item.special_instructions && (
                                <span className="ml-1 text-yellow-400">⚠️</span>
                              )}
                            </p>
                          ))}
                    </div>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="w-full rounded-lg bg-green-600 py-2 font-bold text-white hover:bg-green-700"
                    >
                      ALL DONE
                    </button>
                  </div>
                );
              })}
              {preparingOrders.length === 0 && (
                <p className="py-8 text-center text-orange-400">No orders preparing</p>
              )}
            </div>
          </div>

          {/* Ready Column */}
          <div className="rounded-xl border border-green-700 bg-green-900/20 p-3">
            <h2 className="mb-4 text-center text-xl font-bold text-green-300">
              READY ({readyOrders.length})
            </h2>
            <div className="space-y-3">
              {readyOrders.map((order, index) => {
                const readyKeys = ['A', 'S', 'D', 'F', 'G'];
                return (
                  <div
                    key={order.id}
                    className="rounded-xl border-2 border-green-500 bg-green-900/30 p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {index < 5 && (
                          <kbd className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                            {readyKeys[index]}
                          </kbd>
                        )}
                        <span className="text-xl font-bold text-white">{order.order_code}</span>
                      </div>
                      <span className="animate-pulse rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                        READY
                      </span>
                    </div>
                    <p className="mb-2 text-xs text-green-300">
                      {order.customer_name || 'Guest'} •{' '}
                      {order.consumption_type === 'takeaway' ? 'TAKE' : 'DINE'}
                      {order.table_number ? ` • T${order.table_number}` : ''}
                    </p>
                    <p className="mb-3 text-sm text-green-200">
                      {order.order_items?.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="w-full rounded-lg bg-gray-600 py-2 font-bold text-white hover:bg-gray-700"
                    >
                      PICKED UP
                    </button>
                  </div>
                );
              })}
              {readyOrders.length === 0 && (
                <p className="py-8 text-center text-green-400">No orders ready</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Confirmed Orders - Queue */}
          {confirmedOrders.map((order, index) => {
            const elapsed = getElapsedMinutes(order.submitted_at);
            return (
              <div
                key={order.id}
                className={`rounded-xl border-2 border-blue-600 bg-blue-900/30 p-4 ${
                  order.isNew ? 'animate-pulse ring-4 ring-yellow-400' : ''
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {index < 9 && (
                      <kbd className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                        {index + 1}
                      </kbd>
                    )}
                    <span className="text-2xl font-bold text-white">{order.order_code}</span>
                    {order.table_number && (
                      <span className="rounded bg-blue-800 px-2 py-0.5 text-sm text-blue-200">
                        T{order.table_number}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-mono text-lg font-bold ${getTimerColor(elapsed, order.status)}`}
                  >
                    {formatTimer(elapsed)}
                  </span>
                </div>

                <p className="mb-3 text-sm text-blue-300">
                  {order.customer_name || 'Guest'} •{' '}
                  {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
                </p>

                <div className="mb-4 space-y-2">
                  {viewMode === 'item'
                    ? order.order_items?.map((item) => (
                        <ItemStatusButton key={item.id} item={item} orderId={order.id} />
                      ))
                    : order.order_items?.map((item) => (
                        <div key={item.id} className="rounded-lg bg-blue-900/50 p-2">
                          <p className="font-medium text-white">
                            <span className="text-blue-400">{item.quantity}x</span>{' '}
                            {item.item_name.en || item.item_name.vi}
                          </p>
                          {item.extras && item.extras.length > 0 && (
                            <p className="text-sm text-blue-300">
                              + {item.extras.map((e) => e.name).join(', ')}
                            </p>
                          )}
                          {item.special_instructions && (
                            <p className="mt-1 text-sm text-yellow-400">
                              ⚠️ {item.special_instructions}
                            </p>
                          )}
                        </div>
                      ))}
                </div>

                {order.customer_notes && (
                  <div className="mb-4 rounded-lg border border-yellow-600 bg-yellow-900/50 p-2">
                    <p className="text-sm text-yellow-300">{order.customer_notes}</p>
                  </div>
                )}

                <button
                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                  className="w-full rounded-lg bg-orange-600 py-3 text-lg font-bold text-white transition-colors hover:bg-orange-700"
                >
                  START
                </button>
              </div>
            );
          })}

          {/* Preparing Orders */}
          {preparingOrders.map((order, index) => {
            const elapsed = getElapsedMinutes(order.preparing_at || order.submitted_at);
            const prepKeys = ['Q', 'W', 'E', 'R', 'T'];
            return (
              <div
                key={order.id}
                className="rounded-xl border-2 border-orange-500 bg-orange-900/30 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {index < 5 && (
                      <kbd className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                        {prepKeys[index]}
                      </kbd>
                    )}
                    <span className="text-2xl font-bold text-white">{order.order_code}</span>
                    {order.table_number && (
                      <span className="rounded bg-orange-800 px-2 py-0.5 text-sm text-orange-200">
                        T{order.table_number}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-mono text-lg font-bold ${getTimerColor(elapsed, order.status)}`}
                  >
                    {formatTimer(elapsed)}
                  </span>
                </div>

                <p className="mb-3 text-sm text-orange-300">
                  {order.customer_name || 'Guest'} •{' '}
                  {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
                </p>

                <div className="mb-4 space-y-2">
                  {viewMode === 'item'
                    ? order.order_items?.map((item) => (
                        <ItemStatusButton key={item.id} item={item} orderId={order.id} />
                      ))
                    : order.order_items?.map((item) => (
                        <div key={item.id} className="rounded-lg bg-orange-900/50 p-2">
                          <p className="font-medium text-white">
                            <span className="text-orange-400">{item.quantity}x</span>{' '}
                            {item.item_name.en || item.item_name.vi}
                          </p>
                          {item.extras && item.extras.length > 0 && (
                            <p className="text-sm text-orange-300">
                              + {item.extras.map((e) => e.name).join(', ')}
                            </p>
                          )}
                          {item.special_instructions && (
                            <p className="mt-1 text-sm text-yellow-400">
                              ⚠️ {item.special_instructions}
                            </p>
                          )}
                        </div>
                      ))}
                </div>

                <button
                  onClick={() => updateOrderStatus(order.id, 'ready')}
                  className="w-full rounded-lg bg-green-600 py-3 text-lg font-bold text-white transition-colors hover:bg-green-700"
                >
                  DONE
                </button>
              </div>
            );
          })}

          {/* Ready Orders */}
          {readyOrders.map((order, index) => {
            const readyKeys = ['A', 'S', 'D', 'F', 'G'];
            return (
              <div
                key={order.id}
                className="rounded-xl border-2 border-green-500 bg-green-900/30 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {index < 5 && (
                      <kbd className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                        {readyKeys[index]}
                      </kbd>
                    )}
                    <span className="text-2xl font-bold text-white">{order.order_code}</span>
                    {order.table_number && (
                      <span className="rounded bg-green-800 px-2 py-0.5 text-sm text-green-200">
                        T{order.table_number}
                      </span>
                    )}
                  </div>
                  <span className="animate-pulse rounded-full bg-green-600 px-3 py-1 text-sm font-bold text-white">
                    READY
                  </span>
                </div>

                <p className="mb-3 text-sm text-green-300">
                  {order.customer_name || 'Guest'} •{' '}
                  {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
                </p>

                <p className="mb-4 text-green-200">
                  {order.order_items?.reduce((sum, item) => sum + item.quantity, 0)} items
                </p>

                <button
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                  className="w-full rounded-lg bg-gray-600 py-3 text-lg font-bold text-white transition-colors hover:bg-gray-700"
                >
                  PICKED UP
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="mb-4 text-6xl">👨‍🍳</span>
          <p className="text-2xl text-gray-400">No active orders</p>
          <p className="mt-2 text-gray-500">New orders will appear here automatically</p>
        </div>
      )}
    </div>
  );
}
