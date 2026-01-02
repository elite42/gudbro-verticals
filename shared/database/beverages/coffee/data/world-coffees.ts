/**
 * World Coffee Recipes
 *
 * Unique coffee drinks from around the world including:
 * - Vietnamese specialties (Egg Coffee, Coconut Coffee, Salt Coffee, Yogurt Coffee)
 * - Traditional brews (Turkish, Greek, Ethiopian, Arabic)
 * - Trending drinks (Dalgona, Bulletproof, Cloud Coffee)
 * - Regional specialties (Cafe de Olla, Yuanyang, Swedish Egg Coffee)
 * - Wellness coffees (Mushroom, Adaptogenic)
 */

import type { Coffee } from '../types';

// Vietnamese Coffee Specialties
export const vietnameseCoffees: Coffee[] = [
  {
    id: 'coffee-ca-phe-trung',
    slug: 'ca-phe-trung',
    name: 'Vietnamese Egg Coffee (Ca Phe Trung)',
    description: 'Iconic Hanoi specialty featuring strong Vietnamese coffee topped with a rich, creamy whipped egg yolk foam. Tastes like liquid tiramisu.',
    category: 'specialty',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['vietnamese coffee', 'egg yolk', 'condensed milk', 'sugar'],
    quantity_description: '60ml strong coffee, 2 egg yolks, 30ml condensed milk, 10g sugar',
    ingredient_ids: ['ING_COFFEE_VIETNAMESE', 'ING_EGG_YOLK', 'ING_CONDENSED_MILK', 'ING_SUGAR'],
    serving: {
      glass_type: 'Small ceramic cup in hot water bath',
      volume_ml: 150,
      chain_style_decoration: 'Dusted cocoa',
      premium_style_decoration: 'Served in hot water bath with cocoa dust pattern'
    },
    preparation: {
      method: 'Brew strong coffee with phin filter. Whisk egg yolks with condensed milk and sugar until thick and creamy (5+ minutes). Pour coffee into cup, top with egg cream.',
      prep_time_seconds: 300,
      skill_level: 3,
      notes: 'Add vanilla or rum to reduce eggy taste. Keep egg cream warm in water bath.'
    },
    cost: { ingredient_cost_usd: 0.75, selling_price_usd: 4.50, profit_margin_percent: 83.3 },
    nutrition: { calories_per_serving: 220, caffeine_mg: 150, sugar_g: 25, protein_g: 5, fat_g: 10 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['eggs', 'milk'] },
    customization: { available_milks: ['none'], available_syrups: ['vanilla'], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['vietnamese', 'egg-coffee', 'hanoi', 'iconic', 'creamy', 'dessert-coffee'],
    popularity: 88,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-ca-phe-dua',
    slug: 'ca-phe-dua',
    name: 'Vietnamese Coconut Coffee (Ca Phe Dua)',
    description: 'Creamy tropical blend of robust Vietnamese coffee with coconut milk and condensed milk, creating a smooth, sweet iced drink.',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['vietnamese coffee', 'coconut milk', 'condensed milk', 'ice'],
    quantity_description: '60ml strong coffee, 100ml coconut milk, 20ml condensed milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_VIETNAMESE', 'ING_MILK_COCONUT', 'ING_CONDENSED_MILK', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'Coconut shavings',
      premium_style_decoration: 'Layered presentation with toasted coconut'
    },
    preparation: {
      method: 'Blend coconut milk with condensed milk and ice until smooth. Shake coffee vigorously until foamy. Layer coconut mixture, then pour coffee on top.',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Use fresh coconut milk for best results. Can add coconut cream for extra richness.'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 4.80, profit_margin_percent: 82.3 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 150, sugar_g: 28, protein_g: 3, fat_g: 16 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'coconut', allergens: ['milk', 'coconut'] },
    customization: { available_milks: ['coconut'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['vietnamese', 'coconut', 'tropical', 'iced', 'creamy'],
    popularity: 85,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-ca-phe-muoi',
    slug: 'ca-phe-muoi',
    name: 'Vietnamese Salt Coffee (Ca Phe Muoi)',
    description: 'Trending Hue specialty combining robust coffee with salted cream foam. The salt enhances sweetness and mellows bitterness, creating a salted caramel-like experience.',
    category: 'specialty',
    style: 'layered',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['vietnamese coffee', 'condensed milk', 'cream', 'sea salt'],
    quantity_description: '60ml strong coffee, 20ml condensed milk, 40ml cream, 1/4 tsp sea salt',
    ingredient_ids: ['ING_COFFEE_VIETNAMESE', 'ING_CONDENSED_MILK', 'ING_HEAVY_CREAM', 'ING_SEA_SALT'],
    serving: {
      glass_type: 'Glass cup',
      volume_ml: 200,
      chain_style_decoration: 'Salted cream cap',
      premium_style_decoration: 'Three-layer presentation with flaky sea salt'
    },
    preparation: {
      method: 'Layer condensed milk at bottom. Add coffee in middle. Whip cream with sea salt until thick peaks. Spoon salted cream on top. Stir before drinking.',
      prep_time_seconds: 150,
      skill_level: 2,
      notes: 'Salt brings out the coffee flavor and balances bitterness. Can serve hot or iced.'
    },
    cost: { ingredient_cost_usd: 0.70, selling_price_usd: 4.20, profit_margin_percent: 83.3 },
    nutrition: { calories_per_serving: 200, caffeine_mg: 150, sugar_g: 20, protein_g: 2, fat_g: 12 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['vietnamese', 'salt-coffee', 'hue', 'trending', 'salted-caramel'],
    popularity: 82,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-sua-chua-ca-phe',
    slug: 'sua-chua-ca-phe',
    name: 'Vietnamese Yogurt Coffee (Sua Chua Ca Phe)',
    description: 'Unique Vietnamese creation blending tangy yogurt with bold coffee, creating a probiotic-rich, creamy beverage.',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['vietnamese coffee', 'yogurt', 'condensed milk', 'ice'],
    quantity_description: '60ml strong coffee, 100g yogurt, 15ml condensed milk, 80g ice',
    ingredient_ids: ['ING_COFFEE_VIETNAMESE', 'ING_YOGURT', 'ING_CONDENSED_MILK', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Layered with coffee drizzle'
    },
    preparation: {
      method: 'Mix yogurt with condensed milk and ice. Blend until smooth. Pour into glass, then float coffee on top.',
      prep_time_seconds: 90,
      skill_level: 1,
      notes: 'Use thick Greek-style yogurt for best texture. The tanginess complements the bitter coffee.'
    },
    cost: { ingredient_cost_usd: 0.75, selling_price_usd: 4.00, profit_margin_percent: 81.3 },
    nutrition: { calories_per_serving: 220, caffeine_mg: 150, sugar_g: 22, protein_g: 8, fat_g: 6 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['vietnamese', 'yogurt', 'probiotic', 'unique', 'healthy'],
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-ca-phe-sua-da',
    slug: 'ca-phe-sua-da',
    name: 'Vietnamese Iced Coffee (Ca Phe Sua Da)',
    description: 'The classic Vietnamese iced coffee - strong dark roast dripped through a phin filter over sweetened condensed milk and ice.',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'very_high',
    sweetness: 'sweet',
    main_ingredients: ['vietnamese coffee', 'condensed milk', 'ice'],
    quantity_description: '60ml strong coffee, 30ml condensed milk, 150g ice',
    ingredient_ids: ['ING_COFFEE_VIETNAMESE', 'ING_CONDENSED_MILK', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass with phin filter',
      volume_ml: 300,
      chain_style_decoration: 'Served with phin',
      premium_style_decoration: 'Traditional phin presentation on glass'
    },
    preparation: {
      method: 'Add condensed milk to glass. Place phin filter on top, add coffee, tamp lightly. Add hot water, let drip 4-5 minutes. Add ice, stir.',
      prep_time_seconds: 300,
      skill_level: 2,
      notes: 'Use coarse-ground robusta for authentic flavor. Phin drip is essential for proper extraction.'
    },
    cost: { ingredient_cost_usd: 0.55, selling_price_usd: 3.50, profit_margin_percent: 84.3 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 200, sugar_g: 25, protein_g: 3, fat_g: 4 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['vietnamese', 'classic', 'iced', 'phin-filter', 'robusta'],
    popularity: 92,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-bac-xiu',
    slug: 'bac-xiu',
    name: 'Bac Xiu (White Coffee)',
    description: 'Southern Vietnamese style coffee with more condensed milk than coffee, creating a sweeter, creamier drink. Popular breakfast choice.',
    category: 'specialty',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'very_sweet',
    main_ingredients: ['vietnamese coffee', 'condensed milk', 'fresh milk'],
    quantity_description: '30ml coffee, 40ml condensed milk, 100ml fresh milk',
    ingredient_ids: ['ING_COFFEE_VIETNAMESE', 'ING_CONDENSED_MILK', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Glass cup',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Served in traditional glass'
    },
    preparation: {
      method: 'Mix condensed milk with warm fresh milk. Add a small amount of strong coffee. Stir well.',
      prep_time_seconds: 60,
      skill_level: 1,
      notes: 'Ratio is typically 1 part coffee to 3 parts milk mixture. Very sweet and mild.'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.00, profit_margin_percent: 83.3 },
    nutrition: { calories_per_serving: 200, caffeine_mg: 50, sugar_g: 30, protein_g: 5, fat_g: 6 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['vietnamese', 'sweet', 'milky', 'breakfast', 'saigon'],
    popularity: 70,
    is_seasonal: false,
    is_signature: false
  }
];

// Trending & Modern Coffee Drinks
export const trendingCoffees: Coffee[] = [
  {
    id: 'coffee-dalgona',
    slug: 'dalgona-coffee',
    name: 'Dalgona Coffee',
    description: 'Viral Korean whipped coffee featuring a thick, creamy foam of instant coffee, sugar, and water over cold milk. TikTok sensation of 2020.',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['instant coffee', 'sugar', 'hot water', 'milk'],
    quantity_description: '2 tbsp instant coffee, 2 tbsp sugar, 2 tbsp hot water, 200ml milk',
    ingredient_ids: ['ING_COFFEE_INSTANT', 'ING_SUGAR', 'ING_WATER', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Clear tall glass',
      volume_ml: 350,
      chain_style_decoration: 'Whipped coffee on top',
      premium_style_decoration: 'Instagrammable layers with cocoa dust'
    },
    preparation: {
      method: 'Whip instant coffee, sugar, and hot water until thick and creamy (3-5 minutes by hand, 1 minute with mixer). Fill glass with ice and milk. Spoon whipped coffee on top.',
      prep_time_seconds: 180,
      skill_level: 1,
      notes: 'Must use instant coffee - espresso will not whip. Equal ratios are key.'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 4.00, profit_margin_percent: 88.8 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 95, sugar_g: 25, protein_g: 7, fat_g: 5 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat', 'almond', 'coconut'], available_syrups: ['vanilla', 'caramel'], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['korean', 'viral', 'whipped', 'tiktok', 'instagram', 'trending'],
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-bulletproof',
    slug: 'bulletproof-coffee',
    name: 'Bulletproof Coffee',
    description: 'Keto-friendly coffee blended with grass-fed butter and MCT oil. Provides sustained energy and mental clarity. Popular biohacking drink.',
    category: 'specialty',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['brewed coffee', 'grass-fed butter', 'mct oil'],
    quantity_description: '250ml black coffee, 15g grass-fed butter, 15ml MCT oil',
    ingredient_ids: ['ING_COFFEE_FILTER', 'ING_BUTTER_GRASSFED', 'ING_MCT_OIL'],
    serving: {
      glass_type: 'Large ceramic mug',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Frothy top from blending'
    },
    preparation: {
      method: 'Brew fresh coffee. Add to blender with butter and MCT oil. Blend 20-30 seconds until frothy and creamy like a latte.',
      prep_time_seconds: 120,
      skill_level: 1,
      notes: 'Must blend - stirring will not emulsify properly. Start with less MCT oil to avoid digestive issues.'
    },
    cost: { ingredient_cost_usd: 1.20, selling_price_usd: 5.50, profit_margin_percent: 78.2 },
    nutrition: { calories_per_serving: 250, caffeine_mg: 120, sugar_g: 0, protein_g: 0.5, fat_g: 28 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['keto', 'biohacking', 'bulletproof', 'butter-coffee', 'wellness', 'energy'],
    popularity: 75,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-cloud-coffee',
    slug: 'cloud-coffee',
    name: 'Cloud Coffee',
    description: 'Newest TikTok trend - ethereal layered drink with coconut water, espresso, and whipped cream creating a dreamy, cloud-like effect.',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'lightly_sweet',
    main_ingredients: ['espresso', 'coconut water', 'heavy cream', 'ice'],
    quantity_description: '60ml espresso, 150ml coconut water, 50ml heavy cream, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_COCONUT_WATER', 'ING_HEAVY_CREAM', 'ING_ICE'],
    serving: {
      glass_type: 'Tall clear glass',
      volume_ml: 400,
      chain_style_decoration: 'Cream cloud on top',
      premium_style_decoration: 'Dramatic cream cloud with espresso pour'
    },
    preparation: {
      method: 'Fill glass with ice and coconut water. Whip cream until fluffy. Float whipped cream on top like a cloud. Slowly pour espresso through the cream.',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'The espresso should cascade through the cream creating visual effect. Very refreshing and tropical.'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 5.00, profit_margin_percent: 81.0 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 126, sugar_g: 12, protein_g: 2, fat_g: 14 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk', 'coconut'] },
    customization: { available_milks: ['none'], available_syrups: ['vanilla'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['trending', 'tiktok', 'cloud', 'aesthetic', 'tropical', 'coconut'],
    popularity: 78,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-mushroom-coffee',
    slug: 'mushroom-coffee',
    name: 'Mushroom Coffee',
    description: 'Adaptogenic coffee blended with medicinal mushrooms like lions mane, chaga, and reishi. Promotes focus without jitters.',
    category: 'specialty',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['coffee', 'lions mane extract', 'chaga extract', 'reishi extract'],
    quantity_description: '200ml coffee, 1g lions mane, 0.5g chaga, 0.5g reishi',
    ingredient_ids: ['ING_COFFEE_FILTER', 'ING_LIONS_MANE', 'ING_CHAGA', 'ING_REISHI'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 250,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Served with mushroom info card'
    },
    preparation: {
      method: 'Brew coffee normally. Stir in mushroom extracts until dissolved. Can add honey or coconut milk if desired.',
      prep_time_seconds: 90,
      skill_level: 1,
      notes: 'Use high-quality mushroom extracts. Lions mane for focus, reishi for calm, chaga for immunity.'
    },
    cost: { ingredient_cost_usd: 1.50, selling_price_usd: 6.00, profit_margin_percent: 75.0 },
    nutrition: { calories_per_serving: 10, caffeine_mg: 80, sugar_g: 0, protein_g: 0.5, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['oat', 'coconut', 'almond'], available_syrups: ['honey'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['adaptogenic', 'mushroom', 'wellness', 'focus', 'functional', 'biohacking'],
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-proffee',
    slug: 'proffee',
    name: 'Proffee (Protein Coffee)',
    description: 'Gym-goers favorite - cold brew or iced coffee mixed with protein shake for post-workout recovery and caffeine boost.',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'lightly_sweet',
    main_ingredients: ['cold brew coffee', 'protein powder', 'milk', 'ice'],
    quantity_description: '150ml cold brew, 30g protein powder, 100ml milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_COLD_BREW', 'ING_PROTEIN_POWDER', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Shaker bottle or tall glass',
      volume_ml: 450,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Served in gym-style shaker'
    },
    preparation: {
      method: 'Add cold brew, protein powder, milk, and ice to shaker. Shake vigorously until protein is dissolved. Pour over ice.',
      prep_time_seconds: 60,
      skill_level: 1,
      notes: 'Use vanilla or chocolate protein for best taste. Cold brew works better than hot coffee with protein.'
    },
    cost: { ingredient_cost_usd: 1.30, selling_price_usd: 5.50, profit_margin_percent: 76.4 },
    nutrition: { calories_per_serving: 200, caffeine_mg: 180, sugar_g: 8, protein_g: 25, fat_g: 3 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk', 'soy'] },
    customization: { available_milks: ['whole', 'almond', 'oat'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['protein', 'fitness', 'gym', 'post-workout', 'functional', 'healthy'],
    popularity: 76,
    is_seasonal: false,
    is_signature: false
  }
];

// Traditional World Coffees
export const traditionalWorldCoffees: Coffee[] = [
  {
    id: 'coffee-turkish',
    slug: 'turkish-coffee',
    name: 'Turkish Coffee (Turk Kahvesi)',
    description: 'Unfiltered coffee brewed in a cezve with finely ground beans. Rich, thick, with foam (kaymak) and grounds settling at bottom. UNESCO cultural heritage.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'very_high',
    sweetness: 'unsweetened',
    main_ingredients: ['extra-fine ground coffee', 'water', 'sugar'],
    quantity_description: '7g extra-fine coffee, 60ml water, sugar to taste',
    ingredient_ids: ['ING_COFFEE_TURKISH', 'ING_WATER', 'ING_SUGAR'],
    serving: {
      glass_type: 'Demitasse cup (fincan)',
      volume_ml: 60,
      chain_style_decoration: 'Served with lokum (Turkish delight)',
      premium_style_decoration: 'Traditional copper cezve presentation with water and lokum'
    },
    preparation: {
      method: 'Combine coffee, water, and sugar in cezve. Heat slowly, stirring. When foam rises, remove from heat. Repeat 2-3 times. Pour slowly, preserving foam.',
      prep_time_seconds: 180,
      skill_level: 3,
      notes: 'Never stir after pouring. Wait for grounds to settle. Fortune telling from grounds is tradition.'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 3.50, profit_margin_percent: 88.6 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 65, sugar_g: 0, protein_g: 0.1, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['turkish', 'traditional', 'unfiltered', 'cezve', 'unesco', 'ceremonial'],
    popularity: 80,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-greek',
    slug: 'greek-coffee',
    name: 'Greek Coffee (Ellinikos Kafes)',
    description: 'Similar to Turkish coffee but with Greek heritage. Brewed in briki, served in small cups. Essential to Greek cafe culture.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'very_high',
    sweetness: 'unsweetened',
    main_ingredients: ['finely ground coffee', 'water', 'sugar'],
    quantity_description: '7g fine coffee, 60ml water, sugar optional',
    ingredient_ids: ['ING_COFFEE_GREEK', 'ING_WATER', 'ING_SUGAR'],
    serving: {
      glass_type: 'Small cup (demitasse)',
      volume_ml: 60,
      chain_style_decoration: 'Glass of cold water on side',
      premium_style_decoration: 'Briki presentation with cold water'
    },
    preparation: {
      method: 'Sketos (no sugar), Metrios (medium), or Glykos (sweet). Combine in briki, heat until foam rises, pour preserving kaimaki (foam).',
      prep_time_seconds: 180,
      skill_level: 3,
      notes: 'Good kaimaki is sign of well-made coffee. Drink water first to cleanse palate.'
    },
    cost: { ingredient_cost_usd: 0.35, selling_price_usd: 3.00, profit_margin_percent: 88.3 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 65, sugar_g: 0, protein_g: 0.1, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['greek', 'traditional', 'briki', 'mediterranean', 'ceremonial'],
    popularity: 75,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-arabic-cardamom',
    slug: 'arabic-cardamom-coffee',
    name: 'Arabic Coffee with Cardamom (Qahwa)',
    description: 'Lightly roasted Arabic coffee brewed with cardamom, sometimes saffron. Symbol of hospitality across the Gulf and Middle East.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['arabic coffee', 'cardamom', 'saffron', 'water'],
    quantity_description: '20g light roast coffee, 5 cardamom pods, pinch saffron, 500ml water',
    ingredient_ids: ['ING_COFFEE_ARABIC', 'ING_CARDAMOM', 'ING_SAFFRON', 'ING_WATER'],
    serving: {
      glass_type: 'Small handleless cup (finjaan)',
      volume_ml: 50,
      chain_style_decoration: 'Served with dates',
      premium_style_decoration: 'Traditional dallah pot with dates and saffron garnish'
    },
    preparation: {
      method: 'Boil water, add coffee and cardamom, simmer 10 minutes. Add saffron. Let settle, pour from height into small cups. Serve with dates.',
      prep_time_seconds: 600,
      skill_level: 2,
      notes: 'Light roast is traditional. Always serve to elders first. Refill cups until guest tilts cup side to side.'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.00, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 3, caffeine_mg: 40, sugar_g: 0, protein_g: 0.1, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: false, can_make_decaf: false },
    tags: ['arabic', 'middle-eastern', 'cardamom', 'saffron', 'ceremonial', 'hospitality'],
    popularity: 70,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-ethiopian-buna',
    slug: 'ethiopian-buna',
    name: 'Ethiopian Buna (Coffee Ceremony)',
    description: 'The birthplace of coffee. Traditional ceremony involves roasting green beans, grinding in mortar, and brewing in clay jebena. A 2-3 hour ritual of hospitality.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['ethiopian green coffee beans', 'water', 'sugar'],
    quantity_description: '50g green beans (roasted fresh), 500ml water',
    ingredient_ids: ['ING_COFFEE_ETHIOPIAN', 'ING_WATER', 'ING_SUGAR'],
    serving: {
      glass_type: 'Small handleless cups (sini)',
      volume_ml: 50,
      chain_style_decoration: 'Served with popcorn',
      premium_style_decoration: 'Full ceremony with incense, grass spread, and three rounds'
    },
    preparation: {
      method: 'Roast green beans over charcoal until fragrant. Grind with mukecha (mortar). Brew in jebena clay pot. Serve three rounds: Abol, Tona, Baraka.',
      prep_time_seconds: 7200,
      skill_level: 3,
      notes: 'Three rounds are traditional - each progressively weaker. Incense burning and grass flooring are ceremonial elements.'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 8.00, profit_margin_percent: 87.5 },
    nutrition: { calories_per_serving: 3, caffeine_mg: 60, sugar_g: 0, protein_g: 0.1, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['ethiopian', 'ceremony', 'buna', 'traditional', 'origin', 'cultural'],
    popularity: 65,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-cafe-de-olla',
    slug: 'cafe-de-olla',
    name: 'Cafe de Olla (Mexican Clay Pot Coffee)',
    description: 'Traditional Mexican coffee brewed in clay pot with piloncillo (unrefined cane sugar), cinnamon, and sometimes orange peel. Warm and spiced.',
    category: 'specialty',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['dark roast coffee', 'piloncillo', 'cinnamon', 'orange peel'],
    quantity_description: '30g coffee, 40g piloncillo, 1 cinnamon stick, orange peel strip, 500ml water',
    ingredient_ids: ['ING_COFFEE_DARK_ROAST', 'ING_PILONCILLO', 'ING_CINNAMON', 'ING_ORANGE_PEEL'],
    serving: {
      glass_type: 'Clay mug (jarrito)',
      volume_ml: 200,
      chain_style_decoration: 'Cinnamon stick',
      premium_style_decoration: 'Served in traditional clay cup with cinnamon'
    },
    preparation: {
      method: 'Simmer water with piloncillo, cinnamon, and orange peel until dissolved. Add coffee, steep 5 minutes. Strain through cloth into clay cups.',
      prep_time_seconds: 300,
      skill_level: 2,
      notes: 'Clay pot imparts unique earthy flavor. Piloncillo adds molasses notes different from white sugar.'
    },
    cost: { ingredient_cost_usd: 0.55, selling_price_usd: 3.80, profit_margin_percent: 85.5 },
    nutrition: { calories_per_serving: 80, caffeine_mg: 100, sugar_g: 18, protein_g: 0.2, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['mexican', 'traditional', 'spiced', 'clay-pot', 'cinnamon', 'piloncillo'],
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-yuanyang',
    slug: 'yuanyang',
    name: 'Yuanyang (Hong Kong Coffee Tea)',
    description: 'Hong Kong signature drink mixing black tea with coffee, sweetened with condensed milk. Named after mandarin ducks (symbol of couples).',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'very_high',
    sweetness: 'sweet',
    main_ingredients: ['strong coffee', 'black tea', 'condensed milk', 'evaporated milk'],
    quantity_description: '100ml strong coffee, 100ml black tea, 30ml condensed milk, 30ml evaporated milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_BLACK_TEA', 'ING_CONDENSED_MILK', 'ING_EVAPORATED_MILK'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Hong Kong cha chaan teng style'
    },
    preparation: {
      method: 'Brew strong coffee and black tea separately. Mix together with condensed and evaporated milk. Serve hot or over ice.',
      prep_time_seconds: 180,
      skill_level: 2,
      notes: 'Traditional ratio is 7 parts tea to 3 parts coffee. Adjust to taste.'
    },
    cost: { ingredient_cost_usd: 0.65, selling_price_usd: 4.00, profit_margin_percent: 83.8 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 150, sugar_g: 22, protein_g: 5, fat_g: 6 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['hong-kong', 'coffee-tea', 'fusion', 'cha-chaan-teng', 'iconic'],
    popularity: 75,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-swedish-egg',
    slug: 'swedish-egg-coffee',
    name: 'Swedish Egg Coffee (Scandinavian)',
    description: 'Midwest American tradition from Scandinavian immigrants. Whole egg mixed with grounds before brewing creates exceptionally smooth, low-acid coffee.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['coarse ground coffee', 'whole egg', 'water'],
    quantity_description: '80g coffee, 1 whole egg with shell, 2 liters water',
    ingredient_ids: ['ING_COFFEE_FILTER', 'ING_EGG', 'ING_WATER'],
    serving: {
      glass_type: 'Large mug',
      volume_ml: 300,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Served church-basement style in large quantities'
    },
    preparation: {
      method: 'Crush egg (shell included) and mix with grounds to form sludge. Add to boiling water, boil 3 min. Add cold water to settle grounds. Strain and serve.',
      prep_time_seconds: 300,
      skill_level: 2,
      notes: 'Egg proteins bind to tannins reducing bitterness. Eggshell adds calcium for smoother taste. Makes large batches.'
    },
    cost: { ingredient_cost_usd: 0.35, selling_price_usd: 3.00, profit_margin_percent: 88.3 },
    nutrition: { calories_per_serving: 15, caffeine_mg: 100, sugar_g: 0, protein_g: 1, fat_g: 0.5 },
    dietary: { is_vegan: false, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: ['eggs'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['scandinavian', 'swedish', 'midwest', 'egg-coffee', 'smooth', 'low-acid'],
    popularity: 55,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-cafe-touba',
    slug: 'cafe-touba',
    name: 'Cafe Touba (Senegalese Spiced Coffee)',
    description: 'Senegalese specialty with coffee beans roasted with selim pepper (Guinea pepper) and cloves. Named after holy city of Touba.',
    category: 'specialty',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['coffee beans', 'selim pepper', 'cloves', 'sugar'],
    quantity_description: '30g coffee with spices, 250ml water, sugar to taste',
    ingredient_ids: ['ING_COFFEE_ROBUSTA', 'ING_SELIM_PEPPER', 'ING_CLOVES', 'ING_SUGAR'],
    serving: {
      glass_type: 'Small glass',
      volume_ml: 150,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Traditional Senegalese presentation'
    },
    preparation: {
      method: 'Beans are traditionally roasted with spices before grinding. Brew strong filter coffee. Add sugar to taste.',
      prep_time_seconds: 180,
      skill_level: 2,
      notes: 'Selim pepper gives unique spicy, woody flavor. Often sold pre-mixed by street vendors in Senegal.'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.50, profit_margin_percent: 85.7 },
    nutrition: { calories_per_serving: 30, caffeine_mg: 100, sugar_g: 8, protein_g: 0.2, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['senegalese', 'african', 'spiced', 'selim-pepper', 'traditional'],
    popularity: 50,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-cortado',
    slug: 'cortado',
    name: 'Cortado',
    description: 'Spanish origin - espresso cut with equal amount of warm milk to reduce acidity. Smooth, balanced, and perfectly sized.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'steamed milk'],
    quantity_description: '60ml espresso, 60ml steamed milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Small glass (gibraltar)',
      volume_ml: 130,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Served in traditional gibraltar glass'
    },
    preparation: {
      method: 'Pull double espresso. Steam milk without much foam. Pour equal parts milk into espresso.',
      prep_time_seconds: 60,
      skill_level: 2,
      notes: 'Milk should be warm, not hot or frothy. The word cortado means cut in Spanish.'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.50, profit_margin_percent: 85.7 },
    nutrition: { calories_per_serving: 60, caffeine_mg: 126, sugar_g: 5, protein_g: 3, fat_g: 3 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['spanish', 'cortado', 'balanced', 'small', 'european'],
    popularity: 82,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-piccolo-latte',
    slug: 'piccolo-latte',
    name: 'Piccolo Latte',
    description: 'Australian cafe staple - a ristretto shot topped with silky steamed milk in a small glass. Stronger than a latte, smaller than a cortado.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['ristretto', 'steamed milk'],
    quantity_description: '20ml ristretto, 60ml steamed milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Small espresso glass (demitasse)',
      volume_ml: 90,
      chain_style_decoration: 'Tiny latte art',
      premium_style_decoration: 'Micro latte art'
    },
    preparation: {
      method: 'Pull ristretto (short espresso). Steam milk with microfoam. Pour with latte art technique.',
      prep_time_seconds: 50,
      skill_level: 2,
      notes: 'Ristretto is key - shorter extraction gives sweeter, more intense shot. Popular with baristas for tasting.'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 3.20, profit_margin_percent: 85.9 },
    nutrition: { calories_per_serving: 45, caffeine_mg: 65, sugar_g: 4, protein_g: 2, fat_g: 2 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['australian', 'piccolo', 'ristretto', 'small', 'specialty'],
    popularity: 78,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-einspanner',
    slug: 'einspanner',
    name: 'Einspanner (Vienna Coffee)',
    description: 'Viennese coffee house classic - strong black coffee topped with generous whipped cream, served in tall glass with handle.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['strong coffee', 'whipped cream', 'powdered sugar'],
    quantity_description: '150ml strong coffee, 50g whipped cream, powdered sugar',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WHIPPED_CREAM', 'ING_POWDERED_SUGAR'],
    serving: {
      glass_type: 'Tall glass with handle',
      volume_ml: 250,
      chain_style_decoration: 'Whipped cream cloud',
      premium_style_decoration: 'Traditional Viennese presentation with silver tray'
    },
    preparation: {
      method: 'Make strong double espresso or filtered coffee. Pour into glass. Top with lightly sweetened whipped cream. Dust with powdered sugar.',
      prep_time_seconds: 90,
      skill_level: 1,
      notes: 'Named after one-horse carriage drivers who could hold the glass by handle while driving. Drink coffee through cream.'
    },
    cost: { ingredient_cost_usd: 0.70, selling_price_usd: 4.50, profit_margin_percent: 84.4 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 150, sugar_g: 15, protein_g: 2, fat_g: 15 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['viennese', 'austrian', 'whipped-cream', 'coffee-house', 'classic'],
    popularity: 68,
    is_seasonal: false,
    is_signature: false
  }
];

// Specialty & Unique Coffee Drinks
export const specialtyCoffees: Coffee[] = [
  {
    id: 'coffee-espresso-romano',
    slug: 'espresso-romano',
    name: 'Espresso Romano',
    description: 'Italian classic - espresso served with a lemon twist or slice. The citrus enhances the espresso complexity and aids digestion.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'lemon peel'],
    quantity_description: '30ml espresso, 1 lemon twist',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_LEMON'],
    serving: {
      glass_type: 'Espresso cup',
      volume_ml: 60,
      chain_style_decoration: 'Lemon twist on saucer',
      premium_style_decoration: 'Fresh lemon zest with peel'
    },
    preparation: {
      method: 'Pull single espresso. Serve with fresh lemon twist on the side. Guest can rub rim or drop in.',
      prep_time_seconds: 45,
      skill_level: 1,
      notes: 'Lemon should be fresh. Some rub it on cup rim, others drop it in. Personal preference.'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 3.00, profit_margin_percent: 86.7 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 63, sugar_g: 0, protein_g: 0.1, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['italian', 'espresso', 'lemon', 'digestive', 'classic'],
    popularity: 65,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-irish-coffee',
    slug: 'irish-coffee',
    name: 'Irish Coffee',
    description: 'Classic cocktail of hot coffee, Irish whiskey, sugar, and cream floated on top. Warming, boozy, and indulgent.',
    category: 'specialty',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['hot coffee', 'irish whiskey', 'brown sugar', 'heavy cream'],
    quantity_description: '150ml coffee, 45ml whiskey, 10g brown sugar, 30ml cream',
    ingredient_ids: ['ING_COFFEE_FILTER', 'ING_IRISH_WHISKEY', 'ING_BROWN_SUGAR', 'ING_HEAVY_CREAM'],
    serving: {
      glass_type: 'Irish coffee glass (stemmed)',
      volume_ml: 240,
      chain_style_decoration: 'Cream layer',
      premium_style_decoration: 'Perfect cream float with nutmeg'
    },
    preparation: {
      method: 'Preheat glass. Add sugar and coffee, stir to dissolve. Add whiskey. Float lightly whipped cream on top using spoon.',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Cream should float - do not mix. Drink coffee through cream layer. Contains alcohol.'
    },
    cost: { ingredient_cost_usd: 1.80, selling_price_usd: 8.00, profit_margin_percent: 77.5 },
    nutrition: { calories_per_serving: 220, caffeine_mg: 100, sugar_g: 12, protein_g: 1, fat_g: 10 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['irish', 'cocktail', 'alcoholic', 'whiskey', 'warming', 'classic'],
    popularity: 75,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'coffee-cafe-bombon',
    slug: 'cafe-bombon',
    name: 'Cafe Bombon (Spanish)',
    description: 'Valencia specialty - espresso layered with condensed milk in equal parts, creating beautiful layered effect in glass.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'condensed milk'],
    quantity_description: '30ml espresso, 30ml condensed milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_CONDENSED_MILK'],
    serving: {
      glass_type: 'Small clear glass',
      volume_ml: 80,
      chain_style_decoration: 'Visible layers',
      premium_style_decoration: 'Perfect two-tone layers'
    },
    preparation: {
      method: 'Pour condensed milk into glass. Slowly pour espresso over back of spoon to create distinct layers.',
      prep_time_seconds: 60,
      skill_level: 2,
      notes: 'Do not stir - beauty is in the layers. Mix as you drink or leave separate.'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 3.50, profit_margin_percent: 87.1 },
    nutrition: { calories_per_serving: 130, caffeine_mg: 63, sugar_g: 22, protein_g: 3, fat_g: 3 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['spanish', 'valencia', 'layered', 'sweet', 'visual'],
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-mazagran',
    slug: 'mazagran',
    name: 'Mazagran (Portuguese Iced Coffee)',
    description: 'Claimed to be the original iced coffee. Strong espresso mixed with lemon juice and sugar, served over ice. Refreshing and tangy.',
    category: 'specialty',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['espresso', 'lemon juice', 'sugar', 'ice'],
    quantity_description: '60ml espresso, 15ml lemon juice, 10g sugar, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_LEMON_JUICE', 'ING_SUGAR', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 250,
      chain_style_decoration: 'Lemon slice',
      premium_style_decoration: 'Lemon wheel and mint sprig'
    },
    preparation: {
      method: 'Dissolve sugar in hot espresso. Cool. Add lemon juice. Pour over ice. Garnish with lemon.',
      prep_time_seconds: 90,
      skill_level: 1,
      notes: 'Originated from French soldiers in Algeria. The lemon makes it incredibly refreshing.'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.80, profit_margin_percent: 86.8 },
    nutrition: { calories_per_serving: 50, caffeine_mg: 126, sugar_g: 12, protein_g: 0.2, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['portuguese', 'iced', 'lemon', 'refreshing', 'original-iced-coffee'],
    popularity: 60,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'coffee-cafe-cubano',
    slug: 'cafe-cubano',
    name: 'Cafe Cubano (Cuban Espresso)',
    description: 'Sweet, strong Cuban espresso whipped with demerara sugar during brewing to create crema called espumita.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'very_high',
    sweetness: 'very_sweet',
    main_ingredients: ['dark roast espresso', 'demerara sugar'],
    quantity_description: '30ml espresso, 15g demerara sugar',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_DEMERARA_SUGAR'],
    serving: {
      glass_type: 'Tacita (small cup)',
      volume_ml: 60,
      chain_style_decoration: 'Espumita foam',
      premium_style_decoration: 'Thick caramelized foam layer'
    },
    preparation: {
      method: 'Add sugar to cup. Add first drops of espresso to sugar and whip vigorously to create espumita paste. Pour remaining espresso and stir.',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'The secret is whipping the sugar with first drops of coffee. Creates caramelized foam that floats.'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 2.80, profit_margin_percent: 85.7 },
    nutrition: { calories_per_serving: 60, caffeine_mg: 80, sugar_g: 15, protein_g: 0.1, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['cuban', 'sweet', 'strong', 'espumita', 'latin'],
    popularity: 78,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-con-panna',
    slug: 'espresso-con-panna',
    name: 'Espresso Con Panna',
    description: 'Espresso with a dollop of whipped cream on top. Simple Italian indulgence meaning espresso with cream.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'lightly_sweet',
    main_ingredients: ['espresso', 'whipped cream'],
    quantity_description: '30ml espresso, 20g whipped cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Espresso cup',
      volume_ml: 60,
      chain_style_decoration: 'Whipped cream dollop',
      premium_style_decoration: 'Fresh whipped cream rosette'
    },
    preparation: {
      method: 'Pull single or double espresso. Top with dollop of unsweetened or lightly sweetened whipped cream.',
      prep_time_seconds: 50,
      skill_level: 1,
      notes: 'Con panna means with cream in Italian. Cream should be cold and fresh whipped.'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 3.20, profit_margin_percent: 85.9 },
    nutrition: { calories_per_serving: 60, caffeine_mg: 63, sugar_g: 2, protein_g: 1, fat_g: 5 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: ['chocolate', 'caramel'], can_add_espresso_shot: true, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['italian', 'espresso', 'cream', 'simple', 'classic'],
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-kyoto-cold-brew',
    slug: 'kyoto-cold-brew',
    name: 'Kyoto-Style Cold Brew',
    description: 'Japanese slow-drip method taking 8-12 hours. Water drips drop by drop through coffee, creating an exceptionally smooth, delicate brew.',
    category: 'cold_brew',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['medium roast coffee', 'ice water'],
    quantity_description: '50g coffee, 500ml ice water (drip over 8-12 hours)',
    ingredient_ids: ['ING_COFFEE_FILTER', 'ING_WATER', 'ING_ICE'],
    serving: {
      glass_type: 'Wine glass or beaker',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Served in elegant glassware with ice sphere'
    },
    preparation: {
      method: 'Set up Kyoto drip tower. Add ice water to top chamber, coffee to middle. Adjust drip rate to 1 drop per second. Let drip 8-12 hours.',
      prep_time_seconds: 43200,
      skill_level: 3,
      notes: 'Also called slow drip or Dutch coffee. Results in wine-like complexity. Serve undiluted.'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 6.00, profit_margin_percent: 83.3 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 120, sugar_g: 0, protein_g: 0.2, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none', 'oat'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: false, can_make_decaf: false },
    tags: ['japanese', 'kyoto', 'slow-drip', 'artisan', 'smooth', 'specialty'],
    popularity: 70,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-avocado-coffee',
    slug: 'avocado-coffee',
    name: 'Avocado Coffee (Es Alpukat Kopi)',
    description: 'Indonesian and Vietnamese favorite - creamy avocado smoothie blended with coffee. Rich, healthy, and satisfying meal replacement.',
    category: 'specialty',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'avocado', 'condensed milk', 'ice'],
    quantity_description: '60ml espresso, 1/2 avocado, 30ml condensed milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_AVOCADO', 'ING_CONDENSED_MILK', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Avocado slice and cocoa dust'
    },
    preparation: {
      method: 'Blend avocado with condensed milk and ice until smooth. Pour into glass. Float espresso on top or layer.',
      prep_time_seconds: 120,
      skill_level: 1,
      notes: 'Popular breakfast drink in Southeast Asia. Avocado provides healthy fats and creaminess.'
    },
    cost: { ingredient_cost_usd: 1.10, selling_price_usd: 5.00, profit_margin_percent: 78.0 },
    nutrition: { calories_per_serving: 320, caffeine_mg: 126, sugar_g: 25, protein_g: 4, fat_g: 18 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['coconut'], available_syrups: ['chocolate'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['indonesian', 'vietnamese', 'avocado', 'smoothie', 'healthy', 'filling'],
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  }
];

// Export all world coffees
export const allWorldCoffees: Coffee[] = [
  ...vietnameseCoffees,
  ...trendingCoffees,
  ...traditionalWorldCoffees,
  ...specialtyCoffees
];

export default allWorldCoffees;
