/**
 * Famous Cocktails: Penicillin
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const penicillin: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
  slug: 'penicillin',
  stable_key: '625344938475629384756293847562938475629384',

  name: {
    en: 'Penicillin',
    it: 'Penicillin',
    vi: 'Penicillin',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'whisky', 'ginger', 'scotch'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'One of the most influential modern cocktails, the Penicillin combines blended Scotch, fresh lemon, honey-ginger syrup, and a smoky Islay whisky float. Created by Sam Ross, this drink is both medicinal and indulgent, with warming ginger spice, bright citrus, honey sweetness, and a distinctive smoky finish.',
    it: 'Uno dei cocktail moderni più influenti, il Penicillin combina Scotch blended, limone fresco, sciroppo di miele e zenzero, e un float di whisky Islay affumicato. Creato da Sam Ross, questa bevanda è sia medicinale che indulgente, con zenzero piccante riscaldante, agrumi brillanti, dolcezza di miele e un finale affumicato distintivo.',
    vi: 'Một trong những cocktail hiện đại có ảnh hưởng nhất, Penicillin kết hợp Scotch pha trộn, chanh tươi, siro mật ong-gừng và một lớp whisky Islay khói nổi. Được tạo ra bởi Sam Ross, thức uống này vừa có tính dược liệu vừa nuông chiều, với gia vị gừng ấm áp, cam quýt tươi sáng, vị ngọt mật ong và kết thúc khói đặc trưng.',
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
      en: 'Sam Ross created the Penicillin in 2005 at the legendary Milk & Honey bar in New York City. Inspired by classic Gold Rush and Whiskey Sour formulas, Ross added ginger for spice and health benefits, and a smoky Islay Scotch float for aromatic complexity. The name references both the drink\'s medicinal qualities (honey, ginger, lemon) and its "curative" properties after a long night. It became an instant modern classic and is now on cocktail menus worldwide, helping introduce American drinkers to Scotch whisky.',
      it: 'Sam Ross creò il Penicillin nel 2005 al leggendario bar Milk & Honey di New York City. Ispirato dalle formule classiche del Gold Rush e del Whiskey Sour, Ross aggiunse lo zenzero per il piccante e i benefici per la salute, e un float di Scotch Islay affumicato per la complessità aromatica. Il nome fa riferimento sia alle qualità medicinali della bevanda (miele, zenzero, limone) che alle sue proprietà "curative" dopo una lunga notte. Divenne subito un classico moderno e ora è nei menu dei cocktail in tutto il mondo, aiutando a introdurre i bevitori americani al whisky scozzese.',
      vi: 'Sam Ross đã tạo ra Penicillin vào năm 2005 tại quán bar huyền thoại Milk & Honey ở New York City. Lấy cảm hứng từ công thức cổ điển Gold Rush và Whiskey Sour, Ross đã thêm gừng cho vị cay và lợi ích sức khỏe, và một lớp Scotch Islay khói nổi cho độ phức tạp thơm. Cái tên ám chỉ cả đặc tính dược liệu của thức uống (mật ong, gừng, chanh) và tính "chữa bệnh" của nó sau một đêm dài. Nó ngay lập tức trở thành tác phẩm cổ điển hiện đại và hiện nay có mặt trên menu cocktail trên toàn thế giới, giúp giới thiệu người uống Mỹ với whisky Scotch.',
    },
    named_after: {
      en: "Named after penicillin, the antibiotic, referencing the cocktail's medicinal ingredients (honey, ginger, lemon) traditionally used to treat colds.",
      it: "Prende il nome dalla penicillina, l'antibiotico, facendo riferimento agli ingredienti medicinali del cocktail (miele, zenzero, limone) tradizionalmente usati per curare i raffreddori.",
      vi: 'Được đặt tên theo penicillin, kháng sinh, ám chỉ các nguyên liệu dược liệu của cocktail (mật ong, gừng, chanh) truyền thống dùng để chữa cảm lạnh.',
    },
  },

  taste: {
    profile: ['spicy', 'smoky', 'honey', 'citrus'],
    description: {
      en: "Complex, warming, and perfectly balanced. Blended Scotch provides a smooth whisky base, while honey-ginger syrup adds warming spice and floral sweetness. Fresh lemon contributes brightness, and the Islay Scotch float delivers an aromatic smoky finish that doesn't overpower. Medicinal yet indulgent, with layers of flavor that evolve with each sip.",
      it: 'Complesso, riscaldante e perfettamente bilanciato. Lo Scotch blended fornisce una base di whisky liscia, mentre lo sciroppo di miele e zenzero aggiunge spezie riscaldanti e dolcezza floreale. Il limone fresco contribuisce con brillantezza, e il float di Scotch Islay offre un finale affumicato aromatico che non sopraffà. Medicinale ma indulgente, con strati di sapore che evolvono ad ogni sorso.',
      vi: 'Phức tạp, ấm áp và cân bằng hoàn hảo. Scotch pha trộn cung cấp cơ sở whisky mượt mà, trong khi siro mật ong-gừng thêm gia vị ấm áp và vị ngọt hoa. Chanh tươi đóng góp độ tươi sáng, và lớp Scotch Islay nổi mang đến kết thúc khói thơm không át vị. Có tính dược liệu nhưng nuông chiều, với nhiều tầng hương vị phát triển qua mỗi ngụm.',
    },
    first_impression: {
      en: 'Honey and ginger warmth hit first, followed by smoke and citrus',
      it: 'Il calore di miele e zenzero colpisce per primo, seguito da fumo e agrumi',
      vi: 'Hơi ấm mật ong và gừng đập vào đầu tiên, tiếp theo là khói và cam quýt',
    },
    finish: {
      en: 'Long, smoky finish with lingering ginger spice and peat',
      it: 'Finale lungo e affumicato con zenzero piccante persistente e torba',
      vi: 'Kết thúc dài, khói với gia vị gừng và than bùn kéo dài',
    },
    balance: {
      en: 'Expertly balanced - sweet, sour, spicy, and smoky in perfect harmony',
      it: 'Bilanciato in modo esperto - dolce, aspro, piccante e affumicato in perfetta armonia',
      vi: 'Cân bằng điêu luyện - ngọt, chua, cay và khói hòa quyện hoàn hảo',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night', 'winter'],
    occasions: ['digestivo', 'date_night', 'contemplative_drinking', 'cold_weather'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent with smoked salmon, aged cheeses, roasted meats, or dark chocolate. Also pairs well with Scottish dishes, seafood, and rich, savory foods. Traditional pairing: oysters.',
      it: 'Eccellente con salmone affumicato, formaggi stagionati, carni arrosto o cioccolato fondente. Si abbina bene anche con piatti scozzesi, frutti di mare e cibi ricchi e saporiti. Abbinamento tradizionale: ostriche.',
      vi: 'Tuyệt vời với cá hồi hun khói, phô mai già, thịt rang, hoặc chocolate đen. Cũng kết hợp tốt với các món Scotland, hải sản và đồ ăn đậm đà, mặn mà. Kết hợp truyền thống: hàu.',
    },
    ideal_for: {
      en: 'Perfect for whisky lovers exploring Scotch. Ideal for those who enjoy complex, layered cocktails with warming qualities. Great for cold weather and contemplative sipping. A must-try for any serious cocktail enthusiast.',
      it: 'Perfetto per gli amanti del whisky che esplorano lo Scotch. Ideale per chi ama i cocktail complessi e stratificati con qualità riscaldanti. Ottimo per il freddo e per sorseggiare in modo contemplativo. Da provare assolutamente per ogni serio appassionato di cocktail.',
      vi: 'Hoàn hảo cho những người yêu whisky khám phá Scotch. Lý tưởng cho những ai thích cocktail phức tạp, nhiều tầng với đặc tính ấm áp. Tuyệt vời cho thời tiết lạnh và nhấm nháp suy ngẫm. Bắt buộc phải thử cho bất kỳ người đam mê cocktail nghiêm túc nào.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BLENDED_SCOTCH',
      quantity: { amount: 60, unit: 'ml' },
      display_name: {
        en: 'Blended Scotch whisky',
        it: 'Scotch whisky blended',
        vi: 'Whisky Scotch pha trộn',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_HONEY_GINGER_SYRUP',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Honey-ginger syrup',
        it: 'Sciroppo miele-zenzero',
        vi: 'Siro mật ong-gừng',
      },
    },
    {
      ingredient_id: 'ING_ISLAY_SCOTCH',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: {
        en: 'Islay Scotch (float)',
        it: 'Islay Scotch (float)',
        vi: 'Islay Scotch (nổi)',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add blended Scotch, lemon juice, and honey-ginger syrup to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a rocks glass over fresh ice. Float Islay Scotch on top by gently pouring over the back of a barspoon. Garnish with candied ginger.',
    it: 'Aggiungere Scotch blended, succo di limone e sciroppo miele-zenzero in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere rocks con ghiaccio fresco. Far galleggiare Islay Scotch sopra versando delicatamente sul retro di un cucchiaio da bar. Guarnire con zenzero candito.',
    vi: 'Thêm Scotch pha trộn, nước chanh và siro mật ong-gừng vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly rocks với đá mới. Đổ Islay Scotch nổi lên trên bằng cách rót nhẹ nhàng qua mặt sau của thìa bar. Trang trí với gừng kẹo.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Candied ginger',
    it: 'Zenzero candito',
    vi: 'Gừng kẹo',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BLENDED_SCOTCH'],

  flavor_profile: ['spicy', 'smoky', 'honey', 'citrus'],

  abv_estimate: 22,

  calories_estimate: 190,

  difficulty: 'intermediate',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'honey_intolerance', 'ginger_intolerance'],
    suitable_for_diets: ['vegetarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['digestivo', 'date_night', 'contemplative_drinking', 'cold_weather'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['mexican-penicillin', 'bourbon-penicillin', 'rye-penicillin'],

  notes_for_staff:
    'Honey-ginger syrup: simmer equal parts honey, water, and sliced ginger, then strain. Use smoky Islay like Laphroaig or Ardbeg for float. Float technique essential - pour gently over barspoon back. Fresh lemon juice only.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/penicillin/',
    notes:
      'Created by Sam Ross at Milk & Honey, New York City, 2005. One of the most influential modern cocktails.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
