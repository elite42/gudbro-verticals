# GUDBRO Backlog

> **CRITICAL:** Claude DEVE consultare questo file all'inizio di OGNI sessione.
> Questo file contiene TUTTO ciò che dobbiamo fare (prodotti + funzionalità).

**Last Updated:** 2026-01-02 (P5 Unified Account = NEXT FOCUS, Dalky Kafe in standby, Testing task aggiunto)

---

## Come Funziona Questo File

### Logica del Backlog
- **Backlog** = Lista completa di tutto ciò che dobbiamo fare
- Diviso in **Prodotti** (database food) e **Funzionalità** (features)
- Quando qualcosa viene completato → spostare in "Completati" con data

### Per Claude - Ogni Sessione:
1. **Inizio**: Leggi questo file + `CLAUDE.md`
2. **Durante**: Aggiorna status quando completi task
3. **Fine**: Sposta completati, aggiungi nuovi task scoperti

### Quando l'utente chiede "mostra la todolist/backlog":
- Mostra le sezioni "Da Fare" (Prodotti + Funzionalità)
- NON mostrare i completati (a meno che non li chieda)

---

## Credenziali Supabase

**File:** `config/supabase.env`
```
SUPABASE_URL=https://vnaonebbuezrzvjekqxs.supabase.co
```

---

# DA FARE

## Prodotti (Database Food)

### P1 - Alta Priorità (Cucine Europee Maggiori)

✅ **COMPLETATI** - Spanish (55) e French (58) spostati nella sezione "Prodotti Completati"

### P2 - Media Priorità (Europa)

| ID | Database | Descrizione | Stima |
|----|----------|-------------|-------|
| ~~DB-BRITISH~~ | ~~British~~ | ✅ **COMPLETATO 2025-12-23** (44 piatti) | 44 |
| ~~DB-GERMAN~~ | ~~German~~ | ✅ **COMPLETATO 2025-12-24** (50 piatti) | 50 |
| ~~DB-PORTUGUESE~~ | ~~Portuguese~~ | ✅ **COMPLETATO 2025-12-24** (39 piatti) | 39 |
| ~~DB-POLISH~~ | ~~Polish~~ | ✅ **COMPLETATO 2025-12-24** (42 piatti) | 42 |
| ~~DB-SCANDINAVIAN~~ | ~~Scandinavian~~ | ✅ **COMPLETATO 2025-12-24** (78 piatti) | 78 |
| ~~DB-RUSSIAN~~ | ~~Russian~~ | ✅ **COMPLETATO 2025-12-25** (55 piatti) | 55 |
| ~~DB-SWISS~~ | ~~Swiss~~ | ✅ **COMPLETATO 2025-12-25** (38 piatti) | 38 |
| ~~DB-BELGIAN~~ | ~~Belgian~~ | ✅ **COMPLETATO 2025-12-25** (32 piatti) | 32 |
| ~~DB-DUTCH~~ | ~~Dutch~~ | ✅ **COMPLETATO 2025-12-25** (38 piatti) | 38 |

### P2 - Media Priorità (America Latina)

| ID | Database | Descrizione | Stima |
|----|----------|-------------|-------|
| ~~DB-ARGENTINIAN~~ | ~~Argentinian~~ | ✅ **COMPLETATO 2025-12-26** (47 piatti) | 47 |
| ~~DB-COLOMBIAN~~ | ~~Colombian~~ | ✅ **COMPLETATO 2025-12-26** (45 piatti) | 45 |
| ~~DB-VENEZUELAN~~ | ~~Venezuelan~~ | ✅ **COMPLETATO 2025-12-26** (39 piatti) | 39 |
| ~~DB-CHILEAN~~ | ~~Chilean~~ | ✅ **COMPLETATO 2025-12-26** (43 piatti) | 43 |
| ~~DB-CUBAN~~ | ~~Cuban~~ | ✅ **COMPLETATO 2025-12-26** (44 piatti) | 44 |

### P2 - Media Priorità (Africa)

| ID | Database | Descrizione | Stima |
|----|----------|-------------|-------|
| ~~DB-NIGERIAN~~ | ~~Nigerian~~ | ✅ **COMPLETATO 2025-12-26** (49 piatti) | 49 |
| ~~DB-SENEGALESE~~ | ~~Senegalese~~ | ✅ **COMPLETATO 2025-12-27** (28 piatti) | 28 |
| ~~DB-SOUTHAFRICAN~~ | ~~South African~~ | ✅ **COMPLETATO 2025-12-27** (40 piatti) | 40 |

### P2 - Media Priorità (Asia & Sud-Est Asiatico)

| ID | Database | Descrizione | Stima |
|----|----------|-------------|-------|
| ~~DB-INDONESIAN~~ | ~~Indonesian~~ | ✅ **COMPLETATO 2025-12-25** (55 piatti) | 55 |
| ~~DB-MALAYSIAN~~ | ~~Malaysian~~ | ✅ **COMPLETATO 2025-12-25** (57 piatti) | 57 |
| ~~DB-FILIPINO~~ | ~~Filipino~~ | ✅ **COMPLETATO 2025-12-25** (59 piatti) | 59 |

### P3 - Cucine Fusion

| ID | Database | Descrizione | Stima |
|----|----------|-------------|-------|
| ~~DB-TEXMEX~~ | ~~Tex-Mex~~ | ✅ **COMPLETATO 2025-12-25** (46 piatti) | 46 |
| ~~DB-NIKKEI~~ | ~~Nikkei~~ | ✅ **COMPLETATO 2025-12-25** (30 piatti) | 30 |
| ~~DB-INDOCHINESE~~ | ~~Indo-Chinese~~ | ✅ **COMPLETATO 2025-12-25** (35 piatti) | 35 |
| ~~DB-KOREAN-MEX~~ | ~~Korean-Mexican~~ | ✅ **COMPLETATO 2025-12-26** (21 piatti) | 21 |

### P3 - Altre Cucine

| ID | Database | Descrizione | Stima |
|----|----------|-------------|-------|
| ~~DB-AUSTRALIAN~~ | ~~Australian~~ | ✅ **COMPLETATO 2025-12-27** (29 piatti) | 29 |
| ~~DB-HAWAIIAN~~ | ~~Hawaiian~~ | ✅ **COMPLETATO 2025-12-27** (29 piatti) | 29 |
| ~~DB-CAJUN~~ | ~~Cajun/Creole~~ | ✅ **COMPLETATO 2025-12-27** (42 piatti) | 42 |

**Tutti i database food pianificati sono stati completati!**

---

## Funzionalità (Features)

### P1 - Alta Priorità (Critiche)

| ID | Feature | Descrizione | Area |
|----|---------|-------------|------|
| ING-TRANSLATIONS | Popolare tabella translations | Traduzioni per it, vi, ko, ja | Database |

> **ORIGIN-STANDARDIZATION, DISH-TYPE-SYSTEM, RLS-FIX, SEARCH-PATH-FIX**: Spostati in "Funzionalità Completate" (2025-12-22)

> **NUTRITION-STRATEGY (2025-12-23):** Da ora, ogni NUOVO ingrediente deve avere `nutrition` popolato. Il backfill degli ingredienti legacy (~2000) avverrà DOPO il completamento dei database nel backlog. Vedi PROCEDURE-NEW-DATABASE.md v2.2 e LESSONS-LEARNED.md #45.

