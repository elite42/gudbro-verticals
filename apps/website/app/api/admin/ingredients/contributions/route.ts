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
 * GET /api/admin/ingredients/contributions
 * Get all pending contributions for review (admin only)
 */
export async function GET(request: NextRequest) {
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

    if (!account || !(await isGudBroAdmin(account.id))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get contributions with contributor info
    const { data, error, count } = await supabase
      .from('ingredient_contributions')
      .select(
        `
        *,
        accounts!inner(id, email, display_name, avatar_url)
      `,
        { count: 'exact' }
      )
      .eq('status', status)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[AdminContributionsAPI] Get error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get counts by status
    const { data: statusCounts } = await supabase.from('ingredient_contributions').select('status');

    const counts = {
      pending: 0,
      in_review: 0,
      approved: 0,
      merged: 0,
      rejected: 0,
      duplicate: 0,
      total: statusCounts?.length || 0,
    };

    (statusCounts || []).forEach((s: { status: string }) => {
      if (s.status in counts) {
        counts[s.status as keyof typeof counts]++;
      }
    });

    return NextResponse.json({
      contributions: data,
      counts,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    });
  } catch (err) {
    console.error('[AdminContributionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
