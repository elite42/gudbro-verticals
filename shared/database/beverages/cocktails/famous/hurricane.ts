/**
 * Famous Cocktails: Hurricane
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const hurricane: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  slug: 'hurricane',
  stable_key: 'hurricane_famous_tiki_tropical_cocktail',

  name: {
    en: 'Hurricane',
    it: 'Hurricane',
    vi: 'Hurricane',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'fruity', 'strong'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Hurricane is New Orleans\' most famous cocktail, a potent rum punch combining light and dark rum with passion fruit syrup and citrus. Named after the hurricane lamp-shaped glass it\'s served in, this sweet and strong drink is a French Quarter institution.',
    it: 'L\'Hurricane è il cocktail più famoso di New Orleans, un potente punch al rum che combina rum chiaro e scuro con sciroppo di frutto della passione e agrumi. Prende il nome dal bicchiere a forma di lampada ad uragano in cui viene servito, questa bevanda dolce e forte è un\'istituzione del quartiere francese.',
    vi: 'Hurricane là cocktail nổi tiếng nhất của New Orleans, một loại punch rum mạnh kết hợp rum trắng và đen với xi-rô chanh dây và cam quýt. Được đặt theo tên chiếc ly hình đèn bão mà nó được phục vụ, thức uống ngọt và mạnh này là một tổ chức của Khu Pháp.',
  },

  history: {
    created_year: '1940',
    origin: {
      city: 'New Orleans',
      bar: 'Pat O\'Brien\'s Bar',
      country: 'USA',
    },
    creator: {
      name: 'Pat O\'Brien',
      profession: 'bar owner',
    },
    story: {
      en: 'The Hurricane was created in the 1940s by Pat O\'Brien at his eponymous French Quarter bar in New Orleans. During World War II, whiskey was scarce but rum was plentiful, so O\'Brien created this potent rum cocktail to use up his surplus stock. He served it in a hurricane lamp-shaped glass, and the drink quickly became a hit with sailors on shore leave. The cocktail became synonymous with New Orleans and Bourbon Street nightlife, remaining one of the city\'s signature drinks to this day.',
      it: 'L\'Hurricane fu creato negli anni \'40 da Pat O\'Brien nel suo omonimo bar del quartiere francese a New Orleans. Durante la seconda guerra mondiale, il whisky scarseggiava ma il rum era abbondante, quindi O\'Brien creò questo potente cocktail al rum per utilizzare le sue scorte in eccesso. Lo servì in un bicchiere a forma di lampada ad uragano e la bevanda divenne rapidamente un successo tra i marinai in licenza. Il cocktail divenne sinonimo di New Orleans e della vita notturna di Bourbon Street, rimanendo una delle bevande simbolo della città fino ad oggi.',
      vi: 'Hurricane được tạo ra vào những năm 1940 bởi Pat O\'Brien tại quán bar cùng tên ở Khu Pháp tại New Orleans. Trong Thế chiến II, whiskey khan hiếm nhưng rum thì dồi dào, vì vậy O\'Brien đã tạo ra cocktail rum mạnh này để sử dụng hết lượng hàng dư thừa. Ông phục vụ nó trong ly hình đèn bão, và thức uống nhanh chóng trở thành hit với các thủy thủ đang nghỉ phép. Cocktail trở thành đồng nghĩa với New Orleans và cuộc sống về đêm ở Bourbon Street, vẫn là một trong những thức uống đặc trưng của thành phố cho đến ngày nay.',
    },
    named_after: {
      en: 'Named after the hurricane lamp-shaped glass in which it is traditionally served, with its distinctive curved design.',
      it: 'Prende il nome dal bicchiere a forma di lampada ad uragano in cui viene tradizionalmente servito, con il suo caratteristico design curvo.',
      vi: 'Được đặt theo tên chiếc ly hình đèn bão mà nó thường được phục vụ, với thiết kế cong đặc biệt.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'strong'],
    description: {
      en: 'Bold and tropical with intense passion fruit flavor dominating the palate. The Hurricane combines sweet fruitiness with the warming strength of double rum, balanced by bright citrus notes. Deceptively strong despite its sweet, approachable taste.',
      it: 'Audace e tropicale con un intenso sapore di frutto della passione che domina il palato. L\'Hurricane combina la dolcezza fruttata con la forza riscaldante del doppio rum, bilanciata da note di agrumi brillanti. Ingannevolmente forte nonostante il suo sapore dolce e accessibile.',
      vi: 'Táo bạo và nhiệt đới với hương vị chanh dây mãnh liệt chiếm ưu thế vị giác. Hurricane kết hợp vị ngọt trái cây với sức mạnh ấm áp của rum kép, được cân bằng bởi hương cam quýt sáng. Mạnh một cách lừa dối mặc dù có vị ngọt, dễ tiếp cận.',
    },
    first_impression: {
      en: 'Intense passion fruit sweetness hits first, masking the strong rum foundation underneath',
      it: 'L\'intensa dolcezza del frutto della passione colpisce per prima, mascherando la forte base di rum sottostante',
      vi: 'Vị ngọt chanh dây mãnh liệt xuất hiện đầu tiên, che giấu nền rum mạnh bên dưới',
    },
    finish: {
      en: 'Long, warming finish with rum heat and lingering tropical fruit notes',
      it: 'Finale lungo e caldo con calore del rum e note di frutta tropicale persistenti',
      vi: 'Kết thúc dài, ấm áp với nhiệt độ rum và hương vị trái cây nhiệt đới kéo dài',
    },
    balance: {
      en: 'Sweet and strong with fruit flavors masking significant alcohol content - dangerously drinkable',
      it: 'Dolce e forte con sapori di frutta che mascherano un contenuto alcolico significativo - pericolosamente bevibile',
      vi: 'Ngọt và mạnh với hương vị trái cây che giấu hàm lượng cồn đáng kể - dễ uống một cách nguy hiểm',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'late_night'],
    occasions: ['mardi_gras', 'party', 'celebration', 'festival'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with New Orleans classics like jambalaya, gumbo, po\' boys, or beignets. Also pairs well with Cajun and Creole cuisine, fried seafood, and spicy dishes.',
      it: 'Perfetto con i classici di New Orleans come jambalaya, gumbo, po\' boys o beignets. Si abbina bene anche con la cucina cajun e creola, frutti di mare fritti e piatti piccanti.',
      vi: 'Hoàn hảo với các món cổ điển New Orleans như jambalaya, gumbo, po\' boys hoặc beignets. Cũng kết hợp tốt với ẩm thực Cajun và Creole, hải sản chiên và món cay.',
    },
    ideal_for: {
      en: 'Perfect for party lovers and those seeking a festive, high-energy drink. Ideal for Mardi Gras celebrations or anyone wanting to experience New Orleans nightlife. Great for those who enjoy sweet, fruity cocktails with a serious kick.',
      it: 'Perfetto per gli amanti delle feste e coloro che cercano una bevanda festiva ad alta energia. Ideale per le celebrazioni del Mardi Gras o per chiunque voglia sperimentare la vita notturna di New Orleans. Ottimo per chi ama i cocktail dolci e fruttati con un calcio serio.',
      vi: 'Hoàn hảo cho những người yêu tiệc tụng và những ai tìm kiếm đồ uống lễ hội, năng lượng cao. Lý tưởng cho lễ kỷ niệm Mardi Gras hoặc bất kỳ ai muốn trải nghiệm cuộc sống về đêm ở New Orleans. Tuyệt vời cho những ai thích cocktail ngọt, trái cây với độ mạnh nghiêm trọng.',
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
      ingredient_id: 'ING_PASSION_FRUIT_SYRUP',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Passion fruit syrup', it: 'Sciroppo di frutto della passione', vi: 'Xi-rô chanh dây' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh xanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a hurricane glass filled with ice. Garnish with orange slice and maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere hurricane pieno di ghiaccio. Guarnire con fetta d\'arancia e ciliegia maraschino.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly hurricane đầy đá. Trang trí với lát cam và cherry maraschino.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Orange slice, maraschino cherry',
    it: 'Fetta d\'arancia, ciliegia maraschino',
    vi: 'Lát cam, cherry maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_RUM_DARK'],

  flavor_profile: ['fruity', 'sweet', 'strong'],

  abv_estimate: 14,

  calories_estimate: 280,

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['mardi_gras', 'party', 'celebration', 'festival'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['new-orleans-hurricane', 'french-quarter-hurricane'],

  notes_for_staff: 'Original Pat O\'Brien\'s recipe is proprietary, but this is the classic formula. Can substitute passion fruit purée for syrup. Glass should be hurricane lamp-shaped. Very strong - warn guests it\'s deceptively potent.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.patobriens.com/hurricane-drink',
    note: 'Based on classic New Orleans formula. Historical information from Pat O\'Brien\'s Bar and New Orleans cocktail archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
