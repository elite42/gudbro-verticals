/**
 * Prep Time Daily Aggregation
 *
 * Computes and stores daily prep time aggregates for all merchants.
 * Runs daily at 3 AM UTC after the day is complete.
 */

import { schedules, task, logger } from '@trigger.dev/sdk/v3';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

interface AggregationResult {
  merchantId: string;
  station: string;
  itemsCompleted: number;
}

// Scheduled task - runs daily at 3 AM UTC
export const aggregatePrepTimeDaily = schedules.task({
  id: 'aggregate-prep-time-daily',
  cron: '0 3 * * *', // 3:00 AM UTC daily
  run: async () => {
    // Aggregate for yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];

    logger.info('Starting prep time aggregation', { date: dateStr });

    const result = await aggregatePrepTimeForDate(dateStr);

    logger.info('Prep time aggregation completed', {
      date: dateStr,
      merchantsProcessed: result.merchantsProcessed,
      totalRecords: result.totalRecords,
    });

    return result;
  },
});

// Manual trigger task - for backfilling or re-running
export const aggregatePrepTimeTask = task({
  id: 'aggregate-prep-time',
  run: async (payload: { date: string }) => {
    logger.info('Manual prep time aggregation triggered', { date: payload.date });

    const result = await aggregatePrepTimeForDate(payload.date);

    logger.info('Manual aggregation completed', {
      date: payload.date,
      merchantsProcessed: result.merchantsProcessed,
      totalRecords: result.totalRecords,
    });

    return result;
  },
});

// Backfill task - aggregate multiple days
export const backfillPrepTimeAggregates = task({
  id: 'backfill-prep-time-aggregates',
  run: async (payload: { startDate: string; endDate: string }) => {
    logger.info('Starting prep time backfill', {
      startDate: payload.startDate,
      endDate: payload.endDate,
    });

    const start = new Date(payload.startDate);
    const end = new Date(payload.endDate);
    const results: Array<{ date: string; merchantsProcessed: number; totalRecords: number }> = [];

    const currentDate = start;
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const result = await aggregatePrepTimeForDate(dateStr);
      results.push({
        date: dateStr,
        merchantsProcessed: result.merchantsProcessed,
        totalRecords: result.totalRecords,
      });

      // Small delay to not overwhelm the database
      await new Promise((resolve) => setTimeout(resolve, 1000));

      currentDate.setDate(currentDate.getDate() + 1);
    }

    logger.info('Backfill completed', {
      totalDays: results.length,
      results,
    });

    return { totalDays: results.length, results };
  },
});

async function aggregatePrepTimeForDate(dateStr: string): Promise<{
  merchantsProcessed: number;
  totalRecords: number;
  results: AggregationResult[];
}> {
  const supabase = getSupabaseAdmin();
  const results: AggregationResult[] = [];

  try {
    // Call the database function to compute all aggregates
    const { data, error } = await supabase.rpc('compute_all_timing_aggregates_for_date', {
      p_date: dateStr,
    });

    if (error) {
      logger.error('Error computing aggregates via RPC', { error, date: dateStr });

      // Fall back to manual computation if RPC fails
      return await computeAggregatesManually(dateStr);
    }

    // Process results
    const aggregationResults = (data as AggregationResult[]) || [];
    const merchantIds = new Set(aggregationResults.map((r) => r.merchantId));

    return {
      merchantsProcessed: merchantIds.size,
      totalRecords: aggregationResults.length,
      results: aggregationResults,
    };
  } catch (error) {
    logger.error('Exception during aggregation', { error, date: dateStr });
    throw error;
  }
}

async function computeAggregatesManually(dateStr: string): Promise<{
  merchantsProcessed: number;
  totalRecords: number;
  results: AggregationResult[];
}> {
  const supabase = getSupabaseAdmin();
  const results: AggregationResult[] = [];

  // Get all merchants with data for this date
  const { data: merchants, error: merchantsError } = await supabase
    .from('order_item_status_history')
    .select('merchant_id')
    .eq('from_status', 'preparing')
    .eq('to_status', 'ready')
    .gte('changed_at', `${dateStr}T00:00:00Z`)
    .lt('changed_at', `${dateStr}T23:59:59Z`)
    .not('duration_from_previous_seconds', 'is', null);

  if (merchantsError) {
    logger.error('Error fetching merchants', { error: merchantsError });
    return { merchantsProcessed: 0, totalRecords: 0, results: [] };
  }

  const merchantIds = [...new Set((merchants || []).map((m) => m.merchant_id))];

  for (const merchantId of merchantIds) {
    // Compute overall aggregate (no station filter)
    const overallResult = await computeAggregateForMerchant(supabase, merchantId, dateStr, null);
    if (overallResult) {
      results.push(overallResult);
    }

    // Get distinct stations for this merchant on this date
    const { data: stations } = await supabase
      .from('order_item_status_history')
      .select('station')
      .eq('merchant_id', merchantId)
      .eq('from_status', 'preparing')
      .eq('to_status', 'ready')
      .gte('changed_at', `${dateStr}T00:00:00Z`)
      .lt('changed_at', `${dateStr}T23:59:59Z`)
      .not('station', 'is', null);

    const stationNames = [...new Set((stations || []).map((s) => s.station))];

    for (const station of stationNames) {
      const stationResult = await computeAggregateForMerchant(
        supabase,
        merchantId,
        dateStr,
        station
      );
      if (stationResult) {
        results.push(stationResult);
      }
    }
  }

  return {
    merchantsProcessed: merchantIds.length,
    totalRecords: results.length,
    results,
  };
}

async function computeAggregateForMerchant(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  merchantId: string,
  dateStr: string,
  station: string | null
): Promise<AggregationResult | null> {
  try {
    const { data, error } = await supabase.rpc('compute_order_timing_daily_aggregate', {
      p_merchant_id: merchantId,
      p_date: dateStr,
      p_station: station,
    });

    if (error) {
      logger.warn('Error computing aggregate for merchant', {
        merchantId,
        date: dateStr,
        station,
        error,
      });
      return null;
    }

    const result = data as { items_completed?: number } | null;

    return {
      merchantId,
      station: station || 'all',
      itemsCompleted: result?.items_completed || 0,
    };
  } catch (error) {
    logger.error('Exception computing aggregate', { merchantId, date: dateStr, station, error });
    return null;
  }
}
