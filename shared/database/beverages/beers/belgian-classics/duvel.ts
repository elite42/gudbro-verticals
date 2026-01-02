import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const duvel: Beer = {
  id: uuidv4(),
  slug: 'duvel',
  stable_key: 'duvel-belgian-strong-golden',
  name: {
    en: 'Duvel',
    it: 'Duvel',
    vi: 'Duvel',
  },

  status: 'international_classic',
  style_category: 'belgian',
  style: 'belgian_strong_golden',
  tags: ['belgian', 'strong', 'golden', 'devil', 'iconic', 'tulip-glass', 'craft-pioneer'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    region: 'Antwerp',
    city: 'Breendonk',
    brewery: {
      en: 'Duvel Moortgat Brewery',
      it: 'Birrificio Duvel Moortgat',
      vi: 'Nhà máy bia Duvel Moortgat',
    },
    brewery_founded: 1871,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1923',
    story: {
      en: 'Originally brewed in 1923 as "Victory Ale" to celebrate the end of WWI, a local shoemaker reportedly exclaimed "Nen echten Duvel!" (a real devil!) after tasting it, giving the beer its name. The recipe was perfected over decades, with the current golden version debuting in 1970. It defined the Belgian Strong Golden Ale style and remains the benchmark for the category.',
      it: 'Originariamente prodotta nel 1923 come "Victory Ale" per celebrare la fine della Prima Guerra Mondiale, un calzolaio locale esclamò "Nen echten Duvel!" (un vero diavolo!) dopo averla assaggiata, dando il nome alla birra. La ricetta fu perfezionata nei decenni, con l\'attuale versione dorata che debuttò nel 1970. Ha definito lo stile Belgian Strong Golden Ale e rimane il punto di riferimento per la categoria.',
      vi: 'Ban đầu được sản xuất năm 1923 với tên "Victory Ale" để kỷ niệm kết thúc Thế chiến I, một thợ đóng giày địa phương được cho là đã thốt lên "Nen echten Duvel!" (một con quỷ thật sự!) sau khi nếm thử, đặt tên cho bia. Công thức được hoàn thiện qua nhiều thập kỷ, với phiên bản vàng hiện tại ra mắt năm 1970. Nó định nghĩa phong cách Belgian Strong Golden Ale và vẫn là chuẩn mực cho thể loại.',
    },
    awards: ['World Beer Cup Gold', 'European Beer Star Gold'],
    named_after: {
      en: '"Duvel" means "Devil" in Flemish dialect, referencing its deceptively strong character',
      it: '"Duvel" significa "Diavolo" in dialetto fiammingo, riferendosi al suo carattere ingannevolmente forte',
      vi: '"Duvel" có nghĩa là "Quỷ" trong phương ngữ Flemish, ám chỉ đặc tính mạnh đáng kinh ngạc của nó',
    },
  },

  description: {
    en: 'The original Belgian Strong Golden Ale - a deceptively drinkable 8.5% beer with a distinctive tulip glass and legendary foam. Light gold in color but complex in character, with fruity esters, spicy notes, and a surprisingly dry finish.',
    it: 'L\'originale Belgian Strong Golden Ale - una birra all\'8,5% ingannevolmente bevibile con un distintivo bicchiere a tulipano e schiuma leggendaria. Color oro chiaro ma complessa nel carattere, con esteri fruttati, note speziate e un finale sorprendentemente secco.',
    vi: 'Belgian Strong Golden Ale nguyên bản - bia 8,5% dễ uống đáng kinh ngạc với ly tulip đặc trưng và bọt huyền thoại. Màu vàng nhạt nhưng phức tạp trong đặc tính, với ester trái cây, hương cay và kết thúc khô đáng ngạc nhiên.',
  },

  tagline: {
    en: 'The Original Belgian Golden Strong Ale',
    it: 'L\'Originale Belgian Golden Strong Ale',
    vi: 'Belgian Golden Strong Ale Nguyên Bản',
  },

  characteristics: {
    abv: 8.5,
    ibu: 32,
    srm: 4,
    color: 'gold',
    clarity: 'clear',
    carbonation: 'very_high',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['fruity', 'spicy', 'dry', 'effervescent', 'complex', 'crisp', 'hoppy'],
    description: {
      en: 'Deceptively light and refreshing despite 8.5% ABV. Fruity esters (pear, apple), subtle spicy yeast notes (white pepper), gentle hop bitterness, and an exceptionally dry, crisp finish. The high carbonation and dry finish make it dangerously drinkable.',
      it: 'Ingannevolmente leggera e rinfrescante nonostante l\'8,5% ABV. Esteri fruttati (pera, mela), sottili note speziate del lievito (pepe bianco), delicata amarezza del luppolo e un finale eccezionalmente secco e fresco. L\'alta carbonazione e il finale secco la rendono pericolosamente bevibile.',
      vi: 'Nhẹ và sảng khoái đáng kinh ngạc mặc dù 8,5% ABV. Ester trái cây (lê, táo), hương men cay tinh tế (tiêu trắng), đắng hoa bia nhẹ và kết thúc khô, giòn đặc biệt. Độ sủi bọt cao và kết thúc khô làm cho nó nguy hiểm dễ uống.',
    },
    aroma: {
      en: 'Fruity esters (pear, citrus), light spice, subtle hop floral notes',
      it: 'Esteri fruttati (pera, agrumi), spezie leggere, sottili note floreali di luppolo',
      vi: 'Ester trái cây (lê, cam quýt), gia vị nhẹ, hương hoa bia tinh tế',
    },
    first_impression: {
      en: 'Bright fruit and effervescent refreshment that belies its strength',
      it: 'Frutta brillante e rinfrescante effervescenza che smentisce la sua forza',
      vi: 'Trái cây tươi sáng và sủi bọt sảng khoái che giấu sức mạnh của nó',
    },
    finish: {
      en: 'Long, dry, and crisp with subtle hop bitterness and lingering fruit',
      it: 'Lungo, secco e fresco con sottile amarezza del luppolo e frutta persistente',
      vi: 'Dài, khô và giòn với đắng hoa bia tinh tế và trái cây kéo dài',
    },
    bitterness_level: 3,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pilsner malt'],
    hops: ['Saaz-Saaz', 'Styrian Goldings'],
    yeast: 'Proprietary Duvel yeast strain',
    adjuncts: ['Dextrose'],
  },

  serving: {
    glass: 'tulip',
    temperature: 'cold',
    temperature_celsius: { min: 5, max: 8 },
    pouring_notes: {
      en: 'Pour slowly into the iconic Duvel tulip glass at a 45° angle. Leave a small amount of yeast sediment in bottle unless you prefer it in the beer.',
      it: 'Versare lentamente nell\'iconico bicchiere a tulipano Duvel a 45°. Lasciare una piccola quantità di sedimento di lievito nella bottiglia a meno che non lo preferiate nella birra.',
      vi: 'Rót chậm vào ly tulip Duvel biểu tượng nghiêng 45°. Để lại một ít cặn men trong chai trừ khi bạn thích nó trong bia.',
    },
    ideal_head: '2-3 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['seafood', 'cheese', 'light-dishes', 'spicy-food'],
    food_pairings: {
      en: 'Excellent with mussels, seafood, Thai cuisine, light salads, and semi-soft cheeses. The dry finish and carbonation cut through rich and spicy foods beautifully.',
      it: 'Eccellente con cozze, frutti di mare, cucina thailandese, insalate leggere e formaggi semi-morbidi. Il finale secco e la carbonazione tagliano magnificamente i cibi ricchi e piccanti.',
      vi: 'Tuyệt vời với vẹm, hải sản, ẩm thực Thái, salad nhẹ và phô mai bán mềm. Kết thúc khô và độ sủi bọt cắt qua thực phẩm đậm đà và cay một cách tuyệt đẹp.',
    },
    cheese_pairings: ['Gruyère', 'Comté', 'Aged Gouda'],
    cuisine_pairings: ['Belgian', 'Thai', 'Seafood'],
  },

  season_tags: ['all_year', 'summer'],
  occasion_tags: ['celebration', 'aperitivo', 'dinner', 'tasting'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft'],
  available_sizes: [330, 750],
  related_beers: ['duvel-tripel-hop', 'duvel-666'],
  availability: 'year_round',

  price_tier: 'premium',
  popularity: 92,

  source: {
    primary: 'https://www.duvel.com',
    note: 'Official Duvel Moortgat website and Belgian brewing heritage',
  },

  version: 1,
};
