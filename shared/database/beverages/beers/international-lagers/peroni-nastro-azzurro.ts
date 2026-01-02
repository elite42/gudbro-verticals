import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const peroniNastroAzzurro: Beer = {
  id: uuidv4(),
  slug: 'peroni-nastro-azzurro',
  stable_key: 'peroni-nastro-azzurro-italian-lager',
  name: {
    en: 'Peroni Nastro Azzurro',
    it: 'Peroni Nastro Azzurro',
    vi: 'Peroni Nastro Azzurro',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'pilsner',
  tags: ['italian', 'premium', 'elegant', 'blue-ribbon', 'fashion', 'aperitivo'],

  origin: {
    country: 'Italy',
    country_code: 'IT',
    city: 'Rome',
    brewery: {
      en: 'Birra Peroni (Asahi)',
      it: 'Birra Peroni (Asahi)',
      vi: 'Birra Peroni (Asahi)',
    },
    brewery_founded: 1846,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1963',
    story: {
      en: 'Peroni was founded in 1846 in Vigevano by Francesco Peroni. Nastro Azzurro ("Blue Ribbon") was created in 1963 to celebrate Italian style and elegance. It quickly became associated with Italian fashion, design, and the dolce vita lifestyle. The beer is brewed with Italian maize for a distinctive crisp taste.',
      it: 'Peroni fu fondata nel 1846 a Vigevano da Francesco Peroni. Nastro Azzurro fu creata nel 1963 per celebrare lo stile e l\'eleganza italiana. Divenne rapidamente associata alla moda italiana, al design e allo stile di vita della dolce vita. La birra è prodotta con mais italiano per un gusto distintamente fresco.',
      vi: 'Peroni được thành lập năm 1846 tại Vigevano bởi Francesco Peroni. Nastro Azzurro ("Ruy băng Xanh") được tạo ra năm 1963 để tôn vinh phong cách và sự thanh lịch của Ý. Nó nhanh chóng được liên kết với thời trang, thiết kế và lối sống dolce vita của Ý. Bia được sản xuất với ngô Ý để có hương vị giòn đặc trưng.',
    },
    named_after: {
      en: '"Nastro Azzurro" means "Blue Ribbon" in Italian, symbolizing premium quality and Italian excellence',
      it: '"Nastro Azzurro" significa "Nastro Blu" in italiano, simbolo di qualità premium ed eccellenza italiana',
      vi: '"Nastro Azzurro" có nghĩa là "Ruy băng Xanh" trong tiếng Ý, tượng trưng cho chất lượng cao cấp và sự xuất sắc của Ý',
    },
  },

  description: {
    en: 'Italy\'s number one premium lager, known for its distinctive crisp and refreshing taste. Brewed with Italian maize, it embodies Italian style, elegance, and the spirit of aperitivo culture.',
    it: 'La lager premium numero uno d\'Italia, nota per il suo gusto distintamente fresco e rinfrescante. Prodotta con mais italiano, incarna lo stile italiano, l\'eleganza e lo spirito della cultura dell\'aperitivo.',
    vi: 'Loại bia lager cao cấp số một của Ý, nổi tiếng với hương vị giòn và sảng khoái đặc trưng. Được sản xuất với ngô Ý, nó thể hiện phong cách Ý, sự thanh lịch và tinh thần văn hóa aperitivo.',
  },

  tagline: {
    en: 'Live Every Moment',
    it: 'Vivi Ogni Momento',
    vi: 'Sống Trọn Từng Khoảnh Khắc',
  },

  characteristics: {
    abv: 5.1,
    ibu: 24,
    srm: 3,
    color: 'straw',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'clean', 'citrus', 'refreshing', 'elegant'],
    description: {
      en: 'Distinctively crisp and clean with subtle citrus notes from the Italian maize. Light bitterness, delicate malt sweetness, and an effervescent, refreshing finish.',
      it: 'Distintamente fresca e pulita con sottili note agrumate dal mais italiano. Leggera amarezza, delicata dolcezza maltata e un finale effervescente e rinfrescante.',
      vi: 'Giòn và sạch đặc trưng với hương cam quýt tinh tế từ ngô Ý. Đắng nhẹ, ngọt mạch nha tinh tế và kết thúc sủi bọt, sảng khoái.',
    },
    aroma: {
      en: 'Subtle citrus and floral hop notes with clean malt',
      it: 'Sottili note agrumate e floreali di luppolo con malto pulito',
      vi: 'Hương cam quýt và hoa bia tinh tế với mạch nha sạch',
    },
    finish: {
      en: 'Clean, crisp, and elegantly dry',
      it: 'Pulito, fresco ed elegantemente secco',
      vi: 'Sạch, giòn và khô thanh lịch',
    },
    bitterness_level: 2,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Two-row barley', 'Italian maize'],
    hops: ['German hops', 'Saaz-Saaz'],
    yeast: 'Peroni proprietary lager yeast',
  },

  serving: {
    glass: 'pilsner',
    temperature: 'cold',
    temperature_celsius: { min: 3, max: 5 },
    pouring_notes: {
      en: 'Pour slowly at an angle to preserve carbonation, finish with a finger of foam',
      it: 'Versare lentamente in diagonale per preservare la carbonazione, finire con un dito di schiuma',
      vi: 'Rót chậm nghiêng để giữ độ sủi bọt, kết thúc với một ngón tay bọt',
    },
  },

  pairing: {
    food_categories: ['italian-food', 'seafood', 'pizza', 'aperitivo'],
    food_pairings: {
      en: 'Perfect aperitivo companion. Pairs beautifully with Italian antipasti, seafood risotto, thin-crust pizza, grilled fish, and light pasta dishes.',
      it: 'Compagno perfetto per l\'aperitivo. Si abbina splendidamente con antipasti italiani, risotto ai frutti di mare, pizza a crosta sottile, pesce alla griglia e piatti di pasta leggeri.',
      vi: 'Bạn đồng hành aperitivo hoàn hảo. Kết hợp tuyệt đẹp với antipasti Ý, risotto hải sản, pizza đế mỏng, cá nướng và các món pasta nhẹ.',
    },
    cheese_pairings: ['Mozzarella', 'Burrata', 'Parmigiano-Reggiano'],
    cuisine_pairings: ['Italian', 'Mediterranean', 'Seafood'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['aperitivo', 'dinner', 'date_night', 'casual'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft'],
  available_sizes: [330, 500, 620],
  availability: 'year_round',

  price_tier: 'premium',
  popularity: 85,

  source: {
    primary: 'https://www.peroni.com',
    note: 'Official Peroni website and Italian brewing heritage',
  },

  version: 1,
};
