/**
 * Margarita Cocktail
 *
 * The world's most popular tequila cocktail, with mysterious origins
 * dating to the 1930s-1940s. The Margarita is essentially a tequila-based
 * variation of the classic Daisy cocktail family.
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const margarita: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '671fef4d-8461-4367-9710-3a767a8c904c',
  slug: 'margarita',
  stable_key: 'margarita',

  name: {
    en: 'Margarita',
    it: 'Margarita',
    vi: 'Margarita',
    ko: '마가리타',
    ja: 'マルガリータ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary Classics',
  tags: ['iba', 'official', 'classic', 'shaken', 'sour'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Margarita is the world\'s most popular tequila cocktail. A perfect balance of tequila, triple sec, and fresh lime juice, often served with a signature salt rim. Refreshing, tangy, and unmistakably Mexican.',
    it: 'Il Margarita è il cocktail a base di tequila più popolare al mondo. Un perfetto equilibrio di tequila, triple sec e succo di lime fresco, spesso servito con il caratteristico bordo di sale. Rinfrescante, aspro e inconfondibilmente messicano.',
    vi: 'Margarita là cocktail tequila phổ biến nhất thế giới. Sự cân bằng hoàn hảo của tequila, triple sec và nước chanh tươi, thường phục vụ với viền muối đặc trưng. Sảng khoái, chua và đặc trưng Mexico.',
  },

  history: {
    created_year: '1938',
    origin: {
      city: 'Tijuana / Rosarito',
      bar: 'Rancho La Gloria',
      country: 'Mexico',
    },
    creator: {
      name: 'Carlos "Danny" Herrera',
      profession: 'bartender',
    },
    story: {
      en: 'The Margarita\'s origins are shrouded in mystery with numerous competing claims. The most popular story credits Carlos "Danny" Herrera, who created it in 1938 at his restaurant Rancho La Gloria for former Ziegfeld dancer Marjorie King, who was allergic to all spirits except tequila but disliked drinking it straight. Cocktail historian David Wondrich notes the Margarita is related to the "Daisy" family of cocktails (margarita means "daisy" in Spanish), likely evolving from the Tequila Daisy. The first published recipe appeared in Esquire magazine in December 1953.',
      it: 'Le origini del Margarita sono avvolte nel mistero con numerose rivendicazioni concorrenti. La storia più popolare lo attribuisce a Carlos "Danny" Herrera, che lo creò nel 1938 nel suo ristorante Rancho La Gloria per l\'ex ballerina Ziegfeld Marjorie King, allergica a tutti gli alcolici tranne la tequila ma che non amava berla liscia. Lo storico dei cocktail David Wondrich nota che il Margarita è correlato alla famiglia dei cocktail "Daisy" (margarita significa "margherita" in spagnolo), probabilmente evolvendosi dal Tequila Daisy. La prima ricetta pubblicata apparve sulla rivista Esquire nel dicembre 1953.',
      vi: 'Nguồn gốc của Margarita bị bao phủ trong bí ẩn với nhiều tuyên bố cạnh tranh. Câu chuyện phổ biến nhất ghi nhận Carlos "Danny" Herrera, người tạo ra nó năm 1938 tại nhà hàng Rancho La Gloria cho vũ công cũ Ziegfeld Marjorie King, người dị ứng với tất cả rượu trừ tequila nhưng không thích uống thuần. Sử gia cocktail David Wondrich lưu ý Margarita liên quan đến họ cocktail "Daisy" (margarita có nghĩa là "daisy" trong tiếng Tây Ban Nha), có thể phát triển từ Tequila Daisy. Công thức đầu tiên được xuất bản trong tạp chí Esquire tháng 12/1953.',
    },
    named_after: {
      en: 'Named after Marjorie King, the customer for whom it was supposedly created, though "margarita" also means "daisy" in Spanish, linking it to the Daisy family of cocktails.',
      it: 'Prende il nome da Marjorie King, la cliente per cui fu presumibilmente creato, anche se "margarita" significa anche "margherita" in spagnolo, collegandolo alla famiglia dei cocktail Daisy.',
      vi: 'Được đặt tên theo Marjorie King, khách hàng mà nó được cho là tạo ra, mặc dù "margarita" cũng có nghĩa là "daisy" trong tiếng Tây Ban Nha, liên kết nó với họ cocktail Daisy.',
    },
  },

  taste: {
    profile: ['sour', 'citrus', 'refreshing', 'balanced'],
    description: {
      en: 'The Margarita delivers a vibrant, refreshing taste with bright lime acidity balanced by the sweet orange notes of triple sec and the earthy agave character of tequila. The optional salt rim enhances the citrus flavors while adding a savory contrast.',
      it: 'Il Margarita offre un gusto vibrante e rinfrescante con brillante acidità del lime bilanciata dalle dolci note d\'arancia del triple sec e il carattere terroso di agave della tequila. Il bordo di sale opzionale esalta i sapori agrumati aggiungendo un contrasto saporito.',
      vi: 'Margarita mang hương vị sống động, sảng khoái với vị chua chanh tươi sáng được cân bằng bởi hương cam ngọt của triple sec và đặc tính đất agave của tequila. Viền muối tùy chọn tăng cường hương vị cam quýt đồng thời thêm sự tương phản mặn.',
    },
    first_impression: {
      en: 'Bright, zesty lime hits immediately, followed by sweet orange and agave warmth. The salt rim (if present) provides instant flavor complexity.',
      it: 'Lime brillante e frizzante colpisce immediatamente, seguito da arancia dolce e calore di agave. Il bordo di sale (se presente) fornisce complessità di sapore istantanea.',
      vi: 'Chanh tươi sáng, chua đánh ngay lập tức, theo sau là cam ngọt và hơi ấm agave. Viền muối (nếu có) cung cấp độ phức tạp hương vị tức thì.',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus and subtle agave sweetness. The tequila warmth develops gradually, leaving a refreshing aftertaste.',
      it: 'Finale pulito e fresco con agrumi persistenti e sottile dolcezza di agave. Il calore della tequila si sviluppa gradualmente, lasciando un retrogusto rinfrescante.',
      vi: 'Hậu vị sạch, giòn với cam quýt lingering và vị ngọt agave tinh tế. Hơi ấm tequila phát triển dần dần, để lại dư vị sảng khoái.',
    },
    balance: {
      en: 'Masterfully balanced between sour lime, sweet triple sec, and robust tequila. The proportions create perfect harmony where no single element dominates.',
      it: 'Magistralmente bilanciato tra lime aspro, triple sec dolce e tequila robusta. Le proporzioni creano armonia perfetta dove nessun elemento domina.',
      vi: 'Cân bằng tinh tế giữa chanh chua, triple sec ngọt và tequila mạnh mẽ. Tỷ lệ tạo sự hài hòa hoàn hảo mà không có yếu tố nào chiếm ưu thế.',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'happy_hour'],
    occasions: ['party', 'beach', 'summer_gathering', 'casual'],
    seasons: ['summer', 'spring', 'all_year'],
    food_pairings: {
      en: 'Perfect with Mexican cuisine: tacos, guacamole, ceviche, chips and salsa. Also excellent with grilled seafood, spicy dishes, and fresh citrus-based salads.',
      it: 'Perfetto con la cucina messicana: tacos, guacamole, ceviche, chips e salsa. Eccellente anche con frutti di mare grigliati, piatti piccanti e insalate fresche a base di agrumi.',
      vi: 'Hoàn hảo với ẩm thực Mexico: tacos, guacamole, ceviche, chips và salsa. Cũng tuyệt vời với hải sản nướng, món cay và salad cam quýt tươi.',
    },
    ideal_for: {
      en: 'Perfect for casual gatherings, summer parties, beach days, and anyone who loves refreshing, citrus-forward cocktails. The most ordered cocktail worldwide.',
      it: 'Perfetto per riunioni informali, feste estive, giorni in spiaggia e chiunque ami cocktail rinfrescanti e agrumati. Il cocktail più ordinato al mondo.',
      vi: 'Hoàn hảo cho các buổi tụ tập thân mật, tiệc mùa hè, ngày biển và bất kỳ ai yêu thích cocktail sảng khoái, hương cam quýt nổi bật. Cocktail được gọi nhiều nhất trên thế giới.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA_BLANCO',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Tequila 100% Agave', it: 'Tequila 100% Agave', vi: 'Tequila 100% Agave' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Triple Sec', it: 'Triple Sec', vi: 'Triple Sec' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Freshly Squeezed Lime Juice', it: 'Succo di Lime Fresco', vi: 'Nước Chanh Tươi Vắt' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Optional: prepare glass with half salt rim by rubbing lime wedge on half the rim and dipping in coarse salt. Add all ingredients into a shaker with ice. Shake vigorously for 10-15 seconds. Strain into the prepared chilled cocktail glass.',
    it: 'Opzionale: preparare il bicchiere con mezzo bordo di sale strofinando uno spicchio di lime su metà del bordo e immergendolo in sale grosso. Aggiungere tutti gli ingredienti in uno shaker con ghiaccio. Shakerare vigorosamente per 10-15 secondi. Filtrare nel bicchiere da cocktail ghiacciato preparato.',
    vi: 'Tùy chọn: chuẩn bị ly với nửa viền muối bằng cách chà miếng chanh lên nửa viền và nhúng vào muối thô. Thêm tất cả nguyên liệu vào shaker với đá. Lắc mạnh trong 10-15 giây. Lọc vào ly cocktail đã ướp lạnh chuẩn bị.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Half salt rim (optional)',
    it: 'Mezzo bordo di sale (opzionale)',
    vi: 'Nửa viền muối (tùy chọn)',
  },

  ice: 'none',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA_BLANCO'],
  flavor_profile: ['sour', 'citrus', 'refreshing', 'balanced'],
  abv_estimate: 22,
  calories_estimate: 168,
  difficulty: 'easy',
  prep_time_seconds: 60,

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
  season_tags: ['summer', 'spring', 'all_year'],
  occasion_tags: ['party', 'beach', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff: 'Always use fresh lime juice - never bottled. Use 100% agave tequila for best results. Salt rim is optional - ask customer preference. For a frozen margarita, blend ingredients with ice. Popular variations include strawberry, mango, and spicy jalapeño versions.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 98,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/margarita/',
    note: 'IBA Official Recipe. Historical information from Esquire (1953) and cocktail historians David Wondrich and Robert Simonson.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
