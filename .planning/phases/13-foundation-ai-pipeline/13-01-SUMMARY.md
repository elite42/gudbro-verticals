---
phase: 13
plan: 01
subsystem: database
tags: [postgresql, rls, pg_trgm, feedback, schema]
requires: []
provides:
  [
    fb_submissions,
    fb_tasks,
    fb_merchant_notifications,
    find_similar_tasks,
    update_task_metrics,
  ]
affects: [phase-14, phase-15, phase-16, phase-17]
tech-stack:
  added: []
  patterns:
    [text-check-constraints, rls-account-roles, cte-scoring, trigram-similarity]
key-files:
  created:
    - shared/database/migrations/schema/082-feedback-intelligence.sql
  modified: []
decisions:
  - id: D-1301-1
    what: Dedicated fb_merchant_notifications table
    why: Keeps feedback intelligence domain self-contained, avoids coupling with internal_notifications (migration 029)
  - id: D-1301-2
    what: CTE-based scoring in find_similar_tasks instead of HAVING
    why: Research example used HAVING without GROUP BY which is invalid SQL; CTE with WHERE is correct
metrics:
  duration: ~4 minutes
  completed: 2026-01-30
---

# Phase 13 Plan 01: Database Schema Summary

**One-liner:** PostgreSQL schema with 3 tables, 10 indexes, 8 RLS policies, tag+trigram similarity function, and metrics aggregation function for feedback intelligence

## What Was Built

### Tables

1. **fb_submissions** - Raw merchant feedback with AI-processed fields (translation, classification, tags, sentiment). Supports pending/processing/processed/failed workflow with retry tracking.

2. **fb_tasks** - Aggregated tasks from similar submissions. Denormalized metrics: submission_count, languages array, avg_sentiment, first/last submission timestamps. Status lifecycle: new > reviewing > in_progress > done/rejected.

3. **fb_merchant_notifications** - Lifecycle notifications per merchant account (acknowledged, status_changed, resolved, rejected). Read/unread state for bell icon UI.

### Functions

- **find_similar_tasks(merchant_id, translated_body, tags, threshold)** - CTE-based scoring combining 60% tag overlap + 40% pg_trgm trigram similarity. Returns top 5 matches above threshold (default 0.5). Excludes done/rejected tasks.

- **update_task_metrics(task_id)** - Recalculates denormalized fields on fb_tasks from linked submissions: count, distinct languages, average sentiment (positive=1.0, neutral=0.5, negative=0.0), last submission date.

### RLS Policies

- Merchants access own data via `account_roles` lookup (tenant_id match)
- Notifications use direct `account_id` match via `auth.uid()`
- Service role has full access to all tables (for AI processing service)

### Indexes

- GIN indexes on tags arrays and trigram text for similarity queries
- Partial indexes on processing status (pending/processing) and task linkage
- Composite indexes for merchant+created_at DESC queries

## Commits

| Task | Name                                       | Commit  | Files                         |
| ---- | ------------------------------------------ | ------- | ----------------------------- |
| 1    | Create tables with indexes and constraints | 44fafe7 | 082-feedback-intelligence.sql |
| 2    | Add RLS policies and similarity function   | c916e02 | 082-feedback-intelligence.sql |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed HAVING without GROUP BY in find_similar_tasks**

- **Found during:** Task 2
- **Issue:** Research example used HAVING clause without GROUP BY, which is invalid SQL
- **Fix:** Used CTE (`scored_tasks`) to compute scores, then filtered with WHERE in outer query
- **Files modified:** 082-feedback-intelligence.sql
- **Commit:** c916e02

## Decisions Made

| ID       | Decision                                  | Rationale                                                                                 |
| -------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| D-1301-1 | Dedicated fb_merchant_notifications table | Keeps feedback domain self-contained vs reusing internal_notifications from migration 029 |
| D-1301-2 | CTE-based scoring pattern                 | Research HAVING pattern was invalid; CTE with WHERE is correct and readable               |

## Next Phase Readiness

Phase 13 Plan 02 (AI processing service) can proceed immediately. All tables, indexes, RLS policies, and helper functions are in place. The service will use `supabaseAdmin` to bypass RLS and call `find_similar_tasks` and `update_task_metrics` via RPC.
