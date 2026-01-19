/**
 * Checkout Discount Service
 *
 * Calculates and applies combined discounts at checkout.
 * Handles stacking rules, priority, and maximum discount limits.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { validatePromoCode, type PromoCodeValidationResult } from './promo-code-service';
import { validateCoupon, type CouponValidationResult } from './coupon-service';

// =====================================================
// Types
// =====================================================

export interface DiscountStackingRules {
  id: string;
  merchant_id: string;
  allow_promo_coupon_stack: boolean;
  allow_multiple_coupons: boolean;
  max_coupons_per_order: number;
  max_discount_percent: number;
  max_discount_cents: number | null;
  promo_code_priority: number;
  coupon_priority: number;
  loyalty_priority: number;
  wallet_after_discounts: boolean;
  created_at: string;
  updated_at: string;
}

export interface AppliedDiscount {
  source: 'promo_code' | 'coupon' | 'loyalty' | 'wallet';
  source_id: string;
  source_code: string;
  discount_type: 'percentage' | 'fixed_amount' | 'free_item';
  discount_value: number;
  discount_cents: number;
  free_item_id?: string | null;
  is_stackable: boolean;
  priority: number;
}

export interface CheckoutDiscountInput {
  merchant_id: string;
  account_id?: string;
  order_subtotal_cents: number;
  promo_code?: string;
  coupon_codes?: string[];
  use_loyalty_points?: boolean;
  use_wallet_balance?: boolean;
  wallet_id?: string;
}

export interface CheckoutDiscountResult {
  subtotal_cents: number;
  total_discount_cents: number;
  discounted_subtotal_cents: number;
  wallet_applied_cents: number;
  final_total_cents: number;
  applied_discounts: AppliedDiscount[];
  rejected_discounts: Array<{
    code: string;
    source: string;
    reason: string;
  }>;
  free_items: Array<{
    item_id: string;
    source: string;
    source_code: string;
  }>;
}

export type DiscountSource = 'promo_code' | 'coupon' | 'loyalty' | 'gift_card' | 'manual';

export interface OrderDiscountRecord {
  order_id: string;
  merchant_id: string;
  discount_source: DiscountSource;
  source_id: string;
  source_code: string;
  discount_applied_cents: number;
}

// =====================================================
// Stacking Rules
// =====================================================

/**
 * Get stacking rules for a merchant
 */
export async function getStackingRules(merchantId: string): Promise<DiscountStackingRules> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('discount_stacking_rules')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching stacking rules:', error);
  }

  // Return defaults if not found
  if (!data) {
    return {
      id: '',
      merchant_id: merchantId,
      allow_promo_coupon_stack: false,
      allow_multiple_coupons: false,
      max_coupons_per_order: 1,
      max_discount_percent: 50,
      max_discount_cents: null,
      promo_code_priority: 1,
      coupon_priority: 2,
      loyalty_priority: 3,
      wallet_after_discounts: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  return data as DiscountStackingRules;
}

/**
 * Update stacking rules for a merchant
 */
export async function updateStackingRules(
  merchantId: string,
  rules: Partial<Omit<DiscountStackingRules, 'id' | 'merchant_id' | 'created_at' | 'updated_at'>>
): Promise<DiscountStackingRules | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('discount_stacking_rules')
    .upsert(
      {
        merchant_id: merchantId,
        ...rules,
      } as Record<string, unknown>,
      { onConflict: 'merchant_id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error updating stacking rules:', error);
    return null;
  }

  return data as DiscountStackingRules;
}

// =====================================================
// Discount Calculation
// =====================================================

/**
 * Calculate all discounts for checkout
 */
