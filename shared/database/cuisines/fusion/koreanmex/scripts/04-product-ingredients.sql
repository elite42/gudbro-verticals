-- Korean-Mexican Fusion Database - Script 04: Product Ingredients
-- GUDBRO Database Standards v1.7
-- Date: 2025-12-26
-- Total links: 185

DELETE FROM product_ingredients WHERE product_type = 'koreanmex';

INSERT INTO product_ingredients (product_id, product_type, ingredient_id) VALUES

-- TACOS
-- KMX_BULGOGI_TACO (10)
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_BEEF'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_CORN_TORTILLA'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_KIMCHI'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_CILANTRO'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_SOUR_CREAM'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_SOY_SAUCE'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_SESAME_OIL'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_GARLIC'),
('KMX_BULGOGI_TACO', 'koreanmex', 'ING_SCALLION'),

-- KMX_SPICY_PORK_TACO (9)
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_PORK'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_CORN_TORTILLA'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_DAIKON'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_TOMATILLO'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_SESAME'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_LIME'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_GARLIC'),
('KMX_SPICY_PORK_TACO', 'koreanmex', 'ING_GINGER'),

-- KMX_KOREAN_CHICKEN_TACO (9)
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_CHICKEN_THIGH'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_CORN_TORTILLA'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_GOCHUGARU'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_MAYONNAISE'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_CABBAGE'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_CARROT'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_SESAME'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_RICE_VINEGAR'),
('KMX_KOREAN_CHICKEN_TACO', 'koreanmex', 'ING_CORN_STARCH'),

-- KMX_SHORT_RIB_TACO (9)
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_BEEF_SHORT_RIBS'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_CORN_TORTILLA'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_SOY_SAUCE'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_SESAME_OIL'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_PEAR'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_TOMATO'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_ONION'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_GARLIC'),
('KMX_SHORT_RIB_TACO', 'koreanmex', 'ING_LETTUCE'),

-- KMX_TOFU_TACO (9)
('KMX_TOFU_TACO', 'koreanmex', 'ING_TOFU'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_CORN_TORTILLA'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_KIMCHI'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_AVOCADO'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_CABBAGE'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_LIME'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_SESAME'),
('KMX_TOFU_TACO', 'koreanmex', 'ING_SCALLION'),

-- BURRITOS
-- KMX_BULGOGI_BURRITO (10)
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_BEEF'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_FLOUR_TORTILLA'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_RICE'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_KIMCHI'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_BLACK_BEAN'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_SOY_SAUCE'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_CHEESE'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_SOUR_CREAM'),
('KMX_BULGOGI_BURRITO', 'koreanmex', 'ING_SCALLION'),

-- KMX_SPICY_PORK_BURRITO (9)
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_PORK'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_FLOUR_TORTILLA'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_GLASS_NOODLES'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_DAIKON'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_CARROT'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_CHEESE'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_SESAME_OIL'),
('KMX_SPICY_PORK_BURRITO', 'koreanmex', 'ING_GARLIC'),

-- KMX_CHICKEN_BURRITO (9)
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_CHICKEN_BREAST'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_FLOUR_TORTILLA'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_RICE'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_MAYONNAISE'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_CILANTRO'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_LIME'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_CUCUMBER'),
('KMX_CHICKEN_BURRITO', 'koreanmex', 'ING_LETTUCE'),

-- BOWLS
-- KMX_BULGOGI_BOWL (10)
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_BEEF'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_RICE'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_BLACK_BEAN'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_TOMATO'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_ONION'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_CILANTRO'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_LIME'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_SOY_SAUCE'),
('KMX_BULGOGI_BOWL', 'koreanmex', 'ING_SESAME'),

-- KMX_BIBIMBAP_BOWL (10)
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_RICE'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_CHORIZO'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_EGG'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_AVOCADO'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_SPINACH'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_CARROT'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_BEAN_SPROUTS'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_SESAME_OIL'),
('KMX_BIBIMBAP_BOWL', 'koreanmex', 'ING_TOMATO'),

-- KMX_CARNITAS_BOWL (9)
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_PORK_SHOULDER'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_RICE'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_KIMCHI'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_JALAPENO'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_SOY_SAUCE'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_BROWN_SUGAR'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_GARLIC'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_GINGER'),
('KMX_CARNITAS_BOWL', 'koreanmex', 'ING_SCALLION'),

