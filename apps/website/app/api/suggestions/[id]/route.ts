import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/suggestions/[id]
 * Get a single suggestion by ID
 */
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const { data: suggestion, error } = await supabase
      .from('improvement_suggestions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !suggestion) {
      return NextResponse.json({ error: 'Suggestion not found' }, { status: 404 });
    }

    // Get vote counts
    const { data: votes } = await supabase
      .from('suggestion_votes')
      .select('vote_type')
      .eq('suggestion_id', id);

    const upvotes = (votes || []).filter(
      (v: { vote_type: string }) => v.vote_type === 'upvote'
    ).length;
    const downvotes = (votes || []).filter(
      (v: { vote_type: string }) => v.vote_type === 'downvote'
    ).length;

    // Get comments count
    const { count: commentsCount } = await supabase
      .from('suggestion_comments')
      .select('*', { count: 'exact', head: true })
      .eq('suggestion_id', id);

    // Get submitter info
    const { data: account } = await supabase
      .from('accounts')
      .select('display_name, avatar_url')
      .eq('id', suggestion.account_id)
      .single();

    return NextResponse.json({
      suggestion: {
        id: suggestion.id,
        accountId: suggestion.account_id,
        accountName: account?.display_name,
        accountAvatar: account?.avatar_url,
        suggestionType: suggestion.suggestion_type,
        status: suggestion.status,
        priority: suggestion.priority,
        title: suggestion.title,
        description: suggestion.description,
        entityType: suggestion.entity_type,
        entityId: suggestion.entity_id,
        entityName: suggestion.entity_name,
        currentValue: suggestion.current_value,
        suggestedValue: suggestion.suggested_value,
        sources: suggestion.sources,
        pointsAwarded: suggestion.points_awarded,
        upvotes,
        downvotes,
        commentsCount: commentsCount || 0,
        createdAt: suggestion.created_at,
        reviewedAt: suggestion.reviewed_at,
        moderatorNotes: suggestion.moderator_notes,
        rejectionReason: suggestion.rejection_reason,
      },
    });
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/suggestions/[id]
 * Update a suggestion (user can only update pending suggestions)
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    // Check suggestion exists and belongs to user
    const { data: suggestion } = await supabase
      .from('improvement_suggestions')
      .select('account_id, status')
      .eq('id', id)
      .single();

    if (!suggestion) {
      return NextResponse.json({ error: 'Suggestion not found' }, { status: 404 });
    }

    if (suggestion.account_id !== account.id) {
      return NextResponse.json({ error: 'Not your suggestion' }, { status: 403 });
    }

    if (suggestion.status !== 'pending') {
      return NextResponse.json({ error: 'Can only edit pending suggestions' }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, suggestedValue, sources } = body;

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (suggestedValue) updateData.suggested_value = suggestedValue;
    if (sources) updateData.sources = sources;

    const { error } = await supabase
      .from('improvement_suggestions')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('[SuggestionsAPI] Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
