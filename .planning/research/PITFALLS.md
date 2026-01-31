# Domain Pitfalls: Accommodations v2 (Booking, Owner Dashboard, Service Ordering)

**Domain:** Accommodation booking system, property management dashboard, in-stay service ordering, Stripe integration for hospitality multi-tenant
**Researched:** 2026-01-31
**Overall Confidence:** HIGH (well-documented problem space, verified against existing GUDBRO architecture and PRD)

---

## Critical Pitfalls

Mistakes that cause rewrites, double bookings, payment failures, or data breaches.

### Pitfall 1: Double Booking Race Condition on Availability Calendar

**What goes wrong:** Two guests select the same dates at the same time. Both see the dates as available, both submit a booking request. Without proper concurrency control, both bookings are accepted. The property owner must now cancel one guest, damage their reputation, and potentially arrange alternative accommodation at their cost.

**Why it happens:** The naive flow is: (1) check availability, (2) show form, (3) insert booking. Between steps 1 and 3, another user can complete the same flow. This is a classic TOCTOU (time-of-check-to-time-of-use) race condition. PostgreSQL's default READ COMMITTED isolation level allows this because both transactions read the "available" state before either commits.

**Warning signs:**

- Availability check is a simple SELECT without any locking
- No database constraint preventing overlapping date ranges for the same room/property
- Booking insertion does not verify availability inside the same transaction
- No optimistic locking (version column) on availability records

**Prevention:**

- **Database-level constraint:** Create an exclusion constraint using PostgreSQL's `daterange` type with `&&` (overlap) operator. This makes double booking physically impossible at the DB level, regardless of application bugs:
  ```sql
  ALTER TABLE bookings ADD CONSTRAINT no_overlap
    EXCLUDE USING gist (property_id WITH =, daterange(check_in, check_out) WITH &&)
    WHERE (status NOT IN ('cancelled', 'rejected'));
  ```
- **SELECT FOR UPDATE:** When checking availability before inserting a booking, use `SELECT ... FOR UPDATE` to acquire a row-level lock on the relevant availability/property record. This serializes concurrent booking attempts.
- **Optimistic locking fallback:** Add a `version` column to the availability table. Check the version has not changed between the availability check and the booking insertion.
- **Application-level retry:** When the exclusion constraint rejects a booking, catch the error and show "Sorry, these dates were just booked" instead of a 500 error.

**Detection:** Test by opening two browser tabs, selecting the same dates, and submitting simultaneously. If both succeed, you have the bug.

**Severity:** CRITICAL -- double bookings destroy guest trust and cause real financial liability.
**Phase:** Must be addressed in the database schema phase. The exclusion constraint is the safety net; application logic is the first line of defense.

---

### Pitfall 2: Stripe Authorization Expiry on Accommodation Bookings

**What goes wrong:** You authorize a guest's card at booking time with `capture_method: 'manual'`, planning to capture when the guest checks in or checks out. But standard Stripe authorizations expire after **7 days**. If the guest booked 3 weeks in advance, the authorization expires, the PaymentIntent is cancelled by Stripe, and you have no hold on the guest's card. The guest checks in, you try to capture, and get an error. You now have a guest staying with no payment.

**Why it happens:** Developers assume "authorize now, capture later" works indefinitely. Stripe's default authorization window is 7 days for online payments. Extended authorizations (up to 30 days) require: (a) your Stripe account to have the hotel MCC code **7011**, (b) IC+ pricing (not standard blended pricing), and (c) explicitly requesting `request_extended_authorization: 'if_available'` on the PaymentIntent. Most developers discover this after going live.

**Warning signs:**

- PaymentIntents with `capture_method: 'manual'` being created without checking `capture_before`
- No webhook handler for `payment_intent.canceled` (expired authorizations)
- Bookings more than 7 days in advance with no deposit collection strategy
- Stripe account MCC not set to 7011

**Prevention:**

