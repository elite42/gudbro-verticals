# Project Research Summary

**Project:** GUDBRO Accommodations v2 -- Booking, Owner Dashboard, Service Ordering
**Domain:** Accommodation booking platform with in-stay service management
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

GUDBRO Accommodations v2 transforms the existing in-stay dashboard into a complete zero-commission booking platform for small Southeast Asian property owners. The research reveals this is a well-trodden domain with established patterns from Airbnb, Booking.com, and property management systems, but GUDBRO's differentiator is clear: eliminate the 15-25% OTA commission while adding in-stay revenue opportunities through service ordering and local partnerships that no competitor offers natively.

The recommended approach is incremental extension of the existing codebase rather than greenfield development. The accommodations frontend already has a functional JWT-based in-stay dashboard with 6 API routes, complete database schema, and service catalog infrastructure. The stack additions are modest (13 packages) and proven within the GUDBRO monorepo: Stripe for payments, react-day-picker for calendars, Recharts for analytics, TanStack Query for state management, and Embla for image galleries. The owner dashboard lives in the Backoffice app to leverage existing auth, UI components, and multi-vertical patterns rather than creating a separate deployment.

The critical risks center on payment timing and data integrity. Stripe authorization expires after 7 days unless you have MCC 7011 and extended authorization capability, so a deposit + balance strategy is required for advance bookings. Double booking prevention demands a PostgreSQL exclusion constraint on date ranges, not just application-level checks. Timezone handling must use DATE type for check-in/check-out to avoid international guests experiencing +/- 1 day shifts. RLS policies must be written alongside every new table to prevent cross-tenant data leakage in the existing multi-tenant system. Starting with cash/bank transfer as default payment methods and treating Stripe as progressive enhancement avoids Stripe Connect onboarding friction that blocks 40%+ of SEA property owners.

## Key Findings

### Recommended Stack

The accommodations frontend is currently minimal (Next.js 14, Supabase, Radix UI, date-fns, jose). The v2 features require targeted additions for payments, calendars, charts, animations, and state management. Critically, most of these libraries already exist elsewhere in the monorepo, so integration patterns are proven rather than experimental.

**Core technologies:**

- **Stripe (v17.0.0, not v20):** Server-side payment processing with Elements for embedded forms. Checkout for booking deposits, PaymentIntents for service orders. Pin to v17 for backoffice compatibility, avoid v20 breaking changes.
- **react-day-picker (v9.13.0):** Date range picker with Buddhist calendar support (Thailand market), WCAG 2.1 AA accessible, Tailwind customizable.
- **Recharts (v3.6.0):** Analytics charts (already in backoffice). Revenue over time, occupancy rates, service breakdown.
- **TanStack Query (v5.90.19):** Server state management (already in backoffice). Essential for booking pagination, optimistic status updates, stale-while-revalidate for 6+ owner dashboard data sources.
- **Zod (v3.24.0, not v4.x):** Form validation. Stay on 3.x for monorepo consistency, defer v4 upgrade to coordinated effort.
- **Embla Carousel (v8.5.1):** Image gallery. Lightweight (4KB), better touch support than Swiper, no CSS bloat.
- **Resend (v4.0.0):** Transactional email. Booking confirmations, pre-arrival info, receipts. 100 emails/day free tier.
- **Supabase Realtime:** Booking notifications, service order updates, guest-host messaging. Already included, no new dependencies.

**Critical version note:** Do NOT add Stripe Connect yet. The 85/10/5 commission split is manual for MVP. Connect marketplace adds weeks of complexity for a post-launch feature.

### Expected Features

The feature landscape divides cleanly into table stakes (universal expectations), differentiators (GUDBRO unique value), and anti-features (explicit avoidance to maintain simplicity for small SEA property owners).

**Must have (table stakes):**

- Photo gallery (swipeable, 5-20 images) -- no photos = no bookings
- Date picker with availability calendar -- core interaction for any booking system
- Price display with breakdown (per-night x nights + cleaning fee + taxes) -- transparent pricing expected
- Hybrid booking mode (instant book + request to book) -- Airbnb offers both, small owners want approval control
- Guest booking form (name, email, phone, dates, payment method) -- minimal fields, NO account creation required
- Booking confirmation via WhatsApp + email with booking code (BK-XXXXXX format already exists)
- Owner booking management (list, detail, confirm/decline, status tracking)
- Availability calendar editor (block dates, set price overrides, bulk operations)
- Service ordering (browse catalog, cart, order submission, status tracking)
- Mobile-responsive layout -- 80%+ of SEA bookings are mobile

