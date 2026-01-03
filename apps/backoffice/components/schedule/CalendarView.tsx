'use client';

import { useState, useMemo } from 'react';
import { Event, EVENT_TYPE_CONFIG } from '@/lib/events-service';
import { ScheduleOverride, OperatingHours } from '@/lib/calendar-service';

// ===========================================
// Types
// ===========================================

type CalendarViewMode = 'month' | 'week' | 'day';

interface DaySchedule {
  date: string;
  dayOfWeek: number;
  isOpen: boolean;
  hours: { open: string; close: string } | null;
  override?: ScheduleOverride;
  events: Event[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

interface CalendarViewProps {
  locationId: string;
  events: Event[];
  overrides: ScheduleOverride[];
  operatingHours: OperatingHours;
  onDateClick?: (date: string) => void;
  onEventClick?: (event: Event) => void;
  onOverrideClick?: (override: ScheduleOverride) => void;
  onCreateEvent?: (date: string) => void;
}

// ===========================================
// Helper Functions
// ===========================================

const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
const DAYS_FULL = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'];
const MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const DAY_KEY_MAP: Record<number, string> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Add days from previous month to fill first week
  const startDayOfWeek = firstDay.getDay();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    days.push(date);
  }

  // Add days of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  // Add days from next month to complete last week
  const remainingDays = 7 - (days.length % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
  }

  return days;
}

function getDaysInWeek(date: Date): Date[] {
  const days: Date[] = [];
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }

  return days;
}

function isDateInRange(date: string, start: string, end: string | null): boolean {
  if (!end) return date === start;
  return date >= start && date <= end;
}

// ===========================================
// Override Type Config
// ===========================================

const OVERRIDE_TYPE_CONFIG: Record<
  string,
  { label: string; color: string; bgColor: string; icon: string }
> = {
  holiday: {
    label: 'Festività',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    icon: '🎄',
  },
  seasonal: {
    label: 'Stagionale',
    color: 'text-teal-700',
    bgColor: 'bg-teal-100',
    icon: '🌞',
  },
  closure: {
    label: 'Chiusura',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    icon: '🔒',
  },
  special: {
    label: 'Speciale',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    icon: '⭐',
  },
  event: {
    label: 'Evento',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    icon: '🎉',
  },
};

// ===========================================
// Sub-Components
// ===========================================

interface MonthViewProps {
  days: DaySchedule[];
  onDateClick?: (date: string) => void;
  onEventClick?: (event: Event) => void;
  onOverrideClick?: (override: ScheduleOverride) => void;
}

