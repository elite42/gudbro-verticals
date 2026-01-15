# Analytics - Executive Summary

> Dashboard metriche e insights comportamento clienti.

---

## Cosa Fa

Analytics fornisce una **dashboard real-time** per monitorare page views, sessioni, dispositivi, pagine popolari e ore di picco. Traccia il **customer journey** dal QR scan all'ordine, calcola conversion rate, e prepara il terreno per **AI-powered suggestions** (tabella pronta ma non implementata).

---

## Perche E' Importante

| Impatto                   | Descrizione                                 |
| ------------------------- | ------------------------------------------- |
| **Decisioni Data-Driven** | Metriche reali invece di intuizioni         |
| **Conversion Tracking**   | Vedere dove i clienti abbandonano il funnel |
| **Peak Hours**            | Ottimizzare staff scheduling                |
| **Device Insights**       | Capire se ottimizzare mobile vs desktop     |
| **Customer Journey**      | QR scan → menu view → item click → order    |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                 |
| -------------- | ----------- | ------------------------------------ |
| Funzionalita   | 🟡 70%      | Dashboard OK, export non funzionante |
| Test Coverage  | ~40%        | Test per analytics-service           |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md                   |
| Database       | ✅ 100%     | 4 tabelle + indexes + RLS            |

---

## Funzionalita Chiave

### 1. Key Metrics Dashboard

- **Page Views** totali con trend %
- **Unique Visitors** (by session_id)
- **Sessions** totali
- **Conversion Rate** (add_to_cart / item_view)
- Time ranges: 7d, 30d, 90d, 1y

### 2. Visualizzazioni (6 Widget)

| Widget                  | Descrizione                           |
| ----------------------- | ------------------------------------- |
| **Key Metrics Cards**   | 4 metriche principali con % change    |
| **Page Views Chart**    | Bar chart 14 giorni                   |
| **Top Menu Items**      | Top 5 con progress bar e conversion % |
| **Device Distribution** | Mobile/Desktop/Tablet breakdown       |
| **Popular Pages**       | Tabella path + views + unique         |
| **Peak Hours**          | 24h breakdown color-coded             |

### 3. Event Tracking

| Evento       | Categoria   |
| ------------ | ----------- |
| page_view    | page_view   |
| menu_view    | interaction |
| item_view    | interaction |
| item_click   | interaction |
| add_to_cart  | conversion  |
| order_placed | conversion  |

### 4. QR Code Integration

- Ogni scan QR traccia: device, OS, browser, IP, session
- Entry point per analytics funnel
- Linking QR code → menu views → orders

### 5. Pre-computed Aggregates

Tabella `analytics_daily_aggregates` per query veloci:

- Sessioni, visitors, page views giornalieri
- Menu views, item clicks, add to cart
- Revenue totale, AOV
- Top viewed/ordered items (JSONB)

---

## Metriche Chiave

| Metrica               | Valore |
| --------------------- | ------ |
| Event types tracciati | 6      |
| Widget dashboard      | 6      |
| Time range presets    | 4      |
| Tabelle database      | 4      |
| Test cases            | 89     |

---

## Competitivita

| Aspetto              | GUDBRO      | Toast | Square | Lightspeed |
| -------------------- | ----------- | ----- | ------ | ---------- |
| Real-time dashboard  | ✅          | ✅    | ✅     | ✅         |
| QR-to-order tracking | ✅          | ❌    | ❌     | ❌         |
| Device breakdown     | ✅          | 🟡    | 🟡     | 🟡         |
| Peak hours analysis  | ✅          | 🟡    | ✅     | ✅         |
| AI suggestions       | 🟡 DB ready | ❌    | ❌     | ❌         |
| Conversion funnel    | ✅          | 🟡    | 🟡     | 🟡         |

---

## Roadmap

### Completato

- [x] Event tracking da QR scans
- [x] Real-time dashboard (6 widget)
- [x] 4 time range presets
- [x] Device/browser detection
- [x] Session management
- [x] Daily aggregates table
- [x] GIN indexes per JSONB

### In Progress

- [ ] Export CSV/PDF (UI presente, non funzionante)

### Planned

- [ ] AI improvement suggestions (tabella pronta)
- [ ] Session duration tracking (attualmente 0)
- [ ] Daily aggregate automation
- [ ] Follower analytics UI
- [ ] Churn risk visualization

---

## Rischi & Mitigazioni

| Rischio                        | Probabilita | Impatto | Mitigazione                       |
| ------------------------------ | ----------- | ------- | --------------------------------- |
| Session duration non tracciato | Alta        | Medio   | Implementare heartbeat events     |
| Export non funziona            | Alta        | Basso   | Completare implementazione        |
| RLS permissive                 | Media       | Medio   | Restringere policies per merchant |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                      | Scopo                      |
| ----------------------------------------- | -------------------------- |
| `app/(dashboard)/analytics/page.tsx`      | Dashboard principale       |
| `lib/analytics-service.ts`                | Service layer (8 funzioni) |
| `migrations/017-analytics-system.sql`     | Schema analytics_events    |
| `lib/__tests__/analytics-service.test.ts` | 89 test cases              |

---

_Ultimo aggiornamento: 2026-01-14_
