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
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      if (newStatus === 'delivered') {
        setOrders(prev => prev.filter(o => o.id !== orderId));
      } else {
        setOrders(prev => prev.map(o =>
          o.id === orderId ? { ...o, status: newStatus } : o
        ));
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
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchOrders();
        }
      )
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
  const confirmedOrders = orders.filter(o => o.status === 'confirmed');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-white">Kitchen Display</h1>
          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
            Live
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-lg">
            {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <a
            href="/orders"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Orders
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-900/50 border border-blue-700 rounded-xl p-4 text-center">
          <p className="text-blue-400 text-sm font-medium">Queue</p>
          <p className="text-4xl font-bold text-blue-300">{confirmedOrders.length}</p>
        </div>
        <div className="bg-orange-900/50 border border-orange-700 rounded-xl p-4 text-center">
          <p className="text-orange-400 text-sm font-medium">Preparing</p>
          <p className="text-4xl font-bold text-orange-300">{preparingOrders.length}</p>
        </div>
        <div className="bg-green-900/50 border border-green-700 rounded-xl p-4 text-center">
          <p className="text-green-400 text-sm font-medium">Ready</p>
          <p className="text-4xl font-bold text-green-300">{readyOrders.length}</p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Confirmed Orders - Queue */}
        {confirmedOrders.map((order) => {
          const elapsed = getElapsedMinutes(order.submitted_at);
          return (
            <div
              key={order.id}
              className="bg-blue-900/30 border-2 border-blue-600 rounded-xl p-4"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{order.order_code}</span>
                  {order.table_number && (
                    <span className="px-2 py-0.5 bg-blue-800 text-blue-200 rounded text-sm">
                      T{order.table_number}
                    </span>
                  )}
                </div>
                <span className={`text-lg font-mono font-bold ${getTimerColor(elapsed, order.status)}`}>
                  {formatTimer(elapsed)}
                </span>
              </div>

              {/* Customer */}
              <p className="text-blue-300 text-sm mb-3">
                {order.customer_name || 'Guest'} •{' '}
                {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
              </p>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="bg-blue-900/50 rounded-lg p-2">
                    <p className="text-white font-medium">
                      <span className="text-blue-400">{item.quantity}x</span>{' '}
                      {item.item_name.en || item.item_name.vi}
                    </p>
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-blue-300 text-sm">
                        + {item.extras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    {item.special_instructions && (
                      <p className="text-yellow-400 text-sm mt-1">
                        ⚠️ {item.special_instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Customer Notes */}
              {order.customer_notes && (
                <div className="bg-yellow-900/50 border border-yellow-600 rounded-lg p-2 mb-4">
                  <p className="text-yellow-300 text-sm">{order.customer_notes}</p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => updateOrderStatus(order.id, 'preparing')}
                className="w-full py-3 bg-orange-600 text-white rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors"
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
              className="bg-orange-900/30 border-2 border-orange-500 rounded-xl p-4"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{order.order_code}</span>
                  {order.table_number && (
                    <span className="px-2 py-0.5 bg-orange-800 text-orange-200 rounded text-sm">
                      T{order.table_number}
                    </span>
                  )}
                </div>
                <span className={`text-lg font-mono font-bold ${getTimerColor(elapsed, order.status)}`}>
                  {formatTimer(elapsed)}
                </span>
              </div>

              {/* Customer */}
              <p className="text-orange-300 text-sm mb-3">
                {order.customer_name || 'Guest'} •{' '}
                {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
              </p>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="bg-orange-900/50 rounded-lg p-2">
                    <p className="text-white font-medium">
                      <span className="text-orange-400">{item.quantity}x</span>{' '}
                      {item.item_name.en || item.item_name.vi}
                    </p>
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-orange-300 text-sm">
                        + {item.extras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    {item.special_instructions && (
                      <p className="text-yellow-400 text-sm mt-1">
                        ⚠️ {item.special_instructions}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => updateOrderStatus(order.id, 'ready')}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
              >
                DONE
              </button>
            </div>
          );
        })}

        {/* Ready Orders */}
        {readyOrders.map((order) => (
          <div
            key={order.id}
            className="bg-green-900/30 border-2 border-green-500 rounded-xl p-4"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{order.order_code}</span>
                {order.table_number && (
                  <span className="px-2 py-0.5 bg-green-800 text-green-200 rounded text-sm">
                    T{order.table_number}
                  </span>
                )}
              </div>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold animate-pulse">
                READY
              </span>
            </div>

            {/* Customer */}
            <p className="text-green-300 text-sm mb-3">
              {order.customer_name || 'Guest'} •{' '}
              {order.consumption_type === 'takeaway' ? 'TAKEAWAY' : 'Dine-in'}
            </p>

            {/* Items Summary */}
            <p className="text-green-200 mb-4">
              {order.order_items?.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>

            {/* Action Button */}
            <button
              onClick={() => updateOrderStatus(order.id, 'delivered')}
              className="w-full py-3 bg-gray-600 text-white rounded-lg font-bold text-lg hover:bg-gray-700 transition-colors"
            >
              PICKED UP
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-4">👨‍🍳</span>
          <p className="text-2xl text-gray-400">No active orders</p>
          <p className="text-gray-500 mt-2">New orders will appear here automatically</p>
        </div>
      )}
    </div>
  );
}
