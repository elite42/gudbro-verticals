import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/recipes/saved
 * Get user's saved recipes
 */
export async function GET(request: NextRequest) {
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
    const collection = searchParams.get('collection');

    let query = supabase
      .from('saved_recipes')
      .select(
        `
        *,
        recipe:recipes(*)
      `
      )
      .eq('account_id', account.id)
      .order('saved_at', { ascending: false });

    if (collection) {
      query = query.eq('collection_name', collection);
    }

    const { data: savedRecipes, error } = await query;

    if (error) {
      console.error('[SavedRecipesAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get unique collections
    const collections = [...new Set(savedRecipes?.map((sr) => sr.collection_name) || [])];

    return NextResponse.json({
      savedRecipes:
        savedRecipes?.map((sr) => ({
          id: sr.id,
          savedAt: sr.saved_at,
          collection: sr.collection_name,
          notes: sr.notes,
          cookedCount: sr.cooked_count,
          lastCookedAt: sr.last_cooked_at,
          recipe: sr.recipe
            ? {
                id: sr.recipe.id,
                name: sr.recipe.recipe_name,
                slug: sr.recipe.recipe_slug,
                coverImage: sr.recipe.cover_image_url,
                totalTime: sr.recipe.total_time_min,
                difficulty: sr.recipe.difficulty,
                rating: sr.recipe.average_rating,
              }
            : null,
        })) || [],
      collections,
    });
  } catch (err) {
    console.error('[SavedRecipesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/recipes/saved
 * Save a recipe
 */
export async function POST(request: NextRequest) {
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
    const { recipeId, collection } = body;

    if (!recipeId) {
      return NextResponse.json({ error: 'recipeId required' }, { status: 400 });
    }

    const { error } = await supabase.rpc('save_recipe', {
      p_account_id: account.id,
      p_recipe_id: recipeId,
      p_collection: collection || 'Saved',
    });

    if (error) {
      console.error('[SavedRecipesAPI] Save error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Recipe saved',
    });
  } catch (err) {
    console.error('[SavedRecipesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/recipes/saved?recipeId=xxx
 * Remove saved recipe
 */
export async function DELETE(request: NextRequest) {
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
    const recipeId = searchParams.get('recipeId');

    if (!recipeId) {
      return NextResponse.json({ error: 'recipeId parameter required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('account_id', account.id)
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('[SavedRecipesAPI] Delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Recipe removed from saved',
    });
  } catch (err) {
    console.error('[SavedRecipesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
