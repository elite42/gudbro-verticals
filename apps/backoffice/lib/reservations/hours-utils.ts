/**
 * Operating Hours Utilities for Reservations
 *
 * Validates reservation times against location operating hours.
 * Checks for blocked slots, holidays, and special closures.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

export interface OperatingHours {
  open: string; // HH:mm format
  close: string; // HH:mm format
  isClosed: boolean;
}

export interface DayHours {
  open?: string;
  close?: string;
  closed?: boolean;
}

export interface WeeklyHours {
  mon?: DayHours;
  tue?: DayHours;
  wed?: DayHours;
  thu?: DayHours;
  fri?: DayHours;
  sat?: DayHours;
  sun?: DayHours;
}

/**
 * Get operating hours for a specific location and date
 * Checks blocked slots first, then reservation settings, then location hours
 */
export async function getOperatingHours(locationId: string, date: string): Promise<OperatingHours> {
  const supabase = getSupabaseAdmin();

  // Check for blocked slot (holiday/closed/private event)
  const { data: blocked } = await supabase
    .from('blocked_slots')
    .select('*')
    .eq('location_id', locationId)
    .eq('block_date', date)
    .or('block_type.eq.full_day,block_type.eq.holiday')
    .maybeSingle();

  if (blocked) {
    return { open: '', close: '', isClosed: true };
  }

  // Get reservation settings or location hours
  const { data: settings } = await supabase
    .from('reservation_settings')
    .select('reservation_hours')
    .eq('location_id', locationId)
    .maybeSingle();

  const { data: location } = await supabase
    .from('locations')
    .select('operating_hours')
    .eq('id', locationId)
    .single();

  // Use reservation hours first, then fall back to location hours
  const hours =
    (settings?.reservation_hours as WeeklyHours) || (location?.operating_hours as WeeklyHours);

  if (!hours) {
    // Default hours if not configured
    return { open: '11:00', close: '22:00', isClosed: false };
  }

  // Get day of week abbreviation
  const dayOfWeek = getDayAbbrev(new Date(date));
  const dayHours = hours[dayOfWeek as keyof WeeklyHours];

  if (!dayHours || dayHours.closed) {
    return { open: '', close: '', isClosed: true };
  }

  return {
    open: dayHours.open || '11:00',
    close: dayHours.close || '22:00',
    isClosed: false,
  };
}

/**
 * Check if a time is within operating hours
 */
export function isTimeWithinHours(time: string, hours: OperatingHours): boolean {
  if (hours.isClosed) return false;

  // Parse times for comparison
  const timeMinutes = timeToMinutes(time);
  const openMinutes = timeToMinutes(hours.open);
  const closeMinutes = timeToMinutes(hours.close);

  // Handle overnight hours (close after midnight)
  if (closeMinutes < openMinutes) {
    return timeMinutes >= openMinutes || timeMinutes < closeMinutes;
  }

  return timeMinutes >= openMinutes && timeMinutes < closeMinutes;
}

/**
 * Get available time slots for a date
 */
export async function getAvailableTimeSlots(
  locationId: string,
  date: string,
  slotDurationMinutes: number = 15
): Promise<string[]> {
  const hours = await getOperatingHours(locationId, date);

  if (hours.isClosed) {
    return [];
  }

  const slots: string[] = [];
  const openMinutes = timeToMinutes(hours.open);
  const closeMinutes = timeToMinutes(hours.close);

  // Handle overnight hours
  const endMinutes = closeMinutes < openMinutes ? closeMinutes + 24 * 60 : closeMinutes;

  for (let m = openMinutes; m < endMinutes; m += slotDurationMinutes) {
    const normalizedMinutes = m % (24 * 60);
    slots.push(minutesToTime(normalizedMinutes));
  }

  return slots;
}

/**
 * Check if a specific time slot is blocked
 */
export async function isSlotBlocked(
  locationId: string,
  date: string,
  time: string,
  sectionId?: string,
  tableId?: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('blocked_slots')
    .select('id')
    .eq('location_id', locationId)
    .eq('block_date', date);

  // Check for time-specific blocks
  if (time) {
    query = query.or(`start_time.is.null,start_time.lte.${time}`);
    query = query.or(`end_time.is.null,end_time.gt.${time}`);
  }

  // Check section-specific blocks
  if (sectionId) {
    query = query.or(`section_id.is.null,section_id.eq.${sectionId}`);
  }

  // Check table-specific blocks
  if (tableId) {
    query = query.or(`table_id.is.null,table_id.eq.${tableId}`);
  }

  const { data } = await query.limit(1);

  return (data?.length ?? 0) > 0;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get day of week abbreviation (mon, tue, wed, etc.)
 */
function getDayAbbrev(date: Date): string {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[date.getDay()];
}

/**
 * Convert HH:mm time to minutes since midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to HH:mm format
 */
function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
