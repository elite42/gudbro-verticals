/**
 * Coupon Service
 *
 * Manages personalized coupons issued to specific customers.
 * Supports templates for bulk generation and auto-distribution triggers.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// =====================================================
// Types
// =====================================================

export interface CouponTemplate {
  id: string;
  merchant_id: string;
  name: string;
  description: string | null;
  code_prefix: string;
  discount_type: DiscountType;
  discount_value: number;
  free_item_id: string | null;
  max_discount_cents: number | null;
  min_order_cents: number;
  applies_to: AppliesTo;
  applicable_category_ids: string[];
  applicable_product_ids: string[];
  distribution_type: DistributionType;
  auto_trigger_config: Record<string, unknown>;
  validity_days: number;
  is_stackable: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  template_id: string | null;
  merchant_id: string;
  code: string;
  account_id: string;
  discount_type: DiscountType;
  discount_value: number;
  free_item_id: string | null;
  max_discount_cents: number | null;
  min_order_cents: number;
  applies_to: AppliesTo;
  applicable_category_ids: string[];
  applicable_product_ids: string[];
  is_stackable: boolean;
  status: CouponStatus;
  issued_at: string;
  valid_until: string;
  redeemed_at: string | null;
  redeemed_order_id: string | null;
  discount_applied_cents: number | null;
  issue_reason: string | null;
  issued_by: string | null;
  created_at: string;
  updated_at: string;
}

export type DiscountType = 'percentage' | 'fixed_amount' | 'free_item';
export type AppliesTo = 'all' | 'categories' | 'products';
export type CouponStatus = 'active' | 'used' | 'expired' | 'revoked';
export type DistributionType =
  | 'manual'
  | 'auto_birthday'
  | 'auto_inactivity'
  | 'auto_first_order'
  | 'auto_loyalty_tier';

export interface CouponTemplateCreateInput {
  merchant_id: string;
  name: string;
  description?: string;
  code_prefix?: string;
  discount_type: DiscountType;
  discount_value: number;
  free_item_id?: string;
  max_discount_cents?: number;
  min_order_cents?: number;
  applies_to?: AppliesTo;
  applicable_category_ids?: string[];
  applicable_product_ids?: string[];
  distribution_type?: DistributionType;
  auto_trigger_config?: Record<string, unknown>;
  validity_days?: number;
  is_stackable?: boolean;
}

export interface CouponValidationResult {
  valid: boolean;
  error?: string;
  coupon_id?: string;
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

export interface CouponWithAccount extends Coupon {
  account?: {
    id: string;
    email: string | null;
    display_name: string | null;
  };
}

// =====================================================
// Coupon Templates
// =====================================================

/**
 * Create a coupon template
 */
export async function createCouponTemplate(
  input: CouponTemplateCreateInput
): Promise<CouponTemplate | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('coupon_templates')
    .insert({
      merchant_id: input.merchant_id,
      name: input.name,
      description: input.description,
      code_prefix: input.code_prefix ?? 'CPN',
      discount_type: input.discount_type,
      discount_value: input.discount_value,
      free_item_id: input.free_item_id,
      max_discount_cents: input.max_discount_cents,
      min_order_cents: input.min_order_cents ?? 0,
      applies_to: input.applies_to ?? 'all',
      applicable_category_ids: input.applicable_category_ids ?? [],
      applicable_product_ids: input.applicable_product_ids ?? [],
      distribution_type: input.distribution_type ?? 'manual',
      auto_trigger_config: input.auto_trigger_config ?? {},
      validity_days: input.validity_days ?? 30,
      is_stackable: input.is_stackable ?? false,
      is_active: true,
    } as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating coupon template:', error);
    return null;
  }

  return data as CouponTemplate;
}

/**
 * Get coupon template by ID
 */
export async function getCouponTemplateById(templateId: string): Promise<CouponTemplate | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('coupon_templates')
    .select('*')
    .eq('id', templateId)
    .single();

  if (error) {
    console.error('Error fetching coupon template:', error);
    return null;
  }

  return data as CouponTemplate;
}

/**
 * List coupon templates for a merchant
 */
