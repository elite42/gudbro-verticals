# Phase 36: Guest Requests + Concierge - Context

**Gathered:** 2026-02-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Tourist Concierge hub as the central discovery point for guests, accessible from bottom nav center button. Combines local information, emergency contacts, safety tips, cultural tips, transport info, and useful numbers. Includes Explore page for local attractions. Merchant controls section visibility via backoffice toggles.

Requirements: NAV-03, NAV-06, NAV-07, CON-01, CON-02, CON-03, CON-04, CON-05

</domain>

<decisions>
## Implementation Decisions

### Backoffice Toggles

- Useful numbers: predefined set per country/city, merchant toggles on/off the relevant ones (no custom CRUD)
- Concierge section visibility: merchant controls which sections appear for their guests

### Claude's Discretion

- **Toggle granularity**: Claude decides whether toggles are macro-section only (5 toggles) or macro + sub-section level — choose what's most practical
- **Toggle placement**: Claude decides whether Concierge toggles go in a new Settings tab or inside the existing PropertyDataForm — choose what's most architecturally coherent with Phase 32 patterns
- **Hub layout and navigation**: Card-based sections, visual hierarchy, how guests navigate between the 5 areas (Discover, Emergency, Safety, Culture, Transport) plus quick links to WiFi, Documents, Contacts
- **Safety & Emergency UX**: Click-to-call for emergency numbers/embassies, accordion expand for safety tips by category (transport, money, food, street, hotels, tours, digital), visual priority for critical info
- **Cultural content**: Dos/don'ts format, recommended apps section, transport info — format and detail level
- **Explore/Map page**: Local attractions, tours, experiences layout — cross-vertical deep-links where applicable
- **Useful numbers page**: Dedicated page linked from Concierge hub, categories, display format for the predefined set

</decisions>

<specifics>
## Specific Ideas

- Bottom nav center button opens Concierge (already decided in Phase 33 NAV restructure)
- Safety tips organized by 7 categories: transport, money, food, street, hotels, tours, digital
- Useful numbers are country/city-specific predefined lists (not merchant-authored content)
- Existing Tourist Safety Guide content available in `docs/features/TOURIST-SAFETY-GUIDE.md` and useful numbers spec in `docs/backlog/specs/P2/USEFUL-NUMBERS.md` — researcher should check these

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 36-guest-requests-concierge_
_Context gathered: 2026-02-02_
