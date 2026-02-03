'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@supabase/supabase-js';
import { EmptyState } from '@/components/ui/empty-state';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

interface OrderItem {
  id: string;
  item_name: { en?: string; vi?: string };
  item_slug: string | null;
  item_image_url: string | null;
  unit_price: number;
  quantity: number;
  extras: Array<{ id: string; name: string; price: number }>;
  extras_total: number;
  special_instructions: string | null;
  line_total: number;
  item_status: 'pending' | 'preparing' | 'ready' | 'served';
}

interface Order {
  id: string;
  order_number: number;
  order_code: string;
  customer_name: string | null;
  customer_phone: string | null;
  table_number: string | null;
  consumption_type: 'dine-in' | 'takeaway';
  service_type: 'table-service' | 'counter-pickup' | 'takeaway';
  status: OrderStatus;
  submitted_at: string;
  confirmed_at: string | null;
  preparing_at: string | null;
  ready_at: string | null;
  delivered_at: string | null;
  estimated_prep_time: number | null;
  subtotal: number;
  total: number;
  currency: string;
  payment_status: PaymentStatus;
  customer_notes: string | null;
  kitchen_notes: string | null;
  order_items?: OrderItem[];
}

const statusConfig: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string; next?: OrderStatus }
> = {
  pending: { label: 'New', color: 'text-yellow-700', bgColor: 'bg-yellow-100', next: 'confirmed' },
  confirmed: {
    label: 'Confirmed',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    next: 'preparing',
  },
  preparing: {
    label: 'Preparing',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    next: 'ready',
  },
  ready: { label: 'Ready', color: 'text-green-700', bgColor: 'bg-green-100', next: 'delivered' },
  delivered: { label: 'Delivered', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100' },
};

const paymentStatusConfig: Record<
  PaymentStatus,
  { label: string; color: string; bgColor: string }
> = {
  unpaid: { label: 'Unpaid', color: 'text-red-700', bgColor: 'bg-red-100' },
  paid: { label: 'Paid', color: 'text-green-700', bgColor: 'bg-green-100' },
  refunded: { label: 'Refunded', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

import { formatPrice as _fp } from '@gudbro/utils';
function formatCurrency(amount: number, currency: string = 'VND'): string {
  return _fp(amount, currency);
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getElapsedTime(submittedAt: string): string {
  const now = new Date();
  const submitted = new Date(submittedAt);
  const diffMs = now.getTime() - submitted.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return formatDate(submittedAt);
}

export default function OrdersPage() {
  const t = useTranslations('orders');
  const tButtons = useTranslations('buttons');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all' | 'active'>('active');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      let query = supabase
        .from('orders')
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(100);

      if (statusFilter === 'active') {
        query = query.in('status', ['pending', 'confirmed', 'preparing', 'ready']);
      } else if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const fetchOrderItems = async (orderId: string): Promise<OrderItem[]> => {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at');

    if (error) {
      console.error('Error fetching order items:', error);
      return [];
    }
    return data || [];
  };

  const openOrderDetail = async (order: Order) => {
    const items = await fetchOrderItems(order.id);
    setSelectedOrder({ ...order, order_items: items });
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const updatePaymentStatus = async (orderId: string, newStatus: PaymentStatus) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, payment_status: newStatus } : o))
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => (prev ? { ...prev, payment_status: newStatus } : null));
      }
    } catch (err) {
      console.error('Error updating payment status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Set up realtime subscription
    const channel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setOrders((prev) => [payload.new as Order, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setOrders((prev) =>
            prev.map((o) => (o.id === payload.new.id ? { ...o, ...payload.new } : o))
          );
        } else if (payload.eventType === 'DELETE') {
          setOrders((prev) => prev.filter((o) => o.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  // Stats
  const stats = {
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    todayTotal: orders
      .filter((o) => new Date(o.submitted_at).toDateString() === new Date().toDateString())
      .reduce((sum, o) => sum + o.total, 0),
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="nav.orders" kbPageId="orders-list" />
          </div>
          <p className="mt-1 text-sm text-gray-500">Manage incoming orders from your customers</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {tButtons('refresh')}
          </button>
          <a
            href="/orders/kitchen"
            className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            Kitchen Display
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            {stats.pending > 0 && (
              <span className="flex h-3 w-3">
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <p className="text-sm text-orange-600">Preparing</p>
          <p className="text-3xl font-bold text-orange-700">{stats.preparing}</p>
        </div>
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-600">Ready</p>
          <p className="text-3xl font-bold text-green-700">{stats.ready}</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-600">Today&apos;s Revenue</p>
          <p className="text-2xl font-bold text-blue-700">{formatCurrency(stats.todayTotal)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(
          [
            'active',
            'all',
            'pending',
            'confirmed',
            'preparing',
            'ready',
            'delivered',
            'cancelled',
          ] as const
        ).map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              statusFilter === filter
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter === 'active'
              ? 'Active Orders'
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
            {filter === 'pending' && stats.pending > 0 && (
              <span className="ml-2 rounded-full bg-yellow-500 px-1.5 py-0.5 text-xs text-white">
                {stats.pending}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {orders.length === 0 ? (
        <EmptyState
          icon={<span className="text-5xl">📋</span>}
          title="No orders yet"
          description="Orders will appear here when customers place them through your digital menu."
          variant="card"
          size="lg"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const payment = paymentStatusConfig[order.payment_status];

            return (
              <div
                key={order.id}
                onClick={() => openOrderDetail(order)}
                className={`cursor-pointer rounded-xl border-2 bg-white p-4 transition-all hover:shadow-lg ${
                  order.status === 'pending'
                    ? 'border-yellow-400'
                    : order.status === 'ready'
                      ? 'border-green-400'
                      : 'border-gray-200'
                }`}
              >
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">{order.order_code}</span>
                    {order.table_number && (
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-600">
                        Table {order.table_number}
                      </span>
                    )}
                  </div>
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-medium ${status.bgColor} ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Customer */}
                <div className="mb-3">
                  <p className="font-medium text-gray-900">{order.customer_name || 'Guest'}</p>
                  <p className="text-sm text-gray-500">
                    {order.consumption_type === 'takeaway' ? 'Takeaway' : 'Dine-in'}
                    {order.service_type === 'counter-pickup' && ' • Counter Pickup'}
                  </p>
                </div>

                {/* Time & Total */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="text-sm text-gray-500">
                    {formatTime(order.submitted_at)} • {getElapsedTime(order.submitted_at)}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {formatCurrency(order.total, order.currency)}
                    </p>
                    <span className={`text-xs ${payment.color}`}>{payment.label}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                {status.next && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, status.next!);
                      }}
                      disabled={isUpdating}
                      className={`w-full rounded-lg py-2 text-sm font-medium transition-colors ${
                        order.status === 'pending'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : order.status === 'preparing'
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-600 text-white hover:bg-gray-700'
                      }`}
                    >
                      {order.status === 'pending' && 'Accept Order'}
                      {order.status === 'confirmed' && 'Start Preparing'}
                      {order.status === 'preparing' && 'Mark Ready'}
                      {order.status === 'ready' && 'Mark Delivered'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.order_code}</h2>
                  <span
                    className={`rounded-lg px-3 py-1 text-sm font-medium ${statusConfig[selectedOrder.status].bgColor} ${statusConfig[selectedOrder.status].color}`}
                  >
                    {statusConfig[selectedOrder.status].label}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {formatDate(selectedOrder.submitted_at)} at{' '}
                  {formatTime(selectedOrder.submitted_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.customer_name || 'Guest'}
                  </p>
                  {selectedOrder.customer_phone && (
                    <p className="text-sm text-gray-600">{selectedOrder.customer_phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.consumption_type === 'takeaway' ? 'Takeaway' : 'Dine-in'}
                  </p>
                  {selectedOrder.table_number && (
                    <p className="text-sm text-gray-600">Table {selectedOrder.table_number}</p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.order_items?.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
                      {item.item_image_url && (
                        <img
                          src={item.item_image_url}
                          alt=""
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.quantity}x {item.item_name.en || item.item_name.vi}
                            </p>
                            {item.extras && item.extras.length > 0 && (
                              <p className="text-sm text-gray-500">
                                + {item.extras.map((e) => e.name).join(', ')}
                              </p>
                            )}
                            {item.special_instructions && (
                              <p className="mt-1 text-sm text-orange-600">
                                Note: {item.special_instructions}
                              </p>
                            )}
                          </div>
                          <p className="font-medium text-gray-900">
                            {formatCurrency(item.line_total, selectedOrder.currency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {!selectedOrder.order_items?.length && (
                    <p className="py-4 text-center text-gray-500">Loading items...</p>
                  )}
                </div>
              </div>

              {/* Customer Notes */}
              {selectedOrder.customer_notes && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm font-medium text-yellow-800">Customer Notes</p>
                  <p className="text-yellow-700">{selectedOrder.customer_notes}</p>
                </div>
              )}

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(selectedOrder.total, selectedOrder.currency)}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-gray-600">Payment</span>
                  <span
                    className={`font-medium ${paymentStatusConfig[selectedOrder.payment_status].color}`}
                  >
                    {paymentStatusConfig[selectedOrder.payment_status].label}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer - Actions */}
            <div className="space-y-3 border-t border-gray-200 p-6">
              {/* Status Actions */}
              <div className="flex gap-2">
                {selectedOrder.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}
                      disabled={isUpdating}
                      className="flex-1 rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      Accept Order
                    </button>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      disabled={isUpdating}
                      className="rounded-lg bg-red-100 px-6 py-3 font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {selectedOrder.status === 'confirmed' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}
                    disabled={isUpdating}
                    className="flex-1 rounded-lg bg-orange-600 py-3 font-medium text-white hover:bg-orange-700 disabled:opacity-50"
                  >
                    Start Preparing
                  </button>
                )}
                {selectedOrder.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'ready')}
                    disabled={isUpdating}
                    className="flex-1 rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    Mark as Ready
                  </button>
                )}
                {selectedOrder.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                    disabled={isUpdating}
                    className="flex-1 rounded-lg bg-gray-600 py-3 font-medium text-white hover:bg-gray-700 disabled:opacity-50"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>

              {/* Payment Actions */}
              {selectedOrder.payment_status === 'unpaid' &&
                selectedOrder.status !== 'cancelled' && (
                  <button
                    onClick={() => updatePaymentStatus(selectedOrder.id, 'paid')}
                    disabled={isUpdating}
                    className="w-full rounded-lg bg-green-100 py-3 font-medium text-green-700 hover:bg-green-200 disabled:opacity-50"
                  >
                    Mark as Paid
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
