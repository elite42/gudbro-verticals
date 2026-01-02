/**
 * Famous Cocktails: Corpse Reviver No. 1
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const corpseReviverNo1: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a8b9c0d1-e2f3-4a4b-5c6d-7e8f9a0b1c2d',
  slug: 'corpse-reviver-no1',
  stable_key: 'h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7',

  name: {
    en: 'Corpse Reviver No. 1',
    it: 'Corpse Reviver No. 1',
    vi: 'Corpse Reviver No. 1',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'brandy', 'medicinal', 'hangover-cure'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A spirit-forward hangover remedy from the golden age of cocktails. The Corpse Reviver No. 1 combines cognac, calvados, and sweet vermouth into a warming, restorative drink. Less famous than its gin-based sibling (No. 2), this brandy version was designed to literally "revive a corpse" - or at least cure a brutal hangover.',
    it: 'Un rimedio per i postumi della sbornia spirit-forward dall\'età d\'oro dei cocktail. Il Corpse Reviver No. 1 combina cognac, calvados e vermouth dolce in una bevanda calda e rigenerante. Meno famoso del suo fratello a base di gin (No. 2), questa versione brandy è stata progettata per letteralmente "rianimare un cadavere" - o almeno curare una brutale sbornia.',
    vi: 'Một phương thuốc giải rượu hướng rượu mạnh từ thời kỳ hoàng kim của cocktail. Corpse Reviver No. 1 kết hợp cognac, calvados và vermouth ngọt thành thức uống ấm áp, phục hồi. Ít nổi tiếng hơn anh em họ dựa trên gin (No. 2), phiên bản brandy này được thiết kế để nghĩa đen "hồi sinh một xác chết" - hoặc ít nhất là chữa khỏi cơn say tàn khốc.',
  },

  history: {
    created_year: '1871',
    origin: {
      city: 'London',
      bar: 'Unknown',
      country: 'United Kingdom',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Corpse Reviver family of cocktails originated in the late 19th century as supposed hangover cures - drinks taken in the morning to "revive" the drinker after a night of excess. The No. 1 version first appeared in print in the 1871 book "The Gentleman\'s Table Guide" by E. Ricket and C. Thomas. Harry Craddock later included it in his seminal 1930 "Savoy Cocktail Book," noting it was "to be taken before 11 a.m., or whenever steam and energy are needed." The drink combines French brandy with apple brandy and vermouth for a warming, fortifying effect. While the gin-based Corpse Reviver No. 2 eventually became more popular, the No. 1 remains a favorite among brandy enthusiasts and hangover sufferers.',
      it: 'La famiglia di cocktail Corpse Reviver ha avuto origine alla fine del XIX secolo come presunte cure per i postumi della sbornia - bevande prese al mattino per "rianimare" il bevitore dopo una notte di eccessi. La versione No. 1 apparve per la prima volta in stampa nel libro del 1871 "The Gentleman\'s Table Guide" di E. Ricket e C. Thomas. Harry Craddock la incluse successivamente nel suo fondamentale "Savoy Cocktail Book" del 1930, notando che doveva essere presa "prima delle 11, o ogni volta che sono necessari vapore ed energia." La bevanda combina brandy francese con brandy di mele e vermouth per un effetto caldo e fortificante. Mentre il Corpse Reviver No. 2 a base di gin alla fine divenne più popolare, il No. 1 rimane un favorito tra gli appassionati di brandy e chi soffre di postumi.',
      vi: 'Họ cocktail Corpse Reviver bắt nguồn từ cuối thế kỷ 19 như những phương thuốc giải say được cho là - đồ uống dùng vào buổi sáng để "hồi sinh" người uống sau một đêm quá trớn. Phiên bản No. 1 lần đầu xuất hiện trên ấn phẩm trong cuốn sách năm 1871 "The Gentleman\'s Table Guide" của E. Ricket và C. Thomas. Harry Craddock sau đó đưa nó vào cuốn "Savoy Cocktail Book" năm 1930, lưu ý rằng nó "được dùng trước 11 giờ sáng, hoặc bất cứ khi nào cần năng lượng." Thức uống kết hợp brandy Pháp với brandy táo và vermouth để tạo hiệu ứng ấm áp, tăng cường. Trong khi Corpse Reviver No. 2 dựa trên gin cuối cùng trở nên phổ biến hơn, No. 1 vẫn là lựa chọn yêu thích trong số những người đam mê brandy và người bị say.',
    },
    named_after: {
      en: 'Named for its supposed ability to "revive a corpse" - Victorian slang for curing a severe hangover.',
      it: 'Prende il nome dalla sua presunta capacità di "rianimare un cadavere" - slang vittoriano per curare una grave sbornia.',
      vi: 'Được đặt theo khả năng được cho là "hồi sinh một xác chết" - tiếng lóng thời Victoria để chữa khỏi cơn say nặng.',
    },
  },

  taste: {
    profile: ['boozy', 'warming', 'fruity'],
    description: {
      en: 'Rich, warming, and spirit-forward. The Corpse Reviver No. 1 balances the grape warmth of cognac with the apple notes of calvados, while sweet vermouth adds herbal complexity. It\'s a serious, contemplative drink - more medicinal than refreshing.',
      it: 'Ricco, caldo e spirit-forward. Il Corpse Reviver No. 1 bilancia il calore dell\'uva del cognac con le note di mela del calvados, mentre il vermouth dolce aggiunge complessità erbacee. È una bevanda seria e contemplativa - più medicinale che rinfrescante.',
      vi: 'Đậm đà, ấm áp và hướng rượu mạnh. Corpse Reviver No. 1 cân bằng độ ấm nho của cognac với hương táo của calvados, trong khi vermouth ngọt thêm sự phức tạp thảo mộc. Đây là thức uống nghiêm túc, trầm tư - giống thuốc hơn là sảng khoái.',
    },
    first_impression: {
      en: 'Rich brandy warmth with apple and grape notes emerging',
      it: 'Ricco calore del brandy con note di mela e uva che emergono',
      vi: 'Độ ấm brandy đậm đà với hương táo và nho hiện ra',
    },
    finish: {
      en: 'Long, warming finish with lingering brandy, apple, and herbal vermouth notes',
      it: 'Finale lungo e caldo con brandy persistente, mela e note erbacee del vermouth',
      vi: 'Kết thúc dài, ấm áp với brandy kéo dài, táo và hương thảo mộc vermouth',
    },
    balance: {
      en: 'Heavily spirit-forward with vermouth providing subtle sweetness and herbal balance',
      it: 'Fortemente spirit-forward con vermouth che fornisce sottile dolcezza e equilibrio erbaceo',
      vi: 'Rất hướng rượu mạnh với vermouth cung cấp vị ngọt tinh tế và cân bằng thảo mộc',
    },
  },

  recommendations: {
    best_time: ['morning', 'brunch'],
    occasions: ['hangover-cure', 'brunch', 'digestivo'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Traditionally taken on its own as a morning restorative. If food is needed, pairs with hearty breakfast items, charcuterie, or aged cheeses.',
      it: 'Tradizionalmente preso da solo come ricostituente mattutino. Se è necessario cibo, si abbina con piatti sostanziosi per colazione, salumi o formaggi stagionati.',
      vi: 'Truyền thống uống một mình như một chất phục hồi buổi sáng. Nếu cần thức ăn, kết hợp với món ăn sáng đậm đà, charcuterie hoặc phô mai ủ lâu năm.',
    },
    ideal_for: {
      en: 'Perfect for brandy lovers and those seeking a traditional hangover remedy. Ideal for adventurous drinkers who appreciate spirit-forward, historical cocktails. Best served to those who need "steam and energy."',
      it: 'Perfetto per gli amanti del brandy e chi cerca un rimedio tradizionale per i postumi. Ideale per bevitori avventurosi che apprezzano cocktail spirit-forward e storici. Meglio servito a chi ha bisogno di "vapore ed energia."',
      vi: 'Hoàn hảo cho người yêu brandy và những ai tìm kiếm phương thuốc giải say truyền thống. Lý tưởng cho người uống phiêu lưu đánh giá cao cocktail hướng rượu mạnh, lịch sử. Tốt nhất phục vụ cho những ai cần "năng lượng."',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_CALVADOS',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Calvados', it: 'Calvados', vi: 'Calvados' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass filled with ice. Stir gently for 30-40 seconds until well-chilled. Strain into a chilled cocktail glass. No garnish.',
    it: 'Versare tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 30-40 secondi fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Nessuna guarnizione.',
    vi: 'Đổ tất cả nguyên liệu vào ly pha trộn đầy đá. Khuấy nhẹ trong 30-40 giây cho đến khi lạnh kỹ. Lọc vào ly cocktail đã làm lạnh. Không trang trí.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC', 'ING_CALVADOS'],

  flavor_profile: ['boozy', 'warming', 'fruity'],

  abv_estimate: 30,

  calories_estimate: 190,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['brunch', 'digestivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['corpse-reviver-no2', 'between-the-sheets'],

  notes_for_staff: 'This is the less famous sibling of Corpse Reviver No. 2. Equal parts formula makes it easy to scale. Best served before 11am according to tradition. Can substitute other apple brandies if Calvados unavailable. Stir, don\'t shake.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 40,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/655/corpse-reviver-no1',
    note: 'Classic recipe from The Savoy Cocktail Book (1930) by Harry Craddock.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
