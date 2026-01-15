# Session Log - GUDBRO Verticals

> Diario di bordo delle sessioni di sviluppo.
> Nuove entry in cima (ordine cronologico inverso).

---

## 2026-01-15 (Session 4) - WHITE-LABEL-FULL Feature

**Focus:** White-Label Multi-Tier Implementation (Merchant, Catena, Agency)
**Durata:** ~3h
**Tipo:** Major Feature

### Completato

**WHITE-LABEL-FULL (8 Sprint):**

- Sprint 1: Database Migration `052-custom-domains.sql`
  - brands/locations: custom_domain, domain_verified fields
  - partners: logo_url, primary_color, backoffice_domain
  - domain_verifications table (status, SSL, Vercel integration)
  - domain_blacklist table (reserved domains)
  - subscription_plan_limits table (domain quotas per tier)
  - Helper functions: resolve_custom_domain(), is_domain_blacklisted(), can_add_custom_domain()

- Sprint 2: Domain Resolution Service
  - `domain-resolution-service.ts` (~600 lines)
  - `vercel-api.ts` (Vercel domain management)
  - DNS verification (CNAME, TXT via Cloudflare DoH)

- Sprint 3: Middleware Domain Resolution
  - Coffeeshop: Custom domain → brand/location resolution
  - Backoffice: Partner domain → white-label branding
  - Headers: x-tenant-type, x-brand-id, x-location-id, etc.

- Sprint 4: Frontend Branding Integration
  - Extended MerchantLocaleConfig with branding
  - useBrandTheme hook (CSS variables injection)
  - useMerchantBranding hook

- Sprint 5: Domain Management UI
  - `/settings/domain/page.tsx`
  - API routes: POST/DELETE domain, POST verify
  - DNS instructions with copy-to-clipboard
  - Plan upgrade notice

- Sprint 6: Multi-Location Landing Page
  - LocationPicker component (geolocation, nearest)
  - useTenantContext hook
  - `/api/tenant-context` endpoint

- Sprint 7: Partner Portal Foundation
  - `partner-service.ts` (organizations, metrics, billing)
  - `/partner` dashboard page
  - `/partner/organizations` list page

- Sprint 8: Partner White-Label Backoffice
  - PartnerBrandingContext
  - `/api/partner-branding` endpoint
  - BrandingLogo component (conditional)

### File Creati

| File                                      | Descrizione                      |
| ----------------------------------------- | -------------------------------- |
| `052-custom-domains.sql`                  | Migration completa (~400 righe)  |
| `lib/domain-resolution-service.ts`        | Domain resolution + registration |
| `lib/vercel-api.ts`                       | Vercel API wrapper               |
| `lib/partner-service.ts`                  | Partner portal operations        |
| `lib/contexts/PartnerBrandingContext.tsx` | White-label context              |
| `lib/hooks/useBrandTheme.ts`              | CSS variables injection          |
| `lib/hooks/useTenantContext.ts`           | Tenant from middleware           |
| `components/LocationPicker.tsx`           | Multi-location landing           |
| `components/layout/BrandingLogo.tsx`      | Conditional logo                 |
| `settings/domain/page.tsx`                | Domain management UI             |
| `partner/page.tsx`                        | Partner dashboard                |
| `partner/organizations/page.tsx`          | Org list                         |
| `api/settings/domain/*`                   | Domain API routes                |
| `api/partner-branding/route.ts`           | Partner branding API             |
| `api/tenant-context/route.ts`             | Tenant context API               |
| Middleware updates                        | coffeeshop + backoffice          |
| merchant-config.ts                        | Extended with branding           |
| MerchantConfigContext.tsx                 | + branding hook                  |

### Pricing Structure Implementata

| Plan       | Domains   | Monthly |
| ---------- | --------- | ------- |
| Free       | 0         | $0      |
| Starter    | 0         | $29     |
| Pro        | 1         | $79     |
| Business   | 3         | $149    |
| Enterprise | unlimited | custom  |

### Architettura

```
Custom Domain Request
        ↓
    Middleware
        ↓
resolve_custom_domain() RPC
        ↓
Headers: x-tenant-type, x-brand-id...
        ↓
   Frontend (MerchantConfig / PartnerBranding)
        ↓
  CSS Variables + Conditional Logo
```

