-- ============================================
-- PORTUGUESE CUISINE - Product Ingredients
-- GUDBRO Database Standards v1.7
--
-- Run this AFTER 03-portuguese-data.sql
-- Total: 39 dishes × ~7 ingredients = ~273 links
-- ============================================

-- ============================================
-- BACALHAU (8 dishes)
-- ============================================

-- POR_BACALHAU_BRAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_EGG', 'main', 3),
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_ONION', 'secondary', 4),
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_BLACK_OLIVE', 'garnish', 5),
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_OLIVE_OIL', 'secondary', 6),
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_GARLIC', 'seasoning', 7),
  ('portuguese', 'POR_BACALHAU_BRAS', 'ING_PARSLEY', 'garnish', 8)
ON CONFLICT DO NOTHING;

-- POR_BACALHAU_GOMES_SA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_EGG', 'secondary', 3),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_ONION', 'secondary', 4),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_BLACK_OLIVE', 'garnish', 5),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_OLIVE_OIL', 'secondary', 6),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_GARLIC', 'seasoning', 7),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_PARSLEY', 'garnish', 8),
  ('portuguese', 'POR_BACALHAU_GOMES_SA', 'ING_BAY_LEAF', 'seasoning', 9)
ON CONFLICT DO NOTHING;

-- POR_BACALHAU_NATAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_HEAVY_CREAM', 'sauce', 3),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_BUTTER', 'sauce', 4),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_FLOUR', 'sauce', 5),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_MILK', 'sauce', 6),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_ONION', 'secondary', 7),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_CHEESE', 'secondary', 8),
  ('portuguese', 'POR_BACALHAU_NATAS', 'ING_NUTMEG', 'seasoning', 9)
ON CONFLICT DO NOTHING;

-- POR_BACALHAU_LAGAREIRO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BACALHAU_LAGAREIRO', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_BACALHAU_LAGAREIRO', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_BACALHAU_LAGAREIRO', 'ING_OLIVE_OIL', 'main', 3),
  ('portuguese', 'POR_BACALHAU_LAGAREIRO', 'ING_GARLIC', 'seasoning', 4),
  ('portuguese', 'POR_BACALHAU_LAGAREIRO', 'ING_BAY_LEAF', 'seasoning', 5),
  ('portuguese', 'POR_BACALHAU_LAGAREIRO', 'ING_PARSLEY', 'garnish', 6)
ON CONFLICT DO NOTHING;

-- POR_BACALHAU_ZE_PIPO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BACALHAU_ZE_PIPO', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_BACALHAU_ZE_PIPO', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_BACALHAU_ZE_PIPO', 'ING_MAYONNAISE', 'sauce', 3),
  ('portuguese', 'POR_BACALHAU_ZE_PIPO', 'ING_ONION', 'secondary', 4),
  ('portuguese', 'POR_BACALHAU_ZE_PIPO', 'ING_OLIVE_OIL', 'secondary', 5),
  ('portuguese', 'POR_BACALHAU_ZE_PIPO', 'ING_PARSLEY', 'garnish', 6)
ON CONFLICT DO NOTHING;

-- POR_BACALHAU_ESPIRITUAL
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_CARROT', 'main', 2),
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_BUTTER', 'sauce', 3),
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_FLOUR', 'sauce', 4),
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_MILK', 'sauce', 5),
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_EGG', 'main', 6),
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_ONION', 'secondary', 7),
  ('portuguese', 'POR_BACALHAU_ESPIRITUAL', 'ING_CHEESE', 'secondary', 8)
ON CONFLICT DO NOTHING;

-- POR_PASTEIS_BACALHAU
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_PASTEIS_BACALHAU', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_PASTEIS_BACALHAU', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_PASTEIS_BACALHAU', 'ING_EGG', 'main', 3),
  ('portuguese', 'POR_PASTEIS_BACALHAU', 'ING_ONION', 'secondary', 4),
  ('portuguese', 'POR_PASTEIS_BACALHAU', 'ING_PARSLEY', 'garnish', 5),
  ('portuguese', 'POR_PASTEIS_BACALHAU', 'ING_VEGETABLE_OIL', 'secondary', 6)
ON CONFLICT DO NOTHING;

