# Domain Pitfalls: Frictionless QR Room Access (Auth-Optional Migration)

**Domain:** Removing auth barriers from existing accommodations PWA, QR-based room access, progressive authentication, configurable security, document upload, backward compatibility
**Researched:** 2026-01-31
**Overall Confidence:** HIGH (verified against existing GUDBRO codebase + industry patterns)
**Context:** Adding frictionless QR scan access to existing Accommodations PWA that currently requires booking code + last name verification before showing any dashboard content.

---

## Critical Pitfalls

Mistakes that cause security breaches, unauthorized service orders, or require architectural rewrites.

### Pitfall 1: Stale QR Reuse -- Previous Guest Orders Room Service After Checkout

**What goes wrong:** Guest A checks out on Monday. Guest B checks in on Monday afternoon. Guest A still has the QR URL bookmarked or in browser history. They scan it (or tap the bookmark) and land on the in-stay dashboard -- now showing Guest B's room data, WiFi, and service ordering. Guest A orders room service charged to Guest B. Or worse: Guest A sees Guest B's personal data (name, booking details, country).

**Why it happens:** The current system ties QR codes to booking codes (`/stay/BK-ABC123`). When switching to room-based QR codes (`/room/{propertyId}/{roomId}`), the QR is permanent and the "current guest" is resolved server-side. If the resolution logic uses "most recent active booking for this room" without verifying the requester is actually that guest, anyone with the room URL gets access.

**Warning signs:**

- Room-based QR URL contains no per-guest secret or token
- Server resolves "current guest" purely from room ID + date range
- No re-verification required after initial QR scan
- JWT from previous guest still valid (checkout date + 24h buffer in current `auth.ts`)
- Browser `localStorage` retains old session tokens across guests

**Prevention:**

- **Never auto-resolve guest identity from room alone.** The QR scan should land on an intermediate page: show property name, WiFi (low-risk info), and a "View your stay" button that requires lightweight verification (last name, or 4-digit PIN sent via WhatsApp at check-in).
- **Invalidate previous JWT on new check-in.** When a new booking is checked in for a room, add the previous booking's ID to an invalidation list (using the `iat` claim approach -- store a `min_valid_after` timestamp per booking). Current `auth.ts` uses `jose` with `setIssuedAt()` -- add a server-side check that `iat > booking.invalidated_at`.
- **Clear client-side session on checkout.** The checkout flow should explicitly clear `localStorage` and cookies. But do NOT rely on this alone -- the guest may not use the checkout flow.
- **Short JWT expiry for free-browse mode.** If implementing an unauthenticated "browse" session for post-QR-scan, make it expire in 1-2 hours, not days.

**Detection:** Check out a test booking. Wait 5 minutes. Open the QR URL. If you see the dashboard with the next guest's data, this is broken. If you see ANYTHING beyond basic property info, this is broken.

**Severity:** CRITICAL -- privacy breach, unauthorized charges, legal liability.
**Phase:** Must be addressed in the core architecture phase before any QR code changes.

---

### Pitfall 2: Removing Auth Creates Unprotected API Endpoints

**What goes wrong:** The current system has a clear security boundary: no JWT = no access to any `/api/stay/[code]/*` endpoints. When making the dashboard "auth-optional" (show WiFi and property info without auth), developers add `if (!token) { return public data }` branches to existing protected endpoints. But they miss some endpoints, or the "public data" branch accidentally returns private data. The service ordering endpoint (`/api/stay/[code]/orders`) suddenly accepts unauthenticated POST requests because someone added the auth-optional pattern inconsistently.

**Why it happens:** The current `verify/route.ts` is the single auth gate. Every other endpoint expects a valid JWT in the Authorization header. Going from "all protected" to "some public, some protected" requires touching every endpoint. The default-deny pattern (as recommended by OWASP) inverts to default-allow, and one missed endpoint becomes a security hole.

**Warning signs:**

