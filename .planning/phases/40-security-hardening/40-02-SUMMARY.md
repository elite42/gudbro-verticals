---
phase: 40-security-hardening
plan: 02
subsystem: security
tags: [crypto, timing-safe, supabase, rls, admin-key, service-role]

# Dependency graph
requires:
  - phase: 40-security-hardening-01
    provides: Rate limiting infrastructure
provides:
  - Timing-safe ADMIN_API_KEY comparison (SEC-03)
  - Coffeeshop supabase-admin singleton with throw-on-missing-key (SEC-04)
  - Orders RLS migration restricting SELECT to session/merchant (SEC-02)
affects: [45-monitoring, deploy]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - 'crypto.timingSafeEqual for secret comparison'
    - 'Singleton admin client that throws on missing SERVICE_ROLE_KEY'
    - 'RLS policies with session_id and merchant_users join'

key-files:
  created:
    - apps/coffeeshop/frontend/lib/supabase-admin.ts
    - shared/database/migrations/schema/102-fix-orders-rls-session-merchant.sql
  modified:
    - apps/backoffice/lib/accommodations/helpers.ts
    - apps/coffeeshop/frontend/app/api/orders/route.ts
    - apps/coffeeshop/frontend/app/api/charges/route.ts
    - apps/coffeeshop/frontend/app/api/feedback/route.ts
    - apps/coffeeshop/frontend/app/api/loyalty/points/route.ts
    - apps/coffeeshop/frontend/app/api/send-push/route.ts
    - apps/coffeeshop/frontend/app/api/push-subscription/route.ts
    - apps/coffeeshop/frontend/app/api/staff/reviews/route.ts
    - apps/backoffice/lib/contribution-admin-service.ts
    - apps/backoffice/lib/staff-service.ts
    - apps/backoffice/lib/qr/qr-service.ts

key-decisions:
  - 'Use supabase() function wrapper in backoffice services for lazy admin client access'
  - 'Migration 102 drops old permissive policies before creating restrictive ones'

patterns-established:
  - 'getSupabaseAdmin(): singleton that throws on missing key, never falls back to ANON'
  - 'crypto.timingSafeEqual with try/catch for length mismatch'

# Metrics
duration: 5min
completed: 2026-02-02
---

# Phase 40 Plan 02: Security Hardening Summary

**Timing-safe ADMIN_API_KEY via crypto.timingSafeEqual, coffeeshop supabase-admin singleton that throws on missing SERVICE_ROLE_KEY, 10 files migrated away from ANON fallback, orders RLS migration restricting SELECT**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-02T06:56:34Z
- **Completed:** 2026-02-02T07:02:02Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments

- ADMIN_API_KEY comparison now uses crypto.timingSafeEqual with try/catch for length mismatches (SEC-03)
- Created coffeeshop supabase-admin.ts singleton that throws on missing SERVICE_ROLE_KEY instead of silently falling back to ANON key (SEC-04)
- Migrated 7 coffeeshop API routes and 3 backoffice service files away from ANON key fallback (SEC-04)
- Created migration 102 to drop USING(true) SELECT policy on orders and replace with session_id/merchant_users check (SEC-02)

## Task Commits

Each task was committed atomically:

1. **Task 1: Timing-safe admin key + supabase-admin client + ANON fallback removal** - `39530bc` (fix)
2. **Task 2: Orders RLS migration** - `569d4f6` (feat)

## Files Created/Modified

- `apps/coffeeshop/frontend/lib/supabase-admin.ts` - New singleton admin client that throws on missing SERVICE_ROLE_KEY
- `shared/database/migrations/schema/102-fix-orders-rls-session-merchant.sql` - RLS migration for orders table
- `apps/backoffice/lib/accommodations/helpers.ts` - Timing-safe ADMIN_API_KEY with crypto.timingSafeEqual
- `apps/coffeeshop/frontend/app/api/orders/route.ts` - Migrated to getSupabaseAdmin()
- `apps/coffeeshop/frontend/app/api/charges/route.ts` - Migrated to getSupabaseAdmin()
- `apps/coffeeshop/frontend/app/api/feedback/route.ts` - Migrated to getSupabaseAdmin()
- `apps/coffeeshop/frontend/app/api/loyalty/points/route.ts` - Migrated to getSupabaseAdmin()
- `apps/coffeeshop/frontend/app/api/send-push/route.ts` - Migrated to getSupabaseAdmin()
- `apps/coffeeshop/frontend/app/api/push-subscription/route.ts` - Migrated to getSupabaseAdmin()
- `apps/coffeeshop/frontend/app/api/staff/reviews/route.ts` - Migrated to getSupabaseAdmin()
- `apps/backoffice/lib/contribution-admin-service.ts` - Migrated to shared supabase-admin
- `apps/backoffice/lib/staff-service.ts` - Migrated to shared supabase-admin
- `apps/backoffice/lib/qr/qr-service.ts` - Migrated to shared supabase-admin

## Decisions Made

- Used a `supabase()` function wrapper in backoffice services rather than module-level const, since the shared admin client uses lazy initialization
- Migration 102 explicitly drops old permissive policies before creating restrictive ones (PostgreSQL OR-combines permissive policies)
- Passkey auth routes in coffeeshop were intentionally excluded -- they use ANON key for Supabase Auth operations which is the correct pattern for auth flows

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Pre-existing TypeScript errors in coffeeshop (`usefulNumbers` property and `initialCategory` prop) -- not related to this plan's changes, backoffice compiles clean

## User Setup Required

**Migration 102 needs to be applied to live database.** This migration drops the old permissive USING(true) SELECT policy on orders and creates restrictive policies. Apply via:

```sql
-- Run shared/database/migrations/schema/102-fix-orders-rls-session-merchant.sql
```

## Next Phase Readiness

- SEC-02, SEC-03, SEC-04 vulnerabilities addressed
- Migration 102 pending application to live database
- Phase 40 Security Hardening complete (2/2 plans done)

---

_Phase: 40-security-hardening_
_Completed: 2026-02-02_
