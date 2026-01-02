/**
 * IBA New Era Drinks: Penicillin
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const penicillin: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d',
  slug: 'penicillin',
  stable_key: 'e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',

  name: {
    en: 'Penicillin',
    it: 'Penicillin',
    vi: 'Penicillin',
    ko: '페니실린',
    ja: 'ペニシリン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'whisky', 'smoky', 'medicinal', 'contemporary-classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern whisky sour featuring blended Scotch, honey-ginger syrup, lemon juice, and a smoky Islay single malt float. This contemporary classic combines warming spices with medicinal smoke, creating a complex and comforting cocktail that has become one of the most influential drinks of the 21st century.',
    it: 'Un whisky sour moderno con Scotch blended, sciroppo di miele e zenzero, succo di limone e un float di single malt Islay affumicato. Questo classico contemporaneo combina spezie calde con fumo medicinale, creando un cocktail complesso e confortante che è diventato una delle bevande più influenti del XXI secolo.',
    vi: 'Một whisky sour hiện đại với Scotch pha trộn, siro mật ong-gừng, nước chanh và float single malt Islay khói. Tác phẩm đương đại này kết hợp gia vị ấm với khói dược liệu, tạo ra cocktail phức tạp và dễ chịu đã trở thành một trong những đồ uống có ảnh hưởng nhất thế kỷ 21.',
  },

  history: {
    created_year: '2005',
    origin: {
      city: 'New York City',
      bar: 'Milk & Honey',
      country: 'USA',
    },
    creator: {
      name: 'Sam Ross',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Australian bartender Sam Ross at Milk & Honey in New York City around 2005. Ross wanted to create a whisky sour that incorporated ginger and honey for their "medicinal" properties - hence the pharmaceutical name. The genius of the drink is the Islay whisky float, which adds a smoky complexity that emerges as you sip. The cocktail became wildly popular and is credited with sparking renewed interest in whisky cocktails and the use of fresh ginger in drinks. It remains one of the most ordered modern classics worldwide.',
      it: 'Creato dal barman australiano Sam Ross al Milk & Honey a New York City intorno al 2005. Ross voleva creare un whisky sour che incorporasse zenzero e miele per le loro proprietà "medicinali" - da cui il nome farmaceutico. Il genio della bevanda è il float di whisky Islay, che aggiunge una complessità affumicata che emerge mentre si sorseggia. Il cocktail divenne estremamente popolare ed è accreditato di aver riacceso l\'interesse per i cocktail di whisky e l\'uso dello zenzero fresco nelle bevande. Rimane uno dei classici moderni più ordinati in tutto il mondo.',
      vi: 'Được tạo ra bởi bartender Úc Sam Ross tại Milk & Honey ở New York City khoảng năm 2005. Ross muốn tạo một whisky sour kết hợp gừng và mật ong cho đặc tính "dược liệu" - do đó có tên dược phẩm. Điều thiên tài của đồ uống là float whisky Islay, thêm độ phức tạp khói nổi lên khi bạn nhâm nhi. Cocktail trở nên cực kỳ phổ biến và được ghi nhận đã khơi dậy sự quan tâm mới về cocktail whisky và việc sử dụng gừng tươi trong đồ uống. Nó vẫn là một trong những tác phẩm hiện đại được gọi nhiều nhất trên toàn thế giới.',
    },
    named_after: {
      en: 'Named "Penicillin" for its medicinal ingredients (honey and ginger) that are traditionally used to treat colds, playing on the pharmaceutical theme.',
      it: 'Chiamato "Penicillin" per i suoi ingredienti medicinali (miele e zenzero) che sono tradizionalmente usati per trattare i raffreddori, giocando sul tema farmaceutico.',
      vi: 'Được đặt tên "Penicillin" cho các nguyên liệu dược liệu (mật ong và gừng) thường được dùng để chữa cảm lạnh, chơi trên chủ đề dược phẩm.',
    },
  },

  taste: {
    profile: ['smoky', 'spicy', 'citrus', 'warming'],
    description: {
      en: 'Complex and layered with warming honey-ginger sweetness, bright lemon tartness, smooth Scotch character, and aromatic peat smoke from the Islay float. The ginger provides a spicy warmth while the smoke adds depth and intrigue. Incredibly comforting and sophisticated.',
      it: 'Complesso e stratificato con dolcezza calda di miele e zenzero, acidità vivace di limone, carattere morbido dello Scotch e fumo di torba aromatico dal float Islay. Lo zenzero fornisce un calore speziato mentre il fumo aggiunge profondità e intrigo. Incredibilmente confortante e sofisticato.',
      vi: 'Phức tạp và nhiều lớp với vị ngọt ấm mật ong-gừng, vị chua chanh tươi sáng, đặc tính Scotch mượt mà và khói than bùn thơm từ float Islay. Gừng mang lại hơi ấm cay trong khi khói thêm chiều sâu và hấp dẫn. Cực kỳ dễ chịu và tinh tế.',
    },
    first_impression: {
      en: 'Spicy ginger and honey warmth with bright citrus and subtle smoke',
      it: 'Calore speziato di zenzero e miele con agrumi vivaci e fumo sottile',
      vi: 'Hơi ấm cay gừng và mật ong với cam chanh tươi sáng và khói tinh tế',
    },
    finish: {
      en: 'Long, warming finish with lingering smoke, ginger spice, and honey sweetness',
      it: 'Finale lungo e caldo con fumo persistente, spezie di zenzero e dolcezza di miele',
      vi: 'Kết thúc dài, ấm với khói kéo dài, gia vị gừng và vị ngọt mật ong',
    },
    balance: {
      en: 'Perfectly balanced between sweet honey, spicy ginger, tart lemon, and smoky whisky complexity',
      it: 'Perfettamente bilanciato tra miele dolce, zenzero speziato, limone aspro e complessità affumicata del whisky',
      vi: 'Cân bằng hoàn hảo giữa mật ong ngọt, gừng cay, chanh chua và độ phức tạp whisky khói',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night', 'cold_weather'],
    occasions: ['nightcap', 'date_night', 'cocktail_party', 'winter_gathering'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with smoked salmon, grilled meats, aged cheeses, oysters, and hearty Scottish cuisine.',
      it: 'Eccellente con salmone affumicato, carni alla griglia, formaggi stagionati, ostriche e robusta cucina scozzese.',
      vi: 'Tuyệt vời với cá hồi hun khói, thịt nướng, phô mai ủ, hàu và ẩm thực Scotland đậm đà.',
    },
    ideal_for: {
      en: 'Perfect for whisky enthusiasts who appreciate smoky, complex flavors. Ideal for those seeking a warming, comforting cocktail with sophistication. Great for cold weather and as a conversation piece.',
      it: 'Perfetto per gli appassionati di whisky che apprezzano sapori affumicati e complessi. Ideale per chi cerca un cocktail caldo, confortante e sofisticato. Ottimo per il freddo e come argomento di conversazione.',
      vi: 'Hoàn hảo cho người đam mê whisky đánh giá cao hương vị khói, phức tạp. Lý tưởng cho những ai tìm kiếm cocktail ấm áp, dễ chịu với sự tinh tế. Tuyệt vời cho thời tiết lạnh và làm chủ đề trò chuyện.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SCOTCH_BLENDED',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Blended Scotch whisky', it: 'Scotch whisky blended', vi: 'Scotch whisky pha trộn' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_HONEY_GINGER_SYRUP',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Honey-ginger syrup', it: 'Sciroppo di miele e zenzero', vi: 'Siro mật ong-gừng' },
    },
    {
      ingredient_id: 'ING_SCOTCH_ISLAY',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Islay single malt Scotch (float)', it: 'Scotch single malt Islay (float)', vi: 'Scotch single malt Islay (float)' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add blended Scotch, lemon juice, and honey-ginger syrup to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a rocks glass filled with fresh ice (preferably one large cube). Float Islay single malt on top by pouring gently over the back of a bar spoon. Garnish with candied ginger.',
    it: 'Aggiungere Scotch blended, succo di limone e sciroppo di miele e zenzero in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere rocks pieno di ghiaccio fresco (preferibilmente un grande cubo). Far galleggiare il single malt Islay sopra versando delicatamente sul dorso di un cucchiaio da bar. Guarnire con zenzero candito.',
    vi: 'Thêm Scotch pha trộn, nước chanh và siro mật ong-gừng vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly rocks đầy đá tươi (tốt nhất là một viên lớn). Float single malt Islay lên trên bằng cách đổ nhẹ nhàng qua mặt sau thìa bar. Trang trí với gừng ngọt.',
  },

  glass: 'Rocks glass (Old Fashioned)',

  garnish: {
    en: 'Candied ginger (or fresh ginger slice)',
    it: 'Zenzero candito (o fetta di zenzero fresco)',
    vi: 'Gừng ngọt (hoặc lát gừng tươi)',
  },

  ice: 'large_cube',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SCOTCH_BLENDED'],

  flavor_profile: ['smoky', 'spicy', 'citrus', 'warming'],

  abv_estimate: 20,

  calories_estimate: 180,

  difficulty: 'medium',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['nightcap', 'date_night', 'cocktail_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bourbon-penicillin', 'japanese-penicillin'],

  notes_for_staff: 'Honey-ginger syrup: simmer fresh ginger with honey and water. Islay float is essential (Laphroaig, Ardbeg). Pour float gently over bar spoon back to create layer. One large ice cube preferred for slower dilution.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/penicillin/',
    note: 'IBA Official Recipe. Created by Sam Ross at Milk & Honey, NYC, 2005.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
