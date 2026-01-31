---
phase: 21
plan: 01
subsystem: accommodations-api
tags: [api, backoffice, accommodations, supabase, auth]
dependency-graph:
  requires: [phase-17-schema, phase-18-booking-flow, phase-20-payments]
  provides:
    [
      accommodations-api-routes,
      admin-auth-pattern,
      booking-status-machine,
      shared-helpers,
    ]
  affects: [21-02-bookings-dashboard, 21-03-property-settings]
tech-stack:
  added: []
  patterns:
    [admin-api-key-auth, status-state-machine, allowlisted-field-updates]
key-files:
  created:
    - apps/backoffice/lib/accommodations/helpers.ts
    - apps/backoffice/components/accommodations/BookingStatusBadge.tsx
    - apps/backoffice/app/api/accommodations/bookings/route.ts
    - apps/backoffice/app/api/accommodations/bookings/[id]/route.ts
    - apps/backoffice/app/api/accommodations/rooms/route.ts
    - apps/backoffice/app/api/accommodations/property/route.ts
  modified: []
decisions:
  - Reuse existing supabaseAdmin lazy Proxy from lib/supabase-admin.ts
  - Allowlisted fields pattern for PUT endpoints (prevent mass-assignment)
  - 404 detection via Supabase PGRST116 error code on .single() queries
metrics:
  duration: ~4 min
  completed: 2026-01-31
---

# Phase 21 Plan 01: API Routes & Shared Utilities Summary

Foundation API layer for Owner Dashboard with ADMIN_API_KEY auth, booking status state machine, rooms CRUD, and property settings endpoints.

## What Was Built

### Task 1: Shared Helpers and BookingStatusBadge

- `validateAdminApiKey()` -- Bearer token auth against ADMIN_API_KEY env var
- `VALID_TRANSITIONS` -- State machine: pending/pending_payment -> confirmed/cancelled, confirmed -> checked_in/cancelled, checked_in -> checked_out/cancelled
- `ACTION_TO_STATUS` -- Maps actions (confirm, decline, checkin, checkout, cancel) to statuses
- `BOOKING_STATUS_COLORS` and `PAYMENT_STATUS_COLORS` -- Exact values from accommodations dashboard
- `buildWhatsAppUrl()` and `formatBookingPrice()` utility functions
- `BookingStatusBadge` -- Reusable 'use client' pill component with booking/payment variants

### Task 2: Bookings API Routes

- `GET /api/accommodations/bookings` -- List with propertyId filter, optional status, room join, ordered by check-in desc, limit 200
- `GET /api/accommodations/bookings/[id]` -- Full detail with internal_notes, booking_source, cancellation_reason, actual timestamps
- `PATCH /api/accommodations/bookings/[id]` -- Status action with state machine validation, auto-sets actual_check_in/check_out timestamps, cancellation_reason

### Task 3: Rooms and Property API Routes

- `GET /api/accommodations/rooms` -- List with propertyId, sorted by sort_order + room_number
- `POST /api/accommodations/rooms` -- Create with required field validation
- `PUT /api/accommodations/rooms` -- Update with allowlisted fields, soft-delete via is_active: false
- `GET /api/accommodations/property` -- Full property settings retrieval
- `PUT /api/accommodations/property` -- Update with allowlisted settings fields only

## Decisions Made

1. **Reuse supabaseAdmin Proxy** -- Used existing `@/lib/supabase-admin` lazy singleton instead of creating new client helper
2. **Allowlisted field updates** -- PUT endpoints only accept explicitly listed fields to prevent mass-assignment vulnerabilities
3. **PGRST116 for 404** -- Supabase `.single()` returns code PGRST116 when no rows found, mapped to 404

## Deviations from Plan

None -- plan executed exactly as written.

## Commit Log

| Task | Commit  | Description                                     |
| ---- | ------- | ----------------------------------------------- |
| 1    | 7446065 | Shared helpers and BookingStatusBadge component |
| 2    | 7f46a34 | Bookings API routes (list + detail + actions)   |
| 3    | fcce5f2 | Rooms CRUD and property settings API routes     |

## Verification

- All 4 API route files exist and export correct HTTP methods
- TypeScript compiles without errors (verified at each task)
- helpers.ts exports all 7 expected functions/constants
- BookingStatusBadge renders color-coded pills for both types
- VALID_TRANSITIONS covers all 4 source statuses

## Next Phase Readiness

Plan 21-02 (Bookings Dashboard page) can proceed -- all API endpoints it needs are now available. Plan 21-03 (Property Settings page) can also proceed independently.
