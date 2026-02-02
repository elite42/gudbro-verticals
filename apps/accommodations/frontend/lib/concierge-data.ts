/**
 * Concierge Data Module — Static content for the Concierge Hub
 *
 * Phase 36: Guest Requests & Concierge
 *
 * Country-keyed data for emergency contacts, safety tips,
 * cultural guidance, transport info, and recommended apps.
 * Content sourced from docs/features/TOURIST-SAFETY-GUIDE.md
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  note?: string;
  type: 'emergency' | 'embassy' | 'hotline';
}

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  howToProtect: string[];
  where?: string;
}

export interface SafetyCategory {
  id: string;
  label: string;
  icon: string; // Phosphor icon component name
  tips: SafetyTip[];
}

export interface CulturalTip {
  id: string;
  category: 'do' | 'dont';
  title: string;
  description: string;
}

export interface RecommendedApp {
  id: string;
  name: string;
  description: string;
  platform: 'ios' | 'android' | 'both';
}

export interface TransportTip {
  id: string;
  type: string;
  title: string;
  description: string;
  priceRange?: string;
}

export interface CountryConciergeData {
  emergency: EmergencyContact[];
  safety: SafetyCategory[];
  culture: CulturalTip[];
  transport: TransportTip[];
  apps: RecommendedApp[];
  disclaimer: string;
}

// ---------------------------------------------------------------------------
// Vietnam (VN) Data
// ---------------------------------------------------------------------------

const VN_EMERGENCY: EmergencyContact[] = [
  { id: 'vn-police', name: 'Police', number: '113', type: 'emergency' },
  { id: 'vn-fire', name: 'Fire Department', number: '114', type: 'emergency' },
  { id: 'vn-ambulance', name: 'Ambulance', number: '115', type: 'emergency' },
  { id: 'vn-general', name: 'General Emergency', number: '112', type: 'emergency' },
  {
    id: 'vn-tourist-hotline',
    name: 'Tourist Hotline (24/7)',
    number: '1900 1883',
    note: 'Multilingual',
    type: 'hotline',
  },
  {
    id: 'vn-tourist-police',
    name: 'Tourist Police',
    number: '1800 1091',
    note: 'Free call',
    type: 'hotline',
  },
  { id: 'vn-child-protect', name: 'Child Protection', number: '111', type: 'hotline' },
  { id: 'vn-legal', name: 'Legal Advice', number: '1088', type: 'hotline' },
  // Embassies
  { id: 'vn-emb-it', name: 'Italy Embassy (Hanoi)', number: '+84-24-3825-6246', type: 'embassy' },
  { id: 'vn-emb-us-hn', name: 'US Embassy (Hanoi)', number: '+84-24-3850-5000', type: 'embassy' },
  {
    id: 'vn-emb-us-hcmc',
    name: 'US Consulate (HCMC)',
    number: '+84-28-3520-4200',
    type: 'embassy',
  },
  { id: 'vn-emb-uk', name: 'UK Embassy (Hanoi)', number: '+84-24-3936-0500', type: 'embassy' },
  {
    id: 'vn-emb-au',
    name: 'Australia Embassy (Hanoi)',
    number: '+84-24-3774-0100',
    type: 'embassy',
  },
  { id: 'vn-emb-fr', name: 'France Embassy (Hanoi)', number: '+84-24-3944-5700', type: 'embassy' },
  { id: 'vn-emb-de', name: 'Germany Embassy (Hanoi)', number: '+84-24-3845-3836', type: 'embassy' },
  {
    id: 'vn-emb-kr',
    name: 'South Korea Embassy (Hanoi)',
    number: '+84-24-3771-0404',
    type: 'embassy',
  },
  { id: 'vn-emb-jp', name: 'Japan Embassy (Hanoi)', number: '+84-24-3846-3000', type: 'embassy' },
  { id: 'vn-emb-cn', name: 'China Embassy (Hanoi)', number: '+84-24-3845-3736', type: 'embassy' },
];

const VN_SAFETY: SafetyCategory[] = [
  {
    id: 'transport',
    label: 'Transport Scams',
    icon: 'Car',
    tips: [
      {
        id: 'ts-rigged-meter',
        title: 'Rigged taxi meter',
        description:
          'The meter runs faster than normal, or the driver says it is "broken" and offers an inflated flat fare.',
        howToProtect: [
          'Always use Grab, Be, or Xanh SM apps — price shown upfront',
          'If traditional taxi: only Vinasun (white) or Mai Linh (green)',
          'Check the meter starts at zero',
          'At airports, use designated Grab pickup points',
        ],
        where: 'Airports, train stations, tourist zones',
      },
      {
        id: 'ts-fake-taxi',
        title: 'Fake taxis (clones)',
        description:
          'Taxis imitate Vinasun or Mai Linh with subtle name changes: "Vinsaun", "Mai Lihn". Same colours but overcharged fares.',
        howToProtect: [
          'Check the name on the door carefully',
          'Verify the official phone number on the vehicle',
        ],
        where: 'Airports and stations in Hanoi and HCMC',
      },
      {
        id: 'ts-cyclo',
        title: 'Cyclo overcharge',
        description:
          'Driver quotes a low price, then claims it was "per minute" or "per person" at the end. May add a zero to the agreed price.',
        howToProtect: [
          'Agree on TOTAL price for the FULL trip BEFORE boarding',
          'Better to avoid cyclos as transport',
          'If you try it, write the price on your phone',
        ],
        where: 'Old Quarter Hanoi, District 1 HCMC',
      },
      {
        id: 'ts-xe-om',
        title: 'Xe Om (motorbike taxi) overcharge',
        description:
          'Driver agrees a price but claims it was "per leg" or adds a zero at the destination.',
        howToProtect: ['Use Grab Bike instead', 'Show the agreed price written on your phone'],
      },
      {
        id: 'ts-bus-luggage',
        title: 'Bus "luggage fee"',
        description:
          'Bus staff claims there is an extra luggage fee. This fee does NOT exist in Vietnam.',
        howToProtect: ['Refuse firmly — no luggage fee exists'],
        where: 'Intercity buses, tourist routes',
      },
      {
        id: 'ts-ticket-markup',
        title: 'Overpriced bus/train tickets',
        description: 'Travel agencies add huge commissions — up to 2-3x the real price.',
        howToProtect: ['Buy directly at the station or via 12Go Asia, Baolau, or VeXeRe apps'],
      },
    ],
  },
  {
    id: 'money',
    label: 'Money & Payments',
    icon: 'CurrencyDollar',
    tips: [
      {
        id: 'ms-banknote-swap',
        title: 'Banknote swap (most common)',
        description:
          'You pay with a 500,000 VND note (blue). The seller swaps it for a 20,000 VND note (also blue) and accuses you of underpaying.',
        howToProtect: [
          'Pay with small notes and exact change',
          'Change large notes at Circle K, Family Mart, or restaurants',
          'State the denomination out loud before handing it over',
          'Learn the banknote colours before your trip',
        ],
        where: 'Taxis, markets, street vendors',
      },
      {
        id: 'ms-fake-exchange',
        title: 'Fraudulent currency exchange',
        description: 'Street exchangers or airport booths give poor rates or counterfeit notes.',
        howToProtect: [
          'Exchange only at banks: Vietcombank, Agribank, Techcombank',
          'Check rate on XE Currency first',
          'Withdraw from ATMs inside banks',
        ],
      },
      {
        id: 'ms-qr-fake',
        title: 'Fake QR codes (growing fast)',
        description:
          'Scammers paste fake QR codes over real ones in bars and restaurants. Money goes to the scammer.',
        howToProtect: [
          'Check the QR code is not a sticker pasted over another',
          'Always verify recipient details before confirming payment',
          'Never scan QR codes received via message or email',
        ],
      },
    ],
  },
  {
    id: 'food',
    label: 'Food & Drink',
    icon: 'ForkKnife',
    tips: [
      {
        id: 'fs-no-price-menu',
        title: 'Menu without prices',
        description:
          'Restaurant does not show prices. The bill comes at 3-10x normal rates. They say "it is the price for foreigners".',
        howToProtect: ['Always ask for a menu WITH prices. If there is none, leave.'],
      },
      {
        id: 'fs-per-100g',
        title: 'Price "per 100 grams"',
        description:
          'Price looks fair (e.g. 50,000 VND) but is per 100g. A 500g portion = 5x the expected bill. Common with seafood.',
        howToProtect: ['Always ask: "per portion or per 100 grams?" BEFORE ordering'],
      },
      {
        id: 'fs-unwanted-snacks',
        title: 'Unrequested snacks & napkins',
        description:
          'Waiter brings peanuts, wet wipes, side dishes automatically. They look free but appear on the bill.',
        howToProtect: ['Return immediately if unwanted. Ask "Free?" before touching.'],
        where: 'Hanoi and Nha Trang especially',
      },
      {
        id: 'fs-double-menu',
        title: 'Double menu (locals vs tourists)',
        description:
          'Two menu versions: one for Vietnamese with normal prices, one for foreigners with inflated prices.',
        howToProtect: ['Eat where locals eat. Compare prices with Google Maps reviews.'],
      },
    ],
  },
  {
    id: 'street',
    label: 'Street & Markets',
    icon: 'Storefront',
    tips: [
      {
        id: 'ss-fruit-basket',
        title: 'Fruit basket photo scam',
        description:
          'A vendor puts baskets on your shoulders for a "free photo". After the shot, demands 200,000-500,000 VND.',
        howToProtect: ['Don\'t stop. Say "Khong, cam on" (no thanks) and keep walking.'],
        where: 'Old Quarter Hanoi, Hoan Kiem Lake',
      },
      {
        id: 'ss-shoe-shine',
        title: 'Shoe shine scam',
        description:
          'Someone points at your shoes, takes one off, cleans it without consent, then demands payment. May hold your shoe hostage.',
        howToProtect: ['Never stop when someone points at your shoes. Keep walking.'],
        where: 'Old Quarter Hanoi, District 1 HCMC',
      },
      {
        id: 'ss-bracelet',
        title: 'Bracelet / "gift" scam',
        description:
          'Someone puts a bracelet on your wrist claiming it is a "gift", then asks for money or pressures you to buy more.',
        howToProtect: ['Do not let anyone put anything on you.'],
      },
      {
        id: 'ss-coconut',
        title: 'Overpriced coconut',
        description:
          'A coconut is opened without asking the price. Then they charge 100,000-200,000 VND (real price: 15,000-30,000).',
        howToProtect: ['Ask the price FIRST. Fresh coconut costs 15,000-30,000 VND.'],
      },
    ],
  },
  {
    id: 'hotels',
    label: 'Hotels & Stays',
    icon: 'Buildings',
    tips: [
      {
        id: 'hs-closed-hotel',
        title: '"Hotel is closed" scam',
        description:
          'Taxi driver says your hotel is closed, full, or in a dangerous area. Offers to take you to a "better" (more expensive) hotel where they get a commission.',
        howToProtect: [
          'Insist on your booked address',
          'Have the hotel phone number saved — call directly',
          'Use Grab with pre-set destination',
        ],
        where: 'Hanoi, HCMC',
      },
      {
        id: 'hs-fake-booking',
        title: 'Fake hotel bookings on social media',
        description:
          'Facebook/Instagram pages imitate real resorts with unbelievable prices. They ask for deposits to personal bank accounts. The booking does not exist.',
        howToProtect: [
          'Book only via Booking.com, Agoda, or Traveloka',
          'Never transfer deposits to personal accounts',
          "Verify the hotel's official website",
        ],
      },
      {
        id: 'hs-hidden-costs',
        title: 'Hidden checkout costs',
        description:
          'At checkout, the hotel adds charges for minibar, towels, or non-existent "tourist taxes".',
        howToProtect: [
          'Take a photo of the price list on arrival. Ask for a cost summary before checkout.',
        ],
      },
    ],
  },
  {
    id: 'tours',
    label: 'Tours & Excursions',
    icon: 'Binoculars',
    tips: [
      {
        id: 'trs-bait-switch',
        title: 'Ha Long Bay bait-and-switch',
        description:
          'Agency offers a "luxury" cruise cheap. On departure day, the "real boat is in maintenance" and you are moved to an inferior one.',
        howToProtect: [
          'A quality 2d/1n tour costs minimum 120-150 USD/person. Less = trap',
          'Book operators with recent TripAdvisor reviews',
          'Get written email confirmation of everything included',
        ],
      },
      {
        id: 'trs-copied-agency',
        title: 'Copied agency names',
        description:
          'Fraudulent agencies copy famous names: "Mekong Tours" becomes "Mekong Tour" or "Mekong Guest Tours".',
        howToProtect: [
          "Verify physical address and official website. Book from the operator's site.",
        ],
      },
      {
        id: 'trs-kickbacks',
        title: 'Commission kickbacks',
        description:
          'Guides, hotel staff, and drivers recommend shops where they get 30-50% commission. Prices are inflated.',
        howToProtect: [
          "Check independent reviews on Google/TripAdvisor. Don't rely on hotel recommendations alone.",
        ],
        where: 'Hoi An (tailors), Hanoi, HCMC',
      },
    ],
  },
  {
    id: 'digital',
    label: 'Digital Scams',
    icon: 'ShieldWarning',
    tips: [
      {
        id: 'ds-deepfake',
        title: 'Deepfake & AI scams',
        description:
          'Criminals use deepfake video/audio to impersonate acquaintances, officials, or bank staff. They may call pretending to be hotel reception or police.',
        howToProtect: [
          'Never share personal or financial data over phone. Always verify in person.',
        ],
      },
      {
        id: 'ds-fake-police',
        title: 'Fake police phone calls',
        description:
          'Someone calls claiming to be police, says you are involved in a criminal case, and asks for money to "prove innocence".',
        howToProtect: [
          'Vietnamese police NEVER call to ask for money. Hang up. If in doubt, call 113.',
        ],
      },
      {
        id: 'ds-fake-evisa',
        title: 'Fake e-visa websites',
        description:
          'Google ads for sites imitating the official e-visa portal. They charge 100-200 USD (official cost: 25-50 USD). Some produce fake visas.',
        howToProtect: [
          'The ONLY official site is evisa.gov.vn',
          'Visa on Arrival has been ABOLISHED',
          'Standard processing: 3-5 business days. No "urgent" visas exist',
        ],
      },
    ],
  },
];

const VN_CULTURE: CulturalTip[] = [
  // Dos
  {
    id: 'c-greet',
    category: 'do',
    title: 'Learn basic greetings',
    description: '"Xin chao" (hello), "Cam on" (thank you), "Khong" (no), "Bao nhieu?" (how much?)',
  },
  {
    id: 'c-shoes',
    category: 'do',
    title: 'Remove shoes indoors',
    description: 'Take off shoes in private homes, temples, and pagodas.',
  },
  {
    id: 'c-dress',
    category: 'do',
    title: 'Dress modestly at religious sites',
    description: 'Cover shoulders and knees when visiting temples and pagodas.',
  },
  {
    id: 'c-hands',
    category: 'do',
    title: 'Use both hands',
    description: 'Give and receive objects with both hands as a sign of respect.',
  },
  {
    id: 'c-elders',
    category: 'do',
    title: 'Respect elders',
    description: 'Greet older people first — it is an important sign of respect.',
  },
  {
    id: 'c-bargain',
    category: 'do',
    title: 'Bargain with a smile',
    description: 'Haggling at markets is part of the culture. Keep it friendly.',
  },
  {
    id: 'c-photo',
    category: 'do',
    title: 'Ask before photographing people',
    description: 'Always ask permission before taking photos of individuals.',
  },
  {
    id: 'c-cross',
    category: 'do',
    title: 'Cross streets at a steady pace',
    description:
      'Walk at a constant speed — motorbikes will navigate around you. Do NOT stop in the middle.',
  },
  // Don'ts
  {
    id: 'c-head',
    category: 'dont',
    title: "Don't touch anyone's head",
    description: 'The head is considered the most sacred part of the body.',
  },
  {
    id: 'c-feet',
    category: 'dont',
    title: "Don't point feet at people or statues",
    description: 'Pointing feet at someone or religious figures is disrespectful.',
  },
  {
    id: 'c-chop',
    category: 'dont',
    title: "Don't stick chopsticks upright in rice",
    description: 'This resembles funeral offerings and is considered very bad luck.',
  },
  {
    id: 'c-pda',
    category: 'dont',
    title: 'Avoid public displays of affection',
    description: 'Kissing and intimate embraces in public are frowned upon.',
  },
  {
    id: 'c-face',
    category: 'dont',
    title: 'Don\'t make someone "lose face"',
    description: "Avoid public embarrassment. Don't raise your voice or cause a scene.",
  },
  {
    id: 'c-war',
    category: 'dont',
    title: 'Avoid discussing war or politics',
    description: 'These are sensitive topics best avoided in conversation.',
  },
  {
    id: 'c-food-crit',
    category: 'dont',
    title: "Don't criticize the food",
    description: 'Criticizing food is considered a cultural insult.',
  },
  {
    id: 'c-photo-mil',
    category: 'dont',
    title: "Don't photograph police or military",
    description: 'This can cause serious problems. Avoid it entirely.',
  },
];

const VN_TRANSPORT: TransportTip[] = [
  {
    id: 'tr-grab',
    type: 'ride-hailing',
    title: 'Grab',
    description:
      'The most popular ride-hailing app. Cars, motorbikes, and delivery. Price shown before booking — safe and reliable.',
    priceRange: 'Car: 15,000-20,000 VND/km | Bike: 5,000-8,000 VND/km',
  },
  {
    id: 'tr-be',
    type: 'ride-hailing',
    title: 'Be',
    description:
      'Vietnamese ride-hailing alternative to Grab. Same functionality, sometimes cheaper. Good coverage in major cities.',
  },
  {
    id: 'tr-xanhsm',
    type: 'ride-hailing',
    title: 'Xanh SM',
    description:
      'Electric taxi fleet by VinFast. Green, modern vehicles. Particularly good for airport transfers.',
  },
  {
    id: 'tr-metered',
    type: 'taxi',
    title: 'Metered taxis',
    description:
      'Use only Vinasun (white) or Mai Linh (green). Ensure the meter starts at zero. Avoid unmarked or imitation taxis.',
    priceRange: '12,000-15,000 VND/km',
  },
  {
    id: 'tr-xeom',
    type: 'motorbike',
    title: 'Xe Om (motorbike taxi)',
    description:
      'Traditional motorbike taxis. Agree on the price BEFORE riding or use Grab Bike instead for transparency.',
    priceRange: '10,000-30,000 VND for short trips',
  },
  {
    id: 'tr-bus',
    type: 'bus',
    title: 'City buses',
    description:
      'Very cheap but signage is mostly in Vietnamese. Google Maps shows bus routes. No luggage fee exists — refuse if asked.',
    priceRange: '5,000-7,000 VND per ride',
  },
];

const VN_APPS: RecommendedApp[] = [
  {
    id: 'app-grab',
    name: 'Grab',
    description: 'Taxi, motorbike, delivery — fixed price, safe',
    platform: 'both',
  },
  {
    id: 'app-gmaps',
    name: 'Google Maps',
    description: 'Navigation, restaurant reviews, bus routes',
    platform: 'both',
  },
  {
    id: 'app-xe',
    name: 'XE Currency',
    description: 'Real-time VND conversion rates',
    platform: 'both',
  },
  {
    id: 'app-translate',
    name: 'Google Translate',
    description: 'Instant translation including camera/photo mode',
    platform: 'both',
  },
  {
    id: 'app-12go',
    name: '12Go Asia',
    description: 'Verified bus and train tickets',
    platform: 'both',
  },
  {
    id: 'app-wise',
    name: 'Wise',
    description: 'Best exchange rates for international transfers and card payments',
    platform: 'both',
  },
];

const VN_DISCLAIMER =
  'Vietnam is one of the safest destinations in Southeast Asia, with very low violent crime rates and a generally hospitable and friendly population. These tips address a very small minority of situations, mostly concentrated in the busiest tourist areas.';

// ---------------------------------------------------------------------------
// Data Registry
// ---------------------------------------------------------------------------

export const CONCIERGE_DATA: Record<string, CountryConciergeData> = {
  VN: {
    emergency: VN_EMERGENCY,
    safety: VN_SAFETY,
    culture: VN_CULTURE,
    transport: VN_TRANSPORT,
    apps: VN_APPS,
    disclaimer: VN_DISCLAIMER,
  },
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Get concierge data for a given country code.
 * Returns null if no data available for that country.
 */
