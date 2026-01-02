/**
 * Herbal Infusions / Tisanes
 *
 * Caffeine-free herbal teas and wellness drinks
 * Not true teas (not from Camellia sinensis)
 */

import type { Tea } from '../types';

export const herbalInfusions: Tea[] = [
  // Classic Herbal Teas
  {
    id: 'tea-chamomile',
    slug: 'chamomile',
    name: 'Chamomile',
    description: 'Gentle floral herbal tea known for its calming properties and honey-like sweetness.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'unsweetened',
    main_ingredients: ['dried chamomile flowers'],
    quantity_description: '2g chamomile flowers, 250ml water',
    ingredient_ids: ['ING_CHAMOMILE'],
    serving: {
      glass_type: 'Clear glass mug',
      volume_ml: 250,
      chain_style_decoration: 'Honey pot on side',
      premium_style_decoration: 'Visible floating flowers + raw honey'
    },
    preparation: {
      method: 'Steep flowers in hot water; cover while steeping',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 95,
      notes: 'Cover to keep essential oils'
    },
    cost: { ingredient_cost_usd: 0.30, selling_price_usd: 3.00, profit_margin_percent: 90.0 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 0, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: ['ragweed']
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'lavender'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['calming', 'bedtime', 'floral', 'caffeine-free', 'relaxing'],
    origin_country: 'Egypt',
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-peppermint',
    slug: 'peppermint',
    name: 'Peppermint',
    description: 'Refreshing and cooling mint tea that aids digestion and clears the mind.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'unsweetened',
    main_ingredients: ['dried peppermint leaves'],
    quantity_description: '2g peppermint, 250ml water',
    ingredient_ids: ['ING_PEPPERMINT'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 250,
      chain_style_decoration: 'Fresh mint leaf',
      premium_style_decoration: 'Fresh mint sprig + clear glass'
    },
    preparation: {
      method: 'Steep in hot water',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 100,
      notes: 'Great hot or iced'
    },
    cost: { ingredient_cost_usd: 0.25, selling_price_usd: 2.80, profit_margin_percent: 91.1 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 0, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['mint', 'refreshing', 'digestive', 'caffeine-free', 'cooling'],
    origin_country: 'Mediterranean',
    popularity: 90,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-ginger',
    slug: 'ginger-tea',
    name: 'Ginger Tea',
    description: 'Spicy and warming ginger root tea that soothes the stomach and boosts immunity.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'unsweetened',
    main_ingredients: ['fresh ginger root', 'lemon', 'honey'],
    quantity_description: '20g fresh ginger, 250ml water, lemon wedge',
    ingredient_ids: ['ING_GINGER', 'ING_LEMON', 'ING_HONEY'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Lemon slice',
      premium_style_decoration: 'Fresh ginger slice visible + lemon wheel + honey'
    },
    preparation: {
      method: 'Slice ginger; simmer in water 10-15 min; add lemon',
      prep_time_seconds: 600,
      skill_level: 2,
      steep_time_seconds: 600,
      water_temperature_c: 100,
      notes: 'Fresh ginger is more potent'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 3.20, profit_margin_percent: 87.5 },
    nutrition: { calories_per_serving: 10, caffeine_mg: 0, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'agave'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['ginger', 'warming', 'immunity', 'digestive', 'caffeine-free'],
    origin_country: 'Asia',
    popularity: 85,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-lemon-ginger',
    slug: 'lemon-ginger',
    name: 'Lemon Ginger Tea',
    description: 'Zesty lemon and spicy ginger combination, perfect for cold days and sore throats.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'lightly_sweet',
    main_ingredients: ['fresh ginger', 'lemon juice', 'honey'],
    quantity_description: '15g ginger, 1 lemon, 15ml honey, 300ml water',
    ingredient_ids: ['ING_GINGER', 'ING_LEMON', 'ING_HONEY'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Lemon slice + ginger',
      premium_style_decoration: 'Whole lemon slice + ginger coins + honey drizzle'
    },
    preparation: {
      method: 'Steep ginger; add lemon juice and honey',
      prep_time_seconds: 300,
      skill_level: 1,
      steep_time_seconds: 480,
      water_temperature_c: 100,
      notes: 'Add lemon after steeping to preserve vitamins'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.50, profit_margin_percent: 85.7 },
    nutrition: { calories_per_serving: 40, caffeine_mg: 0, sugar_g: 10, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['extra honey', 'agave'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['lemon', 'ginger', 'cold-remedy', 'immunity', 'vitamin-c'],
    origin_country: 'Global',
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-hibiscus',
    slug: 'hibiscus',
    name: 'Hibiscus Tea',
    description: 'Vibrant ruby-red herbal tea with tart, cranberry-like flavor and high antioxidants.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'unsweetened',
    main_ingredients: ['dried hibiscus flowers'],
    quantity_description: '3g hibiscus flowers, 250ml water',
    ingredient_ids: ['ING_HIBISCUS'],
    serving: {
      glass_type: 'Clear glass',
      volume_ml: 250,
      chain_style_decoration: 'Hibiscus petal',
      premium_style_decoration: 'Deep red color showcase + dried hibiscus garnish'
    },
    preparation: {
      method: 'Steep in hot water; enjoy hot or iced',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 100,
      notes: 'Naturally tart - sweeten to taste'
    },
    cost: { ingredient_cost_usd: 0.35, selling_price_usd: 3.00, profit_margin_percent: 88.3 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 0, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'agave', 'simple syrup'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['hibiscus', 'antioxidant', 'tart', 'ruby', 'caffeine-free'],
    origin_country: 'Africa',
    popularity: 78,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-rooibos',
    slug: 'rooibos',
    name: 'Rooibos (Red Bush Tea)',
    description: 'South African herbal tea with naturally sweet, nutty flavor and no caffeine.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'lightly_sweet',
    main_ingredients: ['rooibos leaves'],
    quantity_description: '3g rooibos, 250ml water',
    ingredient_ids: ['ING_ROOIBOS'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 250,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Reddish amber color + honey pot'
    },
    preparation: {
      method: 'Steep in hot water; can use boiling water',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 360,
      water_temperature_c: 100,
      notes: 'Cannot oversteep - never bitter'
    },
    cost: { ingredient_cost_usd: 0.35, selling_price_usd: 3.00, profit_margin_percent: 88.3 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 0, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none', 'whole', 'oat'],
      available_syrups: ['honey', 'vanilla'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['rooibos', 'south-african', 'caffeine-free', 'nutty', 'antioxidant'],
    origin_country: 'South Africa',
    popularity: 75,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-rooibos-latte',
    slug: 'rooibos-latte',
    name: 'Rooibos Latte (Red Latte)',
    description: 'Creamy latte made with rooibos tea, caffeine-free alternative to coffee.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'lightly_sweet',
    main_ingredients: ['rooibos tea', 'steamed milk', 'honey'],
    quantity_description: '150ml strong rooibos, 150ml steamed milk',
    ingredient_ids: ['ING_ROOIBOS', 'ING_MILK_WHOLE', 'ING_HONEY'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 350,
      chain_style_decoration: 'Honey drizzle',
      premium_style_decoration: 'Foam art + cinnamon dust'
    },
    preparation: {
      method: 'Brew strong rooibos; add steamed milk',
      prep_time_seconds: 120,
      skill_level: 2,
      steep_time_seconds: 420,
      water_temperature_c: 100,
      notes: 'Brew stronger than usual for latte'
    },
    cost: { ingredient_cost_usd: 0.60, selling_price_usd: 4.00, profit_margin_percent: 85.0 },
    nutrition: { calories_per_serving: 120, caffeine_mg: 0, sugar_g: 12, protein_g: 6, fat_g: 5 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: true,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond', 'coconut'],
      available_syrups: ['honey', 'vanilla', 'cinnamon'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['rooibos', 'latte', 'caffeine-free', 'creamy', 'evening'],
    origin_country: 'South Africa',
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-lavender',
    slug: 'lavender-tea',
    name: 'Lavender Tea',
    description: 'Calming floral tea made with dried lavender, perfect for relaxation and sleep.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'unsweetened',
    main_ingredients: ['dried lavender flowers'],
    quantity_description: '2g lavender, 250ml water',
    ingredient_ids: ['ING_LAVENDER'],
    serving: {
      glass_type: 'Clear glass mug',
      volume_ml: 250,
      chain_style_decoration: 'Lavender sprig',
      premium_style_decoration: 'Fresh lavender sprig + purple hue visible'
    },
    preparation: {
      method: 'Steep lavender in hot water; do not over-steep',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 95,
      notes: 'Too long makes it bitter'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 3.20, profit_margin_percent: 87.5 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 0, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'vanilla'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['lavender', 'calming', 'sleep', 'floral', 'relaxing'],
    origin_country: 'France',
    popularity: 72,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-turmeric-golden',
    slug: 'golden-milk',
    name: 'Golden Milk (Turmeric Latte)',
    description: 'Anti-inflammatory Ayurvedic drink with turmeric, ginger, and warming spices.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'lightly_sweet',
    main_ingredients: ['turmeric', 'ginger', 'cinnamon', 'black pepper', 'milk', 'honey'],
    quantity_description: '1tsp turmeric, 1/2tsp ginger, 250ml milk, pinch pepper',
    ingredient_ids: ['ING_TURMERIC', 'ING_GINGER', 'ING_CINNAMON', 'ING_BLACK_PEPPER', 'ING_MILK_WHOLE', 'ING_HONEY'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 300,
      chain_style_decoration: 'Turmeric dust',
      premium_style_decoration: 'Golden foam + cinnamon stick + turmeric slice'
    },
    preparation: {
      method: 'Heat milk with spices; whisk until frothy',
      prep_time_seconds: 300,
      skill_level: 2,
      notes: 'Black pepper aids turmeric absorption'
    },
    cost: { ingredient_cost_usd: 0.70, selling_price_usd: 4.50, profit_margin_percent: 84.4 },
    nutrition: { calories_per_serving: 140, caffeine_mg: 0, sugar_g: 12, protein_g: 7, fat_g: 6 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: true,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'coconut', 'almond'],
      available_syrups: ['honey', 'maple', 'agave'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['turmeric', 'golden', 'ayurvedic', 'anti-inflammatory', 'wellness'],
    origin_country: 'India',
    popularity: 82,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'tea-sleepytime-blend',
    slug: 'sleepytime-blend',
    name: 'Sleepytime Blend',
    description: 'Calming blend of chamomile, lavender, and valerian for restful sleep.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'unsweetened',
    main_ingredients: ['chamomile', 'lavender', 'lemon balm', 'valerian root'],
    quantity_description: '3g herbal blend, 250ml water',
    ingredient_ids: ['ING_CHAMOMILE', 'ING_LAVENDER', 'ING_LEMON_BALM', 'ING_VALERIAN'],
    serving: {
      glass_type: 'Ceramic mug',
      volume_ml: 250,
      chain_style_decoration: 'Chamomile flower',
      premium_style_decoration: 'Lavender + chamomile visible + dim presentation'
    },
    preparation: {
      method: 'Steep blend; cover to retain oils',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 420,
      water_temperature_c: 95,
      notes: 'Best 30-60 min before bed'
    },
    cost: { ingredient_cost_usd: 0.45, selling_price_usd: 3.50, profit_margin_percent: 87.1 },
    nutrition: { calories_per_serving: 2, caffeine_mg: 0, sugar_g: 0, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: ['ragweed']
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['sleep', 'bedtime', 'calming', 'valerian', 'relaxing'],
    origin_country: 'Global',
    popularity: 78,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-immunity-boost',
    slug: 'immunity-boost',
    name: 'Immunity Boost Tea',
    description: 'Vitamin-rich blend with echinacea, elderberry, and citrus to support immune health.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'none',
    sweetness: 'lightly_sweet',
    main_ingredients: ['echinacea', 'elderberry', 'lemon', 'ginger', 'honey'],
    quantity_description: '3g herbal blend, lemon, ginger, 15ml honey, 300ml water',
    ingredient_ids: ['ING_ECHINACEA', 'ING_ELDERBERRY', 'ING_LEMON', 'ING_GINGER', 'ING_HONEY'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Lemon slice',
      premium_style_decoration: 'Elderberry garnish + fresh ginger + lemon wheel'
    },
    preparation: {
      method: 'Steep herbs with ginger; add lemon and honey',
      prep_time_seconds: 300,
      skill_level: 2,
      steep_time_seconds: 480,
      water_temperature_c: 95,
      notes: 'Popular during cold season'
    },
    cost: { ingredient_cost_usd: 0.60, selling_price_usd: 4.00, profit_margin_percent: 85.0 },
    nutrition: { calories_per_serving: 45, caffeine_mg: 0, sugar_g: 12, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'elderberry'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['immunity', 'wellness', 'cold-remedy', 'echinacea', 'elderberry'],
    origin_country: 'Global',
    popularity: 80,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'tea-detox-blend',
    slug: 'detox-blend',
    name: 'Detox Green Blend',
    description: 'Cleansing blend with dandelion, nettle, and green tea for gentle detoxification.',
    category: 'herbal_infusion',
    style: 'hot',
    caffeine_level: 'very_low',
    sweetness: 'unsweetened',
    main_ingredients: ['dandelion root', 'nettle', 'green tea', 'lemon'],
    quantity_description: '3g herbal blend, 250ml water',
    ingredient_ids: ['ING_DANDELION', 'ING_NETTLE', 'ING_TEA_GREEN', 'ING_LEMON'],
    serving: {
      glass_type: 'Clear glass',
      volume_ml: 300,
      chain_style_decoration: 'Lemon slice',
      premium_style_decoration: 'Fresh herbs visible + lemon wheel'
    },
    preparation: {
      method: 'Steep at lower temperature for green tea',
      prep_time_seconds: 60,
      skill_level: 1,
      steep_time_seconds: 300,
      water_temperature_c: 80,
      notes: 'Morning drink for best results'
    },
    cost: { ingredient_cost_usd: 0.50, selling_price_usd: 3.80, profit_margin_percent: 86.8 },
    nutrition: { calories_per_serving: 5, caffeine_mg: 10, sugar_g: 0, protein_g: 0, fat_g: 0 },
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
      available_syrups: ['honey', 'lemon'],
      can_adjust_sweetness: true,
      can_adjust_ice: false
    },
    tags: ['detox', 'cleansing', 'wellness', 'morning', 'green'],
    origin_country: 'Global',
    popularity: 74,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-iced-hibiscus',
    slug: 'iced-hibiscus',
    name: 'Iced Hibiscus Tea',
    description: 'Refreshing ruby-red iced tea, tart and cooling for hot days.',
    category: 'herbal_infusion',
    style: 'iced',
    caffeine_level: 'none',
    sweetness: 'medium',
    main_ingredients: ['hibiscus flowers', 'ice', 'honey'],
    quantity_description: '4g hibiscus, 300ml water, 100g ice',
    ingredient_ids: ['ING_HIBISCUS', 'ING_ICE', 'ING_HONEY'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Lime wedge',
      premium_style_decoration: 'Hibiscus flower + mint sprig + lime wheel'
    },
    preparation: {
      method: 'Steep strong; chill or pour over ice',
      prep_time_seconds: 120,
      skill_level: 1,
      steep_time_seconds: 420,
      water_temperature_c: 100,
      notes: 'Sweeten while hot for better dissolution'
    },
    cost: { ingredient_cost_usd: 0.40, selling_price_usd: 3.50, profit_margin_percent: 88.6 },
    nutrition: { calories_per_serving: 40, caffeine_mg: 0, sugar_g: 10, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'agave', 'simple syrup', 'mint'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['iced', 'hibiscus', 'summer', 'refreshing', 'caffeine-free'],
    origin_country: 'Mexico',
    popularity: 82,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'tea-mint-lemonade',
    slug: 'mint-lemonade-tea',
    name: 'Mint Lemonade Tea',
    description: 'Sparkling blend of mint tea and fresh lemonade, ultra-refreshing.',
    category: 'herbal_infusion',
    style: 'iced',
    caffeine_level: 'none',
    sweetness: 'medium',
    main_ingredients: ['peppermint', 'lemon juice', 'sparkling water', 'ice'],
    quantity_description: '150ml mint tea, 50ml lemon juice, 100ml sparkling, 100g ice',
    ingredient_ids: ['ING_PEPPERMINT', 'ING_LEMON', 'ING_SPARKLING_WATER', 'ING_ICE'],
    serving: {
      glass_type: 'Collins glass',
      volume_ml: 400,
      chain_style_decoration: 'Mint sprig + lemon wheel',
      premium_style_decoration: 'Fresh mint bouquet + lemon spiral + sugar rim'
    },
    preparation: {
      method: 'Brew mint tea; chill; add lemon and sparkling water',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Add sparkling water just before serving'
    },
    cost: { ingredient_cost_usd: 0.55, selling_price_usd: 4.00, profit_margin_percent: 86.3 },
    nutrition: { calories_per_serving: 50, caffeine_mg: 0, sugar_g: 12, protein_g: 0, fat_g: 0 },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['honey', 'simple syrup', 'lavender'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['mint', 'lemonade', 'sparkling', 'summer', 'refreshing'],
    origin_country: 'Global',
    popularity: 85,
    is_seasonal: true,
    is_signature: false
  }
];

export default herbalInfusions;
