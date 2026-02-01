# Requirements: GUDBRO Stays — Frictionless Guest Access + Accommodations Polish

**Defined:** 2026-01-31
**Extended:** 2026-02-01 (manual test results + Tourist Concierge)
**Core Value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.

## v1.5 Requirements

### QR Access (Complete)

- [x] **QRA-01**: Guest scans QR in room and immediately accesses dashboard without any login form
- [x] **QRA-02**: QR contains a permanent room code that resolves to the active booking for that room
- [x] **QRA-03**: If no active booking exists, QR shows a read-only property info page
- [x] **QRA-04**: After checkout, QR blocks orders and paid actions for previous booking
- [x] **QRA-05**: Legacy `/stay/{booking-code}` URLs continue working (backward compatibility)

### Progressive Auth (Complete)

- [x] **AUTH-01**: Guest can browse WiFi, property info, contacts, house rules without any verification
- [x] **AUTH-02**: When guest tries to order a paid service, an inline verification modal appears
- [x] **AUTH-03**: Verification accepts last name or numeric PIN (configurable by owner)
- [x] **AUTH-04**: After verification, token upgrades to "full" without page reload
- [x] **AUTH-05**: Multi-guest: multiple people in same room can verify independently via PIN

### Owner Configuration (Complete)

- [x] **CONF-01**: Owner selects a security preset (Family/Standard/Structured) from backoffice
- [x] **CONF-02**: Each preset defines which actions require verification and which are free
- [x] **CONF-03**: Owner can customize gated actions beyond the preset
- [x] **CONF-04**: Safe defaults: "Family" preset requires no verification, "Structured" requires verification for all orders

### Multi-Zone WiFi (Complete)

- [x] **WIFI-01**: Owner can configure multiple WiFi networks per zone (room, restaurant, pool, lobby)
- [x] **WIFI-02**: Guest sees WiFi credentials organized by zone in dashboard
- [x] **WIFI-03**: Room WiFi network is highlighted at the top

### Document Upload (Complete)

- [x] **DOC-01**: Guest can photograph and upload passport from dashboard
- [x] **DOC-02**: Guest can upload visa page with expiry date
- [x] **DOC-03**: System sends automatic reminders if visa expires during stay (14, 7, 3 days before)
- [x] **DOC-04**: Owner sees uploaded documents in backoffice and receives notification of new uploads
- [x] **DOC-05**: Documents are automatically deleted 30 days after checkout (GDPR compliance)

### Shared Infrastructure

- [x] **INF-01**: Audit of reusable modules across verticals produces catalog with status (ready/adaptable/to-build)
- [x] **INF-02**: QR code generation extracted for WiFi QR in PWA guest dashboard
- [ ] **INF-03**: Conventions system adapted for accommodations (breakfast vouchers with date, benefit_scope column)

### Bug Fixes

- [x] **BUG-01**: Guest name displays correctly without duplication ("John Smith" not "John Smith Smith")
- [x] **BUG-02**: Bottom nav tabs Map, Menu, Profile, Services have working content and correct icons
- [x] **BUG-03**: Homepage shows visual cards instead of text wall
- [x] **BUG-04**: Service category names display without Phosphor icon name prefix ("Breakfast" not "CookingPot Breakfast")
- [x] **BUG-05**: Time formats display as "7:00 - 10:30 AM" not "07:00:00 - 10:30:00"
- [x] **BUG-06**: Service items show product images instead of grey placeholder boxes
- [x] **BUG-07**: Currency selector available in PWA guest header
- [x] **BUG-08**: WiFi section includes scannable QR code (not just copy password)
- [x] **BUG-09**: Room image upload works in backoffice (replacing "coming soon" placeholder)

### PWA Homepage & Navigation

- [ ] **NAV-01**: Homepage redesign with max 6-8 colored clickable cards (visual, not text wall)
- [ ] **NAV-02**: WiFi box is dismissible and recoverable from Concierge hub
- [ ] **NAV-03**: Useful numbers moved to dedicated page, linked from Concierge hub
- [ ] **NAV-04**: Check-in/out times shown inside House Rules section, not separate
- [ ] **NAV-05**: Contact Host moved to menu/header, not prominent homepage section
- [ ] **NAV-06**: Explore/Map page with local attractions, tours, experiences
- [ ] **NAV-07**: Central bottom nav button opens Concierge hub (Discover, Emergency, Safety, Culture, Transport + WiFi, Documents, Contacts)
- [ ] **NAV-08**: Profile page with personal data, documents, history, preferences, feedback

