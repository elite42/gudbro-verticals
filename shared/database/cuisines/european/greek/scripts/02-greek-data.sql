-- ============================================
-- GREEK DATABASE - Data Import
-- ============================================
-- 74 authentic Greek dishes across 9 categories
-- Run AFTER 01-greek-missing-ingredients.sql
-- ============================================

INSERT INTO greek (
  id, slug, name, description, greek_name, greek_script,
  category, status, region, protein_type, cooking_method,
  is_meze, is_festive, is_street_food, has_phyllo,
  allergens, is_gluten_free, is_dairy_free, is_nut_free,
  is_vegan, is_vegetarian, is_halal, is_pescatarian,
  calories_per_serving, protein_g, carbs_g, fat_g,
  spice_level, tags, popularity
) VALUES

-- ============================================
-- GRILLED MEATS (8 items)
-- ============================================
('GREEK_SOUVLAKI_PORK', 'souvlaki-pork', 'Pork Souvlaki', 'Marinated pork skewers grilled to perfection, served with pita, tzatziki, and fresh vegetables', 'Souvlaki Hirino', 'Σουβλάκι Χοιρινό', 'grilled_meats', 'signature', 'national', 'pork', 'grilled', false, false, true, false, ARRAY['gluten']::TEXT[], false, true, true, false, false, false, false, 450, 32, 35, 22, 1, ARRAY['street-food', 'iconic', 'grilled', 'national-dish']::TEXT[], 98),

('GREEK_SOUVLAKI_CHICKEN', 'souvlaki-chicken', 'Chicken Souvlaki', 'Tender chicken skewers marinated in lemon, olive oil, and herbs, grilled and served with tzatziki', 'Souvlaki Kotopoulo', 'Σουβλάκι Κοτόπουλο', 'grilled_meats', 'popular', 'national', 'chicken', 'grilled', false, false, true, false, ARRAY['gluten']::TEXT[], false, true, true, false, false, true, false, 380, 35, 30, 14, 1, ARRAY['street-food', 'healthy', 'grilled']::TEXT[], 92),

('GREEK_GYROS_PORK', 'gyros-pork', 'Pork Gyros', 'Thinly sliced pork from a vertical rotisserie, wrapped in pita with tzatziki, tomatoes, onions, and fries', 'Gyros Hirino', 'Γύρος Χοιρινός', 'grilled_meats', 'signature', 'national', 'pork', 'roasted', false, false, true, false, ARRAY['gluten', 'dairy']::TEXT[], false, false, true, false, false, false, false, 580, 28, 52, 28, 1, ARRAY['street-food', 'iconic', 'rotisserie', 'national-dish']::TEXT[], 97),

('GREEK_GYROS_CHICKEN', 'gyros-chicken', 'Chicken Gyros', 'Vertically roasted chicken sliced thin, served in pita with tzatziki and fresh vegetables', 'Gyros Kotopoulo', 'Γύρος Κοτόπουλο', 'grilled_meats', 'popular', 'national', 'chicken', 'roasted', false, false, true, false, ARRAY['gluten', 'dairy']::TEXT[], false, false, true, false, false, true, false, 520, 32, 48, 22, 1, ARRAY['street-food', 'healthy-option', 'rotisserie']::TEXT[], 90),

('GREEK_LAMB_CHOPS', 'paidakia', 'Paidakia (Lamb Chops)', 'Grilled lamb chops marinated in olive oil, lemon, oregano, and garlic, charred to perfection', 'Paidakia', 'Παϊδάκια', 'grilled_meats', 'premium', 'national', 'lamb', 'grilled', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, true, false, 520, 42, 2, 38, 0, ARRAY['premium', 'grilled', 'festive', 'lamb']::TEXT[], 88),

('GREEK_BIFTEKI', 'bifteki', 'Bifteki', 'Greek-style grilled beef patties stuffed with feta cheese, seasoned with herbs and onions', 'Bifteki', 'Μπιφτέκι', 'grilled_meats', 'classic', 'national', 'beef', 'grilled', false, false, false, false, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, false, false, false, 420, 35, 8, 28, 0, ARRAY['comfort-food', 'grilled', 'stuffed']::TEXT[], 82),

('GREEK_KOKORETSI', 'kokoretsi', 'Kokoretsi', 'Traditional Easter dish of lamb offal wrapped in intestines and slow-roasted on a spit', 'Kokoretsi', 'Κοκορέτσι', 'grilled_meats', 'traditional', 'national', 'lamb', 'roasted', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 28, 2, 30, 1, ARRAY['easter', 'traditional', 'offal', 'festive']::TEXT[], 65),

('GREEK_KONTOSOUVLI', 'kontosouvli', 'Kontosouvli', 'Large chunks of marinated pork slow-roasted on a spit, crispy outside and juicy inside', 'Kontosouvli', 'Κοντοσούβλι', 'grilled_meats', 'traditional', 'macedonia', 'pork', 'roasted', false, true, false, false, ARRAY[]::TEXT[], true, true, true, false, false, false, false, 480, 38, 3, 35, 0, ARRAY['spit-roasted', 'festive', 'traditional']::TEXT[], 78),

