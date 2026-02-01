# Technology Stack: Accommodations Extended Features (38 Features + Bug Fixes)

**Project:** Accommodations Vertical - Extended Features Milestone
**Researched:** 2026-02-01
**Overall Confidence:** HIGH
**Mode:** Incremental stack analysis (additions only)

---

## Key Finding: Zero New npm Packages Required

After analyzing all 13 feature categories against the existing codebase, **no new npm packages are needed**. Every feature can be built with the current stack plus native browser APIs. The one potential addition (`@radix-ui/react-progress` for the accommodations frontend) is conditional and may not be needed if the onboarding wizard lives in the backoffice (where it already exists).

---

## Existing Stack Inventory (Verified in package.json)

### Accommodations Frontend (`apps/accommodations/frontend/`)

| Package                     | Version | Relevant To New Features                         |
| --------------------------- | ------- | ------------------------------------------------ |
| `next`                      | 14.2.33 | All features (routing, API routes, middleware)   |
| `@supabase/supabase-js`     | ^2.39.0 | All features (DB, Storage, Realtime for minibar) |
| `qrcode`                    | ^1.5.4  | WiFi QR code generation                          |
| `react-day-picker`          | ^9.13.0 | Gantt timeline date navigation                   |
| `date-fns`                  | ^3.3.1  | Gantt timeline date math, booking calculations   |
| `browser-image-compression` | ^2.0.2  | Room/service image upload                        |
| `heic2any`                  | ^0.0.4  | iPhone HEIC photo conversion for image upload    |
| `@phosphor-icons/react`     | ^2.1.7  | Star ratings (Star icon), all new UI             |
| `@radix-ui/react-dialog`    | ^1.0.5  | Modals (feedback, early check-in requests)       |
| `embla-carousel-react`      | ^8.6.0  | Room image galleries                             |
| `jose`                      | ^6.0.8  | JWT auth (returning guest, voucher validation)   |
| `stripe`                    | ^14.0.0 | Payment flows for early check-in/late checkout   |
| `react-international-phone` | ^4.3.0  | Guest contact forms                              |

### Backoffice (`apps/backoffice/`)

| Package                      | Version          | Relevant To New Features                   |
| ---------------------------- | ---------------- | ------------------------------------------ |
| `recharts`                   | ^3.7.0           | Feedback analytics, occupancy charts       |
| `@tanstack/react-query`      | ^5.90.19         | Data fetching for Gantt view               |
| `@radix-ui/react-progress`   | ^1.1.8           | Onboarding wizard progress bar             |
| `@dnd-kit/core` + `sortable` | ^6.3.1 / ^10.0.0 | Room reordering in property settings       |
| `jspdf` + `svg2pdf.js`       | ^4.0.0 / ^2.7.0  | Export QR codes, booking confirmations     |
| `web-push`                   | ^3.6.7           | Minibar consumption notifications to owner |
| `zod`                        | ^3.23.0          | Form validation for onboarding wizard      |

### Shared Infrastructure

| Resource                                  | Purpose                                                                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Supabase Storage                          | Image/document upload (buckets already configured)                                                               |
| Supabase Realtime                         | Minibar notifications, live feedback channel                                                                     |
| Migration 050 (`050-b2b-conventions.sql`) | Convention/voucher schema (tables exist: `partner_conventions`, `convention_vouchers`, `convention_redemptions`) |
| `shared/payment/`                         | Payment utilities package                                                                                        |

---

## Feature-by-Feature Stack Analysis

### 1. Gantt/Timeline Calendar (Multi-Room Properties, up to 25 rooms)

**New packages: NONE**

**Recommendation:** Build with CSS Grid + existing `date-fns` + `react-day-picker`

**Why no Gantt library:**

- This is a **resource timeline** (rooms x dates), NOT a project management Gantt with task dependencies, critical paths, or milestones
- 25 rooms x 90 days = 2,250 cells -- trivially small, no virtual rendering needed
- CSS Grid with `grid-column-start`/`grid-column-end` for booking bars is ~250 lines of custom code
- Full ownership and styling control with existing Tailwind
- Zero bundle size increase

