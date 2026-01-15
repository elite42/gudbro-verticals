# GUDBRO Backoffice - AI-First Redesign Backlog

> Audit completo di ChatGPT Atlas - 13 Gennaio 2026

---

## EXECUTIVE SUMMARY

- **Non è AI-first, è AI-on-top** - L'AI c'è ma non guida le azioni quotidiane
- **Dashboard informativa, non operativa** - Mostra dati ma non dice cosa fare ORA
- **Troppe sezioni, poche decisioni** - Manager ragiona per problemi, non moduli
- **Nessun senso di urgenza** - Zero pressione = zero azione
- **Grande potenziale sprecato** - Struttura buona ma va ribaltata action-first

---

## PROBLEMI PRINCIPALI

### 🔴 PROBLEMA #1 - Dashboard inutile nei momenti critici

- Mostra info, non prende posizione
- Manca: priorità, alert, suggerimenti con CTA

### 🔴 PROBLEMA #2 - AI troppo nascosta

- Vive in `/ai`, viene consultata non interviene
- Un Co-Manager **disturba**, non aspetta

### 🔴 PROBLEMA #3 - Troppe sezioni gestionali

- Menu, ordini, food cost, marketing separati
- Manager ragiona per problemi, non per moduli

### 🔴 PROBLEMA #4 - Nessun senso di urgenza

- Nessun rischio, nessuna opportunità persa
- Nessun countdown, alert, warning

---

## SPRINT PLAN

| Sprint | Focus                             | Priorità  | Effort     |
| ------ | --------------------------------- | --------- | ---------- |
| 1      | Dashboard Hero (3 priorità + CTA) | ALTISSIMA | 2-3 giorni |
| 2      | AI Triggers v2 inline             | ALTISSIMA | 2 giorni   |
| 3      | Confidence Score + Spiegazioni    | ALTA      | 1 giorno   |
| 4      | Mobile Command Mode               | MEDIA     | 2-3 giorni |
| 5      | Operational Scenarios             | MEDIA     | 3-4 giorni |

---

## SPRINT 1: DASHBOARD HERO

### Obiettivo

Dashboard = "Cosa devi fare oggi", non overview.

### Struttura

```
┌─────────────────────────────────────────────┐
│ 🔥 AI PRIORITIES                            │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │ 🔴 TASK │ │ 🟠 TASK │ │ 🟢 TASK │        │
│ │ Urgente │ │ Medio   │ │ Basso   │        │
│ │ [AGISCI]│ │ [VEDI]  │ │ [DOPO]  │        │
│ └─────────┘ └─────────┘ └─────────┘        │
├─────────────────────────────────────────────┤
│ 📈 OPPORTUNITÀ: +12% se spingi iced drinks │
│                              [APPLICA] 💡   │
└─────────────────────────────────────────────┘
```

### Componenti da creare

- [x] `AIPriorityCard` - Card singola priorità con CTA
- [x] `AIPrioritiesHero` - Container 3 priorità max (Weather + Food Cost triggers)
- [x] `OpportunityBanner` - Banner opportunità con CTA
- [x] `AIStatusHeader` - Status AI nel header (pulsante AI con notifiche)

### Dati integrati

- [x] WeatherWidget data per suggerimenti meteo
- [x] AI Triggers per priorità (staffing, promo, menu)
- [x] Food Cost data per margini (alert >35%, critical >45%)

---

## SPRINT 2: AI TRIGGERS v2

### Template Standard (5 domande obbligatorie)

Ogni trigger deve rispondere a:

1. ❓ Cosa sta succedendo
2. 📉📈 Perché è problema/opportunità
3. 💰 Impatto stimato
4. 🧠 Cosa consiglia l'AI
5. 👉 Cosa fai ORA

### Trigger Prioritari da implementare

#### 🔥 A. STAFFING INTELLIGENTE

**Condizioni:** Meteo + Giorno settimana + Storico + Eventi
**Output:** "Affluenza stimata in calo 16–18. Overstaffing probabile."
**Azioni:** Riduci/sposta risorsa, Suggerimento turno alternativo

#### 🔥 B. MENU & FOOD COST

**Condizioni:** Food cost > target, Vendite sotto media
**Output:** "Bánh Mì al 38% food cost. Margine a rischio."
**Azioni:** Suggerisci nuovo prezzo, Porzione alternativa

#### 🟠 C. METEO → PROMO DINAMICHE

**Condizioni:** Caldo/pioggia/umidità, Giorni lenti
**Output:** "Condizioni ideali per bevande fredde. Opportunità +12%."
**Azioni:** Attiva promo, Evidenzia piatti

#### 🟠 D. CUSTOMER INTELLIGENCE

**Condizioni:** Clienti abituali assenti, Calo retention
**Output:** "Clienti abituali sotto media −18% negli ultimi 7 giorni."
**Azioni:** Messaggio mirato, Promo personalizzata

### Regole UX

- Max 3 trigger attivi/giorno
- Appaiono inline (Dashboard, Orders, Menu, Food cost)
- AI impara da Applica/Ignora

---

## SPRINT 3: CONFIDENCE & TRUST

### Confidence Score