export async function calculateCheckoutDiscounts(
  input: CheckoutDiscountInput
): Promise<CheckoutDiscountResult> {
  const result: CheckoutDiscountResult = {
    subtotal_cents: input.order_subtotal_cents,
    total_discount_cents: 0,
    discounted_subtotal_cents: input.order_subtotal_cents,
    wallet_applied_cents: 0,
    final_total_cents: input.order_subtotal_cents,
    applied_discounts: [],
    rejected_discounts: [],
    free_items: [],
  };

  // Get stacking rules
  const rules = await getStackingRules(input.merchant_id);

  // Collect all potential discounts
  const pendingDiscounts: AppliedDiscount[] = [];

  // 1. Validate promo code if provided
  if (input.promo_code) {
    const promoResult = await validatePromoCode(
      input.merchant_id,
      input.promo_code,
      input.order_subtotal_cents,
      input.account_id
    );

    if (promoResult.valid && promoResult.promo_code_id) {
      pendingDiscounts.push({
        source: 'promo_code',
        source_id: promoResult.promo_code_id,
        source_code: input.promo_code.toUpperCase(),
        discount_type: promoResult.discount_type!,
        discount_value: promoResult.discount_value!,
        discount_cents: promoResult.discount_cents!,
        free_item_id: promoResult.free_item_id,
        is_stackable: promoResult.is_stackable!,
        priority: rules.promo_code_priority,
      });
    } else {
      result.rejected_discounts.push({
        code: input.promo_code,
        source: 'promo_code',
        reason: promoResult.error || 'Invalid promo code',
      });
    }
  }

  // 2. Validate coupons if provided and account_id is available
  if (input.coupon_codes && input.account_id) {
    let validCouponCount = 0;

    for (const couponCode of input.coupon_codes) {
      // Check max coupons limit
      if (!rules.allow_multiple_coupons && validCouponCount >= 1) {
        result.rejected_discounts.push({
          code: couponCode,
          source: 'coupon',
          reason: 'Only one coupon allowed per order',
        });
        continue;
      }

      if (validCouponCount >= rules.max_coupons_per_order) {
        result.rejected_discounts.push({
          code: couponCode,
          source: 'coupon',
          reason: `Maximum ${rules.max_coupons_per_order} coupons per order`,
        });
        continue;
      }

      const couponResult = await validateCoupon(
        couponCode,
        input.account_id,
        input.order_subtotal_cents
      );

      if (couponResult.valid && couponResult.coupon_id) {
        pendingDiscounts.push({
          source: 'coupon',
          source_id: couponResult.coupon_id,
          source_code: couponCode.toUpperCase(),
          discount_type: couponResult.discount_type!,
          discount_value: couponResult.discount_value!,
          discount_cents: couponResult.discount_cents!,
          free_item_id: couponResult.free_item_id,
          is_stackable: couponResult.is_stackable!,
          priority: rules.coupon_priority,
        });
        validCouponCount++;
      } else {
        result.rejected_discounts.push({
          code: couponCode,
          source: 'coupon',
          reason: couponResult.error || 'Invalid coupon',
        });
      }
    }
  }

  // 3. Sort discounts by priority
  pendingDiscounts.sort((a, b) => a.priority - b.priority);

  // 4. Apply stacking rules
  let hasPromoCode = false;
  let hasCoupon = false;
  let currentSubtotal = input.order_subtotal_cents;

  for (const discount of pendingDiscounts) {
    // Check promo + coupon stacking
    if (discount.source === 'promo_code') {
      if (hasCoupon && !rules.allow_promo_coupon_stack) {
        result.rejected_discounts.push({
          code: discount.source_code,
          source: 'promo_code',
          reason: 'Cannot combine promo codes with coupons',
        });
        continue;
      }
      hasPromoCode = true;
    }

    if (discount.source === 'coupon') {
      if (hasPromoCode && !rules.allow_promo_coupon_stack && !discount.is_stackable) {
        result.rejected_discounts.push({
          code: discount.source_code,
          source: 'coupon',
          reason: 'Cannot combine coupons with promo codes',
        });
        continue;
      }
      hasCoupon = true;
    }

    // Calculate actual discount amount based on current subtotal
    let actualDiscountCents = discount.discount_cents;
    if (discount.discount_type === 'percentage') {
      actualDiscountCents = Math.floor((currentSubtotal * discount.discount_value) / 100);
    }

    // Ensure discount doesn't exceed current subtotal
    actualDiscountCents = Math.min(actualDiscountCents, currentSubtotal);

    // Handle free items
    if (discount.discount_type === 'free_item' && discount.free_item_id) {
      result.free_items.push({
        item_id: discount.free_item_id,
        source: discount.source,
        source_code: discount.source_code,
      });
    }

    discount.discount_cents = actualDiscountCents;
    result.applied_discounts.push(discount);
    result.total_discount_cents += actualDiscountCents;
    currentSubtotal -= actualDiscountCents;
  }

  // 5. Apply max discount limits
  const maxDiscountByPercent = Math.floor(
    (input.order_subtotal_cents * rules.max_discount_percent) / 100
  );
  let maxDiscount = maxDiscountByPercent;

  if (rules.max_discount_cents) {
    maxDiscount = Math.min(maxDiscount, rules.max_discount_cents);
  }

  if (result.total_discount_cents > maxDiscount) {
    // Scale down all discounts proportionally
    const scale = maxDiscount / result.total_discount_cents;
    for (const discount of result.applied_discounts) {
      discount.discount_cents = Math.floor(discount.discount_cents * scale);
    }
    result.total_discount_cents = maxDiscount;
  }

  result.discounted_subtotal_cents = input.order_subtotal_cents - result.total_discount_cents;

  // 6. Apply wallet balance if requested
  if (input.use_wallet_balance && input.wallet_id && rules.wallet_after_discounts) {
    const walletBalance = await getWalletBalance(input.wallet_id);
    if (walletBalance > 0) {
      result.wallet_applied_cents = Math.min(walletBalance, result.discounted_subtotal_cents);
    }
  }

  result.final_total_cents = result.discounted_subtotal_cents - result.wallet_applied_cents;

  return result;
}

