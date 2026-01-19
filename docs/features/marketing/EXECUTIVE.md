# Marketing - Executive Summary

> Eventi, challenge virali, gift cards, promo codes, coupon e programma loyalty.

---

## Cosa Fa

Marketing e' il modulo per **creare engagement e fidelizzare i clienti**. Include 7 sotto-sistemi: **Eventi** (29 tipi, da live music a degustazioni), **Food Challenges** (sfide competitive con Wall of Fame), **Gift Cards** (credito prepagato → wallet), **Promo Codes** (codici sconto marketing), **Coupons** (sconti mirati/personali), **Promozioni** legacy (8+ tipi di sconti), e **Loyalty** (programma punti con 5 tier). Tutto integrato con il calendario, il sistema QR per tracking, e il checkout.

---

## Perche E' Importante

| Impatto              | Descrizione                                                   |
| -------------------- | ------------------------------------------------------------- |
| **Revenue Off-Peak** | Eventi attraggono clienti in orari morti (happy hour, brunch) |
| **Marketing Virale** | Food challenges generano UGC e reach organico sui social      |
| **Retention**        | Loyalty program aumenta visite ripetute e CLV                 |
| **Traffic Spikes**   | Promozioni guidano picchi di traffico controllati             |
| **Community**        | Eventi costruiscono connessione emotiva col locale            |
| **Gift Economy**     | Gift cards portano nuovi clienti (destinatari)                |
| **Win-Back**         | Coupons personali recuperano clienti inattivi                 |

---

## Stato Attuale

| Aspetto         | Stato  | Note                                         |
| --------------- | ------ | -------------------------------------------- |
| Eventi          | ✅ 95% | Production-ready, 864 LOC service            |
| Food Challenges | ✅ 90% | Production-ready, Wall of Fame, 509 LOC      |
| Gift Cards      | ✅ 95% | Production-ready, wallet integration         |
| Promo Codes     | ✅ 95% | Production-ready, checkout integration       |
| Coupons         | ✅ 95% | Production-ready, templates, auto-distribute |
| Promozioni      | 🟡 40% | UI completa, backend mancante (legacy)       |
| Loyalty         | 🟡 35% | UI completa, database mancante               |
| Test Coverage   | ~60%   | Tests per events-service e challenges        |

---

## 1. Eventi (Production-Ready)

### Tipi di Eventi (29)

| Categoria           | Esempi                                                    |
| ------------------- | --------------------------------------------------------- |
| **Entertainment**   | Live Music, DJ Set, Karaoke, Acoustic Night               |
| **Food & Beverage** | Wine Tasting, Chef's Table, Cooking Class, Pairing Dinner |
| **Promotions**      | Happy Hour, Brunch, Ladies Night, Student Night           |
| **Sports**          | Match Viewing, Tournament, Game Night                     |
| **Community**       | Open Mic, Art Exhibition, Book Club, Charity Event        |
| **Private**         | Birthday Party, Corporate Event, Wedding Reception        |
| **Special**         | Grand Opening, Anniversary, Holiday Special               |

### Funzionalita

- **Scheduling**: Singolo, multi-data, ricorrente (daily/weekly/monthly)
- **Venue Impact**: Riduzione capacita, chiusura parziale, solo prenotazioni
- **Menu Override**: Menu speciale durante evento
- **Loyalty Bonus**: Punti extra durante evento
- **Promozioni Embedded**: Multiple promo per evento
- **Calendario**: Pubblico/privato, featured flag

---

## 2. Food Challenges (Production-Ready)

### Come Funziona

1. Crea challenge (es. "Mangia 1kg di pasta in 10 minuti")
2. Imposta difficolta (Easy → Extreme) e premio
3. Clienti tentano la sfida
4. Vincitori entrano nella **Wall of Fame**
5. Record holders ricevono bonus extra

### Livelli Difficolta

| Livello | Colore  | Esempio               |
| ------- | ------- | --------------------- |
| Easy    | Verde   | Finisci un burger XL  |
| Medium  | Giallo  | 500g ali in 5 min     |
| Hard    | Arancio | 1kg pasta in 10 min   |
| Extreme | Rosso   | Challenge leggendaria |

### Premi

- Free meal (pasto gratis)
- Free + cash bonus
- Free + premio fisico
- Record bonus (extra per nuovo record)

### Wall of Fame

- Top 10 leaderboard automatico
- Foto/video dei vincitori
- Tempo di completamento
- Calcolo automatico statistiche (tentativi, success rate)

---

## 3. Gift Cards (Production-Ready)

### Come Funziona

1. **Acquisto**: Cliente compra gift card (importo preset o custom)
2. **Delivery**: Email con QR code al destinatario
3. **Riscatto**: Destinatario scansiona QR → credito nel wallet
4. **Utilizzo**: Balance wallet usato al checkout

### Configurazione Merchant

