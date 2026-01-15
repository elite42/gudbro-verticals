// Reservations Service
// Core reservation management for the GUDBRO reservation system
// Sprint 2 of RESERVATIONS-SYSTEM

import { supabase } from '@/lib/supabase';
import {
  sendReservationNotification,
  scheduleReminders,
  cancelScheduledNotifications,
} from '@/lib/notifications/notification-dispatcher';

// =============================================================================
// TYPES
// =============================================================================

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'reminder_sent'
  | 'seated'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type ReservationSource =
  | 'website'
  | 'phone'
  | 'walk_in'
  | 'partner'
  | 'google'
  | 'backoffice';

export type ReservationOccasion =
  | 'birthday'
  | 'anniversary'
  | 'business'
  | 'date'
  | 'celebration'
  | 'other'
  | null;

export type DepositStatus = 'not_required' | 'pending' | 'paid' | 'refunded' | 'forfeited';

export type BlockType = 'manual' | 'private_event' | 'maintenance' | 'holiday' | 'capacity';

export interface Reservation {
  id: string;
  location_id: string;
  reservation_code: string;
  account_id?: string;
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  guest_locale: string;
  party_size: number;
  reservation_date: string; // DATE as string
  reservation_time: string; // TIME as string
  end_time?: string;
  duration_minutes: number;
  section_id?: string;
  table_ids: string[];
  status: ReservationStatus;
  status_changed_at: string;
  status_changed_by?: string;
  source: ReservationSource;
  occasion?: ReservationOccasion;
  special_requests?: string;
  dietary_requirements: string[];
  deposit_status: DepositStatus;
  deposit_amount: number;
  deposit_transaction_id?: string;
  notes?: string;
  internal_notes?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  seated_at?: string;
  completed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  // Joined fields
  section?: { id: string; name: string };
}

