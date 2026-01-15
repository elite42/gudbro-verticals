# Partnerships B2B - Executive Summary

> Hub gestione partnership con tour operator e accommodation.

---

## Cosa Fa

Partnerships (TOURISM-B2B) e' un **sistema completo di gestione B2B** che permette ai ristoranti di scoprire e gestire partnership con tour operator e alloggi. Include **AI Booking Coordinator** per gestione automatica prenotazioni gruppi, **CRM pipeline** per tracking outreach, e **prodotti turistici** personalizzabili.

---

## Perche E' Importante

| Impatto                    | Descrizione                              |
| -------------------------- | ---------------------------------------- |
| **Revenue Predictable**    | Prenotazioni gruppi = revenue garantito  |
| **Occupancy Optimization** | Riempire slot morti con gruppi turistici |
| **Network Effect**         | Ogni partnership genera referral         |
| **AI Automation**          | Rispondere a richieste 24/7 senza staff  |
| **Market Expansion**       | Accesso a mercato turistico B2B          |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                      |
| -------------- | ----------- | ----------------------------------------- |
| Funzionalita   | 🟡 60%      | Schema + API + UI shells, no data binding |
| Test Coverage  | ❌ Minimo   | Solo type validation                      |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md                        |
| Database       | ✅ 100%     | 11 tabelle + RLS                          |

---

## Funzionalita Chiave

### 1. Partner Discovery

- **AI-powered search** per location (citta, coordinate, raggio)
- Tour operator: 9 tipi (bus, cruise, luxury, cultural, religious, budget, MICE, school, senior)
- Accommodation: 5 tipi (hotel, hostel, airbnb, B&B, aparthotel)
- Partnership models: 6 tipi (breakfast/lunch/dinner convention, discount, recommendation, full board)

### 2. CRM Outreach Pipeline

| Stage                | Descrizione                   |
| -------------------- | ----------------------------- |
| Suggested            | AI ha identificato potenziale |
| Contacted            | Email/telefono inviato        |
| Responded            | Partner ha risposto           |
| Negotiating          | In discussione                |
| Active               | Partnership attiva            |
| Declined/No Response | Chiuso                        |

Tracking: bookings generated, guests referred, revenue generated

### 3. AI Booking Coordinator

**3 Livelli di automazione:**
| Livello | Comportamento |
|---------|---------------|
| Suggest | AI suggerisce, manager approva |
| Auto-Routine | AI gestisce standard, escala complessi |
| Full Auto | AI autonomo, manager vede report |

**Decision Factors:**

- Revenue optimization (50%)
- Occupancy optimization (30%)
- Partner relationship (20%)

**Constraints configurabili:**

- Margine minimo (es. 20%)
- Capacita max gruppo (es. 60% ristorante)
- Blackout dates
- Partner preferiti/bloccati

### 4. Group Booking Management

- Request status: pending → ai_suggested → accepted/declined/countered
- Menu types: silver/gold/platinum/custom
- Dietary requirements tracking
- AI confidence score (0-1)
- Counter-offer capability

### 5. Tourism Products

Template pronti:
| Prodotto | Durata | Prezzo |
|----------|--------|--------|
| Gelato Tour | 60 min | €25/persona |
| Wine Tasting | 90 min | €45/persona |
| Cooking Class | 120 min | €65/persona |

### 6. Partner Feedback Network

Crowdsourced data quality:

- Contact verified/wrong
- Business closed
- Deal closed
- Declined partnership

---

## Metriche Chiave

| Metrica             | Valore |
| ------------------- | ------ |
| Tour operator types | 9      |
| Accommodation types | 5      |
| Partnership models  | 6      |
| Pipeline stages     | 6      |
| Automation levels   | 3      |
| Database tables     | 11     |
| Product templates   | 3      |

---

## Competitivita

| Aspetto                  | GUDBRO | Toast | Square | Lightspeed |
| ------------------------ | ------ | ----- | ------ | ---------- |
| B2B partnership CRM      | ✅     | ❌    | ❌     | ❌         |
| AI booking coordinator   | ✅     | ❌    | ❌     | ❌         |
| Tour operator discovery  | ✅     | ❌    | ❌     | ❌         |
| Group booking mgmt       | ✅     | 🟡    | 🟡     | 🟡         |
| Tourism products         | ✅     | ❌    | ❌     | ❌         |
| Partner feedback network | ✅     | ❌    | ❌     | ❌         |

---

## Roadmap

### Completato

- [x] Database schema (11 tabelle)
- [x] Full API routes (13 actions)
- [x] Service layer (3 services)
- [x] UI pages (7 pagine)
- [x] RLS policies

### In Progress

- [ ] UI form → API connection
- [ ] Real data population

### Planned

- [ ] AI decision algorithm implementation
- [ ] Email templates per outreach
- [ ] Analytics dashboard con charts
- [ ] Mobile notifications per nuove richieste

---

## Rischi & Mitigazioni

| Rischio                   | Probabilita | Impatto | Mitigazione                          |
| ------------------------- | ----------- | ------- | ------------------------------------ |
| UI non connessa a API     | Alta        | Alto    | Priorita P0 per data binding         |
| No tour operator data     | Alta        | Alto    | Importare dati da fonti pubbliche    |
| AI decision logic missing | Media       | Alto    | Implementare algorithm before launch |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_
- [Spec TOURISM-B2B](../../backlog/specs/TOURISM-B2B.md)

---

## File Principali

| File                                           | Scopo             |
| ---------------------------------------------- | ----------------- |
| `app/(dashboard)/partnerships/page.tsx`        | Hub principale    |
| `app/(dashboard)/partnerships/tour-operators/` | Gestione tour op  |
| `app/(dashboard)/partnerships/bookings/`       | Booking requests  |
| `lib/ai/tourism-partnerships-service.ts`       | Service 758 LOC   |
| `lib/ai/tourism-booking-service.ts`            | Booking service   |
| `migrations/049-tourism-b2b.sql`               | Schema 11 tabelle |

---

_Ultimo aggiornamento: 2026-01-14_
