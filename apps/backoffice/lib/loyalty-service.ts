/**
 * Loyalty Service
 *
 * Customer loyalty points management with tiers and bonuses.
 * Supports: Points earning, redemption, tier progression, profile completion incentives.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Types
export interface LoyaltyProgram {
  id: string;
  merchant_id: string;
  name: string;
  points_per_currency: number;
  currency_code: string;
  is_active: boolean;
  tiers: LoyaltyTier[];
  profile_completion_bonus_points: number;
  profile_completion_bonus_enabled: boolean;
  resident_signup_bonus: number;
  tourist_signup_bonus: number;
  resident_multiplier: number;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyTier {
  name: string;
  min_points: number;
  multiplier: number;
}

export interface CustomerLoyaltyAccount {
  id: string;
  account_id: string;
  merchant_id: string;
  points_balance: number;
  lifetime_points: number;
  current_tier: string;
  tier_updated_at: string | null;
  profile_completed_at: string | null;
  profile_completion_bonus_awarded: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoyaltyTransaction {
  id: string;
  loyalty_account_id: string;
  transaction_type: LoyaltyTransactionType;
  points: number;
  balance_after: number;
  reference_type: string | null;
  reference_id: string | null;
  notes: string | null;
  processed_by: string | null;
  created_at: string;
}

export type LoyaltyTransactionType =
  | 'earn_purchase'
  | 'earn_bonus'
  | 'earn_referral'
  | 'earn_engagement'
  | 'earn_profile_complete'
  | 'earn_signup'
  | 'redeem'
  | 'expire'
  | 'adjustment';

export interface LoyaltyAccountWithProgram extends CustomerLoyaltyAccount {
  program?: LoyaltyProgram;
  account?: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
    profile_completion_pct: number;
  };
}

// =====================================================
// PROGRAM MANAGEMENT
// =====================================================

/**
 * Get or create loyalty program for merchant
 */
export async function getOrCreateProgram(merchantId: string): Promise<LoyaltyProgram | null> {
  const supabase = getSupabaseAdmin();

  // Try to get existing program
  const { data: existing, error: fetchError } = await supabase
    .from('loyalty_programs')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (existing && !fetchError) {
    return existing as LoyaltyProgram;
  }

  // Create new program with defaults
  const { data: created, error: createError } = await supabase
    .from('loyalty_programs')
    .insert({
      merchant_id: merchantId,
    })
    .select()
    .single();

  if (createError) {
    console.error('[Loyalty] Failed to create program:', createError);
    return null;
  }

  return created as LoyaltyProgram;
}

/**
 * Update loyalty program settings
 */
export async function updateProgram(
  merchantId: string,
  updates: Partial<LoyaltyProgram>
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('loyalty_programs')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('merchant_id', merchantId);

  if (error) {
    console.error('[Loyalty] Failed to update program:', error);
    return false;
  }

  return true;
}

// =====================================================
// CUSTOMER LOYALTY ACCOUNTS
// =====================================================

/**
 * Get or create customer loyalty account
 */
export async function getOrCreateAccount(
  accountId: string,
  merchantId: string
): Promise<CustomerLoyaltyAccount | null> {
  const supabase = getSupabaseAdmin();

  // Try to get existing
  const { data: existing } = await supabase
    .from('customer_loyalty_accounts')
    .select('*')
    .eq('account_id', accountId)
    .eq('merchant_id', merchantId)
    .single();

  if (existing) {
    return existing as CustomerLoyaltyAccount;
  }

  // Create new
  const { data: created, error } = await supabase
    .from('customer_loyalty_accounts')
    .insert({
      account_id: accountId,
      merchant_id: merchantId,
    })
    .select()
    .single();

  if (error) {
    console.error('[Loyalty] Failed to create account:', error);
    return null;
  }

  return created as CustomerLoyaltyAccount;
}

/**
 * Get customer loyalty account with program and account info
 */
