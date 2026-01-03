import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/badges
 * Get user badges or all available badges
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';
    const category = searchParams.get('category');

    // If showing all badges (public), no auth needed
    if (showAll) {
      let query = supabase
        .from('badge_definitions')
        .select('*')
        .eq('is_active', true)
        .order('category')
        .order('sort_order');

      if (category) {
        query = query.eq('category', category);
      }

      const { data: badges, error } = await query;

      if (error) {
        console.error('[BadgesAPI] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        badges: badges?.map(b => ({
          code: b.code,
          name: b.name,
          description: b.description,
          icon: b.icon,
          category: b.category,
          rarity: b.rarity,
          pointsReward: b.points_reward,
          requirement: b.requirement_description,
        })) || [],
      });
    }

    // User badges require auth
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

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get user badges
    const { data: userBadges, error: badgesError } = await supabase.rpc('get_user_badges', {
      p_account_id: account.id,
    });

    if (badgesError) {
      console.error('[BadgesAPI] Error:', badgesError);
      return NextResponse.json({ error: badgesError.message }, { status: 500 });
    }

    // Get badge stats
    const earnedBadges = userBadges?.filter((b: any) => b.is_earned) || [];
    const inProgressBadges = userBadges?.filter((b: any) => !b.is_earned && b.progress > 0) || [];

    return NextResponse.json({
      badges: userBadges?.map((b: any) => ({
        code: b.badge_code,
        name: b.badge_name,
        description: b.badge_description,
        icon: b.badge_icon,
        category: b.category,
        rarity: b.rarity,
        pointsReward: b.points_reward,
        isEarned: b.is_earned,
        earnedAt: b.earned_at,
        progress: b.progress,
        progressMax: b.progress_max,
        isSeen: b.is_seen,
      })) || [],
      stats: {
        total: userBadges?.length || 0,
        earned: earnedBadges.length,
        inProgress: inProgressBadges.length,
      },
    });
  } catch (err) {
    console.error('[BadgesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
