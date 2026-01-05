/**
 * GudBro Follower Service
 *
 * Manages user-merchant follow relationships:
 * - Follow/Unfollow merchants
 * - Check follow status
 * - Get followed merchants list
 * - Track follow source (QR, search, referral)
 * - Tourist lifecycle management
 */

import { supabase, isSupabaseConfigured } from './supabase';

export type VisitorType = 'resident' | 'tourist' | 'unknown';
export type PostTripPreference = 'pause' | 'occasional' | 'stop';
export type NotificationStatus = 'active' | 'paused' | 'stopped' | 'archived';

export interface FollowedMerchant {
  merchant_id: string;
  merchant_name: string;
  merchant_logo: string | null;
  followed_at: string;
  loyalty_points: number;
  total_orders: number;
}

export interface FollowerInfo {
  visitor_type: VisitorType;
  trip_end_date: string | null;
  post_trip_preference: PostTripPreference;
  notification_status: NotificationStatus;
  visit_count: number;
  home_country: string | null;
}

export interface WelcomeBackResult {
  success: boolean;
  welcome_back: boolean;
  previous_visits: number;
  was_archived: boolean;
  error?: string;
}

export interface FollowResult {
  success: boolean;
  error?: string;
}

/**
 * Follow a merchant
 * @param merchantId - The merchant's UUID
 * @param source - How the user discovered the merchant
 * @param referralCode - Optional referral code
 */
export async function followMerchant(
  merchantId: string,
  source: 'qr_scan' | 'search' | 'referral' | 'promo' = 'qr_scan',
  referralCode?: string
): Promise<FollowResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  try {
    // Use the RPC function for proper auth context
    const { error } = await supabase.rpc('follow_merchant', {
      p_merchant_id: merchantId,
      p_source: source,
    });

    if (error) {
      console.error('Follow error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Follow merchant error:', err);
    return { success: false, error: 'Errore durante il follow. Riprova.' };
  }
}

/**
 * Unfollow a merchant
 * @param merchantId - The merchant's UUID
 */
export async function unfollowMerchant(merchantId: string): Promise<FollowResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  try {
    const { error } = await supabase.rpc('unfollow_merchant', {
      p_merchant_id: merchantId,
    });

    if (error) {
      console.error('Unfollow error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unfollow merchant error:', err);
    return { success: false, error: "Errore durante l'unfollow. Riprova." };
  }
}

/**
 * Check if user is following a merchant
 * @param merchantId - The merchant's UUID
 */
export async function isFollowingMerchant(merchantId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  try {
    const { data, error } = await supabase.rpc('is_following_merchant', {
      p_merchant_id: merchantId,
    });

    if (error) {
      console.error('Check follow error:', error);
      return false;
    }

    return data === true;
  } catch (err) {
    console.error('Is following error:', err);
    return false;
  }
}

/**
 * Get all merchants the user follows
 */
export async function getFollowedMerchants(): Promise<FollowedMerchant[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase.rpc('get_followed_merchants');

    if (error) {
      console.error('Get followed merchants error:', error);
      return [];
    }

    return (data || []).map(
      (m: {
        merchant_id: string;
        merchant_name: string;
        merchant_logo: string | null;
        followed_at: string;
        loyalty_points: number;
        total_orders: number;
      }) => ({
        merchant_id: m.merchant_id,
        merchant_name: m.merchant_name,
        merchant_logo: m.merchant_logo,
        followed_at: m.followed_at,
        loyalty_points: m.loyalty_points,
        total_orders: m.total_orders,
      })
    );
  } catch (err) {
    console.error('Get followed merchants error:', err);
    return [];
  }
}

/**
 * Get follower count for a merchant (for display purposes)
 * @param merchantId - The merchant's UUID
 */
