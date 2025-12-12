/**
 * GudBro Follower Service
 *
 * Manages user-merchant follow relationships:
 * - Follow/Unfollow merchants
 * - Check follow status
 * - Get followed merchants list
 * - Track follow source (QR, search, referral)
 */

import { supabase, isSupabaseConfigured } from './supabase';

export interface FollowedMerchant {
  merchant_id: string;
  merchant_name: string;
  merchant_logo: string | null;
  followed_at: string;
  loyalty_points: number;
  total_orders: number;
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
    return { success: false, error: 'Errore durante l\'unfollow. Riprova.' };
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

    return (data || []).map((m: {
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
    }));
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
