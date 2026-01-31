import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/analytics/occupancy-chart?propertyId=X&days=30
 *
 * Returns daily occupancy percentages for the period.
 * Each data point: { date: 'YYYY-MM-DD', occupancy: number (0-100) }
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const days = parseInt(searchParams.get('days') || '30', 10);

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  const validDays = [7, 30, 90, 365];
  const periodDays = validDays.includes(days) ? days : 30;

  try {
    // Get active room count
    const { count: roomCount } = await supabaseAdmin
      .from('accom_rooms')
      .select('id', { count: 'exact', head: true })
      .eq('property_id', propertyId)
      .eq('is_active', true);

    if (!roomCount || roomCount === 0) {
      return NextResponse.json({ chartData: [] });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const periodStart = new Date(today);
    periodStart.setDate(periodStart.getDate() - periodDays);

    const startStr = periodStart.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];

    // Get all bookings overlapping the period
    const { data: bookings } = await supabaseAdmin
      .from('accom_bookings')
      .select('check_in_date, check_out_date')
      .eq('property_id', propertyId)
      .in('status', ['confirmed', 'checked_in', 'checked_out'])
      .lte('check_in_date', todayStr)
      .gte('check_out_date', startStr);

    // Build daily occupancy map
    const chartData: { date: string; occupancy: number }[] = [];

    for (let i = 0; i < periodDays; i++) {
      const d = new Date(periodStart);
      d.setDate(d.getDate() + i);

      // Only include past and today
      if (d > today) break;

      const dateStr = d.toISOString().split('T')[0];

      // Count bookings where check_in <= date < check_out (half-open [) convention)
      let occupiedRooms = 0;
      if (bookings) {
        for (const b of bookings) {
          const checkIn = new Date(b.check_in_date);
          const checkOut = new Date(b.check_out_date);
          checkIn.setHours(0, 0, 0, 0);
          checkOut.setHours(0, 0, 0, 0);

          if (d >= checkIn && d < checkOut) {
            occupiedRooms++;
          }
        }
      }

      const occupancy = Math.round((occupiedRooms / roomCount) * 100);
      chartData.push({ date: dateStr, occupancy: Math.min(occupancy, 100) });
    }

    return NextResponse.json({ chartData });
  } catch (err) {
    console.error('[accommodations/analytics/occupancy-chart] Error:', err);
    return NextResponse.json({ error: 'Failed to compute occupancy chart' }, { status: 500 });
  }
}
