import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/rooms?propertyId=X
 *
 * Returns all rooms for a property, ordered by sort_order then room_number.
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('accom_rooms')
    .select(
      `id, room_number, room_type, capacity, description, base_price_per_night,
       currency, images, beds, is_active, room_code,
       wifi_ssid_override, wifi_password_override`
    )
    .eq('property_id', propertyId)
    .order('room_number', { ascending: true });

  if (error) {
    console.error('[accommodations/rooms] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }

  return NextResponse.json({ rooms: data });
}

/**
 * POST /api/accommodations/rooms
 *
 * Creates a new room for a property.
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

  const {
    propertyId,
    room_number,
    room_type,
    capacity,
    description,
    base_price_per_night,
    currency,
    images,
    beds,
    wifi_ssid_override,
    wifi_password_override,
  } = body as {
    propertyId: string;
    room_number: string;
    room_type: string;
    capacity: number;
    description?: string;
    base_price_per_night: number;
    currency: string;
    images?: string[];
    beds?: unknown;
    wifi_ssid_override?: string;
    wifi_password_override?: string;
  };

  if (
    !propertyId ||
    !room_number ||
    !room_type ||
    !capacity ||
    !base_price_per_night ||
    !currency
  ) {
    return NextResponse.json(
      {
        error:
          'Missing required fields: propertyId, room_number, room_type, capacity, base_price_per_night, currency',
      },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('accom_rooms')
    .insert({
      property_id: propertyId,
      room_number,
      room_type,
      capacity,
      description: description || null,
      base_price_per_night,
      currency,
      images: images || [],
      beds: beds || null,
      is_active: true,
      wifi_ssid_override: wifi_ssid_override || null,
      wifi_password_override: wifi_password_override || null,
    })
    .select()
    .single();

  if (error) {
    console.error('[accommodations/rooms] POST error:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }

  return NextResponse.json({ room: data }, { status: 201 });
}

/**
 * PUT /api/accommodations/rooms
 *
 * Updates an existing room. To soft-delete, set is_active: false.
 * Body must include `id`.
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

  const { id, ...fields } = body;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing required field: id' }, { status: 400 });
  }

  // Only allow updatable fields (exclude property_id)
  const allowedFields = [
    'room_number',
    'room_type',
    'capacity',
    'description',
    'base_price_per_night',
    'currency',
    'images',
    'beds',
    'is_active',
    'wifi_ssid_override',
    'wifi_password_override',
  ];

  const update: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (key in fields) {
      update[key] = fields[key];
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('accom_rooms')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[accommodations/rooms] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 });
  }

  return NextResponse.json({ room: data });
}