**Alternatives evaluated and rejected:**

| Library                                      | Version    | License    | Bundle Size | Why Rejected                                                                                                                                                           |
| -------------------------------------------- | ---------- | ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@svar-ui/react-gantt`                       | 2.4.4      | MIT (free) | ~150KB      | Project management focused; task dependencies, critical paths -- features we don't need. Would require heavy customization to look like a hotel availability calendar. |
| shadcn Gantt (`npx shadcn@latest add gantt`) | N/A        | Copy-paste | Varies      | Same project-management orientation. Also introduces shadcn dependency chain not present in accommodations app.                                                        |
| Mobiscroll Timeline                          | Commercial | $$$$       | N/A         | Perfect conceptual fit (resource booking timeline) but commercial license not justified for 25 rooms.                                                                  |
| Bryntum Gantt                                | Commercial | $940+/dev  | N/A         | Enterprise tool, far too expensive and heavy.                                                                                                                          |

**Implementation approach:**

```
CSS Grid Layout:
- Columns: 1 fixed (room name, ~180px) + N day columns (1 per day, ~40px each)
- Rows: 1 header (dates) + N room rows
- Booking bars: absolutely positioned divs spanning grid columns
- Color coding: confirmed (green), pending (yellow), checked-in (blue), checked-out (gray)
- Horizontal scroll: overflow-x-auto on container
- Date navigation: existing react-day-picker for range selection
- Date math: existing date-fns (eachDayOfInterval, differenceInDays, format)
```

**Confidence:** HIGH -- CSS Grid room timelines are a proven pattern in hotel booking systems.

---

### 2. Minibar Self-Service

**New packages: NONE**

**Implementation:**

- Guest marks consumed items via PWA checkbox/counter UI
- Real-time notification to owner via **Supabase Realtime** (already available through `@supabase/supabase-js` -- `.channel().on('postgres_changes', ...).subscribe()`)
- Push notification to owner via `web-push` (already installed in backoffice)
- New DB table: `accom_minibar_consumptions` (booking_id, item_id, quantity, reported_at)
- Minibar items configured per-room via backoffice

**Confidence:** HIGH -- Supabase Realtime and web-push already in stack.

---

### 3. In-Stay Guest Feedback/Complaints Channel

**New packages: NONE**

**Implementation:**

- Simple message form (textarea + category selector) in guest PWA
- Messages stored in new `accom_guest_messages` table
- Owner notification via existing `web-push` infrastructure
- No real-time chat needed (this is a feedback channel, not a messenger)
- Use existing `@radix-ui/react-dialog` for the feedback modal

**Confidence:** HIGH -- standard form submission pattern.

---

### 4. WiFi QR Code Generation

**New packages: NONE**

**Already exists in codebase:**

- `qrcode` package installed in accommodations frontend (^1.5.4)
- `generateWiFiString()` utility in backoffice `lib/qr/qr-types.ts` generates `WIFI:T:WPA;S:{ssid};P:{password};;` format
- `WiFiQuickConnect` component in coffeeshop with full QR modal UI
- Backoffice `lib/qr/qr-generator.ts` has complete QR generation pipeline

**Implementation:** Copy the WiFi QR pattern from coffeeshop/backoffice. Adapt for per-property WiFi credentials (already stored or will be stored in `accom_properties`).

**Confidence:** HIGH -- pattern proven in two other verticals.

---

### 5. Image Upload for Rooms and Services

**New packages: NONE**

**Already exists:**

- `browser-image-compression` ^2.0.2 in accommodations frontend
- `heic2any` ^0.0.4 in accommodations frontend
- `lib/image-utils.ts` with compression/conversion utilities
- Supabase Storage upload routes in backoffice (`/api/upload/image/route.ts`, `/api/upload/staff-photo/route.ts`, `/api/upload/logo/route.ts`)
- `embla-carousel-react` for image galleries in accommodations

**Implementation:** Create new storage bucket for room/service images. Reuse existing `image-utils.ts` for client-side compression. Add upload API route following backoffice patterns.

**Confidence:** HIGH -- all pieces exist and are proven.

---

### 6. Currency Selector for Guest PWA

**New packages: NONE**

**Implementation:**

- Display currency formatting via native `Intl.NumberFormat` (browser API, zero deps)
- Exchange rates via **frankfurter.app** (free, no API key, ECB rates, updates weekdays)
- Server-side API route fetches + caches rates (1h TTL via simple in-memory or response headers)
- Guest preference stored in `localStorage`
- Base prices stored in property's configured currency; conversion at display time only

```typescript
// Already available in all browsers:
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
  42.5
);
// -> "$42.50"
```

**External API dependency:**

| API             | URL                                           | Cost | Auth | Reliability                                   |
| --------------- | --------------------------------------------- | ---- | ---- | --------------------------------------------- |
| frankfurter.app | `https://api.frankfurter.app/latest?from=EUR` | Free | None | ECB data source, weekday updates, open source |

