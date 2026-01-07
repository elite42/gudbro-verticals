/**
 * Famous Cocktails: Rum and Coke
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const rumAndCoke: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3b4c5d6-7890-1234-a789-123456789012',
  slug: 'rum-and-coke',
  stable_key: 'e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',

  name: {
    en: 'Rum and Coke',
    it: 'Rum and Coke',
    vi: 'Rum and Coke',
    ko: '럼 앤 콕',
    ja: 'ラム・アンド・コーク',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'rum', 'cola', 'simple', 'classic', 'cuba'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "One of the world's most popular cocktails, combining rum with cola and lime. Simple yet timeless, the Rum and Coke (or Cuba Libre with lime) is the ultimate crowd-pleaser and a staple in bars worldwide.",
    it: 'Uno dei cocktail più popolari al mondo, che combina rum con cola e lime. Semplice ma senza tempo, il Rum and Coke (o Cuba Libre con lime) è il piacere della folla per eccellenza e un punto fermo nei bar di tutto il mondo.',
    vi: 'Một trong những cocktail phổ biến nhất thế giới, kết hợp rum với cola và chanh. Đơn giản nhưng vượt thời gian, Rum and Coke (hoặc Cuba Libre với chanh) là thức uống được nhiều người yêu thích nhất và là thức uống chính ở các quán bar trên toàn thế giới.',
  },

  history: {
    created_year: '1900',
    origin: {
      city: 'Havana',
      country: 'Cuba',
    },
    story: {
      en: 'The Rum and Coke emerged around 1900 in Havana, Cuba, shortly after Coca-Cola arrived in the Caribbean. The drink gained its patriotic name "Cuba Libre" (Free Cuba) during the Spanish-American War when American soldiers mixed local rum with the newly available Coca-Cola and toasted to Cuba\'s independence. The addition of lime juice transforms it into the Cuba Libre, though many call any rum and cola combination by this name. It became one of the most ordered drinks worldwide and remains a symbol of Cuban-American cultural exchange.',
      it: "Il Rum and Coke emerse intorno al 1900 all'Avana, Cuba, poco dopo l'arrivo della Coca-Cola nei Caraibi. Il drink ottenne il suo nome patriottico \"Cuba Libre\" (Cuba Libera) durante la guerra ispano-americana quando i soldati americani mescolavano rum locale con la Coca-Cola appena disponibile e brindavano all'indipendenza di Cuba. L'aggiunta di succo di lime lo trasforma nel Cuba Libre, anche se molti chiamano qualsiasi combinazione di rum e cola con questo nome. Divenne una delle bevande più ordinate al mondo e rimane un simbolo dello scambio culturale cubano-americano.",
      vi: 'Rum and Coke xuất hiện vào khoảng năm 1900 ở Havana, Cuba, ngay sau khi Coca-Cola đến vùng Caribe. Thức uống có tên yêu nước "Cuba Libre" (Cuba Tự do) trong Chiến tranh Tây Ban Nha-Mỹ khi binh lính Mỹ trộn rum địa phương với Coca-Cola mới có và chúc mừng độc lập của Cuba. Việc thêm nước cốt chanh biến nó thành Cuba Libre, mặc dù nhiều người gọi bất kỳ sự kết hợp rum và cola nào bằng tên này. Nó trở thành một trong những thức uống được gọi nhiều nhất trên toàn thế giới và vẫn là biểu tượng của sự trao đổi văn hóa Cuba-Mỹ.',
    },
    named_after: {
      en: 'The patriotic name "Cuba Libre" (Free Cuba) refers to Cuba\'s independence movement. Without lime, it\'s simply called "Rum and Coke."',
      it: 'Il nome patriottico "Cuba Libre" (Cuba Libera) si riferisce al movimento di indipendenza di Cuba. Senza lime, è semplicemente chiamato "Rum and Coke."',
      vi: 'Cái tên yêu nước "Cuba Libre" (Cuba Tự do) ám chỉ phong trào độc lập của Cuba. Không có chanh, nó đơn giản được gọi là "Rum and Coke."',
    },
  },

  taste: {
    profile: ['sweet', 'cola', 'caramel', 'lime'],
    description: {
      en: "Sweet cola flavor with rum's vanilla and caramel notes, brightened by fresh lime. The rum adds warmth and complexity to the cola's sweetness, while lime provides a crucial citrus balance that elevates it beyond a simple mixer.",
      it: 'Sapore dolce di cola con note di vaniglia e caramello del rum, illuminato dal lime fresco. Il rum aggiunge calore e complessità alla dolcezza della cola, mentre il lime fornisce un equilibrio di agrumi cruciale che lo eleva oltre un semplice mixer.',
      vi: 'Hương vị cola ngọt với hương vani và caramel của rum, được làm sáng bởi chanh tươi. Rum thêm hơi ấm và sự phức tạp cho vị ngọt của cola, trong khi chanh cung cấp sự cân bằng cam quýt quan trọng nâng nó lên trên một chất pha trộn đơn giản.',
    },
    first_impression: {
      en: 'Sweet cola with rum warmth and bright lime',
      it: 'Cola dolce con calore di rum e lime brillante',
      vi: 'Cola ngọt với hơi ấm rum và chanh tươi sáng',
    },
    finish: {
      en: 'Sweet cola finish with lingering rum spice and citrus',
      it: 'Finale di cola dolce con spezie di rum persistenti e agrumi',
      vi: 'Kết thúc cola ngọt với vị cay rum và cam quýt kéo dài',
    },
    balance: {
      en: 'The lime is essential for balance - without it, overly sweet; with it, perfectly refreshing',
      it: "Il lime è essenziale per l'equilibrio - senza di esso, troppo dolce; con esso, perfettamente rinfrescante",
      vi: 'Chanh là thiết yếu cho sự cân bằng - không có nó, quá ngọt; có nó, hoàn hảo tươi mát',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'night'],
    occasions: ['casual', 'party', 'beach', 'social'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs excellently with Cuban food, burgers, pizza, BBQ, fried foods, and casual pub fare. Perfect with spicy foods as the sweetness balances heat.',
      it: 'Si abbina eccellentemente con cibo cubano, hamburger, pizza, BBQ, cibi fritti e piatti casual da pub. Perfetto con cibi piccanti poiché la dolcezza bilancia il calore.',
      vi: 'Kết hợp tuyệt vời với đồ ăn Cuba, burger, pizza, BBQ, đồ chiên và đồ ăn pub thông thường. Hoàn hảo với đồ ăn cay vì vị ngọt cân bằng độ nóng.',
    },
    ideal_for: {
      en: 'Perfect for anyone seeking an easy, universally appealing drink. Great for casual settings, parties, or beach bars. Ideal for those who want something simple that tastes good without complexity.',
      it: 'Perfetto per chiunque cerchi un drink facile e universalmente gradito. Ottimo per ambienti informali, feste o bar sulla spiaggia. Ideale per chi vuole qualcosa di semplice che abbia un buon sapore senza complessità.',
      vi: 'Hoàn hảo cho bất kỳ ai tìm kiếm thức uống dễ dàng, hấp dẫn phổ quát. Tuyệt vời cho môi trường thân mật, tiệc tùng hoặc quán bar bãi biển. Lý tưởng cho những ai muốn thứ gì đó đơn giản ngon mà không phức tạp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHITE_RUM',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_COCA_COLA',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Coca-Cola', it: 'Coca-Cola', vi: 'Coca-Cola' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước cốt chanh tươi',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour rum over ice. Squeeze fresh lime wedge into glass and drop it in. Top with Coca-Cola. Stir gently once.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare il rum sul ghiaccio. Spremere uno spicchio di lime fresco nel bicchiere e lasciarlo cadere. Completare con Coca-Cola. Mescolare delicatamente una volta.',
    vi: 'Đổ đầy ly highball với đá. Rót rum lên đá. Vắt lát chanh tươi vào ly và thả vào. Thêm Coca-Cola lên trên. Khuấy nhẹ một lần.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHITE_RUM'],

  flavor_profile: ['sweet', 'cola', 'caramel', 'lime'],

  abv_estimate: 10,

  calories_estimate: 185,

  difficulty: 'easy',

  prep_time_seconds: 25,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'caffeine_sensitivity'],
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
  occasion_tags: ['casual', 'party', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['cuba-libre', 'captain-and-coke', 'bacardi-and-coke'],

  notes_for_staff:
    "With lime = Cuba Libre. Without lime = Rum and Coke. Use Mexican Coke (cane sugar) for best flavor if available. Fresh lime is crucial - don't skip it. Works with white, gold, or dark rum.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 98,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1246/cuba-libre',
    notes: "Born in Havana circa 1900, one of world's most popular cocktails.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
