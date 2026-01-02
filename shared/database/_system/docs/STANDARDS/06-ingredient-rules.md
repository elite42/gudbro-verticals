# Ingredient Management & Sistema 5 Dimensioni

> Regole per gestione ingredienti e sistema filtri

---

## Formato ingredient_ids

```typescript
ingredient_ids: [
  'ING_BEEF_RIBEYE',      // Principale PRIMA
  'ING_SEA_SALT',
  'ING_BLACK_PEPPER',
  'ING_BUTTER'
]
```

**Regole:**
1. Riferirsi a ID esistenti in `ingredients`
2. Formato: `ING_{NAME}` UPPERCASE
3. Ordine: principale → secondari → condimenti
4. Includere TUTTI gli ingredienti significativi

---

## Verifica Pre-Import

```sql
-- Query per trovare ingredienti mancanti
SELECT DISTINCT unnest(ingredient_ids) as missing_ing
FROM {new_table}
WHERE NOT EXISTS (
  SELECT 1 FROM ingredients i
  WHERE i.id = unnest({new_table}.ingredient_ids)
);
```

---

## ingredient_category (Valori Validi)

```
fruits, vegetables, spices, grains, herbs, proteins, dairy, spirits,
liqueurs, pasta, bread, juices, wines, mixers, eggs, rice, beers,
nuts, sweeteners, oils, condiments, legumes, powders, beverages,
dairy_alternatives, syrups, fats, other
```

**Errore comune:** `nuts_seeds` non esiste → usare `nuts`

---

## Sistema 5 Dimensioni

### Dimensione 1: Allergeni (30)

```typescript
// EU 14 Mandatory
'gluten', 'crustaceans', 'eggs', 'fish', 'peanuts',
'soybeans', 'milk', 'nuts', 'celery', 'mustard',
'sesame', 'sulphites', 'lupin', 'molluscs',

// Korea 7
'pork', 'beef', 'chicken', 'squid', 'peach',

// Japan 7
'shrimp', 'crab', 'wheat', 'buckwheat', 'mackerel',
'salmon_roe', 'abalone',

// Custom
'alcohol', 'caffeine'
```

### Dimensione 2: Intolleranze (10)

- Lactose → `is_dairy_free`
- FODMAP → tag `low-fodmap`
- Histamine → tag `low-histamine`

### Dimensione 3: Diete (11)

| Flag | Implica |
|------|---------|
| `is_vegan` | `is_vegetarian` + `is_dairy_free` |
| `is_vegetarian` | No carne/pesce |
| `is_halal` | Conforme Islam |
| `is_kosher` | Conforme Ebraismo |
| `is_gluten_free` | No glutine |
| `is_dairy_free` | No latticini |
| `is_nut_free` | No frutta secca |

### Dimensione 4: Nutrition

#### Su Ingredienti (campo `nutrition` JSONB)

Valori per 100g di prodotto:

```json
{
  "calories": 250,        // kcal (intero)
  "protein": 5.0,         // g (1 decimale)
  "carbohydrates": 20.0,  // g (1 decimale)
  "fat": 2.0,             // g (1 decimale)
  "fiber": 3.0,           // g (1 decimale)
  "sugar": 1.0,           // g (1 decimale)
  "sodium": 150           // mg (intero)
}
```

**Workflow per nuovi ingredienti:**
1. Creare ingredienti SENZA nutrition (= null)
2. Dopo completamento cucine, backfill con Gemini/ChatGPT
3. Batch da 25 ingredienti per efficienza

**Stato (Dic 2025):** 2026/2053 ingredienti (98.7%) hanno nutrition

#### Su Prodotti (campi singoli, opzionali)

| Campo | Tipo | Unità |
|-------|------|-------|
| `calories_per_serving` | INTEGER | kcal |
| `protein_g` | DECIMAL(5,1) | g |
| `carbs_g` | DECIMAL(5,1) | g |
| `fat_g` | DECIMAL(5,1) | g |

**Nota:** I valori sui prodotti possono essere calcolati automaticamente
sommando i valori degli ingredienti via `product_ingredients`.

### Dimensione 5: Spice Level (6)

| Level | Nome | Scoville | Esempio |
|-------|------|----------|---------|
| 0 | None | 0 | Margherita |
| 1 | Mild | 1-1,000 | Peperoncino dolce |
| 2 | Medium | 1K-10K | Jalapeno |
| 3 | Hot | 10K-50K | Serrano |
| 4 | Very Hot | 50K-100K | Thai chili |
| 5 | Extreme | 100K+ | Habanero |

---

## product_ingredients (Junction Table)

```sql
INSERT INTO product_ingredients
  (product_type, product_id, ingredient_id, quantity_amount, quantity_unit, role, is_optional)
VALUES
  ('turkish', 'TRK_DONER_KEBAB', 'ING_LAMB', 200, 'g', 'main', false);
```

**Colonne:**
| Colonna | Descrizione |
|---------|-------------|
| `product_type` | Nome tabella |
| `product_id` | ID prodotto |
| `ingredient_id` | ID ingrediente |
| `role` | `'main'` o `'secondary'` |
| `is_optional` | Boolean |

**Errore comune:** `is_primary` non esiste → usare `role = 'main'`

---

**File:** `docs/STANDARDS/06-ingredient-rules.md`
