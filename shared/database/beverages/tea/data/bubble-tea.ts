/**
 * Bubble Tea / Boba Drinks
 *
 * Taiwanese origin milk teas with tapioca pearls and toppings
 * Popular worldwide, especially in Asia and with Gen Z
 */

import type { Tea } from '../types';

export const bubbleTeaDrinks: Tea[] = [
  // Classic Milk Teas
  {
    id: 'tea-classic-milk-tea',
    slug: 'classic-milk-tea',
    name: 'Classic Milk Tea',
    description: 'Traditional Taiwanese milk tea with chewy tapioca pearls - the original boba drink.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['black tea', 'milk', 'tapioca pearls', 'sugar', 'ice'],
    quantity_description: '200ml black tea, 80ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_TEA_BLACK', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_SUGAR', 'ING_ICE'],
    bubble_tea_base: 'black_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Sealed top + fat straw',
      premium_style_decoration: 'Reusable glass jar + metal straw'
    },
    preparation: {
      method: 'Brew tea; cool; shake with milk and ice; add boba',
      prep_time_seconds: 120,
      skill_level: 2,
      steep_time_seconds: 300,
      water_temperature_c: 95,
      notes: 'Cook boba fresh daily'
    },
    cost: { ingredient_cost_usd: 0.80, selling_price_usd: 4.50, profit_margin_percent: 82.2 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 50, sugar_g: 35, protein_g: 4, fat_g: 5 },
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
      available_milks: ['whole', 'oat', 'almond', 'coconut', 'soy', 'none'],
      available_syrups: ['vanilla', 'caramel', 'honey'],
      available_toppings: ['tapioca_pearls', 'pudding', 'coconut_jelly', 'aloe_vera'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['classic', 'taiwanese', 'boba', 'milk-tea', 'original'],
    origin_country: 'Taiwan',
    popularity: 95,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-brown-sugar-tiger',
    slug: 'brown-sugar-tiger-milk-tea',
    name: 'Brown Sugar Tiger Milk Tea',
    description: 'Iconic striped milk tea with caramelized brown sugar boba creating tiger stripes on the glass.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'none',
    sweetness: 'very_sweet',
    main_ingredients: ['brown sugar syrup', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '50ml brown sugar syrup, 200ml milk, 60g boba, 100g ice',
    ingredient_ids: ['ING_BROWN_SUGAR_SYRUP', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'none',
    default_toppings: ['brown_sugar_pearls'],
    serving: {
      glass_type: 'Clear cup',
      volume_ml: 500,
      chain_style_decoration: 'Tiger stripes visible',
      premium_style_decoration: 'Artistic caramel drips + branded cup'
    },
    preparation: {
      method: 'Swirl brown sugar syrup in cup; add ice and milk; top with boba',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Swirl syrup for tiger stripe effect'
    },
    cost: { ingredient_cost_usd: 0.75, selling_price_usd: 5.00, profit_margin_percent: 85.0 },
    nutrition: { calories_per_serving: 380, caffeine_mg: 0, sugar_g: 55, protein_g: 6, fat_g: 8 },
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
      available_milks: ['whole', 'oat', 'almond', 'coconut', 'soy'],
      available_syrups: ['extra brown sugar'],
      available_toppings: ['brown_sugar_pearls', 'pudding', 'cheese_foam'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['brown-sugar', 'tiger', 'instagram', 'trending', 'caffeine-free'],
    origin_country: 'Taiwan',
    popularity: 98,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'tea-taro-milk-tea',
    slug: 'taro-milk-tea',
    name: 'Taro Milk Tea',
    description: 'Creamy purple milk tea made with sweet taro root, naturally sweet with vanilla notes.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'low',
    sweetness: 'sweet',
    main_ingredients: ['taro powder', 'jasmine tea', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '30g taro powder, 100ml jasmine tea, 150ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_TARO_POWDER', 'ING_TEA_JASMINE', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'green_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Purple gradient',
      premium_style_decoration: 'Taro chunks garnish + purple straw'
    },
    preparation: {
      method: 'Blend taro powder with tea; add milk and ice; shake well; add boba',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Blend taro powder smoothly to avoid lumps'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 5.00, profit_margin_percent: 82.0 },
    nutrition: { calories_per_serving: 340, caffeine_mg: 25, sugar_g: 42, protein_g: 5, fat_g: 6 },
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
      available_syrups: ['vanilla'],
      available_toppings: ['tapioca_pearls', 'taro_balls', 'coconut_jelly', 'pudding'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['taro', 'purple', 'creamy', 'instagram', 'unique'],
    origin_country: 'Taiwan',
    popularity: 92,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'tea-thai-milk-tea',
    slug: 'thai-milk-tea',
    name: 'Thai Milk Tea',
    description: 'Vibrant orange Thai tea with condensed milk and spices, sweet and aromatic.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'very_sweet',
    main_ingredients: ['thai tea', 'condensed milk', 'evaporated milk', 'tapioca pearls', 'ice'],
    quantity_description: '200ml thai tea, 30ml condensed milk, 50ml evaporated milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_TEA_THAI', 'ING_CONDENSED_MILK', 'ING_EVAPORATED_MILK', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'black_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 450,
      chain_style_decoration: 'Orange gradient',
      premium_style_decoration: 'Clear layered orange-white + star anise'
    },
    preparation: {
      method: 'Brew thai tea with spices; cool; layer with milks over ice; add boba',
      prep_time_seconds: 150,
      skill_level: 2,
      steep_time_seconds: 420,
      water_temperature_c: 95,
      notes: 'Traditional Thai tea mix includes star anise and vanilla'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 5.00, profit_margin_percent: 83.0 },
    nutrition: { calories_per_serving: 320, caffeine_mg: 60, sugar_g: 48, protein_g: 6, fat_g: 10 },
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
      available_milks: ['whole', 'coconut'],
      available_syrups: [],
      available_toppings: ['tapioca_pearls', 'coconut_jelly', 'grass_jelly'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['thai', 'orange', 'spiced', 'condensed-milk', 'aromatic'],
    origin_country: 'Thailand',
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-matcha-boba',
    slug: 'matcha-boba',
    name: 'Matcha Milk Tea with Boba',
    description: 'Japanese matcha meets Taiwanese boba - creamy green tea with chewy tapioca pearls.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['matcha powder', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '3g matcha, 200ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_MATCHA', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'green_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Green color',
      premium_style_decoration: 'Matcha powder art + clear layers'
    },
    preparation: {
      method: 'Whisk matcha; shake with milk and ice; add boba',
      prep_time_seconds: 100,
      skill_level: 2,
      notes: 'Whisk matcha well to prevent clumps'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 5.50, profit_margin_percent: 81.8 },
    nutrition: { calories_per_serving: 300, caffeine_mg: 70, sugar_g: 32, protein_g: 8, fat_g: 6 },
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
      available_toppings: ['tapioca_pearls', 'red_bean', 'coconut_jelly', 'cheese_foam'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['matcha', 'boba', 'fusion', 'japanese', 'taiwanese'],
    origin_country: 'Taiwan',
    popularity: 90,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-honeydew-milk-tea',
    slug: 'honeydew-milk-tea',
    name: 'Honeydew Milk Tea',
    description: 'Refreshing green melon milk tea with a sweet, fruity flavor profile.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'low',
    sweetness: 'sweet',
    main_ingredients: ['honeydew powder', 'green tea', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '30g honeydew powder, 100ml green tea, 150ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_HONEYDEW_POWDER', 'ING_TEA_GREEN', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'green_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Light green color',
      premium_style_decoration: 'Honeydew ball garnish'
    },
    preparation: {
      method: 'Blend honeydew powder with tea; add milk and ice; shake; add boba',
      prep_time_seconds: 110,
      skill_level: 2,
      notes: 'Fresh honeydew puree for premium version'
    },
    cost: { ingredient_cost_usd: 0.90, selling_price_usd: 5.00, profit_margin_percent: 82.0 },
    nutrition: { calories_per_serving: 310, caffeine_mg: 20, sugar_g: 40, protein_g: 5, fat_g: 5 },
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
      available_milks: ['whole', 'oat', 'coconut'],
      available_syrups: ['honey'],
      available_toppings: ['tapioca_pearls', 'aloe_vera', 'coconut_jelly', 'popping_boba'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['honeydew', 'melon', 'fruity', 'refreshing', 'summer'],
    origin_country: 'Taiwan',
    popularity: 78,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'tea-oolong-milk-tea',
    slug: 'oolong-milk-tea',
    name: 'Oolong Milk Tea',
    description: 'Premium Taiwanese oolong tea with creamy milk, featuring a complex floral flavor.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'lightly_sweet',
    main_ingredients: ['oolong tea', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '200ml oolong tea, 100ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_TEA_OOLONG', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'oolong',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Amber color',
      premium_style_decoration: 'Gold shimmer + oolong leaves garnish'
    },
    preparation: {
      method: 'Brew premium oolong; cool; shake with milk and ice; add boba',
      prep_time_seconds: 150,
      skill_level: 2,
      steep_time_seconds: 240,
      water_temperature_c: 85,
      notes: 'Use high mountain oolong for best flavor'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 5.50, profit_margin_percent: 81.8 },
    nutrition: { calories_per_serving: 240, caffeine_mg: 40, sugar_g: 25, protein_g: 5, fat_g: 5 },
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
      available_syrups: ['honey'],
      available_toppings: ['tapioca_pearls', 'aloe_vera', 'coconut_jelly'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['oolong', 'premium', 'floral', 'taiwanese', 'sophisticated'],
    origin_country: 'Taiwan',
    popularity: 82,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-cheese-foam-tea',
    slug: 'cheese-foam-tea',
    name: 'Cheese Foam Black Tea',
    description: 'Trending drink with creamy salted cheese foam floating on top of cold black tea.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'medium',
    sweetness: 'medium',
    main_ingredients: ['black tea', 'cream cheese foam', 'milk', 'salt', 'ice'],
    quantity_description: '250ml black tea, 50g cheese foam, 100g ice',
    ingredient_ids: ['ING_TEA_BLACK', 'ING_CREAM_CHEESE', 'ING_HEAVY_CREAM', 'ING_SALT', 'ING_ICE'],
    bubble_tea_base: 'black_tea',
    default_toppings: ['cheese_foam'],
    serving: {
      glass_type: 'Wide cup',
      volume_ml: 450,
      chain_style_decoration: 'Cheese foam cap',
      premium_style_decoration: 'Sea salt flakes + cocoa dust on foam'
    },
    preparation: {
      method: 'Brew tea; chill; whip cheese foam; layer on top',
      prep_time_seconds: 180,
      skill_level: 3,
      steep_time_seconds: 300,
      water_temperature_c: 95,
      notes: 'Drink without straw to get foam with each sip'
    },
    cost: { ingredient_cost_usd: 1.10, selling_price_usd: 5.80, profit_margin_percent: 81.0 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 50, sugar_g: 20, protein_g: 6, fat_g: 16 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'none',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      available_toppings: ['cheese_foam', 'tapioca_pearls'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['cheese-foam', 'trending', 'savory-sweet', 'asian', 'unique'],
    origin_country: 'Taiwan',
    popularity: 85,
    is_seasonal: false,
    is_signature: true
  },
  // Fruit Tea Bobas
  {
    id: 'tea-mango-passion-fruit',
    slug: 'mango-passion-fruit-tea',
    name: 'Mango Passion Fruit Tea',
    description: 'Tropical fruit tea with mango and passion fruit, refreshing and caffeine-optional.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'low',
    sweetness: 'sweet',
    main_ingredients: ['green tea', 'mango puree', 'passion fruit', 'popping boba', 'ice'],
    quantity_description: '150ml green tea, 40ml mango, 20ml passion fruit, 30g popping boba, 120g ice',
    ingredient_ids: ['ING_TEA_GREEN', 'ING_MANGO_PUREE', 'ING_PASSION_FRUIT', 'ING_POPPING_BOBA', 'ING_ICE'],
    bubble_tea_base: 'green_tea',
    default_toppings: ['popping_boba'],
    serving: {
      glass_type: 'Clear cup',
      volume_ml: 500,
      chain_style_decoration: 'Fruit pieces visible',
      premium_style_decoration: 'Fresh mango slice + passion fruit half'
    },
    preparation: {
      method: 'Brew tea; blend with fruit; shake with ice; add popping boba',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Use fresh fruit when available'
    },
    cost: { ingredient_cost_usd: 1.20, selling_price_usd: 5.80, profit_margin_percent: 79.3 },
    nutrition: { calories_per_serving: 220, caffeine_mg: 15, sugar_g: 38, protein_g: 2, fat_g: 1 },
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
      available_milks: ['none', 'coconut'],
      available_syrups: [],
      available_toppings: ['popping_boba', 'aloe_vera', 'coconut_jelly'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['tropical', 'fruit', 'mango', 'passion-fruit', 'refreshing', 'vegan'],
    origin_country: 'Taiwan',
    popularity: 88,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'tea-lychee-tea',
    slug: 'lychee-bubble-tea',
    name: 'Lychee Bubble Tea',
    description: 'Delicate floral lychee tea with subtle sweetness and aromatic fragrance.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'low',
    sweetness: 'medium',
    main_ingredients: ['green tea', 'lychee syrup', 'lychee pieces', 'tapioca pearls', 'ice'],
    quantity_description: '200ml green tea, 30ml lychee syrup, 30g lychee, 50g boba, 100g ice',
    ingredient_ids: ['ING_TEA_GREEN', 'ING_LYCHEE_SYRUP', 'ING_LYCHEE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'green_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Lychee pieces visible',
      premium_style_decoration: 'Fresh lychee garnish + edible flower'
    },
    preparation: {
      method: 'Brew green tea; cool; add lychee syrup; shake with ice; add boba and fruit',
      prep_time_seconds: 110,
      skill_level: 2,
      notes: 'Canned lychee works well'
    },
    cost: { ingredient_cost_usd: 0.95, selling_price_usd: 5.20, profit_margin_percent: 81.7 },
    nutrition: { calories_per_serving: 240, caffeine_mg: 20, sugar_g: 35, protein_g: 2, fat_g: 0 },
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
      available_milks: ['none', 'coconut'],
      available_syrups: ['extra lychee', 'rose'],
      available_toppings: ['tapioca_pearls', 'aloe_vera', 'coconut_jelly', 'popping_boba'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['lychee', 'floral', 'delicate', 'asian', 'fruit'],
    origin_country: 'Taiwan',
    popularity: 80,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-strawberry-boba',
    slug: 'strawberry-milk-tea',
    name: 'Strawberry Milk Tea',
    description: 'Sweet and creamy strawberry milk tea with a beautiful pink hue.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'low',
    sweetness: 'sweet',
    main_ingredients: ['green tea', 'strawberry puree', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '100ml green tea, 50ml strawberry, 150ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_TEA_GREEN', 'ING_STRAWBERRY_PUREE', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'green_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Pink color',
      premium_style_decoration: 'Fresh strawberry slice + pink straw'
    },
    preparation: {
      method: 'Blend strawberry with tea and milk; shake with ice; add boba',
      prep_time_seconds: 110,
      skill_level: 2,
      notes: 'Use fresh strawberries in season'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 5.30, profit_margin_percent: 81.1 },
    nutrition: { calories_per_serving: 280, caffeine_mg: 15, sugar_g: 38, protein_g: 5, fat_g: 5 },
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
      available_milks: ['whole', 'oat', 'coconut'],
      available_syrups: ['vanilla'],
      available_toppings: ['tapioca_pearls', 'popping_boba', 'coconut_jelly'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['strawberry', 'pink', 'fruity', 'creamy', 'instagram'],
    origin_country: 'Taiwan',
    popularity: 86,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'tea-wintermelon-tea',
    slug: 'wintermelon-milk-tea',
    name: 'Wintermelon Milk Tea',
    description: 'Unique caramelized wintermelon tea with subtle smoky sweetness, a Taiwanese specialty.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'none',
    sweetness: 'sweet',
    main_ingredients: ['wintermelon syrup', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '50ml wintermelon syrup, 200ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_WINTERMELON_SYRUP', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'none',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Amber-gold color',
      premium_style_decoration: 'Caramelized sugar rim'
    },
    preparation: {
      method: 'Mix wintermelon syrup with milk; shake with ice; add boba',
      prep_time_seconds: 80,
      skill_level: 1,
      notes: 'Wintermelon syrup is pre-made from slow-cooked melon'
    },
    cost: { ingredient_cost_usd: 0.85, selling_price_usd: 5.00, profit_margin_percent: 83.0 },
    nutrition: { calories_per_serving: 290, caffeine_mg: 0, sugar_g: 42, protein_g: 6, fat_g: 6 },
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
      available_milks: ['whole', 'oat', 'coconut', 'soy'],
      available_syrups: [],
      available_toppings: ['tapioca_pearls', 'grass_jelly', 'pudding'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['wintermelon', 'caramel', 'unique', 'taiwanese', 'caffeine-free'],
    origin_country: 'Taiwan',
    popularity: 75,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-hojicha-boba',
    slug: 'hojicha-milk-tea',
    name: 'Hojicha Milk Tea',
    description: 'Japanese roasted green tea with a toasty, caramel-like flavor and creamy milk.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'low',
    sweetness: 'lightly_sweet',
    main_ingredients: ['hojicha tea', 'milk', 'tapioca pearls', 'ice'],
    quantity_description: '200ml hojicha, 100ml milk, 50g boba, 100g ice',
    ingredient_ids: ['ING_TEA_HOJICHA', 'ING_MILK_WHOLE', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'green_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Warm brown color',
      premium_style_decoration: 'Toasted rice garnish + hojicha powder'
    },
    preparation: {
      method: 'Brew hojicha; cool; shake with milk and ice; add boba',
      prep_time_seconds: 140,
      skill_level: 2,
      steep_time_seconds: 180,
      water_temperature_c: 90,
      notes: 'Lower caffeine than matcha, naturally sweet'
    },
    cost: { ingredient_cost_usd: 1.00, selling_price_usd: 5.50, profit_margin_percent: 81.8 },
    nutrition: { calories_per_serving: 220, caffeine_mg: 25, sugar_g: 25, protein_g: 5, fat_g: 5 },
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
      available_syrups: ['honey', 'brown sugar'],
      available_toppings: ['tapioca_pearls', 'red_bean', 'pudding'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['hojicha', 'japanese', 'roasted', 'toasty', 'low-caffeine'],
    origin_country: 'Japan',
    popularity: 76,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'tea-black-sesame-boba',
    slug: 'black-sesame-milk-tea',
    name: 'Black Sesame Milk Tea',
    description: 'Nutty and earthy black sesame milk tea with a distinctive gray-purple color.',
    category: 'bubble_tea',
    style: 'iced',
    caffeine_level: 'low',
    sweetness: 'medium',
    main_ingredients: ['black sesame paste', 'milk', 'black tea', 'tapioca pearls', 'ice'],
    quantity_description: '30g sesame paste, 150ml milk, 100ml black tea, 50g boba, 100g ice',
    ingredient_ids: ['ING_BLACK_SESAME', 'ING_MILK_WHOLE', 'ING_TEA_BLACK', 'ING_TAPIOCA_PEARLS', 'ING_ICE'],
    bubble_tea_base: 'black_tea',
    default_toppings: ['tapioca_pearls'],
    serving: {
      glass_type: 'Bubble tea cup',
      volume_ml: 500,
      chain_style_decoration: 'Gray color',
      premium_style_decoration: 'Sesame seeds on foam + swirl pattern'
    },
    preparation: {
      method: 'Blend sesame paste with tea and milk; shake with ice; add boba',
      prep_time_seconds: 120,
      skill_level: 2,
      notes: 'Toast sesame seeds for garnish'
    },
    cost: { ingredient_cost_usd: 1.05, selling_price_usd: 5.50, profit_margin_percent: 80.9 },
    nutrition: { calories_per_serving: 320, caffeine_mg: 25, sugar_g: 28, protein_g: 8, fat_g: 12 },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      is_caffeine_free: false,
      default_milk: 'whole',
      allergens: ['milk', 'sesame']
    },
    customization: {
      available_milks: ['whole', 'oat'],
      available_syrups: ['honey'],
      available_toppings: ['tapioca_pearls', 'red_bean', 'taro_balls'],
      can_adjust_sweetness: true,
      can_adjust_ice: true
    },
    tags: ['black-sesame', 'nutty', 'unique', 'asian', 'protein'],
    origin_country: 'Taiwan',
    popularity: 72,
    is_seasonal: false,
    is_signature: true
  }
];

export default bubbleTeaDrinks;
