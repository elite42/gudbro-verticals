/**
 * Famous Cocktails: Income Tax
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const incomeTax: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e2f3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b',
  slug: 'income-tax',
  stable_key: 'l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1',

  name: {
    en: 'Income Tax',
    it: 'Income Tax',
    vi: 'Income Tax',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'citrus', 'vermouth', 'prohibition-era'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A bittersweet Prohibition-era cocktail that lives up to its name - complex, slightly bitter, but ultimately rewarding. The Income Tax combines gin with vermouths, orange juice, and Angostura bitters for a sophisticated drink that\'s a close cousin to the Bronx cocktail.',
    it: 'Un cocktail amarognolo dell\'era del proibizionismo che è all\'altezza del suo nome - complesso, leggermente amaro, ma alla fine gratificante. L\'Income Tax combina gin con vermouth, succo d\'arancia e Angostura bitters per una bevanda sofisticata che è un cugino stretto del cocktail Bronx.',
    vi: 'Một cocktail đắng ngọt thời cấm rượu sống đúng với tên gọi của nó - phức tạp, hơi đắng, nhưng cuối cùng là bổ ích. Income Tax kết hợp gin với vermouth, nước cam và Angostura bitters cho một thức uống tinh tế là anh em họ gần của cocktail Bronx.',
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Income Tax cocktail emerged during the early 1920s, a time when both Prohibition and the modern income tax system were new and controversial in America. The cocktail first appeared in print in Harry Craddock\'s "The Savoy Cocktail Book" (1930), where it was described with dark humor as appropriate for the era\'s financial pressures. The name perfectly captured the bittersweet nature of both the drink and the tax that inspired it - complex, somewhat bitter, but necessary and ultimately satisfying. The cocktail is essentially a variation of the Bronx, with the addition of Angostura bitters adding extra complexity and bite. Like many Prohibition-era drinks, it fell into obscurity after the 1930s but has been rediscovered by modern bartenders who appreciate its clever name and sophisticated flavor profile.',
      it: 'Il cocktail Income Tax emerse all\'inizio degli anni \'20, un periodo in cui sia il proibizionismo che il moderno sistema fiscale sul reddito erano nuovi e controversi in America. Il cocktail apparve per la prima volta in stampa nel "The Savoy Cocktail Book" di Harry Craddock (1930), dove fu descritto con umorismo nero come appropriato per le pressioni finanziarie dell\'epoca. Il nome catturava perfettamente la natura amarognola sia della bevanda che della tassa che la ispirò - complessa, un po\' amara, ma necessaria e alla fine soddisfacente. Il cocktail è essenzialmente una variazione del Bronx, con l\'aggiunta di Angostura bitters che aggiungono extra complessità e morso. Come molte bevande dell\'era del proibizionismo, cadde nell\'oscurità dopo gli anni \'30 ma è stato riscoperto dai barman moderni che apprezzano il suo nome intelligente e il profilo aromatico sofisticato.',
      vi: 'Cocktail Income Tax xuất hiện vào đầu những năm 1920, thời điểm cả lệnh cấm rượu và hệ thống thuế thu nhập hiện đại đều mới và gây tranh cãi ở Mỹ. Cocktail lần đầu xuất hiện trên ấn phẩm trong "The Savoy Cocktail Book" của Harry Craddock (1930), nơi nó được mô tả với sự hài hước đen tối như phù hợp với áp lực tài chính của thời đại. Cái tên hoàn hảo nắm bắt bản chất đắng ngọt của cả thức uống và loại thuế truyền cảm hứng cho nó - phức tạp, hơi đắng, nhưng cần thiết và cuối cùng là thỏa mãn. Cocktail về cơ bản là một biến thể của Bronx, với việc thêm Angostura bitters thêm sự phức tạp và cắn. Giống như nhiều đồ uống thời cấm rượu, nó rơi vào quên lãng sau những năm 1930 nhưng đã được tái khám phá bởi các bartender hiện đại đánh giá cao cái tên thông minh và hương vị tinh tế của nó.',
    },
    named_after: {
      en: 'Named after the U.S. income tax, which became a significant burden on Americans in the 1920s. The bittersweet drink mirrors the complex feelings toward taxation.',
      it: 'Prende il nome dall\'imposta sul reddito americana, che divenne un peso significativo per gli americani negli anni \'20. La bevanda amarognola rispecchia i sentimenti complessi verso la tassazione.',
      vi: 'Được đặt theo tên thuế thu nhập Mỹ, trở thành gánh nặng đáng kể cho người Mỹ vào những năm 1920. Thức uống đắng ngọt phản ánh cảm xúc phức tạp đối với thuế.',
    },
  },

  taste: {
    profile: ['citrus', 'bitter', 'complex'],
    description: {
      en: 'Complex, bittersweet, and sophisticated. The Income Tax balances gin\'s botanicals with dual vermouths, fresh orange juice, and the distinctive spice of Angostura bitters. More bitter and complex than the Bronx, it\'s a drink for contemplation.',
      it: 'Complesso, amarognolo e sofisticato. L\'Income Tax bilancia i botanici del gin con doppi vermouth, succo d\'arancia fresco e la spezia distintiva degli Angostura bitters. Più amaro e complesso del Bronx, è una bevanda per la contemplazione.',
      vi: 'Phức tạp, đắng ngọt và tinh tế. Income Tax cân bằng thực vật của gin với vermouth kép, nước cam tươi và gia vị đặc trưng của Angostura bitters. Đắng hơn và phức tạp hơn Bronx, đây là thức uống để suy ngẫm.',
    },
    first_impression: {
      en: 'Orange juice brightness immediately followed by gin botanicals and aromatic bitters',
      it: 'Luminosità del succo d\'arancia immediatamente seguita da botanici del gin e bitter aromatici',
      vi: 'Độ sáng nước cam ngay lập tức theo sau là thực vật gin và bitter thơm',
    },
    finish: {
      en: 'Medium-long finish with lingering bitters, orange, and herbal vermouth complexity',
      it: 'Finale medio-lungo con bitter persistenti, arancia e complessità erbacee del vermouth',
      vi: 'Kết thúc trung bình-dài với bitter kéo dài, cam và sự phức tạp thảo mộc của vermouth',
    },
    balance: {
      en: 'The bitters add a distinctive bitter edge that balances the sweetness - complex and adult',
      it: 'I bitter aggiungono un distintivo bordo amaro che bilancia la dolcezza - complesso e adulto',
      vi: 'Bitter thêm cạnh đắng đặc trưng cân bằng vị ngọt - phức tạp và trưởng thành',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['aperitivo', 'sophisticated', 'contemplative', 'tax_season'],
    seasons: ['spring', 'autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with savory appetizers, olives, nuts, aged cheeses, and charcuterie. The bitterness cuts through rich foods beautifully. Also good with grilled vegetables and Mediterranean fare.',
      it: 'Si abbina bene con antipasti salati, olive, noci, formaggi stagionati e salumi. L\'amarezza taglia magnificamente i cibi ricchi. Buono anche con verdure grigliate e piatti mediterranei.',
      vi: 'Kết hợp tốt với món khai vị mặn, ô liu, hạt, phô mai ủ lâu năm và charcuterie. Vị đắng cắt qua thức ăn béo ngậy một cách tuyệt vời. Cũng tốt với rau nướng và món Địa Trung Hải.',
    },
    ideal_for: {
      en: 'Perfect for gin and bitter enthusiasts who appreciate complex flavors. Ideal for accountants, tax professionals, and anyone who needs consolation during tax season. A thinking person\'s cocktail.',
      it: 'Perfetto per appassionati di gin e bitter che apprezzano sapori complessi. Ideale per commercialisti, professionisti fiscali e chiunque abbia bisogno di consolazione durante la stagione fiscale. Un cocktail per pensatori.',
      vi: 'Hoàn hảo cho những người đam mê gin và bitter đánh giá cao hương vị phức tạp. Lý tưởng cho kế toán, chuyên gia thuế và bất kỳ ai cần an ủi trong mùa thuế. Cocktail của người suy nghĩ.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermouth dry', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled cocktail glass. Garnish with an orange twist.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una scorza d\'arancia.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ cam xoắn.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Orange twist',
    it: 'Scorza d\'arancia',
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'bitter', 'complex'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'nut_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['spring', 'autumn', 'winter'],
  occasion_tags: ['aperitivo', 'sophisticated', 'contemplative'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bronx', 'satan-whiskers'],

  notes_for_staff: 'Very similar to the Bronx but with added Angostura bitters. Always use fresh orange juice. The bitters are essential - don\'t skip them. Some versions use equal parts vermouths, others vary the ratio. Shake well to integrate all ingredients.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 35,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1143/income-tax',
    note: 'Classic recipe from The Savoy Cocktail Book (1930) by Harry Craddock.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
