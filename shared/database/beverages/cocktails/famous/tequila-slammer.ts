/**
 * Famous Cocktails: Tequila Slammer
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tequilaSlammer: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-3456-7890-c345-789012345678',
  slug: 'tequila-slammer',
  stable_key: 'a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5',

  name: {
    en: 'Tequila Slammer',
    it: 'Tequila Slammer',
    vi: 'Tequila Slammer',
    ko: '데킬라 슬래머',
    ja: 'テキーラスラマー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'tequila', 'shot', 'party', 'interactive', 'fizzy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A festive party drink combining tequila with lemon-lime soda or champagne, served with a slam-and-shoot ritual. The Tequila Slammer is as much about the performance as the taste, creating an effervescent, fizzy shot that\'s become a nightclub staple.',
    it: 'Un drink da festa festivo che combina tequila con soda al limone-lime o champagne, servito con un rituale di slam-and-shoot. Il Tequila Slammer riguarda tanto la performance quanto il gusto, creando uno shot effervescente e frizzante che è diventato un punto fermo dei nightclub.',
    vi: 'Một thức uống tiệc tùng lễ hội kết hợp tequila với soda chanh-lime hoặc champagne, được phục vụ với nghi lệ đập-và-uống. Tequila Slammer là về màn trình diễn nhiều như hương vị, tạo ra một shot sủi bọt, có ga đã trở thành thức uống chính của hộp đêm.',
  },

  history: {
    created_year: '1970',
    origin: {
      city: 'Mexico',
      country: 'Mexico',
    },
    story: {
      en: 'The Tequila Slammer (also known as "Tequila Boom Boom") originated in Mexico in the 1970s and gained international popularity in the 1980s. The ritual involves covering the glass with your hand, slamming it on the bar to create fizz, then shooting it quickly while it\'s still bubbling. The drink became synonymous with party culture and was popularized by Tom Cruise in the 1988 film "Cocktail." Two versions exist: one with lemon-lime soda (7-Up or Sprite) and a more upscale version with champagne.',
      it: 'Il Tequila Slammer (noto anche come "Tequila Boom Boom") ha avuto origine in Messico negli anni \'70 e guadagnò popolarità internazionale negli anni \'80. Il rituale prevede di coprire il bicchiere con la mano, sbatterlo sul bancone per creare effervescenza, quindi berlo rapidamente mentre è ancora frizzante. Il drink divenne sinonimo di cultura delle feste e fu reso popolare da Tom Cruise nel film del 1988 "Cocktail". Esistono due versioni: una con soda al limone-lime (7-Up o Sprite) e una versione più raffinata con champagne.',
      vi: 'Tequila Slammer (còn được gọi là "Tequila Boom Boom") có nguồn gốc từ Mexico vào những năm 1970 và trở nên phổ biến quốc tế vào những năm 1980. Nghi lệ bao gồm việc che ly bằng tay, đập nó lên quầy bar để tạo bọt, sau đó uống nhanh khi nó còn sủi bọt. Thức uống trở thành đồng nghĩa với văn hóa tiệc tùng và được phổ biến bởi Tom Cruise trong bộ phim "Cocktail" năm 1988. Tồn tại hai phiên bản: một với soda chanh-lime (7-Up hoặc Sprite) và phiên bản cao cấp hơn với champagne.',
    },
    named_after: {
      en: 'Named after the "slamming" action of banging the glass on the bar to activate the carbonation before shooting it.',
      it: 'Prende il nome dall\'azione di "slamming" di sbattere il bicchiere sul bancone per attivare la carbonazione prima di berlo.',
      vi: 'Được đặt theo hành động "đập" của việc đập ly lên quầy bar để kích hoạt khí CO2 trước khi uống.',
    },
  },

  taste: {
    profile: ['sweet', 'citrus', 'fizzy', 'agave'],
    description: {
      en: 'Bright citrus sweetness with tequila\'s agave notes, enhanced by intense carbonation from the slamming action. The fizz creates a unique tingling sensation and makes the drink surprisingly smooth and easy to shoot despite the tequila base.',
      it: 'Dolcezza agrumata brillante con note di agave della tequila, esaltata dall\'intensa carbonazione dall\'azione di slamming. La frizzantezza crea una sensazione di formicolio unica e rende il drink sorprendentemente morbido e facile da bere nonostante la base di tequila.',
      vi: 'Vị ngọt cam quýt tươi sáng với hương agave của tequila, được tăng cường bởi khí CO2 mạnh từ hành động đập. Bọt tạo ra cảm giác ngứa ran độc đáo và làm cho thức uống mượt mà và dễ uống một cách đáng ngạc nhiên mặc dù có cơ sở tequila.',
    },
    first_impression: {
      en: 'Intense fizz and citrus with agave warmth',
      it: 'Frizzantezza intensa e agrumi con calore di agave',
      vi: 'Bọt mạnh và cam quýt với hơi ấm agave',
    },
    finish: {
      en: 'Quick, clean finish with lingering tequila warmth',
      it: 'Finale rapido e pulito con calore persistente di tequila',
      vi: 'Kết thúc nhanh, trong sạch với hơi ấm tequila kéo dài',
    },
    balance: {
      en: 'The soda sweetness balances the tequila\'s bite, while carbonation makes it dangerously easy to drink',
      it: 'La dolcezza della soda bilancia il morso della tequila, mentre la carbonazione lo rende pericolosamente facile da bere',
      vi: 'Vị ngọt của soda cân bằng vị nồng của tequila, trong khi khí CO2 khiến nó cực kỳ dễ uống',
    },
  },

  recommendations: {
    best_time: ['night', 'late_night'],
    occasions: ['party', 'celebration', 'nightclub', 'birthday'],
    seasons: ['all-year'],
    food_pairings: {
      en: 'Typically consumed as a party shot without food. If pairing, works with Mexican appetizers, nachos, tacos, and salty snacks.',
      it: 'Tipicamente consumato come shot da festa senza cibo. Se abbinato, funziona con antipasti messicani, nachos, tacos e snack salati.',
      vi: 'Thường được tiêu thụ như shot tiệc tùng không có đồ ăn. Nếu kết hợp, phù hợp với món khai vị Mexico, nachos, tacos và đồ ăn nhẹ mặn.',
    },
    ideal_for: {
      en: 'Perfect for party atmospheres and celebrations. Great for groups who enjoy interactive drinking rituals. Popular in nightclubs and birthday parties. Not for those seeking sophisticated cocktails.',
      it: 'Perfetto per atmosfere da festa e celebrazioni. Ottimo per gruppi che amano rituali di bevuta interattivi. Popolare nei nightclub e feste di compleanno. Non per chi cerca cocktail sofisticati.',
      vi: 'Hoàn hảo cho không khí tiệc tùng và kỷ niệm. Tuyệt vời cho các nhóm thích nghi lễ uống có tương tác. Phổ biến ở hộp đêm và tiệc sinh nhật. Không dành cho những ai tìm kiếm cocktail tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA_SILVER',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Tequila (silver)', it: 'Tequila (blanco)', vi: 'Tequila (bạc)' },
    },
    {
      ingredient_id: 'ING_LEMON_LIME_SODA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Lemon-lime soda (7-Up or Sprite)', it: 'Soda limone-lime (7-Up o Sprite)', vi: 'Soda chanh-lime (7-Up hoặc Sprite)' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour tequila into a rocks glass or highball glass. Add lemon-lime soda. Cover the top of the glass firmly with your hand. Slam the glass down on the bar to create fizz. Immediately shoot the drink while it\'s still fizzing.',
    it: 'Versare la tequila in un bicchiere rocks o highball. Aggiungere soda limone-lime. Coprire saldamente la parte superiore del bicchiere con la mano. Sbattere il bicchiere sul bancone per creare effervescenza. Bere immediatamente il drink mentre è ancora frizzante.',
    vi: 'Rót tequila vào ly rocks hoặc ly highball. Thêm soda chanh-lime. Che chặt đỉnh ly bằng tay. Đập ly xuống quầy bar để tạo bọt. Uống ngay thức uống khi nó còn đang sủi bọt.',
  },

  glass: 'Rocks glass or Highball glass',

  garnish: {
    en: 'None (optional lime wedge)',
    it: 'Nessuno (spicchio di lime opzionale)',
    vi: 'Không có (lát chanh tùy chọn)',
  },

  ice: 'none',

  serving_style: 'straight_up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA_SILVER'],

  flavor_profile: ['sweet', 'citrus', 'fizzy', 'agave'],

  abv_estimate: 20,

  calories_estimate: 95,

  difficulty: 'easy',

  prep_time_seconds: 20,

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
  season_tags: ['all-year'],
  occasion_tags: ['party', 'celebration', 'nightclub'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['tequila-boom-boom', 'champagne-slammer'],

  notes_for_staff: 'Champagne version uses equal parts tequila and champagne - more expensive but smoother. Demonstrate the slam technique to customers. Use sturdy glassware. Popular as a group shot. Equal parts (50/50) ratio is standard.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1242/tequila-slammer',
    note: 'Mexican party shot popularized in 1980s, featured in "Cocktail" (1988).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
