/**
 * Famous Cocktails: Navy Grog
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const navyGrog: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
  slug: 'navy-grog',
  stable_key: 'navy_grog_famous_tiki_tropical_cocktail',

  name: {
    en: 'Navy Grog',
    it: 'Navy Grog',
    vi: 'Navy Grog',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'citrus', 'strong'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Navy Grog is a classic tiki cocktail created by Don the Beachcomber, featuring three types of rum with honey, citrus, and club soda. Traditionally served with an ice cone, this refreshing yet potent drink honors naval grog traditions with a tiki twist.',
    it: 'Il Navy Grog è un classico cocktail tiki creato da Don the Beachcomber, che presenta tre tipi di rum con miele, agrumi e club soda. Tradizionalmente servito con un cono di ghiaccio, questa bevanda rinfrescante ma potente onora le tradizioni del grog navale con un tocco tiki.',
    vi: 'Navy Grog là một loại cocktail tiki cổ điển được tạo ra bởi Don the Beachcomber, có ba loại rum với mật ong, cam quýt và soda. Thường được phục vụ với một hình nón đá, thức uống sảng khoái nhưng mạnh mẽ này tôn vinh truyền thống grog hải quân với twist tiki.',
  },

  history: {
    created_year: '1941',
    origin: {
      city: 'Hollywood',
      bar: 'Don the Beachcomber',
      country: 'USA',
    },
    creator: {
      name: 'Ernest Raymond Beaumont Gantt (Donn Beach)',
      profession: 'bartender',
    },
    story: {
      en: 'The Navy Grog was created in 1941 by Ernest Raymond Beaumont Gantt, better known as Don the Beachcomber, at his Hollywood restaurant. The drink pays homage to traditional naval grog - the rum ration given to British sailors since the 18th century. Don\'s version elevated the simple rum-and-water mixture into a sophisticated tiki cocktail by combining three different rums with honey, fresh citrus, and club soda. The signature presentation features a carved ice cone in the center of the glass, which slowly dilutes the drink as it melts. During World War II, the Navy Grog became particularly popular with servicemen on leave. The recipe remained a closely guarded secret for decades.',
      it: 'Il Navy Grog fu creato nel 1941 da Ernest Raymond Beaumont Gantt, meglio noto come Don the Beachcomber, nel suo ristorante di Hollywood. La bevanda rende omaggio al tradizionale grog navale - la razione di rum data ai marinai britannici dal XVIII secolo. La versione di Don ha elevato la semplice miscela di rum e acqua in un sofisticato cocktail tiki combinando tre diversi rum con miele, agrumi freschi e club soda. La presentazione distintiva presenta un cono di ghiaccio scolpito al centro del bicchiere, che diluisce lentamente la bevanda mentre si scioglie. Durante la seconda guerra mondiale, il Navy Grog divenne particolarmente popolare tra i militari in licenza. La ricetta rimase un segreto custodito gelosamente per decenni.',
      vi: 'Navy Grog được tạo ra năm 1941 bởi Ernest Raymond Beaumont Gantt, được biết đến nhiều hơn với tên Don the Beachcomber, tại nhà hàng Hollywood của ông. Thức uống tôn vinh grog hải quân truyền thống - khẩu phần rum được cung cấp cho các thủy thủ Anh từ thế kỷ 18. Phiên bản của Don đã nâng hỗn hợp rum và nước đơn giản thành một loại cocktail tiki tinh tế bằng cách kết hợp ba loại rum khác nhau với mật ong, cam quýt tươi và soda. Cách trình bày đặc trưng có hình nón đá chạm khắc ở giữa ly, từ từ pha loãng thức uống khi nó tan chảy. Trong Thế chiến II, Navy Grog trở nên đặc biệt phổ biến với quân nhân đang nghỉ phép. Công thức vẫn là một bí mật được giữ kín trong nhiều thập kỷ.',
    },
    named_after: {
      en: 'Named after traditional naval grog, the daily rum ration given to British Royal Navy sailors from 1740 to 1970.',
      it: 'Prende il nome dal tradizionale grog navale, la razione giornaliera di rum data ai marinai della Royal Navy britannica dal 1740 al 1970.',
      vi: 'Được đặt theo tên grog hải quân truyền thống, khẩu phần rum hàng ngày được cung cấp cho các thủy thủ Hải quân Hoàng gia Anh từ 1740 đến 1970.',
    },
  },

  taste: {
    profile: ['citrus', 'refreshing', 'strong'],
    description: {
      en: 'Bright and refreshing with complex rum depth and honeyed citrus character. The Navy Grog balances three different rums with tart grapefruit and lime, sweetened with honey and lengthened with soda. The ice cone provides controlled dilution, making it refreshing yet substantial.',
      it: 'Brillante e rinfrescante con profondità di rum complessa e carattere di agrumi al miele. Il Navy Grog bilancia tre diversi rum con pompelmo aspro e lime, addolcito con miele e allungato con soda. Il cono di ghiaccio fornisce diluizione controllata, rendendolo rinfrescante ma sostanzioso.',
      vi: 'Sáng và sảng khoái với chiều sâu rum phức tạp và đặc tính cam quýt mật ong. Navy Grog cân bằng ba loại rum khác nhau với bưởi chua và chanh xanh, làm ngọt bằng mật ong và kéo dài với soda. Hình nón đá cung cấp sự pha loãng có kiểm soát, làm cho nó sảng khoái nhưng đáng kể.',
    },
    first_impression: {
      en: 'Bright citrus and honey hit first, followed by the complex warmth of triple rum blend',
      it: 'Agrumi brillanti e miele colpiscono per primi, seguiti dal calore complesso della miscela tripla di rum',
      vi: 'Cam quýt sáng và mật ong xuất hiện đầu tiên, theo sau là sự ấm áp phức tạp của hỗn hợp rum ba',
    },
    finish: {
      en: 'Long, refreshing finish with lingering citrus and subtle rum complexity, smoothed by honey',
      it: 'Finale lungo e rinfrescante con agrumi persistenti e sottile complessità del rum, levigato dal miele',
      vi: 'Kết thúc dài, sảng khoái với cam quýt kéo dài và độ phức tạp tinh tế của rum, làm mịn bằng mật ong',
    },
    balance: {
      en: 'Well-balanced between strong rum foundation and refreshing citrus-soda lift, honey provides smooth integration',
      it: 'Ben bilanciato tra forte fondazione di rum e rinfrescante sollevamento di agrumi-soda, il miele fornisce un\'integrazione liscia',
      vi: 'Cân bằng tốt giữa nền rum mạnh và sự nâng cam quýt-soda sảng khoái, mật ong cung cấp sự tích hợp mịn màng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['tiki_bar', 'summer_gathering', 'outdoor_party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Caribbean jerk dishes, grilled seafood, fish tacos, or Polynesian appetizers. Also pairs well with spicy Asian cuisine and tropical fruit salads.',
      it: 'Perfetto con piatti jerk caraibici, frutti di mare alla griglia, tacos di pesce o antipasti polinesiani. Si abbina bene anche con cucina asiatica piccante e insalate di frutta tropicale.',
      vi: 'Hoàn hảo với món jerk Caribbean, hải sản nướng, tacos cá hoặc món khai vị Polynesia. Cũng kết hợp tốt với ẩm thực châu Á cay và salad trái cây nhiệt đới.',
    },
    ideal_for: {
      en: 'Perfect for tiki purists and rum enthusiasts seeking an authentic Don the Beachcomber experience. Ideal for those who appreciate balanced, citrus-forward cocktails with serious rum complexity. Great for hot weather refreshment.',
      it: 'Perfetto per i puristi del tiki e gli appassionati di rum che cercano un\'autentica esperienza Don the Beachcomber. Ideale per chi apprezza cocktail equilibrati orientati agli agrumi con seria complessità del rum. Ottimo per rinfrescarsi con il caldo.',
      vi: 'Hoàn hảo cho những người theo chủ nghĩa thuần túy tiki và những người đam mê rum tìm kiếm trải nghiệm Don the Beachcomber chính thống. Lý tưởng cho những ai đánh giá cao cocktail cân bằng, hướng về cam quýt với độ phức tạp rum nghiêm túc. Tuyệt vời cho làm mát thời tiết nóng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Dark rum (Jamaican)', it: 'Rum scuro (giamaicano)', vi: 'Rum đen (Jamaica)' },
    },
    {
      ingredient_id: 'ING_RUM_DEMERARA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Demerara rum', it: 'Rum Demerara', vi: 'Rum Demerara' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh xanh tươi' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh grapefruit juice', it: 'Succo di pompelmo fresco', vi: 'Nước bưởi tươi' },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Honey syrup', it: 'Sciroppo di miele', vi: 'Xi-rô mật ong' },
    },
    {
      ingredient_id: 'ING_CLUB_SODA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Club soda', it: 'Club soda', vi: 'Soda' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients except club soda to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Pour unstrained into a double old-fashioned glass. Add club soda. Traditionally, place an ice cone in the center of the drink. Garnish with mint sprig.',
    it: 'Aggiungere tutti gli ingredienti tranne club soda in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Versare senza filtrare in un bicchiere double old-fashioned. Aggiungere club soda. Tradizionalmente, posizionare un cono di ghiaccio al centro della bevanda. Guarnire con rametto di menta.',
    vi: 'Thêm tất cả nguyên liệu ngoại trừ soda vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Đổ không lọc vào ly double old-fashioned. Thêm soda. Theo truyền thống, đặt một hình nón đá ở giữa thức uống. Trang trí với nhành bạc hà.',
  },

  glass: 'Double old-fashioned',

  garnish: {
    en: 'Fresh mint sprig, ice cone (traditional)',
    it: 'Rametto di menta fresca, cono di ghiaccio (tradizionale)',
    vi: 'Nhành bạc hà tươi, hình nón đá (truyền thống)',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_RUM_DARK', 'ING_RUM_DEMERARA'],

  flavor_profile: ['citrus', 'refreshing', 'strong'],

  abv_estimate: 16,

  calories_estimate: 240,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

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
  occasion_tags: ['tiki_bar', 'summer_gathering', 'outdoor_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['don-the-beachcomber-navy-grog'],

  notes_for_staff: 'Original Don the Beachcomber recipe from 1941. Three-rum blend is essential - each rum adds unique character. Ice cone is traditional but optional - if making cone, carve from block ice. Honey syrup is 1:1 honey to water. Pour unstrained for authentic presentation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://beachbumberry.com/navy-grog.html',
    note: 'Original Don the Beachcomber recipe from 1941. Jeff "Beachbum" Berry\'s Sippin\' Safari. Tiki cocktail archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
