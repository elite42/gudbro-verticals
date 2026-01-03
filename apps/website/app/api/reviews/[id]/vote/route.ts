import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * POST /api/reviews/[id]/vote
 * Vote on a review (helpful/not helpful)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { voteType } = body;

    if (!voteType || !['helpful', 'not_helpful'].includes(voteType)) {
      return NextResponse.json(
        { error: 'voteType must be "helpful" or "not_helpful"' },
        { status: 400 }
      );
    }

    // Check review exists
    const { data: review } = await supabase
      .from('reviews')
      .select('id, account_id')
      .eq('id', id)
      .single();

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Can't vote on own review
    if (review.account_id === account.id) {
      return NextResponse.json(
        { error: 'Cannot vote on your own review' },
        { status: 400 }
      );
    }

    const { data: success, error } = await supabase.rpc('vote_review', {
      p_account_id: account.id,
      p_review_id: id,
      p_vote_type: voteType,
    });

    if (error) {
      console.error('[ReviewVoteAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get updated counts
    const { data: updatedReview } = await supabase
      .from('reviews')
      .select('helpful_count, not_helpful_count')
      .eq('id', id)
      .single();

    return NextResponse.json({
      success,
      helpfulCount: updatedReview?.helpful_count || 0,
      notHelpfulCount: updatedReview?.not_helpful_count || 0,
    });
  } catch (err) {
    console.error('[ReviewVoteAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
