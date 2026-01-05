import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/reviews
 * Get reviews for moderation
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
      .select('id, account_type')
      .eq('auth_id', user.id)
      .single();

    if (!account || account.account_type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const limit = parseInt(searchParams.get('limit') || '50');

    const {
      data: reviews,
      error,
      count,
    } = await supabase
      .from('reviews')
      .select(
        `
        *,
        account:accounts(id, display_name, email),
        merchant:merchants(id, business_name)
      `,
        { count: 'exact' }
      )
      .eq('status', status)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('[AdminReviewsAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get counts by status
    const { data: statusCounts } = await supabase.from('reviews').select('status');

    const counts = {
      pending: 0,
      approved: 0,
      rejected: 0,
      flagged: 0,
    };

    statusCounts?.forEach((r) => {
      if (r.status in counts) {
        counts[r.status as keyof typeof counts]++;
      }
    });

    return NextResponse.json({
      reviews: reviews || [],
      total: count || 0,
      counts,
    });
  } catch (err) {
    console.error('[AdminReviewsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/reviews
 * Moderate a review
 */
export async function PATCH(request: NextRequest) {
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
      .select('id, account_type')
      .eq('auth_id', user.id)
      .single();

    if (!account || account.account_type !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { reviewId, action, notes } = body;

    if (!reviewId || !action) {
      return NextResponse.json({ error: 'reviewId and action required' }, { status: 400 });
    }

    const validActions = ['approve', 'reject', 'flag'];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const statusMap: Record<string, string> = {
      approve: 'approved',
      reject: 'rejected',
      flag: 'flagged',
    };

    // Get review for merchant ratings update
    const { data: review } = await supabase
      .from('reviews')
      .select('merchant_id')
      .eq('id', reviewId)
      .single();

    const { error } = await supabase
      .from('reviews')
      .update({
        status: statusMap[action],
        moderation_notes: notes || null,
        moderated_by: account.id,
        moderated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', reviewId);

    if (error) {
      console.error('[AdminReviewsAPI] Moderate error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update merchant ratings if approved
    if (action === 'approve' && review?.merchant_id) {
      await supabase.rpc('update_merchant_ratings', {
        p_merchant_id: review.merchant_id,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Review ${action}d successfully`,
    });
  } catch (err) {
    console.error('[AdminReviewsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