export function getConciergeData(country: string): CountryConciergeData | null {
  return CONCIERGE_DATA[country?.toUpperCase()] ?? null;
}

// ---------------------------------------------------------------------------
// Local Attractions & Tour Experiences (Phase 36-03)
// ---------------------------------------------------------------------------

export interface LocalAttraction {
  id: string;
  name: string;
  description: string;
  category: 'landmark' | 'market' | 'temple' | 'museum' | 'beach' | 'nature' | 'nightlife' | 'food';
  distance?: string;
  deepLink?: string;
  imageEmoji?: string;
}

export interface TourExperience {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceRange: string;
  deepLink?: string;
}

const VN_ATTRACTIONS: LocalAttraction[] = [
  {
    id: 'vn-ben-thanh',
    name: 'Ben Thanh Market',
    description:
      'Iconic indoor market with local crafts, street food, and souvenirs. Bustling night market outside after 6 PM.',
    category: 'market',
    distance: '1.2 km',
    imageEmoji: '\u{1F6CD}\u{FE0F}',
  },
  {
    id: 'vn-war-museum',
    name: 'War Remnants Museum',
    description:
      'Powerful museum documenting the Vietnam War through photographs, artifacts, and military equipment.',
    category: 'museum',
    distance: '1.5 km',
    imageEmoji: '\u{1F3DB}\u{FE0F}',
  },
  {
    id: 'vn-cu-chi',
    name: 'Cu Chi Tunnels',
    description:
      'Extensive network of underground tunnels used during the war. Half-day trip with guided tours.',
    category: 'museum',
    distance: '60 km',
    deepLink: '/tours?q=cu-chi-tunnels',
    imageEmoji: '\u{1F573}\u{FE0F}',
  },
  {
    id: 'vn-jade-emperor',
    name: 'Jade Emperor Pagoda',
    description:
      'Ornate Taoist temple built in 1909 with intricate wood carvings and ceramic figurines.',
    category: 'temple',
    distance: '3 km',
    imageEmoji: '\u{26E9}\u{FE0F}',
  },
  {
    id: 'vn-notre-dame',
    name: 'Notre-Dame Cathedral',
    description:
      'French colonial-era cathedral built with materials imported from Marseille. A District 1 landmark.',
    category: 'landmark',
    distance: '1.8 km',
    imageEmoji: '\u{26EA}',
  },
  {
    id: 'vn-bitexco',
    name: 'Bitexco Financial Tower',
    description:
      'Iconic 68-story skyscraper with Saigon Skydeck on the 49th floor offering panoramic city views.',
    category: 'landmark',
    distance: '0.8 km',
    imageEmoji: '\u{1F3D9}\u{FE0F}',
  },
  {
    id: 'vn-bui-vien',
    name: 'Bui Vien Walking Street',
    description:
      'Vibrant backpacker street with bars, live music, and street food. Pedestrian-only after 7 PM on weekends.',
    category: 'nightlife',
    distance: '0.5 km',
    imageEmoji: '\u{1F389}',
  },
  {
    id: 'vn-thien-hau',
    name: 'Thien Hau Temple',
    description:
      'Beautiful Chinese-style temple in Cholon dedicated to the sea goddess. Incense coils hang from the ceiling.',
    category: 'temple',
    distance: '5 km',
    imageEmoji: '\u{1F3EF}',
  },
  {
    id: 'vn-pham-ngu-lao',
    name: 'Pham Ngu Lao Area',
    description:
      'Budget traveler hub with hostels, travel agencies, cafes, and street food vendors around every corner.',
    category: 'food',
    distance: '0.3 km',
    imageEmoji: '\u{1F35C}',
  },
  {
    id: 'vn-saigon-river',
    name: 'Saigon River',
    description:
      'Scenic waterfront for evening walks and sunset dinner cruises. Bach Dang Wharf is the main departure point.',
    category: 'nature',
    distance: '1 km',
    deepLink: '/tours?q=saigon-river-cruise',
    imageEmoji: '\u{1F30A}',
  },
  {
    id: 'vn-d1-food-streets',
    name: 'District 1 Food Streets',
    description:
      'Winding alleys packed with pho, banh mi, and com tam stalls. Best explored on foot or by motorbike tour.',
    category: 'food',
    distance: '0.5 km',
    imageEmoji: '\u{1F962}',
  },
  {
    id: 'vn-post-office',
    name: 'Central Post Office',
    description:
      'Stunning French colonial building designed by Gustave Eiffel. Still a working post office with souvenir shops.',
    category: 'landmark',
    distance: '1.8 km',
    imageEmoji: '\u{1F3E4}',
  },
  {
    id: 'vn-mekong',
    name: 'Mekong Delta',
    description:
      'Lush river delta with floating markets, coconut villages, and fruit orchards. Full-day trip from the city.',
    category: 'nature',
    distance: '70 km',
    deepLink: '/tours?q=mekong-delta',
    imageEmoji: '\u{1F334}',
  },
  {
    id: 'vn-independence-palace',
    name: 'Independence Palace',
    description:
      'Historic government building with preserved war rooms, vintage cars, and rooftop helicopter on display.',
    category: 'museum',
    distance: '2 km',
    imageEmoji: '\u{1F3DB}\u{FE0F}',
  },
];

