'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  MagnifyingGlass,
  SpinnerGap,
  ClipboardText,
  WhatsappLogo,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderDetailPanel from './OrderDetailPanel';
import {
  ORDER_ACTION_TO_STATUS,
  ORDER_VALID_TRANSITIONS,
  buildWhatsAppUrl,
} from '@/lib/accommodations/helpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OrderSummary {
  id: string;
  status: string;
  guestName: string;
  guestPhone: string | null;
  guestEmail: string | null;
  roomNumber: string | null;
  roomType: string | null;
  itemCount: number;
  subtotal: number;
  total: number;
  currency: string;
  deliveryNotes: string | null;
  requestedTime: string | null;
  createdAt: string;
  updatedAt: string;
}

type TabKey = 'all' | 'active' | 'delivered' | 'cancelled';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const POLL_INTERVAL = 30_000; // 30 seconds

const TABS: { key: TabKey; label: string; statusFilter: string | null }[] = [
  { key: 'all', label: 'All', statusFilter: null },
  { key: 'active', label: 'Active', statusFilter: 'pending,confirmed,preparing,ready' },
  { key: 'delivered', label: 'Completed', statusFilter: 'delivered' },
  { key: 'cancelled', label: 'Cancelled', statusFilter: 'cancelled' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(amount: number, currency: string): string {
  return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Get the most relevant "next" action for inline quick-action button */
function getQuickAction(status: string): { action: string; label: string; color: string } | null {
  const nextStatuses = ORDER_VALID_TRANSITIONS[status] || [];
  if (nextStatuses.length === 0) return null;

  // Pick the primary (non-cancel) action
  const actionMap: Record<string, { action: string; label: string; color: string }> = {
    pending: {
      action: 'confirm',
      label: 'Confirm',
      color: 'text-green-700 bg-green-50 hover:bg-green-100',
    },
    confirmed: {
      action: 'start_preparing',
      label: 'Prepare',
      color: 'text-blue-700 bg-blue-50 hover:bg-blue-100',
    },
    preparing: {
      action: 'mark_ready',
      label: 'Ready',
      color: 'text-green-700 bg-green-50 hover:bg-green-100',
    },
    ready: {
      action: 'mark_delivered',
      label: 'Delivered',
      color: 'text-green-700 bg-green-50 hover:bg-green-100',
    },
  };

  return actionMap[status] || null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface OrderManagementProps {
  propertyId: string;
}

export default function OrderManagement({ propertyId }: OrderManagementProps) {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quickActionLoading, setQuickActionLoading] = useState<string | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  // ---- Fetch orders ----
  const fetchOrders = useCallback(async () => {
    if (!propertyId) return;

    try {
      const tab = TABS.find((t) => t.key === activeTab);
      const params = new URLSearchParams({ propertyId, page: String(page), limit: String(limit) });
      if (tab?.statusFilter) params.set('status', tab.statusFilter);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());

      const res = await fetch(`/api/accommodations/orders?${params}`, {
        headers: { Authorization: `Bearer ${ADMIN_API_KEY}` },
      });

      if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`);

      const data = await res.json();
      setOrders(data.orders || []);
      setTotal(data.total || 0);
      setError(null);
    } catch (err) {
      console.error('[OrderManagement] fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, [propertyId, activeTab, page, limit, searchQuery]);

  // Initial fetch + refetch on filter changes
  useEffect(() => {
    setIsLoading(true);
    fetchOrders();
  }, [fetchOrders]);

  // Auto-refresh polling
  useEffect(() => {
    pollRef.current = setInterval(fetchOrders, POLL_INTERVAL);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchOrders]);

  // Reset page when tab or search changes
  useEffect(() => {
    setPage(1);
  }, [activeTab, searchQuery]);

  // ---- Quick action handler ----
  const handleQuickAction = async (orderId: string, action: string) => {
    setQuickActionLoading(orderId);
    try {
      const res = await fetch(`/api/accommodations/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ADMIN_API_KEY}`,
        },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Action failed');
      }

      // Refresh list
      await fetchOrders();
    } catch (err) {
      console.error('[OrderManagement] quick action error:', err);
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setQuickActionLoading(null);
    }
  };

  // ---- Tab counts (from current data) ----
  const tabCounts = useMemo(() => {
    // We show total from API for the active tab; for others we just show the label
    return { total };
  }, [total]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 font-bold text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && ` (${tabCounts.total})`}
            </button>
          ))}
        </nav>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-72">
          <MagnifyingGlass
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by guest name or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap size={24} className="animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-gray-600">Loading orders...</span>
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Orders Table */}
      {!isLoading && !error && orders.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Guest
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Room
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Items
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Time
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => {
                const quickAction = getQuickAction(order.status);
                const whatsappUrl = order.guestPhone
                  ? buildWhatsAppUrl(
                      order.guestPhone,
                      `Hi ${order.guestName}, regarding your order #${order.id.slice(0, 8)}...`
                    )
                  : null;

                return (
                  <tr
                    key={order.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-gray-600">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                      {order.guestName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                      {order.roomNumber || '-'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-600">
                      {order.itemCount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-gray-900">
                      {formatPrice(order.total, order.currency)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                      {formatTime(order.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <div
                        className="flex items-center justify-end gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {quickAction && (
                          <button
                            onClick={() => handleQuickAction(order.id, quickAction.action)}
                            disabled={quickActionLoading === order.id}
                            className={`rounded-md px-2.5 py-1 text-xs font-medium disabled:opacity-50 ${quickAction.color}`}
                          >
                            {quickActionLoading === order.id ? '...' : quickAction.label}
                          </button>
                        )}
                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md p-1.5 text-green-600 hover:bg-green-50"
                            title="Message on WhatsApp"
                          >
                            <WhatsappLogo size={16} weight="fill" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total} orders
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <CaretLeft size={14} /> Prev
            </button>
            <span className="text-sm text-gray-600">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next <CaretRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Empty: no orders */}
      {!isLoading && !error && orders.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <ClipboardText size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchQuery ? 'No orders match your search' : 'No orders yet'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery
              ? 'Try adjusting your search or switching tabs.'
              : 'Service orders from guests will appear here.'}
          </p>
        </div>
      )}

      {/* Detail Panel */}
      {selectedOrderId && (
        <OrderDetailPanel
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          onStatusUpdate={() => {
            fetchOrders();
          }}
        />
      )}
    </div>
  );
}
