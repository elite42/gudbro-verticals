/**
 * Loyalty Service
 *
 * P5 Phase 2: Unified Loyalty System
 *
 * Features:
 * - Fetch loyalty summary (points, tier, progress)
 * - Fetch transaction history
 * - Award points for various actions
 * - Track tier progress
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { getCurrentSession } from './auth-service';

// Types
export interface LoyaltySummary {
  accountId: string;
  email: string;
  displayName: string | null;
  totalPoints: number;
  consumerPoints: number;
  merchantPoints: number;
  contributorPoints: number;
  loyaltyTier: LoyaltyTier;
  pointsToNextTier: number;
  nextTier: LoyaltyTier | null;
  totalTransactions: number;
  lastTransactionAt: string | null;
  successfulReferrals: number;
}

export interface LoyaltyTransaction {
  id: string;
  accountId: string;
  transactionType: string;
  pointsChange: number;
  pointsType: 'consumer' | 'merchant' | 'contributor';
  balanceAfter: number;
  description: string | null;
  referenceType: string | null;
  referenceId: string | null;
  createdAt: string;
  actionDescription?: string;
}

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'founding';

export interface TierInfo {
  name: string;
  color: string;
  bgColor: string;
  minPoints: number;
  maxPoints: number | null;
  benefits: string[];
}

// Tier configuration
export const TIER_CONFIG: Record<LoyaltyTier, TierInfo> = {
  bronze: {
    name: 'Bronze',
    color: '#CD7F32',
    bgColor: 'bg-amber-100',
    minPoints: 0,
    maxPoints: 999,
    benefits: ['Basic rewards', 'Birthday bonus'],
  },
  silver: {
    name: 'Silver',
    color: '#C0C0C0',
    bgColor: 'bg-gray-200',
    minPoints: 1000,
    maxPoints: 4999,
    benefits: ['10% extra points', 'Early access to promotions', 'Priority support'],
  },
  gold: {
    name: 'Gold',
    color: '#FFD700',
    bgColor: 'bg-yellow-100',
    minPoints: 5000,
    maxPoints: 9999,
    benefits: ['25% extra points', 'Exclusive offers', 'Free delivery', 'VIP events'],
  },
  platinum: {
    name: 'Platinum',
    color: '#E5E4E2',
    bgColor: 'bg-slate-200',
    minPoints: 10000,
    maxPoints: null,
    benefits: ['50% extra points', 'Personal account manager', 'All Gold benefits', 'Lifetime perks'],
  },
  founding: {
    name: 'Founding Member',
    color: '#8B5CF6',
    bgColor: 'bg-purple-100',
    minPoints: 0,
    maxPoints: null,
    benefits: ['All Platinum benefits', 'Founding member badge', 'Special recognition'],
  },
};

// Action point values (fallback if DB not available)
export const ACTION_POINTS = {
  order_completed: 10, // per 10 EUR
  review_submitted: 25,
  social_share: 15,
  referral_consumer: 100,
  referral_merchant_bonus: 500,
  checkin: 5,
  first_order: 50,
  profile_complete: 150,
  welcome_bonus: 25,
  ingredient_contributed: 50,
  bug_report: 100,
  feature_adopted: 200,
};

/**
 * Fetch loyalty summary for current user
 */
export async function getLoyaltySummary(): Promise<LoyaltySummary | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const session = await getCurrentSession();
  if (!session?.user) return null;

  try {
    // First get account_id from auth_id
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (accountError || !account) {
      console.error('[LoyaltyService] Account not found:', accountError);
      return null;
    }

    // Fetch from v_loyalty_summary view
    const { data, error } = await supabase
      .from('v_loyalty_summary')
      .select('*')
      .eq('account_id', account.id)
      .single();

    if (error) {
      console.error('[LoyaltyService] Error fetching summary:', error);
      return null;
    }

    return {
      accountId: data.account_id,
      email: data.email,
      displayName: data.display_name,
      totalPoints: data.total_points,
      consumerPoints: data.consumer_points,
      merchantPoints: data.merchant_points,
      contributorPoints: data.contributor_points,
      loyaltyTier: data.loyalty_tier as LoyaltyTier,
      pointsToNextTier: data.points_to_next_tier,
      nextTier: data.next_tier as LoyaltyTier | null,
      totalTransactions: data.total_transactions,
      lastTransactionAt: data.last_transaction_at,
      successfulReferrals: data.successful_referrals,
    };
  } catch (err) {
    console.error('[LoyaltyService] Unexpected error:', err);
    return null;
  }
}

/**
 * Fetch recent loyalty transactions
 */
