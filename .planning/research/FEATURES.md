# Feature Landscape: Frictionless Guest Access & Progressive Authentication

**Domain:** Hotel/accommodation guest access, QR-based entry, progressive authentication, document management
**Researched:** 2026-01-31
**Confidence:** MEDIUM-HIGH (patterns well-established in hospitality tech; progressive auth is novel combination of web UX patterns applied to hospitality)

## Context

GUDBRO Accommodations v1 already has:

- In-Stay Dashboard with QR scan entry (`/stay/BK-{code}`)
- Booking verification via booking code + last name (returns JWT)
- Service ordering with cart and order state machine
- QR code generation in backoffice
- Guest communication (emails, WhatsApp)
- WiFi credential display (single network/password)

This milestone adds **frictionless access** -- the insight that physical presence in the room (having the key, seeing the QR, being on the WiFi) is already authentication. The owner verified identity at reception. Different property types need different security levels.

### Industry Context

The hospitality guest app market is booming. Duve (voted #1 Hotel Guest App 2026) and Canary Technologies (#1 Contactless Check-in 2026) both use **web-based, no-download, QR-scan access** as their primary guest entry point. 73% of hotel guests prefer mobile app check-in over front desk. The contactless check-in market is projected to reach $4.8B by 2032 (15.7% CAGR).

Key industry pattern: guests receive a **unique, reservation-specific link or QR code** that serves as their authentication token, eliminating credentials entirely. Duve, STAY App, and mycloud all follow this pattern.

---

## Table Stakes

Features that are baseline expectations in this feature area. Missing these makes the experience feel broken or insecure.

### A. QR-Based Room Access (No Login Barriers)

| Feature                                        | Why Expected                                                                                                            | Complexity           | Dependencies                          | Notes                                                                                                                                                          |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instant dashboard on QR scan (no login screen) | Duve, STAY App, mycloud all do this. Guest scans QR in room, sees dashboard immediately. Any login wall = abandonment.  | Medium               | Existing QR generation, JWT system    | Current flow requires booking code + last name. New flow: QR encodes a time-limited token that maps to active booking. Guest sees dashboard instantly on scan. |
| WiFi credentials visible immediately           | This is THE reason guests scan the QR. If WiFi is behind a login wall, the feature fails. 90% of QR scans are for WiFi. | Low                  | Existing WiFi card component          | WiFi must be the FIRST thing visible, before any verification step. Already true in current UI but must remain true with new auth model.                       |
| No app download required                       | Web-based PWA is already the standard. Duve and STAY App both emphasize "no download." Guest uses phone browser.        | None (already built) | Existing PWA architecture             | GUDBRO already does this. Maintain this advantage. Never require app store install for guest access.                                                           |
| Unique URL per active booking                  | Each QR code resolves to a booking-specific URL. The URL IS the credential. Duve uses this pattern.                     | Low                  | Existing URL structure `/stay/{code}` | Already implemented with `/stay/BK-{code}`. The booking code in the URL serves as the access token.                                                            |
| Session persistence via cookie/localStorage    | Guest shouldn't re-verify every time they open the page. Once verified, remember for duration of stay.                  | Low                  | JWT system already exists             | Current JWT already handles this. Ensure token expiry aligns with checkout date.                                                                               |

### B. Progressive/Lazy Authentication for Paid Actions

| Feature                                          | Why Expected                                                                                                                    | Complexity        | Dependencies                          | Notes                                                                                                                                                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tiered access levels (view vs. transact)         | Standard web UX pattern. Amazon lets you browse without login, asks for auth at checkout. Same principle for hotels.            | Medium            | Existing JWT system, service ordering | Tier 1 (scan QR): View WiFi, stay info, house rules, deals. Tier 2 (verify identity): Order services, request laundry, make purchases.               |
| Lightweight verification prompt (not full login) | When guest tries to order a service, prompt for last name or room number -- not a full registration form. Keep it to ONE field. | Low               | Existing booking data                 | "Confirm your last name to place orders" is sufficient. Physical presence + last name = good enough for a 3-night B&B stay.                          |
| Graceful upgrade from anonymous to verified      | Transition should feel like a natural part of the flow, not an interruption. "To order breakfast, please confirm your name."    | Medium            | UI/UX work                            | The verification prompt should appear inline in the ordering flow, not as a redirect to a separate login page. Modal or inline expansion.            |
| No account creation ever (for guests)            | Guests are transient. Forcing account creation for a 3-night stay is hostile UX. Booking code IS the account.                   | None (philosophy) | --                                    | Duve, STAY App, and Bbot all avoid guest account creation. The booking/reservation is the identity anchor. GUDBRO should never require guest signup. |

### C. QR Code Lifecycle Management

| Feature                                             | Why Expected                                                                                                                              | Complexity | Dependencies                        | Notes                                                                                                                                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QR activation on check-in                           | QR code for a room should only work when a guest is checked in. Prevents previous guest from accessing current guest's dashboard.         | Medium     | Booking state machine, backoffice   | Tie QR validity to booking status. When booking moves to `checked_in`, the room QR becomes active for that booking.                                                           |
| QR deactivation on check-out                        | When guest checks out, QR should stop working (or redirect to property page). Security requirement.                                       | Medium     | Booking state machine               | On checkout: invalidate JWT, redirect QR to generic property page or "your stay has ended" screen.                                                                            |
| Permanent physical QR in room (dynamic destination) | Owners print QR once, stick it in the room. It always works but routes to the CURRENT guest's booking.                                    | High       | Room-to-booking mapping, middleware | This is the key technical challenge. Physical QR encodes `/room/{room-id}`. Middleware resolves room-id to active booking. If no active booking, shows generic check-in form. |
| Manual override (owner can activate/deactivate)     | Owner may need to disable a room QR (maintenance, dispute, etc.). Must be controllable from backoffice.                                   | Low        | Backoffice UI                       | Simple toggle in room management. `qr_active: boolean` on room record.                                                                                                        |
| Grace period after checkout                         | Guest may need to access dashboard briefly after checkout (retrieve WiFi password for lobby, check receipt). Allow 2-4 hour grace period. | Low        | JWT expiry logic                    | Set JWT expiry to checkout time + grace period (configurable per property).                                                                                                   |

### D. Guest Document Upload (Passport/Visa)

| Feature                             | Why Expected                                                                                                                        | Complexity | Dependencies                                        | Notes                                                                                                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Photo upload of passport/ID         | HelloShift, RoomRaccoon, Klippa all offer this. Legal requirement in Vietnam (NA17 registration). OCR technology makes it seamless. | Medium     | Storage (Supabase Storage), upload UI               | Guest takes photo or uploads image. Store securely. OCR extraction is a differentiator (see below), not table stakes. Manual entry fallback is required. |
| Manual entry of document details    | Not all guests will photograph their passport. Must allow manual entry of: document type, number, nationality, expiry date.         | Low        | Form UI, database schema                            | Fields: document_type, document_number, nationality, issue_date, expiry_date, full_name_on_document.                                                     |
| Secure storage with access controls | Guest documents are PII. Must be encrypted at rest, access-logged, and only visible to property owner + guest.                      | Medium     | Supabase Storage policies, RLS                      | Store in dedicated Supabase Storage bucket with RLS. Auto-delete X days after checkout (configurable, default 30 days). GDPR compliance.                 |
| Expiry date tracking with alerts    | Already in PRD (visa tracker). Owner needs to know if guest's visa expires during stay. 14/7/3 day alert schedule.                  | Medium     | Cron job or scheduled function, notification system | Use existing notification patterns. Alert both guest and owner. Integration with existing visa tracker feature in PRD.                                   |

---

## Differentiators

Features that set GUDBRO apart from competitors. Not expected, but create real competitive advantage for the target market (small SEA property owners).

### E. Configurable Security Levels per Property Type

| Feature                                              | Value Proposition                                                                                                                                        | Complexity       | Dependencies                                | Notes                                                                                                                                                                                                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Security presets (B&B / Guesthouse / Hotel / Hostel) | No competitor offers this. A 2-room B&B where the owner sleeps next door has different security needs than a 100-room hotel. One-size-fits-all is wrong. | Medium           | Settings UI in backoffice, middleware logic | **B&B preset**: QR scan = full access, no verification needed (owner is right there). **Hotel preset**: QR scan = view only, verify for orders. **Hostel preset**: QR scan = view only, verify for everything (shared spaces, multiple guests). |
| Per-feature auth requirements                        | Owner can decide which features need verification. WiFi always free. Ordering might need verification. Document upload always needs verification.        | High             | Feature-level middleware, settings schema   | Config table: `{feature: 'service_ordering', requires_verification: true/false}`. Let the owner toggle per feature. Presets set defaults, owner can customize.                                                                                  |
| Physical presence as authentication factor           | The insight that "you are in the room, you have the key, you can see the QR" IS authentication. No competitor frames it this way explicitly.             | Low (conceptual) | Documentation, UX messaging                 | This is a philosophy, not a feature. But it should be communicated to owners: "Your guests already proved who they are at reception. The QR code is their access pass."                                                                         |
| Custom verification methods per property             | Some owners want PIN, some want last name, some want room number. Let them choose.                                                                       | Medium           | Configurable verification form              | Options: (a) last name only, (b) booking code, (c) PIN set by owner, (d) room number + last name. Default: last name (simplest).                                                                                                                |

### F. Multi-Zone WiFi Credential Display

| Feature                                         | Value Proposition                                                                                                   | Complexity | Dependencies                                     | Notes                                                                                                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Multiple WiFi networks per property             | Hotels have lobby WiFi, pool WiFi, room WiFi. Currently GUDBRO shows one network. Real properties have zones.       | Low-Medium | Schema change (array of WiFi configs), UI update | Change from single `wifi_name/wifi_password` to array: `wifi_zones: [{name, network, password, location}]`. Display as cards or tabs.                            |
| Zone-specific credentials (per room floor/area) | Some properties give different passwords per floor for security. Display the relevant one based on room assignment. | Medium     | Room-to-zone mapping                             | Room 201-210 = "Floor2_Guest", Room 301-310 = "Floor3_Guest". Map rooms to WiFi zones. Show only the relevant zone(s) to each guest.                             |
| "Connect" deep link / auto-copy                 | One-tap WiFi connection. On iOS/Android, can generate WiFi QR or copy credentials. Reduces friction.                | Low        | Clipboard API, WiFi QR generation                | Already have copy button. Add: generate WiFi-config QR code that phone can scan to auto-connect (standard WiFi QR format: `WIFI:T:WPA;S:{ssid};P:{password};;`). |
| Staff/IoT network separation display            | Show guests which network is theirs (vs. staff-only). Avoid confusion.                                              | Low        | UI only                                          | Label zones clearly: "Guest WiFi", "Pool Area", "Restaurant". Don't show staff networks.                                                                         |

### G. Smart Document Processing

| Feature                              | Value Proposition                                                                                                         | Complexity | Dependencies                                                    | Notes                                                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OCR extraction from passport photo   | HelloShift, RoomRaccoon, Horus all offer this. Auto-extract name, nationality, document number, expiry. Saves guest time. | High       | OCR service (Tesseract, Google Vision, or MRZ-specific library) | MRZ (Machine Readable Zone) on passports is standardized. Libraries exist for MRZ parsing. Could use client-side (privacy) or server-side (accuracy). Start with manual entry, add OCR as upgrade. |
| Liveness/selfie verification         | Jumeirah uses facial recognition. Prevents identity fraud.                                                                | Very High  | Third-party KYC service                                         | DO NOT build this for MVP. This is enterprise-grade. For small SEA properties, passport photo + manual verification at reception is sufficient. Flag for future if scaling to large hotels.        |
| NA17 data pre-fill for Vietnam       | Auto-generate the police registration data from uploaded documents. Saves owner hours of manual data entry.               | Medium     | Understanding NA17 format, document data extraction             | Unique to Vietnam market. Export guest data in format needed for provincial police registration. Major time-saver for owners with multiple guests.                                                 |
| Document expiry monitoring dashboard | Owner sees all guests with expiring documents at a glance. Color-coded: green (>14 days), yellow (7-14), red (<7).        | Medium     | Backoffice UI, existing visa tracker logic                      | Extends the visa tracker already in PRD. Dashboard view with filterable guest document status.                                                                                                     |

### H. QR Intelligence Features

| Feature                                       | Value Proposition                                                                                                               | Complexity | Dependencies                            | Notes                                                                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Scan analytics (when, how often, which rooms) | Owner sees which rooms scan QR most, peak scan times, engagement rate. No competitor provides this for small properties.        | Low-Medium | Analytics logging on QR scan endpoint   | Log each scan: timestamp, room_id, booking_id, user_agent. Aggregate in backoffice analytics. Helps owner understand guest engagement.       |
| Multi-QR per room (bathroom, bedside, desk)   | Different QR placements with different default views. Bathroom QR opens WiFi. Desk QR opens services. Bedside QR opens contact. | Medium     | QR type parameter, routing logic        | QR URL includes `?ctx=wifi` or `?ctx=services`. Same booking, different initial view. Owner generates multiple QRs per room from backoffice. |
| Guest re-engagement via QR post-stay          | After checkout, room QR shows "Had a great stay? Book again with 10% off" or "Leave a review."                                  | Low        | Checkout state handling, redirect logic | When no active booking on room, QR shows property page with return-guest discount. Free marketing channel.                                   |

---

## Anti-Features

Features to deliberately NOT build. Common mistakes in this domain that GUDBRO should avoid.

### Things to NOT Build

| Anti-Feature                                                | Why Avoid                                                                                                                                                                                                     | What to Do Instead                                                                                                                                      |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Full account/registration system for guests                 | Guests are transient (3-14 day stays). Account creation is hostile UX that kills conversion. Duve and STAY App both avoid this. Booking code IS the identity.                                                 | Use booking-code-as-identity pattern. JWT tied to booking, not to a user account. Guest never creates username/password.                                |
| Native mobile app for guests                                | App store install is a barrier. 80%+ abandonment rate for "download our app" prompts. All leading hotel apps (Duve, STAY, mycloud) are web-based.                                                             | PWA is already the right choice. Maintain web-first. Add "Add to Home Screen" prompt but never require it.                                              |
| Biometric authentication (face/fingerprint) for room access | Requires hardware (smart locks), complex integration, privacy concerns. Overkill for B&Bs and guesthouses. Even large hotels struggle with this.                                                              | Physical key/card at reception + digital QR for services. Don't try to replace the room key -- just replace the information card.                       |
| Full KYC/AML compliance system                              | Blockpass-style identity verification is for large hotel chains and financial institutions. Small B&Bs in Vietnam don't need AML screening. Over-engineering kills simplicity.                                | Simple document upload + manual owner verification. Owner already sees the guest at reception. Digital just replaces the photocopy machine.             |
| Email/SMS OTP for guest verification                        | Adds friction, requires phone number collection, SMS costs money, delivery is unreliable in SEA (especially for foreign SIMs). Solves a problem that doesn't exist when physical presence is the auth factor. | Use physical-presence-as-auth: QR code visibility = you are in the room. For paid actions, simple last-name verification (already known from booking).  |
| Complex role-based access within a single booking           | Multi-guest role management (primary guest vs. companion vs. child) adds complexity with minimal value. A 3-night booking doesn't need RBAC.                                                                  | All guests on a booking get the same access level. If companion scans QR, they see the same dashboard. Keep it simple.                                  |
| Blockchain-based identity or credential verification        | Some hospitality KYC providers pitch blockchain identity. Zero value for small properties. Adds complexity, cost, and confusion.                                                                              | Standard database storage with encryption. Supabase RLS for access control. Delete documents after configurable retention period.                       |
| Real-time door lock integration                             | Smart lock APIs (ASSA ABLOY, Salto, etc.) are expensive, require hardware, and are unreliable. Small properties use physical keys.                                                                            | If owner has smart locks, provide a webhook/API endpoint they can integrate with. Don't build lock vendor integrations into core product.               |
| Comprehensive ID verification with liveness detection       | Services like Horus Check and Regula offer liveness detection, deepfake prevention, and 14,000+ document templates. This is enterprise-grade.                                                                 | Passport photo upload + manual review by owner at reception. The owner is literally standing in front of the guest. Digital tools just create a record. |

---

## Feature Dependencies

```
QR-Based Room Access (no login)
  |
  +-- Permanent Room QR (dynamic destination)
  |     |
  |     +-- Room-to-Active-Booking Resolution (middleware)
  |     |     |
  |     |     +-- Booking State Machine (check-in/check-out states)
  |     |
  |     +-- QR Activation/Deactivation
  |           |
  |           +-- Backoffice Room Management (toggle)
  |
  +-- Progressive Authentication
  |     |
  |     +-- Tiered Access (view tier / transact tier)
  |     |     |
  |     |     +-- Configurable Security Levels (presets)
  |     |           |
  |     |           +-- Per-Feature Auth Config (advanced)
  |     |
  |     +-- Inline Verification Prompt
  |           |
  |           +-- Custom Verification Methods (owner choice)
  |
  +-- Session Management
        |
        +-- JWT with Checkout-Aligned Expiry
        +-- Grace Period Configuration

Multi-Zone WiFi
  |
  +-- Schema Change (single -> array)
  +-- Room-to-Zone Mapping
  +-- WiFi Config QR Generation

Guest Documents
  |
  +-- Photo Upload (Supabase Storage)
  |     |
  |     +-- OCR Extraction (future enhancement)
  |
  +-- Manual Entry Form
  +-- Expiry Tracking + Alerts
  |     |
  |     +-- Existing Visa Tracker (PRD section 13)
  |
  +-- Secure Storage + Auto-Delete
  +-- NA17 Export (Vietnam-specific)
```

---

## MVP Recommendation

For this milestone, prioritize in this order:

### Must Have (Core of "Frictionless Access")

1. **Permanent Room QR with dynamic destination** -- The foundation. Physical QR in room resolves to current guest's booking. This is the technical enabler for everything else.
2. **Instant dashboard on QR scan (no login for view tier)** -- WiFi, stay info, house rules, deals visible immediately. This IS the value proposition.
3. **Progressive auth for paid actions** -- Simple inline verification (last name) when guest tries to order services. Not before.
4. **QR activation/deactivation tied to booking lifecycle** -- Security basics. QR works during stay, stops after checkout.
5. **Security presets (B&B / Guesthouse / Hotel)** -- Three presets with sensible defaults. Owner picks one during setup.

### Should Have (High Value, Reasonable Effort)

6. **Multi-zone WiFi** -- Schema change + UI. Low-medium complexity, high practical value for real properties.
7. **Guest document photo upload** -- Simple upload to Supabase Storage. Manual entry fallback. Expiry tracking from existing visa tracker.
8. **Grace period after checkout** -- Configurable hours. Small feature, prevents frustration.
9. **QR scan analytics** -- Log scans, show in backoffice. Low effort, informs owner engagement.

### Defer to Post-Milestone

- **OCR document extraction** -- High complexity, needs third-party service evaluation. Manual entry works for now.
- **Per-feature auth configuration** -- Presets are enough for v1. Custom per-feature toggles add UI complexity.
- **Multi-QR per room** -- Nice to have but not essential. Single room QR is sufficient initially.
- **NA17 export** -- Vietnam-specific. Important but can be a focused follow-up.
- **Liveness/biometric verification** -- Not for this market segment. Ever, possibly.

---

## Competitive Landscape Summary

| Competitor              | QR Access | No Login                | Progressive Auth         | Doc Upload       | Multi-Zone WiFi | Security Config        |
| ----------------------- | --------- | ----------------------- | ------------------------ | ---------------- | --------------- | ---------------------- |
| **Duve**                | Yes       | Yes (web-based)         | Implicit (PMS-linked)    | Via integrations | Not visible     | No (one-size-fits-all) |
| **STAY App**            | Yes       | Yes (web-based)         | Unknown                  | Via integrations | Not visible     | No                     |
| **Canary Technologies** | Yes       | Partial (check-in form) | No                       | Yes (built-in)   | No              | No                     |
| **HelloShift**          | Yes       | Partial                 | No                       | Yes (AI-powered) | No              | No                     |
| **mycloud**             | Yes       | Yes                     | No                       | Limited          | No              | No                     |
| **GUDBRO (proposed)**   | Yes       | Yes                     | **Yes (explicit tiers)** | Yes (simple)     | **Yes**         | **Yes (presets)**      |

GUDBRO's differentiators in this space:

1. **Explicit progressive authentication** -- No competitor frames this as a deliberate design choice
2. **Configurable security by property type** -- Everyone else is one-size-fits-all
3. **Multi-zone WiFi** -- Surprisingly absent from guest app competitors
4. **No enterprise overhead** -- Competitors charge $3-15/room/month. GUDBRO targets simplicity for small operators.

---

## Sources

### HIGH Confidence (Official docs, multiple sources)

- [Hotel Tech Report - Hotel Guest Apps 2026](https://hoteltechreport.com/guest-experience/hotel-guest-apps) -- Market landscape, Duve #1 ranking
- [Hotel Tech Report - Contactless Check-in 2026](https://hoteltechreport.com/guest-experience/contactless-checkin) -- Canary Technologies #1, market size $4.8B
- [Duve Guest App FAQ](https://helpcenter.duve.com/hc/en-us/articles/12448420827677-Guest-App-FAQ) -- How Duve authentication works
- [RoomRaccoon Digital ID Scanner](https://roomraccoon.com/platform/digital-id-scanner/) -- Document scanning patterns
- [HelloShift Contactless Check-in](https://www.helloshift.com/contactless-checkin) -- AI-powered ID verification
- [Klippa Mobile Hotel Check-in](https://www.klippa.com/en/blog/information/mobile-hotel-check-in/) -- OCR for passport scanning

### MEDIUM Confidence (Single authoritative source)

- [SiteMinder Hotel Keyless Entry](https://www.siteminder.com/r/hotel-keyless-entry/) -- Digital key patterns
- [Uniqode QR Codes for Hotels](https://www.uniqode.com/blog/trending-use-cases/qr-codes-for-hotels) -- Dynamic QR lifecycle
- [StayFi Hotel WiFi Solutions 2025](https://stayfi.com/vrm-insider/2025/11/10/best-hotel-wifi-solutions/) -- WiFi multi-zone patterns
- [Regula Identity Verification for Travel](https://regulaforensics.com/blog/identity-verification-travel-hospitality/) -- KYC patterns in hospitality
- [Blockpass KYC for Hospitality](https://www.blockpass.org/kyc-for-hospitality/) -- Hospitality KYC requirements

### LOW Confidence (Pattern inference, single blog)

- Progressive authentication pattern applied to hospitality -- No direct hospitality source found. Pattern extrapolated from e-commerce (Amazon, Shopify) and mobile banking UX patterns. The concept is sound but novel in this domain.
- Configurable security levels per property type -- No competitor offers this explicitly. Recommendation based on access control research (360Connect) showing different property types need different approaches (DAC for small, MAC for large).
- Multi-QR per room with context parameter -- No industry source. Original feature idea based on QR placement logic.
