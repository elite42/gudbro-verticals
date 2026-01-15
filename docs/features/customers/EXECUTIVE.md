# Customers/CRM - Executive Summary

> Gestione clienti, loyalty, feedback e intelligenza AI.

---

## Cosa Fa

Customers e' il modulo **CRM completo** per gestire le relazioni con i clienti. Include: **Follower System** (clienti che seguono il locale), **Customer Intelligence** (analisi AI con CLV e churn prediction), **Feedback Management** (recensioni e risposte), **Loyalty Program** (tier e punti), e **Tourist Lifecycle** (gestione speciale per turisti vs residenti).

---

## Perche E' Importante

| Impatto              | Descrizione                                                   |
| -------------------- | ------------------------------------------------------------- |
| **Revenue Growth**   | Identifica clienti alto valore (Champions) per upselling      |
| **Churn Prevention** | Rileva clienti a rischio 2-3 settimane prima dell'abbandono   |
| **Retention**        | Loyalty program aumenta visite ripetute e lifetime value      |
| **Reputation**       | Sistema feedback centralizzato costruisce fiducia             |
| **Efficienza**       | Trigger automatici eseguono campagne senza intervento manuale |
| **Tourist Market**   | Gestione separata turisti apre revenue da visite ricorrenti   |

---

## Stato Attuale

| Aspetto        | Stato       | Note                           |
| -------------- | ----------- | ------------------------------ |
| Funzionalita   | ✅ 95%      | Production-ready, AI integrato |
| Test Coverage  | ~40%        | Test per customer-intelligence |
| Documentazione | ❌ Mancante | Primo EXECUTIVE.md             |
| Database       | ✅ 100%     | 5 tabelle + RLS + functions    |

---

## Funzionalita Chiave

### 1. Follower System

- Sistema opt-in (privacy-first, GDPR compliant)
- Tracking fonte: QR scan, search, referral, promo
- Stats: totali, attivi, residenti, turisti, paused, archived
- Export CSV

### 2. Customer Intelligence (AI)

#### Segmentazione (7 Segmenti)

| Segmento  | Icona | Criteri                    |
| --------- | ----- | -------------------------- |
| Champion  | 👑    | 10+ visite, €500+ speso    |
| Loyal     | ❤️    | 5+ visite, €200+ speso     |
| Potential | 🌱    | 1-4 visite, trend positivo |
| New       | ✨    | <30 giorni, ≤2 visite      |
| At Risk   | ⚠️    | 30-45 giorni senza visita  |
| Dormant   | 🌙    | 90+ giorni senza visita    |
| Lost      | ❌    | 180+ giorni senza visita   |

#### Churn Prediction

- Risk score 0-1 con 4 livelli (low/medium/high/critical)
- Fattori di rischio identificati automaticamente
- Alert per clienti high/critical risk
- Giorni stimati al churn

#### Customer Lifetime Value (CLV)

- Stima 24 mesi basata su storico ordini
- Confidence score 0-95%
- Usato per prioritizzare interventi

#### AI Recommendations

| Tipo         | Descrizione                     |
| ------------ | ------------------------------- |
| Promo        | Invia sconto personalizzato     |
| Notification | Re-engagement message           |
| Loyalty      | Reward per tier upgrade         |
| Winback      | Recupero cliente perso          |
| Upsell       | Cross-sell basato su preferenze |

### 3. Feedback Management

#### Tipi di Feedback

| Tipo       | Icona           |
| ---------- | --------------- |
| Rating     | ⭐ (1-5 stelle) |
| Review     | 📝              |
| Suggestion | 💡              |
| Issue      | ⚠️              |
| Compliment | 🎉              |

#### Categorie

Food Quality, Service, Ambience, Cleanliness, App Experience, Delivery, Pricing, Menu, General

#### Workflow

new → read → in_progress → replied/resolved/dismissed

#### Features

- Risposte staff con timestamp
- Testimonial pubblici e featured
- Supporto feedback anonimi (guest)

