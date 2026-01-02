import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const heineken: Beer = {
  id: uuidv4(),
  slug: 'heineken',
  stable_key: 'heineken-international-lager',
  name: {
    en: 'Heineken',
    it: 'Heineken',
    vi: 'Heineken',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'pilsner',
  tags: ['international', 'premium', 'dutch', 'iconic', 'green-bottle'],

  origin: {
    country: 'Netherlands',
    country_code: 'NL',
    city: 'Amsterdam',
    brewery: {
      en: 'Heineken Brewery',
      it: 'Birrificio Heineken',
      vi: 'Nhà máy bia Heineken',
    },
    brewery_founded: 1864,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1873',
    story: {
      en: 'Gerard Adriaan Heineken purchased the De Hooiberg brewery in Amsterdam in 1864 and transformed it into one of the world\'s most recognized beer brands. The distinctive A-yeast was developed in the 1880s by Dr. Elion, a student of Louis Pasteur, giving Heineken its signature taste.',
      it: 'Gerard Adriaan Heineken acquistò il birrificio De Hooiberg ad Amsterdam nel 1864 e lo trasformò in uno dei marchi di birra più riconosciuti al mondo. Il distintivo lievito A fu sviluppato negli anni 1880 dal Dr. Elion, uno studente di Louis Pasteur, conferendo a Heineken il suo gusto caratteristico.',
      vi: 'Gerard Adriaan Heineken mua nhà máy bia De Hooiberg ở Amsterdam năm 1864 và biến nó thành một trong những thương hiệu bia được công nhận nhất thế giới. Men A đặc trưng được phát triển vào những năm 1880 bởi Dr. Elion, học trò của Louis Pasteur, tạo nên hương vị đặc trưng của Heineken.',
    },
    awards: ['World Beer Cup Gold', 'European Beer Star'],
    named_after: {
      en: 'Named after the Heineken family, founders of the brewery',
      it: 'Prende il nome dalla famiglia Heineken, fondatori del birrificio',
      vi: 'Được đặt theo tên gia đình Heineken, những người sáng lập nhà máy bia',
    },
  },

  description: {
    en: 'A premium pale lager known worldwide for its balanced taste, slight bitterness, and refreshing finish. The iconic green bottle and red star have made it one of the most recognizable beers globally.',
    it: 'Una lager chiara premium conosciuta in tutto il mondo per il suo gusto equilibrato, leggera amarezza e finale rinfrescante. L\'iconica bottiglia verde e la stella rossa l\'hanno resa una delle birre più riconoscibili a livello globale.',
    vi: 'Một loại bia lager cao cấp nổi tiếng thế giới với hương vị cân bằng, vị đắng nhẹ và kết thúc sảng khoái. Chai xanh biểu tượng và ngôi sao đỏ đã làm cho nó trở thành một trong những loại bia dễ nhận biết nhất toàn cầu.',
  },

  tagline: {
    en: 'Open Your World',
    it: 'Apri il Tuo Mondo',
    vi: 'Mở Ra Thế Giới Của Bạn',
  },

  characteristics: {
    abv: 5.0,
    ibu: 19,
    srm: 4,
    color: 'pale',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'balanced', 'hoppy', 'refreshing', 'clean'],
    description: {
      en: 'A well-balanced lager with mild bitterness, subtle fruity notes from the A-yeast, and a clean, slightly sweet malt backbone.',
      it: 'Una lager ben equilibrata con amarezza delicata, sottili note fruttate dal lievito A e un corpo maltato pulito e leggermente dolce.',
      vi: 'Một loại bia lager cân bằng với vị đắng nhẹ, hương trái cây tinh tế từ men A và nền mạch nha sạch, hơi ngọt.',
    },
    aroma: {
      en: 'Light grassy hops with subtle fruit esters and clean malt',
      it: 'Luppolo erbaceo leggero con sottili esteri fruttati e malto pulito',
      vi: 'Hương hoa bia cỏ nhẹ với ester trái cây tinh tế và mạch nha sạch',
    },
    finish: {
      en: 'Crisp, clean finish with lingering mild bitterness',
      it: 'Finale fresco e pulito con amarezza delicata persistente',
      vi: 'Kết thúc giòn, sạch với vị đắng nhẹ kéo dài',
    },
    bitterness_level: 2,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pilsner malt', 'Malted barley'],
    hops: ['European hops', 'Hallertau'],
    yeast: 'Heineken A-yeast',
  },

  serving: {
    glass: 'pilsner',
    temperature: 'cold',
    temperature_celsius: { min: 3, max: 5 },
    pouring_notes: {
      en: 'Pour at a 45° angle, then straighten to create a 2-finger head',
      it: 'Versare a 45°, poi raddrizzare per creare una schiuma di 2 dita',
      vi: 'Rót nghiêng 45°, sau đó thẳng để tạo lớp bọt 2 ngón tay',
    },
  },

  pairing: {
    food_categories: ['seafood', 'light-dishes', 'appetizers'],
    food_pairings: {
      en: 'Excellent with seafood, light salads, mild cheeses, and fried appetizers. The crisp finish cuts through oily foods.',
      it: 'Eccellente con frutti di mare, insalate leggere, formaggi delicati e antipasti fritti. Il finale fresco taglia i cibi grassi.',
      vi: 'Tuyệt vời với hải sản, salad nhẹ, phô mai nhẹ và khai vị chiên. Kết thúc giòn cắt qua thực phẩm béo.',
    },
    cheese_pairings: ['Gouda', 'Edam', 'mild Cheddar'],
    cuisine_pairings: ['Dutch', 'European', 'Asian fusion'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['casual', 'party', 'sports', 'bbq'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [250, 330, 500],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 95,

  source: {
    primary: 'https://www.heineken.com',
    note: 'Official Heineken website and brewing heritage information',
  },

  version: 1,
};
