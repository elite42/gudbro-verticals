import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * POST /api/subscriptions/promo
 * Validate and apply a promo code
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();
    const { code, subscriptionId } = body;

    if (!code) {
      return NextResponse.json({ error: 'code required' }, { status: 400 });
    }

    // Apply promo code
    const { data: result, error } = await supabase.rpc('apply_promo_code', {
      p_account_id: account.id,
      p_code: code,
      p_subscription_id: subscriptionId || null,
    });

    if (error) {
      console.error('[PromoAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const promoResult = result?.[0];

    if (!promoResult?.success) {
      return NextResponse.json(
        { error: promoResult?.message || 'Invalid promo code' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      discountType: promoResult.discount_type,
      discountValue: promoResult.discount_value,
      message: promoResult.message,
    });
  } catch (err) {
    console.error('[PromoAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/subscriptions/promo?code=xxx
 * Validate a promo code without applying
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'code parameter required' }, { status: 400 });
    }

    // Check if promo code is valid
    const { data: promo } = await supabase
      .from('promo_codes')
      .select('*')
      .ilike('code', code)
      .eq('is_active', true)
      .single();

    if (!promo) {
      return NextResponse.json({ valid: false, error: 'Invalid promo code' });
    }

    // Check validity period
    const now = new Date();
    if (promo.valid_from && new Date(promo.valid_from) > now) {
      return NextResponse.json({ valid: false, error: 'Promo code not yet active' });
    }
    if (promo.valid_until && new Date(promo.valid_until) < now) {
      return NextResponse.json({ valid: false, error: 'Promo code expired' });
    }

    // Check max redemptions
    if (promo.max_redemptions && promo.times_redeemed >= promo.max_redemptions) {
      return NextResponse.json({ valid: false, error: 'Promo code fully redeemed' });
    }

    return NextResponse.json({
      valid: true,
      discountType: promo.discount_type,
      discountValue: promo.discount_value,
      duration: promo.duration,
      durationMonths: promo.duration_months,
      appliesToPlans: promo.applies_to_plans,
    });
  } catch (err) {
    console.error('[PromoAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
