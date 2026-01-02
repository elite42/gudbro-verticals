/**
 * Famous Cocktails: Hemingway Daiquiri
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const hemingwayDaiquiri: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3f9b4e8-0c7d-9a6e-4d1f-7c8d9e0f1a2b',
  slug: 'hemingway-daiquiri',
  stable_key: 'd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9',

  name: {
    en: 'Hemingway Daiquiri',
    it: 'Daiquiri Hemingway',
    vi: 'Daiquiri Hemingway',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'rum', 'tart', 'cuban', 'literary'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A tart, sugar-free variation of the classic daiquiri featuring white rum, lime, grapefruit, and maraschino liqueur. Created for Ernest Hemingway, this cocktail is bright, refreshing, and perfectly balanced without added sugar.',
    it: 'Una variazione aspra e senza zucchero del daiquiri classico con rum bianco, lime, pompelmo e liquore maraschino. Creato per Ernest Hemingway, questo cocktail è brillante, rinfrescante e perfettamente bilanciato senza zucchero aggiunto.',
    vi: 'Một biến thể chua, không đường của daiquiri cổ điển với rum trắng, chanh, bưởi và rượu maraschino. Được tạo ra cho Ernest Hemingway, cocktail này tươi sáng, sảng khoái và cân bằng hoàn hảo mà không cần đường.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Havana',
      bar: 'El Floridita',
      country: 'Cuba',
    },
    creator: {
      name: 'Constantino Ribalaigua',
      profession: 'bartender',
    },
    story: {
      en: 'Created at Havana\'s legendary El Floridita bar by head bartender Constantino Ribalaigua for Ernest Hemingway in the 1930s. Hemingway, a diabetic, requested a daiquiri without sugar. Constantino crafted this tart masterpiece using double rum, fresh citrus, and maraschino liqueur. Also known as "Papa Doble" (Hemingway\'s nickname), this drink became his signature order and helped make El Floridita famous worldwide.',
      it: 'Creato al leggendario bar El Floridita dell\'Avana dal capo barman Constantino Ribalaigua per Ernest Hemingway negli anni \'30. Hemingway, diabetico, chiese un daiquiri senza zucchero. Constantino creò questo capolavoro aspro usando rum doppio, agrumi freschi e liquore maraschino. Conosciuto anche come "Papa Doble" (soprannome di Hemingway), questo drink divenne il suo ordine distintivo e contribuì a rendere El Floridita famoso in tutto il mondo.',
      vi: 'Được tạo ra tại quán bar huyền thoại El Floridita của Havana bởi trưởng bartender Constantino Ribalaigua cho Ernest Hemingway những năm 1930. Hemingway, một người tiểu đường, yêu cầu daiquiri không đường. Constantino đã tạo ra kiệt tác chua này bằng cách sử dụng rum gấp đôi, cam quýt tươi và rượu maraschino. Còn được gọi là "Papa Doble" (biệt danh Hemingway), thức uống này trở thành đơn hàng đặc trưng của ông và giúp El Floridita nổi tiếng toàn thế giới.',
    },
    named_after: {
      en: 'Named after Ernest Hemingway, the legendary American author who lived in Cuba and frequented El Floridita. Also called "Papa Doble" after his nickname.',
      it: 'Prende il nome da Ernest Hemingway, il leggendario autore americano che visse a Cuba e frequentava El Floridita. Chiamato anche "Papa Doble" dal suo soprannome.',
      vi: 'Được đặt theo tên Ernest Hemingway, tác giả người Mỹ huyền thoại sống ở Cuba và thường xuyên đến El Floridita. Còn được gọi là "Papa Doble" theo biệt danh của ông.',
    },
  },

  taste: {
    profile: ['tart', 'citrus', 'refreshing'],
    description: {
      en: 'Bright and intensely tart with fresh lime and grapefruit dominating. The maraschino liqueur adds subtle cherry sweetness and complexity, while double rum provides backbone. Refreshing and bracing without sweetness.',
      it: 'Brillante e intensamente aspro con lime fresco e pompelmo dominanti. Il liquore maraschino aggiunge dolcezza sottile di ciliegia e complessità, mentre il rum doppio fornisce struttura. Rinfrescante e rinvigorente senza dolcezza.',
      vi: 'Tươi sáng và cực kỳ chua với chanh tươi và bưởi chiếm ưu thế. Rượu maraschino thêm vị ngọt anh đào tinh tế và độ phức tạp, trong khi rum gấp đôi cung cấp xương sống. Sảng khoái và mạnh mẽ mà không có vị ngọt.',
    },
    first_impression: {
      en: 'Sharp citrus tartness hits immediately with grapefruit and lime brightness',
      it: 'Acidità agrumata tagliente colpisce immediatamente con brillantezza di pompelmo e lime',
      vi: 'Vị chua cam quýt sắc nét đập vào ngay lập tức với độ tươi sáng bưởi và chanh',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus and subtle maraschino',
      it: 'Finale pulito e rinfrescante con agrumi persistenti e maraschino sottile',
      vi: 'Kết thúc sạch, sảng khoái với cam quýt kéo dài và maraschino tinh tế',
    },
    balance: {
      en: 'Boldly tart yet balanced - the maraschino provides just enough sweetness to round sharp citrus',
      it: 'Audacemente aspro ma bilanciato - il maraschino fornisce giusto abbastanza dolcezza per arrotondare gli agrumi taglienti',
      vi: 'Chua đậm đà nhưng cân bằng - maraschino cung cấp đủ vị ngọt để làm tròn cam quýt chua',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['aperitivo', 'beach', 'summer_party', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with fresh seafood, ceviche, oysters, or light salads. Perfect as a palate-cleansing aperitif before rich meals.',
      it: 'Eccellente con frutti di mare freschi, ceviche, ostriche o insalate leggere. Perfetto come aperitivo rinfrescante prima di pasti ricchi.',
      vi: 'Tuyệt vời với hải sản tươi, ceviche, hàu hoặc salad nhẹ. Hoàn hảo như khai vị làm sạch vị giác trước bữa ăn giàu dinh dưỡng.',
    },
    ideal_for: {
      en: 'Perfect for those who prefer tart, sugar-free cocktails. Ideal for rum lovers seeking a bright, refreshing drink without sweetness, or anyone following Hemingway\'s legendary example.',
      it: 'Perfetto per chi preferisce cocktail aspri e senza zucchero. Ideale per gli amanti del rum che cercano un drink brillante e rinfrescante senza dolcezza, o chiunque segua il leggendario esempio di Hemingway.',
      vi: 'Hoàn hảo cho những ai thích cocktail chua, không đường. Lý tưởng cho người yêu rum tìm kiếm thức uống tươi sáng, sảng khoái mà không có vị ngọt, hoặc bất kỳ ai theo gương huyền thoại của Hemingway.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHITE_RUM',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh grapefruit juice', it: 'Succo di pompelmo fresco', vi: 'Nước bưởi tươi' },
    },
    {
      ingredient_id: 'ING_MARASCHINO_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Maraschino liqueur', it: 'Liquore maraschino', vi: 'Rượu maraschino' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe or cocktail glass. Garnish with a lime wheel or grapefruit twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere da cocktail. Guarnire con una rotella di lime o scorza di pompelmo.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với lát chanh hoặc vỏ bưởi xoắn.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Lime wheel or grapefruit twist',
    it: 'Rotella di lime o scorza di pompelmo',
    vi: 'Lát chanh hoặc vỏ bưởi xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHITE_RUM'],

  flavor_profile: ['tart', 'citrus', 'refreshing'],

  abv_estimate: 20,

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free', 'sugar_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'sugar-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['aperitivo', 'beach', 'summer_party', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['papa-doble', 'hemingway-special', 'daiquiri-natural'],

  notes_for_staff: 'No sugar added - Hemingway was diabetic. Double rum makes this strong. Use fresh grapefruit juice only. Luxardo maraschino is preferred. Legend says Hemingway drank these in quantities of 6-12 per session. Serve very cold.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1375/hemingway-daiquiri',
    note: 'Created at El Floridita, Havana, 1930s. Hemingway\'s signature drink, also known as Papa Doble.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
