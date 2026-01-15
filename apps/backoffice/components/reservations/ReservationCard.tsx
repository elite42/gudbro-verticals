'use client';

import { Users, Clock, Phone, Mail, MessageSquare } from 'lucide-react';

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'no_show'
  | 'seated'
  | 'completed';

export interface Reservation {
  id: string;
  reservation_code: string;
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  duration_minutes: number;
  status: ReservationStatus;
  special_requests?: string;
  occasion?: string;
  section?: { id: string; name: string };
  table?: { id: string; table_number: string };
  source?: string;
}

interface ReservationCardProps {
  reservation: Reservation;
  compact?: boolean;
  onClick?: () => void;
  onStatusChange?: (status: ReservationStatus) => void;
}

const STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; bgColor: string; textColor: string; dotColor: string }
> = {
  pending: {
    label: 'Pending',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    dotColor: 'bg-yellow-500',
  },
  confirmed: {
    label: 'Confirmed',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    dotColor: 'bg-green-500',
  },
  cancelled: {
    label: 'Cancelled',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    dotColor: 'bg-red-500',
  },
  no_show: {
    label: 'No Show',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    dotColor: 'bg-gray-500',
  },
  seated: {
    label: 'Seated',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    dotColor: 'bg-blue-500',
  },
  completed: {
    label: 'Completed',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    dotColor: 'bg-gray-400',
  },
};

export function ReservationCard({
  reservation,
  compact = false,
  onClick,
  onStatusChange,
}: ReservationCardProps) {
  const statusConfig = STATUS_CONFIG[reservation.status];

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={`w-full rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:opacity-80 ${statusConfig.bgColor}`}
      >
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dotColor}`} />
          <span className="truncate font-medium">{reservation.guest_name}</span>
          <span className="text-gray-600">{reservation.party_size}p</span>
        </div>
        <div className="mt-0.5 text-[10px] text-gray-600">{reservation.reservation_time}</div>
      </button>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{reservation.guest_name}</h3>
          <p className="text-xs text-gray-500">#{reservation.reservation_code}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Details */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {reservation.party_size} guests
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {reservation.reservation_time}
          </span>
        </div>

        {reservation.section && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Section:</span> {reservation.section.name}
            {reservation.table && <span> - Table {reservation.table.table_number}</span>}
          </div>
        )}

        {reservation.guest_phone && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            {reservation.guest_phone}
          </div>
        )}

        {reservation.guest_email && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            {reservation.guest_email}
          </div>
        )}

        {reservation.special_requests && (
          <div className="flex items-start gap-1.5 text-sm text-gray-600">
            <MessageSquare className="mt-0.5 h-4 w-4" />
            <span className="italic">{reservation.special_requests}</span>
          </div>
        )}

        {reservation.occasion && (
          <div className="inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
            {reservation.occasion}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {onStatusChange && reservation.status === 'pending' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange('confirmed');
            }}
            className="flex-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
          >
            Confirm
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange('cancelled');
            }}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      )}

      {onStatusChange && reservation.status === 'confirmed' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange('seated');
            }}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Mark Seated
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange('no_show');
            }}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            No Show
          </button>
        </div>
      )}

      {onStatusChange && reservation.status === 'seated' && (
        <div className="mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStatusChange('completed');
            }}
            className="w-full rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
}

export function ReservationStatusBadge({ status }: { status: ReservationStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.bgColor} ${config.textColor}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}
