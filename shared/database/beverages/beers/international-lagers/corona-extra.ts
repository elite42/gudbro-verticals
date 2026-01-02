import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const coronaExtra: Beer = {
  id: uuidv4(),
  slug: 'corona-extra',
  stable_key: 'corona-extra-mexican-lager',
  name: {
    en: 'Corona Extra',
    it: 'Corona Extra',
    vi: 'Corona Extra',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'mexican_lager',
  tags: ['mexican', 'beach', 'lime', 'summer', 'clear-bottle', 'iconic'],

  origin: {
    country: 'Mexico',
    country_code: 'MX',
    city: 'Mexico City',
    brewery: {
      en: 'Grupo Modelo (AB InBev)',
      it: 'Grupo Modelo (AB InBev)',
      vi: 'Grupo Modelo (AB InBev)',
    },
    brewery_founded: 1925,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1925',
    story: {
      en: 'Corona was first brewed in 1925 at Cervecería Modelo in Mexico City to celebrate Modelo\'s 10th anniversary. It became the best-selling beer in Mexico by 1935. The clear bottle was originally chosen to showcase the beer\'s clarity and golden color. The tradition of serving with a lime wedge started in the 1980s.',
      it: 'Corona fu prodotta per la prima volta nel 1925 alla Cervecería Modelo a Città del Messico per celebrare il 10° anniversario di Modelo. Divenne la birra più venduta in Messico nel 1935. La bottiglia trasparente fu originariamente scelta per mostrare la limpidezza e il colore dorato della birra. La tradizione di servire con uno spicchio di lime iniziò negli anni \'80.',
      vi: 'Corona được sản xuất lần đầu vào năm 1925 tại Cervecería Modelo ở Mexico City để kỷ niệm 10 năm của Modelo. Nó trở thành bia bán chạy nhất Mexico vào năm 1935. Chai trong suốt ban đầu được chọn để thể hiện độ trong và màu vàng của bia. Truyền thống phục vụ với múi chanh bắt đầu vào những năm 1980.',
    },
    named_after: {
      en: 'Named "Corona" meaning "Crown" in Spanish, symbolizing the crown of quality',
      it: 'Chiamata "Corona" che significa "Corona" in spagnolo, simbolo della corona della qualità',
      vi: 'Được đặt tên "Corona" có nghĩa là "Vương miện" trong tiếng Tây Ban Nha, tượng trưng cho vương miện chất lượng',
    },
  },

  description: {
    en: 'A light, refreshing Mexican lager with a distinctive clear bottle and beach lifestyle image. Best known for being served with a lime wedge, Corona offers a crisp, slightly sweet taste perfect for hot weather.',
    it: 'Una lager messicana leggera e rinfrescante con una distintiva bottiglia trasparente e un\'immagine legata allo stile di vita da spiaggia. Conosciuta soprattutto per essere servita con uno spicchio di lime, Corona offre un gusto fresco e leggermente dolce, perfetto per il clima caldo.',
    vi: 'Một loại bia lager Mexico nhẹ, sảng khoái với chai trong suốt đặc trưng và hình ảnh lối sống bãi biển. Nổi tiếng nhất khi được phục vụ với múi chanh, Corona mang đến hương vị giòn, hơi ngọt hoàn hảo cho thời tiết nóng.',
  },

  tagline: {
    en: 'Find Your Beach',
    it: 'Trova la Tua Spiaggia',
    vi: 'Tìm Bãi Biển Của Bạn',
  },

  characteristics: {
    abv: 4.6,
    ibu: 18,
    srm: 2,
    color: 'straw',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'refreshing', 'clean', 'light', 'slightly_sweet'],
    description: {
      en: 'Very light and crisp with subtle malt sweetness, minimal hop bitterness, and a clean finish. The lime wedge (if added) provides citrus brightness.',
      it: 'Molto leggera e fresca con sottile dolcezza maltata, minima amarezza del luppolo e un finale pulito. Lo spicchio di lime (se aggiunto) fornisce luminosità agrumata.',
      vi: 'Rất nhẹ và giòn với vị ngọt mạch nha tinh tế, độ đắng hoa bia tối thiểu và kết thúc sạch. Múi chanh (nếu thêm) mang đến vị cam quýt tươi sáng.',
    },
    aroma: {
      en: 'Light grain and subtle fruit notes with faint hop presence',
      it: 'Grano leggero e sottili note fruttate con lieve presenza di luppolo',
      vi: 'Hương ngũ cốc nhẹ và hương trái cây tinh tế với sự hiện diện nhẹ của hoa bia',
    },
    finish: {
      en: 'Clean, dry, and refreshing with no lingering bitterness',
      it: 'Finale pulito, secco e rinfrescante senza amarezza persistente',
      vi: 'Kết thúc sạch, khô và sảng khoái không có vị đắng kéo dài',
    },
    bitterness_level: 1,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Barley malt', 'Rice', 'Corn'],
    hops: ['Galena', 'Saaz'],
    yeast: 'Lager yeast',
  },

  serving: {
    glass: 'bottle',
    temperature: 'very_cold',
    temperature_celsius: { min: 1, max: 4 },
    pouring_notes: {
      en: 'Traditionally served in the bottle with a lime wedge inserted into the neck. Can also be poured into a pilsner glass.',
      it: 'Tradizionalmente servita nella bottiglia con uno spicchio di lime inserito nel collo. Può anche essere versata in un bicchiere da pilsner.',
      vi: 'Truyền thống được phục vụ trong chai với múi chanh cắm vào cổ chai. Cũng có thể rót vào ly pilsner.',
    },
  },

  pairing: {
    food_categories: ['mexican-food', 'seafood', 'grilled-dishes', 'spicy-food'],
    food_pairings: {
      en: 'Perfect with tacos, ceviche, grilled fish, nachos, and spicy Mexican dishes. The light body and citrus (from lime) complement seafood excellently.',
      it: 'Perfetta con tacos, ceviche, pesce alla griglia, nachos e piatti messicani piccanti. Il corpo leggero e gli agrumi (dal lime) si abbinano eccellentemente ai frutti di mare.',
      vi: 'Hoàn hảo với tacos, ceviche, cá nướng, nachos và các món Mexico cay. Thân nhẹ và cam quýt (từ chanh) bổ sung tuyệt vời cho hải sản.',
    },
    cuisine_pairings: ['Mexican', 'Tex-Mex', 'Caribbean', 'Seafood'],
  },

  season_tags: ['summer', 'all_year'],
  occasion_tags: ['beach', 'bbq', 'casual', 'party', 'poolside'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can'],
  available_sizes: [330, 355, 710],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 92,

  source: {
    primary: 'https://www.corona.com',
    note: 'Official Corona website and brand history',
  },

  version: 1,
};
