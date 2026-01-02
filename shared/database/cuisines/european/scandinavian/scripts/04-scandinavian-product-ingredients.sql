-- Scandinavian Cuisine - Product Ingredients Links
-- GUDBRO Database Standards v1.7
-- Generated: 2025-12-24
--
-- Total dishes: 78
-- Total ingredient links: ~520

-- Clear existing links
DELETE FROM product_ingredients WHERE product_type = 'scandinavian';

-- Insert ingredient links
INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES

-- ============================================
-- MAINS (21 dishes)
-- ============================================

-- SCA_SWEDISH_MEATBALLS (10)
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_PORK'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_BEEF'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_BREADCRUMB'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_EGG'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_ONION'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_CREAM'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_BUTTER'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_LINGONBERRY_JAM'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_ALLSPICE'),
('scandinavian', 'SCA_SWEDISH_MEATBALLS', 'ING_NUTMEG'),

-- SCA_FARIKAL (6)
('scandinavian', 'SCA_FARIKAL', 'ING_LAMB'),
('scandinavian', 'SCA_FARIKAL', 'ING_CABBAGE'),
('scandinavian', 'SCA_FARIKAL', 'ING_BLACK_PEPPER'),
('scandinavian', 'SCA_FARIKAL', 'ING_SALT'),
('scandinavian', 'SCA_FARIKAL', 'ING_FLOUR'),
('scandinavian', 'SCA_FARIKAL', 'ING_WATER'),

-- SCA_STEGT_FLAESK (7)
('scandinavian', 'SCA_STEGT_FLAESK', 'ING_PORK_BELLY'),
('scandinavian', 'SCA_STEGT_FLAESK', 'ING_POTATO'),
('scandinavian', 'SCA_STEGT_FLAESK', 'ING_PARSLEY'),
('scandinavian', 'SCA_STEGT_FLAESK', 'ING_BUTTER'),
('scandinavian', 'SCA_STEGT_FLAESK', 'ING_FLOUR'),
('scandinavian', 'SCA_STEGT_FLAESK', 'ING_MILK'),
('scandinavian', 'SCA_STEGT_FLAESK', 'ING_SALT'),

-- SCA_FINNBIFF (7)
('scandinavian', 'SCA_FINNBIFF', 'ING_REINDEER'),
('scandinavian', 'SCA_FINNBIFF', 'ING_CREAM'),
('scandinavian', 'SCA_FINNBIFF', 'ING_BUTTER'),
('scandinavian', 'SCA_FINNBIFF', 'ING_ONION'),
('scandinavian', 'SCA_FINNBIFF', 'ING_JUNIPER_BERRIES'),
('scandinavian', 'SCA_FINNBIFF', 'ING_LINGONBERRY_JAM'),
('scandinavian', 'SCA_FINNBIFF', 'ING_BEEF_STOCK'),

-- SCA_JANSSONS_FRESTELSE (6)
('scandinavian', 'SCA_JANSSONS_FRESTELSE', 'ING_POTATO'),
('scandinavian', 'SCA_JANSSONS_FRESTELSE', 'ING_ANCHOVY'),
('scandinavian', 'SCA_JANSSONS_FRESTELSE', 'ING_ONION'),
('scandinavian', 'SCA_JANSSONS_FRESTELSE', 'ING_CREAM'),
('scandinavian', 'SCA_JANSSONS_FRESTELSE', 'ING_BUTTER'),
('scandinavian', 'SCA_JANSSONS_FRESTELSE', 'ING_BREADCRUMB'),

-- SCA_KALOPS (7)
('scandinavian', 'SCA_KALOPS', 'ING_BEEF_CHUCK'),
('scandinavian', 'SCA_KALOPS', 'ING_ONION'),
('scandinavian', 'SCA_KALOPS', 'ING_CARROT'),
('scandinavian', 'SCA_KALOPS', 'ING_ALLSPICE'),
('scandinavian', 'SCA_KALOPS', 'ING_BAY_LEAF'),
('scandinavian', 'SCA_KALOPS', 'ING_BEEF_STOCK'),
('scandinavian', 'SCA_KALOPS', 'ING_BLACK_PEPPER'),

-- SCA_KARJALANPAISTI (8)
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_PORK'),
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_BEEF'),
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_LAMB'),
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_ONION'),
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_CARROT'),
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_ALLSPICE'),
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_BAY_LEAF'),
('scandinavian', 'SCA_KARJALANPAISTI', 'ING_SALT'),

-- SCA_FRIKADELLER (8)
('scandinavian', 'SCA_FRIKADELLER', 'ING_PORK'),
('scandinavian', 'SCA_FRIKADELLER', 'ING_ONION'),
('scandinavian', 'SCA_FRIKADELLER', 'ING_EGG'),
('scandinavian', 'SCA_FRIKADELLER', 'ING_FLOUR'),
('scandinavian', 'SCA_FRIKADELLER', 'ING_MILK'),
('scandinavian', 'SCA_FRIKADELLER', 'ING_BUTTER'),
('scandinavian', 'SCA_FRIKADELLER', 'ING_SALT'),
('scandinavian', 'SCA_FRIKADELLER', 'ING_WHITE_PEPPER'),

-- SCA_PYTT_I_PANNA (7)
('scandinavian', 'SCA_PYTT_I_PANNA', 'ING_POTATO'),
('scandinavian', 'SCA_PYTT_I_PANNA', 'ING_BEEF'),
('scandinavian', 'SCA_PYTT_I_PANNA', 'ING_PORK'),
('scandinavian', 'SCA_PYTT_I_PANNA', 'ING_ONION'),
('scandinavian', 'SCA_PYTT_I_PANNA', 'ING_EGG'),
('scandinavian', 'SCA_PYTT_I_PANNA', 'ING_BUTTER'),
('scandinavian', 'SCA_PYTT_I_PANNA', 'ING_PICKLED_BEET'),

