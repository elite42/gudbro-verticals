/**
 * Rate Limiting System
 *
 * Protects API endpoints from abuse using Upstash Ratelimit.
 * Part of SCALE-ROADMAP.md Phase 1 Foundation + SECURITY-ROADMAP.md.
 *
 * Uses sliding window algorithm for accurate rate limiting.
 * Different limits for different endpoint types.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../cache/redis';

// ============================================================================
// Rate Limiter Configurations
// ============================================================================

/**
 * API rate limiter - standard endpoints
 * 100 requests per minute per IP
 */
export const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1m'),
  prefix: 'ratelimit:api',
  analytics: true,
});

/**
 * Auth rate limiter - login/signup endpoints
 * 10 requests per minute per IP (prevent brute force)
 */
export const authRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1m'),
  prefix: 'ratelimit:auth',
  analytics: true,
});

/**
 * AI rate limiter - AI/LLM endpoints
 * 20 requests per minute per user (expensive operations)
 */
export const aiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1m'),
  prefix: 'ratelimit:ai',
  analytics: true,
});

/**
 * Webhook rate limiter - external webhook endpoints
 * 50 requests per minute per source
 */
export const webhookRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, '1m'),
  prefix: 'ratelimit:webhook',
  analytics: true,
});

/**
 * Public API rate limiter - menu/catalog endpoints
 * 200 requests per minute per IP (higher for public pages)
 */
export const publicRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(200, '1m'),
  prefix: 'ratelimit:public',
  analytics: true,
});

/**
 * Export rate limiter - PDF/data export endpoints
 * 5 requests per minute per user (resource intensive)
 */
export const exportRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1m'),
  prefix: 'ratelimit:export',
  analytics: true,
});

// ============================================================================
// Rate Limiter Registry
// ============================================================================

export type RateLimiterType = 'api' | 'auth' | 'ai' | 'webhook' | 'public' | 'export';

export const rateLimiters: Record<RateLimiterType, Ratelimit> = {
  api: apiRateLimiter,
  auth: authRateLimiter,
  ai: aiRateLimiter,
  webhook: webhookRateLimiter,
  public: publicRateLimiter,
  export: exportRateLimiter,
};

// ============================================================================
// Rate Limit Response Interface
// ============================================================================

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  limit: number;
  reset: number;
  error?: string;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Extract client identifier from request.
 * Uses X-Forwarded-For header (Vercel sets this) or falls back to 'anonymous'.
 */
export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    // X-Forwarded-For can contain multiple IPs, take the first (client IP)
    return forwarded.split(',')[0].trim();
  }
  return 'anonymous';
}

/**
 * Check rate limit and return structured result.
 * Use this in API routes before processing requests.
 *
 * @example
 * export async function POST(request: Request) {
 *   const { success, remaining, reset } = await checkRateLimit(request, 'api');
 *   if (!success) {
 *     return new Response('Too Many Requests', {
 *       status: 429,
 *       headers: {
 *         'X-RateLimit-Remaining': remaining.toString(),
 *         'X-RateLimit-Reset': reset.toString(),
 *       }
 *     });
 *   }
 *   // ... process request
 * }
 */
export async function checkRateLimit(
  req: Request,
  type: RateLimiterType = 'api',
  identifier?: string
): Promise<RateLimitResult> {
  try {
    const limiter = rateLimiters[type];
    const id = identifier ?? getClientIdentifier(req);

    const result = await limiter.limit(id);

    return {
      success: result.success,
      remaining: result.remaining,
      limit: result.limit,
      reset: result.reset,
    };
  } catch (error) {
    console.error('[RateLimit] Error checking rate limit:', error);
    // Fail open - allow request if rate limiting fails
    return {
      success: true,
      remaining: 0,
      limit: 0,
      reset: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Create rate limit response headers.
 * Include these in all API responses for client visibility.
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  };
}

/**
 * Create 429 Too Many Requests response.
 * Use when rate limit is exceeded.
 */
export function rateLimitExceededResponse(result: RateLimitResult): Response {
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
        ...rateLimitHeaders(result),
      },
    }
  );
}

// ============================================================================
// Middleware Helper
// ============================================================================

/**
 * Rate limit middleware wrapper for API routes.
 * Handles rate limiting and returns appropriate response.
 *
 * @example
 * export async function POST(request: Request) {
 *   const rateLimitResult = await withRateLimit(request, 'auth');
 *   if (rateLimitResult) return rateLimitResult;
 *
 *   // ... rest of handler
 * }
 */
export async function withRateLimit(
  req: Request,
  type: RateLimiterType = 'api',
  identifier?: string
): Promise<Response | null> {
  const result = await checkRateLimit(req, type, identifier);

  if (!result.success) {
    return rateLimitExceededResponse(result);
  }

  // Rate limit passed, continue with request
  return null;
}

// ============================================================================
// Specialized Rate Limiters
// ============================================================================

/**
 * Rate limit by user ID instead of IP.
 * Use for authenticated endpoints where you want per-user limits.
 */
export async function checkUserRateLimit(
  userId: string,
  type: RateLimiterType = 'api'
): Promise<RateLimitResult> {
  const limiter = rateLimiters[type];
  const result = await limiter.limit(`user:${userId}`);

  return {
    success: result.success,
    remaining: result.remaining,
    limit: result.limit,
    reset: result.reset,
  };
}

/**
 * Rate limit by merchant ID.
 * Use for endpoints that should be limited per-merchant.
 */
export async function checkMerchantRateLimit(
  merchantId: string,
  type: RateLimiterType = 'api'
): Promise<RateLimitResult> {
  const limiter = rateLimiters[type];
  const result = await limiter.limit(`merchant:${merchantId}`);

  return {
    success: result.success,
    remaining: result.remaining,
    limit: result.limit,
    reset: result.reset,
  };
}