-- POR_BACALHAU_ASSADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BACALHAU_ASSADO', 'ING_SALT_COD', 'main', 1),
  ('portuguese', 'POR_BACALHAU_ASSADO', 'ING_OLIVE_OIL', 'main', 2),
  ('portuguese', 'POR_BACALHAU_ASSADO', 'ING_GARLIC', 'seasoning', 3),
  ('portuguese', 'POR_BACALHAU_ASSADO', 'ING_POTATO', 'secondary', 4),
  ('portuguese', 'POR_BACALHAU_ASSADO', 'ING_PARSLEY', 'garnish', 5)
ON CONFLICT DO NOTHING;

-- ============================================
-- SEAFOOD (7 dishes)
-- ============================================

-- POR_POLVO_LAGAREIRO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_POLVO_LAGAREIRO', 'ING_OCTOPUS', 'main', 1),
  ('portuguese', 'POR_POLVO_LAGAREIRO', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_POLVO_LAGAREIRO', 'ING_OLIVE_OIL', 'main', 3),
  ('portuguese', 'POR_POLVO_LAGAREIRO', 'ING_GARLIC', 'seasoning', 4),
  ('portuguese', 'POR_POLVO_LAGAREIRO', 'ING_BAY_LEAF', 'seasoning', 5),
  ('portuguese', 'POR_POLVO_LAGAREIRO', 'ING_PARSLEY', 'garnish', 6),
  ('portuguese', 'POR_POLVO_LAGAREIRO', 'ING_SEA_SALT', 'seasoning', 7)
ON CONFLICT DO NOTHING;

-- POR_SARDINHAS_ASSADAS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_SARDINHAS_ASSADAS', 'ING_SARDINE', 'main', 1),
  ('portuguese', 'POR_SARDINHAS_ASSADAS', 'ING_SEA_SALT', 'seasoning', 2),
  ('portuguese', 'POR_SARDINHAS_ASSADAS', 'ING_OLIVE_OIL', 'secondary', 3),
  ('portuguese', 'POR_SARDINHAS_ASSADAS', 'ING_LEMON', 'garnish', 4)
ON CONFLICT DO NOTHING;

-- POR_ARROZ_MARISCO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_RICE', 'main', 1),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_SHRIMP', 'main', 2),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_CLAM', 'main', 3),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_MUSSEL', 'main', 4),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_CRAB', 'main', 5),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_TOMATO', 'secondary', 6),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_ONION', 'secondary', 7),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_GARLIC', 'seasoning', 8),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_OLIVE_OIL', 'secondary', 9),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_WHITE_WINE', 'secondary', 10),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_CILANTRO', 'garnish', 11),
  ('portuguese', 'POR_ARROZ_MARISCO', 'ING_FISH_STOCK', 'secondary', 12)
ON CONFLICT DO NOTHING;

-- POR_AMEIJOAS_BULHAO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_AMEIJOAS_BULHAO', 'ING_CLAM', 'main', 1),
  ('portuguese', 'POR_AMEIJOAS_BULHAO', 'ING_GARLIC', 'main', 2),
  ('portuguese', 'POR_AMEIJOAS_BULHAO', 'ING_CILANTRO', 'main', 3),
  ('portuguese', 'POR_AMEIJOAS_BULHAO', 'ING_OLIVE_OIL', 'secondary', 4),
  ('portuguese', 'POR_AMEIJOAS_BULHAO', 'ING_WHITE_WINE', 'secondary', 5),
  ('portuguese', 'POR_AMEIJOAS_BULHAO', 'ING_LEMON', 'garnish', 6)
ON CONFLICT DO NOTHING;

-- POR_CATAPLANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_CATAPLANA', 'ING_SHRIMP', 'main', 1),
  ('portuguese', 'POR_CATAPLANA', 'ING_CLAM', 'main', 2),
  ('portuguese', 'POR_CATAPLANA', 'ING_MONKFISH', 'main', 3),
  ('portuguese', 'POR_CATAPLANA', 'ING_TOMATO', 'secondary', 4),
  ('portuguese', 'POR_CATAPLANA', 'ING_ONION', 'secondary', 5),
  ('portuguese', 'POR_CATAPLANA', 'ING_BELL_PEPPER', 'secondary', 6),
  ('portuguese', 'POR_CATAPLANA', 'ING_GARLIC', 'seasoning', 7),
  ('portuguese', 'POR_CATAPLANA', 'ING_WHITE_WINE', 'secondary', 8),
  ('portuguese', 'POR_CATAPLANA', 'ING_OLIVE_OIL', 'secondary', 9),
  ('portuguese', 'POR_CATAPLANA', 'ING_CILANTRO', 'garnish', 10),
  ('portuguese', 'POR_CATAPLANA', 'ING_PIRI_PIRI', 'seasoning', 11)
