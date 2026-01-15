# 🔄 IN PROGRESS

> Task attualmente in lavorazione.
> **Max 3 task** alla volta per focus.
> Quando completata → spostala in `3-TESTING.md` o `4-DONE.md`

**Last Updated:** 2026-01-15

---

| ID                  | Feature              | Descrizione                                          | Priority | Started    | Assignee |
| ------------------- | -------------------- | ---------------------------------------------------- | -------- | ---------- | -------- |
| RESERVATIONS-SYSTEM | Sistema Prenotazioni | Tavoli, prenotazioni, wallet, notifiche multi-canale | P1       | 2026-01-15 | Claude   |

---

## Note Lavori in Corso

### RESERVATIONS-SYSTEM

**Piano:** 15 sprint, ~45-50h effort

**Componenti:**

- Gestione tavoli e floor plan
- Widget prenotazione cliente (/reserve)
- Customer Wallet con bonus top-up
- Notifiche multi-canale (Email, Push, WhatsApp, Telegram, LINE, Zalo)
- Stripe + Cash payments

**Sprint corrente:** Sprint 13 - Backoffice UI

**Migrations completate:**

- ✅ 053-reservation-tables.sql (Sprint 1) - location_sections, location_tables
- ✅ 054-reservations-core.sql (Sprint 2) - reservations, settings, history, blocked_slots
- ✅ 055-reservation-notifications.sql (Sprint 7) - notification_channel_preferences, notification_templates, reservation_notifications, notification_queue
- ✅ 056-customer-wallet.sql (Sprint 9) - customer_wallets, wallet_transactions, wallet_bonus_tiers, wallet_settings, wallet_top_up_sessions

**Services completati:**

- ✅ table-management-service.ts - CRUD sections/tables, floor plan, capacity
- ✅ reservations-service.ts - CRUD reservations, availability, stats
- ✅ notification-dispatcher.ts - Multi-channel notification orchestration
- ✅ email-provider.ts - Resend/SendGrid email sending
- ✅ push-provider.ts - Push notifications via Supabase Realtime + FCM
- ✅ telegram-provider.ts - Telegram Bot API notifications
- ✅ wallet-service.ts - Customer wallet with bonus tiers, top-up, payments

**API Routes completate (Sprint 3-4):**

- ✅ /api/reservations - Backoffice CRUD prenotazioni (GET/POST/PATCH)
- ✅ /api/tables - Backoffice gestione tavoli (GET/POST/PATCH/DELETE)
- ✅ /api/sections - Backoffice gestione sezioni (GET/POST/PATCH/DELETE)
- ✅ /api/reserve - Customer booking API (availability, create, cancel)
- ✅ /api/notifications/process - Notification queue processor (Sprint 8)
- ✅ /api/wallet - Wallet balance, transactions, tiers, top-up (Sprint 9-10)
- ✅ /api/wallet/stripe - Stripe checkout session + webhook handler (Sprint 10)

**Customer UI completata (Sprint 5-6):**

- ✅ ReservationWidget - Multi-step booking flow (party size, date/time, details, confirm, success)
- ✅ /reserve page - Customer-facing reservation page
- ✅ i18n translations - EN, VI, IT complete
- ✅ lucide-react icons - Added to coffeeshop frontend

**Notifications completate (Sprint 7-8):**

- ✅ Database schema - Templates, preferences, queue, notifications log
- ✅ Email provider - Resend (primary) + SendGrid (fallback)
- ✅ Push provider - Supabase Realtime + FCM
- ✅ Telegram provider - Bot API with formatted messages
- ✅ Edge Functions - schedule-reminders, process-notifications
- ✅ Default templates - EN, VI, IT for email, push, sms, whatsapp

**Customer Wallet completato (Sprint 9-10):**

- ✅ Database schema - Wallets, transactions, bonus tiers, settings, sessions
- ✅ wallet-service.ts - Complete service with bonus calculation, top-up, payments
- ✅ /api/wallet - REST API for wallet operations
- ✅ /api/wallet/stripe - Stripe Checkout integration with webhooks
- ✅ WalletDashboard component - Balance, tiers, transactions, cash top-up
- ✅ Customer detail page integration - Wallet section in /customers/[accountId]

**Asia Channels completati (Sprint 11-12):**

- ✅ zalo-provider.ts - Zalo OA API integration (Vietnam)
- ✅ line-provider.ts - LINE Messaging API (Japan, Thailand, Taiwan)
- ✅ kakao-provider.ts - KakaoTalk Channel API (Korea)
- ✅ whatsapp-provider.ts - WhatsApp Business Cloud API (Global)
- ✅ Notification processor updated for all channels
- ✅ MessagingChannelsSection.tsx - Backoffice UI for channel configuration
- ✅ merchant_notification_channels migration - Store channel credentials
- ✅ API routes for messaging channel management
- ⏸️ WeChat in standby (richiede business verification cinese)

**Prossimi sprint:**

- Sprint 13-14: Backoffice UI (ReservationCalendar, FloorPlanEditor)
- TODO: Webhook handlers for customer linking (Telegram, LINE, Zalo, Kakao)
- TODO: Integrate messaging channels setup into onboarding flow
