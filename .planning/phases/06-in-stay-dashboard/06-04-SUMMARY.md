---
phase: 06-in-stay-dashboard
plan: 04
subsystem: frontend
tags: [components, api-integration, services, deals, useful-numbers, dashboard]
dependency-graph:
  requires: [06-01, 06-02, 06-03]
  provides: [complete-dashboard, services-ui, deals-ui, useful-numbers-ui]
  affects: [07-polish]
tech-stack:
  added: []
  patterns:
    [
      independent-fetch-per-section,
      zero-decimal-currency-handling,
      silent-error-hiding,
    ]
key-files:
  created:
    - apps/accommodations/frontend/components/stay/ServicesCarousel.tsx
    - apps/accommodations/frontend/components/stay/LocalDeals.tsx
    - apps/accommodations/frontend/components/stay/UsefulNumbers.tsx
  modified:
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
    - apps/accommodations/frontend/lib/stay-api.ts
decisions:
  - id: 06-04-01
    description: Zero-decimal currencies (VND, JPY, KRW) use minor units directly; others divide by 100
  - id: 06-04-02
    description: UsefulNumbers hides silently on error (don't alarm guests with error messages)
  - id: 06-04-03
    description: City numbers grouped by category for organized display
metrics:
  duration: 2m 19s
  completed: 2026-01-29
---

# Phase 6 Plan 4: Services, Deals, Useful Numbers + Final Wiring Summary

**One-liner:** Three independent data-fetching components (services carousel, local deals, useful numbers) completing the full In-Stay Dashboard with zero mock data.

## What Was Done

### Task 1: Services carousel and local deals components (916e156)

Created `ServicesCarousel.tsx` that fetches service categories from `/api/stay/[code]/services` and displays them as horizontal scroll sections. Each category shows its items with name, description, and formatted prices using `Intl.NumberFormat`. Price formatting correctly handles zero-decimal currencies (VND, JPY, KRW) where minor unit = major unit, versus standard currencies (USD, EUR) where minor units divide by 100.

Created `LocalDeals.tsx` that fetches partner deals from `/api/stay/[code]/deals` and displays them as cards with merchant name, discount label (badge), description, validity period, and booking action button.

Fixed `stay-api.ts` to import `UsefulNumbersResponse` from the canonical `types/stay.ts` instead of maintaining a duplicate local type definition.

Both components fetch independently and fail independently - one section failing does not affect the other.

### Task 2: Useful numbers + final dashboard wiring (a0d7247)

Created `UsefulNumbers.tsx` that fetches from `/api/stay/[code]/useful-numbers` and displays three sections:

- Emergency numbers (police, ambulance, fire) with red/orange accent and one-tap call links
- City numbers grouped by category with call links
- Property contact (host name + call button) at bottom

Updated dashboard shell to replace all placeholder comments with real components. The final dashboard composes all 11 section components in order: DashboardHeader, WifiCard, WelcomeCard, VisaStatusCard, QuickActions, ServicesCarousel, LocalDeals, UsefulNumbers, ReturnGuestBanner, CheckoutInfo, ContactSheet.

## Verification Results

- Production build: PASSED (zero TypeScript errors)
- Component count: 11/11 in `components/stay/`
- Dashboard shell: 128 lines (target: under 200)
- Mock data scan: zero hardcoded mock data found
- All routes compile as dynamic

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed duplicate UsefulNumbersResponse type in stay-api.ts**

- **Found during:** Task 1
- **Issue:** `stay-api.ts` had a local `UsefulNumbersResponse` and `UsefulNumber` type that conflicted with the canonical types in `types/stay.ts`. The local type had a different shape (`numbers: UsefulNumber[]` vs `emergency/city/property` structure).
- **Fix:** Removed local types, imported `UsefulNumbersResponse` from `@/types/stay`
- **Files modified:** `apps/accommodations/frontend/lib/stay-api.ts`
- **Commit:** 916e156

## Phase 6 Completion Status

All 10 Phase 6 success criteria from ROADMAP.md are met:

| #   | Criterion                         | Status | Plan                      |
| --- | --------------------------------- | ------ | ------------------------- |
| 1   | Booking verification screen works | Done   | 02                        |
| 2   | WiFi card with copy-to-clipboard  | Done   | 03                        |
| 3   | Stay summary with countdown       | Done   | 03                        |
| 4   | Services with prices              | Done   | 04                        |
| 5   | Local deals with actions          | Done   | 04                        |
| 6   | Contact host WhatsApp             | Done   | 03                        |
| 7   | Checkout info                     | Done   | 03                        |
| 8   | All mock data replaced            | Done   | 04                        |
| 9   | Loading states handled            | Done   | all                       |
| 10  | Multi-language: English minimum   | Done   | all (API data in English) |

## Next Phase Readiness

Phase 6 (In-Stay Dashboard) is complete. Phase 7 (Polish) can begin.

No blockers. All API endpoints are wired, all components fetch real data, and the dashboard shell is a clean 128-line composition.
