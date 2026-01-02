/**
 * IBA Contemporary Classics: Grasshopper
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const grasshopper: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f',
  slug: 'grasshopper',
  stable_key: 'grasshopper_iba_contemporary_2025',

  name: {
    en: 'Grasshopper',
    it: 'Grasshopper',
    vi: 'Grasshopper',
    ko: '그래스호퍼',
    ja: 'グラスホッパー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'creamy', 'dessert', 'minty', 'sweet'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A creamy, minty dessert cocktail combining crème de menthe, crème de cacao, and fresh cream. Bright green in color and refreshingly sweet, this drink is like a liquid mint chocolate dessert.',
    it: 'Un cocktail cremoso e mentolato da dessert che combina crème de menthe, crème de cacao e panna fresca. Di colore verde brillante e rinfrescante dolce, questo drink è come un dessert liquido al cioccolato e menta.',
    vi: 'Một loại cocktail tráng miệng béo ngậy, bạc hà kết hợp crème de menthe, crème de cacao và kem tươi. Màu xanh lá cây tươi sáng và ngọt sảng khoái, thức uống này giống như một món tráng miệng chocolate bạc hà lỏng.',
  },

  history: {
    created_year: '1918',
    origin: {
      city: 'New Orleans',
      bar: 'Tujague\'s',
      country: 'USA',
    },
    creator: {
      name: 'Philibert Guichet',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 1918 by Philibert Guichet, owner of Tujague\'s bar in New Orleans\' French Quarter, for a cocktail competition. The drink won second place and gained popularity in the 1950s-60s as after-dinner drinks became fashionable. Its bright green color and sweet, minty flavor made it particularly popular among women in the mid-20th century.',
      it: 'Creato nel 1918 da Philibert Guichet, proprietario del bar Tujague\'s nel French Quarter di New Orleans, per una competizione di cocktail. Il drink vinse il secondo posto e guadagnò popolarità negli anni \'50-\'60 quando i drink dopo cena divennero di moda. Il suo colore verde brillante e il sapore dolce e mentolato lo resero particolarmente popolare tra le donne a metà del XX secolo.',
      vi: 'Được tạo ra vào năm 1918 bởi Philibert Guichet, chủ quán bar Tujague\'s trong French Quarter của New Orleans, cho một cuộc thi cocktail. Thức uống đã giành vị trí thứ hai và trở nên phổ biến vào những năm 1950-60 khi đồ uống sau bữa tối trở nên thời thượng. Màu xanh lá cây tươi sáng và hương vị ngọt, bạc hà khiến nó đặc biệt phổ biến trong số phụ nữ vào giữa thế kỷ 20.',
    },
    named_after: {
      en: 'Named for its bright green color, resembling a grasshopper.',
      it: 'Prende il nome dal suo colore verde brillante, che ricorda una cavalletta.',
      vi: 'Được đặt tên theo màu xanh lá cây tươi sáng của nó, giống như một con châu chấu.',
    },
  },

  taste: {
    profile: ['minty', 'creamy', 'sweet', 'chocolate'],
    description: {
      en: 'Sweet, creamy, and refreshingly minty. Crème de menthe provides cool mint flavor, crème de cacao adds chocolate richness, and cream creates silky texture. A liquid mint chocolate chip ice cream.',
      it: 'Dolce, cremoso e rinfrescante mentolato. La crème de menthe fornisce sapore di menta fresca, la crème de cacao aggiunge ricchezza di cioccolato e la panna crea una consistenza setosa. Un gelato liquido al cioccolato e menta.',
      vi: 'Ngọt, béo ngậy và bạc hà sảng khoái. Crème de menthe cung cấp hương vị bạc hà mát, crème de cacao thêm sự phong phú chocolate và kem tạo kết cấu mượt như lụa. Một kem chocolate bạc hà lỏng.',
    },
    first_impression: {
      en: 'Cool mint with creamy sweetness',
      it: 'Menta fresca con dolcezza cremosa',
      vi: 'Bạc hà mát với vị ngọt béo ngậy',
    },
    finish: {
      en: 'Smooth, sweet finish with lingering mint and chocolate',
      it: 'Finale morbido e dolce con menta e cioccolato persistenti',
      vi: 'Kết thúc mượt mà, ngọt với bạc hà và chocolate kéo dài',
    },
    balance: {
      en: 'Well-balanced between mint and chocolate, unified by cream',
      it: 'Ben bilanciato tra menta e cioccolato, unificato dalla panna',
      vi: 'Cân bằng tốt giữa bạc hà và chocolate, hợp nhất bởi kem',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['dessert', 'after_dinner', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect as a dessert replacement or with chocolate desserts, mint brownies, or ice cream. Best enjoyed on its own as an indulgent after-dinner treat.',
      it: 'Perfetto come sostituto del dessert o con dessert al cioccolato, brownies alla menta o gelato. Meglio gustato da solo come regalo indulgente dopo cena.',
      vi: 'Hoàn hảo như một thay thế món tráng miệng hoặc với các món tráng miệng chocolate, brownie bạc hà hoặc kem. Tốt nhất thưởng thức riêng như một món nuông chiều sau bữa tối.',
    },
    ideal_for: {
      en: 'Perfect for those who love sweet, dessert-style cocktails and mint chocolate flavors. Great for after-dinner drinks. Not for those who prefer dry cocktails.',
      it: 'Perfetto per chi ama cocktail dolci in stile dessert e sapori di cioccolato e menta. Ottimo per drink dopo cena. Non per chi preferisce cocktail secchi.',
      vi: 'Hoàn hảo cho những ai yêu thích cocktail ngọt kiểu tráng miệng và hương vị chocolate bạc hà. Tuyệt vời cho đồ uống sau bữa tối. Không dành cho những người thích cocktail khô.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CREME_DE_MENTHE_GREEN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Crème de menthe (green)', it: 'Crème de menthe (verde)', vi: 'Crème de menthe (xanh)' },
    },
    {
      ingredient_id: 'ING_CREME_DE_CACAO_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Crème de cacao (white)', it: 'Crème de cacao (bianca)', vi: 'Crème de cacao (trắng)' },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh cream', it: 'Panna fresca', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into shaker filled with ice. Shake vigorously. Strain into chilled cocktail glass. No garnish needed.',
    it: 'Versare tutti gli ingredienti nello shaker pieno di ghiaccio. Shakerare vigorosamente. Filtrare in una coppa da cocktail raffreddata. Nessuna guarnizione necessaria.',
    vi: 'Đổ tất cả nguyên liệu vào shaker đầy đá. Lắc mạnh. Lọc vào ly cocktail đã làm lạnh. Không cần trang trí.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'None (optional: mint sprig)',
    it: 'Nessuna (opzionale: rametto di menta)',
    vi: 'Không có (tùy chọn: cành bạc hà)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CREME_DE_MENTHE_GREEN', 'ING_CREME_DE_CACAO_WHITE'],

  flavor_profile: ['minty', 'creamy', 'sweet', 'chocolate'],

  abv_estimate: 15,

  calories_estimate: 260,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['dessert', 'after_dinner', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['frozen-grasshopper', 'flying-grasshopper'],

  notes_for_staff: 'Shake hard to properly emulsify the cream. Use green crème de menthe for authentic color. White crème de cacao keeps the drink bright green. Can be made frozen/blended for a different experience.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/grasshopper/',
    note: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
