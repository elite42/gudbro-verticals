# Changelog

Tutte le modifiche significative al progetto GUDBRO Verticals.

Formato basato su [Keep a Changelog](https://keepachangelog.com/).

---

## [2026-01-19] - Gift Cards, Promo Codes & Coupons

### Added

- **Gift Cards System**: Acquisto, delivery email, riscatto con credito wallet
  - Presets importi configurabili per merchant
  - Settings per min/max amounts, expiry, custom amounts
  - Code format: GIFT-XXXX-XXXX (no ambiguous chars)
- **Promo Codes System**: Marketing codes per campagne
  - 3 tipi sconto: percentage, fixed_amount, free_item
  - Limiti: max_uses_total, max_uses_per_customer, min_order, date range
  - Condizioni: first_order_only, new_customers_only
  - Scope: all products, categories, specific products
- **Coupons System**: Sconti personali/mirati
  - Templates per emissione bulk
  - Auto-distribution: birthday trigger
  - Code format: CPN-XXXXXXXX
- **Checkout Discount Service**: Calcolo sconti combinati
  - Stacking rules configurabili
  - Priorità: coupon → promo → wallet
  - order_discounts tracking per analytics

### Database

- Migration `069-gift-cards-promo-coupons.sql` (8 tabelle + RLS + funzioni)
  - gift_cards, gift_card_presets, gift_card_settings
  - promo_codes, promo_code_redemptions
  - coupon_templates, coupons
  - order_discounts, discount_stacking_rules

### Services

- `lib/gift-card-service.ts` - 22 funzioni
- `lib/promo-code-service.ts` - 18 funzioni
- `lib/coupon-service.ts` - 20 funzioni
- `lib/checkout-discount-service.ts` - 17 funzioni

### API Routes

- `/api/gift-cards/*` - 6 routes (CRUD, redeem, validate, presets, settings)
- `/api/promo-codes/*` - 4 routes (CRUD, stats, validate)
- `/api/coupons/*` - 4 routes (templates, issue, customer, validate)

### UI

- `/marketing/gift-cards` - 5 tabs (list, presets, create, settings, redemptions)
- `/marketing/promo-codes` - 4 tabs (list, create, stats, active)
- `/marketing/coupons` - 4 tabs (templates, coupons, issue, create-template)

---

## [2025-12-16] - Session 3

### Added

- **Wines Database EXPANDED**: 69 → 142 vini (+73, +106%)
  - Emerging Europe (21): Georgia (Saperavi, Rkatsiteli Qvevri), Croatia (Plavac Mali, Malvazija), Slovenia (Rebula), Romania (Feteasca), Bulgaria (Mavrud, Melnik), Greece (Xinomavro, Assyrtiko), Hungary (Bikavér, Furmint), Moldova, Serbia, Armenia
  - Extended World (32): UK (English Sparkling), Lebanon (Bekaa Valley), Israel (Golan Heights), Turkey (Öküzgözü, Boğazkere), China (Ningxia), Japan (Koshu), India (Nashik), Uruguay (Tannat), Brazil (Serra Gaúcha), South Africa (Pinotage, Chenin Blanc), Morocco, Switzerland (Chasselas), Mexico (Valle de Guadalupe), Canada (Icewine, Okanagan), Austria (Grüner Veltliner, Blaufränkisch)
  - Additional Regions (20): Czech Republic (Moravian), Slovakia (Frankovka), Ukraine (Odessa, Shabo), Cyprus (Commandaria - oldest named wine!), Tunisia, Algeria, Peru (Ica Tannat), Bolivia (highest vineyards in world), Thailand (Khao Yai), Vietnam (Da Lat), Belgium, Luxembourg (Crémant), Malta (Gellewża)
  - **Total Countries**: 48 wine-producing nations covered globally
- **B2B Marketplace Idea**: Added to BACKLOG for future business evolution (restaurants can buy rare products through GUDBRO backoffice)

### Changed

- **Total Products**: 839 → 912 (+73)

---

## [2025-12-16] - Session 2

### Added

- **Wines Database**: 69 vini organizzati per tipologia (initial)
  - Red Wines (19): Italian DOCG (Barolo, Brunello, Amarone), French (Bordeaux, Burgundy, Rhône), Spanish (Rioja, Priorat), New World
  - White Wines (22): French (Chablis, Sancerre, Alsace), German Riesling, Italian (Pinot Grigio, Fiano), New World
  - Sparkling (12): Champagne, Prosecco, Franciacorta, Cava, Crémant
  - Rosé (4): Provence, Tavel, Spanish, Italian
  - Dessert (5): Sauternes, TBA, Tokaji, Vin Santo, Icewine
  - Fortified (7): Port (Ruby, Tawny, Vintage), Sherry, Madeira, Marsala
- **Wine Schema**: SQL schema completo con Sistema 5 Dimensioni integration
- **Wine Types**: TypeScript types con WineColor, WineStyle, WineCharacteristics, etc.

### Changed

- **Total Products**: 770 → 839 (+69)

---

## [2025-12-16] - Session 1

### Added

- **Master Ingredients Table**: 600 ingredienti unici in Supabase
  - 30 categorie (spirits, liqueurs, proteins, vegetables, etc.)
  - Schema con allergeni, intolleranze, diete per ogni ingrediente
  - Tabella `translations` per i18n (da popolare)
  - Tabella `product_ingredients` junction (da popolare)
- **Appetizers Database**: 51 ricette
  - Italian Antipasti (19): Bruschette, Fritti, Carpacci
  - Spanish Tapas (15): Patatas Bravas, Gambas, Croquetas
  - International (17): Greek, Middle Eastern, Asian
- **Desserts Database**: 35 ricette
  - Italian Dolci (14): Tiramisu, Panna Cotta, Cannoli
  - French Patisserie (10): Creme Brulee, Macarons
  - International (11): American, Asian, British
- **Documentation Structure**:
  - `docs/adr/` - Architecture Decision Records (4 ADR)
  - `docs/BACKLOG.md` - Long-term task tracking
  - `CHANGELOG.md` - This file
- **Ingredient ID Migration**: 842 ingredienti migrati da raw strings a `ingredient_ids`
  - Appetizers: 241 ingredienti
  - Desserts: 149 ingredienti
  - Soups: 258 ingredienti
  - Risotti: 111 ingredienti
  - Dumplings: 83 ingredienti

### Changed

- **README.md**: Riscritto con informazioni aggiornate (ports, database summary)
- **Coffeeshop CLAUDE.md**: Ridotto da 991 a 158 righe
- **BACKLOG.md**: Rimossa duplicazione con DATABASE-INVENTORY.md

### Archived

- `ARCHITECTURE.md` → `docs/archive/ARCHITECTURE-legacy-2025-11.md`

---

## [2025-12-15]

### Added

- **Sandwiches Database**: +20 Piadine Romagnole (totale 50)
- **Burgers Database**: 45 ricette (Classic, Gourmet, Alternative)
- **Pasta/Risotti/Dumplings/Soups**: Seeded to Supabase

### Fixed

- Pasta table: UUID → TEXT id
- Burger status enum: 'gourmet' → 'signature'

---

## [2025-12-14]

### Added

- **Pizzas Database**: 65 ricette (Italian, American, Gourmet, Fusion)
- **Salads Database**: 55 ricette (Classic, Mediterranean, Asian, Bowls)
- **Beers Database**: 45 stili

---

## [2025-12-11]

### Added

- **PWA Coffeeshop**: Sprint 1-3 completati
  - manifest.json + service-worker.js
  - Account page
  - Auth Guards per Backoffice
  - CSV Import/Export
  - Toast notifications

---

## [2025-11-29]

### Added

- **Order Submission**: Supabase integration con order codes (A-001)
- **Orders Page**: Session history con realtime updates
- **Database Schema**: `002-orders-standalone.sql`

---

## [2025-11-28]

### Fixed

- Add to Cart functionality (was broken)
- Category "See All" navigation crash
- SelectionsSidebar: Compact layout redesign
- Edit flow z-index stacking issue

---

## [2025-11-23]

### Added

- **Design System Hub**: `/design-system` internal tool
  - Brand guidelines (colors, typography)
  - Component showcase
  - Safety filter library (46 icons)
  - Product library management

---

## [2025-11-19]

### Added

- **Design System**: CVA + shadcn/ui pattern
  - Button (6 variants)
  - Card (5 variants)
  - Input/Textarea (4 variants)
  - Badge (8 variants)
  - Alert (5 variants)

---

## Database Totals

| Date            | Products | Ingredients |
| --------------- | -------- | ----------- |
| 2025-12-16 (S3) | 912      | 600         |
| 2025-12-16 (S2) | 839      | 600         |
| 2025-12-16 (S1) | 770      | 600         |
| 2025-12-15      | 684      | -           |
| 2025-12-14      | 559      | -           |
