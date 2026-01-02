/**
 * Famous Cocktails: Scotch and Soda
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const scotchAndSoda: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-5678-9012-e567-901234567890',
  slug: 'scotch-and-soda',
  stable_key: 'c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',

  name: {
    en: 'Scotch and Soda',
    it: 'Scotch and Soda',
    vi: 'Scotch and Soda',
    ko: '스카치 앤 소다',
    ja: 'スコッチ・アンド・ソーダ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'scotch', 'whisky', 'classic', 'simple'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The ultimate minimalist cocktail - Scotch whisky lengthened with club soda. This classic highball is beloved for its simplicity, allowing the Scotch\'s character to shine while adding refreshing effervescence.',
    it: 'Il cocktail minimalista per eccellenza - whisky scozzese allungato con acqua di seltz. Questo classico highball è amato per la sua semplicità, permettendo al carattere dello Scotch di brillare mentre aggiunge effervescenza rinfrescante.',
    vi: 'Cocktail tối giản tối thượng - whisky Scotch pha loãng với soda. Highball cổ điển này được yêu thích vì sự đơn giản, cho phép đặc tính của Scotch tỏa sáng trong khi thêm bọt khí tươi mát.',
  },

  history: {
    created_year: '1890',
    origin: {
      city: 'United Kingdom',
      country: 'UK',
    },
    story: {
      en: 'The Scotch and Soda is one of the oldest and simplest highball cocktails, dating back to the late 19th century when carbonated water became commercially available. It gained popularity in gentlemen\'s clubs in Britain and later became a staple in American bars during the mid-20th century. The drink became synonymous with sophistication and was the preferred drink of many business executives and Mad Men-era advertising executives. Its enduring appeal lies in its simplicity and the way it showcases quality Scotch without masking its character.',
      it: 'Lo Scotch and Soda è uno dei cocktail highball più antichi e semplici, risalente alla fine del XIX secolo quando l\'acqua gassata divenne disponibile commercialmente. Guadagnò popolarità nei club per gentiluomini in Gran Bretagna e successivamente divenne un punto fermo nei bar americani a metà del XX secolo. Il drink divenne sinonimo di raffinatezza e fu la bevanda preferita di molti dirigenti d\'azienda e dirigenti pubblicitari dell\'era Mad Men. Il suo fascino duraturo risiede nella sua semplicità e nel modo in cui mette in mostra uno Scotch di qualità senza mascherarne il carattere.',
      vi: 'Scotch and Soda là một trong những cocktail highball lâu đời nhất và đơn giản nhất, có từ cuối thế kỷ 19 khi nước có ga trở nên có sẵn trên thương mại. Nó trở nên phổ biến ở các câu lạc bộ quý ông ở Anh và sau đó trở thành thức uống chính ở các quán bar Mỹ vào giữa thế kỷ 20. Thức uống trở thành đồng nghĩa với sự tinh tế và là thức uống ưa thích của nhiều giám đốc điều hành kinh doanh và giám đốc quảng cáo thời kỳ Mad Men. Sức hấp dẫn lâu dài của nó nằm ở sự đơn giản và cách nó thể hiện Scotch chất lượng mà không che giấu đặc tính của nó.',
    },
    named_after: {
      en: 'Simply named after its two ingredients: Scotch whisky and soda water.',
      it: 'Semplicemente prende il nome dai suoi due ingredienti: whisky scozzese e acqua di seltz.',
      vi: 'Đơn giản được đặt theo hai nguyên liệu của nó: whisky Scotch và nước soda.',
    },
  },

  taste: {
    profile: ['smoky', 'malty', 'refreshing', 'clean'],
    description: {
      en: 'The Scotch\'s character takes center stage - whether smoky, peaty, or smooth and sweet - diluted just enough to be refreshing without losing complexity. The soda adds effervescence and opens up the whisky\'s aromatics, creating a lighter, more sessionable drink.',
      it: 'Il carattere dello Scotch prende il centro della scena - che sia affumicato, torbato, o morbido e dolce - diluito quanto basta per essere rinfrescante senza perdere complessità. La soda aggiunge effervescenza e apre gli aromi del whisky, creando un drink più leggero e più bevibile.',
      vi: 'Đặc tính của Scotch chiếm vị trí trung tâm - dù khói, than bùn, hoặc mượt mà và ngọt ngào - được pha loãng vừa đủ để tươi mát mà không mất đi sự phức tạp. Soda thêm bọt khí và mở ra hương thơm của whisky, tạo ra thức uống nhẹ hơn, dễ uống hơn.',
    },
    first_impression: {
      en: 'Scotch character (smoky or sweet) with clean effervescence',
      it: 'Carattere dello Scotch (affumicato o dolce) con effervescenza pulita',
      vi: 'Đặc tính Scotch (khói hoặc ngọt) với bọt khí trong sạch',
    },
    finish: {
      en: 'Clean finish showcasing the Scotch\'s natural character',
      it: 'Finale pulito che mette in mostra il carattere naturale dello Scotch',
      vi: 'Kết thúc trong sạch thể hiện đặc tính tự nhiên của Scotch',
    },
    balance: {
      en: 'Perfect dilution - refreshing without over-diluting the whisky\'s complexity',
      it: 'Diluizione perfetta - rinfrescante senza diluire eccessivamente la complessità del whisky',
      vi: 'Pha loãng hoàn hảo - tươi mát mà không pha loãng quá mức sự phức tạp của whisky',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon', 'late_night'],
    occasions: ['casual', 'business', 'social', 'relaxation'],
    seasons: ['all-year'],
    food_pairings: {
      en: 'Pairs excellently with Scottish fare, smoked salmon, oysters, aged cheeses, and charcuterie. Perfect with steak, grilled meats, and hearty pub food.',
      it: 'Si abbina eccellentemente con piatti scozzesi, salmone affumicato, ostriche, formaggi stagionati e salumi. Perfetto con bistecca, carni alla griglia e piatti sostanziosi da pub.',
      vi: 'Kết hợp tuyệt vời với món ăn Scotland, cá hồi hun khói, hàu, phô mai lâu năm và charcuterie. Hoàn hảo với bít tết, thịt nướng và đồ ăn pub thịnh soạn.',
    },
    ideal_for: {
      en: 'Perfect for Scotch lovers who want a lighter, more refreshing drink. Great for business settings, casual conversations, or anyone who appreciates quality whisky in a more sessionable format. Ideal for warm weather Scotch drinking.',
      it: 'Perfetto per gli amanti dello Scotch che vogliono un drink più leggero e rinfrescante. Ottimo per contesti aziendali, conversazioni informali o per chiunque apprezzi un whisky di qualità in un formato più bevibile. Ideale per bere Scotch con il caldo.',
      vi: 'Hoàn hảo cho người yêu Scotch muốn thức uống nhẹ hơn, tươi mát hơn. Tuyệt vời cho môi trường kinh doanh, cuộc trò chuyện thân mật hoặc bất kỳ ai đánh giá cao whisky chất lượng ở định dạng dễ uống hơn. Lý tưởng cho việc uống Scotch trong thời tiết ấm áp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SCOTCH_WHISKY',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Scotch whisky', it: 'Whisky scozzese', vi: 'Whisky Scotch' },
    },
    {
      ingredient_id: 'ING_CLUB_SODA',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Club soda', it: 'Acqua di seltz', vi: 'Soda' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour Scotch over ice. Top with club soda. Stir gently once. Garnish with a lemon twist or serve plain.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare lo Scotch sul ghiaccio. Completare con acqua di seltz. Mescolare delicatamente una volta. Guarnire con una scorza di limone o servire liscio.',
    vi: 'Đổ đầy ly highball với đá. Rót Scotch lên đá. Thêm soda lên trên. Khuấy nhẹ một lần. Trang trí với vỏ chanh xoắn hoặc phục vụ không trang trí.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon twist (optional)',
    it: 'Scorza di limone (opzionale)',
    vi: 'Vỏ chanh xoắn (tùy chọn)',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SCOTCH_WHISKY'],

  flavor_profile: ['smoky', 'malty', 'refreshing', 'clean'],

  abv_estimate: 12,

  calories_estimate: 135,

  difficulty: 'easy',

  prep_time_seconds: 20,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'gluten'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'gluten_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'dairy-free'],
  season_tags: ['all-year'],
  occasion_tags: ['casual', 'business', 'social'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bourbon-and-soda', 'whisky-highball'],

  notes_for_staff: 'Use quality Scotch as it\'s the star. Ratio is flexible - some prefer 2:1 soda to Scotch, others prefer equal parts. Stir gently to preserve carbonation. Some purists serve without garnish.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1244/scotch-and-soda',
    note: 'Classic highball from late 19th century, popularized in gentlemen\'s clubs.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
