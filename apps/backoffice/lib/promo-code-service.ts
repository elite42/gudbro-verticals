/**
 * Promo Code Service
 *
 * Manages marketing promo codes with usage limits, targeting,
 * and campaign tracking.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// =====================================================
// Types
// =====================================================

export interface PromoCode {
  id: string;
  merchant_id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  free_item_id: string | null;
  max_discount_cents: number | null;
  min_order_cents: number;
  max_uses_total: number | null;
  max_uses_per_customer: number;
  current_uses: number;
  first_order_only: boolean;
  new_customers_only: boolean;
  status: PromoCodeStatus;
  valid_from: string;
  valid_until: string | null;
  applies_to: AppliesTo;
  applicable_category_ids: string[];
  applicable_product_ids: string[];
  is_stackable: boolean;
  campaign_name: string | null;
  campaign_source: string | null;
  created_at: string;
  updated_at: string;
}

export type DiscountType = 'percentage' | 'fixed_amount' | 'free_item';
export type PromoCodeStatus = 'draft' | 'active' | 'paused' | 'expired' | 'depleted';
export type AppliesTo = 'all' | 'categories' | 'products';

export interface PromoCodeRedemption {
  id: string;
  promo_code_id: string;
  merchant_id: string;
  order_id: string | null;
  account_id: string | null;
  discount_applied_cents: number;
  order_subtotal_cents: number;
  session_id: string | null;
  created_at: string;
}

export interface PromoCodeCreateInput {
  merchant_id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  free_item_id?: string;
  max_discount_cents?: number;
  min_order_cents?: number;
  max_uses_total?: number;
  max_uses_per_customer?: number;
  first_order_only?: boolean;
  new_customers_only?: boolean;
  status?: PromoCodeStatus;
  valid_from?: string;
  valid_until?: string;
  applies_to?: AppliesTo;
  applicable_category_ids?: string[];
  applicable_product_ids?: string[];
  is_stackable?: boolean;
  campaign_name?: string;
  campaign_source?: string;
}

export interface PromoCodeValidationResult {
  valid: boolean;
  error?: string;
  promo_code_id?: string;
  discount_type?: DiscountType;
  discount_value?: number;
  discount_cents?: number;
  free_item_id?: string | null;
  applies_to?: AppliesTo;
  applicable_category_ids?: string[];
  applicable_product_ids?: string[];
  is_stackable?: boolean;
  min_order_cents?: number;
}

export interface PromoCodeStats {
  total_redemptions: number;
  total_discount_cents: number;
  unique_customers: number;
  average_order_cents: number;
  redemptions_by_date: Array<{
    date: string;
    count: number;
    discount_cents: number;
  }>;
}

// =====================================================
// Promo Code CRUD
// =====================================================

/**
 * Create a promo code
 */
export async function createPromoCode(input: PromoCodeCreateInput): Promise<PromoCode | null> {
  const supabase = getSupabaseAdmin();

  // Validate code format (uppercase, alphanumeric)
  const normalizedCode = input.code.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (normalizedCode.length < 3 || normalizedCode.length > 20) {
    console.error('Invalid code format');
    return null;
  }

  // Check for duplicate code
  const { data: existing } = await supabase
    .from('promo_codes')
    .select('id')
    .eq('merchant_id', input.merchant_id)
    .eq('code', normalizedCode)
    .single();

  if (existing) {
    console.error('Promo code already exists');
    return null;
  }

  const { data, error } = await supabase
    .from('promo_codes')
    .insert({
      merchant_id: input.merchant_id,
      code: normalizedCode,
      discount_type: input.discount_type,
      discount_value: input.discount_value,
      free_item_id: input.free_item_id,
      max_discount_cents: input.max_discount_cents,
      min_order_cents: input.min_order_cents ?? 0,
      max_uses_total: input.max_uses_total,
      max_uses_per_customer: input.max_uses_per_customer ?? 1,
      first_order_only: input.first_order_only ?? false,
      new_customers_only: input.new_customers_only ?? false,
      status: input.status ?? 'draft',
      valid_from: input.valid_from ?? new Date().toISOString(),
      valid_until: input.valid_until,
      applies_to: input.applies_to ?? 'all',
      applicable_category_ids: input.applicable_category_ids ?? [],
      applicable_product_ids: input.applicable_product_ids ?? [],
      is_stackable: input.is_stackable ?? false,
      campaign_name: input.campaign_name,
      campaign_source: input.campaign_source,
    } as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating promo code:', error);
    return null;
  }

  return data as PromoCode;
}

