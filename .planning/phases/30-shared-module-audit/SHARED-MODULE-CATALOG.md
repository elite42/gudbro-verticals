# Shared Module Catalog

**Phase 30 Deliverable** | Audited: 2026-02-01 | Valid until: 2026-03-01

This catalog enables phases 31-39 to make instant build-vs-reuse decisions. Each entry contains enough detail to skip re-investigation.

---

## Phase Dependency Matrix

| Phase | Name                         | Required Shared Modules                                                                                              | Blocking?                                              |
| ----- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 31    | Bug Fixes + Image Foundation | QR Generator (extract from backoffice), Image Utils (reuse from accommodations), @shared/payment (currency selector) | YES - QR extraction is Phase 31 deliverable            |
| 32    | Owner Dashboard Enhancements | None specific (app-level backoffice work)                                                                            | No                                                     |
| 33    | Guest Dashboard Redesign     | Core Module Components (WiFiCard, ContactsCard), @gudbro/ui (Card, Dialog)                                           | MEDIUM - components exist but unused by accommodations |
| 34    | Service Expansion + Minibar  | Notification Dispatcher (owner alerts), Supabase Realtime pattern (live updates)                                     | MEDIUM - dispatcher needs extraction                   |
| 35    | Guest Feedback System        | AI Feedback Pipeline (fork for accommodations), Image Utils (photo upload), Notification Dispatcher (push to owner)  | HIGH - pipeline needs taxonomy fork                    |
| 36    | Guest Requests + Concierge   | Core Modules (AttractionsCard, ContactsCard, TransportConfig), I18n pattern                                          | MEDIUM - core components exist                         |
| 37    | Conventions + Vouchers       | Conventions Service (adapt benefit_scope), @shared/payment (pricing)                                                 | HIGH - service needs schema adaptation                 |
| 38    | Guest Lifecycle              | Notification Dispatcher (visa alerts), @shared/payment (receipts), Document types (from Phase 28)                    | MEDIUM - dispatcher needs extraction                   |
| 39    | Polish + Analytics           | @gudbro/utils (error handling), @gudbro/config (constants)                                                           | LOW - all ready                                        |

### Priority Ranking (by phase dependency count)

| Module                  | Needed By Phases | Priority                                 |
| ----------------------- | ---------------- | ---------------------------------------- |
| Notification Dispatcher | 34, 35, 38       | CRITICAL - extract from backoffice       |
| @shared/payment         | 31, 37, 38       | HIGH - already a workspace package       |
| Image Utils             | 31, 35           | HIGH - already in accommodations         |
| QR Generator            | 31               | HIGH - Phase 31 extracts this            |
| Core Module Components  | 33, 36           | MEDIUM - exist but need integration      |
| AI Feedback Pipeline    | 35               | MEDIUM - needs taxonomy fork             |
| Conventions Service     | 37               | MEDIUM - needs schema adaptation         |
| @gudbro/ui              | 33               | LOW - ready but unused by accommodations |
| @gudbro/utils           | 39               | LOW - ready                              |
| @gudbro/config          | 39               | LOW - ready                              |
| I18n System             | 36               | LOW - tiny module                        |
| Supabase Realtime       | 34               | LOW - pattern exists in backoffice       |

### Phase 31 Blockers

Phase 31 is the immediate next implementation phase. These modules must be ready:

1. **QR Generator** (status: needs extraction) - Currently in `apps/backoffice/lib/qr/`. Phase 31 extracts it to a shared location for WiFi QR codes in the guest PWA. The module is self-contained (1,161 LOC) but imports `@/lib/supabase-admin` which must be parameterized.

2. **Image Utils** (status: ready) - Already in `apps/accommodations/frontend/lib/image-utils.ts` (143 LOC). Phase 31 extends this for service/item image upload. No extraction needed, just enhancement in place.

3. **@shared/payment** (status: ready) - formatPrice() and currency detection needed for the currency selector bug fix. Already a workspace package with proper exports.

---

## 1. UI Components

### @gudbro/ui

- **Location:** `shared/ui/`
- **Package:** `@gudbro/ui` (workspace package)
- **Status:** Ready
- **LOC:** 903
- **Key exports:** Button, Card, Dialog, Toast, Tooltip, Badge, Avatar, Skeleton, Spinner, Input, Label, Textarea, cn()
- **Used by:** No app currently imports from @gudbro/ui (0 import references found)
- **Import example:** `import { Button, Card, CardContent, Dialog, cn } from '@gudbro/ui'`
- **Phases that need it:** 33 (dashboard card layout)
- **Note:** Fully functional shadcn/ui-based components with Radix primitives. Despite being unused, all components are production-ready. Apps currently duplicate similar components locally.

