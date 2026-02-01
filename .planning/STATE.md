# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-01)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** v1.5 Frictionless Guest Access — Phase 27 Owner Security Configuration (COMPLETE)

## Current Position

Phase: 27 of 29 (Owner Security Configuration)
Plan: 2 of 2 in current phase
Status: Phase complete — verified 9/9 must-haves
Last activity: 2026-02-01 — Phase 27 verified and complete

Progress: v1.0-v1.4 [██████████████████████████████████████████████████] 57/57 plans
Progress: v1.5 [██████░░░░] 6/10 plans (60%)

## Performance Metrics

**Velocity:**

- Total plans completed: 63 (+ 1 quick task)
- Average duration: ~3.4 min/plan
- Total execution time: ~4.5 hours

**By Milestone:**

| Milestone | Plans | Total Time | Avg/Plan |
| --------- | ----- | ---------- | -------- |
| v1.0      | 6     | ~20 min    | 3.3 min  |
| v1.1      | 12+1  | ~32 min    | 2.7 min  |
| v1.2      | 8     | ~62 min    | 7.8 min  |
| v1.3      | 10    | ~33 min    | 3.3 min  |
| v1.4      | 21    | ~87 min    | 4.1 min  |
| v1.5      | 6/10  | ~22 min    | 3.7 min  |

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
- Browse tier hides all PII (guest name, booking code, guest count) for privacy
- signGuestToken accepts null bookingId for no-booking room sessions
- No-booking token expires 7 days from now; active-booking token expires checkout+24h
- Room session shares localStorage keys with booking session (latest wins)
- Partial last name match (startsWith) with min 3 chars for flexible international name verification
- In-memory rate limiting (Map-based, 5 attempts/5 min) sufficient for Phase 26; hardened in Phase 27
- NFD normalization strips diacritics for robust name matching across character sets
- Cart proxy pattern: spread cart object but override addItem to gate behind verification in browse tier
- CSS-only success animation (scale-in keyframe) for verification — zero new dependencies
- Cooldown state replaces input entirely with countdown timer for clear UX feedback
- access_settings JSONB stores preset name + individual action booleans for custom overrides beyond presets
- Preset definitions duplicated in backoffice (not cross-app import) to avoid cross-app dependency
- CHECK constraint allows NULL access_settings for backward compat with existing properties
- Boolean convention: true = gated (requires verification), false = free for browse tier
- Legacy fallback uses standard preset when access_settings is null (backward compatible)
- isActionGated pattern: centralized per-action gating check with tier, settings, and fallback logic
- hasAnyGatedAction controls verify prompt visibility (Family preset hides it entirely)

### Pending Todos

None.

### Blockers/Concerns

- Stripe MCC 7011 extended authorization needs validation with SEA property owners
- ADMIN_API_KEY auth pattern needs migration to session-based auth
- Phase 28: HEIC conversion reliability on Android needs device testing (Samsung, Xiaomi, Oppo)
- Phase 28: Vietnam-specific document retention rules (NA17) need local legal validation

## Session Continuity

Last session: 2026-02-01
Stopped at: Phase 27 complete and verified (9/9 must-haves passed)
Resume file: None
Next: `/gsd:discuss-phase 28` (Document Upload + Visa Tracking)

---

_Last updated: 2026-02-01 after Phase 27 verified and complete_
