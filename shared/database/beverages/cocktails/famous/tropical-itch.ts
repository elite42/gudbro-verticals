/**
 * Famous Cocktails: Tropical Itch
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tropicalItch: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
  slug: 'tropical-itch',
  stable_key: 'tropical-itch-tiki-tropical-famous-2025',

  name: {
    en: 'Tropical Itch',
    it: 'Prurito Tropicale',
    vi: 'Tropical Itch',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'bourbon', 'exotic', 'theatrical'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A unique tiki cocktail combining rum and bourbon with tropical juices and passion fruit. Famously served with a bamboo back scratcher as a swizzle stick, the Tropical Itch offers a complex blend of Caribbean and American spirits in a theatrical presentation.',
    it: 'Un cocktail tiki unico che combina rum e bourbon con succhi tropicali e frutto della passione. Famosamente servito con un grattaschiena di bambù come bastoncino mescolatore, il Prurito Tropicale offre una miscela complessa di spiriti caraibici e americani in una presentazione teatrale.',
    vi: 'Một loại cocktail tiki độc đáo kết hợp rum và bourbon với nước ép nhiệt đới và chanh dây. Được phục vụ nổi tiếng với cái gãi lưng tre làm que khuấy, Tropical Itch mang đến sự pha trộn phức tạp của rượu mạnh Caribbean và Mỹ trong cách trình bày sân khấu.',
  },

  history: {
    created_year: '1950s',
    origin: {
      city: 'Honolulu',
      bar: 'Hawaiian Village Hotel',
      country: 'USA',
    },
    creator: {
      name: 'Harry Yee',
      profession: 'bartender',
    },
    story: {
      en: 'The Tropical Itch was created in the 1950s by legendary Hawaiian bartender Harry Yee at the Hawaiian Village Hotel in Waikiki, Honolulu. Yee, who is also credited with creating the Blue Hawaii and being the first to garnish drinks with orchids and paper umbrellas, designed this drink to be both delicious and memorable. The signature element is the bamboo back scratcher that serves as the swizzle stick - a playful nod to the drink\'s name and a theatrical touch that made it instantly recognizable. The unusual combination of rum and bourbon was innovative for its time, creating a bridge between tiki culture and classic American cocktails.',
      it: 'Il Prurito Tropicale fu creato negli anni \'50 dal leggendario barman hawaiano Harry Yee all\'Hawaiian Village Hotel a Waikiki, Honolulu. Yee, a cui è anche attribuita la creazione del Blue Hawaii e di essere il primo a guarnire i drink con orchidee e ombrellini di carta, progettò questa bevanda per essere sia deliziosa che memorabile. L\'elemento distintivo è il grattaschiena di bambù che funge da bastoncino mescolatore - un cenno giocoso al nome della bevanda e un tocco teatrale che la rese immediatamente riconoscibile. L\'insolita combinazione di rum e bourbon era innovativa per il suo tempo, creando un ponte tra la cultura tiki e i cocktail americani classici.',
      vi: 'Tropical Itch được tạo ra vào những năm 1950 bởi bartender Hawaii huyền thoại Harry Yee tại Hawaiian Village Hotel ở Waikiki, Honolulu. Yee, người cũng được ghi nhận là người tạo ra Blue Hawaii và là người đầu tiên trang trí đồ uống bằng hoa lan và ô giấy, đã thiết kế thức uống này vừa ngon vừa đáng nhớ. Yếu tố đặc trưng là cái gãi lưng tre đóng vai trò là que khuấy - một gật đầu vui tươi với tên của thức uống và một nét sân khấu khiến nó có thể nhận ra ngay lập tức. Sự kết hợp khác thường của rum và bourbon là đổi mới cho thời đại của nó, tạo ra cầu nối giữa văn hóa tiki và cocktail Mỹ cổ điển.',
    },
    named_after: {
      en: 'Named for the bamboo back scratcher used as a swizzle stick, playfully suggesting the drink is so good it gives you an irresistible "itch" to have another.',
      it: 'Prende il nome dal grattaschiena di bambù usato come bastoncino mescolatore, suggerendo giocosamente che la bevanda è così buona da darti un "prurito" irresistibile di averne un\'altra.',
      vi: 'Được đặt theo tên cái gãi lưng tre được sử dụng làm que khuấy, vui vẻ gợi ý thức uống ngon đến mức khiến bạn có "cơn ngứa" không thể cưỡng lại để uống thêm.',
    },
  },

  taste: {
    profile: ['fruity', 'tropical', 'complex'],
    description: {
      en: 'Complex and layered with tropical passion fruit, citrus brightness, rum sweetness, and bourbon depth. The combination of rum and bourbon creates an unusual but harmonious flavor profile that\'s both exotic and familiar. Rich, fruity, and surprisingly sophisticated.',
      it: 'Complesso e stratificato con frutto della passione tropicale, luminosità agrumata, dolcezza del rum e profondità del bourbon. La combinazione di rum e bourbon crea un profilo di sapore insolito ma armonioso che è allo stesso tempo esotico e familiare. Ricco, fruttato e sorprendentemente sofisticato.',
      vi: 'Phức tạp và nhiều lớp với chanh dây nhiệt đới, độ tươi sáng của cam quýt, vị ngọt của rum và chiều sâu của bourbon. Sự kết hợp của rum và bourbon tạo ra một hồ sơ hương vị khác thường nhưng hài hòa vừa kỳ lạ vừa quen thuộc. Đậm đà, trái cây và tinh tế đáng ngạc nhiên.',
    },
    first_impression: {
      en: 'Bright tropical passion fruit and citrus with underlying bourbon oakiness',
      it: 'Luminoso frutto della passione tropicale e agrumi con sottostante note di rovere del bourbon',
      vi: 'Chanh dây nhiệt đới tươi sáng và cam quýt với hương gỗ sồi bourbon bên dưới',
    },
    finish: {
      en: 'Long, complex finish with tropical fruit, bourbon warmth, and subtle spice',
      it: 'Finale lungo e complesso con frutta tropicale, calore del bourbon e spezie sottili',
      vi: 'Kết thúc dài, phức tạp với trái cây nhiệt đới, sự ấm áp của bourbon và gia vị tinh tế',
    },
    balance: {
      en: 'Expertly balanced between tropical sweetness and bourbon complexity - unique flavor profile unlike typical tiki drinks',
      it: 'Sapientemente bilanciato tra dolcezza tropicale e complessità del bourbon - profilo di sapore unico a differenza dei tipici drink tiki',
      vi: 'Cân bằng điêu luyện giữa vị ngọt nhiệt đới và độ phức tạp của bourbon - hồ sơ hương vị độc đáo không giống đồ uống tiki thông thường',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['tiki_bar', 'special_occasion', 'cocktail_appreciation', 'hawaiian_theme'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Pairs excellently with Hawaiian poke, teriyaki dishes, grilled pineapple, kalua pork, or tropical fruit platters. Also complements American BBQ surprisingly well due to the bourbon component.',
      it: 'Si abbina eccellentemente con poke hawaiano, piatti teriyaki, ananas alla griglia, kalua pork o piatti di frutta tropicale. Complementa sorprendentemente bene anche il BBQ americano grazie al componente bourbon.',
      vi: 'Kết hợp tuyệt vời với poke Hawaii, các món teriyaki, dứa nướng, thịt lợn kalua hoặc đĩa trái cây nhiệt đới. Cũng bổ sung cho BBQ Mỹ một cách đáng ngạc nhiên nhờ thành phần bourbon.',
    },
    ideal_for: {
      en: 'Perfect for tiki enthusiasts and bourbon lovers seeking something unique. Ideal for Hawaiian-themed parties or those who appreciate theatrical cocktail presentation. Great for adventurous drinkers who enjoy complex, unexpected flavor combinations.',
      it: 'Perfetto per gli appassionati di tiki e gli amanti del bourbon che cercano qualcosa di unico. Ideale per feste a tema hawaiano o per chi apprezza la presentazione teatrale dei cocktail. Ottimo per bevitori avventurosi che amano combinazioni di sapori complesse e inaspettate.',
      vi: 'Hoàn hảo cho những người đam mê tiki và người yêu bourbon tìm kiếm thứ gì đó độc đáo. Lý tưởng cho các bữa tiệc chủ đề Hawaii hoặc những ai đánh giá cao cách trình bày cocktail sân khấu. Tuyệt vời cho những người uống phiêu lưu thích sự kết hợp hương vị phức tạp, bất ngờ.',
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
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Bourbon whiskey', it: 'Whiskey bourbon', vi: 'Bourbon whiskey' },
    },
    {
      ingredient_id: 'ING_PASSION_FRUIT_SYRUP',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Passion fruit syrup', it: 'Sciroppo di frutto della passione', vi: 'Siro chanh dây' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước cốt chanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a tall tiki glass or hurricane glass filled with crushed ice. Garnish with pineapple wedge, cherry, and the signature bamboo back scratcher swizzle stick.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un bicchiere tiki alto o hurricane pieno di ghiaccio tritato. Guarnire con spicchio di ananas, ciliegina e il caratteristico bastoncino mescolatore grattaschiena di bambù.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh hoàn toàn. Lọc vào ly tiki cao hoặc ly hurricane đầy đá nghiền. Trang trí với miếng dứa, cherry và que khuấy gãi lưng tre đặc trưng.',
  },

  glass: 'Tiki glass / Hurricane glass',

  garnish: {
    en: 'Pineapple wedge, maraschino cherry, and bamboo back scratcher',
    it: 'Spicchio di ananas, ciliegina al maraschino e grattaschiena di bambù',
    vi: 'Miếng dứa, cherry maraschino và cái gãi lưng tre',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK', 'ING_BOURBON'],

  flavor_profile: ['fruity', 'tropical', 'complex'],

  abv_estimate: 15,

  calories_estimate: 260,

  difficulty: 'intermediate',

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
  occasion_tags: ['tiki_bar', 'special_occasion', 'cocktail_appreciation'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['virgin-tropical-itch'],

  notes_for_staff: 'Created by Harry Yee, inventor of Blue Hawaii. Signature bamboo back scratcher is essential for authentic presentation. Unusual rum-bourbon combo - explain to curious guests. Use fresh juices for best results. Theatrical presentation makes great conversation starter.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/4686/tropical-itch',
    note: 'Classic Harry Yee creation from Hawaiian Village Hotel, Honolulu.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
