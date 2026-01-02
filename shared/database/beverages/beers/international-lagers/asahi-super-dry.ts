import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const asahiSuperDry: Beer = {
  id: uuidv4(),
  slug: 'asahi-super-dry',
  stable_key: 'asahi-super-dry-japanese-lager',
  name: {
    en: 'Asahi Super Dry',
    it: 'Asahi Super Dry',
    vi: 'Asahi Super Dry',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'japanese_lager',
  tags: ['japanese', 'dry', 'clean', 'karakuchi', 'sushi', 'premium'],

  origin: {
    country: 'Japan',
    country_code: 'JP',
    city: 'Tokyo',
    brewery: {
      en: 'Asahi Breweries',
      it: 'Asahi Breweries',
      vi: 'Asahi Breweries',
    },
    brewery_founded: 1889,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1987',
    story: {
      en: 'Asahi Super Dry revolutionized Japanese beer when launched in 1987. It pioneered the "karakuchi" (dry taste) style using a unique brewing process that ferments more of the sugars, resulting in a cleaner, crisper beer with less residual sweetness. It became Japan\'s best-selling beer by 1998 and sparked the "dry beer wars" in the global market.',
      it: 'Asahi Super Dry rivoluzionò la birra giapponese quando fu lanciata nel 1987. Fu pioniera dello stile "karakuchi" (gusto secco) usando un processo di produzione unico che fermenta più zuccheri, risultando in una birra più pulita e fresca con meno dolcezza residua. Divenne la birra più venduta in Giappone nel 1998 e scatenò le "guerre della birra secca" nel mercato globale.',
      vi: 'Asahi Super Dry cách mạng hóa bia Nhật khi ra mắt năm 1987. Nó tiên phong phong cách "karakuchi" (vị khô) sử dụng quy trình sản xuất độc đáo lên men nhiều đường hơn, tạo ra bia sạch hơn, giòn hơn với ít vị ngọt còn lại. Nó trở thành bia bán chạy nhất Nhật Bản năm 1998 và châm ngòi "cuộc chiến bia khô" trên thị trường toàn cầu.',
    },
    named_after: {
      en: '"Super Dry" refers to the karakuchi taste profile - a crisp, clean finish with minimal sweetness',
      it: '"Super Dry" si riferisce al profilo di gusto karakuchi - un finale fresco e pulito con minima dolcezza',
      vi: '"Super Dry" đề cập đến hồ sơ hương vị karakuchi - kết thúc giòn, sạch với ít ngọt',
    },
  },

  description: {
    en: 'Japan\'s iconic "karakuchi" beer, known for its super-dry finish and clean, refreshing taste. The innovative brewing process creates a sharper, crisper beer that cleanses the palate perfectly, making it the ideal companion for Japanese cuisine.',
    it: 'L\'iconica birra "karakuchi" giapponese, nota per il suo finale super secco e il gusto pulito e rinfrescante. L\'innovativo processo di produzione crea una birra più nitida e fresca che pulisce perfettamente il palato, rendendola la compagna ideale per la cucina giapponese.',
    vi: 'Bia "karakuchi" biểu tượng của Nhật Bản, nổi tiếng với kết thúc siêu khô và hương vị sạch, sảng khoái. Quy trình sản xuất sáng tạo tạo ra bia sắc nét, giòn hơn làm sạch vị giác hoàn hảo, biến nó thành người bạn đồng hành lý tưởng cho ẩm thực Nhật Bản.',
  },

  tagline: {
    en: 'Live Beyond',
    it: 'Vivi Oltre',
    vi: 'Sống Vượt Xa',
  },

  characteristics: {
    abv: 5.0,
    ibu: 16,
    srm: 3,
    color: 'straw',
    clarity: 'brilliant',
    carbonation: 'high',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['dry', 'crisp', 'clean', 'refreshing', 'sharp'],
    description: {
      en: 'Remarkably dry with a sharp, clean finish. Light malt character, subtle hop bitterness, and minimal residual sweetness. The extended fermentation creates the signature karakuchi dryness.',
      it: 'Notevolmente secca con un finale nitido e pulito. Carattere maltato leggero, sottile amarezza del luppolo e minima dolcezza residua. La fermentazione estesa crea la caratteristica secchezza karakuchi.',
      vi: 'Khô đáng kể với kết thúc sắc nét, sạch. Đặc tính mạch nha nhẹ, đắng hoa bia tinh tế và ít vị ngọt còn lại. Quá trình lên men kéo dài tạo ra độ khô karakuchi đặc trưng.',
    },
    aroma: {
      en: 'Clean grain with very subtle hop notes',
      it: 'Grano pulito con note di luppolo molto sottili',
      vi: 'Ngũ cốc sạch với hương hoa bia rất tinh tế',
    },
    finish: {
      en: 'Sharp, dry, and incredibly clean - no lingering sweetness',
      it: 'Nitido, secco e incredibilmente pulito - nessuna dolcezza persistente',
      vi: 'Sắc nét, khô và cực kỳ sạch - không có vị ngọt kéo dài',
    },
    bitterness_level: 2,
    sweetness_level: 1,
  },

  ingredients: {
    malts: ['Malted barley', 'Rice', 'Corn starch'],
    hops: ['Czech Saaz', 'German Perle', 'German Hallertau'],
    yeast: 'Asahi proprietary yeast (strain #318)',
    adjuncts: ['Rice', 'Corn starch'],
  },

  serving: {
    glass: 'pilsner',
    temperature: 'very_cold',
    temperature_celsius: { min: 2, max: 5 },
    pouring_notes: {
      en: 'Pour at a 45° angle for a 3cm head. The foam should be dense and creamy.',
      it: 'Versare a 45° per una schiuma di 3cm. La schiuma dovrebbe essere densa e cremosa.',
      vi: 'Rót nghiêng 45° để có lớp bọt 3cm. Bọt nên dày và kem.',
    },
    ideal_head: '3cm',
  },

  pairing: {
    food_categories: ['japanese-food', 'sushi', 'sashimi', 'grilled-dishes'],
    food_pairings: {
      en: 'The perfect companion for Japanese cuisine. Excellent with sushi, sashimi, tempura, yakitori, and ramen. The dry finish cleanses the palate between bites of delicate fish.',
      it: 'Il compagno perfetto per la cucina giapponese. Eccellente con sushi, sashimi, tempura, yakitori e ramen. Il finale secco pulisce il palato tra un boccone e l\'altro di pesce delicato.',
      vi: 'Người bạn đồng hành hoàn hảo cho ẩm thực Nhật Bản. Tuyệt vời với sushi, sashimi, tempura, yakitori và ramen. Kết thúc khô làm sạch vị giác giữa các miếng cá tinh tế.',
    },
    cheese_pairings: ['Mild white cheeses', 'Fresh mozzarella'],
    cuisine_pairings: ['Japanese', 'Korean', 'Seafood', 'Asian fusion'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['dinner', 'casual', 'date_night', 'celebration'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 350, 500, 633],
  availability: 'year_round',

  price_tier: 'premium',
  popularity: 87,

  source: {
    primary: 'https://www.asahibeer.com',
    note: 'Official Asahi website and Japanese brewing heritage',
  },

  version: 1,
};