- API routes that check `if (token)` instead of `if (!token) return 401`
- No centralized middleware enforcing auth -- each route handles it independently
- The same route returns different data shapes for authenticated vs unauthenticated
- Service-ordering, deal-clicking, or order-status endpoints accessible without auth
- No audit of which endpoints should be public vs protected

**Prevention:**

- **Explicit endpoint classification before coding.** Create a table:

  | Endpoint                             | Auth Required | Rationale                      |
  | ------------------------------------ | ------------- | ------------------------------ |
  | GET /api/stay/[code] (property info) | No            | Basic info is the hook         |
  | GET /api/stay/[code] (wifi)          | No            | WiFi is the primary value prop |
  | GET /api/stay/[code]/services        | No            | Browsing menu is free          |
  | POST /api/stay/[code]/orders         | YES           | Placing orders costs money     |
  | GET /api/stay/[code]/orders          | YES           | Shows personal order history   |
  | GET /api/stay/[code]/deals           | No            | Deals are promotional          |
  | POST /api/deals/[id]/click           | YES           | Tracks identifiable action     |

- **Create an auth middleware helper.** Instead of checking auth in each route:
  ```typescript
  // lib/auth-middleware.ts
  export function requireGuestAuth(handler) { ... }  // 401 if no valid JWT
  export function optionalGuestAuth(handler) { ... } // proceeds with or without JWT, injects guest context if present
  ```
- **Default-deny for mutations.** ALL POST/PUT/DELETE endpoints require auth. No exceptions. Only GET endpoints can be auth-optional.
- **Integration tests per endpoint.** For each protected endpoint: call without token, assert 401. This is the regression test.

**Detection:** Run `grep -r "token" app/api/stay/` and verify every endpoint that uses the token has a clear 401 path when token is missing/invalid.

**Severity:** CRITICAL -- one missed endpoint = unauthorized orders or data exposure.
**Phase:** Must be the FIRST task in implementation. Classify endpoints before touching any code.

---

### Pitfall 3: Progressive Auth Gate Positioned Wrong -- Too Early Kills Conversion, Too Late Enables Abuse

**What goes wrong (too early):** Guest scans QR in room. Sees a verification form asking for booking code + last name. They do not have the booking code handy (it is in an email they cannot find). They give up. WiFi is the #1 reason they scanned -- and they cannot even see it. Adoption drops from the projected 90% to 30%.

**What goes wrong (too late):** Guest scans QR, sees everything -- WiFi, services, deals, and can place orders -- all without verification. A random person who found the QR URL on social media can now order breakfast to Room 203.

**Why it happens:** The auth gate position is a UX/security tradeoff that requires explicit product decision. Developers default to either the existing pattern (gate everything) or the new vision (gate nothing). Neither is correct. The right answer is a specific list of actions that trigger the auth prompt.

**Warning signs:**

- No explicit decision document listing "free actions" vs "gated actions"
- Auth prompt appears before any value is shown to the guest
- OR: No auth prompt appears anywhere, even for paid actions
- The auth gate is implemented as a page-level redirect (all or nothing) rather than action-level

**Prevention:**

- **Define the auth gate as action-level, not page-level.** The dashboard renders for everyone. Individual actions trigger auth:

  | Action                 | Auth Required | Why                                |
  | ---------------------- | ------------- | ---------------------------------- |
  | View WiFi              | No            | This is the hook. Must be instant. |
  | View property info     | No            | Non-sensitive, builds engagement   |
  | Browse services menu   | No            | Window shopping drives orders      |
  | View local deals       | No            | Promotional, benefits partners     |
  | Place a service order  | YES           | Costs money, needs identity        |
  | Submit laundry request | YES           | Costs money, needs room/name       |
  | Book a tour/activity   | YES           | Financial commitment               |
  | View order history     | YES           | Personal data                      |
  | Upload documents       | YES           | Sensitive personal data            |

- **Inline auth prompt, not redirect.** When a guest taps "Order" without being verified, show a bottom sheet: "Verify your stay to place orders" with booking code + last name fields. After verification, complete the original action. Do NOT redirect to a separate page and lose context.
- **Remember verification.** Once verified, store the JWT in `localStorage`. Do not re-prompt on every action. The current `useStaySession` hook already does this -- preserve this pattern.
- **Test the flow with a non-technical person.** Give them a phone, tell them to scan the QR and order breakfast. If they cannot do it in under 60 seconds (including first-time verification), the gate is too heavy.