export async function listCouponTemplates(
  merchantId: string,
  options: {
    is_active?: boolean;
    distribution_type?: DistributionType;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ data: CouponTemplate[]; total: number }> {
  const supabase = getSupabaseAdmin();
  const { is_active, distribution_type, limit = 50, offset = 0 } = options;

  let query = supabase
    .from('coupon_templates')
    .select('*', { count: 'exact' })
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (is_active !== undefined) {
    query = query.eq('is_active', is_active);
  }

  if (distribution_type) {
    query = query.eq('distribution_type', distribution_type);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error listing coupon templates:', error);
    return { data: [], total: 0 };
  }

  return {
    data: (data as CouponTemplate[]) || [],
    total: count || 0,
  };
}

/**
 * Update a coupon template
 */
export async function updateCouponTemplate(
  templateId: string,
  updates: Partial<Omit<CouponTemplate, 'id' | 'merchant_id' | 'created_at' | 'updated_at'>>
): Promise<CouponTemplate | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('coupon_templates')
    .update(updates as Record<string, unknown>)
    .eq('id', templateId)
    .select()
    .single();

  if (error) {
    console.error('Error updating coupon template:', error);
    return null;
  }

  return data as CouponTemplate;
}

/**
 * Delete a coupon template (soft delete by deactivating)
 */
export async function deleteCouponTemplate(templateId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('coupon_templates')
    .update({ is_active: false } as Record<string, unknown>)
    .eq('id', templateId);

  if (error) {
    console.error('Error deleting coupon template:', error);
    return false;
  }

  return true;
}

// =====================================================
// Coupon Issuance
// =====================================================

/**
 * Issue a coupon from a template
 */
export async function issueCoupon(
  templateId: string,
  accountId: string,
  issueReason: string = 'manual',
  issuedBy?: string
): Promise<Coupon | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('issue_coupon', {
    p_template_id: templateId,
    p_account_id: accountId,
    p_issue_reason: issueReason,
    p_issued_by: issuedBy,
  });

  if (error) {
    console.error('Error issuing coupon:', error);
    return null;
  }

  // Fetch the created coupon
  if (data) {
    return getCouponById(data as string);
  }

  return null;
}

/**
 * Issue coupons to multiple customers (bulk)
 */
export async function bulkIssueCoupons(
  templateId: string,
  accountIds: string[],
  issueReason: string = 'manual',
  issuedBy?: string
): Promise<{ issued: number; failed: number }> {
  const results = { issued: 0, failed: 0 };

  for (const accountId of accountIds) {
    const coupon = await issueCoupon(templateId, accountId, issueReason, issuedBy);
    if (coupon) {
      results.issued++;
    } else {
      results.failed++;
    }
  }

  return results;
}

/**
 * Create a custom coupon (not from template)
 */
export async function createCustomCoupon(input: {
  merchant_id: string;
  account_id: string;
  discount_type: DiscountType;
  discount_value: number;
  free_item_id?: string;
  max_discount_cents?: number;
  min_order_cents?: number;
  applies_to?: AppliesTo;
  applicable_category_ids?: string[];
  applicable_product_ids?: string[];
  validity_days?: number;
  is_stackable?: boolean;
  issue_reason?: string;
  issued_by?: string;
}): Promise<Coupon | null> {
  const supabase = getSupabaseAdmin();

  // Generate unique code
  const { data: codeData } = await supabase.rpc('generate_coupon_code', {
    p_prefix: 'CPN',
  });

  const code = codeData as string;
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + (input.validity_days ?? 30));

  const { data, error } = await supabase
    .from('coupons')
    .insert({
      merchant_id: input.merchant_id,
      code,
      account_id: input.account_id,
      discount_type: input.discount_type,
      discount_value: input.discount_value,
      free_item_id: input.free_item_id,
      max_discount_cents: input.max_discount_cents,
      min_order_cents: input.min_order_cents ?? 0,
      applies_to: input.applies_to ?? 'all',
      applicable_category_ids: input.applicable_category_ids ?? [],
      applicable_product_ids: input.applicable_product_ids ?? [],
      is_stackable: input.is_stackable ?? false,
      valid_until: validUntil.toISOString(),
      issue_reason: input.issue_reason ?? 'manual',
      issued_by: input.issued_by,
    } as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating custom coupon:', error);
    return null;
  }

  return data as Coupon;
}

// =====================================================
// Coupon CRUD
// =====================================================

/**
 * Get coupon by ID
 */
export async function getCouponById(couponId: string): Promise<Coupon | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.from('coupons').select('*').eq('id', couponId).single();

  if (error) {
    console.error('Error fetching coupon:', error);
    return null;
  }

  return data as Coupon;
}

/**
 * Get coupon by code
 */
export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();

  if (error) {
    console.error('Error fetching coupon by code:', error);
    return null;
  }

  return data as Coupon;
}

