/**
 * Famous Cocktails: Kamikaze
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const kamikaze: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-6f78-9012-bc23-de45fg678901',
  slug: 'kamikaze',
  stable_key: 'kamikaze_shot_famous_citrus_vodka',

  name: {
    en: 'Kamikaze',
    it: 'Kamikaze',
    vi: 'Kamikaze',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'citrus', 'vodka', 'sour'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A powerful and tart shooter made with vodka, triple sec, and lime juice. This classic shot delivers a strong citrus punch that lives up to its bold name.',
    it: "Uno shooter potente e aspro fatto con vodka, triple sec e succo di lime. Questo shot classico offre un forte pugno di agrumi che è all'altezza del suo nome audace.",
    vi: 'Một loại shooter mạnh mẽ và chua được làm từ vodka, triple sec và nước cốt chanh. Shot cổ điển này mang đến cú đấm cam chanh mạnh mẽ xứng đáng với cái tên táo bạo của nó.',
  },

  history: {
    created_year: '1970s',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    story: {
      en: 'The Kamikaze shot emerged in the United States during the 1970s. Its exact origins are unclear, but it quickly became a popular shooter at bars and nightclubs. The drink is essentially a lime-forward variation of the classic Sidecar cocktail, adapted into shot form.',
      it: "Lo shot Kamikaze è emerso negli Stati Uniti durante gli anni '70. Le sue origini esatte non sono chiare, ma è diventato rapidamente uno shooter popolare nei bar e nelle discoteche. La bevanda è essenzialmente una variazione con lime del classico cocktail Sidecar, adattata in forma di shot.",
      vi: 'Shot Kamikaze xuất hiện ở Hoa Kỳ trong những năm 1970. Nguồn gốc chính xác của nó không rõ ràng, nhưng nó nhanh chóng trở thành shooter phổ biến tại các quán bar và hộp đêm. Thức uống về cơ bản là một biến thể hướng chanh của cocktail Sidecar cổ điển, được điều chỉnh thành dạng shot.',
    },
    named_after: {
      en: "Named after the Japanese kamikaze pilots of World War II, reflecting the shot's bold and intense nature.",
      it: 'Prende il nome dai piloti kamikaze giapponesi della seconda guerra mondiale, riflettendo la natura audace e intensa dello shot.',
      vi: 'Được đặt theo tên của các phi công kamikaze Nhật Bản trong Thế chiến II, phản ánh bản chất táo bạo và mạnh mẽ của shot.',
    },
  },

  taste: {
    profile: ['sour', 'citrus', 'strong'],
    description: {
      en: 'Sharp and citrus-forward with a clean vodka backbone. The lime juice provides tartness while triple sec adds subtle orange sweetness. Bold and refreshing.',
      it: "Deciso e orientato agli agrumi con una base pulita di vodka. Il succo di lime fornisce acidità mentre il triple sec aggiunge una sottile dolcezza all'arancia. Audace e rinfrescante.",
      vi: 'Sắc nét và hướng cam chanh với nền vodka trong sạch. Nước cốt chanh mang đến vị chua trong khi triple sec thêm vị ngọt cam tinh tế. Táo bạo và sảng khoái.',
    },
    first_impression: {
      en: 'Sharp lime tartness with immediate vodka bite',
      it: 'Acidità decisa del lime con morso immediato di vodka',
      vi: 'Vị chua chanh sắc nét với độ gắt vodka ngay lập tức',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus',
      it: 'Finale pulito e fresco con agrumi persistenti',
      vi: 'Kết thúc trong sạch, sắc nét với cam chanh kéo dài',
    },
    balance: {
      en: 'Tart and strong, not meant to be subtle',
      it: 'Aspro e forte, non destinato ad essere sottile',
      vi: 'Chua và mạnh, không có ý nghĩa tinh tế',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'nightlife', 'celebration'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Best as a standalone shot. Can be paired with salty snacks, nachos, or Asian appetizers to balance the tartness.',
      it: "Meglio come shot standalone. Può essere abbinato a snack salati, nachos o antipasti asiatici per bilanciare l'acidità.",
      vi: 'Tốt nhất như một shot độc lập. Có thể kết hợp với đồ ăn vặt mặn, nachos hoặc món khai vị châu Á để cân bằng vị chua.',
    },
    ideal_for: {
      en: 'Perfect for vodka lovers who enjoy tart, citrus-forward shots. A party favorite for those who appreciate bold flavors.',
      it: 'Perfetto per gli amanti della vodka che apprezzano gli shot aspri e orientati agli agrumi. Un favorito delle feste per chi apprezza i sapori audaci.',
      vi: 'Hoàn hảo cho người yêu vodka thích shot chua, hướng cam chanh. Được ưa chuộng trong tiệc cho những ai đánh giá cao hương vị táo bạo.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Triple Sec', it: 'Triple Sec', vi: 'Triple Sec' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh Lime Juice',
        it: 'Succo di Lime Fresco',
        vi: 'Nước Cốt Chanh Tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a shot glass and serve immediately.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchierino da shot e servire immediatamente.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh hoàn toàn. Lọc vào ly shot và phục vụ ngay lập tức.',
  },

  glass: 'Shot glass',

  garnish: {
    en: 'Lime wheel (optional)',
    it: 'Fettina di lime (opzionale)',
    vi: 'Lát chanh (tùy chọn)',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['sour', 'citrus', 'strong'],

  abv_estimate: 28,

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 45,

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
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['party', 'nightlife', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['blue-kamikaze', 'frozen-kamikaze', 'kamikaze-cocktail'],

  notes_for_staff:
    'Always use fresh lime juice, never bottled. Shake hard to ensure proper dilution and temperature. Can also be served as a cocktail in a martini glass.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://en.wikipedia.org/wiki/Kamikaze_(cocktail)',
    notes: 'Classic shooter recipe from the 1970s bar scene.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
