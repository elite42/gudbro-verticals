/**
 * Famous Cocktails: Shark Bite
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const sharkBite: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '9f8e7d6c-5b4a-3e2d-1c0f-9e8d7c6b5a4f',
  slug: 'shark-bite',
  stable_key: 'shark-bite-tiki-tropical-famous-2025',

  name: {
    en: 'Shark Bite',
    it: 'Morso di Squalo',
    vi: 'Shark Bite',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'blue-curacao', 'layered', 'instagram'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A visually dramatic cocktail combining rum and blue curaçao with tropical juices, finished with a grenadine "blood" drip that creates the appearance of a shark bite. This Instagram-worthy drink is as fun to look at as it is to drink.',
    it: 'Un cocktail visivamente drammatico che combina rum e blue curaçao con succhi tropicali, finito con una goccia di granatina "sangue" che crea l\'aspetto di un morso di squalo. Questa bevanda degna di Instagram è divertente da guardare quanto da bere.',
    vi: 'Một loại cocktail ấn tượng về mặt hình ảnh kết hợp rum và blue curaçao với nước ép nhiệt đới, hoàn thiện với giọt grenadine "máu" tạo ra vẻ ngoài của vết cắn cá mập. Thức uống xứng đáng Instagram này vui để nhìn như vui để uống.',
  },

  history: {
    created_year: '1980s',
    origin: {
      city: 'Various',
      bar: 'Beach Bars',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Shark Bite emerged in the 1980s during the height of theatrical tiki cocktail culture. Created in beach bars catering to tourists, the drink\'s dramatic presentation - featuring a "bloody" grenadine drip that resembles a shark bite - made it an instant hit. The cocktail gained popularity at beach resorts and tiki bars, where bartenders would often add theatrical flair by drizzling the grenadine dramatically while telling stories of shark encounters. Its visual appeal has made it a social media favorite in recent years.',
      it: "Il Morso di Squalo emerse negli anni '80 durante l'apice della cultura teatrale dei cocktail tiki. Creato nei bar sulla spiaggia per turisti, la drammatica presentazione della bevanda - con una goccia di granatina \"sanguinosa\" che assomiglia a un morso di squalo - la rese un successo immediato. Il cocktail acquisì popolarità nei resort sulla spiaggia e nei bar tiki, dove i barman spesso aggiungevano un tocco teatrale versando la granatina in modo drammatico mentre raccontavano storie di incontri con squali. Il suo appeal visivo l'ha resa una favorita dei social media negli ultimi anni.",
      vi: 'Shark Bite xuất hiện vào những năm 1980 trong thời kỳ đỉnh cao của văn hóa cocktail tiki sân khấu. Được tạo ra tại các quán bar bãi biển phục vụ khách du lịch, cách trình bày ấn tượng của thức uống - với giọt grenadine "đẫm máu" giống như vết cắn cá mập - khiến nó thành công ngay lập tức. Cocktail trở nên phổ biến tại các khu nghỉ dưỡng bãi biển và quán bar tiki, nơi các bartender thường thêm nét sân khấu bằng cách rưới grenadine một cách ấn tượng trong khi kể chuyện về cuộc gặp gỡ cá mập. Sức hấp dẫn thị giác của nó đã khiến nó trở thành món ưa thích trên mạng xã hội trong những năm gần đây.',
    },
    named_after: {
      en: 'Named for the dramatic visual effect created by the grenadine drip, which resembles blood from a shark bite in the blue ocean-colored drink.',
      it: "Prende il nome dall'effetto visivo drammatico creato dalla goccia di granatina, che assomiglia al sangue di un morso di squalo nella bevanda color oceano blu.",
      vi: 'Được đặt theo hiệu ứng hình ảnh ấn tượng được tạo ra bởi giọt grenadine, giống như máu từ vết cắn cá mập trong thức uống màu xanh đại dương.',
    },
  },

  taste: {
    profile: ['fruity', 'tropical', 'sweet'],
    description: {
      en: 'Sweet and tropical with blue curaçao orange notes, rum warmth, and tropical fruit flavors. The grenadine adds a sweet cherry finish. Light, refreshing, and dangerously easy to drink despite its dramatic appearance.',
      it: 'Dolce e tropicale con note di arancia del blue curaçao, calore del rum e sapori di frutta tropicale. La granatina aggiunge un finale dolce di ciliegia. Leggero, rinfrescante e pericolosamente facile da bere nonostante il suo aspetto drammatico.',
      vi: 'Ngọt và nhiệt đới với hương cam blue curaçao, sự ấm áp của rum và hương vị trái cây nhiệt đới. Grenadine thêm hương vị cherry ngọt ngào. Nhẹ nhàng, sảng khoái và dễ uống nguy hiểm bất chấp vẻ ngoài ấn tượng.',
    },
    first_impression: {
      en: 'Sweet tropical fruit and orange citrus with vibrant blue color',
      it: "Frutta tropicale dolce e agrumi d'arancia con colore blu vibrante",
      vi: 'Trái cây nhiệt đới ngọt và cam quýt với màu xanh sống động',
    },
    finish: {
      en: 'Sweet cherry-pomegranate finish from grenadine with lingering rum warmth',
      it: 'Finale dolce di ciliegia-melograno dalla granatina con calore persistente del rum',
      vi: 'Kết thúc cherry-lựu ngọt ngào từ grenadine với sự ấm áp kéo dài của rum',
    },
    balance: {
      en: 'Sweet and fruity with good tropical balance - the grenadine adds visual drama without overpowering',
      it: 'Dolce e fruttato con buon equilibrio tropicale - la granatina aggiunge dramma visivo senza sopraffare',
      vi: 'Ngọt và trái cây với sự cân bằng nhiệt đới tốt - grenadine thêm kịch tính thị giác mà không áp đảo',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['pool_party', 'beach', 'celebration', 'instagram', 'themed_party'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Perfect with fish and chips, coconut shrimp, ceviche, poke bowls, or tropical fruit platters. Also pairs well with Hawaiian pizza and Caribbean seafood dishes.',
      it: 'Perfetto con fish and chips, gamberi al cocco, ceviche, poke bowl o piatti di frutta tropicale. Si abbina bene anche con pizza hawaiana e piatti di pesce caraibici.',
      vi: 'Hoàn hảo với fish and chips, tôm dừa, ceviche, poke bowl hoặc đĩa trái cây nhiệt đới. Cũng kết hợp tốt với pizza Hawaii và các món hải sản Caribbean.',
    },
    ideal_for: {
      en: 'Perfect for pool parties, beach bars, and tropical-themed events. Ideal for those who love visually striking cocktails and social media moments. Great for shark week celebrations or ocean-themed parties.',
      it: 'Perfetto per feste in piscina, bar sulla spiaggia ed eventi a tema tropicale. Ideale per chi ama i cocktail visivamente sorprendenti e i momenti sui social media. Ottimo per le celebrazioni della settimana degli squali o feste a tema oceanico.',
      vi: 'Hoàn hảo cho tiệc hồ bơi, quán bar bãi biển và sự kiện chủ đề nhiệt đới. Lý tưởng cho những ai yêu thích cocktail nổi bật về mặt hình ảnh và khoảnh khắc trên mạng xã hội. Tuyệt vời cho lễ kỷ niệm tuần cá mập hoặc tiệc chủ đề đại dương.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_BLUE_CURACAO',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Blue curaçao', it: 'Blue curaçao', vi: 'Blue curaçao' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ép dứa' },
    },
    {
      ingredient_id: 'ING_SWEET_AND_SOUR_MIX',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet and sour mix', it: 'Mix agrodolce', vi: 'Hỗn hợp ngọt chua' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add rum, blue curaçao, pineapple juice, and sweet and sour mix to a shaker with ice. Shake well and strain into a hurricane glass filled with ice. Slowly drizzle grenadine down the side of the glass to create a "blood" effect at the bottom.',
    it: 'Aggiungere rum, blue curaçao, succo di ananas e mix agrodolce in uno shaker con ghiaccio. Shakerare bene e filtrare in un bicchiere hurricane pieno di ghiaccio. Versare lentamente la granatina lungo il lato del bicchiere per creare un effetto "sangue" sul fondo.',
    vi: 'Thêm rum, blue curaçao, nước ép dứa và hỗn hợp ngọt chua vào bình lắc với đá. Lắc kỹ và lọc vào ly hurricane đầy đá. Từ từ rưới grenadine xuống bên cạnh ly để tạo hiệu ứng "máu" ở đáy.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Orange slice and maraschino cherry, optional gummy shark',
    it: 'Fetta di arancia e ciliegina al maraschino, squalo gommoso opzionale',
    vi: 'Lát cam và cherry maraschino, cá mập dẻo tùy chọn',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['fruity', 'tropical', 'sweet'],

  abv_estimate: 12,

  calories_estimate: 250,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['summer', 'year_round'],
  occasion_tags: ['pool_party', 'beach', 'celebration', 'instagram'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['virgin-shark-bite', 'frozen-shark-bite', 'shark-attack'],

  notes_for_staff:
    'Drizzle grenadine slowly down the inside of glass for "blood" effect - don\'t stir after adding. Very Instagram-worthy - encourage photos before drinking. Can add gummy shark as fun garnish. Sweet and sour mix can be replaced with fresh lemon/lime juice and simple syrup.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/shark-bite/',
    notes: 'Popular beach bar cocktail. Multiple recipe variations exist.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
