/**
 * Famous Cocktails: Gin and Tonic
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const ginAndTonic: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c4d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f',
  slug: 'gin-and-tonic',
  stable_key: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3',

  name: {
    en: 'Gin and Tonic',
    it: 'Gin Tonic',
    vi: 'Gin và Tonic',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'refreshing', 'simple', 'iconic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'Perhaps the world\'s most famous two-ingredient cocktail. The Gin and Tonic is a perfect marriage of botanical gin and bitter-sweet tonic water. Simple to make yet endlessly customizable, it\'s a drink that can be as casual or sophisticated as you make it.',
    it: 'Forse il cocktail a due ingredienti più famoso al mondo. Il Gin Tonic è un perfetto matrimonio di gin botanico e acqua tonica amarognola. Semplice da preparare ma infinitamente personalizzabile, è una bevanda che può essere casual o sofisticata come la fai.',
    vi: 'Có lẽ là cocktail hai nguyên liệu nổi tiếng nhất thế giới. Gin and Tonic là sự kết hợp hoàn hảo của gin thực vật và nước tonic đắng ngọt. Đơn giản để pha nhưng có thể tùy chỉnh vô tận, đây là thức uống có thể giản dị hoặc tinh tế tùy cách bạn pha.',
  },

  history: {
    created_year: '1825',
    origin: {
      city: 'Various locations',
      bar: 'British Colonial India',
      country: 'India',
    },
    creator: {
      name: 'Unknown',
      profession: 'British officers',
    },
    story: {
      en: 'The Gin and Tonic was born out of medicinal necessity in British Colonial India. Quinine, the active ingredient in tonic water, was used to prevent malaria. However, the bitter taste was unpleasant, so British officers began mixing it with gin, sugar, and lime to make it more palatable. Their daily dose of anti-malarial medicine thus became a refreshing cocktail. The drink became popular throughout the British Empire and eventually worldwide. In recent years, the G&T has experienced a renaissance, particularly in Spain, where it\'s treated as a craft cocktail with premium gins, artisanal tonics, and elaborate garnishes served in oversized balloon glasses.',
      it: 'Il Gin Tonic nacque per necessità medicinale nell\'India coloniale britannica. Il chinino, l\'ingrediente attivo nell\'acqua tonica, era usato per prevenire la malaria. Tuttavia, il sapore amaro era sgradevole, quindi gli ufficiali britannici iniziarono a mescolarlo con gin, zucchero e lime per renderlo più gradevole. La loro dose giornaliera di medicina antimalarica divenne così un cocktail rinfrescante. La bevanda divenne popolare in tutto l\'Impero britannico e alla fine in tutto il mondo. Negli ultimi anni, il G&T ha vissuto un rinascimento, in particolare in Spagna, dove è trattato come un cocktail artigianale con gin premium, toniche artigianali e guarnizioni elaborate servite in bicchieri balloon oversize.',
      vi: 'Gin and Tonic ra đời từ nhu cầu y tế ở Ấn Độ thuộc địa Anh. Quinine, thành phần hoạt động trong nước tonic, được sử dụng để ngăn ngừa bệnh sốt rét. Tuy nhiên, vị đắng khó chịu, vì vậy các sĩ quan Anh bắt đầu trộn nó với gin, đường và chanh để dễ uống hơn. Liều thuốc chống sốt rét hàng ngày của họ do đó trở thành một cocktail sảng khoái. Thức uống trở nên phổ biến trong toàn bộ Đế chế Anh và cuối cùng là toàn thế giới. Trong những năm gần đây, G&T đã trải qua sự phục hưng, đặc biệt ở Tây Ban Nha, nơi nó được đối xử như một cocktail thủ công với gin cao cấp, tonic thủ công và trang trí công phu được phục vụ trong ly bóng bay cỡ lớn.',
    },
    named_after: {
      en: 'Simply named after its two main ingredients: gin and tonic water.',
      it: 'Semplicemente prende il nome dai suoi due ingredienti principali: gin e acqua tonica.',
      vi: 'Đơn giản được đặt theo tên hai nguyên liệu chính: gin và nước tonic.',
    },
  },

  taste: {
    profile: ['bitter', 'herbal', 'refreshing'],
    description: {
      en: 'Crisp, refreshing, and beautifully bitter. The Gin and Tonic balances the botanical complexity of gin against the quinine bitterness of tonic water. The result is an adult, sophisticated drink that\'s incredibly refreshing and endlessly drinkable.',
      it: 'Croccante, rinfrescante e meravigliosamente amaro. Il Gin Tonic bilancia la complessità botanica del gin contro l\'amarezza del chinino dell\'acqua tonica. Il risultato è una bevanda adulta e sofisticata incredibilmente rinfrescante e infinitamente beverina.',
      vi: 'Giòn, sảng khoái và đắng tuyệt đẹp. Gin and Tonic cân bằng sự phức tạp thực vật của gin với vị đắng quinine của nước tonic. Kết quả là một thức uống trưởng thành, tinh tế cực kỳ sảng khoái và dễ uống vô tận.',
    },
    first_impression: {
      en: 'Juniper and botanicals followed by refreshing quinine bitterness and bubbles',
      it: 'Ginepro e botanici seguiti da amarezza rinfrescante del chinino e bollicine',
      vi: 'Juniper và thực vật theo sau là vị đắng quinine sảng khoái và bọt',
    },
    finish: {
      en: 'Clean, bitter-sweet finish with lingering botanical and citrus notes',
      it: 'Finale pulito e amarognolo con note botaniche e di agrumi persistenti',
      vi: 'Kết thúc sạch, đắng ngọt với hương thực vật và cam quýt kéo dài',
    },
    balance: {
      en: 'The balance depends on gin-to-tonic ratio - adjust to preference from spirit-forward to refreshingly light',
      it: 'L\'equilibrio dipende dal rapporto gin-tonic - regolare secondo le preferenze da spirit-forward a rinfrescante e leggero',
      vi: 'Sự cân bằng phụ thuộc vào tỷ lệ gin và tonic - điều chỉnh theo sở thích từ nổi bật rượu đến nhẹ nhàng sảng khoái',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['aperitivo', 'social', 'outdoor', 'casual', 'sophisticated'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Versatile pairing: excellent with tapas, olives, cheese, seafood, grilled fish, salads, and light appetizers. The bitterness cuts through fatty foods beautifully.',
      it: 'Abbinamento versatile: eccellente con tapas, olive, formaggio, frutti di mare, pesce alla griglia, insalate e antipasti leggeri. L\'amarezza taglia magnificamente i cibi grassi.',
      vi: 'Kết hợp linh hoạt: tuyệt vời với tapas, ô liu, phô mai, hải sản, cá nướng, salad và món khai vị nhẹ. Vị đắng cắt qua thức ăn béo một cách tuyệt vời.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers and those who appreciate bitter flavors. Ideal for anyone wanting a sophisticated yet simple drink. The ultimate aperitif for stimulating the appetite.',
      it: 'Perfetto per gli amanti del gin e chi apprezza i sapori amari. Ideale per chiunque voglia una bevanda sofisticata ma semplice. L\'aperitivo definitivo per stimolare l\'appetito.',
      vi: 'Hoàn hảo cho người yêu gin và những ai đánh giá cao hương vị đắng. Lý tưởng cho bất kỳ ai muốn một thức uống tinh tế nhưng đơn giản. Món khai vị tối ưu để kích thích vị giác.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_TONIC_WATER',
      quantity: { amount: 150, unit: 'ml' },
      display_name: { en: 'Tonic water', it: 'Acqua tonica', vi: 'Nước tonic' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice cubes. Pour gin over ice. Top with chilled tonic water. Stir gently once. Garnish with a lime wedge or wheel. Express lime oils over the drink before adding.',
    it: 'Riempire un bicchiere highball con cubetti di ghiaccio. Versare il gin sul ghiaccio. Completare con acqua tonica fredda. Mescolare delicatamente una volta. Guarnire con uno spicchio o rondella di lime. Spremere gli oli di lime sulla bevanda prima di aggiungerla.',
    vi: 'Đổ đầy ly highball với đá viên. Rót gin lên đá. Thêm nước tonic lạnh lên trên. Khuấy nhẹ một lần. Trang trí với miếng hoặc lát chanh. Vắt dầu chanh lên thức uống trước khi thêm vào.',
  },

  glass: 'Highball glass (or Copa Balón)',

  garnish: {
    en: 'Lime wedge or wheel',
    it: 'Spicchio o rondella di lime',
    vi: 'Miếng hoặc lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['bitter', 'herbal', 'refreshing'],

  abv_estimate: 9,

  calories_estimate: 180,

  difficulty: 'beginner',

  prep_time_seconds: 30,

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
  occasion_tags: ['aperitivo', 'social', 'outdoor', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['pink-gin-tonic', 'elderflower-gin-tonic', 'mediterranean-gin-tonic'],

  notes_for_staff: 'Quality matters - use premium gin and tonic. The ratio can vary from 1:1 to 1:3 depending on preference. Always use fresh ice and cold tonic. In Spain, serve in balloon glass with elaborate garnishes (rosemary, juniper berries, citrus). Don\'t over-stir - preserve the bubbles.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 98,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/906/gin-tonic',
    note: 'Traditional recipe with modern craft variations. Historical information from various cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
