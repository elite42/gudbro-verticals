-- ============================================================================
-- IBA Unforgettables Cocktails - Complete Seed Data (FIXED)
-- ============================================================================
-- This file contains INSERT statements for all 21 IBA Unforgettables cocktails
-- FIXED: Uses correct column names matching create-cocktails-table.sql schema
--
-- Changes from previous version:
-- - computed (JSONB) → computed_allergens, computed_intolerances, computed_diets, computed_spice_level
-- - source (JSONB) → source_url, source_note
-- - variants now TEXT[] (simple array)
--
-- Usage: Execute in Supabase SQL Editor AFTER running create-cocktails-table.sql
-- ============================================================================

-- First, add 'premium' to price_tier constraint if not already present
DO $$
BEGIN
  ALTER TABLE cocktails DROP CONSTRAINT IF EXISTS cocktails_price_tier_check;
  ALTER TABLE cocktails ADD CONSTRAINT cocktails_price_tier_check
    CHECK (price_tier IN ('low', 'mid', 'high', 'premium'));
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- ============================================================================
-- 1. ALEXANDER
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '133dd203-39eb-40b4-95c5-a665306e0bcc',
  'alexander',
  '22e80616ae87d60827ded6f473074b5a9b991f35',
  '{"en": "Alexander", "it": "Alexander", "vi": "Alexander", "ko": "알렉산더", "ja": "アレキサンダー"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'creamy', 'dessert', 'after-dinner'],
  '{"en": "A luxurious, creamy cocktail combining cognac with crème de cacao and fresh cream. Often called a \"drinkable dessert,\" the Alexander is the perfect after-dinner indulgence.", "it": "Un cocktail lussuoso e cremoso che combina cognac con crème de cacao e panna fresca.", "vi": "Một loại cocktail sang trọng, béo ngậy kết hợp cognac với crème de cacao và kem tươi."}',
  '{"created_year": "1915", "origin": {"city": "New York City", "bar": "Rector''s Restaurant", "country": "USA"}, "creator": {"name": "Troy Alexander", "profession": "bartender"}}',
  '{"profile": ["creamy", "sweet", "boozy"], "description": {"en": "Rich, velvety, and indulgent."}}',
  '{"best_time": ["evening", "late_night"], "occasions": ["digestivo", "date_night", "celebration"]}',
  '[{"ingredient_id": "ING_COGNAC", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_CREME_DE_CACAO_DARK", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_HEAVY_CREAM", "quantity": {"amount": 30, "unit": "ml"}}]',
  'shake',
  '{"en": "Pour all ingredients into a cocktail shaker filled with ice. Shake well. Strain into a chilled cocktail glass. Sprinkle fresh grated nutmeg on top.", "it": "Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene. Filtrare in una coppa raffreddata. Spolverare con noce moscata.", "vi": "Đổ tất cả nguyên liệu vào bình lắc đầy đá. Lắc kỹ. Lọc vào ly cocktail lạnh. Rắc nhục đậu khấu lên trên."}',
  'Cocktail glass (Martini)',
  '{"en": "Freshly grated nutmeg", "it": "Noce moscata appena grattugiata", "vi": "Nhục đậu khấu mới xay"}',
  'none',
  'up',
  ARRAY['ING_COGNAC'],
  ARRAY['creamy', 'sweet', 'boozy'],
  18,
  280,
  'easy',
  60,
  ARRAY['milk', 'sulphites'],
  ARRAY['lactose', 'alcohol'],
  ARRAY['vegetarian', 'pescatarian', 'gluten_free'],
  0,
  ARRAY['vegetarian', 'gluten-free'],
  ARRAY['autumn', 'winter'],
  ARRAY['digestivo', 'date_night', 'celebration', 'nightcap'],
  false,
  false,
  ARRAY['brandy-alexander', 'coffee-alexander'],
  'Use freshly grated nutmeg, not pre-ground. Shake hard to emulsify the cream.',
  'mid',
  65,
  'https://iba-world.com/alexander/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  history = EXCLUDED.history,
  taste = EXCLUDED.taste,
  recommendations = EXCLUDED.recommendations,
  ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions,
  garnish = EXCLUDED.garnish,
  computed_allergens = EXCLUDED.computed_allergens,
  computed_intolerances = EXCLUDED.computed_intolerances,
  computed_diets = EXCLUDED.computed_diets,
  computed_spice_level = EXCLUDED.computed_spice_level,
  updated_at = NOW();

