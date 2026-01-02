import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const orval: Beer = {
  id: uuidv4(),
  slug: 'orval',
  stable_key: 'orval-trappist',
  name: {
    en: 'Orval',
    it: 'Orval',
    vi: 'Orval',
  },

  status: 'trappist',
  style_category: 'belgian',
  style: 'belgian_pale_ale',
  tags: ['trappist', 'authentic', 'abbey', 'brett', 'dry-hopped', 'unique', 'cellar-worthy'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    region: 'Luxembourg Province',
    city: 'Villers-devant-Orval',
    brewery: {
      en: 'Abbaye Notre-Dame d\'Orval',
      it: 'Abbazia di Notre-Dame d\'Orval',
      vi: 'Tu viện Notre-Dame d\'Orval',
    },
    brewery_founded: 1931,
    brewery_type: 'trappist',
    is_trappist: true,
  },

  history: {
    first_brewed: '1931',
    story: {
      en: 'Orval is unique among Trappist beers for its use of Brettanomyces yeast and dry-hopping, giving it a distinctive earthy, funky character. The beer is named after a legend of Countess Matilda who lost her wedding ring in a spring; when a trout returned it to her, she exclaimed "Truly, this is a golden valley!" (Val d\'Or). The iconic bottle shape and the trout logo reflect this legend. Orval monks brew only one beer, believing in doing one thing perfectly.',
      it: 'Orval è unica tra le birre trappiste per l\'uso del lievito Brettanomyces e dry-hopping, che le conferisce un carattere distintivo terroso e funky. La birra prende il nome da una leggenda della contessa Matilde che perse il suo anello nuziale in una sorgente; quando una trota glielo restituì, esclamò "Veramente, questa è una valle d\'oro!" (Val d\'Or). La forma iconica della bottiglia e il logo della trota riflettono questa leggenda. I monaci di Orval producono solo una birra, credendo nel fare una cosa alla perfezione.',
      vi: 'Orval là độc nhất trong các loại bia Trappist vì sử dụng men Brettanomyces và dry-hopping, mang lại đặc tính đất và funky riêng biệt. Bia được đặt tên theo truyền thuyết về Nữ bá tước Matilda đánh mất nhẫn cưới trong suối nước; khi một con cá hồi trả lại cho bà, bà thốt lên "Thật sự, đây là một thung lũng vàng!" (Val d\'Or). Hình dạng chai biểu tượng và logo cá hồi phản ánh truyền thuyết này. Các tu sĩ Orval chỉ sản xuất một loại bia, tin vào việc làm một điều hoàn hảo.',
    },
    awards: ['World Beer Awards Gold', 'International Trappist Association certified'],
    significance: {
      en: 'The only Trappist beer that uses Brettanomyces and dry-hopping, creating a unique flavor profile unlike any other Belgian beer',
      it: 'L\'unica birra trappista che utilizza Brettanomyces e dry-hopping, creando un profilo aromatico unico diverso da qualsiasi altra birra belga',
      vi: 'Loại bia Trappist duy nhất sử dụng Brettanomyces và dry-hopping, tạo ra hồ sơ hương vị độc nhất không giống bất kỳ bia Bỉ nào khác',
    },
  },

  description: {
    en: 'The most unique Trappist beer, featuring Brettanomyces wild yeast and dry-hopping. Distinctively earthy, funky, and complex with citrus, leather, and hay notes. Evolves beautifully over time, developing more Brett character with age.',
    it: 'La birra trappista più unica, caratterizzata da lievito selvatico Brettanomyces e dry-hopping. Distintamente terrosa, funky e complessa con note di agrumi, cuoio e fieno. Evolve magnificamente nel tempo, sviluppando più carattere Brett con l\'età.',
    vi: 'Bia Trappist độc nhất, có men hoang dã Brettanomyces và dry-hopping. Đặc trưng đất, funky và phức tạp với hương cam quýt, da và cỏ khô. Phát triển đẹp theo thời gian, phát triển thêm đặc tính Brett theo tuổi.',
  },

  tagline: {
    en: 'Truly This Is A Golden Valley',
    it: 'Veramente Questa È Una Valle d\'Oro',
    vi: 'Thật Sự Đây Là Thung Lũng Vàng',
  },

  characteristics: {
    abv: 6.2,
    ibu: 38,
    srm: 8,
    color: 'amber',
    clarity: 'hazy',
    carbonation: 'high',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['earthy', 'funky', 'hoppy', 'dry', 'complex', 'tart', 'herbal'],
    description: {
      en: 'Unique and complex. Earthy Brett funk with notes of leather, hay, and barnyard. Citrus and herbal hop character from dry-hopping. Light fruity esters (pear, citrus) from Belgian yeast. Very dry, crisp finish with moderate bitterness. The Brett character develops more with age, adding complexity.',
      it: 'Unica e complessa. Funk terroso di Brett con note di cuoio, fieno e stalla. Carattere luppolato agrumato ed erbaceo dal dry-hopping. Leggeri esteri fruttati (pera, agrumi) dal lievito belga. Finale molto secco e fresco con amarezza moderata. Il carattere Brett si sviluppa di più con l\'età, aggiungendo complessità.',
      vi: 'Độc nhất và phức tạp. Funk đất của Brett với hương da, cỏ khô và chuồng trại. Đặc tính hoa bia cam quýt và thảo mộc từ dry-hopping. Ester trái cây nhẹ (lê, cam quýt) từ men Bỉ. Kết thúc rất khô, giòn với đắng vừa phải. Đặc tính Brett phát triển nhiều hơn theo tuổi, thêm độ phức tạp.',
    },
    aroma: {
      en: 'Brett funk (leather, hay), citrus hops, herbal notes, light fruity esters, earthy complexity',
      it: 'Funk di Brett (cuoio, fieno), luppolo agrumato, note erbacee, leggeri esteri fruttati, complessità terrosa',
      vi: 'Funk Brett (da, cỏ khô), hoa bia cam quýt, hương thảo mộc, ester trái cây nhẹ, độ phức tạp đất',
    },
    first_impression: {
      en: 'Earthy Brett character balanced with bright hop aromatics',
      it: 'Carattere terroso di Brett bilanciato con brillanti aromi di luppolo',
      vi: 'Đặc tính Brett đất cân bằng với hương hoa bia tươi sáng',
    },
    finish: {
      en: 'Very dry and crisp with lingering hop bitterness and earthy Brett notes',
      it: 'Molto secco e fresco con persistente amarezza del luppolo e note terrose di Brett',
      vi: 'Rất khô và giòn với đắng hoa bia kéo dài và hương Brett đất',
    },
    balance: {
      en: 'Unique balance between funky Brett character, hop bitterness, and Belgian yeast esters',
      it: 'Equilibrio unico tra carattere funky di Brett, amarezza del luppolo ed esteri del lievito belga',
      vi: 'Cân bằng độc nhất giữa đặc tính funky Brett, đắng hoa bia và ester men Bỉ',
    },
    bitterness_level: 3,
    sweetness_level: 1,
  },

  ingredients: {
    malts: ['Pale malt', 'Caramel malt'],
    hops: ['Hallertau', 'Styrian Goldings'],
    yeast: 'Orval house yeast + Brettanomyces',
    special_ingredients: ['Brettanomyces wild yeast', 'Dry hops'],
  },

  serving: {
    glass: 'goblet',
    temperature: 'cellar',
    temperature_celsius: { min: 10, max: 12 },
    pouring_notes: {
      en: 'Pour into the unique Orval chalice. Young Orval (fresh) is hoppy and bright; aged Orval (6+ months) develops more Brett funk. Both are delicious in different ways.',
      it: 'Versare nell\'unico calice Orval. Orval giovane (fresca) è luppolata e brillante; Orval invecchiata (6+ mesi) sviluppa più funk di Brett. Entrambe sono deliziose in modi diversi.',
      vi: 'Rót vào ly Orval độc nhất. Orval trẻ (tươi) có hoa bia và tươi sáng; Orval già (6+ tháng) phát triển thêm funk Brett. Cả hai đều ngon theo cách khác nhau.',
    },
    ideal_head: '2 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['cheese', 'charcuterie', 'seafood', 'salads'],
    food_pairings: {
      en: 'Pairs wonderfully with strong cheeses (especially Orval cheese made at the abbey), charcuterie, oysters, grilled fish, and fresh salads. The dry, hoppy character cuts through rich foods beautifully.',
      it: 'Si abbina meravigliosamente con formaggi forti (specialmente il formaggio Orval prodotto all\'abbazia), salumi, ostriche, pesce alla griglia e insalate fresche. Il carattere secco e luppolato taglia magnificamente i cibi ricchi.',
      vi: 'Kết hợp tuyệt vời với phô mai đậm (đặc biệt là phô mai Orval sản xuất tại tu viện), charcuterie, hàu, cá nướng và salad tươi. Đặc tính khô, hoa bia cắt qua thực phẩm đậm đà một cách tuyệt đẹp.',
    },
    cheese_pairings: ['Orval cheese', 'Gruyère', 'Comté', 'Aged Cheddar'],
    cuisine_pairings: ['Belgian', 'French', 'Seafood'],
  },

  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['dinner', 'tasting', 'pairing', 'contemplation'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,

  available_formats: ['bottle', 'draft'],
  available_sizes: [330],
  related_beers: ['chimay-blue', 'westmalle-tripel'],
  availability: 'year_round',

  price_tier: 'premium',
  popularity: 88,

  source: {
    primary: 'https://www.orval.be',
    note: 'Orval Abbey official website and International Trappist Association',
  },

  version: 1,
};
