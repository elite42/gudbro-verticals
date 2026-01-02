/**
 * GUDBRO Coffee Database
 *
 * ~68 coffee recipes (COFFEE-BASED ONLY):
 * - Espresso-Based (17)
 * - Coffee Mix (3 base + 19 additional + 4 frappuccino)
 * - Cold Brew (4)
 * - Filter Coffee (4)
 * - World Coffees (30): Vietnamese, Trending, Traditional, Specialty
 *
 * NOTE: Matcha moved to Tea & Infusions database
 * Architecture: English only in DB, translations separate
 */

import type { Coffee, CoffeeStats } from '../types';
import additionalCoffees from './additional-coffees';
import { allWorldCoffees } from './world-coffees';

// Helper to generate slug
const toSlug = (name: string): string =>
  name.toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// Helper to generate ID
const toId = (name: string): string => `coffee-${toSlug(name)}`;

// Helper to parse volume from glass type string
const parseVolume = (glassType: string): number => {
  const match = glassType.match(/(\d+)\s*ml/);
  return match ? parseInt(match[1]) : 300;
};

// Helper to determine caffeine level
const getCaffeineLevel = (ingredients: string, category: string): Coffee['caffeine_level'] => {
  if (category === 'Matcha') return 'medium';
  if (ingredients.toLowerCase().includes('espresso')) {
    if (ingredients.toLowerCase().includes('double')) return 'very_high';
    return 'high';
  }
  return 'medium';
};

// Helper to determine style
const getStyle = (name: string, method: string): Coffee['style'] => {
  if (name.toLowerCase().includes('iced') || method.toLowerCase().includes('ice')) return 'iced';
  if (method.toLowerCase().includes('blend')) return 'blended';
  if (method.toLowerCase().includes('layer') || method.toLowerCase().includes('float')) return 'layered';
  return 'hot';
};

// Helper to determine sweetness
const getSweetness = (ingredients: string, notes: string): Coffee['sweetness'] => {
  const text = `${ingredients} ${notes}`.toLowerCase();
  if (text.includes('very sweet') || text.includes('condensed milk')) return 'very_sweet';
  if (text.includes('sweet') || text.includes('sugar') || text.includes('syrup')) return 'medium';
  if (text.includes('honey')) return 'lightly_sweet';
  return 'unsweetened';
};

// Helper to estimate calories
const estimateCalories = (ingredients: string, cost: number): number => {
  const text = ingredients.toLowerCase();
  let base = 50; // espresso base
  if (text.includes('milk')) base += 80;
  if (text.includes('ice cream')) base += 150;
  if (text.includes('whipped cream') || text.includes('cream')) base += 50;
  if (text.includes('chocolate') || text.includes('nutella')) base += 100;
  if (text.includes('condensed milk')) base += 80;
  if (text.includes('syrup')) base += 40;
  return Math.round(base);
};

// Helper to parse main ingredients
const parseIngredients = (ingredients: string): string[] => {
  return ingredients.split(',').map(i => i.trim().toLowerCase());
};

// Helper to determine if vegan
const isVegan = (ingredients: string): boolean => {
  const text = ingredients.toLowerCase();
  return !text.includes('milk') && !text.includes('cream') && !text.includes('ice cream') && !text.includes('yogurt');
};

// Helper to determine if dairy-free
const isDairyFree = (ingredients: string): boolean => {
  const text = ingredients.toLowerCase();
  return !text.includes('milk') && !text.includes('cream') && !text.includes('ice cream');
};

