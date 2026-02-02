# Competitor Analysis - Digital Menu PWAs

> **Data analisi:** 2026-01-24
> **Analizzati:** MenuTigr, Menuviel, LeggieMenu, MenuDigitale + me&u (screenshots)
> **Scopo:** Identificare pattern UI/UX per GUDBRO PWA v2

---

## Executive Summary

| Competitor | Punti Forza | Punti Deboli | Lezioni per GUDBRO |
|------------|-------------|--------------|-------------------|
| **me&u** | UX premium, loyalty integrato, dietary tags puliti | Solo Australia/UK | ✅ Reference principale per UI |
| **Menuviel** | Calorie, prep time, allergen icons colorati, likes | Design un po' pesante | ✅ Nutritional info display |
| **LeggieMenu** | Allergeni EU testuali, badge "Più scelto", CTA verde | UI datata | ✅ Compliance EU allergeni |
| **MenuDigitale** | Legenda completa (8 dietary + 14 allergeni EU) | No ordering, solo menu view | ✅ Legenda allergeni |
| **MenuTigr** | Search, category pills, prep time, order type | UI basic, no images | ⚠️ Pattern basilari |

---

## 1. MenuTigr (menutigr.com)

### Screenshots Analizzati
- Homepage con hero, search, promotions
- Product detail modal

### Pattern UI Identificati

**Header:**
- Logo centrato
- FEEDBACK, Cart, Checklist, Crypto(?), Language, Login
- Full-width verde #7CB342

**Homepage:**
- Search bar prominente con icona
- Sezione "Promotions" con card orizzontale
- "Food categories" come pills verdi (scroll orizzontale)

**Product Cards:**
- Avatar circolare con iniziale se no foto
- Nome categoria sopra
- Nome prodotto bold
- Descrizione breve
- Prezzo in pill verde con "+"

**Product Detail Modal:**
- Header verde con nome + X
- Placeholder immagine grande
- Descrizione
- "Preparation time: N/A"
- "Order type: Dine-in, Takeaway"
- Frecce navigazione < >
- Price input (?)
- Total
- "ADD TO CART" verde + quantity selector

### Lezioni
- ✅ Search prominente
- ✅ Category pills scrollabili
- ✅ Prep time e order type visibili
- ⚠️ UI troppo basic per GUDBRO

---

## 2. Menuviel (menuviel.com)

### Screenshots Analizzati
- Landing page con venue info
- Menu selection modal
- Category view con Featured
- Product list con tabs
- Product detail

### Pattern UI Identificati

**Landing Page:**
- Hero image ristorante
- Logo circolare overlay
- Nome venue
- "View Menu" CTA rosso #DC2626
- Card info: Address (con mappa), Phone (click-to-call), Instagram, WiFi password
- Delivery integrations: DoorDash, Uber Eats

**Menu Selection:**
- Modal "Select Menu"
- Lista opzioni (Breakfast, Lunch & Dinner, Beer & Wine)
- Freccia > per ogni opzione

**Menu View:**
- Tabs orizzontali per menu type (pills con bordo)
- Banner promozione verde acqua "Enjoy 10% off..." con badge "HAPPY HOUR"
- Sezione "Featured" con carousel 4 items
- Cards: sfondo scuro, immagine quadrata, nome, prezzo

**Category Tabs:**
- Orizzontali, scroll
- Underline rosso per attivo
- Appetisers, Mains, Burgers, Pizzas, Pastas, Salads...

**Product List Item:**
- Badge "NEW" rosso
- Likes counter ❤️ 5
- Nome bold
- Prezzo
- Descrizione 2 righe
- **Icone dietary colorate** (4 icone circolari piccole)
- **Badge calorie** "425 Cal"
- Immagine a destra (quadrata, rounded)

**Product Detail:**
- Hero image ~50% schermo
- X button top-left
- Nome + Likes a destra
- Badge "NEW"
- Prezzo
- Descrizione ingredienti
- ⏱️ Prep time "5 mins"
- 📊 Calories "425 Cal"
- ✅ Vegetarian badge
- **Sezione "Allergens":**
  - 🥚 Egg (arancione)
  - 🌾 Gluten (giallo)
  - 🥛 Milk (blu)

