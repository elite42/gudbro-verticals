/**
 * IBA Unforgettables: Dry Martini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const dryMartini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '39a16b98-a41d-413e-b1e0-56fcb0e3b92d',
  slug: 'dry-martini',
  stable_key: '5ec734256276710893030132526aac5f78c81606',

  name: {
    en: 'Dry Martini',
    it: 'Dry Martini',
    vi: 'Dry Martini',
    ko: '드라이 마티니',
    ja: 'ドライマティーニ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'iconic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The quintessential cocktail. A timeless blend of gin and dry vermouth, the Dry Martini represents sophistication and elegance in its purest form.',
    it: 'Il cocktail per eccellenza. Una miscela senza tempo di gin e vermouth dry, il Dry Martini rappresenta la raffinatezza e l\'eleganza nella sua forma più pura.',
    vi: 'Cocktail tinh túy. Sự pha trộn vượt thời gian của gin và vermouth khô, Dry Martini thể hiện sự tinh tế và thanh lịch ở dạng thuần khiết nhất.',
  },

  history: {
    created_year: '1880',
    origin: {
      city: 'San Francisco',
      bar: 'Occidental Hotel',
      country: 'United States',
    },
    creator: {
      name: 'Jerry Thomas',
      profession: 'bartender',
    },
    story: {
      en: 'The Dry Martini\'s exact origins remain debated, with multiple theories. The most accepted version traces it to the 1880s Martinez cocktail, which evolved from sweet vermouth to dry vermouth as London Dry gin gained popularity. William Boothby provided possibly the earliest recipe for a "Dry Martini Cocktail" in his 1907 guide, attributing it to Charlie Shaw of Los Angeles. During Prohibition (1920-1933), the ease of illegal gin manufacture led to the Martini\'s rise as the dominant cocktail. Harry Craddock popularized it at the Savoy\'s American Bar in the 1930s.',
      it: 'Le origini esatte del Dry Martini sono dibattute, con molteplici teorie. La versione più accettata lo fa risalire al cocktail Martinez degli anni 1880, che si è evoluto dal vermouth dolce al vermouth dry con la popolarità del London Dry gin. William Boothby fornì probabilmente la prima ricetta di un "Dry Martini Cocktail" nella sua guida del 1907, attribuendola a Charlie Shaw di Los Angeles. Durante il Proibizionismo (1920-1933), la facilità di produzione illegale di gin portò all\'ascesa del Martini come cocktail dominante. Harry Craddock lo rese popolare all\'American Bar del Savoy negli anni \'30.',
      vi: 'Nguồn gốc chính xác của Dry Martini vẫn còn tranh cãi với nhiều lý thuyết. Phiên bản được chấp nhận nhất cho rằng nó bắt nguồn từ cocktail Martinez những năm 1880, phát triển từ vermouth ngọt sang vermouth khô khi London Dry gin trở nên phổ biến. William Boothby đưa ra công thức đầu tiên cho "Dry Martini Cocktail" trong hướng dẫn năm 1907, gán công cho Charlie Shaw ở Los Angeles. Trong thời kỳ Cấm rượu (1920-1933), việc sản xuất gin bất hợp pháp dễ dàng đã dẫn đến sự nổi lên của Martini như cocktail thống trị. Harry Craddock đã phổ biến nó tại American Bar của Savoy vào những năm 1930.',
    },
    named_after: {
      en: 'Likely evolved from the Martinez cocktail and the Martini & Rossi vermouth brand, though exact etymology is disputed.',
      it: 'Probabilmente evoluto dal cocktail Martinez e dal marchio di vermouth Martini & Rossi, anche se l\'etimologia esatta è controversa.',
      vi: 'Có thể phát triển từ cocktail Martinez và thương hiệu vermouth Martini & Rossi, mặc dù nguồn gốc chính xác vẫn còn tranh cãi.',
    },
  },

  taste: {
    profile: ['dry', 'botanical', 'crisp'],
    description: {
      en: 'The Dry Martini is a masterclass in minimalism. The dominant botanicals of London Dry gin are delicately tempered by the herbal complexity of dry vermouth, creating a sophisticated, spirit-forward cocktail with remarkable clarity and depth.',
      it: 'Il Dry Martini è un esempio di minimalismo. I botanici dominanti del London Dry gin sono delicatamente temperati dalla complessità erbacea del vermouth dry, creando un cocktail sofisticato, incentrato sullo spirito, con notevole chiarezza e profondità.',
      vi: 'Dry Martini là một kiệt tác tối giản. Các thảo mộc chủ đạo của London Dry gin được hòa quyện tinh tế với độ phức tạp thảo mộc của vermouth khô, tạo nên một cocktail tinh tế, tập trung vào rượu với độ trong trẻo và chiều sâu đáng chú ý.',
    },
    first_impression: {
      en: 'An initial wave of juniper and crisp gin botanicals, with a subtle herbal undercurrent from the vermouth. The cold temperature enhances the clarity and precision of flavors.',
      it: 'Un\'ondata iniziale di ginepro e botanici croccanti di gin, con una sottile corrente erbacea del vermouth. La temperatura fredda esalta la chiarezza e la precisione dei sapori.',
      vi: 'Làn sóng ban đầu của cây bách xù và thảo mộc gin giòn tan, với dòng chảy thảo mộc tinh tế từ vermouth. Nhiệt độ lạnh làm tăng độ trong trẻo và chính xác của hương vị.',
    },
    finish: {
      en: 'A clean, dry finish with lingering botanical notes and a subtle vermouth herbal complexity. The lemon oil garnish adds a bright, citrus accent that cuts through the spirit.',
      it: 'Un finale pulito e secco con note botaniche persistenti e una sottile complessità erbacea del vermouth. L\'olio di limone aggiunge un accento agrumato brillante che taglia lo spirito.',
      vi: 'Một hậu vị sạch, khô với các nốt thảo mộc kéo dài và độ phức tạp thảo mộc tinh tế của vermouth. Tinh dầu chanh tạo thêm điểm nhấn cam quýt tươi sáng cắt qua rượu mạnh.',
    },
    balance: {
      en: 'The classic 6:1 ratio showcases gin\'s character while the vermouth provides essential depth and complexity without sweetness. Perfectly balanced between strong and nuanced.',
      it: 'Il classico rapporto 6:1 mette in risalto il carattere del gin mentre il vermouth fornisce profondità e complessità essenziali senza dolcezza. Perfettamente bilanciato tra forte e sfumato.',
      vi: 'Tỷ lệ cổ điển 6:1 làm nổi bật tính cách của gin trong khi vermouth mang lại chiều sâu và độ phức tạp thiết yếu mà không có vị ngọt. Cân bằng hoàn hảo giữa mạnh mẽ và tinh tế.',
    },
  },

  recommendations: {
    best_time: ['evening', 'night'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'formal'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Oysters, caviar, smoked salmon, aged cheese, olives, salted nuts. The dry, botanical profile pairs excellently with briny, savory foods.',
      it: 'Ostriche, caviale, salmone affumicato, formaggio stagionato, olive, noci salate. Il profilo secco e botanico si abbina perfettamente con cibi salmastri e saporiti.',
      vi: 'Hàu, trứng cá muối, cá hồi hun khói, phô mai lâu năm, ô liu, hạt có muối. Hồ sơ khô, thảo mộc kết hợp tuyệt vời với thực phẩm mặn và đậm đà.',
    },
    ideal_for: {
      en: 'Those who appreciate spirit-forward cocktails and classic elegance. Perfect as a pre-dinner aperitif to stimulate the appetite.',
      it: 'Per chi apprezza i cocktail incentrati sullo spirito e l\'eleganza classica. Perfetto come aperitivo pre-cena per stimolare l\'appetito.',
      vi: 'Dành cho những ai đánh giá cao cocktail tập trung vào rượu mạnh và sự thanh lịch cổ điển. Hoàn hảo như một aperitif trước bữa tối để kích thích khẩu vị.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_DRY',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Dry Vermouth', it: 'Vermouth Dry', vi: 'Vermouth khô' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into mixing glass with ice cubes. Stir well until properly chilled. Strain into chilled martini cocktail glass.',
    it: 'Versare tutti gli ingredienti nel mixing glass con cubetti di ghiaccio. Mescolare bene fino a quando ben raffreddato. Filtrare nel bicchiere da cocktail martini ghiacciato.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn với đá viên. Khuấy đều cho đến khi lạnh đúng mức. Lọc vào ly cocktail martini đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Squeeze oil from lemon peel onto the drink, or garnish with green olives if requested.',
    it: 'Spremere l\'olio dalla scorza di limone sulla bevanda, oppure guarnire con olive verdi se richiesto.',
    vi: 'Vắt tinh dầu từ vỏ chanh lên đồ uống, hoặc trang trí bằng ô liu xanh nếu được yêu cầu.',
  },

  ice: 'none',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['boozy', 'dry', 'botanical', 'crisp'],
  abv_estimate: 32,
  calories_estimate: 140,
  difficulty: 'easy',
  prep_time_seconds: 120,

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
  season_tags: ['all_year'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'formal'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    {
      name: 'Dirty Martini',
      description: 'Add olive brine for a savory twist',
    },
    {
      name: 'Gibson',
      description: 'Garnished with cocktail onions instead of olives',
    },
    {
      name: 'Vesper',
      description: 'James Bond\'s version with vodka and Lillet Blanc',
    },
  ],

  notes_for_staff: 'Always use fresh, cold vermouth. Stirring (not shaking) is essential for proper dilution and clarity. Chill glass in freezer beforehand. Some guests prefer "extra dry" (less vermouth) or "wet" (more vermouth) - always ask preference.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/dry-martini/',
    note: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
