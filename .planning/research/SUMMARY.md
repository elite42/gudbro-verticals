# Project Research Summary

**Project:** Accommodations v1.5 Extended Milestone
**Domain:** Hospitality guest experience + property management (small SEA properties, 1-25 rooms)
**Researched:** 2026-02-01
**Overall Confidence:** HIGH

## Executive Summary

This is an **extension milestone** for an existing, working accommodations vertical. Phases 25-27 are complete (room codes, progressive auth, security config). Phases 28-29 are pending (document upload, multi-zone WiFi). This research covers 38 new features and 13 bug fixes from a comprehensive manual test session.

The research confirms a critical strategic finding: **no new npm packages are needed**. Every feature can be built with the existing stack (Next.js 14, Supabase, Stripe, Radix UI, Phosphor Icons) plus native browser APIs. This is not a greenfield project requiring technology selection—it's an incremental expansion of a mature codebase (~30k LOC, 15 migrations) with established patterns. The primary challenge is **integration complexity**, not technological uncertainty. Adding 38 features to a working system with active guest sessions requires surgical precision, not broad strokes.

The dominant risk is **mid-stay breakage**: deploying UI redesigns or state structure changes while guests are actively using the in-stay dashboard. The PWA has 15+ state variables managing tabs, cart, orders, and catalog overlays. A careless deployment can break the cart for active guests, which destroys the core revenue feature (service ordering). Prevention: additive redesign phases with preserved state contracts, deployment during low-traffic windows (Tuesday/Wednesday, not Friday/weekend), and explicit mid-deploy testing (load old version, deploy new version, reload tab—everything must still work).

## Key Findings

### Recommended Stack

**Zero new packages required.** All 38 features leverage existing dependencies verified in `apps/accommodations/frontend/package.json` and `apps/backoffice/package.json`. The only conditional addition is `@radix-ui/react-progress` for the accommodations frontend IF the onboarding wizard needs guest-facing progress UI—but the wizard is backoffice-only, so even this is unnecessary.

**Core technologies (already installed):**

- **Next.js 14.2.33** — All features (routing, API routes, middleware). Pattern established across 22 stay components and 10+ API routes.
- **Supabase** — Database (15 migrations, accom\_ prefix convention), Storage (guest-documents bucket exists, property-images bucket needed), Realtime (for minibar notifications via `.channel().on('postgres_changes')`).
- **date-fns + react-day-picker** — Gantt timeline date math and navigation. Custom CSS Grid layout with booking bars spanning columns, NOT a heavy Gantt library.
- **Phosphor Icons** — Star ratings (Star icon with fill/regular weights), all new UI. Preferred over Lucide per GUDBRO standards.
- **jose** — JWT auth for returning guest detection and voucher validation (already used for room session tokens).
- **Stripe** — Payment flows for early check-in/late checkout upsells.
- **qrcode** — WiFi QR generation (package installed, `generateWiFiString()` utility exists in backoffice, needs extraction to shared).
- **browser-image-compression + heic2any** — Image upload with HEIC conversion (iPhone photos). Pattern proven in document upload (Phase 28).
- **@radix-ui/react-dialog** — Modals for feedback forms, early check-in requests.
- **recharts (backoffice)** — Feedback analytics, occupancy charts, performance tracking.
- **web-push (backoffice)** — Minibar consumption notifications to owner.

**External APIs (HTTP, no npm packages):**

- **frankfurter.app** (free, no auth) — Currency conversion via ECB rates. Display-time conversion only, base prices stored in property currency. 1-hour cache TTL.

### Expected Features

**Must have (table stakes):**

- **Homepage redesign (card-based PWA)** — Current text-wall layout feels dated. Every competitor (Duve, STAY, DigitalGuest) uses visual card grids. Guests expect tappable navigation, not scrolling text. This is the "front door" for all other features.
- **Order detail view** — Owners manage orders but cannot see line-item breakdown. Standard in any order system. Without it, disputes are unresolvable. Guest receipts depend on this.
- **Service items "included in rate" flag** — Properties with included breakfast or transfers need to distinguish complimentary from purchasable. Without this, guests are confused about what they already paid for.
- **Room floor/level field** — Basic property data. Every PMS has this. Guests expect to know their floor (accessibility), owners need it for housekeeping routing.
- **Guest receipt confirmation** — 68% of travelers prefer mobile confirmations (Skift/Oracle). Digital record of what they ordered/consumed. Trust requirement.
- **Owner onboarding wizard** — 92% of hotels reduce onboarding time with guided setup (HotelTechReport). Non-technical SEA owners will abandon GUDBRO if setup feels overwhelming.

