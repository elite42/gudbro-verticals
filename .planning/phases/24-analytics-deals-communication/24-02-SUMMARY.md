---
phase: 24
plan: 02
subsystem: accommodations-deals
tags: [deals, crud, click-tracking, backoffice, guest-pwa]
dependency-graph:
  requires: [24-01]
  provides: [deals-crud, click-tracking, guest-deals-display]
  affects: [24-03]
tech-stack:
  added: []
  patterns:
    [
      CRUD-with-zod-validation,
      click-tracking-redirect,
      module-level-AUTH_HEADERS,
    ]
key-files:
  created:
    - apps/backoffice/app/api/accommodations/deals/route.ts
    - apps/backoffice/app/api/accommodations/deals/[id]/route.ts
    - apps/backoffice/components/accommodations/DealsManager.tsx
    - apps/backoffice/app/(dashboard)/accommodations/deals/page.tsx
    - apps/accommodations/frontend/app/api/deals/[id]/click/route.ts
  modified:
    - apps/accommodations/frontend/app/api/stay/[code]/deals/route.ts
    - apps/accommodations/frontend/components/stay/LocalDeals.tsx
    - apps/accommodations/frontend/types/stay.ts
decisions:
  - id: D24-02-01
    description: 'bookingId optional in LocalDeals click tracking (not exposed to client from JWT)'
    rationale: 'JWT payload contains bookingId but page does not extract it; click tracking works without attribution for v1'
metrics:
  duration: ~4 min
  completed: 2026-01-31
---

# Phase 24 Plan 02: Deals CRUD Summary

Full deals lifecycle: backoffice CRUD with zod validation, guest-facing display from accom_deals table replacing partner_conventions, click tracking via redirect endpoint logging to accom_deal_clicks.

## Tasks Completed

### Task 1: Deals CRUD API + backoffice UI

- **Commit:** 6a5ad0a
- GET+POST `/api/accommodations/deals` with zod schema validation (partner_name 1-100 chars, discount_description 1-200 chars, optional url/image_url/description)
- PUT+DELETE `/api/accommodations/deals/[id]` with allowlisted fields pattern and PGRST116 404 detection
- `DealsManager` component following RoomManager pattern: list with partner icon, discount badge, active status; inline add/edit form; delete with confirmation; quick active/inactive toggle
- Deals page at `/accommodations/deals` with property ID from env var
- All routes use `validateAdminApiKey()` auth and `supabaseAdmin` for DB

### Task 2: Guest deals data source update + click tracking

- **Commit:** 13f878f
- Created `/api/deals/[id]/click` endpoint: logs click to `accom_deal_clicks` with optional booking_id, fetches deal URL, redirects to external partner site
- Updated `stay/[code]/deals` route: switched data source from `partner_conventions` to `accom_deals` table with `is_active` filter and `display_order` sorting
- Updated `DealResponse` type: replaced merchantName/merchantSlug/validUntil/bookingAction with partnerName/discountLabel/description/imageUrl/url
- Updated `LocalDeals` component: deal links route through `/api/deals/[id]/click` for tracking, open in new tab, added optional `bookingId` prop

## Decisions Made

| ID        | Decision                                                    | Rationale                                                                    |
| --------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
| D24-02-01 | bookingId optional in click tracking (not exposed from JWT) | JWT has bookingId but page doesn't extract it; tracking works without for v1 |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- [x] `npx tsc --noEmit` passes for backoffice (clean)
- [x] `npx tsc --noEmit` passes for accommodations frontend (only pre-existing error from Plan 03 pre-arrival-emails cron)
- [x] Deals page accessible at /accommodations/deals (nav item added in Plan 01)
- [x] CRUD operations: create with zod validation, read ordered list, update via allowlisted fields, delete with CASCADE
- [x] Click tracking route logs click and redirects to partner URL
- [x] LocalDeals component renders from accom_deals with click tracking links

## Next Phase Readiness

Plan 03 (Email Communication) can proceed:

- `accom_email_logs` table ready from migration 087
- All deals infrastructure complete