- **For bookings within 7 days:** Use standard auth-and-capture. Set `capture_method: 'manual'`, capture at check-in or check-out.
- **For bookings 7-30 days out:** Use extended authorization with MCC 7011. Always check the `charge.payment_method_details.card.capture_before` field to know exact expiry.
- **For bookings 30+ days out:** Do NOT use auth-and-capture. Instead, collect a non-refundable deposit (e.g., first night) immediately via standard capture. Charge the remainder at check-in.
- **Hybrid approach (recommended for GUDBRO):** Collect a deposit (30-50%) immediately at booking time as a standard charge. Auth-and-capture the remainder closer to check-in (within 7 days). This is simpler, works on standard Stripe pricing, and matches guest expectations.
- **Webhook handler:** Always handle `payment_intent.canceled` to detect expired authorizations. Notify the owner and attempt to re-authorize or collect payment from the guest.
- **Contact Stripe early:** Request MCC 7011 and extended authorization capability during Stripe account setup, not after launch.

**Detection:** Create a test booking 14 days in advance with a test card. Verify the authorization is still valid after 8 days.

**Severity:** CRITICAL -- failed payments on check-in create awkward situations and revenue loss.
**Phase:** Must be designed in the payment architecture phase. The deposit-vs-auth strategy must be decided before building the booking flow.

---

### Pitfall 3: Stripe Connect Onboarding Friction Killing Merchant Adoption

**What goes wrong:** To receive payouts, each property owner needs a Stripe Connected Account. Stripe's Know Your Customer (KYC) process requires government ID, address verification, bank account details, and sometimes a video selfie. Small property owners in Southeast Asia (your target market) hit walls: their ID is not in English, their bank is not supported, verification takes days, or they abandon the process entirely. You launch with 15 properties but only 3 can receive payments.

**Why it happens:** Stripe Connect Standard or Express onboarding is designed for Western markets. Southeast Asian property owners face: (a) limited bank support in some countries, (b) document verification failures for non-Latin scripts, (c) confusion about business type selection, (d) multi-day verification delays. Developers test with their own (Western) credentials and assume it works for everyone.

**Warning signs:**

- Only testing Connected Account onboarding with US/EU test accounts
- No fallback payment method when Stripe onboarding is incomplete
- No tracking of onboarding completion rates
- Property owner can list property but cannot receive payments

**Prevention:**

- **Start with cash/transfer as default:** GUDBRO already supports cash and bank transfer. Make these the default payment methods. Stripe is an upgrade, not a requirement. Never block property listing on Stripe onboarding.
- **Progressive Stripe onboarding:** Let owners list properties and accept cash bookings immediately. Prompt Stripe setup when they want to accept card payments. Do not front-load the entire KYC process.
- **Use Stripe Connect Custom accounts:** More control over the onboarding flow. You can collect information incrementally and submit it to Stripe as the owner provides it, rather than forcing them through Stripe's hosted onboarding page.
- **Track onboarding funnel:** Monitor how many owners start vs complete Stripe onboarding. Identify where they drop off.
- **Test with SEA credentials:** Test Connected Account creation with Thai, Vietnamese, and Indonesian bank details. Verify payout support for VND, THB, IDR.
- **Consider local payment alternatives:** VNPay and MoMo (already in @shared/payment) may be more accessible for Vietnamese owners than Stripe.

**Detection:** Track Connected Account onboarding completion rate by country. If below 60%, investigate friction points.

**Severity:** CRITICAL -- blocks revenue for the entire platform if owners cannot receive payments.
**Phase:** Must be addressed in the payment architecture phase. Decide the Stripe Connect account type and fallback strategy before building.

---

### Pitfall 4: RLS Policy Gaps When Adding Booking Tables to Existing Multi-Tenant System

**What goes wrong:** New booking-related tables (bookings, availability, service_orders, partner_referrals) are created without RLS policies, or with policies that use incorrect tenant scoping. Owner A can see Owner B's bookings. A guest accessing their in-stay dashboard can enumerate other guests' booking codes. The existing GUDBRO system has 76+ migrations with RLS -- but new tables added in haste often miss it.

**Why it happens:** The accommodations vertical has a complex access model: (1) property owners see their own properties/bookings, (2) guests see their own booking/stay data via booking code (not authenticated), (3) GUDBRO admin sees everything, (4) partners see referrals related to them. This four-tier access model is harder to implement in RLS than the existing single-tier merchant model. Additionally, guests access the in-stay dashboard without Supabase Auth (they use a booking code), so `auth.uid()` returns null -- breaking standard RLS patterns.

