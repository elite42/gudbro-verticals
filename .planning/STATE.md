# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-31)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** Phase 18 - Database Foundation (v1.4 Accommodations v2)

## Current Position

Phase: 18 of 24 (Database Foundation) -- first of 7 phases in v1.4
Plan: 1 of 2 in current phase
Status: In progress
Last activity: 2026-01-31 -- Completed 18-01-PLAN.md (migration 083)

Progress: v1.0-v1.3 [36/36] | v1.4 [█░░░░░░░░░░░░░░░░░] 1/18
████████████████████████████████████████ prior | █░░░░░░░░░░░░░░░░░ v1.4

## Performance Metrics

**Velocity:**

- Total plans completed: 37 (+ 1 quick task)
- Average duration: ~2.9 min/plan
- Total execution time: ~2.5 hours

**By Milestone:**

| Milestone | Plans | Total Time | Avg/Plan |
| --------- | ----- | ---------- | -------- |
| v1.0      | 6     | ~20 min    | 3.3 min  |
| v1.1      | 12+1  | ~32 min    | 2.7 min  |
| v1.2      | 8     | ~62 min    | 7.8 min  |
| v1.3      | 10    | ~33 min    | 3.3 min  |

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table and milestone archives.

Key v1.4 architectural decisions:

- Owner Dashboard lives in apps/backoffice/ (not accommodations PWA)
- Guest flows remain JWT-based (no account creation)
- DATE type for check-in/check-out (not TIMESTAMPTZ)
- Single booking model with status field (instant vs inquiry)
- Cash/transfer default, Stripe as progressive enhancement
- Half-open [) daterange for back-to-back bookings (checkout day free for new checkin)
- All prices INTEGER minor currency units (not NUMERIC/DECIMAL)
- Service order items snapshot name/unit_price for historical accuracy

### Pending Todos

None.

### Blockers/Concerns

- Stripe MCC 7011 extended authorization needs validation with SEA property owners
- Partner commission confirmation flow underspecified (start with click tracking only)

## Session Continuity

Last session: 2026-01-31
Stopped at: Completed 18-01-PLAN.md (migration 083)
Resume file: None
Next: Execute 18-02-PLAN.md or `/gsd:execute-phase 18` for plan 02

---

_Last updated: 2026-01-31 after 18-01 execution_
