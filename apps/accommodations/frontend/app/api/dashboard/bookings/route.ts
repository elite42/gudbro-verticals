/**
 * GET /api/dashboard/bookings
 *
 * Lists bookings for a property. Used by the owner dashboard.
 * Auth: ADMIN_API_KEY passed as query param `key`.
 *
 * Query params:
 * - propertyId: UUID of the property
 * - key: ADMIN_API_KEY for authorization
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    const key = searchParams.get('key');

    // Auth check
    const adminApiKey = process.env.ADMIN_API_KEY;
    if (!adminApiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    if (!key || key !== adminApiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!propertyId) {
      return NextResponse.json({ error: 'propertyId is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('accom_bookings')
      .select(
        `
        id,
        booking_code,
        guest_name,
        guest_last_name,
        guest_email,
        check_in_date,
        check_out_date,
        num_nights,
        total_price,
        currency,
        status,
        payment_method,
        payment_status,
        deposit_amount,
        deposit_percent,
        created_at
      `
      )
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Dashboard bookings query error:', error);
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error('GET /api/dashboard/bookings error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