-- SCA_PORONKARISTYS (6)
('scandinavian', 'SCA_PORONKARISTYS', 'ING_REINDEER'),
('scandinavian', 'SCA_PORONKARISTYS', 'ING_BUTTER'),
('scandinavian', 'SCA_PORONKARISTYS', 'ING_ONION'),
('scandinavian', 'SCA_PORONKARISTYS', 'ING_LINGONBERRY_JAM'),
('scandinavian', 'SCA_PORONKARISTYS', 'ING_CREAM'),
('scandinavian', 'SCA_PORONKARISTYS', 'ING_BLACK_PEPPER'),

-- SCA_FALUKORV (6)
('scandinavian', 'SCA_FALUKORV', 'ING_PORK'),
('scandinavian', 'SCA_FALUKORV', 'ING_BEEF'),
('scandinavian', 'SCA_FALUKORV', 'ING_POTATO_STARCH'),
('scandinavian', 'SCA_FALUKORV', 'ING_ONION'),
('scandinavian', 'SCA_FALUKORV', 'ING_POTATO'),
('scandinavian', 'SCA_FALUKORV', 'ING_BUTTER'),

-- SCA_RAGGMUNK (7)
('scandinavian', 'SCA_RAGGMUNK', 'ING_POTATO'),
('scandinavian', 'SCA_RAGGMUNK', 'ING_FLOUR'),
('scandinavian', 'SCA_RAGGMUNK', 'ING_EGG'),
('scandinavian', 'SCA_RAGGMUNK', 'ING_MILK'),
('scandinavian', 'SCA_RAGGMUNK', 'ING_PORK_BELLY'),
('scandinavian', 'SCA_RAGGMUNK', 'ING_LINGONBERRY_JAM'),
('scandinavian', 'SCA_RAGGMUNK', 'ING_BUTTER'),

-- SCA_WALLENBERGARE (7)
('scandinavian', 'SCA_WALLENBERGARE', 'ING_VEAL'),
('scandinavian', 'SCA_WALLENBERGARE', 'ING_EGG'),
('scandinavian', 'SCA_WALLENBERGARE', 'ING_CREAM'),
('scandinavian', 'SCA_WALLENBERGARE', 'ING_BREADCRUMB'),
('scandinavian', 'SCA_WALLENBERGARE', 'ING_BUTTER'),
('scandinavian', 'SCA_WALLENBERGARE', 'ING_PEA'),
('scandinavian', 'SCA_WALLENBERGARE', 'ING_LINGONBERRY_JAM'),

-- SCA_KORVSTROGANOFF (7)
('scandinavian', 'SCA_KORVSTROGANOFF', 'ING_PORK'),
('scandinavian', 'SCA_KORVSTROGANOFF', 'ING_CREAM'),
('scandinavian', 'SCA_KORVSTROGANOFF', 'ING_TOMATO_PASTE'),
('scandinavian', 'SCA_KORVSTROGANOFF', 'ING_ONION'),
('scandinavian', 'SCA_KORVSTROGANOFF', 'ING_RICE'),
('scandinavian', 'SCA_KORVSTROGANOFF', 'ING_BUTTER'),
('scandinavian', 'SCA_KORVSTROGANOFF', 'ING_SOY_SAUCE'),

-- SCA_PINNEKJOTT (4)
('scandinavian', 'SCA_PINNEKJOTT', 'ING_LAMB'),
('scandinavian', 'SCA_PINNEKJOTT', 'ING_SALT'),
('scandinavian', 'SCA_PINNEKJOTT', 'ING_POTATO'),
('scandinavian', 'SCA_PINNEKJOTT', 'ING_SWEDE'),

-- SCA_KJOTTKAKER (8)
('scandinavian', 'SCA_KJOTTKAKER', 'ING_BEEF'),
('scandinavian', 'SCA_KJOTTKAKER', 'ING_PORK'),
('scandinavian', 'SCA_KJOTTKAKER', 'ING_ONION'),
('scandinavian', 'SCA_KJOTTKAKER', 'ING_BREADCRUMB'),
('scandinavian', 'SCA_KJOTTKAKER', 'ING_MILK'),
('scandinavian', 'SCA_KJOTTKAKER', 'ING_NUTMEG'),
('scandinavian', 'SCA_KJOTTKAKER', 'ING_GINGER'),
('scandinavian', 'SCA_KJOTTKAKER', 'ING_BUTTER'),

-- SCA_RASPEBALLER (6)
('scandinavian', 'SCA_RASPEBALLER', 'ING_POTATO'),
('scandinavian', 'SCA_RASPEBALLER', 'ING_BARLEY'),
('scandinavian', 'SCA_RASPEBALLER', 'ING_PORK_BELLY'),
('scandinavian', 'SCA_RASPEBALLER', 'ING_BUTTER'),
('scandinavian', 'SCA_RASPEBALLER', 'ING_SALT'),
('scandinavian', 'SCA_RASPEBALLER', 'ING_SWEDE'),

-- SCA_FENALAR (2)
('scandinavian', 'SCA_FENALAR', 'ING_LAMB'),
('scandinavian', 'SCA_FENALAR', 'ING_SALT'),

-- SCA_FLAESKESTEG (4)
('scandinavian', 'SCA_FLAESKESTEG', 'ING_PORK'),
('scandinavian', 'SCA_FLAESKESTEG', 'ING_SALT'),
('scandinavian', 'SCA_FLAESKESTEG', 'ING_BAY_LEAF'),
('scandinavian', 'SCA_FLAESKESTEG', 'ING_CLOVE'),

