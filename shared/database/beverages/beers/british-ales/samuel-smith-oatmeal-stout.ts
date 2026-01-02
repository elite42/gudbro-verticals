import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const samuelSmithOatmealStout: Beer = {
  id: uuidv4(),
  slug: 'samuel-smith-oatmeal-stout',
  stable_key: 'samuel-smith-oatmeal-stout-british',
  name: {
    en: 'Samuel Smith Oatmeal Stout',
    it: 'Samuel Smith Oatmeal Stout',
    vi: 'Samuel Smith Oatmeal Stout',
  },

  status: 'traditional_classic',
  style_category: 'stout',
  style: 'oatmeal_stout',
  tags: ['british', 'yorkshire', 'traditional', 'smooth', 'velvety', 'historic-brewery', 'bottle-conditioned'],

  origin: {
    country: 'United Kingdom',
    country_code: 'GB',
    region: 'Yorkshire',
    city: 'Tadcaster',
    brewery: {
      en: "Samuel Smith's Old Brewery",
      it: "Samuel Smith's Old Brewery",
      vi: "Samuel Smith's Old Brewery",
    },
    brewery_founded: 1758,
    brewery_type: 'independent',
  },

  history: {
    first_brewed: '1980',
    story: {
      en: "Samuel Smith's Old Brewery is Yorkshire's oldest brewery, founded in 1758. The Oatmeal Stout was introduced in 1980 as a revival of the traditional oatmeal stout style that had largely disappeared after WWII. Samuel Smith still uses traditional Yorkshire Square fermentation vessels and draws water from the original well dug in 1758. The brewery is one of the few remaining independent breweries still using traditional methods and refusing to pasteurize their beers. The addition of oatmeal creates an exceptionally smooth, silky mouthfeel.",
      it: "Samuel Smith's Old Brewery è il più antico birrificio dello Yorkshire, fondato nel 1758. La Oatmeal Stout fu introdotta nel 1980 come revival dello stile tradizionale della oatmeal stout che era in gran parte scomparso dopo la seconda guerra mondiale. Samuel Smith utilizza ancora i tradizionali recipienti di fermentazione Yorkshire Square e attinge acqua dal pozzo originale scavato nel 1758. Il birrificio è uno dei pochi birrifici indipendenti rimasti che utilizzano ancora metodi tradizionali e si rifiutano di pastorizzare le loro birre. L'aggiunta di farina d'avena crea una sensazione in bocca eccezionalmente morbida e setosa.",
      vi: "Samuel Smith's Old Brewery là nhà máy bia lâu đời nhất của Yorkshire, được thành lập năm 1758. Oatmeal Stout được giới thiệu năm 1980 như sự hồi sinh của phong cách oatmeal stout truyền thống đã biến mất phần lớn sau Thế chiến II. Samuel Smith vẫn sử dụng bình lên men Yorkshire Square truyền thống và lấy nước từ giếng ban đầu được đào năm 1758. Nhà máy bia là một trong số ít nhà máy bia độc lập còn lại vẫn sử dụng phương pháp truyền thống và từ chối thanh trùng bia của họ. Việc bổ sung yến mạch tạo ra cảm giác trong miệng mịn màng, mượt mà đặc biệt.",
    },
    awards: ['Great British Beer Festival awards', 'CAMRA recognition'],
    named_after: {
      en: 'Named after founder Samuel Smith and the use of oatmeal in the brewing process',
      it: 'Prende il nome dal fondatore Samuel Smith e dall\'uso di farina d\'avena nel processo di produzione',
      vi: 'Được đặt theo tên người sáng lập Samuel Smith và việc sử dụng yến mạch trong quy trình sản xuất bia',
    },
    significance: {
      en: 'Helped revive the oatmeal stout style and represents traditional Yorkshire brewing heritage with historic brewing methods',
      it: 'Ha contribuito a far rivivere lo stile oatmeal stout e rappresenta l\'eredità tradizionale della produzione di birra dello Yorkshire con metodi di produzione storici',
      vi: 'Giúp hồi sinh phong cách oatmeal stout và đại diện cho di sản sản xuất bia truyền thống Yorkshire với phương pháp sản xuất lịch sử',
    },
  },

  description: {
    en: 'A luxuriously smooth and velvety oatmeal stout brewed with traditional methods. The addition of oats creates an exceptionally silky mouthfeel while roasted malts provide rich coffee and chocolate flavors. Beautifully balanced, complex, and deeply satisfying - a classic example of Yorkshire brewing tradition.',
    it: 'Una oatmeal stout lussuosamente morbida e vellutata prodotta con metodi tradizionali. L\'aggiunta di avena crea una sensazione in bocca eccezionalmente setosa mentre i malti tostati forniscono ricchi sapori di caffè e cioccolato. Magnificamente equilibrata, complessa e profondamente soddisfacente - un esempio classico della tradizione birraria dello Yorkshire.',
    vi: 'Một oatmeal stout sang trọng mượt mà và mềm mại được sản xuất bằng phương pháp truyền thống. Việc bổ sung yến mạch tạo ra cảm giác trong miệng mượt như lụa đặc biệt trong khi mạch nha rang mang lại hương vị cà phê và sô-cô-la phong phú. Cân bằng tuyệt đẹp, phức tạp và thỏa mãn sâu sắc - một ví dụ kinh điển về truyền thống sản xuất bia Yorkshire.',
  },

  tagline: {
    en: 'Silky Smooth Since 1980',
    it: 'Setosa e Morbida dal 1980',
    vi: 'Mượt Mà Như Lụa Từ 1980',
  },

  characteristics: {
    abv: 5.0,
    ibu: 35,
    srm: 40,
    color: 'black',
    clarity: 'opaque',
    carbonation: 'low',
    body: 'full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['smooth', 'velvety', 'roasty', 'chocolate', 'coffee', 'creamy', 'complex', 'rich'],
    description: {
      en: 'Exceptionally smooth and silky mouthfeel from the oats. Rich roasted malt flavors with notes of dark chocolate, espresso coffee, and toasted grains. Subtle sweetness balanced by gentle roasted bitterness. Hints of caramel and vanilla add complexity. The Yorkshire Square fermentation contributes a subtle fruity character (dark fruit, plum). The finish is long and satisfying with lingering chocolate and coffee notes.',
      it: 'Sensazione in bocca eccezionalmente morbida e setosa dall\'avena. Ricchi sapori di malto tostato con note di cioccolato fondente, caffè espresso e cereali tostati. Sottile dolcezza bilanciata da delicata amarezza tostata. Accenni di caramello e vaniglia aggiungono complessità. La fermentazione Yorkshire Square contribuisce a un sottile carattere fruttato (frutta scura, prugna). Il finale è lungo e soddisfacente con note persistenti di cioccolato e caffè.',
      vi: 'Cảm giác trong miệng mịn màng và mượt như lụa đặc biệt từ yến mạch. Hương vị mạch nha rang phong phú với hương sô-cô-la đen, cà phê espresso và ngũ cốc rang. Vị ngọt tinh tế cân bằng bởi vị đắng rang nhẹ. Gợi ý caramel và vani thêm độ phức tạp. Lên men Yorkshire Square góp phần tạo đặc tính trái cây tinh tế (trái cây sẫm, mận). Kết thúc dài và thỏa mãn với hương sô-cô-la và cà phê kéo dài.',
    },
    aroma: {
      en: 'Roasted malt, dark chocolate, coffee, subtle dark fruit, and gentle sweetness',
      it: 'Malto tostato, cioccolato fondente, caffè, sottile frutta scura e delicata dolcezza',
      vi: 'Mạch nha rang, sô-cô-la đen, cà phê, trái cây sẫm tinh tế và vị ngọt nhẹ',
    },
    first_impression: {
      en: 'Silky smooth texture with rich chocolate and coffee flavors',
      it: 'Consistenza setosa e morbida con ricchi sapori di cioccolato e caffè',
      vi: 'Kết cấu mượt như lụa với hương vị sô-cô-la và cà phê phong phú',
    },
    finish: {
      en: 'Long, smooth finish with lingering roasted malt, chocolate, and subtle sweetness',
      it: 'Finale lungo e morbido con malto tostato persistente, cioccolato e sottile dolcezza',
      vi: 'Kết thúc dài, mượt với mạch nha rang kéo dài, sô-cô-la và vị ngọt tinh tế',
    },
    balance: {
      en: 'Beautifully balanced between roasted bitterness and malt sweetness, with oats providing luxurious smoothness',
      it: 'Magnificamente equilibrata tra amarezza tostata e dolcezza maltata, con l\'avena che fornisce una morbidezza lussuosa',
      vi: 'Cân bằng tuyệt đẹp giữa vị đắng rang và vị ngọt mạch nha, với yến mạch mang lại sự mượt mà sang trọng',
    },
    bitterness_level: 3,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale malt', 'Roasted barley', 'Crystal malt', 'Chocolate malt'],
    hops: ['English hops', 'Fuggles'],
    yeast: "Samuel Smith's house yeast",
    special_ingredients: ['Oatmeal (malted oats)', 'Yorkshire well water'],
  },

  serving: {
    glass: 'nonic',
    temperature: 'cellar',
    temperature_celsius: { min: 12, max: 14 },
    pouring_notes: {
      en: 'Serve at cellar temperature (12-14°C) to allow the complex flavors to fully express. Pour gently into a pint glass, leaving any sediment in the bottle (bottle-conditioned). Allow a creamy tan-colored head to form. Can be enjoyed slightly warmer than most beers.',
      it: 'Servire a temperatura di cantina (12-14°C) per permettere ai sapori complessi di esprimersi completamente. Versare delicatamente in un bicchiere pinta, lasciando eventuali sedimenti nella bottiglia (condizionata in bottiglia). Lasciare formare una schiuma cremosa color nocciola. Può essere gustata leggermente più calda della maggior parte delle birre.',
      vi: 'Phục vụ ở nhiệt độ hầm (12-14°C) để cho phép hương vị phức tạp thể hiện đầy đủ. Rót nhẹ nhàng vào ly pint, để lại cặn trong chai (lên men trong chai). Để hình thành lớp bọt kem màu nâu nhạt. Có thể thưởng thức ấm hơn một chút so với hầu hết các loại bia.',
    },
    ideal_head: '2 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['desserts', 'grilled-meats', 'comfort-food', 'cheese'],
    food_pairings: {
      en: 'Exceptional with chocolate desserts, tiramisu, sticky toffee pudding, and crème brûlée. Pairs beautifully with oysters (classic pairing), grilled meats, beef stew, and blue cheeses. The smooth, roasted character complements rich, savory dishes and sweet desserts alike.',
      it: 'Eccezionale con dessert al cioccolato, tiramisù, sticky toffee pudding e crème brûlée. Si abbina magnificamente con ostriche (abbinamento classico), carni grigliate, stufato di manzo e formaggi erborinati. Il carattere morbido e tostato complementa sia piatti ricchi e salati che dolci.',
      vi: 'Đặc biệt với món tráng miệng sô-cô-la, tiramisu, bánh pudding caramel dẻo và crème brûlée. Kết hợp tuyệt đẹp với hàu (kết hợp cổ điển), thịt nướng, thịt bò hầm và phô mai xanh. Đặc tính mượt mà, rang bổ sung cả món mặn phong phú và món tráng miệng ngọt.',
    },
    cheese_pairings: ['Stilton', 'Roquefort', 'Aged Cheddar', 'Gorgonzola'],
    cuisine_pairings: ['British comfort food', 'Desserts', 'Grilled meats'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['dinner', 'dessert', 'tasting', 'contemplative', 'evening'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,  // May use isinglass finings

  available_formats: ['bottle'],
  available_sizes: [550],
  related_beers: ['guinness-draught', 'youngs-double-chocolate-stout'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 80,

  source: {
    primary: 'https://www.samuelsmithsbrewery.co.uk',
    note: "Samuel Smith's brewing heritage and traditional Yorkshire brewing methods",
  },

  version: 1,
};
