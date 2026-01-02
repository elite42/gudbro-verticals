import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const bitburgerPremiumPils: Beer = {
  id: uuidv4(),
  slug: 'bitburger-premium-pils',
  stable_key: 'bitburger-premium-pils',
  name: {
    en: 'Bitburger Premium Pils',
    it: 'Bitburger Premium Pils',
    vi: 'Bitburger Premium Pils',
  },

  status: 'international_classic',
  style_category: 'lager',
  style: 'pilsner',
  tags: ['german', 'pilsner', 'lager', 'crisp', 'hoppy', 'traditional', 'premium'],

  origin: {
    country: 'Germany',
    country_code: 'DE',
    region: 'Rhineland-Palatinate',
    city: 'Bitburg',
    brewery: {
      en: 'Bitburger Brauerei',
      it: 'Birrificio Bitburger',
      vi: 'Nhà máy bia Bitburger',
    },
    brewery_founded: 1817,
    brewery_type: 'regional',
  },

  history: {
    first_brewed: '1817',
    story: {
      en: 'Bitburger Brewery was founded in 1817 by Johann Peter Wallenborn in the small Eifel town of Bitburg. The brewery began brewing pilsner in 1883, adopting the new bottom-fermented style that originated in Pilsen. Bitburger pioneered the German Pilsner style, which is hoppier and drier than Czech Pilsner. Their famous slogan "Bitte ein Bit" (A Bit, please) became one of Germany\'s most successful advertising campaigns. The brewery has remained family-owned for seven generations. Today, Bitburger is one of Germany\'s largest and most exported beers, representing the pinnacle of German Pilsner brewing with its distinctively crisp, hoppy character.',
      it: 'Il birrificio Bitburger fu fondato nel 1817 da Johann Peter Wallenborn nella piccola città dell\'Eifel di Bitburgo. Il birrificio iniziò a produrre pilsner nel 1883, adottando il nuovo stile a bassa fermentazione originato a Pilsen. Bitburger ha aperto la strada allo stile German Pilsner, che è più luppolato e secco della Pilsner ceca. Il loro famoso slogan "Bitte ein Bit" (Un Bit, per favore) divenne una delle campagne pubblicitarie di maggior successo della Germania. Il birrificio è rimasto di proprietà familiare per sette generazioni. Oggi, Bitburger è una delle birre tedesche più grandi e più esportate, rappresentando l\'apice della produzione di Pilsner tedesca con il suo carattere distintamente croccante e luppolato.',
      vi: 'Nhà máy bia Bitburger được thành lập năm 1817 bởi Johann Peter Wallenborn ở thị trấn Eifel nhỏ Bitburg. Nhà máy bia bắt đầu sản xuất pilsner năm 1883, áp dụng phong cách lên men đáy mới có nguồn gốc từ Pilsen. Bitburger tiên phong phong cách German Pilsner, có nhiều hoa bia và khô hơn Czech Pilsner. Khẩu hiệu nổi tiếng của họ "Bitte ein Bit" (Một Bit, xin vui lòng) trở thành một trong những chiến dịch quảng cáo thành công nhất của Đức. Nhà máy bia vẫn thuộc sở hữu gia đình trong bảy thế hệ. Ngày nay, Bitburger là một trong những loại bia lớn nhất và được xuất khẩu nhiều nhất của Đức, đại diện cho đỉnh cao của sản xuất Pilsner Đức với đặc tính sắc, nhiều hoa bia đặc biệt.',
    },
    named_after: {
      en: 'Named after the town of Bitburg where the brewery was founded',
      it: 'Prende il nome dalla città di Bitburgo dove fu fondato il birrificio',
      vi: 'Được đặt theo tên thị trấn Bitburg nơi nhà máy bia được thành lập',
    },
  },

  description: {
    en: 'Germany\'s definitive premium pilsner. Crystal-clear pale golden lager with pronounced noble hop aroma, crisp bitterness, and clean, dry finish. Bitburger exemplifies the German Pilsner style with its perfect balance of hop character and drinkability.',
    it: 'La pilsner premium definitiva della Germania. Lager dorata pallida cristallina con pronunciato aroma di luppolo nobile, amarezza croccante e finale pulito e secco. Bitburger esemplifica lo stile German Pilsner con il suo perfetto equilibrio tra carattere di luppolo e bevibilità.',
    vi: 'Pilsner cao cấp tiêu chuẩn của Đức. Lager vàng nhạt trong suốt với hương hoa bia quý tộc rõ rệt, độ đắng sắc và kết thúc sạch, khô. Bitburger là tấm gương của phong cách German Pilsner với sự cân bằng hoàn hảo giữa đặc tính hoa bia và khả năng uống.',
  },

  tagline: {
    en: 'Bitte ein Bit - Germany\'s Premium Pilsner',
    it: 'Bitte ein Bit - La Pilsner Premium della Germania',
    vi: 'Bitte ein Bit - Pilsner Cao Cấp Của Đức',
  },

  characteristics: {
    abv: 4.8,
    ibu: 37,
    srm: 3,
    color: 'pale_gold',
    clarity: 'clear',
    carbonation: 'high',
    body: 'light',
    fermentation: 'bottom_fermented',
  },

  taste: {
    profile: ['hoppy', 'crisp', 'clean', 'bitter', 'dry', 'refreshing', 'balanced'],
    description: {
      en: 'Pronounced noble hop bitterness with herbal, floral, and spicy notes. Clean pilsner malt backbone provides subtle sweetness that balances the assertive hop character. High carbonation and dry finish create exceptional refreshment. Crisp, clean lager fermentation with no fruity esters.',
      it: 'Pronunciata amarezza di luppolo nobile con note erbacee, floreali e speziate. Pulita base di malto pilsner fornisce sottile dolcezza che bilancia l\'assertivo carattere di luppolo. Alta carbonazione e finale secco creano eccezionale rinfrescamento. Fermentazione lager croccante e pulita senza esteri fruttati.',
      vi: 'Độ đắng hoa bia quý tộc rõ rệt với hương thảo mộc, hoa và gia vị. Nền malt pilsner sạch cung cấp vị ngọt tinh tế cân bằng đặc tính hoa bia quyết đoán. Carbonation cao và kết thúc khô tạo sự sảng khoái đặc biệt. Lên men lager sắc, sạch không có este trái cây.',
    },
    aroma: {
      en: 'Noble hops with floral, herbal, and spicy notes, light pilsner malt',
      it: 'Luppolo nobile con note floreali, erbacee e speziate, leggero malto pilsner',
      vi: 'Hoa bia quý tộc với hương hoa, thảo mộc và gia vị, malt pilsner nhẹ',
    },
    first_impression: {
      en: 'Crisp hop bitterness with clean malt character and lively carbonation',
      it: 'Amarezza croccante di luppolo con carattere maltato pulito e carbonazione vivace',
      vi: 'Độ đắng hoa bia sắc với đặc tính malt sạch và carbonation sống động',
    },
    finish: {
      en: 'Dry, crisp finish with lingering noble hop bitterness',
      it: 'Finale secco e croccante con persistente amarezza di luppolo nobile',
      vi: 'Kết thúc khô, sắc với độ đắng hoa bia quý tộc kéo dài',
    },
    bitterness_level: 4,
    sweetness_level: 2,
  },

  ingredients: {
    malts: ['Pilsner malt'],
    hops: ['Hallertauer', 'Tettnanger', 'Perle'],
    yeast: 'German Pilsner lager yeast',
  },

  serving: {
    glass: 'pilsner',
    temperature: 'cold',
    temperature_celsius: { min: 4, max: 6 },
    pouring_notes: {
      en: 'Serve in a traditional pilsner glass (tall, tapered). Pour down the center to create a dense 2-3 finger white head. The tall glass showcases clarity and carbonation.',
      it: 'Servire in un tradizionale bicchiere pilsner (alto, affusolato). Versare al centro per creare una densa schiuma bianca di 2-3 dita. Il bicchiere alto mette in mostra chiarezza e carbonazione.',
      vi: 'Phục vụ trong ly pilsner truyền thống (cao, hình côn). Rót xuống giữa để tạo lớp bọt trắng dày 2-3 ngón. Ly cao làm nổi bật độ trong và carbonation.',
    },
    ideal_head: '2-3 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['german-food', 'fried-food', 'seafood', 'spicy-food'],
    food_pairings: {
      en: 'Excellent with fried foods, fish and chips, schnitzel, grilled sausages, spicy dishes, salads, and shellfish. The crisp bitterness cuts through rich, fatty foods perfectly.',
      it: 'Eccellente con cibi fritti, fish and chips, schnitzel, salsicce grigliate, piatti piccanti, insalate e crostacei. L\'amarezza croccante taglia perfettamente cibi ricchi e grassi.',
      vi: 'Tuyệt vời với đồ chiên, cá và khoai tây chiên, schnitzel, xúc xích nướng, món cay, salad và động vật có vỏ. Độ đắng sắc cắt qua thức ăn giàu chất béo hoàn hảo.',
    },
    cheese_pairings: ['Gouda', 'Emmental', 'Gruyère', 'Aged Cheddar'],
    cuisine_pairings: ['German', 'Fried Food', 'Asian', 'Seafood'],
  },

  season_tags: ['all_year', 'summer', 'spring'],
  occasion_tags: ['casual', 'dinner', 'party', 'sports', 'outdoor'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'draft', 'can'],
  available_sizes: [500, 330, 275],
  related_beers: ['augustiner-helles', 'spaten-oktoberfestbier'],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 87,

  source: {
    primary: 'https://www.bitburger.de',
    note: 'Official Bitburger brewery and German Pilsner tradition',
  },

  version: 1,
};