-- ============================================================================
-- 2. AMERICANO
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'e88e0064-517e-4adf-82ad-1b0193cd8c44',
  'americano',
  'americano-iba-unforgettable',
  '{"en": "Americano", "it": "Americano", "vi": "Americano", "ko": "아메리카노", "ja": "アメリカーノ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'aperitivo', 'bitter', 'low-abv', 'italian'],
  '{"en": "The original Italian aperitivo cocktail - a refreshing, bittersweet blend of Campari and sweet vermouth, lengthened with soda water.", "it": "L''originale cocktail aperitivo italiano - una miscela rinfrescante e agrodolce di Campari e vermouth rosso.", "vi": "Cocktail khai vị Ý nguyên bản - sự pha trộn tươi mát, đắng ngọt của Campari và vermouth ngọt."}',
  '{"created_year": "1860s", "origin": {"city": "Milan", "bar": "Gaspare Campari''s bar", "country": "Italy"}, "creator": {"name": "Gaspare Campari", "profession": "bar owner"}}',
  '{"profile": ["bitter", "sweet", "herbal", "refreshing"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["aperitivo", "casual"], "seasons": ["spring", "summer", "all_year"]}',
  '[{"ingredient_id": "ING_CAMPARI", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_VERMOUTH_SWEET", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_SODA_WATER", "quantity": {"amount": 0, "unit": "splash"}}]',
  'build',
  '{"en": "Mix the Campari and sweet vermouth directly in an old fashioned glass filled with ice cubes. Add a splash of soda water. Stir gently.", "it": "Mescolare il Campari e il vermouth rosso direttamente in un bicchiere old fashioned pieno di ghiaccio. Aggiungere soda. Mescolare delicatamente.", "vi": "Trộn Campari và vermouth ngọt trong ly old fashioned đầy đá. Thêm soda. Khuấy nhẹ."}',
  'Old Fashioned glass',
  '{"en": "Half orange slice and lemon twist", "it": "Mezza fetta d''arancia e twist di limone", "vi": "Nửa lát cam và vỏ chanh"}',
  'cubed',
  'on_the_rocks',
  ARRAY['ING_CAMPARI', 'ING_VERMOUTH_SWEET'],
  ARRAY['bitter', 'sweet', 'herbal', 'refreshing'],
  11,
  140,
  'easy',
  45,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer', 'all_year'],
  ARRAY['aperitivo', 'casual'],
  false,
  false,
  ARRAY['negroni', 'boulevardier'],
  'Perfect low-ABV option. Add more soda for a lighter drink.',
  'low',
  75,
  'https://iba-world.com/americano/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 3. ANGEL FACE
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'f3a91c71-2e82-4bf1-b3e5-9d05c2a8f7e1',
  'angel-face',
  'angel-face-iba-unforgettable',
  '{"en": "Angel Face", "it": "Angel Face", "vi": "Angel Face", "ko": "엔젤 페이스", "ja": "エンジェルフェイス"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'fruity', 'spirit-forward', 'prohibition-era'],
  '{"en": "A Prohibition-era classic with equal parts gin, apricot brandy, and calvados. Deceptively strong with fruity, floral notes.", "it": "Un classico dell''era del proibizionismo con parti uguali di gin, brandy all''albicocca e calvados.", "vi": "Một cocktail cổ điển thời Cấm rượu với phần bằng nhau của gin, brandy mơ và calvados."}',
  '{"created_year": "1920s", "origin": {"country": "USA"}}',
  '{"profile": ["fruity", "floral", "boozy", "complex"]}',
  '{"best_time": ["evening"], "occasions": ["cocktail_party", "date_night"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_APRICOT_BRANDY", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_CALVADOS", "quantity": {"amount": 30, "unit": "ml"}}]',
  'shake',
  '{"en": "Pour all ingredients into a cocktail shaker filled with ice. Shake well. Strain into a chilled cocktail glass.", "it": "Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene. Filtrare in una coppa raffreddata.", "vi": "Đổ tất cả nguyên liệu vào bình lắc đầy đá. Lắc kỹ. Lọc vào ly cocktail lạnh."}',
  'Cocktail glass (Martini)',
  '{"en": "None (or orange twist)", "it": "Nessuna (o twist d''arancia)", "vi": "Không (hoặc vỏ cam)"}',
  'none',
  'up',
  ARRAY['ING_GIN', 'ING_CALVADOS'],
  ARRAY['fruity', 'floral', 'boozy', 'complex'],
  28,
  200,
  'easy',
  45,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['autumn', 'winter', 'all_year'],
  ARRAY['cocktail_party', 'date_night'],
  false,
  false,
  ARRAY[]::TEXT[],
  'Very strong despite fruity taste. Warn guests about ABV.',
  'mid',
  45,
  'https://iba-world.com/angel-face/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 4. AVIATION
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'a7b3d924-5c8f-4a91-b6e2-3f8c7d9e5a12',
  'aviation',
  'aviation-iba-unforgettable',
  '{"en": "Aviation", "it": "Aviation", "vi": "Aviation", "ko": "에비에이션", "ja": "アビエーション"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'floral', 'elegant', 'pre-prohibition'],
  '{"en": "A classic pre-Prohibition cocktail with a distinctive pale sky-blue color from crème de violette. Floral, slightly sweet, with maraschino complexity.", "it": "Un classico cocktail pre-proibizionismo con un caratteristico colore azzurro cielo dalla crème de violette.", "vi": "Một cocktail cổ điển trước Cấm rượu với màu xanh da trời nhạt đặc trưng từ crème de violette."}',
  '{"created_year": 1916, "origin": {"city": "New York", "country": "USA"}, "creator": {"name": "Hugo Ensslin", "profession": "bartender"}}',
  '{"profile": ["floral", "citrus", "complex", "elegant"]}',
  '{"best_time": ["evening"], "occasions": ["cocktail_party", "date_night", "celebration"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_MARASCHINO", "quantity": {"amount": 15, "unit": "ml"}}, {"ingredient_id": "ING_CREME_DE_VIOLETTE", "quantity": {"amount": 7.5, "unit": "ml"}}, {"ingredient_id": "ING_LEMON_JUICE", "quantity": {"amount": 15, "unit": "ml"}}]',
  'shake',
  '{"en": "Add all ingredients into a shaker with ice. Shake until well-chilled. Strain into a chilled cocktail glass.", "it": "Aggiungere tutti gli ingredienti in uno shaker con ghiaccio. Shakerare fino a raffreddare. Filtrare in una coppa raffreddata.", "vi": "Cho tất cả nguyên liệu vào bình lắc với đá. Lắc cho đến khi lạnh. Lọc vào ly cocktail lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "Maraschino cherry", "it": "Ciliegina al maraschino", "vi": "Cherry maraschino"}',
  'none',
  'up',
  ARRAY['ING_GIN'],
  ARRAY['floral', 'citrus', 'complex', 'elegant'],
  22,
  180,
  'medium',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer', 'all_year'],
  ARRAY['cocktail_party', 'date_night', 'celebration'],
  false,
  false,
  ARRAY['moonlight-cocktail'],
  'Crème de violette is essential for authentic color and taste. Use sparingly.',
  'high',
  70,
  'https://iba-world.com/aviation/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 5. BETWEEN THE SHEETS
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '755c577d-1679-419a-bb31-1e29145c726d',
  'between-the-sheets',
  'between-the-sheets-iba-unforgettable',
  '{"en": "Between the Sheets", "it": "Between the Sheets", "vi": "Between the Sheets", "ko": "비트윈 더 시트", "ja": "ビトウィーン・ザ・シーツ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'strong', 'citrus', 'prohibition-era'],
  '{"en": "A potent Prohibition-era cocktail combining cognac, light rum, and triple sec with fresh lemon. A variation on the Sidecar.", "it": "Un potente cocktail dell''era del proibizionismo che combina cognac, rum bianco e triple sec con limone fresco.", "vi": "Một cocktail mạnh thời Cấm rượu kết hợp cognac, rum trắng và triple sec với chanh tươi."}',
  '{"created_year": "1920s", "origin": {"city": "Paris", "country": "France"}, "creator": {"name": "Harry MacElhone", "profession": "bartender"}}',
  '{"profile": ["citrus", "boozy", "balanced", "complex"]}',
  '{"best_time": ["evening", "late_night"], "occasions": ["cocktail_party", "date_night"]}',
  '[{"ingredient_id": "ING_COGNAC", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_WHITE_RUM", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_TRIPLE_SEC", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_LEMON_JUICE", "quantity": {"amount": 20, "unit": "ml"}}]',
  'shake',
  '{"en": "Pour all ingredients into a shaker with ice. Shake well. Strain into a chilled cocktail glass.", "it": "Versare tutti gli ingredienti in uno shaker con ghiaccio. Shakerare bene. Filtrare in una coppa raffreddata.", "vi": "Đổ tất cả nguyên liệu vào bình lắc với đá. Lắc kỹ. Lọc vào ly cocktail lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "Lemon twist", "it": "Twist di limone", "vi": "Vỏ chanh"}',
  'none',
  'up',
  ARRAY['ING_COGNAC', 'ING_WHITE_RUM'],
  ARRAY['citrus', 'boozy', 'balanced', 'complex'],
  28,
  210,
  'easy',
  45,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['all_year'],
  ARRAY['cocktail_party', 'date_night'],
  false,
  false,
  ARRAY['sidecar', 'corpse-reviver-2'],
  'Very strong - similar to Sidecar but with rum added.',
  'mid',
  50,
  'https://iba-world.com/between-the-sheets/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 6. BOULEVARDIER
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '2e16bc8b-6b4a-47da-bc46-2a2df0572926',
  'boulevardier',
  'boulevardier-iba-unforgettable',
  '{"en": "Boulevardier", "it": "Boulevardier", "vi": "Boulevardier", "ko": "불르바르디에", "ja": "ブールヴァルディエ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'bitter', 'strong', 'whiskey'],
  '{"en": "A whiskey-based cousin of the Negroni, with bourbon replacing gin for a richer, warmer profile.", "it": "Un cugino del Negroni a base di whiskey, con bourbon al posto del gin per un profilo più ricco e caldo.", "vi": "Một phiên bản của Negroni dùng whiskey, với bourbon thay thế gin cho hương vị đậm đà, ấm áp hơn."}',
  '{"created_year": "1927", "origin": {"city": "Paris", "country": "France"}, "creator": {"name": "Erskine Gwynne", "profession": "writer/editor"}}',
  '{"profile": ["bitter", "sweet", "boozy", "complex"]}',
  '{"best_time": ["evening", "late_night"], "occasions": ["aperitivo", "digestivo", "date_night"]}',
  '[{"ingredient_id": "ING_BOURBON", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_CAMPARI", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_VERMOUTH_SWEET", "quantity": {"amount": 30, "unit": "ml"}}]',
  'stir',
  '{"en": "Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled cocktail glass or over ice in rocks glass.", "it": "Versare tutti gli ingredienti nel mixing glass con ghiaccio. Mescolare bene. Filtrare in una coppa raffreddata o su ghiaccio in un bicchiere rocks.", "vi": "Đổ tất cả nguyên liệu vào ly pha với đá. Khuấy kỹ. Lọc vào ly cocktail lạnh hoặc trên đá trong ly rocks."}',
  'Old Fashioned glass or cocktail glass',
  '{"en": "Orange twist", "it": "Twist d''arancia", "vi": "Vỏ cam"}',
  'large_cube',
  'on_the_rocks',
  ARRAY['ING_BOURBON'],
  ARRAY['bitter', 'sweet', 'boozy', 'complex'],
  24,
  220,
  'easy',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['autumn', 'winter'],
  ARRAY['aperitivo', 'digestivo', 'date_night'],
  false,
  false,
  ARRAY['negroni', 'old-pal'],
  'Can serve up or on the rocks. Rye whiskey also works well.',
  'mid',
  72,
  'https://iba-world.com/boulevardier/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 7. CLOVER CLUB
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '4c4c9059-44c4-4728-9af3-37747ff38013',
  'clover-club',
  'clover-club-iba-unforgettable',
  '{"en": "Clover Club", "it": "Clover Club", "vi": "Clover Club", "ko": "클로버 클럽", "ja": "クローバークラブ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'fruity', 'foamy', 'pre-prohibition'],
  '{"en": "A pre-Prohibition classic with gin, raspberry syrup, lemon juice, and egg white creating a beautiful pink, foamy cocktail.", "it": "Un classico pre-proibizionismo con gin, sciroppo di lampone, succo di limone e albume che crea un bellissimo cocktail rosa e spumoso.", "vi": "Một cocktail cổ điển trước Cấm rượu với gin, syrup mâm xôi, nước chanh và lòng trắng trứng tạo nên cocktail hồng và bọt tuyệt đẹp."}',
  '{"created_year": "1880s", "origin": {"city": "Philadelphia", "bar": "Bellevue-Stratford Hotel", "country": "USA"}}',
  '{"profile": ["fruity", "sour", "foamy", "balanced"]}',
  '{"best_time": ["evening"], "occasions": ["cocktail_party", "date_night", "celebration"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_RASPBERRY_SYRUP", "quantity": {"amount": 15, "unit": "ml"}}, {"ingredient_id": "ING_LEMON_JUICE", "quantity": {"amount": 15, "unit": "ml"}}, {"ingredient_id": "ING_EGG_WHITE", "quantity": {"amount": 1, "unit": "piece"}}]',
  'shake',
  '{"en": "Dry shake (without ice) first to emulsify egg white. Add ice and shake again. Double strain into chilled cocktail glass.", "it": "Prima shakerare a secco (senza ghiaccio) per emulsionare l''albume. Aggiungere ghiaccio e shakerare di nuovo. Doppia filtrazione in una coppa raffreddata.", "vi": "Lắc khô (không có đá) trước để làm nhũ hóa lòng trắng trứng. Thêm đá và lắc lại. Lọc đôi vào ly cocktail lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "Fresh raspberries", "it": "Lamponi freschi", "vi": "Mâm xôi tươi"}',
  'none',
  'up',
  ARRAY['ING_GIN'],
  ARRAY['fruity', 'sour', 'foamy', 'balanced'],
  18,
  170,
  'medium',
  90,
  ARRAY['egg', 'sulphites'],
  ARRAY['egg', 'alcohol'],
  ARRAY['vegetarian', 'gluten_free'],
  0,
  ARRAY['vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer', 'all_year'],
  ARRAY['cocktail_party', 'date_night', 'celebration'],
  false,
  false,
  ARRAY['pink-lady', 'millionaire'],
  'Dry shake is essential for proper foam. Can use aquafaba for vegan version.',
  'mid',
  68,
  'https://iba-world.com/clover-club/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 8. DAIQUIRI
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '61fecf4c-7947-43a4-bfd7-e05233d3b557',
  'daiquiri',
  'daiquiri-iba-unforgettable',
  '{"en": "Daiquiri", "it": "Daiquiri", "vi": "Daiquiri", "ko": "다이키리", "ja": "ダイキリ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'refreshing', 'citrus', 'cuban', 'summer'],
  '{"en": "The quintessential Cuban classic - a perfectly balanced combination of white rum, fresh lime juice, and sugar.", "it": "Il classico cubano per eccellenza - una combinazione perfettamente bilanciata di rum bianco, succo di lime fresco e zucchero.", "vi": "Cocktail Cuba kinh điển - sự kết hợp cân bằng hoàn hảo của rum trắng, nước chanh tươi và đường."}',
  '{"created_year": 1898, "origin": {"city": "Santiago de Cuba", "country": "Cuba"}, "creator": {"name": "Jennings Cox", "profession": "mining engineer"}}',
  '{"profile": ["citrus", "sour", "refreshing", "balanced"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["casual", "party", "beach"]}',
  '[{"ingredient_id": "ING_WHITE_RUM", "quantity": {"amount": 60, "unit": "ml"}}, {"ingredient_id": "ING_LIME_JUICE", "quantity": {"amount": 20, "unit": "ml"}}, {"ingredient_id": "ING_SIMPLE_SYRUP", "quantity": {"amount": 15, "unit": "ml"}}]',
  'shake',
  '{"en": "Add all ingredients into a shaker with ice. Shake until well-chilled. Double strain into a chilled coupe glass.", "it": "Aggiungere tutti gli ingredienti in uno shaker con ghiaccio. Shakerare fino a raffreddare. Doppia filtrazione in una coppa raffreddata.", "vi": "Cho tất cả nguyên liệu vào bình lắc với đá. Lắc cho đến khi lạnh. Lọc đôi vào ly coupe lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "Lime wheel", "it": "Rondella di lime", "vi": "Lát chanh"}',
  'none',
  'up',
  ARRAY['ING_WHITE_RUM'],
  ARRAY['citrus', 'sour', 'refreshing', 'balanced'],
  20,
  160,
  'easy',
  45,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer'],
  ARRAY['casual', 'party', 'beach'],
  false,
  false,
  ARRAY['hemingway-daiquiri', 'strawberry-daiquiri', 'frozen-daiquiri'],
  'Fresh lime juice is essential. Never use bottled juice.',
  'low',
  85,
  'https://iba-world.com/daiquiri/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 9. DRY MARTINI
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'f07d3be1-7cbb-460c-975d-08229d2154f2',
  'dry-martini',
  'dry-martini-iba-unforgettable',
  '{"en": "Dry Martini", "it": "Dry Martini", "vi": "Dry Martini", "ko": "드라이 마티니", "ja": "ドライマティーニ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'elegant', 'spirit-forward', 'sophisticated'],
  '{"en": "The king of cocktails - a perfectly balanced mix of gin and dry vermouth. Elegant, sophisticated, and timelessly stylish.", "it": "Il re dei cocktail - una miscela perfettamente bilanciata di gin e vermouth secco. Elegante, sofisticato e senza tempo.", "vi": "Vua của các loại cocktail - sự pha trộn cân bằng hoàn hảo của gin và vermouth khô. Sang trọng, tinh tế và phong cách vượt thời gian."}',
  '{"created_year": "1880s", "origin": {"city": "New York", "country": "USA"}}',
  '{"profile": ["dry", "botanical", "crisp", "elegant"]}',
  '{"best_time": ["evening"], "occasions": ["aperitivo", "formal", "business", "date_night"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 60, "unit": "ml"}}, {"ingredient_id": "ING_DRY_VERMOUTH", "quantity": {"amount": 10, "unit": "ml"}}]',
  'stir',
  '{"en": "Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled martini glass.", "it": "Versare tutti gli ingredienti nel mixing glass con ghiaccio. Mescolare bene. Filtrare in una coppa martini raffreddata.", "vi": "Đổ tất cả nguyên liệu vào ly pha với đá. Khuấy kỹ. Lọc vào ly martini lạnh."}',
  'Martini glass',
  '{"en": "Lemon twist or olive", "it": "Twist di limone o oliva", "vi": "Vỏ chanh hoặc olive"}',
  'none',
  'up',
  ARRAY['ING_GIN'],
  ARRAY['dry', 'botanical', 'crisp', 'elegant'],
  30,
  180,
  'medium',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['all_year'],
  ARRAY['aperitivo', 'formal', 'business', 'date_night'],
  false,
  false,
  ARRAY['vodka-martini', 'gibson', 'dirty-martini'],
  'Ask guest preference: wet/dry, olive/twist, shaken/stirred.',
  'mid',
  92,
  'https://iba-world.com/dry-martini/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 10. GIN FIZZ
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'd3bad1c6-dc31-4f6a-8a8e-784b7f737897',
  'gin-fizz',
  'gin-fizz-iba-unforgettable',
  '{"en": "Gin Fizz", "it": "Gin Fizz", "vi": "Gin Fizz", "ko": "진 피즈", "ja": "ジンフィズ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'refreshing', 'fizzy', 'citrus', 'summer'],
  '{"en": "A refreshing, effervescent classic combining gin, lemon juice, sugar, and soda water.", "it": "Un classico rinfrescante ed effervescente che combina gin, succo di limone, zucchero e acqua di seltz.", "vi": "Một cocktail cổ điển sảng khoái, sủi bọt kết hợp gin, nước chanh, đường và soda."}',
  '{"created_year": "1870s", "origin": {"city": "New Orleans", "country": "USA"}}',
  '{"profile": ["citrus", "refreshing", "effervescent", "light"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["casual", "brunch", "garden_party"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_LEMON_JUICE", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_SIMPLE_SYRUP", "quantity": {"amount": 15, "unit": "ml"}}, {"ingredient_id": "ING_SODA_WATER", "quantity": {"amount": 60, "unit": "ml"}}]',
  'shake',
  '{"en": "Shake all ingredients except soda with ice. Strain into highball glass without ice. Top with soda.", "it": "Shakerare tutti gli ingredienti tranne la soda con ghiaccio. Filtrare in un bicchiere highball senza ghiaccio. Completare con soda.", "vi": "Lắc tất cả nguyên liệu trừ soda với đá. Lọc vào ly highball không có đá. Đổ soda lên trên."}',
  'Highball glass',
  '{"en": "Lemon slice", "it": "Fetta di limone", "vi": "Lát chanh"}',
  'none',
  'highball',
  ARRAY['ING_GIN'],
  ARRAY['citrus', 'refreshing', 'effervescent', 'light'],
  12,
  140,
  'easy',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer'],
  ARRAY['casual', 'brunch', 'garden_party'],
  false,
  false,
  ARRAY['ramos-gin-fizz', 'silver-fizz', 'tom-collins'],
  'Serve immediately while fizzy. Add soda gently to preserve carbonation.',
  'low',
  70,
  'https://iba-world.com/gin-fizz/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 11. HANKY PANKY
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'dae1cfb6-5d87-481c-be04-e8571a4168c0',
  'hanky-panky',
  'hanky-panky-iba-unforgettable',
  '{"en": "Hanky Panky", "it": "Hanky Panky", "vi": "Hanky Panky", "ko": "행키 팽키", "ja": "ハンキーパンキー"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'bitter', 'herbal', 'savory'],
  '{"en": "A herbal, bittersweet classic created by Ada Coleman, one of the most famous female bartenders in history.", "it": "Un classico erbaceo e agrodolce creato da Ada Coleman, una delle bariste più famose della storia.", "vi": "Một cocktail cổ điển thảo mộc, đắng ngọt được tạo ra bởi Ada Coleman, một trong những nữ bartender nổi tiếng nhất lịch sử."}',
  '{"created_year": "1920s", "origin": {"city": "London", "bar": "The Savoy", "country": "UK"}, "creator": {"name": "Ada Coleman", "profession": "bartender"}}',
  '{"profile": ["herbal", "bitter", "complex", "spirit-forward"]}',
  '{"best_time": ["evening"], "occasions": ["aperitivo", "digestivo", "date_night"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_VERMOUTH_SWEET", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_FERNET_BRANCA", "quantity": {"amount": 7.5, "unit": "ml"}}]',
  'stir',
  '{"en": "Stir all ingredients with ice. Strain into a chilled cocktail glass.", "it": "Mescolare tutti gli ingredienti con ghiaccio. Filtrare in una coppa raffreddata.", "vi": "Khuấy tất cả nguyên liệu với đá. Lọc vào ly cocktail lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "Orange twist", "it": "Twist d''arancia", "vi": "Vỏ cam"}',
  'none',
  'up',
  ARRAY['ING_GIN'],
  ARRAY['herbal', 'bitter', 'complex', 'spirit-forward'],
  25,
  190,
  'easy',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['all_year'],
  ARRAY['aperitivo', 'digestivo', 'date_night'],
  false,
  false,
  ARRAY['martinez', 'bijou'],
  'Fernet-Branca is essential - the mint/menthol notes are key.',
  'mid',
  55,
  'https://iba-world.com/hanky-panky/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 12. JOHN COLLINS
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'ad158926-9f7a-45a5-a288-de1131cdabc8',
  'john-collins',
  'john-collins-iba-unforgettable',
  '{"en": "John Collins", "it": "John Collins", "vi": "John Collins", "ko": "존 콜린스", "ja": "ジョンコリンズ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'refreshing', 'fizzy', 'citrus', 'summer'],
  '{"en": "A refreshing tall drink made with gin, lemon juice, sugar, and soda water. The gin version of the Tom Collins.", "it": "Un drink rinfrescante alto fatto con gin, succo di limone, zucchero e acqua di seltz. La versione gin del Tom Collins.", "vi": "Một thức uống cao, sảng khoái làm từ gin, nước chanh, đường và soda. Phiên bản gin của Tom Collins."}',
  '{"created_year": "1869", "origin": {"city": "London", "bar": "Limmer''s Hotel", "country": "UK"}, "creator": {"name": "John Collins", "profession": "headwaiter"}}',
  '{"profile": ["citrus", "refreshing", "effervescent", "light"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["casual", "party", "summer_gathering"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_LEMON_JUICE", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_SIMPLE_SYRUP", "quantity": {"amount": 15, "unit": "ml"}}, {"ingredient_id": "ING_SODA_WATER", "quantity": {"amount": 60, "unit": "ml"}}]',
  'build',
  '{"en": "Build in Collins glass with ice. Add gin, lemon juice, and syrup. Top with soda water. Stir gently.", "it": "Costruire nel bicchiere Collins con ghiaccio. Aggiungere gin, succo di limone e sciroppo. Completare con soda. Mescolare delicatamente.", "vi": "Xây dựng trong ly Collins với đá. Thêm gin, nước chanh và syrup. Đổ soda lên. Khuấy nhẹ."}',
  'Collins glass',
  '{"en": "Lemon slice and maraschino cherry", "it": "Fetta di limone e ciliegina maraschino", "vi": "Lát chanh và cherry maraschino"}',
  'cubed',
  'collins',
  ARRAY['ING_GIN'],
  ARRAY['citrus', 'refreshing', 'effervescent', 'light'],
  10,
  150,
  'easy',
  30,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer'],
  ARRAY['casual', 'party', 'summer_gathering'],
  false,
  false,
  ARRAY['tom-collins', 'vodka-collins'],
  'Originally made with genever (Old Tom gin). Serve very cold.',
  'low',
  65,
  'https://iba-world.com/john-collins/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 13. LAST WORD
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'd3ba5bd0-0f7a-4309-be5c-360de459c7ca',
  'last-word',
  'last-word-iba-unforgettable',
  '{"en": "Last Word", "it": "Last Word", "vi": "Last Word", "ko": "라스트 워드", "ja": "ラストワード"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'herbal', 'complex', 'prohibition-era'],
  '{"en": "A perfectly balanced Prohibition-era classic with equal parts gin, Green Chartreuse, maraschino, and lime juice.", "it": "Un classico perfettamente bilanciato dell''era del proibizionismo con parti uguali di gin, Chartreuse verde, maraschino e succo di lime.", "vi": "Một cocktail cổ điển cân bằng hoàn hảo thời Cấm rượu với phần bằng nhau của gin, Green Chartreuse, maraschino và nước chanh."}',
  '{"created_year": "1916", "origin": {"city": "Detroit", "bar": "Detroit Athletic Club", "country": "USA"}}',
  '{"profile": ["herbal", "complex", "balanced", "spirit-forward"]}',
  '{"best_time": ["evening"], "occasions": ["cocktail_party", "date_night", "special_occasion"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 22.5, "unit": "ml"}}, {"ingredient_id": "ING_GREEN_CHARTREUSE", "quantity": {"amount": 22.5, "unit": "ml"}}, {"ingredient_id": "ING_MARASCHINO", "quantity": {"amount": 22.5, "unit": "ml"}}, {"ingredient_id": "ING_LIME_JUICE", "quantity": {"amount": 22.5, "unit": "ml"}}]',
  'shake',
  '{"en": "Add all ingredients into a shaker with ice. Shake until well-chilled. Strain into a chilled coupe.", "it": "Aggiungere tutti gli ingredienti in uno shaker con ghiaccio. Shakerare fino a raffreddare. Filtrare in una coppa raffreddata.", "vi": "Cho tất cả nguyên liệu vào bình lắc với đá. Lắc cho đến khi lạnh. Lọc vào ly coupe lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "None (or brandied cherry)", "it": "Nessuna (o ciliegia sotto spirito)", "vi": "Không (hoặc cherry ngâm rượu)"}',
  'none',
  'up',
  ARRAY['ING_GIN'],
  ARRAY['herbal', 'complex', 'balanced', 'spirit-forward'],
  27,
  200,
  'easy',
  45,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['all_year'],
  ARRAY['cocktail_party', 'date_night', 'special_occasion'],
  false,
  false,
  ARRAY['final-ward', 'paper-plane'],
  'Equal parts makes this very easy to remember and make.',
  'high',
  75,
  'https://iba-world.com/last-word/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 14. MANHATTAN
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'ec002cea-20f3-4fb2-a4a0-0426cf194280',
  'manhattan',
  'manhattan-iba-unforgettable',
  '{"en": "Manhattan", "it": "Manhattan", "vi": "Manhattan", "ko": "맨해튼", "ja": "マンハッタン"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'elegant', 'spirit-forward', 'whiskey', 'sophisticated'],
  '{"en": "An American classic and one of the original cocktails - a sophisticated blend of rye whiskey, sweet vermouth, and bitters.", "it": "Un classico americano e uno dei cocktail originali - una sofisticata miscela di whisky di segale, vermouth dolce e bitter.", "vi": "Một cocktail cổ điển Mỹ và là một trong những cocktail nguyên bản - sự pha trộn tinh tế của rye whiskey, vermouth ngọt và bitter."}',
  '{"created_year": "1870s", "origin": {"city": "New York City", "bar": "Manhattan Club", "country": "USA"}}',
  '{"profile": ["boozy", "sweet", "complex", "spirit-forward"]}',
  '{"best_time": ["evening", "late_night"], "occasions": ["aperitivo", "formal", "business", "date_night"]}',
  '[{"ingredient_id": "ING_RYE_WHISKEY", "quantity": {"amount": 50, "unit": "ml"}}, {"ingredient_id": "ING_VERMOUTH_SWEET", "quantity": {"amount": 20, "unit": "ml"}}, {"ingredient_id": "ING_ANGOSTURA_BITTERS", "quantity": {"amount": 2, "unit": "dash"}}]',
  'stir',
  '{"en": "Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled cocktail glass.", "it": "Versare tutti gli ingredienti nel mixing glass con ghiaccio. Mescolare bene. Filtrare in una coppa raffreddata.", "vi": "Đổ tất cả nguyên liệu vào ly pha với đá. Khuấy kỹ. Lọc vào ly cocktail lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "Maraschino cherry", "it": "Ciliegina al maraschino", "vi": "Cherry maraschino"}',
  'none',
  'up',
  ARRAY['ING_RYE_WHISKEY'],
  ARRAY['boozy', 'sweet', 'complex', 'spirit-forward'],
  28,
  200,
  'easy',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['autumn', 'winter', 'all_year'],
  ARRAY['aperitivo', 'formal', 'business', 'date_night'],
  false,
  false,
  ARRAY['rob-roy', 'perfect-manhattan', 'dry-manhattan'],
  'Rye is traditional, but bourbon works well. Always stir, never shake.',
  'mid',
  88,
  'https://iba-world.com/manhattan/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 15. MARGARITA
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '640ab408-b604-4d72-bed2-f121824fa8ff',
  'margarita',
  'margarita-iba-unforgettable',
  '{"en": "Margarita", "it": "Margarita", "vi": "Margarita", "ko": "마가리타", "ja": "マルガリータ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'refreshing', 'citrus', 'mexican', 'summer', 'popular'],
  '{"en": "The world''s most popular tequila cocktail - a perfect balance of tequila, triple sec, and lime juice with a salt rim.", "it": "Il cocktail a base di tequila più popolare al mondo - un perfetto equilibrio di tequila, triple sec e succo di lime con bordo di sale.", "vi": "Cocktail tequila phổ biến nhất thế giới - sự cân bằng hoàn hảo của tequila, triple sec và nước chanh với viền muối."}',
  '{"created_year": "1938", "origin": {"city": "Tijuana", "country": "Mexico"}}',
  '{"profile": ["citrus", "sour", "refreshing", "balanced"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["casual", "party", "beach", "celebration"]}',
  '[{"ingredient_id": "ING_TEQUILA", "quantity": {"amount": 50, "unit": "ml"}}, {"ingredient_id": "ING_TRIPLE_SEC", "quantity": {"amount": 20, "unit": "ml"}}, {"ingredient_id": "ING_LIME_JUICE", "quantity": {"amount": 15, "unit": "ml"}}]',
  'shake',
  '{"en": "Add all ingredients into a shaker with ice. Shake until well-chilled. Strain into a chilled margarita glass with salt rim.", "it": "Aggiungere tutti gli ingredienti in uno shaker con ghiaccio. Shakerare fino a raffreddare. Filtrare in un bicchiere margarita raffreddata con bordo di sale.", "vi": "Cho tất cả nguyên liệu vào bình lắc với đá. Lắc cho đến khi lạnh. Lọc vào ly margarita lạnh với viền muối."}',
  'Margarita glass (or coupe)',
  '{"en": "Lime wheel, salt rim", "it": "Rondella di lime, bordo di sale", "vi": "Lát chanh, viền muối"}',
  'none',
  'up',
  ARRAY['ING_TEQUILA'],
  ARRAY['citrus', 'sour', 'refreshing', 'balanced'],
  22,
  190,
  'easy',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer'],
  ARRAY['casual', 'party', 'beach', 'celebration'],
  false,
  false,
  ARRAY['frozen-margarita', 'tommy-margarita', 'cadillac-margarita'],
  'Fresh lime juice essential. Use 100% agave tequila. Half salt rim is popular option.',
  'mid',
  95,
  'https://iba-world.com/margarita/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 16. MARTINEZ
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '14f33804-7d32-4435-84c4-dd0eac8f75e7',
  'martinez',
  'martinez-iba-unforgettable',
  '{"en": "Martinez", "it": "Martinez", "vi": "Martinez", "ko": "마르티네즈", "ja": "マルティネス"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'herbal', 'complex', 'pre-martini'],
  '{"en": "Often considered the precursor to the Dry Martini - a rich, herbal cocktail with Old Tom gin, sweet vermouth, maraschino, and bitters.", "it": "Spesso considerato il precursore del Dry Martini - un cocktail ricco e aromatico con Old Tom gin, vermouth dolce, maraschino e bitter.", "vi": "Thường được coi là tiền thân của Dry Martini - một cocktail đậm đà, thảo mộc với Old Tom gin, vermouth ngọt, maraschino và bitter."}',
  '{"created_year": "1880s", "origin": {"city": "San Francisco", "country": "USA"}}',
  '{"profile": ["herbal", "complex", "sweet", "spirit-forward"]}',
  '{"best_time": ["evening"], "occasions": ["aperitivo", "cocktail_party", "date_night"]}',
  '[{"ingredient_id": "ING_OLD_TOM_GIN", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_VERMOUTH_SWEET", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_MARASCHINO", "quantity": {"amount": 7.5, "unit": "ml"}}, {"ingredient_id": "ING_ANGOSTURA_BITTERS", "quantity": {"amount": 2, "unit": "dash"}}]',
  'stir',
  '{"en": "Add all ingredients to mixing glass with ice. Stir until well-chilled. Strain into a chilled cocktail glass.", "it": "Aggiungere tutti gli ingredienti nel mixing glass con ghiaccio. Mescolare fino a raffreddare. Filtrare in una coppa raffreddata.", "vi": "Cho tất cả nguyên liệu vào ly pha với đá. Khuấy cho đến khi lạnh. Lọc vào ly cocktail lạnh."}',
  'Cocktail glass (coupe)',
  '{"en": "Lemon twist", "it": "Twist di limone", "vi": "Vỏ chanh"}',
  'none',
  'up',
  ARRAY['ING_OLD_TOM_GIN'],
  ARRAY['herbal', 'complex', 'sweet', 'spirit-forward'],
  27,
  200,
  'medium',
  60,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['autumn', 'winter', 'all_year'],
  ARRAY['aperitivo', 'cocktail_party', 'date_night'],
  false,
  false,
  ARRAY['dry-martini', 'hanky-panky'],
  'Old Tom gin is preferred. If unavailable, use London Dry with a dash of simple syrup.',
  'high',
  58,
  'https://iba-world.com/martinez/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 17. MINT JULEP
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '38b06955-0b51-4d41-96cf-c2e2e1215025',
  'mint-julep',
  'mint-julep-iba-unforgettable',
  '{"en": "Mint Julep", "it": "Mint Julep", "vi": "Mint Julep", "ko": "민트 줄렙", "ja": "ミントジュレップ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'refreshing', 'minty', 'southern', 'kentucky-derby', 'summer'],
  '{"en": "The official drink of the Kentucky Derby - a refreshing Southern classic with bourbon, fresh mint, sugar, and crushed ice.", "it": "La bevanda ufficiale del Kentucky Derby - un classico rinfrescante del Sud con bourbon, menta fresca, zucchero e ghiaccio tritato.", "vi": "Thức uống chính thức của Kentucky Derby - một cocktail cổ điển miền Nam sảng khoái với bourbon, bạc hà tươi, đường và đá xay."}',
  '{"created_year": "1780s", "origin": {"city": "Virginia", "country": "USA"}}',
  '{"profile": ["minty", "sweet", "refreshing", "spirit-forward"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["kentucky_derby", "southern_gathering", "garden_party", "summer_celebration"]}',
  '[{"ingredient_id": "ING_BOURBON", "quantity": {"amount": 60, "unit": "ml"}}, {"ingredient_id": "ING_SIMPLE_SYRUP", "quantity": {"amount": 15, "unit": "ml"}}, {"ingredient_id": "ING_FRESH_MINT", "quantity": {"amount": 8, "unit": "leaves"}}]',
  'muddle',
  '{"en": "Gently muddle mint with syrup in julep cup. Add bourbon. Fill with crushed ice. Stir until cup is frosted. Top with more ice and mint sprig.", "it": "Pestare delicatamente la menta con lo sciroppo nel julep cup. Aggiungere bourbon. Riempire con ghiaccio tritato. Mescolare fino a che il bicchiere non si appanna. Completare con altro ghiaccio e rametto di menta.", "vi": "Nghiền nhẹ bạc hà với syrup trong ly julep. Thêm bourbon. Đổ đầy đá xay. Khuấy cho đến khi ly đông sương. Thêm đá và cành bạc hà lên trên."}',
  'Julep cup (or Old Fashioned glass)',
  '{"en": "Fresh mint bouquet", "it": "Bouquet di menta fresca", "vi": "Bó bạc hà tươi"}',
  'crushed',
  'built',
  ARRAY['ING_BOURBON'],
  ARRAY['minty', 'sweet', 'refreshing', 'spirit-forward'],
  23,
  180,
  'medium',
  120,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['spring', 'summer'],
  ARRAY['kentucky_derby', 'southern_gathering', 'garden_party', 'summer_celebration'],
  false,
  false,
  ARRAY['georgia-mint-julep', 'whiskey-smash'],
  'Use silver julep cup for best presentation. Crushed ice is essential.',
  'mid',
  72,
  'https://iba-world.com/mint-julep/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 18. NEGRONI
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '58a26554-b6b8-44d9-8efa-54a13b26d7b7',
  'negroni',
  'negroni-iba-unforgettable',
  '{"en": "Negroni", "it": "Negroni", "vi": "Negroni", "ko": "네그로니", "ja": "ネグローニ"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'bitter', 'aperitivo', 'italian', 'iconic'],
  '{"en": "The iconic Italian aperitivo - a perfectly balanced, bitter cocktail with equal parts gin, Campari, and sweet vermouth.", "it": "L''iconico aperitivo italiano - un cocktail perfettamente bilanciato e amaro con parti uguali di gin, Campari e vermouth rosso.", "vi": "Aperitivo Ý mang tính biểu tượng - một cocktail đắng cân bằng hoàn hảo với phần bằng nhau của gin, Campari và vermouth ngọt."}',
  '{"created_year": 1919, "origin": {"city": "Florence", "bar": "Caffè Casoni", "country": "Italy"}, "creator": {"name": "Count Camillo Negroni", "profession": "nobleman"}}',
  '{"profile": ["bitter", "herbal", "complex", "spirit-forward"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["aperitivo", "casual", "date_night"]}',
  '[{"ingredient_id": "ING_GIN", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_CAMPARI", "quantity": {"amount": 30, "unit": "ml"}}, {"ingredient_id": "ING_VERMOUTH_SWEET", "quantity": {"amount": 30, "unit": "ml"}}]',
  'stir',
  '{"en": "Pour all ingredients directly into old-fashioned glass filled with ice. Stir gently.", "it": "Versare tutti gli ingredienti direttamente nel bicchiere old-fashioned pieno di ghiaccio. Mescolare delicatamente.", "vi": "Đổ tất cả nguyên liệu trực tiếp vào ly old-fashioned đầy đá. Khuấy nhẹ."}',
  'Old Fashioned glass',
  '{"en": "Orange slice or twist", "it": "Fetta o twist d''arancia", "vi": "Lát hoặc vỏ cam"}',
  'cubed',
  'on_the_rocks',
  ARRAY['ING_GIN'],
  ARRAY['bitter', 'herbal', 'complex', 'spirit-forward'],
  24,
  200,
  'easy',
  30,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['all_year'],
  ARRAY['aperitivo', 'casual', 'date_night'],
  false,
  false,
  ARRAY['americano', 'boulevardier', 'sbagliato'],
  'Equal parts makes this easy to make. Build in glass for authenticity.',
  'low',
  90,
  'https://iba-world.com/negroni/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 19. OLD FASHIONED
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '52afb1a7-a11b-4a17-b1a2-7afa1d8ead8a',
  'old-fashioned',
  'old-fashioned-iba-unforgettable',
  '{"en": "Old Fashioned", "it": "Old Fashioned", "vi": "Old Fashioned", "ko": "올드 패션드", "ja": "オールドファッションド"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'spirit-forward', 'whiskey', 'sophisticated', 'timeless'],
  '{"en": "The original cocktail - a simple yet sophisticated blend of whiskey, sugar, bitters, and a twist of citrus.", "it": "Il cocktail originale - una miscela semplice ma sofisticata di whiskey, zucchero, bitter e una scorza di agrumi.", "vi": "Cocktail nguyên bản - sự pha trộn đơn giản nhưng tinh tế của whiskey, đường, bitter và vỏ cam quýt."}',
  '{"created_year": "1880s", "origin": {"city": "Louisville", "bar": "The Pendennis Club", "country": "USA"}}',
  '{"profile": ["boozy", "bitter", "complex", "spirit-forward"]}',
  '{"best_time": ["evening", "late_night"], "occasions": ["aperitivo", "digestivo", "business", "quiet_contemplation"]}',
  '[{"ingredient_id": "ING_BOURBON", "quantity": {"amount": 60, "unit": "ml"}}, {"ingredient_id": "ING_SUGAR_CUBE", "quantity": {"amount": 1, "unit": "piece"}}, {"ingredient_id": "ING_ANGOSTURA_BITTERS", "quantity": {"amount": 3, "unit": "dash"}}, {"ingredient_id": "ING_WATER", "quantity": {"amount": 0, "unit": "splash"}}]',
  'build',
  '{"en": "Place sugar cube in glass, saturate with bitters and splash of water. Muddle until dissolved. Fill with ice, add whiskey. Stir gently. Garnish with orange twist.", "it": "Mettere la zolletta di zucchero nel bicchiere, saturare con bitter e un goccio d''acqua. Pestare fino a sciogliere. Riempire con ghiaccio, aggiungere whiskey. Mescolare delicatamente. Guarnire con twist d''arancia.", "vi": "Đặt viên đường vào ly, tẩm ướt với bitter và một chút nước. Nghiền cho đến khi tan. Đổ đầy đá, thêm whiskey. Khuấy nhẹ. Trang trí với vỏ cam."}',
  'Old Fashioned glass',
  '{"en": "Orange twist and maraschino cherry", "it": "Twist d''arancia e ciliegina maraschino", "vi": "Vỏ cam và cherry maraschino"}',
  'large_cube',
  'on_the_rocks',
  ARRAY['ING_BOURBON'],
  ARRAY['boozy', 'bitter', 'complex', 'spirit-forward'],
  32,
  180,
  'medium',
  90,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['autumn', 'winter', 'all_year'],
  ARRAY['aperitivo', 'digestivo', 'business', 'quiet_contemplation'],
  false,
  false,
  ARRAY['wisconsin-old-fashioned', 'rum-old-fashioned', 'mezcal-old-fashioned'],
  'Use large ice cube to minimize dilution. Bourbon or rye both work well.',
  'mid',
  92,
  'https://iba-world.com/old-fashioned/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 20. SIDECAR
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  '8ecdde5b-d9b6-4acb-a09c-749ecb835856',
  'sidecar',
  'sidecar-iba-unforgettable',
  '{"en": "Sidecar", "it": "Sidecar", "vi": "Sidecar", "ko": "사이드카", "ja": "サイドカー"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'citrus', 'elegant', 'prohibition-era', 'french'],
  '{"en": "A classic Prohibition-era cocktail with cognac, orange liqueur, and lemon juice, often served with a sugar rim.", "it": "Un classico cocktail dell''era del proibizionismo con cognac, liquore all''arancia e succo di limone, spesso servito con bordo di zucchero.", "vi": "Một cocktail cổ điển thời Cấm rượu với cognac, rượu mùi cam và nước chanh, thường được phục vụ với viền đường."}',
  '{"created_year": "1920s", "origin": {"city": "Paris", "bar": "Harry''s New York Bar", "country": "France"}, "creator": {"name": "Harry MacElhone", "profession": "bartender"}}',
  '{"profile": ["citrus", "boozy", "balanced", "complex"]}',
  '{"best_time": ["evening"], "occasions": ["cocktail_party", "date_night", "celebration"]}',
  '[{"ingredient_id": "ING_COGNAC", "quantity": {"amount": 50, "unit": "ml"}}, {"ingredient_id": "ING_TRIPLE_SEC", "quantity": {"amount": 20, "unit": "ml"}}, {"ingredient_id": "ING_LEMON_JUICE", "quantity": {"amount": 20, "unit": "ml"}}]',
  'shake',
  '{"en": "Pour all ingredients into cocktail shaker filled with ice. Shake well. Strain into chilled cocktail glass with sugar rim (optional).", "it": "Versare tutti gli ingredienti nello shaker pieno di ghiaccio. Shakerare bene. Filtrare in una coppa raffreddata con bordo di zucchero (opzionale).", "vi": "Đổ tất cả nguyên liệu vào bình lắc đầy đá. Lắc kỹ. Lọc vào ly cocktail lạnh với viền đường (tùy chọn)."}',
  'Cocktail glass (coupe)',
  '{"en": "Orange twist (sugar rim optional)", "it": "Twist d''arancia (bordo di zucchero opzionale)", "vi": "Vỏ cam (viền đường tùy chọn)"}',
  'none',
  'up',
  ARRAY['ING_COGNAC'],
  ARRAY['citrus', 'boozy', 'balanced', 'complex'],
  28,
  200,
  'easy',
  45,
  ARRAY['sulphites'],
  ARRAY['alcohol'],
  ARRAY['vegan', 'vegetarian', 'gluten_free'],
  0,
  ARRAY['vegan', 'vegetarian', 'gluten-free'],
  ARRAY['autumn', 'winter', 'all_year'],
  ARRAY['cocktail_party', 'date_night', 'celebration'],
  false,
  false,
  ARRAY['between-the-sheets', 'brandy-crusta'],
  'Sugar rim is traditional but optional. Use quality cognac for best results.',
  'high',
  70,
  'https://iba-world.com/sidecar/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- 21. WHISKEY SOUR
