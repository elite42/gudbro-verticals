'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MagnifyingGlass, SpinnerGap, Bed, CalendarBlank } from '@phosphor-icons/react';
import BookingStatusBadge from '@/components/accommodations/BookingStatusBadge';
import { formatBookingPrice } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DashboardBooking {
  id: string;
  booking_code: string;
  guest_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  num_nights: number;
  num_guests: number;
  total_price: number;
  currency: string;
  status: string;
  payment_method: string | null;
  payment_status: string | null;
  deposit_amount: number | null;
  deposit_percent: number | null;
  special_requests: string | null;
  created_at: string;
  room: { id: string; room_number: string; room_type: string } | null;
}

type TabKey = 'all' | 'pending' | 'confirmed' | 'checked_in' | 'cancelled';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

// TODO: Replace with proper auth system (session-based)
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AccommodationBookingsPage() {
  const [bookings, setBookings] = useState<DashboardBooking[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---- Data fetching ----
  useEffect(() => {
    if (!PROPERTY_ID) {
      setLoading(false);
      return;
    }

    async function fetchBookings() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/accommodations/bookings?propertyId=${PROPERTY_ID}`, {
          headers: { Authorization: `Bearer ${ADMIN_API_KEY}` },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch bookings (${res.status})`);
        }

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error('[AccommodationBookingsPage] fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  // ---- Tab counts ----
  const counts = useMemo(() => {
    const c = { all: 0, pending: 0, confirmed: 0, checked_in: 0, cancelled: 0 };
    for (const b of bookings) {
      c.all++;
      if (b.status === 'pending' || b.status === 'pending_payment') c.pending++;
      else if (b.status === 'confirmed') c.confirmed++;
      else if (b.status === 'checked_in') c.checked_in++;
      else if (b.status === 'cancelled') c.cancelled++;
    }
    return c;
  }, [bookings]);

  // ---- Filtering ----
  const filteredBookings = useMemo(() => {
    let result = bookings;

    // Tab filter
    if (activeTab !== 'all') {
      result = result.filter((b) => {
        if (activeTab === 'pending')
          return b.status === 'pending' || b.status === 'pending_payment';
        return b.status === activeTab;
      });
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.guest_name.toLowerCase().includes(q) ||
          b.guest_last_name.toLowerCase().includes(q) ||
          b.booking_code.toLowerCase().includes(q)
      );
    }

    return result;
  }, [bookings, activeTab, searchQuery]);

  // ---- No property configured ----
  if (!PROPERTY_ID && !loading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <Bed size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No accommodation property configured
          </h3>
          <p className="mt-2 text-sm text-gray-500">Contact support to set up your property.</p>
        </div>
      </div>
    );
  }

  // ---- Tabs config ----
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'checked_in', label: 'Checked-in' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      <Header />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 font-bold text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label} ({counts[tab.key]})
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
            placeholder="Search guest name or booking code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <SpinnerGap size={24} className="animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-gray-600">Loading bookings...</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && filteredBookings.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Guest
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Room
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Check-in
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Check-out
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Payment
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
                    {b.guest_name} {b.guest_last_name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                    {b.room ? `${b.room.room_number} (${b.room.room_type})` : '-'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                    {formatDate(b.check_in_date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                    {formatDate(b.check_out_date)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <BookingStatusBadge status={b.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {b.payment_status ? (
                      <BookingStatusBadge status={b.payment_status} type="payment" />
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-gray-900">
                    {formatBookingPrice(b.total_price, b.currency)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link
                      href={`/accommodations/bookings/${b.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty: no bookings at all */}
      {!loading && !error && bookings.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <CalendarBlank size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Share your property link to start receiving bookings.
          </p>
        </div>
      )}

      {/* Empty: no results for current filter/search */}
      {!loading && !error && bookings.length > 0 && filteredBookings.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <MagnifyingGlass size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings match your search</h3>
          <p className="mt-2 text-sm text-gray-500">Try adjusting your search or switching tabs.</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header sub-component
// ---------------------------------------------------------------------------

function Header() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/accommodations" className="hover:text-gray-700">
          Accommodations
        </Link>
        <span>/</span>
        <span>Bookings</span>
      </div>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">Bookings</h1>
      <p className="mt-1 text-gray-600">View and manage accommodation bookings.</p>
    </div>
  );
}