| Setting        | Descrizione                         |
| -------------- | ----------------------------------- |
| Presets        | Importi predefiniti (€10, €25, €50) |
| Custom Amounts | Permetti importi personalizzati     |
| Min/Max Amount | Limiti importo (es. €5-€500)        |
| Default Expiry | Mesi validità default (es. 12 mesi) |

### Code Format

```
GIFT-XXXX-XXXX (no I, O, 0, 1 per evitare confusione)
Esempio: GIFT-A2B4-C6D8
```

### Status Lifecycle

`pending` → `active` → `redeemed` | `expired` | `cancelled`

---

## 4. Promo Codes (Production-Ready)

### Come Funziona

1. **Crea**: Marketing crea codice (es. "WELCOME10")
2. **Distribuisci**: Via social, email, ads, influencer
3. **Applica**: Cliente inserisce codice al checkout
4. **Valida**: Sistema verifica limiti, condizioni, validità
5. **Sconta**: Sconto applicato all'ordine

### Tipi Sconto

| Tipo         | Esempio                   |
| ------------ | ------------------------- |
| Percentage   | 10% off intero ordine     |
| Fixed Amount | €5 off ordine             |
| Free Item    | Pizza gratis (product_id) |

### Condizioni Avanzate

| Condizione            | Descrizione                         |
| --------------------- | ----------------------------------- |
| max_uses_total        | Max utilizzi totali (es. primi 100) |
| max_uses_per_customer | Max per cliente (es. 1 volta)       |
| min_order_cents       | Ordine minimo (es. €20)             |
| max_discount_cents    | Tetto massimo sconto                |
| first_order_only      | Solo primo ordine                   |
| new_customers_only    | Solo nuovi clienti                  |
| applies_to            | all / categories / products         |

### Code Format

```
Uppercase da nome campagna
Esempio: SUMMER2024, WELCOME10, BLACKFRIDAY
```

---

## 5. Coupons (Production-Ready)

### Come Funziona

1. **Template**: Merchant crea template (es. "20% off pizze")
2. **Emissione**: Sistema genera coupon univoci per clienti
3. **Distribuzione**: Manuale o automatica (birthday, inactivity)
4. **Riscatto**: Cliente vede coupon disponibili, applica al checkout

### Differenza Promo vs Coupon

| Aspetto       | Promo Code         | Coupon              |
| ------------- | ------------------ | ------------------- |
| Target        | Pubblico/campagna  | Singolo cliente     |
| Codice        | Unico per tutti    | Univoco per cliente |
| Distribuzione | Marketing pubblica | Sistema assegna     |
| Tracking      | Aggregato          | Per-cliente         |

### Auto-Distribution Triggers

| Trigger         | Descrizione                     |
| --------------- | ------------------------------- |
| auto_birthday   | Coupon compleanno automatico    |
| auto_inactivity | Win-back dopo X giorni inattivo |
| manual          | Emissione manuale               |

### Code Format

```
CPN-XXXXXXXX (8 caratteri random)
Esempio: CPN-K3M5N7P9
```

---

## 6. Checkout Integration

### Stacking Rules (Default)

| Regola                 | Valore              |
| ---------------------- | ------------------- |
| Max promo codes        | 1                   |
| Max coupons            | 2                   |
| Promo + Coupon insieme | NO (configurabile)  |
| Wallet                 | Sempre utilizzabile |
| Max sconto totale      | 50% ordine          |

### Priorità Applicazione

1. Coupon (sconti mirati)
2. Promo Code (sconto campagna)
3. Wallet Balance (credito)

### Esempio Checkout

```
Cart subtotal: €50.00
├── Coupon "PIZZA20": -€4.00 (20% off pizze)
├── Promo "WELCOME10": -€4.60 (10% off resto)
├── Wallet balance: -€10.00
└── TOTAL: €31.40
```

---

## 7. Promozioni Legacy (In Sviluppo)

### Tipi Disponibili (UI Ready)

| Tipo              | Descrizione               |
| ----------------- | ------------------------- |
| % Discount        | Sconto percentuale        |
| Fixed Discount    | Sconto fisso (es. €5 off) |
| Fixed Price       | Prezzo speciale           |
| BOGO              | Buy One Get One           |
| Buy X Get Y       | Acquista X, ottieni Y     |
| Bundle            | Pacchetto combinato       |
| Free Item         | Articolo gratuito         |
| Points Multiplier | Punti loyalty x2, x3      |

### Tracking QR

- Placement tracking (online/offline)
- Scansioni totali e uniche
- Conversion rate

### Status: Backend Mancante

- ❌ Tabelle database
- ❌ Service layer
- ❌ API routes

---

## 8. Loyalty (In Sviluppo)

### Sistema Tier

| Tier     | Soglia    | Moltiplicatore |
| -------- | --------- | -------------- |
| Bronze   | 0         | 1.0x           |
| Silver   | 500 pts   | 1.1x           |
| Gold     | 2000 pts  | 1.25x          |
| Platinum | 5000 pts  | 1.4x           |
| Diamond  | 10000 pts | 1.5x           |

