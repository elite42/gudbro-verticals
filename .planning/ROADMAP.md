# Roadmap: GUDBRO Verticals

## Milestones

- ✅ **v1.0 QA Multi-Vertical PWAs** - Phases 1-3 (shipped 2026-01-29)
- ✅ **v1.1 In-Stay MVP Backend** - Phases 4-8 (shipped 2026-01-30)
- ✅ **v1.2 Tech Debt Cleanup** - Phases 9-12 (shipped 2026-01-30)
- ✅ **v1.3 Merchant Feedback Intelligence** - Phases 13-17 (shipped 2026-01-30)
- ✅ **v1.4 Accommodations v2** - Phases 18-24 (shipped 2026-01-31)
- 🚧 **v1.5 Frictionless Guest Access** - Phases 25-29 (in progress)

## Phases

<details>
<summary>v1.0 QA Multi-Vertical PWAs (Phases 1-3) - SHIPPED 2026-01-29</summary>

See milestones/v1-ROADMAP.md for details.

</details>

<details>
<summary>v1.1 In-Stay MVP Backend (Phases 4-8) - SHIPPED 2026-01-30</summary>

See milestones/v1.1-ROADMAP.md for details.

</details>

<details>
<summary>v1.2 Tech Debt Cleanup (Phases 9-12) - SHIPPED 2026-01-30</summary>

See milestones/v1.2-ROADMAP.md for details.

</details>

<details>
<summary>v1.3 Merchant Feedback Intelligence (Phases 13-17) - SHIPPED 2026-01-30</summary>

See milestones/v1.3-ROADMAP.md for details.

</details>

<details>
<summary>v1.4 Accommodations v2 (Phases 18-24) - SHIPPED 2026-01-31</summary>

See milestones/v1.4-ROADMAP.md for details.

</details>

### 🚧 v1.5 Frictionless Guest Access (In Progress)

**Milestone Goal:** Replace booking-code verification with room-based QR access, progressive authentication for paid actions, owner-configurable security levels, document upload with GDPR compliance, and multi-zone WiFi display.

- [x] **Phase 25: Room Code Foundation** - Permanent room codes, browse-tier QR access, instant WiFi/info dashboard
- [x] **Phase 26: Progressive Authentication** - Two-tier JWT, inline verification for paid actions, multi-guest PIN support
- [ ] **Phase 27: Owner Security Configuration** - Security presets, configurable verification methods, action-level gating
- [ ] **Phase 28: Document Upload + Visa Tracking** - Passport/visa photo upload, expiry reminders, GDPR auto-delete
- [ ] **Phase 29: Multi-Zone WiFi** - Per-zone WiFi credentials, room overrides, zone-organized display

## Phase Details

### Phase 25: Room Code Foundation

**Goal**: Guests scan a permanent room QR and immediately access WiFi credentials and property info without any login or verification
**Depends on**: Phase 24 (v1.4 complete)
**Requirements**: QRA-01, QRA-02, QRA-03, QRA-05, AUTH-01
**Success Criteria** (what must be TRUE):

1. Guest scans room QR code and sees the in-stay dashboard with WiFi and property info within 2 seconds, with zero login forms
2. Same physical QR code resolves to the current active booking for that room (date-based resolution, not stale data)
3. When no booking is active for a room, the QR shows a read-only property info page (not an error)
4. Legacy `/stay/{booking-code}` URLs continue to work exactly as before (zero regressions)
5. Guest can browse WiFi, property info, contacts, and house rules without any verification prompt
   **Plans**: 2 plans

Plans:

- [x] 25-01: Database schema + room code generation + resolve_room_access() SECURITY DEFINER function
- [x] 25-02: /stay/room/[roomCode] route + browse-tier JWT + useRoomSession hook + QR generator update

### Phase 26: Progressive Authentication

**Goal**: Guests can place orders and access paid services after seamless inline verification that upgrades their session without page reload
**Depends on**: Phase 25
**Requirements**: QRA-04, AUTH-02, AUTH-03, AUTH-04, AUTH-05
**Success Criteria** (what must be TRUE):

1. Guest tapping a paid action (e.g., order service) sees an inline verification modal -- not a redirect or separate page
2. Guest can verify with last name or numeric PIN (configurable per property)
3. After successful verification, the original action proceeds without page reload and the session stays upgraded for the rest of the stay
4. Multiple guests in the same room can each verify independently using a shared PIN
5. After checkout, the previous guest's QR blocks all orders and paid actions (session invalidated)
   **Plans**: 2 plans

Plans:

- [x] 26-01-PLAN.md — Backend: migration (PIN + verification method), verify endpoint, requireFullAccess guard, tier gating on orders
- [x] 26-02-PLAN.md — Frontend: InlineVerification bottom sheet, useRoomSession upgrade, room dashboard services + verification trigger

### Phase 27: Owner Security Configuration

**Goal**: Property owners can select a security preset that matches their property type, with sensible defaults and optional customization
**Depends on**: Phase 26
**Requirements**: CONF-01, CONF-02, CONF-03, CONF-04
**Success Criteria** (what must be TRUE):

