/**
 * IBA Unforgettables: White Lady
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const whiteLady: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  slug: 'white-lady',
  stable_key: 'a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0',

  name: {
    en: 'White Lady',
    it: 'White Lady',
    vi: 'White Lady',
    ko: '화이트 레이디',
    ja: 'ホワイト・レディ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'sour', 'citrus', 'elegant'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant gin sour featuring the perfect trinity of gin, Cointreau, and fresh lemon juice. The White Lady is crisp, balanced, and sophisticated - a true symbol of classic cocktail refinement that has remained popular for nearly a century.',
    it: 'Un elegante gin sour con la perfetta trinità di gin, Cointreau e succo di limone fresco. La White Lady è croccante, bilanciata e sofisticata - un vero simbolo di raffinatezza cocktail classica che è rimasta popolare per quasi un secolo.',
    vi: 'Một gin sour thanh lịch có bộ ba hoàn hảo gồm gin, Cointreau và nước chanh tươi. White Lady giòn, cân bằng và tinh tế - một biểu tượng thực sự của sự tinh tế cocktail cổ điển đã duy trì phổ biến gần một thế kỷ.',
  },

  history: {
    created_year: '1929',
    origin: {
      city: 'London',
      bar: "Harry's New York Bar",
      country: 'UK',
    },
    creator: {
      name: 'Harry MacElhone',
      profession: 'bartender',
    },
    story: {
      en: 'First created by Harry MacElhone in 1919, the White Lady underwent a transformation in 1929 when gin replaced crème de menthe, defining the recipe we know today. Originally served at Ciro\'s Club in London, this cocktail has traveled through decades, becoming a symbol of sophistication in bars worldwide. Some variations add egg white for extra silkiness, though the IBA standard recipe does not include it.',
      it: 'Creata per la prima volta da Harry MacElhone nel 1919, la White Lady subì una trasformazione nel 1929 quando il gin sostituì la crème de menthe, definendo la ricetta che conosciamo oggi. Originariamente servita al Ciro\'s Club di Londra, questo cocktail ha attraversato decenni, diventando un simbolo di sofisticatezza nei bar di tutto il mondo. Alcune varianti aggiungono albume per extra setosità, anche se la ricetta standard IBA non lo include.',
      vi: 'Lần đầu tiên được tạo ra bởi Harry MacElhone vào năm 1919, White Lady trải qua một sự chuyển đổi vào năm 1929 khi gin thay thế crème de menthe, xác định công thức chúng ta biết ngày nay. Ban đầu được phục vụ tại Ciro\'s Club ở London, cocktail này đã đi qua nhiều thập kỷ, trở thành biểu tượng của sự tinh tế trong các quầy bar trên toàn thế giới. Một số biến thể thêm lòng trắng trứng để mịn màng hơn, mặc dù công thức IBA chuẩn không bao gồm nó.',
    },
    named_after: {
      en: 'Named for its pale, elegant appearance and refined character.',
      it: 'Prende il nome dal suo aspetto pallido ed elegante e dal carattere raffinato.',
      vi: 'Được đặt tên cho vẻ ngoài nhạt nhẽo, thanh lịch và đặc tính tinh tế của nó.',
    },
  },

  taste: {
    profile: ['citrus', 'sharp', 'refreshing'],
    description: {
      en: 'Crisp and bracingly tart with bright lemon leading the way, balanced by the orange sweetness of Cointreau and the botanical complexity of gin. Clean, refreshing, and perfectly balanced.',
      it: 'Croccante e vivacemente aspro con limone brillante in testa, bilanciato dalla dolcezza d\'arancia del Cointreau e dalla complessità botanica del gin. Pulito, rinfrescante e perfettamente bilanciato.',
      vi: 'Giòn và chua mạnh với chanh tươi sáng dẫn đầu, cân bằng bởi vị ngọt cam của Cointreau và độ phức tạp thực vật của gin. Sạch sẽ, sảng khoái và cân bằng hoàn hảo.',
    },
    first_impression: {
      en: 'Bright, sharp lemon with orange sweetness',
      it: 'Limone brillante e aspro con dolcezza d\'arancia',
      vi: 'Chanh tươi sáng, chua với vị ngọt cam',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus and botanical notes',
      it: 'Finale pulito e croccante con note persistenti di agrumi e botaniche',
      vi: 'Kết thúc sạch sẽ, giòn với hương cam quýt và thảo mộc kéo dài',
    },
    balance: {
      en: 'Perfect balance between tart lemon, sweet orange, and botanical gin',
      it: 'Perfetto equilibrio tra limone aspro, arancia dolce e gin botanico',
      vi: 'Cân bằng hoàn hảo giữa chanh chua, cam ngọt và gin thực vật',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'evening', 'pre_dinner'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'sophisticated_gathering'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with oysters, smoked salmon, light seafood, or as an aperitif before dinner. Pairs beautifully with citrus-based dishes and fresh salads.',
      it: 'Eccellente con ostriche, salmone affumicato, frutti di mare leggeri o come aperitivo prima di cena. Si abbina magnificamente con piatti a base di agrumi e insalate fresche.',
      vi: 'Tuyệt vời với hàu, cá hồi hun khói, hải sản nhẹ hoặc làm aperitif trước bữa tối. Kết hợp tuyệt đẹp với các món dựa trên cam quýt và salad tươi.',
    },
    ideal_for: {
      en: 'Perfect for gin enthusiasts who appreciate clean, citrus-forward cocktails. Ideal for those who enjoy Margaritas or Daiquiris but prefer gin as their base spirit.',
      it: 'Perfetto per gli appassionati di gin che apprezzano cocktail puliti e ricchi di agrumi. Ideale per chi ama Margarita o Daiquiri ma preferisce il gin come base.',
      vi: 'Hoàn hảo cho những người đam mê gin đánh giá cao cocktail sạch sẽ, hướng cam quýt. Lý tưởng cho những ai thích Margaritas hoặc Daiquiris nhưng thích gin làm rượu cơ sở.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Triple sec (Cointreau)', it: 'Triple sec (Cointreau)', vi: 'Triple sec (Cointreau)' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti nello shaker, shakerare bene con ghiaccio, filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail, lắc kỹ với đá, lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Lemon twist',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'sharp', 'refreshing'],

  abv_estimate: 22, // ~22% ABV after dilution

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['white-lady-with-egg-white', 'clover-club', 'aviation'],

  notes_for_staff: 'Use Cointreau for best results - quality triple sec is essential. Fresh lemon juice only. Some guests may request egg white for silkiness - add 15ml if requested. Shake hard for proper dilution and chill.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/white-lady/',
    note: 'IBA Official Recipe. Historical information from Harry MacElhone and cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
