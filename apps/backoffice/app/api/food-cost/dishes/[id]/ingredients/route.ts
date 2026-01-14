import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

/**
 * POST /api/food-cost/dishes/[id]/ingredients
 * Add an ingredient to a dish
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const dishId = params.id;
    const body = await request.json();
    const { ingredientId, ingredientName, costPerKg, quantityGrams } = body;

    // Validation
    if (!ingredientName?.trim()) {
      return NextResponse.json({ error: 'ingredientName is required' }, { status: 400 });
    }
    if (!costPerKg || costPerKg <= 0) {
      return NextResponse.json({ error: 'costPerKg must be positive' }, { status: 400 });
    }
    if (!quantityGrams || quantityGrams <= 0) {
      return NextResponse.json({ error: 'quantityGrams must be positive' }, { status: 400 });
    }

    // Create ingredient
    const { data: ingredient, error } = await supabaseAdmin
      .from('food_cost_dish_ingredients')
      .insert({
        dish_id: dishId,
        ingredient_id: ingredientId || null,
        ingredient_name: ingredientName.trim(),
        cost_per_kg: costPerKg,
        quantity_grams: quantityGrams,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding ingredient:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ingredient }, { status: 201 });
  } catch (err) {
    console.error('Error in POST /api/food-cost/dishes/[id]/ingredients:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/food-cost/dishes/[id]/ingredients
 * List all ingredients for a dish
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const dishId = params.id;

    const { data: ingredients, error } = await supabaseAdmin
      .from('food_cost_dish_ingredients')
      .select('*')
      .eq('dish_id', dishId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching ingredients:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ingredients: ingredients || [],
      total: ingredients?.length || 0,
    });
  } catch (err) {
    console.error('Error in GET /api/food-cost/dishes/[id]/ingredients:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
