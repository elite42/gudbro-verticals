'use client';

import { useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { Reservation, ReservationStatus } from './ReservationCard';

interface MonthViewProps {
  date: Date;
  reservations: Reservation[];
  onReservationClick?: (reservation: Reservation) => void;
  onDateClick?: (date: Date) => void;
}

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-gray-100 text-gray-600',
  seated: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-50 text-gray-500',
};

const STATUS_DOT_COLORS: Record<ReservationStatus, string> = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-green-500',
  cancelled: 'bg-red-500',
  no_show: 'bg-gray-400',
  seated: 'bg-blue-500',
  completed: 'bg-gray-400',
};

export function MonthView({ date, reservations, onReservationClick, onDateClick }: MonthViewProps) {
  const today = new Date();

  // Get all days to display in the month grid
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [date]);

  // Group reservations by day
  const reservationsByDay = useMemo(() => {
    const grouped: Record<string, Reservation[]> = {};
    calendarDays.forEach((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      grouped[dayStr] = reservations.filter((r) => r.reservation_date === dayStr);
    });
    return grouped;
  }, [reservations, calendarDays]);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Days header */}
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {DAYS_SHORT.map((day) => (
          <div
            key={day}
            className="px-2 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {calendarDays.map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const isCurrentMonth = isSameMonth(day, date);
          const isToday = isSameDay(day, today);
          const dayReservations = reservationsByDay[dayStr] || [];

          // Count by status for summary
          const statusCounts = dayReservations.reduce(
            (acc, r) => {
              acc[r.status] = (acc[r.status] || 0) + 1;
              return acc;
            },
            {} as Record<ReservationStatus, number>
          );

          return (
            <div
              key={dayStr}
              onClick={() => onDateClick?.(day)}
              className={`min-h-[100px] cursor-pointer bg-white p-1 transition-colors hover:bg-gray-50 ${
                !isCurrentMonth ? 'bg-gray-50' : ''
              } ${isToday ? 'ring-2 ring-inset ring-blue-500' : ''}`}
            >
              {/* Date number */}
              <div className="mb-1 flex items-center justify-between">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                    isToday
                      ? 'bg-blue-600 font-bold text-white'
                      : isCurrentMonth
                        ? 'font-medium text-gray-900'
                        : 'text-gray-400'
                  }`}
                >
                  {format(day, 'd')}
                </span>

                {/* Total count badge */}
                {dayReservations.length > 0 && isCurrentMonth && (
                  <span className="rounded-full bg-gray-900 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    {dayReservations.length}
                  </span>
                )}
              </div>

              {/* Status dots summary */}
              {dayReservations.length > 0 && isCurrentMonth && (
                <div className="mb-1 flex flex-wrap gap-0.5">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div
                      key={status}
                      className="flex items-center gap-0.5"
                      title={`${count} ${status}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_COLORS[status as ReservationStatus]}`}
                      />
                      <span className="text-[9px] text-gray-500">{count}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* First 2-3 reservations */}
              {isCurrentMonth && (
                <div className="space-y-0.5">
                  {dayReservations.slice(0, 2).map((reservation) => (
                    <button
                      key={reservation.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReservationClick?.(reservation);
                      }}
                      className={`w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium transition-opacity hover:opacity-80 ${STATUS_COLORS[reservation.status]}`}
                    >
                      {reservation.reservation_time} {reservation.guest_name}
                    </button>
                  ))}
                  {dayReservations.length > 2 && (
                    <div className="text-[10px] font-medium text-gray-500">
                      +{dayReservations.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs">
        <span className="font-medium text-gray-700">Status:</span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-yellow-500" />
          Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Confirmed
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Seated
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-400" />
          Completed
        </span>
      </div>
    </div>
  );
}
