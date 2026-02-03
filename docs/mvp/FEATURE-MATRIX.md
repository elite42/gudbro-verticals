# GUDBRO Coffeeshop MVP — Feature Matrix

> **Versione:** 1.0
> **Data:** 2026-02-03
> **Legenda:**
>
> - ✅ = Incluso MVP
> - 🟡 = Phase 2 (post-lancio)
> - ❌ = Escluso (altri verticali)
> - 🔒 = Solo piano Pro/Business

---

## 1. CUSTOMER PWA (Menu Digitale)

### 1.1 Menu & Catalogo

| Feature                        | Status | Note                           |
| ------------------------------ | ------ | ------------------------------ |
| QR code scan → menu istantaneo | ✅     | Core feature                   |
| Categorie prodotti             | ✅     | Caffè, Bevande, Food, Dolci    |
| Foto prodotti                  | ✅     | Upload da backoffice           |
| Descrizioni prodotti           | ✅     | Con ingredienti                |
| Prezzi multi-currency          | ✅     | Auto-detect da browser         |
| Traduzione AI automatica       | ✅     | 16+ lingue                     |
| Filtri allergie (30+)          | ✅     | Gluten, nuts, dairy, etc.      |
| Filtri diete (11)              | ✅     | Vegan, vegetarian, halal, etc. |
| Customizations/modifiche       | ✅     | Latte type, size, extras       |
| Prodotto sold-out              | ✅     | Real-time sync                 |
| Ricerca prodotti               | ✅     | Search bar                     |
| Prodotti suggeriti             | 🟡     | AI-based recommendations       |
| Menu stagionale                | 🟡     | Scheduling automatico          |

### 1.2 Ordini Cliente

| Feature                | Status | Note                             |
| ---------------------- | ------ | -------------------------------- |
| Carrello prodotti      | ✅     | Add/remove/edit                  |
| Note per cucina        | ✅     | "Senza ghiaccio", etc.           |
| Ordine da tavolo       | ✅     | Associato a numero tavolo        |
| Ordine take-away       | ✅     | Pickup al banco                  |
| Tracking stato ordine  | ✅     | Ricevuto → Preparazione → Pronto |
| Notifica ordine pronto | ✅     | Push notification                |
| Storico ordini         | ✅     | Nel profilo cliente              |
| Riordina preferiti     | 🟡     | One-tap reorder                  |
| Ordine di gruppo       | 🟡     | Split orders tra amici           |
| Preordine programmato  | 🟡     | "Ritiro alle 8:30"               |

### 1.3 Pagamenti

| Feature                | Status | Note                      |
| ---------------------- | ------ | ------------------------- |
| Pagamento al banco     | ✅     | Cash/card tradizionale    |
| Stripe checkout        | ✅     | Card online               |
| Multi-currency display | ✅     | VND, USD, EUR, etc.       |
| Crypto payments        | ✅ 🔒  | BTC, ETH, USDC — Pro+     |
| Split bill             | 🟡     | Divide tra amici          |
| Mance digitali         | ✅     | Tips per staff            |
| Gift card redemption   | ✅     | Usa gift card al checkout |
| Apple Pay / Google Pay | 🟡     | Mobile wallets            |

### 1.4 Account Cliente

| Feature                    | Status | Note                     |
| -------------------------- | ------ | ------------------------ |
| Registrazione email/social | ✅     | Google, Facebook         |
| Profilo con preferenze     | ✅     | Allergie salvate         |
| Storico ordini             | ✅     | Ultimi 50 ordini         |
| Punti loyalty visibili     | ✅     | Saldo + storico          |
| Rewards disponibili        | ✅     | Lista premi riscattabili |
| Gift cards possedute       | ✅     | Saldo cards              |
| Preferiti salvati          | 🟡     | Prodotti preferiti       |
| Passkey login              | 🟡     | Biometric auth           |

---

## 2. BACKOFFICE DASHBOARD

### 2.1 Dashboard Home

| Feature                    | Status | Note                     |
| -------------------------- | ------ | ------------------------ |
| KPI oggi (revenue, ordini) | ✅     | Real-time                |
| Grafico vendite settimana  | ✅     | Trend line               |
| Top 5 prodotti             | ✅     | Best sellers             |
| Ordini in attesa           | ✅     | Quick view               |
| Alert AI                   | ✅     | Suggerimenti giornalieri |
| Weather widget             | 🟡     | Impatto meteo su vendite |
| Comparazione periodo       | 🟡     | vs settimana scorsa      |

