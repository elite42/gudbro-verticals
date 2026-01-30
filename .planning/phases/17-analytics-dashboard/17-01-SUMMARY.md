---
phase: 17-analytics-dashboard
plan: 01
subsystem: api
tags: [analytics, supabase, date-fns, aggregation, feedback]

# Dependency graph
requires:
  - phase: 13-feedback-intelligence
    provides: fb_submissions and fb_tasks tables with type, vertical, processed_at, resolved_at columns
provides:
  - GET /api/feedback/analytics/volume — time-series daily submission counts with gap filling
  - GET /api/feedback/analytics/summary — type/vertical breakdown, top features, response time metrics
affects: [17-02 dashboard page, future analytics expansion]

# Tech tracking
tech-stack:
  added: []
  patterns:
    [
      JS-side aggregation of Supabase query results,
      date gap filling with eachDayOfInterval,
      Promise.all parallel queries,
    ]

key-files:
  created:
    - apps/backoffice/app/api/feedback/analytics/volume/route.ts
    - apps/backoffice/app/api/feedback/analytics/summary/route.ts
  modified: []

key-decisions:
  - 'JS-side aggregation instead of Postgres RPC functions (simpler, no migration needed, performant for <10K rows)'
  - 'Two endpoints (volume + summary) batching related metrics to minimize API calls from dashboard'

patterns-established:
  - 'Analytics API pattern: auth check + supabaseAdmin query + JS aggregation + typed JSON response'
  - 'Date gap filling: eachDayOfInterval generates full range, merge with query Map, default count=0'

# Metrics
duration: 3min
completed: 2026-01-30
---

# Phase 17 Plan 01: Analytics API Routes Summary

**Two analytics API routes aggregating fb_submissions and fb_tasks data — volume time-series with gap filling and summary breakdowns with parallel queries**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-30T13:55:10Z
- **Completed:** 2026-01-30T13:57:56Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments

- Volume API returns daily submission counts with zero-filled date gaps for chart continuity
- Summary API returns type breakdown, vertical breakdown, top 10 features, and avg response times in a single endpoint
- Both APIs use auth check pattern from existing feedback/tasks/route.ts
- Summary uses Promise.all for 3 parallel Supabase queries (no sequential waterfalls)

## Task Commits

Each task was committed atomically:

1. **Task 1: Volume API route** - `6caff28` (feat)
2. **Task 2: Summary API route** - `5da0664` (feat)

## Files Created/Modified

- `apps/backoffice/app/api/feedback/analytics/volume/route.ts` - GET endpoint returning gap-filled daily submission counts
- `apps/backoffice/app/api/feedback/analytics/summary/route.ts` - GET endpoint returning type/vertical breakdowns, top features, response times

## Decisions Made

- JS-side aggregation over Postgres RPC: simpler implementation, no migration files needed, adequate for expected data volumes (<10K submissions)
- Two batched endpoints (volume + summary) rather than one-per-chart: reduces auth checks and network waterfalls from the dashboard

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Both API routes ready for Plan 02 (Dashboard page with Recharts)
- Volume endpoint provides gap-filled data ideal for LineChart rendering
- Summary endpoint provides pre-aggregated data for BarChart, PieChart, and KPI cards
- recharts library will need to be installed in Plan 02

---

_Phase: 17-analytics-dashboard_
_Completed: 2026-01-30_
