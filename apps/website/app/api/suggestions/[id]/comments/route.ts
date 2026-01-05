import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/suggestions/[id]/comments
 * Get comments for a suggestion
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabase();

  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('suggestion_comments')
      .select(
        `
        *,
        accounts:account_id (display_name, avatar_url)
      `
      )
      .eq('suggestion_id', id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[SuggestionsAPI] Get comments error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const comments = (data || []).map((row: Record<string, unknown>) => ({
      id: row.id,
      suggestionId: row.suggestion_id,
      accountId: row.account_id,
      accountName: (row.accounts as Record<string, unknown>)?.display_name,
      accountAvatar: (row.accounts as Record<string, unknown>)?.avatar_url,
      comment: row.comment,
      isModeratorComment: row.is_moderator_comment,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ comments });
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/suggestions/[id]/comments
 * Add a comment to a suggestion
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();
    const { comment } = body;

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json({ error: 'Comment is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('suggestion_comments')
      .insert({
        suggestion_id: id,
        account_id: account.id,
        comment: comment.trim(),
      })
      .select('id')
      .single();

    if (error) {
      console.error('[SuggestionsAPI] Add comment error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        commentId: data.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
