/**
 * Wallet Service
 *
 * Customer wallet management with bonus top-ups.
 * Supports: Cash top-up, Stripe top-up, bonus tiers, balance usage
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Types
export interface CustomerWallet {
  id: string;
  account_id: string;
  merchant_id: string;
  balance_cents: number;
  bonus_balance_cents: number;
  currency: string;
  max_balance_cents: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  transaction_type: WalletTransactionType;
  amount_cents: number;
  bonus_amount_cents: number;
  balance_after_cents: number;
  bonus_balance_after_cents: number;
  reference_type: string | null;
  reference_id: string | null;
  stripe_payment_intent_id: string | null;
  description: string | null;
  processed_by: string | null;
  created_at: string;
  expires_at: string | null;
}

export type WalletTransactionType =
  | 'top_up_cash'
  | 'top_up_stripe'
  | 'top_up_bonus'
  | 'welcome_bonus'
  | 'referral_bonus'
  | 'payment'
  | 'refund'
  | 'expiry'
  | 'adjustment';

export interface WalletBonusTier {
  id: string;
  merchant_id: string;
  min_amount_cents: number;
  bonus_percent: number;
  max_bonus_cents: number | null;
  tier_name: string | null;
  is_active: boolean;
}

export interface WalletSettings {
  merchant_id: string;
  wallet_enabled: boolean;
  stripe_enabled: boolean;
  cash_enabled: boolean;
  min_top_up_cents: number;
  max_top_up_cents: number;
  max_balance_cents: number;
  welcome_bonus_cents: number;
  referral_bonus_inviter_cents: number;
  referral_bonus_invitee_cents: number;
  bonus_expiry_months: number;
  default_currency: string;
}

export interface TopUpSession {
  id: string;
  wallet_id: string;
  amount_cents: number;
  bonus_cents: number;
  currency: string;
  payment_method: 'stripe' | 'cash';
  stripe_checkout_session_id: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'expired' | 'cancelled';
  created_at: string;
  expires_at: string;
}

export interface WalletBalance {
  balance_cents: number;
  bonus_balance_cents: number;
  total_cents: number;
  currency: string;
  formatted: {
    balance: string;
    bonus: string;
    total: string;
  };
}

export interface BonusCalculation {
  bonus_cents: number;
  bonus_percent: number;
  tier_name: string | null;
  total_cents: number;
}

// =====================================================
// Wallet Management
// =====================================================

/**
 * Get or create wallet for a customer at a merchant
 */
export async function getOrCreateWallet(
  accountId: string,
  merchantId: string
): Promise<CustomerWallet | null> {
  const supabase = getSupabaseAdmin();

  // Try to get existing wallet
  const { data: existingWallet } = await supabase
    .from('customer_wallets')
    .select('*')
    .eq('account_id', accountId)
    .eq('merchant_id', merchantId)
    .single();

  if (existingWallet) {
    return existingWallet as CustomerWallet;
  }

  // Get merchant settings for defaults
  const { data: settings } = await supabase
    .from('wallet_settings')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  // Create new wallet
  const { data: newWallet, error } = await supabase
    .from('customer_wallets')
    .insert({
      account_id: accountId,
      merchant_id: merchantId,
      currency: settings?.default_currency || 'EUR',
      max_balance_cents: settings?.max_balance_cents || 100000,
    } as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating wallet:', error);
    return null;
  }

  return newWallet as CustomerWallet;
}

/**
 * Get wallet by ID
 */
export async function getWalletById(walletId: string): Promise<CustomerWallet | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('customer_wallets')
    .select('*')
    .eq('id', walletId)
    .single();

  if (error) {
    console.error('Error fetching wallet:', error);
    return null;
  }

  return data as CustomerWallet;
}

/**
 * Get wallet balance with formatting
 */
export async function getWalletBalance(
  accountId: string,
  merchantId: string
): Promise<WalletBalance | null> {
  const wallet = await getOrCreateWallet(accountId, merchantId);

  if (!wallet) {
    return null;
  }

  const totalCents = wallet.balance_cents + wallet.bonus_balance_cents;

  return {
    balance_cents: wallet.balance_cents,
    bonus_balance_cents: wallet.bonus_balance_cents,
    total_cents: totalCents,
    currency: wallet.currency,
    formatted: {
      balance: formatCurrency(wallet.balance_cents, wallet.currency),
      bonus: formatCurrency(wallet.bonus_balance_cents, wallet.currency),
      total: formatCurrency(totalCents, wallet.currency),
    },
  };
}

