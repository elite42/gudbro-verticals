/**
 * Edge Caching Layer
 *
 * Provides edge-optimized caching for frequently accessed data.
 * Uses Vercel KV when available, falls back to in-memory LRU cache.
 *
 * Phase 3: 10K → 100K users
 *
 * Usage:
 * ```ts
 * import { edgeCache } from '@/lib/cache/edge-cache';
 *
 * // Get cached menu (returns from edge if available)
 * const { data, source } = await edgeCache.getMenu('merchant-slug');
 *
 * // Invalidate on update
 * await edgeCache.invalidateMenu('merchant-slug');
 * ```
 */

import { LRUCache } from 'lru-cache';

// Feature flag - enable when Vercel KV is configured
const USE_VERCEL_KV = !!process.env.KV_REST_API_URL;

// TTL constants (seconds)
const TTL = {
  MENU: 300, // 5 minutes
  MERCHANT_CONFIG: 600, // 10 minutes
  ANALYTICS_SUMMARY: 60, // 1 minute
} as const;

// In-memory fallback cache
const memoryCache = new LRUCache<string, Record<string, unknown>>({
  max: 500, // Max 500 items
  ttl: TTL.MENU * 1000, // Default TTL in ms
});

// Vercel KV client interface
interface KvClient {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: unknown, options?: { ex?: number }) => Promise<void>;
  del: (key: string) => Promise<void>;
}

// Vercel KV client (lazy loaded)
const kvClient: KvClient | null = null;
let kvLoadAttempted = false;

async function getKvClient(): Promise<KvClient | null> {
  if (!USE_VERCEL_KV) return null;
  if (kvLoadAttempted) return kvClient;

  kvLoadAttempted = true;

  // NOTE: @vercel/kv is an optional dependency
  // Install it with: pnpm add @vercel/kv
  // Then uncomment the code below and remove the null return

  // For now, always use memory cache fallback
  // When ready to use Vercel KV:
  // 1. pnpm add @vercel/kv
  // 2. Set KV_REST_API_URL and KV_REST_API_TOKEN in env
  // 3. Uncomment this block:
  /*
  try {
    const vercelKv = await import('@vercel/kv');
    if (vercelKv?.kv) {
      kvClient = vercelKv.kv as KvClient;
    }
  } catch {
    console.warn('[EdgeCache] Vercel KV not available, using memory cache');
  }
  */

  return kvClient;
}

export type CacheSource = 'edge' | 'memory' | 'miss';

interface CacheResult<T> {
  data: T | null;
  source: CacheSource;
}

/**
 * Edge-optimized cache operations
 */
export const edgeCache = {
  /**
   * Get menu data from edge cache
   */
  async getMenu<T>(merchantSlug: string): Promise<CacheResult<T>> {
    const key = `menu:${merchantSlug}`;
    return this.get<T>(key);
  },

  /**
   * Set menu data in edge cache
   */
  async setMenu<T>(merchantSlug: string, data: T): Promise<void> {
    const key = `menu:${merchantSlug}`;
    await this.set(key, data, TTL.MENU);
  },

  /**
   * Invalidate menu cache for a merchant
   */
  async invalidateMenu(merchantSlug: string): Promise<void> {
    const key = `menu:${merchantSlug}`;
    await this.del(key);
    // Also invalidate related keys
    await this.del(`merchant:${merchantSlug}:config`);
  },

  /**
   * Get merchant configuration from edge cache
   */
  async getMerchantConfig<T>(merchantSlug: string): Promise<CacheResult<T>> {
    const key = `merchant:${merchantSlug}:config`;
    return this.get<T>(key);
  },

  /**
   * Set merchant configuration in edge cache
   */
  async setMerchantConfig<T>(merchantSlug: string, data: T): Promise<void> {
    const key = `merchant:${merchantSlug}:config`;
    await this.set(key, data, TTL.MERCHANT_CONFIG);
  },

  /**
   * Generic get operation
   */
  async get<T>(key: string): Promise<CacheResult<T>> {
    // Try Vercel KV first
    const kv = await getKvClient();
    if (kv) {
      try {
        const data = await kv.get<T>(key);
        if (data !== null) {
          return { data, source: 'edge' };
        }
      } catch (error) {
        console.error('[EdgeCache] KV get error:', error);
      }
    }

    // Fall back to memory cache
    const cached = memoryCache.get(key) as T | undefined;
    if (cached !== undefined) {
      return { data: cached, source: 'memory' };
    }

    return { data: null, source: 'miss' };
  },

  /**
   * Generic set operation
   */
  async set<T>(key: string, data: T, ttlSeconds: number = TTL.MENU): Promise<void> {
    // Set in Vercel KV
    const kv = await getKvClient();
    if (kv) {
      try {
        await kv.set(key, data, { ex: ttlSeconds });
      } catch (error) {
        console.error('[EdgeCache] KV set error:', error);
      }
    }

    // Also set in memory cache
    memoryCache.set(key, data as Record<string, unknown>, { ttl: ttlSeconds * 1000 });
  },

  /**
   * Generic delete operation
   */
  async del(key: string): Promise<void> {
    // Delete from Vercel KV
    const kv = await getKvClient();
    if (kv) {
      try {
        await kv.del(key);
      } catch (error) {
        console.error('[EdgeCache] KV del error:', error);
      }
    }

    // Also delete from memory cache
    memoryCache.delete(key);
  },

  /**
   * Check if edge caching (Vercel KV) is enabled
   */
  isEdgeCacheEnabled(): boolean {
    return USE_VERCEL_KV;
  },

  /**
   * Get cache stats (memory cache only)
   */
  getStats() {
    return {
      edgeEnabled: USE_VERCEL_KV,
      memorySize: memoryCache.size,
      memoryMaxSize: memoryCache.max,
    };
  },
};

/**
 * Cache key generators
 */
export const CacheKeys = {
  menu: (slug: string) => `menu:${slug}`,
  merchantConfig: (slug: string) => `merchant:${slug}:config`,
  analyticsSummary: (merchantId: string, period: string) => `analytics:${merchantId}:${period}`,
  userSession: (userId: string) => `session:${userId}`,
} as const;
