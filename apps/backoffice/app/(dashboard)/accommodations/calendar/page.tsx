'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
  isBefore,
} from 'date-fns';
import { CalendarDots, SpinnerGap, Bed } from '@phosphor-icons/react';

import AvailabilityCalendar, {
  type CalendarDay,
} from '@/components/accommodations/AvailabilityCalendar';
import CalendarDetailPanel from '@/components/accommodations/CalendarDetailPanel';
import SeasonalPricingManager from '@/components/accommodations/SeasonalPricingManager';
import DiscountSettings from '@/components/accommodations/DiscountSettings';
import GanttCalendar from '@/components/accommodations/GanttCalendar';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Room {
  id: string;
  room_number: string;
  room_type: string;
  base_price_per_night: number;
  currency: string;
  is_active: boolean;
}

interface Property {
  id: string;
  name: string;
  weekly_discount_percent: number;
  monthly_discount_percent: number;
}

interface CalendarBooking {
  id: string;
  check_in_date: string;
  check_out_date: string;
  guest_name: string;
  status: string;
  room_id: string;
}

interface CalendarBlock {
  id: string;
  room_id: string;
  date_from: string;
  date_to: string;
  reason: string;
  notes: string | null;
}

interface CalendarPricing {
  id: string;
  room_id: string;
  date_from: string;
  date_to: string;
  price_per_night: number;
  label: string | null;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';
const AUTH_HEADERS = { Authorization: `Bearer ${ADMIN_API_KEY}` };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CalendarPricingPage() {
  // State
  const [calendarView, setCalendarView] = useState<'monthly' | 'timeline'>('monthly');
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Timeline-specific state
  const [timelineBookings, setTimelineBookings] = useState<
    {
      id: string;
      guest_name: string;
      guest_last_name: string;
      status: string;
      check_in_date: string;
      check_out_date: string;
      room_id: string;
    }[]
  >([]);
  const [loadingTimeline, setLoadingTimeline] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [property, setProperty] = useState<Property | null>(null);
  const [bookings, setBookings] = useState<CalendarBooking[]>([]);
  const [blocks, setBlocks] = useState<CalendarBlock[]>([]);
  const [seasonalPricing, setSeasonalPricing] = useState<CalendarPricing[]>([]);

  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingCalendar, setLoadingCalendar] = useState(true);
  const [loadingProperty, setLoadingProperty] = useState(true);

  // Derived: current room's base price and currency
  const activeRooms = useMemo(() => rooms.filter((r) => r.is_active), [rooms]);
  const selectedRoom = useMemo(
    () => activeRooms.find((r) => r.id === selectedRoomId) || null,
    [activeRooms, selectedRoomId]
  );
  const basePricePerNight =
    selectedRoom?.base_price_per_night ?? activeRooms[0]?.base_price_per_night ?? 0;
  const currency = selectedRoom?.currency ?? activeRooms[0]?.currency ?? 'USD';

  // ---- Fetch rooms ----
  useEffect(() => {
    if (!PROPERTY_ID) {
      setLoadingRooms(false);
      return;
    }

    async function fetchRooms() {
      try {
        const res = await fetch(`/api/accommodations/rooms?propertyId=${PROPERTY_ID}`, {
          headers: AUTH_HEADERS,
        });
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        const data = await res.json();
        setRooms(data.rooms || []);
      } catch (err) {
        console.error('[CalendarPage] rooms fetch error:', err);
      } finally {
        setLoadingRooms(false);
      }
    }

    fetchRooms();
  }, []);

