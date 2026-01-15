'use client';

import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react';
import { format, addMonths, addWeeks, addDays, subMonths, subWeeks, subDays } from 'date-fns';

export type ViewMode = 'day' | 'week' | 'month';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onDateChange: (date: Date) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onCreateReservation?: () => void;
}

const VIEW_LABELS: Record<ViewMode, string> = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
};

export function CalendarHeader({
  currentDate,
  viewMode,
  onDateChange,
  onViewModeChange,
  onCreateReservation,
}: CalendarHeaderProps) {
  const navigate = (direction: 'prev' | 'next') => {
    let newDate: Date;
    if (viewMode === 'month') {
      newDate = direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1);
    } else if (viewMode === 'week') {
      newDate = direction === 'next' ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1);
    } else {
      newDate = direction === 'next' ? addDays(currentDate, 1) : subDays(currentDate, 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const getTitle = () => {
    if (viewMode === 'month') {
      return format(currentDate, 'MMMM yyyy');
    } else if (viewMode === 'week') {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${format(weekStart, 'd')} - ${format(weekEnd, 'd MMMM yyyy')}`;
      }
      return `${format(weekStart, 'd MMM')} - ${format(weekEnd, 'd MMM yyyy')}`;
    } else {
      return format(currentDate, 'EEEE, d MMMM yyyy');
    }
  };

  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left side - Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={goToToday}
          className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Calendar className="h-4 w-4" />
          Today
        </button>

        <div className="flex items-center">
          <button
            onClick={() => navigate('prev')}
            className="rounded-lg p-1.5 hover:bg-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="rounded-lg p-1.5 hover:bg-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <h2 className="ml-2 text-lg font-bold text-gray-900">{getTitle()}</h2>
      </div>

      {/* Right side - View mode and actions */}
      <div className="flex items-center gap-3">
        {/* View mode toggle */}
        <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-0.5">
          {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {VIEW_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* Create reservation button */}
        {onCreateReservation && (
          <button
            onClick={onCreateReservation}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" />
            New Reservation
          </button>
        )}
      </div>
    </div>
  );
}
