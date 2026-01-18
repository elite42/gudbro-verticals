/**
 * Health Check Endpoint
 *
 * GET /api/health - Basic health check (for uptime monitors)
 * GET /api/health?detailed=true - Full health with alerts
 * GET /api/health?alerts=true - Only triggered alerts
 *
 * Returns overall system health including:
 * - Redis cache status
 * - Database connection (via Supabase)
 * - Performance alerts
 * - Capacity alerts
 *
 * Used by: Vercel health checks, monitoring systems, admin dashboard
 */

import { NextResponse } from 'next/server';
import { checkRedisHealth } from '@/lib/cache';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { checkAllAlerts, getTriggeredAlerts, type AlertStatus } from '@/lib/observability/alerts';
import { getCoalescingStats } from '@/lib/cache/request-coalescing';
import { edgeCache } from '@/lib/cache/edge-cache';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'critical' | 'warning';
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
  alerts?: {
    total: number;
    triggered: number;
    critical: number;
    warning: number;
    details?: FormattedAlert[];
  };
  infrastructure?: {
    edgeCache: boolean;
    coalescingStats: ReturnType<typeof getCoalescingStats>;
  };
}

interface FormattedAlert {
  id: string;
  name: string;
  category: string;
  level: string;
  value: number;
  unit: string;
  message: string;
  action?: string;
  thresholds: { warning: number; critical: number };
}

function formatAlert(alertStatus: AlertStatus): FormattedAlert {
  return {
    id: alertStatus.alert.id,
    name: alertStatus.alert.name,
    category: alertStatus.alert.category,
    level: alertStatus.result.level,
    value: alertStatus.result.currentValue,
    unit: alertStatus.result.unit,
    message: alertStatus.result.message,
    action: alertStatus.result.action,
    thresholds: {
      warning: alertStatus.alert.warningThreshold,
      critical: alertStatus.alert.criticalThreshold,
    },
  };
}

export async function GET(
  request: Request
): Promise<
  NextResponse<
    | HealthStatus
    | { status: string; triggeredCount: number; alerts: FormattedAlert[]; timestamp: string }
  >
> {
  const { searchParams } = new URL(request.url);
  const detailed = searchParams.get('detailed') === 'true';
  const alertsOnly = searchParams.get('alerts') === 'true';

  // Quick alerts-only response
  if (alertsOnly) {
    const triggered = await getTriggeredAlerts();
    const status = triggered.some((a) => a.result.level === 'CRITICAL')
      ? 'critical'
      : triggered.some((a) => a.result.level === 'WARNING')
        ? 'warning'
        : 'healthy';

    return NextResponse.json({
      status,
      triggeredCount: triggered.length,
      alerts: triggered.map(formatAlert),
      timestamp: new Date().toISOString(),
    });
  }

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

  // Determine overall status from services
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' | 'critical' | 'warning' = 'healthy';

  if (!redisHealth.connected || dbStatus === 'down') {
    overallStatus = 'unhealthy';
  } else if (redisHealth.latencyMs > 100 || dbLatency > 500) {
    overallStatus = 'degraded';
  }

  // Build base response
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

  // Add detailed information if requested
  if (detailed) {
    const allAlerts = await checkAllAlerts();
    const triggered = allAlerts.filter((a) => a.result.level !== 'INFO');
    const criticalCount = triggered.filter((a) => a.result.level === 'CRITICAL').length;
    const warningCount = triggered.filter((a) => a.result.level === 'WARNING').length;

    // Override status based on alerts
    if (criticalCount > 0) {
      overallStatus = 'critical';
    } else if (warningCount > 0 && overallStatus === 'healthy') {
      overallStatus = 'warning';
    }

    response.status = overallStatus;
    response.alerts = {
      total: allAlerts.length,
      triggered: triggered.length,
      critical: criticalCount,
      warning: warningCount,
      details: allAlerts.map(formatAlert),
    };
    response.infrastructure = {
      edgeCache: edgeCache.isEdgeCacheEnabled(),
      coalescingStats: getCoalescingStats(),
    };
  }

  const httpStatus = overallStatus === 'critical' || overallStatus === 'unhealthy' ? 503 : 200;

  return NextResponse.json(response, { status: httpStatus });
}
