/**
 * Famous Cocktails: Lynchburg Lemonade
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const lynchburgLemonade: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd6e7f8a9-0123-4567-d012-456789012345',
  slug: 'lynchburg-lemonade',
  stable_key: 'b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',

  name: {
    en: 'Lynchburg Lemonade',
    it: 'Lynchburg Lemonade',
    vi: 'Lynchburg Lemonade',
    ko: '린치버그 레모네이드',
    ja: 'リンチバーグレモネード',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'whiskey', 'jack-daniels', 'lemonade', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshing and dangerously drinkable cocktail combining Jack Daniel\'s Tennessee Whiskey, triple sec, lemon juice, and lemon-lime soda. The Lynchburg Lemonade is sweet, citrusy, and perfect for warm weather drinking.',
    it: 'Un cocktail rinfrescante e pericolosamente bevibile che combina Jack Daniel\'s Tennessee Whiskey, triple sec, succo di limone e soda al limone-lime. Il Lynchburg Lemonade è dolce, agrumato e perfetto per bere con il caldo.',
    vi: 'Một cocktail tươi mát và cực kỳ dễ uống kết hợp Jack Daniel\'s Tennessee Whiskey, triple sec, nước chanh và soda chanh-lime. Lynchburg Lemonade ngọt ngào, cam quýt và hoàn hảo cho việc uống trong thời tiết ấm áp.',
  },

  history: {
    created_year: '1980',
    origin: {
      city: 'Huntsville',
      state: 'Alabama',
      country: 'USA',
    },
    creator: {
      name: 'Tony Mason',
      profession: 'bartender',
    },
    story: {
      en: 'The Lynchburg Lemonade was created in 1980 by Tony Mason, a bartender at TGI Friday\'s in Huntsville, Alabama. The drink is named after Lynchburg, Tennessee, the home of Jack Daniel\'s Distillery. Despite being created in Alabama, the name honors the famous whiskey\'s hometown. The cocktail became extremely popular in the 1980s and 1990s, helped by promotion from Jack Daniel\'s. Ironically, Lynchburg is located in a dry county where alcohol sales are prohibited, though the distillery operates under a special permit.',
      it: 'Il Lynchburg Lemonade fu creato nel 1980 da Tony Mason, un barman al TGI Friday\'s a Huntsville, Alabama. Il drink prende il nome da Lynchburg, Tennessee, la sede della Distilleria Jack Daniel\'s. Nonostante sia stato creato in Alabama, il nome onora la famosa città natale del whiskey. Il cocktail divenne estremamente popolare negli anni \'80 e \'90, aiutato dalla promozione di Jack Daniel\'s. Ironicamente, Lynchburg si trova in una contea secca dove le vendite di alcol sono proibite, anche se la distilleria opera con un permesso speciale.',
      vi: 'Lynchburg Lemonade được tạo ra vào năm 1980 bởi Tony Mason, một bartender tại TGI Friday\'s ở Huntsville, Alabama. Thức uống được đặt theo tên Lynchburg, Tennessee, quê hương của Nhà máy chưng cất Jack Daniel\'s. Mặc dù được tạo ra ở Alabama, cái tên tôn vinh quê hương của loại whiskey nổi tiếng. Cocktail trở nên cực kỳ phổ biến vào những năm 1980 và 1990, được hỗ trợ bởi việc quảng bá của Jack Daniel\'s. Trớ trêu thay, Lynchburg nằm ở một quận khô nơi việc bán rượu bị cấm, mặc dù nhà máy chưng cất hoạt động theo giấy phép đặc biệt.',
    },
    named_after: {
      en: 'Named after Lynchburg, Tennessee, the hometown of Jack Daniel\'s Distillery.',
      it: 'Prende il nome da Lynchburg, Tennessee, la città natale della Distilleria Jack Daniel\'s.',
      vi: 'Được đặt theo tên Lynchburg, Tennessee, quê hương của Nhà máy chưng cất Jack Daniel\'s.',
    },
  },

  taste: {
    profile: ['sweet', 'citrus', 'lemon', 'refreshing'],
    description: {
      en: 'Sweet and citrusy with prominent lemon flavor balanced by Jack Daniel\'s smooth whiskey character. The triple sec adds orange notes while the lemon-lime soda provides effervescence. Very easy-drinking and dangerously smooth - the alcohol is well-masked by the sweet citrus.',
      it: 'Dolce e agrumato con prominente sapore di limone bilanciato dal carattere morbido del whiskey Jack Daniel\'s. Il triple sec aggiunge note d\'arancia mentre la soda al limone-lime fornisce effervescenza. Molto facile da bere e pericolosamente morbido - l\'alcol è ben mascherato dagli agrumi dolci.',
      vi: 'Ngọt ngào và cam quýt với hương chanh nổi bật được cân bằng bởi đặc tính whiskey mượt mà của Jack Daniel\'s. Triple sec thêm hương cam trong khi soda chanh-lime cung cấp bọt khí. Rất dễ uống và cực kỳ mượt mà - cồn được che khuất tốt bởi cam quýt ngọt.',
    },
    first_impression: {
      en: 'Sweet lemonade with whiskey warmth and citrus brightness',
      it: 'Limonata dolce con calore di whiskey e luminosità di agrumi',
      vi: 'Nước chanh ngọt với hơi ấm whiskey và sự tươi sáng cam quýt',
    },
    finish: {
      en: 'Sweet, smooth finish with lingering lemon and whiskey notes',
      it: 'Finale dolce e morbido con note persistenti di limone e whiskey',
      vi: 'Kết thúc ngọt ngào, mượt mà với hương chanh và whiskey kéo dài',
    },
    balance: {
      en: 'Leans sweet but the citrus and whiskey keep it from being cloying - very well-balanced for a sweet drink',
      it: 'Tende al dolce ma gli agrumi e il whiskey evitano che sia stucchevole - molto ben bilanciato per un drink dolce',
      vi: 'Nghiêng về vị ngọt nhưng cam quýt và whiskey giữ nó không bị ngọt gắt - rất cân bằng cho thức uống ngọt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'summer'],
    occasions: ['casual', 'party', 'barbecue', 'poolside'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Southern barbecue, fried chicken, pulled pork sandwiches, and American comfort food. Great with spicy foods as the sweetness balances heat.',
      it: 'Perfetto con barbecue del sud, pollo fritto, panini con pulled pork e comfort food americano. Ottimo con cibi piccanti poiché la dolcezza bilancia il calore.',
      vi: 'Hoàn hảo với barbecue miền Nam, gà rán, bánh sandwich thịt lợn xé, và đồ ăn comfort Mỹ. Tuyệt vời với đồ ăn cay vì vị ngọt cân bằng độ nóng.',
    },
    ideal_for: {
      en: 'Perfect for Jack Daniel\'s fans who want a refreshing, easy-drinking cocktail. Great for summer parties, barbecues, or anyone who enjoys sweet, citrusy drinks. Popular with those new to whiskey.',
      it: 'Perfetto per i fan di Jack Daniel\'s che vogliono un cocktail rinfrescante e facile da bere. Ottimo per feste estive, barbecue o per chiunque ami drink dolci e agrumati. Popolare tra i nuovi bevitori di whiskey.',
      vi: 'Hoàn hảo cho người hâm mộ Jack Daniel\'s muốn cocktail tươi mát, dễ uống. Tuyệt vời cho tiệc mùa hè, barbecue hoặc bất kỳ ai thích đồ uống ngọt, cam quýt. Phổ biến với những người mới với whiskey.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_JACK_DANIELS',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Jack Daniel\'s Tennessee Whiskey', it: 'Jack Daniel\'s Tennessee Whiskey', vi: 'Jack Daniel\'s Tennessee Whiskey' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Triple sec', it: 'Triple sec', vi: 'Triple sec' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_LEMON_LIME_SODA',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Lemon-lime soda (7-Up or Sprite)', it: 'Soda limone-lime (7-Up o Sprite)', vi: 'Soda chanh-lime (7-Up hoặc Sprite)' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour Jack Daniel\'s, triple sec, and fresh lemon juice over ice. Top with lemon-lime soda. Stir gently. Garnish with a lemon wheel and cherry.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare Jack Daniel\'s, triple sec e succo di limone fresco sul ghiaccio. Completare con soda limone-lime. Mescolare delicatamente. Guarnire con una rondella di limone e una ciliegia.',
    vi: 'Đổ đầy ly highball với đá. Rót Jack Daniel\'s, triple sec và nước chanh tươi lên đá. Thêm soda chanh-lime lên trên. Khuấy nhẹ nhàng. Trang trí với một vòng chanh và cherry.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon wheel and maraschino cherry',
    it: 'Rondella di limone e ciliegia maraschino',
    vi: 'Vòng chanh và cherry maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_JACK_DANIELS'],

  flavor_profile: ['sweet', 'citrus', 'lemon', 'refreshing'],

  abv_estimate: 9,

  calories_estimate: 205,

  difficulty: 'easy',

  prep_time_seconds: 35,

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
  occasion_tags: ['casual', 'party', 'barbecue', 'poolside'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['tennessee-lemonade', 'whiskey-lemonade'],

  notes_for_staff: 'Traditionally made with Jack Daniel\'s specifically. Use fresh lemon juice, not bottled. Can increase whiskey portion for stronger version. Very popular in Southern U.S.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1249/lynchburg-lemonade',
    note: 'Created 1980 by Tony Mason at TGI Friday\'s, Huntsville, Alabama.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