  // ---- Fetch property ----
  const fetchProperty = useCallback(async () => {
    if (!PROPERTY_ID) {
      setLoadingProperty(false);
      return;
    }

    try {
      const res = await fetch(`/api/accommodations/property?propertyId=${PROPERTY_ID}`, {
        headers: AUTH_HEADERS,
      });
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      const data = await res.json();
      setProperty(data.property || null);
    } catch (err) {
      console.error('[CalendarPage] property fetch error:', err);
    } finally {
      setLoadingProperty(false);
    }
  }, []);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  // ---- Fetch calendar data ----
  const fetchCalendar = useCallback(async () => {
    if (!PROPERTY_ID) {
      setLoadingCalendar(false);
      return;
    }

    setLoadingCalendar(true);
    try {
      const monthStr = format(currentMonth, 'yyyy-MM');
      const params = new URLSearchParams({ propertyId: PROPERTY_ID, month: monthStr });
      if (selectedRoomId) params.set('roomId', selectedRoomId);

      const res = await fetch(`/api/accommodations/calendar?${params}`, {
        headers: AUTH_HEADERS,
      });
      if (!res.ok) throw new Error(`Failed (${res.status})`);

      const data = await res.json();
      setBookings(data.bookings || []);
      setBlocks(data.blocks || []);
      setSeasonalPricing(data.seasonalPricing || []);
    } catch (err) {
      console.error('[CalendarPage] calendar fetch error:', err);
    } finally {
      setLoadingCalendar(false);
    }
  }, [currentMonth, selectedRoomId]);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  // ---- Fetch timeline bookings (for Gantt view) ----
  const fetchTimelineBookings = useCallback(async (dateFrom: string, dateTo: string) => {
    if (!PROPERTY_ID) return;
    setLoadingTimeline(true);
    try {
      const params = new URLSearchParams({ propertyId: PROPERTY_ID, dateFrom, dateTo });
      const res = await fetch(`/api/accommodations/bookings?${params}`, {
        headers: AUTH_HEADERS,
      });
      if (!res.ok) throw new Error(`Failed (${res.status})`);
      const data = await res.json();
      // Map API response to GanttBooking shape
      setTimelineBookings(
        (data.bookings || []).map((b: Record<string, unknown>) => ({
          id: b.id as string,
          guest_name: b.guest_name as string,
          guest_last_name: b.guest_last_name as string,
          status: b.status as string,
          check_in_date: b.check_in_date as string,
          check_out_date: b.check_out_date as string,
          room_id: (b.room as { id: string } | null)?.id || '',
        }))
      );
    } catch (err) {
      console.error('[CalendarPage] timeline bookings fetch error:', err);
    } finally {
      setLoadingTimeline(false);
    }
  }, []);

  // Fetch timeline bookings when the Gantt reports its date range
  const handleDateRangeChange = useCallback(
    (dateFrom: string, dateTo: string) => {
      fetchTimelineBookings(dateFrom, dateTo);
    },
    [fetchTimelineBookings]
  );

  // Map rooms to GanttRoom shape
  const ganttRooms = useMemo(
    () =>
      activeRooms.map((r) => ({
        id: r.id,
        room_number: r.room_number,
        room_type: r.room_type,
        floor: null,
      })),
    [activeRooms]
  );

  // ---- Transform data into CalendarDay[] ----
  const days: CalendarDay[] = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const allDates = eachDayOfInterval({ start: gridStart, end: gridEnd });

    const totalRoomCount = selectedRoomId ? 1 : activeRooms.length;

    return allDates.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const isCurrentMonth =
        date.getMonth() === currentMonth.getMonth() &&
        date.getFullYear() === currentMonth.getFullYear();
      const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');

      // Find bookings covering this date (half-open: check_in <= date < check_out)
      const dayBookings = bookings.filter((b) => {
        return dateStr >= b.check_in_date && dateStr < b.check_out_date;
      });

      // Find blocks covering this date (half-open: date_from <= date < date_to)
      const dayBlocks = blocks.filter((b) => {
        return dateStr >= b.date_from && dateStr < b.date_to;
      });

      // Find seasonal pricing covering this date
      const dayPricing = seasonalPricing.find((p) => {
        return dateStr >= p.date_from && dateStr < p.date_to;
      });

      // Determine status (priority: blocked > booked > partial > available)
      let status: CalendarDay['status'] = 'available';
      if (dayBlocks.length > 0) {
        status = 'blocked';
      } else if (dayBookings.length > 0) {
        if (totalRoomCount > 1 && dayBookings.length < totalRoomCount) {
          status = 'partial';
        } else {
          status = 'booked';
        }
      }

