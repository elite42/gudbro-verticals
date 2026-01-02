-- Malaysian Cuisine - New Ingredients
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-25
--
-- New ingredients: 10
-- Categories: vegetables, spices, grains, other

-- =====================================================
-- INSERT NEW INGREDIENTS
-- =====================================================
-- Using ON CONFLICT DO NOTHING for safety

INSERT INTO ingredients (id, slug, name, category, allergens, dietary)
VALUES
  -- Flowers and Leaves
  ('ING_BUTTERFLY_PEA', 'butterfly-pea-flower', 'Butterfly Pea Flower', 'other',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  ('ING_CURRY_LEAF', 'curry-leaf', 'Curry Leaves', 'spices',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  ('ING_TURMERIC_LEAF', 'turmeric-leaf', 'Turmeric Leaves', 'spices',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  ('ING_TORCH_GINGER', 'torch-ginger', 'Torch Ginger Flower', 'vegetables',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  -- Legumes/Vegetables
  ('ING_PETAI', 'petai', 'Petai (Stink Beans)', 'vegetables',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  -- Grains/Starches
  ('ING_SAGO', 'sago-pearls', 'Sago Pearls', 'grains',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  ('ING_YELLOW_NOODLE', 'yellow-egg-noodles', 'Yellow Egg Noodles', 'grains',
   '{"gluten": true, "eggs": true}'::jsonb,
   '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  -- Condiments/Pastes
  ('ING_KERISIK', 'kerisik', 'Kerisik (Toasted Coconut Paste)', 'other',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb),

  -- Fats
  ('ING_MARGARINE', 'margarine', 'Margarine', 'fats',
   '{"dairy": true}'::jsonb,
   '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": false, "is_halal": true, "is_kosher": true}'::jsonb),

  -- Syrups
  ('ING_ROSE_SYRUP', 'rose-syrup', 'Rose Syrup', 'sweeteners',
   '[]'::jsonb,
   '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true, "is_dairy_free": true, "is_halal": true, "is_kosher": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICATION
-- =====================================================
SELECT 'New Malaysian ingredients' AS status, COUNT(*) AS count
FROM ingredients
WHERE id IN (
  'ING_BUTTERFLY_PEA', 'ING_CURRY_LEAF', 'ING_KERISIK', 'ING_MARGARINE',
  'ING_PETAI', 'ING_ROSE_SYRUP', 'ING_SAGO', 'ING_TORCH_GINGER',
  'ING_TURMERIC_LEAF', 'ING_YELLOW_NOODLE'
);
