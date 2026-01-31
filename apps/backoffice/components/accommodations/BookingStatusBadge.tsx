'use client';

import { BOOKING_STATUS_COLORS, PAYMENT_STATUS_COLORS } from '@/lib/accommodations/helpers';

interface BookingStatusBadgeProps {
  status: string;
  type?: 'booking' | 'payment';
}

export default function BookingStatusBadge({ status, type = 'booking' }: BookingStatusBadgeProps) {
  const colorMap = type === 'payment' ? PAYMENT_STATUS_COLORS : BOOKING_STATUS_COLORS;
  const colors = colorMap[status] || 'bg-gray-100 text-gray-600';

  const label = status.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${colors}`}>
      {label}
    </span>
  );
}
