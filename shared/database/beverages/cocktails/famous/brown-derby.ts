/**
 * Famous Cocktails: Brown Derby
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const brownDerby: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
  slug: 'brown-derby',
  stable_key: '5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a11',

  name: {
    en: 'Brown Derby',
    it: 'Brown Derby',
    vi: 'Brown Derby',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'bourbon', 'citrus', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A simple yet sophisticated bourbon cocktail featuring grapefruit juice and honey syrup. The Brown Derby is a refreshing, citrus-forward drink with a touch of sweetness that became a Hollywood favorite.',
    it: 'Un cocktail semplice ma sofisticato a base di bourbon con succo di pompelmo e sciroppo di miele. Il Brown Derby è una bevanda rinfrescante e agrumata con un tocco di dolcezza che divenne un favorito di Hollywood.',
    vi: 'Một loại cocktail bourbon đơn giản nhưng tinh tế với nước bưởi và xi-rô mật ong. Brown Derby là thức uống sảng khoái, hướng cam chanh với chút ngọt ngào trở thành yêu thích của Hollywood.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Los Angeles',
      bar: 'Brown Derby Restaurant',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "Created at the legendary Brown Derby Restaurant in Los Angeles during the 1930s, this cocktail became a favorite among Hollywood celebrities. The Brown Derby was one of the most famous restaurants of the Golden Age of Hollywood, frequented by stars like Clark Gable and Greta Garbo. The cocktail's simple recipe of bourbon, grapefruit, and honey created a refreshing drink that matched the California lifestyle. After falling into obscurity, it was rediscovered during the modern cocktail renaissance.",
      it: "Creato al leggendario Brown Derby Restaurant di Los Angeles durante gli anni '30, questo cocktail divenne un favorito tra le celebrità di Hollywood. Il Brown Derby era uno dei ristoranti più famosi dell'età d'oro di Hollywood, frequentato da stelle come Clark Gable e Greta Garbo. La ricetta semplice del cocktail di bourbon, pompelmo e miele creò una bevanda rinfrescante che si adattava allo stile di vita californiano. Dopo essere caduto nell'oblio, fu riscoperto durante il rinascimento moderno dei cocktail.",
      vi: 'Được tạo ra tại Nhà hàng Brown Derby huyền thoại ở Los Angeles trong những năm 1930, cocktail này trở thành yêu thích của các ngôi sao Hollywood. Brown Derby là một trong những nhà hàng nổi tiếng nhất của Thời kỳ Hoàng kim Hollywood, được các ngôi sao như Clark Gable và Greta Garbo lui tới. Công thức đơn giản của cocktail với bourbon, bưởi và mật ong tạo ra thức uống sảng khoái phù hợp với lối sống California. Sau khi rơi vào quên lãng, nó được tái khám phá trong thời kỳ phục흥 cocktail hiện đại.',
    },
    named_after: {
      en: 'Named after the Brown Derby Restaurant, a Hollywood landmark famous for its distinctive hat-shaped building.',
      it: 'Chiamato così dal Brown Derby Restaurant, un punto di riferimento di Hollywood famoso per il suo edificio distintivo a forma di cappello.',
      vi: 'Được đặt tên theo Nhà hàng Brown Derby, một địa danh Hollywood nổi tiếng với tòa nhà hình chiếc mũ đặc biệt.',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'refreshing'],
    description: {
      en: 'Bright and refreshing with balanced sweetness. Bourbon provides a warm, oaky backbone, fresh grapefruit juice adds tart citrus notes, and honey syrup brings natural sweetness and smooth texture. The combination is deceptively simple but perfectly balanced.',
      it: 'Luminoso e rinfrescante con dolcezza bilanciata. Il bourbon fornisce una struttura calda e legnosa, il succo di pompelmo fresco aggiunge note agrumate aspre e lo sciroppo di miele porta dolcezza naturale e consistenza liscia. La combinazione è ingannevolmente semplice ma perfettamente bilanciata.',
      vi: 'Sáng và sảng khoái với vị ngọt cân bằng. Bourbon mang đến xương sống ấm áp, gỗ sồi, nước bưởi tươi thêm hương cam chanh chua, và xi-rô mật ong mang vị ngọt tự nhiên và kết cấu mượt mà. Sự kết hợp đơn giản một cách lừa dối nhưng cân bằng hoàn hảo.',
    },
    first_impression: {
      en: 'Tart grapefruit and honey sweetness hit first, followed by warming bourbon',
      it: 'Pompelmo aspro e dolcezza del miele colpiscono per primi, seguiti da bourbon caldo',
      vi: 'Bưởi chua và vị ngọt mật ong đập vào đầu tiên, tiếp theo là bourbon ấm áp',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus and subtle honey notes',
      it: 'Finale pulito e rinfrescante con agrumi persistenti e note sottili di miele',
      vi: 'Kết thúc sạch, sảng khoái với cam chanh kéo dài và hương mật ong tinh tế',
    },
    balance: {
      en: 'Perfectly balanced between tart grapefruit and sweet honey, with bourbon providing depth',
      it: 'Perfettamente bilanciato tra pompelmo aspro e miele dolce, con il bourbon che fornisce profondità',
      vi: 'Cân bằng hoàn hảo giữa bưởi chua và mật ong ngọt, với bourbon mang đến chiều sâu',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['brunch', 'poolside', 'summer_party', 'casual_gathering'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with brunch dishes, grilled chicken, citrus salads, and light seafood. The bright citrus complements fresh, summery flavors.',
      it: 'Eccellente con piatti da brunch, pollo alla griglia, insalate agli agrumi e pesce leggero. Gli agrumi luminosi complementano sapori freschi ed estivi.',
      vi: 'Tuyệt vời với món brunch, gà nướng, salad cam chanh và hải sản nhẹ. Cam chanh sáng bổ sung cho hương vị tươi mát, mùa hè.',
    },
    ideal_for: {
      en: 'Perfect for bourbon lovers seeking a lighter, more refreshing serve. Ideal for those who enjoy citrus-forward cocktails with natural sweetness.',
      it: 'Perfetto per gli amanti del bourbon che cercano una bevanda più leggera e rinfrescante. Ideale per chi ama cocktail agrumati con dolcezza naturale.',
      vi: 'Hoàn hảo cho người yêu bourbon tìm kiếm phục vụ nhẹ hơn, sảng khoái hơn. Lý tưởng cho những ai thích cocktail hướng cam chanh với vị ngọt tự nhiên.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Bourbon', it: 'Bourbon', vi: 'Bourbon' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Fresh grapefruit juice',
        it: 'Succo di pompelmo fresco',
        vi: 'Nước bưởi tươi',
      },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Honey syrup (1:1)',
        it: 'Sciroppo di miele (1:1)',
        vi: 'Xi-rô mật ong (1:1)',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe glass. Garnish with a grapefruit twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata. Guarnire con una twist di pompelmo.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe đã làm lạnh. Trang trí với vỏ bưởi xoắn.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Grapefruit twist',
    it: 'Twist di pompelmo',
    vi: 'Vỏ bưởi xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['citrus', 'sweet', 'refreshing'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'poolside', 'summer_party', 'casual_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['whiskey-sour', 'gold-rush'],

  notes_for_staff:
    'Use fresh grapefruit juice for best results. Honey syrup should be 1:1 ratio (honey:hot water). Shake hard to properly emulsify the honey. Can serve on rocks for a longer drink.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 76,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'Brown Derby Restaurant, Los Angeles, 1930s',
    notes: 'Classic Hollywood cocktail. Rediscovered during modern cocktail renaissance.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
