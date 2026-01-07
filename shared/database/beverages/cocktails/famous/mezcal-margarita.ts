/**
 * Famous Cocktails: Mezcal Margarita
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mezcalMargarita: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
  slug: 'mezcal-margarita',
  stable_key: '928374657483920183746574839201837465748392',

  name: {
    en: 'Mezcal Margarita',
    it: 'Mezcal Margarita',
    vi: 'Mezcal Margarita',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'mezcal', 'agave', 'smoky'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A smoky, sophisticated twist on the classic Margarita, replacing tequila with mezcal. The earthy, smoky notes of mezcal add remarkable depth and complexity to the traditional lime-orange liqueur combination, creating a drink that's both familiar and entirely new.",
    it: "Una svolta affumicata e sofisticata sul classico Margarita, sostituendo la tequila con il mezcal. Le note terrose e affumicate del mezcal aggiungono notevole profondità e complessità alla tradizionale combinazione di lime e liquore all'arancia, creando una bevanda che è allo stesso tempo familiare e completamente nuova.",
    vi: 'Một biến tấu khói và tinh tế của Margarita cổ điển, thay thế tequila bằng mezcal. Hương khói, đất của mezcal thêm độ sâu và phức tạp đáng kể vào sự kết hợp chanh-rượu mùi cam truyền thống, tạo ra thức uống vừa quen thuộc vừa hoàn toàn mới.',
  },

  history: {
    created_year: '2000s',
    origin: {
      city: 'Oaxaca',
      country: 'Mexico',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Mezcal Margarita emerged in the 2000s as mezcal began gaining international recognition beyond Mexico. While tequila had long dominated the agave spirits market, bartenders and mezcal producers in Oaxaca began promoting mezcal's unique smoky character. The Mezcal Margarita became the gateway cocktail for introducing people to mezcal, as the familiar Margarita format helped ease drinkers into mezcal's complex, smoky profile. By the 2010s, it had become a modern classic on cocktail menus worldwide.",
      it: 'Il Mezcal Margarita emerse negli anni 2000 quando il mezcal iniziò a guadagnare riconoscimento internazionale oltre il Messico. Mentre la tequila aveva a lungo dominato il mercato degli spiriti di agave, i barman e i produttori di mezcal a Oaxaca iniziarono a promuovere il carattere affumicato unico del mezcal. Il Mezcal Margarita divenne il cocktail introduttivo per presentare le persone al mezcal, poiché il formato familiare del Margarita aiutava ad abituare i bevitori al profilo complesso e affumicato del mezcal. Entro gli anni 2010, era diventato un classico moderno nei menu dei cocktail in tutto il mondo.',
      vi: 'Mezcal Margarita xuất hiện vào những năm 2000 khi mezcal bắt đầu được công nhận quốc tế ngoài Mexico. Trong khi tequila từ lâu đã thống trị thị trường rượu mạnh agave, các bartender và nhà sản xuất mezcal ở Oaxaca bắt đầu quảng bá đặc tính khói độc đáo của mezcal. Mezcal Margarita trở thành cocktail cổng vào để giới thiệu người ta với mezcal, vì định dạng Margarita quen thuộc giúp người uống dễ dàng làm quen với hương vị khói phức tạp của mezcal. Đến những năm 2010, nó đã trở thành một tác phẩm cổ điển hiện đại trên menu cocktail trên toàn thế giới.',
    },
    named_after: {
      en: 'Named after mezcal, the smoky agave spirit that replaces tequila in the classic Margarita formula.',
      it: 'Prende il nome dal mezcal, lo spirito di agave affumicato che sostituisce la tequila nella formula classica del Margarita.',
      vi: 'Được đặt tên theo mezcal, rượu mạnh agave khói thay thế tequila trong công thức Margarita cổ điển.',
    },
  },

  taste: {
    profile: ['smoky', 'citrus', 'agave', 'complex'],
    description: {
      en: "Complex and layered. Mezcal provides earthy, smoky notes with hints of roasted agave and minerals. Fresh lime adds brightness, while orange liqueur contributes sweetness and depth. The smoke doesn't overpower but adds sophistication. More complex and contemplative than a standard Margarita.",
      it: "Complesso e stratificato. Il mezcal fornisce note terrose e affumicate con accenni di agave tostata e minerali. Il lime fresco aggiunge brillantezza, mentre il liquore all'arancia contribuisce con dolcezza e profondità. Il fumo non sopraffà ma aggiunge sofisticazione. Più complesso e contemplativo di un Margarita standard.",
      vi: 'Phức tạp và nhiều tầng. Mezcal mang đến hương khói, đất với dấu vết agave rang và khoáng chất. Chanh tươi thêm độ tươi sáng, trong khi rượu mùi cam đóng góp vị ngọt và độ sâu. Khói không át vị nhưng thêm sự tinh tế. Phức tạp và đáng suy ngẫm hơn Margarita tiêu chuẩn.',
    },
    first_impression: {
      en: 'Smoke and lime hit first, followed by sweet agave and citrus',
      it: 'Fumo e lime colpiscono per primi, seguiti da agave dolce e agrumi',
      vi: 'Khói và chanh đập vào đầu tiên, tiếp theo là agave ngọt và cam quýt',
    },
    finish: {
      en: 'Long, smoky finish with lingering agave and mineral notes',
      it: 'Finale lungo e affumicato con note persistenti di agave e minerali',
      vi: 'Kết thúc dài, khói với hương agave và khoáng chất kéo dài',
    },
    balance: {
      en: 'Well-balanced - smoke adds depth without overwhelming citrus brightness',
      it: 'Ben bilanciato - il fumo aggiunge profondità senza sopraffare la brillantezza degli agrumi',
      vi: 'Cân bằng tốt - khói thêm độ sâu mà không át độ tươi sáng cam quýt',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon', 'happy_hour'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'mexican_cuisine'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with Mexican cuisine, especially grilled meats, mole, or tacos al pastor. Also pairs well with smoked dishes, ceviche, guacamole, and spicy foods.',
      it: 'Eccellente con la cucina messicana, specialmente carni alla griglia, mole o tacos al pastor. Si abbina bene anche con piatti affumicati, ceviche, guacamole e cibi piccanti.',
      vi: 'Tuyệt vời với món Mexico, đặc biệt là thịt nướng, mole, hoặc tacos al pastor. Cũng kết hợp tốt với các món hun khói, ceviche, guacamole và đồ ăn cay.',
    },
    ideal_for: {
      en: 'Perfect for mezcal enthusiasts and adventurous drinkers. Ideal for those who love Margaritas but want more complexity. Great for anyone exploring smoky spirits or Mexican craft cocktails.',
      it: 'Perfetto per gli appassionati di mezcal e i bevitori avventurosi. Ideale per chi ama i Margarita ma vuole più complessità. Ottimo per chiunque esplori spiriti affumicati o cocktail artigianali messicani.',
      vi: 'Hoàn hảo cho những người đam mê mezcal và người uống phiêu lưu. Lý tưởng cho những ai yêu Margarita nhưng muốn nhiều độ phức tạp hơn. Tuyệt vời cho bất kỳ ai khám phá rượu mạnh khói hoặc cocktail thủ công Mexico.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_MEZCAL',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' },
    },
    {
      ingredient_id: 'ING_COINTREAU',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Cointreau (or orange liqueur)',
        it: "Cointreau (o liquore all'arancia)",
        vi: 'Cointreau (hoặc rượu mùi cam)',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_AGAVE_SYRUP',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Agave syrup', it: 'Sciroppo di agave', vi: 'Siro agave' },
      optional: true,
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a rocks glass over fresh ice or serve up in a coupe. Optional: rim glass with sal de gusano (worm salt) or smoked salt. Garnish with a lime wheel.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere rocks con ghiaccio fresco o servire liscio in una coppa. Opzionale: bordare il bicchiere con sal de gusano (sale di verme) o sale affumicato. Guarnire con una fetta di lime.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly rocks với đá mới hoặc phục vụ thẳng trong ly coupe. Tùy chọn: viền ly bằng sal de gusano (muối sâu) hoặc muối hun khói. Trang trí với lát chanh.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lime wheel, optional sal de gusano or smoked salt rim',
    it: 'Fetta di lime, bordo opzionale di sal de gusano o sale affumicato',
    vi: 'Lát chanh, viền sal de gusano hoặc muối hun khói tùy chọn',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_MEZCAL'],

  flavor_profile: ['smoky', 'citrus', 'agave', 'complex'],

  abv_estimate: 22,

  calories_estimate: 180,

  difficulty: 'easy',

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
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'mexican_cuisine'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['mezcal-paloma', 'naked-and-famous', 'oaxaca-old-fashioned'],

  notes_for_staff:
    'Use quality artisanal mezcal - not mass-produced. Fresh lime juice essential. Sal de gusano (worm salt with chili and agave larvae) is traditional Oaxacan rim salt. Can do half mezcal, half tequila for lighter smoke.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/5078/mezcal-margarita',
    notes:
      'Modern variation popularized in 2000s-2010s as mezcal gained international recognition.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
