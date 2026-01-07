/**
 * IBA Contemporary Classics: Vesper
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const vesper: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
  slug: 'vesper',
  stable_key: 'vesper_iba_contemporary_classic',

  name: {
    en: 'Vesper',
    it: 'Vesper',
    vi: 'Vesper',
    ko: '베스퍼',
    ja: 'ヴェスパー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'james-bond', 'literary', 'spirit-forward', 'iconic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "James Bond's signature cocktail - a powerful combination of gin, vodka, and Lillet Blanc. Created by Ian Fleming in Casino Royale, this drink is strong, sophisticated, and distinctly literary.",
    it: 'Il cocktail distintivo di James Bond - una potente combinazione di gin, vodka e Lillet Blanc. Creato da Ian Fleming in Casino Royale, questa bevanda è forte, sofisticata e distintamente letteraria.',
    vi: 'Cocktail đặc trưng của James Bond - một sự kết hợp mạnh mẽ của gin, vodka và Lillet Blanc. Được tạo ra bởi Ian Fleming trong Casino Royale, thức uống này mạnh, tinh tế và mang tính văn học rõ rệt.',
  },

  history: {
    created_year: '1953',
    origin: {
      city: 'London',
      bar: 'Fictional (Literary)',
      country: 'UK',
    },
    creator: {
      name: 'Ian Fleming (via James Bond)',
      profession: 'author',
    },
    story: {
      en: 'The Vesper was invented by author Ian Fleming and appeared in his 1953 James Bond novel "Casino Royale." Bond orders it and names it after Vesper Lynd, the book\'s female lead. The original called for Kina Lillet, which no longer exists - modern versions use Lillet Blanc or Cocchi Americano.',
      it: 'Il Vesper fu inventato dall\'autore Ian Fleming e apparve nel suo romanzo di James Bond del 1953 "Casino Royale". Bond lo ordina e lo nomina in onore di Vesper Lynd, la protagonista femminile del libro. L\'originale richiedeva Kina Lillet, che non esiste più - le versioni moderne usano Lillet Blanc o Cocchi Americano.',
      vi: 'Vesper được phát minh bởi tác giả Ian Fleming và xuất hiện trong tiểu thuyết James Bond năm 1953 "Casino Royale". Bond đặt nó và đặt tên theo Vesper Lynd, nhân vật nữ chính của cuốn sách. Công thức gốc yêu cầu Kina Lillet, không còn tồn tại nữa - các phiên bản hiện đại sử dụng Lillet Blanc hoặc Cocchi Americano.',
    },
    named_after: {
      en: 'Named after Vesper Lynd, the female protagonist in Ian Fleming\'s "Casino Royale."',
      it: 'Prende il nome da Vesper Lynd, la protagonista femminile in "Casino Royale" di Ian Fleming.',
      vi: 'Được đặt theo tên Vesper Lynd, nhân vật nữ chính trong "Casino Royale" của Ian Fleming.',
    },
  },

  taste: {
    profile: ['spirit-forward', 'dry', 'citrus'],
    description: {
      en: 'Bold, strong, and bracingly dry. The combination of gin and vodka creates a powerful backbone, while Lillet adds subtle fruitiness and complexity. Lemon provides a bright, aromatic finish.',
      it: 'Audace, forte e tonicamente secco. La combinazione di gin e vodka crea una potente struttura, mentre il Lillet aggiunge sottile fruttato e complessità. Il limone fornisce un finale brillante e aromatico.',
      vi: 'Táo bạo, mạnh mẽ và khô sảng khoái. Sự kết hợp của gin và vodka tạo ra xương sống mạnh mẽ, trong khi Lillet thêm vị trái cây tinh tế và độ phức tạp. Chanh cung cấp kết thúc sáng, thơm.',
    },
    first_impression: {
      en: 'Strong gin botanicals with vodka smoothness and citrus',
      it: 'Forti note botaniche di gin con morbidezza di vodka e agrumi',
      vi: 'Thực vật gin mạnh với độ mượt vodka và cam quýt',
    },
    finish: {
      en: 'Long, dry finish with lingering botanical and citrus notes',
      it: 'Finale lungo e secco con note botaniche e agrumi persistenti',
      vi: 'Kết thúc dài, khô với hương thảo mộc và cam quýt kéo dài',
    },
    balance: {
      en: 'Spirit-forward with subtle aromatic complexity from Lillet',
      it: 'Spirit-forward con sottile complessità aromatica dal Lillet',
      vi: 'Hướng về rượu với độ phức tạp thơm tinh tế từ Lillet',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['special_occasion', 'celebration', 'date_night'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Pairs well with seafood, particularly oysters, caviar, and smoked salmon. Also excellent with light appetizers and olives.',
      it: 'Si abbina bene con frutti di mare, in particolare ostriche, caviale e salmone affumicato. Eccellente anche con antipasti leggeri e olive.',
      vi: 'Kết hợp tốt với hải sản, đặc biệt là hàu, trứng cá muối và cá hồi hun khói. Cũng tuyệt vời với món khai vị nhẹ và ô liu.',
    },
    ideal_for: {
      en: 'Perfect for spirit-forward cocktail enthusiasts and James Bond fans. Ideal for those who appreciate strong, sophisticated drinks with literary pedigree.',
      it: 'Perfetto per gli appassionati di cocktail spirit-forward e fan di James Bond. Ideale per chi apprezza bevande forti e sofisticate con pedigree letterario.',
      vi: 'Hoàn hảo cho những người đam mê cocktail hướng về rượu và người hâm mộ James Bond. Lý tưởng cho những ai đánh giá cao thức uống mạnh, tinh tế với nguồn gốc văn học.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_LILLET_BLANC',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Lillet Blanc', it: 'Lillet Blanc', vi: 'Lillet Blanc' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice cubes. Shake well. Strain into a chilled cocktail glass. Garnish with a large, thin slice of lemon peel.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di cubetti di ghiaccio. Shakerare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una grande e sottile fetta di scorza di limone.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá viên. Lắc kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí bằng lát vỏ chanh lớn, mỏng.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Large, thin lemon peel',
    it: 'Grande e sottile scorza di limone',
    vi: 'Vỏ chanh lớn, mỏng',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN', 'ING_VODKA'],

  flavor_profile: ['spirit-forward', 'dry', 'citrus'],

  abv_estimate: 28,

  calories_estimate: 190,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['special_occasion', 'celebration', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['vesper-with-cocchi-americano', 'reverse-vesper'],

  notes_for_staff:
    "Bond's original spec: \"Three measures of Gordon's, one of vodka, half a measure of Kina Lillet. Shake it very well until it's ice-cold, then add a large thin slice of lemon peel.\" Modern Lillet Blanc is sweeter than original Kina Lillet - some bartenders prefer Cocchi Americano for authenticity.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/vesper/',
    notes: 'IBA Official Recipe. Originally from Ian Fleming\'s "Casino Royale" (1953).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
