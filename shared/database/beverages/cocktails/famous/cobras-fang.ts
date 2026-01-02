/**
 * Famous Cocktails: Cobra's Fang
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const cobrasFang: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
  slug: 'cobras-fang',
  stable_key: 'cobras_fang_famous_tiki_tropical_cocktail',

  name: {
    en: 'Cobra\'s Fang',
    it: 'Cobra\'s Fang',
    vi: 'Cobra\'s Fang',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'zombie', 'potent'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The Cobra\'s Fang is a potent tiki cocktail created by Don the Beachcomber, combining multiple rums with passion fruit, orange, and exotic spices. This dangerously smooth drink delivers a venomous kick worthy of its serpentine name.',
    it: 'Il Cobra\'s Fang è un potente cocktail tiki creato da Don the Beachcomber, che combina più rum con frutto della passione, arancia e spezie esotiche. Questa bevanda pericolosamente liscia offre un calcio velenoso degno del suo nome serpentino.',
    vi: 'Cobra\'s Fang là một loại cocktail tiki mạnh mẽ được tạo ra bởi Don the Beachcomber, kết hợp nhiều loại rum với chanh dây, cam và gia vị kỳ lạ. Thức uống mượt mà nguy hiểm này mang đến cú đá độc xứng đáng với cái tên rắn của nó.',
  },

  history: {
    created_year: '1930s',
    origin: {
      city: 'Hollywood',
      bar: 'Don the Beachcomber',
      country: 'USA',
    },
    creator: {
      name: 'Ernest Raymond Beaumont Gantt (Donn Beach)',
      profession: 'bartender',
    },
    story: {
      en: 'The Cobra\'s Fang was created in the 1930s by Don the Beachcomber (Ernest Raymond Beaumont Gantt), one of the founding fathers of tiki culture. This drink exemplifies Don\'s signature style of complex, multi-rum cocktails with exotic names and mysterious ingredients. The menacing name "Cobra\'s Fang" reflects the drink\'s deceptively smooth taste that hides serious alcoholic bite - much like a cobra strike. The recipe was kept secret for decades through Don\'s coded notation system, protecting it from competitors. The drink showcases passion fruit, which was relatively exotic in 1930s America, combined with multiple rums and secret spice mixes. It was eventually decoded by tiki historian Jeff "Beachbum" Berry, allowing modern bartenders to recreate this classic.',
      it: 'Il Cobra\'s Fang fu creato negli anni \'30 da Don the Beachcomber (Ernest Raymond Beaumont Gantt), uno dei padri fondatori della cultura tiki. Questa bevanda esemplifica lo stile distintivo di Don di cocktail complessi multi-rum con nomi esotici e ingredienti misteriosi. Il nome minaccioso "Cobra\'s Fang" riflette il gusto ingannevolmente liscio della bevanda che nasconde un serio morso alcolico - proprio come un colpo di cobra. La ricetta fu tenuta segreta per decenni attraverso il sistema di notazione codificata di Don, proteggendola dai concorrenti. La bevanda mette in mostra il frutto della passione, che era relativamente esotico nell\'America degli anni \'30, combinato con più rum e miscele di spezie segrete. Fu infine decifrata dallo storico del tiki Jeff "Beachbum" Berry, permettendo ai barman moderni di ricreare questo classico.',
      vi: 'Cobra\'s Fang được tạo ra vào những năm 1930 bởi Don the Beachcomber (Ernest Raymond Beaumont Gantt), một trong những người cha đẻ của văn hóa tiki. Thức uống này minh họa phong cách đặc trưng của Don về cocktail rum phức tạp với tên kỳ lạ và thành phần bí ẩn. Cái tên đe dọa "Cobra\'s Fang" phản ánh hương vị mượt mà lừa dối của thức uống che giấu độ cồn nghiêm trọng - giống như một đòn tấn công rắn hổ mang. Công thức được giữ bí mật trong nhiều thập kỷ thông qua hệ thống ký hiệu mã hóa của Don, bảo vệ nó khỏi đối thủ cạnh tranh. Thức uống thể hiện chanh dây, vốn tương đối kỳ lạ ở Mỹ những năm 1930, kết hợp với nhiều loại rum và hỗn hợp gia vị bí mật. Cuối cùng nó được giải mã bởi nhà sử học tiki Jeff "Beachbum" Berry, cho phép các bartender hiện đại tái tạo tác phẩm kinh điển này.',
    },
    named_after: {
      en: 'Named for the cobra snake, symbolizing the drink\'s deceptively smooth taste with a dangerous, venomous kick.',
      it: 'Prende il nome dal serpente cobra, simboleggiando il gusto ingannevolmente liscio della bevanda con un calcio pericoloso e velenoso.',
      vi: 'Được đặt theo tên con rắn hổ mang, tượng trưng cho hương vị mượt mà lừa dối của thức uống với một cú đá nguy hiểm, độc.',
    },
  },

  taste: {
    profile: ['tropical', 'spiced', 'potent'],
    description: {
      en: 'Dangerously smooth and tropical with layers of passion fruit, orange, and mysterious spice notes. The Cobra\'s Fang masks its potent rum content behind fruity sweetness and warming spices, delivering an unexpectedly powerful bite after the smooth sip.',
      it: 'Pericolosamente liscio e tropicale con strati di frutto della passione, arancia e note di spezie misteriose. Il Cobra\'s Fang maschera il suo potente contenuto di rum dietro dolcezza fruttata e spezie calde, offrendo un morso inaspettatamente potente dopo il sorso liscio.',
      vi: 'Mượt mà và nhiệt đới một cách nguy hiểm với các lớp chanh dây, cam và hương vị gia vị bí ẩn. Cobra\'s Fang che giấu hàm lượng rum mạnh mẽ của nó đằng sau vị ngọt trái cây và gia vị ấm áp, mang đến một cú cắn mạnh mẽ bất ngờ sau ngụm mượt mà.',
    },
    first_impression: {
      en: 'Sweet passion fruit and orange dominate upfront, masking the serious rum foundation',
      it: 'Il frutto della passione dolce e l\'arancia dominano in primo piano, mascherando la seria fondazione di rum',
      vi: 'Chanh dây ngọt và cam chiếm ưu thế phía trước, che giấu nền rum nghiêm trọng',
    },
    finish: {
      en: 'Long, warming finish where the "cobra bite" emerges - spice and rum heat linger',
      it: 'Finale lungo e caldo dove emerge il "morso di cobra" - spezie e calore del rum persistono',
      vi: 'Kết thúc dài, ấm áp nơi "vết cắn rắn hổ mang" xuất hiện - gia vị và nhiệt độ rum kéo dài',
    },
    balance: {
      en: 'Deceptively balanced - tropical sweetness hides dangerous alcohol content until the delayed kick',
      it: 'Ingannevolmente bilanciato - la dolcezza tropicale nasconde un pericoloso contenuto alcolico fino al calcio ritardato',
      vi: 'Cân bằng lừa dối - vị ngọt nhiệt đới che giấu hàm lượng cồn nguy hiểm cho đến cú đá bị trì hoãn',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['tiki_bar', 'adventurous_drinking', 'date_night'],
    seasons: ['year_round'],
    food_pairings: {
      en: 'Perfect with spicy Thai or Indian cuisine, jerk dishes, blackened fish, or bold curries. The drink\'s complexity stands up to intensely flavored foods.',
      it: 'Perfetto con cucina tailandese o indiana piccante, piatti jerk, pesce annerito o curry audaci. La complessità della bevanda regge cibi intensamente saporiti.',
      vi: 'Hoàn hảo với ẩm thực Thái hoặc Ấn Độ cay, món jerk, cá đen hoặc cà ri đậm. Độ phức tạp của thức uống chịu được thức ăn có hương vị mãnh liệt.',
    },
    ideal_for: {
      en: 'Perfect for tiki enthusiasts seeking authentic Don the Beachcomber classics. Ideal for adventurous drinkers who appreciate complex, potent cocktails. Warning: deceptively strong - the smooth taste masks serious alcohol content.',
      it: 'Perfetto per gli appassionati di tiki che cercano autentici classici Don the Beachcomber. Ideale per bevitori avventurosi che apprezzano cocktail complessi e potenti. Avvertimento: ingannevolmente forte - il gusto liscio maschera un serio contenuto alcolico.',
      vi: 'Hoàn hảo cho những người đam mê tiki tìm kiếm các tác phẩm kinh điển Don the Beachcomber chính thống. Lý tưởng cho những người uống mạo hiểm đánh giá cao cocktail phức tạp, mạnh mẽ. Cảnh báo: mạnh một cách lừa dối - hương vị mượt mà che giấu hàm lượng cồn nghiêm trọng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_RUM_DEMERARA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Demerara rum (151 proof)', it: 'Rum Demerara (151 proof)', vi: 'Rum Demerara (151 proof)' },
    },
    {
      ingredient_id: 'ING_PASSION_FRUIT_SYRUP',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Passion fruit syrup', it: 'Sciroppo di frutto della passione', vi: 'Xi-rô chanh dây' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 6, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a tiki mug or double old-fashioned glass filled with crushed ice. Garnish with orchid and orange slice.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in un tiki mug o bicchiere double old-fashioned pieno di ghiaccio tritato. Guarnire con orchidea e fetta d\'arancia.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào cốc tiki hoặc ly double old-fashioned đầy đá nghiền. Trang trí với hoa lan và lát cam.',
  },

  glass: 'Tiki mug / Double old-fashioned',

  garnish: {
    en: 'Orchid flower, orange slice, mint sprig',
    it: 'Fiore di orchidea, fetta d\'arancia, rametto di menta',
    vi: 'Hoa lan, lát cam, nhành bạc hà',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK', 'ING_RUM_DEMERARA'],

  flavor_profile: ['tropical', 'spiced', 'potent'],

  abv_estimate: 20,

  calories_estimate: 270,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['year_round'],
  occasion_tags: ['tiki_bar', 'adventurous_drinking', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['don-the-beachcomber-cobras-fang'],

  notes_for_staff: 'Created by Don the Beachcomber in 1930s, decoded by Jeff Berry. Very potent - warn guests about delayed alcoholic kick. Can substitute passion fruit purée for syrup. The "cobra bite" comes from high-proof Demerara rum. Serve with caution.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://beachbumberry.com/cobras-fang.html',
    note: 'Original Don the Beachcomber recipe from 1930s, decoded by Jeff "Beachbum" Berry in Sippin\' Safari.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
