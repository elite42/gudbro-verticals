# Phase 24: Analytics, Deals & Communication - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Owner analytics dashboard (occupancy, revenue, ADR, service revenue), local deals CRUD with guest discovery and click tracking, and automated guest email notifications (booking confirmation + pre-arrival with QR). WhatsApp deep-links from property page and In-Stay Dashboard.

</domain>

<decisions>
## Implementation Decisions

### Analytics Layout

- Top row: 4 KPI cards (occupancy rate %, total revenue, ADR, service revenue) with trend indicator vs previous period
- Period selector: last 7 days, 30 days, 90 days, 12 months — default 30 days
- Revenue chart: bar chart by month, stacked by room type + service revenue as separate color
- Occupancy chart: line chart showing daily occupancy % over selected period
- Revenue breakdown table below charts: by room type and by service category
- No real-time updates — data refreshed on page load and period change
- Server-computed aggregates via API (not client-side calculation)
- Reuse existing backoffice layout and sidebar navigation pattern

### Local Deals

- Owner CRUD: partner name, discount description, deal URL, optional image, active/inactive toggle
- Deal card in In-Stay Dashboard: compact card with partner name, discount badge, short description
- Deals section in In-Stay Dashboard after services, before contact — horizontal scroll on mobile
- Click tracking: log guest_id (from JWT), deal_id, timestamp to click_logs table
- External link opens in new tab with tracking redirect through API route
- No approval workflow — owner manages their own deals directly
- Maximum simplicity: no categories, no expiration dates in v1 (owner toggles active/inactive)

### Email Communication

- Booking confirmation email: booking code, property name, dates, room type, price breakdown, payment status, property address with map link, host WhatsApp link
- Pre-arrival email: sent 1 day before check-in, includes QR code for In-Stay Dashboard access, check-in time, property directions, WiFi info if available
- Plain HTML email template — clean, mobile-responsive, property branding (name + colors from customization)
- Send via Supabase Edge Function + Resend API (or similar transactional email service)
- Fallback: if email fails, booking confirmation still shows on confirmation page (email is enhancement, not gate)
- No email for cancellations in v1 — owner handles via WhatsApp

### WhatsApp Integration

- Property page: "Contact Host" button with WhatsApp deep-link, pre-filled message with property name
- In-Stay Dashboard: "Chat with Host" in header/nav area, pre-filled with guest name and room
- Owner notifications: booking confirmation, new inquiry, new service order — via WhatsApp deep-link URL in dashboard (not automated sending)
- Message templates: simple text with key info (booking code, guest name, dates)

### Claude's Discretion

- Exact chart library choice (recharts recommended — already common in React ecosystems)
- Email template HTML/CSS details
- KPI calculation edge cases (partial months, no data states)
- Click tracking table schema details
- Loading states and error handling for analytics data

</decisions>

<specifics>
## Specific Ideas

- Analytics should feel like a simple Airbnb host dashboard — not a BI tool
- Deals are meant for local partnerships (restaurants, tours, transport) — keep it lightweight
- Pre-arrival email is the key touchpoint that drives In-Stay Dashboard adoption via QR
- All WhatsApp is deep-link based (wa.me/) — no API integration needed

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

_Phase: 24-analytics-deals-communication_
_Context gathered: 2026-01-31_