-- SCA_MEDISTERPOLSE (6)
('scandinavian', 'SCA_MEDISTERPOLSE', 'ING_PORK'),
('scandinavian', 'SCA_MEDISTERPOLSE', 'ING_ONION'),
('scandinavian', 'SCA_MEDISTERPOLSE', 'ING_ALLSPICE'),
('scandinavian', 'SCA_MEDISTERPOLSE', 'ING_CLOVE'),
('scandinavian', 'SCA_MEDISTERPOLSE', 'ING_POTATO'),
('scandinavian', 'SCA_MEDISTERPOLSE', 'ING_BUTTER'),

-- SCA_TARTELETTER (7)
('scandinavian', 'SCA_TARTELETTER', 'ING_PUFF_PASTRY'),
('scandinavian', 'SCA_TARTELETTER', 'ING_CHICKEN'),
('scandinavian', 'SCA_TARTELETTER', 'ING_ASPARAGUS'),
('scandinavian', 'SCA_TARTELETTER', 'ING_CREAM'),
('scandinavian', 'SCA_TARTELETTER', 'ING_BUTTER'),
('scandinavian', 'SCA_TARTELETTER', 'ING_FLOUR'),
('scandinavian', 'SCA_TARTELETTER', 'ING_WHITE_WINE'),

-- ============================================
-- FISH (10 dishes)
-- ============================================

-- SCA_GRAVLAX (5)
('scandinavian', 'SCA_GRAVLAX', 'ING_SALMON'),
('scandinavian', 'SCA_GRAVLAX', 'ING_DILL'),
('scandinavian', 'SCA_GRAVLAX', 'ING_SUGAR'),
('scandinavian', 'SCA_GRAVLAX', 'ING_SALT'),
('scandinavian', 'SCA_GRAVLAX', 'ING_WHITE_PEPPER'),

-- SCA_PICKLED_HERRING (7)
('scandinavian', 'SCA_PICKLED_HERRING', 'ING_HERRING'),
('scandinavian', 'SCA_PICKLED_HERRING', 'ING_VINEGAR'),
('scandinavian', 'SCA_PICKLED_HERRING', 'ING_SUGAR'),
('scandinavian', 'SCA_PICKLED_HERRING', 'ING_ONION'),
('scandinavian', 'SCA_PICKLED_HERRING', 'ING_ALLSPICE'),
('scandinavian', 'SCA_PICKLED_HERRING', 'ING_BAY_LEAF'),
('scandinavian', 'SCA_PICKLED_HERRING', 'ING_DILL'),

-- SCA_LUTEFISK (5)
('scandinavian', 'SCA_LUTEFISK', 'ING_COD'),
('scandinavian', 'SCA_LUTEFISK', 'ING_BUTTER'),
('scandinavian', 'SCA_LUTEFISK', 'ING_BACON'),
('scandinavian', 'SCA_LUTEFISK', 'ING_POTATO'),
('scandinavian', 'SCA_LUTEFISK', 'ING_MUSTARD'),

-- SCA_STEKT_STROMMING (5)
('scandinavian', 'SCA_STEKT_STROMMING', 'ING_HERRING'),
('scandinavian', 'SCA_STEKT_STROMMING', 'ING_RYE_FLOUR'),
('scandinavian', 'SCA_STEKT_STROMMING', 'ING_BUTTER'),
('scandinavian', 'SCA_STEKT_STROMMING', 'ING_LINGONBERRY_JAM'),
('scandinavian', 'SCA_STEKT_STROMMING', 'ING_DILL'),

-- SCA_RAKFISK (6)
('scandinavian', 'SCA_RAKFISK', 'ING_TROUT'),
('scandinavian', 'SCA_RAKFISK', 'ING_SALT'),
('scandinavian', 'SCA_RAKFISK', 'ING_SUGAR'),
('scandinavian', 'SCA_RAKFISK', 'ING_SOUR_CREAM'),
('scandinavian', 'SCA_RAKFISK', 'ING_ONION'),
('scandinavian', 'SCA_RAKFISK', 'ING_FLATBREAD'),

-- SCA_KALAKUKKO (5)
('scandinavian', 'SCA_KALAKUKKO', 'ING_RYE_FLOUR'),
('scandinavian', 'SCA_KALAKUKKO', 'ING_VENDACE'),
('scandinavian', 'SCA_KALAKUKKO', 'ING_PORK_BELLY'),
('scandinavian', 'SCA_KALAKUKKO', 'ING_SALT'),
('scandinavian', 'SCA_KALAKUKKO', 'ING_BUTTER'),

-- SCA_FISH_CAKES (7)
('scandinavian', 'SCA_FISH_CAKES', 'ING_COD'),
('scandinavian', 'SCA_FISH_CAKES', 'ING_POTATO_STARCH'),
('scandinavian', 'SCA_FISH_CAKES', 'ING_EGG'),
('scandinavian', 'SCA_FISH_CAKES', 'ING_MILK'),
('scandinavian', 'SCA_FISH_CAKES', 'ING_ONION'),
('scandinavian', 'SCA_FISH_CAKES', 'ING_NUTMEG'),
('scandinavian', 'SCA_FISH_CAKES', 'ING_BUTTER'),

-- SCA_ROKT_LAX (4)
('scandinavian', 'SCA_ROKT_LAX', 'ING_SALMON'),
('scandinavian', 'SCA_ROKT_LAX', 'ING_SALT'),
('scandinavian', 'SCA_ROKT_LAX', 'ING_SUGAR'),
('scandinavian', 'SCA_ROKT_LAX', 'ING_DILL'),

-- SCA_MUIKKU (5)
('scandinavian', 'SCA_MUIKKU', 'ING_VENDACE'),
('scandinavian', 'SCA_MUIKKU', 'ING_RYE_FLOUR'),
('scandinavian', 'SCA_MUIKKU', 'ING_BUTTER'),
('scandinavian', 'SCA_MUIKKU', 'ING_SALT'),
('scandinavian', 'SCA_MUIKKU', 'ING_LEMON'),