### Come Guadagnare Punti

- Acquisti (1pt/€)
- Primo acquisto bonus
- Check-in
- Follow social
- Compleanno
- Condivisione social
- Foto/review
- Referral

### Rewards

- Articoli gratuiti
- Sconti esclusivi
- Esperienze VIP
- Accesso anticipato eventi

### Status: Backend Mancante

- ❌ Tabelle database (loyalty_tiers, customer_points, rewards)
- ❌ Service layer
- ❌ API routes

---

## Metriche Chiave

| Metrica                      | Valore |
| ---------------------------- | ------ |
| Tipi eventi                  | 29     |
| Categorie eventi             | 7      |
| Livelli difficolta challenge | 4      |
| Tipi sconto promo            | 3      |
| Tipi sconto coupon           | 3      |
| Tipi promozione legacy       | 8+     |
| Tier loyalty                 | 5      |
| Azioni per punti             | 11     |
| Services marketing           | 6      |
| API routes marketing         | 14+    |

---

## Competitivita

| Aspetto            | GUDBRO | Toast | Square | Lightspeed |
| ------------------ | ------ | ----- | ------ | ---------- |
| Eventi management  | ✅     | 🟡    | ❌     | 🟡         |
| Food challenges    | ✅     | ❌    | ❌     | ❌         |
| Wall of Fame       | ✅     | ❌    | ❌     | ❌         |
| Gift Cards         | ✅     | ✅    | ✅     | ✅         |
| Promo Codes        | ✅     | ✅    | ✅     | ✅         |
| Coupons personali  | ✅     | 🟡    | 🟡     | 🟡         |
| Checkout stacking  | ✅     | 🟡    | 🟡     | 🟡         |
| Wallet integration | ✅     | ❌    | ❌     | ❌         |
| Loyalty multi-tier | 🟡     | ✅    | ✅     | ✅         |
| Ricorrenza eventi  | ✅     | ❌    | ❌     | 🟡         |

---

## Roadmap

### Completato

- [x] Eventi: CRUD, ricorrenza, venue impact, menu override
- [x] Eventi: 3 funzioni pubbliche (range, today, upcoming)
- [x] Challenges: CRUD, Wall of Fame, stats automatiche
- [x] Challenges: Media tracking (foto/video)
- [x] **Gift Cards**: Schema, service, API, UI (2026-01-19)
- [x] **Promo Codes**: Schema, service, API, UI (2026-01-19)
- [x] **Coupons**: Schema, service, templates, auto-distribute (2026-01-19)
- [x] **Checkout Integration**: Stacking rules, discount calc (2026-01-19)
- [x] UI: Tutte le 7 pagine marketing

### In Progress

- [ ] Loyalty: Schema database

### Planned

- [ ] Loyalty service layer
- [ ] Promozioni legacy service layer
- [ ] Marketing analytics dashboard
- [ ] Social sharing integration
- [ ] AI suggestions per campagne
- [ ] Gift card purchase PWA flow
- [ ] Email templates per gift card delivery

---

## Rischi & Mitigazioni

| Rischio                  | Probabilita | Impatto | Mitigazione                       |
| ------------------------ | ----------- | ------- | --------------------------------- |
| Loyalty backend mancante | Alta        | Alto    | Implementare prima del lancio     |
| Challenge media storage  | Media       | Basso   | Configurare CDN/S3                |
| Overbooking eventi       | Bassa       | Medio   | Implementare capacity limits      |
| Gift card fraud          | Bassa       | Medio   | Rate limiting, code complexity    |
| Promo code abuse         | Media       | Medio   | max_uses_per_customer, validation |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                                 | Scopo                            |
| ---------------------------------------------------- | -------------------------------- |
| `lib/events-service.ts`                              | Service eventi (864 LOC)         |
| `lib/challenges-service.ts`                          | Service challenge (509 LOC)      |
| `lib/gift-card-service.ts`                           | Service gift cards (22 funzioni) |
| `lib/promo-code-service.ts`                          | Service promo codes (18 funz.)   |
| `lib/coupon-service.ts`                              | Service coupons (20 funzioni)    |
| `lib/checkout-discount-service.ts`                   | Checkout integration (17 funz.)  |
| `app/(dashboard)/marketing/events/page.tsx`          | Pagina eventi                    |
| `app/(dashboard)/marketing/challenges/page.tsx`      | Pagina challenge                 |
| `app/(dashboard)/marketing/gift-cards/page.tsx`      | Pagina gift cards                |
| `app/(dashboard)/marketing/promo-codes/page.tsx`     | Pagina promo codes               |
| `app/(dashboard)/marketing/coupons/page.tsx`         | Pagina coupons                   |
| `migrations/schema/022-events.sql`                   | Schema eventi                    |
| `migrations/schema/026-food-challenges.sql`          | Schema challenge                 |
| `migrations/schema/069-gift-cards-promo-coupons.sql` | Schema sconti                    |

---

_Ultimo aggiornamento: 2026-01-19_
