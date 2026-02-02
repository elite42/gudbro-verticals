import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// ============================================================================
// GET - Fetch merchant charges
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    const { data: charges, error } = await supabase
      .from('merchant_charges')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('charge_type')
      .order('sort_order');

    if (error) {
      console.error('Error fetching charges:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ charges: charges || [] });
  } catch (error) {
    console.error('Error in GET /api/settings/charges:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// POST - Create new charge
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      merchantId,
      charge_type,
      name,
      description,
      percentage,
      display_mode = 'exclusive',
      show_breakdown = true,
      show_in_menu = false,
      calculation_base = 'subtotal',
      applies_to = 'all',
      min_order_amount,
      max_charge_amount,
      sort_order = 0,
      is_enabled = true,
      is_default = false,
      legal_reference,
    } = body;

    if (!merchantId || !charge_type || !name || percentage === undefined) {
      return NextResponse.json(
        { error: 'merchantId, charge_type, name, and percentage are required' },
        { status: 400 }
      );
    }

    // If setting as default, unset other defaults of same type
    if (is_default) {
      await supabase
        .from('merchant_charges')
        .update({ is_default: false })
        .eq('merchant_id', merchantId)
        .eq('charge_type', charge_type);
    }

    // Get max sort_order for this type
    const { data: maxSort } = await supabase
      .from('merchant_charges')
      .select('sort_order')
      .eq('merchant_id', merchantId)
      .eq('charge_type', charge_type)
      .order('sort_order', { ascending: false })
      .limit(1)
      .single();

    const newSortOrder = sort_order || (maxSort?.sort_order ?? 0) + 10;

    const { data: charge, error } = await supabase
      .from('merchant_charges')
      .insert({
        merchant_id: merchantId,
        charge_type,
        name,
        description,
        percentage,
        display_mode,
        show_breakdown,
        show_in_menu,
        calculation_base,
        applies_to,
        min_order_amount,
        max_charge_amount,
        sort_order: newSortOrder,
        is_enabled,
        is_default,
        legal_reference,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating charge:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ charge });
  } catch (error) {
    console.error('Error in POST /api/settings/charges:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Update existing charge
// ============================================================================

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { merchantId, id, ...updates } = body;

    if (!merchantId || !id) {
      return NextResponse.json({ error: 'merchantId and id are required' }, { status: 400 });
    }

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('merchant_charges')
      .select('id, merchant_id, charge_type')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Charge not found' }, { status: 404 });
    }

    if (existing.merchant_id !== merchantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // If setting as default, unset other defaults of same type
    if (updates.is_default) {
      await supabase
        .from('merchant_charges')
        .update({ is_default: false })
        .eq('merchant_id', merchantId)
        .eq('charge_type', existing.charge_type)
        .neq('id', id);
    }

    // Map camelCase to snake_case if needed
    const snakeCaseUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      chargeType: 'charge_type',
      displayMode: 'display_mode',
      showBreakdown: 'show_breakdown',
      showInMenu: 'show_in_menu',
      calculationBase: 'calculation_base',
      appliesTo: 'applies_to',
      minOrderAmount: 'min_order_amount',
      maxChargeAmount: 'max_charge_amount',
      sortOrder: 'sort_order',
      isEnabled: 'is_enabled',
      isDefault: 'is_default',
      legalReference: 'legal_reference',
    };

    for (const [key, value] of Object.entries(updates)) {
      const snakeKey = fieldMap[key] || key;
      snakeCaseUpdates[snakeKey] = value;
    }

    const { data: charge, error } = await supabase
      .from('merchant_charges')
      .update(snakeCaseUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating charge:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ charge });
  } catch (error) {
    console.error('Error in PUT /api/settings/charges:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// DELETE - Delete charge
// ============================================================================

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { merchantId, id } = body;

    if (!merchantId || !id) {
      return NextResponse.json({ error: 'merchantId and id are required' }, { status: 400 });
    }

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('merchant_charges')
      .select('id, merchant_id')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Charge not found' }, { status: 404 });
    }

    if (existing.merchant_id !== merchantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { error } = await supabase.from('merchant_charges').delete().eq('id', id);

    if (error) {
      console.error('Error deleting charge:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/settings/charges:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