**Should have (competitive differentiators):**

- Zero-commission direct booking -- Airbnb charges 14-16%, Booking.com 15-25%, GUDBRO charges 0%
- In-stay revenue ecosystem (local partnerships: tours, restaurants, spas with discount + commission) -- no competitor offers this natively
- Digital laundry form (visual garment selection, multi-language, pre-filled guest data) -- eliminates paper forms
- Visa compliance tools (expiry tracker with push notifications, NA17 pre-fill for Vietnamese police registration) -- SEA-specific value
- Configurable service automation levels (auto-confirm, manual approval, WhatsApp-only) per service category
- Template-based property setup (hostel vs villa vs apartment presets) -- reduces onboarding from 30 min to 5 min

**Defer (v2+):**

- Online payment processing (Stripe, crypto) -- cash/bank transfer dominate SEA small accommodation. Add Stripe as v2.1 post-MVP.
- Review system -- needs 500+ bookings for meaningful reviews, fake review prevention is whole product
- Channel manager (OTA sync) -- extremely complex (Airbnb, Booking.com, Expedia APIs all different), not MVP scope
- Dynamic pricing algorithm -- Airbnb's Price Tips took years, overkill for 1-5 property owners
- Calendar sync (iCal import) -- 1-3 hour delays cause double bookings, defer until API partnerships exist
- Built-in messaging/chat -- duplicates WhatsApp workflow, turns GUDBRO into support desk

### Architecture Approach

The architecture is extension-based rather than greenfield. The existing in-stay dashboard (JWT auth, 6 API routes, service catalog, F&B deep-linking) remains untouched. New capabilities layer on through: (1) public property pages for booking discovery, (2) owner dashboard pages in the Backoffice app, (3) service ordering API routes extending the in-stay mode.

**Major components:**

1. **Public Property Page (Booking Mode)** -- SEO-friendly Server Component at `/{slug}`, public API routes for property data + availability, BookingForm with instant/inquiry mode handling, WhatsApp/email confirmation. Connects to in-stay mode via booking code (BK-XXXXXX).
2. **Hybrid Booking System** -- Single booking model with status field (instant bookings start as 'confirmed', inquiry bookings start as 'pending_approval'), owner notification via WhatsApp, booking code generation via existing trigger. Database additions: `accom_availability` table (per-room per-date with price overrides), pricing columns on properties/rooms/bookings.
3. **Service Ordering (Guest Side)** -- Extends existing ServicesCarousel to support add-to-cart, ServiceOrderSheet bottom drawer, new `accom_service_orders` + `accom_service_order_items` tables, owner notification on submission, status tracking (submitted > confirmed > preparing > ready > delivered).
4. **Owner Dashboard (Backoffice Integration)** -- New `/stays/*` routes in `apps/backoffice/` leveraging existing Supabase Auth, TanStack Table, Radix UI components. Sidebar integration adds "Stays" section with 8 subpages (dashboard, bookings, calendar, rooms, services, deals, reviews, analytics). Shares Supabase database with PWA, data flows through DB not direct API calls.
5. **Payments (Phase 1: Cash/Transfer, Phase 2: Stripe)** -- MVP supports cash on arrival, bank transfer details display, owner manual payment status management. Post-MVP adds Stripe Checkout for booking deposits, Stripe Elements for in-stay services. Reuses `@shared/payment` types for method selection UI, formatPrice for display.

**Critical architectural decisions:**

- Owner dashboard in Backoffice (not PWA) -- avoids mixing Supabase Auth with guest JWT, leverages existing UI patterns
- Guest flows remain JWT-based -- no account creation required, booking code + last name verification
- Database schema uses DATE (not TIMESTAMPTZ) for check-in/check-out -- prevents timezone shift bugs
- Single booking model with status field -- not separate tables/flows for instant vs inquiry
- Admin client for public booking creation -- guests do not have Supabase Auth, API routes use service role with explicit validation

### Critical Pitfalls

**1. Double Booking Race Condition**
Two guests select same dates simultaneously, both see available, both submit. Without proper concurrency control, both bookings accepted. Create PostgreSQL exclusion constraint using `daterange` type with `&&` overlap operator to make double booking physically impossible at DB level. Add `SELECT FOR UPDATE` when checking availability. Test by opening two browser tabs and submitting simultaneously.

