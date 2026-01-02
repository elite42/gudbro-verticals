/**
 * GUDBRO Appetizers Database - Spanish Tapas Collection
 * 15 classic Spanish tapas
 */

import { Appetizer } from '../types';

export const spanishAppetizers: Appetizer[] = [
  // === TAPAS CALIENTES ===
  {
    id: 'patatas-bravas',
    slug: 'patatas-bravas',
    name: {
      en: 'Patatas Bravas',
      it: 'Patatas Bravas',
      vi: 'Khoai tây Bravas'
    },
    description: {
      en: 'Crispy fried potatoes with spicy bravas sauce and garlic aioli',
      it: 'Patate fritte croccanti con salsa bravas piccante e aioli all\'aglio',
      vi: 'Khoai tây chiên giòn với sốt bravas cay và sốt tỏi aioli'
    },
    style: 'spanish',
    status: 'classic',
    category: 'tapas',
    serving_temp: 'hot',
    ingredient_ids: ['ING_VEGETABLE_POTATO', 'ING_SAUCE_TOMATO', 'ING_SPICE_PAPRIKA', 'ING_VEGETABLE_GARLIC', 'ING_OIL_OLIVE'],
    sauce_or_dip: 'bravas sauce + aioli',
    is_fried: true,
    is_baked: false,
    is_raw: false,
    spice_level: 2,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Madrid'
    },
    history: {
      story: {
        en: 'Invented in Madrid in the 1960s, patatas bravas became the quintessential Spanish tapa',
        it: 'Inventate a Madrid negli anni \'60, sono diventate la tapa spagnola per eccellenza',
        vi: 'Được phát minh ở Madrid vào những năm 1960, patatas bravas trở thành món tapas tiêu biểu của Tây Ban Nha'
      }
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['beer', 'sangria', 'vermouth']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['egg'],
      calories_estimate: 320,
      protein_g: 4,
      carbs_g: 42,
      fat_g: 16,
      fiber_g: 4
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 20,
      difficulty: 'easy'
    },
    tags: ['spanish', 'tapas', 'fried', 'potatoes', 'classic', 'shareable'],
    popularity: 95
  },
  {
    id: 'gambas-al-ajillo',
    slug: 'gambas-al-ajillo',
    name: {
      en: 'Gambas al Ajillo',
      it: 'Gamberi all\'Aglio',
      vi: 'Tôm xào tỏi Tây Ban Nha'
    },
    description: {
      en: 'Sizzling shrimp cooked in olive oil with garlic and chili',
      it: 'Gamberi sfrigolanti cotti in olio d\'oliva con aglio e peperoncino',
      vi: 'Tôm nóng hổi nấu trong dầu ô liu với tỏi và ớt'
    },
    style: 'spanish',
    status: 'classic',
    category: 'mare',
    serving_temp: 'hot',
    ingredient_ids: ['ING_SEAFOOD_SHRIMP', 'ING_VEGETABLE_GARLIC', 'ING_OIL_OLIVE', 'ING_SPICE_CHILI', 'ING_HERB_PARSLEY'],
    is_fried: false,
    is_baked: false,
    is_raw: false,
    spice_level: 2,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Andalusia'
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 8,
      is_shareable: true,
      recommended_pairing: ['white wine', 'cava', 'crusty bread']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false,
      is_low_carb: true,
      is_keto_friendly: true,
      is_high_protein: true,
      allergens: ['shellfish'],
      calories_estimate: 280,
      protein_g: 22,
      carbs_g: 3,
      fat_g: 20,
      fiber_g: 0
    },
    preparation: {
      prep_time_min: 10,
      cook_time_min: 8,
      difficulty: 'easy'
    },
    tags: ['spanish', 'tapas', 'seafood', 'garlic', 'quick'],
    popularity: 92
  },
  {
    id: 'tortilla-espanola',
    slug: 'tortilla-espanola',
    name: {
      en: 'Spanish Tortilla',
      it: 'Tortilla Spagnola',
      vi: 'Trứng chiên Tây Ban Nha'
    },
    description: {
      en: 'Traditional Spanish omelette with potatoes and onions',
      it: 'Tradizionale frittata spagnola con patate e cipolle',
      vi: 'Trứng chiên truyền thống Tây Ban Nha với khoai tây và hành tây'
    },
    style: 'spanish',
    status: 'classic',
    category: 'tapas',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_EGG_WHOLE', 'ING_VEGETABLE_POTATO', 'ING_VEGETABLE_ONION', 'ING_OIL_OLIVE'],
    is_fried: true,
    is_baked: false,
    is_raw: false,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES'
    },
    history: {
      story: {
        en: 'Dating back to the 19th century, tortilla espanola is Spain\'s most iconic dish',
        it: 'Risalente al XIX secolo, la tortilla espanola e il piatto piu iconico della Spagna',
        vi: 'Có từ thế kỷ 19, tortilla espanola là món ăn mang tính biểu tượng nhất của Tây Ban Nha'
      }
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['red wine', 'beer', 'sangria']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['egg'],
      calories_estimate: 250,
      protein_g: 12,
      carbs_g: 22,
      fat_g: 14,
      fiber_g: 2
    },
    preparation: {
      prep_time_min: 20,
      cook_time_min: 25,
      difficulty: 'medium'
    },
    tags: ['spanish', 'tapas', 'eggs', 'potatoes', 'classic', 'vegetarian'],
    popularity: 90
  },
  {
    id: 'croquetas-jamon',
    slug: 'croquetas-jamon',
    name: {
      en: 'Ham Croquettes',
      it: 'Crocchette di Prosciutto',
      vi: 'Bánh khoai tây chiên nhân giăm bông'
    },
    description: {
      en: 'Creamy bechamel croquettes filled with Iberian ham',
      it: 'Cremose crocchette di besciamella ripiene di prosciutto iberico',
      vi: 'Bánh khoai tây chiên nhân kem bechamel với giăm bông Iberia'
    },
    style: 'spanish',
    status: 'classic',
    category: 'fritti',
    serving_temp: 'hot',
    ingredient_ids: ['ING_SAUCE_BECHAMEL', 'ING_PROTEIN_JAMON_IBERICO', 'ING_GRAIN_FLOUR', 'ING_DAIRY_BUTTER', 'ING_BREAD_CRUMBS'],
    is_fried: true,
    is_baked: false,
    is_raw: false,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES'
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 4,
      is_shareable: true,
      recommended_pairing: ['cava', 'white wine', 'beer']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'milk', 'egg'],
      calories_estimate: 320,
      protein_g: 14,
      carbs_g: 28,
      fat_g: 18,
      fiber_g: 1
    },
    preparation: {
      prep_time_min: 45,
      cook_time_min: 15,
      difficulty: 'hard'
    },
    tags: ['spanish', 'tapas', 'fried', 'ham', 'creamy'],
    popularity: 88
  },
  {
    id: 'pimientos-padron',
    slug: 'pimientos-padron',
    name: {
      en: 'Padron Peppers',
      it: 'Peperoni di Padron',
      vi: 'Ớt Padron'
    },
    description: {
      en: 'Blistered green peppers from Galicia with sea salt - some are hot, some are not!',
      it: 'Peperoni verdi scottati dalla Galizia con sale marino - alcuni sono piccanti, altri no!',
      vi: 'Ớt xanh nướng từ Galicia với muối biển - một số cay, một số không!'
    },
    style: 'spanish',
    status: 'classic',
    category: 'verdure',
    serving_temp: 'hot',
    ingredient_ids: ['ING_VEGETABLE_PEPPER_PADRON', 'ING_OIL_OLIVE', 'ING_SPICE_SALT_SEA'],
    is_fried: true,
    is_baked: false,
    is_raw: false,
    spice_level: 1,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Galicia',
      city: 'Padron'
    },
    serving: {
      portion_size: 'small',
      is_shareable: true,
      recommended_pairing: ['beer', 'white wine', 'albarino']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: true,
      is_keto_friendly: true,
      is_high_protein: false,
      allergens: [],
      calories_estimate: 80,
      protein_g: 2,
      carbs_g: 6,
      fat_g: 6,
      fiber_g: 2
    },
    preparation: {
      prep_time_min: 5,
      cook_time_min: 5,
      difficulty: 'easy'
    },
    tags: ['spanish', 'tapas', 'vegan', 'peppers', 'quick', 'galician'],
    popularity: 85
  },
  {
    id: 'jamon-iberico',
    slug: 'jamon-iberico',
    name: {
      en: 'Iberian Ham',
      it: 'Prosciutto Iberico',
      vi: 'Giăm bông Iberia'
    },
    description: {
      en: 'Hand-carved slices of premium acorn-fed Iberian ham',
      it: 'Fette tagliate a mano di pregiato prosciutto iberico di ghianda',
      vi: 'Lát giăm bông Iberia cao cấp từ heo ăn sồi, thái bằng tay'
    },
    style: 'spanish',
    status: 'classic',
    category: 'affettati',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_PROTEIN_JAMON_IBERICO'],
    is_fried: false,
    is_baked: false,
    is_raw: false,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Extremadura'
    },
    history: {
      story: {
        en: 'Considered the finest ham in the world, from pigs fed on acorns in the dehesa',
        it: 'Considerato il miglior prosciutto al mondo, da maiali nutriti con ghiande nella dehesa',
        vi: 'Được coi là giăm bông ngon nhất thế giới, từ heo ăn sồi trong rừng sồi dehesa'
      }
    },
    serving: {
      portion_size: 'small',
      is_shareable: true,
      recommended_pairing: ['fino sherry', 'cava', 'red wine']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: true,
      is_keto_friendly: true,
      is_high_protein: true,
      allergens: [],
      calories_estimate: 200,
      protein_g: 28,
      carbs_g: 0,
      fat_g: 10,
      fiber_g: 0
    },
    preparation: {
      prep_time_min: 10,
      cook_time_min: 0,
      difficulty: 'medium'
    },
    pricing: {
      cost_level: 'premium',
      suggested_price_usd: 28
    },
    tags: ['spanish', 'ham', 'premium', 'cured', 'iberico'],
    popularity: 88
  },
  {
    id: 'pulpo-gallego',
    slug: 'pulpo-gallego',
    name: {
      en: 'Galician Octopus',
      it: 'Polpo alla Galiziana',
      vi: 'Bạch tuộc kiểu Galicia'
    },
    description: {
      en: 'Tender octopus with paprika, olive oil and sea salt on potato slices',
      it: 'Polpo tenero con paprika, olio d\'oliva e sale marino su fette di patata',
      vi: 'Bạch tuộc mềm với ớt paprika, dầu ô liu và muối biển trên lát khoai tây'
    },
    style: 'spanish',
    status: 'classic',
    category: 'mare',
    serving_temp: 'warm',
    ingredient_ids: ['ING_SEAFOOD_OCTOPUS', 'ING_VEGETABLE_POTATO', 'ING_SPICE_PAPRIKA', 'ING_OIL_OLIVE', 'ING_SPICE_SALT_SEA'],
    is_fried: false,
    is_baked: false,
    is_raw: false,
    spice_level: 1,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Galicia'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['albarino', 'white wine', 'beer']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['mollusks'],
      calories_estimate: 220,
      protein_g: 26,
      carbs_g: 15,
      fat_g: 8,
      fiber_g: 1
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 60,
      difficulty: 'medium'
    },
    tags: ['spanish', 'tapas', 'seafood', 'octopus', 'galician'],
    popularity: 82
  },
  {
    id: 'manchego-membrillo',
    slug: 'manchego-membrillo',
    name: {
      en: 'Manchego with Quince',
      it: 'Manchego con Cotognata',
      vi: 'Phô mai Manchego với mứt mộc qua'
    },
    description: {
      en: 'Aged Manchego cheese served with sweet quince paste',
      it: 'Manchego stagionato servito con dolce cotognata',
      vi: 'Phô mai Manchego ủ lâu năm với mứt mộc qua ngọt'
    },
    style: 'spanish',
    status: 'classic',
    category: 'formaggi',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_CHEESE_MANCHEGO', 'ING_PRESERVE_QUINCE'],
    is_fried: false,
    is_baked: false,
    is_raw: false,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'La Mancha'
    },
    serving: {
      portion_size: 'small',
      is_shareable: true,
      recommended_pairing: ['red wine', 'sherry', 'tempranillo']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['milk'],
      calories_estimate: 280,
      protein_g: 18,
      carbs_g: 20,
      fat_g: 16,
      fiber_g: 1
    },
    preparation: {
      prep_time_min: 5,
      cook_time_min: 0,
      difficulty: 'easy'
    },
    tags: ['spanish', 'cheese', 'manchego', 'quince', 'simple'],
    popularity: 80
  },
  {
    id: 'boquerones-vinagre',
    slug: 'boquerones-vinagre',
    name: {
      en: 'Marinated Anchovies',
      it: 'Acciughe Marinate',
      vi: 'Ca com ngam giam'
    },
    description: {
      en: 'Fresh white anchovies marinated in vinegar with garlic and parsley',
      it: 'Acciughe bianche fresche marinate in aceto con aglio e prezzemolo',
      vi: 'Ca com trang tuoi ngam trong giam voi toi va rau mui'
    },
    style: 'spanish',
    status: 'classic',
    category: 'mare',
    serving_temp: 'cold',
    ingredient_ids: ['ING_SEAFOOD_ANCHOVIES', 'ING_VINEGAR_GENERIC', 'ING_VEGETABLE_GARLIC', 'ING_HERB_PARSLEY', 'ING_OIL_OLIVE'],
    is_fried: false,
    is_baked: false,
    is_raw: true,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Andalusia'
    },
    serving: {
      portion_size: 'small',
      is_shareable: true,
      recommended_pairing: ['manzanilla sherry', 'white wine', 'beer']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: true,
      is_keto_friendly: true,
      is_high_protein: true,
      allergens: ['fish'],
      calories_estimate: 120,
      protein_g: 16,
      carbs_g: 1,
      fat_g: 6,
      fiber_g: 0
    },
    preparation: {
      prep_time_min: 20,
      cook_time_min: 0,
      difficulty: 'medium'
    },
    tags: ['spanish', 'tapas', 'seafood', 'marinated', 'raw'],
    popularity: 75
  },
  {
    id: 'chorizo-sidra',
    slug: 'chorizo-sidra',
    name: {
      en: 'Chorizo in Cider',
      it: 'Chorizo al Sidro',
      vi: 'Xuc xich Chorizo trong ruou tao'
    },
    description: {
      en: 'Spicy chorizo sausage cooked in Asturian apple cider',
      it: 'Salsiccia chorizo piccante cotta nel sidro di mele asturiano',
      vi: 'Xuc xich chorizo cay nau trong ruou tao Asturias'
    },
    style: 'spanish',
    status: 'classic',
    category: 'tapas',
    serving_temp: 'hot',
    ingredient_ids: ['ING_PROTEIN_CHORIZO', 'ING_BEVERAGE_APPLE_CIDER'],
    is_fried: false,
    is_baked: false,
    is_raw: false,
    spice_level: 2,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Asturias'
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 6,
      is_shareable: true,
      recommended_pairing: ['cider', 'red wine', 'beer']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: true,
      is_keto_friendly: true,
      is_high_protein: true,
      allergens: [],
      calories_estimate: 340,
      protein_g: 18,
      carbs_g: 4,
      fat_g: 28,
      fiber_g: 0
    },
    preparation: {
      prep_time_min: 5,
      cook_time_min: 15,
      difficulty: 'easy'
    },
    tags: ['spanish', 'tapas', 'chorizo', 'cider', 'asturian'],
    popularity: 78
  },
  {
    id: 'albondigas-salsa',
    slug: 'albondigas-salsa',
    name: {
      en: 'Meatballs in Tomato Sauce',
      it: 'Polpette in Salsa di Pomodoro',
      vi: 'Thit vien sot ca chua'
    },
    description: {
      en: 'Tender pork and beef meatballs in rich tomato and wine sauce',
      it: 'Tenere polpette di maiale e manzo in ricca salsa di pomodoro e vino',
      vi: 'Thit vien heo va bo mem trong sot ca chua va ruou vang dam da'
    },
    style: 'spanish',
    status: 'classic',
    category: 'tapas',
    serving_temp: 'hot',
    ingredient_ids: ['ING_PROTEIN_PORK', 'ING_PROTEIN_BEEF', 'ING_SAUCE_TOMATO', 'ING_WINE_GENERIC', 'ING_VEGETABLE_ONION', 'ING_VEGETABLE_GARLIC'],
    sauce_or_dip: 'tomato wine sauce',
    is_fried: true,
    is_baked: false,
    is_raw: false,
    spice_level: 1,
    origin: {
      country: 'Spain',
      country_code: 'ES'
    },
    serving: {
      portion_size: 'medium',
      pieces_per_serving: 5,
      is_shareable: true,
      recommended_pairing: ['red wine', 'rioja', 'bread']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten'],
      calories_estimate: 380,
      protein_g: 24,
      carbs_g: 18,
      fat_g: 24,
      fiber_g: 2
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 40,
      difficulty: 'medium'
    },
    tags: ['spanish', 'tapas', 'meatballs', 'tomato', 'hearty'],
    popularity: 82
  },
  {
    id: 'escalivada',
    slug: 'escalivada',
    name: {
      en: 'Escalivada',
      it: 'Escalivada',
      vi: 'Rau nuong Catalan'
    },
    description: {
      en: 'Catalan roasted vegetables - eggplant, peppers, onions with olive oil',
      it: 'Verdure arrosto catalane - melanzane, peperoni, cipolle con olio d\'oliva',
      vi: 'Rau nuong Catalan - ca tim, ot, hanh tay voi dau o liu'
    },
    style: 'spanish',
    status: 'traditional',
    category: 'verdure',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_VEGETABLE_EGGPLANT', 'ING_SPICE_PEPPER_RED', 'ING_VEGETABLE_ONION', 'ING_OIL_OLIVE', 'ING_VEGETABLE_GARLIC'],
    is_fried: false,
    is_baked: true,
    is_raw: false,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Catalonia'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['white wine', 'cava', 'crusty bread']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: true,
      is_keto_friendly: true,
      is_high_protein: false,
      allergens: [],
      calories_estimate: 120,
      protein_g: 2,
      carbs_g: 12,
      fat_g: 8,
      fiber_g: 4
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 45,
      difficulty: 'easy'
    },
    tags: ['spanish', 'catalan', 'vegan', 'roasted', 'vegetables'],
    popularity: 72
  },
  {
    id: 'pan-tumaca',
    slug: 'pan-tumaca',
    name: {
      en: 'Pan con Tomate',
      it: 'Pane con Pomodoro',
      vi: 'Banh mi ca chua'
    },
    description: {
      en: 'Toasted bread rubbed with ripe tomato, garlic and olive oil',
      it: 'Pane tostato strofinato con pomodoro maturo, aglio e olio d\'oliva',
      vi: 'Banh mi nuong xoa voi ca chua chin, toi va dau o liu'
    },
    style: 'spanish',
    status: 'classic',
    category: 'bruschetta',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_BREAD_GENERIC', 'ING_VEGETABLE_TOMATO', 'ING_VEGETABLE_GARLIC', 'ING_OIL_OLIVE', 'ING_SPICE_SALT'],
    is_fried: false,
    is_baked: true,
    is_raw: false,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Catalonia'
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 2,
      is_shareable: true,
      recommended_pairing: ['cava', 'wine', 'iberian ham']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten'],
      calories_estimate: 180,
      protein_g: 4,
      carbs_g: 28,
      fat_g: 7,
      fiber_g: 2
    },
    preparation: {
      prep_time_min: 5,
      cook_time_min: 5,
      difficulty: 'easy'
    },
    tags: ['spanish', 'catalan', 'bread', 'tomato', 'simple', 'vegan'],
    popularity: 85
  },
  {
    id: 'empanadas-gallega',
    slug: 'empanadas-gallega',
    name: {
      en: 'Galician Empanada',
      it: 'Empanada Galiziana',
      vi: 'Banh xep Galicia'
    },
    description: {
      en: 'Large savory pie with tuna, peppers and onions in crispy pastry',
      it: 'Grande torta salata con tonno, peperoni e cipolle in pasta croccante',
      vi: 'Banh nuong lon voi ca ngu, ot chuong va hanh tay trong vo gion'
    },
    style: 'spanish',
    status: 'traditional',
    category: 'tapas',
    serving_temp: 'warm',
    ingredient_ids: ['ING_SEAFOOD_TUNA', 'ING_VEGETABLE_PEPPER', 'ING_VEGETABLE_ONION', 'ING_VEGETABLE_TOMATO', 'ING_PASTRY_GENERIC'],
    is_fried: false,
    is_baked: true,
    is_raw: false,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Galicia'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['albarino', 'white wine', 'beer']
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'fish', 'egg'],
      calories_estimate: 320,
      protein_g: 18,
      carbs_g: 32,
      fat_g: 14,
      fiber_g: 2
    },
    preparation: {
      prep_time_min: 45,
      cook_time_min: 35,
      difficulty: 'medium'
    },
    tags: ['spanish', 'galician', 'tuna', 'pastry', 'baked'],
    popularity: 70
  },
  {
    id: 'gazpacho-andaluz',
    slug: 'gazpacho-andaluz',
    name: {
      en: 'Andalusian Gazpacho',
      it: 'Gazpacho Andaluso',
      vi: 'Sup lanh Gazpacho'
    },
    description: {
      en: 'Chilled tomato soup with cucumber, peppers, garlic and olive oil',
      it: 'Zuppa fredda di pomodoro con cetriolo, peperoni, aglio e olio d\'oliva',
      vi: 'Sup ca chua lanh voi dua chuot, ot chuong, toi va dau o liu'
    },
    style: 'spanish',
    status: 'classic',
    category: 'dips',
    serving_temp: 'cold',
    ingredient_ids: ['ING_VEGETABLE_TOMATO', 'ING_VEGETABLE_CUCUMBER', 'ING_SPICE_PEPPER_BLACK', 'ING_VEGETABLE_GARLIC', 'ING_OIL_OLIVE', 'ING_BREAD_GENERIC', 'ING_VINEGAR_GENERIC'],
    is_fried: false,
    is_baked: false,
    is_raw: true,
    spice_level: 0,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Andalusia'
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['white wine', 'fino sherry']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten'],
      calories_estimate: 90,
      protein_g: 2,
      carbs_g: 12,
      fat_g: 4,
      fiber_g: 2
    },
    preparation: {
      prep_time_min: 20,
      cook_time_min: 0,
      difficulty: 'easy'
    },
    tags: ['spanish', 'andalusian', 'cold', 'soup', 'summer', 'vegan'],
    popularity: 78
  }
];

export default spanishAppetizers;
