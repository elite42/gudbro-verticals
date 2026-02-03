# GUDBRO Coffeeshop MVP — Product Requirements Document

> **Versione:** 1.0
> **Data:** 2026-02-03
> **Autore:** Gianfranco + Claude
> **Status:** Draft per Review

---

## 1. Executive Summary

### Visione

Creare la piattaforma digitale definitiva per **coffeeshop e locali con piccola cucina** in Vietnam e Sud-Est Asiatico. Un prodotto focalizzato, solido e performante che risolve problemi reali dei proprietari di locali.

### Perché MVP Coffeeshop-Only

1. **Focus** — Un prodotto eccellente per un verticale batte un prodotto mediocre per tutti
2. **Velocità** — Meno codice = meno bug, deploy più veloci, iterazioni rapide
3. **Validazione** — Testare product-market fit con utenti reali prima di espandere
4. **Sostenibilità** — Gestibile da solopreneur + AI assistant

### Target Customer

- Coffeeshop indipendenti (5-50 posti)
- Locali con piccola cucina (brunch, sandwich, pastry)
- Food truck e chioschi
- Catene locali piccole (2-5 location)

**NON target (per ora):**

- Ristoranti fine dining
- Hotel e accommodation
- Spa/wellness
- Tour operator

---

## 2. Problema da Risolvere

### Pain Points dei Coffeeshop Owner

| Problema                                | Impatto                      | Come GUDBRO lo risolve                     |
| --------------------------------------- | ---------------------------- | ------------------------------------------ |
| Menu cartacei costosi da aggiornare     | Spreco soldi + menu obsoleti | Menu digitale aggiornabile in tempo reale  |
| Clienti stranieri non capiscono il menu | Vendite perse                | Traduzione AI automatica in 16+ lingue     |
| Non sanno quali prodotti rendono di più | Margini bassi                | Food Cost Intelligence con analisi margini |
| Staff sovraccarico in cucina            | Errori, ritardi              | Kitchen Display System (KDS)               |
| Clienti non tornano                     | Revenue instabile            | Sistema Loyalty con punti e rewards        |
| Pagamenti complicati per turisti        | Friction checkout            | Multi-currency + crypto payments           |
| Nessuna visibilità sui dati             | Decisioni a caso             | Analytics dashboard real-time              |

### Jobs to Be Done

1. **Come owner**, voglio vedere il mio menu su QR code così i clienti ordinano senza aspettare
2. **Come owner**, voglio sapere quali prodotti mi fanno guadagnare di più
3. **Come owner**, voglio che i clienti tornino grazie a un sistema di rewards
4. **Come barista**, voglio vedere gli ordini su uno schermo invece di bigliettini
5. **Come cliente straniero**, voglio capire il menu nella mia lingua
6. **Come cliente**, voglio accumulare punti e avere sconti

---

## 3. Soluzione: GUDBRO Coffeeshop

### Product Suite

