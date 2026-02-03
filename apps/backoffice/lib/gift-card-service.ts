/**
 * Gift Card Service
 *
 * Manages gift card creation, purchase, delivery, and redemption.
 * Integrates with wallet system for redemption credits.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// =====================================================
// Types
// =====================================================

export interface GiftCard {
  id: string;
  merchant_id: string;
  code: string;
  amount_cents: number;
  currency: string;
  purchaser_account_id: string | null;
  purchaser_email: string | null;
  purchaser_name: string | null;
  recipient_email: string | null;
  recipient_name: string | null;
  recipient_message: string | null;
  recipient_phone: string | null;
  delivery_method: 'email' | 'sms' | 'print';
  delivery_sent_at: string | null;
  status: GiftCardStatus;
  redeemed_by_account_id: string | null;
  redeemed_at: string | null;
  redeemed_wallet_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  valid_from: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export type GiftCardStatus = 'pending' | 'active' | 'redeemed' | 'expired' | 'cancelled';

export interface GiftCardPreset {
  id: string;
  merchant_id: string;
  amount_cents: number;
  label: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface GiftCardSettings {
  id: string;
  merchant_id: string;
  is_enabled: boolean;
  allow_custom_amounts: boolean;
  min_amount_cents: number;
  max_amount_cents: number;
  default_expiry_months: number;
  email_delivery_enabled: boolean;
  sms_delivery_enabled: boolean;
  print_delivery_enabled: boolean;
  custom_design_url: string | null;
  custom_message_template: string | null;
  created_at: string;
  updated_at: string;
}

export interface GiftCardPurchaseInput {
  merchant_id: string;
  amount_cents: number;
  purchaser_account_id?: string;
  purchaser_email?: string;
  purchaser_name?: string;
  recipient_email?: string;
  recipient_name?: string;
  recipient_message?: string;
  recipient_phone?: string;
  delivery_method: 'email' | 'sms' | 'print';
}

export interface GiftCardRedemptionResult {
  success: boolean;
  error?: string;
  amount_cents?: number;
  currency?: string;
  wallet_id?: string;
  transaction_id?: string;
}

export interface GiftCardValidation {
  valid: boolean;
  error?: string;
  gift_card?: GiftCard;
}

// =====================================================
// Gift Card Settings
// =====================================================

/**
 * Get gift card settings for a merchant
 */
export async function getGiftCardSettings(merchantId: string): Promise<GiftCardSettings | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('gift_card_settings')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching gift card settings:', error);
    return null;
  }

  // Return defaults if not found
  if (!data) {
    return {
      id: '',
      merchant_id: merchantId,
      is_enabled: false,
      allow_custom_amounts: true,
      min_amount_cents: 1000,
      max_amount_cents: 50000,
      default_expiry_months: 12,
      email_delivery_enabled: true,
      sms_delivery_enabled: false,
      print_delivery_enabled: true,
      custom_design_url: null,
      custom_message_template: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  return data as GiftCardSettings;
}

/**
 * Update gift card settings for a merchant
 */
export async function updateGiftCardSettings(
  merchantId: string,
  settings: Partial<Omit<GiftCardSettings, 'id' | 'merchant_id' | 'created_at' | 'updated_at'>>
): Promise<GiftCardSettings | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('gift_card_settings')
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
    console.error('Error updating gift card settings:', error);
    return null;
  }

  return data as GiftCardSettings;
}

// =====================================================
// Gift Card Presets
// =====================================================

/**
 * Get gift card presets for a merchant
 */
export async function getGiftCardPresets(merchantId: string): Promise<GiftCardPreset[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('gift_card_presets')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching gift card presets:', error);
    return [];
  }

  return (data as GiftCardPreset[]) || [];
}

/**
 * Create or update gift card presets
 */
