-- ============================================
-- ICE CREAM Data Import
-- GUDBRO Database Standards v1.3
-- ============================================

INSERT INTO icecream (id, slug, name, description, category, status, base_type, flavor_profile, serving_size_ml, serving_style, ingredient_ids, calories_per_serving, protein_g, carbs_g, fat_g, sugar_g, has_topping, has_sauce, is_artisanal, allergens, is_gluten_free, is_dairy_free, is_nut_free, is_vegan, is_vegetarian, is_halal, is_kosher, spice_level, tags, popularity, origin_country) VALUES

-- =====================
-- GELATO (Italian style)
-- =====================
('ICE_STRACCIATELLA', 'stracciatella-gelato', 'Stracciatella Gelato', 'Creamy vanilla gelato with fine chocolate shards throughout', 'gelato', 'classic', 'cream', 'chocolatey', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_VANILLA', 'ING_STRACCIATELLA'], 220, 4.0, 24.0, 12.0, 20.0, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['italian', 'chocolate', 'classic'], 90, 'Italy'),

('ICE_PISTACHIO_GELATO', 'pistachio-gelato', 'Pistachio Gelato', 'Authentic Italian gelato made with Sicilian pistachios', 'gelato', 'premium', 'cream', 'nutty', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_PISTACHIO'], 250, 6.0, 22.0, 16.0, 18.0, false, false, true, ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 0, ARRAY['italian', 'nuts', 'premium'], 92, 'Italy'),

('ICE_HAZELNUT_GELATO', 'hazelnut-gelato', 'Hazelnut Gelato', 'Rich and creamy gelato with roasted Piedmont hazelnuts', 'gelato', 'premium', 'cream', 'nutty', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_HAZELNUTS'], 260, 5.0, 23.0, 17.0, 19.0, false, false, true, ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 0, ARRAY['italian', 'nuts', 'premium'], 88, 'Italy'),

('ICE_FIOR_DI_LATTE', 'fior-di-latte-gelato', 'Fior di Latte Gelato', 'Pure milk gelato showcasing the delicate flavor of fresh cream', 'gelato', 'classic', 'milk', 'creamy', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR'], 180, 4.0, 20.0, 10.0, 18.0, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['italian', 'classic', 'simple'], 75, 'Italy'),

('ICE_AMARENA', 'amarena-gelato', 'Amarena Cherry Gelato', 'Creamy gelato swirled with Italian wild cherry preserve', 'gelato', 'classic', 'cream', 'fruity', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_CHERRY', 'ING_BERRY_COMPOTE'], 230, 4.0, 28.0, 11.0, 24.0, false, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['italian', 'fruit', 'cherry'], 82, 'Italy'),

('ICE_TIRAMISU_GELATO', 'tiramisu-gelato', 'Tiramisu Gelato', 'Coffee-infused gelato with mascarpone swirl and cocoa', 'gelato', 'popular', 'cream', 'creamy', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MASCARPONE', 'ING_ESPRESSO', 'ING_COCOA_POWDER', 'ING_SUGAR'], 270, 5.0, 26.0, 15.0, 22.0, false, false, true, ARRAY['dairy', 'eggs'], true, false, true, false, true, true, true, 0, ARRAY['italian', 'coffee', 'dessert'], 85, 'Italy'),

-- =====================
-- SORBET (Dairy-free)
-- =====================
('ICE_LEMON_SORBET', 'lemon-sorbet', 'Lemon Sorbet', 'Refreshing dairy-free sorbet with fresh lemon juice and zest', 'sorbet', 'classic', 'fruit', 'tangy', 120, 'cup', ARRAY['ING_LEMON', 'ING_LEMON_ZEST', 'ING_SUGAR', 'ING_WATER'], 120, 0.0, 30.0, 0.0, 28.0, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['vegan', 'refreshing', 'citrus'], 80, 'Italy'),

('ICE_MANGO_SORBET', 'mango-sorbet', 'Mango Sorbet', 'Tropical mango sorbet made with ripe Alphonso mangoes', 'sorbet', 'popular', 'fruit', 'fruity', 120, 'cup', ARRAY['ING_MANGO_PUREE', 'ING_SUGAR', 'ING_LIME'], 130, 0.5, 32.0, 0.0, 30.0, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['vegan', 'tropical', 'summer'], 85, 'India'),

('ICE_RASPBERRY_SORBET', 'raspberry-sorbet', 'Raspberry Sorbet', 'Intense berry sorbet with fresh raspberries', 'sorbet', 'classic', 'fruit', 'tangy', 120, 'cup', ARRAY['ING_RASPBERRY_PUREE', 'ING_SUGAR', 'ING_LEMON'], 110, 0.5, 27.0, 0.0, 25.0, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['vegan', 'berry', 'refreshing'], 78, 'France'),

('ICE_PASSION_FRUIT_SORBET', 'passion-fruit-sorbet', 'Passion Fruit Sorbet', 'Exotic sorbet with intense tropical passion fruit flavor', 'sorbet', 'premium', 'fruit', 'tangy', 120, 'cup', ARRAY['ING_PASSION_FRUIT_PUREE', 'ING_SUGAR', 'ING_LIME'], 125, 0.5, 30.0, 0.0, 28.0, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['vegan', 'tropical', 'exotic'], 75, 'Brazil'),

('ICE_COCONUT_SORBET', 'coconut-sorbet', 'Coconut Sorbet', 'Creamy dairy-free sorbet with fresh coconut', 'sorbet', 'popular', 'coconut', 'creamy', 120, 'cup', ARRAY['ING_COCONUT_CREAM', 'ING_COCONUT', 'ING_SUGAR'], 160, 1.0, 20.0, 9.0, 18.0, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['vegan', 'tropical', 'coconut'], 72, 'Thailand'),

-- =====================
-- FROZEN YOGURT
-- =====================
('ICE_VANILLA_FROYO', 'vanilla-frozen-yogurt', 'Vanilla Frozen Yogurt', 'Tangy frozen yogurt with Madagascar vanilla', 'frozen_yogurt', 'classic', 'yogurt', 'tangy', 150, 'cup', ARRAY['ING_GREEK_YOGURT', 'ING_VANILLA', 'ING_SUGAR', 'ING_MILK'], 140, 5.0, 22.0, 3.0, 18.0, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['healthy', 'probiotic', 'light'], 70, 'USA'),

('ICE_STRAWBERRY_FROYO', 'strawberry-frozen-yogurt', 'Strawberry Frozen Yogurt', 'Fresh strawberry frozen yogurt with real fruit pieces', 'frozen_yogurt', 'popular', 'yogurt', 'fruity', 150, 'cup', ARRAY['ING_GREEK_YOGURT', 'ING_STRAWBERRY', 'ING_SUGAR', 'ING_MILK'], 150, 5.0, 24.0, 3.0, 20.0, true, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['healthy', 'fruit', 'light'], 75, 'USA'),

('ICE_ACAI_FROYO', 'acai-frozen-yogurt', 'Acai Frozen Yogurt', 'Superfood frozen yogurt with Brazilian acai berry', 'frozen_yogurt', 'popular', 'yogurt', 'fruity', 150, 'cup', ARRAY['ING_GREEK_YOGURT', 'ING_ACAI_PUREE', 'ING_SUGAR', 'ING_HONEY'], 160, 5.0, 26.0, 3.0, 22.0, true, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['superfood', 'healthy', 'antioxidant'], 80, 'Brazil'),

-- =====================
-- CLASSIC ICE CREAM
-- =====================
('ICE_VANILLA_BEAN', 'vanilla-bean-ice-cream', 'Vanilla Bean Ice Cream', 'Classic American ice cream with real vanilla bean specks', 'ice_cream', 'classic', 'cream', 'sweet', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_VANILLA', 'ING_EGG'], 240, 4.0, 23.0, 14.0, 21.0, false, false, false, ARRAY['dairy', 'eggs'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'american', 'vanilla'], 95, 'USA'),

('ICE_CHOCOLATE', 'chocolate-ice-cream', 'Chocolate Ice Cream', 'Rich dark chocolate ice cream with cocoa', 'ice_cream', 'classic', 'cream', 'chocolatey', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_COCOA_POWDER', 'ING_CHOCOLATE_CHUNK'], 260, 5.0, 26.0, 15.0, 22.0, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'chocolate', 'rich'], 93, 'USA'),

('ICE_STRAWBERRY', 'strawberry-ice-cream', 'Strawberry Ice Cream', 'Creamy ice cream with fresh strawberry puree', 'ice_cream', 'classic', 'cream', 'fruity', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_STRAWBERRY'], 220, 4.0, 24.0, 12.0, 22.0, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'fruit', 'strawberry'], 88, 'USA'),

('ICE_MINT_CHIP', 'mint-chocolate-chip', 'Mint Chocolate Chip', 'Cool mint ice cream studded with dark chocolate chips', 'ice_cream', 'popular', 'cream', 'sweet', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_PEPPERMINT_EXTRACT', 'ING_CHOCOLATE_CHIP'], 250, 4.0, 25.0, 14.0, 23.0, false, false, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['mint', 'chocolate', 'refreshing'], 86, 'USA'),

('ICE_COOKIES_CREAM', 'cookies-and-cream', 'Cookies and Cream', 'Vanilla ice cream loaded with chocolate cookie pieces', 'ice_cream', 'popular', 'cream', 'sweet', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_VANILLA', 'ING_OREO_COOKIE'], 280, 4.0, 30.0, 15.0, 26.0, true, false, false, ARRAY['dairy', 'gluten'], false, false, true, false, true, true, true, 0, ARRAY['cookies', 'american', 'popular'], 91, 'USA'),

('ICE_SALTED_CARAMEL', 'salted-caramel-ice-cream', 'Salted Caramel Ice Cream', 'Buttery caramel ice cream with a hint of sea salt', 'ice_cream', 'popular', 'cream', 'sweet', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_CARAMEL_SAUCE', 'ING_SALT'], 270, 4.0, 28.0, 15.0, 26.0, false, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['caramel', 'salted', 'trending'], 89, 'USA'),

('ICE_BUTTER_PECAN', 'butter-pecan', 'Butter Pecan Ice Cream', 'Buttery ice cream with roasted candied pecans', 'ice_cream', 'classic', 'cream', 'nutty', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_BUTTER', 'ING_CANDIED_PECAN'], 290, 5.0, 24.0, 19.0, 20.0, true, false, false, ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, true, 0, ARRAY['nuts', 'buttery', 'southern'], 78, 'USA'),

('ICE_ROCKY_ROAD', 'rocky-road', 'Rocky Road Ice Cream', 'Chocolate ice cream with marshmallows and almonds', 'ice_cream', 'classic', 'cream', 'chocolatey', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_COCOA_POWDER', 'ING_MARSHMALLOW', 'ING_ALMOND'], 300, 6.0, 32.0, 16.0, 28.0, true, false, false, ARRAY['dairy', 'tree_nuts'], true, false, false, false, true, true, false, 0, ARRAY['chocolate', 'nuts', 'american'], 82, 'USA'),

-- =====================
-- SUNDAES
-- =====================
('ICE_HOT_FUDGE_SUNDAE', 'hot-fudge-sundae', 'Hot Fudge Sundae', 'Vanilla ice cream topped with warm fudge sauce and whipped cream', 'sundae', 'classic', 'cream', 'chocolatey', 200, 'bowl', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_VANILLA', 'ING_HOT_FUDGE', 'ING_WHIPPED_CREAM', 'ING_MARASCHINO_CHERRY'], 450, 6.0, 52.0, 24.0, 48.0, true, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'sundae', 'indulgent'], 88, 'USA'),

('ICE_BANANA_SPLIT', 'banana-split', 'Banana Split', 'Three scoops with banana, chocolate, strawberry and pineapple toppings', 'sundae', 'classic', 'cream', 'fruity', 300, 'bowl', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_BANANA', 'ING_STRAWBERRY', 'ING_PINEAPPLE', 'ING_CHOCOLATE_SYRUP', 'ING_WHIPPED_CREAM', 'ING_MARASCHINO_CHERRY'], 580, 8.0, 72.0, 28.0, 65.0, true, true, false, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['classic', 'fruit', 'american'], 85, 'USA'),

('ICE_BROWNIE_SUNDAE', 'brownie-sundae', 'Brownie Sundae', 'Warm brownie topped with vanilla ice cream and hot fudge', 'sundae', 'popular', 'cream', 'chocolatey', 250, 'bowl', ARRAY['ING_BROWNIE', 'ING_HEAVY_CREAM', 'ING_MILK', 'ING_VANILLA', 'ING_HOT_FUDGE', 'ING_WHIPPED_CREAM'], 520, 7.0, 58.0, 28.0, 52.0, true, true, false, ARRAY['dairy', 'gluten', 'eggs'], false, false, true, false, true, true, true, 0, ARRAY['brownie', 'chocolate', 'indulgent'], 84, 'USA'),

('ICE_AFFOGATO', 'affogato', 'Affogato', 'Vanilla gelato drowned in a shot of hot espresso', 'sundae', 'popular', 'cream', 'creamy', 150, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_VANILLA', 'ING_ESPRESSO'], 180, 4.0, 20.0, 10.0, 18.0, false, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['italian', 'coffee', 'elegant'], 80, 'Italy'),

-- =====================
-- SPECIALTY
-- =====================
('ICE_MATCHA', 'matcha-ice-cream', 'Matcha Green Tea Ice Cream', 'Japanese-style ice cream with premium Uji matcha', 'specialty', 'popular', 'cream', 'creamy', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_MATCHA_POWDER'], 210, 4.0, 22.0, 11.0, 19.0, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['japanese', 'matcha', 'green_tea'], 83, 'Japan'),

('ICE_BLACK_SESAME', 'black-sesame-ice-cream', 'Black Sesame Ice Cream', 'Nutty and aromatic ice cream with roasted black sesame', 'specialty', 'premium', 'cream', 'nutty', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_BLACK_SESAME'], 230, 5.0, 21.0, 14.0, 17.0, false, false, true, ARRAY['dairy', 'sesame'], true, false, true, false, true, true, true, 0, ARRAY['japanese', 'sesame', 'unique'], 70, 'Japan'),

('ICE_DULCE_DE_LECHE', 'dulce-de-leche-ice-cream', 'Dulce de Leche Ice Cream', 'Argentinian caramelized milk ice cream with ribbons of dulce de leche', 'specialty', 'popular', 'cream', 'sweet', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_DULCE_DE_LECHE'], 280, 5.0, 30.0, 14.0, 28.0, false, true, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['argentinian', 'caramel', 'rich'], 82, 'Argentina'),

('ICE_LAVENDER_HONEY', 'lavender-honey-ice-cream', 'Lavender Honey Ice Cream', 'Floral ice cream infused with Provencal lavender and local honey', 'specialty', 'premium', 'cream', 'sweet', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_HONEY', 'ING_LAVENDER'], 220, 4.0, 24.0, 12.0, 22.0, false, false, true, ARRAY['dairy'], true, false, true, false, true, true, true, 0, ARRAY['french', 'floral', 'artisanal'], 68, 'France'),

('ICE_BISCOFF', 'biscoff-ice-cream', 'Biscoff Cookie Butter Ice Cream', 'Creamy ice cream swirled with Belgian speculoos cookie butter', 'specialty', 'popular', 'cream', 'sweet', 120, 'cup', ARRAY['ING_HEAVY_CREAM', 'ING_MILK', 'ING_SUGAR', 'ING_COOKIE_CRUMB'], 290, 4.0, 32.0, 16.0, 28.0, true, false, false, ARRAY['dairy', 'gluten'], false, false, true, false, true, true, true, 0, ARRAY['belgian', 'speculoos', 'trending'], 87, 'Belgium'),

-- =====================
-- VEGAN/DAIRY-FREE
-- =====================
('ICE_COCONUT_CHOCOLATE', 'vegan-coconut-chocolate', 'Vegan Coconut Chocolate', 'Dairy-free chocolate ice cream with coconut cream base', 'specialty', 'popular', 'coconut', 'chocolatey', 120, 'cup', ARRAY['ING_COCONUT_CREAM', 'ING_COCOA_POWDER', 'ING_SUGAR', 'ING_COCONUT'], 200, 2.0, 22.0, 12.0, 18.0, false, false, true, ARRAY[]::TEXT[], true, true, true, true, true, true, true, 0, ARRAY['vegan', 'dairy_free', 'chocolate'], 75, 'USA'),

('ICE_CASHEW_VANILLA', 'vegan-cashew-vanilla', 'Vegan Cashew Vanilla', 'Creamy dairy-free vanilla made with cashew base', 'specialty', 'active', 'nut', 'creamy', 120, 'cup', ARRAY['ING_CASHEW_CREAM', 'ING_VANILLA', 'ING_SUGAR', 'ING_COCONUT_CREAM'], 190, 3.0, 18.0, 12.0, 14.0, false, false, true, ARRAY['tree_nuts'], true, true, false, true, true, true, true, 0, ARRAY['vegan', 'dairy_free', 'cashew'], 70, 'USA'),

('ICE_OATMILK_STRAWBERRY', 'oatmilk-strawberry', 'Oat Milk Strawberry', 'Dairy-free strawberry ice cream made with oat milk', 'specialty', 'active', 'milk', 'fruity', 120, 'cup', ARRAY['ING_OAT_MILK', 'ING_STRAWBERRY', 'ING_SUGAR', 'ING_COCONUT_CREAM'], 170, 2.0, 26.0, 6.0, 22.0, false, false, true, ARRAY['gluten'], false, true, true, true, true, true, true, 0, ARRAY['vegan', 'oat_milk', 'berry'], 72, 'USA')

ON CONFLICT (id) DO NOTHING;
