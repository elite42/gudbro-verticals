'use client';

import { useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Reservation, ReservationStatus } from './ReservationCard';

interface WeekViewProps {
  date: Date;
  reservations: Reservation[];
  onReservationClick?: (reservation: Reservation) => void;
  onDateClick?: (date: Date) => void;
  startHour?: number;
  endHour?: number;
}

const STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  no_show: 'bg-gray-100 text-gray-600',
  seated: 'bg-blue-100 text-blue-800',
  completed: 'bg-gray-50 text-gray-500',
};

const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function WeekView({
  date,
  reservations,
  onReservationClick,
  onDateClick,
  startHour = 10,
  endHour = 23,
}: WeekViewProps) {
  const hours = useMemo(() => {
    return Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
  }, [startHour, endHour]);

  // Get week days starting from Sunday
  const weekDays = useMemo(() => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [date]);

  const today = new Date();

  // Group reservations by day
  const reservationsByDay = useMemo(() => {
    const grouped: Record<string, Reservation[]> = {};
    weekDays.forEach((day) => {
      const dayStr = format(day, 'yyyy-MM-dd');
      grouped[dayStr] = reservations.filter((r) => r.reservation_date === dayStr);
    });
    return grouped;
  }, [reservations, weekDays]);

  return (
    <div className="flex flex-col">
      {/* Header with days */}
      <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
        <div className="w-16 shrink-0" /> {/* Time column spacer */}
        {weekDays.map((day, idx) => {
          const isToday = isSameDay(day, today);
          const dayStr = format(day, 'yyyy-MM-dd');
          const count = reservationsByDay[dayStr]?.length || 0;

          return (
            <div
              key={dayStr}
              onClick={() => onDateClick?.(day)}
              className={`cursor-pointer border-l border-gray-200 p-2 text-center transition-colors hover:bg-gray-100 ${
                isToday ? 'bg-blue-50' : ''
              }`}
            >
              <div className="text-xs font-medium text-gray-500">{DAYS_SHORT[idx]}</div>
              <div
                className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  isToday ? 'bg-blue-600 text-white' : 'text-gray-900'
                }`}
              >
                {format(day, 'd')}
              </div>
              {count > 0 && <div className="mt-1 text-xs text-gray-500">{count} res.</div>}
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="relative grid grid-cols-8">
          {/* Time labels column */}
          <div className="w-16">
            {hours.map((hour) => (
              <div key={hour} className="relative h-12 border-b border-gray-100">
                <span className="absolute -top-2 right-2 text-xs text-gray-500">
                  {hour.toString().padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const dayReservations = reservationsByDay[dayStr] || [];
            const isToday = isSameDay(day, today);

            return (
              <div
                key={dayStr}
                className={`relative border-l border-gray-200 ${isToday ? 'bg-blue-50/30' : ''}`}
              >
                {/* Hour cells */}
                {hours.map((hour) => (
                  <div key={hour} className="h-12 border-b border-gray-100 hover:bg-gray-50" />
                ))}

                {/* Reservations */}
                {dayReservations.map((reservation) => {
                  const [resHour, resMinutes] = reservation.reservation_time.split(':').map(Number);
                  const top = (resHour - startHour) * 48 + (resMinutes / 60) * 48;
                  const height = (reservation.duration_minutes / 60) * 48;

                  return (
                    <button
                      key={reservation.id}
                      onClick={() => onReservationClick?.(reservation)}
                      style={{
                        top: `${Math.max(0, top)}px`,
                        height: `${Math.max(24, height)}px`,
                      }}
                      className={`absolute left-0.5 right-0.5 overflow-hidden rounded px-1 py-0.5 text-left text-[10px] transition-opacity hover:opacity-80 ${STATUS_COLORS[reservation.status]}`}
                    >
                      <div className="truncate font-medium">{reservation.guest_name}</div>
                      <div className="opacity-75">
                        {reservation.reservation_time} · {reservation.party_size}p
                      </div>
                    </button>
                  );
                })}

                {/* Current time indicator */}
                {isToday && <WeekCurrentTimeIndicator startHour={startHour} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WeekCurrentTimeIndicator({ startHour }: { startHour: number }) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  if (currentHour < startHour) return null;

  const top = (currentHour - startHour) * 48 + (currentMinutes / 60) * 48;

  return (
    <div className="pointer-events-none absolute left-0 right-0 z-10" style={{ top: `${top}px` }}>
      <div className="flex items-center">
        <div className="h-2 w-2 -translate-x-1/2 rounded-full bg-red-500" />
        <div className="flex-1 border-t-2 border-red-500" />
      </div>
    </div>
  );
}
