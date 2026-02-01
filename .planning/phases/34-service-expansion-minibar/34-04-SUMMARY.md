---
phase: 34
plan: 04
subsystem: accommodations-minibar
tags: [minibar, self-service, honor-system, guest-dashboard]
dependency-graph:
  requires: [34-01]
  provides:
    [
      minibar-self-service-ui,
      self-service-automation-level,
      minibar-order-tracking,
    ]
  affects: [34-05, backoffice-order-management]
tech-stack:
  added: []
  patterns: [honor-system-consumption, self-service-auto-confirm]
key-files:
  created:
    - shared/database/migrations/schema/096-minibar-self-service.sql
    - apps/accommodations/frontend/components/stay/MinibarSection.tsx
    - apps/accommodations/frontend/components/stay/MinibarItemRow.tsx
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/[code]/orders/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/orders/[orderId]/route.ts
    - apps/accommodations/frontend/lib/stay-api.ts
decisions:
  - id: MINIBAR-01
    description: 'Migration numbered 096 (not 089 as plan stated) since 095 was latest'
  - id: MINIBAR-02
    description: 'self_service auto-confirms orders like auto_confirm/whatsapp_notify'
metrics:
  duration: ~3.5 min
  completed: 2026-02-02
---

# Phase 34 Plan 04: Minibar Self-Service Summary

**One-liner:** Honor-system minibar with self_service automation level, consumption tracking columns, and guest-facing MinibarSection UI

## What Was Done

### Task 1: Migration 096 + types + API for minibar self-service

- Added `self_service` to `automation_level` CHECK constraint on `accom_service_categories`
- Added `is_minibar_consumption` (boolean) and `owner_confirmed` (nullable boolean) columns to `accom_service_orders`
- Extended `ServiceOrder` type with `isMinibarConsumption` and `ownerConfirmed` fields
- Added `CreateMinibarOrderRequest` type
- Updated orders GET to include minibar columns in SELECT and response mapping
- Updated orders POST to detect `self_service` category, auto-confirm, and set minibar flags
- Added `createMinibarOrder` convenience function to `stay-api.ts`
- Fixed `[orderId]/route.ts` SELECT to include minibar columns (was referencing them but not selecting)

### Task 2: MinibarSection and MinibarItemRow components

- **MinibarItemRow:** Horizontal row with image, name, price, and mark-consumed/quantity stepper UI
- **MinibarSection:** Filters `self_service` categories, renders item list, tracks consumption state in Map, computes total, submits via `createMinibarOrder`, shows success animation
- Returns `null` when no self_service categories exist (or no in-stock items)
- Trust message: "Items are billed on the honor system"
- Design uses teal accent (#3D8B87) consistent with dashboard theme

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed [orderId] route missing minibar columns in SELECT**

- **Found during:** Task 1
- **Issue:** The `[orderId]/route.ts` already referenced `is_minibar_consumption` and `owner_confirmed` in the response mapping (likely added in 34-01) but the Supabase SELECT query did not include these columns, causing TypeScript errors
- **Fix:** Added `is_minibar_consumption, owner_confirmed` to the SELECT clause
- **Files modified:** `app/api/stay/[code]/orders/[orderId]/route.ts`
- **Commit:** 3315c73

**2. [Rule 1 - Bug] Fixed Map iteration TypeScript error**

- **Found during:** Task 2
- **Issue:** `for...of` on Map requires `downlevelIteration` flag or ES2015+ target
- **Fix:** Used `Array.from(consumptions)` before iterating
- **Files modified:** `components/stay/MinibarSection.tsx`
- **Commit:** beced11

**3. [Rule 3 - Blocking] Migration renumbered from 089 to 096**

- **Found during:** Task 1
- **Issue:** Plan specified migration 089 but migrations up to 095 already exist
- **Fix:** Used 096 as the next available migration number
- **Files modified:** `shared/database/migrations/schema/096-minibar-self-service.sql`
- **Commit:** 3315c73

## Verification Results

- TypeScript: Zero new errors (3 pre-existing @shared/ module resolution errors)
- Migration: self_service constraint, is_minibar_consumption column, owner_confirmed column defined
- MinibarSection: Filters self_service categories, uses createMinibarOrder
- MinibarItemRow: Mark-consumed button transitions to quantity stepper

## Decisions Made

| ID         | Decision                          | Rationale                                                            |
| ---------- | --------------------------------- | -------------------------------------------------------------------- |
| MINIBAR-01 | Migration numbered 096 (not 089)  | 095 was the latest existing migration                                |
| MINIBAR-02 | self_service auto-confirms orders | Minibar consumption is self-reported, no manual approval gate needed |

## Next Phase Readiness

- Migration 096 needs to be applied to live database
- MinibarSection needs to be wired into the guest dashboard (likely in 34-05 or integration plan)
- Owner confirmation UI for minibar orders (backoffice) is a future concern