### 2.2 Gestione Menu (Content)

| Feature                     | Status | Note                    |
| --------------------------- | ------ | ----------------------- |
| Lista prodotti              | ✅     | CRUD completo           |
| Categorie                   | ✅     | Create/edit/delete      |
| Upload foto                 | ✅     | Drag & drop             |
| Descrizioni multi-lingua    | ✅     | Edit per lingua         |
| Prezzi                      | ✅     | Base + varianti         |
| Ingredienti associati       | ✅     | Per food cost           |
| Allergie/diete              | ✅     | Checkbox                |
| Disponibilità (on/off)      | ✅     | Toggle                  |
| Ordinamento drag & drop     | ✅     | Sort categorie/prodotti |
| Modifiers/customizations    | ✅     | Gruppi modifiche        |
| Import menu da CSV          | 🟡     | Bulk import             |
| Import menu da foto (AI)    | 🟡     | OCR + AI parsing        |
| Scheduling disponibilità    | 🟡     | "Solo weekend"          |
| Ricette (prep instructions) | 🟡     | Per staff               |

### 2.3 Gestione Ordini

| Feature                | Status | Note                    |
| ---------------------- | ------ | ----------------------- |
| Lista ordini real-time | ✅     | Auto-refresh            |
| Filtro per stato       | ✅     | Pending/preparing/ready |
| Filtro per data        | ✅     | Date picker             |
| Dettaglio ordine       | ✅     | Prodotti, note, cliente |
| Cambia stato ordine    | ✅     | Manual override         |
| Cancella ordine        | ✅     | Con motivo              |
| Rimborso               | 🟡     | Partial/full refund     |
| Stampa comanda         | 🟡     | Printer integration     |
| Export ordini CSV      | ✅     | Per contabilità         |

### 2.4 Kitchen Display System (KDS)

| Feature                  | Status | Note               |
| ------------------------ | ------ | ------------------ |
| Vista ordini in coda     | ✅     | Priorità FIFO      |
| Separazione Bar / Cucina | ✅     | Due viste          |
| Tap "In preparazione"    | ✅     | Status update      |
| Tap "Pronto"             | ✅     | Notifica cliente   |
| Timer per ordine         | ✅     | Tempo trascorso    |
| Alert ritardo            | ✅     | > X minuti = rosso |
| Storico giornata         | ✅     | Ordini completati  |
| Fullscreen mode          | ✅     | Per tablet/TV      |
| Suono nuovo ordine       | ✅     | Audio alert        |
| Bump bar support         | 🟡     | Hardware buttons   |

### 2.5 Food Cost Intelligence

| Feature                        | Status | Note               |
| ------------------------------ | ------ | ------------------ |
| Database ingredienti (2,548)   | ✅     | Pre-caricato       |
| Associa ingredienti a prodotti | ✅     | Drag & drop        |
| Costo ingrediente              | ✅     | Prezzo unitario    |
| Calcolo food cost %            | ✅     | Automatico         |
| Dashboard margini              | ✅     | Verde/giallo/rosso |
| Alert sotto-margine            | ✅     | Notifica           |
| Suggerimenti prezzo AI         | ✅ 🔒  | Pro+               |
| Storico costi                  | 🟡     | Trend ingredienti  |
| Comparazione fornitori         | 🟡     | Best price         |
| Import prezzi fornitore        | 🟡     | CSV/API            |
| Ricette con grammature         | 🟡     | Porzioni esatte    |

### 2.6 Sistema Loyalty

| Feature                          | Status | Note                        |
| -------------------------------- | ------ | --------------------------- |
| Configurazione punti (€ → punti) | ✅     | Es. 1€ = 10 punti           |
| Livelli cliente                  | ✅     | Bronze/Silver/Gold/Platinum |
| Soglie livelli                   | ✅     | Configurabili               |
| Rewards catalog                  | ✅     | Premi riscattabili          |
| Crea reward                      | ✅     | Sconto %, prodotto gratis   |
| Punti per reward                 | ✅     | Quanti punti costa          |
| Gift cards                       | ✅     | Crea/gestisci               |
| Vendi gift card                  | ✅     | Al checkout                 |
| Referral program                 | ✅ 🔒  | Invita amico — Pro+         |
| Report loyalty                   | ✅     | Iscritti, redemption        |
| Email automatiche loyalty        | 🟡     | "Hai X punti!"              |
| Birthday rewards                 | 🟡     | Sconto compleanno           |