```
┌─────────────────────────────────────────────────────────────┐
│                    GUDBRO COFFEESHOP                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ CUSTOMER    │  │ BACKOFFICE  │  │ STAFF       │         │
│  │ PWA         │  │ DASHBOARD   │  │ APPS        │         │
│  │             │  │             │  │             │         │
│  │ • Menu      │  │ • Content   │  │ • KDS       │         │
│  │ • Order     │  │ • Orders    │  │ • Waiter    │         │
│  │ • Pay       │  │ • Analytics │  │             │         │
│  │ • Loyalty   │  │ • Food Cost │  │             │         │
│  │             │  │ • Marketing │  │             │         │
│  │             │  │ • Settings  │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              SHARED INFRASTRUCTURE                      ││
│  │  Database • AI Services • Payments • Translations       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Feature Set MVP

### 4.1 Menu Digitale (Core)

**Descrizione:** Menu accessibile via QR code, multi-lingua, con foto e descrizioni.

**Funzionalità:**

- Scansione QR → menu istantaneo (no app download)
- Categorie prodotti (Caffè, Bevande, Food, Dolci)
- Foto prodotti high-quality
- Descrizioni con ingredienti
- Prezzi in valuta locale + conversione automatica
- Traduzione AI in 16+ lingue
- Filtri allergie/diete (30+ allergie, 11 diete)
- Customizations (latte type, size, extras)
- Disponibilità real-time (sold out automatico)

**Metriche successo:**

- Tempo caricamento menu < 2 secondi
- 90%+ prodotti con foto
- Traduzioni accurate (rating utenti)

### 4.2 Sistema Ordini (Core)

**Descrizione:** Ordini digitali dal tavolo o take-away.

**Funzionalità:**

- Ordine dal tavolo (associato a numero tavolo)
- Take-away / pickup
- Carrello con modifiche
- Note speciali per cucina
- Conferma ordine via SMS/email
- Tracking stato ordine (Ricevuto → In preparazione → Pronto)

**Metriche successo:**

- Ordini completati senza errori > 95%
- Tempo medio ordine < 30 secondi

### 4.3 Kitchen Display System — KDS (Core)

**Descrizione:** Schermo in cucina/bar per gestire ordini in tempo reale.

**Funzionalità:**

- Vista ordini in coda (priorità per tempo)
- Separazione Bar vs Cucina
- Tap per marcare "in preparazione"
- Tap per marcare "pronto"
- Alert per ordini in ritardo (> X minuti)
- Storico ordini del giorno

**Metriche successo:**

- Tempo medio preparazione tracciato
- Riduzione errori ordini del 50%

### 4.4 Food Cost Intelligence (Core)

**Descrizione:** Tracciamento costi ingredienti e margini per prodotto.

**Funzionalità:**

- Database 2,548 ingredienti con costi medi
- Associazione ingredienti → prodotti
- Calcolo automatico food cost %
- Dashboard margini (verde/giallo/rosso)
- Alert prodotti sotto-margine
- Suggerimenti AI per ottimizzare pricing

**Metriche successo:**

- 80%+ prodotti con food cost calcolato
- Margine medio visibile in dashboard

### 4.5 Sistema Loyalty (Core)

**Descrizione:** Programma fedeltà per far tornare i clienti.

**Funzionalità:**

- Accumulo punti per ogni acquisto (1€ = X punti)
- Livelli cliente (Bronze, Silver, Gold, Platinum)
- Rewards riscattabili (sconto, prodotto gratis)
- Gift cards digitali
- Referral program (invita amico → punti bonus)
- Storico punti nel profilo cliente

**Metriche successo:**

- Tasso iscrizione loyalty > 30% clienti
- Repeat rate clienti loyalty vs non-loyalty

### 4.6 Marketing & Promozioni (Core)

**Descrizione:** Strumenti per promuovere il locale e aumentare vendite.

**Funzionalità:**

- Promo codes (% sconto o valore fisso)
- Happy hour automatico (orari + prodotti)
- Bundle deals (caffè + croissant)
- Promozioni a tempo (countdown)
- Eventi speciali (live music, tasting)
- Push notifications a clienti loyalty

**Metriche successo:**

- Redemption rate promo > 15%
- Incremento AOV durante promozioni

### 4.7 Pagamenti (Core)

**Descrizione:** Checkout flessibile per ogni tipo di cliente.

**Funzionalità:**

- Pagamento al banco (cash/card)
- Pagamento digitale (Stripe)
- Multi-currency (VND, USD, EUR auto-detect)
- Crypto payments (BTC, ETH, USDC)
- Split bill tra amici
- Mance digitali per staff
- Ricevuta digitale via email

**Metriche successo:**

- Conversion rate checkout > 85%
- Tempo checkout < 60 secondi

### 4.8 Analytics Dashboard (Core)

**Descrizione:** Dati real-time per decisioni informate.

**Funzionalità:**

- Revenue giornaliero/settimanale/mensile
- Prodotti più venduti (top 10)
- Ore di punta (heatmap)
- Clienti nuovi vs returning
- Scansioni QR per tavolo/location
- Performance staff (ordini gestiti)
- Export dati CSV

**Metriche successo:**

- Owner accede dashboard almeno 3x/settimana
- Decisioni basate su dati (survey qualitativa)

### 4.9 Gestione Staff (Core)

**Descrizione:** Organizzazione team e permessi.

**Funzionalità:**

- Ruoli: Owner, Manager, Barista, Cucina
- Permessi granulari per ruolo
- Invito staff via email
- Tracking presenze (opzionale)
- Distribuzione mance

**Metriche successo:**

- Setup team < 10 minuti
- Zero accessi non autorizzati

### 4.10 AI Co-Manager (Differenziatore)

**Descrizione:** Assistente AI che aiuta a gestire il locale.

**Funzionalità:**

- Briefing giornaliero (cosa è successo ieri, cosa aspettarsi oggi)
- Suggerimenti pricing basati su margini
- Alert anomalie (vendite insolitamente basse)
- Risposte automatiche recensioni
- Traduzione menu on-demand
- Analisi feedback clienti

**Metriche successo:**

- Suggerimenti AI implementati > 20%
- NPS owner su AI assistant

---

## 5. User Journeys

### Journey 1: Owner Setup (Onboarding)

```
1. Landing page → "Get Started Free"
2. Signup con email/Google
3. Wizard onboarding:
   a. Nome locale + indirizzo
   b. Upload logo
   c. Selezione categoria (Coffeeshop)
   d. Import menu (foto o manuale)
   e. Setup primo QR code
