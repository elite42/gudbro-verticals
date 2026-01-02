import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const carlsberg: Beer = {
  id: uuidv4(),
  slug: 'carlsberg',
  stable_key: 'carlsberg-danish-pilsner',
  name: {
    en: 'Carlsberg',
    it: 'Carlsberg',
    vi: 'Carlsberg',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'pilsner',
  tags: ['danish', 'premium', 'scientific-brewing', 'pure-yeast', 'green-bottle'],

  origin: {
    country: 'Denmark',
    country_code: 'DK',
    city: 'Copenhagen',
    brewery: {
      en: 'Carlsberg Brewery',
      it: 'Birrificio Carlsberg',
      vi: 'Nhà máy bia Carlsberg',
    },
    brewery_founded: 1847,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1847',
    story: {
      en: 'J.C. Jacobsen founded Carlsberg in 1847, naming it after his son Carl and the Danish word "bjerg" (hill) where the brewery was built. In 1883, Carlsberg scientist Emil Christian Hansen isolated the first pure lager yeast strain (Saccharomyces carlsbergensis), revolutionizing brewing worldwide. Jacobsen gave this yeast freely to the brewing industry, an unprecedented act of scientific generosity.',
      it: 'J.C. Jacobsen fondò Carlsberg nel 1847, chiamandola dal nome di suo figlio Carl e dalla parola danese "bjerg" (collina) dove fu costruito il birrificio. Nel 1883, lo scienziato di Carlsberg Emil Christian Hansen isolò il primo ceppo di lievito lager puro (Saccharomyces carlsbergensis), rivoluzionando la produzione di birra in tutto il mondo. Jacobsen diede questo lievito gratuitamente all\'industria birraria, un atto senza precedenti di generosità scientifica.',
      vi: 'J.C. Jacobsen thành lập Carlsberg năm 1847, đặt tên theo con trai Carl và từ tiếng Đan Mạch "bjerg" (đồi) nơi nhà máy bia được xây dựng. Năm 1883, nhà khoa học Carlsberg Emil Christian Hansen đã phân lập chủng nấm men lager tinh khiết đầu tiên (Saccharomyces carlsbergensis), cách mạng hóa ngành sản xuất bia trên toàn thế giới.',
    },
    awards: ['World Beer Cup', 'European Beer Star'],
    named_after: {
      en: 'Named after founder\'s son Carl + Danish "bjerg" (hill)',
      it: 'Prende il nome dal figlio del fondatore Carl + danese "bjerg" (collina)',
      vi: 'Được đặt theo tên con trai người sáng lập Carl + tiếng Đan Mạch "bjerg" (đồi)',
    },
    significance: {
      en: 'Carlsberg\'s isolation of pure lager yeast in 1883 transformed brewing from an art into a science',
      it: 'L\'isolamento del lievito lager puro da parte di Carlsberg nel 1883 trasformò la produzione di birra da arte a scienza',
      vi: 'Việc Carlsberg phân lập nấm men lager tinh khiết năm 1883 đã biến việc sản xuất bia từ nghệ thuật thành khoa học',
    },
  },

  description: {
    en: 'A classic Danish pilsner known for its balanced, refreshing taste and rich brewing heritage. The brewery\'s contribution to brewing science - isolating pure lager yeast - changed beer production forever.',
    it: 'Una classica pilsner danese nota per il suo gusto equilibrato e rinfrescante e la ricca tradizione birraria. Il contributo del birrificio alla scienza della birra - l\'isolamento del lievito lager puro - ha cambiato per sempre la produzione di birra.',
    vi: 'Một loại pilsner Đan Mạch cổ điển nổi tiếng với hương vị cân bằng, sảng khoái và di sản sản xuất bia phong phú.',
  },

  tagline: {
    en: 'Probably the best beer in the world',
    it: 'Probabilmente la miglior birra del mondo',
    vi: 'Có lẽ là bia ngon nhất thế giới',
  },

  characteristics: {
    abv: 5.0,
    ibu: 22,
    srm: 4,
    color: 'gold',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'balanced', 'refreshing', 'hoppy', 'clean'],
    description: {
      en: 'Well-balanced with a pleasant hop bitterness, subtle malt sweetness, and a clean, refreshing finish. A textbook example of a European pilsner.',
      it: 'Ben equilibrata con una piacevole amarezza del luppolo, sottile dolcezza maltata e un finale pulito e rinfrescante.',
      vi: 'Cân bằng tốt với vị đắng hoa bia dễ chịu, ngọt mạch nha tinh tế và kết thúc sạch, sảng khoái.',
    },
    aroma: {
      en: 'Floral hop notes with clean malt backbone',
      it: 'Note floreali di luppolo con base maltata pulita',
      vi: 'Hương hoa bia với nền mạch nha sạch',
    },
    finish: {
      en: 'Clean, crisp finish with mild hop bitterness',
      it: 'Finale pulito e fresco con leggera amarezza del luppolo',
      vi: 'Kết thúc sạch, giòn với đắng hoa bia nhẹ',
    },
    bitterness_level: 2,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pilsner malt'],
    hops: ['European hops'],
    yeast: 'Saccharomyces carlsbergensis (original pure lager strain)',
  },

  serving: {
    glass: 'pilsner',
    temperature: 'cold',
    temperature_celsius: { min: 4, max: 6 },
  },

  pairing: {
    food_categories: ['seafood', 'danish-food', 'light-dishes'],
    food_pairings: {
      en: 'Excellent with Danish smørrebrød, seafood, light salads, and grilled chicken.',
      it: 'Eccellente con smørrebrød danese, frutti di mare, insalate leggere e pollo alla griglia.',
      vi: 'Tuyệt vời với smørrebrød Đan Mạch, hải sản, salad nhẹ và gà nướng.',
    },
    cuisine_pairings: ['Danish', 'Scandinavian', 'Seafood'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['casual', 'party', 'sports'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 500],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 85,

  source: {
    primary: 'https://www.carlsberg.com',
    note: 'Official Carlsberg website and brewing science heritage',
  },

  version: 1,
};
