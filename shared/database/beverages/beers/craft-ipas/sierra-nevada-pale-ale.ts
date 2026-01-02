import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const sierraNevadaPaleAle: Beer = {
  id: uuidv4(),
  slug: 'sierra-nevada-pale-ale',
  stable_key: 'sierra-nevada-pale-ale-craft-ipa',
  name: {
    en: 'Sierra Nevada Pale Ale',
    it: 'Sierra Nevada Pale Ale',
    vi: 'Sierra Nevada Pale Ale',
  },

  status: 'craft_classic',
  style_category: 'ale',
  style: 'american_pale_ale',
  tags: ['craft', 'american', 'pioneer', 'hoppy', 'iconic'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Chico, California',
    brewery: {
      en: 'Sierra Nevada Brewing Co.',
      it: 'Birrificio Sierra Nevada',
      vi: 'Nhà máy bia Sierra Nevada',
    },
    brewery_founded: 1980,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '1980',
    story: {
      en: 'Sierra Nevada Pale Ale is the beer that launched the American craft beer revolution. Founded by Ken Grossman and Paul Camusi in 1980, it was one of the first breweries to use whole-cone Cascade hops, creating a bold, piney flavor that defined the American Pale Ale style. This beer single-handedly inspired countless brewers and remains a benchmark for the style.',
      it: 'Sierra Nevada Pale Ale è la birra che ha lanciato la rivoluzione della birra artigianale americana. Fondata da Ken Grossman e Paul Camusi nel 1980, è stato uno dei primi birrifici a utilizzare luppoli Cascade in cono intero, creando un sapore audace e resinoso che ha definito lo stile American Pale Ale. Questa birra ha ispirato innumerevoli birrai e rimane un punto di riferimento per lo stile.',
      vi: 'Sierra Nevada Pale Ale là loại bia khởi động cuộc cách mạng bia thủ công Mỹ. Được thành lập bởi Ken Grossman và Paul Camusi năm 1980, đây là một trong những nhà máy bia đầu tiên sử dụng hoa bia Cascade nguyên nụ, tạo ra hương vị thông táo bạo, định nghĩa phong cách American Pale Ale. Loại bia này đã truyền cảm hứng cho vô số thợ pha bia và vẫn là tiêu chuẩn cho phong cách này.',
    },
    awards: ['Great American Beer Festival Gold', 'World Beer Cup Winner'],
    named_after: {
      en: 'Named after the Sierra Nevada mountain range in California',
      it: 'Prende il nome dalla catena montuosa Sierra Nevada in California',
      vi: 'Được đặt theo tên dãy núi Sierra Nevada ở California',
    },
  },

  description: {
    en: 'A revolutionary American Pale Ale featuring bold Cascade hops with piney, citrus notes. Medium-bodied with a perfect balance of malt sweetness and hop bitterness, it set the standard for craft beer in America.',
    it: 'Una rivoluzionaria American Pale Ale caratterizzata da audaci luppoli Cascade con note di pino e agrumi. Di corpo medio con un perfetto equilibrio tra dolcezza del malto e amarezza del luppolo, ha stabilito lo standard per la birra artigianale in America.',
    vi: 'Một loại American Pale Ale mang tính cách mạng với hoa bia Cascade táo bạo mang hương thông, cam quýt. Độ đậm vừa phải với sự cân bằng hoàn hảo giữa vị ngọt của mạch nha và vị đắng của hoa bia, đã đặt tiêu chuẩn cho bia thủ công ở Mỹ.',
  },

  tagline: {
    en: 'The Original Craft Beer Revolution',
    it: 'La Rivoluzione Originale della Birra Artigianale',
    vi: 'Cuộc Cách Mạng Bia Thủ Công Nguyên Bản',
  },

  characteristics: {
    abv: 5.6,
    ibu: 38,
    srm: 11,
    color: 'amber',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['hoppy', 'piney', 'citrus', 'balanced', 'crisp'],
    description: {
      en: 'Bold pine and citrus hop character balanced by a smooth malt backbone. Cascade hops provide distinctive grapefruit and floral notes with a clean, dry finish.',
      it: 'Carattere audace di luppolo con note di pino e agrumi bilanciato da una base di malto morbida. I luppoli Cascade forniscono note distintive di pompelmo e floreali con un finale pulito e secco.',
      vi: 'Đặc trưng hoa bia thông và cam quýt táo bạo được cân bằng bởi nền mạch nha mượt mà. Hoa bia Cascade mang đến hương bưởi và hoa đặc trưng với kết thúc sạch, khô.',
    },
    aroma: {
      en: 'Piney Cascade hops with grapefruit, floral notes, and subtle caramel malt',
      it: 'Luppolo Cascade resinoso con note di pompelmo, floreali e malto caramello sottile',
      vi: 'Hoa bia Cascade thông với hương bưởi, hoa và mạch nha caramel tinh tế',
    },
    finish: {
      en: 'Clean, dry finish with lingering hop bitterness',
      it: 'Finale pulito e secco con amarezza di luppolo persistente',
      vi: 'Kết thúc sạch, khô với vị đắng hoa bia kéo dài',
    },
    bitterness_level: 4,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pale malt', 'Caramel malt'],
    hops: ['Cascade', 'Magnum'],
    yeast: 'Ale yeast',
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 7, max: 10 },
    pouring_notes: {
      en: 'Pour into a clean glass at a slight angle, creating a 1-2 finger white head',
      it: 'Versare in un bicchiere pulito leggermente inclinato, creando una schiuma bianca di 1-2 dita',
      vi: 'Rót vào ly sạch nghiêng nhẹ, tạo lớp bọt trắng 1-2 ngón tay',
    },
  },

  pairing: {
    food_categories: ['burgers', 'grilled-meats', 'spicy-foods'],
    food_pairings: {
      en: 'Perfect with burgers, grilled salmon, spicy Mexican food, and aged cheddar. The hop bitterness cuts through rich, fatty foods.',
      it: 'Perfetto con hamburger, salmone alla griglia, cibo messicano piccante e cheddar stagionato. L\'amarezza del luppolo taglia i cibi ricchi e grassi.',
      vi: 'Hoàn hảo với burger, cá hồi nướng, đồ ăn Mexico cay và phô mai cheddar già. Vị đắng hoa bia cắt qua thực phẩm giàu chất béo.',
    },
    cheese_pairings: ['Aged Cheddar', 'Gruyere', 'Blue cheese'],
    cuisine_pairings: ['American', 'Mexican', 'BBQ'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['casual', 'bbq', 'sports', 'dinner'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [355, 473],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 92,

  source: {
    primary: 'https://sierranevada.com',
    note: 'Official Sierra Nevada website and craft beer history',
  },

  version: 1,
};
