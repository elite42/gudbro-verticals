/**
 * IBA Unforgettables: Sidecar
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const sidecar: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '4ba61e5d-3508-415c-b7c4-067fef5af1a7',
  slug: 'sidecar',
  stable_key: 'sidecar_iba_unforgettables',

  name: {
    en: 'Sidecar',
    it: 'Sidecar',
    vi: 'Sidecar',
    ko: '사이드카',
    ja: 'サイドカー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'sour', 'cognac'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant and refined classic cocktail blending cognac, triple sec, and fresh lemon juice. This sophisticated drink emerged from the golden age of Parisian cocktail culture in the 1920s and remains a timeless favorite.',
    it: "Un cocktail classico elegante e raffinato che unisce cognac, triple sec e succo di limone fresco. Questo drink sofisticato è emerso dall'età d'oro della cultura dei cocktail parigina negli anni '20 e rimane un favorito senza tempo.",
    vi: 'Một cocktail cổ điển thanh lịch và tinh tế kết hợp cognac, triple sec và nước cốt chanh tươi. Đồ uống tinh tế này xuất hiện từ thời kỳ hoàng kim của văn hóa cocktail Paris những năm 1920 và vẫn là yêu thích vượt thời gian.',
  },

  history: {
    created_year: '1922',
    origin: {
      city: 'Paris',
      bar: "Ritz Paris / Harry's New York Bar",
      country: 'France',
    },
    creator: {
      name: 'Frank Meier / Pat MacGarry / Harry MacElhone',
      profession: 'bartender',
    },
    story: {
      en: "The Sidecar's origin is one of cocktail history's most famous disputes. Three establishments claim its invention: the Ritz Paris (bartender Frank Meier), Buck's Club London (Pat MacGarry), and Harry's New York Bar in Paris (Harry MacElhone). The first recipes appeared in 1922 in Robert Vermeire's \"Cocktails and How to Mix Them\" and MacElhone's \"Harry's ABC of Mixing Cocktails.\" According to legend, an American Army Captain during World War I would arrive at a Paris bar via motorcycle sidecar. He wanted cognac to warm up before dinner, but the bartender deemed it too strong for early evening, so he mixed it with Cointreau and lemon juice. The drink became immensely popular in Paris and London during the early 1920s Jazz Age. Today, the Ritz Paris still serves an ultra-premium version using pre-phylloxera cognac for around $1,800.",
      it: "L'origine del Sidecar è una delle dispute più famose nella storia dei cocktail. Tre locali ne rivendicano l'invenzione: il Ritz Paris (barman Frank Meier), il Buck's Club London (Pat MacGarry) e l'Harry's New York Bar a Parigi (Harry MacElhone). Le prime ricette apparvero nel 1922 in \"Cocktails and How to Mix Them\" di Robert Vermeire e in \"Harry's ABC of Mixing Cocktails\" di MacElhone. Secondo la leggenda, un capitano dell'esercito americano durante la Prima Guerra Mondiale arrivava in un bar di Parigi tramite sidecar di una motocicletta. Voleva del cognac per scaldarsi prima di cena, ma il barman lo ritenne troppo forte per la prima serata, quindi lo mescolò con Cointreau e succo di limone. Il drink divenne immensamente popolare a Parigi e Londra durante i primi anni '20 dell'era del Jazz. Oggi, il Ritz Paris serve ancora una versione ultra-premium che utilizza cognac pre-fillossera per circa 1.800 dollari.",
      vi: 'Nguồn gốc của Sidecar là một trong những tranh cãi nổi tiếng nhất trong lịch sử cocktail. Ba cơ sở tuyên bố phát minh ra nó: Ritz Paris (bartender Frank Meier), Buck\'s Club London (Pat MacGarry), và Harry\'s New York Bar ở Paris (Harry MacElhone). Công thức đầu tiên xuất hiện năm 1922 trong "Cocktails and How to Mix Them" của Robert Vermeire và "Harry\'s ABC of Mixing Cocktails" của MacElhone. Theo truyền thuyết, một Đại úy Quân đội Mỹ trong Thế chiến I thường đến một quán bar Paris bằng xe máy có sidecar. Ông muốn cognac để sưởi ấm trước bữa tối, nhưng bartender cho rằng nó quá mạnh cho buổi tối sớm, nên đã pha trộn với Cointreau và nước cốt chanh. Đồ uống trở nên cực kỳ phổ biến ở Paris và London trong thời kỳ Jazz đầu những năm 1920. Ngày nay, Ritz Paris vẫn phục vụ phiên bản siêu cao cấp sử dụng cognac tiền phylloxera với giá khoảng 1.800 USD.',
    },
    named_after: {
      en: 'Named after the motorcycle sidecar in which an American Army Captain would arrive at the bar. The drink warmed him up before dinner without being too strong for early evening.',
      it: "Prende il nome dal sidecar della motocicletta con cui un capitano dell'esercito americano arrivava al bar. Il drink lo scaldava prima di cena senza essere troppo forte per la prima serata.",
      vi: 'Được đặt tên theo chiếc sidecar xe máy mà một Đại úy Quân đội Mỹ thường đến quán bar. Đồ uống làm ấm ông trước bữa tối mà không quá mạnh cho buổi tối sớm.',
    },
  },

  taste: {
    profile: ['sour', 'sweet', 'citrus', 'elegant'],
    description: {
      en: 'An exquisitely balanced cocktail with the rich, warming complexity of cognac beautifully complemented by bright citrus and subtle orange sweetness. The Sidecar is sophisticated yet approachable, offering layers of flavor from grape brandy, orange liqueur, and tart lemon in perfect harmony. Neither too sweet nor too sour, it epitomizes the golden ratio of classic cocktail balance.',
      it: "Un cocktail squisitamente bilanciato con la complessità ricca e riscaldante del cognac magnificamente completata da agrumi brillanti e sottile dolcezza di arancia. Il Sidecar è sofisticato ma accessibile, offrendo strati di sapore da brandy d'uva, liquore all'arancia e limone aspro in perfetta armonia. Né troppo dolce né troppo aspro, incarna il rapporto aureo del perfetto equilibrio dei cocktail classici.",
      vi: 'Một cocktail cân bằng tinh tế với độ phức tạp phong phú, ấm áp của cognac được bổ sung tuyệt đẹp bởi vị chanh tươi mát và vị ngọt cam tinh tế. Sidecar vừa tinh tế vừa dễ tiếp cận, mang đến nhiều tầng hương vị từ brandy nho, rượu mùi cam và chanh chua trong sự hòa quyện hoàn hảo. Không quá ngọt cũng không quá chua, nó thể hiện tỷ lệ vàng của sự cân bằng cocktail cổ điển.',
    },
    first_impression: {
      en: 'The first sip opens with a bright citrus burst that quickly reveals the sophisticated warmth and fruity complexity of quality cognac, rounded out by orange liqueur.',
      it: "Il primo sorso si apre con un vivace scoppio di agrumi che rivela rapidamente il calore sofisticato e la complessità fruttata del cognac di qualità, arrotondato dal liquore all'arancia.",
      vi: 'Ngụm đầu tiên mở ra với vị chanh tươi mát ngay lập tức tiết lộ hơi ấm tinh tế và độ phức tạp trái cây của cognac chất lượng, được làm tròn bởi rượu mùi cam.',
    },
    finish: {
      en: 'A clean, elegant finish with lingering cognac warmth and a pleasant citrus-orange afterglow. The finish is smooth and sophisticated, inviting another sip.',
      it: 'Un finale pulito ed elegante con un persistente calore di cognac e un piacevole bagliore residuo di agrumi-arancia. Il finale è morbido e sofisticato, invitando un altro sorso.',
      vi: 'Hậu vị trong sạch, thanh lịch với hơi ấm cognac kéo dài và dư vị cam-chanh dễ chịu. Hậu vị mềm mại và tinh tế, mời gọi thêm một ngụm nữa.',
    },
    balance: {
      en: 'The IBA ratio of 50:20:20 creates impeccable balance. The cognac provides structure and depth, triple sec adds orange sweetness and complexity, while lemon juice brings brightness and prevents cloying sweetness. Some bartenders prefer equal parts (33:33:33) for a more spirit-forward profile.',
      it: "Il rapporto IBA di 50:20:20 crea un equilibrio impeccabile. Il cognac fornisce struttura e profondità, il triple sec aggiunge dolcezza all'arancia e complessità, mentre il succo di limone porta brillantezza e previene una dolcezza eccessiva. Alcuni barman preferiscono parti uguali (33:33:33) per un profilo più orientato ai distillati.",
      vi: 'Tỷ lệ IBA 50:20:20 tạo ra sự cân bằng hoàn hảo. Cognac mang đến cấu trúc và chiều sâu, triple sec thêm vị ngọt cam và độ phức tạp, trong khi nước cốt chanh mang lại vị tươi mát và ngăn ngừa vị ngọt ngấy. Một số bartender thích tỷ lệ đều nhau (33:33:33) cho hương vị mạnh hơn.',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon'],
    occasions: ['aperitivo', 'date_night', 'cocktail_party', 'special_occasion'],
    seasons: ['all_year', 'fall', 'winter'],
    food_pairings: {
      en: 'Pairs beautifully with French cuisine, oysters, pâté, foie gras, soft cheeses like Brie or Camembert, duck confit, citrus-based desserts, crème brûlée, and chocolate truffles. The cognac and citrus combination complements rich, fatty foods.',
      it: "Si abbina magnificamente con la cucina francese, ostriche, paté, foie gras, formaggi morbidi come Brie o Camembert, confit d'anatra, dessert agli agrumi, crème brûlée e tartufi al cioccolato. La combinazione di cognac e agrumi complementa cibi ricchi e grassi.",
      vi: 'Kết hợp tuyệt đẹp với ẩm thực Pháp, hàu, pâté, gan ngỗng, phô mai mềm như Brie hoặc Camembert, vịt confit, món tráng miệng chanh, crème brûlée, và sô-cô-la truffles. Sự kết hợp cognac và chanh bổ sung cho thực phẩm giàu chất béo.',
    },
    ideal_for: {
      en: 'Perfect for cognac enthusiasts seeking a refined cocktail experience. An excellent choice for special occasions, romantic evenings, or as a sophisticated aperitif. Ideal for those who appreciate classic French elegance and balanced sour cocktails.',
      it: "Perfetto per gli appassionati di cognac che cercano un'esperienza di cocktail raffinata. Una scelta eccellente per occasioni speciali, serate romantiche o come aperitivo sofisticato. Ideale per coloro che apprezzano l'eleganza classica francese e i cocktail sour bilanciati.",
      vi: 'Hoàn hảo cho những người yêu cognac tìm kiếm trải nghiệm cocktail tinh tế. Lựa chọn tuyệt vời cho dịp đặc biệt, buổi tối lãng mạn hoặc làm aperitif tinh tế. Lý tưởng cho những ai đánh giá cao sự thanh lịch cổ điển Pháp và cocktail sour cân bằng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Triple Sec', it: 'Triple Sec', vi: 'Triple Sec' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Fresh Lemon Juice',
        it: 'Succo di Limone Fresco',
        vi: 'Nước Cốt Chanh Tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well to chill and dilute. Strain into a chilled cocktail glass. Optionally, rim the glass with sugar for a sweeter presentation.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene per raffreddare e diluire. Filtrare in un bicchiere da cocktail freddo. Opzionalmente, bordare il bicchiere con zucchero per una presentazione più dolce.',
    vi: 'Cho tất cả nguyên liệu vào shaker đầy đá. Lắc mạnh để làm lạnh và pha loãng. Lọc vào ly cocktail lạnh. Tùy chọn, viền ly bằng đường để tạo vẻ ngọt hơn.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'No garnish (optionally sugar rim)',
    it: 'Nessuna guarnizione (opzionalmente bordo di zucchero)',
    vi: 'Không trang trí (tùy chọn viền đường)',
  },

  ice: 'none',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC'],
  flavor_profile: ['sour', 'citrus', 'sweet', 'elegant', 'smooth'],
  abv_estimate: 22,
  calories_estimate: 185,
  difficulty: 'easy',
  prep_time_seconds: 60,

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
  season_tags: ['all_year', 'fall', 'winter'],
  occasion_tags: ['aperitivo', 'date_night', 'cocktail_party', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    'French Sidecar (equal parts 33:33:33)',
    'Chelsea Sidecar (with gin instead of cognac)',
    'Boston Sidecar (with rum instead of cognac)',
    'Between the Sheets (adds rum)',
  ],

  notes_for_staff:
    'Use quality cognac - VS or VSOP grade works well. Cointreau is the gold standard for triple sec, but Grand Marnier adds richer orange flavor. Always use fresh lemon juice. The IBA official ratio is 50:20:20 (cognac:triple sec:lemon), but many bartenders prefer the "French" style equal parts 33:33:33 for more citrus presence. Some guests prefer a sugar rim - to prepare, moisten the rim with lemon and dip in superfine sugar before pouring. Serve well-chilled in a pre-chilled cocktail glass for best experience.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/sidecar/',
    notes:
      'IBA Official Recipe. Historical research from Robert Vermeire\'s 1922 "Cocktails and How to Mix Them" and Harry MacElhone\'s 1922 "Harry\'s ABC of Mixing Cocktails".',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