**Warning signs:**

- New tables created with `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` but no actual policies
- RLS policies that use `auth.uid()` on tables accessed by unauthenticated guests
- No test verifying cross-tenant isolation on new tables
- Views created without `security_invoker = true` (Postgres 15+)
- Service-role key used in client-side code to bypass RLS

**Prevention:**

- **Write RLS policies alongside CREATE TABLE:** Never commit a migration that creates a table without its RLS policies in the same file.
- **Guest access via API routes, not direct Supabase:** Since guests are unauthenticated, they should NEVER access Supabase directly. All guest-facing data goes through Next.js API routes that use the service-role key server-side with explicit WHERE clauses. This avoids the `auth.uid()` problem entirely.
- **Owner access via RLS with merchant_id:** Owner-facing queries use the authenticated Supabase client. RLS policies filter by `merchant_id` matching the JWT claim, consistent with existing GUDBRO patterns.
- **Write isolation tests:** For each new table: create data as Owner A, attempt to read as Owner B (should fail), attempt to read as unauthenticated guest (should fail unless booking code matches).
- **Audit existing RLS patterns:** Check how `merchants`, `locations`, and existing tables handle RLS. Follow the same patterns exactly.

**Detection:** Run a cross-tenant access audit after each migration. Automated test preferred.

**Severity:** CRITICAL -- data breach, legal liability, trust destruction.
**Phase:** Must be addressed in every phase that touches the database schema. RLS is not a separate task -- it is part of every table creation.

---

### Pitfall 5: Timezone Mismatch Between Booker, Property, and Server

**What goes wrong:** A guest in New York (UTC-5) books check-in for "January 15" at a property in Da Nang (UTC+7). The system stores the date using the server's timezone (UTC) or the guest's browser timezone. The property owner sees the booking as January 14 or January 16 depending on the mismatch. Availability calendar shows wrong dates. Check-in/check-out times are off by a day.

**Why it happens:** Accommodation bookings use **dates** (not datetimes) -- check-in is "January 15" not "January 15 at 14:00." But JavaScript's `Date` object always includes time and timezone. When a guest selects "January 15" in their browser, `new Date('2026-01-15')` is midnight UTC, which is `2026-01-14T19:00:00-05:00` in New York and `2026-01-15T07:00:00+07:00` in Da Nang. If you store this as a timestamp, timezone conversion can shift the date by +/- 1 day.

**Warning signs:**

- Using `TIMESTAMPTZ` for check-in/check-out dates instead of `DATE`
- Dates shift by 1 day for users in different timezones
- Date picker sends ISO datetime strings instead of date-only strings (YYYY-MM-DD)
- No property timezone stored in the database

**Prevention:**

- **Store check-in/check-out as DATE, not TIMESTAMPTZ:** PostgreSQL `DATE` type has no timezone component. "2026-01-15" is always January 15, regardless of who stored it.
- **Send dates as YYYY-MM-DD strings from frontend:** Never convert to a Date object before sending to the API. The date picker value should be a plain string like "2026-01-15".
- **Store property timezone:** Add a `timezone` column to the properties table (e.g., 'Asia/Ho_Chi_Minh'). Use it for check-in/check-out TIME calculations (e.g., "check-in at 14:00 property local time").
- **Display in property timezone:** Always display booking dates in the property's timezone, not the viewer's timezone. A booking for January 15 at a Da Nang property should show January 15 whether viewed from New York or Tokyo.
- **Test with different browser timezones:** Use Chrome DevTools to simulate different timezones and verify dates do not shift.

**Detection:** Create a booking from a browser set to UTC-12 (Baker Island). If the check-in date shifts by 1 day, you have the bug.

**Severity:** CRITICAL -- wrong dates cause missed check-ins, overbookings, and angry guests.
**Phase:** Must be addressed in the database schema phase. DATE vs TIMESTAMPTZ is a foundational decision.

---

## Moderate Pitfalls

