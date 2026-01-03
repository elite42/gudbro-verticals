import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/reservations
 * Get user's reservations
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const upcoming = searchParams.get('upcoming') === 'true';

    let query = supabase
      .from('reservations')
      .select(`
        *,
        merchant:merchants(id, business_name, logo_url)
      `)
      .eq('account_id', account.id)
      .order('reservation_date', { ascending: true })
      .order('reservation_time', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    if (upcoming) {
      query = query.gte('reservation_date', new Date().toISOString().split('T')[0]);
      query = query.in('status', ['pending', 'confirmed']);
    }

    const { data: reservations, error } = await query;

    if (error) {
      console.error('[ReservationsAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      reservations: reservations?.map(r => ({
        id: r.id,
        confirmationCode: r.confirmation_code,
        date: r.reservation_date,
        time: r.reservation_time,
        partySize: r.party_size,
        status: r.status,
        guestName: r.guest_name,
        specialRequests: r.special_requests,
        merchant: r.merchant ? {
          id: r.merchant.id,
          name: r.merchant.business_name,
          logo: r.merchant.logo_url,
        } : null,
        createdAt: r.created_at,
      })) || [],
    });
  } catch (err) {
    console.error('[ReservationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/reservations
 * Create a new reservation
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();
    const { merchantId, date, time, partySize, guestName, guestPhone, guestEmail, specialRequests } = body;

    if (!merchantId || !date || !time || !partySize || !guestName) {
      return NextResponse.json(
        { error: 'merchantId, date, time, partySize, and guestName are required' },
        { status: 400 }
      );
    }

    const { data: reservationId, error } = await supabase.rpc('create_reservation', {
      p_account_id: account.id,
      p_merchant_id: merchantId,
      p_date: date,
      p_time: time,
      p_party_size: partySize,
      p_guest_name: guestName,
      p_guest_phone: guestPhone || null,
      p_guest_email: guestEmail || null,
      p_special_requests: specialRequests || null,
    });

    if (error) {
      console.error('[ReservationsAPI] Create error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get confirmation code
    const { data: reservation } = await supabase
      .from('reservations')
      .select('confirmation_code')
      .eq('id', reservationId)
      .single();

    return NextResponse.json({
      success: true,
      reservationId,
      confirmationCode: reservation?.confirmation_code,
      message: 'Reservation request submitted',
    });
  } catch (err) {
    console.error('[ReservationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/reservations?id=xxx
 * Cancel a reservation
 */
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const reservationId = searchParams.get('id');
    const reason = searchParams.get('reason');

    if (!reservationId) {
      return NextResponse.json({ error: 'id parameter required' }, { status: 400 });
    }

    // Verify ownership
    const { data: reservation } = await supabase
      .from('reservations')
      .select('id, status')
      .eq('id', reservationId)
      .eq('account_id', account.id)
      .single();

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    if (!['pending', 'confirmed'].includes(reservation.status)) {
      return NextResponse.json({ error: 'Cannot cancel this reservation' }, { status: 400 });
    }

    const { error } = await supabase
      .from('reservations')
      .update({
        status: 'canceled',
        canceled_at: new Date().toISOString(),
        canceled_by: account.id,
        cancellation_reason: reason,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reservationId);

    if (error) {
      console.error('[ReservationsAPI] Cancel error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Reservation canceled',
    });
  } catch (err) {
    console.error('[ReservationsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
