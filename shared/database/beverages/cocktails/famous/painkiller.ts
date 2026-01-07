/**
 * Famous Cocktails: Painkiller
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const painkiller: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '8f7a2c3d-4e5b-6c7d-8e9f-0a1b2c3d4e5f',
  slug: 'painkiller',
  stable_key: 'painkiller_famous_tiki_tropical_cocktail',

  name: {
    en: 'Painkiller',
    it: 'Painkiller',
    vi: 'Painkiller',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'creamy', 'sweet'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Painkiller is the signature cocktail of the British Virgin Islands, combining dark rum with pineapple juice, orange juice, and coconut cream. This creamy tropical drink topped with nutmeg is the ultimate island escape in a glass.',
    it: "Il Painkiller è il cocktail emblematico delle Isole Vergini Britanniche, che combina rum scuro con succo di ananas, succo di arancia e crema di cocco. Questa bevanda tropicale e cremosa guarnita con noce moscata è la fuga definitiva verso l'isola in un bicchiere.",
    vi: 'Painkiller là cocktail đặc trưng của Quần đảo Virgin thuộc Anh, kết hợp rum đen với nước ananás, nước cam và kem dừa. Thức uống nhiệt đới béo ngậy này được phủ nhục đậu khấu là sự thoát ly hoàn hảo đến hòn đảo trong ly.',
  },

  history: {
    created_year: '1970',
    origin: {
      city: 'White Bay',
      bar: 'Soggy Dollar Bar',
      country: 'British Virgin Islands',
    },
    creator: {
      name: 'Daphne Henderson',
      profession: 'bar owner',
    },
    story: {
      en: 'The Painkiller was created in the 1970s by Daphne Henderson at the Soggy Dollar Bar on Jost Van Dyke in the British Virgin Islands. The bar got its name because customers had to swim to shore to reach it, arriving with soggy dollar bills. In 1989, Pusser\'s Rum trademarked the name "Painkiller" and established the official recipe. The drink became so popular that it spawned numerous variations and inspired tropical cocktail culture worldwide.',
      it: 'Il Painkiller fu creato negli anni \'70 da Daphne Henderson al Soggy Dollar Bar su Jost Van Dyke nelle Isole Vergini Britanniche. Il bar prese il nome perché i clienti dovevano nuotare fino a riva per raggiungerlo, arrivando con banconote bagnate. Nel 1989, Pusser\'s Rum registrò il marchio "Painkiller" e stabilì la ricetta ufficiale. La bevanda divenne così popolare da generare numerose varianti e ispirare la cultura dei cocktail tropicali in tutto il mondo.',
      vi: 'Painkiller được tạo ra vào những năm 1970 bởi Daphne Henderson tại Soggy Dollar Bar trên Jost Van Dyke ở Quần đảo Virgin thuộc Anh. Quán bar có tên như vậy vì khách hàng phải bơi vào bờ để đến được, mang theo những tờ đô la ướt sũng. Năm 1989, Pusser\'s Rum đã đăng ký nhãn hiệu tên "Painkiller" và thiết lập công thức chính thức. Thức uống trở nên phổ biến đến mức tạo ra nhiều biến thể và truyền cảm hứng cho văn hóa cocktail nhiệt đới trên toàn thế giới.',
    },
    named_after: {
      en: 'Named for its reputation as a hangover cure and the perfect remedy for any ailment while on vacation in paradise.',
      it: 'Prende il nome dalla sua reputazione come cura per i postumi di una sbornia e il rimedio perfetto per qualsiasi disturbo durante le vacanze in paradiso.',
      vi: 'Được đặt tên theo danh tiếng là thuốc chữa say rượu và phương thuốc hoàn hảo cho mọi bệnh tật khi đang nghỉ dưỡng ở thiên đường.',
    },
  },

  taste: {
    profile: ['tropical', 'creamy', 'sweet'],
    description: {
      en: 'Rich and indulgent with layers of tropical fruit flavors. The Painkiller balances pineapple brightness with orange tang, coconut creaminess, and the deep, warming notes of aged rum, finished with aromatic nutmeg.',
      it: "Ricco e indulgente con strati di sapori di frutta tropicale. Il Painkiller bilancia la brillantezza dell'ananas con il sapore aspro dell'arancia, la cremosità del cocco e le note profonde e calde del rum invecchiato, finito con noce moscata aromatica.",
      vi: 'Đậm đà và nuông chiều với nhiều lớp hương vị trái cây nhiệt đới. Painkiller cân bằng độ tươi sáng của ananás với vị chua của cam, độ béo ngậy của dừa và hương vị sâu, ấm áp của rum già, hoàn thiện với nhục đậu khấu thơm.',
    },
    first_impression: {
      en: 'Sweet tropical fruits and coconut cream hit immediately, with rum warmth building underneath',
      it: 'Frutti tropicali dolci e crema di cocco colpiscono immediatamente, con il calore del rum che cresce sotto',
      vi: 'Trái cây nhiệt đới ngọt và kem dừa xuất hiện ngay lập tức, với sự ấm áp của rum nổi lên bên dưới',
    },
    finish: {
      en: 'Long, creamy finish with lingering nutmeg spice and rum warmth',
      it: 'Finale lungo e cremoso con spezie di noce moscata persistenti e calore del rum',
      vi: 'Kết thúc dài, béo ngậy với gia vị nhục đậu khấu kéo dài và sự ấm áp của rum',
    },
    balance: {
      en: 'Perfectly balanced between sweet tropical juices and rich coconut cream, with enough rum to keep it interesting',
      it: 'Perfettamente bilanciato tra succhi tropicali dolci e crema di cocco ricca, con abbastanza rum per mantenerlo interessante',
      vi: 'Cân bằng hoàn hảo giữa nước ép nhiệt đới ngọt và kem dừa đậm đà, với đủ rum để giữ cho nó thú vị',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'vacation', 'summer_gathering'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Caribbean jerk chicken, fish tacos, coconut shrimp, or tropical fruit platters. Also excellent with spicy foods as the cream helps balance the heat.',
      it: 'Perfetto con pollo jerk caraibico, tacos di pesce, gamberetti al cocco o vassoi di frutta tropicale. Eccellente anche con cibi piccanti poiché la crema aiuta a bilanciare il calore.',
      vi: 'Hoàn hảo với gà jerk Caribbean, tacos cá, tôm dừa hoặc đĩa trái cây nhiệt đới. Cũng tuyệt vời với đồ ăn cay vì kem giúp cân bằng độ nóng.',
    },
    ideal_for: {
      en: 'Perfect for beach lovers and tropical cocktail enthusiasts. Ideal for anyone seeking a vacation vibe or looking to escape to an island paradise. Great for those who enjoy creamy, dessert-like cocktails.',
      it: "Perfetto per gli amanti della spiaggia e gli appassionati di cocktail tropicali. Ideale per chiunque cerchi un'atmosfera di vacanza o voglia fuggire in un paradiso insulare. Ottimo per chi ama i cocktail cremosi simili ai dessert.",
      vi: 'Hoàn hảo cho những người yêu biển và những người đam mê cocktail nhiệt đới. Lý tưởng cho bất kỳ ai tìm kiếm không khí nghỉ dưỡng hoặc muốn trốn đến thiên đường hòn đảo. Tuyệt vời cho những ai thích cocktail béo ngậy giống món tráng miệng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 60, unit: 'ml' },
      display_name: {
        en: "Dark rum (Pusser's)",
        it: "Rum scuro (Pusser's)",
        vi: "Rum đen (Pusser's)",
      },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ananás' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Orange juice', it: "Succo d'arancia", vi: 'Nước cam' },
    },
    {
      ingredient_id: 'ING_COCONUT_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cream of coconut', it: 'Crema di cocco', vi: 'Kem dừa' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a hurricane glass filled with crushed ice. Garnish generously with freshly grated nutmeg on top.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere hurricane pieno di ghiaccio tritato. Guarnire generosamente con noce moscata appena grattugiata sopra.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly hurricane đầy đá viên nghiền. Trang trí hào phóng với nhục đậu khấu mới xay lên trên.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Freshly grated nutmeg, pineapple wedge, orange slice',
    it: "Noce moscata appena grattugiata, spicchio di ananas, fetta d'arancia",
    vi: 'Nhục đậu khấu mới xay, nhánh ananás, lát cam',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK'],

  flavor_profile: ['tropical', 'creamy', 'sweet'],

  abv_estimate: 12,

  calories_estimate: 320,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['coconut', 'sulphites'],
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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['beach', 'pool_party', 'vacation', 'summer_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['painkiller-2', 'painkiller-3', 'painkiller-4'],

  notes_for_staff:
    "Original recipe calls for Pusser's Navy Rum. Ratios vary: Painkiller #2 (2oz rum), #3 (3oz rum), #4 (4oz rum). Always use freshly grated nutmeg, not pre-ground. Crushed ice is essential for proper dilution.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://pussersrum.com/painkiller-cocktail/',
    notes:
      "Official Pusser's Rum recipe. Historical information from Soggy Dollar Bar and Caribbean cocktail sources.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