export interface ReservationSettings {
  location_id: string;
  min_advance_hours: number;
  max_advance_days: number;
  slot_duration_minutes: number;
  default_dining_duration: number;
  auto_confirm_threshold?: number;
  cancellation_deadline_hours: number;
  no_show_penalty_amount: number;
  require_deposit: boolean;
  deposit_amount: number;
  deposit_percent: number;
  send_reminder_hours: number;
  send_confirmation: boolean;
  max_party_size: number;
  min_party_size: number;
  reservation_hours?: Record<string, { open: string; close: string }>;
  allow_section_preference: boolean;
  allow_table_preference: boolean;
  require_phone: boolean;
  require_email: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateReservationInput {
  location_id: string;
  account_id?: string;
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  guest_locale?: string;
  party_size: number;
  reservation_date: string;
  reservation_time: string;
  duration_minutes?: number;
  section_id?: string;
  source?: ReservationSource;
  occasion?: ReservationOccasion;
  special_requests?: string;
  dietary_requirements?: string[];
  notes?: string;
}

export interface UpdateReservationInput {
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  party_size?: number;
  reservation_date?: string;
  reservation_time?: string;
  duration_minutes?: number;
  section_id?: string;
  occasion?: ReservationOccasion;
  special_requests?: string;
  dietary_requirements?: string[];
  notes?: string;
  internal_notes?: string;
  tags?: string[];
}

export interface BlockedSlot {
  id: string;
  location_id: string;
  block_date: string;
  start_time?: string;
  end_time?: string;
  section_id?: string;
  table_id?: string;
  reason: string;
  block_type: BlockType;
  created_by?: string;
  created_at: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  tables_available: number;
  max_capacity: number;
}

export interface AvailabilityResult {
  date: string;
  slots: TimeSlot[];
  is_blocked: boolean;
  block_reason?: string;
}

export interface ReservationStats {
  total_reservations: number;
  total_covers: number;
  pending_count: number;
  confirmed_count: number;
  seated_count: number;
  completed_count: number;
  cancelled_count: number;
  no_show_count: number;
}

// =============================================================================
// SETTINGS FUNCTIONS
// =============================================================================

/**
 * Get reservation settings for a location
 */
export async function getSettings(locationId: string): Promise<ReservationSettings | null> {
  const { data, error } = await supabase
    .from('reservation_settings')
    .select('*')
    .eq('location_id', locationId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching reservation settings:', error);
    throw new Error(`Failed to fetch settings: ${error.message}`);
  }

  return data;
}

/**
 * Create or update reservation settings
 */
export async function upsertSettings(
  locationId: string,
  settings: Partial<Omit<ReservationSettings, 'location_id' | 'created_at' | 'updated_at'>>
): Promise<ReservationSettings> {
  const { data, error } = await supabase
    .from('reservation_settings')
    .upsert({
      location_id: locationId,
      ...settings,
    })
    .select()
    .single();

  if (error) {
    console.error('Error upserting reservation settings:', error);
    throw new Error(`Failed to save settings: ${error.message}`);
  }

  return data;
}

// =============================================================================
// RESERVATION CRUD FUNCTIONS
// =============================================================================

/**
 * Get reservations with optional filters
 */
export async function getReservations(
  locationId: string,
  options?: {
    date?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: ReservationStatus | ReservationStatus[];
    includeSection?: boolean;
    limit?: number;
    offset?: number;
  }
): Promise<Reservation[]> {
  const selectQuery = options?.includeSection ? '*, section:location_sections(id, name)' : '*';

  let query = supabase.from('reservations').select(selectQuery).eq('location_id', locationId);

  if (options?.date) {
    query = query.eq('reservation_date', options.date);
  }
  if (options?.dateFrom) {
    query = query.gte('reservation_date', options.dateFrom);
  }
  if (options?.dateTo) {
    query = query.lte('reservation_date', options.dateTo);
  }
  if (options?.status) {
    if (Array.isArray(options.status)) {
      query = query.in('status', options.status);
    } else {
      query = query.eq('status', options.status);
    }
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  query = query.order('reservation_date', { ascending: true });
  query = query.order('reservation_time', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching reservations:', error);
    throw new Error(`Failed to fetch reservations: ${error.message}`);
  }

  return (data as unknown as Reservation[]) || [];
}

/**
 * Get a single reservation by ID or code
 */
export async function getReservation(
  idOrCode: string,
  options?: { includeSection?: boolean }
): Promise<Reservation | null> {
  const selectQuery = options?.includeSection ? '*, section:location_sections(id, name)' : '*';

  // Try by ID first, then by code
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode);

  const { data, error } = await supabase
    .from('reservations')
    .select(selectQuery)
    .eq(isUuid ? 'id' : 'reservation_code', idOrCode)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching reservation:', error);
    throw new Error(`Failed to fetch reservation: ${error.message}`);
  }

  return data as unknown as Reservation;
}

/**
 * Create a new reservation
 */