export async function getAccountWithDetails(
  accountId: string,
  merchantId: string
): Promise<LoyaltyAccountWithProgram | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('customer_loyalty_accounts')
    .select(
      `
      *,
      program:loyalty_programs(*),
      account:accounts(full_name, email, phone, profile_completion_pct)
    `
    )
    .eq('account_id', accountId)
    .eq('merchant_id', merchantId)
    .single();

  if (error) {
    console.error('[Loyalty] Failed to get account details:', error);
    return null;
  }

  return data as LoyaltyAccountWithProgram;
}

/**
 * Get all loyalty accounts for a merchant
 */
export async function getMerchantAccounts(
  merchantId: string,
  options?: {
    tier?: string;
    minPoints?: number;
    limit?: number;
    offset?: number;
  }
): Promise<LoyaltyAccountWithProgram[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('customer_loyalty_accounts')
    .select(
      `
      *,
      account:accounts(full_name, email, phone, profile_completion_pct, delivery_city)
    `
    )
    .eq('merchant_id', merchantId)
    .order('lifetime_points', { ascending: false });

  if (options?.tier) {
    query = query.eq('current_tier', options.tier);
  }

  if (options?.minPoints) {
    query = query.gte('points_balance', options.minPoints);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Loyalty] Failed to get merchant accounts:', error);
    return [];
  }

  return (data || []) as LoyaltyAccountWithProgram[];
}

// =====================================================
// POINTS OPERATIONS
// =====================================================

/**
 * Award points to customer
 */
export async function awardPoints(
  accountId: string,
  merchantId: string,
  points: number,
  transactionType: LoyaltyTransactionType,
  options?: {
    referenceType?: string;
    referenceId?: string;
    notes?: string;
    processedBy?: string;
  }
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  const supabase = getSupabaseAdmin();

  // Get or create loyalty account
  const loyaltyAccount = await getOrCreateAccount(accountId, merchantId);
  if (!loyaltyAccount) {
    return { success: false, error: 'Failed to get loyalty account' };
  }

  const newBalance = loyaltyAccount.points_balance + points;
  const newLifetime = loyaltyAccount.lifetime_points + (points > 0 ? points : 0);

  // Create transaction
  const { error: txError } = await supabase.from('loyalty_point_transactions').insert({
    loyalty_account_id: loyaltyAccount.id,
    transaction_type: transactionType,
    points,
    balance_after: newBalance,
    reference_type: options?.referenceType,
    reference_id: options?.referenceId,
    notes: options?.notes,
    processed_by: options?.processedBy,
  });

  if (txError) {
    console.error('[Loyalty] Failed to create transaction:', txError);
    return { success: false, error: 'Failed to create transaction' };
  }

  // Update account balance
  const program = await getOrCreateProgram(merchantId);
  const newTier = calculateTier(newLifetime, program?.tiers || []);

  const { error: updateError } = await supabase
    .from('customer_loyalty_accounts')
    .update({
      points_balance: newBalance,
      lifetime_points: newLifetime,
      current_tier: newTier,
      tier_updated_at:
        newTier !== loyaltyAccount.current_tier
          ? new Date().toISOString()
          : loyaltyAccount.tier_updated_at,
      updated_at: new Date().toISOString(),
    })
    .eq('id', loyaltyAccount.id);

  if (updateError) {
    console.error('[Loyalty] Failed to update account:', updateError);
    return { success: false, error: 'Failed to update account balance' };
  }

  return { success: true, newBalance };
}

/**
 * Redeem points
 */
export async function redeemPoints(
  accountId: string,
  merchantId: string,
  points: number,
  options?: {
    referenceType?: string;
    referenceId?: string;
    notes?: string;
    processedBy?: string;
  }
): Promise<{ success: boolean; newBalance?: number; error?: string }> {
  const supabase = getSupabaseAdmin();

  // Get loyalty account
  const { data: loyaltyAccount } = await supabase
    .from('customer_loyalty_accounts')
    .select('*')
    .eq('account_id', accountId)
    .eq('merchant_id', merchantId)
    .single();

  if (!loyaltyAccount) {
    return { success: false, error: 'Loyalty account not found' };
  }

  if (loyaltyAccount.points_balance < points) {
    return { success: false, error: 'Insufficient points' };
  }

  // Use negative points for redemption
  return awardPoints(accountId, merchantId, -points, 'redeem', {
    ...options,
    notes: options?.notes || `Redeemed ${points} points`,
  });
}