### @gudbro/components

- **Location:** `shared/components/`
- **Package:** `@gudbro/components` (workspace package)
- **Status:** Ready (F&B-specific, not needed for accommodations)
- **LOC:** 745
- **Key exports:** ProductCardHero, ProductCardTall, ProductCardStandard, ProductCardCompact, ProductCardMini, ProductCardBottle + Skeleton variants
- **Used by:** No app currently imports (0 references)
- **Import example:** `import { ProductCardHero, ProductCardStandard } from '@gudbro/components'`
- **Phases that need it:** None for accommodations phases 31-39. F&B-specific product card variants.
- **Note:** Designed for food/beverage menus. Accommodations phases will NOT use this package. Could be relevant if Phase 34 imports F&B catalog items for minibar.

### @gudbro/menu-template

- **Location:** `shared/menu-template/`
- **Package:** `@gudbro/menu-template` (workspace package)
- **Status:** Ready (F&B-specific layout)
- **LOC:** 1,081
- **Key exports:** Header, Footer, BottomNav + VerticalConfig types, BaseItem types, Category types
- **Used by:** coffeeshop (config), wellness (config) - 2 apps
- **Import example:** `import { Header, Footer, BottomNav } from '@gudbro/menu-template'`
- **Phases that need it:** None directly. Accommodations has its own layout (InStayDashboard).
- **Note:** Provides the standard PWA shell for F&B verticals. The VerticalConfig type overlaps with shared/core TemplateConfig but serves different purposes (menu layout vs property modules).

### Core Module Components (shared/core/modules/components)

- **Location:** `shared/core/modules/components/`
- **Package:** Not packaged (shared/core has no package.json)
- **Status:** Needs adaptation
- **LOC:** 949 (WiFiCard: 186, ContactsCard: 212, PriceListCard: 226, AttractionsCard: 325)
- **Key exports:** WiFiCard, ContactsCard, PriceListCard, AttractionsCard
- **Used by:** No app imports these yet (0 references in apps/)
- **Import example:** Currently no package name. Would need: `import { WiFiCard } from '../../shared/core/modules/components/WiFiCard'` (relative path)
- **Phases that need it:** 33 (dashboard redesign), 36 (concierge hub)
- **Adaptation needed:**
  - WiFiCard: The accommodations app already has its own WifiCard component (built in Phase 29 with multi-zone support). The shared/core WiFiCard is simpler (single-network). Phase 33 should use the accommodations-specific version, NOT the shared one.
  - ContactsCard: Ready for use in Phase 33/36. May need accommodations-specific contact fields (emergency numbers, embassy contacts).
  - AttractionsCard: Ready for Phase 36 Concierge/Explore page. Well-built with 325 LOC.
  - PriceListCard: Ready but may not be needed (accommodations prices are per-service, not a static price list).

---

## 2. Data & Types

### @gudbro/types

- **Location:** `shared/types/`
- **Package:** `@gudbro/types` (workspace package)
- **Status:** Ready
- **LOC:** 638
- **Key exports:** Supabase generated types (Database, Tables, Enums), custom types (API, Auth, Points, Badge, Menu)
- **Used by:** No app currently imports (0 references)
- **Import example:** `import type { Database } from '@gudbro/types'`
- **Phases that need it:** 39 (general type safety polish)
- **Note:** The Supabase generated types may be stale. Apps generate their own types locally from the Supabase schema. The custom types are F&B-focused (Points, Badge, Menu).

### @gudbro/config

- **Location:** `shared/config/`
- **Package:** `@gudbro/config` (workspace package)
- **Status:** Ready
- **LOC:** 408
- **Key exports:** env validation (Zod schemas), constants (POINTS_CONFIG, SUBSCRIPTION_TIERS, BADGE_LEVELS, API_CONFIG, DB_CONFIG, FEATURES)
- **Used by:** No app currently imports (0 references)
- **Import example:** `import { API_CONFIG, FEATURES } from '@gudbro/config'`
- **Phases that need it:** 39 (constants consolidation)
- **Note:** Constants are primarily F&B-focused (loyalty points, subscription tiers, badges). Accommodations would need its own constants (check-in/out defaults, security presets, etc.) added here or in a separate config.

