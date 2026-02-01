import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/bookings?propertyId=X&status=Y
 *
 * Returns bookings for a property with room join, ordered by check-in date descending.
 * Optional status filter (pass 'all' or omit for all statuses).
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const status = searchParams.get('status');
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  let query = supabaseAdmin
    .from('accom_bookings')
    .select(
      `id, booking_code, guest_name, guest_last_name, guest_email, guest_phone,
       check_in_date, check_out_date, num_nights, guest_count, total_price, currency,
       status, payment_method, payment_status, deposit_amount, deposit_percent,
       special_requests, created_at,
       room:accom_rooms(id, room_number, room_type)`
    )
    .eq('property_id', propertyId)
    .order('check_in_date', { ascending: false });

  // Date range overlap filter for Gantt/timeline view
  if (dateFrom && dateTo) {
    query = query.lte('check_in_date', dateTo).gte('check_out_date', dateFrom);
  } else {
    query = query.limit(200);
  }

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[accommodations/bookings] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
