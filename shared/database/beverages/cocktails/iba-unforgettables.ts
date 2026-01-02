/**
 * GUDBRO Cocktail Database - IBA Unforgettables
 *
 * The Unforgettables: Classic cocktails recognized by the
 * International Bartenders Association (IBA).
 *
 * Source: https://iba-world.com/category/iba-cocktails/the-unforgettables/
 *
 * @version 1.0
 * @lastUpdated 2025-12-13
 */

import type { Cocktail } from '../types/cocktail';

// ============================================================================
// HELPER - Current timestamp
// ============================================================================

const NOW = '2025-12-13T12:00:00Z';

// ============================================================================
// COCKTAIL 1: ALEXANDER
// ============================================================================

export const alexander: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '133dd203-39eb-40b4-95c5-a665306e0bcc',
  slug: 'alexander',
  stable_key: '22e80616ae87d60827ded6f473074b5a9b991f35',

  name: {
    en: 'Alexander',
    it: 'Alexander',
    vi: 'Alexander',
    ko: '알렉산더',
    ja: 'アレキサンダー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'creamy', 'dessert', 'after-dinner'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A luxurious, creamy cocktail combining cognac with crème de cacao and fresh cream. Often called a "drinkable dessert," the Alexander is the perfect after-dinner indulgence with its rich chocolate and brandy notes.',
    it: 'Un cocktail lussuoso e cremoso che combina cognac con crème de cacao e panna fresca. Spesso chiamato "dessert da bere," l\'Alexander è la perfetta indulgenza dopo cena con le sue note ricche di cioccolato e brandy.',
    vi: 'Một loại cocktail sang trọng, béo ngậy kết hợp cognac với crème de cacao và kem tươi. Thường được gọi là "món tráng miệng uống được," Alexander là sự nuông chiều hoàn hảo sau bữa tối với hương vị chocolate và brandy đậm đà.',
  },

  history: {
    created_year: '1915',
    origin: {
      city: 'New York City',
      bar: "Rector's Restaurant",
      country: 'USA',
    },
    creator: {
      name: 'Troy Alexander',
      profession: 'bartender',
    },
    story: {
      en: 'The Alexander was created by bartender Troy Alexander at Rector\'s Restaurant in New York City around 1915. It was originally made with gin (not cognac) and was created to honor Phoebe Snow, an advertising character for the Delaware, Lackawanna and Western Railroad. The character wore white to demonstrate how clean the railroad\'s anthracite coal was. The white, creamy drink was meant to match her pristine image. The cognac version, sometimes called "Brandy Alexander," became the more popular variation over time.',
      it: 'L\'Alexander fu creato dal barman Troy Alexander al Rector\'s Restaurant di New York City intorno al 1915. Originariamente era fatto con gin (non cognac) e fu creato in onore di Phoebe Snow, un personaggio pubblicitario della Delaware, Lackawanna and Western Railroad. Il personaggio indossava il bianco per dimostrare quanto fosse pulito il carbone antracite della ferrovia. La bevanda bianca e cremosa doveva corrispondere alla sua immagine immacolata. La versione con cognac, a volte chiamata "Brandy Alexander," divenne la variante più popolare nel tempo.',
      vi: 'Alexander được tạo ra bởi bartender Troy Alexander tại Nhà hàng Rector\'s ở New York City vào khoảng năm 1915. Ban đầu nó được làm với gin (không phải cognac) và được tạo ra để vinh danh Phoebe Snow, một nhân vật quảng cáo cho Delaware, Lackawanna và Western Railroad. Nhân vật mặc đồ trắng để chứng minh than anthracite của đường sắt sạch như thế nào. Thức uống trắng, béo ngậy được tạo ra để phù hợp với hình ảnh tinh khiết của cô. Phiên bản cognac, đôi khi được gọi là "Brandy Alexander," trở thành biến thể phổ biến hơn theo thời gian.',
    },
    named_after: {
      en: 'Named after its creator, bartender Troy Alexander. Some believe it may also reference Tsar Alexander II of Russia, though this is unconfirmed.',
      it: 'Prende il nome dal suo creatore, il barman Troy Alexander. Alcuni credono che possa anche riferirsi allo Zar Alessandro II di Russia, anche se questo non è confermato.',
      vi: 'Được đặt theo tên người tạo ra nó, bartender Troy Alexander. Một số người tin rằng nó cũng có thể ám chỉ Nga hoàng Alexander II, mặc dù điều này chưa được xác nhận.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'boozy'],
    description: {
      en: 'Rich, velvety, and indulgent. The Alexander delivers a harmonious blend of chocolate sweetness from the crème de cacao, the warming depth of cognac, and the silky smoothness of fresh cream.',
      it: 'Ricco, vellutato e indulgente. L\'Alexander offre un\'armoniosa miscela di dolcezza al cioccolato dalla crème de cacao, la profondità calda del cognac e la morbidezza setosa della panna fresca.',
      vi: 'Đậm đà, mượt mà và nuông chiều. Alexander mang đến sự pha trộn hài hòa của vị ngọt chocolate từ crème de cacao, độ ấm sâu của cognac và sự mịn màng như lụa của kem tươi.',
    },
    first_impression: {
      en: 'Smooth chocolate and cream hit first, followed by the warm brandy backbone',
      it: 'Prima arrivano il cioccolato liscio e la panna, seguiti dalla struttura calda del brandy',
      vi: 'Chocolate mượt mà và kem đập vào đầu tiên, tiếp theo là xương sống brandy ấm áp',
    },
    finish: {
      en: 'Long, warming finish with lingering cocoa and nutmeg notes',
      it: 'Finale lungo e caldo con note persistenti di cacao e noce moscata',
      vi: 'Kết thúc dài, ấm áp với hương cacao và nhục đậu khấu kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between sweetness and spirit strength - neither too cloying nor too boozy',
      it: 'Perfettamente bilanciato tra dolcezza e forza alcolica - né troppo stucchevole né troppo alcolico',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt và độ mạnh của rượu - không quá ngọt gắt cũng không quá nồng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'date_night', 'celebration', 'nightcap'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with chocolate desserts, tiramisu, or as a standalone dessert replacement. Also pairs well with cheese plates and dark chocolate truffles.',
      it: 'Eccellente con dessert al cioccolato, tiramisù, o come sostituto del dessert. Si abbina bene anche con taglieri di formaggi e tartufi al cioccolato fondente.',
      vi: 'Tuyệt vời với các món tráng miệng chocolate, tiramisu, hoặc thay thế món tráng miệng. Cũng kết hợp tốt với đĩa phô mai và truffle chocolate đen.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy dessert cocktails and creamy drinks. A great choice for brandy lovers who want something indulgent, or for anyone looking for a sophisticated after-dinner drink.',
      it: 'Perfetto per chi ama i cocktail da dessert e le bevande cremose. Un\'ottima scelta per gli amanti del brandy che vogliono qualcosa di indulgente, o per chiunque cerchi una bevanda sofisticata dopo cena.',
      vi: 'Hoàn hảo cho những ai thích cocktail tráng miệng và đồ uống béo ngậy. Lựa chọn tuyệt vời cho người yêu brandy muốn thứ gì đó nuông chiều, hoặc cho bất kỳ ai tìm kiếm thức uống tinh tế sau bữa tối.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_CREME_DE_CACAO_DARK',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Crème de Cacao (brown)',
        it: 'Crème de Cacao (scura)',
        vi: 'Crème de Cacao (nâu)',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh cream', it: 'Panna fresca', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled cocktail glass. Sprinkle fresh grated nutmeg on top.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa da cocktail raffreddata. Spolverare con noce moscata appena grattugiata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã được làm lạnh. Rắc nhục đậu khấu mới xay lên trên.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Freshly grated nutmeg',
    it: 'Noce moscata appena grattugiata',
    vi: 'Nhục đậu khấu mới xay',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC'],

  flavor_profile: ['creamy', 'sweet', 'boozy'],

  abv_estimate: 18, // ~18% ABV after dilution

  calories_estimate: 280, // Cream + liqueur + cognac

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
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'date_night', 'celebration', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['brandy-alexander', 'coffee-alexander', 'alexander-sister'],

  notes_for_staff: 'Use freshly grated nutmeg, not pre-ground. Shake hard to properly emulsify the cream. Can substitute with Brandy if Cognac unavailable. Original recipe used gin - offer as variation for curious guests.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/alexander/',
    note: 'IBA Official Recipe. Historical information from David Wondrich and various cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// COCKTAIL 2: AMERICANO
// ============================================================================

export const americano: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e88e0064-517e-4adf-82ad-1b0193cd8c44',
  slug: 'americano',
  stable_key: 'americano-iba-unforgettable',

  name: {
    en: 'Americano',
    it: 'Americano',
    vi: 'Americano',
    ko: '아메리카노',
    ja: 'アメリカーノ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'aperitivo', 'bitter', 'low-abv', 'italian'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The original Italian aperitivo cocktail - a refreshing, bittersweet blend of Campari and sweet vermouth, lengthened with soda water. Light, effervescent, and perfect before dinner.',
    it: 'L\'originale cocktail aperitivo italiano - una miscela rinfrescante e agrodolce di Campari e vermouth rosso, allungata con acqua frizzante. Leggero, effervescente e perfetto prima di cena.',
    vi: 'Cocktail khai vị Ý nguyên bản - sự pha trộn tươi mát, đắng ngọt của Campari và vermouth ngọt, pha thêm soda. Nhẹ nhàng, sủi bọt và hoàn hảo trước bữa tối.',
  },

  history: {
    created_year: '1860s',
    origin: {
      city: 'Milan',
      bar: "Gaspare Campari's bar",
      country: 'Italy',
    },
    creator: {
      name: 'Gaspare Campari',
      profession: 'bar owner, inventor of Campari',
    },
    story: {
      en: 'The Americano originated in the 1860s at Gaspare Campari\'s bar in Milan, making it one of the oldest cocktails in Italian history. Originally called "Milano-Torino" (Mi-To) after the origins of its two main ingredients - Campari from Milan and sweet vermouth from Turin - it was renamed "Americano" in the early 1900s when American tourists flocked to Italy and developed a taste for the drink. It became even more famous as the first drink ordered by James Bond in the 1953 novel "Casino Royale." The Americano is also the direct ancestor of the Negroni - created when Count Camillo Negroni asked for his Americano with gin instead of soda.',
      it: 'L\'Americano nacque negli anni 1860 al bar di Gaspare Campari a Milano, rendendolo uno dei cocktail più antichi della storia italiana. Originariamente chiamato "Milano-Torino" (Mi-To) dalle origini dei suoi due ingredienti principali - Campari da Milano e vermouth rosso da Torino - fu rinominato "Americano" nei primi anni del 1900 quando i turisti americani arrivarono in Italia e svilupparono un gusto per questa bevanda. Divenne ancora più famoso come primo drink ordinato da James Bond nel romanzo "Casino Royale" del 1953. L\'Americano è anche il diretto antenato del Negroni - creato quando il Conte Camillo Negroni chiese il suo Americano con gin invece del soda.',
      vi: 'Americano có nguồn gốc từ những năm 1860 tại quán bar của Gaspare Campari ở Milan, khiến nó trở thành một trong những cocktail lâu đời nhất trong lịch sử Ý. Ban đầu được gọi là "Milano-Torino" (Mi-To) theo nguồn gốc của hai nguyên liệu chính - Campari từ Milan và vermouth ngọt từ Turin - nó được đổi tên thành "Americano" vào đầu những năm 1900 khi khách du lịch Mỹ đổ xô đến Ý và phát triển khẩu vị cho thức uống này. Nó còn nổi tiếng hơn khi là thức uống đầu tiên James Bond gọi trong tiểu thuyết "Casino Royale" năm 1953. Americano cũng là tổ tiên trực tiếp của Negroni - được tạo ra khi Bá tước Camillo Negroni yêu cầu Americano của mình với gin thay vì soda.',
    },
    named_after: {
      en: 'Renamed from "Milano-Torino" to "Americano" due to its popularity among American tourists visiting Italy in the early 20th century. Some also attribute the name to the Italian word "americanizzato" (Americanized).',
      it: 'Rinominato da "Milano-Torino" ad "Americano" per la sua popolarità tra i turisti americani che visitavano l\'Italia nei primi del Novecento. Alcuni attribuiscono anche il nome alla parola italiana "americanizzato".',
      vi: 'Được đổi tên từ "Milano-Torino" thành "Americano" do sự phổ biến của nó trong số khách du lịch Mỹ đến thăm Ý vào đầu thế kỷ 20. Một số người cũng cho rằng tên này xuất phát từ từ tiếng Ý "americanizzato" (Mỹ hóa).',
    },
  },

  taste: {
    profile: ['bitter', 'sweet', 'herbal', 'refreshing'],
    description: {
      en: 'Pleasantly bitter with herbal sweetness. The Campari brings its signature bitter-orange complexity while the sweet vermouth adds depth with vanilla and spice notes. The soda water lifts everything, making it light and effervescent.',
      it: 'Piacevolmente amaro con dolcezza erbacea. Il Campari porta la sua caratteristica complessità amaro-arancio mentre il vermouth rosso aggiunge profondità con note di vaniglia e spezie. L\'acqua frizzante alleggerisce tutto, rendendolo leggero ed effervescente.',
      vi: 'Đắng dễ chịu với vị ngọt thảo mộc. Campari mang đến sự phức tạp đặc trưng đắng-cam trong khi vermouth ngọt thêm chiều sâu với hương vanilla và gia vị. Soda nâng mọi thứ lên, làm cho nó nhẹ nhàng và sủi bọt.',
    },
    first_impression: {
      en: 'Bright, bitter citrus hit balanced by sweet herbal notes',
      it: 'Un impatto luminoso di agrumi amari bilanciato da note erbacee dolci',
      vi: 'Vị cam đắng tươi sáng cân bằng với hương thảo mộc ngọt',
    },
    finish: {
      en: 'Clean, bitter finish with lingering herbal complexity',
      it: 'Finale pulito e amaro con complessità erbacea persistente',
      vi: 'Kết thúc sạch, đắng với hương thảo mộc phức tạp kéo dài',
    },
    balance: {
      en: 'Equal parts bitter and sweet, with bubbles providing lightness',
      it: 'Parti uguali di amaro e dolce, con le bollicine che donano leggerezza',
      vi: 'Phần bằng nhau giữa đắng và ngọt, với bọt khí tạo sự nhẹ nhàng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['aperitivo', 'casual'],
    seasons: ['spring', 'summer', 'all_year'],
    food_pairings: {
      en: 'Perfect aperitivo companion with olives, cured meats, bruschetta, and light antipasti. The bitterness stimulates the appetite before any meal.',
      it: 'Perfetto compagno per l\'aperitivo con olive, salumi, bruschetta e antipasti leggeri. L\'amarezza stimola l\'appetito prima di qualsiasi pasto.',
      vi: 'Người bạn khai vị hoàn hảo với ô liu, thịt nguội, bruschetta và antipasti nhẹ. Vị đắng kích thích sự thèm ăn trước bữa ăn.',
    },
    ideal_for: {
      en: 'Those who enjoy bitter flavors but want something lighter than a Negroni. Perfect for hot weather or as a gentle introduction to Italian aperitivo culture. Excellent choice for anyone seeking a lower-alcohol option.',
      it: 'Chi apprezza i sapori amari ma vuole qualcosa di più leggero di un Negroni. Perfetto per il clima caldo o come gentile introduzione alla cultura dell\'aperitivo italiano. Ottima scelta per chi cerca un\'opzione a bassa gradazione.',
      vi: 'Những ai thích hương vị đắng nhưng muốn thứ gì đó nhẹ hơn Negroni. Hoàn hảo cho thời tiết nóng hoặc như sự giới thiệu nhẹ nhàng về văn hóa aperitivo Ý. Lựa chọn tuyệt vời cho những ai tìm kiếm lựa chọn ít cồn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Sweet Vermouth (Red)',
        it: 'Vermouth Rosso',
        vi: 'Vermouth Ngọt (Đỏ)',
      },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 0, unit: 'ml' }, // "A splash"
      optional: false,
      notes: {
        en: 'A splash to top',
        it: 'Uno spruzzo per completare',
        vi: 'Một chút để hoàn thành',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Mix the Campari and sweet vermouth directly in an old fashioned glass filled with ice cubes. Add a splash of soda water. Stir gently to combine. Garnish with half an orange slice and a lemon twist.',
    it: 'Mescolare il Campari e il vermouth rosso direttamente in un bicchiere old fashioned pieno di cubetti di ghiaccio. Aggiungere uno spruzzo di acqua frizzante. Mescolare delicatamente. Guarnire con mezza fetta d\'arancia e una twist di limone.',
    vi: 'Trộn Campari và vermouth ngọt trực tiếp trong ly old fashioned đầy đá viên. Thêm một chút soda. Khuấy nhẹ để hòa quyện. Trang trí với nửa lát cam và vỏ chanh vắt.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'Half orange slice and lemon twist',
    it: 'Mezza fetta d\'arancia e twist di limone',
    vi: 'Nửa lát cam và vỏ chanh vắt',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: [], // No base spirit - this is a low-ABV cocktail

  flavor_profile: ['bitter', 'herbal', 'refreshing', 'citrus'],

  abv_estimate: 11, // ~11% ABV (low-alcohol cocktail)

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['aperitivo', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['negroni', 'negroni-sbagliato', 'americano-perfetto'],

  notes_for_staff: 'Keep it simple - the beauty is in the simplicity. Use good quality Campari and vermouth. Soda should be fresh with good carbonation. The Negroni is this drink with gin instead of soda - offer as an upgrade for those seeking something stronger.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/americano/',
    note: 'IBA Official Recipe. Historical information from various cocktail history sources and Italian aperitivo tradition.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// COCKTAIL 3: ANGEL FACE
// ============================================================================

export const angelFace: Cocktail = {
  id: '2246e1f9-5cb3-4613-9580-ffaeb53069ab',
  slug: 'angel-face',
  stable_key: 'd000a774765e8b94bb4687d77620ca8a6ea95d21',

  name: {
    en: 'Angel Face',
    it: 'Angel Face',
    vi: 'Angel Face',
    ko: '엔젤 페이스',
    ja: 'エンジェルフェイス',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'fruity', 'strong', 'prohibition-era'],

  description: {
    en: 'An elegant Prohibition-era cocktail combining gin with apple brandy and apricot liqueur. Deceptively smooth and dangerously potent, the Angel Face earned its name for its innocent appearance that masks a powerful punch.',
    it: 'Un elegante cocktail dell\'era del Proibizionismo che combina gin con brandy di mele e liquore all\'albicocca. Ingannevolmente morbido e pericolosamente potente, l\'Angel Face ha guadagnato il suo nome per il suo aspetto innocente che maschera una potenza notevole.',
    vi: 'Một cocktail thanh lịch thời Cấm rượu kết hợp gin với brandy táo và rượu mùi mơ. Mượt mà đánh lừa và nguy hiểm mạnh mẽ, Angel Face có được tên vì vẻ ngoài vô tội che giấu sức mạnh đáng kể.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Paris or London',
      country: 'France/UK',
    },
    story: {
      en: 'The Angel Face emerged during the Prohibition era and first appeared in the 1930 Savoy Cocktail Book compiled by Harry Craddock at London\'s Savoy Hotel. Its name is a playful warning: despite its smooth, fruity taste and angelic appearance, this cocktail is deceptively strong with no non-alcoholic ingredients to dilute its potency. The equal-parts formula makes it easy to remember but dangerous to underestimate.',
      it: 'L\'Angel Face emerse durante l\'era del Proibizionismo e apparve per la prima volta nel Savoy Cocktail Book del 1930 compilato da Harry Craddock al Savoy Hotel di Londra. Il suo nome è un avvertimento giocoso: nonostante il suo gusto morbido e fruttato e l\'aspetto angelico, questo cocktail è ingannevolmente forte senza ingredienti analcolici a diluire la sua potenza. La formula in parti uguali lo rende facile da ricordare ma pericoloso da sottovalutare.',
      vi: 'Angel Face xuất hiện trong thời kỳ Cấm rượu và lần đầu tiên xuất hiện trong Savoy Cocktail Book năm 1930 được biên soạn bởi Harry Craddock tại Khách sạn Savoy London. Tên của nó là một lời cảnh báo vui vẻ: mặc dù có vị trái cây mượt mà và vẻ ngoài thiên thần, cocktail này mạnh đáng kinh ngạc không có thành phần không cồn để pha loãng độ mạnh của nó.',
    },
    named_after: {
      en: 'Named for its deceptively innocent, smooth taste that belies its high alcohol content - a true "wolf in sheep\'s clothing" cocktail.',
      it: 'Prende il nome dal suo gusto ingannevolmente innocente e morbido che smentisce il suo alto contenuto alcolico - un vero cocktail "lupo travestito da agnello".',
      vi: 'Được đặt tên theo vị ngọt ngào vô tội đánh lừa che giấu hàm lượng cồn cao - một cocktail "sói đội lốt cừu" thực sự.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'boozy', 'dry'],
    description: {
      en: 'Fruity and deceptively smooth. The apricot brandy provides stone fruit sweetness while the Calvados adds apple complexity and the gin brings botanical dryness. Together they create a harmonious but potent sipper.',
      it: 'Fruttato e ingannevolmente morbido. Il brandy all\'albicocca fornisce dolcezza di frutta a nocciolo mentre il Calvados aggiunge complessità di mela e il gin porta secchezza botanica. Insieme creano un sorso armonioso ma potente.',
      vi: 'Trái cây và mượt mà đánh lừa. Brandy mơ cung cấp vị ngọt trái cây hạt trong khi Calvados thêm sự phức tạp của táo và gin mang đến vị khô thực vật. Cùng nhau tạo ra một ngụm hài hòa nhưng mạnh mẽ.',
    },
    first_impression: {
      en: 'Sweet apricot and apple notes greet the palate',
      it: 'Note dolci di albicocca e mela accolgono il palato',
      vi: 'Hương mơ và táo ngọt chào đón vị giác',
    },
    finish: {
      en: 'Long, warming finish with lingering fruit and spirit',
      it: 'Finale lungo e caldo con frutta e spirito persistenti',
      vi: 'Kết thúc dài, ấm áp với trái cây và rượu kéo dài',
    },
    balance: {
      en: 'Three equal parts create perfect harmony between fruit sweetness and botanical dryness',
      it: 'Tre parti uguali creano perfetta armonia tra dolcezza fruttata e secchezza botanica',
      vi: 'Ba phần bằng nhau tạo ra sự hài hòa hoàn hảo giữa vị ngọt trái cây và vị khô thực vật',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'date_night', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with fruit-based desserts, apple tarts, or as a digestif after a rich meal. The apple and apricot notes complement cheese plates.',
      it: 'Si abbina bene con dessert a base di frutta, crostate di mele, o come digestivo dopo un pasto ricco. Le note di mela e albicocca completano i taglieri di formaggi.',
      vi: 'Kết hợp tốt với các món tráng miệng trái cây, bánh táo, hoặc như digestif sau bữa ăn thịnh soạn. Hương táo và mơ bổ sung cho đĩa phô mai.',
    },
    ideal_for: {
      en: 'Gin lovers seeking something different, fans of fruit-forward cocktails who enjoy a strong drink. Not for lightweights - this is a serious cocktail despite its innocent name.',
      it: 'Amanti del gin che cercano qualcosa di diverso, fan di cocktail fruttati che apprezzano un drink forte. Non per deboli - questo è un cocktail serio nonostante il suo nome innocente.',
      vi: 'Những người yêu gin tìm kiếm điều gì đó khác biệt, người hâm mộ cocktail trái cây thích đồ uống mạnh. Không dành cho người yếu - đây là cocktail nghiêm túc mặc dù tên vô tội.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_APRICOT_BRANDY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Apricot Brandy', it: 'Brandy all\'Albicocca', vi: 'Brandy Mơ' },
    },
    {
      ingredient_id: 'ING_CALVADOS',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Calvados', it: 'Calvados', vi: 'Calvados' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice cubes. Shake well until properly chilled. Strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'None (traditionally served without garnish)',
    it: 'Nessuna (tradizionalmente servito senza guarnizione)',
    vi: 'Không có (truyền thống phục vụ không trang trí)',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_GIN_LONDON_DRY', 'ING_CALVADOS'],
  flavor_profile: ['fruity', 'sweet', 'boozy', 'dry'],
  abv_estimate: 30,
  calories_estimate: 220,
  difficulty: 'easy',
  prep_time_seconds: 45,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  variants: [],

  notes_for_staff: 'Warn guests this is a strong cocktail (100% alcohol, no mixers). The equal parts ratio makes it easy to scale. Use quality Calvados for best results.',

  price_tier: 'mid',
  popularity: 45,

  source: {
    primary: 'https://iba-world.com/angel-face/',
    note: 'IBA Official Recipe. First published in Savoy Cocktail Book 1930.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// COCKTAIL 4: AVIATION
// ============================================================================

export const aviation: Cocktail = {
  id: '01563d2f-07b9-4049-aa29-d63c854f831a',
  slug: 'aviation',
  stable_key: '6b7736cd1ee920f1f015a5b03d90364f7442efba',

  name: {
    en: 'Aviation',
    it: 'Aviation',
    vi: 'Aviation',
    ko: '에비에이션',
    ja: 'アビエーション',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'floral', 'pre-prohibition', 'elegant'],

  description: {
    en: 'A stunning pre-Prohibition classic with a distinctive pale sky-blue color from crème de violette. The Aviation captures the wonder and romance of early flight with its ethereal appearance and delicate floral-citrus balance.',
    it: 'Un splendido classico pre-Proibizionismo con un distintivo colore celeste pallido dalla crème de violette. L\'Aviation cattura la meraviglia e il romanticismo dei primi voli con il suo aspetto etereo e il delicato equilibrio floreale-agrumato.',
    vi: 'Một tác phẩm kinh điển tiền-Cấm rượu tuyệt đẹp với màu xanh nhạt đặc trưng từ crème de violette. Aviation gợi lên sự kỳ diệu và lãng mạn của những chuyến bay đầu tiên với vẻ ngoài thanh tao và sự cân bằng hoa-cam quýt tinh tế.',
  },

  history: {
    created_year: 1916,
    origin: {
      city: 'New York City',
      bar: 'Hotel Wallick',
      country: 'USA',
    },
    creator: {
      name: 'Hugo Ensslin',
      profession: 'head bartender',
    },
    story: {
      en: 'The Aviation was created by Hugo Ensslin, head bartender at the Hotel Wallick in New York City, and published in his 1916 book "Recipes for Mixed Drinks." The cocktail was named to honor the pioneers of aviation during the exciting early days of flight. The crème de violette gives it a pale blue color reminiscent of the sky. When Harry Craddock included it in the Savoy Cocktail Book (1930), he omitted the crème de violette, and for decades the "colorless" version became standard. The original violet-tinted recipe was rediscovered in the craft cocktail renaissance of the 2000s.',
      it: 'L\'Aviation fu creato da Hugo Ensslin, capo barman all\'Hotel Wallick di New York City, e pubblicato nel suo libro del 1916 "Recipes for Mixed Drinks." Il cocktail fu nominato per onorare i pionieri dell\'aviazione durante gli emozionanti primi giorni del volo. La crème de violette gli conferisce un colore celeste pallido che ricorda il cielo. Quando Harry Craddock lo incluse nel Savoy Cocktail Book (1930), omise la crème de violette, e per decenni la versione "incolore" divenne standard. La ricetta originale con tonalità viola fu riscoperta nel rinascimento dei cocktail artigianali degli anni 2000.',
      vi: 'Aviation được tạo ra bởi Hugo Ensslin, trưởng bartender tại Hotel Wallick ở New York City, và được xuất bản trong cuốn sách năm 1916 "Recipes for Mixed Drinks." Cocktail được đặt tên để tôn vinh những người tiên phong hàng không trong những ngày đầu thú vị của ngành bay. Crème de violette tạo cho nó màu xanh nhạt gợi nhớ đến bầu trời. Khi Harry Craddock đưa nó vào Savoy Cocktail Book (1930), ông đã bỏ qua crème de violette, và trong nhiều thập kỷ phiên bản "không màu" trở thành tiêu chuẩn. Công thức gốc màu tím được tái khám phá trong thời kỳ phục hưng cocktail thủ công những năm 2000.',
    },
    named_after: {
      en: 'Named to honor early aviation pioneers. The pale blue color from crème de violette represents the sky, making it a tribute to the romance of flight.',
      it: 'Nominato per onorare i primi pionieri dell\'aviazione. Il colore celeste pallido dalla crème de violette rappresenta il cielo, rendendolo un tributo al romanticismo del volo.',
      vi: 'Được đặt tên để tôn vinh những người tiên phong hàng không đầu tiên. Màu xanh nhạt từ crème de violette đại diện cho bầu trời, biến nó thành lời tri ân cho sự lãng mạn của bay.',
    },
  },

  taste: {
    profile: ['floral', 'citrus', 'dry', 'herbal'],
    description: {
      en: 'Delicate and sophisticated. The gin provides the juniper backbone while maraschino adds subtle cherry-almond complexity. The lemon brings bright acidity and the crème de violette contributes ethereal floral notes without overwhelming.',
      it: 'Delicato e sofisticato. Il gin fornisce la struttura di ginepro mentre il maraschino aggiunge sottile complessità di ciliegia-mandorla. Il limone porta acidità brillante e la crème de violette contribuisce note floreali eteree senza sopraffare.',
      vi: 'Tinh tế và thanh lịch. Gin cung cấp xương sống bách xù trong khi maraschino thêm sự phức tạp cherry-hạnh nhân tinh tế. Chanh mang đến độ chua tươi sáng và crème de violette đóng góp hương hoa thanh tao mà không áp đảo.',
    },
    first_impression: {
      en: 'Bright lemon and subtle violet florals',
      it: 'Limone brillante e sottili note floreali di violetta',
      vi: 'Chanh tươi sáng và hương hoa violet tinh tế',
    },
    finish: {
      en: 'Clean, dry finish with lingering floral elegance',
      it: 'Finale pulito e secco con eleganza floreale persistente',
      vi: 'Kết thúc sạch, khô với sự thanh lịch hoa kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between citrus brightness, floral delicacy, and gin\'s botanical complexity',
      it: 'Perfettamente bilanciato tra luminosità agrumata, delicatezza floreale e complessità botanica del gin',
      vi: 'Cân bằng hoàn hảo giữa độ sáng cam quýt, sự tinh tế hoa và sự phức tạp thực vật của gin',
    },
  },

  recommendations: {
    best_time: ['evening'],
    occasions: ['date_night', 'celebration', 'aperitivo'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent aperitif before seafood or light fare. The floral notes complement dishes with herbs like lavender or thyme. Pairs beautifully with oysters or light canapés.',
      it: 'Eccellente aperitivo prima di pesce o piatti leggeri. Le note floreali completano piatti con erbe come lavanda o timo. Si abbina magnificamente con ostriche o canapé leggeri.',
      vi: 'Khai vị tuyệt vời trước hải sản hoặc món ăn nhẹ. Hương hoa bổ sung cho các món với thảo mộc như oải hương hoặc húng tây. Kết hợp tuyệt vời với hàu hoặc canapé nhẹ.',
    },
    ideal_for: {
      en: 'Cocktail connoisseurs who appreciate subtle flavors and historical drinks. Perfect for gin lovers seeking something elegant and unusual. A must-try for anyone interested in craft cocktail history.',
      it: 'Intenditori di cocktail che apprezzano sapori sottili e drink storici. Perfetto per amanti del gin che cercano qualcosa di elegante e insolito. Da provare per chiunque sia interessato alla storia dei cocktail artigianali.',
      vi: 'Người sành cocktail đánh giá cao hương vị tinh tế và đồ uống lịch sử. Hoàn hảo cho người yêu gin tìm kiếm điều gì đó thanh lịch và khác thường. Phải thử cho bất kỳ ai quan tâm đến lịch sử cocktail thủ công.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Maraschino Luxardo', it: 'Maraschino Luxardo', vi: 'Maraschino Luxardo' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh Lemon Juice', it: 'Succo di Limone Fresco', vi: 'Nước Chanh Tươi' },
    },
    {
      ingredient_id: 'ING_CREME_DE_VIOLETTE',
      quantity: { amount: 5, unit: 'ml' }, // 1 bar spoon ≈ 5ml
      display_name: { en: 'Crème de Violette', it: 'Crème de Violette', vi: 'Crème de Violette' },
      notes: { en: '1 bar spoon', it: '1 cucchiaio da bar', vi: '1 thìa bar' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients into a cocktail shaker. Shake with cracked ice until well chilled. Strain into a chilled cocktail glass. Optionally garnish with a maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker. Shakerare con ghiaccio rotto fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire opzionalmente con una ciliegia al maraschino.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail. Lắc với đá nghiền cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh. Tùy chọn trang trí với cherry maraschino.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Optional maraschino cherry',
    it: 'Ciliegia al maraschino opzionale',
    vi: 'Cherry maraschino tùy chọn',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['floral', 'citrus', 'dry', 'herbal'],
  abv_estimate: 24,
  calories_estimate: 165,
  difficulty: 'easy',
  prep_time_seconds: 45,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['date_night', 'celebration', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  variants: ['aviation-without-violette'],

  notes_for_staff: 'The crème de violette is essential for the authentic sky-blue color - don\'t skip it. Use Luxardo maraschino, not cheap imitations. Use sparingly - too much violette makes it taste like perfume. A tiny amount goes a long way.',

  price_tier: 'mid',
  popularity: 72,

  source: {
    primary: 'https://iba-world.com/aviation/',
    note: 'IBA Official Recipe. Originally from Hugo Ensslin\'s 1916 "Recipes for Mixed Drinks."',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// COCKTAIL 5: BETWEEN THE SHEETS
// ============================================================================

export const betweenTheSheets: Cocktail = {
  id: 'efac4178-caa9-4510-8d17-12086e06c8c4',
  slug: 'between-the-sheets',
  stable_key: 'between-the-sheets-iba-unforgettable',

  name: {
    en: 'Between the Sheets',
    it: 'Between the Sheets',
    vi: 'Between the Sheets',
    ko: '비트윈 더 시트',
    ja: 'ビトウィーン・ザ・シーツ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'strong', 'prohibition-era', 'citrus', 'sidecar-variation'],

  description: {
    en: 'A potent Prohibition-era cocktail that\'s essentially a Sidecar with rum added. The suggestive name and smooth, citrusy taste made it a favorite during the roaring twenties. Three spirits unite with orange and lemon for a sophisticated, dangerously drinkable classic.',
    it: 'Un potente cocktail dell\'era del Proibizionismo che è essenzialmente un Sidecar con l\'aggiunta di rum. Il nome suggestivo e il gusto morbido e agrumato lo resero un favorito durante i ruggenti anni \'20. Tre distillati si uniscono con arancia e limone per un classico sofisticato e pericolosamente bevibile.',
    vi: 'Một cocktail mạnh mẽ thời Cấm rượu về cơ bản là Sidecar với rum thêm vào. Cái tên gợi cảm và hương vị cam quýt mượt mà khiến nó trở thành món yêu thích trong những năm 1920 cuồng nhiệt. Ba loại rượu kết hợp với cam và chanh tạo nên một tác phẩm kinh điển tinh tế, nguy hiểm dễ uống.',
  },

  history: {
    created_year: '1920s',
    origin: {
      city: 'Paris',
      bar: 'Harry\'s New York Bar',
      country: 'France',
    },
    creator: {
      name: 'Harry MacElhone',
      profession: 'bartender',
    },
    story: {
      en: 'Between the Sheets was created at Harry\'s New York Bar in Paris during the 1920s Prohibition era, when Americans flocked to Europe to drink legally. The cocktail is essentially a variation of the Sidecar (also born at Harry\'s Bar) with white rum added to the mix. The provocative name was typical of the era\'s playful attitude toward drinking. Some attribute it to a French bartender who created it as a "nightcap" - hence the bedroom reference.',
      it: 'Between the Sheets fu creato all\'Harry\'s New York Bar di Parigi durante l\'era del Proibizionismo degli anni \'20, quando gli americani affluivano in Europa per bere legalmente. Il cocktail è essenzialmente una variazione del Sidecar (anch\'esso nato all\'Harry\'s Bar) con l\'aggiunta di rum bianco. Il nome provocante era tipico dell\'atteggiamento giocoso dell\'epoca verso il bere. Alcuni lo attribuiscono a un barman francese che lo creò come "nightcap" - da qui il riferimento alla camera da letto.',
      vi: 'Between the Sheets được tạo ra tại Harry\'s New York Bar ở Paris trong thời kỳ Cấm rượu những năm 1920, khi người Mỹ đổ xô đến châu Âu để uống hợp pháp. Cocktail về cơ bản là một biến thể của Sidecar (cũng sinh ra tại Harry\'s Bar) với rum trắng thêm vào. Cái tên khiêu khích là điển hình của thái độ vui vẻ của thời đại đối với việc uống rượu. Một số người cho rằng nó được tạo ra bởi một bartender Pháp như một "nightcap" - do đó có ám chỉ phòng ngủ.',
    },
    named_after: {
      en: 'The suggestive name references bedsheets, playing on the cocktail\'s reputation as a seductive nightcap. The smooth taste makes it dangerously easy to have "one more."',
      it: 'Il nome suggestivo fa riferimento alle lenzuola, giocando sulla reputazione del cocktail come seduttivo drink della buonanotte. Il gusto morbido lo rende pericolosamente facile averne "ancora uno."',
      vi: 'Cái tên gợi cảm ám chỉ ga trải giường, chơi đùa với danh tiếng của cocktail như một nightcap quyến rũ. Vị mượt mà khiến nó nguy hiểm dễ dàng để có "thêm một ly nữa."',
    },
  },

  taste: {
    profile: ['citrus', 'boozy', 'dry', 'fruity'],
    description: {
      en: 'Bright and citrus-forward with serious spirit backbone. The cognac brings depth and warmth, the rum adds smoothness and subtle sweetness, while the triple sec and lemon provide bright, zesty freshness. Deceptively smooth for its strength.',
      it: 'Luminoso e agrumato in primo piano con seria struttura alcolica. Il cognac porta profondità e calore, il rum aggiunge morbidezza e sottile dolcezza, mentre il triple sec e il limone forniscono freschezza brillante e vivace. Ingannevolmente morbido per la sua forza.',
      vi: 'Tươi sáng và cam quýt nổi bật với xương sống rượu mạnh. Cognac mang đến chiều sâu và sự ấm áp, rum thêm sự mượt mà và ngọt ngào tinh tế, trong khi triple sec và chanh cung cấp sự tươi mát rực rỡ. Mượt mà đánh lừa với sức mạnh của nó.',
    },
    first_impression: {
      en: 'Bright citrus burst with warming spirit notes',
      it: 'Esplosione di agrumi luminosi con note alcoliche calde',
      vi: 'Bùng nổ cam quýt tươi sáng với hương rượu ấm áp',
    },
    finish: {
      en: 'Long, warming finish with orange and brandy lingering',
      it: 'Finale lungo e caldo con arancia e brandy persistenti',
      vi: 'Kết thúc dài, ấm áp với cam và brandy kéo dài',
    },
    balance: {
      en: 'Equal parts spirits create complexity while citrus keeps it fresh and drinkable',
      it: 'Parti uguali di distillati creano complessità mentre gli agrumi lo mantengono fresco e bevibile',
      vi: 'Các phần rượu bằng nhau tạo ra sự phức tạp trong khi cam quýt giữ cho nó tươi mát và dễ uống',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['date_night', 'nightcap', 'party'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Best enjoyed as an after-dinner drink or nightcap. If pairing with food, consider light desserts with citrus elements or dark chocolate.',
      it: 'Da gustare al meglio come drink dopo cena o nightcap. Se abbinato al cibo, considera dessert leggeri con elementi agrumati o cioccolato fondente.',
      vi: 'Thưởng thức tốt nhất như đồ uống sau bữa tối hoặc nightcap. Nếu kết hợp với thức ăn, hãy xem xét các món tráng miệng nhẹ với yếu tố cam quýt hoặc chocolate đen.',
    },
    ideal_for: {
      en: 'Those who enjoy Sidecars and want something with more complexity. Perfect for anyone seeking a sophisticated, strong cocktail with a romantic backstory. Not for the faint of heart.',
      it: 'Chi apprezza i Sidecar e vuole qualcosa con più complessità. Perfetto per chi cerca un cocktail sofisticato e forte con una storia romantica. Non per i deboli di cuore.',
      vi: 'Những ai thích Sidecar và muốn thứ gì đó phức tạp hơn. Hoàn hảo cho những ai tìm kiếm cocktail mạnh, tinh tế với câu chuyện lãng mạn. Không dành cho người yếu tim.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'White Rum', it: 'Rum Bianco', vi: 'Rum Trắng' },
    },
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Triple Sec', it: 'Triple Sec', vi: 'Triple Sec' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh Lemon Juice', it: 'Succo di Limone Fresco', vi: 'Nước Chanh Tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients into a cocktail shaker. Shake with ice until well chilled. Strain into a chilled cocktail glass.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker. Shakerare con ghiaccio fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail. Lắc với đá cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'None (traditionally served without garnish)',
    it: 'Nessuna (tradizionalmente servito senza guarnizione)',
    vi: 'Không có (truyền thống phục vụ không trang trí)',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_RUM_WHITE', 'ING_COGNAC'],
  flavor_profile: ['citrus', 'boozy', 'dry', 'fruity'],
  abv_estimate: 28,
  calories_estimate: 210,
  difficulty: 'easy',
  prep_time_seconds: 45,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['date_night', 'nightcap', 'party'],

  is_mocktail: false,
  is_signature: false,

  variants: ['sidecar'],

  notes_for_staff: 'Very strong cocktail - warn guests. Think of it as a boozy Sidecar. Use quality cognac and fresh lemon juice. Some variations use Cointreau instead of triple sec for a richer orange flavor.',

  price_tier: 'mid',
  popularity: 55,

  source: {
    primary: 'https://iba-world.com/between-the-sheets/',
    note: 'IBA Official Recipe. Originated at Harry\'s New York Bar, Paris, 1920s.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// COCKTAIL 6: BOULEVARDIER
// ============================================================================

export const boulevardier: Cocktail = {
  id: '83348635-90bd-4080-af0f-835b682c0456',
  slug: 'boulevardier',
  stable_key: '3b9e4e191f4d57d46e0a225063c3b8818aa84c5d',

  name: {
    en: 'Boulevardier',
    it: 'Boulevardier',
    vi: 'Boulevardier',
    ko: '불르바르디에',
    ja: 'ブールヴァルディエ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'bitter', 'whiskey', 'negroni-variation', 'prohibition-era'],

  description: {
    en: 'The whiskey-lover\'s Negroni - a rich, bittersweet cocktail that swaps gin for bourbon or rye. Created by an American expatriate in Paris, the Boulevardier offers deeper, warmer flavors while maintaining the perfect bitter-sweet balance.',
    it: 'Il Negroni per gli amanti del whiskey - un cocktail ricco e agrodolce che sostituisce il gin con bourbon o segale. Creato da un espatriato americano a Parigi, il Boulevardier offre sapori più profondi e caldi mantenendo il perfetto equilibrio amaro-dolce.',
    vi: 'Negroni dành cho người yêu whiskey - một cocktail đậm đà, đắng ngọt thay thế gin bằng bourbon hoặc rye. Được tạo ra bởi một người Mỹ tha hương ở Paris, Boulevardier mang đến hương vị sâu hơn, ấm hơn trong khi duy trì sự cân bằng đắng-ngọt hoàn hảo.',
  },

  history: {
    created_year: 1927,
    origin: {
      city: 'Paris',
      bar: 'Harry\'s New York Bar',
      country: 'France',
    },
    creator: {
      name: 'Erskine Gwynne',
      profession: 'writer and socialite',
    },
    story: {
      en: 'The Boulevardier was created by Erskine Gwynne, an American writer and nephew of railroad magnate Alfred Vanderbilt, who founded a monthly magazine called "Boulevardier" in Paris in the 1920s. The cocktail was first published in Harry MacElhone\'s 1927 book "Barflies and Cocktails." Gwynne was a fixture of the expatriate scene in Paris during Prohibition, when Americans fled to Europe to drink legally. The drink is essentially a Negroni with bourbon replacing the gin, reflecting American taste. The name "boulevardier" means "a man about town" in French.',
      it: 'Il Boulevardier fu creato da Erskine Gwynne, uno scrittore americano e nipote del magnate delle ferrovie Alfred Vanderbilt, che fondò una rivista mensile chiamata "Boulevardier" a Parigi negli anni \'20. Il cocktail fu pubblicato per la prima volta nel libro di Harry MacElhone del 1927 "Barflies and Cocktails." Gwynne era una figura fissa della scena degli espatriati a Parigi durante il Proibizionismo. La bevanda è essenzialmente un Negroni con bourbon al posto del gin, riflettendo il gusto americano. Il nome "boulevardier" significa "uomo di mondo" in francese.',
      vi: 'Boulevardier được tạo ra bởi Erskine Gwynne, một nhà văn Mỹ và cháu trai của trùm đường sắt Alfred Vanderbilt, người sáng lập tạp chí hàng tháng "Boulevardier" ở Paris vào những năm 1920. Cocktail lần đầu được xuất bản trong cuốn sách năm 1927 của Harry MacElhone "Barflies and Cocktails." Gwynne là nhân vật quen thuộc của giới tha hương ở Paris trong thời Cấm rượu. Thức uống về cơ bản là Negroni với bourbon thay thế gin, phản ánh khẩu vị Mỹ. Tên "boulevardier" có nghĩa là "người đàn ông phong lưu" trong tiếng Pháp.',
    },
    named_after: {
      en: 'Named after the magazine "Boulevardier" founded by its creator Erskine Gwynne. The French word means "a man about town" - someone who frequents fashionable places.',
      it: 'Prende il nome dalla rivista "Boulevardier" fondata dal suo creatore Erskine Gwynne. La parola francese significa "uomo di mondo" - qualcuno che frequenta luoghi alla moda.',
      vi: 'Được đặt tên theo tạp chí "Boulevardier" do người sáng tạo Erskine Gwynne thành lập. Từ tiếng Pháp có nghĩa là "người đàn ông phong lưu" - người thường xuyên lui tới những nơi thời thượng.',
    },
  },

  taste: {
    profile: ['bitter', 'sweet', 'boozy', 'herbal'],
    description: {
      en: 'Richer and more robust than a Negroni. The bourbon/rye provides caramel, vanilla, and oak notes that complement Campari\'s bitterness beautifully. The sweet vermouth adds herbal complexity. A warming, sophisticated sipper.',
      it: 'Più ricco e robusto di un Negroni. Il bourbon/segale fornisce note di caramello, vaniglia e quercia che completano magnificamente l\'amarezza del Campari. Il vermouth rosso aggiunge complessità erbacea. Un sorso caldo e sofisticato.',
      vi: 'Đậm đà và mạnh mẽ hơn Negroni. Bourbon/rye cung cấp hương caramel, vanilla và gỗ sồi bổ sung hoàn hảo cho vị đắng của Campari. Vermouth ngọt thêm sự phức tạp thảo mộc. Một ngụm ấm áp, tinh tế.',
    },
    first_impression: {
      en: 'Warm whiskey sweetness meeting bold Campari bitterness',
      it: 'Dolcezza calda del whiskey che incontra la decisa amarezza del Campari',
      vi: 'Vị ngọt ấm của whiskey gặp vị đắng mạnh mẽ của Campari',
    },
    finish: {
      en: 'Long, warming finish with lingering bitter-orange and oak',
      it: 'Finale lungo e caldo con arancia amara e quercia persistenti',
      vi: 'Kết thúc dài, ấm áp với cam đắng và gỗ sồi kéo dài',
    },
    balance: {
      en: 'The whiskey\'s sweetness counterbalances Campari\'s bitterness, with vermouth as the bridge',
      it: 'La dolcezza del whiskey controbilancia l\'amarezza del Campari, con il vermouth come ponte',
      vi: 'Vị ngọt của whiskey cân bằng vị đắng của Campari, với vermouth là cầu nối',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['aperitivo', 'digestivo', 'date_night'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with rich meats, charcuterie, and aged cheeses. The bitter notes complement fatty foods beautifully. Also pairs well with dark chocolate.',
      it: 'Eccellente con carni ricche, salumi e formaggi stagionati. Le note amare completano magnificamente i cibi grassi. Si abbina bene anche con il cioccolato fondente.',
      vi: 'Tuyệt vời với thịt béo, thịt nguội và phô mai lâu năm. Hương vị đắng bổ sung hoàn hảo cho thức ăn béo. Cũng kết hợp tốt với chocolate đen.',
    },
    ideal_for: {
      en: 'Whiskey lovers who want to explore bitter cocktails. Perfect for those who find Negronis too gin-forward. A sophisticated choice for cooler weather.',
      it: 'Amanti del whiskey che vogliono esplorare i cocktail amari. Perfetto per chi trova i Negroni troppo incentrati sul gin. Una scelta sofisticata per il clima più freddo.',
      vi: 'Người yêu whiskey muốn khám phá cocktail đắng. Hoàn hảo cho những ai thấy Negroni quá nặng gin. Lựa chọn tinh tế cho thời tiết mát mẻ.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Bourbon or Rye Whiskey', it: 'Bourbon o Whiskey di Segale', vi: 'Bourbon hoặc Rye Whiskey' },
      substitutes: ['ING_RYE_WHISKEY'],
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet Vermouth', it: 'Vermouth Rosso', vi: 'Vermouth Ngọt' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass with ice cubes. Stir well until properly chilled and diluted. Strain into a chilled cocktail glass. Garnish with orange zest.',
    it: 'Versare tutti gli ingredienti in un mixing glass con cubetti di ghiaccio. Mescolare bene fino a raffreddare e diluire. Filtrare in una coppa da cocktail raffreddata. Guarnire con scorza d\'arancia.',
    vi: 'Đổ tất cả nguyên liệu vào ly pha với đá viên. Khuấy kỹ cho đến khi lạnh và pha loãng đúng mức. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ cam.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Orange zest, optionally with lemon zest',
    it: 'Scorza d\'arancia, opzionalmente con scorza di limone',
    vi: 'Vỏ cam, tùy chọn với vỏ chanh',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_BOURBON'],
  flavor_profile: ['bitter', 'sweet', 'boozy', 'herbal'],
  abv_estimate: 25,
  calories_estimate: 185,
  difficulty: 'easy',
  prep_time_seconds: 60,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['aperitivo', 'digestivo', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  variants: ['negroni', 'old-pal'],

  notes_for_staff: 'Use good bourbon (Bulleit, Buffalo Trace) or rye (Rittenhouse). Some prefer equal parts (1:1:1) for a more bitter drink. Can serve on the rocks for a longer drink. The "whiskey Negroni" nickname helps explain it to guests.',

  price_tier: 'mid',
  popularity: 78,

  source: {
    primary: 'https://iba-world.com/boulevardier/',
    note: 'IBA Official Recipe. First published in "Barflies and Cocktails" 1927.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// COCKTAIL 7: CLOVER CLUB
// ============================================================================

export const cloverClub: Cocktail = {
  id: 'f7b06f82-bcfa-426c-8d11-17f19462b37a',
  slug: 'clover-club',
  stable_key: 'ae84232a865262ae3e01e4f44a89d23e8cd42f53',

  name: {
    en: 'Clover Club',
    it: 'Clover Club',
    vi: 'Clover Club',
    ko: '클로버 클럽',
    ja: 'クローバークラブ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'fruity', 'pre-prohibition', 'egg-white', 'pink'],

  description: {
    en: 'An elegant pre-Prohibition cocktail with a beautiful pink color and silky foam from egg white. The Clover Club combines gin with raspberry and lemon for a perfectly balanced, sophisticated drink that\'s fruity without being sweet.',
    it: 'Un elegante cocktail pre-Proibizionismo con un bel colore rosa e schiuma setosa dall\'albume. Il Clover Club combina gin con lampone e limone per una bevanda perfettamente bilanciata e sofisticata, fruttata senza essere dolce.',
    vi: 'Một cocktail thanh lịch tiền-Cấm rượu với màu hồng đẹp và bọt mượt từ lòng trắng trứng. Clover Club kết hợp gin với mâm xôi và chanh tạo nên thức uống cân bằng hoàn hảo, tinh tế, trái cây mà không ngọt.',
  },

  history: {
    created_year: '1900s',
    origin: {
      city: 'Philadelphia',
      bar: 'Bellevue-Stratford Hotel',
      country: 'USA',
    },
    story: {
      en: 'The Clover Club originated in the pre-Prohibition era at the Bellevue-Stratford Hotel in Philadelphia, where a men\'s club of the same name met. The Clover Club was an exclusive gentlemen\'s club of lawyers, writers, and businessmen who gathered to discuss literature and politics. The pink, frothy cocktail became their signature drink. After Prohibition and the rise of "girly drink" stigma, the cocktail fell out of favor, unfairly dismissed as too feminine. It was rediscovered in the craft cocktail renaissance of the 2000s and is now rightfully celebrated as a sophisticated classic.',
      it: 'Il Clover Club ha origine nell\'era pre-Proibizionismo al Bellevue-Stratford Hotel di Philadelphia, dove si riuniva un club maschile omonimo. Il Clover Club era un esclusivo club di gentiluomini formato da avvocati, scrittori e uomini d\'affari che si riunivano per discutere di letteratura e politica. Il cocktail rosa e spumoso divenne la loro bevanda distintiva. Dopo il Proibizionismo, il cocktail cadde in disgrazia, ingiustamente liquidato come troppo femminile. Fu riscoperto nel rinascimento dei cocktail artigianali degli anni 2000.',
      vi: 'Clover Club có nguồn gốc từ thời kỳ tiền-Cấm rượu tại Khách sạn Bellevue-Stratford ở Philadelphia, nơi một câu lạc bộ nam giới cùng tên họp mặt. Clover Club là câu lạc bộ quý ông độc quyền của luật sư, nhà văn và doanh nhân tụ họp để thảo luận về văn học và chính trị. Cocktail màu hồng sủi bọt trở thành thức uống đặc trưng của họ. Sau Cấm rượu, cocktail không còn được ưa chuộng, bị coi là quá nữ tính. Nó được tái khám phá trong thời kỳ phục hưng cocktail thủ công những năm 2000.',
    },
    named_after: {
      en: 'Named after the Clover Club, an exclusive Philadelphia gentlemen\'s club that met at the Bellevue-Stratford Hotel from the 1880s to 1920s.',
      it: 'Prende il nome dal Clover Club, un esclusivo club di gentiluomini di Philadelphia che si riuniva al Bellevue-Stratford Hotel dal 1880 agli anni \'20.',
      vi: 'Được đặt tên theo Clover Club, một câu lạc bộ quý ông độc quyền ở Philadelphia họp tại Khách sạn Bellevue-Stratford từ những năm 1880 đến 1920.',
    },
  },

  taste: {
    profile: ['fruity', 'sour', 'dry', 'refreshing'],
    description: {
      en: 'Bright and refreshing with a silky texture from the egg white. The raspberry provides fruitiness without cloying sweetness, while lemon adds tartness and gin contributes botanical backbone. The foam creates a luxurious mouthfeel.',
      it: 'Luminoso e rinfrescante con una consistenza setosa dall\'albume. Il lampone fornisce fruttato senza dolcezza stucchevole, mentre il limone aggiunge acidità e il gin contribuisce alla struttura botanica. La schiuma crea una sensazione lussuosa in bocca.',
      vi: 'Tươi sáng và sảng khoái với kết cấu mượt mà từ lòng trắng trứng. Mâm xôi cung cấp vị trái cây không ngọt gắt, trong khi chanh thêm vị chua và gin đóng góp xương sống thực vật. Bọt tạo cảm giác sang trọng trong miệng.',
    },
    first_impression: {
      en: 'Bright raspberry and citrus with silky foam',
      it: 'Lampone e agrumi luminosi con schiuma setosa',
      vi: 'Mâm xôi và cam quýt tươi sáng với bọt mượt mà',
    },
    finish: {
      en: 'Clean, dry finish with lingering berry notes',
      it: 'Finale pulito e secco con note di frutti di bosco persistenti',
      vi: 'Kết thúc sạch, khô với hương quả mọng kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between fruit sweetness and citrus tartness, with gin providing structure',
      it: 'Perfettamente bilanciato tra dolcezza fruttata e acidità agrumata, con il gin che fornisce struttura',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt trái cây và vị chua cam quýt, với gin cung cấp cấu trúc',
    },
  },

  recommendations: {
    best_time: ['evening'],
    occasions: ['date_night', 'celebration', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs beautifully with light appetizers, seafood, and berry desserts. Excellent brunch cocktail alongside eggs Benedict or fruit plates.',
      it: 'Si abbina magnificamente con antipasti leggeri, frutti di mare e dessert ai frutti di bosco. Eccellente cocktail da brunch con uova alla Benedict o piatti di frutta.',
      vi: 'Kết hợp tuyệt vời với khai vị nhẹ, hải sản và tráng miệng berry. Cocktail brunch tuyệt vời cùng với trứng Benedict hoặc đĩa trái cây.',
    },
    ideal_for: {
      en: 'Anyone who enjoys sours and gin cocktails. Perfect for those who appreciate texture in their drinks. A great introduction to egg white cocktails.',
      it: 'Chiunque apprezzi i sour e i cocktail a base di gin. Perfetto per chi apprezza la texture nelle bevande. Un\'ottima introduzione ai cocktail con albume.',
      vi: 'Bất kỳ ai thích sour và cocktail gin. Hoàn hảo cho những ai đánh giá cao kết cấu trong đồ uống. Giới thiệu tuyệt vời về cocktail lòng trắng trứng.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_RASPBERRY_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Raspberry Syrup', it: 'Sciroppo di Lampone', vi: 'Siro Mâm Xôi' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh Lemon Juice', it: 'Succo di Limone Fresco', vi: 'Nước Chanh Tươi' },
    },
    {
      ingredient_id: 'ING_EGG_WHITE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Egg White', it: 'Albume d\'Uovo', vi: 'Lòng Trắng Trứng' },
      notes: { en: 'Few drops', it: 'Qualche goccia', vi: 'Vài giọt' },
      substitutes: ['ING_AQUAFABA'],
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker. Dry shake (without ice) vigorously to emulsify the egg white. Add ice and shake again until well chilled. Strain into a chilled cocktail glass. Garnish with fresh raspberries.',
    it: 'Versare tutti gli ingredienti in uno shaker. Shakerare a secco (senza ghiaccio) vigorosamente per emulsionare l\'albume. Aggiungere ghiaccio e shakerare di nuovo fino a raffreddare. Filtrare in una coppa da cocktail raffreddata. Guarnire con lamponi freschi.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail. Lắc khô (không có đá) mạnh mẽ để nhũ hóa lòng trắng trứng. Thêm đá và lắc lại cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh. Trang trí với mâm xôi tươi.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Fresh raspberries',
    it: 'Lamponi freschi',
    vi: 'Mâm xôi tươi',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['fruity', 'sour', 'dry', 'refreshing'],
  abv_estimate: 20,
  calories_estimate: 165,
  difficulty: 'medium',
  prep_time_seconds: 90,

  computed: {
    allergens: ['eggs', 'sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['date_night', 'celebration', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  variants: ['clover-club-royal'],

  notes_for_staff: 'The dry shake is essential for the silky foam. Offer aquafaba for vegan guests. Fresh raspberries for garnish make it special. Don\'t skip the egg white - it transforms the texture completely.',

  price_tier: 'mid',
  popularity: 68,

  source: {
    primary: 'https://iba-world.com/clover-club/',
    note: 'IBA Official Recipe. Pre-Prohibition classic from Philadelphia.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// COCKTAIL 8: DAIQUIRI
// ============================================================================

export const daiquiri: Cocktail = {
  id: '2218cd73-5e9d-4148-979d-13436b6e2c47',
  slug: 'daiquiri',
  stable_key: 'daiquiri-iba-unforgettable',

  name: {
    en: 'Daiquiri',
    it: 'Daiquiri',
    vi: 'Daiquiri',
    ko: '다이키리',
    ja: 'ダイキリ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'cuban', 'rum', 'sour', 'refreshing', 'hemingway'],

  description: {
    en: 'The quintessential rum sour - a perfect balance of white rum, fresh lime, and just enough sugar. Simple, elegant, and refreshing, the classic Daiquiri is a testament to the beauty of restraint. Forget the frozen strawberry versions - this is the real deal.',
    it: 'Il sour di rum per eccellenza - un equilibrio perfetto di rum bianco, lime fresco e giusto un po\' di zucchero. Semplice, elegante e rinfrescante, il classico Daiquiri è una testimonianza della bellezza della moderazione. Dimentica le versioni frozen alla fragola - questo è l\'originale.',
    vi: 'Rum sour tinh túy - sự cân bằng hoàn hảo của rum trắng, chanh tươi và đủ đường. Đơn giản, thanh lịch và sảng khoái, Daiquiri cổ điển là minh chứng cho vẻ đẹp của sự tiết chế. Quên các phiên bản frozen dâu đi - đây mới là thật.',
  },

  history: {
    created_year: 1898,
    origin: {
      city: 'Santiago de Cuba',
      bar: 'Venus Hotel / Daiquiri mines',
      country: 'Cuba',
    },
    creator: {
      name: 'Jennings Cox',
      profession: 'American mining engineer',
    },
    story: {
      en: 'The Daiquiri was created around 1898 by Jennings Cox, an American mining engineer working at iron mines near the village of Daiquirí in Cuba. Legend says Cox ran out of gin while entertaining American guests and improvised with local rum, lime, and sugar. The cocktail was later popularized at Havana\'s El Floridita bar, where it became Ernest Hemingway\'s drink of choice. Hemingway allegedly consumed up to 15 double daiquiris in a single sitting (though he preferred his without sugar - the "Papa Doble"). The simple recipe epitomizes Cuban cocktail culture.',
      it: 'Il Daiquiri fu creato intorno al 1898 da Jennings Cox, un ingegnere minerario americano che lavorava nelle miniere di ferro vicino al villaggio di Daiquirí a Cuba. La leggenda narra che Cox finì il gin mentre intratteneva ospiti americani e improvvisò con rum locale, lime e zucchero. Il cocktail fu poi reso popolare all\'El Floridita di L\'Avana, dove divenne la bevanda preferita di Ernest Hemingway. Si dice che Hemingway consumasse fino a 15 daiquiri doppi in una sola seduta (anche se preferiva il suo senza zucchero - il "Papa Doble").',
      vi: 'Daiquiri được tạo ra khoảng năm 1898 bởi Jennings Cox, một kỹ sư mỏ người Mỹ làm việc tại các mỏ sắt gần làng Daiquirí ở Cuba. Truyền thuyết kể Cox hết gin khi tiếp khách Mỹ và đã ứng biến với rum địa phương, chanh và đường. Cocktail sau đó được phổ biến tại quán bar El Floridita ở Havana, nơi nó trở thành thức uống ưa thích của Ernest Hemingway. Hemingway được cho là uống tới 15 ly daiquiri đôi trong một lần ngồi (mặc dù ông thích không đường - "Papa Doble").',
    },
    named_after: {
      en: 'Named after Daiquirí, a village and beach near Santiago de Cuba where the iron mines were located.',
      it: 'Prende il nome da Daiquirí, un villaggio e una spiaggia vicino a Santiago de Cuba dove si trovavano le miniere di ferro.',
      vi: 'Được đặt tên theo Daiquirí, một ngôi làng và bãi biển gần Santiago de Cuba, nơi có các mỏ sắt.',
    },
  },

  taste: {
    profile: ['sour', 'sweet', 'citrus', 'refreshing'],
    description: {
      en: 'Crisp, clean, and perfectly balanced. The white rum provides a clean canvas with subtle sweetness, the lime brings bright acidity, and the sugar rounds it all together. Simple ingredients, complex satisfaction.',
      it: 'Frizzante, pulito e perfettamente bilanciato. Il rum bianco fornisce una tela pulita con sottile dolcezza, il lime porta acidità brillante e lo zucchero arrotonda tutto insieme. Ingredienti semplici, soddisfazione complessa.',
      vi: 'Thanh, sạch và cân bằng hoàn hảo. Rum trắng cung cấp nền sạch với vị ngọt tinh tế, chanh mang đến độ chua tươi sáng và đường làm tròn tất cả. Nguyên liệu đơn giản, sự hài lòng phức tạp.',
    },
    first_impression: {
      en: 'Bright, zesty lime followed by clean rum sweetness',
      it: 'Lime brillante e vivace seguito dalla dolcezza pulita del rum',
      vi: 'Chanh tươi sáng theo sau là vị ngọt sạch của rum',
    },
    finish: {
      en: 'Clean, refreshing finish with subtle rum warmth',
      it: 'Finale pulito e rinfrescante con sottile calore del rum',
      vi: 'Kết thúc sạch, sảng khoái với sự ấm áp tinh tế của rum',
    },
    balance: {
      en: 'The holy trinity of rum cocktails - spirit, citrus, and sugar in perfect harmony',
      it: 'La sacra trinità dei cocktail al rum - spirito, agrumi e zucchero in perfetta armonia',
      vi: 'Bộ ba thần thánh của cocktail rum - rượu, cam quýt và đường hài hòa hoàn hảo',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'party', 'aperitivo'],
    seasons: ['spring', 'summer', 'all_year'],
    food_pairings: {
      en: 'Perfect with seafood, especially ceviche, oysters, and grilled fish. Also excellent with Cuban cuisine and Caribbean dishes.',
      it: 'Perfetto con frutti di mare, specialmente ceviche, ostriche e pesce alla griglia. Eccellente anche con cucina cubana e piatti caraibici.',
      vi: 'Hoàn hảo với hải sản, đặc biệt là ceviche, hàu và cá nướng. Cũng tuyệt vời với ẩm thực Cuba và các món Caribe.',
    },
    ideal_for: {
      en: 'Everyone. A true crowd-pleaser that showcases rum\'s versatility. Perfect for rum skeptics and enthusiasts alike. The benchmark for all rum sours.',
      it: 'Tutti. Un vero piacere per tutti che mette in mostra la versatilità del rum. Perfetto sia per scettici che entusiasti del rum. Il benchmark per tutti i rum sour.',
      vi: 'Tất cả mọi người. Một thức uống hài lòng mọi người thể hiện tính linh hoạt của rum. Hoàn hảo cho cả người hoài nghi và yêu thích rum. Tiêu chuẩn cho tất cả rum sour.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'White Cuban Rum', it: 'Rum Bianco Cubano', vi: 'Rum Trắng Cuba' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh Lime Juice', it: 'Succo di Lime Fresco', vi: 'Nước Chanh Xanh Tươi' },
    },
    {
      ingredient_id: 'ING_SUPERFINE_SUGAR',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Superfine Sugar', it: 'Zucchero Semolato Fine', vi: 'Đường Siêu Mịn' },
      notes: { en: '2 bar spoons', it: '2 cucchiai da bar', vi: '2 thìa bar' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'In a cocktail shaker, add all ingredients. Stir well to dissolve the sugar. Add ice and shake vigorously until well chilled. Strain into a chilled cocktail glass.',
    it: 'In uno shaker da cocktail, aggiungere tutti gli ingredienti. Mescolare bene per sciogliere lo zucchero. Aggiungere ghiaccio e shakerare vigorosamente fino a raffreddare. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Trong bình lắc cocktail, cho tất cả nguyên liệu. Khuấy kỹ để hòa tan đường. Thêm đá và lắc mạnh cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'None (traditionally served without garnish)',
    it: 'Nessuna (tradizionalmente servito senza guarnizione)',
    vi: 'Không có (truyền thống phục vụ không trang trí)',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_RUM_WHITE'],
  flavor_profile: ['sour', 'sweet', 'citrus', 'refreshing'],
  abv_estimate: 23,
  calories_estimate: 145,
  difficulty: 'easy',
  prep_time_seconds: 45,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'fructose', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['casual', 'party', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  variants: ['frozen-daiquiri', 'hemingway-daiquiri', 'strawberry-daiquiri'],

  notes_for_staff: 'Use quality white rum (Havana Club, Bacardi Superior). Fresh lime juice is non-negotiable. Dissolve sugar before adding ice. This is NOT a frozen drink - that\'s a different (and lesser) beast. Offer the Hemingway Daiquiri (Papa Doble) as a drier variation.',

  price_tier: 'low',
  popularity: 92,

  source: {
    primary: 'https://iba-world.com/daiquiri/',
    note: 'IBA Official Recipe. Cuban classic from 1898.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};

// ============================================================================
// EXPORTS
// ============================================================================

export const ibaUnforgettables: Cocktail[] = [
  alexander,
  americano,
  angelFace,
  aviation,
  betweenTheSheets,
  boulevardier,
  cloverClub,
  daiquiri,
  // More cocktails will be added here...
];

export const IBA_UNFORGETTABLES_COUNT = ibaUnforgettables.length;