**Detection:** User-test the QR scan flow. Count the number of screens between scan and WiFi visibility. If more than 1 (the dashboard itself), it is too many.

**Severity:** CRITICAL -- wrong gate position either kills adoption (too early) or enables abuse (too late).
**Phase:** Must be a product decision BEFORE any implementation. Document the gate matrix in the plan.

---

### Pitfall 4: Multi-Guest Rooms Break Single-Booking QR Assumption

**What goes wrong:** A room has two guests (a couple). Guest A scans QR, verifies with their last name, gets a JWT. Guest B scans the same QR, tries to verify with THEIR last name. The verification fails because the booking is under Guest A's name. Guest B cannot access the dashboard. Guest B asks Guest A to share their phone, or the host gets a support request.

**Why it happens:** The current `verify_booking_access` RPC function matches `p_last_name` against the booking's `guest_last_name`. But bookings typically only store the primary guest's name. In couples, families, or group stays, secondary guests cannot verify.

**Warning signs:**

- Verification only accepts the primary guest's last name
- No concept of "additional guests" with their own credentials
- Multi-room bookings (e.g., a family booking 2 rooms) have no cross-room access
- Host gets frequent "my partner can't access the dashboard" support requests

**Prevention:**

- **Allow multiple verification methods for same booking:**
  1. Primary guest last name (current method)
  2. Room-level PIN (4-digit code given at check-in, same for all guests in the room)
  3. Property-wide daily code (set by owner each morning, like "today's code is BEACH")
- **PIN-based verification is simplest for multi-guest.** Owner gives "Your room PIN is 4823" at check-in. All guests in the room use the same PIN. This sidesteps the name-matching problem entirely.
- **Do not require individual guest registration.** The target users are tourists. Asking every guest in a 4-person family to register individually is friction that kills adoption.
- **Store the PIN per booking, not per guest.** Add `access_pin` to the bookings table. Auto-generate on booking creation. Owner can view/change in dashboard.

**Detection:** Create a test booking for "John Smith." Try verifying as "Jane Smith" (partner). If it fails with no alternative, this is the bug.

**Severity:** CRITICAL -- affects every multi-guest booking (couples are the majority of accommodation bookings).
**Phase:** Must be addressed in the verification redesign phase. PIN generation should be in the database migration.

---

## Moderate Pitfalls

Mistakes that cause UX degradation, support overhead, or technical debt.

### Pitfall 5: Configurable Security Levels Lead to Owner Misconfiguration

**What goes wrong:** Owner is given a setting: "Security Level: Low / Medium / High." They do not understand what these mean. They pick "Low" because it sounds easier. Now their guests can order room service without any verification -- including anyone who finds the QR URL. Or they pick "High" because it sounds safer. Now guests need to verify even to see WiFi -- and adoption plummets. The owner blames GUDBRO.

**Why it happens:** Non-technical owners (the "Mario" persona: 35-55, medium tech comfort, 1-5 properties in SEA) do not think in terms of "security levels." They think in terms of outcomes: "Can my guests order food easily?" and "Can strangers abuse my system?" Exposing security as a configurable option transfers a complex decision to someone unqualified to make it.

**Warning signs:**

- Settings page shows "Security Level" with abstract labels (Low/Medium/High)
- No explanation of consequences for each level
- Owner can set security so low that financial actions are unprotected
- Owner can set security so high that guests cannot access basic info
- Default setting is not the recommended one

**Prevention:**

- **Do NOT expose "security levels" as a user-facing concept.** Instead, bake the recommended behavior as the only behavior. The gate matrix from Pitfall 3 (WiFi free, orders gated) should be hardcoded, not configurable.
- **If configuration is required, use outcome-based language:**
  - Instead of "Security Level: Low" use "Guest Verification: Require PIN before ordering (recommended)"
  - Toggle ON by default. Owner can turn OFF only with a warning: "Anyone with the QR code will be able to place orders without verification."
