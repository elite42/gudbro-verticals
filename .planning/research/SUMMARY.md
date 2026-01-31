# Project Research Summary

**Project:** v1.5 Accommodations — Frictionless Guest Access
**Domain:** Hotel/accommodation guest experience, QR-based room access, progressive authentication
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

This milestone transforms the accommodations PWA from a booking-code-gated dashboard into a frictionless QR-based room access system with progressive authentication. The core insight: physical presence in the room (having the key, seeing the QR) is already authentication for browsing. Financial actions require identity verification, but WiFi and property info should be instant.

The recommended approach is additive, not replacement. Existing booking-code URLs continue working unchanged. Room-based QR codes add a new entry point with two authentication tiers: browse (instant, for WiFi and catalog) and verified (identity-checked, for orders). This requires zero new dependencies for core features — the existing jose JWT system, Supabase RLS, and Next.js middleware handle everything. Only document upload requires new packages (browser-image-compression and heic2any).

Key risk: stale QR reuse. When Guest A checks out and Guest B checks in, the permanent room QR must resolve correctly to the current booking — never exposing previous guest data or allowing previous guest actions. Mitigation: JWT invalidation on check-in, date-based booking resolution in SECURITY DEFINER functions, and explicit vacancy state handling. This must be architected correctly before any implementation.

## Key Findings

### Recommended Stack

**Zero new dependencies for 5 of 6 core features.** The frictionless QR routing, progressive authentication, multi-zone WiFi, QR lifecycle management, and owner-configurable security levels require only architectural changes to existing systems. The only genuinely new packages are for document upload.

**Core technologies (all already in package.json):**

- jose ^6.0.8: JWT signing/verification — extends to support two-tier tokens (browse vs. verified) via custom claims
- @supabase/supabase-js ^2.39.0: Database queries, Storage for documents, RLS enforcement — no version upgrade needed
- Next.js 14.2.33: Middleware for QR routing interception, API routes for room-based access — native route interception
- date-fns ^3.3.1: Token expiry calculations, checkout date validation — existing patterns continue

**New packages (document upload only):**

- browser-image-compression ^2.0.2: Client-side image compression before Supabase Storage upload (passport photos are 3-8MB, must compress to ~1MB)
- heic2any ^0.0.4: Convert iPhone HEIC photos to JPEG in browser (iPhones shoot HEIC by default)

**What NOT to add:** next-auth (overkill for guest JWT), tesseract.js (OCR unreliable, adds 10MB), uppy/dropzone (single-file upload needs simple input), @radix-ui/react-accordion (native details/summary works for WiFi zones).

**Source confidence:** HIGH — all current packages verified in codebase, new package versions verified on npm.

### Expected Features

**Must have (table stakes — every competitor does this):**

- Instant dashboard on QR scan with no login barrier — WiFi must be visible immediately, or guests abandon
- Progressive authentication for paid actions — browse free, verify for orders (e-commerce UX pattern applied to hospitality)
- QR activation/deactivation tied to booking lifecycle — security requirement to prevent previous guest access
- Unique URL per active booking — the URL IS the credential (Duve, STAY App, mycloud all use this)
- Document upload for passport/visa with secure storage — legal requirement in Vietnam (NA17 registration)

**Should have (competitive differentiators):**

- Owner-configurable security levels per property type — B&B (trust-based) vs. Hotel (verification-required) have different needs, no competitor offers this
- Multi-zone WiFi credential display — hotels have lobby/pool/room WiFi, currently GUDBRO shows one network
- Visa expiry tracking with alerts — extends existing visa tracker (PRD section 13), 14/7/3 day alert schedule
- QR scan analytics — owner sees engagement rate, peak scan times, which rooms scan most (no competitor provides this for small properties)
- Grace period after checkout — guest may need WiFi in lobby or receipt after checkout (configurable 2-4 hours)

**Defer to post-milestone:**

- OCR document extraction — high complexity, needs third-party service evaluation, manual entry works for v1
- Per-feature auth configuration — security presets are enough for v1, custom toggles add UI complexity
- Multi-QR per room with context parameters — nice to have but single room QR sufficient initially
- NA17 export for Vietnam compliance — important but can be a focused follow-up
- Liveness/biometric verification — not for small SEA properties market segment, ever

