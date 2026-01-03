import { supabase } from './supabase';
import { Event, getEvents } from './events-service';

// ===========================================
// Types
// ===========================================

export interface ScheduleOverride {
  id: string;
  location_id: string;
  override_type: 'holiday' | 'seasonal' | 'closure' | 'special' | 'event';
  name: string;
  description: string | null;
  date_start: string;
  date_end: string | null;
  recurrence: 'none' | 'yearly' | 'weekly' | 'monthly';
  recurrence_end_date: string | null;
  is_closed: boolean;
  hours: { open: string; close: string } | null;
  priority: number;
  event_id: string | null;
  color: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface OperatingHours {
  mon: { open: string; close: string } | null;
  tue: { open: string; close: string } | null;
  wed: { open: string; close: string } | null;
  thu: { open: string; close: string } | null;
  fri: { open: string; close: string } | null;
  sat: { open: string; close: string } | null;
  sun: { open: string; close: string } | null;
}

export interface DaySchedule {
  date: string;
  isOpen: boolean;
  hours: { open: string; close: string } | null;
  override: ScheduleOverride | null;
  overrideReason: string | null;
  events: Event[];
}

export interface MergedSchedule {
  [date: string]: DaySchedule;
}

export interface CalendarExportOptions {
  locationId: string;
  locationName: string;
  startDate: string;
  endDate: string;
  includeEvents?: boolean;
  includeOverrides?: boolean;
  includeHours?: boolean;
}

// ===========================================
// CRUD Operations - Schedule Overrides
// ===========================================

/**
 * Get all schedule overrides for a location
 */
export async function getScheduleOverrides(
  locationId: string,
  options?: {
    type?: ScheduleOverride['override_type'];
    startDate?: string;
    endDate?: string;
    activeOnly?: boolean;
  }
): Promise<ScheduleOverride[]> {
  let query = supabase
    .from('schedule_overrides')
    .select('*')
    .eq('location_id', locationId)
    .order('date_start', { ascending: true });

  if (options?.type) {
    query = query.eq('override_type', options.type);
  }

  if (options?.startDate) {
    query = query
      .gte('date_end', options.startDate)
      .or(`date_end.is.null,date_start.gte.${options.startDate}`);
  }

  if (options?.endDate) {
    query = query.lte('date_start', options.endDate);
  }

  if (options?.activeOnly !== false) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching schedule overrides:', error);
    return [];
  }

  return data || [];
}

/**
 * Create a new schedule override
 */
