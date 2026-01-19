/**
 * Coupon Templates API Routes
 *
 * GET /api/coupons/templates?merchantId - List templates
 * POST /api/coupons/templates - Create template
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  listCouponTemplates,
  createCouponTemplate,
  updateCouponTemplate,
  deleteCouponTemplate,
  getCouponTemplateById,
  formatDiscount,
  type DistributionType,
  type CouponTemplateCreateInput,
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
    const merchantId = searchParams.get('merchantId');
    const templateId = searchParams.get('id');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get single template
    if (templateId) {
      const template = await getCouponTemplateById(templateId);
      if (!template || template.merchant_id !== merchantId) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 });
      }
      return NextResponse.json({
        template: {
          ...template,
          discount_formatted: formatDiscount(template),
        },
      });
    }

    // List templates
    const isActive = searchParams.get('is_active');
    const distributionType = searchParams.get('distribution_type') as DistributionType | null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, total } = await listCouponTemplates(merchantId, {
      is_active: isActive !== null ? isActive === 'true' : undefined,
      distribution_type: distributionType || undefined,
      limit,
      offset,
    });

    const formattedData = data.map((t) => ({
      ...t,
      discount_formatted: formatDiscount(t),
    }));

    return NextResponse.json({
      data: formattedData,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Coupon Templates API error:', error);
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
    const { name, discount_type, discount_value } = body;

    if (!name || !discount_type || discount_value === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const input: CouponTemplateCreateInput = {
      merchant_id: merchantId,
      name,
      description: body.description,
      code_prefix: body.code_prefix,
      discount_type,
      discount_value,
      free_item_id: body.free_item_id,
      max_discount_cents: body.max_discount_cents,
      min_order_cents: body.min_order_cents,
      applies_to: body.applies_to,
      applicable_category_ids: body.applicable_category_ids,
      applicable_product_ids: body.applicable_product_ids,
      distribution_type: body.distribution_type,
      auto_trigger_config: body.auto_trigger_config,
      validity_days: body.validity_days,
      is_stackable: body.is_stackable,
    };

    const template = await createCouponTemplate(input);

    if (!template) {
      return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }

    return NextResponse.json({
      template: {
        ...template,
        discount_formatted: formatDiscount(template),
      },
    });
  } catch (error) {
    console.error('Coupon Templates API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, merchantId } = body;

    if (!id || !merchantId) {
      return NextResponse.json({ error: 'Missing id or merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Verify template belongs to merchant
    const existing = await getCouponTemplateById(id);
    if (!existing || existing.merchant_id !== merchantId) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    // Remove fields that shouldn't be updated
    const {
      id: _id,
      merchant_id: _merchantId,
      created_at: _createdAt,
      updated_at: _updatedAt,
      ...updates
    } = body;

    const updated = await updateCouponTemplate(id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
    }

    return NextResponse.json({
      template: {
        ...updated,
        discount_formatted: formatDiscount(updated),
      },
    });
  } catch (error) {
    console.error('Coupon Templates API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const merchantId = searchParams.get('merchantId');

    if (!id || !merchantId) {
      return NextResponse.json({ error: 'Missing id or merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Verify template belongs to merchant
    const existing = await getCouponTemplateById(id);
    if (!existing || existing.merchant_id !== merchantId) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const success = await deleteCouponTemplate(id);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Coupon Templates API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