-- SCA_SURSTROMMING (5)
('scandinavian', 'SCA_SURSTROMMING', 'ING_HERRING'),
('scandinavian', 'SCA_SURSTROMMING', 'ING_SALT'),
('scandinavian', 'SCA_SURSTROMMING', 'ING_FLATBREAD'),
('scandinavian', 'SCA_SURSTROMMING', 'ING_ONION'),
('scandinavian', 'SCA_SURSTROMMING', 'ING_POTATO'),

-- ============================================
-- OPEN SANDWICH (8 dishes)
-- ============================================

-- SCA_SMORREBROD_HERRING (6)
('scandinavian', 'SCA_SMORREBROD_HERRING', 'ING_RYE_BREAD'),
('scandinavian', 'SCA_SMORREBROD_HERRING', 'ING_HERRING'),
('scandinavian', 'SCA_SMORREBROD_HERRING', 'ING_ONION'),
('scandinavian', 'SCA_SMORREBROD_HERRING', 'ING_CAPER'),
('scandinavian', 'SCA_SMORREBROD_HERRING', 'ING_CURRY_POWDER'),
('scandinavian', 'SCA_SMORREBROD_HERRING', 'ING_BUTTER'),

-- SCA_SMORREBROD_ROAST_BEEF (6)
('scandinavian', 'SCA_SMORREBROD_ROAST_BEEF', 'ING_RYE_BREAD'),
('scandinavian', 'SCA_SMORREBROD_ROAST_BEEF', 'ING_ROAST_BEEF'),
('scandinavian', 'SCA_SMORREBROD_ROAST_BEEF', 'ING_REMOULADE'),
('scandinavian', 'SCA_SMORREBROD_ROAST_BEEF', 'ING_FRIED_ONION'),
('scandinavian', 'SCA_SMORREBROD_ROAST_BEEF', 'ING_HORSERADISH'),
('scandinavian', 'SCA_SMORREBROD_ROAST_BEEF', 'ING_BUTTER'),

-- SCA_SMORREBROD_SHRIMP (6)
('scandinavian', 'SCA_SMORREBROD_SHRIMP', 'ING_WHITE_BREAD'),
('scandinavian', 'SCA_SMORREBROD_SHRIMP', 'ING_SHRIMP'),
('scandinavian', 'SCA_SMORREBROD_SHRIMP', 'ING_MAYONNAISE'),
('scandinavian', 'SCA_SMORREBROD_SHRIMP', 'ING_LEMON'),
('scandinavian', 'SCA_SMORREBROD_SHRIMP', 'ING_DILL'),
('scandinavian', 'SCA_SMORREBROD_SHRIMP', 'ING_BUTTER'),

-- SCA_SMORREBROD_LEVERPOSTEJ (6)
('scandinavian', 'SCA_SMORREBROD_LEVERPOSTEJ', 'ING_RYE_BREAD'),
('scandinavian', 'SCA_SMORREBROD_LEVERPOSTEJ', 'ING_LIVER_PATE'),
('scandinavian', 'SCA_SMORREBROD_LEVERPOSTEJ', 'ING_BACON'),
('scandinavian', 'SCA_SMORREBROD_LEVERPOSTEJ', 'ING_MUSHROOM'),
('scandinavian', 'SCA_SMORREBROD_LEVERPOSTEJ', 'ING_PICKLED_CUCUMBER'),
('scandinavian', 'SCA_SMORREBROD_LEVERPOSTEJ', 'ING_BUTTER'),

-- SCA_SMORREBROD_EGG (6)
('scandinavian', 'SCA_SMORREBROD_EGG', 'ING_RYE_BREAD'),
('scandinavian', 'SCA_SMORREBROD_EGG', 'ING_EGG'),
('scandinavian', 'SCA_SMORREBROD_EGG', 'ING_SHRIMP'),
('scandinavian', 'SCA_SMORREBROD_EGG', 'ING_MAYONNAISE'),
('scandinavian', 'SCA_SMORREBROD_EGG', 'ING_CHIVES'),
('scandinavian', 'SCA_SMORREBROD_EGG', 'ING_BUTTER'),

-- SCA_RAKORSMORGOS (7)
('scandinavian', 'SCA_RAKORSMORGOS', 'ING_WHITE_BREAD'),
('scandinavian', 'SCA_RAKORSMORGOS', 'ING_SHRIMP'),
('scandinavian', 'SCA_RAKORSMORGOS', 'ING_MAYONNAISE'),
('scandinavian', 'SCA_RAKORSMORGOS', 'ING_EGG'),
('scandinavian', 'SCA_RAKORSMORGOS', 'ING_DILL'),
('scandinavian', 'SCA_RAKORSMORGOS', 'ING_LEMON'),
('scandinavian', 'SCA_RAKORSMORGOS', 'ING_LETTUCE'),

-- SCA_SMORREBROD_SALMON (6)
('scandinavian', 'SCA_SMORREBROD_SALMON', 'ING_RYE_BREAD'),
('scandinavian', 'SCA_SMORREBROD_SALMON', 'ING_SALMON'),
('scandinavian', 'SCA_SMORREBROD_SALMON', 'ING_CREAM_CHEESE'),
('scandinavian', 'SCA_SMORREBROD_SALMON', 'ING_CAPER'),
('scandinavian', 'SCA_SMORREBROD_SALMON', 'ING_DILL'),
('scandinavian', 'SCA_SMORREBROD_SALMON', 'ING_LEMON'),

-- SCA_TOAST_SKAGEN (8)
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_WHITE_BREAD'),
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_SHRIMP'),
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_MAYONNAISE'),
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_SOUR_CREAM'),
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_DILL'),
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_FISH_ROE'),
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_LEMON'),
('scandinavian', 'SCA_TOAST_SKAGEN', 'ING_BUTTER'),

-- ============================================
-- SOUPS (10 dishes)
-- ============================================

