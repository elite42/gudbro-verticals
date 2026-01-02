/**
 * IBA New Era Drinks: Paper Plane
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const paperPlane: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
  slug: 'paper-plane',
  stable_key: 'b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',

  name: {
    en: 'Paper Plane',
    it: 'Paper Plane',
    vi: 'Paper Plane',
    ko: '페이퍼 플레인',
    ja: 'ペーパー・プレーン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'whiskey', 'amaro', 'balanced', 'contemporary'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern classic featuring bourbon, Aperol, Amaro Nonino, and lemon juice in equal parts. This perfectly balanced cocktail combines bitter, sweet, and sour elements with whiskey warmth, creating an incredibly drinkable and sophisticated drink that has become a contemporary favorite.',
    it: 'Un classico moderno con bourbon, Aperol, Amaro Nonino e succo di limone in parti uguali. Questo cocktail perfettamente bilanciato combina elementi amari, dolci e acidi con il calore del whiskey, creando una bevanda incredibilmente bevibile e sofisticata che è diventata una favorita contemporanea.',
    vi: 'Một tác phẩm hiện đại với bourbon, Aperol, Amaro Nonino và nước chanh trong tỷ lệ bằng nhau. Cocktail cân bằng hoàn hảo này kết hợp các yếu tố đắng, ngọt và chua với hơi ấm whiskey, tạo ra đồ uống cực kỳ dễ uống và tinh tế đã trở thành món yêu thích đương đại.',
  },

  history: {
    created_year: '2008',
    origin: {
      city: 'Chicago',
      bar: 'The Violet Hour',
      country: 'USA',
    },
    creator: {
      name: 'Sam Ross',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Sam Ross at The Violet Hour in Chicago in 2008, inspired by the M.I.A. song "Paper Planes." Ross wanted to create a Last Word variation using bourbon instead of gin. The equal-parts formula (¾ oz of each ingredient) creates perfect harmony between bourbon\'s sweetness, Aperol\'s bitter orange, Amaro Nonino\'s complex herbal notes, and lemon\'s acidity. The drink spread rapidly through cocktail bars worldwide and became one of the defining cocktails of the craft cocktail renaissance.',
      it: 'Creato da Sam Ross al The Violet Hour di Chicago nel 2008, ispirato dalla canzone "Paper Planes" di M.I.A. Ross voleva creare una variazione del Last Word usando bourbon invece di gin. La formula a parti uguali (22,5 ml di ogni ingrediente) crea un\'armonia perfetta tra la dolcezza del bourbon, l\'arancia amara dell\'Aperol, le note erbacee complesse dell\'Amaro Nonino e l\'acidità del limone. La bevanda si diffuse rapidamente nei cocktail bar di tutto il mondo e divenne uno dei cocktail più significativi del rinascimento dei cocktail artigianali.',
      vi: 'Được tạo ra bởi Sam Ross tại The Violet Hour ở Chicago năm 2008, lấy cảm hứng từ bài hát "Paper Planes" của M.I.A. Ross muốn tạo một biến thể Last Word sử dụng bourbon thay vì gin. Công thức tỷ lệ bằng nhau (22,5 ml mỗi nguyên liệu) tạo sự hài hòa hoàn hảo giữa vị ngọt bourbon, cam đắng Aperol, nốt thảo mộc phức tạp Amaro Nonino và độ chua chanh. Đồ uống lan rộng nhanh chóng qua các quầy bar cocktail toàn thế giới và trở thành một trong những cocktail định nghĩa của thời kỳ phục hưng cocktail thủ công.',
    },
    named_after: {
      en: 'Named after the M.I.A. song "Paper Planes" which was playing when Sam Ross created the drink.',
      it: 'Prende il nome dalla canzone "Paper Planes" di M.I.A. che suonava quando Sam Ross creò la bevanda.',
      vi: 'Được đặt tên theo bài hát "Paper Planes" của M.I.A. đang phát khi Sam Ross tạo ra đồ uống.',
    },
  },

  taste: {
    profile: ['balanced', 'bitter', 'citrus', 'complex'],
    description: {
      en: 'Perfectly harmonious with bourbon\'s caramel and vanilla notes balanced by Aperol\'s bitter orange, Amaro Nonino\'s herbal complexity, and bright lemon acidity. No single element dominates, creating a beautifully integrated whole that\'s both sophisticated and approachable.',
      it: 'Perfettamente armonioso con le note di caramello e vaniglia del bourbon bilanciate dall\'arancia amara dell\'Aperol, dalla complessità erbacea dell\'Amaro Nonino e dalla vivace acidità del limone. Nessun elemento singolo domina, creando un insieme magnificamente integrato che è sia sofisticato che accessibile.',
      vi: 'Hài hòa hoàn hảo với nốt caramel và vani của bourbon cân bằng bởi cam đắng Aperol, độ phức tạp thảo mộc Amaro Nonino và độ chua chanh tươi sáng. Không có yếu tố đơn lẻ nào chi phối, tạo ra tổng thể hòa nhập tuyệt đẹp vừa tinh tế vừa dễ tiếp cận.',
    },
    first_impression: {
      en: 'Balanced bitter-sweet with bourbon warmth and citrus brightness',
      it: 'Amaro-dolce bilanciato con calore di bourbon e luminosità di agrumi',
      vi: 'Đắng ngọt cân bằng với hơi ấm bourbon và độ tươi sáng cam chanh',
    },
    finish: {
      en: 'Clean, lingering finish with herbal bitterness and whiskey warmth',
      it: 'Finale pulito e persistente con amarezza erbacea e calore di whiskey',
      vi: 'Kết thúc trong sạch, kéo dài với vị đắng thảo mộc và hơi ấm whiskey',
    },
    balance: {
      en: 'Exemplary balance - the equal parts formula creates perfect harmony between all elements',
      it: 'Equilibrio esemplare - la formula a parti uguali crea un\'armonia perfetta tra tutti gli elementi',
      vi: 'Sự cân bằng mẫu mực - công thức tỷ lệ bằng nhau tạo sự hài hòa hoàn hảo giữa tất cả các yếu tố',
    },
  },

  recommendations: {
    best_time: ['evening', 'aperitif', 'after_dinner'],
    occasions: ['aperitivo', 'cocktail_party', 'date_night', 'casual_elegance'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with charcuterie, aged cheeses, grilled meats, Italian antipasti, and roasted vegetables.',
      it: 'Eccellente con salumi, formaggi stagionati, carni alla griglia, antipasti italiani e verdure arrosto.',
      vi: 'Tuyệt vời với thịt nguội, phô mai ủ, thịt nướng, antipasti Ý và rau nướng.',
    },
    ideal_for: {
      en: 'Perfect for bourbon and amaro lovers seeking a balanced modern classic. Ideal for those who appreciate bitter flavors in harmony with whiskey. Great as an aperitif or digestif.',
      it: 'Perfetto per gli amanti di bourbon e amaro che cercano un classico moderno bilanciato. Ideale per chi apprezza sapori amari in armonia con il whiskey. Ottimo come aperitivo o digestivo.',
      vi: 'Hoàn hảo cho người yêu bourbon và amaro tìm kiếm tác phẩm hiện đại cân bằng. Lý tưởng cho những ai đánh giá cao hương vị đắng hài hòa với whiskey. Tuyệt vời làm aperitif hoặc digestif.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Bourbon', it: 'Bourbon', vi: 'Bourbon' },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Aperol', it: 'Aperol', vi: 'Aperol' },
    },
    {
      ingredient_id: 'ING_AMARO_NONINO',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Amaro Nonino', it: 'Amaro Nonino', vi: 'Amaro Nonino' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled (about 15 seconds). Double strain into a chilled coupe or Nick & Nora glass. No garnish needed - the drink speaks for itself.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene (circa 15 secondi). Filtrare due volte in una coppa o bicchiere Nick & Nora raffreddato. Nessuna guarnizione necessaria - la bevanda parla da sola.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ (khoảng 15 giây). Lọc kép vào ly coupe hoặc Nick & Nora đã làm lạnh. Không cần trang trí - đồ uống tự nói lên điều đó.',
  },

  glass: 'Coupe or Nick & Nora glass',

  garnish: {
    en: 'None (optional: lemon twist)',
    it: 'Nessuna (opzionale: scorza di limone)',
    vi: 'Không có (tùy chọn: vỏ chanh xoắn)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['balanced', 'bitter', 'citrus', 'complex'],

  abv_estimate: 21,

  calories_estimate: 160,

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
  occasion_tags: ['aperitivo', 'date_night', 'cocktail_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['rye-paper-plane', 'mezcal-paper-plane'],

  notes_for_staff: 'Equal parts (¾ oz each) is essential for balance. Amaro Nonino is critical - do not substitute. Fresh lemon juice required. Double strain for clarity. Some prefer rye whiskey for extra spice.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/paper-plane/',
    note: 'IBA Official Recipe. Created by Sam Ross at The Violet Hour, Chicago, 2008.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