/**
 * Get wallet balance (helper)
 */
async function getWalletBalance(walletId: string): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('customer_wallets')
    .select('balance_cents, bonus_balance_cents')
    .eq('id', walletId)
    .single();

  if (error) {
    return 0;
  }

  return (data?.balance_cents || 0) + (data?.bonus_balance_cents || 0);
}

// =====================================================
// Order Discount Recording
// =====================================================

/**
 * Record discounts applied to an order
 * Note: Wallet balance is tracked separately, not as a discount
 */
export async function recordOrderDiscounts(
  orderId: string,
  merchantId: string,
  appliedDiscounts: AppliedDiscount[]
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  // Filter out wallet discounts (tracked separately) and map to record format
  const records = appliedDiscounts
    .filter((d) => d.source !== 'wallet')
    .map((discount) => ({
      order_id: orderId,
      merchant_id: merchantId,
      discount_source: discount.source as DiscountSource,
      source_id: discount.source_id,
      source_code: discount.source_code,
      discount_applied_cents: discount.discount_cents,
    }));

  if (records.length === 0) {
    return true; // No discounts to record
  }

  const { error } = await supabase
    .from('order_discounts')
    .insert(records as unknown as Record<string, unknown>[]);

  if (error) {
    console.error('Error recording order discounts:', error);
    return false;
  }

  return true;
}

/**
 * Get discounts applied to an order
 */
export async function getOrderDiscounts(orderId: string): Promise<OrderDiscountRecord[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('order_discounts')
    .select('*')
    .eq('order_id', orderId);

  if (error) {
    console.error('Error fetching order discounts:', error);
    return [];
  }

  return (data as OrderDiscountRecord[]) || [];
}

// =====================================================
// Finalize Discounts (after order completion)
// =====================================================

/**
 * Finalize all discounts after order is confirmed
 * This marks promo codes/coupons as used
 */
export async function finalizeOrderDiscounts(
  orderId: string,
  accountId: string | null,
  appliedDiscounts: AppliedDiscount[],
  orderSubtotalCents: number
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  for (const discount of appliedDiscounts) {
    if (discount.source === 'promo_code') {
      // Use promo code
      await supabase.rpc('use_promo_code', {
        p_promo_code_id: discount.source_id,
        p_order_id: orderId,
        p_account_id: accountId,
        p_discount_cents: discount.discount_cents,
        p_order_subtotal_cents: orderSubtotalCents,
      });
    } else if (discount.source === 'coupon') {
      // Use coupon
      await supabase.rpc('use_coupon', {
        p_coupon_id: discount.source_id,
        p_order_id: orderId,
        p_discount_cents: discount.discount_cents,
      });
    }
  }

  return true;
}

