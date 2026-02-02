---
phase: 39-polish-analytics
plan: 01
subsystem: accommodations-analytics
tags: [order-performance, timestamps, analytics, receipts]

dependency-graph:
  requires: [34-service-expansion-minibar]
  provides: [order-performance-tracking, receipt-settings-schema]
  affects: [39-02]

tech-stack:
  added: []
  patterns: [majority-vote-category-tag, per-status-timestamp-recording]

key-files:
  created:
    - shared/database/migrations/schema/101-order-performance-receipts.sql
    - apps/backoffice/app/api/accommodations/analytics/order-performance/route.ts
    - apps/backoffice/components/accommodations/OrderPerformancePanel.tsx
  modified:
    - apps/backoffice/lib/accommodations/helpers.ts
    - apps/backoffice/app/api/accommodations/orders/[id]/route.ts
    - apps/backoffice/components/accommodations/AccommodationAnalytics.tsx

decisions: []

metrics:
  duration: 3.4min
  completed: 2026-02-02
---

# Phase 39 Plan 01: Order Performance Tracking Summary

**Migration 101 with per-status timestamps, performance analytics API, and counters panel for order fulfillment metrics segmented by service category.**

## What Was Done

### Task 1: Migration 101 + timestamp recording on status transitions

- Created migration 101 adding 4 per-status timestamp columns (`confirmed_at`, `preparing_at`, `ready_at`, `delivered_at`) and 2 receipt columns (`receipt_confirmed_at`, `receipt_auto_confirm_at`) to `accom_service_orders`
- Added 2 property-level receipt config columns (`receipt_enabled`, `receipt_auto_confirm_hours`) to `accom_properties`
- Created partial index `idx_accom_service_orders_perf` on `(property_id, delivered_at) WHERE delivered_at IS NOT NULL`
- Added `STATUS_TIMESTAMP_COLUMN` mapping in helpers.ts
- PATCH handler now records per-status timestamps on every status transition
- When an order becomes 'delivered' and the property has `receipt_enabled=true`, sets `receipt_auto_confirm_at` based on configured timeout hours
- GET handler returns all new timestamp fields in camelCase response

### Task 2: Order performance analytics API + counters panel

- Created GET `/api/accommodations/analytics/order-performance` endpoint returning avg fulfillment time, status counts, and per-category breakdown
- Uses majority-vote `primaryCategoryTag()` to determine order category from item tags (same algorithm as guest PWA)
- Created `OrderPerformancePanel` component with 4 counter cards (Avg Fulfillment, Delivered, Cancelled, Pending) in a 2x2 grid
- Category breakdown table with color-coded dots showing avg time and order count per category
- "Not enough data" threshold: requires 3+ delivered orders before showing averages
- Wired into `AccommodationAnalytics` as standalone section with independent loading/empty state

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- TypeScript compilation: zero errors (backoffice)
- Migration 101: 4 timestamp + 2 receipt columns on orders, 2 receipt settings on properties, 1 partial index
- PATCH handler records per-status timestamps on transitions
- Delivered orders set receipt_auto_confirm_at when property has receipt_enabled=true
- Order performance API returns avg fulfillment time segmented by category
- OrderPerformancePanel shows counters (NOT charts) with category table
- Zero chart library imports in OrderPerformancePanel (confirmed via grep)

## Commits

| Hash    | Message                                                                |
| ------- | ---------------------------------------------------------------------- |
| 9bbf5e2 | feat(39-01): migration 101 + timestamp recording on status transitions |
| a263585 | feat(39-01): order performance analytics API + counters panel          |

## Next Phase Readiness

- Migration 101 needs to be applied to live database (Supabase MCP/CLI not available during execution)
- Plan 39-02 can proceed -- receipt settings columns are already in place from this migration
