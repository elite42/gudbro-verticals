import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const boddingtonsPubAle: Beer = {
  id: uuidv4(),
  slug: 'boddingtons-pub-ale',
  stable_key: 'boddingtons-pub-ale-british-ale',
  name: {
    en: 'Boddingtons Pub Ale',
    it: 'Boddingtons Pub Ale',
    vi: 'Boddingtons Pub Ale',
  },

  status: 'international_classic',
  style_category: 'ale',
  style: 'cream_ale',
  tags: ['british', 'cream-ale', 'nitro', 'smooth', 'manchester'],

  origin: {
    country: 'United Kingdom',
    country_code: 'GB',
    city: 'Manchester',
    brewery: {
      en: 'Boddingtons Brewery',
      it: 'Birrificio Boddingtons',
      vi: 'Nhà máy bia Boddingtons',
    },
    brewery_founded: 1778,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1778',
    story: {
      en: 'Founded in 1778 at the Strangeways Brewery in Manchester, Boddingtons became famous for its distinctively smooth and creamy texture. The beer gained national prominence in the 1990s with its memorable "Cream of Manchester" advertising campaign. Originally a cask ale, Boddingtons pioneered the use of nitrogen widget technology in cans, creating the signature creamy head that made it a pub favorite across Britain.',
      it: 'Fondata nel 1778 presso il birrificio Strangeways a Manchester, Boddingtons divenne famosa per la sua texture distintamente liscia e cremosa. La birra ottenne notorietà nazionale negli anni \'90 con la sua memorabile campagna pubblicitaria "Cream of Manchester". Originariamente una cask ale, Boddingtons fu pioniera nell\'uso della tecnologia widget a nitrogeno nelle lattine, creando la caratteristica schiuma cremosa che la rese una delle preferite nei pub di tutta la Gran Bretagna.',
      vi: 'Được thành lập vào năm 1778 tại nhà máy bia Strangeways ở Manchester, Boddingtons trở nên nổi tiếng với kết cấu mượt mà và kem đặc trưng. Bia này đạt được sự nổi tiếng quốc gia vào những năm 1990 với chiến dịch quảng cáo đáng nhớ "Kem của Manchester". Ban đầu là một loại bia thùng, Boddingtons tiên phong trong việc sử dụng công nghệ widget nitơ trong lon, tạo ra lớp bọt kem đặc trưng khiến nó trở thành loại bia yêu thích trong các quán rượu khắp nước Anh.',
    },
    awards: ['CAMRA Awards', 'British Brewing Awards'],
    named_after: {
      en: 'Named after the Boddington family, founders of the brewery',
      it: 'Prende il nome dalla famiglia Boddington, fondatori del birrificio',
      vi: 'Được đặt tên theo gia đình Boddington, những người sáng lập nhà máy bia',
    },
  },

  description: {
    en: 'A smooth, creamy golden ale famous for its velvety texture and tight, long-lasting head. Known as "The Cream of Manchester," this beer delivers a light, refreshing taste with a distinctive smooth mouthfeel created by nitrogen dispense. The perfect balance of malt sweetness and hop bitterness makes it incredibly drinkable.',
    it: 'Una golden ale liscia e cremosa famosa per la sua texture vellutata e schiuma compatta e duratura. Conosciuta come "The Cream of Manchester", questa birra offre un gusto leggero e rinfrescante con una distintiva sensazione liscia in bocca creata dalla dispensazione di nitrogeno. Il perfetto equilibrio tra dolcezza di malto e amarezza di luppolo la rende incredibilmente bevibile.',
    vi: 'Một loại bia vàng mượt mà, kem nổi tiếng với kết cấu mượt như nhung và lớp bọt chặt, lâu dài. Được biết đến như "Kem của Manchester", loại bia này mang đến hương vị nhẹ nhàng, sảng khoái với cảm giác mượt mà đặc trưng trong miệng được tạo ra bởi phân phối nitơ. Sự cân bằng hoàn hảo giữa vị ngọt mạch nha và vị đắng hoa bia làm cho nó cực kỳ dễ uống.',
  },

  tagline: {
    en: 'The Cream of Manchester',
    it: 'La Crema di Manchester',
    vi: 'Kem của Manchester',
  },

  characteristics: {
    abv: 4.7,
    ibu: 20,
    srm: 6,
    color: 'gold',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium_light',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['smooth', 'creamy', 'balanced', 'malty', 'refreshing', 'clean'],
    description: {
      en: 'Incredibly smooth and creamy with a light malt sweetness featuring biscuit and bread notes. Gentle hop bitterness provides balance without overpowering. The nitrogen dispense creates a silky, velvety mouthfeel. Light fruit esters add subtle complexity. Clean, refreshing finish with minimal aftertaste.',
      it: 'Incredibilmente liscia e cremosa con una leggera dolcezza di malto che presenta note di biscotto e pane. Una delicata amarezza di luppolo fornisce equilibrio senza sopraffare. La dispensazione di nitrogeno crea una sensazione setosa e vellutata in bocca. Leggeri esteri fruttati aggiungono una sottile complessità. Finale pulito e rinfrescante con un retrogusto minimo.',
      vi: 'Cực kỳ mượt mà và kem với vị ngọt mạch nha nhẹ có hương bánh quy và bánh mì. Vị đắng hoa bia nhẹ nhàng cung cấp sự cân bằng mà không áp đảo. Phân phối nitơ tạo ra cảm giác mịn màng, mượt như nhung trong miệng. Ester trái cây nhẹ thêm sự phức tạp tinh tế. Kết thúc sạch, sảng khoái với hậu vị tối thiểu.',
    },
    aroma: {
      en: 'Light malt with bready and biscuit notes, subtle hop character, and delicate fruity esters',
      it: 'Malto leggero con note di pane e biscotto, sottile carattere di luppolo ed esteri fruttati delicati',
      vi: 'Mạch nha nhẹ với hương bánh mì và bánh quy, đặc tính hoa bia tinh tế và ester trái cây nhẹ nhàng',
    },
    finish: {
      en: 'Smooth, clean finish with a gentle dry note and subtle lingering sweetness',
      it: 'Finale morbido e pulito con una delicata nota secca e sottile dolcezza persistente',
      vi: 'Kết thúc mượt mà, sạch với nốt khô nhẹ nhàng và vị ngọt kéo dài tinh tế',
    },
    bitterness_level: 2,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pale malt', 'Wheat malt'],
    hops: ['English hops', 'Fuggles'],
    yeast: 'English ale yeast',
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 6, max: 8 },
    pouring_notes: {
      en: 'For canned version: open can, turn upside down into glass for cascading effect. For draft: pour smoothly to create the signature creamy head',
      it: 'Per la versione in lattina: aprire la lattina, capovolgerla nel bicchiere per un effetto a cascata. Per la spillatura: versare dolcemente per creare la caratteristica schiuma cremosa',
      vi: 'Đối với phiên bản lon: mở lon, lật ngược vào ly để tạo hiệu ứng thác. Đối với bia hơi: rót nhẹ nhàng để tạo lớp bọt kem đặc trưng',
    },
  },

  pairing: {
    food_categories: ['pub-food', 'light-dishes', 'british-classics'],
    food_pairings: {
      en: 'Excellent with traditional British pub fare: fish and chips, chicken dishes, mild curries, sandwiches, and salads. The smooth, creamy texture pairs well with fried foods. Also complements mild cheeses and light seafood dishes.',
      it: 'Eccellente con i tradizionali piatti da pub britannici: fish and chips, piatti di pollo, curry delicati, panini e insalate. La texture liscia e cremosa si abbina bene con cibi fritti. Completa anche formaggi delicati e piatti di pesce leggeri.',
      vi: 'Tuyệt vời với món ăn pub Anh truyền thống: cá chiên khoai tây, món gà, cà ri nhẹ, bánh sandwich và salad. Kết cấu mượt mà, kem kết hợp tốt với đồ chiên. Cũng bổ sung cho phô mai nhẹ và món hải sản nhẹ.',
    },
    cheese_pairings: ['Mild Cheddar', 'Cheshire', 'Wensleydale', 'Lancashire'],
    cuisine_pairings: ['British', 'Pub fare', 'Fish and chips', 'Light meals'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['casual', 'pub_night', 'sports', 'relaxing', 'bbq'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['can', 'draft', 'bottle'],
  available_sizes: [440, 500],
  availability: 'year_round',

  price_tier: 'value',
  popularity: 78,

  source: {
    primary: 'https://www.boddingtons.com',
    note: 'Official Boddingtons website and brewing heritage information',
  },

  version: 1,
};
