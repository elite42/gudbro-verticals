'use client';

import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '@/lib/accommodations/helpers';

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const colors = ORDER_STATUS_COLORS[status] || 'bg-gray-100 text-gray-600';
  const label =
    ORDER_STATUS_LABELS[status] || status.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${colors}`}>
      {label}
    </span>
  );
}
