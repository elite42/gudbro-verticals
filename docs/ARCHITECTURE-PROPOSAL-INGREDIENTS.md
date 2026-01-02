# GUDBRO - Proposta Architettura Ingredienti e Traduzioni

> Documento di discussione per ristrutturazione database

---

## Stato Attuale (Problemi)

1. **Ingredienti frammentati**: Ogni database food ha il suo sistema
2. **Traduzioni embedded**: JSONB con en/it/vi in ogni campo
3. **Nessuna master table**: Ingredienti duplicati e inconsistenti
4. **No quantita'**: Appetizers/Desserts hanno solo nomi ingredienti

---

## Architettura Proposta

### 1. Master Ingredients Table

```sql
CREATE TABLE ingredients (
  id TEXT PRIMARY KEY,           -- 'ING_TOMATO_FRESH'
  slug TEXT UNIQUE NOT NULL,     -- 'fresh-tomato'

  -- Base info (ENGLISH ONLY)
  name TEXT NOT NULL,            -- 'Fresh Tomato'
  description TEXT,              -- 'Ripe red tomato...'

  -- Classification
  category TEXT NOT NULL,        -- 'vegetables'
  subcategory TEXT,              -- 'nightshades'

  -- Origin & Sourcing
  origin_country TEXT,           -- 'Italy'
  origin_region TEXT,            -- 'San Marzano'
  seasonality TEXT[],            -- ['summer', 'fall']

  -- Sistema 5 Dimensioni
  allergens TEXT[],              -- ['nightshade']
  intolerances TEXT[],           -- ['histamine']
  dietary JSONB,                 -- {is_vegan: true, is_halal: true, ...}

  -- Nutrition per 100g
  nutrition JSONB,               -- {calories: 18, protein_g: 0.9, ...}

  -- Metadata
  is_common BOOLEAN DEFAULT true,
  is_premium BOOLEAN DEFAULT false,
  shelf_life_days INTEGER,
  storage_temp TEXT,             -- 'room_temp' | 'refrigerated' | 'frozen'

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_ingredients_category ON ingredients(category);
CREATE INDEX idx_ingredients_allergens ON ingredients USING GIN(allergens);
```

### 2. Translations Table (Separata)

```sql
CREATE TABLE translations (
  id SERIAL PRIMARY KEY,

  -- Reference
  entity_type TEXT NOT NULL,     -- 'ingredient' | 'product' | 'category'
  entity_id TEXT NOT NULL,       -- 'ING_TOMATO_FRESH' | 'tiramisu'
  field TEXT NOT NULL,           -- 'name' | 'description' | 'tagline'

  -- Translation
  locale TEXT NOT NULL,          -- 'it' | 'vi' | 'es' | 'fr' | 'de' | 'ko' | 'ja'
  value TEXT NOT NULL,           -- 'Pomodoro Fresco'

  -- Metadata
  is_verified BOOLEAN DEFAULT false,
  translated_by TEXT,            -- 'human' | 'ai' | 'google'
  verified_by TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(entity_type, entity_id, field, locale)
);

-- Indexes
CREATE INDEX idx_translations_entity ON translations(entity_type, entity_id);
CREATE INDEX idx_translations_locale ON translations(locale);
```

### 3. Product-Ingredient Junction

```sql
CREATE TABLE product_ingredients (
  id SERIAL PRIMARY KEY,

  -- References
  product_type TEXT NOT NULL,    -- 'appetizer' | 'dessert' | 'pasta' | 'pizza'
  product_id TEXT NOT NULL,      -- 'tiramisu'
  ingredient_id TEXT NOT NULL REFERENCES ingredients(id),

  -- Quantity
  quantity_amount DECIMAL,       -- 200
  quantity_unit TEXT,            -- 'g' | 'ml' | 'pieces' | 'tbsp'

  -- Role
  role TEXT DEFAULT 'main',      -- 'main' | 'base' | 'topping' | 'garnish' | 'sauce'
  is_optional BOOLEAN DEFAULT false,
  is_signature BOOLEAN DEFAULT false,

  -- Display override (if different from ingredient name)
  display_name_override TEXT,    -- 'Hand-pulled mozzarella' instead of 'Mozzarella'

  -- Order for display
  sort_order INTEGER DEFAULT 0,

  UNIQUE(product_type, product_id, ingredient_id)
);
```

### 4. Products Table (Simplified)

