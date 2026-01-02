-- Belgian Cuisine - Product Ingredients Links
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-25
-- Total: 32 dishes, ~240 ingredient links

-- Clear existing links for belgian products
DELETE FROM product_ingredients WHERE product_type = 'belgian';

-- =====================
-- MAINS
-- =====================
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES
-- BEL_CARBONNADE (8 ingredients)
('belgian', 'BEL_CARBONNADE', 'ING_BEEF_CHUCK'),
('belgian', 'BEL_CARBONNADE', 'ING_BELGIAN_BEER'),
('belgian', 'BEL_CARBONNADE', 'ING_ONION'),
('belgian', 'BEL_CARBONNADE', 'ING_DIJON_MUSTARD'),
('belgian', 'BEL_CARBONNADE', 'ING_BROWN_SUGAR'),
('belgian', 'BEL_CARBONNADE', 'ING_BAY_LEAVES'),
('belgian', 'BEL_CARBONNADE', 'ING_THYME'),
('belgian', 'BEL_CARBONNADE', 'ING_BEEF_BROTH'),

-- BEL_WATERZOOI_CHICKEN (10 ingredients)
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_CHICKEN'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_LEEK'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_CARROT'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_CELERY'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_POTATO'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_EGG_YOLK'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_BUTTER'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_PARSLEY'),
('belgian', 'BEL_WATERZOOI_CHICKEN', 'ING_CHICKEN_BROTH'),

-- BEL_WATERZOOI_FISH (11 ingredients)
('belgian', 'BEL_WATERZOOI_FISH', 'ING_COD'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_SOLE'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_LEEK'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_CARROT'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_CELERY'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_POTATO'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_EGG_YOLK'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_BUTTER'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_PARSLEY'),
('belgian', 'BEL_WATERZOOI_FISH', 'ING_FISH_STOCK'),

-- BEL_VOL_AU_VENT (9 ingredients)
('belgian', 'BEL_VOL_AU_VENT', 'ING_PUFF_PASTRY'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_CHICKEN'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_MUSHROOM'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_SWEETBREAD'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_BUTTER'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_FLOUR'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_CHICKEN_BROTH'),
('belgian', 'BEL_VOL_AU_VENT', 'ING_EGG_YOLK'),

-- BEL_STOEMP (7 ingredients)
('belgian', 'BEL_STOEMP', 'ING_POTATO'),
('belgian', 'BEL_STOEMP', 'ING_CARROT'),
('belgian', 'BEL_STOEMP', 'ING_LEEK'),
('belgian', 'BEL_STOEMP', 'ING_BUTTER'),
('belgian', 'BEL_STOEMP', 'ING_MILK'),
('belgian', 'BEL_STOEMP', 'ING_NUTMEG'),
('belgian', 'BEL_STOEMP', 'ING_SAUSAGE'),

-- BEL_BOULETS_LIEGEOISE (8 ingredients)
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_GROUND_BEEF'),
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_GROUND_PORK'),
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_BREADCRUMB'),
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_EGG'),
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_ONION'),
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_SIROP_LIEGE'),
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_APPLE_CIDER_VINEGAR'),
('belgian', 'BEL_BOULETS_LIEGEOISE', 'ING_BEEF_BROTH'),

-- BEL_LAPIN_GUEUZE (7 ingredients)
('belgian', 'BEL_LAPIN_GUEUZE', 'ING_RABBIT'),
('belgian', 'BEL_LAPIN_GUEUZE', 'ING_GUEUZE_BEER'),
('belgian', 'BEL_LAPIN_GUEUZE', 'ING_PRUNE'),
('belgian', 'BEL_LAPIN_GUEUZE', 'ING_DIJON_MUSTARD'),
('belgian', 'BEL_LAPIN_GUEUZE', 'ING_ONION'),
('belgian', 'BEL_LAPIN_GUEUZE', 'ING_THYME'),
('belgian', 'BEL_LAPIN_GUEUZE', 'ING_BAY_LEAVES'),