### Core Module Types (shared/core/modules/types.ts)

- **Location:** `shared/core/modules/types.ts`
- **Package:** Not packaged
- **Status:** Needs adaptation
- **LOC:** 326
- **Key exports:** WiFiConfig, WiFiNetwork, PriceCategory, PriceItem, ContactInfo, ContactConfig, AttractionItem, AttractionsConfig, TransportMode, TransportConfig, ServicesConfig, HouseRulesConfig, CheckInOutConfig, DealsConfig, TemplateConfig, ModuleType
- **Used by:** No app imports directly (0 references in apps/)
- **Import example:** Relative import only: `import type { WiFiConfig, ContactConfig } from '../../shared/core/modules/types'`
- **Phases that need it:** 33 (dashboard config types), 34 (ServicesConfig), 36 (AttractionsConfig, TransportConfig)
- **Adaptation needed:** These types define the 9 module system (WiFi, PriceList, Contacts, Attractions, Transport, Services, HouseRules, CheckInOut, Deals). The types are well-defined but need packaging to be importable via `@gudbro/core`. Key gap: the types were designed during v1.1 and may not reflect v1.5 additions (multi-zone WiFi, document upload, security settings).

---

## 3. Infrastructure

### @gudbro/utils

- **Location:** `shared/utils/`
- **Package:** `@gudbro/utils` (workspace package)
- **Status:** Ready
- **LOC:** 932
- **Key exports:** AppError hierarchy (ValidationError, NotFoundError, AuthError, etc.), Logger (structured logging), Result<T, E> type (Railway-oriented), API response helpers (successResponse, errorResponse, paginatedResponse)
- **Used by:** backoffice (error-handler.ts) - 1 app
- **Import example:** `import { AppError, ValidationError, Logger, Result } from '@gudbro/utils'`
- **Phases that need it:** 39 (error handling polish), any phase that adds API routes
- **Note:** Most apps handle errors ad-hoc. This package provides a clean error hierarchy that should be adopted broadly. The Logger supports structured JSON output suitable for production monitoring.

### @gudbro/database

- **Location:** `shared/database/`
- **Package:** `@gudbro/database` (workspace package)
- **Status:** Ready (infrastructure, not directly imported in app code)
- **LOC:** 297,478 (bulk of this is seed data and migrations)
- **Key exports:** Migration files (76+), seed data, database types, safety filters
- **Used by:** All apps indirectly (via Supabase schema). Not imported as a TypeScript module.
- **Phases that need it:** Any phase adding migrations (31, 34, 35, 37, 38)
- **Note:** This is infrastructure, not a library. Migrations are applied via Supabase CLI, not imported.

### Supabase Client Patterns (DUPLICATED)

- **Location:** Multiple files across 4 apps
- **Package:** Not packaged
- **Status:** Needs adaptation (HIGH divergence)
- **Copies:**

| App            | Files                                                                                             | Total LOC | Pattern                                                              |
| -------------- | ------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------- |
| backoffice     | supabase.ts, supabase-admin.ts, supabase-browser.ts, supabase-server.ts, supabase-read-replica.ts | 637       | 5 specialized clients (admin, browser, server, read-replica, legacy) |
| accommodations | supabase.ts                                                                                       | 77        | Single client with server/browser helpers                            |
| coffeeshop     | supabase.ts                                                                                       | 67        | Single client                                                        |
| waiter         | supabase.ts                                                                                       | 32        | Minimal client                                                       |

- **Divergence:** HIGH - Backoffice has 5 variants with SSR-aware cookie handling, read replicas, and service role key. Other apps use simple createClient().
- **Recommendation:** Do NOT consolidate. Each app has different auth/SSR requirements. The backoffice pattern is not portable to PWAs. Document as "intentionally diverged."

---

## 4. Business Logic

### @shared/payment

- **Location:** `shared/payment/`
- **Package:** `@shared/payment` (workspace package - note: naming inconsistency, should be @gudbro/payment)
- **Status:** Ready
- **LOC:** 475
- **Key exports:**
  - Types: PaymentMethod, PaymentStatus, CardBrand, CryptoCurrency, PaymentMethodConfig, SavedPaymentMethod, PaymentIntent, PaymentResult, CurrencyConfig
  - Constants: SUPPORTED_CURRENCIES (10 currencies), DEFAULT_PAYMENT_METHODS (7 methods), CRYPTO_CURRENCIES (7 coins)
  - Utils: formatPrice(), convertCurrency(), getCurrency(), detectCurrency(), calculateFee(), validateCardNumber(), detectCardBrand(), formatCardNumber(), formatExpiry(), maskCardNumber(), generateWhatsAppPaymentLink(), isMethodAvailableInRegion()