ON CONFLICT DO NOTHING;

-- POR_CALDEIRADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_CALDEIRADA', 'ING_MONKFISH', 'main', 1),
  ('portuguese', 'POR_CALDEIRADA', 'ING_SEA_BASS', 'main', 2),
  ('portuguese', 'POR_CALDEIRADA', 'ING_POTATO', 'main', 3),
  ('portuguese', 'POR_CALDEIRADA', 'ING_TOMATO', 'secondary', 4),
  ('portuguese', 'POR_CALDEIRADA', 'ING_ONION', 'secondary', 5),
  ('portuguese', 'POR_CALDEIRADA', 'ING_BELL_PEPPER', 'secondary', 6),
  ('portuguese', 'POR_CALDEIRADA', 'ING_GARLIC', 'seasoning', 7),
  ('portuguese', 'POR_CALDEIRADA', 'ING_OLIVE_OIL', 'secondary', 8),
  ('portuguese', 'POR_CALDEIRADA', 'ING_PARSLEY', 'garnish', 9),
  ('portuguese', 'POR_CALDEIRADA', 'ING_BAY_LEAF', 'seasoning', 10)
ON CONFLICT DO NOTHING;

-- POR_ACORDA_MARISCO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_ACORDA_MARISCO', 'ING_SHRIMP', 'main', 1),
  ('portuguese', 'POR_ACORDA_MARISCO', 'ING_BREAD', 'main', 2),
  ('portuguese', 'POR_ACORDA_MARISCO', 'ING_EGG', 'main', 3),
  ('portuguese', 'POR_ACORDA_MARISCO', 'ING_GARLIC', 'main', 4),
  ('portuguese', 'POR_ACORDA_MARISCO', 'ING_CILANTRO', 'main', 5),
  ('portuguese', 'POR_ACORDA_MARISCO', 'ING_OLIVE_OIL', 'secondary', 6),
  ('portuguese', 'POR_ACORDA_MARISCO', 'ING_FISH_STOCK', 'secondary', 7)
ON CONFLICT DO NOTHING;

-- ============================================
-- MEAT (8 dishes)
-- ============================================

-- POR_COZIDO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_COZIDO', 'ING_BEEF_BRISKET', 'main', 1),
  ('portuguese', 'POR_COZIDO', 'ING_PORK_RIBS', 'main', 2),
  ('portuguese', 'POR_COZIDO', 'ING_CHICKEN', 'main', 3),
  ('portuguese', 'POR_COZIDO', 'ING_CHORIZO', 'main', 4),
  ('portuguese', 'POR_COZIDO', 'ING_BLOOD_SAUSAGE', 'main', 5),
  ('portuguese', 'POR_COZIDO', 'ING_CABBAGE', 'secondary', 6),
  ('portuguese', 'POR_COZIDO', 'ING_CARROT', 'secondary', 7),
  ('portuguese', 'POR_COZIDO', 'ING_POTATO', 'secondary', 8),
  ('portuguese', 'POR_COZIDO', 'ING_TURNIP', 'secondary', 9),
  ('portuguese', 'POR_COZIDO', 'ING_RICE', 'secondary', 10),
  ('portuguese', 'POR_COZIDO', 'ING_CHICKPEA', 'secondary', 11)
ON CONFLICT DO NOTHING;

