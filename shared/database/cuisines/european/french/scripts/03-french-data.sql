-- ============================================
-- FRENCH CUISINE - Product Data
-- GUDBRO Database Standards v1.3
-- ============================================

-- NOTE: Many French dishes already exist in other tables:
-- - Desserts: Creme Brulee, Mousse, Tarte Tatin, Profiteroles, Mille-Feuille, Macarons, Crepes Suzette, Eclair, Clafoutis, Paris-Brest
-- - Bakery: Croissants, Baguette, Brioche, Macaron
-- - Breakfast: French Omelette, French Toast
-- - Soups: French Onion Soup, Vichyssoise
-- - Salads: Niçoise Salad
-- - Sauces: Remoulade, Bearnaise
-- - Seafood: Coquilles Saint-Jacques
--
-- This table adds ONLY dishes not already in the database.

INSERT INTO french (id, slug, name, description, category, region, price_default, prep_time_min, spice_level, is_traditional, allergens, intolerances, dietary, tags) VALUES

-- ============================================
-- APPETIZERS (Entrées)
-- ============================================
('FRE_PATE_CAMPAGNE', 'pate-de-campagne', 'Pâté de Campagne', 'Rustic country pâté with pork, liver, and herbs', 'appetizer', 'France', 14.00, 180, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['pork', 'charcuterie', 'classic']),
('FRE_TERRINE_FOIE', 'terrine-foie-gras', 'Terrine de Foie Gras', 'Silky duck liver terrine with Sauternes', 'appetizer', 'Périgord', 35.00, 240, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['luxury', 'foie-gras', 'festive']),
('FRE_ESCARGOTS', 'escargots-bourguignonne', 'Escargots à la Bourguignonne', 'Snails baked in garlic-herb butter', 'appetizer', 'Burgundy', 16.00, 25, 0, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['classic', 'garlic', 'burgundy']),
('FRE_GOUGERES', 'gougeres', 'Gougères', 'Cheese puffs made with Gruyère', 'appetizer', 'Burgundy', 8.00, 35, 0, true, '[{"type": "gluten"}, {"type": "milk"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['cheese', 'pastry', 'wine-pairing']),
('FRE_SOUPE_POISSON', 'soupe-de-poisson', 'Soupe de Poisson', 'Provençal fish soup with rouille and croutons', 'appetizer', 'Provence', 14.00, 60, 0, true, '[{"type": "fish"}, {"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['soup', 'provence', 'seafood']),
('FRE_SALADE_LYONNAISE', 'salade-lyonnaise', 'Salade Lyonnaise', 'Frisée salad with lardons, poached egg, and Dijon vinaigrette', 'appetizer', 'Lyon', 14.00, 20, 0, true, '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['salad', 'lyon', 'egg']),
('FRE_TARTARE_BOEUF', 'tartare-de-boeuf', 'Tartare de Boeuf', 'Hand-cut raw beef with capers, shallots, and egg yolk', 'appetizer', 'France', 18.00, 15, 0, true, '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['raw', 'beef', 'classic']),
('FRE_QUENELLES', 'quenelles-de-brochet', 'Quenelles de Brochet', 'Pike fish dumplings in Nantua sauce', 'appetizer', 'Lyon', 18.00, 45, 0, true, '[{"type": "fish"}, {"type": "eggs"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fish', 'lyon', 'classic']),

-- ============================================
-- MAIN COURSES (Plats Principaux)
-- ============================================
('FRE_COQ_AU_VIN', 'coq-au-vin', 'Coq au Vin', 'Chicken braised in Burgundy wine with mushrooms and pearl onions', 'main', 'Burgundy', 28.00, 120, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['chicken', 'wine', 'burgundy', 'classic']),
('FRE_BOEUF_BOURG', 'boeuf-bourguignon', 'Boeuf Bourguignon', 'Beef stew braised in red wine with carrots and onions', 'main', 'Burgundy', 32.00, 180, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['beef', 'wine', 'stew', 'classic']),
('FRE_DUCK_CONFIT', 'confit-de-canard', 'Confit de Canard', 'Duck leg slowly cooked in its own fat until tender', 'main', 'Périgord', 30.00, 180, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['duck', 'confit', 'classic']),
('FRE_MAGRET', 'magret-de-canard', 'Magret de Canard', 'Seared duck breast with cherry or orange sauce', 'main', 'Périgord', 32.00, 30, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['duck', 'pan-seared', 'elegant']),
('FRE_LAPIN_MOUTARDE', 'lapin-a-la-moutarde', 'Lapin à la Moutarde', 'Rabbit braised in creamy Dijon mustard sauce', 'main', 'Burgundy', 28.00, 90, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['rabbit', 'mustard', 'classic']),
('FRE_BLANQUETTE', 'blanquette-de-veau', 'Blanquette de Veau', 'Veal stew in creamy white sauce with mushrooms', 'main', 'France', 28.00, 120, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['veal', 'cream', 'classic']),
('FRE_NAVARIN', 'navarin-dagneau', 'Navarin d''Agneau', 'Spring lamb stew with young vegetables', 'main', 'France', 30.00, 120, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['lamb', 'stew', 'spring']),
('FRE_GIGOT', 'gigot-dagneau', 'Gigot d''Agneau', 'Roasted leg of lamb with garlic and rosemary', 'main', 'France', 35.00, 120, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['lamb', 'roast', 'festive']),
('FRE_POULET_ROTI', 'poulet-roti', 'Poulet Rôti', 'Roasted chicken with herbs and pan jus', 'main', 'France', 24.00, 75, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['chicken', 'roast', 'classic']),
('FRE_RIS_VEAU', 'ris-de-veau', 'Ris de Veau', 'Pan-seared veal sweetbreads with morel cream sauce', 'main', 'France', 38.00, 45, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['offal', 'luxury', 'classic']),

-- ============================================
-- SEAFOOD (Fruits de Mer)
-- ============================================
('FRE_SOLE_MEUNIERE', 'sole-meuniere', 'Sole Meunière', 'Sole pan-fried in butter with lemon and parsley', 'seafood', 'Normandy', 32.00, 20, 0, true, '[{"type": "fish"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fish', 'butter', 'classic']),
('FRE_MOULES_MARINIERE', 'moules-marinieres', 'Moules Marinières', 'Mussels steamed in white wine, shallots, and herbs', 'seafood', 'Brittany', 20.00, 20, 0, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['mussels', 'wine', 'brittany']),
('FRE_MOULES_FRITES', 'moules-frites', 'Moules Frites', 'Mussels with crispy French fries', 'seafood', 'Brittany', 22.00, 30, 0, true, '[{"type": "shellfish"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['mussels', 'fries', 'bistro']),
('FRE_BOUILLABAISSE', 'bouillabaisse', 'Bouillabaisse', 'Provençal fish stew with saffron, rouille, and crusty bread', 'seafood', 'Provence', 38.00, 90, 0, true, '[{"type": "fish"}, {"type": "shellfish"}, {"type": "gluten"}]'::jsonb, '[{"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fish', 'stew', 'provence', 'saffron']),
('FRE_TRUITE_AMANDINE', 'truite-amandine', 'Truite Amandine', 'Trout pan-fried with brown butter and toasted almonds', 'seafood', 'France', 26.00, 25, 0, true, '[{"type": "fish"}, {"type": "milk"}, {"type": "nuts"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['fish', 'almonds', 'butter']),
('FRE_HOMARD_THERMIDOR', 'homard-thermidor', 'Homard Thermidor', 'Lobster in creamy mustard sauce, gratinéed', 'seafood', 'Paris', 55.00, 45, 0, true, '[{"type": "shellfish"}, {"type": "milk"}, {"type": "eggs"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['lobster', 'luxury', 'classic']),
('FRE_COQUILLES_GRATIN', 'coquilles-gratinees', 'Coquilles Gratinées', 'Scallops gratinéed with cream and breadcrumbs', 'seafood', 'Brittany', 28.00, 25, 0, true, '[{"type": "shellfish"}, {"type": "milk"}, {"type": "gluten"}]'::jsonb, '[{"type": "lactose"}, {"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['scallops', 'gratin', 'brittany']),

-- ============================================
-- BISTRO CLASSICS
-- ============================================
('FRE_STEAK_FRITES', 'steak-frites', 'Steak Frites', 'Pan-seared steak with crispy French fries', 'bistro', 'Paris', 28.00, 25, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['steak', 'fries', 'bistro', 'classic']),
('FRE_CROQUE_MONSIEUR', 'croque-monsieur', 'Croque Monsieur', 'Ham and Gruyère sandwich with béchamel, grilled', 'bistro', 'Paris', 14.00, 15, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['sandwich', 'cheese', 'ham', 'classic']),
('FRE_CROQUE_MADAME', 'croque-madame', 'Croque Madame', 'Croque Monsieur topped with a fried egg', 'bistro', 'Paris', 16.00, 18, 0, true, '[{"type": "gluten"}, {"type": "milk"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['sandwich', 'cheese', 'egg', 'classic']),
('FRE_QUICHE_LORRAINE', 'quiche-lorraine', 'Quiche Lorraine', 'Savory custard tart with bacon and Gruyère', 'bistro', 'Alsace', 14.00, 50, 0, true, '[{"type": "gluten"}, {"type": "milk"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['quiche', 'bacon', 'classic']),
('FRE_OMELETTE_FINES', 'omelette-fines-herbes', 'Omelette aux Fines Herbes', 'Soft French omelette with fresh herbs', 'bistro', 'France', 12.00, 10, 0, true, '[{"type": "eggs"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['eggs', 'herbs', 'classic']),
('FRE_ENTRECOTE_BORDELAISE', 'entrecote-bordelaise', 'Entrecôte Bordelaise', 'Ribeye steak with red wine and shallot sauce', 'bistro', 'Bordeaux', 34.00, 30, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['steak', 'wine', 'bordeaux']),
('FRE_BAVETTE_ECHALOTES', 'bavette-aux-echalotes', 'Bavette aux Échalotes', 'Flank steak with caramelized shallots', 'bistro', 'France', 26.00, 25, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['steak', 'shallots', 'bistro']),

-- ============================================
-- REGIONAL SPECIALTIES
-- ============================================
('FRE_CASSOULET', 'cassoulet', 'Cassoulet', 'White bean casserole with duck confit, sausage, and pork', 'regional', 'Languedoc', 28.00, 240, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['beans', 'duck', 'toulouse', 'hearty']),
('FRE_CHOUCROUTE', 'choucroute-garnie', 'Choucroute Garnie', 'Alsatian sauerkraut with assorted sausages and pork', 'regional', 'Alsace', 26.00, 90, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['sauerkraut', 'pork', 'alsace']),
('FRE_RATATOUILLE', 'ratatouille', 'Ratatouille', 'Provençal vegetable stew with tomatoes, zucchini, and eggplant', 'regional', 'Provence', 16.00, 60, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb, ARRAY['vegetables', 'provence', 'vegan']),
('FRE_GRATIN_DAUPHINOIS', 'gratin-dauphinois', 'Gratin Dauphinois', 'Creamy potato gratin with garlic and nutmeg', 'regional', 'Dauphiné', 12.00, 90, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['potato', 'gratin', 'classic']),
('FRE_TARTIFLETTE', 'tartiflette', 'Tartiflette', 'Potato gratin with Reblochon cheese, lardons, and onions', 'regional', 'Savoie', 18.00, 60, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['potato', 'cheese', 'savoie']),
('FRE_ALIGOT', 'aligot', 'Aligot', 'Stretchy mashed potatoes with Tomme cheese and garlic', 'regional', 'Auvergne', 14.00, 30, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['potato', 'cheese', 'auvergne']),
('FRE_FLAMICHE', 'flamiche', 'Flamiche', 'Leek tart from Picardy', 'regional', 'Picardy', 14.00, 50, 0, true, '[{"type": "gluten"}, {"type": "milk"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['leek', 'tart', 'picardy']),
('FRE_PIPERADE', 'piperade', 'Piperade', 'Basque pepper and tomato stew with eggs', 'regional', 'Basque Country', 14.00, 30, 0, true, '[{"type": "eggs"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['basque', 'peppers', 'eggs']),
('FRE_POT_AU_FEU', 'pot-au-feu', 'Pot-au-Feu', 'Classic French beef and vegetable boiled dinner', 'regional', 'France', 26.00, 180, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['beef', 'vegetables', 'classic']),
('FRE_SALADE_LANDAISE', 'salade-landaise', 'Salade Landaise', 'Salad with duck gizzards, foie gras, and pine nuts', 'regional', 'Gascony', 18.00, 20, 0, true, '[{"type": "nuts"}]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['salad', 'duck', 'gascony']),

-- ============================================
-- SAUCES (French mother sauces and derivatives)
-- ============================================
('FRE_SAUCE_BORDELAISE', 'sauce-bordelaise', 'Sauce Bordelaise', 'Red wine sauce with bone marrow and shallots', 'sauce', 'Bordeaux', 6.00, 30, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['wine', 'classic', 'beef']),
('FRE_SAUCE_CHASSEUR', 'sauce-chasseur', 'Sauce Chasseur', 'Hunter''s sauce with mushrooms, tomatoes, and white wine', 'sauce', 'France', 5.00, 25, 0, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['mushroom', 'classic', 'chicken']),
('FRE_SAUCE_DIABLE', 'sauce-diable', 'Sauce Diable', 'Spicy sauce with shallots, white wine, and cayenne', 'sauce', 'France', 5.00, 20, 1, true, '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['spicy', 'classic']),
('FRE_BEURRE_BLANC', 'beurre-blanc', 'Beurre Blanc', 'Emulsified butter sauce with shallots and white wine', 'sauce', 'Loire Valley', 5.00, 15, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['butter', 'classic', 'fish']),
('FRE_SAUCE_NANTUA', 'sauce-nantua', 'Sauce Nantua', 'Crayfish cream sauce for fish and quenelles', 'sauce', 'Lyon', 6.00, 30, 0, true, '[{"type": "shellfish"}, {"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['crayfish', 'cream', 'lyon']),

-- ============================================
-- CHEESE COURSES
-- ============================================
('FRE_PLATEAU_FROMAGES', 'plateau-de-fromages', 'Plateau de Fromages', 'Selection of French cheeses with accompaniments', 'cheese', 'France', 22.00, 5, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['cheese', 'assortment', 'classic']),
('FRE_CAMEMBERT_ROTI', 'camembert-roti', 'Camembert Rôti', 'Whole baked Camembert with garlic and rosemary', 'cheese', 'Normandy', 16.00, 20, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['cheese', 'baked', 'normandy']),
('FRE_FONDUE_SAVOYARDE', 'fondue-savoyarde', 'Fondue Savoyarde', 'Melted cheese fondue with Comté and white wine', 'cheese', 'Savoie', 24.00, 25, 0, true, '[{"type": "milk"}, {"type": "gluten"}]'::jsonb, '[{"type": "lactose"}, {"type": "gluten"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['cheese', 'fondue', 'savoie']),
('FRE_RACLETTE', 'raclette', 'Raclette', 'Melted raclette cheese served with potatoes and charcuterie', 'cheese', 'Savoie', 26.00, 30, 0, true, '[{"type": "milk"}]'::jsonb, '[{"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": false}'::jsonb, ARRAY['cheese', 'potato', 'alpine']),

-- ============================================
-- PASTRIES (Viennoiseries not in bakery)
-- ============================================
('FRE_PAIN_CHOCOLAT', 'pain-au-chocolat', 'Pain au Chocolat', 'Flaky pastry filled with dark chocolate', 'pastry', 'France', 4.00, 180, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['chocolate', 'pastry', 'breakfast']),
('FRE_CHAUSSON_POMMES', 'chausson-aux-pommes', 'Chausson aux Pommes', 'Apple turnover with puff pastry', 'pastry', 'France', 4.50, 45, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['apple', 'pastry', 'classic']),
('FRE_PALMIER', 'palmier', 'Palmier', 'Caramelized puff pastry cookie', 'pastry', 'France', 3.00, 30, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['pastry', 'cookie', 'caramel']),
('FRE_KOUIGN_AMANN', 'kouign-amann', 'Kouign-Amann', 'Breton butter cake with caramelized layers', 'pastry', 'Brittany', 5.00, 120, 0, true, '[{"type": "gluten"}, {"type": "milk"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['butter', 'brittany', 'caramel']),
('FRE_CANELE', 'canele', 'Canelé', 'Bordeaux pastry with rum and vanilla, caramelized crust', 'pastry', 'Bordeaux', 4.00, 90, 0, true, '[{"type": "gluten"}, {"type": "milk"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['rum', 'vanilla', 'bordeaux']),
('FRE_MADELEINES', 'madeleines', 'Madeleines', 'Shell-shaped butter cakes with lemon zest', 'pastry', 'Lorraine', 6.00, 25, 0, true, '[{"type": "gluten"}, {"type": "milk"}, {"type": "eggs"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['butter', 'lemon', 'classic']),
('FRE_FINANCIER', 'financier', 'Financier', 'Almond cake with brown butter', 'pastry', 'Paris', 4.00, 25, 0, true, '[{"type": "gluten"}, {"type": "milk"}, {"type": "eggs"}, {"type": "nuts"}]'::jsonb, '[{"type": "gluten"}, {"type": "lactose"}]'::jsonb, '{"is_vegan": false, "is_vegetarian": true}'::jsonb, ARRAY['almond', 'butter', 'classic'])

ON CONFLICT DO NOTHING;