- **Used by:** accommodations (CryptoPaymentOptions), tours (TourCards, PaymentSelector, PaymentForm) - 2 apps, 11 files
- **Import example:** `import { formatPrice, convertCurrency, SUPPORTED_CURRENCIES, type PaymentMethod } from '@shared/payment'`
- **Phases that need it:** 31 (currency selector), 37 (voucher pricing), 38 (receipts)
- **Note:** The naming inconsistency (@shared vs @gudbro) should be flagged for future rename. The module is well-structured with comprehensive payment utilities. formatPrice() and detectCurrency() are the most commonly needed functions.

### Currency Converter (DUPLICATED - 5 copies)

- **Location:** `apps/{coffeeshop,laundry,gym,pharmacy,workshops}/frontend/lib/currency-converter.ts`
- **Package:** Not packaged
- **Status:** Needs adaptation (consolidation candidate)
- **Copies and LOC:**

| App        | LOC | Completeness                                                                        |
| ---------- | --- | ----------------------------------------------------------------------------------- |
| coffeeshop | 314 | Most complete - real-time rates, caching, fallback rates, rate provider abstraction |
| laundry    | 218 | Moderate - static rates, basic conversion                                           |
| gym        | 159 | Basic - static rates, fewer currencies                                              |
| pharmacy   | 151 | Basic - nearly identical to gym                                                     |
| workshops  | 72  | Minimal - VND conversion only                                                       |

- **Divergence:** HIGH - coffeeshop version is 4.4x larger than workshops
- **Recommendation:** The coffeeshop version should be the canonical source. However, @shared/payment already provides convertCurrency() and formatPrice(). The duplication exists because these app-specific converters add: (1) real-time rate fetching, (2) localStorage caching, (3) React hook integration. Future consolidation: extract rate-fetching logic to @shared/payment, keep hooks app-specific.
- **Phases that need it:** 31 (currency selector uses this pattern)
- **Adaptation for accommodations:** Accommodations does NOT have its own copy. It uses `price-utils.ts` (65 LOC) for simpler formatting. Phase 31 currency selector can use @shared/payment directly rather than copying the converter pattern.

### Currency Preferences (DUPLICATED - 5 copies)

- **Location:** `apps/{coffeeshop,laundry,gym,pharmacy,workshops}/frontend/lib/currency-preferences.ts`
- **Package:** Not packaged
- **Status:** Needs adaptation
- **Copies and LOC:** coffeeshop=93, laundry=79, pharmacy=74, gym=70, workshops=37
- **Divergence:** MEDIUM - same structure (localStorage persistence), different default currencies and currency lists
- **Recommendation:** Consolidate into @shared/payment as a preference persistence utility. Low priority for phases 31-39 since accommodations does not have a copy.

### usePriceFormat Hook (DUPLICATED - 5 copies)

- **Location:** `apps/{coffeeshop,laundry,gym,pharmacy,workshops}/frontend/hooks/usePriceFormat.ts`
- **Package:** Not packaged
- **Status:** Needs adaptation
- **Copies and LOC:** coffeeshop=65, laundry=45, gym=39, pharmacy=39, workshops=27
- **Divergence:** MEDIUM - coffeeshop version has detailed JSDoc comments stripped from copies, but core logic is similar
- **Recommendation:** Could be added to @shared/payment as a React hook. Low priority for accommodations phases.

---

## 5. Content & i18n

### Core Translation Engine (shared/core/translation-engine)

- **Location:** `shared/core/translation-engine/`
- **Package:** Not packaged (part of shared/core which has no package.json)
- **Status:** Ready (well-built, provider-agnostic)
- **LOC:** 460
- **Key exports:** TranslationEngine, createTranslationEngine, MultiLangText, LanguageCode, TranslationProvider
- **Used by:** No app imports directly (0 references)
- **Import example:** Relative only: `import { TranslationEngine } from '../../shared/core/translation-engine'`
- **Phases that need it:** 36 (concierge content needs multi-language support)
- **Note:** AI-powered translation with provider abstraction. Well-designed but unused. Phase 36 Concierge content (safety tips, cultural tips) would benefit from this but could also use static JSON translations instead.