- **Limit configurability to safe options.** The owner should NEVER be able to disable verification for financial actions. The only toggle should be: "Require verification to VIEW the dashboard" (default: NO) vs "Require verification only to ORDER" (default: YES).
- **Safe defaults that cannot be accidentally changed.** The default configuration should be correct for 95% of properties. Changing it should require an explicit "I understand the risks" confirmation.
- **Audit log for configuration changes.** If an owner changes security settings, log it. If abuse happens later, you can trace it back.

**Detection:** Set up a test property with default settings. Verify that financial actions require verification and informational actions do not. If the defaults are wrong, 95% of properties will have the wrong configuration.

**Severity:** MODERATE -- owner misconfiguration is likely but consequences are bounded (worst case: unauthorized orders, not data breach).
**Phase:** Must be a product decision in planning. Implementation should hardcode the recommended behavior.

---

### Pitfall 6: QR Lifecycle Gap Between Checkout and Deactivation

**What goes wrong:** Guest A checks out at 11:00 AM. The room is cleaned and prepared for Guest B who checks in at 14:00. During the 3-hour gap, the room QR code resolves to... what? If it shows Guest A's (now expired) data, that is a privacy leak. If it shows Guest B's data, Guest B has not checked in yet (and the booking may not exist yet for walk-ins). If it shows nothing, a guest arriving early and scanning the QR sees a broken page.

**Why it happens:** The system assumes rooms always have an active booking. The transition period between guests is not modeled. For room-based QR codes (permanent, not per-booking), there MUST be a "no active booking" state.

**Warning signs:**

- QR scan during a room vacancy shows an error page or stale data
- No "between guests" state in the room status model
- System crashes or returns 500 when no active booking found for a room
- Early arriving guests see "no booking found" instead of a helpful message

**Prevention:**

- **Model the room vacancy state explicitly.** When a QR is scanned and no active booking exists for the room:
  1. Show property name and photo (welcoming, not broken)
  2. Show WiFi credentials (the property-level WiFi, not room-specific)
  3. Show "Check-in starts at [time]. Verify your booking to access your stay dashboard."
  4. Provide a verification form (booking code + last name)
- **The vacancy page is an onboarding opportunity.** Show the property's services, local deals, and check-in information. Early arrivals can browse while waiting.
- **Time-based booking resolution.** When resolving "current booking for room X":
  - Active booking with check-in date <= today AND check-out date >= today = current guest
  - No match = vacancy state
  - Multiple matches = ERROR (double booking -- alert owner)
- **Do NOT show the previous guest's data under any circumstances.** The vacancy state must be a clean slate.
- **Handle walk-in guests.** Owner creates a booking in the dashboard, assigns it to the room. Guest can then verify via the QR.

**Detection:** Check out a test booking. Scan the room QR immediately. If you see the previous guest's data or an error page, this is broken. You should see the vacancy welcome page.

**Severity:** MODERATE -- causes confusion and support requests, but no security breach if implemented correctly.
**Phase:** Must be addressed alongside the QR routing logic. The vacancy state is a first-class UI state, not an error.

---

### Pitfall 7: Backward Compatibility -- Existing Booking-Code QR Codes Stop Working

**What goes wrong:** Properties already using GUDBRO have printed QR codes pointing to `/stay/BK-ABC123` (booking-specific URLs). When switching to room-based QR codes (`/room/{propertyId}/{roomId}`), the old URLs break. Guests who received pre-arrival emails with the old URL format cannot access their dashboard. Owners who printed old QR codes on laminated cards in rooms now have dead links.

**Why it happens:** URL structure changes during the migration from booking-code-based to room-based QR codes. The old `/stay/[code]` route is modified or removed. Nobody inventoried the existing QR codes in circulation.

**Warning signs:**

