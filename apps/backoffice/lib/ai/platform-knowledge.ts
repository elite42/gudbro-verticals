/**
 * Platform Knowledge for AI Co-Manager
 *
 * This file contains comprehensive knowledge about the GudBro backoffice platform,
 * including navigation structure, feature locations, and how-to guides.
 *
 * This enables the AI to answer questions like:
 * - "Where are promo codes?"
 * - "How do I add credit to a customer?"
 * - "Where can I see my analytics?"
 */

// ============================================================
// NAVIGATION STRUCTURE
// ============================================================

export const PLATFORM_NAVIGATION = {
  // Main sidebar items with their paths and sub-items
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
    description: 'Overview of your restaurant performance, quick stats, and AI priorities',
  },

  aiCoManager: {
    name: 'AI Co-Manager',
    path: '/ai',
    description: 'Your AI assistant for menu optimization, insights, and automated tasks',
    children: {
      chat: { name: 'Chat', path: '/ai', description: 'Chat with your AI assistant' },
      triggers: {
        name: 'Triggers',
        path: '/ai/triggers',
        description: 'Set up automated AI actions',
      },
      escalations: {
        name: 'Escalations',
        path: '/chat/escalations',
        description: 'View customer escalations',
      },
    },
  },

  orders: {
    name: 'Orders',
    path: '/orders',
    description: 'View and manage incoming orders from customers',
    children: {
      allOrders: { name: 'All Orders', path: '/orders', description: 'List of all orders' },
      kitchenDisplay: {
        name: 'Kitchen Display',
        path: '/orders/kitchen',
        description: 'Kitchen order display system',
      },
    },
  },

  hotActions: {
    name: 'Hot Actions',
    path: '/hot-actions',
    description: 'Quick access to frequent operations like toggling item availability',
  },

  content: {
    name: 'Content',
    path: '/content',
    description: 'Manage your menu, recipes, ingredients, and categories',
    children: {
      menu: { name: 'Menu', path: '/content/menu', description: 'View and manage all menu items' },
      menuBuilder: {
        name: 'Menu Builder',
        path: '/content/menu-builder',
        description: 'Visual menu builder',
      },
      wines: { name: 'Wines', path: '/content/wines', description: 'Wine list management' },
      recipes: {
        name: 'Recipes',
        path: '/content/recipes',
        description: 'Cocktail and drink recipes',
      },
      ingredients: {
        name: 'Ingredients',
        path: '/content/ingredients',
        description: 'Master ingredients list',
      },
      contributions: {
        name: 'Contributions',
        path: '/content/contributions',
        description: 'Community contributions',
      },
      categories: {
        name: 'Categories',
        path: '/content/categories',
        description: 'Menu categories',
      },
      modifiers: {
        name: 'Modifiers',
        path: '/content/modifiers',
        description: 'Item modifiers and add-ons',
      },
    },
  },

  qrCodes: {
    name: 'QR Codes',
    path: '/qr-codes',
    description: 'Create and manage QR codes for tables, marketing, and WiFi',
    children: {
      manage: { name: 'Manage QR', path: '/qr-codes', description: 'Create and manage QR codes' },
      analytics: {
        name: 'Analytics',
        path: '/qr-codes/analytics',
        description: 'QR code scan statistics',
      },
    },
  },

  translations: {
    name: 'Translations',
    path: '/translations',
    description: 'Manage menu translations for multiple languages',
  },

  foodCosts: {
    name: 'Food Costs',
    path: '/food-costs',
    description: 'Track and analyze food costs and margins',
    children: {
      overview: { name: 'Overview', path: '/food-costs', description: 'Cost analysis overview' },
      ingredientCosts: {
        name: 'Ingredient Costs',
        path: '/food-costs/ingredients',
        description: 'Per-ingredient cost tracking',
      },
    },
  },

  customers: {
    name: 'Customers',
    path: '/customers',
    description: 'Customer database, feedback, and engagement insights',
    children: {
      followers: {
        name: 'Followers',
        path: '/customers/followers',
        description: 'Customer database and profiles',
      },
      feedback: {
        name: 'Feedback',
        path: '/customers/feedback',
        description: 'Customer reviews and ratings',
      },
      intelligence: {
        name: 'Intelligence',
        path: '/customers/intelligence',
        description: 'Customer behavior insights',
      },
    },
  },

  marketing: {
    name: 'Marketing',
    path: '/marketing',
    description: 'Promotions, events, loyalty programs, and gift cards',
    children: {
      events: {
        name: 'Events',
        path: '/marketing/events',
        description: 'Special events, live music, themed nights',
      },
      promotions: {
        name: 'Promotions',
        path: '/marketing/promotions',
        description: 'Time-limited offers and discounts',
      },
      challenges: {
        name: 'Food Challenges',
        path: '/marketing/challenges',
        description: 'Food challenges and leaderboards',
      },
      giftCards: {
        name: 'Gift Cards',
        path: '/marketing/gift-cards',
        description: 'Sell and manage digital gift cards',
      },
      promoCodes: {
        name: 'Promo Codes',
        path: '/marketing/promo-codes',
        description: 'Discount codes for customers',
      },
      coupons: {
        name: 'Coupons',
        path: '/marketing/coupons',
        description: 'Digital coupons for promotions',
      },
      loyalty: {
        name: 'Loyalty',
        path: '/marketing/loyalty',
        description: 'Customer loyalty program with points',
      },
    },
  },

  partnerships: {
    name: 'Partnerships',
    path: '/partnerships',
    description: 'B2B partnerships with hotels, tour operators, and conventions',
    children: {
      overview: { name: 'Overview', path: '/partnerships', description: 'Partnership dashboard' },
      tourOperators: {
        name: 'Tour Operators',
        path: '/partnerships/tour-operators',
        description: 'Tour operator partnerships',
      },
      accommodations: {
        name: 'Accommodations',
        path: '/partnerships/accommodations',
        description: 'Hotel and B&B partnerships',
      },
      conventions: {
        name: 'Conventions',
        path: '/partnerships/conventions',
        description: 'Convention and event partnerships',
      },
      outreach: {
        name: 'Outreach',
        path: '/partnerships/outreach',
        description: 'Partnership outreach campaigns',
      },
      bookings: {
        name: 'Bookings',
        path: '/partnerships/bookings',
        description: 'Partnership booking management',
      },
      products: {
        name: 'Products',
        path: '/partnerships/products',
        description: 'Products for partners',
      },
    },
  },

  reservations: {
    name: 'Reservations',
    path: '/reservations',
    description: 'Table bookings and floor plan management',
    children: {
      overview: { name: 'Overview', path: '/reservations', description: 'Reservation calendar' },
      floorPlan: {
        name: 'Floor Plan',
        path: '/reservations/floor-plan',
        description: 'Visual floor plan editor',
      },
    },
  },

  analytics: {
    name: 'Analytics',
    path: '/analytics',
    description: 'Track menu views, QR scans, orders, and customer engagement',
  },

  intelligence: {
    name: 'Intelligence',
    path: '/intelligence/map',
    description: 'Market intelligence map with competitor analysis and trends',
  },

  team: {
    name: 'Team',
    path: '/team',
    description: 'Manage staff accounts and permissions',
  },

  billing: {
    name: 'Billing',
    path: '/billing',
    description: 'Subscription, invoices, and payment methods',
  },

  settings: {
    name: 'Settings',
    path: '/settings',
    description: 'Restaurant settings and preferences',
  },

  help: {
    name: 'Help',
    path: '/help',
    description: 'In-app documentation and knowledge base',
  },
};

