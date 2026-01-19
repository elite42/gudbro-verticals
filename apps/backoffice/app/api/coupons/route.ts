/**
 * Coupons API Routes
 *
 * GET /api/coupons?merchantId - List issued coupons
 * GET /api/coupons?action=stats&merchantId - Get statistics
 * GET /api/coupons?action=customer&accountId - Get customer's coupons (PWA)
 * POST /api/coupons - Issue coupon(s) or create custom coupon
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  listCoupons,
  issueCoupon,
  bulkIssueCoupons,
  createCustomCoupon,
  getCustomerCoupons,
  getCouponStats,
  formatDiscount,
  type CouponStatus,
} from '@/lib/coupon-service';

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
    const accountId = searchParams.get('accountId');

    // Get customer's coupons (for PWA)
    if (action === 'customer') {
      const targetAccountId = accountId || session.user.id;

      // Users can only see their own coupons unless they have merchant access
      if (targetAccountId !== session.user.id && merchantId) {
        const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
        if (!hasAccess) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
      }

      const coupons = await getCustomerCoupons(targetAccountId, merchantId || undefined);
      const formattedCoupons = coupons.map((c) => ({
        ...c,
        discount_formatted: formatDiscount(c),
      }));

      return NextResponse.json({ coupons: formattedCoupons });
    }

    // For other actions, require merchantId
    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get statistics
    if (action === 'stats') {
      const stats = await getCouponStats(merchantId);
      return NextResponse.json({ stats });
    }

    // List coupons (default)
    const status = searchParams.get('status') as CouponStatus | null;
    const templateId = searchParams.get('templateId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, total } = await listCoupons(merchantId, {
      status: status || undefined,
      template_id: templateId || undefined,
      account_id: accountId || undefined,
      limit,
      offset,
    });

    const formattedData = data.map((c) => ({
      ...c,
      discount_formatted: formatDiscount(c),
    }));

    return NextResponse.json({
      data: formattedData,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Coupons API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, merchantId } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Issue coupon from template
    if (action === 'issue') {
      const { templateId, accountId, issueReason } = body;

      if (!templateId || !accountId) {
        return NextResponse.json({ error: 'Missing templateId or accountId' }, { status: 400 });
      }

      const coupon = await issueCoupon(
        templateId,
        accountId,
        issueReason || 'manual',
        session.user.id
      );

      if (!coupon) {
        return NextResponse.json({ error: 'Failed to issue coupon' }, { status: 500 });
      }

      return NextResponse.json({
        coupon: {
          ...coupon,
          discount_formatted: formatDiscount(coupon),
        },
      });
    }

    // Bulk issue coupons
    if (action === 'bulk-issue') {
      const { templateId, accountIds, issueReason } = body;

      if (!templateId || !accountIds || !Array.isArray(accountIds)) {
        return NextResponse.json({ error: 'Missing templateId or accountIds' }, { status: 400 });
      }

      const result = await bulkIssueCoupons(
        templateId,
        accountIds,
        issueReason || 'manual',
        session.user.id
      );

      return NextResponse.json({
        issued: result.issued,
        failed: result.failed,
        total: accountIds.length,
      });
    }

    // Create custom coupon
    if (action === 'create-custom') {
      const { accountId, discount_type, discount_value, validity_days } = body;

      if (!accountId || !discount_type || discount_value === undefined) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      const coupon = await createCustomCoupon({
        merchant_id: merchantId,
        account_id: accountId,
        discount_type,
        discount_value,
        free_item_id: body.free_item_id,
        max_discount_cents: body.max_discount_cents,
        min_order_cents: body.min_order_cents,
        applies_to: body.applies_to,
        applicable_category_ids: body.applicable_category_ids,
        applicable_product_ids: body.applicable_product_ids,
        validity_days: validity_days || 30,
        is_stackable: body.is_stackable,
        issue_reason: body.issue_reason || 'manual',
        issued_by: session.user.id,
      });

      if (!coupon) {
        return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
      }

      return NextResponse.json({
        coupon: {
          ...coupon,
          discount_formatted: formatDiscount(coupon),
        },
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Coupons API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
