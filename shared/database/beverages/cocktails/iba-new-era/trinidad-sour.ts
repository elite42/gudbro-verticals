/**
 * IBA New Era Drinks: Trinidad Sour
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const trinidadSour: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
  slug: 'trinidad-sour',
  stable_key: 'f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',

  name: {
    en: 'Trinidad Sour',
    it: 'Trinidad Sour',
    vi: 'Trinidad Sour',
    ko: '트리니다드 사워',
    ja: 'トリニダード・サワー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'sour', 'bitter', 'revolutionary', 'bold'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A revolutionary modern cocktail that flips the traditional formula by using Angostura bitters as the base spirit instead of an accent. This bold creation showcases how bitters can be the star, balanced with rye whiskey, orgeat, and lemon. The result is an intensely aromatic and complex drink.',
    it: 'Un cocktail moderno rivoluzionario che ribalta la formula tradizionale usando l\'Angostura bitters come spirito di base invece che come accento. Questa creazione audace mostra come i bitter possano essere la stella, bilanciati con whiskey di segale, orzata e limone. Il risultato è una bevanda intensamente aromatica e complessa.',
    vi: 'Một cocktail hiện đại cách mạng đảo ngược công thức truyền thống bằng cách sử dụng Angostura bitters làm rượu cơ sở thay vì điểm nhấn. Sáng tạo táo bạo này cho thấy bitters có thể là ngôi sao, cân bằng với rye whiskey, orgeat và chanh. Kết quả là đồ uống thơm mãnh liệt và phức tạp.',
  },

  history: {
    created_year: '2009',
    origin: {
      city: 'New York City',
      bar: 'Clover Club',
      country: 'USA',
    },
    creator: {
      name: 'Giuseppe Gonzalez',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Giuseppe Gonzalez at Clover Club in Brooklyn in 2009, the Trinidad Sour was a groundbreaking cocktail that challenged conventional thinking. Gonzalez wanted to showcase Angostura bitters - traditionally used by the dash - as the primary ingredient. The audacious proportions (1.5 oz of bitters!) shouldn\'t work on paper, but the careful balance with orgeat\'s sweetness, lemon\'s acidity, and rye\'s spice creates something remarkably drinkable and complex. It inspired bartenders worldwide to rethink ingredient hierarchies.',
      it: 'Creato da Giuseppe Gonzalez al Clover Club a Brooklyn nel 2009, il Trinidad Sour fu un cocktail rivoluzionario che sfidò il pensiero convenzionale. Gonzalez voleva mostrare l\'Angostura bitters - tradizionalmente usato a gocce - come ingrediente principale. Le proporzioni audaci (45 ml di bitter!) non dovrebbero funzionare sulla carta, ma l\'equilibrio attento con la dolcezza dell\'orzata, l\'acidità del limone e la speziatura del segale crea qualcosa di straordinariamente bevibile e complesso. Ha ispirato i barman di tutto il mondo a ripensare le gerarchie degli ingredienti.',
      vi: 'Được tạo ra bởi Giuseppe Gonzalez tại Clover Club ở Brooklyn năm 2009, Trinidad Sour là cocktail đột phá thách thức tư duy thông thường. Gonzalez muốn giới thiệu Angostura bitters - thường được dùng từng giọt - làm nguyên liệu chính. Tỷ lệ táo bạo (45 ml bitters!) không nên hoạt động trên giấy, nhưng sự cân bằng cẩn thận với vị ngọt của orgeat, độ chua chanh và gia vị rye tạo ra thứ gì đó đáng kinh ngạc dễ uống và phức tạp. Nó truyền cảm hứng cho bartender trên toàn thế giới suy nghĩ lại về thứ bậc nguyên liệu.',
    },
    named_after: {
      en: 'Named after Trinidad, the birthplace of Angostura bitters (House of Angostura was founded in Trinidad in 1824).',
      it: 'Prende il nome da Trinidad, il luogo di nascita dell\'Angostura bitters (House of Angostura fu fondata a Trinidad nel 1824).',
      vi: 'Được đặt tên theo Trinidad, nơi sinh của Angostura bitters (House of Angostura được thành lập ở Trinidad năm 1824).',
    },
  },

  taste: {
    profile: ['bitter', 'spicy', 'aromatic', 'complex'],
    description: {
      en: 'Intensely aromatic with powerful baking spices, clove, cinnamon, and gentian bitterness balanced by almond-sweet orgeat and bright lemon acidity. The rye adds a spicy backbone that ties everything together. Surprisingly smooth despite the bold bitters content.',
      it: 'Intensamente aromatico con potenti spezie da forno, chiodi di garofano, cannella e amarezza di genziana bilanciata dall\'orzata dolce di mandorle e vivace acidità di limone. Il segale aggiunge una struttura speziata che lega tutto insieme. Sorprendentemente morbido nonostante il contenuto audace di bitter.',
      vi: 'Thơm mãnh liệt với gia vị nướng mạnh mẽ, đinh hương, quế và vị đắng gentian cân bằng bởi orgeat ngọt hạnh nhân và độ chua chanh tươi sáng. Rye thêm xương sống cay liên kết mọi thứ lại. Mượt mà đáng ngạc nhiên bất chấp hàm lượng bitters táo bạo.',
    },
    first_impression: {
      en: 'Powerful aromatic spices and bitterness with almond sweetness',
      it: 'Potenti spezie aromatiche e amarezza con dolcezza di mandorla',
      vi: 'Gia vị thơm mạnh mẽ và vị đắng với vị ngọt hạnh nhân',
    },
    finish: {
      en: 'Long, warming finish with lingering spice and bitter complexity',
      it: 'Finale lungo e caldo con spezie persistenti e complessità amara',
      vi: 'Kết thúc dài, ấm với gia vị kéo dài và độ phức tạp đắng',
    },
    balance: {
      en: 'Remarkably balanced given the extreme proportions - bitter, sweet, sour, and spicy in harmony',
      it: 'Straordinariamente bilanciato date le proporzioni estreme - amaro, dolce, acido e speziato in armonia',
      vi: 'Cân bằng đáng kinh ngạc cho tỷ lệ cực đoan - đắng, ngọt, chua và cay hòa hợp',
    },
  },

  recommendations: {
    best_time: ['evening', 'after_dinner'],
    occasions: ['digestivo', 'cocktail_party', 'date_night', 'tasting_menu'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with rich meats, dark chocolate, spiced desserts, aged cheeses, and bold Caribbean cuisine.',
      it: 'Si abbina bene con carni ricche, cioccolato fondente, dessert speziati, formaggi stagionati e audace cucina caraibica.',
      vi: 'Kết hợp tốt với thịt đậm đà, chocolate đen, tráng miệng gia vị, phô mai ủ và ẩm thực Caribbean đậm đà.',
    },
    ideal_for: {
      en: 'Perfect for adventurous cocktail enthusiasts who appreciate bitter flavors and innovative mixology. Ideal for amaro and bitters lovers. Great as a conversation starter and digestif.',
      it: 'Perfetto per appassionati di cocktail avventurosi che apprezzano sapori amari e mixology innovativa. Ideale per gli amanti di amaro e bitter. Ottimo come apertura di conversazione e digestivo.',
      vi: 'Hoàn hảo cho người đam mê cocktail phiêu lưu đánh giá cao hương vị đắng và nghệ thuật pha chế sáng tạo. Lý tưởng cho người yêu amaro và bitters. Tuyệt vời làm điểm khởi đầu cuộc trò chuyện và digestif.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Whiskey di segale', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_ORGEAT',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Orgeat syrup', it: 'Sciroppo di orzata', vi: 'Siro orgeat' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled (15-20 seconds is crucial for proper dilution). Double strain into a chilled coupe or Nick & Nora glass. Garnish with a lemon twist, expressing the oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene (15-20 secondi sono cruciali per una diluizione corretta). Filtrare due volte in una coppa o bicchiere Nick & Nora raffreddato. Guarnire con una scorza di limone, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ (15-20 giây rất quan trọng cho sự pha loãng đúng). Lọc kép vào ly coupe hoặc Nick & Nora đã làm lạnh. Trang trí với vỏ chanh xoắn, vắt tinh dầu lên đồ uống.',
  },

  glass: 'Coupe or Nick & Nora glass',

  garnish: {
    en: 'Lemon twist (expressed)',
    it: 'Scorza di limone (espressa)',
    vi: 'Vỏ chanh xoắn (vắt)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_ANGOSTURA_BITTERS'],

  flavor_profile: ['bitter', 'spicy', 'aromatic', 'complex'],

  abv_estimate: 20,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['tree_nuts', 'sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'date_night', 'cocktail_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bourbon-trinidad-sour', 'trinidad-especial'],

  notes_for_staff: 'Yes, 1.5 oz of Angostura is correct! Proper dilution through shaking is critical. Quality orgeat is essential. Express lemon oils generously. This drink converts bitter skeptics.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/trinidad-sour/',
    note: 'IBA Official Recipe. Created by Giuseppe Gonzalez at Clover Club, Brooklyn, 2009.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
