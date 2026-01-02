import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const samuelSmithTaddyPorter: Beer = {
  id: uuidv4(),
  slug: 'samuel-smith-taddy-porter',
  stable_key: 'samuel-smith-taddy-porter-british-ale',
  name: {
    en: 'Samuel Smith Taddy Porter',
    it: 'Samuel Smith Taddy Porter',
    vi: 'Samuel Smith Taddy Porter',
  },

  status: 'craft',
  style_category: 'stout_porter',
  style: 'porter',
  tags: ['british', 'porter', 'traditional', 'yorkshire', 'classic'],

  origin: {
    country: 'United Kingdom',
    country_code: 'GB',
    city: 'Tadcaster',
    brewery: {
      en: 'Samuel Smith Old Brewery',
      it: 'Antico Birrificio Samuel Smith',
      vi: 'Nhà máy bia cổ Samuel Smith',
    },
    brewery_founded: 1758,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1758',
    story: {
      en: 'Samuel Smith\'s Old Brewery in Tadcaster, Yorkshire is Britain\'s oldest brewery, dating back to 1758. Taddy Porter represents the brewery\'s commitment to traditional methods, using the same Yorkshire Square fermentation system and water from the original well. The brewery still employs coopers to maintain traditional oak casks and uses shire horses for local deliveries. This porter is brewed exactly as it was centuries ago, making it one of the most authentic traditional English porters available.',
      it: 'L\'Old Brewery di Samuel Smith a Tadcaster, nello Yorkshire, è il più antico birrificio della Gran Bretagna, risalente al 1758. Taddy Porter rappresenta l\'impegno del birrificio verso i metodi tradizionali, utilizzando lo stesso sistema di fermentazione Yorkshire Square e l\'acqua del pozzo originale. Il birrificio impiega ancora bottai per mantenere le botti di quercia tradizionali e utilizza cavalli da tiro per le consegne locali. Questa porter è prodotta esattamente come secoli fa, rendendola una delle porter inglesi tradizionali più autentiche disponibili.',
      vi: 'Nhà máy bia cổ Samuel Smith ở Tadcaster, Yorkshire là nhà máy bia lâu đời nhất của Anh, có từ năm 1758. Taddy Porter đại diện cho cam kết của nhà máy bia đối với các phương pháp truyền thống, sử dụng cùng hệ thống lên men Yorkshire Square và nước từ giếng ban đầu. Nhà máy bia vẫn thuê thợ làm thùng để bảo trì thùng gỗ sồi truyền thống và sử dụng ngựa kéo cho các lần giao hàng địa phương. Loại porter này được ủ chính xác như hàng thế kỷ trước, làm cho nó trở thành một trong những loại porter Anh truyền thống chính thống nhất hiện có.',
    },
    awards: ['Great British Beer Festival Awards', 'World Beer Awards'],
    named_after: {
      en: 'Named after the town of Tadcaster (nicknamed "Taddy") where the brewery is located',
      it: 'Prende il nome dalla città di Tadcaster (soprannominata "Taddy") dove si trova il birrificio',
      vi: 'Được đặt tên theo thị trấn Tadcaster (biệt danh "Taddy") nơi nhà máy bia nằm',
    },
  },

  description: {
    en: 'A classic English porter brewed using traditional Yorkshire Square fermentation. This deep, dark beer showcases rich roasted malt character with notes of chocolate, coffee, and dried fruit. Smooth and full-bodied with a perfect balance of sweetness and roasted bitterness, representing the authentic taste of historic English porter.',
    it: 'Una classica porter inglese prodotta utilizzando la tradizionale fermentazione Yorkshire Square. Questa birra profonda e scura presenta un ricco carattere di malto tostato con note di cioccolato, caffè e frutta secca. Morbida e corposa con un perfetto equilibrio tra dolcezza e amarezza tostata, rappresentando il gusto autentico della storica porter inglese.',
    vi: 'Một loại porter Anh cổ điển được ủ bằng phương pháp lên men Yorkshire Square truyền thống. Loại bia đậm đà, sẫm màu này thể hiện đặc tính mạch nha rang phong phú với hương sô-cô-la, cà phê và trái cây khô. Mượt mà và đầy đặn với sự cân bằng hoàn hảo giữa vị ngọt và vị đắng rang, đại diện cho hương vị chính thống của porter Anh lịch sử.',
  },

  tagline: {
    en: 'Traditional Yorkshire Porter',
    it: 'Porter Tradizionale dello Yorkshire',
    vi: 'Porter Truyền Thống Yorkshire',
  },

  characteristics: {
    abv: 5.0,
    ibu: 30,
    srm: 40,
    color: 'dark_brown',
    clarity: 'opaque',
    carbonation: 'medium',
    body: 'medium_full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['roasty', 'chocolate', 'coffee', 'malty', 'smooth', 'complex', 'fruity'],
    description: {
      en: 'Rich and complex with dominant roasted malt flavors of dark chocolate, espresso, and burnt caramel. Subtle notes of dried fruit, licorice, and toffee add depth. The Yorkshire Square fermentation imparts a distinctive fruity character. Smooth, creamy mouthfeel with a perfect balance between malt sweetness and roasted bitterness.',
      it: 'Ricca e complessa con sapori dominanti di malto tostato di cioccolato fondente, espresso e caramello bruciato. Note sottili di frutta secca, liquirizia e toffee aggiungono profondità. La fermentazione Yorkshire Square conferisce un distintivo carattere fruttato. Sensazione in bocca morbida e cremosa con un perfetto equilibrio tra dolcezza di malto e amarezza tostata.',
      vi: 'Phong phú và phức tạp với hương vị mạch nha rang chi phối của sô-cô-la đen, espresso và caramel cháy. Hương trái cây khô, cam thảo và kẹo toffee tinh tế thêm chiều sâu. Lên men Yorkshire Square tạo ra đặc tính trái cây đặc trưng. Cảm giác mượt mà, kem trong miệng với sự cân bằng hoàn hảo giữa vị ngọt mạch nha và vị đắng rang.',
    },
    aroma: {
      en: 'Rich roasted malt with chocolate, coffee, and caramel notes; subtle dark fruit and licorice undertones',
      it: 'Ricco malto tostato con note di cioccolato, caffè e caramello; sottili note di frutta scura e liquirizia di fondo',
      vi: 'Mạch nha rang phong phú với hương sô-cô-la, cà phê và caramel; nền trái cây đậm và cam thảo tinh tế',
    },
    finish: {
      en: 'Long, smooth finish with lingering roasted notes and subtle sweetness; dry but not astringent',
      it: 'Finale lungo e morbido con note tostate persistenti e dolcezza sottile; secco ma non astringente',
      vi: 'Kết thúc dài, mượt mà với hương rang kéo dài và vị ngọt tinh tế; khô nhưng không chát',
    },
    bitterness_level: 3,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale malt', 'Crystal malt', 'Chocolate malt', 'Black malt'],
    hops: ['Fuggles', 'Goldings'],
    yeast: 'Samuel Smith house yeast (Yorkshire Square strain)',
    water: 'Original well water from Tadcaster',
  },

  serving: {
    glass: 'pint',
    temperature: 'cellar',
    temperature_celsius: { min: 10, max: 13 },
    pouring_notes: {
      en: 'Pour gently into a tilted pint glass to minimize foam, then straighten to create a modest tan head. Allow to warm slightly for fuller flavor development.',
      it: 'Versare delicatamente in un bicchiere pint inclinato per ridurre al minimo la schiuma, poi raddrizzare per creare una modesta schiuma marrone chiaro. Lasciare scaldare leggermente per uno sviluppo completo del sapore.',
      vi: 'Rót nhẹ nhàng vào ly pint nghiêng để giảm thiểu bọt, sau đó thẳng để tạo lớp bọt nâu nhạt khiêm tốn. Để ấm lên một chút để phát triển hương vị đầy đủ hơn.',
    },
  },

  pairing: {
    food_categories: ['roasted-meats', 'hearty-dishes', 'desserts', 'cheese'],
    food_pairings: {
      en: 'Exceptional with rich, hearty foods: roasted meats, steak and kidney pie, venison, game birds, and aged cheeses. The roasted character pairs beautifully with chocolate desserts, tiramisu, and coffee-based sweets. Also excellent with oysters, smoked fish, and barbecued meats.',
      it: 'Eccezionale con cibi ricchi e sostanziosi: carni arrosto, torta di bistecca e rognone, cervo, selvaggina e formaggi stagionati. Il carattere tostato si abbina magnificamente con dessert al cioccolato, tiramisù e dolci a base di caffè. Eccellente anche con ostriche, pesce affumicato e carni al barbecue.',
      vi: 'Đặc biệt với thực phẩm phong phú, thịnh soạn: thịt nướng, bánh bít tết và thận, thịt nai, chim săn và phô mai ủ. Đặc tính rang kết hợp tuyệt đẹp với món tráng miệng sô-cô-la, tiramisu và kẹo cà phê. Cũng tuyệt vời với hàu, cá hun khói và thịt nướng.',
    },
    cheese_pairings: ['Stilton', 'Aged Cheddar', 'Wensleydale', 'Caerphilly', 'Roquefort'],
    cuisine_pairings: ['British', 'Game meats', 'Chocolate desserts', 'BBQ'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['dinner', 'pairing_dinner', 'relaxing', 'tasting', 'pub_night'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_organic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft', 'cask'],
  available_sizes: [330, 550],
  availability: 'year_round',

  price_tier: 'craft',
  popularity: 70,

  source: {
    primary: 'https://www.samuelsmithsbrewery.co.uk',
    note: 'Official Samuel Smith Brewery website and traditional brewing methods documentation',
  },

  version: 1,
};