-- POR_LEITAO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_LEITAO', 'ING_SUCKLING_PIG', 'main', 1),
  ('portuguese', 'POR_LEITAO', 'ING_GARLIC', 'seasoning', 2),
  ('portuguese', 'POR_LEITAO', 'ING_BAY_LEAF', 'seasoning', 3),
  ('portuguese', 'POR_LEITAO', 'ING_WHITE_WINE', 'secondary', 4),
  ('portuguese', 'POR_LEITAO', 'ING_LARD', 'secondary', 5),
  ('portuguese', 'POR_LEITAO', 'ING_PEPPER_PASTE', 'seasoning', 6),
  ('portuguese', 'POR_LEITAO', 'ING_SEA_SALT', 'seasoning', 7)
ON CONFLICT DO NOTHING;

-- POR_CARNE_ALENTEJANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_PORK_LOIN', 'main', 1),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_CLAM', 'main', 2),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_GARLIC', 'seasoning', 3),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_PAPRIKA', 'seasoning', 4),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_WHITE_WINE', 'secondary', 5),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_BAY_LEAF', 'seasoning', 6),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_OLIVE_OIL', 'secondary', 7),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_CILANTRO', 'garnish', 8),
  ('portuguese', 'POR_CARNE_ALENTEJANA', 'ING_POTATO', 'secondary', 9)
ON CONFLICT DO NOTHING;

-- POR_FEIJOADA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_FEIJOADA', 'ING_WHITE_BEAN', 'main', 1),
  ('portuguese', 'POR_FEIJOADA', 'ING_PORK_BELLY', 'main', 2),
  ('portuguese', 'POR_FEIJOADA', 'ING_CHORIZO', 'main', 3),
  ('portuguese', 'POR_FEIJOADA', 'ING_BLOOD_SAUSAGE', 'main', 4),
  ('portuguese', 'POR_FEIJOADA', 'ING_PORK_EAR', 'main', 5),
  ('portuguese', 'POR_FEIJOADA', 'ING_CABBAGE', 'secondary', 6),
  ('portuguese', 'POR_FEIJOADA', 'ING_CARROT', 'secondary', 7),
  ('portuguese', 'POR_FEIJOADA', 'ING_ONION', 'secondary', 8),
  ('portuguese', 'POR_FEIJOADA', 'ING_GARLIC', 'seasoning', 9),
  ('portuguese', 'POR_FEIJOADA', 'ING_BAY_LEAF', 'seasoning', 10)
ON CONFLICT DO NOTHING;

-- POR_ALHEIRA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_ALHEIRA', 'ING_ALHEIRA', 'main', 1),
  ('portuguese', 'POR_ALHEIRA', 'ING_EGG', 'main', 2),
  ('portuguese', 'POR_ALHEIRA', 'ING_POTATO', 'secondary', 3),
  ('portuguese', 'POR_ALHEIRA', 'ING_VEGETABLE_OIL', 'secondary', 4)
ON CONFLICT DO NOTHING;

-- POR_CABRITO_ASSADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_CABRITO_ASSADO', 'ING_GOAT', 'main', 1),
  ('portuguese', 'POR_CABRITO_ASSADO', 'ING_POTATO', 'main', 2),
  ('portuguese', 'POR_CABRITO_ASSADO', 'ING_GARLIC', 'seasoning', 3),
  ('portuguese', 'POR_CABRITO_ASSADO', 'ING_WHITE_WINE', 'secondary', 4),
  ('portuguese', 'POR_CABRITO_ASSADO', 'ING_OLIVE_OIL', 'secondary', 5),
  ('portuguese', 'POR_CABRITO_ASSADO', 'ING_BAY_LEAF', 'seasoning', 6),
  ('portuguese', 'POR_CABRITO_ASSADO', 'ING_ROSEMARY', 'seasoning', 7)
ON CONFLICT DO NOTHING;

-- POR_CHANFANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_CHANFANA', 'ING_GOAT', 'main', 1),
  ('portuguese', 'POR_CHANFANA', 'ING_RED_WINE', 'main', 2),
  ('portuguese', 'POR_CHANFANA', 'ING_GARLIC', 'seasoning', 3),
  ('portuguese', 'POR_CHANFANA', 'ING_BAY_LEAF', 'seasoning', 4),
  ('portuguese', 'POR_CHANFANA', 'ING_PAPRIKA', 'seasoning', 5),
  ('portuguese', 'POR_CHANFANA', 'ING_BLACK_PEPPER', 'seasoning', 6),
  ('portuguese', 'POR_CHANFANA', 'ING_OLIVE_OIL', 'secondary', 7)
