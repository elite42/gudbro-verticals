/**
 * Hot Actions Service
 *
 * Customer-to-staff quick action requests
 * Examples: Call waiter, Request bill, Clean table, etc.
 */

import { supabase, isSupabaseConfigured, getDeviceFingerprint } from './supabase';

// Cache for default location
let cachedLocationId: string | null = null;

// ============================================
// TYPES
// ============================================

export interface HotActionType {
  id: string;
  code: string;
  name: string;
  name_it: string | null;
  description: string | null;
  icon: string;
  color: string;
  requires_table: boolean;
  requires_note: boolean;
  cooldown_minutes: number;
}

export interface HotActionRequest {
  id: string;
  location_id: string;
  action_type_id: string;
  table_number: string | null;
  customer_note: string | null;
  device_id: string | null;
  status: 'pending' | 'acknowledged' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  acknowledged_at: string | null;
  completed_at: string | null;
}

export interface SubmitHotActionParams {
  locationId: string;
  actionCode: string;
  tableNumber?: string;
  note?: string;
}

export interface HotActionResult {
  success: boolean;
  requestId?: string;
  error?: string;
}

// ============================================
// ACTION CODES (matching database)
// ============================================

export const HOT_ACTION_CODES = {
  CALL_WAITER: 'call_waiter',
  REQUEST_BILL: 'request_bill',
  CLEAN_TABLE: 'clean_table',
  NEED_ASSISTANCE: 'need_assistance',
  WATER_REFILL: 'water_refill',
} as const;

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get default location ID (first location for merchant)
 */
export async function getDefaultLocationId(): Promise<string | null> {
  if (cachedLocationId) {
    return cachedLocationId;
  }

  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.from('locations').select('id').limit(1).single();

    if (error || !data) {
      console.error('Error fetching default location:', error);
      return null;
    }

    cachedLocationId = data.id;
    return data.id;
  } catch (err) {
    console.error('Exception fetching location:', err);
    return null;
  }
}

/**
 * Get available hot actions for a location
 */
export async function getHotActionsForLocation(locationId: string): Promise<HotActionType[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured - returning empty actions');
    return [];
  }

  const { data, error } = await supabase.rpc('get_hot_actions_for_location', {
    p_location_id: locationId,
  });

  if (error) {
    console.error('Error fetching hot actions:', error);
    return [];
  }

  return data || [];
}

/**
 * Check if an action is on cooldown
 */
export async function canSubmitHotAction(
  locationId: string,
  actionCode: string,
  tableNumber?: string
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return true; // Allow if not configured
  }

  const deviceId = getDeviceFingerprint();

  const { data, error } = await supabase.rpc('can_submit_hot_action', {
    p_location_id: locationId,
    p_action_code: actionCode,
    p_table_number: tableNumber || null,
    p_device_id: deviceId,
  });

  if (error) {
    console.error('Error checking cooldown:', error);
    return true; // Allow on error
  }

  return data === true;
}

/**
 * Submit a hot action request
 */
export async function submitHotAction(params: SubmitHotActionParams): Promise<HotActionResult> {
  const { locationId, actionCode, tableNumber, note } = params;

  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured - simulating success');
    return {
      success: true,
      requestId: `mock-${Date.now()}`,
    };
  }

  const deviceId = getDeviceFingerprint();

  try {
    const { data, error } = await supabase.rpc('submit_hot_action', {
      p_location_id: locationId,
      p_action_code: actionCode,
      p_table_number: tableNumber || null,
      p_device_id: deviceId,
      p_note: note || null,
    });

    if (error) {
      // Check for cooldown error
      if (error.message?.includes('cooldown')) {
        return {
          success: false,
          error: 'cooldown',
        };
      }

      console.error('Error submitting hot action:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      requestId: data,
    };
  } catch (err) {
    console.error('Exception submitting hot action:', err);
    return {
      success: false,
      error: 'network_error',
    };
  }
}

/**
 * Get pending requests for the current device (for status display)
 */
export async function getMyPendingRequests(locationId: string): Promise<HotActionRequest[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const deviceId = getDeviceFingerprint();

  const { data, error } = await supabase
    .from('hot_action_requests')
    .select('*')
    .eq('location_id', locationId)
    .eq('device_id', deviceId)
    .in('status', ['pending', 'acknowledged', 'in_progress'])
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching pending requests:', error);
    return [];
  }

  return data || [];
}

/**
 * Subscribe to request status updates (for realtime feedback)
 */
export function subscribeToRequestUpdates(
  requestId: string,
  onUpdate: (request: HotActionRequest) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    return () => {}; // No-op cleanup
  }

  const channel = supabase
    .channel(`hot-action-${requestId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'hot_action_requests',
        filter: `id=eq.${requestId}`,
      },
      (payload) => {
        onUpdate(payload.new as HotActionRequest);
      }
    )
    .subscribe();

  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Map internal action codes to user-friendly names
 */
export function getActionDisplayInfo(
  code: string,
  language: 'en' | 'it' = 'en'
): {
  name: string;
  icon: string;
  color: string;
} {
  const actions: Record<string, { en: string; it: string; icon: string; color: string }> = {
    call_waiter: { en: 'Call Waiter', it: 'Chiama Cameriere', icon: '🙋', color: '#3B82F6' },
    request_bill: { en: 'Request Bill', it: 'Richiedi Conto', icon: '💳', color: '#10B981' },
    clean_table: { en: 'Clean Table', it: 'Pulisci Tavolo', icon: '✨', color: '#F59E0B' },
    need_assistance: { en: 'Need Assistance', it: 'Serve Aiuto', icon: '❓', color: '#8B5CF6' },
    water_refill: { en: 'Water Refill', it: 'Acqua/Ricarica', icon: '💧', color: '#06B6D4' },
  };

  const action = actions[code];
  if (!action) {
    return { name: code, icon: '❔', color: '#6B7280' };
  }

  return {
    name: language === 'it' ? action.it : action.en,
    icon: action.icon,
    color: action.color,
  };
}

/**
 * Format time since request (for UI)
 */
export function formatTimeSince(createdAt: string): string {
  const seconds = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}
