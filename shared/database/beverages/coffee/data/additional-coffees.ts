/**
 * Additional Coffee Recipes - COFFEE-BASED ONLY
 *
 * Coffee Mix, Cold Brew, Filter, and Frappuccino drinks
 * Matcha moved to Tea & Infusions database
 */

import type { Coffee } from '../types';

// Coffee Mix drinks (all espresso-based)
export const additionalCoffeeMix: Coffee[] = [
  {
    id: 'coffee-kinder-coffee-iced',
    slug: 'kinder-coffee-iced',
    name: 'Kinder Coffee (Iced)',
    description: 'Sweet blend featuring Kinder chocolate, white chocolate syrup, and espresso.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'white chocolate syrup', 'kinder chocolate', 'milk', 'ice'],
    quantity_description: '60ml espresso, 20ml white chocolate syrup, 1 bar Kinder, 150ml milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_KINDER', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Whipped cream + white chocolate drizzle',
      premium_style_decoration: 'Rim with white chocolate shards'
    },
    preparation: {
      method: 'Blend all except espresso; pour espresso on top',
      prep_time_seconds: 95,
      skill_level: 3,
      notes: 'Garnish with Kinder flakes'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.70, profit_margin_percent: 79.8 },
    nutrition: { calories_per_serving: 390, caffeine_mg: 126, sugar_g: 48, protein_g: 10, fat_g: 18 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: false, is_sugar_free: false, default_milk: 'whole', allergens: ['milk', 'nuts', 'gluten'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['kinder', 'sweet', 'indulgent', 'chocolate'], popularity: 82, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-bounty-coffee',
    slug: 'bounty-coffee',
    name: 'Bounty Coffee',
    description: 'Tropical coconut cream meets chocolate and espresso, inspired by the Bounty bar.',
    category: 'coffee_mix',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'coconut cream', 'milk', 'chocolate syrup', 'ice'],
    quantity_description: '60ml espresso, 20ml coconut cream, 120ml milk, 10ml chocolate syrup, 80g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_COCONUT_CREAM', 'ING_MILK_WHOLE', 'ING_CHOCOLATE_SYRUP', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Coconut flakes',
      premium_style_decoration: 'Chocolate-coconut rim'
    },
    preparation: {
      method: 'Shake coconut cream + milk with ice; float espresso',
      prep_time_seconds: 90,
      skill_level: 3,
      notes: 'Shredded coconut rim'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.60, profit_margin_percent: 80.4 },
    nutrition: { calories_per_serving: 310, caffeine_mg: 126, sugar_g: 32, protein_g: 6, fat_g: 16 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk', 'coconut'] },
    customization: { available_milks: ['whole', 'coconut'], available_syrups: ['extra chocolate'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['coconut', 'chocolate', 'tropical', 'bounty'], popularity: 75, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-snickers-coffee',
    slug: 'snickers-coffee',
    name: 'Snickers Coffee',
    description: 'Caramel, chocolate, peanut butter and espresso combine for the ultimate candy bar coffee.',
    category: 'coffee_mix',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'caramel syrup', 'chocolate syrup', 'peanut butter', 'milk'],
    quantity_description: '60ml espresso, 15ml caramel, 10ml chocolate, 10g peanut butter, 150ml milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_CARAMEL_SYRUP', 'ING_CHOCOLATE_SYRUP', 'ING_PEANUT_BUTTER', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Whipped cream + caramel',
      premium_style_decoration: 'Crushed peanut rim'
    },
    preparation: {
      method: 'Steam milk with syrups + peanut butter; pour over espresso',
      prep_time_seconds: 100,
      skill_level: 3,
      notes: 'Peanut crunch sprinkle'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 4.80, profit_margin_percent: 79.2 },
    nutrition: { calories_per_serving: 380, caffeine_mg: 126, sugar_g: 42, protein_g: 10, fat_g: 18 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk', 'peanuts'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: ['extra caramel'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['peanut', 'caramel', 'chocolate', 'candy-bar'], popularity: 78, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-fantasy-coffee',
    slug: 'fantasy-coffee',
    name: 'Fantasy Coffee',
    description: 'Creamy blended coffee with vanilla ice cream and whipped cream.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'vanilla ice cream', 'milk', 'whipped cream'],
    quantity_description: '60ml espresso, 1 scoop ice cream, 100ml milk, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM', 'ING_MILK_WHOLE', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'Whipped cream',
      premium_style_decoration: 'Chocolate flakes + straw'
    },
    preparation: {
      method: 'Blend all; top with whipped cream',
      prep_time_seconds: 85,
      skill_level: 2,
      notes: 'Serve with straw'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 320, caffeine_mg: 126, sugar_g: 35, protein_g: 8, fat_g: 15 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole'], available_syrups: ['vanilla', 'caramel'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['blended', 'creamy', 'ice-cream', 'indulgent'], popularity: 80, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-dolce-gusto',
    slug: 'dolce-gusto',
    name: 'Dolce Gusto Coffee',
    description: 'Sweet Vietnamese-inspired coffee with condensed milk and cream.',
    category: 'coffee_mix',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'condensed milk', 'milk', 'cream'],
    quantity_description: '60ml espresso, 30ml condensed milk, 100ml milk, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_CONDENSED_MILK', 'ING_MILK_WHOLE', 'ING_HEAVY_CREAM'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Cream top',
      premium_style_decoration: 'Cream spiral + cocoa dust'
    },
    preparation: {
      method: 'Shake milk + condensed, add espresso, finish with cream',
      prep_time_seconds: 80,
      skill_level: 2,
      notes: 'Sweeter profile'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 4.20, profit_margin_percent: 79.8 },
    nutrition: { calories_per_serving: 290, caffeine_mg: 126, sugar_g: 38, protein_g: 8, fat_g: 12 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['vietnamese', 'sweet', 'condensed-milk', 'creamy'], popularity: 76, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-black-star',
    slug: 'black-star',
    name: 'Black Star',
    description: 'Dramatic black cocoa coffee with vanilla notes, served in a transparent glass.',
    category: 'coffee_mix',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['espresso', 'black cocoa powder', 'milk', 'vanilla syrup'],
    quantity_description: '60ml espresso, 5g black cocoa, 150ml milk, 10ml vanilla',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_BLACK_COCOA', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Cocoa dust',
      premium_style_decoration: 'Black cocoa stencil'
    },
    preparation: {
      method: 'Steam milk with cocoa; add espresso',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Serve in transparent glass'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 200, caffeine_mg: 126, sugar_g: 18, protein_g: 8, fat_g: 8 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: ['vanilla'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['dramatic', 'black-cocoa', 'unique', 'visual'], popularity: 72, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-white-mocha-glace',
    slug: 'white-mocha-glace',
    name: 'White Mocha Glace',
    description: 'Frozen white chocolate coffee with ice cream for a dessert-like experience.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'white chocolate syrup', 'milk', 'ice cream'],
    quantity_description: '60ml espresso, 20ml white chocolate syrup, 120ml milk, 1 scoop ice cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_VANILLA_ICE_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Whipped cream',
      premium_style_decoration: 'White chocolate shards'
    },
    preparation: {
      method: 'Blend milk + syrup + ice cream; add espresso',
      prep_time_seconds: 95,
      skill_level: 3,
      notes: 'Whipped cream optional'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.70, profit_margin_percent: 79.8 },
    nutrition: { calories_per_serving: 380, caffeine_mg: 126, sugar_g: 48, protein_g: 9, fat_g: 16 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole'], available_syrups: ['extra white chocolate'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['frozen', 'white-chocolate', 'ice-cream', 'dessert'], popularity: 77, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-coffee-glace',
    slug: 'coffee-glace',
    name: 'Coffee Glace',
    description: 'Classic Italian-style coffee served over vanilla ice cream with whipped cream.',
    category: 'coffee_mix',
    style: 'layered',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'vanilla ice cream', 'whipped cream'],
    quantity_description: '60ml espresso, 1 scoop ice cream, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Dessert glass',
      volume_ml: 250,
      chain_style_decoration: 'Whipped cream',
      premium_style_decoration: 'Chocolate shard'
    },
    preparation: {
      method: 'Pour espresso over ice cream; top with cream',
      prep_time_seconds: 70,
      skill_level: 2,
      notes: 'Serve immediately'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 4.20, profit_margin_percent: 79.8 },
    nutrition: { calories_per_serving: 250, caffeine_mg: 126, sugar_g: 25, protein_g: 5, fat_g: 12 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none'], available_syrups: ['chocolate', 'caramel'], can_add_espresso_shot: true, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['italian', 'ice-cream', 'dessert', 'classic'], popularity: 78, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-cookie-coffee',
    slug: 'cookie-coffee',
    name: 'Cookie Coffee',
    description: 'Blended cookie crumble coffee with chocolate syrup for cookie lovers.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'cookie crumble', 'milk', 'chocolate syrup'],
    quantity_description: '60ml espresso, 20g cookie, 150ml milk, 15ml syrup',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_COOKIE', 'ING_MILK_WHOLE', 'ING_CHOCOLATE_SYRUP'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'Chocolate drizzle',
      premium_style_decoration: 'Cookie rim'
    },
    preparation: {
      method: 'Blend milk + cookie + syrup; add espresso',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Cream & crumbs optional'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.40, profit_margin_percent: 79.5 },
    nutrition: { calories_per_serving: 320, caffeine_mg: 126, sugar_g: 38, protein_g: 8, fat_g: 14 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: false, is_sugar_free: false, default_milk: 'whole', allergens: ['milk', 'gluten'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: ['extra chocolate'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['cookie', 'chocolate', 'blended', 'sweet'], popularity: 79, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-iced-creamy-coffee',
    slug: 'iced-creamy-coffee',
    name: 'Iced Creamy Coffee',
    description: 'Smooth iced coffee with extra cream for a rich, velvety texture.',
    category: 'coffee_mix',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'lightly_sweet',
    main_ingredients: ['espresso', 'cream', 'milk', 'ice'],
    quantity_description: '60ml espresso, 40ml cream, 120ml milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_HEAVY_CREAM', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Cream float layer'
    },
    preparation: {
      method: 'Shake milk + cream with ice; float espresso',
      prep_time_seconds: 80,
      skill_level: 2,
      notes: 'Sugar to taste'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 4.20, profit_margin_percent: 79.8 },
    nutrition: { calories_per_serving: 220, caffeine_mg: 126, sugar_g: 12, protein_g: 6, fat_g: 14 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole'], available_syrups: ['vanilla', 'caramel'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['creamy', 'iced', 'smooth', 'refreshing'], popularity: 74, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-kinder-white-cream',
    slug: 'kinder-white-cream',
    name: 'Kinder White Cream',
    description: 'White chocolate and cream coffee inspired by Kinder white chocolate.',
    category: 'coffee_mix',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'white chocolate', 'cream', 'milk'],
    quantity_description: '60ml espresso, 20g white chocolate, 20g cream, 120ml milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE', 'ING_HEAVY_CREAM', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'White chocolate drizzle',
      premium_style_decoration: 'White chocolate curl'
    },
    preparation: {
      method: 'Steam milk + chocolate; add espresso; top with cream',
      prep_time_seconds: 95,
      skill_level: 3,
      notes: 'Serve hot or iced'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.70, profit_margin_percent: 79.8 },
    nutrition: { calories_per_serving: 350, caffeine_mg: 126, sugar_g: 42, protein_g: 8, fat_g: 18 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['white-chocolate', 'creamy', 'sweet', 'premium'], popularity: 73, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-dolce-glace',
    slug: 'dolce-glace',
    name: 'Dolce Glace',
    description: 'Sweet dessert coffee combining condensed milk, ice cream, and espresso.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'condensed milk', 'ice cream', 'milk'],
    quantity_description: '60ml espresso, 20ml condensed milk, 1 scoop ice cream, 120ml milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_CONDENSED_MILK', 'ING_VANILLA_ICE_CREAM', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Cream top',
      premium_style_decoration: 'Cocoa dust + wafer'
    },
    preparation: {
      method: 'Blend cold ingredients; add espresso',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Sweet, dessert-like'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 340, caffeine_mg: 126, sugar_g: 45, protein_g: 8, fat_g: 14 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['dessert', 'sweet', 'ice-cream', 'condensed-milk'], popularity: 75, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-iced-white-mocha',
    slug: 'iced-white-mocha',
    name: 'Iced White Mocha Coffee',
    description: 'Refreshing iced white chocolate coffee shaken and served cold.',
    category: 'coffee_mix',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'white chocolate syrup', 'milk', 'ice'],
    quantity_description: '60ml espresso, 20ml syrup, 150ml milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'White chocolate drizzle'
    },
    preparation: {
      method: 'Shake with ice; pour',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Optional cream top'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 126, sugar_g: 38, protein_g: 7, fat_g: 10 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat', 'almond'], available_syrups: ['extra white chocolate'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['iced', 'white-chocolate', 'refreshing', 'summer'], popularity: 80, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-iced-black-star',
    slug: 'iced-black-star',
    name: 'Iced Black Star Coffee',
    description: 'Dramatic iced coffee with black cocoa for a striking dark aesthetic.',
    category: 'coffee_mix',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['espresso', 'black cocoa', 'milk', 'ice'],
    quantity_description: '60ml espresso, 5g black cocoa, 150ml milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_BLACK_COCOA', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'Cocoa dust',
      premium_style_decoration: 'Black cocoa art'
    },
    preparation: {
      method: 'Shake milk + cocoa with ice; pour espresso',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Dark aesthetic'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 126, sugar_g: 15, protein_g: 7, fat_g: 6 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: ['vanilla'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['iced', 'black-cocoa', 'dramatic', 'unique'], popularity: 70, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-iced-nutella',
    slug: 'iced-nutella-coffee',
    name: 'Iced Nutella Coffee',
    description: 'Blended Nutella and espresso over ice with whipped cream topping.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'nutella', 'milk', 'ice', 'cream'],
    quantity_description: '60ml espresso, 25g Nutella, 150ml milk, 80g ice, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_NUTELLA', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Whipped cream + Nutella drizzle',
      premium_style_decoration: 'Hazelnut rim + drizzle'
    },
    preparation: {
      method: 'Blend milk + Nutella; add ice; pour espresso; top with cream',
      prep_time_seconds: 95,
      skill_level: 3,
      notes: 'Use crushed ice'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.70, profit_margin_percent: 79.8 },
    nutrition: { calories_per_serving: 400, caffeine_mg: 126, sugar_g: 50, protein_g: 10, fat_g: 20 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: false, is_sugar_free: false, default_milk: 'whole', allergens: ['milk', 'nuts', 'gluten'] },
    customization: { available_milks: ['whole', 'oat'], available_syrups: [], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['nutella', 'iced', 'indulgent', 'blended'], popularity: 86, is_seasonal: false, is_signature: true
  }
];

