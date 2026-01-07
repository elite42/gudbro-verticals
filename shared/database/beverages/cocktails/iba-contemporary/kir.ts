/**
 * IBA Contemporary Classics: Kir
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const kir: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
  slug: 'kir',
  stable_key: 'kir_iba_contemporary_classic',

  name: {
    en: 'Kir',
    it: 'Kir',
    vi: 'Kir',
    ko: '키르',
    ja: 'キール',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'french', 'aperitif', 'wine-based', 'elegant', 'simple'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A classic French apéritif combining dry white wine with a touch of crème de cassis. Elegant, simple, and quintessentially French - the perfect way to begin an evening.',
    it: 'Un classico aperitivo francese che combina vino bianco secco con un tocco di crème de cassis. Elegante, semplice e quintessenzialmente francese - il modo perfetto per iniziare una serata.',
    vi: 'Một aperitif Pháp cổ điển kết hợp rượu vang trắng khô với một chút crème de cassis. Thanh lịch, đơn giản và rất Pháp - cách hoàn hảo để bắt đầu buổi tối.',
  },

  history: {
    created_year: '1945',
    origin: {
      city: 'Dijon',
      bar: 'Unknown',
      country: 'France',
    },
    creator: {
      name: 'Félix Kir',
      profession: 'mayor',
    },
    story: {
      en: 'Named after Félix Kir, the mayor of Dijon, France, who popularized the drink after World War II. Originally called "blanc-cassis" (white-cassis), it was renamed in his honor. Kir served it to visiting dignitaries to promote local Burgundian products - Aligoté wine and crème de cassis from blackcurrants.',
      it: 'Prende il nome da Félix Kir, il sindaco di Digione, Francia, che rese popolare la bevanda dopo la Seconda Guerra Mondiale. Originariamente chiamato "blanc-cassis" (bianco-cassis), fu rinominato in suo onore. Kir lo serviva ai dignitari in visita per promuovere i prodotti locali della Borgogna - vino Aligoté e crème de cassis da ribes nero.',
      vi: 'Được đặt theo tên Félix Kir, thị trưởng Dijon, Pháp, người đã phổ biến thức uống sau Thế chiến II. Ban đầu được gọi là "blanc-cassis" (trắng-cassis), nó được đổi tên để vinh danh ông. Kir phục vụ nó cho các chính khách đến thăm để quảng bá các sản phẩm địa phương Burgundy - rượu vang Aligoté và crème de cassis từ quả lý chua đen.',
    },
    named_after: {
      en: 'Named after Félix Kir, the mayor of Dijon who popularized the drink.',
      it: 'Prende il nome da Félix Kir, il sindaco di Digione che rese popolare la bevanda.',
      vi: 'Được đặt theo tên Félix Kir, thị trưởng Dijon người đã phổ biến thức uống.',
    },
  },

  taste: {
    profile: ['fruity', 'dry', 'light'],
    description: {
      en: 'Light, crisp, and refreshing with subtle blackcurrant sweetness complementing the dry white wine. Elegant and easy-drinking with beautiful berry aromatics.',
      it: 'Leggero, croccante e rinfrescante con sottile dolcezza di ribes nero che complementa il vino bianco secco. Elegante e facile da bere con bellissimi aromi di bacche.',
      vi: 'Nhẹ nhàng, giòn và sảng khoái với vị ngọt lý chua đen tinh tế bổ sung cho rượu vang trắng khô. Thanh lịch và dễ uống với hương quả mọng đẹp.',
    },
    first_impression: {
      en: 'Bright blackcurrant with crisp white wine',
      it: 'Ribes nero brillante con vino bianco croccante',
      vi: 'Lý chua đen sáng với rượu vang trắng giòn',
    },
    finish: {
      en: 'Clean, dry finish with lingering berry notes',
      it: 'Finale pulito e secco con note di bacche persistenti',
      vi: 'Kết thúc sạch, khô với hương quả mọng kéo dài',
    },
    balance: {
      en: 'Well-balanced between dry wine and sweet cassis',
      it: 'Ben bilanciato tra vino secco e cassis dolce',
      vi: 'Cân bằng tốt giữa rượu vang khô và cassis ngọt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['aperitif', 'casual', 'outdoor', 'french_dining'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Perfect as an apéritif before dinner. Pairs well with French cheeses, charcuterie, olives, and light appetizers.',
      it: 'Perfetto come aperitivo prima di cena. Si abbina bene con formaggi francesi, salumi, olive e antipasti leggeri.',
      vi: 'Hoàn hảo như một aperitif trước bữa tối. Kết hợp tốt với phô mai Pháp, thịt nguội, ô liu và món khai vị nhẹ.',
    },
    ideal_for: {
      en: 'Ideal for wine lovers seeking a lighter apéritif. Perfect for those who appreciate French elegance and simplicity.',
      it: "Ideale per gli amanti del vino che cercano un aperitivo più leggero. Perfetto per chi apprezza l'eleganza e la semplicità francese.",
      vi: 'Lý tưởng cho người yêu rượu vang tìm kiếm aperitif nhẹ hơn. Hoàn hảo cho những ai đánh giá cao sự thanh lịch và đơn giản của Pháp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_DRY_WHITE_WINE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: {
        en: 'Dry white wine (preferably Aligoté)',
        it: 'Vino bianco secco (preferibilmente Aligoté)',
        vi: 'Rượu vang trắng khô (tốt nhất là Aligoté)',
      },
    },
    {
      ingredient_id: 'ING_CREME_DE_CASSIS',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Crème de Cassis', it: 'Crème de Cassis', vi: 'Crème de Cassis' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour crème de cassis into a wine glass. Top with chilled white wine. Stir gently. No garnish required.',
    it: 'Versare la crème de cassis in un bicchiere da vino. Completare con vino bianco freddo. Mescolare delicatamente. Nessuna guarnizione richiesta.',
    vi: 'Đổ crème de cassis vào ly rượu vang. Rót rượu vang trắng lạnh lên trên. Khuấy nhẹ. Không cần trang trí.',
  },

  glass: 'White wine glass',

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
  base_spirits: ['ING_DRY_WHITE_WINE'],

  flavor_profile: ['fruity', 'dry', 'light'],

  abv_estimate: 10,

  calories_estimate: 120,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitif', 'casual', 'outdoor', 'french_dining'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['kir-royale', 'kir-imperial', 'kir-breton'],

  notes_for_staff:
    'Traditionally made with Burgundian Aligoté wine, but any dry white wine works. The Kir Royale variation uses champagne instead of white wine. Ratio can be adjusted - typically 1:9 cassis to wine. Serve well chilled.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/kir/',
    notes: 'IBA Official Recipe. Traditional French apéritif.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
