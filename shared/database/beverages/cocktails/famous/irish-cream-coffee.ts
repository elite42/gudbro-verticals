/**
 * Famous Cocktails: Irish Cream Coffee
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const irishCreamCoffee: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
  slug: 'irish-cream-coffee',
  stable_key: 'irish_cream_coffee_baileys_hot_coffee',

  name: {
    en: 'Irish Cream Coffee',
    it: 'Irish Cream Coffee',
    vi: 'Irish Cream Coffee',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'coffee', 'hot', 'sweet'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A warming, indulgent hot coffee cocktail made with Irish cream liqueur and topped with whipped cream. This creamy alternative to Irish Coffee offers a sweeter, more dessert-like experience perfect for cold evenings.',
    it: 'Un cocktail caldo e indulgente al caffè fatto con liquore alla crema irlandese e guarnito con panna montata. Questa alternativa cremosa all\'Irish Coffee offre un\'esperienza più dolce e simile al dessert, perfetta per serate fredde.',
    vi: 'Một loại cocktail cà phê nóng ấm áp, nuông chiều làm từ rượu mùi kem Ireland và phủ kem tươi. Sự thay thế béo ngậy này cho Irish Coffee cung cấp trải nghiệm ngọt hơn, giống món tráng miệng hơn, hoàn hảo cho những buổi tối lạnh.',
  },

  history: {
    created_year: '1970s',
    origin: {
      country: 'Ireland',
    },
    story: {
      en: 'Irish Cream Coffee emerged in the 1970s following the creation and commercial success of Baileys Irish Cream in 1974. As Baileys became popular worldwide, bartenders and home enthusiasts began adding it to hot coffee as a simpler, sweeter alternative to the classic Irish Coffee (which uses whiskey, coffee, sugar, and cream). The drink became especially popular in cafes and restaurants as an after-dinner beverage, offering a more accessible entry point to spiked coffee drinks. It remains a favorite winter warmer and dessert coffee option.',
      it: 'L\'Irish Cream Coffee emerse negli anni \'70 dopo la creazione e il successo commerciale di Baileys Irish Cream nel 1974. Mentre Baileys diventava popolare in tutto il mondo, barman e appassionati casalinghi iniziarono ad aggiungerlo al caffè caldo come alternativa più semplice e dolce al classico Irish Coffee (che usa whiskey, caffè, zucchero e panna). La bevanda divenne particolarmente popolare nei caffè e ristoranti come bevanda dopo cena, offrendo un punto di ingresso più accessibile alle bevande al caffè alcoliche. Rimane un favorito scaldante invernale e opzione di caffè da dessert.',
      vi: 'Irish Cream Coffee xuất hiện vào những năm 1970 sau khi tạo ra và thành công thương mại của Baileys Irish Cream vào năm 1974. Khi Baileys trở nên phổ biến trên toàn thế giới, bartender và những người đam mê tại nhà bắt đầu thêm nó vào cà phê nóng như một sự thay thế đơn giản hơn, ngọt hơn cho Irish Coffee cổ điển (sử dụng whiskey, cà phê, đường và kem). Thức uống trở nên đặc biệt phổ biến ở các quán cà phê và nhà hàng như một thức uống sau bữa tối, cung cấp điểm khởi đầu dễ tiếp cận hơn cho đồ uống cà phê có cồn. Nó vẫn là món ấm mùa đông yêu thích và lựa chọn cà phê tráng miệng.',
    },
    named_after: {
      en: 'Named for its primary ingredient, Irish cream liqueur, combined with coffee.',
      it: 'Prende il nome dal suo ingrediente principale, il liquore alla crema irlandese, combinato con il caffè.',
      vi: 'Được đặt tên cho thành phần chính của nó, rượu mùi kem Ireland, kết hợp với cà phê.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'coffee', 'chocolate'],
    description: {
      en: 'Rich, sweet coffee with pronounced chocolate and vanilla notes from the Irish cream. Creamy and indulgent with a perfect balance of coffee bitterness and liqueur sweetness. Warmer and more dessert-like than traditional Irish Coffee.',
      it: 'Caffè ricco e dolce con pronunciate note di cioccolato e vaniglia dalla crema irlandese. Cremoso e indulgente con un perfetto equilibrio di amarezza del caffè e dolcezza del liquore. Più caldo e simile a un dessert rispetto al tradizionale Irish Coffee.',
      vi: 'Cà phê đậm đà, ngọt với hương chocolate và vani rõ rệt từ kem Ireland. Béo ngậy và nuông chiều với sự cân bằng hoàn hảo của vị đắng cà phê và vị ngọt rượu mùi. Ấm hơn và giống món tráng miệng hơn Irish Coffee truyền thống.',
    },
    first_impression: {
      en: 'Hot, sweet coffee with immediate creamy chocolate notes',
      it: 'Caffè caldo e dolce con immediate note cremose di cioccolato',
      vi: 'Cà phê nóng, ngọt với hương chocolate béo ngậy ngay lập tức',
    },
    finish: {
      en: 'Warm, lingering sweetness with coffee and cream',
      it: 'Dolcezza calda e persistente con caffè e panna',
      vi: 'Vị ngọt ấm, kéo dài với cà phê và kem',
    },
    balance: {
      en: 'Sweet and creamy with enough coffee bitterness to prevent it from being cloying',
      it: 'Dolce e cremoso con abbastanza amarezza del caffè per evitare che sia stucchevole',
      vi: 'Ngọt và béo ngậy với đủ vị đắng cà phê để tránh bị ngọt gắt',
    },
  },

  recommendations: {
    best_time: ['morning', 'afternoon', 'evening'],
    occasions: ['brunch', 'dessert', 'winter', 'casual', 'nightcap'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect with breakfast pastries, chocolate desserts, tiramisu, or as a dessert replacement. Also pairs well with biscotti, cookies, and chocolate cake.',
      it: 'Perfetto con dolci per colazione, dessert al cioccolato, tiramisù, o come sostituto del dessert. Si abbina bene anche con biscotti e torta al cioccolato.',
      vi: 'Hoàn hảo với bánh ngọt bữa sáng, các món tráng miệng chocolate, tiramisu, hoặc thay thế món tráng miệng. Cũng kết hợp tốt với biscotti, bánh quy và bánh chocolate.',
    },
    ideal_for: {
      en: 'Perfect for coffee and Irish cream lovers seeking a warming dessert drink. Ideal for cold weather, après-ski, brunch occasions, and anyone who wants a sweeter, easier alternative to Irish Coffee.',
      it: 'Perfetto per gli amanti del caffè e della crema irlandese che cercano una bevanda da dessert riscaldante. Ideale per il freddo, après-ski, occasioni di brunch e chiunque voglia un\'alternativa più dolce e facile all\'Irish Coffee.',
      vi: 'Hoàn hảo cho người yêu cà phê và kem Ireland tìm kiếm thức uống tráng miệng ấm áp. Lý tưởng cho thời tiết lạnh, après-ski, dịp brunch và bất kỳ ai muốn một sự thay thế ngọt hơn, dễ dàng hơn cho Irish Coffee.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_IRISH_CREAM',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Irish cream (Baileys)',
        it: 'Crema irlandese (Baileys)',
        vi: 'Kem Ireland (Baileys)',
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
    en: 'Warm an Irish coffee glass or heat-resistant mug with hot water, then discard. Pour Irish cream into the warmed glass. Add freshly brewed hot coffee and stir gently. Top with a generous dollop of whipped cream. Optionally dust with cocoa powder or chocolate shavings. Serve immediately while hot.',
    it: 'Riscaldare un bicchiere da Irish coffee o una tazza resistente al calore con acqua calda, poi scartare. Versare la crema irlandese nel bicchiere riscaldato. Aggiungere caffè caldo appena preparato e mescolare delicatamente. Guarnire con una generosa cucchiaiata di panna montata. Opzionalmente spolverare con cacao in polvere o scaglie di cioccolato. Servire immediatamente caldo.',
    vi: 'Làm ấm ly Irish coffee hoặc cốc chịu nhiệt với nước nóng, sau đó loại bỏ. Rót kem Ireland vào ly đã làm ấm. Thêm cà phê nóng mới pha và khuấy nhẹ. Phủ một lượng lớn kem tươi lên trên. Tùy chọn rắc bột cacao hoặc phoi chocolate. Phục vụ ngay khi còn nóng.',
  },

  glass: 'Irish coffee glass (or mug)',

  garnish: {
    en: 'Whipped cream, cocoa powder dusting, or chocolate shavings',
    it: 'Panna montata, spolverata di cacao, o scaglie di cioccolato',
    vi: 'Kem tươi, rắc bột cacao, hoặc phoi chocolate',
  },

  ice: 'none',

  serving_style: 'hot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_IRISH_CREAM'],

  flavor_profile: ['creamy', 'sweet', 'coffee', 'chocolate'],

  abv_estimate: 8,

  calories_estimate: 220,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'alcohol', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
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
  variants: ['irish-coffee', 'nutty-irishman', 'mudslide-coffee'],

  notes_for_staff: 'Simpler and sweeter than traditional Irish Coffee. Use fresh, hot coffee for best results. Can add extra shot of espresso for stronger coffee flavor. Popular as a dessert coffee option. Baileys is the preferred Irish cream brand.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.baileys.com/en-us/recipes/baileys-coffee/',
    note: 'Popular hot coffee drink made with Baileys Irish Cream.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
