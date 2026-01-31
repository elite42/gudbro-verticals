# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-01)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** v1.5 Frictionless Guest Access — Phase 25 Room Code Foundation

## Current Position

Phase: 25 of 29 (Room Code Foundation)
Plan: 1 of 2 in current phase
Status: In progress
Last activity: 2026-02-01 — Completed 25-01-PLAN.md (room codes migration)

Progress: v1.0-v1.4 [██████████████████████████████████████████████████] 57/57 plans
Progress: v1.5 [█░░░░░░░░░] 1/10 plans (10%)

## Performance Metrics

**Velocity:**

- Total plans completed: 58 (+ 1 quick task)
- Average duration: ~3.4 min/plan
- Total execution time: ~4.3 hours

**By Milestone:**

| Milestone | Plans | Total Time | Avg/Plan |
| --------- | ----- | ---------- | -------- |
| v1.0      | 6     | ~20 min    | 3.3 min  |
| v1.1      | 12+1  | ~32 min    | 2.7 min  |
| v1.2      | 8     | ~62 min    | 7.8 min  |
| v1.3      | 10    | ~33 min    | 3.3 min  |
| v1.4      | 21    | ~87 min    | 4.1 min  |
| v1.5      | 1/10  | ~4 min     | 4.0 min  |

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table and milestone archives.

Recent decisions for v1.5:

- Additive architecture: new /stay/room/[roomCode] route alongside existing /stay/[code] (never break backward compat)
- Two-tier JWT with accessTier claim (browse vs full) in single token, not two separate tokens
- SECURITY DEFINER resolve_room_access() for room-to-booking resolution (follows existing pattern)
- Zero new dependencies except browser-image-compression and heic2any for document upload
- 8-char room codes (RM-XXXXXXXX) for larger permanent keyspace vs 6-char booking codes
- Timezone-aware date resolution: (NOW() AT TIME ZONE property.timezone)::DATE, not CURRENT_DATE
- No guest_last_name in resolve_room_access return (browse tier privacy)

### Pending Todos

None.

### Blockers/Concerns

- Stripe MCC 7011 extended authorization needs validation with SEA property owners
- ADMIN_API_KEY auth pattern needs migration to session-based auth
- Phase 28: HEIC conversion reliability on Android needs device testing (Samsung, Xiaomi, Oppo)
- Phase 28: Vietnam-specific document retention rules (NA17) need local legal validation

## Session Continuity

Last session: 2026-02-01
Stopped at: Completed 25-01-PLAN.md
Resume file: None
Next: `/gsd:execute-phase 25` (plan 02)

---

_Last updated: 2026-02-01 after completing 25-01-PLAN.md_