### Note Tecniche

- Edge Runtime: Middleware usa fetch() diretto a Supabase REST API
- DNS over HTTPS: Cloudflare per CNAME/TXT verification
- Vercel API: v9/v10 per domain management
- Cache: TODO Redis/Upstash per domain resolution

### Prossima Sessione

- Test end-to-end con dominio reale
- Applicare migration a Supabase prod
- Aggiornare 1-TODO.md per marcare WHITE-LABEL come DONE

---

## 2026-01-15 (Session 3) - HOLIDAYS-DB Feature

**Focus:** Centralized Holidays Database for AI Intelligence
**Durata:** ~45min
**Tipo:** New Feature

### Completato

**Holidays Database (HOLIDAYS-DB):**

- Database Migration `051-holidays-database.sql`:
  - `holidays` table (country/region/city, type, impact_level)
  - `merchant_holiday_overrides` (custom impact per merchant)
  - `merchant_custom_holidays` (anniversaries, local events)
  - 11 Vietnamese holidays seeded (Tet, Reunification Day, etc.)
  - RLS policies via account_roles pattern
- Service Layer `holidays-service.ts`:
  - `getUpcomingHolidays()` - by country/region with days ahead
  - `getHolidaysForDate()` - specific date lookup
  - `getMerchantCustomHolidays()` - merchant-specific holidays
  - `createCustomHoliday()` / `deleteCustomHoliday()`
  - `getDateImpact()` - combined impact analysis
  - `getUpcomingHolidaysContext()` - AI context with alerts
  - `searchHolidays()` / `getHolidaysForYear()`
- API Route `/api/ai/holidays`:
  - GET actions: upcoming, date, custom, impact, context, ai-context, search, year
  - POST: create-custom
  - DELETE: by holidayId
- Knowledge Service Integration:
  - `MerchantKnowledge` type extended with `holidays`
  - `fetchMerchantKnowledge()` includes holidays context
  - `formatKnowledgeForAI()` includes holidays section

### File Creati/Modificati

| File                                   | Azione   | Descrizione                         |
| -------------------------------------- | -------- | ----------------------------------- |
| `migrations/051-holidays-database.sql` | Created  | 3 tables + indexes + RLS + seeds    |
| `lib/ai/holidays-service.ts`           | Created  | ~500 righe, full service layer      |
| `app/api/ai/holidays/route.ts`         | Created  | GET/POST/DELETE endpoints           |
| `lib/ai/knowledge-service.ts`          | Modified | +holidays integration               |
| `lib/ai/index.ts`                      | Modified | +holidays-service export            |
| `__tests__/knowledge-service.test.ts`  | Modified | +holidays property in test fixtures |

### Note Tecniche

- Supabase query can't do computed columns like `(date - CURRENT_DATE) as days_until`
- daysUntil calculated in TypeScript after query
- RLS uses `account_roles.tenant_id` pattern (not merchant_id)
- Impact levels: critical, high, medium, low, none
- Holiday types: national, religious, local, regional, sporting, cultural, observance, school, bank

### Prossimi Passi

- UI per gestire custom holidays (merchant_custom_holidays)
- API per bulk import holidays da external sources (Calendarific, etc.)
- Calendar view in backoffice

---

## 2026-01-15 (Session 2) - MT-KDS Kitchen Display Enhancement

**Focus:** Kitchen Display System enhancements (from MenuTiger Audit)
**Durata:** ~30min
**Tipo:** Feature Enhancement

### Completato

**Kitchen Display System (MT-KDS):**

