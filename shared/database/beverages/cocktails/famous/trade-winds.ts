/**
 * Famous Cocktails: Trade Winds
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tradeWinds: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  slug: 'trade-winds',
  stable_key: 'trade-winds-tiki-tropical-famous-2025',

  name: {
    en: 'Trade Winds',
    it: 'Venti Alisei',
    vi: 'Trade Winds',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'plum', 'exotic', 'classic-tiki'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated tiki cocktail featuring rum, plum brandy, and tropical citrus. The Trade Winds offers a complex blend of sweet, tart, and fruity flavors with an exotic plum character that sets it apart from typical tiki drinks.',
    it: 'Un sofisticato cocktail tiki con rum, brandy alla prugna e agrumi tropicali. Il Venti Alisei offre una miscela complessa di sapori dolci, aspri e fruttati con un esotico carattere di prugna che lo distingue dai tipici drink tiki.',
    vi: 'Một loại cocktail tiki tinh tế với rum, rượu mận và cam quýt nhiệt đới. Trade Winds mang đến sự pha trộn phức tạp của hương vị ngọt, chua và trái cây với đặc tính mận kỳ lạ làm nó khác biệt với đồ uống tiki thông thường.',
  },

  history: {
    created_year: '1940s',
    origin: {
      city: 'Oakland',
      bar: 'Trader Vic\'s',
      country: 'USA',
    },
    creator: {
      name: 'Victor Bergeron (Trader Vic)',
      profession: 'bartender',
    },
    story: {
      en: 'The Trade Winds was created by Victor "Trader Vic" Bergeron in the 1940s at his legendary Trader Vic\'s restaurant in Oakland, California. As one of the pioneers of tiki culture alongside Don the Beachcomber, Trader Vic crafted this cocktail to showcase the exotic flavors that defined his establishment. The drink\'s name references the prevailing winds that blow from east to west near the equator, essential for historical maritime trade routes - a fitting tribute to the exotic ingredients and Polynesian-inspired culture that tiki bars celebrated. Unlike many tiki drinks that rely heavily on tropical fruit juices, the Trade Winds stands out with its sophisticated use of plum brandy (slivovitz), creating a more complex, less sweet profile.',
      it: 'Il Venti Alisei fu creato da Victor "Trader Vic" Bergeron negli anni \'40 nel suo leggendario ristorante Trader Vic\'s a Oakland, California. Come uno dei pionieri della cultura tiki insieme a Don the Beachcomber, Trader Vic creò questo cocktail per mostrare i sapori esotici che definivano il suo locale. Il nome della bevanda fa riferimento ai venti prevalenti che soffiano da est a ovest vicino all\'equatore, essenziali per le rotte commerciali marittime storiche - un tributo appropriato agli ingredienti esotici e alla cultura ispirata polinesiana che i bar tiki celebravano. A differenza di molti drink tiki che si basano fortemente sui succhi di frutta tropicale, il Venti Alisei si distingue per il suo uso sofisticato del brandy alla prugna (slivovitz), creando un profilo più complesso e meno dolce.',
      vi: 'Trade Winds được tạo ra bởi Victor "Trader Vic" Bergeron vào những năm 1940 tại nhà hàng huyền thoại Trader Vic\'s ở Oakland, California. Là một trong những người tiên phong của văn hóa tiki cùng với Don the Beachcomber, Trader Vic đã tạo ra cocktail này để giới thiệu hương vị kỳ lạ xác định cơ sở của ông. Tên của thức uống tham chiếu đến những làn gió thịnh hành thổi từ đông sang tây gần xích đạo, cần thiết cho các tuyến đường thương mại hàng hải lịch sử - một sự tôn vinh phù hợp cho các thành phần kỳ lạ và văn hóa lấy cảm hứng từ Polynesia mà các quán bar tiki kỷ niệm. Không giống như nhiều đồ uống tiki phụ thuộc nhiều vào nước ép trái cây nhiệt đới, Trade Winds nổi bật với việc sử dụng rượu mận tinh tế (slivovitz), tạo ra một hồ sơ phức tạp hơn, ít ngọt hơn.',
    },
    named_after: {
      en: 'Named after the trade winds - prevailing tropical winds near the equator that were essential for historical maritime trade routes, symbolizing exotic travel and cultural exchange.',
      it: 'Prende il nome dai venti alisei - venti tropicali prevalenti vicino all\'equatore che erano essenziali per le rotte commerciali marittime storiche, simboleggiando viaggi esotici e scambi culturali.',
      vi: 'Được đặt theo tên gió mậu dịch - gió nhiệt đới thịnh hành gần xích đạo rất cần thiết cho các tuyến đường thương mại hàng hải lịch sử, tượng trưng cho du lịch kỳ lạ và trao đổi văn hóa.',
    },
  },

  taste: {
    profile: ['fruity', 'tart', 'complex'],
    description: {
      en: 'Complex and sophisticated with tart citrus, exotic plum notes, and rum warmth. The plum brandy provides an unusual fruity depth that elevates this beyond standard tiki fare. Balanced between sweet and sour with intriguing complexity.',
      it: 'Complesso e sofisticato con agrumi aspri, note esotiche di prugna e calore del rum. Il brandy alla prugna fornisce una profondità fruttata insolita che eleva questo oltre la tariffa tiki standard. Bilanciato tra dolce e aspro con complessità intrigante.',
      vi: 'Phức tạp và tinh tế với cam quýt chua, hương mận kỳ lạ và sự ấm áp của rum. Rượu mận cung cấp chiều sâu trái cây khác thường nâng nó lên trên mức tiki tiêu chuẩn. Cân bằng giữa ngọt và chua với sự phức tạp hấp dẫn.',
    },
    first_impression: {
      en: 'Bright citrus with unexpected exotic plum and spice notes',
      it: 'Agrumi luminosi con inaspettate note esotiche di prugna e spezie',
      vi: 'Cam quýt tươi sáng với hương mận và gia vị kỳ lạ bất ngờ',
    },
    finish: {
      en: 'Long, complex finish with lingering plum, rum warmth, and citrus brightness',
      it: 'Finale lungo e complesso con prugna persistente, calore del rum e luminosità agrumata',
      vi: 'Kết thúc dài, phức tạp với mận kéo dài, sự ấm áp của rum và độ tươi sáng của cam quýt',
    },
    balance: {
      en: 'Beautifully balanced between sweet, sour, and bitter - more complex and less sweet than typical tiki drinks',
      it: 'Magnificamente bilanciato tra dolce, aspro e amaro - più complesso e meno dolce dei tipici drink tiki',
      vi: 'Cân bằng tuyệt đẹp giữa ngọt, chua và đắng - phức tạp hơn và ít ngọt hơn đồ uống tiki thông thường',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['tiki_bar', 'cocktail_appreciation', 'date_night', 'special_occasion'],
    seasons: ['summer', 'spring', 'year_round'],
    food_pairings: {
      en: 'Pairs excellently with grilled pork, duck, Asian plum sauce dishes, tropical fruit platters, or Polynesian-style cuisine. Also complements spicy Thai or Vietnamese dishes.',
      it: 'Si abbina eccellentemente con maiale alla griglia, anatra, piatti con salsa di prugne asiatica, piatti di frutta tropicale o cucina in stile polinesiano. Complementa anche piatti tailandesi o vietnamiti piccanti.',
      vi: 'Kết hợp tuyệt vời với thịt lợn nướng, vịt, các món ăn với nước sốt mận Châu Á, đĩa trái cây nhiệt đới hoặc ẩm thực kiểu Polynesia. Cũng bổ sung cho các món Thái hoặc Việt cay.',
    },
    ideal_for: {
      en: 'Perfect for tiki enthusiasts seeking something more sophisticated than typical tropical drinks. Ideal for cocktail connoisseurs who appreciate complexity and balance. A great choice for those who find standard tiki drinks too sweet.',
      it: 'Perfetto per gli appassionati di tiki che cercano qualcosa di più sofisticato delle tipiche bevande tropicali. Ideale per intenditori di cocktail che apprezzano complessità e equilibrio. Un\'ottima scelta per chi trova i drink tiki standard troppo dolci.',
      vi: 'Hoàn hảo cho những người đam mê tiki tìm kiếm thứ gì đó tinh tế hơn đồ uống nhiệt đới thông thường. Lý tưởng cho những người sành cocktail đánh giá cao sự phức tạp và cân bằng. Lựa chọn tuyệt vời cho những ai thấy đồ uống tiki tiêu chuẩn quá ngọt.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_GOLD',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gold rum', it: 'Rum oro', vi: 'Rum vàng' },
    },
    {
      ingredient_id: 'ING_PLUM_BRANDY',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Plum brandy (slivovitz)', it: 'Brandy alla prugna (slivovitz)', vi: 'Rượu mận (slivovitz)' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 22, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_ORGEAT',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Orgeat syrup', it: 'Sciroppo di orzata', vi: 'Siro orgeat' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a tiki mug or old fashioned glass filled with crushed ice. Garnish with lime wheel and fresh mint sprig.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una tazza tiki o un bicchiere old fashioned pieno di ghiaccio tritato. Guarnire con rotella di lime e rametto di menta fresca.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh hoàn toàn. Lọc vào cốc tiki hoặc ly old fashioned đầy đá nghiền. Trang trí với lát chanh tròn và cành bạc hà tươi.',
  },

  glass: 'Tiki mug / Old fashioned glass',

  garnish: {
    en: 'Lime wheel and fresh mint sprig',
    it: 'Rotella di lime e rametto di menta fresca',
    vi: 'Lát chanh tròn và cành bạc hà tươi',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_GOLD'],

  flavor_profile: ['fruity', 'tart', 'complex'],

  abv_estimate: 16,

  calories_estimate: 200,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['summer', 'spring', 'year_round'],
  occasion_tags: ['tiki_bar', 'cocktail_appreciation', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['trader-vic-original'],

  notes_for_staff: 'Classic Trader Vic\'s creation. Plum brandy (slivovitz) is essential - don\'t substitute. Orgeat contains almonds. Less sweet than typical tiki drinks - appeals to sophisticated palates. Fresh juices crucial for balance.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.smugglerscovesf.com/store/smugglers-cove-exotic-cocktails-rum-and-the-cult-of-tiki',
    note: 'Classic Trader Vic recipe. From tiki cocktail history archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