- The `/stay/[code]` route handler is modified to require different parameters
- Pre-arrival emails contain URLs that will break after the migration
- Printed QR codes in rooms point to the old URL format
- No redirect from old URL format to new format
- Existing JWTs (signed with current `auth.ts`) are invalidated by new auth logic

**Prevention:**

- **Never break existing URLs.** The `/stay/[code]` route MUST continue working exactly as it does today. Existing bookings with existing QR codes must function identically.
- **Add new routes alongside old ones:**
  - `/stay/[code]` -- existing behavior, unchanged (booking-code access)
  - `/room/[propertyId]/[roomId]` -- NEW route for room-based QR codes
  - Both routes lead to the same dashboard component, just with different entry points
- **Existing JWTs must remain valid.** The current `GuestTokenPayload` has `bookingId`, `propertyId`, `checkoutDate`. Do NOT change this structure. If adding new fields, make them optional. If changing the signing secret, implement dual-secret validation during the transition.
- **Pre-arrival emails keep using booking-code URLs.** The booking-code URL is actually BETTER for pre-arrival because it is specific to the guest. Room-based QR codes are for physical QR codes IN the room.
- **Migration plan for physical QR codes:** Owners can transition to room-based QR codes at their own pace. The old booking-code QR codes keep working. Document "how to switch to room QR codes" in the owner dashboard.
- **Test: access the app with an old-format URL after deploying the new code.** This must work.

**Detection:** After deploying any changes, test every existing URL format: `/stay/BK-XXXX`, `/`, property pages. If any return 404 or behave differently, backward compatibility is broken.

**Severity:** MODERATE -- broken URLs cause immediate guest frustration, but are fixable with redirects if caught quickly.
**Phase:** Must be the FIRST constraint in the architecture design. "Old URLs must keep working" is non-negotiable.

---

### Pitfall 8: Document Upload Without GDPR-Compliant Retention and Deletion

**What goes wrong:** Guests upload passport photos and visa documents for the visa tracker feature. These documents are stored in Supabase Storage indefinitely. Six months later, the guest requests data deletion under GDPR. You cannot find all copies of their documents across storage buckets, database records, and any CDN caches. Or worse: a data breach exposes hundreds of passport photos because they were stored in a public bucket or without encryption at rest.

**Why it happens:** Document upload is treated as a simple file upload feature. Developers store the file, save the URL, and move on. But passport photos and visa documents are **special category personal data** under GDPR -- they contain biometric information (photo), government ID numbers, nationality, and visa status. They require higher protection and explicit retention policies.

**Warning signs:**

- Documents stored in a Supabase Storage bucket without RLS policies
- No retention period defined -- documents live forever
- No automated deletion after checkout + grace period
- No encryption beyond what Supabase provides by default
- No data processing consent obtained before upload
- Documents accessible via direct URL without auth (public bucket)

**Prevention:**

- **Private bucket with strict RLS.** Documents go in a `guest-documents` bucket with RLS: only the guest (via their JWT) and the property owner can access. No public URLs.
- **Explicit retention policy:**
  - Guest documents retained for: checkout date + 30 days (covers disputes)
  - Owner compliance documents (NA17 records): retained for legal minimum (varies by country, typically 1-3 years in Vietnam)
  - After retention period: **automatically delete from storage AND nullify database references**
- **Consent before upload.** Show a clear message: "Your document will be stored securely and automatically deleted 30 days after checkout. It will only be shared with your host for legal compliance purposes." Require explicit consent (checkbox, not pre-checked).
- **Cron job for cleanup.** Schedule a daily cron that finds documents past their retention date and deletes them from both storage and database. Log deletions for audit trail.
- **No thumbnails or copies.** Do not create image thumbnails or cache copies of identity documents. Store once, serve once, delete once.
- **Signed URLs, not permanent URLs.** Use Supabase's `createSignedUrl()` with a short expiry (e.g., 5 minutes) instead of storing permanent URLs. This ensures documents cannot be accessed after the signed URL expires.

**Detection:** Upload a test document. Check out the booking. Wait past the retention period. Verify the document is deleted from storage. If it persists, retention policy is not working.

