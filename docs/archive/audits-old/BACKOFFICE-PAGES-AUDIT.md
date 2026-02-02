# Backoffice Pages Audit

> **Tipo:** Snapshot tecnico (NON mantenuto continuamente)
> **Data:** 2026-01-11
> **Pagine:** 52 | **LOC:** ~17,700 | **Copertura:** 100%
>
> **Quando rigenerare:** Su richiesta, per planning/refactoring, o audit periodico.
> **Come rigenerare:** `glob **/page.tsx` in `apps/backoffice` → leggi tutte → documenta.

---

## Sommario

| Categoria              | Pagine | LOC Totali  |
| ---------------------- | ------ | ----------- |
| Dashboard Core         | 6      | ~800        |
| Content Management     | 12     | ~5,100      |
| Marketing              | 4      | ~2,200      |
| Orders                 | 2      | ~1,050      |
| QR Codes               | 1      | ~500        |
| Food Costs             | 2      | ~840        |
| Settings               | 9      | ~2,420      |
| Customers              | 3      | ~600        |
| Team & Operations      | 3      | ~2,100      |
| Standalone Pages       | 6      | ~700        |
| Onboarding             | 1      | ~800        |
| Public Pages (QR/WiFi) | 5      | ~560        |
| **TOTALE**             | **52** | **~17,670** |

---

## 1. Dashboard Core

### 1.1 page.tsx (Root)

- **Path:** `/apps/backoffice/app/page.tsx`
- **Lines:** 7
- **Funzione:** Redirect automatico a `/dashboard`
- **Note:** Server component semplice

### 1.2 dashboard/page.tsx

- **Path:** `(dashboard)/dashboard/page.tsx`
- **Lines:** ~200
- **Funzione:** Main dashboard con overview
- **Features:**
  - Quick stats (ordini, revenue, clienti)
  - Grafici andamento
  - Azioni rapide
  - Notifiche recenti

### 1.3 analytics/page.tsx

- **Path:** `(dashboard)/analytics/page.tsx`
- **Lines:** ~200
- **Funzione:** Analytics centralizzata
- **Features:**
  - QR scan analytics
  - Order analytics
  - Customer analytics
  - Revenue tracking

### 1.4 billing/page.tsx

- **Path:** `(dashboard)/billing/page.tsx`
- **Lines:** ~150
- **Funzione:** Gestione abbonamento e fatturazione
- **Features:**
  - Piano attuale
  - Storico fatture
  - Metodi di pagamento

### 1.5 account/page.tsx

- **Path:** `(dashboard)/account/page.tsx`
- **Lines:** ~150
- **Funzione:** Gestione account utente
- **Features:**
  - Profilo personale
  - Sicurezza account
  - Preferenze

### 1.6 ai/page.tsx

- **Path:** `(dashboard)/ai/page.tsx`
- **Lines:** ~100
- **Funzione:** AI Co-Manager interface
- **Features:**
  - Chat con AI
  - Daily briefings
  - AI suggestions

---

## 2. Content Management

### 2.1 content/page.tsx

- **Path:** `(dashboard)/content/page.tsx`
- **Lines:** 161
- **Funzione:** Hub centrale per tutti i contenuti
- **Features:**
  - Grid di card con link a sottosezioni
  - Search globale
  - Quick stats (total items, published, drafts)
- **Sottosezioni linkate:**
  - Menu & Products
  - Wines
  - Recipes
  - Ingredients
  - Categories
  - Services
  - WiFi Settings
  - Local Attractions
  - Contacts

### 2.2 content/menu/page.tsx

- **Path:** `(dashboard)/content/menu/page.tsx`
- **Lines:** 720
- **Funzione:** Lista prodotti del menu
- **Features:**
  - Grid/list view toggle
  - Filtri per categoria
  - Search
  - Quick edit disponibilita
  - Link a editor completo

### 2.3 content/menu/[slug]/page.tsx

