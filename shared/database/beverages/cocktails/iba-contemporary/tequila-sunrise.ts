/**
 * IBA Contemporary Classics: Tequila Sunrise
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tequilaSunrise: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
  slug: 'tequila-sunrise',
  stable_key: 'tequila_sunrise_iba_contemporary_classic',

  name: {
    en: 'Tequila Sunrise',
    it: 'Tequila Sunrise',
    vi: 'Tequila Sunrise',
    ko: '테킬라 선라이즈',
    ja: 'テキーラサンライズ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'fruity', 'visual', 'summer', 'iconic', 'easy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A visually stunning cocktail that lives up to its name - tequila and orange juice layered with grenadine to create a sunrise effect. Beautiful, fruity, and refreshing, it\'s as pleasing to the eye as it is to the palate.',
    it: 'Un cocktail visivamente stupefacente che fa onore al suo nome - tequila e succo d\'arancia stratificati con granatina per creare un effetto alba. Bello, fruttato e rinfrescante, è gradevole agli occhi quanto al palato.',
    vi: 'Một cocktail tuyệt đẹp về mặt thị giác đúng với tên gọi của nó - tequila và nước cam phân lớp với grenadine để tạo hiệu ứng bình minh. Đẹp, trái cây và sảng khoái, nó làm hài lòng mắt cũng như khẩu vị.',
  },

  history: {
    created_year: '1970',
    origin: {
      city: 'Sausalito',
      bar: 'Trident Restaurant',
      country: 'USA',
    },
    creator: {
      name: 'Bobby Lozoff and Billy Rice',
      profession: 'bartenders',
    },
    story: {
      en: 'The modern Tequila Sunrise was created in the early 1970s by Bobby Lozoff and Billy Rice at the Trident Restaurant in Sausalito, California. It gained massive popularity when Mick Jagger tried it and ordered the drink everywhere during the Rolling Stones\' 1972 American tour, leading to it being called "The Tequila Sunrise tour."',
      it: 'Il moderno Tequila Sunrise fu creato all\'inizio degli anni \'70 da Bobby Lozoff e Billy Rice al Trident Restaurant di Sausalito, California. Ottenne enorme popolarità quando Mick Jagger lo provò e ordinò la bevanda ovunque durante il tour americano dei Rolling Stones del 1972, portando a chiamarlo "The Tequila Sunrise tour."',
      vi: 'Tequila Sunrise hiện đại được tạo ra vào đầu những năm 1970 bởi Bobby Lozoff và Billy Rice tại nhà hàng Trident ở Sausalito, California. Nó trở nên cực kỳ phổ biến khi Mick Jagger thử nó và gọi thức uống này ở khắp mọi nơi trong tour lưu diễn Mỹ của Rolling Stones năm 1972, dẫn đến việc nó được gọi là "The Tequila Sunrise tour."',
    },
    named_after: {
      en: 'Named for the visual effect created by the grenadine settling through the drink, resembling a sunrise.',
      it: 'Prende il nome dall\'effetto visivo creato dalla granatina che si deposita attraverso la bevanda, somigliante a un\'alba.',
      vi: 'Được đặt tên theo hiệu ứng hình ảnh được tạo ra bởi grenadine lắng qua thức uống, giống như bình minh.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'citrus'],
    description: {
      en: 'Bright and refreshing with prominent orange citrus flavor complemented by sweet grenadine. Tequila adds earthy agave notes and warmth. Light, easy-drinking, and crowd-pleasing.',
      it: 'Brillante e rinfrescante con un prominente sapore di agrumi d\'arancia complementato dalla dolce granatina. La tequila aggiunge note terrose di agave e calore. Leggero, facile da bere e che piace a tutti.',
      vi: 'Sáng và sảng khoái với hương vị cam quýt cam nổi bật được bổ sung bởi grenadine ngọt. Tequila thêm hương agave đất và hơi ấm. Nhẹ nhàng, dễ uống và được mọi người yêu thích.',
    },
    first_impression: {
      en: 'Sweet orange and cherry with smooth tequila',
      it: 'Arancia dolce e ciliegia con tequila morbida',
      vi: 'Cam ngọt và anh đào với tequila mượt',
    },
    finish: {
      en: 'Clean, fruity finish with subtle agave warmth',
      it: 'Finale pulito e fruttato con sottile calore di agave',
      vi: 'Kết thúc sạch, trái cây với hơi ấm agave tinh tế',
    },
    balance: {
      en: 'Well-balanced between sweet grenadine and citrus orange',
      it: 'Ben bilanciato tra granatina dolce e arancia agrumata',
      vi: 'Cân bằng tốt giữa grenadine ngọt và cam cam quýt',
    },
  },

  recommendations: {
    best_time: ['morning', 'afternoon', 'evening'],
    occasions: ['brunch', 'beach', 'pool_party', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Mexican cuisine, breakfast dishes, fresh fruit, grilled seafood, and light appetizers.',
      it: 'Perfetto con cucina messicana, piatti per colazione, frutta fresca, frutti di mare alla griglia e antipasti leggeri.',
      vi: 'Hoàn hảo với ẩm thực Mexico, món ăn sáng, trái cây tươi, hải sản nướng và món khai vị nhẹ.',
    },
    ideal_for: {
      en: 'Ideal for anyone seeking a visually appealing, easy-drinking cocktail. Perfect for brunch, poolside, or introducing friends to tequila.',
      it: 'Ideale per chi cerca un cocktail visivamente attraente e facile da bere. Perfetto per brunch, a bordo piscina o per introdurre gli amici alla tequila.',
      vi: 'Lý tưởng cho bất kỳ ai tìm kiếm cocktail hấp dẫn về mặt hình ảnh, dễ uống. Hoàn hảo cho brunch, bên bể bơi hoặc giới thiệu bạn bè với tequila.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Tequila', it: 'Tequila', vi: 'Tequila' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Grenadine syrup', it: 'Sciroppo di granatina', vi: 'Siro grenadine' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour tequila and orange juice directly into a highball glass filled with ice cubes. Add grenadine by carefully pouring it down the side of the glass - it will sink and gradually rise to create a sunrise effect. Do not stir. Garnish with an orange slice and cherry.',
    it: 'Versare tequila e succo d\'arancia direttamente in un bicchiere highball pieno di cubetti di ghiaccio. Aggiungere la granatina versandola con cura lungo il lato del bicchiere - affonderà e gradualmente salirà per creare un effetto alba. Non mescolare. Guarnire con una fetta d\'arancia e una ciliegia.',
    vi: 'Đổ tequila và nước cam trực tiếp vào ly highball đầy đá viên. Thêm grenadine bằng cách cẩn thận rót nó xuống cạnh ly - nó sẽ chìm và dần dần nổi lên để tạo hiệu ứng bình minh. Không khuấy. Trang trí bằng lát cam và anh đào.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice and maraschino cherry',
    it: 'Fetta d\'arancia e ciliegia maraschino',
    vi: 'Lát cam và anh đào maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA'],

  flavor_profile: ['fruity', 'sweet', 'citrus'],

  abv_estimate: 10,

  calories_estimate: 200,

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
  occasion_tags: ['brunch', 'beach', 'pool_party', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['tequila-sunset', 'vodka-sunrise', 'mezcal-sunrise'],

  notes_for_staff: 'DO NOT STIR after adding grenadine - the layered sunrise effect is key to presentation. Pour grenadine slowly down the inside of the glass. Use fresh-squeezed orange juice for best results. Guest can stir before drinking.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/tequila-sunrise/',
    note: 'IBA Official Recipe. Made famous by The Rolling Stones in the 1970s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
