-- ============================================
-- SOFT DRINKS - Missing Ingredients
-- GUDBRO Database Standards v1.3
-- Total: 18 new ingredients
-- ============================================

-- Insert missing ingredients for soft drinks (JSONB format)
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
-- Sweeteners & Additives
('ING_ASPARTAME', 'aspartame', 'Aspartame', 'Artificial sweetener used in diet beverages', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_ERYTHRITOL', 'erythritol', 'Erythritol', 'Natural sugar alcohol sweetener with zero calories', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_CARAMEL_COLOR', 'caramel-color', 'Caramel Color', 'Food coloring made from caramelized sugar', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_NATURAL_FLAVORS', 'natural-flavors', 'Natural Flavors', 'Flavoring derived from natural sources', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Acids & Chemicals
('ING_CITRIC_ACID', 'citric-acid', 'Citric Acid', 'Natural acid found in citrus fruits, used as preservative', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_PHOSPHORIC_ACID', 'phosphoric-acid', 'Phosphoric Acid', 'Acid used in cola beverages for tangy flavor', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_SODIUM_BICARBONATE', 'sodium-bicarbonate', 'Sodium Bicarbonate', 'Baking soda, used for carbonation', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Carbonation & Water
('ING_CARBONATED_WATER', 'carbonated-water', 'Carbonated Water', 'Water infused with carbon dioxide gas', 'beverages',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_MINERAL_SALTS', 'mineral-salts', 'Mineral Salts', 'Natural minerals for enhanced flavor', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Caffeine & Stimulants
('ING_CAFFEINE', 'caffeine', 'Caffeine', 'Natural stimulant found in coffee and tea', 'other',
 '[]'::jsonb, '["caffeine"]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_TAURINE', 'taurine', 'Taurine', 'Amino acid commonly found in energy drinks', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_B_VITAMINS', 'b-vitamins', 'B Vitamins', 'B-complex vitamins for energy metabolism', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_GREEN_TEA_EXTRACT', 'green-tea-extract', 'Green Tea Extract', 'Concentrated extract from green tea leaves', 'herbs',
 '[]'::jsonb, '["caffeine"]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Ginger
('ING_GINGER_EXTRACT', 'ginger-extract', 'Ginger Extract', 'Concentrated ginger flavoring', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_GINGER_ROOT', 'ginger-root', 'Ginger Root', 'Fresh ginger root for brewing', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Botanicals
('ING_QUININE', 'quinine', 'Quinine', 'Bitter compound from cinchona bark, used in tonic water', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_ELDERFLOWER', 'elderflower', 'Elderflower', 'Delicate floral flavoring from elder tree blossoms', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_SASSAFRAS', 'sassafras', 'Sassafras', 'Root bark flavoring used in root beer', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Juices
('ING_MANDARIN_JUICE', 'mandarin-juice', 'Mandarin Juice', 'Sweet juice from mandarin oranges', 'juices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT DO NOTHING;