### P2 - Media Priorità (Importanti)

| ID | Feature | Descrizione | Area |
|----|---------|-------------|------|
| ~~NUTRITION-BACKFILL~~ | ~~Backfill dati nutrizionali~~ | **COMPLETATO 2025-12-24.** 2026/2053 ingredienti (98.7%). Workflow AI-assisted: 78 batch → Gemini/ChatGPT → JSON → SQL. | Database |
| ~~CHARCUTERIE-CATEGORY~~ | ~~Categoria Salumi/Insaccati~~ | **COMPLETATO 2025-12-27.** Ristrutturazione `proteins` (439) → 7 categorie specifiche: `red_meat` (92), `cured_meats` (89), `sausages` (86), `proteins` (98), `offal` (35), `poultry` (27), `game` (11). DATABASE-STANDARDS v2.1. | Database |
| CUISINE-FILTER | Filtro cucina nel backoffice | Campo `cuisine_tags` sui prodotti, filtro visibilità per tipo ristorante | Backoffice |
| WINE-MGMT-UI | Wine Management UI | Permettere ai ristoranti di aggiungere vini custom | Backoffice |
| ~~ANALYTICS-DEPLOY~~ | ~~Deploy Analytics System~~ | **GIÀ ESEGUITO.** Tabelle `analytics_events`, `analytics_daily_aggregates`, `improvement_suggestions` esistono. Funzioni `track_event()`, `get_daily_metrics()`, `get_top_items()` disponibili. | Database |
| ANALYTICS-DASH | Analytics Dashboard | Visualizza metriche nel backoffice (sessions, conversions, revenue) | Backoffice |
| PWA-TRACKING | PWA Event Tracking | Integrare analytics-service.ts: page_view, item_click, add_to_cart, order_placed. **NOTA:** Da fare dopo MVP PWA completa. | PWA |
| MENU-FROM-DB | Menu da Database | PWA: fetch menu da Supabase invece di JSON hardcoded, cache con SWR | PWA |

### P2.5 - Features da MenuTiger Audit (NEW 2026-01-01)

> **Fonte:** Competitor Audit MenuTiger (57 screenshot analizzati)
> **Report:** `docs/competitor-audits/MENUTIGER-AUDIT-REPORT-V2.md`

#### Da Copiare (Alta Priorità)

| ID | Feature | Descrizione | Effort | Impact |
|----|---------|-------------|--------|--------|
| MT-HOT-ACTIONS | Hot Actions System | Pulsanti cliente: Call waiter, Clean table, Verify bill, Request notes change. Monitoring dashboard con filtri e status. **Feature UNICA MenuTiger!** | Medium | High |
| MT-ONBOARDING | Onboarding Checklist | Welcome modal + 4-step checklist con progress bar (0-100%). Steps: Restaurant details → Create menu → Add food → Customize QR | Low | High |
| MT-OPENING-HOURS | Opening Hours UI | 7 giorni con toggle ON/OFF + time picker + multi-slot (per pausa pranzo). Pattern eccellente da copiare | Low | Medium |
| MT-NOTIF-SOUNDS | Notification Sounds | Sound selection per tipo (Orders, Feedback, Hot Actions) + preview play button. UX eccellente | Low | Medium |
| MT-GEOFENCING | Location Geofencing | Radius-based location con Google Maps interattiva. Auto-detect GPS + validazione ordini in-store | High | Medium |
| MT-SURVEY-BUILDER | Survey Builder | Question builder con live preview, question types multipli, required toggle, localize integrato | Medium | Medium |

#### Da Migliorare (Gap MenuTiger)

| ID | Feature | Descrizione | MenuTiger Status | GudBro Opportunity |
|----|---------|-------------|------------------|-------------------|
| MT-CRM-ADVANCED | CRM Avanzato | Customer profiles con order history, lifetime value, segments, tags | Solo lista base | Segmenti, LTV, analytics |
| MT-ANALYTICS-REAL | Analytics Reali | Dashboard con insights, trends, AI suggestions | Solo scheduler email | AI-powered insights |
| MT-THEMES-VARIETY | Temi Website (15+) | Temi con layout DIVERSI, non solo colori | 5 temi (4 uguali) | 15+ temi unici |
| MT-POS-INTEGRATIONS | POS Integrations | Square, Toast, Lightspeed, Tilby, Clover | Solo Loyverse | 5+ POS |
| MT-WIFI-QR | WiFi QR Generator | 2-step wizard: Config → QR code. WPA/WPA2/WPA3 support | Presente | Aggiungere |
| MT-SOCIAL-EXPANDED | Social Accounts Expanded | Google Business Profile, TikTok, WhatsApp Business | 8 piattaforme (no Google!) | +3 piattaforme |

#### Pattern UX da Adottare

| ID | Pattern | Descrizione | Dove Applicare |
|----|---------|-------------|----------------|
| MT-EMPTY-STATES | Empty States con CTA | Illustrazioni + "Click Add New to create" + CTA primaria | Tutto il backoffice |
| MT-SOFT-DELETE | Archive/Soft Delete | Tab Archive con restore + delete permanente | Menu, Products |
| MT-FILTER-PATTERN | Apply/Reset Filters | Filtri multipli con Apply + Reset buttons | Orders, Reports |
| MT-LIVE-PREVIEW | Live Preview | Preview real-time mentre modifichi (QR, Survey, Website) | QR Builder, Forms |
| MT-PROGRESS-BAR | Progress Tracking | Barra progresso per wizard/onboarding | Onboarding, Setup |

#### Differenziatori GudBro (MenuTiger NON ha)

| Feature | GudBro Status | Vantaggio Competitivo |
|---------|---------------|----------------------|
| **Loyalty Program** | Da implementare | MenuTiger = 0. Differenziatore principale! |
| **19 Tipi QR + AI Artistic** | ✅ Presente | MenuTiger = 5 opzioni base |
| **Database Ingredienti** | ✅ 2548 items | MenuTiger = 0 |
| **5 Dimensioni Safety** | ✅ 66 parametri | MenuTiger = basic allergens only |
| **Nutrition Data** | ✅ 100% coverage | MenuTiger = 0 |
| **Multi-vertical** | ✅ F&B, Wellness, Rentals | MenuTiger = solo F&B |

---

### 🔒 IN STANDBY (Da riprendere dopo P5)

> **IMPORTANTE:** Questi task sono in pausa fino al completamento di P5 Unified Account System.
> NON perdere queste informazioni - riprendere dopo P5!

| ID | Task | Dettagli | Riprendere Dopo |
|----|------|----------|-----------------|
| **DALKY-KAFE-MENU** | Digitalizzazione Menu Dalky Kafe | Menu vietnamita Da Nang (54 items, 8 categorie). Screenshot salvati. 3 ingredienti già aggiunti (Peach Tea, Lychee Tea, Nem Nướng). SQL: `shared/database/ingredients/dalky-kafe-missing-ingredients.sql`. Demo al proprietario per validazione. | P5 completato |
| **DALKY-KAFE-JSON** | Generare JSON menu completo | Creare JSON per import menu: ESPRESSO, VIETNAMESE PHIN, MATCHA-CHOCO-SODA, SMOOTHIES, FRESH JUICE, TEA, CAKE, BANH MI | P5 completato |

