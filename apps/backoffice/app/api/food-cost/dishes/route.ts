import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/food-cost/dishes
 * List all food cost dishes for a location
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    // Get dishes with their ingredients
    const { data: dishes, error } = await supabase
      .from('food_cost_dishes')
      .select(
        `
        *,
        ingredients:food_cost_dish_ingredients(*)
      `
      )
      .eq('location_id', locationId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching dishes:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      dishes: dishes || [],
      total: dishes?.length || 0,
    });
  } catch (err) {
    console.error('Error in GET /api/food-cost/dishes:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/food-cost/dishes
 * Create a new food cost dish
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { locationId, name, category, sellingPrice, currency = 'EUR' } = body;

    // Validation
    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }
    if (!name?.trim()) {
      return NextResponse.json({ error: 'name is required' }, { status: 400 });
    }
    if (!sellingPrice || sellingPrice <= 0) {
      return NextResponse.json({ error: 'sellingPrice must be positive' }, { status: 400 });
    }

    // Create dish
    const { data: dish, error } = await supabase
      .from('food_cost_dishes')
      .insert({
        location_id: locationId,
        name: name.trim(),
        category: category || 'altri',
        selling_price: sellingPrice,
        currency,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating dish:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ dish }, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/food-cost/dishes:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
