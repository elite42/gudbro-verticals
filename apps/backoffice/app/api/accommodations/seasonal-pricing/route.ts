import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/seasonal-pricing?propertyId=X&roomId=Y
 *
 * Lists seasonal pricing overrides for a property, optionally filtered by room.
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const roomId = searchParams.get('roomId');

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  let query = supabaseAdmin
    .from('accom_seasonal_pricing')
    .select('id, room_id, date_from, date_to, price_per_night, label, created_at, updated_at')
    .eq('property_id', propertyId)
    .order('date_from', { ascending: true });

  if (roomId) {
    query = query.eq('room_id', roomId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[seasonal-pricing] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch seasonal pricing' }, { status: 500 });
  }

  return NextResponse.json({ pricing: data });
}

/**
 * POST /api/accommodations/seasonal-pricing
 *
 * Creates a new seasonal pricing override.
 */
export async function POST(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { propertyId, roomId, dateFrom, dateTo, pricePerNight, label } = body as {
    propertyId: string;
    roomId: string;
    dateFrom: string;
    dateTo: string;
    pricePerNight: number;
    label?: string;
  };

  if (!propertyId || !roomId || !dateFrom || !dateTo || !pricePerNight) {
    return NextResponse.json(
      { error: 'Missing required fields: propertyId, roomId, dateFrom, dateTo, pricePerNight' },
      { status: 400 }
    );
  }

  if (pricePerNight <= 0) {
    return NextResponse.json({ error: 'pricePerNight must be greater than 0' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('accom_seasonal_pricing')
    .insert({
      property_id: propertyId,
      room_id: roomId,
      date_from: dateFrom,
      date_to: dateTo,
      price_per_night: pricePerNight,
      label: label || null,
    })
    .select()
    .single();

  if (error) {
    if (error.message?.includes('exclusion') || error.code === '23P01') {
      return NextResponse.json(
        { error: 'This pricing period overlaps with an existing one for this room.' },
        { status: 409 }
      );
    }
    console.error('[seasonal-pricing] POST error:', error);
    return NextResponse.json({ error: 'Failed to create seasonal pricing' }, { status: 500 });
  }

  return NextResponse.json({ pricing: data }, { status: 201 });
}

/**
 * PUT /api/accommodations/seasonal-pricing
 *
 * Updates an existing seasonal pricing override. Body must include `id` and `propertyId`.
 */
export async function PUT(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { id, propertyId, ...fields } = body as {
    id: string;
    propertyId: string;
    dateFrom?: string;
    dateTo?: string;
    pricePerNight?: number;
    label?: string;
  };

  if (!id || !propertyId) {
    return NextResponse.json({ error: 'Missing required fields: id, propertyId' }, { status: 400 });
  }

  // Map camelCase body keys to snake_case DB columns
  const fieldMap: Record<string, string> = {
    dateFrom: 'date_from',
    dateTo: 'date_to',
    pricePerNight: 'price_per_night',
    label: 'label',
  };

  const update: Record<string, unknown> = {};
  for (const [bodyKey, dbKey] of Object.entries(fieldMap)) {
    if (bodyKey in fields) {
      update[dbKey] = (fields as Record<string, unknown>)[bodyKey];
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 });
  }

  // Validate price if provided
  if ('price_per_night' in update && (update.price_per_night as number) <= 0) {
    return NextResponse.json({ error: 'pricePerNight must be greater than 0' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('accom_seasonal_pricing')
    .update(update)
    .eq('id', id)
    .eq('property_id', propertyId)
    .select()
    .single();

  if (error) {
    if (error.message?.includes('exclusion') || error.code === '23P01') {
      return NextResponse.json(
        { error: 'This pricing period overlaps with an existing one for this room.' },
        { status: 409 }
      );
    }
    console.error('[seasonal-pricing] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update seasonal pricing' }, { status: 500 });
  }

  return NextResponse.json({ pricing: data });
}

/**
 * DELETE /api/accommodations/seasonal-pricing
 *
 * Removes a seasonal pricing override by ID.
 */
export async function DELETE(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { id, propertyId } = body as { id: string; propertyId: string };

  if (!id || !propertyId) {
    return NextResponse.json({ error: 'Missing required fields: id, propertyId' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('accom_seasonal_pricing')
    .delete()
    .eq('id', id)
    .eq('property_id', propertyId);

  if (error) {
    console.error('[seasonal-pricing] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete seasonal pricing' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
