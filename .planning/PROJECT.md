# GUDBRO Verticals

## What This Is

GUDBRO is a multi-vertical platform providing standalone PWAs for hospitality businesses (F&B, accommodations, gym, wellness, laundry, pharmacy, workshops, tours). Each merchant gets their own branded PWA with QR/link access. The platform includes a backoffice admin dashboard, AI Co-Manager, and a convention system linking merchants together. The Accommodations vertical has a fully functional In-Stay Dashboard connected to Supabase. All 8 verticals are QA-verified with automated E2E smoke tests, visual regression baselines, and PWA manifest validation.

## Core Value

Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.

## Requirements

### Validated

- PWA frontends created for 8 verticals (coffeeshop, accommodations, tours, gym, wellness, laundry, pharmacy, workshops)
- BottomNav pattern unified (flat center, no elevated buttons)
- Design systems defined per vertical (unique colors, fonts, identity)
- Multi-vertical strategy documented (PWA standalone, not hub)
- Backoffice with 52 pages, ~17,700 LOC
- AI Co-Manager with 15 services
- 2,418 tests passing (2,383 unit + 35 E2E)
- Scaling infrastructure Phase 1-3 complete
- Security hardening Phase 1 complete
- All vertical PWAs compile without TypeScript errors -- v1.0
- BottomNav brand colors unified via CSS variables across all 8 verticals -- v1.0
- Complete vertical separation (no cross-vertical routes) -- v1.0
- All 7 new vertical PWAs build successfully (next build) -- v1.0
- All navigation links validated (zero broken links) -- v1.0
- Accommodations database schema: properties, rooms, bookings, services, partnerships with RLS -- v1.1
- 6 JWT-protected API routes for In-Stay data (lookup, verify, services, deals, property, useful-numbers) -- v1.1
- In-Stay Dashboard with booking verification, WiFi card, stay summary, services, deals, contact, checkout -- v1.1
- F&B cross-vertical deep-linking (has_linked_fnb + linked_fnb_slug pattern) -- v1.1
- Schema-API alignment with migration 081 (9 renames, 7 new columns, house_rules JSONB) -- v1.1
- Tours compiles without TypeScript errors (soups exclusion removed) -- v1.2
- Tours brand colors migrated to CSS variable-backed Tailwind tokens -- v1.2
- Wellness /staff/[slug] explicit back link -- v1.2
- Zero ESLint warnings in Wellness -- v1.2
- Zero placeholder links in Tours/Workshops -- v1.2
- Playwright E2E infrastructure: vertical registry, BasePwaPage, 16 per-vertical projects -- v1.2
- Page load + BottomNav navigation + responsive viewport smoke tests for all 8 verticals -- v1.2
- Visual regression baselines (26 PNGs) for all 8 verticals -- v1.2
- PWA manifest validation for all 8 verticals -- v1.2
- Physical device QA checklist (78 items) -- v1.2

### Active

**Current Milestone: v1.3 — Merchant Feedback Intelligence**

**Goal:** Enable merchants to submit feedback, report bugs, and request features directly from the backoffice, with AI-powered translation, classification, and aggregation of similar requests into an internal kanban for the GUDBRO team.

**Target features:**

- Merchant feedback submission (text + screenshot + type + auto-context) in Settings
- AI processing layer (OpenAI): translate, classify, structure, detect duplicates
- Aggregation of similar requests across merchants/languages into unified tasks
- Internal kanban board for GUDBRO team (admin role) to manage aggregated requests
- In-app notifications (campanella) for merchants when requests are received/completed
- Action workflow: accept → develop → complete → notify, or reject with reasoning

### Out of Scope

- Booking Mode (property page, booking flow) -- deferred to future milestone
- Owner Dashboard (property management UI) -- deferred to future milestone
- Service Ordering (guest submits requests) -- deferred to future milestone
- Visa Tracker -- deferred to later milestone
- Digital Laundry Form -- deferred to later milestone
- Online payments -- cash/transfer only for MVP
- GUDBRO Network integration -- future
- Review system -- future
- Calendar sync -- future
- Offline/Service Worker testing -- Playwright PWA install limited
- Cross-browser parity testing -- Chromium-only sufficient for smoke tests

