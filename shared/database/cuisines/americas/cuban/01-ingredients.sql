-- Cuban Cuisine - New Ingredients
-- GUDBRO Database Standards v1.7
-- Total: 8 new ingredients

INSERT INTO ingredients (id, name, slug, category, description) VALUES

-- Proteins & Meats
('ING_PORK_ROAST', 'Roast Pork (Lechon)', 'pork-roast', 'proteins', 'Slow-roasted pork shoulder or leg, Cuban style'),
('ING_TURKEY_BREAST', 'Turkey Breast', 'turkey-breast', 'proteins', 'Sliced roasted turkey breast meat'),

-- Fruits & Produce
('ING_GREEN_PLANTAIN', 'Green Plantain', 'green-plantain', 'vegetables', 'Unripe plantain, starchy and savory, used for tostones'),
('ING_RIPE_PLANTAIN', 'Ripe Plantain (Maduro)', 'ripe-plantain', 'vegetables', 'Fully ripe sweet plantain, yellow-black skin'),
('ING_MAMEY', 'Mamey Sapote', 'mamey', 'fruits', 'Tropical fruit with orange flesh, sweet and creamy'),

-- Breads
('ING_EGG_BREAD', 'Egg Bread (Pan de Medianoche)', 'egg-bread', 'grains', 'Soft sweet bread made with eggs, used for Medianoche sandwiches'),

-- Condiments
('ING_DILL_PICKLE', 'Dill Pickle', 'dill-pickle', 'vegetables', 'Pickled cucumber with dill, essential for Cuban sandwich'),
('ING_YELLOW_MUSTARD', 'Yellow Mustard', 'yellow-mustard', 'condiments', 'Classic American yellow mustard')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;