### I18n System (backoffice)

- **Location:** `apps/backoffice/lib/i18n/`
- **Package:** Not packaged (backoffice-specific)
- **Status:** Needs adaptation
- **LOC:** 76
- **Key exports:** i18n config (config.ts), request locale handling (request.ts)
- **Used by:** backoffice only
- **Phases that need it:** 36 (concierge multi-language content)
- **Adaptation needed:** The backoffice i18n is minimal (config + request handler). Phase 36 would need a client-side i18n approach for the guest PWA. The pattern can be referenced but not directly reused. Recommendation: use next-intl or similar for client-side, referencing the backoffice locale detection pattern.

### SEO Utilities (DUPLICATED - 6 copies + canonical)

- **Location:** `shared/seo/` (canonical, 1,648 LOC) + copies in 6 apps
- **Package:** Not packaged (shared/seo has no package.json)
- **Status:** Ready (canonical source exists)
- **LOC:** 1,648 (shared canonical)
- **Key exports:** generateLocalBusinessSchema(), generateMetaTags(), generateSitemap(), generateRobotsTxt(), generatePerformanceHints() + 25 more functions
- **Copies in:** rentals, wellness, laundry, pharmacy, workshops, gym (6 apps, ~1,500 LOC each)
- **Divergence:** LOW - app copies are mostly identical to shared/seo, with minor vertical-specific sitemap generators
- **Used by:** 6 vertical PWAs via local copies (not via shared import)
- **Recommendation:** Package shared/seo as `@gudbro/seo` workspace package. Then apps can import the canonical version and extend with vertical-specific generators.
- **Phases that need it:** None directly for accommodations. Accommodations has its own `structured-data.ts` (64 LOC) for Schema.org hotel markup.

---

## 6. Backoffice Extractable Modules

### QR Generator

- **Location:** `apps/backoffice/lib/qr/`
- **Package:** Not packaged
- **Status:** Needs extraction
- **LOC:** 1,161 (qr-generator.ts: 520, qr-service.ts: 381, qr-types.ts: 249, index.ts: 11)
- **Key exports:** generateQRCode(), QRService (CRUD operations), QRCodeType, QRCodeConfig, QRCodeData
- **Used by:** backoffice only
- **Phases that need it:** 31 (WiFi QR code in guest PWA)
- **Adaptation needed:**
  - `qr-generator.ts` is the core utility (QR image generation) - can be extracted as-is
  - `qr-service.ts` is backoffice-specific (CRUD for QR codes in DB, uses `@/lib/supabase-admin`) - stays in backoffice
  - `qr-types.ts` - types can be shared
  - **Extraction plan for Phase 31:** Move `qr-generator.ts` and `qr-types.ts` to a shared location (e.g., `shared/utils/qr/` or inline in accommodations). Leave `qr-service.ts` in backoffice. Parameterize the Supabase client dependency.

### AI Feedback Intelligence Service

- **Location:** `apps/backoffice/lib/ai/feedback-intelligence-service.ts`
- **Package:** Not packaged
- **Status:** Needs adaptation (taxonomy fork for accommodations)
- **LOC:** 380
- **Key exports:** FeedbackIntelligenceService (analyzes feedback via OpenAI, extracts tags/sentiment/categories)
- **Used by:** backoffice only
- **Phases that need it:** 35 (guest feedback AI pipeline)
- **Adaptation needed:**
  - Current taxonomy is F&B-specific (food quality, service speed, portion size, etc.)
  - Phase 35 needs ACCOM_FEEDBACK_TAGS taxonomy (cleanliness, location, value, communication, WiFi, facilities)
  - Recommended approach: Fork the service, replace the prompt/taxonomy, keep the OpenAI integration pattern
  - The service structure (analyze -> extract tags -> sentiment -> categories) is reusable; only the domain-specific prompts change

### Conventions Service

