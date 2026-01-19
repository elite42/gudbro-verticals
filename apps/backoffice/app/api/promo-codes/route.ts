/**
 * Promo Codes API Routes
 *
 * GET /api/promo-codes?merchantId - List promo codes
 * POST /api/promo-codes - Create promo code
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  listPromoCodes,
  createPromoCode,
  formatDiscount,
  type PromoCodeStatus,
  type PromoCodeCreateInput,
} from '@/lib/promo-code-service';

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
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const status = searchParams.get('status') as PromoCodeStatus | null;
    const campaign_name = searchParams.get('campaign_name');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, total } = await listPromoCodes(merchantId, {
      status: status || undefined,
      campaign_name: campaign_name || undefined,
      limit,
      offset,
    });

    const formattedData = data.map((pc) => ({
      ...pc,
      discount_formatted: formatDiscount(pc),
      uses_remaining:
        pc.max_uses_total !== null ? pc.max_uses_total - pc.current_uses : 'Unlimited',
    }));

    return NextResponse.json({
      data: formattedData,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Promo Codes API error:', error);
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
    const { merchantId } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Validate required fields
    const { code, discount_type, discount_value } = body;

    if (!code || !discount_type || discount_value === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const input: PromoCodeCreateInput = {
      merchant_id: merchantId,
      code,
      discount_type,
      discount_value,
      free_item_id: body.free_item_id,
      max_discount_cents: body.max_discount_cents,
      min_order_cents: body.min_order_cents,
      max_uses_total: body.max_uses_total,
      max_uses_per_customer: body.max_uses_per_customer,
      first_order_only: body.first_order_only,
      new_customers_only: body.new_customers_only,
      status: body.status,
      valid_from: body.valid_from,
      valid_until: body.valid_until,
      applies_to: body.applies_to,
      applicable_category_ids: body.applicable_category_ids,
      applicable_product_ids: body.applicable_product_ids,
      is_stackable: body.is_stackable,
      campaign_name: body.campaign_name,
      campaign_source: body.campaign_source,
    };

    const promoCode = await createPromoCode(input);

    if (!promoCode) {
      return NextResponse.json({ error: 'Failed to create promo code' }, { status: 500 });
    }

    return NextResponse.json({
      promo_code: {
        ...promoCode,
        discount_formatted: formatDiscount(promoCode),
      },
    });
  } catch (error) {
    console.error('Promo Codes API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
