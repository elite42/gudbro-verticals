/**
 * IBA Unforgettables: Hanky Panky
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const hankyPanky: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '07a3a9cb-5e65-4114-91a4-a842cf9cd766',
  slug: 'hanky-panky',
  stable_key: 'd2d5f292e7945552b42afece882cc71f83a6041a',

  name: {
    en: 'Hanky Panky',
    it: 'Hanky Panky',
    vi: 'Hanky Panky',
    ko: '행키 팽키',
    ja: 'ハンキーパンキー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'historic', 'bitter'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A legendary cocktail created by Ada Coleman, one of the first female head bartenders. The Hanky Panky combines gin and sweet vermouth with a distinctive bitter edge from Fernet-Branca, creating a sophisticated and complex drink.',
    it: 'Un cocktail leggendario creato da Ada Coleman, una delle prime donne capo barman. L\'Hanky Panky combina gin e vermouth dolce con un distintivo tocco amaro del Fernet-Branca, creando un drink sofisticato e complesso.',
    vi: 'Một cocktail huyền thoại được tạo ra bởi Ada Coleman, một trong những nữ trưởng bartender đầu tiên. Hanky Panky kết hợp gin và vermouth ngọt với vị đắng đặc trưng từ Fernet-Branca, tạo ra một thức uống tinh tế và phức tạp.',
  },

  history: {
    created_year: '1903',
    origin: {
      city: 'London',
      bar: 'American Bar, Savoy Hotel',
      country: 'United Kingdom',
    },
    creator: {
      name: 'Ada Coleman',
      profession: 'bartender',
    },
    story: {
      en: 'Ada Coleman was born in 1875 and promoted to head bartender of the American Bar at the Savoy Hotel in 1903, becoming one of the most influential bartenders of the early 20th century. She held this position for 23 years. The Hanky Panky was invented in response to a request from actor Sir Charles Hawtrey, who asked for "something with a bit of punch in it." After hours of experimentation, Coleman created this cocktail. When Hawtrey first tasted it, he exclaimed, "By Jove! That is the real hanky-panky!" In those days, the term "hanky panky" simply referred to trickery or magic. The recipe was later immortalized in Harry Craddock\'s 1930 Savoy Cocktail Book. Coleman died in 1966 at age 91, leaving a lasting legacy in cocktail history.',
      it: 'Ada Coleman nacque nel 1875 e fu promossa a capo barman dell\'American Bar al Savoy Hotel nel 1903, diventando una delle barman più influenti dell\'inizio del XX secolo. Ha ricoperto questa posizione per 23 anni. L\'Hanky Panky fu inventato in risposta a una richiesta dell\'attore Sir Charles Hawtrey, che chiese "qualcosa con un po\' di punch". Dopo ore di sperimentazione, Coleman creò questo cocktail. Quando Hawtrey lo assaggiò per la prima volta, esclamò: "Perdio! Questo è il vero hanky-panky!" A quei tempi, il termine "hanky panky" si riferiva semplicemente a trucchi o magia. La ricetta fu poi immortalata nel Savoy Cocktail Book di Harry Craddock del 1930. Coleman morì nel 1966 all\'età di 91 anni, lasciando un\'eredità duratura nella storia dei cocktail.',
      vi: 'Ada Coleman sinh năm 1875 và được thăng chức trưởng bartender của American Bar tại Savoy Hotel vào năm 1903, trở thành một trong những bartender có ảnh hưởng nhất đầu thế kỷ 20. Bà giữ vị trí này trong 23 năm. Hanky Panky được phát minh để đáp ứng yêu cầu của diễn viên Sir Charles Hawtrey, người yêu cầu "thứ gì đó có chút sức mạnh". Sau nhiều giờ thử nghiệm, Coleman đã tạo ra cocktail này. Khi Hawtrey nếm thử lần đầu, ông thốt lên: "Trời ơi! Đây mới là hanky-panky thực sự!" Vào thời đó, thuật ngữ "hanky panky" chỉ đơn giản là mưu mẹo hoặc phép thuật. Công thức sau đó được ghi lại trong Savoy Cocktail Book của Harry Craddock năm 1930. Coleman qua đời năm 1966 ở tuổi 91, để lại di sản lâu dài trong lịch sử cocktail.',
    },
    named_after: {
      en: 'Named by Sir Charles Hawtrey upon first tasting. "Hanky panky" in early 1900s meant "trickery" or "magic," not its modern suggestive meaning.',
      it: 'Nominato da Sir Charles Hawtrey alla prima degustazione. "Hanky panky" nei primi del 1900 significava "trucco" o "magia", non il suo moderno significato suggestivo.',
      vi: 'Được đặt tên bởi Sir Charles Hawtrey khi nếm thử lần đầu. "Hanky panky" vào đầu những năm 1900 có nghĩa là "mưu mẹo" hoặc "phép thuật", không phải ý nghĩa gợi ý hiện đại.',
    },
  },

  taste: {
    profile: ['bitter', 'herbal', 'complex'],
    description: {
      en: 'A sophisticated variation on the Martinez with a complex, bittersweet character. The gin provides botanical foundation, sweet vermouth adds richness and depth, while Fernet-Branca contributes an intense herbal bitterness that defines the drink. The result is bold, intriguing, and deeply satisfying.',
      it: 'Una variazione sofisticata del Martinez con un carattere complesso e agrodolce. Il gin fornisce una base botanica, il vermouth dolce aggiunge ricchezza e profondità, mentre il Fernet-Branca contribuisce con un\'intensa amarezza erbacea che definisce il drink. Il risultato è audace, intrigante e profondamente soddisfacente.',
      vi: 'Một biến thể tinh tế của Martinez với tính cách phức tạp, ngọt đắng. Gin cung cấp nền tảng thảo mộc, vermouth ngọt thêm độ phong phú và chiều sâu, trong khi Fernet-Branca đóng góp vị đắng thảo mộc mãnh liệt định hình thức uống. Kết quả là táo bạo, hấp dẫn và thỏa mãn sâu sắc.',
    },
    first_impression: {
      en: 'Immediate herbal complexity from the Fernet hits first, followed by the gin\'s botanicals and vermouth\'s sweetness. The bitterness is pronounced but not overwhelming.',
      it: 'La complessità erbacea immediata del Fernet colpisce per prima, seguita dai botanici del gin e dalla dolcezza del vermouth. L\'amarezza è pronunciata ma non travolgente.',
      vi: 'Độ phức tạp thảo mộc tức thời từ Fernet xuất hiện đầu tiên, theo sau là thảo mộc của gin và vị ngọt của vermouth. Vị đắng rõ ràng nhưng không áp đảo.',
    },
    finish: {
      en: 'Long, bitter finish with lingering herbal notes from the Fernet. The orange zest adds a bright citrus accent that balances the intensity.',
      it: 'Finale lungo e amaro con note erbacee persistenti del Fernet. La scorza d\'arancia aggiunge un accento agrumato brillante che bilancia l\'intensità.',
      vi: 'Hậu vị dài, đắng với các nốt thảo mộc kéo dài từ Fernet. Vỏ cam thêm điểm nhấn cam quýt tươi sáng cân bằng cường độ.',
    },
    balance: {
      en: 'The equal parts gin and vermouth create a harmonious base, while the Fernet provides just enough bitterness to add intrigue without dominating. A masterclass in balanced complexity.',
      it: 'Le parti uguali di gin e vermouth creano una base armoniosa, mentre il Fernet fornisce abbastanza amarezza per aggiungere intrigo senza dominare. Un esempio di complessità equilibrata.',
      vi: 'Tỷ lệ bằng nhau của gin và vermouth tạo nên nền hài hòa, trong khi Fernet cung cấp đủ vị đắng để thêm sự hấp dẫn mà không chi phối. Một kiệt tác về sự phức tạp cân bằng.',
    },
  },

  recommendations: {
    best_time: ['evening', 'night'],
    occasions: ['aperitivo', 'digestif', 'date_night', 'formal'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Rich cheeses, cured meats, dark chocolate, mushroom dishes, roasted nuts. The bitter profile makes it excellent as a digestif after heavy meals.',
      it: 'Formaggi ricchi, salumi, cioccolato fondente, piatti di funghi, noci tostate. Il profilo amaro lo rende eccellente come digestivo dopo pasti pesanti.',
      vi: 'Phô mai đậm đà, thịt muối, sô cô la đen, món nấm, hạt rang. Hồ sơ đắng làm cho nó xuất sắc như một digestif sau bữa ăn nặng.',
    },
    ideal_for: {
      en: 'Adventurous drinkers who appreciate bitter, herbal flavors. Perfect for those seeking a sophisticated, spirit-forward cocktail with historical significance.',
      it: 'Bevitori avventurosi che apprezzano i sapori amari ed erbacei. Perfetto per chi cerca un cocktail sofisticato, incentrato sullo spirito, con significato storico.',
      vi: 'Người uống mạo hiểm đánh giá cao hương vị đắng, thảo mộc. Hoàn hảo cho những ai tìm kiếm cocktail tinh tế, tập trung vào rượu mạnh có ý nghĩa lịch sử.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'London Dry Gin', it: 'Gin London Dry', vi: 'Gin London Dry' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Sweet Red Vermouth', it: 'Vermouth Rosso Dolce', vi: 'Vermouth đỏ ngọt' },
    },
    {
      ingredient_id: 'ING_FERNET_BRANCA',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Fernet-Branca', it: 'Fernet-Branca', vi: 'Fernet-Branca' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into mixing glass with ice cubes. Stir well until properly chilled. Strain into chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti nel mixing glass con cubetti di ghiaccio. Mescolare bene fino a quando ben raffreddato. Filtrare nel bicchiere da cocktail ghiacciato.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn với đá viên. Khuấy đều cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Orange zest',
    it: 'Scorza d\'arancia',
    vi: 'Vỏ cam',
  },

  ice: 'none',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['bitter', 'herbal', 'complex', 'boozy'],
  abv_estimate: 28,
  calories_estimate: 180,
  difficulty: 'easy',
  prep_time_seconds: 120,

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
  season_tags: ['all_year'],
  occasion_tags: ['aperitivo', 'digestif', 'date_night', 'formal'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    {
      name: 'Modern Hanky Panky',
      description: 'Some variations use less Fernet (3-5ml) for a lighter bitter note',
    },
    {
      name: 'Hanky Panky Royale',
      description: 'Top with champagne for an effervescent twist',
    },
  ],

  notes_for_staff: 'Fernet-Branca is essential - no substitutions. The bitter profile is not for everyone - describe the taste before serving. Always express the orange oils over the drink. Chill glass thoroughly. This is an acquired taste, perfect for amaro lovers.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/hanky-panky/',
    note: 'IBA Official Recipe. Originally created by Ada Coleman at the Savoy Hotel.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