      return {
        date,
        dateStr,
        isCurrentMonth,
        isToday,
        status,
        pricePerNight: dayPricing?.price_per_night ?? null,
        priceLabel: dayPricing?.label ?? null,
        bookings: dayBookings.map((b) => ({
          id: b.id,
          guest_name: b.guest_name,
          status: b.status,
          room_id: b.room_id,
        })),
        blocks: dayBlocks.map((b) => ({
          id: b.id,
          reason: b.reason,
          notes: b.notes,
        })),
      };
    });
  }, [currentMonth, bookings, blocks, seasonalPricing, activeRooms.length, selectedRoomId]);

  // ---- Handlers ----

  const handleBlock = async (dateFrom: string, dateTo: string, reason: string, notes: string) => {
    if (!selectedRoomId) {
      alert('Please select a specific room to block dates.');
      return;
    }

    // dateTo for the API is exclusive (half-open), so add 1 day
    const toDate = parseISO(dateTo);
    const nextDay = new Date(toDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const dateToExclusive = format(nextDay, 'yyyy-MM-dd');

    const res = await fetch('/api/accommodations/room-blocks', {
      method: 'POST',
      headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId: PROPERTY_ID,
        roomId: selectedRoomId,
        dateFrom,
        dateTo: dateToExclusive,
        reason,
        notes: notes || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Failed to block dates');
      return;
    }

    // Clear range selection and refetch
    setRangeStart(null);
    setRangeEnd(null);
    await fetchCalendar();
  };

  const handleUnblock = async (blockId: string) => {
    const res = await fetch('/api/accommodations/room-blocks', {
      method: 'DELETE',
      headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: blockId, propertyId: PROPERTY_ID }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Failed to remove block');
      return;
    }

    await fetchCalendar();
  };

  const handleDiscountSave = async (weekly: number, monthly: number) => {
    const res = await fetch('/api/accommodations/property', {
      method: 'PUT',
      headers: { ...AUTH_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: PROPERTY_ID,
        weekly_discount_percent: weekly,
        monthly_discount_percent: monthly,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Failed to save discounts');
      return;
    }

    await fetchProperty();
  };

  const handleRangeSelect = (start: string, end: string | null) => {
    setRangeStart(start);
    setRangeEnd(end);
  };

  // ---- Selected day data ----
  const selectedDay = useMemo(() => {
    if (!selectedDate) return null;
    return days.find((d) => d.dateStr === selectedDate) || null;
  }, [selectedDate, days]);

  // ---- Loading ----
  const isLoading = loadingRooms || loadingCalendar || loadingProperty;

  // ---- No property configured ----
  if (!PROPERTY_ID && !isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <Bed size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No accommodation property configured
          </h3>
          <p className="mt-2 text-sm text-gray-500">Contact support to set up your property.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />

      {/* View Toggle + Room Filter */}
      <div className="flex flex-wrap items-center gap-4">
        {/* View Toggle */}
        <div className="flex rounded-lg border border-gray-300 bg-gray-50 p-0.5">
          <button
            onClick={() => setCalendarView('monthly')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              calendarView === 'monthly'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setCalendarView('timeline')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              calendarView === 'timeline'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Timeline
          </button>
        </div>

        {/* Room Filter (monthly view only) */}
        {calendarView === 'monthly' && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Room:</label>
            <select
              value={selectedRoomId || ''}
              onChange={(e) => setSelectedRoomId(e.target.value || null)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Rooms</option>
              {activeRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.room_number} ({room.room_type})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <SpinnerGap size={24} className="animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-gray-600">Loading calendar...</span>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {calendarView === 'timeline' ? (
            /* ---- Timeline / Gantt View ---- */
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <GanttCalendar
                rooms={ganttRooms}
                bookings={timelineBookings}
                loading={loadingTimeline}
                onDateRangeChange={handleDateRangeChange}
              />
            </div>
          ) : (
            /* ---- Monthly View (existing) ---- */
            <>
              {/* Calendar + Detail Panel */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Calendar (2/3 width on desktop) */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:col-span-2">
                  <AvailabilityCalendar
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                    days={days}
                    selectedDate={selectedDate}
                    onDateClick={setSelectedDate}
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    onRangeSelect={handleRangeSelect}
                    basePricePerNight={basePricePerNight}
                    currency={currency}
                  />
                </div>

                {/* Detail Panel (1/3 width on desktop) */}
                <div>
                  {selectedDay ? (
                    <CalendarDetailPanel
                      selectedDate={selectedDate!}
                      day={selectedDay}
                      rangeStart={rangeStart}
                      rangeEnd={rangeEnd}
                      onBlock={handleBlock}
                      onUnblock={handleUnblock}
                      loading={loadingCalendar}
                      currency={currency}
                      basePricePerNight={basePricePerNight}
                    />
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                      <CalendarDots size={32} className="mx-auto text-gray-300" weight="duotone" />
                      <p className="mt-2 text-sm text-gray-400">Select a date to view details</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Seasonal Pricing */}
              <SeasonalPricingManager
                propertyId={PROPERTY_ID}
                roomId={selectedRoomId}
                currency={currency}
                onRefresh={fetchCalendar}
              />

              {/* Discount Settings */}
              {property && (
                <DiscountSettings
                  propertyId={PROPERTY_ID}
                  weeklyDiscount={property.weekly_discount_percent ?? 0}
                  monthlyDiscount={property.monthly_discount_percent ?? 0}
                  basePricePerNight={basePricePerNight}
                  currency={currency}
                  onSave={handleDiscountSave}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header sub-component
// ---------------------------------------------------------------------------

function Header() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/accommodations/bookings" className="hover:text-gray-700">
          Accommodations
        </Link>
        <span>/</span>
        <span>Calendar & Pricing</span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <CalendarDots size={28} weight="duotone" className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Calendar & Pricing</h1>
      </div>
      <p className="mt-1 text-gray-600">
        Manage availability, block dates, set seasonal pricing, and configure discounts.
      </p>
    </div>
  );
}
