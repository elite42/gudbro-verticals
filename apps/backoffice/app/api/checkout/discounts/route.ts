/**
 * Checkout Discounts API Routes
 *
 * POST /api/checkout/discounts - Calculate discounts for checkout
 * GET /api/checkout/discounts?action=rules&merchantId - Get stacking rules
 * POST /api/checkout/discounts (action: update-rules) - Update stacking rules
 * POST /api/checkout/discounts (action: finalize) - Finalize discounts after order
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  calculateCheckoutDiscounts,
  getStackingRules,
  updateStackingRules,
  finalizeOrderDiscounts,
  recordOrderDiscounts,
  getDiscountAnalytics,
  formatDiscountSummary,
  type CheckoutDiscountInput,
} from '@/lib/checkout-discount-service';

export const dynamic = 'force-dynamic';

/**
 * Check if user has merchant access
 */
async function hasMerchantAccess(accountId: string, merchantId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { data } = await supabase
    .from('account_roles')
    .select('role_type')
    .eq('account_id', accountId)
    .eq('tenant_id', merchantId)
    .eq('tenant_type', 'merchant')
    .eq('is_active', true)
    .maybeSingle();

  return !!data;
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Get stacking rules
    if (action === 'rules') {
      const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const rules = await getStackingRules(merchantId);
      return NextResponse.json({ rules });
    }

    // Get discount analytics
    if (action === 'analytics') {
      const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');

      const analytics = await getDiscountAnalytics(
        merchantId,
        startDate || undefined,
        endDate || undefined
      );

      return NextResponse.json({ analytics });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Checkout Discounts API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { action, merchantId } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Calculate discounts (for checkout preview)
    if (action === 'calculate') {
      const input: CheckoutDiscountInput = {
        merchant_id: merchantId,
        account_id: session?.user?.id,
        order_subtotal_cents: body.orderSubtotalCents || 0,
        promo_code: body.promoCode,
        coupon_codes: body.couponCodes,
        use_loyalty_points: body.useLoyaltyPoints,
        use_wallet_balance: body.useWalletBalance,
        wallet_id: body.walletId,
      };

      const result = await calculateCheckoutDiscounts(input);

      return NextResponse.json({
        ...result,
        summary_lines: formatDiscountSummary(result),
      });
    }

    // Update stacking rules (requires auth and merchant access)
    if (action === 'update-rules') {
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
      if (!hasAccess) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      const { rules } = body;
      const updated = await updateStackingRules(merchantId, rules);

      if (!updated) {
        return NextResponse.json({ error: 'Failed to update rules' }, { status: 500 });
      }

      return NextResponse.json({ rules: updated });
    }

    // Finalize discounts (after order completion)
    if (action === 'finalize') {
      const { orderId, appliedDiscounts, orderSubtotalCents } = body;

      if (!orderId || !appliedDiscounts) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      // Record discounts to order_discounts table
      await recordOrderDiscounts(orderId, merchantId, appliedDiscounts);

      // Mark promo codes/coupons as used
      await finalizeOrderDiscounts(
        orderId,
        session?.user?.id || null,
        appliedDiscounts,
        orderSubtotalCents
      );

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Checkout Discounts API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
