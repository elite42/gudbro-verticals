import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const chimayBlue: Beer = {
  id: uuidv4(),
  slug: 'chimay-blue',
  stable_key: 'chimay-blue-trappist',
  name: {
    en: 'Chimay Blue (Grande Réserve)',
    it: 'Chimay Blu (Grande Réserve)',
    vi: 'Chimay Xanh (Grande Réserve)',
  },

  status: 'trappist',
  style_category: 'belgian',
  style: 'belgian_strong_dark',
  tags: ['trappist', 'authentic', 'abbey', 'strong', 'christmas', 'cellar-worthy', 'complex'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    region: 'Wallonia',
    city: 'Chimay',
    brewery: {
      en: 'Abbaye Notre-Dame de Scourmont',
      it: 'Abbazia di Notre-Dame de Scourmont',
      vi: 'Tu viện Notre-Dame de Scourmont',
    },
    brewery_founded: 1862,
    brewery_type: 'trappist',
    is_trappist: true,
  },

  history: {
    first_brewed: '1948',
    story: {
      en: 'Chimay Blue was first brewed in 1948 as a Christmas beer at the Scourmont Abbey. The Trappist monks have been brewing beer since 1862 to fund their monastery\'s charitable activities. Father Théodore isolated the unique Chimay yeast strain in 1948, which gives all Chimay beers their distinctive character. It\'s one of only 14 authentic Trappist breweries worldwide.',
      it: 'Chimay Blu fu prodotta per la prima volta nel 1948 come birra di Natale all\'Abbazia di Scourmont. I monaci trappisti producono birra dal 1862 per finanziare le attività caritative del monastero. Padre Théodore isolò il ceppo di lievito unico Chimay nel 1948, che conferisce a tutte le birre Chimay il loro carattere distintivo. È uno dei soli 14 birrifici trappisti autentici al mondo.',
      vi: 'Chimay Blue được sản xuất lần đầu năm 1948 như bia Giáng sinh tại Tu viện Scourmont. Các tu sĩ Trappist đã sản xuất bia từ năm 1862 để tài trợ cho các hoạt động từ thiện của tu viện. Cha Théodore đã phân lập chủng nấm men Chimay độc đáo năm 1948, tạo cho tất cả bia Chimay đặc tính riêng biệt. Đây là một trong 14 nhà máy bia Trappist đích thực trên toàn thế giới.',
    },
    awards: ['World Beer Awards Gold', 'International Trappist Association certified'],
    significance: {
      en: 'One of the most respected Trappist beers in the world, often considered the benchmark for Belgian strong dark ales',
      it: 'Una delle birre trappiste più rispettate al mondo, spesso considerata il punto di riferimento per le strong dark ale belghe',
      vi: 'Một trong những loại bia Trappist được tôn trọng nhất thế giới, thường được coi là chuẩn mực cho ale đen mạnh của Bỉ',
    },
  },

  description: {
    en: 'A legendary Belgian Trappist quadrupel brewed by monks since 1948. Rich, complex, and full-bodied with notes of dark fruit, caramel, and spice. Ages beautifully for up to 5 years, developing even more complexity.',
    it: 'Una leggendaria quadrupel trappista belga prodotta dai monaci dal 1948. Ricca, complessa e corposa con note di frutta scura, caramello e spezie. Invecchia magnificamente fino a 5 anni, sviluppando ancora più complessità.',
    vi: 'Một quadrupel Trappist Bỉ huyền thoại được các tu sĩ sản xuất từ năm 1948. Phong phú, phức tạp và đậm đà với hương trái cây sẫm, caramel và gia vị. Ủ đẹp đến 5 năm, phát triển thêm độ phức tạp.',
  },

  tagline: {
    en: 'Grande Réserve - The Blue Cap',
    it: 'Grande Réserve - Il Tappo Blu',
    vi: 'Grande Réserve - Nắp Xanh',
  },

  characteristics: {
    abv: 9.0,
    ibu: 35,
    srm: 30,
    color: 'dark_brown',
    clarity: 'slightly_hazy',
    carbonation: 'medium',
    body: 'full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['complex', 'fruity', 'spicy', 'caramel', 'warming', 'rich', 'malty'],
    description: {
      en: 'Rich and complex with dark fruit flavors (plum, raisin, fig), caramel sweetness, subtle chocolate notes, and Belgian yeast spiciness (clove, pepper). The finish is warming with lingering dark fruit and subtle bitterness.',
      it: 'Ricca e complessa con sapori di frutta scura (prugna, uvetta, fico), dolcezza di caramello, sottili note di cioccolato e speziatura del lievito belga (chiodi di garofano, pepe). Il finale è caldo con persistente frutta scura e sottile amarezza.',
      vi: 'Phong phú và phức tạp với hương trái cây sẫm (mận, nho khô, sung), ngọt caramel, hương chocolate tinh tế và vị cay của men Bỉ (đinh hương, tiêu). Kết thúc ấm áp với trái cây sẫm kéo dài và đắng tinh tế.',
    },
    aroma: {
      en: 'Dark fruits, caramel, Belgian yeast esters, subtle chocolate, and warming alcohol',
      it: 'Frutta scura, caramello, esteri del lievito belga, sottile cioccolato e alcol riscaldante',
      vi: 'Trái cây sẫm, caramel, ester men Bỉ, chocolate tinh tế và cồn ấm',
    },
    first_impression: {
      en: 'Rich dark fruit sweetness balanced by spicy yeast character',
      it: 'Ricca dolcezza di frutta scura bilanciata dal carattere speziato del lievito',
      vi: 'Vị ngọt trái cây sẫm phong phú cân bằng bởi đặc tính cay của men',
    },
    finish: {
      en: 'Long, warming finish with lingering fruit, caramel, and gentle bitterness',
      it: 'Finale lungo e caldo con frutta persistente, caramello e delicata amarezza',
      vi: 'Kết thúc dài, ấm với trái cây kéo dài, caramel và đắng nhẹ',
    },
    balance: {
      en: 'Masterfully balanced between sweetness, alcohol warmth, and subtle bitterness',
      it: 'Magistralmente equilibrata tra dolcezza, calore alcolico e sottile amarezza',
      vi: 'Cân bằng bậc thầy giữa vị ngọt, độ ấm cồn và đắng tinh tế',
    },
    bitterness_level: 2,
    sweetness_level: 4,
  },

  ingredients: {
    malts: ['Pilsner malt', 'Caramel malt', 'Munich malt'],
    hops: ['German hops', 'American hops'],
    yeast: 'Chimay house yeast (isolated 1948)',
    special_ingredients: ['Belgian candi sugar'],
  },

  serving: {
    glass: 'goblet',
    temperature: 'cellar',
    temperature_celsius: { min: 10, max: 14 },
    pouring_notes: {
      en: 'Pour slowly into a chalice, leaving yeast sediment in bottle. Allow to warm slightly for full flavor expression.',
      it: 'Versare lentamente in un calice, lasciando il sedimento di lievito nella bottiglia. Lasciare scaldare leggermente per la piena espressione dei sapori.',
      vi: 'Rót chậm vào ly chalice, để lại cặn men trong chai. Để ấm một chút để hương vị thể hiện đầy đủ.',
    },
    ideal_head: '2-3 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['cheese', 'game', 'rich-dishes', 'desserts'],
    food_pairings: {
      en: 'Exceptional with strong cheeses (Roquefort, aged Gouda), game meats, beef stew, dark chocolate desserts, and dried fruit. The classic pairing with Chimay cheese (made at the abbey).',
      it: 'Eccezionale con formaggi forti (Roquefort, Gouda stagionato), selvaggina, stufato di manzo, dessert al cioccolato fondente e frutta secca. L\'abbinamento classico con formaggio Chimay (prodotto all\'abbazia).',
      vi: 'Tuyệt vời với phô mai đậm (Roquefort, Gouda già), thịt thú rừng, thịt bò hầm, món tráng miệng chocolate đen và trái cây khô. Kết hợp cổ điển với phô mai Chimay (sản xuất tại tu viện).',
    },
    cheese_pairings: ['Chimay cheese', 'Roquefort', 'Aged Gouda', 'Stilton'],
    cuisine_pairings: ['Belgian', 'French', 'Game dishes'],
  },

  season_tags: ['autumn', 'winter', 'christmas'],
  occasion_tags: ['celebration', 'dinner', 'tasting', 'holiday'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,  // May use animal-derived finings

  available_formats: ['bottle'],
  available_sizes: [330, 750, 1500],
  related_beers: ['chimay-red', 'chimay-white', 'chimay-gold'],
  availability: 'year_round',

  price_tier: 'premium',
  popularity: 90,

  source: {
    primary: 'https://www.chimay.com',
    note: 'Official Chimay website and International Trappist Association',
  },

  version: 1,
};
