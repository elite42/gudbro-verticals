'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { startOfWeek, addDays, eachDayOfInterval, format, isWeekend } from 'date-fns';
import { CaretLeft, CaretRight, CalendarDots } from '@phosphor-icons/react';
import GanttBookingBar from './GanttBookingBar';

// ============================================================================
// Types
// ============================================================================

interface GanttRoom {
  id: string;
  room_number: string;
  room_type: string;
  floor: string | null;
}

interface GanttBooking {
  id: string;
  guest_name: string;
  guest_last_name: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
  room_id: string;
}

interface GanttCalendarProps {
  rooms: GanttRoom[];
  bookings: GanttBooking[];
  loading: boolean;
  onDateRangeChange?: (dateFrom: string, dateTo: string) => void;
}

// ============================================================================
// Component
// ============================================================================

export default function GanttCalendar({
  rooms,
  bookings,
  loading,
  onDateRangeChange,
}: GanttCalendarProps) {
  const [startDate, setStartDate] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const numDays = isMobile ? 7 : 14;
  const roomColWidth = isMobile ? '80px' : '120px';

  // Generate dates
  const dates = useMemo(() => {
    const end = addDays(startDate, numDays - 1);
    return eachDayOfInterval({ start: startDate, end });
  }, [startDate, numDays]);

  // Navigation
  const goBack = useCallback(() => setStartDate((d) => addDays(d, -7)), []);
  const goForward = useCallback(() => setStartDate((d) => addDays(d, 7)), []);
  const goToday = useCallback(() => setStartDate(startOfWeek(new Date(), { weekStartsOn: 1 })), []);

  const dateRange = useMemo(
    () => ({
      dateFrom: format(dates[0], 'yyyy-MM-dd'),
      dateTo: format(dates[dates.length - 1], 'yyyy-MM-dd'),
    }),
    [dates]
  );

  // Notify parent when visible date range changes
  useEffect(() => {
    onDateRangeChange?.(dateRange.dateFrom, dateRange.dateTo);
  }, [dateRange.dateFrom, dateRange.dateTo, onDateRangeChange]);

  // Helper: map a date string to column index (1-based, col 1 = room label)
  const dateToCol = useCallback(
    (dateStr: string): number => {
      const idx = dates.findIndex((d) => format(d, 'yyyy-MM-dd') === dateStr);
      if (idx === -1) return -1;
      return idx + 2; // col 1 is room labels
    },
    [dates]
  );

  const today = format(new Date(), 'yyyy-MM-dd');

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    );
  }

  // Empty state
  if (rooms.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <CalendarDots size={48} className="mx-auto text-gray-300" weight="duotone" />
        <h3 className="mt-4 text-sm font-medium text-gray-900">Add rooms to see timeline</h3>
        <p className="mt-1 text-sm text-gray-500">
          Create rooms in the Rooms tab to see the timeline calendar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="rounded-lg border border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-50"
            title="Previous week"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            onClick={goToday}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Today
          </button>
          <button
            onClick={goForward}
            className="rounded-lg border border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-50"
            title="Next week"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
        <div className="text-sm font-medium text-gray-700">
          {format(dates[0], 'MMM d')} - {format(dates[dates.length - 1], 'MMM d, yyyy')}
        </div>
      </div>

      {/* Gantt Grid */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <div
          className="min-w-[600px]"
          style={{
            display: 'grid',
            gridTemplateColumns: `${roomColWidth} repeat(${numDays}, minmax(40px, 1fr))`,
            gridTemplateRows: `48px repeat(${rooms.length}, 56px)`,
          }}
        >
          {/* Header: corner cell */}
          <div className="sticky left-0 z-20 flex items-center border-b border-r border-gray-200 bg-white px-3">
            <span className="text-xs font-medium uppercase text-gray-500">Rooms</span>
          </div>

          {/* Header: date cells */}
          {dates.map((date) => {
            const dateStr = format(date, 'yyyy-MM-dd');
            const isToday = dateStr === today;
            const weekend = isWeekend(date);
            return (
              <div
                key={dateStr}
                className={`flex flex-col items-center justify-center border-b border-gray-200 px-1 text-center ${
                  isToday ? 'bg-blue-50' : weekend ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <span
                  className={`text-xs ${isToday ? 'font-bold text-blue-600' : 'text-gray-500'}`}
                >
                  {format(date, 'EEE')}
                </span>
                <span
                  className={`text-sm ${
                    isToday
                      ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-bold text-white'
                      : 'font-medium text-gray-900'
                  }`}
                >
                  {format(date, 'd')}
                </span>
              </div>
            );
          })}

          {/* Room rows */}
          {rooms.map((room, rowIdx) => {
            const gridRow = rowIdx + 2; // row 1 is header
            const roomBookings = bookings.filter((b) => b.room_id === room.id);

            return (
              <div key={room.id} className="contents">
                {/* Room label (sticky) */}
                <div className="sticky left-0 z-10 flex items-center border-b border-r border-gray-200 bg-white px-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-gray-900">
                      {room.room_number}
                    </div>
                    <div className="truncate text-xs text-gray-500">
                      {room.floor ? `Floor ${room.floor}` : room.room_type}
                    </div>
                  </div>
                </div>

                {/* Date cells (background) */}
                {dates.map((date) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const isToday = dateStr === today;
                  const weekend = isWeekend(date);
                  return (
                    <div
                      key={`${room.id}-${dateStr}`}
                      className={`border-b border-r border-gray-100 ${
                        isToday ? 'bg-blue-50/50' : weekend ? 'bg-gray-50/50' : ''
                      }`}
                      style={{ gridRow, gridColumn: dateToCol(dateStr) }}
                    />
                  );
                })}

                {/* Booking bars */}
                {roomBookings.map((booking) => {
                  let startCol = dateToCol(booking.check_in_date);
                  let endCol = dateToCol(booking.check_out_date);

                  // Clamp to visible range
                  if (startCol === -1) startCol = 2; // starts before visible range
                  if (endCol === -1) endCol = numDays + 2; // ends after visible range

                  // Skip if completely outside
                  const bookingStart = booking.check_in_date;
                  const bookingEnd = booking.check_out_date;
                  const rangeStart = dateRange.dateFrom;
                  const rangeEnd = dateRange.dateTo;
                  if (bookingStart > rangeEnd || bookingEnd < rangeStart) return null;

                  return (
                    <GanttBookingBar
                      key={booking.id}
                      booking={booking}
                      gridRow={gridRow}
                      startCol={startCol}
                      endCol={endCol}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-l-2 border-blue-500 bg-blue-100" />
          Confirmed
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-l-2 border-green-500 bg-green-100" />
          Checked-in
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-l-2 border-amber-500 bg-amber-100" />
          Pending
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-l-2 border-slate-400 bg-slate-100" />
          Checked-out
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded border-l-2 border-gray-300 bg-gray-100" />
          Cancelled
        </div>
      </div>
    </div>
  );
}
