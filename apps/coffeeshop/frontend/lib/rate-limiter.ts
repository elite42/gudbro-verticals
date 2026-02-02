/**
 * Rate Limiting for Coffeeshop Public Endpoints
 *
 * Uses Upstash Redis sliding window algorithm.
 * Protects /api/orders and /api/charges from abuse (SEC-01).
 *
 * Fails open on Redis errors — availability over strictness for menu browsing.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// ----------------------------------------------------------------------------
// Redis Client
// ----------------------------------------------------------------------------

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ----------------------------------------------------------------------------
// Rate Limiter Configurations
// ----------------------------------------------------------------------------

/**
 * Orders endpoint — 30 requests per minute per IP.
 * POST /api/orders (order submission).
 */
export const publicApiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '1m'),
  prefix: 'ratelimit:coffeeshop:orders',
  analytics: true,
});

/**
 * Charges endpoint — 60 requests per minute per IP.
 * GET /api/charges (menu browsing is frequent, higher limit).
 */
export const chargesLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1m'),
  prefix: 'ratelimit:coffeeshop:charges',
  analytics: true,
});

// ----------------------------------------------------------------------------
// Utility Functions
// ----------------------------------------------------------------------------

/**
 * Extract client IP from request headers.
 * Uses X-Forwarded-For (set by Vercel/reverse proxies), falls back to 'anonymous'.
 */
export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return 'anonymous';
}

/**
 * Check rate limit and return 429 Response if exceeded, or null if OK.
 *
 * Wraps in try/catch — fails open (returns null) on Redis errors for availability.
 *
 * @example
 * const rateLimitResult = await withRateLimit(request, publicApiLimiter);
 * if (rateLimitResult) return rateLimitResult;
 */
export async function withRateLimit(req: Request, limiter: Ratelimit): Promise<Response | null> {
  try {
    const identifier = getClientIdentifier(req);
    const result = await limiter.limit(identifier);

    if (!result.success) {
      const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

      return new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.reset.toString(),
          },
        }
      );
    }

    return null;
  } catch (error) {
    // Fail open — allow request if Redis is unavailable
    console.error('[RateLimit] Redis error (failing open):', error);
    return null;
  }
}
