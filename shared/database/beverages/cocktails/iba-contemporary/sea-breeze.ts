/**
 * IBA Contemporary Classics: Sea Breeze
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const seaBreeze: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
  slug: 'sea-breeze',
  stable_key: 'sea_breeze_iba_contemporary_classic',

  name: {
    en: 'Sea Breeze',
    it: 'Sea Breeze',
    vi: 'Sea Breeze',
    ko: '씨 브리즈',
    ja: 'シーブリーズ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'refreshing', 'fruity', 'summer', 'beach'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A refreshing vodka-based cocktail combining cranberry and grapefruit juices. Light, fruity, and perfectly balanced, it's the ideal beach-side companion with its beautiful pink hue.",
    it: 'Un cocktail rinfrescante a base di vodka che combina succhi di mirtillo rosso e pompelmo. Leggero, fruttato e perfettamente bilanciato, è il compagno ideale in spiaggia con la sua bellissima tonalità rosa.',
    vi: 'Một cocktail sảng khoái dựa trên vodka kết hợp nước nam việt quất và bưởi. Nhẹ nhàng, trái cây và cân bằng hoàn hảo, nó là người bạn đồng hành lý tưởng bên bãi biển với sắc hồng tuyệt đẹp.',
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Sea Breeze evolved from earlier gin-based recipes in the 1920s-30s. The modern vodka version with cranberry and grapefruit juice became popular in the 1970s, particularly during the cranberry juice marketing boom by Ocean Spray.',
      it: "Il Sea Breeze si è evoluto da precedenti ricette a base di gin negli anni '20-'30. La versione moderna con vodka, succo di mirtillo rosso e pompelmo divenne popolare negli anni '70, in particolare durante il boom del marketing del succo di mirtillo rosso da parte di Ocean Spray.",
      vi: 'Sea Breeze phát triển từ các công thức dựa trên gin trước đó vào những năm 1920-30. Phiên bản vodka hiện đại với nước nam việt quất và bưởi trở nên phổ biến vào những năm 1970, đặc biệt trong thời kỳ bùng nổ tiếp thị nước nam việt quất của Ocean Spray.',
    },
    named_after: {
      en: 'Named for its refreshing, ocean-breeze quality - perfect for seaside enjoyment.',
      it: 'Prende il nome dalla sua qualità rinfrescante, come una brezza oceanica - perfetto per il relax al mare.',
      vi: 'Được đặt tên theo chất lượng sảng khoái như gió biển - hoàn hảo để thưởng thức bên bờ biển.',
    },
  },

  taste: {
    profile: ['fruity', 'tart', 'refreshing'],
    description: {
      en: 'Bright and refreshing with a perfect balance of sweet and tart. Cranberry provides tartness while grapefruit adds citrusy bitterness. Vodka keeps it clean and crisp.',
      it: 'Brillante e rinfrescante con un perfetto equilibrio tra dolce e aspro. Il mirtillo rosso fornisce acidità mentre il pompelmo aggiunge amarezza agrumata. La vodka lo mantiene pulito e croccante.',
      vi: 'Sáng và sảng khoái với sự cân bằng hoàn hảo giữa ngọt và chua. Nam việt quất cung cấp vị chua trong khi bưởi thêm vị đắng cam quýt. Vodka giữ nó sạch và giòn.',
    },
    first_impression: {
      en: 'Tart cranberry and citrus grapefruit with clean vodka',
      it: 'Mirtillo rosso aspro e pompelmo agrumato con vodka pulita',
      vi: 'Nam việt quất chua và bưởi cam quýt với vodka sạch',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering fruit notes',
      it: 'Finale pulito e rinfrescante con note di frutta persistenti',
      vi: 'Kết thúc sạch, sảng khoái với hương trái cây kéo dài',
    },
    balance: {
      en: 'Well-balanced between tart cranberry and bitter grapefruit',
      it: 'Ben bilanciato tra mirtillo rosso aspro e pompelmo amaro',
      vi: 'Cân bằng tốt giữa nam việt quất chua và bưởi đắng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'summer_gathering', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with seafood, grilled fish, summer salads, and light appetizers. Also pairs well with beach snacks and barbecue.',
      it: 'Perfetto con frutti di mare, pesce alla griglia, insalate estive e antipasti leggeri. Si abbina bene anche con snack da spiaggia e barbecue.',
      vi: 'Hoàn hảo với hải sản, cá nướng, salad mùa hè và món khai vị nhẹ. Cũng kết hợp tốt với đồ ăn vặt bãi biển và thịt nướng.',
    },
    ideal_for: {
      en: 'Ideal for anyone seeking a light, refreshing cocktail. Perfect for beach days, poolside relaxation, or any summer occasion.',
      it: 'Ideale per chi cerca un cocktail leggero e rinfrescante. Perfetto per giornate in spiaggia, relax a bordo piscina o qualsiasi occasione estiva.',
      vi: 'Lý tưởng cho bất kỳ ai tìm kiếm cocktail nhẹ, sảng khoái. Hoàn hảo cho những ngày biển, thư giãn bên bể bơi hoặc bất kỳ dịp hè nào.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: {
        en: 'Cranberry juice',
        it: 'Succo di mirtillo rosso',
        vi: 'Nước nam việt quất',
      },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Grapefruit juice', it: 'Succo di pompelmo', vi: 'Nước bưởi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Build all ingredients in a highball glass filled with ice. Stir gently. Garnish with a lime wedge.',
    it: 'Costruire tutti gli ingredienti in un bicchiere highball pieno di ghiaccio. Mescolare delicatamente. Guarnire con uno spicchio di lime.',
    vi: 'Xây dựng tất cả nguyên liệu trong ly highball đầy đá. Khuấy nhẹ. Trang trí bằng miếng chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Miếng chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['fruity', 'tart', 'refreshing'],

  abv_estimate: 8,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 45,

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
  occasion_tags: ['beach', 'pool_party', 'summer_gathering', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bay-breeze', 'cape-codder', 'madras'],

  notes_for_staff:
    'Use fresh-squeezed grapefruit juice when possible. The Bay Breeze variation uses pineapple instead of grapefruit. Build in glass - no shaking needed.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/sea-breeze/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
