/**
 * Health Check Endpoint
 *
 * GET /api/health
 *
 * Returns overall system health including:
 * - Redis cache status
 * - Database connection (via Supabase)
 *
 * Used by: Vercel health checks, monitoring systems
 */

import { NextResponse } from 'next/server';
import { checkRedisHealth } from '@/lib/cache';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    redis: {
      status: 'up' | 'down';
      latencyMs: number;
      error?: string;
    };
    database: {
      status: 'up' | 'down';
      latencyMs: number;
      error?: string;
    };
  };
  version: string;
}

export async function GET(): Promise<NextResponse<HealthStatus>> {
  const timestamp = new Date().toISOString();

  // Check Redis
  const redisHealth = await checkRedisHealth();

  // Check Database
  const dbStart = Date.now();
  let dbStatus: 'up' | 'down' = 'down';
  let dbError: string | undefined;

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // Read-only for health check
          },
        },
      }
    );

    // Simple query to check connection
    const { error } = await supabase.from('merchants').select('id').limit(1);

    if (!error) {
      dbStatus = 'up';
    } else {
      dbError = error.message;
    }
  } catch (err) {
    dbError = err instanceof Error ? err.message : 'Unknown error';
  }

  const dbLatency = Date.now() - dbStart;

  // Determine overall status
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

  if (!redisHealth.connected || dbStatus === 'down') {
    overallStatus = 'unhealthy';
  } else if (redisHealth.latencyMs > 100 || dbLatency > 500) {
    overallStatus = 'degraded';
  }

  const response: HealthStatus = {
    status: overallStatus,
    timestamp,
    services: {
      redis: {
        status: redisHealth.connected ? 'up' : 'down',
        latencyMs: redisHealth.latencyMs,
        error: redisHealth.error,
      },
      database: {
        status: dbStatus,
        latencyMs: dbLatency,
        error: dbError,
      },
    },
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local',
  };

  const httpStatus = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503;

  return NextResponse.json(response, { status: httpStatus });
}
