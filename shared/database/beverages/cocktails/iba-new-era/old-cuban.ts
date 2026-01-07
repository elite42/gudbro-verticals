/**
 * IBA New Era Drinks: Old Cuban
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const oldCuban: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
  slug: 'old-cuban',
  stable_key: 'c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8',

  name: {
    en: 'Old Cuban',
    it: 'Old Cuban',
    vi: 'Old Cuban',
    ko: '올드 쿠반',
    ja: 'オールドキューバン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'rum', 'champagne', 'mint', 'elegant', 'modern'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant marriage of Mojito and French 75, the Old Cuban combines aged rum with fresh mint, lime, and Champagne. This sophisticated cocktail showcases the evolution of classic Cuban cocktail culture.',
    it: "Un elegante matrimonio tra Mojito e French 75, l'Old Cuban combina rum invecchiato con menta fresca, lime e Champagne. Questo cocktail sofisticato mostra l'evoluzione della classica cultura dei cocktail cubani.",
    vi: 'Sự kết hợp thanh lịch giữa Mojito và French 75, Old Cuban kết hợp rum lâu năm với bạc hà tươi, chanh và Champagne. Cocktail tinh tế này thể hiện sự phát triển của văn hóa cocktail Cuba cổ điển.',
  },

  history: {
    created_year: '2001',
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
      en: 'Created in 2001 by renowned bartender Audrey Saunders at the Pegu Club in New York City. Saunders sought to create a more sophisticated version of the Mojito by combining it with elements of the French 75. The result was a refined, effervescent cocktail that quickly became a modern classic. The drink represents the new wave of craft cocktail innovation while honoring Cuban cocktail traditions.',
      it: 'Creato nel 2001 dalla rinomata barman Audrey Saunders al Pegu Club di New York City. Saunders cercava di creare una versione più sofisticata del Mojito combinandolo con elementi del French 75. Il risultato fu un cocktail raffinato ed effervescente che divenne rapidamente un classico moderno. La bevanda rappresenta la nuova ondata di innovazione dei cocktail artigianali onorando le tradizioni dei cocktail cubani.',
      vi: 'Được tạo ra năm 2001 bởi bartender nổi tiếng Audrey Saunders tại Pegu Club ở New York City. Saunders tìm cách tạo ra phiên bản tinh tế hơn của Mojito bằng cách kết hợp nó với các yếu tố của French 75. Kết quả là một cocktail tinh tế, sủi bọt nhanh chóng trở thành cocktail hiện đại cổ điển. Thức uống đại diện cho làn sóng mới của sự đổi mới cocktail thủ công trong khi tôn vinh truyền thống cocktail Cuba.',
    },
    named_after: {
      en: 'Named "Old Cuban" to evoke the classic Cuban cocktail tradition while showcasing a modern interpretation.',
      it: 'Chiamato "Old Cuban" per evocare la classica tradizione dei cocktail cubani mostrando un\'interpretazione moderna.',
      vi: 'Được đặt tên "Old Cuban" để gợi lên truyền thống cocktail Cuba cổ điển trong khi thể hiện cách diễn giải hiện đại.',
    },
  },

  taste: {
    profile: ['sparkling', 'minty', 'sophisticated'],
    description: {
      en: 'Refreshing mint and lime with the richness of aged rum, elevated by Champagne bubbles and a hint of Angostura. Complex, elegant, and perfectly balanced.',
      it: 'Menta e lime rinfrescanti con la ricchezza del rum invecchiato, elevati dalle bollicine di Champagne e un tocco di Angostura. Complesso, elegante e perfettamente bilanciato.',
      vi: 'Bạc hà và chanh sảng khoái với độ đậm đà của rum lâu năm, được nâng tầm bởi bong bóng Champagne và chút Angostura. Phức tạp, thanh lịch và cân bằng hoàn hảo.',
    },
    first_impression: {
      en: 'Fresh mint and sparkling effervescence with aged rum depth',
      it: 'Menta fresca ed effervescenza frizzante con profondità di rum invecchiato',
      vi: 'Bạc hà tươi và độ sủi bọt với độ sâu rum lâu năm',
    },
    finish: {
      en: 'Long, elegant finish with lingering mint and rum complexity',
      it: 'Finale lungo ed elegante con menta persistente e complessità del rum',
      vi: 'Kết thúc dài, thanh lịch với bạc hà kéo dài và độ phức tạp rum',
    },
    balance: {
      en: 'Perfectly balanced between fresh mint, citrus, aged rum richness, and Champagne elegance',
      it: 'Perfettamente bilanciato tra menta fresca, agrumi, ricchezza del rum invecchiato ed eleganza dello Champagne',
      vi: 'Cân bằng hoàn hảo giữa bạc hà tươi, cam quýt, độ đậm đà rum lâu năm và sự thanh lịch Champagne',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon'],
    occasions: ['celebration', 'date_night', 'special_occasion', 'aperitivo'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Excellent with oysters, seafood appetizers, Cuban cuisine, or as an elegant aperitif before fine dining.',
      it: 'Eccellente con ostriche, antipasti di pesce, cucina cubana, o come aperitivo elegante prima di un pasto raffinato.',
      vi: 'Tuyệt vời với hàu, món khai vị hải sản, ẩm thực Cuba, hoặc làm aperitif thanh lịch trước bữa ăn cao cấp.',
    },
    ideal_for: {
      en: 'Perfect for those who love Mojitos but want something more refined. Ideal for Champagne and rum enthusiasts seeking sophisticated cocktails.',
      it: 'Perfetto per chi ama i Mojito ma vuole qualcosa di più raffinato. Ideale per gli appassionati di Champagne e rum che cercano cocktail sofisticati.',
      vi: 'Hoàn hảo cho những ai yêu Mojito nhưng muốn thứ gì đó tinh tế hơn. Lý tưởng cho người đam mê Champagne và rum tìm kiếm cocktail tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_AGED',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Aged rum', it: 'Rum invecchiato', vi: 'Rum lâu năm' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_MINT_LEAVES',
      quantity: { amount: 6, unit: 'leaves' },
      display_name: { en: 'Fresh mint leaves', it: 'Foglie di menta fresca', vi: 'Lá bạc hà tươi' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitter', vi: 'Angostura bitters' },
    },
    {
      ingredient_id: 'ING_CHAMPAGNE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Champagne', it: 'Champagne', vi: 'Champagne' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Muddle mint leaves gently with simple syrup in a shaker. Add rum, lime juice, bitters, and ice. Shake well. Double strain into a chilled cocktail glass. Top with Champagne.',
    it: 'Pestare delicatamente le foglie di menta con lo sciroppo semplice in uno shaker. Aggiungere rum, succo di lime, bitter e ghiaccio. Shakerare bene. Filtrare due volte in una coppa da cocktail raffreddata. Completare con Champagne.',
    vi: 'Nghiền nhẹ lá bạc hà với siro đường trong bình lắc. Thêm rum, nước chanh, bitters và đá. Lắc kỹ. Lọc đôi vào ly cocktail đã làm lạnh. Phủ Champagne lên trên.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Mint sprig',
    it: 'Rametto di menta',
    vi: 'Cành bạc hà',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_AGED'],

  flavor_profile: ['sparkling', 'minty', 'sophisticated'],

  abv_estimate: 14,

  calories_estimate: 200,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
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
  season_tags: ['summer', 'spring'],
  occasion_tags: ['celebration', 'date_night', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff:
    'Muddle mint gently to avoid bitterness. Use aged rum for complexity. Add Champagne last to preserve bubbles. Double strain to remove mint particles.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'high',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/old-cuban/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
