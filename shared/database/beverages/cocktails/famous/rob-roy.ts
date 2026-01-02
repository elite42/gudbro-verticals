/**
 * Famous Cocktails: Rob Roy
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const robRoy: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e6f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b',
  slug: 'rob-roy',
  stable_key: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5',

  name: {
    en: 'Rob Roy',
    it: 'Rob Roy',
    vi: 'Rob Roy',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'whisky', 'scotch', 'sophisticated', 'stirred'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Scottish cousin of the Manhattan, the Rob Roy substitutes Scotch whisky for rye or bourbon. Rich, complex, and slightly smoky, it\'s a sophisticated sipper that showcases the marriage of fine Scotch with sweet vermouth and aromatic bitters.',
    it: 'Il cugino scozzese del Manhattan, il Rob Roy sostituisce il whisky scozzese con rye o bourbon. Ricco, complesso e leggermente affumicato, è un sofisticato drink da sorseggiare che mette in mostra il matrimonio di Scotch pregiato con vermouth dolce e bitter aromatici.',
    vi: 'Người anh em họ Scotland của Manhattan, Rob Roy thay thế whisky Scotch cho rye hoặc bourbon. Đậm đà, phức tạp và hơi khói, đây là thức uống tinh tế thể hiện sự kết hợp của Scotch cao cấp với vermouth ngọt và bitter thơm.',
  },

  history: {
    created_year: '1894',
    origin: {
      city: 'New York City',
      bar: 'Waldorf Astoria Hotel',
      country: 'USA',
    },
    creator: {
      name: 'Unknown bartender',
      profession: 'bartender',
    },
    story: {
      en: 'The Rob Roy was created in 1894 at the Waldorf Astoria Hotel in New York City to commemorate the premiere of Rob Roy, an operetta based on the life of Scottish folk hero Robert Roy MacGregor. The drink was essentially a Manhattan made with Scotch whisky instead of American whiskey, paying homage to its Scottish namesake. The cocktail quickly became popular among whisky enthusiasts who appreciated the smoky complexity of Scotch in the Manhattan formula. It remains a classic choice for those who prefer their whisky drinks with a Scottish accent.',
      it: 'Il Rob Roy fu creato nel 1894 al Waldorf Astoria Hotel di New York City per commemorare la prima di Rob Roy, un\'operetta basata sulla vita dell\'eroe popolare scozzese Robert Roy MacGregor. La bevanda era essenzialmente un Manhattan fatto con whisky scozzese invece di whiskey americano, rendendo omaggio al suo omonimo scozzese. Il cocktail divenne rapidamente popolare tra gli appassionati di whisky che apprezzavano la complessità affumicata dello Scotch nella formula del Manhattan. Rimane una scelta classica per chi preferisce le bevande al whisky con un accento scozzese.',
      vi: 'Rob Roy được tạo ra năm 1894 tại Khách sạn Waldorf Astoria ở New York City để kỷ niệm buổi ra mắt Rob Roy, một vở opera dựa trên cuộc đời của anh hùng dân gian Scotland Robert Roy MacGregor. Thức uống về cơ bản là Manhattan được làm bằng whisky Scotch thay vì whiskey Mỹ, tôn vinh người cùng tên Scotland của nó. Cocktail nhanh chóng trở nên phổ biến trong số những người đam mê whisky đánh giá cao sự phức tạp khói của Scotch trong công thức Manhattan. Nó vẫn là lựa chọn cổ điển cho những ai thích đồ uống whisky với giọng Scotland.',
    },
    named_after: {
      en: 'Named after Robert Roy MacGregor, the Scottish folk hero known as "Rob Roy," and the operetta about his life that premiered in 1894.',
      it: 'Prende il nome da Robert Roy MacGregor, l\'eroe popolare scozzese noto come "Rob Roy," e l\'operetta sulla sua vita che debuttò nel 1894.',
      vi: 'Được đặt theo tên Robert Roy MacGregor, anh hùng dân gian Scotland được biết đến là "Rob Roy," và vở opera về cuộc đời của ông ra mắt năm 1894.',
    },
  },

  taste: {
    profile: ['smoky', 'sweet', 'complex'],
    description: {
      en: 'Rich and sophisticated with layers of complexity. The Rob Roy balances the smoky, malty character of Scotch against the sweet herbal notes of vermouth, with aromatic bitters adding depth. The result is warming, smooth, and deeply satisfying.',
      it: 'Ricco e sofisticato con strati di complessità. Il Rob Roy bilancia il carattere affumicato e maltato dello Scotch contro le note erbacee dolci del vermouth, con bitter aromatici che aggiungono profondità. Il risultato è caldo, liscio e profondamente soddisfacente.',
      vi: 'Đậm đà và tinh tế với nhiều lớp phức tạp. Rob Roy cân bằng tính cách khói, mạch nha của Scotch với hương thảo mộc ngọt của vermouth, với bitter thơm thêm chiều sâu. Kết quả là ấm áp, mượt mà và thỏa mãn sâu sắc.',
    },
    first_impression: {
      en: 'Smooth Scotch smokiness followed by sweet vermouth and herbal complexity',
      it: 'Affumicatura liscia dello Scotch seguita da vermouth dolce e complessità erbacee',
      vi: 'Khói Scotch mượt mà theo sau là vermouth ngọt và sự phức tạp thảo mộc',
    },
    finish: {
      en: 'Long, warming finish with lingering smoke, oak, and subtle spice notes',
      it: 'Finale lungo e caldo con fumo persistente, quercia e note sottili di spezie',
      vi: 'Kết thúc dài, ấm áp với khói kéo dài, gỗ sồi và hương gia vị tinh tế',
    },
    balance: {
      en: 'Beautifully balanced between Scotch\'s boldness and vermouth\'s sweetness - neither dominates',
      it: 'Magnificamente bilanciato tra l\'audacia dello Scotch e la dolcezza del vermouth - nessuno domina',
      vi: 'Cân bằng tuyệt đẹp giữa sự táo bạo của Scotch và vị ngọt của vermouth - không cái nào chiếm ưu thế',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['digestivo', 'sophisticated', 'date_night', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with Scottish fare: smoked salmon, haggis, aged cheeses, and hearty stews. Also pairs beautifully with grilled meats, charcuterie, and dark chocolate.',
      it: 'Eccellente con piatti scozzesi: salmone affumicato, haggis, formaggi stagionati e stufati sostanziosi. Si abbina magnificamente anche con carni alla griglia, salumi e cioccolato fondente.',
      vi: 'Tuyệt vời với món ăn Scotland: cá hồi hun khói, haggis, phô mai ủ lâu năm và món hầm đậm đà. Cũng kết hợp đẹp với thịt nướng, charcuterie và chocolate đen.',
    },
    ideal_for: {
      en: 'Perfect for Scotch whisky lovers who appreciate complex, stirred cocktails. Ideal for those who enjoy the Manhattan but want a smoky Scottish twist. A sophisticated choice for whisky connoisseurs.',
      it: 'Perfetto per gli amanti del whisky scozzese che apprezzano cocktail complessi e mescolati. Ideale per chi ama il Manhattan ma vuole un tocco scozzese affumicato. Una scelta sofisticata per intenditori di whisky.',
      vi: 'Hoàn hảo cho người yêu whisky Scotch đánh giá cao cocktail khuấy phức tạp. Lý tưởng cho những ai thích Manhattan nhưng muốn chút khói Scotland. Lựa chọn tinh tế cho người sành whisky.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SCOTCH_WHISKY',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Scotch whisky', it: 'Whisky scozzese', vi: 'Whisky Scotch' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass filled with ice. Stir gently for 30-40 seconds until well-chilled. Strain into a chilled cocktail glass. Garnish with a lemon twist or cherry.',
    it: 'Versare tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 30-40 secondi fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una scorza di limone o una ciliegia.',
    vi: 'Đổ tất cả nguyên liệu vào ly pha trộn đầy đá. Khuấy nhẹ trong 30-40 giây cho đến khi lạnh kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ chanh xoắn hoặc cherry.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Lemon twist or maraschino cherry',
    it: 'Scorza di limone o ciliegia maraschino',
    vi: 'Vỏ chanh xoắn hoặc cherry maraschino',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SCOTCH_WHISKY'],

  flavor_profile: ['smoky', 'sweet', 'complex'],

  abv_estimate: 28,

  calories_estimate: 165,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'nut_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'sophisticated', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['dry-rob-roy', 'perfect-rob-roy', 'bobby-burns'],

  notes_for_staff: 'Use a quality blended Scotch - single malts can be too assertive. The traditional ratio is 2:1 Scotch to vermouth. Stir, don\'t shake, to maintain clarity. Dry Rob Roy uses dry vermouth, Perfect Rob Roy uses equal parts sweet and dry vermouth.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1795/rob-roy',
    note: 'Classic recipe from Waldorf Astoria (1894). Historical information from cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
