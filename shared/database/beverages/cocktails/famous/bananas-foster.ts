/**
 * Famous Cocktails: Bananas Foster
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bananasFoster: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
  slug: 'bananas-foster',
  stable_key: 'bananas_foster_rum_banana_liqueur_cream',

  name: {
    en: 'Bananas Foster',
    it: 'Bananas Foster',
    vi: 'Bananas Foster',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'sweet', 'tropical', 'rum-based'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A decadent cocktail inspired by the famous New Orleans dessert, combining dark rum, banana liqueur, and cream to recreate the flavors of caramelized bananas, butter, and brown sugar in liquid form.',
    it: 'Un cocktail decadente ispirato al famoso dessert di New Orleans, che combina rum scuro, liquore alla banana e panna per ricreare i sapori delle banane caramellate, burro e zucchero di canna in forma liquida.',
    vi: 'Một loại cocktail xa hoa lấy cảm hứng từ món tráng miệng nổi tiếng của New Orleans, kết hợp rum tối, rượu mùi chuối và kem để tái tạo hương vị chuối caramen, bơ và đường nâu dưới dạng lỏng.',
  },

  history: {
    created_year: '2000s',
    origin: {
      country: 'USA',
    },
    story: {
      en: "The Bananas Foster cocktail is a modern creation inspired by the classic dessert that was created in 1951 at Brennan's Restaurant in New Orleans. The original dessert, made with bananas, butter, brown sugar, cinnamon, dark rum, and banana liqueur, flambéed tableside, became an iconic New Orleans specialty. Bartenders in the 2000s began creating cocktail versions to capture those beloved flavors in a drinkable form. This liquid tribute combines the key flavors of rum, banana, and cream to evoke the rich, caramelized dessert.",
      it: "Il cocktail Bananas Foster è una creazione moderna ispirata al classico dessert creato nel 1951 al Brennan's Restaurant di New Orleans. Il dessert originale, fatto con banane, burro, zucchero di canna, cannella, rum scuro e liquore alla banana, flambé al tavolo, divenne una specialità iconica di New Orleans. I barman negli anni 2000 iniziarono a creare versioni cocktail per catturare quei sapori amati in forma bevibile. Questo tributo liquido combina i sapori chiave di rum, banana e panna per evocare il ricco dessert caramellato.",
      vi: "Cocktail Bananas Foster là sáng tạo hiện đại lấy cảm hứng từ món tráng miệng cổ điển được tạo ra vào năm 1951 tại Nhà hàng Brennan's ở New Orleans. Món tráng miệng gốc, được làm với chuối, bơ, đường nâu, quế, rum tối và rượu mùi chuối, đốt cháy bên bàn, đã trở thành đặc sản biểu tượng của New Orleans. Bartender vào những năm 2000 bắt đầu tạo ra các phiên bản cocktail để nắm bắt những hương vị được yêu thích đó dưới dạng có thể uống được. Lời tri ân lỏng này kết hợp các hương vị chính của rum, chuối và kem để gợi lên món tráng miệng caramen đậm đà.",
    },
    named_after: {
      en: 'Named after the classic New Orleans dessert "Bananas Foster," which was created at Brennan\'s Restaurant and named after Richard Foster, a local civic leader.',
      it: 'Prende il nome dal classico dessert di New Orleans "Bananas Foster," creato al Brennan\'s Restaurant e chiamato così in onore di Richard Foster, un leader civico locale.',
      vi: 'Được đặt tên theo món tráng miệng New Orleans cổ điển "Bananas Foster," được tạo ra tại Nhà hàng Brennan\'s và đặt tên theo Richard Foster, một nhà lãnh đạo dân sự địa phương.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'fruity', 'caramel'],
    description: {
      en: 'Sweet and tropical with prominent banana flavor balanced by rich rum and creamy texture. The dark rum provides warmth and depth reminiscent of the caramelized sugar in the original dessert, while the banana liqueur delivers authentic banana sweetness.',
      it: 'Dolce e tropicale con prominente sapore di banana bilanciato da rum ricco e consistenza cremosa. Il rum scuro fornisce calore e profondità che ricordano lo zucchero caramellato nel dessert originale, mentre il liquore alla banana offre autentica dolcezza di banana.',
      vi: 'Ngọt và nhiệt đới với hương vị chuối nổi bật được cân bằng bởi rum đậm đà và kết cấu béo ngậy. Rum tối cung cấp sự ấm áp và chiều sâu gợi nhớ đến đường caramen trong món tráng miệng gốc, trong khi rượu mùi chuối mang đến vị ngọt chuối đích thực.',
    },
    first_impression: {
      en: 'Sweet banana cream with immediate rum warmth',
      it: 'Crema di banana dolce con immediato calore del rum',
      vi: 'Kem chuối ngọt với sự ấm áp rum ngay lập tức',
    },
    finish: {
      en: 'Lingering banana sweetness with warm rum and caramel notes',
      it: 'Dolcezza persistente di banana con rum caldo e note di caramello',
      vi: 'Vị ngọt chuối kéo dài với rum ấm và hương caramel',
    },
    balance: {
      en: 'Sweet and dessert-forward, with rum providing backbone to the banana and cream',
      it: 'Dolce e orientato al dessert, con rum che fornisce struttura alla banana e panna',
      vi: 'Ngọt và hướng tráng miệng, với rum cung cấp xương sống cho chuối và kem',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['dessert', 'celebration', 'tropical_party', 'mardi_gras'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Perfect as a dessert replacement or with banana-based desserts, bread pudding, or vanilla ice cream. Also pairs well with caramel desserts and pecan pie.',
      it: 'Perfetto come sostituto del dessert o con dessert a base di banana, budino di pane o gelato alla vaniglia. Si abbina bene anche con dessert al caramello e torta di noci pecan.',
      vi: 'Hoàn hảo như một món tráng miệng thay thế hoặc với các món tráng miệng làm từ chuối, pudding bánh mì hoặc kem vani. Cũng kết hợp tốt với các món tráng miệng caramel và bánh pecan.',
    },
    ideal_for: {
      en: 'Perfect for lovers of the classic New Orleans dessert and tropical flavors. Ideal for Mardi Gras celebrations, those who enjoy banana-flavored drinks, and anyone seeking a sweet, indulgent cocktail with Southern charm.',
      it: 'Perfetto per gli amanti del classico dessert di New Orleans e dei sapori tropicali. Ideale per le celebrazioni del Mardi Gras, chi ama le bevande al sapore di banana e chiunque cerchi un cocktail dolce e indulgente con fascino del Sud.',
      vi: 'Hoàn hảo cho những người yêu thích món tráng miệng New Orleans cổ điển và hương vị nhiệt đới. Lý tưởng cho các lễ kỷ niệm Mardi Gras, những ai thích đồ uống có hương vị chuối và bất kỳ ai tìm kiếm cocktail ngọt, nuông chiều với nét quyến rũ miền Nam.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_DARK_RUM',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum tối' },
    },
    {
      ingredient_id: 'ING_BANANA_LIQUEUR',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Banana liqueur (Crème de banane)',
        it: 'Liquore alla banana (Crème de banane)',
        vi: 'Rượu mùi chuối (Crème de banane)',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Heavy cream', it: 'Panna', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 10-15 seconds until well-chilled and frothy. Strain into a chilled coupe or martini glass. Optionally, garnish with caramelized banana slice and a sprinkle of cinnamon.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 10-15 secondi fino a quando è ben freddo e schiumoso. Filtrare in una coppa o bicchiere da martini raffreddato. Opzionalmente, guarnire con una fetta di banana caramellata e una spolverata di cannella.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 10-15 giây cho đến khi lạnh kỹ và có bọt. Lọc vào ly coupe hoặc martini đã làm lạnh. Tùy chọn, trang trí bằng lát chuối caramen và rắc quế.',
  },

  glass: 'Coupe (or Martini glass)',

  garnish: {
    en: 'Caramelized banana slice, cinnamon dusting, or banana chip',
    it: 'Fetta di banana caramellata, spolverata di cannella, o chip di banana',
    vi: 'Lát chuối caramen, rắc quế, hoặc chip chuối',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_DARK_RUM'],

  flavor_profile: ['creamy', 'sweet', 'fruity', 'caramel'],

  abv_estimate: 18,

  calories_estimate: 310,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'alcohol'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['all_year'],
  occasion_tags: ['dessert', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['frozen-bananas-foster', 'bananas-foster-colada', 'flaming-bananas-foster'],

  notes_for_staff:
    'Inspired by the classic New Orleans dessert. Some versions add a dash of cinnamon syrup or butterscotch liqueur for extra authenticity. Can be served frozen for a more dessert-like experience. For dramatic presentation, can lightly flame the banana garnish tableside (use caution).',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/8713/bananas-foster-cocktail',
    notes: 'Cocktail version of the famous 1951 New Orleans dessert.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
