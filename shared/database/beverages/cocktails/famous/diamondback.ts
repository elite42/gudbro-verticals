/**
 * Famous Cocktails: Diamondback
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const diamondback: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1d7f2c6-8a5b-7e4c-2b9d-5a6b7c8d9e0f',
  slug: 'diamondback',
  stable_key: 'b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7',

  name: {
    en: 'Diamondback',
    it: 'Diamondback',
    vi: 'Diamondback',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'rye', 'apple', 'spirit-forward'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated cocktail combining rye whiskey, applejack, and yellow Chartreuse. The Diamondback is a bold, spirit-forward drink with complex herbal and apple notes balanced by spicy rye.',
    it: 'Un cocktail sofisticato che combina whisky di segale, applejack e Chartreuse giallo. Il Diamondback è un drink audace a base di spiriti con note complesse erbacee e di mela bilanciate da segale speziata.',
    vi: 'Một loại cocktail tinh tế kết hợp rye whiskey, applejack và Chartreuse vàng. Diamondback là thức uống đậm đà, hướng đến rượu mạnh với các nốt thảo mộc và táo phức tạp được cân bằng bởi rye cay.',
  },

  history: {
    created_year: '1951',
    origin: {
      city: 'Baltimore',
      bar: 'Lord Baltimore Hotel',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Diamondback was created at Baltimore's Lord Baltimore Hotel in 1951. Named after the diamondback terrapin, Maryland's state reptile, this cocktail celebrates local ingredients - particularly applejack, which was popular in the Mid-Atlantic region. The drink gained renewed attention during the modern craft cocktail renaissance.",
      it: "Il Diamondback fu creato al Lord Baltimore Hotel di Baltimora nel 1951. Prende il nome dalla tartaruga diamondback, il rettile di stato del Maryland, questo cocktail celebra ingredienti locali - in particolare l'applejack, che era popolare nella regione del Mid-Atlantic. Il drink ha guadagnato rinnovata attenzione durante il rinascimento moderno dei cocktail artigianali.",
      vi: 'Diamondback được tạo ra tại Lord Baltimore Hotel của Baltimore năm 1951. Được đặt theo tên rùa diamondback, loài bò sát của bang Maryland, cocktail này ca ngợi các nguyên liệu địa phương - đặc biệt là applejack, phổ biến ở khu vực Mid-Atlantic. Thức uống được quan tâm trở lại trong thời kỳ phục hưng cocktail thủ công hiện đại.',
    },
    named_after: {
      en: "Named after the diamondback terrapin, Maryland's state reptile, celebrating the cocktail's Baltimore heritage.",
      it: "Prende il nome dalla tartaruga diamondback, il rettile di stato del Maryland, celebrando l'eredità di Baltimora del cocktail.",
      vi: 'Được đặt theo tên rùa diamondback, loài bò sát của bang Maryland, ca ngợi di sản Baltimore của cocktail.',
    },
  },

  taste: {
    profile: ['spirit-forward', 'complex', 'herbal'],
    description: {
      en: "Bold and complex with rye's spicy backbone, applejack's fruity depth, and Chartreuse's distinctive herbal notes. Spirit-forward yet balanced, with layers of flavor unfolding with each sip.",
      it: "Audace e complesso con la struttura speziata della segale, la profondità fruttata dell'applejack e le distintive note erbacee del Chartreuse. A base di spiriti ma bilanciato, con strati di sapore che si svelano ad ogni sorso.",
      vi: 'Đậm đà và phức tạp với xương sống cay của rye, chiều sâu trái cây của applejack và các nốt thảo mộc đặc trưng của Chartreuse. Hướng đến rượu mạnh nhưng cân bằng, với các lớp hương vị mở ra với mỗi ngụm.',
    },
    first_impression: {
      en: 'Spicy rye and apple notes hit first, followed by herbal Chartreuse complexity',
      it: 'Note speziate di segale e mela colpiscono per prime, seguite dalla complessità erbacee del Chartreuse',
      vi: 'Nốt rye cay và táo đập vào đầu tiên, tiếp theo là độ phức tạp thảo mộc Chartreuse',
    },
    finish: {
      en: 'Long, warming finish with lingering spice, apple, and herbal notes',
      it: 'Finale lungo e caldo con spezie persistenti, mela e note erbacee',
      vi: 'Kết thúc dài, ấm áp với gia vị kéo dài, táo và nốt thảo mộc',
    },
    balance: {
      en: 'Perfectly balanced trinity - rye spice, apple fruit, and herbal complexity in harmony',
      it: 'Trinità perfettamente bilanciata - spezie di segale, frutta di mela e complessità erbacee in armonia',
      vi: 'Bộ ba cân bằng hoàn hảo - gia vị rye, trái táo và độ phức tạp thảo mộc hài hòa',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['aperitivo', 'digestivo', 'date_night', 'special_occasion'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with rich meats, aged cheeses, roasted pork, or apple-based desserts. Perfect as a pre-dinner drink or after a hearty meal.',
      it: 'Eccellente con carni ricche, formaggi stagionati, maiale arrosto o dessert a base di mele. Perfetto come drink pre-cena o dopo un pasto abbondante.',
      vi: 'Tuyệt vời với thịt giàu dinh dưỡng, phô mai già, thịt lợn nướng hoặc món tráng miệng táo. Hoàn hảo như thức uống trước bữa tối hoặc sau bữa ăn thịnh soạn.',
    },
    ideal_for: {
      en: 'Perfect for whiskey lovers who appreciate complex, spirit-forward cocktails. An excellent choice for those seeking sophisticated alternatives to the Manhattan.',
      it: "Perfetto per gli amanti del whisky che apprezzano cocktail complessi a base di spiriti. Un'ottima scelta per chi cerca alternative sofisticate al Manhattan.",
      vi: 'Hoàn hảo cho người yêu whiskey đánh giá cao các loại cocktail phức tạp, hướng đến rượu mạnh. Lựa chọn tuyệt vời cho những ai tìm kiếm giải pháp thay thế tinh tế cho Manhattan.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Whisky di segale', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_APPLEJACK',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Applejack', it: 'Applejack', vi: 'Applejack' },
    },
    {
      ingredient_id: 'ING_YELLOW_CHARTREUSE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Yellow Chartreuse', it: 'Chartreuse giallo', vi: 'Chartreuse vàng' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir gently for 30-40 seconds until well-chilled. Strain into a chilled coupe or cocktail glass. Garnish with a lemon twist, expressing the oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 30-40 secondi fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere da cocktail. Guarnire con una scorza di limone, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy nhẹ nhàng trong 30-40 giây cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với vỏ chanh xoắn, ép tinh dầu lên thức uống.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Lemon twist',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RYE_WHISKEY'],

  flavor_profile: ['spirit-forward', 'complex', 'herbal'],

  abv_estimate: 32,

  calories_estimate: 180,

  difficulty: 'easy',

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
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['aperitivo', 'digestivo', 'date_night', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['improved-diamondback'],

  notes_for_staff:
    "Use bonded applejack (Laird's Bottled in Bond) for best results. Yellow Chartreuse is essential - do not substitute green. The 2:1:1 ratio creates perfect balance. Stir well to achieve proper dilution.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1276/diamondback',
    notes:
      "Created at Lord Baltimore Hotel, 1951. Celebrates Maryland's diamondback terrapin and local applejack tradition.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
