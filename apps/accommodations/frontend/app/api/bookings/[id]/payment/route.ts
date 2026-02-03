/**
 * PATCH /api/bookings/[id]/payment
 *
 * Owner manual payment confirmation for bank transfer and crypto bookings.
 * Requires ADMIN_API_KEY Bearer token for authorization.
 *
 * Actions:
 * - confirm: Sets payment_status to 'paid', status to 'confirmed'
 * - reject: Sets payment_status to 'failed', status to 'cancelled'
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    // Authorization check
    const adminApiKey = process.env.ADMIN_API_KEY;
    if (!adminApiKey) {
      console.error('ADMIN_API_KEY not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${adminApiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse body
    let body: { action: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { action } = body;
    if (action !== 'confirm' && action !== 'reject') {
      return NextResponse.json(
        { error: "Invalid action. Must be 'confirm' or 'reject'" },
        { status: 400 }
      );
    }

    const bookingId = params.id;
    const supabase = getSupabaseAdmin();

    // Fetch booking
    const { data: booking, error: fetchError } = await supabase
      .from('accom_bookings')
      .select('id, status, payment_method, payment_status')
      .eq('id', bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Validate booking is in correct state for manual payment action
    if (booking.status !== 'pending_payment' && booking.status !== 'pending') {
      return NextResponse.json(
        { error: `Cannot ${action} payment for booking with status '${booking.status}'` },
        { status: 400 }
      );
    }

    // Apply action
    const updateData =
      action === 'confirm'
        ? { payment_status: 'paid', status: 'confirmed' }
        : { payment_status: 'failed', status: 'cancelled' };

    const { data: updated, error: updateError } = await supabase
      .from('accom_bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select('id, status, payment_status')
      .single();

    if (updateError) {
      console.error(`Failed to ${action} payment for booking ${bookingId}:`, updateError);
      return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error('PATCH /api/bookings/[id]/payment error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