// =====================================================
// Bonus Tiers
// =====================================================

/**
 * Get bonus tiers for a merchant
 */
export async function getBonusTiers(merchantId: string): Promise<WalletBonusTier[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('wallet_bonus_tiers')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('is_active', true)
    .order('min_amount_cents', { ascending: true });

  if (error) {
    console.error('Error fetching bonus tiers:', error);
    return [];
  }

  return (data as WalletBonusTier[]) || [];
}

/**
 * Calculate bonus for a top-up amount
 */
export async function calculateBonus(
  merchantId: string,
  amountCents: number
): Promise<BonusCalculation> {
  const tiers = await getBonusTiers(merchantId);

  // Find the highest qualifying tier
  let matchedTier: WalletBonusTier | null = null;

  for (const tier of tiers) {
    if (amountCents >= tier.min_amount_cents) {
      matchedTier = tier;
    }
  }

  if (!matchedTier) {
    return {
      bonus_cents: 0,
      bonus_percent: 0,
      tier_name: null,
      total_cents: amountCents,
    };
  }

  let bonusCents = Math.floor((amountCents * matchedTier.bonus_percent) / 100);

  // Apply max bonus cap if set
  if (matchedTier.max_bonus_cents && bonusCents > matchedTier.max_bonus_cents) {
    bonusCents = matchedTier.max_bonus_cents;
  }

  return {
    bonus_cents: bonusCents,
    bonus_percent: matchedTier.bonus_percent,
    tier_name: matchedTier.tier_name,
    total_cents: amountCents + bonusCents,
  };
}

/**
 * Create or update bonus tiers for a merchant
 */
export async function upsertBonusTiers(
  merchantId: string,
  tiers: Array<{
    min_amount_cents: number;
    bonus_percent: number;
    max_bonus_cents?: number;
    tier_name?: string;
  }>
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  // Deactivate existing tiers
  await supabase
    .from('wallet_bonus_tiers')
    .update({ is_active: false } as Record<string, unknown>)
    .eq('merchant_id', merchantId);

  // Insert new tiers
  const { error } = await supabase.from('wallet_bonus_tiers').insert(
    tiers.map((tier) => ({
      merchant_id: merchantId,
      min_amount_cents: tier.min_amount_cents,
      bonus_percent: tier.bonus_percent,
      max_bonus_cents: tier.max_bonus_cents,
      tier_name: tier.tier_name,
      is_active: true,
    })) as Record<string, unknown>[]
  );

  if (error) {
    console.error('Error upserting bonus tiers:', error);
    return false;
  }

  return true;
}

/**
 * Create default bonus tiers for a merchant
 */
export async function createDefaultBonusTiers(merchantId: string): Promise<boolean> {
  return upsertBonusTiers(merchantId, [
    { min_amount_cents: 5000, bonus_percent: 5, tier_name: 'Bronze' },
    { min_amount_cents: 10000, bonus_percent: 10, tier_name: 'Silver' },
    { min_amount_cents: 20000, bonus_percent: 15, tier_name: 'Gold' },
  ]);
}

// =====================================================
// Top-Up Operations
// =====================================================

/**
 * Create a top-up session for Stripe checkout
 */
export async function createTopUpSession(
  walletId: string,
  amountCents: number,
  paymentMethod: 'stripe' | 'cash' = 'stripe'
): Promise<TopUpSession | null> {
  const supabase = getSupabaseAdmin();

  // Get wallet to find merchant
  const wallet = await getWalletById(walletId);
  if (!wallet) {
    return null;
  }

  // Calculate bonus
  const bonus = await calculateBonus(wallet.merchant_id, amountCents);

  // Check if would exceed max balance
  const newTotal =
    wallet.balance_cents + wallet.bonus_balance_cents + amountCents + bonus.bonus_cents;
  if (newTotal > wallet.max_balance_cents) {
    console.error('Top-up would exceed max balance');
    return null;
  }

  // Create session
  const { data, error } = await supabase
    .from('wallet_top_up_sessions')
    .insert({
      wallet_id: walletId,
      amount_cents: amountCents,
      bonus_cents: bonus.bonus_cents,
      currency: wallet.currency,
      payment_method: paymentMethod,
      status: 'pending',
      expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
    } as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating top-up session:', error);
    return null;
  }

  return data as TopUpSession;
}

