-- ============================================
-- GUDBRO Seafood - Missing Ingredients
-- Version: 1.0
-- Uses ON CONFLICT DO NOTHING to skip existing
-- ============================================

-- SEAFOOD / FISH
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SALMON', 'salmon', 'Salmon', 'Atlantic or Pacific salmon fillet', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BRANZINO', 'branzino', 'Branzino', 'Mediterranean sea bass, mild white fish', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SEA_BASS', 'sea-bass', 'Sea Bass', 'White-fleshed sea bass', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_COD', 'cod', 'Cod', 'Atlantic cod, firm white fish', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SALT_COD', 'salt-cod', 'Salt Cod (Bacalao)', 'Salted and dried cod', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_TUNA', 'tuna', 'Tuna', 'Yellowfin or bluefin tuna', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SWORDFISH', 'swordfish', 'Swordfish', 'Firm, meaty swordfish steak', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SOLE', 'sole', 'Sole', 'Delicate flatfish with fine texture', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_HALIBUT', 'halibut', 'Halibut', 'Large, firm white fish', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_TROUT', 'trout', 'Trout', 'Rainbow or brook trout', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CATFISH', 'catfish', 'Catfish', 'Freshwater catfish fillet', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SARDINES', 'sardines', 'Sardines', 'Small oily fish, rich in omega-3', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_MONKFISH', 'monkfish', 'Monkfish', 'Firm, lobster-like white fish', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, false, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ROCKFISH', 'rockfish', 'Rockfish', 'Pacific rockfish, used in bouillabaisse', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_WHITE_FISH', 'white-fish', 'White Fish', 'Generic mild white fish', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ANCHOVY', 'anchovy', 'Anchovy', 'Small salty cured fish', 'proteins', 'fish', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- SHELLFISH / CRUSTACEANS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SHRIMP', 'shrimp', 'Shrimp', 'Fresh or frozen shrimp', 'proteins', 'shellfish', '{"shellfish": true, "crustaceans": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_LOBSTER', 'lobster', 'Lobster', 'Maine or spiny lobster', 'proteins', 'shellfish', '{"shellfish": true, "crustaceans": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CRAB', 'crab', 'Crab', 'Blue crab or lump crab meat', 'proteins', 'shellfish', '{"shellfish": true, "crustaceans": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_DUNGENESS_CRAB', 'dungeness-crab', 'Dungeness Crab', 'Pacific Dungeness crab', 'proteins', 'shellfish', '{"shellfish": true, "crustaceans": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, false, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_MUD_CRAB', 'mud-crab', 'Mud Crab', 'Asian mud crab, used in chili crab', 'proteins', 'shellfish', '{"shellfish": true, "crustaceans": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, false, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SOFT_SHELL_CRAB', 'soft-shell-crab', 'Soft Shell Crab', 'Molted crab eaten whole', 'proteins', 'shellfish', '{"shellfish": true, "crustaceans": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, false, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CRAWFISH', 'crawfish', 'Crawfish', 'Louisiana crawfish (crayfish)', 'proteins', 'shellfish', '{"shellfish": true, "crustaceans": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- MOLLUSKS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_MUSSELS', 'mussels', 'Mussels', 'Black or green-lipped mussels', 'proteins', 'shellfish', '{"shellfish": true, "mollusks": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CLAMS', 'clams', 'Clams', 'Littleneck, Manila, or cherrystone clams', 'proteins', 'shellfish', '{"shellfish": true, "mollusks": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_OYSTERS', 'oysters', 'Oysters', 'Fresh oysters on the half shell', 'proteins', 'shellfish', '{"shellfish": true, "mollusks": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SCALLOPS', 'scallops', 'Scallops', 'Sea scallops or bay scallops', 'proteins', 'shellfish', '{"shellfish": true, "mollusks": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SQUID', 'squid', 'Squid (Calamari)', 'Whole squid or rings', 'proteins', 'shellfish', '{"shellfish": true, "mollusks": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_OCTOPUS', 'octopus', 'Octopus', 'Whole octopus, tenderized', 'proteins', 'shellfish', '{"shellfish": true, "mollusks": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

-- DAIRY & CHEESE
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CREAM_CHEESE', 'cream-cheese', 'Cream Cheese', 'Soft, spreadable cheese', 'dairy', 'cheese', '{"milk": true}', '{"vegetarian": true, "gluten_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_GRUYERE', 'gruyere', 'Gruyere Cheese', 'Swiss hard cheese, nutty flavor', 'dairy', 'cheese', '{"milk": true}', '{"vegetarian": true, "gluten_free": true}', '{}', 0, true, true, 'refrigerated')
ON CONFLICT DO NOTHING;

-- GRAINS & PASTA
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_RICE', 'rice', 'Rice', 'Long grain white or jasmine rice', 'grains', 'rice', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ARBORIO_RICE', 'arborio-rice', 'Arborio Rice', 'Short grain Italian rice for risotto', 'grains', 'rice', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_LINGUINE', 'linguine', 'Linguine', 'Flat Italian pasta', 'grains', 'pasta', '{"gluten": true, "wheat": true}', '{"vegetarian": true, "vegan": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BRIOCHE_BUN', 'brioche-bun', 'Brioche Bun', 'Buttery French bread roll', 'grains', 'bread', '{"gluten": true, "wheat": true, "egg": true, "milk": true}', '{"vegetarian": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PUFF_PASTRY', 'puff-pastry', 'Puff Pastry', 'Laminated butter pastry', 'grains', 'pastry', '{"gluten": true, "wheat": true, "milk": true}', '{"vegetarian": true}', '{}', 0, true, false, 'frozen')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PANKO', 'panko', 'Panko Breadcrumbs', 'Japanese crispy breadcrumbs', 'grains', 'breadcrumbs', '{"gluten": true, "wheat": true}', '{"vegetarian": true, "vegan": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_TEMPURA_FLOUR', 'tempura-flour', 'Tempura Flour', 'Light Japanese batter mix', 'grains', 'flour', '{"gluten": true, "wheat": true}', '{"vegetarian": true, "vegan": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CORNSTARCH', 'cornstarch', 'Cornstarch', 'Corn-based thickening agent', 'grains', 'flour', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ROUX', 'roux', 'Roux', 'Butter and flour thickener base', 'grains', 'flour', '{"gluten": true, "wheat": true, "milk": true}', '{"vegetarian": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- VEGETABLES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_POTATOES', 'potatoes', 'Potatoes', 'Russet or Yukon Gold potatoes', 'vegetables', 'root', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_MUSHROOMS', 'mushrooms', 'Mushrooms', 'Button, cremini, or mixed mushrooms', 'vegetables', 'fungus', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_FENNEL', 'fennel', 'Fennel', 'Anise-flavored bulb vegetable', 'vegetables', 'bulb', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_OKRA', 'okra', 'Okra', 'Southern vegetable, thickens gumbo', 'vegetables', 'pod', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_OLIVES', 'olives', 'Olives', 'Green or black olives', 'vegetables', 'fruit', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_TOMATOES', 'tomatoes', 'Tomatoes', 'Fresh ripe tomatoes', 'vegetables', 'fruit', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SHALLOTS', 'shallots', 'Shallots', 'Mild, sweet onion variety', 'vegetables', 'allium', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ORANGE', 'orange', 'Orange', 'Fresh orange fruit', 'fruits', 'citrus', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ORANGE_PEEL', 'orange-peel', 'Orange Peel', 'Citrus zest for flavoring', 'fruits', 'citrus', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_LEMON', 'lemon', 'Lemon', 'Fresh whole lemon', 'fruits', 'citrus', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- HERBS & SEASONINGS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_DILL', 'dill', 'Dill', 'Fresh dill herb, feathery leaves', 'herbs', 'fresh-herbs', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_HERBS', 'herbs', 'Mixed Herbs', 'Assorted fresh herbs', 'herbs', 'fresh-herbs', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_HERBS_PROVENCE', 'herbs-de-provence', 'Herbs de Provence', 'French herb blend: thyme, rosemary, lavender', 'herbs', 'dried-herbs', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_GALANGAL', 'galangal', 'Galangal', 'Southeast Asian ginger-like root', 'herbs', 'roots', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 1, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- SPICES & SEASONINGS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SAFFRON', 'saffron', 'Saffron', 'Precious spice from crocus flowers', 'spices', 'exotic', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, true, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CAJUN_SPICE', 'cajun-spice', 'Cajun Spice Blend', 'Louisiana spice mix with paprika and cayenne', 'spices', 'blends', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 3, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_OLD_BAY', 'old-bay', 'Old Bay Seasoning', 'Maryland seafood spice blend', 'spices', 'blends', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 1, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CAYENNE', 'cayenne', 'Cayenne Pepper', 'Hot red chili powder', 'spices', 'chili', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 4, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PINK_PEPPERCORN', 'pink-peppercorn', 'Pink Peppercorn', 'Delicate pink berries with fruity flavor', 'spices', 'pepper', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 1, false, true, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SICHUAN_PEPPER', 'sichuan-pepper', 'Sichuan Pepper', 'Numbing Chinese peppercorn', 'spices', 'pepper', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 2, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_DRIED_PEPPERS', 'dried-peppers', 'Dried Peppers', 'Dried chili peppers', 'spices', 'chili', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 2, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

-- CHILIES
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CHILI', 'chili', 'Chili Pepper', 'Fresh red or green chili', 'vegetables', 'chili', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 3, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SERRANO', 'serrano-pepper', 'Serrano Pepper', 'Mexican hot green pepper', 'vegetables', 'chili', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 4, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_AJI_AMARILLO', 'aji-amarillo', 'Aji Amarillo', 'Peruvian yellow chili pepper', 'vegetables', 'chili', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 3, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- SAUCES & CONDIMENTS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_FISH_SAUCE', 'fish-sauce', 'Fish Sauce', 'Fermented fish condiment (nuoc mam)', 'sauces', 'asian', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_FISH_STOCK', 'fish-stock', 'Fish Stock', 'Broth made from fish bones', 'sauces', 'stock', '{"fish": true}', '{"pescatarian": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_GREEN_CURRY_PASTE', 'green-curry-paste', 'Green Curry Paste', 'Thai green curry base', 'sauces', 'asian', '{"fish": true}', '{"gluten_free": true, "dairy_free": true}', '{}', 3, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CHILI_SAUCE', 'chili-sauce', 'Chili Sauce', 'Sweet and spicy chili sauce', 'sauces', 'asian', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 2, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_MUSTARD', 'mustard', 'Mustard', 'Dijon or yellow mustard', 'sauces', 'condiments', '{"mustard": true}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 1, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_WHITE_MISO', 'white-miso', 'White Miso', 'Japanese fermented soybean paste, mild', 'sauces', 'asian', '{"soy": true}', '{"vegetarian": true, "vegan": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- ALCOHOL & SPIRITS
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_BEER', 'beer', 'Beer', 'Lager or ale for cooking', 'beers', 'lager', '{"gluten": true}', '{"vegetarian": true, "vegan": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SAKE', 'sake', 'Sake', 'Japanese rice wine', 'wines', 'rice-wine', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'room_temp')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_PERNOD', 'pernod', 'Pernod', 'Anise-flavored French liqueur', 'liqueurs', 'anise', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, false, true, 'room_temp')
ON CONFLICT DO NOTHING;

-- MEAT (for mixed dishes)
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_SAUSAGE', 'sausage', 'Sausage', 'Pork or mixed meat sausage', 'proteins', 'pork', '{}', '{"gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_CHOURICO', 'chourico', 'Chourico', 'Portuguese smoked sausage', 'proteins', 'pork', '{}', '{"gluten_free": true, "dairy_free": true}', '{}', 1, false, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- OTHER
INSERT INTO ingredients (id, slug, name, description, category, subcategory, allergens, dietary, nutrition, spice_level, is_common, is_premium, storage_temp)
VALUES
('ING_ICE_WATER', 'ice-water', 'Ice Water', 'Very cold water for batter', 'other', 'water', '{}', '{"vegetarian": true, "vegan": true, "gluten_free": true, "dairy_free": true}', '{}', 0, true, false, 'refrigerated')
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION QUERY
-- Run after import to verify
-- ============================================
-- SELECT COUNT(*) FROM ingredients WHERE id LIKE 'ING_%' AND id IN (
--   'ING_SALMON', 'ING_SHRIMP', 'ING_LOBSTER', 'ING_CRAB', 'ING_MUSSELS',
--   'ING_CLAMS', 'ING_OYSTERS', 'ING_SCALLOPS', 'ING_SQUID', 'ING_OCTOPUS',
--   'ING_BRANZINO', 'ING_COD', 'ING_TUNA', 'ING_SWORDFISH', 'ING_HALIBUT'
-- );
