import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  validateAdminApiKey,
  VALID_TRANSITIONS,
  ACTION_TO_STATUS,
} from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/bookings/[id]
 *
 * Returns full booking detail with room join.
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { data, error } = await supabaseAdmin
    .from('accom_bookings')
    .select(
      `id, booking_code, guest_name, guest_last_name, guest_email, guest_phone, guest_country,
       check_in_date, check_out_date, num_nights, num_guests, total_price, currency,
       status, payment_method, payment_status, deposit_amount, deposit_percent,
       special_requests, internal_notes, booking_source, cancellation_reason,
       actual_check_in, actual_check_out, created_at, property_id,
       room:accom_rooms(id, room_number, room_type)`
    )
    .eq('id', params.id)
    .single();

  if (error) {
    console.error('[accommodations/bookings/[id]] GET error:', error);
    const status = error.code === 'PGRST116' ? 404 : 500;
    return NextResponse.json(
      { error: status === 404 ? 'Booking not found' : 'Failed to fetch booking' },
      { status }
    );
  }

  return NextResponse.json({ booking: data });
}

/**
 * PATCH /api/accommodations/bookings/[id]
 *
 * Performs a status action on a booking. Validates the transition against
 * the VALID_TRANSITIONS state machine before applying.
 *
 * Body: { action: string, reason?: string }
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  let body: { action: string; reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { action, reason } = body;

  // Validate action
  const newStatus = ACTION_TO_STATUS[action];
  if (!newStatus) {
    return NextResponse.json(
      { error: 'Invalid action', validActions: Object.keys(ACTION_TO_STATUS) },
      { status: 400 }
    );
  }

  // Fetch current status
  const { data: current, error: fetchError } = await supabaseAdmin
    .from('accom_bookings')
    .select('status')
    .eq('id', params.id)
    .single();

  if (fetchError || !current) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const currentStatus = current.status as string;

  // Validate transition
  const allowed = VALID_TRANSITIONS[currentStatus];
  if (!allowed || !allowed.includes(newStatus)) {
    return NextResponse.json(
      {
        error: 'Invalid status transition',
        current: currentStatus,
        attempted: newStatus,
      },
      { status: 400 }
    );
  }

  // Build update payload
  const update: Record<string, unknown> = { status: newStatus };

  if (action === 'cancel' || action === 'decline') {
    update.cancellation_reason = reason || null;
  }

  if (action === 'checkin') {
    update.actual_check_in = new Date().toISOString();
  }

  if (action === 'checkout') {
    update.actual_check_out = new Date().toISOString();
  }

  const { data, error: updateError } = await supabaseAdmin
    .from('accom_bookings')
    .update(update)
    .eq('id', params.id)
    .select()
    .single();

  if (updateError) {
    console.error('[accommodations/bookings/[id]] PATCH error:', updateError);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }

  return NextResponse.json({ booking: data });
}
