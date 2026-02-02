---
phase: 40-security-hardening
plan: 01
subsystem: security
tags: [upstash, ratelimit, redis, sliding-window, brute-force-protection]

# Dependency graph
requires:
  - phase: backoffice rate-limiter
    provides: rateLimitExceededResponse pattern and withRateLimit API
provides:
  - Upstash rate limiting on all coffeeshop public endpoints (orders, charges)
  - Upstash rate limiting on accommodations public endpoints (booking, room verify)
  - withStrictRateLimit pattern for brute-force protection (fail closed)
affects: [41-input-validation, 42-error-handling]

# Tech tracking
tech-stack:
  added: ['@upstash/ratelimit', '@upstash/redis']
  patterns:
    [
      'withRateLimit fail-open pattern',
      'withStrictRateLimit fail-closed pattern',
      'Upstash sliding window per-IP',
    ]

key-files:
  created:
    - apps/coffeeshop/frontend/lib/rate-limiter.ts
    - apps/accommodations/frontend/lib/rate-limiter.ts
  modified:
    - apps/coffeeshop/frontend/app/api/orders/route.ts
    - apps/coffeeshop/frontend/app/api/charges/route.ts
    - apps/accommodations/frontend/app/api/booking/route.ts
    - apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts
    - apps/coffeeshop/frontend/package.json
    - apps/accommodations/frontend/package.json

key-decisions:
  - 'Fail open for public endpoints (availability > strictness)'
  - 'Fail closed for booking code verify (brute-force protection > availability)'
  - 'Per-IP rate limiting using x-forwarded-for header'

patterns-established:
  - 'withRateLimit: fail-open rate limit check returning Response|null'
  - 'withStrictRateLimit: fail-closed variant for security-sensitive endpoints'
  - 'Rate limiter modules co-located in lib/rate-limiter.ts per app'

# Metrics
duration: 4min
completed: 2026-02-02
---

# Phase 40 Plan 01: Rate Limiting Summary

**Upstash sliding window rate limiting on 4 public endpoints with fail-closed brute-force protection on booking code verify**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-02T06:49:38Z
- **Completed:** 2026-02-02T06:53:42Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Rate limiter modules created for both coffeeshop and accommodations apps using @upstash/ratelimit
- All 4 public API endpoints protected: orders (30/min), charges (60/min), booking (20/min), room verify (5/min)
- Booking code verification endpoint uses strict rate limiting that fails closed on Redis errors (SEC-05)
- In-memory Map-based rate limiter replaced with Upstash Redis sliding window

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Upstash deps and create rate limiter modules** - `58bd375` (feat)
2. **Task 2: Apply rate limiting to all public API endpoints** - `ba7d163` (feat)

## Files Created/Modified

- `apps/coffeeshop/frontend/lib/rate-limiter.ts` - Rate limiter with publicApiLimiter (30/min) and chargesLimiter (60/min)
- `apps/accommodations/frontend/lib/rate-limiter.ts` - Rate limiter with bookingLimiter (20/min), bookingCodeLimiter (5/min), withStrictRateLimit
- `apps/coffeeshop/frontend/app/api/orders/route.ts` - Added rate limiting to POST and GET handlers
- `apps/coffeeshop/frontend/app/api/charges/route.ts` - Added rate limiting to GET handler
- `apps/accommodations/frontend/app/api/booking/route.ts` - Added rate limiting to POST handler
- `apps/accommodations/frontend/app/api/stay/room/[roomCode]/verify/route.ts` - Replaced in-memory rate limiter with Upstash strict rate limiting

## Decisions Made

- **Fail open vs closed:** Standard public endpoints fail open (allow through if Redis down) for availability. Booking code verify fails closed (block if Redis down) because brute-force protection is more important than availability.
- **Per-IP granularity:** All rate limits use x-forwarded-for header for IP identification, with 'anonymous' fallback.
- **Response format:** Matches backoffice rateLimitExceededResponse pattern with Retry-After header and JSON body.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

Pre-existing TypeScript errors in coffeeshop (UsefulNumbersClient.tsx, V2CategoryClient.tsx) and accommodations (DashboardHeader.tsx, WifiCard.tsx) are unrelated to rate limiting changes. Our new files and modifications compile without errors.

## Next Phase Readiness

- Rate limiting infrastructure in place for both apps
- Ready for 40-02-PLAN.md (input validation hardening)
- UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars must be set in Vercel for production

---

_Phase: 40-security-hardening_
_Completed: 2026-02-02_
