import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

/**
 * GET /api/accommodations/returning-guest
 *
 * Calls find_returning_guest() RPC to detect returning guests.
 * Query params: bookingId, propertyId, email, name, lastName, country, phone
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');
    const propertyId = searchParams.get('propertyId');
    const email = searchParams.get('email') || null;
    const name = searchParams.get('name') || null;
    const lastName = searchParams.get('lastName') || null;
    const country = searchParams.get('country') || null;
    const phone = searchParams.get('phone') || null;

    if (!bookingId || !propertyId) {
      return NextResponse.json({ error: 'bookingId and propertyId required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase.rpc('find_returning_guest', {
      p_property_id: propertyId,
      p_booking_id: bookingId,
      p_guest_email: email,
      p_guest_name: name,
      p_guest_last_name: lastName,
      p_guest_country: country,
      p_guest_phone: phone,
    });

    if (error) {
      console.error('find_returning_guest RPC error:', error);
      return NextResponse.json({ error: 'RPC failed' }, { status: 500 });
    }

    // RPC returns a table; take the first row
    const row = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      data: {
        previous_visits: row?.previous_visits || 0,
        last_visit_date: row?.last_visit_date || null,
      },
    });
  } catch (err) {
    console.error('GET /api/accommodations/returning-guest error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