ON CONFLICT DO NOTHING;

-- POR_FRANGO_ASSADO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_FRANGO_ASSADO', 'ING_CHICKEN', 'main', 1),
  ('portuguese', 'POR_FRANGO_ASSADO', 'ING_PIRI_PIRI', 'sauce', 2),
  ('portuguese', 'POR_FRANGO_ASSADO', 'ING_GARLIC', 'seasoning', 3),
  ('portuguese', 'POR_FRANGO_ASSADO', 'ING_LEMON', 'secondary', 4),
  ('portuguese', 'POR_FRANGO_ASSADO', 'ING_OLIVE_OIL', 'secondary', 5),
  ('portuguese', 'POR_FRANGO_ASSADO', 'ING_PAPRIKA', 'seasoning', 6),
  ('portuguese', 'POR_FRANGO_ASSADO', 'ING_BAY_LEAF', 'seasoning', 7)
ON CONFLICT DO NOTHING;

-- ============================================
-- SOUPS (4 dishes)
-- ============================================

-- POR_CALDO_VERDE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_CALDO_VERDE', 'ING_POTATO', 'main', 1),
  ('portuguese', 'POR_CALDO_VERDE', 'ING_COLLARD_GREENS', 'main', 2),
  ('portuguese', 'POR_CALDO_VERDE', 'ING_CHORIZO', 'main', 3),
  ('portuguese', 'POR_CALDO_VERDE', 'ING_ONION', 'secondary', 4),
  ('portuguese', 'POR_CALDO_VERDE', 'ING_GARLIC', 'seasoning', 5),
  ('portuguese', 'POR_CALDO_VERDE', 'ING_OLIVE_OIL', 'secondary', 6),
  ('portuguese', 'POR_CALDO_VERDE', 'ING_SEA_SALT', 'seasoning', 7)
ON CONFLICT DO NOTHING;

-- POR_SOPA_PEDRA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_RED_BEAN', 'main', 1),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_PORK_EAR', 'main', 2),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_CHORIZO', 'main', 3),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_BLOOD_SAUSAGE', 'main', 4),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_CABBAGE', 'secondary', 5),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_POTATO', 'secondary', 6),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_CARROT', 'secondary', 7),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_ONION', 'secondary', 8),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_GARLIC', 'seasoning', 9),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_BAY_LEAF', 'seasoning', 10),
  ('portuguese', 'POR_SOPA_PEDRA', 'ING_CILANTRO', 'garnish', 11)
ON CONFLICT DO NOTHING;

-- POR_ACORDA_ALENTEJANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_ACORDA_ALENTEJANA', 'ING_BREAD', 'main', 1),
  ('portuguese', 'POR_ACORDA_ALENTEJANA', 'ING_EGG', 'main', 2),
  ('portuguese', 'POR_ACORDA_ALENTEJANA', 'ING_GARLIC', 'main', 3),
  ('portuguese', 'POR_ACORDA_ALENTEJANA', 'ING_CILANTRO', 'main', 4),
  ('portuguese', 'POR_ACORDA_ALENTEJANA', 'ING_OLIVE_OIL', 'main', 5),
  ('portuguese', 'POR_ACORDA_ALENTEJANA', 'ING_SEA_SALT', 'seasoning', 6),
  ('portuguese', 'POR_ACORDA_ALENTEJANA', 'ING_WATER', 'secondary', 7)
ON CONFLICT DO NOTHING;

-- POR_CANJA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_CANJA', 'ING_CHICKEN', 'main', 1),
  ('portuguese', 'POR_CANJA', 'ING_RICE', 'main', 2),
  ('portuguese', 'POR_CANJA', 'ING_CARROT', 'secondary', 3),
  ('portuguese', 'POR_CANJA', 'ING_ONION', 'secondary', 4),
  ('portuguese', 'POR_CANJA', 'ING_CELERY', 'secondary', 5),
  ('portuguese', 'POR_CANJA', 'ING_MINT', 'garnish', 6),
  ('portuguese', 'POR_CANJA', 'ING_SEA_SALT', 'seasoning', 7)
ON CONFLICT DO NOTHING;

