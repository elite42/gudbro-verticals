'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  item_name: { en?: string; vi?: string };
  quantity: number;
  extras: Array<{ id: string; name: string; price: number }>;
  special_instructions: string | null;
  item_status: 'pending' | 'preparing' | 'ready' | 'served';
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
}

function getElapsedMinutes(dateString: string): number {
  const now = new Date();
  const date = new Date(dateString);
  return Math.floor((now.getTime() - date.getTime()) / 60000);
}

function getTimerColor(minutes: number, status: OrderStatus): string {
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

export default function KitchenDisplayPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .in('status', ['confirmed', 'preparing', 'ready'])
        .order('submitted_at', { ascending: true });

      if (error) throw error;

      // Fetch items for each order
      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items } = await supabase
            .from('order_items')
            .select('id, item_name, quantity, extras, special_instructions, item_status')
            .eq('order_id', order.id);
          return { ...order, order_items: items || [] };
        })
      );

      setOrders(ordersWithItems);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      // Get order info for push notification
      const order = orders.find((o) => o.id === orderId);

      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Send push notification when order is ready
      if (newStatus === 'ready' && order) {
        try {
          // Get session_id from the order for targeting the notification
          const { data: orderData } = await supabase
            .from('orders')
            .select('session_id')
            .eq('id', orderId)
            .single();

          if (orderData?.session_id) {
            // Call push notification API
            await fetch('/api/send-push', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                sessionId: orderData.session_id,
                orderCode: order.order_code,
              }),
            }).catch((err) => console.log('[Push] Notification skipped:', err.message));
          }
        } catch (pushErr) {
          // Don't fail the status update if push fails
          console.log('[Push] Notification error (non-blocking):', pushErr);
        }
      }

      if (newStatus === 'delivered') {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
      } else {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Update timer every minute
    const timerInterval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    // Refresh orders every 30 seconds
    const refreshInterval = setInterval(fetchOrders, 30000);

    // Realtime subscription
    const channel = supabase
      .channel('kitchen-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      clearInterval(timerInterval);
      clearInterval(refreshInterval);
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Group orders by status
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const readyOrders = orders.filter((o) => o.status === 'ready');

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
          <h1 className="text-3xl font-bold text-white">Kitchen Display</h1>
          <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
            Live
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg text-gray-400">
            {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={toggleFullscreen}
            className="rounded-lg bg-gray-800 p-2 text-white hover:bg-gray-700"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <a
            href="/orders"
            className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
          >
            Back to Orders
          </a>
        </div>
      </div>

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

      {/* Orders Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Confirmed Orders - Queue */}
        {confirmedOrders.map((order) => {
          const elapsed = getElapsedMinutes(order.submitted_at);
          return (
            <div key={order.id} className="rounded-xl border-2 border-blue-600 bg-blue-900/30 p-4">
              {/* Order Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
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

              {/* Customer */}
              <p className="mb-3 text-sm text-blue-300">
                {order.customer_name || 'Guest'} •{' '}
                {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
              </p>

              {/* Items */}
              <div className="mb-4 space-y-2">
                {order.order_items?.map((item) => (
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
                      <p className="mt-1 text-sm text-yellow-400">⚠️ {item.special_instructions}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Customer Notes */}
              {order.customer_notes && (
                <div className="mb-4 rounded-lg border border-yellow-600 bg-yellow-900/50 p-2">
                  <p className="text-sm text-yellow-300">{order.customer_notes}</p>
                </div>
              )}

              {/* Action Button */}
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
        {preparingOrders.map((order) => {
          const elapsed = getElapsedMinutes(order.preparing_at || order.submitted_at);
          return (
            <div
              key={order.id}
              className="rounded-xl border-2 border-orange-500 bg-orange-900/30 p-4"
            >
              {/* Order Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
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

              {/* Customer */}
              <p className="mb-3 text-sm text-orange-300">
                {order.customer_name || 'Guest'} •{' '}
                {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
              </p>

              {/* Items */}
              <div className="mb-4 space-y-2">
                {order.order_items?.map((item) => (
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
                      <p className="mt-1 text-sm text-yellow-400">⚠️ {item.special_instructions}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Button */}
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
        {readyOrders.map((order) => (
          <div key={order.id} className="rounded-xl border-2 border-green-500 bg-green-900/30 p-4">
            {/* Order Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
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

            {/* Customer */}
            <p className="mb-3 text-sm text-green-300">
              {order.customer_name || 'Guest'} •{' '}
              {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
            </p>

            {/* Items Summary */}
            <p className="mb-4 text-green-200">
              {order.order_items?.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>

            {/* Action Button */}
            <button
              onClick={() => updateOrderStatus(order.id, 'delivered')}
              className="w-full rounded-lg bg-gray-600 py-3 text-lg font-bold text-white transition-colors hover:bg-gray-700"
            >
              PICKED UP
            </button>
          </div>
        ))}
      </div>

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
