/**
 * Famous Cocktails: Brandy Alexander
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const brandyAlexander: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  slug: 'brandy-alexander',
  stable_key: 'brandy_alexander_cognac_cacao_cream',

  name: {
    en: 'Brandy Alexander',
    it: 'Brandy Alexander',
    vi: 'Brandy Alexander',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'classic', 'chocolate', 'brandy-based'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The most popular variation of the Alexander, made with brandy (or cognac) instead of gin. This elegant, creamy cocktail combines the warmth of brandy with the richness of chocolate and cream, creating a sophisticated after-dinner indulgence.',
    it: "La variazione più popolare dell'Alexander, fatta con brandy (o cognac) invece di gin. Questo elegante cocktail cremoso combina il calore del brandy con la ricchezza del cioccolato e della panna, creando un'indulgenza sofisticata dopo cena.",
    vi: 'Biến thể phổ biến nhất của Alexander, được làm với brandy (hoặc cognac) thay vì gin. Cocktail béo ngậy thanh lịch này kết hợp sự ấm áp của brandy với sự đậm đà của chocolate và kem, tạo ra sự nuông chiều tinh tế sau bữa tối.',
  },

  history: {
    created_year: '1920s',
    origin: {
      city: 'London',
      country: 'England',
    },
    story: {
      en: 'The Brandy Alexander emerged in the 1920s-30s as a more refined variation of the original gin-based Alexander. While the exact origin is debated, it became the definitive version of the drink, especially popular during the mid-20th century. The cocktail enjoyed particular fame after being featured in the film "Days of Wine and Roses" (1962) and was reportedly a favorite of John Lennon. Its popularity peaked in the 1970s as a glamorous after-dinner drink.',
      it: "Il Brandy Alexander emerse negli anni '20-'30 come variazione più raffinata dell'Alexander originale a base di gin. Sebbene l'origine esatta sia dibattuta, divenne la versione definitiva della bevanda, particolarmente popolare durante la metà del XX secolo. Il cocktail ha goduto di particolare fama dopo essere stato presente nel film \"Days of Wine and Roses\" (1962) ed era secondo quanto riferito un favorito di John Lennon. La sua popolarità raggiunse il picco negli anni '70 come glamorosa bevanda dopo cena.",
      vi: 'Brandy Alexander xuất hiện vào những năm 1920-30 như một biến thể tinh tế hơn của Alexander gốc làm từ gin. Mặc dù nguồn gốc chính xác còn tranh cãi, nó đã trở thành phiên bản xác định của thức uống, đặc biệt phổ biến trong giữa thế kỷ 20. Cocktail này đặc biệt nổi tiếng sau khi xuất hiện trong bộ phim "Days of Wine and Roses" (1962) và được cho là yêu thích của John Lennon. Sự phổ biến của nó đạt đỉnh vào những năm 1970 như một thức uống quyến rũ sau bữa tối.',
    },
    named_after: {
      en: 'Named after the original Alexander cocktail, with "Brandy" added to distinguish it from the gin-based version.',
      it: 'Prende il nome dal cocktail Alexander originale, con "Brandy" aggiunto per distinguerlo dalla versione a base di gin.',
      vi: 'Được đặt tên theo cocktail Alexander gốc, với "Brandy" được thêm vào để phân biệt nó với phiên bản làm từ gin.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'chocolate', 'boozy'],
    description: {
      en: 'Luxuriously smooth and velvety with a perfect marriage of chocolate, cream, and warming brandy. More complex than its gin-based predecessor, with deeper, richer flavors and a sophisticated finish.',
      it: 'Lussuosamente liscio e vellutato con un perfetto connubio di cioccolato, panna e brandy caldo. Più complesso del suo predecessore a base di gin, con sapori più profondi e ricchi e un finale sofisticato.',
      vi: 'Sang trọng mượt mà và mịn màng với sự kết hợp hoàn hảo của chocolate, kem và brandy ấm áp. Phức tạp hơn người tiền nhiệm làm từ gin, với hương vị sâu hơn, đậm đà hơn và kết thúc tinh tế.',
    },
    first_impression: {
      en: 'Silky chocolate cream followed immediately by warm brandy notes',
      it: 'Crema di cioccolato setosa seguita immediatamente da note calde di brandy',
      vi: 'Kem chocolate mượt như lụa tiếp theo ngay lập tức là hương brandy ấm áp',
    },
    finish: {
      en: 'Long, warming finish with nutmeg spice and lingering cocoa',
      it: 'Finale lungo e caldo con spezie di noce moscata e cacao persistente',
      vi: 'Kết thúc dài, ấm áp với gia vị nhục đậu khấu và cacao kéo dài',
    },
    balance: {
      en: 'Beautifully balanced between sweetness, cream, and spirit - more sophisticated than most dessert cocktails',
      it: 'Splendidamente bilanciato tra dolcezza, panna e spirito - più sofisticato della maggior parte dei cocktail da dessert',
      vi: 'Cân bằng tuyệt đẹp giữa vị ngọt, kem và rượu - tinh tế hơn hầu hết các cocktail tráng miệng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'date_night', 'celebration', 'nightcap'],
    seasons: ['autumn', 'winter', 'all_year'],
    food_pairings: {
      en: 'Excellent with chocolate desserts, crème brûlée, tiramisu, or as a dessert replacement. Pairs beautifully with aged cheese, chocolate truffles, and espresso.',
      it: 'Eccellente con dessert al cioccolato, crème brûlée, tiramisù, o come sostituto del dessert. Si abbina magnificamente con formaggi stagionati, tartufi al cioccolato ed espresso.',
      vi: 'Tuyệt vời với các món tráng miệng chocolate, crème brûlée, tiramisu, hoặc thay thế món tráng miệng. Kết hợp đẹp với phô mai già, truffle chocolate và espresso.',
    },
    ideal_for: {
      en: 'Perfect for brandy and cognac lovers who appreciate creamy, indulgent cocktails. Ideal for those seeking a sophisticated dessert drink with historical pedigree. A classic choice for elegant dinners and special occasions.',
      it: 'Perfetto per gli amanti del brandy e del cognac che apprezzano i cocktail cremosi e indulgenti. Ideale per chi cerca una bevanda da dessert sofisticata con pedigree storico. Una scelta classica per cene eleganti e occasioni speciali.',
      vi: 'Hoàn hảo cho người yêu brandy và cognac đánh giá cao cocktail béo ngậy, nuông chiều. Lý tưởng cho những ai tìm kiếm thức uống tráng miệng tinh tế với nguồn gốc lịch sử. Lựa chọn cổ điển cho bữa tối sang trọng và dịp đặc biệt.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 40, unit: 'ml' },
      display_name: {
        en: 'Cognac (or Brandy)',
        it: 'Cognac (o Brandy)',
        vi: 'Cognac (hoặc Brandy)',
      },
    },
    {
      ingredient_id: 'ING_CREME_DE_CACAO_DARK',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Crème de Cacao (dark)',
        it: 'Crème de Cacao (scura)',
        vi: 'Crème de Cacao (tối)',
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
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 10-15 seconds until well-chilled and frothy. Double strain into a chilled coupe or martini glass. Grate fresh nutmeg over the top.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 10-15 secondi fino a quando è ben freddo e schiumoso. Filtrare doppiamente in una coppa o bicchiere da martini raffreddato. Grattugiare noce moscata fresca sopra.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 10-15 giây cho đến khi lạnh và có bọt. Lọc đôi vào ly coupe hoặc martini đã làm lạnh. Bào nhục đậu khấu tươi lên trên.',
  },

  glass: 'Coupe (or Martini)',

  garnish: {
    en: 'Freshly grated nutmeg',
    it: 'Noce moscata appena grattugiata',
    vi: 'Nhục đậu khấu mới bào',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC'],

  flavor_profile: ['creamy', 'sweet', 'chocolate', 'boozy'],

  abv_estimate: 20,

  calories_estimate: 290,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter', 'all_year'],
  occasion_tags: ['digestivo', 'date-night', 'celebration', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['alexander', 'coffee-alexander', 'alexander-sister'],

  notes_for_staff:
    'This is the more popular version of the Alexander. Always use freshly grated nutmeg. Shake hard to properly emulsify cream. Can use quality brandy instead of cognac for cost savings. Some recipes call for equal parts (30ml each) - adjust to guest preference.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/253/brandy-alexander',
    notes: 'Classic variation of the Alexander, more popular than the original gin-based version.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