## Context

- 8 vertical PWAs, all QA-verified with automated E2E smoke tests (v1.2)
- Accommodations vertical has real backend: 6 DB tables, 6 API routes, JWT auth, In-Stay Dashboard (v1.1)
- Coffeeshop is most mature (v1+v2 coexistence, production data)
- All new verticals share DM Sans body font and CSS variable theming
- 4 BottomNav patterns documented: Coffeeshop v2 (advanced), Tours (bento), Template (6 verticals), Accommodations (tab-based)
- @shared/payment workspace package established as pattern for shared modules
- Icons: mix of Phosphor (coffeeshop) and custom SVG (other verticals)
- Migration chain: 077 (schema) → 078 (seed) → 079 (phase6 ext) → 080 (fnb) → 081 (alignment)
- E2E test infrastructure: 8 smoke specs, 16 Playwright projects, vertical registry, shared fixtures
- Visual regression: 26 baseline PNGs, screenshot stabilization CSS, 3x zero-flaky validation
- PWA manifests for all 8 verticals (6 created in v1.2, coffeeshop + gym pre-existing)
- 3 milestones shipped: v1.0 (QA), v1.1 (Backend), v1.2 (Tech Debt + Testing)

## Constraints

- **Tech stack**: Next.js 14.2.33, Tailwind, Phosphor Icons preferred
- **Mock data**: All verticals except Accommodations use inline mock data, no DB connection yet
- **Port allocation**: Each vertical has assigned port (3003-3033)
- **Database conventions**: TEXT + CHECK (no ENUM), English column names, accom\_ namespace prefix

## Key Decisions

| Decision                           | Rationale                                                        | Outcome    |
| ---------------------------------- | ---------------------------------------------------------------- | ---------- |
| PWA standalone (not hub)           | Not competing with Google/Yelp on discovery                      | -- Pending |
| Accommodation as strategic node    | First tourist touchpoint, distributes to other verticals         | Good       |
| Flat BottomNav pattern             | Uniform look across all verticals                                | Good       |
| DM Sans as shared body font        | Consistency across verticals while allowing unique display fonts | -- Pending |
| Type predicates for filtering      | TypeScript trusts them for narrowing, unlike type assertions     | Good       |
| CSS variables for brand colors     | Enables consistent theming and easy customization                | Good       |
| Complete vertical separation       | Each PWA is standalone, zero cross-vertical contamination        | Good       |
| @shared/payment workspace pkg      | Proper module resolution for shared TypeScript modules           | Good       |
| Selective tsconfig includes        | Prevent type pollution from unused shared modules                | Good       |
| SECURITY DEFINER for guest access  | Safer than RLS on bookings; function-based access control        | Good       |
| BK-XXXXXX booking codes            | Excluding 0/O/1/I/L for readability                              | Good       |
| INTEGER price (minor currency)     | Avoids floating point issues with money                          | Good       |
| accom\_ table prefix               | Clear namespace separation for accommodations domain             | Good       |
| JWT with checkout+24h expiry       | Guest tokens auto-expire shortly after checkout                  | Good       |
| Slug-based F&B deep-linking        | Decouples accommodations from coffeeshop schema                  | Good       |
| Dashboard shell pattern            | 128-line shell composing 11 sections; easy to extend             | Good       |
| Opacity modifiers for light tint   | bg-accent/10 keeps variable count manageable                     | Good       |
| Vertical registry as SSOT          | Single Record for all 8 verticals' config in test infra          | Good       |
| BasePwaPage page object            | Reusable 5-method smoke check class with benign error allowlist  | Good       |
| testIgnore on legacy PW projects   | Prevents legacy projects from picking up vertical smoke tests    | Good       |
| Graceful no-nav for accommodations | Home page (booking) has no BottomNav; skip test gracefully       | Good       |
| Screenshot stabilization CSS       | Disables animations/transitions for deterministic baselines      | Good       |

---

_Last updated: 2026-01-30 after v1.3 milestone start_
