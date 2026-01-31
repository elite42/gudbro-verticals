import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createDealSchema = z.object({
  propertyId: z.string().uuid(),
  partner_name: z.string().min(1).max(100),
  discount_description: z.string().min(1).max(200),
  description: z.string().max(1000).optional().nullable(),
  url: z.string().url().optional().nullable().or(z.literal('')),
  image_url: z.string().url().optional().nullable().or(z.literal('')),
  is_active: z.boolean().default(true),
  display_order: z.number().int().default(0),
});

/**
 * GET /api/accommodations/deals?propertyId=X
 *
 * Returns all deals for a property, ordered by display_order then created_at.
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
    .from('accom_deals')
    .select(
      'id, partner_name, discount_description, description, url, image_url, is_active, display_order, created_at, updated_at'
    )
    .eq('property_id', propertyId)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[accommodations/deals] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }

  return NextResponse.json({ deals: data });
}

/**
 * POST /api/accommodations/deals
 *
 * Creates a new deal for a property.
 */
export async function POST(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = createDealSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const {
    propertyId,
    partner_name,
    discount_description,
    description,
    url,
    image_url,
    is_active,
    display_order,
  } = parsed.data;

  const { data, error } = await supabaseAdmin
    .from('accom_deals')
    .insert({
      property_id: propertyId,
      partner_name,
      discount_description,
      description: description || null,
      url: url || null,
      image_url: image_url || null,
      is_active,
      display_order,
    })
    .select()
    .single();

  if (error) {
    console.error('[accommodations/deals] POST error:', error);
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 });
  }

  return NextResponse.json({ deal: data }, { status: 201 });
}