**File di riferimento Dalky Kafe:**
- Screenshots menu: Desktop (già analizzati)
- SQL ingredienti: `shared/database/ingredients/dalky-kafe-missing-ingredients.sql`
- Gap analysis: 95% ingredienti già presenti, 100% compatibilità menu digitale

---

### P3 - Bassa Priorità (Nice to Have)

| ID | Feature | Descrizione | Area |
|----|---------|-------------|------|
| FEEDBACK | Internal Feedback System | Floating button per bug/feature nel backoffice | Backoffice |
| REPO-UNIFY | Repository Unification | Migrare docs, archiviare qr-platform-complete | Infra |
| PRISMA-SYNC | Prisma Schema Sync | Aggiungere models mancanti (partners, orgs, brands, locations) | Backoffice |
| CSV-IMPORT | CSV Import Menu Items | Completare handler CSV in /content/menu con validazione | Backoffice |
| BLOG-SYSTEM | Blog per Website | Setup blog con MDX, /blog e /blog/[slug] | Website |
| NPM-PACKAGES | Shared NPM Packages | @gudbro/health-filters, @gudbro/menu-template, @gudbro/qr-engine | Infra |

### P3.5 - Testing & CI/CD (Post P5-Phase1)

> **Raccomandazione:** Implementare DOPO P5 Phase 1 per validare le nuove funzionalità account.

| ID | Feature | Descrizione | Area | Priorità |
|----|---------|-------------|------|----------|
| **TEST-SETUP** | **Testing Foundation** | Setup Jest + Vitest per monorepo, configurazione base | Testing | **Alta** |
| TEST-UNIT | Unit Tests Core | Test per: auth utils, loyalty points calc, role switching logic | Testing | Alta |
| TEST-INTEGRATION | Integration Tests | Test per: Supabase queries, API endpoints account | Testing | Media |
| CI-LINT | GitHub Action Lint | ESLint + TypeScript check su ogni PR | CI/CD | Alta |
| CI-TEST | GitHub Action Tests | Run tests automatici su ogni PR | CI/CD | Media |
| TEST-E2E | E2E Tests | Setup Playwright per user journey completo | Testing | Bassa |
| PERF-AUDIT | Performance Audit | Lighthouse, bundle size, Core Web Vitals | Testing | Bassa |

### P4 - Idee Future (Business Evolution)

| ID | Feature | Descrizione | Area |
|----|---------|-------------|------|
| ~~EXOTIC-PROTEINS~~ | ~~Espansione Proteine Esotiche~~ | **COMPLETATO 2025-12-27.** Aggiunti 33 ingredienti esotici: mammiferi 11 (bison, buffalo, yak, venison, moose, elk, antelope, hare, wild boar, camel, horse), uccelli 7 (ostrich, quail, guinea fowl, pheasant, partridge, pigeon, grouse), rettili/anfibi 5 (crocodile, frog legs, turtle, snake, iguana), insetti 10 (crickets, grasshoppers, mealworms, silkworms, ants, locusts, scorpions, bamboo worms, water bugs). `game`: 12→33, `proteins`: 98→108. | Database |
| RECIPES-DATA | Dati Ricette (AI-assisted) | Step-by-step per ~3500 piatti. Batch workflow: prompt → Gemini/ChatGPT → JSON → SQL. Priorità: Italian, British, French. | Database |
| RECIPES-SYSTEM | Sistema Ricette | Tabella recipes + sezione website per ricette pubbliche. Schema sotto. | Database/Website |
| MENU-SUGGESTION | Suggerimento piatti | Se un ristorante ha certi ingredienti, suggerire piatti dal nostro DB | AI |
| DISH-COSTING | Calcolo costi piatto | Calcolo automatico costo piatto basato su ingredienti e quantità | Backoffice |
| B2B-MARKETPLACE | Marketplace B2B | Acquisto prodotti rari (spirits, spezie, vini) dal backoffice | Business |
| OFFLINE-PWA | Offline Support PWA | Service worker con cache strategy per funzionamento offline | PWA |
| AI-ARTISTIC-QR | QR Artistici con AI | Integrazione con gudbro-qr-core per QR codes artistici | Feature |

---

## P5 - Account System & User Features (NEW 2025-12-31)

> **🎯 NEXT FOCUS** - Prossimo task da implementare dopo pausa pranzo (2026-01-02)
>
> **Strategia Account:** **UNIFIED ACCOUNT SYSTEM** - Un account, ruoli multipli (Consumer/Merchant/Admin). Ogni utente può essere contemporaneamente cliente di altri locali E gestore del proprio. Sistema loyalty unificato che premia tutti indipendentemente dal ruolo.
>
> **Aggiornato:** 2026-01-02 (Unified Account Architecture + Bidirectional Referral + Merchant Loyalty)

### 🆕 Architettura Unified Account (CORE CONCEPT)

```
            ┌─────────────────────┐
            │   GUDBRO ACCOUNT    │
            │   mario@email.com   │
            └──────────┬──────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   🍽️ CONSUMER    🏪 MERCHANT    👤 PERSONAL

   • Ordina        • Gestisce      • Profilo 5 Dim
   • Punti loyalty • Dashboard     • Preferenze
   • Recensioni    • Menu          • Storico visite
   • Wishlist      • Analytics     • Allergeni
        │              │              │
        └──────────────┴──────────────┘
                       │
              STESSO LOGIN!
```

**Vantaggi Chiave:**
- Zero friction: mai "crea nuovo account"
- Un merchant può mangiare da altri merchant GudBro e guadagnare punti
- Un consumer può invitare il suo locale preferito e guadagnare rewards
- Referral bidirezionale: Consumer→Merchant e Merchant→Merchant

### Phase 1: Unified Account Foundation (MVP)

| ID | Feature | Descrizione | Priorità |
|----|---------|-------------|----------|
| **ACC-UNIFIED** | **Unified Account System** | Un account con ruoli multipli (consumer/merchant/admin). Schema: `accounts` + `account_roles` | **P1** |
| **ACC-ROLE-SWITCH** | **Role Switcher UI** | Header dropdown per cambiare ruolo seamlessly. "🏪 Pizzeria Da Mario" ↔ "🍽️ Account Personale" | **P1** |
| ACC-SIGNUP-FLOW | Sign-up Multi-Step | Wizard unico: Profile → Ruolo iniziale (Personal/Business) → 5 Dimensioni/Business Details | P1 |
| ACC-PERSONAL | Profilo Personale | Profilo 5 Dimensioni (allergie, diete, intolleranze), sempre disponibile per ogni account | P1 |
| ACC-BUSINESS | Ruolo Business | Aggiunta ruolo merchant a account esistente. Restaurant name, type, currency, languages | P1 |
| ACC-SYNC-PREFS | Sync Preferenze | Login in locale partner → preferenze automatiche applicate al menu | P1 |
| **ACC-DB-SCHEMA** | **Database Schema Unified** | Tabelle: `accounts`, `account_roles`, `tenants`, `health_profiles`, `loyalty_points` | **P1** |

### Phase 2: Unified Loyalty System (DIFFERENZIATORE!)

> **Concetto:** Un unico sistema punti che accumula da TUTTE le attività, sia come consumer che come merchant.

