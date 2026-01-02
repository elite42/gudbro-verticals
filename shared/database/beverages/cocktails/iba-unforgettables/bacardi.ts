/**
 * IBA Unforgettables: Bacardi
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bacardi: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f7a8b9c0-1d2e-3f4a-5b6c-7d8e9f0a1b2c',
  slug: 'bacardi',
  stable_key: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',

  name: {
    en: 'Bacardi',
    it: 'Bacardi',
    vi: 'Bacardi',
    ko: '바카디',
    ja: 'バカルディ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'rum', 'citrus', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A crisp, refreshing Cuban classic combining Bacardi rum with fresh lime juice and grenadine. This simple yet elegant cocktail showcases the bright, clean flavors of quality white rum with a perfect balance of citrus and sweetness.',
    it: 'Un classico cubano fresco e rinfrescante che combina rum Bacardi con succo di lime fresco e granatina. Questo cocktail semplice ma elegante mette in mostra i sapori brillanti e puliti di un rum bianco di qualità con un perfetto equilibrio di agrumi e dolcezza.',
    vi: 'Một cocktail cổ điển Cuba sảng khoái, tươi mát kết hợp rượu rum Bacardi với nước cốt chanh tươi và grenadine. Cocktail đơn giản nhưng thanh lịch này thể hiện hương vị sáng, trong sạch của rượu rum trắng chất lượng với sự cân bằng hoàn hảo giữa vị cam quýt và vị ngọt.',
  },

  history: {
    created_year: '1936',
    origin: {
      city: 'New York City',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Bacardi cocktail became famous due to a landmark legal case in 1936. The Bacardi company successfully sued a New York bar for making the drink with non-Bacardi rum, establishing the precedent that a cocktail bearing a brand name must be made with that specific brand. The court ruled that "a Bacardi cocktail made without Bacardi rum is not a Bacardi cocktail." This legal victory cemented both the drink\'s recipe and the brand\'s reputation.',
      it: 'Il cocktail Bacardi divenne famoso grazie a un caso legale storico nel 1936. L\'azienda Bacardi fece causa con successo a un bar di New York per aver preparato il drink con rum non-Bacardi, stabilendo il precedente che un cocktail che porta il nome di un marchio deve essere fatto con quel marchio specifico. La corte stabilì che "un cocktail Bacardi fatto senza rum Bacardi non è un cocktail Bacardi." Questa vittoria legale consolidò sia la ricetta del drink che la reputazione del marchio.',
      vi: 'Cocktail Bacardi trở nên nổi tiếng nhờ một vụ kiện pháp lý mang tính bước ngoặt năm 1936. Công ty Bacardi đã kiện thành công một quán bar ở New York vì làm đồ uống bằng rượu rum không phải Bacardi, thiết lập tiền lệ rằng một cocktail mang tên thương hiệu phải được làm với thương hiệu cụ thể đó. Tòa án phán quyết rằng "một cocktail Bacardi được làm mà không có rượu rum Bacardi không phải là cocktail Bacardi." Chiến thắng pháp lý này củng cố cả công thức đồ uống và danh tiếng của thương hiệu.',
    },
    named_after: {
      en: 'Named after the Bacardi rum brand, which must be used to make an authentic Bacardi cocktail according to the 1936 legal ruling.',
      it: 'Prende il nome dal marchio di rum Bacardi, che deve essere utilizzato per preparare un autentico cocktail Bacardi secondo la sentenza legale del 1936.',
      vi: 'Được đặt theo tên thương hiệu rượu rum Bacardi, phải được sử dụng để tạo ra một cocktail Bacardi chính thống theo phán quyết pháp lý năm 1936.',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'refreshing'],
    description: {
      en: 'Bright and lively with a perfect balance of tart lime and sweet grenadine. The white rum provides a clean, smooth base that allows the citrus to shine while the grenadine adds just enough sweetness and a beautiful pink hue.',
      it: 'Brillante e vivace con un perfetto equilibrio di lime aspro e granatina dolce. Il rum bianco fornisce una base pulita e liscia che permette agli agrumi di brillare mentre la granatina aggiunge la giusta dolcezza e una bellissima tonalità rosa.',
      vi: 'Tươi sáng và sống động với sự cân bằng hoàn hảo giữa vị chua của chanh và vị ngọt của grenadine. Rượu rum trắng cung cấp nền trong sạch, mượt mà cho phép hương vị cam quýt tỏa sáng trong khi grenadine thêm vừa đủ vị ngọt và màu hồng đẹp mắt.',
    },
    first_impression: {
      en: 'Bright lime acidity followed by subtle rum sweetness',
      it: 'Acidità brillante del lime seguita da una sottile dolcezza del rum',
      vi: 'Vị chua tươi sáng của chanh tiếp theo là vị ngọt tinh tế của rượu rum',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus notes',
      it: 'Finale pulito e fresco con note di agrumi persistenti',
      vi: 'Kết thúc trong sạch, sảng khoái với hương vị cam quýt kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between tart and sweet - refreshing without being cloying',
      it: 'Perfettamente bilanciato tra aspro e dolce - rinfrescante senza essere stucchevole',
      vi: 'Cân bằng hoàn hảo giữa vị chua và ngọt - sảng khoái mà không bị ngọt gắt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'late_night'],
    occasions: ['aperitivo', 'party', 'casual', 'summer_drinks'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with Cuban cuisine, ceviche, grilled fish, light appetizers, and tropical fruit. Pairs beautifully with seafood dishes and fresh salads.',
      it: 'Eccellente con cucina cubana, ceviche, pesce alla griglia, antipasti leggeri e frutta tropicale. Si abbina magnificamente con piatti di pesce e insalate fresche.',
      vi: 'Tuyệt vời với ẩm thực Cuba, ceviche, cá nướng, các món khai vị nhẹ và trái cây nhiệt đới. Kết hợp tuyệt vời với các món hải sản và salad tươi.',
    },
    ideal_for: {
      en: 'Perfect for rum enthusiasts who appreciate simple, well-balanced classics. An excellent choice for warm weather drinking or anyone seeking a refreshing, citrus-forward cocktail with historical significance.',
      it: 'Perfetto per gli appassionati di rum che apprezzano i classici semplici e ben bilanciati. Una scelta eccellente per bere quando fa caldo o per chiunque cerchi un cocktail rinfrescante, dominato dagli agrumi e con un significato storico.',
      vi: 'Hoàn hảo cho những người đam mê rượu rum đánh giá cao các loại cocktail cổ điển đơn giản, cân bằng tốt. Lựa chọn tuyệt vời cho thời tiết ấm áp hoặc bất kỳ ai tìm kiếm cocktail sảng khoái, hương vị cam quýt nổi bật với ý nghĩa lịch sử.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Bacardi Carta Blanca rum', it: 'Rum Bacardi Carta Blanca', vi: 'Rượu rum Bacardi Carta Blanca' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Grenadine syrup', it: 'Sciroppo di granatina', vi: 'Xi-rô grenadine' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã được làm lạnh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'None (or lime wheel optional)',
    it: 'Nessuna (o fetta di lime opzionale)',
    vi: 'Không (hoặc lát chanh tùy chọn)',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['citrus', 'sweet', 'refreshing'],

  abv_estimate: 15, // ~15% ABV after dilution

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['aperitivo', 'party', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bacardi-special', 'pink-bacardi'],

  notes_for_staff: 'Must use Bacardi rum according to the famous 1936 legal ruling. Fresh lime juice is essential - never use bottled. Shake vigorously to achieve proper dilution and chill.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/bacardi/',
    note: 'IBA Official Recipe. Historical information from the 1936 New York State Supreme Court case and cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