/**
 * Award points for purchase
 */
export async function awardPurchasePoints(
  accountId: string,
  merchantId: string,
  amountCents: number,
  orderId?: string
): Promise<{ success: boolean; points?: number; error?: string }> {
  const program = await getOrCreateProgram(merchantId);
  if (!program || !program.is_active) {
    return { success: false, error: 'Loyalty program not active' };
  }

  // Calculate base points
  const amountCurrency = amountCents / 100;
  let points = Math.floor(amountCurrency * program.points_per_currency);

  // Check if customer is resident for bonus multiplier
  const supabase = getSupabaseAdmin();
  const { data: account } = await supabase
    .from('accounts')
    .select('is_resident')
    .eq('id', accountId)
    .single();

  if (account?.is_resident && program.resident_multiplier > 1) {
    points = Math.floor(points * program.resident_multiplier);
  }

  // Get tier multiplier
  const loyaltyAccount = await getOrCreateAccount(accountId, merchantId);
  if (loyaltyAccount) {
    const tierMultiplier = getTierMultiplier(loyaltyAccount.current_tier, program.tiers);
    points = Math.floor(points * tierMultiplier);
  }

  if (points <= 0) {
    return { success: true, points: 0 }; // No points for small purchases
  }

  const result = await awardPoints(accountId, merchantId, points, 'earn_purchase', {
    referenceType: 'order',
    referenceId: orderId,
    notes: `${points} points for €${amountCurrency.toFixed(2)} purchase`,
  });

  return {
    success: result.success,
    points: result.success ? points : undefined,
    error: result.error,
  };
}

/**
 * Award signup bonus (resident vs tourist)
 */
export async function awardSignupBonus(
  accountId: string,
  merchantId: string,
  isResident: boolean
): Promise<{ success: boolean; points?: number; error?: string }> {
  const program = await getOrCreateProgram(merchantId);
  if (!program || !program.is_active) {
    return { success: false, error: 'Loyalty program not active' };
  }

  const points = isResident ? program.resident_signup_bonus : program.tourist_signup_bonus;

  if (points <= 0) {
    return { success: true, points: 0 };
  }

  const result = await awardPoints(accountId, merchantId, points, 'earn_signup', {
    referenceType: 'signup',
    notes: `Signup bonus (${isResident ? 'resident' : 'tourist'})`,
  });

  return {
    success: result.success,
    points: result.success ? points : undefined,
    error: result.error,
  };
}

/**
 * Award profile completion bonus
 */
