/**
 * Famous Cocktails: Blue Lagoon
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const blueLagoon: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '5e9a3b2f-7c1d-4a8e-9f3b-2d6c8a1e4f7b',
  slug: 'blue-lagoon',
  stable_key: 'blue-lagoon-tiki-tropical-famous-2025',

  name: {
    en: 'Blue Lagoon',
    it: 'Laguna Blu',
    vi: 'Blue Lagoon',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'vodka', 'blue-curacao', 'colorful', 'instagram'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A visually stunning cocktail featuring vodka, blue curaçao, and lemonade, creating an electric blue color reminiscent of tropical lagoons. The Blue Lagoon is as beautiful as it is refreshing, delivering citrus sweetness with a vibrant presentation.',
    it: 'Un cocktail visivamente sbalorditivo con vodka, blue curaçao e limonata, creando un colore blu elettrico che ricorda le lagune tropicali. La Laguna Blu è bella quanto rinfrescante, offrendo dolcezza agli agrumi con una presentazione vibrante.',
    vi: 'Một loại cocktail ấn tượng về mặt thị giác với vodka, blue curaçao và nước chanh, tạo ra màu xanh điện gợi nhớ đến các đầm phá nhiệt đới. Blue Lagoon đẹp như cách nó sảng khoái, mang đến vị ngọt cam quýt với cách trình bày sống động.',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Paris',
      bar: "Harry's New York Bar",
      country: 'France',
    },
    creator: {
      name: 'Andy MacElhone',
      profession: 'bartender',
    },
    story: {
      en: 'The Blue Lagoon was created in the 1960s by Andy MacElhone at Harry\'s New York Bar in Paris, the same legendary establishment that gave us the Bloody Mary and French 75. The cocktail was designed to showcase blue curaçao, a liqueur that was gaining popularity at the time. Its striking electric blue color made it an instant hit, especially as color photography became more prevalent in advertising. The drink gained even more fame when it shared its name with the 1980 film "The Blue Lagoon," starring Brooke Shields.',
      it: "La Laguna Blu fu creata negli anni '60 da Andy MacElhone all'Harry's New York Bar di Parigi, lo stesso leggendario locale che ci ha dato il Bloody Mary e il French 75. Il cocktail fu progettato per mostrare il blue curaçao, un liquore che stava guadagnando popolarità all'epoca. Il suo sorprendente colore blu elettrico lo rese un successo istantaneo, soprattutto quando la fotografia a colori divenne più diffusa nella pubblicità. La bevanda guadagnò ancora più fama quando condivise il suo nome con il film del 1980 \"La Laguna Blu,\" con Brooke Shields.",
      vi: 'Blue Lagoon được tạo ra vào những năm 1960 bởi Andy MacElhone tại Harry\'s New York Bar ở Paris, cùng cơ sở huyền thoại đã cho chúng ta Bloody Mary và French 75. Cocktail được thiết kế để giới thiệu blue curaçao, một loại rượu mùi đang trở nên phổ biến vào thời điểm đó. Màu xanh điện nổi bật của nó khiến nó thành công ngay lập tức, đặc biệt khi nhiếp ảnh màu trở nên phổ biến hơn trong quảng cáo. Thức uống càng nổi tiếng hơn khi nó cùng tên với bộ phim năm 1980 "The Blue Lagoon," với sự tham gia của Brooke Shields.',
    },
    named_after: {
      en: 'Named for its stunning electric blue color that evokes crystal-clear tropical lagoons and azure waters of paradise islands.',
      it: 'Prende il nome dal suo straordinario colore blu elettrico che evoca le lagune tropicali cristalline e le acque azzurre delle isole paradisiache.',
      vi: 'Được đặt theo màu xanh điện tuyệt đẹp gợi lên những đầm phá nhiệt đới trong vắt và làn nước xanh biếc của các đảo thiên đường.',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'refreshing'],
    description: {
      en: 'Sweet and citrusy with orange notes from the blue curaçao and tart lemon from the lemonade. The vodka provides a clean, neutral base. Light, refreshing, and crowd-pleasing with a beautiful tropical character.',
      it: 'Dolce e agrumato con note di arancia dal blue curaçao e limone aspro dalla limonata. La vodka fornisce una base pulita e neutra. Leggero, rinfrescante e di grande appeal con un bellissimo carattere tropicale.',
      vi: 'Ngọt và có vị cam quýt với hương cam từ blue curaçao và chanh chua từ nước chanh. Vodka cung cấp nền trung tính, sạch. Nhẹ nhàng, sảng khoái và được nhiều người yêu thích với đặc tính nhiệt đới tuyệt đẹp.',
    },
    first_impression: {
      en: 'Bright lemon sweetness with orange citrus notes from curaçao',
      it: "Luminosa dolcezza di limone con note di agrumi d'arancia dal curaçao",
      vi: 'Vị ngọt chanh tươi sáng với hương cam quýt từ curaçao',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus and subtle vodka warmth',
      it: 'Finale pulito e fresco con agrumi persistenti e sottile calore di vodka',
      vi: 'Kết thúc sạch, tươi với cam quýt kéo dài và sự ấm áp tinh tế của vodka',
    },
    balance: {
      en: 'Well-balanced sweetness with bright citrus acidity - refreshing without being cloying',
      it: 'Dolcezza ben bilanciata con vivace acidità agrumata - rinfrescante senza essere stucchevole',
      vi: 'Vị ngọt cân bằng tốt với độ axit cam quýt tươi sáng - sảng khoái mà không ngọt gắt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['pool_party', 'beach', 'celebration', 'instagram', 'summer_gathering'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Pairs well with light appetizers, seafood, grilled fish, tropical fruit platters, or coconut shrimp. Also excellent with Asian fusion cuisine and sushi.',
      it: 'Si abbina bene con antipasti leggeri, frutti di mare, pesce alla griglia, piatti di frutta tropicale o gamberi al cocco. Eccellente anche con cucina fusion asiatica e sushi.',
      vi: 'Kết hợp tốt với món khai vị nhẹ, hải sản, cá nướng, đĩa trái cây nhiệt đới hoặc tôm dừa. Cũng tuyệt vời với ẩm thực fusion Châu Á và sushi.',
    },
    ideal_for: {
      en: 'Perfect for pool parties, beach gatherings, and tropical-themed events. Ideal for those who love visually striking cocktails and sweet, easy-drinking beverages. A guaranteed Instagram hit and conversation starter.',
      it: 'Perfetto per feste in piscina, incontri in spiaggia ed eventi a tema tropicale. Ideale per chi ama i cocktail visivamente sorprendenti e le bevande dolci e facili da bere. Un successo garantito su Instagram e un ottimo inizio di conversazione.',
      vi: 'Hoàn hảo cho tiệc hồ bơi, các buổi họp mặt ở bãi biển và sự kiện chủ đề nhiệt đới. Lý tưởng cho những ai yêu thích cocktail nổi bật về mặt thị giác và đồ uống ngọt ngào, dễ uống. Chắc chắn gây ấn tượng trên Instagram và khởi đầu cuộc trò chuyện.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_BLUE_CURACAO',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Blue curaçao', it: 'Blue curaçao', vi: 'Blue curaçao' },
    },
    {
      ingredient_id: 'ING_LEMONADE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Lemonade', it: 'Limonata', vi: 'Nước chanh' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Add vodka and blue curaçao. Top with lemonade and stir gently. Garnish with lemon wheel and maraschino cherry.',
    it: 'Riempire un bicchiere highball con ghiaccio. Aggiungere vodka e blue curaçao. Completare con limonata e mescolare delicatamente. Guarnire con rotella di limone e ciliegina al maraschino.',
    vi: 'Đổ đầy ly highball với đá. Thêm vodka và blue curaçao. Hoàn thiện với nước chanh và khuấy nhẹ. Trang trí với lát chanh và cherry maraschino.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon wheel and maraschino cherry',
    it: 'Rotella di limone e ciliegina al maraschino',
    vi: 'Lát chanh tròn và cherry maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['citrus', 'sweet', 'refreshing'],

  abv_estimate: 10,

  calories_estimate: 200,

  difficulty: 'beginner',

  prep_time_seconds: 60,

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
  season_tags: ['summer', 'spring'],
  occasion_tags: ['pool_party', 'beach', 'celebration', 'instagram'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['electric-lemonade', 'blue-hawaiian', 'swimming-pool'],

  notes_for_staff:
    'Very easy to make and visually stunning. The electric blue color is the main attraction. Can substitute Sprite for lemonade if unavailable. Popular for Instagram photos - ensure good presentation. Some recipes use lemon-lime soda instead of lemonade.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/blue-lagoon/',
    notes: "Classic cocktail from Harry's New York Bar, Paris. Recipe variations exist.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