4. Dashboard pronta → stampa QR
5. Primo ordine ricevuto!
```

**Tempo target:** < 15 minuti da signup a primo QR stampato

### Journey 2: Cliente Ordina

```
1. Scansiona QR sul tavolo
2. Menu si apre (no download)
3. Seleziona lingua (auto-detect o manuale)
4. Sfoglia categorie
5. Tap prodotto → vede dettagli + allergie
6. Aggiunge al carrello + customizations
7. Checkout → sceglie pagamento
8. Conferma → riceve numero ordine
9. Notifica quando pronto
10. Ritira al banco
```

**Tempo target:** < 2 minuti da scan a ordine confermato

### Journey 3: Barista Prepara Ordine

```
1. Nuovo ordine appare su KDS
2. Vede: prodotti, customizations, note
3. Tap "In preparazione"
4. Prepara i prodotti
5. Tap "Pronto"
6. Cliente riceve notifica
7. Prossimo ordine in coda
```

**Tempo target:** Workflow fluido senza carta

### Journey 4: Owner Analizza Performance

```
1. Apre app backoffice (mobile o desktop)
2. Dashboard mostra KPI oggi
3. Vede prodotti top seller
4. Nota margine basso su un prodotto
5. Apre Food Cost → vede breakdown ingredienti
6. Decide di aumentare prezzo o cambiare ricetta
7. Aggiorna menu → live istantaneo
```

---

## 6. Architettura Tecnica

### Stack

| Layer        | Tecnologia                     |
| ------------ | ------------------------------ |
| Frontend PWA | Next.js 14, React, TailwindCSS |
| Backend      | Next.js API Routes, Prisma     |
| Database     | Supabase (PostgreSQL)          |
| Auth         | Supabase Auth                  |
| Payments     | Stripe + Crypto (web3)         |
| AI           | OpenAI GPT-4                   |
| Hosting      | Vercel                         |
| Icons        | Phosphor Icons                 |

### Apps da Deployare

| App          | Porta | Descrizione                                |
| ------------ | ----- | ------------------------------------------ |
| `coffeeshop` | 3004  | PWA cliente — menu, ordini                 |
| `backoffice` | 3023  | Dashboard owner/staff                      |
| `waiter`     | 3005  | App staff per ordini al tavolo (opzionale) |

### Apps NON Deployate (Coming Soon)

- accommodations, tours, wellness, gym, pharmacy, laundry, workshops, rentals

---

## 7. Pricing Strategy

### Piani MVP

| Piano        | Prezzo    | Target                | Limiti                                              |
| ------------ | --------- | --------------------- | --------------------------------------------------- |
| **Free**     | $0/mese   | Trial, micro-business | 1 QR, 20 prodotti, branding GUDBRO                  |
| **Starter**  | $29/mese  | Coffeeshop singolo    | 10 QR, 100 prodotti, logo custom                    |
| **Pro**      | $79/mese  | Locale con cucina     | 50 QR, illimitati prodotti, food cost, loyalty      |
| **Business** | $149/mese | Multi-location        | Tutto Pro + API + multi-location + priority support |

### Upsell Path

```
Free → Starter: "Rimuovi branding GUDBRO, aggiungi il tuo logo"
Starter → Pro: "Sblocca Food Cost Intelligence + Loyalty"
Pro → Business: "Gestisci più sedi da un'unica dashboard"
```

---

## 8. Go-to-Market

### Fase 1: Soft Launch (Settimana 1-2)

- 5-10 coffeeshop beta a Ho Chi Minh City
- Onboarding manuale con supporto diretto
- Raccolta feedback intensiva
- Fix bug critici

### Fase 2: Public Launch (Settimana 3-4)

- Landing page aggiornata (focus coffeeshop)
- Altri verticali mostrati come "Coming Soon"
- Content marketing (blog, social)
- Outreach diretto a coffeeshop locali

### Fase 3: Growth (Mese 2+)

- Referral program attivo
- Partnership con fornitori caffè
- Case studies da beta users
- Espansione altre città Vietnam

---

## 9. Metriche di Successo

### North Star Metric

**Ordini processati / mese** — indica valore reale per merchant e clienti

### KPI Secondari

| Metrica         | Target Mese 1 | Target Mese 3 |
| --------------- | ------------- | ------------- |
| Merchant attivi | 10            | 50            |
| Ordini totali   | 500           | 5,000         |
| MRR             | $500          | $2,500        |
| Churn rate      | < 10%         | < 5%          |
| NPS merchant    | > 40          | > 50          |

---

## 10. Rischi e Mitigazioni

| Rischio                            | Probabilità | Impatto | Mitigazione                                         |
| ---------------------------------- | ----------- | ------- | --------------------------------------------------- |
| Merchant non adottano              | Media       | Alto    | Onboarding assistito, free tier generoso            |
| Clienti preferiscono menu cartaceo | Bassa       | Medio   | UX eccellente, valore aggiunto (traduzioni, filtri) |
| Problemi tecnici in produzione     | Media       | Alto    | Monitoring, alerting, rollback rapido               |
| Competitor copiano                 | Alta        | Medio   | Differenziazione AI + food database proprietario    |
| Costi infra troppo alti            | Bassa       | Medio   | Ottimizzazione, caching, limiti tier free           |

---

## 11. Roadmap Post-MVP

### Phase 2 (Mese 2-3)

- Reservations (prenotazione tavoli)
- Advanced analytics
- Integrazione POS esterni
- App mobile nativa (opzionale)

### Phase 3 (Mese 4-6)

- Verticale Restaurant (menu complessi)
- Verticale Hotel (room service)
- B2B partnerships

### Phase 4 (Mese 6+)

- Altri verticali (wellness, tours)
- Espansione regionale (Thailand, Indonesia)
- Enterprise features

---

## 12. Definition of Done — MVP

L'MVP è considerato **pronto per il lancio** quando:

- [ ] Landing page aggiornata con focus coffeeshop
- [ ] Onboarding < 15 minuti funzionante
- [ ] Menu digitale con traduzioni AI
- [ ] Sistema ordini end-to-end
- [ ] KDS funzionante
- [ ] Food Cost dashboard operativa
- [ ] Loyalty system attivo
- [ ] Pagamenti Stripe funzionanti
- [ ] Analytics base visibili
- [ ] 3 coffeeshop beta hanno usato per 1 settimana senza bug critici
- [ ] Documentazione help base
- [ ] Monitoring e alerting attivi

---

**Prossimo step:** Review documento → Approvazione → Implementazione
