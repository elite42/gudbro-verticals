# Phase 6: In-Stay Dashboard - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Connect the Accommodations In-Stay Dashboard frontend to real backend data from Phase 5 API routes. Replace all mock data with API calls. Extend the database and API to serve data for sections not covered by Phase 5 (visa, useful numbers, quick actions). The guest verifies their booking via code + last name, then accesses a full dashboard with real property, stay, services, deals, and utility data.

Delivery apps section is deferred — all other existing dashboard sections are in-scope.

</domain>

<decisions>
## Implementation Decisions

### Dashboard Sections Scope

- All existing mock sections stay EXCEPT delivery apps (deferred)
- Sections with Phase 5 backend: WiFi card, welcome/stay summary, services carousel, local deals, contact host, checkout info — wire directly to existing APIs
- Sections WITHOUT Phase 5 backend: visa status, quick actions, useful numbers, return guest banner — extend DB schema and API routes to serve real data
- This means Phase 6 includes both frontend integration AND backend extensions for missing data

### Backend Extensions Required

- **Visa rules**: Store per-country visa exemption data accessible via property/guest nationality. Serve via API.
- **Useful numbers**: Emergency and local service numbers stored per property/region. Serve via property API or dedicated endpoint.
- **Quick actions**: Property-configurable actions (room service, concierge, housekeeping, report issue). Each action opens WhatsApp with pre-filled message to host (MVP approach — simple, no in-app forms or notification system needed).
- **Return guest banner**: Property-level optional promo message stored in DB. If present, show banner; tap opens booking link or WhatsApp. If absent, hide banner. Simple field, no promo/loyalty system.

### Verification Flow

- Landing page (`/`): Clean verification screen — property branding (logo/photo from DB), last name field, booking code field, "Access your stay" button. No marketing content, no reviews, no gallery. The guest scanned a QR in their room — they need access, not convincing.
- After successful verification: redirect to `/stay/[code]` dashboard with JWT token
- Error states: clear message for wrong credentials, expired booking, or server error. Generic enough to prevent booking code enumeration.

### Session Persistence

- JWT token saved in localStorage after successful verification
- Guest reopens PWA → auto-redirected to dashboard without re-verifying
- Token expires at checkout date + 24h (already implemented in Phase 5)
- If token expired or invalid → redirect back to verification screen
- This is an in-room QR use case — convenience over high security. The booking code itself is the access control.

### Claude's Discretion

- Loading states strategy (skeletons, spinners, or placeholder cards)
- Error state visual design
- Exact layout adjustments when wiring real data (mock may have different data shapes)
- Whether to split the dashboard page into sub-components during integration
- How to structure the new DB migrations (extend existing tables vs new tables for visa/useful numbers)
- Quick actions WhatsApp message templates

</decisions>

<specifics>
## Specific Ideas

- Quick actions use WhatsApp pre-filled messages (e.g., "Room Service request - Room 203, Property Beach View"). Simple and works immediately without building a notification system.
- Return guest banner is a soft-sell, not a hard requirement — if the property hasn't configured a promo message, the banner simply doesn't appear.
- The verification landing should feel like a hotel check-in kiosk: branded, minimal, purposeful.
- Visa rules are read-only reference data — no workflow, no extension booking integration in this phase.

</specifics>

<deferred>
## Deferred Ideas

- **Delivery apps section** (Grab, ShopeeFood, Baemin) — deferred from Phase 6, add to backlog
- **In-app request forms** for quick actions (form + backend notification to host) — future enhancement over WhatsApp
- **Loyalty/promo system** — return guest banner is simple DB field for now, no promo engine
- **Visa extension booking** — current phase shows status only, no integration with extension partners

</deferred>

---

_Phase: 06-in-stay-dashboard_
_Context gathered: 2026-01-29_
