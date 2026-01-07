/**
 * Famous Cocktails: Electric Lemonade
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const electricLemonade: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b0c1d2e3-4567-8901-b456-890123456789',
  slug: 'electric-lemonade',
  stable_key: 'f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6',

  name: {
    en: 'Electric Lemonade',
    it: 'Electric Lemonade',
    vi: 'Electric Lemonade',
    ko: '일렉트릭 레모네이드',
    ja: 'エレクトリックレモネード',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'vodka', 'blue', 'lemonade', 'refreshing', 'party'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A vibrant electric blue cocktail combining vodka, blue curaçao, and lemonade with lemon-lime soda. The Electric Lemonade is a visually stunning, refreshing drink that's become a pool party and summer favorite.",
    it: "Un vibrante cocktail blu elettrico che combina vodka, blue curaçao e limonata con soda limone-lime. L'Electric Lemonade è un drink visivamente sbalorditivo e rinfrescante che è diventato un favorito delle feste in piscina e dell'estate.",
    vi: 'Một cocktail xanh lam điện sống động kết hợp vodka, blue curaçao và nước chanh với soda chanh-lime. Electric Lemonade là thức uống tươi mát, ấn tượng về mặt hình ảnh đã trở thành món yêu thích của tiệc bể bơi và mùa hè.',
  },

  history: {
    created_year: '1990',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Electric Lemonade emerged in the 1990s as bars and clubs sought visually striking cocktails that would stand out. The electric blue color from blue curaçao combined with the familiar taste of lemonade created an instant hit. Unlike the dangerously strong "iced tea" family, the Electric Lemonade is more approachable with moderate alcohol content. It became particularly popular at beach bars, pool parties, and summer festivals where its bright blue color photographs well and evokes tropical vibes. The drink represents the 1990s trend of colorful, Instagram-worthy cocktails before Instagram existed.',
      it: "L'Electric Lemonade emerse negli anni '90 quando bar e club cercavano cocktail visivamente sorprendenti che si distinguessero. Il colore blu elettrico del blue curaçao combinato con il familiare sapore di limonata creò un successo immediato. A differenza della famiglia pericolosamente forte degli \"iced tea\", l'Electric Lemonade è più accessibile con un contenuto alcolico moderato. Divenne particolarmente popolare nei bar sulla spiaggia, nelle feste in piscina e nei festival estivi dove il suo colore blu brillante fotografa bene ed evoca vibrazioni tropicali. Il drink rappresenta la tendenza degli anni '90 di cocktail colorati e degni di Instagram prima che Instagram esistesse.",
      vi: 'Electric Lemonade xuất hiện vào những năm 1990 khi các quán bar và câu lạc bộ tìm kiếm cocktail nổi bật về mặt hình ảnh. Màu xanh lam điện từ blue curaçao kết hợp với hương vị quen thuộc của nước chanh đã tạo ra hit ngay lập tức. Không giống như họ "trà đá" nguy hiểm mạnh mẽ, Electric Lemonade dễ tiếp cận hơn với hàm lượng cồn vừa phải. Nó trở nên đặc biệt phổ biến tại các quán bar bãi biển, tiệc bể bơi và lễ hội mùa hè nơi màu xanh lam tươi sáng của nó chụp ảnh đẹp và gợi lên không khí nhiệt đới. Thức uống đại diện cho xu hướng những năm 1990 của các cocktail đầy màu sắc, đáng đăng Instagram trước khi Instagram tồn tại.',
    },
    named_after: {
      en: 'Named for its electric blue color and lemonade base, creating an eye-catching, energetic appearance.',
      it: 'Prende il nome dal suo colore blu elettrico e dalla base di limonata, creando un aspetto accattivante ed energetico.',
      vi: 'Được đặt theo màu xanh lam điện và cơ sở nước chanh của nó, tạo ra vẻ ngoài bắt mắt, tràn đầy năng lượng.',
    },
  },

  taste: {
    profile: ['sweet', 'citrus', 'lemon', 'orange'],
    description: {
      en: "Sweet and citrusy with dominant lemon flavor from the lemonade, complemented by blue curaçao's orange notes. The vodka provides a clean alcoholic base while the lemon-lime soda adds refreshing effervescence. Tastes like electric blue lemonade with a gentle kick.",
      it: "Dolce e agrumato con sapore dominante di limone dalla limonata, completato dalle note d'arancia del blue curaçao. La vodka fornisce una base alcolica pulita mentre la soda limone-lime aggiunge effervescenza rinfrescante. Sa di limonata blu elettrica con un calcio delicato.",
      vi: 'Ngọt ngào và cam quýt với hương vị chanh chủ đạo từ nước chanh, được bổ sung bởi hương cam của blue curaçao. Vodka cung cấp cơ sở rượu trong sạch trong khi soda chanh-lime thêm bọt khí tươi mát. Có vị như nước chanh xanh lam điện với cảm giác nhẹ nhàng.',
    },
    first_impression: {
      en: 'Sweet lemonade with electric blue color and citrus brightness',
      it: 'Limonata dolce con colore blu elettrico e luminosità di agrumi',
      vi: 'Nước chanh ngọt với màu xanh lam điện và sự tươi sáng cam quýt',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering lemon and orange notes',
      it: 'Finale pulito e rinfrescante con note persistenti di limone e arancia',
      vi: 'Kết thúc trong sạch, tươi mát với hương chanh và cam kéo dài',
    },
    balance: {
      en: 'Well-balanced sweetness with good citrus brightness - refreshing without being cloying',
      it: 'Dolcezza ben bilanciata con buona luminosità di agrumi - rinfrescante senza essere stucchevole',
      vi: 'Vị ngọt cân bằng tốt với độ tươi sáng cam quýt tốt - tươi mát mà không ngọt gắt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'summer'],
    occasions: ['party', 'pool_party', 'beach', 'celebration', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with summer party foods, grilled items, seafood, fish tacos, and light appetizers. Great poolside drink with chips and salsa.',
      it: 'Perfetto con cibi da festa estiva, grigliate, frutti di mare, fish tacos e antipasti leggeri. Ottimo drink a bordo piscina con patatine e salsa.',
      vi: 'Hoàn hảo với đồ ăn tiệc mùa hè, đồ nướng, hải sản, fish tacos và món khai vị nhẹ. Thức uống tuyệt vời bên bể bơi với khoai tây chiên và salsa.',
    },
    ideal_for: {
      en: 'Perfect for pool parties, beach bars, and summer celebrations. Great for those who love visually striking drinks and sweet, refreshing flavors. Popular with Instagram-loving crowds.',
      it: 'Perfetto per feste in piscina, bar sulla spiaggia e celebrazioni estive. Ottimo per chi ama drink visivamente sorprendenti e sapori dolci e rinfrescanti. Popolare tra la folla amante di Instagram.',
      vi: 'Hoàn hảo cho tiệc bể bơi, quán bar bãi biển và kỷ niệm mùa hè. Tuyệt vời cho những ai yêu thích đồ uống nổi bật về mặt hình ảnh và hương vị ngọt ngào, tươi mát. Phổ biến với đám đông yêu Instagram.',
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
      ingredient_id: 'ING_BLUE_CURACAO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Blue curaçao', it: 'Blue curaçao', vi: 'Blue curaçao' },
    },
    {
      ingredient_id: 'ING_LEMONADE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Lemonade', it: 'Limonata', vi: 'Nước chanh' },
    },
    {
      ingredient_id: 'ING_LEMON_LIME_SODA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Lemon-lime soda (7-Up or Sprite)',
        it: 'Soda limone-lime (7-Up o Sprite)',
        vi: 'Soda chanh-lime (7-Up hoặc Sprite)',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka and blue curaçao over ice. Add lemonade and top with lemon-lime soda. Stir gently to create the electric blue color. Garnish with a lemon wheel.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare vodka e blue curaçao sul ghiaccio. Aggiungere limonata e completare con soda limone-lime. Mescolare delicatamente per creare il colore blu elettrico. Guarnire con una rondella di limone.',
    vi: 'Đổ đầy ly highball với đá. Rót vodka và blue curaçao lên đá. Thêm nước chanh và thêm soda chanh-lime lên trên. Khuấy nhẹ nhàng để tạo màu xanh lam điện. Trang trí với một vòng chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon wheel and cherry',
    it: 'Rondella di limone e ciliegia',
    vi: 'Vòng chanh và cherry',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['sweet', 'citrus', 'lemon', 'orange'],

  abv_estimate: 12,

  calories_estimate: 215,

  difficulty: 'easy',

  prep_time_seconds: 30,

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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['party', 'pool_party', 'beach', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['blue-lagoon', 'electric-iced-tea'],

  notes_for_staff:
    "The electric blue color is the signature feature - make sure it's vibrant. Can use homemade or store-bought lemonade. Very photogenic drink - popular on social media.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1253/electric-lemonade',
    notes: '1990s creation, popular at pool parties and beach bars for its electric blue color.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
