# GUDBRO Verticals

## What This Is

GUDBRO is a multi-vertical platform providing standalone PWAs for hospitality businesses (F&B, accommodations, gym, wellness, laundry, pharmacy, workshops, tours). Each merchant gets their own branded PWA with QR/link access. The platform includes a backoffice admin dashboard, AI Co-Manager, and a convention system linking merchants together. The Accommodations vertical is now a complete end-to-end product: public property pages with SEO, hybrid booking flow (instant or inquiry), multi-payment support (cash/transfer/Stripe/crypto), full owner dashboard (bookings, rooms, calendar, pricing, analytics, services, deals), service ordering from In-Stay Dashboard, and automated guest communication (confirmation + pre-arrival emails). All 8 verticals are QA-verified with automated E2E smoke tests, visual regression baselines, and PWA manifest validation.

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
- Feedback intelligence DB schema (fb_submissions, fb_tasks, fb_merchant_notifications + pg_trgm) -- v1.3
- AI pipeline: GPT-4o-mini single-call translate/classify/tag/deduplicate -- v1.3
- Merchant feedback form with screenshot upload and submission history -- v1.3
- In-app notification system with bell icon and 60s polling -- v1.3
- Admin kanban board with @dnd-kit drag-and-drop and task detail panel -- v1.3
- Analytics dashboard with Recharts (volume, breakdown, top features, response times) -- v1.3
- Public property page with SSR, SEO (OG meta, JSON-LD), photo gallery, availability calendar, price breakdown -- v1.4
- Hybrid booking flow: instant-confirm or inquiry (owner-configured), guest checkout without account -- v1.4
- Multi-payment: cash, bank transfer, Stripe Checkout with webhooks, crypto via @shared/payment -- v1.4
- Owner dashboard: booking management with status tabs, detail view, confirm/decline/check-in/out/cancel -- v1.4
- Owner dashboard: room CRUD, property settings, QR code generation -- v1.4
- Owner dashboard: availability calendar with color-coded dates, date blocking, seasonal pricing, discounts -- v1.4
- Service ordering: guest catalog + cart, order state machine, ASAP/time slot delivery -- v1.4
- Owner service management: catalog CRUD, automation levels, order management with status actions -- v1.4
- Analytics: occupancy rate, revenue by room/month, ADR trend, service revenue breakdown (Recharts) -- v1.4
- Local deals: CRUD with partner name/discount/description, referral click tracking -- v1.4
- Guest communication: booking confirmation email, pre-arrival email with QR (Vercel cron), WhatsApp deep-links -- v1.4
- Database: exclusion constraint double-booking prevention, 5 migrations (083-087), RLS on all new tables -- v1.4
- Cross-vertical deep-links from In-Stay Dashboard (F&B, tours, wellness) -- v1.4

### Active

## Current Milestone: v1.5 Frictionless Guest Access

**Goal:** Replace booking code + last name verification with room-based QR access, progressive authentication for paid actions, and owner-configurable security levels.

**Target features:**

- QR room-based access (scan → immediate dashboard, no login)
- Progressive authentication (free browsing, verify only for paid actions)
- Owner-configurable security levels (none/light/standard/full)
- Multi-zone WiFi support (room, restaurant, pool, lobby)
- Passport/visa document upload with expiry reminders
- QR lifecycle management (deactivation after checkout, regeneration)

### Out of Scope

- Visa Tracker -- deferred to later milestone
- Digital Laundry Form -- deferred to later milestone
- GUDBRO Network integration -- future
- Review system -- future
- Calendar sync (external calendars) -- future
- Offline/Service Worker testing -- Playwright PWA install limited
- Cross-browser parity testing -- Chromium-only sufficient for smoke tests
- Property page premium version (vetrina completa) -- future upsell option
- Channel manager (OTA sync) -- enterprise complexity, not needed for 1-5 property owners
- Built-in chat system -- WhatsApp dominates SEA
- Guest account system -- friction kills conversion; booking code is sufficient
- Stripe Connect marketplace -- commission splits manual for MVP
- Multi-property portfolio page -- most target owners have 1-2 properties
- Automated check-in (keyless entry) -- hardware integration, different domain

## Context

