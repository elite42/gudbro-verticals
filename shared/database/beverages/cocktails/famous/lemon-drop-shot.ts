/**
 * Famous Cocktails: Lemon Drop Shot
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const lemonDropShot: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-7890-1234-cd34-ef56gh789012',
  slug: 'lemon-drop-shot',
  stable_key: 'lemon_drop_shot_famous_citrus_sweet',

  name: {
    en: 'Lemon Drop Shot',
    it: 'Lemon Drop Shot',
    vi: 'Lemon Drop Shot',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'citrus', 'vodka', 'sweet', 'sour'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sweet and sour vodka-based shooter with fresh lemon juice and sugar. Named after the popular lemon drop candy, this shot delivers a perfect balance of tartness and sweetness with a sugared rim.',
    it: 'Uno shooter dolce e aspro a base di vodka con succo di limone fresco e zucchero. Prende il nome dalla popolare caramella lemon drop, questo shot offre un perfetto equilibrio tra acidità e dolcezza con un bordo zuccherato.',
    vi: 'Một loại shooter vodka ngọt và chua với nước cốt chanh tươi và đường. Được đặt theo tên của kẹo lemon drop phổ biến, shot này mang đến sự cân bằng hoàn hảo giữa vị chua và ngọt với viền đường.',
  },

  history: {
    created_year: '1970s',
    origin: {
      city: 'San Francisco',
      bar: "Henry Africa's",
      country: 'USA',
    },
    story: {
      en: "The Lemon Drop Shot was created in the 1970s at Henry Africa's bar in San Francisco. It was inspired by the classic lemon drop candy and quickly became a popular choice for those seeking a sweet-tart shooter. The drink perfectly captures the nostalgic flavor of the candy it's named after.",
      it: "Il Lemon Drop Shot è stato creato negli anni '70 al bar Henry Africa's di San Francisco. È stato ispirato dalla classica caramella lemon drop ed è diventato rapidamente una scelta popolare per coloro che cercano uno shooter dolce-aspro. La bevanda cattura perfettamente il sapore nostalgico della caramella da cui prende il nome.",
      vi: "Lemon Drop Shot được tạo ra vào những năm 1970 tại quầy bar Henry Africa's ở San Francisco. Nó được lấy cảm hứng từ kẹo lemon drop cổ điển và nhanh chóng trở thành lựa chọn phổ biến cho những ai tìm kiếm shooter ngọt-chua. Thức uống hoàn hảo nắm bắt hương vị hoài niệm của loại kẹo mà nó được đặt tên theo.",
    },
    named_after: {
      en: 'Named after the lemon drop candy, known for its sweet-tart flavor profile.',
      it: 'Prende il nome dalla caramella lemon drop, nota per il suo profilo di sapore dolce-aspro.',
      vi: 'Được đặt theo tên kẹo lemon drop, nổi tiếng với hương vị ngọt-chua.',
    },
  },

  taste: {
    profile: ['sweet', 'sour', 'citrus'],
    description: {
      en: 'Bright lemon flavor with balanced sweetness. The sugar rim provides instant sweetness, followed by tart lemon and smooth vodka. Refreshing and candy-like.',
      it: 'Sapore di limone brillante con dolcezza bilanciata. Il bordo zuccherato fornisce dolcezza istantanea, seguito da limone aspro e vodka morbida. Rinfrescante e simile a una caramella.',
      vi: 'Hương vị chanh tươi sáng với vị ngọt cân bằng. Viền đường mang lại vị ngọt tức thì, theo sau là chanh chua và vodka mượt. Sảng khoái và giống kẹo.',
    },
    first_impression: {
      en: 'Sweet sugar rim followed by tart lemon burst',
      it: 'Bordo zuccherato dolce seguito da esplosione di limone aspro',
      vi: 'Viền đường ngọt theo sau là vị chanh chua bùng nổ',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering lemon sweetness',
      it: 'Finale pulito e rinfrescante con dolcezza persistente di limone',
      vi: 'Kết thúc trong sạch, sảng khoái với vị ngọt chanh kéo dài',
    },
    balance: {
      en: 'Perfectly balanced sweet and sour, true to the candy inspiration',
      it: "Perfettamente bilanciato dolce e aspro, fedele all'ispirazione della caramella",
      vi: 'Cân bằng hoàn hảo ngọt và chua, trung thành với nguồn cảm hứng kẹo',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'girls_night', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs well with light appetizers, seafood dishes, or lemon-based desserts. Great as a palate cleanser between courses.',
      it: 'Si abbina bene con antipasti leggeri, piatti di pesce o dessert a base di limone. Ottimo come pulitore del palato tra le portate.',
      vi: 'Kết hợp tốt với món khai vị nhẹ, món hải sản hoặc món tráng miệng chanh. Tuyệt vời để làm sạch vị giác giữa các món.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy sweet, citrus-forward shots. A crowd-pleaser that appeals to both casual drinkers and cocktail enthusiasts.',
      it: 'Perfetto per chi ama gli shot dolci e orientati agli agrumi. Un successo che piace sia ai bevitori casuali che agli appassionati di cocktail.',
      vi: 'Hoàn hảo cho những ai thích shot ngọt, hướng cam chanh. Được ưa chuộng thu hút cả người uống bình thường và người đam mê cocktail.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh Lemon Juice',
        it: 'Succo di Limone Fresco',
        vi: 'Nước Cốt Chanh Tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple Syrup', it: 'Sciroppo Semplice', vi: 'Sirô Đơn Giản' },
    },
    {
      ingredient_id: 'ING_SUGAR',
      quantity: { amount: 1, unit: 'teaspoon' },
      display_name: {
        en: 'Sugar (for rim)',
        it: 'Zucchero (per il bordo)',
        vi: 'Đường (cho viền)',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Rim the shot glass with sugar by moistening the rim with lemon juice and dipping in sugar. Add vodka, lemon juice, and simple syrup to a shaker with ice. Shake vigorously until well chilled. Strain into the prepared shot glass.',
    it: 'Bordare il bicchierino da shot con zucchero inumidendo il bordo con succo di limone e immergendo nello zucchero. Aggiungere vodka, succo di limone e sciroppo semplice in uno shaker con ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare nel bicchierino preparato.',
    vi: 'Tạo viền đường cho ly shot bằng cách làm ẩm viền với nước cốt chanh và nhúng vào đường. Thêm vodka, nước cốt chanh và sirô đơn giản vào bình lắc với đá. Lắc mạnh cho đến khi lạnh hoàn toàn. Lọc vào ly shot đã chuẩn bị.',
  },

  glass: 'Shot glass',

  garnish: {
    en: 'Sugar rim and lemon wheel',
    it: 'Bordo zuccherato e fettina di limone',
    vi: 'Viền đường và lát chanh',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['sweet', 'sour', 'citrus'],

  abv_estimate: 25,

  calories_estimate: 110,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['party', 'celebration', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['lemon-drop-martini', 'raspberry-lemon-drop', 'blueberry-lemon-drop'],

  notes_for_staff:
    'Use fresh lemon juice only. Ensure sugar rim is even and not too thick. Can substitute vodka with citrus vodka for extra lemon flavor. Often served with a lemon wedge on the side.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://en.wikipedia.org/wiki/Lemon_drop_(cocktail)',
    notes: 'Classic sweet-sour shooter inspired by lemon drop candy.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
