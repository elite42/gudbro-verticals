import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const newcastleBrownAle: Beer = {
  id: uuidv4(),
  slug: 'newcastle-brown-ale',
  stable_key: 'newcastle-brown-ale-british-ale',
  name: {
    en: 'Newcastle Brown Ale',
    it: 'Newcastle Brown Ale',
    vi: 'Newcastle Brown Ale',
  },

  status: 'international_classic',
  style_category: 'ale',
  style: 'brown_ale',
  tags: ['british', 'brown-ale', 'iconic', 'geordie', 'classic'],

  origin: {
    country: 'United Kingdom',
    country_code: 'GB',
    city: 'Newcastle upon Tyne',
    brewery: {
      en: 'Newcastle Breweries',
      it: 'Birrificio Newcastle',
      vi: 'Nhà máy bia Newcastle',
    },
    brewery_founded: 1927,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1927',
    story: {
      en: 'Created in 1927 by Colonel Jim Porter, Newcastle Brown Ale quickly became the most popular bottled beer in the UK. The beer was specifically developed to appeal to the working-class population of Newcastle. Its distinctive blue star logo became iconic, and the beer earned the nickname "The Dog" among locals. It won the Challenge Cup for Champion Beer of Britain in its first year of production.',
      it: 'Creata nel 1927 dal colonnello Jim Porter, Newcastle Brown Ale divenne rapidamente la birra in bottiglia più popolare nel Regno Unito. La birra fu sviluppata specificamente per attrarre la popolazione operaia di Newcastle. Il suo distintivo logo a stella blu divenne iconico e la birra guadagnò il soprannome "The Dog" tra la gente del posto. Vinse la Challenge Cup per Champion Beer of Britain nel suo primo anno di produzione.',
      vi: 'Được tạo ra vào năm 1927 bởi Đại tá Jim Porter, Newcastle Brown Ale nhanh chóng trở thành bia chai phổ biến nhất ở Anh. Bia được phát triển đặc biệt để hấp dẫn tầng lớp lao động của Newcastle. Logo ngôi sao xanh đặc trưng của nó trở thành biểu tượng, và bia có biệt danh "The Dog" trong người dân địa phương. Nó đã giành được Challenge Cup cho Champion Beer of Britain trong năm sản xuất đầu tiên.',
    },
    awards: ['Challenge Cup 1927', 'International Beer Challenge Gold'],
    named_after: {
      en: 'Named after the city of Newcastle upon Tyne in Northeast England',
      it: 'Prende il nome dalla città di Newcastle upon Tyne nel nord-est dell\'Inghilterra',
      vi: 'Được đặt tên theo thành phố Newcastle upon Tyne ở Đông Bắc Anh',
    },
  },

  description: {
    en: 'A smooth, easy-drinking English brown ale with a distinctive ruby-brown color. This iconic beer combines a subtle sweetness with a gentle nutty character, creating a balanced and approachable beer that has become synonymous with British brewing tradition.',
    it: 'Una brown ale inglese morbida e facile da bere con un distintivo colore bruno-rubino. Questa birra iconica combina una sottile dolcezza con un delicato carattere di nocciola, creando una birra equilibrata e accessibile che è diventata sinonimo della tradizione birraria britannica.',
    vi: 'Một loại bia nâu Anh mượt mà, dễ uống với màu nâu ruby đặc trưng. Loại bia biểu tượng này kết hợp vị ngọt tinh tế với đặc tính hạt dẻo nhẹ nhàng, tạo ra một loại bia cân bằng và dễ tiếp cận đã trở thành từ đồng nghĩa với truyền thống bia Anh.',
  },

  tagline: {
    en: "The One and Only",
    it: 'L\'Unica e Sola',
    vi: 'Độc Nhất Vô Nhị',
  },

  characteristics: {
    abv: 4.7,
    ibu: 23,
    srm: 18,
    color: 'brown',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['smooth', 'nutty', 'caramel', 'malty', 'sweet', 'balanced'],
    description: {
      en: 'Smooth and mellow with flavors of caramel, toffee, and toasted nuts. A subtle sweetness is balanced by gentle hop bitterness. The beer has a creamy mouthfeel with notes of dried fruit and a hint of chocolate in the background.',
      it: 'Morbida e delicata con sapori di caramello, toffee e noci tostate. Una sottile dolcezza è bilanciata da una delicata amarezza di luppolo. La birra ha una sensazione cremosa in bocca con note di frutta secca e un accenno di cioccolato sullo sfondo.',
      vi: 'Mượt mà và dịu dàng với hương vị caramel, kẹo toffee và hạt rang. Vị ngọt tinh tế được cân bằng bởi vị đắng hoa bia nhẹ nhàng. Bia có cảm giác sảng khoái trong miệng với hương trái cây khô và một chút sô-cô-la phía sau.',
    },
    aroma: {
      en: 'Gentle malt sweetness with caramel, toffee, and nutty notes; subtle fruity esters and minimal hop presence',
      it: 'Delicata dolcezza di malto con note di caramello, toffee e nocciola; sottili esteri fruttati e presenza minima di luppolo',
      vi: 'Vị ngọt mạch nha nhẹ nhàng với hương caramel, toffee và hạt; ester trái cây tinh tế và hoa bia tối thiểu',
    },
    finish: {
      en: 'Smooth, clean finish with lingering sweetness and a gentle dry note',
      it: 'Finale morbido e pulito con dolcezza persistente e una delicata nota secca',
      vi: 'Kết thúc mượt mà, sạch với vị ngọt kéo dài và nốt khô nhẹ nhàng',
    },
    bitterness_level: 2,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale malt', 'Crystal malt', 'Chocolate malt'],
    hops: ['English hops', 'Fuggles', 'Goldings'],
    yeast: 'English ale yeast',
  },

  serving: {
    glass: 'nonic',
    temperature: 'cool',
    temperature_celsius: { min: 8, max: 10 },
    pouring_notes: {
      en: 'Pour in one smooth motion into a tilted glass to create a small creamy head',
      it: 'Versare in un movimento fluido in un bicchiere inclinato per creare una piccola schiuma cremosa',
      vi: 'Rót trong một chuyển động mượt mà vào ly nghiêng để tạo lớp bọt kem nhỏ',
    },
  },

  pairing: {
    food_categories: ['pub-food', 'grilled-meats', 'hearty-dishes'],
    food_pairings: {
      en: 'Excellent with hearty British fare: meat pies, grilled sausages, roasted chicken, burgers, and sharp cheddar. The nutty sweetness pairs well with barbecue and smoked meats. Also great with chocolate desserts.',
      it: 'Eccellente con sostanziosi piatti britannici: torte di carne, salsicce grigliate, pollo arrosto, hamburger e cheddar stagionato. La dolcezza di nocciola si abbina bene con barbecue e carni affumicate. Ottima anche con dessert al cioccolato.',
      vi: 'Tuyệt vời với món ăn Anh thịnh soạn: bánh thịt, xúc xích nướng, gà quay, burger và phô mai cheddar. Vị ngọt hạt kết hợp tốt với thịt nướng và hun khói. Cũng tuyệt vời với món tráng miệng sô-cô-la.',
    },
    cheese_pairings: ['Sharp Cheddar', 'Gouda', 'Gruyère', 'Blue cheese'],
    cuisine_pairings: ['British', 'American BBQ', 'Pub fare', 'Comfort food'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['casual', 'pub_night', 'sports', 'relaxing', 'bbq'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 500, 550],
  availability: 'year_round',

  price_tier: 'value',
  popularity: 82,

  source: {
    primary: 'https://www.newcastlebrown.com',
    note: 'Official Newcastle Brown Ale website and brewing history',
  },

  version: 1,
};
