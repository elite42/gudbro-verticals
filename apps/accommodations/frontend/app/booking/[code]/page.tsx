import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSupabaseAdmin } from '@/lib/supabase';
import { formatPrice } from '@/lib/price-utils';
import { PAYMENT_METHOD_CONFIG } from '@/types/property';
import type { AccomPaymentMethod } from '@/types/property';

interface Props {
  params: { code: string };
  searchParams: { payment?: string };
}

interface BookingData {
  id: string;
  booking_code: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
  guest_count: number;
  total_price: number;
  currency: string;
  special_requests: string | null;
  created_at: string;
  payment_method: string | null;
  payment_status: string | null;
  deposit_amount: number | null;
  deposit_percent: number | null;
  property: {
    name: string;
    city: string | null;
    contact_whatsapp: string | null;
    images: string[];
  };
  room: {
    room_type: string;
    room_number: string;
  };
}

async function fetchBooking(code: string): Promise<BookingData | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('accom_bookings')
    .select(
      `
      id,
      booking_code,
      status,
      check_in_date,
      check_out_date,
      guest_count,
      total_price,
      currency,
      special_requests,
      created_at,
      payment_method,
      payment_status,
      deposit_amount,
      deposit_percent,
      property:accom_properties!accom_bookings_property_id_fkey (
        name,
        city,
        contact_whatsapp,
        images
      ),
      room:accom_rooms!accom_bookings_room_id_fkey (
        room_type,
        room_number
      )
    `
    )
    .eq('booking_code', code)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    booking_code: data.booking_code,
    status: data.status,
    check_in_date: data.check_in_date,
    check_out_date: data.check_out_date,
    guest_count: data.guest_count,
    total_price: data.total_price,
    currency: data.currency || 'VND',
    special_requests: data.special_requests,
    created_at: data.created_at,
    payment_method: data.payment_method,
    payment_status: data.payment_status,
    deposit_amount: data.deposit_amount,
    deposit_percent: data.deposit_percent,
    property: (data.property as unknown as BookingData['property']) || {
      name: 'Property',
      city: null,
      contact_whatsapp: null,
      images: [],
    },
    room: (data.room as unknown as BookingData['room']) || {
      room_type: 'Room',
      room_number: '',
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Booking ${params.code} | GUDBRO Stays`,
    robots: { index: false, follow: false },
  };
}

function getNights(checkIn: string, checkOut: string): number {
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: {
    bg: 'bg-[hsl(var(--success-light))]',
    text: 'text-[hsl(var(--success))]',
    label: 'Confirmed',
  },
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    label: 'Pending',
  },
  pending_payment: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    label: 'Awaiting Payment',
  },
  payment_failed: {
    bg: 'bg-[hsl(var(--error-light))]',
    text: 'text-[hsl(var(--error))]',
    label: 'Payment Failed',
  },
  cancelled: {
    bg: 'bg-[hsl(var(--error-light))]',
    text: 'text-[hsl(var(--error))]',
    label: 'Cancelled',
  },
};

const PAYMENT_STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  paid: {
    bg: 'bg-[hsl(var(--success-light))]',
    text: 'text-[hsl(var(--success))]',
    label: 'Paid',
  },
  partial: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    label: 'Deposit Paid',
  },
  unpaid: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    label: 'Unpaid',
  },
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    label: 'Pending',
  },
  failed: {
    bg: 'bg-[hsl(var(--error-light))]',
    text: 'text-[hsl(var(--error))]',
    label: 'Failed',
  },
};

function getPaymentMethodLabel(method: string | null): string {
  if (!method) return 'Not specified';
  const config = PAYMENT_METHOD_CONFIG[method as AccomPaymentMethod];
  return config?.label || method;
}

/**
 * Inline script for the payment button.
 * The bookingId is a server-known UUID (not user input), safe for inline use.
 */
function getPaymentScript(bookingId: string): string {
  // Validate bookingId is UUID format to prevent injection
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(bookingId)) return '';

  return `
    document.getElementById('payment-button')?.addEventListener('click', async function() {
      this.disabled = true;
      this.textContent = 'Redirecting...';
      try {
        var res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId: '${bookingId}' })
        });
        var data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert('Could not create payment session. Please try again.');
          this.disabled = false;
          this.textContent = 'Complete Payment';
        }
      } catch (e) {
        alert('Something went wrong. Please try again.');
        this.disabled = false;
        this.textContent = 'Complete Payment';
      }
    });
  `;
}

export default async function BookingPage({ params, searchParams }: Props) {
  const booking = await fetchBooking(params.code);
  if (!booking) notFound();

  const nights = getNights(booking.check_in_date, booking.check_out_date);
  const statusStyle = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;
  const paymentResult = searchParams.payment;
  const showPaymentRetry =
    booking.status === 'pending_payment' && booking.payment_method === 'card';

  return (
    <main className="mx-auto max-w-lg px-4 py-8">
      {/* Payment result banners */}
      {paymentResult === 'success' && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm font-medium text-green-800">
          Payment successful! Your booking is confirmed.
        </div>
      )}
      {paymentResult === 'cancelled' && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-medium text-amber-800">
          Payment was not completed. You can try again below.
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl font-bold">Booking Details</h1>
        <p className="mt-1 text-sm text-[hsl(var(--foreground-muted))]">
          Reference: <span className="font-mono font-medium">{booking.booking_code}</span>
        </p>
      </div>

      {/* Status badge */}
      <div className="mb-6 flex justify-center">
        <span
          className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </div>

      {/* Property info */}
      <div className="mb-6 rounded-xl border border-[hsl(var(--border))] bg-white p-5">
        <h2 className="font-display text-lg font-semibold">{booking.property.name}</h2>
        {booking.property.city && (
          <p className="text-sm text-[hsl(var(--foreground-muted))]">{booking.property.city}</p>
        )}
      </div>

      {/* Booking details */}
      <div className="mb-6 rounded-xl border border-[hsl(var(--border))] bg-white p-5">
        <h3 className="mb-4 font-semibold">Stay Details</h3>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-[hsl(var(--foreground-muted))]">Check-in</dt>
            <dd className="font-medium">{formatDate(booking.check_in_date)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[hsl(var(--foreground-muted))]">Check-out</dt>
            <dd className="font-medium">{formatDate(booking.check_out_date)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[hsl(var(--foreground-muted))]">Duration</dt>
            <dd className="font-medium">
              {nights} night{nights !== 1 ? 's' : ''}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[hsl(var(--foreground-muted))]">Guests</dt>
            <dd className="font-medium">{booking.guest_count}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[hsl(var(--foreground-muted))]">Room</dt>
            <dd className="font-medium">
              {booking.room.room_type}
              {booking.room.room_number ? ` (${booking.room.room_number})` : ''}
            </dd>
          </div>
          <hr className="border-[hsl(var(--border))]" />
          <div className="flex justify-between">
            <dt className="font-semibold">Total</dt>
            <dd className="text-lg font-bold text-[hsl(var(--primary))]">
              {formatPrice(booking.total_price, booking.currency)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Payment info section */}
      {booking.payment_method && (
        <div className="mb-6 rounded-xl border border-[hsl(var(--border))] bg-white p-5">
          <h3 className="mb-4 font-semibold">Payment</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-[hsl(var(--foreground-muted))]">Method</dt>
              <dd className="font-medium">{getPaymentMethodLabel(booking.payment_method)}</dd>
            </div>
            {booking.payment_status && (
              <div className="flex items-center justify-between">
                <dt className="text-[hsl(var(--foreground-muted))]">Status</dt>
                <dd>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      (
                        PAYMENT_STATUS_STYLES[booking.payment_status] ||
                        PAYMENT_STATUS_STYLES.unpaid
                      ).bg
                    } ${
                      (
                        PAYMENT_STATUS_STYLES[booking.payment_status] ||
                        PAYMENT_STATUS_STYLES.unpaid
                      ).text
                    }`}
                  >
                    {
                      (
                        PAYMENT_STATUS_STYLES[booking.payment_status] ||
                        PAYMENT_STATUS_STYLES.unpaid
                      ).label
                    }
                  </span>
                </dd>
              </div>
            )}
            {/* Deposit breakdown */}
            {booking.deposit_percent != null &&
              booking.deposit_percent < 100 &&
              booking.deposit_amount != null &&
              booking.deposit_amount > 0 && (
                <>
                  <hr className="border-[hsl(var(--border))]" />
                  <div className="flex justify-between">
                    <dt className="text-[hsl(var(--foreground-muted))]">
                      Deposit ({booking.deposit_percent}%)
                    </dt>
                    <dd className="font-medium">
                      {formatPrice(booking.deposit_amount, booking.currency)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[hsl(var(--foreground-muted))]">Remaining at check-in</dt>
                    <dd className="font-medium">
                      {formatPrice(booking.total_price - booking.deposit_amount, booking.currency)}
                    </dd>
                  </div>
                </>
              )}
          </dl>

          {/* Card payment retry button */}
          {showPaymentRetry && (
            <div className="mt-4">
              <button
                type="button"
                id="payment-button"
                className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                data-booking-id={booking.id}
              >
                Complete Payment
              </button>
              <script
                dangerouslySetInnerHTML={{
                  __html: getPaymentScript(booking.id),
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* WhatsApp CTA */}
      {booking.property.contact_whatsapp && (
        <div className="mb-6">
          <a
            href={`https://wa.me/${booking.property.contact_whatsapp.replace(/\D/g, '')}?text=Hi, I have a booking (${booking.booking_code}) at ${encodeURIComponent(booking.property.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-medium text-white transition-colors hover:bg-[#20BD5A]"
          >
            Contact Host on WhatsApp
          </a>
        </div>
      )}

      {/* Footer note */}
      <p className="text-center text-xs text-[hsl(var(--foreground-subtle))]">
        Manage your booking by contacting the host directly.
      </p>
    </main>
  );
}
