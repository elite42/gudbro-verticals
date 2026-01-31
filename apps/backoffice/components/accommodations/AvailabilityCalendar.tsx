'use client';

import { useMemo, useCallback } from 'react';
import {
  format,
  addMonths,
  subMonths,
  isToday as isTodayFn,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
  isBefore,
  isAfter,
  isSameDay,
} from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { formatBookingPrice } from '@/lib/accommodations/helpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CalendarDay {
  date: Date;
  dateStr: string; // yyyy-MM-dd
  isCurrentMonth: boolean;
  isToday: boolean;
  status: 'available' | 'booked' | 'blocked' | 'partial';
  pricePerNight: number | null; // override price, or null for base price
  priceLabel: string | null; // seasonal pricing label
  bookings: Array<{
    id: string;
    guest_name: string;
    status: string;
    room_id: string;
  }>;
  blocks: Array<{ id: string; reason: string; notes: string | null }>;
}

export interface AvailabilityCalendarProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  days: CalendarDay[];
  selectedDate: string | null; // yyyy-MM-dd
  onDateClick: (dateStr: string) => void;
  rangeStart: string | null;
  rangeEnd: string | null;
  onRangeSelect: (start: string, end: string | null) => void;
  basePricePerNight: number;
  currency: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const STATUS_STYLES: Record<string, string> = {
  available: 'bg-white hover:bg-green-50 border border-gray-100',
  booked: 'bg-blue-50 border border-blue-200',
  blocked:
    'bg-gray-100 border border-gray-200 [background-image:repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.05)_5px,rgba(0,0,0,0.05)_10px)]',
  partial: 'bg-amber-50 border border-amber-200',
};

const LEGEND_ITEMS: { status: string; color: string; label: string }[] = [
  { status: 'available', color: 'bg-white border border-gray-200', label: 'Available' },
  { status: 'booked', color: 'bg-blue-50 border border-blue-200', label: 'Booked' },
  { status: 'blocked', color: 'bg-gray-200', label: 'Blocked' },
  { status: 'partial', color: 'bg-amber-50 border border-amber-200', label: 'Partial' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AvailabilityCalendar({
  currentMonth,
  onMonthChange,
  days,
  selectedDate,
  onDateClick,
  rangeStart,
  rangeEnd,
  onRangeSelect,
  basePricePerNight,
  currency,
}: AvailabilityCalendarProps) {
  // Build a lookup map: dateStr -> CalendarDay
  const dayMap = useMemo(() => {
    const map = new Map<string, CalendarDay>();
    for (const d of days) {
      map.set(d.dateStr, d);
    }
    return map;
  }, [days]);

  // Grid days: full weeks spanning the month
  const gridDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth]);

  // Range helpers
  const rangeStartDate = rangeStart ? parseISO(rangeStart) : null;
  const rangeEndDate = rangeEnd ? parseISO(rangeEnd) : null;

  const isInRange = useCallback(
    (date: Date) => {
      if (!rangeStartDate || !rangeEndDate) return false;
      return (
        (isAfter(date, rangeStartDate) || isSameDay(date, rangeStartDate)) &&
        (isBefore(date, rangeEndDate) || isSameDay(date, rangeEndDate))
      );
    },
    [rangeStartDate, rangeEndDate]
  );

  // Click handler for range selection
  const handleDateClick = useCallback(
    (dateStr: string) => {
      onDateClick(dateStr);

      const clickedDate = parseISO(dateStr);

      if (!rangeStart) {
        // First click: set range start
        onRangeSelect(dateStr, null);
      } else if (!rangeEnd) {
        const startDate = parseISO(rangeStart);
        if (isBefore(clickedDate, startDate) || isSameDay(clickedDate, startDate)) {
          // Clicked before or on start: reset to this date
          onRangeSelect(dateStr, null);
        } else {
          // Second click: set range end
          onRangeSelect(rangeStart, dateStr);
        }
      } else {
        // Both set: reset and start new range
        onRangeSelect(dateStr, null);
      }
    },
    [rangeStart, rangeEnd, onDateClick, onRangeSelect]
  );

  return (
    <div>
      {/* Month Navigation Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => onMonthChange(subMonths(currentMonth, 1))}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Previous month"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button
          onClick={() => onMonthChange(addMonths(currentMonth, 1))}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Next month"
        >
          <CaretRight size={20} weight="bold" />
        </button>
      </div>

      {/* Day-of-week header */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {gridDays.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const day = dayMap.get(dateStr);
          const isCurrentMonth =
            date.getMonth() === currentMonth.getMonth() &&
            date.getFullYear() === currentMonth.getFullYear();
          const isToday = isTodayFn(date);
          const status = day?.status ?? 'available';
          const isSelected = selectedDate === dateStr;
          const inRange = isInRange(date);

          const price = day?.pricePerNight ?? basePricePerNight;

          return (
            <button
              key={dateStr}
              onClick={() => handleDateClick(dateStr)}
              className={`relative flex h-16 flex-col items-start justify-between rounded-md p-1 text-left transition-all md:h-20 md:p-1.5 ${
                STATUS_STYLES[status]
              } ${!isCurrentMonth ? 'opacity-40' : ''} ${
                isToday ? 'ring-2 ring-blue-500' : ''
              } ${isSelected ? 'ring-2 ring-indigo-500' : ''} ${inRange ? 'bg-indigo-100/50' : ''}`}
            >
              {/* Day number */}
              <span
                className={`text-xs font-medium ${
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${isToday ? 'font-bold text-blue-600' : ''}`}
              >
                {format(date, 'd')}
              </span>

              {/* Booking indicator */}
              {day && day.bookings.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[8px] font-bold text-white">
                  {day.bookings.length}
                </span>
              )}

              {/* Price label */}
              {isCurrentMonth && (
                <span
                  className={`hidden text-[10px] md:block ${
                    day?.pricePerNight ? 'font-medium text-green-700' : 'text-gray-400'
                  }`}
                >
                  {formatBookingPrice(price, currency)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.status} className="flex items-center gap-1.5">
            <div className={`h-3 w-3 rounded-sm ${item.color}`} />
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
