import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// ============================================================================
// Types
// ============================================================================

interface MerchantUsefulNumber {
  id: string;
  merchant_id: string;
  label: string;
  phone_number: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

// ============================================================================
// GET - Fetch merchant useful numbers + emergency + city for display
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const countryCode = searchParams.get('countryCode');
    const cityName = searchParams.get('cityName');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    // Fetch merchant numbers
    const { data: merchantNumbers, error: merchantError } = await supabase
      .from('merchant_useful_numbers')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('sort_order');

    if (merchantError) {
      console.error('Error fetching merchant numbers:', merchantError);
      return NextResponse.json({ error: merchantError.message }, { status: 500 });
    }

    // Fetch emergency numbers if countryCode provided
    let emergencyNumbers: unknown[] = [];
    if (countryCode) {
      const { data: emergency, error: emergencyError } = await supabase
        .from('emergency_numbers')
        .select('*')
        .eq('country_code', countryCode)
        .order('service_type');

      if (!emergencyError) {
        emergencyNumbers = emergency || [];
      }
    }

    // Fetch city numbers if cityName provided
    let cityNumbers: unknown[] = [];
    if (countryCode && cityName) {
      const { data: city, error: cityError } = await supabase
        .from('city_useful_numbers')
        .select('*')
        .eq('country_code', countryCode)
        .eq('city_name', cityName)
        .eq('is_active', true)
        .order('sort_order');

      if (!cityError) {
        cityNumbers = city || [];
      }
    }

    return NextResponse.json({
      merchantNumbers: merchantNumbers || [],
      emergencyNumbers,
      cityNumbers,
    });
  } catch (error) {
    console.error('Error in GET /api/settings/useful-numbers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// POST - Create new merchant useful number
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      merchantId,
      label,
      phone_number,
      category = 'other',
      sort_order,
      is_active = true,
    } = body;

    if (!merchantId || !label || !phone_number) {
      return NextResponse.json(
        { error: 'merchantId, label, and phone_number are required' },
        { status: 400 }
      );
    }

    // Get max sort_order if not provided
    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined) {
      const { data: maxSort } = await supabase
        .from('merchant_useful_numbers')
        .select('sort_order')
        .eq('merchant_id', merchantId)
        .order('sort_order', { ascending: false })
        .limit(1)
        .single();

      finalSortOrder = (maxSort?.sort_order ?? 0) + 10;
    }

    const { data: number, error } = await supabase
      .from('merchant_useful_numbers')
      .insert({
        merchant_id: merchantId,
        label,
        phone_number,
        category,
        sort_order: finalSortOrder,
        is_active,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating useful number:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ number });
  } catch (error) {
    console.error('Error in POST /api/settings/useful-numbers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Update merchant useful number
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
      .from('merchant_useful_numbers')
      .select('id, merchant_id')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Number not found' }, { status: 404 });
    }

    if (existing.merchant_id !== merchantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Map camelCase to snake_case if needed
    const snakeCaseUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      phoneNumber: 'phone_number',
      sortOrder: 'sort_order',
      isActive: 'is_active',
    };

    for (const [key, value] of Object.entries(updates)) {
      const snakeKey = fieldMap[key] || key;
      snakeCaseUpdates[snakeKey] = value;
    }

    const { data: number, error } = await supabase
      .from('merchant_useful_numbers')
      .update(snakeCaseUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating useful number:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ number });
  } catch (error) {
    console.error('Error in PUT /api/settings/useful-numbers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// DELETE - Delete merchant useful number
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
      .from('merchant_useful_numbers')
      .select('id, merchant_id')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Number not found' }, { status: 404 });
    }

    if (existing.merchant_id !== merchantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { error } = await supabase.from('merchant_useful_numbers').delete().eq('id', id);

    if (error) {
      console.error('Error deleting useful number:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/settings/useful-numbers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
