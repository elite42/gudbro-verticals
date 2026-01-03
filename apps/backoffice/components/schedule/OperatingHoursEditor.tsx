'use client';

import { useState, useCallback } from 'react';

// Types
export interface DayHours {
  open: string;
  close: string;
}

export interface OperatingHours {
  mon: DayHours | null;
  tue: DayHours | null;
  wed: DayHours | null;
  thu: DayHours | null;
  fri: DayHours | null;
  sat: DayHours | null;
  sun: DayHours | null;
}

type DayKey = keyof OperatingHours;

interface OperatingHoursEditorProps {
  value: OperatingHours;
  onChange: (hours: OperatingHours) => void;
  disabled?: boolean;
}

const DAYS: { key: DayKey; label: string; shortLabel: string }[] = [
  { key: 'mon', label: 'Monday', shortLabel: 'Mon' },
  { key: 'tue', label: 'Tuesday', shortLabel: 'Tue' },
  { key: 'wed', label: 'Wednesday', shortLabel: 'Wed' },
  { key: 'thu', label: 'Thursday', shortLabel: 'Thu' },
  { key: 'fri', label: 'Friday', shortLabel: 'Fri' },
  { key: 'sat', label: 'Saturday', shortLabel: 'Sat' },
  { key: 'sun', label: 'Sunday', shortLabel: 'Sun' },
];

const DEFAULT_HOURS: DayHours = { open: '09:00', close: '22:00' };

// Generate time options in 30-minute increments
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
});

export function OperatingHoursEditor({
  value,
  onChange,
  disabled = false,
}: OperatingHoursEditorProps) {
  const [copySource, setCopySource] = useState<DayKey | null>(null);

  const toggleDay = useCallback(
    (day: DayKey) => {
      const newHours = { ...value };
      if (newHours[day]) {
        newHours[day] = null;
      } else {
        newHours[day] = { ...DEFAULT_HOURS };
      }
      onChange(newHours);
    },
    [value, onChange]
  );

  const updateDayHours = useCallback(
    (day: DayKey, field: 'open' | 'close', time: string) => {
      if (!value[day]) return;
      const newHours = { ...value };
      newHours[day] = { ...value[day]!, [field]: time };
      onChange(newHours);
    },
    [value, onChange]
  );

  const copyToAll = useCallback(
    (sourceDay: DayKey) => {
      const sourceHours = value[sourceDay];
      if (!sourceHours) return;

      const newHours = { ...value };
      DAYS.forEach(({ key }) => {
        if (key !== sourceDay) {
          newHours[key] = { ...sourceHours };
        }
      });
      onChange(newHours);
      setCopySource(null);
    },
    [value, onChange]
  );

  const copyToWeekdays = useCallback(
    (sourceDay: DayKey) => {
      const sourceHours = value[sourceDay];
      if (!sourceHours) return;

      const weekdays: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
      const newHours = { ...value };
      weekdays.forEach((key) => {
        newHours[key] = { ...sourceHours };
      });
      onChange(newHours);
      setCopySource(null);
    },
    [value, onChange]
  );

  const setAllClosed = useCallback(() => {
    const newHours: OperatingHours = {
      mon: null,
      tue: null,
      wed: null,
      thu: null,
      fri: null,
      sat: null,
      sun: null,
    };
    onChange(newHours);
  }, [onChange]);

  const setTypicalRestaurant = useCallback(() => {
    const newHours: OperatingHours = {
      mon: null, // Closed Monday (typical for restaurants)
      tue: { open: '12:00', close: '22:00' },
      wed: { open: '12:00', close: '22:00' },
      thu: { open: '12:00', close: '22:00' },
      fri: { open: '12:00', close: '23:00' },
      sat: { open: '12:00', close: '23:00' },
      sun: { open: '12:00', close: '21:00' },
    };
    onChange(newHours);
  }, [onChange]);

  const setTypicalCafe = useCallback(() => {
    const newHours: OperatingHours = {
      mon: { open: '07:00', close: '19:00' },
      tue: { open: '07:00', close: '19:00' },
      wed: { open: '07:00', close: '19:00' },
      thu: { open: '07:00', close: '19:00' },
      fri: { open: '07:00', close: '19:00' },
      sat: { open: '08:00', close: '18:00' },
      sun: { open: '08:00', close: '18:00' },
    };
    onChange(newHours);
  }, [onChange]);

  return (
    <div className="space-y-4">
      {/* Quick presets */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={setTypicalRestaurant}
          disabled={disabled}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Typical Restaurant
        </button>
        <button
          type="button"
          onClick={setTypicalCafe}
          disabled={disabled}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Typical Cafe
        </button>
        <button
          type="button"
          onClick={setAllClosed}
          disabled={disabled}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          All Closed
        </button>
      </div>

      {/* Days grid */}
      <div className="space-y-2">
        {DAYS.map(({ key, label, shortLabel }) => (
          <div
            key={key}
            className={`flex items-center gap-4 rounded-lg border p-3 transition-colors ${
              value[key] ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}
          >
            {/* Day toggle */}
            <button
              type="button"
              onClick={() => toggleDay(key)}
              disabled={disabled}
              className={`flex h-10 w-24 items-center justify-center rounded-lg font-medium transition-colors ${
                value[key]
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{shortLabel}</span>
            </button>

            {/* Time pickers or closed label */}
            {value[key] ? (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500">Open</label>
                  <select
                    value={value[key]!.open}
                    onChange={(e) => updateDayHours(key, 'open', e.target.value)}
                    disabled={disabled}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-gray-400">-</span>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500">Close</label>
                  <select
                    value={value[key]!.close}
                    onChange={(e) => updateDayHours(key, 'close', e.target.value)}
                    disabled={disabled}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Copy dropdown */}
                <div className="relative ml-auto">
                  {copySource === key ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => copyToWeekdays(key)}
                        disabled={disabled}
                        className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200"
                      >
                        Weekdays
                      </button>
                      <button
                        type="button"
                        onClick={() => copyToAll(key)}
                        disabled={disabled}
                        className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200"
                      >
                        All days
                      </button>
                      <button
                        type="button"
                        onClick={() => setCopySource(null)}
                        className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCopySource(key)}
                      disabled={disabled}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Copy to...
                    </button>
                  )}
                </div>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-500">Closed</span>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-lg bg-blue-50 p-4">
        <h4 className="font-medium text-blue-900">Summary</h4>
        <div className="mt-2 text-sm text-blue-700">
          {DAYS.filter(({ key }) => value[key]).length === 0 ? (
            <p>Currently set to closed all days</p>
          ) : (
            <ul className="space-y-1">
              {DAYS.filter(({ key }) => value[key]).map(({ key, label }) => (
                <li key={key}>
                  <span className="font-medium">{label}:</span> {value[key]!.open} -{' '}
                  {value[key]!.close}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Default empty hours
export const EMPTY_OPERATING_HOURS: OperatingHours = {
  mon: null,
  tue: null,
  wed: null,
  thu: null,
  fri: null,
  sat: null,
  sun: null,
};

export default OperatingHoursEditor;
