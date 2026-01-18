/**
 * Archive Maintenance Cron Job
 *
 * Runs weekly to archive old data:
 * - Analytics events older than 1 year
 * - Completed/cancelled orders older than 6 months
 * - Customer messages older than 6 months
 *
 * Schedule: Every Sunday at 3:00 AM (via vercel.json cron)
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { logger } from '@/lib/observability/logger';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max for archive operations

export async function GET(request: Request) {
  const startTime = Date.now();

  // Verify cron secret (optional security)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    logger.warn('Unauthorized archive cron attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createClient();

    // Run archive maintenance function
    const { data, error } = await supabase.rpc('run_archive_maintenance');

    if (error) {
      logger.error({ error: error.message }, 'Archive maintenance failed');
      return NextResponse.json(
        { error: 'Archive maintenance failed', details: error.message },
        { status: 500 }
      );
    }

    const duration = Date.now() - startTime;

    logger.info(
      {
        results: data,
        duration,
        metric: 'archive_maintenance',
      },
      'Archive maintenance completed'
    );

    return NextResponse.json({
      success: true,
      results: data,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        duration,
      },
      'Archive maintenance error'
    );

    return NextResponse.json(
      {
        error: 'Archive maintenance error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
