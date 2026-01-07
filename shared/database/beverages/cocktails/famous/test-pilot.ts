/**
 * Famous Cocktails: Test Pilot
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const testPilot: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
  slug: 'test-pilot',
  stable_key: 'test_pilot_famous_tiki_tropical_cocktail',

  name: {
    en: 'Test Pilot',
    it: 'Test Pilot',
    vi: 'Test Pilot',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'complex', 'strong'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Test Pilot is a sophisticated tiki cocktail created by Don the Beachcomber, featuring a complex blend of rums with falernum, Pernod, and citrus. This potent drink showcases the depth and complexity that defines classic tiki mixology.',
    it: 'Il Test Pilot è un sofisticato cocktail tiki creato da Don the Beachcomber, che presenta una complessa miscela di rum con falernum, Pernod e agrumi. Questa bevanda potente mette in mostra la profondità e la complessità che definisce la mixology tiki classica.',
    vi: 'Test Pilot là một loại cocktail tiki tinh vi được tạo ra bởi Don the Beachcomber, có hỗn hợp rum phức tạp với falernum, Pernod và cam quýt. Thức uống mạnh mẽ này thể hiện chiều sâu và độ phức tạp xác định nghệ thuật pha chế tiki cổ điển.',
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
      en: 'The Test Pilot was created around 1941 by Don the Beachcomber (Ernest Raymond Beaumont Gantt) at his Hollywood restaurant. The drink emerged during the early days of World War II when aviation was prominent in public consciousness. Don the Beachcomber was known for creating incredibly complex rum cocktails with multiple rums and exotic ingredients, and the Test Pilot exemplifies this approach. The recipe combines three different rums with falernum (a Caribbean spiced syrup), Pernod (anise liqueur), and fresh citrus, creating layers of flavor that were revolutionary for the era. Like many Don the Beachcomber creations, the recipe was kept secret and coded, only being deciphered decades later by tiki historians like Jeff "Beachbum" Berry.',
      it: "Il Test Pilot fu creato intorno al 1941 da Don the Beachcomber (Ernest Raymond Beaumont Gantt) nel suo ristorante di Hollywood. La bevanda emerse durante i primi giorni della seconda guerra mondiale quando l'aviazione era prominente nella coscienza pubblica. Don the Beachcomber era noto per creare cocktail al rum incredibilmente complessi con più rum e ingredienti esotici, e il Test Pilot esemplifica questo approccio. La ricetta combina tre diversi rum con falernum (uno sciroppo speziato caraibico), Pernod (liquore all'anice) e agrumi freschi, creando strati di sapore rivoluzionari per l'epoca. Come molte creazioni di Don the Beachcomber, la ricetta fu tenuta segreta e codificata, venendo decifrata solo decenni dopo da storici del tiki come Jeff \"Beachbum\" Berry.",
      vi: 'Test Pilot được tạo ra vào khoảng năm 1941 bởi Don the Beachcomber (Ernest Raymond Beaumont Gantt) tại nhà hàng Hollywood của ông. Thức uống xuất hiện trong những ngày đầu của Thế chiến II khi hàng không nổi bật trong ý thức công chúng. Don the Beachcomber nổi tiếng với việc tạo ra các loại cocktail rum cực kỳ phức tạp với nhiều loại rum và thành phần kỳ lạ, và Test Pilot minh họa cách tiếp cận này. Công thức kết hợp ba loại rum khác nhau với falernum (xi-rô gia vị Caribbean), Pernod (rượu mùi hồi) và cam quýt tươi, tạo ra các lớp hương vị mang tính cách mạng cho thời đại. Giống như nhiều sáng tạo của Don the Beachcomber, công thức được giữ bí mật và mã hóa, chỉ được giải mã nhiều thập kỷ sau bởi các nhà sử học tiki như Jeff "Beachbum" Berry.',
    },
    named_after: {
      en: "Named after World War II aviation test pilots, reflecting the drink's daring, adventurous nature and potent strength.",
      it: "Prende il nome dai piloti collaudatori dell'aviazione della seconda guerra mondiale, riflettendo la natura audace e avventurosa della bevanda e la forza potente.",
      vi: 'Được đặt theo tên các phi công thử nghiệm hàng không Thế chiến II, phản ánh bản chất táo bạo, mạo hiểm và sức mạnh mạnh mẽ của thức uống.',
    },
  },

  taste: {
    profile: ['complex', 'spiced', 'citrus'],
    description: {
      en: 'Extraordinarily complex with layers of rum, spice, anise, and citrus. The Test Pilot balances multiple rums with the warming spice of falernum, subtle anise from Pernod, and bright lime. Each sip reveals new dimensions of flavor - a true test of bartending mastery.',
      it: "Straordinariamente complesso con strati di rum, spezie, anice e agrumi. Il Test Pilot bilancia più rum con le spezie calde del falernum, l'anice sottile del Pernod e il lime brillante. Ogni sorso rivela nuove dimensioni di sapore - un vero test di maestria nel bartending.",
      vi: 'Phức tạp phi thường với nhiều lớp rum, gia vị, hồi và cam quýt. Test Pilot cân bằng nhiều loại rum với gia vị ấm áp của falernum, hồi tinh tế từ Pernod và chanh xanh sáng. Mỗi ngụm tiết lộ những chiều hướng hương vị mới - một bài kiểm tra thực sự về sự thành thạo pha chế.',
    },
    first_impression: {
      en: 'Bright lime and anise hit first, followed by warming spice and complex rum depth',
      it: "Il lime brillante e l'anice colpiscono per primi, seguiti da spezie calde e profondità complessa del rum",
      vi: 'Chanh xanh sáng và hồi xuất hiện đầu tiên, theo sau là gia vị ấm áp và chiều sâu rum phức tạp',
    },
    finish: {
      en: 'Long, complex finish with lingering spice, anise, and aged rum notes',
      it: 'Finale lungo e complesso con spezie persistenti, anice e note di rum invecchiato',
      vi: 'Kết thúc dài, phức tạp với gia vị kéo dài, hồi và hương rum già',
    },
    balance: {
      en: 'Masterfully balanced complexity - each ingredient plays its part without overwhelming the others',
      it: 'Complessità magistralmente bilanciata - ogni ingrediente svolge il suo ruolo senza sopraffare gli altri',
      vi: 'Độ phức tạp cân bằng một cách tinh thông - mỗi thành phần đóng vai trò của nó mà không áp đảo những người khác',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['tiki_bar', 'special_occasion', 'connoisseur_gathering'],
    seasons: ['year_round'],
    food_pairings: {
      en: 'Perfect with Polynesian-style appetizers, teriyaki dishes, grilled pineapple, or spiced pork. Also pairs well with Caribbean jerk chicken and tropical fruit desserts.',
      it: 'Perfetto con antipasti in stile polinesiano, piatti teriyaki, ananas alla griglia o maiale speziato. Si abbina bene anche con pollo jerk caraibico e dessert alla frutta tropicale.',
      vi: 'Hoàn hảo với món khai vị kiểu Polynesia, món teriyaki, ananás nướng hoặc thịt lợn gia vị. Cũng kết hợp tốt với gà jerk Caribbean và món tráng miệng trái cây nhiệt đới.',
    },
    ideal_for: {
      en: 'Perfect for serious tiki enthusiasts and rum connoisseurs seeking an authentic Don the Beachcomber experience. Ideal for those who appreciate complex, multi-layered cocktails. Not for beginners - this is advanced tiki drinking.',
      it: "Perfetto per seri appassionati di tiki e intenditori di rum che cercano un'autentica esperienza Don the Beachcomber. Ideale per chi apprezza cocktail complessi e multistrato. Non per principianti - questo è bere tiki avanzato.",
      vi: 'Hoàn hảo cho những người đam mê tiki nghiêm túc và những người sành rum tìm kiếm trải nghiệm Don the Beachcomber chính thống. Lý tưởng cho những ai đánh giá cao cocktail phức tạp, nhiều lớp. Không dành cho người mới bắt đầu - đây là uống tiki nâng cao.',
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
      ingredient_id: 'ING_RUM_DEMERARA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Demerara rum (151 proof)',
        it: 'Rum Demerara (151 proof)',
        vi: 'Rum Demerara (151 proof)',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_CURACAO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Orange curaçao', it: "Curaçao d'arancia", vi: 'Orange curaçao' },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
    {
      ingredient_id: 'ING_PERNOD',
      quantity: { amount: 3, unit: 'ml' },
      display_name: { en: 'Pernod (absinthe)', it: 'Pernod (assenzio)', vi: 'Pernod (absinthe)' },
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
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a double old-fashioned glass filled with crushed ice. Garnish with mint sprig and lime wheel.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere double old-fashioned pieno di ghiaccio tritato. Guarnire con rametto di menta e rotella di lime.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly double old-fashioned đầy đá nghiền. Trang trí với nhành bạc hà và vòng chanh xanh.',
  },

  glass: 'Double old-fashioned',

  garnish: {
    en: 'Fresh mint sprig, lime wheel',
    it: 'Rametto di menta fresca, rotella di lime',
    vi: 'Nhành bạc hà tươi, vòng chanh xanh',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK', 'ING_RUM_DEMERARA'],

  flavor_profile: ['complex', 'spiced', 'citrus'],

  abv_estimate: 22,

  calories_estimate: 220,

  difficulty: 'advanced',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'wormwood'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['year_round'],
  occasion_tags: ['tiki_bar', 'special_occasion', 'connoisseur_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['don-the-beachcomber-test-pilot'],

  notes_for_staff:
    'Original Don the Beachcomber recipe circa 1941, decoded by Jeff Berry. Complex recipe requires precise measurements. Falernum is essential - contains clove, almond, lime. Just a dash of Pernod - too much will overpower. Use 151-proof Demerara if available. Very strong and complex.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 62,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://beachbumberry.com/test-pilot.html',
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