### Services & Orders

- [ ] **SVC-01**: Service catalog redesign with large photos and visible add-to-cart button
- [ ] **SVC-02**: "Included in rate" flag for breakfast and other complimentary items
- [ ] **SVC-03**: Minibar self-service: guest marks consumed items, owner receives notification and confirms
- [ ] **SVC-04**: Order detail view with items, notes, prices breakdown
- [ ] **SVC-05**: Order category tag in order list (food, beverage, laundry, etc.)
- [ ] **SVC-06**: Remove "All" tab from orders, show counts on filtered tabs
- [ ] **SVC-07**: Order performance tracking (order-to-delivery average time)
- [ ] **SVC-08**: Guest receipt confirmation via PWA (optional toggle in Settings, auto-confirm with timeout)
- [ ] **SVC-09**: Dry cleaning option in laundry services
- [ ] **SVC-10**: F&B catalog import picker for minibar/breakfast items

### Backoffice Owner

- [ ] **OWN-01**: Room floor/level field in room CRUD
- [x] **OWN-02**: Service/item image upload (replacing Image URL field with direct upload)
- [ ] **OWN-03**: Structured policies form (checkbox house rules, dropdown cancellation policy)
- [ ] **OWN-04**: Complete property data (social links, Google Maps, communication methods, hours, staff languages)
- [ ] **OWN-05**: Onboarding wizard with required vs optional fields and progress bar
- [ ] **OWN-06**: Timeline/Gantt calendar view (rooms × dates grid) for multi-room properties
- [ ] **OWN-07**: Booking history tab for past stays
- [ ] **OWN-08**: Returning guest badge (based on name + last name + nationality match)
- [ ] **OWN-09**: Visa expiry alert before checkout (warn owner if visa expires during stay)

### Guest Experience

- [ ] **GXP-01**: Early check-in / late checkout request via PWA (owner approves/rejects from backoffice)
- [ ] **GXP-02**: In-stay feedback/complaints channel (direct guest → owner, with categories and photo upload)
- [ ] **GXP-03**: Post-stay feedback with category ratings and comments (sent 2-24h after checkout)
- [ ] **GXP-04**: Delivery apps section with Grab, ShopeeFood, Baemin cards and deep-links
- [ ] **GXP-05**: Convention restaurant cards with visual display (linked to conventions module)

### Tourist Concierge (Accommodations only)