-- ============================================================================
INSERT INTO cocktails (
  id, slug, stable_key, name, status, iba_category, tags,
  description, history, taste, recommendations,
  ingredients, method, instructions, glass, garnish, ice, serving_style,
  base_spirits, flavor_profile, abv_estimate, calories_estimate,
  difficulty, prep_time_seconds,
  computed_allergens, computed_intolerances, computed_diets, computed_spice_level,
  diet_tags, season_tags, occasion_tags,
  is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity,
  source_url, source_note, version
)
VALUES (
  'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  'whiskey-sour',
  'whiskey-sour-iba-unforgettable',
  '{"en": "Whiskey Sour", "it": "Whiskey Sour", "vi": "Whiskey Sour", "ko": "위스키 사워", "ja": "ウイスキーサワー"}',
  'iba_official',
  'Unforgettables',
  ARRAY['iba', 'official', 'classic', 'citrus', 'sour', 'whiskey', 'popular'],
  '{"en": "A timeless sour cocktail - whiskey, lemon juice, and sugar in perfect balance, optionally with egg white for a silky foam.", "it": "Un cocktail sour senza tempo - whiskey, succo di limone e zucchero in perfetto equilibrio, opzionalmente con albume per una schiuma setosa.", "vi": "Một cocktail sour vượt thời gian - whiskey, nước chanh và đường cân bằng hoàn hảo, tùy chọn với lòng trắng trứng để có bọt mịn."}',
  '{"created_year": "1862", "origin": {"city": "United States", "country": "USA"}}',
  '{"profile": ["sour", "citrus", "balanced", "spirit-forward"]}',
  '{"best_time": ["afternoon", "evening"], "occasions": ["casual", "cocktail_party", "date_night"]}',
  '[{"ingredient_id": "ING_BOURBON", "quantity": {"amount": 45, "unit": "ml"}}, {"ingredient_id": "ING_LEMON_JUICE", "quantity": {"amount": 25, "unit": "ml"}}, {"ingredient_id": "ING_SIMPLE_SYRUP", "quantity": {"amount": 15, "unit": "ml"}}, {"ingredient_id": "ING_EGG_WHITE", "quantity": {"amount": 1, "unit": "piece"}}]',
  'shake',
  '{"en": "If using egg white, dry shake first. Add ice and shake again. Strain into rocks glass over ice or coupe without ice.", "it": "Se si usa l''albume, shakerare prima a secco. Aggiungere ghiaccio e shakerare di nuovo. Filtrare in un bicchiere rocks con ghiaccio o in una coppa senza.", "vi": "Nếu dùng lòng trắng trứng, lắc khô trước. Thêm đá và lắc lại. Lọc vào ly rocks trên đá hoặc ly coupe không có đá."}',
  'Old Fashioned glass (or coupe)',
  '{"en": "Maraschino cherry and orange slice, or Angostura drops on foam", "it": "Ciliegina maraschino e fetta d''arancia, o gocce di Angostura sulla schiuma", "vi": "Cherry maraschino và lát cam, hoặc vài giọt Angostura trên bọt"}',
  'cubed',
  'on_the_rocks',
  ARRAY['ING_BOURBON'],
  ARRAY['sour', 'citrus', 'balanced', 'spirit-forward'],
  20,
  180,
  'medium',
  75,
  ARRAY['egg', 'sulphites'],
  ARRAY['egg', 'alcohol'],
  ARRAY['vegetarian', 'gluten_free'],
  0,
  ARRAY['vegetarian', 'gluten-free'],
  ARRAY['all_year'],
  ARRAY['casual', 'cocktail_party', 'date_night'],
  false,
  false,
  ARRAY['new-york-sour', 'amaretto-sour', 'boston-sour'],
  'Egg white is optional but recommended. Dry shake first for best foam.',
  'low',
  85,
  'https://iba-world.com/whiskey-sour/',
  'IBA Official Recipe',
  1
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, history = EXCLUDED.history,
  taste = EXCLUDED.taste, recommendations = EXCLUDED.recommendations, ingredients = EXCLUDED.ingredients,
  instructions = EXCLUDED.instructions, garnish = EXCLUDED.garnish, updated_at = NOW();

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT COUNT(*) as total_cocktails FROM cocktails;
SELECT slug, name->>'en' as name FROM cocktails ORDER BY slug;
