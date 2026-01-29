# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-29)

**Core value:** Guests scan a QR in their room and instantly access WiFi, stay info, services, local deals, and host contact — all from real data.
**Current focus:** v1.1 In-Stay MVP Backend — Phase 4 (Database Foundation)

## Current Position

Phase: 4 of 7 (Database Foundation)
Plan: 1 of 2 (in progress)
Status: In progress - Plan 04-01 complete, Plan 04-02 next
Last activity: 2026-01-29 — Completed 04-01-PLAN.md (accommodations schema)

Progress: [█░░░░░░░░░] 1/8 plans (12%)

## Performance Metrics

**v1.0 Velocity:**

- Total plans completed: 6
- Average duration: 3.3 minutes
- Total execution time: ~20 minutes
- Total milestone time: ~3 hours (including planning, research, execution)

**v1.1 Velocity:**

- Total plans completed: 1
- Average duration: 2 minutes
- Total execution time: 2 minutes

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table.

Recent decisions affecting v1.1 work:

- v1.1: Accommodations chosen as first vertical with real backend (strategic node, distributes to other verticals)
- v1.1: Reuse existing conventions system (migration 050) for local partnerships instead of creating new tables
- v1.1: Start phase numbering at 4 (continuous from v1.0 Phase 3)
- 04-01: Guest access via SECURITY DEFINER function, not RLS policy on bookings table
- 04-01: Booking codes use BK-XXXXXX format excluding 0/O/1/I/L for readability
- 04-01: Price stored as INTEGER (minor currency unit) not DECIMAL
- 04-01: Accommodations tables prefixed with accom\_ namespace

### Known Issues

**Tech debt from v1.0 (7 items):**

- Tours soups DB type errors (excluded from tsconfig)
- Visual QA on physical devices not performed
- Tours uses Tailwind instead of CSS variables
- Wellness /staff/[slug] lacks explicit back link
- 19 ESLint warnings in Wellness
- 3 placeholder links (href="#") in Tours/Workshops
- No manual smoke testing performed

### Pending Todos

None.

### Blockers/Concerns

None. v1.1 phases are well-scoped with clear dependencies.

## Session Continuity

Last session: 2026-01-29T11:44:37Z
Stopped at: Completed 04-01-PLAN.md (accommodations schema)
Resume file: None
Next: Execute 04-02-PLAN.md (seed data)

---

_Last updated: 2026-01-29 after 04-01 execution_