| ID | Feature | Descrizione | Priorità |
|----|---------|-------------|----------|
| **ACC-LOYALTY-UNIFIED** | **Unified Loyalty Points** | `total_points = consumer_points + merchant_points + contributor_points`. Tutti accumulano nello stesso wallet! | **P2** |
| **ACC-LOYALTY-CONSUMER** | **Consumer Loyalty** | Punti per: ordini, recensioni, social sharing, referral amici, check-in | **P2** |
| **ACC-LOYALTY-MERCHANT** | **Merchant Loyalty** | Punti per: referral merchant, contributi ingredienti, feedback utili, longevità abbonamento, completezza profilo | **P2** |
| **ACC-REFERRAL-BIDIR** | **Bidirectional Referral** | Consumer→Merchant (invita locale preferito) + Merchant→Merchant (invita colleghi). Rewards per entrambi! | **P2** |
| ACC-CONTRIBUTOR | Contributor Program | Punti extra per: ingredienti aggiunti (50pt), bug report (100pt), feature suggestion adottata (200pt), testimonial (1000pt) | P2 |

#### Tabella Punti Unificata

| Azione | Punti | Tipo | Note |
|--------|-------|------|------|
| Ordine completato | 10 | Consumer | Per ogni €10 spesi |
| Recensione verificata | 25 | Consumer | Solo post-ordine |
| Social share | 15 | Consumer | Condividi piatto |
| Referral consumer | 100 | Consumer | Amico si registra |
| **Referral merchant (da consumer)** | **500** | **Consumer** | **Locale invitato si abbona** |
| Check-in locale | 5 | Consumer | Visita verificata |
| **Referral merchant (da merchant)** | **1000** | **Merchant** | **+ 1 mese gratis** |
| **Ingrediente approvato** | **50** | **Contributor** | **Crowdsourcing DB** |
| Bug report utile | 100 | Contributor | Migliora prodotto |
| Feature adottata | 200 | Contributor | Co-creazione |
| 1 anno abbonamento | 300 | Merchant | Fedeltà |
| Profilo 100% completo | 150 | Both | Onboarding |
| Case study/testimonial | 1000 | Merchant | Marketing |

#### Rewards Unificati

| Punti | Reward Consumer | Reward Merchant |
|-------|-----------------|-----------------|
| 500 | Badge "Foodie Explorer" | Badge "GudBro Partner" |
| 1000 | €5 sconto prossimo ordine | 10% sconto prossimo mese |
| 2500 | 1 mese Premium gratis | 1 mese abbonamento gratis |
| 5000 | Badge "Food Champion" | Accesso beta features |
| 10000 | Lifetime Premium | "Founding Partner" + pricing bloccato |

### Phase 2.5: User-Generated Ingredients (Crowdsourcing)

> **Concetto:** Quando un ingrediente manca dal DB, l'utente può contribuirlo con foto delle etichette nutrizionali.

| ID | Feature | Descrizione | Priorità |
|----|---------|-------------|----------|
| **ING-USER-CONTRIB** | **User-Generated Ingredients** | Workflow: ingrediente mancante → foto etichetta → prompt AI → JSON → submit | **P2** |
| ING-PHOTO-EXTRACT | Photo to Nutrition | Prompt ottimizzato per Gemini/ChatGPT che estrae nutrition da foto etichetta | P2 |
| ING-REVIEW-QUEUE | Admin Review Queue | Dashboard per approvare/merge/reject ingredienti submitted | P2 |
| ING-CONTRIBUTOR-REWARD | Contributor Rewards | 50 punti per ingrediente approvato, badge "Ingredient Pioneer" | P2 |

```
Workflow:
1. "birria" non trovato → [📸 Aggiungi con foto]
2. Utente fotografa etichetta nutrizionale
3. Copia prompt GudBro → incolla in Gemini/ChatGPT con foto
4. AI restituisce JSON con nutrition
5. Utente incolla JSON → [Usa subito] o [Invia per review]
6. Se approvato → 50 punti + disponibile per tutti
```

### Phase 3: User Value Features

| ID | Feature | Descrizione | Priorità |
|----|---------|-------------|----------|
| ACC-WISHLIST | Wishlist Piatti | Salva piatti da provare in futuro, notifica quando in promo | P2 |
| ACC-FOOD-DIARY | Food Diary | Storico di cosa hai mangiato e dove (premium feature) | P2 |
| ACC-REVIEWS | Recensioni Verificate | Solo chi ha ordinato può recensire (anti-fake). Peso maggiore se merchant del settore! | P2 |
| ACC-NOTIFICATIONS | Notifiche Personalizzate | "Il tuo locale preferito ha aggiunto un nuovo piatto vegano!" | P2 |
| ACC-BADGES | Badge/Gamification | "Foodie Explorer", "Vegan Champion", "100 locali visitati", "Network Builder", "Ingredient Pioneer" | P3 |
| ACC-SOCIAL-SHARE | Condivisione Social | "Ho mangiato questo da X" → marketing gratuito per locali | P3 |

### Phase 4: Premium Features (€1.50/mese Consumer)

| ID | Feature | Descrizione | Priorità |
|----|---------|-------------|----------|
| ACC-PREMIUM-TIER | Tier Premium Consumer | €1.50/mese: Unlimited referral, Food Diary, Analytics personali, No ads, Priority support | P2 |
| ACC-BILLING | Sistema Billing | Stripe integration per subscription consumer + merchant | P2 |
| ACC-CRYPTO-PAY | Pagamenti Crypto | Coinbase Commerce o NOWPayments per BTC, ETH, USDC. Opzionale | P3 |
| ACC-ANALYTICS-PERSONAL | Analytics Personali | Statistiche su cosa mangi, calorie, allergie evitate (premium) | P3 |

### Phase 5: Cross-Selling & Ecosystem

| ID | Feature | Descrizione | Priorità |
|----|---------|-------------|----------|
| ACC-RECIPES-HOME | Ricette a Casa | "Ti è piaciuto il Pad Thai? Ecco la ricetta" (dal nostro DB 4653 piatti) | P3 |
| ACC-MARKETPLACE-USER | Shopping Marketplace | Acquisti merchandise/ingredienti con dati già salvati | P3 |
| ACC-SPLIT-BILL | Split Bill | Dividi il conto con amici che hanno account GUDBRO | P4 |
| ACC-RESERVATIONS | Prenotazioni | Prenota tavolo direttamente dall'app | P4 |

### Phase 6: Web3 (Future - Post-Validazione)

| ID | Feature | Descrizione | Priorità |
|----|---------|-------------|----------|
| WEB3-NFT-PASS | GUDBRO Genesis Pass NFT | Mint €50-100, premium lifetime + earning $GUD tokens | P5 |
| WEB3-GUD-TOKEN | $GUD Token Utility | Earn: referral, reviews, check-ins. Spend: marketplace, sconti | P5 |
| WEB3-GOVERNANCE | Governance NFT Holders | Votare su nuove features | P5 |

### Database Schema Unified Account

