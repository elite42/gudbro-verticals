import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const bassPaleAle: Beer = {
  id: uuidv4(),
  slug: 'bass-pale-ale',
  stable_key: 'bass-pale-ale-british-ale',
  name: {
    en: 'Bass Pale Ale',
    it: 'Bass Pale Ale',
    vi: 'Bass Pale Ale',
  },

  status: 'international_classic',
  style_category: 'ale',
  style: 'pale_ale',
  tags: ['british', 'historic', 'pale-ale', 'burton', 'iconic'],

  origin: {
    country: 'United Kingdom',
    country_code: 'GB',
    city: 'Burton upon Trent',
    brewery: {
      en: 'Bass Brewery',
      it: 'Birrificio Bass',
      vi: 'Nhà máy bia Bass',
    },
    brewery_founded: 1777,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1777',
    story: {
      en: 'Founded by William Bass in 1777, Bass Pale Ale became one of the world\'s first truly global beer brands. The famous red triangle trademark, registered in 1876, was the UK\'s first registered trademark. Bass pioneered pale ale brewing in Burton upon Trent, utilizing the town\'s unique mineral-rich water. The beer\'s quality was so renowned that it appeared in Édouard Manet\'s famous painting "A Bar at the Folies-Bergère" (1882).',
      it: 'Fondata da William Bass nel 1777, Bass Pale Ale divenne uno dei primi marchi di birra veramente globali al mondo. Il famoso marchio del triangolo rosso, registrato nel 1876, fu il primo marchio registrato del Regno Unito. Bass fu pioniera nella produzione di pale ale a Burton upon Trent, utilizzando l\'acqua ricca di minerali unica della città. La qualità della birra era così rinomata che apparve nel famoso dipinto di Édouard Manet "Un bar alle Folies-Bergère" (1882).',
      vi: 'Được thành lập bởi William Bass vào năm 1777, Bass Pale Ale trở thành một trong những thương hiệu bia toàn cầu thực sự đầu tiên trên thế giới. Nhãn hiệu tam giác đỏ nổi tiếng, được đăng ký vào năm 1876, là nhãn hiệu đăng ký đầu tiên của Vương quốc Anh. Bass tiên phong trong sản xuất bia pale ale ở Burton upon Trent, sử dụng nước giàu khoáng chất độc đáo của thị trấn. Chất lượng bia nổi tiếng đến mức xuất hiện trong bức tranh nổi tiếng của Édouard Manet "Quầy bar tại Folies-Bergère" (1882).',
    },
    awards: ['First UK Registered Trademark 1876', 'International Brewing Awards'],
    named_after: {
      en: 'Named after founder William Bass and the pale ale style it helped define',
      it: 'Prende il nome dal fondatore William Bass e dallo stile pale ale che ha contribuito a definire',
      vi: 'Được đặt tên theo người sáng lập William Bass và phong cách pale ale mà nó giúp xác định',
    },
  },

  description: {
    en: 'A historic English pale ale brewed with the legendary Burton water. This pioneering beer showcases a balanced malt character with distinctive hop bitterness, representing the classic Burton pale ale style that influenced brewers worldwide. The iconic red triangle makes it one of the most recognizable beer brands in history.',
    it: 'Una storica pale ale inglese prodotta con la leggendaria acqua di Burton. Questa birra pionieristica presenta un carattere di malto equilibrato con una distintiva amarezza di luppolo, rappresentando il classico stile pale ale di Burton che ha influenzato i birrai di tutto il mondo. L\'iconico triangolo rosso la rende uno dei marchi di birra più riconoscibili della storia.',
    vi: 'Một loại bia pale ale Anh lịch sử được ủ với nước Burton huyền thoại. Loại bia tiên phong này thể hiện đặc tính mạch nha cân bằng với vị đắng hoa bia đặc trưng, đại diện cho phong cách pale ale Burton cổ điển đã ảnh hưởng đến các nhà sản xuất bia trên toàn thế giới. Tam giác đỏ biểu tượng làm cho nó trở thành một trong những thương hiệu bia dễ nhận biết nhất trong lịch sử.',
  },

  tagline: {
    en: 'The Original Pale Ale',
    it: 'La Pale Ale Originale',
    vi: 'Pale Ale Nguyên Bản',
  },

  characteristics: {
    abv: 5.1,
    ibu: 34,
    srm: 10,
    color: 'amber',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['balanced', 'hoppy', 'malty', 'biscuity', 'crisp', 'traditional'],
    description: {
      en: 'Well-balanced pale ale with a firm malt backbone featuring biscuit and light caramel notes. The Burton water imparts a distinctive mineral quality that enhances the hop bitterness. Classic English hop character provides earthy, floral, and subtle spicy notes. Crisp and refreshing with a clean, dry finish.',
      it: 'Pale ale ben equilibrata con una solida base di malto che presenta note di biscotto e caramello leggero. L\'acqua di Burton conferisce una distintiva qualità minerale che esalta l\'amarezza del luppolo. Il carattere classico del luppolo inglese fornisce note terrose, floreali e sottilmente speziate. Fresca e rinfrescante con un finale pulito e secco.',
      vi: 'Pale ale cân bằng tốt với xương sống mạch nha vững chắc có hương bánh quy và caramel nhẹ. Nước Burton tạo ra chất lượng khoáng chất đặc trưng làm tăng vị đắng hoa bia. Đặc tính hoa bia Anh cổ điển cung cấp hương đất, hoa và gia vị tinh tế. Giòn và sảng khoái với kết thúc sạch, khô.',
    },
    aroma: {
      en: 'Malt-forward with biscuity sweetness, earthy English hops, and subtle fruity esters with mineral undertones',
      it: 'Dominato dal malto con dolcezza di biscotto, luppolo inglese terroso e sottili esteri fruttati con note minerali di fondo',
      vi: 'Hướng mạch nha với vị ngọt bánh quy, hoa bia Anh đất và ester trái cây tinh tế với nền khoáng chất',
    },
    finish: {
      en: 'Clean, dry finish with lingering hop bitterness and subtle malt sweetness',
      it: 'Finale pulito e secco con amarezza di luppolo persistente e sottile dolcezza di malto',
      vi: 'Kết thúc sạch, khô với vị đắng hoa bia kéo dài và vị ngọt mạch nha tinh tế',
    },
    bitterness_level: 3,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pale malt', 'Crystal malt'],
    hops: ['Fuggles', 'Goldings', 'Challenger'],
    yeast: 'Bass house yeast strain',
    water: 'Burton upon Trent water (high in calcium sulfate)',
  },

  serving: {
    glass: 'nonic',
    temperature: 'cool',
    temperature_celsius: { min: 8, max: 11 },
    pouring_notes: {
      en: 'Pour steadily into a tilted glass, then straighten to form a moderate creamy head',
      it: 'Versare costantemente in un bicchiere inclinato, poi raddrizzare per formare una moderata schiuma cremosa',
      vi: 'Rót đều vào ly nghiêng, sau đó thẳng để tạo lớp bọt kem vừa phải',
    },
  },

  pairing: {
    food_categories: ['british-classics', 'roasted-meats', 'traditional-fare'],
    food_pairings: {
      en: 'Perfect companion to traditional British dishes: roast beef, Yorkshire pudding, meat pies, ploughman\'s lunch, and aged cheddar. The balanced profile works well with grilled meats, fish and chips, and hearty stews. Also pairs nicely with curry dishes.',
      it: 'Compagno perfetto per i piatti tradizionali britannici: roast beef, Yorkshire pudding, torte di carne, ploughman\'s lunch e cheddar stagionato. Il profilo equilibrato funziona bene con carni grigliate, fish and chips e stufati sostanziosi. Si abbina bene anche con piatti al curry.',
      vi: 'Bạn đồng hành hoàn hảo cho các món ăn truyền thống Anh: thịt bò nướng, bánh pudding Yorkshire, bánh thịt, bữa trưa ploughman và phô mai cheddar. Hồ sơ cân bằng phù hợp với thịt nướng, cá chiên khoai tây và món hầm thịnh soạn. Cũng kết hợp tốt với món cà ri.',
    },
    cheese_pairings: ['Aged Cheddar', 'Stilton', 'Lancashire', 'Double Gloucester'],
    cuisine_pairings: ['British', 'English', 'Indian curry', 'Roasted meats'],
  },

  season_tags: ['all_year', 'autumn', 'winter'],
  occasion_tags: ['casual', 'pub_night', 'dinner', 'tasting', 'pairing_dinner'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 440, 500],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 75,

  source: {
    primary: 'https://en.wikipedia.org/wiki/Bass_Brewery',
    note: 'Historic brewing records and Bass Brewery heritage information',
  },

  version: 1,
};
