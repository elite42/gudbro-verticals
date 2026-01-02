/**
 * Famous Cocktails: Goombay Smash
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const goombaySmash: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '6d7e8f9a-1b2c-3d4e-5f6a-7b8c9d0e1f2a',
  slug: 'goombay-smash',
  stable_key: 'goombay-smash-tiki-tropical-famous-2025',

  name: {
    en: 'Goombay Smash',
    it: 'Goombay Smash',
    vi: 'Goombay Smash',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'bahamas', 'fruity', 'signature'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The signature cocktail of the Bahamas, combining coconut rum with apricot brandy and tropical fruit juices. The Goombay Smash is a potent yet refreshing blend that captures the spirit of island celebration and Caribbean culture.',
    it: 'Il cocktail signature delle Bahamas, che combina rum al cocco con brandy all\'albicocca e succhi di frutta tropicale. Il Goombay Smash è una miscela potente ma rinfrescante che cattura lo spirito della celebrazione insulare e della cultura caraibica.',
    vi: 'Cocktail đặc trưng của Bahamas, kết hợp rum dừa với rượu mơ và nước ép trái cây nhiệt đới. Goombay Smash là hỗn hợp mạnh mẽ nhưng sảng khoái nắm bắt tinh thần lễ hội đảo và văn hóa Caribbean.',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Green Turtle Cay',
      bar: 'Miss Emily\'s Blue Bee Bar',
      country: 'Bahamas',
    },
    creator: {
      name: 'Emily Cooper',
      profession: 'bartender',
    },
    story: {
      en: 'The Goombay Smash was created by Miss Emily Cooper at her legendary Blue Bee Bar on Green Turtle Cay in the Abaco Islands, Bahamas, during the 1960s. The drink became so popular that it\'s now considered the national cocktail of the Bahamas. "Goombay" refers to a style of Bahamian music and dance with African roots, celebrating the islands\' cultural heritage. Miss Emily\'s original recipe was kept secret for years, and she famously made each drink herself, refusing to let anyone else prepare it. The cocktail gained international fame and is now served throughout the Caribbean, though purists insist the best version is still made at the original Blue Bee Bar.',
      it: 'Il Goombay Smash fu creato da Miss Emily Cooper nel suo leggendario Blue Bee Bar a Green Turtle Cay nelle Isole Abaco, Bahamas, durante gli anni \'60. La bevanda divenne così popolare che ora è considerata il cocktail nazionale delle Bahamas. "Goombay" si riferisce a uno stile di musica e danza bahamense con radici africane, celebrando il patrimonio culturale delle isole. La ricetta originale di Miss Emily fu tenuta segreta per anni, e lei famosamente preparava ogni drink da sola, rifiutandosi di lasciare che chiunque altro lo preparasse. Il cocktail acquisì fama internazionale ed è ora servito in tutti i Caraibi, anche se i puristi insistono che la migliore versione è ancora quella fatta all\'originale Blue Bee Bar.',
      vi: 'Goombay Smash được tạo ra bởi Miss Emily Cooper tại Blue Bee Bar huyền thoại của bà trên Green Turtle Cay ở Quần đảo Abaco, Bahamas, trong những năm 1960. Thức uống trở nên phổ biến đến mức giờ đây được coi là cocktail quốc gia của Bahamas. "Goombay" đề cập đến một phong cách âm nhạc và khiêu vũ Bahamas có nguồn gốc châu Phi, tôn vinh di sản văn hóa của hòn đảo. Công thức gốc của Miss Emily được giữ bí mật trong nhiều năm, và bà nổi tiếng tự pha chế mỗi ly, từ chối để bất kỳ ai khác chuẩn bị. Cocktail trở nên nổi tiếng quốc tế và hiện được phục vụ khắp Caribbean, mặc dù những người theo chủ nghĩa thuần túy khẳng định phiên bản tốt nhất vẫn được pha tại Blue Bee Bar gốc.',
    },
    named_after: {
      en: 'Named after "Goombay," a traditional Bahamian music and dance style with African origins, celebrating the islands\' rich cultural heritage and festive spirit.',
      it: 'Prende il nome da "Goombay," uno stile tradizionale di musica e danza bahamense con origini africane, celebrando il ricco patrimonio culturale delle isole e lo spirito festoso.',
      vi: 'Được đặt theo tên "Goombay," một phong cách âm nhạc và khiêu vũ truyền thống Bahamas có nguồn gốc châu Phi, tôn vinh di sản văn hóa phong phú và tinh thần lễ hội của hòn đảo.',
    },
  },

  taste: {
    profile: ['fruity', 'tropical', 'sweet'],
    description: {
      en: 'Complex and tropical with layers of coconut, apricot, pineapple, and citrus. The coconut rum provides a sweet, tropical base while apricot brandy adds depth and sophistication. Dangerously smooth and deceptively strong.',
      it: 'Complesso e tropicale con strati di cocco, albicocca, ananas e agrumi. Il rum al cocco fornisce una base dolce e tropicale mentre il brandy all\'albicocca aggiunge profondità e raffinatezza. Pericolosamente morbido e ingannevolmente forte.',
      vi: 'Phức tạp và nhiệt đới với các lớp dừa, mơ, dứa và cam quýt. Rum dừa cung cấp nền ngọt ngào, nhiệt đới trong khi rượu mơ thêm chiều sâu và sự tinh tế. Mượt mà nguy hiểm và mạnh mẽ lừa dối.',
    },
    first_impression: {
      en: 'Sweet coconut and tropical fruit burst with subtle apricot complexity',
      it: 'Esplosione di cocco dolce e frutta tropicale con sottile complessità di albicocca',
      vi: 'Dừa ngọt và trái cây nhiệt đới bùng nổ với độ phức tạp mơ tinh tế',
    },
    finish: {
      en: 'Long, warming finish with lingering coconut, apricot, and rum notes',
      it: 'Finale lungo e caldo con note persistenti di cocco, albicocca e rum',
      vi: 'Kết thúc dài, ấm áp với hương dừa, mơ và rum kéo dài',
    },
    balance: {
      en: 'Well-balanced sweetness with tropical complexity - the apricot brandy prevents it from being one-dimensional',
      it: 'Dolcezza ben bilanciata con complessità tropicale - il brandy all\'albicocca impedisce che sia monodimensionale',
      vi: 'Vị ngọt cân bằng tốt với độ phức tạp nhiệt đới - rượu mơ ngăn không cho nó đơn điệu',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'celebration', 'vacation', 'caribbean_theme', 'special_occasion'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Perfect with Bahamian conch fritters, grilled lobster, coconut shrimp, jerk chicken, or tropical fruit platters. Also pairs well with spicy Caribbean dishes as the sweetness balances heat.',
      it: 'Perfetto con frittelle di conchiglia bahamense, aragosta alla griglia, gamberi al cocco, pollo jerk o piatti di frutta tropicale. Si abbina bene anche con piatti caraibici piccanti poiché la dolcezza bilancia il calore.',
      vi: 'Hoàn hảo với bánh rán ốc Bahamas, tôm hùm nướng, tôm dừa, gà jerk hoặc đĩa trái cây nhiệt đới. Cũng kết hợp tốt với các món Caribbean cay vì vị ngọt cân bằng độ nóng.',
    },
    ideal_for: {
      en: 'Perfect for Caribbean vacations, island celebrations, and tropical beach parties. Ideal for those seeking the authentic taste of the Bahamas. A must-try for tiki cocktail enthusiasts and rum lovers.',
      it: 'Perfetto per vacanze caraibiche, celebrazioni insulari e feste sulla spiaggia tropicale. Ideale per chi cerca il gusto autentico delle Bahamas. Da provare assolutamente per gli appassionati di cocktail tiki e gli amanti del rum.',
      vi: 'Hoàn hảo cho kỳ nghỉ Caribbean, lễ kỷ niệm đảo và tiệc bãi biển nhiệt đới. Lý tưởng cho những ai tìm kiếm hương vị chân thực của Bahamas. Phải thử cho những người đam mê cocktail tiki và người yêu rum.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_COCONUT',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Coconut rum', it: 'Rum al cocco', vi: 'Rum dừa' },
    },
    {
      ingredient_id: 'ING_APRICOT_BRANDY',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Apricot brandy', it: 'Brandy all\'albicocca', vi: 'Rượu mơ' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ép dứa' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a hurricane glass filled with fresh ice. Garnish with pineapple wedge and cherry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere hurricane pieno di ghiaccio fresco. Guarnire con spicchio di ananas e ciliegina.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh hoàn toàn. Lọc vào ly hurricane đầy đá tươi. Trang trí với miếng dứa và cherry.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Pineapple wedge and maraschino cherry',
    it: 'Spicchio di ananas e ciliegina al maraschino',
    vi: 'Miếng dứa và cherry maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_COCONUT'],

  flavor_profile: ['fruity', 'tropical', 'sweet'],

  abv_estimate: 14,

  calories_estimate: 240,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['summer', 'year_round'],
  occasion_tags: ['beach', 'celebration', 'vacation', 'caribbean_theme'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['frozen-goombay-smash', 'virgin-goombay-smash'],

  notes_for_staff: 'National cocktail of the Bahamas. Original recipe from Miss Emily\'s Blue Bee Bar. The apricot brandy is key to authentic flavor. Can be served frozen. Deceptively strong - warn guests. Some recipes include rum floater on top.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/goombay-smash/',
    note: 'National cocktail of Bahamas. Created by Miss Emily Cooper at Blue Bee Bar.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