// Espresso-Based Coffees
export const espressoBasedCoffees: Coffee[] = [
  {
    id: 'coffee-espresso-single',
    slug: 'espresso-single',
    name: 'Espresso (Single)',
    description: 'A concentrated shot of coffee extracted under high pressure, featuring rich crema and intense flavor.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['ground coffee'],
    quantity_description: '9g coffee, 25-30ml espresso',
    ingredient_ids: ['ING_COFFEE_ESPRESSO'],
    serving: {
      glass_type: 'Espresso cup',
      volume_ml: 60,
      chain_style_decoration: 'None or crema swirl',
      premium_style_decoration: 'Cocoa dust on crema or minimalist latte art'
    },
    preparation: {
      method: 'Extract at 9 bar, 92°C, ~25s',
      prep_time_seconds: 40,
      skill_level: 2,
      notes: 'Double = 18g coffee / 50-60ml'
    },
    cost: {
      ingredient_cost_usd: 0.35,
      selling_price_usd: 2.50,
      profit_margin_percent: 86.0
    },
    nutrition: {
      calories_per_serving: 5,
      caffeine_mg: 63,
      sugar_g: 0,
      protein_g: 0.1,
      fat_g: 0
    },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_add_espresso_shot: true,
      can_adjust_sweetness: false,
      can_make_decaf: true
    },
    tags: ['classic', 'italian', 'strong', 'quick'],
    popularity: 85,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-espresso-double',
    slug: 'espresso-double',
    name: 'Espresso (Double)',
    description: 'A double shot of espresso, also known as doppio, with twice the intensity and caffeine.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'very_high',
    sweetness: 'unsweetened',
    main_ingredients: ['ground coffee'],
    quantity_description: '18g coffee, 50-60ml espresso',
    ingredient_ids: ['ING_COFFEE_ESPRESSO'],
    serving: {
      glass_type: 'Espresso cup',
      volume_ml: 90,
      chain_style_decoration: 'None or crema swirl',
      premium_style_decoration: 'Cocoa dust ring'
    },
    preparation: {
      method: 'Extract at 9 bar, 92°C, ~28s',
      prep_time_seconds: 45,
      skill_level: 2,
      notes: 'Use bottomless for training'
    },
    cost: {
      ingredient_cost_usd: 0.50,
      selling_price_usd: 3.00,
      profit_margin_percent: 83.3
    },
    nutrition: {
      calories_per_serving: 10,
      caffeine_mg: 126,
      sugar_g: 0,
      protein_g: 0.2,
      fat_g: 0
    },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_add_espresso_shot: true,
      can_adjust_sweetness: false,
      can_make_decaf: true
    },
    tags: ['classic', 'italian', 'strong', 'doppio'],
    popularity: 80,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-americano-hot',
    slug: 'americano-hot',
    name: 'Americano (Hot)',
    description: 'Espresso diluted with hot water, creating a smooth and less intense coffee experience.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'hot water'],
    quantity_description: '60ml espresso, 120ml hot water',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WATER'],
    serving: {
      glass_type: 'Tall mug',
      volume_ml: 300,
      chain_style_decoration: 'Lemon slice optional',
      premium_style_decoration: 'Lemon twist + clear glass layering'
    },
    preparation: {
      method: 'Pull espresso, add hot water',
      prep_time_seconds: 50,
      skill_level: 1,
      notes: 'Iced: 60ml espresso + 150g ice + 120ml cold water'
    },
    cost: {
      ingredient_cost_usd: 0.40,
      selling_price_usd: 2.80,
      profit_margin_percent: 85.7
    },
    nutrition: {
      calories_per_serving: 10,
      caffeine_mg: 126,
      sugar_g: 0,
      protein_g: 0.2,
      fat_g: 0
    },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: true,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['vanilla', 'caramel', 'hazelnut'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['classic', 'simple', 'black-coffee'],
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-latte-hot',
    slug: 'latte-hot',
    name: 'Latte (Hot)',
    description: 'Espresso with steamed milk and a thin layer of microfoam, creating a creamy and balanced drink.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'milk'],
    quantity_description: '60ml espresso, 180ml steamed milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 300,
      chain_style_decoration: 'Minimal foam art',
      premium_style_decoration: 'Rosetta/Tulip latte art'
    },
    preparation: {
      method: 'Pour espresso, then steamed milk',
      prep_time_seconds: 70,
      skill_level: 2,
      notes: 'Flavor syrup +15ml optional'
    },
    cost: {
      ingredient_cost_usd: 0.60,
      selling_price_usd: 3.50,
      profit_margin_percent: 82.9
    },
    nutrition: {
      calories_per_serving: 150,
      caffeine_mg: 126,
      sugar_g: 12,
      protein_g: 8,
      fat_g: 6
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'skim', 'oat', 'almond', 'soy', 'coconut'],
      available_syrups: ['vanilla', 'caramel', 'hazelnut', 'mocha'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['classic', 'creamy', 'popular', 'latte-art'],
    popularity: 95,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-iced-latte',
    slug: 'iced-latte',
    name: 'Iced Latte',
    description: 'Cold milk poured over ice with espresso floated on top, refreshing and smooth.',
    category: 'espresso_based',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'milk', 'ice'],
    quantity_description: '60ml espresso, 150ml milk, 100g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_ICE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 350,
      chain_style_decoration: 'No garnish',
      premium_style_decoration: 'Layered pour + straw'
    },
    preparation: {
      method: 'Pour milk over ice, float espresso',
      prep_time_seconds: 60,
      skill_level: 1,
      notes: 'Add whipped cream if desired'
    },
    cost: {
      ingredient_cost_usd: 0.60,
      selling_price_usd: 3.50,
      profit_margin_percent: 82.9
    },
    nutrition: {
      calories_per_serving: 130,
      caffeine_mg: 126,
      sugar_g: 10,
      protein_g: 7,
      fat_g: 5
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'skim', 'oat', 'almond', 'soy', 'coconut'],
      available_syrups: ['vanilla', 'caramel', 'hazelnut', 'mocha'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['iced', 'refreshing', 'popular', 'summer'],
    popularity: 92,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-cappuccino',
    slug: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and foam, dusted with cocoa or cinnamon.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'milk'],
    quantity_description: '60ml espresso, 120ml textured milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Cappuccino cup',
      volume_ml: 180,
      chain_style_decoration: 'Cocoa powder dust',
      premium_style_decoration: 'Latte art + cocoa edge dust'
    },
    preparation: {
      method: 'Combine espresso and microfoam',
      prep_time_seconds: 75,
      skill_level: 2,
      notes: 'Dust cocoa/cinnamon'
    },
    cost: {
      ingredient_cost_usd: 0.55,
      selling_price_usd: 3.40,
      profit_margin_percent: 83.8
    },
    nutrition: {
      calories_per_serving: 120,
      caffeine_mg: 126,
      sugar_g: 8,
      protein_g: 6,
      fat_g: 5
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'skim', 'oat', 'almond', 'soy', 'coconut'],
      available_syrups: ['vanilla', 'caramel', 'hazelnut'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['classic', 'italian', 'foamy', 'morning'],
    popularity: 90,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-flat-white',
    slug: 'flat-white',
    name: 'Flat White',
    description: 'A stronger espresso drink with microfoamed milk, featuring a velvety texture and intense coffee flavor.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'milk'],
    quantity_description: '60ml espresso, 150ml microfoamed milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Flat white cup',
      volume_ml: 180,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Tight latte art'
    },
    preparation: {
      method: 'Pour thin microfoam layer',
      prep_time_seconds: 70,
      skill_level: 2,
      notes: 'Stronger ratio than cappuccino'
    },
    cost: {
      ingredient_cost_usd: 0.55,
      selling_price_usd: 3.40,
      profit_margin_percent: 83.8
    },
    nutrition: {
      calories_per_serving: 130,
      caffeine_mg: 126,
      sugar_g: 9,
      protein_g: 7,
      fat_g: 5
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'skim', 'oat', 'almond', 'soy', 'coconut'],
      available_syrups: ['vanilla'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['australian', 'strong', 'velvety', 'specialty'],
    popularity: 85,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-macchiato',
    slug: 'macchiato',
    name: 'Macchiato',
    description: 'Espresso marked with a small amount of milk foam, preserving the coffee intensity.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'unsweetened',
    main_ingredients: ['espresso', 'milk foam'],
    quantity_description: '60ml espresso, 10ml milk foam',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Espresso cup',
      volume_ml: 60,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Tiny foam dollop art'
    },
    preparation: {
      method: 'Spoon foam over espresso',
      prep_time_seconds: 40,
      skill_level: 1,
      notes: 'Iced: espresso over ice + cold foam'
    },
    cost: {
      ingredient_cost_usd: 0.40,
      selling_price_usd: 2.80,
      profit_margin_percent: 85.7
    },
    nutrition: {
      calories_per_serving: 15,
      caffeine_mg: 126,
      sugar_g: 1,
      protein_g: 1,
      fat_g: 0.5
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: true,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond'],
      available_syrups: ['caramel', 'vanilla'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['classic', 'italian', 'strong', 'small'],
    popularity: 75,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-cafe-mocha',
    slug: 'cafe-mocha',
    name: 'Cafe Mocha',
    description: 'A chocolate lovers dream - espresso combined with chocolate syrup, steamed milk, and whipped cream.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'chocolate syrup', 'milk', 'whipped cream'],
    quantity_description: '60ml espresso, 20ml chocolate syrup, 150ml milk, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Whipped cream + chocolate drizzle',
      premium_style_decoration: 'Cocoa dust + chocolate shards'
    },
    preparation: {
      method: 'Mix syrup + espresso, add steamed milk, top with cream',
      prep_time_seconds: 90,
      skill_level: 2,
      notes: 'Chocolate drizzle'
    },
    cost: {
      ingredient_cost_usd: 0.75,
      selling_price_usd: 4.00,
      profit_margin_percent: 81.2
    },
    nutrition: {
      calories_per_serving: 290,
      caffeine_mg: 126,
      sugar_g: 35,
      protein_g: 8,
      fat_g: 12
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'skim', 'oat', 'almond', 'soy', 'coconut'],
      available_syrups: ['vanilla', 'caramel', 'white chocolate'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['chocolate', 'indulgent', 'sweet', 'dessert-coffee'],
    popularity: 88,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-caramel-latte',
    slug: 'caramel-latte',
    name: 'Caramel Latte',
    description: 'Smooth latte infused with rich caramel syrup and finished with a caramel drizzle.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'milk', 'caramel syrup'],
    quantity_description: '60ml espresso, 150ml milk, 15ml caramel syrup',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_CARAMEL_SYRUP'],
    serving: {
      glass_type: 'Latte glass',
      volume_ml: 300,
      chain_style_decoration: 'Caramel drizzle',
      premium_style_decoration: 'Criss-cross caramel art'
    },
    preparation: {
      method: 'Steam milk with syrup, pour over espresso',
      prep_time_seconds: 80,
      skill_level: 2,
      notes: 'Caramel drizzle'
    },
    cost: {
      ingredient_cost_usd: 0.65,
      selling_price_usd: 3.90,
      profit_margin_percent: 83.3
    },
    nutrition: {
      calories_per_serving: 200,
      caffeine_mg: 126,
      sugar_g: 28,
      protein_g: 8,
      fat_g: 6
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'skim', 'oat', 'almond', 'soy', 'coconut'],
      available_syrups: ['extra caramel', 'vanilla', 'salted caramel'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['caramel', 'sweet', 'popular', 'flavored'],
    popularity: 87,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-spanish-latte',
    slug: 'spanish-latte',
    name: 'Spanish Latte (Hot)',
    description: 'A creamy latte made with condensed milk for a rich, sweet Vietnamese-style coffee experience.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'milk', 'condensed milk'],
    quantity_description: '60ml espresso, 120ml milk, 30ml condensed milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_CONDENSED_MILK'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Condensed milk swirl'
    },
    preparation: {
      method: 'Mix condensed + milk, steam, pour espresso',
      prep_time_seconds: 80,
      skill_level: 2,
      notes: 'Iced: shake all with ice'
    },
    cost: {
      ingredient_cost_usd: 0.70,
      selling_price_usd: 4.00,
      profit_margin_percent: 82.5
    },
    nutrition: {
      calories_per_serving: 280,
      caffeine_mg: 126,
      sugar_g: 40,
      protein_g: 9,
      fat_g: 8
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'coconut'],
      available_syrups: [],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['sweet', 'creamy', 'asian-style', 'indulgent'],
    popularity: 82,
    is_seasonal: false,
    is_signature: false
  },
  {
    id: 'coffee-raf-coffee',
    slug: 'raf-coffee',
    name: 'Raf Coffee (Classic)',
    description: 'Russian specialty - espresso, cream, and vanilla syrup steamed together until velvety smooth.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'cream', 'sugar', 'vanilla syrup'],
    quantity_description: '60ml espresso, 60ml cream, 10ml syrup, 5g sugar',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_HEAVY_CREAM', 'ING_VANILLA_SYRUP', 'ING_SUGAR'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Vanilla bean piece'
    },
    preparation: {
      method: 'Steam all together until frothy',
      prep_time_seconds: 90,
      skill_level: 3,
      notes: 'Serve hot without foam'
    },
    cost: {
      ingredient_cost_usd: 0.80,
      selling_price_usd: 4.20,
      profit_margin_percent: 81.0
    },
    nutrition: {
      calories_per_serving: 320,
      caffeine_mg: 126,
      sugar_g: 25,
      protein_g: 3,
      fat_g: 22
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'none',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['lavender', 'caramel', 'hazelnut'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['russian', 'creamy', 'specialty', 'rich'],
    popularity: 70,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-tiramisu-cappuccino',
    slug: 'tiramisu-cappuccino',
    name: 'Tiramisu Cappuccino',
    description: 'Dessert-inspired cappuccino layered with mascarpone cream and dusted with cocoa, like the classic Italian dessert.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'milk', 'cocoa', 'mascarpone cream'],
    quantity_description: '60ml espresso, 120ml milk, 15g cocoa, 20g mascarpone',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_COCOA_POWDER', 'ING_MASCARPONE'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'Cocoa dust',
      premium_style_decoration: 'Cocoa stencil + ladyfinger crumb'
    },
    preparation: {
      method: 'Layer espresso, mascarpone, milk foam; dust cocoa',
      prep_time_seconds: 110,
      skill_level: 3,
      notes: 'Dessert-style'
    },
    cost: {
      ingredient_cost_usd: 0.95,
      selling_price_usd: 4.80,
      profit_margin_percent: 80.2
    },
    nutrition: {
      calories_per_serving: 280,
      caffeine_mg: 126,
      sugar_g: 22,
      protein_g: 8,
      fat_g: 15
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: false,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk', 'eggs', 'gluten']
    },
    customization: {
      available_milks: ['whole'],
      available_syrups: [],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['italian', 'dessert', 'indulgent', 'specialty'],
    popularity: 75,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-cream-cheese-latte',
    slug: 'cream-cheese-latte',
    name: 'Cream Cheese Latte',
    description: 'Trendy Asian-style latte topped with a layer of salted cream cheese foam.',
    category: 'espresso_based',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'medium',
    main_ingredients: ['espresso', 'milk', 'cream cheese foam'],
    quantity_description: '60ml espresso, 150ml milk, 20g cream cheese foam',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_MILK_WHOLE', 'ING_CREAM_CHEESE'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 300,
      chain_style_decoration: 'Cream cheese cap',
      premium_style_decoration: 'Sea salt flakes + microfoam layer'
    },
    preparation: {
      method: 'Pour milk over espresso, top cream cheese foam',
      prep_time_seconds: 90,
      skill_level: 3,
      notes: 'Sprinkle sea salt'
    },
    cost: {
      ingredient_cost_usd: 0.85,
      selling_price_usd: 4.50,
      profit_margin_percent: 81.1
    },
    nutrition: {
      calories_per_serving: 220,
      caffeine_mg: 126,
      sugar_g: 15,
      protein_g: 9,
      fat_g: 12
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat'],
      available_syrups: [],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['asian-style', 'trending', 'creamy', 'savory-sweet'],
    popularity: 78,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-espresso-tonic',
    slug: 'espresso-tonic',
    name: 'Espresso Tonic',
    description: 'Refreshing summer drink combining espresso with tonic water over ice, garnished with citrus.',
    category: 'espresso_based',
    style: 'iced',
    caffeine_level: 'high',
    sweetness: 'lightly_sweet',
    main_ingredients: ['espresso', 'tonic water', 'ice', 'lemon slice'],
    quantity_description: '60ml espresso, 120ml tonic, 120g ice',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_TONIC_WATER', 'ING_ICE', 'ING_LEMON'],
    serving: {
      glass_type: 'Highball glass',
      volume_ml: 350,
      chain_style_decoration: 'Lemon slice',
      premium_style_decoration: 'Dehydrated lemon wheel + clear layering'
    },
    preparation: {
      method: 'Pour tonic over ice, float espresso',
      prep_time_seconds: 80,
      skill_level: 2,
      notes: 'Garnish lemon'
    },
    cost: {
      ingredient_cost_usd: 0.75,
      selling_price_usd: 4.20,
      profit_margin_percent: 82.1
    },
    nutrition: {
      calories_per_serving: 80,
      caffeine_mg: 126,
      sugar_g: 20,
      protein_g: 0.5,
      fat_g: 0
    },
    dietary: {
      is_vegan: true,
      is_dairy_free: true,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'none',
      allergens: []
    },
    customization: {
      available_milks: ['none'],
      available_syrups: [],
      can_add_espresso_shot: true,
      can_adjust_sweetness: false,
      can_make_decaf: true
    },
    tags: ['refreshing', 'summer', 'unique', 'bitter-sweet'],
    popularity: 72,
    is_seasonal: true,
    is_signature: false
  },
  {
    id: 'coffee-affogato',
    slug: 'affogato',
    name: 'Affogato',
    description: 'Italian dessert-coffee hybrid - hot espresso poured over cold vanilla ice cream.',
    category: 'espresso_based',
    style: 'layered',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'vanilla ice cream'],
    quantity_description: '60ml espresso, 80g ice cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_VANILLA_ICE_CREAM'],
    serving: {
      glass_type: 'Dessert bowl',
      volume_ml: 200,
      chain_style_decoration: 'None',
      premium_style_decoration: 'Chocolate shard on top'
    },
    preparation: {
      method: 'Pour hot espresso over ice cream',
      prep_time_seconds: 50,
      skill_level: 1,
      notes: 'Chocolate drizzle optional'
    },
    cost: {
      ingredient_cost_usd: 0.70,
      selling_price_usd: 4.00,
      profit_margin_percent: 82.5
    },
    nutrition: {
      calories_per_serving: 200,
      caffeine_mg: 126,
      sugar_g: 22,
      protein_g: 4,
      fat_g: 10
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'none',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['none'],
      available_syrups: ['chocolate', 'caramel'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: false,
      can_make_decaf: true
    },
    tags: ['italian', 'dessert', 'indulgent', 'classic'],
    popularity: 80,
    is_seasonal: false,
    is_signature: false
  }
];

