'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { Reservation, ReservationStatus } from './ReservationCard';

interface DayViewProps {
  date: Date;
  reservations: Reservation[];
  onReservationClick?: (reservation: Reservation) => void;
  onTimeSlotClick?: (time: string) => void;
  startHour?: number;
  endHour?: number;
}

const STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  confirmed: 'bg-green-100 border-green-300 text-green-800',
  cancelled: 'bg-red-100 border-red-300 text-red-800',
  no_show: 'bg-gray-100 border-gray-300 text-gray-600',
  seated: 'bg-blue-100 border-blue-300 text-blue-800',
  completed: 'bg-gray-50 border-gray-200 text-gray-500',
};

export function DayView({
  date,
  reservations,
  onReservationClick,
  onTimeSlotClick,
  startHour = 10,
  endHour = 23,
}: DayViewProps) {
  const hours = useMemo(() => {
    return Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
  }, [startHour, endHour]);

  const dateStr = format(date, 'yyyy-MM-dd');
  const isToday = format(new Date(), 'yyyy-MM-dd') === dateStr;

  // Filter reservations for this day
  const dayReservations = useMemo(() => {
    return reservations.filter((r) => r.reservation_date === dateStr);
  }, [reservations, dateStr]);

  // Calculate position for each reservation
  const positionedReservations = useMemo(() => {
    return dayReservations.map((reservation) => {
      const [hours, minutes] = reservation.reservation_time.split(':').map(Number);
      const topOffset = (hours - startHour) * 64 + (minutes / 60) * 64;
      const height = (reservation.duration_minutes / 60) * 64;

      return {
        reservation,
        top: Math.max(0, topOffset),
        height: Math.max(32, height),
      };
    });
  }, [dayReservations, startHour]);

  return (
    <div className="flex flex-col">
      {/* Day header */}
      <div className={`border-b border-gray-200 p-4 ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{format(date, 'EEEE, MMMM d')}</h3>
            <p className="text-sm text-gray-500">
              {dayReservations.length} reservation{dayReservations.length !== 1 ? 's' : ''}
            </p>
          </div>
          {isToday && (
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
              Today
            </span>
          )}
        </div>
      </div>

      {/* Time grid */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="relative min-h-[400px]">
          {/* Hour rows */}
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex h-16 border-b border-gray-100"
              onClick={() => onTimeSlotClick?.(`${hour.toString().padStart(2, '0')}:00`)}
            >
              <div className="w-16 shrink-0 pr-2 pt-0 text-right text-xs text-gray-500">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="relative flex-1 cursor-pointer border-l border-gray-200 hover:bg-gray-50">
                {/* Half hour line */}
                <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-100" />
              </div>
            </div>
          ))}

          {/* Reservations overlay */}
          {positionedReservations.map(({ reservation, top, height }) => (
            <button
              key={reservation.id}
              onClick={() => onReservationClick?.(reservation)}
              style={{
                top: `${top}px`,
                height: `${height}px`,
                left: '68px',
                right: '8px',
              }}
              className={`absolute overflow-hidden rounded-lg border-l-4 p-2 text-left transition-shadow hover:shadow-md ${STATUS_COLORS[reservation.status]}`}
            >
              <div className="flex items-center justify-between">
                <span className="truncate font-medium">{reservation.guest_name}</span>
                <span className="ml-2 shrink-0 text-xs opacity-75">
                  {reservation.party_size} guests
                </span>
              </div>
              <div className="mt-0.5 text-xs opacity-75">
                {reservation.reservation_time}
                {reservation.table && ` - Table ${reservation.table.table_number}`}
              </div>
              {reservation.special_requests && height > 50 && (
                <div className="mt-1 truncate text-[10px] italic opacity-60">
                  {reservation.special_requests}
                </div>
              )}
            </button>
          ))}

          {/* Current time indicator */}
          {isToday && <CurrentTimeIndicator startHour={startHour} />}
        </div>
      </div>
    </div>
  );
}

function CurrentTimeIndicator({ startHour }: { startHour: number }) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  if (currentHour < startHour) return null;

  const top = (currentHour - startHour) * 64 + (currentMinutes / 60) * 64;

  return (
    <div
      className="pointer-events-none absolute left-16 right-0 flex items-center"
      style={{ top: `${top}px` }}
    >
      <div className="h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-red-500" />
      <div className="flex-1 border-t-2 border-red-500" />
    </div>
  );
}
