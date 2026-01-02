-- ============================================
-- ASIAN SPIRITS - Complete Import Script
-- GUDBRO Database Standards v1.1
-- Total: 43 new Asian spirits (sake, soju, shochu, umeshu, baijiu)
-- ============================================

-- ============================================
-- STEP 1: Update CHECK constraint for subcategory
-- ============================================
-- Add 'sake' and 'shochu' to allowed subcategories

ALTER TABLE spirits DROP CONSTRAINT IF EXISTS spirits_subcategory_check;
ALTER TABLE spirits ADD CONSTRAINT spirits_subcategory_check CHECK (subcategory IN (
    -- Whisky
    'scotch_single_malt', 'scotch_blended', 'bourbon', 'tennessee',
    'rye', 'irish', 'japanese', 'canadian', 'world_whisky',
    -- Gin
    'london_dry', 'old_tom', 'navy_strength', 'contemporary',
    'genever', 'sloe_gin',
    -- Rum
    'white_rum', 'gold_rum', 'dark_rum', 'spiced_rum',
    'agricole', 'cachaca', 'overproof',
    -- Vodka
    'neutral_vodka', 'flavored_vodka', 'potato_vodka', 'grape_vodka',
    -- Tequila & Mezcal
    'tequila_blanco', 'tequila_reposado', 'tequila_anejo',
    'tequila_extra_anejo', 'mezcal_joven', 'mezcal_reposado', 'mezcal_anejo',
    -- Brandy & Cognac
    'cognac_vs', 'cognac_vsop', 'cognac_xo', 'armagnac',
    'calvados', 'grappa', 'pisco', 'brandy_generic',
    -- Amari & Liqueurs
    'amaro_bitter', 'amaro_alpine', 'amaro_citrus', 'amaro_fernet',
    'liqueur_herbal', 'liqueur_cream', 'liqueur_fruit', 'liqueur_nut',
    'liqueur_coffee', 'liqueur_anise',
    -- Other / Asian Spirits
    'absinthe', 'aquavit', 'sake', 'soju', 'shochu', 'baijiu', 'other_spirit'
));

-- ============================================
-- STEP 2: Missing Ingredients for Asian Spirits
-- ============================================