Mistakes that cause delays, poor UX, or accumulating tech debt.

### Pitfall 6: Over-Engineering the Hybrid Booking Flow (Instant + Inquiry)

**What goes wrong:** The PRD specifies hybrid booking (instant book for some properties, inquiry-based for others). Developers build two completely separate flows with different state machines, different APIs, different UI components. The codebase doubles in complexity. Edge cases multiply: what if an owner switches from inquiry to instant mid-booking? What about converting an inquiry to a confirmed booking? Each flow has its own bugs.

**Why it happens:** Treating instant booking and inquiry booking as fundamentally different features. In reality, an inquiry is just a booking with `status: 'pending_owner_approval'` instead of `status: 'confirmed'`. The data model is the same. The only difference is the state transition after submission.

**Warning signs:**

- Two separate booking forms with different fields
- Two separate database tables or radically different schemas for instant vs inquiry bookings
- Separate API routes for `/api/book-instant` and `/api/book-inquiry`
- Owner dashboard has separate views for "instant bookings" and "inquiries"

**Prevention:**

- **Single booking model with status field:** One `bookings` table, one booking form, one API. The `booking_mode` field on the property determines whether a new booking starts as `confirmed` (instant) or `pending_approval` (inquiry).
- **Single state machine:** `pending_payment -> pending_approval -> confirmed -> checked_in -> checked_out -> completed` (inquiry adds one step). Instant booking skips `pending_approval`.
- **Owner setting controls the fork:** `property.booking_mode = 'instant' | 'inquiry' | 'hybrid'`. Hybrid means the owner reviews bookings but they auto-confirm after 24h if no response.
- **Convert inquiry to booking:** This is just a status transition, not a new entity.

**Detection:** If you find yourself writing `if (bookingType === 'instant') { ... } else { ... }` more than 3 times, you are diverging too much.

**Severity:** MODERATE -- causes unnecessary complexity and maintenance burden.
**Phase:** Must be decided in the data model phase. One booking model is the foundation.

---

### Pitfall 7: Service Ordering Without Clear Fulfillment States

**What goes wrong:** Guest orders breakfast for 7:30 AM. The order is "submitted" but there is no clear state machine for fulfillment. Did the owner see it? Is the kitchen preparing it? Is it ready? Was it delivered? The guest has no visibility. The owner has no workflow. Orders get lost, meals arrive cold or not at all. Guests stop using the service ordering feature.

**Why it happens:** Building the order submission form is easy and visible. Building the fulfillment pipeline (notifications to owner, status tracking, kitchen display, delivery confirmation) is harder and invisible. Teams ship the form first, plan to add fulfillment "later," but "later" never comes. The PRD mentions configurable automation levels but does not define the state transitions.

**Warning signs:**

- Service orders have only two states: "submitted" and "completed"
- No real-time notification to the property owner when an order comes in
- No way for the owner to acknowledge receipt of an order
- Guest cannot see order status after submission
- No timeout/escalation for unacknowledged orders

**Prevention:**

- **Define the state machine explicitly:**
  ```
  submitted -> acknowledged -> preparing -> ready -> delivered -> completed
  ```
  Not all states are required for all service types (laundry does not need "preparing" in the same way breakfast does), but the framework must exist.
- **Configurable automation levels (from PRD):**
  - **Manual:** Owner receives WhatsApp notification, manually updates status in dashboard
  - **Semi-auto:** Auto-acknowledge after 5 minutes if owner does not reject, owner updates remaining states
  - **Auto:** Auto-acknowledge, auto-mark as preparing, owner only confirms delivery
- **Notification on submission is mandatory:** At minimum, send a WhatsApp message or push notification to the owner when a service order comes in. Without this, the feature is broken.
- **Guest-facing status:** Show the guest at least: "Received" / "Being prepared" / "Ready" -- even if updates are manual.
- **Timeout escalation:** If an order is not acknowledged within 15 minutes, send a reminder to the owner. After 30 minutes, notify the guest that the order may be delayed.

**Detection:** Submit a test service order. If there is no notification to the owner within 1 minute, the feature is incomplete.

