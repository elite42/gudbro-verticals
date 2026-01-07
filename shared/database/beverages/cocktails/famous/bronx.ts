/**
 * Famous Cocktails: Bronx
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bronx: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a',
  slug: 'bronx',
  stable_key: 'k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0',

  name: {
    en: 'Bronx',
    it: 'Bronx',
    vi: 'Bronx',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'citrus', 'vermouth', 'pre-prohibition'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A perfect martini meets orange juice in this pre-Prohibition classic. The Bronx combines gin with both sweet and dry vermouth plus fresh orange juice, creating a sophisticated yet approachable cocktail. Once America's third most popular cocktail, it deserves a comeback.",
    it: "Un perfect martini incontra il succo d'arancia in questo classico pre-proibizionismo. Il Bronx combina gin con vermouth dolce e dry più succo d'arancia fresco, creando un cocktail sofisticato ma accessibile. Un tempo il terzo cocktail più popolare d'America, merita un ritorno.",
    vi: 'Perfect martini gặp nước cam trong tác phẩm kinh điển trước cấm rượu này. Bronx kết hợp gin với cả vermouth ngọt và khô cộng thêm nước cam tươi, tạo ra một cocktail tinh tế nhưng dễ tiếp cận. Từng là cocktail phổ biến thứ ba của Mỹ, nó xứng đáng có sự trở lại.',
  },

  history: {
    created_year: '1906',
    origin: {
      city: 'Philadelphia',
      bar: 'Waldorf-Astoria Hotel',
      country: 'USA',
    },
    creator: {
      name: 'Johnnie Solon',
      profession: 'bartender',
    },
    story: {
      en: 'The Bronx was created around 1906 by bartender Johnnie Solon at the Waldorf-Astoria Hotel\'s bar (then located in Philadelphia). According to Solon, a customer asked him to create something new, and inspiration struck after a recent visit to the Bronx Zoo. The cocktail combines gin, sweet and dry vermouth, and orange juice - essentially a Perfect Martini with orange juice added. It became wildly popular in the 1910s and 1920s, rivaling the Martini and Manhattan in popularity. Albert Stevens Crockett wrote in "Old Waldorf Bar Days" (1931) that "the Bronx was to the cocktail world what the zipper has been to the clothing industry." However, after Prohibition, the drink faded from prominence as vodka-based cocktails rose to dominance. Modern bartenders are rediscovering its elegant balance.',
      it: "Il Bronx fu creato intorno al 1906 dal barman Johnnie Solon al bar del Waldorf-Astoria Hotel (allora situato a Filadelfia). Secondo Solon, un cliente gli chiese di creare qualcosa di nuovo, e l'ispirazione arrivò dopo una recente visita allo zoo del Bronx. Il cocktail combina gin, vermouth dolce e dry, e succo d'arancia - essenzialmente un Perfect Martini con succo d'arancia aggiunto. Divenne estremamente popolare negli anni '10 e '20, rivaleggiando con Martini e Manhattan in popolarità. Albert Stevens Crockett scrisse in \"Old Waldorf Bar Days\" (1931) che \"il Bronx era per il mondo dei cocktail ciò che la cerniera è stata per l'industria dell'abbigliamento.\" Tuttavia, dopo il proibizionismo, la bevanda svanì dalla ribalta mentre i cocktail a base di vodka salirono al dominio. I barman moderni stanno riscoprendo il suo elegante equilibrio.",
      vi: 'Bronx được tạo ra vào khoảng năm 1906 bởi bartender Johnnie Solon tại quầy bar Khách sạn Waldorf-Astoria (lúc đó nằm ở Philadelphia). Theo Solon, một khách hàng yêu cầu anh tạo ra thứ gì đó mới, và cảm hứng đến sau chuyến thăm gần đây đến Sở thú Bronx. Cocktail kết hợp gin, vermouth ngọt và khô, và nước cam - về cơ bản là Perfect Martini với nước cam thêm vào. Nó trở nên cực kỳ phổ biến vào những năm 1910 và 1920, cạnh tranh với Martini và Manhattan về độ phổ biến. Albert Stevens Crockett viết trong "Old Waldorf Bar Days" (1931) rằng "Bronx đối với thế giới cocktail giống như khóa kéo đối với ngành công nghiệp may mặc." Tuy nhiên, sau cấm rượu, thức uống mờ nhạt khi cocktail dựa trên vodka lên ngôi. Các bartender hiện đại đang tái khám phá sự cân bằng thanh lịch của nó.',
    },
    named_after: {
      en: 'Named after the Bronx Zoo in New York, which bartender Johnnie Solon had recently visited when he created the drink.',
      it: 'Prende il nome dallo zoo del Bronx a New York, che il barman Johnnie Solon aveva recentemente visitato quando creò la bevanda.',
      vi: 'Được đặt theo tên Sở thú Bronx ở New York, mà bartender Johnnie Solon đã ghé thăm gần đây khi anh tạo ra thức uống.',
    },
  },

  taste: {
    profile: ['citrus', 'herbal', 'balanced'],
    description: {
      en: "Bright, citrusy, and beautifully complex. The Bronx balances gin's botanicals with the herbal complexity of both vermouths, while fresh orange juice adds fruity brightness without overwhelming. It's like a sophisticated orange creamsicle for grown-ups.",
      it: "Brillante, agrumato e magnificamente complesso. Il Bronx bilancia i botanici del gin con la complessità erbaccea di entrambi i vermouth, mentre il succo d'arancia fresco aggiunge luminosità fruttata senza sopraffare. È come un sofisticato creamsicle all'arancia per adulti.",
      vi: 'Tươi sáng, cam quýt và phức tạp tuyệt đẹp. Bronx cân bằng thực vật của gin với sự phức tạp thảo mộc của cả hai loại vermouth, trong khi nước cam tươi thêm độ sáng trái cây mà không áp đảo. Nó giống như creamsicle cam tinh tế cho người lớn.',
    },
    first_impression: {
      en: 'Fresh orange juice brightness followed by gin botanicals and herbal vermouth',
      it: "Luminosità del succo d'arancia fresco seguita da botanici del gin e vermouth erbaceo",
      vi: 'Độ sáng nước cam tươi theo sau là thực vật gin và vermouth thảo mộc',
    },
    finish: {
      en: 'Medium finish with lingering orange, juniper, and subtle vermouth complexity',
      it: 'Finale medio con arancia persistente, ginepro e sottile complessità del vermouth',
      vi: 'Kết thúc trung bình với cam kéo dài, juniper và sự phức tạp tinh tế của vermouth',
    },
    balance: {
      en: 'Expertly balanced between spirit, citrus, and vermouth - each element distinct yet harmonious',
      it: 'Magistralmente bilanciato tra spirito, agrumi e vermouth - ogni elemento distinto ma armonioso',
      vi: 'Cân bằng chuyên nghiệp giữa rượu mạnh, cam quýt và vermouth - mỗi yếu tố riêng biệt nhưng hài hòa',
    },
  },

  recommendations: {
    best_time: ['brunch', 'afternoon', 'early_evening'],
    occasions: ['brunch', 'aperitivo', 'social', 'sophisticated'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Perfect with brunch classics: eggs Benedict, smoked salmon, French toast, and fruit salads. Also pairs well with light seafood, salads, and Mediterranean cuisine.',
      it: 'Perfetto con classici del brunch: uova Benedict, salmone affumicato, French toast e insalate di frutta. Si abbina bene anche con frutti di mare leggeri, insalate e cucina mediterranea.',
      vi: 'Hoàn hảo với món brunch cổ điển: trứng Benedict, cá hồi hun khói, bánh mì nướng kiểu Pháp và salad trái cây. Cũng kết hợp tốt với hải sản nhẹ, salad và ẩm thực Địa Trung Hải.',
    },
    ideal_for: {
      en: 'Perfect for gin enthusiasts who want something more approachable than a martini. Ideal for brunch gatherings and those exploring pre-Prohibition cocktail history. A great choice for orange juice lovers seeking sophistication.',
      it: "Perfetto per gli appassionati di gin che vogliono qualcosa di più accessibile di un martini. Ideale per riunioni da brunch e chi esplora la storia dei cocktail pre-proibizionismo. Un'ottima scelta per gli amanti del succo d'arancia che cercano sofisticazione.",
      vi: 'Hoàn hảo cho những người đam mê gin muốn thứ gì đó dễ tiếp cận hơn martini. Lý tưởng cho các buổi họp mặt brunch và những người khám phá lịch sử cocktail trước cấm rượu. Lựa chọn tuyệt vời cho người yêu nước cam tìm kiếm sự tinh tế.',
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
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermouth dry', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled cocktail glass. Garnish with an orange twist.',
    it: "Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una scorza d'arancia.",
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ cam xoắn.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Orange twist',
    it: "Scorza d'arancia",
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'herbal', 'balanced'],

  abv_estimate: 18,

  calories_estimate: 155,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
      'nut_free',
      'dairy_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['brunch', 'aperitivo', 'social', 'sophisticated'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['income-tax', 'satan-whiskers', 'golden-bronx'],

  notes_for_staff:
    'Must use fresh orange juice - never bottled or concentrate. The classic ratio is 3:1:1:1.5 (gin:sweet vermouth:dry vermouth:orange juice). Use quality vermouths and keep them fresh. Shake hard to properly integrate the orange juice.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/358/bronx',
    notes:
      'Classic recipe from Waldorf-Astoria (1906), documented in various early 20th century cocktail books.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
