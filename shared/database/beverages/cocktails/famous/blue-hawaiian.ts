/**
 * Famous Cocktails: Blue Hawaiian
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const blueHawaiian: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  slug: 'blue-hawaiian',
  stable_key: 'blue_hawaiian_famous_tiki_tropical_cocktail',

  name: {
    en: 'Blue Hawaiian',
    it: 'Blue Hawaiian',
    vi: 'Blue Hawaiian',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'creamy', 'sweet', 'blue'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Blue Hawaiian is a vibrant tropical cocktail featuring rum, blue curaçao, pineapple juice, and cream of coconut. Its striking blue color evokes Hawaiian waters, making it a visually stunning and deliciously tropical vacation drink.',
    it: 'Il Blue Hawaiian è un vivace cocktail tropicale che presenta rum, blue curaçao, succo di ananas e crema di cocco. Il suo colore blu acceso evoca le acque hawaiane, rendendolo una bevanda da vacanza tropicale visivamente stupefacente e deliziosamente.',
    vi: 'Blue Hawaiian là một loại cocktail nhiệt đới rực rỡ với rum, blue curaçao, nước ananás và kem dừa. Màu xanh nổi bật của nó gợi lên vùng biển Hawaii, khiến nó trở thành thức uống nghỉ dưỡng nhiệt đới tuyệt đẹp về mặt thị giác và ngon miệng.',
  },

  history: {
    created_year: '1957',
    origin: {
      city: 'Honolulu',
      bar: 'Hilton Hawaiian Village',
      country: 'USA',
    },
    creator: {
      name: 'Harry Yee',
      profession: 'bartender',
    },
    story: {
      en: "The Blue Hawaiian was created in 1957 by legendary bartender Harry Yee at the Hilton Hawaiian Village in Waikiki. Yee invented the drink as a showcase for Bols Blue Curaçao, which had just been introduced to Hawaii. The stunning blue color was meant to evoke the crystal-clear Hawaiian waters. Harry Yee is also credited with being the first bartender to garnish drinks with orchids and paper umbrellas, innovations that became synonymous with tiki culture. The Blue Hawaiian became an instant classic and remains one of Hawaii's signature cocktails.",
      it: "Il Blue Hawaiian fu creato nel 1957 dal leggendario barman Harry Yee all'Hilton Hawaiian Village a Waikiki. Yee inventò la bevanda come vetrina per il Bols Blue Curaçao, appena introdotto alle Hawaii. Lo splendido colore blu doveva evocare le acque cristalline hawaiane. A Harry Yee si attribuisce anche di essere stato il primo barman a guarnire le bevande con orchidee e ombrellini di carta, innovazioni diventate sinonimo della cultura tiki. Il Blue Hawaiian divenne un classico istantaneo e rimane uno dei cocktail emblematici delle Hawaii.",
      vi: 'Blue Hawaiian được tạo ra năm 1957 bởi bartender huyền thoại Harry Yee tại Hilton Hawaiian Village ở Waikiki. Yee đã phát minh ra thức uống như một showcase cho Bols Blue Curaçao, vừa mới được giới thiệu đến Hawaii. Màu xanh tuyệt đẹp được tạo ra để gợi lên vùng biển Hawaii trong vắt. Harry Yee cũng được ghi nhận là bartender đầu tiên trang trí đồ uống bằng hoa lan và dù giấy, những đổi mới trở thành đồng nghĩa với văn hóa tiki. Blue Hawaiian trở thành một tác phẩm kinh điển ngay lập tức và vẫn là một trong những cocktail đặc trưng của Hawaii.',
    },
    named_after: {
      en: 'Named for the vibrant blue color reminiscent of Hawaiian ocean waters and tropical paradise.',
      it: 'Prende il nome dal vivace colore blu che ricorda le acque oceaniche hawaiane e il paradiso tropicale.',
      vi: 'Được đặt theo màu xanh rực rỡ gợi nhớ đến vùng biển Hawaii và thiên đường nhiệt đới.',
    },
  },

  taste: {
    profile: ['tropical', 'creamy', 'sweet'],
    description: {
      en: 'Tropical and refreshing with a perfect balance of citrus and coconut. The Blue Hawaiian combines bright orange notes from blue curaçao with pineapple sweetness and coconut creaminess, all lifted by rum. Smooth, creamy, and undeniably tropical.',
      it: 'Tropicale e rinfrescante con un perfetto equilibrio di agrumi e cocco. Il Blue Hawaiian combina note arancioni brillanti dal blue curaçao con dolcezza di ananas e cremosità di cocco, tutto sollevato dal rum. Liscio, cremoso e innegabilmente tropicale.',
      vi: 'Nhiệt đới và sảng khoái với sự cân bằng hoàn hảo giữa cam quýt và dừa. Blue Hawaiian kết hợp hương cam sáng từ blue curaçao với vị ngọt ananás và độ béo ngậy của dừa, tất cả được nâng lên bởi rum. Mượt mà, béo ngậy và không thể phủ nhận là nhiệt đới.',
    },
    first_impression: {
      en: 'Sweet tropical fruits and orange citrus hit first, followed by creamy coconut waves',
      it: "Frutti tropicali dolci e agrumi d'arancia colpiscono per primi, seguiti da onde cremose di cocco",
      vi: 'Trái cây nhiệt đới ngọt và cam quýt cam xuất hiện đầu tiên, theo sau là sóng dừa béo ngậy',
    },
    finish: {
      en: 'Smooth, creamy finish with lingering coconut and tropical fruit notes',
      it: 'Finale liscio e cremoso con note persistenti di cocco e frutta tropicale',
      vi: 'Kết thúc mượt mà, béo ngậy với hương dừa và trái cây nhiệt đới kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet tropical flavors and creamy texture, with rum providing subtle backbone',
      it: 'Ben bilanciato tra sapori tropicali dolci e consistenza cremosa, con il rum che fornisce una sottile struttura',
      vi: 'Cân bằng tốt giữa hương vị nhiệt đới ngọt và kết cấu béo ngậy, với rum cung cấp xương sống tinh tế',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'luau', 'vacation'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Hawaiian poke, kalua pork, grilled fish, coconut shrimp, or tropical fruit platters. Also pairs well with teriyaki dishes and island-style BBQ.',
      it: 'Perfetto con poke hawaiano, maiale kalua, pesce alla griglia, gamberetti al cocco o vassoi di frutta tropicale. Si abbina bene anche con piatti teriyaki e barbecue in stile insulare.',
      vi: 'Hoàn hảo với poke Hawaii, thịt lợn kalua, cá nướng, tôm dừa hoặc đĩa trái cây nhiệt đới. Cũng kết hợp tốt với món teriyaki và BBQ kiểu đảo.',
    },
    ideal_for: {
      en: 'Perfect for tropical vacation seekers and Instagram-worthy drink enthusiasts. Ideal for anyone who wants a visually stunning cocktail that tastes as good as it looks. Great for pool parties and beachside celebrations.',
      it: 'Perfetto per chi cerca vacanze tropicali e appassionati di bevande degne di Instagram. Ideale per chiunque voglia un cocktail visivamente stupefacente che ha un sapore buono come appare. Ottimo per feste in piscina e celebrazioni in spiaggia.',
      vi: 'Hoàn hảo cho những người tìm kiếm kỳ nghỉ nhiệt đới và những người đam mê đồ uống xứng đáng với Instagram. Lý tưởng cho bất kỳ ai muốn một loại cocktail tuyệt đẹp về mặt thị giác có vị ngon như vẻ ngoài. Tuyệt vời cho các bữa tiệc bên hồ bơi và lễ kỷ niệm bên bờ biển.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_BLUE_CURACAO',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Blue curaçao', it: 'Blue curaçao', vi: 'Blue curaçao' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ananás' },
    },
    {
      ingredient_id: 'ING_COCONUT_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cream of coconut', it: 'Crema di cocco', vi: 'Kem dừa' },
    },
  ],

  method: 'blend',

  instructions: {
    en: 'Add all ingredients to a blender with 1 cup of crushed ice. Blend until smooth and creamy. Pour into a hurricane glass. Garnish with pineapple wedge and maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in un frullatore con 1 tazza di ghiaccio tritato. Frullare fino a quando liscio e cremoso. Versare in un bicchiere hurricane. Guarnire con spicchio di ananas e ciliegia maraschino.',
    vi: 'Thêm tất cả nguyên liệu vào máy xay sinh tố với 1 cốc đá nghiền. Xay cho đến khi mịn và béo ngậy. Đổ vào ly hurricane. Trang trí với nhánh ananás và cherry maraschino.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Pineapple wedge, maraschino cherry, orchid flower',
    it: 'Spicchio di ananas, ciliegia maraschino, fiore di orchidea',
    vi: 'Nhánh ananás, cherry maraschino, hoa lan',
  },

  ice: 'blended',

  serving_style: 'frozen',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['tropical', 'creamy', 'sweet'],

  abv_estimate: 10,

  calories_estimate: 300,

  difficulty: 'easy',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['coconut', 'sulphites'],
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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['beach', 'pool_party', 'luau', 'vacation'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['blue-hawaii', 'swimming-pool'],

  notes_for_staff:
    'Created by Harry Yee, pioneer of tiki garnishes. Can be shaken instead of blended for a non-frozen version. The vibrant blue color is essential - use quality blue curaçao. Garnish with orchid if available for authentic Hawaiian presentation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 88,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/506/blue-hawaiian',
    notes:
      'Created by Harry Yee at Hilton Hawaiian Village, 1957. Historical information from tiki cocktail archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
