/**
 * Schedule Service for PWA
 *
 * Fetches operating hours and schedule overrides from Supabase
 * to display open/closed status to customers.
 */

import { supabase, isSupabaseConfigured } from './supabase';

// ===========================================
// Types
// ===========================================

export interface OperatingHours {
  [day: string]: { open: string; close: string } | null;
}

export interface ScheduleOverride {
  id: string;
  location_id: string;
  override_type: string;
  name: string;
  description: string | null;
  date_start: string;
  date_end: string | null;
  recurrence: string;
  is_closed: boolean;
  hours: { open: string; close: string } | null;
  priority: number;
}

export interface LocationSchedule {
  operatingHours: OperatingHours;
  overrides: ScheduleOverride[];
  timezone?: string;
}

export interface OpenStatus {
  isOpen: boolean;
  reason?: string;
  hours?: { open: string; close: string };
  nextChange?: string;
}

// ===========================================
// Default Hours (fallback when DB not available)
// ===========================================

export const DEFAULT_OPERATING_HOURS: OperatingHours = {
  mon: { open: '07:00', close: '21:00' },
  tue: { open: '07:00', close: '21:00' },
  wed: { open: '07:00', close: '21:00' },
  thu: { open: '07:00', close: '21:00' },
  fri: { open: '07:00', close: '21:00' },
  sat: { open: '08:00', close: '22:00' },
  sun: { open: '08:00', close: '22:00' },
};

// ===========================================
// API Functions
// ===========================================

/**
 * Fetch schedule for a location
 */
export async function getLocationSchedule(locationId: string): Promise<LocationSchedule> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      operatingHours: DEFAULT_OPERATING_HOURS,
      overrides: [],
    };
  }

  try {
    // Fetch location with operating hours
    const { data: location, error: locationError } = await supabase
      .from('locations')
      .select('operating_hours, timezone')
      .eq('id', locationId)
      .single();

    if (locationError) {
      console.error('Error fetching location:', locationError);
      return {
        operatingHours: DEFAULT_OPERATING_HOURS,
        overrides: [],
      };
    }

    // Fetch active schedule overrides
    const today = new Date().toISOString().split('T')[0];
    const { data: overrides, error: overridesError } = await supabase
      .from('schedule_overrides')
      .select('*')
      .eq('location_id', locationId)
      .lte('date_start', today)
      .or(`date_end.gte.${today},date_end.is.null`);

    if (overridesError) {
      console.error('Error fetching overrides:', overridesError);
    }

    return {
      operatingHours: (location?.operating_hours as OperatingHours) || DEFAULT_OPERATING_HOURS,
      overrides: overrides || [],
      timezone: location?.timezone || undefined,
    };
  } catch (err) {
    console.error('Failed to fetch schedule:', err);
    return {
      operatingHours: DEFAULT_OPERATING_HOURS,
      overrides: [],
    };
  }
}

/**
 * Check if location is currently open using DB function
 */
export async function checkLocationOpen(locationId: string): Promise<OpenStatus> {
  if (!isSupabaseConfigured || !supabase) {
    // Calculate locally with default hours
    return calculateOpenStatus(DEFAULT_OPERATING_HOURS, []);
  }

  try {
    const { data, error } = await supabase.rpc('is_location_open', {
      p_location_id: locationId,
    });

    if (error) {
      console.error('Error calling is_location_open:', error);
      // Fallback to local calculation
      const schedule = await getLocationSchedule(locationId);
      return calculateOpenStatus(schedule.operatingHours, schedule.overrides);
    }

    return {
      isOpen: data?.is_open || false,
      reason: data?.reason,
      hours: data?.effective_hours?.hours,
    };
  } catch (err) {
    console.error('Failed to check location status:', err);
    return calculateOpenStatus(DEFAULT_OPERATING_HOURS, []);
  }
}

// ===========================================
// Local Calculation (for fallback/demo)
// ===========================================

/**
 * Calculate open status locally
 */
export function calculateOpenStatus(
  operatingHours: OperatingHours,
  overrides: ScheduleOverride[],
  date: Date = new Date()
): OpenStatus {
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const currentDay = dayNames[date.getDay()];
  const todayStr = date.toISOString().split('T')[0];
  const currentTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

  // Check for active override (highest priority wins)
  const activeOverride = overrides
    .filter((o) => {
      const start = o.date_start;
      const end = o.date_end || o.date_start;

      // Check date match
      if (o.recurrence === 'yearly') {
        const overrideMonth = new Date(start).getMonth();
        const overrideDay = new Date(start).getDate();
        return date.getMonth() === overrideMonth && date.getDate() === overrideDay;
      }

      return todayStr >= start && todayStr <= end;
    })
    .sort((a, b) => b.priority - a.priority)[0];

  if (activeOverride) {
    if (activeOverride.is_closed) {
      return {
        isOpen: false,
        reason: activeOverride.name,
      };
    }

    if (activeOverride.hours) {
      const isOpen =
        currentTime >= activeOverride.hours.open && currentTime < activeOverride.hours.close;
      return {
        isOpen,
        reason: activeOverride.name,
        hours: activeOverride.hours,
        nextChange: isOpen
          ? `Closes at ${activeOverride.hours.close}`
          : `Opens at ${activeOverride.hours.open}`,
      };
    }
  }

  // Use base operating hours
  const todayHours = operatingHours[currentDay];

  if (!todayHours) {
    // Find next open day
    let nextDayIndex = (date.getDay() + 1) % 7;
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
        return {
          isOpen: false,
          reason: 'Closed today',
          nextChange:
            daysChecked === 0
              ? `Opens tomorrow at ${nextDayHours.open}`
              : `Opens ${dayDisplayNames[nextDayIndex]} at ${nextDayHours.open}`,
        };
      }
      nextDayIndex = (nextDayIndex + 1) % 7;
      daysChecked++;
    }
    return { isOpen: false, reason: 'Closed' };
  }

  const isOpen = currentTime >= todayHours.open && currentTime < todayHours.close;

  return {
    isOpen,
    hours: todayHours,
    nextChange: isOpen
      ? `Closes at ${todayHours.close}`
      : currentTime < todayHours.open
        ? `Opens at ${todayHours.open}`
        : 'Opens tomorrow',
  };
}
