import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/suggestions/stats
 * Get suggestion statistics for the authenticated user
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

    const { data, error } = await supabase.rpc('get_suggestion_stats', {
      p_account_id: account.id,
    });

    if (error) {
      console.error('[SuggestionsAPI] Get stats error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        stats: {
          totalSuggestions: 0,
          pending: 0,
          underReview: 0,
          approved: 0,
          implemented: 0,
          rejected: 0,
          totalPointsEarned: 0,
        },
      });
    }

    const row = data[0];
    return NextResponse.json({
      stats: {
        totalSuggestions: row.total_suggestions,
        pending: row.pending,
        underReview: row.under_review,
        approved: row.approved,
        implemented: row.implemented,
        rejected: row.rejected,
        totalPointsEarned: row.total_points_earned,
      },
    });
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
