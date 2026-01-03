import { supabase, Location } from './supabase';

// ===========================================
// Types
// ===========================================

export interface OperatingHours {
  mon: { open: string; close: string } | null;
  tue: { open: string; close: string } | null;
  wed: { open: string; close: string } | null;
  thu: { open: string; close: string } | null;
  fri: { open: string; close: string } | null;
  sat: { open: string; close: string } | null;
  sun: { open: string; close: string } | null;
}

export type ScheduleOverrideType = 'closure' | 'holiday' | 'seasonal' | 'special' | 'event';

export interface ScheduleOverride {
  id: string;
  location_id: string;
  override_type: ScheduleOverrideType;
  name: string;
  description: string | null;
  date_start: string; // ISO date
  date_end: string | null;
  recurrence: 'none' | 'yearly';
  is_closed: boolean;
  hours: { open: string; close: string } | null;
  priority: number;
  event_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface EffectiveHours {
  date: string;
  source: string;
  source_name?: string;
  is_closed: boolean;
  hours: { open: string; close: string } | null;
}

export interface LocationOpenStatus {
  is_open: boolean;
  current_time?: string;
  opens_at?: string;
  closes_at?: string;
  reason?: string;
  effective_hours: EffectiveHours;
}

// ===========================================
// Location Operating Hours
// ===========================================

/**
 * Get operating hours for a location
 */
export async function getLocationOperatingHours(
  locationId: string
): Promise<OperatingHours | null> {
  const { data, error } = await supabase
    .from('locations')
    .select('operating_hours')
    .eq('id', locationId)
    .single();

  if (error) {
    console.error('Error fetching operating hours:', error);
    return null;
  }

  return data?.operating_hours as OperatingHours | null;
}

/**
 * Update operating hours for a location
 */
export async function updateLocationOperatingHours(
  locationId: string,
  hours: OperatingHours
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('locations')
    .update({ operating_hours: hours })
    .eq('id', locationId);

  if (error) {
    console.error('Error updating operating hours:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get location with full details
 */
export async function getLocation(locationId: string): Promise<Location | null> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('id', locationId)
    .single();

  if (error) {
    console.error('Error fetching location:', error);
    return null;
  }

  return data;
}

// ===========================================
// Schedule Overrides (Closures, Holidays, etc.)
// ===========================================

/**
 * Get all schedule overrides for a location
 */
export async function getScheduleOverrides(
  locationId: string,
  options?: {
    type?: ScheduleOverrideType;
    activeOnly?: boolean;
    startDate?: string;
    endDate?: string;
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

  if (options?.activeOnly) {
    const today = new Date().toISOString().split('T')[0];
    query = query.lte('date_start', today).or(`date_end.gte.${today},date_end.is.null`);
  }

  if (options?.startDate) {
    query = query.gte('date_start', options.startDate);
  }

  if (options?.endDate) {
    query = query.lte('date_start', options.endDate);
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
  id: string,
  updates: Partial<Omit<ScheduleOverride, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('schedule_overrides').update(updates).eq('id', id);

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
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('schedule_overrides').delete().eq('id', id);

  if (error) {
    console.error('Error deleting schedule override:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ===========================================
// Effective Hours & Open Status (using DB functions)
// ===========================================

/**
 * Get effective hours for a specific date (calls DB function)
 */
export async function getEffectiveHours(
  locationId: string,
  date?: string
): Promise<EffectiveHours | null> {
  const { data, error } = await supabase.rpc('get_effective_hours', {
    p_location_id: locationId,
    p_date: date || new Date().toISOString().split('T')[0],
  });

  if (error) {
    console.error('Error getting effective hours:', error);
    return null;
  }

  return data;
}

/**
 * Check if location is currently open (calls DB function)
 */
export async function isLocationOpen(locationId: string): Promise<LocationOpenStatus | null> {
  const { data, error } = await supabase.rpc('is_location_open', {
    p_location_id: locationId,
  });

  if (error) {
    console.error('Error checking location status:', error);
    return null;
  }

  return data;
}

// ===========================================
// Helper Functions
// ===========================================

/**
 * Get priority for override type
 */
export function getOverridePriority(type: ScheduleOverrideType): number {
  const priorities: Record<ScheduleOverrideType, number> = {
    seasonal: 10,
    holiday: 20,
    special: 30,
    event: 30,
    closure: 100,
  };
  return priorities[type] || 10;
}

/**
 * Check if a date falls within an override
 */
export function isDateInOverride(override: ScheduleOverride, date: Date): boolean {
  const checkDate = date.toISOString().split('T')[0];
  const startDate = override.date_start;
  const endDate = override.date_end || startDate;

  // Handle yearly recurrence
  if (override.recurrence === 'yearly') {
    const overrideMonth = new Date(startDate).getMonth();
    const overrideDay = new Date(startDate).getDate();
    const checkMonth = date.getMonth();
    const checkDay = date.getDate();
    return overrideMonth === checkMonth && overrideDay === checkDay;
  }

  return checkDate >= startDate && checkDate <= endDate;
}

/**
 * Get the applicable override for a date (highest priority)
 */
export function getApplicableOverride(
  overrides: ScheduleOverride[],
  date: Date
): ScheduleOverride | null {
  const applicable = overrides
    .filter((o) => isDateInOverride(o, date))
    .sort((a, b) => b.priority - a.priority);

  return applicable[0] || null;
}

// ===========================================
// Default/Demo Data
// ===========================================

export const DEFAULT_OPERATING_HOURS: OperatingHours = {
  mon: { open: '09:00', close: '22:00' },
  tue: { open: '09:00', close: '22:00' },
  wed: { open: '09:00', close: '22:00' },
  thu: { open: '09:00', close: '22:00' },
  fri: { open: '09:00', close: '23:00' },
  sat: { open: '10:00', close: '23:00' },
  sun: { open: '10:00', close: '21:00' },
};
