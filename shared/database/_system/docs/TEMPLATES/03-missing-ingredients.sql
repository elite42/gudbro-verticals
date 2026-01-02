-- ============================================
-- TEMPLATE: Missing Ingredients
-- Per ogni nuovo ingrediente, copiare blocco INSERT
-- ============================================
--
-- CAMPI OBBLIGATORI:
--   id, slug, name, category, description
--
-- CAMPI OPZIONALI (ma raccomandati):
--   allergens, intolerances, dietary, nutrition
--
-- NOTA v2.4: nutrition può essere aggiunto in batch
-- alla fine del progetto con workflow AI-assisted
-- ============================================

-- TEMPLATE BASE (senza nutrition)
INSERT INTO ingredients (id, slug, name, category, description)
VALUES (
    'ING_{NAME}',
    '{slug-lowercase}',
    '{Display Name}',
    '{category}',  -- Vedi lista categorie sotto
    '{Description in English}'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TEMPLATE COMPLETO (con nutrition)
-- ============================================
/*
INSERT INTO ingredients (
    id, slug, name, category, description,
    allergens, intolerances, dietary, nutrition
)
VALUES (
    'ING_EXAMPLE',
    'example-ingredient',
    'Example Ingredient',
    'proteins',
    'Description of the ingredient in English.',
    '[]'::jsonb,
    '[]'::jsonb,
    '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb,
    '{
        "per_100g": {
            "calories_kcal": 250,
            "protein_g": 25.0,
            "carbs_g": 0,
            "sugar_g": 0,
            "fat_g": 15.0,
            "saturated_fat_g": 5.0,
            "fiber_g": 0,
            "salt_g": 0.5
        }
    }'::jsonb
)
ON CONFLICT (id) DO NOTHING;
*/

-- ============================================
-- CATEGORIE INGREDIENTI VALIDE
-- (ingredient_category CHECK constraint)
-- ============================================
/*
'proteins'     -- Carni, pesce, uova, tofu
'dairy'        -- Latte, formaggi, yogurt
'grains'       -- Cereali, farine, pasta, riso
'vegetables'   -- Verdure fresche
'fruits'       -- Frutta fresca e secca
'herbs'        -- Erbe aromatiche
'spices'       -- Spezie
'oils'         -- Oli e grassi
'sweeteners'   -- Zuccheri, miele, sciroppi
'nuts'         -- Frutta secca a guscio
'legumes'      -- Legumi
'condiments'   -- Condimenti, salse
'beverages'    -- Bevande base (caffè, tè, latte)
'alcohol'      -- Alcol per cucina
'fats'         -- Burro, lardo, strutto
*/

-- ============================================
-- VERIFICA INGREDIENTE ESISTENTE
-- Prima di aggiungere, verificare nella cache locale:
-- grep "ING_NAME" master-ingredients-cache.ts
-- ============================================
