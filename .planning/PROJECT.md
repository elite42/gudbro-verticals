# GUDBRO Verticals

## What This Is

GUDBRO is a multi-vertical platform providing standalone PWAs for hospitality businesses (F&B, accommodations, gym, wellness, laundry, pharmacy, workshops, tours). Each merchant gets their own branded PWA with QR/link access. The platform includes a backoffice admin dashboard, AI Co-Manager, and a convention system linking merchants together.

## Core Value

Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.

## Requirements

### Validated

- PWA frontends created for 8 verticals (coffeeshop, accommodations, tours, gym, wellness, laundry, pharmacy, workshops)
- BottomNav pattern unified (flat center, no elevated buttons)
- Design systems defined per vertical (unique colors, fonts, identity)
- Multi-vertical strategy documented (PWA standalone, not hub)
- Backoffice with 52 pages, ~17,700 LOC
- AI Co-Manager with 15 services
- 2,418 tests passing (2,383 unit + 35 E2E)
- Scaling infrastructure Phase 1-3 complete
- Security hardening Phase 1 complete

### Active

- [ ] QA all vertical PWAs (TypeScript, rendering, UI/UX harmony, navigation)

### Out of Scope

- Backend Accommodations — next milestone
- New vertical creation — all 8 frontends exist
- Backoffice modifications — not in this milestone
- Database migrations — QA only, no schema changes

## Context

- 8 vertical PWAs with mock data, frontend-only
- TypeScript errors found in: wellness (gym/[slug]), accommodations (stay/[code]), shared/database (2 files)
- Accommodations PWA missing BottomNav (inconsistent with other verticals)
- Wellness has legacy /gym routes (gym is now standalone PWA)
- Coffeeshop is most mature (v1+v2 coexistence)
- All new verticals share DM Sans body font and similar CSS variable patterns
- Icons: mix of Phosphor (coffeeshop) and custom SVG (other verticals)

## Constraints

- **Tech stack**: Next.js 14.2.33, Tailwind, Phosphor Icons preferred
- **No backend changes**: QA is frontend-only
- **Mock data**: All verticals use inline mock data, no DB connection
- **Port allocation**: Each vertical has assigned port (3003-3033)

## Key Decisions

| Decision                        | Rationale                                                        | Outcome   |
| ------------------------------- | ---------------------------------------------------------------- | --------- |
| PWA standalone (not hub)        | Not competing with Google/Yelp on discovery                      | — Pending |
| Accommodation as strategic node | First tourist touchpoint, distributes to other verticals         | — Pending |
| Flat BottomNav pattern          | Uniform look across all verticals                                | ✓ Good    |
| DM Sans as shared body font     | Consistency across verticals while allowing unique display fonts | — Pending |

---

_Last updated: 2026-01-29 after milestone v1.0 initialization_