const VN_TOURS: TourExperience[] = [
  {
    id: 'tour-street-food',
    name: 'Street Food Tour',
    description:
      'Guided walking tour through hidden alleys tasting pho, banh mi, banh xeo, and local desserts.',
    duration: '3-4 hours',
    priceRange: '$25-45',
    deepLink: '/tours?q=street-food-tour',
  },
  {
    id: 'tour-motorbike',
    name: 'Motorbike City Tour',
    description:
      'See HCMC like a local on the back of a vintage Vespa or Honda. Includes food stops and hidden gems.',
    duration: '4 hours',
    priceRange: '$40-65',
    deepLink: '/tours?q=motorbike-city-tour',
  },
  {
    id: 'tour-mekong',
    name: 'Mekong Delta Day Trip',
    description:
      'Visit floating markets, sample tropical fruits, and cruise narrow canals through coconut villages.',
    duration: 'Full day',
    priceRange: '$35-60',
    deepLink: '/tours?q=mekong-delta',
  },
  {
    id: 'tour-cu-chi',
    name: 'Cu Chi Tunnels',
    description:
      'Half-day excursion exploring the famous underground tunnel network with expert guides.',
    duration: 'Half day',
    priceRange: '$20-40',
    deepLink: '/tours?q=cu-chi-tunnels',
  },
  {
    id: 'tour-cooking',
    name: 'Vietnamese Cooking Class',
    description:
      'Market visit followed by hands-on cooking. Learn to make pho, spring rolls, and Vietnamese coffee.',
    duration: '3-4 hours',
    priceRange: '$30-50',
    deepLink: '/tours?q=cooking-class',
  },
  {
    id: 'tour-coffee',
    name: 'Coffee Workshop',
    description:
      "Discover Vietnam's coffee culture from bean to cup. Includes ca phe sua da tasting and latte art.",
    duration: '2 hours',
    priceRange: '$15-30',
  },
  {
    id: 'tour-night-market',
    name: 'Night Market Tour',
    description:
      'Evening walking tour through Ben Thanh night market and surrounding street food stalls.',
    duration: '2-3 hours',
    priceRange: '$20-35',
    deepLink: '/tours?q=night-market',
  },
  {
    id: 'tour-temples',
    name: 'Temple & Pagoda Tour',
    description:
      'Visit the most beautiful temples and pagodas in the city including Jade Emperor and Thien Hau.',
    duration: '3 hours',
    priceRange: '$20-35',
    deepLink: '/tours?q=temple-tour',
  },
];

// ---------------------------------------------------------------------------
// Attractions / Tours Data Registry
// ---------------------------------------------------------------------------

const ATTRACTIONS_DATA: Record<string, LocalAttraction[]> = {
  VN: VN_ATTRACTIONS,
};

const TOURS_DATA: Record<string, TourExperience[]> = {
  VN: VN_TOURS,
};

/**
 * Get local attractions for a given country code.
 */
export function getLocalAttractions(country: string): LocalAttraction[] {
  return ATTRACTIONS_DATA[country?.toUpperCase()] ?? [];
}

/**
 * Get tour experiences for a given country code.
 */
export function getTourExperiences(country: string): TourExperience[] {
  return TOURS_DATA[country?.toUpperCase()] ?? [];
}
