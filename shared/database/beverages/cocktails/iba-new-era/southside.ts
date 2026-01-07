/**
 * IBA New Era Drinks: Southside
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const southside: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4f6a8b0-5c7e-6f9d-1a3b-4e6c8f0b2d5a',
  slug: 'southside',
  stable_key: 'e5g7b9d1f3a5c7e9b1d3f5a7c9e1b3d5',

  name: {
    en: 'Southside',
    it: 'Southside',
    vi: 'Southside',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'prohibition-era', 'refreshing', 'minty', 'classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshing Prohibition-era cocktail combining gin, fresh lemon juice, simple syrup, and mint. Often described as a "gin Mojito," the Southside is a bright, herbaceous drink that perfectly balances citrus tartness with cooling mint.',
    it: 'Un rinfrescante cocktail dell\'era del Proibizionismo che combina gin, succo di limone fresco, sciroppo semplice e menta. Spesso descritto come un "Mojito al gin," il Southside è un drink luminoso ed erbaceo che bilancia perfettamente l\'acidità degli agrumi con la menta rinfrescante.',
    vi: 'Một cocktail sảng khoái thời kỳ Cấm rượu kết hợp gin, nước cốt chanh tươi, xi-rô đơn giản và bạc hà. Thường được mô tả như "Mojito gin," Southside là một thức uống tươi sáng, thảo mộc cân bằng hoàn hảo vị chua cam quýt với bạc hà mát lạnh.',
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Chicago / New York',
      bar: 'Multiple claims',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Southside's origins are debated, with two main origin stories. One claims it was created during Prohibition in Chicago, named after the South Side neighborhood and favored by gangsters like Al Capone - the mint was added to mask the harsh taste of bathtub gin. The other story attributes it to the Southside Sportsmen's Club on Long Island, New York, where it was served as a refined country club drink. Regardless of its true origin, the Southside became a staple of the Prohibition era and has enjoyed a major revival in modern cocktail bars.",
      it: "Le origini del Southside sono dibattute, con due storie principali. Una sostiene che sia stato creato durante il Proibizionismo a Chicago, prendendo il nome dal quartiere South Side e favorito da gangster come Al Capone - la menta fu aggiunta per mascherare il sapore aspro del gin fatto in casa. L'altra storia lo attribuisce al Southside Sportsmen's Club a Long Island, New York, dove veniva servito come drink raffinato da country club. Indipendentemente dalla sua vera origine, il Southside divenne un pilastro dell'era del Proibizionismo e ha goduto di un grande revival nei bar moderni.",
      vi: "Nguồn gốc của Southside được tranh luận, với hai câu chuyện chính. Một người cho rằng nó được tạo ra trong thời kỳ Cấm rượu ở Chicago, được đặt theo tên khu phố South Side và được ưa chuộng bởi các băng đảng như Al Capone - bạc hà được thêm vào để che giấu vị khắc nghiệt của gin tự chế. Câu chuyện khác quy nó cho Southside Sportsmen's Club ở Long Island, New York, nơi nó được phục vụ như một thức uống tinh tế ở câu lạc bộ đồng quê. Bất kể nguồn gốc thực sự, Southside trở thành nền tảng của thời kỳ Cấm rượu và đã có sự hồi sinh lớn trong các quán bar cocktail hiện đại.",
    },
    named_after: {
      en: "Named either after Chicago's South Side neighborhood or the Southside Sportsmen's Club on Long Island - both stories have their advocates.",
      it: "Prende il nome dal quartiere South Side di Chicago o dal Southside Sportsmen's Club a Long Island - entrambe le storie hanno i loro sostenitori.",
      vi: "Được đặt theo tên khu phố South Side của Chicago hoặc Southside Sportsmen's Club ở Long Island - cả hai câu chuyện đều có những người ủng hộ.",
    },
  },

  taste: {
    profile: ['refreshing', 'citrus', 'minty', 'herbaceous'],
    description: {
      en: 'Bright and invigorating. The gin provides botanical complexity, fresh lemon juice adds tartness, simple syrup balances with sweetness, and fresh mint brings cooling herbal notes. The result is a perfectly balanced, garden-fresh cocktail.',
      it: 'Luminoso e rinvigorante. Il gin fornisce complessità botanica, il succo di limone fresco aggiunge acidità, lo sciroppo semplice bilancia con dolcezza, e la menta fresca porta note erbacee rinfrescanti. Il risultato è un cocktail perfettamente bilanciato e fresco come un giardino.',
      vi: 'Tươi sáng và sảng khoái. Gin cung cấp độ phức tạp thực vật, nước cốt chanh tươi thêm vị chua, xi-rô đơn giản cân bằng với vị ngọt, và bạc hà tươi mang đến hương thảo mộc mát lạnh. Kết quả là một cocktail cân bằng hoàn hảo, tươi như vườn.',
    },
    first_impression: {
      en: 'Fresh mint and bright lemon hit first, followed by the botanical character of gin',
      it: 'La menta fresca e il limone brillante colpiscono per primi, seguiti dal carattere botanico del gin',
      vi: 'Bạc hà tươi và chanh tươi sáng đập vào đầu tiên, tiếp theo là đặc tính thực vật của gin',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering mint and citrus',
      it: 'Finale pulito e rinfrescante con menta e agrumi persistenti',
      vi: 'Kết thúc sạch, sảng khoái với bạc hà và cam quýt kéo dài',
    },
    balance: {
      en: 'Beautifully balanced between tart, sweet, and herbal - neither too sour nor too sweet',
      it: 'Magnificamente bilanciato tra acido, dolce ed erbaceo - né troppo acido né troppo dolce',
      vi: 'Cân bằng tuyệt đẹp giữa chua, ngọt và thảo mộc - không quá chua cũng không quá ngọt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'brunch'],
    occasions: ['garden_party', 'brunch', 'summer_gathering', 'cocktail_hour'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with light summer fare: salads, grilled fish, fresh oysters, cucumber sandwiches, and herb-crusted chicken. Also pairs beautifully with Vietnamese and Thai cuisine.',
      it: 'Perfetto con piatti leggeri estivi: insalate, pesce alla griglia, ostriche fresche, sandwich al cetriolo e pollo in crosta di erbe. Si abbina anche magnificamente con la cucina vietnamita e thailandese.',
      vi: 'Hoàn hảo với món ăn mùa hè nhẹ: salad, cá nướng, hàu tươi, bánh sandwich dưa chuột và gà phủ thảo mộc. Cũng kết hợp tuyệt vời với ẩm thực Việt Nam và Thái Lan.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy refreshing, herbaceous cocktails. Ideal for gin lovers seeking something lighter and more refreshing than a traditional martini. Great for anyone who loves Mojitos but wants to explore gin-based drinks.',
      it: 'Perfetto per chi ama cocktail rinfrescanti ed erbacei. Ideale per gli amanti del gin che cercano qualcosa di più leggero e rinfrescante di un martini tradizionale. Ottimo per chiunque ami i Mojito ma voglia esplorare drink a base di gin.',
      vi: 'Hoàn hảo cho những ai thích cocktail sảng khoái, thảo mộc. Lý tưởng cho người yêu gin tìm kiếm thứ gì đó nhẹ hơn và sảng khoái hơn martini truyền thống. Tuyệt vời cho bất kỳ ai yêu Mojito nhưng muốn khám phá đồ uống gốc gin.',
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
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Simple syrup',
        it: 'Sciroppo semplice',
        vi: 'Xi-rô đơn giản',
      },
    },
    {
      ingredient_id: 'ING_MINT_LEAVES',
      quantity: { amount: 6, unit: 'leaves' },
      display_name: {
        en: 'Fresh mint leaves',
        it: 'Foglie di menta fresca',
        vi: 'Lá bạc hà tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker. Gently muddle the mint leaves (do not over-muddle). Add ice and shake well until properly chilled. Double strain into a chilled cocktail glass. Garnish with a fresh mint sprig.',
    it: 'Versare tutti gli ingredienti in uno shaker. Pestare delicatamente le foglie di menta (non pestare eccessivamente). Aggiungere ghiaccio e shakerare bene fino a raffreddare adeguatamente. Filtrare doppiamente in una coppa da cocktail raffreddata. Guarnire con un rametto di menta fresca.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail. Nghiền nhẹ nhàng lá bạc hà (không nghiền quá). Thêm đá và lắc kỹ cho đến khi lạnh đúng mức. Lọc kép vào ly cocktail đã được làm lạnh. Trang trí bằng cành bạc hà tươi.',
  },

  glass: 'Coupe glass (or Cocktail glass)',

  garnish: {
    en: 'Fresh mint sprig',
    it: 'Rametto di menta fresca',
    vi: 'Cành bạc hà tươi',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['refreshing', 'citrus', 'minty', 'herbaceous'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 120,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['garden_party', 'brunch', 'summer_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['southside-fizz', 'southside-royale', 'basil-southside'],

  notes_for_staff:
    'Use fresh mint - never dried or wilted. Gently muddle mint to release oils without making it bitter (bruising releases chlorophyll which makes it bitter). Fresh lemon juice is essential. Double strain to remove mint particles. Can be served as a Collins (Southside Fizz) by adding soda water and serving over ice. Some recipes call for lime instead of lemon - both are acceptable.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/southside/',
    notes:
      'IBA Official Recipe. Prohibition-era cocktail with dual origin claims (Chicago South Side vs. Long Island country club).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
