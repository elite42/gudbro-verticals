/**
 * Loyalty Service
 *
 * Handles loyalty points, tiers, rewards, and redemptions
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export interface LoyaltyTier {
  tierName: string;
  displayName: string;
  tierOrder: number;
  pointsThreshold: number;
  benefits: Record<string, unknown>;
  colorHex: string;
  nextTierName?: string;
  nextTierPoints?: number;
  pointsToNext?: number;
}

export interface LoyaltyReward {
  id: string;
  code: string;
  name: string;
  description?: string;
  rewardType: string;
  rewardValue: Record<string, unknown>;
  pointsRequired: number;
  imageUrl?: string;
  category?: string;
  isFeatured: boolean;
  canRedeem: boolean;
  timesRedeemed: number;
  maxPerUser?: number;
}

export interface Redemption {
  id: string;
  rewardCode: string;
  rewardName: string;
  rewardType: string;
  pointsSpent: number;
  status: string;
  redemptionCode?: string;
  validUntil?: string;
  usedAt?: string;
  createdAt: string;
}

export interface LoyaltySummary {
  totalPoints: number;
  consumerPoints: number;
  merchantPoints: number;
  contributorPoints: number;
  currentTier: LoyaltyTier;
  pointsToNextTier: number;
  nextTierName?: string;
}

export interface LoginStreak {
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string | null;
  canClaimToday: boolean;
}

// ============================================================================
// TIER FUNCTIONS
// ============================================================================

/**
 * Get all active tiers
 */
export async function getAllTiers(): Promise<LoyaltyTier[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('loyalty_tiers')
    .select('*')
    .eq('is_active', true)
    .order('tier_order');

  if (error) {
    console.error('[LoyaltyService] Get tiers error:', error);
    return [];
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    tierName: row.tier_name as string,
    displayName: row.display_name as string,
    tierOrder: row.tier_order as number,
    pointsThreshold: row.points_threshold as number,
    benefits: row.benefits as Record<string, unknown>,
    colorHex: row.color_hex as string,
  }));
}

/**
 * Get tier for given points
 */
export async function getTierForPoints(points: number): Promise<LoyaltyTier | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_tier_for_points', {
    p_points: points,
  });

  if (error || !data || data.length === 0) {
    console.error('[LoyaltyService] Get tier error:', error);
    return null;
  }

  const row = data[0];
  return {
    tierName: row.tier_name,
    displayName: row.display_name,
    tierOrder: row.tier_order,
    pointsThreshold: 0,
    benefits: row.benefits,
    colorHex: row.color_hex,
    nextTierName: row.next_tier_name,
    nextTierPoints: row.next_tier_points,
    pointsToNext: row.points_to_next,
  };
}

// ============================================================================
// REWARDS FUNCTIONS
// ============================================================================

/**
 * Get available rewards for user
 */
export async function getAvailableRewards(
  accountId: string,
  category?: string
): Promise<LoyaltyReward[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_available_rewards', {
    p_account_id: accountId,
    p_category: category || null,
  });

  if (error) {
    console.error('[LoyaltyService] Get rewards error:', error);
    return [];
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    code: row.code as string,
    name: row.name as string,
    description: row.description as string | undefined,
    rewardType: row.reward_type as string,
    rewardValue: row.reward_value as Record<string, unknown>,
    pointsRequired: row.points_required as number,
    imageUrl: row.image_url as string | undefined,
    category: row.category as string | undefined,
    isFeatured: row.is_featured as boolean,
    canRedeem: row.can_redeem as boolean,
    timesRedeemed: row.times_redeemed as number,
    maxPerUser: row.max_per_user as number | undefined,
  }));
}

/**
 * Redeem a reward
 */
export async function redeemReward(
  accountId: string,
  rewardId: string
): Promise<{ success: boolean; redemptionId?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Service not configured' };
  }

  const { data, error } = await supabase.rpc('redeem_reward', {
    p_account_id: accountId,
    p_reward_id: rewardId,
  });

  if (error) {
    console.error('[LoyaltyService] Redeem error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, redemptionId: data };
}

/**
 * Get user's redemptions
 */
export async function getMyRedemptions(
  accountId: string,
  status?: string
): Promise<Redemption[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_my_redemptions', {
    p_account_id: accountId,
    p_status: status || null,
  });

  if (error) {
    console.error('[LoyaltyService] Get redemptions error:', error);
    return [];
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    rewardCode: row.reward_code as string,
    rewardName: row.reward_name as string,
    rewardType: row.reward_type as string,
    pointsSpent: row.points_spent as number,
    status: row.status as string,
    redemptionCode: row.redemption_code as string | undefined,
    validUntil: row.valid_until as string | undefined,
    usedAt: row.used_at as string | undefined,
    createdAt: row.created_at as string,
  }));
}

