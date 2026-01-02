-- ============================================
-- SAUCES - Product Ingredients Junction
-- GUDBRO Database Standards v1.3
-- ============================================

INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES

-- =====================
-- CLASSIC SAUCES
-- =====================
('sauces', 'SAU_KETCHUP', 'ING_TOMATO'),
('sauces', 'SAU_KETCHUP', 'ING_SUGAR'),
('sauces', 'SAU_KETCHUP', 'ING_VINEGAR'),

('sauces', 'SAU_MAYONNAISE', 'ING_EGG'),
('sauces', 'SAU_MAYONNAISE', 'ING_VEGETABLE_OIL'),
('sauces', 'SAU_MAYONNAISE', 'ING_VINEGAR'),
('sauces', 'SAU_MAYONNAISE', 'ING_MUSTARD'),

('sauces', 'SAU_MUSTARD', 'ING_MUSTARD_SEEDS'),
('sauces', 'SAU_MUSTARD', 'ING_VINEGAR'),
('sauces', 'SAU_MUSTARD', 'ING_TURMERIC'),

('sauces', 'SAU_DIJON', 'ING_MUSTARD_SEEDS'),
('sauces', 'SAU_DIJON', 'ING_WHITE_WINE'),
('sauces', 'SAU_DIJON', 'ING_VINEGAR'),

('sauces', 'SAU_WHOLEGRAIN_MUSTARD', 'ING_MUSTARD_SEEDS'),
('sauces', 'SAU_WHOLEGRAIN_MUSTARD', 'ING_VINEGAR'),
('sauces', 'SAU_WHOLEGRAIN_MUSTARD', 'ING_HONEY'),

-- =====================
-- SPICY SAUCES
-- =====================
('sauces', 'SAU_HOT_SAUCE', 'ING_CAYENNE'),
('sauces', 'SAU_HOT_SAUCE', 'ING_VINEGAR'),
('sauces', 'SAU_HOT_SAUCE', 'ING_SALT'),

('sauces', 'SAU_SRIRACHA', 'ING_CHILI'),
('sauces', 'SAU_SRIRACHA', 'ING_GARLIC'),
('sauces', 'SAU_SRIRACHA', 'ING_SUGAR'),
('sauces', 'SAU_SRIRACHA', 'ING_VINEGAR'),

('sauces', 'SAU_TABASCO', 'ING_TABASCO'),
('sauces', 'SAU_TABASCO', 'ING_VINEGAR'),
('sauces', 'SAU_TABASCO', 'ING_SALT'),

('sauces', 'SAU_BUFFALO', 'ING_BUFFALO_SAUCE'),
('sauces', 'SAU_BUFFALO', 'ING_BUTTER'),
('sauces', 'SAU_BUFFALO', 'ING_CAYENNE'),

('sauces', 'SAU_CHIPOTLE', 'ING_CHIPOTLE_SAUCE'),
('sauces', 'SAU_CHIPOTLE', 'ING_MAYONNAISE'),

('sauces', 'SAU_HARISSA', 'ING_HARISSA'),
('sauces', 'SAU_HARISSA', 'ING_OLIVE_OIL'),
('sauces', 'SAU_HARISSA', 'ING_GARLIC'),

('sauces', 'SAU_GOCHUJANG', 'ING_GOCHUJANG'),
('sauces', 'SAU_GOCHUJANG', 'ING_SESAME_OIL'),

('sauces', 'SAU_SAMBAL', 'ING_SAMBAL_OELEK'),
('sauces', 'SAU_SAMBAL', 'ING_GARLIC'),
('sauces', 'SAU_SAMBAL', 'ING_VINEGAR'),

-- =====================
-- CREAMY SAUCES
-- =====================
('sauces', 'SAU_RANCH', 'ING_RANCH_DRESSING'),
('sauces', 'SAU_RANCH', 'ING_BUTTERMILK'),
('sauces', 'SAU_RANCH', 'ING_MAYONNAISE'),

('sauces', 'SAU_BLUE_CHEESE', 'ING_BLUE_CHEESE_DRESSING'),
('sauces', 'SAU_BLUE_CHEESE', 'ING_BLUE_CHEESE'),
('sauces', 'SAU_BLUE_CHEESE', 'ING_MAYONNAISE'),

('sauces', 'SAU_CAESAR', 'ING_CAESAR_DRESSING'),
('sauces', 'SAU_CAESAR', 'ING_PARMESAN'),
('sauces', 'SAU_CAESAR', 'ING_ANCHOVY'),
('sauces', 'SAU_CAESAR', 'ING_GARLIC'),