```sql
-- Account principale (UNO per persona)
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT,

    -- Profilo personale (sempre presente)
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,

    -- Health Profile (5 Dimensioni)
    health_profile JSONB DEFAULT '{}',
    dietary_preferences JSONB DEFAULT '{}',

    -- Loyalty unificato
    total_points INTEGER DEFAULT 0,
    consumer_points INTEGER DEFAULT 0,
    merchant_points INTEGER DEFAULT 0,
    contributor_points INTEGER DEFAULT 0,
    loyalty_tier TEXT DEFAULT 'bronze' CHECK (loyalty_tier IN ('bronze', 'silver', 'gold', 'platinum')),

    -- Premium status
    is_premium BOOLEAN DEFAULT FALSE,
    premium_until TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ruoli dell'account (può averne MULTIPLI)
CREATE TABLE account_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
    role_type TEXT NOT NULL CHECK (role_type IN ('consumer', 'merchant', 'admin')),
    tenant_id UUID REFERENCES tenants(id), -- NULL per consumer puro
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    is_primary BOOLEAN DEFAULT FALSE, -- ruolo default al login
    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(account_id, role_type, tenant_id)
);

-- Referral tracking (bidirezionale)
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_account_id UUID REFERENCES accounts(id),
    referred_account_id UUID REFERENCES accounts(id),
    referral_type TEXT CHECK (referral_type IN ('consumer_to_consumer', 'consumer_to_merchant', 'merchant_to_merchant')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'expired')),
    points_awarded INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Ingredienti user-generated
CREATE TABLE ingredient_contributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id),
    ingredient_name TEXT NOT NULL,
    category TEXT,
    submitted_json JSONB NOT NULL,
    source_photos TEXT[],
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'merged', 'rejected')),
    merged_into_id TEXT REFERENCES ingredients(id),
    reviewer_notes TEXT,
    points_awarded INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);
```

### Costi Stimati per Account

```
FREE ACCOUNT (~€0.05/mese costo):
├── Storage DB (profilo, preferenze): ~€0.01
├── Auth (Supabase): ~€0.005
├── CDN/Bandwidth: ~€0.02
├── Email transazionali (2-3/mese): ~€0.01
└── Margine: NEGATIVO (ma acquisition cost + crowdsourcing value)

PREMIUM CONSUMER (€1.50/mese):
├── Costi base: ~€0.05
├── Food Diary storage: ~€0.02
├── Analytics processing: ~€0.05
├── Priority support: ~€0.10
├── Totale costi: ~€0.22/mese
└── Margine: ~€1.28/mese (85%)

MERCHANT (€50/mese):
├── Come da pricing esistente
└── Loyalty points = retention bonus
```

### Revenue Model Summary

| Tier | Prezzo | Target | Loyalty |
|------|--------|--------|---------|
| Free Consumer | €0 | Utenti, data collection, network effect | ✅ Guadagna punti |
| Premium Consumer | €1.50/mese | Power users, food enthusiasts | ✅ 2x punti |
| Merchant | €50/mese | Ristoranti, bar, food truck | ✅ Guadagna punti merchant |
| NFT Pass | €50-100 una tantum | Early adopters (future) | ✅ Lifetime premium |

### Competitor Comparison

| Feature | GudBro | MenuTiger | Yelp | TheFork |
|---------|--------|-----------|------|---------|
| Unified Account | ✅ **UNICO!** | ❌ | ❌ | ❌ |
| Consumer Loyalty | ✅ | ❌ | ❌ | ✅ |
| Merchant Loyalty | ✅ **UNICO!** | ❌ | ❌ | ❌ |
| Bidirectional Referral | ✅ **UNICO!** | ❌ | ❌ | ❌ |
| Role Switching | ✅ **UNICO!** | ❌ | ❌ | ❌ |
| User-Generated Ingredients | ✅ **UNICO!** | ❌ | ❌ | ❌ |

---

### Schema DISH-TYPE-SYSTEM (per riferimento futuro)

```sql
-- ============================================
-- DISH-TYPE-SYSTEM - Classificazione Globale
-- Permette ricerche trasversali tra cucine
-- ============================================

-- 1. Aggiungere colonne a TUTTE le tabelle food esistenti
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS cuisine TEXT DEFAULT 'moroccan';
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS origin_country TEXT DEFAULT 'MA';

-- Ripetere per: lebanese, greek, turkish, japanese, korean, thai, vietnamese,
-- chinese, indian, mexican, brazilian, caribbean, georgian, pasta, pizzas,
-- burgers, steaks, seafood, salads, soups, appetizers, desserts, sandwiches,
-- breakfast, fried, vegetarian, risotti, dumplings, sides, sauces, bakery, icecream

-- 2. Valori validi per dish_type
/*
dish_type CHECK (dish_type IN (
  'appetizer',   -- Antipasti, mezze, starters
  'salad',       -- Insalate fredde e tiepide
  'soup',        -- Zuppe, brodi, stews liquidi
  'main',        -- Piatti principali, secondi
  'side',        -- Contorni
  'bread',       -- Pane, focacce, flatbreads
  'sauce',       -- Salse, condimenti
  'dessert',     -- Dolci
  'pastry',      -- Pasticceria salata e dolce
  'grill',       -- Grigliate, BBQ, brochettes
  'rice',        -- Piatti a base di riso
  'pasta',       -- Piatti a base di pasta
  'pizza',       -- Pizze
  'burger',      -- Hamburger
  'sandwich',    -- Panini, wraps
  'dumpling',    -- Ravioli, gyoza, dim sum
  'beverage'     -- Bevande (per tabelle bevande)
))
*/

-- 3. Valori cuisine (basati su tabelle esistenti)
/*
cuisine: 'moroccan', 'lebanese', 'greek', 'turkish', 'japanese', 'korean',
         'thai', 'vietnamese', 'chinese', 'indian', 'mexican', 'brazilian',
         'caribbean', 'georgian', 'ethiopian', 'italian', 'french', 'american',
         'mediterranean', 'middle_eastern', 'asian', 'international'
*/

-- 4. origin_country: ISO 3166-1 alpha-2
/*
'MA' (Morocco), 'LB' (Lebanon), 'GR' (Greece), 'TR' (Turkey),
'JP' (Japan), 'KR' (Korea), 'TH' (Thailand), 'VN' (Vietnam),
'CN' (China), 'IN' (India), 'MX' (Mexico), 'BR' (Brazil),
'JM' (Jamaica), 'GE' (Georgia), 'ET' (Ethiopia), 'IT' (Italy),
'FR' (France), 'US' (USA), etc.
*/

-- 5. Backfill esistenti (esempio Moroccan)
UPDATE moroccan SET dish_type = 'main', cuisine = 'moroccan', origin_country = 'MA' WHERE category = 'tagine';
UPDATE moroccan SET dish_type = 'rice', cuisine = 'moroccan', origin_country = 'MA' WHERE category = 'couscous';
UPDATE moroccan SET dish_type = 'soup', cuisine = 'moroccan', origin_country = 'MA' WHERE category = 'soup';
UPDATE moroccan SET dish_type = 'pastry', cuisine = 'moroccan', origin_country = 'MA' WHERE category = 'pastry';
UPDATE moroccan SET dish_type = 'grill', cuisine = 'moroccan', origin_country = 'MA' WHERE category = 'grill';
UPDATE moroccan SET dish_type = 'salad', cuisine = 'moroccan', origin_country = 'MA' WHERE category = 'salad';
UPDATE moroccan SET dish_type = 'bread', cuisine = 'moroccan', origin_country = 'MA' WHERE category = 'bread';

-- 6. Indexes per performance
CREATE INDEX IF NOT EXISTS idx_moroccan_dish_type ON moroccan(dish_type);
CREATE INDEX IF NOT EXISTS idx_moroccan_cuisine ON moroccan(cuisine);
CREATE INDEX IF NOT EXISTS idx_moroccan_origin_country ON moroccan(origin_country);

-- 7. VIEW globale per ricerche trasversali
CREATE OR REPLACE VIEW all_dishes AS
SELECT id, slug, name, description, dish_type, cuisine, origin_country,
       ingredient_ids, allergens, is_vegan, is_vegetarian, is_halal,
       spice_level, popularity, 'moroccan' as source_table
FROM moroccan
UNION ALL
SELECT id, slug, name, description, dish_type, cuisine, origin_country,
       ingredient_ids, allergens, is_vegan, is_vegetarian, is_halal,
       spice_level, popularity, 'lebanese' as source_table
FROM lebanese
-- ... UNION ALL per tutte le tabelle
;

-- 8. Query di esempio
-- Tutte le insalate
SELECT * FROM all_dishes WHERE dish_type = 'salad' ORDER BY popularity DESC;

-- Piatti con ingrediente specifico
SELECT * FROM all_dishes WHERE 'ING_CHICKEN' = ANY(ingredient_ids);

-- Suggerimento: "hai pollo e limone, puoi fare..."
SELECT * FROM all_dishes
WHERE ingredient_ids @> ARRAY['ING_CHICKEN', 'ING_LEMON']
ORDER BY array_length(ingredient_ids, 1) ASC; -- Piatti più semplici prima
```

