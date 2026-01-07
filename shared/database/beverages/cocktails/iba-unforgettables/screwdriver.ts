/**
 * IBA Unforgettables: Screwdriver
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const screwdriver: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-1234-ef56-567890123def',
  slug: 'screwdriver',
  stable_key: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3',

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
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'simple', 'refreshing', 'brunch'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'One of the simplest and most popular vodka cocktails, combining just vodka and fresh orange juice. The Screwdriver is refreshing, easy to make, and endlessly customizable - a true crowd-pleaser that works any time of day.',
    it: "Uno dei cocktail alla vodka più semplici e popolari, che combina solo vodka e succo d'arancia fresco. Lo Screwdriver è rinfrescante, facile da preparare e infinitamente personalizzabile - un vero piacere per la folla che funziona in qualsiasi momento della giornata.",
    vi: 'Một trong những cocktail vodka đơn giản và phổ biến nhất, chỉ kết hợp vodka và nước cam tươi. Screwdriver tươi mát, dễ pha chế và có thể tùy chỉnh vô tận - một thức uống thực sự làm hài lòng đám đông hoạt động vào bất kỳ thời gian nào trong ngày.',
  },

  history: {
    created_year: '1949',
    origin: {
      city: 'Unknown',
      bar: 'Oil fields',
      country: 'USA/Middle East',
    },
    creator: {
      name: 'American oil workers',
      profession: 'oil workers',
    },
    story: {
      en: "The Screwdriver's origin is debated, but the most popular story dates it to the late 1940s or early 1950s when American oil workers in the Persian Gulf would discreetly add vodka to their orange juice and stir it with a screwdriver - the only tool readily available. The drink gained popularity in America during the 1950s and 1960s, coinciding with vodka's rise in popularity in the United States. Smirnoff vodka heavily marketed the drink in the 1950s, helping establish it as a staple cocktail. Its simplicity and refreshing taste made it an instant classic.",
      it: "L'origine dello Screwdriver è dibattuta, ma la storia più popolare lo data alla fine degli anni '40 o all'inizio degli anni '50 quando i lavoratori petroliferi americani nel Golfo Persico aggiungevano discretamente vodka al loro succo d'arancia e lo mescolavano con un cacciavite - l'unico strumento prontamente disponibile. La bevanda acquisì popolarità in America negli anni '50 e '60, coincidendo con l'ascesa della popolarità della vodka negli Stati Uniti. La vodka Smirnoff commercializzò pesantemente la bevanda negli anni '50, aiutando a stabilirla come cocktail fondamentale. La sua semplicità e il gusto rinfrescante la resero un classico istantaneo.",
      vi: 'Nguồn gốc của Screwdriver còn tranh cãi, nhưng câu chuyện phổ biến nhất cho rằng nó xuất hiện vào cuối những năm 1940 hoặc đầu những năm 1950 khi các công nhân dầu mỏ Mỹ ở Vùng Vịnh Ba Tư kín đáo thêm vodka vào nước cam của họ và khuấy bằng cái tua vít - công cụ duy nhất sẵn có. Thức uống trở nên phổ biến ở Mỹ trong những năm 1950 và 1960, trùng với sự gia tăng phổ biến của vodka tại Hoa Kỳ. Vodka Smirnoff đã quảng cáo mạnh mẽ cho thức uống này vào những năm 1950, giúp thiết lập nó như một cocktail chủ chốt. Sự đơn giản và hương vị tươi mát đã khiến nó trở thành một tác phẩm kinh điển ngay lập tức.',
    },
    named_after: {
      en: "Named after the screwdriver tool allegedly used by oil workers to stir vodka into their orange juice when proper bar tools weren't available.",
      it: "Prende il nome dallo strumento cacciavite presumibilmente utilizzato dai lavoratori petroliferi per mescolare la vodka nel loro succo d'arancia quando gli strumenti da bar appropriati non erano disponibili.",
      vi: 'Được đặt tên theo công cụ tua vít được cho là được các công nhân dầu mỏ sử dụng để khuấy vodka vào nước cam khi không có dụng cụ bar phù hợp.',
    },
  },

  taste: {
    profile: ['refreshing', 'citrus', 'light'],
    description: {
      en: 'Bright, refreshing, and naturally sweet. The Screwdriver balances the clean neutrality of vodka with the vibrant citrus sweetness and acidity of fresh orange juice.',
      it: "Brillante, rinfrescante e naturalmente dolce. Lo Screwdriver bilancia la neutralità pulita della vodka con la vibrante dolcezza agli agrumi e l'acidità del succo d'arancia fresco.",
      vi: 'Tươi sáng, sảng khoái và ngọt tự nhiên. Screwdriver cân bằng tính trung tính sạch của vodka với vị ngọt cam quýt rực rỡ và độ chua của nước cam tươi.',
    },
    first_impression: {
      en: 'Bright orange citrus sweetness with a subtle vodka backbone',
      it: "Dolcezza brillante agli agrumi d'arancia con una sottile struttura di vodka",
      vi: 'Vị ngọt cam quýt tươi sáng với xương sống vodka tinh tế',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering orange citrus notes',
      it: "Finale pulito e rinfrescante con note persistenti di agrumi d'arancia",
      vi: 'Kết thúc sạch, tươi mát với hương cam quýt kéo dài',
    },
    balance: {
      en: 'Well-balanced between spirit and juice - vodka provides structure without overpowering the fresh orange flavor',
      it: "Ben bilanciato tra spirito e succo - la vodka fornisce struttura senza sopraffare il fresco sapore d'arancia",
      vi: 'Cân bằng tốt giữa rượu và nước ép - vodka cung cấp cấu trúc mà không át hương cam tươi',
    },
  },

  recommendations: {
    best_time: ['morning', 'afternoon', 'brunch'],
    occasions: ['brunch', 'casual_drink', 'poolside', 'beach', 'party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with brunch foods - eggs benedict, pancakes, French toast. Also pairs well with light breakfast pastries, fruit salads, and casual appetizers like bruschetta or chips and dip.',
      it: 'Perfetto con cibi da brunch - uova alla Benedict, pancake, French toast. Si abbina bene anche con pasticceria leggera per colazione, insalate di frutta e antipasti casual come bruschetta o patatine con salsa.',
      vi: 'Hoàn hảo với các món brunch - trứng benedict, bánh pancake, bánh mì Pháp nướng. Cũng kết hợp tốt với bánh ngọt ăn sáng nhẹ, salad trái cây và món khai vị giản dị như bruschetta hoặc khoai tây chiên với nước chấm.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy simple, refreshing drinks. An excellent choice for brunch, poolside relaxation, or anyone new to cocktails. Its simplicity makes it universally appealing and easy to customize to taste.',
      it: "Perfetto per coloro che amano le bevande semplici e rinfrescanti. Un'eccellente scelta per il brunch, il relax a bordo piscina o per chiunque sia nuovo ai cocktail. La sua semplicità lo rende universalmente attraente e facile da personalizzare al gusto.",
      vi: 'Hoàn hảo cho những ai thích đồ uống đơn giản, tươi mát. Lựa chọn tuyệt vời cho bữa brunch, thư giãn bên hồ bơi, hoặc bất kỳ ai mới làm quen với cocktail. Sự đơn giản của nó khiến nó hấp dẫn phổ quát và dễ tùy chỉnh theo khẩu vị.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
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
      display_name: { en: 'Orange juice', it: "Succo d'arancia", vi: 'Nước cam' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour vodka into a highball glass filled with ice. Add orange juice and stir gently. Garnish with an orange slice.',
    it: "Versare la vodka in un bicchiere highball pieno di ghiaccio. Aggiungere il succo d'arancia e mescolare delicatamente. Guarnire con una fetta d'arancia.",
    vi: 'Đổ vodka vào ly highball đầy đá. Thêm nước cam và khuấy nhẹ nhàng. Trang trí với lát cam.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice',
    it: "Fetta d'arancia",
    vi: 'Lát cam',
  },

  ice: 'cubes', // Served with ice

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['refreshing', 'citrus', 'light'],

  abv_estimate: 12, // ~12% ABV after dilution

  calories_estimate: 160, // Vodka + OJ

  difficulty: 'easy',

  prep_time_seconds: 30,

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
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'casual', 'poolside', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['harvey-wallbanger', 'fuzzy-navel', 'slow-screw'],

  notes_for_staff:
    'Always use fresh-squeezed orange juice when possible - never bottled concentrate. Can adjust vodka-to-juice ratio to guest preference (standard is 1:2). Some guests prefer it built in the glass, others shaken. The Harvey Wallbanger is a popular variant (add Galliano float). Simple to batch for parties.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/screwdriver/',
    notes:
      'IBA Official Recipe. Historical information from cocktail history sources and Smirnoff marketing archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