**Source confidence:** MEDIUM-HIGH — patterns well-established in hospitality tech (Duve #1 Hotel Guest App 2026, Canary #1 Contactless Check-in), progressive auth is novel combination of web UX patterns.

### Architecture Approach

The architecture is additive layering, not replacement. Two entry points coexist: `/stay/{booking-code}` (existing, unchanged) and `/stay/room/{room-code}` (new). Both render the same dashboard components. The difference is authentication method, not UI. Room-based access introduces permanent room codes (short, human-readable like "BVA-203") that resolve to the current active booking via a SECURITY DEFINER function. JWT payload extends with `accessTier: 'browse' | 'full'` and optional `roomId`. API routes distinguish between tiers: read endpoints accept browse-tier, write endpoints enforce full-tier. Token upgrade flow is seamless: guest taps "Order," sees inline verification prompt (last name), upgrades to full-tier without page reload.

**Major components:**

1. **Room code resolution (SECURITY DEFINER)** — `resolve_room_access(room_code)` returns room info, property info, WiFi, and current booking if active (LEFT JOIN bookings on date range + status). Handles vacancy state explicitly.
2. **Two-tier JWT system (lib/auth.ts extension)** — `signRoomBrowseToken()` issues 24h browse token with propertyId + roomId + optional bookingId. `signGuestToken()` extended with accessTier field. Single token with scopes, not two separate tokens.
3. **Inline verification component** — Bottom sheet/modal triggered on paid actions. Accepts last name (or PIN, owner-configurable). Upgrades session silently on success, original action proceeds.
4. **Document upload with GDPR compliance** — Supabase Storage private bucket + accom_guest_documents table with RLS. Upload via SECURITY DEFINER function. Auto-delete cron (checkout + 30 days retention). Signed URLs (5-min expiry) for owner access.
5. **Multi-zone WiFi resolution** — Property has wifi_zones JSONB array, rooms can override with wifi_ssid/password. Resolution: room override → zone primary → property fallback. WifiCard displays primary prominently, other zones in accordion.

**Source confidence:** HIGH — all findings based on direct codebase analysis (existing auth.ts, stay API routes, AccomQRGenerator, database schema in migrations 077-087).

### Critical Pitfalls

**Top 5 to avoid (from research):**

1. **Stale QR reuse — previous guest orders service after checkout** — Physical QR is permanent. When Guest A checks out and Guest B checks in, the room QR must resolve to Guest B's booking, never Guest A's. Prevention: `resolve_room_access()` checks `check_in_date <= CURRENT_DATE AND check_out_date + 24h >= NOW()`, invalidate previous JWT on new check-in, explicit vacancy state when no active booking.

2. **Removing auth creates unprotected API endpoints** — Going from "all protected" to "some public, some protected" requires touching every endpoint. Miss one and service ordering becomes unauthenticated. Prevention: explicit endpoint classification matrix BEFORE coding (GET endpoints can be public, ALL POST/PUT/DELETE require full-tier auth), shared auth middleware helper, integration tests per endpoint.

3. **Progressive auth gate positioned wrong** — Too early (verify before WiFi) kills adoption. Too late (orders without verification) enables abuse. Prevention: action-level gates not page-level, WiFi + browsing free, orders + documents gated, inline verification not redirect, user-test the flow.

4. **Multi-guest rooms break single-booking QR assumption** — Booking stores primary guest last name. Partner cannot verify with their name. Prevention: PIN-based verification alongside name (4-digit PIN given at check-in, same for all guests in room), or room-number verification option, owner-configurable method.

5. **Backward compatibility — existing booking-code QR codes stop working** — Properties have printed QR codes pointing to `/stay/BK-ABC123`. URLs must continue working. Prevention: never break `/stay/[code]` route, add new `/stay/room/[roomCode]` route alongside, existing JWTs remain valid, pre-arrival emails keep using booking codes, owner transitions to room QR at own pace.

**Source confidence:** HIGH — verified against OWASP session management patterns, existing GUDBRO codebase constraints, GDPR hospitality requirements (Marriott $52M settlement), industry QR security patterns.

## Implications for Roadmap

Based on research, recommended 5-phase structure:

### Phase 1: Room Code Foundation + Browse Entry Point

**Rationale:** Establishes the permanent room code system and browse-tier access — the foundation everything else builds on. Must come first to validate room-to-booking resolution and vacancy state handling before adding verification complexity.
**Delivers:** Guests scan QR, see WiFi + property info immediately (browse mode). No ordering yet, but core value (WiFi access) is live.
**Implements:** `room_code` column + generation function, `resolve_room_access()` SECURITY DEFINER, `/stay/room/[roomCode]` page route, `/api/stay/room/[roomCode]` API route issuing browse JWT, `useRoomSession` hook (browse tier only), AccomQRGenerator update to room codes, redirect from old /checkin URLs.
**Avoids:** Pitfall 1 (stale QR) via date-based booking resolution, Pitfall 7 (backward compatibility) via redirect from old URLs.
**Addresses:** Must-have features — instant dashboard on QR scan, unique URL per booking, QR activation/deactivation.
**Research flag:** Standard patterns, skip research-phase. Well-documented Supabase RPC and Next.js routing.

### Phase 2: Two-Tier Authentication + Inline Verification

**Rationale:** With browse access working, add the verification layer for paid actions. This completes the full guest flow: scan → browse → order (verify inline) → order proceeds.
**Delivers:** Full ordering functionality via room QR. Guests can place service orders, request laundry, book tours — the full in-stay dashboard.
**Implements:** `accessTier` field in JWT payload (backward-compatible), `InlineVerification` component, `/api/stay/room/[roomCode]/verify` route, tier checking in write API routes (orders POST returns 403 for browse-tier), token upgrade flow in useRoomSession, relax read API routes to accept browse-tier.
**Avoids:** Pitfall 2 (unprotected endpoints) via explicit classification matrix and tier enforcement, Pitfall 9 (token conflicts) via single token with scopes.
**Addresses:** Must-have features — progressive authentication, paid action gating. Should-have — grace period after checkout (implemented via JWT expiry).
**Uses:** jose (JWT with custom claims), existing order API routes.
**Research flag:** Needs light research-phase for inline verification UX patterns (modal vs. bottom sheet, error handling, retry flow).

### Phase 3: Configurable Security Settings

**Rationale:** With both tiers working, give owners control over security posture. Different property types have different trust models (B&B owner knows every guest vs. 100-room hotel).
**Delivers:** Owner dashboard section for access settings. Three presets (B&B/Guesthouse/Hotel) with sensible defaults. Owner can adjust verification method (last name vs. PIN vs. room number).
**Implements:** `access_settings` JSONB column on accom_properties, property type defaults, backoffice settings page, resolve_room_access reads and returns settings, InlineVerification adapts to configured method, useRoomSession respects browse_requires_verification flag.
**Avoids:** Pitfall 5 (owner misconfiguration) via hardcoded safe defaults and outcome-based settings labels, Pitfall 4 (multi-guest rooms) via PIN verification option.
**Addresses:** Should-have differentiator — owner-configurable security (unique to GUDBRO).
**Research flag:** Needs research-phase for access control patterns (DAC vs. MAC, preset design, settings UX).

### Phase 4: Document Upload + Visa Tracking

**Rationale:** With authentication solid, add the compliance features. This builds on tier-2 (verified) auth — documents can only be uploaded by verified guests.
**Delivers:** Guest document upload (passport, visa) with photo capture, visa expiry tracking with 14/7/3 day alerts, backoffice document viewer for owners.
**Implements:** `accom_guest_documents` table + RLS + SECURITY DEFINER upload function, Supabase Storage private bucket with policies, document upload API route + UI component, visa expiry tracking logic (extends existing VisaStatusCard), backoffice document viewer, cron for expiring visa notifications, auto-delete cron (checkout + 30 days).
**Avoids:** Pitfall 8 (GDPR non-compliance) via private bucket, consent flow, retention policy, auto-delete.
**Addresses:** Must-have — document upload for passport/visa. Should-have — visa expiry tracking.
**Uses:** browser-image-compression (new), heic2any (new), Supabase Storage.
**Research flag:** Needs research-phase for camera capture UX (native input vs. getUserMedia), HEIC conversion testing on target devices, GDPR retention rules for Vietnam/EU.

### Phase 5: Multi-Zone WiFi

**Rationale:** With core access working, enhance WiFi display for multi-building properties. Low complexity, high practical value, safe to defer.
**Delivers:** Owner can configure multiple WiFi zones (lobby, pool, rooms), guests see all relevant networks with labels, per-room WiFi overrides for properties with room-specific networks.
**Implements:** `wifi_zones` JSONB on accom_properties, `wifi_ssid`/`wifi_password` on accom_rooms, WiFi resolution logic (room → zone primary → property fallback), updated WifiCard for multi-zone display (accordion or tabs), backoffice WiFi zone management UI.
**Avoids:** Pitfall 10 (QR scanning failures) via improved WiFi accessibility.
**Addresses:** Should-have differentiator — multi-zone WiFi (competitor gap).
**Research flag:** Standard patterns, skip research-phase. JSONB schema + UI work.

### Phase Ordering Rationale

**Dependencies-first:** Phase 1 (room codes) must precede Phase 2 (verification) because you cannot verify access to a room-based booking without room codes existing. Phase 2 must precede Phase 3 (security config) because you cannot configure authentication tiers until both tiers exist. Phase 4 (documents) depends on Phase 2 because uploads require tier-2 (verified) auth.

**Risk-first:** Stale QR reuse (Pitfall 1) is addressed in Phase 1, before any live data exists. Unprotected endpoints (Pitfall 2) addressed in Phase 2 via classification matrix. GDPR compliance (Pitfall 8) addressed in Phase 4 with retention policy baked into the upload feature from day one.

**Value-first:** Phase 1 delivers immediate guest value (WiFi access) with minimal complexity. Phase 2 completes the core flow. Phase 3 adds owner control (differentiator). Phase 4 adds compliance features (visa partnership revenue opportunity). Phase 5 is pure polish (WiFi UX enhancement).

**Integration points:** Each phase integrates with existing systems without breaking them. Phase 1 adds new routes alongside old ones. Phase 2 extends JWT payload backward-compatibly. Phase 3 adds JSONB column with safe defaults. Phase 4 uses existing Supabase Storage patterns. Phase 5 enhances existing WifiCard component.

### Research Flags

**Phases needing deeper research during planning:**

- **Phase 2 (Verification UX):** Inline auth patterns for PWAs, modal vs. bottom sheet performance on mobile, error state handling best practices. Medium complexity.
- **Phase 3 (Security presets):** Access control preset design, hospitality security standards, owner-facing settings UX (avoid technical jargon). Niche domain.
- **Phase 4 (Document upload):** Camera capture APIs (input file vs. getUserMedia vs. Capacitor), HEIC conversion reliability across devices, GDPR retention rules specific to Vietnam + EU tourists. High compliance risk.

**Phases with standard patterns (skip research-phase):**

- **Phase 1 (Room codes):** Supabase RPC functions, Next.js dynamic routes, JWT signing with jose — all well-documented, patterns exist in codebase.
- **Phase 5 (Multi-zone WiFi):** JSONB schema patterns, Radix UI accordion (or native details/summary), form state management — standard web patterns.

## Confidence Assessment

| Area         | Confidence  | Notes                                                                                                                                                                                                                                                                                                                                        |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH        | All existing packages verified in codebase, new packages verified on npm. Zero dependency on external services beyond what exists (Supabase, Vercel). jose JWT API stable across v6.x.                                                                                                                                                       |
| Features     | MEDIUM-HIGH | Table stakes features validated against 5 competitors (Duve, STAY App, Canary, HelloShift, mycloud). Progressive auth is extrapolated from e-commerce patterns — novel in hospitality but sound. Differentiators (security config, multi-zone WiFi) are original, not competitor-validated.                                                  |
| Architecture | HIGH        | Direct codebase analysis of all existing components. Two-tier JWT design verified against OWASP session management patterns. SECURITY DEFINER functions follow existing GUDBRO patterns (verify_booking_access). All integration points mapped.                                                                                              |
| Pitfalls     | HIGH        | Stale QR reuse verified against hospitality security research (Partsfe, Uniqode QR lifecycle). GDPR compliance verified against hotel-specific guidance (HotelTechReport Marriott case, Hotelogix retention schedules). Endpoint protection verified against OWASP Top 10 2025. Multi-guest rooms validated against Accommodations PRD v2.3. |

**Overall confidence:** HIGH

Architecture is sound, stack requires minimal changes, pitfalls are well-documented in industry. The main uncertainty is progressive auth adoption (novel pattern) — but it degrades gracefully (worst case: owners set browse_requires_verification=true and it behaves like the current system).

### Gaps to Address

**Phase 2 (Verification UX):** Inline verification best practices for PWAs are documented in e-commerce but not hospitality-specific. Recommendation: user-test with 5 target users (tourists unfamiliar with the property) during implementation. A/B test modal vs. bottom sheet if adoption is lower than projected 90%.

**Phase 3 (Security config):** Access control presets for different property types are original design, not validated against competitor features (no competitor offers this). Recommendation: interview 3-5 SEA property owners (representing B&B, hotel, hostel) to validate preset logic before building UI.

**Phase 4 (Document upload):** HEIC conversion reliability on Android (heic2any is primarily tested on iOS). Recommendation: test on 3 Android devices (Samsung, Xiaomi, Oppo — most common in SEA) before launch. Fallback: detect HEIC support, show "Please use JPEG mode on your camera" message if unsupported.

**Phase 4 (GDPR retention):** Vietnam-specific document retention requirements for NA17 police registration are not documented in English sources. Recommendation: consult with a Vietnam-based property owner or legal advisor to confirm 30-day retention is compliant vs. required retention period.

**Backward compatibility validation:** Existing JWTs have `{bookingId, propertyId, checkoutDate}`. New JWTs add `roomId?, accessTier`. Recommendation: write migration tests that issue old-format tokens and verify they are accepted by new API routes (accessTier defaults to 'full' if missing). Ensure no 401s on existing tokens.

## Sources

### Primary (HIGH confidence)

- Existing GUDBRO codebase (apps/accommodations/frontend/, shared/database/migrations/schema/077-087, apps/backoffice/components/AccomQRGenerator) — all architectural decisions verified via direct code reading
- apps/accommodations/PRD.md v2.3 — visa tracker requirements, QR strategy, product context
- npm package registries — jose v6.1.3, browser-image-compression v2.0.2, heic2any v0.0.4 versions verified
- OWASP Session Management Cheat Sheet — anonymous-to-authenticated transitions, session ID regeneration
- Supabase Storage documentation — private bucket patterns, RLS policies, signed URLs

### Secondary (MEDIUM confidence)

- Hotel Tech Report 2026 rankings — Duve #1 Hotel Guest App, Canary #1 Contactless Check-in, market size $4.8B
- Duve, STAY App, Canary, HelloShift, mycloud product documentation — QR access patterns, web-based no-download approach
- RoomRaccoon, Klippa, HelloShift product pages — document scanning and OCR patterns in hospitality
- HotelTechReport GDPR compliance articles — Marriott $52M settlement, retention requirements
- Uniqode, Partsfe security guides — QR lifecycle management, hospitality-specific QR security threats

### Tertiary (LOW confidence, needs validation)

- Progressive authentication pattern applied to hospitality — No direct hospitality source found. Pattern extrapolated from e-commerce (Amazon checkout) and mobile banking UX. Conceptually sound but novel in this domain.
- Configurable security levels per property type — No competitor offers this explicitly. Recommendation inferred from access control research (360Connect DAC/MAC patterns). Original feature design.
- Multi-zone WiFi as competitive gap — No industry source confirming this is a missing feature. Observation based on property walkthroughs (hotels have multiple networks) vs. competitor demo videos (show single network).

---

_Research completed: 2026-01-31_
_Ready for roadmap: yes_