**Severity:** MODERATE (HIGH if operating in EU or handling EU citizens) -- GDPR fines up to 4% of annual revenue or 20M EUR. Marriott paid $52M in 2024 for a data breach involving guest records.
**Phase:** Must be designed before the document upload feature is built. Retention policy and consent flow are prerequisites, not afterthoughts.

---

### Pitfall 9: JWT Token Conflicts Between Old Auth Flow and New Progressive Auth

**What goes wrong:** The current system issues a JWT after booking code + last name verification (via `/api/stay/verify`). The new system will issue tokens differently -- perhaps a "limited" token after QR scan (for browse access) and a "full" token after verification (for ordering). If both token types use the same `localStorage` key, the same header, and the same verification function, they collide. A limited token gets used for a full-access endpoint. Or a full token from a previous booking gets confused with a limited token for a new session.

**Why it happens:** Incremental changes to the auth system without a clear token strategy. The existing `useStaySession` hook stores `stayToken` in `localStorage`. Adding a second token type without renaming or namespacing creates conflicts.

**Warning signs:**

- Two different token payloads stored under the same `localStorage` key
- `verifyGuestToken()` does not distinguish between token types
- A "browse" token accidentally grants ordering access because the ordering endpoint only checks `token !== null`
- Existing `useStaySession` hook returns `isAuthenticated: true` for both token types

**Prevention:**

- **Single token with scopes, not two separate tokens.** Issue one JWT with a `scope` claim: `scope: 'browse'` (post-QR, pre-verification) or `scope: 'full'` (post-verification). The verification function checks the scope for protected actions.
  ```typescript
  interface GuestTokenPayload {
    bookingId: string; // null for browse tokens
    propertyId: string;
    roomId: string; // NEW: for room-based access
    checkoutDate: string; // null for browse tokens
    scope: 'browse' | 'full'; // NEW: access level
  }
  ```
- **Ordering endpoints check `scope === 'full'`.** Not just "token exists."
- **Upgrade path:** When a browse-token user verifies their identity, issue a new full-scope token and replace the browse token in `localStorage`. Do not keep both.
- **Namespace localStorage keys.** Use `stayToken_{propertyId}` instead of just `stayToken` to prevent cross-property token conflicts if a guest visits multiple GUDBRO properties.

**Detection:** Issue a browse token. Try calling the order-creation endpoint with it. If it succeeds, scope enforcement is missing.

**Severity:** MODERATE -- scope confusion enables unauthorized actions. Fixable but embarrassing.
**Phase:** Must be designed in the auth architecture phase, before touching any endpoint.

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable without major rework.

### Pitfall 10: QR Code Physical Placement Causes Scanning Failures

**What goes wrong:** The QR code is printed too small, placed behind a lamp, laminated with glossy film that causes glare, or positioned where there is poor lighting. 20% of guests cannot scan it on first try. They give up or call the host.

**Prevention:**

- **Minimum QR size: 3cm x 3cm** for close-range scanning (guest holds phone 10-15cm away)
- **Matte lamination, not glossy** -- reduces glare from phone flashlight
- **Place at eye level near the door or on the nightstand** -- consistent location guests can find
- **Include fallback text below QR:** "Can't scan? Visit stays.gudbro.com/r/ROOM-CODE"
- **Test with 3 different phone models** before mass printing

**Phase:** Address in the QR code generation/documentation phase. Include placement guidelines for owners.

---

### Pitfall 11: Room Changes Invalidate QR-Based Access

**What goes wrong:** Guest A is moved from Room 201 to Room 305 mid-stay (plumbing issue, upgrade, etc.). The QR code in Room 305 is linked to Room 305, but Guest A's booking is still linked to Room 201. Guest A scans the QR in Room 305 and gets a vacancy page or a different guest's data.

**Prevention:**

- **Room changes must update the booking's room assignment.** When the owner changes a guest's room in the dashboard, the booking record is updated.
- **The room-based QR resolves via booking, not room.** The flow is: QR -> room ID -> find active booking for this room -> show that booking's dashboard. If the booking's room was updated, the resolution works automatically.
- **Notify the guest.** When room changes happen, send a WhatsApp/notification: "You've been moved to Room 305. Scan the QR in your new room to access your dashboard."
- **Old room QR shows vacancy page after room change** -- this is correct behavior.