**Should have (differentiators):**

- **Minibar self-service** — No competitor in small-property space offers digital minibar tracking. Large hotel solutions (INTELITY, Bowo) cost 10-50x more. Guest marks consumed items via PWA, owner gets real-time notification. True differentiator for hostels/guesthouses.
- **Timeline/Gantt calendar** — #1 most-requested feature in small property PMS tools. All competitors have it (Cloudbeds, RoomRaccoon, Little Hotelier). Visual timeline with color-coded bookings. The "wow" feature for owner onboarding.
- **In-stay guest requests/complaints channel** — Flexkeeping, Xenia offer this for large hotels ($100k+). For small properties, nobody does it well. Structured alternative to WhatsApp chaos. Categories: maintenance, housekeeping, question, complaint.
- **Post-stay feedback with category ratings** — Built-in feedback (GuestRevu, Customer Alliance charge $100-500/month). Auto-triggered at checkout, star ratings per category (cleanliness, location, value, communication), happy guests redirected to Google/TripAdvisor.
- **Returning guest detection** — Revinate's badge system costs $10k+/year. For small properties, recognizing returning guests is deeply personal. "Welcome back!" badge, no points/tiers.
- **Voucher system** — DigitalGuest shows 3,856 redeems at single hotel. Breakfast vouchers (per date), welcome drink vouchers, partner discounts—all QR-redeemable.
- **Early check-in / late checkout request flow** — Revenue opportunity small properties leave on the table. Guest requests via PWA, owner approves based on availability, auto-charges fee.
- **Delivery app integration (Grab, ShopeeFood)** — No hospitality platform does this. In SEA, Grab has 50%+ food delivery market. Deep-link to delivery app with pre-filled property address. Zero API integration—just URLs. Unique GUDBRO differentiator for SEA market.
- **Order performance tracking** — No small-property tool tracks this. Order-to-delivery time metrics. Helps identify slow services, peak times, staff performance.

**Defer (v2+):**