/**
 * Process a cash top-up (immediate)
 */
export async function processCashTopUp(
  walletId: string,
  amountCents: number,
  processedBy: string,
  notes?: string
): Promise<string | null> {
  const supabase = getSupabaseAdmin();

  // Get wallet
  const wallet = await getWalletById(walletId);
  if (!wallet) {
    return null;
  }

  // Calculate bonus
  const bonus = await calculateBonus(wallet.merchant_id, amountCents);

  // Create session for tracking
  const session = await createTopUpSession(walletId, amountCents, 'cash');
  if (!session) {
    return null;
  }

  // Process top-up using database function
  const { data, error } = await supabase.rpc('process_wallet_top_up', {
    p_wallet_id: walletId,
    p_amount_cents: amountCents,
    p_bonus_cents: bonus.bonus_cents,
    p_transaction_type: 'top_up_cash',
    p_processed_by: processedBy,
    p_description: notes || 'Cash top-up',
    p_reference_id: session.id,
  });

  if (error) {
    console.error('Error processing cash top-up:', error);

    // Mark session as failed
    await supabase
      .from('wallet_top_up_sessions')
      .update({ status: 'failed', error_message: error.message } as Record<string, unknown>)
      .eq('id', session.id);

    return null;
  }

  // Mark session as completed
  await supabase
    .from('wallet_top_up_sessions')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      processed_by: processedBy,
    } as Record<string, unknown>)
    .eq('id', session.id);

  return data as string;
}

/**
 * Complete a Stripe top-up (called from webhook)
 */
export async function completeStripeTopUp(
  sessionId: string,
  stripePaymentIntentId: string
): Promise<string | null> {
  const supabase = getSupabaseAdmin();

  // Get the top-up session
  const { data: session, error: sessionError } = await supabase
    .from('wallet_top_up_sessions')
    .select('*')
    .eq('id', sessionId)
    .single();

  if (sessionError || !session) {
    console.error('Top-up session not found:', sessionError);
    return null;
  }

  const topUpSession = session as TopUpSession;

  if (topUpSession.status !== 'pending' && topUpSession.status !== 'processing') {
    console.error('Session already processed:', topUpSession.status);
    return null;
  }

  // Process top-up
  const { data, error } = await supabase.rpc('process_wallet_top_up', {
    p_wallet_id: topUpSession.wallet_id,
    p_amount_cents: topUpSession.amount_cents,
    p_bonus_cents: topUpSession.bonus_cents,
    p_transaction_type: 'top_up_stripe',
    p_stripe_payment_intent_id: stripePaymentIntentId,
    p_description: 'Stripe top-up',
    p_reference_id: sessionId,
  });

  if (error) {
    console.error('Error processing Stripe top-up:', error);

    await supabase
      .from('wallet_top_up_sessions')
      .update({ status: 'failed', error_message: error.message } as Record<string, unknown>)
      .eq('id', sessionId);

    return null;
  }

  // Mark session as completed
  await supabase
    .from('wallet_top_up_sessions')
    .update({
      status: 'completed',
      stripe_payment_intent_id: stripePaymentIntentId,
      completed_at: new Date().toISOString(),
    } as Record<string, unknown>)
    .eq('id', sessionId);

  return data as string;
}

// =====================================================
// Wallet Usage
// =====================================================

/**
 * Use wallet balance for payment
 */
export async function useWalletForPayment(
  walletId: string,
  amountCents: number,
  referenceType: string,
  referenceId: string,
  description?: string
): Promise<string | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('use_wallet_balance', {
    p_wallet_id: walletId,
    p_amount_cents: amountCents,
    p_reference_type: referenceType,
    p_reference_id: referenceId,
    p_description: description,
  });

  if (error) {
    console.error('Error using wallet balance:', error);
    return null;
  }

  return data as string;
}