-- ============================================
-- BAKED CASSEROLES (8 items)
-- ============================================
('GREEK_MOUSSAKA', 'moussaka', 'Moussaka', 'Iconic Greek casserole with layers of eggplant, spiced ground meat, potatoes, and creamy béchamel sauce', 'Mousakas', 'Μουσακάς', 'baked_casseroles', 'signature', 'national', 'beef', 'baked', false, false, false, false, ARRAY['dairy', 'gluten']::TEXT[], false, false, true, false, false, false, false, 520, 25, 38, 32, 1, ARRAY['iconic', 'national-dish', 'comfort-food', 'casserole']::TEXT[], 98),

('GREEK_MOUSSAKA_VEGETARIAN', 'moussaka-vegetarian', 'Vegetarian Moussaka', 'Plant-based version with layers of eggplant, zucchini, lentils, and creamy béchamel', 'Mousakas Nistisimos', 'Μουσακάς Νηστίσιμος', 'baked_casseroles', 'popular', 'national', 'vegetarian', 'baked', false, false, false, false, ARRAY['dairy', 'gluten']::TEXT[], false, false, true, false, true, true, true, 420, 15, 45, 22, 1, ARRAY['vegetarian', 'modern', 'casserole']::TEXT[], 75),

('GREEK_PASTITSIO', 'pastitsio', 'Pastitsio', 'Greek pasta bake with tubular pasta, spiced meat sauce, and creamy béchamel, often called Greek lasagna', 'Pastitsio', 'Παστίτσιο', 'baked_casseroles', 'classic', 'national', 'beef', 'baked', false, false, false, false, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, false, false, false, 580, 28, 52, 30, 1, ARRAY['pasta', 'comfort-food', 'casserole', 'sunday-dinner']::TEXT[], 90),

('GREEK_GIOUVETSI', 'giouvetsi', 'Giouvetsi', 'Slow-baked lamb or beef with orzo pasta in rich tomato sauce with warm spices', 'Giouvetsi', 'Γιουβέτσι', 'baked_casseroles', 'traditional', 'national', 'lamb', 'baked', false, true, false, false, ARRAY['gluten']::TEXT[], false, true, true, false, false, true, false, 550, 35, 48, 25, 1, ARRAY['sunday-dinner', 'comfort-food', 'traditional', 'festive']::TEXT[], 85),

('GREEK_PAPOUTSAKIA', 'papoutsakia', 'Papoutsakia', 'Stuffed eggplant halves with spiced meat and topped with béchamel sauce, baked until golden', 'Papoutsakia', 'Παπουτσάκια', 'baked_casseroles', 'classic', 'national', 'beef', 'baked', false, false, false, false, ARRAY['dairy', 'gluten']::TEXT[], false, false, true, false, false, false, false, 420, 22, 25, 28, 1, ARRAY['stuffed', 'comfort-food', 'eggplant']::TEXT[], 78),

('GREEK_GEMISTA', 'gemista', 'Gemista', 'Tomatoes and peppers stuffed with herbed rice, pine nuts, and currants, baked with olive oil', 'Gemista', 'Γεμιστά', 'baked_casseroles', 'classic', 'national', 'vegetarian', 'baked', false, false, false, false, ARRAY['tree_nuts']::TEXT[], true, true, false, true, true, true, true, 320, 8, 45, 14, 0, ARRAY['vegetarian', 'vegan', 'summer', 'stuffed']::TEXT[], 85),

('GREEK_IMAM_BAILDI', 'imam-baildi', 'Imam Baildi', 'Whole eggplants stuffed with onions, tomatoes, and garlic, braised in olive oil until silky', 'Imam Baildi', 'Ιμάμ Μπαϊλντί', 'baked_casseroles', 'traditional', 'aegean_islands', 'vegetarian', 'braised', true, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 280, 4, 22, 20, 0, ARRAY['vegan', 'traditional', 'eggplant', 'olive-oil']::TEXT[], 75),

('GREEK_BRIAM', 'briam', 'Briam', 'Greek ratatouille with roasted summer vegetables - zucchini, eggplant, potatoes, tomatoes in olive oil', 'Briam', 'Μπριάμ', 'baked_casseroles', 'classic', 'national', 'vegetarian', 'baked', false, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 250, 5, 32, 12, 0, ARRAY['vegan', 'summer', 'vegetables', 'healthy']::TEXT[], 80),

-- ============================================
-- STEWS & BRAISES (7 items)
-- ============================================
('GREEK_STIFADO', 'stifado', 'Stifado', 'Rich beef or rabbit stew with pearl onions, tomatoes, red wine, and warm spices like cinnamon and cloves', 'Stifado', 'Στιφάδο', 'stews_braises', 'classic', 'national', 'beef', 'stewed', false, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, false, false, 450, 38, 22, 24, 1, ARRAY['comfort-food', 'winter', 'slow-cooked', 'wine-braised']::TEXT[], 88),

('GREEK_STIFADO_RABBIT', 'stifado-rabbit', 'Rabbit Stifado', 'Traditional hunter-style rabbit stew with pearl onions and aromatic spices', 'Stifado Kouneli', 'Στιφάδο Κουνέλι', 'stews_braises', 'traditional', 'crete', 'mixed', 'stewed', false, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, true, false, 380, 35, 18, 18, 1, ARRAY['traditional', 'game', 'cretan', 'slow-cooked']::TEXT[], 70),

