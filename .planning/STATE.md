# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-29)

**Core value:** Guests scan a QR in their room and instantly access WiFi, stay info, services, local deals, and host contact — all from real data.
**Current focus:** v1.1 In-Stay MVP Backend — Phase 7 in progress (F&B Integration)

## Current Position

Phase: 7 of 7 (F&B Integration)
Plan: 1 of 2 (backend complete)
Status: In progress. Plan 07-01 complete (migration + API). Plan 07-02 pending (frontend).
Last activity: 2026-01-30 — Completed 07-01-PLAN.md (F&B backend integration)

Progress: [█████████░] 9/10 plans (phases 4-7)

## Performance Metrics

**v1.0 Velocity:**

- Total plans completed: 6
- Average duration: 3.3 minutes
- Total execution time: ~20 minutes
- Total milestone time: ~3 hours (including planning, research, execution)

**v1.1 Velocity:**

- Total plans completed: 9
- Average duration: 2.8 minutes
- Total execution time: ~25 minutes

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
- 06-01: Quick actions stored as JSONB array on accom_properties (flexible, no extra table)
- 06-01: Guest country stored as TEXT on accom_bookings (ISO code, no CHECK constraint)
- 06-01: City useful numbers reuse existing infrastructure from migration 073
- 06-01: Property contact in useful numbers uses emergency_phone with host_phone fallback
- 06-02: Client JWT decode via atob (no jose on client)
- 06-02: localStorage keys: gudbro_stay_token and gudbro_stay_data
- 06-02: Booking code auto-uppercase and auto-prefix BK-
- 06-03: Dashboard shell pattern: 128-line thin shell composing 11 section components
- 06-03: Visa exemption static lookup for 15 nationalities with e-visa portal fallback
- 06-04: Zero-decimal currencies (VND, JPY, KRW) use minor units directly; others divide by 100
- 06-04: UsefulNumbers hides silently on error (don't alarm guests)
- 06-04: City numbers grouped by category for organized display
- 07-01: F&B linking uses slug-based deep-linking (not FK to merchants table)
- 07-01: INT-01 satisfied by existing partner_conventions polymorphic pattern (partner_id + partner_type)
- 07-01: No redundant property_id column on partner_conventions (data drift risk)

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

None. Plan 07-01 complete. Plan 07-02 (frontend RestaurantSection) can proceed.

## Session Continuity

Last session: 2026-01-30T20:08:00Z
Stopped at: Completed 07-01-PLAN.md (F&B backend integration)
Resume file: None
Next: Execute 07-02-PLAN.md (F&B frontend RestaurantSection)

---

_Last updated: 2026-01-30 after 07-01 completion_
