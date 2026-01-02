-- Colombian Cuisine Database - Script 01: New Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
--
-- New ingredients specific to Colombian cuisine

-- AREPA - Corn flatbread, staple food
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_AREPA',
  'Arepa',
  'arepa',
  'grains',
  'Colombian corn flatbread made from ground maize dough',
  '{"calories": 200, "protein": 4, "carbs": 40, "fat": 2, "fiber": 3}'
) ON CONFLICT (id) DO NOTHING;

-- PANELA - Unrefined cane sugar
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_PANELA',
  'Panela',
  'panela',
  'sweeteners',
  'Unrefined whole cane sugar, used in traditional Colombian drinks',
  '{"calories": 351, "protein": 0, "carbs": 92, "fat": 0, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

-- LULO - Tropical fruit (Naranjilla)
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_LULO',
  'Lulo',
  'lulo',
  'fruits',
  'Colombian tropical fruit also known as naranjilla, citrusy flavor',
  '{"calories": 25, "protein": 1, "carbs": 6, "fat": 0, "fiber": 1}'
) ON CONFLICT (id) DO NOTHING;

-- SOURSOP - Guanábana
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_SOURSOP',
  'Soursop',
  'soursop',
  'fruits',
  'Tropical fruit (guanábana) with creamy white flesh, sweet-sour taste',
  '{"calories": 66, "protein": 1, "carbs": 17, "fat": 0, "fiber": 3}'
) ON CONFLICT (id) DO NOTHING;

-- TILAPIA - Common fish in Colombia
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_TILAPIA',
  'Tilapia',
  'tilapia',
  'seafood',
  'Freshwater fish, popular for frying whole in Colombian coastal cuisine',
  '{"calories": 96, "protein": 20, "carbs": 0, "fat": 2, "fiber": 0}'
) ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Colombian ingredients inserted: AREPA, PANELA, LULO, SOURSOP, TILAPIA' AS status;
