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
 * GET /api/admin/rewards
 * Get all rewards (admin view with stats)
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
      .from('v_rewards_admin')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[AdminRewardsAPI] Get rewards error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ rewards: data });
  } catch (err) {
    console.error('[AdminRewardsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/rewards
 * Create a new reward
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
      code,
      name,
      description,
      rewardType,
      rewardValue,
      pointsRequired,
      targetAudience,
      category,
      minTier,
      maxRedemptionsTotal,
      maxRedemptionsPerUser,
      availableFrom,
      availableUntil,
      imageUrl,
      isFeatured,
    } = body;

    if (!code || !name || !rewardType || !pointsRequired) {
      return NextResponse.json(
        { error: 'code, name, rewardType, and pointsRequired are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc('admin_create_reward', {
      p_admin_id: account.id,
      p_code: code,
      p_name: name,
      p_description: description || null,
      p_reward_type: rewardType,
      p_reward_value: rewardValue || {},
      p_points_required: pointsRequired,
      p_target_audience: targetAudience || 'both',
      p_category: category || 'general',
      p_min_tier: minTier || null,
      p_max_redemptions_total: maxRedemptionsTotal || null,
      p_max_redemptions_per_user: maxRedemptionsPerUser || null,
      p_available_from: availableFrom || null,
      p_available_until: availableUntil || null,
      p_image_url: imageUrl || null,
      p_is_featured: isFeatured || false,
    });

    if (error) {
      console.error('[AdminRewardsAPI] Create reward error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      rewardId: data,
    }, { status: 201 });
  } catch (err) {
    console.error('[AdminRewardsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
