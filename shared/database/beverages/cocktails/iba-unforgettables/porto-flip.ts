/**
 * IBA Unforgettables: Porto Flip
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const portoFlip: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d',
  slug: 'porto-flip',
  stable_key: 'c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8',

  name: {
    en: 'Porto Flip',
    it: 'Porto Flip',
    vi: 'Porto Flip',
    ko: '포르토 플립',
    ja: 'ポルト・フリップ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'creamy', 'rich', 'after-dinner', 'historical'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A rich, velvety historical cocktail combining brandy, ruby port, and egg yolk. Dating back to the 19th century, the Porto Flip is silky smooth, decadent, and warming - a luxurious after-dinner indulgence topped with freshly grated nutmeg.',
    it: 'Un cocktail storico ricco e vellutato che combina brandy, porto ruby e tuorlo d\'uovo. Risalente al XIX secolo, il Porto Flip è setoso, decadente e caldo - un\'indulgenza lussuosa dopo cena guarnita con noce moscata appena grattugiata.',
    vi: 'Một cocktail lịch sử đậm đà, mượt mà kết hợp brandy, porto ruby và lòng đỏ trứng. Có từ thế kỷ 19, Porto Flip mịn màng như lụa, xa hoa và ấm áp - một sự nuông chiều sang trọng sau bữa tối với nhục đậu khấu mới xay.',
  },

  history: {
    created_year: '1887',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA/UK',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Porto Flip has deep roots dating back to the 19th century. The name "Porto" clearly nods to its main ingredient, Ruby Port, a fortified wine from Portugal. This drink first appeared in renowned bartending manuals of the time, including Jerry Thomas\'s 1887 book "How to Mix Drinks or The Bon Vivant\'s Companion." "Flip" cocktails were a popular category in the 1800s, characterized by the addition of a whole egg or egg yolk, which creates a rich, frothy texture. The Porto Flip is a historical after-dinner cocktail that showcases the elegance of classic mixology.',
      it: 'Il Porto Flip ha radici profonde che risalgono al XIX secolo. Il nome "Porto" fa chiaramente riferimento al suo ingrediente principale, il Porto Ruby, un vino fortificato del Portogallo. Questo drink apparve per la prima volta nei manuali di barman rinomati dell\'epoca, incluso il libro di Jerry Thomas del 1887 "How to Mix Drinks or The Bon Vivant\'s Companion." I cocktail "Flip" erano una categoria popolare nel 1800, caratterizzati dall\'aggiunta di un uovo intero o tuorlo d\'uovo, che crea una consistenza ricca e schiumosa. Il Porto Flip è un cocktail storico dopo cena che mostra l\'eleganza della mixology classica.',
      vi: 'Porto Flip có nguồn gốc sâu xa từ thế kỷ 19. Cái tên "Porto" rõ ràng gợi ý đến thành phần chính của nó, Ruby Port, một loại rượu vang tăng cường từ Bồ Đào Nha. Thức uống này lần đầu tiên xuất hiện trong các sách hướng dẫn pha chế nổi tiếng thời đó, bao gồm cuốn sách "How to Mix Drinks or The Bon Vivant\'s Companion" của Jerry Thomas năm 1887. Các cocktail "Flip" là một danh mục phổ biến vào những năm 1800, được đặc trưng bởi việc thêm một quả trứng nguyên quả hoặc lòng đỏ trứng, tạo ra kết cấu đậm đà, sủi bọt. Porto Flip là một cocktail lịch sử sau bữa tối thể hiện sự thanh lịch của nghệ thuật pha chế cổ điển.',
    },
    named_after: {
      en: 'Named after Porto (Port wine) and the "flip" style of cocktails which include egg.',
      it: 'Prende il nome dal Porto (vino Porto) e dallo stile "flip" dei cocktail che includono uovo.',
      vi: 'Được đặt tên theo Porto (rượu Port) và phong cách "flip" của cocktail có trứng.',
    },
  },

  taste: {
    profile: ['rich', 'creamy', 'sweet'],
    description: {
      en: 'Rich and luxurious with velvety egg yolk creating a silky texture. The brandy provides warmth and depth, while ruby port adds sweet, fruity notes with hints of berries and spice. Nutmeg on top adds aromatic complexity. Decadent and satisfying.',
      it: 'Ricco e lussuoso con tuorlo d\'uovo vellutato che crea una consistenza setosa. Il brandy fornisce calore e profondità, mentre il porto ruby aggiunge note dolci e fruttate con sentori di bacche e spezie. La noce moscata in cima aggiunge complessità aromatica. Decadente e soddisfacente.',
      vi: 'Đậm đà và sang trọng với lòng đỏ trứng mượt mà tạo kết cấu như lụa. Brandy cung cấp sự ấm áp và chiều sâu, trong khi porto ruby thêm hương vị ngọt, trái cây với gợi ý quả mọng và gia vị. Nhục đậu khấu trên đỉnh thêm độ phức tạp thơm. Xa hoa và thỏa mãn.',
    },
    first_impression: {
      en: 'Rich, creamy texture with sweet port and aromatic nutmeg',
      it: 'Consistenza ricca e cremosa con porto dolce e noce moscata aromatica',
      vi: 'Kết cấu đậm đà, kem với porto ngọt và nhục đậu khấu thơm',
    },
    finish: {
      en: 'Long, warming finish with lingering port sweetness and spice',
      it: 'Finale lungo e caldo con dolcezza persistente di porto e spezie',
      vi: 'Kết thúc dài, ấm áp với vị ngọt porto và gia vị kéo dài',
    },
    balance: {
      en: 'Rich and indulgent with balanced sweetness and warmth',
      it: 'Ricco e indulgente con dolcezza e calore bilanciati',
      vi: 'Đậm đà và nuông chiều với vị ngọt và sự ấm áp cân bằng',
    },
  },

  recommendations: {
    best_time: ['after_dinner', 'late_night', 'dessert'],
    occasions: ['digestivo', 'nightcap', 'special_occasion', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect with desserts like chocolate cake, tiramisu, or crème brûlée. Also pairs with nuts, dried fruits, aged cheese, or as a dessert replacement.',
      it: 'Perfetto con dessert come torta al cioccolato, tiramisù o crème brûlée. Si abbina anche con noci, frutta secca, formaggi stagionati o come sostituto del dessert.',
      vi: 'Hoàn hảo với các món tráng miệng như bánh chocolate, tiramisu hoặc crème brûlée. Cũng kết hợp với hạt, trái cây sấy khô, phô mai già hoặc thay thế món tráng miệng.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy rich, creamy after-dinner drinks. Ideal for brandy and port lovers seeking something unique and historical. Great for adventurous drinkers willing to try egg-based cocktails.',
      it: 'Perfetto per chi ama bevande ricche e cremose dopo cena. Ideale per gli amanti del brandy e del porto che cercano qualcosa di unico e storico. Ottimo per bevitori avventurosi disposti a provare cocktail a base di uova.',
      vi: 'Hoàn hảo cho những ai thích đồ uống đậm đà, kem sau bữa tối. Lý tưởng cho người yêu brandy và porto tìm kiếm thứ gì đó độc đáo và lịch sử. Tuyệt vời cho những người uống phiêu lưu sẵn sàng thử cocktail dựa trên trứng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BRANDY',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Brandy', it: 'Brandy', vi: 'Brandy' },
    },
    {
      ingredient_id: 'ING_RUBY_PORT',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Ruby port', it: 'Porto ruby', vi: 'Ruby port' },
    },
    {
      ingredient_id: 'ING_EGG_YOLK',
      quantity: { amount: 1, unit: 'whole' },
      display_name: { en: 'Egg yolk', it: 'Tuorlo d\'uovo', vi: 'Lòng đỏ trứng' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass. Sprinkle with fresh ground nutmeg.',
    it: 'Versare tutti gli ingredienti nello shaker, shakerare bene con ghiaccio, filtrare in una coppa da cocktail raffreddata. Spolverare con noce moscata appena macinata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail, lắc kỹ với đá, lọc vào ly cocktail đã làm lạnh. Rắc nhục đậu khấu mới xay.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Freshly grated nutmeg',
    it: 'Noce moscata appena grattugiata',
    vi: 'Nhục đậu khấu mới xay',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BRANDY', 'ING_RUBY_PORT'],

  flavor_profile: ['rich', 'creamy', 'sweet'],

  abv_estimate: 14, // ~14% ABV after dilution

  calories_estimate: 200,

  difficulty: 'intermediate',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['egg', 'sulphites'],
    intolerances: ['egg_intolerance', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'nightcap', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['sherry-flip', 'brandy-flip', 'alexander'],

  notes_for_staff: 'Use fresh egg yolk only. Shake vigorously to properly emulsify the yolk. Ruby port is traditional - tawny port can also be used. Freshly grate nutmeg over the top just before serving. Some variations use whole egg instead of just yolk.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 40,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/porto-flip/',
    note: 'IBA Official Recipe. Historical information from Jerry Thomas "How to Mix Drinks" (1887) and 19th century cocktail documentation.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
