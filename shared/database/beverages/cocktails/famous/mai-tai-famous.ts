/**
 * Famous Cocktails: Mai Tai (Famous Variant)
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const maiTaiFamous: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b',
  slug: 'mai-tai-famous',
  stable_key: 'mai-tai-famous-variant-tiki-tropical-2025',

  name: {
    en: 'Mai Tai (Famous Variant)',
    it: 'Mai Tai (Variante Famosa)',
    vi: 'Mai Tai (Biến thể Nổi tiếng)',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'classic-variation', 'popular'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The popular tourist-style Mai Tai variant featuring pineapple juice and grenadine, different from the IBA official version. This sweeter, more approachable version became the standard at beach resorts and tiki bars worldwide, making it one of the most recognizable tropical cocktails.',
    it: 'La popolare variante Mai Tai in stile turistico con succo di ananas e granatina, diversa dalla versione ufficiale IBA. Questa versione più dolce e accessibile divenne lo standard nei resort sulla spiaggia e nei bar tiki in tutto il mondo, rendendola uno dei cocktail tropicali più riconoscibili.',
    vi: 'Biến thể Mai Tai phong cách du lịch phổ biến có nước ép dứa và grenadine, khác với phiên bản chính thức IBA. Phiên bản ngọt hơn, dễ tiếp cận hơn này trở thành tiêu chuẩn tại các khu nghỉ dưỡng bãi biển và quán bar tiki trên toàn thế giới, khiến nó trở thành một trong những cocktail nhiệt đới dễ nhận biết nhất.',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Various',
      bar: 'Beach Resorts',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'While Victor "Trader Vic" Bergeron created the original Mai Tai in 1944, this famous variant emerged in the 1960s-1970s as beach resorts and commercial tiki bars adapted the recipe to be more approachable and cost-effective. The addition of pineapple juice and grenadine created a sweeter, more visually appealing drink that resonated with tourists and casual drinkers. Though purists debate its authenticity, this version became so widespread that many people consider it the "real" Mai Tai. It\'s the version most commonly served at beach resorts, cruise ships, and casual tiki establishments worldwide.',
      it: 'Mentre Victor "Trader Vic" Bergeron creò l\'originale Mai Tai nel 1944, questa famosa variante emerse negli anni \'60-\'70 quando i resort sulla spiaggia e i bar tiki commerciali adattarono la ricetta per renderla più accessibile ed economica. L\'aggiunta di succo di ananas e granatina creò una bevanda più dolce e visivamente accattivante che risuonò con i turisti e i bevitori casuali. Sebbene i puristi ne discutano l\'autenticità, questa versione divenne così diffusa che molte persone la considerano il "vero" Mai Tai. È la versione più comunemente servita nei resort sulla spiaggia, nelle navi da crociera e nei locali tiki casual in tutto il mondo.',
      vi: 'Trong khi Victor "Trader Vic" Bergeron tạo ra Mai Tai gốc vào năm 1944, biến thể nổi tiếng này xuất hiện vào những năm 1960-1970 khi các khu nghỉ dưỡng bãi biển và quán bar tiki thương mại điều chỉnh công thức để dễ tiếp cận và hiệu quả về chi phí hơn. Việc thêm nước ép dứa và grenadine đã tạo ra một thức uống ngọt hơn, hấp dẫn hơn về mặt thị giác khiến du khách và người uống thông thường thích thú. Mặc dù những người theo chủ nghĩa thuần túy tranh luận về tính chân thực của nó, phiên bản này trở nên phổ biến đến mức nhiều người coi đó là Mai Tai "thật". Đây là phiên bản được phục vụ phổ biến nhất tại các khu nghỉ dưỡng bãi biển, tàu du lịch và các cơ sở tiki thông thường trên toàn thế giới.',
    },
    named_after: {
      en: 'Retains the name "Mai Tai" from the original, meaning "the best" or "out of this world" in Tahitian, though this variant differs significantly from Trader Vic\'s creation.',
      it: 'Mantiene il nome "Mai Tai" dall\'originale, che significa "il migliore" o "fuori da questo mondo" in tahitiano, anche se questa variante differisce significativamente dalla creazione di Trader Vic.',
      vi: 'Giữ tên "Mai Tai" từ bản gốc, có nghĩa là "tốt nhất" hoặc "ngoài thế giới này" trong tiếng Tahiti, mặc dù biến thể này khác biệt đáng kể so với sáng tạo của Trader Vic.',
    },
  },

  taste: {
    profile: ['fruity', 'tropical', 'sweet'],
    description: {
      en: 'Sweet and tropical with prominent pineapple and orange flavors. The grenadine adds berry sweetness and a beautiful gradient color. More approachable and fruit-forward than the original, with rum providing warmth in the background. Easy-drinking and crowd-pleasing.',
      it: 'Dolce e tropicale con prominenti sapori di ananas e arancia. La granatina aggiunge dolcezza di bacche e un bellissimo colore sfumato. Più accessibile e orientata alla frutta rispetto all\'originale, con il rum che fornisce calore in sottofondo. Facile da bere e di grande appeal.',
      vi: 'Ngọt và nhiệt đới với hương vị dứa và cam nổi bật. Grenadine thêm vị ngọt quả mọng và màu gradient đẹp. Dễ tiếp cận hơn và hướng trái cây hơn bản gốc, với rum mang lại sự ấm áp ở hậu cảnh. Dễ uống và được nhiều người yêu thích.',
    },
    first_impression: {
      en: 'Sweet tropical pineapple and orange burst with colorful presentation',
      it: 'Esplosione di ananas tropicale dolce e arancia con presentazione colorata',
      vi: 'Dứa nhiệt đới ngọt ngào và cam bùng nổ với cách trình bày đầy màu sắc',
    },
    finish: {
      en: 'Medium finish with lingering tropical fruit and gentle rum warmth',
      it: 'Finale medio con frutta tropicale persistente e dolce calore di rum',
      vi: 'Kết thúc trung bình với trái cây nhiệt đới kéo dài và sự ấm áp nhẹ nhàng của rum',
    },
    balance: {
      en: 'Sweet and fruity with good tropical balance - designed for mass appeal rather than complexity',
      it: 'Dolce e fruttato con buon equilibrio tropicale - progettato per l\'appeal di massa piuttosto che per la complessità',
      vi: 'Ngọt và trái cây với sự cân bằng nhiệt đới tốt - được thiết kế cho sức hấp dẫn đại chúng hơn là độ phức tạp',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'vacation', 'cruise', 'casual_gathering'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Perfect with Hawaiian pizza, coconut shrimp, fish tacos, tropical fruit platters, or casual beach food. Also pairs well with grilled chicken and summer BBQ fare.',
      it: 'Perfetto con pizza hawaiana, gamberi al cocco, tacos di pesce, piatti di frutta tropicale o cibo casual da spiaggia. Si abbina bene anche con pollo alla griglia e BBQ estivo.',
      vi: 'Hoàn hảo với pizza Hawaii, tôm dừa, tacos cá, đĩa trái cây nhiệt đới hoặc đồ ăn bãi biển thông thường. Cũng kết hợp tốt với gà nướng và món BBQ mùa hè.',
    },
    ideal_for: {
      en: 'Perfect for beach vacations, pool parties, and casual tropical gatherings. Ideal for those who prefer sweeter, more approachable cocktails. The go-to Mai Tai at most beach resorts and cruise ships.',
      it: 'Perfetto per vacanze al mare, feste in piscina e incontri tropicali informali. Ideale per chi preferisce cocktail più dolci e accessibili. Il Mai Tai preferito nella maggior parte dei resort sulla spiaggia e delle navi da crociera.',
      vi: 'Hoàn hảo cho kỳ nghỉ biển, tiệc hồ bơi và các buổi họp mặt nhiệt đới thông thường. Lý tưởng cho những ai thích cocktail ngọt hơn, dễ tiếp cận hơn. Mai Tai được ưa chuộng tại hầu hết các khu nghỉ dưỡng bãi biển và tàu du lịch.',
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
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ép dứa' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Orange juice', it: 'Succo d\'arancia', vi: 'Nước cam' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add white rum, dark rum, pineapple juice, orange juice, and lime juice to a shaker with ice. Shake well. Fill a hurricane glass with crushed ice. Strain mixture into glass. Drizzle grenadine down the side to create a sunset gradient effect. Garnish with pineapple wedge, cherry, and mint.',
    it: 'Aggiungere rum bianco, rum scuro, succo di ananas, succo d\'arancia e succo di lime in uno shaker con ghiaccio. Shakerare bene. Riempire un bicchiere hurricane con ghiaccio tritato. Filtrare la miscela nel bicchiere. Versare la granatina lungo il lato per creare un effetto sfumato tramonto. Guarnire con spicchio di ananas, ciliegina e menta.',
    vi: 'Thêm rum trắng, rum đen, nước ép dứa, nước cam và nước cốt chanh vào bình lắc với đá. Lắc kỹ. Đổ đầy ly hurricane với đá nghiền. Lọc hỗn hợp vào ly. Rưới grenadine xuống bên cạnh để tạo hiệu ứng gradient hoàng hôn. Trang trí với miếng dứa, cherry và bạc hà.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Pineapple wedge, maraschino cherry, and fresh mint sprig',
    it: 'Spicchio di ananas, ciliegina al maraschino e rametto di menta fresca',
    vi: 'Miếng dứa, cherry maraschino và cành bạc hà tươi',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_RUM_DARK'],

  flavor_profile: ['fruity', 'tropical', 'sweet'],

  abv_estimate: 12,

  calories_estimate: 260,

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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['summer', 'year_round'],
  occasion_tags: ['beach', 'pool_party', 'vacation', 'cruise'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['mai-tai-iba-official', 'frozen-mai-tai', 'virgin-mai-tai'],

  notes_for_staff: 'This is the popular tourist/resort version, NOT the IBA official recipe. Most customers expect this version when ordering Mai Tai at beach bars. Grenadine sunset effect is visual signature. Sweeter and more approachable than authentic Trader Vic recipe. Very popular poolside drink.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/mai-tai/',
    note: 'Popular beach resort variant. Differs from IBA official and original Trader Vic recipes.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
