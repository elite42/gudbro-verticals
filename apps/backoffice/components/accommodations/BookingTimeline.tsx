'use client';

interface BookingDetail {
  created_at: string;
  status: string;
  actual_check_in: string | null;
  actual_check_out: string | null;
  cancellation_reason: string | null;
}

interface BookingTimelineProps {
  booking: BookingDetail;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface TimelineEntry {
  label: string;
  date: string | null;
  color: string;
  active: boolean;
  note?: string;
}

export default function BookingTimeline({ booking }: BookingTimelineProps) {
  const entries: TimelineEntry[] = [];

  // Always show created
  entries.push({
    label: 'Booking created',
    date: booking.created_at,
    color: 'bg-gray-400',
    active: true,
  });

  // Status-specific entries
  if (
    booking.status === 'confirmed' ||
    booking.status === 'checked_in' ||
    booking.status === 'checked_out'
  ) {
    entries.push({
      label: 'Confirmed',
      date: null, // We don't have a confirmed_at timestamp
      color: 'bg-green-500',
      active: true,
    });
  }

  if (booking.status === 'checked_in' || booking.status === 'checked_out') {
    entries.push({
      label: 'Checked in',
      date: booking.actual_check_in,
      color: 'bg-blue-500',
      active: true,
    });
  }

  if (booking.status === 'checked_out') {
    entries.push({
      label: 'Checked out',
      date: booking.actual_check_out,
      color: 'bg-gray-500',
      active: true,
    });
  }

  if (booking.status === 'cancelled') {
    entries.push({
      label: 'Cancelled',
      date: null,
      color: 'bg-red-500',
      active: true,
      note: booking.cancellation_reason || undefined,
    });
  }

  // For pending statuses, show upcoming steps as inactive
  if (booking.status === 'pending' || booking.status === 'pending_payment') {
    entries.push({
      label: 'Awaiting confirmation',
      date: null,
      color: 'bg-amber-400',
      active: true,
    });
    entries.push({ label: 'Check in', date: null, color: 'bg-gray-200', active: false });
    entries.push({ label: 'Check out', date: null, color: 'bg-gray-200', active: false });
  }

  if (booking.status === 'confirmed') {
    entries.push({ label: 'Check in', date: null, color: 'bg-gray-200', active: false });
    entries.push({ label: 'Check out', date: null, color: 'bg-gray-200', active: false });
  }

  if (booking.status === 'checked_in') {
    entries.push({ label: 'Check out', date: null, color: 'bg-gray-200', active: false });
  }

  return (
    <div className="space-y-0">
      {entries.map((entry, i) => (
        <div key={i} className="flex gap-3">
          {/* Dot + line */}
          <div className="flex flex-col items-center">
            <div
              className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${entry.color} ${
                !entry.active ? 'opacity-40' : ''
              }`}
            />
            {i < entries.length - 1 && (
              <div className="w-0.5 flex-1 bg-gray-200" style={{ minHeight: '24px' }} />
            )}
          </div>

          {/* Content */}
          <div className="pb-4">
            <p
              className={`text-sm font-medium ${entry.active ? 'text-gray-900' : 'text-gray-400'}`}
            >
              {entry.label}
            </p>
            {entry.date && <p className="text-xs text-gray-500">{formatDateTime(entry.date)}</p>}
            {entry.note && <p className="mt-1 text-xs text-red-600">Reason: {entry.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
