/**
 * Metrics Collection Service
 *
 * Collects and stores metrics for monitoring and alerting.
 * Uses Redis for time-series data when available, falls back to in-memory.
 *
 * Metrics tracked:
 * - API response times (P50, P95, P99)
 * - Database query times
 * - Error rates
 * - Cache hit rates
 * - Rate limit proximity
 * - Active users/sessions
 */

import { redis, isRedisEnabled } from '@/lib/cache/redis';
import { LRUCache } from 'lru-cache';

// In-memory fallback for metrics
const memoryMetrics = new LRUCache<string, number[]>({
  max: 1000,
  ttl: 3600000, // 1 hour
});

/**
 * Metric types we track
 */
export type MetricType =
  | 'api_response_time'
  | 'db_query_time'
  | 'cache_hit'
  | 'cache_miss'
  | 'error_count'
  | 'rate_limit_hit'
  | 'active_sessions'
  | 'order_count'
  | 'ai_request_time';

/**
 * Record a metric value
 */
export async function recordMetric(
  type: MetricType,
  value: number,
  tags?: Record<string, string>
): Promise<void> {
  const key = buildMetricKey(type, tags);
  const timestamp = Date.now();

  if (isRedisEnabled()) {
    try {
      // Store in Redis sorted set with timestamp as score
      await redis.zadd(key, { score: timestamp, member: `${timestamp}:${value}` });
      // Keep only last hour of data
      const oneHourAgo = timestamp - 3600000;
      await redis.zremrangebyscore(key, 0, oneHourAgo);
      // Set expiry on key
      await redis.expire(key, 7200); // 2 hours
    } catch (error) {
      console.error('[Metrics] Redis error:', error);
      storeInMemory(key, value);
    }
  } else {
    storeInMemory(key, value);
  }
}

/**
 * Get metrics for a time period
 */
export async function getMetrics(
  type: MetricType,
  periodMinutes: number = 60,
  tags?: Record<string, string>
): Promise<number[]> {
  const key = buildMetricKey(type, tags);
  const now = Date.now();
  const periodStart = now - periodMinutes * 60 * 1000;

  if (isRedisEnabled()) {
    try {
      const results = await redis.zrange(key, periodStart, now, { byScore: true });
      return (results as string[]).map((r: string) => {
        const parts = r.split(':');
        return parseFloat(parts[1]) || 0;
      });
    } catch (error) {
      console.error('[Metrics] Redis read error:', error);
      return getFromMemory(key);
    }
  }

  return getFromMemory(key);
}

/**
 * Calculate percentile from values
 */
export function calculatePercentile(values: number[], percentile: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

/**
 * Get aggregated metrics summary
 */
export async function getMetricsSummary(
  type: MetricType,
  periodMinutes: number = 60,
  tags?: Record<string, string>
): Promise<{
  count: number;
  min: number;
  max: number;
  avg: number;
  p50: number;
  p95: number;
  p99: number;
}> {
  const values = await getMetrics(type, periodMinutes, tags);

  if (values.length === 0) {
    return { count: 0, min: 0, max: 0, avg: 0, p50: 0, p95: 0, p99: 0 };
  }

  const sum = values.reduce((a, b) => a + b, 0);

  return {
    count: values.length,
    min: Math.min(...values),
    max: Math.max(...values),
    avg: sum / values.length,
    p50: calculatePercentile(values, 50),
    p95: calculatePercentile(values, 95),
    p99: calculatePercentile(values, 99),
  };
}

/**
 * Increment a counter metric
 */
export async function incrementCounter(
  type: MetricType,
  tags?: Record<string, string>
): Promise<void> {
  await recordMetric(type, 1, tags);
}

/**
 * Track API response time (helper)
 */
export async function trackResponseTime(endpoint: string, durationMs: number): Promise<void> {
  await recordMetric('api_response_time', durationMs, { endpoint });
}

/**
 * Track database query time (helper)
 */
export async function trackQueryTime(operation: string, durationMs: number): Promise<void> {
  await recordMetric('db_query_time', durationMs, { operation });
}

/**
 * Track cache operations (helper)
 */
export async function trackCacheOperation(hit: boolean): Promise<void> {
  await incrementCounter(hit ? 'cache_hit' : 'cache_miss');
}

/**
 * Get cache hit rate
 */
export async function getCacheHitRate(periodMinutes: number = 60): Promise<number> {
  const hits = await getMetrics('cache_hit', periodMinutes);
  const misses = await getMetrics('cache_miss', periodMinutes);
  const total = hits.length + misses.length;
  if (total === 0) return 100; // No data = assume good
  return (hits.length / total) * 100;
}

/**
 * Get error rate (errors per minute)
 */
export async function getErrorRate(periodMinutes: number = 60): Promise<number> {
  const errors = await getMetrics('error_count', periodMinutes);
  return errors.length / periodMinutes;
}

// Helper functions

function buildMetricKey(type: MetricType, tags?: Record<string, string>): string {
  let key = `metrics:${type}`;
  if (tags) {
    const tagStr = Object.entries(tags)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(',');
    key += `:${tagStr}`;
  }
  return key;
}

function storeInMemory(key: string, value: number): void {
  const existing = memoryMetrics.get(key) || [];
  existing.push(value);
  // Keep last 1000 values
  if (existing.length > 1000) {
    existing.shift();
  }
  memoryMetrics.set(key, existing);
}

function getFromMemory(key: string): number[] {
  return memoryMetrics.get(key) || [];
}