### 2.7 Marketing & Promozioni

| Feature                  | Status | Note                     |
| ------------------------ | ------ | ------------------------ |
| Promo codes              | ✅     | % o valore fisso         |
| Validità temporale       | ✅     | Data inizio/fine         |
| Limite utilizzi          | ✅     | Max X volte              |
| Prodotti inclusi/esclusi | ✅     | Filtro promo             |
| Happy hour               | ✅     | Orari + sconto           |
| Bundle deals             | ✅     | Caffè + croissant        |
| Eventi speciali          | ✅     | Live music, tasting      |
| Push notification        | ✅ 🔒  | A clienti loyalty — Pro+ |
| Countdown promozione     | 🟡     | Timer visivo             |
| A/B test promozioni      | 🟡     | Compare performance      |
| Email marketing          | 🟡     | Newsletter               |
| SMS marketing            | 🟡     | Bulk SMS                 |
| Social media post        | 🟡     | Auto-post                |
| Food challenges          | 🟡     | Viral engagement         |

### 2.8 Analytics

| Feature                     | Status | Note               |
| --------------------------- | ------ | ------------------ |
| Revenue giornaliero         | ✅     | Grafico            |
| Revenue settimanale/mensile | ✅     | Trend              |
| Ordini per periodo          | ✅     | Count + avg value  |
| Prodotti top seller         | ✅     | Ranking            |
| Prodotti flop               | ✅     | Meno venduti       |
| Ore di punta                | ✅     | Heatmap            |
| Clienti nuovi vs returning  | ✅     | Pie chart          |
| Scansioni QR                | ✅     | Per tavolo/giorno  |
| AOV (Average Order Value)   | ✅     | Trend              |
| Conversion rate             | ✅     | Scan → ordine      |
| Export CSV                  | ✅     | Tutti i dati       |
| Prep time analytics         | ✅     | Tempo medio cucina |
| Staff performance           | 🟡     | Ordini per persona |
| Customer cohorts            | 🟡     | Retention analysis |
| Predictive analytics        | 🟡     | AI forecast        |

### 2.9 Gestione Staff

| Feature             | Status | Note                            |
| ------------------- | ------ | ------------------------------- |
| Lista staff         | ✅     | Nome, ruolo, email              |
| Ruoli predefiniti   | ✅     | Owner, Manager, Barista, Cucina |
| Permessi per ruolo  | ✅     | Cosa può vedere/fare            |
| Invito via email    | ✅     | Magic link                      |
| Disattiva account   | ✅     | Senza eliminare                 |
| Distribuzione mance | ✅     | % per ruolo                     |
| Storico mance       | ✅     | Per staff member                |
| Turni/scheduling    | 🟡     | Chi lavora quando               |
| Timeclock           | 🟡     | Check-in/out                    |
| Performance review  | 🟡     | Rating staff                    |

### 2.10 QR Codes

| Feature               | Status | Note                       |
| --------------------- | ------ | -------------------------- |
| Genera QR per tavolo  | ✅     | Numero tavolo              |
| Genera QR generico    | ✅     | Menu senza tavolo          |
| Customizza design QR  | ✅     | Colori, logo               |
| Download PNG/SVG      | ✅     | Per stampa                 |
| Statistiche scansioni | ✅     | Per QR code                |
| QR dinamico           | ✅     | Stesso QR, menu aggiornato |
| Batch generate        | ✅     | 10 tavoli insieme          |
| QR con tracking UTM   | 🟡     | Source attribution         |

### 2.11 Settings

| Feature               | Status | Note                        |
| --------------------- | ------ | --------------------------- |
| Info locale           | ✅     | Nome, indirizzo, tel        |
| Logo upload           | ✅     | Brand identity              |
| Orari apertura        | ✅     | Per giorno                  |
| Lingue abilitate      | ✅     | Quali mostrare              |
| Valuta principale     | ✅     | VND, USD, etc.              |
| Tasse/IVA             | ✅     | % per categoria             |
| Service charge        | ✅     | % opzionale                 |
| Mance settings        | ✅     | Suggerimenti %              |
| Stripe connect        | ✅     | Payment setup               |
| Crypto wallets        | ✅ 🔒  | BTC/ETH address — Pro+      |
| Custom domain         | 🔒     | menu.tuolocale.com — Pro+   |
| White label           | 🔒     | Rimuovi GUDBRO — Business   |
| Webhook notifications | 🔒     | Per integrazioni — Business |
| API access            | 🔒     | Per sviluppatori — Business |