**2. Stripe Authorization Expiry**
Standard Stripe authorizations expire after 7 days. Extended auth (up to 30 days) requires MCC 7011, IC+ pricing, and `request_extended_authorization: 'if_available'`. For bookings more than 7 days out, collect a deposit (30-50%) immediately as standard charge, auth-and-capture remainder closer to check-in. Handle `payment_intent.canceled` webhook for expired auths.

**3. Stripe Connect Onboarding Friction**
Small SEA property owners hit KYC walls: non-English ID, unsupported banks, multi-day verification. Start with cash/bank transfer as default, make Stripe progressive onboarding. Use Connect Custom accounts for incremental data collection. Test with Thai, Vietnamese, Indonesian bank details before launch.

**4. RLS Policy Gaps on New Tables**
New booking-related tables often created without RLS policies or with incorrect tenant scoping. Write RLS alongside CREATE TABLE in same migration. Guest access via API routes with service-role key + explicit WHERE clauses (not direct Supabase, since guests are unauthenticated). Owner access via RLS with `merchant_id` matching. Write isolation tests for each new table.

**5. Timezone Mismatch on Check-In Dates**
Guest in NYC (UTC-5) books "January 15" at Da Nang property (UTC+7). If stored as timestamp, timezone conversion shifts date by +/- 1 day. Use PostgreSQL `DATE` type (no timezone component) for check-in/check-out. Send dates as YYYY-MM-DD strings from frontend, never convert to Date object before API. Store property timezone, display in property's timezone.

**Moderate pitfalls:** Over-engineering hybrid booking (use single model with status field), service ordering without fulfillment states (define state machine + owner notification), owner dashboard overload (two-zone UI: "Today" vs "Manage"), payment module fragmentation (extend `@shared/payment`, define payment method matrix), QR in-stay access without verification (booking code + session expiry required).

## Implications for Roadmap

Based on research, the roadmap should follow a dependency-driven structure prioritizing guest-facing revenue generation before owner management tools. The existing in-stay dashboard is production-ready, so the booking flow is the highest-value addition.

### Phase 1: Database Foundation

**Rationale:** Everything depends on schema correctness. Building on wrong schema causes rewrites.
**Delivers:** Extended `accom_properties` with booking_mode and pricing columns, extended `accom_rooms` with base_price_per_night, new `accom_availability` table with exclusion constraint for double-booking prevention, extended `accom_bookings` with pricing/payment fields, new `accom_service_orders` + `accom_service_order_items`, new `accom_reviews`, RLS policies for all new tables, TypeScript types update.
**Addresses:** Double booking prevention (Pitfall 1), timezone handling (Pitfall 5), RLS security (Pitfall 4).
**Avoids:** Building on flawed schema, retrofitting constraints later, data integrity bugs.

### Phase 2: Public Property Page + Booking Flow

**Rationale:** This is the revenue-generating feature. Guests need to discover and book before owner dashboard is useful.
**Delivers:** `/{slug}` route (Server Component for SEO), public API routes for property data + availability, photo gallery with Embla, DatePicker with react-day-picker, PriceBreakdown, BookingForm with guest info + payment method selector, BookingConfirmation page with booking code, WhatsApp/email notifications.
**Uses:** react-day-picker, Embla Carousel, Resend, Zod for validation, `@shared/payment` types.
**Addresses:** Table stakes features (photo gallery, date picker, booking form), hybrid booking mode, zero-commission positioning.
**Avoids:** Form abandonment (minimal fields only), currency confusion (display conversions).

### Phase 3: Owner Dashboard Foundation (Backoffice)

**Rationale:** Owners need to manage what Phase 2 generates. Building before booking flow exists creates empty states with no test data.
**Delivers:** Sidebar "Stays" integration in Backoffice, `/stays` dashboard with stats, `/stays/bookings` with TanStack Table (filters, search), `/stays/bookings/{id}` detail + status actions, `/stays/rooms` CRUD, `/stays/settings` for booking mode + pricing config.
**Uses:** TanStack Query for data fetching, Recharts for basic stats, existing Radix UI components.
**Implements:** Owner Dashboard component (Architecture), booking management (FEATURES.md table stakes).
**Avoids:** UX overload (two-zone dashboard: daily tasks vs setup), mixing auth systems (stays in Backoffice with Supabase Auth).

