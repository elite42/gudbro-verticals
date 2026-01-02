-- ============================================
-- Peruvian Missing Ingredients
-- GUDBRO Database Standards v1.2
-- VALID CATEGORIES: beers, bread, dairy, eggs, fruits, grains, herbs,
--                   juices, liqueurs, mixers, pasta, proteins, rice,
--                   spices, spirits, vegetables, wines, other, nuts,
--                   sweeteners, oils, condiments, legumes, powders
-- ============================================

-- === PERUVIAN CHILES & PEPPERS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_AJI_AMARILLO', 'aji-amarillo', 'Aji Amarillo', 'Peruvian yellow pepper, fruity and medium-hot', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_AJI_PANCA', 'aji-panca', 'Aji Panca', 'Dried Peruvian red pepper, mild and smoky', 'spices', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_AJI_LIMO', 'aji-limo', 'Aji Limo', 'Small citrusy Peruvian pepper, very hot', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_AJI_ROCOTO', 'aji-rocoto', 'Aji Rocoto', 'Apple-shaped Peruvian pepper, extremely hot', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_AJI_MIRASOL', 'aji-mirasol', 'Aji Mirasol', 'Dried aji amarillo, fruity and medium-hot', 'spices', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_AJI_CHARAPITA', 'aji-charapita', 'Aji Charapita', 'Tiny Amazonian pepper, fruity and very hot', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN POTATOES & TUBERS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_PAPA_AMARILLA', 'papa-amarilla', 'Papa Amarilla', 'Yellow Peruvian potato, creamy and rich', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_PAPA_SECA', 'papa-seca', 'Papa Seca', 'Sun-dried potato, traditional preservation method', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CAMOTE', 'camote', 'Camote', 'Peruvian sweet potato, served with ceviches', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_YUCA', 'yuca', 'Yuca', 'Cassava, starchy root vegetable', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CHUNO', 'chuno', 'Chuno', 'Freeze-dried potato, Andean preservation method', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_OLLUCO', 'olluco', 'Olluco', 'Colorful Andean tuber, waxy texture', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN CORN VARIETIES ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_CHOCLO', 'choclo', 'Choclo', 'Peruvian giant white corn, large kernels', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CANCHA', 'cancha', 'Cancha', 'Toasted corn kernels, crunchy ceviche accompaniment', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_MOTE', 'mote', 'Mote', 'Large hominy corn, Andean staple', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_MAIZ_MORADO', 'maiz-morado', 'Maiz Morado', 'Purple corn for chicha morada', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CORN_MASA', 'corn-masa', 'Corn Masa', 'Corn dough for tamales', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_JORA_CORN', 'jora-corn', 'Jora Corn', 'Fermented corn for chicha de jora', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN HERBS & SEASONINGS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_HUACATAY', 'huacatay', 'Huacatay', 'Black mint, unique Peruvian herb', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CULANTRO', 'culantro', 'Culantro', 'Long-leaf coriander, stronger than cilantro', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CHINCHO', 'chincho', 'Chincho', 'Peruvian herb for pachamanca', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_SACHA_CULANTRO', 'sacha-culantro', 'Sacha Culantro', 'Amazonian culantro variety', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN BEVERAGES & LIQUIDS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_CHICHA_JORA', 'chicha-de-jora', 'Chicha de Jora', 'Fermented corn beer for cooking', 'spirits', '["alcohol"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_PISCO', 'pisco', 'Pisco', 'Peruvian grape brandy', 'spirits', '["alcohol"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_LECHE_TIGRE', 'leche-de-tigre', 'Leche de Tigre', 'Tigers milk ceviche marinade', 'other', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_INCA_KOLA', 'inca-kola', 'Inca Kola', 'Peruvian golden soda', 'other', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CHICHA_MORADA', 'chicha-morada-drink', 'Chicha Morada', 'Purple corn beverage', 'juices', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN SEAFOOD ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_CORVINA', 'corvina', 'Corvina', 'Sea bass, Perus favorite ceviche fish', 'proteins', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_LENGUADO', 'lenguado', 'Lenguado', 'Sole/flounder for tiraditos', 'proteins', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CONCHAS_NEGRAS', 'conchas-negras', 'Conchas Negras', 'Black clams from northern Peru', 'proteins', '["shellfish", "molluscs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_DONCELLA', 'doncella', 'Doncella', 'Amazonian catfish', 'proteins', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CHOROS', 'choros', 'Choros', 'Peruvian mussels', 'proteins', '["shellfish", "molluscs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CRAB_MEAT', 'crab-meat', 'Crab Meat', 'Fresh crab meat', 'proteins', '["shellfish", "crustaceans"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN MEATS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_CUY', 'cuy', 'Cuy', 'Guinea pig, Andean delicacy', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_ALPACA', 'alpaca', 'Alpaca', 'Lean Andean camelid meat', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_ALPACA_HEART', 'alpaca-heart', 'Alpaca Heart', 'Heart of alpaca for anticuchos', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CHARQUI', 'charqui', 'Charqui', 'Andean dried jerky, llama or beef', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CECINA', 'cecina', 'Cecina', 'Amazonian smoked pork', 'proteins', '["pork"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_BEEF_HEART', 'beef-heart', 'Beef Heart', 'Heart for anticuchos', 'proteins', '["beef"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_BEEF_TRIPE', 'beef-tripe', 'Beef Tripe', 'Stomach lining for rachi', 'proteins', '["beef"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_BEEF_INTESTINE', 'beef-intestine', 'Beef Intestine', 'Small intestine for choncholines', 'proteins', '["beef"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CHICKEN_BLOOD', 'chicken-blood', 'Chicken Blood', 'Blood for sangrecita', 'proteins', '["chicken"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_HEN', 'hen', 'Hen', 'Mature chicken for caldo de gallina', 'proteins', '["chicken"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CHAR_SIU', 'char-siu', 'Char Siu', 'Chinese roast pork for Chifa', 'proteins', '["pork"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_CHORIZO_AMAZONICO', 'chorizo-amazonico', 'Chorizo Amazonico', 'Amazonian pork sausage', 'proteins', '["pork"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN FRUITS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_LUCUMA', 'lucuma', 'Lucuma', 'Peruvian superfruit, caramel-like flavor', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CHIRIMOYA', 'chirimoya', 'Chirimoya', 'Custard apple', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_MARACUYA', 'maracuya', 'Maracuya', 'Passion fruit', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CAMU_CAMU', 'camu-camu', 'Camu Camu', 'Amazonian superfruit, highest vitamin C', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_AGUAYMANTO', 'aguaymanto', 'Aguaymanto', 'Peruvian golden berry', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_COCONA', 'cocona', 'Cocona', 'Amazonian tomato-like fruit', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_QUINCE', 'quince', 'Quince', 'Membrillo for mazamorra morada', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_DRIED_PEACH', 'dried-peach', 'Dried Peach', 'Orejones for mazamorra', 'fruits', '["peach"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_DRIED_APRICOT', 'dried-apricot', 'Dried Apricot', 'For mazamorra morada', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN GRAINS & SEEDS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_QUINOA', 'quinoa', 'Quinoa', 'Andean super grain', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_KIWICHA', 'kiwicha', 'Kiwicha', 'Amaranth, Andean grain', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_TARWI', 'tarwi', 'Tarwi', 'Andean lupin bean', 'legumes', '["lupin"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN DAIRY ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_QUESO_FRESCO', 'queso-fresco', 'Queso Fresco', 'Fresh white cheese', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_EVAPORATED_MILK', 'evaporated-milk', 'Evaporated Milk', 'Leche evaporada, Peruvian staple', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CONDENSED_MILK', 'condensed-milk', 'Condensed Milk', 'Sweetened condensed milk', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === PERUVIAN SYRUPS & SWEETENERS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_CHANCACA', 'chancaca', 'Chancaca', 'Unrefined cane sugar block', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_ALGARROBINA', 'algarrobina', 'Algarrobina', 'Carob tree syrup', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_GUM_SYRUP', 'gum-syrup', 'Gum Syrup', 'Gomme syrup for cocktails', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === CHIFA INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_CHOW_MEIN_NOODLES', 'chow-mein-noodles', 'Chow Mein Noodles', 'Chinese egg noodles for Chifa', 'pasta', '["gluten", "eggs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_WONTON_WRAPPERS', 'wonton-wrappers', 'Wonton Wrappers', 'Thin dough for wontons', 'pasta', '["gluten"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_BOK_CHOY', 'bok-choy', 'Bok Choy', 'Chinese cabbage', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_BEAN_SPROUTS', 'bean-sprouts', 'Bean Sprouts', 'Mung bean sprouts', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_OYSTER_SAUCE', 'oyster-sauce', 'Oyster Sauce', 'Chinese oyster sauce', 'condiments', '["shellfish", "molluscs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_TAMARIND', 'tamarind', 'Tamarind', 'Sour tropical fruit paste', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === NIKKEI INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_PONZU', 'ponzu', 'Ponzu', 'Citrus soy sauce', 'condiments', '["soybeans"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_YUZU_KOSHO', 'yuzu-kosho', 'Yuzu Kosho', 'Japanese citrus chili paste', 'spices', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_TOBIKO', 'tobiko', 'Tobiko', 'Flying fish roe', 'proteins', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_GARLIC_CHIPS', 'garlic-chips', 'Garlic Chips', 'Crispy fried garlic slices', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_SUSHI_RICE', 'sushi-rice', 'Sushi Rice', 'Japanese short-grain rice', 'rice', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_GYOZA_WRAPPERS', 'gyoza-wrappers', 'Gyoza Wrappers', 'Thin dumpling wrappers', 'pasta', '["gluten"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_RAMEN_NOODLES', 'ramen-noodles', 'Ramen Noodles', 'Japanese wheat noodles', 'pasta', '["gluten"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_PORK_STOCK', 'pork-stock', 'Pork Stock', 'Rich pork bone broth', 'proteins', '["pork"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_MICROGREENS', 'microgreens', 'Microgreens', 'Baby vegetable shoots', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_TRUFFLE_OIL', 'truffle-oil', 'Truffle Oil', 'Aromatic truffle-infused oil', 'oils', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === AMAZONIAN INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_BIJAO_LEAVES', 'bijao-leaves', 'Bijao Leaves', 'Amazonian wrapping leaves', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_SURI', 'suri', 'Suri', 'Palm weevil larvae, Amazonian protein', 'proteins', '[]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_PLANTAIN', 'plantain', 'Plantain', 'Cooking banana', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_PORK_LARD', 'pork-lard', 'Pork Lard', 'Rendered pork fat', 'oils', '["pork"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === ANDEAN INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_FAVA_BEANS', 'fava-beans', 'Fava Beans', 'Habas, Andean beans', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CANARIO_BEANS', 'canario-beans', 'Canario Beans', 'Peruvian yellow beans', 'legumes', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_TROUT', 'trout', 'Trout', 'Rainbow trout from Andean lakes', 'proteins', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_ZAPALLO', 'zapallo', 'Zapallo', 'Peruvian squash', 'vegetables', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === COCKTAIL INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_EGG_WHITE', 'egg-white', 'Egg White', 'For pisco sour foam', 'eggs', '["eggs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_EGG_YOLKS', 'egg-yolks', 'Egg Yolks', 'For desserts and cocktails', 'eggs', '["eggs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_SIMPLE_SYRUP', 'simple-syrup', 'Simple Syrup', 'Sugar syrup', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_ANGOSTURA_BITTERS', 'angostura-bitters', 'Angostura Bitters', 'Aromatic cocktail bitters', 'spirits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_GINGER_ALE', 'ginger-ale', 'Ginger Ale', 'Carbonated ginger drink', 'mixers', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_SWEET_VERMOUTH', 'sweet-vermouth', 'Sweet Vermouth', 'Fortified aromatic wine', 'wines', '["alcohol", "sulphites"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_PORT_WINE', 'port-wine', 'Port Wine', 'Fortified wine for suspiro', 'wines', '["alcohol", "sulphites"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CHERRY', 'cherry', 'Cherry', 'Maraschino cherry garnish', 'fruits', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === HERBAL DRINK INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_BARLEY', 'barley', 'Barley', 'Cebada for emoliente', 'grains', '["gluten"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_FLAXSEED', 'flaxseed', 'Flaxseed', 'Linaza for emoliente', 'grains', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_ALFALFA', 'alfalfa', 'Alfalfa', 'Medicinal herb for emoliente', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_HORSETAIL', 'horsetail', 'Horsetail', 'Cola de caballo herb', 'herbs', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === OTHER INGREDIENTS ===
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_FISH_HEAD', 'fish-head', 'Fish Head', 'For chilcano broth', 'proteins', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_FISH_BONES', 'fish-bones', 'Fish Bones', 'For fish stock', 'proteins', '["fish"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_AJI_AMARILLO_SAUCE', 'aji-amarillo-sauce', 'Aji Amarillo Sauce', 'Prepared aji sauce', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_HOT_DOG', 'hot-dog', 'Hot Dog', 'Frankfurt sausage', 'proteins', '["pork"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_SPRINKLES', 'sprinkles', 'Sprinkles', 'Grajeas for turron', 'sweeteners', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_BREAD_ROLL', 'bread-roll', 'Bread Roll', 'Pan frances for sandwiches', 'bread', '["gluten"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_WHEAT', 'wheat', 'Wheat', 'Trigo for shambar', 'grains', '["gluten", "wheat"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb),
  ('ING_HAM_HOCK', 'ham-hock', 'Ham Hock', 'Pork knuckle for soups', 'proteins', '["pork"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb),
  ('ING_TARTAR_SAUCE', 'tartar-sauce', 'Tartar Sauce', 'Mayonnaise-based sauce', 'condiments', '["eggs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CHIMICHURRI', 'chimichurri', 'Chimichurri', 'Argentine herb sauce', 'condiments', '[]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_CREAM', 'cream', 'Cream', 'Heavy cream', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_DULCE_DE_LECHE', 'dulce-de-leche', 'Dulce de Leche', 'Caramelized milk spread', 'dairy', '["milk"]'::jsonb, '["lactose"]'::jsonb, '{"vegan": false, "vegetarian": true, "gluten_free": true}'::jsonb),
  ('ING_SCALLOPS', 'scallops', 'Scallops', 'Sea scallops', 'proteins', '["shellfish", "molluscs"]'::jsonb, '[]'::jsonb, '{"vegan": false, "vegetarian": false, "gluten_free": true}'::jsonb)
ON CONFLICT DO NOTHING;

-- === MISSING INGREDIENTS (discovered during import) ===
-- NOTE: ING_BOILED_EGG already exists, removed duplicate ING_HARD_BOILED_EGG
INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
  ('ING_NOODLES', 'noodles', 'Noodles', 'Asian wheat noodles', 'pasta', '["gluten"]'::jsonb, '[]'::jsonb, '{"vegan": true, "vegetarian": true, "gluten_free": false}'::jsonb)
ON CONFLICT DO NOTHING;