/**
 * Get promo code by ID
 */
export async function getPromoCodeById(promoCodeId: string): Promise<PromoCode | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('id', promoCodeId)
    .single();

  if (error) {
    console.error('Error fetching promo code:', error);
    return null;
  }

  return data as PromoCode;
}

/**
 * Get promo code by code (for merchant)
 */
export async function getPromoCodeByCode(
  merchantId: string,
  code: string
): Promise<PromoCode | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('code', code.toUpperCase())
    .single();

  if (error) {
    console.error('Error fetching promo code by code:', error);
    return null;
  }

  return data as PromoCode;
}

/**
 * List promo codes for a merchant
 */
export async function listPromoCodes(
  merchantId: string,
  options: {
    status?: PromoCodeStatus;
    campaign_name?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ data: PromoCode[]; total: number }> {
  const supabase = getSupabaseAdmin();
  const { status, campaign_name, limit = 50, offset = 0 } = options;

  let query = supabase
    .from('promo_codes')
    .select('*', { count: 'exact' })
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq('status', status);
  }

  if (campaign_name) {
    query = query.eq('campaign_name', campaign_name);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error listing promo codes:', error);
    return { data: [], total: 0 };
  }

  return {
    data: (data as PromoCode[]) || [],
    total: count || 0,
  };
}

/**
 * Update a promo code
 */
export async function updatePromoCode(
  promoCodeId: string,
  updates: Partial<Omit<PromoCode, 'id' | 'merchant_id' | 'code' | 'created_at' | 'updated_at'>>
): Promise<PromoCode | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('promo_codes')
    .update(updates as Record<string, unknown>)
    .eq('id', promoCodeId)
    .select()
    .single();

  if (error) {
    console.error('Error updating promo code:', error);
    return null;
  }

  return data as PromoCode;
}

/**
 * Delete a promo code (only if not used)
 */
export async function deletePromoCode(promoCodeId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  // Check if has redemptions
  const { data: redemptions } = await supabase
    .from('promo_code_redemptions')
    .select('id')
    .eq('promo_code_id', promoCodeId)
    .limit(1);

  if (redemptions && redemptions.length > 0) {
    console.error('Cannot delete promo code with redemptions');
    return false;
  }

  const { error } = await supabase.from('promo_codes').delete().eq('id', promoCodeId);

  if (error) {
    console.error('Error deleting promo code:', error);
    return false;
  }

  return true;
}

// =====================================================
// Promo Code Validation & Usage
// =====================================================

/**
 * Validate a promo code for checkout
 */
export async function validatePromoCode(
  merchantId: string,
  code: string,
  orderSubtotalCents: number,
  accountId?: string
): Promise<PromoCodeValidationResult> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('validate_promo_code', {
    p_merchant_id: merchantId,
    p_code: code.toUpperCase(),
    p_account_id: accountId,
    p_order_subtotal_cents: orderSubtotalCents,
  });

  if (error) {
    console.error('Error validating promo code:', error);
    return { valid: false, error: error.message };
  }

  const result = data as PromoCodeValidationResult;
  return result;
}

/**
 * Use a promo code (after order completion)
 */
export async function usePromoCode(
  promoCodeId: string,
  orderId: string,
  accountId: string | null,
  discountCents: number,
  orderSubtotalCents: number
): Promise<string | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('use_promo_code', {
    p_promo_code_id: promoCodeId,
    p_order_id: orderId,
    p_account_id: accountId,
    p_discount_cents: discountCents,
    p_order_subtotal_cents: orderSubtotalCents,
  });

  if (error) {
    console.error('Error using promo code:', error);
    return null;
  }

  return data as string;
}

// =====================================================
// Promo Code Statistics
// =====================================================

/**
 * Get statistics for a promo code
 */
