-- ============================================
-- SAUCES Data Import
-- GUDBRO Database Standards v1.3
-- ============================================

INSERT INTO sauces (id, slug, name, description, category, status, serving_size_ml, serving_style, heat_level, ingredient_ids, calories_per_serving, protein_g, carbs_g, fat_g, sugar_g, sodium_mg, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- =====================
-- CLASSIC SAUCES
-- =====================
('SAU_KETCHUP', 'ketchup', 'Tomato Ketchup', 'Classic American tomato-based condiment with vinegar and spices', 'classic', 'classic', 30, 'portion', 0, ARRAY['ING_TOMATO', 'ING_SUGAR', 'ING_VINEGAR'], 20, 0.0, 5.0, 0.0, 4.0, 160, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['american', 'classic', 'tomato'], 95, 'USA'),

('SAU_MAYONNAISE', 'mayonnaise', 'Classic Mayonnaise', 'Creamy emulsion of egg yolks, oil and vinegar', 'classic', 'classic', 30, 'portion', 0, ARRAY['ING_EGG', 'ING_VEGETABLE_OIL', 'ING_VINEGAR', 'ING_MUSTARD'], 90, 0.0, 0.0, 10.0, 0.0, 90, ARRAY['eggs'], true, true, true, false, true, true, true, 0, ARRAY['classic', 'creamy', 'versatile'], 92, 'France'),

('SAU_MUSTARD', 'yellow-mustard', 'Yellow Mustard', 'Mild American-style prepared mustard', 'classic', 'classic', 15, 'portion', 1, ARRAY['ING_MUSTARD_SEEDS', 'ING_VINEGAR', 'ING_TURMERIC'], 5, 0.0, 0.0, 0.0, 0.0, 55, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 1, ARRAY['american', 'mild', 'classic'], 85, 'USA'),

('SAU_DIJON', 'dijon-mustard', 'Dijon Mustard', 'French-style sharp and tangy mustard', 'classic', 'classic', 15, 'portion', 1, ARRAY['ING_MUSTARD_SEEDS', 'ING_WHITE_WINE', 'ING_VINEGAR'], 10, 0.5, 0.5, 0.5, 0.0, 120, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 1, ARRAY['french', 'sharp', 'gourmet'], 80, 'France'),

('SAU_WHOLEGRAIN_MUSTARD', 'wholegrain-mustard', 'Wholegrain Mustard', 'Coarse mustard with visible seeds and robust flavor', 'classic', 'popular', 15, 'portion', 1, ARRAY['ING_MUSTARD_SEEDS', 'ING_VINEGAR', 'ING_HONEY'], 15, 0.5, 1.0, 0.5, 0.5, 100, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 1, ARRAY['artisan', 'textured', 'gourmet'], 72, 'France'),

-- =====================
-- SPICY SAUCES
-- =====================
('SAU_HOT_SAUCE', 'hot-sauce', 'Classic Hot Sauce', 'Louisiana-style cayenne pepper hot sauce', 'spicy', 'classic', 15, 'bottle', 4, ARRAY['ING_CAYENNE', 'ING_VINEGAR', 'ING_SALT'], 0, 0.0, 0.0, 0.0, 0.0, 190, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 4, ARRAY['louisiana', 'cayenne', 'fiery'], 88, 'USA'),

('SAU_SRIRACHA', 'sriracha', 'Sriracha Hot Sauce', 'Thai-style chili sauce with garlic', 'spicy', 'popular', 15, 'bottle', 3, ARRAY['ING_CHILI', 'ING_GARLIC', 'ING_SUGAR', 'ING_VINEGAR'], 15, 0.0, 3.0, 0.0, 2.0, 100, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 3, ARRAY['thai', 'garlic', 'versatile'], 90, 'Thailand'),

('SAU_TABASCO', 'tabasco', 'Tabasco Sauce', 'Iconic aged pepper sauce from Louisiana', 'spicy', 'classic', 5, 'bottle', 4, ARRAY['ING_TABASCO', 'ING_VINEGAR', 'ING_SALT'], 0, 0.0, 0.0, 0.0, 0.0, 35, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 4, ARRAY['louisiana', 'aged', 'iconic'], 85, 'USA'),

('SAU_BUFFALO', 'buffalo-sauce', 'Buffalo Sauce', 'Spicy cayenne sauce with butter for wings', 'spicy', 'popular', 30, 'portion', 3, ARRAY['ING_BUFFALO_SAUCE', 'ING_BUTTER', 'ING_CAYENNE'], 50, 0.0, 1.0, 5.0, 0.0, 420, ARRAY['dairy'], true, false, true, false, true, true, true, 3, ARRAY['buffalo', 'wings', 'american'], 86, 'USA'),

('SAU_CHIPOTLE', 'chipotle-sauce', 'Chipotle Sauce', 'Smoky sauce made from chipotle peppers in adobo', 'spicy', 'popular', 30, 'portion', 2, ARRAY['ING_CHIPOTLE_SAUCE', 'ING_MAYONNAISE'], 70, 0.0, 2.0, 7.0, 1.0, 150, ARRAY['eggs'], true, true, true, false, true, true, true, 2, ARRAY['mexican', 'smoky', 'chipotle'], 82, 'Mexico'),

('SAU_HARISSA', 'harissa', 'Harissa Paste', 'North African hot chili paste with spices', 'spicy', 'popular', 15, 'portion', 4, ARRAY['ING_HARISSA', 'ING_OLIVE_OIL', 'ING_GARLIC'], 30, 1.0, 2.0, 2.0, 1.0, 85, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 4, ARRAY['moroccan', 'tunisian', 'aromatic'], 75, 'Tunisia'),

('SAU_GOCHUJANG', 'gochujang', 'Gochujang Sauce', 'Korean fermented red chili paste', 'spicy', 'popular', 15, 'portion', 3, ARRAY['ING_GOCHUJANG', 'ING_SESAME_OIL'], 40, 1.0, 8.0, 0.5, 5.0, 250, ARRAY['gluten', 'soy'], false, true, true, true, true, true, true, 3, ARRAY['korean', 'fermented', 'umami'], 78, 'South Korea'),

('SAU_SAMBAL', 'sambal-oelek', 'Sambal Oelek', 'Indonesian raw chili paste', 'spicy', 'classic', 15, 'portion', 4, ARRAY['ING_SAMBAL_OELEK', 'ING_GARLIC', 'ING_VINEGAR'], 10, 0.0, 2.0, 0.0, 1.0, 150, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 4, ARRAY['indonesian', 'raw', 'pure'], 70, 'Indonesia'),

-- =====================
-- CREAMY SAUCES
-- =====================
('SAU_RANCH', 'ranch', 'Ranch Dressing', 'Creamy American dressing with herbs and buttermilk', 'creamy', 'classic', 45, 'portion', 0, ARRAY['ING_RANCH_DRESSING', 'ING_BUTTERMILK', 'ING_MAYONNAISE'], 140, 1.0, 2.0, 14.0, 1.0, 260, ARRAY['dairy', 'eggs'], true, false, true, false, true, true, true, 0, ARRAY['american', 'dip', 'versatile'], 90, 'USA'),

('SAU_BLUE_CHEESE', 'blue-cheese-dressing', 'Blue Cheese Dressing', 'Creamy dressing with crumbled blue cheese', 'creamy', 'classic', 45, 'portion', 0, ARRAY['ING_BLUE_CHEESE_DRESSING', 'ING_BLUE_CHEESE', 'ING_MAYONNAISE'], 150, 2.0, 1.0, 15.0, 1.0, 320, ARRAY['dairy', 'eggs'], true, false, true, false, true, true, false, 0, ARRAY['american', 'pungent', 'wings'], 78, 'USA'),

('SAU_CAESAR', 'caesar-dressing', 'Caesar Dressing', 'Classic dressing with anchovies, garlic and parmesan', 'creamy', 'classic', 45, 'portion', 0, ARRAY['ING_CAESAR_DRESSING', 'ING_PARMESAN', 'ING_ANCHOVY', 'ING_GARLIC'], 130, 2.0, 1.0, 13.0, 0.5, 280, ARRAY['dairy', 'eggs', 'fish'], true, false, true, false, false, true, false, 0, ARRAY['italian', 'salad', 'classic'], 85, 'Mexico'),

('SAU_TARTAR', 'tartar-sauce', 'Tartar Sauce', 'Mayonnaise-based sauce with pickles and capers', 'creamy', 'classic', 45, 'portion', 0, ARRAY['ING_TARTAR_SAUCE', 'ING_MAYONNAISE', 'ING_PICKLE', 'ING_CAPER'], 100, 0.0, 2.0, 10.0, 1.0, 200, ARRAY['eggs'], true, true, true, false, true, true, true, 0, ARRAY['seafood', 'fish', 'classic'], 80, 'France'),

('SAU_THOUSAND_ISLAND', 'thousand-island', 'Thousand Island', 'Creamy pink dressing with pickles and onions', 'creamy', 'classic', 45, 'portion', 0, ARRAY['ING_THOUSAND_ISLAND', 'ING_MAYONNAISE', 'ING_KETCHUP', 'ING_PICKLE'], 110, 0.0, 4.0, 10.0, 3.0, 220, ARRAY['eggs'], true, true, true, false, true, true, true, 0, ARRAY['american', 'burger', 'salad'], 75, 'USA'),

('SAU_AIOLI', 'garlic-aioli', 'Garlic Aioli', 'Mediterranean garlic mayonnaise', 'creamy', 'popular', 30, 'portion', 0, ARRAY['ING_MAYONNAISE', 'ING_GARLIC', 'ING_LEMON_JUICE', 'ING_OLIVE_OIL'], 100, 0.0, 0.5, 11.0, 0.0, 95, ARRAY['eggs'], true, true, true, false, true, true, true, 0, ARRAY['mediterranean', 'garlic', 'gourmet'], 82, 'Spain'),

('SAU_REMOULADE', 'remoulade', 'Remoulade Sauce', 'French mayo-based sauce with herbs and capers', 'creamy', 'classic', 45, 'portion', 0, ARRAY['ING_REMOULADE', 'ING_MAYONNAISE', 'ING_CAPER', 'ING_HERBS'], 110, 0.0, 1.0, 11.0, 0.5, 180, ARRAY['eggs'], true, true, true, false, true, true, true, 0, ARRAY['french', 'seafood', 'elegant'], 68, 'France'),

-- =====================
-- ASIAN SAUCES
-- =====================
('SAU_SOY', 'soy-sauce', 'Soy Sauce', 'Classic fermented soybean sauce', 'asian', 'classic', 15, 'bottle', 0, ARRAY['ING_SOY_SAUCE', 'ING_SALT'], 10, 1.0, 1.0, 0.0, 0.0, 920, ARRAY['soy', 'gluten'], false, true, true, true, true, true, true, 0, ARRAY['japanese', 'chinese', 'essential'], 95, 'Japan'),

('SAU_TERIYAKI', 'teriyaki', 'Teriyaki Sauce', 'Sweet Japanese glaze with soy, mirin and sugar', 'asian', 'popular', 30, 'portion', 0, ARRAY['ING_TERIYAKI_SAUCE', 'ING_SOY_SAUCE', 'ING_MIRIN', 'ING_SUGAR'], 45, 1.0, 10.0, 0.0, 8.0, 610, ARRAY['soy', 'gluten'], false, true, true, true, true, true, true, 0, ARRAY['japanese', 'sweet', 'glaze'], 88, 'Japan'),

('SAU_HOISIN', 'hoisin', 'Hoisin Sauce', 'Sweet and savory Chinese barbecue sauce', 'asian', 'classic', 30, 'portion', 0, ARRAY['ING_HOISIN_SAUCE', 'ING_SESAME', 'ING_GARLIC'], 70, 1.0, 14.0, 1.5, 10.0, 410, ARRAY['soy', 'gluten', 'sesame'], false, true, true, true, true, true, true, 0, ARRAY['chinese', 'bbq', 'duck'], 80, 'China'),

('SAU_PONZU', 'ponzu', 'Ponzu Sauce', 'Japanese citrus-based soy sauce', 'asian', 'classic', 30, 'portion', 0, ARRAY['ING_PONZU', 'ING_SOY_SAUCE', 'ING_YUZU', 'ING_VINEGAR'], 15, 1.0, 2.0, 0.0, 1.0, 480, ARRAY['soy'], true, true, true, true, true, true, true, 0, ARRAY['japanese', 'citrus', 'dipping'], 75, 'Japan'),

('SAU_SWEET_CHILI', 'sweet-chili', 'Sweet Chili Sauce', 'Thai-style sweet and mildly spicy sauce', 'asian', 'popular', 30, 'portion', 1, ARRAY['ING_SWEET_CHILI_SAUCE', 'ING_CHILI', 'ING_GARLIC', 'ING_SUGAR'], 60, 0.0, 14.0, 0.0, 12.0, 280, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 1, ARRAY['thai', 'dipping', 'spring_rolls'], 85, 'Thailand'),

('SAU_PEANUT', 'peanut-sauce', 'Peanut Sauce', 'Thai-style sauce with peanuts and coconut', 'asian', 'popular', 45, 'portion', 1, ARRAY['ING_PEANUT_SAUCE', 'ING_PEANUT_BUTTER', 'ING_COCONUT_MILK', 'ING_SOY_SAUCE'], 130, 5.0, 8.0, 9.0, 4.0, 320, ARRAY['peanuts', 'soy'], true, true, false, true, true, true, true, 1, ARRAY['thai', 'satay', 'creamy'], 82, 'Thailand'),

('SAU_TONKATSU', 'tonkatsu', 'Tonkatsu Sauce', 'Japanese thick brown sauce for fried cutlets', 'asian', 'classic', 30, 'portion', 0, ARRAY['ING_TONKATSU_SAUCE', 'ING_WORCESTERSHIRE', 'ING_TOMATO'], 40, 0.0, 10.0, 0.0, 8.0, 350, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['japanese', 'katsu', 'fruity'], 72, 'Japan'),

('SAU_OYSTER', 'oyster-sauce', 'Oyster Sauce', 'Thick savory sauce made from oyster extracts', 'asian', 'classic', 15, 'portion', 0, ARRAY['ING_OYSTER_SAUCE', 'ING_SOY_SAUCE', 'ING_SUGAR'], 25, 0.5, 5.0, 0.0, 3.0, 490, ARRAY['shellfish', 'soy'], true, true, true, false, false, true, false, 0, ARRAY['chinese', 'stir_fry', 'umami'], 78, 'China'),

-- =====================
-- MEDITERRANEAN SAUCES
-- =====================
('SAU_TZATZIKI', 'tzatziki', 'Tzatziki', 'Greek yogurt sauce with cucumber and garlic', 'mediterranean', 'classic', 60, 'side', 0, ARRAY['ING_TZATZIKI', 'ING_GREEK_YOGURT', 'ING_CUCUMBER', 'ING_GARLIC', 'ING_DILL'], 50, 3.0, 3.0, 3.0, 2.0, 120, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['greek', 'refreshing', 'dip'], 88, 'Greece'),

('SAU_HUMMUS', 'hummus', 'Classic Hummus', 'Creamy chickpea dip with tahini and lemon', 'mediterranean', 'classic', 60, 'side', 0, ARRAY['ING_HUMMUS', 'ING_CHICKPEA', 'ING_TAHINI', 'ING_LEMON_JUICE', 'ING_GARLIC'], 80, 3.0, 8.0, 4.0, 0.5, 150, ARRAY['sesame'], true, true, true, true, true, true, true, 0, ARRAY['middle_eastern', 'dip', 'healthy'], 92, 'Lebanon'),

('SAU_TAHINI', 'tahini', 'Tahini Sauce', 'Creamy sesame seed paste sauce', 'mediterranean', 'classic', 30, 'portion', 0, ARRAY['ING_TAHINI', 'ING_LEMON_JUICE', 'ING_GARLIC', 'ING_WATER'], 90, 3.0, 3.0, 8.0, 0.0, 70, ARRAY['sesame'], true, true, true, true, true, true, true, 0, ARRAY['middle_eastern', 'versatile', 'nutty'], 78, 'Middle East'),

('SAU_PESTO', 'pesto-genovese', 'Pesto Genovese', 'Italian basil sauce with pine nuts and parmesan', 'mediterranean', 'classic', 30, 'portion', 0, ARRAY['ING_PESTO_GENOVESE', 'ING_BASIL', 'ING_PINE_NUTS', 'ING_PARMESAN', 'ING_OLIVE_OIL'], 130, 3.0, 1.0, 13.0, 0.0, 180, ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 0, ARRAY['italian', 'basil', 'pasta'], 85, 'Italy'),

('SAU_BABA_GANOUSH', 'baba-ganoush', 'Baba Ganoush', 'Smoky roasted eggplant dip with tahini', 'mediterranean', 'classic', 60, 'side', 0, ARRAY['ING_EGGPLANT', 'ING_TAHINI', 'ING_LEMON_JUICE', 'ING_GARLIC'], 70, 2.0, 5.0, 5.0, 2.0, 130, ARRAY['sesame'], true, true, true, true, true, true, true, 0, ARRAY['middle_eastern', 'smoky', 'dip'], 76, 'Lebanon'),

-- =====================
-- MEAT SAUCES
-- =====================
('SAU_GRAVY', 'brown-gravy', 'Brown Gravy', 'Rich meat-based sauce for roasts and potatoes', 'meat', 'classic', 60, 'portion', 0, ARRAY['ING_GRAVY', 'ING_BEEF_STOCK', 'ING_FLOUR', 'ING_BUTTER'], 40, 1.0, 4.0, 2.0, 0.0, 340, ARRAY['gluten', 'dairy'], false, false, true, false, false, true, true, 0, ARRAY['british', 'american', 'comfort'], 85, 'UK'),

('SAU_CHIMICHURRI', 'chimichurri', 'Chimichurri', 'Argentine herb sauce with parsley, garlic and vinegar', 'meat', 'classic', 30, 'portion', 1, ARRAY['ING_CHIMICHURRI', 'ING_PARSLEY', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_OREGANO'], 80, 0.5, 1.0, 8.0, 0.0, 180, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 1, ARRAY['argentine', 'steak', 'herbaceous'], 82, 'Argentina'),

('SAU_BEARNAISE', 'bearnaise', 'Bearnaise Sauce', 'French butter sauce with tarragon and shallots', 'meat', 'premium', 45, 'portion', 0, ARRAY['ING_BEARNAISE', 'ING_BUTTER', 'ING_EGG', 'ING_TARRAGON', 'ING_SHALLOT'], 180, 1.0, 0.5, 19.0, 0.0, 150, ARRAY['dairy', 'eggs'], true, false, true, false, true, true, true, 0, ARRAY['french', 'steak', 'elegant'], 75, 'France'),

('SAU_PEPPERCORN', 'peppercorn-sauce', 'Peppercorn Sauce', 'Creamy sauce with crushed green peppercorns', 'meat', 'popular', 45, 'portion', 1, ARRAY['ING_PEPPERCORN_SAUCE', 'ING_HEAVY_CREAM', 'ING_GREEN_PEPPERCORNS', 'ING_BRANDY'], 120, 1.0, 2.0, 12.0, 1.0, 200, ARRAY['dairy'], true, false, true, false, true, true, true, 1, ARRAY['french', 'steak', 'creamy'], 80, 'France'),

('SAU_MUSHROOM', 'mushroom-sauce', 'Mushroom Sauce', 'Creamy sauce with sauteed mushrooms', 'meat', 'popular', 60, 'portion', 0, ARRAY['ING_MUSHROOM_SAUCE', 'ING_MUSHROOM', 'ING_HEAVY_CREAM', 'ING_BUTTER'], 100, 2.0, 3.0, 9.0, 1.0, 180, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['french', 'steak', 'earthy'], 78, 'France'),

('SAU_BBQ', 'bbq-sauce', 'BBQ Sauce', 'Sweet and smoky American barbecue sauce', 'meat', 'classic', 45, 'portion', 1, ARRAY['ING_BBQ_SAUCE', 'ING_TOMATO', 'ING_MOLASSES', 'ING_VINEGAR'], 60, 0.0, 14.0, 0.0, 12.0, 350, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 1, ARRAY['american', 'smoky', 'grilling'], 90, 'USA'),

-- =====================
-- SWEET SAUCES
-- =====================
('SAU_HONEY_MUSTARD', 'honey-mustard', 'Honey Mustard', 'Sweet and tangy mustard sauce with honey', 'sweet', 'popular', 30, 'portion', 0, ARRAY['ING_HONEY_MUSTARD', 'ING_HONEY', 'ING_DIJON_MUSTARD', 'ING_MAYONNAISE'], 90, 0.0, 10.0, 5.0, 9.0, 120, ARRAY['eggs'], true, true, true, false, true, true, true, 0, ARRAY['american', 'chicken', 'dipping'], 85, 'USA'),

('SAU_MANGO_CHUTNEY', 'mango-chutney', 'Mango Chutney', 'Sweet and tangy Indian mango condiment', 'sweet', 'classic', 30, 'portion', 0, ARRAY['ING_MANGO_CHUTNEY', 'ING_MANGO', 'ING_SUGAR', 'ING_VINEGAR', 'ING_GINGER'], 50, 0.0, 12.0, 0.0, 10.0, 80, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['indian', 'fruity', 'curry'], 72, 'India')

ON CONFLICT (id) DO NOTHING;