- **Path:** `(dashboard)/content/menu/[slug]/page.tsx`
- **Lines:** 1,700
- **Funzione:** Editor completo prodotto
- **Features:**
  - 6 tabs: Basic Info, Ingredients, Safety & Dietary, Customizations, Availability, SEO & Tags
  - **Basic Info:** Nome multilingua (en/vi/it), descrizione, categoria, prezzo, immagine
  - **Ingredients:** Aggiungi/rimuovi ingredienti, quantita in grammi, toggle optional/required, auto-compute allergens
  - **Safety & Dietary:**
    - 30 allergens (EU 14 + Korea 7 + Japan 7 + GUDBRO 2) con filtro per regione
    - 10 intolleranze
    - 12 dietary flags (vegan, vegetarian, halal, kosher, etc.)
    - 6 livelli spice (Scoville scale)
    - Nutrizione (kcal, protein, carbs, fat)
  - **Customizations:** Gruppi opzioni (radio/checkbox/quantity), price modifiers
  - **Availability:** Active, Available, Featured, New, time-based, inventory tracking
  - **SEO:** Slug, tags, display order
- **Pattern notevoli:**
  - Computed safety data from ingredients
  - Realtime Supabase fetch
  - Auto-save con debounce

### 2.4 content/wines/page.tsx

- **Path:** `(dashboard)/content/wines/page.tsx`
- **Lines:** ~300
- **Funzione:** Catalogo vini
- **Features:**
  - Regioni, varietals, pairings
  - Annata, produttore
  - Prezzo bottiglia/bicchiere

### 2.5 content/recipes/page.tsx

- **Path:** `(dashboard)/content/recipes/page.tsx`
- **Lines:** ~250
- **Funzione:** Lista ricette (barista recipes)
- **Features:**
  - Filtro categoria (espresso, milk-based, cold, etc.)
  - Difficolta, tempo
  - Link a dettaglio

### 2.6 content/recipes/[slug]/page.tsx

- **Path:** `(dashboard)/content/recipes/[slug]/page.tsx`
- **Lines:** 392
- **Funzione:** Dettaglio ricetta
- **Features:**
  - 3 tabs: Method, Ingredients, Tips
  - Quick info cards (category, difficulty, time, serving size, ratio, origin)
  - **Method:** Steps ordinati con durata e tips
  - **Ingredients:** Lista con quantita e note
  - **Tips:** Barista tips, variations, latte art recommendations
  - Sidebar: Equipment, Parameters, Nutrition, Ratio explanation

### 2.7 content/ingredients/page.tsx

- **Path:** `(dashboard)/content/ingredients/page.tsx`
- **Lines:** ~250
- **Funzione:** Master ingredient database
- **Features:**
  - 2548 ingredienti
  - Allergens, intolerances, dietary flags
  - Nutrition per 100g

### 2.8 content/categories/page.tsx

- **Path:** `(dashboard)/content/categories/page.tsx`
- **Lines:** ~200
- **Funzione:** Gestione categorie menu
- **Features:**
  - Icon, nome multilingua
  - Display order
  - Parent/child nesting

### 2.9 content/modifiers/page.tsx

- **Path:** `(dashboard)/content/modifiers/page.tsx`
- **Lines:** ~200
- **Funzione:** Modificatori condivisi
- **Features:**
  - Gruppi modificatori
  - Opzioni con price modifiers
  - Assegnazione a prodotti

### 2.10 content/contributions/page.tsx

- **Path:** `(dashboard)/content/contributions/page.tsx`
- **Lines:** ~150
- **Funzione:** Contributi community
- **Features:**
  - Review contributi
  - Approvazione/rifiuto

### 2.11 content/menu-builder/page.tsx

- **Path:** `(dashboard)/content/menu-builder/page.tsx`
- **Lines:** 597
- **Funzione:** Recipe library browser per aggiungere ricette al menu
- **Features:**
  - **Category Filter:** All, Hot Coffee, Iced Coffee, Tea, Smoothies, Breakfast, Sandwiches
  - **Dietary Filters:** Vegan, Vegetarian, Gluten-Free, Dairy-Free, Keto, Halal
  - **Search:** Nome, ingrediente, tag
  - **Recipe Cards:**
    - Nome multilingua (en/vi/ko)
    - Prezzo suggerito (VND)
    - Food cost %
    - Prep time, difficulty
    - Allergens e dietary tags
    - Nutrition (calories, protein, carbs, fat)
    - Bestseller badge
  - **Detail Sidebar:**
    - Ingredienti con quantità
    - Nutrition breakdown
    - "Add to Menu" / "Customize Recipe" buttons
  - **Bulk Add:** Contatore items nel menu, "Save Menu" button
