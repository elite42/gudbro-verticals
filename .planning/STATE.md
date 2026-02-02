# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-01)

**Core value:** Every vertical PWA must deliver a polished, consistent, mobile-first experience that makes the merchant look professional and helps tourists/customers navigate services in their language.
**Current focus:** v1.5 Frictionless Guest Access + Accommodations Polish — Phase 39 in progress

## Current Position

Phase: 39 of 39 (Polish + Analytics)
Plan: 2 of 2
Status: Phase complete - v1.5 milestone complete
Last activity: 2026-02-02 — Completed 39-02-PLAN.md (receipt confirmation)

Progress: v1.0-v1.4 [██████████████████████████████████████████████████] 57/57 plans
Progress: v1.5 [██████████████████████████████████████████████████] 35/35 plans

## Performance Metrics

**Velocity:**

- Total plans completed: 92 (+ 1 quick task)
- Average duration: ~3.4 min/plan
- Total execution time: ~7.3 hours

**By Milestone:**

| Milestone | Plans | Total Time | Avg/Plan |
| --------- | ----- | ---------- | -------- |
| v1.0      | 6     | ~20 min    | 3.3 min  |
| v1.1      | 12+1  | ~32 min    | 2.7 min  |
| v1.2      | 8     | ~62 min    | 7.8 min  |
| v1.3      | 10    | ~33 min    | 3.3 min  |
| v1.4      | 21    | ~87 min    | 4.1 min  |
| v1.5      | 35/35 | ~176 min   | 5.0 min  |

## Accumulated Context

### Decisions

Full history in PROJECT.md Key Decisions table and milestone archives.

Recent decisions for v1.5 extended roadmap:

