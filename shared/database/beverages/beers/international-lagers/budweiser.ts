import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const budweiser: Beer = {
  id: uuidv4(),
  slug: 'budweiser',
  stable_key: 'budweiser-american-lager',
  name: {
    en: 'Budweiser',
    it: 'Budweiser',
    vi: 'Budweiser',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'american_lager',
  tags: ['american', 'classic', 'king-of-beers', 'iconic', 'beechwood-aged'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'St. Louis, Missouri',
    brewery: {
      en: 'Anheuser-Busch (AB InBev)',
      it: 'Anheuser-Busch (AB InBev)',
      vi: 'Anheuser-Busch (AB InBev)',
    },
    brewery_founded: 1852,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1876',
    story: {
      en: 'Introduced in 1876 by Carl Conrad & Co., Budweiser was named after the town of Budweis (České Budějovice) in Bohemia, famous for its brewing tradition. Adolphus Busch pioneered pasteurization and refrigerated rail cars to distribute the beer nationally. The "King of Beers" slogan was introduced in 1956.',
      it: 'Introdotta nel 1876 da Carl Conrad & Co., Budweiser prese il nome dalla città di Budweis (České Budějovice) in Boemia, famosa per la sua tradizione birraria. Adolphus Busch fu pioniere della pastorizzazione e dei vagoni refrigerati per distribuire la birra a livello nazionale. Lo slogan "King of Beers" fu introdotto nel 1956.',
      vi: 'Được giới thiệu năm 1876 bởi Carl Conrad & Co., Budweiser được đặt theo tên thị trấn Budweis (České Budějovice) ở Bohemia, nổi tiếng với truyền thống sản xuất bia. Adolphus Busch tiên phong trong việc thanh trùng và toa xe lạnh để phân phối bia trên toàn quốc. Khẩu hiệu "King of Beers" được giới thiệu năm 1956.',
    },
    awards: ['World Beer Cup medals', 'Great American Beer Festival awards'],
    named_after: {
      en: 'Named after Budweis (České Budějovice), a Bohemian town known for brewing since the 13th century',
      it: 'Prende il nome da Budweis (České Budějovice), una città boema nota per la produzione di birra dal XIII secolo',
      vi: 'Được đặt theo Budweis (České Budějovice), một thị trấn Bohemia nổi tiếng với việc sản xuất bia từ thế kỷ 13',
    },
  },

  description: {
    en: 'America\'s best-selling beer, known for its crisp taste and beechwood aging process. A medium-bodied American lager with a clean, refreshing finish and subtle hop bitterness.',
    it: 'La birra più venduta d\'America, nota per il suo gusto fresco e il processo di invecchiamento su legno di faggio. Una lager americana di medio corpo con un finale pulito e rinfrescante e una sottile amarezza del luppolo.',
    vi: 'Loại bia bán chạy nhất nước Mỹ, nổi tiếng với hương vị giòn và quy trình ủ gỗ sồi. Một loại bia lager Mỹ thân trung bình với kết thúc sạch, sảng khoái và vị đắng hoa bia tinh tế.',
  },

  tagline: {
    en: 'The King of Beers',
    it: 'Il Re delle Birre',
    vi: 'Vua của các loại Bia',
  },

  characteristics: {
    abv: 5.0,
    ibu: 12,
    srm: 3,
    color: 'straw',
    clarity: 'brilliant',
    carbonation: 'high',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'clean', 'balanced', 'refreshing', 'malty'],
    description: {
      en: 'Crisp and clean with a subtle sweetness from rice adjunct, light hop bitterness, and distinctive beechwood-aged smoothness.',
      it: 'Fresca e pulita con una sottile dolcezza dal riso, leggera amarezza del luppolo e distintiva morbidezza dall\'invecchiamento su legno di faggio.',
      vi: 'Giòn và sạch với vị ngọt tinh tế từ gạo, đắng hoa bia nhẹ và độ mượt đặc trưng từ ủ gỗ sồi.',
    },
    aroma: {
      en: 'Light malt sweetness with subtle floral hop notes and clean grain',
      it: 'Leggera dolcezza maltata con sottili note floreali di luppolo e grano pulito',
      vi: 'Vị ngọt mạch nha nhẹ với hương hoa bia nhẹ và ngũ cốc sạch',
    },
    finish: {
      en: 'Clean, crisp finish with subtle hop dryness',
      it: 'Finale pulito e fresco con sottile secchezza del luppolo',
      vi: 'Kết thúc sạch, giòn với vị khô nhẹ của hoa bia',
    },
    bitterness_level: 2,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Two-row barley malt', 'Rice'],
    hops: ['Hallertau', 'Saaz', 'American hops'],
    yeast: 'Budweiser proprietary lager yeast',
    adjuncts: ['Rice'],
    special_ingredients: ['Beechwood chips (for aging)'],
  },

  serving: {
    glass: 'pint',
    temperature: 'very_cold',
    temperature_celsius: { min: 2, max: 4 },
    pouring_notes: {
      en: 'Pour into a tilted glass to create a modest head, then straighten',
      it: 'Versare in un bicchiere inclinato per creare una schiuma modesta, poi raddrizzare',
      vi: 'Rót vào ly nghiêng để tạo lớp bọt vừa phải, sau đó thẳng',
    },
  },

  pairing: {
    food_categories: ['american-food', 'grilled-dishes', 'pizza', 'burgers'],
    food_pairings: {
      en: 'Perfect with classic American fare: burgers, hot dogs, pizza, BBQ ribs, and fried chicken. The crisp carbonation cuts through fatty foods.',
      it: 'Perfetta con la classica cucina americana: hamburger, hot dog, pizza, costine BBQ e pollo fritto. La carbonazione fresca taglia i cibi grassi.',
      vi: 'Hoàn hảo với món ăn Mỹ cổ điển: burger, hot dog, pizza, sườn BBQ và gà rán. Độ sủi bọt giòn cắt qua thực phẩm béo.',
    },
    cuisine_pairings: ['American', 'BBQ', 'Tex-Mex'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['casual', 'sports', 'bbq', 'party'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 355, 473, 710],
  availability: 'year_round',

  price_tier: 'value',
  popularity: 90,

  source: {
    primary: 'https://www.budweiser.com',
    note: 'Official Budweiser website and brand history',
  },

  version: 1,
};
