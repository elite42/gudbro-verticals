/**
 * Preference Sync Service
 *
 * ACC-SYNC-PREFS: Syncs consumer preferences between local storage and Supabase
 *
 * Features:
 * - Bidirectional sync: local ↔ cloud
 * - Conflict resolution: cloud wins (newer timestamp)
 * - Per-merchant visit tracking
 * - Offline-first: works without connection
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { preferencesStore, type UserPreferences, DEFAULT_PREFERENCES } from './user-preferences';
import { getCurrentSession } from './auth-service';
import { coffeeshopConfig } from '../config/coffeeshop.config';

// Types
export interface SyncResult {
  success: boolean;
  direction: 'upload' | 'download' | 'none';
  error?: string;
}

export interface HealthProfileData {
  allergens: string[];
  dietary_preferences: string[];
  intolerances: string[];
  food_styles: string[];
  custom_preferences: Record<string, unknown>;
  updated_at: string;
}

// Storage keys
const SYNC_TIMESTAMP_KEY = 'gudbro_preferences_sync_timestamp';
const MERCHANT_VISITS_KEY = 'gudbro_merchant_visits';

/**
 * Get current merchant ID from config
 */
function getMerchantId(): string {
  return coffeeshopConfig.merchant?.id || 'unknown';
}

/**
 * Get last sync timestamp from localStorage
 */
function getLastSyncTimestamp(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SYNC_TIMESTAMP_KEY);
}

/**
 * Set last sync timestamp in localStorage
 */
function setLastSyncTimestamp(timestamp: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SYNC_TIMESTAMP_KEY, timestamp);
}

/**
 * Track merchant visit for analytics
 */
function trackMerchantVisit(merchantId: string, userId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const visits = JSON.parse(localStorage.getItem(MERCHANT_VISITS_KEY) || '{}');
    const key = `${merchantId}_${userId}`;

    visits[key] = {
      lastVisit: new Date().toISOString(),
      visitCount: (visits[key]?.visitCount || 0) + 1,
    };

    localStorage.setItem(MERCHANT_VISITS_KEY, JSON.stringify(visits));
  } catch (err) {
    console.error('[PreferenceSync] Error tracking visit:', err);
  }
}

/**
 * Convert local preferences to health_profiles format
 */
function toHealthProfileData(prefs: UserPreferences): Partial<HealthProfileData> {
  return {
    allergens: prefs.allergens_to_avoid,
    dietary_preferences: prefs.dietary_preferences,
    intolerances: prefs.intolerances,
    food_styles: [], // Not used in local preferences yet
    custom_preferences: {
      hide_incompatible: prefs.hide_incompatible,
    },
  };
}

/**
 * Convert health_profiles data to local preferences format
 */
function fromHealthProfileData(data: HealthProfileData): UserPreferences {
  return {
    allergens_to_avoid: data.allergens || [],
    dietary_preferences: data.dietary_preferences || [],
    intolerances: data.intolerances || [],
    hide_incompatible: (data.custom_preferences as any)?.hide_incompatible || false,
  };
}

/**
 * Fetch health profile from Supabase
 */
async function fetchHealthProfile(accountId: string): Promise<HealthProfileData | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('health_profiles')
      .select('allergens, dietary_preferences, intolerances, food_styles, custom_preferences, updated_at')
      .eq('account_id', accountId)
      .single();

    if (error) {
      // No profile exists yet - that's OK
      if (error.code === 'PGRST116') return null;
      console.error('[PreferenceSync] Error fetching health profile:', error);
      return null;
    }

    return data as HealthProfileData;
  } catch (err) {
    console.error('[PreferenceSync] Unexpected error:', err);
    return null;
  }
}

/**
 * Update health profile in Supabase
 */
async function updateHealthProfile(
  accountId: string,
  prefs: Partial<HealthProfileData>
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase
      .from('health_profiles')
      .upsert({
        account_id: accountId,
        ...prefs,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'account_id',
      });

    if (error) {
      console.error('[PreferenceSync] Error updating health profile:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[PreferenceSync] Unexpected error:', err);
    return false;
  }
}

/**
 * Sync preferences between local and cloud
 *
 * Strategy:
 * 1. If cloud has newer data → download to local
 * 2. If local has newer data → upload to cloud
 * 3. If both same → no action
 */
