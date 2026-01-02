import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const fullersLondonPride: Beer = {
  id: uuidv4(),
  slug: 'fullers-london-pride',
  stable_key: 'fullers-london-pride-british-ale',
  name: {
    en: "Fuller's London Pride",
    it: "Fuller's London Pride",
    vi: "Fuller's London Pride",
  },

  status: 'international_classic',
  style_category: 'ale',
  style: 'pale_ale',
  tags: ['british', 'esb', 'premium', 'classic', 'award-winning'],

  origin: {
    country: 'United Kingdom',
    country_code: 'GB',
    city: 'London',
    brewery: {
      en: 'Fuller, Smith & Turner',
      it: 'Birrificio Fuller, Smith & Turner',
      vi: 'Nhà máy bia Fuller, Smith & Turner',
    },
    brewery_founded: 1845,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1959',
    story: {
      en: "London Pride was first brewed in 1959 at Fuller's Griffin Brewery in Chiswick, West London. It quickly became one of Britain's most awarded ales, representing the finest example of Extra Special Bitter (ESB) style. The beer has won more awards than any other British ale and became the brewery's flagship beer, embodying the spirit of London's brewing heritage.",
      it: "London Pride fu prodotta per la prima volta nel 1959 presso il birrificio Griffin di Fuller a Chiswick, nell'ovest di Londra. Divenne rapidamente una delle birre più premiate della Gran Bretagna, rappresentando il miglior esempio dello stile Extra Special Bitter (ESB). La birra ha vinto più premi di qualsiasi altra ale britannica ed è diventata la birra di punta del birrificio, incarnando lo spirito della tradizione birraria londinese.",
      vi: "London Pride được ủ lần đầu tiên vào năm 1959 tại nhà máy bia Griffin của Fuller ở Chiswick, Tây London. Nó nhanh chóng trở thành một trong những loại bia được trao giải thưởng nhiều nhất của Anh, đại diện cho ví dụ tốt nhất về phong cách Extra Special Bitter (ESB). Bia đã giành được nhiều giải thưởng hơn bất kỳ loại bia Anh nào khác và trở thành bia hàng đầu của nhà máy bia, thể hiện tinh thần di sản bia của London.",
    },
    awards: ['CAMRA Champion Beer of Britain', 'Supreme Champion Beer', 'World Beer Cup Gold'],
    named_after: {
      en: 'Named after the pride and spirit of London',
      it: 'Prende il nome dall\'orgoglio e dallo spirito di Londra',
      vi: 'Được đặt tên theo niềm tự hào và tinh thần của London',
    },
  },

  description: {
    en: 'A classic English ESB with a well-rounded, smooth character combining rich malt flavors with distinctive hop bitterness. This iconic amber ale showcases the perfect balance between sweet malt and refreshing hops, delivering a supremely drinkable beer with complex flavors.',
    it: 'Una classica ESB inglese dal carattere ben rotondo e morbido che combina ricchi sapori di malto con una distintiva amarezza di luppolo. Questa iconica ale ambrata presenta il perfetto equilibrio tra malto dolce e luppolo rinfrescante, offrendo una birra estremamente bevibile con sapori complessi.',
    vi: 'Một loại ESB Anh cổ điển với đặc tính tròn trịa, mượt mà kết hợp hương vị mạch nha phong phú với vị đắng hoa bia đặc trưng. Loại bia hổ phách biểu tượng này thể hiện sự cân bằng hoàn hảo giữa mạch nha ngọt và hoa bia sảng khoái, mang đến một loại bia cực kỳ dễ uống với hương vị phức tạp.',
  },

  tagline: {
    en: 'The Pride of London',
    it: "L'Orgoglio di Londra",
    vi: 'Niềm Tự Hào của London',
  },

  characteristics: {
    abv: 4.7,
    ibu: 30,
    srm: 12,
    color: 'amber',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['balanced', 'malty', 'hoppy', 'biscuity', 'caramel', 'fruity'],
    description: {
      en: 'A beautifully balanced beer with rich malt character featuring biscuit, caramel, and toffee notes. The distinctive hop profile delivers earthy, herbal, and subtle citrus flavors. The finish is clean with a pleasant, lingering bitterness.',
      it: 'Una birra magnificamente equilibrata con un ricco carattere di malto che presenta note di biscotto, caramello e toffee. Il distintivo profilo di luppolo offre sapori terrosi, erbacei e agrumati sottili. Il finale è pulito con una piacevole amarezza persistente.',
      vi: 'Một loại bia cân bằng tuyệt đẹp với đặc tính mạch nha phong phú có hương bánh quy, caramel và kẹo toffee. Hồ sơ hoa bia đặc trưng mang lại hương vị đất, thảo mộc và cam quýt tinh tế. Kết thúc sạch với vị đắng dễ chịu, kéo dài.',
    },
    aroma: {
      en: 'Rich malt with honey and marmalade notes, balanced with earthy Target hops and subtle fruity esters',
      it: 'Malto ricco con note di miele e marmellata, bilanciato con luppolo Target terroso ed esteri fruttati sottili',
      vi: 'Mạch nha phong phú với hương mật ong và mứt cam, cân bằng với hoa bia Target đất và ester trái cây tinh tế',
    },
    finish: {
      en: 'Smooth, moderately bitter finish with lingering hop character and malt sweetness',
      it: 'Finale morbido e moderatamente amaro con carattere di luppolo persistente e dolcezza di malto',
      vi: 'Kết thúc mượt mà, vị đắng vừa phải với đặc tính hoa bia kéo dài và vị ngọt mạch nha',
    },
    bitterness_level: 3,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pale ale malt', 'Crystal malt'],
    hops: ['Target', 'Challenger', 'Northdown'],
    yeast: "Fuller's house yeast strain",
  },

  serving: {
    glass: 'nonic',
    temperature: 'cool',
    temperature_celsius: { min: 8, max: 11 },
    pouring_notes: {
      en: 'Pour gently into a tilted glass, then straighten to create a creamy 1-inch head',
      it: 'Versare delicatamente in un bicchiere inclinato, poi raddrizzare per creare una schiuma cremosa di 2-3 cm',
      vi: 'Rót nhẹ nhàng vào ly nghiêng, sau đó thẳng để tạo lớp bọt kem 2-3 cm',
    },
  },

  pairing: {
    food_categories: ['pub-food', 'roasted-meats', 'british-classics'],
    food_pairings: {
      en: 'Perfect with classic British pub fare: fish and chips, bangers and mash, roast beef, shepherd\'s pie, and Stilton cheese. The malty sweetness complements roasted and grilled meats beautifully.',
      it: 'Perfetta con i classici piatti da pub britannici: fish and chips, salsicce e purè, roast beef, shepherd\'s pie e formaggio Stilton. La dolcezza maltata si abbina magnificamente a carni arrosto e grigliate.',
      vi: 'Hoàn hảo với món ăn pub Anh cổ điển: cá chiên khoai tây, xúc xích nghiền, thịt bò nướng, bánh shepherd\'s pie và phô mai Stilton. Vị ngọt mạch nha bổ sung tuyệt vời cho thịt nướng.',
    },
    cheese_pairings: ['Stilton', 'Cheddar', 'Red Leicester', 'Wensleydale'],
    cuisine_pairings: ['British', 'English', 'Pub fare', 'Roasted meats'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['casual', 'pub_night', 'dinner', 'relaxing'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft', 'cask'],
  available_sizes: [330, 500],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 88,

  source: {
    primary: 'https://www.fullers.co.uk/beers/london-pride',
    note: 'Official Fuller\'s Brewery website and beer heritage information',
  },

  version: 1,
};