export async function upsertGiftCardPresets(
  merchantId: string,
  presets: Array<{
    amount_cents: number;
    label?: string;
    sort_order?: number;
  }>
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  // Deactivate existing presets
  await supabase
    .from('gift_card_presets')
    .update({ is_active: false } as Record<string, unknown>)
    .eq('merchant_id', merchantId);

  // Insert new presets
  const { error } = await supabase.from('gift_card_presets').insert(
    presets.map((preset, index) => ({
      merchant_id: merchantId,
      amount_cents: preset.amount_cents,
      label: preset.label,
      sort_order: preset.sort_order ?? index,
      is_active: true,
    })) as Record<string, unknown>[]
  );

  if (error) {
    console.error('Error upserting gift card presets:', error);
    return false;
  }

  return true;
}

/**
 * Create default presets for a merchant
 */
export async function createDefaultPresets(merchantId: string): Promise<boolean> {
  return upsertGiftCardPresets(merchantId, [
    { amount_cents: 1000, label: 'Small treat', sort_order: 0 },
    { amount_cents: 2500, label: 'Coffee lover', sort_order: 1 },
    { amount_cents: 5000, label: 'Perfect gift', sort_order: 2 },
    { amount_cents: 10000, label: 'Special occasion', sort_order: 3 },
  ]);
}

// =====================================================
// Gift Card CRUD
// =====================================================

/**
 * Create a gift card
 */
export async function createGiftCard(input: GiftCardPurchaseInput): Promise<GiftCard | null> {
  const supabase = getSupabaseAdmin();

  // Get settings for expiry
  const settings = await getGiftCardSettings(input.merchant_id);
  if (!settings) {
    console.error('Could not get gift card settings');
    return null;
  }

  // Validate amount
  if (input.amount_cents < settings.min_amount_cents) {
    console.error('Amount below minimum');
    return null;
  }
  if (input.amount_cents > settings.max_amount_cents) {
    console.error('Amount exceeds maximum');
    return null;
  }

  // Calculate expiry
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + settings.default_expiry_months);

  const { data, error } = await supabase
    .from('gift_cards')
    .insert({
      merchant_id: input.merchant_id,
      amount_cents: input.amount_cents,
      currency: 'EUR',
      purchaser_account_id: input.purchaser_account_id,
      purchaser_email: input.purchaser_email,
      purchaser_name: input.purchaser_name,
      recipient_email: input.recipient_email,
      recipient_name: input.recipient_name,
      recipient_message: input.recipient_message,
      recipient_phone: input.recipient_phone,
      delivery_method: input.delivery_method,
      status: 'pending', // Will become 'active' after payment
      expires_at: expiresAt.toISOString(),
    } as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating gift card:', error);
    return null;
  }

  return data as GiftCard;
}

/**
 * Get gift card by ID
 */
export async function getGiftCardById(giftCardId: string): Promise<GiftCard | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('gift_cards')
    .select('*')
    .eq('id', giftCardId)
    .single();

  if (error) {
    console.error('Error fetching gift card:', error);
    return null;
  }

  return data as GiftCard;
}

/**
 * Get gift card by code
 */
export async function getGiftCardByCode(code: string): Promise<GiftCard | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('gift_cards')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();

  if (error) {
    console.error('Error fetching gift card by code:', error);
    return null;
  }

  return data as GiftCard;
}

/**
 * List gift cards for a merchant
 */
export async function listGiftCards(
  merchantId: string,
  options: {
    status?: GiftCardStatus;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ data: GiftCard[]; total: number }> {
  const supabase = getSupabaseAdmin();
  const { status, limit = 50, offset = 0 } = options;

  let query = supabase
    .from('gift_cards')
    .select('*', { count: 'exact' })
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error listing gift cards:', error);
    return { data: [], total: 0 };
  }

  return {
    data: (data as GiftCard[]) || [],
    total: count || 0,
  };
}

/**
 * Activate a gift card (after payment)
 */
export async function activateGiftCard(
  giftCardId: string,
  stripePaymentIntentId?: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('gift_cards')
    .update({
      status: 'active',
      stripe_payment_intent_id: stripePaymentIntentId,
    } as Record<string, unknown>)
    .eq('id', giftCardId)
    .eq('status', 'pending');

  if (error) {
    console.error('Error activating gift card:', error);
    return false;
  }

  return true;
}