- Full loyalty program with points/tiers (guests prefer recognition over points—Amadeus 2025)
- Built-in chat/messaging (WhatsApp is ubiquitous in SEA, don't compete)
- Complex voucher marketplace (gifting, multi-currency—small properties don't need this)
- AI-powered review response generation (small owners' authentic responses are their competitive advantage)
- Channel manager / OTA sync (separate product category—Cloudbeds, Smoobu own this)
- Housekeeping management system (Flexkeeping, ALICE domain—overkill for 1-10 room properties)
- Dynamic pricing engine (Beyond Pricing, PriceLabs are mature—let owners link externally)
- Minibar IoT/sensor integration (luxury hotel feature, unreliable in SEA, expensive hardware)

### Architecture Approach

This is **incremental expansion of a mature system**, not greenfield architecture. The accommodations vertical has 15 migrations (077-091), 22 PWA components, 11 backoffice pages, 11 API route groups, established patterns for two-tier auth (browse/full via JWT), SECURITY DEFINER functions for RLS, service role mediation for guest uploads, and JSONB for flexible configuration (dashboard_layout, onboarding_progress).

**Major components (mostly reuse, minimal new):**

1. **Gantt Calendar (backoffice)** — CSS Grid rooms-vs-dates layout. NOT a library. Reuses `/api/accommodations/calendar` endpoint and `CalendarDetailPanel` component. Colored cells (available/booked/blocked), click to open booking detail. 200 lines of custom code, zero bundle increase.

2. **Minibar System** — NOT a separate system. Reuses existing service ordering pipeline (accom_service_categories, accom_service_items, cart, orders). Add `automation_level: 'self_service'` flag. UI tweaks: "mark consumed" pattern instead of "add to cart," skip confirmation-wait state for self-service items. Owner confirmation step via existing order state machine (pending → confirmed).

3. **Guest Feedback** — New table (`accom_guest_feedback`) + forked AI pipeline from feedback-intelligence-service.ts. Different tag taxonomy (ACCOM_FEEDBACK_TAGS: cleanliness, check-in, wifi-quality, bed-comfort vs. F&B tags). Same OpenAI processing pattern (translate + classify + tag + sentiment). PWA: FeedbackForm component. Backoffice: TanStack Table page with aggregate scores.

4. **Convention/Voucher Adaptation** — Reuses existing convention system (migration 050, partner_conventions, convention_vouchers tables). Add `benefit_scope` column ('per_order' | 'per_night' | 'per_stay' | 'flat'). Booking flow integration: voucher code field, validate via existing `validate_voucher()` RPC, calculate discount based on scope + stay duration, record redemption.

5. **Property Image Upload** — New public bucket (property-images) vs. existing private bucket (guest-documents). New table (accom_property_images). Forks image-utils.ts with different settings (2MB max, 2560px width for higher quality property photos vs. 0.5MB, 2048px for guest docs). Backoffice component: PropertyImageManager with drag-and-drop.

6. **Homepage Redesign** — DashboardGrid wrapper component with configurable visibility (`accom_properties.dashboard_layout` JSONB). Wraps existing components (WifiCard, ServicesCarousel, ActiveOrders, CheckoutInfo). Fixed default order (WiFi first, checkout near bottom), optional owner show/hide toggles. No drag-and-drop for v1. Backward compatible: empty dashboard_layout = show all sections in current default order.

7. **WiFi QR Code** — Extract `generateWiFiString()` from backoffice QR Builder to shared util. PWA: Add `<QRCode>` component to existing WifiCard (qrcode.react ~3KB). Backoffice: "Download WiFi QR" button opens full QR Builder modal with material presets (tent card, sticker).

8. **Onboarding Wizard** — Wraps existing CRUD components (rooms, services, settings). Multi-step UI with progress tracking (`onboarding_progress` JSONB on accom_properties). Steps: Basic Info → Photos → Rooms → WiFi → Services → Contact → Completion. Each step links to or embeds existing management components—NOT duplicate CRUD. Detect existing config and skip wizard for already-configured properties.

**Key patterns to preserve:**

- Two-tier JWT auth (browse/full) via jose
- SECURITY DEFINER functions for RLS
- Service role mediation for guest uploads
- accom\_ table prefix
- JSONB for flexible config (not new tables for every setting)
- State contracts in InStayDashboard (activeTab, showCatalog, showCart—must survive redesign)

### Critical Pitfalls

1. **UI overhaul breaks active guest sessions** — Deploying PWA homepage/bottom nav redesign while guests are mid-stay destroys cart state, tab navigation, order polling. The InStayDashboard has 15+ state variables managing complex interactions. Prevention: additive redesign (new components alongside old behind feature flag → switch → remove old), preserve state contracts (BottomNav must accept same props), persist cart to sessionStorage (survives component tree restructure), deploy on low-traffic days (Tuesday/Wednesday, not Friday/weekend), test mid-deploy (load old, deploy new, reload tab—everything must work).

2. **Gantt calendar over-engineering for 1-25 rooms** — Installing heavy Gantt library (DHTMLX, Bryntum, 50-200KB+) for what should be a simple grid. Median GUDBRO customer has 3 rooms—a canvas-based Gantt chart is the wrong abstraction. Prevention: CSS Grid rooms-vs-dates layout, colored cells (available/booked/blocked), no drag-to-resize, no zoom levels. Existing AvailabilityCalendar pattern extended to show multiple rooms. Mobile-first (must work on 320px phone screen). Benchmark: existing calendar loads <1s, new grid must not regress.

3. **Minibar self-service without inventory reconciliation creates revenue leakage** — Honor system fails. Guest takes 3 beers but reports 1. Or doesn't report at all. Owner has no way to verify. Prevention: two-step process (guest self-reports → owner confirms during room check). Minibar orders go through existing service order state machine (pending → confirmed). Checkout summary includes unconfirmed items with disclaimer. Do NOT auto-charge—cash/transfer-based checkout needs owner verification.

4. **Guest feedback timing destroys response quality** — Feedback at checkout = stressed guest, rushed response, useless data. Feedback 7 days later = guest forgot details. Optimal: 2-24 hours after checkout (decompressed but still remembers). Prevention: Two feedback channels: (1) during-stay micro-feedback (happy/neutral/sad face widget, catches fixable issues NOW), (2) post-stay review (push notification 4-6 hours after checkout, 3 category ratings + optional text, <60 seconds to complete).

5. **Convention/voucher becomes unauditable discount machine** — Owner creates code for 20-person retreat, organizer shares on social media, 200 people use it. No cap, no tracking, no way to disable without affecting legitimate bookings. Prevention: Every voucher code has max total uses, per-guest limit (default 1), expiration date, property ID restriction, usage log. Discount stacking rules explicit (voucher + weekly discount = pick best one, do not stack). Owner dashboard shows usage report (code, uses, remaining, revenue impact). Validate percentage discounts <50% (catch typos).

**Additional moderate pitfalls:**

- Bottom nav overhaul confuses returning guests (muscle memory fails when tabs reorder)
- Onboarding wizard blocks existing configured owners (needs "skip for existing" detection)
- Early check-in / late checkout creates double-booking edge cases (needs conflict detection vs. adjacent bookings)
- Delivery app integration creates second unmanaged order channel (link-out approach, not parallel order system)
- Performance tracking dashboard built before enough data (charts with 2 data points mislead owners—show counters first, charts after 3 months)
- Returning guest detection false positives for common SEA names (Nguyen = 40% of Vietnamese population, multi-signal matching needed)
- Image upload without size/format validation slows PWA (5MB max, auto-resize to 1920px WebP ~200KB, lazy-load)

## Implications for Roadmap

Based on research, suggested phase structure for 38 features + 13 bug fixes:

### Phase 30: Bug Fixes + Image Foundation

**Rationale:** Fix identified bugs before adding features (prevent compounding regressions). Establish property image upload pattern needed by onboarding wizard (Phase 33) and booking page enhancements (Phase 37).
**Delivers:** 13 bug fixes from manual test, accom_property_images table, property-images storage bucket, PropertyImageManager backoffice component, image compression fork.
**Addresses:** Existing system stability, foundation for visual features.
**Avoids:** Pitfall #13 (bug fixes introducing regressions)—ship individually, typecheck after each, test adjacent features.

### Phase 31: Owner Dashboard Enhancements

**Rationale:** Owner tools that don't touch guest PWA. Can be tested independently. Timeline calendar is highest-value owner feature.
**Delivers:** Gantt calendar view (CSS Grid, not library), onboarding wizard (wraps existing CRUD), onboarding_progress JSONB, settings improvements.
**Addresses:** Feature #2 (timeline calendar—#1 most-requested), Feature #7 (onboarding wizard—table stakes).
**Avoids:** Pitfall #2 (Gantt over-engineering)—build colored room grid, not complex Gantt library. Pitfall #7 (wizard blocks existing owners)—detect existing config, skip wizard.
**Dependencies:** Phase 30 (photo upload for onboarding).

### Phase 32: Guest Dashboard Redesign

**Rationale:** Restructure dashboard BEFORE adding new cards (feedback, minibar). Foundation for all guest-facing features.
**Delivers:** DashboardGrid wrapper, dashboard_layout JSONB, WiFi QR code on WifiCard, card-based layout with show/hide config, homepage visual refresh.
**Addresses:** Feature #9 (homepage redesign—table stakes, all competitors have card-based UI).
**Avoids:** Pitfall #1 (breaks active sessions)—additive redesign, preserve state contracts, sessionStorage cart persistence, deploy Tuesday/Wednesday.
**Dependencies:** None (parallel with Phase 31).

### Phase 33: Service Expansion + Minibar

**Rationale:** Extends guest experience with new service types. Minibar is true differentiator.
**Delivers:** Minibar as service category (automation_level: 'self_service'), UI tweaks for minibar pattern (mark consumed, not add to cart), owner confirmation workflow.
**Addresses:** Feature #1 (minibar self-service—differentiator), Feature #11 (included in rate flag—table stakes).
**Avoids:** Pitfall #3 (minibar without reconciliation)—two-step process (guest reports → owner confirms).
**Dependencies:** Phase 32 (minibar card in dashboard grid).

### Phase 34: Guest Feedback System

**Rationale:** Post-stay feedback drives improvement and reviews. During-stay feedback catches fixable issues.
**Delivers:** accom_guest_feedback table, AI processing pipeline (forked from F&B feedback), FeedbackForm PWA component, FeedbackPrompt banner, backoffice feedback page with TanStack Table, aggregate scores.
**Addresses:** Feature #4 (post-stay feedback—differentiator).
**Avoids:** Pitfall #4 (bad feedback timing)—two channels (during-stay micro-feedback + post-stay review 4-6h after checkout).
**Dependencies:** Phase 32 (feedback card in dashboard grid).

### Phase 35: Guest Requests Channel

**Rationale:** Structured alternative to WhatsApp chaos. Simple, high-value feature.
**Delivers:** Request form with categories (maintenance, housekeeping, question, complaint), photo upload option, push notification to owner, request queue in backoffice with status tracking (new → in-progress → resolved).
**Addresses:** Feature #3 (in-stay requests—differentiator).
**Dependencies:** Phase 32 (request card in dashboard grid).

### Phase 36: Conventions + Vouchers

**Rationale:** Revenue features that depend on stable booking flow.
**Delivers:** benefit_scope column on partner_conventions, voucher validation in booking flow, discount calculation based on scope + nights, usage limits + expiration, redemption tracking.
**Addresses:** Feature #8 (voucher system—differentiator).
**Avoids:** Pitfall #5 (unauditable discount machine)—usage limits, expiration, stacking rules, audit report from day one.
**Dependencies:** Phase 30 (bug-free booking flow).

### Phase 37: Guest Lifecycle Features

**Rationale:** Features that drive repeat business and revenue optimization.
**Delivers:** Returning guest detection (multi-signal matching), early check-in / late checkout request flow (conflict detection vs. adjacent bookings, fee to folio), guest receipts (itemized charges, payment method).
**Addresses:** Feature #6 (returning guest—differentiator), Feature #5 (early/late checkout—revenue opportunity), Feature #15 (receipts—table stakes).
**Avoids:** Pitfall #8 (double-booking edge cases)—conflict detection query, time-aware approval. Pitfall #11 (false positives for SEA names)—multi-signal matching (email + phone + country).
**Dependencies:** Phase 30 (bug-free booking flow), Phase 33 (receipts need order detail view).

### Phase 38: Polish + Analytics

**Rationale:** Performance tracking, delivery integration, final UX refinements.
**Delivers:** Order performance tracking (order-to-delivery time), delivery app deep-links (Grab, ShopeeFood), room floor/level field, analytics improvements.
**Addresses:** Feature #14 (performance tracking—differentiator), Feature #10 (delivery integration—unique to GUDBRO in SEA), Feature #12 (floor/level—table stakes).
**Avoids:** Pitfall #10 (premature charts)—show counters first, charts after 3 months. Pitfall #9 (second unmanaged order channel)—link-out approach, not parallel order system.

### Phase Ordering Rationale

- **Bug fixes FIRST (Phase 30)** — Existing system must be stable before adding complexity. Individual deployments prevent regression stacking (Pitfall #13).
- **Foundation before features** — Property images (Phase 30) enable onboarding wizard (Phase 31). Dashboard redesign (Phase 32) provides home for all new guest features (Phases 33-35, 37).
- **Owner tools independent** — Phase 31 (Gantt, onboarding, settings) can be built/tested in parallel with Phase 32 (guest dashboard redesign).
- **Service expansion before feedback** — Minibar (Phase 33) and requests channel (Phase 35) must exist before feedback system (Phase 34) can ask about them.
- **Revenue features after stability** — Vouchers (Phase 36), early/late checkout (Phase 37) require bug-free booking flow from Phase 30.
- **Analytics last** — Performance tracking (Phase 38) needs 3 months of data after earlier phases ship (Pitfall #10).
- **Deployment timing critical** — UI redesigns (Phase 32) must deploy Tuesday/Wednesday during low occupancy (Pitfall #1).

### Research Flags

**Phases needing deeper research during planning:**

- **Phase 31 (Gantt calendar)** — Research CSS Grid timeline patterns, mobile horizontal scroll UX, color-coding conventions in PMS tools. HIGH priority—this is the most complex UI component.
- **Phase 32 (Dashboard redesign)** — Research state preservation across component tree restructures, sessionStorage cart patterns, React hydration with dynamic layouts. CRITICAL—mid-stay breakage is unacceptable.
- **Phase 34 (AI feedback pipeline)** — Research accommodations-specific tag taxonomy (verify ACCOM_FEEDBACK_TAGS against competitor feedback forms). MEDIUM priority—can adapt from F&B pipeline.

**Phases with standard patterns (minimal research needed):**

- **Phase 30 (Image upload)** — Pattern proven in document upload (Phase 28).
- **Phase 33 (Minibar)** — Reuses service ordering pipeline.
- **Phase 35 (Requests)** — Simple form + notification + state machine.
- **Phase 36 (Vouchers)** — Schema exists, needs UI + booking integration.
- **Phase 37 (Returning guest, early/late checkout)** — SQL queries + approval workflow.
- **Phase 38 (Performance tracking)** — Analytics on existing timestamp data.

## Confidence Assessment

| Area         | Confidence      | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | **HIGH**        | Zero new packages needed. All features use existing dependencies verified in package.json. Only conditional addition: @radix-ui/react-progress IF onboarding wizard needs guest-facing UI (unlikely—wizard is backoffice-only). External API (frankfurter.app) is free, well-known, ECB-backed.                                                                                                                                                                   |
| Features     | **MEDIUM-HIGH** | Patterns well-established in hospitality tech (Duve, STAY, DigitalGuest, Cloudbeds, Little Hotelier all have similar features). Some features are novel combinations for small properties (minibar self-service, delivery app integration). Research based on official competitor sites + HotelTechReport + industry publications. Table stakes vs. differentiators distinction is clear.                                                                         |
| Architecture | **HIGH**        | Based on direct codebase analysis (apps/accommodations/, apps/backoffice/, shared/database/migrations/). Existing patterns well-documented (~30k LOC, 15 migrations, 22 PWA components, 11 backoffice pages). Reuse opportunities identified (QR Builder, conventions, feedback pipeline). Anti-patterns explicit (separate minibar system, heavy Gantt library, direct storage upload). Integration points mapped (state management, API routes, DB migrations). |
| Pitfalls     | **HIGH**        | Grounded in actual GUDBRO codebase structure (InStayDashboard state variables, BottomNav hardcoded IDs, service order state machine, progressive auth). Hospitality industry patterns verified (minibar revenue leakage, feedback timing, returning guest detection). SEA-specific issues identified (common Vietnamese surnames, mobile network bandwidth, WhatsApp ubiquity). Phase-specific warnings actionable.                                               |

**Overall confidence:** **HIGH**

### Gaps to Address

**Gap: Gantt calendar mobile UX** — Research shows timeline calendars are standard in PMS tools, but most are desktop-first. For 5-25 rooms, horizontal scroll on mobile is necessary. Need to validate touch scroll performance and test with actual property owner on phone during Phase 31 planning. Mitigation: Build desktop view first, test scroll mechanics, add mobile optimizations (pinch-to-zoom date range, room grouping).

**Gap: Dashboard redesign deployment strategy** — Additive redesign with feature flag is the right approach, but the exact cutover mechanism needs definition. Options: (1) property-level flag (owner opts in), (2) time-based (deploy new version, redirect old routes), (3) A/B test (50/50 split). Need to decide during Phase 32 planning based on active guest count. Mitigation: Monitor active guest sessions pre-deploy, choose lowest-impact window, have rollback plan.

**Gap: Minibar owner confirmation workflow UX** — Two-step process (guest reports → owner confirms) is necessary, but the owner interaction needs design. Options: (1) notification with inline approve/adjust, (2) review queue in backoffice, (3) checkout summary with bulk confirm. Need to validate with owner persona ("Mario", 35-55, medium tech comfort) during Phase 33 planning. Mitigation: Start with simple review queue (reuse existing order management UI), iterate based on feedback.

**Gap: Feedback tag taxonomy validation** — ACCOM_FEEDBACK_TAGS list is inferred from competitor analysis and hospitality patterns. Needs validation with actual guest feedback from existing bookings (if available) or competitor feedback forms during Phase 34 planning. Mitigation: Start with conservative taxonomy (cleanliness, check-in, location, wifi, bed-comfort, bathroom), add tags based on actual feedback themes.

**Gap: Voucher discount stacking edge cases** — Research identified the need for explicit stacking rules (voucher + weekly/monthly discount = pick best one). But the pricing engine (`lib/price-utils.ts`) already calculates weekly/monthly discounts. Integration point needs detailed review during Phase 36 planning. Mitigation: Add voucher discount as a separate calculation step, compare with existing discounts, apply max discount, show breakdown in booking summary.

**Gap: Currency conversion cache strategy** — frankfurter.app recommended with 1-hour cache TTL. But cache invalidation on server restarts or multi-region deployments needs clarification. Options: (1) in-memory cache (simple, but lost on restart), (2) Redis cache (complex, requires infrastructure), (3) response header cache (CDN-level). Need to decide during Phase 37 planning based on traffic patterns. Mitigation: Start with in-memory cache + stale-while-revalidate, add Redis if cache misses cause performance issues.

## Sources

### Primary (HIGH confidence)

**Codebase analysis:**

- apps/accommodations/frontend/package.json — verified installed packages
- apps/backoffice/package.json — verified backoffice dependencies
- apps/accommodations/frontend/app/stay/[code]/page.tsx — InStayDashboard state structure (320 LOC, 15 state variables)
- apps/accommodations/frontend/components/BottomNav.tsx — current nav structure (5 items, hardcoded IDs)
- apps/backoffice/app/(dashboard)/accommodations/calendar/page.tsx — existing calendar with AvailabilityCalendar
- apps/backoffice/lib/qr/ — QR Builder (qr-types.ts 250 lines, qr-service.ts 382 lines)
- apps/backoffice/lib/ai/conventions-service.ts — B2B conventions (1137 lines)
- apps/backoffice/lib/ai/feedback-intelligence-service.ts — feedback AI pipeline
- shared/database/migrations/schema/050-b2b-conventions.sql — convention/voucher schema
- shared/database/migrations/schema/077-091 — 15 accommodations migrations
- apps/accommodations/frontend/lib/image-utils.ts — HEIC conversion, compression, blur detection
- apps/accommodations/PRD.md v2.3 — product requirements

**Technology documentation:**

- @svar-ui/react-gantt v2.4.4 npm page — evaluated, MIT license, rejected for this use case
- qrcode package docs — WiFi QR format spec (WIFI:T:;S:;P:;;)
- react-day-picker v9 docs — selection modes, range handling
- frankfurter.app API docs — free exchange rates, ECB data source
- Phosphor Icons docs — Star icon weights (fill, regular, duotone)

### Secondary (MEDIUM confidence)

**Hospitality industry sources:**

- INTELITY blog: PWA vs Mobile Apps in Hotels 2026 — PWA adoption trends
- HotelTechReport: Best Hotel Guest Apps 2026 — Duve #1, competitor analysis
- HotelTechReport: Best PMS 2026 — timeline calendar as standard feature
- Canary Technologies: Hospitality Trends 2026 — instant loyalty, digital vouchers, card-based UX
- LobbyPMS: Booking Calendar Importance — Gantt view rationale
- RoomRaccoon platform docs — early check-in/late checkout workflow
- STAY App product tour — card-based homepage reference
- Botshot ComplaintTrackr — in-stay request channel patterns
- Flexkeeping Guest Feedback Software — feedback timing research
- DigitalGuest Voucher Cases — 3,856 redeems case study
- Duve $60M Series B announcement — AI agent investment context
- Amadeus Hotel Guest Loyalty 2025 — 70% prefer experiences over points
- Revinate Loyalty Programs blog — invisible loyalty, badge system
- HotelTechReport Guest Feedback Software category — pricing ($100-500/month)
- DealStreetAsia: Southeast Asia food delivery market — Grab 50%+ share
- Little Hotelier check-in software — early arrival handling
- Roommaster Guest Engagement — post-stay feedback timing (2-24h optimal)
- Priority Software: Hotel Performance Metrics 2026 — KPIs for small properties

### Tertiary (LOW confidence, needs validation)

- AHLA estimate: minibar self-service without verification leads to 15-30% revenue leakage (industry estimate, not peer-reviewed)
- Cornell Hospitality Research: feedback timing 2-24h post-checkout yields highest quality (cited in multiple sources, original study not linked)
- Vietnamese surname distribution: Nguyen ~40% of population (Wikipedia-level source, validated against multiple demographics sources)
- Skift/Oracle: 68% of travelers prefer mobile confirmations (cited in industry blogs, original study behind paywall)

---

**Research completed:** 2026-02-01
**Ready for roadmap:** yes
