'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  SpinnerGap,
  WhatsappLogo,
  User,
  Bed,
  CreditCard,
  ClockCounterClockwise,
  Gavel,
  ArrowClockwise,
  Envelope,
  Phone,
  FileText,
  CheckCircle,
  Circle,
} from '@phosphor-icons/react';
import BookingStatusBadge from '@/components/accommodations/BookingStatusBadge';
import BookingActions from '@/components/accommodations/BookingActions';
import BookingTimeline from '@/components/accommodations/BookingTimeline';
import { buildWhatsAppUrl, formatBookingPrice } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BookingDetail {
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
  internal_notes: string | null;
  booking_source: string | null;
  cancellation_reason: string | null;
  actual_check_in: string | null;
  actual_check_out: string | null;
  created_at: string;
  room: { id: string; room_number: string; room_type: string } | null;
  property_id?: string;
}

interface PropertyInfo {
  id: string;
  name: string;
  host_phone: string | null;
  host_whatsapp: string | null;
}

interface BookingDocument {
  id: string;
  document_type: 'passport' | 'visa';
  file_name: string;
  visa_expiry_date: string | null;
  registered_with_authorities: boolean;
  superseded_by: string | null;
  created_at: string;
}

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
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatPaymentMethod(method: string | null): string {
  if (!method) return 'Not specified';
  const labels: Record<string, string> = {
    cash: 'Cash',
    bank_transfer: 'Bank Transfer',
    stripe_card: 'Card (Stripe)',
    crypto: 'Cryptocurrency',
  };
  return labels[method] || method;
}