export async function syncPreferences(): Promise<SyncResult> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, direction: 'none', error: 'Supabase not configured' };
  }

  // Get current session
  const session = await getCurrentSession();
  if (!session?.user) {
    return { success: true, direction: 'none', error: 'Not authenticated' };
  }

  const accountId = session.user.id;
  const merchantId = getMerchantId();

  // Track this visit
  trackMerchantVisit(merchantId, accountId);

  try {
    // Get local preferences and last sync time
    const localPrefs = preferencesStore.get();
    const lastSyncTimestamp = getLastSyncTimestamp();

    // Fetch cloud profile
    const cloudProfile = await fetchHealthProfile(accountId);

    // Case 1: No cloud profile - upload local
    if (!cloudProfile) {
      const profileData = toHealthProfileData(localPrefs);
      const success = await updateHealthProfile(accountId, profileData);

      if (success) {
        setLastSyncTimestamp(new Date().toISOString());
        console.log('[PreferenceSync] Uploaded local preferences to cloud');
        return { success: true, direction: 'upload' };
      }

      return { success: false, direction: 'none', error: 'Failed to upload' };
    }

    // Case 2: Cloud profile exists - compare timestamps
    const cloudUpdatedAt = new Date(cloudProfile.updated_at).getTime();
    const localUpdatedAt = lastSyncTimestamp
      ? new Date(lastSyncTimestamp).getTime()
      : 0;

    // Cloud is newer → download
    if (cloudUpdatedAt > localUpdatedAt) {
      const cloudPrefs = fromHealthProfileData(cloudProfile);
      preferencesStore.set(cloudPrefs);
      setLastSyncTimestamp(cloudProfile.updated_at);

      // Dispatch event to notify UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('preferences-updated'));
      }

      console.log('[PreferenceSync] Downloaded preferences from cloud');
      return { success: true, direction: 'download' };
    }

    // Local is newer → upload
    if (localUpdatedAt > cloudUpdatedAt) {
      const profileData = toHealthProfileData(localPrefs);
      const success = await updateHealthProfile(accountId, profileData);

      if (success) {
        setLastSyncTimestamp(new Date().toISOString());
        console.log('[PreferenceSync] Uploaded local preferences to cloud');
        return { success: true, direction: 'upload' };
      }

      return { success: false, direction: 'none', error: 'Failed to upload' };
    }

    // Same timestamp → no action needed
    console.log('[PreferenceSync] Preferences are in sync');
    return { success: true, direction: 'none' };

  } catch (err) {
    console.error('[PreferenceSync] Sync failed:', err);
    return {
      success: false,
      direction: 'none',
      error: err instanceof Error ? err.message : 'Unknown error'
    };
  }
}

/**
 * Force upload local preferences to cloud
 * Use this when user explicitly saves preferences
 */
export async function uploadPreferences(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  const session = await getCurrentSession();
  if (!session?.user) return false;

  const localPrefs = preferencesStore.get();
  const profileData = toHealthProfileData(localPrefs);
  const success = await updateHealthProfile(session.user.id, profileData);

  if (success) {
    setLastSyncTimestamp(new Date().toISOString());
    console.log('[PreferenceSync] Force uploaded preferences');
  }

  return success;
}

/**
 * Force download preferences from cloud
 * Use this on login or when user wants to restore cloud version
 */
export async function downloadPreferences(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  const session = await getCurrentSession();
  if (!session?.user) return false;

  const cloudProfile = await fetchHealthProfile(session.user.id);

  if (!cloudProfile) {
    console.log('[PreferenceSync] No cloud profile found');
    return false;
  }

  const cloudPrefs = fromHealthProfileData(cloudProfile);
  preferencesStore.set(cloudPrefs);
  setLastSyncTimestamp(cloudProfile.updated_at);

  // Dispatch event to notify UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('preferences-updated'));
  }

  console.log('[PreferenceSync] Force downloaded preferences from cloud');
  return true;
}

/**
 * Check if preferences need sync
 * Returns true if local and cloud are out of sync
 */
export async function needsSync(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  const session = await getCurrentSession();
  if (!session?.user) return false;

  const lastSyncTimestamp = getLastSyncTimestamp();
  const cloudProfile = await fetchHealthProfile(session.user.id);

  if (!cloudProfile && !lastSyncTimestamp) return false;
  if (!cloudProfile) return true;
  if (!lastSyncTimestamp) return true;

  const cloudUpdatedAt = new Date(cloudProfile.updated_at).getTime();
  const localUpdatedAt = new Date(lastSyncTimestamp).getTime();

  return cloudUpdatedAt !== localUpdatedAt;
}

/**
 * Clear sync state (use on logout)
 */
export function clearSyncState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SYNC_TIMESTAMP_KEY);
}
