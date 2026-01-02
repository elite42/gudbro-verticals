/**
 * IBA Unforgettables: Derby
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const derby: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  slug: 'derby',
  stable_key: 'e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',

  name: {
    en: 'Derby',
    it: 'Derby',
    vi: 'Derby',
    ko: '더비',
    ja: 'ダービー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'gin', 'herbal', 'aromatic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated gin cocktail enhanced with peach bitters and fresh mint. The Derby combines botanical gin with aromatic peach notes and herbaceous mint, creating a refined and elegant drinking experience perfect for special occasions.',
    it: 'Un sofisticato cocktail al gin arricchito con bitter alla pesca e menta fresca. Il Derby combina gin botanico con note aromatiche di pesca e menta erbacea, creando un\'esperienza di bevuta raffinata ed elegante perfetta per le occasioni speciali.',
    vi: 'Một loại cocktail gin tinh tế được nâng cao bằng peach bitters và bạc hà tươi. Derby kết hợp gin thực vật với hương thơm đào và bạc hà thảo mộc, tạo ra trải nghiệm uống tinh tế và thanh lịch hoàn hảo cho những dịp đặc biệt.',
  },

  history: {
    created_year: '1890',
    origin: {
      city: 'Louisville',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Derby cocktail is believed to have been created in Louisville, Kentucky, home of the famous Kentucky Derby horse race. The drink was traditionally served during Derby Day celebrations, where the mint garnish pays homage to the equally famous Mint Julep, the official drink of the Kentucky Derby. The addition of peach bitters gives it a Southern charm, as peaches are abundant in the region. Over time, the Derby became a sophisticated alternative to the Mint Julep for those preferring gin over bourbon.',
      it: 'Si ritiene che il cocktail Derby sia stato creato a Louisville, Kentucky, sede della famosa corsa di cavalli Kentucky Derby. Il drink veniva tradizionalmente servito durante le celebrazioni del Derby Day, dove la guarnizione di menta rende omaggio all\'altrettanto famoso Mint Julep, la bevanda ufficiale del Kentucky Derby. L\'aggiunta di bitter alla pesca gli conferisce un fascino del Sud, poiché le pesche sono abbondanti nella regione. Nel tempo, il Derby è diventato un\'alternativa sofisticata al Mint Julep per coloro che preferiscono il gin al bourbon.',
      vi: 'Cocktail Derby được cho là đã được tạo ra ở Louisville, Kentucky, quê hương của cuộc đua ngựa Kentucky Derby nổi tiếng. Đồ uống này theo truyền thống được phục vụ trong các lễ kỷ niệm Derby Day, nơi trang trí bạc hà tôn vinh Mint Julep nổi tiếng không kém, thức uống chính thức của Kentucky Derby. Việc thêm peach bitters mang lại nét quyến rũ miền Nam, vì đào rất phong phú ở vùng này. Theo thời gian, Derby trở thành sự thay thế tinh tế cho Mint Julep đối với những người thích gin hơn bourbon.',
    },
    named_after: {
      en: 'Named after the Kentucky Derby, one of the most prestigious horse racing events in the United States, held annually in Louisville since 1875.',
      it: 'Prende il nome dal Kentucky Derby, uno degli eventi di corse di cavalli più prestigiosi degli Stati Uniti, che si tiene ogni anno a Louisville dal 1875.',
      vi: 'Được đặt theo tên Kentucky Derby, một trong những sự kiện đua ngựa uy tín nhất ở Hoa Kỳ, được tổ chức hàng năm tại Louisville từ năm 1875.',
    },
  },

  taste: {
    profile: ['herbal', 'aromatic', 'botanical'],
    description: {
      en: 'Complex and aromatic with bright gin botanicals complemented by subtle peach sweetness and refreshing mint. The peach bitters add depth and a fruity-floral dimension, while the mint provides a cooling, herbaceous finish.',
      it: 'Complesso e aromatico con botanici di gin brillanti completati da una sottile dolcezza di pesca e menta rinfrescante. I bitter alla pesca aggiungono profondità e una dimensione fruttata-floreale, mentre la menta fornisce un finale rinfrescante ed erbaceo.',
      vi: 'Phức tạp và thơm với các thành phần thực vật của gin tươi sáng được bổ sung bởi vị ngọt đào tinh tế và bạc hà sảng khoái. Peach bitters thêm chiều sâu và chiều hướng trái cây-hoa, trong khi bạc hà mang lại hậu vị mát lạnh, thảo mộc.',
    },
    first_impression: {
      en: 'Juniper and botanical notes with a hint of peach sweetness',
      it: 'Note di ginepro e botaniche con un accenno di dolcezza di pesca',
      vi: 'Hương hạt bách xù và thực vật với chút ngọt đào',
    },
    finish: {
      en: 'Refreshing minty finish with lingering peach and herbal notes',
      it: 'Finale rinfrescante alla menta con note persistenti di pesca ed erbe',
      vi: 'Kết thúc bạc hà sảng khoái với hương đào và thảo mộc kéo dài',
    },
    balance: {
      en: 'Well-balanced between botanical complexity and fruit-forward sweetness',
      it: 'Ben bilanciato tra complessità botanica e dolcezza fruttata',
      vi: 'Cân bằng tốt giữa độ phức tạp thực vật và vị ngọt trái cây',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['celebration', 'special_event', 'formal', 'spring_racing'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with Southern cuisine, grilled peaches, prosciutto and melon, herb-crusted chicken, and fresh fruit tarts. Pairs beautifully with light appetizers and garden salads.',
      it: 'Eccellente con cucina del Sud, pesche grigliate, prosciutto e melone, pollo in crosta di erbe e crostate di frutta fresca. Si abbina magnificamente con antipasti leggeri e insalate di stagione.',
      vi: 'Tuyệt vời với ẩm thực miền Nam, đào nướng, dưa hấu và giăm bông, gà nướng thảo mộc và bánh tart trái cây tươi. Kết hợp tuyệt vời với các món khai vị nhẹ và salad vườn.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who appreciate sophisticated, aromatic cocktails. An excellent choice for Kentucky Derby parties, spring celebrations, or anyone seeking a refined alternative to more common gin classics.',
      it: 'Perfetto per gli amanti del gin che apprezzano cocktail sofisticati e aromatici. Una scelta eccellente per le feste del Kentucky Derby, le celebrazioni primaverili o per chiunque cerchi un\'alternativa raffinata ai classici del gin più comuni.',
      vi: 'Hoàn hảo cho những người yêu gin đánh giá cao cocktail tinh tế, thơm ngát. Lựa chọn tuyệt vời cho các bữa tiệc Kentucky Derby, lễ kỷ niệm mùa xuân hoặc bất kỳ ai tìm kiếm sự thay thế tinh tế cho các cocktail gin cổ điển phổ biến hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_PEACH_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Peach bitters', it: 'Bitter alla pesca', vi: 'Peach bitters' },
    },
    {
      ingredient_id: 'ING_MINT_LEAVES',
      quantity: { amount: 2, unit: 'leaves' },
      display_name: { en: 'Fresh mint leaves', it: 'Foglie di menta fresca', vi: 'Lá bạc hà tươi' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass filled with ice. Stir well until properly chilled. Strain into a chilled cocktail glass. Garnish with fresh mint leaves.',
    it: 'Versare tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare bene fino a raffreddare adeguatamente. Filtrare in una coppa da cocktail raffreddata. Guarnire con foglie di menta fresca.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn đầy đá. Khuấy đều cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã được làm lạnh. Trang trí bằng lá bạc hà tươi.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Fresh mint leaves',
    it: 'Foglie di menta fresca',
    vi: 'Lá bạc hà tươi',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['herbal', 'aromatic', 'botanical'],

  abv_estimate: 28, // ~28% ABV after dilution

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  occasion_tags: ['celebration', 'special_event', 'formal'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['derby-daisy', 'kentucky-derby'],

  notes_for_staff: 'Use fresh mint leaves - gently press before adding to release oils. Peach bitters are essential for authentic flavor. Can substitute with Angostura bitters if peach bitters unavailable, though flavor will differ.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/derby/',
    note: 'IBA Official Recipe. Historical information from Kentucky Derby traditions and cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
