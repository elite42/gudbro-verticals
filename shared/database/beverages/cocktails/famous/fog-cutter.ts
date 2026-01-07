/**
 * Famous Cocktails: Fog Cutter
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const fogCutter: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
  slug: 'fog-cutter',
  stable_key: 'fog_cutter_famous_tiki_tropical_cocktail',

  name: {
    en: 'Fog Cutter',
    it: 'Fog Cutter',
    vi: 'Fog Cutter',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'strong', 'potent'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Fog Cutter is a powerful tiki cocktail created by Trader Vic, combining rum, gin, brandy, and sherry with citrus and orgeat. True to its name, this potent drink was designed to "cut through the fog" with its intense mix of spirits.',
    it: 'Il Fog Cutter è un potente cocktail tiki creato da Trader Vic, che combina rum, gin, brandy e sherry con agrumi e orzata. Fedele al suo nome, questa bevanda potente è stata progettata per "tagliare la nebbia" con la sua intensa miscela di distillati.',
    vi: 'Fog Cutter là một loại cocktail tiki mạnh mẽ được tạo ra bởi Trader Vic, kết hợp rum, gin, brandy và sherry với cam quýt và orgeat. Đúng với tên gọi của nó, thức uống mạnh mẽ này được thiết kế để "cắt qua sương mù" với hỗn hợp rượu mạnh mãnh liệt.',
  },

  history: {
    created_year: '1947',
    origin: {
      city: 'Oakland',
      bar: "Trader Vic's",
      country: 'USA',
    },
    creator: {
      name: 'Victor "Trader Vic" Bergeron',
      profession: 'bartender',
    },
    story: {
      en: 'The Fog Cutter was created by Victor "Trader Vic" Bergeron in 1947 at his original restaurant in Oakland, California. Trader Vic was known for creating complex, multi-spirit tiki drinks, and the Fog Cutter represents one of his most potent inventions. The drink combines an unusual mix of rum, gin, brandy, and sherry - a combination that would be considered bizarre outside of tiki culture. Trader Vic himself warned that "after two of these, you won\'t see any fog," emphasizing the drink\'s legendary strength. The cocktail became a cornerstone of the mid-century tiki craze and remains a classic test of bartending skill.',
      it: 'Il Fog Cutter fu creato da Victor "Trader Vic" Bergeron nel 1947 nel suo ristorante originale a Oakland, California. Trader Vic era noto per creare complessi cocktail tiki multi-distillato, e il Fog Cutter rappresenta una delle sue invenzioni più potenti. La bevanda combina un insolito mix di rum, gin, brandy e sherry - una combinazione che sarebbe considerata bizzarra al di fuori della cultura tiki. Lo stesso Trader Vic avvertì che "dopo due di questi, non vedrai nessuna nebbia," sottolineando la leggendaria forza della bevanda. Il cocktail divenne un caposaldo della mania tiki della metà del secolo e rimane un classico test di abilità da barman.',
      vi: 'Fog Cutter được tạo ra bởi Victor "Trader Vic" Bergeron năm 1947 tại nhà hàng gốc của ông ở Oakland, California. Trader Vic nổi tiếng với việc tạo ra các loại cocktail tiki phức tạp, nhiều loại rượu mạnh, và Fog Cutter đại diện cho một trong những phát minh mạnh mẽ nhất của ông. Thức uống kết hợp hỗn hợp bất thường gồm rum, gin, brandy và sherry - một sự kết hợp sẽ được coi là kỳ lạ bên ngoài văn hóa tiki. Chính Trader Vic đã cảnh báo rằng "sau hai ly này, bạn sẽ không thấy bất kỳ sương mù nào," nhấn mạnh sức mạnh huyền thoại của thức uống. Cocktail trở thành nền tảng của cơn sốt tiki giữa thế kỷ và vẫn là bài kiểm tra kỹ năng pha chế cổ điển.',
    },
    named_after: {
      en: 'Named for its ability to "cut through the fog" - both the literal San Francisco fog and the mental fog from its potent mix of spirits.',
      it: 'Prende il nome dalla sua capacità di "tagliare la nebbia" - sia la nebbia letterale di San Francisco che la nebbia mentale dalla sua potente miscela di distillati.',
      vi: 'Được đặt tên theo khả năng "cắt qua sương mù" - cả sương mù thực tế của San Francisco và sương mù tinh thần từ hỗn hợp rượu mạnh mẽ của nó.',
    },
  },

  taste: {
    profile: ['complex', 'citrus', 'strong'],
    description: {
      en: 'Complex and powerful with layers of citrus, almond, and multiple spirits creating depth. The Fog Cutter balances bright lemon and orange with nutty orgeat and the warming complexity of rum, gin, brandy, and a sherry float. Deceptively smooth despite its strength.',
      it: 'Complesso e potente con strati di agrumi, mandorla e più distillati che creano profondità. Il Fog Cutter bilancia limone e arancia brillanti con orzata di noci e la complessità riscaldante di rum, gin, brandy e un galleggiante di sherry. Ingannevolmente liscio nonostante la sua forza.',
      vi: 'Phức tạp và mạnh mẽ với nhiều lớp cam quýt, hạnh nhân và nhiều loại rượu tạo chiều sâu. Fog Cutter cân bằng chanh và cam sáng với orgeat hạt và độ phức tạp ấm áp của rum, gin, brandy và một lớp sherry nổi. Mịn màng một cách lừa dối mặc dù có sức mạnh.',
    },
    first_impression: {
      en: 'Bright citrus and almond notes hit first, masking the serious spirit content underneath',
      it: 'Le note brillanti di agrumi e mandorla colpiscono per prime, mascherando il serio contenuto di distillati sottostante',
      vi: 'Hương cam quýt và hạnh nhân sáng xuất hiện đầu tiên, che giấu hàm lượng rượu nghiêm trọng bên dưới',
    },
    finish: {
      en: 'Long, warming finish with sherry complexity and lingering almond and citrus notes',
      it: 'Finale lungo e caldo con complessità di sherry e note persistenti di mandorla e agrumi',
      vi: 'Kết thúc dài, ấm áp với độ phức tạp của sherry và hương hạnh nhân và cam quýt kéo dài',
    },
    balance: {
      en: 'Surprisingly balanced given the multiple spirits - citrus and orgeat create harmony despite the boozy foundation',
      it: 'Sorprendentemente bilanciato considerati i molteplici distillati - agrumi e orzata creano armonia nonostante la base alcolica',
      vi: 'Cân bằng đáng ngạc nhiên với nhiều loại rượu - cam quýt và orgeat tạo ra sự hòa hợp mặc dù có nền rượu mạnh',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['tiki_bar', 'celebration', 'adventurous_drinking'],
    seasons: ['summer', 'autumn'],
    food_pairings: {
      en: "Perfect with Polynesian-style dishes, teriyaki chicken, grilled pork, or Chinese spare ribs. Also pairs well with rich, fatty foods that can stand up to the drink's intensity.",
      it: "Perfetto con piatti in stile polinesiano, pollo teriyaki, maiale alla griglia o costine cinesi. Si abbina bene anche con cibi ricchi e grassi che possono reggere l'intensità della bevanda.",
      vi: 'Hoàn hảo với các món kiểu Polynesia, gà teriyaki, thịt lợn nướng hoặc sườn Trung Quốc. Cũng kết hợp tốt với thức ăn giàu chất béo có thể chịu được cường độ của thức uống.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers and tiki enthusiasts seeking an authentic Trader Vic experience. Ideal for those who appreciate complex, spirit-forward cocktails. Warning: extremely potent - pace yourself.',
      it: "Perfetto per bevitori avventurosi e appassionati di tiki che cercano un'autentica esperienza Trader Vic. Ideale per chi apprezza cocktail complessi orientati ai distillati. Avvertimento: estremamente potente - fai le cose con calma.",
      vi: 'Hoàn hảo cho những người uống mạo hiểm và những người đam mê tiki tìm kiếm trải nghiệm Trader Vic chính thống. Lý tưởng cho những ai đánh giá cao cocktail phức tạp, hướng về rượu mạnh. Cảnh báo: cực kỳ mạnh - hãy uống từ từ.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_BRANDY',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Brandy', it: 'Brandy', vi: 'Brandy' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_ORGEAT',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Orgeat syrup', it: 'Sciroppo di orzata', vi: 'Xi-rô orgeat' },
    },
    {
      ingredient_id: 'ING_SHERRY_CREAM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Cream sherry (float)',
        it: 'Sherry crema (galleggiante)',
        vi: 'Cream sherry (nổi)',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients except sherry to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a fog cutter glass or tall tiki mug filled with crushed ice. Carefully float the cream sherry on top. Garnish with mint sprig.',
    it: 'Aggiungere tutti gli ingredienti tranne lo sherry in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere fog cutter o alto tiki mug pieno di ghiaccio tritato. Far galleggiare con attenzione lo sherry crema sopra. Guarnire con rametto di menta.',
    vi: 'Thêm tất cả nguyên liệu ngoại trừ sherry vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly fog cutter hoặc cốc tiki cao đầy đá nghiền. Cẩn thận làm nổi cream sherry lên trên. Trang trí với nhành bạc hà.',
  },

  glass: 'Fog cutter glass / Tall tiki mug',

  garnish: {
    en: 'Fresh mint sprig, orange slice',
    it: "Rametto di menta fresca, fetta d'arancia",
    vi: 'Nhành bạc hà tươi, lát cam',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_GIN', 'ING_BRANDY'],

  flavor_profile: ['complex', 'citrus', 'strong'],

  abv_estimate: 18,

  calories_estimate: 260,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['summer', 'autumn'],
  occasion_tags: ['tiki_bar', 'celebration', 'adventurous_drinking'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['trader-vics-fog-cutter'],

  notes_for_staff:
    'One of Trader Vic\'s most potent creations. The sherry float is essential - pour carefully over the back of a spoon. Orgeat contains almonds. Warn guests: "Two of these and you won\'t see any fog." Very strong - limit to 1-2 per guest.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://tradervics.com/cocktails/',
    notes:
      "Original Trader Vic recipe from 1947. Trader Vic's Bartender's Guide. Tiki cocktail archives.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
