# Content (Menu Management) - Executive Summary

> Gestione catalogo prodotti, menu e calcolo food cost.

---

## Cosa Fa

Content Management permette di **gestire il catalogo globale dei prodotti** (ingredienti, allergeni, nutrizione), **personalizzare per location** (prezzi, disponibilita), e **collegare ricette per calcolo food cost**. Include supporto multi-lingua nativo e sistema automatico di safety flags (allergeni, intolleranze, diete).

---

## Perche E' Importante

| Impatto                 | Descrizione                                           |
| ----------------------- | ----------------------------------------------------- |
| **Margini Profitto**    | Food cost automatico rivela margini nascosti          |
| **Sicurezza Allergie**  | Sistema strutturato previene incidenti critici        |
| **Prezzi Intelligenti** | Override per venue, analisi margini guida repricing   |
| **Menu Agile**          | Cambio rapido categorie/prodotti senza codice         |
| **Centralizzazione**    | Una sorgente di verita per prodotti globali vs locali |

---

## Stato Attuale

| Aspetto        | Stato       | Note                                   |
| -------------- | ----------- | -------------------------------------- |
| Funzionalita   | 🟡 70%      | Catalog/Products OK, /menu placeholder |
| Test Coverage  | ~45%        | Test per food-cost components          |
| Documentazione | 🟡 Parziale | Food Cost ha EXECUTIVE.md              |
| Database       | ✅ 100%     | Schema completo con triggers           |

---

## Funzionalita Chiave

### 1. Catalogo Globale (`/catalog`)

- Grid view con immagini
- Search per nome, filter per categoria
- Badge "GLOBAL" per prodotti centralizzati
- Price override per venue (badge "OVERRIDE")
- Bulk selection e actions (activate/deactivate)
- CSV export con allergens, diets, calories

### 2. Prodotti Locali (`/products`)

- Personalizzazione per singolo locale
- Override prezzi base
- Attivazione/disattivazione selettiva
- Form multi-lingua (EN, IT, VI)

### 3. Product Form

- Tabs per lingua con flag
- Campi: Name, Description, Price, Category, Image
- Ingredient selector (multi-select)
- **Auto-computed safety flags** da ingredienti

### 4. Sistema Safety (5 Dimensioni)

| Dimensione        | Elementi                                    |
| ----------------- | ------------------------------------------- |
| **Allergens**     | 30 tipi (milk, gluten, peanuts, sesame...)  |
| **Intolerances**  | 10 tipi (caffeine, lactose, histamine...)   |
| **Dietary Flags** | 11 tipi (vegan, vegetarian, gluten_free...) |
| **Nutrition**     | Calories (kcal), macros                     |
| **Spice Level**   | 0-5 scala                                   |

### 5. Food Cost Integration

- Collegamento piatti → ingredienti
- Quantita e costi per ingrediente
- Calcolo automatico via DB triggers
- Profit margin % per piatto

### 6. Multi-lingua Nativo

```json
{
  "en": "Espresso",
  "it": "Espresso",
  "vi": "Ca phe Espresso"
}
```

- Supporto: EN, IT, VI, KO, JA

---

## Metriche Chiave

| Metrica             | Valore |
| ------------------- | ------ |
| Allergeni tracciati | 30     |
| Intolleranze        | 10     |
| Dietary flags       | 11     |
| Lingue native       | 5      |
| Prodotti sistema    | ~4653  |
| Ingredienti master  | 2548   |

---

## Competitivita

| Aspetto             | GUDBRO | Toast | Square | Lightspeed |
| ------------------- | ------ | ----- | ------ | ---------- |
| Catalogo globale    | ✅     | ❌    | ❌     | 🟡         |
| Auto safety flags   | ✅     | ❌    | ❌     | ❌         |
| Multi-lingua nativo | ✅     | 🟡    | 🟡     | 🟡         |
| Food cost integrato | ✅     | 🟡    | ❌     | ❌         |
| Price override      | ✅     | ✅    | ✅     | ✅         |
| Bulk actions        | ✅     | 🟡    | 🟡     | 🟡         |

---

## Roadmap

### Completato

- [x] Catalogo globale con search/filter
- [x] Prodotti locali con override
- [x] Form multi-lingua
- [x] Safety flags auto-computed
- [x] CSV export
- [x] Food cost calculation triggers
- [x] Bulk activate/deactivate

### In Progress

- [ ] Completare `/menu` page (attualmente placeholder)

### Planned

- [ ] Menu pricing matrix (BCG)
- [ ] Bulk ingredient import (CSV)
- [ ] Historical cost tracking
- [ ] Real-time inventory sync
- [ ] Dynamic categories (non hardcoded)

---

## Rischi & Mitigazioni

| Rischio               | Probabilita | Impatto | Mitigazione                 |
| --------------------- | ----------- | ------- | --------------------------- |
| /menu incompleta      | Alta        | Medio   | Completare before launch    |
| Categories hardcoded  | Media       | Basso   | Refactor a dinamico         |
| Safety flags mancanti | Bassa       | Alto    | Sistema auto-compute mitiga |

---

## Quick Links

- [Guida Utente](./USER.md) _(da creare)_
- [Documentazione Tecnica](./DEV.md) _(da creare)_
- [Food Cost EXECUTIVE.md](../food-cost/EXECUTIVE.md)

---

## File Principali

| File                                | Scopo                   |
| ----------------------------------- | ----------------------- |
| `app/(dashboard)/catalog/page.tsx`  | Catalogo globale        |
| `app/(dashboard)/products/page.tsx` | Prodotti locali         |
| `app/(dashboard)/menu/page.tsx`     | Placeholder menu        |
| `app/api/food-cost/`                | API food cost           |
| `lib/shared/safety-filters.ts`      | Definizioni allergeni   |
| `app/actions.ts`                    | Server actions prodotti |

---

_Ultimo aggiornamento: 2026-01-14_
