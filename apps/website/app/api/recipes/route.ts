import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/recipes
 * Get recipes with filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const cuisine = searchParams.get('cuisine');
    const diet = searchParams.get('diet');
    const difficulty = searchParams.get('difficulty');
    const maxTime = searchParams.get('maxTime');
    const search = searchParams.get('search');
    const popular = searchParams.get('popular') === 'true';

    let query = supabase
      .from('recipes')
      .select('*', { count: 'exact' })
      .eq('is_published', true);

    // Filters
    if (cuisine) {
      query = query.contains('cuisine_tags', [cuisine]);
    }
    if (diet) {
      query = query.contains('diet_tags', [diet]);
    }
    if (difficulty) {
      query = query.eq('difficulty', parseInt(difficulty));
    }
    if (maxTime) {
      query = query.lte('total_time_min', parseInt(maxTime));
    }
    if (search) {
      query = query.ilike('recipe_name', `%${search}%`);
    }

    // Ordering
    if (popular) {
      query = query.order('view_count', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);

    const { data: recipes, error, count } = await query;

    if (error) {
      console.error('[RecipesAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      recipes: recipes?.map(r => ({
        id: r.id,
        name: r.recipe_name,
        slug: r.recipe_slug,
        coverImage: r.cover_image_url,
        prepTime: r.prep_time_min,
        cookTime: r.cook_time_min,
        totalTime: r.total_time_min,
        difficulty: r.difficulty,
        servings: r.servings,
        rating: r.average_rating,
        ratingCount: r.rating_count,
        cuisineTags: r.cuisine_tags,
        dietTags: r.diet_tags,
        isPremium: r.is_premium,
      })) || [],
      total: count || 0,
    });
  } catch (err) {
    console.error('[RecipesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
