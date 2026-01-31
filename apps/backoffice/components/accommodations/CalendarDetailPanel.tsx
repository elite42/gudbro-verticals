'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { CalendarBlank, Lock, LockOpen, Bed, User, SpinnerGap } from '@phosphor-icons/react';
import BookingStatusBadge from '@/components/accommodations/BookingStatusBadge';
import { formatBookingPrice } from '@/lib/accommodations/helpers';
import type { CalendarDay } from './AvailabilityCalendar';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CalendarDetailPanelProps {
  selectedDate: string; // yyyy-MM-dd
  day: CalendarDay;
  rangeStart: string | null;
  rangeEnd: string | null;
  onBlock: (dateFrom: string, dateTo: string, reason: string, notes: string) => Promise<void>;
  onUnblock: (blockId: string) => Promise<void>;
  loading: boolean;
  currency: string;
  basePricePerNight: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BLOCK_REASONS = [
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'personal_use', label: 'Personal Use' },
  { value: 'other', label: 'Other' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CalendarDetailPanel({
  selectedDate,
  day,
  rangeStart,
  rangeEnd,
  onBlock,
  onUnblock,
  loading,
  currency,
  basePricePerNight,
}: CalendarDetailPanelProps) {
  const [blockReason, setBlockReason] = useState('maintenance');
  const [blockNotes, setBlockNotes] = useState('');
  const [blocking, setBlocking] = useState(false);
  const [unblocking, setUnblocking] = useState<string | null>(null);

  const formattedDate = format(parseISO(selectedDate), 'EEEE, MMMM d, yyyy');

  // Determine effective range for blocking
  const effectiveFrom = rangeStart || selectedDate;
  const effectiveTo = rangeEnd || selectedDate;
  const isRange = effectiveFrom !== effectiveTo;

  const handleBlock = async () => {
    setBlocking(true);
    try {
      await onBlock(effectiveFrom, effectiveTo, blockReason, blockNotes);
      setBlockNotes('');
      setBlockReason('maintenance');
    } finally {
      setBlocking(false);
    }
  };

  const handleUnblock = async (blockId: string) => {
    setUnblocking(blockId);
    try {
      await onUnblock(blockId);
    } finally {
      setUnblocking(null);
    }
  };

  const currentPrice = day.pricePerNight ?? basePricePerNight;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Date Header */}
      <div className="mb-4 flex items-center gap-2">
        <CalendarBlank size={20} weight="duotone" className="text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-900">{formattedDate}</h3>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Status</span>
        <div className="mt-1">
          <BookingStatusBadge
            status={
              day.status === 'available'
                ? 'confirmed'
                : day.status === 'booked'
                  ? 'checked_in'
                  : day.status === 'blocked'
                    ? 'cancelled'
                    : 'pending'
            }
            type="booking"
          />
          <span className="ml-2 text-sm capitalize text-gray-700">{day.status}</span>
        </div>
      </div>

      {/* Bookings Info */}
      {day.bookings.length > 0 && (
        <div className="mb-4 space-y-2">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Bookings ({day.bookings.length})
          </span>
          {day.bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2"
            >
              <User size={16} className="text-blue-600" />
              <span className="flex-1 text-sm font-medium text-gray-900">{booking.guest_name}</span>
              <BookingStatusBadge status={booking.status} />
            </div>
          ))}
        </div>
      )}

      {/* Existing Blocks */}
      {day.blocks.length > 0 && (
        <div className="mb-4 space-y-2">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Blocks ({day.blocks.length})
          </span>
          {day.blocks.map((block) => (
            <div key={block.id} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-gray-500" />
                  <span className="text-sm font-medium capitalize text-gray-700">
                    {block.reason.replace(/_/g, ' ')}
                  </span>
                </div>
                <button
                  onClick={() => handleUnblock(block.id)}
                  disabled={unblocking === block.id || loading}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {unblocking === block.id ? (
                    <SpinnerGap size={12} className="animate-spin" />
                  ) : (
                    <LockOpen size={12} />
                  )}
                  Remove
                </button>
              </div>
              {block.notes && <p className="mt-1 text-xs text-gray-500">{block.notes}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Price Info */}
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Price</span>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">
            {formatBookingPrice(currentPrice, currency)}
          </span>
          {day.pricePerNight && day.priceLabel && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
              {day.priceLabel}
            </span>
          )}
          {!day.pricePerNight && <span className="text-xs text-gray-400">base price</span>}
        </div>
      </div>

      {/* Block Action Section */}
      {day.status !== 'booked' && (
        <div className="border-t border-gray-100 pt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Block Dates
          </span>

          {/* Date Range Display */}
          <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">
            <Bed size={14} className="mr-1 inline text-gray-400" />
            {isRange ? (
              <>
                {format(parseISO(effectiveFrom), 'MMM d')} &mdash;{' '}
                {format(parseISO(effectiveTo), 'MMM d, yyyy')}
              </>
            ) : (
              <>{formattedDate}</>
            )}
          </div>

          {/* Reason */}
          <div className="mt-3">
            <label className="text-xs font-medium text-gray-600">Reason</label>
            <select
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {BLOCK_REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="mt-3">
            <label className="text-xs font-medium text-gray-600">Notes (optional)</label>
            <textarea
              value={blockNotes}
              onChange={(e) => setBlockNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Block Button */}
          <button
            onClick={handleBlock}
            disabled={blocking || loading}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {blocking ? <SpinnerGap size={16} className="animate-spin" /> : <Lock size={16} />}
            {blocking ? 'Blocking...' : 'Block Dates'}
          </button>
        </div>
      )}
    </div>
  );
}
