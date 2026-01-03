import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * POST /api/reviews/[id]/report
 * Report a review for moderation
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
    const { reason, details } = body;

    const validReasons = ['spam', 'fake', 'inappropriate', 'harassment', 'conflict_of_interest', 'other'];
    if (!reason || !validReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid reason. Must be one of: ' + validReasons.join(', ') },
        { status: 400 }
      );
    }

    // Check review exists
    const { data: review } = await supabase
      .from('reviews')
      .select('id')
      .eq('id', id)
      .single();

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Check if already reported by this user
    const { data: existingReport } = await supabase
      .from('review_reports')
      .select('id')
      .eq('review_id', id)
      .eq('reporter_id', account.id)
      .single();

    if (existingReport) {
      return NextResponse.json(
        { error: 'You have already reported this review' },
        { status: 400 }
      );
    }

    // Create report
    const { error } = await supabase.from('review_reports').insert({
      review_id: id,
      reporter_id: account.id,
      reason,
      details: details || null,
    });

    if (error) {
      console.error('[ReviewReportAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If multiple reports, flag the review
    const { count } = await supabase
      .from('review_reports')
      .select('*', { count: 'exact', head: true })
      .eq('review_id', id)
      .eq('status', 'pending');

    if ((count || 0) >= 3) {
      await supabase
        .from('reviews')
        .update({ status: 'flagged', updated_at: new Date().toISOString() })
        .eq('id', id);
    }

    return NextResponse.json({
      success: true,
      message: 'Report submitted for review',
    });
  } catch (err) {
    console.error('[ReviewReportAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
