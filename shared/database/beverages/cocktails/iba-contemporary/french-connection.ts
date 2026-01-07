/**
 * IBA Contemporary Classics: French Connection
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const frenchConnection: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
  slug: 'french-connection',
  stable_key: 'french_connection_iba_contemporary_classic',

  name: {
    en: 'French Connection',
    it: 'French Connection',
    vi: 'French Connection',
    ko: '프렌치 커넥션',
    ja: 'フレンチコネクション',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'after-dinner', 'digestivo', 'simple', 'spirit-forward'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated after-dinner drink combining cognac with Amaretto. Simple yet elegant, this two-ingredient cocktail delivers rich almond sweetness balanced by smooth brandy warmth.',
    it: 'Una sofisticata bevanda dopo cena che combina cognac con Amaretto. Semplice ma elegante, questo cocktail a due ingredienti offre una ricca dolcezza di mandorla bilanciata dal calore morbido del brandy.',
    vi: 'Một thức uống tinh tế sau bữa tối kết hợp cognac với Amaretto. Đơn giản nhưng thanh lịch, cocktail hai thành phần này mang lại vị ngọt hạnh nhân đậm đà cân bằng với hơi ấm brandy mượt mà.',
  },

  history: {
    created_year: '1970',
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
      en: 'The French Connection gained popularity in the 1970s, possibly inspired by the 1971 film of the same name starring Gene Hackman. The combination of French cognac and Italian amaretto creates an international "connection" that delivers sophisticated simplicity.',
      it: 'Il French Connection divenne popolare negli anni \'70, forse ispirato dal film del 1971 con lo stesso nome interpretato da Gene Hackman. La combinazione di cognac francese e amaretto italiano crea una "connessione" internazionale che offre sofisticata semplicità.',
      vi: 'French Connection trở nên phổ biến vào những năm 1970, có thể được lấy cảm hứng từ bộ phim cùng tên năm 1971 với sự tham gia của Gene Hackman. Sự kết hợp giữa cognac Pháp và amaretto Ý tạo ra một "kết nối" quốc tế mang lại sự đơn giản tinh tế.',
    },
    named_after: {
      en: 'Likely named after the 1971 crime film "The French Connection," though the exact origin is disputed.',
      it: 'Probabilmente prende il nome dal film poliziesco del 1971 "Il Braccio Violento della Legge", anche se l\'origine esatta è dibattuta.',
      vi: 'Có thể được đặt tên theo bộ phim tội phạm năm 1971 "The French Connection," mặc dù nguồn gốc chính xác còn tranh cãi.',
    },
  },

  taste: {
    profile: ['sweet', 'nutty', 'boozy'],
    description: {
      en: 'Rich and warming with prominent almond sweetness from Amaretto balanced by the complex, oaky depth of cognac. Smooth, sippable, and luxurious - perfect for slow enjoyment.',
      it: "Ricco e caldo con una dolcezza di mandorla prominente dall'Amaretto bilanciata dalla profondità complessa e legnosa del cognac. Morbido, sorseggiabile e lussuoso - perfetto per un lento godimento.",
      vi: 'Đậm đà và ấm áp với vị ngọt hạnh nhân nổi bật từ Amaretto cân bằng với chiều sâu phức tạp, gỗ sồi của cognac. Mượt mà, nhấm nháp và sang trọng - hoàn hảo để thưởng thức chậm rãi.',
    },
    first_impression: {
      en: 'Sweet almond and warm cognac with oak notes',
      it: 'Mandorla dolce e cognac caldo con note di rovere',
      vi: 'Hạnh nhân ngọt và cognac ấm với hương gỗ sồi',
    },
    finish: {
      en: 'Long, warming finish with lingering almond and oak',
      it: 'Finale lungo e caldo con mandorla e rovere persistenti',
      vi: 'Kết thúc dài, ấm áp với hạnh nhân và gỗ sồi kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet amaretto and dry cognac',
      it: 'Ben bilanciato tra amaretto dolce e cognac secco',
      vi: 'Cân bằng tốt giữa amaretto ngọt và cognac khô',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'nightcap', 'relaxation', 'celebration'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect as a digestif after dinner. Pairs well with chocolate desserts, biscotti, or almond-based sweets. Also excellent with coffee.',
      it: 'Perfetto come digestivo dopo cena. Si abbina bene con dessert al cioccolato, biscotti o dolci a base di mandorle. Eccellente anche con il caffè.',
      vi: 'Hoàn hảo như một thức uống tiêu hóa sau bữa tối. Kết hợp tốt với món tráng miệng chocolate, biscotti hoặc đồ ngọt từ hạnh nhân. Cũng tuyệt vời với cà phê.',
    },
    ideal_for: {
      en: 'Ideal for those who appreciate simple, spirit-forward cocktails. Perfect for cognac and amaretto lovers seeking an elegant nightcap.',
      it: "Ideale per chi apprezza cocktail semplici e spirit-forward. Perfetto per gli amanti del cognac e dell'amaretto che cercano un elegante nightcap.",
      vi: 'Lý tưởng cho những ai đánh giá cao cocktail đơn giản, hướng về rượu. Hoàn hảo cho người yêu cognac và amaretto tìm kiếm nightcap thanh lịch.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 35, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_AMARETTO',
      quantity: { amount: 35, unit: 'ml' },
      display_name: { en: 'Amaretto', it: 'Amaretto', vi: 'Amaretto' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Build into an old fashioned glass filled with ice. Stir gently. No garnish required.',
    it: 'Costruire in un bicchiere old fashioned pieno di ghiaccio. Mescolare delicatamente. Nessuna guarnizione richiesta.',
    vi: 'Xây dựng vào ly old fashioned đầy đá. Khuấy nhẹ. Không cần trang trí.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC'],

  flavor_profile: ['sweet', 'nutty', 'boozy'],

  abv_estimate: 30,

  calories_estimate: 200,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'nightcap', 'relaxation', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['italian-connection', 'godfather'],

  notes_for_staff:
    'Equal parts cognac and amaretto. Can be served neat or on the rocks. The Godfather is a similar drink using scotch instead of cognac. Simple build - no shaking required.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/french-connection/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