**Casi d'uso abilitati:**
1. Ristorante tipico che vuole espandere menu con piatti di altre cucine
2. Ristorante internazionale con menu multi-cucina
3. Sistema suggerimento piatti basato su ingredienti disponibili
4. Filtri globali nel backoffice (tutte le zuppe, tutti i dessert, etc.)
5. Analytics cross-cuisine (piatti più popolari per tipo)

**Piano implementazione:**
1. Aggiungere colonne a tutte le 32 tabelle food
2. Backfill dati esistenti basandosi su category
3. Creare VIEW `all_dishes`
4. Aggiornare backoffice per ricerche globali

---

### Schema RECIPES-SYSTEM (per riferimento futuro)

```sql
-- ============================================
-- RECIPES Database Schema (DRAFT)
-- Da implementare quando priorità aumenta
-- ============================================

-- 1. Tabella principale ricette
CREATE TABLE recipes (
    id TEXT PRIMARY KEY,                    -- RCP_CARBONARA, RCP_MOJITO
    product_type TEXT NOT NULL,             -- 'pasta', 'cocktails', etc.
    product_id TEXT NOT NULL,               -- Link al prodotto esistente

    -- Tempi e difficoltà
    prep_time_min INTEGER NOT NULL,         -- Minuti preparazione
    cook_time_min INTEGER DEFAULT 0,        -- Minuti cottura (0 per cocktails)
    rest_time_min INTEGER DEFAULT 0,        -- Tempo riposo/marinatura
    difficulty INTEGER NOT NULL CHECK (difficulty >= 1 AND difficulty <= 5),
    servings INTEGER NOT NULL DEFAULT 4,

    -- Contenuto
    introduction TEXT,                      -- Intro/storia del piatto
    steps JSONB NOT NULL,                   -- Array di steps strutturati
    chef_notes TEXT,                        -- Tips, varianti, sostituzioni
    common_mistakes TEXT[],                 -- Errori da evitare

    -- Media
    image_url TEXT,
    video_url TEXT,                         -- YouTube/Vimeo embed

    -- SEO & Publishing
    is_published BOOLEAN DEFAULT false,
    slug TEXT UNIQUE,                       -- URL-friendly: "spaghetti-carbonara"
    meta_title TEXT,
    meta_description TEXT,

    -- Metadata
    author TEXT DEFAULT 'GUDBRO Team',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Estendere product_ingredients con quantità
ALTER TABLE product_ingredients ADD COLUMN IF NOT EXISTS
    quantity DECIMAL(8,2),                  -- 200, 2, 0.5
    unit TEXT,                              -- 'g', 'ml', 'pcs', 'tbsp', 'tsp', 'cup'
    preparation TEXT,                       -- 'diced', 'melted', 'room temperature'
    is_optional BOOLEAN DEFAULT false,      -- Ingrediente opzionale
    display_order INTEGER DEFAULT 0;        -- Ordine visualizzazione

-- 3. Formato JSONB per steps
/*
steps: [
    {
        "order": 1,
        "title": "Prepare the guanciale",
        "description": "Cut guanciale into small cubes...",
        "duration_min": 5,
        "image_url": null,
        "tips": "Use guanciale, not pancetta"
    },
    {
        "order": 2,
        "title": "Cook pasta",
        "description": "Bring salted water to boil...",
        "duration_min": 10,
        "image_url": null,
        "tips": "Save pasta water!"
    }
]
*/

-- 4. Indexes per performance
CREATE INDEX idx_recipes_product ON recipes(product_type, product_id);
CREATE INDEX idx_recipes_published ON recipes(is_published) WHERE is_published = true;
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);

-- 5. View per website (solo pubblicati)
CREATE VIEW public_recipes AS
SELECT r.*, p.name as product_name
FROM recipes r
JOIN ... -- dynamic join based on product_type
WHERE r.is_published = true;
```

**Piano di implementazione:**
1. Creare tabella `recipes` (non modifica esistente)
2. Aggiungere colonne a `product_ingredients` (ALTER TABLE)
3. Iniziare con Cocktails (ricette più semplici, ~50 recipes)
4. Poi Pasta (~30 recipes) e Desserts (~20 recipes)
5. Sezione /recipes sul website con SSG per SEO

---

# COMPLETATI

## Prodotti Completati

