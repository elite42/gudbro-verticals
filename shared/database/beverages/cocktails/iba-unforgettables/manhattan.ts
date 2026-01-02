/**
 * IBA Unforgettables: Manhattan
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const manhattan: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '5365e87b-adb2-43f7-ae62-cff1428604a7',
  slug: 'manhattan',
  stable_key: '6524c715900cd03211975de709e0230ec3452169',

  name: {
    en: 'Manhattan',
    it: 'Manhattan',
    vi: 'Manhattan',
    ko: '맨해튼',
    ja: 'マンハッタン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'iconic', 'stirred'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The king of cocktails. A timeless New York classic combining rye whiskey, sweet vermouth, and aromatic bitters, the Manhattan represents the pinnacle of stirred cocktail elegance and has influenced countless variations.',
    it: 'Il re dei cocktail. Un classico senza tempo di New York che combina whiskey di segale, vermouth dolce e bitter aromatici, il Manhattan rappresenta l\'apice dell\'eleganza dei cocktail mescolati e ha influenzato innumerevoli variazioni.',
    vi: 'Vua của các cocktail. Một kiệt tác New York vượt thời gian kết hợp rye whiskey, vermouth ngọt và bitters thơm, Manhattan đại diện cho đỉnh cao của sự thanh lịch cocktail khuấy và đã ảnh hưởng đến vô số biến thể.',
  },

  history: {
    created_year: '1860',
    origin: {
      city: 'New York',
      bar: 'Manhattan Inn',
      country: 'United States',
    },
    creator: {
      name: 'George Black',
      profession: 'bartender',
    },
    story: {
      en: 'The Manhattan\'s true origin remains debated among cocktail historians. The popular story attributes its creation to a banquet at the Manhattan Club in the 1870s hosted by Jennie Jerome (Winston Churchill\'s mother), but this has been debunked as she was in England at the time. The most credible theory, supported by bartender William F. Mulhall\'s 1880s recollection in the 1923 Valentine\'s Manual of Old New York, credits George Black, who owned a lunch and sample room called the Manhattan Inn on Broadway below Houston Street, with creating the cocktail in the 1860s. The first written mention appeared in the September 5, 1882 issue of The Olean Democrat. The first full recipe was published in 1884 in multiple bartending guides. Most experts agree the Manhattan originated in New York City between the mid-1860s and early 1880s.',
      it: 'La vera origine del Manhattan rimane dibattuta tra gli storici dei cocktail. La storia popolare attribuisce la sua creazione a un banchetto al Manhattan Club negli anni 1870 ospitato da Jennie Jerome (madre di Winston Churchill), ma questo è stato smentito poiché era in Inghilterra all\'epoca. La teoria più credibile, supportata dal ricordo degli anni 1880 del barman William F. Mulhall nel Valentine\'s Manual of Old New York del 1923, attribuisce a George Black, che possedeva un locale chiamato Manhattan Inn su Broadway sotto Houston Street, la creazione del cocktail negli anni 1860. La prima menzione scritta apparve nel numero del 5 settembre 1882 di The Olean Democrat. La prima ricetta completa fu pubblicata nel 1884 in diverse guide per barman. La maggior parte degli esperti concorda che il Manhattan abbia avuto origine a New York City tra la metà degli anni 1860 e l\'inizio degli anni 1880.',
      vi: 'Nguồn gốc thực sự của Manhattan vẫn còn tranh cãi giữa các nhà sử học cocktail. Câu chuyện phổ biến cho rằng nó được tạo ra tại một yến tiệc ở Manhattan Club vào những năm 1870 do Jennie Jerome (mẹ của Winston Churchill) tổ chức, nhưng điều này đã bị bác bỏ vì bà ở Anh vào thời điểm đó. Lý thuyết đáng tin cậy nhất, được hỗ trợ bởi hồi ức những năm 1880 của bartender William F. Mulhall trong Valentine\'s Manual of Old New York năm 1923, cho rằng George Black, người sở hữu một quán ăn và phòng mẫu có tên Manhattan Inn trên Broadway dưới phố Houston, đã tạo ra cocktail này vào những năm 1860. Lần đề cập bằng văn bản đầu tiên xuất hiện trong số ngày 5 tháng 9 năm 1882 của The Olean Democrat. Công thức đầy đủ đầu tiên được xuất bản năm 1884 trong nhiều hướng dẫn pha chế. Hầu hết các chuyên gia đồng ý rằng Manhattan có nguồn gốc ở New York City từ giữa những năm 1860 đến đầu những năm 1880.',
    },
    named_after: {
      en: 'Named after the Manhattan borough of New York City, where it was created. One of five cocktails named for New York City boroughs.',
      it: 'Prende il nome dal quartiere di Manhattan a New York City, dove è stato creato. Uno dei cinque cocktail che prendono il nome dai quartieri di New York City.',
      vi: 'Được đặt tên theo quận Manhattan của thành phố New York, nơi nó được tạo ra. Một trong năm cocktail được đặt tên theo các quận của thành phố New York.',
    },
  },

  taste: {
    profile: ['boozy', 'sweet', 'aromatic'],
    description: {
      en: 'A bold, sophisticated cocktail with remarkable depth. The rye whiskey provides spicy, robust character, sweet vermouth adds rich, herbal complexity, and aromatic bitters tie everything together with warming spice notes. The result is perfectly balanced, smooth, and deeply satisfying.',
      it: 'Un cocktail audace e sofisticato con una profondità notevole. Il whiskey di segale fornisce un carattere speziato e robusto, il vermouth dolce aggiunge una complessità erbacea ricca, e i bitter aromatici legano tutto insieme con note speziate calde. Il risultato è perfettamente bilanciato, morbido e profondamente soddisfacente.',
      vi: 'Một cocktail táo bạo, tinh tế với chiều sâu đáng chú ý. Rye whiskey mang lại tính cách cay, mạnh mẽ, vermouth ngọt thêm độ phức tạp thảo mộc phong phú, và bitters thơm gắn kết mọi thứ với các nốt gia vị ấm áp. Kết quả là cân bằng hoàn hảo, mượt mà và thỏa mãn sâu sắc.',
    },
    first_impression: {
      en: 'Rich whiskey warmth immediately followed by sweet vermouth\'s herbal complexity. The bitters provide aromatic depth and subtle spice from the first sip.',
      it: 'Calore ricco del whiskey immediatamente seguito dalla complessità erbacea del vermouth dolce. I bitter forniscono profondità aromatica e spezie sottili dal primo sorso.',
      vi: 'Hơi ấm whiskey phong phú ngay lập tức theo sau là độ phức tạp thảo mộc của vermouth ngọt. Bitters cung cấp chiều sâu thơm và gia vị tinh tế từ ngụm đầu tiên.',
    },
    finish: {
      en: 'Long, warming finish with lingering whiskey spice and vermouth\'s herbal notes. The cherry garnish adds a subtle fruity sweetness to the final moments.',
      it: 'Finale lungo e caldo con spezie persistenti del whiskey e note erbacee del vermouth. La ciliegia aggiunge una sottile dolcezza fruttata ai momenti finali.',
      vi: 'Hậu vị dài, ấm áp với gia vị whiskey kéo dài và các nốt thảo mộc của vermouth. Cherry trang trí thêm vị ngọt trái cây tinh tế vào những khoảnh khắc cuối cùng.',
    },
    balance: {
      en: 'The classic 2.5:1 ratio showcases rye\'s character while vermouth provides essential sweetness and complexity. Bitters add aromatic backbone, creating perfect harmony.',
      it: 'Il classico rapporto 2,5:1 mette in risalto il carattere della segale mentre il vermouth fornisce dolcezza e complessità essenziali. I bitter aggiungono una spina dorsale aromatica, creando un\'armonia perfetta.',
      vi: 'Tỷ lệ cổ điển 2,5:1 làm nổi bật tính cách của rye trong khi vermouth cung cấp vị ngọt và độ phức tạp thiết yếu. Bitters thêm xương sống thơm, tạo ra sự hài hòa hoàn hảo.',
    },
  },

  recommendations: {
    best_time: ['evening', 'night'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'formal', 'business'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Grilled steak, aged cheeses, charcuterie, roasted nuts, dark chocolate. The robust whiskey character pairs excellently with rich, savory foods.',
      it: 'Bistecca alla griglia, formaggi stagionati, salumi, noci tostate, cioccolato fondente. Il carattere robusto del whiskey si abbina perfettamente con cibi ricchi e saporiti.',
      vi: 'Bít tết nướng, phô mai lâu năm, thịt nguội, hạt rang, sô cô la đen. Tính cách whiskey mạnh mẽ kết hợp tuyệt vời với thực phẩm đậm đà, ngon miệng.',
    },
    ideal_for: {
      en: 'Those who appreciate bold, whiskey-forward cocktails with classic elegance. Perfect as an aperitif before dinner or for contemplative evening sipping.',
      it: 'Per chi apprezza i cocktail audaci, incentrati sul whiskey, con eleganza classica. Perfetto come aperitivo prima di cena o per sorseggiare contemplativo la sera.',
      vi: 'Dành cho những ai đánh giá cao cocktail táo bạo, tập trung vào whiskey với sự thanh lịch cổ điển. Hoàn hảo như aperitif trước bữa tối hoặc để nhâm nhi buổi tối.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHISKEY_RYE',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Rye Whiskey', it: 'Whiskey di Segale', vi: 'Rye Whiskey' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Sweet Red Vermouth', it: 'Vermouth Rosso Dolce', vi: 'Vermouth đỏ ngọt' },
    },
    {
      ingredient_id: 'ING_BITTERS_ANGOSTURA',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Angostura Bitters', it: 'Angostura Bitters', vi: 'Angostura Bitters' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into mixing glass with ice cubes. Stir well until properly chilled. Strain into chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti nel mixing glass con cubetti di ghiaccio. Mescolare bene fino a quando ben raffreddato. Filtrare nel bicchiere da cocktail ghiacciato.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn với đá viên. Khuấy đều cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Cocktail cherry',
    it: 'Ciliegia da cocktail',
    vi: 'Cherry cocktail',
  },

  ice: 'none',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHISKEY_RYE'],
  flavor_profile: ['boozy', 'sweet', 'aromatic', 'complex'],
  abv_estimate: 30,
  calories_estimate: 160,
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
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'formal', 'business'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [
    {
      name: 'Perfect Manhattan',
      description: 'Use equal parts sweet and dry vermouth',
    },
    {
      name: 'Dry Manhattan',
      description: 'Replace sweet vermouth with dry vermouth, garnish with lemon twist',
    },
    {
      name: 'Rob Roy',
      description: 'Use Scotch whisky instead of rye',
    },
    {
      name: 'Black Manhattan',
      description: 'Replace sweet vermouth with Averna amaro',
    },
  ],

  notes_for_staff: 'Rye whiskey is traditional and preferred for its spicy character, though bourbon can be used. Always use fresh vermouth stored in the fridge. Stir (don\'t shake) for proper dilution and clarity. Chill glass thoroughly. Quality of cherry garnish matters - use Luxardo or similar premium cherries.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/manhattan/',
    note: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