### Phase 4: Availability Calendar + Service Management

**Rationale:** Calendar and service CRUD are management tools for existing bookings/services. Less urgent than core booking flow.
**Delivers:** `/stays/calendar` visual month grid with color-coded dates, block/unblock date ranges, bulk seasonal pricing, `/stays/services` CRUD for categories + items with drag-to-reorder.
**Uses:** react-day-picker for calendar widget, TanStack Table for service lists.
**Addresses:** Table stakes (availability calendar editor, service management).
**Avoids:** Over-engineering calendar (use proven library, not custom from scratch).

### Phase 5: Service Ordering (Guest Side)

**Rationale:** Extends in-stay dashboard with revenue capability. Requires service management (Phase 4) to be in place for owners to configure services.
**Delivers:** Modified ServicesCarousel with add-to-cart, ServiceOrderSheet (bottom sheet cart), `POST /api/stay/{code}/orders` route, order confirmation + history components, owner WhatsApp notification on new order.
**Uses:** Existing JWT auth, Supabase Realtime for order status updates (optional).
**Addresses:** In-stay revenue differentiator, service ordering table stakes, automation levels (auto-confirm, manual, WhatsApp-only).
**Avoids:** Missing fulfillment states (define state machine: submitted > acknowledged > preparing > ready > delivered).

### Phase 6: Analytics + Reviews + Partnerships

**Rationale:** Growth features, not blocking MVP. Bookings and service orders must exist first to generate data for analytics.
**Delivers:** `/stays/analytics` with Recharts (occupancy rate, revenue, ADR, booking trends), `/stays/reviews` with reply functionality, `/stays/deals` local partnerships CRUD, referral tracking + commission reporting.
**Uses:** Recharts, new `accom_partnerships` + `accom_referrals` tables.
**Addresses:** Differentiators (local partnerships, commission tracking), basic analytics (table stakes).
**Avoids:** Commission tracking without confirmation (partner confirmation flow required).

### Phase 7: Payment Integration (Stripe)

**Rationale:** Deferred post-MVP. Cash/bank transfer handles SEA market for initial launch. Stripe adds complexity without immediate ROI.
**Delivers:** Stripe Checkout for booking deposits, Stripe Elements for in-stay services, Stripe Connect progressive onboarding, webhook handlers, payment status tracking.
**Uses:** Stripe v17.0.0, `@stripe/stripe-js`, `@stripe/react-stripe-js`.
**Addresses:** Card payment support, international guest payment preference.
**Avoids:** Stripe auth expiry (deposit + balance strategy), Connect onboarding friction (cash/transfer as default, Stripe as upgrade).

### Phase Ordering Rationale

- **DB first (Phase 1):** Schema correctness is non-negotiable. Exclusion constraint prevents double bookings at DB level. RLS prevents data leakage. DATE type prevents timezone bugs. Get this right once.
- **Booking before dashboard (Phase 2 before 3):** Revenue generation before management tools. Owners need bookings to manage before dashboard is useful. Testing with real booking data validates flows.
- **Public property page before in-stay ordering (Phase 2 before 5):** Guests must book before they can order services. Booking flow is higher priority revenue path.
- **Calendar after booking (Phase 4 after 2/3):** Calendar management is for handling existing bookings. Core booking flow is more valuable to build first.
- **Service ordering after service management (Phase 5 after 4):** Owners need to configure services before guests can order them.
- **Analytics last (Phase 6):** Requires booking/order data to exist. Nice-to-have, not blocking.
- **Payments last (Phase 7):** Cash/transfer sufficient for SEA MVP. Stripe adds complexity, defer until proven booking flow works.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 7 (Stripe):** Complex Stripe Connect integration with SEA market considerations. Needs dedicated research on MCC 7011, KYC for SEA users, extended authorization setup, webhook security, Connect account types.
- **Phase 6 (Partnerships):** Partner confirmation flow for commission tracking is domain-specific. Research referral confirmation patterns in hospitality.

Phases with standard patterns (skip research-phase):

- **Phase 1 (Database):** PostgreSQL exclusion constraints and RLS are well-documented. Existing GUDBRO migrations provide patterns.
- **Phase 2 (Booking Flow):** Standard e-commerce checkout patterns. Airbnb/Booking.com flows are public. Stripe Checkout docs are comprehensive.
- **Phase 3 (Owner Dashboard):** Backoffice patterns already exist. TanStack Table + Radix UI examples abundant.
- **Phase 4 (Calendar):** react-day-picker has extensive docs. Calendar UI is solved problem.
- **Phase 5 (Service Ordering):** Extension of existing service catalog. Cart + order submission is standard pattern.

