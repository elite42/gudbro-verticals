# Marketing - Executive Summary

> Eventi, challenge virali, promozioni e programma loyalty.

---

## Cosa Fa

Marketing e' il modulo per **creare engagement e fidelizzare i clienti**. Include 4 sotto-sistemi: **Eventi** (29 tipi, da live music a degustazioni), **Food Challenges** (sfide competitive con Wall of Fame), **Promozioni** (8+ tipi di sconti e meccaniche), e **Loyalty** (programma punti con 5 tier). Tutto integrato con il calendario e il sistema QR per tracking.

---

## Perche E' Importante

| Impatto              | Descrizione                                                   |
| -------------------- | ------------------------------------------------------------- |
| **Revenue Off-Peak** | Eventi attraggono clienti in orari morti (happy hour, brunch) |
| **Marketing Virale** | Food challenges generano UGC e reach organico sui social      |
| **Retention**        | Loyalty program aumenta visite ripetute e CLV                 |
| **Traffic Spikes**   | Promozioni guidano picchi di traffico controllati             |
| **Community**        | Eventi costruiscono connessione emotiva col locale            |

---

## Stato Attuale

| Aspetto         | Stato  | Note                                    |
| --------------- | ------ | --------------------------------------- |
| Eventi          | ✅ 95% | Production-ready, 864 LOC service       |
| Food Challenges | ✅ 90% | Production-ready, Wall of Fame, 509 LOC |
| Promozioni      | 🟡 40% | UI completa, backend mancante           |
| Loyalty         | 🟡 35% | UI completa, database mancante          |
| Test Coverage   | ~60%   | Tests per events-service e challenges   |

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

## 3. Promozioni (In Sviluppo)

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

## 4. Loyalty (In Sviluppo)

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
| Tipi promozione              | 8+     |
| Tier loyalty                 | 5      |
| Azioni per punti             | 11     |

---

## Competitivita

| Aspetto              | GUDBRO | Toast | Square | Lightspeed |
| -------------------- | ------ | ----- | ------ | ---------- |
| Eventi management    | ✅     | 🟡    | ❌     | 🟡         |
| Food challenges      | ✅     | ❌    | ❌     | ❌         |
| Wall of Fame         | ✅     | ❌    | ❌     | ❌         |
| Promozioni integrate | 🟡     | ✅    | ✅     | ✅         |
| Loyalty multi-tier   | 🟡     | ✅    | ✅     | ✅         |
| Ricorrenza eventi    | ✅     | ❌    | ❌     | 🟡         |

---

## Roadmap

### Completato

- [x] Eventi: CRUD, ricorrenza, venue impact, menu override
- [x] Eventi: 3 funzioni pubbliche (range, today, upcoming)
- [x] Challenges: CRUD, Wall of Fame, stats automatiche
- [x] Challenges: Media tracking (foto/video)
- [x] UI: Tutte le 4 pagine marketing

### In Progress

- [ ] Loyalty: Schema database
- [ ] Promozioni: Schema database

### Planned

- [ ] Loyalty service layer
- [ ] Promozioni service layer
- [ ] API routes
- [ ] Marketing analytics dashboard
- [ ] Social sharing integration
- [ ] AI suggestions per campagne

---

## Rischi & Mitigazioni

| Rischio                        | Probabilita | Impatto | Mitigazione                   |
| ------------------------------ | ----------- | ------- | ----------------------------- |
| Loyalty/Promo backend mancante | Alta        | Alto    | Implementare prima del lancio |
| Challenge media storage        | Media       | Basso   | Configurare CDN/S3            |
| Overbooking eventi             | Bassa       | Medio   | Implementare capacity limits  |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                            | Scopo                       |
| ----------------------------------------------- | --------------------------- |
| `lib/events-service.ts`                         | Service eventi (864 LOC)    |
| `lib/challenges-service.ts`                     | Service challenge (509 LOC) |
| `app/(dashboard)/marketing/events/page.tsx`     | Pagina eventi               |
| `app/(dashboard)/marketing/challenges/page.tsx` | Pagina challenge            |
| `migrations/schema/022-events.sql`              | Schema eventi               |
| `migrations/schema/026-food-challenges.sql`     | Schema challenge            |

---

_Ultimo aggiornamento: 2026-01-14_
