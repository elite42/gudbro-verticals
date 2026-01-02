/**
 * GUDBRO Desserts Database - International Collection
 * American, Asian, Middle Eastern, and other desserts
 */

import { Dessert } from '../types';

export const internationalDesserts: Dessert[] = [
  // === AMERICAN CLASSICS ===
  {
    id: 'new-york-cheesecake',
    slug: 'new-york-cheesecake',
    name: {
      en: 'New York Cheesecake',
      it: 'Cheesecake di New York',
      vi: 'Banh pho mai New York'
    },
    description: {
      en: 'Dense, creamy cheesecake with graham cracker crust, a New York classic',
      it: 'Cheesecake densa e cremosa con base di biscotti graham, un classico di New York',
      vi: 'Banh pho mai dac va beo voi de banh graham, mon co dien New York'
    },
    style: 'american',
    status: 'classic',
    category: 'cake',
    serving_temp: 'cold',
    ingredient_ids: ['ING_DAIRY_CREAM_CHEESE', 'ING_EGG_WHOLE', 'ING_SWEETENER_SUGAR', 'ING_DAIRY_SOUR_CREAM', 'ING_BAKING_GRAHAM_CRACKERS'],
    topping: 'fruit compote',
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'United States',
      country_code: 'US',
      city: 'New York'
    },
    serving: {
      portion_size: 'large',
      is_shareable: true,
      recommended_pairing: ['coffee', 'berry sauce', 'whipped cream']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'egg', 'milk'],
      calories_estimate: 450,
      protein_g: 8,
      carbs_g: 38,
      fat_g: 32,
      fiber_g: 0,
      sugar_g: 28
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 60,
      difficulty: 'medium'
    },
    tags: ['american', 'cheesecake', 'new-york', 'creamy', 'classic'],
    popularity: 94
  },
  {
    id: 'apple-pie',
    slug: 'apple-pie',
    name: {
      en: 'Apple Pie',
      it: 'Torta di Mele Americana',
      vi: 'Banh tao kieu My'
    },
    description: {
      en: 'Classic American double-crust apple pie with cinnamon and nutmeg',
      it: 'Classica torta americana di mele a doppia crosta con cannella e noce moscata',
      vi: 'Banh tao My co dien voi vo kep, que va nhuc dau khau'
    },
    style: 'american',
    status: 'classic',
    category: 'pie',
    serving_temp: 'warm',
    ingredient_ids: ['ING_FRUIT_APPLE', 'ING_PASTRY_PIE_CRUST', 'ING_SWEETENER_SUGAR', 'ING_SPICE_CINNAMON', 'ING_DAIRY_BUTTER'],
    topping: 'vanilla ice cream',
    is_chocolate: false,
    is_fruit_based: true,
    is_creamy: false,
    sweetness_level: 4,
    origin: {
      country: 'United States',
      country_code: 'US'
    },
    history: {
      story: {
        en: 'As American as apple pie - this dessert became a symbol of American prosperity',
        it: 'Americano come la torta di mele - questo dolce e diventato simbolo di prosperita americana',
        vi: 'My nhu banh tao - mon trang mieng nay tro thanh bieu tuong cua su thinh vuong My'
      }
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['vanilla ice cream', 'cheddar cheese', 'whipped cream']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'milk'],
      calories_estimate: 380,
      protein_g: 4,
      carbs_g: 58,
      fat_g: 16,
      fiber_g: 4,
      sugar_g: 32
    },
    preparation: {
      prep_time_min: 45,
      cook_time_min: 55,
      difficulty: 'medium'
    },
    tags: ['american', 'apple', 'pie', 'classic', 'comfort'],
    popularity: 92
  },
  {
    id: 'brownie',
    slug: 'brownie',
    name: {
      en: 'Fudgy Brownie',
      it: 'Brownie al Cioccolato',
      vi: 'Banh brownie socola'
    },
    description: {
      en: 'Rich, fudgy chocolate brownie with walnuts, American classic',
      it: 'Ricco brownie al cioccolato con noci, classico americano',
      vi: 'Banh brownie socola dam da voi hat oc cho, mon My co dien'
    },
    style: 'american',
    status: 'classic',
    category: 'chocolate',
    serving_temp: 'warm',
    ingredient_ids: ['ING_CHOCOLATE_GENERIC', 'ING_DAIRY_BUTTER', 'ING_EGG_WHOLE', 'ING_SWEETENER_SUGAR', 'ING_GRAIN_FLOUR', 'ING_NUT_WALNUT'],
    topping: 'vanilla ice cream',
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: false,
    sweetness_level: 5,
    origin: {
      country: 'United States',
      country_code: 'US',
      city: 'Chicago'
    },
    history: {
      story: {
        en: 'Invented in Chicago in 1893 at the Palmer House Hotel for the World Columbian Exposition',
        it: 'Inventato a Chicago nel 1893 al Palmer House Hotel per l Esposizione Colombiana',
        vi: 'Duoc phat minh o Chicago nam 1893 tai khach san Palmer House cho Trien lam Columbus'
      },
      year_created: 1893
    },
    serving: {
      portion_size: 'medium',
      is_shareable: false,
      recommended_pairing: ['milk', 'vanilla ice cream', 'coffee']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'egg', 'milk', 'tree nuts'],
      calories_estimate: 380,
      protein_g: 5,
      carbs_g: 42,
      fat_g: 22,
      fiber_g: 3,
      sugar_g: 32
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 30,
      difficulty: 'easy'
    },
    tags: ['american', 'chocolate', 'fudgy', 'walnuts', 'classic'],
    popularity: 96
  },

  // === ASIAN DESSERTS ===
  {
    id: 'mochi-ice-cream',
    slug: 'mochi-ice-cream',
    name: {
      en: 'Mochi Ice Cream',
      it: 'Mochi Gelato',
      vi: 'Kem banh deo Mochi'
    },
    description: {
      en: 'Japanese rice cake wrapped around ice cream, various flavors',
      it: 'Torta di riso giapponese avvolta intorno al gelato, vari gusti',
      vi: 'Banh deo Nhat boc kem, nhieu huong vi'
    },
    style: 'asian',
    status: 'modern',
    category: 'frozen',
    serving_temp: 'frozen',
    ingredient_ids: ['ING_GRAIN_RICE_MOCHI', 'ING_ICE_CREAM_GENERIC', 'ING_GRAIN_CORNSTARCH'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Japan',
      country_code: 'JP'
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 2,
      is_shareable: true,
      recommended_pairing: ['green tea', 'sake']
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
      allergens: ['milk'],
      calories_estimate: 160,
      protein_g: 2,
      carbs_g: 24,
      fat_g: 6,
      fiber_g: 0,
      sugar_g: 16
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 10,
      difficulty: 'medium'
    },
    tags: ['japanese', 'mochi', 'ice-cream', 'bite-sized', 'fun'],
    popularity: 88
  },
  {
    id: 'matcha-cheesecake',
    slug: 'matcha-cheesecake',
    name: {
      en: 'Matcha Cheesecake',
      it: 'Cheesecake al Matcha',
      vi: 'Banh pho mai tra xanh'
    },
    description: {
      en: 'Light Japanese-style cheesecake with earthy matcha green tea flavor',
      it: 'Leggera cheesecake in stile giapponese con gusto terroso di matcha',
      vi: 'Banh pho mai kieu Nhat nhe voi huong vi tra xanh matcha'
    },
    style: 'asian',
    status: 'modern',
    category: 'cake',
    serving_temp: 'cold',
    ingredient_ids: ['ING_DAIRY_CREAM_CHEESE', 'ING_TEA_MATCHA', 'ING_EGG_WHOLE', 'ING_SWEETENER_SUGAR'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 2,
    origin: {
      country: 'Japan',
      country_code: 'JP'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['green tea', 'black coffee', 'whipped cream']
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
      is_high_protein: true,
      allergens: ['egg', 'milk'],
      calories_estimate: 320,
      protein_g: 8,
      carbs_g: 26,
      fat_g: 22,
      fiber_g: 1,
      sugar_g: 18
    },
    preparation: {
      prep_time_min: 25,
      cook_time_min: 50,
      difficulty: 'medium'
    },
    tags: ['japanese', 'matcha', 'cheesecake', 'light', 'green-tea'],
    popularity: 85
  },
  {
    id: 'che-ba-mau',
    slug: 'che-ba-mau',
    name: {
      en: 'Vietnamese Three Color Dessert',
      it: 'Dolce Vietnamita Tre Colori',
      vi: 'Che ba mau'
    },
    description: {
      en: 'Traditional Vietnamese layered dessert with mung beans, red beans and pandan jelly',
      it: 'Tradizionale dolce vietnamita a strati con fagioli mung, fagioli rossi e gelatina di pandan',
      vi: 'Che truyen thong Viet Nam voi dau xanh, dau do va thach la dua'
    },
    style: 'asian',
    status: 'traditional',
    category: 'other',
    serving_temp: 'cold',
    ingredient_ids: ['ING_LEGUME_MUNG_BEAN', 'ING_LEGUME_RED_BEAN', 'ING_DESSERT_PANDAN_JELLY', 'ING_DAIRY_COCONUT_MILK'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Vietnam',
      country_code: 'VN'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: false,
      recommended_pairing: ['vietnamese iced coffee', 'jasmine tea']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: [],
      calories_estimate: 280,
      protein_g: 8,
      carbs_g: 52,
      fat_g: 6,
      fiber_g: 6,
      sugar_g: 28
    },
    preparation: {
      prep_time_min: 60,
      cook_time_min: 45,
      difficulty: 'medium'
    },
    tags: ['vietnamese', 'colorful', 'beans', 'coconut', 'refreshing'],
    popularity: 82
  },

  // === MIDDLE EASTERN ===
  {
    id: 'baklava',
    slug: 'baklava',
    name: {
      en: 'Baklava',
      it: 'Baklava',
      vi: 'Banh Baklava'
    },
    description: {
      en: 'Sweet phyllo pastry filled with chopped nuts and honey syrup',
      it: 'Dolce pasta fillo ripiena di noci tritate e sciroppo di miele',
      vi: 'Banh phyllo ngot nhan hat rang va xi-ro mat ong'
    },
    style: 'middle_eastern',
    status: 'classic',
    category: 'pastry',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_PASTRY_PHYLLO', 'ING_NUT_PISTACHIO', 'ING_NUT_WALNUT', 'ING_SWEETENER_HONEY', 'ING_DAIRY_BUTTER'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: false,
    sweetness_level: 5,
    origin: {
      country: 'Turkey',
      country_code: 'TR'
    },
    history: {
      story: {
        en: 'Dating back to the Ottoman Empire, baklava is a symbol of celebration across the Middle East',
        it: 'Risalente all Impero Ottomano, il baklava e un simbolo di festa in tutto il Medio Oriente',
        vi: 'Tu thoi De che Ottoman, baklava la bieu tuong cua le hoi khap Trung Dong'
      }
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 2,
      is_shareable: true,
      recommended_pairing: ['turkish coffee', 'tea', 'raki']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'milk', 'tree nuts'],
      calories_estimate: 320,
      protein_g: 5,
      carbs_g: 38,
      fat_g: 18,
      fiber_g: 2,
      sugar_g: 28
    },
    preparation: {
      prep_time_min: 45,
      cook_time_min: 50,
      difficulty: 'hard'
    },
    tags: ['middle-eastern', 'turkish', 'phyllo', 'nuts', 'honey'],
    popularity: 90
  },
  {
    id: 'kunafa',
    slug: 'kunafa',
    name: {
      en: 'Kunafa',
      it: 'Kunafa',
      vi: 'Banh Kunafa'
    },
    description: {
      en: 'Middle Eastern dessert with shredded phyllo, cheese and sweet syrup',
      it: 'Dolce mediorientale con fillo sfilacciato, formaggio e sciroppo dolce',
      vi: 'Banh Trung Dong voi phyllo cat soi, pho mai va xi-ro ngot'
    },
    style: 'middle_eastern',
    status: 'traditional',
    category: 'pastry',
    serving_temp: 'warm',
    ingredient_ids: ['ING_PASTRY_KATAIFI', 'ING_CHEESE_GENERIC', 'ING_SWEETENER_SYRUP_SIMPLE', 'ING_NUT_PISTACHIO'],
    topping: 'crushed pistachios',
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 5,
    origin: {
      country: 'Palestine',
      country_code: 'PS',
      city: 'Nablus'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['arabic coffee', 'tea']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'milk', 'tree nuts'],
      calories_estimate: 420,
      protein_g: 10,
      carbs_g: 52,
      fat_g: 20,
      fiber_g: 1,
      sugar_g: 36
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 40,
      difficulty: 'medium'
    },
    tags: ['middle-eastern', 'palestinian', 'cheese', 'syrup', 'crispy'],
    popularity: 85
  },
  {
    id: 'basque-cheesecake',
    slug: 'basque-cheesecake',
    name: {
      en: 'Basque Burnt Cheesecake',
      it: 'Cheesecake Basca Bruciata',
      vi: 'Banh pho mai chay Basque'
    },
    description: {
      en: 'Crustless cheesecake with caramelized top from San Sebastian',
      it: 'Cheesecake senza crosta con top caramellato da San Sebastian',
      vi: 'Banh pho mai khong vo voi mat caramen tu San Sebastian'
    },
    style: 'spanish',
    status: 'modern',
    category: 'cake',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_DAIRY_CREAM_CHEESE', 'ING_EGG_WHOLE', 'ING_SWEETENER_SUGAR', 'ING_DAIRY_CREAM', 'ING_GRAIN_FLOUR'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Spain',
      country_code: 'ES',
      region: 'Basque Country',
      city: 'San Sebastian'
    },
    history: {
      story: {
        en: 'Created at La Vina restaurant in San Sebastian in the 1990s, now a global sensation',
        it: 'Creato al ristorante La Vina a San Sebastian negli anni 90, ora una sensazione globale',
        vi: 'Duoc tao ra tai nha hang La Vina o San Sebastian vao nhung nam 1990, nay la hien tuong toan cau'
      },
      year_created: 1990
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['txakoli wine', 'sherry', 'espresso']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'egg', 'milk'],
      calories_estimate: 380,
      protein_g: 8,
      carbs_g: 28,
      fat_g: 28,
      fiber_g: 0,
      sugar_g: 22
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 45,
      difficulty: 'easy'
    },
    tags: ['spanish', 'basque', 'cheesecake', 'burnt', 'trendy'],
    popularity: 92
  },

  // === BRITISH ===
  {
    id: 'sticky-toffee-pudding',
    slug: 'sticky-toffee-pudding',
    name: {
      en: 'Sticky Toffee Pudding',
      it: 'Pudding al Toffee',
      vi: 'Banh pudding toffee'
    },
    description: {
      en: 'Moist date sponge cake smothered in toffee sauce, British classic',
      it: 'Morbido pan di spagna ai datteri coperto di salsa toffee, classico britannico',
      vi: 'Banh bong lan choi am uot phu sot toffee, mon Anh co dien'
    },
    style: 'british',
    status: 'classic',
    category: 'pudding',
    serving_temp: 'warm',
    ingredient_ids: ['ING_FRUIT_DATE', 'ING_SWEETENER_SUGAR_BROWN', 'ING_DAIRY_BUTTER', 'ING_EGG_WHOLE', 'ING_GRAIN_FLOUR'],
    topping: 'toffee sauce and vanilla ice cream',
    is_chocolate: false,
    is_fruit_based: true,
    is_creamy: false,
    sweetness_level: 5,
    origin: {
      country: 'United Kingdom',
      country_code: 'GB',
      region: 'Lake District'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: false,
      recommended_pairing: ['custard', 'vanilla ice cream', 'cream']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'egg', 'milk'],
      calories_estimate: 480,
      protein_g: 5,
      carbs_g: 68,
      fat_g: 22,
      fiber_g: 2,
      sugar_g: 52
    },
    preparation: {
      prep_time_min: 25,
      cook_time_min: 40,
      difficulty: 'medium'
    },
    tags: ['british', 'dates', 'toffee', 'comfort', 'warm'],
    popularity: 86
  },

  // === GERMAN ===
  {
    id: 'black-forest-cake',
    slug: 'black-forest-cake',
    name: {
      en: 'Black Forest Cake',
      it: 'Torta Foresta Nera',
      vi: 'Banh Rung Den'
    },
    description: {
      en: 'German chocolate sponge with cherries, whipped cream and kirsch',
      it: 'Pan di spagna al cioccolato tedesco con ciliegie, panna montata e kirsch',
      vi: 'Banh bong lan socola Duc voi cherry, kem tuoi va kirsch'
    },
    style: 'german',
    status: 'classic',
    category: 'cake',
    serving_temp: 'cold',
    ingredient_ids: ['ING_CAKE_CHOCOLATE_SPONGE', 'ING_FRUIT_CHERRY', 'ING_DAIRY_CREAM_WHIPPED', 'ING_SPIRIT_KIRSCH'],
    topping: 'chocolate shavings and cherries',
    is_chocolate: true,
    is_fruit_based: true,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'Germany',
      country_code: 'DE',
      region: 'Black Forest'
    },
    history: {
      story: {
        en: 'Named after the Black Forest region, this cake became internationally famous in the 1930s',
        it: 'Prende il nome dalla regione della Foresta Nera, questa torta e diventata famosa negli anni 30',
        vi: 'Dat theo ten vung Rung Den, banh nay tro nen noi tieng quoc te vao nhung nam 1930'
      },
      year_created: 1915
    },
    serving: {
      portion_size: 'large',
      is_shareable: true,
      recommended_pairing: ['kirsch', 'coffee', 'cherry liqueur']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'egg', 'milk'],
      calories_estimate: 420,
      protein_g: 6,
      carbs_g: 48,
      fat_g: 24,
      fiber_g: 2,
      sugar_g: 36
    },
    preparation: {
      prep_time_min: 60,
      cook_time_min: 35,
      difficulty: 'hard'
    },
    tags: ['german', 'chocolate', 'cherry', 'cream', 'layered'],
    popularity: 88
  }
];

export default internationalDesserts;
