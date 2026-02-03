'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ReservationCalendar,
  Reservation,
  ReservationFormData,
  ReservationStatus,
} from '@/components/reservations';
import { CalendarBlank, ListBullets, Gear } from '@phosphor-icons/react';
import Link from 'next/link';
import { InfoTooltip } from '@/components/ui/info-tooltip';

interface Section {
  id: string;
  name: string;
}

interface Table {
  id: string;
  table_number: string;
  min_capacity: number;
  max_capacity: number;
  section_id: string;
}

type TabType = 'calendar' | 'list' | 'settings';

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch reservations, sections, and tables in parallel
      const [reservationsRes, sectionsRes, tablesRes] = await Promise.all([
        fetch('/api/reservations'),
        fetch('/api/sections'),
        fetch('/api/tables'),
      ]);

      if (!reservationsRes.ok) {
        throw new Error('Failed to fetch reservations');
      }

      const reservationsData = await reservationsRes.json();
      const sectionsData = sectionsRes.ok ? await sectionsRes.json() : { sections: [] };
      const tablesData = tablesRes.ok ? await tablesRes.json() : { tables: [] };

      setReservations(reservationsData.reservations || []);
      setSections(sectionsData.sections || []);
      setTables(tablesData.tables || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Create reservation
  const handleCreateReservation = async (data: ReservationFormData) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: data.guest_name,
          guestEmail: data.guest_email,
          guestPhone: data.guest_phone,
          partySize: data.party_size,
          reservationDate: data.reservation_date,
          reservationTime: data.reservation_time,
          durationMinutes: data.duration_minutes,
          sectionId: data.section_id,
          tableId: data.table_id,
          occasion: data.occasion,
          specialRequests: data.special_requests,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create reservation');
      }

      // Refresh data
      await fetchData();
    } finally {
      setIsSaving(false);
    }
  };

  // Update reservation
  const handleUpdateReservation = async (data: ReservationFormData) => {
    if (!data.id) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: data.id,
          guestName: data.guest_name,
          guestEmail: data.guest_email,
          guestPhone: data.guest_phone,
          partySize: data.party_size,
          reservationDate: data.reservation_date,
          reservationTime: data.reservation_time,
          durationMinutes: data.duration_minutes,
          sectionId: data.section_id,
          tableId: data.table_id,
          occasion: data.occasion,
          specialRequests: data.special_requests,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update reservation');
      }

      await fetchData();
    } finally {
      setIsSaving(false);
    }
  };

  // Update status
  const handleStatusChange = async (id: string, status: ReservationStatus) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update status');
      }

      await fetchData();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
            <InfoTooltip contentKey="pages.reservations" kbPageId="reservations" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Manage table reservations and view your booking calendar
          </p>
        </div>

        {/* Stats summary */}
        <div className="flex gap-6 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {reservations.filter((r) => r.status === 'confirmed').length}
            </p>
            <p className="text-gray-500">Today Confirmed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {reservations.filter((r) => r.status === 'pending').length}
            </p>
            <p className="text-gray-500">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{reservations.length}</p>
            <p className="text-gray-500">Total</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white px-6">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'calendar'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <CalendarBlank className="h-4 w-4" />
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'list'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <ListBullets className="h-4 w-4" />
            List View
          </button>
          <Link
            href="/reservations/floor-plan"
            className="flex items-center gap-2 border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            Floor Plan
          </Link>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <Gear className="h-4 w-4" />
            Settings
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-6">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
            <button onClick={fetchData} className="mt-2 text-sm underline">
              Try again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
              <p className="mt-2 text-sm text-gray-500">Loading reservations...</p>
            </div>
          </div>
        ) : activeTab === 'calendar' ? (
          <div className="h-full">
            <ReservationCalendar
              reservations={reservations}
              sections={sections}
              tables={tables}
              onCreateReservation={handleCreateReservation}
              onUpdateReservation={handleUpdateReservation}
              onStatusChange={handleStatusChange}
              isLoading={isSaving}
            />
          </div>
        ) : activeTab === 'list' ? (
          <ReservationListView reservations={reservations} onStatusChange={handleStatusChange} />
        ) : (
          <ReservationSettingsView />
        )}
      </div>
    </div>
  );
}

// Simple List View
function ReservationListView({
  reservations,
  onStatusChange,
}: {
  reservations: Reservation[];
  onStatusChange: (id: string, status: ReservationStatus) => Promise<void>;
}) {
  const sortedReservations = [...reservations].sort((a, b) => {
    const dateA = `${a.reservation_date} ${a.reservation_time}`;
    const dateB = `${b.reservation_date} ${b.reservation_time}`;
    return dateA.localeCompare(dateB);
  });

  return (
    <div className="overflow-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Guest
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Date & Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Party
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Contact
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedReservations.map((reservation) => (
            <tr key={reservation.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-3">
                <div className="font-medium text-gray-900">{reservation.guest_name}</div>
                <div className="text-xs text-gray-500">#{reservation.reservation_code}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                {reservation.reservation_date}
                <br />
                <span className="font-medium">{reservation.reservation_time}</span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                {reservation.party_size} guests
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge status={reservation.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                {reservation.guest_phone || reservation.guest_email || '-'}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <QuickActions reservation={reservation} onStatusChange={onStatusChange} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedReservations.length === 0 && (
        <div className="py-12 text-center text-gray-500">No reservations found</div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: ReservationStatus }) {
  const config = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    no_show: 'bg-gray-100 text-gray-600',
    seated: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-600',
  };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

function QuickActions({
  reservation,
  onStatusChange,
}: {
  reservation: Reservation;
  onStatusChange: (id: string, status: ReservationStatus) => Promise<void>;
}) {
  if (reservation.status === 'pending') {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange(reservation.id, 'confirmed')}
          className="rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
        >
          Confirm
        </button>
        <button
          onClick={() => onStatusChange(reservation.id, 'cancelled')}
          className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (reservation.status === 'confirmed') {
    return (
      <button
        onClick={() => onStatusChange(reservation.id, 'seated')}
        className="rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700"
      >
        Seat
      </button>
    );
  }

  if (reservation.status === 'seated') {
    return (
      <button
        onClick={() => onStatusChange(reservation.id, 'completed')}
        className="rounded bg-gray-800 px-2 py-1 text-xs text-white hover:bg-gray-700"
      >
        Complete
      </button>
    );
  }

  return <span className="text-xs text-gray-400">-</span>;
}

function ReservationSettingsView() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Reservation Settings</h2>
      <p className="mt-1 text-sm text-gray-500">
        Configure your reservation preferences, time slots, and policies.
      </p>

      <div className="mt-6 space-y-6">
        <div className="rounded-lg bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            Settings configuration is coming soon. For now, reservations use default settings.
          </p>
        </div>

        <Link
          href="/reservations/floor-plan"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
          Manage Floor Plan & Tables
        </Link>
      </div>
    </div>
  );
}
