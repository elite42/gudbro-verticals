-- ============================================
-- GUDBRO Indian Database - Missing Ingredients
-- Version: 1.0
-- Date: 2025-12-18
-- Uses ON CONFLICT DO NOTHING for safe re-runs
-- ============================================

-- 40 new ingredients for Indian cuisine

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  -- SPICES & SEASONINGS
  ('ING_AJWAIN', 'ajwain', 'Ajwain Seeds', 'Aromatic seeds with thyme-like flavor, used in Indian breads and snacks', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_AMCHUR', 'amchur', 'Amchur Powder', 'Dried mango powder adding tangy sourness to Indian dishes', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_ASAFOETIDA', 'asafoetida', 'Asafoetida', 'Pungent spice also called hing, used as onion-garlic substitute', 'spices', '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_BLACK_SALT', 'black-salt', 'Black Salt', 'Himalayan black salt with sulfurous egg-like flavor, used in chaats', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_CARDAMOM', 'cardamom', 'Cardamom', 'Aromatic green cardamom pods, queen of spices in Indian cooking', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_CHAAT_MASALA', 'chaat-masala', 'Chaat Masala', 'Tangy spice blend with amchur and black salt for street food', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_CHOLE_MASALA', 'chole-masala', 'Chole Masala', 'Special spice blend for chickpea curry with tea and pomegranate', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_FENNEL_SEEDS', 'fennel-seeds', 'Fennel Seeds', 'Sweet aromatic seeds used in Indian cooking and as digestive', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_FENUGREEK_LEAVES', 'fenugreek-leaves', 'Kasuri Methi', 'Dried fenugreek leaves with bitter-sweet aroma for curries', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_FENUGREEK_SEEDS', 'fenugreek-seeds', 'Fenugreek Seeds', 'Bitter aromatic seeds used in tempering and spice blends', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_GREEN_CARDAMOM', 'green-cardamom', 'Green Cardamom', 'Whole green cardamom pods for aromatic Indian dishes', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_MACE', 'mace', 'Mace', 'Lacy covering of nutmeg with delicate warm flavor', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_PAV_BHAJI_MASALA', 'pav-bhaji-masala', 'Pav Bhaji Masala', 'Special Mumbai-style spice blend for pav bhaji', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_POPPY_SEEDS', 'poppy-seeds', 'Poppy Seeds', 'White poppy seeds used to thicken and flavor Indian curries', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),

  -- GRAINS & FLOURS
  ('ING_ALL_PURPOSE_FLOUR', 'all-purpose-flour', 'All Purpose Flour', 'Refined wheat flour for naan, bhatura and other breads', 'grains', '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_BASMATI_RICE', 'basmati-rice', 'Basmati Rice', 'Long-grain aromatic rice essential for biryani and pulao', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_JEERAKASALA_RICE', 'jeerakasala-rice', 'Jeerakasala Rice', 'Short-grain aromatic rice from Kerala for Malabar biryani', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_PUFFED_RICE', 'puffed-rice', 'Puffed Rice', 'Light airy puffed rice for bhel puri and snacks', 'grains', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_WHOLE_WHEAT_FLOUR', 'whole-wheat-flour', 'Whole Wheat Flour', 'Atta flour for roti, paratha and Indian breads', 'grains', '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),

  -- LENTILS & LEGUMES
  ('ING_BLACK_LENTILS', 'black-lentils', 'Urad Dal', 'Whole black lentils essential for dal makhani', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_MASOOR_DAL', 'masoor-dal', 'Masoor Dal', 'Red lentils that cook quickly into soft dal', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),

  -- PROTEINS
  ('ING_CHICKEN_LEG', 'chicken-leg', 'Chicken Leg', 'Whole chicken leg with thigh, ideal for tandoori', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false}'::jsonb),
  ('ING_FISH_WHITE', 'fish-white', 'White Fish', 'Firm white fish fillets for curries and tikka', 'seafood', '["fish"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false}'::jsonb),
  ('ING_LAMB_GROUND', 'lamb-ground', 'Ground Lamb', 'Minced lamb for keema and seekh kebabs', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false}'::jsonb),
  ('ING_LAMB_SHOULDER', 'lamb-shoulder', 'Lamb Shoulder', 'Fatty lamb cut ideal for slow-cooked curries', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false}'::jsonb),
  ('ING_SHRIMP_LARGE', 'shrimp-large', 'Large Shrimp', 'Jumbo prawns for tandoori and curries', 'seafood', '["shellfish"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": false, "is_vegan": false}'::jsonb),

  -- OILS & FATS
  ('ING_COCONUT_OIL', 'coconut-oil', 'Coconut Oil', 'Traditional cooking oil for South Indian dishes', 'oils', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_MUSTARD_OIL', 'mustard-oil', 'Mustard Oil', 'Pungent oil essential for Bengali and North Indian cooking', 'oils', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),

  -- CONDIMENTS & PASTES
  ('ING_GINGER_GARLIC_PASTE', 'ginger-garlic-paste', 'Ginger Garlic Paste', 'Essential base paste for Indian curries', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_GREEN_CHUTNEY', 'green-chutney', 'Green Chutney', 'Mint and cilantro chutney for chaat and snacks', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_KOKUM', 'kokum', 'Kokum', 'Dried fruit rind adding sourness to coastal Indian curries', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_TAMARIND_CHUTNEY', 'tamarind-chutney', 'Tamarind Chutney', 'Sweet and sour chutney for chaat and snacks', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_KEWRA_WATER', 'kewra-water', 'Kewra Water', 'Fragrant screwpine essence for biryanis and sweets', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_ROSE_WATER', 'rose-water', 'Rose Water', 'Fragrant rose essence for biryanis and desserts', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_RAW_PAPAYA', 'raw-papaya', 'Raw Papaya', 'Unripe papaya used as meat tenderizer in marinades', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),

  -- MISCELLANEOUS
  ('ING_BAY_LEAF', 'bay-leaf', 'Bay Leaf', 'Aromatic leaf for rice dishes and curries', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_DRIED_RED_CHILI', 'dried-red-chili', 'Dried Red Chili', 'Whole dried chilies for tempering and heat', 'spices', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_PAV_BREAD', 'pav-bread', 'Pav Bread', 'Soft bread rolls for pav bhaji and vada pav', 'bread', '["gluten", "milk"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": false}'::jsonb),
  ('ING_RAISINS', 'raisins', 'Raisins', 'Dried grapes for rice dishes and kofta', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb),
  ('ING_SEV', 'sev', 'Sev', 'Crispy chickpea flour noodles for chaat toppings', 'grains', '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegetarian": true, "is_vegan": true}'::jsonb)

ON CONFLICT DO NOTHING;

-- Verify count
SELECT COUNT(*) as new_ingredients FROM ingredients WHERE id LIKE 'ING_%' AND id IN (
  'ING_AJWAIN', 'ING_AMCHUR', 'ING_ASAFOETIDA', 'ING_BLACK_SALT', 'ING_CARDAMOM',
  'ING_CHAAT_MASALA', 'ING_CHOLE_MASALA', 'ING_FENNEL_SEEDS', 'ING_FENUGREEK_LEAVES',
  'ING_FENUGREEK_SEEDS', 'ING_GREEN_CARDAMOM', 'ING_MACE', 'ING_PAV_BHAJI_MASALA',
  'ING_POPPY_SEEDS', 'ING_ALL_PURPOSE_FLOUR', 'ING_BASMATI_RICE', 'ING_JEERAKASALA_RICE',
  'ING_PUFFED_RICE', 'ING_WHOLE_WHEAT_FLOUR', 'ING_BLACK_LENTILS', 'ING_MASOOR_DAL'
);
