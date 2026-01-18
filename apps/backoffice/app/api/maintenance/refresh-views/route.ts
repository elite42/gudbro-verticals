/**
 * Refresh Materialized Views Cron Job
 *
 * Runs every 15 minutes to refresh materialized views:
 * - mv_analytics_daily
 * - mv_top_items_30d
 * - mv_device_breakdown
 * - mv_hourly_traffic
 *
 * Schedule: Every 15 minutes (via vercel.json cron)
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { logger } from '@/lib/observability/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 1 minute max

// List of materialized views to refresh
const MATERIALIZED_VIEWS = [
  'mv_analytics_daily',
  'mv_top_items_30d',
  'mv_device_breakdown',
  'mv_hourly_traffic',
];

export async function GET(request: Request) {
  const startTime = Date.now();

  // Verify cron secret (optional security)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    logger.warn('Unauthorized refresh-views cron attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: { view: string; success: boolean; duration: number; error?: string }[] = [];

  try {
    const supabase = createClient();

    for (const viewName of MATERIALIZED_VIEWS) {
      const viewStart = Date.now();

      try {
        // REFRESH MATERIALIZED VIEW CONCURRENTLY allows queries during refresh
        const { error } = await supabase.rpc('refresh_materialized_view', {
          view_name: viewName,
        });

        if (error) {
          // View might not exist yet - log warning but continue
          results.push({
            view: viewName,
            success: false,
            duration: Date.now() - viewStart,
            error: error.message,
          });
          logger.warn({ viewName, error: error.message }, `Failed to refresh ${viewName}`);
        } else {
          results.push({
            view: viewName,
            success: true,
            duration: Date.now() - viewStart,
          });
        }
      } catch (error) {
        results.push({
          view: viewName,
          success: false,
          duration: Date.now() - viewStart,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    const totalDuration = Date.now() - startTime;
    const successCount = results.filter((r) => r.success).length;

    logger.info(
      {
        results,
        totalDuration,
        successCount,
        totalViews: MATERIALIZED_VIEWS.length,
        metric: 'refresh_views_maintenance',
      },
      'Materialized views refresh completed'
    );

    return NextResponse.json({
      success: successCount === MATERIALIZED_VIEWS.length,
      results,
      summary: {
        total: MATERIALIZED_VIEWS.length,
        success: successCount,
        failed: MATERIALIZED_VIEWS.length - successCount,
      },
      duration: totalDuration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        duration,
      },
      'Refresh views maintenance error'
    );

    return NextResponse.json(
      {
        error: 'Refresh views maintenance error',
        details: error instanceof Error ? error.message : 'Unknown error',
        results,
      },
      { status: 500 }
    );
  }
}
