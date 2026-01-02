INSERT INTO cocktails (id, slug, stable_key, name, status, iba_category, tags, description, history, taste, recommendations, ingredients, method, instructions, glass, garnish, ice, serving_style, base_spirits, flavor_profile, abv_estimate, calories_estimate, difficulty, prep_time_seconds, computed_allergens, computed_intolerances, computed_diets, computed_spice_level, diet_tags, season_tags, occasion_tags, is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity, source_url, source_note, version)
VALUES ('75718a3d-c7a4-48d9-bbec-ba3240ed305a', 'woo-woo', 'd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2', '{"en":"Woo Woo"}'::jsonb, 'famous', NULL, '{"highball","long-drink","famous","vodka","peach","cranberry","fruity","party"}', '{"en":"A sweet and fruity party cocktail combining vodka, peach schnapps, and cranberry juice. The Woo Woo is a fun, easy-drinking highball that became a staple of 1980s nightlife and remains a popular choice for celebrations."}'::jsonb, '{"created_year":"1980","origin":{"city":"United States","country":"USA"},"story":{"en":"The Woo Woo emerged in the 1980s during the heyday of fruity vodka cocktails and sweet schnapps drinks. It became popular in nightclubs and bars as an easy-to-make, crowd-pleasing shot and cocktail. The name is thought to come from the enthusiastic reaction people had when drinking it. The Woo Woo is essentially a variation of the Sex on the Beach, using cranberry juice instead of orange juice, and became a favorite among party-goers for its sweet, approachable flavor."},"named_after":{"en":"Named after the enthusiastic \"woo woo!\" exclamation people made when enjoying this fun, party-friendly cocktail."}}'::jsonb, '{"profile":["sweet","fruity","peach","tart"],"description":{"en":"Sweet and fruity with dominant peach flavor from the schnapps, balanced by the tart cranberry juice. The vodka provides a subtle kick without overwhelming the fruit flavors, making it dangerously easy to drink."},"first_impression":{"en":"Sweet peach and cranberry burst with vibrant fruitiness"},"finish":{"en":"Sweet, smooth finish with lingering peach and cranberry notes"},"balance":{"en":"Leans toward sweetness but cranberry provides enough tartness to keep it refreshing"}}'::jsonb, '{"best_time":["evening","night","late_night"],"occasions":["party","celebration","nightclub","girls_night"],"seasons":["all-year"],"food_pairings":{"en":"Best enjoyed as a party drink rather than with food. Pairs well with salty snacks, chips, and finger foods at casual gatherings."},"ideal_for":{"en":"Perfect for party-goers and those who enjoy sweet, fruity cocktails. Great for celebrations, nightclub settings, or anyone who prefers drinks that don''t taste strongly of alcohol."}}'::jsonb, '[{"ingredient_id":"ING_VODKA","quantity":{"amount":30,"unit":"ml"},"display_name":"Vodka","notes":null},{"ingredient_id":"ING_PEACH_SCHNAPPS","quantity":{"amount":30,"unit":"ml"},"display_name":"Peach schnapps","notes":null},{"ingredient_id":"ING_CRANBERRY_JUICE","quantity":{"amount":90,"unit":"ml"},"display_name":"Cranberry juice","notes":null}]'::jsonb, 'build', '{"en":"Fill a highball glass with ice. Pour vodka and peach schnapps over ice, then top with cranberry juice. Stir gently to combine. Garnish with a lime wedge."}'::jsonb, 'Highball glass', '{"en":"Lime wedge"}'::jsonb, 'cubed', 'on_the_rocks', '{"ING_VODKA"}', '{"sweet","fruity","peach","tart"}', 12, 195, 'easy', 30, '{"sulphites"}', '{"alcohol","sulphites_intolerance"}', '{"vegan","vegetarian","pescatarian","gluten_free","dairy_free","nut_free"}', 0, '{"vegan","gluten-free","dairy-free"}', '{"all-year"}', '{"party","celebration","nightclub"}', false, false, '{"sex-on-the-beach","fuzzy-navel"}', 'Can also be served as a shot (equal parts all ingredients). Very popular with younger crowds. Use quality peach schnapps for best flavor - avoid artificial-tasting brands.', 'low', 85, 'https://www.diffordsguide.com/cocktails/recipe/1239/woo-woo', 'Popular 1980s party drink, variation of Sex on the Beach.', 1)
ON CONFLICT (slug) DO UPDATE SET
  id = EXCLUDED.id,
  stable_key = EXCLUDED.stable_key,
  name = EXCLUDED.name,
  status = EXCLUDED.status,
  iba_category = EXCLUDED.iba_category,
  tags = EXCLUDED.tags,
  description = EXCLUDED.description,
  history = EXCLUDED.history,
  taste = EXCLUDED.taste,
  recommendations = EXCLUDED.recommendations,
  ingredients = EXCLUDED.ingredients,
  method = EXCLUDED.method,
  instructions = EXCLUDED.instructions,
  glass = EXCLUDED.glass,
  garnish = EXCLUDED.garnish,
  ice = EXCLUDED.ice,
  serving_style = EXCLUDED.serving_style,
  base_spirits = EXCLUDED.base_spirits,
  flavor_profile = EXCLUDED.flavor_profile,
  abv_estimate = EXCLUDED.abv_estimate,
  calories_estimate = EXCLUDED.calories_estimate,
  difficulty = EXCLUDED.difficulty,
  prep_time_seconds = EXCLUDED.prep_time_seconds,
  computed_allergens = EXCLUDED.computed_allergens,
  computed_intolerances = EXCLUDED.computed_intolerances,
  computed_diets = EXCLUDED.computed_diets,
  computed_spice_level = EXCLUDED.computed_spice_level,
  diet_tags = EXCLUDED.diet_tags,
  season_tags = EXCLUDED.season_tags,
  occasion_tags = EXCLUDED.occasion_tags,
  is_mocktail = EXCLUDED.is_mocktail,
  is_signature = EXCLUDED.is_signature,
  variants = EXCLUDED.variants,
  notes_for_staff = EXCLUDED.notes_for_staff,
  price_tier = EXCLUDED.price_tier,
  popularity = EXCLUDED.popularity,
  source_url = EXCLUDED.source_url,
  source_note = EXCLUDED.source_note,
  version = EXCLUDED.version,
  updated_at = NOW();