- 8 vertical PWAs, all QA-verified with automated E2E smoke tests (v1.2)
- Accommodations vertical is now complete end-to-end: property page, booking, payments, owner dashboard, service ordering, analytics, communication (v1.4)
- Coffeeshop is most mature (v1+v2 coexistence, production data)
- All new verticals share DM Sans body font and CSS variable theming
- 4 BottomNav patterns documented: Coffeeshop v2 (advanced), Tours (bento), Template (6 verticals), Accommodations (tab-based)
- @shared/payment workspace package established as pattern for shared modules
- Icons: mix of Phosphor (coffeeshop) and custom SVG (other verticals)
- Migration chain: 077-087 (11 migrations for accommodations)
- E2E test infrastructure: 8 smoke specs, 16 Playwright projects, vertical registry, shared fixtures
- Visual regression: 26 baseline PNGs, screenshot stabilization CSS, 3x zero-flaky validation
- PWA manifests for all 8 verticals
- 5 milestones shipped: v1.0 (QA), v1.1 (Backend), v1.2 (Tech Debt + Testing), v1.3 (Feedback Intelligence), v1.4 (Accommodations v2)
- Accommodations v1.4: 161 files, 29,211 LOC added, 7 phases, 20 plans, 86 commits in 1 day

## Constraints

- **Tech stack**: Next.js 14.2.33, Tailwind, Phosphor Icons preferred
- **Mock data**: All verticals except Accommodations use inline mock data, no DB connection yet
- **Port allocation**: Each vertical has assigned port (3003-3033)
- **Database conventions**: TEXT + CHECK (no ENUM), English column names, accom\_ namespace prefix

## Key Decisions

| Decision                           | Rationale                                                                       | Outcome    |
| ---------------------------------- | ------------------------------------------------------------------------------- | ---------- |
| PWA standalone (not hub)           | Not competing with Google/Yelp on discovery                                     | -- Pending |
| Accommodation as strategic node    | First tourist touchpoint, distributes to other verticals                        | Good       |
| Flat BottomNav pattern             | Uniform look across all verticals                                               | Good       |
| DM Sans as shared body font        | Consistency across verticals while allowing unique display fonts                | -- Pending |
| Type predicates for filtering      | TypeScript trusts them for narrowing, unlike type assertions                    | Good       |
| CSS variables for brand colors     | Enables consistent theming and easy customization                               | Good       |
| Complete vertical separation       | Each PWA is standalone, zero cross-vertical contamination                       | Good       |
| @shared/payment workspace pkg      | Proper module resolution for shared TypeScript modules                          | Good       |
| Selective tsconfig includes        | Prevent type pollution from unused shared modules                               | Good       |
| SECURITY DEFINER for guest access  | Safer than RLS on bookings; function-based access control                       | Good       |
| BK-XXXXXX booking codes            | Excluding 0/O/1/I/L for readability                                             | Good       |
| INTEGER price (minor currency)     | Avoids floating point issues with money                                         | Good       |
| accom\_ table prefix               | Clear namespace separation for accommodations domain                            | Good       |
| JWT with checkout+24h expiry       | Guest tokens auto-expire shortly after checkout                                 | Good       |
| Slug-based F&B deep-linking        | Decouples accommodations from coffeeshop schema                                 | Good       |
| Dashboard shell pattern            | 128-line shell composing 11 sections; easy to extend                            | Good       |
| Opacity modifiers for light tint   | bg-accent/10 keeps variable count manageable                                    | Good       |
| Vertical registry as SSOT          | Single Record for all 8 verticals' config in test infra                         | Good       |
| BasePwaPage page object            | Reusable 5-method smoke check class with benign error allowlist                 | Good       |
| testIgnore on legacy PW projects   | Prevents legacy projects from picking up vertical smoke tests                   | Good       |
| Graceful no-nav for accommodations | Home page (booking) has no BottomNav; skip test gracefully                      | Good       |
| Screenshot stabilization CSS       | Disables animations/transitions for deterministic baselines                     | Good       |
| Exclusion constraint (btree_gist)  | Database-level double booking prevention; no race conditions                    | Good       |
| Hybrid booking mode                | Owner chooses instant-confirm or inquiry; flexible for different property types | Good       |
| Stripe MCC 7011                    | Extended authorization for accommodation deposits                               | -- Pending |
| Fire-and-forget email              | Non-blocking booking creation; email failure doesn't block booking              | Good       |
| Recharts for analytics             | Lightweight, React-native, good for dashboard charts                            | Good       |
| Vercel cron for pre-arrival emails | Daily cron checks tomorrow's check-ins; no external scheduler needed            | Good       |
| Order state machine                | Explicit state transitions prevent invalid order status changes                 | Good       |
| Automation levels per service      | Owner controls auto-confirm vs manual vs WhatsApp per category                  | Good       |

---

_Last updated: 2026-01-31 after v1.5 milestone start_
