-- ============================================================================
-- GUDBRO Menu Items Seed Script
-- Run this in Supabase SQL Editor to populate menu_items from JSON data
-- ============================================================================

-- Step 1: Create merchant if not exists
INSERT INTO merchants (
  slug, name, description, email,
  city, country, currency, default_language, supported_languages,
  tier, wifi_enabled, wifi_ssid, is_active
)
VALUES (
  'roots-danang',
  'ROOTS Plant-Based Cafe',
  'Clean food opportunity for everyone. Modern plant-based dining using fresh, locally farmed produce.',
  'info@rootscafe.vn',
  'Da Nang', 'VN', 'VND', 'en', ARRAY['en', 'vi', 'it'],
  'pre_ordering', true, 'ROOTS_Guest', true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Get merchant ID
DO $$
DECLARE
  v_merchant_id UUID;
  v_cat_hot_coffee UUID;
  v_cat_iced_coffee UUID;
  v_cat_matcha UUID;
  v_cat_tea UUID;
  v_cat_smoothie UUID;
  v_cat_milkshake UUID;
BEGIN
  -- Get merchant ID
  SELECT id INTO v_merchant_id FROM merchants WHERE slug = 'roots-danang';

  -- Step 2: Create categories
  INSERT INTO menu_categories (merchant_id, slug, name_multilang, icon, display_order, is_active)
  VALUES
    (v_merchant_id, 'hot-coffee', '{"en": "Hot Coffee", "vi": "Ca phe nong", "it": "Caffe Caldo"}'::jsonb, '☕', 1, true),
    (v_merchant_id, 'iced-coffee', '{"en": "Iced Coffee", "vi": "Ca phe da", "it": "Caffe Freddo"}'::jsonb, '🧊', 2, true),
    (v_merchant_id, 'matcha', '{"en": "Matcha", "vi": "Matcha", "it": "Matcha"}'::jsonb, '🍵', 3, true),
    (v_merchant_id, 'tea', '{"en": "Tea", "vi": "Tra", "it": "Te"}'::jsonb, '🫖', 4, true),
    (v_merchant_id, 'smoothie', '{"en": "Smoothies", "vi": "Sinh to", "it": "Frullati"}'::jsonb, '🥤', 5, true),
    (v_merchant_id, 'milkshake', '{"en": "Milkshakes", "vi": "Sua lac", "it": "Frappé"}'::jsonb, '🥛', 6, true)
  ON CONFLICT (merchant_id, slug) DO UPDATE SET
    name_multilang = EXCLUDED.name_multilang,
    icon = EXCLUDED.icon,
    display_order = EXCLUDED.display_order;

  -- Get category IDs
  SELECT id INTO v_cat_hot_coffee FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'hot-coffee';
  SELECT id INTO v_cat_iced_coffee FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'iced-coffee';
  SELECT id INTO v_cat_matcha FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'matcha';
  SELECT id INTO v_cat_tea FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'tea';
  SELECT id INTO v_cat_smoothie FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'smoothie';
  SELECT id INTO v_cat_milkshake FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'milkshake';

  -- Step 3: Insert menu items
  -- Hot Coffee Items
  INSERT INTO menu_items (merchant_id, category_id, slug, name_multilang, description_multilang, price, currency, image_url, intolerances, allergens, dietary_flags, calories, is_available, is_active, display_order, temperature, subcategory)
  VALUES
    -- Espresso
    (v_merchant_id, v_cat_hot_coffee, 'espresso-single',
     '{"en": "Espresso (Single)", "it": "Espresso (Single)", "vi": "Ca Phe Espresso (Don)"}'::jsonb,
     '{"en": "Double = 18 g coffee / 50-60 ml", "it": "Double = 18 g coffee / 50-60 ml", "vi": "Doi = 18 g ca phe / 50-60 ml"}'::jsonb,
     63000, 'VND', 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{}'::jsonb, 1, true, true, 1, 'hot', 'espresso-based'),

    (v_merchant_id, v_cat_hot_coffee, 'espresso-double',
     '{"en": "Espresso (Double)", "it": "Espresso (Double)", "vi": "Ca Phe Espresso (Doi)"}'::jsonb,
     '{"en": "Use bottomless for training", "it": "Use bottomless for training", "vi": "Su dung khong day de luyen tap"}'::jsonb,
     75000, 'VND', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{}'::jsonb, 1, true, true, 2, 'hot', 'espresso-based'),

    -- Americano
    (v_merchant_id, v_cat_hot_coffee, 'americano-hot',
     '{"en": "Americano (Hot)", "it": "Americano (Caldo)", "vi": "Americano (Nong)"}'::jsonb,
     '{"en": "Double shot espresso with hot water", "it": "Doppio espresso con acqua calda", "vi": "Hai shot espresso voi nuoc nong"}'::jsonb,
     65000, 'VND', 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{}'::jsonb, 5, true, true, 3, 'hot', 'espresso-based'),

    -- Latte
    (v_merchant_id, v_cat_hot_coffee, 'latte-hot',
     '{"en": "Latte (Hot)", "it": "Latte (Caldo)", "vi": "Latte (Nong)"}'::jsonb,
     '{"en": "Espresso with steamed oat milk", "it": "Espresso con latte d''avena caldo", "vi": "Espresso voi sua yeu mach nong"}'::jsonb,
     75000, 'VND', 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 120, true, true, 4, 'hot', 'espresso-based'),

    -- Cappuccino
    (v_merchant_id, v_cat_hot_coffee, 'cappuccino-hot',
     '{"en": "Cappuccino (Hot)", "it": "Cappuccino (Caldo)", "vi": "Cappuccino (Nong)"}'::jsonb,
     '{"en": "Equal parts espresso, steamed milk, foam", "it": "Parti uguali di espresso, latte caldo, schiuma", "vi": "Phan bang nhau espresso, sua nong, bot sua"}'::jsonb,
     75000, 'VND', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 100, true, true, 5, 'hot', 'espresso-based'),

    -- Flat White
    (v_merchant_id, v_cat_hot_coffee, 'flat-white-hot',
     '{"en": "Flat White (Hot)", "it": "Flat White (Caldo)", "vi": "Flat White (Nong)"}'::jsonb,
     '{"en": "Double ristretto with micro-foamed milk", "it": "Doppio ristretto con latte micro-schiumato", "vi": "Hai ristretto voi sua micro-foam"}'::jsonb,
     78000, 'VND', 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 110, true, true, 6, 'hot', 'espresso-based'),

    -- Vietnamese Coffee
    (v_merchant_id, v_cat_hot_coffee, 'vietnamese-coffee-hot',
     '{"en": "Vietnamese Coffee (Hot)", "it": "Caffe Vietnamita (Caldo)", "vi": "Ca Phe Sua (Nong)"}'::jsonb,
     '{"en": "Traditional phin drip with condensed coconut milk", "it": "Tradizionale phin con latte di cocco condensato", "vi": "Ca phe phin truyen thong voi sua dac dua"}'::jsonb,
     55000, 'VND', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 150, true, true, 7, 'hot', 'vietnamese')
  ON CONFLICT (merchant_id, slug) DO UPDATE SET
    name_multilang = EXCLUDED.name_multilang,
    description_multilang = EXCLUDED.description_multilang,
    price = EXCLUDED.price,
    image_url = EXCLUDED.image_url,
    updated_at = NOW();

  -- Iced Coffee Items
  INSERT INTO menu_items (merchant_id, category_id, slug, name_multilang, description_multilang, price, currency, image_url, intolerances, allergens, dietary_flags, calories, is_available, is_active, display_order, temperature, subcategory)
  VALUES
    (v_merchant_id, v_cat_iced_coffee, 'americano-iced',
     '{"en": "Americano (Iced)", "it": "Americano (Freddo)", "vi": "Americano (Da)"}'::jsonb,
     '{"en": "Double shot espresso with cold water and ice", "it": "Doppio espresso con acqua fredda e ghiaccio", "vi": "Hai shot espresso voi nuoc lanh va da"}'::jsonb,
     70000, 'VND', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{}'::jsonb, 5, true, true, 1, 'iced', 'espresso-based'),

    (v_merchant_id, v_cat_iced_coffee, 'latte-iced',
     '{"en": "Latte (Iced)", "it": "Latte (Freddo)", "vi": "Latte (Da)"}'::jsonb,
     '{"en": "Espresso with cold oat milk over ice", "it": "Espresso con latte d''avena freddo su ghiaccio", "vi": "Espresso voi sua yeu mach lanh tren da"}'::jsonb,
     78000, 'VND', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 130, true, true, 2, 'iced', 'espresso-based'),

    (v_merchant_id, v_cat_iced_coffee, 'vietnamese-coffee-iced',
     '{"en": "Vietnamese Coffee (Iced)", "it": "Caffe Vietnamita (Freddo)", "vi": "Ca Phe Sua Da"}'::jsonb,
     '{"en": "Traditional phin drip with condensed coconut milk, iced", "it": "Tradizionale phin con latte di cocco condensato, ghiacciato", "vi": "Ca phe phin truyen thong voi sua dac dua, da"}'::jsonb,
     58000, 'VND', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 160, true, true, 3, 'iced', 'vietnamese'),

    (v_merchant_id, v_cat_iced_coffee, 'cold-brew',
     '{"en": "Cold Brew", "it": "Cold Brew", "vi": "Cold Brew"}'::jsonb,
     '{"en": "18-hour steeped cold brew concentrate", "it": "Concentrato di cold brew macerato 18 ore", "vi": "Cold brew dam dac ngam 18 gio"}'::jsonb,
     75000, 'VND', 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{}'::jsonb, 5, true, true, 4, 'iced', 'cold-brew'),

    (v_merchant_id, v_cat_iced_coffee, 'mocha-iced',
     '{"en": "Mocha (Iced)", "it": "Mocha (Freddo)", "vi": "Mocha (Da)"}'::jsonb,
     '{"en": "Espresso, chocolate, oat milk over ice", "it": "Espresso, cioccolato, latte d''avena su ghiaccio", "vi": "Espresso, socola, sua yeu mach tren da"}'::jsonb,
     85000, 'VND', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 220, true, true, 5, 'iced', 'espresso-based')
  ON CONFLICT (merchant_id, slug) DO UPDATE SET
    name_multilang = EXCLUDED.name_multilang,
    description_multilang = EXCLUDED.description_multilang,
    price = EXCLUDED.price,
    updated_at = NOW();

  -- Matcha Items
  INSERT INTO menu_items (merchant_id, category_id, slug, name_multilang, description_multilang, price, currency, image_url, intolerances, allergens, dietary_flags, calories, is_available, is_active, display_order, temperature, subcategory)
  VALUES
    (v_merchant_id, v_cat_matcha, 'matcha-latte-hot',
     '{"en": "Matcha Latte (Hot)", "it": "Matcha Latte (Caldo)", "vi": "Matcha Latte (Nong)"}'::jsonb,
     '{"en": "Ceremonial grade matcha with steamed oat milk", "it": "Matcha cerimoniale con latte d''avena caldo", "vi": "Matcha ceremonial voi sua yeu mach nong"}'::jsonb,
     80000, 'VND', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 140, true, true, 1, 'hot', 'matcha'),

    (v_merchant_id, v_cat_matcha, 'matcha-latte-iced',
     '{"en": "Matcha Latte (Iced)", "it": "Matcha Latte (Freddo)", "vi": "Matcha Latte (Da)"}'::jsonb,
     '{"en": "Ceremonial grade matcha with cold oat milk over ice", "it": "Matcha cerimoniale con latte d''avena freddo su ghiaccio", "vi": "Matcha ceremonial voi sua yeu mach lanh tren da"}'::jsonb,
     85000, 'VND', 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 150, true, true, 2, 'iced', 'matcha')
  ON CONFLICT (merchant_id, slug) DO UPDATE SET
    name_multilang = EXCLUDED.name_multilang,
    price = EXCLUDED.price,
    updated_at = NOW();

  -- Smoothie Items
  INSERT INTO menu_items (merchant_id, category_id, slug, name_multilang, description_multilang, price, currency, image_url, intolerances, allergens, dietary_flags, calories, is_available, is_active, display_order, temperature, subcategory)
  VALUES
    (v_merchant_id, v_cat_smoothie, 'tropical-paradise',
     '{"en": "Tropical Paradise", "it": "Paradiso Tropicale", "vi": "Thien Duong Nhiet Doi"}'::jsonb,
     '{"en": "Mango, pineapple, coconut milk, banana", "it": "Mango, ananas, latte di cocco, banana", "vi": "Xoai, dua, sua dua, chuoi"}'::jsonb,
     85000, 'VND', 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=400',
     '{}'::jsonb, '{}'::jsonb, '{"vegan": true, "gluten_free": true}'::jsonb, 250, true, true, 1, 'iced', 'fruit'),

    (v_merchant_id, v_cat_smoothie, 'green-detox',
     '{"en": "Green Detox", "it": "Detox Verde", "vi": "Detox Xanh"}'::jsonb,
     '{"en": "Spinach, kale, apple, ginger, lemon", "it": "Spinaci, cavolo, mela, zenzero, limone", "vi": "Rau bi na, cai xoan, tao, gung, chanh"}'::jsonb,
     90000, 'VND', 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400',
     '{}'::jsonb, '{}'::jsonb, '{"vegan": true, "gluten_free": true}'::jsonb, 120, true, true, 2, 'iced', 'wellness'),

    (v_merchant_id, v_cat_smoothie, 'berry-blast',
     '{"en": "Berry Blast", "it": "Esplosione di Frutti di Bosco", "vi": "No Berry"}'::jsonb,
     '{"en": "Mixed berries, banana, oat milk", "it": "Frutti di bosco misti, banana, latte d''avena", "vi": "Cac loai berry, chuoi, sua yeu mach"}'::jsonb,
     88000, 'VND', 'https://images.unsplash.com/photo-1553530666-ba11a90a35f7?w=400',
     '{}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 200, true, true, 3, 'iced', 'fruit'),

    (v_merchant_id, v_cat_smoothie, 'protein-power',
     '{"en": "Protein Power", "it": "Potenza Proteica", "vi": "Suc Manh Protein"}'::jsonb,
     '{"en": "Banana, peanut butter, oat milk, plant protein", "it": "Banana, burro di arachidi, latte d''avena, proteine vegetali", "vi": "Chuoi, bo dau phong, sua yeu mach, protein thuc vat"}'::jsonb,
     95000, 'VND', 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=400',
     '{"peanut": true}'::jsonb, '{"peanuts": true}'::jsonb, '{"vegan": true, "high_protein": true}'::jsonb, 350, true, true, 4, 'iced', 'protein')
  ON CONFLICT (merchant_id, slug) DO UPDATE SET
    name_multilang = EXCLUDED.name_multilang,
    price = EXCLUDED.price,
    updated_at = NOW();

  -- Tea Items
  INSERT INTO menu_items (merchant_id, category_id, slug, name_multilang, description_multilang, price, currency, image_url, intolerances, allergens, dietary_flags, calories, is_available, is_active, display_order, temperature, subcategory)
  VALUES
    (v_merchant_id, v_cat_tea, 'jasmine-green-tea',
     '{"en": "Jasmine Green Tea", "it": "Te Verde al Gelsomino", "vi": "Tra Xanh Hoa Nhai"}'::jsonb,
     '{"en": "Premium jasmine-scented green tea", "it": "Te verde premium profumato al gelsomino", "vi": "Tra xanh huong hoa nhai cao cap"}'::jsonb,
     50000, 'VND', 'https://images.unsplash.com/photo-1556679343-c1306c6a6a0d?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 2, true, true, 1, 'hot', 'green-tea'),

    (v_merchant_id, v_cat_tea, 'oolong-tea',
     '{"en": "Oolong Tea", "it": "Te Oolong", "vi": "Tra O Long"}'::jsonb,
     '{"en": "Traditional Taiwanese high mountain oolong", "it": "Oolong tradizionale di alta montagna taiwanese", "vi": "O Long nui cao Dai Loan truyen thong"}'::jsonb,
     55000, 'VND', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
     '{"caffeine": true}'::jsonb, '{}'::jsonb, '{"vegan": true}'::jsonb, 2, true, true, 2, 'hot', 'oolong'),

    (v_merchant_id, v_cat_tea, 'chamomile-tea',
     '{"en": "Chamomile Tea", "it": "Te alla Camomilla", "vi": "Tra Hoa Cuc"}'::jsonb,
     '{"en": "Caffeine-free calming chamomile blend", "it": "Miscela calmante di camomilla senza caffeina", "vi": "Hon hop hoa cuc thu gian khong caffeine"}'::jsonb,
     48000, 'VND', 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400',
     '{}'::jsonb, '{}'::jsonb, '{"vegan": true, "caffeine_free": true}'::jsonb, 2, true, true, 3, 'hot', 'herbal')
  ON CONFLICT (merchant_id, slug) DO UPDATE SET
    name_multilang = EXCLUDED.name_multilang,
    price = EXCLUDED.price,
    updated_at = NOW();

  RAISE NOTICE 'Successfully seeded menu items for merchant: %', v_merchant_id;
END $$;

-- Verify the data
SELECT
  'Categories' as type,
  COUNT(*) as count
FROM menu_categories mc
JOIN merchants m ON m.id = mc.merchant_id
WHERE m.slug = 'roots-danang'
UNION ALL
SELECT
  'Menu Items' as type,
  COUNT(*) as count
FROM menu_items mi
JOIN merchants m ON m.id = mi.merchant_id
WHERE m.slug = 'roots-danang';
