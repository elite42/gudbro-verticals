# GUDBRO Centralized Database System

**Version 2.0.0** | **Sistema 5 Dimensioni v3.0**

> **SOURCE OF TRUTH per il Sistema 5 Dimensioni:** `docs/SISTEMA-FILTRI.md`

## Overview

The GUDBRO Centralized Database is a **strategic moat** for the platform - a comprehensive ingredient and product database that automatically computes allergens, intolerances, and dietary compatibility. This system serves as the foundation for Coffee Shops, Restaurants, and Street Food products.

### Key Innovation

**Managers only select ingredients** → System automatically calculates all **5 Dimensioni**:

| # | Dimensione | Elementi | Descrizione |
|---|------------|----------|-------------|
| 1 | **Allergeni** | 30 | Reazioni immuno-mediate (EU 14 + Korea 7 + Japan 7 + GUDBRO 2) |
| 2 | **Intolleranze** | 10 | Reazioni non immuno-mediate (digestive/metaboliche) |
| 3 | **Diete** | 11 | Scelte di stile di vita, religiose o salutistiche |
| 4 | **Fattori Nutrizionali** | 9 | Valori nutrizionali per porzione |
| 5 | **Piccantezza** | 6 livelli | Scala 0-5 con riferimento Scoville |

**Totale Parametri: 66**

## REGOLA D'ORO

> **Ogni volta che si parla di filtri prodotto, sicurezza alimentare, o compatibilità dietetica, TUTTE le 5 dimensioni devono essere considerate.**

## Why This Matters

### 1. **Safety First**
Reduces human error on **potentially LETHAL allergies**. No manual entry of allergen data means fewer mistakes.

### 2. **Ease of Use**
Managers simply select ingredients from a dropdown. All safety data is computed automatically.

### 3. **Multi-Nation Compliance**
Automatic compliance with food safety regulations in:
- EU (EU Regulation 1169/2011)
- USA (FDA FALCPA + Big 9)
- Korea (21 allergens)
- Japan (28 mandatory + recommended)
- Plus: Canada, Australia, China, Singapore, Vietnam

### 4. **Strategic Moat**
- **Network Effects**: More merchants → More ingredients → Better database → More merchants
- **First-Mover Advantage**: Hard to replicate without years of data collection
- **Cross-Vertical Leverage**: Same database serves multiple product types

## Architecture

```
shared/database/
├── cuisines/                 # National & regional cuisines (75 databases)
│   ├── asian/               # Japanese, Korean, Chinese, Thai, Vietnamese, etc.
│   ├── european/            # Italian, French, Spanish, German, British, etc.
│   ├── americas/            # Mexican, Brazilian, Caribbean, Cajun, etc.
│   ├── african/             # Moroccan, Ethiopian, Nigerian, etc.
│   ├── oceania/             # Australian, Hawaiian
│   └── fusion/              # Nikkei, Indo-Chinese, Korean-Mex, Tex-Mex
├── beverages/               # All drink categories
│   ├── cocktails/           # 227 IBA & famous cocktails
│   ├── wines/               # 143 wines
│   ├── spirits/             # 230 spirits
│   ├── coffee/              # 76 coffee drinks
│   └── ...                  # beers, tea, mocktails, smoothies, etc.
├── dishes/                  # Main course categories
│   ├── pasta/               # 87 pasta dishes
│   ├── pizzas/              # 62 pizzas
│   ├── steaks/              # 100 steak cuts
│   └── ...                  # burgers, seafood, breakfast, etc.
├── sides/                   # Accompaniments & starters
│   ├── salads/              # 52 salads
│   ├── appetizers/          # 54 appetizers
│   ├── desserts/            # 35 desserts
│   └── ...                  # soups, bakery, sauces, etc.
├── ingredients/             # Master ingredient database (2548 ingredients)
├── migrations/              # SQL migrations
│   ├── schema/              # Core database schema (001-020)
│   ├── ingredients/         # Ingredient expansions
│   └── nutrition/           # Nutrition data backfills
└── _system/                 # Internal system files
    ├── types/               # TypeScript definitions
    ├── schema/              # Database schema files
    ├── scripts/             # Utility scripts
    ├── utils/               # Auto-computation functions
    └── docs/                # Documentation
```

## Le 5 Dimensioni in Dettaglio

### DIMENSIONE 1: ALLERGENI (30)

