/**
 * Famous Cocktails: Saturn
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const saturn: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
  slug: 'saturn',
  stable_key: 'saturn_famous_tiki_tropical_cocktail',

  name: {
    en: 'Saturn',
    it: 'Saturn',
    vi: 'Saturn',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'gin', 'citrus', 'unique'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Saturn is a unique tiki cocktail that breaks convention by using gin instead of rum, combined with passion fruit, falernum, lemon juice, and orgeat. This space-age drink is tart, nutty, and refreshingly different from traditional tiki fare.',
    it: 'Il Saturn è un cocktail tiki unico che infrange la convenzione usando gin invece di rum, combinato con frutto della passione, falernum, succo di limone e orzata. Questa bevanda dell\'era spaziale è aspra, di nocciola e rinfrescantemente diversa dalla tradizionale offerta tiki.',
    vi: 'Saturn là một loại cocktail tiki độc đáo phá vỡ quy ước bằng cách sử dụng gin thay vì rum, kết hợp với chanh dây, falernum, nước chanh và orgeat. Thức uống kỷ nguyên không gian này chua, hạt dẻ và khác biệt một cách sảng khoái so với món tiki truyền thống.',
  },

  history: {
    created_year: '1967',
    origin: {
      city: 'California',
      bar: 'Unknown tiki establishment',
      country: 'USA',
    },
    creator: {
      name: 'J. "Popo" Galsini',
      profession: 'bartender',
    },
    story: {
      en: 'The Saturn was created in 1967 by bartender J. "Popo" Galsini for a tiki drink competition. The drink won its category, standing out for its unusual use of gin in a tiki context - at a time when rum absolutely dominated the genre. The name "Saturn" reflects the space-age zeitgeist of the 1960s, when humanity was reaching for the stars. The cocktail\'s unique combination of gin, passion fruit, falernum, and orgeat created a flavor profile unlike any other tiki drink. Despite winning its competition, the Saturn fell into obscurity for decades until the modern tiki revival brought it back into the spotlight. Today, it\'s celebrated as a refreshing alternative to rum-heavy tiki drinks.',
      it: 'Il Saturn fu creato nel 1967 dal barman J. "Popo" Galsini per una competizione di bevande tiki. La bevanda vinse la sua categoria, distinguendosi per l\'uso insolito del gin in un contesto tiki - in un momento in cui il rum dominava assolutamente il genere. Il nome "Saturn" riflette lo zeitgeist dell\'era spaziale degli anni \'60, quando l\'umanità stava raggiungendo le stelle. L\'unica combinazione del cocktail di gin, frutto della passione, falernum e orzata creò un profilo di sapore diverso da qualsiasi altra bevanda tiki. Nonostante abbia vinto la sua competizione, il Saturn cadde nell\'oscurità per decenni fino a quando il moderno revival tiki lo riportò sotto i riflettori. Oggi è celebrato come un\'alternativa rinfrescante alle bevande tiki pesanti di rum.',
      vi: 'Saturn được tạo ra năm 1967 bởi bartender J. "Popo" Galsini cho một cuộc thi cocktail tiki. Thức uống đã giành chiến thắng hạng mục của nó, nổi bật với việc sử dụng gin bất thường trong bối cảnh tiki - vào thời điểm rum hoàn toàn thống trị thể loại. Cái tên "Saturn" phản ánh tinh thần thời đại không gian của những năm 1960, khi nhân loại đang với tới các vì sao. Sự kết hợp độc đáo của cocktail gồm gin, chanh dây, falernum và orgeat đã tạo ra hồ sơ hương vị không giống bất kỳ thức uống tiki nào khác. Mặc dù giành chiến thắng trong cuộc thi, Saturn đã rơi vào quên lãng trong nhiều thập kỷ cho đến khi sự hồi sinh tiki hiện đại đưa nó trở lại ánh đèn sân khấu. Ngày nay, nó được ca ngợi như một lựa chọn thay thế sảng khoái cho các thức uống tiki nặng rum.',
    },
    named_after: {
      en: 'Named after the planet Saturn, reflecting the space-age enthusiasm of the 1960s Space Race era.',
      it: 'Prende il nome dal pianeta Saturno, riflettendo l\'entusiasmo dell\'era spaziale degli anni \'60 della Corsa allo Spazio.',
      vi: 'Được đặt theo tên hành tinh Sao Thổ, phản ánh sự nhiệt tình kỷ nguyên không gian của thời đại Cuộc đua Không gian những năm 1960.',
    },
  },

  taste: {
    profile: ['citrus', 'tart', 'nutty'],
    description: {
      en: 'Bright, tart, and refreshingly complex with gin botanicals playing against tropical passion fruit. The Saturn balances sharp lemon acidity with nutty orgeat and spiced falernum, while gin provides an herbal backbone rarely found in tiki drinks. Unique and memorable.',
      it: 'Brillante, aspro e rinfrescantemente complesso con botanici di gin che giocano contro il frutto della passione tropicale. Il Saturn bilancia l\'acidità aspra del limone con orzata di nocciole e falernum speziato, mentre il gin fornisce una struttura erbale raramente trovata nelle bevande tiki. Unico e memorabile.',
      vi: 'Sáng, chua và phức tạp sảng khoái với thực vật gin chơi chống lại chanh dây nhiệt đới. Saturn cân bằng độ chua chanh sắc nét với orgeat hạt dẻ và falernum gia vị, trong khi gin cung cấp xương sống thảo mộc hiếm khi tìm thấy trong đồ uống tiki. Độc đáo và đáng nhớ.',
    },
    first_impression: {
      en: 'Tart passion fruit and lemon hit first, followed by juniper and herbal gin notes',
      it: 'Il frutto della passione aspro e il limone colpiscono per primi, seguiti da ginepro e note erbali di gin',
      vi: 'Chanh dây chua và chanh xuất hiện đầu tiên, theo sau là hương thảo mộc và juniper của gin',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering almond and spice notes from orgeat and falernum',
      it: 'Finale pulito e rinfrescante con note persistenti di mandorla e spezie da orzata e falernum',
      vi: 'Kết thúc sạch sẽ, sảng khoái với hương hạnh nhân và gia vị kéo dài từ orgeat và falernum',
    },
    balance: {
      en: 'Well-balanced between tart citrus and sweet nutty elements, with gin providing unusual complexity',
      it: 'Ben bilanciato tra agrumi aspri e elementi dolci di nocciole, con il gin che fornisce una complessità insolita',
      vi: 'Cân bằng tốt giữa cam quýt chua và yếu tố hạt ngọt, với gin cung cấp độ phức tạp bất thường',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['tiki_bar', 'summer_gathering', 'unique_experience'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Southeast Asian cuisine, ceviche, grilled fish, or light seafood dishes. Also pairs well with citrus-marinated chicken and tropical fruit salads.',
      it: 'Perfetto con cucina del sud-est asiatico, ceviche, pesce alla griglia o piatti leggeri di frutti di mare. Si abbina bene anche con pollo marinato agli agrumi e insalate di frutta tropicale.',
      vi: 'Hoàn hảo với ẩm thực Đông Nam Á, ceviche, cá nướng hoặc món hải sản nhẹ. Cũng kết hợp tốt với gà ướp cam quýt và salad trái cây nhiệt đới.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers curious about tiki culture and adventurous drinkers seeking something different. Ideal for those who find traditional rum-based tiki drinks too heavy or sweet. Great for warm weather refreshment with complexity.',
      it: 'Perfetto per gli amanti del gin curiosi della cultura tiki e bevitori avventurosi che cercano qualcosa di diverso. Ideale per coloro che trovano le tradizionali bevande tiki a base di rum troppo pesanti o dolci. Ottimo per rinfrescarsi con il clima caldo con complessità.',
      vi: 'Hoàn hảo cho những người yêu gin tò mò về văn hóa tiki và những người uống mạo hiểm tìm kiếm điều gì đó khác biệt. Lý tưởng cho những ai thấy đồ uống tiki truyền thống dựa trên rum quá nặng hoặc ngọt. Tuyệt vời cho làm mát thời tiết ấm với độ phức tạp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_PASSION_FRUIT_SYRUP',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Passion fruit syrup', it: 'Sciroppo di frutto della passione', vi: 'Xi-rô chanh dây' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
    {
      ingredient_id: 'ING_ORGEAT',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Orgeat syrup', it: 'Sciroppo di orzata', vi: 'Xi-rô orgeat' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe or tiki glass. Garnish with lemon wheel and edible flower.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere tiki. Guarnire con rotella di limone e fiore commestibile.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe lạnh hoặc ly tiki. Trang trí với vòng chanh và hoa ăn được.',
  },

  glass: 'Coupe / Tiki glass',

  garnish: {
    en: 'Lemon wheel, edible flower (orchid)',
    it: 'Rotella di limone, fiore commestibile (orchidea)',
    vi: 'Vòng chanh, hoa ăn được (lan)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'tart', 'nutty'],

  abv_estimate: 16,

  calories_estimate: 200,

  difficulty: 'intermediate',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['tiki_bar', 'summer_gathering', 'unique_experience'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['popo-galsini-saturn'],

  notes_for_staff: 'Created by Popo Galsini in 1967, won tiki competition. Unusual gin-based tiki drink - refreshing alternative to rum cocktails. Orgeat contains almonds. Can substitute passion fruit purée for syrup. Serve up in coupe for elegance or tiki glass for theme.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 68,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://punchdrink.com/recipes/saturn/',
    note: 'Created by J. "Popo" Galsini in 1967. Resurrected by modern tiki revival. Smuggler\'s Cove and tiki cocktail archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