### 2.12 AI Co-Manager

| Feature                   | Status | Note                 |
| ------------------------- | ------ | -------------------- |
| Briefing giornaliero      | ✅     | Cosa aspettarsi oggi |
| Alert anomalie            | ✅     | Vendite strane       |
| Suggerimenti pricing      | ✅     | Basati su margini    |
| Traduzione menu on-demand | ✅     | Nuova lingua         |
| Analisi feedback          | ✅     | Sentiment reviews    |
| Chat con AI assistant     | ✅     | Domande sul business |
| Auto-risposta recensioni  | 🟡     | Google/TripAdvisor   |
| Social content generator  | 🟡     | Post suggestions     |
| Inventory predictions     | 🟡     | Quanto ordinare      |
| Staff scheduling AI       | 🟡     | Chi far lavorare     |

---

## 3. STAFF APPS

### 3.1 Waiter App (Opzionale Phase 1)

| Feature           | Status | Note                         |
| ----------------- | ------ | ---------------------------- |
| Login staff       | ✅     | Con credenziali              |
| Lista tavoli      | ✅     | Con stato                    |
| Prendi ordine     | ✅     | Come cliente ma per conto di |
| Aggiungi note     | ✅     | Per cucina                   |
| Vedi stato ordini | ✅     | Preparazione                 |
| Marca "servito"   | ✅     | Consegnato al tavolo         |
| Chiama manager    | 🟡     | Alert button                 |

---

## 4. INTEGRAZIONI

| Integrazione                | Status | Note                   |
| --------------------------- | ------ | ---------------------- |
| Stripe Payments             | ✅     | Core                   |
| Supabase Auth               | ✅     | Core                   |
| OpenAI GPT-4                | ✅     | AI features            |
| Google Translate (fallback) | ✅     | Se AI fallisce         |
| Google Places               | ✅     | Autocomplete indirizzo |
| Vercel Analytics            | ✅     | Performance            |
| Sentry                      | ✅     | Error tracking         |
| POS integration             | 🟡     | Square, Toast, etc.    |
| Accounting software         | 🟡     | QuickBooks, Xero       |
| Delivery platforms          | 🟡     | Grab, Shopee Food      |
| Google Business             | 🟡     | Sync info              |
| Instagram                   | 🟡     | Auto-post              |
| WhatsApp Business           | 🟡     | Order notifications    |

---

## 5. FEATURE ESCLUSE (Altri Verticali)

Queste feature esistono nel codebase ma **NON sono deployate** nell'MVP:

### 5.1 Accommodations (Hotel/Airbnb)

| Feature              | Status | Note        |
| -------------------- | ------ | ----------- |
| Room management      | ❌     | Hotel only  |
| Booking calendar     | ❌     | Hotel only  |
| Guest lifecycle      | ❌     | Hotel only  |
| Minibar pricing      | ❌     | Hotel only  |
| Room service         | ❌     | Hotel only  |
| Housekeeping         | ❌     | Hotel only  |
| In-stay dashboard    | ❌     | Hotel only  |
| Check-in/out digital | ❌     | Hotel only  |
| Property guide       | ❌     | Airbnb only |
| House rules          | ❌     | Airbnb only |

### 5.2 Tourism & B2B

| Feature                   | Status | Note             |
| ------------------------- | ------ | ---------------- |
| Tour operator integration | ❌     | Tourism vertical |
| Convention vouchers       | ❌     | B2B              |
| Corporate partnerships    | ❌     | B2B              |
| Bulk booking              | ❌     | B2B              |
| Commission management     | ❌     | B2B              |

### 5.3 Altri Verticali

| Feature              | Status | Note              |
| -------------------- | ------ | ----------------- |
| Spa/wellness booking | ❌     | Wellness vertical |
| Gym class scheduling | ❌     | Gym vertical      |
| Laundry tracking     | ❌     | Laundry vertical  |
| Workshop booking     | ❌     | Workshop vertical |
| Vehicle rental       | ❌     | Rental vertical   |
| Pharmacy catalog     | ❌     | Pharmacy vertical |

