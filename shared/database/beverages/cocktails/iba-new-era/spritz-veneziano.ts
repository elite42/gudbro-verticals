/**
 * IBA New Era Drinks: Spritz Veneziano
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const spritzVeneziano: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd6e7f8a9-0b1c-2d3e-4f5a-6b7c8d9e0f1a',
  slug: 'spritz-veneziano',
  stable_key: 'b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8',

  name: {
    en: 'Spritz Veneziano',
    it: 'Spritz Veneziano',
    vi: 'Spritz Veneziano',
    ko: '스프리츠 베네치아노',
    ja: 'スプリッツ・ヴェネツィアーノ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'italian', 'aperitivo', 'prosecco', 'bitter', 'iconic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The iconic Italian aperitivo cocktail combining Prosecco, Aperol, and soda water. This refreshing, low-ABV drink with its distinctive sunset-orange color has become a global phenomenon, embodying the Italian art of aperitivo hour and la dolce vita lifestyle.',
    it: "L'iconico cocktail aperitivo italiano che combina Prosecco, Aperol e acqua gassata. Questa bevanda rinfrescante a bassa gradazione con il suo distintivo colore arancione tramonto è diventata un fenomeno globale, incarnando l'arte italiana dell'ora dell'aperitivo e lo stile di vita la dolce vita.",
    vi: 'Cocktail aperitivo Ý biểu tượng kết hợp Prosecco, Aperol và nước soda. Đồ uống sảng khoái, độ cồn thấp này với màu cam hoàng hôn đặc trưng đã trở thành hiện tượng toàn cầu, thể hiện nghệ thuật aperitivo Ý và lối sống la dolce vita.',
  },

  history: {
    created_year: '1919',
    origin: {
      city: 'Venice',
      bar: 'Unknown',
      country: 'Italy',
    },
    creator: {
      name: 'Unknown',
      profession: 'unknown',
    },
    story: {
      en: 'The Spritz originated in Venice during the 19th century when the Austro-Hungarian Empire controlled the region. Austrian soldiers found Italian wine too strong and requested it be "spritzed" (sprayed) with water. The modern Aperol Spritz emerged after Aperol\'s creation in 1919 in Padua. While Spritzes were popular locally for decades, the Aperol Spritz exploded globally in the 2000s-2010s, becoming one of the world\'s most recognized cocktails. Its 3-2-1 ratio (3 parts Prosecco, 2 parts Aperol, 1 splash soda) became the standard serve.',
      it: "Lo Spritz ha origine a Venezia durante il XIX secolo quando l'Impero Austro-Ungarico controllava la regione. I soldati austriaci trovavano il vino italiano troppo forte e richiedevano che fosse \"spruzzato\" (sprayed) con acqua. Il moderno Aperol Spritz emerse dopo la creazione dell'Aperol nel 1919 a Padova. Mentre gli Spritz erano popolari localmente per decenni, l'Aperol Spritz esplose globalmente negli anni 2000-2010, diventando uno dei cocktail più riconosciuti al mondo. Il suo rapporto 3-2-1 (3 parti Prosecco, 2 parti Aperol, 1 splash soda) divenne il servizio standard.",
      vi: 'Spritz có nguồn gốc ở Venice trong thế kỷ 19 khi Đế quốc Áo-Hung kiểm soát khu vực. Binh lính Áo thấy rượu vang Ý quá mạnh và yêu cầu được "spritz" (phun) với nước. Aperol Spritz hiện đại xuất hiện sau khi Aperol được tạo ra năm 1919 ở Padua. Trong khi Spritz phổ biến ở địa phương trong nhiều thập kỷ, Aperol Spritz bùng nổ toàn cầu trong những năm 2000-2010, trở thành một trong những cocktail được công nhận nhất thế giới. Tỷ lệ 3-2-1 (3 phần Prosecco, 2 phần Aperol, 1 chút soda) trở thành tiêu chuẩn phục vụ.',
    },
    named_after: {
      en: '"Spritz" comes from the German word "spritzen" (to spray/spritz), referencing the original practice of diluting wine with water.',
      it: '"Spritz" deriva dalla parola tedesca "spritzen" (spruzzare), riferendosi alla pratica originale di diluire il vino con acqua.',
      vi: '"Spritz" đến từ từ tiếng Đức "spritzen" (phun/xịt), đề cập đến thực hành ban đầu pha loãng rượu vang với nước.',
    },
  },

  taste: {
    profile: ['bitter', 'bubbly', 'refreshing', 'light'],
    description: {
      en: "Light and refreshing with Aperol's signature bitter-orange flavor, Prosecco's fruity effervescence, and a gentle splash of soda. The bitterness is mild and approachable, balanced by sweet citrus notes and sparkling wine brightness. Incredibly sessionable and refreshing.",
      it: "Leggero e rinfrescante con il caratteristico sapore amaro-arancio dell'Aperol, l'effervescenza fruttata del Prosecco e un delicato splash di soda. L'amarezza è mite e accessibile, bilanciata da note dolci di agrumi e luminosità di vino spumante. Incredibilmente beverino e rinfrescante.",
      vi: 'Nhẹ nhàng và sảng khoái với hương vị cam đắng đặc trưng của Aperol, sự sủi bọt trái cây của Prosecco và một chút soda nhẹ nhàng. Vị đắng nhẹ và dễ tiếp cận, cân bằng bởi nốt cam chanh ngọt và độ tươi sáng rượu vang sủi bọt. Cực kỳ dễ uống và sảng khoái.',
    },
    first_impression: {
      en: 'Sparkling effervescence with gentle bitter-orange and citrus sweetness',
      it: 'Effervescenza frizzante con delicato amaro-arancio e dolcezza di agrumi',
      vi: 'Sủi bọt lấp lánh với cam đắng nhẹ nhàng và vị ngọt cam chanh',
    },
    finish: {
      en: 'Clean, refreshing finish with subtle bitter notes and citrus brightness',
      it: 'Finale pulito e rinfrescante con note amare sottili e luminosità di agrumi',
      vi: 'Kết thúc trong sạch, sảng khoái với nốt đắng tinh tế và độ tươi cam chanh',
    },
    balance: {
      en: 'Perfectly balanced between bitter, sweet, and bubbly - the quintessential aperitivo',
      it: 'Perfettamente bilanciato tra amaro, dolce e frizzante - il quintessenziale aperitivo',
      vi: 'Cân bằng hoàn hảo giữa đắng, ngọt và sủi bọt - aperitivo tinh túy',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening', 'aperitif'],
    occasions: ['aperitivo', 'social_gathering', 'casual', 'outdoor_dining', 'summer_party'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Perfect with Italian cicchetti, olives, salted nuts, prosciutto, bruschetta, light seafood, and cheese plates.',
      it: 'Perfetto con cicchetti italiani, olive, noci salate, prosciutto, bruschetta, frutti di mare leggeri e taglieri di formaggi.',
      vi: 'Hoàn hảo với cicchetti Ý, ô liu, hạt muối, prosciutto, bruschetta, hải sản nhẹ và đĩa phô mai.',
    },
    ideal_for: {
      en: 'Perfect for aperitivo hour and social drinking. Ideal for those seeking a light, refreshing, low-ABV option. Great for introducing people to Italian aperitivo culture and outdoor cafe life.',
      it: "Perfetto per l'ora dell'aperitivo e le bevute sociali. Ideale per chi cerca un'opzione leggera, rinfrescante e a bassa gradazione. Ottimo per introdurre le persone alla cultura dell'aperitivo italiano e alla vita nei caffè all'aperto.",
      vi: 'Hoàn hảo cho giờ aperitivo và uống giao lưu. Lý tưởng cho những ai tìm kiếm lựa chọn nhẹ nhàng, sảng khoái, độ cồn thấp. Tuyệt vời để giới thiệu mọi người với văn hóa aperitivo Ý và cuộc sống quán cà phê ngoài trời.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_PROSECCO',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Prosecco', it: 'Prosecco', vi: 'Prosecco' },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Aperol', it: 'Aperol', vi: 'Aperol' },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Soda water (splash)',
        it: 'Acqua gassata (splash)',
        vi: 'Nước soda (chút)',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a large wine glass or rocks glass with ice cubes. Add Aperol, then Prosecco. Top with a splash of soda water. Stir gently once to combine. Garnish with an orange slice.',
    it: "Riempire un grande bicchiere da vino o rocks con cubetti di ghiaccio. Aggiungere Aperol, poi Prosecco. Completare con uno splash di acqua gassata. Mescolare delicatamente una volta per combinare. Guarnire con una fetta d'arancia.",
    vi: 'Đổ đầy ly rượu vang lớn hoặc ly rocks với đá viên. Thêm Aperol, sau đó Prosecco. Thêm một chút nước soda lên trên. Khuấy nhẹ nhàng một lần để trộn đều. Trang trí với lát cam.',
  },

  glass: 'Large wine glass (or Rocks glass)',

  garnish: {
    en: 'Orange slice (half-wheel)',
    it: "Fetta d'arancia (mezza ruota)",
    vi: 'Lát cam (nửa vòng)',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_PROSECCO'],

  flavor_profile: ['bitter', 'bubbly', 'refreshing', 'light'],

  abv_estimate: 8,

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free', 'low-abv'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'casual', 'social', 'outdoor'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['campari-spritz', 'select-spritz', 'limoncello-spritz'],

  notes_for_staff:
    'Classic ratio is 3-2-1 (Prosecco-Aperol-Soda). Use large wine glass filled with ice. Aperol is essential - Campari makes a different drink (Negroni Sbagliato). Garnish with orange slice, not twist.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 100,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/spritz/',
    notes: 'IBA Official Recipe. Originated in Venice, popularized globally in 2000s-2010s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