- 🟢 **Alta** (70–100%) - AI sicura
- 🟡 **Media** (40–69%) - AI incerta
- 🔴 **Bassa** (<40%) - AI non consiglia

### Spiegazioni On-Demand

```
[ 🤔 Perché me lo consigli? ]

Risposta (max 3 bullet):
• Meteo simile a 12/01
• Lunedi storicamente sotto media
• Clienti abituali assenti
```

### AI che ammette "non so"

> "Non sono abbastanza sicura per consigliarti un'azione."

### Errori visibili

> "Ieri la promo suggerita non ha performato come previsto (−3%). Sto aggiornando il modello."

### Linguaggio

✅ "Ti consiglio", "Possiamo provare", "La prossima volta migliorerò"
❌ "Il sistema ha calcolato", "L'algoritmo suggerisce"

---

## SPRINT 4: MOBILE COMMAND MODE

### Principi

- Mobile = telecomando, non backoffice
- Target: 8-12 secondi sessione media
- Max 2 decisioni mostrate
- Zero esplorazione

### Schermata Unica

```
🔥 AI COMMAND CENTER
ROOTS · My Khe · 15:42 · 31°C

⚠️ DECISIONI RICHIESTE

🔴 DECISIONE #1 — Overstaffing imminente
Quando: 16:00–18:00 | Impatto: −120€
"Affluenza stimata in calo. Consiglio: rimuovi 1 FOH."
[ ✔️ APPLICA ] [ ❌ IGNORA ]

🟠 DECISIONE #2 — Promo suggerita
Impatto: +8–12%
"Bevande fredde performano oggi. Attivare promo?"
[ 🚀 ATTIVA ] [ ⏰ DOPO ]
```

### Cosa NON esiste su mobile

❌ Menu completo
❌ Analytics
❌ Settings
❌ Tabelle
❌ Configurazioni

### Push Notifications

- Max 2/giorno
- Solo se impatto € reale + finestra temporale breve
- Tap apre direttamente la decisione

---

## SPRINT 5: OPERATIONAL SCENARIOS

### 5 Scenari Madre

#### 🔵 1. GIORNATA LENTA

- Traffico basso, tavoli vuoti
- Azioni: Promo flash, Push bevande, Notifica clienti, Riduci staff

#### 🔴 2. PICCO IMPROVVISO

- Tutto pieno, stress, rischio errori
- Azioni: Pausa piatti lenti, Suggerisci veloci, Rinforza cucina

#### 🟠 3. MARGINI A RISCHIO

- Lavori ma guadagni poco
- Azioni: Correggi prezzo, Riduci porzione, Sostituisci ingrediente

#### 🟢 4. OPPORTUNITÀ

- Condizioni favorevoli da sfruttare
- Azioni: Evidenzia piatti top, Aggiorna QR, Promo soft

#### 🟣 5. CONTROLLO & TRANQUILLITÀ

- Tutto ok
- Output: "Nessuna azione richiesta. Tutto sotto controllo."

### Navigazione

Da moduli (Menu, Orders, Analytics) a Scenari
Le sezioni tecniche diventano strumenti, non destinazioni

---

## KPI AI CO-MANAGER

1. **AI Action Rate** - % suggerimenti applicati (target 25-35%)
2. **Decision Time** - <30s desktop, <10s mobile
3. **AI Silence Quality** - Giorni senza suggerimenti ignorati
4. **Post-Action Delta** - Differenza impatto stimato vs reale
5. **Trust Retention** - % manager che tornano a "Cosa dice l'AI"

---

## AI PERSONALITY MODES (Futuro)

- 🟢 **Prudente** (default) - Pochi suggerimenti, alta confidenza
- 🟠 **Operativo** - Più frequente, focus efficienza
- 🔴 **Aggressivo** - Spinge opportunità, accetta rischio

---

## ROADMAP 6 MESI

### Mese 1-2: Stabilità & Fiducia

- AI Triggers v2 live
- Dashboard AI-first
- Mobile Command Mode
- KPI tracking interno

### Mese 3-4: Anticipazione

- Previsioni multi-giorno
- Scenari combinati (meteo + eventi)
- Suggerimenti "domani / settimana"

### Mese 5-6: Autonomia Parziale

- AI che propone azioni automatiche
- "Applica sempre questo tipo di decisione"
- Autopilot limitato con log visibile

---

## BENCHMARK ISPIRAZIONI

- **Linear** → Priorità, focus, zero rumore
- **Vercel Dashboard** → Signal > data
- **Notion AI** → AI sempre nel contesto
- **Superhuman** → Velocità decisionale
- **Stripe** → Chiarezza + autorevolezza

---

## CITAZIONE CHIAVE

> "Se il manager dice 'Vediamo cosa dice Gudbro oggi', hai vinto. Tutto il resto è rumore."

---

## STATUS

- [x] Audit completato (Atlas - 13 Gen 2026)
- [x] WeatherWidget funzionante
- [x] LearningProgressWidget funzionante
- [x] RLS policies per anon
- [ ] Sprint 1: Dashboard Hero
- [ ] Sprint 2: AI Triggers v2
- [ ] Sprint 3: Confidence Score
- [ ] Sprint 4: Mobile Command
- [ ] Sprint 5: Scenarios