/**
 * Refund to wallet
 */
export async function refundToWallet(
  walletId: string,
  amountCents: number,
  referenceType: string,
  referenceId: string,
  description?: string
): Promise<string | null> {
  const supabase = getSupabaseAdmin();

  // Get current wallet state
  const wallet = await getWalletById(walletId);
  if (!wallet) {
    return null;
  }

  const newBalance = wallet.balance_cents + amountCents;

  // Update wallet
  const { error: updateError } = await supabase
    .from('customer_wallets')
    .update({
      balance_cents: newBalance,
      updated_at: new Date().toISOString(),
    } as Record<string, unknown>)
    .eq('id', walletId);

  if (updateError) {
    console.error('Error updating wallet:', updateError);
    return null;
  }

  // Create transaction
  const { data, error } = await supabase
    .from('wallet_transactions')
    .insert({
      wallet_id: walletId,
      transaction_type: 'refund',
      amount_cents: amountCents,
      bonus_amount_cents: 0,
      balance_after_cents: newBalance,
      bonus_balance_after_cents: wallet.bonus_balance_cents,
      reference_type: referenceType,
      reference_id: referenceId,
      description: description || 'Refund',
    } as Record<string, unknown>)
    .select('id')
    .single();

  if (error) {
    console.error('Error creating refund transaction:', error);
    return null;
  }

  return (data as { id: string }).id;
}

// =====================================================
// Transaction History
// =====================================================

/**
 * Get wallet transactions
 */
export async function getWalletTransactions(
  walletId: string,
  options: {
    limit?: number;
    offset?: number;
    type?: WalletTransactionType;
  } = {}
): Promise<WalletTransaction[]> {
  const supabase = getSupabaseAdmin();
  const { limit = 50, offset = 0, type } = options;

  let query = supabase
    .from('wallet_transactions')
    .select('*')
    .eq('wallet_id', walletId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (type) {
    query = query.eq('transaction_type', type);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }

  return (data as WalletTransaction[]) || [];
}

// =====================================================
// Wallet Settings
// =====================================================

/**
 * Get wallet settings for a merchant
 */
export async function getWalletSettings(merchantId: string): Promise<WalletSettings | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('wallet_settings')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching wallet settings:', error);
    return null;
  }

  // Return defaults if not found
  if (!data) {
    return {
      merchant_id: merchantId,
      wallet_enabled: true,
      stripe_enabled: true,
      cash_enabled: true,
      min_top_up_cents: 1000,
      max_top_up_cents: 50000,
      max_balance_cents: 100000,
      welcome_bonus_cents: 500,
      referral_bonus_inviter_cents: 1000,
      referral_bonus_invitee_cents: 500,
      bonus_expiry_months: 12,
      default_currency: 'EUR',
    };
  }

  return data as WalletSettings;
}

/**
 * Update wallet settings for a merchant
 */
export async function updateWalletSettings(
  merchantId: string,
  settings: Partial<Omit<WalletSettings, 'merchant_id'>>
): Promise<WalletSettings | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('wallet_settings')
    .upsert(
      {
        merchant_id: merchantId,
        ...settings,
      } as Record<string, unknown>,
      { onConflict: 'merchant_id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error updating wallet settings:', error);
    return null;
  }

  return data as WalletSettings;
}

// =====================================================
// Helpers
// =====================================================

/**
 * Format cents to currency string.
 * Wraps @gudbro/utils formatPriceFromMinor with EUR default for backward compatibility.
 */
import { formatPriceFromMinor } from '@gudbro/utils';
export function formatCurrency(cents: number, currency: string = 'EUR'): string {
  return formatPriceFromMinor(cents, currency);
}

/**
 * Parse currency string to cents
 */
export function parseCurrencyToCents(value: string | number): number {
  if (typeof value === 'number') {
    return Math.round(value * 100);
  }

  const cleaned = value.replace(/[^0-9.,]/g, '').replace(',', '.');
  const amount = parseFloat(cleaned);

  if (isNaN(amount)) {
    return 0;
  }

  return Math.round(amount * 100);
}