-- SCA_HERNEKEITTO (7)
('scandinavian', 'SCA_HERNEKEITTO', 'ING_SPLIT_PEA'),
('scandinavian', 'SCA_HERNEKEITTO', 'ING_HAM'),
('scandinavian', 'SCA_HERNEKEITTO', 'ING_ONION'),
('scandinavian', 'SCA_HERNEKEITTO', 'ING_CARROT'),
('scandinavian', 'SCA_HERNEKEITTO', 'ING_MUSTARD'),
('scandinavian', 'SCA_HERNEKEITTO', 'ING_MARJORAM'),
('scandinavian', 'SCA_HERNEKEITTO', 'ING_SALT'),

-- SCA_GULE_AERTER (7)
('scandinavian', 'SCA_GULE_AERTER', 'ING_SPLIT_PEA'),
('scandinavian', 'SCA_GULE_AERTER', 'ING_PORK'),
('scandinavian', 'SCA_GULE_AERTER', 'ING_CARROT'),
('scandinavian', 'SCA_GULE_AERTER', 'ING_CELERY'),
('scandinavian', 'SCA_GULE_AERTER', 'ING_LEEK'),
('scandinavian', 'SCA_GULE_AERTER', 'ING_THYME'),
('scandinavian', 'SCA_GULE_AERTER', 'ING_BAY_LEAF'),

-- SCA_RISENGROD (6)
('scandinavian', 'SCA_RISENGROD', 'ING_RICE'),
('scandinavian', 'SCA_RISENGROD', 'ING_MILK'),
('scandinavian', 'SCA_RISENGROD', 'ING_BUTTER'),
('scandinavian', 'SCA_RISENGROD', 'ING_CINNAMON'),
('scandinavian', 'SCA_RISENGROD', 'ING_SUGAR'),
('scandinavian', 'SCA_RISENGROD', 'ING_SALT'),

-- SCA_LOHIKEITTO (7)
('scandinavian', 'SCA_LOHIKEITTO', 'ING_SALMON'),
('scandinavian', 'SCA_LOHIKEITTO', 'ING_POTATO'),
('scandinavian', 'SCA_LOHIKEITTO', 'ING_LEEK'),
('scandinavian', 'SCA_LOHIKEITTO', 'ING_CREAM'),
('scandinavian', 'SCA_LOHIKEITTO', 'ING_DILL'),
('scandinavian', 'SCA_LOHIKEITTO', 'ING_ALLSPICE'),
('scandinavian', 'SCA_LOHIKEITTO', 'ING_BUTTER'),

-- SCA_GRODGROT (6)
('scandinavian', 'SCA_GRODGROT', 'ING_BARLEY'),
('scandinavian', 'SCA_GRODGROT', 'ING_MILK'),
('scandinavian', 'SCA_GRODGROT', 'ING_BUTTER'),
('scandinavian', 'SCA_GRODGROT', 'ING_CINNAMON'),
('scandinavian', 'SCA_GRODGROT', 'ING_SUGAR'),
('scandinavian', 'SCA_GRODGROT', 'ING_SALT'),

-- SCA_FISKSOPPA (8)
('scandinavian', 'SCA_FISKSOPPA', 'ING_COD'),
('scandinavian', 'SCA_FISKSOPPA', 'ING_SHRIMP'),
('scandinavian', 'SCA_FISKSOPPA', 'ING_POTATO'),
('scandinavian', 'SCA_FISKSOPPA', 'ING_CARROT'),
('scandinavian', 'SCA_FISKSOPPA', 'ING_CREAM'),
('scandinavian', 'SCA_FISKSOPPA', 'ING_SAFFRON'),
('scandinavian', 'SCA_FISKSOPPA', 'ING_DILL'),
('scandinavian', 'SCA_FISKSOPPA', 'ING_WHITE_WINE'),

-- SCA_ROMMEGROT (7)
('scandinavian', 'SCA_ROMMEGROT', 'ING_SOUR_CREAM'),
('scandinavian', 'SCA_ROMMEGROT', 'ING_FLOUR'),
('scandinavian', 'SCA_ROMMEGROT', 'ING_MILK'),
('scandinavian', 'SCA_ROMMEGROT', 'ING_BUTTER'),
('scandinavian', 'SCA_ROMMEGROT', 'ING_CINNAMON'),
('scandinavian', 'SCA_ROMMEGROT', 'ING_SUGAR'),
('scandinavian', 'SCA_ROMMEGROT', 'ING_SALT'),

-- SCA_SODD (7)
('scandinavian', 'SCA_SODD', 'ING_LAMB'),
('scandinavian', 'SCA_SODD', 'ING_BEEF'),
('scandinavian', 'SCA_SODD', 'ING_CARROT'),
('scandinavian', 'SCA_SODD', 'ING_POTATO'),
('scandinavian', 'SCA_SODD', 'ING_NUTMEG'),
('scandinavian', 'SCA_SODD', 'ING_GINGER'),
('scandinavian', 'SCA_SODD', 'ING_SALT'),

-- SCA_FISKESUPPE (7)
('scandinavian', 'SCA_FISKESUPPE', 'ING_COD'),
('scandinavian', 'SCA_FISKESUPPE', 'ING_POTATO'),
('scandinavian', 'SCA_FISKESUPPE', 'ING_CARROT'),
('scandinavian', 'SCA_FISKESUPPE', 'ING_LEEK'),
('scandinavian', 'SCA_FISKESUPPE', 'ING_CREAM'),
('scandinavian', 'SCA_FISKESUPPE', 'ING_DILL'),
('scandinavian', 'SCA_FISKESUPPE', 'ING_BUTTER'),

