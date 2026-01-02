/**
 * Famous Cocktails: Pegu Club
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const peguClub: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f3a4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c',
  slug: 'pegu-club',
  stable_key: 'm3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2',

  name: {
    en: 'Pegu Club',
    it: 'Pegu Club',
    vi: 'Pegu Club',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'citrus', 'colonial', 'exotic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An exotic gin sour from British Colonial Burma. The Pegu Club combines gin with orange curaçao, lime juice, and aromatic bitters for a sophisticated, citrus-forward cocktail with a touch of tropical intrigue. Named after the legendary gentlemen\'s club in Rangoon, it\'s a taste of colonial elegance.',
    it: 'Un esotico gin sour dalla Birmania coloniale britannica. Il Pegu Club combina gin con curaçao all\'arancia, succo di lime e bitter aromatici per un cocktail sofisticato e incentrato sugli agrumi con un tocco di intrigo tropicale. Prende il nome dal leggendario club dei gentiluomini a Rangoon, è un assaggio di eleganza coloniale.',
    vi: 'Một loại gin sour kỳ lạ từ Burma thuộc địa Anh. Pegu Club kết hợp gin với orange curaçao, nước cốt chanh và bitter thơm cho một cocktail tinh tế, hướng cam quýt với chút bí ẩn nhiệt đới. Được đặt theo tên câu lạc bộ quý ông huyền thoại ở Rangoon, đây là hương vị của sự thanh lịch thuộc địa.',
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Rangoon (Yangon)',
      bar: 'Pegu Club',
      country: 'Burma (Myanmar)',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Pegu Club cocktail was created at the legendary Pegu Club, a colonial-era gentlemen\'s club in Rangoon (now Yangon), Burma (now Myanmar), established in the 1880s. The club, named after the nearby Pegu River, was the social center for British colonial officers and elite expatriates. The cocktail first appeared in print in Harry MacElhone\'s "Harry\'s ABC of Mixing Cocktails" (1922) and later in Harry Craddock\'s "The Savoy Cocktail Book" (1930). The drink embodies the exotic sophistication of British colonial bar culture - a gin sour elevated with orange liqueur and bitters. After World War II, the Pegu Club fell into decline, and the cocktail became obscure. It was revived in the 2000s when Audrey Saunders opened a New York cocktail bar named "Pegu Club" in its honor, reintroducing this forgotten classic to modern drinkers.',
      it: 'Il cocktail Pegu Club fu creato al leggendario Pegu Club, un club coloniale per gentiluomini a Rangoon (ora Yangon), Birmania (ora Myanmar), fondato negli anni 1880. Il club, che prende il nome dal vicino fiume Pegu, era il centro sociale per gli ufficiali coloniali britannici e gli espatriati d\'élite. Il cocktail apparve per la prima volta in stampa in "Harry\'s ABC of Mixing Cocktails" di Harry MacElhone (1922) e successivamente nel "The Savoy Cocktail Book" di Harry Craddock (1930). La bevanda incarna la sofisticazione esotica della cultura dei bar coloniali britannici - un gin sour elevato con liquore all\'arancia e bitter. Dopo la seconda guerra mondiale, il Pegu Club declinò e il cocktail divenne oscuro. Fu riportato in vita negli anni 2000 quando Audrey Saunders aprì un bar cocktail a New York chiamato "Pegu Club" in suo onore, reintroducendo questo classico dimenticato ai bevitori moderni.',
      vi: 'Cocktail Pegu Club được tạo ra tại câu lạc bộ Pegu huyền thoại, một câu lạc bộ quý ông thời thuộc địa ở Rangoon (nay là Yangon), Burma (nay là Myanmar), được thành lập vào những năm 1880. Câu lạc bộ được đặt theo tên sông Pegu gần đó, là trung tâm xã hội cho các sĩ quan thuộc địa Anh và người nước ngoài ưu tú. Cocktail lần đầu xuất hiện trên ấn phẩm trong "Harry\'s ABC of Mixing Cocktails" của Harry MacElhone (1922) và sau đó trong "The Savoy Cocktail Book" của Harry Craddock (1930). Thức uống thể hiện sự tinh tế kỳ lạ của văn hóa quầy bar thuộc địa Anh - một gin sour được nâng cao với rượu cam và bitter. Sau Thế chiến II, Pegu Club suy thoái, và cocktail trở nên mờ nhạt. Nó được hồi sinh vào những năm 2000 khi Audrey Saunders mở một quán bar cocktail ở New York có tên "Pegu Club" để vinh danh nó, giới thiệu lại tác phẩm kinh điển bị lãng quên này cho người uống hiện đại.',
    },
    named_after: {
      en: 'Named after the Pegu Club, a famous colonial-era gentlemen\'s club in Rangoon, Burma, which was named after the Pegu River.',
      it: 'Prende il nome dal Pegu Club, un famoso club coloniale per gentiluomini a Rangoon, Birmania, che prendeva il nome dal fiume Pegu.',
      vi: 'Được đặt theo tên Pegu Club, một câu lạc bộ quý ông thời thuộc địa nổi tiếng ở Rangoon, Burma, được đặt theo tên sông Pegu.',
    },
  },

  taste: {
    profile: ['citrus', 'bitter', 'sophisticated'],
    description: {
      en: 'Crisp, citrusy, and elegantly bitter. The Pegu Club balances gin\'s botanicals with bright lime acidity, orange curaçao\'s sweetness, and the aromatic complexity of bitters. It\'s a more sophisticated, exotic take on the classic gin sour.',
      it: 'Croccante, agrumato ed elegantemente amaro. Il Pegu Club bilancia i botanici del gin con l\'acidità brillante del lime, la dolcezza del curaçao all\'arancia e la complessità aromatica dei bitter. È una versione più sofisticata ed esotica del classico gin sour.',
      vi: 'Giòn, cam quýt và đắng thanh lịch. Pegu Club cân bằng thực vật của gin với độ chua chanh tươi sáng, vị ngọt của orange curaçao và sự phức tạp thơm của bitter. Đây là phiên bản tinh tế hơn, kỳ lạ hơn của gin sour cổ điển.',
    },
    first_impression: {
      en: 'Sharp lime acidity with orange sweetness, followed by gin botanicals and aromatic bitters',
      it: 'Acidità tagliente del lime con dolcezza dell\'arancia, seguita da botanici del gin e bitter aromatici',
      vi: 'Độ chua chanh sắc nét với vị ngọt cam, theo sau là thực vật gin và bitter thơm',
    },
    finish: {
      en: 'Clean, crisp finish with lingering lime, orange, and subtle bitter spice',
      it: 'Finale pulito e croccante con lime persistente, arancia e sottile spezia amara',
      vi: 'Kết thúc sạch, giòn với chanh kéo dài, cam và gia vị đắng tinh tế',
    },
    balance: {
      en: 'Perfectly balanced between tart lime, sweet orange, and aromatic bitters - sophisticated and complex',
      it: 'Perfettamente bilanciato tra lime aspro, arancia dolce e bitter aromatici - sofisticato e complesso',
      vi: 'Cân bằng hoàn hảo giữa chanh chua, cam ngọt và bitter thơm - tinh tế và phức tạp',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['aperitivo', 'sophisticated', 'date_night', 'colonial_theme'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Pairs beautifully with Southeast Asian cuisine, Indian dishes, curry, grilled seafood, and spicy appetizers. Also excellent with British colonial fare and afternoon tea snacks.',
      it: 'Si abbina magnificamente con la cucina del sud-est asiatico, piatti indiani, curry, frutti di mare alla griglia e antipasti piccanti. Eccellente anche con piatti coloniali britannici e snack del tè pomeridiano.',
      vi: 'Kết hợp tuyệt đẹp với ẩm thực Đông Nam Á, món Ấn Độ, cà ri, hải sản nướng và món khai vị cay. Cũng tuyệt vời với món thuộc địa Anh và đồ ăn nhẹ trà chiều.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who appreciate citrus-forward sours with complexity. Ideal for cocktail historians and those who enjoy exotic, colonial-era drinks. A sophisticated choice for tropical or Asian-themed gatherings.',
      it: 'Perfetto per gli amanti del gin che apprezzano i sour incentrati sugli agrumi con complessità. Ideale per storici dei cocktail e chi ama bevande esotiche dell\'era coloniale. Una scelta sofisticata per riunioni a tema tropicale o asiatico.',
      vi: 'Hoàn hảo cho người yêu gin đánh giá cao sours hướng cam quýt với sự phức tạp. Lý tưởng cho nhà sử học cocktail và những ai thích đồ uống kỳ lạ thời thuộc địa. Lựa chọn tinh tế cho các buổi họp mặt chủ đề nhiệt đới hoặc châu Á.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_ORANGE_CURACAO',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Orange curaçao', it: 'Curaçao all\'arancia', vi: 'Orange curaçao' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
    {
      ingredient_id: 'ING_ORANGE_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Orange bitters', it: 'Orange bitters', vi: 'Orange bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled cocktail glass. Garnish with a lime wheel or twist.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una rondella o scorza di lime.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí với lát hoặc vỏ chanh xoắn.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Lime wheel or twist',
    it: 'Rondella o scorza di lime',
    vi: 'Lát hoặc vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'bitter', 'sophisticated'],

  abv_estimate: 24,

  calories_estimate: 165,

  difficulty: 'medium',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'nut_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'sophisticated', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['modern-pegu-club', 'rangoon-ruby'],

  notes_for_staff: 'Always use fresh lime juice. Both Angostura and orange bitters are essential - don\'t skip either. Pierre Ferrand Dry Curaçao or Cointreau work best. Shake hard to properly chill and dilute. The classic ratio is roughly 8:3:3 (gin:curaçao:lime).',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1617/pegu-club',
    note: 'Classic recipe from The Savoy Cocktail Book (1930) and Harry\'s ABC of Mixing Cocktails (1922).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
