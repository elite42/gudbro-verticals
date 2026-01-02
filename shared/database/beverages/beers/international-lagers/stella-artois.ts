import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const stellaArtois: Beer = {
  id: uuidv4(),
  slug: 'stella-artois',
  stable_key: 'stella-artois-belgian-pilsner',
  name: {
    en: 'Stella Artois',
    it: 'Stella Artois',
    vi: 'Stella Artois',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'pilsner',
  tags: ['belgian', 'premium', 'christmas-origin', 'chalice', 'sophisticated'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    city: 'Leuven',
    brewery: {
      en: 'Brouwerij Artois (AB InBev)',
      it: 'Brouwerij Artois (AB InBev)',
      vi: 'Brouwerij Artois (AB InBev)',
    },
    brewery_founded: 1366,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1926',
    story: {
      en: 'The Den Hoorn brewery was established in Leuven in 1366. Stella Artois was first brewed as a Christmas beer in 1926 - "Stella" meaning "star" in Latin, referencing the Christmas star. The Artois name was added in honor of master brewer Sebastian Artois who joined in 1708. It became so popular that year-round production began.',
      it: 'Il birrificio Den Hoorn fu fondato a Leuven nel 1366. Stella Artois fu prodotta per la prima volta come birra di Natale nel 1926 - "Stella" significa "stella" in latino, riferendosi alla stella di Natale. Il nome Artois fu aggiunto in onore del mastro birraio Sebastian Artois che si unì nel 1708. Divenne così popolare che iniziò la produzione tutto l\'anno.',
      vi: 'Nhà máy bia Den Hoorn được thành lập tại Leuven năm 1366. Stella Artois được sản xuất lần đầu như bia Giáng sinh năm 1926 - "Stella" có nghĩa là "ngôi sao" trong tiếng Latin, ám chỉ ngôi sao Giáng sinh. Tên Artois được thêm vào để vinh danh thợ nấu bia bậc thầy Sebastian Artois tham gia năm 1708. Nó trở nên phổ biến đến mức bắt đầu sản xuất quanh năm.',
    },
    named_after: {
      en: '"Stella" (star in Latin) references Christmas, "Artois" honors master brewer Sebastian Artois',
      it: '"Stella" (stella in latino) si riferisce al Natale, "Artois" onora il mastro birraio Sebastian Artois',
      vi: '"Stella" (ngôi sao trong tiếng Latin) ám chỉ Giáng sinh, "Artois" vinh danh thợ nấu bia bậc thầy Sebastian Artois',
    },
  },

  description: {
    en: 'A premium Belgian pilsner with over 600 years of brewing heritage. Known for its balanced malt sweetness, distinct hop bitterness, and crisp, dry finish. Traditionally served in a signature chalice glass.',
    it: 'Una pilsner belga premium con oltre 600 anni di tradizione birraria. Nota per il suo equilibrio tra dolcezza maltata, distinta amarezza del luppolo e finale fresco e secco. Tradizionalmente servita nel caratteristico calice.',
    vi: 'Một loại bia pilsner Bỉ cao cấp với hơn 600 năm di sản sản xuất bia. Nổi tiếng với sự cân bằng giữa vị ngọt mạch nha, vị đắng hoa bia đặc trưng và kết thúc giòn, khô. Truyền thống được phục vụ trong ly chalice đặc trưng.',
  },

  tagline: {
    en: 'Be Legacy',
    it: 'Sii Eredità',
    vi: 'Là Di Sản',
  },

  characteristics: {
    abv: 5.2,
    ibu: 30,
    srm: 4,
    color: 'gold',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'medium_light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'hoppy', 'balanced', 'dry', 'refreshing'],
    description: {
      en: 'Well-balanced with soft malt sweetness, pronounced Saaz hop bitterness, and a crisp, dry finish. More bitter and complex than typical mass-market lagers.',
      it: 'Ben equilibrata con dolcezza maltata morbida, pronunciata amarezza del luppolo Saaz e un finale fresco e secco. Più amara e complessa delle tipiche lager commerciali.',
      vi: 'Cân bằng tốt với vị ngọt mạch nha mềm, vị đắng hoa bia Saaz rõ rệt và kết thúc giòn, khô. Đắng hơn và phức tạp hơn các loại bia lager thương mại thông thường.',
    },
    aroma: {
      en: 'Floral and spicy Saaz hops with clean malt backbone',
      it: 'Luppolo Saaz floreale e speziato con base maltata pulita',
      vi: 'Hoa bia Saaz hoa và cay với nền mạch nha sạch',
    },
    finish: {
      en: 'Dry, crisp finish with lingering noble hop bitterness',
      it: 'Finale secco e fresco con amarezza persistente del luppolo nobile',
      vi: 'Kết thúc khô, giòn với vị đắng hoa bia noble kéo dài',
    },
    bitterness_level: 3,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pilsner malt', 'Maize'],
    hops: ['Saaz hops'],
    yeast: 'Stella Artois proprietary yeast',
  },

  serving: {
    glass: 'goblet',
    temperature: 'cold',
    temperature_celsius: { min: 3, max: 5 },
    pouring_notes: {
      en: 'The 9-step pouring ritual: Purification, The Sacrifice, The Pour, The Head, The Skimming, The Second Pour, The Cleansing, The Bestowal, The Admiration',
      it: 'Il rituale di versamento in 9 fasi: La Purificazione, Il Sacrificio, Il Versamento, La Schiuma, La Schiumatura, Il Secondo Versamento, La Pulizia, La Consegna, L\'Ammirazione',
      vi: '9 bước rót nghi lễ: Thanh tẩy, Hiến tế, Rót, Bọt, Vớt bọt, Rót lần hai, Làm sạch, Trao tặng, Ngưỡng mộ',
    },
    ideal_head: '2 fingers',
  },

  pairing: {
    food_categories: ['seafood', 'mussels', 'frites', 'light-dishes'],
    food_pairings: {
      en: 'Classic pairing with moules-frites (mussels and fries). Also excellent with seafood, light salads, grilled white fish, and mild cheeses.',
      it: 'Abbinamento classico con moules-frites (cozze e patatine). Eccellente anche con frutti di mare, insalate leggere, pesce bianco alla griglia e formaggi delicati.',
      vi: 'Kết hợp cổ điển với moules-frites (vẹm và khoai tây chiên). Cũng tuyệt vời với hải sản, salad nhẹ, cá trắng nướng và phô mai nhẹ.',
    },
    cheese_pairings: ['Brie', 'Camembert', 'Goat cheese'],
    cuisine_pairings: ['Belgian', 'French', 'Seafood'],
  },

  season_tags: ['all_year', 'christmas'],
  occasion_tags: ['dinner', 'date_night', 'celebration', 'casual'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [284, 330, 500],
  availability: 'year_round',

  price_tier: 'premium',
  popularity: 88,

  source: {
    primary: 'https://www.stellaartois.com',
    note: 'Official Stella Artois website and 600+ years of brewing heritage',
  },

  version: 1,
};