-- SCA_ARTSOPPA (7)
('scandinavian', 'SCA_ARTSOPPA', 'ING_SPLIT_PEA'),
('scandinavian', 'SCA_ARTSOPPA', 'ING_PORK'),
('scandinavian', 'SCA_ARTSOPPA', 'ING_ONION'),
('scandinavian', 'SCA_ARTSOPPA', 'ING_CARROT'),
('scandinavian', 'SCA_ARTSOPPA', 'ING_THYME'),
('scandinavian', 'SCA_ARTSOPPA', 'ING_MARJORAM'),
('scandinavian', 'SCA_ARTSOPPA', 'ING_MUSTARD'),

-- ============================================
-- SIDES (5 dishes)
-- ============================================

-- SCA_HASSELBACK_POTATOES (5)
('scandinavian', 'SCA_HASSELBACK_POTATOES', 'ING_POTATO'),
('scandinavian', 'SCA_HASSELBACK_POTATOES', 'ING_BUTTER'),
('scandinavian', 'SCA_HASSELBACK_POTATOES', 'ING_BREADCRUMB'),
('scandinavian', 'SCA_HASSELBACK_POTATOES', 'ING_GARLIC'),
('scandinavian', 'SCA_HASSELBACK_POTATOES', 'ING_SALT'),

-- SCA_RODBEDER (5)
('scandinavian', 'SCA_RODBEDER', 'ING_BEET'),
('scandinavian', 'SCA_RODBEDER', 'ING_VINEGAR'),
('scandinavian', 'SCA_RODBEDER', 'ING_SUGAR'),
('scandinavian', 'SCA_RODBEDER', 'ING_CLOVE'),
('scandinavian', 'SCA_RODBEDER', 'ING_BAY_LEAF'),

-- SCA_RODKAL (7)
('scandinavian', 'SCA_RODKAL', 'ING_RED_CABBAGE'),
('scandinavian', 'SCA_RODKAL', 'ING_APPLE'),
('scandinavian', 'SCA_RODKAL', 'ING_VINEGAR'),
('scandinavian', 'SCA_RODKAL', 'ING_SUGAR'),
('scandinavian', 'SCA_RODKAL', 'ING_BUTTER'),
('scandinavian', 'SCA_RODKAL', 'ING_CLOVE'),
('scandinavian', 'SCA_RODKAL', 'ING_BAY_LEAF'),

-- SCA_AGURKESALAT (5)
('scandinavian', 'SCA_AGURKESALAT', 'ING_CUCUMBER'),
('scandinavian', 'SCA_AGURKESALAT', 'ING_VINEGAR'),
('scandinavian', 'SCA_AGURKESALAT', 'ING_SUGAR'),
('scandinavian', 'SCA_AGURKESALAT', 'ING_DILL'),
('scandinavian', 'SCA_AGURKESALAT', 'ING_WHITE_PEPPER'),

-- SCA_BRUNEDE_KARTOFLER (4)
('scandinavian', 'SCA_BRUNEDE_KARTOFLER', 'ING_POTATO'),
('scandinavian', 'SCA_BRUNEDE_KARTOFLER', 'ING_BUTTER'),
('scandinavian', 'SCA_BRUNEDE_KARTOFLER', 'ING_SUGAR'),
('scandinavian', 'SCA_BRUNEDE_KARTOFLER', 'ING_SALT'),

-- ============================================
-- PASTRIES (10 dishes)
-- ============================================

-- SCA_KANELBULLE (8)
('scandinavian', 'SCA_KANELBULLE', 'ING_FLOUR'),
('scandinavian', 'SCA_KANELBULLE', 'ING_BUTTER'),
('scandinavian', 'SCA_KANELBULLE', 'ING_SUGAR'),
('scandinavian', 'SCA_KANELBULLE', 'ING_EGG'),
('scandinavian', 'SCA_KANELBULLE', 'ING_MILK'),
('scandinavian', 'SCA_KANELBULLE', 'ING_CINNAMON'),
('scandinavian', 'SCA_KANELBULLE', 'ING_CARDAMOM'),
('scandinavian', 'SCA_KANELBULLE', 'ING_YEAST'),

-- SCA_KARJALANPIIRAKKA (6)
('scandinavian', 'SCA_KARJALANPIIRAKKA', 'ING_RYE_FLOUR'),
('scandinavian', 'SCA_KARJALANPIIRAKKA', 'ING_RICE'),
('scandinavian', 'SCA_KARJALANPIIRAKKA', 'ING_MILK'),
('scandinavian', 'SCA_KARJALANPIIRAKKA', 'ING_BUTTER'),
('scandinavian', 'SCA_KARJALANPIIRAKKA', 'ING_EGG'),
('scandinavian', 'SCA_KARJALANPIIRAKKA', 'ING_SALT'),

-- SCA_WIENERBROD (8)
('scandinavian', 'SCA_WIENERBROD', 'ING_FLOUR'),
('scandinavian', 'SCA_WIENERBROD', 'ING_BUTTER'),
('scandinavian', 'SCA_WIENERBROD', 'ING_EGG'),
('scandinavian', 'SCA_WIENERBROD', 'ING_MILK'),
('scandinavian', 'SCA_WIENERBROD', 'ING_SUGAR'),
('scandinavian', 'SCA_WIENERBROD', 'ING_YEAST'),
('scandinavian', 'SCA_WIENERBROD', 'ING_VANILLA'),
('scandinavian', 'SCA_WIENERBROD', 'ING_ALMOND'),

-- SCA_LEFSE (7)
('scandinavian', 'SCA_LEFSE', 'ING_POTATO'),
('scandinavian', 'SCA_LEFSE', 'ING_FLOUR'),
('scandinavian', 'SCA_LEFSE', 'ING_BUTTER'),
('scandinavian', 'SCA_LEFSE', 'ING_CREAM'),
('scandinavian', 'SCA_LEFSE', 'ING_SUGAR'),
('scandinavian', 'SCA_LEFSE', 'ING_CINNAMON'),
('scandinavian', 'SCA_LEFSE', 'ING_SALT'),

