/**
 * IBA Unforgettables: Stinger
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const stinger: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
  slug: 'stinger',
  stable_key: 'f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5',

  name: {
    en: 'Stinger',
    it: 'Stinger',
    vi: 'Stinger',
    ko: '스팅거',
    ja: 'スティンガー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'after-dinner', 'digestif', 'two-ingredient'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated two-ingredient after-dinner cocktail combining cognac with white crème de menthe. The Stinger is refreshingly minty yet warming - a classic digestif that\'s both simple and elegant, perfect for ending an evening on a refined note.',
    it: 'Un sofisticato cocktail dopo cena a due ingredienti che combina cognac con crème de menthe bianca. Lo Stinger è rinfrescante alla menta ma caldo - un classico digestivo che è allo stesso tempo semplice ed elegante, perfetto per concludere una serata con una nota raffinata.',
    vi: 'Một cocktail tinh tế hai thành phần sau bữa tối kết hợp cognac với crème de menthe trắng. Stinger mát mẻ bạc hà nhưng ấm áp - một digestif cổ điển vừa đơn giản vừa thanh lịch, hoàn hảo để kết thúc buổi tối với nốt nhạc tinh tế.',
  },

  history: {
    created_year: '1890s',
    origin: {
      city: 'New York City',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Stinger likely originated in the 1890s and became particularly popular during Prohibition (1920-1933) when the mint helped mask inferior spirits. The drink gained significant cultural cache in the mid-20th century, becoming the preferred nightcap of high society and appearing in numerous films and novels. It was famously enjoyed by characters in works by F. Scott Fitzgerald and Evelyn Waugh. The simplicity of just two ingredients belies its sophisticated appeal.',
      it: 'Lo Stinger probabilmente ebbe origine negli anni 1890 e divenne particolarmente popolare durante il Proibizionismo (1920-1933) quando la menta aiutava a mascherare spiriti inferiori. La bevanda guadagnò un significativo prestigio culturale a metà del XX secolo, diventando il nightcap preferito dell\'alta società e apparendo in numerosi film e romanzi. Fu famosamente apprezzato da personaggi nelle opere di F. Scott Fitzgerald ed Evelyn Waugh. La semplicità di soli due ingredienti nasconde il suo fascino sofisticato.',
      vi: 'Stinger có thể có nguồn gốc từ những năm 1890 và trở nên đặc biệt phổ biến trong thời Cấm rượu (1920-1933) khi bạc hà giúp che giấu rượu kém chất lượng. Thức uống đạt được uy tín văn hóa đáng kể vào giữa thế kỷ 20, trở thành nightcap ưa thích của giới thượng lưu và xuất hiện trong nhiều bộ phim và tiểu thuyết. Nó được các nhân vật trong tác phẩm của F. Scott Fitzgerald và Evelyn Waugh yêu thích. Sự đơn giản của chỉ hai thành phần che giấu sức hấp dẫn tinh tế của nó.',
    },
    named_after: {
      en: 'Named for the "sting" of mint combined with the warmth of brandy.',
      it: 'Prende il nome dal "pungiglione" della menta combinato con il calore del brandy.',
      vi: 'Được đặt tên theo "vết chích" của bạc hà kết hợp với sự ấm áp của brandy.',
    },
  },

  taste: {
    profile: ['minty', 'warming', 'smooth'],
    description: {
      en: 'Cool, refreshing mint balanced by warming cognac. The white crème de menthe provides clean, crisp mint flavor without heaviness, while the cognac adds depth, warmth, and complexity. Smooth and sophisticated.',
      it: 'Menta fresca e rinfrescante bilanciata dal cognac caldo. La crème de menthe bianca fornisce un sapore di menta pulito e croccante senza pesantezza, mentre il cognac aggiunge profondità, calore e complessità. Morbido e sofisticato.',
      vi: 'Bạc hà mát mẻ, sảng khoái cân bằng bởi cognac ấm áp. Crème de menthe trắng cung cấp hương vị bạc hà sạch sẽ, giòn mà không nặng nề, trong khi cognac thêm chiều sâu, ấm áp và phức tạp. Mượt mà và tinh tế.',
    },
    first_impression: {
      en: 'Cool mint followed immediately by warming brandy',
      it: 'Menta fresca seguita immediatamente da brandy caldo',
      vi: 'Bạc hà mát mẻ tiếp theo ngay lập tức là brandy ấm áp',
    },
    finish: {
      en: 'Long, warming finish with lingering mint freshness',
      it: 'Finale lungo e caldo con freschezza di menta persistente',
      vi: 'Kết thúc dài, ấm áp với sự tươi mát bạc hà kéo dài',
    },
    balance: {
      en: 'Perfect balance between cooling mint and warming cognac',
      it: 'Perfetto equilibrio tra menta rinfrescante e cognac caldo',
      vi: 'Cân bằng hoàn hảo giữa bạc hà mát mẻ và cognac ấm áp',
    },
  },

  recommendations: {
    best_time: ['after_dinner', 'late_night', 'nightcap'],
    occasions: ['digestivo', 'nightcap', 'sophisticated_gathering', 'date_night'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Perfect as a digestif after dinner, especially after rich meals. Pairs well with dark chocolate, chocolate mint desserts, or as a palate cleanser between courses.',
      it: 'Perfetto come digestivo dopo cena, specialmente dopo pasti ricchi. Si abbina bene con cioccolato fondente, dessert al cioccolato e menta, o come pulitore del palato tra le portate.',
      vi: 'Hoàn hảo như một digestif sau bữa tối, đặc biệt sau các bữa ăn đậm đà. Kết hợp tốt với chocolate đen, món tráng miệng chocolate bạc hà hoặc làm chất làm sạch vị giác giữa các món.',
    },
    ideal_for: {
      en: 'Perfect for cognac lovers seeking a refreshing twist. Ideal for those who enjoy after-dinner drinks and appreciate the combination of mint and brandy.',
      it: 'Perfetto per gli amanti del cognac che cercano una svolta rinfrescante. Ideale per chi ama le bevande dopo cena e apprezza la combinazione di menta e brandy.',
      vi: 'Hoàn hảo cho người yêu cognac tìm kiếm một twist sảng khoái. Lý tưởng cho những ai thích đồ uống sau bữa tối và đánh giá cao sự kết hợp giữa bạc hà và brandy.',
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
      ingredient_id: 'ING_CREME_DE_MENTHE_WHITE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'White crème de menthe',
        it: 'Crème de menthe bianca',
        vi: 'Crème de menthe trắng',
      },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled martini cocktail glass.',
    it: 'Versare tutti gli ingredienti in un mixing glass con cubetti di ghiaccio. Mescolare bene. Filtrare in una coppa da martini raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn với đá viên. Khuấy đều. Lọc vào ly martini đã làm lạnh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'None (or mint leaf optional)',
    it: 'Nessuna (o foglia di menta opzionale)',
    vi: 'Không (hoặc lá bạc hà tùy chọn)',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC'],

  flavor_profile: ['minty', 'warming', 'smooth'],

  abv_estimate: 30, // ~30% ABV after dilution

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['digestivo', 'nightcap', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['vodka-stinger', 'brandy-alexander', 'grasshopper'],

  notes_for_staff: 'Use white crème de menthe (not green) for a clear appearance. Can be served on the rocks if preferred. Quality cognac is important - the simplicity means there\'s nowhere to hide. Some guests may request it shaken for extra chill.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/stinger/',
    note: 'IBA Official Recipe. Historical information from cocktail history sources and literary references.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