export async function getMerchantFollowerCount(merchantId: string): Promise<number> {
  if (!isSupabaseConfigured || !supabase) {
    return 0;
  }

  try {
    const { count, error } = await supabase
      .from('merchant_followers')
      .select('*', { count: 'exact', head: true })
      .eq('merchant_id', merchantId)
      .eq('is_active', true);

    if (error) {
      console.error('Get follower count error:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Get follower count error:', err);
    return 0;
  }
}

// ============================================
// TOURIST LIFECYCLE FUNCTIONS
// ============================================

/**
 * Set visitor type after follow (resident or tourist)
 * @param merchantId - The merchant's UUID
 * @param visitorType - 'resident' or 'tourist'
 * @param tripEndDate - For tourists: when their trip ends (YYYY-MM-DD)
 * @param postTripPref - What to do after trip: 'pause', 'occasional', 'stop'
 * @param homeCity - Optional home city
 * @param homeCountry - Optional home country code
 */
export async function setVisitorType(
  merchantId: string,
  visitorType: VisitorType,
  tripEndDate?: string,
  postTripPref: PostTripPreference = 'pause',
  homeCity?: string,
  homeCountry?: string
): Promise<FollowResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase non configurato' };
  }

  try {
    const { error } = await supabase.rpc('set_visitor_type', {
      p_merchant_id: merchantId,
      p_visitor_type: visitorType,
      p_trip_end_date: tripEndDate || null,
      p_post_trip_preference: postTripPref,
      p_home_city: homeCity || null,
      p_home_country: homeCountry || null,
    });

    if (error) {
      console.error('Set visitor type error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Set visitor type error:', err);
    return { success: false, error: 'Errore durante il salvataggio. Riprova.' };
  }
}

/**
 * Handle tourist return - updates visit count and reactivates notifications
 * @param merchantId - The merchant's UUID
 * @param newTripEndDate - New trip end date (YYYY-MM-DD)
 */
export async function handleTouristReturn(
  merchantId: string,
  newTripEndDate: string
): Promise<WelcomeBackResult> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      success: false,
      welcome_back: false,
      previous_visits: 0,
      was_archived: false,
      error: 'Supabase non configurato',
    };
  }

  try {
    const { data, error } = await supabase.rpc('handle_tourist_return', {
      p_merchant_id: merchantId,
      p_new_trip_end_date: newTripEndDate,
    });

    if (error) {
      console.error('Handle tourist return error:', error);
      return {
        success: false,
        welcome_back: false,
        previous_visits: 0,
        was_archived: false,
        error: error.message,
      };
    }

    return {
      success: data?.success || false,
      welcome_back: data?.welcome_back || false,
      previous_visits: data?.previous_visits || 0,
      was_archived: data?.was_archived || false,
    };
  } catch (err) {
    console.error('Handle tourist return error:', err);
    return {
      success: false,
      welcome_back: false,
      previous_visits: 0,
      was_archived: false,
      error: 'Errore di rete. Riprova.',
    };
  }
}

/**
 * Get follower info including visitor type and notification status
 * @param merchantId - The merchant's UUID
 */
export async function getFollowerInfo(merchantId: string): Promise<FollowerInfo | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      return null;
    }

    // Get account_id from accounts table
    const { data: accountData } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', userData.user.id)
      .single();

    if (!accountData) {
      return null;
    }

    // Get follower info
    const { data, error } = await supabase
      .from('merchant_followers')
      .select(
        'visitor_type, trip_end_date, post_trip_preference, notification_status, visit_count, home_country'
      )
      .eq('account_id', accountData.id)
      .eq('merchant_id', merchantId)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      visitor_type: data.visitor_type as VisitorType,
      trip_end_date: data.trip_end_date,
      post_trip_preference: data.post_trip_preference as PostTripPreference,
      notification_status: data.notification_status as NotificationStatus,
      visit_count: data.visit_count,
      home_country: data.home_country,
    };
  } catch (err) {
    console.error('Get follower info error:', err);
    return null;
  }
}

/**
 * Check if user needs to see visitor type modal (visitor_type is 'unknown')
 * @param merchantId - The merchant's UUID
 */
export async function needsVisitorTypeSelection(merchantId: string): Promise<boolean> {
  const info = await getFollowerInfo(merchantId);
  return info?.visitor_type === 'unknown';
}

/**
 * Check if returning tourist needs welcome back flow
 * @param merchantId - The merchant's UUID
 */
export async function isReturningTourist(merchantId: string): Promise<{
  isReturning: boolean;
  previousVisits: number;
  wasArchived: boolean;
}> {
  const info = await getFollowerInfo(merchantId);

  if (!info || info.visitor_type !== 'tourist') {
    return { isReturning: false, previousVisits: 0, wasArchived: false };
  }

  // Check if notification is paused/stopped/archived (meaning trip ended before)
  const isReturning = ['paused', 'stopped', 'archived'].includes(info.notification_status);

  return {
    isReturning,
    previousVisits: info.visit_count,
    wasArchived: info.notification_status === 'archived',
  };
}