### 4. Tourist Lifecycle

#### Visitor Types

| Tipo        | Gestione             |
| ----------- | -------------------- |
| Resident 🏠 | Notifiche standard   |
| Tourist ✈️  | Auto-pause post-trip |
| Unknown ❓  | Da classificare      |

#### Features Turisti

- Trip end date tracking
- Auto-pause notifiche dopo viaggio
- Preferenze post-trip (pause/occasional/stop)
- Welcome-back flow per ritorni
- Tracking paese/citta origine

### 5. Loyalty Program

- 4 tier: Bronze → Silver → Gold → Platinum
- Punti sincronizzati con accounts.total_points
- Tracking rewards riscattati
- Prodotti/categorie preferite per cliente

---

## Metriche Chiave

| Metrica            | Valore |
| ------------------ | ------ |
| Segmenti cliente   | 7      |
| Tipi feedback      | 5      |
| Categorie feedback | 9      |
| Tier loyalty       | 4      |
| Valute supportate  | 21+    |
| Azioni punti       | 11     |

---

## Competitivita

| Aspetto            | GUDBRO | Toast | Square | Lightspeed |
| ------------------ | ------ | ----- | ------ | ---------- |
| AI CLV prediction  | ✅     | ❌    | ❌     | ❌         |
| Churn prediction   | ✅     | ❌    | ❌     | 🟡         |
| 7-segment model    | ✅     | 🟡    | 🟡     | 🟡         |
| Tourist lifecycle  | ✅     | ❌    | ❌     | ❌         |
| AI recommendations | ✅     | ❌    | ❌     | ❌         |
| Feedback workflow  | ✅     | ✅    | 🟡     | ✅         |
| GDPR compliant     | ✅     | ✅    | ✅     | ✅         |

---

## Roadmap

### Completato

- [x] Follower system (follow/unfollow, source tracking)
- [x] Analytics & metriche (visite, ordini, loyalty, feedback)
- [x] Feedback module (5 tipi, workflow, risposte staff)
- [x] AI Intelligence (CLV, churn, segmentation, recommendations)
- [x] Batch analysis (50 clienti/batch, parallelizzato)
- [x] Tourist lifecycle (visitor type, trip dates, auto-pausing)
- [x] Loyalty tier (4 tier, punti, rewards)
- [x] Filtri avanzati (7 filtri, 5 opzioni sort)
- [x] Multi-currency (21+ valute)
- [x] Export CSV

### Planned

- [ ] Integrazione invio messaggi/email
- [ ] Integrazione invio promo
- [ ] Dashboard analytics CRM
- [ ] Trigger automatici avanzati

---

## Rischi & Mitigazioni

| Rischio                         | Probabilita | Impatto | Mitigazione                     |
| ------------------------------- | ----------- | ------- | ------------------------------- |
| AI recommendations inaccurate   | Bassa       | Medio   | Feedback loop per miglioramento |
| Costi OpenAI per batch analysis | Media       | Basso   | Batch size configurabile        |
| GDPR compliance                 | Bassa       | Alto    | Sistema opt-in gia implementato |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                              | Scopo                |
| ------------------------------------------------- | -------------------- |
| `lib/ai/customer-intelligence-service.ts`         | Service AI (666 LOC) |
| `app/(dashboard)/customers/page.tsx`              | Hub principale       |
| `app/(dashboard)/customers/followers/page.tsx`    | Lista follower       |
| `app/(dashboard)/customers/intelligence/page.tsx` | Dashboard AI         |
| `app/(dashboard)/customers/feedback/page.tsx`     | Gestione feedback    |
| `app/api/ai/customer-intelligence/`               | API routes           |
| `migrations/024-merchant-followers-feedback.sql`  | Schema base          |
| `migrations/025-tourist-lifecycle.sql`            | Schema turisti       |

---

_Ultimo aggiornamento: 2026-01-14_
