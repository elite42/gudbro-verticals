import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const foundersAllDayIpa: Beer = {
  id: uuidv4(),
  slug: 'founders-all-day-ipa',
  stable_key: 'founders-all-day-ipa-craft-ipa',
  name: {
    en: 'Founders All Day IPA',
    it: 'Founders All Day IPA',
    vi: 'Founders All Day IPA',
  },

  status: 'craft_classic',
  style_category: 'ale',
  style: 'session_ipa',
  tags: ['craft', 'michigan', 'session', 'drinkable', 'low-abv'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Grand Rapids, Michigan',
    brewery: {
      en: 'Founders Brewing Co.',
      it: 'Birrificio Founders',
      vi: 'Công ty Bia Founders',
    },
    brewery_founded: 1997,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '2012',
    story: {
      en: 'Founders All Day IPA was created to be a Session IPA - a beer with IPA flavor but lower alcohol content for "all day" drinking. It became one of the most popular session IPAs in America, proving that flavor doesn\'t require high ABV. The beer helped popularize the session IPA category across the craft beer world.',
      it: 'Founders All Day IPA è stata creata per essere una Session IPA - una birra con sapore IPA ma contenuto alcolico più basso per bere "tutto il giorno". È diventata una delle session IPA più popolari in America, dimostrando che il sapore non richiede un alto ABV. La birra ha contribuito a rendere popolare la categoria session IPA nel mondo della birra artigianale.',
      vi: 'Founders All Day IPA được tạo ra để trở thành Session IPA - một loại bia có hương vị IPA nhưng hàm lượng cồn thấp hơn để uống "cả ngày". Nó đã trở thành một trong những session IPA phổ biến nhất ở Mỹ, chứng minh rằng hương vị không cần ABV cao. Loại bia này đã giúp phổ biến hạng mục session IPA trên toàn thế giới bia thủ công.',
    },
    awards: ['Great American Beer Festival Medal', 'World Beer Cup Bronze'],
    named_after: {
      en: 'Named for its drinkability - meant to be enjoyed all day long',
      it: 'Prende il nome dalla sua bevibilità - pensata per essere gustata tutto il giorno',
      vi: 'Được đặt tên theo khả năng uống được - có nghĩa là để thưởng thức cả ngày',
    },
  },

  description: {
    en: 'A session IPA packed with hop flavor but only 4.7% ABV. Light-bodied and crisp with grapefruit, pine, and floral notes. Designed for extended drinking sessions without fatigue - all the IPA character with less alcohol.',
    it: 'Una session IPA ricca di sapore di luppolo ma solo 4,7% ABV. Di corpo leggero e fresco con note di pompelmo, pino e floreali. Progettata per sessioni di bevuta prolungate senza affaticamento - tutto il carattere IPA con meno alcol.',
    vi: 'Một session IPA đầy hương vị hoa bia nhưng chỉ có 4,7% ABV. Nhẹ nhàng và giòn với hương bưởi, thông và hoa. Được thiết kế cho các phiên uống kéo dài mà không mệt mỏi - tất cả đặc tính IPA với ít cồn hơn.',
  },

  tagline: {
    en: 'The Beer You\'ve Been Waiting For',
    it: 'La Birra Che Stavi Aspettando',
    vi: 'Bia Bạn Đã Chờ Đợi',
  },

  characteristics: {
    abv: 4.7,
    ibu: 42,
    srm: 5,
    color: 'golden',
    clarity: 'clear',
    carbonation: 'medium_high',
    body: 'light_medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['hoppy', 'citrus', 'crisp', 'refreshing', 'sessionable'],
    description: {
      en: 'Bright citrus and grapefruit hop flavors with subtle pine and floral notes. Light malt sweetness keeps it refreshing. Crisp, clean finish makes it incredibly drinkable despite notable hop character.',
      it: 'Sapori luminosi di agrumi e pompelmo del luppolo con sottili note di pino e floreali. La leggera dolcezza del malto la mantiene rinfrescante. Il finale fresco e pulito la rende incredibilmente bevibile nonostante il notevole carattere del luppolo.',
      vi: 'Hương vị hoa bia cam quýt và bưởi tươi sáng với hương thông và hoa tinh tế. Vị ngọt mạch nha nhẹ giữ cho nó sảng khoái. Kết thúc giòn, sạch khiến nó cực kỳ dễ uống mặc dù có đặc tính hoa bia đáng chú ý.',
    },
    aroma: {
      en: 'Grapefruit and citrus hops with light floral notes and subtle pale malt',
      it: 'Luppolo di pompelmo e agrumi con note floreali leggere e malto chiaro sottile',
      vi: 'Hoa bia bưởi và cam quýt với hương hoa nhẹ và mạch nha nhạt tinh tế',
    },
    finish: {
      en: 'Crisp, refreshing finish with light hop bitterness',
      it: 'Finale fresco e rinfrescante con leggera amarezza di luppolo',
      vi: 'Kết thúc giòn, sảng khoái với vị đắng hoa bia nhẹ',
    },
    bitterness_level: 3,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pale malt', 'Vienna malt', 'Munich malt'],
    hops: ['Centennial', 'Amarillo', 'Simcoe', 'Cascade'],
    yeast: 'Ale yeast',
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 6, max: 9 },
    pouring_notes: {
      en: 'Pour with a gentle tilt to preserve carbonation and create a light white head',
      it: 'Versare con una leggera inclinazione per preservare la carbonazione e creare una leggera schiuma bianca',
      vi: 'Rót với độ nghiêng nhẹ để giữ carbonation và tạo lớp bọt trắng nhẹ',
    },
  },

  pairing: {
    food_categories: ['light-fare', 'salads', 'chicken'],
    food_pairings: {
      en: 'Perfect for lighter fare like grilled chicken salad, fish tacos, goat cheese, and vegetable dishes. Great as a patio beer or with brunch.',
      it: 'Perfetto per piatti più leggeri come insalata di pollo alla griglia, tacos di pesce, formaggio di capra e piatti di verdure. Ottimo come birra da patio o con il brunch.',
      vi: 'Hoàn hảo cho đồ ăn nhẹ như salad gà nướng, tacos cá, phô mai dê và món rau. Tuyệt vời như bia sân hoặc với bữa brunch.',
    },
    cheese_pairings: ['Goat cheese', 'Mild Cheddar', 'Monterey Jack'],
    cuisine_pairings: ['American Light', 'Mediterranean', 'Brunch'],
  },

  season_tags: ['all_year', 'summer', 'spring'],
  occasion_tags: ['casual', 'daytime', 'outdoor', 'party', 'bbq'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [355],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 91,

  source: {
    primary: 'https://foundersbrewing.com',
    note: 'Official Founders Brewing website and session IPA information',
  },

  version: 1,
};
