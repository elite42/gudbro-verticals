---
phase: 34-service-expansion-minibar
plan: 01
subsystem: accommodations-services
tags: [database, migration, api, typescript, service-catalog]
dependency-graph:
  requires: ['33-02']
  provides:
    [
      'migration-095-service-catalog-enhancements',
      'includedInRate-field',
      'categoryTag-field',
    ]
  affects: ['34-02', '34-03', '34-04', '34-05']
tech-stack:
  added: []
  patterns: ['denormalized-category-tag', 'primaryCategoryTag-computation']
key-files:
  created:
    - shared/database/migrations/schema/095-service-catalog-enhancements.sql
  modified:
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/[code]/services/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/orders/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/orders/[orderId]/route.ts
decisions:
  - id: SVC-01
    summary: Migration renumbered from 088 to 095 (088 already existed)
  - id: SVC-02
    summary: category_tag denormalized on order items for query performance
metrics:
  duration: 2m 40s
  completed: 2026-02-02
---

# Phase 34 Plan 01: Service Catalog Enhancements (DB + API) Summary

Migration 095 adds included_in_rate (boolean) and category_tag (standardized enum) columns; all three API routes updated to expose new fields with camelCase mapping.

## What Was Done

### Task 1: Database Migration (095-service-catalog-enhancements.sql)

- Added `included_in_rate BOOLEAN NOT NULL DEFAULT false` to `accom_service_items`
- Added `category_tag TEXT DEFAULT 'general'` with CHECK constraint to `accom_service_categories`
- Added `category_tag TEXT DEFAULT 'general'` to `accom_service_order_items` (denormalized)
- All columns have COMMENT statements following project convention
- Commit: `068d363`

### Task 2: Types and API Route Updates

- **types/stay.ts**: Added `includedInRate` to ServiceItemResponse, `categoryTag` to ServiceCategoryWithItems, ServiceOrder, and ServiceOrderItem
- **services/route.ts**: SELECT includes `included_in_rate` and `category_tag`, mapped to camelCase in response
- **orders/route.ts (GET)**: SELECT includes `category_tag` on order items, maps to `categoryTag`, computes order-level `categoryTag` via `primaryCategoryTag()` helper
- **orders/route.ts (POST)**: Joins `category_tag` from category, stores on each order item row
- **orders/[orderId]/route.ts**: Updated to support new fields (fixed TS compilation error)
- Commit: `7710d8c`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Migration renumbered from 088 to 095**

- **Found during:** Task 1
- **Issue:** Migration 088-room-codes.sql already existed. Migrations go up to 094.
- **Fix:** Used 095 as next available migration number
- **Files modified:** shared/database/migrations/schema/095-service-catalog-enhancements.sql

**2. [Rule 1 - Bug] Fixed orders/[orderId]/route.ts compilation error**

- **Found during:** Task 2 verification (tsc --noEmit)
- **Issue:** Adding `categoryTag` to ServiceOrder type broke the orderId route which constructs ServiceOrder manually
- **Fix:** Updated orderId route to include category_tag in SELECT, item mapping, and order-level categoryTag computation
- **Files modified:** apps/accommodations/frontend/app/api/stay/[code]/orders/[orderId]/route.ts

**3. Migration not applied to live database**

- Supabase MCP tools and CLI not available in execution environment
- Migration file is ready to apply via `mcp__supabase__apply_migration` or `supabase db push`

## Verification Results

- TypeScript compilation: 0 new errors (3 pre-existing @shared module errors unchanged)
- Migration file: syntactically correct SQL with proper CHECK constraints
- Services route: maps `included_in_rate` -> `includedInRate`, `category_tag` -> `categoryTag`
- Orders route: stores `category_tag` per item, computes `primaryCategoryTag` per order
- OrderId route: also updated for consistency

## Next Phase Readiness

Phase 34-02 can proceed -- types and API foundation are in place. Migration needs to be applied to the database before runtime testing.