**Why not `next-intl` or `react-intl`:** This is purely currency display formatting, not full app internationalization. `Intl.NumberFormat` handles it natively.

**Confidence:** HIGH -- standard browser API + well-known free API.

---

### 7. Early Check-in / Late Checkout Request Flow

**New packages: NONE**

**Implementation:**

- New DB table: `accom_special_requests` (booking_id, type: 'early_checkin' | 'late_checkout', requested_time, status, owner_response, price_adjustment)
- Guest submits request via form in PWA (existing `@radix-ui/react-dialog` for modal)
- Owner receives notification via `web-push`, approves/declines in backoffice
- If approved with price, uses existing `stripe` payment flow
- Time picker: native `<input type="time">` -- no library needed

**Confidence:** HIGH -- standard request/approval workflow.

---

### 8. Returning Guest Detection

**New packages: NONE**

**Implementation:**

- SQL query on existing `accom_bookings` + `accom_guests` tables
- Match on: `LOWER(first_name) = LOWER($1) AND LOWER(last_name) = LOWER($2) AND nationality = $3`
- Flag in booking creation API: "This guest has stayed N times before"
- UI badge in backoffice booking list and detail view
- Optional: personalized welcome message in guest PWA

**Confidence:** HIGH -- pure SQL query, no new dependencies.

---

### 9. Owner Onboarding Wizard with Progress Tracking

**New packages: NONE (if in backoffice) or 1 optional (if in accommodations frontend)**

**Backoffice already has:**

- `@radix-ui/react-progress` for progress bars
- `zod` for form validation
- All form primitives (inputs, selects, dialogs)

**Implementation:**

- React state machine tracking current step + completed steps
- Steps: Property Details -> Rooms -> Services -> Pricing -> WiFi -> Photos -> Review -> Publish
- Progress persisted in DB (`onboarding_step` column on `accom_properties` or separate `accom_onboarding_progress` table)
- Each step validates via `zod` schemas
- Incomplete setup shows banner: "Complete your property setup (5/8 steps done)"

**If guest-facing progress UI needed in accommodations frontend:**

```bash
pnpm add @radix-ui/react-progress@^1.1.8
```

Size: ~3KB gzipped. But likely unnecessary -- onboarding is an owner/backoffice flow.

**Confidence:** HIGH -- standard wizard pattern with existing components.

---

### 10. Guest Delivery Apps Integration (Grab, ShopeeFood)

**New packages: NONE**

**Implementation:**

- Static cards with app logos, deep links, and descriptions
- Deep link format: `grab://` or `https://grab.onelink.me/...` (platform-specific)
- Configurable per-property in backoffice (which apps are relevant in their location)
- Stored as JSONB array in property settings
- No API integration -- just curated links/cards

**Confidence:** HIGH -- purely UI/configuration, no external dependencies.

