# AI-FIRST-REDESIGN - Backoffice AI-First Redesign

**Priority:** P1 - Alta Priorità
**Status:** IN PROGRESS (Sprint 1 DONE)
**Effort:** High
**Full Spec:** `docs/specs/AI-FIRST-REDESIGN.md`

---

## Vision

Trasformare il backoffice da "gestionale con AI" a "AI Co-Manager con strumenti gestionali".

## Audit

ChatGPT Atlas (2026-01-13) - Documento completo in `docs/specs/AI-FIRST-REDESIGN.md`

## Problema principale

Dashboard informativa, non operativa. L'AI aspetta invece di guidare.

## Sprint Plan

| Sprint | Focus                                | Effort     | Status  |
| ------ | ------------------------------------ | ---------- | ------- |
| 1      | Dashboard Hero (3 priorità AI + CTA) | 2-3 giorni | ✅ DONE |
| 2      | AI Triggers v2 inline                | 2 giorni   | ✅ DONE |
| 3      | Confidence Score + Spiegazioni       | 1 giorno   | ✅ DONE |
| 4      | Mobile Command Mode                  | 2-3 giorni | ✅ DONE |
| 5      | Operational Scenarios                | 3-4 giorni | ✅ DONE |

## Sprint 1 Implementation (2026-01-14)

### Componenti Creati/Aggiornati

| Componente        | File                                   | Stato                               |
| ----------------- | -------------------------------------- | ----------------------------------- |
| AIPriorityCard    | `components/ai/AIPriorityCard.tsx`     | ✅ Esistente                        |
| AIPrioritiesHero  | `components/ai/AIPrioritiesHero.tsx`   | ✅ Aggiornato (Weather + Food Cost) |
| OpportunityBanner | `components/ai/OpportunityBanner.tsx`  | ✅ Esistente + aggiunto a dashboard |
| AIStatusHeader    | Header.tsx (pulsante AI con notifiche) | ✅ Esistente                        |

### Features Implementate

1. **AI Priorities nel Dashboard**
   - Max 3 priorità ordinate per urgenza
   - Categorie: staffing, weather, promo, food_cost
   - Livelli: critical (rosso), warning (arancione), opportunity (verde)
   - CTA azionabili per ogni priorità

2. **Food Cost Triggers**
   - Alert automatici per piatti con food cost >35%
   - Priorità critical se >45%
   - Link diretto a /food-cost per analisi

3. **Weather-based Suggestions**
   - Suggerimenti staffing basati su meteo
   - Promo bevande calde/fredde
   - Menu focus per condizioni meteo

4. **Opportunity Banner**
   - Banner opportunità top con CTA
   - Dismiss e azioni dirette

## Sprint 2 Implementation (2026-01-15)

### Template 5 Domande

Ogni trigger AI ora risponde a:

1. ❓ **Cosa sta succedendo** (`situation`)
2. 📉📈 **Perché è problema/opportunità** (`reason`)
3. 💰 **Impatto stimato** (`impact`)
4. 🧠 **Cosa consiglia l'AI** (`aiSuggestion`)
5. 👉 **Cosa fai ORA** (`actions.primary`)

### Componenti Aggiornati

| Componente       | File                                 | Cambiamenti                        |
| ---------------- | ------------------------------------ | ---------------------------------- |
| AIPriorityCard   | `components/ai/AIPriorityCard.tsx`   | Interface con 5 campi, UI template |
| AIPrioritiesHero | `components/ai/AIPrioritiesHero.tsx` | Tutti i trigger usano template     |
| AIInlineTrigger  | `components/ai/AIInlineTrigger.tsx`  | NUOVO - trigger contestuali inline |

### Trigger Implementati

| Trigger        | Categoria   | Condizione                   |
| -------------- | ----------- | ---------------------------- |
| Food Cost Alto | `food_cost` | Piatti >35% food cost        |
| Staffing Meteo | `staffing`  | Meteo → affluenza            |
| Promo Bevande  | `promo`     | Meteo → bevande calde/fredde |
| Menu Focus     | `weather`   | Meteo → categoria menu       |

### Inline Triggers

- `AIInlineTrigger` aggiunto a `/food-cost` page
- Mostra trigger contestuali specifici per categoria
- Supporta modalità compact e full

## Sprint 3 Implementation (2026-01-15)

### Confidence Score System

Visualizzazione a 3 livelli:

- 🟢 **Alta** (70-100%): Suggerimento forte
- 🟡 **Media** (40-69%): Suggerimento con riserve
- 🔴 **Bassa** (<40%): AI ammette incertezza

### Features Implementate

1. **Enhanced Confidence Display**
   - Badge colorato con emoji (🟢/🟡/🔴)
   - Progress bar visiva
   - Label "Alta/Media/Bassa" in italiano

2. **Spiegazioni On-Demand**
   - Pulsante "Perché?" per ogni priorità
   - Popover con `dataPoints` (max 3)
   - Toggle show/hide

3. **Feedback Loop**
   - Bottoni 👍/👎 per ogni spiegazione
   - Feedback salvato localmente
   - Messaggio conferma ("Grazie! Migliorerò.")

4. **AI Ammette Errori**
   - Campo `previousError` con messaggio
   - Nota di apprendimento ("Sto aggiornando il modello")
   - Box amber visibile

