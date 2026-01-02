/**
 * Famous Cocktails: Southside
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const southside: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7f3d8e2-4b1c-4a9e-8d5f-1c2e3f4a5b6c',
  slug: 'southside',
  stable_key: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3',

  name: {
    en: 'Southside',
    it: 'Southside',
    vi: 'Southside',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'refreshing', 'minty'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshing gin cocktail with fresh mint, lime, and simple syrup. Often called the "gin mojito," the Southside is a classic Prohibition-era drink that balances botanical gin with bright citrus and cooling mint.',
    it: 'Un cocktail rinfrescante al gin con menta fresca, lime e sciroppo semplice. Spesso chiamato il "mojito al gin," il Southside è un classico drink dell\'era del Proibizionismo che bilancia il gin botanico con agrumi brillanti e menta rinfrescante.',
    vi: 'Một loại cocktail gin sảng khoái với bạc hà tươi, chanh và xi-rô đơn giản. Thường được gọi là "gin mojito," Southside là thức uống cổ điển thời kỳ Cấm rượu cân bằng gin thực vật với cam quýt tươi sáng và bạc hà mát lạnh.',
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Chicago',
      bar: '21 Club',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Southside emerged during Prohibition in the 1920s, with disputed origins between New York\'s 21 Club and Chicago\'s South Side gangsters. Some believe it was created to mask the harsh taste of bathtub gin with fresh mint and citrus. The drink became a sophisticated staple at speakeasies and has remained popular ever since.',
      it: 'Il Southside emerse durante il Proibizionismo negli anni \'20, con origini contese tra il 21 Club di New York e i gangster del South Side di Chicago. Alcuni credono che sia stato creato per mascherare il sapore aspro del gin fatto in casa con menta fresca e agrumi. Il drink divenne un elemento sofisticato degli speakeasy ed è rimasto popolare da allora.',
      vi: 'Southside xuất hiện trong thời kỳ Cấm rượu những năm 1920, với nguồn gốc tranh cãi giữa 21 Club của New York và băng đảng South Side Chicago. Một số người tin rằng nó được tạo ra để che giấu vị gin tự chưng khó chịu bằng bạc hà tươi và cam quýt. Thức uống đã trở thành món chính tinh tế tại các quán rượu lậu và vẫn phổ biến kể từ đó.',
    },
    named_after: {
      en: 'Likely named after the South Side of Chicago, where gangsters allegedly enjoyed this drink during Prohibition.',
      it: 'Probabilmente prende il nome dal South Side di Chicago, dove i gangster presumibilmente gustavano questo drink durante il Proibizionismo.',
      vi: 'Có thể được đặt theo tên South Side của Chicago, nơi các gangster được cho là thích thức uống này trong thời kỳ Cấm rượu.',
    },
  },

  taste: {
    profile: ['refreshing', 'citrus', 'herbal'],
    description: {
      en: 'Bright and refreshing with a perfect balance of tart lime, aromatic gin botanicals, and cooling fresh mint. The simple syrup rounds out the edges for a smooth, elegant finish.',
      it: 'Brillante e rinfrescante con un perfetto equilibrio di lime aspro, botanici aromatici del gin e menta fresca rinfrescante. Lo sciroppo semplice arrotonda i bordi per un finale liscio ed elegante.',
      vi: 'Tươi sáng và sảng khoái với sự cân bằng hoàn hảo của chanh chua, thực vật thơm của gin và bạc hà tươi mát lạnh. Xi-rô đơn giản làm tròn các cạnh cho kết thúc mượt mà, thanh lịch.',
    },
    first_impression: {
      en: 'Fresh mint aroma hits first, followed by bright lime and botanical gin notes',
      it: 'L\'aroma di menta fresca colpisce per primo, seguito da note brillanti di lime e gin botanico',
      vi: 'Hương bạc hà tươi đập vào đầu tiên, tiếp theo là chanh tươi sáng và nốt gin thực vật',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering mint and subtle juniper',
      it: 'Finale pulito e rinfrescante con menta persistente e ginepro sottile',
      vi: 'Kết thúc sạch, sảng khoái với bạc hà kéo dài và hương bách xù tinh tế',
    },
    balance: {
      en: 'Perfectly balanced between tart, sweet, and herbal - refreshing without being cloying',
      it: 'Perfettamente bilanciato tra aspro, dolce ed erbaceo - rinfrescante senza essere stucchevole',
      vi: 'Cân bằng hoàn hảo giữa chua, ngọt và thảo mộc - sảng khoái mà không quá ngọt gắt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'garden_party', 'date_night', 'aperitivo'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with light seafood, fresh salads, goat cheese, or as a pre-dinner aperitif. Pairs wonderfully with Mediterranean dishes and fresh herbs.',
      it: 'Eccellente con pesce leggero, insalate fresche, formaggio di capra, o come aperitivo pre-cena. Si abbina meravigliosamente con piatti mediterranei ed erbe fresche.',
      vi: 'Tuyệt vời với hải sản nhẹ, salad tươi, phô mai dê, hoặc làm khai vị trước bữa tối. Kết hợp tuyệt vời với các món Địa Trung Hải và thảo mộc tươi.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who enjoy fresh, herbaceous cocktails. An excellent choice for warm weather or anyone seeking a sophisticated alternative to the mojito.',
      it: 'Perfetto per gli amanti del gin che apprezzano cocktail freschi ed erbacei. Un\'eccellente scelta per il clima caldo o per chiunque cerchi un\'alternativa sofisticata al mojito.',
      vi: 'Hoàn hảo cho người yêu gin thích cocktail tươi mát, thảo mộc. Lựa chọn tuyệt vời cho thời tiết ấm hoặc bất kỳ ai tìm kiếm giải pháp thay thế tinh tế cho mojito.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Xi-rô đơn giản' },
    },
    {
      ingredient_id: 'ING_MINT_LEAVES',
      quantity: { amount: 8, unit: 'leaves' },
      display_name: { en: 'Fresh mint leaves', it: 'Foglie di menta fresca', vi: 'Lá bạc hà tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add mint leaves, lime juice, and simple syrup to a cocktail shaker and gently muddle. Add gin and ice, then shake vigorously until well-chilled. Double strain into a chilled coupe glass. Garnish with a fresh mint sprig.',
    it: 'Aggiungere foglie di menta, succo di lime e sciroppo semplice in uno shaker e pestare delicatamente. Aggiungere gin e ghiaccio, quindi shakerare vigorosamente fino a raffreddare bene. Filtrare doppiamente in una coppa raffreddata. Guarnire con un rametto di menta fresca.',
    vi: 'Thêm lá bạc hà, nước chanh và xi-rô đơn giản vào bình lắc cocktail và nhẹ nhàng giã. Thêm gin và đá, sau đó lắc mạnh cho đến khi lạnh kỹ. Lọc hai lần vào ly coupe đã làm lạnh. Trang trí với cành bạc hà tươi.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Fresh mint sprig',
    it: 'Rametto di menta fresca',
    vi: 'Cành bạc hà tươi',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['refreshing', 'citrus', 'herbal'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  occasion_tags: ['brunch', 'garden_party', 'date_night', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['southside-royale', 'southside-fizz'],

  notes_for_staff: 'Muddle mint gently to avoid bitterness. Double strain to remove mint particles. Use fresh lime juice only - never bottled. Can be served fizz-style by topping with champagne.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://punchdrink.com/articles/southside-cocktail-recipe-gin-mint-lime/',
    note: 'Classic Prohibition-era recipe. Historical information from cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