// ============================================================
// FEATURE FINDER - Maps questions to locations
// ============================================================

export const FEATURE_FINDER: Record<string, { path: string; description: string; howTo?: string }> =
  {
    // Promo Codes
    'promo codes': {
      path: '/marketing/promo-codes',
      description: 'Create and manage discount codes',
      howTo: 'Go to Marketing > Promo Codes. Click "Create Promo Code" to add a new discount code.',
    },
    'discount codes': {
      path: '/marketing/promo-codes',
      description: 'Create and manage discount codes',
      howTo: 'Go to Marketing > Promo Codes. Click "Create Promo Code" to add a new discount code.',
    },

    // Gift Cards
    'gift cards': {
      path: '/marketing/gift-cards',
      description: 'Sell digital gift cards that customers can redeem',
      howTo:
        'Go to Marketing > Gift Cards. You can create gift card templates and track sold/redeemed cards.',
    },
    'gift card': {
      path: '/marketing/gift-cards',
      description: 'Sell digital gift cards that customers can redeem',
      howTo:
        'Go to Marketing > Gift Cards. You can create gift card templates and track sold/redeemed cards.',
    },

    // Credit / Wallet
    'customer credit': {
      path: '/customers/followers',
      description: 'Manage customer wallet and credit',
      howTo:
        'Go to Customers > Followers. Find the customer and click on their profile. Look for the "Wallet" or "Credit" section to add or adjust credit.',
    },
    'add credit': {
      path: '/customers/followers',
      description: 'Add credit to customer wallet',
      howTo:
        'Go to Customers > Followers. Find the customer and click on their profile. In the Wallet section, click "Add Credit" to add balance.',
    },
    wallet: {
      path: '/customers/followers',
      description: 'Customer wallet management',
      howTo:
        'Go to Customers > Followers. Select a customer to view and manage their wallet balance.',
    },

    // Loyalty
    loyalty: {
      path: '/marketing/loyalty',
      description: 'Customer loyalty program with points and rewards',
      howTo:
        'Go to Marketing > Loyalty. Set up your loyalty program tiers, point rules, and rewards.',
    },
    'loyalty points': {
      path: '/marketing/loyalty',
      description: 'Points-based reward system',
      howTo:
        'Go to Marketing > Loyalty. Configure point earning rules (e.g., 1 point per euro spent) and define rewards.',
    },
    rewards: {
      path: '/marketing/loyalty',
      description: 'Customer rewards and perks',
      howTo:
        'Go to Marketing > Loyalty. Create rewards that customers can redeem with their points.',
    },

    // Coupons
    coupons: {
      path: '/marketing/coupons',
      description: 'Digital coupons for promotions',
      howTo:
        'Go to Marketing > Coupons. Create coupons with specific discounts, validity periods, and usage limits.',
    },

    // Events
    events: {
      path: '/marketing/events',
      description: 'Special events, live music, themed nights',
      howTo:
        'Go to Marketing > Events. Click "Create Event" to add a new event with date, description, and marketing materials.',
    },

    // Promotions
    promotions: {
      path: '/marketing/promotions',
      description: 'Time-limited offers and discounts',
      howTo:
        'Go to Marketing > Promotions. Create promotions with start/end dates and discount percentages.',
    },
    offers: {
      path: '/marketing/promotions',
      description: 'Special offers and deals',
      howTo: 'Go to Marketing > Promotions to create time-limited special offers.',
    },

    // Food Challenges
    'food challenges': {
      path: '/marketing/challenges',
      description: 'Gamified dining experiences with leaderboards',
      howTo:
        'Go to Marketing > Food Challenges. Create challenges like "Finish the Giant Burger" with rules and prizes.',
    },
    challenges: {
      path: '/marketing/challenges',
      description: 'Food challenges and competitions',
      howTo: 'Go to Marketing > Food Challenges to set up dining challenges.',
    },

    // QR Codes
    'qr codes': {
      path: '/qr-codes',
      description: 'Create QR codes for tables, marketing, or WiFi',
      howTo:
        'Go to QR Codes. Choose Table QR, Marketing QR, or WiFi QR to create the appropriate code.',
    },
    'table qr': {
      path: '/qr-codes',
      description: 'QR codes for table ordering',
      howTo: 'Go to QR Codes > click "Table QR". Enter the table number and generate.',
    },

    // Menu
    menu: {
      path: '/content/menu',
      description: 'View and manage all menu items',
      howTo: 'Go to Content > Menu. You can add, edit, or remove menu items here.',
    },
    'add dish': {
      path: '/content/menu',
      description: 'Add a new dish to the menu',
      howTo: 'Go to Content > Menu. Click "Add Item" button to create a new dish.',
    },
    'add menu item': {
      path: '/content/menu',
      description: 'Add a new item to the menu',
      howTo: 'Go to Content > Menu. Click "Add Item" button to create a new menu item.',
    },

    // Categories
    categories: {
      path: '/content/categories',
      description: 'Manage menu categories',
      howTo: 'Go to Content > Categories. Create, edit, or reorder categories.',
    },

    // Ingredients
    ingredients: {
      path: '/content/ingredients',
      description: 'Master ingredients list',
      howTo: 'Go to Content > Ingredients. Search and manage the ingredient database.',
    },

    // Recipes
    recipes: {
      path: '/content/recipes',
      description: 'Cocktail and drink recipes',
      howTo: 'Go to Content > Recipes. Create detailed recipes with ingredients and instructions.',
    },

    // Modifiers
    modifiers: {
      path: '/content/modifiers',
      description: 'Item add-ons and customizations',
      howTo:
        'Go to Content > Modifiers. Create modifier groups (e.g., "Toppings", "Cooking preference").',
    },

    // Wines
    wines: {
      path: '/content/wines',
      description: 'Wine list management',
      howTo:
        'Go to Content > Wines. Manage your wine list with details like region, vintage, and pairing notes.',
    },

    // Translations
    translations: {
      path: '/translations',
      description: 'Translate menu content to multiple languages',
      howTo: 'Go to Translations. Select the target language and translate your menu items.',
    },

    // Orders
    orders: {
      path: '/orders',
      description: 'View and manage customer orders',
      howTo: 'Go to Orders. View all orders, filter by status, and manage order flow.',
    },

    // Kitchen Display
    kitchen: {
      path: '/orders/kitchen',
      description: 'Kitchen order display system',
      howTo: 'Go to Orders > Kitchen Display. This shows active orders for kitchen staff.',
    },

    // Reservations
    reservations: {
      path: '/reservations',
      description: 'Table booking management',
      howTo: 'Go to Reservations. View booking calendar and manage table assignments.',
    },
    'floor plan': {
      path: '/reservations/floor-plan',
      description: 'Visual table layout editor',
      howTo: 'Go to Reservations > Floor Plan. Drag and drop to arrange tables.',
    },

    // Analytics
    analytics: {
      path: '/analytics',
      description: 'Business performance analytics',
      howTo: 'Go to Analytics. View charts for orders, revenue, popular items, and trends.',
    },
    statistics: {
      path: '/analytics',
      description: 'Business statistics',
      howTo: 'Go to Analytics to view all your business statistics.',
    },

    // Customers
    customers: {
      path: '/customers/followers',
      description: 'Customer database and profiles',
      howTo: 'Go to Customers > Followers. View and manage your customer base.',
    },
    'customer list': {
      path: '/customers/followers',
      description: 'List of all customers',
      howTo: 'Go to Customers > Followers to see all your customers.',
    },
    feedback: {
      path: '/customers/feedback',
      description: 'Customer reviews and ratings',
      howTo: 'Go to Customers > Feedback. View and respond to customer reviews.',
    },

    // Team
    team: {
      path: '/team',
      description: 'Staff accounts and permissions',
      howTo: 'Go to Team. Invite staff members and assign roles.',
    },
    staff: {
      path: '/team',
      description: 'Staff management',
      howTo: 'Go to Team to manage your staff accounts.',
    },

    // Food Costs
    'food costs': {
      path: '/food-costs',
      description: 'Cost tracking and margin analysis',
      howTo: 'Go to Food Costs. View your food cost percentages and margins.',
    },
    margins: {
      path: '/food-costs',
      description: 'Profit margin analysis',
      howTo: 'Go to Food Costs to see your profit margins.',
    },

    // Partnerships
    partnerships: {
      path: '/partnerships',
      description: 'B2B partnership management',
      howTo: 'Go to Partnerships. Manage relationships with hotels, tour operators, etc.',
    },
    'tour operators': {
      path: '/partnerships/tour-operators',
      description: 'Tour operator partnerships',
      howTo: 'Go to Partnerships > Tour Operators. Add and manage tour operator deals.',
    },

    // Settings
    settings: {
      path: '/settings',
      description: 'Restaurant configuration',
      howTo: 'Go to Settings. Configure opening hours, currency, language, and more.',
    },

    // Billing
    billing: {
      path: '/billing',
      description: 'Subscription and payments',
      howTo: 'Go to Billing. View your plan, invoices, and update payment method.',
    },
    subscription: {
      path: '/billing',
      description: 'Manage your GudBro subscription',
      howTo: 'Go to Billing to view or change your subscription plan.',
    },

    // Help
    help: {
      path: '/help',
      description: 'In-app documentation',
      howTo: 'Go to Help. Search for guides and tutorials on any feature.',
    },
    documentation: {
      path: '/help',
      description: 'Feature documentation',
      howTo: 'Go to Help to access the knowledge base.',
    },
  };

