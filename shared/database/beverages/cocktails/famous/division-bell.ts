/**
 * Famous Cocktails: Division Bell
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const divisionBell: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
  slug: 'division-bell',
  stable_key: '423244758392084756382910485736291847563829',

  name: {
    en: 'Division Bell',
    it: 'Division Bell',
    vi: 'Division Bell',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'mezcal', 'aperol', 'herbal'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A modern classic in the Last Word family, the Division Bell combines mezcal's smoke with Aperol's bitter orange and Chartreuse's herbal complexity. Created by Phil Ward, this equal-parts cocktail is beautifully balanced, smoky, and refreshingly bitter-sweet with a distinctive pink-orange hue.",
    it: "Un classico moderno nella famiglia del Last Word, il Division Bell combina il fumo del mezcal con l'arancia amara dell'Aperol e la complessità erbaccea del Chartreuse. Creato da Phil Ward, questo cocktail a parti uguali è magnificamente bilanciato, affumicato e rinfrescantemente amaro-dolce con una distintiva tonalità rosa-arancio.",
    vi: 'Một tác phẩm cổ điển hiện đại trong gia đình Last Word, Division Bell kết hợp khói của mezcal với cam đắng của Aperol và độ phức tạp thảo mộc của Chartreuse. Được tạo ra bởi Phil Ward, cocktail phần bằng nhau này cân bằng tuyệt đẹp, khói và đắng-ngọt sảng khoái với màu hồng-cam đặc trưng.',
  },

  history: {
    created_year: '2009',
    origin: {
      city: 'New York City',
      bar: 'Mayahuel',
      country: 'USA',
    },
    creator: {
      name: 'Phil Ward',
      profession: 'bartender',
    },
    story: {
      en: "Phil Ward created the Division Bell in 2009 at Mayahuel, a mezcal-focused bar in New York City. Following his successful Final Ward (rye variation of Last Word), Ward wanted to create another member of the Last Word family using mezcal. He combined mezcal with Aperol and Chartreuse in equal parts with lime, creating a drink that's smoky, herbal, and bittersweet. The name references Pink Floyd's album \"The Division Bell,\" inspired by the cocktail's distinctive pink-orange color. It quickly became a modern classic and essential template for equal-parts cocktails.",
      it: 'Phil Ward creò il Division Bell nel 2009 al Mayahuel, un bar incentrato sul mezcal a New York City. Dopo il suo successo Final Ward (variante al rye del Last Word), Ward voleva creare un altro membro della famiglia Last Word usando il mezcal. Combinò il mezcal con Aperol e Chartreuse in parti uguali con lime, creando una bevanda affumicata, erbacea e agrodolce. Il nome fa riferimento all\'album dei Pink Floyd "The Division Bell," ispirato dal distintivo colore rosa-arancio del cocktail. Divenne rapidamente un classico moderno e modello essenziale per i cocktail a parti uguali.',
      vi: 'Phil Ward đã tạo ra Division Bell vào năm 2009 tại Mayahuel, một quán bar tập trung vào mezcal ở New York City. Sau thành công của Final Ward (biến thể rye của Last Word), Ward muốn tạo ra một thành viên khác của gia đình Last Word sử dụng mezcal. Ông kết hợp mezcal với Aperol và Chartreuse theo phần bằng nhau với chanh, tạo ra thức uống khói, thảo mộc và đắng ngọt. Tên gọi ám chỉ album "The Division Bell" của Pink Floyd, lấy cảm hứng từ màu hồng-cam đặc trưng của cocktail. Nó nhanh chóng trở thành tác phẩm cổ điển hiện đại và mẫu thiết yếu cho cocktail phần bằng nhau.',
    },
    named_after: {
      en: 'Named after Pink Floyd\'s 1994 album "The Division Bell," inspired by the cocktail\'s distinctive pink-orange color.',
      it: 'Prende il nome dall\'album dei Pink Floyd del 1994 "The Division Bell," ispirato dal distintivo colore rosa-arancio del cocktail.',
      vi: 'Được đặt tên theo album năm 1994 "The Division Bell" của Pink Floyd, lấy cảm hứng từ màu hồng-cam đặc trưng của cocktail.',
    },
  },

  taste: {
    profile: ['smoky', 'bitter', 'herbal', 'citrus'],
    description: {
      en: 'Complex and beautifully balanced. Mezcal provides earthy, smoky depth, while Aperol contributes bitter-sweet orange notes. Yellow Chartreuse adds herbal sweetness and complexity, and fresh lime brings brightness. The equal-parts formula creates a drink where smoke, bitter, herbal, and citrus elements harmonize perfectly. More approachable than the intense Final Ward, with a refreshing quality.',
      it: "Complesso e magnificamente bilanciato. Il mezcal fornisce profondità terrosa e affumicata, mentre l'Aperol contribuisce con note amare-dolci di arancia. Il Yellow Chartreuse aggiunge dolcezza erbacea e complessità, e il lime fresco porta brillantezza. La formula a parti uguali crea una bevanda dove gli elementi affumicati, amari, erbacei e agrumati si armonizzano perfettamente. Più accessibile dell'intenso Final Ward, con una qualità rinfrescante.",
      vi: 'Phức tạp và cân bằng tuyệt đẹp. Mezcal cung cấp độ sâu đất, khói, trong khi Aperol đóng góp hương cam đắng-ngọt. Yellow Chartreuse thêm vị ngọt thảo mộc và độ phức tạp, và chanh tươi mang lại độ tươi sáng. Công thức phần bằng nhau tạo ra thức uống nơi các yếu tố khói, đắng, thảo mộc và cam quýt hòa quyện hoàn hảo. Dễ tiếp cận hơn Final Ward mạnh mẽ, với chất lượng sảng khoái.',
    },
    first_impression: {
      en: 'Smoke and bitter orange hit first, followed by herbal and citrus notes',
      it: 'Fumo e arancia amara colpiscono per primi, seguiti da note erbacee e agrumate',
      vi: 'Khói và cam đắng đập vào đầu tiên, tiếp theo là hương thảo mộc và cam quýt',
    },
    finish: {
      en: 'Medium finish with lingering smoke, herbs, and pleasant bitterness',
      it: 'Finale medio con fumo, erbe e piacevole amarezza persistenti',
      vi: 'Kết thúc vừa phải với khói, thảo mộc và vị đắng dễ chịu kéo dài',
    },
    balance: {
      en: 'Perfectly balanced equal-parts formula - smoke, bitter, herbal, citrus in harmony',
      it: 'Formula a parti uguali perfettamente bilanciata - fumo, amaro, erbaceo, agrumi in armonia',
      vi: 'Công thức phần bằng nhau cân bằng hoàn hảo - khói, đắng, thảo mộc, cam quýt hòa quyện',
    },
  },

  recommendations: {
    best_time: ['evening', 'aperitivo', 'cocktail_hour'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'summer_gathering'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with Italian aperitivo foods like olives, cured meats, or bruschetta. Also pairs well with grilled seafood, Mexican cuisine, citrus-based dishes, and herbal salads.',
      it: 'Eccellente con cibi da aperitivo italiano come olive, salumi o bruschetta. Si abbina bene anche con frutti di mare alla griglia, cucina messicana, piatti a base di agrumi e insalate alle erbe.',
      vi: 'Tuyệt vời với đồ ăn aperitivo Ý như ô liu, thịt nguội, hoặc bruschetta. Cũng kết hợp tốt với hải sản nướng, món Mexico, các món cam quýt và salad thảo mộc.',
    },
    ideal_for: {
      en: 'Perfect for mezcal lovers and fans of the Last Word family. Ideal for those who enjoy bitter cocktails with complexity. Great for aperitivo hour and summer evenings. A must-try for anyone exploring modern classics.',
      it: "Perfetto per gli amanti del mezcal e i fan della famiglia Last Word. Ideale per chi ama i cocktail amari con complessità. Ottimo per l'ora dell'aperitivo e le serate estive. Da provare assolutamente per chiunque esplori i classici moderni.",
      vi: 'Hoàn hảo cho những người yêu mezcal và người hâm mộ gia đình Last Word. Lý tưởng cho những ai thích cocktail đắng với độ phức tạp. Tuyệt vời cho giờ aperitivo và buổi tối mùa hè. Bắt buộc phải thử cho bất kỳ ai khám phá tác phẩm cổ điển hiện đại.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_MEZCAL',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Aperol', it: 'Aperol', vi: 'Aperol' },
    },
    {
      ingredient_id: 'ING_YELLOW_CHARTREUSE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Yellow Chartreuse', it: 'Yellow Chartreuse', vi: 'Yellow Chartreuse' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a chilled coupe or Nick & Nora glass. Garnish with a grapefruit twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa o bicchiere Nick & Nora raffreddato. Guarnire con una scorza di pompelmo.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc Nick & Nora đã được làm lạnh. Trang trí với vỏ bưởi xoắn.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Grapefruit twist',
    it: 'Scorza di pompelmo',
    vi: 'Vỏ bưởi xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_MEZCAL'],

  flavor_profile: ['smoky', 'bitter', 'herbal', 'citrus'],

  abv_estimate: 25,

  calories_estimate: 170,

  difficulty: 'intermediate',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'summer_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['last-word', 'final-ward', 'naked-and-famous'],

  notes_for_staff:
    'Equal parts formula - precision essential. Use Yellow Chartreuse, not Green. Fresh lime juice only. Part of the Last Word family alongside Final Ward and Naked & Famous. Pink-orange color is signature - presentation matters.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://punchdrink.com/recipes/division-bell/',
    notes: 'Created by Phil Ward at Mayahuel, New York City, 2009.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