-- ============================================
-- SANDWICHES (4 dishes)
-- ============================================

-- POR_FRANCESINHA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_FRANCESINHA', 'ING_BREAD', 'main', 1),
  ('portuguese', 'POR_FRANCESINHA', 'ING_HAM', 'main', 2),
  ('portuguese', 'POR_FRANCESINHA', 'ING_LINGUICA', 'main', 3),
  ('portuguese', 'POR_FRANCESINHA', 'ING_BEEF_STEAK', 'main', 4),
  ('portuguese', 'POR_FRANCESINHA', 'ING_CHEESE', 'main', 5),
  ('portuguese', 'POR_FRANCESINHA', 'ING_TOMATO', 'sauce', 6),
  ('portuguese', 'POR_FRANCESINHA', 'ING_BEER', 'sauce', 7),
  ('portuguese', 'POR_FRANCESINHA', 'ING_BUTTER', 'sauce', 8),
  ('portuguese', 'POR_FRANCESINHA', 'ING_PIRI_PIRI', 'sauce', 9),
  ('portuguese', 'POR_FRANCESINHA', 'ING_EGG', 'garnish', 10)
ON CONFLICT DO NOTHING;

-- POR_BIFANA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BIFANA', 'ING_PORK_LOIN', 'main', 1),
  ('portuguese', 'POR_BIFANA', 'ING_BREAD', 'main', 2),
  ('portuguese', 'POR_BIFANA', 'ING_GARLIC', 'seasoning', 3),
  ('portuguese', 'POR_BIFANA', 'ING_WHITE_WINE', 'secondary', 4),
  ('portuguese', 'POR_BIFANA', 'ING_PAPRIKA', 'seasoning', 5),
  ('portuguese', 'POR_BIFANA', 'ING_BAY_LEAF', 'seasoning', 6),
  ('portuguese', 'POR_BIFANA', 'ING_MUSTARD', 'sauce', 7)
ON CONFLICT DO NOTHING;

-- POR_PREGO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_PREGO', 'ING_BEEF_STEAK', 'main', 1),
  ('portuguese', 'POR_PREGO', 'ING_BREAD', 'main', 2),
  ('portuguese', 'POR_PREGO', 'ING_BUTTER', 'sauce', 3),
  ('portuguese', 'POR_PREGO', 'ING_GARLIC', 'seasoning', 4),
  ('portuguese', 'POR_PREGO', 'ING_SEA_SALT', 'seasoning', 5),
  ('portuguese', 'POR_PREGO', 'ING_BLACK_PEPPER', 'seasoning', 6)
ON CONFLICT DO NOTHING;