- **Location:** `apps/backoffice/lib/ai/conventions-service.ts`
- **Package:** Not packaged
- **Status:** Needs adaptation (benefit_scope for accommodations)
- **LOC:** 1,136
- **Key exports:** ConventionsService (convention management, partner matching, benefit calculation)
- **Used by:** backoffice only
- **Phases that need it:** 37 (convention voucher system)
- **Adaptation needed:**
  - Current service assumes per-order benefit scope (F&B: percentage discount on menu orders)
  - Phase 37 needs: per_night, per_stay, flat benefit scopes for accommodations
  - Schema change required: add `benefit_scope` column to conventions table
  - Service logic change: discount calculation must factor stay duration (nights \* per_night_discount)
  - Stacking rules and usage limits logic can be reused as-is

### Notification Dispatcher

- **Location:** `apps/backoffice/lib/notifications/`
- **Package:** Not packaged
- **Status:** Needs extraction (HIGH reuse potential)
- **LOC:** 947 (notification-dispatcher.ts: 620, async-notifier.ts: 327)
- **Providers:** email, push, whatsapp, telegram, line, zalo, kakao (7 providers, `providers/` directory)
- **Key exports:** NotificationDispatcher (multi-channel dispatch), NotificationChannel, NotificationType, NotificationTemplate
- **Used by:** backoffice only
- **Phases that need it:** 34 (minibar alerts), 35 (feedback push), 38 (visa alerts)
- **Adaptation needed:**
  - Currently imports from `@/lib/supabase-admin` (backoffice-specific path alias)
  - NotificationType enum is reservation-focused (reservation_confirmed, reminder_24h, etc.) - needs accommodations types (document_uploaded, visa_expiring, order_placed, feedback_received)
  - **Extraction plan:** Phase 34 or 35 should parameterize the Supabase client and extend NotificationType. The dispatcher pattern (channel selection, template rendering, provider routing) is fully reusable.

### Feedback Notification Utils

- **Location:** `apps/backoffice/lib/feedback/notification-utils.ts`
- **Package:** Not packaged
- **Status:** Ready (small utility)
- **LOC:** 135
- **Key exports:** Feedback notification formatting utilities
- **Used by:** backoffice only
- **Phases that need it:** 35 (guest feedback notifications)
- **Note:** Small utility for formatting feedback notifications. Can be referenced as a pattern for accommodations feedback notifications.

### Rate Limiter

- **Location:** `apps/backoffice/lib/security/rate-limiter.ts`
- **Package:** Not packaged
- **Status:** Needs extraction
- **LOC:** 284
- **Key exports:** apiRateLimiter, authRateLimiter, aiRateLimiter (pre-configured Ratelimit instances using Upstash)
- **Used by:** backoffice only
- **Dependencies:** `@upstash/ratelimit`, `apps/backoffice/lib/cache/redis.ts`
- **Phases that need it:** 31 (API rate limiting for public room endpoints)
- **Adaptation needed:**
  - Depends on Redis client from `apps/backoffice/lib/cache/redis.ts` - this Redis connection needs to be shared or parameterized
  - The rate limiter configurations (100 req/min API, 10 req/min auth, 30 req/min AI) are reasonable defaults
  - Phase 31 can either extract this to shared or create a simpler rate limiter for the accommodations API routes

### Credentials Encryption

- **Location:** `apps/backoffice/lib/security/credentials-encryption.ts`
- **Package:** Not packaged
- **Status:** Ready (reusable utility)
- **LOC:** 93
- **Key exports:** Encryption utilities for storing sensitive credentials
- **Used by:** backoffice only
- **Phases that need it:** None directly for 31-39. Could be useful if storing API keys for notification providers.

### Auth System

- **Location:** `apps/backoffice/lib/auth/`
- **Package:** Not packaged
- **Status:** Not reusable (backoffice-specific)
- **LOC:** 672
- **Key exports:** TOTP service, permissions system, dev accounts, auth types
- **Used by:** backoffice only
- **Phases that need it:** None. Accommodations has its own auth (room-code based JWT, progressive authentication from Phases 25-26).
- **Note:** Backoffice auth (TOTP, role-based permissions) is architecturally different from guest auth (room codes, PINs). Not a consolidation candidate.

### Tenancy Context

- **Location:** `apps/backoffice/lib/tenancy/tenant-context.ts`
- **Package:** Not packaged
- **Status:** Not reusable (backoffice-specific)
- **LOC:** 247
- **Key exports:** TenantContext (multi-tenant resolution for backoffice)
- **Used by:** backoffice only
- **Phases that need it:** None. Accommodations resolves tenant via room code, not tenant context.

### Realtime Chat Channel

