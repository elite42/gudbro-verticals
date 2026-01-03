'use client';

import { useState, useEffect } from 'react';
import {
  getLocationSchedule,
  calculateOpenStatus,
  DEFAULT_OPERATING_HOURS,
  type OperatingHours,
  type ScheduleOverride,
  type OpenStatus,
} from '../lib/schedule-service';

interface OpenStatusBadgeProps {
  locationId?: string;
  operatingHours?: OperatingHours;
  className?: string;
  showHours?: boolean;
}

export function OpenStatusBadge({
  locationId,
  operatingHours: propHours,
  className = '',
  showHours = true,
}: OpenStatusBadgeProps) {
  const [status, setStatus] = useState<OpenStatus>({
    isOpen: false,
    nextChange: '',
  });
  const [hours, setHours] = useState<OperatingHours>(propHours || DEFAULT_OPERATING_HOURS);
  const [overrides, setOverrides] = useState<ScheduleOverride[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load schedule from Supabase if locationId provided
  useEffect(() => {
    const loadSchedule = async () => {
      if (locationId) {
        setIsLoading(true);
        try {
          const schedule = await getLocationSchedule(locationId);
          setHours(schedule.operatingHours);
          setOverrides(schedule.overrides);
        } catch (err) {
          console.error('Failed to load schedule:', err);
        }
        setIsLoading(false);
      } else if (propHours) {
        setHours(propHours);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    loadSchedule();
  }, [locationId, propHours]);

  // Update status every minute
  useEffect(() => {
    const updateStatus = () => {
      const newStatus = calculateOpenStatus(hours, overrides);
      setStatus(newStatus);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [hours, overrides]);

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

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
interface OpeningHoursDisplayProps {
  locationId?: string;
  operatingHours?: OperatingHours;
  className?: string;
}

export function OpeningHoursDisplay({
  locationId,
  operatingHours: propHours,
  className = '',
}: OpeningHoursDisplayProps) {
  const [hours, setHours] = useState<OperatingHours>(propHours || DEFAULT_OPERATING_HOURS);
  const [isLoading, setIsLoading] = useState(!!locationId);

  // Load from Supabase if locationId provided
  useEffect(() => {
    const loadHours = async () => {
      if (locationId) {
        setIsLoading(true);
        try {
          const schedule = await getLocationSchedule(locationId);
          setHours(schedule.operatingHours);
        } catch (err) {
          console.error('Failed to load hours:', err);
        }
        setIsLoading(false);
      } else if (propHours) {
        setHours(propHours);
      }
    };

    loadHours();
  }, [locationId, propHours]);

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

  if (isLoading) {
    return (
      <div className={`space-y-2 ${className}`}>
        {orderedDays.map((day) => (
          <div key={day} className="flex items-center justify-between px-3 py-2">
            <span className="text-theme-text-secondary">{dayDisplayNames[day]}</span>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {orderedDays.map((day) => {
        const dayHours = hours[day];
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
                dayHours
                  ? isToday
                    ? 'text-theme-brand-primary font-bold'
                    : 'text-theme-text-primary'
                  : 'text-theme-text-tertiary'
              }`}
            >
              {dayHours ? `${dayHours.open} - ${dayHours.close}` : 'Closed'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default OpenStatusBadge;