- **Pattern notevoli:**
  - Sample data from GUDBRO recipe library (egg coffee, matcha, smoothie bowls, etc.)
  - VND currency formatting

---

## 3. Marketing

### 3.1 marketing/promotions/page.tsx

- **Path:** `(dashboard)/marketing/promotions/page.tsx`
- **Lines:** 1,016
- **Funzione:** Sistema promozioni con QR marketing
- **Features:**
  - **2-Step QR Strategy:**
    1. External QR (consapevolezza) - su materiale marketing esterno
    2. Internal QR (conversione) - sul tavolo per ordering
  - Tipi promozione: discount %, fixed amount, free item, bundle
  - Condizioni: min order, specific items, day/time
  - Analytics per promozione
  - QR code generator per ogni promo

### 3.2 marketing/loyalty/page.tsx

- **Path:** `(dashboard)/marketing/loyalty/page.tsx`
- **Lines:** 595
- **Funzione:** Programma fedelta completo
- **Features:**
  - **Tier System:** Bronze, Silver, Gold, Platinum con soglie e benefici
  - **Points Actions:**
    - Standard: purchase, referral, review, birthday
    - Social: share, check-in, photo upload
    - Engagement: survey, newsletter, app download
  - **Rewards:** Free items, discounts, exclusive access
  - **Social Sharing:** Integrazione social per bonus punti
  - Stats e analytics per tier

### 3.3 marketing/events/page.tsx

- **Path:** `(dashboard)/marketing/events/page.tsx`
- **Lines:** ~300
- **Funzione:** Gestione eventi
- **Features:**
  - Calendario eventi
  - Tipi: live music, tasting, workshop
  - Registrazioni, capacita
  - Promozioni legate ad eventi

### 3.4 marketing/challenges/page.tsx

- **Path:** `(dashboard)/marketing/challenges/page.tsx`
- **Lines:** ~300
- **Funzione:** Gamification challenges
- **Features:**
  - Challenge types: visit, spend, refer
  - Progress tracking
  - Rewards on completion

---

## 4. Orders

### 4.1 orders/page.tsx

- **Path:** `(dashboard)/orders/page.tsx`
- **Lines:** 654
- **Funzione:** Order management con realtime updates
- **Features:**
  - **Realtime Supabase Subscription:** Orders si aggiornano live
  - **Status Workflow:** pending -> confirmed -> preparing -> ready -> delivered
  - Filtri per stato, data, source
  - Order details modal
  - Print receipt
  - Bulk actions
- **Pattern notevoli:**
  - `supabase.channel('orders').on('postgres_changes'...)`
  - Sound notifications per nuovi ordini

### 4.2 orders/kitchen/page.tsx

- **Path:** `(dashboard)/orders/kitchen/page.tsx`
- **Lines:** 399
- **Funzione:** Kitchen Display System (KDS)
- **Features:**
  - Board kanban-style (Pending, Preparing, Ready)
  - Timer per ogni ordine
  - One-tap status change
  - Item checklist per ordine
  - Sound alerts
  - Full-screen mode per monitor cucina
- **Pattern notevoli:**
  - Realtime updates
  - Ottimizzato per touch screen

---

## 5. QR Codes

### 5.1 qr-codes/page.tsx

- **Path:** `(dashboard)/qr-codes/page.tsx`
- **Lines:** 501
- **Funzione:** Gestione QR codes
- **Features:**
  - **Quick Create:** Modal per creare QR velocemente
  - **Types:** Table, Takeaway, Delivery, Promo, Event
  - Filtri: type, status, date range
  - Batch operations
  - Download QR (PNG, SVG, PDF)
  - Analytics per QR (scans, conversions)
  - Link a pagina Analytics per dettagli

---

## 6. Food Costs

### 6.1 food-costs/page.tsx

