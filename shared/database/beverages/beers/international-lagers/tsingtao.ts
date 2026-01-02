import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const tsingtao: Beer = {
  id: uuidv4(),
  slug: 'tsingtao',
  stable_key: 'tsingtao-chinese-lager',
  name: {
    en: 'Tsingtao',
    it: 'Tsingtao',
    vi: 'Tsingtao',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'pilsner',
  tags: ['chinese', 'german-heritage', 'rice', 'qingdao', 'asian'],

  origin: {
    country: 'China',
    country_code: 'CN',
    region: 'Shandong Province',
    city: 'Qingdao',
    brewery: {
      en: 'Tsingtao Brewery',
      it: 'Birrificio Tsingtao',
      vi: 'Nhà máy bia Tsingtao',
    },
    brewery_founded: 1903,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1903',
    story: {
      en: 'Tsingtao was founded in 1903 by German and British settlers in the German colonial territory of Qingdao (then spelled Tsingtao). The Germans brought their brewing expertise and established the brewery using the famous Laoshan spring water. After WWI, the brewery passed through Japanese and then Chinese ownership. Today it\'s China\'s second-largest brewery and the most exported Chinese beer globally.',
      it: 'Tsingtao fu fondata nel 1903 da coloni tedeschi e britannici nel territorio coloniale tedesco di Qingdao (allora scritto Tsingtao). I tedeschi portarono la loro esperienza birraria e fondarono il birrificio usando la famosa acqua sorgiva di Laoshan. Dopo la Prima Guerra Mondiale, il birrificio passò prima sotto proprietà giapponese e poi cinese. Oggi è il secondo birrificio più grande della Cina e la birra cinese più esportata al mondo.',
      vi: 'Tsingtao được thành lập năm 1903 bởi những người định cư Đức và Anh tại lãnh thổ thuộc địa Đức Qingdao. Người Đức mang theo chuyên môn sản xuất bia và thành lập nhà máy bia sử dụng nước suối Laoshan nổi tiếng.',
    },
    named_after: {
      en: 'Named after Qingdao city (Wade-Giles romanization: Tsingtao)',
      it: 'Prende il nome dalla città di Qingdao (romanizzazione Wade-Giles: Tsingtao)',
      vi: 'Được đặt theo thành phố Qingdao (phiên âm Wade-Giles: Tsingtao)',
    },
  },

  description: {
    en: 'China\'s most famous export beer, brewed with German techniques and Laoshan spring water. A crisp, clean lager with subtle rice character that pairs beautifully with Chinese cuisine.',
    it: 'La birra d\'esportazione più famosa della Cina, prodotta con tecniche tedesche e acqua sorgiva di Laoshan. Una lager fresca e pulita con sottile carattere di riso che si abbina magnificamente alla cucina cinese.',
    vi: 'Bia xuất khẩu nổi tiếng nhất Trung Quốc, được sản xuất với kỹ thuật Đức và nước suối Laoshan.',
  },

  characteristics: {
    abv: 4.7,
    ibu: 18,
    srm: 3,
    color: 'straw',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'clean', 'light', 'refreshing', 'slightly_sweet'],
    description: {
      en: 'Light and crisp with subtle rice sweetness, mild hop character, and a clean, refreshing finish. The Laoshan water gives it a distinctive mineral quality.',
      it: 'Leggera e fresca con sottile dolcezza del riso, carattere di luppolo delicato e un finale pulito e rinfrescante.',
      vi: 'Nhẹ và giòn với ngọt gạo tinh tế, đặc tính hoa bia nhẹ và kết thúc sạch, sảng khoái.',
    },
    aroma: {
      en: 'Light grain with subtle floral notes',
      it: 'Grano leggero con sottili note floreali',
      vi: 'Ngũ cốc nhẹ với hương hoa tinh tế',
    },
    finish: {
      en: 'Clean and crisp with minimal aftertaste',
      it: 'Pulito e fresco con minimo retrogusto',
      vi: 'Sạch và giòn với hậu vị tối thiểu',
    },
    bitterness_level: 1,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Barley malt', 'Rice'],
    hops: ['German and Chinese hops'],
    yeast: 'German-origin lager yeast',
    water: 'Laoshan spring water',
  },

  serving: {
    glass: 'pilsner',
    temperature: 'very_cold',
    temperature_celsius: { min: 2, max: 5 },
  },

  pairing: {
    food_categories: ['chinese-food', 'dim-sum', 'seafood', 'spicy-food'],
    food_pairings: {
      en: 'The classic pairing with Chinese cuisine: dim sum, Peking duck, kung pao chicken, seafood dishes. The clean finish refreshes the palate between bites of rich or spicy food.',
      it: 'L\'abbinamento classico con la cucina cinese: dim sum, anatra alla pechinese, pollo kung pao, piatti di pesce.',
      vi: 'Kết hợp cổ điển với ẩm thực Trung Quốc: dim sum, vịt Bắc Kinh, gà kung pao, các món hải sản.',
    },
    cuisine_pairings: ['Chinese', 'Asian', 'Seafood', 'Spicy food'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['dinner', 'casual', 'party'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can'],
  available_sizes: [330, 500, 640],
  availability: 'year_round',

  price_tier: 'value',
  popularity: 80,

  source: {
    primary: 'https://www.tsingtaobeer.com',
    note: 'Official Tsingtao website',
  },

  version: 1,
};