/**
 * List coupons for a merchant
 */
export async function listCoupons(
  merchantId: string,
  options: {
    status?: CouponStatus;
    template_id?: string;
    account_id?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ data: Coupon[]; total: number }> {
  const supabase = getSupabaseAdmin();
  const { status, template_id, account_id, limit = 50, offset = 0 } = options;

  let query = supabase
    .from('coupons')
    .select('*', { count: 'exact' })
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq('status', status);
  }

  if (template_id) {
    query = query.eq('template_id', template_id);
  }

  if (account_id) {
    query = query.eq('account_id', account_id);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error listing coupons:', error);
    return { data: [], total: 0 };
  }

  return {
    data: (data as Coupon[]) || [],
    total: count || 0,
  };
}

/**
 * Get customer's active coupons
 */
export async function getCustomerCoupons(
  accountId: string,
  merchantId?: string
): Promise<Coupon[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('coupons')
    .select('*')
    .eq('account_id', accountId)
    .eq('status', 'active')
    .gt('valid_until', new Date().toISOString())
    .order('valid_until', { ascending: true });

  if (merchantId) {
    query = query.eq('merchant_id', merchantId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching customer coupons:', error);
    return [];
  }

  return (data as Coupon[]) || [];
}

/**
 * Revoke a coupon
 */
export async function revokeCoupon(couponId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('coupons')
    .update({ status: 'revoked' } as Record<string, unknown>)
    .eq('id', couponId)
    .eq('status', 'active');

  if (error) {
    console.error('Error revoking coupon:', error);
    return false;
  }

  return true;
}

// =====================================================
// Coupon Validation & Usage
// =====================================================

/**
 * Validate a coupon for checkout
 */
export async function validateCoupon(
  code: string,
  accountId: string,
  orderSubtotalCents: number
): Promise<CouponValidationResult> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('validate_coupon', {
    p_code: code.toUpperCase(),
    p_account_id: accountId,
    p_order_subtotal_cents: orderSubtotalCents,
  });

  if (error) {
    console.error('Error validating coupon:', error);
    return { valid: false, error: error.message };
  }

  return data as CouponValidationResult;
}

/**
 * Use a coupon (mark as used after order completion)
 */
export async function useCoupon(
  couponId: string,
  orderId: string,
  discountCents: number
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.rpc('use_coupon', {
    p_coupon_id: couponId,
    p_order_id: orderId,
    p_discount_cents: discountCents,
  });

  if (error) {
    console.error('Error using coupon:', error);
    return false;
  }

  return data as boolean;
}

// =====================================================
// Auto-Distribution
// =====================================================

/**
 * Get customers eligible for birthday coupons
 */