1. Owner can select from three security presets (Family / Standard / Structured) in the backoffice settings page
2. Each preset visibly defines which guest actions require verification and which are free -- owner sees this before saving
3. Owner can customize individual action gates beyond the selected preset
4. "Family" preset allows all actions without verification; "Structured" preset requires verification for every order -- safe defaults work out of the box
   **Plans**: 2 plans

Plans:

- [ ] 27-01-PLAN.md — Migration 090 (access_settings JSONB + resolve_room_access update) + backoffice security settings page with preset selector and action toggles
- [ ] 27-02-PLAN.md — Frontend integration: room resolve returns access_settings, room dashboard uses isActionGated() for conditional verification

### Phase 28: Document Upload + Visa Tracking

**Goal**: Guests can upload passport and visa documents from the dashboard, with automatic visa expiry reminders and GDPR-compliant auto-deletion
**Depends on**: Phase 26 (requires verified session for uploads)
**Requirements**: DOC-01, DOC-02, DOC-03, DOC-04, DOC-05
**Success Criteria** (what must be TRUE):

1. Verified guest can photograph and upload their passport from the in-stay dashboard (mobile camera or file picker)
2. Guest can upload a visa page with expiry date, and receives reminders at 14, 7, and 3 days before expiry if the visa expires during their stay
3. Owner sees uploaded documents in backoffice and receives a notification when a new document is uploaded
4. All guest documents are automatically deleted 30 days after checkout (no manual intervention, GDPR compliant)
   **Plans**: TBD

Plans:

- [ ] 28-01: accom_guest_documents table + Supabase Storage private bucket + RLS + upload API + GDPR auto-delete cron
- [ ] 28-02: Guest upload UI (camera capture, HEIC conversion, compression) + visa expiry tracking + owner backoffice viewer + notification

### Phase 29: Multi-Zone WiFi

**Goal**: Guests see WiFi credentials organized by zone, with their room network highlighted prominently
**Depends on**: Phase 25 (uses room resolution infrastructure)
**Requirements**: WIFI-01, WIFI-02, WIFI-03
**Success Criteria** (what must be TRUE):

1. Owner can configure multiple WiFi networks with zone labels (room, restaurant, pool, lobby) from the backoffice
2. Guest sees all WiFi networks organized by zone on their dashboard
3. The room-specific WiFi network appears highlighted at the top of the WiFi section
   **Plans**: TBD

Plans:

- [ ] 29-01: wifi_zones JSONB schema + room WiFi override columns + backoffice WiFi zone management
- [ ] 29-02: Guest-facing multi-zone WifiCard (zone accordion, room highlight, resolution logic)

## Progress

**Execution Order:**
Phases execute in numeric order: 25 → 26 → 27 → 28 → 29

Note: Phase 28 and Phase 29 are independent of each other (both depend on Phase 26/25 respectively). Current ordering prioritizes compliance (documents) over polish (WiFi zones).

| Phase                                     | Milestone | Plans Complete | Status      | Completed  |
| ----------------------------------------- | --------- | -------------- | ----------- | ---------- |
| 1. TypeScript QA                          | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 2. UI/UX QA                               | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 3. Build & Nav QA                         | v1.0      | 2/2            | Complete    | 2026-01-29 |
| 4. Accommodations Schema                  | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 5. Seed Data                              | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 6. API Routes                             | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 7. Dashboard Frontend                     | v1.1      | 4/4            | Complete    | 2026-01-30 |
| 8. Integration & Polish                   | v1.1      | 2/2            | Complete    | 2026-01-30 |
| 9. Code Fixes                             | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 10. E2E Test Infrastructure               | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 11. E2E Smoke Tests                       | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 12. Visual and Quality                    | v1.2      | 2/2            | Complete    | 2026-01-30 |
| 13. Foundation and AI Pipeline            | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 14. Merchant Submission UI                | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 15. Merchant Notifications                | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 16. Admin Kanban                          | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 17. Analytics Dashboard                   | v1.3      | 2/2            | Complete    | 2026-01-30 |
| 18. Database Foundation                   | v1.4      | 2/2            | Complete    | 2026-01-31 |
| 19. Property Page & Booking Flow          | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 20. Payments                              | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 21. Owner Dashboard - Bookings & Property | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 22. Owner Dashboard - Calendar & Pricing  | v1.4      | 2/2            | Complete    | 2026-01-31 |
| 23. Service Ordering                      | v1.4      | 4/4            | Complete    | 2026-01-31 |
| 24. Analytics, Deals & Communication      | v1.4      | 3/3            | Complete    | 2026-01-31 |
| 25. Room Code Foundation                  | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 26. Progressive Authentication            | v1.5      | 2/2            | Complete    | 2026-02-01 |
| 27. Owner Security Configuration          | v1.5      | 0/2            | Not started | -          |
| 28. Document Upload + Visa Tracking       | v1.5      | 0/2            | Not started | -          |
| 29. Multi-Zone WiFi                       | v1.5      | 0/2            | Not started | -          |

---

_Roadmap created: 2026-01-29_
_Last updated: 2026-02-01 after Phase 26 complete_
