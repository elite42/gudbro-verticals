/**
 * Famous Cocktails: Salty Dog
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const saltyDog: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-6f78-9012-bcde-f12345678901',
  slug: 'salty-dog',
  stable_key: 'f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8',

  name: {
    en: 'Salty Dog',
    it: 'Salty Dog',
    vi: 'Salty Dog',
    ko: '솔티 도그',
    ja: 'ソルティドッグ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'refreshing', 'citrus', 'vodka', 'salted-rim'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A Greyhound with a salted rim. This classic highball combines vodka and fresh grapefruit juice with a generous coating of coarse salt on the rim, creating a perfect balance of sweet, sour, bitter, and salty flavors.',
    it: 'Un Greyhound con il bordo salato. Questo classico highball combina vodka e succo di pompelmo fresco con una generosa copertura di sale grosso sul bordo, creando un perfetto equilibrio di sapori dolci, acidi, amari e salati.',
    vi: 'Một Greyhound với viền muối. Cocktail highball cổ điển này kết hợp vodka và nước ép bưởi tươi với lớp muối thô hào phóng trên viền, tạo ra sự cân bằng hoàn hảo giữa vị ngọt, chua, đắng và mặn.',
  },

  history: {
    created_year: '1952',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Salty Dog is a variation of the Greyhound that emerged in the early 1950s. The addition of the salt rim was inspired by the Margarita\'s salted edge, which had gained popularity around the same time. Originally made with gin, the vodka version became more popular during the vodka boom of the 1960s and 1970s. The name "Salty Dog" is a nautical term for a seasoned sailor, fitting the drink\'s coastal, refreshing character.',
      it: 'Il Salty Dog è una variazione del Greyhound emersa all\'inizio degli anni \'50. L\'aggiunta del bordo salato fu ispirata dal bordo salato del Margarita, che aveva guadagnato popolarità nello stesso periodo. Originariamente fatto con gin, la versione con vodka divenne più popolare durante il boom della vodka degli anni \'60 e \'70. Il nome "Salty Dog" è un termine nautico per un marinaio esperto, adatto al carattere costiero e rinfrescante del drink.',
      vi: 'Salty Dog là một biến thể của Greyhound xuất hiện vào đầu những năm 1950. Việc thêm viền muối được lấy cảm hứng từ viền muối của Margarita, cũng trở nên phổ biến vào cùng thời kỳ. Ban đầu được làm với gin, phiên bản vodka trở nên phổ biến hơn trong thời kỳ bùng nổ vodka của những năm 1960 và 1970. Cái tên "Salty Dog" là thuật ngữ hàng hải cho một thủy thủ dày dạn, phù hợp với đặc tính ven biển, tươi mát của thức uống.',
    },
    named_after: {
      en: 'Named after the nautical slang term for an experienced sailor who has spent considerable time at sea.',
      it: 'Prende il nome dal termine gergale nautico per un marinaio esperto che ha trascorso molto tempo in mare.',
      vi: 'Được đặt theo thuật ngữ tiếng lóng hàng hải cho một thủy thủ có kinh nghiệm đã dành nhiều thời gian trên biển.',
    },
  },

  taste: {
    profile: ['citrus', 'bitter', 'salty', 'refreshing'],
    description: {
      en: 'The salt rim transforms the drink, adding a savory dimension that enhances the grapefruit\'s natural tartness and bitterness. Each sip provides a complex interplay between the salty edge, bitter citrus, and clean vodka.',
      it: 'Il bordo salato trasforma il drink, aggiungendo una dimensione salata che esalta l\'acidità naturale e l\'amaro del pompelmo. Ogni sorso offre una complessa interazione tra il bordo salato, gli agrumi amari e la vodka pulita.',
      vi: 'Viền muối biến đổi thức uống, thêm chiều hướng mặn mà làm nổi bật vị chua tự nhiên và đắng của bưởi. Mỗi ngụm mang lại sự tương tác phức tạp giữa viền mặn, cam quýt đắng và vodka trong sạch.',
    },
    first_impression: {
      en: 'Salty burst followed by bright, tangy grapefruit',
      it: 'Esplosione salata seguita da pompelmo brillante e piccante',
      vi: 'Vị mặn bùng nổ theo sau là bưởi tươi sáng, chua nhẹ',
    },
    finish: {
      en: 'Clean citrus finish with lingering salt and grapefruit bitterness',
      it: 'Finale di agrumi pulito con sale persistente e amaro di pompelmo',
      vi: 'Kết thúc cam quýt trong sạch với vị muối và đắng bưởi kéo dài',
    },
    balance: {
      en: 'The salt rim creates a perfect harmony between sweet, sour, bitter, and salty - a true four-dimensional cocktail',
      it: 'Il bordo salato crea un\'armonia perfetta tra dolce, acido, amaro e salato - un vero cocktail a quattro dimensioni',
      vi: 'Viền muối tạo ra sự hài hòa hoàn hảo giữa ngọt, chua, đắng và mặn - cocktail thực sự bốn chiều',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'brunch', 'daytime'],
    occasions: ['casual', 'brunch', 'poolside', 'beach', 'summer_party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with oysters, ceviche, fish tacos, grilled shrimp, and other seafood. Also pairs well with chips and guacamole.',
      it: 'Perfetto con ostriche, ceviche, fish tacos, gamberetti alla griglia e altri frutti di mare. Si abbina bene anche con patatine e guacamole.',
      vi: 'Hoàn hảo với hàu, ceviche, fish tacos, tôm nướng và các hải sản khác. Cũng kết hợp tốt với khoai tây chiên và guacamole.',
    },
    ideal_for: {
      en: 'Perfect for beach lovers and anyone who enjoys savory cocktails. Great for those who appreciate the salt-citrus combination found in margaritas but want something lighter and less sweet.',
      it: 'Perfetto per gli amanti della spiaggia e per chiunque apprezzi cocktail salati. Ottimo per chi apprezza la combinazione sale-agrumi dei margarita ma vuole qualcosa di più leggero e meno dolce.',
      vi: 'Hoàn hảo cho người yêu biển và bất kỳ ai thích cocktail mặn mà. Tuyệt vời cho những ai đánh giá cao sự kết hợp muối-cam quýt trong margarita nhưng muốn thứ gì đó nhẹ hơn và ít ngọt hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Fresh grapefruit juice', it: 'Succo di pompelmo fresco', vi: 'Nước ép bưởi tươi' },
    },
    {
      ingredient_id: 'ING_SALT',
      quantity: { amount: 1, unit: 'tsp' },
      display_name: { en: 'Coarse salt (for rim)', it: 'Sale grosso (per il bordo)', vi: 'Muối thô (cho viền)' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Rim a highball glass with coarse salt by moistening the rim with grapefruit juice and dipping in salt. Fill glass with ice. Pour vodka over ice, then top with fresh grapefruit juice. Stir gently. Garnish with a grapefruit wedge.',
    it: 'Bordare un bicchiere highball con sale grosso inumidendo il bordo con succo di pompelmo e immergendo nel sale. Riempire il bicchiere con ghiaccio. Versare la vodka sul ghiaccio, quindi completare con succo di pompelmo fresco. Mescolare delicatamente. Guarnire con uno spicchio di pompelmo.',
    vi: 'Tạo viền muối thô cho ly highball bằng cách làm ướt viền với nước ép bưởi và nhúng vào muối. Đổ đầy ly với đá. Rót vodka lên đá, sau đó thêm nước ép bưởi tươi. Khuấy nhẹ nhàng. Trang trí với một lát bưởi.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Grapefruit wedge, salted rim',
    it: 'Spicchio di pompelmo, bordo salato',
    vi: 'Lát bưởi, viền muối',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['citrus', 'bitter', 'salty', 'refreshing'],

  abv_estimate: 8,

  calories_estimate: 155,

  difficulty: 'easy',

  prep_time_seconds: 45,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['casual', 'brunch', 'poolside', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['greyhound', 'gin-salty-dog'],

  notes_for_staff: 'Use coarse salt, not fine table salt, for proper rim texture. Pink Himalayan salt looks beautiful. Original recipe used gin instead of vodka - offer as variation. Be generous with the salt rim.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1235/salty-dog',
    note: 'Variant of the Greyhound, documented in classic cocktail literature.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
