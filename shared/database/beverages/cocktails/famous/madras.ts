/**
 * Famous Cocktails: Madras
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const madras: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-9012-3456-ef01-345678901234',
  slug: 'madras',
  stable_key: 'c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',

  name: {
    en: 'Madras',
    it: 'Madras',
    vi: 'Madras',
    ko: '마드라스',
    ja: 'マドラス',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'vodka', 'fruity', 'cranberry', 'orange'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A vibrant and fruity highball cocktail that combines vodka with cranberry juice and orange juice. The Madras is a sweeter cousin of the Cape Codder, offering a perfect balance of tart cranberry and sweet orange flavors.',
    it: "Un cocktail highball vibrante e fruttato che combina vodka con succo di mirtillo rosso e succo d'arancia. Il Madras è un cugino più dolce del Cape Codder, che offre un perfetto equilibrio di sapori di mirtillo rosso aspro e arancia dolce.",
    vi: 'Một cocktail highball sống động và trái cây kết hợp vodka với nước ép nam việt quất và nước cam. Madras là anh em họ ngọt ngào hơn của Cape Codder, mang lại sự cân bằng hoàn hảo giữa vị chua nam việt quất và vị ngọt cam.',
  },

  history: {
    created_year: '1980',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Madras emerged in the 1980s as a variation of the Cape Codder. The addition of orange juice to the vodka-cranberry combination created a more approachable, sweeter drink that appealed to a broader audience. The cocktail gained popularity in the 1980s and 1990s alongside other fruity vodka drinks. The name "Madras" refers to the former name of Chennai, India, though the connection to the drink is unclear - it may reference the colorful Madras plaid fabric popular in the 1980s.',
      it: "Il Madras emerse negli anni '80 come variazione del Cape Codder. L'aggiunta di succo d'arancia alla combinazione vodka-mirtillo rosso creò un drink più accessibile e più dolce che piacque a un pubblico più ampio. Il cocktail guadagnò popolarità negli anni '80 e '90 insieme ad altri drink fruttati alla vodka. Il nome \"Madras\" si riferisce al nome precedente di Chennai, India, anche se il collegamento con il drink non è chiaro - potrebbe riferirsi al tessuto a quadri Madras colorato popolare negli anni '80.",
      vi: 'Madras xuất hiện vào những năm 1980 như một biến thể của Cape Codder. Việc thêm nước cam vào sự kết hợp vodka-nam việt quất đã tạo ra thức uống dễ tiếp cận hơn, ngọt hơn thu hút nhiều đối tượng hơn. Cocktail trở nên phổ biến vào những năm 1980 và 1990 cùng với các thức uống vodka trái cây khác. Tên "Madras" đề cập đến tên cũ của Chennai, Ấn Độ, mặc dù mối liên hệ với thức uống không rõ ràng - nó có thể ám chỉ vải kẻ sọc Madras đầy màu sắc phổ biến vào những năm 1980.',
    },
    named_after: {
      en: 'Named after Madras (now Chennai), India, possibly referencing the colorful Madras plaid fabric that was popular in the 1980s when the drink emerged.',
      it: "Prende il nome da Madras (ora Chennai), India, possibilmente riferendosi al tessuto a quadri Madras colorato che era popolare negli anni '80 quando il drink emerse.",
      vi: 'Được đặt theo tên Madras (hiện là Chennai), Ấn Độ, có thể ám chỉ vải kẻ sọc Madras đầy màu sắc phổ biến vào những năm 1980 khi thức uống xuất hiện.',
    },
  },

  taste: {
    profile: ['fruity', 'tart', 'sweet', 'refreshing'],
    description: {
      en: "A delightful balance of tart cranberry and sweet orange with a smooth vodka base. More approachable than the Cape Codder, with the orange juice rounding out the cranberry's tartness while maintaining refreshing character.",
      it: "Un delizioso equilibrio di mirtillo rosso aspro e arancia dolce con una base morbida di vodka. Più accessibile del Cape Codder, con il succo d'arancia che arrotonda l'acidità del mirtillo rosso mantenendo il carattere rinfrescante.",
      vi: 'Sự cân bằng tuyệt vời giữa nam việt quất chua và cam ngọt với vodka mượt mà. Dễ tiếp cận hơn Cape Codder, với nước cam làm tròn vị chua của nam việt quất trong khi duy trì đặc tính tươi mát.',
    },
    first_impression: {
      en: 'Sweet orange upfront with cranberry tartness following',
      it: 'Arancia dolce in primo piano con acidità di mirtillo rosso che segue',
      vi: 'Cam ngọt ở phía trước với vị chua nam việt quất theo sau',
    },
    finish: {
      en: 'Balanced fruity finish with both orange sweetness and cranberry tang',
      it: "Finale fruttato equilibrato con dolcezza d'arancia e piccantezza di mirtillo rosso",
      vi: 'Kết thúc trái cây cân bằng với cả vị ngọt cam và vị chua nam việt quất',
    },
    balance: {
      en: 'Perfectly balanced between sweet and tart - orange softens the cranberry without making it cloying',
      it: "Perfettamente bilanciato tra dolce e aspro - l'arancia ammorbidisce il mirtillo rosso senza renderlo stucchevole",
      vi: 'Cân bằng hoàn hảo giữa ngọt và chua - cam làm dịu nam việt quất mà không làm nó ngọt gắt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'brunch'],
    occasions: ['casual', 'brunch', 'poolside', 'beach', 'happy_hour'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs well with brunch dishes, fruit salads, light sandwiches, and appetizers. Excellent with grilled chicken, shrimp cocktail, and cheese plates.',
      it: 'Si abbina bene con piatti da brunch, insalate di frutta, panini leggeri e antipasti. Eccellente con pollo alla griglia, cocktail di gamberetti e taglieri di formaggi.',
      vi: 'Kết hợp tốt với các món brunch, salad trái cây, bánh sandwich nhẹ và món khai vị. Tuyệt vời với gà nướng, cocktail tôm và đĩa phô mai.',
    },
    ideal_for: {
      en: 'Perfect for those who find the Cape Codder too tart but still want a fruity, refreshing cocktail. Great for casual gatherings and anyone seeking an easy-drinking, crowd-pleasing vodka drink.',
      it: 'Perfetto per chi trova il Cape Codder troppo aspro ma vuole ancora un cocktail fruttato e rinfrescante. Ottimo per incontri informali e per chiunque cerchi un drink alla vodka facile da bere e che piaccia a tutti.',
      vi: 'Hoàn hảo cho những ai thấy Cape Codder quá chua nhưng vẫn muốn cocktail trái cây, tươi mát. Tuyệt vời cho các buổi họp mặt thân mật và bất kỳ ai tìm kiếm thức uống vodka dễ uống, được nhiều người yêu thích.',
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
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: {
        en: 'Cranberry juice',
        it: 'Succo di mirtillo rosso',
        vi: 'Nước ép nam việt quất',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka over ice, add cranberry juice and orange juice. Stir gently to combine. Garnish with an orange slice or lime wedge.',
    it: "Riempire un bicchiere highball con ghiaccio. Versare la vodka sul ghiaccio, aggiungere succo di mirtillo rosso e succo d'arancia. Mescolare delicatamente per combinare. Guarnire con una fetta d'arancia o uno spicchio di lime.",
    vi: 'Đổ đầy ly highball với đá. Rót vodka lên đá, thêm nước ép nam việt quất và nước cam. Khuấy nhẹ nhàng để trộn đều. Trang trí với một lát cam hoặc lát chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice or lime wedge',
    it: "Fetta d'arancia o spicchio di lime",
    vi: 'Lát cam hoặc lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['fruity', 'tart', 'sweet', 'refreshing'],

  abv_estimate: 9,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['casual', 'brunch', 'poolside', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['cape-codder', 'sea-breeze', 'bay-breeze'],

  notes_for_staff:
    'Use freshly squeezed orange juice for best results. Ratio of cranberry to orange can be adjusted to taste - some prefer equal parts. 100% cranberry juice recommended, not cocktail.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1238/madras',
    notes: 'Popular 1980s variation of the Cape Codder.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
