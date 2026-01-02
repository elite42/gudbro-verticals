/**
 * IBA Contemporary Classics: Cardinale
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const cardinale: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e7f8a9b0-1c2d-3e4f-5a6b-7c8d9e0f1a2b',
  slug: 'cardinale',
  stable_key: 'cardinale_iba_contemporary_classic',

  name: {
    en: 'Cardinale',
    it: 'Cardinale',
    vi: 'Cardinale',
    ko: '카르디날레',
    ja: 'カーディナル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'italian', 'aperitif', 'bitter', 'elegant'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant Italian aperitivo combining gin, dry vermouth, and Campari. Bitter, complex, and sophisticated - a variation of the classic Negroni that showcases Italian aperitif culture.',
    it: 'Un elegante aperitivo italiano che combina gin, vermouth dry e Campari. Amaro, complesso e sofisticato - una variazione del classico Negroni che mostra la cultura dell\'aperitivo italiano.',
    vi: 'Một aperitivo Ý thanh lịch kết hợp gin, vermouth khô và Campari. Đắng, phức tạp và tinh tế - một biến thể của Negroni cổ điển thể hiện văn hóa aperitif Ý.',
  },

  history: {
    created_year: '1950',
    origin: {
      city: 'Rome',
      bar: 'Unknown',
      country: 'Italy',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Cardinale is a variation of the Negroni that emerged in Italy in the 1950s. It uses dry vermouth instead of sweet vermouth, creating a drier, more sophisticated profile. The name "Cardinale" (Cardinal) refers to the drink\'s deep red color, reminiscent of a Catholic cardinal\'s robes.',
      it: 'Il Cardinale è una variazione del Negroni emersa in Italia negli anni \'50. Utilizza vermouth dry invece del vermouth dolce, creando un profilo più secco e sofisticato. Il nome "Cardinale" si riferisce al colore rosso intenso della bevanda, che ricorda le vesti di un cardinale cattolico.',
      vi: 'Cardinale là một biến thể của Negroni xuất hiện ở Ý vào những năm 1950. Nó sử dụng vermouth khô thay vì vermouth ngọt, tạo ra hồ sơ khô hơn, tinh tế hơn. Tên "Cardinale" (Hồng y) ám chỉ màu đỏ đậm của thức uống, gợi nhớ đến áo choàng của hồng y Công giáo.',
    },
    named_after: {
      en: 'Named after Catholic cardinals, whose red robes match the drink\'s deep red color.',
      it: 'Prende il nome dai cardinali cattolici, le cui vesti rosse corrispondono al colore rosso intenso della bevanda.',
      vi: 'Được đặt theo tên các hồng y Công giáo, có áo choàng đỏ khớp với màu đỏ đậm của thức uống.',
    },
  },

  taste: {
    profile: ['bitter', 'dry', 'herbal'],
    description: {
      en: 'Dry, bitter, and complex. Campari provides distinctive bitter orange notes, dry vermouth adds herbal complexity, and gin brings botanical depth. More sophisticated and drier than a Negroni.',
      it: 'Secco, amaro e complesso. Il Campari fornisce note distintive di arancia amara, il vermouth dry aggiunge complessità erbacea e il gin porta profondità botanica. Più sofisticato e secco di un Negroni.',
      vi: 'Khô, đắng và phức tạp. Campari cung cấp hương cam đắng đặc trưng, vermouth khô thêm độ phức tạp thảo mộc, và gin mang lại chiều sâu thực vật. Tinh tế và khô hơn Negroni.',
    },
    first_impression: {
      en: 'Bitter Campari with dry herbal notes and gin botanicals',
      it: 'Campari amaro con note erbacee secche e botaniche di gin',
      vi: 'Campari đắng với hương thảo mộc khô và thực vật gin',
    },
    finish: {
      en: 'Long, dry finish with lingering bitter and herbal notes',
      it: 'Finale lungo e secco con note amare ed erbacee persistenti',
      vi: 'Kết thúc dài, khô với hương đắng và thảo mộc kéo dài',
    },
    balance: {
      en: 'Well-balanced between Campari bitterness and dry vermouth complexity',
      it: 'Ben bilanciato tra l\'amarezza del Campari e la complessità del vermouth dry',
      vi: 'Cân bằng tốt giữa vị đắng Campari và độ phức tạp vermouth khô',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['aperitif', 'italian_dining', 'sophisticated_gathering'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Perfect as an aperitivo before Italian meals. Pairs well with antipasti, olives, cured meats, and aged cheeses.',
      it: 'Perfetto come aperitivo prima dei pasti italiani. Si abbina bene con antipasti, olive, salumi e formaggi stagionati.',
      vi: 'Hoàn hảo như một aperitivo trước bữa ăn Ý. Kết hợp tốt với antipasti, ô liu, thịt muối và phô mai già.',
    },
    ideal_for: {
      en: 'Perfect for Negroni lovers seeking a drier variation. Ideal for those who appreciate bitter Italian aperitifs and sophisticated cocktails.',
      it: 'Perfetto per gli amanti del Negroni che cercano una variazione più secca. Ideale per chi apprezza gli aperitivi italiani amari e i cocktail sofisticati.',
      vi: 'Hoàn hảo cho người yêu Negroni tìm kiếm biến thể khô hơn. Lý tưởng cho những ai đánh giá cao aperitif Ý đắng và cocktail tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermouth dry', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass filled with ice cubes. Stir well. Strain into a chilled cocktail glass. Garnish with an orange twist.',
    it: 'Versare tutti gli ingredienti in un mixing glass pieno di cubetti di ghiaccio. Mescolare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una scorza d\'arancia.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn đầy đá viên. Khuấy kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí bằng vỏ cam xoắn.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Orange twist',
    it: 'Scorza d\'arancia',
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['bitter', 'dry', 'herbal'],

  abv_estimate: 28,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['aperitif', 'italian_dining', 'sophisticated_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['negroni', 'boulevardier', 'old-pal'],

  notes_for_staff: 'A drier variation of the Negroni using dry vermouth instead of sweet. Equal parts of all three ingredients. Stir, don\'t shake. Can also be served on the rocks in an old fashioned glass. Express orange oils over the drink before garnishing.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/cardinale/',
    note: 'IBA Official Recipe. A drier variation of the Negroni.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
