/**
 * IBA Contemporary Classics: White Russian
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const whiteRussian: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6e5d4c3-b2a1-9f8e-7d6c-5b4a3e2d1c0b',
  slug: 'white-russian',
  stable_key: 'white_russian_iba_contemporary_classic',

  name: {
    en: 'White Russian',
    it: 'White Russian',
    vi: 'White Russian',
    ko: '화이트 러시안',
    ja: 'ホワイトルシアン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'creamy', 'coffee', 'dessert', 'after-dinner', 'cult-classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A decadent, creamy cocktail that adds fresh cream to the classic Black Russian. Smooth, sweet, and dangerously easy to drink - this coffee-flavored indulgence became a cultural icon thanks to "The Big Lebowski."',
    it: 'Un cocktail decadente e cremoso che aggiunge panna fresca al classico Black Russian. Morbido, dolce e pericolosamente facile da bere - questa indulgenza al caffè è diventata un\'icona culturale grazie a "Il Grande Lebowski."',
    vi: 'Một cocktail xa hoa, béo ngậy thêm kem tươi vào Black Russian cổ điển. Mượt mà, ngọt và nguy hiểm dễ uống - sự nuông chiều hương vị cà phê này trở thành biểu tượng văn hóa nhờ "The Big Lebowski."',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Oakland',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The White Russian is a variation of the Black Russian (created 1949), with cream added. The exact origins are unclear, but it gained popularity in the 1960s-70s. The drink was relatively obscure until the 1998 Coen Brothers film "The Big Lebowski," where Jeff Bridges\' character "The Dude" drinks White Russians throughout the movie. This catapulted the cocktail to cult status and renewed popularity.',
      it: 'Il White Russian è una variante del Black Russian (creato nel 1949), con l\'aggiunta di panna. Le origini esatte non sono chiare, ma ottenne popolarità negli anni \'60-\'70. Il drink era relativamente oscuro fino al film dei fratelli Coen del 1998 "Il Grande Lebowski," dove il personaggio di Jeff Bridges "The Dude" beve White Russian durante tutto il film. Questo catapultò il cocktail allo status di culto e rinnovata popolarità.',
      vi: 'White Russian là một biến thể của Black Russian (được tạo ra năm 1949), với kem được thêm vào. Nguồn gốc chính xác không rõ ràng, nhưng nó trở nên phổ biến vào những năm 1960-70. Thức uống tương đối ít người biết cho đến bộ phim năm 1998 của anh em Coen "The Big Lebowski," nơi nhân vật của Jeff Bridges "The Dude" uống White Russian xuyên suốt phim. Điều này đưa cocktail lên địa vị sùng bái và phổ biến trở lại.',
    },
    named_after: {
      en: 'Named "White Russian" due to the white color from cream, contrasting with the "Black Russian" which lacks cream.',
      it: 'Chiamato "White Russian" per il colore bianco dalla panna, in contrasto con il "Black Russian" che non ha panna.',
      vi: 'Được đặt tên "White Russian" do màu trắng từ kem, tương phản với "Black Russian" không có kem.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'smooth', 'boozy'],
    description: {
      en: 'Rich and velvety with prominent coffee flavor from Kahlúa, smooth vodka backbone, and luxurious cream. Sweet, indulgent, and dessert-like with balanced coffee and dairy notes.',
      it: 'Ricco e vellutato con prominente sapore di caffè dal Kahlúa, morbida base di vodka e panna lussuosa. Dolce, indulgente e simile a un dessert con note bilanciate di caffè e latticini.',
      vi: 'Đậm đà và mượt mà với hương vị cà phê nổi bật từ Kahlúa, xương sống vodka mượt mà và kem sang trọng. Ngọt, nuông chiều và giống món tráng miệng với hương cà phê và sữa cân bằng.',
    },
    first_impression: {
      en: 'Smooth cream and sweet coffee with vodka warmth',
      it: 'Panna morbida e caffè dolce con calore di vodka',
      vi: 'Kem mượt và cà phê ngọt với hơi ấm vodka',
    },
    finish: {
      en: 'Long, creamy finish with lingering coffee and vanilla notes',
      it: 'Finale lungo e cremoso con note persistenti di caffè e vaniglia',
      vi: 'Kết thúc dài, béo ngậy với hương cà phê và vani kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet coffee liqueur, neutral vodka, and rich cream',
      it: 'Ben bilanciato tra liquore al caffè dolce, vodka neutra e panna ricca',
      vi: 'Cân bằng tốt giữa rượu mùi cà phê ngọt, vodka trung tính và kem đậm đà',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'nightcap', 'casual', 'celebration'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Perfect as a dessert replacement or with chocolate desserts, brownies, tiramisu, coffee cake, or ice cream.',
      it: 'Perfetto come sostituto del dessert o con dessert al cioccolato, brownies, tiramisù, torta al caffè o gelato.',
      vi: 'Hoàn hảo như thay thế món tráng miệng hoặc với món tráng miệng chocolate, brownies, tiramisu, bánh cà phê hoặc kem.',
    },
    ideal_for: {
      en: 'Perfect for dessert cocktail lovers and fans of "The Big Lebowski." Ideal for those who enjoy creamy, sweet drinks with coffee flavor. A great introduction to cocktails for non-drinkers transitioning to spirits.',
      it: 'Perfetto per gli amanti dei cocktail da dessert e fan de "Il Grande Lebowski." Ideale per chi ama drink cremosi e dolci con sapore di caffè. Una grande introduzione ai cocktail per chi non beve e sta passando agli spirits.',
      vi: 'Hoàn hảo cho người yêu cocktail tráng miệng và fan của "The Big Lebowski." Lý tưởng cho những ai thích đồ uống béo ngậy, ngọt với hương vị cà phê. Giới thiệu tuyệt vời về cocktail cho người không uống chuyển sang rượu mạnh.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Coffee liqueur (Kahlúa)', it: 'Liquore al caffè (Kahlúa)', vi: 'Rượu mùi cà phê (Kahlúa)' },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh cream', it: 'Panna fresca', vi: 'Kem tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour vodka and coffee liqueur into an old fashioned glass filled with ice cubes. Float fresh cream on top. Stir gently before drinking, or drink through the cream.',
    it: 'Versare vodka e liquore al caffè in un bicchiere old fashioned pieno di cubetti di ghiaccio. Far galleggiare la panna fresca sopra. Mescolare delicatamente prima di bere, o bere attraverso la panna.',
    vi: 'Đổ vodka và rượu mùi cà phê vào ly old fashioned đầy đá viên. Cho kem tươi nổi trên mặt. Khuấy nhẹ trước khi uống, hoặc uống qua lớp kem.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'None (optional: coffee beans)',
    it: 'Nessuna (opzionale: chicchi di caffè)',
    vi: 'Không (tùy chọn: hạt cà phê)',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'sweet', 'smooth', 'boozy'],

  abv_estimate: 18,

  calories_estimate: 300,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['digestivo', 'nightcap', 'casual', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['black-russian', 'dirty-russian', 'mudslide', 'colorado-bulldog'],

  notes_for_staff: 'The cream can be floated on top (layered) for visual appeal, or stirred in for consistency. "The Dude" from The Big Lebowski is famous for drinking these - popular culture reference. Can substitute half-and-half for cream if preferred lighter. Kahlúa is traditional but any coffee liqueur works. Deceptively strong despite creamy sweetness.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/white-russian/',
    note: 'IBA Official Recipe. Cultural reference from "The Big Lebowski" (1998).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
