import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const westvleteren12: Beer = {
  id: uuidv4(),
  slug: 'westvleteren-12',
  stable_key: 'westvleteren-12-trappist',
  name: {
    en: 'Westvleteren 12',
    it: 'Westvleteren 12',
    vi: 'Westvleteren 12',
  },

  status: 'trappist',
  style_category: 'belgian',
  style: 'belgian_strong_dark',
  tags: ['trappist', 'authentic', 'abbey', 'quadrupel', 'rare', 'cellar-worthy', 'world-class'],

  origin: {
    country: 'Belgium',
    country_code: 'BE',
    region: 'West Flanders',
    city: 'Westvleteren',
    brewery: {
      en: 'Saint Sixtus Abbey',
      it: 'Abbazia di San Sisto',
      vi: 'Tu viện Saint Sixtus',
    },
    brewery_founded: 1838,
    brewery_type: 'trappist',
    is_trappist: true,
  },

  history: {
    first_brewed: '1940s',
    story: {
      en: 'Westvleteren 12 is brewed by Trappist monks at Saint Sixtus Abbey since the 1940s. Often rated as the best beer in the world, it remains extremely limited in production as the monks brew only what they need to sustain the monastery. The beer can only be purchased by reservation at the abbey gate or at the In de Vrede café across the street. The monks reject commercial distribution to maintain their contemplative lifestyle.',
      it: 'Westvleteren 12 è prodotta dai monaci trappisti presso l\'Abbazia di San Sisto dagli anni \'40. Spesso valutata come la migliore birra al mondo, rimane estremamente limitata nella produzione poiché i monaci producono solo ciò di cui hanno bisogno per sostenere il monastero. La birra può essere acquistata solo su prenotazione al cancello dell\'abbazia o al café In de Vrede dall\'altra parte della strada. I monaci rifiutano la distribuzione commerciale per mantenere il loro stile di vita contemplativo.',
      vi: 'Westvleteren 12 được sản xuất bởi các tu sĩ Trappist tại Tu viện Saint Sixtus từ những năm 1940. Thường được đánh giá là bia ngon nhất thế giới, nó vẫn cực kỳ hạn chế về sản lượng vì các tu sĩ chỉ sản xuất những gì họ cần để duy trì tu viện. Bia chỉ có thể được mua bằng cách đặt trước tại cổng tu viện hoặc tại quán cà phê In de Vrede ở bên kia đường. Các tu sĩ từ chối phân phối thương mại để duy trì lối sống chiêm niệm.',
    },
    awards: ['RateBeer Best Beer in the World (multiple years)', 'International Trappist Association certified'],
    significance: {
      en: 'Consistently ranked among the world\'s best beers, representing the pinnacle of Trappist brewing tradition',
      it: 'Costantemente classificata tra le migliori birre al mondo, rappresenta l\'apice della tradizione birraria trappista',
      vi: 'Liên tục được xếp hạng trong số những loại bia tốt nhất thế giới, đại diện cho đỉnh cao của truyền thống sản xuất bia Trappist',
    },
  },

  description: {
    en: 'The legendary Westvleteren 12, often called the best beer in the world. This extraordinarily complex quadrupel showcases dark fruit, chocolate, and spice notes with perfect balance. Extremely limited availability makes it one of the most sought-after beers globally.',
    it: 'La leggendaria Westvleteren 12, spesso chiamata la migliore birra al mondo. Questa quadrupel straordinariamente complessa presenta note di frutta scura, cioccolato e spezie con equilibrio perfetto. La disponibilità estremamente limitata la rende una delle birre più ricercate al mondo.',
    vi: 'Westvleteren 12 huyền thoại, thường được gọi là bia ngon nhất thế giới. Quadrupel phức tạp phi thường này thể hiện hương trái cây sẫm, chocolate và gia vị với sự cân bằng hoàn hảo. Sự khan hiếm cực kỳ làm cho nó trở thành một trong những loại bia được săn đón nhất toàn cầu.',
  },

  tagline: {
    en: 'The Best Beer in the World',
    it: 'La Migliore Birra al Mondo',
    vi: 'Bia Ngon Nhất Thế Giới',
  },

  characteristics: {
    abv: 10.2,
    ibu: 38,
    srm: 32,
    color: 'dark_brown',
    clarity: 'slightly_hazy',
    carbonation: 'medium',
    body: 'full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['complex', 'fruity', 'rich', 'malty', 'spicy', 'warming', 'smooth'],
    description: {
      en: 'Extraordinarily complex and balanced. Rich dark fruit (plum, fig, raisin, dark cherry), dark chocolate, toffee, and subtle coffee notes. Belgian yeast brings clove and pepper spice. Despite high ABV, remarkably smooth with no alcohol burn. The finish is long, warming, and perfectly balanced between sweet and bitter.',
      it: 'Straordinariamente complessa ed equilibrata. Ricca frutta scura (prugna, fico, uvetta, ciliegia scura), cioccolato fondente, caramello e sottili note di caffè. Il lievito belga porta spezie di chiodi di garofano e pepe. Nonostante l\'alto ABV, straordinariamente morbida senza bruciore alcolico. Il finale è lungo, caldo e perfettamente bilanciato tra dolce e amaro.',
      vi: 'Cực kỳ phức tạp và cân bằng. Trái cây sẫm phong phú (mận, sung, nho khô, anh đào sẫm), chocolate đen, toffee và hương cà phê tinh tế. Men Bỉ mang lại vị cay đinh hương và tiêu. Mặc dù ABV cao, mượt mà đáng kinh ngạc không có cảm giác cồn nóng. Kết thúc dài, ấm và cân bằng hoàn hảo giữa ngọt và đắng.',
    },
    aroma: {
      en: 'Rich dark fruits, chocolate, caramel, subtle roast, Belgian yeast spice, and warming alcohol',
      it: 'Ricca frutta scura, cioccolato, caramello, tostatura sottile, spezie del lievito belga e alcol riscaldante',
      vi: 'Trái cây sẫm phong phú, chocolate, caramel, rang tinh tế, gia vị men Bỉ và cồn ấm',
    },
    first_impression: {
      en: 'Luxurious dark fruit richness with chocolate complexity',
      it: 'Lussuosa ricchezza di frutta scura con complessità di cioccolato',
      vi: 'Sự phong phú sang trọng của trái cây sẫm với độ phức tạp của chocolate',
    },
    finish: {
      en: 'Exceptionally long and warming with perfect balance of sweet fruit, chocolate, and gentle bitterness',
      it: 'Eccezionalmente lungo e caldo con perfetto equilibrio di frutta dolce, cioccolato e delicata amarezza',
      vi: 'Kết thúc dài đặc biệt và ấm với sự cân bằng hoàn hảo của trái cây ngọt, chocolate và đắng nhẹ',
    },
    balance: {
      en: 'Perfect harmony between malt sweetness, dark fruit, and subtle hop bitterness',
      it: 'Perfetta armonia tra dolcezza del malto, frutta scura e sottile amarezza del luppolo',
      vi: 'Sự hài hòa hoàn hảo giữa vị ngọt malt, trái cây sẫm và đắng hoa bia tinh tế',
    },
    bitterness_level: 2,
    sweetness_level: 4,
  },

  ingredients: {
    malts: ['Pale malt', 'Munich malt', 'Caramel malt'],
    hops: ['Styrian Goldings', 'Hallertau'],
    yeast: 'Westvleteren house yeast',
    special_ingredients: ['Belgian candi sugar'],
  },

  serving: {
    glass: 'goblet',
    temperature: 'cellar',
    temperature_celsius: { min: 12, max: 14 },
    pouring_notes: {
      en: 'Pour carefully into a goblet or chalice. Leave sediment in bottle unless desired. Allow to warm slightly to release full complexity. Swirl gently to enhance aromatics.',
      it: 'Versare con cura in un calice. Lasciare il sedimento nella bottiglia a meno che non sia desiderato. Lasciare scaldare leggermente per rilasciare la piena complessità. Ruotare delicatamente per esaltare gli aromi.',
      vi: 'Rót cẩn thận vào ly goblet hoặc chalice. Để lại cặn trong chai trừ khi mong muốn. Để ấm một chút để giải phóng độ phức tạp đầy đủ. Xoay nhẹ để tăng hương thơm.',
    },
    ideal_head: '2 fingers',
    head_retention: true,
  },

  pairing: {
    food_categories: ['cheese', 'game', 'rich-dishes', 'desserts'],
    food_pairings: {
      en: 'Pairs beautifully with strong aged cheeses (Stilton, aged Gouda), game meats, wild boar, venison, beef bourguignon, and dark chocolate desserts. Also excellent with Belgian chocolate truffles.',
      it: 'Si abbina magnificamente con formaggi stagionati forti (Stilton, Gouda stagionato), selvaggina, cinghiale, cervo, manzo alla borgognona e dessert al cioccolato fondente. Eccellente anche con tartufi di cioccolato belga.',
      vi: 'Kết hợp tuyệt vời với phô mai già mạnh (Stilton, Gouda già), thịt thú rừng, lợn rừng, nai, thịt bò bourguignon và món tráng miệng chocolate đen. Cũng tuyệt vời với chocolate truffles Bỉ.',
    },
    cheese_pairings: ['Stilton', 'Aged Gouda', 'Roquefort', 'Chimay'],
    cuisine_pairings: ['Belgian', 'French', 'Game dishes'],
  },

  season_tags: ['autumn', 'winter', 'christmas'],
  occasion_tags: ['celebration', 'special-occasion', 'tasting', 'contemplation'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: false,

  available_formats: ['bottle'],
  available_sizes: [330],
  related_beers: ['westvleteren-8', 'westvleteren-blonde', 'chimay-blue'],
  availability: 'limited',

  price_tier: 'ultra_premium',
  popularity: 95,

  source: {
    primary: 'https://www.sintsixtus.be',
    note: 'Saint Sixtus Abbey official website and International Trappist Association',
  },

  version: 1,
};
