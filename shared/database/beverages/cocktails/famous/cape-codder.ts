/**
 * Famous Cocktails: Cape Codder
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const capeCodder: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-8901-2345-def0-234567890123',
  slug: 'cape-codder',
  stable_key: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',

  name: {
    en: 'Cape Codder',
    it: 'Cape Codder',
    vi: 'Cape Codder',
    ko: '케이프 코더',
    ja: 'ケープコッダー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'vodka', 'cranberry', 'tart', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A simple yet refreshing highball cocktail combining vodka with cranberry juice and a splash of lime. The Cape Codder showcases the tart, fruity flavor of cranberries and serves as the base for many popular variations.',
    it: 'Un cocktail highball semplice ma rinfrescante che combina vodka con succo di mirtillo rosso e una spruzzata di lime. Il Cape Codder mette in mostra il sapore aspro e fruttato dei mirtilli rossi e serve come base per molte varianti popolari.',
    vi: 'Một cocktail highball đơn giản nhưng tươi mát kết hợp vodka với nước ép nam việt quất và một chút chanh. Cape Codder thể hiện hương vị chua, trái cây của nam việt quất và là nền tảng cho nhiều biến thể phổ biến.',
  },

  history: {
    created_year: '1945',
    origin: {
      city: 'Cape Cod',
      state: 'Massachusetts',
      country: 'USA',
    },
    story: {
      en: 'The Cape Codder originated in Cape Cod, Massachusetts, in the mid-1940s when the Ocean Spray cooperative was promoting cranberry juice as a mixer. The drink became popular as a way to showcase locally-grown cranberries. It gained wider recognition in the 1960s during the vodka boom and became the foundation for the Cosmopolitan and Sea Breeze. The drink is also known as a "Vodka Cranberry" in many bars.',
      it: 'Il Cape Codder ha avuto origine a Cape Cod, Massachusetts, a metà degli anni \'40 quando la cooperativa Ocean Spray promuoveva il succo di mirtillo rosso come mixer. Il drink divenne popolare come modo per mostrare i mirtilli rossi coltivati localmente. Ottenne un riconoscimento più ampio negli anni \'60 durante il boom della vodka e divenne la base per il Cosmopolitan e il Sea Breeze. Il drink è anche conosciuto come "Vodka Cranberry" in molti bar.',
      vi: 'Cape Codder có nguồn gốc từ Cape Cod, Massachusetts, vào giữa những năm 1940 khi hợp tác xã Ocean Spray đang quảng bá nước ép nam việt quất như một chất pha trộn. Thức uống trở nên phổ biến như một cách để giới thiệu nam việt quất trồng tại địa phương. Nó được công nhận rộng rãi hơn vào những năm 1960 trong thời kỳ bùng nổ vodka và trở thành nền tảng cho Cosmopolitan và Sea Breeze. Thức uống còn được biết đến như "Vodka Cranberry" ở nhiều quán bar.',
    },
    named_after: {
      en: 'Named after Cape Cod, Massachusetts, a region famous for cranberry cultivation.',
      it: 'Prende il nome da Cape Cod, Massachusetts, una regione famosa per la coltivazione di mirtilli rossi.',
      vi: 'Được đặt theo tên Cape Cod, Massachusetts, một vùng nổi tiếng với việc trồng nam việt quất.',
    },
  },

  taste: {
    profile: ['tart', 'fruity', 'refreshing'],
    description: {
      en: 'Tart and refreshing with the distinctive cranberry flavor taking center stage. The lime adds brightness while vodka provides a clean, neutral backbone that lets the cranberry shine.',
      it: 'Aspro e rinfrescante con il caratteristico sapore di mirtillo rosso al centro della scena. Il lime aggiunge luminosità mentre la vodka fornisce una base pulita e neutra che lascia brillare il mirtillo rosso.',
      vi: 'Chua và tươi mát với hương vị nam việt quất đặc trưng chiếm vị trí trung tâm. Chanh thêm sự tươi sáng trong khi vodka cung cấp xương sống trung tính, trong sạch để nam việt quất tỏa sáng.',
    },
    first_impression: {
      en: 'Bright cranberry tartness with citrus notes',
      it: 'Acidità brillante di mirtillo rosso con note di agrumi',
      vi: 'Vị chua nam việt quất tươi sáng với hương cam quýt',
    },
    finish: {
      en: 'Clean, tart finish with lingering cranberry and lime',
      it: 'Finale pulito e aspro con mirtillo rosso e lime persistenti',
      vi: 'Kết thúc trong sạch, chua với nam việt quất và chanh kéo dài',
    },
    balance: {
      en: 'Perfectly balanced tartness - not too sweet, not too sour, with vodka providing smooth structure',
      it: 'Acidità perfettamente bilanciata - non troppo dolce, non troppo aspro, con la vodka che fornisce struttura morbida',
      vi: 'Vị chua cân bằng hoàn hảo - không quá ngọt, không quá chua, với vodka tạo cấu trúc mượt mà',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'happy_hour'],
    occasions: ['casual', 'happy_hour', 'beach', 'poolside'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs well with turkey, chicken dishes, cheese plates, and light appetizers. A traditional Thanksgiving cocktail. Also complements seafood and salads.',
      it: 'Si abbina bene con tacchino, piatti di pollo, taglieri di formaggi e antipasti leggeri. Un cocktail tradizionale del Ringraziamento. Completa anche frutti di mare e insalate.',
      vi: 'Kết hợp tốt với gà tây, món gà, đĩa phô mai và món khai vị nhẹ. Cocktail truyền thống của Lễ Tạ ơn. Cũng bổ sung cho hải sản và salad.',
    },
    ideal_for: {
      en: 'Perfect for those who prefer tart over sweet cocktails. Great for anyone who enjoys cranberry flavor or is looking for a lighter alternative to sugary mixed drinks.',
      it: "Perfetto per chi preferisce cocktail aspri rispetto a quelli dolci. Ottimo per chi apprezza il sapore del mirtillo rosso o cerca un'alternativa più leggera ai drink misti zuccherati.",
      vi: 'Hoàn hảo cho những ai thích cocktail chua hơn ngọt. Tuyệt vời cho bất kỳ ai thích hương nam việt quất hoặc đang tìm kiếm sự thay thế nhẹ hơn cho đồ uống pha trộn có đường.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: {
        en: 'Cranberry juice',
        it: 'Succo di mirtillo rosso',
        vi: 'Nước ép nam việt quất',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka and lime juice over ice, then top with cranberry juice. Stir gently to combine. Garnish with a lime wedge.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare vodka e succo di lime sul ghiaccio, quindi completare con succo di mirtillo rosso. Mescolare delicatamente per combinare. Guarnire con uno spicchio di lime.',
    vi: 'Đổ đầy ly highball với đá. Rót vodka và nước cốt chanh lên đá, sau đó thêm nước ép nam việt quất. Khuấy nhẹ nhàng để trộn đều. Trang trí với một lát chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['tart', 'fruity', 'refreshing'],

  abv_estimate: 9,

  calories_estimate: 170,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['casual', 'happy_hour', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['cosmopolitan', 'sea-breeze', 'bay-breeze'],

  notes_for_staff:
    'Use 100% cranberry juice, not cranberry cocktail (which is too sweet). Ocean Spray 100% juice is traditional. Some versions omit the lime - ask customer preference.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1237/cape-codder',
    notes: 'Classic New England cocktail, promoted by Ocean Spray.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
