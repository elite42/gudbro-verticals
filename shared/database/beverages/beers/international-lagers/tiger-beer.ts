import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const tigerBeer: Beer = {
  id: uuidv4(),
  slug: 'tiger-beer',
  stable_key: 'tiger-beer-asian-lager',
  name: {
    en: 'Tiger Beer',
    it: 'Tiger Beer',
    vi: 'Bia Tiger',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'pilsner',
  tags: ['asian', 'singaporean', 'tropical', 'award-winning', 'refreshing'],

  origin: {
    country: 'Singapore',
    country_code: 'SG',
    city: 'Singapore',
    brewery: {
      en: 'Asia Pacific Breweries (Heineken Asia Pacific)',
      it: 'Asia Pacific Breweries (Heineken Asia Pacific)',
      vi: 'Asia Pacific Breweries (Heineken Asia Pacific)',
    },
    brewery_founded: 1931,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1932',
    story: {
      en: 'Tiger Beer was first brewed in 1932 by Asia Pacific Breweries, a joint venture between Heineken and Fraser & Neave. It was created to produce a high-quality beer suited to the tropical Asian climate. The tiger logo symbolizes strength and was chosen to appeal to Asian markets. Anthony Burgess famously wrote "Time for a Tiger" while drinking the beer in 1950s Malaya.',
      it: 'Tiger Beer fu prodotta per la prima volta nel 1932 da Asia Pacific Breweries, una joint venture tra Heineken e Fraser & Neave. Fu creata per produrre una birra di alta qualità adatta al clima tropicale asiatico. Il logo della tigre simboleggia la forza e fu scelto per attrarre i mercati asiatici. Anthony Burgess scrisse famosamente "Time for a Tiger" mentre beveva la birra nella Malesia degli anni \'50.',
      vi: 'Tiger Beer được sản xuất lần đầu năm 1932 bởi Asia Pacific Breweries, liên doanh giữa Heineken và Fraser & Neave. Nó được tạo ra để sản xuất bia chất lượng cao phù hợp với khí hậu nhiệt đới châu Á. Logo hổ tượng trưng cho sức mạnh và được chọn để thu hút thị trường châu Á. Anthony Burgess nổi tiếng viết "Time for a Tiger" khi uống bia ở Malaya những năm 1950.',
    },
    awards: ['World Beer Championships Gold', 'UK Brewing Industry Awards Gold'],
    named_after: {
      en: 'Named after the tiger, a symbol of strength and courage in Asian culture',
      it: 'Prende il nome dalla tigre, simbolo di forza e coraggio nella cultura asiatica',
      vi: 'Được đặt theo con hổ, biểu tượng của sức mạnh và lòng dũng cảm trong văn hóa châu Á',
    },
  },

  description: {
    en: 'Singapore\'s iconic beer, brewed for the tropical climate. A clean, refreshing lager with a balanced taste and smooth finish. Perfect for hot weather and Asian cuisine.',
    it: 'L\'iconica birra di Singapore, prodotta per il clima tropicale. Una lager pulita e rinfrescante con un gusto equilibrato e un finale morbido. Perfetta per il clima caldo e la cucina asiatica.',
    vi: 'Bia biểu tượng của Singapore, được sản xuất cho khí hậu nhiệt đới. Một loại bia lager sạch, sảng khoái với hương vị cân bằng và kết thúc mượt mà. Hoàn hảo cho thời tiết nóng và ẩm thực châu Á.',
  },

  tagline: {
    en: 'Uncage Your Tiger',
    it: 'Libera la Tua Tigre',
    vi: 'Giải Phóng Con Hổ Của Bạn',
  },

  characteristics: {
    abv: 5.0,
    ibu: 23,
    srm: 4,
    color: 'gold',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'clean', 'balanced', 'refreshing', 'smooth'],
    description: {
      en: 'Clean and balanced with subtle malt sweetness, moderate hop bitterness, and a crisp, refreshing finish. Designed to be supremely drinkable in hot climates.',
      it: 'Pulita ed equilibrata con sottile dolcezza maltata, moderata amarezza del luppolo e un finale fresco e rinfrescante. Progettata per essere supremamente bevibile nei climi caldi.',
      vi: 'Sạch và cân bằng với vị ngọt mạch nha tinh tế, đắng hoa bia vừa phải và kết thúc giòn, sảng khoái. Được thiết kế để cực kỳ dễ uống trong khí hậu nóng.',
    },
    aroma: {
      en: 'Light malt with subtle floral hop notes',
      it: 'Malto leggero con sottili note floreali di luppolo',
      vi: 'Mạch nha nhẹ với hương hoa bia tinh tế',
    },
    finish: {
      en: 'Clean, smooth finish with subtle bitterness',
      it: 'Finale pulito e morbido con sottile amarezza',
      vi: 'Kết thúc sạch, mượt với vị đắng tinh tế',
    },
    bitterness_level: 2,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Malted barley', 'Maize'],
    hops: ['European hops'],
    yeast: 'Proprietary lager yeast',
  },

  serving: {
    glass: 'pint',
    temperature: 'very_cold',
    temperature_celsius: { min: 2, max: 4 },
    pouring_notes: {
      en: 'Best served ice cold in tropical climates',
      it: 'Da servire ghiacciata nei climi tropicali',
      vi: 'Tốt nhất phục vụ lạnh đá trong khí hậu nhiệt đới',
    },
  },

  pairing: {
    food_categories: ['asian-food', 'seafood', 'spicy-food', 'grilled-dishes'],
    food_pairings: {
      en: 'Perfect with Southeast Asian cuisine: satay, chili crab, laksa, pad thai. The crisp finish cleanses the palate after spicy dishes.',
      it: 'Perfetta con la cucina del Sud-Est asiatico: satay, granchio al peperoncino, laksa, pad thai. Il finale fresco pulisce il palato dopo i piatti piccanti.',
      vi: 'Hoàn hảo với ẩm thực Đông Nam Á: satay, cua sốt ớt, laksa, pad thai. Kết thúc giòn làm sạch vị giác sau các món cay.',
    },
    cuisine_pairings: ['Singaporean', 'Malaysian', 'Thai', 'Vietnamese', 'Chinese'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['casual', 'party', 'dinner', 'bbq'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 500, 640],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 82,

  source: {
    primary: 'https://www.tigerbeer.com',
    note: 'Official Tiger Beer website and Asia Pacific Breweries history',
  },

  version: 1,
};