/**
 * Use a redemption code (for discounts)
 */
export async function useRedemption(
  redemptionId: string,
  orderId?: string
): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { data, error } = await supabase.rpc('use_redemption', {
    p_redemption_id: redemptionId,
    p_order_id: orderId || null,
  });

  if (error) {
    console.error('[LoyaltyService] Use redemption error:', error);
    return false;
  }

  return data === true;
}

// ============================================================================
// USER LOYALTY SUMMARY
// ============================================================================

/**
 * Get user's loyalty summary
 */
export async function getLoyaltySummary(accountId: string): Promise<LoyaltySummary | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  // Get account points
  const { data: account, error: accountError } = await supabase
    .from('accounts')
    .select('points_balance, points_earned, points_spent, loyalty_tier')
    .eq('id', accountId)
    .single();

  if (accountError || !account) {
    console.error('[LoyaltyService] Get account error:', accountError);
    return null;
  }

  // Get tier info
  const tierInfo = await getTierForPoints(account.points_balance);

  if (!tierInfo) {
    return null;
  }

  // Get points breakdown from transactions
  const { data: breakdown } = await supabase
    .from('points_transactions')
    .select('points_type, points')
    .eq('account_id', accountId)
    .eq('transaction_type', 'earn');

  let consumerPoints = 0;
  let merchantPoints = 0;
  let contributorPoints = 0;

  (breakdown || []).forEach((t: { points_type: string; points: number }) => {
    if (t.points_type === 'consumer') consumerPoints += t.points;
    else if (t.points_type === 'merchant') merchantPoints += t.points;
    else if (t.points_type === 'contributor') contributorPoints += t.points;
  });

  return {
    totalPoints: account.points_balance,
    consumerPoints,
    merchantPoints,
    contributorPoints,
    currentTier: tierInfo,
    pointsToNextTier: tierInfo.pointsToNext || 0,
    nextTierName: tierInfo.nextTierName,
  };
}

// ============================================================================
// REWARD CATEGORIES
// ============================================================================

export const REWARD_CATEGORIES = {
  badges: 'Badges',
  discounts: 'Discounts',
  subscriptions: 'Subscriptions',
  exclusive: 'Exclusive',
  general: 'General',
};

export const REWARD_TYPES = {
  badge: 'Badge',
  discount_fixed: 'Fixed Discount',
  discount_percent: 'Percentage Discount',
  subscription_days: 'Subscription Days',
  feature_access: 'Feature Access',
  physical_item: 'Physical Item',
  experience: 'Experience',
  custom: 'Custom',
};

// ============================================================================
// LOGIN STREAK FUNCTIONS
// ============================================================================

/**
 * Get user's login streak info
 */
export async function getLoginStreak(accountId: string): Promise<LoginStreak> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastLoginDate: null,
      canClaimToday: true,
    };
  }

  const { data: streak } = await supabase
    .from('login_streaks')
    .select('*')
    .eq('account_id', accountId)
    .single();

  if (!streak) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastLoginDate: null,
      canClaimToday: true,
    };
  }

  const today = new Date().toISOString().split('T')[0];
  const canClaimToday = streak.last_login_date !== today;

  return {
    currentStreak: streak.current_streak,
    longestStreak: streak.longest_streak,
    lastLoginDate: streak.last_login_date,
    canClaimToday,
  };
}

/**
 * Record daily login and get streak points
 */
export async function recordDailyLogin(
  accountId: string
): Promise<{ pointsAwarded: number; currentStreak: number; message: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { pointsAwarded: 0, currentStreak: 0, message: 'Service not configured' };
  }

  const { data: pointsAwarded, error } = await supabase.rpc('record_daily_login', {
    p_account_id: accountId,
  });

  if (error) {
    console.error('[LoyaltyService] Record login error:', error);
    return { pointsAwarded: 0, currentStreak: 0, message: error.message };
  }

  // Get updated streak
  const streak = await getLoginStreak(accountId);

  return {
    pointsAwarded: pointsAwarded || 0,
    currentStreak: streak.currentStreak,
    message: pointsAwarded > 0
      ? `+${pointsAwarded} points for day ${streak.currentStreak} streak!`
      : 'Already claimed today',
  };
}
