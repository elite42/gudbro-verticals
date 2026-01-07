/**
 * IBA Contemporary Classics: Long Island Iced Tea
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const longIslandIcedTea: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  slug: 'long-island-iced-tea',
  stable_key: 'long_island_iced_tea_iba_contemporary_2025',

  name: {
    en: 'Long Island Iced Tea',
    it: 'Long Island Iced Tea',
    vi: 'Long Island Iced Tea',
    ko: '롱 아일랜드 아이스티',
    ja: 'ロングアイランド・アイスティー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'strong', 'party', 'deceptive'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A deceptively strong cocktail combining five spirits with cola and lemon juice. Despite its name and appearance, it contains no tea but resembles iced tea in color. Famous for its potency masked by refreshing sweetness.',
    it: "Un cocktail ingannevolmente forte che combina cinque distillati con cola e succo di limone. Nonostante il nome e l'aspetto, non contiene tè ma somiglia al tè freddo nel colore. Famoso per la sua potenza mascherata dalla dolcezza rinfrescante.",
    vi: 'Một loại cocktail mạnh đánh lừa kết hợp năm loại rượu với cola và nước chanh. Mặc dù có tên và vẻ ngoài như vậy, nó không chứa trà nhưng giống trà đá về màu sắc. Nổi tiếng với độ mạnh được che giấu bởi vị ngọt sảng khoái.',
  },

  history: {
    created_year: '1972',
    origin: {
      city: 'Long Island',
      bar: 'Oak Beach Inn',
      country: 'USA',
    },
    creator: {
      name: 'Robert "Rosebud" Butt',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 1972 by Robert "Rosebud" Butt at the Oak Beach Inn in Hampton Bays, Long Island. According to Butt, he created it for a cocktail competition where the challenge was to create a new mixed drink using triple sec. The drink became famous for containing nearly equal parts of vodka, tequila, rum, gin, and triple sec, making it one of the strongest cocktails served in bars.',
      it: 'Creato nel 1972 da Robert "Rosebud" Butt all\'Oak Beach Inn di Hampton Bays, Long Island. Secondo Butt, lo creò per una competizione di cocktail dove la sfida era creare un nuovo drink usando triple sec. Il drink divenne famoso per contenere parti quasi uguali di vodka, tequila, rum, gin e triple sec, rendendolo uno dei cocktail più forti serviti nei bar.',
      vi: 'Được tạo ra vào năm 1972 bởi Robert "Rosebud" Butt tại Oak Beach Inn ở Hampton Bays, Long Island. Theo Butt, ông đã tạo ra nó cho một cuộc thi cocktail nơi thử thách là tạo một đồ uống pha chế mới sử dụng triple sec. Thức uống trở nên nổi tiếng vì chứa gần như các phần bằng nhau của vodka, tequila, rum, gin và triple sec, khiến nó trở thành một trong những cocktail mạnh nhất được phục vụ trong các quán bar.',
    },
    named_after: {
      en: 'Named after Long Island, New York, where it was created. The "iced tea" part refers to its resemblance to the non-alcoholic beverage.',
      it: 'Prende il nome da Long Island, New York, dove è stato creato. La parte "iced tea" si riferisce alla sua somiglianza con la bevanda analcolica.',
      vi: 'Được đặt theo tên Long Island, New York, nơi nó được tạo ra. Phần "iced tea" đề cập đến sự giống nhau với đồ uống không cồn.',
    },
  },

  taste: {
    profile: ['sweet', 'strong', 'citrus'],
    description: {
      en: "Surprisingly smooth despite high alcohol content. The combination of spirits creates a complex flavor that's balanced by cola sweetness and lemon tartness. Dangerously easy to drink for its strength.",
      it: "Sorprendentemente morbido nonostante l'alto contenuto alcolico. La combinazione di distillati crea un sapore complesso bilanciato dalla dolcezza della cola e dall'acidità del limone. Pericolosamente facile da bere per la sua forza.",
      vi: 'Mượt mà đáng ngạc nhiên mặc dù có hàm lượng cồn cao. Sự kết hợp của các loại rượu tạo ra hương vị phức tạp được cân bằng bởi vị ngọt của cola và vị chua của chanh. Nguy hiểm dễ uống so với độ mạnh của nó.',
    },
    first_impression: {
      en: 'Sweet and citrusy like iced tea, masking the alcohol strength',
      it: 'Dolce e agrumato come tè freddo, mascherando la forza alcolica',
      vi: 'Ngọt và chanh như trà đá, che giấu độ mạnh của rượu',
    },
    finish: {
      en: "Warm alcohol finish that reveals the drink's true strength",
      it: 'Finale alcolico caldo che rivela la vera forza del drink',
      vi: 'Kết thúc rượu ấm tiết lộ sức mạnh thực sự của thức uống',
    },
    balance: {
      en: 'Carefully balanced to hide its potency - deceptively smooth',
      it: 'Attentamente bilanciato per nascondere la sua potenza - ingannevolmente morbido',
      vi: 'Cân bằng cẩn thận để che giấu độ mạnh - mượt mà đánh lừa',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'nightclub'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Best enjoyed on its own or with light snacks like chips, pretzels, or bar nuts. The high alcohol content makes it less suitable for pairing with full meals.',
      it: "Meglio gustato da solo o con snack leggeri come patatine, salatini o noci da bar. L'alto contenuto alcolico lo rende meno adatto per abbinamenti con pasti completi.",
      vi: 'Tốt nhất thưởng thức riêng hoặc với đồ ăn nhẹ như khoai tây chiên, bánh quy mặn hoặc hạt. Hàm lượng cồn cao khiến nó ít phù hợp để kết hợp với bữa ăn đầy đủ.',
    },
    ideal_for: {
      en: 'Perfect for experienced drinkers who want a strong cocktail. Be cautious - the smooth taste masks significant alcohol content. Not recommended for those new to cocktails.',
      it: 'Perfetto per bevitori esperti che vogliono un cocktail forte. Attenzione - il gusto morbido maschera un contenuto alcolico significativo. Non raccomandato per chi è nuovo ai cocktail.',
      vi: 'Hoàn hảo cho những người uống có kinh nghiệm muốn một cocktail mạnh. Hãy cẩn thận - hương vị mượt che giấu hàm lượng cồn đáng kể. Không khuyến nghị cho người mới với cocktail.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_TEQUILA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Tequila', it: 'Tequila', vi: 'Tequila' },
    },
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Triple sec', it: 'Triple sec', vi: 'Triple sec' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 25, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_COLA',
      quantity: { amount: 1, unit: 'splash' },
      display_name: { en: 'Cola', it: 'Cola', vi: 'Cola' },
      notes: { en: 'splash to top', it: 'splash per completare', vi: 'splash để hoàn thành' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients except cola into a shaker with ice and shake. Strain into a highball glass filled with fresh ice. Top with a splash of cola for color. Garnish with a lemon slice.',
    it: 'Aggiungere tutti gli ingredienti tranne la cola in uno shaker con ghiaccio e shakerare. Filtrare in un bicchiere highball pieno di ghiaccio fresco. Completare con uno splash di cola per il colore. Guarnire con una fetta di limone.',
    vi: 'Thêm tất cả nguyên liệu trừ cola vào shaker với đá và lắc. Lọc vào ly highball đầy đá tươi. Đổ một splash cola để tạo màu. Trang trí với một lát chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon slice',
    it: 'Fetta di limone',
    vi: 'Lát chanh',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA', 'ING_TEQUILA', 'ING_RUM_WHITE', 'ING_GIN', 'ING_TRIPLE_SEC'],

  flavor_profile: ['sweet', 'strong', 'citrus'],

  abv_estimate: 22,

  calories_estimate: 275,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'caffeine', 'sulphites_intolerance'],
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
  occasion_tags: ['party', 'celebration', 'nightclub'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['tokyo-tea', 'texas-tea', 'electric-iced-tea'],

  notes_for_staff:
    'WARNING: Very high alcohol content. Advise customers to drink responsibly. Use only a splash of cola - too much will overpower. All spirits should be measured precisely. This is NOT a drink to make carelessly.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/long-island-iced-tea/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
