import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/accommodations/analytics/revenue-chart?propertyId=X&days=30
 *
 * Returns monthly revenue data grouped by room type + services.
 * Each data point: { month: 'Jan 2026', [roomType]: amount, services: amount }
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
    const periodEnd = new Date();
    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - periodDays);

    const startStr = periodStart.toISOString().split('T')[0];
    const endStr = periodEnd.toISOString().split('T')[0];

    // Fetch bookings with room type
    const { data: bookings } = await supabaseAdmin
      .from('accom_bookings')
      .select('check_in_date, total_price, room:accom_rooms(room_type)')
      .eq('property_id', propertyId)
      .in('status', ['confirmed', 'checked_in', 'checked_out'])
      .gte('check_in_date', startStr)
      .lte('check_in_date', endStr);

    // Fetch service orders
    const { data: serviceOrders } = await supabaseAdmin
      .from('accom_service_orders')
      .select('created_at, total')
      .eq('property_id', propertyId)
      .neq('status', 'cancelled')
      .gte('created_at', periodStart.toISOString())
      .lte('created_at', periodEnd.toISOString());

    // Collect all room types
    const roomTypes = new Set<string>();
    const monthlyData: Record<string, Record<string, number>> = {};

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Process bookings
    if (bookings) {
      for (const b of bookings) {
        const d = new Date(b.check_in_date);
        const monthKey = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        const roomType = (b.room as { room_type?: string } | null)?.room_type || 'Unknown';

        roomTypes.add(roomType);

        if (!monthlyData[monthKey]) monthlyData[monthKey] = {};
        monthlyData[monthKey][roomType] =
          (monthlyData[monthKey][roomType] || 0) + (b.total_price || 0);
      }
    }

    // Process service orders
    if (serviceOrders) {
      for (const o of serviceOrders) {
        const d = new Date(o.created_at);
        const monthKey = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

        if (!monthlyData[monthKey]) monthlyData[monthKey] = {};
        monthlyData[monthKey]['services'] =
          (monthlyData[monthKey]['services'] || 0) + (o.total || 0);
      }
    }

    // Build sorted chart data with all room types present in every data point
    const allTypes = Array.from(roomTypes);
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      const parseMonth = (m: string) => {
        const [mon, yr] = m.split(' ');
        return new Date(`${mon} 1, ${yr}`).getTime();
      };
      return parseMonth(a) - parseMonth(b);
    });

    const chartData = sortedMonths.map((month) => {
      const entry: Record<string, string | number> = { month };
      for (const rt of allTypes) {
        entry[rt] = monthlyData[month][rt] || 0;
      }
      entry['services'] = monthlyData[month]['services'] || 0;
      return entry;
    });

    return NextResponse.json({ chartData, roomTypes: allTypes });
  } catch (err) {
    console.error('[accommodations/analytics/revenue-chart] Error:', err);
    return NextResponse.json({ error: 'Failed to compute revenue chart' }, { status: 500 });
  }
}