export async function createReservation(input: CreateReservationInput): Promise<Reservation> {
  // Use atomic function to prevent overbooking via row-level locking
  // This ensures no race condition between availability check and insert
  const { data, error } = await supabase.rpc('create_reservation_atomic', {
    p_location_id: input.location_id,
    p_date: input.reservation_date,
    p_time: input.reservation_time,
    p_party_size: input.party_size,
    p_guest_name: input.guest_name,
    p_guest_email: input.guest_email || null,
    p_guest_phone: input.guest_phone || null,
    p_guest_locale: input.guest_locale || 'en',
    p_account_id: input.account_id || null,
    p_section_id: input.section_id || null,
    p_duration_minutes: input.duration_minutes || 90,
    p_source: input.source || 'website',
    p_occasion: input.occasion || null,
    p_special_requests: input.special_requests || null,
    p_dietary_requirements: input.dietary_requirements || null,
    p_notes: input.notes || null,
  });

  if (error) {
    console.error('Error creating reservation:', error);
    // Handle specific error codes
    if (error.code === 'P0001') {
      throw new Error('SLOT_FULL: This time slot is no longer available');
    }
    if (error.code === 'P0002') {
      throw new Error('CLOSED_DAY: The location is closed on this day');
    }
    if (error.code === 'P0003') {
      throw new Error('BEFORE_OPENING: The requested time is before opening hours');
    }
    if (error.code === 'P0004') {
      throw new Error('PAST_CLOSING: The reservation would extend past closing time');
    }
    throw new Error(`Failed to create reservation: ${error.message}`);
  }

  const reservation = data as unknown as Reservation;

  // Send confirmation notification (non-blocking)
  sendReservationNotification({
    reservationId: reservation.id,
    type: 'reservation_confirmed',
    locale: input.guest_locale || 'en',
    priority: 1, // High priority for confirmations
  }).catch((err) => {
    console.error('Failed to send confirmation notification:', err);
  });

  // Schedule reminder notifications (non-blocking)
  scheduleReminders(reservation.id, input.reservation_date, input.reservation_time).catch((err) => {
    console.error('Failed to schedule reminders:', err);
  });

  return reservation;
}

/**
 * Update a reservation
 */
export async function updateReservation(
  reservationId: string,
  input: UpdateReservationInput
): Promise<Reservation> {
  const { data, error } = await supabase
    .from('reservations')
    .update(input)
    .eq('id', reservationId)
    .select()
    .single();

  if (error) {
    console.error('Error updating reservation:', error);
    throw new Error(`Failed to update reservation: ${error.message}`);
  }

  return data as unknown as Reservation;
}

/**
 * Update reservation status
 */
export async function updateReservationStatus(
  reservationId: string,
  status: ReservationStatus,
  options?: {
    changedBy?: string;
    cancellationReason?: string;
  }
): Promise<Reservation> {
  const updateData: Record<string, unknown> = {
    status,
    status_changed_by: options?.changedBy,
  };

  if (status === 'cancelled' && options?.cancellationReason) {
    updateData.cancellation_reason = options.cancellationReason;
  }

  const { data, error } = await supabase
    .from('reservations')
    .update(updateData)
    .eq('id', reservationId)
    .select()
    .single();

  if (error) {
    console.error('Error updating reservation status:', error);
    throw new Error(`Failed to update status: ${error.message}`);
  }

  const reservation = data as unknown as Reservation;

  // Send status-specific notifications (non-blocking)
  if (status === 'confirmed') {
    sendReservationNotification({
      reservationId,
      type: 'reservation_confirmed',
      priority: 2,
    }).catch((err) => {
      console.error('Failed to send confirmation notification:', err);
    });
  } else if (status === 'cancelled') {
    // Cancel any scheduled reminders
    cancelScheduledNotifications(reservationId).catch((err) => {
      console.error('Failed to cancel scheduled notifications:', err);
    });

    sendReservationNotification({
      reservationId,
      type: 'reservation_cancelled',
      priority: 2,
    }).catch((err) => {
      console.error('Failed to send cancellation notification:', err);
    });
  } else if (status === 'no_show') {
    sendReservationNotification({
      reservationId,
      type: 'no_show',
      priority: 4,
    }).catch((err) => {
      console.error('Failed to send no-show notification:', err);
    });
  }

  return reservation;
}

/**
 * Cancel a reservation
 */
export async function cancelReservation(
  reservationId: string,
  reason?: string,
  cancelledBy?: string
): Promise<Reservation> {
  return updateReservationStatus(reservationId, 'cancelled', {
    changedBy: cancelledBy,
    cancellationReason: reason,
  });
}

// =============================================================================
// TABLE ASSIGNMENT FUNCTIONS
// =============================================================================

/**
 * Assign tables to a reservation
 */
