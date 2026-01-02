/**
 * Famous Cocktails: Trinidad Especial
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const trinidadEspecial: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
  slug: 'trinidad-especial',
  stable_key: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a07',

  name: {
    en: 'Trinidad Especial',
    it: 'Trinidad Especial',
    vi: 'Trinidad Especial',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'rum', 'bitter', 'complex'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An audacious cocktail featuring Angostura bitters as the primary ingredient, balanced with orgeat, rye whiskey, and lemon juice. The Trinidad Especial is a bold, spice-forward drink that challenges cocktail conventions.',
    it: 'Un cocktail audace che presenta i bitter Angostura come ingrediente principale, bilanciato con orzata, whiskey di segale e succo di limone. Il Trinidad Especial è una bevanda audace e speziata che sfida le convenzioni dei cocktail.',
    vi: 'Một loại cocktail táo bạo với Angostura bitters là nguyên liệu chính, cân bằng với orgeat, rye whiskey và nước chanh. Trinidad Especial là đồ uống táo bạo, hướng gia vị thách thức các quy ước cocktail.',
  },

  history: {
    created_year: '2009',
    origin: {
      city: 'San Francisco',
      bar: 'Clyde Common',
      country: 'USA',
    },
    creator: {
      name: 'Giuseppe González',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Giuseppe González in 2009 while working at Clyde Common in San Francisco, the Trinidad Especial is one of the most unusual modern classics. González boldly flipped traditional proportions by using a full 1.5 ounces of Angostura bitters as the base spirit - something previously unheard of. The result is a surprisingly balanced cocktail that showcases the complex spice notes of Angostura bitters. The drink quickly gained cult status among adventurous bartenders and cocktail enthusiasts.',
      it: 'Creato da Giuseppe González nel 2009 mentre lavorava al Clyde Common di San Francisco, il Trinidad Especial è uno dei classici moderni più insoliti. González ha audacemente invertito le proporzioni tradizionali usando ben 45 ml di bitter Angostura come base - qualcosa mai sentito prima. Il risultato è un cocktail sorprendentemente bilanciato che mette in mostra le note speziate complesse dei bitter Angostura. La bevanda ha rapidamente guadagnato status di culto tra bartender avventurosi e appassionati di cocktail.',
      vi: 'Được tạo ra bởi Giuseppe González năm 2009 khi làm việc tại Clyde Common ở San Francisco, Trinidad Especial là một trong những cocktail cổ điển hiện đại bất thường nhất. González táo bạo đảo ngược tỷ lệ truyền thống bằng cách sử dụng tới 45ml Angostura bitters làm rượu cơ bản - điều chưa từng nghe trước đây. Kết quả là cocktail cân bằng đáng ngạc nhiên thể hiện hương gia vị phức tạp của Angostura bitters. Đồ uống nhanh chóng đạt địa vị sùng bái trong các bartender mạo hiểm và người đam mê cocktail.',
    },
    named_after: {
      en: 'Named after Trinidad, where Angostura bitters are produced. "Especial" emphasizes the drink\'s special, unconventional character.',
      it: 'Chiamato così da Trinidad, dove vengono prodotti i bitter Angostura. "Especial" sottolinea il carattere speciale e non convenzionale della bevanda.',
      vi: 'Được đặt tên theo Trinidad, nơi sản xuất Angostura bitters. "Especial" nhấn mạnh đặc tính đặc biệt, không theo quy ước của đồ uống.',
    },
  },

  taste: {
    profile: ['spicy', 'bitter', 'complex'],
    description: {
      en: 'Intensely aromatic and spicy with surprising balance. The dominant Angostura bitters provide warm spice notes of cinnamon, clove, and gentian. Orgeat adds almond sweetness and creamy texture, while rye whiskey and lemon juice provide structure and brightness.',
      it: 'Intensamente aromatico e speziato con equilibrio sorprendente. I bitter Angostura dominanti forniscono note speziate calde di cannella, chiodi di garofano e genziana. L\'orzata aggiunge dolcezza di mandorla e consistenza cremosa, mentre il whiskey di segale e il succo di limone forniscono struttura e luminosità.',
      vi: 'Thơm mãnh liệt và cay với sự cân bằng đáng ngạc nhiên. Angostura bitters chủ đạo mang đến hương gia vị ấm của quế, đinh hương và long đởm. Orgeat thêm vị ngọt hạnh nhân và kết cấu kem, trong khi rye whiskey và nước chanh mang đến cấu trúc và độ sáng.',
    },
    first_impression: {
      en: 'Bold bitters and warm spices hit immediately, followed by almond sweetness and whiskey depth',
      it: 'Bitter audaci e spezie calde colpiscono immediatamente, seguite da dolcezza di mandorla e profondità del whiskey',
      vi: 'Bitters táo bạo và gia vị ấm áp đập vào ngay lập tức, tiếp theo là vị ngọt hạnh nhân và chiều sâu whiskey',
    },
    finish: {
      en: 'Long, warming finish with lingering baking spices and almond notes',
      it: 'Finale lungo e caldo con note persistenti di spezie da forno e mandorla',
      vi: 'Kết thúc dài, ấm áp với gia vị nướng và hạnh nhân kéo dài',
    },
    balance: {
      en: 'Remarkably balanced despite unconventional proportions - orgeat sweetness tames the intense bitters',
      it: 'Straordinariamente bilanciato nonostante le proporzioni non convenzionali - la dolcezza dell\'orzata doma i bitter intensi',
      vi: 'Cân bằng đáng kể mặc dù tỷ lệ không theo quy ước - vị ngọt orgeat thuần hóa bitters mạnh mẽ',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['cocktail_hour', 'special_occasion', 'adventurous_tasting'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with spiced desserts, dark chocolate, roasted nuts, and strong cheeses. The complex spice profile complements rich, bold flavors.',
      it: 'Eccellente con dessert speziati, cioccolato fondente, noci tostate e formaggi forti. Il profilo speziato complesso complementa sapori ricchi e audaci.',
      vi: 'Tuyệt vời với tráng miệng gia vị, chocolate đen, hạt rang và phô mai mạnh. Hương vị gia vị phức tạp bổ sung cho hương vị đậm đà, táo bạo.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who appreciate bold, unconventional cocktails. Ideal for bitters enthusiasts and those seeking truly unique experiences.',
      it: 'Perfetto per bevitori avventurosi che apprezzano cocktail audaci e non convenzionali. Ideale per gli appassionati di bitter e per chi cerca esperienze veramente uniche.',
      vi: 'Hoàn hảo cho người uống mạo hiểm thích cocktail táo bạo, không theo quy ước. Lý tưởng cho người đam mê bitters và những ai tìm kiếm trải nghiệm thực sự độc đáo.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Angostura bitters',
        it: 'Bitter Angostura',
        vi: 'Angostura bitters',
      },
    },
    {
      ingredient_id: 'ING_ORGEAT',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Orgeat',
        it: 'Orzata',
        vi: 'Orgeat',
      },
    },
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Whiskey di segale', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe glass. Garnish with a lemon twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata. Guarnire con una twist di limone.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe đã làm lạnh. Trang trí với vỏ chanh xoắn.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Lemon twist',
    it: 'Twist di limone',
    vi: 'Vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_ANGOSTURA_BITTERS'],

  flavor_profile: ['spicy', 'bitter', 'complex'],

  abv_estimate: 26,

  calories_estimate: 175,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['tree_nuts', 'sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'nut_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['cocktail_hour', 'special_occasion', 'adventurous_tasting'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['trinidad-sour'],

  notes_for_staff: 'Yes, the recipe calls for 1.5 oz of Angostura bitters as the base! This is intentional and creates the signature character. Use quality orgeat (preferably house-made). Warn guests about the unconventional nature before serving.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'Created by Giuseppe González, 2009',
    note: 'One of the most unconventional modern classics. Featured in numerous cocktail publications.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