export async function createScheduleOverride(
  override: Omit<ScheduleOverride, 'id' | 'created_at' | 'updated_at'>
): Promise<{ success: boolean; data?: ScheduleOverride; error?: string }> {
  const { data, error } = await supabase
    .from('schedule_overrides')
    .insert(override)
    .select()
    .single();

  if (error) {
    console.error('Error creating schedule override:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Update a schedule override
 */
export async function updateScheduleOverride(
  overrideId: string,
  updates: Partial<ScheduleOverride>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('schedule_overrides').update(updates).eq('id', overrideId);

  if (error) {
    console.error('Error updating schedule override:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Delete a schedule override
 */
export async function deleteScheduleOverride(
  overrideId: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('schedule_overrides').delete().eq('id', overrideId);

  if (error) {
    console.error('Error deleting schedule override:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ===========================================
// Merged Schedule
// ===========================================

const DAY_KEY_MAP: Record<number, keyof OperatingHours> = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

/**
 * Check if a date falls within an override (considering recurrence)
 */
function isDateInOverride(dateStr: string, override: ScheduleOverride): boolean {
  const date = new Date(dateStr);
  const startDate = new Date(override.date_start);
  const endDate = override.date_end ? new Date(override.date_end) : null;

  // Check recurrence end
  if (override.recurrence_end_date && dateStr > override.recurrence_end_date) {
    return false;
  }

  switch (override.recurrence) {
    case 'none':
      if (endDate) {
        return dateStr >= override.date_start && dateStr <= override.date_end!;
      }
      return dateStr === override.date_start;

    case 'yearly':
      // Same month and day each year
      return date.getMonth() === startDate.getMonth() && date.getDate() === startDate.getDate();

    case 'weekly':
      // Same day of week each week
      return date.getDay() === startDate.getDay() && dateStr >= override.date_start;

    case 'monthly':
      // Same day of month each month
      return date.getDate() === startDate.getDate() && dateStr >= override.date_start;

    default:
      return false;
  }
}

/**
 * Get merged schedule for a date range
 * Combines: operating hours + overrides + events
 */
export async function getMergedSchedule(
  locationId: string,
  startDate: string,
  endDate: string,
  operatingHours: OperatingHours
): Promise<MergedSchedule> {
  // Fetch overrides and events in parallel
  const [overrides, events] = await Promise.all([
    getScheduleOverrides(locationId, { startDate, endDate, activeOnly: true }),
    getEvents(locationId, { startDate, endDate, status: 'published' }),
  ]);

  const schedule: MergedSchedule = {};
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    const dayOfWeek = current.getDay();
    const dayKey = DAY_KEY_MAP[dayOfWeek];

    // Get base hours
    const baseHours = operatingHours[dayKey];

    // Find applicable overrides, sorted by priority
    const applicableOverrides = overrides
      .filter((o) => isDateInOverride(dateStr, o))
      .sort((a, b) => b.priority - a.priority);

    const highestPriorityOverride = applicableOverrides[0] || null;

    // Calculate effective hours
    let isOpen = !!baseHours;
    let hours = baseHours;
    let overrideReason: string | null = null;

    if (highestPriorityOverride) {
      if (highestPriorityOverride.is_closed) {
        isOpen = false;
        hours = null;
        overrideReason = highestPriorityOverride.name;
      } else if (highestPriorityOverride.hours) {
        hours = highestPriorityOverride.hours;
        isOpen = true;
        overrideReason = highestPriorityOverride.name;
      }
    }

    // Get events for this day
    const dayEvents = events.filter((e) => {
      const eventStart = e.start_date;
      const eventEnd = e.end_date || e.start_date;
      return dateStr >= eventStart && dateStr <= eventEnd;
    });

    schedule[dateStr] = {
      date: dateStr,
      isOpen,
      hours,
      override: highestPriorityOverride,
      overrideReason,
      events: dayEvents,
    };

    current.setDate(current.getDate() + 1);
  }

  return schedule;
}

// ===========================================
// iCal Export
// ===========================================

/**
 * Generate iCal/ICS content for calendar export
 */
export async function generateICalExport(options: CalendarExportOptions): Promise<string> {
  const {
    locationId,
    locationName,
    startDate,
    endDate,
    includeEvents = true,
    includeOverrides = true,
  } = options;

  // Fetch data
  const [overrides, events] = await Promise.all([
    includeOverrides
      ? getScheduleOverrides(locationId, { startDate, endDate })
      : Promise.resolve([]),
    includeEvents
      ? getEvents(locationId, { startDate, endDate, status: 'published' })
      : Promise.resolve([]),
  ]);

  // Build iCal content
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GUDBRO//Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeICalText(locationName)}`,
    `X-WR-CALDESC:Orari e eventi di ${escapeICalText(locationName)}`,
  ];

  // Add overrides as events
  if (includeOverrides) {
    for (const override of overrides) {
      const uid = `override-${override.id}@gudbro.com`;
      const dtstart = formatICalDate(override.date_start);
      const dtend = override.date_end
        ? formatICalDate(override.date_end, true)
        : formatICalDate(override.date_start, true);

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${formatICalDateTime(new Date())}`);
      lines.push(`DTSTART;VALUE=DATE:${dtstart}`);
      lines.push(`DTEND;VALUE=DATE:${dtend}`);
      lines.push(`SUMMARY:${escapeICalText(override.name)}`);

      if (override.description) {
        lines.push(`DESCRIPTION:${escapeICalText(override.description)}`);
      }

      // Add categories based on type
      const categoryMap: Record<string, string> = {
        holiday: 'HOLIDAY',
        seasonal: 'SEASONAL',
        closure: 'CLOSURE',
        special: 'SPECIAL',
        event: 'EVENT',
      };
      lines.push(`CATEGORIES:${categoryMap[override.override_type] || 'OTHER'}`);

      // Color (if supported by calendar app)
      if (override.color) {
        lines.push(`X-APPLE-CALENDAR-COLOR:${override.color}`);
      }

      if (override.is_closed) {
        lines.push('X-GUDBRO-CLOSED:TRUE');
      }

      if (override.hours) {
        lines.push(`X-GUDBRO-HOURS:${override.hours.open}-${override.hours.close}`);
      }

      lines.push('END:VEVENT');
    }
  }

  // Add events
  if (includeEvents) {
    for (const event of events) {
      const uid = `event-${event.id}@gudbro.com`;
      const dtstart = formatICalDateTime(new Date(`${event.start_date}T${event.start_time}`));
      const dtend = formatICalDateTime(
        new Date(`${event.end_date || event.start_date}T${event.end_time}`)
      );

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${formatICalDateTime(new Date())}`);
      lines.push(`DTSTART:${dtstart}`);
      lines.push(`DTEND:${dtend}`);
      lines.push(`SUMMARY:${escapeICalText(event.title)}`);

      if (event.description) {
        lines.push(`DESCRIPTION:${escapeICalText(event.description)}`);
      }

      lines.push(`CATEGORIES:EVENT,${event.event_category.toUpperCase()}`);

      if (event.performer) {
        lines.push(`X-GUDBRO-PERFORMER:${escapeICalText(event.performer.name)}`);
      }

      if (event.entrance_fee) {
        lines.push(`X-GUDBRO-ENTRANCE-FEE:${event.entrance_fee}`);
      }

      if (event.requires_reservation) {
        lines.push('X-GUDBRO-RESERVATION-REQUIRED:TRUE');
      }

      lines.push('END:VEVENT');
    }
  }

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
}

/**
 * Escape text for iCal format
 */
function escapeICalText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Format date for iCal (YYYYMMDD)
 */
function formatICalDate(dateStr: string, plusOneDay = false): string {
  const date = new Date(dateStr);
  if (plusOneDay) {
    date.setDate(date.getDate() + 1);
  }
  return date.toISOString().split('T')[0].replace(/-/g, '');
}

/**
 * Format datetime for iCal (YYYYMMDDTHHmmssZ)
 */
function formatICalDateTime(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// ===========================================
// Subscribe URL Generation
// ===========================================

/**
 * Generate a subscription URL for the calendar
 * This URL can be used to subscribe in Google Calendar, Apple Calendar, etc.
 */
export function generateCalendarSubscribeUrl(
  locationId: string,
  baseUrl: string = 'https://api.gudbro.com'
): string {
  // WebCal protocol for calendar subscription
  return `webcal://${baseUrl.replace(/^https?:\/\//, '')}/api/calendar/${locationId}/subscribe.ics`;
}

/**
 * Generate a download URL for the calendar
 */
export function generateCalendarDownloadUrl(
  locationId: string,
  startDate: string,
  endDate: string,
  baseUrl: string = 'https://api.gudbro.com'
): string {
  return `${baseUrl}/api/calendar/${locationId}/export.ics?start=${startDate}&end=${endDate}`;
}

// ===========================================
// Google Calendar Integration
// ===========================================

export interface GoogleCalendarConfig {
  clientId: string;
  calendarId?: string;
  syncEnabled: boolean;
  lastSyncAt?: string;
}

/**
 * Generate Google Calendar add event URL
 */
export function generateGoogleCalendarUrl(event: {
  title: string;
  description?: string;
  startDate: string;
  startTime: string;
  endDate?: string;
  endTime: string;
  location?: string;
}): string {
  const startDateTime = `${event.startDate.replace(/-/g, '')}T${event.startTime.replace(/:/g, '')}00`;
  const endDateTime = `${(event.endDate || event.startDate).replace(/-/g, '')}T${event.endTime.replace(/:/g, '')}00`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDateTime}/${endDateTime}`,
  });

  if (event.description) {
    params.set('details', event.description);
  }

  if (event.location) {
    params.set('location', event.location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ===========================================
// Helper: Get Location Hours
// ===========================================

/**
 * Get effective hours for a specific date
 */
export async function getEffectiveHoursForDate(
  locationId: string,
  date: string,
  operatingHours: OperatingHours
): Promise<{
  isOpen: boolean;
  hours: { open: string; close: string } | null;
  reason: string | null;
}> {
  const schedule = await getMergedSchedule(locationId, date, date, operatingHours);
  const daySchedule = schedule[date];

  if (!daySchedule) {
    return { isOpen: false, hours: null, reason: 'No schedule data' };
  }

  return {
    isOpen: daySchedule.isOpen,
    hours: daySchedule.hours,
    reason: daySchedule.overrideReason,
  };
}

/**
 * Check if location is currently open
 */
export async function isLocationOpenNow(
  locationId: string,
  operatingHours: OperatingHours,
  timezone: string = 'Asia/Ho_Chi_Minh'
): Promise<{
  isOpen: boolean;
  currentHours: { open: string; close: string } | null;
  nextOpenTime: string | null;
  reason: string | null;
}> {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const { isOpen, hours, reason } = await getEffectiveHoursForDate(
    locationId,
    today,
    operatingHours
  );

  if (!isOpen || !hours) {
    // Find next open time
    let nextOpenTime: string | null = null;
    for (let i = 1; i <= 7; i++) {
      const futureDate = new Date(now);
      futureDate.setDate(futureDate.getDate() + i);
      const futureDateStr = futureDate.toISOString().split('T')[0];
      const futureSchedule = await getEffectiveHoursForDate(
        locationId,
        futureDateStr,
        operatingHours
      );
      if (futureSchedule.isOpen && futureSchedule.hours) {
        nextOpenTime = `${futureDateStr} ${futureSchedule.hours.open}`;
        break;
      }
    }

    return {
      isOpen: false,
      currentHours: null,
      nextOpenTime,
      reason: reason || 'Closed',
    };
  }

  // Check if currently within hours
  const isWithinHours = currentTime >= hours.open && currentTime <= hours.close;

  if (!isWithinHours) {
    if (currentTime < hours.open) {
      // Before opening
      return {
        isOpen: false,
        currentHours: hours,
        nextOpenTime: `${today} ${hours.open}`,
        reason: 'Not yet open',
      };
    } else {
      // After closing
      return {
        isOpen: false,
        currentHours: null,
        nextOpenTime: null, // Would need to calculate
        reason: 'Closed for today',
      };
    }
  }

  return {
    isOpen: true,
    currentHours: hours,
    nextOpenTime: null,
    reason: null,
  };
}
