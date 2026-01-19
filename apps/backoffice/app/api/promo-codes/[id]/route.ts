/**
 * Promo Code Single Item API Routes
 *
 * GET /api/promo-codes/[id] - Get promo code details
 * GET /api/promo-codes/[id]?action=stats - Get statistics
 * GET /api/promo-codes/[id]?action=redemptions - Get redemptions
 * PATCH /api/promo-codes/[id] - Update promo code
 * DELETE /api/promo-codes/[id] - Delete promo code
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  getPromoCodeById,
  updatePromoCode,
  deletePromoCode,
  getPromoCodeStats,
  getPromoCodeRedemptions,
  formatDiscount,
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

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const promoCode = await getPromoCodeById(id);

    if (!promoCode) {
      return NextResponse.json({ error: 'Promo code not found' }, { status: 404 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, promoCode.merchant_id);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Get statistics
    if (action === 'stats') {
      const stats = await getPromoCodeStats(id);
      return NextResponse.json({ stats });
    }

    // Get redemptions
    if (action === 'redemptions') {
      const limit = parseInt(searchParams.get('limit') || '50');
      const offset = parseInt(searchParams.get('offset') || '0');
      const { data, total } = await getPromoCodeRedemptions(id, { limit, offset });
      return NextResponse.json({ redemptions: data, total, limit, offset });
    }

    // Return promo code details
    return NextResponse.json({
      promo_code: {
        ...promoCode,
        discount_formatted: formatDiscount(promoCode),
        uses_remaining:
          promoCode.max_uses_total !== null
            ? promoCode.max_uses_total - promoCode.current_uses
            : null,
      },
    });
  } catch (error) {
    console.error('Promo Code API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const promoCode = await getPromoCodeById(id);

    if (!promoCode) {
      return NextResponse.json({ error: 'Promo code not found' }, { status: 404 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, promoCode.merchant_id);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const {
      id: _id,
      merchant_id: _merchantId,
      code: _code,
      created_at: _createdAt,
      updated_at: _updatedAt,
      current_uses: _currentUses,
      ...updates
    } = body;

    const updated = await updatePromoCode(id, updates);

    if (!updated) {
      return NextResponse.json({ error: 'Failed to update promo code' }, { status: 500 });
    }

    return NextResponse.json({
      promo_code: {
        ...updated,
        discount_formatted: formatDiscount(updated),
      },
    });
  } catch (error) {
    console.error('Promo Code API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const promoCode = await getPromoCodeById(id);

    if (!promoCode) {
      return NextResponse.json({ error: 'Promo code not found' }, { status: 404 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, promoCode.merchant_id);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const success = await deletePromoCode(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Cannot delete promo code with redemptions. Consider pausing instead.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Promo Code API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