// Stable header object (derived from env constants, never changes)
const AUTH_HEADERS = { Authorization: `Bearer ${ADMIN_API_KEY}` };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [property, setProperty] = useState<PropertyInfo | null>(null);
  const [documents, setDocuments] = useState<BookingDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [docTogglingIds, setDocTogglingIds] = useState<Set<string>>(new Set());

  // ---- Fetch booking + property ----
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Fetch booking detail
        const bookingRes = await fetch(`/api/accommodations/bookings/${bookingId}`, {
          headers: AUTH_HEADERS,
        });

        if (!bookingRes.ok) {
          if (bookingRes.status === 404) {
            setError('Booking not found');
            setLoading(false);
            return;
          }
          throw new Error(`Failed to fetch booking (${bookingRes.status})`);
        }

        const bookingData = await bookingRes.json();
        setBooking(bookingData.booking);

        // Fetch property for owner WhatsApp info
        if (PROPERTY_ID) {
          const propRes = await fetch(`/api/accommodations/property?propertyId=${PROPERTY_ID}`, {
            headers: AUTH_HEADERS,
          });
          if (propRes.ok) {
            const propData = await propRes.json();
            setProperty(propData.property);
          }
        }

        // Fetch documents for this booking
        const docsRes = await fetch('/api/accommodations/documents', {
          headers: AUTH_HEADERS,
        });
        if (docsRes.ok) {
          const docsData = await docsRes.json();
          // Filter documents for this specific booking
          const bookingDocs = (docsData.documents || []).filter(
            (d: BookingDocument & { booking: { id: string } }) => d.booking?.id === bookingId
          );
          setDocuments(bookingDocs);
        }
      } catch (err) {
        console.error('[BookingDetailPage] fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load booking');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [bookingId]);

  // ---- Handle status action ----
  const handleAction = async (action: string, reason?: string) => {
    if (!booking) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/accommodations/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Action failed');
      }

      const data = await res.json();
      setBooking(data.booking);
    } catch (err) {
      console.error('[BookingDetailPage] action error:', err);
      alert(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  // ---- Retry ----
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger effect
    window.location.reload();
  };

  // ---- Toggle document registration ----
  const handleToggleRegistered = async (docId: string, currentValue: boolean) => {
    setDocTogglingIds((prev) => new Set(prev).add(docId));
    try {
      const res = await fetch('/api/accommodations/documents', {
        method: 'PATCH',
        headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, registeredWithAuthorities: !currentValue }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setDocuments((prev) =>
        prev.map((d) => (d.id === docId ? { ...d, registered_with_authorities: !currentValue } : d))
      );
    } catch {
      alert('Failed to update registration status');
    } finally {
      setDocTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(docId);
        return next;
      });
    }
  };

  // ---- Loading ----
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <SpinnerGap size={24} className="animate-spin text-blue-600" />
        <span className="ml-2 text-sm text-gray-600">Loading booking...</span>
      </div>
    );
  }

  // ---- Error / Not found ----
  if (error || !booking) {
    return (
      <div className="space-y-4">
        <Link
          href="/accommodations/bookings"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          Back to bookings
        </Link>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="text-lg font-medium text-red-800">{error || 'Booking not found'}</h3>
          <button
            onClick={handleRetry}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-800"
          >
            <ArrowClockwise size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ---- WhatsApp URLs ----
  const guestWhatsAppUrl = booking.guest_phone
    ? buildWhatsAppUrl(
        booking.guest_phone,
        `Hi ${booking.guest_name}, regarding your booking ${booking.booking_code}...`
      )
    : null;

  const ownerPhone = property?.host_whatsapp || property?.host_phone;
  const ownerWhatsAppUrl = ownerPhone
    ? buildWhatsAppUrl(
        ownerPhone,
        `New booking ${booking.booking_code}: ${booking.guest_name} ${booking.guest_last_name} from ${booking.check_in_date} to ${booking.check_out_date}, ${booking.num_nights} nights. Room: ${booking.room?.room_type || 'N/A'}.`
      )
    : null;

  return (
    <div className="space-y-6">
      {/* Back link + title */}
      <div>
        <Link
          href="/accommodations/bookings"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          Back to bookings
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Booking {booking.booking_code}</h1>
          <BookingStatusBadge status={booking.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: main info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Guest Info */}
          <Card
            title="Guest Information"
            icon={<User size={20} weight="duotone" className="text-blue-600" />}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Name" value={`${booking.guest_name} ${booking.guest_last_name}`} />
              <InfoRow
                label="Email"
                value={
                  <a
                    href={`mailto:${booking.guest_email}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Envelope size={14} />
                    {booking.guest_email}
                  </a>
                }
              />
              <InfoRow
                label="Phone"
                value={
                  booking.guest_phone ? (
                    <a
                      href={`tel:${booking.guest_phone}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Phone size={14} />
                      {booking.guest_phone}
                    </a>
                  ) : (
                    'Not provided'
                  )
                }
              />
            </div>
            {guestWhatsAppUrl && (
              <div className="mt-4">
                <a
                  href={guestWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Contact via WhatsApp
                </a>
              </div>
            )}
            {ownerWhatsAppUrl && (
              <div className="mt-2">
                <a
                  href={ownerWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Send WhatsApp to Owner
                </a>
              </div>
            )}
          </Card>

          {/* Stay Details */}
          <Card
            title="Stay Details"
            icon={<Bed size={20} weight="duotone" className="text-indigo-600" />}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                label="Room"
                value={
                  booking.room
                    ? `${booking.room.room_number} (${booking.room.room_type})`
                    : 'No room assigned'
                }
              />
              <InfoRow label="Check-in" value={formatDate(booking.check_in_date)} />
              <InfoRow label="Check-out" value={formatDate(booking.check_out_date)} />
              <InfoRow label="Nights" value={String(booking.num_nights)} />
              <InfoRow label="Guests" value={String(booking.num_guests)} />
            </div>
            {booking.special_requests && (
              <div className="mt-4 rounded-md bg-amber-50 p-3">
                <p className="text-xs font-medium uppercase text-amber-700">Special Requests</p>
                <p className="mt-1 text-sm italic text-amber-800">{booking.special_requests}</p>
              </div>
            )}
          </Card>

          {/* Payment */}
          <Card
            title="Payment"
            icon={<CreditCard size={20} weight="duotone" className="text-emerald-600" />}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Method" value={formatPaymentMethod(booking.payment_method)} />
              <InfoRow
                label="Status"
                value={
                  booking.payment_status ? (
                    <BookingStatusBadge status={booking.payment_status} type="payment" />
                  ) : (
                    'N/A'
                  )
                }
              />
              <InfoRow
                label="Total"
                value={formatBookingPrice(booking.total_price, booking.currency)}
              />
              {booking.deposit_amount != null && (
                <InfoRow
                  label="Deposit"
                  value={`${formatBookingPrice(booking.deposit_amount, booking.currency)} (${booking.deposit_percent || 0}%)`}
                />
              )}
            </div>
          </Card>
        </div>

        {/* Right column: actions + timeline */}
        <div className="space-y-6">
          {/* Actions */}
          <Card
            title="Actions"
            icon={<Gavel size={20} weight="duotone" className="text-orange-600" />}
          >
            <BookingActions
              bookingId={booking.id}
              currentStatus={booking.status}
              onAction={handleAction}
              loading={actionLoading}
            />
          </Card>

          {/* Timeline */}
          <Card
            title="Timeline"
            icon={<ClockCounterClockwise size={20} weight="duotone" className="text-purple-600" />}
          >
            <BookingTimeline booking={booking} />
          </Card>

          {/* Documents */}
          <Card
            title="Documents"
            icon={<FileText size={20} weight="duotone" className="text-teal-600" />}
          >
            {documents.filter((d) => !d.superseded_by).length === 0 ? (
              <p className="text-sm text-gray-500">No documents uploaded by guest.</p>
            ) : (
              <div className="space-y-2">
                {documents
                  .filter((d) => !d.superseded_by)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {doc.document_type === 'passport' ? '🛂' : '📄'}
                        </span>
                        <div>
                          <p className="text-sm font-medium capitalize text-gray-900">
                            {doc.document_type}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(doc.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                            {doc.visa_expiry_date &&
                              ` | Expires: ${new Date(doc.visa_expiry_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleToggleRegistered(doc.id, doc.registered_with_authorities)
                        }
                        disabled={docTogglingIds.has(doc.id)}
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
                  ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
