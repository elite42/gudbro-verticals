/**
 * IBA Unforgettables: Americano
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

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
    it: "L'originale cocktail aperitivo italiano - una miscela rinfrescante e agrodolce di Campari e vermouth rosso, allungata con acqua frizzante. Leggero, effervescente e perfetto prima di cena.",
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
      it: "Piacevolmente amaro con dolcezza erbacea. Il Campari porta la sua caratteristica complessità amaro-arancio mentre il vermouth rosso aggiunge profondità con note di vaniglia e spezie. L'acqua frizzante alleggerisce tutto, rendendolo leggero ed effervescente.",
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
      it: "Perfetto compagno per l'aperitivo con olive, salumi, bruschetta e antipasti leggeri. L'amarezza stimola l'appetito prima di qualsiasi pasto.",
      vi: 'Người bạn khai vị hoàn hảo với ô liu, thịt nguội, bruschetta và antipasti nhẹ. Vị đắng kích thích sự thèm ăn trước bữa ăn.',
    },
    ideal_for: {
      en: 'Those who enjoy bitter flavors but want something lighter than a Negroni. Perfect for hot weather or as a gentle introduction to Italian aperitivo culture. Excellent choice for anyone seeking a lower-alcohol option.',
      it: "Chi apprezza i sapori amari ma vuole qualcosa di più leggero di un Negroni. Perfetto per il clima caldo o come gentile introduzione alla cultura dell'aperitivo italiano. Ottima scelta per chi cerca un'opzione a bassa gradazione.",
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
    it: "Mescolare il Campari e il vermouth rosso direttamente in un bicchiere old fashioned pieno di cubetti di ghiaccio. Aggiungere uno spruzzo di acqua frizzante. Mescolare delicatamente. Guarnire con mezza fetta d'arancia e una twist di limone.",
    vi: 'Trộn Campari và vermouth ngọt trực tiếp trong ly old fashioned đầy đá viên. Thêm một chút soda. Khuấy nhẹ để hòa quyện. Trang trí với nửa lát cam và vỏ chanh vắt.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'Half orange slice and lemon twist',
    it: "Mezza fetta d'arancia e twist di limone",
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
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['aperitivo', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['negroni', 'negroni-sbagliato', 'americano-perfetto'],

  notes_for_staff:
    'Keep it simple - the beauty is in the simplicity. Use good quality Campari and vermouth. Soda should be fresh with good carbonation. The Negroni is this drink with gin instead of soda - offer as an upgrade for those seeking something stronger.',

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
    notes:
      'IBA Official Recipe. Historical information from various cocktail history sources and Italian aperitivo tradition.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
