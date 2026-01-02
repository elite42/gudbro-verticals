import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const leffeBlonde: Beer = {
  id: uuidv4(),
  slug: 'leffe-blonde',
  stable_key: 'leffe-blonde-abbey',
  name: {
    en: 'Leffe Blonde',
    it: 'Leffe Bionda',
    vi: 'Leffe Vàng',
  },

  status: 'international_classic',
  style_category: 'belgian',
  style: 'belgian_blonde',
  tags: ['abbey', 'belgian', 'blonde', 'accessible', 'classic', 'smooth'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    region: 'Namur',
    city: 'Dinant',
    brewery: {
      en: 'Abbaye de Leffe (brewed by AB InBev)',
      it: 'Abbazia di Leffe (prodotta da AB InBev)',
      vi: 'Tu viện Leffe (sản xuất bởi AB InBev)',
    },
    brewery_founded: 1240,
    brewery_type: 'abbey',
  },

  history: {
    first_brewed: '1240',
    story: {
      en: 'Leffe Abbey was founded in 1152, and the monks began brewing beer around 1240 to provide safe drinking water and sustenance. The abbey survived wars and the French Revolution, but brewing ceased in 1809. In 1952, the abbey licensed the Leffe name to Lootvoet Brewery, which created the modern Leffe Blonde recipe. Today, Leffe is brewed by AB InBev under license from the abbey. While not a Trappist beer, Leffe maintains its abbey heritage and traditional brewing methods.',
      it: 'L\'Abbazia di Leffe fu fondata nel 1152 e i monaci iniziarono a produrre birra intorno al 1240 per fornire acqua potabile sicura e sostentamento. L\'abbazia sopravvisse a guerre e alla Rivoluzione francese, ma la produzione di birra cessò nel 1809. Nel 1952, l\'abbazia concesse in licenza il nome Leffe al Birrificio Lootvoet, che creò la moderna ricetta Leffe Blonde. Oggi, Leffe è prodotta da AB InBev su licenza dell\'abbazia. Sebbene non sia una birra trappista, Leffe mantiene il suo patrimonio abbaziale e i metodi di produzione tradizionali.',
      vi: 'Tu viện Leffe được thành lập năm 1152, và các tu sĩ bắt đầu sản xuất bia vào khoảng năm 1240 để cung cấp nước uống an toàn và thực phẩm. Tu viện sống sót qua chiến tranh và Cách mạng Pháp, nhưng sản xuất bia ngừng vào năm 1809. Năm 1952, tu viện cấp phép tên Leffe cho Nhà máy bia Lootvoet, công ty đã tạo ra công thức Leffe Blonde hiện đại. Ngày nay, Leffe được AB InBev sản xuất theo giấy phép từ tu viện. Mặc dù không phải là bia Trappist, Leffe vẫn duy trì di sản tu viện và phương pháp sản xuất truyền thống.',
    },
    awards: ['World Beer Awards', 'European Beer Star'],
    significance: {
      en: 'One of the most popular and accessible Belgian abbey beers worldwide, introducing millions to Belgian brewing traditions',
      it: 'Una delle birre abbaziali belghe più popolari e accessibili al mondo, che introduce milioni di persone alle tradizioni birrarie belghe',
      vi: 'Một trong những loại bia tu viện Bỉ phổ biến và dễ tiếp cận nhất trên toàn thế giới, giới thiệu hàng triệu người với truyền thống sản xuất bia Bỉ',
    },
  },

  description: {
    en: 'A classic Belgian blonde abbey ale with smooth, accessible flavor. Golden color with balanced fruity sweetness, subtle spice, and gentle bitterness. An excellent introduction to Belgian abbey brewing traditions.',
    it: 'Una classica ale bionda abbaziale belga con sapore morbido e accessibile. Colore dorato con dolcezza fruttata equilibrata, spezie sottili e delicata amarezza. Un\'eccellente introduzione alle tradizioni di produzione delle birre abbaziali belghe.',
    vi: 'Một ale blonde tu viện Bỉ cổ điển với hương vị mượt mà, dễ tiếp cận. Màu vàng với vị ngọt trái cây cân bằng, gia vị tinh tế và đắng nhẹ. Một giới thiệu tuyệt vời về truyền thống sản xuất bia tu viện Bỉ.',
  },

  tagline: {
    en: 'Abbey Tradition Since 1240',
    it: 'Tradizione Abbaziale dal 1240',
    vi: 'Truyền Thống Tu Viện Từ 1240',
  },

  characteristics: {
    abv: 6.6,
    ibu: 25,
    srm: 7,
    color: 'gold',
    clarity: 'clear',
    carbonation: 'medium_high',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['fruity', 'smooth', 'sweet', 'spicy', 'malty', 'balanced', 'approachable'],
    description: {
      en: 'Smooth and balanced with fruity sweetness (banana, honey), subtle spicy notes (clove, vanilla), light caramel malt, and gentle hop bitterness. Clean finish with lingering sweetness and mild spice. Very approachable despite 6.6% ABV.',
      it: 'Morbida ed equilibrata con dolcezza fruttata (banana, miele), sottili note speziate (chiodi di garofano, vaniglia), leggero malto caramellato e delicata amarezza del luppolo. Finale pulito con dolcezza persistente e spezie delicate. Molto accessibile nonostante il 6,6% ABV.',
      vi: 'Mượt mà và cân bằng với vị ngọt trái cây (chuối, mật ong), hương cay tinh tế (đinh hương, vani), malt caramel nhẹ và đắng hoa bia nhẹ. Kết thúc sạch với vị ngọt kéo dài và gia vị nhẹ. Rất dễ tiếp cận mặc dù 6,6% ABV.',
    },
    aroma: {
      en: 'Fruity (banana, honey), subtle spice (clove, vanilla), light caramel, gentle malt sweetness',
      it: 'Fruttato (banana, miele), spezie sottili (chiodi di garofano, vaniglia), caramello leggero, dolcezza delicata del malto',
      vi: 'Trái cây (chuối, mật ong), gia vị tinh tế (đinh hương, vani), caramel nhẹ, vị ngọt malt nhẹ',
    },
    first_impression: {
      en: 'Gentle fruity sweetness with smooth, inviting character',
      it: 'Dolcezza fruttata delicata con carattere morbido e invitante',
      vi: 'Vị ngọt trái cây nhẹ nhàng với đặc tính mượt mà, hấp dẫn',
    },
    finish: {
      en: 'Clean and smooth with lingering sweetness and subtle spice',
      it: 'Pulito e morbido con dolcezza persistente e spezie sottili',
      vi: 'Sạch và mượt với vị ngọt kéo dài và gia vị tinh tế',
    },
    balance: {
      en: 'Balanced between fruity malt sweetness and gentle hop bitterness',
      it: 'Equilibrata tra dolcezza maltosa fruttata e delicata amarezza del luppolo',
      vi: 'Cân bằng giữa vị ngọt malt trái cây và đắng hoa bia nhẹ',
    },
    bitterness_level: 2,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Pilsner malt', 'Munich malt'],
    hops: ['Noble hops'],
    yeast: 'Belgian abbey yeast',
    special_ingredients: ['Candi sugar'],
  },

  serving: {
    glass: 'goblet',
    temperature: 'cold',
    temperature_celsius: { min: 5, max: 7 },
    pouring_notes: {
      en: 'Pour into a chalice or goblet at 45° angle for optimal head formation. The smooth, creamy head is part of the experience.',
      it: 'Versare in un calice a 45° per una formazione ottimale della schiuma. La schiuma morbida e cremosa fa parte dell\'esperienza.',
      vi: 'Rót vào chalice hoặc goblet nghiêng 45° để tạo bọt tối ưu. Lớp bọt mượt, kem là một phần của trải nghiệm.',
    },
    ideal_head: '2 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['cheese', 'poultry', 'light-dishes', 'appetizers'],
    food_pairings: {
      en: 'Pairs well with mild to medium cheeses (Brie, Gouda), roasted chicken, grilled fish, Belgian waffles, and light pasta dishes. The balanced sweetness complements a wide range of foods.',
      it: 'Si abbina bene con formaggi da delicati a medi (Brie, Gouda), pollo arrosto, pesce alla griglia, waffle belgi e piatti di pasta leggeri. La dolcezza equilibrata si abbina a un\'ampia gamma di cibi.',
      vi: 'Kết hợp tốt với phô mai nhẹ đến trung bình (Brie, Gouda), gà nướng, cá nướng, waffle Bỉ và món pasta nhẹ. Vị ngọt cân bằng bổ sung cho nhiều loại thực phẩm.',
    },
    cheese_pairings: ['Brie', 'Gouda', 'Gruyère', 'Emmental'],
    cuisine_pairings: ['Belgian', 'French', 'Mediterranean'],
  },

  season_tags: ['all_year', 'spring', 'summer'],
  occasion_tags: ['casual', 'dinner', 'aperitivo', 'social'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [330, 750],
  related_beers: ['leffe-brune', 'leffe-tripel', 'grimbergen-blonde'],
  availability: 'year_round',

  price_tier: 'moderate',
  popularity: 85,

  source: {
    primary: 'https://www.leffe.com',
    note: 'Official Leffe website and Belgian abbey brewing heritage',
  },

  version: 1,
};
