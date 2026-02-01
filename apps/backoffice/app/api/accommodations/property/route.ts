import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/property?propertyId=X
 *
 * Returns property settings and details.
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
    .from('accom_properties')
    .select(
      `id, name, slug, description, address, city, country, latitude, longitude,
       property_type, booking_mode, check_in_time, checkout_time, house_rules,
       cancellation_policy, amenities, images, host_name, contact_phone, contact_whatsapp,
       contact_email, deposit_percent, cancellation_penalty_percent,
       accepted_payment_methods, bank_transfer_info, crypto_wallets,
       weekly_discount_percent, monthly_discount_percent, is_active,
       wifi_zones`
    )
    .eq('id', propertyId)
    .single();

  if (error) {
    console.error('[accommodations/property] GET error:', error);
    const status = error.code === 'PGRST116' ? 404 : 500;
    return NextResponse.json(
      { error: status === 404 ? 'Property not found' : 'Failed to fetch property' },
      { status }
    );
  }

  return NextResponse.json({ property: data });
}

/**
 * PUT /api/accommodations/property
 *
 * Updates property settings. Body must include `id`.
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

  // Only allow updatable settings fields
  const allowedFields = [
    'booking_mode',
    'check_in_time',
    'checkout_time',
    'house_rules',
    'cancellation_policy',
    'deposit_percent',
    'cancellation_penalty_percent',
    'accepted_payment_methods',
    'bank_transfer_info',
    'contact_phone',
    'contact_whatsapp',
    'contact_email',
    'weekly_discount_percent',
    'monthly_discount_percent',
    'guest_verification_method',
    'access_settings',
    'wifi_zones',
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
    .from('accom_properties')
    .update(update)
    .eq('id', id as string)
    .select()
    .single();

  if (error) {
    console.error('[accommodations/property] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }

  return NextResponse.json({ property: data });
}
