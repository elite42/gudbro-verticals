# Technology Stack: Accommodations v2

**Project:** GUDBRO Accommodations v2 -- Booking, Owner Dashboard, Service Ordering
**Researched:** 2026-01-31
**Overall Confidence:** HIGH

---

## Key Finding: Modest Additions to Existing Stack

The accommodations frontend currently has a minimal package set (Next.js, Supabase, Radix, date-fns, jose). The v2 features require **targeted additions** for payments (Stripe), date picking (availability calendar), charts (owner analytics), animations, and server-state management. The backoffice already uses most of these libraries, so patterns and integration knowledge exist in the codebase.

**What already exists in the accommodations frontend:**

- Next.js 14.2.33, React 18, Tailwind, Radix UI (dialog, slot)
- Supabase JS client with JWT auth via jose
- date-fns for date manipulation
- clsx + tailwind-merge for class utilities

**What already exists in the broader monorepo (proven patterns):**

- Stripe integration (backoffice: `stripe@^14.0.0`) -- server-side only
- @shared/payment package (types, formatPrice, currency conversion)
- Recharts (backoffice: `recharts@^3.7.0`) -- analytics charts
- @tanstack/react-query (backoffice: `@tanstack/react-query@^5.90.19`)
- Zod validation (backoffice: `zod@^3.23.0`)
- Framer Motion (coffeeshop: `framer-motion@^12.24.7`)
- Phosphor Icons (coffeeshop: `@phosphor-icons/react@^2.1.10`)
- QR code generation (coffeeshop: `qrcode@^1.5.4`, `qrcode.react@^4.2.0`)

---

## Recommended Stack Additions

### 1. Payment Processing -- Stripe

**For booking deposits and service ordering payments.**

| Package                   | Version | Purpose                              | Why                                                                                                                                                                                                                             |
| ------------------------- | ------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stripe`                  | ^17.0.0 | Server-side Stripe API               | Create checkout sessions, handle webhooks. Pin to v17 (not v20) because backoffice uses v14 and v20 is a breaking major with new API version. v17 is stable, compatible with API 2024-x, and avoids forcing backoffice upgrade. |
| `@stripe/stripe-js`       | ^8.6.1  | Client-side Stripe.js loader         | Load Stripe Elements for embedded payment forms. Singleton pattern.                                                                                                                                                             |
| `@stripe/react-stripe-js` | ^5.4.1  | React components for Stripe Elements | PaymentElement, AddressElement for checkout flow.                                                                                                                                                                               |

**Architecture decision: Stripe Checkout (hosted) for bookings, Stripe Elements (embedded) for services.**

- **Booking deposits** use Stripe Checkout (hosted page). Reason: highest conversion, Apple/Google Pay out of the box, PCI compliance with zero effort, reduces liability for a young product. Guest clicks "Book" -> redirected to Stripe -> returns to confirmation page.
- **In-stay service ordering** uses Stripe Payment Intents with Elements (embedded). Reason: small amounts ($5-30), guest is already authenticated via booking code, inline payment feels natural for ordering breakfast/laundry.
- **Server Actions pattern** (not API routes) for creating checkout sessions. This is the modern Next.js 14+ approach -- cleaner, more secure, no manual fetch calls.

**Integration with @shared/payment:**

- Use `PaymentMethod` types from @shared/payment for method selection UI
- Use `formatPrice()` for price display across currencies
- Stripe handles card/Apple Pay/Google Pay; @shared/payment handles cash/crypto/VNPay display
- The `PaymentIntent` type from @shared/payment maps cleanly to Stripe PaymentIntents

**What NOT to add:**

- Do NOT add PayPal SDK. Southeast Asia market -- Stripe + VNPay/MoMo covers 95%+ of transactions. PayPal adds complexity for minimal adoption.
- Do NOT add a Stripe subscription product. Bookings are one-time payments. Recurring billing is not in scope.
- Do NOT implement Stripe Connect yet. The commission model (85/10/5 split) is manual/offline for MVP. Connect marketplace adds massive complexity -- defer to post-launch when volume justifies it.

**Webhook endpoint:** `/api/webhooks/stripe` -- handles `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`. Use `stripe.webhooks.constructEvent()` for signature verification.

**Confidence:** HIGH -- Stripe versions verified via [npm](https://www.npmjs.com/package/stripe), patterns verified in backoffice codebase and [Stripe Next.js docs](https://docs.stripe.com/checkout/quickstart?client=next).

---

### 2. Availability Calendar -- react-day-picker

**For date range selection in booking flow and owner availability management.**

| Package            | Version | Purpose                     | Why                                                                                                                                                                    |
| ------------------ | ------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-day-picker` | ^9.13.0 | Date range picker component | Best React date picker: accessible (WCAG 2.1 AA), supports date ranges natively, Buddhist calendar support (Thailand market), lightweight, customizable with Tailwind. |

