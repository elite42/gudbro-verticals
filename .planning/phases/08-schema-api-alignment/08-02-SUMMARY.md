---
phase: 08-schema-api-alignment
plan: 02
subsystem: accommodations-data-alignment
tags: [seed-data, typescript, schema-alignment, accommodations]
dependency-graph:
  requires: [08-01]
  provides: [aligned-seed-data, aligned-typescript-types]
  affects: []
tech-stack:
  added: []
  patterns: [post-migration-seed-alignment, type-schema-parity]
key-files:
  created: []
  modified:
    - shared/database/migrations/schema/078-accommodations-seed.sql
    - apps/accommodations/frontend/types/stay.ts
    - apps/accommodations/frontend/app/api/stay/verify/route.ts
    - apps/accommodations/frontend/app/api/stay/[code]/property/route.ts
decisions:
  - id: 08-02-01
    description: 'Added description and contactEmail to PropertyInfo type and both route mappings for full schema coverage'
    rationale: "Property route SELECTed these columns but didn't map or type them; adding ensures complete type-schema parity"
metrics:
  duration: '3m 35s'
  completed: '2026-01-30'
---

# Phase 8 Plan 2: Seed Data & Type Alignment Summary

**One-liner:** Updated seed SQL to post-081 column names, added new column values, aligned TypeScript types with description/contactEmail, build passes.

## What Was Done

### Task 1: Update seed data for post-081 column names (6d1abbc)

Rewrote the seed SQL (078) to match post-081 schema column names:

**Property INSERT:**

- `wifi_ssid` -> `wifi_network`
- `host_phone` -> `contact_phone`
- `host_email` -> `contact_email`
- `check_out_time` -> `checkout_time`
- `country_code` -> `country`
- Added `contact_whatsapp` with `'+84905123456'`
- Converted `house_rules` from plain TEXT to JSONB array format

**Service Categories (3 INSERTs):**

- `display_order` -> `sort_order`

**Service Items (13 INSERTs):**

- `display_order` -> `sort_order`
- Added `currency` ('VND'), `price_type` ('fixed'), `in_stock` (true) to all 13

### Task 2: Verify TypeScript types and build (bb66bd5)

- Added `description: string | null` and `contactEmail: string | null` to `PropertyInfo` type
- Updated verify route SELECT to include `description` and `contact_email`
- Updated both verify and property route mappings to populate new fields
- `next build` exits 0 -- all routes compile, no TypeScript errors

## Verification Results

| Check                      | Result                                           |
| -------------------------- | ------------------------------------------------ |
| `wifi_network` in seed     | 2 matches (column + comment)                     |
| `wifi_ssid` in seed        | 0 (removed)                                      |
| `contact_phone` in seed    | 2 matches                                        |
| `host_phone` in seed       | 0 (removed)                                      |
| `sort_order` in seed       | 17 matches (3 categories + 13 items + comment)   |
| `display_order` in seed    | 0 (removed)                                      |
| `contact_whatsapp` in seed | 1 match                                          |
| `currency` in seed         | 17 matches (13 items + 1 property + 3 merchants) |
| `price_type` in seed       | 13 matches                                       |
| `in_stock` in seed         | 13 matches                                       |
| `house_rules` JSONB array  | Present                                          |
| `next build`               | Exit 0                                           |
| Typecheck                  | Passed                                           |

## Deviations from Plan

### Auto-added Missing Fields

**1. [Rule 2 - Missing Critical] Added description and contactEmail to PropertyInfo and route mappings**

- **Found during:** Task 2 type verification
- **Issue:** Property route SELECTed `description` and `contact_email` from DB but did not map them into PropertyInfo response. The type also lacked these fields.
- **Fix:** Added both fields to PropertyInfo type, updated verify route SELECT to include them, updated both route mappings.
- **Files modified:** `types/stay.ts`, `verify/route.ts`, `property/route.ts`
- **Commit:** bb66bd5

## Decisions Made

| ID       | Decision                                                             | Rationale                                                                                      |
| -------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 08-02-01 | Added description and contactEmail to PropertyInfo type and mappings | Property route already SELECTed these columns; type and mapping should reflect complete schema |

## Commits

| Hash    | Message                                                  |
| ------- | -------------------------------------------------------- |
| 6d1abbc | fix(08-02): update seed data for post-081 column names   |
| bb66bd5 | feat(08-02): align TypeScript types with post-081 schema |