export async function getRecentTransactions(limit: number = 10): Promise<LoyaltyTransaction[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const session = await getCurrentSession();
  if (!session?.user) return [];

  try {
    // First get account_id
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!account) return [];

    const { data, error } = await supabase
      .from('loyalty_transactions')
      .select('*')
      .eq('account_id', account.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[LoyaltyService] Error fetching transactions:', error);
      return [];
    }

    return data.map((tx) => ({
      id: tx.id,
      accountId: tx.account_id,
      transactionType: tx.transaction_type,
      pointsChange: tx.points_change,
      pointsType: tx.points_type as 'consumer' | 'merchant' | 'contributor',
      balanceAfter: tx.balance_after,
      description: tx.description,
      referenceType: tx.reference_type,
      referenceId: tx.reference_id,
      createdAt: tx.created_at,
    }));
  } catch (err) {
    console.error('[LoyaltyService] Unexpected error:', err);
    return [];
  }
}

/**
 * Award points for social share
 */
export async function awardSocialShare(productId: string, platform: string): Promise<number> {
  if (!isSupabaseConfigured || !supabase) return 0;

  const session = await getCurrentSession();
  if (!session?.user) return 0;

  try {
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!account) return 0;

    const { data, error } = await supabase.rpc('loyalty_social_share', {
      p_account_id: account.id,
      p_product_id: productId,
      p_platform: platform,
    });

    if (error) {
      console.error('[LoyaltyService] Error awarding social share:', error);
      return 0;
    }

    return data || 0;
  } catch (err) {
    console.error('[LoyaltyService] Unexpected error:', err);
    return 0;
  }
}

/**
 * Award points for check-in
 */
export async function awardCheckin(merchantId: string): Promise<number> {
  if (!isSupabaseConfigured || !supabase) return 0;

  const session = await getCurrentSession();
  if (!session?.user) return 0;

  try {
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!account) return 0;

    const { data, error } = await supabase.rpc('loyalty_checkin', {
      p_account_id: account.id,
      p_merchant_id: merchantId,
    });

    if (error) {
      console.error('[LoyaltyService] Error awarding checkin:', error);
      return 0;
    }

    return data || 0;
  } catch (err) {
    console.error('[LoyaltyService] Unexpected error:', err);
    return 0;
  }
}

/**
 * Check and award profile completion bonus
 */
export async function checkProfileCompletionBonus(): Promise<number> {
  if (!isSupabaseConfigured || !supabase) return 0;

  const session = await getCurrentSession();
  if (!session?.user) return 0;

  try {
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (!account) return 0;

    const { data, error } = await supabase.rpc('loyalty_profile_complete', {
      p_account_id: account.id,
    });

    if (error) {
      console.error('[LoyaltyService] Error checking profile bonus:', error);
      return 0;
    }

    return data || 0;
  } catch (err) {
    console.error('[LoyaltyService] Unexpected error:', err);
    return 0;
  }
}

/**
 * Calculate tier progress percentage
 */
export function calculateTierProgress(summary: LoyaltySummary): number {
  const tierInfo = TIER_CONFIG[summary.loyaltyTier];
  const nextTierInfo = summary.nextTier ? TIER_CONFIG[summary.nextTier] : null;

  if (!nextTierInfo) return 100; // Already at max tier

  const pointsInCurrentTier = summary.totalPoints - tierInfo.minPoints;
  const pointsNeededForTier = nextTierInfo.minPoints - tierInfo.minPoints;

  return Math.min(100, Math.round((pointsInCurrentTier / pointsNeededForTier) * 100));
}

/**
 * Format transaction type for display
 */
export function formatTransactionType(type: string): string {
  const typeMap: Record<string, string> = {
    order_completed: 'Order',
    review_submitted: 'Review',
    social_share: 'Social Share',
    referral_consumer: 'Friend Referral',
    referral_merchant_bonus: 'Merchant Referral',
    checkin: 'Check-in',
    first_order: 'First Order Bonus',
    profile_complete: 'Profile Complete',
    welcome_bonus: 'Welcome Bonus',
    tier_bonus: 'Tier Upgrade Bonus',
    ingredient_contributed: 'Ingredient Contribution',
    bug_report: 'Bug Report',
    feature_adopted: 'Feature Suggestion',
    admin_adjustment: 'Adjustment',
    points_redeemed: 'Redeemed',
    points_expired: 'Expired',
  };

  return typeMap[type] || type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Get icon for transaction type
 */
export function getTransactionIcon(type: string): string {
  const iconMap: Record<string, string> = {
    order_completed: '🛒',
    review_submitted: '⭐',
    social_share: '📱',
    referral_consumer: '👥',
    referral_merchant_bonus: '🏪',
    checkin: '📍',
    first_order: '🎉',
    profile_complete: '✅',
    welcome_bonus: '🎁',
    tier_bonus: '🏆',
    ingredient_contributed: '🥗',
    bug_report: '🐛',
    feature_adopted: '💡',
    admin_adjustment: '⚙️',
    points_redeemed: '💰',
    points_expired: '⏰',
  };

  return iconMap[type] || '💎';
}