('GREEK_KLEFTIKO', 'kleftiko', 'Kleftiko', 'Slow-roasted lamb sealed in parchment with potatoes, garlic, and oregano until fall-off-the-bone tender', 'Kleftiko', 'Κλέφτικο', 'stews_braises', 'signature', 'national', 'lamb', 'braised', false, true, false, false, ARRAY['dairy']::TEXT[], true, false, true, false, false, true, false, 580, 42, 28, 35, 0, ARRAY['slow-cooked', 'festive', 'lamb', 'traditional']::TEXT[], 92),

('GREEK_KOKKINISTO', 'kokkinisto', 'Kokkinisto', 'Beef braised in rich tomato sauce with onions and red wine, served with pasta or potatoes', 'Kokkinisto', 'Κοκκινιστό', 'stews_braises', 'classic', 'national', 'beef', 'braised', false, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, false, false, 420, 35, 15, 25, 0, ARRAY['comfort-food', 'tomato-based', 'slow-cooked']::TEXT[], 78),

('GREEK_LAMB_FRICASSEE', 'lamb-fricassee', 'Lamb Fricassee', 'Spring lamb stew with romaine lettuce, dill, and finished with creamy avgolemono sauce', 'Arni Frikase', 'Αρνί Φρικασέ', 'stews_braises', 'traditional', 'national', 'lamb', 'stewed', false, true, false, false, ARRAY['eggs']::TEXT[], true, true, true, false, false, true, false, 480, 38, 12, 32, 0, ARRAY['spring', 'easter', 'avgolemono', 'traditional']::TEXT[], 75),

('GREEK_YOUVARLAKIA', 'youvarlakia', 'Youvarlakia Avgolemono', 'Greek meatballs with rice in creamy egg-lemon soup, a beloved comfort food', 'Giouvarlakia Avgolemono', 'Γιουβαρλάκια Αυγολέμονο', 'stews_braises', 'classic', 'national', 'beef', 'stewed', false, false, false, false, ARRAY['eggs']::TEXT[], true, true, true, false, false, false, false, 380, 25, 28, 20, 0, ARRAY['comfort-food', 'soup', 'meatballs', 'avgolemono']::TEXT[], 82),

('GREEK_LAMB_YIAHNI', 'lamb-yiahni', 'Lamb Yiahni', 'Lamb stew braised with green beans, tomatoes, and fresh herbs in olive oil', 'Arni Yiahni', 'Αρνί Γιαχνί', 'stews_braises', 'traditional', 'peloponnese', 'lamb', 'stewed', false, false, false, false, ARRAY[]::TEXT[], true, true, true, false, false, true, false, 420, 32, 18, 26, 0, ARRAY['summer', 'one-pot', 'vegetables']::TEXT[], 72),

-- ============================================
-- SEAFOOD (8 items)
-- ============================================
('GREEK_GRILLED_OCTOPUS', 'grilled-octopus', 'Grilled Octopus', 'Tender octopus charred on the grill, dressed with olive oil, lemon, and oregano', 'Htapodi Stin Schara', 'Χταπόδι στη Σχάρα', 'seafood', 'signature', 'aegean_islands', 'seafood', 'grilled', true, false, false, false, ARRAY['shellfish']::TEXT[], true, true, true, false, false, true, true, 280, 32, 4, 14, 0, ARRAY['iconic', 'grilled', 'summer', 'meze']::TEXT[], 92),

('GREEK_CALAMARI_FRIED', 'calamari-fried', 'Fried Calamari', 'Crispy fried squid rings served with lemon wedges and skordalia or tzatziki', 'Kalamarakia Tiganita', 'Καλαμαράκια Τηγανητά', 'seafood', 'classic', 'national', 'seafood', 'fried', true, false, true, false, ARRAY['shellfish', 'gluten']::TEXT[], false, true, true, false, false, true, true, 380, 22, 28, 20, 0, ARRAY['fried', 'popular', 'taverna', 'meze']::TEXT[], 90),

('GREEK_SHRIMP_SAGANAKI', 'shrimp-saganaki', 'Shrimp Saganaki', 'Plump shrimp baked in spicy tomato sauce with feta cheese, ouzo, and fresh herbs', 'Garides Saganaki', 'Γαρίδες Σαγανάκι', 'seafood', 'signature', 'national', 'seafood', 'baked', true, false, false, false, ARRAY['shellfish', 'dairy']::TEXT[], true, false, true, false, false, true, true, 420, 28, 12, 30, 2, ARRAY['saganaki', 'baked', 'popular', 'taverna']::TEXT[], 88),

('GREEK_FRIED_ANCHOVIES', 'fried-anchovies', 'Fried Anchovies', 'Small fresh anchovies lightly floured and fried crispy, served with lemon', 'Gavros Tiganitos', 'Γαύρος Τηγανητός', 'seafood', 'traditional', 'national', 'seafood', 'fried', true, false, true, false, ARRAY['fish', 'gluten']::TEXT[], false, true, true, false, false, true, true, 320, 20, 18, 20, 0, ARRAY['fried', 'taverna', 'affordable', 'meze']::TEXT[], 78),

