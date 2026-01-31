# Phase 26: Progressive Authentication - Context

**Gathered:** 2026-02-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Upgrade browse-tier sessions to full-access when guests attempt paid actions. Inline verification modal, two-tier JWT with accessTier claim, multi-guest PIN support, and checkout invalidation. Security presets and per-action configuration belong to Phase 27.

</domain>

<decisions>
## Implementation Decisions

### Verification Flow

- When guest taps a paid action (order service, request item), a bottom sheet modal appears over the current page — not a redirect, not a new page
- The modal contains a single input field (last name or PIN depending on property config) with a clear CTA
- On success: modal closes with brief success animation (checkmark), original action proceeds immediately — zero page reload
- Session stays upgraded (full tier) for the rest of the stay — no re-verification needed
- The transition should feel instant and lightweight — like Apple Pay confirmation, not like a login form

### Verification Methods

- Two methods: last name match (default) and numeric PIN
- Last name: case-insensitive partial match (first 3+ chars accepted to handle encoding issues with international names)
- PIN: 4-digit numeric code, set by owner in backoffice per booking (not per room)
- Default method: last name (simpler for owner — no PIN setup needed)
- Max 5 attempts before cooldown (5 minutes), then 5 more attempts — prevent brute force without locking out confused tourists
- Failed attempt shows friendly message: "That doesn't match. Try again." — no security-sounding language

### Action Classification

- Browse tier (free, no verification): WiFi, property info, contacts, house rules, local deals, map
- Full tier (requires verification): order service, request housekeeping, report issue, any action that creates a database record or triggers a notification to staff
- Phase 27 will allow owners to customize this classification — for now, use sensible defaults hardcoded
- "Contact reception" (WhatsApp/phone link) stays browse tier — it's just opening an external app

### Session & Multi-Guest

- Single shared PIN per booking (not per guest) — simplest for owner to communicate
- Each device that verifies gets its own full-tier JWT — independent sessions
- JWT accessTier claim: "browse" or "full" — single token, not two separate tokens (decided in Phase 25)
- Full-tier token expiry: checkout date + 24 hours (same as browse tier, decided in Phase 25)
- After checkout: resolve_room_access returns no active booking → new QR scan gets browse-only token → all paid actions blocked
- No explicit "logout" — session naturally expires

### Token Upgrade Mechanism

- Client calls POST /api/stay/room/[roomCode]/verify with { method: "lastName" | "pin", value: "..." }
- On success: API returns new JWT with accessTier: "full" and bookingId populated
- Client replaces token in localStorage (same key as browse token — latest wins, already decided in Phase 25)
- All subsequent API calls use the upgraded token — no special handling needed
- Backward compatibility: existing /stay/[code] flow continues to issue full-tier tokens directly (no regression)

### Claude's Discretion

- Bottom sheet modal design (height, animation, blur backdrop)
- Input field styling and placeholder text
- Success/failure animation specifics
- Cooldown timer UI (if shown)
- Error message exact wording
- API endpoint internal implementation (SQL, RLS patterns)

</decisions>

<specifics>
## Specific Ideas

- User philosophy: "less stress as possible for the guest and the property owner — a happy customer is what matters"
- Verification should feel like a formality, not a barrier — fast, friendly, minimal
- International guests: handle non-ASCII names gracefully (Vietnamese, Thai, Chinese names with diacritics)
- The modal should work perfectly on mobile (primary use case is phone after QR scan)

</specifics>

<deferred>
## Deferred Ideas

- Per-action security customization — Phase 27 (Owner Security Configuration)
- Security presets (Family/Standard/Structured) — Phase 27
- Biometric verification (fingerprint/face) — future consideration
- Guest identity verification (passport match) — Phase 28 domain

</deferred>

---

_Phase: 26-progressive-authentication_
_Context gathered: 2026-02-01_
