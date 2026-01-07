/**
 * Famous Cocktails: Tom Collins
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tomCollins: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b3c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e',
  slug: 'tom-collins',
  stable_key: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',

  name: {
    en: 'Tom Collins',
    it: 'Tom Collins',
    vi: 'Tom Collins',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'citrus', 'refreshing', 'sparkling'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A timeless gin fizz that's essentially lemonade for adults. The Tom Collins combines gin with fresh lemon juice, sugar, and soda water to create a tall, refreshing drink that's perfect for warm weather. Simple, elegant, and endlessly drinkable.",
    it: 'Un gin fizz senza tempo che è essenzialmente una limonata per adulti. Il Tom Collins combina gin con succo di limone fresco, zucchero e acqua frizzante per creare una bevanda alta e rinfrescante perfetta per il clima caldo. Semplice, elegante e infinitamente beverina.',
    vi: 'Một loại gin fizz vượt thời gian về cơ bản là nước chanh cho người lớn. Tom Collins kết hợp gin với nước cốt chanh tươi, đường và nước soda để tạo ra thức uống cao, sảng khoái hoàn hảo cho thời tiết ấm. Đơn giản, thanh lịch và dễ uống vô tận.',
  },

  history: {
    created_year: '1876',
    origin: {
      city: 'London',
      bar: "Unknown (possibly Limmer's Hotel)",
      country: 'United Kingdom',
    },
    creator: {
      name: 'John Collins (disputed)',
      profession: 'bartender',
    },
    story: {
      en: 'The Tom Collins has a fascinating and somewhat convoluted history. The drink first appeared in Jerry Thomas\'s 1876 "Bartender\'s Guide," but its name derives from an elaborate practical joke called "The Great Tom Collins Hoax of 1874." People would tell their friends that a man named Tom Collins was spreading rumors about them at a local bar, sending victims on wild goose chases. When the joke became popular, bartenders started creating a drink to match the fictional character. The name might also reference John Collins, a waiter at Limmer\'s Hotel in London who supposedly created a similar drink with Old Tom Gin, hence "Tom Collins." The drink became one of the most popular cocktails of the late 1800s and remains a classic today.',
      it: 'Il Tom Collins ha una storia affascinante e un po\' convoluta. La bevanda apparve per la prima volta nella "Bartender\'s Guide" di Jerry Thomas del 1876, ma il suo nome deriva da uno scherzo elaborato chiamato "The Great Tom Collins Hoax of 1874." Le persone dicevano ai loro amici che un uomo di nome Tom Collins stava diffondendo voci su di loro in un bar locale, mandando le vittime in ricerche vane. Quando lo scherzo divenne popolare, i barman iniziarono a creare una bevanda che corrispondesse al personaggio fittizio. Il nome potrebbe anche riferirsi a John Collins, un cameriere al Limmer\'s Hotel di Londra che presumibilmente creò una bevanda simile con Old Tom Gin, da cui "Tom Collins." La bevanda divenne uno dei cocktail più popolari della fine del 1800 e rimane un classico oggi.',
      vi: 'Tom Collins có một lịch sử hấp dẫn và phần nào phức tạp. Thức uống lần đầu xuất hiện trong "Bartender\'s Guide" của Jerry Thomas năm 1876, nhưng tên của nó bắt nguồn từ một trò đùa phức tạp gọi là "The Great Tom Collins Hoax of 1874." Mọi người sẽ nói với bạn bè rằng một người đàn ông tên Tom Collins đang lan truyền tin đồn về họ tại một quán bar địa phương, khiến nạn nhân đi tìm kiếm vô ích. Khi trò đùa trở nên phổ biến, các bartender bắt đầu tạo ra một thức uống phù hợp với nhân vật hư cấu. Tên cũng có thể ám chỉ John Collins, một người phục vụ tại Khách sạn Limmer\'s ở London, người được cho là đã tạo ra một thức uống tương tự với Old Tom Gin, do đó có tên "Tom Collins." Thức uống trở thành một trong những cocktail phổ biến nhất cuối những năm 1800 và vẫn là một tác phẩm kinh điển ngày nay.',
    },
    named_after: {
      en: 'Named after either the "Great Tom Collins Hoax" of 1874 or John Collins, a waiter at Limmer\'s Hotel who may have created the drink with Old Tom Gin.',
      it: 'Prende il nome o dal "Great Tom Collins Hoax" del 1874 o da John Collins, un cameriere al Limmer\'s Hotel che potrebbe aver creato la bevanda con Old Tom Gin.',
      vi: 'Được đặt theo tên hoặc từ "Great Tom Collins Hoax" năm 1874 hoặc John Collins, một người phục vụ tại Khách sạn Limmer\'s có thể đã tạo ra thức uống với Old Tom Gin.',
    },
  },

  taste: {
    profile: ['citrus', 'refreshing', 'effervescent'],
    description: {
      en: "Bright, refreshing, and perfectly balanced. The Tom Collins tastes like sophisticated lemonade with a juniper kick. The gin's botanicals shine through the lemon's tartness, while soda water adds effervescence and drinkability.",
      it: "Brillante, rinfrescante e perfettamente bilanciato. Il Tom Collins ha il sapore di una limonata sofisticata con un calcio di ginepro. I botanici del gin risplendono attraverso l'acidità del limone, mentre l'acqua frizzante aggiunge effervescenza e bevibilità.",
      vi: 'Tươi sáng, sảng khoái và cân bằng hoàn hảo. Tom Collins có vị như nước chanh tinh tế với hương juniper. Thực vật của gin tỏa sáng qua vị chua của chanh, trong khi nước soda thêm sủi bọt và độ dễ uống.',
    },
    first_impression: {
      en: 'Crisp lemon acidity with gentle gin botanicals and refreshing bubbles',
      it: 'Acidità croccante del limone con delicati botanici di gin e bollicine rinfrescanti',
      vi: 'Độ chua giòn của chanh với thực vật gin nhẹ nhàng và bọt sảng khoái',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus and subtle juniper notes',
      it: 'Finale pulito e rinfrescante con agrumi persistenti e note sottili di ginepro',
      vi: 'Kết thúc sạch, sảng khoái với cam quýt kéo dài và hương juniper tinh tế',
    },
    balance: {
      en: 'Masterfully balanced between sweet and tart, with gin adding complexity without overwhelming',
      it: 'Magistralmente bilanciato tra dolce e aspro, con il gin che aggiunge complessità senza sopraffare',
      vi: 'Cân bằng tuyệt vời giữa ngọt và chua, với gin thêm sự phức tạp mà không áp đảo',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['social', 'outdoor', 'brunch', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with light fare: salads, sandwiches, grilled chicken, seafood, and brunch dishes. Also pairs well with Mediterranean and Middle Eastern cuisine.',
      it: 'Perfetto con piatti leggeri: insalate, panini, pollo alla griglia, frutti di mare e piatti da brunch. Si abbina bene anche con la cucina mediterranea e mediorientale.',
      vi: 'Hoàn hảo với món ăn nhẹ: salad, sandwich, gà nướng, hải sản và món brunch. Cũng kết hợp tốt với ẩm thực Địa Trung Hải và Trung Đông.',
    },
    ideal_for: {
      en: "Perfect for those who enjoy refreshing, citrus-forward cocktails. Ideal for warm weather drinking, outdoor gatherings, and anyone who wants a classic gin drink that's easy to enjoy.",
      it: "Perfetto per chi ama cocktail rinfrescanti e incentrati sugli agrumi. Ideale per bere con clima caldo, riunioni all'aperto e chiunque voglia una bevanda classica al gin facile da gustare.",
      vi: 'Hoàn hảo cho những ai thích cocktail sảng khoái, hướng cam quýt. Lý tưởng cho uống trong thời tiết ấm, các buổi họp mặt ngoài trời và bất kỳ ai muốn một thức uống gin cổ điển dễ thưởng thức.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
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
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Syrup đường' },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Soda water', it: 'Acqua frizzante', vi: 'Nước soda' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add gin, lemon juice, and simple syrup to a cocktail shaker with ice. Shake well until chilled. Strain into a tall glass filled with fresh ice. Top with soda water and stir gently. Garnish with a lemon wheel and cherry.',
    it: 'Aggiungere gin, succo di limone e sciroppo semplice in uno shaker con ghiaccio. Shakerare bene fino a raffreddare. Filtrare in un bicchiere alto pieno di ghiaccio fresco. Completare con acqua frizzante e mescolare delicatamente. Guarnire con una rondella di limone e una ciliegia.',
    vi: 'Thêm gin, nước cốt chanh và syrup đường vào bình lắc cocktail với đá. Lắc kỹ cho đến khi lạnh. Lọc vào ly cao đầy đá tươi. Thêm nước soda lên trên và khuấy nhẹ. Trang trí với lát chanh và cherry.',
  },

  glass: 'Collins glass (Highball)',

  garnish: {
    en: 'Lemon wheel and maraschino cherry',
    it: 'Rondella di limone e ciliegia maraschino',
    vi: 'Lát chanh và cherry maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'refreshing', 'effervescent'],

  abv_estimate: 10,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
      'pescatarian',
      'gluten_free',
      'nut_free',
      'dairy_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['social', 'outdoor', 'brunch', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['john-collins', 'vodka-collins', 'rum-collins'],

  notes_for_staff:
    "Always use fresh lemon juice. The key is proper dilution from shaking before adding soda. Use Old Tom Gin for a historically accurate version. Don't over-pour the soda - it should enhance, not dilute.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/2161/tom-collins',
    notes: "Classic recipe from Jerry Thomas's Bartender's Guide (1876) with modern adaptations.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