('GREEK_FISH_PLAKI', 'fish-plaki', 'Fish Plaki', 'Whole fish baked with tomatoes, onions, garlic, and herbs in olive oil', 'Psari Plaki', 'Ψάρι Πλακί', 'seafood', 'traditional', 'national', 'seafood', 'baked', false, false, false, false, ARRAY['fish']::TEXT[], true, true, true, false, false, true, true, 380, 35, 22, 18, 0, ARRAY['baked', 'traditional', 'healthy', 'whole-fish']::TEXT[], 75),

('GREEK_GRILLED_SARDINES', 'grilled-sardines', 'Grilled Sardines', 'Fresh sardines grilled whole with olive oil, lemon, and oregano', 'Sardeles Scharas', 'Σαρδέλες Σχάρας', 'seafood', 'traditional', 'aegean_islands', 'seafood', 'grilled', true, false, true, false, ARRAY['fish']::TEXT[], true, true, true, false, false, true, true, 280, 24, 0, 20, 0, ARRAY['grilled', 'simple', 'healthy', 'omega-3']::TEXT[], 72),

('GREEK_MUSSELS_SAGANAKI', 'mussels-saganaki', 'Mussels Saganaki', 'Mussels steamed in white wine with tomatoes, feta, and fresh herbs', 'Midia Saganaki', 'Μύδια Σαγανάκι', 'seafood', 'popular', 'thessaloniki', 'seafood', 'steamed', true, false, false, false, ARRAY['shellfish', 'dairy']::TEXT[], true, false, true, false, false, false, true, 320, 22, 10, 20, 1, ARRAY['saganaki', 'steamed', 'wine', 'meze']::TEXT[], 75),

('GREEK_GRILLED_SEA_BREAM', 'grilled-sea-bream', 'Grilled Sea Bream', 'Whole sea bream grilled with olive oil, lemon, and Mediterranean herbs', 'Tsipoura Scharas', 'Τσιπούρα Σχάρας', 'seafood', 'premium', 'national', 'seafood', 'grilled', false, false, false, false, ARRAY['fish']::TEXT[], true, true, true, false, false, true, true, 350, 38, 0, 20, 0, ARRAY['premium', 'grilled', 'whole-fish', 'healthy']::TEXT[], 85),

-- ============================================
-- MEZE & APPETIZERS (12 items)
-- ============================================
('GREEK_TZATZIKI', 'tzatziki', 'Tzatziki', 'Creamy yogurt dip with cucumber, garlic, olive oil, and dill', 'Tzatziki', 'Τζατζίκι', 'meze_appetizers', 'signature', 'national', 'vegetarian', 'raw', true, false, false, false, ARRAY['dairy']::TEXT[], true, false, true, false, true, true, true, 120, 5, 6, 8, 0, ARRAY['iconic', 'dip', 'cool', 'refreshing']::TEXT[], 98),

('GREEK_DOLMADES', 'dolmades', 'Dolmades', 'Grape leaves stuffed with seasoned rice, pine nuts, and fresh herbs', 'Dolmadakia', 'Ντολμαδάκια', 'meze_appetizers', 'classic', 'national', 'vegetarian', 'steamed', true, false, false, false, ARRAY['tree_nuts']::TEXT[], true, true, false, true, true, true, true, 180, 4, 28, 7, 0, ARRAY['stuffed', 'vegan', 'traditional', 'finger-food']::TEXT[], 88),

('GREEK_DOLMADES_MEAT', 'dolmades-meat', 'Meat Dolmades', 'Grape leaves stuffed with ground beef, rice, and herbs, served with avgolemono sauce', 'Dolmadakia me Kima', 'Ντολμαδάκια με Κιμά', 'meze_appetizers', 'traditional', 'national', 'beef', 'steamed', true, false, false, false, ARRAY['eggs']::TEXT[], true, true, true, false, false, false, false, 280, 15, 22, 14, 0, ARRAY['stuffed', 'avgolemono', 'traditional']::TEXT[], 80),

('GREEK_SAGANAKI_CHEESE', 'saganaki-cheese', 'Saganaki', 'Pan-fried cheese with a crispy golden crust, flambéed with brandy and served with lemon', 'Saganaki', 'Σαγανάκι', 'meze_appetizers', 'signature', 'national', 'vegetarian', 'fried', true, false, false, false, ARRAY['dairy', 'gluten']::TEXT[], false, false, true, false, true, true, true, 320, 18, 8, 25, 0, ARRAY['fried', 'cheese', 'flambé', 'iconic']::TEXT[], 90),

('GREEK_FAVA', 'fava', 'Fava', 'Creamy yellow split pea puree drizzled with olive oil and topped with caramelized onions', 'Fava', 'Φάβα', 'meze_appetizers', 'traditional', 'cyclades', 'vegetarian', 'stewed', true, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 220, 12, 32, 8, 0, ARRAY['santorini', 'vegan', 'healthy', 'dip']::TEXT[], 82),

('GREEK_TARAMOSALATA', 'taramosalata', 'Taramosalata', 'Creamy fish roe dip blended with bread, olive oil, and lemon juice', 'Taramosalata', 'Ταραμοσαλάτα', 'meze_appetizers', 'classic', 'national', 'seafood', 'raw', true, true, false, false, ARRAY['fish', 'gluten']::TEXT[], false, true, true, false, false, true, true, 280, 8, 18, 20, 0, ARRAY['dip', 'lenten', 'traditional', 'easter']::TEXT[], 78),

