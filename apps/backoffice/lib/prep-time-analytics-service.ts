/**
 * Prep Time Analytics Service
 *
 * Provides methods to query and analyze preparation time data.
 * Used by the analytics dashboard and API endpoints.
 */

import { getSupabaseAdmin } from './supabase-admin';

export interface PrepTimeStats {
  merchantId: string;
  period: string;
  days: number;
  station: string | null;
  stats: {
    totalItems: number;
    avgPrepSeconds: number | null;
    medianPrepSeconds: number | null;
    p90PrepSeconds: number | null;
    minPrepSeconds: number | null;
    maxPrepSeconds: number | null;
    itemsOver10min: number;
    itemsOver15min: number;
    trend: number | null;
  };
  dailyBreakdown: Array<{
    date: string;
    station: string | null;
    itemsCompleted: number;
    avgPrepSeconds: number;
    medianPrepSeconds: number;
    p90PrepSeconds: number;
  }>;
}

export interface ItemPrepStats {
  name: Record<string, string>;
  menuItemId: string | null;
  station: string | null;
  timesPrepared: number;
  avgPrepSeconds: number;
  medianPrepSeconds: number;
}

export interface HourlyPattern {
  dayOfWeek: number;
  hourOfDay: number;
  itemsCompleted: number;
  avgPrepSeconds: number;
  medianPrepSeconds: number;
}

export interface StationComparison {
  kitchen: {
    totalItems: number;
    avgPrepSeconds: number;
    medianPrepSeconds: number;
  } | null;
  bar: {
    totalItems: number;
    avgPrepSeconds: number;
    medianPrepSeconds: number;
  } | null;
}

/**
 * Get prep time statistics for a merchant
 */
export async function getPrepTimeStats(
  merchantId: string,
  days: number = 7,
  station: string | null = null
): Promise<PrepTimeStats> {
  const supabase = getSupabaseAdmin();
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Try materialized view first, fall back to raw query
  let query = supabase
    .from('mv_prep_time_summary')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('prep_date', startDate)
    .order('prep_date', { ascending: false });

  if (station) {
    query = query.eq('station', station);
  }

  const { data: summaryData, error } = await query;

  if (error) {
    console.warn('Materialized view query failed, using raw data:', error);
    return await getRawPrepTimeStats(merchantId, days, station);
  }

  // Calculate aggregate stats
  const stats = calculateAggregateStats(summaryData || []);

  return {
    merchantId,
    period: `${days}d`,
    days,
    station,
    stats,
    dailyBreakdown: (summaryData || []).map((d) => ({
      date: d.prep_date,
      station: d.station,
      itemsCompleted: d.items_completed,
      avgPrepSeconds: d.avg_prep_seconds,
      medianPrepSeconds: d.median_prep_seconds,
      p90PrepSeconds: d.p90_prep_seconds,
    })),
  };
}

/**
 * Get slowest items by average prep time
 */
export async function getSlowestItems(
  merchantId: string,
  limit: number = 10,
  station: string | null = null
): Promise<ItemPrepStats[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('mv_item_prep_time_30d')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('avg_prep_seconds', { ascending: false })
    .limit(limit);

  if (station) {
    query = query.eq('station', station);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching slowest items:', error);
    return [];
  }

  return (data || []).map((item) => ({
    name: item.item_name,
    menuItemId: item.menu_item_id,
    station: item.station,
    timesPrepared: item.times_prepared,
    avgPrepSeconds: item.avg_prep_seconds,
    medianPrepSeconds: item.median_prep_seconds,
  }));
}

/**
 * Get fastest items by average prep time
 */
export async function getFastestItems(
  merchantId: string,
  limit: number = 10,
  station: string | null = null
): Promise<ItemPrepStats[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('mv_item_prep_time_30d')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('avg_prep_seconds', { ascending: true })
    .limit(limit);

  if (station) {
    query = query.eq('station', station);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching fastest items:', error);
    return [];
  }

  return (data || []).map((item) => ({
    name: item.item_name,
    menuItemId: item.menu_item_id,
    station: item.station,
    timesPrepared: item.times_prepared,
    avgPrepSeconds: item.avg_prep_seconds,
    medianPrepSeconds: item.median_prep_seconds,
  }));
}

/**
 * Get hourly prep time patterns
 */
export async function getHourlyPattern(
  merchantId: string,
  station: string | null = null
): Promise<HourlyPattern[]> {
  const supabase = getSupabaseAdmin();

  let query = supabase.from('mv_prep_time_hourly').select('*').eq('merchant_id', merchantId);

  if (station) {
    query = query.eq('station', station);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching hourly pattern:', error);
    return [];
  }

  return (data || []).map((h) => ({
    dayOfWeek: h.day_of_week,
    hourOfDay: h.hour_of_day,
    itemsCompleted: h.items_completed,
    avgPrepSeconds: h.avg_prep_seconds,
    medianPrepSeconds: h.median_prep_seconds,
  }));
}