**Severity:** MODERATE -- makes the in-stay service feature useless without it.
**Phase:** Must be designed alongside the service ordering UI, not after.

---

### Pitfall 8: Owner Dashboard Overload for Non-Technical Users

**What goes wrong:** The owner dashboard exposes every feature at once: property management, booking calendar, service orders, partner management, pricing, availability, QR codes, analytics. A small property owner in Da Nang who manages 2 apartments is overwhelmed. They cannot find where to confirm a booking. They miss service orders buried in a sub-menu. They stop using the dashboard and go back to WhatsApp.

**Why it happens:** Building for power users instead of the target persona ("Mario" -- medium tech comfort, 1-5 properties). Adding every feature to the sidebar because "the owner might need it." No progressive disclosure. The backoffice already has a complex structure (GUDBRO admin features) -- adding owner features without a separate, simpler experience creates confusion.

**Warning signs:**

- Sidebar has 10+ items visible at once
- Owner needs to navigate 3+ clicks to confirm a booking
- No onboarding/tutorial flow
- Dashboard looks identical for an owner with 1 property and one with 5
- No distinction between "daily tasks" (confirm bookings, fulfill orders) and "setup tasks" (add photos, set pricing)

**Prevention:**

- **Two-zone dashboard:** (1) "Today" view showing pending bookings, active service orders, and unread messages. (2) "Manage" section for property setup, pricing, partners, etc. The daily zone is the default landing page.
- **Notification-driven workflow:** Owner gets a WhatsApp message "New booking request from Sarah for Jan 15-18. [Confirm] [Decline]". Quick actions via WhatsApp reduce the need to open the dashboard at all.
- **Progressive disclosure:** Show only the features the owner has set up. If they have not added any partners, do not show the partners section with an empty state -- hide it and suggest it when relevant.
- **Mobile-first dashboard:** This persona uses a smartphone primarily. The dashboard must be fully functional on mobile, not just "responsive."
- **Guided setup:** First-time flow: "Add your first property -> Upload photos -> Set pricing -> Generate QR code -> Done!" Checkmark each step.

**Detection:** Give the dashboard to someone who is not a developer. Time how long it takes them to confirm a booking. If more than 30 seconds, simplify.

**Severity:** MODERATE -- directly impacts owner adoption and retention.
**Phase:** Must be addressed in the owner dashboard design phase. UX decisions before feature implementation.

---

### Pitfall 9: Integrating Stripe Alongside Existing @shared/payment Without a Clear Payment Strategy

**What goes wrong:** The existing `@shared/payment` module supports cash, VNPay, MoMo, crypto, card, Apple Pay, Google Pay, and QR payments. Adding Stripe Connect for accommodation bookings creates confusion: does Stripe replace the existing card processing? Do deposits go through Stripe while in-stay services use the existing payment flow? Which payment methods are available for bookings vs services? The owner sees different payment options in different contexts. Refunds go through different systems. Financial reporting is fragmented.

**Why it happens:** The existing payment module was built for simpler transactions (food ordering, wellness booking). Accommodation bookings have unique payment patterns: deposits, auth-and-capture, split payments (deposit now + balance at check-in), cancellation refunds with different policies. Bolting these onto the existing module without a clear architecture creates spaghetti.

**Warning signs:**

- Two separate payment processing paths (existing module + new Stripe Connect code)
- Different refund logic for booking deposits vs service orders
- No clear mapping of "which payment method is available for which transaction type"
- Owner cannot see a unified financial view across bookings and services
- `PaymentIntent` from Stripe and `PaymentIntent` from the existing types module used interchangeably

**Prevention:**

- **Extend @shared/payment, do not duplicate:** Add accommodation-specific payment types (deposit, balance, refund) to the existing module. Add `transaction_type: 'booking_deposit' | 'booking_balance' | 'service_order' | 'partner_referral'` to PaymentIntent.
- **Payment method matrix:** Define explicitly which payment methods are available for which transaction:
  | Transaction | Cash | Card (Stripe) | VNPay | MoMo | Crypto |
  |---|---|---|---|---|---|
  | Booking deposit | No | Yes | Yes | Yes | Yes |
  | Booking balance | Yes (at check-in) | Yes | Yes | Yes | No |
  | In-stay service | Yes | Yes | Yes | Yes | No |
  | Partner referral | Yes | No | No | No | No |
