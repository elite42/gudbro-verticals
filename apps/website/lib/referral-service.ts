/**
 * Referral Service
 *
 * Handles referral invites, tracking, and rewards
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export interface ReferralStats {
  totalReferrals: number;
  pendingReferrals: number;
  successfulReferrals: number;
  totalPointsEarned: number;
  referralCode: string;
}

export interface Referral {
  referralId: string;
  referredEmail: string;
  referredName: string;
  referralType: string;
  status: 'pending' | 'signed_up' | 'qualified' | 'rewarded' | 'expired';
  pointsAwarded: number;
  createdAt: string;
  signedUpAt: string | null;
}

export interface ReferralInviteResult {
  success: boolean;
  referralId?: string;
  referralCode?: string;
  error?: string;
}

export interface ReferralValidation {
  isValid: boolean;
  referrerId?: string;
  referrerName?: string;
  error?: string;
}

export interface ProcessReferralResult {
  success: boolean;
  referrerId?: string;
  referrerPoints?: number;
  referredPoints?: number;
  error?: string;
}

// ============================================================================
// REFERRAL FUNCTIONS
// ============================================================================

/**
 * Get referral stats for the current user
 */
export async function getReferralStats(accountId: string): Promise<ReferralStats | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_referral_stats', {
    p_account_id: accountId,
  });

  if (error) {
    console.error('[ReferralService] Get stats error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const row = data[0];
  return {
    totalReferrals: row.total_referrals || 0,
    pendingReferrals: row.pending_referrals || 0,
    successfulReferrals: row.successful_referrals || 0,
    totalPointsEarned: row.total_points_earned || 0,
    referralCode: row.referral_code || '',
  };
}

/**
 * Get list of referrals made by user
 */
export async function getMyReferrals(
  accountId: string,
  limit: number = 50,
  offset: number = 0
): Promise<Referral[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_my_referrals', {
    p_account_id: accountId,
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    console.error('[ReferralService] Get referrals error:', error);
    return [];
  }

  return (data || []).map((r: any) => ({
    referralId: r.referral_id,
    referredEmail: r.referred_email,
    referredName: r.referred_name,
    referralType: r.referral_type,
    status: r.status,
    pointsAwarded: r.points_awarded || 0,
    createdAt: r.created_at,
    signedUpAt: r.signed_up_at,
  }));
}

/**
 * Create a referral invite for an email
 */
export async function createReferralInvite(
  accountId: string,
  email: string,
  referralType: string = 'consumer_to_consumer'
): Promise<ReferralInviteResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  const { data, error } = await supabase.rpc('create_referral_invite', {
    p_referrer_account_id: accountId,
    p_referred_email: email,
    p_referral_type: referralType,
  });

  if (error) {
    console.error('[ReferralService] Create invite error:', error);
    return { success: false, error: error.message };
  }

  if (!data || data.length === 0) {
    return { success: false, error: 'Unknown error' };
  }

  const result = data[0];
  return {
    success: result.success,
    referralId: result.referral_id,
    referralCode: result.referral_code,
    error: result.error_message,
  };
}

/**
 * Validate a referral code
 */
export async function validateReferralCode(code: string): Promise<ReferralValidation> {
  if (!isSupabaseConfigured || !supabase) {
    return { isValid: false, error: 'Supabase not configured' };
  }

  if (!code || code.length < 6) {
    return { isValid: false, error: 'Invalid code format' };
  }

  const { data, error } = await supabase.rpc('validate_referral_code', {
    p_code: code.toUpperCase(),
  });

  if (error) {
    console.error('[ReferralService] Validate code error:', error);
    return { isValid: false, error: error.message };
  }

  if (!data || data.length === 0) {
    return { isValid: false, error: 'Invalid referral code' };
  }

  const result = data[0];
  return {
    isValid: result.is_valid,
    referrerId: result.referrer_id,
    referrerName: result.referrer_name,
    error: result.error_message,
  };
}

/**
 * Process referral when user signs up with a code
 */
export async function processReferralSignup(
  referralCode: string,
  newAccountId: string
): Promise<ProcessReferralResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  const { data, error } = await supabase.rpc('process_referral_signup', {
    p_referral_code: referralCode.toUpperCase(),
    p_new_account_id: newAccountId,
  });

  if (error) {
    console.error('[ReferralService] Process signup error:', error);
    return { success: false, error: error.message };
  }

  if (!data || data.length === 0) {
    return { success: false, error: 'Unknown error' };
  }

  const result = data[0];
  return {
    success: result.success,
    referrerId: result.referrer_id,
    referrerPoints: result.referrer_points,
    referredPoints: result.referred_points,
    error: result.error_message,
  };
}

/**
 * Get referral leaderboard
 */
export async function getReferralLeaderboard(limit: number = 10): Promise<{
  rank: number;
  displayName: string;
  successfulReferrals: number;
  totalPointsEarned: number;
}[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('v_referral_leaderboard')
    .select('*')
    .limit(limit);

  if (error) {
    console.error('[ReferralService] Get leaderboard error:', error);
    return [];
  }

  return (data || []).map((r: any, index: number) => ({
    rank: index + 1,
    displayName: r.display_name || r.first_name || `User #${index + 1}`,
    successfulReferrals: r.successful_referrals || 0,
    totalPointsEarned: r.total_points_earned || 0,
  }));
}

/**
 * Generate shareable referral link
 */
export function generateReferralLink(referralCode: string): string {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://gudbro-website.vercel.app';

  return `${baseUrl}/signup?ref=${referralCode}`;
}

/**
 * Generate share text for social media
 */
export function generateShareText(referralCode: string, platform: 'whatsapp' | 'twitter' | 'email' | 'generic'): {
  text: string;
  url: string;
} {
  const link = generateReferralLink(referralCode);

  const messages = {
    whatsapp: `Unisciti a GUDBRO! Usa il mio codice ${referralCode} per ottenere 50 punti bonus. ${link}`,
    twitter: `Scopri GUDBRO, la piattaforma per menu digitali intelligenti! Usa il mio codice ${referralCode} per 50 punti bonus`,
    email: `Ciao!\n\nTi invito a provare GUDBRO, una fantastica app per scoprire menu personalizzati.\n\nUsa il mio codice referral: ${referralCode}\n\nOttieni 50 punti bonus alla registrazione!\n\n${link}`,
    generic: `Unisciti a GUDBRO con il mio codice ${referralCode} e ottieni 50 punti bonus! ${link}`,
  };

  return {
    text: messages[platform],
    url: link,
  };
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const REFERRAL_POINTS = {
  CONSUMER_TO_CONSUMER: {
    referrer: 100,
    referred: 50,
  },
  CONSUMER_TO_MERCHANT: {
    referrer: 500,
    referred: 0,
  },
  MERCHANT_TO_MERCHANT: {
    referrer: 1000,
    referred: 0,
  },
  MERCHANT_TO_CONSUMER: {
    referrer: 100,
    referred: 50,
  },
};

export const REFERRAL_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'In attesa', color: 'yellow' },
  signed_up: { label: 'Registrato', color: 'green' },
  qualified: { label: 'Qualificato', color: 'blue' },
  rewarded: { label: 'Premiato', color: 'purple' },
  expired: { label: 'Scaduto', color: 'gray' },
};
