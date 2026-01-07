/**
 * Martinez Cocktail
 *
 * The Martinez is widely regarded as the direct precursor to the Martini,
 * dating back to the 1860s-1870s. Its origins are disputed between
 * Jerry Thomas at the Occidental Hotel and a bartender in Martinez, California.
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const martinez: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '74ea4ca4-6089-4a12-8cec-9baee7799089',
  slug: 'martinez',
  stable_key: 'martinez',

  name: {
    en: 'Martinez',
    it: 'Martinez',
    vi: 'Martinez',
    ko: '마르티네즈',
    ja: 'マルティネス',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'vintage', 'stirred'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Martinez is a classic gin-based cocktail that predates the Martini. Rich and complex, it combines Old Tom gin with sweet vermouth, maraschino liqueur, and orange bitters for a sophisticated, slightly sweet aperitivo.',
    it: 'Il Martinez è un classico cocktail a base di gin che precede il Martini. Ricco e complesso, combina Old Tom gin con vermouth dolce, liquore maraschino e orange bitters per un aperitivo sofisticato e leggermente dolce.',
    vi: 'Martinez là một cocktail cổ điển từ gin có trước Martini. Đậm đà và phức hợp, kết hợp Old Tom gin với vermouth ngọt, rượu maraschino và orange bitters tạo nên aperitivo tinh tế, hơi ngọt.',
  },

  history: {
    created_year: '1880s',
    origin: {
      city: 'San Francisco / Martinez',
      bar: 'Occidental Hotel / Martinez Saloon',
      country: 'United States',
    },
    creator: {
      name: 'Jerry Thomas / Richelieue',
      profession: 'bartender',
    },
    story: {
      en: "The Martinez's true origin is disputed. One story attributes it to legendary bartender Jerry Thomas at San Francisco's Occidental Hotel in the 1860s, created for a gold miner heading to Martinez, California. Another credits a bartender named Richelieue at a saloon in Martinez. First published in O.H. Byron's The Modern Bartender in 1884, the Martinez is widely recognized as the direct predecessor to the Martini.",
      it: "L'origine del Martinez è controversa. Una storia lo attribuisce al leggendario barman Jerry Thomas all'Occidental Hotel di San Francisco negli anni 1860, creato per un cercatore d'oro diretto a Martinez, California. Un'altra versione lo accredita a un barman di nome Richelieue in un saloon a Martinez. Pubblicato per la prima volta nel The Modern Bartender di O.H. Byron nel 1884, il Martinez è riconosciuto come il predecessore diretto del Martini.",
      vi: 'Nguồn gốc thực sự của Martinez còn tranh cãi. Một câu chuyện cho rằng nó được tạo ra bởi bartender huyền thoại Jerry Thomas tại Occidental Hotel San Francisco vào những năm 1860, làm cho một thợ mỏ vàng đi đến Martinez, California. Phiên bản khác ghi nhận bartender tên Richelieue tại quán rượu ở Martinez. Được xuất bản lần đầu trong The Modern Bartender của O.H. Byron năm 1884, Martinez được công nhận là tiền thân trực tiếp của Martini.',
    },
    named_after: {
      en: 'Named after the city of Martinez, California, the destination of a gold miner who requested the drink, or possibly the location where it was first created.',
      it: "Prende il nome dalla città di Martinez, California, destinazione di un cercatore d'oro che richiese il drink, o forse il luogo dove fu creato per la prima volta.",
      vi: 'Được đặt tên theo thành phố Martinez, California, điểm đến của một thợ mỏ vàng yêu cầu làm đồ uống này, hoặc có thể là nơi nó được tạo ra lần đầu.',
    },
  },

  taste: {
    profile: ['sweet', 'herbal', 'aromatic', 'complex'],
    description: {
      en: 'The Martinez offers a rich, complex flavor profile with botanical gin notes balanced by sweet vermouth. The maraschino liqueur adds subtle cherry sweetness and almond undertones, while orange bitters provide aromatic complexity. Smoother and sweeter than a modern Martini.',
      it: 'Il Martinez offre un profilo aromatico ricco e complesso con note botaniche del gin bilanciate dal vermouth dolce. Il liquore maraschino aggiunge una sottile dolcezza di ciliegia e note di mandorla, mentre gli orange bitters forniscono complessità aromatica. Più morbido e dolce di un Martini moderno.',
      vi: 'Martinez mang hương vị phong phú, phức hợp với các nét thực vật từ gin được cân bằng bởi vermouth ngọt. Rượu maraschino thêm vị ngọt cherry tinh tế và hương hạnh nhân, trong khi orange bitters tạo độ phức tạp thơm. Mượt mà và ngọt hơn Martini hiện đại.',
    },
    first_impression: {
      en: 'Rich botanical gin and sweet vermouth open with herbal complexity, immediately followed by hints of cherry and citrus.',
      it: 'Gin botanico ricco e vermouth dolce si aprono con complessità erbacee, immediatamente seguite da accenni di ciliegia e agrumi.',
      vi: 'Gin thực vật đậm đà và vermouth ngọt mở màn với độ phức hợp thảo mộc, ngay sau đó là hương cherry và cam quýt.',
    },
    finish: {
      en: 'Long, warming finish with lingering bitter orange and sweet maraschino notes. The botanical elements slowly fade, leaving pleasant herbal sweetness.',
      it: 'Finale lungo e avvolgente con note persistenti di arancia amara e maraschino dolce. Gli elementi botanici svaniscono lentamente, lasciando una piacevole dolcezza erbacea.',
      vi: 'Hậu vị dài, ấm áp với hương cam đắng và maraschino ngọt lingering. Các yếu tố thực vật từ từ phai nhạt, để lại vị ngọt thảo mộc dễ chịu.',
    },
    balance: {
      en: 'Beautifully balanced between sweet and bitter, with the Old Tom gin and sweet vermouth creating harmony while maraschino and orange bitters add depth without overwhelming.',
      it: 'Perfettamente bilanciato tra dolce e amaro, con Old Tom gin e vermouth dolce che creano armonia mentre maraschino e orange bitters aggiungono profondità senza sopraffare.',
      vi: 'Cân bằng tuyệt đẹp giữa ngọt và đắng, với Old Tom gin và vermouth ngọt tạo sự hài hòa trong khi maraschino và orange bitters thêm chiều sâu mà không áp đảo.',
    },
  },

  recommendations: {
    best_time: ['evening', 'pre-dinner'],
    occasions: ['aperitivo', 'date_night', 'special_occasion'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs excellently with aged cheeses, cured meats, smoked salmon, oysters, and light appetizers. The sweet-bitter balance complements rich, savory foods.',
      it: 'Si abbina perfettamente a formaggi stagionati, salumi, salmone affumicato, ostriche e antipasti leggeri. Il bilanciamento dolce-amaro complementa cibi ricchi e saporiti.',
      vi: 'Kết hợp tuyệt vời với phô mai lâu năm, thịt hun khói, cá hồi xông khói, hàu và các món khai vị nhẹ. Sự cân bằng ngọt-đắng bổ sung cho thực phẩm đậm đà, mặn.',
    },
    ideal_for: {
      en: 'Perfect for cocktail enthusiasts who appreciate classic recipes, those who enjoy complex gin cocktails, and anyone seeking a sophisticated alternative to the modern Martini.',
      it: "Perfetto per gli appassionati di cocktail che apprezzano le ricette classiche, coloro che amano i cocktail complessi a base di gin e chiunque cerchi un'alternativa sofisticata al Martini moderno.",
      vi: 'Hoàn hảo cho những người đam mê cocktail yêu thích công thức cổ điển, những ai thích cocktail gin phức hợp, và bất kỳ ai tìm kiếm phương án tinh tế thay thế Martini hiện đại.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN_OLD_TOM',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Old Tom Gin', it: 'Gin Old Tom', vi: 'Gin Old Tom' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Sweet Red Vermouth',
        it: 'Vermouth Rosso Dolce',
        vi: 'Vermouth Đỏ Ngọt',
      },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 1, unit: 'bar_spoon' },
      display_name: {
        en: 'Maraschino Luxardo',
        it: 'Maraschino Luxardo',
        vi: 'Maraschino Luxardo',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Orange Bitters', it: 'Orange Bitters', vi: 'Orange Bitters' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass with ice cubes. Stir well for about 30 seconds until properly chilled and diluted. Strain into a chilled cocktail glass. Express lemon zest over the drink and use as garnish.',
    it: 'Versare tutti gli ingredienti in un mixing glass con cubetti di ghiaccio. Mescolare bene per circa 30 secondi fino a quando è adeguatamente raffreddato e diluito. Filtrare in un bicchiere da cocktail ghiacciato. Spruzzare la scorza di limone sul drink e usarla come guarnizione.',
    vi: 'Đổ tất cả nguyên liệu vào cốc trộn với đá viên. Kấy đều khoảng 30 giây cho đến khi lạnh và pha loãng đúng mức. Lọc vào ly cocktail đã ướp lạnh. Vắt vỏ chanh lên đồ uống và dùng làm trang trí.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Lemon zest',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh',
  },

  ice: 'none',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN_OLD_TOM'],
  flavor_profile: ['boozy', 'sweet', 'herbal', 'aromatic'],
  abv_estimate: 28,
  calories_estimate: 185,
  difficulty: 'easy',
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
  season_tags: ['all_year'],
  occasion_tags: ['aperitivo', 'date_night', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff:
    'Use quality Old Tom gin for authentic sweetness. Stir gently to maintain clarity. The drink should be served ice-cold. If Old Tom gin is unavailable, London Dry gin with a small amount of simple syrup can be substituted, though the result will differ from the traditional recipe.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/martinez/',
    notes:
      'IBA Official Recipe. Historical information from The Modern Bartender (O.H. Byron, 1884) and cocktail historians.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
