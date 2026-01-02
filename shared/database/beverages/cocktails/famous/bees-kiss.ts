/**
 * Famous Cocktails: Bee's Kiss
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const beesKiss: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8a4c9f3-5d2e-4b1f-9e6a-2d3f4e5a6b7c',
  slug: 'bees-kiss',
  stable_key: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',

  name: {
    en: "Bee's Kiss",
    it: "Bee's Kiss",
    vi: "Bee's Kiss",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'rum', 'sweet', 'creamy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A luscious Prohibition-era cocktail featuring rum, honey, and heavy cream. The Bee\'s Kiss is a forgotten classic that delivers smooth sweetness with a velvety texture and tropical warmth.',
    it: 'Un cocktail lussuoso dell\'era del Proibizionismo con rum, miele e panna. Il Bee\'s Kiss è un classico dimenticato che offre dolcezza morbida con una consistenza vellutata e calore tropicale.',
    vi: 'Một loại cocktail ngon lành thời kỳ Cấm rượu với rum, mật ong và kem đặc. Bee\'s Kiss là món cổ điển bị lãng quên mang đến vị ngọt mượt mà với kết cấu mượt như nhung và hơi ấm nhiệt đới.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Bee\'s Kiss appeared in the early 1930s as Prohibition was ending. Featured in Frank Meier\'s "The Artistry of Mixing Drinks" (1936), this cocktail was part of the "Bee\'s Knees" family of drinks that used honey to sweeten and mask lower-quality spirits. The creamy version became popular in Cuba and eventually made its way to American cocktail bars.',
      it: 'Il Bee\'s Kiss apparve all\'inizio degli anni \'30 quando il Proibizionismo stava finendo. Presente in "The Artistry of Mixing Drinks" (1936) di Frank Meier, questo cocktail faceva parte della famiglia di drink "Bee\'s Knees" che usavano il miele per dolcificare e mascherare gli spiriti di qualità inferiore. La versione cremosa divenne popolare a Cuba e alla fine arrivò nei cocktail bar americani.',
      vi: 'Bee\'s Kiss xuất hiện vào đầu những năm 1930 khi thời kỳ Cấm rượu sắp kết thúc. Được giới thiệu trong "The Artistry of Mixing Drinks" (1936) của Frank Meier, cocktail này là một phần của họ đồ uống "Bee\'s Knees" sử dụng mật ong để làm ngọt và che giấu rượu chất lượng thấp hơn. Phiên bản kem trở nên phổ biến ở Cuba và cuối cùng đến các quán bar cocktail Mỹ.',
    },
    named_after: {
      en: 'Named after the sweetness of a bee\'s kiss, referencing the honey used in the recipe and the smooth, sweet character of the drink.',
      it: 'Prende il nome dalla dolcezza del bacio di un\'ape, riferendosi al miele usato nella ricetta e al carattere dolce e morbido del drink.',
      vi: 'Được đặt theo tên sự ngọt ngào của nụ hôn ong, ám chỉ mật ong được sử dụng trong công thức và tính chất ngọt ngào, mượt mà của thức uống.',
    },
  },

  taste: {
    profile: ['sweet', 'creamy', 'smooth'],
    description: {
      en: 'Rich and velvety with honey sweetness balanced by the warmth of rum and smoothness of cream. A decadent, dessert-like cocktail with tropical undertones.',
      it: 'Ricco e vellutato con dolcezza di miele bilanciata dal calore del rum e dalla morbidezza della panna. Un cocktail decadente, simile a un dessert con note tropicali sottostanti.',
      vi: 'Đậm đà và mượt như nhung với vị ngọt mật ong được cân bằng bởi hơi ấm của rum và sự mịn màng của kem. Một loại cocktail xa hoa, giống món tráng miệng với tông màu nhiệt đới.',
    },
    first_impression: {
      en: 'Creamy honey sweetness upfront with gentle rum warmth',
      it: 'Dolcezza cremosa di miele in primo piano con delicato calore di rum',
      vi: 'Vị ngọt mật ong béo ngậy trước với hơi ấm rum nhẹ nhàng',
    },
    finish: {
      en: 'Smooth, lingering honey finish with subtle rum spice',
      it: 'Finale morbido e persistente di miele con spezie sottili di rum',
      vi: 'Kết thúc mượt mà, kéo dài mật ong với gia vị rum tinh tế',
    },
    balance: {
      en: 'Well-balanced between sweetness and spirit - indulgent but not cloying',
      it: 'Ben bilanciato tra dolcezza e spirito - indulgente ma non stucchevole',
      vi: 'Cân bằng tốt giữa vị ngọt và rượu - nuông chiều nhưng không quá ngọt gắt',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['date_night', 'dessert', 'nightcap', 'special_occasion'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with chocolate desserts, banana foster, crème brûlée, or as a dessert replacement. Pairs well with tropical fruits and caramelized sweets.',
      it: 'Eccellente con dessert al cioccolato, banana foster, crème brûlée, o come sostituto del dessert. Si abbina bene con frutta tropicale e dolci caramellati.',
      vi: 'Tuyệt vời với các món tráng miệng chocolate, chuối foster, crème brûlée, hoặc thay thế món tráng miệng. Kết hợp tốt với trái cây nhiệt đới và kẹo caramen.',
    },
    ideal_for: {
      en: 'Perfect for rum lovers who enjoy creamy, dessert-style cocktails. Ideal for those seeking a sweet, indulgent drink with vintage charm.',
      it: 'Perfetto per gli amanti del rum che apprezzano cocktail cremosi in stile dessert. Ideale per chi cerca un drink dolce e indulgente con fascino vintage.',
      vi: 'Hoàn hảo cho người yêu rum thích cocktail béo ngậy, kiểu tráng miệng. Lý tưởng cho những ai tìm kiếm thức uống ngọt ngào, nuông chiều với nét quyến rũ cổ điển.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHITE_RUM',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Heavy cream', it: 'Panna', vi: 'Kem đặc' },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Honey syrup', it: 'Sciroppo di miele', vi: 'Xi-rô mật ong' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled and properly emulsified. Strain into a chilled coupe glass. No garnish needed.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene ed emulsionare correttamente. Filtrare in una coppa raffreddata. Non serve guarnizione.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ và nhũ hóa đúng cách. Lọc vào ly coupe đã làm lạnh. Không cần trang trí.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHITE_RUM'],

  flavor_profile: ['sweet', 'creamy', 'smooth'],

  abv_estimate: 15,

  calories_estimate: 240,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['date_night', 'dessert', 'nightcap', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bees-knees', 'gold-rush'],

  notes_for_staff: 'Shake hard to properly emulsify cream with honey. Use honey syrup (3:1 honey to water) for easier mixing. Can substitute aged rum for deeper flavor. Ensure all ingredients are well-chilled before shaking.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/384/bees-kiss',
    note: 'Based on Frank Meier\'s 1936 recipe. Historical information from vintage cocktail books.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
