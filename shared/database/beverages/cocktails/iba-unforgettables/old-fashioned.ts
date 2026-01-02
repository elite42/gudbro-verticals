/**
 * Old Fashioned Cocktail
 *
 * The quintessential whiskey cocktail, dating back to the early 1800s.
 * The name "old fashioned" emerged in the 1880s to distinguish the
 * original, simple cocktail from more elaborate modern variations.
 * Louisville's official cocktail since 2015.
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const oldFashioned: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '4449d8ad-49c7-4096-add5-4bc24446faa1',
  slug: 'old-fashioned',
  stable_key: 'old_fashioned',

  name: {
    en: 'Old Fashioned',
    it: 'Old Fashioned',
    vi: 'Old Fashioned',
    ko: '올드 패션드',
    ja: 'オールドファッションド',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'american', 'whiskey', 'stirred'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Old Fashioned is the original cocktail, the definition of what a cocktail should be. Simple yet sophisticated, it combines whiskey, sugar, bitters, and water. A timeless American classic that showcases the quality of the spirit.',
    it: 'L\'Old Fashioned è il cocktail originale, la definizione di ciò che dovrebbe essere un cocktail. Semplice ma sofisticato, combina whiskey, zucchero, bitters e acqua. Un classico americano senza tempo che mette in mostra la qualità dello spirito.',
    vi: 'Old Fashioned là cocktail gốc, định nghĩa về những gì một cocktail nên là. Đơn giản nhưng tinh tế, kết hợp whiskey, đường, bitters và nước. Một tác phẩm kinh điển Mỹ vượt thời gian thể hiện chất lượng rượu mạnh.',
  },

  history: {
    created_year: '1800s',
    origin: {
      city: 'Louisville',
      bar: 'Pendennis Club',
      country: 'United States',
    },
    creator: {
      name: 'Unknown / Various bartenders',
      profession: 'bartender',
    },
    story: {
      en: 'The Old Fashioned represents the original definition of a cocktail: spirits, sugar, water, and bitters. The name emerged in the 1880s when drinkers began requesting their drinks made "the old-fashioned way" - a simple, traditional preparation rather than the elaborate cocktails that had become popular. While the Pendennis Club in Louisville claims its invention by bartender Martin Cuneo for Colonel James E. Pepper in the 1880s, this is disputed by historians. The Chicago Daily Tribune mentioned "old fashioned cocktails" in 1880, before the Pendennis Club opened. The recipe itself dates to the early 1800s. Named Louisville\'s official cocktail in 2015.',
      it: 'L\'Old Fashioned rappresenta la definizione originale di cocktail: distillati, zucchero, acqua e bitters. Il nome emerse negli anni 1880 quando i bevitori iniziarono a richiedere le loro bevande preparate "alla vecchia maniera" - una preparazione semplice e tradizionale piuttosto che i cocktail elaborati che erano diventati popolari. Mentre il Pendennis Club di Louisville rivendica la sua invenzione da parte del barman Martin Cuneo per il colonnello James E. Pepper negli anni 1880, questo è contestato dagli storici. Il Chicago Daily Tribune menzionò "cocktail alla vecchia maniera" nel 1880, prima dell\'apertura del Pendennis Club. La ricetta stessa risale ai primi anni del 1800. Nominato cocktail ufficiale di Louisville nel 2015.',
      vi: 'Old Fashioned đại diện cho định nghĩa gốc của cocktail: rượu mạnh, đường, nước và bitters. Cái tên xuất hiện vào những năm 1880 khi người uống bắt đầu yêu cầu đồ uống được làm "theo cách cũ" - một cách chuẩn bị đơn giản, truyền thống hơn là cocktail phức tạp đã trở nên phổ biến. Trong khi Pendennis Club ở Louisville tuyên bố phát minh bởi bartender Martin Cuneo cho Đại tá James E. Pepper vào những năm 1880, điều này bị các sử gia tranh cãi. Chicago Daily Tribune đã đề cập "cocktail kiểu cũ" năm 1880, trước khi Pendennis Club mở cửa. Công thức bản thân có từ đầu những năm 1800. Được đặt tên là cocktail chính thức của Louisville năm 2015.',
    },
    named_after: {
      en: 'Named for the "old fashioned way" of making cocktails - the simple, original method that predated more elaborate cocktail preparations of the late 1800s.',
      it: 'Prende il nome dalla "vecchia maniera" di preparare i cocktail - il metodo semplice e originale che precedette le preparazioni di cocktail più elaborate della fine del 1800.',
      vi: 'Được đặt tên theo "cách cũ" pha chế cocktail - phương pháp đơn giản, gốc có trước các cách pha chế cocktail phức tạp hơn của cuối những năm 1800.',
    },
  },

  taste: {
    profile: ['spirit-forward', 'sweet', 'aromatic', 'smooth'],
    description: {
      en: 'The Old Fashioned is spirit-forward, allowing the whiskey\'s character to shine. Sugar provides gentle sweetness, while Angostura bitters add complexity with notes of cinnamon, clove, and orange. The muddling and dilution create a smooth, well-integrated drink that highlights the bourbon or rye.',
      it: 'L\'Old Fashioned è incentrato sullo spirito, permettendo al carattere del whiskey di brillare. Lo zucchero fornisce dolcezza delicata, mentre gli Angostura bitters aggiungono complessità con note di cannella, chiodi di garofano e arancia. Il muddling e la diluizione creano un drink morbido e ben integrato che mette in evidenza il bourbon o il rye.',
      vi: 'Old Fashioned hướng về rượu mạnh, cho phép đặc tính whiskey tỏa sáng. Đường cung cấp vị ngọt nhẹ nhàng, trong khi Angostura bitters thêm độ phức tạp với hương quế, đinh hương và cam. Việc nghiền và pha loãng tạo ra đồ uống mượt mà, hòa quyện tốt làm nổi bật bourbon hoặc rye.',
    },
    first_impression: {
      en: 'Rich bourbon or rye character immediately apparent, with subtle sweetness and aromatic bitters complexity. The orange and cherry garnish provide fruity aromatics.',
      it: 'Carattere ricco di bourbon o rye immediatamente evidente, con sottile dolcezza e complessità aromatica dei bitters. La guarnizione di arancia e ciliegia fornisce aromi fruttati.',
      vi: 'Đặc tính bourbon hoặc rye phong phú ngay lập tức rõ ràng, với vị ngọt tinh tế và độ phức tạp thơm của bitters. Trang trí cam và cherry cung cấp hương thơm trái cây.',
    },
    finish: {
      en: 'Long, warming finish with oak, vanilla, and caramel notes from the whiskey, followed by lingering bitters spice. The sweetness fades, leaving pleasant whiskey character.',
      it: 'Finale lungo e avvolgente con note di rovere, vaniglia e caramello dal whiskey, seguito da spezie persistenti dei bitters. La dolcezza svanisce, lasciando il piacevole carattere del whiskey.',
      vi: 'Hậu vị dài, ấm áp với hương sồi, vani và caramel từ whiskey, theo sau là gia vị bitters dai dẳng. Vị ngọt nhạt đi, để lại đặc tính whiskey dễ chịu.',
    },
    balance: {
      en: 'Perfectly balanced to showcase the whiskey while sugar and bitters provide just enough sweetness and complexity without overwhelming the base spirit.',
      it: 'Perfettamente bilanciato per mostrare il whiskey mentre zucchero e bitters forniscono dolcezza e complessità sufficienti senza sopraffare lo spirito base.',
      vi: 'Cân bằng hoàn hảo để thể hiện whiskey trong khi đường và bitters cung cấp đủ vị ngọt và độ phức tạp mà không áp đảo rượu mạnh cơ bản.',
    },
  },

  recommendations: {
    best_time: ['evening', 'after_dinner', 'winter_evening'],
    occasions: ['sophisticated_gathering', 'business_dinner', 'quiet_contemplation'],
    seasons: ['fall', 'winter', 'all_year'],
    food_pairings: {
      en: 'Excellent with rich, savory foods: grilled steaks, smoked brisket, aged cheeses, dark chocolate, and cigars. The whiskey stands up to bold flavors.',
      it: 'Eccellente con cibi ricchi e saporiti: bistecche alla griglia, petto affumicato, formaggi stagionati, cioccolato fondente e sigari. Il whiskey regge i sapori audaci.',
      vi: 'Tuyệt vời với thực phẩm đậm đà, mặn: bít tết nướng, thịt hun khói, phô mai lâu năm, sô-cô-la đen và xì gà. Whiskey chịu được hương vị đậm.',
    },
    ideal_for: {
      en: 'Perfect for whiskey enthusiasts, those who appreciate spirit-forward cocktails, sophisticated evenings, and anyone seeking a timeless classic. Louisville\'s official cocktail.',
      it: 'Perfetto per gli appassionati di whiskey, coloro che apprezzano i cocktail incentrati sullo spirito, serate sofisticate e chiunque cerchi un classico senza tempo. Cocktail ufficiale di Louisville.',
      vi: 'Hoàn hảo cho người đam mê whiskey, những ai đánh giá cao cocktail hướng rượu mạnh, buổi tối tinh tế và bất kỳ ai tìm kiếm tác phẩm kinh điển vượt thời gian. Cocktail chính thức của Louisville.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Bourbon or Rye Whiskey', it: 'Bourbon o Rye Whiskey', vi: 'Bourbon hoặc Rye Whiskey' },
    },
    {
      ingredient_id: 'ING_SUPERFINE_SUGAR',
      quantity: { amount: 1, unit: 'cube' },
      display_name: { en: 'Sugar Cube', it: 'Zolletta di Zucchero', vi: 'Viên Đường' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 3, unit: 'dash' },
      display_name: { en: 'Angostura Bitters', it: 'Angostura Bitters', vi: 'Angostura Bitters' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Place sugar cube in an old fashioned glass and saturate with Angostura bitters. Add a few dashes of plain water. Muddle until the sugar is dissolved. Fill the glass with large ice cubes and add the whiskey. Stir gently for about 20 seconds. Garnish with an orange slice or zest and a cocktail cherry.',
    it: 'Posizionare la zolletta di zucchero in un bicchiere old fashioned e saturare con Angostura bitters. Aggiungere qualche goccia di acqua naturale. Pestare fino a quando lo zucchero si dissolve. Riempire il bicchiere con cubetti di ghiaccio grandi e aggiungere il whiskey. Mescolare delicatamente per circa 20 secondi. Guarnire con una fetta d\'arancia o scorza e una ciliegia da cocktail.',
    vi: 'Đặt viên đường vào ly old fashioned và bão hòa với Angostura bitters. Thêm vài giọt nước lọc. Nghiền cho đến khi đường tan. Đổ đầy ly bằng viên đá lớn và thêm whiskey. Khuấy nhẹ nhàng khoảng 20 giây. Trang trí bằng lát cam hoặc vỏ cam và cherry cocktail.',
  },

  glass: 'Old fashioned glass',

  garnish: {
    en: 'Orange slice or zest, and a cocktail cherry',
    it: 'Fetta d\'arancia o scorza, e una ciliegia da cocktail',
    vi: 'Lát cam hoặc vỏ cam, và cherry cocktail',
  },

  ice: 'cubed',
  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],
  flavor_profile: ['spirit-forward', 'sweet', 'aromatic', 'smooth'],
  abv_estimate: 32,
  calories_estimate: 155,
  difficulty: 'easy',
  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['fall', 'winter', 'all_year'],
  occasion_tags: ['sophisticated_gathering', 'business_dinner'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff: 'Use quality bourbon or rye - the spirit is the star. Large ice cubes are essential to minimize dilution. Muddle gently - you want to dissolve the sugar, not pulverize it. The classic garnish is orange and cherry, but some prefer just an expressed orange peel. Wisconsin-style Old Fashioned uses brandy and adds soda - specify which style customer wants. During Louisville\'s "Old Fashioned Fortnight" (first two weeks of June), feature this cocktail prominently.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/old-fashioned/',
    note: 'IBA Official Recipe. Historical information from Chicago Daily Tribune (1880) and cocktail historians David Wondrich and Robert Simonson. Named official cocktail of Louisville, Kentucky on June 4, 2015.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
