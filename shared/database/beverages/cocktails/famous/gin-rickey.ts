/**
 * Famous Cocktails: Gin Rickey
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const ginRickey: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c5d6e7f8-9012-3456-c901-345678901234',
  slug: 'gin-rickey',
  stable_key: 'a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',

  name: {
    en: 'Gin Rickey',
    it: 'Gin Rickey',
    vi: 'Gin Rickey',
    ko: '진 리키',
    ja: 'ジン・リッキー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'gin', 'lime', 'refreshing', 'classic', 'unsweetened'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshingly simple and unsweetened highball combining gin, fresh lime, and club soda. The Gin Rickey is one of the earliest American cocktails, prized for its crisp, clean taste without any added sugar.',
    it: 'Un highball rinfrescante, semplice e non zuccherato che combina gin, lime fresco e acqua di seltz. Il Gin Rickey è uno dei primi cocktail americani, apprezzato per il suo gusto frizzante e pulito senza zucchero aggiunto.',
    vi: 'Một highball tươi mát đơn giản và không đường kết hợp gin, chanh tươi và soda. Gin Rickey là một trong những cocktail Mỹ sớm nhất, được đánh giá cao vì hương vị sảng khoái, trong sạch mà không có đường bổ sung.',
  },

  history: {
    created_year: '1883',
    origin: {
      city: 'Washington, D.C.',
      bar: 'Shoomaker\'s Bar',
      country: 'USA',
    },
    creator: {
      name: 'George A. Williamson',
      profession: 'bartender',
    },
    story: {
      en: 'The Gin Rickey was created in 1883 by bartender George A. Williamson at Shoomaker\'s Bar in Washington, D.C. It was named after Colonel Joe Rickey, a Democratic lobbyist who frequented the bar. Originally made with bourbon, Colonel Rickey preferred it with gin, and that version became the classic. The Rickey was one of the first cocktails to use carbonated water and became extremely popular in the late 19th and early 20th centuries, particularly during hot Washington summers. It\'s notable for being unsweetened, making it refreshing without cloying.',
      it: 'Il Gin Rickey fu creato nel 1883 dal barman George A. Williamson allo Shoomaker\'s Bar a Washington, D.C. Fu chiamato così in onore del Colonnello Joe Rickey, un lobbista democratico che frequentava il bar. Originariamente fatto con bourbon, il Colonnello Rickey lo preferiva con gin, e quella versione divenne il classico. Il Rickey fu uno dei primi cocktail a usare acqua gassata e divenne estremamente popolare tra la fine del XIX e l\'inizio del XX secolo, in particolare durante le calde estati di Washington. È notevole per essere non zuccherato, rendendolo rinfrescante senza essere stucchevole.',
      vi: 'Gin Rickey được tạo ra vào năm 1883 bởi bartender George A. Williamson tại Shoomaker\'s Bar ở Washington, D.C. Nó được đặt theo tên Đại tá Joe Rickey, một vận động hành lang Dân chủ thường lui tới quán bar. Ban đầu được làm với bourbon, Đại tá Rickey thích nó với gin hơn, và phiên bản đó trở thành cổ điển. Rickey là một trong những cocktail đầu tiên sử dụng nước có ga và trở nên cực kỳ phổ biến vào cuối thế kỷ 19 và đầu thế kỷ 20, đặc biệt là trong những mùa hè nóng bức ở Washington. Nó đáng chú ý vì không đường, làm cho nó tươi mát mà không ngọt gắt.',
    },
    named_after: {
      en: 'Named after Colonel Joe Rickey, a Democratic lobbyist and regular patron at Shoomaker\'s Bar.',
      it: 'Prende il nome dal Colonnello Joe Rickey, un lobbista democratico e cliente abituale dello Shoomaker\'s Bar.',
      vi: 'Được đặt theo tên Đại tá Joe Rickey, một vận động hành lang Dân chủ và khách quen tại Shoomaker\'s Bar.',
    },
  },

  taste: {
    profile: ['tart', 'refreshing', 'citrus', 'crisp'],
    description: {
      en: 'Crisp, tart, and exceptionally refreshing with no sweetness whatsoever. The gin\'s botanicals shine through, complemented by fresh lime tartness and clean carbonation. It\'s bracingly dry and perfect for those who dislike sweet drinks.',
      it: 'Frizzante, aspro e eccezionalmente rinfrescante senza alcuna dolcezza. Le botaniche del gin risplendono, completate dall\'acidità del lime fresco e dalla carbonazione pulita. È sorprendentemente secco e perfetto per chi non ama i drink dolci.',
      vi: 'Sảng khoái, chua và cực kỳ tươi mát mà không có chút ngọt nào. Thảo mộc của gin tỏa sáng, được bổ sung bởi vị chua chanh tươi và khí CO2 trong sạch. Nó khô đến mức đáng kinh ngạc và hoàn hảo cho những ai không thích đồ uống ngọt.',
    },
    first_impression: {
      en: 'Tart lime and gin botanicals with crisp effervescence',
      it: 'Lime aspro e botaniche del gin con effervescenza frizzante',
      vi: 'Chanh chua và thảo mộc gin với bọt khí sảng khoái',
    },
    finish: {
      en: 'Dry, clean finish with lingering lime and juniper notes',
      it: 'Finale secco e pulito con note persistenti di lime e ginepro',
      vi: 'Kết thúc khô, trong sạch với hương chanh và tùng kéo dài',
    },
    balance: {
      en: 'Perfectly balanced tartness - dry without being harsh, refreshing without sweetness',
      it: 'Acidità perfettamente bilanciata - secco senza essere aspro, rinfrescante senza dolcezza',
      vi: 'Vị chua cân bằng hoàn hảo - khô mà không gay gắt, tươi mát mà không ngọt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'summer'],
    occasions: ['casual', 'aperitivo', 'garden_party', 'daytime'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent aperitif before meals. Pairs well with oysters, fresh seafood, ceviche, salads, and light appetizers. Perfect with Vietnamese or Thai cuisine.',
      it: 'Eccellente aperitivo prima dei pasti. Si abbina bene con ostriche, frutti di mare freschi, ceviche, insalate e antipasti leggeri. Perfetto con cucina vietnamita o thailandese.',
      vi: 'Aperitif tuyệt vời trước bữa ăn. Kết hợp tốt với hàu, hải sản tươi, ceviche, salad và món khai vị nhẹ. Hoàn hảo với ẩm thực Việt Nam hoặc Thái Lan.',
    },
    ideal_for: {
      en: 'Perfect for those who dislike sweet cocktails and prefer dry, refreshing drinks. Great for hot weather, health-conscious drinkers (no added sugar), or anyone who appreciates gin\'s botanical character.',
      it: 'Perfetto per chi non ama i cocktail dolci e preferisce drink secchi e rinfrescanti. Ottimo per il clima caldo, i bevitori attenti alla salute (senza zucchero aggiunto) o chiunque apprezzi il carattere botanico del gin.',
      vi: 'Hoàn hảo cho những ai không thích cocktail ngọt và thích đồ uống khô, tươi mát. Tuyệt vời cho thời tiết nóng, người uống quan tâm đến sức khỏe (không đường bổ sung) hoặc bất kỳ ai đánh giá cao đặc tính thảo mộc của gin.',
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
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_CLUB_SODA',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Club soda', it: 'Acqua di seltz', vi: 'Soda' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour gin and fresh lime juice over ice. Top with club soda. Stir gently once. Squeeze lime half into drink and drop the spent shell in.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare gin e succo di lime fresco sul ghiaccio. Completare con acqua di seltz. Mescolare delicatamente una volta. Spremere metà lime nel drink e lasciare cadere il guscio spremuto.',
    vi: 'Đổ đầy ly highball với đá. Rót gin và nước cốt chanh tươi lên đá. Thêm soda lên trên. Khuấy nhẹ một lần. Vắt nửa chanh vào thức uống và thả vỏ đã vắt vào.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Spent lime half',
    it: 'Metà lime spremuta',
    vi: 'Nửa chanh đã vắt',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['tart', 'refreshing', 'citrus', 'crisp'],

  abv_estimate: 12,

  calories_estimate: 110,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free', 'low_sugar', 'keto'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free', 'low-sugar'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['casual', 'aperitivo', 'garden_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bourbon-rickey', 'vodka-rickey', 'rum-rickey'],

  notes_for_staff: 'The hallmark of a Rickey is NO SUGAR - don\'t add simple syrup. Use fresh lime, never bottled. Originally made with bourbon (ask if customer wants original version). Drop spent lime half into drink - it\'s traditional.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1248/gin-rickey',
    note: 'Created 1883 by George A. Williamson at Shoomaker\'s Bar, Washington D.C.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
