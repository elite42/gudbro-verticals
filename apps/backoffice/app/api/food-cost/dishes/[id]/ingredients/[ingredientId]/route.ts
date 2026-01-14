import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/food-cost/dishes/[id]/ingredients/[ingredientId]
 * Get a single ingredient
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; ingredientId: string } }
) {
  try {
    const { ingredientId } = params;

    const { data: ingredient, error } = await supabaseAdmin
      .from('food_cost_dish_ingredients')
      .select('*')
      .eq('id', ingredientId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Ingredient not found' }, { status: 404 });
      }
      console.error('Error fetching ingredient:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ingredient });
  } catch (err) {
    console.error('Error in GET /api/food-cost/dishes/[id]/ingredients/[ingredientId]:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/food-cost/dishes/[id]/ingredients/[ingredientId]
 * Update an ingredient
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; ingredientId: string } }
) {
  try {
    const { ingredientId } = params;
    const body = await request.json();
    const { ingredientName, costPerKg, quantityGrams } = body;

    // Build update object
    const updates: Record<string, unknown> = {};
    if (ingredientName !== undefined) updates.ingredient_name = ingredientName.trim();
    if (costPerKg !== undefined) updates.cost_per_kg = costPerKg;
    if (quantityGrams !== undefined) updates.quantity_grams = quantityGrams;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const { data: ingredient, error } = await supabaseAdmin
      .from('food_cost_dish_ingredients')
      .update(updates)
      .eq('id', ingredientId)
      .select()
      .single();

    if (error) {
      console.error('Error updating ingredient:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ingredient });
  } catch (err) {
    console.error('Error in PATCH /api/food-cost/dishes/[id]/ingredients/[ingredientId]:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/food-cost/dishes/[id]/ingredients/[ingredientId]
 * Remove an ingredient from a dish
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; ingredientId: string } }
) {
  try {
    const { ingredientId } = params;

    const { error } = await supabaseAdmin
      .from('food_cost_dish_ingredients')
      .delete()
      .eq('id', ingredientId);

    if (error) {
      console.error('Error deleting ingredient:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in DELETE /api/food-cost/dishes/[id]/ingredients/[ingredientId]:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