**Phase:** Address in the booking management/owner dashboard phase.

---

### Pitfall 12: Browser Back Button and Deep Linking Break Progressive Auth Flow

**What goes wrong:** Guest scans QR, sees dashboard (browse mode). Taps "Order breakfast." Auth prompt appears. Guest verifies. Order form opens. Guest taps browser back button. They land on... the auth prompt again? The QR scan page? The browser back button behavior in a single-page app with modals and drawers is unpredictable.

**Prevention:**

- **Auth prompt as a modal/bottom-sheet, not a route.** If verification is a modal overlay on the dashboard (not a separate URL), the back button closes the modal and returns to the dashboard -- expected behavior.
- **Use `history.replaceState` for auth state changes.** When the user verifies, do not push a new history entry. Replace the current one so back button does not re-trigger verification.
- **Deep link support:** If a verified guest shares `/stay/BK-ABC123` with their partner, the partner should see the dashboard and get an auth prompt on action -- not a redirect to the home page.
- **Test the back button explicitly** at every stage of the flow. This is the most overlooked UX test.

**Phase:** Address in the frontend implementation phase.

---

## Phase-Specific Warnings

| Phase Topic                 | Likely Pitfall                   | Mitigation                                                   |
| --------------------------- | -------------------------------- | ------------------------------------------------------------ |
| Architecture Design         | Stale QR reuse (P1)              | Session invalidation on new check-in, vacancy state          |
| Architecture Design         | Backward compatibility (P7)      | Old URLs keep working, new routes added alongside            |
| Auth System Redesign        | Unprotected endpoints (P2)       | Endpoint classification matrix, default-deny for mutations   |
| Auth System Redesign        | Token conflicts (P9)             | Single token with scopes, not two token types                |
| Product Decision (Pre-code) | Auth gate position (P3)          | Document "free vs gated" actions matrix before coding        |
| Product Decision (Pre-code) | Security level config (P5)       | Hardcode recommended behavior, do not expose as user setting |
| Verification Flow           | Multi-guest rooms (P4)           | PIN-based verification alongside name verification           |
| QR Routing Logic            | Vacancy state (P6)               | First-class "no active booking" UI, not error page           |
| Document Upload             | GDPR retention (P8)              | Private bucket, auto-delete cron, consent flow               |
| Frontend Implementation     | Back button / deep linking (P12) | Auth as modal, not route; test back button at every stage    |
| QR Code Deployment          | Physical scanning issues (P10)   | Size/placement guidelines, fallback URL                      |
| Booking Management          | Room changes (P11)               | Update booking room assignment, notify guest                 |

---

## Integration Pitfalls with Existing System

These are specific to adding frictionless access to the EXISTING GUDBRO accommodations codebase.

### Existing Code That Must Not Break

| File                                    | Current Behavior                                                  | Risk If Modified                                                         |
| --------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `lib/auth.ts`                           | Signs/verifies JWT with `bookingId`, `propertyId`, `checkoutDate` | Changing payload structure breaks existing tokens                        |
| `app/stay/[code]/page.tsx`              | Redirects to `/` if `!isAuthenticated`                            | Must NOT redirect for browse mode -- needs conditional logic             |
| `hooks/useStaySession.ts`               | Returns `isAuthenticated` boolean                                 | Must distinguish between "browse" and "full" auth                        |
| `app/api/stay/verify/route.ts`          | Only entry point for getting a JWT                                | Must remain functional; new entry point added for QR-based browse tokens |
| `app/api/stay/[code]/orders/route.ts`   | Requires JWT for all operations                                   | Must continue requiring JWT; do NOT make auth optional here              |
| `app/api/stay/[code]/services/route.ts` | Requires JWT to list services                                     | CANDIDATE for auth-optional (browsing services is low-risk)              |
| `components/stay/*.tsx`                 | All assume `stay` data is available (post-auth)                   | Some components need a "limited data" mode for browse access             |