// Frappuccino drinks (from Milkshake category - coffee-based only)
export const frappuccinoDrinks: Coffee[] = [
  {
    id: 'coffee-nutella-frappuccino',
    slug: 'nutella-frappuccino',
    name: 'Nutella Frappuccino',
    description: 'Blended Nutella, espresso, ice cream and milk - the ultimate chocolate hazelnut indulgence.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['nutella', 'espresso', 'ice cream', 'milk'],
    quantity_description: '25g Nutella, 60ml espresso, 2 scoops ice cream, 150ml milk',
    ingredient_ids: ['ING_NUTELLA', 'ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 450,
      chain_style_decoration: 'Whipped cream + chocolate drizzle',
      premium_style_decoration: 'Nutella drizzle + hazelnut crumb'
    },
    preparation: {
      method: 'Blend all until smooth',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Top with whipped cream + drizzle'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.80, profit_margin_percent: 80.2 },
    nutrition: { calories_per_serving: 480, caffeine_mg: 126, sugar_g: 55, protein_g: 12, fat_g: 24 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: false, is_sugar_free: false, default_milk: 'whole', allergens: ['milk', 'nuts', 'gluten'] },
    customization: { available_milks: ['whole'], available_syrups: ['extra chocolate'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['frappuccino', 'nutella', 'blended', 'indulgent', 'dessert'], popularity: 88, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-caramel-frappuccino',
    slug: 'caramel-frappuccino',
    name: 'Caramel Frappuccino',
    description: 'Classic blended coffee drink with caramel syrup, ice, and whipped cream.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'caramel syrup', 'milk', 'ice', 'cream'],
    quantity_description: '60ml espresso, 15ml caramel, 150ml milk, 100g ice, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_CARAMEL_SYRUP', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 450,
      chain_style_decoration: 'Whipped cream + caramel',
      premium_style_decoration: 'Caramel lattice art'
    },
    preparation: {
      method: 'Blend all ingredients',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Caramel drizzle'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.60, profit_margin_percent: 80.4 },
    nutrition: { calories_per_serving: 350, caffeine_mg: 126, sugar_g: 42, protein_g: 8, fat_g: 14 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat', 'almond'], available_syrups: ['extra caramel', 'vanilla'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['frappuccino', 'caramel', 'blended', 'classic'], popularity: 90, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-coffee-frappuccino',
    slug: 'coffee-frappuccino',
    name: 'Coffee Frappuccino',
    description: 'The original blended coffee drink with espresso, milk, ice cream and a hint of sugar.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['espresso', 'milk', 'ice', 'ice cream', 'sugar'],
    quantity_description: '60ml espresso, 120ml milk, 100g ice, 1 scoop ice cream, 10g sugar',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_VANILLA_ICE_CREAM', 'ING_SUGAR'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 450,
      chain_style_decoration: 'Whipped cream + syrup drizzle',
      premium_style_decoration: 'Chocolate drizzle + cocoa dust'
    },
    preparation: {
      method: 'Blend until frothy',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Add chocolate syrup optionally'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 4.30, profit_margin_percent: 80.2 },
    nutrition: { calories_per_serving: 300, caffeine_mg: 126, sugar_g: 32, protein_g: 8, fat_g: 12 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat', 'almond'], available_syrups: ['vanilla', 'caramel', 'mocha'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['frappuccino', 'classic', 'blended', 'coffee'], popularity: 92, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-mocha-frappuccino',
    slug: 'mocha-frappuccino',
    name: 'Mocha Frappuccino',
    description: 'Rich chocolate and espresso blended with ice and topped with whipped cream.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'chocolate syrup', 'milk', 'ice', 'whipped cream'],
    quantity_description: '60ml espresso, 20ml chocolate syrup, 150ml milk, 100g ice, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 450,
      chain_style_decoration: 'Whipped cream + chocolate drizzle',
      premium_style_decoration: 'Chocolate shards + cocoa dust'
    },
    preparation: {
      method: 'Blend espresso, chocolate, milk and ice; top with cream',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Double chocolate drizzle'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.60, profit_margin_percent: 80.4 },
    nutrition: { calories_per_serving: 380, caffeine_mg: 126, sugar_g: 45, protein_g: 9, fat_g: 16 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'whole', allergens: ['milk'] },
    customization: { available_milks: ['whole', 'oat', 'almond'], available_syrups: ['extra chocolate', 'white chocolate'], can_add_espresso_shot: true, can_adjust_sweetness: true, can_make_decaf: true },
    tags: ['frappuccino', 'mocha', 'chocolate', 'blended'], popularity: 88, is_seasonal: false, is_signature: false
  }
];

// Cold brew coffees
export const coldBrewCoffees: Coffee[] = [
  {
    id: 'coffee-cold-brew-classic',
    slug: 'cold-brew-classic',
    name: 'Cold Brew (Classic)',
    description: 'Smooth, low-acidity coffee steeped for 12-24 hours and served over ice.',
    category: 'cold_brew',
    style: 'iced',
    caffeine_level: 'very_high',
    sweetness: 'unsweetened',
    main_ingredients: ['cold brew coffee', 'ice'],
    quantity_description: '200ml cold brew, 100g ice',
    ingredient_ids: ['ING_COFFEE_COLD_BREW', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Coffee beans garnish'
    },
    preparation: {
      method: 'Pour cold brew over ice',
      prep_time_seconds: 30,
      skill_level: 1,
      notes: 'Steep 12-24 hours'
    },
    cost: { ingredient_cost_usd: 0.60, selling_price_usd: 3.50, profit_margin_percent: 82.9 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 200, sugar_g: 0, protein_g: 0.3, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none', 'oat', 'almond'], available_syrups: ['vanilla', 'caramel'], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['cold-brew', 'smooth', 'strong', 'low-acid'], popularity: 85, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-cold-brew-vanilla',
    slug: 'cold-brew-vanilla',
    name: 'Vanilla Cold Brew',
    description: 'Classic cold brew enhanced with vanilla syrup and a splash of cream.',
    category: 'cold_brew',
    style: 'iced',
    caffeine_level: 'very_high',
    sweetness: 'medium',
    main_ingredients: ['cold brew coffee', 'vanilla syrup', 'cream', 'ice'],
    quantity_description: '200ml cold brew, 15ml vanilla, 30ml cream, 100g ice',
    ingredient_ids: ['ING_COFFEE_COLD_BREW', 'ING_VANILLA_SYRUP', 'ING_HEAVY_CREAM', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Cream swirl',
      premium_style_decoration: 'Vanilla bean pod'
    },
    preparation: {
      method: 'Pour cold brew over ice; add syrup; top with cream',
      prep_time_seconds: 45,
      skill_level: 1,
      notes: 'Float cream on top'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.20, profit_margin_percent: 81.0 },
    nutrition: { calories_per_serving: 120, caffeine_mg: 200, sugar_g: 18, protein_g: 2, fat_g: 8 },
    dietary: { is_vegan: false, is_dairy_free: false, is_gluten_free: true, is_sugar_free: false, default_milk: 'none', allergens: ['milk'] },
    customization: { available_milks: ['none', 'oat'], available_syrups: ['extra vanilla', 'caramel'], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['cold-brew', 'vanilla', 'creamy', 'smooth'], popularity: 82, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-nitro-cold-brew',
    slug: 'nitro-cold-brew',
    name: 'Nitro Cold Brew',
    description: 'Cold brew infused with nitrogen for a creamy, Guinness-like texture without dairy.',
    category: 'cold_brew',
    style: 'iced',
    caffeine_level: 'very_high',
    sweetness: 'unsweetened',
    main_ingredients: ['cold brew coffee', 'nitrogen'],
    quantity_description: '300ml nitro cold brew',
    ingredient_ids: ['ING_COFFEE_COLD_BREW'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Cascading effect visible'
    },
    preparation: {
      method: 'Dispense from nitro tap',
      prep_time_seconds: 20,
      skill_level: 1,
      notes: 'Serve without ice'
    },
    cost: { ingredient_cost_usd: 0.70, selling_price_usd: 4.50, profit_margin_percent: 84.4 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 200, sugar_g: 0, protein_g: 0.3, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: ['vanilla', 'caramel'], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['nitro', 'cold-brew', 'creamy', 'vegan'], popularity: 78, is_seasonal: false, is_signature: true
  },
  {
    id: 'coffee-cold-brew-oat-milk',
    slug: 'cold-brew-oat-milk',
    name: 'Oat Milk Cold Brew',
    description: 'Smooth cold brew paired with creamy oat milk for a vegan-friendly option.',
    category: 'cold_brew',
    style: 'iced',
    caffeine_level: 'very_high',
    sweetness: 'lightly_sweet',
    main_ingredients: ['cold brew coffee', 'oat milk', 'ice'],
    quantity_description: '150ml cold brew, 100ml oat milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_COLD_BREW', 'ING_MILK_OAT', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Oat flakes garnish'
    },
    preparation: {
      method: 'Pour cold brew and oat milk over ice',
      prep_time_seconds: 30,
      skill_level: 1,
      notes: 'Naturally sweet from oat milk'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 4.50, profit_margin_percent: 81.1 },
    nutrition: { calories_per_serving: 80, caffeine_mg: 180, sugar_g: 8, protein_g: 2, fat_g: 3 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: false, is_sugar_free: false, default_milk: 'oat', allergens: ['gluten'] },
    customization: { available_milks: ['oat'], available_syrups: ['vanilla', 'caramel'], can_add_espresso_shot: false, can_adjust_sweetness: true, can_make_decaf: false },
    tags: ['cold-brew', 'oat-milk', 'vegan', 'dairy-free'], popularity: 80, is_seasonal: false, is_signature: false
  }
];

// Filter and pour-over coffees
export const filterCoffees: Coffee[] = [
  {
    id: 'coffee-pour-over',
    slug: 'pour-over',
    name: 'Pour Over Coffee',
    description: 'Hand-crafted filter coffee highlighting single-origin bean characteristics.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['filter coffee'],
    quantity_description: '15g coffee, 250ml water',
    ingredient_ids: ['ING_COFFEE_FILTER'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 300,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Serve with origin card'
    },
    preparation: {
      method: 'Bloom 30s, pour in circles, 3-4 min total',
      prep_time_seconds: 240,
      skill_level: 3,
      notes: 'Water at 92-96C'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.80, profit_margin_percent: 86.8 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 120, sugar_g: 0, protein_g: 0.3, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['specialty', 'pour-over', 'single-origin', 'artisan'], popularity: 70, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-french-press',
    slug: 'french-press',
    name: 'French Press Coffee',
    description: 'Full-bodied immersion coffee with rich oils and deep flavor.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['coarse ground coffee'],
    quantity_description: '30g coffee, 500ml water (serves 2)',
    ingredient_ids: ['ING_COFFEE_FILTER'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 250,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Serve with French press at table'
    },
    preparation: {
      method: 'Steep 4 min, press slowly',
      prep_time_seconds: 300,
      skill_level: 2,
      notes: 'Coarse grind essential'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 3.50, profit_margin_percent: 87.1 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 100, sugar_g: 0, protein_g: 0.3, fat_g: 0.1 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['french-press', 'full-bodied', 'classic', 'immersion'], popularity: 68, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-aeropress',
    slug: 'aeropress',
    name: 'AeroPress Coffee',
    description: 'Clean, bright coffee with pressure extraction - smooth and versatile.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['fine ground coffee'],
    quantity_description: '17g coffee, 220ml water',
    ingredient_ids: ['ING_COFFEE_FILTER'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 250,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Serve with recipe card'
    },
    preparation: {
      method: 'Inverted method, 1:30 steep, press 30s',
      prep_time_seconds: 150,
      skill_level: 2,
      notes: 'Fine to medium grind'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 3.50, profit_margin_percent: 87.1 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 110, sugar_g: 0, protein_g: 0.3, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['aeropress', 'clean', 'bright', 'versatile'], popularity: 65, is_seasonal: false, is_signature: false
  },
  {
    id: 'coffee-chemex',
    slug: 'chemex',
    name: 'Chemex Pour Over',
    description: 'Elegant pour over with thick paper filter producing exceptionally clean, bright coffee.',
    category: 'filter_coffee',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['medium-coarse ground coffee'],
    quantity_description: '42g coffee, 700ml water (serves 2-3)',
    ingredient_ids: ['ING_COFFEE_FILTER'],
    serving: {
      glass_type: 'Chemex carafe',
      volume_ml: 300,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Table-side pour service'
    },
    preparation: {
      method: 'Bloom, spiral pour in stages, 4-5 min total',
      prep_time_seconds: 300,
      skill_level: 3,
      notes: 'Use Chemex-specific filters'
    },
    cost: { ingredient_cost_usd: 0.55, selling_price_usd: 4.00, profit_margin_percent: 86.3 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 115, sugar_g: 0, protein_g: 0.3, fat_g: 0 },
    dietary: { is_vegan: true, is_dairy_free: true, is_gluten_free: true, is_sugar_free: true, default_milk: 'none', allergens: [] },
    customization: { available_milks: ['none'], available_syrups: [], can_add_espresso_shot: false, can_adjust_sweetness: false, can_make_decaf: true },
    tags: ['chemex', 'pour-over', 'clean', 'elegant'], popularity: 62, is_seasonal: false, is_signature: false
  }
];

// Export all coffee-based drinks (NO MATCHA)
export default [...additionalCoffeeMix, ...frappuccinoDrinks, ...coldBrewCoffees, ...filterCoffees];
