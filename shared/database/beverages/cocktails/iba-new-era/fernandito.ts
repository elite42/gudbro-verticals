/**
 * IBA New Era Drinks: Fernandito
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const fernandito: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b4c5d6e7-8f9a-0b1c-2d3e-4f5a6b7c8d9e',
  slug: 'fernandito',
  stable_key: 'f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6',

  name: {
    en: 'Fernandito',
    it: 'Fernandito',
    vi: 'Fernandito',
    ko: '페르난디토',
    ja: 'フェルナンディート',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'italian', 'amaro', 'simple', 'digestivo', 'bitter'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A simple yet sophisticated Italian digestivo combining Fernet-Branca with cola and ice. This minimal serve showcases the intense herbal bitterness of Fernet balanced by cola's sweetness and effervescence, creating a refreshing and complex drink that's beloved in Argentina and increasingly popular worldwide.",
    it: "Un digestivo italiano semplice ma sofisticato che combina Fernet-Branca con cola e ghiaccio. Questo servizio minimale mostra l'intensa amarezza erbacea del Fernet bilanciata dalla dolcezza e dall'effervescenza della cola, creando una bevanda rinfrescante e complessa amata in Argentina e sempre più popolare in tutto il mondo.",
    vi: 'Một digestivo Ý đơn giản nhưng tinh tế kết hợp Fernet-Branca với cola và đá. Phục vụ tối giản này thể hiện vị đắng thảo mộc mãnh liệt của Fernet cân bằng bởi vị ngọt và sự sủi bọt của cola, tạo ra đồ uống sảng khoái và phức tạp được yêu thích ở Argentina và ngày càng phổ biến trên toàn thế giới.',
  },

  history: {
    created_year: '1950s',
    origin: {
      city: 'Córdoba',
      bar: 'Unknown',
      country: 'Argentina',
    },
    creator: {
      name: 'Unknown',
      profession: 'unknown',
    },
    story: {
      en: 'The Fernandito emerged in Argentina in the 1950s-60s, where Fernet-Branca became extraordinarily popular among Italian immigrants. The drink\'s name is a diminutive of "Fernando," possibly referring to an early drinker or bartender who popularized the serve. In Córdoba, Argentina, Fernet con cola became a cultural phenomenon, with Argentinians consuming more Fernet-Branca per capita than any other country, including Italy. The drink represents the successful fusion of Italian bitter culture with Argentine social drinking traditions.',
      it: 'Il Fernandito emerse in Argentina negli anni 1950-60, dove il Fernet-Branca divenne straordinariamente popolare tra gli immigrati italiani. Il nome della bevanda è un diminutivo di "Fernando," forse riferito a un primo bevitore o barman che rese popolare il servizio. A Córdoba, Argentina, il Fernet con cola divenne un fenomeno culturale, con gli argentini che consumano più Fernet-Branca pro capite di qualsiasi altro paese, inclusa l\'Italia. La bevanda rappresenta la fusione riuscita della cultura amara italiana con le tradizioni di bevute sociali argentine.',
      vi: 'Fernandito xuất hiện ở Argentina những năm 1950-60, nơi Fernet-Branca trở nên cực kỳ phổ biến trong số người nhập cư Ý. Tên đồ uống là dạng thu nhỏ của "Fernando," có thể đề cập đến người uống hoặc bartender đầu tiên phổ biến cách phục vụ. Ở Córdoba, Argentina, Fernet con cola trở thành hiện tượng văn hóa, với người Argentina tiêu thụ Fernet-Branca bình quân đầu người nhiều hơn bất kỳ quốc gia nào, kể cả Ý. Đồ uống đại diện cho sự hòa quyện thành công của văn hóa đắng Ý với truyền thống uống giao lưu Argentina.',
    },
    named_after: {
      en: '"Fernandito" is the diminutive form of "Fernando" in Spanish, possibly named after an early patron or bartender who popularized the drink.',
      it: '"Fernandito" è la forma diminutiva di "Fernando" in spagnolo, forse chiamato così da un primo cliente o barman che rese popolare la bevanda.',
      vi: '"Fernandito" là dạng thu nhỏ của "Fernando" trong tiếng Tây Ban Nha, có thể được đặt tên theo khách hàng hoặc bartender đầu tiên phổ biến đồ uống.',
    },
  },

  taste: {
    profile: ['bitter', 'herbal', 'sweet', 'refreshing'],
    description: {
      en: "Intensely bitter and herbal from Fernet-Branca's complex blend of botanicals (saffron, myrrh, chamomile, etc.), balanced by cola's caramel sweetness and effervescence. The combination is surprisingly harmonious, with neither element overpowering the other.",
      it: "Intensamente amaro ed erbaceo dalla complessa miscela di botanici del Fernet-Branca (zafferano, mirra, camomilla, ecc.), bilanciato dalla dolcezza caramellata e dall'effervescenza della cola. La combinazione è sorprendentemente armoniosa, senza che nessun elemento sopraffaccia l'altro.",
      vi: 'Đắng mãnh liệt và thảo mộc từ hỗn hợp thực vật phức tạp của Fernet-Branca (nghệ tây, mộc dược, hoa cúc, v.v.), cân bằng bởi vị ngọt caramel và sự sủi bọt của cola. Sự kết hợp hài hòa đáng ngạc nhiên, không có yếu tố nào áp đảo yếu tố kia.',
    },
    first_impression: {
      en: 'Bold herbal bitterness with cola sweetness and mint-menthol coolness',
      it: 'Audace amarezza erbacea con dolcezza di cola e freschezza menta-mentolo',
      vi: 'Vị đắng thảo mộc táo bạo với vị ngọt cola và độ mát bạc hà-menthol',
    },
    finish: {
      en: 'Long, bitter finish with lingering herbal complexity and mint freshness',
      it: 'Finale lungo e amaro con complessità erbacea persistente e freschezza di menta',
      vi: 'Kết thúc dài, đắng với độ phức tạp thảo mộc kéo dài và độ tươi bạc hà',
    },
    balance: {
      en: 'Well balanced between intense bitterness and cola sweetness - an acquired taste that rewards exploration',
      it: "Ben bilanciato tra amarezza intensa e dolcezza di cola - un gusto acquisito che premia l'esplorazione",
      vi: 'Cân bằng tốt giữa vị đắng mãnh liệt và vị ngọt cola - hương vị quen dần đáng khám phá',
    },
  },

  recommendations: {
    best_time: ['evening', 'after_dinner', 'late_night'],
    occasions: ['digestivo', 'social_gathering', 'casual', 'party'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Excellent as a digestivo after heavy meals, with Argentine asado, grilled meats, empanadas, and rich pasta dishes.',
      it: 'Eccellente come digestivo dopo pasti pesanti, con asado argentino, carni alla griglia, empanadas e piatti di pasta ricchi.',
      vi: 'Tuyệt vời làm digestivo sau bữa ăn nặng, với asado Argentina, thịt nướng, empanada và món mì ống đậm đà.',
    },
    ideal_for: {
      en: 'Perfect for those who appreciate bitter digestivos and amaro culture. Ideal for adventurous drinkers seeking an authentic Argentine experience. Great for social drinking and after-dinner refreshment.',
      it: "Perfetto per chi apprezza digestivi amari e cultura dell'amaro. Ideale per bevitori avventurosi che cercano un'autentica esperienza argentina. Ottimo per bevute sociali e rinfreschi dopo cena.",
      vi: 'Hoàn hảo cho những ai đánh giá cao digestivo đắng và văn hóa amaro. Lý tưởng cho người uống phiêu lưu tìm kiếm trải nghiệm Argentina đích thực. Tuyệt vời để uống giao lưu và giải khát sau bữa tối.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_FERNET_BRANCA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Fernet-Branca', it: 'Fernet-Branca', vi: 'Fernet-Branca' },
    },
    {
      ingredient_id: 'ING_COLA',
      quantity: { amount: 100, unit: 'ml' },
      display_name: { en: 'Cola', it: 'Cola', vi: 'Cola' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball or rocks glass with ice cubes. Add Fernet-Branca. Top with cola. Stir gently to combine. No garnish needed - the drink speaks for itself.',
    it: 'Riempire un bicchiere highball o rocks con cubetti di ghiaccio. Aggiungere Fernet-Branca. Completare con cola. Mescolare delicatamente per combinare. Nessuna guarnizione necessaria - la bevanda parla da sola.',
    vi: 'Đổ đầy ly highball hoặc rocks với đá viên. Thêm Fernet-Branca. Thêm cola lên trên. Khuấy nhẹ nhàng để trộn đều. Không cần trang trí - đồ uống tự nói lên điều đó.',
  },

  glass: 'Highball or Rocks glass',

  garnish: {
    en: 'None (optional: lemon or lime wedge)',
    it: 'Nessuna (opzionale: spicchio di limone o lime)',
    vi: 'Không có (tùy chọn: múi chanh hoặc chanh)',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_FERNET_BRANCA'],

  flavor_profile: ['bitter', 'herbal', 'sweet', 'refreshing'],

  abv_estimate: 10,

  calories_estimate: 150,

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
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['digestivo', 'casual', 'social'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['fernet-con-cola', 'fernando'],

  notes_for_staff:
    'Fernet-Branca is essential - do not substitute. Ratio can be adjusted to taste (Argentine style is typically 50/50). Serve very cold with plenty of ice. An acquired taste that many grow to love.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/fernandito/',
    notes: 'IBA Official Recipe. Popular in Argentina since the 1950s-60s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
