import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/ingredients/contributions
 * Get user's ingredient contributions
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

    // Get query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('ingredient_contributions')
      .select('*')
      .eq('account_id', account.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[ContributionsAPI] Get error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ contributions: data });
  } catch (err) {
    console.error('[ContributionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/ingredients/contributions
 * Submit a new ingredient contribution
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

    const body = await request.json();
    const {
      ingredientName,
      category,
      submittedJson,
      sourcePhotos,
      sourceType,
      locale,
    } = body;

    if (!ingredientName || !submittedJson) {
      return NextResponse.json(
        { error: 'ingredientName and submittedJson are required' },
        { status: 400 }
      );
    }

    // Validate submittedJson has required nutrition fields
    if (!submittedJson.nutrition ||
        typeof submittedJson.nutrition.calories !== 'number' ||
        typeof submittedJson.nutrition.protein !== 'number' ||
        typeof submittedJson.nutrition.carbohydrates !== 'number' ||
        typeof submittedJson.nutrition.fat !== 'number') {
      return NextResponse.json(
        { error: 'submittedJson must include nutrition with calories, protein, carbohydrates, fat' },
        { status: 400 }
      );
    }

    // Check for existing ingredient with same name
    const { data: existing } = await supabase
      .from('ingredients')
      .select('id, name')
      .ilike('name', ingredientName)
      .limit(1);

    const isDuplicate = existing && existing.length > 0;

    // Insert contribution
    const { data, error } = await supabase
      .from('ingredient_contributions')
      .insert({
        account_id: account.id,
        ingredient_name: ingredientName,
        category: category || submittedJson.category || null,
        submitted_json: submittedJson,
        source_photos: sourcePhotos || [],
        source_type: sourceType || 'photo_ai',
        contributor_locale: locale || 'en',
        is_new_ingredient: !isDuplicate,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('[ContributionsAPI] Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      contributionId: data.id,
      isDuplicate,
      message: isDuplicate
        ? 'Submitted for review. A similar ingredient may exist.'
        : 'Submitted for review. You will earn 50 points if approved!',
    }, { status: 201 });
  } catch (err) {
    console.error('[ContributionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