// ============================================================
// HOW-TO GUIDES - Common task instructions
// ============================================================

export const HOW_TO_GUIDES: Record<string, string> = {
  // Gift Cards
  'create gift card': `
To create a gift card template:
1. Go to Marketing > Gift Cards
2. Click "Create Gift Card"
3. Set the value (e.g., €50, €100)
4. Customize the design if desired
5. Save - customers can now purchase this gift card`,

  'sell gift card': `
Gift cards are sold through your customer-facing menu:
1. Ensure gift cards are enabled in Marketing > Gift Cards
2. Customers purchase them from your digital menu
3. You can also manually create a gift card for a customer in the backoffice`,

  'redeem gift card': `
To redeem a gift card:
1. When processing an order, click "Apply Gift Card"
2. Enter the gift card code
3. The balance will be applied to the order
4. Any remaining balance stays on the card for future use`,

  // Promo Codes
  'create promo code': `
To create a promo code:
1. Go to Marketing > Promo Codes
2. Click "Create Promo Code"
3. Enter the code (e.g., SUMMER20)
4. Set the discount type (percentage or fixed amount)
5. Set validity period and usage limits
6. Save and share the code with customers`,

  // Customer Credit
  'add customer credit': `
To add credit to a customer's wallet:
1. Go to Customers > Followers
2. Search for the customer by name or email
3. Click on their profile
4. Find the "Wallet" section
5. Click "Add Credit"
6. Enter the amount and confirm`,

  // Loyalty
  'set up loyalty program': `
To set up a loyalty program:
1. Go to Marketing > Loyalty
2. Enable the loyalty program
3. Configure point rules (e.g., 1 point per €1 spent)
4. Create reward tiers if desired
5. Add rewards customers can redeem with points
6. Save and announce to customers`,

  // Events
  'create event': `
To create an event:
1. Go to Marketing > Events
2. Click "Create Event"
3. Enter event details (title, date, description)
4. Upload promotional images
5. Set any special pricing or offers
6. Publish the event`,

  // QR Code
  'create table qr': `
To create a QR code for a table:
1. Go to QR Codes
2. Click "Table QR"
3. Enter the table number
4. Optionally customize the design
5. Click "Generate"
6. Download and print the QR code`,

  // Menu Item
  'add menu item': `
To add a new menu item:
1. Go to Content > Menu
2. Click "Add Item"
3. Enter name, description, price
4. Select a category
5. Upload a photo
6. Add ingredients if tracking food costs
7. Save the item`,

  'mark item unavailable': `
To mark an item as unavailable:
1. Go to Content > Menu (or use Hot Actions for speed)
2. Find the item
3. Toggle the availability switch off
4. The item is now hidden from customers`,

  // Team
  'invite staff member': `
To invite a new staff member:
1. Go to Team
2. Click "Invite Member"
3. Enter their email
4. Select their role (e.g., Manager, Staff, Kitchen)
5. Send invitation
6. They'll receive an email to set up their account`,

  // Reservations
  'accept reservation': `
To manage reservations:
1. Go to Reservations
2. View the calendar for upcoming bookings
3. Click on a reservation to see details
4. Confirm, modify, or cancel as needed`,
};

