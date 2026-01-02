/**
 * IBA New Era Drinks: Porn Star Martini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const pornStarMartini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '6d7e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a',
  slug: 'porn-star-martini',
  stable_key: 'd6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',

  name: {
    en: 'Porn Star Martini',
    it: 'Porn Star Martini',
    vi: 'Porn Star Martini',
    ko: '포른스타 마티니',
    ja: 'ポルノスターマティーニ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'vodka', 'passion-fruit', 'glamorous', 'modern'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A bold, glamorous cocktail combining vodka with passion fruit, vanilla, and a shot of Champagne on the side. This modern classic is sweet, fruity, and unapologetically indulgent.',
    it: 'Un cocktail audace e glamour che combina vodka con frutto della passione, vaniglia e uno shot di Champagne a parte. Questo classico moderno è dolce, fruttato e senza scuse indulgente.',
    vi: 'Một cocktail táo bạo, quyến rũ kết hợp vodka với chanh dây, vani và một shot Champagne bên cạnh. Cocktail hiện đại này ngọt, trái cây và nuông chiều không xin lỗi.',
  },

  history: {
    created_year: '2002',
    origin: {
      city: 'London',
      bar: 'Maverick Bar',
      country: 'UK',
    },
    creator: {
      name: 'Douglas Ankrah',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 2002 by Douglas Ankrah at the Maverick Bar in London. Ankrah invented the drink after visiting a gentlemen\'s club in Cape Town called the Maverick Bar, which inspired both the drink and his London venue. The provocative name was chosen to reflect the drink\'s bold, glamorous nature. Despite (or perhaps because of) its controversial name, the cocktail became enormously popular, particularly in the UK, and is now one of the best-selling cocktails worldwide.',
      it: 'Creato nel 2002 da Douglas Ankrah al Maverick Bar di Londra. Ankrah inventò la bevanda dopo aver visitato un club per gentiluomini a Città del Capo chiamato Maverick Bar, che ispirò sia la bevanda che il suo locale londinese. Il nome provocatorio fu scelto per riflettere la natura audace e glamour della bevanda. Nonostante (o forse a causa di) il suo nome controverso, il cocktail divenne enormemente popolare, particolarmente nel Regno Unito, ed è ora uno dei cocktail più venduti al mondo.',
      vi: 'Được tạo ra năm 2002 bởi Douglas Ankrah tại Maverick Bar ở London. Ankrah phát minh ra thức uống sau khi ghé thăm một câu lạc bộ dành cho quý ông ở Cape Town tên là Maverick Bar, nơi truyền cảm hứng cho cả thức uống và địa điểm London của ông. Cái tên khiêu khích được chọn để phản ánh bản chất táo bạo, quyến rũ của thức uống. Mặc dù (hoặc có lẽ vì) cái tên gây tranh cãi, cocktail đã trở nên cực kỳ phổ biến, đặc biệt ở Anh, và hiện là một trong những cocktail bán chạy nhất trên toàn thế giới.',
    },
    named_after: {
      en: 'Provocatively named to evoke glamour and indulgence, inspired by the strip clubs Ankrah visited.',
      it: 'Chiamato in modo provocatorio per evocare glamour e indulgenza, ispirato dai club di strip-tease visitati da Ankrah.',
      vi: 'Được đặt tên khiêu khích để gợi lên sự quyến rũ và nuông chiều, lấy cảm hứng từ các câu lạc bộ thoát y mà Ankrah đã ghé thăm.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'tropical'],
    description: {
      en: 'Sweet, tropical passion fruit with vanilla smoothness and vodka backbone. The Champagne sidecar adds elegance and effervescence. Rich, fruity, and indulgent.',
      it: 'Frutto della passione dolce e tropicale con morbidezza di vaniglia e struttura di vodka. Il sidecar di Champagne aggiunge eleganza ed effervescenza. Ricco, fruttato e indulgente.',
      vi: 'Chanh dây nhiệt đới ngọt với độ mượt vani và nền vodka. Champagne bên cạnh tăng thêm sự thanh lịch và sủi bọt. Đậm đà, trái cây và nuông chiều.',
    },
    first_impression: {
      en: 'Sweet passion fruit and vanilla with vodka smoothness',
      it: 'Frutto della passione dolce e vaniglia con morbidezza di vodka',
      vi: 'Chanh dây ngọt và vani với độ mượt vodka',
    },
    finish: {
      en: 'Sweet, fruity finish with lingering vanilla and tropical notes',
      it: 'Finale dolce e fruttato con vaniglia e note tropicali persistenti',
      vi: 'Kết thúc ngọt, trái cây với vani kéo dài và hương nhiệt đới',
    },
    balance: {
      en: 'Sweet and fruity with balanced acidity from passion fruit',
      it: 'Dolce e fruttato con acidità bilanciata dal frutto della passione',
      vi: 'Ngọt và trái cây với độ acid cân bằng từ chanh dây',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'girls_night', 'birthday'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Excellent with tropical fruit platters, white chocolate desserts, or as a celebratory aperitif.',
      it: 'Eccellente con piatti di frutta tropicale, dessert al cioccolato bianco, o come aperitivo celebrativo.',
      vi: 'Tuyệt vời với đĩa trái cây nhiệt đới, món tráng miệng chocolate trắng hoặc làm aperitif lễ hội.',
    },
    ideal_for: {
      en: 'Perfect for those who love sweet, fruity cocktails with a touch of glamour. Ideal for celebrations or anyone seeking an indulgent, show-stopping drink.',
      it: 'Perfetto per chi ama cocktail dolci e fruttati con un tocco di glamour. Ideale per celebrazioni o per chiunque cerchi una bevanda indulgente e scenografica.',
      vi: 'Hoàn hảo cho những ai yêu cocktail ngọt, trái cây với chút quyến rũ. Lý tưởng cho lễ kỷ niệm hoặc bất kỳ ai tìm kiếm thức uống nuông chiều, nổi bật.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA_VANILLA',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Vanilla vodka', it: 'Vodka alla vaniglia', vi: 'Vodka vani' },
    },
    {
      ingredient_id: 'ING_PASSION_FRUIT_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Passion fruit liqueur', it: 'Liquore al frutto della passione', vi: 'Rượu mùi chanh dây' },
    },
    {
      ingredient_id: 'ING_PASSION_FRUIT_PUREE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Passion fruit purée', it: 'Purea di frutto della passione', vi: 'Sinh tố chanh dây' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_CHAMPAGNE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Champagne (served on the side)', it: 'Champagne (servito a parte)', vi: 'Champagne (phục vụ riêng)' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake vodka, passion fruit liqueur, passion fruit purée, lime juice, and simple syrup with ice. Strain into a chilled coupe glass. Serve with a shot of Champagne on the side.',
    it: 'Shakerare vodka, liquore al frutto della passione, purea di frutto della passione, succo di lime e sciroppo semplice con ghiaccio. Filtrare in una coppa raffreddata. Servire con uno shot di Champagne a parte.',
    vi: 'Lắc vodka, rượu mùi chanh dây, sinh tố chanh dây, nước chanh và siro đường với đá. Lọc vào ly coupe đã làm lạnh. Phục vụ với một shot Champagne bên cạnh.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Half passion fruit',
    it: 'Mezzo frutto della passione',
    vi: 'Nửa quả chanh dây',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA_VANILLA'],

  flavor_profile: ['fruity', 'sweet', 'tropical'],

  abv_estimate: 16,

  calories_estimate: 220,

  difficulty: 'medium',

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
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all-season'],
  occasion_tags: ['party', 'celebration', 'birthday'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['passion-star-martini'],

  notes_for_staff: 'Serve Champagne shot on the side - guest can sip alternately or pour into the cocktail. Use fresh passion fruit purée for best results. Garnish with half passion fruit floating on top.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'high',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/porn-star-martini/',
    note: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
