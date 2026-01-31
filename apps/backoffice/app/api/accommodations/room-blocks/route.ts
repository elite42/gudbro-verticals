import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * POST /api/accommodations/room-blocks
 *
 * Creates a room block after validating no overlap with active bookings.
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

  const { propertyId, roomId, dateFrom, dateTo, reason, notes } = body as {
    propertyId: string;
    roomId: string;
    dateFrom: string;
    dateTo: string;
    reason?: string;
    notes?: string;
  };

  if (!propertyId || !roomId || !dateFrom || !dateTo) {
    return NextResponse.json(
      { error: 'Missing required fields: propertyId, roomId, dateFrom, dateTo' },
      { status: 400 }
    );
  }

  // Application-level overlap check with active bookings
  const { data: overlapping, error: checkError } = await supabaseAdmin
    .from('accom_bookings')
    .select('id, guest_name, check_in_date, check_out_date')
    .eq('room_id', roomId)
    .not('status', 'in', '("cancelled","no_show")')
    .lt('check_in_date', dateTo)
    .gt('check_out_date', dateFrom);

  if (checkError) {
    console.error('[room-blocks] overlap check error:', checkError);
    return NextResponse.json({ error: 'Failed to check booking overlaps' }, { status: 500 });
  }

  if (overlapping && overlapping.length > 0) {
    const conflicts = overlapping
      .map((b) => `${b.guest_name} (${b.check_in_date} to ${b.check_out_date})`)
      .join(', ');
    return NextResponse.json(
      { error: `Cannot block dates with existing bookings: ${conflicts}` },
      { status: 409 }
    );
  }

  // Insert room block
  const { data, error } = await supabaseAdmin
    .from('accom_room_blocks')
    .insert({
      room_id: roomId,
      property_id: propertyId,
      date_from: dateFrom,
      date_to: dateTo,
      reason: reason || 'other',
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    // Handle EXCLUDE constraint violation (overlapping blocks)
    if (error.message?.includes('exclusion') || error.code === '23P01') {
      return NextResponse.json(
        { error: 'This block overlaps with an existing block for this room.' },
        { status: 409 }
      );
    }
    console.error('[room-blocks] POST error:', error);
    return NextResponse.json({ error: 'Failed to create room block' }, { status: 500 });
  }

  return NextResponse.json({ block: data }, { status: 201 });
}

/**
 * DELETE /api/accommodations/room-blocks
 *
 * Removes a room block by ID.
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
    .from('accom_room_blocks')
    .delete()
    .eq('id', id)
    .eq('property_id', propertyId);

  if (error) {
    console.error('[room-blocks] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete room block' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