5. **Low Confidence Warning**
   - Campo `lowConfidenceMessage` per AI che non sa
   - Box grigio discreto
   - Linguaggio umano ("Non ho abbastanza dati...")

### Componenti Aggiornati

| Componente     | Cambiamenti Sprint 3                                                            |
| -------------- | ------------------------------------------------------------------------------- |
| AIPriorityCard | `confidenceConfig`, `getConfidenceLevel`, feedback buttons, explanation popover |

### Linguaggio Humanizzato

- ✅ "Ti consiglio" (non "Il sistema ha calcolato")
- ✅ "Perché te lo consiglio?" (non "Explanation")
- ✅ "Grazie! Migliorerò." (feedback umano)
- ✅ "Non ho abbastanza dati" (ammette limiti)

## Sprint 4 Implementation (2026-01-15)

### Mobile Command Mode

Mobile = telecomando, non backoffice. Target: 8-12 secondi sessione.

### Componenti Creati

| Componente          | File                                    | Descrizione                       |
| ------------------- | --------------------------------------- | --------------------------------- |
| useIsMobile         | `lib/hooks/useIsMobile.ts`              | Hook per detect viewport mobile   |
| MobileDecisionCard  | `components/ai/MobileDecisionCard.tsx`  | Card decisione ottimizzata mobile |
| MobileCommandCenter | `components/ai/MobileCommandCenter.tsx` | Vista completa command center     |

### Features Implementate

1. **Mobile Detection**
   - Hook `useIsMobile()` con breakpoint 768px
   - Dashboard mostra MobileCommandCenter su mobile
   - Fallback full dashboard su desktop

2. **AI Command Center Header**
   - Logo "🔥 AI COMMAND CENTER"
   - Brand/Location name
   - Orario corrente (aggiornato ogni minuto)
   - Temperatura attuale

3. **Decision Cards**
   - Max 2 decisioni mostrate
   - Layout ottimizzato per tap
   - Bottoni grandi (APPLICA/IGNORA, ATTIVA/DOPO)
   - Badge livello (🔴 critical, 🟠 warning)
   - Impatto e timeframe visibili

4. **Stato "Tutto OK"**
   - Schermata verde quando nessuna decisione
   - Messaggio "Ti avviso se cambia qualcosa"
   - Bottone refresh

### UX Principles

- ❌ NO Menu completo
- ❌ NO Analytics
- ❌ NO Settings
- ❌ NO Tabelle
- ❌ NO Configurazioni
- ✅ Solo decisioni urgenti con azioni immediate

## Sprint 5 Implementation (2026-01-15)

### 5 Scenari Madre

Sistema di rilevamento automatico dello scenario operativo corrente.

| Scenario          | Emoji | Condizione                             |
| ----------------- | ----- | -------------------------------------- |
| Giornata Lenta    | 🔵    | Traffico basso, fascia lenta           |
| Picco Improvviso  | 🔴    | Alta affluenza, ore di punta           |
| Margini a Rischio | 🟠    | Food cost alto, piatti critici         |
| Opportunità       | 🟢    | Meteo favorevole, condizioni ideali    |
| Tutto OK          | 🟣    | Nessuna anomalia, operatività regolare |

### File Creati

| File                               | Descrizione                            |
| ---------------------------------- | -------------------------------------- |
| `lib/ai/scenario-detection.ts`     | Logic detection + actions per scenario |
| `components/ai/ScenarioBanner.tsx` | Banner espandibile con azioni          |

### Features Implementate

1. **Scenario Detection Engine**
   - Analisi meteo (temperatura, pioggia)
   - Analisi food cost (piatti critici, media)
   - Stima traffico basata su ora/giorno
   - Scoring multi-fattore per scenario

2. **ScenarioBanner Component**
   - Header con emoji e label scenario
   - Confidence score
   - Espandibile con dataPoints
   - Azioni suggerite per scenario
   - Versione compact per mobile (ScenarioChip)

3. **Integrazione Dashboard**
   - ScenarioBanner in AIPrioritiesHero
   - ScenarioChip in MobileCommandCenter
   - Auto-refresh con i dati

### Azioni per Scenario

| Scenario          | Azioni Suggerite                                          |
| ----------------- | --------------------------------------------------------- |
| Giornata Lenta    | Promo flash, Push bevande, Notifica clienti, Riduci staff |
| Picco Improvviso  | Pausa piatti lenti, Suggerisci veloci, Rinforza cucina    |
| Margini a Rischio | Correggi prezzi, Rivedi porzioni, Sostituisci ingredienti |
| Opportunità       | Evidenzia top seller, Aggiorna QR, Promo soft             |
| Tutto OK          | Vedi analytics                                            |

## Citazione chiave

> "Se il manager dice 'Vediamo cosa dice Gudbro oggi', hai vinto."

## Prossimi passi

1. [x] Sprint 1: Dashboard Hero
2. [x] Sprint 2: AI Triggers v2 inline
3. [x] Sprint 3: Confidence Score + Spiegazioni
4. [x] Sprint 4: Mobile Command Mode
5. [x] Sprint 5: Operational Scenarios
6. [ ] Test iterativi con Atlas
7. [ ] KPI tracking (AI Action Rate, Decision Time, etc.)

---

**Related:** AI-ZONE-INTEL, Weather Intelligence
