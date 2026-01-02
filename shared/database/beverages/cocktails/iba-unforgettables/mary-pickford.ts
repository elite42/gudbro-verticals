/**
 * IBA Unforgettables: Mary Pickford
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const maryPickford: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
  slug: 'mary-pickford',
  stable_key: 'e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4',

  name: {
    en: 'Mary Pickford',
    it: 'Mary Pickford',
    vi: 'Mary Pickford',
    ko: '메리 픽포드',
    ja: 'メアリー・ピックフォード',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'tropical', 'prohibition-era', 'celebrity'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A delightful Prohibition-era cocktail made with white rum, fresh pineapple juice, grenadine, and Maraschino liqueur. Named after "America\'s Sweetheart," silent film star Mary Pickford, this tropical drink is as charming and refreshing as its namesake.',
    it: 'Un delizioso cocktail dell\'era del Proibizionismo fatto con rum bianco, succo di ananas fresco, granatina e liquore Maraschino. Prende il nome da "America\'s Sweetheart," la star del cinema muto Mary Pickford, questo drink tropicale è affascinante e rinfrescante quanto la sua omonima.',
    vi: 'Một cocktail thú vị từ thời Cấm rượu làm từ rum trắng, nước dứa tươi, grenadine và liqueur Maraschino. Được đặt tên theo "Người tình của nước Mỹ," ngôi sao phim câm Mary Pickford, thức uống nhiệt đới này quyến rũ và sảng khoái như tên gọi của nó.',
  },

  history: {
    created_year: '1920s',
    origin: {
      city: 'Havana',
      bar: 'Hotel Nacional',
      country: 'Cuba',
    },
    creator: {
      name: 'Eddie Woelke or Fred Kaufman',
      profession: 'bartender',
    },
    story: {
      en: 'The Mary Pickford was created in the 1920s during Prohibition at the Hotel Nacional in Havana, Cuba - a popular destination for Americans escaping Prohibition. It was created for silent film star Mary Pickford during her visit to Cuba with husband Douglas Fairbanks. The bartenders, either Eddie Woelke or Fred Kaufman (sources vary), created this elegant tropical drink to honor "America\'s Sweetheart." The cocktail was included in the original 1961 IBA list of 50 official cocktails and has remained a classic ever since.',
      it: 'Il Mary Pickford fu creato negli anni \'20 durante il Proibizionismo all\'Hotel Nacional dell\'Avana, Cuba - una destinazione popolare per gli americani che sfuggivano al Proibizionismo. Fu creato per la star del cinema muto Mary Pickford durante la sua visita a Cuba con il marito Douglas Fairbanks. I barman, Eddie Woelke o Fred Kaufman (le fonti variano), crearono questo elegante drink tropicale per onorare "America\'s Sweetheart." Il cocktail fu incluso nella lista IBA originale del 1961 di 50 cocktail ufficiali ed è rimasto un classico da allora.',
      vi: 'Mary Pickford được tạo ra vào những năm 1920 trong thời Cấm rượu tại Hotel Nacional ở Havana, Cuba - một điểm đến phổ biến cho người Mỹ trốn tránh Cấm rượu. Nó được tạo ra cho ngôi sao phim câm Mary Pickford trong chuyến thăm Cuba của cô với chồng Douglas Fairbanks. Các bartender, Eddie Woelke hoặc Fred Kaufman (nguồn khác nhau), đã tạo ra thức uống nhiệt đới thanh lịch này để vinh danh "Người tình của nước Mỹ." Cocktail được bao gồm trong danh sách IBA gốc năm 1961 gồm 50 cocktail chính thức và đã là một tác phẩm kinh điển kể từ đó.',
    },
    named_after: {
      en: 'Named after Mary Pickford, the famous silent film actress known as "America\'s Sweetheart."',
      it: 'Prende il nome da Mary Pickford, la famosa attrice del cinema muto conosciuta come "America\'s Sweetheart."',
      vi: 'Được đặt tên theo Mary Pickford, nữ diễn viên phim câm nổi tiếng được biết đến là "Người tình của nước Mỹ."',
    },
  },

  taste: {
    profile: ['tropical', 'sweet', 'fruity'],
    description: {
      en: 'Bright and tropical with sweet pineapple leading the way, balanced by rum\'s warmth and subtle cherry-almond notes from maraschino. Grenadine adds a hint of pomegranate sweetness and a beautiful pink hue.',
      it: 'Brillante e tropicale con ananas dolce in testa, bilanciato dal calore del rum e sottili note di ciliegia-mandorla dal maraschino. La granatina aggiunge un tocco di dolcezza di melograno e una bella tonalità rosa.',
      vi: 'Tươi sáng và nhiệt đới với dứa ngọt dẫn đầu, cân bằng bởi sự ấm áp của rum và hương cherry-hạnh nhân tinh tế từ maraschino. Grenadine thêm một chút vị ngọt lựu và màu hồng đẹp.',
    },
    first_impression: {
      en: 'Sweet pineapple with a hint of cherry',
      it: 'Ananas dolce con un tocco di ciliegia',
      vi: 'Dứa ngọt với một chút cherry',
    },
    finish: {
      en: 'Clean, fruity finish with lingering tropical notes',
      it: 'Finale pulito e fruttato con note tropicali persistenti',
      vi: 'Kết thúc sạch sẽ, trái cây với hương nhiệt đới kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet and fruity with subtle complexity',
      it: 'Ben bilanciato tra dolce e fruttato con complessità sottile',
      vi: 'Cân bằng tốt giữa ngọt và trái cây với độ phức tạp tinh tế',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening', 'poolside'],
    occasions: ['brunch', 'tropical_party', 'celebration', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with tropical fruit, light seafood, grilled fish, or Asian-inspired appetizers. Pairs wonderfully with coconut shrimp, fish tacos, or fresh fruit salads.',
      it: 'Eccellente con frutta tropicale, frutti di mare leggeri, pesce alla griglia o antipasti di ispirazione asiatica. Si abbina magnificamente con gamberi al cocco, tacos di pesce o insalate di frutta fresca.',
      vi: 'Tuyệt vời với trái cây nhiệt đới, hải sản nhẹ, cá nướng hoặc món khai vị lấy cảm hứng từ châu Á. Kết hợp tuyệt vời với tôm dừa, tacos cá hoặc salad trái cây tươi.',
    },
    ideal_for: {
      en: 'Perfect for rum lovers and those who enjoy fruity, tropical cocktails. Ideal for anyone seeking a refreshing, easy-drinking cocktail with a touch of sophistication.',
      it: 'Perfetto per gli amanti del rum e per chi ama cocktail fruttati e tropicali. Ideale per chi cerca un cocktail rinfrescante e facile da bere con un tocco di sofisticatezza.',
      vi: 'Hoàn hảo cho người yêu rum và những ai thích cocktail trái cây, nhiệt đới. Lý tưởng cho bất kỳ ai tìm kiếm cocktail sảng khoái, dễ uống với một chút tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHITE_RUM',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Fresh pineapple juice', it: 'Succo di ananas fresco', vi: 'Nước dứa tươi' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Maraschino Luxardo', it: 'Maraschino Luxardo', vi: 'Maraschino Luxardo' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 5, unit: 'ml' },
      display_name: { en: 'Grenadine syrup', it: 'Sciroppo di granatina', vi: 'Siro grenadine' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti nello shaker, shakerare bene con ghiaccio, filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail, lắc kỹ với đá, lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Maraschino cherry',
    it: 'Ciliegia maraschino',
    vi: 'Cherry maraschino',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHITE_RUM'],

  flavor_profile: ['tropical', 'sweet', 'fruity'],

  abv_estimate: 16, // ~16% ABV after dilution

  calories_estimate: 170,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'tropical_party', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['daiquiri', 'pina-colada', 'bacardi-cocktail'],

  notes_for_staff: 'Use fresh pineapple juice for best results. The drink should have a beautiful pink color from the grenadine. Shake well to properly mix and chill. Often served with a cherry garnish in homage to the maraschino.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/mary-pickford/',
    note: 'IBA Official Recipe. Historical information from Hotel Nacional Havana and Prohibition-era cocktail history.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
