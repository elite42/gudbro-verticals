/**
 * Famous Cocktails: Bahama Mama
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bahamaMama: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f8a2c1d4-7b3e-4f9a-8c2d-1e5f6a7b8c9d',
  slug: 'bahama-mama',
  stable_key: 'bahama-mama-tiki-tropical-famous-2025',

  name: {
    en: 'Bahama Mama',
    it: 'Bahama Mama',
    vi: 'Bahama Mama',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'fruity', 'party'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A vibrant tropical cocktail combining rum, coconut liqueur, and tropical fruit juices. The Bahama Mama is a vacation in a glass, delivering sweet, fruity flavors with a strong rum backbone that transports you straight to the Caribbean beaches.',
    it: 'Un cocktail tropicale vibrante che combina rum, liquore al cocco e succhi di frutta tropicale. Il Bahama Mama è una vacanza in un bicchiere, offrendo sapori dolci e fruttati con una forte base di rum che ti trasporta direttamente sulle spiagge caraibiche.',
    vi: 'Một loại cocktail nhiệt đới sôi động kết hợp rum, rượu mùi dừa và nước ép trái cây nhiệt đới. Bahama Mama là kỳ nghỉ trong ly, mang đến hương vị ngọt ngào, trái cây với nền tảng rum mạnh mẽ đưa bạn thẳng đến bãi biển Caribbean.',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Nassau',
      bar: 'Bahamas Beach Bars',
      country: 'Bahamas',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Bahama Mama emerged in the 1960s during the golden age of tiki culture, created in the beach bars of Nassau, Bahamas. Designed to appeal to tourists seeking tropical paradise in a glass, this cocktail became synonymous with Caribbean vacation culture. The drink combines multiple rums with tropical juices and coconut, creating a potent yet dangerously drinkable concoction that embodies the carefree island lifestyle.',
      it: "Il Bahama Mama emerse negli anni '60 durante l'età d'oro della cultura tiki, creato nei bar sulla spiaggia di Nassau, Bahamas. Progettato per attrarre i turisti in cerca di un paradiso tropicale in un bicchiere, questo cocktail divenne sinonimo della cultura vacanziera caraibica. La bevanda combina più rum con succhi tropicali e cocco, creando una miscela potente ma pericolosamente bevibile che incarna lo stile di vita spensierato dell'isola.",
      vi: 'Bahama Mama xuất hiện vào những năm 1960 trong thời kỳ hoàng kim của văn hóa tiki, được tạo ra tại các quán bar bãi biển Nassau, Bahamas. Được thiết kế để thu hút khách du lịch tìm kiếm thiên đường nhiệt đới trong ly, cocktail này trở thành biểu tượng của văn hóa nghỉ dưỡng Caribbean. Thức uống kết hợp nhiều loại rum với nước ép nhiệt đới và dừa, tạo ra hỗn hợp mạnh mẽ nhưng dễ uống nguy hiểm, thể hiện lối sống đảo vô tư.',
    },
    named_after: {
      en: 'Named after the Bahamas islands and the warm, welcoming nature of Caribbean mothers (mama), representing the nurturing, tropical hospitality of the region.',
      it: "Prende il nome dalle isole Bahamas e dalla natura calda e accogliente delle mamme caraibiche, rappresentando l'ospitalità tropicale e nutriente della regione.",
      vi: 'Được đặt theo tên quần đảo Bahamas và bản chất ấm áp, hiếu khách của các bà mẹ Caribbean (mama), đại diện cho lòng hiếu khách nhiệt đới, nuôi dưỡng của khu vực.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'tropical'],
    description: {
      en: 'Sweet and tropical with layers of pineapple, coconut, and orange flavors. The dark rum provides depth while coffee liqueur adds subtle complexity. Refreshing and dangerously smooth.',
      it: 'Dolce e tropicale con strati di sapori di ananas, cocco e arancia. Il rum scuro fornisce profondità mentre il liquore al caffè aggiunge una sottile complessità. Rinfrescante e pericolosamente morbido.',
      vi: 'Ngọt và nhiệt đới với các lớp hương vị dứa, dừa và cam. Rum đen mang lại chiều sâu trong khi rượu mùi cà phê thêm sự phức tạp tinh tế. Sảng khoái và mượt mà nguy hiểm.',
    },
    first_impression: {
      en: 'Bright pineapple and orange burst with coconut creaminess',
      it: 'Esplosione di ananas luminoso e arancia con cremosità di cocco',
      vi: 'Vị dứa và cam tươi sáng bùng nổ với sự béo ngậy của dừa',
    },
    finish: {
      en: 'Long, warming rum finish with lingering coconut and coffee notes',
      it: 'Finale lungo e caldo di rum con note persistenti di cocco e caffè',
      vi: 'Kết thúc dài, ấm áp của rum với hương dừa và cà phê kéo dài',
    },
    balance: {
      en: 'Well-balanced sweetness with strong rum presence - tropical flavors dominate but the alcohol is clearly present',
      it: "Dolcezza ben bilanciata con forte presenza di rum - i sapori tropicali dominano ma l'alcol è chiaramente presente",
      vi: 'Vị ngọt cân bằng tốt với sự hiện diện mạnh mẽ của rum - hương vị nhiệt đới chiếm ưu thế nhưng rượu vẫn rõ ràng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'celebration', 'vacation', 'summer_gathering'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Perfect with Caribbean jerk chicken, fish tacos, grilled shrimp, tropical fruit platters, or coconut shrimp. Also pairs well with spicy foods as the sweetness balances heat.',
      it: 'Perfetto con pollo jerk caraibico, tacos di pesce, gamberi alla griglia, piatti di frutta tropicale o gamberi al cocco. Si abbina bene anche con cibi piccanti poiché la dolcezza bilancia il calore.',
      vi: 'Hoàn hảo với gà jerk Caribbean, tacos cá, tôm nướng, đĩa trái cây nhiệt đới hoặc tôm dừa. Cũng kết hợp tốt với đồ ăn cay vì vị ngọt cân bằng độ nóng.',
    },
    ideal_for: {
      en: 'Perfect for beach parties, poolside relaxation, and tropical-themed celebrations. Ideal for those who love sweet, fruity cocktails with a strong kick. A crowd-pleaser at summer gatherings.',
      it: 'Perfetto per feste in spiaggia, relax a bordo piscina e celebrazioni a tema tropicale. Ideale per chi ama i cocktail dolci e fruttati con un forte impatto. Un successo garantito durante gli incontri estivi.',
      vi: 'Hoàn hảo cho tiệc bãi biển, thư giãn bên hồ bơi và lễ kỷ niệm chủ đề nhiệt đới. Lý tưởng cho những ai yêu thích cocktail ngọt ngào, trái cây với độ mạnh cao. Món ưa thích của đám đông tại các buổi họp mặt mùa hè.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_RUM_COCONUT',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Coconut rum', it: 'Rum al cocco', vi: 'Rum dừa' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Coffee liqueur', it: 'Liquore al caffè', vi: 'Rượu mùi cà phê' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ép dứa' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Orange juice', it: "Succo d'arancia", vi: 'Nước cam' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a hurricane glass filled with fresh ice. Garnish with pineapple wedge and maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere hurricane pieno di ghiaccio fresco. Guarnire con spicchio di ananas e ciliegina al maraschino.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh hoàn toàn. Lọc vào ly hurricane đầy đá tươi. Trang trí với miếng dứa và cherry maraschino.',
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
  base_spirits: ['ING_RUM_DARK', 'ING_RUM_COCONUT'],

  flavor_profile: ['fruity', 'sweet', 'tropical'],

  abv_estimate: 15,

  calories_estimate: 320,

  difficulty: 'easy',

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
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['summer', 'spring'],
  occasion_tags: ['beach', 'pool_party', 'celebration', 'vacation'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['virgin-bahama-mama', 'bahama-mama-frozen'],

  notes_for_staff:
    'Use fresh pineapple juice for best flavor. Can be blended with ice for frozen version. Some recipes include grenadine for color - add 15ml if desired. Very popular poolside drink.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/bahama-mama/',
    notes: 'Classic tiki cocktail recipe. Variations exist across Caribbean bars.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
