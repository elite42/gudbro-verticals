/**
 * Request Coalescing
 *
 * Prevents thundering herd by coalescing concurrent identical requests.
 * When multiple requests for the same key arrive simultaneously,
 * only one actual fetch is performed and the result is shared.
 *
 * Phase 3: 10K → 100K users
 *
 * Usage:
 * ```ts
 * import { coalescedFetch } from '@/lib/cache/request-coalescing';
 *
 * // Only one DB call even with 100 concurrent requests for same menu
 * const menu = await coalescedFetch(`menu:${slug}`, async () => {
 *   return db.from('menus').select('*').eq('slug', slug).single();
 * });
 * ```
 */

import { LRUCache } from 'lru-cache';

// In-flight requests cache
// Stores promises that are currently being resolved
const inFlightRequests = new LRUCache<string, Promise<unknown>>({
  max: 1000, // Max 1000 concurrent coalesced requests
  ttl: 30000, // 30 seconds max wait (prevents memory leaks from stuck requests)
});

// Stats tracking
let coalescingStats = {
  hits: 0, // Requests that joined an existing in-flight request
  misses: 0, // Requests that started a new fetch
  errors: 0, // Requests that failed
};

/**
 * Coalesce concurrent requests for the same key
 *
 * If a request for the same key is already in flight,
 * returns the same promise (shares the result).
 *
 * @param key - Unique identifier for the request (e.g., "menu:merchant-slug")
 * @param fetcher - Async function that performs the actual fetch
 * @returns Promise that resolves to the fetched data
 */
export async function coalescedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  // Check if request is already in flight
  const existing = inFlightRequests.get(key);
  if (existing) {
    coalescingStats.hits++;
    return existing as Promise<T>;
  }

  // Create new request and store it
  coalescingStats.misses++;

  const promise = fetcher()
    .catch((error) => {
      coalescingStats.errors++;
      throw error;
    })
    .finally(() => {
      // Remove from in-flight cache when done
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, promise);
  return promise;
}

/**
 * Coalesce with cache - combines coalescing with caching
 *
 * First checks cache, then coalesces DB requests if cache miss.
 *
 * @param key - Cache/coalescing key
 * @param cacheGet - Function to get from cache
 * @param fetcher - Function to fetch from DB
 * @param cacheSet - Function to set in cache
 */
export async function coalescedFetchWithCache<T>(
  key: string,
  cacheGet: () => Promise<T | null>,
  fetcher: () => Promise<T>,
  cacheSet: (data: T) => Promise<void>
): Promise<{ data: T; source: 'cache' | 'fetch' }> {
  // Check cache first (outside coalescing)
  const cached = await cacheGet();
  if (cached !== null) {
    return { data: cached, source: 'cache' };
  }

  // Coalesce the fetch
  const data = await coalescedFetch(key, async () => {
    const result = await fetcher();
    // Set cache after fetch
    await cacheSet(result);
    return result;
  });

  return { data, source: 'fetch' };
}

/**
 * Get coalescing statistics
 */
export function getCoalescingStats() {
  const total = coalescingStats.hits + coalescingStats.misses;
  return {
    ...coalescingStats,
    total,
    hitRate: total > 0 ? (coalescingStats.hits / total) * 100 : 0,
    inFlightCount: inFlightRequests.size,
  };
}

/**
 * Reset coalescing statistics (for testing)
 */
export function resetCoalescingStats() {
  coalescingStats = { hits: 0, misses: 0, errors: 0 };
}

/**
 * Common coalescing key generators
 */
export const CoalescingKeys = {
  menu: (merchantSlug: string) => `coalesce:menu:${merchantSlug}`,
  merchantConfig: (merchantId: string) => `coalesce:merchant:${merchantId}`,
  analytics: (merchantId: string, period: string) => `coalesce:analytics:${merchantId}:${period}`,
  dashboard: (merchantId: string) => `coalesce:dashboard:${merchantId}`,
} as const;
