/**
 * GUDBRO Desserts Database - French Collection
 * Patisserie francaise classique
 */

import { Dessert } from '../types';

export const frenchDesserts: Dessert[] = [
  {
    id: 'creme-brulee',
    slug: 'creme-brulee',
    name: {
      en: 'Creme Brulee',
      it: 'Creme Brulee',
      vi: 'Kem Creme Brulee'
    },
    description: {
      en: 'Rich vanilla custard with caramelized sugar crust, cracked tableside',
      it: 'Ricca crema alla vaniglia con crosta di zucchero caramellato, rotta al tavolo',
      vi: 'Kem vani dam da voi lop duong caramen, dap tren ban'
    },
    style: 'french',
    status: 'classic',
    category: 'custard',
    serving_temp: 'cold',
    ingredient_ids: ['ING_DAIRY_CREAM', 'ING_EGG_YOLK', 'ING_SWEETENER_SUGAR', 'ING_SPICE_VANILLA'],
    topping: 'caramelized sugar',
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR'
    },
    history: {
      story: {
        en: 'Disputed origins between France, England and Spain, but perfected in French cuisine',
        it: 'Origini contestate tra Francia, Inghilterra e Spagna, ma perfezionata nella cucina francese',
        vi: 'Nguon goc tranh cai giua Phap, Anh va Tay Ban Nha, nhung duoc hoan thien trong am thuc Phap'
      }
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['sauternes', 'champagne', 'espresso']
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
      allergens: ['egg', 'milk'],
      calories_estimate: 380,
      protein_g: 5,
      carbs_g: 32,
      fat_g: 28,
      fiber_g: 0,
      sugar_g: 28
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 45,
      difficulty: 'medium'
    },
    tags: ['french', 'classic', 'custard', 'vanilla', 'elegant'],
    popularity: 95
  },
  {
    id: 'chocolate-mousse',
    slug: 'chocolate-mousse',
    name: {
      en: 'Chocolate Mousse',
      it: 'Mousse al Cioccolato',
      vi: 'Mousse socola'
    },
    description: {
      en: 'Light and airy French chocolate mousse with dark chocolate',
      it: 'Leggera e ariosa mousse francese al cioccolato fondente',
      vi: 'Mousse socola Phap nhe va bong voi socola den'
    },
    style: 'french',
    status: 'classic',
    category: 'mousse',
    serving_temp: 'cold',
    ingredient_ids: ['ING_CHOCOLATE_DARK', 'ING_EGG_WHOLE', 'ING_DAIRY_CREAM', 'ING_SWEETENER_SUGAR'],
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'France',
      country_code: 'FR'
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['port wine', 'espresso', 'whipped cream']
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
      allergens: ['egg', 'milk'],
      calories_estimate: 340,
      protein_g: 6,
      carbs_g: 28,
      fat_g: 24,
      fiber_g: 2,
      sugar_g: 22
    },
    preparation: {
      prep_time_min: 25,
      cook_time_min: 5,
      difficulty: 'medium'
    },
    tags: ['french', 'chocolate', 'mousse', 'elegant', 'airy'],
    popularity: 92
  },
  {
    id: 'tarte-tatin',
    slug: 'tarte-tatin',
    name: {
      en: 'Tarte Tatin',
      it: 'Tarte Tatin',
      vi: 'Banh tao Tarte Tatin'
    },
    description: {
      en: 'Upside-down caramelized apple tart, a French classic',
      it: 'Torta di mele caramellata capovolta, un classico francese',
      vi: 'Banh tart tao caramen lat nguoc, mot mon Phap co dien'
    },
    style: 'french',
    status: 'classic',
    category: 'tart',
    serving_temp: 'warm',
    ingredient_ids: ['ING_FRUIT_APPLE', 'ING_DAIRY_BUTTER', 'ING_SWEETENER_SUGAR', 'ING_PASTRY_PUFF'],
    topping: 'creme fraiche',
    is_chocolate: false,
    is_fruit_based: true,
    is_creamy: false,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR',
      region: 'Centre-Val de Loire',
      city: 'Lamotte-Beuvron'
    },
    history: {
      story: {
        en: 'Created by accident by the Tatin sisters in the 1880s at their hotel',
        it: 'Creata per caso dalle sorelle Tatin negli anni 1880 nel loro hotel',
        vi: 'Duoc tao ra tinh co boi chi em Tatin vao nhung nam 1880 tai khach san cua ho'
      },
      year_created: 1880,
      creator: 'Tatin Sisters'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['calvados', 'vanilla ice cream', 'creme fraiche']
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
      protein_g: 3,
      carbs_g: 52,
      fat_g: 18,
      fiber_g: 3,
      sugar_g: 36
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 45,
      difficulty: 'medium'
    },
    tags: ['french', 'apple', 'caramel', 'tart', 'classic'],
    popularity: 85
  },
  {
    id: 'profiteroles',
    slug: 'profiteroles',
    name: {
      en: 'Profiteroles',
      it: 'Profiteroles',
      vi: 'Banh su kem'
    },
    description: {
      en: 'Choux pastry puffs filled with vanilla ice cream, topped with hot chocolate sauce',
      it: 'Bigne di pasta choux ripieni di gelato alla vaniglia, ricoperti di salsa al cioccolato caldo',
      vi: 'Banh su nhan kem vani, phu sot socola nong'
    },
    style: 'french',
    status: 'classic',
    category: 'pastry',
    serving_temp: 'cold',
    ingredient_ids: ['ING_PASTRY_CHOUX', 'ING_ICE_CREAM_VANILLA', 'ING_SAUCE_CHOCOLATE'],
    topping: 'hot chocolate sauce',
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR'
    },
    serving: {
      portion_size: 'medium',
      pieces_per_serving: 3,
      is_shareable: true,
      recommended_pairing: ['dessert wine', 'champagne']
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
      calories_estimate: 420,
      protein_g: 7,
      carbs_g: 48,
      fat_g: 24,
      fiber_g: 2,
      sugar_g: 32
    },
    preparation: {
      prep_time_min: 40,
      cook_time_min: 30,
      difficulty: 'hard'
    },
    tags: ['french', 'choux', 'ice-cream', 'chocolate', 'elegant'],
    popularity: 88
  },
  {
    id: 'mille-feuille',
    slug: 'mille-feuille',
    name: {
      en: 'Mille-Feuille',
      it: 'Millefoglie',
      vi: 'Banh ngan lop'
    },
    description: {
      en: 'Thousand layer pastry with vanilla pastry cream and fondant icing',
      it: 'Pasta sfoglia a mille strati con crema pasticcera alla vaniglia e glassa fondente',
      vi: 'Banh ngan lop voi kem pastry vani va lop phu fondant'
    },
    style: 'french',
    status: 'classic',
    category: 'pastry',
    serving_temp: 'cold',
    ingredient_ids: ['ING_PASTRY_PUFF', 'ING_CREAM_PASTRY', 'ING_ICING_FONDANT'],
    topping: 'fondant icing',
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR'
    },
    history: {
      story: {
        en: 'Also known as Napoleon, this pastry has been a French classic since the 17th century',
        it: 'Conosciuto anche come Napoleon, questo dolce e un classico francese dal XVII secolo',
        vi: 'Con duoc goi la Napoleon, banh nay la mon co dien Phap tu the ky 17'
      }
    },
    serving: {
      portion_size: 'medium',
      is_shareable: false,
      recommended_pairing: ['champagne', 'tea', 'espresso']
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
      calories_estimate: 420,
      protein_g: 6,
      carbs_g: 52,
      fat_g: 22,
      fiber_g: 1,
      sugar_g: 28
    },
    preparation: {
      prep_time_min: 60,
      cook_time_min: 25,
      difficulty: 'hard'
    },
    tags: ['french', 'pastry', 'layered', 'napoleon', 'elegant'],
    popularity: 82
  },
  {
    id: 'macarons',
    slug: 'macarons',
    name: {
      en: 'French Macarons',
      it: 'Macaron Francesi',
      vi: 'Banh Macaron Phap'
    },
    description: {
      en: 'Delicate almond meringue cookies with ganache filling in various flavors',
      it: 'Delicati biscotti di meringa alle mandorle con ripieno di ganache in vari gusti',
      vi: 'Banh meringue hanh nhan tinh te voi nhan ganache nhieu huong vi'
    },
    style: 'french',
    status: 'classic',
    category: 'cookie',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_NUT_ALMOND_FLOUR', 'ING_EGG_WHITE', 'ING_SWEETENER_SUGAR', 'ING_CHOCOLATE_GANACHE'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR',
      city: 'Paris'
    },
    history: {
      story: {
        en: 'Perfected by Laduree in Paris, macarons became a symbol of French patisserie',
        it: 'Perfezionati da Laduree a Parigi, i macaron sono diventati un simbolo della pasticceria francese',
        vi: 'Duoc hoan thien boi Laduree o Paris, macaron tro thanh bieu tuong cua banh ngot Phap'
      }
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 3,
      is_shareable: true,
      recommended_pairing: ['champagne', 'tea', 'espresso']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['egg', 'tree nuts', 'milk'],
      calories_estimate: 220,
      protein_g: 3,
      carbs_g: 28,
      fat_g: 12,
      fiber_g: 1,
      sugar_g: 24
    },
    preparation: {
      prep_time_min: 60,
      cook_time_min: 15,
      difficulty: 'hard'
    },
    pricing: {
      cost_level: 'high'
    },
    tags: ['french', 'parisian', 'almond', 'colorful', 'elegant'],
    popularity: 94
  },
  {
    id: 'crepes-suzette',
    slug: 'crepes-suzette',
    name: {
      en: 'Crepes Suzette',
      it: 'Crepes Suzette',
      vi: 'Banh crepe Suzette'
    },
    description: {
      en: 'Thin French crepes flambeed with orange liqueur sauce',
      it: 'Sottili crepes francesi fiambeggiate con salsa al liquore d arancia',
      vi: 'Banh crepe Phap mong dot lua voi sot ruou cam'
    },
    style: 'french',
    status: 'classic',
    category: 'crepe',
    serving_temp: 'hot',
    ingredient_ids: ['ING_BAKING_CREPES', 'ING_DAIRY_BUTTER', 'ING_JUICE_ORANGE', 'ING_LIQUEUR_GRAND_MARNIER', 'ING_SWEETENER_SUGAR'],
    is_chocolate: false,
    is_fruit_based: true,
    is_creamy: false,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR',
      city: 'Monte Carlo'
    },
    history: {
      story: {
        en: 'Created accidentally in 1895 by a young waiter for the Prince of Wales',
        it: 'Creata accidentalmente nel 1895 da un giovane cameriere per il Principe di Galles',
        vi: 'Duoc tao ra tinh co nam 1895 boi mot nguoi phuc vu tre cho Hoang tu xu Wales'
      },
      year_created: 1895
    },
    serving: {
      portion_size: 'medium',
      pieces_per_serving: 2,
      is_shareable: true,
      recommended_pairing: ['grand marnier', 'champagne', 'vanilla ice cream']
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
      calories_estimate: 380,
      protein_g: 6,
      carbs_g: 48,
      fat_g: 16,
      fiber_g: 1,
      sugar_g: 32
    },
    preparation: {
      prep_time_min: 20,
      cook_time_min: 15,
      difficulty: 'medium'
    },
    tags: ['french', 'crepes', 'flambe', 'orange', 'spectacular'],
    popularity: 78
  },
  {
    id: 'eclair-chocolat',
    slug: 'eclair-chocolat',
    name: {
      en: 'Chocolate Eclair',
      it: 'Eclair al Cioccolato',
      vi: 'Banh Eclair socola'
    },
    description: {
      en: 'Oblong choux pastry filled with chocolate cream and topped with chocolate glaze',
      it: 'Pasta choux oblunga ripiena di crema al cioccolato e ricoperta di glassa al cioccolato',
      vi: 'Banh su dai nhan kem socola va phu lop men socola'
    },
    style: 'french',
    status: 'classic',
    category: 'pastry',
    serving_temp: 'cold',
    ingredient_ids: ['ING_PASTRY_CHOUX', 'ING_CREAM_PASTRY_CHOCOLATE', 'ING_CHOCOLATE_GLAZE'],
    topping: 'chocolate glaze',
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR',
      city: 'Lyon'
    },
    history: {
      story: {
        en: 'Created in the early 19th century, the name means lightning because it is eaten quickly',
        it: 'Creato all inizio del XIX secolo, il nome significa fulmine perche si mangia velocemente',
        vi: 'Duoc tao ra vao dau the ky 19, ten co nghia la tia chop vi an nhanh'
      },
      year_created: 1850
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['espresso', 'cappuccino', 'tea']
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
      calories_estimate: 320,
      protein_g: 6,
      carbs_g: 38,
      fat_g: 18,
      fiber_g: 2,
      sugar_g: 24
    },
    preparation: {
      prep_time_min: 45,
      cook_time_min: 35,
      difficulty: 'hard'
    },
    tags: ['french', 'choux', 'chocolate', 'patisserie', 'classic'],
    popularity: 90
  },
  {
    id: 'clafoutis',
    slug: 'clafoutis',
    name: {
      en: 'Cherry Clafoutis',
      it: 'Clafoutis alle Ciliegie',
      vi: 'Banh cherry Clafoutis'
    },
    description: {
      en: 'Rustic French baked custard with fresh cherries from Limousin',
      it: 'Rustica torta francese con crema cotta e ciliegie fresche del Limousin',
      vi: 'Banh kem nuong Phap que mua voi cherry tuoi tu Limousin'
    },
    style: 'french',
    status: 'traditional',
    category: 'custard',
    serving_temp: 'warm',
    ingredient_ids: ['ING_FRUIT_CHERRY', 'ING_EGG_WHOLE', 'ING_DAIRY_MILK', 'ING_GRAIN_FLOUR', 'ING_SWEETENER_SUGAR'],
    is_chocolate: false,
    is_fruit_based: true,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'France',
      country_code: 'FR',
      region: 'Limousin'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['kirsch', 'dessert wine', 'cream']
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
      calories_estimate: 280,
      protein_g: 7,
      carbs_g: 38,
      fat_g: 12,
      fiber_g: 2,
      sugar_g: 24
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 40,
      difficulty: 'easy'
    },
    tags: ['french', 'cherry', 'rustic', 'baked', 'seasonal'],
    popularity: 74
  },
  {
    id: 'paris-brest',
    slug: 'paris-brest',
    name: {
      en: 'Paris-Brest',
      it: 'Paris-Brest',
      vi: 'Banh Paris-Brest'
    },
    description: {
      en: 'Ring-shaped choux pastry filled with praline mousseline cream',
      it: 'Pasta choux a forma di anello ripiena di crema mousseline alla pralinata',
      vi: 'Banh su hinh vong nhan kem mousseline praline'
    },
    style: 'french',
    status: 'classic',
    category: 'pastry',
    serving_temp: 'cold',
    ingredient_ids: ['ING_PASTRY_CHOUX', 'ING_NUT_PRALINE_PASTE', 'ING_CREAM_MOUSSELINE', 'ING_NUT_ALMOND'],
    topping: 'sliced almonds and powdered sugar',
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'France',
      country_code: 'FR',
      city: 'Paris'
    },
    history: {
      story: {
        en: 'Created in 1910 to commemorate the Paris-Brest bicycle race, shaped like a wheel',
        it: 'Creato nel 1910 per commemorare la corsa ciclistica Paris-Brest, a forma di ruota',
        vi: 'Duoc tao ra nam 1910 de ky niem cuoc dua xe dap Paris-Brest, hinh banh xe'
      },
      year_created: 1910
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['champagne', 'espresso', 'tea']
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
      calories_estimate: 480,
      protein_g: 8,
      carbs_g: 48,
      fat_g: 30,
      fiber_g: 2,
      sugar_g: 32
    },
    preparation: {
      prep_time_min: 60,
      cook_time_min: 35,
      difficulty: 'hard'
    },
    tags: ['french', 'parisian', 'choux', 'praline', 'iconic'],
    popularity: 82
  }
];

export default frenchDesserts;
