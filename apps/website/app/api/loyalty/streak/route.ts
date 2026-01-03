import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/loyalty/streak
 * Get current user's login streak info
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

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get streak info
    const { data: streak } = await supabase
      .from('login_streaks')
      .select('*')
      .eq('account_id', account.id)
      .single();

    if (!streak) {
      return NextResponse.json({
        currentStreak: 0,
        longestStreak: 0,
        lastLoginDate: null,
        canClaimToday: true,
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const canClaimToday = streak.last_login_date !== today;

    return NextResponse.json({
      currentStreak: streak.current_streak,
      longestStreak: streak.longest_streak,
      lastLoginDate: streak.last_login_date,
      canClaimToday,
    });
  } catch (err) {
    console.error('[StreakAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/loyalty/streak
 * Record daily login and award streak points
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

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Call the database function to record login and get points
    const { data: pointsAwarded, error } = await supabase.rpc('record_daily_login', {
      p_account_id: account.id,
    });

    if (error) {
      console.error('[StreakAPI] Record login error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get updated streak info
    const { data: streak } = await supabase
      .from('login_streaks')
      .select('*')
      .eq('account_id', account.id)
      .single();

    return NextResponse.json({
      success: true,
      pointsAwarded: pointsAwarded || 0,
      currentStreak: streak?.current_streak || 1,
      longestStreak: streak?.longest_streak || 1,
      message: pointsAwarded > 0
        ? `+${pointsAwarded} points for day ${streak?.current_streak} streak!`
        : 'Already claimed today',
    });
  } catch (err) {
    console.error('[StreakAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
