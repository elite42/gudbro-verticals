/**
 * IBA New Era Drinks: Last Word
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const lastWordNewEra: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2d4e6f8-3a5c-4e7b-9d1f-2c4a6e8b0d3f',
  slug: 'last-word-new-era',
  stable_key: 'f3e5d7c9b1a8f6e4d2c0b8a6f4e2d0c8',

  name: {
    en: 'Last Word',
    it: 'Last Word',
    vi: 'Last Word',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'prohibition-era', 'rediscovered', 'herbal', 'balanced'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A perfectly balanced Prohibition-era cocktail featuring gin, green Chartreuse, maraschino liqueur, and lime juice in equal parts. The Last Word is a complex, herbal masterpiece that was forgotten for decades before being rediscovered in the 2000s.',
    it: "Un cocktail dell'era del Proibizionismo perfettamente bilanciato con gin, Chartreuse verde, liquore di maraschino e succo di lime in parti uguali. Il Last Word è un capolavoro erbaceo complesso che è stato dimenticato per decenni prima di essere riscoperto negli anni 2000.",
    vi: 'Một cocktail thời kỳ Cấm rượu cân bằng hoàn hảo với gin, Chartreuse xanh lá, rượu maraschino và nước cốt chanh theo tỷ lệ bằng nhau. Last Word là một kiệt tác thảo mộc phức tạp đã bị lãng quên hàng thập kỷ trước khi được tái khám phá vào những năm 2000.',
  },

  history: {
    created_year: '1915',
    origin: {
      city: 'Detroit',
      bar: 'Detroit Athletic Club',
      country: 'USA',
    },
    creator: {
      name: 'Frank Fogarty',
      profession: 'vaudeville performer & bartender',
    },
    story: {
      en: "The Last Word was created around 1915 at the Detroit Athletic Club, introduced by vaudeville performer Frank Fogarty. The drink appeared in Ted Saucier's 1951 book \"Bottoms Up\" but then faded into obscurity. It was rediscovered in 2004 by Murray Stenson at the Zig Zag Café in Seattle, who found the recipe in Saucier's book. Stenson's revival of the Last Word sparked a global renaissance, inspiring countless variations and helping to establish equal-parts cocktails as a modern mixing technique.",
      it: 'Il Last Word fu creato intorno al 1915 al Detroit Athletic Club, introdotto dall\'artista di vaudeville Frank Fogarty. Il drink apparve nel libro di Ted Saucier del 1951 "Bottoms Up" ma poi svanì nell\'oscurità. Fu riscoperto nel 2004 da Murray Stenson allo Zig Zag Café di Seattle, che trovò la ricetta nel libro di Saucier. La rinascita del Last Word da parte di Stenson ha scatenato un rinascimento globale, ispirando innumerevoli varianti e aiutando a stabilire i cocktail a parti uguali come tecnica moderna di miscelazione.',
      vi: 'Last Word được tạo ra vào khoảng năm 1915 tại Detroit Athletic Club, được giới thiệu bởi nghệ sĩ vaudeville Frank Fogarty. Thức uống xuất hiện trong cuốn sách "Bottoms Up" năm 1951 của Ted Saucier nhưng sau đó biến mất trong bóng tối. Nó được tái khám phá vào năm 2004 bởi Murray Stenson tại Zig Zag Café ở Seattle, người tìm thấy công thức trong sách của Saucier. Sự hồi sinh của Last Word bởi Stenson đã châm ngòi cho một sự phục hưng toàn cầu, truyền cảm hứng cho vô số biến thể và giúp thiết lập cocktail phần bằng nhau như một kỹ thuật pha chế hiện đại.',
    },
    named_after: {
      en: 'The name "Last Word" is believed to reference either the finality of a great drink (having the last word in cocktail perfection) or possibly Frank Fogarty\'s signature vaudeville act.',
      it: 'Si ritiene che il nome "Last Word" faccia riferimento alla definitività di un grande drink (avendo l\'ultima parola nella perfezione del cocktail) o forse all\'atto di vaudeville caratteristico di Frank Fogarty.',
      vi: 'Tên "Last Word" được cho là ám chỉ sự cuối cùng của một thức uống tuyệt vời (có tiếng nói cuối cùng trong sự hoàn hảo cocktail) hoặc có thể là tiết mục vaudeville đặc trưng của Frank Fogarty.',
    },
  },

  taste: {
    profile: ['herbal', 'tart', 'complex', 'botanical'],
    description: {
      en: 'Extraordinarily complex and balanced. The juniper-forward gin provides structure, green Chartreuse adds intense herbal and honey notes, maraschino liqueur contributes subtle almond-cherry sweetness, and lime juice brings bright acidity. Each ingredient is distinct yet harmonious.',
      it: 'Straordinariamente complesso e bilanciato. Il gin con ginepro in primo piano fornisce struttura, la Chartreuse verde aggiunge intense note erbacee e di miele, il liquore di maraschino contribuisce con sottile dolcezza di mandorla e ciliegia, e il succo di lime porta brillante acidità. Ogni ingrediente è distinto ma armonioso.',
      vi: 'Phức tạp và cân bằng phi thường. Gin hướng hoa tùng cung cấp cấu trúc, Chartreuse xanh lá thêm hương thảo mộc và mật ong mạnh mẽ, rượu maraschino đóng góp vị ngọt hạnh nhân-anh đào tinh tế, và nước cốt chanh mang lại độ acid tươi sáng. Mỗi thành phần đều riêng biệt nhưng hài hòa.',
    },
    first_impression: {
      en: 'Bright lime and herbal Chartreuse hit first, followed by botanical gin complexity',
      it: 'Il lime brillante e la Chartreuse erbacee colpiscono per primi, seguiti dalla complessità botanica del gin',
      vi: 'Chanh tươi sáng và Chartreuse thảo mộc đập vào đầu tiên, tiếp theo là độ phức tạp thực vật của gin',
    },
    finish: {
      en: 'Long, herbal finish with lingering Chartreuse and subtle maraschino sweetness',
      it: 'Finale lungo ed erbaceo con Chartreuse persistente e sottile dolcezza di maraschino',
      vi: 'Kết thúc dài, thảo mộc với Chartreuse kéo dài và vị ngọt maraschino tinh tế',
    },
    balance: {
      en: 'Perfectly balanced equal-parts formula - a masterclass in cocktail harmony where no single ingredient dominates',
      it: 'Formula perfettamente bilanciata a parti uguali - una lezione magistrale di armonia nel cocktail dove nessun ingrediente domina',
      vi: 'Công thức phần bằng nhau cân bằng hoàn hảo - một lớp học mẫu về sự hài hòa cocktail nơi không có thành phần nào thống trị',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['aperitivo', 'craft_cocktail_experience', 'date_night', 'sophisticated_gathering'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Pairs beautifully with oysters, fresh seafood, herb-crusted fish, goat cheese, and light salads. The herbal complexity also works well with Mediterranean cuisine.',
      it: 'Si abbina magnificamente con ostriche, frutti di mare freschi, pesce in crosta di erbe, formaggio di capra e insalate leggere. La complessità erbaccea funziona bene anche con la cucina mediterranea.',
      vi: 'Kết hợp tuyệt vời với hàu, hải sản tươi, cá phủ thảo mộc, phô mai dê và salad nhẹ. Độ phức tạp thảo mộc cũng hoạt động tốt với ẩm thực Địa Trung Hải.',
    },
    ideal_for: {
      en: 'Perfect for cocktail enthusiasts who appreciate complex, spirit-forward drinks. A must-try for anyone interested in cocktail history or modern craft mixology. Ideal for those who enjoy herbal and botanical flavors.',
      it: 'Perfetto per gli appassionati di cocktail che apprezzano drink complessi e incentrati sugli spirit. Un must per chiunque sia interessato alla storia del cocktail o alla moderna mixologia artigianale. Ideale per chi ama sapori erbacei e botanici.',
      vi: 'Hoàn hảo cho những người đam mê cocktail đánh giá cao đồ uống phức tạp, hướng đến rượu mạnh. Phải thử cho bất kỳ ai quan tâm đến lịch sử cocktail hoặc nghệ thuật pha chế hiện đại. Lý tưởng cho những ai thích hương vị thảo mộc và thực vật.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_CHARTREUSE_GREEN',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Green Chartreuse',
        it: 'Chartreuse Verde',
        vi: 'Chartreuse Xanh Lá',
      },
    },
    {
      ingredient_id: 'ING_MARASCHINO_LIQUEUR',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Maraschino liqueur',
        it: 'Liquore di maraschino',
        vi: 'Rượu maraschino',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled coupe glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly coupe đã được làm lạnh.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Brandied cherry (optional)',
    it: 'Ciliegia al brandy (facoltativo)',
    vi: 'Cherry ngâm brandy (tùy chọn)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['herbal', 'tart', 'complex', 'botanical'],

  abv_estimate: 27,

  calories_estimate: 190,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'craft_cocktail_experience', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['naked-and-famous', 'final-ward', 'division-bell', 'paper-plane'],

  notes_for_staff:
    'Equal parts (22.5ml each) is critical - this is the foundation of the drink. Use high-quality gin with good botanical character. Fresh lime juice essential. Luxardo Maraschino is preferred. This drink inspired countless modern equal-parts variations. Educate guests on the 2004 revival story.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/last-word/',
    notes:
      'IBA Official Recipe. Originally from Ted Saucier\'s "Bottoms Up" (1951), revived by Murray Stenson at Zig Zag Café, Seattle, 2004.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
