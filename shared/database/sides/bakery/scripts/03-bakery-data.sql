-- ============================================
-- BAKERY Data Import
-- GUDBRO Database Standards v1.3
-- ============================================

INSERT INTO bakery (id, slug, name, description, category, status, base_type, flavor_profile, serving_size_g, serving_style, ingredient_ids, calories_per_serving, protein_g, carbs_g, fat_g, sugar_g, fiber_g, has_filling, has_frosting, is_freshly_baked, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- =====================
-- PASTRIES (French/Viennoiserie)
-- =====================
('BAK_CROISSANT', 'croissant', 'Butter Croissant', 'Flaky French pastry with layers of butter and laminated dough', 'pastry', 'classic', 'puff', 'buttery', 70, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_CROISSANT_BUTTER', 'ING_ACTIVE_YEAST', 'ING_SUGAR', 'ING_SALT', 'ING_MILK', 'ING_EGG'], 280, 5.0, 32.0, 15.0, 6.0, 1.0, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['french', 'breakfast', 'classic'], 95, 'France'),

('BAK_PAIN_AU_CHOCOLAT', 'pain-au-chocolat', 'Pain au Chocolat', 'Buttery croissant dough rolled with dark chocolate batons', 'pastry', 'classic', 'puff', 'chocolatey', 80, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_CROISSANT_BUTTER', 'ING_DARK_CHOCOLATE', 'ING_ACTIVE_YEAST', 'ING_SUGAR', 'ING_EGG'], 320, 5.0, 38.0, 17.0, 12.0, 2.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['french', 'chocolate', 'breakfast'], 92, 'France'),

('BAK_ALMOND_CROISSANT', 'almond-croissant', 'Almond Croissant', 'Croissant filled with frangipane and topped with sliced almonds', 'pastry', 'popular', 'puff', 'nutty', 100, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_CROISSANT_BUTTER', 'ING_FRANGIPANE', 'ING_SLICED_ALMONDS', 'ING_POWDERED_SUGAR'], 420, 8.0, 42.0, 24.0, 18.0, 2.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs', 'tree_nuts'], false, false, false, false, true, true, true, 0, ARRAY['french', 'almond', 'premium'], 88, 'France'),

('BAK_DANISH', 'danish-pastry', 'Danish Pastry', 'Layered pastry with vanilla cream and fresh berries', 'pastry', 'classic', 'puff', 'fruity', 90, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_BUTTER', 'ING_PASTRY_CREAM', 'ING_BLUEBERRY', 'ING_EGG'], 340, 5.0, 40.0, 18.0, 20.0, 1.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['danish', 'fruit', 'cream'], 82, 'Denmark'),

('BAK_PALMIER', 'palmier', 'Palmier', 'Caramelized puff pastry shaped like a heart or palm leaf', 'pastry', 'classic', 'puff', 'sweet', 50, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_BUTTER', 'ING_SUGAR'], 180, 2.0, 22.0, 10.0, 12.0, 0.5, false, false, true, ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 0, ARRAY['french', 'caramelized', 'simple'], 70, 'France'),

('BAK_ECLAIR', 'chocolate-eclair', 'Chocolate Éclair', 'Choux pastry filled with cream and topped with chocolate glaze', 'pastry', 'classic', 'choux', 'chocolatey', 100, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_PASTRY_CREAM', 'ING_DARK_CHOCOLATE'], 280, 6.0, 30.0, 16.0, 18.0, 1.0, true, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['french', 'chocolate', 'choux'], 85, 'France'),

('BAK_PROFITEROLE', 'profiterole', 'Profiterole', 'Small choux puff filled with cream and drizzled with chocolate', 'pastry', 'classic', 'choux', 'chocolatey', 40, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_HEAVY_CREAM', 'ING_DARK_CHOCOLATE'], 150, 3.0, 14.0, 10.0, 8.0, 0.5, true, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['french', 'cream', 'bite-sized'], 78, 'France'),

('BAK_CANNOLI', 'cannoli', 'Cannoli', 'Crispy Sicilian tube filled with sweet ricotta and chocolate chips', 'pastry', 'classic', 'shortcrust', 'sweet', 80, 'individual', ARRAY['ING_FLOUR', 'ING_RICOTTA', 'ING_POWDERED_SUGAR', 'ING_CHOCOLATE_CHIP', 'ING_CANDIED_FRUIT'], 290, 7.0, 32.0, 15.0, 20.0, 1.0, true, false, true, ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 0, ARRAY['italian', 'sicilian', 'ricotta'], 84, 'Italy'),

('BAK_STRUDEL', 'apple-strudel', 'Apple Strudel', 'Austrian pastry with spiced apple filling wrapped in thin dough', 'pastry', 'classic', 'puff', 'fruity', 120, 'slice', ARRAY['ING_FLOUR', 'ING_APPLE', 'ING_RAISIN', 'ING_CINNAMON', 'ING_SUGAR', 'ING_BUTTER'], 260, 3.0, 42.0, 10.0, 26.0, 2.0, true, false, true, ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 0, ARRAY['austrian', 'apple', 'cinnamon'], 75, 'Austria'),

-- =====================
-- BREADS
-- =====================
('BAK_BAGUETTE', 'baguette', 'French Baguette', 'Classic French bread with crispy crust and airy interior', 'bread', 'classic', 'yeast', 'savory', 100, 'whole', ARRAY['ING_BREAD_FLOUR', 'ING_ACTIVE_YEAST', 'ING_SALT', 'ING_WATER'], 260, 9.0, 52.0, 1.0, 2.0, 2.0, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['french', 'artisan', 'crusty'], 90, 'France'),

('BAK_SOURDOUGH', 'sourdough-loaf', 'Sourdough Bread', 'Naturally leavened bread with tangy flavor and chewy texture', 'bread', 'popular', 'sourdough', 'savory', 80, 'slice', ARRAY['ING_BREAD_FLOUR', 'ING_SOURDOUGH_STARTER', 'ING_SALT', 'ING_WATER'], 180, 7.0, 36.0, 1.0, 1.0, 2.0, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['artisan', 'fermented', 'tangy'], 88, 'USA'),

('BAK_BRIOCHE', 'brioche', 'Brioche', 'Rich French bread enriched with butter and eggs', 'bread', 'classic', 'brioche', 'buttery', 60, 'slice', ARRAY['ING_BREAD_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_SUGAR', 'ING_MILK', 'ING_ACTIVE_YEAST'], 220, 5.0, 28.0, 10.0, 8.0, 1.0, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['french', 'enriched', 'soft'], 82, 'France'),

('BAK_CIABATTA', 'ciabatta', 'Ciabatta', 'Italian bread with open crumb and olive oil flavor', 'bread', 'classic', 'yeast', 'savory', 100, 'whole', ARRAY['ING_BREAD_FLOUR', 'ING_OLIVE_OIL', 'ING_ACTIVE_YEAST', 'ING_SALT', 'ING_WATER'], 240, 8.0, 46.0, 4.0, 1.0, 2.0, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['italian', 'olive_oil', 'rustic'], 78, 'Italy'),

('BAK_FOCACCIA', 'focaccia', 'Focaccia', 'Italian flatbread with olive oil, rosemary, and sea salt', 'bread', 'classic', 'yeast', 'savory', 100, 'slice', ARRAY['ING_BREAD_FLOUR', 'ING_OLIVE_OIL', 'ING_ROSEMARY', 'ING_SALT', 'ING_ACTIVE_YEAST'], 260, 6.0, 40.0, 10.0, 2.0, 2.0, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['italian', 'herb', 'olive_oil'], 80, 'Italy'),

('BAK_PRETZEL', 'soft-pretzel', 'Soft Pretzel', 'German-style twisted bread with coarse salt', 'bread', 'classic', 'yeast', 'savory', 120, 'individual', ARRAY['ING_BREAD_FLOUR', 'ING_ACTIVE_YEAST', 'ING_BUTTER', 'ING_SALT', 'ING_BAKING_SODA'], 340, 8.0, 66.0, 4.0, 4.0, 2.0, false, false, true, ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 0, ARRAY['german', 'salted', 'twisted'], 75, 'Germany'),

('BAK_CHALLAH', 'challah', 'Challah', 'Traditional Jewish braided bread with honey and eggs', 'bread', 'classic', 'brioche', 'sweet', 80, 'slice', ARRAY['ING_BREAD_FLOUR', 'ING_EGG', 'ING_HONEY', 'ING_ACTIVE_YEAST', 'ING_VEGETABLE_OIL'], 200, 6.0, 36.0, 4.0, 8.0, 1.0, false, false, true, ARRAY['gluten', 'eggs'], false, true, true, false, true, true, true, 0, ARRAY['jewish', 'braided', 'holiday'], 72, 'Israel'),

-- =====================
-- COOKIES
-- =====================
('BAK_CHOCOLATE_CHIP_COOKIE', 'chocolate-chip-cookie', 'Chocolate Chip Cookie', 'Classic American cookie with chocolate chips and brown butter', 'cookie', 'classic', 'shortcrust', 'chocolatey', 60, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_BROWN_SUGAR', 'ING_CHOCOLATE_CHIP', 'ING_EGG', 'ING_VANILLA'], 280, 3.0, 36.0, 14.0, 22.0, 1.0, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'chocolate', 'classic'], 95, 'USA'),

('BAK_OATMEAL_RAISIN', 'oatmeal-raisin-cookie', 'Oatmeal Raisin Cookie', 'Chewy cookie with rolled oats, raisins, and warm spices', 'cookie', 'classic', 'shortcrust', 'sweet', 55, 'individual', ARRAY['ING_FLOUR', 'ING_ROLLED_OAT', 'ING_BUTTER', 'ING_BROWN_SUGAR', 'ING_RAISIN', 'ING_CINNAMON', 'ING_EGG'], 220, 4.0, 34.0, 9.0, 18.0, 2.0, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'oatmeal', 'healthy'], 78, 'USA'),

('BAK_MACARON', 'macaron', 'French Macaron', 'Delicate almond meringue sandwich with ganache filling', 'cookie', 'premium', 'shortcrust', 'sweet', 20, 'individual', ARRAY['ING_ALMOND_FLOUR', 'ING_EGG', 'ING_POWDERED_SUGAR', 'ING_SUGAR', 'ING_HEAVY_CREAM'], 90, 2.0, 12.0, 4.0, 10.0, 0.5, true, false, true, ARRAY['tree_nuts', 'eggs', 'dairy'], true, false, false, false, true, true, true, 0, ARRAY['french', 'elegant', 'colorful'], 88, 'France'),

('BAK_SHORTBREAD', 'scottish-shortbread', 'Scottish Shortbread', 'Crumbly butter cookie with simple buttery flavor', 'cookie', 'classic', 'shortcrust', 'buttery', 40, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR', 'ING_SALT'], 180, 2.0, 20.0, 10.0, 8.0, 0.5, false, false, true, ARRAY['gluten', 'dairy'], false, false, true, false, true, true, true, 0, ARRAY['scottish', 'butter', 'simple'], 75, 'Scotland'),

('BAK_BISCOTTI', 'almond-biscotti', 'Almond Biscotti', 'Twice-baked Italian cookie perfect for dipping', 'cookie', 'classic', 'shortcrust', 'nutty', 35, 'individual', ARRAY['ING_FLOUR', 'ING_ALMOND', 'ING_SUGAR', 'ING_EGG', 'ING_BAKING_POWDER'], 140, 4.0, 20.0, 6.0, 10.0, 1.0, false, false, true, ARRAY['gluten', 'eggs', 'tree_nuts'], false, true, false, false, true, true, true, 0, ARRAY['italian', 'almond', 'coffee'], 72, 'Italy'),

('BAK_SNICKERDOODLE', 'snickerdoodle', 'Snickerdoodle', 'Soft sugar cookie rolled in cinnamon sugar', 'cookie', 'classic', 'shortcrust', 'sweet', 50, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR', 'ING_CINNAMON', 'ING_EGG', 'ING_CREAM_OF_TARTAR'], 200, 2.0, 28.0, 9.0, 16.0, 0.5, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'cinnamon', 'soft'], 76, 'USA'),

('BAK_BROWNIE', 'fudge-brownie', 'Fudge Brownie', 'Dense chocolate brownie with a fudgy center', 'cookie', 'popular', 'shortcrust', 'chocolatey', 70, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_COCOA_POWDER', 'ING_DARK_CHOCOLATE', 'ING_SUGAR', 'ING_EGG'], 320, 4.0, 38.0, 18.0, 28.0, 2.0, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'chocolate', 'fudgy'], 90, 'USA'),

('BAK_MADELINE', 'madeline', 'Madeline', 'French shell-shaped sponge cake with lemon flavor', 'cookie', 'classic', 'shortcrust', 'sweet', 25, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_SUGAR', 'ING_LEMON_ZEST', 'ING_HONEY'], 100, 2.0, 12.0, 5.0, 8.0, 0.5, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['french', 'lemon', 'elegant'], 74, 'France'),

-- =====================
-- CAKES
-- =====================
('BAK_CARROT_CAKE', 'carrot-cake', 'Carrot Cake', 'Moist spiced cake with carrots and cream cheese frosting', 'cake', 'classic', 'shortcrust', 'sweet', 150, 'slice', ARRAY['ING_FLOUR', 'ING_CARROT', 'ING_WALNUT', 'ING_CREAM_CHEESE', 'ING_CINNAMON', 'ING_EGG', 'ING_SUGAR'], 420, 5.0, 52.0, 22.0, 38.0, 2.0, false, true, true, ARRAY['gluten', 'dairy', 'eggs', 'tree_nuts'], false, false, false, false, true, true, true, 0, ARRAY['american', 'spiced', 'cream_cheese'], 85, 'USA'),

('BAK_CHEESECAKE', 'new-york-cheesecake', 'New York Cheesecake', 'Dense creamy cheesecake with graham cracker crust', 'cake', 'classic', 'shortcrust', 'sweet', 130, 'slice', ARRAY['ING_CREAM_CHEESE', 'ING_SUGAR', 'ING_EGG', 'ING_HEAVY_CREAM', 'ING_VANILLA', 'ING_COOKIE_CRUMB'], 380, 6.0, 32.0, 26.0, 28.0, 0.5, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'creamy', 'rich'], 88, 'USA'),

('BAK_POUND_CAKE', 'pound-cake', 'Pound Cake', 'Dense buttery cake perfect for toast or with berries', 'cake', 'classic', 'shortcrust', 'buttery', 100, 'slice', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_SUGAR', 'ING_EGG', 'ING_VANILLA'], 340, 4.0, 42.0, 18.0, 26.0, 0.5, false, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['english', 'classic', 'buttery'], 72, 'England'),

('BAK_OPERA_CAKE', 'opera-cake', 'Opera Cake', 'French layered cake with almond sponge, coffee, and chocolate', 'cake', 'premium', 'shortcrust', 'chocolatey', 120, 'slice', ARRAY['ING_ALMOND_FLOUR', 'ING_EGG', 'ING_ESPRESSO', 'ING_DARK_CHOCOLATE', 'ING_BUTTER', 'ING_SUGAR'], 380, 6.0, 38.0, 24.0, 30.0, 1.0, true, true, true, ARRAY['tree_nuts', 'dairy', 'eggs'], true, false, false, false, true, true, true, 0, ARRAY['french', 'coffee', 'chocolate'], 80, 'France'),

('BAK_RED_VELVET', 'red-velvet-cake', 'Red Velvet Cake', 'Iconic crimson cake with cream cheese frosting', 'cake', 'popular', 'shortcrust', 'sweet', 140, 'slice', ARRAY['ING_FLOUR', 'ING_COCOA_POWDER', 'ING_BUTTERMILK', 'ING_CREAM_CHEESE', 'ING_EGG', 'ING_BUTTER'], 400, 5.0, 48.0, 22.0, 36.0, 1.0, false, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'southern', 'iconic'], 86, 'USA'),

('BAK_TIRAMISU_CAKE', 'tiramisu-cake', 'Tiramisu Cake', 'Italian-inspired cake with mascarpone and espresso', 'cake', 'popular', 'shortcrust', 'chocolatey', 140, 'slice', ARRAY['ING_FLOUR', 'ING_MASCARPONE', 'ING_ESPRESSO', 'ING_COCOA_POWDER', 'ING_EGG', 'ING_SUGAR'], 360, 6.0, 40.0, 20.0, 28.0, 1.0, true, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['italian', 'coffee', 'mascarpone'], 82, 'Italy'),

-- =====================
-- DONUTS
-- =====================
('BAK_GLAZED_DONUT', 'glazed-donut', 'Glazed Donut', 'Classic ring donut with sweet vanilla glaze', 'donut', 'classic', 'yeast', 'sweet', 60, 'individual', ARRAY['ING_FLOUR', 'ING_ACTIVE_YEAST', 'ING_SUGAR', 'ING_POWDERED_SUGAR', 'ING_MILK', 'ING_EGG'], 240, 3.0, 34.0, 10.0, 18.0, 1.0, false, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'classic', 'breakfast'], 92, 'USA'),

('BAK_CHOCOLATE_DONUT', 'chocolate-frosted-donut', 'Chocolate Frosted Donut', 'Yeast donut topped with rich chocolate glaze', 'donut', 'popular', 'yeast', 'chocolatey', 65, 'individual', ARRAY['ING_FLOUR', 'ING_ACTIVE_YEAST', 'ING_DARK_CHOCOLATE', 'ING_SUGAR', 'ING_MILK', 'ING_EGG'], 280, 4.0, 38.0, 13.0, 22.0, 1.0, false, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'chocolate', 'frosted'], 88, 'USA'),

('BAK_BOSTON_CREAM', 'boston-cream-donut', 'Boston Cream Donut', 'Filled donut with vanilla cream and chocolate glaze', 'donut', 'popular', 'yeast', 'chocolatey', 90, 'individual', ARRAY['ING_FLOUR', 'ING_ACTIVE_YEAST', 'ING_PASTRY_CREAM', 'ING_DARK_CHOCOLATE', 'ING_EGG'], 340, 5.0, 42.0, 18.0, 26.0, 1.0, true, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'cream_filled', 'boston'], 85, 'USA'),

('BAK_JELLY_DONUT', 'jelly-donut', 'Jelly Donut', 'Round donut filled with fruit jam and dusted with sugar', 'donut', 'classic', 'yeast', 'fruity', 70, 'individual', ARRAY['ING_FLOUR', 'ING_ACTIVE_YEAST', 'ING_JAM', 'ING_POWDERED_SUGAR', 'ING_EGG'], 260, 3.0, 40.0, 10.0, 22.0, 1.0, true, false, true, ARRAY['gluten', 'eggs'], false, true, true, false, true, true, true, 0, ARRAY['american', 'filled', 'fruit'], 80, 'USA'),

('BAK_CRULLER', 'french-cruller', 'French Cruller', 'Light airy donut made with choux pastry', 'donut', 'classic', 'choux', 'sweet', 55, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_POWDERED_SUGAR', 'ING_VANILLA'], 220, 4.0, 28.0, 12.0, 14.0, 0.5, false, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['french', 'light', 'airy'], 75, 'France'),

('BAK_OLD_FASHIONED', 'old-fashioned-donut', 'Old Fashioned Donut', 'Cake donut with cracked glaze and nutmeg flavor', 'donut', 'classic', 'shortcrust', 'sweet', 70, 'individual', ARRAY['ING_FLOUR', 'ING_BAKING_POWDER', 'ING_BUTTERMILK', 'ING_SUGAR', 'ING_NUTMEG', 'ING_EGG'], 290, 4.0, 40.0, 14.0, 20.0, 1.0, false, true, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['american', 'cake_donut', 'nostalgic'], 78, 'USA'),

-- =====================
-- SAVORY
-- =====================
('BAK_HAM_CHEESE_CROISSANT', 'ham-cheese-croissant', 'Ham & Cheese Croissant', 'Butter croissant filled with ham and Gruyère cheese', 'savory', 'popular', 'puff', 'savory', 120, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_CROISSANT_BUTTER', 'ING_HAM', 'ING_GRUYERE', 'ING_EGG'], 380, 14.0, 32.0, 22.0, 4.0, 1.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, true, 0, ARRAY['french', 'savory', 'breakfast'], 82, 'France'),

('BAK_SPINACH_FETA_CROISSANT', 'spinach-feta-croissant', 'Spinach & Feta Croissant', 'Flaky croissant with spinach and tangy feta filling', 'savory', 'popular', 'puff', 'savory', 110, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_CROISSANT_BUTTER', 'ING_SPINACH', 'ING_FETA', 'ING_EGG'], 340, 10.0, 30.0, 20.0, 3.0, 2.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['mediterranean', 'vegetarian', 'savory'], 78, 'France'),

('BAK_SAUSAGE_ROLL', 'sausage-roll', 'Sausage Roll', 'British puff pastry wrapped around seasoned sausage meat', 'savory', 'classic', 'puff', 'savory', 100, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_BUTTER', 'ING_PORK', 'ING_SAGE', 'ING_EGG'], 360, 12.0, 24.0, 26.0, 2.0, 1.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, false, 0, ARRAY['british', 'pork', 'snack'], 76, 'England'),

('BAK_QUICHE', 'quiche-lorraine', 'Quiche Lorraine', 'French savory tart with bacon, cheese, and custard filling', 'savory', 'classic', 'shortcrust', 'savory', 150, 'slice', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_BACON', 'ING_GRUYERE', 'ING_EGG', 'ING_HEAVY_CREAM'], 420, 14.0, 22.0, 32.0, 2.0, 1.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, false, false, 0, ARRAY['french', 'bacon', 'brunch'], 84, 'France'),

('BAK_EMPANADA', 'beef-empanada', 'Beef Empanada', 'Argentine pastry filled with spiced ground beef', 'savory', 'popular', 'shortcrust', 'savory', 100, 'individual', ARRAY['ING_FLOUR', 'ING_BUTTER', 'ING_GROUND_BEEF', 'ING_ONION', 'ING_CUMIN', 'ING_EGG'], 320, 12.0, 28.0, 18.0, 2.0, 1.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, false, true, true, 1, ARRAY['argentine', 'beef', 'handheld'], 80, 'Argentina'),

('BAK_CHEESE_DANISH', 'cheese-danish', 'Cheese Danish', 'Puff pastry with sweet cream cheese filling', 'savory', 'classic', 'puff', 'sweet', 90, 'individual', ARRAY['ING_PASTRY_FLOUR', 'ING_BUTTER', 'ING_CREAM_CHEESE', 'ING_SUGAR', 'ING_EGG', 'ING_VANILLA'], 320, 6.0, 34.0, 18.0, 16.0, 1.0, true, false, true, ARRAY['gluten', 'dairy', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['danish', 'cream_cheese', 'breakfast'], 79, 'Denmark')

ON CONFLICT (id) DO NOTHING;