| ID | Database | Records | Completato |
|----|----------|---------|------------|
| DB-COCKTAILS | Cocktails | 227 | 2025-12-14 |
| **DB-SPIRITS** | **Spirits** | **197** | **2025-12-18** |
| DB-WINES | Wines | 143 | 2025-12-16 |
| DB-JAPANESE | Japanese (Sushi) | 100 | 2025-12-17 |
| DB-PASTA | Pasta | 87 | 2025-12-15 |
| DB-COFFEE | Coffee | 76 | 2025-12-17 |
| **DB-STEAKS** | **Steaks & Grills** | **100** | **2025-12-21** (expanded +26 premium cuts, achuras) |
| **DB-CHINESE** | **Chinese** | **73** | **2025-12-18** |
| **DB-PERUVIAN** | **Peruvian** | **128** | **2025-12-20** |
| **DB-VIETNAMESE** | **Vietnamese** | **72** | **2025-12-19** |
| **DB-KOREAN** | **Korean** | **77** | **2025-12-19** |
| **DB-GREEK** | **Greek** | **74** | **2025-12-19** |
| **DB-LEBANESE** | **Lebanese** | **94** | **2025-12-19** |
| **DB-GEORGIAN** | **Georgian** | **74** | **2025-12-19** |
| **DB-TURKISH** | **Turkish** | **98** | **2025-12-19** |
| **DB-BRAZILIAN** | **Brazilian** | **91** | **2025-12-19** |
| **DB-THAI** | **Thai** | **69** | **2025-12-18** |
| **DB-MEXICAN** | **Mexican** | **66** | **2025-12-18** |
| **DB-BREAKFAST** | **Breakfast** | **65** | **2025-12-18** |
| **DB-INDIAN** | **Indian** | **65** | **2025-12-18** |
| **DB-VEGETARIAN** | **Vegetarian** | **65** | **2025-12-18** |
| **DB-SEAFOOD** | **Seafood** | **63** | **2025-12-18** |
| DB-PIZZAS | Pizzas | 62 | 2025-12-14 |
| DB-TEA | Tea & Infusions | 62 | 2025-12-17 |
| DB-SALADS | Salads | 52 | 2025-12-14 |
| DB-APPETIZERS | Appetizers | 54 | 2025-12-21 (expanded +3 steakhouse) |
| DB-SANDWICHES | Sandwiches | 50 | 2025-12-15 |
| **DB-FRIED** | **Fried Foods** | **48** | **2025-12-18** |
| DB-BEERS | Beers | 45 | 2025-12-14 |
| DB-BURGERS | Burgers | 45 | 2025-12-15 |
| DB-SOUPS | Soups | 39 | 2025-12-15 |
| DB-DESSERTS | Desserts | 35 | 2025-12-16 |
| DB-RISOTTI | Risotti | 27 | 2025-12-15 |
| DB-DUMPLINGS | Dumplings | 20 | 2025-12-15 |
| **DB-CARIBBEAN** | **Caribbean** | **139** | **2025-12-20** |
| **DB-SOFTDRINKS** | **Soft Drinks** | **35** | **2025-12-20** |
| **DB-WATERS** | **Waters** | **64** | **2025-12-20** |
| **DB-MOCKTAILS** | **Mocktails** | **38** | **2025-12-20** |
| **DB-SMOOTHIES** | **Smoothies** | **45** | **2025-12-21** |
| **DB-MILKSHAKES** | **Milkshakes** | **25** | **2025-12-21** |
| **DB-HOTBEVERAGES** | **Hot Beverages** | **25** | **2025-12-21** |
| **DB-ICECREAM** | **Ice Cream** | **34** | **2025-12-21** |
| **DB-BAKERY** | **Bakery** | **45** | **2025-12-21** |
| **DB-SAUCES** | **Sauces** | **42** | **2025-12-21** |
| **DB-SIDES** | **Sides** | **36** | **2025-12-21** |
| **DB-MOROCCAN** | **Moroccan** | **55** | **2025-12-21** |
| **DB-ETHIOPIAN** | **Ethiopian** | **45** | **2025-12-21** |
| **DB-SPANISH** | **Spanish** | **55** | **2025-12-21** |
| **DB-FRENCH** | **French** | **58** | **2025-12-21** |
| **DB-ITALIAN** | **Italian** | **102** | **2025-12-23** |
| **DB-BRITISH** | **British** | **44** | **2025-12-23** |
| **DB-GERMAN** | **German** | **50** | **2025-12-24** |
| **DB-PORTUGUESE** | **Portuguese** | **39** | **2025-12-24** |
| **DB-POLISH** | **Polish** | **42** | **2025-12-24** |
| **DB-SCANDINAVIAN** | **Scandinavian** | **78** | **2025-12-24** |
| **DB-RUSSIAN** | **Russian** | **55** | **2025-12-25** |
| **DB-SWISS** | **Swiss** | **38** | **2025-12-25** |
| **DB-BELGIAN** | **Belgian** | **32** | **2025-12-25** |
| **DB-DUTCH** | **Dutch** | **38** | **2025-12-25** |
| **DB-TEXMEX** | **Tex-Mex** | **46** | **2025-12-25** |
| **DB-NIKKEI** | **Nikkei** | **30** | **2025-12-25** |
| **DB-INDOCHINESE** | **Indo-Chinese** | **35** | **2025-12-25** |
| **DB-INDONESIAN** | **Indonesian** | **55** | **2025-12-25** |
| **DB-MALAYSIAN** | **Malaysian** | **57** | **2025-12-25** |
| **DB-FILIPINO** | **Filipino** | **59** | **2025-12-25** |
| **DB-ARGENTINIAN** | **Argentinian** | **47** | **2025-12-26** |
| **DB-COLOMBIAN** | **Colombian** | **45** | **2025-12-26** |
| **DB-VENEZUELAN** | **Venezuelan** | **39** | **2025-12-26** |
| **DB-CHILEAN** | **Chilean** | **43** | **2025-12-26** |
| **DB-CUBAN** | **Cuban** | **44** | **2025-12-26** |
| **DB-NIGERIAN** | **Nigerian** | **49** | **2025-12-26** |
| **DB-KOREAN-MEX** | **Korean-Mexican** | **21** | **2025-12-26** |
| **DB-SENEGALESE** | **Senegalese** | **28** | **2025-12-27** |
| **DB-SOUTHAFRICAN** | **South African** | **40** | **2025-12-27** |
| **DB-AUSTRALIAN** | **Australian** | **29** | **2025-12-27** |
| **DB-HAWAIIAN** | **Hawaiian** | **29** | **2025-12-27** |
| **DB-CAJUN** | **Cajun/Creole** | **42** | **2025-12-27** |
| **TOTALE** | **75 database** | **4653** | |

## Funzionalità Completate

### Database & Ingredienti
| ID | Feature | Completato | Note |
|----|---------|------------|------|
| **ORIGIN-STANDARDIZATION** | **Campo origin JSONB su tutte le tabelle** | **2025-12-22** | **33 tabelle migrate (cucine, bevande, food). Scripts 003-007** |
| **DISH-TYPE-SYSTEM** | **Campo dish_type su tutte le tabelle food** | **2025-12-22** | **42 tabelle con classificazione universale. Script 008** |
| **RLS-FIX** | **Fix RLS su tutte le 47+ tabelle** | **2025-12-22** | **Script `fix-rls-complete-2025-12-22.sql` con RLS policies per tutte le tabelle** |
| **SEARCH-PATH-FIX** | **Fix search_path su tutte le funzioni** | **2025-12-22** | **Trigger functions con SECURITY DEFINER + SET search_path = public** |
| **SUSTAINABILITY** | **Campi sostenibilità su ingredients** | **2025-12-22** | **sustainability_score, carbon_footprint_kg, production_method, is_seasonal, season_months. Script 009** |
| **IS-PUBLIC** | **is_public + owner_id su 55 tabelle** | **2025-12-22** | **Distingue record globali GUDBRO da merchant-custom. Script 010** |
| **GTIN** | **GTIN (standard GS1) su ingredients** | **2025-12-22** | **gtin CHAR(14) normalizzato + gtin_format. Funzioni normalize_gtin(), detect_gtin_format(). Script 011** |
| **IMG-PRODUCTS** | **image_url su 52 tabelle food/bevande** | **2025-12-23** | **Campo image_url TEXT + partial index. Script 012** |
| **IMG-INGREDIENTS** | **image_url su ingredients** | **2025-12-23** | **Campo image_url TEXT + partial index. Script 012** |
| **ING-CLEANUP** | **Cleanup Duplicati Ingredienti** | **2025-12-20** | **63 duplicati rimossi (esatti + UK/US + singolare/plurale)** |
| **DB-STANDARDS** | **DATABASE-STANDARDS.md v1.0** | **2025-12-17** | **12 sezioni, review con Opus, regole definitive** |
| MASTER-INGREDIENTS | Master Ingredients Table | 2025-12-16 | 1767 ingredienti in Supabase (post-cleanup) |
| PRODUCT-INGREDIENTS | Junction table product_ingredients | 2025-12-17 | 14209 links totali |
| ING-STANDARD | Standardizzare ingredienti a ING_* | 2025-12-17 | Tutti i DB migrati |
| MCP-SUPABASE | Setup Supabase connection | 2025-12-17 | Credenziali in config/supabase.env |
| 5-DIMENSIONS | Sistema 5 Dimensioni | 2025-12-14 | 66 parametri sicurezza alimentare |

