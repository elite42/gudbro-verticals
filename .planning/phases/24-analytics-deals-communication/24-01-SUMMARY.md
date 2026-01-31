---
phase: 24
plan: 01
subsystem: accommodations-analytics
tags: [analytics, recharts, kpi, occupancy, revenue, migration]
dependency-graph:
  requires: [phase-18, phase-21, phase-23]
  provides: [analytics-dashboard, deals-tables, email-logs-tables]
  affects: [24-02, 24-03]
tech-stack:
  added: []
  patterns: [KPI-with-trend-comparison, stacked-bar-chart, period-selector]
key-files:
  created:
    - shared/database/migrations/schema/087-analytics-deals-communication.sql
    - apps/backoffice/app/api/accommodations/analytics/kpis/route.ts
    - apps/backoffice/app/api/accommodations/analytics/revenue-chart/route.ts
    - apps/backoffice/app/api/accommodations/analytics/occupancy-chart/route.ts
    - apps/backoffice/components/accommodations/KPICard.tsx
    - apps/backoffice/components/accommodations/AccommodationAnalytics.tsx
    - apps/backoffice/app/(dashboard)/accommodations/analytics/page.tsx
  modified:
    - apps/backoffice/components/layout/Sidebar.tsx
decisions:
  - id: D24-01-01
    description: 'Recharts Tooltip formatter typed as any to handle recharts v3 optional params'
    rationale: 'recharts v3 types make value/name params optional; casting to any is cleanest workaround'
  - id: D24-01-02
    description: 'Room type colors as static map with fallback to gray for unknown types'
    rationale: 'Avoids dynamic color generation complexity; covers common accommodation room types'
metrics:
  duration: ~5 min
  completed: 2026-01-31
---

# Phase 24 Plan 01: Analytics Foundation Summary

Migration 087 for deals/clicks/email-logs tables, 3 analytics API routes with period-based KPIs and trend comparison, recharts dashboard with stacked revenue bars and occupancy line chart.

## Tasks Completed

### Task 1: Database migration 087 + Analytics API routes

- **Commit:** edb60bb
- Created migration 087 with three tables: `accom_deals`, `accom_deal_clicks`, `accom_email_logs`
- All tables have proper indexes, RLS policies, role grants, and comments
- Built 3 analytics API endpoints:
  - `/api/accommodations/analytics/kpis` -- occupancy rate, total revenue, ADR, service revenue with previous-period comparison
  - `/api/accommodations/analytics/revenue-chart` -- monthly stacked data by room type + services
  - `/api/accommodations/analytics/occupancy-chart` -- daily occupancy percentage (half-open [) convention)

### Task 2: Analytics dashboard UI + sidebar navigation

- **Commit:** cb3d6ab
- `KPICard` component with Phosphor trend icons (TrendUp/TrendDown/Minus), percentage change display
- `AccommodationAnalytics` component: period selector (7d/30d/90d/12m), 4 KPI cards, recharts BarChart (stacked by room type), recharts LineChart (daily occupancy), revenue breakdown table
- Analytics page at `/accommodations/analytics` with property ID from env var
- Sidebar updated: Analytics and Deals nav items under Accommodations section

## Decisions Made

| ID        | Decision                                      | Rationale                                                                                  |
| --------- | --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| D24-01-01 | Recharts Tooltip formatter typed as `any`     | recharts v3 makes value/name params optional; casting avoids complex union type gymnastics |
| D24-01-02 | Static room type color map with gray fallback | Covers common types without dynamic color generation overhead                              |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed recharts v3 Tooltip formatter type incompatibility**

- **Found during:** Task 2 typecheck
- **Issue:** recharts v3 types define formatter params as `value: T | undefined, name: string | undefined` but plan assumed `number, string`
- **Fix:** Used `any` type with runtime coercion (`Number(value) || 0`, `String(name || '')`)
- **Files modified:** AccommodationAnalytics.tsx
- **Commit:** cb3d6ab

## Verification

- [x] Migration 087 SQL is syntactically valid with correct FK references
- [x] `npx tsc --noEmit` passes (verified twice, pre-commit hook also confirmed)
- [x] Analytics page accessible via sidebar navigation (/accommodations/analytics)
- [x] KPI cards show occupancy rate, revenue, ADR, service revenue with trends
- [x] Revenue chart renders stacked bars by room type
- [x] Occupancy chart renders daily line chart
- [x] Period selector changes data across all components

## Next Phase Readiness

Plans 02 and 03 can proceed:

- Plan 02 (Deals CRUD): `accom_deals` and `accom_deal_clicks` tables are ready, Deals nav item already in sidebar
- Plan 03 (Email Communication): `accom_email_logs` table is ready
