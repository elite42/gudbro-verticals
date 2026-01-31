'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, SpinnerGap, WhatsappLogo, Phone, Envelope } from '@phosphor-icons/react';
import OrderStatusBadge from './OrderStatusBadge';
import {
  ORDER_VALID_TRANSITIONS,
  ORDER_ACTION_TO_STATUS,
  buildWhatsAppUrl,
} from '@/lib/accommodations/helpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OrderItem {
  id: string;
  serviceItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes: string | null;
}

interface OrderDetail {
  id: string;
  status: string;
  subtotal: number;
  total: number;
  currency: string;
  deliveryNotes: string | null;
  requestedTime: string | null;
  createdAt: string;
  updatedAt: string;
  guest: {
    name: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  } | null;
  room: {
    id: string;
    number: string;
    type: string;
  } | null;
  items: OrderItem[];
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

// Map actions to button config
const ACTION_BUTTONS: Record<string, { label: string; color: string; needsReason?: boolean }> = {
  confirm: { label: 'Confirm', color: 'bg-green-600 hover:bg-green-700 text-white' },
  reject: {
    label: 'Reject',
    color: 'bg-red-600 hover:bg-red-700 text-white',
    needsReason: true,
  },
  start_preparing: { label: 'Start Preparing', color: 'bg-blue-600 hover:bg-blue-700 text-white' },
  mark_ready: { label: 'Mark Ready', color: 'bg-green-600 hover:bg-green-700 text-white' },
  mark_delivered: { label: 'Mark Delivered', color: 'bg-green-600 hover:bg-green-700 text-white' },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(amount: number, currency: string): string {
  return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Get valid actions for a given order status */
function getAvailableActions(status: string): string[] {
  const validNextStatuses = ORDER_VALID_TRANSITIONS[status] || [];
  return Object.entries(ORDER_ACTION_TO_STATUS)
    .filter(([, targetStatus]) => validNextStatuses.includes(targetStatus))
    .map(([action]) => action);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface OrderDetailPanelProps {
  orderId: string;
  onClose: () => void;
  onStatusUpdate: () => void;
}

export default function OrderDetailPanel({
  orderId,
  onClose,
  onStatusUpdate,
}: OrderDetailPanelProps) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/accommodations/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${ADMIN_API_KEY}` },
      });
      if (!res.ok) throw new Error(`Failed to fetch order (${res.status})`);
      const data = await res.json();
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleAction = async (action: string) => {
    if (action === 'reject' && !showRejectForm) {
      setShowRejectForm(true);
      return;
    }

    setActionLoading(action);
    try {
      const res = await fetch(`/api/accommodations/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ADMIN_API_KEY}`,
        },
        body: JSON.stringify({
          action,
          ...(action === 'reject' && rejectReason ? { reason: rejectReason } : {}),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update order');
      }

      setShowRejectForm(false);
      setRejectReason('');
      await fetchOrder();
      onStatusUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const availableActions = order ? getAvailableActions(order.status) : [];

  // Build WhatsApp URL for guest communication
  const whatsappUrl = order?.guest?.phone
    ? buildWhatsAppUrl(
        order.guest.phone,
        `Hi ${order.guest.name}, regarding your order #${order.id.slice(0, 8)}...`
      )
    : null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Order #{orderId.slice(0, 8)}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <SpinnerGap size={24} className="animate-spin text-blue-600" />
              <span className="ml-2 text-sm text-gray-600">Loading order...</span>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && order && (
            <div className="space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </h3>
                <div className="mt-1">
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>

              {/* Guest Info */}
              {order.guest && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Guest
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-900">{order.guest.name}</p>
                  <div className="mt-1 flex flex-wrap gap-3">
                    {order.guest.email && (
                      <a
                        href={`mailto:${order.guest.email}`}
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Envelope size={14} />
                        {order.guest.email}
                      </a>
                    )}
                    {order.guest.phone && (
                      <a
                        href={`tel:${order.guest.phone}`}
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Phone size={14} />
                        {order.guest.phone}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Room */}
              {order.room && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Room
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {order.room.number} <span className="text-gray-500">({order.room.type})</span>
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Created
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDateTime(order.createdAt)}</p>
                </div>
                {order.requestedTime && (
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Requested Time
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatDateTime(order.requestedTime)}
                    </p>
                  </div>
                )}
              </div>

              {/* Delivery Notes */}
              {order.deliveryNotes && (
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Notes
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{order.deliveryNotes}</p>
                </div>
              )}

              {/* Items */}
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Items ({order.items.length})
                </h3>
                <div className="mt-2 divide-y divide-gray-100 rounded-lg border border-gray-200">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between px-3 py-2.5">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.quantity}x {item.name}
                        </p>
                        {item.notes && <p className="text-xs text-gray-500">{item.notes}</p>}
                      </div>
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        {formatPrice(item.totalPrice, order.currency)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                <span className="text-sm font-medium text-gray-700">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(order.total, order.currency)}
                </span>
              </div>

              {/* WhatsApp Link */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-600"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Message Guest on WhatsApp
                </a>
              )}

              {/* Reject Reason Form */}
              {showRejectForm && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Rejection Reason (optional)
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Explain why this order is being rejected..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction('reject')}
                      disabled={actionLoading === 'reject'}
                      className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      {actionLoading === 'reject' ? 'Rejecting...' : 'Confirm Rejection'}
                    </button>
                    <button
                      onClick={() => {
                        setShowRejectForm(false);
                        setRejectReason('');
                      }}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {availableActions.length > 0 && !showRejectForm && (
                <div className="flex flex-wrap gap-2">
                  {availableActions.map((action) => {
                    const config = ACTION_BUTTONS[action];
                    if (!config) return null;
                    return (
                      <button
                        key={action}
                        onClick={() => handleAction(action)}
                        disabled={!!actionLoading}
                        className={`rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50 ${config.color}`}
                      >
                        {actionLoading === action ? 'Processing...' : config.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
