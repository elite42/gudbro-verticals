---
phase: 08-schema-api-alignment
plan: 01
subsystem: database
tags: [sql, migration, schema-alignment, accommodations]
dependency-graph:
  requires: [04-01, 05-01, 05-02, 06-01, 07-01]
  provides: [081-migration, column-alignment, house-rules-jsonb]
  affects: [08-02]
tech-stack:
  added: []
  patterns: [generated-column, rename-column, type-migration-with-using]
key-files:
  created:
    - shared/database/migrations/schema/081-schema-api-alignment.sql
  modified: []
decisions:
  - Generated column for `type` instead of RENAME (reserved word avoidance)
  - house_rules split on ". " delimiter for TEXT->JSONB conversion
  - VND as default currency for service items (matches property default)
metrics:
  duration: ~1 minute
  completed: 2026-01-30
---

# Phase 8 Plan 1: Schema-API Column Alignment Summary

**One-liner:** Migration 081 renames 9 columns, adds 7 new columns, converts house_rules TEXT to JSONB array, and adds generated `type` column so API routes match real DB schema.

## What Was Done

### Task 1: Create migration 081 -- accom_properties column alignment

**Commit:** `45d4784`

Created `shared/database/migrations/schema/081-schema-api-alignment.sql` with 8 sections:

1. **accom_properties RENAMES (6):** wifi_ssid->wifi_network, host_phone->contact_phone, host_email->contact_email, check_out_time->checkout_time, cover_image_url->cover_image, country_code->country
2. **Generated column:** `type` mirrors `property_type` (avoids SQL reserved word)
3. **accom_properties NEW COLUMNS (4):** contact_whatsapp, area, rating, review_count
4. **house_rules TYPE CHANGE:** TEXT -> JSONB with safe USING clause (splits on ". " into array)
5. **accom_service_categories RENAME (1):** display_order->sort_order
6. **accom_service_items RENAMES (2):** display_order->sort_order, image_url->image
7. **accom_service_items NEW COLUMNS (3):** currency (default VND), price_type (default fixed), in_stock (default true)
8. **COMMENT ON** statements documenting all changes

## Decisions Made

| Decision                    | Rationale                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Generated column for `type` | `type` is a reserved SQL keyword; RENAME would create ambiguity. Generated column provides read access without risking SQL parsing issues. |
| house_rules split on ". "   | Existing seed data uses period-space as sentence separator. Safe conversion to JSONB array.                                                |
| Default currency VND        | Matches accom_properties.currency default. Service items inherit property context.                                                         |
| price_type as TEXT not ENUM | Follows project convention (TEXT + CHECK > ENUM). No CHECK added yet to allow flexibility.                                                 |

## Deviations from Plan

None -- plan executed exactly as written.

## Verification

- [x] File exists at `shared/database/migrations/schema/081-schema-api-alignment.sql`
- [x] Contains all 6 RENAME COLUMN statements for accom_properties
- [x] Contains RENAME COLUMN statements for accom_service_categories and accom_service_items
- [x] Contains ADD COLUMN for contact_whatsapp, area, rating, review_count
- [x] Contains ADD COLUMN for currency, price_type, in_stock
- [x] Contains ALTER COLUMN house_rules TYPE JSONB
- [x] Contains generated column for `type`
- [x] No TypeScript files modified

## Next Phase Readiness

Phase 8 Plan 2 (API route fixes and seed data updates) can proceed. The migration provides the column names that API routes already SELECT, closing the schema-API gap.
