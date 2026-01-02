/**
 * IBA Contemporary Classics: Mint Julep
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mintJulepContemporary: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd6e7f8a9-0b1c-2d3e-4f5a-6b7c8d9e0f1a',
  slug: 'mint-julep-contemporary',
  stable_key: 'mint_julep_contemporary_iba_classic',

  name: {
    en: 'Mint Julep',
    it: 'Mint Julep',
    vi: 'Mint Julep',
    ko: '민트 줄렙',
    ja: 'ミントジュレップ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'bourbon', 'mint', 'southern', 'kentucky-derby', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The iconic bourbon cocktail of the American South, traditionally served in a frosted silver cup. Fresh mint, bourbon, and crushed ice create a refreshing masterpiece - the official drink of the Kentucky Derby.',
    it: 'L\'iconico cocktail a base di bourbon del Sud degli Stati Uniti, tradizionalmente servito in una tazza d\'argento ghiacciata. Menta fresca, bourbon e ghiaccio tritato creano un capolavoro rinfrescante - la bevanda ufficiale del Kentucky Derby.',
    vi: 'Cocktail bourbon biểu tượng của miền Nam nước Mỹ, truyền thống được phục vụ trong cốc bạc phủ sương. Bạc hà tươi, bourbon và đá nghiền tạo ra một kiệt tác sảng khoái - thức uống chính thức của Kentucky Derby.',
  },

  history: {
    created_year: '1780',
    origin: {
      city: 'Virginia / Kentucky',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'unknown',
    },
    story: {
      en: 'The Mint Julep dates back to the late 1700s in the American South. It became the signature drink of the Kentucky Derby in 1938. Traditionally served in a silver or pewter cup that frosts when filled with crushed ice. The drink is deeply rooted in Southern hospitality and Kentucky bourbon culture.',
      it: 'Il Mint Julep risale alla fine del 1700 nel Sud degli Stati Uniti. Divenne la bevanda distintiva del Kentucky Derby nel 1938. Tradizionalmente servito in una tazza d\'argento o peltro che si congela quando riempita di ghiaccio tritato. La bevanda è profondamente radicata nell\'ospitalità del Sud e nella cultura del bourbon del Kentucky.',
      vi: 'Mint Julep có từ cuối những năm 1700 ở miền Nam nước Mỹ. Nó trở thành thức uống đặc trưng của Kentucky Derby vào năm 1938. Truyền thống được phục vụ trong cốc bạc hoặc thiếc phủ sương khi đổ đầy đá nghiền. Thức uống gắn sâu với lòng hiếu khách miền Nam và văn hóa bourbon Kentucky.',
    },
    named_after: {
      en: 'The word "julep" comes from the Arabic "julab," meaning rosewater - referring to sweet drinks.',
      it: 'La parola "julep" deriva dall\'arabo "julab," che significa acqua di rose - riferendosi a bevande dolci.',
      vi: 'Từ "julep" xuất phát từ tiếng Ả Rập "julab," có nghĩa là nước hoa hồng - ám chỉ đồ uống ngọt.',
    },
  },

  taste: {
    profile: ['minty', 'sweet', 'boozy'],
    description: {
      en: 'Refreshingly minty with robust bourbon warmth. Fresh mint provides cooling aromatics, sugar adds sweetness, and bourbon delivers oak and caramel notes. The crushed ice makes it incredibly refreshing.',
      it: 'Rinfrescantemente mentolato con robusto calore di bourbon. La menta fresca fornisce aromi rinfrescanti, lo zucchero aggiunge dolcezza e il bourbon offre note di rovere e caramello. Il ghiaccio tritato lo rende incredibilmente rinfrescante.',
      vi: 'Sảng khoái bạc hà với hơi ấm bourbon mạnh mẽ. Bạc hà tươi cung cấp hương thơm mát lạnh, đường thêm vị ngọt, và bourbon mang lại hương gỗ sồi và caramel. Đá nghiền làm cho nó cực kỳ sảng khoái.',
    },
    first_impression: {
      en: 'Fresh mint aromatics with sweet bourbon',
      it: 'Aromi di menta fresca con bourbon dolce',
      vi: 'Hương thơm bạc hà tươi với bourbon ngọt',
    },
    finish: {
      en: 'Long, warming finish with lingering mint and oak',
      it: 'Finale lungo e caldo con menta e rovere persistenti',
      vi: 'Kết thúc dài, ấm áp với bạc hà và gỗ sồi kéo dài',
    },
    balance: {
      en: 'Well-balanced between mint freshness, sugar sweetness, and bourbon warmth',
      it: 'Ben bilanciato tra freschezza di menta, dolcezza di zucchero e calore di bourbon',
      vi: 'Cân bằng tốt giữa sự tươi mát bạc hà, vị ngọt đường và hơi ấm bourbon',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['kentucky_derby', 'southern_gathering', 'outdoor', 'special_event'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Southern cuisine - fried chicken, barbecue, ham biscuits, and bourbon-infused desserts.',
      it: 'Perfetto con cucina del Sud - pollo fritto, barbecue, biscotti al prosciutto e dessert infusi al bourbon.',
      vi: 'Hoàn hảo với ẩm thực miền Nam - gà rán, thịt nướng, bánh quy giăm bông và món tráng miệng bourbon.',
    },
    ideal_for: {
      en: 'Perfect for bourbon lovers and anyone experiencing Southern hospitality. A must-have for Kentucky Derby parties and summer gatherings.',
      it: 'Perfetto per gli amanti del bourbon e chiunque sperimenti l\'ospitalità del Sud. Un must per le feste del Kentucky Derby e le riunioni estive.',
      vi: 'Hoàn hảo cho người yêu bourbon và bất kỳ ai trải nghiệm lòng hiếu khách miền Nam. Bắt buộc phải có cho bữa tiệc Kentucky Derby và tụ tập mùa hè.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Bourbon', it: 'Bourbon', vi: 'Bourbon' },
    },
    {
      ingredient_id: 'ING_FRESH_MINT',
      quantity: { amount: 4, unit: 'sprigs' },
      display_name: { en: 'Fresh mint sprigs', it: 'Rametti di menta fresca', vi: 'Cành bạc hà tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đơn giản' },
    },
    {
      ingredient_id: 'ING_WATER',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Water', it: 'Acqua', vi: 'Nước' },
    },
  ],

  method: 'muddle',

  instructions: {
    en: 'In a Julep cup or rocks glass, gently muddle the mint with simple syrup and water. Fill the glass with crushed ice and add bourbon. Stir until the cup frosts. Top with more crushed ice to form a dome. Garnish with a large mint bouquet and serve with a straw.',
    it: 'In una tazza Julep o bicchiere rocks, pestare delicatamente la menta con sciroppo semplice e acqua. Riempire il bicchiere con ghiaccio tritato e aggiungere bourbon. Mescolare fino a quando la tazza si congela. Completare con altro ghiaccio tritato per formare una cupola. Guarnire con un grande bouquet di menta e servire con una cannuccia.',
    vi: 'Trong cốc Julep hoặc ly rocks, nghiền nhẹ bạc hà với siro đơn giản và nước. Đổ đầy ly bằng đá nghiền và thêm bourbon. Khuấy cho đến khi cốc phủ sương. Phủ thêm đá nghiền để tạo thành vòm. Trang trí bằng bó bạc hà lớn và phục vụ với ống hút.',
  },

  glass: 'Julep cup (silver) or rocks glass',

  garnish: {
    en: 'Mint bouquet (large bunch of mint)',
    it: 'Bouquet di menta (grande mazzo di menta)',
    vi: 'Bó bạc hà (bó bạc hà lớn)',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['minty', 'sweet', 'boozy'],

  abv_estimate: 25,

  calories_estimate: 180,

  difficulty: 'intermediate',

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['kentucky_derby', 'southern_gathering', 'outdoor', 'special_event'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['georgia-mint-julep', 'mojito', 'whiskey-smash'],

  notes_for_staff: 'Traditionally served in a silver or pewter Julep cup. Muddle mint gently - don\'t over-bruise. Use plenty of crushed ice and stir until cup frosts. The mint bouquet garnish should be large and aromatic. Serve with a short straw so the drinker\'s nose is near the mint. Official drink of Kentucky Derby since 1938.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/mint-julep/',
    note: 'IBA Official Recipe. Official drink of the Kentucky Derby.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
