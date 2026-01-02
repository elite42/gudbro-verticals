-- ============================================
-- BAKERY - Product Ingredients Junction
-- GUDBRO Database Standards v1.3
-- ============================================

-- Insert product-ingredient relationships
-- Using ON CONFLICT DO NOTHING for safety

INSERT INTO product_ingredients (product_type, product_id, ingredient_id) VALUES

-- =====================
-- PASTRIES
-- =====================

-- Croissant (7 ingredients)
('bakery', 'BAK_CROISSANT', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_CROISSANT', 'ING_CROISSANT_BUTTER'),
('bakery', 'BAK_CROISSANT', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_CROISSANT', 'ING_SUGAR'),
('bakery', 'BAK_CROISSANT', 'ING_SALT'),
('bakery', 'BAK_CROISSANT', 'ING_MILK'),
('bakery', 'BAK_CROISSANT', 'ING_EGG'),

-- Pain au Chocolat (6 ingredients)
('bakery', 'BAK_PAIN_AU_CHOCOLAT', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_PAIN_AU_CHOCOLAT', 'ING_CROISSANT_BUTTER'),
('bakery', 'BAK_PAIN_AU_CHOCOLAT', 'ING_DARK_CHOCOLATE'),
('bakery', 'BAK_PAIN_AU_CHOCOLAT', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_PAIN_AU_CHOCOLAT', 'ING_SUGAR'),
('bakery', 'BAK_PAIN_AU_CHOCOLAT', 'ING_EGG'),

-- Almond Croissant (5 ingredients)
('bakery', 'BAK_ALMOND_CROISSANT', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_ALMOND_CROISSANT', 'ING_CROISSANT_BUTTER'),
('bakery', 'BAK_ALMOND_CROISSANT', 'ING_FRANGIPANE'),
('bakery', 'BAK_ALMOND_CROISSANT', 'ING_SLICED_ALMONDS'),
('bakery', 'BAK_ALMOND_CROISSANT', 'ING_POWDERED_SUGAR'),

-- Danish (5 ingredients)
('bakery', 'BAK_DANISH', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_DANISH', 'ING_BUTTER'),
('bakery', 'BAK_DANISH', 'ING_PASTRY_CREAM'),
('bakery', 'BAK_DANISH', 'ING_BLUEBERRY'),
('bakery', 'BAK_DANISH', 'ING_EGG'),

-- Palmier (3 ingredients)
('bakery', 'BAK_PALMIER', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_PALMIER', 'ING_BUTTER'),
('bakery', 'BAK_PALMIER', 'ING_SUGAR'),

-- Éclair (5 ingredients)
('bakery', 'BAK_ECLAIR', 'ING_FLOUR'),
('bakery', 'BAK_ECLAIR', 'ING_BUTTER'),
('bakery', 'BAK_ECLAIR', 'ING_EGG'),
('bakery', 'BAK_ECLAIR', 'ING_PASTRY_CREAM'),
('bakery', 'BAK_ECLAIR', 'ING_DARK_CHOCOLATE'),

-- Profiterole (5 ingredients)
('bakery', 'BAK_PROFITEROLE', 'ING_FLOUR'),
('bakery', 'BAK_PROFITEROLE', 'ING_BUTTER'),
('bakery', 'BAK_PROFITEROLE', 'ING_EGG'),
('bakery', 'BAK_PROFITEROLE', 'ING_HEAVY_CREAM'),
('bakery', 'BAK_PROFITEROLE', 'ING_DARK_CHOCOLATE'),

-- Cannoli (5 ingredients)
('bakery', 'BAK_CANNOLI', 'ING_FLOUR'),
('bakery', 'BAK_CANNOLI', 'ING_RICOTTA'),
('bakery', 'BAK_CANNOLI', 'ING_POWDERED_SUGAR'),
('bakery', 'BAK_CANNOLI', 'ING_CHOCOLATE_CHIP'),
('bakery', 'BAK_CANNOLI', 'ING_CANDIED_FRUIT'),

-- Apple Strudel (6 ingredients)
('bakery', 'BAK_STRUDEL', 'ING_FLOUR'),
('bakery', 'BAK_STRUDEL', 'ING_APPLE'),
('bakery', 'BAK_STRUDEL', 'ING_RAISIN'),
('bakery', 'BAK_STRUDEL', 'ING_CINNAMON'),
('bakery', 'BAK_STRUDEL', 'ING_SUGAR'),
('bakery', 'BAK_STRUDEL', 'ING_BUTTER'),

-- =====================
-- BREADS
-- =====================

-- Baguette (4 ingredients)
('bakery', 'BAK_BAGUETTE', 'ING_BREAD_FLOUR'),
('bakery', 'BAK_BAGUETTE', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_BAGUETTE', 'ING_SALT'),
('bakery', 'BAK_BAGUETTE', 'ING_WATER'),

-- Sourdough (4 ingredients)
('bakery', 'BAK_SOURDOUGH', 'ING_BREAD_FLOUR'),
('bakery', 'BAK_SOURDOUGH', 'ING_SOURDOUGH_STARTER'),
('bakery', 'BAK_SOURDOUGH', 'ING_SALT'),
('bakery', 'BAK_SOURDOUGH', 'ING_WATER'),

-- Brioche (6 ingredients)
('bakery', 'BAK_BRIOCHE', 'ING_BREAD_FLOUR'),
('bakery', 'BAK_BRIOCHE', 'ING_BUTTER'),
('bakery', 'BAK_BRIOCHE', 'ING_EGG'),
('bakery', 'BAK_BRIOCHE', 'ING_SUGAR'),
('bakery', 'BAK_BRIOCHE', 'ING_MILK'),
('bakery', 'BAK_BRIOCHE', 'ING_ACTIVE_YEAST'),

-- Ciabatta (5 ingredients)
('bakery', 'BAK_CIABATTA', 'ING_BREAD_FLOUR'),
('bakery', 'BAK_CIABATTA', 'ING_OLIVE_OIL'),
('bakery', 'BAK_CIABATTA', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_CIABATTA', 'ING_SALT'),
('bakery', 'BAK_CIABATTA', 'ING_WATER'),

-- Focaccia (5 ingredients)
('bakery', 'BAK_FOCACCIA', 'ING_BREAD_FLOUR'),
('bakery', 'BAK_FOCACCIA', 'ING_OLIVE_OIL'),
('bakery', 'BAK_FOCACCIA', 'ING_ROSEMARY'),
('bakery', 'BAK_FOCACCIA', 'ING_SALT'),
('bakery', 'BAK_FOCACCIA', 'ING_ACTIVE_YEAST'),

-- Pretzel (5 ingredients)
('bakery', 'BAK_PRETZEL', 'ING_BREAD_FLOUR'),
('bakery', 'BAK_PRETZEL', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_PRETZEL', 'ING_BUTTER'),
('bakery', 'BAK_PRETZEL', 'ING_SALT'),
('bakery', 'BAK_PRETZEL', 'ING_BAKING_SODA'),

-- Challah (5 ingredients)
('bakery', 'BAK_CHALLAH', 'ING_BREAD_FLOUR'),
('bakery', 'BAK_CHALLAH', 'ING_EGG'),
('bakery', 'BAK_CHALLAH', 'ING_HONEY'),
('bakery', 'BAK_CHALLAH', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_CHALLAH', 'ING_VEGETABLE_OIL'),

-- =====================
-- COOKIES
-- =====================

-- Chocolate Chip Cookie (6 ingredients)
('bakery', 'BAK_CHOCOLATE_CHIP_COOKIE', 'ING_FLOUR'),
('bakery', 'BAK_CHOCOLATE_CHIP_COOKIE', 'ING_BUTTER'),
('bakery', 'BAK_CHOCOLATE_CHIP_COOKIE', 'ING_BROWN_SUGAR'),
('bakery', 'BAK_CHOCOLATE_CHIP_COOKIE', 'ING_CHOCOLATE_CHIP'),
('bakery', 'BAK_CHOCOLATE_CHIP_COOKIE', 'ING_EGG'),
('bakery', 'BAK_CHOCOLATE_CHIP_COOKIE', 'ING_VANILLA'),

-- Oatmeal Raisin Cookie (7 ingredients)
('bakery', 'BAK_OATMEAL_RAISIN', 'ING_FLOUR'),
('bakery', 'BAK_OATMEAL_RAISIN', 'ING_ROLLED_OAT'),
('bakery', 'BAK_OATMEAL_RAISIN', 'ING_BUTTER'),
('bakery', 'BAK_OATMEAL_RAISIN', 'ING_BROWN_SUGAR'),
('bakery', 'BAK_OATMEAL_RAISIN', 'ING_RAISIN'),
('bakery', 'BAK_OATMEAL_RAISIN', 'ING_CINNAMON'),
('bakery', 'BAK_OATMEAL_RAISIN', 'ING_EGG'),

-- Macaron (5 ingredients)
('bakery', 'BAK_MACARON', 'ING_ALMOND_FLOUR'),
('bakery', 'BAK_MACARON', 'ING_EGG'),
('bakery', 'BAK_MACARON', 'ING_POWDERED_SUGAR'),
('bakery', 'BAK_MACARON', 'ING_SUGAR'),
('bakery', 'BAK_MACARON', 'ING_HEAVY_CREAM'),

-- Shortbread (4 ingredients)
('bakery', 'BAK_SHORTBREAD', 'ING_FLOUR'),
('bakery', 'BAK_SHORTBREAD', 'ING_BUTTER'),
('bakery', 'BAK_SHORTBREAD', 'ING_SUGAR'),
('bakery', 'BAK_SHORTBREAD', 'ING_SALT'),

-- Biscotti (5 ingredients)
('bakery', 'BAK_BISCOTTI', 'ING_FLOUR'),
('bakery', 'BAK_BISCOTTI', 'ING_ALMOND'),
('bakery', 'BAK_BISCOTTI', 'ING_SUGAR'),
('bakery', 'BAK_BISCOTTI', 'ING_EGG'),
('bakery', 'BAK_BISCOTTI', 'ING_BAKING_POWDER'),

-- Snickerdoodle (6 ingredients)
('bakery', 'BAK_SNICKERDOODLE', 'ING_FLOUR'),
('bakery', 'BAK_SNICKERDOODLE', 'ING_BUTTER'),
('bakery', 'BAK_SNICKERDOODLE', 'ING_SUGAR'),
('bakery', 'BAK_SNICKERDOODLE', 'ING_CINNAMON'),
('bakery', 'BAK_SNICKERDOODLE', 'ING_EGG'),
('bakery', 'BAK_SNICKERDOODLE', 'ING_CREAM_OF_TARTAR'),

-- Brownie (6 ingredients)
('bakery', 'BAK_BROWNIE', 'ING_FLOUR'),
('bakery', 'BAK_BROWNIE', 'ING_BUTTER'),
('bakery', 'BAK_BROWNIE', 'ING_COCOA_POWDER'),
('bakery', 'BAK_BROWNIE', 'ING_DARK_CHOCOLATE'),
('bakery', 'BAK_BROWNIE', 'ING_SUGAR'),
('bakery', 'BAK_BROWNIE', 'ING_EGG'),

-- Madeline (6 ingredients)
('bakery', 'BAK_MADELINE', 'ING_FLOUR'),
('bakery', 'BAK_MADELINE', 'ING_BUTTER'),
('bakery', 'BAK_MADELINE', 'ING_EGG'),
('bakery', 'BAK_MADELINE', 'ING_SUGAR'),
('bakery', 'BAK_MADELINE', 'ING_LEMON_ZEST'),
('bakery', 'BAK_MADELINE', 'ING_HONEY'),

-- =====================
-- CAKES
-- =====================

-- Carrot Cake (7 ingredients)
('bakery', 'BAK_CARROT_CAKE', 'ING_FLOUR'),
('bakery', 'BAK_CARROT_CAKE', 'ING_CARROT'),
('bakery', 'BAK_CARROT_CAKE', 'ING_WALNUT'),
('bakery', 'BAK_CARROT_CAKE', 'ING_CREAM_CHEESE'),
('bakery', 'BAK_CARROT_CAKE', 'ING_CINNAMON'),
('bakery', 'BAK_CARROT_CAKE', 'ING_EGG'),
('bakery', 'BAK_CARROT_CAKE', 'ING_SUGAR'),

-- New York Cheesecake (6 ingredients)
('bakery', 'BAK_CHEESECAKE', 'ING_CREAM_CHEESE'),
('bakery', 'BAK_CHEESECAKE', 'ING_SUGAR'),
('bakery', 'BAK_CHEESECAKE', 'ING_EGG'),
('bakery', 'BAK_CHEESECAKE', 'ING_HEAVY_CREAM'),
('bakery', 'BAK_CHEESECAKE', 'ING_VANILLA'),
('bakery', 'BAK_CHEESECAKE', 'ING_COOKIE_CRUMB'),

-- Pound Cake (5 ingredients)
('bakery', 'BAK_POUND_CAKE', 'ING_FLOUR'),
('bakery', 'BAK_POUND_CAKE', 'ING_BUTTER'),
('bakery', 'BAK_POUND_CAKE', 'ING_SUGAR'),
('bakery', 'BAK_POUND_CAKE', 'ING_EGG'),
('bakery', 'BAK_POUND_CAKE', 'ING_VANILLA'),

-- Opera Cake (6 ingredients)
('bakery', 'BAK_OPERA_CAKE', 'ING_ALMOND_FLOUR'),
('bakery', 'BAK_OPERA_CAKE', 'ING_EGG'),
('bakery', 'BAK_OPERA_CAKE', 'ING_ESPRESSO'),
('bakery', 'BAK_OPERA_CAKE', 'ING_DARK_CHOCOLATE'),
('bakery', 'BAK_OPERA_CAKE', 'ING_BUTTER'),
('bakery', 'BAK_OPERA_CAKE', 'ING_SUGAR'),

-- Red Velvet (6 ingredients)
('bakery', 'BAK_RED_VELVET', 'ING_FLOUR'),
('bakery', 'BAK_RED_VELVET', 'ING_COCOA_POWDER'),
('bakery', 'BAK_RED_VELVET', 'ING_BUTTERMILK'),
('bakery', 'BAK_RED_VELVET', 'ING_CREAM_CHEESE'),
('bakery', 'BAK_RED_VELVET', 'ING_EGG'),
('bakery', 'BAK_RED_VELVET', 'ING_BUTTER'),

-- Tiramisu Cake (6 ingredients)
('bakery', 'BAK_TIRAMISU_CAKE', 'ING_FLOUR'),
('bakery', 'BAK_TIRAMISU_CAKE', 'ING_MASCARPONE'),
('bakery', 'BAK_TIRAMISU_CAKE', 'ING_ESPRESSO'),
('bakery', 'BAK_TIRAMISU_CAKE', 'ING_COCOA_POWDER'),
('bakery', 'BAK_TIRAMISU_CAKE', 'ING_EGG'),
('bakery', 'BAK_TIRAMISU_CAKE', 'ING_SUGAR'),

-- =====================
-- DONUTS
-- =====================

-- Glazed Donut (6 ingredients)
('bakery', 'BAK_GLAZED_DONUT', 'ING_FLOUR'),
('bakery', 'BAK_GLAZED_DONUT', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_GLAZED_DONUT', 'ING_SUGAR'),
('bakery', 'BAK_GLAZED_DONUT', 'ING_POWDERED_SUGAR'),
('bakery', 'BAK_GLAZED_DONUT', 'ING_MILK'),
('bakery', 'BAK_GLAZED_DONUT', 'ING_EGG'),

-- Chocolate Frosted Donut (6 ingredients)
('bakery', 'BAK_CHOCOLATE_DONUT', 'ING_FLOUR'),
('bakery', 'BAK_CHOCOLATE_DONUT', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_CHOCOLATE_DONUT', 'ING_DARK_CHOCOLATE'),
('bakery', 'BAK_CHOCOLATE_DONUT', 'ING_SUGAR'),
('bakery', 'BAK_CHOCOLATE_DONUT', 'ING_MILK'),
('bakery', 'BAK_CHOCOLATE_DONUT', 'ING_EGG'),

-- Boston Cream Donut (5 ingredients)
('bakery', 'BAK_BOSTON_CREAM', 'ING_FLOUR'),
('bakery', 'BAK_BOSTON_CREAM', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_BOSTON_CREAM', 'ING_PASTRY_CREAM'),
('bakery', 'BAK_BOSTON_CREAM', 'ING_DARK_CHOCOLATE'),
('bakery', 'BAK_BOSTON_CREAM', 'ING_EGG'),

-- Jelly Donut (5 ingredients)
('bakery', 'BAK_JELLY_DONUT', 'ING_FLOUR'),
('bakery', 'BAK_JELLY_DONUT', 'ING_ACTIVE_YEAST'),
('bakery', 'BAK_JELLY_DONUT', 'ING_JAM'),
('bakery', 'BAK_JELLY_DONUT', 'ING_POWDERED_SUGAR'),
('bakery', 'BAK_JELLY_DONUT', 'ING_EGG'),

-- French Cruller (5 ingredients)
('bakery', 'BAK_CRULLER', 'ING_FLOUR'),
('bakery', 'BAK_CRULLER', 'ING_BUTTER'),
('bakery', 'BAK_CRULLER', 'ING_EGG'),
('bakery', 'BAK_CRULLER', 'ING_POWDERED_SUGAR'),
('bakery', 'BAK_CRULLER', 'ING_VANILLA'),

-- Old Fashioned Donut (6 ingredients)
('bakery', 'BAK_OLD_FASHIONED', 'ING_FLOUR'),
('bakery', 'BAK_OLD_FASHIONED', 'ING_BAKING_POWDER'),
('bakery', 'BAK_OLD_FASHIONED', 'ING_BUTTERMILK'),
('bakery', 'BAK_OLD_FASHIONED', 'ING_SUGAR'),
('bakery', 'BAK_OLD_FASHIONED', 'ING_NUTMEG'),
('bakery', 'BAK_OLD_FASHIONED', 'ING_EGG'),

-- =====================
-- SAVORY
-- =====================

-- Ham & Cheese Croissant (5 ingredients)
('bakery', 'BAK_HAM_CHEESE_CROISSANT', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_HAM_CHEESE_CROISSANT', 'ING_CROISSANT_BUTTER'),
('bakery', 'BAK_HAM_CHEESE_CROISSANT', 'ING_HAM'),
('bakery', 'BAK_HAM_CHEESE_CROISSANT', 'ING_GRUYERE'),
('bakery', 'BAK_HAM_CHEESE_CROISSANT', 'ING_EGG'),

-- Spinach & Feta Croissant (5 ingredients)
('bakery', 'BAK_SPINACH_FETA_CROISSANT', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_SPINACH_FETA_CROISSANT', 'ING_CROISSANT_BUTTER'),
('bakery', 'BAK_SPINACH_FETA_CROISSANT', 'ING_SPINACH'),
('bakery', 'BAK_SPINACH_FETA_CROISSANT', 'ING_FETA'),
('bakery', 'BAK_SPINACH_FETA_CROISSANT', 'ING_EGG'),

-- Sausage Roll (5 ingredients)
('bakery', 'BAK_SAUSAGE_ROLL', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_SAUSAGE_ROLL', 'ING_BUTTER'),
('bakery', 'BAK_SAUSAGE_ROLL', 'ING_PORK'),
('bakery', 'BAK_SAUSAGE_ROLL', 'ING_SAGE'),
('bakery', 'BAK_SAUSAGE_ROLL', 'ING_EGG'),

-- Quiche Lorraine (6 ingredients)
('bakery', 'BAK_QUICHE', 'ING_FLOUR'),
('bakery', 'BAK_QUICHE', 'ING_BUTTER'),
('bakery', 'BAK_QUICHE', 'ING_BACON'),
('bakery', 'BAK_QUICHE', 'ING_GRUYERE'),
('bakery', 'BAK_QUICHE', 'ING_EGG'),
('bakery', 'BAK_QUICHE', 'ING_HEAVY_CREAM'),

-- Beef Empanada (6 ingredients)
('bakery', 'BAK_EMPANADA', 'ING_FLOUR'),
('bakery', 'BAK_EMPANADA', 'ING_BUTTER'),
('bakery', 'BAK_EMPANADA', 'ING_GROUND_BEEF'),
('bakery', 'BAK_EMPANADA', 'ING_ONION'),
('bakery', 'BAK_EMPANADA', 'ING_CUMIN'),
('bakery', 'BAK_EMPANADA', 'ING_EGG'),

-- Cheese Danish (6 ingredients)
('bakery', 'BAK_CHEESE_DANISH', 'ING_PASTRY_FLOUR'),
('bakery', 'BAK_CHEESE_DANISH', 'ING_BUTTER'),
('bakery', 'BAK_CHEESE_DANISH', 'ING_CREAM_CHEESE'),
('bakery', 'BAK_CHEESE_DANISH', 'ING_SUGAR'),
('bakery', 'BAK_CHEESE_DANISH', 'ING_EGG'),
('bakery', 'BAK_CHEESE_DANISH', 'ING_VANILLA')

ON CONFLICT DO NOTHING;
