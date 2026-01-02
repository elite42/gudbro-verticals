/**
 * Famous Cocktails: Nutty Irishman
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const nuttyIrishman: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
  slug: 'nutty-irishman',
  stable_key: 'nutty_irishman_baileys_frangelico_coffee',

  name: {
    en: 'Nutty Irishman',
    it: 'Nutty Irishman',
    vi: 'Nutty Irishman',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'coffee', 'nutty', 'sweet', 'hot'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A delicious hot coffee cocktail combining Irish cream and hazelnut liqueur with hot coffee. This warming drink blends the creamy sweetness of Baileys with the nutty notes of Frangelico for an indulgent coffee experience.',
    it: 'Un delizioso cocktail al caffè caldo che combina crema irlandese e liquore alla nocciola con caffè caldo. Questa bevanda riscaldante mescola la dolcezza cremosa del Baileys con le note nocciolate del Frangelico per un\'esperienza di caffè indulgente.',
    vi: 'Một loại cocktail cà phê nóng ngon kết hợp kem Ireland và rượu mùi hạt phỉ với cà phê nóng. Thức uống ấm áp này pha trộn vị ngọt béo ngậy của Baileys với hương vị hạt của Frangelico để có trải nghiệm cà phê nuông chiều.',
  },

  history: {
    created_year: '1980s',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Nutty Irishman emerged in the 1980s as bartenders experimented with combining different liqueurs in hot coffee drinks. The pairing of Baileys Irish Cream with Frangelico hazelnut liqueur proved to be a winning combination, creating a drink that was more complex than simple Irish Cream Coffee but still approachable and sweet. The cocktail became popular in bars and restaurants as a dessert coffee option, especially in colder months. It can be served hot or as a chilled cocktail over ice.',
      it: 'Il Nutty Irishman emerse negli anni \'80 quando i barman sperimentarono la combinazione di diversi liquori nelle bevande al caffè caldo. L\'abbinamento di Baileys Irish Cream con liquore alla nocciola Frangelico si rivelò una combinazione vincente, creando una bevanda più complessa del semplice Irish Cream Coffee ma comunque accessibile e dolce. Il cocktail divenne popolare nei bar e ristoranti come opzione di caffè da dessert, specialmente nei mesi più freddi. Può essere servito caldo o come cocktail freddo con ghiaccio.',
      vi: 'Nutty Irishman xuất hiện vào những năm 1980 khi bartender thử nghiệm kết hợp các loại rượu mùi khác nhau trong đồ uống cà phê nóng. Sự kết hợp của Baileys Irish Cream với rượu mùi hạt phỉ Frangelico đã chứng tỏ là một sự kết hợp chiến thắng, tạo ra một thức uống phức tạp hơn Irish Cream Coffee đơn giản nhưng vẫn dễ tiếp cận và ngọt. Cocktail trở nên phổ biến ở các quầy bar và nhà hàng như một lựa chọn cà phê tráng miệng, đặc biệt là trong những tháng lạnh hơn. Nó có thể được phục vụ nóng hoặc như một cocktail lạnh với đá.',
    },
    named_after: {
      en: 'Named for the combination of Irish cream and the "nutty" flavor from hazelnut liqueur.',
      it: 'Prende il nome dalla combinazione di crema irlandese e il sapore "nocciolato" dal liquore alla nocciola.',
      vi: 'Được đặt tên cho sự kết hợp của kem Ireland và hương vị "hạt" từ rượu mùi hạt phỉ.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'nutty', 'coffee'],
    description: {
      en: 'Rich and creamy with pronounced hazelnut and chocolate notes balanced by hot coffee. The Frangelico adds a sophisticated nutty dimension to the sweet Irish cream, creating a more complex flavor profile than standard Irish cream coffee.',
      it: 'Ricco e cremoso con pronunciate note di nocciola e cioccolato bilanciate dal caffè caldo. Il Frangelico aggiunge una dimensione nocciolata sofisticata alla dolce crema irlandese, creando un profilo aromatico più complesso del caffè con crema irlandese standard.',
      vi: 'Đậm đà và béo ngậy với hương vị hạt phỉ và chocolate rõ rệt được cân bằng bởi cà phê nóng. Frangelico thêm chiều hạt tinh tế vào kem Ireland ngọt, tạo ra hồ sơ hương vị phức tạp hơn cà phê kem Ireland tiêu chuẩn.',
    },
    first_impression: {
      en: 'Hot, sweet coffee with immediate hazelnut and cream notes',
      it: 'Caffè caldo e dolce con immediate note di nocciola e panna',
      vi: 'Cà phê nóng, ngọt với hương hạt phỉ và kem ngay lập tức',
    },
    finish: {
      en: 'Warm, lingering hazelnut sweetness with coffee undertones',
      it: 'Dolcezza calda e persistente di nocciola con sottotoni di caffè',
      vi: 'Vị ngọt hạt phỉ ấm, kéo dài với âm hưởng cà phê',
    },
    balance: {
      en: 'Well-balanced between nutty sweetness and coffee bitterness, more complex than simple cream liqueur drinks',
      it: 'Ben bilanciato tra dolcezza nocciolata e amarezza del caffè, più complesso delle semplici bevande al liquore alla crema',
      vi: 'Cân bằng tốt giữa vị ngọt hạt và vị đắng cà phê, phức tạp hơn đồ uống rượu mùi kem đơn giản',
    },
  },

  recommendations: {
    best_time: ['morning', 'afternoon', 'evening'],
    occasions: ['brunch', 'dessert', 'winter', 'casual', 'nightcap'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect with hazelnut desserts, chocolate cake, tiramisu, or biscotti. Also pairs well with breakfast pastries and nutella-based treats.',
      it: 'Perfetto con dessert alla nocciola, torta al cioccolato, tiramisù o biscotti. Si abbina bene anche con dolci per colazione e dolcetti a base di nutella.',
      vi: 'Hoàn hảo với các món tráng miệng hạt phỉ, bánh chocolate, tiramisu hoặc biscotti. Cũng kết hợp tốt với bánh ngọt bữa sáng và đồ ăn làm từ nutella.',
    },
    ideal_for: {
      en: 'Perfect for hazelnut lovers and those who enjoy flavored coffee drinks. Ideal for cold weather, après-ski, brunch occasions, and anyone seeking a more sophisticated alternative to Irish Cream Coffee.',
      it: 'Perfetto per gli amanti della nocciola e chi ama le bevande al caffè aromatizzate. Ideale per il freddo, après-ski, occasioni di brunch e chiunque cerchi un\'alternativa più sofisticata all\'Irish Cream Coffee.',
      vi: 'Hoàn hảo cho người yêu hạt phỉ và những ai thích đồ uống cà phê có hương vị. Lý tưởng cho thời tiết lạnh, après-ski, dịp brunch và bất kỳ ai tìm kiếm sự thay thế tinh tế hơn cho Irish Cream Coffee.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_IRISH_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Irish cream (Baileys)',
        it: 'Crema irlandese (Baileys)',
        vi: 'Kem Ireland (Baileys)',
      },
    },
    {
      ingredient_id: 'ING_FRANGELICO',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Frangelico (hazelnut liqueur)',
        it: 'Frangelico (liquore alla nocciola)',
        vi: 'Frangelico (rượu mùi hạt phỉ)',
      },
    },
    {
      ingredient_id: 'ING_HOT_COFFEE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Hot coffee', it: 'Caffè caldo', vi: 'Cà phê nóng' },
    },
    {
      ingredient_id: 'ING_WHIPPED_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Whipped cream', it: 'Panna montata', vi: 'Kem tươi' },
      optional: true,
    },
  ],

  method: 'build',

  instructions: {
    en: 'Warm an Irish coffee glass or heat-resistant mug with hot water, then discard. Pour Irish cream and Frangelico into the warmed glass. Add freshly brewed hot coffee and stir gently. Top with whipped cream if desired. Optionally garnish with crushed hazelnuts or chocolate shavings. Serve immediately while hot.',
    it: 'Riscaldare un bicchiere da Irish coffee o una tazza resistente al calore con acqua calda, poi scartare. Versare la crema irlandese e il Frangelico nel bicchiere riscaldato. Aggiungere caffè caldo appena preparato e mescolare delicatamente. Guarnire con panna montata se desiderato. Opzionalmente decorare con nocciole tritate o scaglie di cioccolato. Servire immediatamente caldo.',
    vi: 'Làm ấm ly Irish coffee hoặc cốc chịu nhiệt với nước nóng, sau đó loại bỏ. Rót kem Ireland và Frangelico vào ly đã làm ấm. Thêm cà phê nóng mới pha và khuấy nhẹ. Phủ kem tươi nếu muốn. Tùy chọn trang trí bằng hạt phỉ nghiền hoặc phoi chocolate. Phục vụ ngay khi còn nóng.',
  },

  glass: 'Irish coffee glass (or mug)',

  garnish: {
    en: 'Whipped cream, crushed hazelnuts, or chocolate shavings',
    it: 'Panna montata, nocciole tritate, o scaglie di cioccolato',
    vi: 'Kem tươi, hạt phỉ nghiền, hoặc phoi chocolate',
  },

  ice: 'none',

  serving_style: 'hot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_IRISH_CREAM', 'ING_FRANGELICO'],

  flavor_profile: ['creamy', 'sweet', 'nutty', 'coffee'],

  abv_estimate: 10,

  calories_estimate: 250,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'tree_nuts'],
    intolerances: ['lactose', 'alcohol', 'caffeine', 'nut_allergy'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['brunch', 'dessert', 'casual', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['iced-nutty-irishman', 'nutty-irishman-shooter', 'nutty-coffee-martini'],

  notes_for_staff: 'Contains hazelnut liqueur - always check for nut allergies. Can also be served over ice as a cold cocktail. Frangelico is essential for authentic flavor. Popular as a dessert coffee option. Some guests may want extra Frangelico for stronger hazelnut flavor.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/nutty-irishman/',
    note: 'Popular hot coffee cocktail combining Irish cream and hazelnut liqueur.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
