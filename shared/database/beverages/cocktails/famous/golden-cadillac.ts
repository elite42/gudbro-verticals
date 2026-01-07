/**
 * Famous Cocktails: Golden Cadillac
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const goldenCadillac: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  slug: 'golden-cadillac',
  stable_key: 'golden_cadillac_galliano_cacao_cream',

  name: {
    en: 'Golden Cadillac',
    it: 'Golden Cadillac',
    vi: 'Golden Cadillac',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'vintage', 'chocolate'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A luxurious, golden-hued dessert cocktail combining Galliano, white crème de cacao, and cream. This vintage classic from the 1950s delivers a unique blend of herbal vanilla notes from Galliano with sweet chocolate cream.',
    it: "Un lussuoso cocktail da dessert dal colore dorato che combina Galliano, crème de cacao bianca e panna. Questo classico vintage degli anni '50 offre un'unica miscela di note erbacee alla vaniglia dal Galliano con crema dolce al cioccolato.",
    vi: 'Một loại cocktail tráng miệng sang trọng, màu vàng kết hợp Galliano, crème de cacao trắng và kem. Tác phẩm cổ điển vintage từ những năm 1950 này mang đến sự pha trộn độc đáo của hương vị thảo mộc vani từ Galliano với kem chocolate ngọt.',
  },

  history: {
    created_year: '1952',
    origin: {
      city: 'El Dorado',
      bar: "Poor Red's BBQ",
      country: 'USA',
    },
    creator: {
      name: 'Frank Klein',
      profession: 'bartender',
    },
    story: {
      en: "The Golden Cadillac was created in 1952 by bartender Frank Klein at Poor Red's BBQ in El Dorado, California. According to legend, a couple came into the bar after purchasing a new Cadillac and asked Klein to create a drink to celebrate. Klein mixed Galliano, white crème de cacao, and cream, creating a golden cocktail that matched the color of luxury Cadillacs of that era. The drink became a sensation in the 1950s-60s during the golden age of creamy cocktails.",
      it: "Il Golden Cadillac fu creato nel 1952 dal barman Frank Klein al Poor Red's BBQ a El Dorado, California. Secondo la leggenda, una coppia entrò nel bar dopo aver acquistato una nuova Cadillac e chiese a Klein di creare una bevanda per celebrare. Klein mescolò Galliano, crème de cacao bianca e panna, creando un cocktail dorato che corrispondeva al colore delle Cadillac di lusso di quell'epoca. La bevanda divenne una sensazione negli anni '50-'60 durante l'età d'oro dei cocktail cremosi.",
      vi: "Golden Cadillac được tạo ra vào năm 1952 bởi bartender Frank Klein tại Poor Red's BBQ ở El Dorado, California. Theo truyền thuyết, một cặp đôi vào quầy bar sau khi mua một chiếc Cadillac mới và yêu cầu Klein tạo ra một thức uống để ăn mừng. Klein đã pha trộn Galliano, crème de cacao trắng và kem, tạo ra một cocktail vàng phù hợp với màu sắc của Cadillac sang trọng thời đó. Thức uống đã trở thành cơn sốt vào những năm 1950-60 trong thời kỳ hoàng kim của cocktail béo ngậy.",
    },
    named_after: {
      en: 'Named after the luxury Cadillac automobile, referencing both the golden color and the luxurious, premium nature of the drink.',
      it: "Prende il nome dall'automobile di lusso Cadillac, riferendosi sia al colore dorato che alla natura lussuosa e premium della bevanda.",
      vi: 'Được đặt tên theo xe hơi Cadillac sang trọng, ám chỉ cả màu vàng và bản chất sang trọng, cao cấp của thức uống.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'herbal', 'vanilla'],
    description: {
      en: 'Sweet and creamy with distinctive herbal-vanilla notes from Galliano balanced by white chocolate sweetness. Smooth and indulgent with a unique flavor profile that sets it apart from other creamy cocktails.',
      it: 'Dolce e cremoso con note distintive erbacee-vaniglia dal Galliano bilanciate dalla dolcezza del cioccolato bianco. Liscio e indulgente con un profilo aromatico unico che lo distingue dagli altri cocktail cremosi.',
      vi: 'Ngọt và béo ngậy với hương thảo mộc-vani đặc trưng từ Galliano cân bằng bởi vị ngọt chocolate trắng. Mượt mà và nuông chiều với hồ sơ hương vị độc đáo khiến nó khác biệt với các cocktail béo ngậy khác.',
    },
    first_impression: {
      en: 'Creamy vanilla sweetness with immediate herbal complexity from Galliano',
      it: 'Dolcezza cremosa alla vaniglia con immediata complessità erbacea dal Galliano',
      vi: 'Vị ngọt vani béo ngậy với sự phức tạp thảo mộc ngay lập tức từ Galliano',
    },
    finish: {
      en: 'Smooth, lingering vanilla and anise notes with creamy texture',
      it: 'Note lisce e persistenti di vaniglia e anice con consistenza cremosa',
      vi: 'Hương vani và hồi mượt mà, kéo dài với kết cấu béo ngậy',
    },
    balance: {
      en: 'Well-balanced between herbal complexity and creamy sweetness - more interesting than simple chocolate cream drinks',
      it: 'Ben bilanciato tra complessità erbacea e dolcezza cremosa - più interessante dei semplici drink alla crema di cioccolato',
      vi: 'Cân bằng tốt giữa sự phức tạp thảo mộc và vị ngọt béo ngậy - thú vị hơn các đồ uống kem chocolate đơn giản',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'retro_party', 'celebration', 'nightcap'],
    seasons: ['autumn', 'winter', 'all_year'],
    food_pairings: {
      en: 'Pairs beautifully with vanilla desserts, panna cotta, white chocolate mousse, or tiramisu. Also complements almond biscotti and shortbread cookies.',
      it: 'Si abbina magnificamente con dessert alla vaniglia, panna cotta, mousse al cioccolato bianco o tiramisù. Completa anche biscotti alle mandorle e shortbread.',
      vi: 'Kết hợp đẹp với các món tráng miệng vani, panna cotta, mousse chocolate trắng hoặc tiramisu. Cũng bổ sung cho bánh biscotti hạnh nhân và bánh shortbread.',
    },
    ideal_for: {
      en: "Perfect for those who enjoy vintage cocktails and appreciate Galliano's unique flavor. Ideal for retro-themed events and anyone seeking a sophisticated dessert drink with historical charm. Great for Cadillac owners!",
      it: 'Perfetto per chi ama i cocktail vintage e apprezza il sapore unico del Galliano. Ideale per eventi a tema retrò e chiunque cerchi una bevanda da dessert sofisticata con fascino storico. Ottimo per i proprietari di Cadillac!',
      vi: 'Hoàn hảo cho những ai thích cocktail vintage và đánh giá cao hương vị độc đáo của Galliano. Lý tưởng cho các sự kiện theo chủ đề retro và bất kỳ ai tìm kiếm thức uống tráng miệng tinh tế với nét quyến rũ lịch sử. Tuyệt vời cho chủ sở hữu Cadillac!',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GALLIANO',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Galliano', it: 'Galliano', vi: 'Galliano' },
    },
    {
      ingredient_id: 'ING_CREME_DE_CACAO_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'White crème de cacao',
        it: 'Crème de cacao bianca',
        vi: 'Crème de cacao trắng',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Heavy cream', it: 'Panna', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 10-15 seconds until well-chilled and frothy. Strain into a chilled coupe or champagne saucer. The drink should have a beautiful golden hue.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 10-15 secondi fino a quando è ben freddo e schiumoso. Filtrare in una coppa o piattino da champagne raffreddato. La bevanda dovrebbe avere una bellissima tonalità dorata.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 10-15 giây cho đến khi lạnh và có bọt. Lọc vào ly coupe hoặc đĩa champagne đã làm lạnh. Thức uống sẽ có màu vàng đẹp.',
  },

  glass: 'Coupe (or Champagne saucer)',

  garnish: {
    en: 'None (golden color is the visual appeal)',
    it: "Nessuna (il colore dorato è l'appeal visivo)",
    vi: 'Không (màu vàng là sức hấp dẫn thị giác)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GALLIANO'],

  flavor_profile: ['creamy', 'sweet', 'herbal', 'vanilla'],

  abv_estimate: 15,

  calories_estimate: 260,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'alcohol'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter', 'all_year'],
  occasion_tags: ['digestivo', 'celebration', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['golden-dream', 'yellow-cadillac', 'pink-cadillac'],

  notes_for_staff:
    'Classic 1950s cocktail. Galliano is essential for authentic flavor - do not substitute. Some modern recipes add orange juice, but original is just the three ingredients. Can be served frozen for a more dessert-like experience. The golden color should be prominent.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1313/golden-cadillac',
    notes: 'Classic 1950s dessert cocktail from California.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
