import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSupabaseAdmin } from '@/lib/supabase';
import { formatPrice } from '@/lib/price-utils';

interface Props {
  params: { code: string };
}

interface BookingData {
  booking_code: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
  guest_count: number;
  total_price: number;
  currency: string;
  special_requests: string | null;
  created_at: string;
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
      booking_code,
      status,
      check_in_date,
      check_out_date,
      guest_count,
      total_price,
      currency,
      special_requests,
      created_at,
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
    booking_code: data.booking_code,
    status: data.status,
    check_in_date: data.check_in_date,
    check_out_date: data.check_out_date,
    guest_count: data.guest_count,
    total_price: data.total_price,
    currency: data.currency || 'VND',
    special_requests: data.special_requests,
    created_at: data.created_at,
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
  cancelled: {
    bg: 'bg-[hsl(var(--error-light))]',
    text: 'text-[hsl(var(--error))]',
    label: 'Cancelled',
  },
};

export default async function BookingPage({ params }: Props) {
  const booking = await fetchBooking(params.code);
  if (!booking) notFound();

  const nights = getNights(booking.check_in_date, booking.check_out_date);
  const statusStyle = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;

  return (
    <main className="mx-auto max-w-lg px-4 py-8">
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