- Audio alerts per nuovi ordini (Web Audio API)
  - Chime sound con due toni (A5 + C#6)
  - Triggered automaticamente su realtime subscription
- Keyboard shortcuts "bump bar" style:
  - `1-9` per Queue → Preparing
  - `Q,W,E,R,T` per Preparing → Ready
  - `A,S,D,F,G` per Ready → Picked Up
  - `M` toggle suono on/off
  - `L` toggle layout grid/columns
  - `F` fullscreen
- Flash animation per nuovi ordini (ring-4 ring-yellow-400 animate-pulse)
- Sound toggle button in header (🔊/🔇)
- 2 layout modes:
  - Grid: layout originale responsive
  - Columns: 3 colonne fisse (Queue | Preparing | Ready)
- Keyboard shortcut hints su ogni order card (kbd tags)
- Settings panel espandibile con legenda shortcuts

### File Modificati

| File                                      | Modifiche                             |
| ----------------------------------------- | ------------------------------------- |
| `app/(dashboard)/orders/kitchen/page.tsx` | +200 righe, audio, shortcuts, layouts |

### Note Tecniche

- Web Audio API per suoni (no file mp3 necessari)
- AudioContext inizializzato al primo click/keydown (policy browser)
- Keyboard shortcut effect senza dependency array (re-runs ogni render per latest state)
- Column layout mostra keyboard hints integrati nelle card
- Flash animation usa Tailwind animate-pulse + ring

### Prossimi Passi

- Test con ordini reali
- Eventualmente: multi-station support (cucina/bar separati)
- Eventualmente: print ticket integration

---

## 2026-01-15 - B2B-CONVENTIONS + ORDER-READY-NOTIFICATIONS

**Focus:** B2B Corporate Conventions System + Web Push Notifications
**Durata:** ~3h
**Tipo:** Feature Implementation

### Completato

**B2B-CONVENTIONS (tutti 6 sprint):**

- Sprint 1: Database Migration (5 tabelle + RLS + triggers)
- Sprint 2: Service Layer (conventions-service.ts ~700 righe)
- Sprint 3: API Routes (/api/ai/conventions - GET/POST/PATCH)
- Sprint 4: UI Hub + Offices pages
- Sprint 5: UI Conventions + Vouchers pages
- Sprint 6: Staff Verification tool

**KB-BACKOFFICE Update:**

- Aggiunte 5 pagine Conventions alla Knowledge Base
- Totale pagine KB: 57 (52 + 5 nuove)

**ORDER-READY-NOTIFICATIONS Phase 2 (Web Push):**

- Service Worker push event handler
- Push subscription hook (usePushNotifications)
- API endpoint per salvare subscriptions
- Backend push sender con web-push library
- Kitchen display trigger automatico
- UI toggle per Push ON/OFF nella pagina ordini
- VAPID keys setup

### File Creati

| File                                          | Descrizione                    |
| --------------------------------------------- | ------------------------------ |
| `migrations/050-b2b-conventions.sql`          | 5 tabelle, triggers, RLS       |
| `lib/ai/conventions-service.ts`               | Service layer completo         |
| `app/api/ai/conventions/route.ts`             | API endpoints                  |
| `/partnerships/conventions/page.tsx`          | Hub dashboard                  |
| `/partnerships/conventions/offices/page.tsx`  | Office partners + AI Discovery |
| `/partnerships/conventions/active/page.tsx`   | Active conventions             |
| `/partnerships/conventions/vouchers/page.tsx` | Voucher management             |
| `/partnerships/conventions/verify/page.tsx`   | Staff verification tool        |
| `lib/kb/kb-content.ts`                        | +5 pagine conventions          |
| `hooks/usePushNotifications.ts`               | Push subscription hook         |
| `app/api/push-subscription/route.ts`          | Save/delete subscriptions      |
| `app/api/send-push/route.ts` (coffeeshop)     | Send push (client-side)        |
| `app/api/send-push/route.ts` (backoffice)     | Send push from kitchen         |
| `public/service-worker.js`                    | Push event handler             |

### Tabelle Database Create

- `office_partners` - Registro uffici/aziende partner
- `merchant_office_outreach` - Pipeline CRM per outreach
- `partner_conventions` - Convenzioni attive con benefici
- `convention_vouchers` - Voucher individuali con QR
- `convention_redemptions` - Tracking utilizzo voucher

### Commit

- `6d77eca` - feat(conventions): add B2B corporate conventions system
- (pending) - feat(notifications): add web push notifications Phase 2

### Decisioni

- **RLS pattern**: Usa `account_roles.tenant_id WHERE role_type = 'merchant'` (come TOURISM-B2B)
- **Daily codes**: Formato `COMPANY-MMDD` (es. TECHCORP-0115)
- **Verification methods**: link, qr_scan, daily_code, badge_id
- **VAPID**: Keys generate con web-push CLI, salvate in .env.local
- **Push trigger**: Kitchen display chiama API quando status → 'ready'

### Prossima Sessione

- Commit e push ORDER-READY-NOTIFICATIONS
- Eventuale altro task da backlog P1/P2

---

## 2026-01-14/15 - AI-First Redesign Sprint 1

**Focus:** Completamento P0.5 Strategy + AI-FIRST-REDESIGN Sprint 1
**Durata:** ~3h (sessione lunga con continuation)
**Tipo:** Implementation

### Completato

**P0.5 Strategy:**

- ORDER-READY-NOTIFICATIONS Phase 1 (audio beep, Web Audio API) → 🟡 PARTIAL
- AI-ONBOARDING completo (chat conversazionale con GPT-4o-mini) → ✅ DONE

**AI-FIRST-REDESIGN Sprint 1:**

- Verificato componenti esistenti (AIPriorityCard, AIPrioritiesHero, OpportunityBanner)
- Aggiunto Food Cost triggers a AIPrioritiesHero (alert >35%, critical >45%)
- Aggiunto OpportunityBannerWrapper a dashboard
- AIStatusHeader già presente in Header.tsx (pulsante AI con notifiche)

### File Creati/Modificati

| File                                                 | Azione                          |
| ---------------------------------------------------- | ------------------------------- |
| `apps/website/lib/ai/openai.ts`                      | Creato - OpenAI client          |
| `apps/website/lib/ai/onboarding-chat-service.ts`     | Creato - Chat service           |
| `apps/website/app/api/ai/onboarding-chat/route.ts`   | Creato - API endpoint           |
| `apps/website/components/onboarding/ChatWidget.tsx`  | Creato - Chat UI                |
| `apps/website/app/onboarding/page.tsx`               | Creato - Pagina onboarding AI   |
| `apps/backoffice/components/ai/AIPrioritiesHero.tsx` | Modificato - Food Cost triggers |
| `apps/backoffice/app/(dashboard)/dashboard/page.tsx` | Modificato - OpportunityBanner  |

### Decisioni

- **Food Cost threshold 35%**: Alert warning, >45% diventa critical
- **Fetch parallelo**: Weather + Food Cost in Promise.all per performance
- **AIStatusHeader**: Il pulsante AI esistente con notifiche è sufficiente per Sprint 1

### Prossima Sessione

- Sprint 2: AI Triggers v2 inline (template 5 domande obbligatorie)
- Oppure altro task da backlog

---

## 2026-01-10 - Sessione Strategica: Modelli di Servizio

**Focus:** Discussione strategica su modelli di servizio locali e impatto su prodotto
**Durata:** ~2h
**Tipo:** Product strategy / Discovery

### Completato

- Mappatura 5 modelli di servizio (Table Service, Counter+Delivery, Counter+Pickup, Counter+Menu Illuminato, QR Ordering)
- Definizione tier "Menu Only" per merchant che non vogliono cambiare flusso
- Concept AI Conversational Onboarding (chat-based onboarding che diventa co-manager)
- Sistema notifiche "Ordine Pronto" (sostituzione buzzer hardware)
- Percorso upgrade cliente: Menu Only → Table Ordering → Notifiche
- Aggiunto backlog items in `docs/backlog/1-TODO.md` sezione P0.5

### Decisioni

- **Modello di servizio come prima domanda onboarding**: determina feature mostrate e pain point rilevanti
- **Menu Only come entry tier**: mercato più ampio, conversione più facile, upsell futuro
- **WhatsApp/Zalo/LINE per notifiche in Asia**: tutti li hanno aperti, zero costo
- **AI onboarding = demo live del prodotto**: il prospect sperimenta prima di pagare

### Lezioni Apprese (Cosa Claude ha imparato)

| Lezione                                     | Insight                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Regional market awareness**               | Asia ha piattaforme diverse (Zalo, LINE, KakaoTalk, WeChat). Non assumere default occidentali.        |
| **Modelli di servizio ≠ one-size-fits-all** | Ogni tipo di locale ha bisogno di feature diverse. L'onboarding deve capirlo subito.                  |
| **QR ha valore indipendente dall'ordering** | Anche senza ordering digitale, QR menu offre: accessibilità, discovery, pre-decisione.                |
| **Resistenza psicologica = costi nascosti** | Cliente che deve rialzarsi per ordinare di nuovo → meno secondi ordini. Frizione invisibile ma reale. |
| **Entry tier → upgrade path**               | Menu Only non è un tier "povero", è un piede nella porta per upsell futuro.                           |
| **AI onboarding = demo + configurazione**   | L'AI che fa onboarding È il prodotto. Il prospect lo prova prima di pagare.                           |
| **Sostituire hardware con software**        | Buzzer → notifiche telefono. Meno costi, meno manutenzione per merchant.                              |
| **UX Settings: tabs > sidebar submenu**     | Meno click, tutto vicino, meno movimento mouse. Pattern da applicare ovunque.                         |

### Argomenti di Vendita Scoperti

| Target                    | Argomento                                                          |
| ------------------------- | ------------------------------------------------------------------ |
| Counter + Menu Illuminato | "I tuoi clienti scoprono di più, ordinano di più, code più veloci" |
| Chi ha buzzer hardware    | "Elimina batterie e dispositivi persi. Il telefono è il buzzer"    |
| Chi non vuole cambiare    | "Non cambi nulla. Solo un QR sul tavolo. Risultati subito"         |

### Note

- Sessione più strategica che tecnica - focus su product thinking
- L'utente ha fatto una passeggiata per "schiarirsi la mente" e ha avuto insight importanti
- Discussione emergente, non pianificata - valore alto

### Prossima sessione

- Review backoffice changes (tabbed settings, social page)
- Eventuale implementazione delle feature discusse

---

## 2026-01-09

**Focus:** Vercel deployment fixes
**Durata:** ~2h (sessione continuata)

### Completato

- Fix website build su Vercel (mancava vercel.json per pnpm monorepo)
- Fix login backoffice su Vercel (aggiunto ENABLE_DEV_AUTH env var)
- Fix DevRoleSwitcher non visibile su Vercel (ora controlla cookie invece di NODE_ENV)
- Aggiornato docs/backlog/4-DONE.md con task completate
- Aggiunte 3 lezioni a Compounding Engineering

### Commits

- `d5b7b77` - fix(DevRoleSwitcher): show when dev session cookie exists
- `f5663a4` - feat(auth): allow dev mode via ENABLE_DEV_AUTH env var
- `b699956` - fix(website): add vercel.json for pnpm monorepo support

### Decisioni

- DevRoleSwitcher usa cookie `gudbro_dev_session` per rilevare dev mode (non NODE_ENV)
- ENABLE_DEV_AUTH=true settato su Vercel backoffice per staging/demo
- Creato SESSION-LOG.md come alternativa a Pieces MCP (non funzionante)

### Note tecniche

- Pattern per client components che devono sapere se dev mode: controllare cookie, non env vars
- Vercel monorepo: ogni app deve avere vercel.json con installCommand e buildCommand

### Prossima sessione

- Verificare che DevRoleSwitcher appaia su Vercel dopo deploy
- Continuare con task da backlog

---

## 2026-01-09 (mattina)

**Focus:** QR Builder v2 + UI improvements
**Durata:** ~4h

### Completato

- QR Builder v2 completo (313 test, 4-step wizard, export PNG/SVG/PDF)
- Sidebar collapsible con pin/unpin e hover expand
- Account page con profilo, ruoli, loyalty points
- DevRoleSwitcher per testing ruoli in development

### Commits

- `a79f2d5` - feat: QR Builder v2 + Sidebar improvements + Account page

### Decisioni

- QR usa merchant subdomain (qr.pizzeria.gudbro.com)
- Export con preset per materiali stampa (paper, tshirt, sticker, etc.)
- Sidebar state persistito in localStorage

### Files principali

- `apps/backoffice/components/qr/*` - QR Builder components
- `apps/backoffice/lib/qr/*` - QR service layer
- `apps/backoffice/components/layout/Sidebar.tsx` - New sidebar
- `apps/backoffice/app/(dashboard)/account/page.tsx` - Account page

---

## Template Entry

```markdown
## YYYY-MM-DD

**Focus:** [Cosa si e' lavorato]
**Durata:** ~Xh

### Completato

- [Task 1]
- [Task 2]

### Commits

- `hash` - message

### Decisioni

- [Decisione]: [Motivazione]

### Note tecniche

- [Pattern, soluzione, lesson learned]

### Prossima sessione

- [Cosa fare dopo]
```