---

## 6. DATABASE — Cosa Usiamo

### Tabelle ATTIVE (MVP)

| Gruppo      | Tabelle Principali                                   | Uso                |
| ----------- | ---------------------------------------------------- | ------------------ |
| Core        | merchants, locations, accounts                       | Multi-tenant base  |
| Menu        | products, categories, product_variants               | Catalogo           |
| Ingredients | ingredients, product_ingredients, allergens          | Food cost + filtri |
| Orders      | orders, order_items, order_status_history            | Transazioni        |
| Payments    | payments, tips, gift_cards                           | Checkout           |
| Loyalty     | loyalty_points, loyalty_rewards, loyalty_redemptions | Fidelizzazione     |
| Marketing   | promo_codes, promotions, events                      | Promozioni         |
| Staff       | staff, staff_roles, staff_permissions                | Team               |
| QR          | qr_codes, qr_scans                                   | Tracking           |
| Analytics   | analytics_daily, prep_time_logs                      | Metriche           |
| AI          | ai_suggestions, ai_logs                              | Co-manager         |

### Tabelle IGNORATE (non usate in MVP)

| Gruppo         | Tabelle                              | Motivo            |
| -------------- | ------------------------------------ | ----------------- |
| Accommodations | properties, rooms, bookings, guests  | Verticale escluso |
| Tourism        | tours, tour_bookings, tour_operators | Verticale escluso |
| Conventions    | conventions, convention_vouchers     | B2B escluso       |
| Wellness       | services, appointments               | Verticale escluso |

---

## 7. PRICING FEATURE MATRIX

| Feature                | Free     | Starter $29 | Pro $79      | Business $149 |
| ---------------------- | -------- | ----------- | ------------ | ------------- |
| QR codes               | 1        | 10          | 50           | Illimitati    |
| Prodotti               | 20       | 100         | Illimitati   | Illimitati    |
| Team members           | 1        | 3           | 10           | Illimitati    |
| Lingue menu            | 2        | 5           | 16+          | Tutte         |
| Traduzioni AI/mese     | 100      | 1,000       | 10,000       | Illimitate    |
| Branding GUDBRO        | Visibile | Nascosto    | Nascosto     | Nascosto      |
| Logo custom            | ❌       | ✅          | ✅           | ✅            |
| Food Cost Intelligence | Base     | Base        | Completo     | Completo      |
| Loyalty program        | ❌       | Base        | Completo     | Completo      |
| Gift cards             | ❌       | ✅          | ✅           | ✅            |
| Referral program       | ❌       | ❌          | ✅           | ✅            |
| Crypto payments        | ❌       | ❌          | ✅           | ✅            |
| Push notifications     | ❌       | ❌          | ✅           | ✅            |
| Custom domain          | ❌       | ❌          | ✅           | ✅            |
| API access             | ❌       | ❌          | ❌           | ✅            |
| White label            | ❌       | ❌          | ❌           | ✅            |
| Multi-location         | ❌       | ❌          | ❌           | ✅            |
| Priority support       | ❌       | Email       | Email + Chat | Dedicato      |
| Analytics              | Base     | Standard    | Avanzate     | Custom        |
| Data export            | ❌       | CSV         | CSV + API    | Tutto         |

---

## 8. RIEPILOGO DECISIONI

### Incluso MVP (✅)

- Menu digitale completo
- Sistema ordini
- KDS
- Food Cost Intelligence
- Loyalty + Gift Cards
- Marketing base (promo, happy hour, eventi)
- Analytics
- Gestione staff
- QR codes
- AI Co-Manager base
- Pagamenti (Stripe + crypto Pro)

### Phase 2 (🟡)

- Reservations/prenotazioni
- Advanced analytics
- Email/SMS marketing
- Food challenges
- Import menu da foto
- POS integration
- Social media automation

### Escluso — Altri Verticali (❌)

- Tutto accommodations (hotel, airbnb)
- Tourism (tours, activities)
- B2B (conventions, partnerships)
- Wellness, gym, laundry, pharmacy, workshops, rentals

---

**Prossimo step:** Review documenti → Approvazione → Inizio implementazione