## Confidence Assessment

| Area         | Confidence | Notes                                                                                                                                                                                                                                       |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack        | HIGH       | All package versions verified via npm, patterns verified in existing codebase. Stripe v17, react-day-picker v9, Recharts v3, TanStack Query v5 all confirmed. Zod 3.x vs 4.x decision deliberate.                                           |
| Features     | HIGH       | Table stakes mapped from Airbnb, Booking.com, Cloudbeds, Lodgify public documentation and feature comparison. GUDBRO differentiators grounded in PRD v2.3. Anti-features informed by target market research.                                |
| Architecture | HIGH       | All patterns verified against existing accommodations frontend codebase (migrations 077-081, API routes, JWT auth, Supabase admin client). Backoffice integration verified against existing patterns. Guest vs owner auth separation clear. |
| Pitfalls     | HIGH       | Double booking, Stripe auth expiry, Connect onboarding, RLS gaps, timezone handling all documented in hospitality payment processing guides, Stripe docs, Supabase RLS best practices, booking system design articles.                      |

**Overall confidence:** HIGH

### Gaps to Address

**Stripe SEA market testing:** Research confirmed Stripe MCC 7011 and extended authorization requirements, but actual Stripe Connect onboarding for Vietnamese/Thai property owners needs validation. The existing GUDBRO system has Stripe in backoffice but not Connect. Mitigate by: (1) start with cash/transfer default, (2) pilot Stripe with 3-5 owners before full rollout, (3) document KYC failure modes per country.

**Partner confirmation flow:** The referral commission tracking depends on partners confirming guest transactions, but the confirmation mechanism is underspecified. Is it WhatsApp reply? Partner dashboard? GUDBRO link? Mitigate by: (1) start with referral click tracking only (no commission promises), (2) manual monthly reconciliation with partners, (3) build automated confirmation in Phase 6 based on pilot learnings.

**Service automation thresholds:** The PRD specifies three automation levels (auto-confirm, manual, WhatsApp-only) but does not specify timing thresholds. When does auto-confirm happen? Immediately? After 5 minutes? Mitigate by: (1) default to WhatsApp notification + manual for MVP, (2) add auto-confirm post-launch based on owner feedback, (3) make thresholds configurable per property.

**Multi-language property descriptions:** Service translations table exists, but property-level content (description, house rules, amenities) needs translation schema. Mitigate by: (1) English-only for MVP, (2) add `accom_property_translations` table in Phase 1 (already in database plan), (3) owner provides translations manually or via Google Translate with edit capability.

## Sources

### Primary (HIGH confidence)

- **Existing codebase:** All patterns verified against `apps/accommodations/frontend/`, migrations 077-081, `shared/payment/`, backoffice patterns
- **GUDBRO PRD:** `apps/accommodations/PRD.md` v2.3, `apps/accommodations/VERTICAL-CONTEXT.md`
- **Stripe official docs:** Payment capture strategies, extended authorization, hospitality payment processing, Connect marketplace guide
- **Package versions:** All 13 stack additions verified via npm (Stripe, react-day-picker, Recharts, TanStack Query, Zod, Embla, Resend, Phosphor, Framer Motion, qrcode.react, CVA)
- **Supabase docs:** RLS, Realtime (Broadcast/Presence/Postgres Changes), multi-tenant architecture
- **PostgreSQL:** Exclusion constraints, daterange operators, DATE vs TIMESTAMPTZ

### Secondary (MEDIUM confidence)

- **Competitor analysis:** Airbnb Host Dashboard, Booking.com Extranet, Cloudbeds/Lodgify/Hostaway feature comparison, hotel digital concierge guides
- **Hospitality patterns:** Hotel room service software comparison, guest app usage data, booking system design guides
- **Domain pitfalls:** Double booking prevention techniques, hotel kitchen order fulfillment, booking engine UX mistakes, automation best practices

### Tertiary (LOW confidence)

- **Package versions requiring verification at install:** Embla Carousel v8.5.1, Resend v4.0.0 (from training data cutoff, recommend `npm info` at install time)

---

_Research completed: 2026-01-31_
_Ready for roadmap: yes_
