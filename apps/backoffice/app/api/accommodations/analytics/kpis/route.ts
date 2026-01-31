import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

interface KPI {
  value: number;
  previousValue: number;
  trend: 'up' | 'down' | 'flat';
}

function computeTrend(current: number, previous: number): 'up' | 'down' | 'flat' {
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'flat';
}

/**
 * GET /api/accommodations/analytics/kpis?propertyId=X&days=30
 *
 * Returns 4 KPIs: occupancy rate, total revenue, ADR, service revenue.
 * Each KPI includes current value, previous period value, and trend direction.
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
    // --- Occupancy Rate ---
    // Current period
    const occupancyCurrent = await computeOccupancy(propertyId, periodDays, 0);
    const occupancyPrevious = await computeOccupancy(propertyId, periodDays, periodDays);

    // --- Revenue ---
    const revenueCurrent = await computeRevenue(propertyId, periodDays, 0);
    const revenuePrevious = await computeRevenue(propertyId, periodDays, periodDays);

    // --- ADR (Average Daily Rate) ---
    const adrCurrent = await computeADR(propertyId, periodDays, 0);
    const adrPrevious = await computeADR(propertyId, periodDays, periodDays);

    // --- Service Revenue ---
    const serviceRevCurrent = await computeServiceRevenue(propertyId, periodDays, 0);
    const serviceRevPrevious = await computeServiceRevenue(propertyId, periodDays, periodDays);

    const result = {
      occupancyRate: {
        value: occupancyCurrent,
        previousValue: occupancyPrevious,
        trend: computeTrend(occupancyCurrent, occupancyPrevious),
      } as KPI,
      totalRevenue: {
        value: revenueCurrent,
        previousValue: revenuePrevious,
        trend: computeTrend(revenueCurrent, revenuePrevious),
      } as KPI,
      adr: {
        value: adrCurrent,
        previousValue: adrPrevious,
        trend: computeTrend(adrCurrent, adrPrevious),
      } as KPI,
      serviceRevenue: {
        value: serviceRevCurrent,
        previousValue: serviceRevPrevious,
        trend: computeTrend(serviceRevCurrent, serviceRevPrevious),
      } as KPI,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error('[accommodations/analytics/kpis] Error:', err);
    return NextResponse.json({ error: 'Failed to compute KPIs' }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

async function computeOccupancy(
  propertyId: string,
  periodDays: number,
  offsetDays: number
): Promise<number> {
  // Get active room count
  const { count: roomCount } = await supabaseAdmin
    .from('accom_rooms')
    .select('id', { count: 'exact', head: true })
    .eq('property_id', propertyId)
    .eq('is_active', true);

  if (!roomCount || roomCount === 0) return 0;

  // Count occupied room-nights in period using SQL via RPC or direct query
  // We query bookings that overlap with our date range
  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() - offsetDays);
  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - periodDays);

  const startStr = periodStart.toISOString().split('T')[0];
  const endStr = periodEnd.toISOString().split('T')[0];

  // Get bookings overlapping with the period
  const { data: bookings } = await supabaseAdmin
    .from('accom_bookings')
    .select('check_in_date, check_out_date')
    .eq('property_id', propertyId)
    .in('status', ['confirmed', 'checked_in', 'checked_out'])
    .lte('check_in_date', endStr)
    .gte('check_out_date', startStr);

  if (!bookings || bookings.length === 0) return 0;

  // Count occupied nights within the period
  let occupiedNights = 0;
  for (const b of bookings) {
    const checkIn = new Date(b.check_in_date);
    const checkOut = new Date(b.check_out_date);
    const rangeStart = new Date(startStr);
    const rangeEnd = new Date(endStr);

    // Clamp to period boundaries
    const effectiveStart = checkIn > rangeStart ? checkIn : rangeStart;
    const effectiveEnd = checkOut < rangeEnd ? checkOut : rangeEnd;

    const nights = Math.max(
      0,
      Math.round((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24))
    );
    occupiedNights += nights;
  }

  const totalCapacity = roomCount * periodDays;
  return totalCapacity > 0 ? Math.round((occupiedNights / totalCapacity) * 100) : 0;
}

async function computeRevenue(
  propertyId: string,
  periodDays: number,
  offsetDays: number
): Promise<number> {
  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() - offsetDays);
  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - periodDays);

  const startStr = periodStart.toISOString().split('T')[0];
  const endStr = periodEnd.toISOString().split('T')[0];

  const { data } = await supabaseAdmin
    .from('accom_bookings')
    .select('total_price')
    .eq('property_id', propertyId)
    .in('status', ['confirmed', 'checked_in', 'checked_out'])
    .gte('check_in_date', startStr)
    .lte('check_in_date', endStr);

  if (!data || data.length === 0) return 0;
  return data.reduce((sum, b) => sum + (b.total_price || 0), 0);
}

async function computeADR(
  propertyId: string,
  periodDays: number,
  offsetDays: number
): Promise<number> {
  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() - offsetDays);
  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - periodDays);

  const startStr = periodStart.toISOString().split('T')[0];
  const endStr = periodEnd.toISOString().split('T')[0];

  const { data } = await supabaseAdmin
    .from('accom_bookings')
    .select('total_price, num_nights')
    .eq('property_id', propertyId)
    .in('status', ['confirmed', 'checked_in', 'checked_out'])
    .gte('check_in_date', startStr)
    .lte('check_in_date', endStr);

  if (!data || data.length === 0) return 0;

  const totalRevenue = data.reduce((sum, b) => sum + (b.total_price || 0), 0);
  const totalNights = data.reduce((sum, b) => sum + (b.num_nights || 0), 0);

  return totalNights > 0 ? Math.round(totalRevenue / totalNights) : 0;
}

async function computeServiceRevenue(
  propertyId: string,
  periodDays: number,
  offsetDays: number
): Promise<number> {
  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() - offsetDays);
  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - periodDays);

  const startStr = periodStart.toISOString();
  const endStr = periodEnd.toISOString();

  const { data } = await supabaseAdmin
    .from('accom_service_orders')
    .select('total')
    .eq('property_id', propertyId)
    .neq('status', 'cancelled')
    .gte('created_at', startStr)
    .lte('created_at', endStr);

  if (!data || data.length === 0) return 0;
  return data.reduce((sum, o) => sum + (o.total || 0), 0);
}
