/**
 * Famous Cocktails: Cable Car
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const cableCar: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
  slug: 'cable-car',
  stable_key: '4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a12',

  name: {
    en: 'Cable Car',
    it: 'Cable Car',
    vi: 'Cable Car',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'rum', 'citrus', 'sweet'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A San Francisco classic featuring spiced rum, orange curaçao, lemon juice, and a cinnamon-sugar rim. The Cable Car is a sophisticated variation on the Sidecar with warming spice notes.',
    it: "Un classico di San Francisco con rum speziato, curaçao all'arancia, succo di limone e un bordo di zucchero e cannella. Il Cable Car è una variazione sofisticata del Sidecar con note speziate calde.",
    vi: 'Một loại cocktail cổ điển San Francisco với rum gia vị, curaçao cam, nước chanh và viền đường quế. Cable Car là biến thể tinh tế của Sidecar với hương gia vị ấm áp.',
  },

  history: {
    created_year: '1996',
    origin: {
      city: 'San Francisco',
      bar: 'The Starlight Room',
      country: 'USA',
    },
    creator: {
      name: 'Tony Abou-Ganim',
      profession: 'bartender',
    },
    story: {
      en: "Created by legendary bartender Tony Abou-Ganim in 1996 at The Starlight Room atop the Sir Francis Drake Hotel in San Francisco. Abou-Ganim designed the Cable Car as a tribute to San Francisco's iconic cable car system. He elevated the classic Sidecar by substituting spiced rum for cognac and adding a cinnamon-sugar rim, creating a cocktail that captures the spirit of the city. The drink became immensely popular and is now considered a modern classic, especially in San Francisco.",
      it: "Creato dal leggendario barman Tony Abou-Ganim nel 1996 allo Starlight Room in cima al Sir Francis Drake Hotel di San Francisco. Abou-Ganim ha progettato il Cable Car come tributo all'iconico sistema di cable car di San Francisco. Ha elevato il classico Sidecar sostituendo il cognac con rum speziato e aggiungendo un bordo di zucchero e cannella, creando un cocktail che cattura lo spirito della città. La bevanda è diventata immensamente popolare ed è ora considerata un classico moderno, specialmente a San Francisco.",
      vi: 'Được tạo ra bởi bartender huyền thoại Tony Abou-Ganim năm 1996 tại The Starlight Room trên đỉnh khách sạn Sir Francis Drake ở San Francisco. Abou-Ganim thiết kế Cable Car như một lời tri ân đến hệ thống xe cáp biểu tượng của San Francisco. Ông nâng tầm Sidecar cổ điển bằng cách thay cognac bằng rum gia vị và thêm viền đường quế, tạo ra cocktail nắm bắt tinh thần của thành phố. Đồ uống trở nên cực kỳ phổ biến và hiện được coi là cocktail cổ điển hiện đại, đặc biệt ở San Francisco.',
    },
    named_after: {
      en: "Named after San Francisco's iconic cable car system, a symbol of the city since 1873.",
      it: 'Chiamato così dal sistema iconico di cable car di San Francisco, simbolo della città dal 1873.',
      vi: 'Được đặt tên theo hệ thống xe cáp biểu tượng của San Francisco, biểu tượng của thành phố từ năm 1873.',
    },
  },

  taste: {
    profile: ['citrus', 'spicy', 'sweet'],
    description: {
      en: 'Bright and citrusy with warming spice notes. Spiced rum provides a rich backbone with vanilla and cinnamon, orange curaçao adds sweet orange flavor, lemon juice brings tartness, and the cinnamon-sugar rim enhances the spice character throughout.',
      it: "Luminoso e agrumato con note speziate calde. Il rum speziato fornisce una struttura ricca con vaniglia e cannella, il curaçao all'arancia aggiunge sapore dolce d'arancia, il succo di limone porta acidità e il bordo di zucchero e cannella esalta il carattere speziato per tutta la bevanda.",
      vi: 'Sáng và cam chanh với hương gia vị ấm áp. Rum gia vị mang đến xương sống phong phú với vani và quế, curaçao cam thêm hương cam ngọt, nước chanh mang vị chua, và viền đường quế tăng cường đặc tính gia vị xuyên suốt.',
    },
    first_impression: {
      en: 'Sweet cinnamon-sugar rim hits first, followed by citrus and spiced rum warmth',
      it: 'Il bordo dolce di zucchero e cannella colpisce per primo, seguito da agrumi e calore del rum speziato',
      vi: 'Viền đường quế ngọt đập vào đầu tiên, tiếp theo là cam chanh và hơi ấm rum gia vị',
    },
    finish: {
      en: 'Long, warming finish with lingering spice and citrus notes',
      it: 'Finale lungo e caldo con note persistenti di spezie e agrumi',
      vi: 'Kết thúc dài, ấm áp với gia vị và cam chanh kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet, tart, and spicy, with the cinnamon-sugar rim adding extra dimension',
      it: 'Ben bilanciato tra dolce, aspro e piccante, con il bordo di zucchero e cannella che aggiunge dimensione extra',
      vi: 'Cân bằng tốt giữa ngọt, chua và cay, với viền đường quế thêm chiều hướng bổ sung',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['cocktail_hour', 'date_night', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with spiced desserts, apple pie, crème brûlée, and roasted nuts. The spice notes complement warm, sweet flavors.',
      it: 'Eccellente con dessert speziati, torta di mele, crème brûlée e noci tostate. Le note speziate complementano sapori caldi e dolci.',
      vi: 'Tuyệt vời với tráng miệng gia vị, bánh táo, crème brûlée và hạt rang. Hương gia vị bổ sung cho hương vị ấm áp, ngọt ngào.',
    },
    ideal_for: {
      en: 'Perfect for rum lovers who enjoy citrus cocktails with a spicy twist. Ideal for those visiting or reminiscing about San Francisco.',
      it: 'Perfetto per gli amanti del rum che apprezzano cocktail agrumati con un tocco speziato. Ideale per chi visita o ricorda San Francisco.',
      vi: 'Hoàn hảo cho người yêu rum thích cocktail cam chanh với chút cay. Lý tưởng cho những ai đến thăm hoặc nhớ về San Francisco.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SPICED_RUM',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Spiced rum', it: 'Rum speziato', vi: 'Rum gia vị' },
    },
    {
      ingredient_id: 'ING_CURACAO_ORANGE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Orange curaçao',
        it: "Curaçao all'arancia",
        vi: 'Curaçao cam',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: {
        en: 'Simple syrup',
        it: 'Sciroppo semplice',
        vi: 'Xi-rô đường',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Rim a chilled coupe glass with cinnamon-sugar. Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into the prepared glass. Garnish with an orange twist.',
    it: "Bordare una coppa raffreddata con zucchero e cannella. Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare nel bicchiere preparato. Guarnire con una twist d'arancia.",
    vi: 'Viền ly coupe đã làm lạnh với đường quế. Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly đã chuẩn bị. Trang trí với vỏ cam xoắn.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Cinnamon-sugar rim and orange twist',
    it: "Bordo di zucchero e cannella e twist d'arancia",
    vi: 'Viền đường quế và vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SPICED_RUM'],

  flavor_profile: ['citrus', 'spicy', 'sweet'],

  abv_estimate: 20,

  calories_estimate: 185,

  difficulty: 'medium',

  prep_time_seconds: 120,

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
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['cocktail_hour', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['sidecar', 'margarita'],

  notes_for_staff:
    "Rim glass with cinnamon-sugar (mix cinnamon and sugar 1:4 ratio). Use quality spiced rum for best results. The cinnamon-sugar rim is essential to the drink's character - don't skip it!",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 77,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'Created by Tony Abou-Ganim at The Starlight Room, 1996',
    notes:
      'Modern classic and San Francisco signature cocktail. Featured in The Modern Mixologist.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
