/**
 * Famous Cocktails: Blood and Sand
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bloodAndSand: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f7a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c',
  slug: 'blood-and-sand',
  stable_key: 'g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',

  name: {
    en: 'Blood and Sand',
    it: 'Blood and Sand',
    vi: 'Blood and Sand',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'scotch', 'fruity', 'complex', 'unusual'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'One of the few classic cocktails to feature Scotch whisky, the Blood and Sand combines unexpected ingredients - Scotch, sweet vermouth, cherry liqueur, and orange juice - into a surprisingly harmonious and complex drink. Named after a 1922 bullfighting film, it\'s as dramatic as its namesake.',
    it: 'Uno dei pochi cocktail classici a presentare whisky scozzese, il Blood and Sand combina ingredienti inaspettati - Scotch, vermouth dolce, liquore di ciliegie e succo d\'arancia - in una bevanda sorprendentemente armoniosa e complessa. Prende il nome da un film sulla corrida del 1922, è drammatico quanto il suo omonimo.',
    vi: 'Một trong số ít cocktail cổ điển có whisky Scotch, Blood and Sand kết hợp các nguyên liệu bất ngờ - Scotch, vermouth ngọt, rượu cherry và nước cam - thành thức uống hài hòa và phức tạp đến ngạc nhiên. Được đặt theo tên bộ phim đấu bò năm 1922, nó kịch tính như tên gọi của nó.',
  },

  history: {
    created_year: '1922',
    origin: {
      city: 'London',
      bar: 'Unknown',
      country: 'United Kingdom',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Blood and Sand first appeared in Harry Craddock\'s "The Savoy Cocktail Book" in 1930, though it was likely created around 1922 to coincide with the release of the Rudolph Valentino film of the same name. The film, about a matador torn between two women, was a major hit, and the cocktail\'s dramatic red-orange color evokes the blood and sand of the bullring. The drink fell into obscurity for decades but experienced a revival in the 2000s when bartenders rediscovered its surprisingly balanced flavor profile. The equal-parts recipe creates an unexpected harmony between smoky Scotch, sweet cherry, bitter vermouth, and bright orange.',
      it: 'Il Blood and Sand apparve per la prima volta nel "The Savoy Cocktail Book" di Harry Craddock nel 1930, anche se fu probabilmente creato intorno al 1922 per coincidere con l\'uscita del film di Rudolph Valentino con lo stesso nome. Il film, su un matador diviso tra due donne, fu un grande successo, e il colore rosso-arancio drammatico del cocktail evoca il sangue e la sabbia dell\'arena. La bevanda cadde nell\'oscurità per decenni ma conobbe una rinascita negli anni 2000 quando i barman riscoprirono il suo profilo aromatico sorprendentemente bilanciato. La ricetta in parti uguali crea un\'armonia inaspettata tra Scotch affumicato, ciliegia dolce, vermouth amaro e arancia brillante.',
      vi: 'Blood and Sand lần đầu xuất hiện trong "The Savoy Cocktail Book" của Harry Craddock năm 1930, mặc dù nó có thể được tạo ra vào khoảng năm 1922 để trùng với việc phát hành bộ phim Rudolph Valentino cùng tên. Bộ phim về một đấu sĩ bị chia rẽ giữa hai người phụ nữ là một thành công lớn, và màu đỏ cam kịch tính của cocktail gợi lên máu và cát của đấu trường bò tót. Thức uống rơi vào quên lãng trong nhiều thập kỷ nhưng trải qua sự hồi sinh vào những năm 2000 khi các bartender tái khám phá hương vị cân bằng đến ngạc nhiên của nó. Công thức phần bằng nhau tạo ra sự hài hòa bất ngờ giữa Scotch khói, cherry ngọt, vermouth đắng và cam tươi sáng.',
    },
    named_after: {
      en: 'Named after the 1922 silent film "Blood and Sand" starring Rudolph Valentino as a Spanish bullfighter.',
      it: 'Prende il nome dal film muto del 1922 "Blood and Sand" con Rudolph Valentino nei panni di un torero spagnolo.',
      vi: 'Được đặt theo tên bộ phim câm năm 1922 "Blood and Sand" với sự tham gia của Rudolph Valentino trong vai đấu sĩ bò tót Tây Ban Nha.',
    },
  },

  taste: {
    profile: ['fruity', 'complex', 'smoky'],
    description: {
      en: 'A fascinating balance of contrasting flavors. The Blood and Sand is simultaneously smoky, sweet, fruity, and herbal. The Scotch provides a smoky backbone, cherry liqueur adds sweetness and depth, vermouth contributes herbal complexity, and orange juice brings brightness and acidity. It\'s unexpectedly harmonious.',
      it: 'Un affascinante equilibrio di sapori contrastanti. Il Blood and Sand è simultaneamente affumicato, dolce, fruttato ed erbaceo. Lo Scotch fornisce una spina dorsale affumicata, il liquore di ciliegie aggiunge dolcezza e profondità, il vermouth contribuisce complessità erbacee, e il succo d\'arancia porta luminosità e acidità. È inaspettatamente armonioso.',
      vi: 'Sự cân bằng hấp dẫn của các hương vị tương phản. Blood and Sand đồng thời khói, ngọt, trái cây và thảo mộc. Scotch cung cấp xương sống khói, rượu cherry thêm vị ngọt và chiều sâu, vermouth đóng góp sự phức tạp thảo mộc, và nước cam mang lại độ tươi sáng và chua. Nó hài hòa một cách bất ngờ.',
    },
    first_impression: {
      en: 'Sweet cherry and orange fruit forward, followed by smoky Scotch complexity',
      it: 'Ciliegia dolce e frutta d\'arancia in primo piano, seguiti da complessità affumicata dello Scotch',
      vi: 'Cherry ngọt và cam đi trước, theo sau là sự phức tạp khói của Scotch',
    },
    finish: {
      en: 'Medium finish with lingering smoke, cherry sweetness, and herbal notes',
      it: 'Finale medio con fumo persistente, dolcezza di ciliegia e note erbacee',
      vi: 'Kết thúc trung bình với khói kéo dài, vị ngọt cherry và hương thảo mộc',
    },
    balance: {
      en: 'The equal-parts formula creates surprising balance - each ingredient is distinct yet harmonious',
      it: 'La formula in parti uguali crea un equilibrio sorprendente - ogni ingrediente è distinto ma armonioso',
      vi: 'Công thức phần bằng nhau tạo ra sự cân bằng đáng ngạc nhiên - mỗi nguyên liệu đều riêng biệt nhưng hài hòa',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['sophisticated', 'date_night', 'aperitivo', 'conversation'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Pairs well with charcuterie, aged cheeses, duck, game meats, and chocolate desserts. Also excellent with Spanish tapas and Mediterranean cuisine.',
      it: 'Si abbina bene con salumi, formaggi stagionati, anatra, carni selvatiche e dessert al cioccolato. Eccellente anche con tapas spagnole e cucina mediterranea.',
      vi: 'Kết hợp tốt với charcuterie, phô mai ủ lâu năm, vịt, thịt thú rừng và món tráng miệng chocolate. Cũng tuyệt vời với tapas Tây Ban Nha và ẩm thực Địa Trung Hải.',
    },
    ideal_for: {
      en: 'Perfect for adventurous cocktail enthusiasts who appreciate complex, unusual flavor combinations. Ideal for Scotch lovers looking for something different and bartenders who want to showcase creativity.',
      it: 'Perfetto per appassionati di cocktail avventurosi che apprezzano combinazioni di sapori complesse e insolite. Ideale per gli amanti dello Scotch che cercano qualcosa di diverso e barman che vogliono mostrare creatività.',
      vi: 'Hoàn hảo cho những người đam mê cocktail phiêu lưu đánh giá cao sự kết hợp hương vị phức tạp, khác thường. Lý tưởng cho người yêu Scotch tìm kiếm điều gì đó khác biệt và bartender muốn thể hiện sự sáng tạo.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SCOTCH_WHISKY',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Scotch whisky', it: 'Whisky scozzese', vi: 'Whisky Scotch' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_CHERRY_HEERING',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Cherry Heering', it: 'Cherry Heering', vi: 'Cherry Heering' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until chilled. Strain into a chilled coupe or cocktail glass. No garnish needed, though an orange twist is optional.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare. Filtrare in una coppa o bicchiere da cocktail raffreddato. Nessuna guarnizione necessaria, anche se una scorza d\'arancia è opzionale.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Không cần trang trí, mặc dù vỏ cam xoắn là tùy chọn.',
  },

  glass: 'Coupe or Cocktail glass',

  garnish: {
    en: 'None (or optional orange twist)',
    it: 'Nessuna (o scorza d\'arancia opzionale)',
    vi: 'Không (hoặc vỏ cam xoắn tùy chọn)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SCOTCH_WHISKY'],

  flavor_profile: ['fruity', 'complex', 'smoky'],

  abv_estimate: 20,

  calories_estimate: 180,

  difficulty: 'medium',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'nut_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['sophisticated', 'date_night', 'aperitivo', 'conversation'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['bobby-burns', 'modern-blood-and-sand'],

  notes_for_staff: 'Use fresh orange juice - bottled won\'t work. Cherry Heering is traditional, but other cherry liqueurs can substitute. Use a blended Scotch, not single malt. The equal-parts formula is classic, but some prefer 1.5 parts Scotch for more whisky presence. Always shake vigorously to properly integrate.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/312/blood-and-sand',
    note: 'Classic recipe from Harry Craddock\'s The Savoy Cocktail Book (1930).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
