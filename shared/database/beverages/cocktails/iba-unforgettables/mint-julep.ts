/**
 * Mint Julep Cocktail
 *
 * A quintessential Southern American cocktail dating back to the 1700s,
 * famously associated with the Kentucky Derby since 1938.
 * Originally a medicinal drink, it evolved into a bourbon-based classic.
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mintJulep: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '4ce0a3f0-063f-489a-86ca-7d1dff31b913',
  slug: 'mint-julep',
  stable_key: 'mint_julep',

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
  iba_category: 'Contemporary Classics',
  tags: ['iba', 'official', 'classic', 'muddled', 'american', 'derby'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Mint Julep is an iconic Southern cocktail synonymous with the Kentucky Derby. Built in a traditional julep cup, it combines bourbon, fresh mint, and sugar for a refreshing, aromatic drink that embodies Southern hospitality.',
    it: 'Il Mint Julep è un iconico cocktail del Sud americano sinonimo del Kentucky Derby. Costruito in una tradizionale coppa julep, combina bourbon, menta fresca e zucchero per una bevanda rinfrescante e aromatica che incarna l\'ospitalità del Sud.',
    vi: 'Mint Julep là cocktail mang tính biểu tượng miền Nam đồng nghĩa với Kentucky Derby. Được làm trong cốc julep truyền thống, kết hợp bourbon, bạc hà tươi và đường tạo đồ uống sảng khoái, thơm ngát thể hiện lòng hiếu khách miền Nam.',
  },

  history: {
    created_year: '1784',
    origin: {
      city: 'Virginia',
      bar: 'Various Southern establishments',
      country: 'United States',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Mint Julep\'s roots trace to Persia (julep derives from "gulab," rosewater) where it was a medicinal drink. First recorded in America in 1784 as a cure for stomach ailments, it originated in Virginia before spreading throughout the South. Senator Henry Clay of Kentucky introduced it to Washington D.C. at the Willard Hotel\'s Round Robin Bar. When brandy shortages occurred, bourbon became the spirit of choice. The cocktail became inseparably linked with the Kentucky Derby in 1938 when Churchill Downs began serving it in souvenir glasses. Today, nearly 120,000 juleps are served during Derby weekend.',
      it: 'Le radici del Mint Julep risalgono alla Persia (julep deriva da "gulab", acqua di rose) dove era una bevanda medicinale. Registrato per la prima volta in America nel 1784 come cura per i disturbi di stomaco, ebbe origine in Virginia prima di diffondersi in tutto il Sud. Il senatore Henry Clay del Kentucky lo introdusse a Washington D.C. al Round Robin Bar del Willard Hotel. Quando si verificarono carenze di brandy, il bourbon divenne lo spirito di scelta. Il cocktail divenne inseparabilmente legato al Kentucky Derby nel 1938 quando Churchill Downs iniziò a servirlo in bicchieri souvenir. Oggi, quasi 120.000 julep vengono serviti durante il weekend del Derby.',
      vi: 'Nguồn gốc Mint Julep bắt nguồn từ Ba Tư (julep xuất phát từ "gulab," nước hoa hồng) nơi nó là đồ uống thuốc. Được ghi nhận lần đầu ở Mỹ năm 1784 như thuốc chữa bệnh dạ dày, nó bắt nguồn từ Virginia trước khi lan rộng khắp miền Nam. Th参议员 Henry Clay của Kentucky giới thiệu nó đến Washington D.C. tại Round Robin Bar của Willard Hotel. Khi thiếu hụt brandy xảy ra, bourbon trở thành rượu được chọn. Cocktail trở nên gắn liền với Kentucky Derby năm 1938 khi Churchill Downs bắt đầu phục vụ nó trong ly lưu niệm. Ngày nay, gần 120.000 juleps được phục vụ trong suốt tuần Derby.',
    },
    named_after: {
      en: 'The word "julep" comes from the Persian "gulab" (rose water), originally referring to sweet medicinal drinks. "Mint" was added when the cocktail evolved to include the fresh herb.',
      it: 'La parola "julep" deriva dal persiano "gulab" (acqua di rose), originariamente riferito a bevande medicinali dolci. "Mint" fu aggiunto quando il cocktail si evolse per includere l\'erba fresca.',
      vi: 'Từ "julep" xuất phát từ tiếng Ba Tư "gulab" (nước hoa hồng), ban đầu chỉ đồ uống thuốc ngọt. "Mint" được thêm khi cocktail phát triển để bao gồm thảo mộc tươi.',
    },
  },

  taste: {
    profile: ['refreshing', 'minty', 'sweet', 'herbaceous'],
    description: {
      en: 'The Mint Julep offers a refreshing combination of cool mint and smooth bourbon sweetness. The muddled mint releases aromatic oils that blend with the caramel and vanilla notes of bourbon, while crushed ice provides a frosty, diluted sipping experience. The sugar balances the herbaceous bite.',
      it: 'Il Mint Julep offre una combinazione rinfrescante di menta fresca e dolcezza morbida del bourbon. La menta pestata rilascia oli aromatici che si fondono con le note di caramello e vaniglia del bourbon, mentre il ghiaccio tritato fornisce un\'esperienza di sorseggio gelida e diluita. Lo zucchero bilancia il morso erbaceo.',
      vi: 'Mint Julep mang sự kết hợp sảng khoái của bạc hà mát và vị ngọt bourbon mượt. Bạc hà nghiền giải phóng tinh dầu thơm hòa quyện với hương caramel và vani của bourbon, trong khi đá nghiền tạo trải nghiệm nhấm nháp lạnh buốt, pha loãng. Đường cân bằng vị cay thảo mộc.',
    },
    first_impression: {
      en: 'Intensely aromatic with fresh mint hitting the nose immediately. First sip brings sweet, cool mintiness with underlying bourbon warmth.',
      it: 'Intensamente aromatico con menta fresca che colpisce il naso immediatamente. Il primo sorso porta dolcezza mentolata fresca con calore sottostante del bourbon.',
      vi: 'Thơm mãnh liệt với bạc hà tươi đánh vào mũi ngay lập tức. Ngụm đầu mang vị bạc hà mát, ngọt với hơi ấm bourbon bên dưới.',
    },
    finish: {
      en: 'Long, refreshing finish with lingering mint coolness and subtle bourbon oak notes. The sweetness fades gradually, leaving clean herbal freshness.',
      it: 'Finale lungo e rinfrescante con freschezza persistente della menta e sottili note di rovere del bourbon. La dolcezza svanisce gradualmente, lasciando freschezza erbacea pulita.',
      vi: 'Hậu vị dài, sảng khoái với vị mát bạc hà lingering và hương sồi bourbon tinh tế. Vị ngọt nhạt dần, để lại sự tươi mát thảo mộc sạch.',
    },
    balance: {
      en: 'Perfectly balanced between sweet sugar, aromatic mint, and robust bourbon. The crushed ice provides ideal dilution, making it dangerously easy to drink.',
      it: 'Perfettamente bilanciato tra zucchero dolce, menta aromatica e bourbon robusto. Il ghiaccio tritato fornisce diluizione ideale, rendendolo pericolosamente facile da bere.',
      vi: 'Cân bằng hoàn hảo giữa đường ngọt, bạc hà thơm và bourbon mạnh mẽ. Đá nghiền cung cấp độ pha loãng lý tưởng, làm cho nó nguy hiểm dễ uống.',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'summer_day'],
    occasions: ['kentucky_derby', 'garden_party', 'summer_gathering', 'special_occasion'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Classic pairing with Southern cuisine: fried chicken, BBQ, country ham, pimento cheese, and Derby pie. Also excellent with grilled meats and rich, savory dishes.',
      it: 'Abbinamento classico con la cucina del Sud: pollo fritto, BBQ, prosciutto di campagna, formaggio pimento e Derby pie. Eccellente anche con carni alla griglia e piatti ricchi e saporiti.',
      vi: 'Kết hợp cổ điển với ẩm thực miền Nam: gà rán, BBQ, giăm bông quê, phô mai pimento và bánh Derby. Cũng tuyệt vời với thịt nướng và món đậm đà, mặn.',
    },
    ideal_for: {
      en: 'Perfect for Kentucky Derby celebrations, summer garden parties, bourbon enthusiasts, and anyone seeking a refreshing Southern classic. Louisville\'s official cocktail.',
      it: 'Perfetto per le celebrazioni del Kentucky Derby, feste estive in giardino, appassionati di bourbon e chiunque cerchi un classico rinfrescante del Sud. Cocktail ufficiale di Louisville.',
      vi: 'Hoàn hảo cho lễ kỷ niệm Kentucky Derby, tiệc vườn mùa hè, người đam mê bourbon và bất kỳ ai tìm kiếm cocktail cổ điển sảng khoái miền Nam. Cocktail chính thức của Louisville.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Bourbon Whiskey', it: 'Bourbon Whiskey', vi: 'Bourbon Whiskey' },
    },
    {
      ingredient_id: 'ING_MINT_SPRIG',
      quantity: { amount: 4, unit: 'sprig' },
      display_name: { en: 'Fresh Mint Sprigs', it: 'Rametti di Menta Fresca', vi: 'Cành Bạc Hà Tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 1, unit: 'teaspoon' },
      display_name: { en: 'Powdered Sugar', it: 'Zucchero in Polvere', vi: 'Đường Bột' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 2, unit: 'teaspoon' },
      display_name: { en: 'Water', it: 'Acqua', vi: 'Nước' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'In a julep stainless steel cup, gently muddle the mint with powdered sugar and water until sugar is dissolved and mint releases its oils. Fill the cup with crushed ice. Add the bourbon and stir well until the cup frosts on the outside. Top with more crushed ice to form a dome. Garnish with a fresh mint sprig. Serve with a straw.',
    it: 'In una coppa julep in acciaio inossidabile, pestare delicatamente la menta con lo zucchero in polvere e l\'acqua fino a quando lo zucchero si dissolve e la menta rilascia i suoi oli. Riempire la coppa con ghiaccio tritato. Aggiungere il bourbon e mescolare bene fino a quando la coppa si gela all\'esterno. Completare con altro ghiaccio tritato per formare una cupola. Guarnire con un rametto di menta fresca. Servire con una cannuccia.',
    vi: 'Trong cốc julep thép không gỉ, nhẹ nhàng nghiền bạc hà với đường bột và nước cho đến khi đường tan và bạc hà giải phóng tinh dầu. Đổ đầy cốc bằng đá nghiền. Thêm bourbon và khuấy đều cho đến khi cốc đóng băng bên ngoài. Thêm đá nghiền để tạo hình vòm. Trang trí bằng cành bạc hà tươi. Phục vụ với ống hút.',
  },

  glass: 'Julep stainless steel cup',

  garnish: {
    en: 'Fresh mint sprig',
    it: 'Rametto di menta fresca',
    vi: 'Cành bạc hà tươi',
  },

  ice: 'crushed',
  serving_style: 'built',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],
  flavor_profile: ['refreshing', 'minty', 'sweet', 'herbaceous'],
  abv_estimate: 18,
  calories_estimate: 156,
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
  season_tags: ['summer', 'spring'],
  occasion_tags: ['kentucky_derby', 'garden_party', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff: 'Use fresh spearmint for authentic flavor. Muddle gently - bruising mint too aggressively can release bitter flavors. Traditional silver julep cups frost beautifully and keep drinks colder. Crushed ice is essential - use a Lewis bag or ice crusher. The drink should be constantly refreshed with ice as it dilutes. During Derby weekend, pre-batch simple syrup with muddled mint for faster service.',

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
    note: 'IBA Official Recipe. Historical information from Kentucky Derby Museum and cocktail historians. Named official cocktail of Louisville, Kentucky in 2015.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
