/**
 * Upstash Redis Cache Client
 *
 * Serverless Redis client for caching and rate limiting.
 * Part of SCALE-ROADMAP.md Phase 1 Foundation.
 *
 * @requires UPSTASH_REDIS_REST_URL - Redis endpoint URL
 * @requires UPSTASH_REDIS_REST_TOKEN - Redis auth token
 */

import { Redis } from '@upstash/redis';

// ============================================================================
// Configuration
// ============================================================================

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

/**
 * Redis client - lazy initialized to avoid build errors when env vars missing
 */
let redisClient: Redis | null = null;

function getRedis(): Redis {
  if (!redisClient) {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
      // Fallback to in-memory mock for development without Redis
      console.warn('[Cache] Upstash credentials missing - using no-op cache');
      return createNoOpRedis();
    }
    redisClient = new Redis({
      url: UPSTASH_URL,
      token: UPSTASH_TOKEN,
    });
  }
  return redisClient;
}

/**
 * No-op Redis implementation for development/testing
 */
function createNoOpRedis(): Redis {
  return {
    get: async () => null,
    set: async () => 'OK',
    del: async () => 0,
    expire: async () => 1,
    incr: async () => 1,
    exists: async () => 0,
    ttl: async () => -1,
    scan: async () => [0, []],
    keys: async () => [],
    // Add more methods as needed
  } as unknown as Redis;
}