('GREEK_MELITZANOSALATA', 'melitzanosalata', 'Melitzanosalata', 'Smoky roasted eggplant dip with garlic, olive oil, and lemon', 'Melitzanosalata', 'Μελιτζανοσαλάτα', 'meze_appetizers', 'classic', 'national', 'vegetarian', 'roasted', true, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 150, 3, 12, 11, 0, ARRAY['dip', 'smoky', 'vegan', 'eggplant']::TEXT[], 80),

('GREEK_SKORDALIA', 'skordalia', 'Skordalia', 'Pungent garlic dip made with potatoes or bread, olive oil, and vinegar', 'Skordalia', 'Σκορδαλιά', 'meze_appetizers', 'traditional', 'national', 'vegetarian', 'raw', true, false, false, false, ARRAY['tree_nuts']::TEXT[], true, true, false, true, true, true, true, 180, 3, 18, 12, 0, ARRAY['garlic', 'dip', 'vegan', 'pungent']::TEXT[], 75),

('GREEK_HTIPITI', 'htipiti', 'Htipiti', 'Spicy roasted red pepper and feta cheese dip', 'Htipiti', 'Χτυπητή', 'meze_appetizers', 'popular', 'macedonia', 'vegetarian', 'raw', true, false, false, false, ARRAY['dairy']::TEXT[], true, false, true, false, true, true, true, 180, 7, 8, 14, 2, ARRAY['dip', 'spicy', 'feta', 'pepper']::TEXT[], 78),

('GREEK_KOLOKITHOKEFTEDES', 'kolokithokeftedes', 'Kolokithokeftedes', 'Crispy zucchini fritters with feta, mint, and dill', 'Kolokithokeftedes', 'Κολοκυθοκεφτέδες', 'meze_appetizers', 'traditional', 'crete', 'vegetarian', 'fried', true, false, false, false, ARRAY['dairy', 'eggs', 'gluten']::TEXT[], false, false, true, false, true, true, true, 220, 8, 18, 14, 0, ARRAY['fritters', 'vegetarian', 'cretan', 'fried']::TEXT[], 82),

('GREEK_KEFTEDES', 'keftedes', 'Keftedes', 'Traditional Greek meatballs flavored with mint, onion, and herbs, pan-fried until crispy', 'Keftedes', 'Κεφτέδες', 'meze_appetizers', 'classic', 'national', 'beef', 'fried', true, false, false, false, ARRAY['gluten', 'eggs']::TEXT[], false, true, true, false, false, false, false, 320, 22, 12, 22, 0, ARRAY['meatballs', 'fried', 'comfort-food', 'taverna']::TEXT[], 85),

('GREEK_TIROKROKETES', 'tirokroketes', 'Tirokroketes', 'Crispy fried cheese balls with a molten center, served with honey or jam', 'Tirokroketes', 'Τυροκροκέτες', 'meze_appetizers', 'popular', 'national', 'vegetarian', 'fried', true, false, false, false, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, true, true, true, 280, 14, 18, 18, 0, ARRAY['fried', 'cheese', 'crispy', 'indulgent']::TEXT[], 80),

-- ============================================
-- PIES & PASTRIES (8 items)
-- ============================================
('GREEK_SPANAKOPITA', 'spanakopita', 'Spanakopita', 'Classic spinach and feta pie wrapped in crispy layers of golden phyllo pastry', 'Spanakopita', 'Σπανακόπιτα', 'pies_pastries', 'signature', 'national', 'vegetarian', 'baked', false, false, true, true, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, true, true, true, 350, 12, 28, 22, 0, ARRAY['iconic', 'phyllo', 'vegetarian', 'bakery']::TEXT[], 95),

('GREEK_TIROPITA', 'tiropita', 'Tiropita', 'Flaky phyllo pie filled with a creamy blend of feta and ricotta cheeses', 'Tiropita', 'Τυρόπιτα', 'pies_pastries', 'signature', 'national', 'vegetarian', 'baked', false, false, true, true, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, true, true, true, 380, 14, 25, 26, 0, ARRAY['cheese', 'phyllo', 'breakfast', 'bakery']::TEXT[], 92),

('GREEK_KOTOPITA', 'kotopita', 'Kotopita', 'Savory chicken pie with creamy filling wrapped in golden phyllo', 'Kotopita', 'Κοτόπιτα', 'pies_pastries', 'classic', 'national', 'chicken', 'baked', false, false, false, true, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, false, true, false, 420, 25, 30, 24, 0, ARRAY['chicken', 'phyllo', 'hearty', 'comfort-food']::TEXT[], 78),

('GREEK_KREATOPITA', 'kreatopita', 'Kreatopita', 'Traditional meat pie from Kefalonia with spiced lamb and rice filling', 'Kreatopita', 'Κρεατόπιτα', 'pies_pastries', 'traditional', 'ionian_islands', 'lamb', 'baked', false, true, false, true, ARRAY['gluten']::TEXT[], false, true, true, false, false, true, false, 480, 28, 38, 25, 1, ARRAY['meat', 'festive', 'kefalonian', 'traditional']::TEXT[], 72),

