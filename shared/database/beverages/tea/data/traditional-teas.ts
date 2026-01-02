/**
 * Traditional Teas
 *
 * Classic teas from around the world:
 * - British (Earl Grey, English Breakfast)
 * - Japanese (Sencha, Genmaicha, Hojicha)
 * - Chinese (Oolong, Pu-erh, Dragon Well)
 * - Indian (Darjeeling, Assam)
 */

import type { Tea } from '../types';

export const traditionalTeas: Tea[] = [
  // British Teas
  {
    id: 'tea-earl-grey',
    slug: 'earl-grey',
    name: 'Earl Grey',
    description: 'Classic British black tea flavored with bergamot orange oil, citrusy and aromatic.',
    category: 'black_tea',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['black tea', 'bergamot oil'],
    quantity_description: '3g loose leaf, 250ml water',
    ingredient_ids: ['ING_TEA_EARL_GREY'],
    serving: {
      glass_type: 'Teacup with saucer',
      volume_ml: 250,
      chain_style_decoration: 'Lemon slice optional',
      premium_style_decoration: 'Fine china + lemon wheel + honey pot'
    },
    preparation: {
      method: 'Steep loose leaf tea in hot water',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 240,
      water_temperature_c: 95,
      notes: 'Do not over-steep to avoid bitterness'
    },
    cost: { ingredient_cost_usd: 0.30, selling_price_usd: 3.00, profit_margin_percent: 90.0 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 50, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none', 'whole', 'oat'],
      available_syrups: ['honey', 'lavender'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['british', 'classic', 'bergamot', 'citrus', 'afternoon-tea'],
    origin_country: 'United Kingdom',
    popularity: 90,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-earl-grey-latte',
    slug: 'earl-grey-latte',
    name: 'Earl Grey Latte (London Fog)',
    description: 'Steamed milk meets Earl Grey with vanilla, creating the famous London Fog.',
    category: 'black_tea',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['earl grey tea', 'milk', 'vanilla syrup'],
    quantity_description: '150ml earl grey, 150ml steamed milk, 15ml vanilla',
    ingredient_ids: ['ING_TEA_EARL_GREY', 'ING_MILK_WHOLE', 'ING_VANILLA_SYRUP'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 350,
      chain_style_decoration: 'Vanilla foam',
      premium_style_decoration: 'Lavender sprig + foam art'
    },
    preparation: {
      method: 'Steep tea; add vanilla; top with steamed milk',
      prep_time_seconds: 120,
      skill_level: 2,
      steep_time_seconds: 300,
      water_temperature_c: 95,
      notes: 'Also called London Fog'
    },
    cost: { ingredient_cost_usd: 0.65, selling_price_usd: 4.20, profit_margin_percent: 84.5 },
    nutrition: { calories_per_serving: 160, caffeine_mg: 50, sugar_g: 18, protein_g: 6, fat_g: 5 },
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
      available_syrups: ['vanilla', 'lavender', 'honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['london-fog', 'latte', 'vanilla', 'creamy', 'cozy'],
    origin_country: 'Canada',
    popularity: 85,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-english-breakfast',
    slug: 'english-breakfast',
    name: 'English Breakfast',
    description: 'Full-bodied British black tea blend, robust and perfect with milk.',
    category: 'black_tea',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['black tea blend'],
    quantity_description: '3g loose leaf, 250ml water',
    ingredient_ids: ['ING_TEA_ENGLISH_BREAKFAST'],
    serving: {
      glass_type: 'Teacup with saucer',
      volume_ml: 250,
      chain_style_decoration: 'Milk jug on side',
      premium_style_decoration: 'Fine china service + petit fours'
    },
    preparation: {
      method: 'Steep in freshly boiled water; serve with milk',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 100,
      notes: 'Traditional with splash of milk'
    },
    cost: { ingredient_cost_usd: 0.25, selling_price_usd: 2.80, profit_margin_percent: 91.1 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 60, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none', 'whole', 'oat'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['british', 'classic', 'morning', 'robust', 'breakfast'],
    origin_country: 'United Kingdom',
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  // Japanese Teas
  {
    id: 'tea-sencha',
    slug: 'sencha',
    name: 'Sencha',
    description: 'Japan\'s most popular green tea, bright and refreshing with grassy notes.',
    category: 'green_tea',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['sencha green tea'],
    quantity_description: '4g loose leaf, 200ml water',
    ingredient_ids: ['ING_TEA_SENCHA'],
    serving: {
      glass_type: 'Japanese tea cup (yunomi)',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Traditional Japanese tea set + wagashi sweet'
    },
    preparation: {
      method: 'Steep at lower temperature to preserve delicate flavors',
      prep_time_seconds: 60,
      skill_level: 2,
      steep_time_seconds: 90,
      water_temperature_c: 75,
      notes: 'Can re-steep 2-3 times'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.50, profit_margin_percent: 85.7 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 30, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_adjust_sweetness: false,
      can_adjust_ice: false
    },
    tags: ['japanese', 'green-tea', 'grassy', 'refreshing', 'traditional'],
    origin_country: 'Japan',
    popularity: 80,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-genmaicha',
    slug: 'genmaicha',
    name: 'Genmaicha',
    description: 'Japanese green tea blended with roasted brown rice, nutty and toasty.',
    category: 'green_tea',
    style: 'hot',
    caffeine_level: 'low',
    sweetness: 'unsweetened',
    main_ingredients: ['green tea', 'roasted brown rice'],
    quantity_description: '4g loose leaf, 200ml water',
    ingredient_ids: ['ING_TEA_GENMAICHA'],
    serving: {
      glass_type: 'Japanese tea cup',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Visible rice puffs + ceramic cup'
    },
    preparation: {
      method: 'Steep in moderately hot water',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 180,
      water_temperature_c: 80,
      notes: 'Also called popcorn tea'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 3.50, profit_margin_percent: 87.1 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 20, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: false,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: ['gluten']
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_adjust_sweetness: false,
      can_adjust_ice: false
    },
    tags: ['japanese', 'green-tea', 'roasted-rice', 'nutty', 'comfort'],
    origin_country: 'Japan',
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-hojicha-hot',
    slug: 'hojicha',
    name: 'Hojicha',
    description: 'Japanese roasted green tea with a warm, toasty flavor and lower caffeine.',
    category: 'green_tea',
    style: 'hot',
    caffeine_level: 'low',
    sweetness: 'unsweetened',
    main_ingredients: ['roasted green tea'],
    quantity_description: '4g loose leaf, 200ml water',
    ingredient_ids: ['ING_TEA_HOJICHA'],
    serving: {
      glass_type: 'Japanese tea cup',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Toasted rice garnish'
    },
    preparation: {
      method: 'Steep in hot water; naturally sweet',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 120,
      water_temperature_c: 90,
      notes: 'Can be enjoyed any time of day'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.50, profit_margin_percent: 85.7 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 15, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none', 'oat'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['japanese', 'roasted', 'toasty', 'low-caffeine', 'evening'],
    origin_country: 'Japan',
    popularity: 75,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-hojicha-latte',
    slug: 'hojicha-latte',
    name: 'Hojicha Latte',
    description: 'Creamy latte made with roasted Japanese hojicha, warm and comforting.',
    category: 'green_tea',
    style: 'hot',
    caffeine_level: 'low',
    sweetness: 'lightly_sweet',
    main_ingredients: ['hojicha powder', 'milk'],
    quantity_description: '3g hojicha powder, 200ml milk',
    ingredient_ids: ['ING_HOJICHA_POWDER', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 300,
      chain_style_decoration: 'Hojicha dust',
      premium_style_decoration: 'Foam art + hojicha powder stencil'
    },
    preparation: {
      method: 'Whisk hojicha powder; steam milk; combine',
      prep_time_seconds: 80,
      skill_level: 2,
      notes: 'Low caffeine - good for evening'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.50, profit_margin_percent: 82.2 },
    nutrition: { calories_per_serving: 140, caffeine_mg: 20, sugar_g: 12, protein_g: 7, fat_g: 6 },
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
      available_syrups: ['honey', 'brown sugar', 'vanilla'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['hojicha', 'latte', 'roasted', 'creamy', 'cozy'],
    origin_country: 'Japan',
    popularity: 78,
    is_seasonal: false,
    is_signature: false
  },
  // Chinese Teas
  {
    id: 'tea-oolong-tieguanyin',
    slug: 'tieguanyin-oolong',
    name: 'Tieguanyin (Iron Goddess)',
    description: 'Premium Chinese oolong with complex floral and creamy notes.',
    category: 'oolong_tea',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['tieguanyin oolong tea'],
    quantity_description: '5g loose leaf, 150ml water',
    ingredient_ids: ['ING_TEA_TIEGUANYIN'],
    serving: {
      glass_type: 'Gaiwan or small teapot',
      volume_ml: 150,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Gongfu tea set + multiple infusions'
    },
    preparation: {
      method: 'Gongfu style - multiple short infusions',
      prep_time_seconds: 60,
      skill_level: 3,
      steep_time_seconds: 30,
      water_temperature_c: 95,
      notes: 'Can be re-steeped 5-7 times'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.50, profit_margin_percent: 82.2 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 35, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_adjust_sweetness: false,
      can_adjust_ice: false
    },
    tags: ['chinese', 'oolong', 'premium', 'floral', 'traditional'],
    origin_country: 'China',
    popularity: 75,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-dragon-well',
    slug: 'dragon-well-longjing',
    name: 'Dragon Well (Longjing)',
    description: 'China\'s most famous green tea, flat leaves with chestnut sweetness.',
    category: 'green_tea',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['longjing green tea'],
    quantity_description: '3g loose leaf, 200ml water',
    ingredient_ids: ['ING_TEA_LONGJING'],
    serving: {
      glass_type: 'Glass cup',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Clear glass to show dancing leaves'
    },
    preparation: {
      method: 'Use cooler water; watch leaves unfurl',
      prep_time_seconds: 60,
      skill_level: 2,
      steep_time_seconds: 120,
      water_temperature_c: 80,
      notes: 'Pan-fired, not steamed like Japanese'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 5.00, profit_margin_percent: 80.0 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 30, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_adjust_sweetness: false,
      can_adjust_ice: false
    },
    tags: ['chinese', 'green-tea', 'premium', 'chestnut', 'hangzhou'],
    origin_country: 'China',
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-jasmine-green',
    slug: 'jasmine-green-tea',
    name: 'Jasmine Green Tea',
    description: 'Delicate green tea scented with jasmine flowers, fragrant and soothing.',
    category: 'green_tea',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['green tea', 'jasmine flowers'],
    quantity_description: '3g loose leaf, 200ml water',
    ingredient_ids: ['ING_TEA_JASMINE'],
    serving: {
      glass_type: 'Clear glass or ceramic cup',
      volume_ml: 250,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Jasmine flower floating'
    },
    preparation: {
      method: 'Steep in moderate temperature water',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 180,
      water_temperature_c: 80,
      notes: 'Do not use boiling water'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 3.20, profit_margin_percent: 87.5 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 25, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['chinese', 'jasmine', 'floral', 'fragrant', 'soothing'],
    origin_country: 'China',
    popularity: 85,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-pu-erh',
    slug: 'pu-erh',
    name: 'Pu-erh Tea',
    description: 'Aged fermented Chinese tea with earthy, complex flavors that improve with age.',
    category: 'pu_erh',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['aged pu-erh tea'],
    quantity_description: '5g loose leaf, 150ml water',
    ingredient_ids: ['ING_TEA_PUERH'],
    serving: {
      glass_type: 'Yixing clay teapot',
      volume_ml: 150,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Traditional Gongfu set + tea cake display'
    },
    preparation: {
      method: 'Rinse tea first; multiple short infusions',
      prep_time_seconds: 90,
      skill_level: 3,
      steep_time_seconds: 20,
      water_temperature_c: 95,
      notes: 'First rinse discarded; improves with age'
    },
    cost: { ingredient_cost_usd: 1.20, selling_price_usd: 5.50, profit_margin_percent: 78.2 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 40, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_adjust_sweetness: false,
      can_adjust_ice: false
    },
    tags: ['chinese', 'pu-erh', 'aged', 'fermented', 'earthy', 'digestive'],
    origin_country: 'China',
    popularity: 68,
    is_seasonal: false,
    is_signature: false
  },
  // Indian Teas
  {
    id: 'tea-darjeeling',
    slug: 'darjeeling',
    name: 'Darjeeling',
    description: 'The "Champagne of teas" from the Himalayan foothills, delicate and muscatel.',
    category: 'black_tea',
    style: 'hot',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['darjeeling black tea'],
    quantity_description: '3g loose leaf, 250ml water',
    ingredient_ids: ['ING_TEA_DARJEELING'],
    serving: {
      glass_type: 'Fine china cup',
      volume_ml: 250,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Crystal clear amber in fine porcelain'
    },
    preparation: {
      method: 'Steep at slightly lower temperature than other black teas',
      prep_time_seconds: 60,
      skill_level: 2,
      steep_time_seconds: 240,
      water_temperature_c: 90,
      notes: 'Best without milk to appreciate delicate flavor'
    },
    cost: { ingredient_cost_usd: 0.70, selling_price_usd: 4.00, profit_margin_percent: 82.5 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 45, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none', 'whole'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['indian', 'darjeeling', 'premium', 'muscatel', 'himalayan'],
    origin_country: 'India',
    popularity: 78,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-assam',
    slug: 'assam',
    name: 'Assam',
    description: 'Bold, malty Indian black tea - the backbone of many breakfast blends.',
    category: 'black_tea',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['assam black tea'],
    quantity_description: '3g loose leaf, 250ml water',
    ingredient_ids: ['ING_TEA_ASSAM'],
    serving: {
      glass_type: 'Sturdy teacup',
      volume_ml: 250,
      chain_style_decoration: 'Milk jug on side',
      premium_style_decoration: 'Indian brass service set'
    },
    preparation: {
      method: 'Steep in boiling water; pairs well with milk',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 100,
      notes: 'Strong enough for milk'
    },
    cost: { ingredient_cost_usd: 0.35, selling_price_usd: 3.00, profit_margin_percent: 88.3 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 55, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none', 'whole', 'oat'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['indian', 'assam', 'bold', 'malty', 'breakfast'],
    origin_country: 'India',
    popularity: 82,
    is_seasonal: false,
    is_signature: false
  },
  // White Tea
  {
    id: 'tea-silver-needle',
    slug: 'silver-needle',
    name: 'Silver Needle (Bai Hao)',
    description: 'Finest Chinese white tea made only from unopened buds, delicate and sweet.',
    category: 'white_tea',
    style: 'hot',
    caffeine_level: 'low',
    sweetness: 'unsweetened',
    main_ingredients: ['silver needle white tea'],
    quantity_description: '3g loose leaf, 200ml water',
    ingredient_ids: ['ING_TEA_SILVER_NEEDLE'],
    serving: {
      glass_type: 'Clear glass',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Visible silver buds dancing in water'
    },
    preparation: {
      method: 'Use cooler water; longer steep; watch buds float',
      prep_time_seconds: 60,
      skill_level: 2,
      steep_time_seconds: 300,
      water_temperature_c: 80,
      notes: 'Multiple infusions possible'
    },
    cost: { ingredient_cost_usd: 1.50, selling_price_usd: 6.00, profit_margin_percent: 75.0 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 15, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_adjust_sweetness: false,
      can_adjust_ice: false
    },
    tags: ['chinese', 'white-tea', 'premium', 'delicate', 'antioxidant'],
    origin_country: 'China',
    popularity: 70,
    is_seasonal: false,
    is_signature: false
  },
  // Iced Traditional Teas
  {
    id: 'tea-iced-green',
    slug: 'iced-green-tea',
    name: 'Iced Green Tea',
    description: 'Cold-brewed or flash-chilled green tea, light and refreshing.',
    category: 'green_tea',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'unsweetened',
    main_ingredients: ['green tea', 'ice'],
    quantity_description: '5g loose leaf, 300ml water, 100g ice',
    ingredient_ids: ['ING_TEA_GREEN', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Lemon slice',
      premium_style_decoration: 'Mint sprig + cucumber slice'
    },
    preparation: {
      method: 'Cold brew 4-6 hours or flash-brew and chill',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 14400,
      water_temperature_c: 5,
      notes: 'Cold brew is smoother with less bitterness'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 3.50, profit_margin_percent: 88.6 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 30, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'lemon', 'mint'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['iced', 'green-tea', 'refreshing', 'summer', 'healthy'],
    origin_country: 'Japan',
    popularity: 82,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'tea-iced-black',
    slug: 'iced-black-tea',
    name: 'Iced Black Tea',
    description: 'Classic iced tea, refreshing and perfect with lemon or peach.',
    category: 'black_tea',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['black tea', 'ice', 'lemon'],
    quantity_description: '5g loose leaf, 300ml water, 100g ice',
    ingredient_ids: ['ING_TEA_BLACK', 'ING_ICE', 'ING_LEMON'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Lemon wedge',
      premium_style_decoration: 'Lemon wheel + mint + sugar rim'
    },
    preparation: {
      method: 'Brew strong; pour over ice; garnish',
      prep_time_seconds: 90,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 95,
      notes: 'Southern sweet tea tradition uses more sugar'
    },
    cost: { ingredient_cost_usd: 0.35, selling_price_usd: 3.20, profit_margin_percent: 89.1 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 50, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['simple syrup', 'peach', 'raspberry', 'lemon'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['iced', 'black-tea', 'classic', 'summer', 'refreshing'],
    origin_country: 'USA',
    popularity: 88,
    is_seasonal: true,
    is_signature: false
  }
];

export default traditionalTeas;
