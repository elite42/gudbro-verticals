/**
 * IBA New Era Drinks: Jungle Bird
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const jungleBird: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
  slug: 'jungle-bird',
  stable_key: 'c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',

  name: {
    en: 'Jungle Bird',
    it: 'Jungle Bird',
    vi: 'Jungle Bird',
    ko: '정글 버드',
    ja: 'ジャングル・バード',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'tiki', 'tropical', 'rum', 'bitter', 'modern-classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A bold tropical cocktail that breaks the tiki mold by incorporating bitter Campari with rum and pineapple. This Malaysian creation balances sweet tropical fruit with sophisticated bitterness, creating a complex and refreshing drink that has become a modern tiki favorite.',
    it: 'Un cocktail tropicale audace che rompe lo stampo tiki incorporando il Campari amaro con rum e ananas. Questa creazione malese bilancia la frutta tropicale dolce con un\'amarezza sofisticata, creando una bevanda complessa e rinfrescante che è diventata un favorito tiki moderno.',
    vi: 'Một cocktail nhiệt đới táo bạo phá vỡ khuôn mẫu tiki bằng cách kết hợp Campari đắng với rum và dứa. Tác phẩm Malaysia này cân bằng trái cây nhiệt đới ngọt với vị đắng tinh tế, tạo ra đồ uống phức tạp và sảng khoái đã trở thành món yêu thích tiki hiện đại.',
  },

  history: {
    created_year: '1978',
    origin: {
      city: 'Kuala Lumpur',
      bar: 'Kuala Lumpur Hilton',
      country: 'Malaysia',
    },
    creator: {
      name: 'Jeffrey Ong',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 1978 by Jeffrey Ong at the Kuala Lumpur Hilton\'s Aviary Bar for the hotel\'s opening. The drink was named after the hornbills that inhabited the bar\'s aviary. While initially a hotel signature, it remained relatively obscure until Giuseppe Gonzalez reintroduced it to New York\'s cocktail scene in the 2000s. The unusual combination of Campari in a tiki drink was revolutionary and helped spark renewed interest in tiki cocktails.',
      it: 'Creato nel 1978 da Jeffrey Ong all\'Aviary Bar del Kuala Lumpur Hilton per l\'apertura dell\'hotel. La bevanda prese il nome dai buceri che abitavano la voliera del bar. Sebbene inizialmente fosse un signature dell\'hotel, rimase relativamente oscuro fino a quando Giuseppe Gonzalez lo reintrodusse nella scena cocktail di New York negli anni 2000. L\'insolita combinazione di Campari in un drink tiki fu rivoluzionaria e contribuì a riaccendere l\'interesse per i cocktail tiki.',
      vi: 'Được tạo ra năm 1978 bởi Jeffrey Ong tại Aviary Bar của Kuala Lumpur Hilton cho lễ khai trương khách sạn. Đồ uống được đặt tên theo loài chim hornbill sống trong chuồng chim của quầy bar. Mặc dù ban đầu là signature của khách sạn, nó vẫn tương đối mờ nhạt cho đến khi Giuseppe Gonzalez giới thiệu lại nó vào làng cocktail New York những năm 2000. Sự kết hợp bất thường của Campari trong đồ uống tiki là cách mạng và giúp khơi dậy sự quan tâm mới về cocktail tiki.',
    },
    named_after: {
      en: 'Named after the hornbills (jungle birds) that were kept in an aviary at the Kuala Lumpur Hilton\'s bar where the drink was created.',
      it: 'Prende il nome dai buceri (uccelli della giungla) che erano tenuti in una voliera nel bar del Kuala Lumpur Hilton dove fu creata la bevanda.',
      vi: 'Được đặt tên theo loài chim hornbill (chim rừng) được nuôi trong chuồng chim tại quầy bar Kuala Lumpur Hilton nơi đồ uống được tạo ra.',
    },
  },

  taste: {
    profile: ['bitter', 'tropical', 'complex', 'balanced'],
    description: {
      en: 'Beautifully complex with bittersweet Campari playing against tropical pineapple sweetness, dark rum richness, and bright lime acidity. The bitterness cuts through the tropical elements creating a sophisticated, layered experience.',
      it: 'Magnificamente complesso con Campari amarognolo che gioca contro la dolcezza tropicale dell\'ananas, la ricchezza del rum scuro e l\'acidità vivace del lime. L\'amarezza taglia attraverso gli elementi tropicali creando un\'esperienza sofisticata e stratificata.',
      vi: 'Phức tạp tuyệt đẹp với Campari đắng ngọt đối lập với vị ngọt dứa nhiệt đới, sự đậm đà của rum đen và độ chua chanh tươi sáng. Vị đắng xuyên qua các yếu tố nhiệt đới tạo ra trải nghiệm tinh tế, nhiều lớp.',
    },
    first_impression: {
      en: 'Bitter Campari and tropical pineapple create an intriguing contrast',
      it: 'Campari amaro e ananas tropicale creano un contrasto intrigante',
      vi: 'Campari đắng và dứa nhiệt đới tạo ra sự tương phản hấp dẫn',
    },
    finish: {
      en: 'Long, bittersweet finish with rum warmth and lingering tropical notes',
      it: 'Finale lungo e amarognolo con calore di rum e note tropicali persistenti',
      vi: 'Kết thúc dài, đắng ngọt với hơi ấm rum và nốt nhiệt đới kéo dài',
    },
    balance: {
      en: 'Masterfully balanced between bitter, sweet, sour, and boozy elements',
      it: 'Magistralmente bilanciato tra elementi amari, dolci, acidi e alcolici',
      vi: 'Cân bằng điêu luyện giữa các yếu tố đắng, ngọt, chua và nồng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'aperitif'],
    occasions: ['aperitivo', 'cocktail_party', 'tropical_gathering', 'date_night'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with spicy Asian cuisine, grilled meats, jerk chicken, Malaysian satay, and bold tropical flavors.',
      it: 'Eccellente con cucina asiatica piccante, carni alla griglia, pollo jerk, satay malese e sapori tropicali audaci.',
      vi: 'Tuyệt vời với ẩm thực Á cay, thịt nướng, gà jerk, satay Malaysia và hương vị nhiệt đới đậm đà.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who appreciate complex, bitter flavors in their tiki drinks. Ideal for Campari lovers and those seeking a sophisticated tropical cocktail. Great as an aperitif or with spicy food.',
      it: 'Perfetto per bevitori avventurosi che apprezzano sapori complessi e amari nei loro drink tiki. Ideale per gli amanti del Campari e chi cerca un cocktail tropicale sofisticato. Ottimo come aperitivo o con cibo piccante.',
      vi: 'Hoàn hảo cho người uống phiêu lưu đánh giá cao hương vị đắng phức tạp trong đồ uống tiki. Lý tưởng cho người yêu Campari và những ai tìm kiếm cocktail nhiệt đới tinh tế. Tuyệt vời làm aperitif hoặc với đồ ăn cay.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước dứa' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a rocks glass or tiki mug filled with fresh ice (preferably crushed). Garnish with a pineapple wedge and a maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere rocks o tiki mug pieno di ghiaccio fresco (preferibilmente tritato). Guarnire con una fetta di ananas e una ciliegia maraschino.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly rocks hoặc cốc tiki đầy đá tươi (tốt nhất là đá bào). Trang trí với múi dứa và cherry maraschino.',
  },

  glass: 'Rocks glass or Tiki mug',

  garnish: {
    en: 'Pineapple wedge and maraschino cherry',
    it: 'Fetta di ananas e ciliegia maraschino',
    vi: 'Múi dứa và cherry maraschino',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK'],

  flavor_profile: ['bitter', 'tropical', 'complex', 'balanced'],

  abv_estimate: 16,

  calories_estimate: 200,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'party', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['mezcal-jungle-bird', 'jungle-bird-swizzle'],

  notes_for_staff: 'Campari is essential - do not substitute. Use a dark Jamaican rum for best results. Fresh pineapple juice preferred. The bitterness balances the tropical sweetness - do not reduce Campari.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/jungle-bird/',
    note: 'IBA Official Recipe. Created by Jeffrey Ong at Kuala Lumpur Hilton, 1978.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