('GREEK_HORTOPITA', 'hortopita', 'Hortopita', 'Wild greens pie with seasonal herbs and feta in phyllo', 'Hortopita', 'Χορτόπιτα', 'pies_pastries', 'traditional', 'epirus', 'vegetarian', 'baked', false, false, false, true, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, true, true, true, 320, 10, 26, 20, 0, ARRAY['wild-greens', 'seasonal', 'healthy', 'epirus']::TEXT[], 70),

('GREEK_PRASOPITA', 'prasopita', 'Prasopita', 'Leek pie with feta cheese wrapped in buttery phyllo', 'Prasopita', 'Πρασόπιτα', 'pies_pastries', 'traditional', 'national', 'vegetarian', 'baked', false, false, false, true, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, true, true, true, 340, 10, 28, 22, 0, ARRAY['leek', 'phyllo', 'vegetarian', 'winter']::TEXT[], 68),

('GREEK_BOUGATSA_SAVORY', 'bougatsa-savory', 'Bougatsa (Savory)', 'Northern Greek phyllo pastry filled with creamy cheese or minced meat', 'Bougatsa me Tiri', 'Μπουγάτσα με Τυρί', 'pies_pastries', 'traditional', 'thessaloniki', 'vegetarian', 'baked', false, false, true, true, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, true, true, true, 360, 12, 30, 22, 0, ARRAY['thessaloniki', 'breakfast', 'phyllo', 'street-food']::TEXT[], 82),

('GREEK_KALITSOUNIA', 'kalitsounia', 'Kalitsounia', 'Small Cretan cheese pies with sweet or savory mizithra filling', 'Kalitsounia', 'Καλιτσούνια', 'pies_pastries', 'traditional', 'crete', 'vegetarian', 'baked', false, true, false, false, ARRAY['dairy', 'gluten', 'eggs']::TEXT[], false, false, true, false, true, true, true, 180, 8, 22, 8, 0, ARRAY['cretan', 'cheese', 'easter', 'traditional']::TEXT[], 75),

-- ============================================
-- SALADS (6 items)
-- ============================================
('GREEK_HORIATIKI', 'horiatiki', 'Greek Salad (Horiatiki)', 'Classic village salad with tomatoes, cucumbers, onions, olives, peppers, and a slab of feta cheese', 'Horiatiki Salata', 'Χωριάτικη Σαλάτα', 'salads', 'signature', 'national', 'vegetarian', 'raw', true, false, false, false, ARRAY['dairy']::TEXT[], true, false, true, false, true, true, true, 320, 10, 15, 26, 0, ARRAY['iconic', 'summer', 'fresh', 'healthy']::TEXT[], 98),

('GREEK_DAKOS', 'dakos', 'Dakos', 'Cretan barley rusk topped with chopped tomatoes, mizithra cheese, olives, and olive oil', 'Dakos', 'Ντάκος', 'salads', 'traditional', 'crete', 'vegetarian', 'raw', true, false, false, false, ARRAY['gluten', 'dairy']::TEXT[], false, false, true, false, true, true, true, 280, 8, 32, 14, 0, ARRAY['cretan', 'summer', 'rustic', 'traditional']::TEXT[], 85),

('GREEK_MAROULI_SALATA', 'marouli-salata', 'Romaine Lettuce Salad', 'Crisp romaine lettuce with scallions, dill, and tangy lemon-olive oil dressing', 'Marouli Salata', 'Μαρούλι Σαλάτα', 'salads', 'classic', 'national', 'vegetarian', 'raw', true, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 120, 2, 8, 10, 0, ARRAY['simple', 'fresh', 'vegan', 'light']::TEXT[], 72),

('GREEK_PANTZARIA_SALATA', 'pantzaria-salata', 'Beet Salad', 'Roasted beets served with skordalia (garlic dip) and fresh greens', 'Pantzaria Salata', 'Παντζάρια Σαλάτα', 'salads', 'traditional', 'national', 'vegetarian', 'roasted', true, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 150, 3, 18, 8, 0, ARRAY['roasted', 'healthy', 'vegan', 'earthy']::TEXT[], 70),

('GREEK_LAHANO_SALATA', 'lahano-salata', 'Cabbage Salad', 'Shredded cabbage and carrot salad with lemon-olive oil dressing', 'Lahano Salata', 'Λάχανο Σαλάτα', 'salads', 'classic', 'national', 'vegetarian', 'raw', true, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 100, 2, 12, 6, 0, ARRAY['simple', 'crunchy', 'vegan', 'affordable']::TEXT[], 65),

('GREEK_POLITIKI_SALATA', 'politiki-salata', 'Constantinople Salad', 'Shredded cabbage salad with peppers, carrots, and celery in vinegar dressing', 'Politiki Salata', 'Πολίτικη Σαλάτα', 'salads', 'traditional', 'thessaloniki', 'vegetarian', 'raw', true, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 120, 2, 14, 7, 0, ARRAY['istanbul', 'crunchy', 'vegan', 'colorful']::TEXT[], 68),