- **Location:** `apps/backoffice/lib/realtime/chat-channel.ts`
- **Package:** Not packaged
- **Status:** Needs adaptation
- **LOC:** 270
- **Key exports:** Supabase Realtime channel management for chat
- **Used by:** backoffice only
- **Phases that need it:** 34 (Supabase Realtime for minibar notifications)
- **Adaptation needed:** The Realtime channel pattern (subscribe, unsubscribe, message handling) is reusable. The chat-specific logic would need to be replaced with order/notification events. The pattern is more useful as a reference than a direct extraction.

---

## 7. Accommodations-Specific Modules

These modules live in `apps/accommodations/frontend/lib/` and are used within the accommodations PWA. They may need enhancement in upcoming phases.

### Image Utils

- **Location:** `apps/accommodations/frontend/lib/image-utils.ts`
- **Package:** Not packaged (app-specific)
- **Status:** Ready
- **LOC:** 143
- **Key exports:** Image compression, HEIC conversion, blur detection utilities (built in Phase 28)
- **Used by:** accommodations only
- **Phases that need it:** 31 (service/item image upload), 35 (feedback photo upload)
- **Note:** Built during Phase 28 (Document Upload). Handles HEIC-to-JPEG conversion, compression via browser-image-compression, and blur detection. Phase 31 extends this in-place for service images. No extraction needed.

### WiFi Utils

- **Location:** `apps/accommodations/frontend/lib/wifi-utils.ts`
- **Package:** Not packaged (app-specific)
- **Status:** Ready
- **LOC:** 95
- **Key exports:** buildWifiInfo() helper, WifiZoneInfo types (built in Phase 29)
- **Used by:** accommodations only
- **Phases that need it:** 31 (WiFi QR code generation uses WiFi data from this helper)
- **Note:** Provides the unified WifiInfo shape consumed by all guest routes. Phase 31 will use this to generate WiFi QR codes from the zone data.

### Stay API

- **Location:** `apps/accommodations/frontend/lib/stay-api.ts`
- **Package:** Not packaged (app-specific)
- **Status:** Ready
- **LOC:** 265
- **Key exports:** Guest stay API client functions (fetchStayData, fetchServices, placeOrder, etc.)
- **Used by:** accommodations only
- **Phases that need it:** 33 (dashboard restructure uses these APIs), 34 (service ordering enhancements)

### Email Templates

- **Location:** `apps/accommodations/frontend/lib/email-templates.ts`
- **Package:** Not packaged (app-specific)
- **Status:** Ready
- **LOC:** 378
- **Key exports:** Pre-arrival email, booking confirmation, visa reminder templates
- **Used by:** accommodations only
- **Phases that need it:** 35 (feedback request email), 38 (lifecycle emails)

### Auth (Accommodations)

- **Location:** `apps/accommodations/frontend/lib/auth.ts`
- **Package:** Not packaged (app-specific)
- **Status:** Ready
- **LOC:** 83
- **Key exports:** Room-code JWT auth, session management (built in Phases 25-26)
- **Used by:** accommodations only
- **Note:** Completely separate from backoffice auth. Based on room codes and progressive verification. Not a consolidation candidate with backoffice auth.

### Types (Accommodations)

- **Location:** `apps/accommodations/frontend/lib/types.ts`
- **Package:** Not packaged (app-specific)
- **Status:** Ready
- **LOC:** 304
- **Key exports:** Booking, Property, Room, Service, Order, Guest document, WiFi zone types
- **Used by:** accommodations only
- **Phases that need it:** All accommodations phases (31-39) reference these types

---

## 8. Duplicated Patterns

These patterns exist in 2+ apps and represent consolidation opportunities. For phases 31-39, the recommendation is: do NOT consolidate now (it would be a distraction), but use @shared/payment where possible for new work.

### Currency Converter (5 copies)

| App        | LOC | Features                                                 |
| ---------- | --- | -------------------------------------------------------- |
| coffeeshop | 314 | Real-time rates, caching, fallback, provider abstraction |
| laundry    | 218 | Static rates, basic conversion                           |
| gym        | 159 | Static rates, fewer currencies                           |
| pharmacy   | 151 | Near-identical to gym                                    |
| workshops  | 72  | VND conversion only                                      |

- **Divergence:** HIGH (4.4x LOC range)
- **Recommendation:** @shared/payment already provides convertCurrency() and formatPrice(). For accommodations Phase 31, use @shared/payment directly. Consolidating the 5 app copies is OUT OF SCOPE for v1.5.

