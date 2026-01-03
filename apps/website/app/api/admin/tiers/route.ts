import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Check if user is GudBro admin
 */
async function isGudBroAdmin(accountId: string): Promise<boolean> {
  const { data } = await supabase
    .from('account_roles')
    .select('role_type, permissions')
    .eq('account_id', accountId)
    .eq('role_type', 'admin')
    .eq('is_active', true)
    .single();

  return !!data;
}

/**
 * GET /api/admin/tiers
 * Get all tiers (admin view)
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('loyalty_tiers')
      .select('*')
      .order('tier_order');

    if (error) {
      console.error('[AdminTiersAPI] Get tiers error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get count of users per tier
    const { data: tierCounts } = await supabase
      .from('accounts')
      .select('loyalty_tier')
      .not('loyalty_tier', 'is', null);

    const countsByTier: Record<string, number> = {};
    (tierCounts || []).forEach((a: { loyalty_tier: string }) => {
      countsByTier[a.loyalty_tier] = (countsByTier[a.loyalty_tier] || 0) + 1;
    });

    const tiers = (data || []).map((tier: Record<string, unknown>) => ({
      ...tier,
      userCount: countsByTier[tier.tier_name as string] || 0,
    }));

    return NextResponse.json({ tiers });
  } catch (err) {
    console.error('[AdminTiersAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/tiers
 * Create a new tier
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const {
      tierName,
      displayName,
      tierOrder,
      pointsThreshold,
      benefits,
      badgeUrl,
      colorHex,
    } = body;

    if (!tierName || !displayName || tierOrder === undefined || pointsThreshold === undefined) {
      return NextResponse.json(
        { error: 'tierName, displayName, tierOrder, and pointsThreshold are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('loyalty_tiers')
      .insert({
        tier_name: tierName,
        display_name: displayName,
        tier_order: tierOrder,
        points_threshold: pointsThreshold,
        benefits: benefits || {},
        badge_url: badgeUrl || null,
        color_hex: colorHex || null,
        created_by: account.id,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[AdminTiersAPI] Create tier error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      tierId: data.id,
    }, { status: 201 });
  } catch (err) {
    console.error('[AdminTiersAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
