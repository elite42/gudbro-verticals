-- ============================================
-- CARIBBEAN Missing Ingredients
-- GUDBRO Database Standards v1.3
-- JSONB format for allergens, intolerances, dietary
-- Total: 59 new ingredients for Caribbean cuisine
-- ============================================

-- Caribbean Vegetables & Roots
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_ACKEE', 'ackee', 'Ackee', 'Jamaica national fruit, cooked as savory dish when ripe', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_BREADFRUIT', 'breadfruit', 'Breadfruit', 'Starchy tropical fruit used as vegetable', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CALLALOO', 'callaloo', 'Callaloo', 'Caribbean leafy green similar to spinach', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CHAYOTE', 'chayote', 'Chayote', 'Mild squash-like vegetable, also called christophene or cho cho', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CHO_CHO', 'cho-cho', 'Cho Cho', 'Jamaican name for chayote squash', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_DASHEEN', 'dasheen', 'Dasheen', 'Caribbean taro root, starchy and creamy', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_GREEN_BANANA', 'green-banana', 'Green Banana', 'Unripe banana used as starchy vegetable', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_MALANGA', 'malanga', 'Malanga', 'Caribbean root vegetable similar to taro', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_YAM', 'yam', 'Yam', 'Starchy root vegetable, Caribbean variety', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_YAUTIA', 'yautia', 'Yautia', 'Caribbean root vegetable used in fritters', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Spices & Seasonings
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_ANISE', 'anise', 'Anise', 'Sweet aromatic spice with licorice flavor', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_ANNATTO', 'annatto', 'Annatto', 'Orange-red spice from achiote seeds', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CHADON_BENI', 'chadon-beni', 'Chadon Beni', 'Caribbean culantro, stronger than cilantro', 'herbs',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CLOVE', 'clove', 'Clove', 'Aromatic spice used in Caribbean cooking', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_COLOMBO_SPICE', 'colombo-spice', 'Colombo Spice', 'French Caribbean curry blend from Martinique', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_EPIS', 'epis', 'Epis', 'Haitian seasoning base with herbs, peppers, garlic', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_GREEN_SEASONING', 'green-seasoning', 'Green Seasoning', 'Trinidad herb blend with chadon beni and seasonings', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_PIMENTO', 'pimento', 'Pimento', 'Jamaican allspice from pimento tree', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_PIMIENTO', 'pimiento', 'Pimiento', 'Sweet red pepper, used in Puerto Rican cooking', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_SAZON', 'sazon', 'Sazon', 'Puerto Rican seasoning with annatto and spices', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_SOFRITO', 'sofrito', 'Sofrito', 'Puerto Rican aromatic cooking base with peppers and cilantro', 'spices',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Proteins
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_CONCH', 'conch', 'Conch', 'Large sea snail, Bahamas specialty', 'proteins',
 '["shellfish"]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_COW_HEEL', 'cow-heel', 'Cow Heel', 'Beef foot used in Caribbean soups', 'proteins',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_FLANK_STEAK', 'flank-steak', 'Flank Steak', 'Lean beef cut used for ropa vieja', 'proteins',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_FLYING_FISH', 'flying-fish', 'Flying Fish', 'Barbados national fish', 'proteins',
 '["fish"]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_GOAT', 'goat', 'Goat Meat', 'Lean meat popular in Caribbean curries', 'proteins',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_PORK_BLOOD', 'pork-blood', 'Pork Blood', 'Used in blood sausage and boudin', 'proteins',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_PORK_CRACKLING', 'pork-crackling', 'Pork Crackling', 'Crispy fried pork skin, chicharrones', 'proteins',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_RED_SNAPPER', 'red-snapper', 'Red Snapper', 'Caribbean reef fish, popular for frying', 'proteins',
 '["fish"]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_SALT_PORK', 'salt-pork', 'Salt Pork', 'Cured pork used for flavoring', 'proteins',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_SHARK', 'shark', 'Shark', 'Used in Trinidad bake and shark', 'proteins',
 '["fish"]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_SNAPPER', 'snapper', 'Snapper', 'Popular Caribbean fish variety', 'proteins',
 '["fish"]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Dairy & Cheese
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_EDAM_CHEESE', 'edam-cheese', 'Edam Cheese', 'Dutch cheese used in Curacao keshi yena', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_QUESO_FRITO', 'queso-frito', 'Queso Frito', 'Dominican fried cheese', 'dairy',
 '["dairy"]'::jsonb, '["lactose"]'::jsonb, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Beans & Legumes
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_BLACK_BEAN', 'black-bean', 'Black Beans', 'Cuban staple legume', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_BUTTER_BEANS', 'butter-beans', 'Butter Beans', 'Large lima beans', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CHICKPEA', 'chickpea', 'Chickpeas', 'Used in Trinidad doubles', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_LIMA_BEAN', 'lima-bean', 'Lima Beans', 'Used in Haitian diri djondjon', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_PIGEON_PEA', 'pigeon-pea', 'Pigeon Peas', 'Caribbean gungo peas', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_PINK_BEAN', 'pink-bean', 'Pink Beans', 'Puerto Rican habichuelas rosadas', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_SPLIT_PEA', 'split-pea', 'Split Peas', 'Used in Trinidad roti filling', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Fruits
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_GUAVA', 'guava', 'Guava', 'Tropical fruit for pastes and desserts', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_PRUNE', 'prune', 'Prunes', 'Dried plums for black cake', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_RAISIN', 'raisin', 'Raisins', 'Dried grapes for Caribbean desserts', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Spirits & Beverages
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_MOUNT_GAY_RUM', 'mount-gay-rum', 'Mount Gay Rum', 'Barbados premium rum', 'spirits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_RHUM_AGRICOLE', 'rhum-agricole', 'Rhum Agricole', 'Martinique sugarcane juice rum', 'spirits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_MAUBY_BARK', 'mauby-bark', 'Mauby Bark', 'Bark for traditional Caribbean drink', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_SEA_MOSS', 'sea-moss', 'Sea Moss', 'Irish moss seaweed for drinks', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_DJON_DJON', 'djon-djon', 'Djon Djon Mushrooms', 'Haitian black mushrooms', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Breads & Staples
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_CUBAN_BREAD', 'cuban-bread', 'Cuban Bread', 'White bread with lard for Cuban sandwiches', 'bread',
 '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": true, "is_gluten_free": false}'::jsonb),

('ING_BREADCRUMB', 'breadcrumb', 'Breadcrumbs', 'Ground bread for coating', 'bread',
 '["gluten"]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": false}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- Caribbean Condiments & Syrups
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
('ING_CANE_SYRUP', 'cane-syrup', 'Cane Syrup', 'Sugarcane syrup for ti punch', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_SUGAR_SYRUP', 'sugar-syrup', 'Sugar Syrup', 'Simple syrup for cocktails', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_PICKLE', 'pickle', 'Pickles', 'Pickled cucumber', 'vegetables',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CASHEW', 'cashew', 'Cashews', 'Tree nut used in Haitian poulet aux noix', 'other',
 '["tree_nuts"]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_CAPER', 'caper', 'Capers', 'Pickled flower buds', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_BARK', 'bark', 'Tree Bark', 'Bark for mamajuana and mauby', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb),

('ING_SOUSE', 'souse', 'Souse', 'Pickled pork preparation', 'proteins',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": false, "is_vegetarian": false, "is_gluten_free": true}'::jsonb),

('ING_WHITE_VINEGAR', 'white-vinegar', 'White Vinegar', 'Distilled vinegar for pickling', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true, "is_gluten_free": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;
