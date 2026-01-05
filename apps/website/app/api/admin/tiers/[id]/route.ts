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
 * PATCH /api/admin/tiers/[id]
 * Update a tier
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

    // Build updates object
    const updates: Record<string, unknown> = {};
    if (body.displayName !== undefined) updates.display_name = body.displayName;
    if (body.pointsThreshold !== undefined) updates.points_threshold = body.pointsThreshold;
    if (body.benefits !== undefined) updates.benefits = body.benefits;
    if (body.badgeUrl !== undefined) updates.badge_url = body.badgeUrl;
    if (body.colorHex !== undefined) updates.color_hex = body.colorHex;
    if (body.isActive !== undefined) updates.is_active = body.isActive;

    const { data, error } = await supabase.rpc('admin_update_tier', {
      p_admin_id: account.id,
      p_tier_id: id,
      p_updates: updates,
    });

    if (error) {
      console.error('[AdminTiersAPI] Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: data });
  } catch (err) {
    console.error('[AdminTiersAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/tiers/[id]
 * Deactivate a tier (soft delete)
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

    // Check if any users are on this tier
    const { data: tier } = await supabase
      .from('loyalty_tiers')
      .select('tier_name')
      .eq('id', id)
      .single();

    if (tier) {
      const { count } = await supabase
        .from('accounts')
        .select('*', { count: 'exact', head: true })
        .eq('loyalty_tier', tier.tier_name);

      if (count && count > 0) {
        return NextResponse.json(
          { error: `Cannot deactivate tier with ${count} active users. Migrate users first.` },
          { status: 400 }
        );
      }
    }

    const { error } = await supabase
      .from('loyalty_tiers')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
        updated_by: account.id,
      })
      .eq('id', id);

    if (error) {
      console.error('[AdminTiersAPI] Deactivate error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[AdminTiersAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
