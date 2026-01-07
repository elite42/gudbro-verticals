/**
 * Famous Cocktails: Tiramisu Martini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tiramisuMartini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
  slug: 'tiramisu-martini',
  stable_key: 'tiramisu_martini_vodka_kahlua_baileys_cream',

  name: {
    en: 'Tiramisu Martini',
    it: 'Tiramisu Martini',
    vi: 'Tiramisu Martini',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: [
    'creamy',
    'dessert',
    'famous',
    'coffee',
    'chocolate',
    'sweet',
    'vodka-based',
    'martini-style',
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A liquid version of the beloved Italian dessert, combining vodka, coffee liqueur, Irish cream, and cream to recreate the flavors of tiramisu in cocktail form. This indulgent martini captures the essence of coffee-soaked ladyfingers and mascarpone cream.',
    it: "Una versione liquida dell'amato dessert italiano, che combina vodka, liquore al caffè, crema irlandese e panna per ricreare i sapori del tiramisù in forma di cocktail. Questo martini indulgente cattura l'essenza dei savoiardi imbevuti di caffè e crema di mascarpone.",
    vi: 'Một phiên bản lỏng của món tráng miệng Ý được yêu thích, kết hợp vodka, rượu mùi cà phê, kem Ireland và kem để tái tạo hương vị của tiramisu dưới dạng cocktail. Martini nuông chiều này nắm bắt bản chất của bánh ngón tay ngâm cà phê và kem mascarpone.',
  },

  history: {
    created_year: '2000s',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Tiramisu Martini emerged in the early 2000s as bartenders sought to create cocktail versions of popular desserts. Inspired by the classic Italian tiramisu dessert, mixologists combined coffee liqueur, Irish cream, and vodka to mimic the coffee, cream, and mascarpone flavors of the original dish. The cocktail became popular in upscale Italian restaurants and cocktail bars, offering a sophisticated way to enjoy tiramisu flavors without the fork. It represents the trend of dessert-inspired cocktails that dominated the 2000s.',
      it: 'Il Tiramisu Martini emerse nei primi anni 2000 quando i barman cercarono di creare versioni cocktail di dessert popolari. Ispirato dal classico dessert italiano tiramisù, i mixologist combinarono liquore al caffè, crema irlandese e vodka per imitare i sapori di caffè, panna e mascarpone del piatto originale. Il cocktail divenne popolare nei ristoranti italiani di lusso e nei cocktail bar, offrendo un modo sofisticato di gustare i sapori del tiramisù senza la forchetta. Rappresenta la tendenza dei cocktail ispirati ai dessert che dominarono gli anni 2000.',
      vi: 'Tiramisu Martini xuất hiện vào đầu những năm 2000 khi bartender tìm cách tạo ra phiên bản cocktail của các món tráng miệng phổ biến. Lấy cảm hứng từ món tráng miệng tiramisu Ý cổ điển, mixologist đã kết hợp rượu mùi cà phê, kem Ireland và vodka để bắt chước hương vị cà phê, kem và mascarpone của món ăn gốc. Cocktail trở nên phổ biến ở các nhà hàng Ý cao cấp và quầy bar cocktail, cung cấp cách tinh tế để thưởng thức hương vị tiramisu mà không cần nĩa. Nó đại diện cho xu hướng cocktail lấy cảm hứng từ món tráng miệng thống trị những năm 2000.',
    },
    named_after: {
      en: 'Named after the classic Italian dessert "Tiramisu," which means "pick me up" in Italian, referring to its coffee content.',
      it: 'Prende il nome dal classico dessert italiano "Tiramisù," che significa "tirami su" in italiano, riferendosi al suo contenuto di caffè.',
      vi: 'Được đặt tên theo món tráng miệng Ý cổ điển "Tiramisu," có nghĩa là "pick me up" trong tiếng Ý, ám chỉ hàm lượng cà phê của nó.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'coffee', 'chocolate'],
    description: {
      en: 'A perfect recreation of tiramisu flavors: rich coffee notes balanced with sweet cream and hints of chocolate. The Irish cream adds a mascarpone-like richness while the coffee liqueur provides the espresso character. Sweet, indulgent, and remarkably similar to the dessert.',
      it: "Una perfetta ricreazione dei sapori del tiramisù: ricche note di caffè bilanciate con panna dolce e accenni di cioccolato. La crema irlandese aggiunge una ricchezza simile al mascarpone mentre il liquore al caffè fornisce il carattere dell'espresso. Dolce, indulgente e straordinariamente simile al dessert.",
      vi: 'Sự tái tạo hoàn hảo hương vị tiramisu: hương cà phê đậm đà cân bằng với kem ngọt và gợi ý chocolate. Kem Ireland thêm sự đậm đà giống mascarpone trong khi rượu mùi cà phê cung cấp đặc tính espresso. Ngọt, nuông chiều và đáng chú ý tương tự món tráng miệng.',
    },
    first_impression: {
      en: 'Coffee and cream hit first, immediately reminiscent of tiramisu',
      it: 'Caffè e panna colpiscono per primi, immediatamente reminiscenti del tiramisù',
      vi: 'Cà phê và kem đập vào đầu tiên, ngay lập tức gợi nhớ đến tiramisu',
    },
    finish: {
      en: 'Long, sweet finish with coffee and cocoa notes, just like the dessert',
      it: 'Finale lungo e dolce con note di caffè e cacao, proprio come il dessert',
      vi: 'Kết thúc dài, ngọt với hương cà phê và cacao, giống như món tráng miệng',
    },
    balance: {
      en: 'Well-balanced for a dessert cocktail, with coffee and cream in harmony',
      it: 'Ben bilanciato per un cocktail da dessert, con caffè e panna in armonia',
      vi: 'Cân bằng tốt cho một cocktail tráng miệng, với cà phê và kem hòa quyện',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['dessert', 'date_night', 'italian_dinner', 'celebration'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Perfect as a dessert replacement, especially after Italian meals. Can accompany biscotti, chocolate desserts, or coffee-flavored sweets. Also pairs with cannoli and panna cotta.',
      it: 'Perfetto come sostituto del dessert, specialmente dopo pasti italiani. Può accompagnare biscotti, dessert al cioccolato o dolci al caffè. Si abbina anche con cannoli e panna cotta.',
      vi: 'Hoàn hảo như một món tráng miệng thay thế, đặc biệt sau bữa ăn Ý. Có thể đi kèm với biscotti, các món tráng miệng chocolate hoặc đồ ngọt có hương vị cà phê. Cũng kết hợp với cannoli và panna cotta.',
    },
    ideal_for: {
      en: 'Perfect for tiramisu lovers who want a liquid version of their favorite dessert. Ideal for Italian restaurant endings, coffee enthusiasts, and anyone seeking an indulgent after-dinner cocktail with familiar flavors.',
      it: 'Perfetto per gli amanti del tiramisù che vogliono una versione liquida del loro dessert preferito. Ideale per finali di ristoranti italiani, appassionati di caffè e chiunque cerchi un cocktail indulgente dopo cena con sapori familiari.',
      vi: 'Hoàn hảo cho người yêu tiramisu muốn phiên bản lỏng của món tráng miệng yêu thích. Lý tưởng cho kết thúc nhà hàng Ý, người đam mê cà phê và bất kỳ ai tìm kiếm cocktail nuông chiều sau bữa tối với hương vị quen thuộc.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Coffee liqueur (Kahlúa)',
        it: 'Liquore al caffè (Kahlúa)',
        vi: 'Rượu mùi cà phê (Kahlúa)',
      },
    },
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
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Heavy cream', it: 'Panna', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Rim a chilled martini glass with cocoa powder. Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 15 seconds until well-chilled and frothy. Double strain into the prepared martini glass. Dust the top with cocoa powder to mimic the traditional tiramisu presentation.',
    it: 'Bordare un bicchiere da martini raffreddato con cacao in polvere. Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 15 secondi fino a quando è ben freddo e schiumoso. Filtrare doppiamente nel bicchiere da martini preparato. Spolverare la parte superiore con cacao in polvere per imitare la presentazione tradizionale del tiramisù.',
    vi: 'Viền ly martini đã làm lạnh với bột cacao. Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 15 giây cho đến khi lạnh kỹ và có bọt. Lọc đôi vào ly martini đã chuẩn bị. Rắc bột cacao lên trên để bắt chước cách trình bày tiramisu truyền thống.',
  },

  glass: 'Martini glass',

  garnish: {
    en: 'Cocoa powder dusting, chocolate shavings, or ladyfinger cookie',
    it: 'Spolverata di cacao, scaglie di cioccolato, o biscotto savoiardo',
    vi: 'Rắc bột cacao, phoi chocolate, hoặc bánh ngón tay',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'sweet', 'coffee', 'chocolate'],

  abv_estimate: 17,

  calories_estimate: 340,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  season_tags: ['all_year'],
  occasion_tags: ['dessert', 'date-night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['espresso-tiramisu-martini', 'frozen-tiramisu-martini', 'tiramisu-white-russian'],

  notes_for_staff:
    'The cocoa powder rim and dusting is essential for authentic tiramisu look. Some recipes use amaretto instead of vodka. Can add a shot of espresso for more coffee intensity. Popular in Italian restaurants as a liquid dessert option. High calorie content.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.allrecipes.com/recipe/228654/tiramisu-martini/',
    notes: 'Dessert-inspired cocktail popular in the 2000s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
