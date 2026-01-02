import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const sapporoPremium: Beer = {
  id: uuidv4(),
  slug: 'sapporo-premium',
  stable_key: 'sapporo-premium-japanese-lager',
  name: {
    en: 'Sapporo Premium Beer',
    it: 'Sapporo Premium Beer',
    vi: 'Bia Sapporo Premium',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'japanese_lager',
  tags: ['japanese', 'premium', 'silver-can', 'oldest-japanese', 'rice', 'clean'],

  origin: {
    country: 'Japan',
    country_code: 'JP',
    city: 'Sapporo, Hokkaido',
    brewery: {
      en: 'Sapporo Breweries',
      it: 'Sapporo Breweries',
      vi: 'Sapporo Breweries',
    },
    brewery_founded: 1876,
    brewery_type: 'macro',
  },

  history: {
    first_brewed: '1876',
    story: {
      en: 'Sapporo is Japan\'s oldest beer brand, founded in 1876 in Hokkaido by German-trained brewmaster Seibei Nakagawa. The star logo represents Hokkaido\'s pioneering spirit. The distinctive silver can was introduced in 1984 and became iconic. Sapporo pioneered Japanese beer exports and remains one of the "Big Four" Japanese breweries.',
      it: 'Sapporo è il marchio di birra più antico del Giappone, fondato nel 1876 in Hokkaido dal mastro birraio formato in Germania Seibei Nakagawa. Il logo a stella rappresenta lo spirito pionieristico di Hokkaido. La distintiva lattina argentata fu introdotta nel 1984 e divenne iconica. Sapporo fu pioniera delle esportazioni di birra giapponese e rimane una delle "Big Four" birrerie giapponesi.',
      vi: 'Sapporo là thương hiệu bia lâu đời nhất Nhật Bản, được thành lập năm 1876 tại Hokkaido bởi thợ nấu bia được đào tạo ở Đức Seibei Nakagawa. Logo ngôi sao đại diện cho tinh thần tiên phong của Hokkaido. Lon bạc đặc trưng được giới thiệu năm 1984 và trở nên biểu tượng. Sapporo tiên phong xuất khẩu bia Nhật Bản và vẫn là một trong "Big Four" nhà máy bia Nhật Bản.',
    },
    awards: ['World Beer Awards', 'Japan\'s oldest brand'],
    named_after: {
      en: 'Named after the city of Sapporo, capital of Hokkaido, where brewing began',
      it: 'Prende il nome dalla città di Sapporo, capitale di Hokkaido, dove iniziò la produzione',
      vi: 'Được đặt theo thành phố Sapporo, thủ phủ của Hokkaido, nơi bắt đầu sản xuất bia',
    },
  },

  description: {
    en: 'Japan\'s oldest brand delivers a refined, crisp lager with a polished malt character and clean finish. The distinctive silver can and star logo are recognized worldwide as symbols of Japanese brewing excellence.',
    it: 'Il marchio più antico del Giappone offre una lager raffinata e fresca con un carattere maltato elegante e un finale pulito. La distintiva lattina argentata e il logo a stella sono riconosciuti in tutto il mondo come simboli dell\'eccellenza birraria giapponese.',
    vi: 'Thương hiệu lâu đời nhất Nhật Bản mang đến loại bia lager tinh tế, giòn với đặc tính mạch nha bóng bẩy và kết thúc sạch. Lon bạc đặc trưng và logo ngôi sao được công nhận trên toàn thế giới như biểu tượng của sự xuất sắc sản xuất bia Nhật Bản.',
  },

  tagline: {
    en: 'Legendary Biru',
    it: 'Birra Leggendaria',
    vi: 'Bia Huyền Thoại',
  },

  characteristics: {
    abv: 4.9,
    ibu: 18,
    srm: 3,
    color: 'straw',
    clarity: 'brilliant',
    carbonation: 'medium',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['crisp', 'clean', 'refreshing', 'malty', 'balanced', 'smooth'],
    description: {
      en: 'Clean and refined with a polished malt character, subtle rice sweetness, and gentle hop bitterness. The finish is crisp and refreshing with no lingering aftertaste.',
      it: 'Pulita e raffinata con un carattere maltato elegante, sottile dolcezza del riso e delicata amarezza del luppolo. Il finale è fresco e rinfrescante senza retrogusto persistente.',
      vi: 'Sạch và tinh tế với đặc tính mạch nha bóng bẩy, ngọt gạo tinh tế và đắng hoa bia nhẹ. Kết thúc giòn và sảng khoái không có hậu vị kéo dài.',
    },
    aroma: {
      en: 'Clean grain, subtle malt sweetness, light floral hops',
      it: 'Grano pulito, sottile dolcezza maltata, luppolo floreale leggero',
      vi: 'Ngũ cốc sạch, ngọt mạch nha tinh tế, hoa bia nhẹ',
    },
    finish: {
      en: 'Clean, crisp, and refreshing with subtle malt sweetness',
      it: 'Pulito, fresco e rinfrescante con sottile dolcezza maltata',
      vi: 'Sạch, giòn và sảng khoái với ngọt mạch nha tinh tế',
    },
    bitterness_level: 2,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Malt', 'Rice', 'Corn starch'],
    hops: ['German and Czech hops'],
    yeast: 'Sapporo proprietary lager yeast',
  },

  serving: {
    glass: 'pilsner',
    temperature: 'very_cold',
    temperature_celsius: { min: 2, max: 5 },
    pouring_notes: {
      en: 'Pour into a chilled glass at a 45° angle for optimal foam',
      it: 'Versare in un bicchiere raffreddato a 45° per una schiuma ottimale',
      vi: 'Rót vào ly lạnh nghiêng 45° để có lớp bọt tối ưu',
    },
  },

  pairing: {
    food_categories: ['japanese-food', 'sushi', 'grilled-dishes', 'seafood'],
    food_pairings: {
      en: 'Excellent with Japanese cuisine: sushi, ramen, yakitori, tempura. The clean finish complements delicate flavors without overwhelming them.',
      it: 'Eccellente con la cucina giapponese: sushi, ramen, yakitori, tempura. Il finale pulito completa i sapori delicati senza sopraffarli.',
      vi: 'Tuyệt vời với ẩm thực Nhật Bản: sushi, ramen, yakitori, tempura. Kết thúc sạch bổ sung cho hương vị tinh tế mà không áp đảo chúng.',
    },
    cuisine_pairings: ['Japanese', 'Asian', 'Seafood'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['dinner', 'casual', 'party'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['can', 'bottle', 'draft'],
  available_sizes: [330, 350, 500, 650],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 82,

  source: {
    primary: 'https://www.sapporobeer.com',
    note: 'Official Sapporo website and Japanese brewing heritage',
  },

  version: 1,
};
