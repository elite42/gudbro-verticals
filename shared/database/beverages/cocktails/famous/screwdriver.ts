/**
 * Famous Cocktails: Screwdriver
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const screwdriver: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-7890-1234-cdef-123456789012',
  slug: 'screwdriver',
  stable_key: 'a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',

  name: {
    en: 'Screwdriver',
    it: 'Screwdriver',
    vi: 'Screwdriver',
    ko: '스크루드라이버',
    ja: 'スクリュードライバー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'classic', 'vodka', 'orange', 'brunch'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'One of the most iconic and simple cocktails ever created, combining vodka with fresh orange juice. The Screwdriver is the quintessential brunch drink and the foundation for countless variations.',
    it: "Uno dei cocktail più iconici e semplici mai creati, che combina vodka con succo d'arancia fresco. Lo Screwdriver è il drink da brunch per eccellenza e la base per innumerevoli variazioni.",
    vi: 'Một trong những cocktail biểu tượng và đơn giản nhất từng được tạo ra, kết hợp vodka với nước cam tươi. Screwdriver là thức uống brunch tinh túy và nền tảng cho vô số biến thể.',
  },

  history: {
    created_year: '1950',
    origin: {
      city: 'Persian Gulf',
      country: 'Various claims',
    },
    story: {
      en: "The Screwdriver's origin story has several versions, but the most popular claims it was invented by American oil workers in the Persian Gulf in the 1950s. Unable to find proper bar tools, they stirred their drinks with screwdrivers, hence the name. Another theory suggests it was invented by American engineers working abroad who used the tool to mix their drinks. The cocktail gained massive popularity in the 1960s and 1970s with the rise of vodka in America, becoming the go-to brunch cocktail.",
      it: "La storia dell'origine dello Screwdriver ha diverse versioni, ma la più popolare sostiene che fu inventato da lavoratori petroliferi americani nel Golfo Persico negli anni '50. Incapaci di trovare strumenti da bar adeguati, mescolavano i loro drink con cacciaviti, da cui il nome. Un'altra teoria suggerisce che fu inventato da ingegneri americani che lavoravano all'estero che usavano lo strumento per mescolare i loro drink. Il cocktail guadagnò enorme popolarità negli anni '60 e '70 con l'ascesa della vodka in America, diventando il cocktail da brunch per eccellenza.",
      vi: 'Câu chuyện nguồn gốc của Screwdriver có nhiều phiên bản, nhưng phổ biến nhất cho rằng nó được phát minh bởi công nhân dầu mỏ Mỹ ở Vịnh Ba Tư vào những năm 1950. Không thể tìm thấy dụng cụ bar thích hợp, họ khuấy đồ uống bằng tua vít, do đó có tên như vậy. Một lý thuyết khác cho rằng nó được phát minh bởi các kỹ sư Mỹ làm việc ở nước ngoài đã sử dụng công cụ này để trộn đồ uống. Cocktail trở nên cực kỳ phổ biến vào những năm 1960 và 1970 với sự gia tăng của vodka ở Mỹ, trở thành cocktail brunch hàng đầu.',
    },
    named_after: {
      en: 'Named after the tool (screwdriver) allegedly used by oil workers to stir the drink when proper bar tools were unavailable.',
      it: 'Prende il nome dallo strumento (cacciavite) presumibilmente usato dai lavoratori petroliferi per mescolare il drink quando non erano disponibili strumenti da bar adeguati.',
      vi: 'Được đặt theo tên công cụ (tua vít) được cho là được sử dụng bởi công nhân dầu mỏ để khuấy đồ uống khi không có dụng cụ bar thích hợp.',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'refreshing'],
    description: {
      en: "Bright, sweet, and incredibly easy-drinking. The natural sweetness of fresh orange juice perfectly complements the neutral vodka base, creating a smooth, fruity cocktail that's neither too strong nor too sweet.",
      it: "Brillante, dolce e incredibilmente facile da bere. La dolcezza naturale del succo d'arancia fresco completa perfettamente la base neutra di vodka, creando un cocktail morbido e fruttato che non è né troppo forte né troppo dolce.",
      vi: 'Tươi sáng, ngọt ngào và cực kỳ dễ uống. Vị ngọt tự nhiên của nước cam tươi bổ sung hoàn hảo cho vodka trung tính, tạo ra cocktail mượt mà, trái cây không quá mạnh cũng không quá ngọt.',
    },
    first_impression: {
      en: 'Fresh orange juice upfront with a subtle vodka warmth',
      it: "Succo d'arancia fresco in primo piano con un sottile calore di vodka",
      vi: 'Nước cam tươi ở phía trước với hơi ấm vodka tinh tế',
    },
    finish: {
      en: 'Clean, sweet citrus finish with minimal alcohol burn',
      it: 'Finale di agrumi dolce e pulito con minima sensazione alcolica',
      vi: 'Kết thúc cam quýt ngọt ngào, trong sạch với cảm giác cồn tối thiểu',
    },
    balance: {
      en: 'The vodka provides structure without overpowering the natural orange sweetness - perfect harmony',
      it: "La vodka fornisce struttura senza sopraffare la dolcezza naturale dell'arancia - armonia perfetta",
      vi: 'Vodka tạo cấu trúc mà không át vị ngọt cam tự nhiên - hài hòa hoàn hảo',
    },
  },

  recommendations: {
    best_time: ['morning', 'brunch', 'afternoon'],
    occasions: ['brunch', 'casual', 'breakfast', 'poolside'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Classic brunch companion - pairs perfectly with eggs benedict, pancakes, waffles, French toast, bacon, and breakfast pastries. Also works well with light salads and sandwiches.',
      it: 'Compagno classico del brunch - si abbina perfettamente con uova alla Benedict, pancakes, waffle, French toast, bacon e pasticceria per la colazione. Funziona bene anche con insalate leggere e panini.',
      vi: 'Đồng hành brunch cổ điển - kết hợp hoàn hảo với trứng benedict, bánh pancake, bánh waffle, bánh mì Pháp, thịt xông khói và bánh ngọt bữa sáng. Cũng phù hợp với salad nhẹ và bánh sandwich.',
    },
    ideal_for: {
      en: 'Perfect for brunch lovers and anyone who wants an easy-drinking, crowd-pleasing cocktail. Great for those new to cocktails or anyone seeking a simple, refreshing drink without complexity.',
      it: 'Perfetto per gli amanti del brunch e per chiunque voglia un cocktail facile da bere e che piaccia a tutti. Ottimo per chi è nuovo ai cocktail o per chiunque cerchi un drink semplice e rinfrescante senza complessità.',
      vi: 'Hoàn hảo cho người yêu brunch và bất kỳ ai muốn cocktail dễ uống, được mọi người yêu thích. Tuyệt vời cho người mới với cocktail hoặc bất kỳ ai tìm kiếm thức uống đơn giản, tươi mát mà không phức tạp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 100, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka over ice, then top with fresh orange juice. Stir gently to combine. Garnish with an orange slice.',
    it: "Riempire un bicchiere highball con ghiaccio. Versare la vodka sul ghiaccio, quindi completare con succo d'arancia fresco. Mescolare delicatamente per combinare. Guarnire con una fetta d'arancia.",
    vi: 'Đổ đầy ly highball với đá. Rót vodka lên đá, sau đó thêm nước cam tươi. Khuấy nhẹ nhàng để trộn đều. Trang trí với một lát cam.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice',
    it: "Fetta d'arancia",
    vi: 'Lát cam',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['citrus', 'sweet', 'refreshing'],

  abv_estimate: 10,

  calories_estimate: 165,

  difficulty: 'easy',

  prep_time_seconds: 30,

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
  season_tags: ['all_year'],
  occasion_tags: ['brunch', 'casual', 'breakfast'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['harvey-wallbanger', 'fuzzy-navel', 'sloe-screw'],

  notes_for_staff:
    'Always use freshly squeezed orange juice, never from concentrate. Quality of OJ makes or breaks this drink. Standard ratio is 1:2 (vodka:OJ) but can adjust to preference.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1236/screwdriver',
    notes: 'Classic American cocktail, documented in numerous sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
