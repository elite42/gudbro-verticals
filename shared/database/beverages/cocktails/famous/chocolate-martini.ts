/**
 * Famous Cocktails: Chocolate Martini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const chocolateMartini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
  slug: 'chocolate-martini',
  stable_key: 'chocolate_martini_vodka_cacao_cream',

  name: {
    en: 'Chocolate Martini',
    it: 'Chocolate Martini',
    vi: 'Chocolate Martini',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'chocolate', 'sweet', 'vodka-based', 'martini-style'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A decadent dessert cocktail that combines vodka, chocolate liqueur, and cream in a martini glass. This modern classic transforms the chocolate martini into a liquid dessert, perfect for those who want their chocolate fix with a boozy twist.',
    it: 'Un decadente cocktail da dessert che combina vodka, liquore al cioccolato e panna in un bicchiere da martini. Questo classico moderno trasforma il chocolate martini in un dessert liquido, perfetto per chi vuole la sua dose di cioccolato con una svolta alcolica.',
    vi: 'Một loại cocktail tráng miệng xa hoa kết hợp vodka, rượu mùi chocolate và kem trong ly martini. Tác phẩm cổ điển hiện đại này biến chocolate martini thành món tráng miệng lỏng, hoàn hảo cho những ai muốn liều lượng chocolate với twist có cồn.',
  },

  history: {
    created_year: '1990s',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Chocolate Martini emerged in the 1990s during the "martini craze" when bartenders began putting everything in a martini glass and calling it a martini. Unlike classic martinis, this is purely a dessert cocktail with no vermouth or gin. The drink became enormously popular in upscale bars and restaurants, appealing especially to those who wanted a sophisticated-looking dessert drink. Various versions exist, some using vodka and chocolate liqueur, others adding Irish cream or even using chocolate vodka.',
      it: 'Il Chocolate Martini emerse negli anni \'90 durante la "mania del martini" quando i barman iniziarono a mettere tutto in un bicchiere da martini e chiamarlo martini. A differenza dei martini classici, questo è puramente un cocktail da dessert senza vermouth o gin. La bevanda divenne enormemente popolare nei bar e ristoranti di lusso, attraendo specialmente chi voleva una bevanda da dessert dall\'aspetto sofisticato. Esistono varie versioni, alcune usando vodka e liquore al cioccolato, altre aggiungendo crema irlandese o addirittura usando vodka al cioccolato.',
      vi: 'Chocolate Martini xuất hiện vào những năm 1990 trong "cơn sốt martini" khi bartender bắt đầu cho mọi thứ vào ly martini và gọi nó là martini. Không giống như martini cổ điển, đây hoàn toàn là một cocktail tráng miệng không có vermouth hoặc gin. Thức uống trở nên cực kỳ phổ biến ở các quầy bar và nhà hàng cao cấp, đặc biệt hấp dẫn những ai muốn thức uống tráng miệng trông tinh tế. Tồn tại nhiều phiên bản khác nhau, một số sử dụng vodka và rượu mùi chocolate, những cái khác thêm kem Ireland hoặc thậm chí sử dụng vodka chocolate.',
    },
    named_after: {
      en: 'Named "Chocolate Martini" for its chocolate flavor and martini glass presentation, despite having no relation to a traditional martini.',
      it: 'Chiamato "Chocolate Martini" per il suo sapore di cioccolato e la presentazione nel bicchiere da martini, nonostante non abbia alcuna relazione con un martini tradizionale.',
      vi: 'Được đặt tên "Chocolate Martini" cho hương vị chocolate và cách trình bày ly martini, mặc dù không có liên quan gì đến martini truyền thống.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'chocolate', 'rich'],
    description: {
      en: 'Rich, velvety chocolate flavor with vodka smoothness and creamy texture. Very sweet and dessert-forward, tasting like liquid chocolate with a boozy kick. The cream softens the chocolate intensity into a silky, indulgent experience.',
      it: 'Ricco sapore di cioccolato vellutato con morbidezza della vodka e consistenza cremosa. Molto dolce e orientato al dessert, con un sapore di cioccolato liquido con un calcio alcolico. La panna ammorbidisce l\'intensità del cioccolato in un\'esperienza setosa e indulgente.',
      vi: 'Hương vị chocolate đậm đà, mượt mà với độ mịn của vodka và kết cấu béo ngậy. Rất ngọt và hướng tráng miệng, có vị như chocolate lỏng với cú đá có cồn. Kem làm mềm cường độ chocolate thành trải nghiệm mượt mà, nuông chiều.',
    },
    first_impression: {
      en: 'Immediate rich chocolate sweetness with creamy texture',
      it: 'Immediata ricca dolcezza al cioccolato con consistenza cremosa',
      vi: 'Vị ngọt chocolate đậm đà ngay lập tức với kết cấu béo ngậy',
    },
    finish: {
      en: 'Long, sweet chocolate finish with lingering cream',
      it: 'Finale lungo e dolce al cioccolato con panna persistente',
      vi: 'Kết thúc chocolate ngọt dài với kem kéo dài',
    },
    balance: {
      en: 'Heavily weighted toward sweetness and chocolate - this is dessert first, cocktail second',
      it: 'Fortemente orientato verso la dolcezza e il cioccolato - questo è prima dessert, poi cocktail',
      vi: 'Thiên hẳn về vị ngọt và chocolate - đây là tráng miệng trước, cocktail sau',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['dessert', 'date_night', 'celebration', 'girls_night'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Best enjoyed as a dessert replacement. Can accompany chocolate desserts, brownies, or chocolate mousse. Also pairs with strawberries and vanilla ice cream.',
      it: 'Si gusta meglio come sostituto del dessert. Può accompagnare dessert al cioccolato, brownie o mousse al cioccolato. Si abbina anche con fragole e gelato alla vaniglia.',
      vi: 'Tốt nhất khi thưởng thức như một món tráng miệng thay thế. Có thể đi kèm với các món tráng miệng chocolate, brownie hoặc mousse chocolate. Cũng kết hợp với dâu tây và kem vani.',
    },
    ideal_for: {
      en: 'Perfect for chocolate lovers who want a sophisticated dessert drink. Ideal for date nights, celebrations, and anyone seeking an indulgent after-dinner cocktail. Popular choice for those who don\'t typically enjoy strong spirits.',
      it: 'Perfetto per gli amanti del cioccolato che vogliono una bevanda da dessert sofisticata. Ideale per serate romantiche, celebrazioni e chiunque cerchi un cocktail indulgente dopo cena. Scelta popolare per chi non ama tipicamente gli spiriti forti.',
      vi: 'Hoàn hảo cho người yêu chocolate muốn thức uống tráng miệng tinh tế. Lý tưởng cho đêm hẹn hò, ăn mừng và bất kỳ ai tìm kiếm cocktail nuông chiều sau bữa tối. Lựa chọn phổ biến cho những ai thường không thích rượu mạnh.',
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
      ingredient_id: 'ING_CREME_DE_CACAO_DARK',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Crème de cacao (dark)',
        it: 'Crème de cacao (scura)',
        vi: 'Crème de cacao (tối)',
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
    en: 'Optionally, rim a chilled martini glass with chocolate syrup and cocoa powder. Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 15 seconds until well-chilled. Double strain into the prepared martini glass. Garnish with chocolate shavings or a chocolate kiss.',
    it: 'Opzionalmente, bordare un bicchiere da martini raffreddato con sciroppo di cioccolato e cacao in polvere. Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 15 secondi fino a quando è ben freddo. Filtrare doppiamente nel bicchiere da martini preparato. Guarnire con scaglie di cioccolato o un cioccolatino.',
    vi: 'Tùy chọn, viền ly martini đã làm lạnh với siro chocolate và bột cacao. Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 15 giây cho đến khi lạnh kỹ. Lọc đôi vào ly martini đã chuẩn bị. Trang trí bằng phoi chocolate hoặc một viên chocolate.',
  },

  glass: 'Martini glass',

  garnish: {
    en: 'Chocolate shavings, chocolate syrup rim, or Hershey\'s Kiss',
    it: 'Scaglie di cioccolato, bordo di sciroppo di cioccolato, o Hershey\'s Kiss',
    vi: 'Phoi chocolate, viền siro chocolate, hoặc Hershey\'s Kiss',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'sweet', 'chocolate', 'rich'],

  abv_estimate: 18,

  calories_estimate: 300,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  season_tags: ['all-seasons'],
  occasion_tags: ['dessert', 'date-night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['espresso-chocolate-martini', 'white-chocolate-martini', 'dirty-chocolate-martini'],

  notes_for_staff: 'Not a real martini - it\'s a dessert drink. Many variations exist: add Bailey\'s for extra cream, espresso for depth, or use chocolate vodka. The chocolate rim is popular but optional. Can use half-and-half instead of cream for lighter version. Very sweet - warn guests accordingly.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/chocolate-martini/',
    note: 'Popular dessert martini from the 1990s cocktail renaissance.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
