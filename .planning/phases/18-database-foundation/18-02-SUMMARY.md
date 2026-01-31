---
phase: 18-database-foundation
plan: 02
subsystem: infra
tags: [stripe, webhooks, payments, next-api]

# Dependency graph
requires:
  - phase: 18-database-foundation/01
    provides: accommodations database schema with bookings table
provides:
  - Stripe webhook endpoint at /api/webhooks/stripe
  - stripe npm dependency in accommodations PWA
  - Stubbed event handlers for checkout.session.completed and checkout.session.expired
affects: [20-payments]

# Tech tracking
tech-stack:
  added: [stripe ^14.0.0]
  patterns: [webhook-signature-verification, raw-body-parsing]

key-files:
  created:
    - apps/accommodations/frontend/app/api/webhooks/stripe/route.ts
  modified:
    - apps/accommodations/frontend/package.json

key-decisions:
  - 'Separate STRIPE_ACCOM_WEBHOOK_SECRET env var (not shared with wallet webhook)'
  - 'Stubbed handlers with Phase 20 TODOs -- no supabase imports yet'

patterns-established:
  - 'Webhook signature verification: request.text() for raw body, constructEvent for validation'
  - 'Separate webhook secrets per domain (wallet vs accommodations)'

# Metrics
duration: 1min
completed: 2026-01-31
---

# Phase 18 Plan 02: Stripe Webhook Infrastructure Summary

**Stripe webhook endpoint with signature verification and stubbed checkout event handlers for accommodations booking payments**

## Performance

- **Duration:** 1 min
- **Started:** 2026-01-31T02:02:50Z
- **Completed:** 2026-01-31T02:04:01Z
- **Tasks:** 2
- **Files modified:** 2 (+1 lockfile)

## Accomplishments

- Added stripe SDK dependency to accommodations PWA
- Created webhook route with cryptographic signature verification
- Stubbed checkout.session.completed and checkout.session.expired handlers with Phase 20 TODOs
- Typecheck passes cleanly across all apps

## Task Commits

Each task was committed atomically:

1. **Task 1: Add stripe dependency** - `3f89dd6` (chore)
2. **Task 2: Create Stripe webhook route** - `42c4d7e` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/app/api/webhooks/stripe/route.ts` - Webhook endpoint with signature verification and stubbed event handlers
- `apps/accommodations/frontend/package.json` - Added stripe ^14.0.0 dependency

## Decisions Made

- Used separate `STRIPE_ACCOM_WEBHOOK_SECRET` env var to keep accommodations webhook isolated from existing wallet webhook
- No supabase-admin import -- deferred to Phase 20 when actual booking status updates are implemented
- Followed exact pattern from backoffice wallet webhook for consistency

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**External services require manual configuration before Phase 20 (Payments):**

- `STRIPE_SECRET_KEY` - Stripe Dashboard -> Developers -> API keys -> Secret key
- `STRIPE_ACCOM_WEBHOOK_SECRET` - Stripe Dashboard -> Developers -> Webhooks -> Add endpoint for `/api/webhooks/stripe` -> Signing secret

## Next Phase Readiness

- Webhook infrastructure ready for Phase 20 to add payment flow logic
- Phase 20 will fill in the TODO stubs with actual booking status updates via supabase-admin

---

_Phase: 18-database-foundation_
_Completed: 2026-01-31_
