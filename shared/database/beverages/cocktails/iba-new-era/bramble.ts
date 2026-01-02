/**
 * IBA New Era Drinks: Bramble
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bramble: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
  slug: 'bramble',
  stable_key: 'd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9',

  name: {
    en: 'Bramble',
    it: 'Bramble',
    vi: 'Bramble',
    ko: '브램블',
    ja: 'ブランブル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'gin', 'blackberry', 'british', 'fruity'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern British classic combining gin with fresh lemon juice and crème de mûre (blackberry liqueur). This elegant cocktail features a beautiful berry cascade and perfectly balanced sweet-tart flavors.',
    it: 'Un classico britannico moderno che combina gin con succo di limone fresco e crème de mûre (liquore di mora). Questo cocktail elegante presenta una bellissima cascata di bacche e sapori dolci-aspri perfettamente bilanciati.',
    vi: 'Một cocktail Anh hiện đại kết hợp gin với nước chanh tươi và crème de mûre (rượu mùi dâu đen). Cocktail thanh lịch này có dòng chảy quả mọng đẹp mắt và hương vị ngọt-chua cân bằng hoàn hảo.',
  },

  history: {
    created_year: '1984',
    origin: {
      city: 'London',
      bar: 'Fred\'s Club',
      country: 'UK',
    },
    creator: {
      name: 'Dick Bradsell',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 1984 by legendary bartender Dick Bradsell at Fred\'s Club in London. Inspired by his memories of picking wild blackberries on the Isle of Wight as a child, Bradsell created this gin cocktail that celebrates British ingredients and flavors. The drink became one of the defining cocktails of the modern British cocktail renaissance and showcases Bradsell\'s talent for creating accessible yet sophisticated drinks.',
      it: 'Creato nel 1984 dal leggendario barman Dick Bradsell al Fred\'s Club di Londra. Ispirato dai suoi ricordi di raccolta di more selvatiche sull\'Isola di Wight da bambino, Bradsell creò questo cocktail gin che celebra ingredienti e sapori britannici. La bevanda divenne uno dei cocktail definitivi del rinascimento dei cocktail britannici moderni e mostra il talento di Bradsell nel creare bevande accessibili ma sofisticate.',
      vi: 'Được tạo ra năm 1984 bởi bartender huyền thoại Dick Bradsell tại Fred\'s Club ở London. Lấy cảm hứng từ ký ức hái dâu đen hoang dã trên Isle of Wight khi còn nhỏ, Bradsell đã tạo ra cocktail gin này tôn vinh nguyên liệu và hương vị Anh. Thức uống trở thành một trong những cocktail xác định của thời kỳ phục hưng cocktail Anh hiện đại và thể hiện tài năng của Bradsell trong việc tạo ra đồ uống dễ tiếp cận nhưng tinh tế.',
    },
    named_after: {
      en: 'Named after bramble bushes, the thorny plants that produce blackberries in the British countryside.',
      it: 'Prende il nome dai rovi, le piante spinose che producono more nella campagna britannica.',
      vi: 'Được đặt theo tên bụi gai, cây gai có gai sản xuất dâu đen ở vùng nông thôn Anh.',
    },
  },

  taste: {
    profile: ['fruity', 'tart', 'refreshing'],
    description: {
      en: 'Bright gin botanicals with tart lemon and sweet blackberry liqueur. The berry flavor adds depth while maintaining refreshing citrus notes. Complex and beautifully balanced.',
      it: 'Botanici brillanti di gin con limone aspro e dolce liquore di mora. Il sapore di bacche aggiunge profondità mantenendo note di agrumi rinfrescanti. Complesso e magnificamente bilanciato.',
      vi: 'Thảo mộc gin tươi sáng với chanh chua và rượu mùi dâu đen ngọt. Hương vị quả mọng tăng thêm độ sâu trong khi duy trì hương cam quýt sảng khoái. Phức tạp và cân bằng đẹp mắt.',
    },
    first_impression: {
      en: 'Bright gin and lemon with sweet blackberry undertones',
      it: 'Gin e limone brillanti con sfumature dolci di mora',
      vi: 'Gin và chanh tươi mát với hương dâu đen ngọt ngào',
    },
    finish: {
      en: 'Long finish with lingering berry sweetness and gin botanicals',
      it: 'Finale lungo con dolcezza persistente di bacche e botanici di gin',
      vi: 'Kết thúc dài với vị ngọt quả mọng kéo dài và thảo mộc gin',
    },
    balance: {
      en: 'Perfectly balanced between gin dryness, lemon tartness, and blackberry sweetness',
      it: 'Perfettamente bilanciato tra secchezza del gin, acidità del limone e dolcezza della mora',
      vi: 'Cân bằng hoàn hảo giữa độ khô gin, vị chua chanh và vị ngọt dâu đen',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['garden_party', 'brunch', 'date_night', 'summer_gathering'],
    seasons: ['summer', 'spring', 'autumn'],
    food_pairings: {
      en: 'Excellent with British afternoon tea, scones with clotted cream, berry desserts, or light salads.',
      it: 'Eccellente con tè pomeridiano britannico, scones con panna rappresa, dessert ai frutti di bosco, o insalate leggere.',
      vi: 'Tuyệt vời với trà chiều Anh, scones với kem đặc, món tráng miệng quả mọng hoặc salad nhẹ.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who enjoy fruity, refreshing cocktails. Ideal for those seeking a sophisticated yet approachable British classic.',
      it: 'Perfetto per gli amanti del gin che apprezzano cocktail fruttati e rinfrescanti. Ideale per chi cerca un classico britannico sofisticato ma accessibile.',
      vi: 'Hoàn hảo cho người yêu gin thích cocktail trái cây, sảng khoái. Lý tưởng cho những ai tìm kiếm cocktail Anh cổ điển tinh tế nhưng dễ tiếp cận.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 12.5, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_CREME_DE_MURE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Crème de mûre', it: 'Crème de mûre', vi: 'Crème de mûre' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Build gin, lemon juice, and simple syrup in a rocks glass filled with crushed ice. Stir gently. Drizzle crème de mûre over the top to create a "bleeding" effect.',
    it: 'Costruire gin, succo di limone e sciroppo semplice in un bicchiere rocks pieno di ghiaccio tritato. Mescolare delicatamente. Versare a filo crème de mûre sopra per creare un effetto "sanguinante".',
    vi: 'Pha gin, nước chanh và siro đường trong ly rocks đầy đá viên. Khuấy nhẹ nhàng. Rưới crème de mûre lên trên để tạo hiệu ứng "chảy máu".',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Fresh blackberries and lemon slice',
    it: 'More fresche e fetta di limone',
    vi: 'Dâu đen tươi và lát chanh',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['fruity', 'tart', 'refreshing'],

  abv_estimate: 15,

  calories_estimate: 190,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['summer', 'spring', 'autumn'],
  occasion_tags: ['garden_party', 'brunch', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bramble-royale'],

  notes_for_staff: 'Drizzle crème de mûre slowly over crushed ice to create the signature "bleeding" cascade effect. Fresh blackberries enhance presentation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/bramble/',
    note: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
