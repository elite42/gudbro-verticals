/**
 * IBA Contemporary Classics: Bellini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bellini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b4c5d6e7-8f9a-0b1c-2d3e-4f5a6b7c8d9e',
  slug: 'bellini',
  stable_key: 'bellini_iba_contemporary_classic',

  name: {
    en: 'Bellini',
    it: 'Bellini',
    vi: 'Bellini',
    ko: '벨리니',
    ja: 'ベリーニ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'italian', 'brunch', 'elegant', 'prosecco', 'peach'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'Venice\'s signature cocktail - an elegant blend of white peach purée and Prosecco. Light, refreshing, and quintessentially Italian, the Bellini is the perfect celebration of summer\'s finest peaches.',
    it: 'Il cocktail distintivo di Venezia - un\'elegante miscela di purè di pesche bianche e Prosecco. Leggero, rinfrescante e quintessenzialmente italiano, il Bellini è la perfetta celebrazione delle migliori pesche estive.',
    vi: 'Cocktail đặc trưng của Venice - một hỗn hợp thanh lịch của xốt đào trắng và Prosecco. Nhẹ nhàng, sảng khoái và rất Ý, Bellini là lễ kỷ niệm hoàn hảo cho những quả đào tốt nhất mùa hè.',
  },

  history: {
    created_year: '1948',
    origin: {
      city: 'Venice',
      bar: 'Harry\'s Bar',
      country: 'Italy',
    },
    creator: {
      name: 'Giuseppe Cipriani',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Giuseppe Cipriani, founder of the legendary Harry\'s Bar in Venice, between 1934-1948. The drink was named after the 15th-century Venetian artist Giovanni Bellini, as the pink color of the drink reminded Cipriani of a toga in one of Bellini\'s paintings. It became the signature drink of Harry\'s Bar and spread worldwide.',
      it: 'Creato da Giuseppe Cipriani, fondatore del leggendario Harry\'s Bar di Venezia, tra il 1934 e il 1948. La bevanda fu chiamata così in onore dell\'artista veneziano del XV secolo Giovanni Bellini, poiché il colore rosa della bevanda ricordava a Cipriani una toga in uno dei dipinti di Bellini. Divenne la bevanda distintiva del Harry\'s Bar e si diffuse in tutto il mondo.',
      vi: 'Được tạo ra bởi Giuseppe Cipriani, người sáng lập quán bar Harry\'s Bar huyền thoại ở Venice, giữa năm 1934-1948. Thức uống được đặt theo tên nghệ sĩ Venice thế kỷ 15 Giovanni Bellini, vì màu hồng của thức uống gợi nhớ cho Cipriani về một chiếc áo toga trong một bức tranh của Bellini. Nó trở thành thức uống đặc trưng của Harry\'s Bar và lan rộng toàn cầu.',
    },
    named_after: {
      en: 'Named after the 15th-century Venetian painter Giovanni Bellini, inspired by the pink color of his paintings.',
      it: 'Prende il nome dal pittore veneziano del XV secolo Giovanni Bellini, ispirato dal colore rosa dei suoi dipinti.',
      vi: 'Được đặt theo tên họa sĩ Venice thế kỷ 15 Giovanni Bellini, lấy cảm hứng từ màu hồng trong các bức tranh của ông.',
    },
  },

  taste: {
    profile: ['fruity', 'delicate', 'sparkling'],
    description: {
      en: 'Delicate, fruity, and effervescent. Fresh white peach purée provides natural sweetness and aroma, while Prosecco adds elegant bubbles and crisp dryness. Light, sophisticated, and incredibly refreshing.',
      it: 'Delicato, fruttato ed effervescente. Il purè di pesche bianche fresche fornisce dolcezza naturale e aroma, mentre il Prosecco aggiunge bollicine eleganti e secchezza croccante. Leggero, sofisticato e incredibilmente rinfrescante.',
      vi: 'Tinh tế, trái cây và sủi bọt. Xốt đào trắng tươi cung cấp vị ngọt tự nhiên và hương thơm, trong khi Prosecco thêm bong bóng thanh lịch và độ khô giòn. Nhẹ nhàng, tinh tế và cực kỳ sảng khoái.',
    },
    first_impression: {
      en: 'Delicate white peach with elegant Prosecco bubbles',
      it: 'Pesca bianca delicata con bollicine eleganti di Prosecco',
      vi: 'Đào trắng tinh tế với bong bóng Prosecco thanh lịch',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering peach notes',
      it: 'Finale pulito e rinfrescante con note di pesca persistenti',
      vi: 'Kết thúc sạch, sảng khoái với hương đào kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between peach sweetness and Prosecco dryness',
      it: 'Perfettamente bilanciato tra dolcezza della pesca e secchezza del Prosecco',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt đào và độ khô Prosecco',
    },
  },

  recommendations: {
    best_time: ['morning', 'afternoon'],
    occasions: ['brunch', 'celebration', 'wedding', 'summer_gathering'],
    seasons: ['summer'],
    food_pairings: {
      en: 'Perfect with brunch dishes, Italian appetizers, prosciutto, fresh fruits, and light pastries. Ideal for summer celebrations.',
      it: 'Perfetto con piatti da brunch, antipasti italiani, prosciutto, frutta fresca e pasticcini leggeri. Ideale per celebrazioni estive.',
      vi: 'Hoàn hảo với món brunch, món khai vị Ý, prosciutto, trái cây tươi và bánh ngọt nhẹ. Lý tưởng cho lễ kỷ niệm mùa hè.',
    },
    ideal_for: {
      en: 'Perfect for brunch lovers and those who appreciate elegant, light cocktails. Ideal for Prosecco enthusiasts and Italian cuisine lovers.',
      it: 'Perfetto per gli amanti del brunch e per chi apprezza cocktail eleganti e leggeri. Ideale per gli appassionati di Prosecco e gli amanti della cucina italiana.',
      vi: 'Hoàn hảo cho người yêu brunch và những ai đánh giá cao cocktail thanh lịch, nhẹ nhàng. Lý tưởng cho người đam mê Prosecco và người yêu ẩm thực Ý.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_PROSECCO',
      quantity: { amount: 100, unit: 'ml' },
      display_name: { en: 'Prosecco', it: 'Prosecco', vi: 'Prosecco' },
    },
    {
      ingredient_id: 'ING_WHITE_PEACH_PUREE',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'White peach purée', it: 'Purè di pesche bianche', vi: 'Xốt đào trắng' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour peach purée into a chilled champagne flute. Gently top with chilled Prosecco. Stir gently and briefly. No garnish required, or optionally add a peach slice.',
    it: 'Versare il purè di pesche in una coppa da champagne raffreddata. Completare delicatamente con Prosecco freddo. Mescolare delicatamente e brevemente. Nessuna guarnizione richiesta, o opzionalmente aggiungere una fetta di pesca.',
    vi: 'Đổ xốt đào vào ly champagne flute đã làm lạnh. Nhẹ nhàng rót Prosecco lạnh lên trên. Khuấy nhẹ và ngắn gọn. Không cần trang trí, hoặc tùy chọn thêm lát đào.',
  },

  glass: 'Champagne flute',

  garnish: {
    en: 'None (or optional peach slice)',
    it: 'Nessuna (o fetta di pesca opzionale)',
    vi: 'Không (hoặc lát đào tùy chọn)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_PROSECCO'],

  flavor_profile: ['fruity', 'delicate', 'sparkling'],

  abv_estimate: 7,

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 30,

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
  season_tags: ['summer'],
  occasion_tags: ['brunch', 'celebration', 'wedding', 'summer_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['rossini', 'puccini', 'tintoretto'],

  notes_for_staff: 'Traditionally made with white peaches (pesca bianca), which are in season in summer. Fresh peach purée is essential - avoid commercial peach nectar. The Rossini uses strawberry purée, Puccini uses tangerine juice. Prosecco should be well-chilled. Build gently to preserve bubbles.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/bellini/',
    note: 'IBA Official Recipe. Created at Harry\'s Bar, Venice.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