// Coffee Mix drinks
export const coffeeMixDrinks: Coffee[] = [
  {
    id: 'coffee-nutella-coffee-iced',
    slug: 'nutella-coffee-iced',
    name: 'Nutella Coffee (Iced)',
    description: 'Indulgent blend of Nutella, espresso, and milk topped with whipped cream.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'nutella', 'milk', 'whipped cream', 'ice'],
    quantity_description: '60ml espresso, 25g Nutella, 150ml milk, 100g ice, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_NUTELLA', 'ING_MILK_WHOLE', 'ING_ICE', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Whipped cream + Nutella drizzle',
      premium_style_decoration: 'Whipped cream tower + hazelnut rim'
    },
    preparation: {
      method: 'Blend Nutella + milk; add ice; pour espresso; top with cream',
      prep_time_seconds: 90,
      skill_level: 3,
      notes: 'Hot: steam milk with Nutella'
    },
    cost: {
      ingredient_cost_usd: 0.90,
      selling_price_usd: 4.50,
      profit_margin_percent: 80.0
    },
    nutrition: {
      calories_per_serving: 380,
      caffeine_mg: 126,
      sugar_g: 45,
      protein_g: 9,
      fat_g: 18
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: false,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk', 'nuts', 'gluten']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond'],
      available_syrups: ['extra chocolate'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['nutella', 'indulgent', 'sweet', 'popular'],
    popularity: 88,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-oreo-coffee',
    slug: 'oreo-coffee',
    name: 'Oreo Coffee',
    description: 'Cookies and cream meets coffee - blended Oreo cookies with espresso and chocolate.',
    category: 'coffee_mix',
    style: 'blended',
    caffeine_level: 'high',
    sweetness: 'sweet',
    main_ingredients: ['espresso', 'oreo crumbs', 'milk', 'chocolate syrup', 'whipped cream'],
    quantity_description: '60ml espresso, 2 Oreo, 150ml milk, 15ml chocolate syrup, 20g cream',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_OREO', 'ING_MILK_WHOLE', 'ING_CHOCOLATE_SYRUP', 'ING_WHIPPED_CREAM'],
    serving: {
      glass_type: 'Tall glass',
      volume_ml: 400,
      chain_style_decoration: 'Whipped cream + chocolate drizzle',
      premium_style_decoration: 'Oreo crumble rim'
    },
    preparation: {
      method: 'Blend Oreo + milk + syrup; add espresso; top with cream',
      prep_time_seconds: 95,
      skill_level: 3,
      notes: 'Add Oreo crumble'
    },
    cost: {
      ingredient_cost_usd: 0.95,
      selling_price_usd: 4.60,
      profit_margin_percent: 79.3
    },
    nutrition: {
      calories_per_serving: 350,
      caffeine_mg: 126,
      sugar_g: 42,
      protein_g: 8,
      fat_g: 15
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: false,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk', 'gluten', 'soy']
    },
    customization: {
      available_milks: ['whole', 'oat'],
      available_syrups: ['extra chocolate'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['cookies', 'indulgent', 'sweet', 'dessert-coffee'],
    popularity: 85,
    is_seasonal: false,
    is_signature: true
  },
  {
    id: 'coffee-white-mocha',
    slug: 'white-mocha',
    name: 'White Mocha',
    description: 'Sweet and creamy white chocolate latte with a luxurious finish.',
    category: 'coffee_mix',
    style: 'hot',
    caffeine_level: 'high',
    sweetness: 'very_sweet',
    main_ingredients: ['espresso', 'white chocolate syrup', 'milk'],
    quantity_description: '60ml espresso, 20ml white chocolate syrup, 150ml milk',
    ingredient_ids: ['ING_COFFEE_ESPRESSO', 'ING_WHITE_CHOCOLATE_SYRUP', 'ING_MILK_WHOLE'],
    serving: {
      glass_type: 'Glass mug',
      volume_ml: 300,
      chain_style_decoration: 'None',
      premium_style_decoration: 'White chocolate grate'
    },
    preparation: {
      method: 'Steam milk with syrup; pour over espresso',
      prep_time_seconds: 85,
      skill_level: 2,
      notes: 'Very sweet profile'
    },
    cost: {
      ingredient_cost_usd: 0.85,
      selling_price_usd: 4.30,
      profit_margin_percent: 80.2
    },
    nutrition: {
      calories_per_serving: 320,
      caffeine_mg: 126,
      sugar_g: 45,
      protein_g: 9,
      fat_g: 12
    },
    dietary: {
      is_vegan: false,
      is_dairy_free: false,
      is_gluten_free: true,
      is_sugar_free: false,
      default_milk: 'whole',
      allergens: ['milk']
    },
    customization: {
      available_milks: ['whole', 'oat', 'almond'],
      available_syrups: ['vanilla', 'raspberry'],
      can_add_espresso_shot: true,
      can_adjust_sweetness: true,
      can_make_decaf: true
    },
    tags: ['white-chocolate', 'sweet', 'creamy', 'indulgent'],
    popularity: 82,
    is_seasonal: false,
    is_signature: false
  }
];

// NOTE: Matcha drinks moved to Tea & Infusions database

// Combine all coffees (COFFEE-BASED ONLY)
export const allCoffees: Coffee[] = [
  ...espressoBasedCoffees,
  ...coffeeMixDrinks,
  ...additionalCoffees,
  ...allWorldCoffees
];

// Calculate stats
export const coffeeStats: CoffeeStats = {
  total: allCoffees.length,
  by_category: {
    espresso_based: allCoffees.filter(c => c.category === 'espresso_based').length,
    coffee_mix: allCoffees.filter(c => c.category === 'coffee_mix').length,
    cold_brew: allCoffees.filter(c => c.category === 'cold_brew').length,
    filter_coffee: allCoffees.filter(c => c.category === 'filter_coffee').length,
    specialty: allCoffees.filter(c => c.category === 'specialty').length
  },
  by_style: {
    hot: allCoffees.filter(c => c.style === 'hot').length,
    iced: allCoffees.filter(c => c.style === 'iced').length,
    blended: allCoffees.filter(c => c.style === 'blended').length,
    layered: allCoffees.filter(c => c.style === 'layered').length
  }
};

export default allCoffees;
