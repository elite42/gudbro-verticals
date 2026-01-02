/**
 * GUDBRO Desserts Database - Italian Collection
 * Classic dolci italiani
 */

import { Dessert } from '../types';

export const italianDesserts: Dessert[] = [
  // === DOLCI AL CUCCHIAIO ===
  {
    id: 'tiramisu',
    slug: 'tiramisu',
    name: {
      en: 'Tiramisu',
      it: 'Tiramisu',
      vi: 'Banh Tiramisu'
    },
    description: {
      en: 'Classic Italian dessert with espresso-soaked ladyfingers, mascarpone cream and cocoa',
      it: 'Classico dolce italiano con savoiardi inzuppati nel caffe, crema al mascarpone e cacao',
      vi: 'Banh ngot Y co dien voi banh ladyfinger ngam ca phe, kem mascarpone va cacao'
    },
    style: 'italian',
    status: 'classic',
    category: 'custard',
    serving_temp: 'cold',
    ingredient_ids: ['ING_BAKING_LADYFINGERS', 'ING_DAIRY_MASCARPONE', 'ING_COFFEE_ESPRESSO', 'ING_EGG_WHOLE', 'ING_CHOCOLATE_COCOA'],
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Veneto',
      city: 'Treviso'
    },
    history: {
      story: {
        en: 'Created in the 1960s in Treviso, tiramisu means "pick me up" referring to the espresso',
        it: 'Creato negli anni 60 a Treviso, tiramisu significa "tirami su" riferendosi al caffe',
        vi: 'Duoc tao ra vao nhung nam 1960 o Treviso, tiramisu co nghia la "nang toi len" de chi ca phe'
      },
      year_created: 1969
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['espresso', 'vin santo', 'amaretto']
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
      protein_g: 8,
      carbs_g: 42,
      fat_g: 26,
      fiber_g: 1,
      sugar_g: 28
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 0,
      difficulty: 'medium'
    },
    tags: ['italian', 'classic', 'coffee', 'mascarpone', 'no-bake'],
    popularity: 98
  },
  {
    id: 'panna-cotta',
    slug: 'panna-cotta',
    name: {
      en: 'Panna Cotta',
      it: 'Panna Cotta',
      vi: 'Banh kem Panna Cotta'
    },
    description: {
      en: 'Silky Piedmontese cream dessert with vanilla, served with berry coulis',
      it: 'Vellutato dolce piemontese alla panna con vaniglia, servito con coulis di frutti di bosco',
      vi: 'Banh kem Piedmont min voi vani, phuc vu voi sot dau'
    },
    style: 'italian',
    status: 'classic',
    category: 'custard',
    serving_temp: 'cold',
    ingredient_ids: ['ING_DAIRY_CREAM', 'ING_SWEETENER_SUGAR', 'ING_SPICE_VANILLA', 'ING_BAKING_GELATIN'],
    topping: 'berry coulis',
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Piedmont'
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['moscato', 'espresso', 'fresh berries']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['milk'],
      calories_estimate: 320,
      protein_g: 4,
      carbs_g: 28,
      fat_g: 22,
      fiber_g: 0,
      sugar_g: 24
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 10,
      difficulty: 'easy'
    },
    tags: ['italian', 'piedmont', 'cream', 'elegant', 'gluten-free'],
    popularity: 92
  },
  {
    id: 'zabaione',
    slug: 'zabaione',
    name: {
      en: 'Zabaione',
      it: 'Zabaione',
      vi: 'Kem trung Zabaione'
    },
    description: {
      en: 'Warm Italian egg custard whipped with Marsala wine',
      it: 'Caldo dolce italiano di uova montate con vino Marsala',
      vi: 'Kem trung Y am nong danh voi ruou Marsala'
    },
    style: 'italian',
    status: 'classic',
    category: 'custard',
    serving_temp: 'warm',
    ingredient_ids: ['ING_EGG_YOLK', 'ING_SWEETENER_SUGAR', 'ING_WINE_MARSALA'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Piedmont'
    },
    history: {
      story: {
        en: 'Dating back to the 16th century, zabaione was believed to have restorative properties',
        it: 'Risalente al XVI secolo, lo zabaione era ritenuto avere proprieta ricostituenti',
        vi: 'Tu the ky 16, zabaione duoc cho la co dac tinh phuc hoi'
      }
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['savoiardi', 'fresh berries', 'marsala']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['egg'],
      calories_estimate: 180,
      protein_g: 4,
      carbs_g: 22,
      fat_g: 8,
      fiber_g: 0,
      sugar_g: 20
    },
    preparation: {
      prep_time_min: 5,
      cook_time_min: 15,
      difficulty: 'medium'
    },
    tags: ['italian', 'classic', 'eggs', 'wine', 'warm'],
    popularity: 72
  },

  // === GELATI E SORBETTI ===
  {
    id: 'gelato-stracciatella',
    slug: 'gelato-stracciatella',
    name: {
      en: 'Stracciatella Gelato',
      it: 'Gelato alla Stracciatella',
      vi: 'Kem Stracciatella'
    },
    description: {
      en: 'Classic Italian gelato with chocolate shavings in vanilla cream base',
      it: 'Classico gelato italiano con scaglie di cioccolato in base di crema alla vaniglia',
      vi: 'Kem Y co dien voi vu socola trong nen kem vani'
    },
    style: 'italian',
    status: 'classic',
    category: 'gelato',
    serving_temp: 'frozen',
    ingredient_ids: ['ING_DAIRY_MILK', 'ING_DAIRY_CREAM', 'ING_SWEETENER_SUGAR', 'ING_CHOCOLATE_GENERIC', 'ING_SPICE_VANILLA'],
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Lombardy',
      city: 'Bergamo'
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['espresso', 'amaretto', 'wafer']
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
      calories_estimate: 240,
      protein_g: 4,
      carbs_g: 28,
      fat_g: 14,
      fiber_g: 1,
      sugar_g: 24
    },
    preparation: {
      prep_time_min: 20,
      cook_time_min: 0,
      difficulty: 'medium'
    },
    tags: ['italian', 'gelato', 'chocolate', 'vanilla', 'classic'],
    popularity: 90
  },
  {
    id: 'gelato-pistachio',
    slug: 'gelato-pistachio',
    name: {
      en: 'Pistachio Gelato',
      it: 'Gelato al Pistacchio',
      vi: 'Kem hat de cuoi'
    },
    description: {
      en: 'Rich Sicilian pistachio gelato made with Bronte pistachios',
      it: 'Ricco gelato siciliano al pistacchio fatto con pistacchi di Bronte',
      vi: 'Kem hat de cuoi Sicily dam da lam tu hat de cuoi Bronte'
    },
    style: 'italian',
    status: 'classic',
    category: 'gelato',
    serving_temp: 'frozen',
    ingredient_ids: ['ING_NUT_PISTACHIO', 'ING_DAIRY_MILK', 'ING_DAIRY_CREAM', 'ING_SWEETENER_SUGAR'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Sicily',
      city: 'Bronte'
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['espresso', 'brioche', 'amaretto']
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
      is_high_protein: true,
      allergens: ['milk', 'tree nuts'],
      calories_estimate: 280,
      protein_g: 7,
      carbs_g: 26,
      fat_g: 18,
      fiber_g: 2,
      sugar_g: 22
    },
    preparation: {
      prep_time_min: 25,
      cook_time_min: 0,
      difficulty: 'hard'
    },
    pricing: {
      cost_level: 'high'
    },
    tags: ['italian', 'sicilian', 'gelato', 'pistachio', 'premium'],
    popularity: 95
  },
  {
    id: 'granita-siciliana',
    slug: 'granita-siciliana',
    name: {
      en: 'Sicilian Granita',
      it: 'Granita Siciliana',
      vi: 'Da bao Sicily'
    },
    description: {
      en: 'Traditional Sicilian shaved ice with almond or lemon, served with brioche',
      it: 'Tradizionale granita siciliana alla mandorla o limone, servita con brioche',
      vi: 'Da bao Sicily truyen thong vi hanh nhan hoac chanh, phuc vu voi banh brioche'
    },
    style: 'italian',
    status: 'traditional',
    category: 'frozen',
    serving_temp: 'frozen',
    ingredient_ids: ['ING_LIQUID_WATER', 'ING_SWEETENER_SUGAR', 'ING_NUT_ALMOND', 'ING_FRUIT_LEMON'],
    is_chocolate: false,
    is_fruit_based: true,
    is_creamy: false,
    sweetness_level: 4,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Sicily'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: false,
      recommended_pairing: ['brioche', 'espresso']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['tree nuts'],
      calories_estimate: 150,
      protein_g: 2,
      carbs_g: 34,
      fat_g: 2,
      fiber_g: 1,
      sugar_g: 30
    },
    preparation: {
      prep_time_min: 15,
      cook_time_min: 0,
      difficulty: 'easy'
    },
    tags: ['italian', 'sicilian', 'frozen', 'refreshing', 'summer'],
    popularity: 80
  },

  // === TORTE E CROSTATE ===
  {
    id: 'torta-caprese',
    slug: 'torta-caprese',
    name: {
      en: 'Torta Caprese',
      it: 'Torta Caprese',
      vi: 'Banh Torta Caprese'
    },
    description: {
      en: 'Flourless chocolate almond cake from Capri, dense and fudgy',
      it: 'Torta al cioccolato e mandorle senza farina da Capri, densa e umida',
      vi: 'Banh socola hanh nhan khong bot tu Capri, dac va mem'
    },
    style: 'italian',
    status: 'traditional',
    category: 'cake',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_CHOCOLATE_DARK', 'ING_NUT_ALMOND', 'ING_DAIRY_BUTTER', 'ING_EGG_WHOLE', 'ING_SWEETENER_SUGAR'],
    topping: 'powdered sugar',
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: false,
    sweetness_level: 4,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Campania',
      city: 'Capri'
    },
    history: {
      story: {
        en: 'Invented by accident in the 1920s when a baker forgot to add flour',
        it: 'Inventata per caso negli anni 20 quando un pasticcere dimentico di aggiungere la farina',
        vi: 'Duoc phat minh tinh co vao nhung nam 1920 khi mot tho lam banh quen them bot'
      },
      year_created: 1920
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['limoncello', 'espresso', 'whipped cream']
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
      is_high_protein: true,
      allergens: ['egg', 'milk', 'tree nuts'],
      calories_estimate: 380,
      protein_g: 8,
      carbs_g: 32,
      fat_g: 26,
      fiber_g: 3,
      sugar_g: 28
    },
    preparation: {
      prep_time_min: 20,
      cook_time_min: 40,
      difficulty: 'easy'
    },
    tags: ['italian', 'capri', 'chocolate', 'almond', 'gluten-free'],
    popularity: 85
  },
  {
    id: 'crostata-frutta',
    slug: 'crostata-frutta',
    name: {
      en: 'Fresh Fruit Tart',
      it: 'Crostata di Frutta Fresca',
      vi: 'Banh tart trai cay tuoi'
    },
    description: {
      en: 'Italian shortcrust tart with pastry cream and seasonal fresh fruits',
      it: 'Crostata italiana di pasta frolla con crema pasticcera e frutta fresca di stagione',
      vi: 'Banh tart Y voi kem pastry va trai cay tuoi theo mua'
    },
    style: 'italian',
    status: 'classic',
    category: 'tart',
    serving_temp: 'cold',
    ingredient_ids: ['ING_PASTRY_SHORTCRUST', 'ING_CREAM_PASTRY', 'ING_FRUIT_SEASONAL'],
    is_chocolate: false,
    is_fruit_based: true,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Italy',
      country_code: 'IT'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['prosecco', 'moscato', 'tea']
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
      protein_g: 5,
      carbs_g: 42,
      fat_g: 15,
      fiber_g: 2,
      sugar_g: 26
    },
    preparation: {
      prep_time_min: 40,
      cook_time_min: 25,
      difficulty: 'medium'
    },
    tags: ['italian', 'tart', 'fruit', 'pastry-cream', 'colorful'],
    popularity: 82
  },

  // === PASTICCERIA ===
  {
    id: 'cannoli-siciliani',
    slug: 'cannoli-siciliani',
    name: {
      en: 'Sicilian Cannoli',
      it: 'Cannoli Siciliani',
      vi: 'Banh Cannoli Sicily'
    },
    description: {
      en: 'Crispy fried pastry tubes filled with sweet ricotta and candied fruits',
      it: 'Cialde fritte croccanti ripiene di ricotta dolce e frutta candita',
      vi: 'Banh ong chien gion nhan ricotta ngot va trai cay kho'
    },
    style: 'italian',
    status: 'classic',
    category: 'pastry',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_PASTRY_SHELL', 'ING_CHEESE_RICOTTA', 'ING_SWEETENER_SUGAR', 'ING_PRESERVE_FRUITS_CANDIED', 'ING_CHOCOLATE_CHIPS'],
    is_chocolate: true,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 4,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Sicily'
    },
    history: {
      story: {
        en: 'Originating during Arab rule in Sicily, cannoli were traditionally made for Carnevale',
        it: 'Originari durante la dominazione araba in Sicilia, i cannoli erano tradizionalmente fatti per Carnevale',
        vi: 'Bat nguon tu thoi ky A Rap o Sicily, cannoli truyen thong duoc lam cho le hoi Carnevale'
      }
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 2,
      is_shareable: false,
      recommended_pairing: ['espresso', 'marsala', 'vin santo']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: false,
      is_halal: true,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'egg', 'milk', 'tree nuts'],
      calories_estimate: 340,
      protein_g: 7,
      carbs_g: 38,
      fat_g: 18,
      fiber_g: 1,
      sugar_g: 24
    },
    preparation: {
      prep_time_min: 60,
      cook_time_min: 15,
      difficulty: 'hard'
    },
    tags: ['italian', 'sicilian', 'fried', 'ricotta', 'iconic'],
    popularity: 94
  },
  {
    id: 'sfogliatella',
    slug: 'sfogliatella',
    name: {
      en: 'Sfogliatella',
      it: 'Sfogliatella',
      vi: 'Banh so Sfogliatella'
    },
    description: {
      en: 'Crispy shell-shaped Neapolitan pastry with ricotta and candied citrus filling',
      it: 'Sfoglia croccante a forma di conchiglia napoletana con ripieno di ricotta e agrumi canditi',
      vi: 'Banh vo so Naples gion voi nhan ricotta va cam quyt kho'
    },
    style: 'italian',
    status: 'traditional',
    category: 'pastry',
    serving_temp: 'warm',
    ingredient_ids: ['ING_PASTRY_PUFF', 'ING_CHEESE_RICOTTA', 'ING_GRAIN_SEMOLINA', 'ING_PRESERVE_CITRUS_CANDIED', 'ING_SPICE_CINNAMON'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Campania',
      city: 'Naples'
    },
    history: {
      story: {
        en: 'Created in 17th century Naples convent, the recipe was later commercialized in 1818',
        it: 'Creata nel XVII secolo in un convento napoletano, la ricetta fu poi commercializzata nel 1818',
        vi: 'Duoc tao ra o tu vien Naples the ky 17, cong thuc sau do duoc thuong mai hoa nam 1818'
      },
      year_created: 1818
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['espresso', 'cappuccino']
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'egg', 'milk'],
      calories_estimate: 280,
      protein_g: 6,
      carbs_g: 32,
      fat_g: 14,
      fiber_g: 1,
      sugar_g: 16
    },
    preparation: {
      prep_time_min: 90,
      cook_time_min: 20,
      difficulty: 'hard'
    },
    tags: ['italian', 'naples', 'pastry', 'ricotta', 'flaky'],
    popularity: 86
  },
  {
    id: 'baba-rum',
    slug: 'baba-rum',
    name: {
      en: 'Baba au Rhum',
      it: 'Baba al Rum',
      vi: 'Banh Baba rum'
    },
    description: {
      en: 'Yeast cake soaked in rum syrup, a Neapolitan favorite',
      it: 'Dolce lievitato inzuppato nello sciroppo al rum, un classico napoletano',
      vi: 'Banh men ngam trong xi-ro rum, mon yeu thich cua Naples'
    },
    style: 'italian',
    status: 'classic',
    category: 'cake',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_GRAIN_FLOUR', 'ING_BAKING_YEAST', 'ING_DAIRY_BUTTER', 'ING_EGG_WHOLE', 'ING_SPIRIT_RUM', 'ING_SWEETENER_SYRUP_SIMPLE'],
    topping: 'whipped cream',
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: false,
    sweetness_level: 5,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Campania',
      city: 'Naples'
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['limoncello', 'espresso']
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
      calories_estimate: 290,
      protein_g: 4,
      carbs_g: 42,
      fat_g: 10,
      fiber_g: 1,
      sugar_g: 32
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 25,
      difficulty: 'medium'
    },
    tags: ['italian', 'naples', 'rum', 'yeast', 'soaked'],
    popularity: 78
  },
  {
    id: 'biscotti-cantuccini',
    slug: 'biscotti-cantuccini',
    name: {
      en: 'Cantuccini',
      it: 'Cantuccini',
      vi: 'Banh quy Cantuccini'
    },
    description: {
      en: 'Traditional Tuscan almond biscotti, twice-baked and perfect for dipping',
      it: 'Tradizionali biscotti toscani alle mandorle, cotti due volte e perfetti da inzuppare',
      vi: 'Banh quy hanh nhan Tuscany truyen thong, nuong hai lan va hoan hao de cham'
    },
    style: 'italian',
    status: 'traditional',
    category: 'cookie',
    serving_temp: 'room_temp',
    ingredient_ids: ['ING_GRAIN_FLOUR', 'ING_NUT_ALMOND', 'ING_EGG_WHOLE', 'ING_SWEETENER_SUGAR', 'ING_DAIRY_BUTTER'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: false,
    sweetness_level: 2,
    origin: {
      country: 'Italy',
      country_code: 'IT',
      region: 'Tuscany',
      city: 'Prato'
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 3,
      is_shareable: true,
      recommended_pairing: ['vin santo', 'espresso', 'cappuccino']
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
      calories_estimate: 140,
      protein_g: 3,
      carbs_g: 18,
      fat_g: 6,
      fiber_g: 1,
      sugar_g: 8
    },
    preparation: {
      prep_time_min: 20,
      cook_time_min: 40,
      difficulty: 'easy'
    },
    tags: ['italian', 'tuscan', 'biscotti', 'almond', 'twice-baked'],
    popularity: 80
  },
  {
    id: 'semifreddo',
    slug: 'semifreddo',
    name: {
      en: 'Semifreddo',
      it: 'Semifreddo',
      vi: 'Kem Semifreddo'
    },
    description: {
      en: 'Italian semi-frozen dessert with whipped cream and meringue, lighter than gelato',
      it: 'Dolce italiano semi-ghiacciato con panna montata e meringa, piu leggero del gelato',
      vi: 'Mon trang mieng Y nua dong voi kem tuoi va banh meringue, nhe hon gelato'
    },
    style: 'italian',
    status: 'classic',
    category: 'frozen',
    serving_temp: 'frozen',
    ingredient_ids: ['ING_DAIRY_CREAM', 'ING_EGG_WHOLE', 'ING_SWEETENER_SUGAR', 'ING_BASE_FLAVOR'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Italy',
      country_code: 'IT'
    },
    serving: {
      portion_size: 'medium',
      is_shareable: true,
      recommended_pairing: ['espresso', 'dessert wine', 'fresh berries']
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
      calories_estimate: 300,
      protein_g: 5,
      carbs_g: 28,
      fat_g: 20,
      fiber_g: 0,
      sugar_g: 24
    },
    preparation: {
      prep_time_min: 30,
      cook_time_min: 0,
      difficulty: 'medium'
    },
    tags: ['italian', 'frozen', 'cream', 'elegant', 'no-churn'],
    popularity: 75
  },
  {
    id: 'affogato',
    slug: 'affogato',
    name: {
      en: 'Affogato',
      it: 'Affogato',
      vi: 'Kem ca phe Affogato'
    },
    description: {
      en: 'Vanilla gelato drowned in a shot of hot espresso',
      it: 'Gelato alla vaniglia annegato in un caffe espresso caldo',
      vi: 'Kem vani cham trong mot shot ca phe espresso nong'
    },
    style: 'italian',
    status: 'classic',
    category: 'gelato',
    serving_temp: 'cold',
    ingredient_ids: ['ING_GELATO_VANILLA', 'ING_COFFEE_ESPRESSO'],
    is_chocolate: false,
    is_fruit_based: false,
    is_creamy: true,
    sweetness_level: 3,
    origin: {
      country: 'Italy',
      country_code: 'IT'
    },
    serving: {
      portion_size: 'small',
      is_shareable: false,
      recommended_pairing: ['biscotti', 'amaretto liqueur']
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
      calories_estimate: 200,
      protein_g: 4,
      carbs_g: 24,
      fat_g: 10,
      fiber_g: 0,
      sugar_g: 20
    },
    preparation: {
      prep_time_min: 2,
      cook_time_min: 0,
      difficulty: 'easy'
    },
    tags: ['italian', 'coffee', 'gelato', 'quick', 'elegant'],
    popularity: 88
  }
];

export default italianDesserts;