// ============================================================
// GENERATE PLATFORM KNOWLEDGE STRING FOR AI
// ============================================================

export function generatePlatformKnowledgeForAI(): string {
  return `
## Platform Navigation Guide

You are helping a manager navigate the GudBro backoffice. Here's the complete navigation structure:

### Sidebar Menu Structure

**Dashboard** (/dashboard) - Overview and quick stats
**AI Co-Manager** (/ai) - Chat, Triggers, Escalations
**Orders** (/orders) - All Orders, Kitchen Display
**Hot Actions** (/hot-actions) - Quick operations
**Content** (/content) - Menu, Recipes, Ingredients, Categories, Modifiers, Wines
**QR Codes** (/qr-codes) - Create and manage QR codes
**Translations** (/translations) - Multi-language support
**Food Costs** (/food-costs) - Cost tracking and margins
**Customers** (/customers) - Followers, Feedback, Intelligence
**Marketing** (/marketing) - Events, Promotions, Challenges, Gift Cards, Promo Codes, Coupons, Loyalty
**Partnerships** (/partnerships) - Tour Operators, Accommodations, Conventions
**Reservations** (/reservations) - Booking calendar, Floor Plan
**Analytics** (/analytics) - Performance metrics
**Intelligence** (/intelligence/map) - Market analysis
**Team** (/team) - Staff management
**Billing** (/billing) - Subscription and payments
**Settings** (/settings) - Configuration
**Help** (/help) - Documentation

### Quick Feature Finder

When users ask "where is X?" or "how do I find X?", use this guide:

**Promo Codes / Discount Codes** → Marketing > Promo Codes (/marketing/promo-codes)
**Gift Cards** → Marketing > Gift Cards (/marketing/gift-cards)
**Loyalty Program / Points** → Marketing > Loyalty (/marketing/loyalty)
**Coupons** → Marketing > Coupons (/marketing/coupons)
**Events** → Marketing > Events (/marketing/events)
**Promotions / Offers** → Marketing > Promotions (/marketing/promotions)
**Food Challenges** → Marketing > Food Challenges (/marketing/challenges)
**Customer Credit / Wallet** → Customers > Followers (click customer profile)
**Customer List** → Customers > Followers (/customers/followers)
**Feedback / Reviews** → Customers > Feedback (/customers/feedback)
**Menu Items** → Content > Menu (/content/menu)
**Add New Dish** → Content > Menu > Add Item
**Categories** → Content > Categories (/content/categories)
**Ingredients** → Content > Ingredients (/content/ingredients)
**Recipes** → Content > Recipes (/content/recipes)
**QR Codes** → QR Codes (/qr-codes)
**Translations** → Translations (/translations)
**Reservations** → Reservations (/reservations)
**Staff Management** → Team (/team)
**Billing / Subscription** → Billing (/billing)
**Settings** → Settings (/settings)

### Common How-To Tasks

**To add credit to a customer:**
Go to Customers > Followers → Find the customer → Click their profile → Wallet section → Add Credit

**To create a promo code:**
Go to Marketing > Promo Codes → Create Promo Code → Set code, discount, and limits

**To create a gift card:**
Go to Marketing > Gift Cards → Create Gift Card → Set value and design

**To set up loyalty program:**
Go to Marketing > Loyalty → Enable program → Set point rules and rewards

**To mark an item unavailable:**
Go to Content > Menu → Find item → Toggle availability off (or use Hot Actions for speed)

**To create a table QR:**
Go to QR Codes → Table QR → Enter table number → Download

**To invite a staff member:**
Go to Team → Invite Member → Enter email and select role

When answering navigation questions, always provide the exact path (e.g., "Marketing > Gift Cards") and optionally the URL.
`;
}

export default {
  PLATFORM_NAVIGATION,
  FEATURE_FINDER,
  HOW_TO_GUIDES,
  generatePlatformKnowledgeForAI,
};
