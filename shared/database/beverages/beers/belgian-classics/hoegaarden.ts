import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const hoegaarden: Beer = {
  id: uuidv4(),
  slug: 'hoegaarden',
  stable_key: 'hoegaarden-witbier',
  name: {
    en: 'Hoegaarden',
    it: 'Hoegaarden',
    vi: 'Hoegaarden',
  },

  status: 'international_classic',
  style_category: 'belgian',
  style: 'belgian_witbier',
  tags: ['witbier', 'wheat', 'belgian', 'refreshing', 'spiced', 'classic', 'citrus'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    region: 'Flemish Brabant',
    city: 'Hoegaarden',
    brewery: {
      en: 'Hoegaarden Brewery (AB InBev)',
      it: 'Birrificio Hoegaarden (AB InBev)',
      vi: 'Nhà máy bia Hoegaarden (AB InBev)',
    },
    brewery_founded: 1966,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1445',
    story: {
      en: 'Hoegaarden witbier dates back to 1445 when monks in the village of Hoegaarden brewed wheat beer with spices. Production died out in 1957, but in 1966, milkman Pierre Celis revived the style in his hay loft, recreating the traditional recipe with wheat, coriander, and orange peel. The beer became hugely successful, popularizing witbier worldwide and inspiring countless imitations. Hoegaarden is credited with single-handedly reviving the Belgian witbier style.',
      it: 'La witbier Hoegaarden risale al 1445 quando i monaci nel villaggio di Hoegaarden producevano birra di frumento con spezie. La produzione cessò nel 1957, ma nel 1966, il lattaio Pierre Celis rianimò lo stile nel suo fienile, ricreando la ricetta tradizionale con frumento, coriandolo e scorza d\'arancia. La birra ebbe un enorme successo, rendendo popolare la witbier in tutto il mondo e ispirando innumerevoli imitazioni. A Hoegaarden è attribuito il merito di aver rianimato da sola lo stile witbier belga.',
      vi: 'Hoegaarden witbier có từ năm 1445 khi các tu sĩ ở làng Hoegaarden sản xuất bia lúa mì với gia vị. Sản xuất chấm dứt năm 1957, nhưng năm 1966, người giao sữa Pierre Celis đã hồi sinh phong cách trong gác xép cỏ khô của mình, tái tạo công thức truyền thống với lúa mì, rau mùi và vỏ cam. Bia trở nên cực kỳ thành công, phổ biến witbier trên toàn thế giới và truyền cảm hứng cho vô số bản sao. Hoegaarden được ghi nhận đã tự mình hồi sinh phong cách witbier Bỉ.',
    },
    awards: ['World Beer Awards', 'European Beer Star Gold'],
    significance: {
      en: 'Revived and popularized the Belgian witbier style, becoming the benchmark for the category worldwide',
      it: 'Ha rianimato e reso popolare lo stile witbier belga, diventando il punto di riferimento per la categoria in tutto il mondo',
      vi: 'Đã hồi sinh và phổ biến phong cách witbier Bỉ, trở thành chuẩn mực cho thể loại trên toàn thế giới',
    },
  },

  description: {
    en: 'The beer that revived the Belgian witbier style. Refreshing, cloudy wheat beer spiced with coriander and orange peel. Light, citrusy, and perfectly balanced - ideal for warm weather and casual drinking.',
    it: 'La birra che ha rianimato lo stile witbier belga. Birra di frumento rinfrescante e torbida speziata con coriandolo e scorza d\'arancia. Leggera, agrumata e perfettamente equilibrata - ideale per il clima caldo e il bere informale.',
    vi: 'Bia đã hồi sinh phong cách witbier Bỉ. Bia lúa mì đục, sảng khoái được gia vị với rau mùi và vỏ cam. Nhẹ, cam quýt và cân bằng hoàn hảo - lý tưởng cho thời tiết ấm và uống giải trí.',
  },

  tagline: {
    en: 'The Original Belgian White Beer',
    it: 'L\'Originale Birra Bianca Belga',
    vi: 'Bia Trắng Bỉ Nguyên Bản',
  },

  characteristics: {
    abv: 4.9,
    ibu: 15,
    srm: 3,
    color: 'straw',
    clarity: 'cloudy',
    carbonation: 'high',
    body: 'light',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['citrusy', 'spicy', 'refreshing', 'wheat', 'light', 'crisp', 'zesty'],
    description: {
      en: 'Light, refreshing, and perfectly balanced. Citrus (orange, lemon) from orange peel, coriander spice adds herbal, slightly peppery notes. Wheat provides soft, creamy texture. Very low bitterness with a clean, crisp finish. High carbonation makes it extremely refreshing and easy drinking.',
      it: 'Leggera, rinfrescante e perfettamente equilibrata. Agrumi (arancia, limone) dalla scorza d\'arancia, le spezie di coriandolo aggiungono note erbacee e leggermente pepate. Il frumento fornisce una consistenza morbida e cremosa. Amarezza molto bassa con un finale pulito e fresco. L\'alta carbonazione la rende estremamente rinfrescante e facile da bere.',
      vi: 'Nhẹ, sảng khoái và cân bằng hoàn hảo. Cam quýt (cam, chanh) từ vỏ cam, gia vị rau mùi thêm hương thảo mộc, hơi cay. Lúa mì cung cấp kết cấu mềm, kem. Đắng rất thấp với kết thúc sạch, giòn. Độ sủi bọt cao làm cho nó cực kỳ sảng khoái và dễ uống.',
    },
    aroma: {
      en: 'Orange citrus, coriander spice, wheat, light yeast esters, subtle clove',
      it: 'Agrumi d\'arancia, spezie di coriandolo, frumento, leggeri esteri di lievito, sottili chiodi di garofano',
      vi: 'Cam quýt cam, gia vị rau mùi, lúa mì, ester men nhẹ, đinh hương tinh tế',
    },
    first_impression: {
      en: 'Bright citrus refreshment with subtle spice complexity',
      it: 'Rinfrescante agrumata brillante con sottile complessità speziata',
      vi: 'Sảng khoái cam quýt tươi sáng với độ phức tạp gia vị tinh tế',
    },
    finish: {
      en: 'Clean, crisp, and refreshing with lingering citrus and spice',
      it: 'Pulita, fresca e rinfrescante con agrumi e spezie persistenti',
      vi: 'Sạch, giòn và sảng khoái với cam quýt và gia vị kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between citrus, spice, and wheat softness',
      it: 'Perfettamente equilibrata tra agrumi, spezie e morbidezza del frumento',
      vi: 'Cân bằng hoàn hảo giữa cam quýt, gia vị và độ mềm lúa mì',
    },
    bitterness_level: 1,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Wheat malt', 'Pilsner malt', 'Oats'],
    hops: ['Noble hops'],
    yeast: 'Belgian witbier yeast',
    special_ingredients: ['Coriander seeds', 'Curaçao orange peel'],
  },

  serving: {
    glass: 'weizen',
    temperature: 'cold',
    temperature_celsius: { min: 3, max: 5 },
    pouring_notes: {
      en: 'Pour into a tall wheat beer glass. Gently swirl the bottle before pouring the last bit to incorporate the yeast sediment for authentic cloudiness. Garnish with an orange slice if desired.',
      it: 'Versare in un alto bicchiere da birra di frumento. Ruotare delicatamente la bottiglia prima di versare l\'ultimo po\' per incorporare il sedimento di lievito per un\'autentica torbidità. Guarnire con una fetta d\'arancia se desiderato.',
      vi: 'Rót vào ly bia lúa mì cao. Xoay nhẹ chai trước khi rót phần cuối để kết hợp cặn men cho độ đục chân thực. Trang trí với lát cam nếu muốn.',
    },
    ideal_head: '2 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['seafood', 'light-dishes', 'salads', 'cheese'],
    food_pairings: {
      en: 'Perfect with mussels, grilled fish, light salads, goat cheese, sushi, Thai cuisine, and fresh fruit. The citrus and spice complement seafood beautifully. Classic pairing with Belgian mussels in white wine.',
      it: 'Perfetta con cozze, pesce alla griglia, insalate leggere, formaggio di capra, sushi, cucina thailandese e frutta fresca. Gli agrumi e le spezie complementano magnificamente i frutti di mare. Abbinamento classico con cozze belghe al vino bianco.',
      vi: 'Hoàn hảo với vẹm, cá nướng, salad nhẹ, phô mai dê, sushi, ẩm thực Thái và trái cây tươi. Cam quýt và gia vị bổ sung cho hải sản một cách tuyệt đẹp. Kết hợp cổ điển với vẹm Bỉ trong rượu trắng.',
    },
    cheese_pairings: ['Goat cheese', 'Feta', 'Brie', 'Fresh mozzarella'],
    cuisine_pairings: ['Belgian', 'Thai', 'Seafood', 'Vietnamese'],
  },

  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['casual', 'lunch', 'aperitivo', 'outdoor', 'social'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 750],
  related_beers: ['blue-moon', 'allagash-white', 'st-bernardus-wit'],
  availability: 'year_round',

  price_tier: 'affordable',
  popularity: 88,

  source: {
    primary: 'https://www.hoegaarden.com',
    note: 'Official Hoegaarden website and Belgian witbier heritage',
  },

  version: 1,
};
