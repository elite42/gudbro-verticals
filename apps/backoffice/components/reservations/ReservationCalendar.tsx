'use client';

import { useState, useMemo } from 'react';
import { CalendarHeader, ViewMode } from './CalendarHeader';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { ReservationFilters, ReservationFiltersState, DEFAULT_FILTERS } from './ReservationFilters';
import { ReservationDialog, ReservationFormData } from './ReservationDialog';
import { Reservation, ReservationStatus } from './ReservationCard';

interface Section {
  id: string;
  name: string;
}

interface Table {
  id: string;
  table_number: string;
  min_capacity: number;
  max_capacity: number;
  section_id: string;
}

interface ReservationCalendarProps {
  reservations: Reservation[];
  sections: Section[];
  tables: Table[];
  onCreateReservation: (data: ReservationFormData) => Promise<void>;
  onUpdateReservation: (data: ReservationFormData) => Promise<void>;
  onStatusChange: (id: string, status: ReservationStatus) => Promise<void>;
  isLoading?: boolean;
}

export function ReservationCalendar({
  reservations,
  sections,
  tables,
  onCreateReservation,
  onUpdateReservation,
  onStatusChange,
  isLoading = false,
}: ReservationCalendarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState<ReservationFiltersState>(DEFAULT_FILTERS);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDefaultDate, setDialogDefaultDate] = useState<Date | undefined>();
  const [dialogDefaultTime, setDialogDefaultTime] = useState<string | undefined>();

  // Apply filters to reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      // Status filter
      if (filters.status !== 'all' && r.status !== filters.status) {
        return false;
      }

      // Section filter
      if (filters.sectionId !== 'all' && r.section?.id !== filters.sectionId) {
        return false;
      }

      // Party size filter
      if (filters.partySizeMin !== null && r.party_size < filters.partySizeMin) {
        return false;
      }
      if (filters.partySizeMax !== null && r.party_size > filters.partySizeMax) {
        return false;
      }

      return true;
    });
  }, [reservations, filters]);

  const handleCreateReservation = () => {
    setSelectedReservation(null);
    setDialogDefaultDate(currentDate);
    setDialogDefaultTime(undefined);
    setDialogOpen(true);
  };

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setDialogOpen(true);
  };

  const handleTimeSlotClick = (time: string) => {
    setSelectedReservation(null);
    setDialogDefaultDate(currentDate);
    setDialogDefaultTime(time);
    setDialogOpen(true);
  };

  const handleDateClick = (date: Date) => {
    if (viewMode === 'month') {
      setCurrentDate(date);
      setViewMode('day');
    } else {
      setCurrentDate(date);
    }
  };

  const handleDialogSave = async (data: ReservationFormData) => {
    if (data.id) {
      await onUpdateReservation(data);
    } else {
      await onCreateReservation(data);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onDateChange={setCurrentDate}
        onViewModeChange={setViewMode}
        onCreateReservation={handleCreateReservation}
      />

      {/* Filters */}
      <ReservationFilters filters={filters} onFiltersChange={setFilters} sections={sections} />

      {/* Calendar content */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'day' && (
          <DayView
            date={currentDate}
            reservations={filteredReservations}
            onReservationClick={handleReservationClick}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )}
        {viewMode === 'week' && (
          <WeekView
            date={currentDate}
            reservations={filteredReservations}
            onReservationClick={handleReservationClick}
            onDateClick={handleDateClick}
          />
        )}
        {viewMode === 'month' && (
          <MonthView
            date={currentDate}
            reservations={filteredReservations}
            onReservationClick={handleReservationClick}
            onDateClick={handleDateClick}
          />
        )}
      </div>

      {/* Reservation Dialog */}
      <ReservationDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedReservation(null);
        }}
        onSave={handleDialogSave}
        reservation={selectedReservation}
        defaultDate={dialogDefaultDate}
        defaultTime={dialogDefaultTime}
        sections={sections}
        tables={tables}
        isLoading={isLoading}
      />
    </div>
  );
}
