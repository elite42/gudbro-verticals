-- Australian Cuisine - New Ingredients
-- Includes exotic proteins (kangaroo, emu) and native ingredients
-- Total: 10 new ingredients

-- 1. Kangaroo - Exotic/Game meat
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_KANGAROO',
  'Kangaroo Meat',
  'kangaroo-meat',
  'proteins',
  'Lean, high-protein meat from Australian kangaroos. Rich in iron and low in fat, with a distinctive gamey flavor similar to venison. A sustainable native protein.',
  '{"calories": 98, "protein": 23, "fat": 1, "carbs": 0, "fiber": 0, "sodium": 50}'
) ON CONFLICT (id) DO NOTHING;

-- 2. Emu - Exotic/Game meat
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_EMU',
  'Emu Meat',
  'emu-meat',
  'proteins',
  'Tender red meat from the native Australian emu bird. Low in fat and cholesterol, high in iron. Tastes similar to beef with a slightly sweet flavor.',
  '{"calories": 103, "protein": 22, "fat": 2, "carbs": 0, "fiber": 0, "sodium": 55}'
) ON CONFLICT (id) DO NOTHING;

-- 3. Barramundi - Australian fish
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_BARRAMUNDI',
  'Barramundi',
  'barramundi',
  'seafood',
  'Australia''s most prized fish. Large freshwater/saltwater fish with delicate white flesh and a mild, buttery flavor. Native to tropical Australian waters.',
  '{"calories": 110, "protein": 23, "fat": 2, "carbs": 0, "fiber": 0, "sodium": 60}'
) ON CONFLICT (id) DO NOTHING;

-- 4. Vegemite - Iconic Australian spread
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_VEGEMITE',
  'Vegemite',
  'vegemite',
  'sauces',
  'Iconic Australian dark brown spread made from brewers yeast extract. Intensely salty and savory, rich in B vitamins. Used sparingly on buttered toast.',
  '{"calories": 174, "protein": 24, "fat": 0, "carbs": 12, "fiber": 0, "sodium": 3450}'
) ON CONFLICT (id) DO NOTHING;

-- 5. Tim Tam - Chocolate biscuit
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_TIM_TAM',
  'Tim Tam',
  'tim-tam',
  'sweeteners',
  'Australia''s most beloved chocolate biscuit. Two chocolate malted biscuits separated by chocolate cream filling, coated in chocolate. Famous for the "Tim Tam Slam."',
  '{"calories": 95, "protein": 1, "fat": 5, "carbs": 12, "fiber": 0.5, "sodium": 40}'
) ON CONFLICT (id) DO NOTHING;

-- 6. Lemon Myrtle - Native Australian herb
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_LEMON_MYRTLE',
  'Lemon Myrtle',
  'lemon-myrtle',
  'herbs',
  'Native Australian herb with an intense lemon flavor, more citrusy than lemon itself. Used in bush tucker cooking, desserts, and tea. High in antioxidants.',
  '{"calories": 30, "protein": 2, "fat": 0.5, "carbs": 5, "fiber": 2, "sodium": 5}'
) ON CONFLICT (id) DO NOTHING;

-- 7. Bush Tomato - Native Australian fruit
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_BUSH_TOMATO',
  'Bush Tomato',
  'bush-tomato',
  'vegetables',
  'Native Australian fruit used in bush tucker cuisine. Small, sun-dried desert fruit with an intense, caramelized tomato and tamarind-like flavor. Used in sauces and seasonings.',
  '{"calories": 45, "protein": 3, "fat": 0.5, "carbs": 8, "fiber": 4, "sodium": 15}'
) ON CONFLICT (id) DO NOTHING;

-- 8. Beef Sausage - Generic beef sausage
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_BEEF_SAUSAGE',
  'Beef Sausage',
  'beef-sausage',
  'proteins',
  'Fresh beef sausage, a staple for Australian barbecues (snags). Ground beef with herbs and spices in natural casings.',
  '{"calories": 230, "protein": 14, "fat": 19, "carbs": 2, "fiber": 0, "sodium": 680}'
) ON CONFLICT (id) DO NOTHING;

-- 9. Lamb Chop - Lamb cutlet
INSERT INTO ingredients (id, name, slug, category, description, nutrition)
VALUES (
  'ING_LAMB_CHOP',
  'Lamb Chop',
  'lamb-chop',
  'proteins',
  'Individual lamb cutlets from the rib or loin. Tender, flavorful cuts perfect for grilling. A staple of Australian barbecue culture.',
  '{"calories": 250, "protein": 25, "fat": 16, "carbs": 0, "fiber": 0, "sodium": 65}'
) ON CONFLICT (id) DO NOTHING;

-- 10. Tartare Sauce exists as ING_TARTAR_SAUCE - no need to add

-- Verification query
SELECT id, name, category FROM ingredients
WHERE id IN (
  'ING_KANGAROO', 'ING_EMU', 'ING_BARRAMUNDI', 'ING_VEGEMITE',
  'ING_TIM_TAM', 'ING_LEMON_MYRTLE', 'ING_BUSH_TOMATO',
  'ING_BEEF_SAUSAGE', 'ING_LAMB_CHOP'
)
ORDER BY id;
