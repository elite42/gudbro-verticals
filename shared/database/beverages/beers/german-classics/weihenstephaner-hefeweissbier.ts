import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const weihenstephanerHefeweissbier: Beer = {
  id: uuidv4(),
  slug: 'weihenstephaner-hefeweissbier',
  stable_key: 'weihenstephaner-hefeweissbier',
  name: {
    en: 'Weihenstephaner Hefeweissbier',
    it: 'Weihenstephaner Hefeweissbier',
    vi: 'Weihenstephaner Hefeweissbier',
  },

  status: 'international_classic',
  style_category: 'wheat',
  style: 'hefeweizen',
  tags: ['german', 'bavarian', 'wheat', 'unfiltered', 'banana', 'clove', 'oldest-brewery', 'traditional'],

  origin: {
    country: 'Germany',
    country_code: 'DE',
    region: 'Bavaria',
    city: 'Freising',
    brewery: {
      en: 'Weihenstephan Brewery',
      it: 'Birrificio Weihenstephan',
      vi: 'Nhà máy bia Weihenstephan',
    },
    brewery_founded: 1040,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1040',
    story: {
      en: 'Weihenstephan holds the title of the world\'s oldest continuously operating brewery, founded by Benedictine monks in 1040. Located on the historic Weihenstephan hill in Freising, Bavaria, the brewery has nearly 1,000 years of brewing expertise. The monastery received the official brewing license from the city of Freising in 1040. Today, it is owned by the Bavarian state and closely tied to the Technical University of Munich\'s brewing science program. Their Hefeweissbier is considered the gold standard for the style.',
      it: 'Weihenstephan detiene il titolo del birrificio più antico del mondo ancora in funzione, fondato dai monaci benedettini nel 1040. Situato sulla storica collina di Weihenstephan a Frisinga, Baviera, il birrificio vanta quasi 1.000 anni di esperienza nella produzione di birra. Il monastero ricevette la licenza ufficiale di produzione dalla città di Frisinga nel 1040. Oggi è di proprietà dello stato bavarese e strettamente legato al programma di scienze della birra dell\'Università Tecnica di Monaco. La loro Hefeweissbier è considerata il gold standard per questo stile.',
      vi: 'Weihenstephan giữ danh hiệu nhà máy bia lâu đời nhất thế giới vẫn đang hoạt động liên tục, được thành lập bởi các tu sĩ Benedictine năm 1040. Nằm trên đồi Weihenstephan lịch sử ở Freising, Bavaria, nhà máy bia có gần 1.000 năm chuyên môn sản xuất bia. Tu viện nhận giấy phép sản xuất bia chính thức từ thành phố Freising năm 1040. Ngày nay, nó thuộc sở hữu của bang Bavaria và gắn liền với chương trình khoa học sản xuất bia của Đại học Kỹ thuật Munich. Hefeweissbier của họ được coi là tiêu chuẩn vàng cho phong cách này.',
    },
    named_after: {
      en: 'Named after the Weihenstephan Abbey, where the brewery was founded',
      it: 'Prende il nome dall\'Abbazia di Weihenstephan, dove fu fondato il birrificio',
      vi: 'Được đặt theo tên Tu viện Weihenstephan, nơi nhà máy bia được thành lập',
    },
  },

  description: {
    en: 'The definitive Bavarian Hefeweizen from the world\'s oldest brewery. Features a perfect balance of banana and clove aromatics from traditional wheat beer yeast, cloudy golden appearance, and silky smooth texture. The benchmark by which all other wheat beers are measured.',
    it: 'La Hefeweizen bavarese definitiva dal birrificio più antico del mondo. Presenta un perfetto equilibrio di aromatici di banana e chiodi di garofano dal lievito tradizionale da birra di frumento, aspetto dorato torbido e texture setosa. Il punto di riferimento con cui tutte le altre birre di frumento vengono misurate.',
    vi: 'Hefeweizen Bavaria tiêu chuẩn từ nhà máy bia lâu đời nhất thế giới. Có sự cân bằng hoàn hảo của hương thơm chuối và đinh hương từ men bia lúa mì truyền thống, vẻ ngoài vàng đục và kết cấu mịn như lụa. Tiêu chuẩn để đo lường tất cả các loại bia lúa mì khác.',
  },

  tagline: {
    en: 'World\'s Oldest Brewery\'s Finest Wheat Beer',
    it: 'La Miglior Birra di Frumento dal Birrificio Più Antico del Mondo',
    vi: 'Bia Lúa Mì Tuyệt Nhất Từ Nhà Máy Bia Lâu Đời Nhất Thế Giới',
  },

  characteristics: {
    abv: 5.4,
    ibu: 14,
    srm: 7,
    color: 'gold',
    clarity: 'hazy',
    carbonation: 'high',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['banana', 'clove', 'creamy', 'refreshing', 'wheaty', 'fruity', 'spicy', 'balanced'],
    description: {
      en: 'Harmonious banana and clove esters from traditional Weihenstephan yeast strain, smooth wheat malt foundation, subtle citrus and vanilla notes, with a clean, refreshing finish. Impeccably balanced with low bitterness that showcases the yeast character.',
      it: 'Armonioso esteri di banana e chiodi di garofano dal tradizionale ceppo di lievito Weihenstephan, base di malto di frumento liscia, sottili note di agrumi e vaniglia, con un finale pulito e rinfrescante. Impeccabilmente bilanciato con bassa amarezza che mette in risalto il carattere del lievito.',
      vi: 'Este chuối và đinh hương hài hòa từ chủng men Weihenstephan truyền thống, nền malt lúa mì mượt mà, hương cam quýt và vani tinh tế, với kết thúc sạch, sảng khoái. Cân bằng hoàn hảo với độ đắng thấp làm nổi bật đặc tính men.',
    },
    aroma: {
      en: 'Prominent banana and clove, subtle vanilla, hints of citrus and bubblegum',
      it: 'Banana e chiodi di garofano prominenti, sottile vaniglia, accenni di agrumi e bubblegum',
      vi: 'Chuối và đinh hương nổi bật, vanilla tinh tế, gợi ý cam quýt và kẹo cao su',
    },
    first_impression: {
      en: 'Silky smooth wheat character with perfectly balanced banana-clove yeast expression',
      it: 'Carattere di frumento setosamente liscio con espressione di lievito banana-chiodi di garofano perfettamente bilanciata',
      vi: 'Đặc tính lúa mì mượt như lụa với biểu hiện men chuối-đinh hương cân bằng hoàn hảo',
    },
    finish: {
      en: 'Clean, refreshing finish with delicate wheat sweetness and lingering yeast character',
      it: 'Finale pulito e rinfrescante con delicata dolcezza di frumento e persistente carattere di lievito',
      vi: 'Kết thúc sạch, sảng khoái với vị ngọt lúa mì tinh tế và đặc tính men kéo dài',
    },
    bitterness_level: 1,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Wheat malt (60%)', 'Barley malt'],
    hops: ['Hallertauer Tradition', 'Perle'],
    yeast: 'Proprietary Weihenstephan Hefeweizen yeast strain',
  },

  serving: {
    glass: 'weizen',
    temperature: 'cold',
    temperature_celsius: { min: 6, max: 8 },
    pouring_notes: {
      en: 'Use a chilled Weizen glass. Pour slowly at 45-degree angle until 3/4 full. Gently swirl bottle to resuspend yeast sediment, then pour remainder to create a thick, creamy head.',
      it: 'Usa un bicchiere Weizen freddo. Versare lentamente a 45 gradi fino a 3/4. Agitare delicatamente la bottiglia per risospendere il sedimento di lievito, quindi versare il resto per creare una schiuma spessa e cremosa.',
      vi: 'Sử dụng ly Weizen ướp lạnh. Rót chậm nghiêng 45 độ cho đến 3/4 đầy. Xoay nhẹ chai để tái huyền phù trầm tích men, sau đó rót phần còn lại để tạo lớp bọt dày, kem.',
    },
    ideal_head: '3-4 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['german-food', 'seafood', 'salads', 'breakfast', 'light-dishes'],
    food_pairings: {
      en: 'Perfect with traditional Bavarian Weisswurst and sweet mustard. Excellent with grilled fish, shellfish, Caesar salad, eggs Benedict, fresh mozzarella, and fruit-based desserts.',
      it: 'Perfetto con tradizionale Weisswurst bavarese e senape dolce. Eccellente con pesce alla griglia, crostacei, insalata Caesar, uova alla Benedict, mozzarella fresca e dessert a base di frutta.',
      vi: 'Hoàn hảo với Weisswurst Bavaria truyền thống và mù tạt ngọt. Tuyệt vời với cá nướng, động vật có vỏ, salad Caesar, trứng Benedict, mozzarella tươi và món tráng miệng trái cây.',
    },
    cheese_pairings: ['Bavarian Obatzda', 'Fresh Mozzarella', 'Camembert', 'Brie'],
    cuisine_pairings: ['German', 'Bavarian', 'Seafood', 'Brunch'],
  },

  season_tags: ['all_year', 'summer', 'spring'],
  occasion_tags: ['brunch', 'casual', 'party', 'dinner', 'celebration'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft'],
  available_sizes: [500, 330],
  related_beers: ['paulaner-hefeweizen', 'erdinger-weissbier'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 92,

  source: {
    primary: 'https://www.weihenstephaner.de',
    note: 'Official Weihenstephan website and world\'s oldest brewery heritage',
  },

  version: 1,
};