- **Single financial ledger:** All transactions (regardless of payment method or type) recorded in one table with consistent fields. Owner dashboard shows unified revenue.
- **Clear Stripe boundary:** Stripe Connect handles card payments for bookings. VNPay/MoMo handle local digital payments. Cash is recorded manually by owner. The shared payment module orchestrates which provider handles which method.

**Detection:** If you find yourself importing payment utilities from two different paths, the integration is fragmenting.

**Severity:** MODERATE -- creates tech debt and confusing owner experience if not designed upfront.
**Phase:** Must be addressed in the payment architecture phase, before implementing any payment flow.

---

### Pitfall 10: QR Code In-Stay Access Without Proper Booking Verification

**What goes wrong:** Room QR codes are static (they do not change per guest). A previous guest who scanned the QR still has access to the in-stay dashboard after checkout. Or someone photographs the QR code and shares it. The dashboard shows the current guest's booking details, WiFi credentials, and service ordering capability to unauthorized people.

**Why it happens:** The PRD describes two QR strategies: (1) booking-specific QR (`/stay/BK-ABC123`) which changes per booking, and (2) permanent room QR (`/checkin/{propertyId}/{roomId}`) which requires booking code entry. If the permanent QR is used but verification is weak (e.g., just entering a room number), anyone can access the dashboard.

**Warning signs:**

- QR code URL contains no secret or time-limited token
- In-stay dashboard accessible with just a room number (no booking code verification)
- No session expiry on in-stay dashboard access
- Previous guest can still access dashboard after checkout

**Prevention:**

- **Booking code verification:** Permanent room QR leads to a verification page requiring last name + booking code (or a PIN sent via WhatsApp). This is already in the PRD -- enforce it.
- **Session expiry:** In-stay dashboard access expires at checkout time + 2 hours. After that, the booking code no longer grants access.
- **Booking-status check:** Every API call from the in-stay dashboard should verify the booking status is `checked_in` or `confirmed`. Requests from `checked_out` or `cancelled` bookings return 403.
- **Rate limit verification attempts:** Max 5 failed booking code attempts per IP per hour. Prevents brute-forcing.
- **Do not expose sensitive data without verification:** WiFi credentials, guest name, and service ordering should only be visible after successful verification, not on the initial QR scan landing page.

**Detection:** Check out a test booking. Try accessing the in-stay dashboard URL. If it still works, access control is broken.

**Severity:** MODERATE -- privacy issue, could expose guest data and allow unauthorized service orders.
**Phase:** Must be addressed when building the in-stay dashboard authentication flow.

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable without major rework.

### Pitfall 11: Booking Form Abandonment from Too Many Fields

**What goes wrong:** The booking form asks for: name, email, phone, nationality, passport number, arrival time, number of guests (adults + children), special requests, payment details, and terms acceptance. The guest abandons at field 6. Conversion rate drops below 5%.

**Prevention:**

- **Minimal required fields at booking:** Name, email, dates, guests count, payment. That is it. Everything else is collected post-booking or at check-in.
- **Progressive collection:** After booking confirmation, send a pre-arrival form (via WhatsApp or email) for passport details, arrival time, special requests. Guests are more willing to provide details after committing.
- **Guest checkout (no account required):** Per PRD user story US-2.5, guests should book without creating an account. Do not force registration.
- **Auto-fill where possible:** If the guest has booked before, pre-fill from previous booking data.

**Phase:** Address in the booking flow UI phase.

---

### Pitfall 12: Currency Display Confusion for Multi-Currency Properties

**What goes wrong:** Property owner sets prices in VND (Vietnamese Dong). Guest from Europe sees "3,500,000" and panics -- is that $3.5 million? The conversion to EUR is not shown, or it is shown with a stale exchange rate. Guest books at one price, exchange rate changes, guest disputes the charge.

**Prevention:**

