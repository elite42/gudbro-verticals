/**
 * IBA Unforgettables: Planter's Punch
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const plantersPunch: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '9e0f1a2b-3c4d-5e6f-7a8b-9c0d1e2f3a4b',
  slug: 'planters-punch',
  stable_key: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3',

  name: {
    en: "Planter's Punch",
    it: "Planter's Punch",
    vi: "Planter's Punch",
    ko: '플랜터스 펀치',
    ja: 'プランターズ・パンチ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'rum', 'tropical', 'tiki', 'punch', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A legendary Caribbean rum punch that epitomizes tropical refreshment. This classic combines dark rum with fresh citrus juices and sugar syrup, creating a perfectly balanced drink that\'s been quenching thirsts since the 19th century. Following the traditional "one of sour, two of sweet, three of strong, four of weak" formula.',
    it: 'Un leggendario punch al rum caraibico che incarna il rinfresco tropicale. Questo classico combina rum scuro con succhi di agrumi freschi e sciroppo di zucchero, creando una bevanda perfettamente bilanciata che disseta dal XIX secolo. Seguendo la tradizionale formula "uno di aspro, due di dolce, tre di forte, quattro di debole".',
    vi: 'Một loại punch rượu rum Caribbean huyền thoại tượng trưng cho sự sảng khoái nhiệt đới. Tác phẩm kinh điển này kết hợp rượu rum đen với nước ép trái cây có múi tươi và xi-rô đường, tạo ra thức uống cân bằng hoàn hảo đã giải khát từ thế kỷ 19. Theo công thức truyền thống "một chua, hai ngọt, ba mạnh, bốn nhạt".',
  },

  history: {
    created_year: '1878',
    origin: {
      city: 'Kingston',
      bar: 'Myers Rum Distillery',
      country: 'Jamaica',
    },
    creator: {
      name: 'Fred L. Myers',
      profession: 'distiller',
    },
    story: {
      en: 'The Planter\'s Punch dates back to 1878 when it first appeared in print in the Jamaican newspaper "Fun." The recipe followed a simple rhyme: "One of sour, two of sweet, three of strong, four of weak" - referring to lime juice, sugar syrup, rum, and water. The drink was popularized by Fred L. Myers of the Myers Rum Distillery in Jamaica and became a signature offering at plantation parties. It spread throughout the Caribbean and became a staple of tiki culture in the mid-20th century. The name "Planter\'s" refers to the colonial plantation owners who would have served this refreshing drink during hot Caribbean days.',
      it: 'Il Planter\'s Punch risale al 1878 quando apparve per la prima volta in stampa nel giornale giamaicano "Fun." La ricetta seguiva una semplice rima: "Uno di aspro, due di dolce, tre di forte, quattro di debole" - riferendosi a succo di lime, sciroppo di zucchero, rum e acqua. Il drink fu reso popolare da Fred L. Myers della Myers Rum Distillery in Giamaica e divenne un\'offerta tipica alle feste delle piantagioni. Si diffuse in tutti i Caraibi e divenne un pilastro della cultura tiki a metà del XX secolo. Il nome "Planter\'s" si riferisce ai proprietari delle piantagioni coloniali che avrebbero servito questa bevanda rinfrescante durante le calde giornate caraibiche.',
      vi: 'Planter\'s Punch có từ năm 1878 khi nó lần đầu tiên xuất hiện trên báo Jamaica "Fun." Công thức theo một vần điệu đơn giản: "Một chua, hai ngọt, ba mạnh, bốn nhạt" - đề cập đến nước cốt chanh, xi-rô đường, rượu rum và nước. Thức uống được Fred L. Myers của Nhà máy chưng cất Myers Rum ở Jamaica phổ biến và trở thành món đặc trưng tại các bữa tiệc đồn điền. Nó lan rộng khắp vùng Caribbean và trở thành món chính của văn hóa tiki vào giữa thế kỷ 20. Tên "Planter\'s" đề cập đến chủ đồn điền thuộc địa, những người sẽ phục vụ thức uống sảng khoái này trong những ngày nóng bức ở Caribbean.',
    },
    named_after: {
      en: 'Named after the plantation owners (planters) in the Caribbean who popularized this refreshing rum punch during the colonial era.',
      it: "Prende il nome dai proprietari delle piantagioni (planters) nei Caraibi che resero popolare questo rinfrescante punch al rum durante l'era coloniale.",
      vi: 'Được đặt theo tên chủ đồn điền (planters) ở vùng Caribbean, những người đã phổ biến loại punch rượu rum sảng khoái này trong thời kỳ thuộc địa.',
    },
  },

  taste: {
    profile: ['tropical', 'citrus', 'sweet'],
    description: {
      en: "Bold and tropical with rich dark rum as the foundation, balanced by tart lime and orange juices. The sugar syrup rounds out the flavors, creating a harmonious blend that's both refreshing and satisfying. The dark rum provides depth and complexity with notes of molasses and caramel, while the citrus keeps it bright and lively.",
      it: 'Audace e tropicale con rum scuro ricco come base, bilanciato da succhi aspri di lime e arancia. Lo sciroppo di zucchero arrotonda i sapori, creando una miscela armoniosa che è sia rinfrescante che soddisfacente. Il rum scuro fornisce profondità e complessità con note di melassa e caramello, mentre gli agrumi lo mantengono brillante e vivace.',
      vi: 'Táo bạo và nhiệt đới với rượu rum đen đậm đà làm nền, được cân bằng bởi nước cốt chanh và cam chua. Xi-rô đường làm tròn hương vị, tạo ra sự pha trộn hài hòa vừa sảng khoái vừa thỏa mãn. Rượu rum đen mang lại chiều sâu và độ phức tạp với hương mật mía và caramel, trong khi cam quýt giữ cho nó tươi sáng và sống động.',
    },
    first_impression: {
      en: 'Bright citrus with dark rum warmth and sweetness',
      it: 'Agrumi brillanti con calore e dolcezza del rum scuro',
      vi: 'Cam quýt tươi sáng với hơi ấm và vị ngọt của rượu rum đen',
    },
    finish: {
      en: 'Long, warming finish with lingering rum spices and tropical fruit notes',
      it: 'Finale lungo e caldo con spezie di rum persistenti e note di frutta tropicale',
      vi: 'Kết thúc dài, ấm áp với gia vị rum và hương trái cây nhiệt đới kéo dài',
    },
    balance: {
      en: 'Perfectly balanced following the classic punch formula - sweet without being cloying, strong without being harsh',
      it: 'Perfettamente bilanciato seguendo la classica formula del punch - dolce senza essere stucchevole, forte senza essere aspro',
      vi: 'Cân bằng hoàn hảo theo công thức punch cổ điển - ngọt mà không ngọt gắt, mạnh mà không gay gắt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['party', 'celebration', 'poolside', 'beach', 'tiki_night'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with Caribbean cuisine, jerk chicken, grilled seafood, tropical fruits, coconut-based dishes, and spicy island fare. Pairs beautifully with BBQ ribs and plantain chips.',
      it: 'Eccellente con cucina caraibica, pollo jerk, frutti di mare alla griglia, frutta tropicale, piatti a base di cocco e piatti speziati delle isole. Si abbina magnificamente con costine BBQ e chips di platano.',
      vi: 'Tuyệt vời với ẩm thực Caribbean, gà jerk, hải sản nướng, trái cây nhiệt đới, các món dừa và món ăn cay của hòn đảo. Kết hợp tuyệt vời với sườn BBQ và khoai chiên plantain.',
    },
    ideal_for: {
      en: 'Perfect for rum enthusiasts who love tropical classics. An excellent choice for summer parties, tiki gatherings, or anyone seeking an authentic Caribbean experience. The drink is social and shareable, making it ideal for group celebrations.',
      it: "Perfetto per gli appassionati di rum che amano i classici tropicali. Una scelta eccellente per feste estive, riunioni tiki, o per chiunque cerchi un'esperienza caraibica autentica. Il drink è sociale e condivisibile, rendendolo ideale per le celebrazioni di gruppo.",
      vi: 'Hoàn hảo cho những người đam mê rượu rum yêu thích các loại cocktail nhiệt đới cổ điển. Lựa chọn tuyệt vời cho các bữa tiệc mùa hè, các buổi tụ tập tiki hoặc bất kỳ ai tìm kiếm trải nghiệm Caribbean chính thống. Đồ uống mang tính xã hội và chia sẻ, làm cho nó lý tưởng cho các lễ kỷ niệm nhóm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rượu rum đen' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 35, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 35, unit: 'ml' },
      display_name: {
        en: 'Fresh pineapple juice',
        it: 'Succo di ananas fresco',
        vi: 'Nước ép dứa tươi',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Grenadine syrup', it: 'Sciroppo di granatina', vi: 'Xi-rô grenadine' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo di zucchero', vi: 'Xi-rô đường đơn giản' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 3, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitter', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Pour unstrained into a large glass filled with ice (can also strain if preferred).',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Versare non filtrato in un bicchiere grande pieno di ghiaccio (può anche essere filtrato se preferito).',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Đổ không lọc vào ly lớn đầy đá (cũng có thể lọc nếu muốn).',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Pineapple slice, maraschino cherry, and orange slice',
    it: "Fetta di ananas, ciliegia maraschino e fetta d'arancia",
    vi: 'Lát dứa, quả anh đào maraschino và lát cam',
  },

  ice: 'cubed', // Served over ice

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK'],

  flavor_profile: ['tropical', 'citrus', 'sweet'],

  abv_estimate: 12, // ~12% ABV after dilution

  calories_estimate: 210,

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
  occasion_tags: ['party', 'celebration', 'poolside', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['jamaican-planters-punch', 'navy-grog', 'tropical-punch'],

  notes_for_staff:
    'Use fresh juices for best results - never use concentrate. The classic ratio is "one of sour, two of sweet, three of strong, four of weak." Myers\'s Dark Rum is traditional. Garnish generously for tropical presentation. Can be scaled up for party punch bowls.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/planters-punch/',
    notes:
      'IBA Official Recipe. Historical information from the Jamaican newspaper "Fun" (1878) and Myers Rum Distillery archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
