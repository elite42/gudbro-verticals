/**
 * IBA Unforgettables: Whiskey Sour
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const whiskeySour: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e8fe6388-61dc-4290-a540-e48b6c271166',
  slug: 'whiskey-sour',
  stable_key: 'whiskey_sour_iba_unforgettables',

  name: {
    en: 'Whiskey Sour',
    it: 'Whiskey Sour',
    vi: 'Whiskey Sour',
    ko: '위스키 사워',
    ja: 'ウイスキーサワー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'sour'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A timeless classic balancing bourbon whiskey with fresh lemon juice and sugar syrup, optionally topped with a silky egg white foam. One of the most beloved sour cocktails in the world.',
    it: 'Un classico senza tempo che bilancia il bourbon whiskey con succo di limone fresco e sciroppo di zucchero, opzionalmente coronato da una soffice schiuma di albume. Uno dei cocktail sour più amati al mondo.',
    vi: 'Một cocktail cổ điển vượt thời gian cân bằng bourbon whiskey với nước cốt chanh tươi và xi-rô đường, tùy chọn phủ lớp bọt lòng trắng trứng mềm mại. Một trong những cocktail sour được yêu thích nhất thế giới.',
  },

  history: {
    created_year: '1862',
    origin: {
      city: 'New York',
      bar: 'Unknown',
      country: 'United States',
    },
    creator: {
      name: 'Sailors / Jerry Thomas',
      profession: 'bartender',
    },
    story: {
      en: 'The Whiskey Sour has roots dating back to sailors in the 1800s who added citrus to their whiskey to prevent scurvy during long voyages. The first written mention appeared in 1862 in Jerry Thomas\'s "Bartenders Guide." The Wisconsin newspaper Waukesha Plain Dealer first referenced the "Whisky Sour" in 1870. In 1872, former ship steward Elliot Staub is credited with "inventing" the drink in a bar in Iquique, then part of Peru. The addition of egg white became popular in the 1920s, creating the signature silky foam. Today, the Whiskey Sour is celebrated annually on August 25th and remains one of the most enduring classic cocktails.',
      it: 'Il Whiskey Sour ha radici che risalgono ai marinai del 1800 che aggiungevano agrumi al loro whiskey per prevenire lo scorbuto durante i lunghi viaggi. La prima menzione scritta apparve nel 1862 nella "Bartenders Guide" di Jerry Thomas. Il giornale del Wisconsin Waukesha Plain Dealer menzionò per la prima volta il "Whisky Sour" nel 1870. Nel 1872, l\'ex steward Elliot Staub è accreditato di aver "inventato" il drink in un bar a Iquique, allora parte del Perù. L\'aggiunta dell\'albume divenne popolare negli anni \'20, creando la caratteristica schiuma setosa. Oggi, il Whiskey Sour viene celebrato annualmente il 25 agosto e rimane uno dei cocktail classici più duraturi.',
      vi: 'Whiskey Sour có nguồn gốc từ thủy thủ vào những năm 1800, họ thêm chanh vào whiskey để ngăn ngừa bệnh scorbut trong các chuyến hành trình dài. Lần đầu tiên được ghi chép vào năm 1862 trong "Bartenders Guide" của Jerry Thomas. Tờ báo Wisconsin Waukesha Plain Dealer lần đầu đề cập đến "Whisky Sour" vào năm 1870. Năm 1872, cựu tiếp viên tàu Elliot Staub được ghi nhận "phát minh" ra đồ uống này tại một quán bar ở Iquique, khi đó là một phần của Peru. Việc thêm lòng trắng trứng trở nên phổ biến vào những năm 1920, tạo ra lớp bọt mềm mại đặc trưng. Ngày nay, Whiskey Sour được kỷ niệm hàng năm vào ngày 25 tháng 8 và vẫn là một trong những cocktail cổ điển bền vững nhất.',
    },
    named_after: {
      en: 'Named after the "sour" category of cocktails, which combine spirits with citrus juice and sugar.',
      it: 'Prende il nome dalla categoria "sour" di cocktail, che combinano distillati con succo di agrumi e zucchero.',
      vi: 'Được đặt tên theo danh mục cocktail "sour", kết hợp rượu mạnh với nước ép chanh và đường.',
    },
  },

  taste: {
    profile: ['sour', 'sweet', 'smooth'],
    description: {
      en: 'A perfect harmony of sweet and sour, with the robust character of bourbon whiskey shining through bright lemon citrus and balanced sweetness. The optional egg white adds a luxurious, velvety texture and mellows the acidity. Each sip delivers warmth from the bourbon followed by refreshing citrus tang.',
      it: 'Una perfetta armonia di dolce e aspro, con il carattere robusto del bourbon whiskey che risplende attraverso il brillante agrume di limone e la dolcezza bilanciata. L\'albume opzionale aggiunge una texture vellutata e lussuosa e attenua l\'acidità. Ogni sorso offre calore dal bourbon seguito da un rinfrescante sapore agrumato.',
      vi: 'Sự hòa quyện hoàn hảo giữa ngọt và chua, với đặc tính mạnh mẽ của bourbon whiskey tỏa sáng qua vị chanh tươi mát và vị ngọt cân bằng. Lòng trắng trứng tùy chọn thêm kết cấu mượt mà, sang trọng và làm dịu độ chua. Mỗi ngụm mang lại hơi ấm từ bourbon theo sau là vị chanh sảng khoái.',
    },
    first_impression: {
      en: 'The first sip greets you with a bright citrus punch tempered by sweetness, followed immediately by the warm, oaky notes of bourbon.',
      it: 'Il primo sorso ti accoglie con un vivace pugno di agrumi temperato dalla dolcezza, seguito immediatamente dalle note calde e di rovere del bourbon.',
      vi: 'Ngụm đầu tiên chào đón bạn với vị chanh tươi mát được làm dịu bởi vị ngọt, ngay sau đó là hương vị ấm áp, gỗ sồi của bourbon.',
    },
    finish: {
      en: 'A clean, slightly dry finish with lingering bourbon warmth and a subtle citrus echo. The egg white version leaves a soft, creamy aftertaste.',
      it: 'Un finale pulito e leggermente secco con un persistente calore di bourbon e un sottile eco di agrumi. La versione con albume lascia un retrogusto morbido e cremoso.',
      vi: 'Hậu vị trong sạch, hơi khô với hơi ấm bourbon kéo dài và dư vị chanh tinh tế. Phiên bản có lòng trắng trứng để lại dư vị mềm mại, kem.',
    },
    balance: {
      en: 'Impeccably balanced between sweet and sour, with the bourbon providing a solid foundation. The ratio of 45:25:20 creates a drink that is neither too tart nor too sweet.',
      it: 'Perfettamente bilanciato tra dolce e aspro, con il bourbon che fornisce una solida base. Il rapporto 45:25:20 crea un drink che non è né troppo aspro né troppo dolce.',
      vi: 'Cân bằng hoàn hảo giữa ngọt và chua, với bourbon tạo nền tảng vững chắc. Tỷ lệ 45:25:20 tạo ra đồ uống không quá chua cũng không quá ngọt.',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon'],
    occasions: ['aperitivo', 'casual_gathering', 'date_night'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs excellently with smoked meats, barbecue ribs, aged cheeses, roasted nuts, dark chocolate desserts, and charcuterie boards. The citrus cuts through rich, fatty foods beautifully.',
      it: 'Si abbina eccellentemente con carni affumicate, costine alla griglia, formaggi stagionati, noci tostate, dessert al cioccolato fondente e taglieri di salumi. Gli agrumi tagliano magnificamente i cibi ricchi e grassi.',
      vi: 'Kết hợp tuyệt vời với thịt hun khói, sườn nướng, phô mai lâu năm, hạt rang, món tráng miệng sô-cô-la đen, và đĩa thịt nguội. Vị chanh cắt đi vị béo ngậy của thức ăn một cách tuyệt đẹp.',
    },
    ideal_for: {
      en: 'Perfect for bourbon lovers seeking a refreshing citrus twist, and an ideal introduction to whiskey cocktails for those who find straight whiskey too strong. Great as a pre-dinner drink or evening sipper.',
      it: 'Perfetto per gli amanti del bourbon che cercano una rinfrescante nota agrumata, e un\'introduzione ideale ai cocktail al whiskey per coloro che trovano il whiskey liscio troppo forte. Ottimo come aperitivo o drink serale.',
      vi: 'Hoàn hảo cho những người yêu bourbon muốn có hương vị chanh sảng khoái, và là sự giới thiệu lý tưởng về cocktail whiskey cho những ai thấy whiskey nguyên chất quá mạnh. Tuyệt vời như đồ uống trước bữa tối hoặc đồ uống buổi tối.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Bourbon Whiskey', it: 'Bourbon Whiskey', vi: 'Bourbon Whiskey' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Fresh Lemon Juice', it: 'Succo di Limone Fresco', vi: 'Nước Cốt Chanh Tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Sugar Syrup', it: 'Sciroppo di Zucchero', vi: 'Xi-rô Đường' },
    },
    {
      ingredient_id: 'ING_EGG_WHITE',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Egg White (Optional)', it: 'Albume (Opzionale)', vi: 'Lòng Trắng Trứng (Tùy chọn)' },
      optional: true,
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well (shake harder if using egg white to release and incorporate the foam). Strain into a chilled cobbler glass, or for an on-the-rocks version, strain into an old fashioned glass with ice.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene (shakerare più forte se si usa l\'albume per rilasciare e incorporare la schiuma). Filtrare in un bicchiere cobbler freddo, o per una versione on the rocks, filtrare in un bicchiere old fashioned con ghiaccio.',
    vi: 'Cho tất cả nguyên liệu vào shaker đầy đá. Lắc mạnh (lắc mạnh hơn nếu dùng lòng trắng trứng để tạo và hòa quyện bọt). Lọc vào ly cobbler lạnh, hoặc để phiên bản on the rocks, lọc vào ly old fashioned với đá.',
  },

  glass: 'Cobbler glass',

  garnish: {
    en: 'Half orange slice and maraschino cherry, with optional orange zest',
    it: 'Mezza fetta d\'arancia e ciliegia maraschino, con scorza d\'arancia opzionale',
    vi: 'Nửa lát cam và cherry maraschino, với vỏ cam tùy chọn',
  },

  ice: 'cubed',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],
  flavor_profile: ['sour', 'sweet', 'citrus', 'smooth'],
  abv_estimate: 18,
  calories_estimate: 160,
  difficulty: 'easy',
  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'egg'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'egg_intolerance'],
    suitable_for_diets: ['pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['aperitivo', 'casual_gathering', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    'New York Sour (with red wine float)',
    'Boston Sour (with egg white)',
    'Ward Eight (with grenadine and orange)',
  ],

  notes_for_staff: 'When making with egg white, dry shake first (without ice) for 10 seconds to emulsify, then add ice and shake again vigorously for 15-20 seconds. The IBA recipe calls for "few drops" of egg white, but modern bartenders typically use one full egg white for better foam. Always use fresh lemon juice - never bottled. Can be served either up in a cobbler glass or on the rocks in an old fashioned glass per customer preference.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/whiskey-sour/',
    note: 'IBA Official Recipe. Historical research from Jerry Thomas\'s 1862 Bartenders Guide, Waukesha Plain Dealer 1870, and modern cocktail historians.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
