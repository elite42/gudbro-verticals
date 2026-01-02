/**
 * Famous Cocktails: Seven and Seven
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const sevenAndSeven: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-6789-0123-f678-012345678901',
  slug: 'seven-and-seven',
  stable_key: 'd9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8',

  name: {
    en: 'Seven and Seven',
    it: 'Seven and Seven',
    vi: 'Seven and Seven',
    ko: '세븐 앤 세븐',
    ja: 'セブン・アンド・セブン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'whiskey', 'seagrams', 'simple', 'americana'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An iconic American highball combining Seagram\'s 7 Crown whiskey with 7-Up lemon-lime soda. The Seven and Seven is a super-simple, sweet drink that became a cultural phenomenon in American bars and remains a nostalgic favorite.',
    it: 'Un iconico highball americano che combina whiskey Seagram\'s 7 Crown con soda al limone-lime 7-Up. Il Seven and Seven è un drink super semplice e dolce che divenne un fenomeno culturale nei bar americani e rimane un favorito nostalgico.',
    vi: 'Một highball biểu tượng của Mỹ kết hợp whiskey Seagram\'s 7 Crown với soda chanh-lime 7-Up. Seven and Seven là thức uống cực kỳ đơn giản, ngọt ngào đã trở thành hiện tượng văn hóa ở các quán bar Mỹ và vẫn là món yêu thích hoài niệm.',
  },

  history: {
    created_year: '1970',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Seven and Seven emerged in the 1970s as a marketing-driven cocktail that perfectly aligned two popular "7" branded products. Seagram\'s 7 Crown whiskey (launched in 1934) was already popular, and when combined with 7-Up (launched in 1929), the catchy name and simple recipe made it an instant hit. The drink became ubiquitous in American bars throughout the 1970s and 1980s, appealing to those who wanted an easy-to-order, easy-to-make drink. It represents a distinctly American approach to cocktails - simple, straightforward, and brand-focused.',
      it: 'Il Seven and Seven emerse negli anni \'70 come un cocktail guidato dal marketing che allineava perfettamente due popolari prodotti del marchio "7". Il whiskey Seagram\'s 7 Crown (lanciato nel 1934) era già popolare, e quando combinato con 7-Up (lanciato nel 1929), il nome accattivante e la ricetta semplice lo resero un successo immediato. Il drink divenne onnipresente nei bar americani negli anni \'70 e \'80, attraendo coloro che volevano un drink facile da ordinare e da preparare. Rappresenta un approccio distintamente americano ai cocktail - semplice, diretto e focalizzato sul marchio.',
      vi: 'Seven and Seven xuất hiện vào những năm 1970 như một cocktail dựa trên tiếp thị hoàn hảo sắp xếp hai sản phẩm thương hiệu "7" phổ biến. Whiskey Seagram\'s 7 Crown (ra mắt năm 1934) đã phổ biến, và khi kết hợp với 7-Up (ra mắt năm 1929), cái tên hấp dẫn và công thức đơn giản khiến nó trở thành hit ngay lập tức. Thức uống trở nên phổ biến ở các quán bar Mỹ trong suốt những năm 1970 và 1980, thu hút những ai muốn thức uống dễ gọi, dễ làm. Nó đại diện cho cách tiếp cận cocktail đặc trưng của Mỹ - đơn giản, thẳng thắn và tập trung vào thương hiệu.',
    },
    named_after: {
      en: 'Named after its two branded ingredients: Seagram\'s 7 Crown whiskey and 7-Up soda.',
      it: 'Prende il nome dai suoi due ingredienti di marca: whiskey Seagram\'s 7 Crown e soda 7-Up.',
      vi: 'Được đặt theo hai nguyên liệu thương hiệu của nó: whiskey Seagram\'s 7 Crown và soda 7-Up.',
    },
  },

  taste: {
    profile: ['sweet', 'citrus', 'smooth', 'light'],
    description: {
      en: 'Very sweet and approachable with citrusy lemon-lime notes dominating the smooth, light whiskey base. The 7-Up provides effervescence and sweetness that almost completely masks the alcohol, making it dangerously easy to drink.',
      it: 'Molto dolce e accessibile con note di limone-lime che dominano la base morbida e leggera di whiskey. Il 7-Up fornisce effervescenza e dolcezza che maschera quasi completamente l\'alcol, rendendolo pericolosamente facile da bere.',
      vi: 'Rất ngọt và dễ tiếp cận với hương chanh-lime cam quýt chiếm ưu thế trên cơ sở whiskey mượt mà, nhẹ nhàng. 7-Up cung cấp bọt khí và vị ngọt gần như che khuất hoàn toàn cồn, khiến nó cực kỳ dễ uống.',
    },
    first_impression: {
      en: 'Sweet lemon-lime soda with subtle whiskey warmth',
      it: 'Soda dolce al limone-lime con sottile calore di whiskey',
      vi: 'Soda chanh-lime ngọt với hơi ấm whiskey tinh tế',
    },
    finish: {
      en: 'Clean, sweet finish with minimal whiskey burn',
      it: 'Finale pulito e dolce con minima sensazione di whiskey',
      vi: 'Kết thúc trong sạch, ngọt ngào với cảm giác whiskey tối thiểu',
    },
    balance: {
      en: 'Heavily sweet-leaning with the 7-Up dominating the flavor profile',
      it: 'Fortemente inclinato verso la dolcezza con il 7-Up che domina il profilo di sapore',
      vi: 'Nghiêng mạnh về vị ngọt với 7-Up chiếm ưu thế trong hồ sơ hương vị',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon', 'casual'],
    occasions: ['casual', 'party', 'sports_bar', 'dive_bar'],
    seasons: ['all-year'],
    food_pairings: {
      en: 'Pairs well with American comfort food, burgers, pizza, wings, and bar snacks. Works with barbecue and casual pub fare.',
      it: 'Si abbina bene con comfort food americano, hamburger, pizza, ali di pollo e snack da bar. Funziona con barbecue e piatti casual da pub.',
      vi: 'Kết hợp tốt với đồ ăn comfort Mỹ, burger, pizza, cánh gà và đồ ăn nhẹ quán bar. Phù hợp với barbecue và đồ ăn pub thông thường.',
    },
    ideal_for: {
      en: 'Perfect for those who want an easy-drinking, no-fuss cocktail. Great for casual settings, dive bars, and anyone nostalgic for 1970s-80s American bar culture. Ideal for whiskey beginners.',
      it: 'Perfetto per chi vuole un cocktail facile da bere e senza complicazioni. Ottimo per ambienti informali, dive bar e per chiunque sia nostalgico della cultura dei bar americani degli anni \'70-\'80. Ideale per i principianti del whiskey.',
      vi: 'Hoàn hảo cho những ai muốn cocktail dễ uống, không rườm rà. Tuyệt vời cho môi trường thân mật, quán bar giản dị và bất kỳ ai hoài niệm văn hóa quán bar Mỹ những năm 1970-80. Lý tưởng cho người mới bắt đầu với whiskey.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SEAGRAMS_7',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Seagram\'s 7 Crown whiskey', it: 'Whiskey Seagram\'s 7 Crown', vi: 'Whiskey Seagram\'s 7 Crown' },
    },
    {
      ingredient_id: 'ING_SEVEN_UP',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: '7-Up or Sprite', it: '7-Up o Sprite', vi: '7-Up hoặc Sprite' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour Seagram\'s 7 Crown over ice. Top with 7-Up. Stir gently. Garnish with a lemon wedge if desired.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare Seagram\'s 7 Crown sul ghiaccio. Completare con 7-Up. Mescolare delicatamente. Guarnire con uno spicchio di limone se desiderato.',
    vi: 'Đổ đầy ly highball với đá. Rót Seagram\'s 7 Crown lên đá. Thêm 7-Up lên trên. Khuấy nhẹ nhàng. Trang trí với một lát chanh nếu muốn.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon wedge (optional)',
    it: 'Spicchio di limone (opzionale)',
    vi: 'Lát chanh (tùy chọn)',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SEAGRAMS_7'],

  flavor_profile: ['sweet', 'citrus', 'smooth', 'light'],

  abv_estimate: 9,

  calories_estimate: 175,

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
  occasion_tags: ['casual', 'party', 'sports_bar'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['whiskey-seven', 'canadian-seven'],

  notes_for_staff: 'Traditionally made with Seagram\'s 7 Crown and 7-Up specifically, though Sprite can substitute. Can be made with other whiskeys but loses the authentic "7 and 7" name. Very popular in 1970s-80s America.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1245/seven-and-seven',
    note: 'Marketing-driven cocktail from 1970s combining two "7" branded products.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