**Why react-day-picker over alternatives:**

| Library                    | Why NOT                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| `react-datepicker`         | Heavier, requires separate CSS import, less customizable. react-day-picker is more composable. |
| `react-date-range`         | Unmaintained (last publish 2+ years ago). Dead project.                                        |
| `@radix-ui/react-calendar` | Does not exist. Radix has no calendar primitive.                                               |
| Custom from scratch        | Date edge cases (timezone, DST, month boundaries) are notoriously error-prone.                 |

**Key date-fns compatibility note:** react-day-picker v9 bundles its own date-fns internally (moved from peer dependency to direct dependency). The accommodations frontend already has `date-fns@^3.3.1`. These will coexist without conflict -- react-day-picker uses its bundled version, app code uses the project version. However, recommend upgrading the project date-fns to `^4.1.0` (matching backoffice) for consistency and to get the latest locale/timezone improvements.

**Usage in booking flow:**

- Guest selects check-in/check-out range
- Disabled dates from owner's availability calendar
- Price display per night on hover (custom day cell renderer)
- Minimum stay enforcement

**Usage in owner dashboard:**

- Calendar view of bookings (color-coded by status)
- Block dates (maintenance, personal use)
- Seasonal pricing date ranges

**Confidence:** HIGH -- version verified via [npm](https://www.npmjs.com/package/react-day-picker), date-fns compatibility researched via [GitHub issue #2465](https://github.com/gpbl/react-day-picker/issues/2465) and [daypicker.dev](https://daypicker.dev/).

---

### 3. Analytics Charts -- Recharts

**For owner dashboard: revenue charts, booking trends, occupancy rates.**

| Package    | Version | Purpose       | Why                                                                                                                             |
| ---------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `recharts` | ^3.6.0  | Chart library | Already used in backoffice for analytics. Proven patterns exist. React-native, declarative API, supports responsive containers. |

**What to build:**

- Revenue over time (AreaChart)
- Booking sources (PieChart: direct vs OTA vs referral)
- Occupancy rate (BarChart by month)
- Service revenue breakdown (BarChart by category)

**Alternatives considered:**

| Library                    | Why NOT                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Chart.js + react-chartjs-2 | Would introduce a second charting library. Recharts is already in the monorepo.                       |
| Nivo                       | More beautiful defaults but significantly larger bundle. Recharts is sufficient for dashboard charts. |
| Tremor                     | Opinionated UI library, doesn't match existing Tailwind/Radix design system.                          |

**Confidence:** HIGH -- version verified via [npm](https://www.npmjs.com/package/recharts), patterns verified in backoffice.

---

### 4. Server State Management -- TanStack Query

**For data fetching, caching, and optimistic updates across all dashboard views.**

| Package                 | Version  | Purpose                 | Why                                                                                                                                                           |
| ----------------------- | -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@tanstack/react-query` | ^5.90.19 | Server state management | Already proven in backoffice. Essential for: booking list pagination, calendar data caching, optimistic status updates, stale-while-revalidate for analytics. |

**Why this is necessary (not optional):**

- Owner dashboard has 6+ data sources (bookings, services, pricing, analytics, partners, notifications)
- Manual `useEffect` + `useState` fetching leads to waterfall requests and stale data
- Optimistic updates critical for booking status changes (owner confirms/rejects)
- Background refetching keeps calendar availability fresh

**What NOT to add:**

- Do NOT add SWR. TanStack Query is already the project standard and more feature-rich.
- Do NOT use React Server Components for all data. RSC works for initial page load, but the dashboard needs client-side mutations and real-time cache updates.

**Confidence:** HIGH -- version verified via [npm](https://www.npmjs.com/package/@tanstack/react-query).

---

### 5. Form Validation -- Zod

**For booking form, service configuration, and owner property setup validation.**

| Package | Version | Purpose           | Why                                                                                                                                                                                                  |
| ------- | ------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zod`   | ^3.24.0 | Schema validation | Stay on Zod 3.x (not 4.x). Zod 4 was released Jan 2026 but is a major rewrite. The entire monorepo uses Zod 3. Mixing versions creates confusion. Upgrade to Zod 4 as a separate coordinated effort. |

**Why Zod 3.x, not 4.x:**

- Zod 4 changes the import path and some APIs
- Backoffice uses `zod@^3.23.0` -- stay aligned
- Zod 3.24.x is actively maintained with security patches
- Upgrade to 4 when the whole monorepo can move together

**Key schemas needed:**

- `BookingRequestSchema` -- dates, guest count, contact info, special requests
- `PropertyConfigSchema` -- pricing rules, availability, amenities
- `ServiceItemSchema` -- name, price, category, automation level
- `ServiceOrderSchema` -- items, quantities, delivery time, payment method

**Confidence:** HIGH -- Zod 4 release verified via [npm](https://www.npmjs.com/package/zod), decision to stay on 3.x is deliberate.

---

### 6. UI Enhancements -- Icons, Animations, QR

| Package                    | Version  | Purpose            | Why                                                                                                                                                                                    |
| -------------------------- | -------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@phosphor-icons/react`    | ^2.1.10  | Icon library       | Project standard (CLAUDE.md Section 8.1). 9,000+ icons, duotone weight preferred.                                                                                                      |
| `framer-motion`            | ^12.27.0 | Animations         | Page transitions, booking flow steps, gallery swipe. Already in coffeeshop. Note: package is being rebranded to "motion" but framer-motion@12 still works and has no breaking changes. |
| `qrcode.react`             | ^4.2.0   | QR code generation | Room QR codes for in-stay dashboard access. Already in coffeeshop.                                                                                                                     |
| `class-variance-authority` | ^0.7.1   | Component variants | Button/card variants. Already in backoffice and coffeeshop.                                                                                                                            |

**What NOT to add:**

- Do NOT add Lucide React. Phosphor is the project standard. Legacy Lucide only in existing components.
- Do NOT add `motion` (the rebrand of framer-motion). Stay on `framer-motion` for consistency with coffeeshop. Migrate all at once later.

**Confidence:** HIGH -- all versions verified, all already in monorepo.

---

### 7. Image Gallery -- Swiper or Embla

**For property photo gallery (swipeable, full-screen capable).**

| Package                | Version | Purpose                 | Why                                                                                                                                                    |
| ---------------------- | ------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `embla-carousel-react` | ^8.5.1  | Touch-friendly carousel | Lightweight (4KB gzipped), no dependencies, excellent touch/swipe, SSR compatible, accessible. Better than Swiper for a PWA where bundle size matters. |

**Alternatives considered:**

| Library                | Why NOT                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `swiper`               | 60KB+ bundle, CSS-heavy, overkill for a simple photo gallery.                              |
| `react-slick`          | Deprecated maintenance mode, jQuery-era patterns.                                          |
| Custom CSS scroll-snap | Works for basic cases but no pinch-zoom, no full-screen mode, no lazy loading integration. |
| `keen-slider`          | Good but Embla has better React integration and smaller bundle.                            |

**Usage:**

- Property page hero gallery (swipe through photos)
- Full-screen gallery overlay (pinch to zoom on mobile)
- Thumbnail navigation strip

**Confidence:** MEDIUM -- version from training data, recommend verifying at install time with `npm info embla-carousel-react version`.

---

### 8. Real-time Communication -- Supabase Realtime

**For booking notifications, service order updates, guest-host messaging.**

| Technology                           | Version                           | Purpose                                        | Why                                                               |
| ------------------------------------ | --------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------- |
| Supabase Realtime (Postgres Changes) | Included in @supabase/supabase-js | Booking status updates, service order tracking | Already configured. Subscribe to booking/order status changes.    |
| Supabase Realtime (Broadcast)        | Included                          | Guest-host chat messages                       | Low-latency pub/sub, RLS-authorized since recent Supabase update. |
| Supabase Realtime (Presence)         | Included                          | "Host is online" indicator                     | Show guest if host is currently available.                        |

**No new packages needed.** Supabase JS client already supports all three Realtime modes.

**Architecture:**

- Booking confirmations: Postgres Changes on `accom_bookings` table (status column)
- Service order updates: Postgres Changes on `accom_service_orders` table
- Guest-host messaging: Broadcast channel scoped to booking code
- Host online status: Presence channel scoped to property

**Confidence:** HIGH -- Supabase Realtime features verified via [official docs](https://supabase.com/docs/guides/realtime) and [Supabase 2026 review](https://hackceleration.com/supabase-review/).

---

### 9. Email Notifications -- Resend (NEW)

**For booking confirmations, pre-arrival info, and receipt emails.**

| Package  | Version | Purpose             | Why                                                                                                                               |
| -------- | ------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `resend` | ^4.0.0  | Transactional email | Simple API, generous free tier (100 emails/day = 3000/month), React email templates, works perfectly with Next.js Server Actions. |

**Why Resend over alternatives:**

| Service              | Why NOT                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| SendGrid             | Complex setup, requires API key + domain verification + sender identity. Overkill for transactional email.       |
| AWS SES              | Cheapest at scale but requires AWS account, domain verification, sandbox escape. Too much ops for current stage. |
| Supabase Auth emails | Only for auth flows, cannot customize for booking confirmations.                                                 |
| Nodemailer + SMTP    | Requires SMTP server management, deliverability issues, no templates.                                            |

**Emails needed:**

1. Booking confirmation (guest)
2. New booking notification (owner)
3. Pre-arrival info with QR code (guest, 1 day before check-in)
4. Service order confirmation (guest)
5. Check-out receipt (guest)

**Alternative: WhatsApp Business API.** The PRD mentions WhatsApp as primary communication channel. For MVP, use WhatsApp for real-time notifications (booking status, service updates) and Resend for formal confirmations/receipts that guests need in their inbox. WhatsApp API integration is a separate concern -- use simple `wa.me` links initially (already in @shared/payment utils).

**Confidence:** MEDIUM -- Resend version from training data. Verify with `npm info resend version` at install time.

---

## Complete Installation Command

```bash
# From apps/accommodations/frontend/

# Core additions
pnpm add stripe@^17.0.0 @stripe/stripe-js@^8.6.1 @stripe/react-stripe-js@^5.4.1

# Calendar and charts
pnpm add react-day-picker@^9.13.0 recharts@^3.6.0

# Server state and validation
pnpm add @tanstack/react-query@^5.90.19 zod@^3.24.0

# UI enhancements
pnpm add @phosphor-icons/react@^2.1.10 framer-motion@^12.27.0 qrcode.react@^4.2.0 class-variance-authority@^0.7.1

# Image gallery
pnpm add embla-carousel-react@^8.5.1

# Email
pnpm add resend@^4.0.0

# Upgrade existing
pnpm add date-fns@^4.1.0

# Dev dependencies (QR types already needed)
pnpm add -D @types/qrcode@^1.5.6
```

**Total new direct dependencies: 13**
**Total new dev dependencies: 1**

---

## Alternatives Considered (Full Summary)

| Category   | Recommended                | Alternative                        | Why Not                                                                 |
| ---------- | -------------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| Payments   | Stripe Checkout + Elements | PayPal, Square, Paddle             | SEA market coverage, developer experience, existing backoffice pattern  |
| Calendar   | react-day-picker           | react-datepicker, react-date-range | Accessibility, Buddhist calendar support (Thailand), active maintenance |
| Charts     | Recharts                   | Chart.js, Nivo, Tremor             | Already in monorepo, sufficient for dashboard charts                    |
| State      | TanStack Query             | SWR, Zustand, Redux                | Already project standard, better mutation/cache features                |
| Validation | Zod 3.x                    | Zod 4.x, Yup, io-ts                | Monorepo consistency, avoid premature migration                         |
| Icons      | Phosphor                   | Lucide, Heroicons                  | Project standard per CLAUDE.md                                          |
| Animations | Framer Motion              | React Spring, GSAP                 | Already in monorepo, best React DX                                      |
| Gallery    | Embla Carousel             | Swiper, keen-slider                | Smallest bundle, best touch support                                     |
| Email      | Resend                     | SendGrid, SES, Nodemailer          | Simplest setup, React templates, generous free tier                     |
| Realtime   | Supabase Realtime          | Pusher, Ably, Socket.io            | Already included, RLS authorization, zero additional cost               |

---

## What NOT to Add (and Why)

| Library/Service          | Why NOT                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stripe Connect           | Commission splits (85/10/5) are manual for MVP. Connect marketplace adds weeks of complexity for a feature needed only at scale.                         |
| Prisma                   | Accommodations frontend uses Supabase JS client directly (not Prisma). Keep it that way -- Prisma is for backoffice only.                                |
| NextAuth/Auth.js         | Owners authenticate via Supabase Auth (already configured). Guests authenticate via booking code + JWT (already built). No need for a third auth system. |
| Mapbox/Google Maps       | Location display is nice-to-have, not MVP. Use a static map image or simple link to Google Maps initially. Add interactive maps in a later phase.        |
| i18n library (next-intl) | The PRD mentions multi-language but the existing accommodations frontend has no i18n setup. Defer to a dedicated i18n phase. Don't half-implement it.    |
| Cloudinary/imgix         | Photo optimization can be handled by Next.js Image component + Supabase Storage. No need for a third-party image CDN at this scale.                      |
| Redis/Upstash            | No caching layer needed. Supabase handles all data, TanStack Query handles client-side caching. Add Redis only if API latency becomes a problem.         |

---

## Environment Variables Needed

```env
# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Resend (email)
RESEND_API_KEY=re_...

# Existing (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
JWT_SECRET=...
```

---

## Version Compatibility Matrix

| Package                 | Version  | React 18     | Next.js 14 | TypeScript 5 | Notes                |
| ----------------------- | -------- | ------------ | ---------- | ------------ | -------------------- |
| stripe                  | ^17.0.0  | N/A (server) | Yes        | Yes          | Server-side only     |
| @stripe/stripe-js       | ^8.6.1   | Yes          | Yes        | Yes          | Client singleton     |
| @stripe/react-stripe-js | ^5.4.1   | Yes (16.8+)  | Yes        | Yes          |                      |
| react-day-picker        | ^9.13.0  | Yes          | Yes        | Yes          | Bundles own date-fns |
| recharts                | ^3.6.0   | Yes (18+)    | Yes        | Yes          |                      |
| @tanstack/react-query   | ^5.90.19 | Yes (18+)    | Yes        | Yes          |                      |
| zod                     | ^3.24.0  | N/A          | N/A        | Yes (5+)     |                      |
| @phosphor-icons/react   | ^2.1.10  | Yes          | Yes (RSC)  | Yes          |                      |
| framer-motion           | ^12.27.0 | Yes          | Yes        | Yes          |                      |
| qrcode.react            | ^4.2.0   | Yes          | Yes        | Yes          |                      |
| embla-carousel-react    | ^8.5.1   | Yes          | Yes        | Yes          |                      |
| resend                  | ^4.0.0   | N/A (server) | Yes        | Yes          |                      |
| date-fns                | ^4.1.0   | N/A          | N/A        | Yes          | Upgrade from ^3.3.1  |

---

## Sources

- [Stripe npm package](https://www.npmjs.com/package/stripe) -- v20.2.0 latest, v17 chosen for compatibility (HIGH confidence)
- [@stripe/stripe-js npm](https://www.npmjs.com/package/@stripe/stripe-js) -- v8.6.1 verified (HIGH confidence)
- [@stripe/react-stripe-js npm](https://www.npmjs.com/package/@stripe/react-stripe-js) -- v5.4.1 verified (HIGH confidence)
- [Stripe Next.js Checkout Quickstart](https://docs.stripe.com/checkout/quickstart?client=next) -- official integration guide (HIGH confidence)
- [react-day-picker npm](https://www.npmjs.com/package/react-day-picker) -- v9.13.0 verified (HIGH confidence)
- [react-day-picker date-fns compatibility](https://github.com/gpbl/react-day-picker/issues/2465) -- v9 bundles own date-fns (HIGH confidence)
- [daypicker.dev](https://daypicker.dev/) -- official docs, Buddhist calendar support (HIGH confidence)
- [recharts npm](https://www.npmjs.com/package/recharts) -- v3.6.0 verified (HIGH confidence)
- [@tanstack/react-query npm](https://www.npmjs.com/package/@tanstack/react-query) -- v5.90.19 verified (HIGH confidence)
- [zod npm](https://www.npmjs.com/package/zod) -- v4.3.5 latest, staying on v3.x for consistency (HIGH confidence)
- [@phosphor-icons/react npm](https://www.npmjs.com/package/@phosphor-icons/react) -- v2.1.10 verified (HIGH confidence)
- [framer-motion npm](https://www.npmjs.com/package/framer-motion) -- v12.27.0 verified, rebrand to "motion" noted (HIGH confidence)
- [Supabase Realtime docs](https://supabase.com/docs/guides/realtime) -- Broadcast/Presence/Postgres Changes (HIGH confidence)
- [Supabase Realtime Authorization](https://supabase.com/blog/supabase-realtime-broadcast-and-presence-authorization) -- RLS for Broadcast/Presence (HIGH confidence)
- Existing codebase: `apps/backoffice/package.json`, `apps/coffeeshop/frontend/package.json`, `apps/accommodations/frontend/package.json`, `shared/payment/` (HIGH confidence)