INSERT INTO ingredients (id, slug, name, description, category, allergens, intolerances, dietary)
VALUES
-- Fermentation Starters
('ING_KOJI', 'koji', 'Koji', 'Aspergillus oryzae mold used in sake, shochu, and soy sauce fermentation', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_BLACK_KOJI', 'black-koji', 'Black Koji', 'Aspergillus luchuensis mold, traditional for shochu fermentation', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_RED_KOJI', 'red-koji', 'Red Koji', 'Red rice koji used in some shochu varieties', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_NURUK', 'nuruk', 'Nuruk', 'Korean fermentation starter made from wheat and wild yeasts', 'other',
 '[\"gluten\"]'::jsonb, '[\"gluten\"]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

('ING_QU', 'qu', 'Qu', 'Chinese fermentation starter used for baijiu production', 'other',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Grains & Base Ingredients
('ING_SORGHUM', 'sorghum', 'Sorghum', 'Ancient grain, primary ingredient in Chinese baijiu', 'grains',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb),

-- Fruits
('ING_UME_PLUM', 'ume-plum', 'Ume Plum', 'Japanese plum used for umeshu liqueur', 'fruits',
 '[]'::jsonb, '[]'::jsonb, '{"is_vegan": true, "is_vegetarian": true}'::jsonb)

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STEP 3: Insert Asian Spirits Data
-- ============================================

INSERT INTO spirits (
  id, slug, name, brand, description, category, subcategory, status,
  country, region, distillery, abv, volume_ml, base_ingredient, production_method,
  cask_type, flavor_profiles, tasting_notes, color, nose, palate, finish,
  serving_suggestions, cocktail_uses, food_pairings, optimal_temperature,
  allergens, is_gluten_free, is_vegan, is_organic, is_kosher,
  price_tier, tags, popularity, year_established, ingredient_ids
) VALUES

-- =============================================
-- SAKE - Japanese Rice Wine (Nihonshu)
-- =============================================
('SPI_DASSAI_23', 'dassai-23-junmai-daiginjo', 'Dassai 23', 'Asahi Shuzo',
 'The pinnacle of Dassai''s craft, this Junmai Daiginjo is polished to an extraordinary 23% - meaning 77% of each rice grain is milled away. Made from Yamada Nishiki rice in Yamaguchi Prefecture, it offers unparalleled elegance and complexity.',
 'other', 'sake', 'ultra_premium', 'Japan', 'japan', 'Asahi Shuzo Co.',
 16, 720, 'Yamada Nishiki rice', 'koji fermentation, 23% polishing ratio', NULL,
 ARRAY['floral', 'fruity', 'clean', 'complex'], 'Elegant pear, melon, subtle honey, silky texture',
 'crystal clear', 'Delicate white flowers, pear, melon', 'Silky, refined sweetness with layers of fruit',
 'Long, clean, ethereal', ARRAY['chilled', 'wine glass'], NULL, ARRAY['sashimi', 'oysters', 'light appetizers'],
 'chilled 8-12C', ARRAY[]::TEXT[], true, true, false, false,
 'ultra_premium', ARRAY['junmai daiginjo', 'premium sake', 'Yamaguchi', 'polished rice'], 95, 1948,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_DASSAI_45', 'dassai-45-junmai-daiginjo', 'Dassai 45', 'Asahi Shuzo',
 'The accessible entry into Dassai''s world of premium sake. Polished to 45%, this Junmai Daiginjo offers the signature Dassai elegance at a more approachable level.',
 'other', 'sake', 'premium', 'Japan', 'japan', 'Asahi Shuzo Co.',
 16, 720, 'Yamada Nishiki rice', 'koji fermentation, 45% polishing ratio', NULL,
 ARRAY['fruity', 'clean', 'sweet'], 'Apple, banana, honey, clean finish',
 'crystal clear', 'Fresh fruit, subtle rice sweetness', 'Smooth, fruity with balanced sweetness',
 'Medium, clean', ARRAY['chilled', 'room temperature'], NULL, ARRAY['sushi', 'tempura', 'grilled fish'],
 'chilled 10-15C', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['junmai daiginjo', 'Yamaguchi', 'entry premium'], 88, 1948,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_KUBOTA_MANJU', 'kubota-manju-junmai-daiginjo', 'Kubota Manju', 'Asahi-Shuzo (Niigata)',
 'The crown jewel of the Kubota line from Niigata''s Asahi-Shuzo brewery. This Junmai Daiginjo represents the epitome of Niigata''s tanrei karakuchi (light and dry) style.',
 'other', 'sake', 'ultra_premium', 'Japan', 'japan', 'Asahi-Shuzo (Niigata)',
 15.5, 720, 'Gohyakumangoku rice', 'koji fermentation, 50% polishing ratio', NULL,
 ARRAY['clean', 'floral', 'fruity'], 'Refined melon, subtle floral, mineral finish',
 'crystal clear', 'Elegant melon, white flowers', 'Light, dry, incredibly smooth',
 'Long, mineral, crisp', ARRAY['chilled'], NULL, ARRAY['white fish sashimi', 'delicate Japanese cuisine'],
 'chilled 8-10C', ARRAY[]::TEXT[], true, true, false, false,
 'ultra_premium', ARRAY['junmai daiginjo', 'Niigata', 'tanrei karakuchi', 'premium'], 92, 1830,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_HAKKAISAN_JUNMAI', 'hakkaisan-junmai-daiginjo', 'Hakkaisan Junmai Daiginjo', 'Hakkaisan',
 'From the snow country of Niigata, named after Mount Hakkai. This premium Junmai Daiginjo is brewed with pure snowmelt water and polished to 45%.',
 'other', 'sake', 'premium', 'Japan', 'japan', 'Hakkaisan Brewery',
 15.5, 720, 'Yamada Nishiki rice', 'koji fermentation, snowmelt water', NULL,
 ARRAY['clean', 'fruity', 'floral'], 'Pear, apple, subtle umami, pristine finish',
 'crystal clear', 'Fresh fruit, snow-like purity', 'Clean, slightly dry, elegant',
 'Crisp, refreshing', ARRAY['chilled', 'slightly warm'], NULL, ARRAY['sushi', 'light seafood', 'tofu dishes'],
 'chilled 10-15C', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['junmai daiginjo', 'Niigata', 'snow country', 'Mount Hakkai'], 87, 1922,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_JIKON_JUNMAI', 'jikon-junmai-ginjo', 'Jikon Junmai Ginjo', 'Kiyasho Brewery',
 'A cult favorite from Mie Prefecture, Jikon (meaning "the present moment") is almost impossible to find outside Japan. Made with Yamada Nishiki rice, it balances sweetness and umami beautifully.',
 'other', 'sake', 'ultra_premium', 'Japan', 'japan', 'Kiyasho Brewery',
 16, 720, 'Yamada Nishiki rice', 'traditional koji fermentation', NULL,
 ARRAY['fruity', 'sweet', 'complex'], 'Tropical fruit, pineapple, rice sweetness, umami',
 'crystal clear', 'Pineapple, tropical notes, rice aroma', 'Rich, sweet, beautifully balanced umami',
 'Long, satisfying', ARRAY['chilled'], NULL, ARRAY['rich seafood', 'Japanese comfort food'],
 'chilled 10-12C', ARRAY[]::TEXT[], true, true, false, false,
 'ultra_premium', ARRAY['junmai ginjo', 'Mie', 'rare sake', 'cult favorite'], 90, 1818,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_KOKURYU_ISHIDAYA', 'kokuryu-ishidaya-junmai-daiginjo', 'Kokuryu Ishidaya', 'Kokuryu',
 'From Fukui Prefecture''s legendary Kokuryu brewery, Ishidaya is their pinnacle expression. Using locally grown Gohyakumangoku rice and exceptional craftsmanship.',
 'other', 'sake', 'ultra_premium', 'Japan', 'japan', 'Kokuryu Shuzo',
 16, 720, 'Gohyakumangoku rice', 'traditional brewing, extended aging', NULL,
 ARRAY['complex', 'fruity', 'sweet'], 'Melon, pear, subtle spice, rice richness',
 'crystal clear', 'Rich fruit, subtle complexity', 'Full, layered, elegant sweetness',
 'Long, refined, memorable', ARRAY['chilled', 'wine glass'], NULL, ARRAY['kaiseki cuisine', 'fine sashimi'],
 'chilled 10-12C', ARRAY[]::TEXT[], true, true, false, false,
 'luxury', ARRAY['junmai daiginjo', 'Fukui', 'flagship', 'premium'], 88, 1804,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_ISOJIMAN_JUNMAI', 'isojiman-junmai-daiginjo', 'Isojiman Junmai Daiginjo', 'Isojiman',
 'From Shizuoka Prefecture, Isojiman is known for producing exceptionally clean sake. This Junmai Daiginjo showcases the brewery''s dedication to purity and elegance.',
 'other', 'sake', 'premium', 'Japan', 'japan', 'Isojiman Shuzo',
 16, 720, 'Yamada Nishiki rice', 'traditional soft water brewing', NULL,
 ARRAY['clean', 'floral', 'fruity'], 'White peach, gentle floral, mineral',
 'crystal clear', 'Subtle fruit, clean', 'Delicate, pure, balanced',
 'Clean, refreshing', ARRAY['chilled'], NULL, ARRAY['light sashimi', 'steamed dishes'],
 'chilled 8-12C', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['junmai daiginjo', 'Shizuoka', 'clean sake', 'elegant'], 85, 1830,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_HAKURAKUSEI_JUNMAI', 'hakurakusei-junmai-daiginjo', 'Hakurakusei Junmai Daiginjo', 'Niizawa Brewery',
 'From Miyagi Prefecture''s Niizawa Brewery, Hakurakusei ("white joy of the sky") is a stellar example of Tohoku brewing. Known for exceptional balance.',
 'other', 'sake', 'premium', 'Japan', 'japan', 'Niizawa Brewery',
 16, 720, 'Yamada Nishiki rice', 'cold fermentation, Miyagi yeast', NULL,
 ARRAY['fruity', 'clean', 'floral'], 'Green apple, pear, subtle sweetness',
 'crystal clear', 'Fresh fruit, apple blossom', 'Clean, fruity, beautifully balanced',
 'Medium, crisp', ARRAY['chilled', 'room temperature'], NULL, ARRAY['sushi', 'grilled seafood', 'Japanese cuisine'],
 'chilled 10-15C', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['junmai daiginjo', 'Miyagi', 'Tohoku', 'food-friendly'], 86, 1873,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_SUIGEI_TOKUBETSU', 'suigei-tokubetsu-junmai', 'Suigei Tokubetsu Junmai', 'Suigei',
 'From Kochi Prefecture, known for its clean, dry sake style. Suigei ("drunken whale") is brewed to be an excellent food companion with bright acidity.',
 'other', 'sake', 'active', 'Japan', 'japan', 'Suigei Brewing Company',
 15, 720, 'local rice', 'traditional Kochi style', NULL,
 ARRAY['clean', 'citrus', 'fruity'], 'Citrus, green apple, rice umami, dry finish',
 'crystal clear', 'Fresh citrus, subtle rice', 'Dry, bright acidity, clean',
 'Crisp, refreshing', ARRAY['chilled', 'room temperature'], NULL, ARRAY['katsuo tataki', 'grilled fish', 'izakaya food'],
 'chilled 12-15C', ARRAY[]::TEXT[], true, true, false, false,
 'standard', ARRAY['tokubetsu junmai', 'Kochi', 'dry sake', 'food pairing'], 80, 1872,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

('SPI_GEKKEIKAN_TRADITIONAL', 'gekkeikan-traditional', 'Gekkeikan Traditional', 'Gekkeikan',
 'Japan''s oldest and most recognized sake brand, founded in Fushimi, Kyoto in 1637. This traditional sake offers reliable quality and authentic flavor at an accessible price.',
 'other', 'sake', 'classic', 'Japan', 'japan', 'Gekkeikan Sake Company',
 15.6, 720, 'rice', 'traditional Kyoto style', NULL,
 ARRAY['clean', 'sweet', 'fruity'], 'Rice, subtle fruit, mild sweetness',
 'clear', 'Rice, gentle fruit', 'Smooth, balanced, approachable',
 'Clean, mild', ARRAY['chilled', 'room temperature', 'warm'], NULL, ARRAY['sushi', 'tempura', 'Japanese cuisine'],
 'versatile 5-45C', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['classic sake', 'Kyoto', 'accessible', 'versatile'], 82, 1637,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_KOJI']),

-- =============================================
-- SOJU - Korean Distilled Spirit
-- =============================================
('SPI_JINRO_CHAMISUL_ORIGINAL', 'jinro-chamisul-original', 'Jinro Chamisul Original', 'HiteJinro',
 'The world''s best-selling spirit by volume. Chamisul ("true dew") is the quintessential Korean soju, made with 100% Korean rice and bamboo-charcoal filtered four times.',
 'other', 'soju', 'classic', 'South Korea', 'korea', 'HiteJinro',
 20.1, 360, 'rice', 'charcoal filtration, dilution', NULL,
 ARRAY['clean', 'sweet'], 'Clean, subtle sweetness, smooth, neutral',
 'crystal clear', 'Neutral, faint sweetness', 'Smooth, clean, slightly sweet',
 'Clean, short', ARRAY['chilled', 'neat', 'mixed'], ARRAY['Soju Bomb', 'Korean cocktails', 'mixed drinks'],
 ARRAY['Korean BBQ', 'fried chicken', 'kimchi'], 'chilled',
 ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['soju', 'Korean classic', 'worlds best seller', 'everyday'], 95, 1924,
 ARRAY['ING_RICE', 'ING_WATER']),

('SPI_JINRO_CHAMISUL_FRESH', 'jinro-chamisul-fresh', 'Jinro Chamisul Fresh', 'HiteJinro',
 'A lighter, fresher version of the classic Chamisul at lower ABV. Five times filtered for extra smoothness, designed for easy drinking.',
 'other', 'soju', 'popular', 'South Korea', 'korea', 'HiteJinro',
 17.8, 360, 'rice', 'five-times charcoal filtration', NULL,
 ARRAY['clean', 'sweet'], 'Ultra smooth, light, fresh',
 'crystal clear', 'Clean, neutral', 'Very smooth, light sweetness',
 'Clean, refreshing', ARRAY['chilled', 'neat'], NULL, ARRAY['Korean fried chicken', 'Korean BBQ'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['soju', 'low ABV', 'smooth', 'fresh'], 90, 1924,
 ARRAY['ING_RICE', 'ING_WATER']),

('SPI_CHUM_CHURUM', 'chum-churum-soju', 'Chum Churum', 'Lotte Chilsung',
 'Major competitor to Jinro, meaning "like the first time." Made with alkaline water from Gangwon Province for exceptional softness.',
 'other', 'soju', 'popular', 'South Korea', 'korea', 'Lotte Chilsung Beverage',
 17, 360, 'rice', 'alkaline water, charcoal filtration', NULL,
 ARRAY['clean', 'sweet'], 'Soft, smooth, gentle sweetness',
 'crystal clear', 'Neutral, clean', 'Very soft, smooth',
 'Clean, mild', ARRAY['chilled'], NULL, ARRAY['Korean BBQ', 'Korean cuisine'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['soju', 'alkaline water', 'smooth', 'Lotte'], 88, 1998,
 ARRAY['ING_RICE', 'ING_WATER']),

('SPI_GOOD_DAY', 'good-day-soju', 'Good Day', 'Muhak',
 'Popular soju from Busan''s Muhak distillery, known for its clean taste and competitive pricing. A favorite in southern Korea.',
 'other', 'soju', 'active', 'South Korea', 'korea', 'Muhak',
 16.9, 360, 'rice', 'natural bamboo charcoal filtration', NULL,
 ARRAY['clean', 'sweet'], 'Clean, smooth, mild sweetness',
 'crystal clear', 'Neutral', 'Smooth, clean',
 'Light, clean', ARRAY['chilled'], NULL, ARRAY['Korean street food', 'fried foods'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['soju', 'Busan', 'budget-friendly', 'everyday'], 80, 1929,
 ARRAY['ING_RICE', 'ING_WATER']),

('SPI_ANDONG_SOJU', 'andong-soju-traditional', 'Andong Soju', 'Andong Soju',
 'Traditional artisanal soju from Andong, made using centuries-old methods. Unlike commercial soju, this is truly distilled from rice and represents Korea''s authentic soju heritage.',
 'other', 'soju', 'craft', 'South Korea', 'korea', 'Andong Soju Distillery',
 45, 375, 'rice', 'traditional pot distillation', NULL,
 ARRAY['complex', 'sweet', 'fruity'], 'Rice, subtle fruit, honey, smooth warmth',
 'crystal clear', 'Rice, floral, subtle sweetness', 'Rich, smooth, complex',
 'Long, warming, elegant', ARRAY['neat', 'room temperature'], NULL, ARRAY['traditional Korean cuisine', 'aged foods'],
 'room temperature', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['traditional soju', 'artisanal', 'Andong', 'heritage'], 75, 1400,
 ARRAY['ING_RICE', 'ING_WATER', 'ING_NURUK']),

('SPI_HWAYO_41', 'hwayo-41-premium-soju', 'Hwayo 41', 'Hwayo',
 'Ultra-premium Korean soju made from 100% Korean rice and distilled to 41% ABV. Represents the finest of modern Korean craft distilling.',
 'other', 'soju', 'premium', 'South Korea', 'korea', 'Kwangjuyo',
 41, 375, 'rice', 'vacuum distillation', NULL,
 ARRAY['clean', 'complex', 'sweet'], 'Refined rice, subtle vanilla, elegant sweetness',
 'crystal clear', 'Clean rice, subtle vanilla', 'Smooth, refined, complex',
 'Long, elegant, warming', ARRAY['neat', 'on the rocks'], NULL, ARRAY['fine Korean cuisine', 'premium seafood'],
 'slightly chilled', ARRAY[]::TEXT[], true, true, false, false,
 'ultra_premium', ARRAY['premium soju', 'craft', 'high ABV', 'luxury'], 78, 2008,
 ARRAY['ING_RICE', 'ING_WATER']),

('SPI_JINRO_GRAPEFRUIT', 'jinro-grapefruit-soju', 'Jinro Grapefruit', 'HiteJinro',
 'Flavored soju with natural grapefruit taste. Part of Jinro''s popular fruit soju line, perfect for easy drinking and mixing.',
 'other', 'soju', 'popular', 'South Korea', 'korea', 'HiteJinro',
 13, 360, 'rice', 'flavored soju', NULL,
 ARRAY['fruity', 'citrus', 'sweet'], 'Fresh grapefruit, sweet, refreshing',
 'pale pink', 'Grapefruit, citrus', 'Sweet, fruity, light',
 'Clean, refreshing', ARRAY['chilled', 'on the rocks', 'mixed'], NULL, ARRAY['Korean fried chicken', 'light snacks'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['flavored soju', 'grapefruit', 'fruit soju', 'refreshing'], 85, 1924,
 ARRAY['ING_RICE', 'ING_GRAPEFRUIT', 'ING_WATER']),

('SPI_JINRO_PEACH', 'jinro-peach-soju', 'Jinro Peach', 'HiteJinro',
 'Sweet peach-flavored soju, one of the most popular fruit soju variants. Perfect for those who prefer sweeter, more approachable spirits.',
 'other', 'soju', 'popular', 'South Korea', 'korea', 'HiteJinro',
 13, 360, 'rice', 'flavored soju', NULL,
 ARRAY['fruity', 'sweet'], 'Sweet peach, candy-like, smooth',
 'pale peach', 'Sweet peach, fruity', 'Sweet, peachy, smooth',
 'Sweet, clean', ARRAY['chilled', 'on the rocks'], NULL, ARRAY['desserts', 'light Korean dishes'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['flavored soju', 'peach', 'fruit soju', 'sweet'], 87, 1924,
 ARRAY['ING_RICE', 'ING_PEACH', 'ING_WATER']),

-- =============================================
-- SHOCHU - Japanese Distilled Spirit
-- =============================================
('SPI_IICHIKO_SILHOUETTE', 'iichiko-silhouette', 'Iichiko Silhouette', 'Sanwa Shurui',
 'Japan''s most popular premium shochu, made from barley in Oita Prefecture. "Iichiko" means "that''s good!" in local dialect. Clean and smooth with subtle grain character.',
 'other', 'shochu', 'popular', 'Japan', 'japan', 'Sanwa Shurui',
 25, 720, 'barley', 'atmospheric distillation, white koji', NULL,
 ARRAY['clean', 'nutty', 'sweet'], 'Clean barley, subtle sweetness, smooth',
 'crystal clear', 'Gentle grain, subtle sweetness', 'Smooth, clean, light grain notes',
 'Clean, mild, pleasant', ARRAY['on the rocks', 'mizuwari', 'oyuwari'], ARRAY['Shochu Highball', 'chu-hai'],
 ARRAY['izakaya food', 'grilled dishes', 'sashimi'], 'versatile',
 ARRAY['gluten'], false, true, false, false,
 'standard', ARRAY['mugi shochu', 'barley', 'Oita', 'bestseller'], 90, 1979,
 ARRAY['ING_BARLEY', 'ING_WATER', 'ING_KOJI']),

('SPI_IICHIKO_FRASCO', 'iichiko-frasco', 'Iichiko Frasco', 'Sanwa Shurui',
 'Premium aged expression of Iichiko, matured in a variety of casks for added complexity. Named after the Portuguese word for flask.',
 'other', 'shochu', 'premium', 'Japan', 'japan', 'Sanwa Shurui',
 30, 720, 'barley', 'atmospheric distillation, cask aging', NULL,
 ARRAY['woody', 'vanilla', 'complex'], 'Vanilla, oak, caramel, grain',
 'pale gold', 'Oak, vanilla, subtle grain', 'Smooth, oak-influenced, complex',
 'Long, warm, pleasant oak', ARRAY['neat', 'on the rocks'], NULL, ARRAY['grilled meats', 'rich dishes'],
 'room temperature or chilled', ARRAY['gluten'], false, true, false, false,
 'premium', ARRAY['aged shochu', 'barley', 'cask aged', 'premium'], 82, 1979,
 ARRAY['ING_BARLEY', 'ING_WATER', 'ING_KOJI']),

('SPI_MORI_IZO', 'mori-izo-shochu', 'Mori Izo', 'Morinaga Brewing',
 'Legendary imo (sweet potato) shochu from Kagoshima, aged for 3 years. Named after the founder''s grandfather, it''s one of the most sought-after shochus in Japan.',
 'other', 'shochu', 'ultra_premium', 'Japan', 'japan', 'Morinaga Brewing',
 25, 720, 'sweet potato', 'pot distillation, 3-year aging', NULL,
 ARRAY['sweet', 'complex', 'fruity'], 'Sweet potato, vanilla, caramel, dried fruit',
 'pale straw', 'Sweet potato, vanilla, subtle fruit', 'Rich, smooth, complex sweetness',
 'Long, satisfying, lingering', ARRAY['neat', 'on the rocks', 'oyuwari'], NULL,
 ARRAY['rich dishes', 'grilled pork', 'Kagoshima cuisine'], 'room temperature',
 ARRAY[]::TEXT[], true, true, false, false,
 'ultra_premium', ARRAY['imo shochu', 'sweet potato', 'Kagoshima', 'aged', 'rare'], 88, 1885,
 ARRAY['ING_SWEET_POTATO', 'ING_WATER', 'ING_KOJI']),

('SPI_KIRISHIMA_KURO', 'kirishima-kuro-shochu', 'Kirishima Kuro', 'Kirishima Shuzo',
 'One of Kagoshima''s most beloved imo shochus, made with black koji for rich, earthy flavors. "Kuro" means black, referring to the dark koji used.',
 'other', 'shochu', 'classic', 'Japan', 'japan', 'Kirishima Shuzo',
 25, 720, 'sweet potato', 'black koji fermentation', NULL,
 ARRAY['sweet', 'complex'], 'Rich sweet potato, earthy, subtle cocoa',
 'crystal clear', 'Sweet potato, earth, subtle richness', 'Full, earthy, satisfying',
 'Medium, warm', ARRAY['on the rocks', 'oyuwari', 'mizuwari'], NULL, ARRAY['tonkatsu', 'grilled meats', 'rich dishes'],
 'versatile', ARRAY[]::TEXT[], true, true, false, false,
 'standard', ARRAY['imo shochu', 'black koji', 'Kagoshima', 'classic'], 85, 1916,
 ARRAY['ING_SWEET_POTATO', 'ING_WATER', 'ING_BLACK_KOJI']),

('SPI_KIRISHIMA_AKA', 'kirishima-aka-shochu', 'Kirishima Aka', 'Kirishima Shuzo',
 'Made with red koji, offering a different flavor profile from its black koji sibling. "Aka" means red. Slightly more aromatic and fruitier than Kuro.',
 'other', 'shochu', 'popular', 'Japan', 'japan', 'Kirishima Shuzo',
 25, 720, 'sweet potato', 'red koji fermentation', NULL,
 ARRAY['fruity', 'sweet', 'floral'], 'Fruity sweet potato, floral, light',
 'crystal clear', 'Fruity, floral, sweet potato', 'Light, fruity, aromatic',
 'Clean, pleasant', ARRAY['on the rocks', 'mizuwari'], NULL, ARRAY['light dishes', 'seafood', 'salads'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'standard', ARRAY['imo shochu', 'red koji', 'Kagoshima', 'fruity'], 82, 1916,
 ARRAY['ING_SWEET_POTATO', 'ING_WATER', 'ING_RED_KOJI']),

('SPI_SATSUMA_SHIRANAMI', 'satsuma-shiranami', 'Satsuma Shiranami', 'Satsuma Shuzo',
 'Classic Kagoshima imo shochu whose name means "white waves of Satsuma." An excellent everyday shochu representing authentic Kagoshima flavor.',
 'other', 'shochu', 'classic', 'Japan', 'japan', 'Satsuma Shuzo',
 25, 720, 'sweet potato', 'atmospheric distillation', NULL,
 ARRAY['sweet', 'clean'], 'Clean sweet potato, mild, easy drinking',
 'crystal clear', 'Mild sweet potato', 'Smooth, clean, balanced',
 'Clean, mild', ARRAY['oyuwari', 'mizuwari', 'on the rocks'], NULL, ARRAY['everyday Japanese food', 'grilled dishes'],
 'versatile', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['imo shochu', 'Kagoshima', 'everyday', 'classic'], 78, 1936,
 ARRAY['ING_SWEET_POTATO', 'ING_WATER', 'ING_KOJI']),

('SPI_TAKARA_YOKAICHI', 'takara-yokaichi-mugi', 'Takara Yokaichi Mugi', 'Takara Shuzo',
 'Accessible barley shochu from major producer Takara. Clean and smooth, designed for easy drinking and versatile mixing.',
 'other', 'shochu', 'active', 'Japan', 'japan', 'Takara Shuzo',
 25, 720, 'barley', 'continuous distillation', NULL,
 ARRAY['clean', 'nutty'], 'Clean, light grain, neutral',
 'crystal clear', 'Light grain, neutral', 'Smooth, clean, easy',
 'Short, clean', ARRAY['chu-hai', 'highball', 'on the rocks'], ARRAY['Shochu Highball', 'cocktails'],
 ARRAY['everyday food', 'izakaya dishes'], 'chilled',
 ARRAY['gluten'], false, true, false, false,
 'budget', ARRAY['mugi shochu', 'barley', 'budget', 'mixer'], 70, 1842,
 ARRAY['ING_BARLEY', 'ING_WATER', 'ING_KOJI']),

-- =============================================
-- UMESHU - Japanese Plum Wine/Liqueur
-- =============================================
('SPI_CHOYA_ORIGINAL', 'choya-umeshu-original', 'Choya Original', 'Choya',
 'The world''s best-known umeshu, made with 100% Japanese ume plums. Sweet and fruity with whole plums in the bottle. A perfect introduction to Japanese plum liqueur.',
 'amari_liqueurs', 'liqueur_fruit', 'classic', 'Japan', 'japan', 'Choya Umeshu Co.',
 15, 750, 'ume plum', 'plum maceration in neutral spirit and sugar', NULL,
 ARRAY['sweet', 'fruity'], 'Sweet plum, almond, honey, apricot',
 'golden amber', 'Fresh ume plum, almond, honey', 'Sweet, fruity, balanced acidity',
 'Medium, fruity, pleasant', ARRAY['on the rocks', 'with soda', 'chilled'], ARRAY['Umeshu Soda', 'Umeshu Cocktails'],
 ARRAY['desserts', 'Japanese cuisine', 'as digestif'], 'chilled',
 ARRAY[]::TEXT[], true, true, false, false,
 'standard', ARRAY['umeshu', 'plum', 'Japanese liqueur', 'sweet'], 88, 1959,
 ARRAY['ING_UME_PLUM', 'ING_SUGAR']),

('SPI_CHOYA_EXTRA_YEARS', 'choya-extra-years', 'Choya Extra Years', 'Choya',
 'Aged umeshu with deeper, more complex flavors than the original. Extended maturation develops rich caramel and dried fruit notes.',
 'amari_liqueurs', 'liqueur_fruit', 'premium', 'Japan', 'japan', 'Choya Umeshu Co.',
 17, 750, 'ume plum', 'extended maceration and aging', NULL,
 ARRAY['sweet', 'complex', 'caramel'], 'Aged plum, caramel, dried fruit, almond',
 'deep amber', 'Rich plum, caramel, dried fruit', 'Complex, rich, balanced sweetness',
 'Long, satisfying, layered', ARRAY['neat', 'on the rocks'], NULL, ARRAY['desserts', 'cheese', 'as digestif'],
 'room temperature or chilled', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['umeshu', 'aged', 'premium', 'complex'], 82, 1959,
 ARRAY['ING_UME_PLUM', 'ING_SUGAR']),

('SPI_CHOYA_SINGLE_YEAR', 'choya-single-year', 'Choya Single Year', 'Choya',
 'Premium umeshu with hand-selected plums of a single vintage. Higher ABV and more refined than standard offerings.',
 'amari_liqueurs', 'liqueur_fruit', 'premium', 'Japan', 'japan', 'Choya Umeshu Co.',
 18, 650, 'ume plum', 'single vintage, traditional maceration', NULL,
 ARRAY['fruity', 'complex', 'sweet'], 'Fresh plum, floral, refined sweetness',
 'amber', 'Fresh ume, floral notes', 'Elegant, balanced, nuanced',
 'Medium-long, clean', ARRAY['neat', 'slightly chilled'], NULL, ARRAY['fine dining', 'premium Japanese cuisine'],
 'slightly chilled', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['umeshu', 'single vintage', 'premium', 'craft'], 78, 1959,
 ARRAY['ING_UME_PLUM', 'ING_SUGAR']),

('SPI_SUNTORY_UMESHU', 'suntory-umeshu', 'Suntory Umeshu', 'Suntory',
 'From beverage giant Suntory, this umeshu offers reliable quality with balanced sweetness and authentic plum flavor.',
 'amari_liqueurs', 'liqueur_fruit', 'active', 'Japan', 'japan', 'Suntory',
 14, 750, 'ume plum', 'traditional maceration', NULL,
 ARRAY['sweet', 'fruity'], 'Sweet plum, balanced, approachable',
 'golden', 'Plum, light sweetness', 'Sweet, balanced, smooth',
 'Clean, pleasant', ARRAY['on the rocks', 'with soda'], NULL, ARRAY['Japanese cuisine', 'desserts'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'standard', ARRAY['umeshu', 'Suntory', 'reliable', 'everyday'], 75, 1899,
 ARRAY['ING_UME_PLUM', 'ING_SUGAR']),

('SPI_TAKARA_UMESHU', 'takara-umeshu-plum', 'Takara Plum', 'Takara Shuzo',
 'Quality umeshu from Takara at an accessible price point. Made with carefully selected ume plums for authentic flavor.',
 'amari_liqueurs', 'liqueur_fruit', 'active', 'Japan', 'japan', 'Takara Shuzo',
 13, 750, 'ume plum', 'traditional maceration', NULL,
 ARRAY['sweet', 'fruity'], 'Plum, sweet, light',
 'light amber', 'Fresh plum, sweet', 'Light, sweet, fruity',
 'Short, clean', ARRAY['on the rocks', 'with soda', 'in cocktails'], NULL, ARRAY['casual dining', 'snacks'],
 'chilled', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['umeshu', 'budget', 'accessible', 'mixer'], 70, 1842,
 ARRAY['ING_UME_PLUM', 'ING_SUGAR']),

-- =============================================
-- BAIJIU - Chinese White Spirit (additional)
-- =============================================
('SPI_JIANNANCHUN', 'jiannanchun-classic', 'Jiannanchun', 'Jiannanchun Group',
 'One of China''s "Big Four" baijius, from Sichuan Province. Known for its strong aroma style with sweet, fruity notes.',
 'other', 'baijiu', 'premium', 'China', 'china', 'Jiannanchun Group',
 52, 500, 'sorghum', 'strong aroma fermentation', NULL,
 ARRAY['fruity', 'sweet', 'complex'], 'Tropical fruit, pineapple, sweet grain',
 'crystal clear', 'Fruity, pineapple, floral', 'Rich, sweet, fruity',
 'Long, lingering sweetness', ARRAY['neat', 'room temperature'], NULL, ARRAY['Sichuan cuisine', 'Chinese banquet'],
 'room temperature', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['baijiu', 'strong aroma', 'Sichuan', 'Chinese classic'], 85, 1951,
 ARRAY['ING_SORGHUM', 'ING_WATER', 'ING_QU']),

('SPI_XIFENG_JIU', 'xifeng-jiu-classic', 'Xifeng Jiu', 'Xifeng',
 'From Shaanxi Province, representing the unique "feng aroma" style - a blend of light and strong aroma characteristics. One of China''s four famous spirits with 3,000 years of history.',
 'other', 'baijiu', 'premium', 'China', 'china', 'Xifeng Liquor Co.',
 55, 500, 'sorghum', 'feng aroma style, mud pit fermentation', NULL,
 ARRAY['complex', 'fruity', 'spicy'], 'Apple, anise, honey, gentle spice',
 'crystal clear', 'Fruity, subtle anise', 'Complex, balanced sweetness and spice',
 'Long, warming', ARRAY['neat', 'room temperature'], NULL, ARRAY['Shaanxi cuisine', 'lamb dishes', 'noodles'],
 'room temperature', ARRAY[]::TEXT[], true, true, false, false,
 'premium', ARRAY['baijiu', 'feng aroma', 'Shaanxi', 'ancient heritage'], 80, 1956,
 ARRAY['ING_SORGHUM', 'ING_BARLEY', 'ING_WATER', 'ING_QU']),

('SPI_NIULANSHAN_ERGUOTOU', 'niulanshan-erguotou', 'Niulanshan Erguotou', 'Niulanshan',
 'Beijing''s favorite erguotou, an everyday light aroma baijiu loved for its clean, straightforward character and incredibly affordable price. The working-class hero of Chinese spirits.',
 'other', 'baijiu', 'active', 'China', 'china', 'Niulanshan Distillery',
 56, 500, 'sorghum', 'light aroma, solid-state fermentation', NULL,
 ARRAY['clean', 'spicy'], 'Clean grain, mild spice, straightforward',
 'crystal clear', 'Clean, grain, subtle', 'Clean, dry, warm',
 'Quick, warming', ARRAY['neat', 'with food'], NULL, ARRAY['Beijing street food', 'dumplings', 'everyday meals'],
 'room temperature', ARRAY[]::TEXT[], true, true, false, false,
 'budget', ARRAY['baijiu', 'erguotou', 'Beijing', 'everyday', 'budget'], 75, 1952,
 ARRAY['ING_SORGHUM', 'ING_WATER', 'ING_QU'])

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STEP 4: Update product_taxonomy
-- ============================================
-- No changes needed - spirits already in taxonomy

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these after import to verify:

-- SELECT COUNT(*) as total_spirits FROM spirits;
-- SELECT subcategory, COUNT(*) FROM spirits WHERE subcategory IN ('sake', 'soju', 'shochu', 'baijiu') GROUP BY subcategory;
-- SELECT COUNT(*) FROM spirits WHERE category = 'other';
