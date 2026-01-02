/**
 * Famous Cocktails: Mexican Firing Squad
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mexicanFiringSquad: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  slug: 'mexican-firing-squad',
  stable_key: 'd0e9f8a7b6c59483928170695847362fdbecad03',

  name: {
    en: 'Mexican Firing Squad',
    it: 'Mexican Firing Squad',
    vi: 'Mexican Firing Squad',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'tequila', 'citrus', 'spicy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A bold tequila cocktail featuring lime juice, grenadine, and Angostura bitters. The Mexican Firing Squad is a spicy, citrus-forward drink with a beautiful pink hue and complex flavor profile.',
    it: 'Un cocktail audace a base di tequila con succo di lime, granatina e bitter Angostura. Il Mexican Firing Squad è una bevanda piccante e agrumata con una bellissima tonalità rosa e un profilo aromatico complesso.',
    vi: 'Một loại cocktail tequila táo bạo với nước chanh, grenadine và Angostura bitters. Mexican Firing Squad là thức uống cay, hướng cam chanh với sắc hồng đẹp mắt và hương vị phức tạp.',
  },

  history: {
    created_year: '1937',
    origin: {
      city: 'Mexico',
      bar: 'Unknown',
      country: 'Mexico',
    },
    creator: {
      name: 'Charles H. Baker Jr.',
      profession: 'writer',
    },
    story: {
      en: 'First documented by Charles H. Baker Jr. in his 1937 book "The Gentleman\'s Companion," the Mexican Firing Squad is a forgotten classic that was rediscovered during the modern cocktail renaissance. Baker encountered the drink during his travels in Mexico. The cocktail fell into obscurity until it was revived by craft bartenders in the 2000s who appreciated its bold flavors and unusual combination of tequila with grenadine and bitters.',
      it: 'Documentato per la prima volta da Charles H. Baker Jr. nel suo libro del 1937 "The Gentleman\'s Companion," il Mexican Firing Squad è un classico dimenticato che fu riscoperto durante il rinascimento moderno dei cocktail. Baker incontrò la bevanda durante i suoi viaggi in Messico. Il cocktail cadde nell\'oblio fino a quando non fu fatto rivivere dai bartender artigianali negli anni 2000 che apprezzarono i suoi sapori audaci e l\'insolita combinazione di tequila con granatina e bitter.',
      vi: 'Lần đầu được ghi chép bởi Charles H. Baker Jr. trong cuốn sách năm 1937 "The Gentleman\'s Companion," Mexican Firing Squad là cocktail cổ điển bị lãng quên được tái khám phá trong thời kỳ phục흥 cocktail hiện đại. Baker gặp thức uống này trong chuyến đi Mexico. Cocktail này rơi vào quên lãng cho đến khi được các bartender thủ công hồi sinh vào những năm 2000, những người đánh giá cao hương vị táo bạo và sự kết hợp bất thường của tequila với grenadine và bitters.',
    },
    named_after: {
      en: 'The dramatic name references the Mexican tradition of offering a final drink to condemned prisoners before execution.',
      it: 'Il nome drammatico fa riferimento alla tradizione messicana di offrire un\'ultima bevanda ai prigionieri condannati prima dell\'esecuzione.',
      vi: 'Tên gọi kịch tính ám chỉ truyền thống Mexico về việc cung cấp thức uống cuối cùng cho tù nhân bị kết án trước khi hành quyết.',
    },
  },

  taste: {
    profile: ['citrus', 'spicy', 'complex'],
    description: {
      en: 'Bright and citrus-forward with unexpected complexity. The tequila provides an agave backbone, lime brings sharp acidity, grenadine adds fruity sweetness, and Angostura bitters contribute warm spice notes that tie everything together.',
      it: 'Luminoso e agrumato con complessità inaspettata. La tequila fornisce una struttura di agave, il lime porta acidità netta, la granatina aggiunge dolcezza fruttata e i bitter Angostura contribuiscono note speziate calde che legano tutto insieme.',
      vi: 'Sáng và hướng cam chanh với độ phức tạp bất ngờ. Tequila mang đến xương sống agave, chanh mang độ chua sắc nét, grenadine thêm vị ngọt trái cây, và Angostura bitters đóng góp hương gia vị ấm áp kết nối mọi thứ lại.',
    },
    first_impression: {
      en: 'Sharp lime and tequila hit first, followed by fruity grenadine and warm bitters',
      it: 'Lime e tequila netti colpiscono per primi, seguiti da granatina fruttata e bitter caldi',
      vi: 'Chanh và tequila sắc nét đập vào đầu tiên, tiếp theo là grenadine trái cây và bitters ấm áp',
    },
    finish: {
      en: 'Long finish with lingering spice and citrus notes',
      it: 'Finale lungo con note persistenti di spezie e agrumi',
      vi: 'Kết thúc dài với hương gia vị và cam chanh kéo dài',
    },
    balance: {
      en: 'Well-balanced between tart, sweet, and spicy elements, creating a complex yet approachable cocktail',
      it: 'Ben bilanciato tra elementi aspri, dolci e piccanti, creando un cocktail complesso ma accessibile',
      vi: 'Cân bằng tốt giữa các yếu tố chua, ngọt và cay, tạo ra cocktail phức tạp nhưng dễ tiếp cận',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['cocktail_hour', 'dinner_party', 'celebration'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Excellent with Mexican cuisine, tacos, ceviche, grilled meats, and spicy dishes. The citrus and spice complement bold, flavorful foods.',
      it: 'Eccellente con cucina messicana, tacos, ceviche, carni alla griglia e piatti piccanti. Gli agrumi e le spezie complementano cibi audaci e saporiti.',
      vi: 'Tuyệt vời với ẩm thực Mexico, tacos, ceviche, thịt nướng và món cay. Cam chanh và gia vị bổ sung cho món ăn đậm đà, nhiều hương vị.',
    },
    ideal_for: {
      en: 'Perfect for tequila lovers who enjoy bold, complex cocktails. Ideal for those seeking something different from typical margaritas.',
      it: 'Perfetto per gli amanti della tequila che apprezzano cocktail audaci e complessi. Ideale per chi cerca qualcosa di diverso dai tipici margarita.',
      vi: 'Hoàn hảo cho người yêu tequila thích cocktail táo bạo, phức tạp. Lý tưởng cho những ai tìm kiếm thứ gì đó khác với margarita thông thường.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA_BLANCO',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Tequila blanco', it: 'Tequila blanco', vi: 'Tequila blanco' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Grenadine',
        it: 'Granatina',
        vi: 'Grenadine',
      },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 6, unit: 'dashes' },
      display_name: {
        en: 'Angostura bitters',
        it: 'Bitter Angostura',
        vi: 'Angostura bitters',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a rocks glass filled with fresh ice. Garnish with a lime wheel.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere rocks pieno di ghiaccio fresco. Guarnire con una fetta di lime.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly rocks đầy đá tươi. Trang trí với lát chanh.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lime wheel',
    it: 'Fetta di lime',
    vi: 'Lát chanh',
  },

  ice: 'cubes',

  serving_style: 'on_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA_BLANCO'],

  flavor_profile: ['citrus', 'spicy', 'complex'],

  abv_estimate: 16,

  calories_estimate: 155,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all-seasons'],
  occasion_tags: ['cocktail_hour', 'dinner_party', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['margarita', 'paloma'],

  notes_for_staff: 'Use quality grenadine (preferably house-made) for best results. The Angostura bitters are essential - they provide the signature spicy character. Can garnish with a chili salt rim for extra heat.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 68,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'The Gentleman\'s Companion by Charles H. Baker Jr., 1937',
    note: 'Rediscovered classic from 1937. Revived during modern cocktail renaissance.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
