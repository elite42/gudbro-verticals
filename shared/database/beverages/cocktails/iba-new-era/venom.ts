/**
 * IBA New Era Drinks: Venom
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const venom: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3e5f7a9-4b6d-5e8c-0f2a-3d5b7e9c1f4a',
  slug: 'venom',
  stable_key: 'd4f6a8c0e2b4d6f8a0c2e4b6d8f0a2c4',

  name: {
    en: 'Venom',
    it: 'Venom',
    vi: 'Venom',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'gin', 'herbal', 'bitter'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A contemporary gin-based cocktail combining herbal and bitter elements with citrus. The Venom delivers a sophisticated balance of botanical gin, herbal liqueurs, and fresh lemon, creating a complex and refreshing drink with a distinctive edge.',
    it: 'Un cocktail contemporaneo a base di gin che combina elementi erbacei e amari con agrumi. Il Venom offre un sofisticato equilibrio di gin botanico, liquori erbacei e limone fresco, creando un drink complesso e rinfrescante con un carattere distintivo.',
    vi: 'Một cocktail hiện đại gốc gin kết hợp các yếu tố thảo mộc và đắng với cam quýt. Venom mang đến sự cân bằng tinh tế của gin thực vật, rượu mùi thảo mộc và chanh tươi, tạo ra một thức uống phức tạp và sảng khoái với một nét riêng biệt.',
  },

  history: {
    created_year: '2010',
    origin: {
      city: 'London',
      bar: 'Unknown',
      country: 'UK',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Venom is a modern cocktail that emerged during the craft cocktail renaissance of the 2010s. While its exact origins are not definitively documented, it represents the era's focus on botanical complexity and bitter-herbal flavor profiles. The drink gained recognition for its sophisticated balance and intriguing flavor combination, earning its place in the IBA New Era Drinks category.",
      it: "Il Venom è un cocktail moderno emerso durante il rinascimento dei cocktail artigianali degli anni 2010. Sebbene le sue origini esatte non siano definitivamente documentate, rappresenta l'attenzione dell'epoca sulla complessità botanica e sui profili di sapore erbaceo-amaro. Il drink ha guadagnato riconoscimento per il suo equilibrio sofisticato e l'intrigante combinazione di sapori, guadagnandosi un posto nella categoria IBA New Era Drinks.",
      vi: 'Venom là một cocktail hiện đại xuất hiện trong thời kỳ phục hưng cocktail thủ công của những năm 2010. Mặc dù nguồn gốc chính xác không được ghi chép rõ ràng, nó đại diện cho sự tập trung của thời đại vào độ phức tạp thực vật và hương vị thảo mộc-đắng. Thức uống được công nhận về sự cân bằng tinh tế và sự kết hợp hương vị hấp dẫn, giành được vị trí trong danh mục IBA New Era Drinks.',
    },
    named_after: {
      en: 'Named "Venom" for its potent blend of strong flavors and the sharp, biting quality of its herbal and bitter components.',
      it: 'Chiamato "Venom" per la sua potente miscela di sapori forti e la qualità pungente e mordente dei suoi componenti erbacei e amari.',
      vi: 'Được đặt tên "Venom" cho sự pha trộn mạnh mẽ của các hương vị mạnh và chất lượng sắc bén, cắn của các thành phần thảo mộc và đắng.',
    },
  },

  taste: {
    profile: ['herbal', 'bitter', 'citrus', 'botanical'],
    description: {
      en: "Complex and layered. The gin provides a botanical foundation, while herbal liqueurs add depth and slight sweetness. Fresh lemon juice brings brightness and acidity, creating a drink that's both refreshing and contemplative.",
      it: 'Complesso e stratificato. Il gin fornisce una base botanica, mentre i liquori erbacei aggiungono profondità e leggera dolcezza. Il succo di limone fresco porta luminosità e acidità, creando un drink sia rinfrescante che contemplativo.',
      vi: 'Phức tạp và nhiều lớp. Gin cung cấp nền tảng thực vật, trong khi rượu mùi thảo mộc thêm chiều sâu và vị ngọt nhẹ. Nước cốt chanh tươi mang lại sự tươi sáng và độ acid, tạo ra một thức uống vừa sảng khoái vừa trầm tư.',
    },
    first_impression: {
      en: 'Bright citrus and herbal notes hit first, followed by the complexity of botanical gin',
      it: 'Note di agrumi brillanti ed erbacee colpiscono per prime, seguite dalla complessità del gin botanico',
      vi: 'Hương cam quýt tươi sáng và thảo mộc đập vào đầu tiên, tiếp theo là độ phức tạp của gin thực vật',
    },
    finish: {
      en: 'Medium-length finish with lingering herbal and bitter notes',
      it: 'Finale di media lunghezza con note erbacee e amare persistenti',
      vi: 'Kết thúc độ dài trung bình với hương thảo mộc và đắng kéo dài',
    },
    balance: {
      en: 'Well-balanced between botanical complexity, herbal sweetness, and citrus acidity',
      it: 'Ben bilanciato tra complessità botanica, dolcezza erbaccea e acidità degli agrumi',
      vi: 'Cân bằng tốt giữa độ phức tạp thực vật, vị ngọt thảo mộc và độ acid cam quýt',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: [
      'aperitivo',
      'cocktail_hour',
      'craft_cocktail_experience',
      'sophisticated_gathering',
    ],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Pairs well with light appetizers, fresh salads, herb-crusted vegetables, goat cheese, and seafood. The herbal complexity complements Mediterranean and contemporary cuisine.',
      it: 'Si abbina bene con antipasti leggeri, insalate fresche, verdure in crosta di erbe, formaggio di capra e frutti di mare. La complessità erbaccea completa la cucina mediterranea e contemporanea.',
      vi: 'Kết hợp tốt với món khai vị nhẹ, salad tươi, rau phủ thảo mộc, phô mai dê và hải sản. Độ phức tạp thảo mộc bổ sung cho ẩm thực Địa Trung Hải và hiện đại.',
    },
    ideal_for: {
      en: 'Perfect for gin enthusiasts who enjoy botanical and herbal flavors. Ideal for those seeking a sophisticated, spirit-forward cocktail with contemporary flair. Great for adventurous drinkers exploring modern classics.',
      it: 'Perfetto per gli appassionati di gin che amano i sapori botanici ed erbacei. Ideale per chi cerca un cocktail sofisticato e incentrato sugli spirit con stile contemporaneo. Ottimo per bevitori avventurosi che esplorano i classici moderni.',
      vi: 'Hoàn hảo cho những người đam mê gin thích hương vị thực vật và thảo mộc. Lý tưởng cho những ai tìm kiếm một cocktail tinh tế, hướng đến rượu mạnh với phong cách hiện đại. Tuyệt vời cho người uống mạo hiểm khám phá cocktail cổ điển hiện đại.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_BENEDICTINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Bénédictine', it: 'Bénédictine', vi: 'Bénédictine' },
    },
    {
      ingredient_id: 'ING_CHARTREUSE_YELLOW',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Yellow Chartreuse',
        it: 'Chartreuse Gialla',
        vi: 'Chartreuse Vàng',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã được làm lạnh.',
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

  flavor_profile: ['herbal', 'bitter', 'citrus', 'botanical'],

  abv_estimate: 28,

  calories_estimate: 175,

  difficulty: 'medium',

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
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'cocktail_hour', 'sophisticated_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['alaska', 'bijou', 'last-word'],

  notes_for_staff:
    'Use a gin with good botanical character. Fresh lemon juice is essential. Bénédictine and Yellow Chartreuse both bring herbal complexity - ensure proper measures for balance. Serve in a chilled coupe or cocktail glass.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/venom/',
    notes: 'IBA Official Recipe. Modern cocktail from the craft cocktail renaissance.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