### PWA Coffeeshop
| ID | Feature | Completato | Note |
|----|---------|------------|------|
| PWA-MANIFEST | PWA Manifest & Icons | 2025-12-11 | manifest.json, service-worker.js, icone PNG |
| PWA-AUTH | Auth System | 2025-12-11 | Social login (Google/Apple/Facebook) + email |
| PWA-WELCOME | Welcome Modal | 2025-12-11 | Onboarding con language selector |
| PWA-CART | Shopping Cart | 2025-12-11 | localStorage persistence |
| PWA-FAVORITES | Favorites System | 2025-12-11 | localStorage persistence |
| PWA-THEME | Theme System | 2025-12-11 | Light/dark con WCAG AA colors |
| PWA-I18N | Multi-language | 2025-12-11 | EN/VI/IT + RTL support |
| PWA-CURRENCY | Currency Converter | 2025-12-11 | 33 currencies, VND "k" format |
| PWA-ACCOUNT | Account Page | 2025-12-11 | Profilo, favorites, storico ordini |

### Backoffice
| ID | Feature | Completato | Note |
|----|---------|------------|------|
| BO-AUTH | Auth Guards | 2025-12-11 | Middleware auth, protezione route |
| BO-MULTI-TENANT | Multi-Tenant System | 2025-12-11 | Partner → Org → Brand → Location |
| BO-MENU-CRUD | Menu CRUD | 2025-12-11 | /content/menu con edit |
| BO-TRANSLATIONS | Translation Editor | 2025-12-11 | Inline edit + CSV export |
| BO-FOOD-COSTS | Food Cost System | 2025-12-11 | 69 ingredients with costs |
| BO-RECIPES | Recipe Management | 2025-12-11 | 22 barista recipes |
| BO-MODIFIERS | Product Modifiers | 2025-12-11 | Customization groups |
| BO-QR | QR Code Generation | 2025-12-11 | QR codes per tavoli |

### Website
| ID | Feature | Completato | Note |
|----|---------|------------|------|
| WEB-PAGES | 16 Marketing Pages | 2025-12-12 | Homepage, About, FAQ, Contact, Solutions |
| WEB-AUTH | Sign In/Up Pages | 2025-12-12 | Connessi a Supabase Auth |
| WEB-LEGAL | Legal Pages | 2025-12-12 | Privacy, Terms, Cookies |
| WEB-SEO | SEO & Sitemap | 2025-12-12 | 22 URLs, robots.txt |
| WEB-SOLUTIONS | Solutions Pages | 2025-12-12 | Restaurants, Hotels, Airbnb, Food Trucks |

---

## Statistiche Attuali

```
PRODOTTI (Database Food & Bevande)
├── Completati:    75 database (~4653 records)
│   ├── Food:      63 database (pizzas, pasta, burgers, thai, chinese, vietnamese, peruvian, caribbean, moroccan, ethiopian, spanish, french, italian, british, german, portuguese, polish, scandinavian, russian, swiss, belgian, dutch, texmex, nikkei, indochinese, indonesian, malaysian, filipino, argentinian, colombian, venezuelan, chilean, cuban, nigerian, koreanmex, senegalese, southafrican, australian, hawaiian, cajun, icecream, bakery, sauces, sides, etc.)
│   └── Bevande:   12 database (cocktails, spirits, wines, beers, coffee, tea, waters, softdrinks, mocktails, smoothies, milkshakes, hotbeverages)
│
└── Da fare:       0 database - BACKLOG COMPLETATO!
    ├── P2 Europa:     0 database - COMPLETATO!
    ├── P2 Americas:   0 database - COMPLETATO!
    ├── P2 Africa:     0 database - COMPLETATO!
    ├── P2 Asia:       0 database - COMPLETATO!
    ├── P3 Fusion:     0 database - COMPLETATO!
    └── P3 Altre:      0 database - COMPLETATO!

FUNZIONALITÀ
├── Completate:    30 features (PWA, Backoffice, Website, Database, Cleanup, Security)
├── Da fare:       18 features (P1: 1, P2: 6, P3: 9, P4: 5)
└── NEW MenuTiger: 17 features (6 da copiare, 6 gap da colmare, 5 pattern UX)

COMPETITOR AUDIT (2026-01-01)
├── MenuTiger:     57 screenshot analizzati
├── Report:        docs/competitor-audits/MENUTIGER-AUDIT-REPORT-V2.md
├── Key Gap:       Loyalty Program (MenuTiger = 0, GudBro = differenziatore!)
└── Features:      Hot Actions, Onboarding, Opening Hours, Geofencing, Survey Builder

INFRASTRUTTURA
├── Ingredienti:   ~2549 nella master table
├── Links:         ~25169 in product_ingredients
├── Formaggi:      226 (espansione globale 2025-12-26)
├── Categorie:     fats + cheese categories
└── Traduzioni:    0 (da popolare)

TOTALE PROGETTO
├── Records attuali:     ~4653 prodotti in 75 database
├── Records pianificati: 0 (backlog completato!)
└── Records totale:      ~4653 prodotti in 75 database
```

---

## Note Architetturali (Non Dimenticare!)

### REGOLA FONDAMENTALE
**Prima di creare/modificare QUALSIASI database food:**
1. LEGGI `shared/database/DATABASE-STANDARDS.md` (v1.0 DEFINITIVO)
2. SEGUI tutte le regole
3. USA le checklist
4. Se regola manca → AGGIUNGILA prima di procedere

### Decisioni Confermate (DATABASE-STANDARDS v1.0)
| Decisione | Regola |
|-----------|--------|
| **Lingua Base** | SOLO INGLESE nel DB |
| **Traduzioni** | Tabella `translations` separata |
| **ID Format** | TEXT con `PREFIX_NAME` (es. STK_RIBEYE, ING_TOMATO) |
| **Popularity** | Scala 0-100 (MAI 1-5!) |
| **Spice Level** | Scala 0-5 con mapping Scoville |
| **Timestamps** | SEMPRE `TIMESTAMPTZ` (mai TIMESTAMP) |
| **Boolean** | SEMPRE `NOT NULL DEFAULT false/true` |
| **Arrays** | SEMPRE `NOT NULL DEFAULT '{}'` |
| **RLS** | OBBLIGATORIO su tutte le tabelle |
| **Functions** | SEMPRE con `SET search_path = public` |
| **Pesi/Misure** | Sempre METRICO (g, ml) |
| **Costi** | MAI in master ingredients, tabella separata per location |

---

**Fonti utili:**
- [Supabase MCP Docs](https://supabase.com/docs/guides/getting-started/mcp)
- Database Status dettagliato: `docs/DATABASE-INVENTORY.md`