---

### 11. Conventions/Voucher System

**New packages: NONE**

**Already exists:**

- Migration `050-b2b-conventions.sql` with complete schema:
  - `office_partners` (partner registry)
  - `partner_conventions` (active conventions between merchant and partner)
  - `convention_vouchers` (individual voucher codes)
  - `convention_redemptions` (usage tracking)
- Schema supports partner types: office, gym, school, coworking, hospital

**Implementation:**

- Adapt convention types for accommodations (e.g., corporate rate agreements, travel agency partnerships)
- Build backoffice CRUD for managing accommodation conventions
- Voucher validation in booking flow (apply code -> check validity -> apply discount)
- May need minor schema extension for accommodation-specific discount types (per-night, percentage, fixed)

**Confidence:** HIGH -- schema is complete, needs UI layer only.

---

### 12. Post-Stay Feedback with Ratings

**New packages: NONE**

**Recommendation:** Build custom star rating with existing Phosphor Icons

**Why no rating library:**

- `@phosphor-icons/react` already provides `Star` icon with `fill` (selected) and `regular` (empty) weights
- A star rating component is ~50 lines of React: map 5 stars, track hover/click state, call onChange
- `@smastrom/react-rating` (v1.5.0) hasn't been updated in 2 years and adds a dependency for trivial functionality
- Custom component matches existing design system perfectly

**Implementation:**

```tsx
import { Star } from '@phosphor-icons/react';

// Selected star: <Star weight="fill" className="text-amber-400" />
// Empty star:    <Star weight="regular" className="text-gray-300" />
// Hover preview: onMouseEnter changes temporary fill state
```

**Rating categories:** Cleanliness, Comfort, Location, Value for Money, Staff
**Storage:** New `accom_reviews` table with per-category scores (1-5) + text comment
**Trigger:** Email/push notification 24h after checkout (use existing cron pattern)

**Confidence:** HIGH -- trivial implementation with existing icon library.

---

### 13. Homepage Redesign with Visual Cards

**New packages: NONE**

**Implementation:** Purely Tailwind CSS + existing component library. Visual cards are styled divs with images (using existing `embla-carousel-react` for any carousels), Phosphor icons, and Tailwind utilities.

**Confidence:** HIGH -- styling work only.

---

## Summary: Installation Commands

```bash
# Nothing to install. All features use existing dependencies.

# The ONLY conditional addition (if onboarding progress bar needed in guest PWA):
# cd apps/accommodations/frontend && pnpm add @radix-ui/react-progress@^1.1.8
```

---

## Complete Feature-to-Dependency Matrix

| #   | Feature                      | Libraries Used (all existing)                                |
| --- | ---------------------------- | ------------------------------------------------------------ |
| 1   | Gantt/Timeline calendar      | CSS Grid + `date-fns` + `react-day-picker`                   |
| 2   | Minibar self-service         | `@supabase/supabase-js` (Realtime) + `web-push` (backoffice) |
| 3   | Guest feedback channel       | `@radix-ui/react-dialog` + `@supabase/supabase-js`           |
| 4   | WiFi QR code                 | `qrcode` (installed) + existing `generateWiFiString` pattern |
| 5   | Image upload                 | `browser-image-compression` + `heic2any` + Supabase Storage  |
| 6   | Currency selector            | Native `Intl.NumberFormat` + frankfurter.app API             |
| 7   | Early check-in/late checkout | `@radix-ui/react-dialog` + `stripe` + `web-push`             |
| 8   | Returning guest detection    | SQL query (no frontend deps)                                 |
| 9   | Onboarding wizard            | `@radix-ui/react-progress` (backoffice) + `zod`              |
| 10  | Delivery apps                | Static UI (Tailwind + Phosphor Icons)                        |
| 11  | Conventions/vouchers         | Migration 050 schema + backoffice CRUD                       |
| 12  | Post-stay feedback           | Phosphor `Star` icon + `@supabase/supabase-js`               |
| 13  | Homepage redesign            | Tailwind + `embla-carousel-react` + Phosphor Icons           |

