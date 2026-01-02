-- ============================================
-- BRITISH CUISINE - Product Ingredients Links
-- GUDBRO Database Standards v1.7
-- ============================================
-- Total: 44 dishes x ~7 ingredients avg = ~308 links
-- Structure: role ('main'/'secondary'), is_optional, sort_order

-- Helper function to insert product_ingredients
DO $$
DECLARE
  v_product_type TEXT := 'british';
BEGIN
  -- Delete existing links for british products
  DELETE FROM product_ingredients WHERE product_type = v_product_type;

  -- ============================================
  -- BREAKFAST (6 dishes)
  -- ============================================

  -- BRI_FULL_ENGLISH (9 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_BACON', 'main', false, 1),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_EGG', 'main', false, 2),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_SAUSAGE', 'main', false, 3),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_BAKED_BEANS', 'main', false, 4),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_TOMATO', 'secondary', false, 5),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_MUSHROOM', 'secondary', false, 6),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_BREAD', 'secondary', false, 7),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_BLACK_PUDDING', 'secondary', true, 8),
    (v_product_type, 'BRI_FULL_ENGLISH', 'ING_BUTTER', 'secondary', false, 9);

  -- BRI_KEDGEREE (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_KEDGEREE', 'ING_SMOKED_HADDOCK', 'main', false, 1),
    (v_product_type, 'BRI_KEDGEREE', 'ING_RICE', 'main', false, 2),
    (v_product_type, 'BRI_KEDGEREE', 'ING_EGG', 'main', false, 3),
    (v_product_type, 'BRI_KEDGEREE', 'ING_CURRY_POWDER', 'secondary', false, 4),
    (v_product_type, 'BRI_KEDGEREE', 'ING_PARSLEY', 'secondary', false, 5),
    (v_product_type, 'BRI_KEDGEREE', 'ING_BUTTER', 'secondary', false, 6),
    (v_product_type, 'BRI_KEDGEREE', 'ING_ONION', 'secondary', false, 7),
    (v_product_type, 'BRI_KEDGEREE', 'ING_CREAM', 'secondary', true, 8);

  -- BRI_KIPPERS (4 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_KIPPERS', 'ING_KIPPER', 'main', false, 1),
    (v_product_type, 'BRI_KIPPERS', 'ING_BUTTER', 'secondary', false, 2),
    (v_product_type, 'BRI_KIPPERS', 'ING_BREAD', 'secondary', false, 3),
    (v_product_type, 'BRI_KIPPERS', 'ING_LEMON', 'secondary', true, 4);

  -- BRI_PORRIDGE (5 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_PORRIDGE', 'ING_OATS', 'main', false, 1),
    (v_product_type, 'BRI_PORRIDGE', 'ING_MILK', 'main', false, 2),
    (v_product_type, 'BRI_PORRIDGE', 'ING_HONEY', 'secondary', true, 3),
    (v_product_type, 'BRI_PORRIDGE', 'ING_SALT', 'secondary', true, 4),
    (v_product_type, 'BRI_PORRIDGE', 'ING_CREAM', 'secondary', true, 5);

  -- BRI_EGGS_BENEDICT (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_EGGS_BENEDICT', 'ING_EGG', 'main', false, 1),
    (v_product_type, 'BRI_EGGS_BENEDICT', 'ING_ENGLISH_MUFFIN', 'main', false, 2),
    (v_product_type, 'BRI_EGGS_BENEDICT', 'ING_CANADIAN_BACON', 'main', false, 3),
    (v_product_type, 'BRI_EGGS_BENEDICT', 'ING_BUTTER', 'main', false, 4),
    (v_product_type, 'BRI_EGGS_BENEDICT', 'ING_LEMON', 'secondary', false, 5),
    (v_product_type, 'BRI_EGGS_BENEDICT', 'ING_EGG_YOLK', 'main', false, 6);

  -- BRI_BEANS_ON_TOAST (3 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BEANS_ON_TOAST', 'ING_BAKED_BEANS', 'main', false, 1),
    (v_product_type, 'BRI_BEANS_ON_TOAST', 'ING_BREAD', 'main', false, 2),
    (v_product_type, 'BRI_BEANS_ON_TOAST', 'ING_BUTTER', 'secondary', false, 3);

  -- ============================================
  -- MAIN DISHES (10 dishes)
  -- ============================================

  -- BRI_ROAST_BEEF (10 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_BEEF_ROAST', 'main', false, 1),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_CARROT', 'secondary', false, 3),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_PARSNIP', 'secondary', false, 4),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_ONION', 'secondary', false, 5),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_BEEF_STOCK', 'secondary', false, 6),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_FLOUR', 'secondary', false, 7),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_EGG', 'secondary', false, 8),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_MILK', 'secondary', false, 9),
    (v_product_type, 'BRI_ROAST_BEEF', 'ING_HORSERADISH', 'secondary', true, 10);

  -- BRI_SHEPHERDS_PIE (9 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_LAMB_MINCE', 'main', false, 1),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_ONION', 'secondary', false, 3),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_CARROT', 'secondary', false, 4),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_PEAS', 'secondary', false, 5),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_BEEF_STOCK', 'secondary', false, 6),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_BUTTER', 'secondary', false, 7),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_MILK', 'secondary', false, 8),
    (v_product_type, 'BRI_SHEPHERDS_PIE', 'ING_WORCESTERSHIRE', 'secondary', false, 9);

  -- BRI_COTTAGE_PIE (9 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_BEEF_MINCE', 'main', false, 1),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_ONION', 'secondary', false, 3),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_CARROT', 'secondary', false, 4),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_PEAS', 'secondary', false, 5),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_BEEF_STOCK', 'secondary', false, 6),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_BUTTER', 'secondary', false, 7),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_MILK', 'secondary', false, 8),
    (v_product_type, 'BRI_COTTAGE_PIE', 'ING_TOMATO_PASTE', 'secondary', false, 9);

  -- BRI_BEEF_WELLINGTON (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_BEEF_TENDERLOIN', 'main', false, 1),
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_PUFF_PASTRY', 'main', false, 2),
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_MUSHROOM', 'main', false, 3),
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_PATE', 'main', false, 4),
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_EGG', 'secondary', false, 5),
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_SHALLOT', 'secondary', false, 6),
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_THYME', 'secondary', false, 7),
    (v_product_type, 'BRI_BEEF_WELLINGTON', 'ING_DIJON_MUSTARD', 'secondary', false, 8);

  -- BRI_LANCASHIRE_HOTPOT (9 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_LAMB_CHOPS', 'main', false, 1),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_LAMB_KIDNEY', 'main', false, 2),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_POTATO', 'main', false, 3),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_ONION', 'secondary', false, 4),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_CARROT', 'secondary', false, 5),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_BEEF_STOCK', 'secondary', false, 6),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_BUTTER', 'secondary', false, 7),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_BAY_LEAVES', 'secondary', false, 8),
    (v_product_type, 'BRI_LANCASHIRE_HOTPOT', 'ING_THYME', 'secondary', false, 9);

  -- BRI_STEAK_KIDNEY_PIE (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_BEEF_CHUCK', 'main', false, 1),
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_BEEF_KIDNEY', 'main', false, 2),
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_SHORTCRUST_PASTRY', 'main', false, 3),
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_ONION', 'secondary', false, 4),
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_BEEF_STOCK', 'secondary', false, 5),
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_FLOUR', 'secondary', false, 6),
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_WORCESTERSHIRE', 'secondary', false, 7),
    (v_product_type, 'BRI_STEAK_KIDNEY_PIE', 'ING_THYME', 'secondary', false, 8);

  -- BRI_TOAD_IN_HOLE (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_TOAD_IN_HOLE', 'ING_SAUSAGE', 'main', false, 1),
    (v_product_type, 'BRI_TOAD_IN_HOLE', 'ING_FLOUR', 'main', false, 2),
    (v_product_type, 'BRI_TOAD_IN_HOLE', 'ING_EGG', 'main', false, 3),
    (v_product_type, 'BRI_TOAD_IN_HOLE', 'ING_MILK', 'secondary', false, 4),
    (v_product_type, 'BRI_TOAD_IN_HOLE', 'ING_ONION', 'secondary', false, 5),
    (v_product_type, 'BRI_TOAD_IN_HOLE', 'ING_BEEF_STOCK', 'secondary', false, 6),
    (v_product_type, 'BRI_TOAD_IN_HOLE', 'ING_VEGETABLE_OIL', 'secondary', false, 7);

  -- BRI_BANGERS_MASH (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BANGERS_MASH', 'ING_SAUSAGE', 'main', false, 1),
    (v_product_type, 'BRI_BANGERS_MASH', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_BANGERS_MASH', 'ING_BUTTER', 'secondary', false, 3),
    (v_product_type, 'BRI_BANGERS_MASH', 'ING_MILK', 'secondary', false, 4),
    (v_product_type, 'BRI_BANGERS_MASH', 'ING_ONION', 'secondary', false, 5),
    (v_product_type, 'BRI_BANGERS_MASH', 'ING_BEEF_STOCK', 'secondary', false, 6),
    (v_product_type, 'BRI_BANGERS_MASH', 'ING_GRAVY', 'secondary', false, 7);

  -- BRI_CHICKEN_TIKKA_MASALA (10 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_CHICKEN', 'main', false, 1),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_YOGURT', 'main', false, 2),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_TOMATO', 'main', false, 3),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_CREAM', 'main', false, 4),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_ONION', 'secondary', false, 5),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_GARLIC', 'secondary', false, 6),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_GINGER', 'secondary', false, 7),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_GARAM_MASALA', 'secondary', false, 8),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_CUMIN', 'secondary', false, 9),
    (v_product_type, 'BRI_CHICKEN_TIKKA_MASALA', 'ING_CORIANDER', 'secondary', false, 10);

  -- BRI_BEEF_STEW (10 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BEEF_STEW', 'ING_BEEF_CHUCK', 'main', false, 1),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_CARROT', 'secondary', false, 3),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_ONION', 'secondary', false, 4),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_CELERY', 'secondary', false, 5),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_BEEF_STOCK', 'secondary', false, 6),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_FLOUR', 'secondary', false, 7),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_TOMATO_PASTE', 'secondary', false, 8),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_BAY_LEAVES', 'secondary', false, 9),
    (v_product_type, 'BRI_BEEF_STEW', 'ING_THYME', 'secondary', false, 10);

  -- ============================================
  -- PUB DISHES (8 dishes)
  -- ============================================

  -- BRI_FISH_CHIPS (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_COD', 'main', false, 1),
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_FLOUR', 'main', false, 3),
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_BEER', 'secondary', false, 4),
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_PEAS', 'secondary', true, 5),
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_VEGETABLE_OIL', 'secondary', false, 6),
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_LEMON', 'secondary', true, 7),
    (v_product_type, 'BRI_FISH_CHIPS', 'ING_TARTAR_SAUCE', 'secondary', true, 8);

  -- BRI_PLOUGHMANS_LUNCH (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_CHEDDAR', 'main', false, 1),
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_BREAD', 'main', false, 2),
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_HAM', 'main', false, 3),
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_PICKLED_ONION', 'secondary', false, 4),
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_BRANSTON_PICKLE', 'secondary', false, 5),
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_APPLE', 'secondary', true, 6),
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_LETTUCE', 'secondary', true, 7),
    (v_product_type, 'BRI_PLOUGHMANS_LUNCH', 'ING_CELERY', 'secondary', true, 8);

  -- BRI_SCOTCH_EGG (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_SCOTCH_EGG', 'ING_EGG', 'main', false, 1),
    (v_product_type, 'BRI_SCOTCH_EGG', 'ING_SAUSAGE_MEAT', 'main', false, 2),
    (v_product_type, 'BRI_SCOTCH_EGG', 'ING_BREADCRUMBS', 'main', false, 3),
    (v_product_type, 'BRI_SCOTCH_EGG', 'ING_FLOUR', 'secondary', false, 4),
    (v_product_type, 'BRI_SCOTCH_EGG', 'ING_VEGETABLE_OIL', 'secondary', false, 5),
    (v_product_type, 'BRI_SCOTCH_EGG', 'ING_SAGE', 'secondary', false, 6),
    (v_product_type, 'BRI_SCOTCH_EGG', 'ING_NUTMEG', 'secondary', false, 7);

  -- BRI_PORK_PIE (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_PORK_PIE', 'ING_PORK', 'main', false, 1),
    (v_product_type, 'BRI_PORK_PIE', 'ING_FLOUR', 'main', false, 2),
    (v_product_type, 'BRI_PORK_PIE', 'ING_LARD', 'main', false, 3),
    (v_product_type, 'BRI_PORK_PIE', 'ING_PORK_GELATIN', 'secondary', false, 4),
    (v_product_type, 'BRI_PORK_PIE', 'ING_SALT', 'secondary', false, 5),
    (v_product_type, 'BRI_PORK_PIE', 'ING_WHITE_PEPPER', 'secondary', false, 6),
    (v_product_type, 'BRI_PORK_PIE', 'ING_SAGE', 'secondary', false, 7),
    (v_product_type, 'BRI_PORK_PIE', 'ING_ANCHOVY', 'secondary', true, 8);

  -- BRI_SAUSAGE_ROLL (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_SAUSAGE_ROLL', 'ING_SAUSAGE_MEAT', 'main', false, 1),
    (v_product_type, 'BRI_SAUSAGE_ROLL', 'ING_PUFF_PASTRY', 'main', false, 2),
    (v_product_type, 'BRI_SAUSAGE_ROLL', 'ING_EGG', 'secondary', false, 3),
    (v_product_type, 'BRI_SAUSAGE_ROLL', 'ING_ONION', 'secondary', false, 4),
    (v_product_type, 'BRI_SAUSAGE_ROLL', 'ING_SAGE', 'secondary', false, 5),
    (v_product_type, 'BRI_SAUSAGE_ROLL', 'ING_THYME', 'secondary', false, 6);

  -- BRI_CORNISH_PASTY (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_CORNISH_PASTY', 'ING_BEEF_SKIRT', 'main', false, 1),
    (v_product_type, 'BRI_CORNISH_PASTY', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_CORNISH_PASTY', 'ING_SWEDE', 'main', false, 3),
    (v_product_type, 'BRI_CORNISH_PASTY', 'ING_ONION', 'secondary', false, 4),
    (v_product_type, 'BRI_CORNISH_PASTY', 'ING_SHORTCRUST_PASTRY', 'main', false, 5),
    (v_product_type, 'BRI_CORNISH_PASTY', 'ING_BUTTER', 'secondary', false, 6),
    (v_product_type, 'BRI_CORNISH_PASTY', 'ING_BLACK_PEPPER', 'secondary', false, 7);

  -- BRI_CHIP_BUTTY (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_CHIP_BUTTY', 'ING_POTATO', 'main', false, 1),
    (v_product_type, 'BRI_CHIP_BUTTY', 'ING_BREAD', 'main', false, 2),
    (v_product_type, 'BRI_CHIP_BUTTY', 'ING_BUTTER', 'secondary', false, 3),
    (v_product_type, 'BRI_CHIP_BUTTY', 'ING_VEGETABLE_OIL', 'secondary', false, 4),
    (v_product_type, 'BRI_CHIP_BUTTY', 'ING_SALT', 'secondary', false, 5),
    (v_product_type, 'BRI_CHIP_BUTTY', 'ING_VINEGAR', 'secondary', true, 6);

  -- BRI_JACKET_POTATO (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_JACKET_POTATO', 'ING_POTATO', 'main', false, 1),
    (v_product_type, 'BRI_JACKET_POTATO', 'ING_BUTTER', 'secondary', false, 2),
    (v_product_type, 'BRI_JACKET_POTATO', 'ING_CHEDDAR', 'secondary', true, 3),
    (v_product_type, 'BRI_JACKET_POTATO', 'ING_BAKED_BEANS', 'secondary', true, 4),
    (v_product_type, 'BRI_JACKET_POTATO', 'ING_SOUR_CREAM', 'secondary', true, 5),
    (v_product_type, 'BRI_JACKET_POTATO', 'ING_CHIVES', 'secondary', true, 6);

  -- ============================================
  -- SEAFOOD DISHES (5 dishes)
  -- ============================================

  -- BRI_FISH_PIE (10 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_FISH_PIE', 'ING_SALMON', 'main', false, 1),
    (v_product_type, 'BRI_FISH_PIE', 'ING_COD', 'main', false, 2),
    (v_product_type, 'BRI_FISH_PIE', 'ING_SMOKED_HADDOCK', 'main', false, 3),
    (v_product_type, 'BRI_FISH_PIE', 'ING_SHRIMP', 'main', false, 4),
    (v_product_type, 'BRI_FISH_PIE', 'ING_POTATO', 'main', false, 5),
    (v_product_type, 'BRI_FISH_PIE', 'ING_BUTTER', 'secondary', false, 6),
    (v_product_type, 'BRI_FISH_PIE', 'ING_MILK', 'secondary', false, 7),
    (v_product_type, 'BRI_FISH_PIE', 'ING_FLOUR', 'secondary', false, 8),
    (v_product_type, 'BRI_FISH_PIE', 'ING_CREAM', 'secondary', false, 9),
    (v_product_type, 'BRI_FISH_PIE', 'ING_PARSLEY', 'secondary', false, 10);

  -- BRI_CULLEN_SKINK (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_SMOKED_HADDOCK', 'main', false, 1),
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_ONION', 'secondary', false, 3),
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_MILK', 'main', false, 4),
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_BUTTER', 'secondary', false, 5),
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_CREAM', 'secondary', true, 6),
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_PARSLEY', 'secondary', false, 7),
    (v_product_type, 'BRI_CULLEN_SKINK', 'ING_BAY_LEAVES', 'secondary', false, 8);

  -- BRI_JELLIED_EELS (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_JELLIED_EELS', 'ING_EEL', 'main', false, 1),
    (v_product_type, 'BRI_JELLIED_EELS', 'ING_VINEGAR', 'secondary', false, 2),
    (v_product_type, 'BRI_JELLIED_EELS', 'ING_LEMON', 'secondary', false, 3),
    (v_product_type, 'BRI_JELLIED_EELS', 'ING_BAY_LEAVES', 'secondary', false, 4),
    (v_product_type, 'BRI_JELLIED_EELS', 'ING_NUTMEG', 'secondary', false, 5),
    (v_product_type, 'BRI_JELLIED_EELS', 'ING_PEPPERCORN', 'secondary', false, 6),
    (v_product_type, 'BRI_JELLIED_EELS', 'ING_SALT', 'secondary', false, 7);

  -- BRI_MOULES_CHIPS (9 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_MUSSELS', 'main', false, 1),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_WHITE_WINE', 'main', false, 2),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_GARLIC', 'secondary', false, 3),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_SHALLOT', 'secondary', false, 4),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_CREAM', 'secondary', false, 5),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_PARSLEY', 'secondary', false, 6),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_POTATO', 'main', false, 7),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_VEGETABLE_OIL', 'secondary', false, 8),
    (v_product_type, 'BRI_MOULES_CHIPS', 'ING_BREAD', 'secondary', true, 9);

  -- BRI_FISH_FINGER_SANDWICH (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_FISH_FINGER_SANDWICH', 'ING_FISH_FINGERS', 'main', false, 1),
    (v_product_type, 'BRI_FISH_FINGER_SANDWICH', 'ING_BREAD', 'main', false, 2),
    (v_product_type, 'BRI_FISH_FINGER_SANDWICH', 'ING_BUTTER', 'secondary', false, 3),
    (v_product_type, 'BRI_FISH_FINGER_SANDWICH', 'ING_TARTAR_SAUCE', 'secondary', true, 4),
    (v_product_type, 'BRI_FISH_FINGER_SANDWICH', 'ING_LETTUCE', 'secondary', true, 5),
    (v_product_type, 'BRI_FISH_FINGER_SANDWICH', 'ING_LEMON', 'secondary', true, 6);

  -- ============================================
  -- REGIONAL DISHES (7 dishes)
  -- ============================================

  -- BRI_HAGGIS (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_HAGGIS', 'ING_LAMB_OFFAL', 'main', false, 1),
    (v_product_type, 'BRI_HAGGIS', 'ING_OATS', 'main', false, 2),
    (v_product_type, 'BRI_HAGGIS', 'ING_ONION', 'secondary', false, 3),
    (v_product_type, 'BRI_HAGGIS', 'ING_SUET', 'main', false, 4),
    (v_product_type, 'BRI_HAGGIS', 'ING_LAMB_STOCK', 'secondary', false, 5),
    (v_product_type, 'BRI_HAGGIS', 'ING_NUTMEG', 'secondary', false, 6),
    (v_product_type, 'BRI_HAGGIS', 'ING_CAYENNE', 'secondary', false, 7),
    (v_product_type, 'BRI_HAGGIS', 'ING_BLACK_PEPPER', 'secondary', false, 8);

  -- BRI_WELSH_RAREBIT (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_CHEDDAR', 'main', false, 1),
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_BREAD', 'main', false, 2),
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_BEER', 'secondary', false, 3),
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_BUTTER', 'secondary', false, 4),
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_EGG_YOLK', 'secondary', false, 5),
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_MUSTARD_POWDER', 'secondary', false, 6),
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_WORCESTERSHIRE', 'secondary', false, 7),
    (v_product_type, 'BRI_WELSH_RAREBIT', 'ING_CAYENNE', 'secondary', true, 8);

  -- BRI_BUBBLE_SQUEAK (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BUBBLE_SQUEAK', 'ING_POTATO', 'main', false, 1),
    (v_product_type, 'BRI_BUBBLE_SQUEAK', 'ING_CABBAGE', 'main', false, 2),
    (v_product_type, 'BRI_BUBBLE_SQUEAK', 'ING_BUTTER', 'secondary', false, 3),
    (v_product_type, 'BRI_BUBBLE_SQUEAK', 'ING_ONION', 'secondary', true, 4),
    (v_product_type, 'BRI_BUBBLE_SQUEAK', 'ING_CARROT', 'secondary', true, 5),
    (v_product_type, 'BRI_BUBBLE_SQUEAK', 'ING_BRUSSELS_SPROUTS', 'secondary', true, 6),
    (v_product_type, 'BRI_BUBBLE_SQUEAK', 'ING_VEGETABLE_OIL', 'secondary', false, 7);

  -- BRI_YORKSHIRE_PUDDING (5 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_YORKSHIRE_PUDDING', 'ING_FLOUR', 'main', false, 1),
    (v_product_type, 'BRI_YORKSHIRE_PUDDING', 'ING_EGG', 'main', false, 2),
    (v_product_type, 'BRI_YORKSHIRE_PUDDING', 'ING_MILK', 'main', false, 3),
    (v_product_type, 'BRI_YORKSHIRE_PUDDING', 'ING_VEGETABLE_OIL', 'secondary', false, 4),
    (v_product_type, 'BRI_YORKSHIRE_PUDDING', 'ING_SALT', 'secondary', false, 5);

  -- BRI_BLACK_PUDDING (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BLACK_PUDDING', 'ING_PORK_BLOOD', 'main', false, 1),
    (v_product_type, 'BRI_BLACK_PUDDING', 'ING_OATS', 'main', false, 2),
    (v_product_type, 'BRI_BLACK_PUDDING', 'ING_SUET', 'main', false, 3),
    (v_product_type, 'BRI_BLACK_PUDDING', 'ING_ONION', 'secondary', false, 4),
    (v_product_type, 'BRI_BLACK_PUDDING', 'ING_BLACK_PEPPER', 'secondary', false, 5),
    (v_product_type, 'BRI_BLACK_PUDDING', 'ING_SALT', 'secondary', false, 6),
    (v_product_type, 'BRI_BLACK_PUDDING', 'ING_PENNYROYAL', 'secondary', true, 7);

  -- BRI_NEEPS_TATTIES (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_NEEPS_TATTIES', 'ING_SWEDE', 'main', false, 1),
    (v_product_type, 'BRI_NEEPS_TATTIES', 'ING_POTATO', 'main', false, 2),
    (v_product_type, 'BRI_NEEPS_TATTIES', 'ING_BUTTER', 'secondary', false, 3),
    (v_product_type, 'BRI_NEEPS_TATTIES', 'ING_CREAM', 'secondary', true, 4),
    (v_product_type, 'BRI_NEEPS_TATTIES', 'ING_NUTMEG', 'secondary', false, 5),
    (v_product_type, 'BRI_NEEPS_TATTIES', 'ING_BLACK_PEPPER', 'secondary', false, 6);

  -- BRI_WELSH_CAWL (9 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_LAMB_NECK', 'main', false, 1),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_LEEK', 'main', false, 2),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_POTATO', 'main', false, 3),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_CARROT', 'secondary', false, 4),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_SWEDE', 'secondary', false, 5),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_PARSNIP', 'secondary', false, 6),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_CABBAGE', 'secondary', false, 7),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_BAY_LEAVES', 'secondary', false, 8),
    (v_product_type, 'BRI_WELSH_CAWL', 'ING_THYME', 'secondary', false, 9);

  -- ============================================
  -- DESSERT DISHES (8 dishes)
  -- ============================================

  -- BRI_STICKY_TOFFEE_PUDDING (8 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_DATES', 'main', false, 1),
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_FLOUR', 'main', false, 2),
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_EGG', 'secondary', false, 3),
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_BUTTER', 'main', false, 4),
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_BROWN_SUGAR', 'main', false, 5),
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_CREAM', 'secondary', false, 6),
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_VANILLA', 'secondary', false, 7),
    (v_product_type, 'BRI_STICKY_TOFFEE_PUDDING', 'ING_BAKING_SODA', 'secondary', false, 8);

  -- BRI_ENGLISH_TRIFLE (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_ENGLISH_TRIFLE', 'ING_SPONGE_CAKE', 'main', false, 1),
    (v_product_type, 'BRI_ENGLISH_TRIFLE', 'ING_SHERRY', 'main', false, 2),
    (v_product_type, 'BRI_ENGLISH_TRIFLE', 'ING_RASPBERRY', 'main', false, 3),
    (v_product_type, 'BRI_ENGLISH_TRIFLE', 'ING_CUSTARD', 'main', false, 4),
    (v_product_type, 'BRI_ENGLISH_TRIFLE', 'ING_CREAM', 'main', false, 5),
    (v_product_type, 'BRI_ENGLISH_TRIFLE', 'ING_STRAWBERRY', 'secondary', true, 6),
    (v_product_type, 'BRI_ENGLISH_TRIFLE', 'ING_JELLY', 'secondary', true, 7);

  -- BRI_ETON_MESS (5 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_ETON_MESS', 'ING_MERINGUE', 'main', false, 1),
    (v_product_type, 'BRI_ETON_MESS', 'ING_CREAM', 'main', false, 2),
    (v_product_type, 'BRI_ETON_MESS', 'ING_STRAWBERRY', 'main', false, 3),
    (v_product_type, 'BRI_ETON_MESS', 'ING_SUGAR', 'secondary', false, 4),
    (v_product_type, 'BRI_ETON_MESS', 'ING_VANILLA', 'secondary', false, 5);

  -- BRI_BANOFFEE_PIE (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BANOFFEE_PIE', 'ING_DIGESTIVE_BISCUIT', 'main', false, 1),
    (v_product_type, 'BRI_BANOFFEE_PIE', 'ING_BUTTER', 'secondary', false, 2),
    (v_product_type, 'BRI_BANOFFEE_PIE', 'ING_CONDENSED_MILK', 'main', false, 3),
    (v_product_type, 'BRI_BANOFFEE_PIE', 'ING_BANANA', 'main', false, 4),
    (v_product_type, 'BRI_BANOFFEE_PIE', 'ING_CREAM', 'main', false, 5),
    (v_product_type, 'BRI_BANOFFEE_PIE', 'ING_CHOCOLATE', 'secondary', true, 6);

  -- BRI_BREAD_BUTTER_PUDDING (9 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_BREAD', 'main', false, 1),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_BUTTER', 'main', false, 2),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_RAISIN', 'main', false, 3),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_EGG', 'main', false, 4),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_MILK', 'secondary', false, 5),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_CREAM', 'secondary', false, 6),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_SUGAR', 'secondary', false, 7),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_VANILLA', 'secondary', false, 8),
    (v_product_type, 'BRI_BREAD_BUTTER_PUDDING', 'ING_NUTMEG', 'secondary', false, 9);

  -- BRI_TREACLE_TART (6 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_TREACLE_TART', 'ING_SHORTCRUST_PASTRY', 'main', false, 1),
    (v_product_type, 'BRI_TREACLE_TART', 'ING_GOLDEN_SYRUP', 'main', false, 2),
    (v_product_type, 'BRI_TREACLE_TART', 'ING_BREADCRUMBS', 'main', false, 3),
    (v_product_type, 'BRI_TREACLE_TART', 'ING_LEMON', 'secondary', false, 4),
    (v_product_type, 'BRI_TREACLE_TART', 'ING_CREAM', 'secondary', true, 5),
    (v_product_type, 'BRI_TREACLE_TART', 'ING_GINGER', 'secondary', true, 6);

  -- BRI_SPOTTED_DICK (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_SPOTTED_DICK', 'ING_FLOUR', 'main', false, 1),
    (v_product_type, 'BRI_SPOTTED_DICK', 'ING_SUET', 'main', false, 2),
    (v_product_type, 'BRI_SPOTTED_DICK', 'ING_CURRANTS', 'main', false, 3),
    (v_product_type, 'BRI_SPOTTED_DICK', 'ING_SUGAR', 'secondary', false, 4),
    (v_product_type, 'BRI_SPOTTED_DICK', 'ING_LEMON_ZEST', 'secondary', false, 5),
    (v_product_type, 'BRI_SPOTTED_DICK', 'ING_MILK', 'secondary', false, 6),
    (v_product_type, 'BRI_SPOTTED_DICK', 'ING_BAKING_POWDER', 'secondary', false, 7);

  -- BRI_APPLE_CRUMBLE (7 ingredients)
  INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional, sort_order)
  VALUES
    (v_product_type, 'BRI_APPLE_CRUMBLE', 'ING_APPLE', 'main', false, 1),
    (v_product_type, 'BRI_APPLE_CRUMBLE', 'ING_FLOUR', 'main', false, 2),
    (v_product_type, 'BRI_APPLE_CRUMBLE', 'ING_BUTTER', 'main', false, 3),
    (v_product_type, 'BRI_APPLE_CRUMBLE', 'ING_OATS', 'main', false, 4),
    (v_product_type, 'BRI_APPLE_CRUMBLE', 'ING_BROWN_SUGAR', 'secondary', false, 5),
    (v_product_type, 'BRI_APPLE_CRUMBLE', 'ING_CINNAMON', 'secondary', false, 6),
    (v_product_type, 'BRI_APPLE_CRUMBLE', 'ING_CUSTARD', 'secondary', true, 7);

  RAISE NOTICE 'British product_ingredients inserted successfully';
END $$;

-- Verification
SELECT COUNT(*) as total_links FROM product_ingredients WHERE product_type = 'british';
SELECT product_id, COUNT(*) as ingredient_count
FROM product_ingredients
WHERE product_type = 'british'
GROUP BY product_id
ORDER BY product_id;
