# Procedura: Aggiungere o Modificare Prodotti

> **Guida per aggiungere nuovi piatti o modificare esistenti in un database food**
>
> **Prerequisito:** Database già creato seguendo `PROCEDURE-NEW-DATABASE.md`

---

## Indice

1. [Aggiungere Nuovi Piatti](#1-aggiungere-nuovi-piatti)
2. [Modificare Piatti Esistenti](#2-modificare-piatti-esistenti)
3. [Aggiungere Nuove Categorie/Stili](#3-aggiungere-nuove-categoriestili)
4. [Gestire Ingredienti](#4-gestire-ingredienti)
5. [Query Utili](#5-query-utili)

---

## 1. Aggiungere Nuovi Piatti

### 1.1 Checklist Pre-Aggiunta

```
[ ] ID unico con prefix corretto (es. STK_NEW_DISH)
[ ] Slug unico lowercase-hyphens
[ ] Categoria esistente nella CHECK constraint
[ ] Stile esistente nella CHECK constraint
[ ] Tutti gli ingredienti esistono in master table
[ ] Dati Sistema 5 Dimensioni completi
```

### 1.2 Verificare Ingredienti

Prima di aggiungere un piatto, verifica che tutti gli ingredienti esistano:

```sql
-- Verifica singolo ingrediente
SELECT id FROM ingredients WHERE id = 'ING_NEW_INGREDIENT';

-- Se non esiste, crealo PRIMA (vedi sezione 4)
```

### 1.3 Inserire Nuovo Piatto

```sql
INSERT INTO steaks (
  id, slug, name, description,
  category, status, style,
  cut, weight_g, bone_in, grade, cooking_method, recommended_doneness,
  origin_country, origin_region, serves,
  recommended_sides, wine_pairing, ingredient_ids,
  allergens,
  is_gluten_free, is_dairy_free, is_nut_free,
  is_vegan, is_vegetarian, is_halal, is_kosher,
  calories_per_serving, protein_g, carbs_g, fat_g,
  spice_level, tags, popularity
)
VALUES (
  'STK_NEW_DISH',
  'new-dish-name',
  'New Dish Name',
  'Description in English...',
  'beef_steak',  -- must be in CHECK constraint
  'active',
  'american',    -- must be in CHECK constraint
  'ribeye',
  400,
  false,
  'usda_choice',
  'grilled',
  'medium_rare',
  'United States',
  'Texas',
  1,
  ARRAY['side1', 'side2'],
  ARRAY['wine1', 'wine2'],
  ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER'],
  ARRAY['dairy'],  -- or ARRAY[]::TEXT[] if none
  true,   -- is_gluten_free
  false,  -- is_dairy_free
  true,   -- is_nut_free
  false,  -- is_vegan
  false,  -- is_vegetarian
  false,  -- is_halal
  false,  -- is_kosher
  500,    -- calories
  45.0,   -- protein_g
  0.0,    -- carbs_g
  35.0,   -- fat_g
  0,      -- spice_level (0-5)
  ARRAY['tag1', 'tag2'],
  75      -- popularity (0-100)
);
```

### 1.4 Creare Link product_ingredients

Dopo l'insert del piatto:

```sql
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
SELECT
  'steaks',
  'STK_NEW_DISH',
  unnest(ARRAY['ING_BEEF_RIBEYE', 'ING_SEA_SALT', 'ING_BLACK_PEPPER']),
  'secondary',
  generate_series(1, 3);

-- Aggiorna il primo come primary
UPDATE product_ingredients
SET role = 'primary'
WHERE product_type = 'steaks'
  AND product_id = 'STK_NEW_DISH'
  AND sort_order = 1;
```

---

## 2. Modificare Piatti Esistenti

### 2.1 Modificare Campi Semplici

```sql
-- Aggiornare descrizione
UPDATE steaks
SET description = 'New description...'
WHERE id = 'STK_RIBEYE_CLASSIC';

-- Aggiornare popularity
UPDATE steaks
SET popularity = 90
WHERE id = 'STK_RIBEYE_CLASSIC';

-- Aggiornare spice_level
UPDATE steaks
SET spice_level = 3
WHERE id = 'STK_ADANA_KEBAB';
```

### 2.2 Modificare Array (tags, allergens, ingredient_ids)

```sql
-- Aggiungere tag
UPDATE steaks
SET tags = array_append(tags, 'new_tag')
WHERE id = 'STK_RIBEYE_CLASSIC';

-- Rimuovere tag
UPDATE steaks
SET tags = array_remove(tags, 'old_tag')
WHERE id = 'STK_RIBEYE_CLASSIC';

-- Sostituire completamente
UPDATE steaks
SET tags = ARRAY['tag1', 'tag2', 'tag3']
WHERE id = 'STK_RIBEYE_CLASSIC';

-- Aggiungere ingrediente
UPDATE steaks
SET ingredient_ids = array_append(ingredient_ids, 'ING_NEW')
WHERE id = 'STK_RIBEYE_CLASSIC';
```

### 2.3 Aggiornare product_ingredients dopo modifica ingredienti

Se modifichi `ingredient_ids`, aggiorna anche la junction table:

```sql
-- Rimuovi vecchi links
DELETE FROM product_ingredients
WHERE product_type = 'steaks' AND product_id = 'STK_RIBEYE_CLASSIC';

-- Ricrea links
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
SELECT
  'steaks',
  s.id,
  ing.ingredient_id,
  CASE WHEN ing.ordinality = 1 THEN 'primary' ELSE 'secondary' END,
  ing.ordinality
FROM steaks s,
LATERAL unnest(s.ingredient_ids) WITH ORDINALITY AS ing(ingredient_id, ordinality)
WHERE s.id = 'STK_RIBEYE_CLASSIC';
```

### 2.4 Eliminare un Piatto

```sql
-- Prima elimina i links
DELETE FROM product_ingredients
WHERE product_type = 'steaks' AND product_id = 'STK_OLD_DISH';

-- Poi elimina il piatto
DELETE FROM steaks WHERE id = 'STK_OLD_DISH';
```

---

## 3. Aggiungere Nuove Categorie/Stili

### 3.1 Modificare CHECK Constraint

Per aggiungere una nuova categoria o stile, devi modificare la CHECK constraint:

```sql
-- Step 1: Rimuovi vecchia constraint
ALTER TABLE steaks DROP CONSTRAINT steaks_category_check;

-- Step 2: Crea nuova constraint con valore aggiunto
ALTER TABLE steaks ADD CONSTRAINT steaks_category_check
  CHECK (category IN (
    'beef_steak', 'lamb_game', 'poultry_grill', 'ribs_bbq', 'international_grill',
    'new_category'  -- NUOVO
  ));
```

### 3.2 Aggiungere Nuovo Stile Culinario

```sql
-- Stesso processo per style
ALTER TABLE steaks DROP CONSTRAINT steaks_style_check;

ALTER TABLE steaks ADD CONSTRAINT steaks_style_check
  CHECK (style IN (
    'american', 'italian', 'french', 'argentinian', 'brazilian',
    'japanese', 'korean', 'british', 'australian', 'spanish',
    'german', 'middle_eastern', 'turkish', 'persian', 'portuguese',
    'jamaican', 'indian', 'international',
    'thai'  -- NUOVO
  ));
```

### 3.3 Documentare la Modifica

Dopo aver aggiunto nuove categorie/stili:

1. Aggiorna `types.ts` con il nuovo type
2. Aggiorna `DATABASE-STANDARDS.md` se è un pattern generale
3. Aggiorna `DATABASE-INVENTORY.md` con nota sulla modifica

---

## 4. Gestire Ingredienti

### 4.1 Verificare se Ingrediente Esiste

```sql
SELECT id, name, category FROM ingredients WHERE id = 'ING_NEW_INGREDIENT';
```

### 4.2 Creare Nuovo Ingrediente

```sql
INSERT INTO ingredients (
  id, slug, name, description,
  category, subcategory,
  allergens, dietary, nutrition,
  spice_level, is_common, is_premium, storage_temp
)
VALUES (
  'ING_NEW_INGREDIENT',
  'new-ingredient',
  'New Ingredient',
  'Description...',
  'proteins',       -- categoria
  'beef_cuts',      -- subcategoria
  '{"beef": true}', -- allergens JSONB
  '{"is_meat": true}', -- dietary JSONB
  '{"calories_per_100g": 250, "protein_g": 26, "fat_g": 15}', -- nutrition JSONB
  0,                -- spice_level
  true,             -- is_common
  false,            -- is_premium
  'refrigerated'    -- storage_temp
);
```

### 4.3 Categorie Ingredienti Disponibili

```
spirits, liqueurs, wines, beers, mixers, juices,
dairy, eggs, vegetables, fruits, herbs, spices,
grains, pasta, rice, bread, proteins, seafood,
cheese, oils, vinegars, sauces, condiments, sweeteners,
nuts, seeds, legumes, garnishes, bitters, syrups, other
```

### 4.4 Trovare Ingredienti Orfani

```sql
-- Ingredienti referenziati ma non esistenti
SELECT DISTINCT unnest(ingredient_ids) as missing
FROM steaks
WHERE NOT EXISTS (
  SELECT 1 FROM ingredients i
  WHERE i.id = ANY(steaks.ingredient_ids)
);
```

---

## 5. Query Utili

### 5.1 Statistiche Database

```sql
-- Conteggio per categoria
SELECT category, COUNT(*) as count
FROM steaks GROUP BY category ORDER BY count DESC;

-- Conteggio per stile
SELECT style, COUNT(*) as count
FROM steaks GROUP BY style ORDER BY count DESC;

-- Conteggio per paese
SELECT origin_country, COUNT(*) as count
FROM steaks WHERE origin_country IS NOT NULL
GROUP BY origin_country ORDER BY count DESC;
```

### 5.2 Piatti per Filtri Dietetici

```sql
-- Piatti halal
SELECT id, name FROM steaks WHERE is_halal = true;

-- Piatti senza glutine
SELECT id, name FROM steaks WHERE is_gluten_free = true;

-- Piatti piccanti
SELECT id, name, spice_level FROM steaks WHERE spice_level >= 3;
```

### 5.3 Ricerca per Tag

```sql
-- Piatti con tag specifico
SELECT id, name FROM steaks WHERE 'premium' = ANY(tags);

-- Piatti con uno qualsiasi dei tag
SELECT id, name FROM steaks WHERE tags && ARRAY['bbq', 'smoked'];
```

### 5.4 Piatti per Ingrediente

```sql
-- Tutti i piatti con un ingrediente specifico
SELECT id, name FROM steaks WHERE 'ING_BEEF_RIBEYE' = ANY(ingredient_ids);

-- Conta quanti piatti usano ogni ingrediente
SELECT unnest(ingredient_ids) as ingredient, COUNT(*) as usage_count
FROM steaks GROUP BY 1 ORDER BY 2 DESC LIMIT 20;
```

---

## Errori Comuni

| Errore | Causa | Soluzione |
|--------|-------|-----------|
| `violates check constraint` | Valore non in lista | Aggiungi alla CHECK constraint |
| `duplicate key` | ID/slug già esistente | Usa ID/slug diverso |
| `foreign key violation` | Ingrediente non esiste | Crea ingrediente prima |
| `null value in column` | Campo obbligatorio mancante | Fornisci valore |

---

## Best Practices

1. **Verifica sempre gli ingredienti** prima di inserire un nuovo piatto
2. **Aggiorna product_ingredients** dopo ogni modifica di ingredient_ids
3. **Documenta modifiche alle constraint** in DATABASE-STANDARDS.md
4. **Testa le query** prima di eseguire UPDATE/DELETE
5. **Backup prima di modifiche massive** (export tabella)

---

**File:** `shared/database/PROCEDURE-MODIFY-PRODUCTS.md`
**Created:** 2025-12-18
**Applies to:** Tutti i database food (steaks, pasta, pizzas, etc.)