// Export the lazy-loaded client
export const redis = new Proxy({} as Redis, {
  get: (_, prop) => {
    const client = getRedis();
    const value = client[prop as keyof Redis];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

// ============================================================================
// Cache Key Patterns
// ============================================================================

/**
 * Standardized cache key patterns.
 * All keys should use these patterns for consistency and easy invalidation.
 */
export const CacheKeys = {
  // Menu data (high read frequency)
  merchantMenu: (slug: string) => `menu:${slug}` as const,
  menuCategories: (merchantId: string) => `menu:categories:${merchantId}` as const,
  menuItem: (itemId: string) => `menu:item:${itemId}` as const,

  // Merchant configuration
  merchantConfig: (merchantId: string) => `merchant:${merchantId}:config` as const,
  merchantSettings: (merchantId: string) => `merchant:${merchantId}:settings` as const,
  merchantLocations: (merchantId: string) => `merchant:${merchantId}:locations` as const,

  // User/Session data
  userSession: (userId: string) => `session:${userId}` as const,
  userMerchants: (userId: string) => `user:${userId}:merchants` as const,
  accountProfile: (accountId: string) => `account:${accountId}:profile` as const,

  // Rate limiting (used internally by @upstash/ratelimit)
  rateLimit: (identifier: string, type: string) => `ratelimit:${type}:${identifier}` as const,

  // Analytics (aggregated data)
  analyticsDaily: (merchantId: string, date: string) =>
    `analytics:${merchantId}:daily:${date}` as const,
  analyticsWeekly: (merchantId: string, week: string) =>
    `analytics:${merchantId}:weekly:${week}` as const,

  // Weather (external API cache)
  weather: (lat: number, lng: number) => `weather:${lat.toFixed(2)}:${lng.toFixed(2)}` as const,

  // AI responses (expensive operations)
  aiBootstrap: (merchantId: string) => `ai:bootstrap:${merchantId}` as const,
  aiZoneAnalysis: (merchantId: string) => `ai:zone:${merchantId}` as const,

  // QR codes
  qrCode: (shortcode: string) => `qr:${shortcode}` as const,
  qrScanStats: (qrId: string) => `qr:stats:${qrId}` as const,
} as const;

// ============================================================================
// Cache TTL Values (in seconds)
// ============================================================================

/**
 * Time-to-live values for different cache types.
 * Shorter TTL for frequently changing data, longer for stable data.
 */
export const CacheTTL = {
  // Menu data - moderate TTL (changes occasionally)
  MENU: 300, // 5 minutes
  MENU_ITEM: 300, // 5 minutes

  // Merchant config - longer TTL (rarely changes)
  MERCHANT_CONFIG: 3600, // 1 hour
  MERCHANT_SETTINGS: 1800, // 30 minutes

  // Session data - long TTL
  SESSION: 86400, // 24 hours
  USER_DATA: 3600, // 1 hour

  // Rate limiting - short TTL (sliding window)
  RATE_LIMIT: 60, // 1 minute

  // Analytics - moderate TTL
  ANALYTICS_DAILY: 900, // 15 minutes
  ANALYTICS_WEEKLY: 3600, // 1 hour

  // External API data - moderate TTL
  WEATHER: 1800, // 30 minutes

  // AI responses - longer TTL (expensive to regenerate)
  AI_BOOTSTRAP: 86400, // 24 hours
  AI_ZONE: 43200, // 12 hours

  // QR codes - moderate TTL
  QR_CODE: 600, // 10 minutes
  QR_STATS: 300, // 5 minutes
} as const;

// ============================================================================
// Cache Utility Functions
// ============================================================================

/**
 * Get cached data or fetch and cache if missing.
 * Classic cache-aside pattern with automatic TTL.
 *
 * @example
 * const menu = await cacheGet(
 *   CacheKeys.merchantMenu('roots-coffee'),
 *   () => fetchMenuFromDB('roots-coffee'),
 *   CacheTTL.MENU
 * );
 */
export async function cacheGet<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds: number = CacheTTL.MENU
): Promise<T> {
  try {
    // Check cache first
    const cached = await redis.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Fetch fresh data
    const fresh = await fetchFn();

    // Cache the result (don't await - fire and forget)
    redis.set(key, fresh, { ex: ttlSeconds }).catch((err) => {
      console.error(`[Cache] Failed to set ${key}:`, err);
    });

    return fresh;
  } catch (error) {
    console.error(`[Cache] Error in cacheGet for ${key}:`, error);
    // Fallback to direct fetch on cache error
    return fetchFn();
  }
}

/**
 * Invalidate cache by key.
 * Use after mutations that affect cached data.
 */
export async function cacheInvalidate(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch (error) {
    console.error(`[Cache] Failed to invalidate ${key}:`, error);
  }
}

/**
 * Invalidate multiple cache keys by pattern.
 * Use carefully - scans can be slow on large datasets.
 */
export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  try {
    let cursor = 0;
    do {
      const [nextCursor, keys] = await redis.scan(cursor, { match: pattern, count: 100 });
      cursor = Number(nextCursor);
      if (keys.length > 0) {
        await Promise.all(keys.map((key) => redis.del(key)));
      }
    } while (cursor !== 0);
  } catch (error) {
    console.error(`[Cache] Failed to invalidate pattern ${pattern}:`, error);
  }
}

/**
 * Invalidate all menu-related cache for a merchant.
 * Call after menu updates (items, categories, etc.)
 */
export async function invalidateMerchantMenu(
  merchantSlug: string,
  merchantId: string
): Promise<void> {
  await Promise.all([
    cacheInvalidate(CacheKeys.merchantMenu(merchantSlug)),
    cacheInvalidate(CacheKeys.menuCategories(merchantId)),
  ]);
}

/**
 * Invalidate merchant configuration cache.
 * Call after settings updates.
 */
export async function invalidateMerchantConfig(merchantId: string): Promise<void> {
  await Promise.all([
    cacheInvalidate(CacheKeys.merchantConfig(merchantId)),
    cacheInvalidate(CacheKeys.merchantSettings(merchantId)),
    cacheInvalidate(CacheKeys.merchantLocations(merchantId)),
  ]);
}

// ============================================================================
// Health Check
// ============================================================================

/**
 * Check if Redis is connected and responding.
 * Use for health endpoints and debugging.
 */
export async function checkRedisHealth(): Promise<{
  connected: boolean;
  latencyMs: number;
  error?: string;
}> {
  const start = Date.now();
  try {
    await redis.set('health:check', Date.now(), { ex: 10 });
    const value = await redis.get('health:check');
    return {
      connected: value !== null,
      latencyMs: Date.now() - start,
    };
  } catch (error) {
    return {
      connected: false,
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
