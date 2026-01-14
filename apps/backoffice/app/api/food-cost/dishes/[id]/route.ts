import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getSession } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/food-cost/dishes/[id]
 * Get a single dish with ingredients
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const { data: dish, error } = await supabaseAdmin
      .from('food_cost_dishes')
      .select(
        `
        *,
        ingredients:food_cost_dish_ingredients(*)
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Dish not found' }, { status: 404 });
      }
      console.error('Error fetching dish:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ dish });
  } catch (err) {
    console.error('Error in GET /api/food-cost/dishes/[id]:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/food-cost/dishes/[id]
 * Update a dish
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, category, sellingPrice, monthlySales, isActive } = body;

    // Build update object
    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name.trim();
    if (category !== undefined) updates.category = category;
    if (sellingPrice !== undefined) updates.selling_price = sellingPrice;
    if (monthlySales !== undefined) updates.monthly_sales = monthlySales;
    if (isActive !== undefined) updates.is_active = isActive;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const { data: dish, error } = await supabaseAdmin
      .from('food_cost_dishes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating dish:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ dish });
  } catch (err) {
    console.error('Error in PATCH /api/food-cost/dishes/[id]:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/food-cost/dishes/[id]
 * Delete a dish (soft delete by setting is_active = false)
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // Soft delete
    const { error } = await supabaseAdmin
      .from('food_cost_dishes')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting dish:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error in DELETE /api/food-cost/dishes/[id]:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
