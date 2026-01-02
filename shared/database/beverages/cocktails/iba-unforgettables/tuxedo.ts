/**
 * IBA Unforgettables: Tuxedo
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tuxedo: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  slug: 'tuxedo',
  stable_key: 'b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1',

  name: {
    en: 'Tuxedo',
    it: 'Tuxedo',
    vi: 'Tuxedo',
    ko: '턱시도',
    ja: 'タキシード',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'stirred', 'dry', 'sophisticated', 'martini-variation'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated variation on the classic Martini that adds maraschino liqueur to dry vermouth and a hint of absinthe to the final mix. The Tuxedo is dry, elegant, and complex - as refined as the formal attire it\'s named after.',
    it: 'Una sofisticata variazione del classico Martini che aggiunge liquore maraschino al vermouth secco e un tocco di assenzio al mix finale. Il Tuxedo è secco, elegante e complesso - raffinato come l\'abbigliamento formale da cui prende il nome.',
    vi: 'Một biến thể tinh tế của Martini cổ điển thêm liqueur maraschino vào vermouth khô và một chút absinthe vào hỗn hợp cuối cùng. Tuxedo khô, thanh lịch và phức tạp - tinh tế như trang phục chính thức mà nó được đặt tên.',
  },

  history: {
    created_year: '1880s',
    origin: {
      city: 'New York City',
      bar: 'Tuxedo Club',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Tuxedo cocktail is believed to have originated at the Tuxedo Club in Tuxedo Park, New York, in the late 1880s - the same exclusive club where the tuxedo dinner jacket was popularized. The drink is a variation on the classic Martini, adding maraschino liqueur and absinthe for extra complexity. It represents the height of pre-Prohibition cocktail sophistication.',
      it: 'Si ritiene che il cocktail Tuxedo abbia avuto origine al Tuxedo Club di Tuxedo Park, New York, alla fine degli anni 1880 - lo stesso club esclusivo dove fu reso popolare lo smoking. La bevanda è una variazione del classico Martini, aggiungendo liquore maraschino e assenzio per maggiore complessità. Rappresenta l\'apice della sofisticazione cocktail pre-Proibizionismo.',
      vi: 'Cocktail Tuxedo được cho là có nguồn gốc tại Tuxedo Club ở Tuxedo Park, New York, vào cuối những năm 1880 - cùng câu lạc bộ độc quyền nơi áo khoác tuxedo được phổ biến. Thức uống là một biến thể của Martini cổ điển, thêm liqueur maraschino và absinthe để tăng độ phức tạp. Nó đại diện cho đỉnh cao của sự tinh tế cocktail trước Cấm rượu.',
    },
    named_after: {
      en: 'Named after the Tuxedo Club in Tuxedo Park, New York, where both the cocktail and the tuxedo formal wear were popularized.',
      it: 'Prende il nome dal Tuxedo Club di Tuxedo Park, New York, dove sia il cocktail che l\'abbigliamento formale tuxedo furono resi popolari.',
      vi: 'Được đặt tên theo Tuxedo Club ở Tuxedo Park, New York, nơi cả cocktail và trang phục tuxedo đều được phổ biến.',
    },
  },

  taste: {
    profile: ['dry', 'herbal', 'complex'],
    description: {
      en: 'Dry and botanical with the gin and vermouth foundation enhanced by subtle cherry-almond notes from maraschino and a whisper of herbal absinthe. Orange bitters add aromatic complexity. Elegant and refined.',
      it: 'Secco e botanico con la base di gin e vermouth arricchita da sottili note di ciliegia-mandorla dal maraschino e un sussurro di assenzio erbaceo. Gli orange bitters aggiungono complessità aromatica. Elegante e raffinato.',
      vi: 'Khô và thực vật với nền tảng gin và vermouth được tăng cường bởi hương cherry-hạnh nhân tinh tế từ maraschino và một chút absinthe thảo mộc. Orange bitters thêm độ phức tạp thơm. Thanh lịch và tinh tế.',
    },
    first_impression: {
      en: 'Dry gin with subtle cherry and herbal notes',
      it: 'Gin secco con sottili note di ciliegia ed erbacee',
      vi: 'Gin khô với hương cherry và thảo mộc tinh tế',
    },
    finish: {
      en: 'Clean, dry finish with lingering botanical and maraschino complexity',
      it: 'Finale pulito e secco con complessità botanica e maraschino persistente',
      vi: 'Kết thúc sạch sẽ, khô với độ phức tạp thực vật và maraschino kéo dài',
    },
    balance: {
      en: 'Dry and spirit-forward with subtle sweet and herbal modifiers',
      it: 'Secco e ricco di spirito con modificatori dolci ed erbacei sottili',
      vi: 'Khô và hướng rượu với chất điều chỉnh ngọt và thảo mộc tinh tế',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'evening', 'pre_dinner'],
    occasions: ['aperitivo', 'formal_event', 'date_night', 'sophisticated_gathering'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Excellent with oysters, caviar, smoked salmon, or other elegant appetizers. Pairs well with olives, nuts, and sophisticated canapés.',
      it: 'Eccellente con ostriche, caviale, salmone affumicato o altri antipasti eleganti. Si abbina bene con olive, noci e canapé sofisticati.',
      vi: 'Tuyệt vời với hàu, trứng cá muối, cá hồi hun khói hoặc các món khai vị thanh lịch khác. Kết hợp tốt với ô liu, hạt và canapé tinh tế.',
    },
    ideal_for: {
      en: 'Perfect for Martini lovers seeking a more complex variation. Ideal for sophisticated drinkers who appreciate dry, spirit-forward cocktails with subtle complexity.',
      it: 'Perfetto per gli amanti del Martini che cercano una variazione più complessa. Ideale per bevitori sofisticati che apprezzano cocktail secchi e ricchi di spirito con complessità sottile.',
      vi: 'Hoàn hảo cho người yêu Martini tìm kiếm một biến thể phức tạp hơn. Lý tưởng cho những người uống tinh tế đánh giá cao cocktail khô, hướng rượu với độ phức tạp tinh tế.',
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
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermouth secco', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 5, unit: 'ml' },
      display_name: { en: 'Maraschino liqueur', it: 'Liquore maraschino', vi: 'Liqueur maraschino' },
    },
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 2, unit: 'barspoon' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
    {
      ingredient_id: 'ING_ORANGE_BITTERS',
      quantity: { amount: 3, unit: 'dash' },
      display_name: { en: 'Orange bitters', it: 'Orange bitters', vi: 'Orange bitters' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled martini cocktail glass. Garnish with a cherry and a twist of lemon zest.',
    it: 'Versare tutti gli ingredienti in un mixing glass con cubetti di ghiaccio. Mescolare bene. Filtrare in una coppa da martini raffreddata. Guarnire con una ciliegia e una scorza di limone.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn với đá viên. Khuấy đều. Lọc vào ly martini đã làm lạnh. Trang trí với cherry và vỏ chanh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Maraschino cherry and lemon twist',
    it: 'Ciliegia maraschino e scorza di limone',
    vi: 'Cherry maraschino và vỏ chanh',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['dry', 'herbal', 'complex'],

  abv_estimate: 28, // ~28% ABV after dilution

  calories_estimate: 150,

  difficulty: 'intermediate',

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
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['aperitivo', 'formal_event', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['dry-martini', 'martinez', 'aviation'],

  notes_for_staff: 'Stir gently but thoroughly for proper dilution. The equal parts gin and vermouth make this wetter than a modern Martini. Maraschino and absinthe should be subtle - don\'t overdo. Express lemon oils over drink before garnishing.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/tuxedo/',
    note: 'IBA Official Recipe. Historical information from Tuxedo Club history and pre-Prohibition cocktail documentation.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