-- KMX_VEGGIE_BOWL (10)
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_RICE'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_TOFU'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_BLACK_BEAN'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_AVOCADO'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_KIMCHI'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_BELL_PEPPER'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_ZUCCHINI'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_CORN'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_VEGGIE_BOWL', 'koreanmex', 'ING_LIME'),

-- QUESADILLAS
-- KMX_KIMCHI_QUESADILLA (7)
('KMX_KIMCHI_QUESADILLA', 'koreanmex', 'ING_FLOUR_TORTILLA'),
('KMX_KIMCHI_QUESADILLA', 'koreanmex', 'ING_CHEESE'),
('KMX_KIMCHI_QUESADILLA', 'koreanmex', 'ING_KIMCHI'),
('KMX_KIMCHI_QUESADILLA', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_KIMCHI_QUESADILLA', 'koreanmex', 'ING_MAYONNAISE'),
('KMX_KIMCHI_QUESADILLA', 'koreanmex', 'ING_SCALLION'),
('KMX_KIMCHI_QUESADILLA', 'koreanmex', 'ING_SESAME'),

-- KMX_BULGOGI_QUESADILLA (8)
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_BEEF'),
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_FLOUR_TORTILLA'),
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_OAXACA_CHEESE'),
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_ONION'),
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_SOY_SAUCE'),
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_SESAME_OIL'),
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_GARLIC'),
('KMX_BULGOGI_QUESADILLA', 'koreanmex', 'ING_SOUR_CREAM'),

-- KMX_SPICY_CHICKEN_QUESADILLA (8)
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_CHICKEN_BREAST'),
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_FLOUR_TORTILLA'),
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_CHEESE_PEPPER_JACK'),
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_CORN'),
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_JALAPENO'),
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_CILANTRO'),
('KMX_SPICY_CHICKEN_QUESADILLA', 'koreanmex', 'ING_LIME'),

-- APPETIZERS
-- KMX_KOREAN_NACHOS (9)
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_WONTON_WRAPPER'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_BEEF'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_KIMCHI'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_CHEESE'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_JALAPENO'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_SCALLION'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_SESAME'),
('KMX_KOREAN_NACHOS', 'koreanmex', 'ING_SOUR_CREAM'),

-- KMX_KIMCHI_FRIES (8)
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_POTATO'),
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_PORK'),
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_KIMCHI'),
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_CHEESE'),
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_MAYONNAISE'),
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_SCALLION'),
('KMX_KIMCHI_FRIES', 'koreanmex', 'ING_SESAME'),

-- KMX_KOREAN_ELOTE (8)
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_CORN'),
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_BUTTER'),
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_COTIJA_CHEESE'),
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_MAYONNAISE'),
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_LIME'),
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_SESAME'),
('KMX_KOREAN_ELOTE', 'koreanmex', 'ING_CILANTRO'),

-- SIDES
-- KMX_KIMCHI_RICE (9)
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_RICE'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_KIMCHI'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_CHORIZO'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_EGG'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_JALAPENO'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_SCALLION'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_SESAME_OIL'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_SOY_SAUCE'),
('KMX_KIMCHI_RICE', 'koreanmex', 'ING_GARLIC'),

-- KMX_FUSION_SLAW (8)
('KMX_FUSION_SLAW', 'koreanmex', 'ING_CABBAGE'),
('KMX_FUSION_SLAW', 'koreanmex', 'ING_CARROT'),
('KMX_FUSION_SLAW', 'koreanmex', 'ING_CILANTRO'),
('KMX_FUSION_SLAW', 'koreanmex', 'ING_GOCHUJANG'),
('KMX_FUSION_SLAW', 'koreanmex', 'ING_LIME'),
('KMX_FUSION_SLAW', 'koreanmex', 'ING_RICE_VINEGAR'),
('KMX_FUSION_SLAW', 'koreanmex', 'ING_SESAME_OIL'),
('KMX_FUSION_SLAW', 'koreanmex', 'ING_SESAME'),

-- KMX_KOREAN_GUACAMOLE (8)
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_AVOCADO'),
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_KIMCHI'),
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_GOCHUGARU'),
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_LIME'),
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_CILANTRO'),
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_ONION'),
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_SESAME'),
('KMX_KOREAN_GUACAMOLE', 'koreanmex', 'ING_SALT');

-- Success message
SELECT 'Inserted 185 product_ingredients links for Korean-Mexican' AS status;