-- SCA_PULLA (7)
('scandinavian', 'SCA_PULLA', 'ING_FLOUR'),
('scandinavian', 'SCA_PULLA', 'ING_MILK'),
('scandinavian', 'SCA_PULLA', 'ING_BUTTER'),
('scandinavian', 'SCA_PULLA', 'ING_EGG'),
('scandinavian', 'SCA_PULLA', 'ING_SUGAR'),
('scandinavian', 'SCA_PULLA', 'ING_CARDAMOM'),
('scandinavian', 'SCA_PULLA', 'ING_YEAST'),

-- SCA_KRINGLE (7)
('scandinavian', 'SCA_KRINGLE', 'ING_FLOUR'),
('scandinavian', 'SCA_KRINGLE', 'ING_BUTTER'),
('scandinavian', 'SCA_KRINGLE', 'ING_EGG'),
('scandinavian', 'SCA_KRINGLE', 'ING_SUGAR'),
('scandinavian', 'SCA_KRINGLE', 'ING_ALMOND'),
('scandinavian', 'SCA_KRINGLE', 'ING_YEAST'),
('scandinavian', 'SCA_KRINGLE', 'ING_CARDAMOM'),

-- SCA_SKILLINGSBOLLE (7)
('scandinavian', 'SCA_SKILLINGSBOLLE', 'ING_FLOUR'),
('scandinavian', 'SCA_SKILLINGSBOLLE', 'ING_BUTTER'),
('scandinavian', 'SCA_SKILLINGSBOLLE', 'ING_BROWN_SUGAR'),
('scandinavian', 'SCA_SKILLINGSBOLLE', 'ING_EGG'),
('scandinavian', 'SCA_SKILLINGSBOLLE', 'ING_MILK'),
('scandinavian', 'SCA_SKILLINGSBOLLE', 'ING_CINNAMON'),
('scandinavian', 'SCA_SKILLINGSBOLLE', 'ING_YEAST'),

-- SCA_SEMLOR (9)
('scandinavian', 'SCA_SEMLOR', 'ING_FLOUR'),
('scandinavian', 'SCA_SEMLOR', 'ING_BUTTER'),
('scandinavian', 'SCA_SEMLOR', 'ING_MILK'),
('scandinavian', 'SCA_SEMLOR', 'ING_EGG'),
('scandinavian', 'SCA_SEMLOR', 'ING_CARDAMOM'),
('scandinavian', 'SCA_SEMLOR', 'ING_ALMOND'),
('scandinavian', 'SCA_SEMLOR', 'ING_CREAM'),
('scandinavian', 'SCA_SEMLOR', 'ING_SUGAR'),
('scandinavian', 'SCA_SEMLOR', 'ING_YEAST'),

-- SCA_KORVAPUUSTI (8)
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_FLOUR'),
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_BUTTER'),
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_MILK'),
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_EGG'),
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_SUGAR'),
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_CINNAMON'),
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_CARDAMOM'),
('scandinavian', 'SCA_KORVAPUUSTI', 'ING_YEAST'),

-- SCA_LUSSEKATTER (8)
('scandinavian', 'SCA_LUSSEKATTER', 'ING_FLOUR'),
('scandinavian', 'SCA_LUSSEKATTER', 'ING_BUTTER'),
('scandinavian', 'SCA_LUSSEKATTER', 'ING_MILK'),
('scandinavian', 'SCA_LUSSEKATTER', 'ING_EGG'),
('scandinavian', 'SCA_LUSSEKATTER', 'ING_SUGAR'),
('scandinavian', 'SCA_LUSSEKATTER', 'ING_SAFFRON'),
('scandinavian', 'SCA_LUSSEKATTER', 'ING_RAISIN'),
('scandinavian', 'SCA_LUSSEKATTER', 'ING_YEAST'),

-- ============================================
-- DESSERTS (14 dishes)
-- ============================================

-- SCA_RIS_A_LA_MANDE (7)
('scandinavian', 'SCA_RIS_A_LA_MANDE', 'ING_RICE'),
('scandinavian', 'SCA_RIS_A_LA_MANDE', 'ING_MILK'),
('scandinavian', 'SCA_RIS_A_LA_MANDE', 'ING_CREAM'),
('scandinavian', 'SCA_RIS_A_LA_MANDE', 'ING_ALMOND'),
('scandinavian', 'SCA_RIS_A_LA_MANDE', 'ING_VANILLA'),
('scandinavian', 'SCA_RIS_A_LA_MANDE', 'ING_SUGAR'),
('scandinavian', 'SCA_RIS_A_LA_MANDE', 'ING_CHERRY'),

-- SCA_PRINSESSTARTA (8)
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_FLOUR'),
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_EGG'),
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_SUGAR'),
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_CREAM'),
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_MILK'),
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_VANILLA'),
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_ALMOND'),
('scandinavian', 'SCA_PRINSESSTARTA', 'ING_RASPBERRY_JAM'),

-- SCA_KRUMKAKE (7)
('scandinavian', 'SCA_KRUMKAKE', 'ING_FLOUR'),
('scandinavian', 'SCA_KRUMKAKE', 'ING_BUTTER'),
('scandinavian', 'SCA_KRUMKAKE', 'ING_EGG'),
('scandinavian', 'SCA_KRUMKAKE', 'ING_SUGAR'),
('scandinavian', 'SCA_KRUMKAKE', 'ING_CREAM'),
('scandinavian', 'SCA_KRUMKAKE', 'ING_CARDAMOM'),
('scandinavian', 'SCA_KRUMKAKE', 'ING_VANILLA'),

-- SCA_BLOTKAKE (7)
('scandinavian', 'SCA_BLOTKAKE', 'ING_FLOUR'),
('scandinavian', 'SCA_BLOTKAKE', 'ING_EGG'),
('scandinavian', 'SCA_BLOTKAKE', 'ING_SUGAR'),
('scandinavian', 'SCA_BLOTKAKE', 'ING_CREAM'),
('scandinavian', 'SCA_BLOTKAKE', 'ING_VANILLA'),
('scandinavian', 'SCA_BLOTKAKE', 'ING_STRAWBERRY'),
('scandinavian', 'SCA_BLOTKAKE', 'ING_RASPBERRY'),