-- ============================================
-- SOUPS (7 items)
-- ============================================
('GREEK_AVGOLEMONO_SOUP', 'avgolemono-soup', 'Avgolemono Soup', 'Silky chicken soup thickened with eggs and lemon, with rice or orzo', 'Soupa Avgolemono', 'Σούπα Αυγολέμονο', 'soups', 'signature', 'national', 'chicken', 'stewed', false, false, false, false, ARRAY['eggs']::TEXT[], true, true, true, false, false, true, false, 280, 22, 25, 10, 0, ARRAY['comfort-food', 'healing', 'classic', 'winter']::TEXT[], 92),

('GREEK_FASOLADA', 'fasolada', 'Fasolada', 'National dish of Greece - hearty white bean soup with tomatoes, carrots, and celery', 'Fasolada', 'Φασολάδα', 'soups', 'signature', 'national', 'vegetarian', 'stewed', false, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 320, 15, 48, 8, 0, ARRAY['national-dish', 'vegan', 'healthy', 'winter']::TEXT[], 90),

('GREEK_FAKES', 'fakes', 'Fakes (Lentil Soup)', 'Comforting lentil soup with bay leaves, garlic, and a splash of vinegar', 'Fakes Soupa', 'Φακές Σούπα', 'soups', 'classic', 'national', 'vegetarian', 'stewed', false, false, false, false, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 280, 16, 42, 6, 0, ARRAY['comfort-food', 'vegan', 'affordable', 'lenten']::TEXT[], 85),

('GREEK_PSAROSOUPA', 'psarosoupa', 'Psarosoupa', 'Traditional fish soup with potatoes, carrots, and celery, finished with avgolemono', 'Psarosoupa', 'Ψαρόσουπα', 'soups', 'traditional', 'aegean_islands', 'seafood', 'stewed', false, false, false, false, ARRAY['fish', 'eggs']::TEXT[], true, true, true, false, false, true, true, 350, 30, 22, 15, 0, ARRAY['seafood', 'avgolemono', 'island', 'traditional']::TEXT[], 75),

('GREEK_KAKAVIA', 'kakavia', 'Kakavia', 'Ancient Greek fisherman soup with mixed fish, tomatoes, and saffron', 'Kakavia', 'Κακαβιά', 'soups', 'traditional', 'cyclades', 'seafood', 'stewed', false, false, false, false, ARRAY['fish']::TEXT[], true, true, true, false, false, true, true, 380, 32, 25, 16, 0, ARRAY['ancient', 'fisherman', 'island', 'rustic']::TEXT[], 70),

('GREEK_TRAHANA_SOUP', 'trahana-soup', 'Trahana Soup', 'Rustic soup made with fermented wheat and milk pasta, served sweet or savory', 'Trahanas Soupa', 'Τραχανάς Σούπα', 'soups', 'traditional', 'national', 'vegetarian', 'stewed', false, false, false, false, ARRAY['gluten', 'dairy']::TEXT[], false, false, true, false, true, true, true, 250, 10, 38, 8, 0, ARRAY['rustic', 'traditional', 'winter', 'comfort-food']::TEXT[], 68),

('GREEK_PATSAS', 'patsas', 'Patsas', 'Traditional tripe soup popular as a hangover cure, served with garlic and vinegar', 'Patsas', 'Πατσάς', 'soups', 'traditional', 'national', 'beef', 'stewed', false, false, true, false, ARRAY[]::TEXT[], true, true, true, false, false, false, false, 220, 25, 5, 12, 1, ARRAY['late-night', 'hangover-cure', 'offal', 'traditional']::TEXT[], 60),

-- ============================================
-- DESSERTS (10 items)
-- ============================================
('GREEK_BAKLAVA', 'baklava', 'Baklava', 'Layers of crispy phyllo filled with chopped walnuts and pistachios, soaked in honey syrup', 'Baklava', 'Μπακλαβάς', 'desserts', 'signature', 'national', 'vegetarian', 'baked', false, true, false, true, ARRAY['gluten', 'dairy', 'tree_nuts']::TEXT[], false, false, false, false, true, true, true, 420, 6, 52, 22, 0, ARRAY['iconic', 'phyllo', 'festive', 'nuts']::TEXT[], 95),

('GREEK_GALAKTOBOUREKO', 'galaktoboureko', 'Galaktoboureko', 'Crispy phyllo custard pie soaked in citrus-scented syrup', 'Galaktoboureko', 'Γαλακτομπούρεκο', 'desserts', 'signature', 'national', 'vegetarian', 'baked', false, false, false, true, ARRAY['gluten', 'dairy', 'eggs']::TEXT[], false, false, true, false, true, true, true, 380, 8, 48, 18, 0, ARRAY['custard', 'phyllo', 'syrup', 'classic']::TEXT[], 90),

('GREEK_LOUKOUMADES', 'loukoumades', 'Loukoumades', 'Golden fried honey puffs drizzled with honey, cinnamon, and crushed walnuts', 'Loukoumades', 'Λουκουμάδες', 'desserts', 'classic', 'national', 'vegetarian', 'fried', false, false, true, false, ARRAY['gluten', 'tree_nuts']::TEXT[], false, true, false, false, true, true, true, 320, 5, 45, 14, 0, ARRAY['fried', 'honey', 'street-food', 'ancient']::TEXT[], 88),

