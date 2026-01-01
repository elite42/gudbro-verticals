# MenuTiger Backoffice - Audit Report V2 (Consolidato)

> **Audit eseguito con:** Claude Browser (Opus 4.5) + Claude Code (Opus 4.5)
>
> **Data:** 2026-01-01
>
> **Competitor:** MenuTiger (menu.tiger)
>
> **Screenshot analizzati:** 57
>
> **Versione:** 2.0 - Consolidato con osservazioni dirette

---

## Executive Summary

### 5 Punti di Forza (Confermati)

1. **Interfaccia pulita e intuitiva** - Dark sidebar (~200px) + area lavoro chiara, navigazione logica con 12 sezioni principali
2. **Sistema QR robusto** - Customizzazione QR con 5 opzioni (Logo, Pattern, Eyes, Colors, Frame) + live preview
3. **Kitchen Display System** - Feature premium con trial 30 giorni, drag & drop stati ordine (Beta)
4. **Hot Actions System** - Feature UNICA: pulsanti per richieste cliente (Call waiter, Clean table, Verify bill, etc.)
5. **Onboarding eccellente** - Checklist 4 step con progress bar, video tutorial, e-book download

### 5 Punti Deboli / Opportunita (Confermati + Nuovi)

1. **Analytics quasi assenti** - "Reports" e solo uno scheduler email, non analytics veri
2. **CRM estremamente basico** - Solo lista clienti (Name, Email, Phone, Created), no segmentazione, no history
3. **Temi limitatissimi** - Solo 5 temi, 4 dei quali sono solo variazioni di colore (stesso layout)
4. **Integrazioni POS limitate** - Solo Loyverse come POS, mancano Square, Toast, Lightspeed
5. **Printers a pagamento extra** - $20/mese addon per stampanti termiche

### Target User

- Piccoli-medi ristoranti (1-5 sedi)
- Focus su ordinazione da tavolo via QR
- Budget contenuto ($17/mese entry-level)
- Mercato globale (8 lingue backoffice)

### Pricing Confermato

| Piano | Prezzo | Note |
|-------|--------|------|
| **Regular** | $17/mese | Entry-level, trialing disponibile |
| **Pro+** | ~$38/mese | KDS, multi-store |
| **Printers** | +$20/mese | Addon separato |
| **White Label** | Premium | Richiede upgrade |

---

## Architettura Completa del Backoffice

### Sidebar Navigation (12 Sezioni)

```
MENU TIGER Backoffice
├── Dashboard          → KPI cards, grafici, filtri temporali
├── Menus              → Menus | Modifiers | Archive
├── Orders             → Food orders table con filtri
├── Kitchen Display    → [Beta] Premium feature, trial 30gg
├── Stores ▼
│   ├── Store          → Tables | Users | Opening Hours | Social | WiFi | Location | Settings
│   └── Taxations      → Tax categories (Dine-in/Take-out rates)
├── Marketing ▼
│   ├── Website        → Homepage (5 sezioni) | Colors | Themes
│   ├── Promotions     → Discount on cart, scheduling
│   ├── Surveys        → Question builder con preview
│   └── Customers      → Lista base (no CRM)
├── Hot Actions        → Create | Requests monitoring
├── Reports            → Scheduler (email) | Newsletter Signups | Feedback
├── Accounting [New]   → Orders financial view, KPI cards
├── FAQ                → [BROKEN - Page Not Found]
├── Integrations       → Payment | White Label | Printers | POS
└── Settings           → Profile | Restaurant | Notifications | Order | Developer | Billing | QR Code
```

### Header Bar (Top Navigation)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ MENU🐯TIGER  ≡  │  🌙  🌐  🔔(04)  🏳️  🖥️  📱  ⬜  📋  👤  [QR] [OPEN APP] │
└─────────────────────────────────────────────────────────────────────────┘
         │         │   │   │    │   │   │   │   │   │    │       │
         │         │   │   │    │   │   │   │   │   │    │       └─ CTA verde
         │         │   │   │    │   │   │   │   │   │    └─ QR quick access
         │         │   │   │    │   │   │   │   │   └─ User menu
         │         │   │   │    │   │   │   │   └─ List view
         │         │   │   │    │   │   │   └─ Fullscreen
         │         │   │   │    │   │   └─ Mobile preview
         │         │   │   │    │   └─ Desktop preview
         │         │   │   │    └─ Country/Flag
         │         │   │   └─ Notifications (badge count)
         │         │   └─ Language (8 lingue)
         │         └─ Dark/Light mode
         └─ Hamburger menu (collapse sidebar)
