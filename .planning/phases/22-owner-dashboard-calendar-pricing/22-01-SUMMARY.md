---
phase: 22
plan: 01
subsystem: accommodations-backend
tags: [sql, migration, api, calendar, room-blocks, seasonal-pricing, discounts]
dependency-graph:
  requires: [phase-19, phase-20, phase-21]
  provides:
    [
      calendar-data-api,
      room-blocks-crud,
      seasonal-pricing-crud,
      discount-fields,
    ]
  affects: [22-02]
tech-stack:
  added: []
  patterns:
    [
      EXCLUDE-constraint-overlap-prevention,
      Promise.all-parallel-fetch,
      camelCase-to-snake_case-field-mapping,
    ]
key-files:
  created:
    - shared/database/migrations/schema/085-calendar-pricing.sql
    - apps/backoffice/app/api/accommodations/calendar/route.ts
    - apps/backoffice/app/api/accommodations/room-blocks/route.ts
    - apps/backoffice/app/api/accommodations/seasonal-pricing/route.ts
  modified:
    - apps/backoffice/app/api/accommodations/property/route.ts
decisions:
  - EXCLUDE USING GIST with half-open [) daterange for both room blocks and seasonal pricing (consistent with booking system)
  - Application-level overlap check against active bookings before creating room blocks (DB constraint only prevents block-on-block overlap)
  - Calendar API computes grid range from month using date-fns startOfWeek/endOfWeek for full calendar grid coverage
  - Seasonal pricing PUT uses camelCase-to-snake_case field mapping for consistent API contract
metrics:
  duration: ~3 min
  completed: 2026-01-31
---

# Phase 22 Plan 01: Backend Data Layer for Calendar & Pricing Summary

Database tables and API routes for calendar data, room blocking, seasonal pricing, and discount management.

## What Was Done

### Task 1: SQL Migration 085 - Room Blocks and Seasonal Pricing Tables

- Created `accom_room_blocks` table with EXCLUDE constraint preventing overlapping blocks per room
- Created `accom_seasonal_pricing` table with EXCLUDE constraint preventing overlapping pricing per room
- Both use half-open `[)` daterange consistent with booking system convention
- 4 indexes for efficient room+date and property lookups
- RLS policies matching existing owner-manages pattern from migration 083
- `updated_at` trigger on seasonal pricing table
- **Commit:** `bd8d67b`

### Task 2: Calendar Merged Data API + Room Blocks CRUD + Seasonal Pricing CRUD

- **Calendar GET** (`/api/accommodations/calendar`): Merges bookings, blocks, and pricing via `Promise.all` parallel fetch. Computes full calendar grid range from month parameter using date-fns.
- **Room Blocks POST/DELETE** (`/api/accommodations/room-blocks`): Creates blocks with application-level overlap check against active bookings (409 on conflict). Handles EXCLUDE constraint errors for block-on-block overlap.
- **Seasonal Pricing GET/POST/PUT/DELETE** (`/api/accommodations/seasonal-pricing`): Full CRUD with EXCLUDE constraint error handling (409). PUT maps camelCase body keys to snake_case DB columns.
- All routes follow existing pattern: `validateAdminApiKey`, `supabaseAdmin`, `force-dynamic`
- **Commit:** `353a72f`

### Task 3: Discount Fields in Property Endpoint

- Added `weekly_discount_percent` and `monthly_discount_percent` to GET select string
- Added both fields to PUT `allowedFields` array
- Minimal change to existing endpoint
- **Commit:** `d2e1cb2`

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

1. Migration 085 SQL: 2 CREATE TABLE, 2 EXCLUDE USING GIST, 4 indexes, 2 RLS enables, no duplicate CREATE EXTENSION
2. Calendar GET: Promise.all parallel fetch of bookings + blocks + pricing confirmed
3. Room blocks POST: Application-level booking overlap check confirmed
4. Seasonal pricing CRUD: EXCLUDE constraint error handling as 409 confirmed
5. Property PUT: discount fields in both GET select and PUT allowedFields confirmed
6. TypeScript compilation: passed on all commits

## Next Phase Readiness

Plan 22-02 (Calendar UI) can immediately consume these APIs:

- `GET /api/accommodations/calendar` for merged calendar data
- `POST/DELETE /api/accommodations/room-blocks` for blocking rooms
- `GET/POST/PUT/DELETE /api/accommodations/seasonal-pricing` for price overrides
- `PUT /api/accommodations/property` for weekly/monthly discount percentages
