/**
 * Famous Cocktails: Jack Rose
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const jackRose: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e',
  slug: 'jack-rose',
  stable_key: 'i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8',

  name: {
    en: 'Jack Rose',
    it: 'Jack Rose',
    vi: 'Jack Rose',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'applejack', 'citrus', 'prohibition-era'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A Prohibition-era classic showcasing American apple brandy. The Jack Rose combines applejack with citrus and grenadine for a tart, fruity cocktail with a beautiful pink hue. Simple yet sophisticated, it's a forgotten gem from the golden age of cocktails.",
    it: "Un classico dell'era del proibizionismo che mette in mostra il brandy di mele americano. Il Jack Rose combina applejack con agrumi e granatina per un cocktail aspro e fruttato con una bella tonalità rosa. Semplice ma sofisticato, è un gioiello dimenticato dell'età d'oro dei cocktail.",
    vi: 'Một tác phẩm kinh điển thời cấm rượu thể hiện brandy táo Mỹ. Jack Rose kết hợp applejack với cam quýt và grenadine cho một cocktail chua, trái cây với sắc hồng tuyệt đẹp. Đơn giản nhưng tinh tế, đây là viên ngọc bị lãng quên từ thời kỳ hoàng kim của cocktail.',
  },

  history: {
    created_year: '1905',
    origin: {
      city: 'New York City / New Jersey',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown (possibly Frank J. May)',
      profession: 'bartender',
    },
    story: {
      en: "The Jack Rose emerged around 1905 and became one of the most popular cocktails of the pre-Prohibition and Prohibition eras. Its origin is disputed - some attribute it to bartender Frank J. May in New Jersey, while others claim it was created in New York. The drink gained fame when it was mentioned in Ernest Hemingway's \"The Sun Also Rises\" and John Steinbeck's works. During Prohibition, its pink color and fruity flavor helped mask the harsh taste of bootleg spirits. The cocktail showcases applejack, America's oldest spirit, which was easier to produce during Prohibition than imported liquors. After Prohibition, the Jack Rose faded into obscurity but has been revived by modern craft bartenders.",
      it: "Il Jack Rose emerse intorno al 1905 e divenne uno dei cocktail più popolari dell'era pre-proibizionismo e del proibizionismo. La sua origine è controversa - alcuni lo attribuiscono al barman Frank J. May nel New Jersey, mentre altri sostengono che fu creato a New York. La bevanda guadagnò fama quando fu menzionata in \"Il sole sorge ancora\" di Ernest Hemingway e nelle opere di John Steinbeck. Durante il proibizionismo, il suo colore rosa e il sapore fruttato aiutarono a mascherare il gusto aspro degli spiriti di contrabbando. Il cocktail mette in mostra l'applejack, lo spirito più antico d'America, che era più facile da produrre durante il proibizionismo rispetto ai liquori importati. Dopo il proibizionismo, il Jack Rose cadde nell'oscurità ma è stato riportato in vita dai moderni barman artigianali.",
      vi: 'Jack Rose xuất hiện vào khoảng năm 1905 và trở thành một trong những cocktail phổ biến nhất của thời kỳ trước cấm rượu và cấm rượu. Nguồn gốc của nó còn tranh cãi - một số cho rằng bartender Frank J. May ở New Jersey, trong khi những người khác tuyên bố nó được tạo ra ở New York. Thức uống nổi tiếng khi được đề cập trong "The Sun Also Rises" của Ernest Hemingway và các tác phẩm của John Steinbeck. Trong thời cấm rượu, màu hồng và hương vị trái cây của nó giúp che giấu vị khắc nghiệt của rượu lậu. Cocktail thể hiện applejack, rượu mạnh lâu đời nhất của Mỹ, dễ sản xuất hơn trong thời cấm rượu so với rượu nhập khẩu. Sau cấm rượu, Jack Rose rơi vào quên lãng nhưng đã được hồi sinh bởi các bartender thủ công hiện đại.',
    },
    named_after: {
      en: 'The name\'s origin is debated: possibly named after the pink Jacquemot rose, notorious gambler "Bald Jack" Rose, or applejack combined with rose (pink color).',
      it: 'L\'origine del nome è dibattuta: forse prende il nome dalla rosa Jacquemot rosa, il famigerato giocatore d\'azzardo "Bald Jack" Rose, o applejack combinato con rose (colore rosa).',
      vi: 'Nguồn gốc tên còn tranh cãi: có thể được đặt theo hoa hồng Jacquemot màu hồng, tay cờ bạc khét tiếng "Bald Jack" Rose, hoặc applejack kết hợp với rose (màu hồng).',
    },
  },

  taste: {
    profile: ['tart', 'fruity', 'apple'],
    description: {
      en: 'Tart, fruity, and refreshing. The Jack Rose balances the rich apple character of applejack with bright lemon acidity and the pomegranate sweetness of grenadine. The result is a sophisticated sour with depth from the aged apple brandy.',
      it: "Aspro, fruttato e rinfrescante. Il Jack Rose bilancia il ricco carattere di mela dell'applejack con l'acidità brillante del limone e la dolcezza del melograno della granatina. Il risultato è un sour sofisticato con profondità dal brandy di mele invecchiato.",
      vi: 'Chua, trái cây và sảng khoái. Jack Rose cân bằng đặc tính táo đậm đà của applejack với độ chua chanh tươi sáng và vị ngọt lựu của grenadine. Kết quả là một loại sour tinh tế với chiều sâu từ brandy táo ủ.',
    },
    first_impression: {
      en: 'Bright citrus and pomegranate followed by rich apple notes',
      it: 'Agrumi brillanti e melograno seguiti da ricche note di mela',
      vi: 'Cam quýt tươi sáng và lựu theo sau là hương táo đậm đà',
    },
    finish: {
      en: 'Clean, tart finish with lingering apple and subtle oak notes from the brandy',
      it: 'Finale pulito e aspro con mela persistente e note sottili di quercia dal brandy',
      vi: 'Kết thúc sạch, chua với táo kéo dài và hương gỗ sồi tinh tế từ brandy',
    },
    balance: {
      en: 'Well-balanced between tart citrus and sweet grenadine, with apple brandy providing depth',
      it: 'Ben bilanciato tra agrumi aspri e granatina dolce, con brandy di mele che fornisce profondità',
      vi: 'Cân bằng tốt giữa cam quýt chua và grenadine ngọt, với brandy táo cung cấp chiều sâu',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['aperitivo', 'sophisticated', 'date_night', 'social'],
    seasons: ['autumn', 'spring'],
    food_pairings: {
      en: 'Pairs well with pork dishes, roasted poultry, apple-based desserts, and sharp cheeses. Also excellent with autumn harvest fare and charcuterie boards.',
      it: 'Si abbina bene con piatti di maiale, pollame arrosto, dessert a base di mele e formaggi piccanti. Eccellente anche con piatti del raccolto autunnale e taglieri di salumi.',
      vi: 'Kết hợp tốt với món thịt lợn, gia cầm nướng, món tráng miệng táo và phô mai sắc. Cũng tuyệt vời với món mùa thu và bảng charcuterie.',
    },
    ideal_for: {
      en: 'Perfect for those who appreciate classic sours and American spirits. Ideal for cocktail historians and anyone looking to explore Prohibition-era drinks. A great choice for autumn gatherings.',
      it: "Perfetto per chi apprezza i sour classici e gli spiriti americani. Ideale per storici dei cocktail e chiunque voglia esplorare le bevande dell'era del proibizionismo. Un'ottima scelta per riunioni autunnali.",
      vi: 'Hoàn hảo cho những ai đánh giá cao sours cổ điển và rượu mạnh Mỹ. Lý tưởng cho nhà sử học cocktail và bất kỳ ai muốn khám phá đồ uống thời cấm rượu. Lựa chọn tuyệt vời cho các buổi họp mặt mùa thu.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_APPLEJACK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Applejack or Calvados',
        it: 'Applejack o Calvados',
        vi: 'Applejack hoặc Calvados',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled cocktail glass. No garnish needed.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Nessuna guarnizione necessaria.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly cocktail đã làm lạnh. Không cần trang trí.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_APPLEJACK'],

  flavor_profile: ['tart', 'fruity', 'apple'],

  abv_estimate: 20,

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  season_tags: ['autumn', 'spring'],
  occasion_tags: ['aperitivo', 'sophisticated', 'date_night', 'social'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['applejack-rabbit', 'pink-lady'],

  notes_for_staff:
    'Use real grenadine (pomegranate syrup), not artificial red syrup. Applejack is traditional, but Calvados makes an excellent substitute. Shake hard to properly chill and dilute. The ratio is typically 2:1:0.5 (applejack:lemon:grenadine).',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1169/jack-rose',
    notes: 'Classic recipe from the early 1900s, documented in various cocktail books.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
