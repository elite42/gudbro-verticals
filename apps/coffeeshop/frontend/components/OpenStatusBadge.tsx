'use client';

import { useState, useEffect } from 'react';

interface OperatingHours {
  [day: string]: { open: string; close: string } | null;
}

interface OpenStatusBadgeProps {
  operatingHours?: OperatingHours;
  timezone?: string;
  className?: string;
  showHours?: boolean;
}

const DEFAULT_HOURS: OperatingHours = {
  mon: { open: '07:00', close: '21:00' },
  tue: { open: '07:00', close: '21:00' },
  wed: { open: '07:00', close: '21:00' },
  thu: { open: '07:00', close: '21:00' },
  fri: { open: '07:00', close: '21:00' },
  sat: { open: '08:00', close: '22:00' },
  sun: { open: '08:00', close: '22:00' },
};

export function OpenStatusBadge({
  operatingHours = DEFAULT_HOURS,
  timezone = 'Asia/Ho_Chi_Minh',
  className = '',
  showHours = true,
}: OpenStatusBadgeProps) {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    currentDay: string;
    hours: { open: string; close: string } | null;
    nextChange: string;
  }>({
    isOpen: false,
    currentDay: '',
    hours: null,
    nextChange: '',
  });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();

      // Get current day
      const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const currentDay = dayNames[now.getDay()];
      const hours = operatingHours[currentDay];

      if (!hours) {
        setStatus({
          isOpen: false,
          currentDay,
          hours: null,
          nextChange: 'Closed today',
        });
        return;
      }

      // Get current time in HH:MM format
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const isOpen = currentTime >= hours.open && currentTime < hours.close;

      let nextChange = '';
      if (isOpen) {
        nextChange = `Closes at ${hours.close}`;
      } else if (currentTime < hours.open) {
        nextChange = `Opens at ${hours.open}`;
      } else {
        // After closing, find next open day
        let nextDayIndex = (now.getDay() + 1) % 7;
        let daysChecked = 0;
        while (daysChecked < 7) {
          const nextDayName = dayNames[nextDayIndex];
          const nextDayHours = operatingHours[nextDayName];
          if (nextDayHours) {
            const dayDisplayNames = [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ];
            if (daysChecked === 0) {
              nextChange = `Opens tomorrow at ${nextDayHours.open}`;
            } else {
              nextChange = `Opens ${dayDisplayNames[nextDayIndex]} at ${nextDayHours.open}`;
            }
            break;
          }
          nextDayIndex = (nextDayIndex + 1) % 7;
          daysChecked++;
        }
      }

      setStatus({
        isOpen,
        currentDay,
        hours,
        nextChange,
      });
    };

    checkStatus();
    // Update every minute
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [operatingHours]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Status indicator */}
      <div
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
          status.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}
      >
        <div
          className={`h-2 w-2 animate-pulse rounded-full ${
            status.isOpen ? 'bg-green-400' : 'bg-red-400'
          }`}
        />
        <span className="text-sm font-semibold">{status.isOpen ? 'Open Now' : 'Closed'}</span>
      </div>

      {/* Next change info */}
      {showHours && status.nextChange && (
        <span className="text-theme-text-secondary text-sm">{status.nextChange}</span>
      )}
    </div>
  );
}

// Full opening hours display component
export function OpeningHoursDisplay({
  operatingHours = DEFAULT_HOURS,
  className = '',
}: {
  operatingHours?: OperatingHours;
  className?: string;
}) {
  const now = new Date();
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const currentDay = dayNames[now.getDay()];

  const dayDisplayNames: Record<string, string> = {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  };

  // Reorder days starting from Monday
  const orderedDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  return (
    <div className={`space-y-2 ${className}`}>
      {orderedDays.map((day) => {
        const hours = operatingHours[day];
        const isToday = day === currentDay;

        return (
          <div
            key={day}
            className={`flex items-center justify-between rounded-lg px-3 py-2 ${
              isToday ? 'bg-theme-brand-primary/10' : ''
            }`}
          >
            <span
              className={`font-medium ${
                isToday ? 'text-theme-brand-primary' : 'text-theme-text-secondary'
              }`}
            >
              {dayDisplayNames[day]}
              {isToday && (
                <span className="bg-theme-brand-primary ml-2 rounded-full px-2 py-0.5 text-xs text-white">
                  Today
                </span>
              )}
            </span>
            <span
              className={`${
                hours
                  ? isToday
                    ? 'text-theme-brand-primary font-bold'
                    : 'text-theme-text-primary'
                  : 'text-theme-text-tertiary'
              }`}
            >
              {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default OpenStatusBadge;
