import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const westmalleTripel: Beer = {
  id: uuidv4(),
  slug: 'westmalle-tripel',
  stable_key: 'westmalle-tripel-trappist',
  name: {
    en: 'Westmalle Tripel',
    it: 'Westmalle Tripel',
    vi: 'Westmalle Tripel',
  },

  status: 'trappist',
  style_category: 'belgian',
  style: 'belgian_tripel',
  tags: ['trappist', 'authentic', 'abbey', 'tripel', 'original', 'golden', 'complex'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    region: 'Antwerp',
    city: 'Westmalle',
    brewery: {
      en: 'Abdij van Onze-Lieve-Vrouw van het Heilig Hart',
      it: 'Abbazia di Nostra Signora del Sacro Cuore',
      vi: 'Tu viện Đức Mẹ Trái Tim Thánh',
    },
    brewery_founded: 1836,
    brewery_type: 'trappist',
    is_trappist: true,
  },

  history: {
    first_brewed: '1934',
    story: {
      en: 'Westmalle Tripel, first brewed in 1934 and perfected in 1956, is considered the original Belgian Tripel and defined the entire style. The term "Tripel" refers to the triple strength compared to typical Belgian ales. The monks at Westmalle created this strong, golden ale as a celebration beer. Its success inspired countless breweries worldwide to create their own tripels, making Westmalle the benchmark for the style.',
      it: 'Westmalle Tripel, prodotta per la prima volta nel 1934 e perfezionata nel 1956, è considerata la Tripel belga originale e ha definito l\'intero stile. Il termine "Tripel" si riferisce alla tripla forza rispetto alle tipiche ale belghe. I monaci di Westmalle crearono questa forte ale dorata come birra di celebrazione. Il suo successo ispirò innumerevoli birrifici in tutto il mondo a creare le proprie tripel, rendendo Westmalle il punto di riferimento per lo stile.',
      vi: 'Westmalle Tripel, được sản xuất lần đầu năm 1934 và hoàn thiện năm 1956, được coi là Tripel Bỉ nguyên bản và định nghĩa toàn bộ phong cách. Thuật ngữ "Tripel" đề cập đến sức mạnh gấp ba so với ale Bỉ thông thường. Các tu sĩ tại Westmalle đã tạo ra ale vàng mạnh này như bia kỷ niệm. Thành công của nó đã truyền cảm hứng cho vô số nhà máy bia trên toàn thế giới tạo ra tripel của riêng họ, khiến Westmalle trở thành chuẩn mực cho phong cách.',
    },
    awards: ['World Beer Awards Gold', 'International Trappist Association certified'],
    significance: {
      en: 'The original and definitive Belgian Tripel - the beer that created and defined the entire style',
      it: 'La Tripel belga originale e definitiva - la birra che ha creato e definito l\'intero stile',
      vi: 'Tripel Bỉ nguyên bản và quyết định - loại bia đã tạo ra và định nghĩa toàn bộ phong cách',
    },
  },

  description: {
    en: 'The original Belgian Tripel that defined the style. Golden, strong, and complex with fruity esters, spicy phenols, and a remarkably dry finish. Perfectly balanced despite 9.5% ABV, making it dangerously drinkable.',
    it: 'La Tripel belga originale che ha definito lo stile. Dorata, forte e complessa con esteri fruttati, fenoli speziati e un finale straordinariamente secco. Perfettamente equilibrata nonostante il 9,5% ABV, rendendola pericolosamente bevibile.',
    vi: 'Tripel Bỉ nguyên bản định nghĩa phong cách. Vàng, mạnh và phức tạp với ester trái cây, phenol cay và kết thúc khô đáng kinh ngạc. Cân bằng hoàn hảo mặc dù 9,5% ABV, làm cho nó nguy hiểm dễ uống.',
  },

  tagline: {
    en: 'The Father of All Tripels',
    it: 'Il Padre di Tutte le Tripel',
    vi: 'Cha Đẻ Của Tất Cả Tripel',
  },

  characteristics: {
    abv: 9.5,
    ibu: 38,
    srm: 6,
    color: 'gold',
    clarity: 'slightly_hazy',
    carbonation: 'high',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['complex', 'fruity', 'spicy', 'dry', 'effervescent', 'hoppy', 'balanced'],
    description: {
      en: 'Complex and beautifully balanced. Fruity esters (banana, pear, apple, orange), spicy phenols (clove, pepper), subtle hop bitterness, and light malt sweetness. Despite 9.5% ABV, remarkably smooth and drinkable with no alcohol burn. Very dry, crisp finish with pleasant hop bitterness. High carbonation adds refreshing effervescence.',
      it: 'Complessa e magnificamente equilibrata. Esteri fruttati (banana, pera, mela, arancia), fenoli speziati (chiodi di garofano, pepe), sottile amarezza del luppolo e leggera dolcezza del malto. Nonostante il 9,5% ABV, straordinariamente morbida e bevibile senza bruciore alcolico. Finale molto secco e fresco con piacevole amarezza del luppolo. L\'alta carbonazione aggiunge effervescenza rinfrescante.',
      vi: 'Phức tạp và cân bằng tuyệt đẹp. Ester trái cây (chuối, lê, táo, cam), phenol cay (đinh hương, tiêu), đắng hoa bia tinh tế và vị ngọt malt nhẹ. Mặc dù 9,5% ABV, mượt mà và dễ uống đáng kinh ngạc không có cảm giác cồn nóng. Kết thúc rất khô, giòn với đắng hoa bia dễ chịu. Độ sủi bọt cao thêm sự sủi bọt sảng khoái.',
    },
    aroma: {
      en: 'Fruity esters (banana, orange, pear), spicy phenols (clove, pepper), light hop floral notes, subtle malt sweetness',
      it: 'Esteri fruttati (banana, arancia, pera), fenoli speziati (chiodi di garofano, pepe), leggere note floreali di luppolo, sottile dolcezza del malto',
      vi: 'Ester trái cây (chuối, cam, lê), phenol cay (đinh hương, tiêu), hương hoa bia nhẹ, vị ngọt malt tinh tế',
    },
    first_impression: {
      en: 'Bright fruit and spice complexity balanced with refreshing effervescence',
      it: 'Complessità brillante di frutta e spezie bilanciata con effervescenza rinfrescante',
      vi: 'Độ phức tạp trái cây và gia vị tươi sáng cân bằng với sự sủi bọt sảng khoái',
    },
    finish: {
      en: 'Long, dry, and crisp with balanced hop bitterness and lingering fruity spice',
      it: 'Lungo, secco e fresco con amarezza bilanciata del luppolo e persistenti spezie fruttate',
      vi: 'Dài, khô và giòn với đắng hoa bia cân bằng và gia vị trái cây kéo dài',
    },
    balance: {
      en: 'Masterful balance between fruity esters, spicy phenols, hop bitterness, and dry finish',
      it: 'Equilibrio magistrale tra esteri fruttati, fenoli speziati, amarezza del luppolo e finale secco',
      vi: 'Cân bằng bậc thầy giữa ester trái cây, phenol cay, đắng hoa bia và kết thúc khô',
    },
    bitterness_level: 3,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pilsner malt', 'Pale malt'],
    hops: ['Styrian Goldings', 'Saaz', 'Tettnang'],
    yeast: 'Westmalle house yeast',
    special_ingredients: ['Belgian candi sugar'],
  },

  serving: {
    glass: 'goblet',
    temperature: 'cold',
    temperature_celsius: { min: 6, max: 8 },
    pouring_notes: {
      en: 'Pour into a chalice or goblet, leaving yeast sediment in bottle unless you prefer it cloudy. The dense, rocky head is part of the experience. Allow to warm slightly for full complexity.',
      it: 'Versare in un calice, lasciando il sedimento di lievito nella bottiglia a meno che non lo preferiate torbido. La schiuma densa e rocciosa fa parte dell\'esperienza. Lasciare scaldare leggermente per la piena complessità.',
      vi: 'Rót vào chalice hoặc goblet, để lại cặn men trong chai trừ khi bạn thích nó đục. Lớp bọt dày, gồ ghề là một phần của trải nghiệm. Để ấm một chút để độ phức tạp đầy đủ.',
    },
    ideal_head: '3 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['cheese', 'seafood', 'poultry', 'light-dishes'],
    food_pairings: {
      en: 'Pairs excellently with semi-soft cheeses (Gruyère, Comté), seafood (lobster, crab), roasted chicken, Thai cuisine, and light pasta dishes. The dry finish and carbonation cleanse the palate beautifully.',
      it: 'Si abbina eccellentemente con formaggi semi-morbidi (Gruyère, Comté), frutti di mare (aragosta, granchio), pollo arrosto, cucina thailandese e piatti di pasta leggeri. Il finale secco e la carbonazione puliscono magnificamente il palato.',
      vi: 'Kết hợp tuyệt vời với phô mai bán mềm (Gruyère, Comté), hải sản (tôm hùm, cua), gà nướng, ẩm thực Thái và món pasta nhẹ. Kết thúc khô và độ sủi bọt làm sạch khẩu vị tuyệt đẹp.',
    },
    cheese_pairings: ['Gruyère', 'Comté', 'Aged Gouda', 'Brie'],
    cuisine_pairings: ['Belgian', 'Thai', 'Seafood', 'French'],
  },

  season_tags: ['all_year', 'summer', 'spring'],
  occasion_tags: ['celebration', 'dinner', 'tasting', 'special-occasion'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,

  available_formats: ['bottle', 'draft'],
  available_sizes: [330, 750],
  related_beers: ['westmalle-dubbel', 'chimay-white', 'la-trappe-tripel'],
  availability: 'year_round',

  price_tier: 'premium',
  popularity: 91,

  source: {
    primary: 'https://www.trappistwestmalle.be',
    note: 'Westmalle Abbey official website and International Trappist Association',
  },

  version: 1,
};
