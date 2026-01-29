# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-29)

**Core value:** Guests scan a QR in their room and instantly access WiFi, stay info, services, local deals, and host contact — all from real data.
**Current focus:** v1.1 In-Stay MVP Backend — Phase 5 complete, ready for Phase 6 (Frontend Integration)

## Current Position

Phase: 5 of 7 (API Layer)
Plan: 2 of 2 (complete)
Status: Phase 5 complete. All 5 API routes built and verified. Ready for Phase 6 (Frontend Integration).
Last activity: 2026-01-29 — Completed 05-02-PLAN.md (protected stay data routes)

Progress: [████░░░░░░] 4/8 plans (50%)

## Performance Metrics

**v1.0 Velocity:**

- Total plans completed: 6
- Average duration: 3.3 minutes
- Total execution time: ~20 minutes
- Total milestone time: ~3 hours (including planning, research, execution)

**v1.1 Velocity:**

- Total plans completed: 4
- Average duration: 2.5 minutes
- Total execution time: ~10 minutes

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
- 04-02: Created demo host account for owner_id FK (accom_properties.owner_id NOT NULL)
- 04-02: Seed UUID pattern: aa/bb/cc/dd/ee/ff prefixes for rooms/bookings/categories/items/merchants/conventions
- 04-02: Merchant inserts use ON CONFLICT DO NOTHING for idempotent re-runs
- 05-01: Lazy singleton Proxy pattern for Supabase client (from backoffice)
- 05-01: JWT secret via GUEST_JWT_SECRET env var (server-only)
- 05-01: Token expiry = checkout date + 24h buffer
- 05-01: Generic verification_failed error prevents booking code enumeration
- 05-01: RPC result accessed as data[0] (array return from Supabase .rpc())
- 05-02: Auth guard helper inlined per route (authenticateGuest function)
- 05-02: Services items filtered client-side for nested active status
- 05-02: Deals uses explicit FK name for merchant join
- 05-02: Property returns { property, wifi } matching verify route pattern

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

None. Phase 5 complete. Phase 6 can proceed with frontend integration.

## Session Continuity

Last session: 2026-01-29T12:50:24Z
Stopped at: Completed 05-02-PLAN.md (protected stay data routes) — Phase 5 complete
Resume file: None
Next: Plan and execute Phase 6 (Frontend Integration)

---

_Last updated: 2026-01-29 after 05-02 execution_
