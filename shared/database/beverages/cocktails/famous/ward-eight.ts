/**
 * Famous Cocktails: Ward Eight
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const wardEight: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c0d1e2f3-a4b5-4c6d-7e8f-9a0b1c2d3e4f',
  slug: 'ward-eight',
  stable_key: 'j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9',

  name: {
    en: 'Ward Eight',
    it: 'Ward Eight',
    vi: 'Ward Eight',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'rye', 'whiskey', 'citrus', 'boston'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "Boston's answer to the New York Sour, the Ward Eight combines rye whiskey with lemon, orange, and grenadine for a fruity, balanced cocktail with a beautiful sunset color. A forgotten classic that deserves rediscovery, it's a testament to pre-Prohibition American cocktail creativity.",
    it: 'La risposta di Boston al New York Sour, il Ward Eight combina rye whiskey con limone, arancia e granatina per un cocktail fruttato e bilanciato con un bellissimo colore tramonto. Un classico dimenticato che merita di essere riscoperto, è una testimonianza della creatività dei cocktail americani pre-proibizionismo.',
    vi: 'Câu trả lời của Boston cho New York Sour, Ward Eight kết hợp rye whiskey với chanh, cam và grenadine cho một cocktail trái cây, cân bằng với màu hoàng hôn tuyệt đẹp. Một tác phẩm kinh điển bị lãng quên đáng được tái khám phá, đây là minh chứng cho sự sáng tạo cocktail Mỹ trước cấm rượu.',
  },

  history: {
    created_year: '1898',
    origin: {
      city: 'Boston',
      bar: 'Locke-Ober Café',
      country: 'USA',
    },
    creator: {
      name: 'Tom Hussion (disputed)',
      profession: 'bartender',
    },
    story: {
      en: "The Ward Eight was allegedly created in 1898 at Boston's Locke-Ober Café by bartender Tom Hussion to celebrate the political victory of Martin Lomasney in Boston's Ward 8 district. The story goes that Democratic party bosses gathered at the bar before the election results were announced, so confident of victory that they commissioned a new cocktail in advance. When Lomasney won, the Ward Eight was born. However, some historians question this origin story, noting that the cocktail didn't appear in print until much later. Regardless of its true origins, the Ward Eight became a Boston institution and remains the city's signature cocktail. It's essentially a whiskey sour with the addition of orange juice and grenadine.",
      it: "Il Ward Eight fu presumibilmente creato nel 1898 al Locke-Ober Café di Boston dal barman Tom Hussion per celebrare la vittoria politica di Martin Lomasney nel distretto Ward 8 di Boston. La storia racconta che i capi del partito democratico si riunirono al bar prima dell'annuncio dei risultati elettorali, così fiduciosi della vittoria che commissionarono un nuovo cocktail in anticipo. Quando Lomasney vinse, nacque il Ward Eight. Tuttavia, alcuni storici mettono in dubbio questa storia d'origine, notando che il cocktail non apparve in stampa fino a molto più tardi. Indipendentemente dalle sue vere origini, il Ward Eight divenne un'istituzione di Boston e rimane il cocktail caratteristico della città. È essenzialmente un whiskey sour con l'aggiunta di succo d'arancia e granatina.",
      vi: 'Ward Eight được cho là được tạo ra năm 1898 tại Locke-Ober Café của Boston bởi bartender Tom Hussion để chào mừng chiến thắng chính trị của Martin Lomasney ở quận Ward 8 của Boston. Câu chuyện kể rằng các ông trùm đảng Dân chủ tụ tập tại quán bar trước khi công bố kết quả bầu cử, tự tin chiến thắng đến mức họ đặt hàng một cocktail mới trước. Khi Lomasney thắng, Ward Eight ra đời. Tuy nhiên, một số nhà sử học nghi ngờ câu chuyện nguồn gốc này, lưu ý rằng cocktail không xuất hiện trên ấn phẩm cho đến lâu sau. Bất kể nguồn gốc thực sự, Ward Eight trở thành một định chế của Boston và vẫn là cocktail đặc trưng của thành phố. Về cơ bản nó là whiskey sour với thêm nước cam và grenadine.',
    },
    named_after: {
      en: 'Named after Ward 8, a political district in Boston where Martin Lomasney won a significant election in 1898.',
      it: "Prende il nome da Ward 8, un distretto politico di Boston dove Martin Lomasney vinse un'elezione significativa nel 1898.",
      vi: 'Được đặt theo tên Ward 8, một quận chính trị ở Boston nơi Martin Lomasney giành chiến thắng trong một cuộc bầu cử quan trọng năm 1898.',
    },
  },

  taste: {
    profile: ['citrus', 'fruity', 'balanced'],
    description: {
      en: "Bright, fruity, and beautifully balanced. The Ward Eight combines the spicy warmth of rye whiskey with the tartness of lemon, the sweetness of orange, and the pomegranate depth of grenadine. It's a more complex, fruity take on the whiskey sour.",
      it: "Brillante, fruttato e magnificamente bilanciato. Il Ward Eight combina il calore speziato del rye whiskey con l'acidità del limone, la dolcezza dell'arancia e la profondità del melograno della granatina. È una versione più complessa e fruttata del whiskey sour.",
      vi: 'Tươi sáng, trái cây và cân bằng tuyệt đẹp. Ward Eight kết hợp độ ấm cay của rye whiskey với vị chua của chanh, vị ngọt của cam và chiều sâu lựu của grenadine. Đây là phiên bản phức tạp hơn, có trái cây của whiskey sour.',
    },
    first_impression: {
      en: 'Bright citrus and orange sweetness followed by rye spice',
      it: "Agrumi brillanti e dolcezza dell'arancia seguiti da spezie di rye",
      vi: 'Cam quýt tươi sáng và vị ngọt cam theo sau là gia vị rye',
    },
    finish: {
      en: 'Medium finish with lingering rye spice, citrus, and subtle pomegranate notes',
      it: 'Finale medio con spezie di rye persistenti, agrumi e note sottili di melograno',
      vi: 'Kết thúc trung bình với gia vị rye kéo dài, cam quýt và hương lựu tinh tế',
    },
    balance: {
      en: 'Well-balanced between tart lemon, sweet orange and grenadine, with rye providing spicy backbone',
      it: 'Ben bilanciato tra limone aspro, arancia dolce e granatina, con rye che fornisce una spina dorsale speziata',
      vi: 'Cân bằng tốt giữa chanh chua, cam ngọt và grenadine, với rye cung cấp xương sống cay',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['aperitivo', 'social', 'sophisticated', 'celebration'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Pairs well with New England seafood, oysters, lobster rolls, clam chowder, and traditional American fare. Also excellent with barbecue and grilled meats.',
      it: 'Si abbina bene con frutti di mare del New England, ostriche, lobster roll, clam chowder e piatti tradizionali americani. Eccellente anche con barbecue e carni alla griglia.',
      vi: 'Kết hợp tốt với hải sản New England, hàu, lobster roll, clam chowder và món ăn truyền thống Mỹ. Cũng tuyệt vời với barbecue và thịt nướng.',
    },
    ideal_for: {
      en: 'Perfect for rye whiskey enthusiasts and cocktail historians. Ideal for those who enjoy fruity yet sophisticated sours. A must-try for anyone visiting Boston or exploring American cocktail heritage.',
      it: 'Perfetto per gli appassionati di rye whiskey e storici dei cocktail. Ideale per chi ama i sour fruttati ma sofisticati. Un must per chiunque visiti Boston o esplori il patrimonio dei cocktail americani.',
      vi: 'Hoàn hảo cho những người đam mê rye whiskey và nhà sử học cocktail. Lý tưởng cho những ai thích sours trái cây nhưng tinh tế. Phải thử cho bất kỳ ai đến thăm Boston hoặc khám phá di sản cocktail Mỹ.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Rye whiskey', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled cocktail glass. Garnish with orange slice and cherry.',
    it: "Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una fetta d'arancia e una ciliegia.",
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí với lát cam và cherry.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Orange slice and maraschino cherry',
    it: "Fetta d'arancia e ciliegia maraschino",
    vi: 'Lát cam và cherry maraschino',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RYE_WHISKEY'],

  flavor_profile: ['citrus', 'fruity', 'balanced'],

  abv_estimate: 22,

  calories_estimate: 170,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
      'pescatarian',
      'gluten_free',
      'nut_free',
      'dairy_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'social', 'sophisticated', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['ward-eight-original', 'bourbon-ward-eight'],

  notes_for_staff:
    'Use fresh juices - never bottled. Real grenadine is essential for proper flavor. Rye is traditional, but bourbon can substitute. Some recipes call for simple syrup in addition to grenadine - adjust based on guest preference. Shake hard to properly emulsify.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/2375/ward-eight',
    notes: 'Classic Boston cocktail, documented in various early 20th century cocktail books.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