- [ ] **CON-01**: Concierge hub accessible from center bottom nav button with 5 sections (Discover, Emergency, Safety, Culture, Transport)
- [ ] **CON-02**: Merchant can toggle on/off each Concierge section from backoffice settings
- [ ] **CON-03**: Emergency numbers and embassy contacts displayed with click-to-call
- [ ] **CON-04**: Safety tips organized by category (transport, money, food, street, hotels, tours, digital) with accordion expand
- [ ] **CON-05**: Cultural tips (dos/don'ts) and recommended apps section

## v2+ Requirements

Deferred to future release. Tracked but not in current roadmap.

### Advanced Document Processing

- **DOC-06**: Automatic OCR extraction from passport photos
- **DOC-07**: NFC/chip passport verification
- **DOC-08**: NA17 police report export (Vietnam)

### WiFi Integration

- **WIFI-04**: Captive portal WiFi integration (auto-connect)
- **WIFI-05**: WiFi analytics (device count, bandwidth usage)

### Advanced Security

- **SEC-01**: IP-based WiFi network verification (confirm guest is on hotel WiFi)
- **SEC-02**: Biometric verification option

### Cross-Vertical

- **XV-01**: Tourist Concierge rolled out to all 8 verticals
- **XV-02**: Backoffice multi-verticale (1 account N verticali, menu dinamico)
- **XV-03**: Sistema fatturazione multi-verticale (PDF, dati fiscali)

### Advanced Services

- **SVC-11**: Digital laundry form in In-Stay Dashboard
- **SVC-12**: Minibar auto-restock notifications with inventory tracking

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature                          | Reason                                                      |
| -------------------------------- | ----------------------------------------------------------- |
| Captive portal WiFi              | Hardware integration, different domain                      |
| Automatic passport OCR           | ML complexity, manual upload sufficient for MVP             |
| Biometric verification           | Overkill for target market (small SEA accommodations)       |
| Channel manager integration      | Enterprise feature, separate milestone                      |
| Guest account system             | Friction kills conversion; room QR is sufficient            |
| NFC passport reading             | Requires native app, not PWA-compatible                     |
| Backoffice multi-verticale       | Separate milestone, requires complete architecture overhaul |
| Multi-vertical fatturazione      | Separate milestone, needs careful design                    |
| Cross-vertical Concierge rollout | Do accommodations first, iterate, then roll out             |
| Calendar sync (external)         | Low priority for 1-25 room properties                       |
| Stripe Connect marketplace       | Commission splits manual for MVP                            |
| Dashboard section reordering     | Nice to have, defer to v2                                   |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status   |
| ----------- | ----- | -------- |
| QRA-01      | 25    | Complete |
| QRA-02      | 25    | Complete |
| QRA-03      | 25    | Complete |
| QRA-04      | 26    | Complete |
| QRA-05      | 25    | Complete |
| AUTH-01     | 25    | Complete |
| AUTH-02     | 26    | Complete |
| AUTH-03     | 26    | Complete |
| AUTH-04     | 26    | Complete |
| AUTH-05     | 26    | Complete |
| CONF-01     | 27    | Complete |
| CONF-02     | 27    | Complete |
| CONF-03     | 27    | Complete |
| CONF-04     | 27    | Complete |
| DOC-01      | 28    | Pending  |
| DOC-02      | 28    | Pending  |
| DOC-03      | 28    | Pending  |
| DOC-04      | 28    | Pending  |
| DOC-05      | 28    | Pending  |
| WIFI-01     | 29    | Complete |
| WIFI-02     | 29    | Complete |
| WIFI-03     | 29    | Complete |
| INF-01      | 30    | Complete |
| INF-02      | 31    | Complete |
| INF-03      | 37    | Pending  |
| BUG-01      | 31    | Complete |
| BUG-02      | 31    | Complete |
| BUG-03      | 31    | Complete |
| BUG-04      | 31    | Complete |
| BUG-05      | 31    | Complete |
| BUG-06      | 31    | Complete |
| BUG-07      | 31    | Complete |
| BUG-08      | 31    | Complete |
| BUG-09      | 31    | Complete |
| NAV-01      | 33    | Pending  |
| NAV-02      | 33    | Pending  |
| NAV-03      | 36    | Pending  |
| NAV-04      | 33    | Pending  |
| NAV-05      | 33    | Pending  |
| NAV-06      | 36    | Pending  |
| NAV-07      | 36    | Pending  |
| NAV-08      | 33    | Pending  |
| SVC-01      | 34    | Pending  |
| SVC-02      | 34    | Pending  |
| SVC-03      | 34    | Pending  |
| SVC-04      | 34    | Pending  |
| SVC-05      | 34    | Pending  |
| SVC-06      | 34    | Pending  |
| SVC-07      | 39    | Pending  |
| SVC-08      | 39    | Pending  |
| SVC-09      | 34    | Pending  |
| SVC-10      | 34    | Pending  |
| OWN-01      | 32    | Complete |
| OWN-02      | 31    | Complete |
| OWN-03      | 32    | Complete |
| OWN-04      | 32    | Complete |
| OWN-05      | 32    | Complete |
| OWN-06      | 32    | Complete |
| OWN-07      | 32    | Complete |
| OWN-08      | 38    | Pending  |
| OWN-09      | 38    | Pending  |
| GXP-01      | 38    | Pending  |
| GXP-02      | 35    | Pending  |
| GXP-03      | 35    | Pending  |
| GXP-04      | 38    | Pending  |
| GXP-05      | 37    | Pending  |
| CON-01      | 36    | Pending  |
| CON-02      | 36    | Pending  |
| CON-03      | 36    | Pending  |
| CON-04      | 36    | Pending  |
| CON-05      | 36    | Pending  |

**Coverage:**

- v1.5 requirements: 71 total (22 original + 49 extended)
- Completed: 14 (phases 25-27)
- Mapped to phases: 71/71 (100% coverage)
- Unmapped (TBD): 0

---

_Requirements defined: 2026-01-31_
_Last updated: 2026-02-01 after roadmap extension (all 49 new requirements mapped to phases 30-39)_