### Migration Safety Checklist

- [ ] All existing `/stay/[code]` URLs continue to work identically
- [ ] Existing JWTs (issued before migration) are still accepted
- [ ] `useStaySession` hook backward compatible (existing pages work unchanged)
- [ ] No existing protected endpoint becomes unprotected
- [ ] No existing component crashes when `stay` data is partially available
- [ ] Pre-arrival emails with booking-code URLs still function
- [ ] Existing E2E tests pass without modification

---

## Summary: Top 5 Mistakes to Avoid

1. **Do not let room-based QR codes auto-resolve to the current guest without verification.** The QR scan landing page must show only low-risk info (WiFi, property name). Identity-bound actions (ordering, personal data) require verification. One stale QR reuse = privacy breach.

2. **Do not make existing protected endpoints auth-optional without an explicit classification matrix.** Every endpoint must be labeled "public" or "protected" BEFORE coding. Default-deny for all mutations (POST/PUT/DELETE). Test each protected endpoint without a token.

3. **Do not forget multi-guest rooms.** Booking code + last name only works for the primary guest. Add PIN-based verification as an alternative. Couples are the majority of accommodation bookings.

4. **Do not break existing URLs or existing JWTs.** The `/stay/[code]` route must continue working. Existing tokens must remain valid. Add new routes alongside old ones. This is a non-negotiable constraint.

5. **Do not expose "security levels" as a configurable setting for non-technical owners.** Hardcode the recommended behavior (info free, orders gated). If a setting is needed, use outcome-based language with safe defaults that require explicit confirmation to change.

---

## Sources

- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) -- Session ID regeneration on privilege change, anonymous-to-authenticated transitions
- [SlashID: Backend Auth Patterns](https://www.slashid.dev/blog/auth-patterns/) -- Edge auth, token enrichment, lateral movement risks
- [Default Deny Auth Strategy (Geek Culture)](https://medium.com/geekculture/backend-design-software-pattern-for-authentication-authorization-ed86bbd17c9) -- Middleware-based default-deny for endpoint protection
- [How to Invalidate JWT Tokens (DEV)](https://dev.to/webjose/how-to-invalidate-jwt-tokens-without-collecting-tokens-47pk) -- Using `iat` claim for bulk invalidation without blacklists
- [5 Approaches to JWT Invalidation (Medium)](https://medium.com/@mmichaelb/5-different-approaches-to-invalidate-json-web-tokens-e4cc4e027343) -- Counter-based, per-user secret, refresh token approaches
- [OWASP Top 10 2025: Security Misconfiguration](https://owasp.org/Top10/2025/A02_2025-Security_Misconfiguration/) -- Safe defaults, 100% of apps tested had misconfigurations
- [GDPR for Hotels (HotelTechReport)](https://hoteltechreport.com/news/data-protection-act) -- Retention requirements, automated deletion, $52M Marriott settlement
- [GDPR Compliance Tips for Hotels (Hotelogix)](https://blog.hotelogix.com/gdpr-compliance-tips/) -- Data minimization, retention schedules, staff training
- [How to Handle Guest Data Safely (Deliverback)](https://deliverback.com/blog/handle-guest-data-safely/) -- Secure deletion across all platforms, vendor compliance
- [Secure QR Codes in Hospitality (Partsfe)](https://partsfe.com/blog/post/secure-qr-payments-hospitality) -- QR phishing, duplicate codes, trusted environment exploitation
- [QR Code Comeback and Mistakes to Avoid (IRIS)](https://www.iris.net/articles/qr-code-come-back-and-mistakes-to-avoid) -- Cluttered codes, broken URLs, unoptimized landing pages
- [Microsoft Security Defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults) -- Example of "safe defaults for non-technical users" approach
- Existing GUDBRO codebase: `apps/accommodations/frontend/lib/auth.ts`, `app/api/stay/verify/route.ts`, `app/stay/[code]/page.tsx`
