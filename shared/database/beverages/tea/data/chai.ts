/**
 * Chai Drinks
 *
 * Spiced tea varieties, primarily Indian origin
 * Includes traditional masala chai and modern chai lattes
 */

import type { Tea } from '../types';

export const chaiDrinks: Tea[] = [
  {
    id: 'tea-masala-chai',
    slug: 'masala-chai',
    name: 'Masala Chai (Traditional)',
    description: 'Authentic Indian spiced tea simmered with milk, cardamom, ginger, and warming spices.',
    category: 'chai',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['black tea', 'milk', 'ginger', 'cardamom', 'cinnamon', 'cloves', 'black pepper'],
    quantity_description: '3g tea, 120ml milk, 120ml water, spice blend, sugar',
    ingredient_ids: ['ING_TEA_BLACK', 'ING_MILK_WHOLE', 'ING_GINGER', 'ING_CARDAMOM', 'ING_CINNAMON', 'ING_CLOVES'],
    serving: {
      glass_type: 'Traditional chai glass (kulhar)',
      volume_ml: 250,
      chain_style_decoration: 'Cinnamon stick',
      premium_style_decoration: 'Clay cup + whole spices floating + saucer'
    },
    preparation: {
      method: 'Simmer spices in water; add tea and milk; boil together',
      prep_time_seconds: 300,
      skill_level: 2,
      steep_time_seconds: 300,
      water_temperature_c: 100,
      notes: 'Boil milk with tea for authentic texture'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.50, profit_margin_percent: 85.7 },
    nutrition: { calories_per_serving: 120, caffeine_mg: 50, sugar_g: 15, protein_g: 4, fat_g: 4 },
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
      available_milks: ['whole', 'oat', 'coconut', 'soy'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['indian', 'spiced', 'traditional', 'warming', 'aromatic'],
    origin_country: 'India',
    popularity: 90,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-chai-latte',
    slug: 'chai-latte',
    name: 'Chai Latte',
    description: 'Western-style chai with steamed milk and chai concentrate or syrup.',
    category: 'chai',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'sweet',
    main_ingredients: ['chai concentrate', 'steamed milk'],
    quantity_description: '120ml chai concentrate, 180ml steamed milk',
    ingredient_ids: ['ING_CHAI_CONCENTRATE', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 350,
      chain_style_decoration: 'Cinnamon dust',
      premium_style_decoration: 'Latte art + cinnamon stick'
    },
    preparation: {
      method: 'Heat chai concentrate; steam milk; combine with foam on top',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Can use syrup or concentrate'
    },
    cost: { ingredient_cost_usd: 0.65, selling_price_usd: 4.20, profit_margin_percent: 84.5 },
    nutrition: { calories_per_serving: 180, caffeine_mg: 50, sugar_g: 25, protein_g: 7, fat_g: 6 },
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
      available_syrups: ['vanilla', 'honey', 'extra spice'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['chai', 'latte', 'spiced', 'creamy', 'cozy'],
    origin_country: 'USA',
    popularity: 92,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-iced-chai-latte',
    slug: 'iced-chai-latte',
    name: 'Iced Chai Latte',
    description: 'Refreshing cold chai latte with milk poured over ice and chai concentrate.',
    category: 'chai',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'sweet',
    main_ingredients: ['chai concentrate', 'milk', 'ice'],
    quantity_description: '120ml chai concentrate, 150ml milk, 100g ice',
    ingredient_ids: ['ING_CHAI_CONCENTRATE', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Cinnamon dust',
      premium_style_decoration: 'Layered visible + star anise'
    },
    preparation: {
      method: 'Pour chai over ice; add cold milk; stir or shake',
      prep_time_seconds: 60,
      skill_level: 1,
      notes: 'Shake for creamier texture'
    },
    cost: { ingredient_cost_usd: 0.65, selling_price_usd: 4.50, profit_margin_percent: 85.6 },
    nutrition: { calories_per_serving: 160, caffeine_mg: 50, sugar_g: 22, protein_g: 6, fat_g: 5 },
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
      available_syrups: ['vanilla', 'caramel'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['iced', 'chai', 'refreshing', 'summer', 'spiced'],
    origin_country: 'USA',
    popularity: 88,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'tea-dirty-chai',
    slug: 'dirty-chai-latte',
    name: 'Dirty Chai Latte',
    description: 'Chai latte with a shot of espresso for an extra caffeine kick.',
    category: 'chai',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['chai concentrate', 'espresso', 'steamed milk'],
    quantity_description: '100ml chai, 30ml espresso, 150ml milk',
    ingredient_ids: ['ING_CHAI_CONCENTRATE', 'ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 350,
      chain_style_decoration: 'Cinnamon dust',
      premium_style_decoration: 'Coffee bean garnish + spice rim'
    },
    preparation: {
      method: 'Pull espresso; heat chai; add steamed milk',
      prep_time_seconds: 150,
      skill_level: 2,
      notes: 'The "dirty" refers to adding coffee to tea'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 4.80, profit_margin_percent: 82.3 },
    nutrition: { calories_per_serving: 200, caffeine_mg: 130, sugar_g: 24, protein_g: 7, fat_g: 6 },
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
      available_syrups: ['vanilla', 'caramel'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['dirty-chai', 'espresso', 'high-caffeine', 'fusion', 'popular'],
    origin_country: 'USA',
    popularity: 85,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'tea-vanilla-chai',
    slug: 'vanilla-chai-latte',
    name: 'Vanilla Chai Latte',
    description: 'Classic chai latte enhanced with Madagascar vanilla for extra sweetness.',
    category: 'chai',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'sweet',
    main_ingredients: ['chai concentrate', 'milk', 'vanilla syrup'],
    quantity_description: '120ml chai, 180ml milk, 15ml vanilla',
    ingredient_ids: ['ING_CHAI_CONCENTRATE', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 350,
      chain_style_decoration: 'Vanilla specks',
      premium_style_decoration: 'Vanilla bean piece + cinnamon art'
    },
    preparation: {
      method: 'Heat chai with vanilla; add steamed milk',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Use real vanilla for best flavor'
    },
    cost: { ingredient_cost_usd: 0.75, selling_price_usd: 4.50, profit_margin_percent: 83.3 },
    nutrition: { calories_per_serving: 210, caffeine_mg: 50, sugar_g: 32, protein_g: 7, fat_g: 6 },
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
      available_syrups: ['extra vanilla', 'caramel'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['vanilla', 'chai', 'sweet', 'aromatic', 'creamy'],
    origin_country: 'USA',
    popularity: 82,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-pumpkin-spice-chai',
    slug: 'pumpkin-spice-chai',
    name: 'Pumpkin Spice Chai Latte',
    description: 'Autumn favorite combining chai spices with pumpkin puree and warm spices.',
    category: 'chai',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'sweet',
    main_ingredients: ['chai concentrate', 'pumpkin puree', 'milk', 'pumpkin spice'],
    quantity_description: '100ml chai, 30ml pumpkin puree, 180ml milk, pumpkin spice',
    ingredient_ids: ['ING_CHAI_CONCENTRATE', 'ING_PUMPKIN_PUREE', 'ING_MILK_WHOLE', 'ING_PUMPKIN_SPICE'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 380,
      chain_style_decoration: 'Whipped cream + cinnamon',
      premium_style_decoration: 'Cream + pumpkin pie spice + cinnamon stick'
    },
    preparation: {
      method: 'Blend chai with pumpkin; add steamed milk; top with cream',
      prep_time_seconds: 150,
      skill_level: 2,
      notes: 'Seasonal autumn drink'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 5.20, profit_margin_percent: 82.7 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 50, sugar_g: 38, protein_g: 8, fat_g: 10 },
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
      available_syrups: ['extra pumpkin', 'vanilla'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['pumpkin', 'autumn', 'seasonal', 'spiced', 'cozy'],
    origin_country: 'USA',
    popularity: 88,
    is_seasonal: true,
    is_signature: true
  },
  {
    id: 'tea-chai-tea-pure',
    slug: 'chai-tea-black',
    name: 'Chai Tea (No Milk)',
    description: 'Traditional spiced tea served black, lighter and more aromatic.',
    category: 'chai',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['black tea', 'ginger', 'cardamom', 'cinnamon', 'cloves'],
    quantity_description: '3g tea, 250ml water, spice blend',
    ingredient_ids: ['ING_TEA_BLACK', 'ING_GINGER', 'ING_CARDAMOM', 'ING_CINNAMON', 'ING_CLOVES'],
    serving: {
      glass_type: 'Teacup',
      volume_ml: 250,
      chain_style_decoration: 'Cinnamon stick',
      premium_style_decoration: 'Whole spices visible + honey pot'
    },
    preparation: {
      method: 'Simmer spices in water; add tea; strain',
      prep_time_seconds: 240,
      skill_level: 2,
      steep_time_seconds: 300,
      water_temperature_c: 100,
      notes: 'Dairy-free option'
    },
    cost: { ingredient_cost_usd: 0.35, selling_price_usd: 3.00, profit_margin_percent: 88.3 },
    nutrition: { calories_per_serving: 10, caffeine_mg: 50, sugar_g: 2, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none', 'oat', 'coconut'],
      available_syrups: ['honey', 'agave'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['chai', 'black', 'spiced', 'dairy-free', 'vegan-option'],
    origin_country: 'India',
    popularity: 70,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-turmeric-chai',
    slug: 'turmeric-chai-latte',
    name: 'Turmeric Chai Latte (Golden Chai)',
    description: 'Anti-inflammatory golden latte meets chai spices for a wellness-focused drink.',
    category: 'chai',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['chai concentrate', 'turmeric', 'ginger', 'milk', 'black pepper'],
    quantity_description: '100ml chai, 1tsp turmeric, 180ml milk, pinch black pepper',
    ingredient_ids: ['ING_CHAI_CONCENTRATE', 'ING_TURMERIC', 'ING_GINGER', 'ING_MILK_WHOLE', 'ING_BLACK_PEPPER'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 350,
      chain_style_decoration: 'Turmeric dust',
      premium_style_decoration: 'Golden foam + cinnamon stick + turmeric root slice'
    },
    preparation: {
      method: 'Heat chai with turmeric paste; add steamed milk',
      prep_time_seconds: 150,
      skill_level: 2,
      notes: 'Black pepper aids turmeric absorption'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.80, profit_margin_percent: 83.3 },
    nutrition: { calories_per_serving: 160, caffeine_mg: 50, sugar_g: 18, protein_g: 7, fat_g: 5 },
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
      available_milks: ['whole', 'oat', 'coconut', 'almond'],
      available_syrups: ['honey', 'maple'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['turmeric', 'golden', 'wellness', 'anti-inflammatory', 'chai'],
    origin_country: 'India',
    popularity: 75,
    is_seasonal: false,
    is_signature: true
  }
];

export default chaiDrinks;
