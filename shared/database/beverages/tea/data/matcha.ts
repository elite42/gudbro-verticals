/**
 * Matcha Drinks
 *
 * Japanese powdered green tea beverages
 * Moved from Coffee database - these are tea-based, not coffee-based
 */

import type { Tea } from '../types';

export const matchaDrinks: Tea[] = [
  {
    id: 'tea-matcha-latte-hot',
    slug: 'matcha-latte-hot',
    name: 'Matcha Latte (Hot)',
    description: 'Traditional Japanese green tea latte made with ceremonial grade matcha and steamed milk.',
    category: 'matcha',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['matcha powder', 'milk', 'water'],
    quantity_description: '2g matcha, 60ml hot water, 180ml milk',
    ingredient_ids: ['ING_MATCHA', 'ING_WATER', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 300,
      chain_style_decoration: 'Matcha powder dust',
      premium_style_decoration: 'Foam art + bamboo whisk prop'
    },
    preparation: {
      method: 'Whisk matcha with hot water until frothy; steam milk; combine',
      prep_time_seconds: 80,
      skill_level: 2,
      steep_time_seconds: 0,
      water_temperature_c: 80,
      notes: 'Use ceremonial grade for best flavor'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.00, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 140, caffeine_mg: 70, sugar_g: 12, protein_g: 8, fat_g: 6 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond', 'coconut', 'soy'],
      available_syrups: ['vanilla', 'honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['japanese', 'matcha', 'green-tea', 'healthy', 'antioxidant'],
    origin_country: 'Japan',
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-latte-iced',
    slug: 'matcha-latte-iced',
    name: 'Iced Matcha Latte',
    description: 'Refreshing cold matcha drink shaken with milk and served over ice.',
    category: 'matcha',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['matcha powder', 'milk', 'water', 'ice'],
    quantity_description: '2g matcha, 60ml water, 150ml milk, 100g ice',
    ingredient_ids: ['ING_MATCHA', 'ING_WATER', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Layered green gradient + bamboo straw'
    },
    preparation: {
      method: 'Whisk matcha; shake vigorously with milk and ice; pour over fresh ice',
      prep_time_seconds: 75,
      skill_level: 1,
      notes: 'Shake well to prevent clumping'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.00, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 120, caffeine_mg: 70, sugar_g: 10, protein_g: 7, fat_g: 5 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond', 'coconut', 'soy'],
      available_syrups: ['vanilla', 'honey', 'lavender'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['matcha', 'iced', 'refreshing', 'summer', 'instagram'],
    origin_country: 'Japan',
    popularity: 90,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-coconut',
    slug: 'matcha-coconut-latte',
    name: 'Matcha Coconut Latte',
    description: 'Vegan-friendly matcha latte made with creamy coconut milk for tropical undertones.',
    category: 'matcha',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['matcha powder', 'coconut milk', 'water'],
    quantity_description: '2g matcha, 150ml coconut milk, 60ml hot water',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_COCONUT', 'ING_WATER'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 300,
      chain_style_decoration: 'Matcha dust',
      premium_style_decoration: 'Toasted coconut flakes + matcha swirl'
    },
    preparation: {
      method: 'Whisk matcha with water; warm coconut milk; combine gently',
      prep_time_seconds: 85,
      skill_level: 2,
      water_temperature_c: 80,
      notes: 'Coconut milk froths differently than dairy'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.80, profit_margin_percent: 80.2 },
    nutrition: { calories_per_serving: 160, caffeine_mg: 70, sugar_g: 8, protein_g: 2, fat_g: 12 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'coconut',
      allergens: []
    },
    customization: {
      available_milks: ['coconut', 'oat', 'almond', 'soy'],
      available_syrups: ['vanilla', 'agave'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['vegan', 'dairy-free', 'matcha', 'coconut', 'tropical'],
    origin_country: 'Japan',
    popularity: 78,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-oat-milk',
    slug: 'matcha-oat-milk-latte',
    name: 'Matcha Oat Milk Latte',
    description: 'Creamy matcha latte with oat milk, naturally sweet and vegan-friendly.',
    category: 'matcha',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['matcha powder', 'oat milk', 'water'],
    quantity_description: '2g matcha, 180ml oat milk, 40ml hot water',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_OAT', 'ING_WATER'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 300,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Oat foam art'
    },
    preparation: {
      method: 'Whisk matcha; steam oat milk to microfoam; pour with latte art',
      prep_time_seconds: 80,
      skill_level: 2,
      water_temperature_c: 80,
      notes: 'Oat milk creates excellent microfoam'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 130, caffeine_mg: 70, sugar_g: 10, protein_g: 3, fat_g: 5 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: false,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'oat',
      allergens: ['gluten']
    },
    customization: {
      available_milks: ['oat', 'almond', 'soy', 'coconut'],
      available_syrups: ['vanilla', 'honey', 'maple'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['vegan', 'oat-milk', 'matcha', 'creamy'],
    origin_country: 'Japan',
    popularity: 82,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-vanilla',
    slug: 'vanilla-matcha-latte',
    name: 'Vanilla Matcha Latte',
    description: 'Classic matcha latte enhanced with Madagascar vanilla for a sweet, aromatic experience.',
    category: 'matcha',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['matcha powder', 'milk', 'vanilla syrup', 'water'],
    quantity_description: '2g matcha, 180ml milk, 15ml vanilla syrup, 40ml water',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP', 'ING_WATER'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Vanilla bean specks',
      premium_style_decoration: 'Vanilla bean pod garnish'
    },
    preparation: {
      method: 'Whisk matcha; steam milk with vanilla; combine',
      prep_time_seconds: 85,
      skill_level: 2,
      water_temperature_c: 80,
      notes: 'Use real vanilla syrup for best results'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 4.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 70, sugar_g: 22, protein_g: 8, fat_g: 6 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond', 'coconut', 'soy'],
      available_syrups: ['extra vanilla', 'honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['matcha', 'vanilla', 'sweet', 'aromatic'],
    origin_country: 'Japan',
    popularity: 80,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-blended',
    slug: 'matcha-frappuccino',
    name: 'Matcha Frappuccino',
    description: 'Blended frozen matcha drink with milk and ice, topped with whipped cream.',
    category: 'matcha',
    style: 'blended',
    caffeine_level: 'medium',
    sweetness: 'sweet',
    main_ingredients: ['matcha powder', 'milk', 'ice', 'whipped cream'],
    quantity_description: '3g matcha, 150ml milk, 150g ice, 20g cream',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 450,
      chain_style_decoration: 'Whipped cream + matcha dust',
      premium_style_decoration: 'Matcha drizzle + white chocolate curls'
    },
    preparation: {
      method: 'Blend matcha, milk, ice until smooth; top with whipped cream',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Blend until completely smooth'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.80, profit_margin_percent: 80.2 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 100, sugar_g: 35, protein_g: 8, fat_g: 12 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond'],
      available_syrups: ['vanilla', 'white chocolate'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['matcha', 'blended', 'frozen', 'frappuccino', 'indulgent'],
    origin_country: 'Japan',
    popularity: 85,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-honey',
    slug: 'honey-matcha-latte',
    name: 'Honey Matcha Latte',
    description: 'Matcha latte naturally sweetened with raw honey for a healthier option.',
    category: 'matcha',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['matcha powder', 'milk', 'honey', 'water'],
    quantity_description: '2g matcha, 180ml milk, 15ml honey, 40ml water',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_HONEY', 'ING_WATER'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 300,
      chain_style_decoration: 'Honey drizzle',
      premium_style_decoration: 'Honeycomb piece + bee pollen'
    },
    preparation: {
      method: 'Whisk matcha with water; steam milk with honey; combine',
      prep_time_seconds: 85,
      skill_level: 2,
      water_temperature_c: 80,
      notes: 'Add honey while milk is warm to dissolve'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 4.60, profit_margin_percent: 79.3 },
    nutrition: { calories_per_serving: 170, caffeine_mg: 70, sugar_g: 20, protein_g: 8, fat_g: 6 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond', 'coconut'],
      available_syrups: ['extra honey', 'vanilla'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['matcha', 'honey', 'natural', 'healthy'],
    origin_country: 'Japan',
    popularity: 76,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-white-chocolate',
    slug: 'white-chocolate-matcha',
    name: 'White Chocolate Matcha',
    description: 'Indulgent matcha latte with white chocolate for a creamy, sweet treat.',
    category: 'matcha',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'sweet',
    main_ingredients: ['matcha powder', 'milk', 'white chocolate syrup', 'water'],
    quantity_description: '2g matcha, 180ml milk, 20ml white chocolate syrup, 40ml water',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_WATER'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'White chocolate drizzle',
      premium_style_decoration: 'White chocolate shavings + matcha dust art'
    },
    preparation: {
      method: 'Whisk matcha; steam milk with white chocolate; pour with swirl',
      prep_time_seconds: 90,
      skill_level: 2,
      water_temperature_c: 80,
      notes: 'Balance sweetness carefully'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 5.00, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 70, sugar_g: 38, protein_g: 9, fat_g: 12 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat'],
      available_syrups: ['extra white chocolate', 'vanilla'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['matcha', 'white-chocolate', 'indulgent', 'sweet', 'dessert'],
    origin_country: 'Japan',
    popularity: 74,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'tea-matcha-strawberry',
    slug: 'strawberry-matcha-latte',
    name: 'Strawberry Matcha Latte',
    description: 'Pink and green layered drink combining matcha with strawberry puree.',
    category: 'matcha',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'sweet',
    main_ingredients: ['matcha powder', 'milk', 'strawberry puree', 'ice'],
    quantity_description: '2g matcha, 150ml milk, 30ml strawberry puree, 100g ice',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_STRAWBERRY_PUREE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Strawberry slice',
      premium_style_decoration: 'Clear layered pink-green gradient + fresh strawberry'
    },
    preparation: {
      method: 'Layer strawberry at bottom; add ice and milk; float matcha on top',
      prep_time_seconds: 95,
      skill_level: 3,
      notes: 'Pour slowly for clean layers'
    },
    cost: { ingredient_cost_usd: 1.10, selling_price_usd: 5.50, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 200, caffeine_mg: 70, sugar_g: 28, protein_g: 7, fat_g: 5 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond'],
      available_syrups: ['vanilla'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['matcha', 'strawberry', 'instagram', 'layered', 'trendy'],
    origin_country: 'Japan',
    popularity: 86,
    is_seasonal: true,
    is_signature: true
  },
  {
    id: 'tea-matcha-lavender',
    slug: 'lavender-matcha-latte',
    name: 'Lavender Matcha Latte',
    description: 'Calming matcha latte infused with dried lavender for a floral, relaxing experience.',
    category: 'matcha',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['matcha powder', 'milk', 'lavender syrup', 'water'],
    quantity_description: '2g matcha, 180ml milk, 10ml lavender syrup, 40ml water',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_LAVENDER_SYRUP', 'ING_WATER'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 300,
      chain_style_decoration: 'Dried lavender sprinkle',
      premium_style_decoration: 'Fresh lavender sprig + purple foam art'
    },
    preparation: {
      method: 'Whisk matcha; steam milk with lavender syrup; combine gently',
      prep_time_seconds: 90,
      skill_level: 2,
      water_temperature_c: 80,
      notes: 'Lavender should be subtle, not overpowering'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 5.00, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 150, caffeine_mg: 70, sugar_g: 14, protein_g: 8, fat_g: 6 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond', 'coconut'],
      available_syrups: ['extra lavender', 'vanilla', 'honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['matcha', 'lavender', 'floral', 'calming', 'wellness'],
    origin_country: 'Japan',
    popularity: 72,
    is_seasonal: false,
    is_signature: true
  }
];

export default matchaDrinks;