```sql
-- Example: appetizers table (refactored)
CREATE TABLE appetizers (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,

  -- Base info (ENGLISH ONLY)
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  tagline TEXT,

  -- Classification (unchanged)
  style appetizer_style NOT NULL,
  status appetizer_status NOT NULL,
  category appetizer_category NOT NULL,
  serving_temp serving_temperature NOT NULL,

  -- Preparation
  prep_time_min INTEGER,
  cook_time_min INTEGER,
  difficulty TEXT,               -- 'easy' | 'medium' | 'hard'

  -- Characteristics
  is_fried BOOLEAN DEFAULT false,
  is_baked BOOLEAN DEFAULT false,
  is_raw BOOLEAN DEFAULT false,
  spice_level INTEGER DEFAULT 0,

  -- Computed from ingredients (can be cached)
  computed_allergens TEXT[],
  computed_dietary JSONB,
  computed_calories INTEGER,

  -- Origin
  origin_country TEXT,
  origin_region TEXT,

  -- Serving
  portion_size TEXT,
  is_shareable BOOLEAN,
  recommended_pairing TEXT[],

  -- Metadata
  popularity INTEGER DEFAULT 50,
  tags TEXT[],

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Query Examples

### Get product with ingredients (English)
```sql
SELECT
  p.name,
  p.description,
  array_agg(
    json_build_object(
      'name', i.name,
      'quantity', pi.quantity_amount || ' ' || pi.quantity_unit,
      'role', pi.role
    )
  ) as ingredients
FROM appetizers p
JOIN product_ingredients pi ON pi.product_id = p.id AND pi.product_type = 'appetizer'
JOIN ingredients i ON i.id = pi.ingredient_id
WHERE p.id = 'bruschetta-pomodoro'
GROUP BY p.id;
```

### Get product with translations (Italian)
```sql
SELECT
  COALESCE(t_name.value, p.name) as name,
  COALESCE(t_desc.value, p.description) as description
FROM appetizers p
LEFT JOIN translations t_name ON t_name.entity_type = 'product'
  AND t_name.entity_id = p.id
  AND t_name.field = 'name'
  AND t_name.locale = 'it'
LEFT JOIN translations t_desc ON t_desc.entity_type = 'product'
  AND t_desc.entity_id = p.id
  AND t_desc.field = 'description'
  AND t_desc.locale = 'it'
WHERE p.id = 'bruschetta-pomodoro';
```

### Get all allergens for a product (computed from ingredients)
```sql
SELECT DISTINCT unnest(i.allergens) as allergen
FROM product_ingredients pi
JOIN ingredients i ON i.id = pi.ingredient_id
WHERE pi.product_type = 'appetizer' AND pi.product_id = 'bruschetta-pomodoro';
```

---

## Migration Strategy

### Phase 1: Create New Tables
1. Create `ingredients` table
2. Create `translations` table
3. Create `product_ingredients` junction table

### Phase 2: Extract Ingredients
1. Parse all existing `main_ingredients` arrays
2. Deduplicate and standardize names
3. Populate `ingredients` table with Sistema 5 Dimensioni data

### Phase 3: Extract Translations
1. Parse all existing JSONB name/description fields
2. Keep English in main tables
3. Move it/vi to `translations` table

### Phase 4: Link Products to Ingredients
1. Create `product_ingredients` records
2. Add quantities where known (cocktails have them)
3. Mark signature ingredients

### Phase 5: Update Application Layer
1. Create translation helper functions
2. Update API to join with translations
3. Add locale parameter to endpoints

---

## Estimated Ingredient Count

| Source | Estimated Unique Ingredients |
|--------|------------------------------|
| Cocktails (227) | ~150 spirits, mixers, garnishes |
| Pasta (87) | ~80 pasta types, sauces, proteins |
| Pizzas (62) | ~60 toppings, cheeses, bases |
| Salads (52) | ~70 greens, proteins, dressings |
| Appetizers (51) | ~90 meats, cheeses, vegetables |
| Desserts (35) | ~60 dairy, chocolate, fruits |
| Sandwiches (50) | ~50 breads, fillings |
| Burgers (45) | ~40 proteins, toppings |
| Soups (39) | ~50 broths, vegetables |
| Risotti (27) | ~40 rice, broths, additions |
| Beers (45) | ~30 malts, hops (if needed) |
| Dumplings (20) | ~35 wrappers, fillings |

**Estimated Total: ~400-500 unique ingredients** (after deduplication)

---

## Benefits of This Architecture

1. **Single Source of Truth** for ingredients
2. **Automatic allergen calculation** from ingredients
3. **Easy to add languages** without schema changes
4. **Inventory management ready** - ingredients can link to suppliers
5. **Cost calculation** - add cost_per_unit to ingredients
6. **Menu composition** - staff can build new dishes from ingredients
7. **Professional separation** of concerns (data vs translations)

---

## Questions to Decide

1. **Quantita'**: Vogliamo le quantita' precise per tutti i prodotti? (richiede data entry significativo)
2. **Ricette**: Le procedure di preparazione vanno nel DB o in sistema separato?
3. **Costi**: Aggiungiamo il costo per ingrediente per calcolo food cost?
4. **Fornitori**: Linkiamo ingredienti a fornitori?

---

**Proposto da:** Claude Code
**Data:** 2025-12-16
**Status:** Draft per discussione
