/**
 * Analytics Views Refresh
 *
 * Refreshes materialized views for fast dashboard queries.
 *
 * Schedule: Every 15 minutes
 */

import { schedules, task, logger } from '@trigger.dev/sdk/v3';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

interface RefreshResult {
  view: string;
  success: boolean;
  duration: number;
  error?: string;
}

// Scheduled task - runs every 15 minutes
export const refreshAnalyticsViews = schedules.task({
  id: 'refresh-analytics-views',
  cron: '*/15 * * * *', // Every 15 minutes
  run: async () => {
    const result = await refreshAllViews();
    logger.info('Analytics views refreshed', result);
    return result;
  },
});

// Manual trigger task
export const refreshViewsTask = task({
  id: 'refresh-views',
  run: async () => {
    return await refreshAllViews();
  },
});

// Refresh a specific view
export const refreshSingleViewTask = task({
  id: 'refresh-single-view',
  run: async (payload: { viewName: string }) => {
    return await refreshView(payload.viewName);
  },
});

const MATERIALIZED_VIEWS = [
  'mv_analytics_daily',
  'mv_top_items_30d',
  'mv_hourly_traffic',
  'mv_device_breakdown',
];

async function refreshAllViews(): Promise<{
  total: number;
  success: number;
  failed: number;
  results: RefreshResult[];
}> {
  const results: RefreshResult[] = [];

  for (const viewName of MATERIALIZED_VIEWS) {
    const result = await refreshView(viewName);
    results.push(result);

    // Small delay between refreshes to not overwhelm the database
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return {
    total: MATERIALIZED_VIEWS.length,
    success: results.filter((r) => r.success).length,
    failed: results.filter((r) => !r.success).length,
    results,
  };
}

async function refreshView(viewName: string): Promise<RefreshResult> {
  const supabase = getSupabaseAdmin();
  const startTime = Date.now();

  try {
    // Check if view exists first
    const { data: viewExists, error: checkError } = await supabase.rpc('check_view_exists', {
      view_name: viewName,
    });

    if (checkError) {
      // View check function might not exist, try direct refresh
      logger.warn('Could not check view existence', { viewName, error: checkError });
    }

    // Execute refresh concurrently (non-blocking refresh)
    const { error } = await supabase.rpc('refresh_materialized_view_concurrently', {
      view_name: viewName,
    });

    if (error) {
      // Try non-concurrent refresh as fallback
      const { error: fallbackError } = await supabase.rpc('refresh_materialized_view', {
        view_name: viewName,
      });

      if (fallbackError) {
        throw fallbackError;
      }
    }

    return {
      view: viewName,
      success: true,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Don't throw - continue with other views
    logger.error('Failed to refresh view', { viewName, error: message });

    return {
      view: viewName,
      success: false,
      duration: Date.now() - startTime,
      error: message,
    };
  }
}