export async function awardProfileCompletionBonus(
  accountId: string,
  merchantId: string
): Promise<{ success: boolean; points?: number; error?: string }> {
  const supabase = getSupabaseAdmin();

  // Check profile completion
  const { data: account } = await supabase
    .from('accounts')
    .select('profile_completion_pct')
    .eq('id', accountId)
    .single();

  if (!account || account.profile_completion_pct < 100) {
    return { success: false, error: 'Profile not complete' };
  }

  // Check if already awarded
  const { data: loyaltyAccount } = await supabase
    .from('customer_loyalty_accounts')
    .select('profile_completion_bonus_awarded')
    .eq('account_id', accountId)
    .eq('merchant_id', merchantId)
    .single();

  if (loyaltyAccount?.profile_completion_bonus_awarded) {
    return { success: false, error: 'Bonus already awarded' };
  }

  // Get program
  const program = await getOrCreateProgram(merchantId);
  if (!program || !program.is_active || !program.profile_completion_bonus_enabled) {
    return { success: false, error: 'Profile bonus not enabled' };
  }

  const points = program.profile_completion_bonus_points;
  if (points <= 0) {
    return { success: true, points: 0 };
  }

  const result = await awardPoints(accountId, merchantId, points, 'earn_profile_complete', {
    referenceType: 'profile_completion',
    notes: 'Bonus for completing profile',
  });

  if (result.success) {
    // Mark as awarded
    await supabase
      .from('customer_loyalty_accounts')
      .update({
        profile_completed_at: new Date().toISOString(),
        profile_completion_bonus_awarded: true,
      })
      .eq('account_id', accountId)
      .eq('merchant_id', merchantId);
  }

  return {
    success: result.success,
    points: result.success ? points : undefined,
    error: result.error,
  };
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/**
 * Calculate tier based on lifetime points
 */
function calculateTier(lifetimePoints: number, tiers: LoyaltyTier[]): string {
  if (!tiers || tiers.length === 0) {
    return 'Bronze';
  }

  // Sort tiers by min_points descending
  const sortedTiers = [...tiers].sort((a, b) => b.min_points - a.min_points);

  for (const tier of sortedTiers) {
    if (lifetimePoints >= tier.min_points) {
      return tier.name;
    }
  }

  return tiers[0]?.name || 'Bronze';
}

/**
 * Get tier multiplier
 */
function getTierMultiplier(tierName: string, tiers: LoyaltyTier[]): number {
  const tier = tiers.find((t) => t.name === tierName);
  return tier?.multiplier || 1.0;
}

/**
 * Get transaction history for customer
 */
export async function getTransactionHistory(
  accountId: string,
  merchantId: string,
  options?: {
    limit?: number;
    offset?: number;
    transactionType?: LoyaltyTransactionType;
  }
): Promise<LoyaltyTransaction[]> {
  const supabase = getSupabaseAdmin();

  // Get loyalty account first
  const { data: loyaltyAccount } = await supabase
    .from('customer_loyalty_accounts')
    .select('id')
    .eq('account_id', accountId)
    .eq('merchant_id', merchantId)
    .single();

  if (!loyaltyAccount) {
    return [];
  }

  let query = supabase
    .from('loyalty_point_transactions')
    .select('*')
    .eq('loyalty_account_id', loyaltyAccount.id)
    .order('created_at', { ascending: false });

  if (options?.transactionType) {
    query = query.eq('transaction_type', options.transactionType);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[Loyalty] Failed to get transactions:', error);
    return [];
  }

  return (data || []) as LoyaltyTransaction[];
}

/**
 * Get loyalty stats for merchant dashboard
 */
export async function getMerchantLoyaltyStats(merchantId: string): Promise<{
  totalMembers: number;
  activeMembers: number;
  totalPointsIssued: number;
  totalPointsRedeemed: number;
  tierBreakdown: Record<string, number>;
}> {
  const supabase = getSupabaseAdmin();

  // Get total members
  const { count: totalMembers } = await supabase
    .from('customer_loyalty_accounts')
    .select('*', { count: 'exact', head: true })
    .eq('merchant_id', merchantId);

  // Get active members (earned points in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: activeData } = await supabase
    .from('loyalty_point_transactions')
    .select('loyalty_account_id')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .in('transaction_type', ['earn_purchase', 'earn_bonus', 'earn_engagement']);

  const activeMembers = new Set(activeData?.map((t) => t.loyalty_account_id)).size;

  // Get tier breakdown
  const { data: tierData } = await supabase
    .from('customer_loyalty_accounts')
    .select('current_tier')
    .eq('merchant_id', merchantId);

  const tierBreakdown: Record<string, number> = {};
  tierData?.forEach((account) => {
    tierBreakdown[account.current_tier] = (tierBreakdown[account.current_tier] || 0) + 1;
  });

  // Get points issued/redeemed
  const { data: pointsData } = await supabase
    .from('customer_loyalty_accounts')
    .select('lifetime_points, points_balance')
    .eq('merchant_id', merchantId);

  const totalPointsIssued = pointsData?.reduce((sum, a) => sum + a.lifetime_points, 0) || 0;
  const totalPointsRedeemed =
    pointsData?.reduce((sum, a) => sum + (a.lifetime_points - a.points_balance), 0) || 0;

  return {
    totalMembers: totalMembers || 0,
    activeMembers,
    totalPointsIssued,
    totalPointsRedeemed,
    tierBreakdown,
  };
}