-- POR_SANDE_LEITAO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_SANDE_LEITAO', 'ING_SUCKLING_PIG', 'main', 1),
  ('portuguese', 'POR_SANDE_LEITAO', 'ING_BREAD', 'main', 2),
  ('portuguese', 'POR_SANDE_LEITAO', 'ING_MUSTARD', 'sauce', 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- DESSERTS (8 dishes)
-- ============================================

-- POR_PASTEL_NATA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_PASTEL_NATA', 'ING_PUFF_PASTRY', 'main', 1),
  ('portuguese', 'POR_PASTEL_NATA', 'ING_EGG_YOLK', 'main', 2),
  ('portuguese', 'POR_PASTEL_NATA', 'ING_SUGAR', 'main', 3),
  ('portuguese', 'POR_PASTEL_NATA', 'ING_MILK', 'main', 4),
  ('portuguese', 'POR_PASTEL_NATA', 'ING_CREAM', 'main', 5),
  ('portuguese', 'POR_PASTEL_NATA', 'ING_VANILLA', 'secondary', 6),
  ('portuguese', 'POR_PASTEL_NATA', 'ING_CINNAMON', 'garnish', 7),
  ('portuguese', 'POR_PASTEL_NATA', 'ING_FLOUR', 'secondary', 8)
ON CONFLICT DO NOTHING;

-- POR_PAO_LO
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_PAO_LO', 'ING_EGG', 'main', 1),
  ('portuguese', 'POR_PAO_LO', 'ING_SUGAR', 'main', 2),
  ('portuguese', 'POR_PAO_LO', 'ING_FLOUR', 'main', 3)
ON CONFLICT DO NOTHING;

-- POR_ARROZ_DOCE
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_ARROZ_DOCE', 'ING_RICE', 'main', 1),
  ('portuguese', 'POR_ARROZ_DOCE', 'ING_MILK', 'main', 2),
  ('portuguese', 'POR_ARROZ_DOCE', 'ING_SUGAR', 'main', 3),
  ('portuguese', 'POR_ARROZ_DOCE', 'ING_EGG_YOLK', 'secondary', 4),
  ('portuguese', 'POR_ARROZ_DOCE', 'ING_LEMON_ZEST', 'secondary', 5),
  ('portuguese', 'POR_ARROZ_DOCE', 'ING_CINNAMON', 'garnish', 6),
  ('portuguese', 'POR_ARROZ_DOCE', 'ING_BUTTER', 'secondary', 7)
ON CONFLICT DO NOTHING;

-- POR_QUEIJADAS_SINTRA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_QUEIJADAS_SINTRA', 'ING_FRESH_CHEESE', 'main', 1),
  ('portuguese', 'POR_QUEIJADAS_SINTRA', 'ING_EGG_YOLK', 'main', 2),
  ('portuguese', 'POR_QUEIJADAS_SINTRA', 'ING_SUGAR', 'main', 3),
  ('portuguese', 'POR_QUEIJADAS_SINTRA', 'ING_FLOUR', 'secondary', 4),
  ('portuguese', 'POR_QUEIJADAS_SINTRA', 'ING_CINNAMON', 'secondary', 5)
ON CONFLICT DO NOTHING;

-- POR_TRAVESSEIROS
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_TRAVESSEIROS', 'ING_PUFF_PASTRY', 'main', 1),
  ('portuguese', 'POR_TRAVESSEIROS', 'ING_ALMOND', 'main', 2),
  ('portuguese', 'POR_TRAVESSEIROS', 'ING_EGG_YOLK', 'main', 3),
  ('portuguese', 'POR_TRAVESSEIROS', 'ING_SUGAR', 'secondary', 4),
  ('portuguese', 'POR_TRAVESSEIROS', 'ING_BUTTER', 'secondary', 5)
ON CONFLICT DO NOTHING;

-- POR_BOLO_REI
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_BOLO_REI', 'ING_FLOUR', 'main', 1),
  ('portuguese', 'POR_BOLO_REI', 'ING_YEAST', 'main', 2),
  ('portuguese', 'POR_BOLO_REI', 'ING_SUGAR', 'main', 3),
  ('portuguese', 'POR_BOLO_REI', 'ING_EGG', 'main', 4),
  ('portuguese', 'POR_BOLO_REI', 'ING_BUTTER', 'main', 5),
  ('portuguese', 'POR_BOLO_REI', 'ING_CANDIED_FRUIT', 'secondary', 6),
  ('portuguese', 'POR_BOLO_REI', 'ING_PINE_NUT', 'secondary', 7),
  ('portuguese', 'POR_BOLO_REI', 'ING_WALNUT', 'secondary', 8),
  ('portuguese', 'POR_BOLO_REI', 'ING_PORT_WINE', 'secondary', 9)
ON CONFLICT DO NOTHING;

-- POR_OVOS_MOLES
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_OVOS_MOLES', 'ING_EGG_YOLK', 'main', 1),
  ('portuguese', 'POR_OVOS_MOLES', 'ING_SUGAR', 'main', 2),
  ('portuguese', 'POR_OVOS_MOLES', 'ING_WAFER', 'main', 3)
ON CONFLICT DO NOTHING;

-- POR_SERRADURA
INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, sort_order)
VALUES
  ('portuguese', 'POR_SERRADURA', 'ING_HEAVY_CREAM', 'main', 1),
  ('portuguese', 'POR_SERRADURA', 'ING_CONDENSED_MILK', 'main', 2),
  ('portuguese', 'POR_SERRADURA', 'ING_MARIE_BISCUIT', 'main', 3)
ON CONFLICT DO NOTHING;

-- Verify counts
SELECT 'Total product_ingredients for portuguese:' as info, COUNT(*) as count
FROM product_ingredients WHERE product_type = 'portuguese';