/**
 * Cancel a gift card
 */
export async function cancelGiftCard(giftCardId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('gift_cards')
    .update({ status: 'cancelled' } as Record<string, unknown>)
    .eq('id', giftCardId)
    .in('status', ['pending', 'active']);

  if (error) {
    console.error('Error cancelling gift card:', error);
    return false;
  }

  return true;
}

/**
 * Mark gift card delivery as sent
 */
export async function markDeliverySent(giftCardId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('gift_cards')
    .update({ delivery_sent_at: new Date().toISOString() } as Record<string, unknown>)
    .eq('id', giftCardId);

  if (error) {
    console.error('Error marking delivery sent:', error);
    return false;
  }

  return true;
}

// =====================================================
// Gift Card Validation & Redemption
// =====================================================

/**
 * Validate a gift card code
 */
export async function validateGiftCard(code: string): Promise<GiftCardValidation> {
  const giftCard = await getGiftCardByCode(code);

  if (!giftCard) {
    return { valid: false, error: 'Gift card not found' };
  }

  if (giftCard.status !== 'active') {
    return { valid: false, error: `Gift card is ${giftCard.status}` };
  }

  if (new Date(giftCard.expires_at) < new Date()) {
    return { valid: false, error: 'Gift card has expired' };
  }

  return { valid: true, gift_card: giftCard };
}

/**
 * Redeem a gift card to wallet (uses database function)
 */
export async function redeemGiftCard(
  code: string,
  accountId: string
): Promise<GiftCardRedemptionResult> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('redeem_gift_card', {
    p_code: code.toUpperCase(),
    p_account_id: accountId,
  });

  if (error) {
    console.error('Error redeeming gift card:', error);
    return { success: false, error: error.message };
  }

  const result = data as {
    success: boolean;
    error?: string;
    amount_cents?: number;
    currency?: string;
    wallet_id?: string;
    transaction_id?: string;
  };

  return result;
}

// =====================================================
// Gift Card Statistics
// =====================================================

/**
 * Get gift card statistics for a merchant
 */
export async function getGiftCardStats(merchantId: string): Promise<{
  total_sold: number;
  total_sold_cents: number;
  total_redeemed: number;
  total_redeemed_cents: number;
  total_active: number;
  total_active_cents: number;
  total_expired: number;
  total_expired_cents: number;
}> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('gift_cards')
    .select('status, amount_cents')
    .eq('merchant_id', merchantId)
    .in('status', ['active', 'redeemed', 'expired']);

  if (error) {
    console.error('Error fetching gift card stats:', error);
    return {
      total_sold: 0,
      total_sold_cents: 0,
      total_redeemed: 0,
      total_redeemed_cents: 0,
      total_active: 0,
      total_active_cents: 0,
      total_expired: 0,
      total_expired_cents: 0,
    };
  }

  const stats = {
    total_sold: data?.length || 0,
    total_sold_cents: 0,
    total_redeemed: 0,
    total_redeemed_cents: 0,
    total_active: 0,
    total_active_cents: 0,
    total_expired: 0,
    total_expired_cents: 0,
  };

  for (const card of data || []) {
    stats.total_sold_cents += card.amount_cents;

    if (card.status === 'active') {
      stats.total_active++;
      stats.total_active_cents += card.amount_cents;
    } else if (card.status === 'redeemed') {
      stats.total_redeemed++;
      stats.total_redeemed_cents += card.amount_cents;
    } else if (card.status === 'expired') {
      stats.total_expired++;
      stats.total_expired_cents += card.amount_cents;
    }
  }

  return stats;
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
 * Generate QR code data for a gift card
 */
export function generateGiftCardQRData(giftCard: GiftCard, baseUrl: string): string {
  return `${baseUrl}/redeem?code=${giftCard.code}`;
}
