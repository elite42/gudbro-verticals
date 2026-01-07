/**
 * IBA New Era Drinks: Bee's Knees
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const beesKnees: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e',
  slug: 'bees-knees',
  stable_key: 'b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',

  name: {
    en: "Bee's Knees",
    it: "Bee's Knees",
    vi: "Bee's Knees",
    ko: '비즈 니즈',
    ja: 'ビーズニーズ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'gin', 'honey', 'prohibition', 'classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A Prohibition-era classic combining gin with honey and lemon. This simple yet sophisticated cocktail features floral honey sweetness balanced by bright citrus - it\'s truly "the bee\'s knees!"',
    it: 'Un classico dell\'era del Proibizionismo che combina gin con miele e limone. Questo cocktail semplice ma sofisticato presenta una dolcezza floreale di miele bilanciata da agrumi brillanti - è davvero "il massimo!"',
    vi: 'Một cocktail cổ điển thời kỳ Cấm rượu kết hợp gin với mật ong và chanh. Cocktail đơn giản nhưng tinh tế này có vị ngọt mật ong hoa cân bằng với cam quýt tươi mát - thực sự "tuyệt vời!"',
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
      en: 'The Bee\'s Knees emerged during Prohibition in the 1920s. The name comes from a popular slang expression of that era meaning "the best" or "the height of excellence." During Prohibition, honey was often used to mask the harsh flavor of bathtub gin. The cocktail gained renewed popularity during the craft cocktail revival of the 2000s, appreciated for its simple elegance and historical significance.',
      it: "Il Bee's Knees emerse durante il Proibizionismo negli anni '20. Il nome deriva da un'espressione gergale popolare di quell'epoca che significa \"il migliore\" o \"l'apice dell'eccellenza\". Durante il Proibizionismo, il miele veniva spesso usato per mascherare il sapore aspro del gin fatto in casa. Il cocktail ha guadagnato rinnovata popolarità durante il revival dei cocktail artigianali degli anni 2000, apprezzato per la sua eleganza semplice e il significato storico.",
      vi: 'Bee\'s Knees xuất hiện trong thời kỳ Cấm rượu những năm 1920. Cái tên đến từ một cách diễn đạt tiếng lóng phổ biến thời đó có nghĩa là "tốt nhất" hoặc "đỉnh cao của sự xuất sắc". Trong thời kỳ Cấm rượu, mật ong thường được sử dụng để che dấu hương vị khắc nghiệt của gin tự pha. Cocktail đã trở nên phổ biến trở lại trong thời kỳ phục hưng cocktail thủ công những năm 2000, được đánh giá cao vì sự thanh lịch đơn giản và ý nghĩa lịch sử.',
    },
    named_after: {
      en: 'Named after the 1920s slang phrase "the bee\'s knees," meaning something excellent or outstanding.',
      it: 'Prende il nome dalla frase gergale degli anni \'20 "the bee\'s knees," che significa qualcosa di eccellente o eccezionale.',
      vi: 'Được đặt theo cụm từ tiếng lóng những năm 1920 "the bee\'s knees," có nghĩa là điều gì đó xuất sắc hoặc nổi bật.',
    },
  },

  taste: {
    profile: ['floral', 'citrus', 'smooth'],
    description: {
      en: 'Bright lemon tartness balanced by floral honey sweetness and gin botanicals. Smooth, refreshing, and perfectly balanced with a silky texture from the honey.',
      it: 'Acidità brillante del limone bilanciata dalla dolcezza floreale del miele e dai botanici del gin. Liscio, rinfrescante e perfettamente bilanciato con una consistenza setosa dal miele.',
      vi: 'Vị chua chanh tươi mát cân bằng với vị ngọt mật ong hoa và thảo mộc gin. Mượt mà, sảng khoái và cân bằng hoàn hảo với kết cấu mượt từ mật ong.',
    },
    first_impression: {
      en: 'Bright lemon with floral honey and gin botanicals',
      it: 'Limone brillante con miele floreale e botanici di gin',
      vi: 'Chanh tươi mát với mật ong hoa và thảo mộc gin',
    },
    finish: {
      en: 'Smooth, lingering finish with honey sweetness and gin complexity',
      it: 'Finale liscio e persistente con dolcezza di miele e complessità del gin',
      vi: 'Kết thúc mượt mà, kéo dài với vị ngọt mật ong và độ phức tạp gin',
    },
    balance: {
      en: 'Perfectly balanced between lemon tartness, honey sweetness, and gin dryness',
      it: 'Perfettamente bilanciato tra acidità del limone, dolcezza del miele e secchezza del gin',
      vi: 'Cân bằng hoàn hảo giữa vị chua chanh, vị ngọt mật ong và độ khô gin',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'garden_party', 'afternoon_tea', 'date_night'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with light salads, goat cheese, honey-glazed appetizers, or afternoon tea sandwiches.',
      it: 'Eccellente con insalate leggere, formaggio di capra, antipasti glassati al miele, o sandwich per il tè pomeridiano.',
      vi: 'Tuyệt vời với salad nhẹ, phô mai dê, món khai vị tráng men mật ong hoặc bánh sandwich trà chiều.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who enjoy smooth, citrusy cocktails. Ideal for those interested in Prohibition-era classics or anyone seeking a sophisticated yet simple drink.',
      it: "Perfetto per gli amanti del gin che apprezzano cocktail lisci e agrumati. Ideale per chi è interessato ai classici dell'era del Proibizionismo o per chiunque cerchi una bevanda sofisticata ma semplice.",
      vi: 'Hoàn hảo cho người yêu gin thích cocktail mượt mà, có vị cam quýt. Lý tưởng cho những ai quan tâm đến cocktail thời kỳ Cấm rượu hoặc bất kỳ ai tìm kiếm thức uống tinh tế nhưng đơn giản.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 25, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 12.5, unit: 'ml' },
      display_name: { en: 'Honey syrup', it: 'Sciroppo di miele', vi: 'Siro mật ong' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake all ingredients with ice. Strain into a chilled cocktail glass.',
    it: 'Shakerare tutti gli ingredienti con ghiaccio. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Lắc tất cả nguyên liệu với đá. Lọc vào ly cocktail đã được làm lạnh.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Lemon twist',
    it: 'Twist di limone',
    vi: 'Vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['floral', 'citrus', 'smooth'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'garden_party', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff:
    'Use honey syrup (3:1 honey to water) for easier mixing. Shake vigorously to properly emulsify the honey. Quality honey makes a big difference.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/bees-knees/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