### Lezioni
- ✅ **Allergen icons colorati per tipo** - ottimo per GUDBRO
- ✅ **Calorie e prep time** - info utili
- ✅ **Likes/popularity** - social proof
- ✅ **Badge "NEW"** - evidenzia novità
- ✅ **Happy Hour banner** - promozioni contestuali
- ✅ **Delivery integrations** visibili

---

## 3. LeggieMenu (leggimenu.it)

### Screenshots Analizzati
- Homepage con hero e categorie
- Category page con tabs
- Product detail con allergeni

### Pattern UI Identificati

**Header:**
- Logo centrato
- Bandiera lingua (IT)
- Badge "ORDINE" con counter

**Homepage:**
- Hero image persone al ristorante
- Category tabs orizzontali (ANTIPASTI, PRIMI, SECONDI, PIZZE, DESSERT, VINI...)
- Categorie come cards verticali grandi con immagine + nome + descrizione

**Bottom Navigation (5 items):**
- 📋 MENU
- ☰ CATEGORIE
- 🔍 CERCA
- ℹ️ CONTATTI
- 📤 CONDIVIDI

**Category Page:**
- "INDIETRO" back link
- Hero categoria con nome overlay
- Tabs includono "MENU" come home
- Cards prodotto grandi

**Product Detail:**
- Badge **"IL PIÙ SCELTO"** verde (= Popular)
- Nome bold
- Prezzo €14.00 (centesimi in apice)
- Descrizione ingredienti
- **Icone dietary** (❄️ surgelato, ❄️🔪 abbattuto, 🥢 ???)
- **"Allergeni:"** lista testuale
  - Cereali contenenti glutine
  - Crostacei
  - Molluschi
- CTA **"AGGIUNGI ALL'ORDINE"** verde full-width

### Lezioni
- ✅ **Badge "Più scelto"** - social proof italiano
- ✅ **Allergeni come lista testuale** - compliance EU
- ✅ **Prezzo con centesimi piccoli** - elegante
- ✅ **Bottom nav 5 items** - pattern comune
- ⚠️ Design un po' datato

---

## 4. MenuDigitale (menudigitale.io)

### Screenshots Analizzati
- Homepage venue
- Menu view
- LEGENDA completa

### Pattern UI Identificati

**Header:**
- Logo "Menu DIGITALE"
- "CONDIVIDI" button
- Bandiera lingua

**Venue Page:**
- Logo ristorante
- Nome rosso
- Collage immagini
- Sezione "CHI SIAMO" con descrizione

**Bottom Navigation:**
- CHI SIAMO (🏠)
- DOVE SIAMO (📍)
- CHIAMA (📞)
- **MENU** (🍴) - evidenziato rosso

**Menu View:**
- Title bar arancione con nome menu
- Categorie collapsabili con pallino colorato + freccia
- Immagine categoria grande

**Menu Bottom Nav (cambia):**
- HOME
- MENU
- ORDINE
- **LEGENDA** ← molto utile!

### LEGENDA (Pattern eccellente per GUDBRO!)

**Icone Dietary (8):**
| Icona | Nome | Colore | Descrizione |
|-------|------|--------|-------------|
| ❄️ | congelato | Azzurro | Alimenti congelati/surgelati |
| 🔵 | abbattuto | Blu | Bonifica preventiva (reg. CE 853/2004) |
| ✅ | vegetariano | Verde | Dieta vegetariana |
| 🌱 | vegano | Verde scuro | Dieta vegana |
| 🌾 | senza glutine | Giallo | Non contiene glutine |
| 🌶️ | piccante | Rosso | Gusto piccante |
| 🥛 | senza lattosio | Blu chiaro | Non contiene lattosio |
| 🌿 | biologico | Verde lime | Origine biologica |

**Allergeni EU (14):**
1. Glutine (cereali: grano, segale, orzo, avena, farro, kamut)
2. Crostacei
3. Uova
4. Pesce
5. Arachidi
6. Soia
7. Latte e lattosio
8. Frutta a guscio (noci, mandorle, nocciole...)
9. Sedano
10. Senape
11. Semi di sesamo
12. Anidride solforosa e solfiti
13. Lupini
14. Molluschi

