# Food Cost - Executive Summary

> Sistema di ottimizzazione margini e menu engineering basato sui dati.

---

## Cosa Fa

Food Cost permette di **calcolare automaticamente il costo reale di ogni piatto** collegando ingredienti, quantita e prezzi di acquisto. Il sistema classifica i piatti usando la **matrice BCG** (Stars, Puzzles, Plowhorses, Dogs) per identificare quali promuovere, riprezziare o eliminare. Include un wizard guidato che porta il ristorante da zero a analisi completa in 5 step.

---

## Perche E' Importante

| Impatto                   | Descrizione                                                                      |
| ------------------------- | -------------------------------------------------------------------------------- |
| **Margini Nascosti**      | I ristoranti scoprono in media €500+/mese di margine nascosto con 2 ore di setup |
| **Pricing Intelligente**  | Identifica piatti sotto-prezzati e guida decisioni di repricing                  |
| **Menu Engineering**      | Mostra quali piatti fanno davvero soldi vs quali sono in perdita                 |
| **Controllo Costi**       | Alert automatici quando i costi ingredienti cambiano                             |
| **Decisioni Data-Driven** | Sostituisce le supposizioni con analisi basate sui dati                          |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                         |
| -------------- | ----------- | -------------------------------------------- |
| Funzionalita   | 🟡 70%      | Core completo, variance alerts in sviluppo   |
| Test Coverage  | ~45%        | Component tests completi, API tests parziali |
| Documentazione | 🟡 Parziale | DEV.md esistente, USER.md da completare      |
| Performance    | ✅ Ottima   | Calcoli automatici via DB triggers           |

---

## Funzionalita Chiave

### Gestione Costi Ingredienti

- Prezzi di acquisto per unita (€/kg, €/pezzo, etc.)
- Info fornitore e SKU
- Conversioni automatiche tra unita

### Calcolo Automatico Margini

- **Food Cost %** = (costo ingredienti / prezzo vendita) x 100
- **Profit Margin %** = (prezzo - costo) / prezzo x 100
- Ricalcolo in tempo reale quando cambiano ricette o prezzi

### Menu Engineering (Matrice BCG)

| Categoria         | Significato                 | Azione                         |
| ----------------- | --------------------------- | ------------------------------ |
| ⭐ **Stars**      | Alto margine, alto volume   | Mantieni e promuovi            |
| ❓ **Puzzles**    | Alto margine, basso volume  | Promuovi per aumentare vendite |
| 🐴 **Plowhorses** | Basso margine, alto volume  | Rivedi pricing o riduci costi  |
| 💀 **Dogs**       | Basso margine, basso volume | Considera rimozione            |

### Onboarding Guidato (5 Step)

1. Briefing educativo su food cost
2. Aggiungi piatti con prezzi
3. Aggiungi ingredienti con quantita e costi
4. Calcolo automatico e classificazione
5. Risultati e suggerimenti AI

### Progress Tracking Gamificato

| Completamento | Feature Sbloccata |
| ------------- | ----------------- |
| 20%           | Margin Analysis   |
| 50%           | Menu Engineering  |
| 75%           | AI Suggestions    |
| 90%           | Variance Alerts   |

---

## Metriche Chiave

| Metrica               | Valore                  |
| --------------------- | ----------------------- |
| Piatti supportati     | Illimitati per location |
| Ingredienti tracciati | 2,548 (sistema)         |
| Precisione calcolo    | ±0.01€                  |
| Latenza update        | Real-time (DB triggers) |
| Lingue supportate     | 4 (EN, VI, KO, JA)      |
| Conversioni unita     | 15                      |
| Benchmark food cost   | 5 tipologie ristorante  |

---

## Benchmark Food Cost per Tipologia

| Tipo Ristorante | Food Cost Target |
| --------------- | ---------------- |
| Casual Dining   | 25-35%           |
| Fine Dining     | 28-38%           |
| Fast Food       | 20-30%           |
| Pizzeria        | 22-32%           |
| Coffee Shop     | 15-25%           |

---

## Competitivita

| Aspetto             | GUDBRO | Toast | MarketMan | BlueCart |
| ------------------- | ------ | ----- | --------- | -------- |
| Calcolo automatico  | ✅     | 🟡    | ✅        | ✅       |
| Matrice BCG         | ✅     | ❌    | 🟡        | ❌       |
| Onboarding guidato  | ✅     | ❌    | ❌        | ❌       |
| Progress gamificato | ✅     | ❌    | ❌        | ❌       |
| Multi-location      | ✅     | ✅    | ✅        | 🟡       |
| Integrato con menu  | ✅     | 🟡    | ❌        | ❌       |

---

## Roadmap

### Completato

- [x] Gestione costi ingredienti
- [x] Calcolo automatico food cost
- [x] Margine di profitto per piatto
- [x] Matrice BCG (Stars, Puzzles, Plowhorses, Dogs)
- [x] Wizard onboarding 5 step
- [x] Progress widget gamificato
- [x] Multi-location support
- [x] Multi-language support

### In Progress

- [ ] Variance alerts (notifica quando costi deviano ±5%)
- [ ] AI suggestions avanzate

### Planned

- [ ] Tracking storico costi (trend nel tempo)
- [ ] Import bulk ingredienti (CSV)
- [ ] Ottimizzazione menu AI
- [ ] Labor cost integration
- [ ] Forecasting stagionale

---

## Rischi & Mitigazioni

| Rischio                    | Probabilita | Impatto | Mitigazione                                  |
| -------------------------- | ----------- | ------- | -------------------------------------------- |
| Costi ingredienti mancanti | Media       | Alto    | Progress widget mostra % completamento       |
| Errori input manuali       | Media       | Medio   | Validazione prezzi (>0 richiesto)            |
| Costi obsoleti             | Bassa       | Medio   | Timestamp `cost_updated_at`, variance alerts |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_

---

## File Principali

| File                                         | Scopo                |
| -------------------------------------------- | -------------------- |
| `app/(routes)/food-cost/page.tsx`            | Dashboard principale |
| `app/(routes)/food-cost/onboarding/page.tsx` | Wizard setup         |
| `components/food-cost/FoodCostProgress.tsx`  | Widget progress      |
| `app/api/food-cost/`                         | API CRUD e stats     |
| `migrations/food_cost_triggers.sql`          | Calcoli automatici   |

---

## Value Proposition

> "Food Cost trasforma 2 ore di setup con lo chef in €500+/mese di margini scoperti.
> La matrice BCG mostra immediatamente quali piatti promuovere, riprezziare o eliminare."

---

_Ultimo aggiornamento: 2026-01-14_