// =====================================================
// Discount Analytics
// =====================================================

/**
 * Get discount analytics for a merchant
 */
export async function getDiscountAnalytics(
  merchantId: string,
  startDate?: string,
  endDate?: string
): Promise<{
  total_discounts_cents: number;
  promo_code_discounts_cents: number;
  coupon_discounts_cents: number;
  loyalty_discounts_cents: number;
  order_count: number;
  average_discount_cents: number;
  top_codes: Array<{ code: string; source: string; uses: number; total_cents: number }>;
}> {
  const supabase = getSupabaseAdmin();

  let query = supabase.from('order_discounts').select('*').eq('merchant_id', merchantId);

  if (startDate) {
    query = query.gte('applied_at', startDate);
  }

  if (endDate) {
    query = query.lte('applied_at', endDate);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching discount analytics:', error);
    return {
      total_discounts_cents: 0,
      promo_code_discounts_cents: 0,
      coupon_discounts_cents: 0,
      loyalty_discounts_cents: 0,
      order_count: 0,
      average_discount_cents: 0,
      top_codes: [],
    };
  }

  const analytics = {
    total_discounts_cents: 0,
    promo_code_discounts_cents: 0,
    coupon_discounts_cents: 0,
    loyalty_discounts_cents: 0,
    order_count: new Set<string>(),
    average_discount_cents: 0,
    top_codes: [] as Array<{ code: string; source: string; uses: number; total_cents: number }>,
  };

  const codeStats = new Map<string, { source: string; uses: number; total_cents: number }>();

  for (const discount of data || []) {
    analytics.total_discounts_cents += discount.discount_applied_cents;
    analytics.order_count.add(discount.order_id);

    if (discount.discount_source === 'promo_code') {
      analytics.promo_code_discounts_cents += discount.discount_applied_cents;
    } else if (discount.discount_source === 'coupon') {
      analytics.coupon_discounts_cents += discount.discount_applied_cents;
    } else if (discount.discount_source === 'loyalty') {
      analytics.loyalty_discounts_cents += discount.discount_applied_cents;
    }

    // Track code usage
    const key = `${discount.discount_source}:${discount.source_code}`;
    const existing = codeStats.get(key) || {
      source: discount.discount_source,
      uses: 0,
      total_cents: 0,
    };
    existing.uses++;
    existing.total_cents += discount.discount_applied_cents;
    codeStats.set(key, existing);
  }

  const orderCount = analytics.order_count.size;

  // Get top codes
  analytics.top_codes = Array.from(codeStats.entries())
    .map(([key, stats]) => ({
      code: key.split(':')[1],
      ...stats,
    }))
    .sort((a, b) => b.total_cents - a.total_cents)
    .slice(0, 10);

  return {
    total_discounts_cents: analytics.total_discounts_cents,
    promo_code_discounts_cents: analytics.promo_code_discounts_cents,
    coupon_discounts_cents: analytics.coupon_discounts_cents,
    loyalty_discounts_cents: analytics.loyalty_discounts_cents,
    order_count: orderCount,
    average_discount_cents:
      orderCount > 0 ? Math.round(analytics.total_discounts_cents / orderCount) : 0,
    top_codes: analytics.top_codes,
  };
}

// =====================================================
// Helpers
// =====================================================

/**
 * Format discount summary for display
 */
export function formatDiscountSummary(
  result: CheckoutDiscountResult,
  currency: string = 'EUR'
): string[] {
  const lines: string[] = [];

  for (const discount of result.applied_discounts) {
    const amount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(discount.discount_cents / 100);

    lines.push(`${discount.source_code}: -${amount}`);
  }

  if (result.wallet_applied_cents > 0) {
    const walletAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(result.wallet_applied_cents / 100);
    lines.push(`Wallet: -${walletAmount}`);
  }

  return lines;
}