- **Path:** `(dashboard)/food-costs/page.tsx`
- **Lines:** 408
- **Funzione:** Overview food costs e profit margins
- **Features:**
  - **Stats Cards:** Menu items total, Average margin, Low margin (<60%), Critical (<50%)
  - **Critical Margin Alert:** Banner quando ci sono items sotto 50%
  - **Quick Actions:** Link a Ingredient Costs, Recipes, Menu Items
  - **Filters:** Search, Category select, Sort (margin/cost asc/desc), "Missing Recipe" toggle
  - **Table View:**
    - Item name/slug
    - Category
    - Price, Food Cost, Profit
    - Margin % con color-coding (green/amber/red)
    - Status label (Excellent/Good/Warning/Critical/No recipe)
  - **Legend Footer:** Spiegazione thresholds
- **Pattern notevoli:**
  - Margin thresholds: Excellent (>70%), Good (60-70%), Warning (50-60%), Critical (<50%)
  - VND currency formatting

### 6.2 food-costs/ingredients/page.tsx

- **Path:** `(dashboard)/food-costs/ingredients/page.tsx`
- **Lines:** 430
- **Funzione:** Gestione costi ingredienti
- **Features:**
  - **Stats:** Total ingredients, With cost data, Missing cost
  - **Filters:** Search, "Show Missing Only" toggle
  - **Table View:**
    - Ingredient name/slug
    - Cost per unit (currency + amount + unit)
    - Supplier name + SKU
    - Last updated date
    - Edit button
  - **Inline Edit Mode:**
    - Currency selector (VND, USD, EUR, KRW, THB)
    - Cost amount input
    - Unit selector (kg, g, lb, oz, L, ml, piece, dozen, pack)
    - Supplier name + SKU inputs
  - **Help Section:** Spiegazione funzionamento
- **Pattern notevoli:**
  - Breadcrumb navigation
  - Inline editing con cancel/save
  - Auto-update cost_updated_at

---

## 7. Settings

### 7.1 settings/page.tsx

- **Path:** `(dashboard)/settings/page.tsx`
- **Lines:** 339
- **Funzione:** Impostazioni generali
- **Sezioni:**
  - **Business Profile:** Logo, nome, tipo, descrizione
  - **Regional Settings:** Timezone, currency, default language
  - **Branding:** Primary color, theme (light/dark/auto)
  - **Notifications:** Email preferences (weekly summary, milestones, tips)
  - **Notification Sounds:** Enable/disable, volume, per-type toggle (success, error, warning, info), test buttons
  - **Danger Zone:** Delete all QR codes, Delete account

### 7.2 settings/payments/page.tsx

- **Path:** `(dashboard)/settings/payments/page.tsx`
- **Lines:** 654
- **Funzione:** Configurazione pagamenti
- **Features:**
  - **2 Tabs:** Fiat | Crypto
  - **Fiat:**
    - Stripe (con account ID)
    - PayPal (con client ID)
    - Mobile: Apple Pay, Google Pay, Samsung Pay
  - **Crypto:**
    - Master toggle
    - Supported: BTC, ETH, USDC, USDT
    - Per-wallet address input con validazione
    - Network selector per stablecoins (Ethereum, Polygon, Arbitrum)
    - Display options: show in menu, BTC format (BTC/mBTC/uBTC)
    - Payment timeout setting
    - "Request a Crypto" button per nuove currency
- **Pattern notevoli:**
  - API route per persist settings
  - Address validation regex per ogni crypto
  - Explorer link per verifica

### 7.3 settings/calendar/page.tsx

- **Path:** `(dashboard)/settings/calendar/page.tsx`
- **Lines:** ~150
- **Funzione:** Configurazione calendario
- **Features:**
  - Giorni di chiusura
  - Festivita locali
  - Orari speciali

### 7.4 settings/auth/page.tsx

- **Path:** `(dashboard)/settings/auth/page.tsx`
- **Lines:** ~150
- **Funzione:** Impostazioni autenticazione
- **Features:**
  - Two-factor authentication
  - Session management
  - Login history

### 7.5 settings/languages/page.tsx

- **Path:** `(dashboard)/settings/languages/page.tsx`
- **Lines:** ~200
- **Funzione:** Lingue supportate
- **Features:**
  - Enable/disable lingue
  - Default language
  - Auto-detect preferences