-- 233. Zombie Punch


INSERT INTO cocktails (id, slug, stable_key, name, status, iba_category, tags, description, history, taste, recommendations, ingredients, method, instructions, glass, garnish, ice, serving_style, base_spirits, flavor_profile, abv_estimate, calories_estimate, difficulty, prep_time_seconds, computed_allergens, computed_intolerances, computed_diets, computed_spice_level, diet_tags, season_tags, occasion_tags, is_mocktail, is_signature, variants, notes_for_staff, price_tier, popularity, source_url, source_note, version)
VALUES ('64c76c69-3fbb-4ce6-9c88-f862697e4ddf', 'zombie-punch', 'zombie-punch-tiki-tropical-famous-2025', '{"en":"Zombie Punch"}'::jsonb, 'famous', NULL, '{"tiki","tropical","famous","rum","potent","classic-tiki","party"}', '{"en":"A large-format party version of the legendary Zombie cocktail, featuring multiple rums with tropical fruit juices and exotic spices. The Zombie Punch is notoriously potent yet deceptively smooth, designed to serve a crowd while maintaining the complex character of the original."}'::jsonb, '{"created_year":"1930s","origin":{"city":"Hollywood","bar":"Don the Beachcomber","country":"USA"},"creator":{"name":"Ernest Raymond Beaumont Gantt (Donn Beach)","profession":"bartender"},"story":{"en":"The Zombie Punch is derived from the legendary Zombie cocktail created by Donn Beach (Ernest Raymond Beaumont Gantt) at his Don the Beachcomber restaurant in Hollywood in the 1930s. The original Zombie was famously created to help a hungover customer get through a business meeting - supposedly with such success that the customer later claimed it turned him into a zombie. The drink became so notorious for its potency that Donn Beach limited customers to two per visit. The punch version was developed for tiki parties and large gatherings, scaling up the recipe while maintaining its complex, multi-rum character. The exact original recipe was kept secret for decades, with Donn Beach using coded recipe cards. Modern versions attempt to recreate the legendary flavor profile."},"named_after":{"en":"Named \"Zombie\" because the drink is so potent it supposedly turns you into a walking zombie - famously limited to two per customer by its creator."}}'::jsonb, '{"profile":["fruity","complex","potent"],"description":{"en":"Intensely complex with layers of rum, tropical fruit, citrus, and exotic spices. Multiple rum varieties create incredible depth while tropical juices provide sweetness and balance. Deceptively smooth despite its high alcohol content - dangerously drinkable."},"first_impression":{"en":"Tropical fruit sweetness with complex rum depth and exotic spice notes"},"finish":{"en":"Very long, warming finish with multiple rum layers, tropical fruit, and lingering spice"},"balance":{"en":"Remarkably well-balanced for its strength - tropical sweetness and citrus acidity mask the high alcohol content"}}'::jsonb, '{"best_time":["evening","party"],"occasions":["party","tiki_bar","celebration","halloween","large_gathering"],"seasons":["summer","year_round"],"food_pairings":{"en":"Perfect for tiki party buffets with jerk chicken, kalua pork, coconut shrimp, tropical fruit platters, or Polynesian-style cuisine. Also pairs well with spicy Caribbean and Asian dishes."},"ideal_for":{"en":"Perfect for large tiki parties, Halloween gatherings, and tropical celebrations. WARNING: Extremely potent - limit consumption and warn guests. Ideal for serious tiki enthusiasts and punch bowl parties. Not for casual drinking."}}'::jsonb, '[{"ingredient_id":"ING_RUM_WHITE","quantity":{"amount":240,"unit":"ml"},"display_name":"White rum","notes":null},{"ingredient_id":"ING_RUM_GOLD","quantity":{"amount":240,"unit":"ml"},"display_name":"Gold rum","notes":null},{"ingredient_id":"ING_RUM_DARK","quantity":{"amount":120,"unit":"ml"},"display_name":"Dark rum (151 proof)","notes":null},{"ingredient_id":"ING_APRICOT_BRANDY","quantity":{"amount":120,"unit":"ml"},"display_name":"Apricot brandy","notes":null},{"ingredient_id":"ING_PINEAPPLE_JUICE","quantity":{"amount":360,"unit":"ml"},"display_name":"Fresh pineapple juice","notes":null},{"ingredient_id":"ING_LIME_JUICE","quantity":{"amount":180,"unit":"ml"},"display_name":"Fresh lime juice","notes":null},{"ingredient_id":"ING_GRENADINE","quantity":{"amount":60,"unit":"ml"},"display_name":"Grenadine","notes":null}]'::jsonb, 'build', '{"en":"In a large punch bowl, combine white rum, gold rum, apricot brandy, pineapple juice, lime juice, and grenadine. Add large ice block or ring. Stir gently. Float dark rum on top just before serving. Garnish punch bowl with tropical fruit slices, mint sprigs, and edible flowers. Serve in individual tiki mugs over crushed ice."}'::jsonb, 'Punch bowl / Tiki mugs', '{"en":"Tropical fruit slices, mint sprigs, edible flowers, pineapple leaves"}'::jsonb, 'block', 'punch', '{"ING_RUM_WHITE","ING_RUM_GOLD","ING_RUM_DARK"}', '{"fruity","complex","potent"}', 20, 280, 'medium', 180, '{"sulphites"}', '{"alcohol","sulphites_intolerance"}', '{"vegetarian","vegan","pescatarian","gluten_free","dairy_free","nut_free"}', 0, '{"vegetarian","vegan","gluten-free"}', '{"summer","year_round"}', '{"party","tiki_bar","celebration","halloween"}', false, false, '{"zombie-cocktail","virgin-zombie-punch"}', 'EXTREMELY POTENT - warn all guests and monitor consumption. Original Donn Beach recipe limited customers to 2 drinks. This batch serves 8-10 people. Use 151-proof dark rum floater for authentic presentation. Recipe scaled from original Zombie cocktail. Consider limiting refills. Fresh juices essential.', 'premium', 70, 'https://www.smugglerscovesf.com/store/smugglers-cove-exotic-cocktails-rum-and-the-cult-of-tiki', 'Punch version of legendary Donn Beach Zombie. Original recipe was kept secret for decades.', 1)
ON CONFLICT (slug) DO UPDATE SET
  id = EXCLUDED.id,
  stable_key = EXCLUDED.stable_key,
  name = EXCLUDED.name,
  status = EXCLUDED.status,
  iba_category = EXCLUDED.iba_category,
  tags = EXCLUDED.tags,
  description = EXCLUDED.description,
  history = EXCLUDED.history,
  taste = EXCLUDED.taste,
  recommendations = EXCLUDED.recommendations,
  ingredients = EXCLUDED.ingredients,
  method = EXCLUDED.method,
  instructions = EXCLUDED.instructions,
  glass = EXCLUDED.glass,
  garnish = EXCLUDED.garnish,
  ice = EXCLUDED.ice,
  serving_style = EXCLUDED.serving_style,
  base_spirits = EXCLUDED.base_spirits,
  flavor_profile = EXCLUDED.flavor_profile,
  abv_estimate = EXCLUDED.abv_estimate,
  calories_estimate = EXCLUDED.calories_estimate,
  difficulty = EXCLUDED.difficulty,
  prep_time_seconds = EXCLUDED.prep_time_seconds,
  computed_allergens = EXCLUDED.computed_allergens,
  computed_intolerances = EXCLUDED.computed_intolerances,
  computed_diets = EXCLUDED.computed_diets,
  computed_spice_level = EXCLUDED.computed_spice_level,
  diet_tags = EXCLUDED.diet_tags,
  season_tags = EXCLUDED.season_tags,
  occasion_tags = EXCLUDED.occasion_tags,
  is_mocktail = EXCLUDED.is_mocktail,
  is_signature = EXCLUDED.is_signature,
  variants = EXCLUDED.variants,
  notes_for_staff = EXCLUDED.notes_for_staff,
  price_tier = EXCLUDED.price_tier,
  popularity = EXCLUDED.popularity,
  source_url = EXCLUDED.source_url,
  source_note = EXCLUDED.source_note,
  version = EXCLUDED.version,
  updated_at = NOW();


-- ============================================================================
-- Verify insertion
-- ============================================================================
SELECT
  status,
  iba_category,
  COUNT(*) as count
FROM cocktails
GROUP BY status, iba_category
ORDER BY status, iba_category;