- Phase 30 = Shared Module Audit (user-approved prerequisite before implementation)
- Bug fixes BEFORE features (from pitfalls research, Phase 31 before 33)
- Dashboard refactor BEFORE adding new sections (Phase 33 before 34/35/36)
- Tourist Concierge for accommodations only (5 CON-\* requirements in Phase 36)
- Gantt/Timeline calendar via CSS Grid, not library (Phase 32)
- Zero new npm packages confirmed by research (except browser-image-compression + heic2any for Phase 28)
- Backoffice multi-verticale and fatturazione DEFERRED (out of scope)
- WIFI-01: wifi_zones as JSONB array on accom_properties (max 8 zones)
- WIFI-02: Legacy wifi_network/wifi_password columns preserved (not dropped)
- WIFI-03: Room WiFi overrides as simple nullable TEXT columns
- WIFI-04: buildWifiInfo() shared helper ensures all routes return identical WifiInfo shape
- WIFI-05: Property route returns zones without room override (no room context in JWT)
- WIFI-06: Pre-arrival email uses primary zone via buildWifiInfo, not all zones
- AUDIT-01: Do NOT consolidate duplicated patterns during v1.5 (use @shared/payment for new work)
- AUDIT-02: QR extraction: move generator + types to shared, leave CRUD service in backoffice
- AUDIT-03: Phase 31 currency selector should use @shared/payment directly (not copy converter pattern)
- AUDIT-04: Notification Dispatcher is highest-priority extraction (needed by phases 34, 35, 38)
- IMG-01: Room images stored as string[] in room.images JSONB, single primary image for now
- IMG-02: New rooms show 'save first' message instead of upload (no room ID yet)
- IMG-03: Added feedback-screenshots to ImageUploadFolder type (was in route but missing from type)
- GANTT-01: GanttCalendar manages own date navigation, notifies parent via onDateRangeChange callback
- GANTT-02: 14-day desktop / 7-day mobile view with CSS Grid and sticky room labels
- ONBOARD-01: Onboarding wizard uses link-out pattern for rooms/photos/wifi steps (not embedded components)
- ONBOARD-02: shouldShowWizard checks name + contact as minimum configured threshold
- POLICY-01: StructuredPolicies stores house_rules as string[] (backward compatible with existing data)
- GRID-01: Cards use borderTop 3px color accent instead of full background tint for cleaner look
- GRID-02: Commented out WelcomeCard/CheckoutInfo/ContactSheet/QuickActions/VisaStatusCard/VisaExpiryAlert with migration notes for 33-02
- GRID-03: WiFi dismiss starts hidden (dismissed=true) then checks localStorage in useEffect to avoid flash
- NAV-01: ContactSheet refactored to controlled mode (isOpen/onClose) -- room page updated too
- NAV-02: checkInTime and checkoutProcedure added to PropertyInfo type and all 4 API routes
- NAV-03: BottomNav reduced from 5 to 4 tabs, Menu removed, Map renamed to Explore
- NAV-04: ProfileView preferences section is a stub for Phase 38 returning guest detection
- SVC-01: Migration renumbered from 088 to 095 (088 already existed as room-codes)
- SVC-02: category_tag denormalized on order items for query performance
- SVC-UI-01: Vertical card layout with h-36 image area for photo-forward design
- SVC-UI-02: includedInRate as optional prop for backward compatibility
- MINIBAR-01: Migration numbered 096 (not 089 as plan stated) since 095 was latest
- MINIBAR-02: self_service auto-confirms orders like auto_confirm/whatsapp_notify
- SVC-10-01: Import API uses validateAdminApiKey pattern consistent with existing accommodation APIs
- SVC-10-02: ImportFromMenuDialog is standalone component (not embedded in OrderManagement) for reusability
- FB-01: feedback-screenshots storage bucket (separate from guest-documents for access control)
- FB-02: Denormalized guest_name and guest_room_number on feedback for display without joins
- FB-03: Complaints trigger high-priority notifications, other categories use normal priority
- FB-04: Feedback card shown only when booking exists (not browse-tier sessions)
- FB-05: Added checked_out_at column to accom_bookings for future post-stay feedback cron timing
- FB-06: Feedback token reuses GUEST_JWT_SECRET with type='feedback' claim for differentiation
- CON-01: ConciergeHub uses full-screen overlay (z-60) matching ServiceCatalog pattern
- CON-02: Country data keyed by ISO code (VN) with getConciergeData() helper
- CON-03: Section card tap shows coming-soon placeholder (content in 36-02)
- CON-04: Backoffice uses user.id as merchantId (AuthContextType has no merchantId field)
- DISC-01: ConciergeDiscover uses dual-mode via optional onBack prop (tab mode vs sub-view mode)
- DISC-02: Attractions data uses country-keyed registry pattern matching concierge-data.ts
- CON-05: Sub-view components manage their own full-screen overlay (z-60) rather than rendering inside ConciergeHub container
- CON-06: activeSection type extended with 'useful-numbers' union (not added to ConciergeSection type which controls merchant toggles)
- CON-07: Emergency contacts split into 3 visual groups (emergency/hotlines/embassies) with color-coded cards
- VOUCHER-01: New validate_accommodation_voucher() RPC instead of extending validate_voucher() (coffeeshop backward compat)
- VOUCHER-02: Voucher discount applied AFTER existing weekly/monthly discounts with Math.max(0) floor
- VOUCHER-03: Convention redemption insert is fire-and-forget (non-blocking) to not break booking flow
- VOUCHER-04: validate-voucher endpoint is public (no auth) matching property page booking flow pattern
- CONV-01: Backoffice conventions API uses owner_id lookup on accom_properties (not merchant_id) to find property IDs
- CONV-02: ConventionPartnerCards returns null when empty (section hidden, not error state)
- GUEST-01: Returning guest detection uses SECURITY DEFINER SQL function with 3 OR signals (never name alone)
- GUEST-02: Checkout request unique constraint per booking+type (one request per type)
- GUEST-03: Conflict detection runs on GET (lazy evaluation) not on insert
- GUEST-04: Guest country field uses static select with ~27 common countries + Other
- RECEIPT-01: ReceiptView rendered inside OrderDetailSheet for delivered orders with receiptAutoConfirmAt (signals receipts enabled)
- RECEIPT-02: OrderListView passes propertyName/bookingCode/token/onOrderUpdated through to OrderDetailSheet (optional props for backward compat)
- RECEIPT-03: Auto-confirmed detection is client-side (receiptAutoConfirmAt <= now) without extra API call

### Blockers/Concerns

- Stripe MCC 7011 extended authorization needs validation with SEA property owners
- ADMIN_API_KEY auth pattern needs migration to session-based auth
- Phase 28: HEIC conversion reliability on Android needs device testing (Samsung, Xiaomi, Oppo)
- Phase 28: Vietnam-specific document retention rules (NA17) need local legal validation
- Phase 32: Gantt calendar mobile UX needs validation on phone screens
- Pre-existing @shared/ module resolution errors in DashboardHeader.tsx and WifiCard.tsx (project-level config issue)

### Pending Todos

- Migration 095 needs to be applied to live database (Supabase MCP/CLI not available during execution)
- Migration 096 needs to be applied to live database
- Migration 097 needs to be applied to live database
- Migration 098 needs to be applied to live database
- Migration 099 needs to be applied to live database
- Storage bucket `feedback-screenshots` needs to be created in Supabase dashboard
- Migration 100 needs to be applied to live database (guest lifecycle)
- Migration 101 needs to be applied to live database (order performance + receipts)

## Session Continuity

Last session: 2026-02-02
Stopped at: Completed 39-02-PLAN.md (receipt confirmation) — Phase 39 complete, v1.5 milestone complete
Resume file: None
Next: New milestone — see docs/roadmaps/MULTI-VERTICAL-STRATEGY.md

---

_Last updated: 2026-02-02 after 39-02 execution complete — v1.5 milestone finished_