-- BEL_WITLOOF_GRATIN (7 ingredients)
('belgian', 'BEL_WITLOOF_GRATIN', 'ING_ENDIVE'),
('belgian', 'BEL_WITLOOF_GRATIN', 'ING_HAM'),
('belgian', 'BEL_WITLOOF_GRATIN', 'ING_GRUYERE'),
('belgian', 'BEL_WITLOOF_GRATIN', 'ING_BUTTER'),
('belgian', 'BEL_WITLOOF_GRATIN', 'ING_FLOUR'),
('belgian', 'BEL_WITLOOF_GRATIN', 'ING_MILK'),
('belgian', 'BEL_WITLOOF_GRATIN', 'ING_NUTMEG'),

-- =====================
-- SEAFOOD
-- =====================
-- BEL_MOULES_FRITES (8 ingredients)
('belgian', 'BEL_MOULES_FRITES', 'ING_MUSSELS'),
('belgian', 'BEL_MOULES_FRITES', 'ING_WHITE_WINE'),
('belgian', 'BEL_MOULES_FRITES', 'ING_CELERY'),
('belgian', 'BEL_MOULES_FRITES', 'ING_ONION'),
('belgian', 'BEL_MOULES_FRITES', 'ING_GARLIC'),
('belgian', 'BEL_MOULES_FRITES', 'ING_BUTTER'),
('belgian', 'BEL_MOULES_FRITES', 'ING_PARSLEY'),
('belgian', 'BEL_MOULES_FRITES', 'ING_POTATO'),