### 7.6 settings/social/page.tsx

- **Path:** `(dashboard)/settings/social/page.tsx`
- **Lines:** 622
- **Funzione:** Social media e delivery platform links
- **Features:**
  - **Global Social Media:** Facebook, Instagram, TikTok, X (Twitter), YouTube, LinkedIn
  - **Asian Platforms:**
    - Zalo OA (Vietnam)
    - LINE (Japan, Thailand, Taiwan)
    - KakaoTalk (Korea)
    - WeChat (China)
    - Xiaohongshu/RED (China)
  - **Review Platforms:** Google Business, TripAdvisor, Dianping, Yelp
  - **Delivery Platforms:**
    - GrabFood, ShopeeFood, GoFood (SEA)
    - Baemin (Vietnam, Korea)
    - Foodpanda, Deliveroo (Asia/Europe)
    - UberEats (Global)
  - **Custom Links:** Nome + URL con add/remove
  - **Request Platform:** Email link per richiedere nuove piattaforme
  - **Stats:** Contatore piattaforme connesse
- **Pattern notevoli:**
  - Handle types (url, handle con @, id)
  - Region indicators per ogni piattaforma
  - Green highlight per campi compilati

### 7.7 settings/hours/page.tsx

- **Path:** `(dashboard)/settings/hours/page.tsx`
- **Lines:** ~250
- **Funzione:** Orari di apertura
- **Features:**
  - Per-day schedule
  - Multiple time slots
  - Special hours
  - Holiday closures

### 7.8 settings/currency/page.tsx

- **Path:** `(dashboard)/settings/currency/page.tsx`
- **Lines:** ~150
- **Funzione:** Configurazione valuta
- **Features:**
  - Primary currency
  - Exchange rates
  - Multi-currency display

---

## 8. Customers

### 8.1 customers/page.tsx

- **Path:** `(dashboard)/customers/page.tsx`
- **Lines:** ~200
- **Funzione:** Customer management
- **Features:**
  - Customer list
  - Segmentation
  - Order history
  - Loyalty status

### 8.2 customers/followers/page.tsx

- **Path:** `(dashboard)/customers/followers/page.tsx`
- **Lines:** ~200
- **Funzione:** Social followers
- **Features:**
  - Platform breakdown
  - Growth trends
  - Engagement metrics

### 8.3 customers/feedback/page.tsx

- **Path:** `(dashboard)/customers/feedback/page.tsx`
- **Lines:** ~200
- **Funzione:** Customer feedback
- **Features:**
  - Reviews list
  - Sentiment analysis
  - Response management

---

## 9. Team & Operations

### 9.1 team/page.tsx

- **Path:** `(dashboard)/team/page.tsx`
- **Lines:** 1,060
- **Funzione:** Team management completo
- **Features:**
  - **3 Tabs:** Team | Performance | Settings
  - **Team Tab:**
    - Staff cards con foto, nome, job title
    - Rating medio, total reviews, positive rate
    - Specialties tags
    - Status (active, on_leave, terminated)
  - **Performance Tab:**
    - Weekly report con periodo
    - Stats: Total Reviews, Rating Medio, Positive Rate
    - Top Performers: By Rating, By Reviews, Most Improved
    - Top Categories votate (friendly, fast, helpful, etc.)
    - Alerts (warning, success, info)
    - AI Suggestion
    - Actions: Generate Report, Auto Award
  - **Settings Tab:**
    - Team Visibility: Show on menu, display style (cards/list/minimal)
    - Review Settings: Allow reviews, require order, allow anonymous
    - Recognition: Weekly recognition, reward type (badge, bonus, time_off, meal)
    - Loyalty Points info panel
- **Pattern notevoli:**
  - API route `/api/staff` per tutte le operazioni
  - Dialog component per tooltips
  - EmptyState component

### 9.2 translations/page.tsx