/**
 * Compare prep times between kitchen and bar
 */
export async function getStationComparison(merchantId: string): Promise<StationComparison> {
  const supabase = getSupabaseAdmin();
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('mv_prep_time_summary')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('prep_date', startDate)
    .in('station', ['kitchen', 'bar']);

  if (error) {
    console.error('Error fetching station comparison:', error);
    return { kitchen: null, bar: null };
  }

  const records = data || [];
  const kitchenRecords = records.filter((r) => r.station === 'kitchen');
  const barRecords = records.filter((r) => r.station === 'bar');

  const aggregateStation = (stationRecords: typeof records) => {
    if (stationRecords.length === 0) return null;

    const totalItems = stationRecords.reduce((sum, r) => sum + (r.items_completed || 0), 0);
    const weightedAvg =
      stationRecords.reduce(
        (sum, r) => sum + (r.avg_prep_seconds || 0) * (r.items_completed || 0),
        0
      ) / totalItems;
    const avgMedian =
      stationRecords.reduce((sum, r) => sum + (r.median_prep_seconds || 0), 0) /
      stationRecords.length;

    return {
      totalItems,
      avgPrepSeconds: Math.round(weightedAvg),
      medianPrepSeconds: Math.round(avgMedian),
    };
  };

  return {
    kitchen: aggregateStation(kitchenRecords),
    bar: aggregateStation(barRecords),
  };
}

/**
 * Get daily aggregate data for charting
 */
export async function getDailyAggregates(
  merchantId: string,
  days: number = 30
): Promise<
  Array<{
    date: string;
    station: string | null;
    itemsCompleted: number;
    avgPrepSeconds: number;
    p90PrepSeconds: number;
    itemsOver10min: number;
    itemsOver15min: number;
  }>
> {
  const supabase = getSupabaseAdmin();
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('order_timing_daily_aggregates')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('aggregate_date', startDate)
    .order('aggregate_date', { ascending: false });

  if (error) {
    console.error('Error fetching daily aggregates:', error);
    return [];
  }

  return (data || []).map((d) => ({
    date: d.aggregate_date,
    station: d.station,
    itemsCompleted: d.items_completed,
    avgPrepSeconds: d.avg_prep_time_seconds,
    p90PrepSeconds: d.p90_prep_time_seconds,
    itemsOver10min: d.items_10_to_15min + d.items_over_15min,
    itemsOver15min: d.items_over_15min,
  }));
}

// Helper functions

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
  if (midpoint === 0) {
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
      trend: null,
    };
  }

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
    trend: trend !== null ? Math.round(trend * 10) / 10 : null,
  };
}

async function getRawPrepTimeStats(
  merchantId: string,
  days: number,
  station: string | null
): Promise<PrepTimeStats> {
  const supabase = getSupabaseAdmin();
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  let query = supabase
    .from('order_item_status_history')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('from_status', 'preparing')
    .eq('to_status', 'ready')
    .not('duration_from_previous_seconds', 'is', null)
    .gt('duration_from_previous_seconds', 0)
    .lt('duration_from_previous_seconds', 7200)
    .gte('changed_at', startDate)
    .order('changed_at', { ascending: false });

  if (station) {
    query = query.eq('station', station);
  }

  const { data: rawData, error } = await query;

  if (error) {
    console.error('Error fetching raw prep time data:', error);
    return {
      merchantId,
      period: `${days}d`,
      days,
      station,
      stats: {
        totalItems: 0,
        avgPrepSeconds: null,
        medianPrepSeconds: null,
        p90PrepSeconds: null,
        minPrepSeconds: null,
        maxPrepSeconds: null,
        itemsOver10min: 0,
        itemsOver15min: 0,
        trend: null,
      },
      dailyBreakdown: [],
    };
  }

  const records = rawData || [];
  const durations = records.map((r) => r.duration_from_previous_seconds).filter(Boolean);
  const sorted = durations.sort((a: number, b: number) => a - b);

  return {
    merchantId,
    period: `${days}d`,
    days,
    station,
    stats: {
      totalItems: records.length,
      avgPrepSeconds:
        durations.length > 0
          ? Math.round(durations.reduce((a: number, b: number) => a + b, 0) / durations.length)
          : null,
      medianPrepSeconds: durations.length > 0 ? sorted[Math.floor(sorted.length / 2)] : null,
      p90PrepSeconds: durations.length > 0 ? sorted[Math.floor(sorted.length * 0.9)] : null,
      minPrepSeconds: durations.length > 0 ? Math.min(...durations) : null,
      maxPrepSeconds: durations.length > 0 ? Math.max(...durations) : null,
      itemsOver10min: durations.filter((d: number) => d > 600).length,
      itemsOver15min: durations.filter((d: number) => d > 900).length,
      trend: null,
    },
    dailyBreakdown: [],
  };
}