export async function getPromoCodeStats(promoCodeId: string): Promise<PromoCodeStats> {
  const supabase = getSupabaseAdmin();

  // Get redemptions
  const { data: redemptions, error } = await supabase
    .from('promo_code_redemptions')
    .select('*')
    .eq('promo_code_id', promoCodeId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching promo code stats:', error);
    return {
      total_redemptions: 0,
      total_discount_cents: 0,
      unique_customers: 0,
      average_order_cents: 0,
      redemptions_by_date: [],
    };
  }

  const stats: PromoCodeStats = {
    total_redemptions: redemptions?.length || 0,
    total_discount_cents: 0,
    unique_customers: 0,
    average_order_cents: 0,
    redemptions_by_date: [],
  };

  if (!redemptions || redemptions.length === 0) {
    return stats;
  }

  const uniqueCustomers = new Set<string>();
  let totalOrderCents = 0;
  const dateMap = new Map<string, { count: number; discount_cents: number }>();

  for (const redemption of redemptions) {
    stats.total_discount_cents += redemption.discount_applied_cents;
    totalOrderCents += redemption.order_subtotal_cents;

    if (redemption.account_id) {
      uniqueCustomers.add(redemption.account_id);
    }

    const date = redemption.created_at.split('T')[0];
    const existing = dateMap.get(date) || { count: 0, discount_cents: 0 };
    existing.count++;
    existing.discount_cents += redemption.discount_applied_cents;
    dateMap.set(date, existing);
  }

  stats.unique_customers = uniqueCustomers.size;
  stats.average_order_cents = Math.round(totalOrderCents / redemptions.length);
  stats.redemptions_by_date = Array.from(dateMap.entries()).map(([date, data]) => ({
    date,
    ...data,
  }));

  return stats;
}

/**
 * Get redemption history for a promo code
 */
export async function getPromoCodeRedemptions(
  promoCodeId: string,
  options: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ data: PromoCodeRedemption[]; total: number }> {
  const supabase = getSupabaseAdmin();
  const { limit = 50, offset = 0 } = options;

  const { data, error, count } = await supabase
    .from('promo_code_redemptions')
    .select('*', { count: 'exact' })
    .eq('promo_code_id', promoCodeId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching redemptions:', error);
    return { data: [], total: 0 };
  }

  return {
    data: (data as PromoCodeRedemption[]) || [],
    total: count || 0,
  };
}

// =====================================================
// Bulk Operations
// =====================================================

/**
 * Activate multiple promo codes
 */
export async function activatePromoCodes(promoCodeIds: string[]): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('promo_codes')
    .update({ status: 'active' } as Record<string, unknown>)
    .in('id', promoCodeIds)
    .eq('status', 'draft')
    .select('id');

  if (error) {
    console.error('Error activating promo codes:', error);
    return 0;
  }

  return data?.length || 0;
}

/**
 * Pause multiple promo codes
 */
export async function pausePromoCodes(promoCodeIds: string[]): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('promo_codes')
    .update({ status: 'paused' } as Record<string, unknown>)
    .in('id', promoCodeIds)
    .eq('status', 'active')
    .select('id');

  if (error) {
    console.error('Error pausing promo codes:', error);
    return 0;
  }

  return data?.length || 0;
}

/**
 * Expire old promo codes
 */
export async function expireOldPromoCodes(merchantId: string): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('promo_codes')
    .update({ status: 'expired' } as Record<string, unknown>)
    .eq('merchant_id', merchantId)
    .eq('status', 'active')
    .lt('valid_until', new Date().toISOString())
    .select('id');

  if (error) {
    console.error('Error expiring promo codes:', error);
    return 0;
  }

  return data?.length || 0;
}

// =====================================================
// Helpers
// =====================================================

/**
 * Format discount for display
 */
export function formatDiscount(promoCode: PromoCode, currency: string = 'EUR'): string {
  if (promoCode.discount_type === 'percentage') {
    return `${promoCode.discount_value}% off`;
  } else if (promoCode.discount_type === 'fixed_amount') {
    const amount = promoCode.discount_value / 100;
    return (
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(amount) + ' off'
    );
  } else {
    return 'Free item';
  }
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(promoCode: PromoCode, orderSubtotalCents: number): number {
  if (promoCode.discount_type === 'percentage') {
    let discount = Math.floor((orderSubtotalCents * promoCode.discount_value) / 100);
    if (promoCode.max_discount_cents && discount > promoCode.max_discount_cents) {
      discount = promoCode.max_discount_cents;
    }
    return discount;
  } else if (promoCode.discount_type === 'fixed_amount') {
    return Math.min(promoCode.discount_value, orderSubtotalCents);
  }
  return 0;
}