('sauces', 'SAU_TARTAR', 'ING_TARTAR_SAUCE'),
('sauces', 'SAU_TARTAR', 'ING_MAYONNAISE'),
('sauces', 'SAU_TARTAR', 'ING_PICKLE'),
('sauces', 'SAU_TARTAR', 'ING_CAPER'),

('sauces', 'SAU_THOUSAND_ISLAND', 'ING_THOUSAND_ISLAND'),
('sauces', 'SAU_THOUSAND_ISLAND', 'ING_MAYONNAISE'),
('sauces', 'SAU_THOUSAND_ISLAND', 'ING_KETCHUP'),
('sauces', 'SAU_THOUSAND_ISLAND', 'ING_PICKLE'),

('sauces', 'SAU_AIOLI', 'ING_MAYONNAISE'),
('sauces', 'SAU_AIOLI', 'ING_GARLIC'),
('sauces', 'SAU_AIOLI', 'ING_LEMON_JUICE'),
('sauces', 'SAU_AIOLI', 'ING_OLIVE_OIL'),

('sauces', 'SAU_REMOULADE', 'ING_REMOULADE'),
('sauces', 'SAU_REMOULADE', 'ING_MAYONNAISE'),
('sauces', 'SAU_REMOULADE', 'ING_CAPER'),
('sauces', 'SAU_REMOULADE', 'ING_MIXED_HERBS'),

-- =====================
-- ASIAN SAUCES
-- =====================
('sauces', 'SAU_SOY', 'ING_SOY_SAUCE'),
('sauces', 'SAU_SOY', 'ING_SALT'),

('sauces', 'SAU_TERIYAKI', 'ING_TERIYAKI_SAUCE'),
('sauces', 'SAU_TERIYAKI', 'ING_SOY_SAUCE'),
('sauces', 'SAU_TERIYAKI', 'ING_MIRIN'),
('sauces', 'SAU_TERIYAKI', 'ING_SUGAR'),

('sauces', 'SAU_HOISIN', 'ING_HOISIN_SAUCE'),
('sauces', 'SAU_HOISIN', 'ING_SESAME_SEEDS'),
('sauces', 'SAU_HOISIN', 'ING_GARLIC'),

('sauces', 'SAU_PONZU', 'ING_PONZU'),
('sauces', 'SAU_PONZU', 'ING_SOY_SAUCE'),
('sauces', 'SAU_PONZU', 'ING_YUZU'),
('sauces', 'SAU_PONZU', 'ING_VINEGAR'),

('sauces', 'SAU_SWEET_CHILI', 'ING_SWEET_CHILI_SAUCE'),
('sauces', 'SAU_SWEET_CHILI', 'ING_CHILI'),
('sauces', 'SAU_SWEET_CHILI', 'ING_GARLIC'),
('sauces', 'SAU_SWEET_CHILI', 'ING_SUGAR'),

('sauces', 'SAU_PEANUT', 'ING_PEANUT_SAUCE'),
('sauces', 'SAU_PEANUT', 'ING_PEANUT_BUTTER'),
('sauces', 'SAU_PEANUT', 'ING_COCONUT_MILK'),
('sauces', 'SAU_PEANUT', 'ING_SOY_SAUCE'),

('sauces', 'SAU_TONKATSU', 'ING_TONKATSU_SAUCE'),
('sauces', 'SAU_TONKATSU', 'ING_WORCESTERSHIRE'),
('sauces', 'SAU_TONKATSU', 'ING_TOMATO'),

('sauces', 'SAU_OYSTER', 'ING_OYSTER_SAUCE'),
('sauces', 'SAU_OYSTER', 'ING_SOY_SAUCE'),
('sauces', 'SAU_OYSTER', 'ING_SUGAR'),

-- =====================
-- MEDITERRANEAN SAUCES
-- =====================
('sauces', 'SAU_TZATZIKI', 'ING_TZATZIKI'),
('sauces', 'SAU_TZATZIKI', 'ING_GREEK_YOGURT'),
('sauces', 'SAU_TZATZIKI', 'ING_CUCUMBER'),
('sauces', 'SAU_TZATZIKI', 'ING_GARLIC'),
('sauces', 'SAU_TZATZIKI', 'ING_DILL'),

('sauces', 'SAU_HUMMUS', 'ING_HUMMUS'),
('sauces', 'SAU_HUMMUS', 'ING_CHICKPEA'),
('sauces', 'SAU_HUMMUS', 'ING_TAHINI'),
('sauces', 'SAU_HUMMUS', 'ING_LEMON_JUICE'),
('sauces', 'SAU_HUMMUS', 'ING_GARLIC'),