- **Display in owner's currency with conversion hint:** Show "3,500,000 VND (~135 EUR)" using a real-time exchange rate.
- **Charge in owner's currency:** Always charge in the property's currency. Let Stripe handle currency conversion for international cards. This avoids exchange rate disputes.
- **Show "prices in VND" prominently:** Make it clear which currency is used before the guest enters the booking flow.
- **Use the existing `SUPPORTED_CURRENCIES` from @shared/payment** for consistent formatting. The module already supports VND, USD, EUR, KRW, JPY, etc.

**Phase:** Address in the booking flow UI phase.

---

### Pitfall 13: Partner Referral Commission Tracking Without Confirmation

**What goes wrong:** Guest clicks "Book Tour" in the in-stay dashboard, is redirected to the partner (WhatsApp or partner website). The referral is logged. But did the guest actually complete the tour? Did they pay? The property owner sees "commission earned: $5" but the partner says the guest never showed up. Disputes arise. Trust in the referral system breaks down.

**Prevention:**

- **Referral status tracking:** `submitted -> confirmed_by_partner -> completed -> paid_out`. Only count revenue on `completed`.
- **Partner confirmation required:** Partners must confirm the guest used the service (via WhatsApp reply, partner dashboard, or GUDBRO link). Without confirmation, the referral stays in `submitted` and no commission is counted.
- **Monthly reconciliation:** Owner and partner review referrals monthly. Disputed referrals can be marked and resolved.
- **Start simple:** For MVP, track referrals as "clicks" (how many guests tapped "Book Tour") but do not promise commission tracking until partner confirmation flow exists.

**Phase:** Address in the partner integration phase. Do not promise automated commission before building confirmation.

---

### Pitfall 14: Neglecting the Existing In-Stay Dashboard When Adding Booking Mode

**What goes wrong:** The existing accommodations app already has an in-stay dashboard (`/stay/[code]/page.tsx`). When building booking mode, developers create a completely new routing structure, new shared components, and new API patterns that diverge from the existing code. Now there are two architectural patterns in one app. State management, data fetching, and component structure are inconsistent. Maintenance burden doubles.

**Prevention:**

- **Audit existing code first:** Read the existing `app/stay/[code]/page.tsx`, `app/layout.tsx`, and `app/page.tsx`. Understand the current patterns before adding new routes.
- **Extend, do not replace:** Add booking mode routes (`/[slug]/page.tsx`) using the same layout, data fetching, and component patterns as the existing in-stay routes.
- **Shared components in `components/shared/`:** Both booking mode and in-stay mode need headers, footers, property info cards, contact buttons. Build shared components once.
- **Consistent API patterns:** If existing code uses Next.js API routes with service-role Supabase client, new booking APIs should follow the same pattern.

**Phase:** Address at the start of every implementation phase. "Read existing code before writing new code."

---

## Phase-Specific Warnings

| Phase Topic          | Likely Pitfall                                        | Mitigation                                              |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| Database Schema      | Double booking race condition (Pitfall 1)             | Exclusion constraint + SELECT FOR UPDATE                |
| Database Schema      | Timezone date handling (Pitfall 5)                    | Use DATE type, store property timezone                  |
| Database Schema      | RLS gaps on new tables (Pitfall 4)                    | Write RLS in same migration as CREATE TABLE             |
| Database Schema      | Over-engineering hybrid booking (Pitfall 6)           | Single booking model with status field                  |
| Payment Architecture | Stripe auth expiry (Pitfall 2)                        | Deposit strategy, not pure auth-and-capture             |
| Payment Architecture | Stripe Connect onboarding (Pitfall 3)                 | Cash/transfer as default, progressive Stripe onboarding |
| Payment Architecture | Payment module fragmentation (Pitfall 9)              | Extend @shared/payment, define payment method matrix    |
| Booking Flow UI      | Form abandonment (Pitfall 11)                         | Minimal required fields, progressive collection         |
| Booking Flow UI      | Currency confusion (Pitfall 12)                       | Display conversions, charge in owner's currency         |
| In-Stay Dashboard    | QR access security (Pitfall 10)                       | Booking code verification, session expiry               |
| In-Stay Dashboard    | Ignoring existing code (Pitfall 14)                   | Audit and extend existing patterns                      |
| Service Ordering     | Missing fulfillment states (Pitfall 7)                | Define state machine, notification on submission        |
| Owner Dashboard      | UX overload (Pitfall 8)                               | Two-zone dashboard, WhatsApp-driven workflow            |
| Partner Integration  | Commission tracking without confirmation (Pitfall 13) | Partner confirmation flow, monthly reconciliation       |

