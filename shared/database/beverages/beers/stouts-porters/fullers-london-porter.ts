import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const fullersLondonPorter: Beer = {
  id: uuidv4(),
  slug: 'fullers-london-porter',
  stable_key: 'fullers-london-porter-traditional',
  name: {
    en: "Fuller's London Porter",
    it: "Fuller's London Porter",
    vi: "Fuller's London Porter",
  },

  status: 'international_classic',
  style_category: 'stout_porter',
  style: 'porter',
  tags: ['porter', 'english', 'traditional', 'historic', 'london', 'balanced', 'sessionable'],

  origin: {
    country: 'United Kingdom',
    country_code: 'GB',
    city: 'London',
    region: 'Chiswick',
    brewery: {
      en: "Fuller's Brewery (Fuller, Smith & Turner)",
      it: "Birrificio Fuller's (Fuller, Smith & Turner)",
      vi: "Nhà máy bia Fuller's (Fuller, Smith & Turner)",
    },
    brewery_founded: 1845,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1995',
    story: {
      en: "Fuller's London Porter was introduced in 1995 to revive the historic porter style that originated in 18th-century London. Porter was the first beer style to be mass-produced and was the drink of choice for London's street and river porters, giving it its name. Fuller's version is based on historical recipes and brewing methods, using traditional brown malt and a complex blend of malts. The beer helped spark the modern porter revival and won Champion Beer of Britain in 2002. It remains one of the finest examples of the traditional London porter style.",
      it: "Fuller's London Porter fu introdotta nel 1995 per far rivivere lo storico stile porter originato nella Londra del XVIII secolo. La porter fu il primo stile di birra ad essere prodotto in massa e fu la bevanda preferita dai facchini di strada e fluviali di Londra, da cui prende il nome. La versione di Fuller's si basa su ricette storiche e metodi di produzione, utilizzando malto bruno tradizionale e una miscela complessa di malti. La birra ha contribuito a stimolare il moderno revival della porter e ha vinto Champion Beer of Britain nel 2002. Rimane uno degli esempi più raffinati dello stile tradizionale London porter.",
      vi: "Fuller's London Porter được giới thiệu năm 1995 để hồi sinh phong cách porter lịch sử có nguồn gốc từ London thế kỷ 18. Porter là phong cách bia đầu tiên được sản xuất hàng loạt và là đồ uống ưa thích của những người khuân vác đường phố và sông ở London, mang lại tên gọi cho nó. Phiên bản của Fuller's dựa trên công thức và phương pháp sản xuất lịch sử, sử dụng mạch nha nâu truyền thống và hỗn hợp mạch nha phức tạp. Bia đã giúp khơi dậy sự hồi sinh porter hiện đại và giành giải Champion Beer of Britain năm 2002. Nó vẫn là một trong những ví dụ tốt nhất về phong cách London porter truyền thống.",
    },
    awards: ['Champion Beer of Britain 2002', 'CAMRA awards', 'World Beer Awards medals'],
    named_after: {
      en: "Named after the historic London porter style and the city's working-class porters who popularized it",
      it: "Prende il nome dallo storico stile London porter e dai facchini della classe operaia della città che lo resero popolare",
      vi: "Được đặt theo tên phong cách London porter lịch sử và những người khuân vác giai cấp công nhân thành phố đã phổ biến nó",
    },
    significance: {
      en: 'One of the finest modern examples of traditional London porter, helping revive the historic style',
      it: 'Uno degli esempi moderni più raffinati del tradizionale London porter, contribuendo a far rivivere lo stile storico',
      vi: 'Một trong những ví dụ hiện đại tốt nhất về London porter truyền thống, giúp hồi sinh phong cách lịch sử',
    },
  },

  description: {
    en: "A traditional London porter brewed to historic specifications. Deep mahogany brown with ruby highlights and a tan head. It offers complex roasted malt character with chocolate, coffee, toffee, and biscuit notes. Well-balanced between malt sweetness and roasted bitterness, making it highly drinkable and sessionable.",
    it: "Un tradizionale London porter prodotto secondo specifiche storiche. Marrone mogano profondo con riflessi rubino e schiuma color nocciola. Offre un complesso carattere di malto tostato con note di cioccolato, caffè, caramello e biscotto. Ben bilanciato tra dolcezza maltata e amarezza tostata, rendendolo altamente bevibile e da sessione.",
    vi: "Một London porter truyền thống được sản xuất theo thông số lịch sử. Nâu mahogany sâu với điểm nhấn ruby và lớp bọt màu nâu nhạt. Nó mang đến đặc tính mạch nha rang phức tạp với hương chocolate, cà phê, toffee và bánh quy. Cân bằng tốt giữa vị ngọt mạch nha và vị đắng rang, khiến nó dễ uống và phù hợp với session.",
  },

  tagline: {
    en: 'A taste of 18th-century London',
    it: 'Un assaggio della Londra del XVIII secolo',
    vi: 'Hương vị của London thế kỷ 18',
  },

  characteristics: {
    abv: 5.4,
    ibu: 35,
    srm: 30,
    color: 'dark_brown',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['roasty', 'chocolate', 'coffee', 'toffee', 'balanced', 'malty', 'biscuity', 'sessionable'],
    description: {
      en: 'Complex roasted malt profile with chocolate, coffee, and toffee sweetness balanced by gentle roasted bitterness. Notes of dark bread, biscuit, caramel, and subtle hop earthiness. Medium-bodied with smooth carbonation and a dry, roasty finish. Less intense than stout but more complex than brown ale - the perfect balance.',
      it: 'Complesso profilo di malto tostato con dolcezza di cioccolato, caffè e caramello bilanciata da delicata amarezza tostata. Note di pane scuro, biscotto, caramello e sottile terrosità di luppolo. Corpo medio con carbonazione morbida e finale secco e tostato. Meno intenso della stout ma più complesso della brown ale - il perfetto equilibrio.',
      vi: 'Hồ sơ mạch nha rang phức tạp với vị ngọt chocolate, cà phê và toffee được cân bằng bởi vị đắng rang nhẹ nhàng. Hương bánh mì đen, bánh quy, caramel và hương đất hoa bia tinh tế. Thân trung bình với carbonation mượt và kết thúc khô, rang. Ít mãnh liệt hơn stout nhưng phức tạp hơn brown ale - sự cân bằng hoàn hảo.',
    },
    aroma: {
      en: 'Roasted malt, chocolate, coffee, toffee, biscuit, and subtle earthy hops',
      it: 'Malto tostato, cioccolato, caffè, caramello, biscotto e sottile luppolo terroso',
      vi: 'Mạch nha rang, chocolate, cà phê, toffee, bánh quy và hoa bia đất tinh tế',
    },
    first_impression: {
      en: 'Smooth and balanced with gentle roasted character',
      it: 'Morbido e bilanciato con delicato carattere tostato',
      vi: 'Mượt và cân bằng với đặc tính rang nhẹ nhàng',
    },
    finish: {
      en: 'Dry, roasty finish with lingering chocolate and coffee notes',
      it: 'Finale secco e tostato con note persistenti di cioccolato e caffè',
      vi: 'Kết thúc khô, rang với hương chocolate và cà phê kéo dài',
    },
    bitterness_level: 3,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale malt', 'Crystal malt', 'Brown malt', 'Chocolate malt'],
    hops: ['Goldings', 'Target'],
    yeast: "Fuller's proprietary ale yeast",
    special_ingredients: ['Traditional brown malt for historic authenticity'],
  },

  serving: {
    glass: 'pint',
    temperature: 'cellar',
    temperature_celsius: { min: 10, max: 13 },
    pouring_notes: {
      en: 'Pour into a nonic pint glass at cellar temperature (50-55°F). Allow to settle for a modest tan head. Let warm slightly for full flavor development.',
      it: 'Versare in un bicchiere pint nonic a temperatura di cantina (10-13°C). Lasciare riposare per una modesta schiuma color nocciola. Lasciare riscaldare leggermente per lo sviluppo completo del sapore.',
      vi: 'Rót vào ly pint nonic ở nhiệt độ hầm rượu (10-13°C). Để lắng cho lớp bọt màu nâu nhạt vừa phải. Để ấm lên một chút để phát triển hương vị đầy đủ.',
    },
    ideal_head: '0.5-1 inch',
    head_retention: true,
  },

  pairing: {
    food_categories: ['british-food', 'cheese', 'meat', 'stew', 'pub-food'],
    food_pairings: {
      en: "Excellent with traditional British pub fare: meat pies, bangers and mash, fish and chips, beef stew, or ploughman's lunch. The roasted character pairs well with grilled meats, aged cheeses, and roasted vegetables.",
      it: "Eccellente con il tradizionale cibo da pub britannico: torte di carne, salsicce con purè, fish and chips, stufato di manzo o ploughman's lunch. Il carattere tostato si abbina bene a carni alla griglia, formaggi stagionati e verdure arrosto.",
      vi: "Tuyệt vời với đồ ăn pub truyền thống của Anh: bánh thịt, xúc xích với khoai tây nghiền, fish and chips, món hầm thịt bò hoặc ploughman's lunch. Đặc tính rang kết hợp tốt với thịt nướng, phô mai lâu năm và rau rang.",
    },
    cheese_pairings: ['Cheddar', 'Stilton', 'Wensleydale', 'Aged gouda'],
    cuisine_pairings: ['British', 'Pub food', 'BBQ', 'Comfort food'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['pub_night', 'dinner', 'casual', 'relaxation'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['draft', 'bottle', 'can'],
  available_sizes: [330, 500],
  related_beers: ['guinness-draught', 'founders-breakfast-stout'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 78,

  source: {
    primary: 'https://www.fullers.co.uk',
    note: "Official Fuller's Brewery website and London brewing heritage since 1845",
  },

  version: 1,
};
