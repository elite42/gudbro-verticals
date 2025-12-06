-- Migration: 015-seed-ingredients-with-costs.sql
-- Description: Seed ingredients database with realistic costs for Vietnam market
-- Date: 2025-12-06
-- Currency: VND (Vietnamese Dong)

-- ============================================================================
-- COFFEE & TEA INGREDIENTS
-- ============================================================================

INSERT INTO ingredients (slug, name_multilang, cost_per_unit, cost_unit, cost_currency, supplier_name, allergens, dietary_flags, calories_per_100g, is_global)
VALUES
  -- Coffee
  ('arabica-coffee-beans', '{"en": "Arabica Coffee Beans", "vi": "Cà phê Arabica"}', 450000, 'kg', 'VND', 'Da Lat Coffee Co.', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('robusta-coffee-beans', '{"en": "Robusta Coffee Beans", "vi": "Cà phê Robusta"}', 280000, 'kg', 'VND', 'Buon Ma Thuot Farm', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('ground-coffee', '{"en": "Ground Coffee (Blend)", "vi": "Cà phê xay"}', 350000, 'kg', 'VND', 'Trung Nguyen', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('espresso-beans', '{"en": "Espresso Blend Beans", "vi": "Cà phê Espresso"}', 520000, 'kg', 'VND', 'Italian Import', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),

  -- Tea
  ('green-tea-leaves', '{"en": "Green Tea Leaves", "vi": "Trà xanh"}', 180000, 'kg', 'VND', 'Thai Nguyen Tea', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('black-tea-leaves', '{"en": "Black Tea Leaves", "vi": "Trà đen"}', 150000, 'kg', 'VND', 'Thai Nguyen Tea', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('oolong-tea', '{"en": "Oolong Tea", "vi": "Trà Ô Long"}', 350000, 'kg', 'VND', 'Taiwan Import', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('jasmine-tea', '{"en": "Jasmine Tea", "vi": "Trà hoa nhài"}', 220000, 'kg', 'VND', 'Thai Nguyen Tea', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('matcha-powder', '{"en": "Matcha Powder", "vi": "Bột Matcha"}', 1200000, 'kg', 'VND', 'Japan Import', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 324, true),
  ('chai-spice-mix', '{"en": "Chai Spice Mix", "vi": "Hỗn hợp gia vị Chai"}', 280000, 'kg', 'VND', 'Spice Market', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),

-- ============================================================================
-- DAIRY & ALTERNATIVES
-- ============================================================================

  -- Dairy
  ('whole-milk', '{"en": "Whole Milk", "vi": "Sữa tươi nguyên kem"}', 32000, 'L', 'VND', 'Vinamilk', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 61, true),
  ('skim-milk', '{"en": "Skim Milk", "vi": "Sữa tách béo"}', 30000, 'L', 'VND', 'Vinamilk', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 34, true),
  ('condensed-milk', '{"en": "Condensed Milk", "vi": "Sữa đặc"}', 45000, 'L', 'VND', 'Vinamilk', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 321, true),
  ('heavy-cream', '{"en": "Heavy Cream", "vi": "Kem béo"}', 85000, 'L', 'VND', 'Anchor', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 340, true),
  ('whipping-cream', '{"en": "Whipping Cream", "vi": "Kem tươi"}', 95000, 'L', 'VND', 'Anchor', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 290, true),
  ('butter', '{"en": "Butter", "vi": "Bơ"}', 180000, 'kg', 'VND', 'Anchor', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 717, true),

  -- Plant Milks
  ('oat-milk', '{"en": "Oat Milk", "vi": "Sữa yến mạch"}', 75000, 'L', 'VND', 'Oatly Import', '{"gluten": true}', '{"vegan": true, "vegetarian": true, "halal": true}', 45, true),
  ('almond-milk', '{"en": "Almond Milk", "vi": "Sữa hạnh nhân"}', 85000, 'L', 'VND', 'Alpro Import', '{"nuts": true}', '{"vegan": true, "vegetarian": true, "halal": true}', 17, true),
  ('soy-milk', '{"en": "Soy Milk", "vi": "Sữa đậu nành"}', 28000, 'L', 'VND', 'Vinasoy', '{"soybeans": true}', '{"vegan": true, "vegetarian": true, "halal": true}', 54, true),
  ('coconut-milk', '{"en": "Coconut Milk", "vi": "Nước cốt dừa"}', 35000, 'L', 'VND', 'Ben Tre Coconut', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 230, true),
  ('coconut-cream', '{"en": "Coconut Cream", "vi": "Kem dừa"}', 55000, 'L', 'VND', 'Ben Tre Coconut', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 330, true),

-- ============================================================================
-- SWEETENERS & SYRUPS
-- ============================================================================

  ('white-sugar', '{"en": "White Sugar", "vi": "Đường trắng"}', 22000, 'kg', 'VND', 'Bien Hoa Sugar', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 387, true),
  ('brown-sugar', '{"en": "Brown Sugar", "vi": "Đường nâu"}', 35000, 'kg', 'VND', 'Bien Hoa Sugar', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 380, true),
  ('honey', '{"en": "Honey", "vi": "Mật ong"}', 180000, 'kg', 'VND', 'Dong Nai Honey', '{}', '{"vegetarian": true, "halal": true, "kosher": true}', 304, true),
  ('maple-syrup', '{"en": "Maple Syrup", "vi": "Siro lá phong"}', 450000, 'L', 'VND', 'Canada Import', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 260, true),
  ('vanilla-syrup', '{"en": "Vanilla Syrup", "vi": "Siro vani"}', 120000, 'L', 'VND', 'Monin', '{}', '{"vegan": true, "vegetarian": true, "halal": true}', 290, true),
  ('caramel-syrup', '{"en": "Caramel Syrup", "vi": "Siro caramel"}', 120000, 'L', 'VND', 'Monin', '{"milk": true}', '{"vegetarian": true, "halal": true}', 310, true),
  ('hazelnut-syrup', '{"en": "Hazelnut Syrup", "vi": "Siro hạt phỉ"}', 130000, 'L', 'VND', 'Monin', '{"nuts": true}', '{"vegan": true, "vegetarian": true, "halal": true}', 285, true),
  ('chocolate-syrup', '{"en": "Chocolate Syrup", "vi": "Siro sô cô la"}', 110000, 'L', 'VND', 'Hersheys', '{"milk": true}', '{"vegetarian": true, "halal": true}', 280, true),
  ('simple-syrup', '{"en": "Simple Syrup", "vi": "Siro đường"}', 40000, 'L', 'VND', 'House Made', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 270, true),

-- ============================================================================
-- FRUITS & PUREES
-- ============================================================================

  ('strawberry-puree', '{"en": "Strawberry Puree", "vi": "Puree dâu tây"}', 180000, 'kg', 'VND', 'Da Lat Fruits', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 32, true),
  ('mango-puree', '{"en": "Mango Puree", "vi": "Puree xoài"}', 95000, 'kg', 'VND', 'Mekong Fruits', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 60, true),
  ('passion-fruit-puree', '{"en": "Passion Fruit Puree", "vi": "Puree chanh dây"}', 120000, 'kg', 'VND', 'Da Lat Fruits', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 97, true),
  ('banana', '{"en": "Banana", "vi": "Chuối"}', 25000, 'kg', 'VND', 'Local Market', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 89, true),
  ('blueberries', '{"en": "Blueberries (Frozen)", "vi": "Việt quất đông lạnh"}', 350000, 'kg', 'VND', 'USA Import', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 57, true),
  ('lemon', '{"en": "Lemon", "vi": "Chanh vàng"}', 80000, 'kg', 'VND', 'Local Market', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 29, true),
  ('lime', '{"en": "Lime", "vi": "Chanh xanh"}', 35000, 'kg', 'VND', 'Local Market', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 30, true),
  ('orange', '{"en": "Orange", "vi": "Cam"}', 45000, 'kg', 'VND', 'Local Market', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 47, true),

-- ============================================================================
-- CHOCOLATE & COCOA
-- ============================================================================

  ('cocoa-powder', '{"en": "Cocoa Powder", "vi": "Bột cacao"}', 180000, 'kg', 'VND', 'Callebaut', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 228, true),
  ('dark-chocolate', '{"en": "Dark Chocolate (70%)", "vi": "Sô cô la đen 70%"}', 320000, 'kg', 'VND', 'Callebaut', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 598, true),
  ('milk-chocolate', '{"en": "Milk Chocolate", "vi": "Sô cô la sữa"}', 280000, 'kg', 'VND', 'Callebaut', '{"milk": true}', '{"vegetarian": true, "halal": true}', 535, true),
  ('white-chocolate', '{"en": "White Chocolate", "vi": "Sô cô la trắng"}', 300000, 'kg', 'VND', 'Callebaut', '{"milk": true}', '{"vegetarian": true, "halal": true}', 539, true),
  ('chocolate-chips', '{"en": "Chocolate Chips", "vi": "Chocolate chip"}', 250000, 'kg', 'VND', 'Callebaut', '{"milk": true}', '{"vegetarian": true, "halal": true}', 500, true),

-- ============================================================================
-- BAKING & DRY GOODS
-- ============================================================================

  ('all-purpose-flour', '{"en": "All-Purpose Flour", "vi": "Bột mì đa dụng"}', 18000, 'kg', 'VND', 'Meizan', '{"gluten": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 364, true),
  ('bread-flour', '{"en": "Bread Flour", "vi": "Bột mì làm bánh mì"}', 25000, 'kg', 'VND', 'Meizan', '{"gluten": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 361, true),
  ('oats', '{"en": "Rolled Oats", "vi": "Yến mạch"}', 65000, 'kg', 'VND', 'Quaker Import', '{"gluten": true}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 389, true),
  ('baking-powder', '{"en": "Baking Powder", "vi": "Bột nở"}', 85000, 'kg', 'VND', 'Rumford', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 53, true),
  ('vanilla-extract', '{"en": "Vanilla Extract", "vi": "Tinh chất vani"}', 650000, 'L', 'VND', 'Nielsen-Massey', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 288, true),
  ('cinnamon-powder', '{"en": "Cinnamon Powder", "vi": "Bột quế"}', 180000, 'kg', 'VND', 'Spice Market', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 247, true),

-- ============================================================================
-- EGGS & PROTEINS
-- ============================================================================

  ('eggs', '{"en": "Eggs (Grade A)", "vi": "Trứng gà"}', 3500, 'piece', 'VND', 'Ba Huan', '{"eggs": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 155, true),
  ('egg-yolk', '{"en": "Egg Yolk", "vi": "Lòng đỏ trứng"}', 4500, 'piece', 'VND', 'Ba Huan', '{"eggs": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 322, true),
  ('yogurt', '{"en": "Plain Yogurt", "vi": "Sữa chua"}', 55000, 'kg', 'VND', 'Vinamilk', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 59, true),
  ('greek-yogurt', '{"en": "Greek Yogurt", "vi": "Sữa chua Hy Lạp"}', 120000, 'kg', 'VND', 'Fage Import', '{"milk": true}', '{"vegetarian": true, "halal": true, "kosher": true}', 97, true),

-- ============================================================================
-- TOPPINGS & EXTRAS
-- ============================================================================

  ('tapioca-pearls', '{"en": "Tapioca Pearls (Boba)", "vi": "Trân châu"}', 45000, 'kg', 'VND', 'Taiwan Import', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 358, true),
  ('grass-jelly', '{"en": "Grass Jelly", "vi": "Thạch đen"}', 35000, 'kg', 'VND', 'Local Supplier', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 21, true),
  ('coconut-jelly', '{"en": "Coconut Jelly", "vi": "Thạch dừa"}', 40000, 'kg', 'VND', 'Ben Tre Coconut', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 73, true),
  ('aloe-vera', '{"en": "Aloe Vera Cubes", "vi": "Nha đam"}', 50000, 'kg', 'VND', 'Local Supplier', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 15, true),
  ('red-beans', '{"en": "Sweet Red Beans", "vi": "Đậu đỏ"}', 65000, 'kg', 'VND', 'Local Supplier', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 337, true),
  ('whipped-cream-can', '{"en": "Whipped Cream (Ready)", "vi": "Kem xịt"}', 85000, 'piece', 'VND', 'Anchor', '{"milk": true}', '{"vegetarian": true, "halal": true}', 257, true),

-- ============================================================================
-- ICE & WATER
-- ============================================================================

  ('ice-cubes', '{"en": "Ice Cubes", "vi": "Đá viên"}', 8000, 'kg', 'VND', 'Ice Factory', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('filtered-water', '{"en": "Filtered Water", "vi": "Nước lọc"}', 5000, 'L', 'VND', 'Aquafina', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('sparkling-water', '{"en": "Sparkling Water", "vi": "Nước có gas"}', 15000, 'L', 'VND', 'Perrier Import', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 0, true),
  ('tonic-water', '{"en": "Tonic Water", "vi": "Nước tonic"}', 35000, 'L', 'VND', 'Schweppes', '{}', '{"vegan": true, "vegetarian": true, "halal": true, "kosher": true}', 34, true)

ON CONFLICT (slug) DO UPDATE SET
  cost_per_unit = EXCLUDED.cost_per_unit,
  cost_unit = EXCLUDED.cost_unit,
  cost_currency = EXCLUDED.cost_currency,
  supplier_name = EXCLUDED.supplier_name,
  cost_updated_at = NOW();

-- ============================================================================
-- Update cost_updated_at for all inserted ingredients
-- ============================================================================

UPDATE ingredients SET cost_updated_at = NOW() WHERE cost_per_unit IS NOT NULL;

-- ============================================================================
-- DONE! Show summary
-- ============================================================================

SELECT
  COUNT(*) as total_ingredients,
  COUNT(cost_per_unit) as with_costs,
  COUNT(DISTINCT supplier_name) as unique_suppliers
FROM ingredients;
