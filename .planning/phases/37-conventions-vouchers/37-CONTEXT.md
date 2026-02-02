# Phase 37: Conventions + Vouchers - Context

**Gathered:** 2026-02-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Adapt the existing conventions system for accommodations with benefit scoping (per_order, per_night, per_stay, flat), display convention partner cards in the guest in-stay dashboard, and add voucher code validation in the booking flow with discount calculation based on scope and stay duration.

Requirements: INF-03 (conventions adapted for accommodations), GXP-05 (convention restaurant cards with visual display).

Dependencies: Phase 30 (shared module audit), Phase 34 (service catalog for voucher-eligible items).

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

User explicitly chose "Tu decidi tutto" — Claude has full flexibility on all implementation decisions:

- **Convention cards layout**: Card design, information density, placement in dashboard, tap action
- **Voucher field UX**: Position in booking flow, validation feedback, discount display format
- **Benefit scope calculation**: How per_order/per_night/per_stay/flat discounts are computed and shown to guest vs merchant
- **Partner data display**: What info shows per partner (name, logo, discount %, category)
- **Error states**: Invalid/expired/already-used voucher messaging
- **Backoffice configuration**: How merchant manages convention partnerships and benefit scopes

Claude should follow existing PWA design patterns (Phosphor icons duotone, rounded cards, color accents) and match the conventions module patterns already in the coffeeshop vertical.

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Follow existing conventions module patterns from coffeeshop vertical and adapt for accommodations context.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

_Phase: 37-conventions-vouchers_
_Context gathered: 2026-02-02_
