# Phase 7: F&B Integration - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Properties with a linked F&B vertical deep-link to the coffeeshop PWA; properties without F&B show a simple static menu from existing services data. Conventions system connects to properties via property_id for property-specific deals.

</domain>

<decisions>
## Implementation Decisions

### Deep-link experience

- Coffeeshop PWA opens in a new tab (both from dashboard link and physical QR at restaurant table)
- URL uses merchant slug: `/coffeeshop/[linked_fnb_slug]` — consistent with existing coffeeshop PWA routing
- Guest can only view the menu (view-only), no ordering in v1.1
- No special banner or context passed — standard coffeeshop PWA experience

### Menu statico (no F&B linked)

- Uses existing service items from Phase 4 services table (categories: restaurant, breakfast, minibar)
- Shows item photos if available in the data
- Prices shown in local currency with abbreviated format (85k VND) using Phase 6 currency pattern
- Future consideration: manager may want to add products with photos and descriptions (not in v1.1 scope)

### Punto di accesso nel dashboard

- Quick action dedicata with ForkKnife icon (Phosphor) and label "Restaurant"
- Conditional: appears only if property has `has_linked_fnb=true` OR has service items in F&B categories
- If F&B linked: tap opens coffeeshop PWA directly in new tab (zero intermediate steps)
- If no F&B linked: tap opens static menu view within the dashboard

### Conventions & deals collegamento

- Extend existing local deals section (Phase 6) — no separate section
- Deals are property-specific (each property has its own conventions with local merchants)
- New migration adds `property_id` FK to conventions table (migration 050) for property filtering
- Seed data for demo in v1.1 (backoffice management in future milestone)

### Claude's Discretion

- Whether to show a small banner in coffeeshop PWA for hotel guests returning to dashboard
- Static menu layout choice (list by categories vs collapsible cards)
- Exact handling of properties with both F&B link and F&B service items

</decisions>

<specifics>
## Specific Ideas

- Two real-world scenarios converge: QR code on restaurant table + link from hotel room dashboard — both lead to coffeeshop PWA
- Manager typically uses same name/logo for hotel and restaurant; in rare cases a different name/logo can be specified
- Currency display uses abbreviated format (85k not 85,000 VND)

</specifics>

<deferred>
## Deferred Ideas

- Currency converter module — let tourist see prices in their own currency (simple, useful feature for future phase)
- Rich F&B menu with photos, descriptions, allergens (beyond services table) — future enhancement
- Backoffice page for managers to configure property conventions — future milestone (v1.2+)

</deferred>

---

_Phase: 07-fnb-integration_
_Context gathered: 2026-01-29_
