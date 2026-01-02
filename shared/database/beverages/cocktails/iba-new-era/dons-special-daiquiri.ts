/**
 * IBA New Era Drinks: Don's Special Daiquiri
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const donsSpecialDaiquiri: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
  slug: 'dons-special-daiquiri',
  stable_key: 'e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',

  name: {
    en: "Don's Special Daiquiri",
    it: "Don's Special Daiquiri",
    vi: "Don's Special Daiquiri",
    ko: '돈스 스페셜 다이키리',
    ja: 'ドンズ・スペシャル・ダイキリ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'daiquiri', 'rum', 'citrus', 'tiki', 'vintage'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated variation on the classic daiquiri featuring grapefruit and maraschino liqueur alongside traditional lime and rum. This refined cocktail adds complexity and depth to the simple daiquiri template while maintaining perfect balance.',
    it: 'Una variazione sofisticata del daiquiri classico con pompelmo e liquore di maraschino insieme a lime e rum tradizionali. Questo cocktail raffinato aggiunge complessità e profondità al semplice schema del daiquiri mantenendo un equilibrio perfetto.',
    vi: 'Một biến thể tinh tế của daiquiri cổ điển với bưởi và rượu mùi maraschino cùng với chanh và rum truyền thống. Cocktail tinh chế này thêm độ phức tạp và chiều sâu cho mẫu daiquiri đơn giản trong khi duy trì sự cân bằng hoàn hảo.',
  },

  history: {
    created_year: '1937',
    origin: {
      city: 'Hollywood',
      bar: "Don the Beachcomber's",
      country: 'USA',
    },
    creator: {
      name: 'Donn Beach (Ernest Raymond Beaumont Gantt)',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Donn Beach (Don the Beachcomber) in 1937 as his personal take on the classic Cuban daiquiri. Don the Beachcomber was known for elevating simple cocktails with sophisticated additions, and this daiquiri showcases his skill. The addition of grapefruit juice and maraschino liqueur transforms the straightforward daiquiri into something more complex and nuanced, while still honoring the original spirit of the drink.',
      it: 'Creato da Donn Beach (Don the Beachcomber) nel 1937 come sua interpretazione personale del classico daiquiri cubano. Don the Beachcomber era noto per elevare cocktail semplici con aggiunte sofisticate, e questo daiquiri mostra la sua abilità. L\'aggiunta di succo di pompelmo e liquore di maraschino trasforma il semplice daiquiri in qualcosa di più complesso e sfumato, onorando comunque lo spirito originale della bevanda.',
      vi: 'Được tạo ra bởi Donn Beach (Don the Beachcomber) năm 1937 như cách hiểu riêng của ông về daiquiri Cuba cổ điển. Don the Beachcomber nổi tiếng với việc nâng cao các cocktail đơn giản bằng những bổ sung tinh tế, và daiquiri này thể hiện kỹ năng của ông. Việc thêm nước bưởi và rượu mùi maraschino biến đổi daiquiri đơn giản thành thứ gì đó phức tạp và tinh tế hơn, trong khi vẫn tôn vinh tinh thần gốc của đồ uống.',
    },
    named_after: {
      en: 'Named "Don\'s Special" after its creator Donn Beach, who put his personal stamp on the classic daiquiri.',
      it: 'Chiamato "Don\'s Special" dal suo creatore Donn Beach, che ha messo il suo timbro personale sul daiquiri classico.',
      vi: 'Được đặt tên "Don\'s Special" theo người tạo ra nó Donn Beach, người đã đặt dấu ấn cá nhân lên daiquiri cổ điển.',
    },
  },

  taste: {
    profile: ['citrus', 'balanced', 'complex', 'refreshing'],
    description: {
      en: 'Perfectly balanced citrus with layers of complexity. The grapefruit adds a sophisticated bitter edge, maraschino brings subtle cherry sweetness and almond notes, while rum and lime provide the classic daiquiri backbone.',
      it: 'Agrumi perfettamente bilanciati con strati di complessità. Il pompelmo aggiunge un sofisticato bordo amaro, il maraschino porta una sottile dolcezza di ciliegia e note di mandorla, mentre rum e lime forniscono la struttura classica del daiquiri.',
      vi: 'Cam chanh cân bằng hoàn hảo với nhiều lớp phức tạp. Bưởi thêm viền đắng tinh tế, maraschino mang vị ngọt cherry tinh tế và nốt hạnh nhân, trong khi rum và chanh cung cấp xương sống daiquiri cổ điển.',
    },
    first_impression: {
      en: 'Bright citrus with grapefruit bitterness and maraschino complexity',
      it: 'Agrumi luminosi con amarezza di pompelmo e complessità di maraschino',
      vi: 'Cam chanh tươi sáng với vị đắng bưởi và độ phức tạp maraschino',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus and subtle almond notes',
      it: 'Finale pulito e rinfrescante con agrumi persistenti e sottili note di mandorla',
      vi: 'Kết thúc trong sạch, sảng khoái với cam chanh kéo dài và nốt hạnh nhân tinh tế',
    },
    balance: {
      en: 'Expertly balanced between sweet, sour, and bitter with perfect spirit integration',
      it: 'Magistralmente bilanciato tra dolce, acido e amaro con perfetta integrazione dello spirito',
      vi: 'Cân bằng chuyên nghiệp giữa ngọt, chua và đắng với sự hòa nhập rượu hoàn hảo',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'aperitif'],
    occasions: ['aperitivo', 'cocktail_party', 'date_night', 'elegant_gathering'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs beautifully with ceviche, grilled fish, citrus salads, oysters, and light Caribbean cuisine.',
      it: 'Si abbina magnificamente con ceviche, pesce alla griglia, insalate di agrumi, ostriche e cucina caraibica leggera.',
      vi: 'Kết hợp tuyệt đẹp với ceviche, cá nướng, salad cam chanh, hàu và ẩm thực Caribbean nhẹ nhàng.',
    },
    ideal_for: {
      en: 'Perfect for rum enthusiasts who appreciate sophisticated daiquiri variations. Ideal for those seeking a complex yet refreshing citrus cocktail. Great for aperitif hour and warm weather occasions.',
      it: 'Perfetto per gli appassionati di rum che apprezzano variazioni sofisticate del daiquiri. Ideale per chi cerca un cocktail di agrumi complesso ma rinfrescante. Ottimo per l\'ora dell\'aperitivo e occasioni con tempo caldo.',
      vi: 'Hoàn hảo cho người đam mê rum đánh giá cao các biến thể daiquiri tinh tế. Lý tưởng cho những ai tìm kiếm cocktail cam chanh phức tạp nhưng sảng khoái. Tuyệt vời cho giờ aperitif và dịp thời tiết ấm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh grapefruit juice', it: 'Succo di pompelmo fresco', vi: 'Nước bưởi tươi' },
    },
    {
      ingredient_id: 'ING_MARASCHINO_LIQUEUR',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Maraschino liqueur', it: 'Liquore di maraschino', vi: 'Rượu mùi maraschino' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled (about 15 seconds). Double strain into a chilled coupe or cocktail glass. Garnish with a grapefruit twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene (circa 15 secondi). Filtrare due volte in una coppa o bicchiere da cocktail raffreddato. Guarnire con una scorza di pompelmo.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ (khoảng 15 giây). Lọc kép vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với vỏ bưởi xoắn.',
  },

  glass: 'Coupe or Cocktail glass',

  garnish: {
    en: 'Grapefruit twist',
    it: 'Scorza di pompelmo',
    vi: 'Vỏ bưởi xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['citrus', 'balanced', 'complex', 'refreshing'],

  abv_estimate: 19,

  calories_estimate: 150,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['aperitivo', 'date_night', 'cocktail_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['hemingway-daiquiri', 'classic-daiquiri'],

  notes_for_staff: 'Fresh citrus juices are essential. Luxardo maraschino is preferred. Double strain to ensure clarity. Grapefruit twist expresses oils over drink before placing. Can adjust sweetness to taste.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/dons-special-daiquiri/',
    note: 'IBA Official Recipe. Created by Donn Beach at Don the Beachcomber\'s, 1937.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
