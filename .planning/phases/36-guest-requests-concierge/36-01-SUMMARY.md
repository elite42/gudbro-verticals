---
phase: 36
plan: 01
subsystem: accommodations-concierge
tags: [concierge, pwa, backoffice, safety, vietnam]
dependency-graph:
  requires: [33-dashboard-refactor, 34-service-expansion]
  provides:
    [concierge-hub-foundation, concierge-toggle-settings, concierge-data-module]
  affects: [36-02-section-content, 36-03-discover-section]
tech-stack:
  added: []
  patterns: [full-screen-overlay, optimistic-toggle, country-keyed-data]
key-files:
  created:
    - shared/database/migrations/schema/098-concierge-sections.sql
    - apps/accommodations/frontend/lib/concierge-data.ts
    - apps/accommodations/frontend/app/api/stay/[code]/concierge/route.ts
    - apps/accommodations/frontend/components/stay/ConciergeHub.tsx
    - apps/backoffice/app/api/settings/concierge/route.ts
    - apps/backoffice/app/(dashboard)/settings/concierge/page.tsx
    - apps/backoffice/components/settings/ConciergeToggles.tsx
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/components/BottomNav.tsx
    - apps/accommodations/frontend/app/stay/[code]/page.tsx
    - apps/backoffice/app/(dashboard)/settings/layout.tsx
decisions:
  - id: CON-01
    description: ConciergeHub uses full-screen overlay (z-60) pattern matching ServiceCatalog
  - id: CON-02
    description: Country data keyed by ISO code (VN) with getConciergeData() helper returning null for unknown countries
  - id: CON-03
    description: Section card tap shows coming-soon placeholder (content components deferred to 36-02)
  - id: CON-04
    description: Backoffice uses user.id as merchantId (AuthContextType has no merchantId field)
metrics:
  duration: ~8 min
  completed: 2026-02-02
---

# Phase 36 Plan 01: Concierge Hub Foundation Summary

**One-liner:** Full-screen Concierge hub overlay with 5 toggleable section cards, Vietnam safety/emergency data module, guest+backoffice APIs, and merchant toggle settings page.

## What Was Done

### Task 1: Database migration + types + concierge data module + APIs

- **Migration 098** adds `concierge_sections` JSONB column to `accom_properties` with all-true default
- **Types** added to `stay.ts`: `ConciergeSection`, `ConciergeSections`, `ConciergeConfig`, `DEFAULT_CONCIERGE_SECTIONS`
- **concierge-data.ts** contains comprehensive Vietnam data: 18 emergency contacts (8 services + 10 embassies), 7 safety categories with 23 scam tips, 16 cultural tips (8 dos + 8 don'ts), 6 transport options, 6 recommended apps, and safety disclaimer
- **Guest API** `GET /api/stay/[code]/concierge` returns section toggles + country + city (JWT-authenticated)
- **Backoffice API** `GET/PUT /api/settings/concierge` for reading and updating section visibility

### Task 2: BottomNav + ConciergeHub overlay + backoffice toggles UI

- **BottomNav** center button changed from Services/CallBell to Concierge/Compass
- **ConciergeHub** full-screen overlay with: header (close button, title, city), 5 section cards (only visible ones rendered), quick links row (WiFi, Documents, Contact Host, Room Service), safety disclaimer
- **Section cards** show icon, label, description, and item count badge when data available
- **Coming-soon placeholder** when tapping a section card (actual content deferred to 36-02)
- **DashboardCard "Concierge"** now opens hub overlay (replaced Phase 36 placeholder comment)
- **Backoffice Concierge tab** added to settings layout with Compass icon
- **ConciergeToggles** component with 5 toggle switches, optimistic updates, loading skeleton, toast feedback

## Decisions Made

| ID     | Decision                             | Rationale                                                            |
| ------ | ------------------------------------ | -------------------------------------------------------------------- |
| CON-01 | Full-screen overlay at z-60          | Matches ServiceCatalog pattern, sits above BottomNav (z-50)          |
| CON-02 | Country-keyed data with ISO codes    | Extensible to other countries, clean lookup via getConciergeData()   |
| CON-03 | Coming-soon placeholder for sections | Section content components (Emergency, Safety, etc.) built in 36-02  |
| CON-04 | user.id as merchantId in backoffice  | AuthContextType has no merchantId field; user.id serves this purpose |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] AuthContextType has no merchantId property**

- **Found during:** Task 2, backoffice ConciergeToggles
- **Issue:** Plan specified `const { merchantId } = useAuth()` but AuthContextType does not expose merchantId
- **Fix:** Changed to `const { user } = useAuth(); const merchantId = user?.id;`
- **Files modified:** `apps/backoffice/components/settings/ConciergeToggles.tsx`
- **Commit:** f647383

## Commits

| Hash    | Message                                                                        |
| ------- | ------------------------------------------------------------------------------ |
| 7c52e44 | feat(36-01): database migration, types, concierge data module, and APIs        |
| f647383 | feat(36-01): ConciergeHub overlay, BottomNav update, and backoffice toggles UI |

## Next Phase Readiness

Plan 36-02 can proceed immediately. It will build the actual section content components (ConciergeEmergency, ConciergeSafety, ConciergeCulture, ConciergeTransport) that replace the coming-soon placeholders when a section card is tapped.

**Pre-existing issue noted:** `apps/accommodations/frontend` build fails due to unresolved `@shared/utils/qr/wifi` import in WifiCard.tsx. This is NOT related to Phase 36 changes.