('sauces', 'SAU_TAHINI', 'ING_TAHINI'),
('sauces', 'SAU_TAHINI', 'ING_LEMON_JUICE'),
('sauces', 'SAU_TAHINI', 'ING_GARLIC'),
('sauces', 'SAU_TAHINI', 'ING_WATER'),

('sauces', 'SAU_PESTO', 'ING_PESTO_GENOVESE'),
('sauces', 'SAU_PESTO', 'ING_BASIL'),
('sauces', 'SAU_PESTO', 'ING_PINE_NUTS'),
('sauces', 'SAU_PESTO', 'ING_PARMESAN'),
('sauces', 'SAU_PESTO', 'ING_OLIVE_OIL'),

('sauces', 'SAU_BABA_GANOUSH', 'ING_EGGPLANT'),
('sauces', 'SAU_BABA_GANOUSH', 'ING_TAHINI'),
('sauces', 'SAU_BABA_GANOUSH', 'ING_LEMON_JUICE'),
('sauces', 'SAU_BABA_GANOUSH', 'ING_GARLIC'),

-- =====================
-- MEAT SAUCES
-- =====================
('sauces', 'SAU_GRAVY', 'ING_GRAVY'),
('sauces', 'SAU_GRAVY', 'ING_BEEF_STOCK'),
('sauces', 'SAU_GRAVY', 'ING_FLOUR'),
('sauces', 'SAU_GRAVY', 'ING_BUTTER'),

('sauces', 'SAU_CHIMICHURRI', 'ING_CHIMICHURRI'),
('sauces', 'SAU_CHIMICHURRI', 'ING_PARSLEY'),
('sauces', 'SAU_CHIMICHURRI', 'ING_GARLIC'),
('sauces', 'SAU_CHIMICHURRI', 'ING_OLIVE_OIL'),
('sauces', 'SAU_CHIMICHURRI', 'ING_OREGANO'),

('sauces', 'SAU_BEARNAISE', 'ING_BEARNAISE'),
('sauces', 'SAU_BEARNAISE', 'ING_BUTTER'),
('sauces', 'SAU_BEARNAISE', 'ING_EGG'),
('sauces', 'SAU_BEARNAISE', 'ING_TARRAGON'),
('sauces', 'SAU_BEARNAISE', 'ING_SHALLOT'),

('sauces', 'SAU_PEPPERCORN', 'ING_PEPPERCORN_SAUCE'),
('sauces', 'SAU_PEPPERCORN', 'ING_HEAVY_CREAM'),
('sauces', 'SAU_PEPPERCORN', 'ING_GREEN_PEPPERCORNS'),
('sauces', 'SAU_PEPPERCORN', 'ING_BRANDY'),

('sauces', 'SAU_MUSHROOM', 'ING_MUSHROOM_SAUCE'),
('sauces', 'SAU_MUSHROOM', 'ING_MUSHROOM'),
('sauces', 'SAU_MUSHROOM', 'ING_HEAVY_CREAM'),
('sauces', 'SAU_MUSHROOM', 'ING_BUTTER'),

('sauces', 'SAU_BBQ', 'ING_BBQ_SAUCE'),
('sauces', 'SAU_BBQ', 'ING_TOMATO'),
('sauces', 'SAU_BBQ', 'ING_MOLASSES'),
('sauces', 'SAU_BBQ', 'ING_VINEGAR'),

-- =====================
-- SWEET SAUCES
-- =====================
('sauces', 'SAU_HONEY_MUSTARD', 'ING_HONEY_MUSTARD'),
('sauces', 'SAU_HONEY_MUSTARD', 'ING_HONEY'),
('sauces', 'SAU_HONEY_MUSTARD', 'ING_DIJON_MUSTARD'),
('sauces', 'SAU_HONEY_MUSTARD', 'ING_MAYONNAISE'),

('sauces', 'SAU_MANGO_CHUTNEY', 'ING_MANGO_CHUTNEY'),
('sauces', 'SAU_MANGO_CHUTNEY', 'ING_MANGO'),
('sauces', 'SAU_MANGO_CHUTNEY', 'ING_SUGAR'),
('sauces', 'SAU_MANGO_CHUTNEY', 'ING_VINEGAR'),
('sauces', 'SAU_MANGO_CHUTNEY', 'ING_GINGER')

ON CONFLICT DO NOTHING;
