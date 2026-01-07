/**
 * Famous Cocktails: Maid in Cuba
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const maidInCuba: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  slug: 'maid-in-cuba',
  stable_key: 'e9d8c7b6a5940382817069584736251faecdbf02',

  name: {
    en: 'Maid in Cuba',
    it: 'Maid in Cuba',
    vi: 'Maid in Cuba',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'refreshing', 'minty', 'tropical'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshing hybrid of a Mojito and a Whiskey Smash, the Maid in Cuba combines aged rum with fresh mint, lime, and cucumber. This modern classic bridges Cuban cocktail tradition with contemporary craft bartending.',
    it: 'Un ibrido rinfrescante tra un Mojito e un Whiskey Smash, il Maid in Cuba combina rum invecchiato con menta fresca, lime e cetriolo. Questo classico moderno unisce la tradizione cubana dei cocktail con la mixology contemporanea.',
    vi: 'Sự kết hợp sảng khoái của Mojito và Whiskey Smash, Maid in Cuba kết hợp rum già với bạc hà tươi, chanh và dưa chuột. Cocktail cổ điển hiện đại này kết nối truyền thống cocktail Cuba với nghệ thuật pha chế đương đại.',
  },

  history: {
    created_year: '2008',
    origin: {
      city: 'New York City',
      bar: 'Pegu Club',
      country: 'USA',
    },
    creator: {
      name: 'Audrey Saunders',
      profession: 'bartender',
    },
    story: {
      en: 'Created by legendary bartender Audrey Saunders at Pegu Club in 2008, the Maid in Cuba was inspired by a request for a "better Mojito." Saunders elevated the classic Cuban cocktail by using aged rum instead of white rum and adding muddled cucumber for extra refreshment. The name cleverly references both the "Maid" drinks family and Cuban rum tradition.',
      it: 'Creato dalla leggendaria bartender Audrey Saunders al Pegu Club nel 2008, il Maid in Cuba fu ispirato da una richiesta per un "Mojito migliore." Saunders ha elevato il classico cocktail cubano usando rum invecchiato invece di rum bianco e aggiungendo cetriolo pestato per un rinfresco extra. Il nome fa riferimento abilmente sia alla famiglia dei drink "Maid" che alla tradizione del rum cubano.',
      vi: 'Được tạo ra bởi bartender huyền thoại Audrey Saunders tại Pegu Club năm 2008, Maid in Cuba được lấy cảm hứng từ yêu cầu về "Mojito tốt hơn." Saunders nâng tầm cocktail Cuba cổ điển bằng cách dùng rum già thay vì rum trắng và thêm dưa chuột giã để tăng độ sảng khoái. Tên gọi khéo léo ám chỉ cả họ đồ uống "Maid" và truyền thống rum Cuba.',
    },
    named_after: {
      en: 'A play on words combining "Maid" (as in Whiskey Smash variations) with "Made in Cuba," referencing the Cuban rum tradition.',
      it: 'Un gioco di parole che combina "Maid" (come nelle variazioni del Whiskey Smash) con "Made in Cuba," facendo riferimento alla tradizione del rum cubano.',
      vi: 'Chơi chữ kết hợp "Maid" (như trong các biến thể Whiskey Smash) với "Made in Cuba," ám chỉ truyền thống rum Cuba.',
    },
  },

  taste: {
    profile: ['refreshing', 'minty', 'citrus'],
    description: {
      en: 'Refreshing and herbaceous with a sophisticated rum backbone. The aged rum provides depth and richness, while fresh mint and cucumber create cooling, garden-fresh flavors. Lime adds bright acidity, and a touch of simple syrup balances it all.',
      it: 'Rinfrescante ed erbaceo con una struttura sofisticata di rum. Il rum invecchiato fornisce profondità e ricchezza, mentre menta fresca e cetriolo creano sapori freschi e rinfrescanti. Il lime aggiunge acidità brillante e un tocco di sciroppo semplice bilancia il tutto.',
      vi: 'Sảng khoái và thảo mộc với xương sống rum tinh tế. Rum già mang đến chiều sâu và phong phú, trong khi bạc hà tươi và dưa chuột tạo hương vị mát lạnh, tươi mát. Chanh thêm độ chua sáng, và một chút xi-rô đường cân bằng tất cả.',
    },
    first_impression: {
      en: 'Cool cucumber and mint hit first, followed by warm aged rum and citrus brightness',
      it: 'Cetriolo fresco e menta colpiscono per primi, seguiti da rum invecchiato caldo e luminosità agrumata',
      vi: 'Dưa chuột mát và bạc hà đập vào đầu tiên, tiếp theo là rum già ấm áp và độ sáng cam chanh',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering mint and subtle rum warmth',
      it: 'Finale pulito e rinfrescante con menta persistente e calore sottile del rum',
      vi: 'Kết thúc sạch, sảng khoái với bạc hà kéo dài và hơi ấm tinh tế của rum',
    },
    balance: {
      en: 'Perfectly balanced between refreshing herbs and spirit depth, neither too sweet nor too strong',
      it: 'Perfettamente bilanciato tra erbe rinfrescanti e profondità dello spirito, né troppo dolce né troppo forte',
      vi: 'Cân bằng hoàn hảo giữa thảo mộc sảng khoái và chiều sâu rượu mạnh, không quá ngọt cũng không quá mạnh',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['summer_party', 'brunch', 'poolside', 'casual_gathering'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Cuban sandwiches, ceviche, grilled fish, fresh salads, and light seafood dishes. The refreshing character complements tropical and Latin cuisine.',
      it: 'Perfetto con sandwich cubani, ceviche, pesce alla griglia, insalate fresche e piatti di pesce leggeri. Il carattere rinfrescante complementa la cucina tropicale e latina.',
      vi: 'Hoàn hảo với bánh sandwich Cuba, ceviche, cá nướng, salad tươi và món hải sản nhẹ. Đặc tính sảng khoái bổ sung cho ẩm thực nhiệt đới và Latin.',
    },
    ideal_for: {
      en: 'Perfect for those who love Mojitos but want something more sophisticated. Ideal for rum enthusiasts and anyone seeking a refreshing, herb-forward cocktail.',
      it: 'Perfetto per chi ama i Mojito ma vuole qualcosa di più sofisticato. Ideale per gli appassionati di rum e chiunque cerchi un cocktail rinfrescante ed erbaceo.',
      vi: 'Hoàn hảo cho những ai yêu Mojito nhưng muốn thứ gì đó tinh tế hơn. Lý tưởng cho người đam mê rum và ai tìm kiếm cocktail sảng khoái, hướng thảo mộc.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_AGED',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Aged rum', it: 'Rum invecchiato', vi: 'Rum già' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Simple syrup',
        it: 'Sciroppo semplice',
        vi: 'Xi-rô đường',
      },
    },
    {
      ingredient_id: 'ING_MINT_LEAVES',
      quantity: { amount: 8, unit: 'leaves' },
      display_name: {
        en: 'Fresh mint leaves',
        it: 'Foglie di menta fresca',
        vi: 'Lá bạc hà tươi',
      },
    },
    {
      ingredient_id: 'ING_CUCUMBER',
      quantity: { amount: 3, unit: 'slices' },
      display_name: {
        en: 'Cucumber slices',
        it: 'Fette di cetriolo',
        vi: 'Lát dưa chuột',
      },
    },
  ],

  method: 'muddle_shake',

  instructions: {
    en: 'In a shaker, gently muddle mint leaves and cucumber slices. Add rum, lime juice, simple syrup, and ice. Shake well until chilled. Double strain into a rocks glass filled with fresh ice. Garnish with a cucumber ribbon and mint sprig.',
    it: 'In uno shaker, pestare delicatamente le foglie di menta e le fette di cetriolo. Aggiungere rum, succo di lime, sciroppo semplice e ghiaccio. Shakerare bene fino a raffreddare. Filtrare due volte in un bicchiere rocks pieno di ghiaccio fresco. Guarnire con un nastro di cetriolo e un rametto di menta.',
    vi: 'Trong bình lắc, nhẹ nhàng giã lá bạc hà và lát dưa chuột. Thêm rum, nước chanh, xi-rô đường và đá. Lắc kỹ cho đến khi lạnh. Lọc kép vào ly rocks đầy đá tươi. Trang trí với dải dưa chuột và cành bạc hà.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Cucumber ribbon and fresh mint sprig',
    it: 'Nastro di cetriolo e rametto di menta fresca',
    vi: 'Dải dưa chuột và cành bạc hà tươi',
  },

  ice: 'cubes',

  serving_style: 'on_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_AGED'],

  flavor_profile: ['refreshing', 'minty', 'citrus'],

  abv_estimate: 14,

  calories_estimate: 165,

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
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['summer_party', 'brunch', 'poolside', 'casual_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['mojito', 'whiskey-smash'],

  notes_for_staff:
    'Muddle gently to avoid bitterness from mint. Use quality aged rum for best results. Double strain to remove mint and cucumber fragments. Can garnish with edible flowers for special occasions.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 78,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://peguclub.com',
    notes: 'Created by Audrey Saunders at Pegu Club, 2008. Modern classic cocktail.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