function MonthView({ days, onDateClick, onEventClick, onOverrideClick }: MonthViewProps) {
  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {/* Header */}
      {DAYS_SHORT.map((day) => (
        <div
          key={day}
          className="bg-gray-50 px-2 py-3 text-center text-xs font-medium text-gray-500"
        >
          {day}
        </div>
      ))}

      {/* Days */}
      {days.map((day) => (
        <div
          key={day.date}
          onClick={() => onDateClick?.(day.date)}
          className={`min-h-[100px] bg-white p-1 transition-colors hover:bg-gray-50 ${
            !day.isCurrentMonth ? 'bg-gray-50' : ''
          } ${day.isToday ? 'ring-2 ring-inset ring-blue-500' : ''} cursor-pointer`}
        >
          {/* Date number */}
          <div className="mb-1 flex items-center justify-between">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                day.isToday
                  ? 'bg-blue-600 font-bold text-white'
                  : day.isCurrentMonth
                    ? 'text-gray-900'
                    : 'text-gray-400'
              }`}
            >
              {new Date(day.date).getDate()}
            </span>

            {/* Open/Closed indicator */}
            {day.isCurrentMonth && (
              <span
                className={`h-2 w-2 rounded-full ${day.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
                title={day.isOpen ? 'Aperto' : 'Chiuso'}
              />
            )}
          </div>

          {/* Hours */}
          {day.isCurrentMonth && day.hours && !day.override?.is_closed && (
            <div className="mb-1 text-[10px] text-gray-500">
              {day.hours.open} - {day.hours.close}
            </div>
          )}

          {/* Override badge */}
          {day.override && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOverrideClick?.(day.override!);
              }}
              className={`mb-1 w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium ${
                OVERRIDE_TYPE_CONFIG[day.override.override_type]?.bgColor || 'bg-gray-100'
              } ${OVERRIDE_TYPE_CONFIG[day.override.override_type]?.color || 'text-gray-700'}`}
            >
              {day.override.is_closed ? '🔒 ' : ''}
              {day.override.name}
            </button>
          )}

          {/* Events */}
          <div className="space-y-0.5">
            {day.events.slice(0, 2).map((event) => {
              const typeConfig = EVENT_TYPE_CONFIG[event.event_type];
              return (
                <button
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick?.(event);
                  }}
                  className={`w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium ${typeConfig?.color || 'bg-gray-100 text-gray-700'}`}
                >
                  {typeConfig?.icon} {event.title}
                </button>
              );
            })}
            {day.events.length > 2 && (
              <div className="text-[10px] text-gray-500">+{day.events.length - 2} altri</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface WeekViewProps {
  days: DaySchedule[];
  onDateClick?: (date: string) => void;
  onEventClick?: (event: Event) => void;
  onOverrideClick?: (override: ScheduleOverride) => void;
}

function WeekView({ days, onDateClick, onEventClick, onOverrideClick }: WeekViewProps) {
  // Hours from 6am to midnight
  const hours = Array.from({ length: 19 }, (_, i) => i + 6);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="w-16" /> {/* Time column */}
        {days.map((day) => (
          <div
            key={day.date}
            onClick={() => onDateClick?.(day.date)}
            className={`cursor-pointer border-l border-gray-200 p-2 text-center hover:bg-gray-50 ${
              day.isToday ? 'bg-blue-50' : ''
            }`}
          >
            <div className="text-xs text-gray-500">{DAYS_SHORT[day.dayOfWeek]}</div>
            <div
              className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full text-lg ${
                day.isToday ? 'bg-blue-600 font-bold text-white' : 'text-gray-900'
              }`}
            >
              {new Date(day.date).getDate()}
            </div>
            <div className="mt-1">
              <span
                className={`inline-block h-2 w-2 rounded-full ${day.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* All-day events row */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="flex w-16 items-center justify-end pr-2 text-xs text-gray-500">
          Tutto il giorno
        </div>
        {days.map((day) => (
          <div key={day.date} className="min-h-[40px] border-l border-gray-200 p-1">
            {/* Override */}
            {day.override && (
              <button
                onClick={() => onOverrideClick?.(day.override!)}
                className={`mb-1 w-full truncate rounded px-1 py-0.5 text-left text-xs font-medium ${
                  OVERRIDE_TYPE_CONFIG[day.override.override_type]?.bgColor || 'bg-gray-100'
                } ${OVERRIDE_TYPE_CONFIG[day.override.override_type]?.color || 'text-gray-700'}`}
              >
                {day.override.name}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="relative grid grid-cols-8">
          {/* Time labels */}
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
          {days.map((day) => (
            <div key={day.date} className="relative border-l border-gray-200">
              {hours.map((hour) => (
                <div key={hour} className="h-12 border-b border-gray-100 hover:bg-gray-50" />
              ))}

              {/* Events positioned by time */}
              {day.events.map((event) => {
                const startHour = parseInt(event.start_time.split(':')[0]);
                const startMinutes = parseInt(event.start_time.split(':')[1] || '0');
                const endHour = parseInt(event.end_time.split(':')[0]);
                const endMinutes = parseInt(event.end_time.split(':')[1] || '0');

                const top = (startHour - 6) * 48 + (startMinutes / 60) * 48;
                const height = (endHour - startHour) * 48 + ((endMinutes - startMinutes) / 60) * 48;

                const typeConfig = EVENT_TYPE_CONFIG[event.event_type];

                return (
                  <button
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    style={{
                      top: `${top}px`,
                      height: `${Math.max(height, 24)}px`,
                    }}
                    className={`absolute left-1 right-1 overflow-hidden rounded p-1 text-left text-xs ${
                      typeConfig?.color || 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <div className="font-medium">
                      {typeConfig?.icon} {event.title}
                    </div>
                    <div className="text-[10px] opacity-75">
                      {event.start_time} - {event.end_time}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface DayViewProps {
  day: DaySchedule;
  onEventClick?: (event: Event) => void;
  onOverrideClick?: (override: ScheduleOverride) => void;
  onCreateEvent?: (date: string) => void;
}

function DayView({ day, onEventClick, onOverrideClick, onCreateEvent }: DayViewProps) {
  const hours = Array.from({ length: 19 }, (_, i) => i + 6);

  return (
    <div className="flex flex-col">
      {/* Day header */}
      <div className={`border-b border-gray-200 p-4 ${day.isToday ? 'bg-blue-50' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {DAYS_FULL[day.dayOfWeek]} {new Date(day.date).getDate()}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  day.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {day.isOpen ? 'Aperto' : 'Chiuso'}
              </span>
              {day.hours && !day.override?.is_closed && (
                <span className="text-sm text-gray-500">
                  {day.hours.open} - {day.hours.close}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => onCreateEvent?.(day.date)}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white hover:bg-gray-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuovo Evento
          </button>
        </div>

        {/* Override info */}
        {day.override && (
          <button
            onClick={() => onOverrideClick?.(day.override!)}
            className={`mt-3 flex w-full items-center gap-2 rounded-lg p-3 text-left ${
              OVERRIDE_TYPE_CONFIG[day.override.override_type]?.bgColor || 'bg-gray-100'
            }`}
          >
            <span className="text-xl">
              {OVERRIDE_TYPE_CONFIG[day.override.override_type]?.icon}
            </span>
            <div>
              <p
                className={`font-medium ${OVERRIDE_TYPE_CONFIG[day.override.override_type]?.color}`}
              >
                {day.override.name}
              </p>
              <p className="text-xs text-gray-600">
                {day.override.is_closed
                  ? 'Chiusura'
                  : day.override.hours
                    ? `${day.override.hours.open} - ${day.override.hours.close}`
                    : 'Orario modificato'}
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Time grid */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="flex h-16 border-b border-gray-100">
              <div className="w-16 shrink-0 pr-2 text-right text-xs text-gray-500">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="relative flex-1 border-l border-gray-200 hover:bg-gray-50" />
            </div>
          ))}

          {/* Events */}
          {day.events.map((event) => {
            const startHour = parseInt(event.start_time.split(':')[0]);
            const startMinutes = parseInt(event.start_time.split(':')[1] || '0');
            const endHour = parseInt(event.end_time.split(':')[0]);
            const endMinutes = parseInt(event.end_time.split(':')[1] || '0');

            const top = (startHour - 6) * 64 + (startMinutes / 60) * 64;
            const height = (endHour - startHour) * 64 + ((endMinutes - startMinutes) / 60) * 64;

            const typeConfig = EVENT_TYPE_CONFIG[event.event_type];

            return (
              <button
                key={event.id}
                onClick={() => onEventClick?.(event)}
                style={{
                  top: `${top}px`,
                  height: `${Math.max(height, 32)}px`,
                  left: '64px',
                  right: '8px',
                }}
                className={`absolute overflow-hidden rounded-lg p-2 text-left ${
                  typeConfig?.color || 'bg-blue-100 text-blue-700'
                }`}
              >
                <div className="flex items-center gap-2 font-medium">
                  <span>{typeConfig?.icon}</span>
                  <span>{event.title}</span>
                </div>
                <div className="mt-1 text-sm opacity-75">
                  {event.start_time} - {event.end_time}
                </div>
                {event.performer && (
                  <div className="mt-1 text-xs opacity-75">
                    {event.performer.name}
                    {event.performer.genre && ` - ${event.performer.genre}`}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===========================================
// Main Component
// ===========================================

export default function CalendarView({
  events,
  overrides,
  operatingHours,
  onDateClick,
  onEventClick,
  onOverrideClick,
  onCreateEvent,
}: CalendarViewProps) {
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = formatDate(new Date());

  // Calculate days based on view mode
  const days = useMemo(() => {
    let datesToShow: Date[];

    if (viewMode === 'month') {
      datesToShow = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    } else if (viewMode === 'week') {
      datesToShow = getDaysInWeek(currentDate);
    } else {
      datesToShow = [currentDate];
    }

    return datesToShow.map((date) => {
      const dateStr = formatDate(date);
      const dayOfWeek = date.getDay();
      const dayKey = DAY_KEY_MAP[dayOfWeek];

      // Find applicable override
      const override = overrides.find((o) => isDateInRange(dateStr, o.date_start, o.date_end));

      // Get base hours
      const baseHours = operatingHours[dayKey as keyof OperatingHours];

      // Calculate effective hours and open status
      let hours = baseHours;
      let isOpen = !!baseHours;

      if (override) {
        if (override.is_closed) {
          isOpen = false;
          hours = null;
        } else if (override.hours) {
          hours = override.hours;
          isOpen = true;
        }
      }

      // Get events for this day
      const dayEvents = events.filter(
        (e) =>
          e.status === 'published' &&
          isDateInRange(dateStr, e.start_date, e.end_date || e.start_date)
      );

      return {
        date: dateStr,
        dayOfWeek,
        isOpen,
        hours: hours ?? null,
        override,
        events: dayEvents,
        isToday: dateStr === today,
        isCurrentMonth: date.getMonth() === currentDate.getMonth(),
      } as DaySchedule;
    });
  }, [currentDate, viewMode, events, overrides, operatingHours, today]);

  // Navigation
  const navigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Title based on view
  const getTitle = () => {
    if (viewMode === 'month') {
      return `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewMode === 'week') {
      const weekStart = days[0]?.date;
      const weekEnd = days[6]?.date;
      if (weekStart && weekEnd) {
        const startDate = new Date(weekStart);
        const endDate = new Date(weekEnd);
        if (startDate.getMonth() === endDate.getMonth()) {
          return `${startDate.getDate()} - ${endDate.getDate()} ${MONTHS[startDate.getMonth()]} ${startDate.getFullYear()}`;
        }
        return `${startDate.getDate()} ${MONTHS[startDate.getMonth()]} - ${endDate.getDate()} ${MONTHS[endDate.getMonth()]} ${startDate.getFullYear()}`;
      }
    } else {
      return `${new Date(days[0]?.date || '').getDate()} ${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    return '';
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Oggi
          </button>
          <button
            onClick={() => navigate('prev')}
            className="rounded-lg p-1.5 hover:bg-gray-100"
            aria-label="Precedente"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate('next')}
            className="rounded-lg p-1.5 hover:bg-gray-100"
            aria-label="Successivo"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h2 className="ml-4 text-lg font-bold text-gray-900">{getTitle()}</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-0.5">
            {(['day', 'week', 'month'] as CalendarViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode === 'day' ? 'Giorno' : mode === 'week' ? 'Settimana' : 'Mese'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar content */}
      <div className="overflow-auto">
        {viewMode === 'month' && (
          <MonthView
            days={days}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
            onOverrideClick={onOverrideClick}
          />
        )}
        {viewMode === 'week' && (
          <WeekView
            days={days}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
            onOverrideClick={onOverrideClick}
          />
        )}
        {viewMode === 'day' && days[0] && (
          <DayView
            day={days[0]}
            onEventClick={onEventClick}
            onOverrideClick={onOverrideClick}
            onCreateEvent={onCreateEvent}
          />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs">
        <span className="font-medium text-gray-700">Legenda:</span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Aperto
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          Chiuso
        </span>
        {Object.entries(OVERRIDE_TYPE_CONFIG).map(([key, config]) => (
          <span key={key} className="flex items-center gap-1">
            <span className={`rounded px-1 py-0.5 ${config.bgColor} ${config.color}`}>
              {config.icon}
            </span>
            {config.label}
          </span>
        ))}
      </div>
    </div>
  );
}
