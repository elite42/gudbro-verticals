/**
 * Famous Cocktails: Gold Rush
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const goldRush: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  slug: 'gold-rush',
  stable_key: 'b4c3d2e1f0a9182736455463728192021222324252',

  name: {
    en: 'Gold Rush',
    it: 'Gold Rush',
    vi: 'Gold Rush',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'whiskey', 'sour', 'honey'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern whiskey sour that replaces simple syrup with honey syrup, creating a richer, more complex flavor profile. The Gold Rush is essentially a Whiskey Sour meets Bee\'s Knees, combining bourbon\'s warmth with honey\'s floral sweetness and lemon\'s bright acidity.',
    it: 'Un whiskey sour moderno che sostituisce lo sciroppo semplice con lo sciroppo di miele, creando un profilo aromatico più ricco e complesso. Il Gold Rush è essenzialmente un Whiskey Sour che incontra il Bee\'s Knees, combinando il calore del bourbon con la dolcezza floreale del miele e l\'acidità brillante del limone.',
    vi: 'Một whiskey sour hiện đại thay thế siro đường bằng siro mật ong, tạo ra hương vị phong phú, phức tạp hơn. Gold Rush về cơ bản là Whiskey Sour kết hợp Bee\'s Knees, kết hợp hơi ấm của bourbon với vị ngọt hoa của mật ong và độ chua tươi sáng của chanh.',
  },

  history: {
    created_year: '2001',
    origin: {
      city: 'New York City',
      bar: 'Milk & Honey',
      country: 'USA',
    },
    creator: {
      name: 'T.J. Siegel',
      profession: 'bartender',
    },
    story: {
      en: 'The Gold Rush was created by T.J. Siegel at the legendary Milk & Honey bar in New York City around 2001. Siegel wanted to create a bourbon cocktail that showcased the spirit\'s natural sweetness without being too sweet. By using honey syrup instead of simple syrup, he created a drink with more depth and complexity. The name references the California Gold Rush, playing on the golden color of both bourbon and honey. The drink became an instant modern classic and remains one of the most popular contemporary cocktails.',
      it: 'Il Gold Rush fu creato da T.J. Siegel al leggendario bar Milk & Honey di New York City intorno al 2001. Siegel voleva creare un cocktail al bourbon che mettesse in mostra la dolcezza naturale dello spirito senza essere troppo dolce. Usando lo sciroppo di miele invece dello sciroppo semplice, creò una bevanda con più profondità e complessità. Il nome fa riferimento alla Corsa all\'Oro della California, giocando sul colore dorato sia del bourbon che del miele. La bevanda divenne subito un classico moderno e rimane uno dei cocktail contemporanei più popolari.',
      vi: 'Gold Rush được tạo ra bởi T.J. Siegel tại quán bar huyền thoại Milk & Honey ở New York City vào khoảng năm 2001. Siegel muốn tạo ra một cocktail bourbon thể hiện vị ngọt tự nhiên của rượu mà không quá ngọt. Bằng cách sử dụng siro mật ong thay vì siro đường, ông đã tạo ra một thức uống có độ sâu và phức tạp hơn. Tên gọi ám chỉ Cơn sốt vàng California, chơi chữ với màu vàng của cả bourbon và mật ong. Thức uống ngay lập tức trở thành tác phẩm cổ điển hiện đại và vẫn là một trong những cocktail đương đại phổ biến nhất.',
    },
    named_after: {
      en: 'Named after the California Gold Rush of the mid-1800s, referencing the golden color of bourbon and honey.',
      it: 'Prende il nome dalla Corsa all\'Oro della California della metà del 1800, facendo riferimento al colore dorato del bourbon e del miele.',
      vi: 'Được đặt tên theo Cơn sốt vàng California giữa thập niên 1800, ám chỉ màu vàng của bourbon và mật ong.',
    },
  },

  taste: {
    profile: ['honey', 'citrus', 'bourbon', 'balanced'],
    description: {
      en: 'Rich, smooth, and perfectly balanced. Bourbon provides vanilla, oak, and caramel notes that harmonize beautifully with honey\'s floral sweetness. Fresh lemon adds brightness and cuts through the richness. The honey syrup creates a silkier texture than simple syrup, making this more luxurious than a standard whiskey sour.',
      it: 'Ricco, liscio e perfettamente bilanciato. Il bourbon fornisce note di vaniglia, rovere e caramello che si armonizzano magnificamente con la dolcezza floreale del miele. Il limone fresco aggiunge brillantezza e taglia la ricchezza. Lo sciroppo di miele crea una texture più setosa dello sciroppo semplice, rendendo questo più lussuoso di un whiskey sour standard.',
      vi: 'Đậm đà, mượt mà và cân bằng hoàn hảo. Bourbon mang đến hương vani, gỗ sồi và caramel hòa quyện tuyệt đẹp với vị ngọt hoa của mật ong. Chanh tươi thêm độ tươi sáng và cắt qua sự phong phú. Siro mật ong tạo kết cấu mượt hơn siro đường, làm cho thức uống này sang trọng hơn whiskey sour tiêu chuẩn.',
    },
    first_impression: {
      en: 'Honey and lemon hit first, followed by warm bourbon notes',
      it: 'Miele e limone colpiscono per primi, seguiti da note calde di bourbon',
      vi: 'Mật ong và chanh đập vào đầu tiên, tiếp theo là hương bourbon ấm áp',
    },
    finish: {
      en: 'Medium-long finish with lingering honey, vanilla, and oak',
      it: 'Finale medio-lungo con miele, vaniglia e rovere persistenti',
      vi: 'Kết thúc vừa dài với mật ong, vani và gỗ sồi kéo dài',
    },
    balance: {
      en: 'Expertly balanced - honey sweetness perfectly matches lemon tartness',
      it: 'Bilanciato in modo esperto - la dolcezza del miele corrisponde perfettamente all\'acidità del limone',
      vi: 'Cân bằng điêu luyện - vị ngọt mật ong kết hợp hoàn hảo với vị chua chanh',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon', 'cocktail_hour'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'casual'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent with barbecue, grilled meats, aged cheeses, or charcuterie. Also pairs well with roasted nuts, honey-glazed dishes, and caramelized desserts.',
      it: 'Eccellente con barbecue, carni alla griglia, formaggi stagionati o salumi. Si abbina bene anche con frutta secca tostata, piatti glassati al miele e dolci caramellati.',
      vi: 'Tuyệt vời với thịt nướng, thịt nướng, phô mai già, hoặc thịt nguội. Cũng kết hợp tốt với hạt rang, các món tráng men mật ong và món tráng miệng caramel.',
    },
    ideal_for: {
      en: 'Perfect for bourbon lovers who enjoy balanced sours. Ideal for those who find traditional whiskey sours too sharp or simple syrup too plain. Great gateway cocktail for whiskey newcomers.',
      it: 'Perfetto per gli amanti del bourbon che apprezzano i sour bilanciati. Ideale per chi trova i whiskey sour tradizionali troppo aspri o lo sciroppo semplice troppo semplice. Ottimo cocktail introduttivo per i nuovi arrivati al whiskey.',
      vi: 'Hoàn hảo cho những người yêu bourbon thích sour cân bằng. Lý tưởng cho những ai thấy whiskey sour truyền thống quá gắt hoặc siro đường quá đơn giản. Cocktail cổng vào tuyệt vời cho người mới bắt đầu với whiskey.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Bourbon whiskey', it: 'Bourbon whiskey', vi: 'Rượu whiskey bourbon' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Honey syrup (3:1)', it: 'Sciroppo di miele (3:1)', vi: 'Siro mật ong (3:1)' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a rocks glass over fresh ice or serve up in a coupe glass. Garnish with a lemon twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere rocks con ghiaccio fresco o servire liscio in una coppa. Guarnire con una scorza di limone.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly rocks với đá mới hoặc phục vụ thẳng trong ly coupe. Trang trí với vỏ chanh xoắn.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lemon twist',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh xoắn',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['honey', 'citrus', 'bourbon', 'balanced'],

  abv_estimate: 20,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'honey_intolerance'],
    suitable_for_diets: ['vegetarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['rye-gold-rush', 'mezcal-gold-rush', 'smoky-gold-rush'],

  notes_for_staff: 'Honey syrup is 3 parts honey to 1 part hot water, cooled. Use fresh lemon juice only. Can serve up in coupe or on rocks - both work well. Quality honey matters - use local, floral honey for best results.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/gold-rush/',
    note: 'Created by T.J. Siegel at Milk & Honey, New York City, circa 2001.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
