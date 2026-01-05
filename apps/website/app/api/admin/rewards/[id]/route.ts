import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * Check if user is GudBro admin
 */
async function isGudBroAdmin(accountId: string): Promise<boolean> {
  const supabase = getSupabase();
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
 * GET /api/admin/rewards/[id]
 * Get single reward details
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabase();

  try {
    const { id } = await params;

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

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { data: reward, error } = await supabase
      .from('loyalty_rewards')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !reward) {
      return NextResponse.json({ error: 'Reward not found' }, { status: 404 });
    }

    // Get redemption stats
    const { data: stats } = await supabase
      .from('reward_redemptions')
      .select('status')
      .eq('reward_id', id);

    const redemptionStats = {
      total: stats?.length || 0,
      pending: stats?.filter((s) => s.status === 'pending').length || 0,
      approved: stats?.filter((s) => s.status === 'approved').length || 0,
      used: stats?.filter((s) => s.status === 'used').length || 0,
      expired: stats?.filter((s) => s.status === 'expired').length || 0,
      cancelled: stats?.filter((s) => s.status === 'cancelled').length || 0,
    };

    return NextResponse.json({
      reward,
      redemptionStats,
    });
  } catch (err) {
    console.error('[AdminRewardsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/rewards/[id]
 * Update a reward
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabase();

  try {
    const { id } = await params;

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

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();

    // Convert camelCase to snake_case for the update
    const updates: Record<string, unknown> = {};
    if (body.name !== undefined) updates.name = body.name;
    if (body.description !== undefined) updates.description = body.description;
    if (body.pointsRequired !== undefined) updates.points_required = body.pointsRequired;
    if (body.isActive !== undefined) updates.is_active = body.isActive;
    if (body.isFeatured !== undefined) updates.is_featured = body.isFeatured;
    if (body.targetAudience !== undefined) updates.target_audience = body.targetAudience;
    if (body.category !== undefined) updates.category = body.category;
    if (body.minTier !== undefined) updates.min_tier = body.minTier;
    if (body.maxRedemptionsTotal !== undefined)
      updates.max_redemptions_total = body.maxRedemptionsTotal;
    if (body.maxRedemptionsPerUser !== undefined)
      updates.max_redemptions_per_user = body.maxRedemptionsPerUser;
    if (body.availableFrom !== undefined) updates.available_from = body.availableFrom;
    if (body.availableUntil !== undefined) updates.available_until = body.availableUntil;
    if (body.imageUrl !== undefined) updates.image_url = body.imageUrl;
    if (body.rewardValue !== undefined) updates.reward_value = body.rewardValue;

    const { data, error } = await supabase.rpc('admin_update_reward', {
      p_admin_id: account.id,
      p_reward_id: id,
      p_updates: updates,
    });

    if (error) {
      console.error('[AdminRewardsAPI] Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: data });
  } catch (err) {
    console.error('[AdminRewardsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/rewards/[id]
 * Deactivate a reward (soft delete)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = getSupabase();

  try {
    const { id } = await params;

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

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { data, error } = await supabase.rpc('admin_deactivate_reward', {
      p_admin_id: account.id,
      p_reward_id: id,
    });

    if (error) {
      console.error('[AdminRewardsAPI] Deactivate error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: data });
  } catch (err) {
    console.error('[AdminRewardsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