('GREEK_BOUGATSA_SWEET', 'bougatsa-sweet', 'Bougatsa (Sweet)', 'Thessaloniki-style phyllo pastry filled with semolina custard, dusted with powdered sugar and cinnamon', 'Bougatsa me Krema', 'Μπουγάτσα με Κρέμα', 'desserts', 'signature', 'thessaloniki', 'vegetarian', 'baked', false, false, true, true, ARRAY['gluten', 'dairy', 'eggs']::TEXT[], false, false, true, false, true, true, true, 350, 7, 42, 18, 0, ARRAY['thessaloniki', 'breakfast', 'custard', 'phyllo']::TEXT[], 92),

('GREEK_KOURABIEDES', 'kourabiedes', 'Kourabiedes', 'Buttery almond shortbread cookies coated in powdered sugar, traditional for Christmas', 'Kourabiedes', 'Κουραμπιέδες', 'desserts', 'classic', 'national', 'vegetarian', 'baked', false, true, false, false, ARRAY['gluten', 'dairy', 'tree_nuts', 'eggs']::TEXT[], false, false, false, false, true, true, true, 180, 3, 18, 12, 0, ARRAY['christmas', 'cookies', 'almond', 'festive']::TEXT[], 88),

('GREEK_MELOMAKARONA', 'melomakarona', 'Melomakarona', 'Honey-soaked cookies with orange and spices, topped with crushed walnuts', 'Melomakarona', 'Μελομακάρονα', 'desserts', 'classic', 'national', 'vegetarian', 'baked', false, true, false, false, ARRAY['gluten', 'tree_nuts']::TEXT[], false, true, false, false, true, true, true, 200, 3, 32, 8, 0, ARRAY['christmas', 'honey', 'cookies', 'festive']::TEXT[], 86),

('GREEK_RAVANI', 'ravani', 'Ravani', 'Light semolina cake soaked in lemon syrup, often topped with coconut or almonds', 'Ravani', 'Ραβανί', 'desserts', 'classic', 'national', 'vegetarian', 'baked', false, false, false, false, ARRAY['gluten', 'dairy', 'eggs']::TEXT[], false, false, true, false, true, true, true, 320, 6, 52, 10, 0, ARRAY['syrup-cake', 'semolina', 'moist', 'classic']::TEXT[], 78),

('GREEK_PORTOKALOPITA', 'portokalopita', 'Portokalopita', 'Orange phyllo cake made with shredded phyllo, yogurt, and citrus syrup', 'Portokalopita', 'Πορτοκαλόπιτα', 'desserts', 'popular', 'national', 'vegetarian', 'baked', false, false, false, true, ARRAY['gluten', 'dairy', 'eggs']::TEXT[], false, false, true, false, true, true, true, 340, 6, 48, 14, 0, ARRAY['orange', 'phyllo', 'syrup-cake', 'modern']::TEXT[], 82),

('GREEK_RIZOGALO', 'rizogalo', 'Rizogalo', 'Creamy Greek rice pudding flavored with vanilla and cinnamon', 'Rizogalo', 'Ρυζόγαλο', 'desserts', 'classic', 'national', 'vegetarian', 'stewed', false, false, false, false, ARRAY['dairy']::TEXT[], true, false, true, false, true, true, true, 220, 6, 38, 5, 0, ARRAY['comfort-food', 'rice-pudding', 'creamy', 'simple']::TEXT[], 75),

('GREEK_DIPLES', 'diples', 'Diples', 'Paper-thin fried dough ribbons drizzled with honey and sprinkled with walnuts', 'Diples', 'Δίπλες', 'desserts', 'traditional', 'peloponnese', 'vegetarian', 'fried', false, true, false, false, ARRAY['gluten', 'eggs', 'tree_nuts']::TEXT[], false, true, false, false, true, true, true, 280, 4, 42, 12, 0, ARRAY['fried', 'honey', 'wedding', 'festive']::TEXT[], 72)

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  greek_name = EXCLUDED.greek_name,
  greek_script = EXCLUDED.greek_script,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  region = EXCLUDED.region,
  protein_type = EXCLUDED.protein_type,
  cooking_method = EXCLUDED.cooking_method,
  is_meze = EXCLUDED.is_meze,
  is_festive = EXCLUDED.is_festive,
  is_street_food = EXCLUDED.is_street_food,
  has_phyllo = EXCLUDED.has_phyllo,
  allergens = EXCLUDED.allergens,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_dairy_free = EXCLUDED.is_dairy_free,
  is_nut_free = EXCLUDED.is_nut_free,
  is_vegan = EXCLUDED.is_vegan,
  is_vegetarian = EXCLUDED.is_vegetarian,
  is_halal = EXCLUDED.is_halal,
  is_pescatarian = EXCLUDED.is_pescatarian,
  calories_per_serving = EXCLUDED.calories_per_serving,
  protein_g = EXCLUDED.protein_g,
  carbs_g = EXCLUDED.carbs_g,
  fat_g = EXCLUDED.fat_g,
  spice_level = EXCLUDED.spice_level,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  updated_at = NOW();

-- ============================================
-- 74 Greek dishes imported successfully
-- Categories breakdown:
--   grilled_meats: 8
--   baked_casseroles: 8
--   stews_braises: 7
--   seafood: 8
--   meze_appetizers: 12
--   pies_pastries: 8
--   salads: 6
--   soups: 7
--   desserts: 10
--
-- Next: Run 03-greek-product-ingredients.sql
-- ============================================