#### EU 14 Mandatory (EU Regulation 1169/2011)
1. Gluten, 2. Crustaceans, 3. Eggs, 4. Fish, 5. Peanuts, 6. Soybeans, 7. Milk, 8. Nuts, 9. Celery, 10. Mustard, 11. Sesame, 12. Sulphites, 13. Lupin, 14. Molluscs

#### Korea +7
15. Pork, 16. Peach, 17. Tomato, 18. Beef, 19. Chicken, 20. Squid, 21. Pine nuts

#### Japan +7
22. Kiwi, 23. Banana, 24. Mango, 25. Apple, 26. Orange, 27. Matsutake, 28. Yam

#### GUDBRO +2
29. Coriander (OR6A2 gene), 30. Chili Pepper (Capsaicin)

### DIMENSIONE 2: INTOLLERANZE (10)

1. Lactose, 2. Gluten/Celiac, 3. Fructose, 4. FODMAP, 5. MSG, 6. Histamine, 7. Salicylates, 8. Sulphites, 9. Caffeine, 10. Alcohol

### DIMENSIONE 3: DIETE (11)

**Religious:** Buddhist, Halal, Kosher
**Lifestyle:** Vegetarian, Vegan, Pescatarian
**Health:** Gluten-Free, Dairy-Free, Nut-Free, Low-Carb/Keto, Paleo

### DIMENSIONE 4: FATTORI NUTRIZIONALI (9)

| Campo | Unità |
|-------|-------|
| calories | kcal |
| protein | g |
| carbs | g |
| sugar | g |
| fat | g |
| saturated_fat | g |
| fiber | g |
| salt | g |
| sodium | mg |

### DIMENSIONE 5: PICCANTEZZA (6 livelli)

| Livello | Nome | Scoville (SHU) |
|---------|------|----------------|
| 0 | None | 0 |
| 1 | Mild | 1-1,000 |
| 2 | Medium | 1,000-10,000 |
| 3 | Hot | 10,000-50,000 |
| 4 | Extra Hot | 50,000-100,000 |
| 5 | Extreme | 100,000+ |

## Current Database Stats

| Categoria | Quantità | Status |
|-----------|----------|--------|
| Cocktails | 227 | ✅ |
| Pizzas | 62 | ✅ |
| Beers | 45 | ✅ |
| Salads | 52 | ✅ |
| **Totale** | **386** | |

## Usage Example

```typescript
import { autoComputeProduct } from '@gudbro/shared/database';

// Manager creates a product by selecting ingredients
const cappuccino = {
  ingredients: [
    { ingredient_id: 'ING_ESPRESSO', quantity: { amount: 30, unit: 'ml' } },
    { ingredient_id: 'ING_MILK_OAT', quantity: { amount: 150, unit: 'ml' } }
  ]
};

// AUTO-COMPUTE all 5 dimensions!
const result = autoComputeProduct(cappuccino);

// Result includes:
// - allergens: ['gluten']
// - intolerances: ['caffeine', 'gluten_celiac']
// - diets: { compatible: ['vegan', 'dairy_free'], incompatible: ['gluten_free'] }
// - nutrition: { calories: 120, protein: 3, ... }
// - spice: { level: 0 }
```

## File di Riferimento

| File | Contenuto |
|------|-----------|
| `docs/SISTEMA-FILTRI.md` | **SOURCE OF TRUTH** - Documentazione completa 5 dimensioni |
| `shared/database/safety-filters.ts` | Definizioni allergen/intolerance/diet |
| `shared/database/types/index.ts` | TypeScript interfaces |
| `shared/database/utils/auto-compute.ts` | Auto-computation logic |

## Competitive Advantage

| Competitor | Allergens | Intolerances | Diets | Nutrition | Spice |
|------------|-----------|--------------|-------|-----------|-------|
| Deliveroo | 14 | ❌ | ❌ | ❌ | ❌ |
| UberEats | 9 | ❌ | ❌ | ❌ | ❌ |
| IGREK | 28 | ❌ | ❌ | ❌ | ❌ |
| **GUDBRO** | **30** | **10** | **11** | **9** | **6** |

**GUDBRO: 66 parametri vs competitors max 28 = +135% advantage**

---

**Built with love for merchant safety and customer trust**

*"No more guessing. No more mistakes. Just science-backed safety data across all 5 dimensions."*
