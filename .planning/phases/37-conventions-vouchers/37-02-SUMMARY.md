---
phase: 37-conventions-vouchers
plan: 02
subsystem: ui, api
tags: [conventions, guest-dashboard, backoffice, supabase, phosphor-icons]

# Dependency graph
requires:
  - phase: 37-conventions-vouchers/01
    provides: Database schema (migration 099 benefit_scope) and partner_conventions table
provides:
  - Convention partner cards in guest in-stay dashboard (GXP-05)
  - GET /api/stay/[code]/conventions endpoint for guest-facing data
  - Read-only conventions view in backoffice settings for accommodation owners
  - GET /api/settings/conventions endpoint for backoffice
affects: [37-conventions-vouchers/03, voucher-redemption]

# Tech tracking
tech-stack:
  added: []
  patterns:
    [convention-partner-cards-pattern, owner-property-lookup-for-conventions]

key-files:
  created:
    - apps/accommodations/frontend/app/api/stay/[code]/conventions/route.ts
    - apps/accommodations/frontend/components/stay/ConventionPartnerCards.tsx
    - apps/backoffice/app/(dashboard)/settings/conventions/page.tsx
    - apps/backoffice/app/api/settings/conventions/route.ts
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/lib/stay-api.ts
    - apps/accommodations/frontend/app/stay/[code]/page.tsx

key-decisions:
  - 'CONV-01: Backoffice conventions API uses owner_id lookup on accom_properties (not merchant_id) to find property IDs'
  - 'CONV-02: ConventionPartnerCards returns null when empty (section hidden, not error state)'

patterns-established:
  - 'Convention partner cards: fetch via stay-api wrapper, render above LocalDeals in home tab'
  - 'Owner convention view: API route resolves owner_id -> property IDs -> partner_conventions'

# Metrics
duration: 4min
completed: 2026-02-02
---

# Phase 37 Plan 02: Convention Display Summary

**Convention partner cards in guest dashboard with discount badges + read-only backoffice view for accommodation owners**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-02T02:07:17Z
- **Completed:** 2026-02-02T02:11:25Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Guest in-stay dashboard shows convention partner cards with visual discount badges above LocalDeals
- Convention cards display partner name, convention name, benefit type/value badge, and description
- Backoffice /settings/conventions shows read-only list of active conventions for accommodation owners
- Both endpoints query partner_conventions with date validity and active status filtering

## Task Commits

Each task was committed atomically:

1. **Task 1: Convention cards API + component in guest dashboard** - `cfd463a` (feat)
2. **Task 2: Backoffice read-only conventions view** - `cb1025b` (feat)

## Files Created/Modified

- `apps/accommodations/frontend/types/stay.ts` - Added ConventionPartner interface
- `apps/accommodations/frontend/lib/stay-api.ts` - Added fetchConventions wrapper
- `apps/accommodations/frontend/app/api/stay/[code]/conventions/route.ts` - Guest-facing conventions GET endpoint
- `apps/accommodations/frontend/components/stay/ConventionPartnerCards.tsx` - Convention cards with Storefront icon and discount badges
- `apps/accommodations/frontend/app/stay/[code]/page.tsx` - Wired ConventionPartnerCards above LocalDeals
- `apps/backoffice/app/api/settings/conventions/route.ts` - Backoffice conventions API with owner_id property lookup
- `apps/backoffice/app/(dashboard)/settings/conventions/page.tsx` - Read-only conventions settings page

## Decisions Made

- CONV-01: Used `owner_id` on `accom_properties` (not `merchant_id`) to resolve accommodation owner's properties for convention lookup, since `accom_properties` schema uses `owner_id`
- CONV-02: ConventionPartnerCards returns null when no conventions exist (hidden section, same pattern as LocalDeals with empty array)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Convention display complete for both guest and owner views
- Ready for Phase 37-03 (voucher redemption flow) if planned
- Migration 099 (benefit_scope) still needs to be applied to live database

---

_Phase: 37-conventions-vouchers_
_Completed: 2026-02-02_