---

## What NOT to Add (and Why)

| Library                                                     | Why Not                                                                                                          |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Any Gantt library (SVAR, Bryntum, Syncfusion, shadcn Gantt) | Massive overkill for a 25-room timeline. CSS Grid is simpler, lighter, fully customizable, zero bundle increase. |
| `@smastrom/react-rating` or any rating library              | 50 lines of custom code with existing Phosphor `Star` icon does the job. Library is stale (2 years).             |
| `react-intl` / `next-intl` (for currency)                   | Only need `Intl.NumberFormat` for display currency conversion, not full i18n.                                    |
| `react-step-wizard` / `react-stepzilla`                     | Wizard is conditional rendering + state machine. Not worth a dependency.                                         |
| `wifi-qr-code-generator` npm                                | Already have `qrcode` + WiFi string format helper in codebase.                                                   |
| `react-image-crop` / `react-dropzone`                       | Image upload already works with existing compression pipeline + native `<input type="file">`.                    |
| Socket.io / Pusher / Ably                                   | Supabase Realtime (included in `@supabase/supabase-js`) handles minibar notifications.                           |
| Any chat library (Stream Chat, etc.)                        | Feedback channel is async form submission, not real-time chat.                                                   |
| `react-big-calendar`                                        | Calendar view, not resource timeline. Wrong abstraction for room availability.                                   |
| `sharp` (server-side image processing)                      | Client-side compression via `browser-image-compression` is sufficient.                                           |

---

## External API Dependencies (HTTP only, no npm packages)

| API               | Feature               | Cost             | Auth Required                | Notes                                              |
| ----------------- | --------------------- | ---------------- | ---------------------------- | -------------------------------------------------- |
| frankfurter.app   | Currency conversion   | Free             | No                           | ECB exchange rates, weekday updates, open source   |
| Supabase Realtime | Minibar notifications | Included in plan | Via existing Supabase client | Already available, just needs channel subscription |

---

## Risk Assessment

| Risk                                              | Severity | Mitigation                                                                                                                           |
| ------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Custom Gantt timeline takes longer than estimated | Medium   | Start with read-only view (no drag interactions). Add interactivity incrementally. Budget 2-3 days for the timeline component.       |
| frankfurter.app downtime                          | Low      | Cache rates aggressively (24h). Show "rates may be approximate" disclaimer. Fallback: hardcoded major currency rates updated weekly. |
| Supabase Realtime connection limits               | Low      | Free plan: 200 concurrent connections. More than enough for minibar use case. Paid plan if scaling.                                  |
| HEIC conversion performance on old devices        | Low      | Already mitigated -- `heic2any` is installed and working for document upload in previous milestone.                                  |

---

## Sources

- [@svar-ui/react-gantt v2.4.4](https://www.npmjs.com/package/@svar-ui/react-gantt) -- evaluated, MIT license, rejected for this use case
- [Top 5 React Gantt Charts Compared (2026)](https://svar.dev/blog/top-react-gantt-charts/) -- landscape overview
- [@smastrom/react-rating v1.5.0](https://github.com/smastrom/react-rating) -- evaluated, zero-dep, rejected (trivial to build custom)
- [WiFi QR format spec](https://github.com/evgeni/qifi) -- `WIFI:T:;S:;P:;;` format reference
- [react-day-picker v9 selection modes](https://daypicker.dev/docs/selection-modes) -- already installed, range selection verified
- [frankfurter.app](https://www.frankfurter.app/) -- free exchange rate API, ECB data
- Codebase verification: `apps/accommodations/frontend/package.json`, `apps/backoffice/package.json`, `shared/database/migrations/schema/050-b2b-conventions.sql`, `apps/backoffice/lib/qr/qr-generator.ts`, `apps/coffeeshop/frontend/components/WiFiQuickConnect.tsx`, `apps/accommodations/frontend/lib/image-utils.ts`