- **Path:** `(dashboard)/translations/page.tsx`
- **Lines:** 969
- **Funzione:** Translation management
- **Features:**
  - **Stats:** Total items, Menu Items, Categories, Translated, Pending
  - **Language Selector:** 12 lingue comuni con flag e RTL indicator
  - **Filters:** Search, type filter (all/menu_item/category)
  - **Table View:**
    - Inline editing per nome e descrizione
    - Status indicator (✓ translated, ! pending)
    - RTL support per Arabic, Hebrew
  - **Import/Export:**
    - Export CSV con format specificato
    - Import CSV con validazione e error reporting
    - Upsert logic (update o insert)
- **Pattern notevoli:**
  - CSV parsing custom con quote handling
  - BOM per Excel UTF-8 compatibility
  - Uses new translation tables (menu_item_translations, category_translations)

### 9.3 hot-actions/page.tsx

- **Path:** `(dashboard)/hot-actions/page.tsx`
- **Lines:** ~100
- **Funzione:** Quick actions panel
- **Features:**
  - Toggle availability items
  - Send promo notification
  - Generate daily report

---

## 10. Standalone Pages

### 10.1 login/page.tsx

- **Path:** `/apps/backoffice/app/login/page.tsx`
- **Lines:** 450
- **Funzione:** Authentication page
- **Features:**
  - **Modes:** Login, Signup, Forgot Password
  - **Methods:**
    - Email/Password
    - Google OAuth
    - Dev accounts (development only, PIN protected)
  - Dev mode con PIN gate
  - Role-based dev accounts: gudbro_owner, business_owner, manager, staff
- **Pattern notevoli:**
  - Suspense boundary per useSearchParams
  - Cookie + localStorage per dev session
  - isDevModeEnabled() check

### 10.2 products/page.tsx

- **Path:** `/apps/backoffice/app/products/page.tsx`
- **Lines:** 11
- **Funzione:** Local products (server component)
- **Note:** Delega a ProductsClient component

### 10.3 catalog/page.tsx

- **Path:** `/apps/backoffice/app/catalog/page.tsx`
- **Lines:** 20
- **Funzione:** Global catalog (server component)
- **Note:** Mostra prodotti centralizzati per tutti i venues

### 10.4 menu-import/page.tsx

- **Path:** `/apps/backoffice/app/menu-import/page.tsx`
- **Lines:** 211
- **Funzione:** AI-powered menu import
- **Features:**
  - Upload foto o PDF del menu
  - AI extraction simulata (mock)
  - 3-step workflow: Upload -> Processing -> Review
  - Editable table per review items
  - Tips panel

### 10.5 menu/page.tsx

- **Path:** `/apps/backoffice/app/menu/page.tsx`
- **Lines:** 11
- **Funzione:** Placeholder
- **Note:** "Coming Soon" message

### 10.6 platform/page.tsx

- **Path:** `(dashboard)/platform/page.tsx`
- **Lines:** ~100
- **Funzione:** Platform-level settings
- **Note:** Per gudbro_owner role

---

## 11. Onboarding

### 11.1 onboarding/page.tsx

- **Path:** `(onboarding)/onboarding/page.tsx`
- **Lines:** 796
- **Funzione:** Wizard 5-step per nuovi merchant
- **Features:**
  - **Step 1 - Account Type:**
    - Standard (free, up to 10 locations, self-service)
    - Enterprise (unlimited, multi-country, dedicated support → redirect to contact form)
  - **Step 2 - Organization:**
    - Nome organizzazione
    - Country selector (auto-popola currency, timezone, primary language)
  - **Step 3 - Brand:**
    - Business type: F&B, Hotel, Rental Property, Wellness/Spa, Other
    - Brand name, descrizione
    - Primary/Secondary color picker
  - **Step 4 - Location:**
    - Location name, city, postal code, address
    - Phone, email
    - Language multi-select (con primary obbligatoria)
  - **Step 5 - Review:**
    - Summary di Organization, Brand, Location
    - "Create Account" button
- **Pattern notevoli:**
  - Progress stepper con checkmark per step completati
  - API calls sequenziali: /api/organizations → /api/brands → /api/locations
  - Enterprise redirect a pagina contatti
  - Skip option

---

## 12. Public Pages (QR/WiFi)

Queste pagine sono pubbliche (no auth) e gestiscono stati speciali dei QR codes.