-- BEL_MOULES_BIERE (7 ingredients)
('belgian', 'BEL_MOULES_BIERE', 'ING_MUSSELS'),
('belgian', 'BEL_MOULES_BIERE', 'ING_BELGIAN_BEER'),
('belgian', 'BEL_MOULES_BIERE', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_MOULES_BIERE', 'ING_CELERY'),
('belgian', 'BEL_MOULES_BIERE', 'ING_ONION'),
('belgian', 'BEL_MOULES_BIERE', 'ING_GARLIC'),
('belgian', 'BEL_MOULES_BIERE', 'ING_THYME'),

-- BEL_TOMATE_CREVETTES (6 ingredients)
('belgian', 'BEL_TOMATE_CREVETTES', 'ING_GREY_SHRIMP'),
('belgian', 'BEL_TOMATE_CREVETTES', 'ING_TOMATO'),
('belgian', 'BEL_TOMATE_CREVETTES', 'ING_MAYONNAISE'),
('belgian', 'BEL_TOMATE_CREVETTES', 'ING_LEMON_JUICE'),
('belgian', 'BEL_TOMATE_CREVETTES', 'ING_CHIVES'),
('belgian', 'BEL_TOMATE_CREVETTES', 'ING_LETTUCE'),

-- BEL_ANGUILLES_VERT (9 ingredients)
('belgian', 'BEL_ANGUILLES_VERT', 'ING_EEL'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_SPINACH'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_SORREL'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_PARSLEY'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_CHERVIL'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_TARRAGON'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_BUTTER'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_EGG_YOLK'),
('belgian', 'BEL_ANGUILLES_VERT', 'ING_WHITE_WINE'),

-- BEL_CROQUETTES_CREVETTES (8 ingredients)
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_GREY_SHRIMP'),
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_BUTTER'),
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_FLOUR'),
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_MILK'),
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_EGG'),
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_BREADCRUMB'),
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_PARSLEY'),
('belgian', 'BEL_CROQUETTES_CREVETTES', 'ING_NUTMEG'),

-- =====================
-- FRITES
-- =====================
-- BEL_FRITES (3 ingredients)
('belgian', 'BEL_FRITES', 'ING_POTATO'),
('belgian', 'BEL_FRITES', 'ING_BEEF_TALLOW'),
('belgian', 'BEL_FRITES', 'ING_SALT'),

-- BEL_FRICADELLE (6 ingredients)
('belgian', 'BEL_FRICADELLE', 'ING_GROUND_BEEF'),
('belgian', 'BEL_FRICADELLE', 'ING_GROUND_PORK'),
('belgian', 'BEL_FRICADELLE', 'ING_BREADCRUMB'),
('belgian', 'BEL_FRICADELLE', 'ING_ONION'),
('belgian', 'BEL_FRICADELLE', 'ING_NUTMEG'),
('belgian', 'BEL_FRICADELLE', 'ING_WHITE_PEPPER'),

-- BEL_MITRAILLETTE (6 ingredients)
('belgian', 'BEL_MITRAILLETTE', 'ING_BAGUETTE'),
('belgian', 'BEL_MITRAILLETTE', 'ING_GROUND_BEEF'),
('belgian', 'BEL_MITRAILLETTE', 'ING_POTATO'),
('belgian', 'BEL_MITRAILLETTE', 'ING_MAYONNAISE'),
('belgian', 'BEL_MITRAILLETTE', 'ING_ONION'),
('belgian', 'BEL_MITRAILLETTE', 'ING_LETTUCE'),

-- BEL_FRITES_STOOFVLEES (7 ingredients)
('belgian', 'BEL_FRITES_STOOFVLEES', 'ING_POTATO'),
('belgian', 'BEL_FRITES_STOOFVLEES', 'ING_BEEF_CHUCK'),
('belgian', 'BEL_FRITES_STOOFVLEES', 'ING_BELGIAN_BEER'),
('belgian', 'BEL_FRITES_STOOFVLEES', 'ING_ONION'),
('belgian', 'BEL_FRITES_STOOFVLEES', 'ING_DIJON_MUSTARD'),
('belgian', 'BEL_FRITES_STOOFVLEES', 'ING_BEEF_TALLOW'),
('belgian', 'BEL_FRITES_STOOFVLEES', 'ING_MAYONNAISE'),

-- =====================
-- WAFFLES
-- =====================
-- BEL_WAFFLE_LIEGE (7 ingredients)
('belgian', 'BEL_WAFFLE_LIEGE', 'ING_FLOUR'),
('belgian', 'BEL_WAFFLE_LIEGE', 'ING_BUTTER'),
('belgian', 'BEL_WAFFLE_LIEGE', 'ING_EGG'),
('belgian', 'BEL_WAFFLE_LIEGE', 'ING_PEARL_SUGAR'),
('belgian', 'BEL_WAFFLE_LIEGE', 'ING_YEAST'),
('belgian', 'BEL_WAFFLE_LIEGE', 'ING_MILK'),
('belgian', 'BEL_WAFFLE_LIEGE', 'ING_VANILLA'),

-- BEL_WAFFLE_BRUSSELS (8 ingredients)
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_FLOUR'),
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_BUTTER'),
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_EGG'),
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_MILK'),
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_SUGAR'),
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_BAKING_POWDER'),
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_VANILLA'),
('belgian', 'BEL_WAFFLE_BRUSSELS', 'ING_POWDERED_SUGAR'),

-- BEL_WAFFLE_CHOCOLATE (7 ingredients)
('belgian', 'BEL_WAFFLE_CHOCOLATE', 'ING_FLOUR'),
('belgian', 'BEL_WAFFLE_CHOCOLATE', 'ING_BUTTER'),
('belgian', 'BEL_WAFFLE_CHOCOLATE', 'ING_EGG'),
('belgian', 'BEL_WAFFLE_CHOCOLATE', 'ING_MILK'),
('belgian', 'BEL_WAFFLE_CHOCOLATE', 'ING_BELGIAN_CHOCOLATE'),
('belgian', 'BEL_WAFFLE_CHOCOLATE', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_WAFFLE_CHOCOLATE', 'ING_VANILLA'),

-- BEL_WAFFLE_STRAWBERRY (7 ingredients)
('belgian', 'BEL_WAFFLE_STRAWBERRY', 'ING_FLOUR'),
('belgian', 'BEL_WAFFLE_STRAWBERRY', 'ING_BUTTER'),
('belgian', 'BEL_WAFFLE_STRAWBERRY', 'ING_EGG'),
('belgian', 'BEL_WAFFLE_STRAWBERRY', 'ING_MILK'),
('belgian', 'BEL_WAFFLE_STRAWBERRY', 'ING_STRAWBERRY'),
('belgian', 'BEL_WAFFLE_STRAWBERRY', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_WAFFLE_STRAWBERRY', 'ING_BELGIAN_CHOCOLATE'),

-- =====================
-- DESSERTS
-- =====================
-- BEL_SPECULOOS (8 ingredients)
('belgian', 'BEL_SPECULOOS', 'ING_FLOUR'),
('belgian', 'BEL_SPECULOOS', 'ING_BUTTER'),
('belgian', 'BEL_SPECULOOS', 'ING_BROWN_SUGAR'),
('belgian', 'BEL_SPECULOOS', 'ING_CINNAMON'),
('belgian', 'BEL_SPECULOOS', 'ING_CLOVE'),
('belgian', 'BEL_SPECULOOS', 'ING_NUTMEG'),
('belgian', 'BEL_SPECULOOS', 'ING_GINGER'),
('belgian', 'BEL_SPECULOOS', 'ING_BAKING_SODA'),

-- BEL_DAME_BLANCHE (4 ingredients)
('belgian', 'BEL_DAME_BLANCHE', 'ING_VANILLA_ICE_CREAM'),
('belgian', 'BEL_DAME_BLANCHE', 'ING_BELGIAN_CHOCOLATE'),
('belgian', 'BEL_DAME_BLANCHE', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_DAME_BLANCHE', 'ING_BUTTER'),

-- BEL_PRALINES (6 ingredients)
('belgian', 'BEL_PRALINES', 'ING_BELGIAN_CHOCOLATE'),
('belgian', 'BEL_PRALINES', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_PRALINES', 'ING_BUTTER'),
('belgian', 'BEL_PRALINES', 'ING_HAZELNUTS'),
('belgian', 'BEL_PRALINES', 'ING_SUGAR'),
('belgian', 'BEL_PRALINES', 'ING_VANILLA'),

-- BEL_TARTE_SUCRE (6 ingredients)
('belgian', 'BEL_TARTE_SUCRE', 'ING_FLOUR'),
('belgian', 'BEL_TARTE_SUCRE', 'ING_BUTTER'),
('belgian', 'BEL_TARTE_SUCRE', 'ING_BROWN_SUGAR'),
('belgian', 'BEL_TARTE_SUCRE', 'ING_HEAVY_CREAM'),
('belgian', 'BEL_TARTE_SUCRE', 'ING_EGG'),
('belgian', 'BEL_TARTE_SUCRE', 'ING_VANILLA'),

-- BEL_RIJSTPAP (6 ingredients)
('belgian', 'BEL_RIJSTPAP', 'ING_RICE'),
('belgian', 'BEL_RIJSTPAP', 'ING_MILK'),
('belgian', 'BEL_RIJSTPAP', 'ING_SUGAR'),
('belgian', 'BEL_RIJSTPAP', 'ING_VANILLA'),
('belgian', 'BEL_RIJSTPAP', 'ING_CINNAMON'),
('belgian', 'BEL_RIJSTPAP', 'ING_BROWN_SUGAR'),

-- BEL_CUBERDON (3 ingredients)
('belgian', 'BEL_CUBERDON', 'ING_SUGAR'),
('belgian', 'BEL_CUBERDON', 'ING_RASPBERRY'),
('belgian', 'BEL_CUBERDON', 'ING_GUM_ARABIC'),

-- =====================
-- APPETIZERS
-- =====================
-- BEL_FILET_AMERICAIN (8 ingredients)
('belgian', 'BEL_FILET_AMERICAIN', 'ING_GROUND_BEEF'),
('belgian', 'BEL_FILET_AMERICAIN', 'ING_MAYONNAISE'),
('belgian', 'BEL_FILET_AMERICAIN', 'ING_DIJON_MUSTARD'),
('belgian', 'BEL_FILET_AMERICAIN', 'ING_WORCESTERSHIRE_SAUCE'),
('belgian', 'BEL_FILET_AMERICAIN', 'ING_ONION'),
('belgian', 'BEL_FILET_AMERICAIN', 'ING_CAPERS'),
('belgian', 'BEL_FILET_AMERICAIN', 'ING_PARSLEY'),
('belgian', 'BEL_FILET_AMERICAIN', 'ING_TABASCO'),

-- BEL_CROQUETTES_FROMAGE (7 ingredients)
('belgian', 'BEL_CROQUETTES_FROMAGE', 'ING_GOUDA'),
('belgian', 'BEL_CROQUETTES_FROMAGE', 'ING_BUTTER'),
('belgian', 'BEL_CROQUETTES_FROMAGE', 'ING_FLOUR'),
('belgian', 'BEL_CROQUETTES_FROMAGE', 'ING_MILK'),
('belgian', 'BEL_CROQUETTES_FROMAGE', 'ING_EGG'),
('belgian', 'BEL_CROQUETTES_FROMAGE', 'ING_BREADCRUMB'),
('belgian', 'BEL_CROQUETTES_FROMAGE', 'ING_NUTMEG'),

-- BEL_BITTERBALLEN (9 ingredients)
('belgian', 'BEL_BITTERBALLEN', 'ING_BEEF_BROTH'),
('belgian', 'BEL_BITTERBALLEN', 'ING_BEEF'),
('belgian', 'BEL_BITTERBALLEN', 'ING_BUTTER'),
('belgian', 'BEL_BITTERBALLEN', 'ING_FLOUR'),
('belgian', 'BEL_BITTERBALLEN', 'ING_ONION'),
('belgian', 'BEL_BITTERBALLEN', 'ING_GELATIN'),
('belgian', 'BEL_BITTERBALLEN', 'ING_EGG'),
('belgian', 'BEL_BITTERBALLEN', 'ING_BREADCRUMB'),
('belgian', 'BEL_BITTERBALLEN', 'ING_DIJON_MUSTARD'),

-- BEL_ASPERGES_FLAMANDES (5 ingredients)
('belgian', 'BEL_ASPERGES_FLAMANDES', 'ING_WHITE_ASPARAGUS'),
('belgian', 'BEL_ASPERGES_FLAMANDES', 'ING_EGG'),
('belgian', 'BEL_ASPERGES_FLAMANDES', 'ING_BUTTER'),
('belgian', 'BEL_ASPERGES_FLAMANDES', 'ING_PARSLEY'),
('belgian', 'BEL_ASPERGES_FLAMANDES', 'ING_NUTMEG'),

-- BEL_PATE_GAUMAIS (8 ingredients)
('belgian', 'BEL_PATE_GAUMAIS', 'ING_GROUND_PORK'),
('belgian', 'BEL_PATE_GAUMAIS', 'ING_VEAL'),
('belgian', 'BEL_PATE_GAUMAIS', 'ING_FLOUR'),
('belgian', 'BEL_PATE_GAUMAIS', 'ING_BUTTER'),
('belgian', 'BEL_PATE_GAUMAIS', 'ING_EGG'),
('belgian', 'BEL_PATE_GAUMAIS', 'ING_PARSLEY'),
('belgian', 'BEL_PATE_GAUMAIS', 'ING_THYME'),
('belgian', 'BEL_PATE_GAUMAIS', 'ING_WHITE_WINE');

-- Verify count
SELECT 'Belgian product_ingredients inserted: ' || COUNT(*) AS status FROM product_ingredients WHERE product_type = 'belgian';
