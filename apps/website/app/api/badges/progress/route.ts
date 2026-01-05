import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/badges/progress
 * Get badge progress for specific badges
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

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Get in-progress badges
    const query = supabase
      .from('user_badges')
      .select(
        `
        *,
        badge:badge_definitions(*)
      `
      )
      .eq('account_id', account.id)
      .is('earned_at', null)
      .gt('progress', 0)
      .order('progress', { ascending: false });

    const { data: inProgressBadges, error } = await query;

    if (error) {
      console.error('[BadgesProgressAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let filteredBadges = inProgressBadges || [];
    if (category) {
      filteredBadges = filteredBadges.filter((b: any) => b.badge?.category === category);
    }

    return NextResponse.json({
      progress: filteredBadges.map((b: any) => ({
        code: b.badge?.code,
        name: b.badge?.name,
        description: b.badge?.description,
        icon: b.badge?.icon,
        category: b.badge?.category,
        current: b.progress,
        max: b.progress_max,
        percentage: b.progress_max > 0 ? Math.round((b.progress / b.progress_max) * 100) : 0,
      })),
    });
  } catch (err) {
    console.error('[BadgesProgressAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