-- SCA_RUNEBERG_TORTE (8)
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_FLOUR'),
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_ALMOND'),
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_BUTTER'),
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_EGG'),
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_SUGAR'),
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_BREADCRUMB'),
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_RASPBERRY_JAM'),
('scandinavian', 'SCA_RUNEBERG_TORTE', 'ING_CREAM'),

-- SCA_KLADDKAKA (7)
('scandinavian', 'SCA_KLADDKAKA', 'ING_FLOUR'),
('scandinavian', 'SCA_KLADDKAKA', 'ING_BUTTER'),
('scandinavian', 'SCA_KLADDKAKA', 'ING_SUGAR'),
('scandinavian', 'SCA_KLADDKAKA', 'ING_EGG'),
('scandinavian', 'SCA_KLADDKAKA', 'ING_COCOA'),
('scandinavian', 'SCA_KLADDKAKA', 'ING_VANILLA'),
('scandinavian', 'SCA_KLADDKAKA', 'ING_SALT'),

-- SCA_RODGROD (6)
('scandinavian', 'SCA_RODGROD', 'ING_STRAWBERRY'),
('scandinavian', 'SCA_RODGROD', 'ING_RASPBERRY'),
('scandinavian', 'SCA_RODGROD', 'ING_CURRANT'),
('scandinavian', 'SCA_RODGROD', 'ING_SUGAR'),
('scandinavian', 'SCA_RODGROD', 'ING_CREAM'),
('scandinavian', 'SCA_RODGROD', 'ING_POTATO_STARCH'),

-- SCA_KOLDSKAL (5)
('scandinavian', 'SCA_KOLDSKAL', 'ING_BUTTERMILK'),
('scandinavian', 'SCA_KOLDSKAL', 'ING_EGG'),
('scandinavian', 'SCA_KOLDSKAL', 'ING_SUGAR'),
('scandinavian', 'SCA_KOLDSKAL', 'ING_VANILLA'),
('scandinavian', 'SCA_KOLDSKAL', 'ING_LEMON'),

-- SCA_AEBLESKIVER (7)
('scandinavian', 'SCA_AEBLESKIVER', 'ING_FLOUR'),
('scandinavian', 'SCA_AEBLESKIVER', 'ING_BUTTERMILK'),
('scandinavian', 'SCA_AEBLESKIVER', 'ING_EGG'),
('scandinavian', 'SCA_AEBLESKIVER', 'ING_SUGAR'),
('scandinavian', 'SCA_AEBLESKIVER', 'ING_BUTTER'),
('scandinavian', 'SCA_AEBLESKIVER', 'ING_CARDAMOM'),
('scandinavian', 'SCA_AEBLESKIVER', 'ING_LEMON'),

-- SCA_MULTEKREM (3)
('scandinavian', 'SCA_MULTEKREM', 'ING_CLOUDBERRY'),
('scandinavian', 'SCA_MULTEKREM', 'ING_CREAM'),
('scandinavian', 'SCA_MULTEKREM', 'ING_SUGAR'),

-- SCA_OSTKAKA (6)
('scandinavian', 'SCA_OSTKAKA', 'ING_COTTAGE_CHEESE'),
('scandinavian', 'SCA_OSTKAKA', 'ING_MILK'),
('scandinavian', 'SCA_OSTKAKA', 'ING_EGG'),
('scandinavian', 'SCA_OSTKAKA', 'ING_ALMOND'),
('scandinavian', 'SCA_OSTKAKA', 'ING_SUGAR'),
('scandinavian', 'SCA_OSTKAKA', 'ING_CREAM'),

-- SCA_MUSTIKKAKIISSELI (4)
('scandinavian', 'SCA_MUSTIKKAKIISSELI', 'ING_BILBERRY'),
('scandinavian', 'SCA_MUSTIKKAKIISSELI', 'ING_SUGAR'),
('scandinavian', 'SCA_MUSTIKKAKIISSELI', 'ING_POTATO_STARCH'),
('scandinavian', 'SCA_MUSTIKKAKIISSELI', 'ING_CREAM'),

-- SCA_LEIPAJUUSTO (4)
('scandinavian', 'SCA_LEIPAJUUSTO', 'ING_MILK'),
('scandinavian', 'SCA_LEIPAJUUSTO', 'ING_CREAM'),
('scandinavian', 'SCA_LEIPAJUUSTO', 'ING_CLOUDBERRY'),
('scandinavian', 'SCA_LEIPAJUUSTO', 'ING_SALT'),

-- SCA_SVELE (6)
('scandinavian', 'SCA_SVELE', 'ING_FLOUR'),
('scandinavian', 'SCA_SVELE', 'ING_BUTTERMILK'),
('scandinavian', 'SCA_SVELE', 'ING_EGG'),
('scandinavian', 'SCA_SVELE', 'ING_SUGAR'),
('scandinavian', 'SCA_SVELE', 'ING_BUTTER'),
('scandinavian', 'SCA_SVELE', 'ING_BAKING_SODA');

-- Verify count
SELECT
    'Scandinavian product_ingredients' AS table_name,
    COUNT(*) AS total_links
FROM product_ingredients
WHERE product_type = 'scandinavian';

-- Verify by category
SELECT
    s.category,
    COUNT(DISTINCT pi.product_id) AS dishes,
    COUNT(pi.id) AS ingredient_links
FROM product_ingredients pi
JOIN scandinavian s ON s.id = pi.product_id
WHERE pi.product_type = 'scandinavian'
GROUP BY s.category
ORDER BY s.category;
