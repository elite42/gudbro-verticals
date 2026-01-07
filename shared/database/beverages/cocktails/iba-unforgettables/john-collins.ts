/**
 * IBA Unforgettables: John Collins
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const johnCollins: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'ee47d6a4-8259-4123-81ba-b8958f32dd38',
  slug: 'john-collins',
  stable_key: '7ec34e7da35c6b3b8aade19d2ba6c0b3542b9b36',

  name: {
    en: 'John Collins',
    it: 'John Collins',
    vi: 'John Collins',
    ko: '존 콜린스',
    ja: 'ジョンコリンズ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'tall', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A tall, refreshing classic from Victorian London. The John Collins combines gin, fresh lemon juice, sugar, and soda water in a highball glass, creating a light and effervescent drink perfect for any occasion.',
    it: 'Un classico alto e rinfrescante della Londra vittoriana. Il John Collins combina gin, succo di limone fresco, zucchero e acqua frizzante in un bicchiere highball, creando una bevanda leggera ed effervescente perfetta per ogni occasione.',
    vi: 'Một cocktail cổ điển cao, sảng khoái từ London thời Victoria. John Collins kết hợp gin, nước cốt chanh tươi, đường và nước soda trong ly highball, tạo ra thức uống nhẹ và sủi bọt hoàn hảo cho mọi dịp.',
  },

  history: {
    created_year: '1790',
    origin: {
      city: 'London',
      bar: "Limmer's Old House",
      country: 'United Kingdom',
    },
    creator: {
      name: 'John Collins',
      profession: 'bartender',
    },
    story: {
      en: "The John Collins is believed to have originated with a headwaiter named John Collins who worked at Limmer's Old House in Conduit Street in Mayfair, a popular London hotel and coffee house around 1790-1817. Limmer's was described as a chaotic, lively sporting bar with cock fighting, duels, gambling and plenty of drinking. A rhyme by Frank and Charles Sheridan immortalized him: \"My name is John Collins, head waiter at Limmer's, Corner of Conduit Street, Hanover Square.\" The drink originally used genever (Holland gin), a malty, sweet spirit that predates modern gin. The famous Tom Collins variant emerged when bartenders began using Old Tom gin instead of genever, eventually leading to the name change.",
      it: "Si ritiene che il John Collins abbia avuto origine con un capo cameriere di nome John Collins che lavorava al Limmer's Old House in Conduit Street a Mayfair, un popolare hotel e caffetteria londinese intorno al 1790-1817. Limmer's era descritto come un bar sportivo caotico e vivace con combattimenti di galli, duelli, gioco d'azzardo e tanto da bere. Una rima di Frank e Charles Sheridan lo ha immortalato: \"Il mio nome è John Collins, capo cameriere al Limmer's, angolo di Conduit Street, Hanover Square.\" La bevanda utilizzava originariamente genever (gin olandese), uno spirito maltato e dolce che precede il gin moderno. La famosa variante Tom Collins è emersa quando i barman hanno iniziato a usare Old Tom gin invece del genever.",
      vi: "John Collins được cho là có nguồn gốc từ một trưởng phục vụ tên John Collins làm việc tại Limmer's Old House trên phố Conduit ở Mayfair, một khách sạn và quán cà phê nổi tiếng ở London khoảng năm 1790-1817. Limmer's được mô tả là một quầy bar thể thao hỗn loạn, sôi động với chọi gà, quyết đấu, cờ bạc và nhiều rượu. Một bài thơ của Frank và Charles Sheridan đã ghi nhớ ông: \"Tên tôi là John Collins, trưởng phục vụ tại Limmer's, góc phố Conduit, quảng trường Hanover.\" Đồ uống ban đầu sử dụng genever (gin Hà Lan), một loại rượu mạnh mạch nha, ngọt có trước gin hiện đại. Biến thể Tom Collins nổi tiếng xuất hiện khi bartender bắt đầu dùng Old Tom gin thay vì genever.",
    },
    named_after: {
      en: 'Named after John Collins, the headwaiter at Limmer\'s Old House who created the original drink. The variant "Tom Collins" came later when Old Tom gin replaced genever.',
      it: 'Prende il nome da John Collins, il capo cameriere al Limmer\'s Old House che ha creato la bevanda originale. La variante "Tom Collins" è arrivata dopo quando Old Tom gin ha sostituito il genever.',
      vi: 'Được đặt tên theo John Collins, trưởng phục vụ tại Limmer\'s Old House người đã tạo ra thức uống gốc. Biến thể "Tom Collins" xuất hiện sau khi Old Tom gin thay thế genever.',
    },
  },

  taste: {
    profile: ['citrus', 'refreshing', 'effervescent'],
    description: {
      en: 'A bright, zesty cocktail that perfectly balances citrus tartness with gentle sweetness. The gin provides botanical depth while soda water adds refreshing effervescence. Light, crisp, and endlessly drinkable.',
      it: "Un cocktail brillante e vivace che bilancia perfettamente l'asprezza degli agrumi con una dolcezza delicata. Il gin fornisce profondità botanica mentre l'acqua frizzante aggiunge un'effervescenza rinfrescante. Leggero, fresco e infinitamente bevibile.",
      vi: 'Một cocktail tươi sáng, sống động cân bằng hoàn hảo vị chua của chanh với vị ngọt nhẹ nhàng. Gin mang lại chiều sâu thảo mộc trong khi nước soda thêm bọt khí sảng khoái. Nhẹ, giòn và dễ uống vô cùng.',
    },
    first_impression: {
      en: "Immediate bright lemon acidity with the refreshing sparkle of soda. The gin's botanicals provide complexity without overwhelming the citrus focus.",
      it: 'Acidità di limone brillante immediata con il frizzante rinfrescante della soda. I botanici del gin forniscono complessità senza sopraffare il focus sugli agrumi.',
      vi: 'Độ chua chanh tươi sáng ngay lập tức với bọt khí sảng khoái của soda. Các thảo mộc của gin mang lại sự phức tạp mà không làm lu mờ trọng tâm cam quýt.',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus notes. The soda keeps it light and effervescent throughout.',
      it: 'Finale pulito e rinfrescante con note di agrumi persistenti. La soda lo mantiene leggero ed effervescente per tutto il tempo.',
      vi: 'Hậu vị sạch, sảng khoái với các nốt chanh kéo dài. Soda giữ cho nó nhẹ và sủi bọt suốt.',
    },
    balance: {
      en: 'Expertly balanced between sweet and sour with gin providing botanical backbone. The soda dilutes and refreshes without washing out flavor.',
      it: 'Perfettamente bilanciato tra dolce e aspro con il gin che fornisce una spina dorsale botanica. La soda diluisce e rinfresca senza lavare via il sapore.',
      vi: 'Cân bằng chuyên nghiệp giữa ngọt và chua với gin cung cấp xương sống thảo mộc. Soda pha loãng và làm tươi mà không làm mất hương vị.',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'garden_party', 'brunch', 'summer'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Light seafood, garden salads, grilled fish, lemon chicken, fresh fruit. Perfect alongside picnic foods and summer fare.',
      it: 'Frutti di mare leggeri, insalate da giardino, pesce alla griglia, pollo al limone, frutta fresca. Perfetto insieme a cibi da picnic e piatti estivi.',
      vi: 'Hải sản nhẹ, salad vườn, cá nướng, gà chanh, trái cây tươi. Hoàn hảo cùng đồ ăn picnic và món ăn mùa hè.',
    },
    ideal_for: {
      en: 'Anyone seeking a refreshing, easy-drinking cocktail. Perfect for warm weather, outdoor gatherings, or as a revitalizing afternoon drink.',
      it: "Chiunque cerchi un cocktail rinfrescante e facile da bere. Perfetto per il clima caldo, riunioni all'aperto o come bevanda rivitalizzante del pomeriggio.",
      vi: 'Bất kỳ ai tìm kiếm cocktail sảng khoái, dễ uống. Hoàn hảo cho thời tiết ấm, tụ tập ngoài trời hoặc như đồ uống tiếp sức buổi chiều.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Fresh Lemon Juice',
        it: 'Succo di Limone Fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple Syrup', it: 'Sciroppo Semplice', vi: 'Siro đơn giản' },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Soda Water', it: 'Acqua Frizzante', vi: 'Nước soda' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour all ingredients directly into highball glass filled with ice. Stir gently to combine.',
    it: 'Versare tutti gli ingredienti direttamente nel bicchiere highball pieno di ghiaccio. Mescolare delicatamente per combinare.',
    vi: 'Đổ tất cả nguyên liệu trực tiếp vào ly highball đầy đá. Khuấy nhẹ để kết hợp.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon slice and maraschino cherry',
    it: 'Fetta di limone e ciliegia maraschino',
    vi: 'Lát chanh và cherry maraschino',
  },

  ice: 'cubes',
  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['citrus', 'refreshing', 'effervescent', 'light'],
  abv_estimate: 9,
  calories_estimate: 165,
  difficulty: 'easy',
  prep_time_seconds: 90,

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
  occasion_tags: ['casual', 'garden_party', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    {
      name: 'Tom Collins',
      description: 'Use Old Tom gin for a slightly sweeter version',
    },
    {
      name: 'Vodka Collins',
      description: 'Replace gin with vodka for a neutral base',
    },
    {
      name: 'Whiskey Collins',
      description: 'Use whiskey instead of gin',
    },
  ],

  notes_for_staff:
    'Always use fresh-squeezed lemon juice. Build directly in glass to maintain carbonation. Add soda last and stir gently. The IBA notes to use Old Tom gin for a Tom Collins variant. Keep garnishes fresh.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/john-collins/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