export async function assignTables(
  reservationId: string,
  tableIds: string[],
  assignedBy?: string
): Promise<void> {
  // First, remove existing assignments
  await supabase.from('reservation_table_assignments').delete().eq('reservation_id', reservationId);

  // Then, create new assignments
  if (tableIds.length > 0) {
    const assignments = tableIds.map((tableId) => ({
      reservation_id: reservationId,
      table_id: tableId,
      assigned_by: assignedBy,
    }));

    const { error } = await supabase.from('reservation_table_assignments').insert(assignments);

    if (error) {
      console.error('Error assigning tables:', error);
      throw new Error(`Failed to assign tables: ${error.message}`);
    }

    // Update the reservation's table_ids JSONB field
    await supabase.from('reservations').update({ table_ids: tableIds }).eq('id', reservationId);
  }
}

/**
 * Get assigned tables for a reservation
 */
export async function getAssignedTables(reservationId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('reservation_table_assignments')
    .select('table_id')
    .eq('reservation_id', reservationId);

  if (error) {
    console.error('Error fetching assigned tables:', error);
    throw new Error(`Failed to fetch assigned tables: ${error.message}`);
  }

  return data?.map((row) => row.table_id) || [];
}

// =============================================================================
// AVAILABILITY FUNCTIONS
// =============================================================================

/**
 * Check if a specific time slot is available
 */
export async function checkSlotAvailability(
  locationId: string,
  date: string,
  time: string,
  partySize: number,
  durationMinutes = 90
): Promise<boolean> {
  const { data, error } = await supabase.rpc('check_slot_availability', {
    p_location_id: locationId,
    p_date: date,
    p_time: time,
    p_party_size: partySize,
    p_duration_minutes: durationMinutes,
  });

  if (error) {
    console.error('Error checking slot availability:', error);
    throw new Error(`Failed to check availability: ${error.message}`);
  }

  return data ?? false;
}

/**
 * Get available time slots for a date
 */
export async function getAvailableSlots(
  locationId: string,
  date: string,
  partySize: number,
  options?: {
    startTime?: string;
    endTime?: string;
    slotInterval?: number;
  }
): Promise<TimeSlot[]> {
  // Get settings for slot interval
  const settings = await getSettings(locationId);
  const slotInterval = options?.slotInterval || settings?.slot_duration_minutes || 15;
  const startTime = options?.startTime || '11:00';
  const endTime = options?.endTime || '22:00';

  // Get existing reservations for the date
  const reservations = await getReservations(locationId, { date });

  // Get blocked slots
  const { data: blockedSlots } = await supabase
    .from('blocked_slots')
    .select('*')
    .eq('location_id', locationId)
    .eq('block_date', date);

  // Generate time slots
  const slots: TimeSlot[] = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    const isBlocked = blockedSlots?.some((block) => {
      if (!block.start_time) return true; // Entire day blocked
      return currentTime >= block.start_time && currentTime < block.end_time;
    });

    // Count overlapping reservations at this time
    const overlapping = reservations.filter((res) => {
      return res.reservation_time <= currentTime && (res.end_time || '23:59') > currentTime;
    });

    slots.push({
      time: currentTime,
      available: !isBlocked,
      tables_available: 0, // TODO: Calculate based on actual table availability
      max_capacity: 0, // TODO: Calculate based on location capacity
    });

    // Increment time
    const [hours, minutes] = currentTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + slotInterval;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    currentTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }

  return slots;
}

// =============================================================================
// BLOCKED SLOTS FUNCTIONS
// =============================================================================

/**
 * Create a blocked slot
 */