### Currency Preferences (5 copies)

| App        | LOC |
| ---------- | --- |
| coffeeshop | 93  |
| laundry    | 79  |
| pharmacy   | 74  |
| gym        | 70  |
| workshops  | 37  |

- **Divergence:** MEDIUM (same localStorage pattern, different defaults)
- **Recommendation:** Low priority. Accommodations can implement its own preference persistence using the coffeeshop version as reference if needed.

### usePriceFormat Hook (5 copies)

| App        | LOC |
| ---------- | --- |
| coffeeshop | 65  |
| laundry    | 45  |
| gym        | 39  |
| pharmacy   | 39  |
| workshops  | 27  |

- **Divergence:** MEDIUM (coffeeshop has richer JSDoc, core logic similar)
- **Recommendation:** Low priority. Accommodations Phase 31 can use @shared/payment formatPrice() directly in components without a hook wrapper.

### SEO Utilities (6 copies + canonical)

- **Canonical:** `shared/seo/` (1,648 LOC, JavaScript)
- **Copies in:** rentals, wellness, laundry, pharmacy, workshops, gym
- **Divergence:** LOW (copies are mostly identical, minor vertical-specific sitemap generators)
- **Recommendation:** Package as `@gudbro/seo` in a future cleanup phase. Not needed for accommodations phases 31-39 (accommodations has its own structured-data.ts for hotel Schema.org markup).

### Vertical Config Pattern (6 copies)

- **Location:** `apps/{coffeeshop,gym,laundry,pharmacy,wellness,workshops}/frontend/config/*.config.ts`
- **Divergence:** MEDIUM (same structure with VerticalConfig type, different data per vertical)
- **Recommendation:** This is correctly diverged - each vertical needs its own config. Not a consolidation candidate. The VerticalConfig type could be shared, but the config files themselves are intentionally per-app.

### Supabase Client Setup (4 unique patterns)

- **Copies:** backoffice (5 files, 637 LOC), accommodations (1 file, 77 LOC), coffeeshop (1 file, 67 LOC), waiter (1 file, 32 LOC)
- **Divergence:** HIGH (backoffice has SSR + admin + read-replica; PWAs have simple client)
- **Recommendation:** Intentionally diverged. Do NOT consolidate. Each app has different SSR/auth requirements.

---

## Appendix: Module Status Summary

| Status           | Count | Description                                             |
| ---------------- | ----- | ------------------------------------------------------- |
| Ready            | 16    | Can be used immediately with documented import path     |
| Needs Adaptation | 9     | Exists but requires specific changes documented above   |
| Needs Extraction | 3     | Lives in backoffice, needs to be moved to shared        |
| Not Reusable     | 3     | Backoffice-specific, architecturally incompatible       |
| To-Build         | 0     | All needed capabilities exist somewhere in the codebase |

### Ready Modules (import and use)

1. @gudbro/ui (UI components)
2. @gudbro/components (F&B product cards - not needed for accommodations)
3. @gudbro/menu-template (F&B layout - not needed for accommodations)
4. @gudbro/config (env validation, constants)
5. @gudbro/types (Supabase types, custom types)
6. @gudbro/utils (error handling, logging, Result type)
7. @gudbro/database (migrations infrastructure)
8. @shared/payment (payment types, formatting, conversion)
9. Accommodations Image Utils
10. Accommodations WiFi Utils
11. Accommodations Stay API
12. Accommodations Email Templates
13. Accommodations Auth
14. Accommodations Types
15. Credentials Encryption (backoffice)
16. Feedback Notification Utils (backoffice)

### Needs Adaptation

1. Core Module Components (WiFiCard overlap, ContactsCard needs fields)
2. Core Module Types (need packaging, may be stale)
3. Translation Engine (unused, needs integration path)
4. I18n System (backoffice-specific, needs client-side approach)
5. AI Feedback Pipeline (needs ACCOM taxonomy fork)
6. Conventions Service (needs benefit_scope adaptation)
7. Notification Dispatcher (needs type extension, client parameterization)
8. Realtime Chat Channel (pattern reusable, logic not)
9. Currency Converter (coffeeshop canonical, but @shared/payment preferred)

### Needs Extraction

1. QR Generator (qr-generator.ts + qr-types.ts to shared)
2. Notification Dispatcher (to shared, parameterize Supabase client)
3. Rate Limiter (to shared, parameterize Redis client)
