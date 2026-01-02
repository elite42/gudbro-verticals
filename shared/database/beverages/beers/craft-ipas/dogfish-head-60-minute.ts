import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const dogfishHead60Minute: Beer = {
  id: uuidv4(),
  slug: 'dogfish-head-60-minute',
  stable_key: 'dogfish-head-60-minute-craft-ipa',
  name: {
    en: 'Dogfish Head 60 Minute IPA',
    it: 'Dogfish Head 60 Minute IPA',
    vi: 'Dogfish Head 60 Minute IPA',
  },

  status: 'craft_classic',
  style_category: 'ale',
  style: 'ipa',
  tags: ['craft', 'delaware', 'east-coast', 'continually-hopped', 'innovative'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Milton, Delaware',
    brewery: {
      en: 'Dogfish Head Craft Brewery',
      it: 'Birrificio Dogfish Head',
      vi: 'Nhà máy bia Thủ công Dogfish Head',
    },
    brewery_founded: 1995,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '2003',
    story: {
      en: 'Dogfish Head 60 Minute IPA pioneered the concept of "continual hopping" where hops are added continuously throughout the 60-minute boil rather than in traditional intervals. Founder Sam Calagione used a vibrating football game to mechanically add hops, creating a smoother, less harsh bitterness. This innovative approach helped define East Coast IPAs.',
      it: 'Dogfish Head 60 Minute IPA ha introdotto il concetto di "continual hopping" dove il luppolo viene aggiunto continuamente durante i 60 minuti di ebollizione piuttosto che a intervalli tradizionali. Il fondatore Sam Calagione ha utilizzato un gioco di calcio vibrante per aggiungere meccanicamente il luppolo, creando un\'amarezza più morbida e meno aspra. Questo approccio innovativo ha contribuito a definire le IPA della East Coast.',
      vi: 'Dogfish Head 60 Minute IPA đã tiên phong khái niệm "continual hopping" nơi hoa bia được thêm liên tục trong suốt 60 phút đun sôi thay vì theo khoảng thời gian truyền thống. Người sáng lập Sam Calagione đã sử dụng trò chơi bóng đá rung để thêm hoa bia một cách cơ học, tạo ra vị đắng mượt mà hơn, ít gay gắt hơn. Cách tiếp cận sáng tạo này đã giúp định nghĩa IPA Bờ Đông.',
    },
    awards: ['World Beer Cup Gold', 'Great American Beer Festival Medal'],
    named_after: {
      en: 'Named after the 60-minute boil time with continuous hop additions',
      it: 'Prende il nome dal tempo di ebollizione di 60 minuti con aggiunte continue di luppolo',
      vi: 'Được đặt tên theo thời gian đun sôi 60 phút với việc thêm hoa bia liên tục',
    },
  },

  description: {
    en: 'An East Coast IPA featuring continuous hop additions throughout the boil. Balanced and complex with citrus, pine, and caramel malt notes. Less aggressively bitter than West Coast IPAs, showcasing hop flavor over pure bitterness.',
    it: 'Una IPA della East Coast caratterizzata da aggiunte continue di luppolo durante l\'ebollizione. Equilibrata e complessa con note di agrumi, pino e malto caramello. Meno aggressivamente amara delle IPA della West Coast, mettendo in mostra il sapore del luppolo piuttosto che l\'amarezza pura.',
    vi: 'Một IPA Bờ Đông có đặc điểm thêm hoa bia liên tục trong suốt quá trình đun sôi. Cân bằng và phức tạp với hương cam quýt, thông và mạch nha caramel. Ít đắng hơn IPA Bờ Tây, thể hiện hương vị hoa bia hơn là vị đắng thuần túy.',
  },

  tagline: {
    en: 'Continually Hopped for Balanced Bitterness',
    it: 'Luppolo Continuo per Amarezza Equilibrata',
    vi: 'Hoa Bia Liên Tục cho Vị Đắng Cân Bằng',
  },

  characteristics: {
    abv: 6.0,
    ibu: 60,
    srm: 10,
    color: 'amber',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['hoppy', 'balanced', 'citrus', 'piney', 'smooth'],
    description: {
      en: 'Smooth hop bitterness from continuous additions creates a balanced profile. Citrus and pine notes blend with caramel malt sweetness. Complex and layered without harsh bitterness.',
      it: 'L\'amarezza liscia del luppolo dalle aggiunte continue crea un profilo equilibrato. Le note di agrumi e pino si fondono con la dolcezza del malto caramello. Complesso e stratificato senza amarezza aspra.',
      vi: 'Vị đắng hoa bia mượt mà từ việc thêm liên tục tạo ra hồ sơ cân bằng. Hương cam quýt và thông hòa quyện với vị ngọt mạch nha caramel. Phức tạp và nhiều lớp mà không có vị đắng gay gắt.',
    },
    aroma: {
      en: 'Citrus and pine hops with toasted caramel malt and subtle floral notes',
      it: 'Luppolo di agrumi e pino con malto caramello tostato e note floreali sottili',
      vi: 'Hoa bia cam quýt và thông với mạch nha caramel rang và hương hoa tinh tế',
    },
    finish: {
      en: 'Smooth, balanced finish with moderate hop bitterness',
      it: 'Finale morbido ed equilibrato con moderata amarezza di luppolo',
      vi: 'Kết thúc mượt mà, cân bằng với vị đắng hoa bia vừa phải',
    },
    bitterness_level: 4,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Two-row pale malt', 'Caramel malt'],
    hops: ['Warrior', 'Amarillo', 'Simcoe', 'Cascade'],
    yeast: 'Ale yeast',
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 7, max: 10 },
    pouring_notes: {
      en: 'Pour steadily to create a medium white head, releasing hop aromatics',
      it: 'Versare costantemente per creare una schiuma bianca media, rilasciando aromi di luppolo',
      vi: 'Rót đều để tạo lớp bọt trắng vừa, giải phóng hương hoa bia',
    },
  },

  pairing: {
    food_categories: ['seafood', 'grilled-fish', 'curry'],
    food_pairings: {
      en: 'Pairs well with grilled salmon, crab cakes, Thai curry, and aged cheddar. The balanced bitterness complements both seafood and spicy dishes.',
      it: 'Si abbina bene con salmone alla griglia, tortini di granchio, curry tailandese e cheddar stagionato. L\'amarezza equilibrata completa sia i frutti di mare che i piatti piccanti.',
      vi: 'Kết hợp tốt với cá hồi nướng, bánh cua, cà ri Thái và phô mai cheddar già. Vị đắng cân bằng bổ sung cho cả hải sản và món cay.',
    },
    cheese_pairings: ['Aged Cheddar', 'Fontina', 'Blue cheese'],
    cuisine_pairings: ['Seafood', 'Thai', 'American'],
  },

  season_tags: ['all_year'],
  occasion_tags: ['casual', 'dinner', 'celebration', 'craft-tasting'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [355, 473],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 90,

  source: {
    primary: 'https://dogfish.com',
    note: 'Official Dogfish Head website and continual hopping innovation',
  },

  version: 1,
};