```

---

## Feature Matrix (Aggiornata da Screenshot)

| Categoria | Feature | Disponibile | Piano | Note Screenshot |
|-----------|---------|-------------|-------|-----------------|
| **Menu** | Menus Tab | ✅ | Tutti | Card grid layout |
| **Menu** | Modifiers | ✅ | Tutti | Name, Type, Price, Unit (gram) |
| **Menu** | Localize per modifier | ✅ | Tutti | 8+ lingue |
| **Menu** | Archive (soft delete) | ✅ | Tutti | Restore + delete |
| **QR** | Logo embedding | ✅ | Tutti | Centro QR |
| **QR** | Pattern customization | ✅ | Tutti | Stile dots |
| **QR** | Eyes customization | ✅ | Tutti | Angoli QR |
| **QR** | Colors (2) | ✅ | Tutti | Primary + Secondary |
| **QR** | Frame + CTA | ✅ | Tutti | "SCAN ME" |
| **QR** | Live preview | ✅ | Tutti | Real-time |
| **Ordini** | Filtri multipli | ✅ | Tutti | Invoice, Store, Payment, Delivery |
| **Ordini** | Apply/Reset filter | ✅ | Tutti | Pattern standard |
| **KDS** | Kitchen Display | ⚠️ | Premium | Trial 30gg, $20+/mese? |
| **Stores** | Tables management | ✅ | Tutti | QR per tavolo |
| **Stores** | Users (multi-user) | ✅ | Pro+ | Role-based |
| **Stores** | Opening Hours | ✅ | Tutti | 7 giorni, multi-slot |
| **Stores** | Social Accounts | ✅ | Tutti | 8 piattaforme (no Google!) |
| **Stores** | WiFi QR generator | ✅ | Tutti | 2-step wizard |
| **Stores** | Geofencing | ✅ | Pro+ | Radius + mappa |
| **Stores** | Taxations | ✅ | Tutti | Dine-in/Take-out rates |
| **Website** | 5 sezioni toggle | ✅ | Tutti | Hero, About, Featured, Why Us, Newsletter |
| **Website** | Colors (2 preset + custom) | ✅ | Tutti | Primary + Secondary |
| **Website** | Themes | ⚠️ | Tutti | Solo 5, molto simili |
| **Promos** | Discount on cart | ✅ | Tutti | %, min order, scheduling |
| **Promos** | Multi-store | ✅ | Pro+ | Filter per store |
| **Surveys** | Question builder | ✅ | Tutti | Live preview |
| **Surveys** | Question types | ✅ | Tutti | Text box, etc. |
| **CRM** | Customer list | ✅ | Tutti | Name, Email, Phone, Created |
| **CRM** | Customer segments | ❌ | - | Non disponibile |
| **CRM** | Order history | ❌ | - | Non disponibile |
| **Hot Actions** | Pre-configured (4) | ✅ | Tutti | Call, Notes, Bill, Clean |
| **Hot Actions** | Custom actions | ⚠️ | Premium? | Add New locked |
| **Hot Actions** | Request monitoring | ✅ | Tutti | Filtri, status |
| **Reports** | Email scheduler | ✅ | Tutti | Daily/Weekly/Monthly |
| **Reports** | Newsletter signups | ✅ | Tutti | From website |
| **Analytics** | Dashboard real | ⚠️ | Tutti | Solo in Dashboard, non in Reports |
| **Accounting** | KPI cards (5) | ✅ | Tutti | Sales, Discounts, Orders, Tax, Tip |
| **Accounting** | Download export | ✅ | Tutti | CSV |
| **Payments** | Stripe | ✅ | Tutti | Connect |
| **Payments** | PayPal | ✅ | Tutti | Connect |
| **Payments** | Adyen | ✅ | Tutti | Connect |
| **Payments** | Cash toggle | ✅ | Tutti | On/Off |
| **Payments** | Custom Payment | ✅ | Tutti | Alternative methods |
| **POS** | Loyverse | ✅ | Tutti | UNICO POS! |
| **POS** | Square/Toast/etc | ❌ | - | Non disponibile |
| **Printers** | Thermal printers | ⚠️ | Addon | $20/mese extra |
| **White Label** | Custom branding | ⚠️ | Premium | Requires upgrade |
| **API** | Developer tokens | ✅ | Tutti | Generate/Revoke |
| **Billing** | Gift cards | ✅ | Tutti | Redemption |
| **Notifications** | Sound per type | ✅ | Tutti | Orders, Feedback, Hot Actions |
| **Notifications** | Preview play | ✅ | Tutti | Test sounds |
| **i18n** | Backoffice languages | ✅ | Tutti | 8 lingue incluso Arabic RTL |
| **Support** | AI Answers | ✅ | Tutti | Chatbot |
| **Support** | Email (15 min) | ✅ | Tutti | Response time stated |
| **Feedback** | NPS widget | ✅ | Tutti | 5-point emoji scale |
| **Onboarding** | Checklist (4 step) | ✅ | Tutti | Progress bar |
| **Onboarding** | Video tutorial | ✅ | Tutti | Sidebar CTA |

---

## Analisi Dettagliata per Sezione

### 1. Dashboard

**Layout confermato:**
- Sidebar sinistra scura (~200px)
- Area contenuto bianca con cards
- Header con toggle, notifications, previews

**KPI Cards (4):**
| Card | Colore | Icona |
|------|--------|-------|
| Total Orders | Dark teal | 📦 |
| Revenue | Green | 💰 |
| Customers | White | 👤 |
| Feedback | White | 👍 |

**Grafici:**
- Bar chart (Orders) con dropdown switchabile
- Empty state con illustrazione quando no data

**Filtri temporali:** Today | Week | Month | Custom Range

**Widget laterali:**
- QR Scan Count
- Most Sold Foods

**UX Score:** 7/10
- Pro: Layout chiaro, empty states con illustrazioni
- Contro: KPI non cliccabili, no AI insights

---

### 2. Menus

**Tab structure:**
| Tab | Contenuto |
|-----|-----------|
| Menus | Card grid menu esistenti |
| Modifiers | Gruppi modifier con options |
| Archive | Soft delete con restore |

**Modifiers Form:**
```
Name *
Type: ○ Optional / ○ Required
☐ Allow adding same choice multiple times
Modifiers Options: Name | Price | Unit (gram) | 🗑️
+ Add Modifier Option
[Localize tab per traduzioni]
```

**UX Score:** 8/10
- Pro: Soft delete, localize integrato, unit of measure
- Contro: No preview live, no drag & drop riordino

---

### 3. Orders

**Filter Bar:**
| Filtro | Tipo |
|--------|------|
| Invoice ID | Text input |
| Store | Dropdown |
| Payment method | Dropdown |
| Delivery method | Dropdown |

**Table Columns:** Invoice ID | Payment method | Date | Time | Delivery method | Paid status | Order status

**UX Score:** 7/10
- Pro: Filtri multipli ben organizzati
- Contro: No export visibile, no real-time updates

---

### 4. Kitchen Display System

**Status:** Beta, Premium feature

**Upsell Modal:**
- Badge: "Launched offering free trial!"
- Trial: 30 giorni, no credit card
- Video YouTube embedded
- CTA: "Claim 30-Day Free Trial!" + "Upgrade your plan"

**Strategia monetizzazione:** Lead magnet per conversion a piani premium

---

### 5. Stores

**7 Tab per Store:**

| Tab | Contenuto | UX Score |
|-----|-----------|----------|
| Tables | QR per tavolo | 7/10 |
| Users | Staff multi-user con roles | 6/10 |
| Opening Hours | 7 giorni, toggle, multi-slot | 9/10 |
| Social Accounts | 8 piattaforme | 7/10 |
| WiFi | QR generator 2-step | 8/10 |
| Location Details | Geofencing + Google Maps | 9/10 |
| Settings | Config store | - |

**Opening Hours UI (Eccellente):**
```
| Giorno    | Toggle | Start | End   | + |
|-----------|--------|-------|-------|---|
| Monday    | 🟢 ON  | 00:00 | 23:59 | + |
| Tuesday   | 🟢 ON  | 00:00 | 23:59 | + |
...
```

**Social Accounts (8 piattaforme):**
- Facebook, X, Instagram, Snapchat
- Pinterest, Foursquare, Tripadvisor, Zomato
- ⚠️ MANCA: Google Business Profile, TikTok, WhatsApp

**Geofencing:**
- Toggle enable/disable
- Get current location (auto-detect)
- Latitude/Longitude fields
- Radius in metri
- Google Maps interattiva

**Taxations:**
- Name, Type (Include/Add to price)
- Dine-in rate %, Take-out rate %
- ⚠️ No tax per product, no multi-tax

---

### 6. Marketing

#### 6.1 Website Builder

**5 Sezioni Homepage (toggle on/off):**
1. Hero Section - Heading, Description, Button Link
2. About Section - Image, Heading, Description
3. Featured Food Section
4. Why Choose Us Section - Image, Heading, Description
5. Newsletter - Heading, Description

**Colors:**
- 2 Preset (CrimsonLight, SunsetGlow)
- Custom: Primary + Secondary (hex input)
- Live preview!

**Themes (5):**
| Theme | Colore | Layout |
|-------|--------|--------|
| 1 | Rosso scuro | Standard |
| 2 | Marrone/Bronze | Standard |
| 3 | Verde lime | Standard |
| 4 | Verde scuro | Standard |
| 5 | Bianco clean | DIVERSO |

⚠️ **Problema:** Solo Theme 5 ha layout diverso. Gli altri 4 sono solo variazioni colore!

#### 6.2 Promotions

**Form Promo:**
- Promotion type: "Discount on cart" (dropdown)
- Name, Description
- Discount %
- Min order amount (EUR)
- Stores filter (multi-select)
- Order type filter (dine-in/takeout)
- Custom discount period (scheduling)
- Image banner

⚠️ Mancano: Coupon codes, usage limits, customer targeting

#### 6.3 Surveys

**Question Builder:**
- Name, Welcome note
- Questions with types (Text box, etc.)
- Required toggle
- Live preview!
- Localize tab

**UX Score:** 8/10 - Builder con preview eccellente

#### 6.4 Customers (CRM)

**Columns:** Name | Email | Contact No | Created at

⚠️ **CRM estremamente basico:**
- No order history
- No lifetime value
- No segments
- No tags
- No export

---

### 7. Hot Actions (FEATURE UNICA!)

**Cos'e:** Pulsanti nel menu che il cliente puo premere per richiedere assistenza.

**4 Azioni Pre-configurate:**
| Azione | Messaggio |
|--------|-----------|
| Call someone | "Call someone to the table" |
| Call for notes change | "Call someone to change the notes" |
| Call to verify bill | "Call someone to verify the bill" |
| Call to clean table | "Call someone to clean the table" |

**Request Monitoring:**
- Filtri: Time, Store, Action type
- Status tracking
- Approval timestamps

**UX Score:** 9/10 - Feature innovativa, ben implementata

---

### 8. Reports

⚠️ **ATTENZIONE:** "Reports" NON e analytics! E uno scheduler per email automatiche.

**Scheduler Form:**
- Name
- Frequency (Daily/Weekly/Monthly)
- Report type (Customers Report, etc.)
- Recipients (multi-email)

**Tab non esplorati:** Newsletter Signups, Feedback

---

### 9. Accounting

**KPI Cards (5):**
| Metrica | Descrizione |
|---------|-------------|
| Total sales | Ricavi lordi |
| Total discounts | Sconti applicati |
| Total orders | Numero ordini |
| Total tax | Tasse raccolte |
| Total tip | Mance |

**Filtri:** Store + Date range
**Export:** Download disponibile

⚠️ Placeholder bug: "accounting-description" non tradotto

---

### 10. Integrations

**Payment Providers (5):**
| Provider | Status |
|----------|--------|
| Stripe | Connect |
| PayPal | Connect |
| Adyen | Connect |
| Cash | Toggle ON |
| Custom Payment | Toggle + Config |

**POS:**
- Solo Loyverse!
- ⚠️ Mancano: Square, Toast, Lightspeed, Clover

**Printers:** $20/mese addon

**White Label:** Premium only (locked)

---

### 11. Settings

**7 Tab:**

| Tab | Contenuto | Note |
|-----|-----------|------|
| Profile | Logo, Name, Email | User account |
| Restaurant | Logo, Cover, Name, Address | Business info |
| Notifications | Sound per type + preview | Eccellente! |
| Order Settings | Tips, Cancel, Invoice prefix | Basic |
| Developer | API tokens | Generate/Revoke |
| Billing | Plan, Payment, Gift cards, Invoices | Completo |
| Restaurant QR Code | 5 customization options | Live preview |

**Notifications Sound (Eccellente UX):**
```
| Type                          | Enable | Sound       | Preview |
|-------------------------------|--------|-------------|---------|
| Order notification sound      | 🟢 ON  | Default ▼   | ▶️ Play |
| Feedback notification sound   | 🟢 ON  | Sound 1 ▼   | ▶️ Play |
| Hot-action notification sound | 🟢 ON  | Sound 2 ▼   | ▶️ Play |
```

---

### 12. Navbar Features

**Language Switcher (8 lingue):**
- English, Espanol, Francais, Deutsch
- Italiano, Nederlands, Portugues, Arabic (RTL)

**Onboarding Checklist (4 step):**
1. Complete your restaurant details
2. Create your first menu
3. Create your first food
4. Customize your menu QR and create the first table

**Support Widget:**
- AI Answers (instant)
- Email (15 min response time)

**Feedback Widget:**
- NPS 5-point emoji scale (Hate ↔ Love)
- Always visible (orange tab)

**What's New Panel:**
- Changelog con date
- Links a guide/tutorial
- Searchable

---

## UX Patterns Documentati (Confermati)

### Navigazione
- Sidebar fissa sinistra (dark theme, ~200px)
- Collapsibile con hamburger menu
- Sottomenu espandibili (Stores, Marketing)
- Tab per sottosezioni
- Breadcrumb nelle form

### Forms
- Asterisco rosso per required
- Info tooltip (❓) per campi complessi
- Localize tab per traduzioni
- Save button top-right (teal)

### Feedback
- Toast notifications (bottom-right)
- Empty states con illustrazioni + CTA
- Loading skeletons nelle tabelle
- Badge per novita (New, Beta)

### Modali
- Overlay scuro
- Close con X
- Upsell modali non aggressivi

### Cards
- Card grid per menu/stores
- Kebab menu (⋮) per azioni
- Toggle on/off inline

---

## Pricing Analysis (Confermato)

### Pricing Verificato

| Piano | Prezzo | Fonte |
|-------|--------|-------|
| **Regular** | $17/mese | Screenshot Billing |
| **Trial** | 30 giorni | Onboarding |
| **Printers** | $20/mese | Screenshot Integrations |

### Confronto Mercato (Aggiornato)

| Competitor | Prezzo Entry | Note |
|------------|--------------|------|
| MenuTiger | $17/mese | Economico, KDS extra |
| **GudBro** | €50/mese | Menu + Loyalty integrato |
| Square | $60/mese | POS integrato |
| Toast | $69/mese | Enterprise focus |

**Posizionamento GudBro:** Premium value con Loyalty integrato (non disponibile in MenuTiger)

---

## Raccomandazioni per GudBro

### DA COPIARE (Priorita Alta)

1. **Hot Actions System** - Feature unica, alto valore percepito
   - Call waiter, Clean table, Verify bill
   - Request monitoring con filtri
   - Notifiche staff

2. **Opening Hours UI** - Toggle + time picker + multi-slot
   - 7 giorni configurabili
   - Pausa pranzo supportata
   - UX eccellente

3. **Onboarding Checklist** - 4 step con progress bar
   - Welcome modal con illustrazione
   - Progress tracking percentuale
   - Video tutorial integrato

4. **Notification Sounds** - Preview play per ogni tipo
   - Sound selection dropdown
   - Enable/disable per tipo
   - Test button

5. **Geofencing** - Radius-based location
   - Google Maps interattiva
   - Auto-detect location
   - Ordini in-store validation

6. **Survey Builder** - Live preview mentre crei
   - Question types multipli
   - Required toggle
   - Localize integrato

### DA EVITARE

1. **Temi fake** - 5 temi ma 4 sono solo colori diversi
2. **Reports misleading** - "Reports" che e solo scheduler
3. **CRM vuoto** - Solo lista, no valore aggiunto
4. **FAQ broken** - Page not found
5. **Printers a pagamento** - $20/mese addon frustrante
6. **POS limitato** - Solo Loyverse

### DIFFERENZIATORI GUDBRO (Opportunita)

| Area | MenuTiger | GudBro Opportunity |
|------|-----------|-------------------|
| **Loyalty** | ❌ Non esiste | ✅ Core feature! |
| **CRM** | Lista base | Segmenti, LTV, history |
| **Analytics** | Solo scheduler | AI insights, predictions |
| **Temi** | 5 (fake) | 15+ con layout diversi |
| **QR** | 5 opzioni | 19 tipi + AI Artistic |
| **POS** | Solo Loyverse | Square, Toast, Tilby, etc. |
| **Social** | 8 piattaforme | + Google Business, TikTok |
| **Printers** | $20/mese extra | Incluso |
| **KDS** | Premium trial | Incluso base |

### Feature Priority Matrix

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| Hot Actions | Medium | High | P1 |
| Onboarding Checklist | Low | High | P1 |
| Opening Hours UI | Low | Medium | P2 |
| Notification Sounds | Low | Medium | P2 |
| Geofencing | High | Medium | P3 |
| Survey Builder | Medium | Medium | P3 |
| Website Builder | High | Low | P4 |

---

## Gap Analysis: MenuTiger vs GudBro

### Dove MenuTiger e Migliore

| Feature | MenuTiger | GudBro Status |
|---------|-----------|---------------|
| Hot Actions | ✅ Completo | ❌ Da implementare |
| WiFi QR | ✅ 2-step wizard | ❌ Da implementare |
| Website Builder | ✅ 5 sezioni | ⚠️ Parziale |
| Geofencing | ✅ Con mappa | ❌ Da implementare |

### Dove GudBro e Migliore

| Feature | GudBro | MenuTiger Status |
|---------|--------|------------------|
| Loyalty Program | ✅ Core | ❌ Non esiste |
| QR Varieties | ✅ 19 tipi + AI | ⚠️ 5 opzioni base |
| Ingredient Database | ✅ 2548 items | ❌ Non esiste |
| Multi-vertical | ✅ F&B, Wellness, Rentals | ❌ Solo F&B |
| Nutrition Data | ✅ 100% coverage | ❌ Non esiste |

---

## Conclusioni

MenuTiger e un competitor solido per il segmento **entry-level** ($17/mese). I suoi punti di forza sono:

1. **Prezzo accessibile** - Entry barrier basso
2. **Hot Actions** - Feature unica e innovativa
3. **Onboarding** - Eccellente UX per nuovi utenti
4. **Internazionalizzazione** - 8 lingue backoffice

I suoi punti deboli significativi sono:

1. **No Loyalty** - Gap enorme che GudBro copre
2. **CRM inesistente** - Solo lista clienti
3. **Analytics fake** - Reports e solo scheduler
4. **Temi ingannevoli** - 5 temi ma solo 1 layout diverso
5. **Addon costosi** - Printers $20/mese, KDS premium

### Posizionamento GudBro

GudBro deve posizionarsi come **alternativa premium** con:

1. **Loyalty integrato** - Differenziatore principale
2. **QR artistici** - 19 tipi vs 5 base
3. **Database ingredienti** - 2548 items con nutrition
4. **Multi-vertical** - Non solo ristorazione
5. **Pricing trasparente** - €50/mese tutto incluso (no addon)

Il gap di prezzo (€50 vs $17) e giustificabile se il valore del **Loyalty Program** e chiaramente comunicato come feature che MenuTiger non ha.

---

## Appendice: Screenshot Reference

| # | Sezione | Screenshot | Note |
|---|---------|------------|------|
| 1 | Dashboard | 1 | KPI cards, grafici |
| 2-5 | Menus | 4 | Tabs, modifiers, archive |
| 6 | Orders | 1 | Filtri, tabella |
| 7 | Kitchen Display | 1 | Upsell modal |
| 8-17 | Stores | 10 | 7 tabs + taxations |
| 18-33 | Marketing | 16 | Website, promos, surveys, customers |
| 34-35 | Hot Actions | 2 | Create + requests |
| 36-37 | Reports | 2 | Scheduler |
| 38 | Accounting | 1 | KPI cards |
| 39 | FAQ | 1 | Broken page |
| 40-42 | Integrations | 3 | Payments, printers, POS |
| 43-49 | Settings | 7 | All tabs |
| 50-57 | Navbar | 8 | Previews, onboarding, support |

---

**File:** `docs/competitor-audits/MENUTIGER-AUDIT-REPORT-V2.md`
**Audit by:** Claude Browser (Opus 4.5) + Claude Code (Opus 4.5)
**Screenshots:** 57
**Version:** 2.0 Consolidato
**Date:** 2026-01-01
