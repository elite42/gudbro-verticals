import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';
import { parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/calendar?propertyId=X&month=2026-02&roomId=Y
 *
 * Returns merged calendar data: bookings, room blocks, and seasonal pricing
 * for a given month (expanded to full calendar grid boundaries).
 * roomId is optional — omit to get all rooms.
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const month = searchParams.get('month');
  const roomId = searchParams.get('roomId');

  if (!propertyId || !month) {
    return NextResponse.json(
      { error: 'Missing required parameters: propertyId, month' },
      { status: 400 }
    );
  }

  // Parse month to compute calendar grid range (includes prev/next month padding)
  let rangeStart: string;
  let rangeEnd: string;
  try {
    const monthDate = parseISO(`${month}-01`);
    const gridStart = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 1 });
    const gridEnd = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 1 });
    rangeStart = format(gridStart, 'yyyy-MM-dd');
    rangeEnd = format(gridEnd, 'yyyy-MM-dd');
  } catch {
    return NextResponse.json({ error: 'Invalid month format. Expected YYYY-MM' }, { status: 400 });
  }

  // Build queries with optional roomId filter
  let bookingsQuery = supabaseAdmin
    .from('accom_bookings')
    .select('id, check_in_date, check_out_date, guest_name, status, room_id')
    .eq('property_id', propertyId)
    .gte('check_out_date', rangeStart)
    .lte('check_in_date', rangeEnd)
    .not('status', 'in', '("cancelled","no_show")');

  let blocksQuery = supabaseAdmin
    .from('accom_room_blocks')
    .select('id, room_id, date_from, date_to, reason, notes')
    .eq('property_id', propertyId)
    .gte('date_to', rangeStart)
    .lte('date_from', rangeEnd);

  let pricingQuery = supabaseAdmin
    .from('accom_seasonal_pricing')
    .select('id, room_id, date_from, date_to, price_per_night, label')
    .eq('property_id', propertyId)
    .gte('date_to', rangeStart)
    .lte('date_from', rangeEnd);

  if (roomId) {
    bookingsQuery = bookingsQuery.eq('room_id', roomId);
    blocksQuery = blocksQuery.eq('room_id', roomId);
    pricingQuery = pricingQuery.eq('room_id', roomId);
  }

  const [bookingsResult, blocksResult, pricingResult] = await Promise.all([
    bookingsQuery,
    blocksQuery,
    pricingQuery,
  ]);

  if (bookingsResult.error) {
    console.error('[accommodations/calendar] bookings error:', bookingsResult.error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
  if (blocksResult.error) {
    console.error('[accommodations/calendar] blocks error:', blocksResult.error);
    return NextResponse.json({ error: 'Failed to fetch room blocks' }, { status: 500 });
  }
  if (pricingResult.error) {
    console.error('[accommodations/calendar] pricing error:', pricingResult.error);
    return NextResponse.json({ error: 'Failed to fetch seasonal pricing' }, { status: 500 });
  }

  return NextResponse.json({
    bookings: bookingsResult.data,
    blocks: blocksResult.data,
    seasonalPricing: pricingResult.data,
  });
}
