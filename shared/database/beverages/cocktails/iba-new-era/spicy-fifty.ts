/**
 * IBA New Era Drinks: Spicy Fifty
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const spicyFifty: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
  slug: 'spicy-fifty',
  stable_key: 'a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1',

  name: {
    en: 'Spicy Fifty',
    it: 'Spicy Fifty',
    vi: 'Spicy Fifty',
    ko: '스파이시 피프티',
    ja: 'スパイシー・フィフティ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'vodka', 'spicy', 'sophisticated', 'elegant'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant and spicy modern cocktail featuring vanilla vodka, elderflower liqueur, and fresh chili pepper. This sophisticated creation balances floral sweetness with a subtle heat, creating a refined drinking experience that showcases the versatility of contemporary mixology.',
    it: "Un cocktail moderno elegante e piccante con vodka alla vaniglia, liquore di fiori di sambuco e peperoncino fresco. Questa creazione sofisticata bilancia la dolcezza floreale con un calore sottile, creando un'esperienza di bevuta raffinata che mostra la versatilità della mixology contemporanea.",
    vi: 'Một cocktail hiện đại thanh lịch và cay với vodka vani, rượu mùi hoa cơm cháy và ớt tươi. Sáng tạo tinh tế này cân bằng vị ngọt hoa với độ nóng tinh tế, tạo trải nghiệm uống tinh chế thể hiện tính linh hoạt của nghệ thuật pha chế đương đại.',
  },

  history: {
    created_year: '2009',
    origin: {
      city: 'London',
      bar: "Skybar at Trader Vic's",
      country: 'United Kingdom',
    },
    creator: {
      name: 'Salvatore Calabrese',
      profession: 'bartender',
    },
    story: {
      en: 'Created by legendary bartender Salvatore Calabrese at the Skybar at Trader Vic\'s in London in 2009 to celebrate his 50th birthday. The "Fifty" in the name refers to both his milestone birthday and the drink\'s elegant sophistication. Calabrese wanted to create something that reflected his passion for balance and innovation, combining unexpected elements like vanilla, elderflower, and chili. The cocktail won multiple awards and became a modern classic, showcasing how spice can be incorporated elegantly into cocktails.',
      it: "Creato dal leggendario barman Salvatore Calabrese allo Skybar del Trader Vic's di Londra nel 2009 per celebrare il suo 50° compleanno. Il \"Fifty\" nel nome si riferisce sia al suo compleanno importante che all'elegante raffinatezza della bevanda. Calabrese voleva creare qualcosa che riflettesse la sua passione per l'equilibrio e l'innovazione, combinando elementi inaspettati come vaniglia, fiori di sambuco e peperoncino. Il cocktail vinse numerosi premi e divenne un classico moderno, mostrando come la spezia possa essere incorporata elegantemente nei cocktail.",
      vi: 'Được tạo ra bởi bartender huyền thoại Salvatore Calabrese tại Skybar tại Trader Vic\'s ở London năm 2009 để kỷ niệm sinh nhật thứ 50 của ông. "Fifty" trong tên đề cập đến cả sinh nhật quan trọng của ông và sự tinh tế thanh lịch của đồ uống. Calabrese muốn tạo thứ gì đó phản ánh đam mê của ông về sự cân bằng và đổi mới, kết hợp các yếu tố bất ngờ như vani, hoa cơm cháy và ớt. Cocktail giành nhiều giải thưởng và trở thành tác phẩm hiện đại, cho thấy gia vị có thể được kết hợp thanh lịch vào cocktail.',
    },
    named_after: {
      en: 'Named "Fifty" to celebrate Salvatore Calabrese\'s 50th birthday and the drink\'s sophisticated elegance befitting a milestone celebration.',
      it: 'Chiamato "Fifty" per celebrare il 50° compleanno di Salvatore Calabrese e l\'eleganza sofisticata della bevanda adatta a una celebrazione importante.',
      vi: 'Được đặt tên "Fifty" để kỷ niệm sinh nhật thứ 50 của Salvatore Calabrese và sự thanh lịch tinh tế của đồ uống xứng đáng với lễ kỷ niệm quan trọng.',
    },
  },

  taste: {
    profile: ['spicy', 'floral', 'citrus', 'sophisticated'],
    description: {
      en: "Beautifully layered with vanilla vodka's smoothness, elderflower's delicate floral notes, bright citrus from lemon and grapefruit, and a gentle warming heat from fresh chili. The spice builds gradually without overwhelming, creating an elegant complexity.",
      it: 'Magnificamente stratificato con la morbidezza della vodka alla vaniglia, note floreali delicate di fiori di sambuco, agrumi vivaci da limone e pompelmo e un delicato calore da peperoncino fresco. La spezia si sviluppa gradualmente senza sopraffare, creando una complessità elegante.',
      vi: 'Nhiều lớp tuyệt đẹp với độ mượt mà của vodka vani, nốt hoa tinh tế của hoa cơm cháy, cam chanh tươi sáng từ chanh và bưởi, và độ nóng ấm nhẹ nhàng từ ớt tươi. Gia vị tăng dần mà không áp đảo, tạo độ phức tạp thanh lịch.',
    },
    first_impression: {
      en: 'Floral elderflower and citrus with vanilla smoothness, followed by gentle heat',
      it: 'Fiori di sambuco floreali e agrumi con morbidezza di vaniglia, seguiti da calore gentile',
      vi: 'Hoa cơm cháy và cam chanh với độ mượt vani, theo sau là độ nóng nhẹ nhàng',
    },
    finish: {
      en: 'Lingering warmth with floral and citrus notes, gentle spicy tingle',
      it: 'Calore persistente con note floreali e agrumate, delicato pizzicore speziato',
      vi: 'Hơi ấm kéo dài với nốt hoa và cam chanh, tê cay nhẹ nhàng',
    },
    balance: {
      en: 'Perfectly balanced between sweet floral notes, tart citrus, vanilla smoothness, and controlled heat',
      it: 'Perfettamente bilanciato tra note floreali dolci, agrumi aspri, morbidezza di vaniglia e calore controllato',
      vi: 'Cân bằng hoàn hảo giữa nốt hoa ngọt, cam chanh chua, độ mượt vani và độ nóng được kiểm soát',
    },
  },

  recommendations: {
    best_time: ['evening', 'aperitif', 'late_night'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'cocktail_party'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with spicy Asian cuisine, ceviche, sushi, grilled seafood, and Thai dishes. Also pairs well with fresh oysters.',
      it: 'Eccellente con cucina asiatica piccante, ceviche, sushi, frutti di mare alla griglia e piatti thailandesi. Si abbina bene anche con ostriche fresche.',
      vi: 'Tuyệt vời với ẩm thực Á cay, ceviche, sushi, hải sản nướng và món Thái. Cũng kết hợp tốt với hàu tươi.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who appreciate sophisticated spice in cocktails. Ideal for those seeking an elegant aperitif with a twist. Great for impressing guests with a modern classic.',
      it: 'Perfetto per bevitori avventurosi che apprezzano spezie sofisticate nei cocktail. Ideale per chi cerca un aperitivo elegante con un tocco speciale. Ottimo per impressionare gli ospiti con un classico moderno.',
      vi: 'Hoàn hảo cho người uống phiêu lưu đánh giá cao gia vị tinh tế trong cocktail. Lý tưởng cho những ai tìm kiếm aperitif thanh lịch với chút khác biệt. Tuyệt vời để gây ấn tượng khách với tác phẩm hiện đại.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA_VANILLA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Vanilla vodka', it: 'Vodka alla vaniglia', vi: 'Vodka vani' },
    },
    {
      ingredient_id: 'ING_ELDERFLOWER_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Elderflower liqueur',
        it: 'Liquore di fiori di sambuco',
        vi: 'Rượu mùi hoa cơm cháy',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Honey syrup', it: 'Sciroppo di miele', vi: 'Siro mật ong' },
    },
    {
      ingredient_id: 'ING_RED_CHILI_PEPPER',
      quantity: { amount: 1, unit: 'slice' },
      display_name: {
        en: 'Fresh red chili pepper (1 slice)',
        it: 'Peperoncino rosso fresco (1 fetta)',
        vi: 'Ớt đỏ tươi (1 lát)',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Muddle one slice of red chili pepper in a cocktail shaker (adjust quantity for desired heat level). Add vanilla vodka, elderflower liqueur, lemon juice, honey syrup, and ice. Shake vigorously until well-chilled. Double strain into a chilled Martini glass. Float a thin slice of red chili on top as garnish.',
    it: 'Pestare una fetta di peperoncino rosso in uno shaker (regolare la quantità per il livello di piccantezza desiderato). Aggiungere vodka alla vaniglia, liquore di fiori di sambuco, succo di limone, sciroppo di miele e ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare due volte in un bicchiere Martini raffreddato. Far galleggiare una fetta sottile di peperoncino rosso sopra come guarnizione.',
    vi: 'Nghiền một lát ớt đỏ trong bình lắc (điều chỉnh số lượng cho mức độ cay mong muốn). Thêm vodka vani, rượu mùi hoa cơm cháy, nước chanh, siro mật ong và đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc kép vào ly Martini đã làm lạnh. Thả một lát mỏng ớt đỏ lên trên để trang trí.',
  },

  glass: 'Martini glass (Cocktail)',

  garnish: {
    en: 'Thin slice of fresh red chili pepper (floating)',
    it: 'Fetta sottile di peperoncino rosso fresco (galleggiante)',
    vi: 'Lát mỏng ớt đỏ tươi (nổi)',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA_VANILLA'],

  flavor_profile: ['spicy', 'floral', 'citrus', 'sophisticated'],

  abv_estimate: 17,

  calories_estimate: 170,

  difficulty: 'medium',

  prep_time_seconds: 120,

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
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['extra-spicy-fifty', 'spicy-fifty-on-rocks'],

  notes_for_staff:
    'Adjust chili quantity based on guest preference - one slice is moderate. St-Germain is standard elderflower liqueur. Honey syrup is 1:1 honey to water. Double strain to remove chili seeds.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/spicy-fifty/',
    notes:
      "IBA Official Recipe. Created by Salvatore Calabrese at Skybar, Trader Vic's London, 2009.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
