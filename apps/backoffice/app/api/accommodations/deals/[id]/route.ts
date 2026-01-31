import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

const ALLOWED_FIELDS = [
  'partner_name',
  'discount_description',
  'description',
  'url',
  'image_url',
  'is_active',
  'display_order',
];

/**
 * PUT /api/accommodations/deals/[id]
 *
 * Updates an existing deal. Only allowlisted fields are accepted.
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing deal id' }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  for (const key of ALLOWED_FIELDS) {
    if (key in body) {
      update[key] = body[key];
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No updatable fields provided' }, { status: 400 });
  }

  update.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from('accom_deals')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }
    console.error('[accommodations/deals] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 });
  }

  return NextResponse.json({ deal: data });
}

/**
 * DELETE /api/accommodations/deals/[id]
 *
 * Deletes a deal. CASCADE handles click logs.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing deal id' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('accom_deals').delete().eq('id', id);

  if (error) {
    console.error('[accommodations/deals] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
