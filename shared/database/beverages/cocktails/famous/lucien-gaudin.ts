/**
 * Famous Cocktails: Lucien Gaudin
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const lucienGaudin: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd6c2e7b1-3f0a-2d9b-7a4c-0f1a2b3c4d5e',
  slug: 'lucien-gaudin',
  stable_key: 'a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',

  name: {
    en: 'Lucien Gaudin',
    it: 'Lucien Gaudin',
    vi: 'Lucien Gaudin',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'complex', 'elegant'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant cocktail combining gin, Cointreau, Campari, and dry vermouth. The Lucien Gaudin is a sophisticated balance of botanical, bitter, and citrus notes, creating a complex aperitif with beautiful color.',
    it: 'Un cocktail elegante che combina gin, Cointreau, Campari e vermut secco. Il Lucien Gaudin è un equilibrio sofisticato di note botaniche, amare e agrumate, creando un aperitivo complesso con un bellissimo colore.',
    vi: 'Một loại cocktail thanh lịch kết hợp gin, Cointreau, Campari và vermouth khô. Lucien Gaudin là sự cân bằng tinh tế của các nốt thực vật, đắng và cam quýt, tạo ra khai vị phức tạp với màu sắc đẹp mắt.',
  },

  history: {
    created_year: '1929',
    origin: {
      city: 'Paris',
      bar: 'Unknown',
      country: 'France',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'Created in Paris around 1929 and named after Lucien Gaudin, a legendary French Olympic fencer who won gold medals in 1924 and 1928. This cocktail represents the glamorous cocktail culture of 1920s Paris. The drink balances Italian bitterness (Campari) with French sophistication (Cointreau and vermouth) and British botanicals (gin), representing international cocktail culture.',
      it: "Creato a Parigi intorno al 1929 e intitolato a Lucien Gaudin, un leggendario schermidore olimpico francese che vinse medaglie d'oro nel 1924 e 1928. Questo cocktail rappresenta la glamour cultura dei cocktail della Parigi degli anni '20. Il drink bilancia l'amarezza italiana (Campari) con la sofisticazione francese (Cointreau e vermut) e i botanici britannici (gin), rappresentando la cultura internazionale dei cocktail.",
      vi: 'Được tạo ra ở Paris khoảng năm 1929 và được đặt theo tên Lucien Gaudin, một kiếm thủ Olympic huyền thoại của Pháp giành huy chương vàng năm 1924 và 1928. Cocktail này đại diện cho văn hóa cocktail quyến rũ của Paris những năm 1920. Thức uống cân bằng vị đắng Ý (Campari) với sự tinh tế của Pháp (Cointreau và vermouth) và thực vật Anh (gin), đại diện cho văn hóa cocktail quốc tế.',
    },
    named_after: {
      en: 'Named after Lucien Gaudin (1886-1934), French Olympic fencer and two-time gold medalist who was celebrated as a national hero in 1920s France.',
      it: "Prende il nome da Lucien Gaudin (1886-1934), schermidore olimpico francese e vincitore di due medaglie d'oro celebrato come eroe nazionale nella Francia degli anni '20.",
      vi: 'Được đặt theo tên Lucien Gaudin (1886-1934), kiếm thủ Olympic Pháp và người đoạt hai huy chương vàng được tôn vinh như anh hùng dân tộc ở Pháp những năm 1920.',
    },
  },

  taste: {
    profile: ['bitter', 'complex', 'citrus'],
    description: {
      en: "Sophisticated and complex with Campari's distinctive bitterness balanced by Cointreau's orange sweetness, dry vermouth's botanicals, and gin's juniper notes. Elegant and aperitif-perfect with beautiful rose-orange color.",
      it: "Sofisticato e complesso con l'amarezza distintiva del Campari bilanciata dalla dolcezza all'arancia del Cointreau, i botanici del vermut secco e le note di ginepro del gin. Elegante e perfetto come aperitivo con un bellissimo colore rosa-arancio.",
      vi: 'Tinh tế và phức tạp với vị đắng đặc trưng của Campari được cân bằng bởi vị ngọt cam của Cointreau, thực vật của vermouth khô và nốt bách xù của gin. Thanh lịch và hoàn hảo cho khai vị với màu hồng-cam đẹp mắt.',
    },
    first_impression: {
      en: 'Campari bitterness and orange sweetness hit together with botanical gin notes',
      it: "Amarezza del Campari e dolcezza all'arancia colpiscono insieme alle note botaniche del gin",
      vi: 'Vị đắng Campari và vị ngọt cam đập vào cùng nhau với nốt gin thực vật',
    },
    finish: {
      en: 'Dry, elegant finish with lingering bitterness and citrus complexity',
      it: 'Finale secco ed elegante con amarezza persistente e complessità agrumata',
      vi: 'Kết thúc khô, thanh lịch với vị đắng kéo dài và độ phức tạp cam quýt',
    },
    balance: {
      en: 'Perfectly balanced between bitter and sweet - complex yet approachable aperitif',
      it: 'Perfettamente bilanciato tra amaro e dolce - aperitivo complesso ma accessibile',
      vi: 'Cân bằng hoàn hảo giữa đắng và ngọt - khai vị phức tạp nhưng dễ tiếp cận',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['aperitivo', 'pre_dinner', 'date_night', 'celebration'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with Italian antipasti, charcuterie, olives, or light Mediterranean dishes. Perfect as a pre-dinner aperitif to stimulate the appetite.',
      it: "Eccellente con antipasti italiani, salumi, olive o piatti mediterranei leggeri. Perfetto come aperitivo pre-cena per stimolare l'appetito.",
      vi: 'Tuyệt vời với khai vị Ý, charcuterie, ô liu hoặc các món Địa Trung Hải nhẹ. Hoàn hảo như khai vị trước bữa tối để kích thích khẩu vị.',
    },
    ideal_for: {
      en: 'Perfect for Negroni lovers seeking elegant variations. Ideal for those who appreciate bitter aperitifs with citrus complexity and sophisticated balance.',
      it: 'Perfetto per gli amanti del Negroni che cercano varianti eleganti. Ideale per chi apprezza aperitivi amari con complessità agrumata e equilibrio sofisticato.',
      vi: 'Hoàn hảo cho người yêu Negroni tìm kiếm các biến thể thanh lịch. Lý tưởng cho những ai đánh giá cao khai vị đắng với độ phức tạp cam quýt và cân bằng tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_COINTREAU',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Cointreau', it: 'Cointreau', vi: 'Cointreau' },
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Campari', it: 'Campari', vi: 'Campari' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermut secco', vi: 'Vermouth khô' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir gently for 20-30 seconds until well-chilled. Strain into a chilled coupe or cocktail glass. Garnish with an orange twist, expressing the oils over the drink.',
    it: "Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 20-30 secondi fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere da cocktail. Guarnire con una scorza d'arancia, esprimendo gli oli sulla bevanda.",
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy nhẹ nhàng trong 20-30 giây cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với vỏ cam xoắn, ép tinh dầu lên thức uống.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Orange twist',
    it: "Scorza d'arancia",
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['bitter', 'complex', 'citrus'],

  abv_estimate: 26,

  calories_estimate: 170,

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'pre_dinner', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['lucien-gaudin-moderne'],

  notes_for_staff:
    'Equal parts after the gin creates beautiful balance. Use quality dry vermouth. The drink should be rose-orange colored. Great alternative for Negroni lovers seeking something more delicate. Serve very cold.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1427/lucien-gaudin',
    notes: 'Created in 1920s Paris. Named after French Olympic fencing champion Lucien Gaudin.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