---

## Summary: Top 5 Mistakes to Avoid

1. **Do not store check-in/check-out as timestamps.** Use PostgreSQL `DATE` type. Timezone mismatches will shift booking dates by +/- 1 day for international guests, causing double bookings and missed check-ins.

2. **Do not rely on Stripe auth-and-capture for bookings more than 7 days out.** Standard authorizations expire after 7 days. Use a deposit + balance strategy instead. Request MCC 7011 and extended authorization from Stripe if you need longer holds.

3. **Do not build two separate flows for instant booking and inquiry.** They are the same data model with different initial statuses. One booking table, one form, one API, one state machine with an optional approval step.

4. **Do not skip the double-booking exclusion constraint.** Application-level availability checks are not sufficient against concurrent requests. PostgreSQL's `EXCLUDE USING gist` with `daterange` overlap makes double bookings physically impossible at the database level.

5. **Do not force Stripe Connect onboarding before allowing property listings.** Your target users are small property owners in SEA. Many will struggle with KYC. Let them list and accept cash bookings first. Stripe is an upgrade path, not a prerequisite.

---

## Sources

- [Handling the Double-Booking Problem in Databases](https://adamdjellouli.com/articles/databases_notes/07_concurrency_control/04_double_booking_problem) -- Race condition patterns and database-level prevention
- [How to Solve Race Conditions in a Booking System](https://hackernoon.com/how-to-solve-race-conditions-in-a-booking-system) -- Pessimistic vs optimistic locking for booking systems
- [Stripe: Place a Hold on a Payment Method](https://docs.stripe.com/payments/place-a-hold-on-a-payment-method) -- Authorization and capture documentation, 7-day default window
- [Stripe: Extended Authorizations](https://docs.stripe.com/payments/extended-authorization) -- 30-day holds for hospitality, MCC requirements
- [Stripe: Payment Capture Strategies](https://stripe.com/resources/more/payment-capture-strategies-timing-risks-and-what-businesses-need-to-know) -- Risks of delayed capture, cash flow impact
- [Stripe: Build a Marketplace](https://docs.stripe.com/connect/end-to-end-marketplace) -- Connected account types, onboarding flows
- [Stripe: Hospitality Payment Processing](https://stripe.com/resources/more/hospitality-payment-processing) -- Pre-auth, incremental charges, hospitality-specific patterns
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) -- RLS documentation, performance considerations
- [Enforcing RLS in Multi-Tenant Architecture](https://dev.to/blackie360/-enforcing-row-level-security-in-supabase-a-deep-dive-into-lockins-multi-tenant-architecture-4hd2) -- Multi-tenant RLS patterns and pitfalls
- [Supabase Best Practices](https://www.leanware.co/insights/supabase-best-practices) -- Security, scaling, and maintainability
- [7 Booking System Mistakes Hotels Make](https://spiltmilkwebdesign.com/7-booking-system-mistakes-hotels-make-and-how-to-fix-them/) -- UX and conversion pitfalls
- [Common Problems with Hotel Booking Engines](https://traveltekpro.com/common-problems-with-hotel-booking-engines-and-how-to-fix-them/) -- Loading speed, mobile, payment security
- [How Hotel Kitchens Can Take Full Control of Room Service Orders](https://www.stay-app.com/blog/how-hotel-kitchens-can-take-full-control-of-room-service-orders) -- Service order fulfillment challenges
- [Hotel Automation Best Practices](https://www.bookboost.io/post/automation-hotel-best-practices-save-time) -- Configurable automation, human touch balance
- [Design Hotel Booking System: Step-by-Step Guide](https://www.systemdesignhandbook.com/guides/design-hotel-booking-system) -- System design patterns for availability management
