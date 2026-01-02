/**
 * IBA New Era Drinks: Ve.N.To (Vento)
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const vento: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
  slug: 'vento',
  stable_key: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4',

  name: {
    en: 'Ve.N.To (Vento)',
    it: 'Ve.N.To (Vento)',
    vi: 'Ve.N.To (Vento)',
    ko: '벤토',
    ja: 'ヴェント',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'italian', 'gin', 'vermouth', 'aperitivo', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A light and refreshing Italian aperitivo cocktail combining gin, sweet vermouth, and tonic water. The name Ve.N.To is an acronym for the ingredients: Vermouth, Neutral spirit (gin), and Tonic. This elegant serve celebrates the Venetian aperitivo tradition with simplicity and style.',
    it: 'Un cocktail aperitivo italiano leggero e rinfrescante che combina gin, vermouth dolce e acqua tonica. Il nome Ve.N.To è un acronimo degli ingredienti: Vermouth, Neutral spirit (gin) e Tonic. Questo servizio elegante celebra la tradizione dell\'aperitivo veneziano con semplicità e stile.',
    vi: 'Một cocktail aperitivo Ý nhẹ nhàng và sảng khoái kết hợp gin, vermouth ngọt và nước tonic. Tên Ve.N.To là từ viết tắt của các nguyên liệu: Vermouth, Neutral spirit (gin) và Tonic. Phục vụ thanh lịch này tôn vinh truyền thống aperitivo Venice với sự đơn giản và phong cách.',
  },

  history: {
    created_year: '2017',
    origin: {
      city: 'Venice',
      bar: 'Unknown',
      country: 'Italy',
    },
    creator: {
      name: 'Various bartenders in Venice',
      profession: 'bartender',
    },
    story: {
      en: 'The Ve.N.To emerged from Venice\'s aperitivo culture in the 2010s as a lighter alternative to the Negroni and Americano. Created by Venetian bartenders, the acronym Ve.N.To cleverly represents its three components: Vermouth, Neutral spirit, and Tonic. The drink became popular across Venice\'s bars and eventually spread throughout Italy and internationally. It embodies the modern Italian approach to aperitivo: refreshing, lower in alcohol, and perfect for social drinking before dinner.',
      it: 'Il Ve.N.To emerse dalla cultura dell\'aperitivo veneziano negli anni 2010 come alternativa più leggera al Negroni e all\'Americano. Creato dai barman veneziani, l\'acronimo Ve.N.To rappresenta abilmente i suoi tre componenti: Vermouth, Neutral spirit e Tonic. La bevanda divenne popolare nei bar di Venezia e alla fine si diffuse in tutta Italia e a livello internazionale. Incarna l\'approccio italiano moderno all\'aperitivo: rinfrescante, più basso in alcol e perfetto per bere socialmente prima di cena.',
      vi: 'Ve.N.To xuất hiện từ văn hóa aperitivo Venice những năm 2010 như một lựa chọn nhẹ hơn cho Negroni và Americano. Được tạo ra bởi các bartender Venice, từ viết tắt Ve.N.To khéo léo đại diện cho ba thành phần: Vermouth, Neutral spirit và Tonic. Đồ uống trở nên phổ biến khắp các quầy bar Venice và cuối cùng lan rộng khắp Ý và quốc tế. Nó thể hiện cách tiếp cận aperitivo hiện đại của Ý: sảng khoái, thấp cồn hơn và hoàn hảo để uống giao lưu trước bữa tối.',
    },
    named_after: {
      en: 'Ve.N.To is an acronym: Ve (Vermouth) + N (Neutral spirit/gin) + To (Tonic). The name also means "wind" in Italian, suggesting its light, refreshing nature.',
      it: 'Ve.N.To è un acronimo: Ve (Vermouth) + N (Neutral spirit/gin) + To (Tonic). Il nome significa anche "vento" in italiano, suggerendo la sua natura leggera e rinfrescante.',
      vi: 'Ve.N.To là từ viết tắt: Ve (Vermouth) + N (Neutral spirit/gin) + To (Tonic). Tên cũng có nghĩa là "gió" trong tiếng Ý, gợi ý tính chất nhẹ nhàng, sảng khoái.',
    },
  },

  taste: {
    profile: ['refreshing', 'herbal', 'light', 'effervescent'],
    description: {
      en: 'Light and refreshing with gin\'s botanical character balanced by sweet vermouth\'s herbal complexity and tonic water\'s effervescence and subtle bitterness. The drink is wonderfully sessionable and perfectly captures the spirit of Italian aperitivo hour.',
      it: 'Leggero e rinfrescante con il carattere botanico del gin bilanciato dalla complessità erbacea del vermouth dolce e dall\'effervescenza dell\'acqua tonica e sottile amarezza. La bevanda è meravigliosamente sessionale e cattura perfettamente lo spirito dell\'ora dell\'aperitivo italiano.',
      vi: 'Nhẹ nhàng và sảng khoái với đặc tính thực vật của gin cân bằng bởi độ phức tạp thảo mộc của vermouth ngọt và sự sủi bọt và vị đắng tinh tế của nước tonic. Đồ uống dễ uống tuyệt vời và hoàn hảo nắm bắt tinh thần giờ aperitivo Ý.',
    },
    first_impression: {
      en: 'Light botanical gin with sweet herbal vermouth and refreshing bubbles',
      it: 'Gin botanico leggero con vermouth erbaceo dolce e bollicine rinfrescanti',
      vi: 'Gin thực vật nhẹ với vermouth thảo mộc ngọt và bong bóng sảng khoái',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering herbal notes and subtle bitterness',
      it: 'Finale pulito e rinfrescante con note erbacee persistenti e sottile amarezza',
      vi: 'Kết thúc trong sạch, sảng khoái với nốt thảo mộc kéo dài và vị đắng tinh tế',
    },
    balance: {
      en: 'Perfectly balanced between botanical complexity, sweet herbal notes, and refreshing effervescence',
      it: 'Perfettamente bilanciato tra complessità botanica, note erbacee dolci ed effervescenza rinfrescante',
      vi: 'Cân bằng hoàn hảo giữa độ phức tạp thực vật, nốt thảo mộc ngọt và sự sủi bọt sảng khoái',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening', 'aperitif'],
    occasions: ['aperitivo', 'social_gathering', 'casual', 'pre_dinner'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Perfect with Italian cicchetti, olives, salted nuts, cheese and charcuterie, bruschetta, and light antipasti.',
      it: 'Perfetto con cicchetti italiani, olive, noci salate, formaggi e salumi, bruschetta e antipasti leggeri.',
      vi: 'Hoàn hảo với cicchetti Ý, ô liu, hạt muối, phô mai và thịt nguội, bruschetta và antipasti nhẹ.',
    },
    ideal_for: {
      en: 'Perfect for aperitivo hour and those seeking a lighter, refreshing alternative to heavier cocktails. Ideal for extended social drinking sessions and warm weather. Great for introducing people to aperitivo culture.',
      it: 'Perfetto per l\'ora dell\'aperitivo e per chi cerca un\'alternativa più leggera e rinfrescante ai cocktail più pesanti. Ideale per sessioni di bevute sociali estese e clima caldo. Ottimo per introdurre le persone alla cultura dell\'aperitivo.',
      vi: 'Hoàn hảo cho giờ aperitivo và những ai tìm kiếm lựa chọn nhẹ nhàng, sảng khoái thay thế cho cocktail nặng hơn. Lý tưởng cho các buổi uống giao lưu kéo dài và thời tiết ấm. Tuyệt vời để giới thiệu mọi người với văn hóa aperitivo.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth rosso', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_TONIC_WATER',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Tonic water', it: 'Acqua tonica', vi: 'Nước tonic' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a large wine glass or highball glass with ice cubes. Add gin and sweet vermouth. Stir gently to combine. Top with tonic water. Stir once briefly to integrate. Garnish with an orange slice or twist.',
    it: 'Riempire un grande bicchiere da vino o highball con cubetti di ghiaccio. Aggiungere gin e vermouth dolce. Mescolare delicatamente per combinare. Completare con acqua tonica. Mescolare una volta brevemente per integrare. Guarnire con una fetta d\'arancia o scorza.',
    vi: 'Đổ đầy ly rượu vang lớn hoặc ly highball với đá viên. Thêm gin và vermouth ngọt. Khuấy nhẹ nhàng để trộn đều. Thêm nước tonic lên trên. Khuấy một lần ngắn để hòa quyện. Trang trí với lát cam hoặc vỏ xoắn.',
  },

  glass: 'Wine glass or Highball glass',

  garnish: {
    en: 'Orange slice or twist',
    it: 'Fetta d\'arancia o scorza',
    vi: 'Lát cam hoặc vỏ xoắn',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['refreshing', 'herbal', 'light', 'effervescent'],

  abv_estimate: 8,

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free', 'low-abv'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'casual', 'social'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['vento-bianco', 'vento-rosso'],

  notes_for_staff: 'Use quality sweet vermouth (Carpano Antica, Cocchi). Good quality tonic water is important. Stir gently to preserve carbonation. Can use larger wine glass for more elegant presentation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/vento/',
    note: 'IBA Official Recipe. Originated from Venice\'s aperitivo culture, 2017.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
