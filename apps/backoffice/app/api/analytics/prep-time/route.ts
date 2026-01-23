import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/analytics/prep-time
 *
 * Get prep time analytics for a merchant.
 * Supports filtering by date range, station, and various metrics.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Required parameter
    const merchantId = searchParams.get('merchantId');
    if (!merchantId) {
      return NextResponse.json(
        { success: false, error: 'merchantId is required' },
        { status: 400 }
      );
    }

    // Optional filters
    const period = searchParams.get('period') || '7d'; // 7d, 14d, 30d, 90d
    const station = searchParams.get('station'); // kitchen, bar, or null for all
    const includeItems = searchParams.get('includeItems') === 'true';
    const includeHourly = searchParams.get('includeHourly') === 'true';

    // Parse period to days
    const daysMap: Record<string, number> = {
      '7d': 7,
      '14d': 14,
      '30d': 30,
      '90d': 90,
    };
    const days = daysMap[period] || 7;

    const supabase = getSupabaseAdmin();

    // Get summary stats from materialized view
    let summaryQuery = supabase
      .from('mv_prep_time_summary')
      .select('*')
      .eq('merchant_id', merchantId)
      .gte(
        'prep_date',
        new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      )
      .order('prep_date', { ascending: false });

    if (station) {
      summaryQuery = summaryQuery.eq('station', station);
    }

    const { data: summaryData, error: summaryError } = await summaryQuery;

    if (summaryError) {
      console.error('Error fetching prep time summary:', summaryError);
      // Fall back to raw query if materialized view doesn't exist
      return await getRawPrepTimeStats(
        supabase,
        merchantId,
        days,
        station,
        includeItems,
        includeHourly
      );
    }

    // Calculate aggregate stats
    const stats = calculateAggregateStats(summaryData || []);

    // Build response
    const response: Record<string, unknown> = {
      success: true,
      merchantId,
      period,
      days,
      station: station || 'all',
      stats,
      dailyBreakdown: (summaryData || []).map((d) => ({
        date: d.prep_date,
        station: d.station,
        itemsCompleted: d.items_completed,
        avgPrepSeconds: d.avg_prep_seconds,
        medianPrepSeconds: d.median_prep_seconds,
        p90PrepSeconds: d.p90_prep_seconds,
        itemsOver10min: d.items_over_10min,
        itemsOver15min: d.items_over_15min,
      })),
    };

    // Include per-item stats if requested
    if (includeItems) {
      let itemsQuery = supabase
        .from('mv_item_prep_time_30d')
        .select('*')
        .eq('merchant_id', merchantId)
        .order('avg_prep_seconds', { ascending: false })
        .limit(20);

      if (station) {
        itemsQuery = itemsQuery.eq('station', station);
      }

      const { data: itemsData } = await itemsQuery;
      response.slowestItems = (itemsData || []).slice(0, 10).map((item) => ({
        name: item.item_name,
        menuItemId: item.menu_item_id,
        station: item.station,
        timesPrepared: item.times_prepared,
        avgPrepSeconds: item.avg_prep_seconds,
        medianPrepSeconds: item.median_prep_seconds,
      }));

      response.fastestItems = (itemsData || [])
        .slice()
        .sort((a, b) => (a.avg_prep_seconds || 0) - (b.avg_prep_seconds || 0))
        .slice(0, 10)
        .map((item) => ({
          name: item.item_name,
          menuItemId: item.menu_item_id,
          station: item.station,
          timesPrepared: item.times_prepared,
          avgPrepSeconds: item.avg_prep_seconds,
          medianPrepSeconds: item.median_prep_seconds,
        }));
    }

    // Include hourly pattern if requested
    if (includeHourly) {
      let hourlyQuery = supabase
        .from('mv_prep_time_hourly')
        .select('*')
        .eq('merchant_id', merchantId);

      if (station) {
        hourlyQuery = hourlyQuery.eq('station', station);
      }

      const { data: hourlyData } = await hourlyQuery;
      response.hourlyPattern = (hourlyData || []).map((h) => ({
        dayOfWeek: h.day_of_week,
        hourOfDay: h.hour_of_day,
        itemsCompleted: h.items_completed,
        avgPrepSeconds: h.avg_prep_seconds,
        medianPrepSeconds: h.median_prep_seconds,
      }));
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Prep time analytics API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

interface SummaryRecord {
  items_completed: number;
  avg_prep_seconds: number | null;
  median_prep_seconds: number | null;
  p90_prep_seconds: number | null;
  min_prep_seconds: number | null;
  max_prep_seconds: number | null;
  items_over_10min: number | null;
  items_over_15min: number | null;
}

function calculateAggregateStats(data: SummaryRecord[]) {
  if (data.length === 0) {
    return {
      totalItems: 0,
      avgPrepSeconds: null,
      medianPrepSeconds: null,
      p90PrepSeconds: null,
      minPrepSeconds: null,
      maxPrepSeconds: null,
      itemsOver10min: 0,
      itemsOver15min: 0,
      trend: null,
    };
  }

  const totalItems = data.reduce((sum, d) => sum + (d.items_completed || 0), 0);
  const weightedAvg =
    data.reduce((sum, d) => sum + (d.avg_prep_seconds || 0) * (d.items_completed || 0), 0) /
    totalItems;

  // Calculate trend (first half vs second half)
  const midpoint = Math.floor(data.length / 2);
  const recentAvg =
    data.slice(0, midpoint).reduce((sum, d) => sum + (d.avg_prep_seconds || 0), 0) / midpoint;
  const olderAvg =
    data.slice(midpoint).reduce((sum, d) => sum + (d.avg_prep_seconds || 0), 0) /
    (data.length - midpoint);
  const trend = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : null;

  return {
    totalItems,
    avgPrepSeconds: Math.round(weightedAvg),
    medianPrepSeconds: Math.round(
      data.reduce((sum, d) => sum + (d.median_prep_seconds || 0), 0) / data.length
    ),
    p90PrepSeconds: Math.round(
      data.reduce((sum, d) => sum + (d.p90_prep_seconds || 0), 0) / data.length
    ),
    minPrepSeconds: Math.min(...data.map((d) => d.min_prep_seconds || Infinity)),
    maxPrepSeconds: Math.max(...data.map((d) => d.max_prep_seconds || 0)),
    itemsOver10min: data.reduce((sum, d) => sum + (d.items_over_10min || 0), 0),
    itemsOver15min: data.reduce((sum, d) => sum + (d.items_over_15min || 0), 0),
    trend: trend !== null ? Math.round(trend * 10) / 10 : null, // % change
  };
}

/**
 * Fallback: Query raw data if materialized views don't exist
 */
async function getRawPrepTimeStats(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  merchantId: string,
  days: number,
  station: string | null,
  includeItems: boolean,
  includeHourly: boolean
) {
  // Query raw history table
  let query = supabase
    .from('order_item_status_history')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('from_status', 'preparing')
    .eq('to_status', 'ready')
    .not('duration_from_previous_seconds', 'is', null)
    .gt('duration_from_previous_seconds', 0)
    .lt('duration_from_previous_seconds', 7200)
    .gte('changed_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('changed_at', { ascending: false });

  if (station) {
    query = query.eq('station', station);
  }

  const { data: rawData, error } = await query;

  if (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prep time data' },
      { status: 500 }
    );
  }

  const records = rawData || [];

  // Calculate basic stats
  const durations = records.map((r) => r.duration_from_previous_seconds).filter(Boolean);
  const sorted = durations.sort((a, b) => a - b);

  const stats = {
    totalItems: records.length,
    avgPrepSeconds:
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : null,
    medianPrepSeconds: durations.length > 0 ? sorted[Math.floor(sorted.length / 2)] : null,
    p90PrepSeconds: durations.length > 0 ? sorted[Math.floor(sorted.length * 0.9)] : null,
    minPrepSeconds: durations.length > 0 ? Math.min(...durations) : null,
    maxPrepSeconds: durations.length > 0 ? Math.max(...durations) : null,
    itemsOver10min: durations.filter((d) => d > 600).length,
    itemsOver15min: durations.filter((d) => d > 900).length,
    trend: null,
  };

  const response: Record<string, unknown> = {
    success: true,
    merchantId,
    period: `${days}d`,
    days,
    station: station || 'all',
    stats,
    source: 'raw', // Indicate this came from raw data, not materialized view
  };

  return NextResponse.json(response);
}
