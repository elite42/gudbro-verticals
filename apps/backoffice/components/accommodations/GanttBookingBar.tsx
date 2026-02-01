'use client';

import { useRouter } from 'next/navigation';

// ============================================================================
// Types
// ============================================================================

interface GanttBooking {
  id: string;
  guest_name: string;
  guest_last_name: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
}

interface GanttBookingBarProps {
  booking: GanttBooking;
  gridRow: number;
  startCol: number;
  endCol: number;
}

// ============================================================================
// Status color map
// ============================================================================

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-blue-100 border-l-4 border-blue-500 text-blue-800',
  checked_in: 'bg-green-100 border-l-4 border-green-500 text-green-800',
  pending: 'bg-amber-100 border-l-4 border-amber-500 text-amber-800',
  pending_payment: 'bg-amber-100 border-l-4 border-amber-500 text-amber-800',
  cancelled: 'bg-gray-100 border-l-4 border-gray-300 text-gray-400 line-through',
  checked_out: 'bg-slate-100 border-l-4 border-slate-400 text-slate-600',
};

// ============================================================================
// Component
// ============================================================================

export default function GanttBookingBar({
  booking,
  gridRow,
  startCol,
  endCol,
}: GanttBookingBarProps) {
  const router = useRouter();

  const guestName = `${booking.guest_name} ${booking.guest_last_name}`.trim();
  const styleClass = STATUS_STYLES[booking.status] || STATUS_STYLES.confirmed;

  return (
    <div
      className={`flex cursor-pointer items-center overflow-hidden rounded-r px-2 text-xs font-medium transition-opacity hover:opacity-80 ${styleClass}`}
      style={{
        gridRow,
        gridColumn: `${startCol} / ${endCol}`,
        minHeight: 0,
        alignSelf: 'center',
        height: '36px',
      }}
      onClick={() => router.push(`/accommodations/bookings/${booking.id}`)}
      title={`${guestName} | ${booking.check_in_date} - ${booking.check_out_date} (${booking.status})`}
    >
      <span className="truncate">{guestName}</span>
    </div>
  );
}
