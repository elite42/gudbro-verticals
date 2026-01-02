-- ============================================
-- FRENCH CUISINE - Product Ingredients
-- GUDBRO Database Standards v1.3
-- ============================================

DELETE FROM product_ingredients WHERE product_type = 'french';

INSERT INTO product_ingredients (product_type, product_id, ingredient_id, role, is_optional) VALUES

-- ============================================
-- APPETIZERS
-- ============================================

-- FRE_PATE_CAMPAGNE - Pâté de Campagne
('french', 'FRE_PATE_CAMPAGNE', 'ING_PORK_BELLY', 'main', false),
('french', 'FRE_PATE_CAMPAGNE', 'ING_PORK_LOIN', 'main', false),
('french', 'FRE_PATE_CAMPAGNE', 'ING_COGNAC', 'flavoring', false),
('french', 'FRE_PATE_CAMPAGNE', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_PATE_CAMPAGNE', 'ING_THYME', 'flavoring', false),
('french', 'FRE_PATE_CAMPAGNE', 'ING_CORNICHONS', 'garnish', true),

-- FRE_TERRINE_FOIE - Terrine de Foie Gras
('french', 'FRE_TERRINE_FOIE', 'ING_FOIE_GRAS', 'main', false),
('french', 'FRE_TERRINE_FOIE', 'ING_SALT', 'seasoning', false),
('french', 'FRE_TERRINE_FOIE', 'ING_WHITE_PEPPER', 'seasoning', false),
('french', 'FRE_TERRINE_FOIE', 'ING_COGNAC', 'flavoring', false),

-- FRE_ESCARGOTS - Escargots à la Bourguignonne
('french', 'FRE_ESCARGOTS', 'ING_ESCARGOT', 'main', false),
('french', 'FRE_ESCARGOTS', 'ING_BUTTER', 'main', false),
('french', 'FRE_ESCARGOTS', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_ESCARGOTS', 'ING_PARSLEY', 'flavoring', false),
('french', 'FRE_ESCARGOTS', 'ING_SHALLOT', 'flavoring', false),

-- FRE_GOUGERES - Gougères
('french', 'FRE_GOUGERES', 'ING_FLOUR', 'main', false),
('french', 'FRE_GOUGERES', 'ING_BUTTER', 'main', false),
('french', 'FRE_GOUGERES', 'ING_EGG', 'main', false),
('french', 'FRE_GOUGERES', 'ING_GRUYERE', 'main', false),
('french', 'FRE_GOUGERES', 'ING_NUTMEG', 'seasoning', false),

-- FRE_SOUPE_POISSON - Soupe de Poisson
('french', 'FRE_SOUPE_POISSON', 'ING_WHITE_FISH', 'main', false),
('french', 'FRE_SOUPE_POISSON', 'ING_TOMATO', 'main', false),
('french', 'FRE_SOUPE_POISSON', 'ING_FENNEL', 'flavoring', false),
('french', 'FRE_SOUPE_POISSON', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_SOUPE_POISSON', 'ING_HERBES_DE_PROVENCE', 'flavoring', false),
('french', 'FRE_SOUPE_POISSON', 'ING_CRUSTY_BREAD', 'garnish', true),

-- FRE_SALADE_LYONNAISE - Salade Lyonnaise
('french', 'FRE_SALADE_LYONNAISE', 'ING_LETTUCE', 'main', false),
('french', 'FRE_SALADE_LYONNAISE', 'ING_LARDONS', 'main', false),
('french', 'FRE_SALADE_LYONNAISE', 'ING_EGG', 'main', false),
('french', 'FRE_SALADE_LYONNAISE', 'ING_DIJON_MUSTARD', 'flavoring', false),
('french', 'FRE_SALADE_LYONNAISE', 'ING_RED_WINE_VINEGAR', 'flavoring', false),
('french', 'FRE_SALADE_LYONNAISE', 'ING_CROUTONS', 'garnish', false),

-- FRE_TARTARE_BOEUF - Tartare de Boeuf
('french', 'FRE_TARTARE_BOEUF', 'ING_BEEF_SIRLOIN', 'main', false),
('french', 'FRE_TARTARE_BOEUF', 'ING_EGG_YOLK', 'main', false),
('french', 'FRE_TARTARE_BOEUF', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_TARTARE_BOEUF', 'ING_DIJON_MUSTARD', 'flavoring', false),
('french', 'FRE_TARTARE_BOEUF', 'ING_CORNICHONS', 'flavoring', false),

-- FRE_QUENELLES - Quenelles de Brochet
('french', 'FRE_QUENELLES', 'ING_WHITE_FISH', 'main', false),
('french', 'FRE_QUENELLES', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_QUENELLES', 'ING_EGG_WHITE', 'main', false),
('french', 'FRE_QUENELLES', 'ING_BUTTER', 'main', false),
('french', 'FRE_QUENELLES', 'ING_CRAWFISH', 'garnish', true),

-- ============================================
-- MAIN COURSES
-- ============================================

-- FRE_COQ_AU_VIN - Coq au Vin
('french', 'FRE_COQ_AU_VIN', 'ING_CHICKEN', 'main', false),
('french', 'FRE_COQ_AU_VIN', 'ING_RED_WINE', 'main', false),
('french', 'FRE_COQ_AU_VIN', 'ING_LARDONS', 'main', false),
('french', 'FRE_COQ_AU_VIN', 'ING_MUSHROOM', 'main', false),
('french', 'FRE_COQ_AU_VIN', 'ING_ONION', 'flavoring', false),
('french', 'FRE_COQ_AU_VIN', 'ING_COGNAC', 'flavoring', false),
('french', 'FRE_COQ_AU_VIN', 'ING_THYME', 'flavoring', false),

-- FRE_BOEUF_BOURG - Boeuf Bourguignon
('french', 'FRE_BOEUF_BOURG', 'ING_BEEF', 'main', false),
('french', 'FRE_BOEUF_BOURG', 'ING_RED_WINE', 'main', false),
('french', 'FRE_BOEUF_BOURG', 'ING_LARDONS', 'main', false),
('french', 'FRE_BOEUF_BOURG', 'ING_CARROT', 'main', false),
('french', 'FRE_BOEUF_BOURG', 'ING_ONION', 'flavoring', false),
('french', 'FRE_BOEUF_BOURG', 'ING_MUSHROOM', 'main', false),
('french', 'FRE_BOEUF_BOURG', 'ING_BEEF_BROTH', 'liquid', false),

-- FRE_DUCK_CONFIT - Confit de Canard
('french', 'FRE_DUCK_CONFIT', 'ING_DUCK_LEG', 'main', false),
('french', 'FRE_DUCK_CONFIT', 'ING_DUCK_FAT', 'main', false),
('french', 'FRE_DUCK_CONFIT', 'ING_SALT', 'seasoning', false),
('french', 'FRE_DUCK_CONFIT', 'ING_THYME', 'flavoring', false),
('french', 'FRE_DUCK_CONFIT', 'ING_GARLIC', 'flavoring', false),

-- FRE_MAGRET - Magret de Canard
('french', 'FRE_MAGRET', 'ING_DUCK_LEG', 'main', false),
('french', 'FRE_MAGRET', 'ING_ORANGE', 'flavoring', false),
('french', 'FRE_MAGRET', 'ING_RED_WINE', 'flavoring', false),
('french', 'FRE_MAGRET', 'ING_BUTTER', 'main', false),
('french', 'FRE_MAGRET', 'ING_HONEY', 'flavoring', false),

-- FRE_LAPIN_MOUTARDE - Lapin à la Moutarde
('french', 'FRE_LAPIN_MOUTARDE', 'ING_RABBIT', 'main', false),
('french', 'FRE_LAPIN_MOUTARDE', 'ING_DIJON_MUSTARD', 'main', false),
('french', 'FRE_LAPIN_MOUTARDE', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_LAPIN_MOUTARDE', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_LAPIN_MOUTARDE', 'ING_SHALLOT', 'flavoring', false),

-- FRE_BLANQUETTE - Blanquette de Veau
('french', 'FRE_BLANQUETTE', 'ING_VEAL', 'main', false),
('french', 'FRE_BLANQUETTE', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_BLANQUETTE', 'ING_CARROT', 'main', false),
('french', 'FRE_BLANQUETTE', 'ING_MUSHROOM', 'main', false),
('french', 'FRE_BLANQUETTE', 'ING_ONION', 'flavoring', false),
('french', 'FRE_BLANQUETTE', 'ING_EGG_YOLK', 'thickener', false),

-- FRE_NAVARIN - Navarin d'Agneau
('french', 'FRE_NAVARIN', 'ING_LAMB', 'main', false),
('french', 'FRE_NAVARIN', 'ING_CARROT', 'main', false),
('french', 'FRE_NAVARIN', 'ING_POTATO', 'main', false),
('french', 'FRE_NAVARIN', 'ING_PEAS', 'main', false),
('french', 'FRE_NAVARIN', 'ING_TOMATO_PASTE', 'flavoring', false),
('french', 'FRE_NAVARIN', 'ING_WHITE_WINE', 'liquid', false),

-- FRE_GIGOT - Gigot d'Agneau
('french', 'FRE_GIGOT', 'ING_LAMB', 'main', false),
('french', 'FRE_GIGOT', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_GIGOT', 'ING_ROSEMARY', 'flavoring', false),
('french', 'FRE_GIGOT', 'ING_OLIVE_OIL', 'main', false),
('french', 'FRE_GIGOT', 'ING_HARICOTS_VERTS', 'garnish', true),

-- FRE_POULET_ROTI - Poulet Rôti
('french', 'FRE_POULET_ROTI', 'ING_CHICKEN', 'main', false),
('french', 'FRE_POULET_ROTI', 'ING_BUTTER', 'main', false),
('french', 'FRE_POULET_ROTI', 'ING_HERBES_DE_PROVENCE', 'flavoring', false),
('french', 'FRE_POULET_ROTI', 'ING_LEMON', 'flavoring', false),
('french', 'FRE_POULET_ROTI', 'ING_GARLIC', 'flavoring', false),

-- FRE_RIS_VEAU - Ris de Veau
('french', 'FRE_RIS_VEAU', 'ING_VEAL_SWEETBREADS', 'main', false),
('french', 'FRE_RIS_VEAU', 'ING_BUTTER', 'main', false),
('french', 'FRE_RIS_VEAU', 'ING_MUSHROOM', 'main', false),
('french', 'FRE_RIS_VEAU', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_RIS_VEAU', 'ING_COGNAC', 'flavoring', false),

-- ============================================
-- SEAFOOD
-- ============================================

-- FRE_SOLE_MEUNIERE - Sole Meunière
('french', 'FRE_SOLE_MEUNIERE', 'ING_SOLE', 'main', false),
('french', 'FRE_SOLE_MEUNIERE', 'ING_BUTTER', 'main', false),
('french', 'FRE_SOLE_MEUNIERE', 'ING_FLOUR', 'coating', false),
('french', 'FRE_SOLE_MEUNIERE', 'ING_LEMON', 'flavoring', false),
('french', 'FRE_SOLE_MEUNIERE', 'ING_PARSLEY', 'garnish', false),

-- FRE_MOULES_MARINIERE - Moules Marinières
('french', 'FRE_MOULES_MARINIERE', 'ING_MUSSELS', 'main', false),
('french', 'FRE_MOULES_MARINIERE', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_MOULES_MARINIERE', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_MOULES_MARINIERE', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_MOULES_MARINIERE', 'ING_PARSLEY', 'garnish', false),

-- FRE_MOULES_FRITES - Moules Frites
('french', 'FRE_MOULES_FRITES', 'ING_MUSSELS', 'main', false),
('french', 'FRE_MOULES_FRITES', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_MOULES_FRITES', 'ING_POTATO', 'main', false),
('french', 'FRE_MOULES_FRITES', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_MOULES_FRITES', 'ING_MAYONNAISE', 'garnish', true),

-- FRE_BOUILLABAISSE - Bouillabaisse
('french', 'FRE_BOUILLABAISSE', 'ING_WHITE_FISH', 'main', false),
('french', 'FRE_BOUILLABAISSE', 'ING_MUSSELS', 'main', false),
('french', 'FRE_BOUILLABAISSE', 'ING_SHRIMP', 'main', false),
('french', 'FRE_BOUILLABAISSE', 'ING_TOMATO', 'main', false),
('french', 'FRE_BOUILLABAISSE', 'ING_FENNEL', 'flavoring', false),
('french', 'FRE_BOUILLABAISSE', 'ING_FISH_STOCK', 'liquid', false),
('french', 'FRE_BOUILLABAISSE', 'ING_CRUSTY_BREAD', 'garnish', true),

-- FRE_TRUITE_AMANDINE - Truite Amandine
('french', 'FRE_TRUITE_AMANDINE', 'ING_TROUT', 'main', false),
('french', 'FRE_TRUITE_AMANDINE', 'ING_BUTTER', 'main', false),
('french', 'FRE_TRUITE_AMANDINE', 'ING_ALMOND', 'main', false),
('french', 'FRE_TRUITE_AMANDINE', 'ING_LEMON', 'flavoring', false),
('french', 'FRE_TRUITE_AMANDINE', 'ING_PARSLEY', 'garnish', false),

-- FRE_HOMARD_THERMIDOR - Homard Thermidor
('french', 'FRE_HOMARD_THERMIDOR', 'ING_LOBSTER', 'main', false),
('french', 'FRE_HOMARD_THERMIDOR', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_HOMARD_THERMIDOR', 'ING_DIJON_MUSTARD', 'flavoring', false),
('french', 'FRE_HOMARD_THERMIDOR', 'ING_GRUYERE', 'topping', false),
('french', 'FRE_HOMARD_THERMIDOR', 'ING_COGNAC', 'flavoring', false),
('french', 'FRE_HOMARD_THERMIDOR', 'ING_EGG_YOLK', 'thickener', false),

-- FRE_COQUILLES_GRATIN - Coquilles Gratinées
('french', 'FRE_COQUILLES_GRATIN', 'ING_SCALLOP', 'main', false),
('french', 'FRE_COQUILLES_GRATIN', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_COQUILLES_GRATIN', 'ING_GRUYERE', 'topping', false),
('french', 'FRE_COQUILLES_GRATIN', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_COQUILLES_GRATIN', 'ING_PANKO', 'topping', false),

-- ============================================
-- BISTRO CLASSICS
-- ============================================

-- FRE_STEAK_FRITES - Steak Frites
('french', 'FRE_STEAK_FRITES', 'ING_BEEF_SIRLOIN', 'main', false),
('french', 'FRE_STEAK_FRITES', 'ING_POTATO', 'main', false),
('french', 'FRE_STEAK_FRITES', 'ING_BUTTER', 'main', false),
('french', 'FRE_STEAK_FRITES', 'ING_PARSLEY', 'garnish', false),

-- FRE_CROQUE_MONSIEUR - Croque Monsieur
('french', 'FRE_CROQUE_MONSIEUR', 'ING_CRUSTY_BREAD', 'main', false),
('french', 'FRE_CROQUE_MONSIEUR', 'ING_HAM', 'main', false),
('french', 'FRE_CROQUE_MONSIEUR', 'ING_GRUYERE', 'main', false),
('french', 'FRE_CROQUE_MONSIEUR', 'ING_BUTTER', 'main', false),
('french', 'FRE_CROQUE_MONSIEUR', 'ING_MILK', 'main', false),
('french', 'FRE_CROQUE_MONSIEUR', 'ING_FLOUR', 'thickener', false),

-- FRE_CROQUE_MADAME - Croque Madame
('french', 'FRE_CROQUE_MADAME', 'ING_CRUSTY_BREAD', 'main', false),
('french', 'FRE_CROQUE_MADAME', 'ING_HAM', 'main', false),
('french', 'FRE_CROQUE_MADAME', 'ING_GRUYERE', 'main', false),
('french', 'FRE_CROQUE_MADAME', 'ING_EGG', 'main', false),
('french', 'FRE_CROQUE_MADAME', 'ING_BUTTER', 'main', false),

-- FRE_QUICHE_LORRAINE - Quiche Lorraine
('french', 'FRE_QUICHE_LORRAINE', 'ING_FLOUR', 'main', false),
('french', 'FRE_QUICHE_LORRAINE', 'ING_BUTTER', 'main', false),
('french', 'FRE_QUICHE_LORRAINE', 'ING_EGG', 'main', false),
('french', 'FRE_QUICHE_LORRAINE', 'ING_LARDONS', 'main', false),
('french', 'FRE_QUICHE_LORRAINE', 'ING_GRUYERE', 'main', false),
('french', 'FRE_QUICHE_LORRAINE', 'ING_HEAVY_CREAM', 'main', false),

-- FRE_OMELETTE_FINES - Omelette aux Fines Herbes
('french', 'FRE_OMELETTE_FINES', 'ING_EGG', 'main', false),
('french', 'FRE_OMELETTE_FINES', 'ING_BUTTER', 'main', false),
('french', 'FRE_OMELETTE_FINES', 'ING_FINES_HERBES', 'flavoring', false),
('french', 'FRE_OMELETTE_FINES', 'ING_CHIVES', 'garnish', false),

-- FRE_ENTRECOTE_BORDELAISE - Entrecôte Bordelaise
('french', 'FRE_ENTRECOTE_BORDELAISE', 'ING_BEEF_SIRLOIN', 'main', false),
('french', 'FRE_ENTRECOTE_BORDELAISE', 'ING_RED_WINE', 'main', false),
('french', 'FRE_ENTRECOTE_BORDELAISE', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_ENTRECOTE_BORDELAISE', 'ING_BUTTER', 'main', false),
('french', 'FRE_ENTRECOTE_BORDELAISE', 'ING_BEEF_BROTH', 'liquid', false),

-- FRE_BAVETTE_ECHALOTES - Bavette aux Échalotes
('french', 'FRE_BAVETTE_ECHALOTES', 'ING_BEEF_SIRLOIN', 'main', false),
('french', 'FRE_BAVETTE_ECHALOTES', 'ING_SHALLOT', 'main', false),
('french', 'FRE_BAVETTE_ECHALOTES', 'ING_BUTTER', 'main', false),
('french', 'FRE_BAVETTE_ECHALOTES', 'ING_RED_WINE_VINEGAR', 'flavoring', false),

-- ============================================
-- REGIONAL SPECIALTIES
-- ============================================

-- FRE_CASSOULET - Cassoulet
('french', 'FRE_CASSOULET', 'ING_WHITE_BEANS', 'main', false),
('french', 'FRE_CASSOULET', 'ING_DUCK_LEG', 'main', false),
('french', 'FRE_CASSOULET', 'ING_ITALIAN_SAUSAGE', 'main', false),
('french', 'FRE_CASSOULET', 'ING_PORK_BELLY', 'main', false),
('french', 'FRE_CASSOULET', 'ING_TOMATO_PASTE', 'flavoring', false),
('french', 'FRE_CASSOULET', 'ING_PANKO', 'topping', false),

-- FRE_CHOUCROUTE - Choucroute Garnie
('french', 'FRE_CHOUCROUTE', 'ING_SAUERKRAUT', 'main', false),
('french', 'FRE_CHOUCROUTE', 'ING_ITALIAN_SAUSAGE', 'main', false),
('french', 'FRE_CHOUCROUTE', 'ING_PORK_BELLY', 'main', false),
('french', 'FRE_CHOUCROUTE', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_CHOUCROUTE', 'ING_JUNIPER_BERRIES', 'flavoring', false),

-- FRE_RATATOUILLE - Ratatouille
('french', 'FRE_RATATOUILLE', 'ING_EGGPLANT', 'main', false),
('french', 'FRE_RATATOUILLE', 'ING_ZUCCHINI', 'main', false),
('french', 'FRE_RATATOUILLE', 'ING_TOMATO', 'main', false),
('french', 'FRE_RATATOUILLE', 'ING_BELL_PEPPER', 'main', false),
('french', 'FRE_RATATOUILLE', 'ING_ONION', 'flavoring', false),
('french', 'FRE_RATATOUILLE', 'ING_HERBES_DE_PROVENCE', 'flavoring', false),

-- FRE_GRATIN_DAUPHINOIS - Gratin Dauphinois
('french', 'FRE_GRATIN_DAUPHINOIS', 'ING_POTATO', 'main', false),
('french', 'FRE_GRATIN_DAUPHINOIS', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_GRATIN_DAUPHINOIS', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_GRATIN_DAUPHINOIS', 'ING_NUTMEG', 'seasoning', false),

-- FRE_TARTIFLETTE - Tartiflette
('french', 'FRE_TARTIFLETTE', 'ING_POTATO', 'main', false),
('french', 'FRE_TARTIFLETTE', 'ING_CAMEMBERT', 'main', false),
('french', 'FRE_TARTIFLETTE', 'ING_LARDONS', 'main', false),
('french', 'FRE_TARTIFLETTE', 'ING_ONION', 'flavoring', false),
('french', 'FRE_TARTIFLETTE', 'ING_WHITE_WINE', 'liquid', false),

-- FRE_ALIGOT - Aligot
('french', 'FRE_ALIGOT', 'ING_POTATO', 'main', false),
('french', 'FRE_ALIGOT', 'ING_GRUYERE', 'main', false),
('french', 'FRE_ALIGOT', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_ALIGOT', 'ING_BUTTER', 'main', false),
('french', 'FRE_ALIGOT', 'ING_HEAVY_CREAM', 'main', false),

-- FRE_FLAMICHE - Flamiche
('french', 'FRE_FLAMICHE', 'ING_LEEK', 'main', false),
('french', 'FRE_FLAMICHE', 'ING_FLOUR', 'main', false),
('french', 'FRE_FLAMICHE', 'ING_BUTTER', 'main', false),
('french', 'FRE_FLAMICHE', 'ING_EGG', 'main', false),
('french', 'FRE_FLAMICHE', 'ING_HEAVY_CREAM', 'main', false),

-- FRE_PIPERADE - Piperade
('french', 'FRE_PIPERADE', 'ING_BELL_PEPPER', 'main', false),
('french', 'FRE_PIPERADE', 'ING_TOMATO', 'main', false),
('french', 'FRE_PIPERADE', 'ING_ONION', 'main', false),
('french', 'FRE_PIPERADE', 'ING_EGG', 'main', false),
('french', 'FRE_PIPERADE', 'ING_OLIVE_OIL', 'main', false),

-- FRE_POT_AU_FEU - Pot-au-Feu
('french', 'FRE_POT_AU_FEU', 'ING_BEEF', 'main', false),
('french', 'FRE_POT_AU_FEU', 'ING_CARROT', 'main', false),
('french', 'FRE_POT_AU_FEU', 'ING_LEEK', 'main', false),
('french', 'FRE_POT_AU_FEU', 'ING_POTATO', 'main', false),
('french', 'FRE_POT_AU_FEU', 'ING_CELERY', 'flavoring', false),
('french', 'FRE_POT_AU_FEU', 'ING_DIJON_MUSTARD', 'garnish', true),

-- FRE_SALADE_LANDAISE - Salade Landaise
('french', 'FRE_SALADE_LANDAISE', 'ING_MIXED_GREENS', 'main', false),
('french', 'FRE_SALADE_LANDAISE', 'ING_FOIE_GRAS', 'main', false),
('french', 'FRE_SALADE_LANDAISE', 'ING_DUCK_LEG', 'main', false),
('french', 'FRE_SALADE_LANDAISE', 'ING_PINE_NUTS', 'garnish', false),

-- ============================================
-- SAUCES
-- ============================================

-- FRE_SAUCE_BORDELAISE - Sauce Bordelaise
('french', 'FRE_SAUCE_BORDELAISE', 'ING_RED_WINE', 'main', false),
('french', 'FRE_SAUCE_BORDELAISE', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_SAUCE_BORDELAISE', 'ING_BEEF_BROTH', 'liquid', false),
('french', 'FRE_SAUCE_BORDELAISE', 'ING_BUTTER', 'main', false),
('french', 'FRE_SAUCE_BORDELAISE', 'ING_THYME', 'flavoring', false),

-- FRE_SAUCE_CHASSEUR - Sauce Chasseur
('french', 'FRE_SAUCE_CHASSEUR', 'ING_MUSHROOM', 'main', false),
('french', 'FRE_SAUCE_CHASSEUR', 'ING_TOMATO', 'main', false),
('french', 'FRE_SAUCE_CHASSEUR', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_SAUCE_CHASSEUR', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_SAUCE_CHASSEUR', 'ING_CHICKEN_BROTH', 'liquid', false),

-- FRE_SAUCE_DIABLE - Sauce Diable
('french', 'FRE_SAUCE_DIABLE', 'ING_WHITE_WINE', 'main', false),
('french', 'FRE_SAUCE_DIABLE', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_SAUCE_DIABLE', 'ING_RED_WINE_VINEGAR', 'flavoring', false),
('french', 'FRE_SAUCE_DIABLE', 'ING_CHICKEN_BROTH', 'liquid', false),
('french', 'FRE_SAUCE_DIABLE', 'ING_CHILI_FLAKES', 'flavoring', false),

-- FRE_BEURRE_BLANC - Beurre Blanc
('french', 'FRE_BEURRE_BLANC', 'ING_BUTTER', 'main', false),
('french', 'FRE_BEURRE_BLANC', 'ING_SHALLOT', 'flavoring', false),
('french', 'FRE_BEURRE_BLANC', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_BEURRE_BLANC', 'ING_WHITE_VINEGAR', 'flavoring', false),

-- FRE_SAUCE_NANTUA - Sauce Nantua
('french', 'FRE_SAUCE_NANTUA', 'ING_CRAWFISH', 'main', false),
('french', 'FRE_SAUCE_NANTUA', 'ING_HEAVY_CREAM', 'main', false),
('french', 'FRE_SAUCE_NANTUA', 'ING_BUTTER', 'main', false),
('french', 'FRE_SAUCE_NANTUA', 'ING_COGNAC', 'flavoring', false),
('french', 'FRE_SAUCE_NANTUA', 'ING_TOMATO_PASTE', 'flavoring', false),

-- ============================================
-- CHEESE COURSES
-- ============================================

-- FRE_PLATEAU_FROMAGES - Plateau de Fromages
('french', 'FRE_PLATEAU_FROMAGES', 'ING_BRIE', 'main', false),
('french', 'FRE_PLATEAU_FROMAGES', 'ING_CAMEMBERT', 'main', false),
('french', 'FRE_PLATEAU_FROMAGES', 'ING_ROQUEFORT', 'main', false),
('french', 'FRE_PLATEAU_FROMAGES', 'ING_COMTE', 'main', false),
('french', 'FRE_PLATEAU_FROMAGES', 'ING_CHEVRE', 'main', false),
('french', 'FRE_PLATEAU_FROMAGES', 'ING_WALNUT', 'garnish', true),

-- FRE_CAMEMBERT_ROTI - Camembert Rôti
('french', 'FRE_CAMEMBERT_ROTI', 'ING_CAMEMBERT', 'main', false),
('french', 'FRE_CAMEMBERT_ROTI', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_CAMEMBERT_ROTI', 'ING_ROSEMARY', 'flavoring', false),
('french', 'FRE_CAMEMBERT_ROTI', 'ING_HONEY', 'garnish', true),
('french', 'FRE_CAMEMBERT_ROTI', 'ING_CRUSTY_BREAD', 'garnish', false),

-- FRE_FONDUE_SAVOYARDE - Fondue Savoyarde
('french', 'FRE_FONDUE_SAVOYARDE', 'ING_COMTE', 'main', false),
('french', 'FRE_FONDUE_SAVOYARDE', 'ING_GRUYERE', 'main', false),
('french', 'FRE_FONDUE_SAVOYARDE', 'ING_WHITE_WINE', 'liquid', false),
('french', 'FRE_FONDUE_SAVOYARDE', 'ING_GARLIC', 'flavoring', false),
('french', 'FRE_FONDUE_SAVOYARDE', 'ING_CRUSTY_BREAD', 'garnish', false),

-- FRE_RACLETTE - Raclette
('french', 'FRE_RACLETTE', 'ING_GRUYERE', 'main', false),
('french', 'FRE_RACLETTE', 'ING_POTATO', 'main', false),
('french', 'FRE_RACLETTE', 'ING_HAM', 'main', false),
('french', 'FRE_RACLETTE', 'ING_CORNICHONS', 'garnish', true),

-- ============================================
-- PASTRIES
-- ============================================

-- FRE_PAIN_CHOCOLAT - Pain au Chocolat
('french', 'FRE_PAIN_CHOCOLAT', 'ING_FLOUR', 'main', false),
('french', 'FRE_PAIN_CHOCOLAT', 'ING_BUTTER', 'main', false),
('french', 'FRE_PAIN_CHOCOLAT', 'ING_CHOCOLATE', 'main', false),
('french', 'FRE_PAIN_CHOCOLAT', 'ING_YEAST', 'leavening', false),
('french', 'FRE_PAIN_CHOCOLAT', 'ING_MILK', 'liquid', false),

-- FRE_CHAUSSON_POMMES - Chausson aux Pommes
('french', 'FRE_CHAUSSON_POMMES', 'ING_FLOUR', 'main', false),
('french', 'FRE_CHAUSSON_POMMES', 'ING_BUTTER', 'main', false),
('french', 'FRE_CHAUSSON_POMMES', 'ING_APPLE', 'main', false),
('french', 'FRE_CHAUSSON_POMMES', 'ING_SUGAR', 'sweetener', false),
('french', 'FRE_CHAUSSON_POMMES', 'ING_CINNAMON', 'flavoring', false),

-- FRE_PALMIER - Palmier
('french', 'FRE_PALMIER', 'ING_FLOUR', 'main', false),
('french', 'FRE_PALMIER', 'ING_BUTTER', 'main', false),
('french', 'FRE_PALMIER', 'ING_SUGAR', 'sweetener', false),

-- FRE_KOUIGN_AMANN - Kouign-Amann
('french', 'FRE_KOUIGN_AMANN', 'ING_FLOUR', 'main', false),
('french', 'FRE_KOUIGN_AMANN', 'ING_BUTTER', 'main', false),
('french', 'FRE_KOUIGN_AMANN', 'ING_SUGAR', 'sweetener', false),
('french', 'FRE_KOUIGN_AMANN', 'ING_YEAST', 'leavening', false),
('french', 'FRE_KOUIGN_AMANN', 'ING_SALT', 'seasoning', false),

-- FRE_CANELE - Canelé
('french', 'FRE_CANELE', 'ING_FLOUR', 'main', false),
('french', 'FRE_CANELE', 'ING_MILK', 'main', false),
('french', 'FRE_CANELE', 'ING_EGG', 'main', false),
('french', 'FRE_CANELE', 'ING_SUGAR', 'sweetener', false),
('french', 'FRE_CANELE', 'ING_BUTTER', 'main', false),
('french', 'FRE_CANELE', 'ING_RUM', 'flavoring', false),
('french', 'FRE_CANELE', 'ING_VANILLA', 'flavoring', false),

-- FRE_MADELEINES - Madeleines
('french', 'FRE_MADELEINES', 'ING_FLOUR', 'main', false),
('french', 'FRE_MADELEINES', 'ING_BUTTER', 'main', false),
('french', 'FRE_MADELEINES', 'ING_EGG', 'main', false),
('french', 'FRE_MADELEINES', 'ING_SUGAR', 'sweetener', false),
('french', 'FRE_MADELEINES', 'ING_LEMON', 'flavoring', false),
('french', 'FRE_MADELEINES', 'ING_HONEY', 'sweetener', false),

-- FRE_FINANCIER - Financier
('french', 'FRE_FINANCIER', 'ING_ALMOND', 'main', false),
('french', 'FRE_FINANCIER', 'ING_BUTTER', 'main', false),
('french', 'FRE_FINANCIER', 'ING_EGG_WHITE', 'main', false),
('french', 'FRE_FINANCIER', 'ING_SUGAR', 'sweetener', false),
('french', 'FRE_FINANCIER', 'ING_FLOUR', 'main', false)

ON CONFLICT DO NOTHING;
