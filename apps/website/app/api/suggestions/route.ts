import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/suggestions
 * Get user's suggestions
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
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const { data, error } = await supabase.rpc('get_my_suggestions', {
      p_account_id: account.id,
      p_status: status || null,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) {
      console.error('[SuggestionsAPI] Get suggestions error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const suggestions = (data || []).map((row: Record<string, unknown>) => ({
      id: row.id,
      suggestionType: row.suggestion_type,
      status: row.status,
      priority: row.priority,
      title: row.title,
      description: row.description,
      entityType: row.entity_type,
      entityName: row.entity_name,
      pointsAwarded: row.points_awarded,
      upvotes: row.upvotes,
      downvotes: row.downvotes,
      commentsCount: row.comments_count,
      createdAt: row.created_at,
      reviewedAt: row.reviewed_at,
    }));

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/suggestions
 * Submit a new suggestion
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const {
      suggestionType,
      title,
      description,
      entityType,
      entityId,
      entityName,
      currentValue,
      suggestedValue,
      sources,
    } = body;

    if (!suggestionType || !title || !description) {
      return NextResponse.json(
        { error: 'suggestionType, title, and description are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc('submit_suggestion', {
      p_account_id: account.id,
      p_suggestion_type: suggestionType,
      p_title: title,
      p_description: description,
      p_entity_type: entityType || null,
      p_entity_id: entityId || null,
      p_entity_name: entityName || null,
      p_current_value: currentValue || null,
      p_suggested_value: suggestedValue || null,
      p_sources: sources || null,
    });

    if (error) {
      console.error('[SuggestionsAPI] Submit error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        suggestionId: data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
