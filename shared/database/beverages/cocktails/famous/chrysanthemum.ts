/**
 * Famous Cocktails: Chrysanthemum
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const chrysanthemum: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0c6e1b5-7f4a-6d3b-1a8c-4f5a6b7c8d9e',
  slug: 'chrysanthemum',
  stable_key: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6',

  name: {
    en: 'Chrysanthemum',
    it: 'Crisantemo',
    vi: 'Hoa Cúc',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'vermouth', 'dry', 'aperitif'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated aperitif cocktail combining dry vermouth, Benedictine, and absinthe. The Chrysanthemum is an elegant, low-alcohol drink with complex herbal notes and a distinctive anise finish.',
    it: 'Un sofisticato cocktail aperitivo che combina vermut secco, Benedictine e assenzio. Il Crisantemo è un drink elegante a basso contenuto alcolico con note erbacee complesse e un caratteristico finale di anice.',
    vi: 'Một loại cocktail khai vị tinh tế kết hợp vermouth khô, Benedictine và absinthe. Chrysanthemum là thức uống thanh lịch, ít cồn với các nốt thảo mộc phức tạp và kết thúc hồi đặc trưng.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'Europe',
    },
    creator: {
      name: 'Hugo Ensslin',
      profession: 'bartender',
    },
    story: {
      en: 'The Chrysanthemum was created by Hugo Ensslin and published in his 1916 book "Recipes for Mixed Drinks." Named after the flower that symbolizes longevity and rejuvenation in Asian culture, this cocktail represents the pre-Prohibition era\'s sophisticated approach to aperitifs. It gained renewed popularity in the 2000s craft cocktail revival.',
      it: 'Il Crisantemo fu creato da Hugo Ensslin e pubblicato nel suo libro del 1916 "Recipes for Mixed Drinks." Prende il nome dal fiore che simboleggia longevità e ringiovanimento nella cultura asiatica, questo cocktail rappresenta l\'approccio sofisticato agli aperitivi dell\'era pre-Proibizionismo. Ha guadagnato rinnovata popolarità nella rinascita dei cocktail artigianali degli anni 2000.',
      vi: 'Chrysanthemum được tạo ra bởi Hugo Ensslin và xuất bản trong cuốn sách năm 1916 của ông "Recipes for Mixed Drinks." Được đặt theo tên loài hoa tượng trưng cho sự trường thọ và trẻ hóa trong văn hóa châu Á, cocktail này đại diện cho cách tiếp cận tinh tế với khai vị của thời kỳ trước Cấm rượu. Nó được phổ biến trở lại trong sự hồi sinh cocktail thủ công những năm 2000.',
    },
    named_after: {
      en: 'Named after the chrysanthemum flower, which symbolizes longevity and rejuvenation in Asian culture, reflecting the drink\'s refreshing, aperitif qualities.',
      it: 'Prende il nome dal fiore di crisantemo, che simboleggia longevità e ringiovanimento nella cultura asiatica, riflettendo le qualità rinfrescanti e aperitive del drink.',
      vi: 'Được đặt theo tên hoa cúc, tượng trưng cho sự trường thọ và trẻ hóa trong văn hóa châu Á, phản ánh phẩm chất khai vị, sảng khoái của thức uống.',
    },
  },

  taste: {
    profile: ['dry', 'herbal', 'complex'],
    description: {
      en: 'Dry and herbaceous with layers of complexity from Benedictine\'s honey-herb notes, vermouth\'s botanicals, and absinthe\'s distinctive anise character. Light, refreshing, and appetite-stimulating.',
      it: 'Secco ed erbaceo con strati di complessità dalle note miele-erbe del Benedictine, i botanici del vermut e il caratteristico carattere di anice dell\'assenzio. Leggero, rinfrescante e stimolante dell\'appetito.',
      vi: 'Khô và thảo mộc với các lớp phức tạp từ nốt mật ong-thảo mộc của Benedictine, thực vật của vermouth và tính chất hồi đặc trưng của absinthe. Nhẹ nhàng, sảng khoái và kích thích khẩu vị.',
    },
    first_impression: {
      en: 'Dry vermouth botanicals with honeyed Benedictine sweetness and anise hints',
      it: 'Botanici di vermut secco con dolcezza di Benedictine al miele e accenni di anice',
      vi: 'Thực vật vermouth khô với vị ngọt mật ong Benedictine và gợi ý hồi',
    },
    finish: {
      en: 'Clean, dry finish with lingering anise and herbal complexity',
      it: 'Finale pulito e secco con anice persistente e complessità erbacee',
      vi: 'Kết thúc sạch, khô với hồi kéo dài và độ phức tạp thảo mộc',
    },
    balance: {
      en: 'Perfectly dry aperitif balance - complex yet light and refreshing',
      it: 'Equilibrio aperitivo perfettamente secco - complesso ma leggero e rinfrescante',
      vi: 'Cân bằng khai vị khô hoàn hảo - phức tạp nhưng nhẹ nhàng và sảng khoái',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['aperitivo', 'pre_dinner', 'garden_party', 'brunch'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent as an aperitif before meals. Pairs well with light appetizers, olives, almonds, or seafood. Perfect for stimulating the appetite.',
      it: 'Eccellente come aperitivo prima dei pasti. Si abbina bene con antipasti leggeri, olive, mandorle o frutti di mare. Perfetto per stimolare l\'appetito.',
      vi: 'Tuyệt vời như khai vị trước bữa ăn. Kết hợp tốt với món khai vị nhẹ, ô liu, hạnh nhân hoặc hải sản. Hoàn hảo để kích thích khẩu vị.',
    },
    ideal_for: {
      en: 'Perfect for those who appreciate dry, complex aperitifs. Ideal for adventurous drinkers seeking a sophisticated, low-alcohol cocktail with unique herbal character.',
      it: 'Perfetto per chi apprezza aperitivi secchi e complessi. Ideale per bevitori avventurosi che cercano un cocktail sofisticato a basso contenuto alcolico con carattere erbaceo unico.',
      vi: 'Hoàn hảo cho những ai đánh giá cao khai vị khô, phức tạp. Lý tưởng cho người thích phiêu lưu tìm kiếm cocktail tinh tế, ít cồn với đặc tính thảo mộc độc đáo.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermut secco', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_BENEDICTINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Bénédictine', it: 'Bénédictine', vi: 'Bénédictine' },
    },
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir gently for 20-30 seconds until well-chilled. Strain into a chilled coupe or Nick & Nora glass. Garnish with an orange twist, expressing the oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 20-30 secondi fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere Nick & Nora. Guarnire con una scorza d\'arancia, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy nhẹ nhàng trong 20-30 giây cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly Nick & Nora đã làm lạnh. Trang trí với vỏ cam xoắn, ép tinh dầu lên thức uống.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Orange twist',
    it: 'Scorza d\'arancia',
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_DRY_VERMOUTH'],

  flavor_profile: ['dry', 'herbal', 'complex'],

  abv_estimate: 18,

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'pre_dinner', 'garden_party', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['chrysanthemum-moderne'],

  notes_for_staff: 'Use quality dry vermouth - Dolin Dry recommended. Absinthe can be strong; measure carefully. The drink should be dry and herbal, not sweet. Best served very cold as an aperitif.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1188/chrysanthemum',
    note: 'Hugo Ensslin\'s 1916 "Recipes for Mixed Drinks." Classic pre-Prohibition aperitif.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
