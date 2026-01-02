/**
 * Famous Cocktails: Rum Runner
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const rumRunner: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
  slug: 'rum-runner',
  stable_key: 'rum_runner_famous_tiki_tropical_cocktail',

  name: {
    en: 'Rum Runner',
    it: 'Rum Runner',
    vi: 'Rum Runner',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'fruity', 'frozen'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Rum Runner is a frozen tropical cocktail born in the Florida Keys, combining light and dark rum with banana liqueur, blackberry liqueur, and tropical fruit juices. This fruity, potent blend is a staple of Key West tiki culture.',
    it: 'Il Rum Runner è un cocktail tropicale frozen nato nelle Florida Keys, che combina rum chiaro e scuro con liquore alla banana, liquore ai frutti di bosco e succhi di frutta tropicale. Questa miscela fruttata e potente è un pilastro della cultura tiki di Key West.',
    vi: 'Rum Runner là một loại cocktail nhiệt đới đông lạnh sinh ra ở Florida Keys, kết hợp rum trắng và đen với rượu mùi chuối, rượu mùi dâu đen và nước ép trái cây nhiệt đới. Hỗn hợp trái cây mạnh mẽ này là món chủ lực của văn hóa tiki Key West.',
  },

  history: {
    created_year: '1972',
    origin: {
      city: 'Key West',
      bar: 'Holiday Isle Tiki Bar',
      country: 'USA',
    },
    creator: {
      name: 'John "Tiki John" Ebert',
      profession: 'bartender',
    },
    story: {
      en: 'The Rum Runner was created in 1972 by bartender John "Tiki John" Ebert at the Holiday Isle Tiki Bar in Islamorada, Florida Keys. The story goes that Ebert had a surplus of rum and liqueurs that he needed to use up, so he experimented with combining various ingredients. The result was this potent frozen concoction that became an instant hit with tourists and locals alike. The name "Rum Runner" pays homage to the prohibition-era smugglers who ran rum from the Caribbean to the Florida Keys. The drink perfectly captures the laid-back, tropical spirit of the Keys and remains a signature cocktail of the region.',
      it: 'Il Rum Runner fu creato nel 1972 dal barman John "Tiki John" Ebert all\'Holiday Isle Tiki Bar a Islamorada, Florida Keys. La storia racconta che Ebert aveva un surplus di rum e liquori che doveva utilizzare, quindi sperimentò combinando vari ingredienti. Il risultato fu questa potente miscela frozen che divenne un successo istantaneo sia tra i turisti che tra i locali. Il nome "Rum Runner" rende omaggio ai contrabbandieri dell\'era del proibizionismo che trasportavano rum dai Caraibi alle Florida Keys. La bevanda cattura perfettamente lo spirito rilassato e tropicale delle Keys e rimane un cocktail emblematico della regione.',
      vi: 'Rum Runner được tạo ra năm 1972 bởi bartender John "Tiki John" Ebert tại Holiday Isle Tiki Bar ở Islamorada, Florida Keys. Câu chuyện kể rằng Ebert có dư thừa rum và rượu mùi mà ông cần sử dụng hết, vì vậy ông đã thử nghiệm kết hợp các thành phần khác nhau. Kết quả là hỗn hợp đông lạnh mạnh mẽ này trở thành hit ngay lập tức với cả khách du lịch và người dân địa phương. Cái tên "Rum Runner" tôn vinh những kẻ buôn lậu thời kỳ cấm rượu chạy rum từ vùng Caribbean đến Florida Keys. Thức uống hoàn toàn nắm bắt được tinh thần nhiệt đới thoải mái của Keys và vẫn là cocktail đặc trưng của khu vực.',
    },
    named_after: {
      en: 'Named after prohibition-era rum smugglers who operated in the Caribbean and Florida Keys.',
      it: 'Prende il nome dai contrabbandieri di rum dell\'era del proibizionismo che operavano nei Caraibi e nelle Florida Keys.',
      vi: 'Được đặt theo tên những kẻ buôn lậu rum thời kỳ cấm rượu hoạt động ở vùng Caribbean và Florida Keys.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'tropical'],
    description: {
      en: 'Intensely fruity and tropical with layers of banana, blackberry, and citrus flavors. The Rum Runner is sweet and smooth with a boozy backbone, offering a complex fruit profile that tastes like a Caribbean vacation in a glass.',
      it: 'Intensamente fruttato e tropicale con strati di sapori di banana, more e agrumi. Il Rum Runner è dolce e liscio con una struttura alcolica, offrendo un profilo fruttato complesso che sa di vacanza caraibica in un bicchiere.',
      vi: 'Trái cây mãnh liệt và nhiệt đới với nhiều lớp hương vị chuối, dâu đen và cam quýt. Rum Runner ngọt và mượt với xương sống rượu mạnh, cung cấp hồ sơ trái cây phức tạp có vị như kỳ nghỉ Caribbean trong ly.',
    },
    first_impression: {
      en: 'Sweet berry and banana flavors dominate upfront, followed by tropical fruit complexity',
      it: 'I sapori dolci di frutti di bosco e banana dominano in primo piano, seguiti dalla complessità della frutta tropicale',
      vi: 'Hương vị dâu và chuối ngọt chiếm ưu thế phía trước, theo sau là độ phức tạp của trái cây nhiệt đới',
    },
    finish: {
      en: 'Smooth, fruity finish with lingering banana and berry notes and subtle rum warmth',
      it: 'Finale liscio e fruttato con note persistenti di banana e frutti di bosco e calore sottile del rum',
      vi: 'Kết thúc mượt mà, trái cây với hương chuối và dâu kéo dài và sự ấm áp tinh tế của rum',
    },
    balance: {
      en: 'Sweet and fruity with multiple liqueurs creating complex flavor layers, rum provides subtle strength',
      it: 'Dolce e fruttato con più liquori che creano strati di sapore complessi, il rum fornisce una forza sottile',
      vi: 'Ngọt và trái cây với nhiều rượu mùi tạo ra các lớp hương vị phức tạp, rum cung cấp sức mạnh tinh tế',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'vacation', 'summer_gathering'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Florida stone crab, key lime pie, conch fritters, grilled mahi-mahi, or tropical fruit salads. Also pairs well with spicy Caribbean jerk dishes.',
      it: 'Perfetto con granchio di pietra della Florida, torta al lime, frittelle di conchiglia, mahi-mahi alla griglia o insalate di frutta tropicale. Si abbina bene anche con piatti jerk piccanti dei Caraibi.',
      vi: 'Hoàn hảo với cua đá Florida, bánh key lime, bánh chiên ốc, cá mahi-mahi nướng hoặc salad trái cây nhiệt đới. Cũng kết hợp tốt với món jerk cay Caribbean.',
    },
    ideal_for: {
      en: 'Perfect for beach vacationers and frozen drink enthusiasts. Ideal for anyone seeking a potent, fruity escape to the Florida Keys. Great for poolside relaxation and tropical celebrations.',
      it: 'Perfetto per i vacanzieri in spiaggia e gli appassionati di bevande frozen. Ideale per chiunque cerchi una fuga fruttata e potente verso le Florida Keys. Ottimo per il relax a bordo piscina e celebrazioni tropicali.',
      vi: 'Hoàn hảo cho người nghỉ dưỡng bãi biển và những người đam mê đồ uống đông lạnh. Lý tưởng cho bất kỳ ai tìm kiếm sự thoát ly mạnh mẽ, trái cây đến Florida Keys. Tuyệt vời cho thư giãn bên hồ bơi và lễ kỷ niệm nhiệt đới.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_CREME_DE_BANANE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Banana liqueur', it: 'Liquore alla banana', vi: 'Rượu mùi chuối' },
    },
    {
      ingredient_id: 'ING_BLACKBERRY_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Blackberry liqueur', it: 'Liquore ai frutti di bosco', vi: 'Rượu mùi dâu đen' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ananás' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh xanh tươi' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
  ],

  method: 'blend',

  instructions: {
    en: 'Add all ingredients to a blender with 1 cup of crushed ice. Blend until smooth. Pour into a hurricane glass. Garnish with orange slice and maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in un frullatore con 1 tazza di ghiaccio tritato. Frullare fino a quando liscio. Versare in un bicchiere hurricane. Guarnire con fetta d\'arancia e ciliegia maraschino.',
    vi: 'Thêm tất cả nguyên liệu vào máy xay sinh tố với 1 cốc đá nghiền. Xay cho đến khi mịn. Đổ vào ly hurricane. Trang trí với lát cam và cherry maraschino.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Orange slice, maraschino cherry, pineapple wedge',
    it: 'Fetta d\'arancia, ciliegia maraschino, spicchio di ananas',
    vi: 'Lát cam, cherry maraschino, nhánh ananás',
  },

  ice: 'blended',

  serving_style: 'frozen',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_RUM_DARK'],

  flavor_profile: ['fruity', 'sweet', 'tropical'],

  abv_estimate: 13,

  calories_estimate: 310,

  difficulty: 'easy',

  prep_time_seconds: 120,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['beach', 'pool_party', 'vacation', 'summer_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['key-west-rum-runner', 'florida-keys-runner'],

  notes_for_staff: 'Created at Holiday Isle Tiki Bar in 1972. Can use crème de cassis if blackberry liqueur unavailable. Some recipes add orange juice. Blended version is traditional, but can be shaken and served over ice for a non-frozen variant.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 78,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.holidayisle.com/rum-runner',
    note: 'Original recipe from Holiday Isle Tiki Bar, created by Tiki John Ebert in 1972. Florida Keys cocktail archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