export async function getBirthdayCouponRecipients(
  merchantId: string,
  daysBefore: number = 7
): Promise<Array<{ account_id: string; birthday: string }>> {
  const supabase = getSupabaseAdmin();

  // Get customers with birthdays coming up
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysBefore);

  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  const { data, error } = await supabase
    .from('accounts')
    .select('id, date_of_birth')
    .not('date_of_birth', 'is', null)
    .filter(
      'date_of_birth',
      'ilike',
      `%-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    );

  if (error) {
    console.error('Error fetching birthday recipients:', error);
    return [];
  }

  // Filter to only include customers who have ordered from this merchant
  // and haven't already received a birthday coupon this year
  const recipients: Array<{ account_id: string; birthday: string }> = [];

  for (const account of data || []) {
    // Check if already has birthday coupon this year
    const { data: existingCoupon } = await supabase
      .from('coupons')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('account_id', account.id)
      .eq('issue_reason', 'birthday')
      .gte('issued_at', new Date(new Date().getFullYear(), 0, 1).toISOString())
      .limit(1);

    if (!existingCoupon || existingCoupon.length === 0) {
      recipients.push({
        account_id: account.id,
        birthday: account.date_of_birth,
      });
    }
  }

  return recipients;
}

/**
 * Get inactive customers for re-engagement coupons
 */
export async function getInactiveCustomers(
  merchantId: string,
  inactiveDays: number = 30
): Promise<string[]> {
  const supabase = getSupabaseAdmin();

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - inactiveDays);

  // Get customers who haven't ordered in X days
  const { data, error } = await supabase
    .from('orders')
    .select('account_id')
    .eq('merchant_id', merchantId)
    .lt('created_at', cutoffDate.toISOString())
    .not('account_id', 'is', null);

  if (error) {
    console.error('Error fetching inactive customers:', error);
    return [];
  }

  const accountIds = [...new Set((data || []).map((o) => o.account_id))];

  // Filter out those who already have an inactivity coupon
  const eligibleIds: string[] = [];

  for (const accountId of accountIds) {
    const { data: existingCoupon } = await supabase
      .from('coupons')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('account_id', accountId)
      .eq('issue_reason', 'inactivity')
      .eq('status', 'active')
      .limit(1);

    if (!existingCoupon || existingCoupon.length === 0) {
      eligibleIds.push(accountId);
    }
  }

  return eligibleIds;
}

/**
 * Process auto-distribution for a template
 */
export async function processAutoDistribution(templateId: string): Promise<number> {
  const template = await getCouponTemplateById(templateId);
  if (!template || !template.is_active) {
    return 0;
  }

  let recipients: string[] = [];

  if (template.distribution_type === 'auto_birthday') {
    const config = template.auto_trigger_config as { days_before?: number };
    const birthdayRecipients = await getBirthdayCouponRecipients(
      template.merchant_id,
      config.days_before ?? 7
    );
    recipients = birthdayRecipients.map((r) => r.account_id);
  } else if (template.distribution_type === 'auto_inactivity') {
    const config = template.auto_trigger_config as { inactive_days?: number };
    recipients = await getInactiveCustomers(template.merchant_id, config.inactive_days ?? 30);
  }

  if (recipients.length === 0) {
    return 0;
  }

  const result = await bulkIssueCoupons(
    templateId,
    recipients,
    template.distribution_type,
    undefined
  );

  return result.issued;
}

// =====================================================
// Statistics
// =====================================================

/**
 * Get coupon statistics for a merchant
 */
export async function getCouponStats(merchantId: string): Promise<{
  total_issued: number;
  total_used: number;
  total_active: number;
  total_expired: number;
  total_revoked: number;
  total_discount_cents: number;
  usage_rate: number;
}> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('coupons')
    .select('status, discount_applied_cents')
    .eq('merchant_id', merchantId);

  if (error) {
    console.error('Error fetching coupon stats:', error);
    return {
      total_issued: 0,
      total_used: 0,
      total_active: 0,
      total_expired: 0,
      total_revoked: 0,
      total_discount_cents: 0,
      usage_rate: 0,
    };
  }

  const stats = {
    total_issued: data?.length || 0,
    total_used: 0,
    total_active: 0,
    total_expired: 0,
    total_revoked: 0,
    total_discount_cents: 0,
    usage_rate: 0,
  };

  for (const coupon of data || []) {
    if (coupon.status === 'used') {
      stats.total_used++;
      stats.total_discount_cents += coupon.discount_applied_cents || 0;
    } else if (coupon.status === 'active') {
      stats.total_active++;
    } else if (coupon.status === 'expired') {
      stats.total_expired++;
    } else if (coupon.status === 'revoked') {
      stats.total_revoked++;
    }
  }

  stats.usage_rate =
    stats.total_issued > 0 ? Math.round((stats.total_used / stats.total_issued) * 100) : 0;

  return stats;
}

// =====================================================
// Helpers
// =====================================================

/**
 * Format discount for display
 */
export function formatDiscount(coupon: Coupon | CouponTemplate, currency: string = 'EUR'): string {
  if (coupon.discount_type === 'percentage') {
    return `${coupon.discount_value}% off`;
  } else if (coupon.discount_type === 'fixed_amount') {
    const amount = coupon.discount_value / 100;
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
export function calculateDiscount(coupon: Coupon, orderSubtotalCents: number): number {
  if (coupon.discount_type === 'percentage') {
    let discount = Math.floor((orderSubtotalCents * coupon.discount_value) / 100);
    if (coupon.max_discount_cents && discount > coupon.max_discount_cents) {
      discount = coupon.max_discount_cents;
    }
    return discount;
  } else if (coupon.discount_type === 'fixed_amount') {
    return Math.min(coupon.discount_value, orderSubtotalCents);
  }
  return 0;
}

/**
 * Expire old coupons
 */
export async function expireOldCoupons(merchantId: string): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('coupons')
    .update({ status: 'expired' } as Record<string, unknown>)
    .eq('merchant_id', merchantId)
    .eq('status', 'active')
    .lt('valid_until', new Date().toISOString())
    .select('id');

  if (error) {
    console.error('Error expiring coupons:', error);
    return 0;
  }

  return data?.length || 0;
}
