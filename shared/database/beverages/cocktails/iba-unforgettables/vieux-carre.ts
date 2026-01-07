/**
 * IBA Unforgettables: Vieux Carré
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const vieuxCarre: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  slug: 'vieux-carre',
  stable_key: 'e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9',

  name: {
    en: 'Vieux Carré',
    it: 'Vieux Carré',
    vi: 'Vieux Carré',
    ko: '비유 카레',
    ja: 'ヴュー・カレ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'stirred', 'complex', 'new-orleans'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A sophisticated New Orleans classic that masterfully blends rye whiskey, cognac, and sweet vermouth with the herbal complexity of Bénédictine and aromatic Peychaud's bitters. Named after the French Quarter, this cocktail represents the cultural fusion of French and American spirits.",
    it: "Un sofisticato classico di New Orleans che unisce magistralmente rye whiskey, cognac e vermouth dolce con la complessità erbacea del Bénédictine e gli aromatici Peychaud's bitters. Prende il nome dal quartiere francese, questo cocktail rappresenta la fusione culturale degli spiriti francesi e americani.",
    vi: "Một tác phẩm kinh điển tinh tế của New Orleans khéo léo pha trộn rye whiskey, cognac và vermouth ngọt với độ phức tạp thảo mộc của Bénédictine và Peychaud's bitters thơm. Được đặt tên theo Khu Pháp, cocktail này đại diện cho sự hợp nhất văn hóa của rượu Pháp và Mỹ.",
  },

  history: {
    created_year: '1938',
    origin: {
      city: 'New Orleans',
      bar: 'Hotel Monteleone',
      country: 'USA',
    },
    creator: {
      name: 'Walter Bergeron',
      profession: 'Head Bartender',
    },
    story: {
      en: 'The Vieux Carré was invented by Walter Bergeron, Head Bartender at the Hotel Monteleone in New Orleans, in the early or mid-1930s. "Vieux Carré" translates as "old square" and refers to the original name of the French Quarter in New Orleans. The cocktail was one of 6 drinks added to The Unforgettables category in the 2020 IBA update, cementing its place among classic cocktails. The Hotel Monteleone, where it was created, still operates today and features a famous rotating carousel bar.',
      it: 'Il Vieux Carré fu inventato da Walter Bergeron, Head Bartender all\'Hotel Monteleone di New Orleans, nei primi o metà anni \'30. "Vieux Carré" si traduce come "vecchio quadrato" e si riferisce al nome originale del quartiere francese di New Orleans. Il cocktail fu uno dei 6 drink aggiunti alla categoria Unforgettables nell\'aggiornamento IBA del 2020, cementando il suo posto tra i cocktail classici. L\'Hotel Monteleone, dove fu creato, opera ancora oggi e presenta un famoso bar a carosello rotante.',
      vi: 'Vieux Carré được phát minh bởi Walter Bergeron, Trưởng Bartender tại Hotel Monteleone ở New Orleans, vào đầu hoặc giữa những năm 1930. "Vieux Carré" dịch là "quảng trường cũ" và đề cập đến tên gốc của Khu Pháp ở New Orleans. Cocktail là một trong 6 đồ uống được thêm vào danh mục Unforgettables trong bản cập nhật IBA 2020, củng cố vị trí của nó trong số các cocktail cổ điển. Hotel Monteleone, nơi nó được tạo ra, vẫn hoạt động cho đến ngày nay và có quầy bar đu quay nổi tiếng.',
    },
    named_after: {
      en: 'Named after the French Quarter in New Orleans, originally called "Vieux Carré" (Old Square).',
      it: 'Prende il nome dal quartiere francese di New Orleans, originariamente chiamato "Vieux Carré" (Vecchio Quadrato).',
      vi: 'Được đặt tên theo Khu Pháp ở New Orleans, ban đầu gọi là "Vieux Carré" (Quảng trường Cũ).',
    },
  },

  taste: {
    profile: ['complex', 'herbal', 'boozy'],
    description: {
      en: "Rich, complex, and beautifully balanced. The combination of rye and cognac creates depth and warmth, while sweet vermouth adds smoothness. Bénédictine brings herbal complexity, and Peychaud's bitters provide a distinctive anise-forward spice.",
      it: "Ricco, complesso e magnificamente bilanciato. La combinazione di segale e cognac crea profondità e calore, mentre il vermouth dolce aggiunge morbidezza. Il Bénédictine porta complessità erbacea e i Peychaud's bitters forniscono una spezia distintiva all'anice.",
      vi: "Đậm đà, phức tạp và cân bằng tuyệt đẹp. Sự kết hợp giữa rye và cognac tạo ra chiều sâu và ấm áp, trong khi vermouth ngọt thêm độ mượt mà. Bénédictine mang đến độ phức tạp thảo mộc và Peychaud's bitters cung cấp gia vị hồi đặc trưng.",
    },
    first_impression: {
      en: 'Herbal and spicy with anise notes, followed by warming whiskey and brandy',
      it: 'Erbaceo e speziato con note di anice, seguito da whiskey e brandy caldi',
      vi: 'Thảo mộc và cay với hương hồi, tiếp theo là whiskey và brandy ấm áp',
    },
    finish: {
      en: 'Long, warming finish with lingering herbal complexity and gentle sweetness',
      it: 'Finale lungo e caldo con complessità erbacea persistente e dolcezza delicata',
      vi: 'Kết thúc dài, ấm áp với độ phức tạp thảo mộc kéo dài và vị ngọt nhẹ nhàng',
    },
    balance: {
      en: 'Masterfully balanced between multiple spirits and modifiers',
      it: 'Magistralmente bilanciato tra più spiriti e modificatori',
      vi: 'Cân bằng điêu luyện giữa nhiều loại rượu và chất điều chỉnh',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['aperitivo', 'digestivo', 'date_night', 'contemplative', 'celebration'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent with Creole cuisine, grilled meats, aged cheeses, or dark chocolate. Pairs beautifully with New Orleans classics like jambalaya, gumbo, or bread pudding.',
      it: 'Eccellente con cucina creola, carni alla griglia, formaggi stagionati o cioccolato fondente. Si abbina magnificamente con i classici di New Orleans come jambalaya, gumbo o budino di pane.',
      vi: 'Tuyệt vời với ẩm thực Creole, thịt nướng, phô mai già hoặc chocolate đen. Kết hợp tuyệt đẹp với các món cổ điển New Orleans như jambalaya, gumbo hoặc bánh pudding.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who enjoy complex, spirit-forward cocktails. Ideal for whiskey and cognac lovers seeking something unique that showcases both spirits equally.',
      it: 'Perfetto per i bevitori avventurosi che amano cocktail complessi e ricchi di spirito. Ideale per gli amanti del whiskey e del cognac che cercano qualcosa di unico che mostri entrambi gli spiriti in modo uguale.',
      vi: 'Hoàn hảo cho những người uống thích phiêu lưu thích cocktail phức tạp, đậm rượu. Lý tưởng cho người yêu whiskey và cognac tìm kiếm thứ gì đó độc đáo thể hiện cả hai loại rượu một cách ngang bằng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Rye whiskey', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_BENEDICTINE',
      quantity: { amount: 5, unit: 'ml' },
      display_name: { en: 'Bénédictine', it: 'Bénédictine', vi: 'Bénédictine' },
    },
    {
      ingredient_id: 'ING_PEYCHAUDS_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: {
        en: "Peychaud's bitters",
        it: "Peychaud's bitters",
        vi: "Peychaud's bitters",
      },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled cocktail glass. Garnish with orange zest and a maraschino cherry.',
    it: "Versare tutti gli ingredienti in un mixing glass con cubetti di ghiaccio. Mescolare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con scorza d'arancia e una ciliegia maraschino.",
    vi: 'Đổ tất cả nguyên liệu vào ly trộn với đá viên. Khuấy đều. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ cam và cherry maraschino.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Orange zest and maraschino cherry',
    it: "Scorza d'arancia e ciliegia maraschino",
    vi: 'Vỏ cam và cherry maraschino',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RYE_WHISKEY', 'ING_COGNAC'],

  flavor_profile: ['complex', 'herbal', 'boozy'],

  abv_estimate: 32, // ~32% ABV after dilution

  calories_estimate: 210,

  difficulty: 'intermediate',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['aperitivo', 'digestivo', 'date_night', 'contemplative'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['manhattan', 'sazerac', 'remember-the-maine'],

  notes_for_staff:
    "Bénédictine is essential - don't substitute. Use Peychaud's bitters specifically, not Angostura. Equal parts of rye, cognac, and vermouth make this unique. Stir well for proper dilution. Express orange oils over the drink before garnishing.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/vieux-carre/',
    notes:
      'IBA Official Recipe. Historical information from Hotel Monteleone and New Orleans cocktail history.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
