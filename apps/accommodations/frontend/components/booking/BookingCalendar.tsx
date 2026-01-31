'use client';

import { useState, useMemo, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import type { DateRange } from 'react-day-picker';
import { addMonths, eachDayOfInterval, parseISO, subDays } from 'date-fns';
import 'react-day-picker/style.css';
import type { BookedRange } from '@/types/property';

interface BookingCalendarProps {
  bookedRanges: BookedRange[];
  minNights: number;
  onDateChange: (range: DateRange | undefined) => void;
}

export default function BookingCalendar({
  bookedRanges,
  minNights,
  onDateChange,
}: BookingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  // Responsive: 2 months on desktop, 1 on mobile
  useEffect(() => {
    const checkWidth = () => {
      setNumberOfMonths(window.innerWidth >= 768 ? 2 : 1);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Convert booked ranges to individual disabled dates
  // IMPORTANT: half-open [) range -- exclude checkout day
  const disabledDates = useMemo(() => {
    const dates: Date[] = [];
    for (const bookedRange of bookedRanges) {
      const from = parseISO(bookedRange.from);
      const to = subDays(parseISO(bookedRange.to), 1); // Exclude checkout day
      if (from <= to) {
        dates.push(...eachDayOfInterval({ start: from, end: to }));
      }
    }
    return dates;
  }, [bookedRanges]);

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    onDateChange(newRange);
  };

  const today = new Date();

  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">Select Dates</h2>
      <div className="booking-calendar border-border bg-background overflow-x-auto rounded-xl border p-2 sm:p-4">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={[{ before: today }, ...disabledDates]}
          excludeDisabled
          min={minNights}
          numberOfMonths={numberOfMonths}
          startMonth={today}
          endMonth={addMonths(today, 12)}
        />
      </div>
      {minNights > 1 && (
        <p className="text-foreground-muted mt-2 text-xs">
          Minimum stay: {minNights} night{minNights !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
