# Requirements: GUDBRO Stays — Frictionless Guest Access

**Defined:** 2026-01-31
**Core Value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.

## v1.5 Requirements

Requirements for frictionless guest access milestone. Each maps to roadmap phases.

### QR Access

- [x] **QRA-01**: Guest scans QR in room and immediately accesses dashboard without any login form
- [x] **QRA-02**: QR contains a permanent room code that resolves to the active booking for that room
- [x] **QRA-03**: If no active booking exists, QR shows a read-only property info page
- [x] **QRA-04**: After checkout, QR blocks orders and paid actions for previous booking
- [x] **QRA-05**: Legacy `/stay/{booking-code}` URLs continue working (backward compatibility)

### Progressive Auth

- [x] **AUTH-01**: Guest can browse WiFi, property info, contacts, house rules without any verification
- [x] **AUTH-02**: When guest tries to order a paid service, an inline verification modal appears
- [x] **AUTH-03**: Verification accepts last name or numeric PIN (configurable by owner)
- [x] **AUTH-04**: After verification, token upgrades to "full" without page reload
- [x] **AUTH-05**: Multi-guest: multiple people in same room can verify independently via PIN

### Owner Configuration

- [ ] **CONF-01**: Owner selects a security preset (Family/Standard/Structured) from backoffice
- [ ] **CONF-02**: Each preset defines which actions require verification and which are free
- [ ] **CONF-03**: Owner can customize gated actions beyond the preset
- [ ] **CONF-04**: Safe defaults: "Family" preset requires no verification, "Structured" requires verification for all orders

### Multi-Zone WiFi

- [ ] **WIFI-01**: Owner can configure multiple WiFi networks per zone (room, restaurant, pool, lobby)
- [ ] **WIFI-02**: Guest sees WiFi credentials organized by zone in dashboard
- [ ] **WIFI-03**: Room WiFi network is highlighted at the top

### Document Upload

- [ ] **DOC-01**: Guest can photograph and upload passport from dashboard
- [ ] **DOC-02**: Guest can upload visa page with expiry date
- [ ] **DOC-03**: System sends automatic reminders if visa expires during stay (14, 7, 3 days before)
- [ ] **DOC-04**: Owner sees uploaded documents in backoffice and receives notification of new uploads
- [ ] **DOC-05**: Documents are automatically deleted 30 days after checkout (GDPR compliance)

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

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature                     | Reason                                                |
| --------------------------- | ----------------------------------------------------- |
| Captive portal WiFi         | Hardware integration, different domain                |
| Automatic passport OCR      | ML complexity, manual upload sufficient for MVP       |
| Biometric verification      | Overkill for target market (small SEA accommodations) |
| Channel manager integration | Enterprise feature, separate milestone                |
| Guest account system        | Friction kills conversion; room QR is sufficient      |
| NFC passport reading        | Requires native app, not PWA-compatible               |

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
| CONF-01     | 27    | Pending  |
| CONF-02     | 27    | Pending  |
| CONF-03     | 27    | Pending  |
| CONF-04     | 27    | Pending  |
| WIFI-01     | 29    | Pending  |
| WIFI-02     | 29    | Pending  |
| WIFI-03     | 29    | Pending  |
| DOC-01      | 28    | Pending  |
| DOC-02      | 28    | Pending  |
| DOC-03      | 28    | Pending  |
| DOC-04      | 28    | Pending  |
| DOC-05      | 28    | Pending  |

**Coverage:**

- v1.5 requirements: 22 total
- Mapped to phases: 22
- Unmapped: 0

---

_Requirements defined: 2026-01-31_
_Last updated: 2026-02-01 after Phase 26 complete (QRA-04 + AUTH-02,03,04,05 marked Complete)_
