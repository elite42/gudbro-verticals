/**
 * Famous Cocktails: Mezcal Negroni
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mezcalNegroni: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
  slug: 'mezcal-negroni',
  stable_key: '827364958473920183746574839201837465748393',

  name: {
    en: 'Mezcal Negroni',
    it: 'Mezcal Negroni',
    vi: 'Mezcal Negroni',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'mezcal', 'bitter', 'smoky'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A bold, smoky twist on the classic Negroni, replacing gin with mezcal. The earthy, smoky character of mezcal adds a new dimension to the bitter-sweet interplay of Campari and sweet vermouth, creating a more complex and contemplative drinking experience.',
    it: "Una svolta audace e affumicata sul classico Negroni, sostituendo il gin con il mezcal. Il carattere terroso e affumicato del mezcal aggiunge una nuova dimensione all'interazione amaro-dolce di Campari e vermouth dolce, creando un'esperienza di bevuta più complessa e contemplativa.",
    vi: 'Một biến tấu táo bạo, khói của Negroni cổ điển, thay thế gin bằng mezcal. Đặc tính khói, đất của mezcal thêm một chiều hướng mới vào sự tương tác đắng-ngọt của Campari và vermouth ngọt, tạo ra trải nghiệm uống phức tạp và đáng suy ngẫm hơn.',
  },

  history: {
    created_year: '2000s',
    origin: {
      city: 'New York City',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Mezcal Negroni emerged in the mid-2000s as part of the craft cocktail renaissance, when bartenders began experimenting with mezcal in classic cocktail formulas. The Negroni, with its simple equal-parts structure, was an ideal canvas for showcasing mezcal's distinctive character. The smoky agave spirit proved to be a natural match for Campari's bitter complexity and sweet vermouth's herbal notes. By the 2010s, it had become a staple on cocktail menus worldwide, introducing many drinkers to mezcal through the familiar Negroni format.",
      it: 'Il Mezcal Negroni emerse a metà degli anni 2000 come parte della rinascita dei cocktail artigianali, quando i barman iniziarono a sperimentare con il mezcal nelle formule classiche dei cocktail. Il Negroni, con la sua semplice struttura a parti uguali, era una tela ideale per mostrare il carattere distintivo del mezcal. Lo spirito di agave affumicato si rivelò essere una corrispondenza naturale per la complessità amara del Campari e le note erbacee del vermouth dolce. Entro gli anni 2010, era diventato un punto fermo nei menu dei cocktail in tutto il mondo, introducendo molti bevitori al mezcal attraverso il formato familiare del Negroni.',
      vi: 'Mezcal Negroni xuất hiện vào giữa những năm 2000 như một phần của sự phục hưng cocktail thủ công, khi các bartender bắt đầu thử nghiệm mezcal trong các công thức cocktail cổ điển. Negroni, với cấu trúc phần bằng nhau đơn giản, là một tấm vải lý tưởng để thể hiện đặc tính độc đáo của mezcal. Rượu mạnh agave khói tỏ ra là sự kết hợp tự nhiên với độ phức tạp đắng của Campari và hương thảo mộc của vermouth ngọt. Đến những năm 2010, nó đã trở thành món chủ lực trên menu cocktail trên toàn thế giới, giới thiệu nhiều người uống với mezcal thông qua định dạng Negroni quen thuộc.',
    },
    named_after: {
      en: 'Named after mezcal, the smoky agave spirit that replaces gin in the classic Negroni formula.',
      it: 'Prende il nome dal mezcal, lo spirito di agave affumicato che sostituisce il gin nella formula classica del Negroni.',
      vi: 'Được đặt tên theo mezcal, rượu mạnh agave khói thay thế gin trong công thức Negroni cổ điển.',
    },
  },

  taste: {
    profile: ['bitter', 'smoky', 'herbal', 'complex'],
    description: {
      en: "Bold, complex, and intensely flavorful. Mezcal's smoke mingles with Campari's bitter orange and herbal notes, while sweet vermouth adds depth and balances the bitterness. More earthy and rustic than a gin Negroni, with a longer, more contemplative finish. The smoke doesn't dominate but adds a sophisticated layer.",
      it: "Audace, complesso e intensamente saporito. Il fumo del mezcal si mescola con l'arancia amara e le note erbacee del Campari, mentre il vermouth dolce aggiunge profondità e bilancia l'amarezza. Più terroso e rustico di un Negroni al gin, con un finale più lungo e contemplativo. Il fumo non domina ma aggiunge uno strato sofisticato.",
      vi: 'Táo bạo, phức tạp và hương vị mạnh mẽ. Khói của mezcal hòa quyện với cam đắng và hương thảo mộc của Campari, trong khi vermouth ngọt thêm độ sâu và cân bằng vị đắng. Đất đai và mộc mạc hơn Negroni gin, với kết thúc dài hơn, đáng suy ngẫm hơn. Khói không thống trị nhưng thêm một tầng tinh tế.',
    },
    first_impression: {
      en: 'Bitter Campari and smoke hit first, followed by herbal complexity',
      it: 'Campari amaro e fumo colpiscono per primi, seguiti da complessità erbacee',
      vi: 'Campari đắng và khói đập vào đầu tiên, tiếp theo là độ phức tạp thảo mộc',
    },
    finish: {
      en: 'Long, smoky finish with lingering bitter and herbal notes',
      it: 'Finale lungo e affumicato con note amare ed erbacee persistenti',
      vi: 'Kết thúc dài, khói với hương đắng và thảo mộc kéo dài',
    },
    balance: {
      en: 'Well-balanced - smoke adds depth without overwhelming bitter-sweet interplay',
      it: "Ben bilanciato - il fumo aggiunge profondità senza sopraffare l'interazione amaro-dolce",
      vi: 'Cân bằng tốt - khói thêm độ sâu mà không át sự tương tác đắng-ngọt',
    },
  },

  recommendations: {
    best_time: ['evening', 'aperitivo', 'late_night'],
    occasions: ['aperitivo', 'date_night', 'contemplative_drinking', 'digestivo'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Excellent as an aperitivo with cured meats, aged cheeses, or olives. Also pairs well with grilled meats, Mexican mole, smoked dishes, and rich, savory foods.',
      it: 'Eccellente come aperitivo con salumi, formaggi stagionati o olive. Si abbina bene anche con carni alla griglia, mole messicano, piatti affumicati e cibi ricchi e saporiti.',
      vi: 'Tuyệt vời như aperitivo với thịt nguội, phô mai già, hoặc ô liu. Cũng kết hợp tốt với thịt nướng, mole Mexico, các món hun khói và đồ ăn đậm đà, mặn mà.',
    },
    ideal_for: {
      en: 'Perfect for Negroni lovers seeking more complexity. Ideal for mezcal enthusiasts and adventurous drinkers who appreciate bitter cocktails. Great for those who want a contemplative, sipping experience.',
      it: "Perfetto per gli amanti del Negroni che cercano più complessità. Ideale per gli appassionati di mezcal e i bevitori avventurosi che apprezzano i cocktail amari. Ottimo per chi vuole un'esperienza contemplativa e da sorseggiare.",
      vi: 'Hoàn hảo cho những người yêu Negroni tìm kiếm nhiều độ phức tạp hơn. Lý tưởng cho những người đam mê mezcal và người uống phiêu lưu đánh giá cao cocktail đắng. Tuyệt vời cho những ai muốn trải nghiệm nhấm nháp, suy ngẫm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_MEZCAL',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' },
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir gently for 30-40 seconds until well chilled and diluted. Strain into a rocks glass over a large ice cube. Garnish with an orange twist, expressing oils over the drink.',
    it: "Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 30-40 secondi fino a raffreddare e diluire bene. Filtrare in un bicchiere rocks con un grande cubetto di ghiaccio. Guarnire con una scorza d'arancia, esprimendo gli oli sulla bevanda.",
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy nhẹ trong 30-40 giây cho đến khi lạnh và pha loãng đủ. Lọc vào ly rocks với một khối đá lớn. Trang trí với vỏ cam xoắn, vắt tinh dầu lên thức uống.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Orange twist',
    it: "Scorza d'arancia",
    vi: 'Vỏ cam xoắn',
  },

  ice: 'large_cube',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_MEZCAL'],

  flavor_profile: ['bitter', 'smoky', 'herbal', 'complex'],

  abv_estimate: 24,

  calories_estimate: 190,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['aperitivo', 'date_night', 'contemplative_drinking', 'digestivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['oaxaca-old-fashioned', 'mezcal-boulevardier', 'naked-and-famous'],

  notes_for_staff:
    "Use quality artisanal mezcal. Stir, don't shake. Large ice cube preferred to minimize dilution. Express orange oils over drink before garnishing. Can do half mezcal, half gin for lighter smoke.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/5345/mezcal-negroni',
    notes: 'Modern variation popularized during 2000s-2010s craft cocktail renaissance.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
