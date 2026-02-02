/**
 * Rate Limiting for Accommodations Endpoints
 *
 * Uses Upstash Redis sliding window algorithm.
 * Protects /api/booking (SEC-01) and booking code verification (SEC-05).
 *
 * - bookingLimiter: fails open (availability)
 * - bookingCodeLimiter: fails CLOSED (brute-force protection)
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
 * Booking endpoint — 20 requests per minute per IP.
 * POST /api/booking (booking submission).
 */
export const bookingLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1m'),
  prefix: 'ratelimit:accom:booking',
  analytics: true,
});

/**
 * Booking code verification — 5 requests per minute per IP.
 * POST /api/stay/room/[roomCode]/verify
 *
 * SEC-05: Brute-force protection. Very low limit because guessing
 * booking codes / last names must be throttled aggressively.
 */
export const bookingCodeLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1m'),
  prefix: 'ratelimit:accom:booking-code',
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
 * Fails open on Redis errors — availability over strictness.
 *
 * @example
 * const rateLimitResult = await withRateLimit(request, bookingLimiter);
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

/**
 * Strict rate limit — returns 429 even on Redis errors.
 *
 * Use for brute-force protection endpoints where security > availability.
 * If Redis is down, we block requests rather than allowing unthrottled guessing.
 *
 * @example
 * const rateLimitResult = await withStrictRateLimit(request, bookingCodeLimiter);
 * if (rateLimitResult) return rateLimitResult;
 */
export async function withStrictRateLimit(
  req: Request,
  limiter: Ratelimit
): Promise<Response | null> {
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
    // Fail CLOSED — block request if Redis is unavailable (brute-force protection)
    console.error('[RateLimit] Redis error (failing closed for security):', error);
    return new Response(
      JSON.stringify({
        error: 'Too Many Requests',
        message: 'Rate limiting service unavailable. Please try again later.',
        retryAfter: 60,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60',
        },
      }
    );
  }
}
