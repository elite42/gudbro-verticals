import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getSession } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/food-cost/stats
 * Get food cost statistics for a location (used by FoodCostProgress widget)
 */
export async function GET(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    // Get total dishes count
    const { count: totalDishes, error: dishCountError } = await supabaseAdmin
      .from('food_cost_dishes')
      .select('*', { count: 'exact', head: true })
      .eq('location_id', locationId)
      .eq('is_active', true);

    if (dishCountError) {
      console.error('Error counting dishes:', dishCountError);
      return NextResponse.json({ error: dishCountError.message }, { status: 500 });
    }

    // Get dishes with calculated food costs (those with at least one ingredient)
    const { data: dishesWithCosts, error: costError } = await supabaseAdmin
      .from('food_cost_dishes')
      .select('id, food_cost, food_cost_percent')
      .eq('location_id', locationId)
      .eq('is_active', true)
      .not('food_cost', 'is', null)
      .gt('food_cost', 0);

    if (costError) {
      console.error('Error fetching dishes with costs:', costError);
      return NextResponse.json({ error: costError.message }, { status: 500 });
    }

    // Get total ingredients count for this location's dishes
    const { data: ingredientsData, error: ingError } = await supabaseAdmin
      .from('food_cost_dish_ingredients')
      .select('id, cost_per_kg, dish_id')
      .in(
        'dish_id',
        (
          await supabaseAdmin
            .from('food_cost_dishes')
            .select('id')
            .eq('location_id', locationId)
            .eq('is_active', true)
        ).data?.map((d) => d.id) || []
      );

    if (ingError) {
      console.error('Error fetching ingredients:', ingError);
      return NextResponse.json({ error: ingError.message }, { status: 500 });
    }

    const totalIngredients = ingredientsData?.length || 0;
    const ingredientsWithPrices = ingredientsData?.filter((i) => i.cost_per_kg > 0).length || 0;

    // Calculate average food cost percent
    let avgFoodCostPercent: number | null = null;
    if (dishesWithCosts && dishesWithCosts.length > 0) {
      const validPercents = dishesWithCosts
        .map((d) => d.food_cost_percent)
        .filter((p): p is number => p !== null && p > 0);

      if (validPercents.length > 0) {
        avgFoodCostPercent = validPercents.reduce((a, b) => a + b, 0) / validPercents.length;
      }
    }

    // Get last updated timestamp
    const { data: lastUpdatedDish, error: lastUpdateError } = await supabaseAdmin
      .from('food_cost_dishes')
      .select('updated_at')
      .eq('location_id', locationId)
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    const stats = {
      totalDishes: totalDishes || 0,
      dishesWithCosts: dishesWithCosts?.length || 0,
      totalIngredients,
      ingredientsWithPrices,
      avgFoodCostPercent,
      lastUpdated: lastUpdatedDish?.updated_at || null,
    };

    return NextResponse.json({ stats });
  } catch (err) {
    console.error('Error in GET /api/food-cost/stats:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
