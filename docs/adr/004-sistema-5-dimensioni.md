# ADR-004: Sistema 5 Dimensioni

**Status:** Accepted
**Date:** 2025-12-16

## Context

I ristoranti devono gestire sicurezza alimentare, preferenze dietetiche e informazioni nutrizionali. Avevamo bisogno di un sistema standardizzato che coprisse tutte le esigenze globali.

## Decision

**Implementare il Sistema 5 Dimensioni** con 66 parametri totali:

| # | Dimensione | Parametri | Dettaglio |
|---|------------|-----------|-----------|
| 1 | **Allergeni** | 30 | EU 14 + Korea 7 + Japan 7 + GUDBRO 2 |
| 2 | **Intolleranze** | 10 | Lactose, FODMAP, Histamine, Caffeine, MSG, etc. |
| 3 | **Diete** | 11 | Vegan, Vegetarian, Halal, Kosher, Keto, etc. |
| 4 | **Nutrizione** | 9 | Calories, Protein, Carbs, Fat, Fiber, etc. |
| 5 | **Piccantezza** | 6 | Scala 0-5 con riferimento Scoville |

### Allergeni (30)

**EU 14 (obbligatori):**
Gluten, Crustaceans, Eggs, Fish, Peanuts, Soybeans, Milk, Tree Nuts, Celery, Mustard, Sesame, Sulfites, Lupin, Mollusks

**Korea 7 (aggiuntivi):**
Buckwheat, Peach, Tomato, Pork, Chicken, Beef, Squid

**Japan 7 (aggiuntivi):**
Abalone, Salmon Roe, Mackerel, Salmon, Walnut, Matsutake, Yam

**GUDBRO 2:**
Alcohol, Caffeine

### Piccantezza (Scala 0-5)

| Livello | Nome | Scoville |
|---------|------|----------|
| 0 | None | 0 |
| 1 | Mild | 1-1,000 |
| 2 | Medium | 1,000-10,000 |
| 3 | Hot | 10,000-50,000 |
| 4 | Very Hot | 50,000-100,000 |
| 5 | Extreme | 100,000+ |

## Consequences

**Positivi:**
- Copertura globale (EU, Korea, Japan)
- Calcolo automatico da ingredienti
- 46 icone SVG per UI
- Conforme a regolamentazioni internazionali

**Negativi:**
- Complessità: 66 parametri per prodotto
- Richiede dati accurati per ogni ingrediente
- Manutenzione delle icone/traduzioni

## Implementazione

- **Source of Truth:** `docs/SISTEMA-FILTRI.md`
- **TypeScript Types:** `shared/database/safety-filters.ts`
- **Icone SVG:** 46 icone in Design System Hub
- **Ogni database food** deve implementare tutte le 5 dimensioni