### 12.1 qr-expired/page.tsx

- **Path:** `(public)/qr-expired/page.tsx`
- **Lines:** 108
- **Funzione:** QR code scaduto
- **Features:**
  - Query params: merchant, menu, phone
  - CTAs: "See Current Offers", "View Full Menu", "Call for Updated Code", "Find on Google Maps"
  - Info box: "Looking for a deal?" con hint su nuove promo
- **Pattern:** Suspense boundary per useSearchParams

### 12.2 qr-inactive/page.tsx

- **Path:** `(public)/qr-inactive/page.tsx`
- **Lines:** 107
- **Funzione:** QR code temporaneamente disattivato
- **Features:**
  - Query params: merchant, menu, phone
  - CTAs: "View Menu", Call + WhatsApp buttons, "Find on Google Maps"
  - Info box: "Why is this inactive?" spiegazione
- **Pattern:** WhatsApp link generato da phone number

### 12.3 qr-limit-reached/page.tsx

- **Path:** `(public)/qr-limit-reached/page.tsx`
- **Lines:** 109
- **Funzione:** QR ha raggiunto limite scansioni
- **Features:**
  - Query params: merchant, menu, phone
  - CTAs: "View Menu", "See Current Offers", Contact, Google Maps
  - Info box: "Why is there a limit?" spiegazione fairness

### 12.4 qr-not-found/page.tsx

- **Path:** `(public)/qr-not-found/page.tsx`
- **Lines:** 91
- **Funzione:** QR non esistente o rimosso
- **Features:**
  - Query params: merchant, menu
  - CTAs: "View Menu", "Find on Google Maps", "Scan Another QR Code"
  - Help section: possibili cause (deleted, typo, changed)

### 12.5 wifi-info/page.tsx

- **Path:** `(public)/wifi-info/page.tsx`
- **Lines:** 151
- **Funzione:** Istruzioni connessione WiFi
- **Features:**
  - Query params: ssid, merchant, menu
  - SSID display con "Copy" button (clipboard API + fallback)
  - Istruzioni: Camera app → QR → tap notification
  - Troubleshooting section collapsible: manual connection steps
  - CTA: "Browse Menu While You Wait"
- **Pattern notevoli:**
  - navigator.clipboard con fallback execCommand
  - Suspense boundary

---

## Pattern Comuni Identificati

### State Management

- `useState` per local state
- `useEffect` per data fetching
- Supabase client per database

### Realtime

- `supabase.channel().on('postgres_changes')` per realtime updates
- Used in: orders/page.tsx, orders/kitchen/page.tsx

### UI Patterns

- Tabs per navigazione sezioni
- Cards per display info
- Tables per liste con inline editing
- Modals per create/edit
- Toast notifications

### Data Fetching

- Server components dove possibile
- Client components con 'use client' per interattivita
- API routes per operazioni complesse

### Multi-language

- `MultiLangText` type: `{ en: string; vi: string; it: string; ko?: string; ja?: string }`
- Translation tables separate
- Flag mapping per UI

### Safety Data

- 30 allergens (EU + Korea + Japan + GUDBRO)
- 10 intollerances
- 12 dietary flags
- Computed from ingredients o manual entry

---

## Raccomandazioni

1. ~~**Onboarding Flow:** Creare pagina onboarding dedicata per nuovi merchant~~ ✅ ESISTE
2. ~~**Error Pages:** Aggiungere pagine QR error nel backoffice~~ ✅ ESISTONO (5 pagine in (public))
3. **Documentation:** Aggiungere JSDoc ai componenti principali
4. **Tests:** Aggiungere test per pagine critiche (orders, payments)
5. **Performance:** Consider lazy loading per pagine pesanti (menu/[slug], team)
6. **API Routes:** Mappare anche le API routes (non incluse in questo audit)

---

## Note di Verifica

La verifica è stata fatta tramite `glob **/page.tsx` nella directory backoffice.

- **Route groups identificati:**
  - `(dashboard)` - Pagine protette da auth
  - `(onboarding)` - Flow onboarding
  - `(public)` - Pagine pubbliche (QR error states, WiFi info)

---

_Audit completato e verificato il 2026-01-11_
