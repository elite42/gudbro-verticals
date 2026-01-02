/**
 * Famous Cocktails: Greyhound
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const greyhound: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-5e6f-7890-abcd-ef1234567890',
  slug: 'greyhound',
  stable_key: 'e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',

  name: {
    en: 'Greyhound',
    it: 'Greyhound',
    vi: 'Greyhound',
    ko: '그레이하운드',
    ja: 'グレイハウンド',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'refreshing', 'citrus', 'vodka'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshing and simple highball cocktail combining vodka with fresh grapefruit juice. The Greyhound is a classic two-ingredient drink that highlights the bitter-sweet flavor of grapefruit, perfect for brunch or warm afternoons.',
    it: 'Un cocktail highball rinfrescante e semplice che combina vodka con succo di pompelmo fresco. Il Greyhound è un classico drink a due ingredienti che esalta il sapore agrodolce del pompelmo, perfetto per il brunch o i pomeriggi caldi.',
    vi: 'Một loại cocktail highball tươi mát và đơn giản kết hợp vodka với nước ép bưởi tươi. Greyhound là thức uống cổ điển hai nguyên liệu làm nổi bật hương vị đắng ngọt của bưởi, hoàn hảo cho bữa sáng muộn hoặc buổi chiều ấm áp.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Greyhound emerged in the 1930s and became particularly popular in the post-war era. Its simple combination of vodka and grapefruit juice made it accessible and refreshing. The drink gained further popularity when the salted rim version, known as the Salty Dog, was created. The name likely refers to the Greyhound bus line, which was expanding across America during this period.',
      it: 'Il Greyhound emerse negli anni \'30 e divenne particolarmente popolare nell\'era post-bellica. La sua semplice combinazione di vodka e succo di pompelmo lo rendeva accessibile e rinfrescante. Il drink guadagnò ulteriore popolarità quando fu creata la versione con il bordo salato, nota come Salty Dog. Il nome probabilmente si riferisce alla linea di autobus Greyhound, che si stava espandendo in America durante questo periodo.',
      vi: 'Greyhound xuất hiện vào những năm 1930 và trở nên đặc biệt phổ biến trong thời kỳ hậu chiến. Sự kết hợp đơn giản của vodka và nước ép bưởi làm cho nó dễ tiếp cận và tươi mát. Thức uống trở nên phổ biến hơn khi phiên bản có viền muối, được biết đến như Salty Dog, được tạo ra. Cái tên có thể ám chỉ tuyến xe buýt Greyhound, đang mở rộng khắp nước Mỹ trong giai đoạn này.',
    },
    named_after: {
      en: 'Named after the Greyhound bus line, which was a popular mode of transportation in mid-20th century America.',
      it: 'Prende il nome dalla linea di autobus Greyhound, che era un popolare mezzo di trasporto nell\'America di metà del XX secolo.',
      vi: 'Được đặt theo tên tuyến xe buýt Greyhound, phương tiện di chuyển phổ biến ở Mỹ giữa thế kỷ 20.',
    },
  },

  taste: {
    profile: ['citrus', 'bitter', 'refreshing'],
    description: {
      en: 'Clean and crisp with bright grapefruit tartness balanced by the neutral vodka base. The natural bitterness of grapefruit provides depth and complexity to this seemingly simple drink.',
      it: 'Pulito e frizzante con la vivace acidità del pompelmo bilanciata dalla base neutra di vodka. L\'amaro naturale del pompelmo fornisce profondità e complessità a questo drink apparentemente semplice.',
      vi: 'Trong sạch và sắc nét với vị chua tươi mát của bưởi được cân bằng bởi vodka trung tính. Vị đắng tự nhiên của bưởi mang lại chiều sâu và sự phức tạp cho thức uống tưởng chừng đơn giản này.',
    },
    first_impression: {
      en: 'Bright, tangy grapefruit with a clean vodka backbone',
      it: 'Pompelmo brillante e piccante con una base pulita di vodka',
      vi: 'Bưởi tươi sáng, chua nhẹ với nền vodka trong sạch',
    },
    finish: {
      en: 'Crisp, slightly bitter citrus finish with lingering grapefruit notes',
      it: 'Finale di agrumi frizzante e leggermente amaro con note persistenti di pompelmo',
      vi: 'Kết thúc cam quýt sắc nét, hơi đắng với hương bưởi kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet and bitter, with the vodka providing structure without overwhelming the grapefruit',
      it: 'Ben bilanciato tra dolce e amaro, con la vodka che fornisce struttura senza sopraffare il pompelmo',
      vi: 'Cân bằng tốt giữa ngọt và đắng, vodka tạo cấu trúc mà không át hương bưởi',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'brunch', 'daytime'],
    occasions: ['casual', 'brunch', 'poolside', 'summer_party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with brunch dishes, smoked salmon, seafood salads, and light appetizers. Pairs well with eggs benedict and avocado toast.',
      it: 'Eccellente con piatti da brunch, salmone affumicato, insalate di mare e antipasti leggeri. Si abbina bene con uova alla Benedict e avocado toast.',
      vi: 'Tuyệt vời với các món brunch, cá hồi hun khói, salad hải sản và món khai vị nhẹ. Kết hợp tốt với trứng benedict và bánh mì bơ.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy light, refreshing cocktails with a citrus edge. Great for brunch enthusiasts or anyone looking for a simple, sophisticated drink without too much sweetness.',
      it: 'Perfetto per chi ama cocktail leggeri e rinfrescanti con un tocco di agrumi. Ottimo per gli appassionati di brunch o per chiunque cerchi un drink semplice e sofisticato senza troppa dolcezza.',
      vi: 'Hoàn hảo cho những ai thích cocktail nhẹ nhàng, tươi mát với hương cam quýt. Tuyệt vời cho người yêu brunch hoặc bất kỳ ai tìm kiếm thức uống đơn giản, tinh tế mà không quá ngọt.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Fresh grapefruit juice', it: 'Succo di pompelmo fresco', vi: 'Nước ép bưởi tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka over ice, then top with fresh grapefruit juice. Stir gently to combine. Garnish with a grapefruit wedge.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare la vodka sul ghiaccio, quindi completare con succo di pompelmo fresco. Mescolare delicatamente per combinare. Guarnire con uno spicchio di pompelmo.',
    vi: 'Đổ đầy ly highball với đá. Rót vodka lên đá, sau đó thêm nước ép bưởi tươi. Khuấy nhẹ nhàng để trộn đều. Trang trí với một lát bưởi.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Grapefruit wedge',
    it: 'Spicchio di pompelmo',
    vi: 'Lát bưởi',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['citrus', 'bitter', 'refreshing'],

  abv_estimate: 8,

  calories_estimate: 150,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['casual', 'brunch', 'poolside'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['salty-dog', 'sea-breeze'],

  notes_for_staff: 'Always use fresh grapefruit juice, not from concentrate. Pink or ruby red grapefruit provides a sweeter profile. If customer wants salt rim, this becomes a Salty Dog.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1234/greyhound',
    note: 'Classic recipe documented in multiple cocktail books and bartending guides.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