### Lezioni
- ✅ **LEGENDA dedicata** - accessibile sempre da nav
- ✅ **8 icone dietary standard** - da adottare
- ✅ **14 allergeni EU completi** - compliance
- ✅ **Descrizioni dettagliate** - educativo
- ⚠️ Solo menu viewing, no ordering

---

## Sintesi Pattern UI per GUDBRO

### Must Have (P0)

| Pattern | Fonte | Implementazione |
|---------|-------|-----------------|
| Category pills scrollabili | me&u, MenuTigr | Horizontal scroll, active state |
| Product card con immagine | me&u, Menuviel | Immagine dx, info sx |
| Dietary icons colorati | Menuviel, MenuDigitale | Pills piccoli sotto descrizione |
| Allergen display | LeggieMenu, Menuviel | Lista testuale + icone |
| Badge Popular/New | me&u, Menuviel, LeggieMenu | Corner badge o inline |
| CTA verde full-width | Tutti | #22C55E, sticky bottom |
| Prep time | MenuTigr, Menuviel | Icona orologio + "X mins" |

### Should Have (P1)

| Pattern | Fonte | Implementazione |
|---------|-------|-----------------|
| Calorie display | Menuviel | Badge "XXX Cal" |
| Likes/popularity | Menuviel | ❤️ counter |
| Happy Hour banner | Menuviel | Contextual promo |
| Legenda accessibile | MenuDigitale | Nav item o modal |
| Search prominente | MenuTigr | Header o floating |

### Nice to Have (P2)

| Pattern | Fonte | Implementazione |
|---------|-------|-----------------|
| Delivery integrations | Menuviel | Footer icons |
| WiFi password | Menuviel | Info card |
| Share button | MenuDigitale, LeggieMenu | Header action |
| Multi-menu (Breakfast/Lunch) | Menuviel | Modal selector |

---

## Differenziatori GUDBRO (Non presenti nei competitor)

Questi elementi sono **unici di GUDBRO** e devono essere evidenziati nel UI:

1. **30 Allergeni** (vs 14 EU standard) - Korea, Japan, GUDBRO custom
2. **Crypto payments** - BTC, ETH, USDC, USDT badges
3. **4-tier Loyalty** - Bronze/Silver/Gold/Platinum con progress
4. **15+ lingue auto-tradotte** - Language selector premium
5. **AI Co-Manager suggestions** - "Recommended for you"
6. **Bill splitting** - Icona split nel cart
7. **KDS integration** - Live order status
8. **Social login** - Zalo, LINE, KakaoTalk, WeChat

---

## Raccomandazioni Finali

### Design System
- **Primary CTA:** Verde #22C55E (come me&u, MenuTigr, LeggieMenu)
- **Accent:** Ambra #B45309 per prezzi (come me&u)
- **Error/Alert:** Rosso #DC2626
- **Background:** Grigio chiaro #F3F4F6

### Information Architecture
```
Home
├── Hero + Venue Info
├── Category Grid (me&u style)
├── Featured/Popular carousel
└── Quick Actions (Reorder, Group Order)

Menu
├── Search bar
├── Category tabs (horizontal scroll)
├── Filter button (dietary/allergens)
├── Product list
│   ├── Image
│   ├── Name + badges (New, Popular)
│   ├── Price + discount
│   ├── Description
│   ├── Dietary icons
│   └── Allergen pills
└── Sticky "View Order" CTA

Product Detail (Bottom Sheet)
├── Hero image
├── Name + Price + Likes
├── Badges row
├── Description
├── Prep time + Calories
├── Dietary section
├── Allergens section
├── Modifiers/Extras
├── Quantity selector
└── Add to Cart CTA

Cart
├── Items with modifiers
├── Loyalty points (if available)
├── Voucher/discount input
├── Bill split option (GUDBRO unique)
├── Crypto payment option (GUDBRO unique)
└── Pay CTA

Legenda (Accessible from nav)
├── Dietary icons (8+)
├── Allergens (30 for GUDBRO)
└── Special symbols
```

---

**Prossimi passi:**
1. Aggiornare Design Sprint Report con questi findings
2. Creare mockup specifici per i differenziatori GUDBRO
3. Definire component library basata sui pattern identificati
