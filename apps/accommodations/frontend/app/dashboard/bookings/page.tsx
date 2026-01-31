/**
 * Owner Dashboard - Bookings List
 *
 * Lists all bookings for a property with payment status columns.
 * Owner can confirm or reject pending bank transfer / crypto payments.
 *
 * Auth: ADMIN_API_KEY via query param (simple owner access).
 * In production, this would use proper session-based auth.
 *
 * GET /dashboard/bookings?propertyId={id}&key={ADMIN_API_KEY}
 */
'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatPrice } from '@/lib/price-utils';
import { PAYMENT_METHOD_CONFIG } from '@/types/property';
import type { AccomPaymentMethod } from '@/types/property';

interface DashboardBooking {
  id: string;
  booking_code: string;
  guest_name: string;
  guest_last_name: string;
  guest_email: string;
  check_in_date: string;
  check_out_date: string;
  num_nights: number;
  total_price: number;
  currency: string;
  status: string;
  payment_method: string | null;
  payment_status: string | null;
  deposit_amount: number | null;
  deposit_percent: number | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  pending_payment: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800',
  payment_failed: 'bg-red-100 text-red-800',
  checked_in: 'bg-blue-100 text-blue-800',
  checked_out: 'bg-gray-100 text-gray-600',
  no_show: 'bg-gray-100 text-gray-600',
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  partial: 'bg-blue-100 text-blue-800',
  unpaid: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-100 text-amber-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-purple-100 text-purple-800',
};

function getPaymentMethodLabel(method: string | null): string {
  if (!method) return '-';
  const config = PAYMENT_METHOD_CONFIG[method as AccomPaymentMethod];
  return config?.label || method;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function DashboardBookingsContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const apiKey = searchParams.get('key');

  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!propertyId || !apiKey) {
      setError('Missing propertyId or key parameter');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/dashboard/bookings?propertyId=${propertyId}&key=${apiKey}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setBookings(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [propertyId, apiKey]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  async function handlePaymentAction(bookingId: string, action: 'confirm' | 'reject') {
    if (action === 'reject') {
      const confirmed = window.confirm(
        'Are you sure you want to reject this payment? The booking will be cancelled.'
      );
      if (!confirmed) return;
    }

    setActionLoading(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}/payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      // Refresh bookings list
      await fetchBookings();
    } catch (err) {
      alert(`Failed to ${action} payment: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setActionLoading(null);
    }
  }

  const canManuallyConfirm = (b: DashboardBooking) =>
    (b.status === 'pending_payment' || b.status === 'pending') &&
    (b.payment_method === 'bank_transfer' || b.payment_method === 'crypto');

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Bookings</h1>
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Bookings</h1>
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <span className="text-sm text-gray-500">{bookings.length} total</span>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Code</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Guest</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Dates</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Total</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Payment</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                    {b.booking_code}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {b.guest_name} {b.guest_last_name}
                    </div>
                    <div className="text-xs text-gray-500">{b.guest_email}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {formatDate(b.check_in_date)} - {formatDate(b.check_out_date)}
                    <div className="text-xs text-gray-500">
                      {b.num_nights} night{b.num_nights !== 1 ? 's' : ''}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {formatPrice(b.total_price, b.currency)}
                    {b.deposit_percent != null &&
                      b.deposit_percent < 100 &&
                      b.deposit_amount != null && (
                        <div
                          className="text-xs text-gray-500"
                          title={`${b.deposit_percent}% deposit = ${formatPrice(b.deposit_amount, b.currency)}`}
                        >
                          {b.deposit_percent}% deposit
                        </div>
                      )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[b.status] || 'bg-gray-100 text-gray-600'}`}
                    >
                      {b.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs">{getPaymentMethodLabel(b.payment_method)}</span>
                      {b.payment_status && (
                        <span
                          className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${PAYMENT_STATUS_COLORS[b.payment_status] || 'bg-gray-100 text-gray-600'}`}
                        >
                          {b.payment_status}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {canManuallyConfirm(b) && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePaymentAction(b.id, 'confirm')}
                          disabled={actionLoading === b.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                        >
                          Confirm Payment
                        </button>
                        <button
                          onClick={() => handlePaymentAction(b.id, 'reject')}
                          disabled={actionLoading === b.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default function DashboardBookingsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-8">
          <p className="text-gray-500">Loading bookings...</p>
        </main>
      }
    >
      <DashboardBookingsContent />
    </Suspense>
  );
}
