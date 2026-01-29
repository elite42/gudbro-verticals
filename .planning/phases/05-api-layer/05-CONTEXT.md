# Phase 5: API Layer - Context

**Gathered:** 2026-01-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Five Next.js API routes serving stay data, booking verification, services, deals, and property info. All routes connect to Supabase with proper error handling. Routes live in the Accommodations frontend app (`apps/accommodations/frontend/`).

</domain>

<decisions>
## Implementation Decisions

### Verification and guest session

- Guest submits last name + booking code (BK-XXXXXX) via POST `/api/stay/verify`
- Verify returns a JWT token signed server-side with payload `{ bookingId, propertyId, exp }`
- Token valid until checkout date + 24h buffer (not a fixed TTL)
- No refresh token — guest re-verifies if token expires (rare edge case)
- GET `/api/stay/[code]` is public (returns minimal data: property name, check-in/out dates) — used for the pre-login verification screen
- All other routes (services, deals, property) require Authorization header with JWT

### API response structure

- Denormalized responses optimized for frontend consumption
- `/api/stay/[code]` returns everything in one call: property info, room, dates, WiFi, host contact — dashboard makes one fetch on mount
- `/api/stay/[code]/services` returns categories with nested items: `{ categories: [{ name, items: [...] }] }`
- `/api/stay/[code]/deals` returns flat array of deals with partner info
- No caching headers — live Supabase queries, volume is single-guest level
- All responses wrapped in `{ data, error }` for consistency

### Error handling and edge cases

- Booking not found: 404 `{ error: "booking_not_found" }`
- Booking expired (checkout passed): 410 Gone `{ error: "booking_expired" }` — frontend shows "your stay has ended"
- Verification failed (wrong last name): 401 `{ error: "verification_failed" }` — generic message, doesn't reveal if code exists
- Token expired/invalid: 401 `{ error: "session_expired" }`
- No rate limiting for now — volume too low to justify
- Server errors: 500 generic, internal logging

### Multi-language in responses

- English only at launch — seed data is in English
- Routes return data in DB language (English)
- No Accept-Language header processing for now
- Future: `?lang=vi` query param with translations table JOIN
- Frontend handles static UI labels (already translated in-app), backend serves only dynamic data (service names, descriptions)

### Claude's Discretion

- JWT signing library choice and secret management approach
- Supabase client initialization pattern (service role vs anon key per route)
- Exact response field names and TypeScript types
- API route file organization within the app

</decisions>

<specifics>
## Specific Ideas

- The public route GET `/api/stay/[code]` should be lightweight — it's what the guest sees first after scanning the QR code
- Response for the main stay endpoint should feel like "everything you need for your stay" in one payload
- Error messages should be translatable strings (keys like "booking_not_found"), not user-facing text — frontend maps to localized messages

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 05-api-layer_
_Context gathered: 2026-01-29_
