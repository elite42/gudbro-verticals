/**
 * Cache Module - Barrel Export
 *
 * Usage:
 * import { redis, CacheKeys, CacheTTL, cacheGet } from '@/lib/cache';
 */

export {
  redis,
  CacheKeys,
  CacheTTL,
  cacheGet,
  cacheInvalidate,
  cacheInvalidatePattern,
  invalidateMerchantMenu,
  invalidateMerchantConfig,
  checkRedisHealth,
} from './redis';
