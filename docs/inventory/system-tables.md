# System Tables Database Inventory

> Tabelle di sistema, ingredienti e junction tables del progetto GUDBRO

**Last Updated**: 2025-12-20

---

## Quick Stats

| Table | Records | Status | Purpose |
|-------|---------|--------|---------|
| ingredients | ~1775 | LIVE | Master ingredients table |
| product_ingredients | ~13950 | LIVE | Junction table (products ↔ ingredients) |
| product_taxonomy | 34 | LIVE | Product classification system |
| translations | 0 | Pending | Multilingual support |

---

## Master Ingredients (~1775)

- **Path**: `shared/database/ingredients/master/`
- **Status**: LIVE in Supabase
- **Schema**: `ingredients/master/schema-v2.sql`
- **Batches**: 12 batch files in `ingredients/master/batches/`
- **Types**: `ingredients/master/types.ts`

### Categories (18 valid)
```
beers, bread, dairy, eggs, fruits, grains, herbs, juices,
liqueurs, mixers, pasta, proteins, rice, spices, spirits,
vegetables, wines, other
```

### Structure
```sql
ingredients (
  id TEXT PRIMARY KEY,        -- ING_TOMATO
  slug TEXT NOT NULL,         -- tomato
  name TEXT NOT NULL,         -- Tomato
  description TEXT,           -- Fresh red tomato
  category TEXT NOT NULL,     -- vegetables
  allergens TEXT[],           -- {}
  is_vegan BOOLEAN,           -- true
  ...
)
```

---

## Product Ingredients (~13950 links)

- **Purpose**: Junction table linking products to ingredients
- **Constraint**: UNIQUE (product_type, product_id, ingredient_id)

### Links by Product Type

| product_type | products | links | avg/product |
|--------------|----------|-------|-------------|
| japanese | 173 | 998 | 5.8 |
| cocktails | 227 | 898 | 4.0 |
| vietnamese | 72 | 800 | 11.1 |
| indian | 65 | 705 | 10.8 |
| thai | 69 | 693 | 10.0 |
| turkish | 98 | 590 | 6.0 |
| chinese | 73 | 589 | 8.1 |
| lebanese | 94 | 560 | 6.0 |
| korean | 77 | 560 | 7.3 |
| vegetarian | 65 | 530 | 8.2 |
| breakfast | 65 | 499 | 7.7 |
| pizzas | 62 | 469 | 7.5 |
| mexican | 66 | 455 | 6.9 |
| greek | 74 | 450 | 6.1 |
| georgian | 74 | 440 | 5.9 |
| fried | 48 | 420 | 8.8 |
| salads | 52 | 416 | 8.0 |
| pasta | 49 | 394 | 8.0 |
| seafood | 63 | 380 | 6.0 |
| steaks | 74 | 320 | 4.3 |
| appetizers | 51 | 241 | 4.7 |
| coffee | 76 | 225 | 3.0 |
| wines | 143 | 212 | 1.5 |
| softdrinks | 35 | 202 | 5.8 |
| brazilian | 91 | 190 | 2.1 |
| burgers | 45 | 173 | 3.8 |
| tea | 62 | 173 | 2.8 |
| beers | 45 | 172 | 3.8 |
| sandwiches | 50 | 155 | 3.1 |
| desserts | 35 | 149 | 4.3 |
| risotti | 27 | 89 | 3.3 |
| soups | 39 | 78 | 2.0 |
| dumplings | 20 | 16 | 0.8 |
| waters | 64 | 0 | N/A |
| **TOTAL** | **2658** | **~13950** | **5.3** |

---

## Product Taxonomy (34 entries)

- **Path**: `shared/database/taxonomy/`
- **Purpose**: Unified classification for all product databases
- **Schema**: `taxonomy/scripts/taxonomy-complete-import.sql`

### Classification Hierarchy
```
Level 1: service_type     → food | beverage
Level 2: menu_type        → traditional_course | standalone | bar_menu | cafe_menu | side_dish
Level 3: category         → appetizer | first_course | second_course | pizza | cocktail | etc.
Level 4: subcategory      → pasta | risotto | soup | meat | fish | salad (optional)
```

### Enables
- Unified queries: "Get all main courses" across steaks, seafood
- Menu building: Traditional multi-course meal ordering
- Filtering: alcoholic vs non-alcoholic, hot vs cold

---

## Translations (Pending)

- **Status**: Schema ready, data pending
- **Purpose**: Multilingual support for all products/ingredients
- **Languages planned**: it, vi, ko, ja
- **Structure**:
```sql
translations (
  entity_type TEXT,   -- 'product' | 'ingredient'
  entity_id TEXT,     -- 'CTL_MOJITO' | 'ING_TOMATO'
  field TEXT,         -- 'name' | 'description'
  locale TEXT,        -- 'it' | 'vi' | 'ko' | 'ja'
  value TEXT          -- Translated text
)
```

