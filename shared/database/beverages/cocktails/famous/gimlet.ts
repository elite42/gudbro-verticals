/**
 * Famous Cocktails: Gimlet
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const gimlet: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d',
  slug: 'gimlet',
  stable_key: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1',

  name: {
    en: 'Gimlet',
    it: 'Gimlet',
    vi: 'Gimlet',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'citrus', 'sophisticated'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A crisp, refreshing gin cocktail with a perfect balance of botanical gin and tart lime. Simple yet sophisticated, the Gimlet is proof that great cocktails don\'t need complexity - just quality ingredients and proper proportions.',
    it: 'Un cocktail al gin fresco e croccante con un perfetto equilibrio di gin botanico e lime aspro. Semplice ma sofisticato, il Gimlet è la prova che i grandi cocktail non hanno bisogno di complessità - solo ingredienti di qualità e proporzioni corrette.',
    vi: 'Một loại cocktail gin giòn, sảng khoái với sự cân bằng hoàn hảo của gin thực vật và chanh chua. Đơn giản nhưng tinh tế, Gimlet là bằng chứng rằng cocktail tuyệt vời không cần sự phức tạp - chỉ cần nguyên liệu chất lượng và tỷ lệ phù hợp.',
  },

  history: {
    created_year: '1867',
    origin: {
      city: 'Unknown',
      bar: 'Royal Navy ships',
      country: 'United Kingdom',
    },
    creator: {
      name: 'Sir Thomas Gimlette (disputed)',
      profession: 'naval surgeon',
    },
    story: {
      en: 'The Gimlet\'s origin is steeped in British naval lore. One theory credits Rear Admiral Sir Thomas Gimlette, who allegedly created the drink in the 1890s to help sailors consume their daily ration of lime juice (used to prevent scurvy) by mixing it with gin. Another theory suggests it was named after the gimlet tool due to its "penetrating" effect. The drink gained popularity in the officers\' mess and eventually became a staple of British colonial bars. Raymond Chandler immortalized it in his 1953 novel "The Long Goodbye," where detective Philip Marlowe declares "a real gimlet is half gin and half Rose\'s Lime Juice and nothing else."',
      it: 'L\'origine del Gimlet è immersa nel folklore navale britannico. Una teoria attribuisce il merito al Contrammiraglio Sir Thomas Gimlette, che presumibilmente creò la bevanda negli anni 1890 per aiutare i marinai a consumare la loro razione giornaliera di succo di lime (usato per prevenire lo scorbuto) mescolandolo con gin. Un\'altra teoria suggerisce che prenda il nome dall\'attrezzo gimlet per il suo effetto "penetrante". La bevanda guadagnò popolarità nella mensa degli ufficiali e alla fine divenne un pilastro dei bar coloniali britannici. Raymond Chandler lo immortalò nel suo romanzo del 1953 "Il lungo addio," dove il detective Philip Marlowe dichiara "un vero gimlet è metà gin e metà succo di lime Rose\'s e nient\'altro."',
      vi: 'Nguồn gốc của Gimlet được bao phủ trong truyền thuyết hải quân Anh. Một giả thuyết cho rằng Đô đốc Sir Thomas Gimlette đã tạo ra thức uống này vào những năm 1890 để giúp thủy thủ tiêu thụ khẩu phần nước cốt chanh hàng ngày của họ (dùng để ngăn ngừa bệnh scorbut) bằng cách trộn nó với gin. Một giả thuyết khác cho rằng nó được đặt theo tên công cụ gimlet do hiệu ứng "xuyên thấu" của nó. Thức uống trở nên phổ biến trong căng tin sĩ quan và cuối cùng trở thành mặt hàng chủ lực của các quán bar thuộc địa Anh. Raymond Chandler đã bất tử hóa nó trong tiểu thuyết năm 1953 "The Long Goodbye," nơi thám tử Philip Marlowe tuyên bố "một gimlet thực sự là một nửa gin và một nửa nước cốt chanh Rose\'s và không gì khác."',
    },
    named_after: {
      en: 'Possibly named after Rear Admiral Sir Thomas Gimlette, or the gimlet tool (a small drill) for its sharp, penetrating character.',
      it: 'Probabilmente prende il nome dal Contrammiraglio Sir Thomas Gimlette, o dall\'attrezzo gimlet (un piccolo trapano) per il suo carattere tagliente e penetrante.',
      vi: 'Có thể được đặt theo tên Đô đốc Sir Thomas Gimlette, hoặc công cụ gimlet (một mũi khoan nhỏ) vì tính cách sắc bén, xuyên thấu của nó.',
    },
  },

  taste: {
    profile: ['citrus', 'herbal', 'crisp'],
    description: {
      en: 'Clean, bright, and refreshing. The Gimlet showcases the botanical complexity of gin balanced perfectly against the tartness of fresh lime. Modern versions emphasize fresh lime juice over the traditional Rose\'s Lime Cordial, resulting in a more vibrant, less sweet profile.',
      it: 'Pulito, brillante e rinfrescante. Il Gimlet mette in mostra la complessità botanica del gin bilanciata perfettamente contro l\'acidità del lime fresco. Le versioni moderne enfatizzano il succo di lime fresco rispetto al tradizionale Rose\'s Lime Cordial, risultando in un profilo più vibrante e meno dolce.',
      vi: 'Sạch, tươi sáng và sảng khoái. Gimlet thể hiện sự phức tạp thực vật của gin được cân bằng hoàn hảo với vị chua của chanh tươi. Các phiên bản hiện đại nhấn mạnh nước cốt chanh tươi thay vì Rose\'s Lime Cordial truyền thống, mang lại hương vị sống động hơn, ít ngọt hơn.',
    },
    first_impression: {
      en: 'Sharp lime acidity followed immediately by gin botanicals',
      it: 'Acidità tagliente di lime seguita immediatamente da botanici del gin',
      vi: 'Độ chua sắc nét của chanh theo sau ngay bởi thực vật gin',
    },
    finish: {
      en: 'Clean, crisp finish with lingering juniper and citrus notes',
      it: 'Finale pulito e croccante con note persistenti di ginepro e agrumi',
      vi: 'Kết thúc sạch, giòn với hương juniper và cam quýt kéo dài',
    },
    balance: {
      en: 'Beautifully balanced between spirit-forward gin and bright acidity - neither dominates',
      it: 'Magnificamente bilanciato tra gin in primo piano e acidità brillante - nessuno domina',
      vi: 'Cân bằng tuyệt đẹp giữa gin nổi bật và độ chua tươi sáng - không cái nào chiếm ưu thế',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['aperitivo', 'date_night', 'sophisticated', 'social'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with seafood, especially oysters, ceviche, or grilled fish. Also pairs well with light salads, Vietnamese spring rolls, and Thai cuisine.',
      it: 'Eccellente con frutti di mare, specialmente ostriche, ceviche o pesce alla griglia. Si abbina bene anche con insalate leggere, involtini primavera vietnamiti e cucina thailandese.',
      vi: 'Tuyệt vời với hải sản, đặc biệt là hàu, ceviche, hoặc cá nướng. Cũng kết hợp tốt với salad nhẹ, gỏi cuốn Việt Nam và ẩm thực Thái.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who appreciate clean, citrus-forward cocktails. Ideal for those who enjoy the sophistication of a martini but want something more refreshing.',
      it: 'Perfetto per gli amanti del gin che apprezzano cocktail puliti e incentrati sugli agrumi. Ideale per chi apprezza la sofisticazione di un martini ma vuole qualcosa di più rinfrescante.',
      vi: 'Hoàn hảo cho người yêu gin đánh giá cao cocktail sạch, hướng cam quýt. Lý tưởng cho những ai thích sự tinh tế của martini nhưng muốn thứ gì đó sảng khoái hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Syrup đường' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe or cocktail glass. Garnish with a lime wheel or wedge.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa o bicchiere da cocktail raffreddato. Guarnire con una rondella o spicchio di lime.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với lát hoặc miếng chanh.',
  },

  glass: 'Coupe or Cocktail glass',

  garnish: {
    en: 'Lime wheel or wedge',
    it: 'Rondella o spicchio di lime',
    vi: 'Lát hoặc miếng chanh',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'herbal', 'crisp'],

  abv_estimate: 22,

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'nut_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'sophisticated', 'social'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['vodka-gimlet', 'gin-rickey', 'classic-gimlet-with-roses'],

  notes_for_staff: 'Always use fresh lime juice for best results. The traditional version uses Rose\'s Lime Cordial - offer as alternative. Modern ratio is typically 2:1 gin to lime/syrup. Some prefer it slightly drier with less syrup.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1318/gimlet',
    note: 'Classic recipe adapted from Harry MacElhone\'s ABC of Mixing Cocktails (1922) and modern interpretations.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