export async function createBlockedSlot(input: {
  location_id: string;
  block_date: string;
  start_time?: string;
  end_time?: string;
  section_id?: string;
  table_id?: string;
  reason: string;
  block_type?: BlockType;
  created_by?: string;
}): Promise<BlockedSlot> {
  const { data, error } = await supabase
    .from('blocked_slots')
    .insert({
      location_id: input.location_id,
      block_date: input.block_date,
      start_time: input.start_time,
      end_time: input.end_time,
      section_id: input.section_id,
      table_id: input.table_id,
      reason: input.reason,
      block_type: input.block_type || 'manual',
      created_by: input.created_by,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating blocked slot:', error);
    throw new Error(`Failed to create blocked slot: ${error.message}`);
  }

  return data;
}

/**
 * Get blocked slots for a date range
 */
export async function getBlockedSlots(
  locationId: string,
  dateFrom: string,
  dateTo: string
): Promise<BlockedSlot[]> {
  const { data, error } = await supabase
    .from('blocked_slots')
    .select('*')
    .eq('location_id', locationId)
    .gte('block_date', dateFrom)
    .lte('block_date', dateTo)
    .order('block_date', { ascending: true });

  if (error) {
    console.error('Error fetching blocked slots:', error);
    throw new Error(`Failed to fetch blocked slots: ${error.message}`);
  }

  return data || [];
}

/**
 * Delete a blocked slot
 */
export async function deleteBlockedSlot(blockId: string): Promise<void> {
  const { error } = await supabase.from('blocked_slots').delete().eq('id', blockId);

  if (error) {
    console.error('Error deleting blocked slot:', error);
    throw new Error(`Failed to delete blocked slot: ${error.message}`);
  }
}

// =============================================================================
// STATISTICS FUNCTIONS
// =============================================================================

/**
 * Get reservation statistics for a date
 */
export async function getReservationStats(
  locationId: string,
  date?: string
): Promise<ReservationStats> {
  const { data, error } = await supabase.rpc('get_reservation_stats', {
    p_location_id: locationId,
    p_date: date || new Date().toISOString().split('T')[0],
  });

  if (error) {
    console.error('Error fetching reservation stats:', error);
    throw new Error(`Failed to fetch stats: ${error.message}`);
  }

  // The function returns an array with one row
  const stats = data?.[0] || {
    total_reservations: 0,
    total_covers: 0,
    pending_count: 0,
    confirmed_count: 0,
    seated_count: 0,
    completed_count: 0,
    cancelled_count: 0,
    no_show_count: 0,
  };

  return stats;
}

/**
 * Get reservations for a date (using database function)
 */
export async function getReservationsForDate(
  locationId: string,
  date: string
): Promise<
  {
    id: string;
    reservation_code: string;
    guest_name: string;
    party_size: number;
    reservation_time: string;
    end_time: string;
    status: string;
    section_id: string | null;
    section_name: string | null;
    table_ids: string[];
  }[]
> {
  const { data, error } = await supabase.rpc('get_reservations_for_date', {
    p_location_id: locationId,
    p_date: date,
  });

  if (error) {
    console.error('Error fetching reservations for date:', error);
    throw new Error(`Failed to fetch reservations: ${error.message}`);
  }

  return data || [];
}

// =============================================================================
// HISTORY FUNCTIONS
// =============================================================================

/**
 * Get history for a reservation
 */
export async function getReservationHistory(reservationId: string): Promise<
  {
    id: string;
    action: string;
    old_status: string | null;
    new_status: string | null;
    changed_by: string | null;
    change_source: string;
    notes: string | null;
    created_at: string;
  }[]
> {
  const { data, error } = await supabase
    .from('reservation_history')
    .select('*')
    .eq('reservation_id', reservationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reservation history:', error);
    throw new Error(`Failed to fetch history: ${error.message}`);
  }

  return data || [];
}

/**
 * Add a manual history entry
 */
export async function addHistoryEntry(input: {
  reservation_id: string;
  action: string;
  notes?: string;
  changed_by?: string;
  change_source?: string;
}): Promise<void> {
  const { error } = await supabase.from('reservation_history').insert({
    reservation_id: input.reservation_id,
    action: input.action,
    notes: input.notes,
    changed_by: input.changed_by,
    change_source: input.change_source || 'backoffice',
  });

  if (error) {
    console.error('Error adding history entry:', error);
    throw new Error(`Failed to add history: ${error.message}`);
  }
}
