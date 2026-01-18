/**
 * Analytics Daily Aggregation
 *
 * Pre-computes daily analytics metrics to improve dashboard performance.
 *
 * Schedule: 2:00 AM daily
 */

import { schedules, task, logger } from '@trigger.dev/sdk/v3';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

interface AggregationResult {
  date: string;
  merchantsProcessed: number;
  rowsInserted: number;
  duration: number;
}

// Scheduled task - runs at 2 AM UTC daily
export const analyticsDailyAggregate = schedules.task({
  id: 'analytics-daily-aggregate',
  cron: '0 2 * * *', // 2:00 AM UTC daily
  run: async () => {
    const result = await aggregateDailyAnalytics();
    logger.info('Daily analytics aggregated', { ...result });
    return result;
  },
});

// Manual trigger task
export const aggregateDailyAnalyticsTask = task({
  id: 'aggregate-daily-analytics',
  run: async (payload?: { date?: string }) => {
    return await aggregateDailyAnalytics(payload?.date);
  },
});

async function aggregateDailyAnalytics(targetDate?: string): Promise<AggregationResult> {
  const supabase = getSupabaseAdmin();
  const startTime = Date.now();

  // Default to yesterday if no date provided
  const date = targetDate || getYesterday();

  // Get unique merchants with analytics events for this date
  const { data: merchants, error: merchantsError } = await supabase
    .from('analytics_events')
    .select('merchant_id')
    .eq('event_date', date)
    .not('merchant_id', 'is', null);

  if (merchantsError) {
    logger.error('Failed to get merchants', { error: merchantsError });
    throw new Error(merchantsError.message);
  }

  // Get unique merchant IDs
  const merchantIds = [...new Set(merchants?.map((m) => m.merchant_id).filter(Boolean))];

  if (merchantIds.length === 0) {
    return {
      date,
      merchantsProcessed: 0,
      rowsInserted: 0,
      duration: Date.now() - startTime,
    };
  }

  let rowsInserted = 0;

  // Process each merchant
  for (const merchantId of merchantIds) {
    // Aggregate metrics for this merchant and date
    const { data: events } = await supabase
      .from('analytics_events')
      .select('event_name, anonymous_id, session_id, properties')
      .eq('merchant_id', merchantId)
      .eq('event_date', date);

    if (!events || events.length === 0) continue;

    // Calculate metrics
    const pageViews = events.filter((e) => e.event_name === 'page_view').length;
    const uniqueVisitors = new Set(events.map((e) => e.anonymous_id).filter(Boolean)).size;
    const sessions = new Set(events.map((e) => e.session_id).filter(Boolean)).size;
    const itemViews = events.filter((e) => e.event_name === 'item_view').length;
    const addToCarts = events.filter((e) => e.event_name === 'add_to_cart').length;
    const orders = events.filter((e) => e.event_name === 'order_completed').length;

    // Calculate total order value
    let totalOrderValue = 0;
    for (const event of events) {
      if (event.event_name === 'order_completed' && event.properties) {
        const props = event.properties as Record<string, unknown>;
        totalOrderValue += (props.total as number) || 0;
      }
    }

    // Upsert daily aggregate
    const { error: upsertError } = await supabase.from('analytics_daily_aggregates').upsert(
      {
        merchant_id: merchantId,
        event_date: date,
        page_views: pageViews,
        unique_visitors: uniqueVisitors,
        sessions,
        item_views: itemViews,
        add_to_carts: addToCarts,
        orders,
        total_order_value: totalOrderValue,
        conversion_rate: pageViews > 0 ? (orders / pageViews) * 100 : 0,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'merchant_id,event_date',
      }
    );

    if (upsertError) {
      logger.error('Failed to upsert aggregate', { merchantId, error: upsertError });
    } else {
      rowsInserted++;
    }
  }

  return {
    date,
    merchantsProcessed: merchantIds.length,
    rowsInserted,
    duration: Date.now() - startTime,
  };
}

function getYesterday(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

// Backfill task for historical data
export const backfillAnalyticsTask = task({
  id: 'backfill-analytics-aggregates',
  run: async (payload: { startDate: string; endDate: string }) => {
    const { startDate, endDate } = payload;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const results: AggregationResult[] = [];

    const currentDate = new Date(start);
    while (currentDate <= end) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const result = await aggregateDailyAnalytics(dateStr);
      results.push(result);
      currentDate.setDate(currentDate.getDate() + 1);

      // Small delay to avoid overwhelming the database
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    logger.info('Backfill completed', {
      daysProcessed: results.length,
      totalRows: results.reduce((sum, r) => sum + r.rowsInserted, 0),
    });

    return { daysProcessed: results.length, results };
  },
});
