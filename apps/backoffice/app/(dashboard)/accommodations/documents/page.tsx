'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  SpinnerGap,
  ArrowClockwise,
  DownloadSimple,
  Eye,
  CheckCircle,
  Circle,
  Warning,
  FileText,
} from '@phosphor-icons/react';
import { differenceInCalendarDays } from 'date-fns';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DocumentBooking {
  id: string;
  booking_code: string;
  guest_name: string;
  guest_last_name: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  room: { room_number: string; room_type: string } | null;
}

interface GuestDocumentRow {
  id: string;
  document_type: 'passport' | 'visa';
  file_name: string;
  file_size_bytes: number | null;
  visa_expiry_date: string | null;
  registered_with_authorities: boolean;
  superseded_by: string | null;
  created_at: string;
  deleted_at: string | null;
  booking: DocumentBooking;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const AUTH_HEADERS = { Authorization: `Bearer ${ADMIN_API_KEY}` };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function daysUntilExpiry(expiryDate: string): number {
  return differenceInCalendarDays(new Date(expiryDate), new Date());
}

function urgencyColor(days: number): string {
  if (days <= 3) return 'bg-red-50 border-red-200';
  if (days <= 7) return 'bg-amber-50 border-amber-200';
  return 'bg-white border-gray-200';
}

function urgencyBadge(days: number): { label: string; className: string } {
  if (days <= 0) return { label: 'Expired', className: 'bg-red-100 text-red-800' };
  if (days <= 3) return { label: `${days}d left`, className: 'bg-red-100 text-red-800' };
  if (days <= 7) return { label: `${days}d left`, className: 'bg-amber-100 text-amber-800' };
  return { label: `${days}d left`, className: 'bg-green-100 text-green-800' };
}

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

export default function DocumentsDashboard() {
  const [documents, setDocuments] = useState<GuestDocumentRow[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'urgency' | 'guests'>('urgency');
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  const fetchDocs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/accommodations/documents', {
        headers: AUTH_HEADERS,
      });
      if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
      const data = await res.json();
      setDocuments(data.documents || []);
      setPendingCount(data.pendingCount || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const toggleRegistered = async (docId: string, currentValue: boolean) => {
    setTogglingIds((prev) => new Set(prev).add(docId));
    try {
      const res = await fetch('/api/accommodations/documents', {
        method: 'PATCH',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, registeredWithAuthorities: !currentValue }),
      });
      if (!res.ok) throw new Error('Failed to update');
      // Update locally
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? { ...d, registered_with_authorities: !currentValue } : d))
      );
      setPendingCount((prev) => prev + (currentValue ? 1 : -1));
    } catch {
      alert('Failed to update registration status');
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(docId);
        return next;
      });
    }
  };

  // Filter active documents (not superseded)
  const activeDocs = documents.filter((d) => !d.superseded_by);

  // Urgency view: visa documents sorted by expiry
  const visaDocs = activeDocs
    .filter((d) => d.document_type === 'visa' && d.visa_expiry_date)
    .sort((a, b) => {
      const daysA = daysUntilExpiry(a.visa_expiry_date!);
      const daysB = daysUntilExpiry(b.visa_expiry_date!);
      return daysA - daysB;
    });

  // Guest view: group by booking
  const byBooking = activeDocs.reduce(
    (acc, doc) => {
      const key = doc.booking.id;
      if (!acc[key]) acc[key] = { booking: doc.booking, docs: [] };
      acc[key].docs.push(doc);
      return acc;
    },
    {} as Record<string, { booking: DocumentBooking; docs: GuestDocumentRow[] }>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <SpinnerGap size={24} className="animate-spin text-blue-600" />
        <span className="ml-2 text-sm text-gray-600">Loading documents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Guest Documents</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchDocs}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800"
          >
            <ArrowClockwise size={16} /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guest Documents</h1>
          {pendingCount > 0 && (
            <p className="mt-1 text-sm text-amber-700">
              <Warning size={14} className="mr-1 inline" />
              {pendingCount} document{pendingCount !== 1 ? 's' : ''} pending registration
            </p>
          )}
        </div>
        <button
          onClick={fetchDocs}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowClockwise size={16} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('urgency')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'urgency'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          By Urgency
        </button>
        <button
          onClick={() => setActiveTab('guests')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'guests'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          By Guest
        </button>
      </div>

      {/* Urgency Tab */}
      {activeTab === 'urgency' && (
        <div className="space-y-3">
          {visaDocs.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <FileText size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">No visa documents with expiry dates.</p>
            </div>
          ) : (
            visaDocs.map((doc) => {
              const days = daysUntilExpiry(doc.visa_expiry_date!);
              const badge = urgencyBadge(days);
              return (
                <div key={doc.id} className={`rounded-lg border p-4 ${urgencyColor(days)}`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/accommodations/bookings/${doc.booking.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600 hover:underline"
                        >
                          {doc.booking.guest_name} {doc.booking.guest_last_name}
                        </Link>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Room {doc.booking.room?.room_number || 'N/A'} | Visa expires:{' '}
                        {formatDate(doc.visa_expiry_date!)} | Booking: {doc.booking.booking_code}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRegistered(doc.id, doc.registered_with_authorities)}
                        disabled={togglingIds.has(doc.id)}
                        className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          doc.registered_with_authorities
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        title={
                          doc.registered_with_authorities
                            ? 'Mark as unregistered'
                            : 'Mark as registered with authorities'
                        }
                      >
                        {doc.registered_with_authorities ? (
                          <CheckCircle size={14} weight="fill" />
                        ) : (
                          <Circle size={14} />
                        )}
                        {doc.registered_with_authorities ? 'Registered' : 'Mark Registered'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* By Guest Tab */}
      {activeTab === 'guests' && (
        <div className="space-y-4">
          {Object.keys(byBooking).length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
              <FileText size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">No guest documents uploaded.</p>
            </div>
          ) : (
            Object.values(byBooking).map(({ booking, docs }) => (
              <GuestCard
                key={booking.id}
                booking={booking}
                docs={docs}
                togglingIds={togglingIds}
                onToggleRegistered={toggleRegistered}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function GuestCard({
  booking,
  docs,
  togglingIds,
  onToggleRegistered,
}: {
  booking: DocumentBooking;
  docs: GuestDocumentRow[];
  togglingIds: Set<string>;
  onToggleRegistered: (id: string, current: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div>
          <p className="font-medium text-gray-900">
            {booking.guest_name} {booking.guest_last_name}
          </p>
          <p className="text-xs text-gray-500">
            Room {booking.room?.room_number || 'N/A'} | {formatDate(booking.check_in_date)} —{' '}
            {formatDate(booking.check_out_date)} | {docs.length} doc{docs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <span className="text-gray-400">{expanded ? '−' : '+'}</span>
      </button>

      {expanded && (
        <div className="border-t border-gray-100 p-4 pt-3">
          <div className="space-y-2">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">
                    {doc.document_type === 'passport' ? '🛂' : '📄'}
                  </span>
                  <div>
                    <p className="text-sm font-medium capitalize text-gray-900">
                      {doc.document_type}
                    </p>
                    <p className="text-xs text-gray-500">
                      Uploaded {formatDate(doc.created_at)}
                      {doc.visa_expiry_date && ` | Expires: ${formatDate(doc.visa_expiry_date)}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleRegistered(doc.id, doc.registered_with_authorities)}
                    disabled={togglingIds.has(doc.id)}
                    className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                      doc.registered_with_authorities
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {doc.registered_with_authorities ? (
                      <CheckCircle size={12} weight="fill" />
                    ) : (
                      <Circle size={12} />
                    )}
                    {doc.registered_with_authorities ? 'Registered' : 'Pending'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
