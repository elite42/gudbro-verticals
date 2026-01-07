/**
 * Famous Cocktails: Port Light
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const portLight: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
  slug: 'port-light',
  stable_key: 'port_light_famous_tiki_tropical_cocktail',

  name: {
    en: 'Port Light',
    it: 'Port Light',
    vi: 'Port Light',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'bourbon', 'unique'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Port Light is an innovative tiki cocktail created by Don the Beachcomber that uniquely combines rum with bourbon whiskey, passion fruit, honey, and citrus. This unusual spirit combination creates surprising depth and complexity rarely found in tropical drinks.',
    it: 'Il Port Light è un innovativo cocktail tiki creato da Don the Beachcomber che combina in modo unico rum con bourbon whiskey, frutto della passione, miele e agrumi. Questa insolita combinazione di distillati crea profondità e complessità sorprendenti raramente trovate nelle bevande tropicali.',
    vi: 'Port Light là một loại cocktail tiki sáng tạo được tạo ra bởi Don the Beachcomber kết hợp độc đáo rum với bourbon whiskey, chanh dây, mật ong và cam quýt. Sự kết hợp rượu mạnh bất thường này tạo ra chiều sâu và độ phức tạp đáng ngạc nhiên hiếm khi tìm thấy trong đồ uống nhiệt đới.',
  },

  history: {
    created_year: '1941',
    origin: {
      city: 'Hollywood',
      bar: 'Don the Beachcomber',
      country: 'USA',
    },
    creator: {
      name: 'Ernest Raymond Beaumont Gantt (Donn Beach)',
      profession: 'bartender',
    },
    story: {
      en: 'The Port Light was created around 1941 by Don the Beachcomber during the early days of World War II. The name "Port Light" refers to the red navigation light on the port (left) side of ships - a fitting naval reference for the wartime era. What makes this drink revolutionary is Don\'s bold decision to combine bourbon whiskey with rum - at a time when mixing different base spirits in cocktails was considered unconventional. The bourbon adds oak, vanilla, and caramel notes that complement the tropical ingredients in unexpected ways. The cocktail also features passion fruit and honey, creating a complex interplay between American whiskey tradition and tropical tiki culture. The recipe remained encoded in Don\'s secret notation system until decoded by Jeff "Beachbum" Berry decades later.',
      it: 'Il Port Light fu creato intorno al 1941 da Don the Beachcomber durante i primi giorni della seconda guerra mondiale. Il nome "Port Light" si riferisce alla luce di navigazione rossa sul lato di babordo (sinistro) delle navi - un appropriato riferimento navale per l\'era bellica. Ciò che rende questa bevanda rivoluzionaria è la decisione audace di Don di combinare bourbon whiskey con rum - in un momento in cui mescolare diversi distillati base nei cocktail era considerato non convenzionale. Il bourbon aggiunge note di quercia, vaniglia e caramello che completano gli ingredienti tropicali in modi inaspettati. Il cocktail presenta anche frutto della passione e miele, creando un\'interazione complessa tra la tradizione americana del whiskey e la cultura tiki tropicale. La ricetta rimase codificata nel sistema di notazione segreto di Don fino a quando fu decifrata da Jeff "Beachbum" Berry decenni dopo.',
      vi: 'Port Light được tạo ra vào khoảng năm 1941 bởi Don the Beachcomber trong những ngày đầu của Thế chiến II. Cái tên "Port Light" đề cập đến đèn điều hướng đỏ ở mạn trái (cảng) của tàu - một tham chiếu hải quân phù hợp cho thời kỳ chiến tranh. Điều làm cho thức uống này mang tính cách mạng là quyết định táo bạo của Don kết hợp bourbon whiskey với rum - vào thời điểm trộn các loại rượu mạnh cơ sở khác nhau trong cocktail được coi là không theo quy ước. Bourbon thêm hương gỗ sồi, vani và caramel bổ sung cho các thành phần nhiệt đới theo những cách bất ngờ. Cocktail cũng có chanh dây và mật ong, tạo ra sự tương tác phức tạp giữa truyền thống whiskey Mỹ và văn hóa tiki nhiệt đới. Công thức vẫn được mã hóa trong hệ thống ký hiệu bí mật của Don cho đến khi được giải mã bởi Jeff "Beachbum" Berry nhiều thập kỷ sau.',
    },
    named_after: {
      en: 'Named after the red port light on the left side of ships, a maritime navigation reference fitting the wartime era.',
      it: "Prende il nome dalla luce rossa di babordo sul lato sinistro delle navi, un riferimento alla navigazione marittima appropriato all'era bellica.",
      vi: 'Được đặt theo tên đèn cảng đỏ ở phía bên trái của tàu, một tham chiếu điều hướng hàng hải phù hợp với thời kỳ chiến tranh.',
    },
  },

  taste: {
    profile: ['complex', 'honeyed', 'tropical'],
    description: {
      en: "Remarkably complex with bourbon's oak and vanilla notes playing against tropical passion fruit and honey. The Port Light creates an unexpected harmony between whiskey warmth and rum's tropical character, unified by honeyed sweetness and bright citrus. A sophisticated crossover between tiki and classic American cocktails.",
      it: "Notevolmente complesso con le note di quercia e vaniglia del bourbon che giocano contro il frutto della passione tropicale e il miele. Il Port Light crea un'armonia inaspettata tra il calore del whiskey e il carattere tropicale del rum, unificati dalla dolcezza del miele e dagli agrumi brillanti. Un sofisticato incrocio tra tiki e cocktail americani classici.",
      vi: 'Phức tạp đáng chú ý với hương gỗ sồi và vani của bourbon chơi chống lại chanh dây nhiệt đới và mật ong. Port Light tạo ra sự hòa hợp bất ngờ giữa sự ấm áp của whiskey và đặc tính nhiệt đới của rum, được thống nhất bởi vị ngọt mật ong và cam quýt sáng. Một sự kết hợp tinh tế giữa cocktail tiki và cocktail Mỹ cổ điển.',
    },
    first_impression: {
      en: 'Bourbon oak and vanilla hit first, quickly joined by tropical passion fruit sweetness',
      it: 'La quercia e la vaniglia del bourbon colpiscono per prime, rapidamente unite dalla dolcezza del frutto della passione tropicale',
      vi: 'Gỗ sồi và vani bourbon xuất hiện đầu tiên, nhanh chóng kết hợp với vị ngọt chanh dây nhiệt đới',
    },
    finish: {
      en: 'Long, warming finish with bourbon spice, honey sweetness, and lingering tropical notes',
      it: 'Finale lungo e caldo con spezie di bourbon, dolcezza del miele e note tropicali persistenti',
      vi: 'Kết thúc dài, ấm áp với gia vị bourbon, vị ngọt mật ong và hương vị nhiệt đới kéo dài',
    },
    balance: {
      en: 'Brilliantly balanced between American whiskey tradition and tropical tiki innovation',
      it: "Brillantemente bilanciato tra la tradizione americana del whiskey e l'innovazione tiki tropicale",
      vi: 'Cân bằng xuất sắc giữa truyền thống whiskey Mỹ và đổi mới tiki nhiệt đới',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['tiki_bar', 'whiskey_lovers', 'unique_experience'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect with smoked meats, bourbon-glazed ribs, tropical BBQ, or grilled pineapple. Also pairs well with rich desserts and caramelized dishes that complement both bourbon and tropical flavors.',
      it: 'Perfetto con carni affumicate, costine glassate al bourbon, barbecue tropicale o ananas alla griglia. Si abbina bene anche con dessert ricchi e piatti caramellati che completano sia il bourbon che i sapori tropicali.',
      vi: 'Hoàn hảo với thịt hun khói, sườn tráng men bourbon, BBQ nhiệt đới hoặc ananás nướng. Cũng kết hợp tốt với món tráng miệng giàu có và món caramel bổ sung cho cả hương vị bourbon và nhiệt đới.',
    },
    ideal_for: {
      en: 'Perfect for whiskey lovers curious about tiki culture and adventurous drinkers seeking unique flavor combinations. Ideal for those who find traditional tiki drinks too sweet or one-dimensional. A bridge between bourbon and tiki worlds.',
      it: 'Perfetto per gli amanti del whiskey curiosi della cultura tiki e bevitori avventurosi che cercano combinazioni di sapori uniche. Ideale per coloro che trovano le tradizionali bevande tiki troppo dolci o unidimensionali. Un ponte tra i mondi del bourbon e del tiki.',
      vi: 'Hoàn hảo cho những người yêu whiskey tò mò về văn hóa tiki và những người uống mạo hiểm tìm kiếm sự kết hợp hương vị độc đáo. Lý tưởng cho những ai thấy đồ uống tiki truyền thống quá ngọt hoặc một chiều. Một cây cầu giữa thế giới bourbon và tiki.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Dark rum (Jamaican)',
        it: 'Rum scuro (giamaicano)',
        vi: 'Rum đen (Jamaica)',
      },
    },
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Bourbon whiskey', it: 'Bourbon whiskey', vi: 'Bourbon whiskey' },
    },
    {
      ingredient_id: 'ING_PASSION_FRUIT_SYRUP',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Passion fruit syrup',
        it: 'Sciroppo di frutto della passione',
        vi: 'Xi-rô chanh dây',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước chanh xanh tươi',
      },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Honey syrup', it: 'Sciroppo di miele', vi: 'Xi-rô mật ong' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a double old-fashioned glass filled with crushed ice. Garnish with lime wheel and edible flower.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere double old-fashioned pieno di ghiaccio tritato. Guarnire con rotella di lime e fiore commestibile.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly double old-fashioned đầy đá nghiền. Trang trí với vòng chanh xanh và hoa ăn được.',
  },

  glass: 'Double old-fashioned',

  garnish: {
    en: 'Lime wheel, edible flower, mint sprig',
    it: 'Rotella di lime, fiore commestibile, rametto di menta',
    vi: 'Vòng chanh xanh, hoa ăn được, nhành bạc hà',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK', 'ING_BOURBON'],

  flavor_profile: ['complex', 'honeyed', 'tropical'],

  abv_estimate: 18,

  calories_estimate: 250,

  difficulty: 'intermediate',

  prep_time_seconds: 90,

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
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['tiki_bar', 'whiskey_lovers', 'unique_experience'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['don-the-beachcomber-port-light'],

  notes_for_staff:
    'Created by Don the Beachcomber circa 1941. Unique rum-bourbon combination - explain this unusual pairing to guests. Use high-quality bourbon for best results. Can substitute passion fruit purée for syrup. Honey syrup is 1:1 honey to water. Great bridge drink for whiskey lovers exploring tiki.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 64,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://beachbumberry.com/port-light.html',
    notes:
      'Original Don the Beachcomber recipe circa 1941, decoded by Jeff "Beachbum" Berry in Sippin\' Safari.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
