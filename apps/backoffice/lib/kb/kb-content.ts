/**
 * GUDBRO Backoffice Knowledge Base Content
 *
 * Complete documentation for all backoffice pages.
 * Format for each page: Purpose, Navigation, Actions, Workflows, FAQ, Tips
 */

export interface KBSection {
  id: string;
  title: string;
  icon: string;
  pages: KBPage[];
}

export interface KBPage {
  id: string;
  path: string;
  title: string;
  purpose: string;
  navigation: string[];
  whatYouSee?: KBVisualSection[];
  actions?: KBAction[];
  workflows?: KBWorkflow[];
  faq?: KBFAQ[];
  tips?: string[];
}

export interface KBVisualSection {
  title: string;
  description?: string;
  items?: { label: string; description: string }[];
}

export interface KBAction {
  name: string;
  icon?: string;
  description: string;
}

export interface KBWorkflow {
  title: string;
  steps: string[];
}

export interface KBFAQ {
  q: string;
  a: string;
}

export const KB_SECTIONS: KBSection[] = [
  // ============================================================
  // DASHBOARD & OVERVIEW
  // ============================================================
  {
    id: 'dashboard',
    title: 'Dashboard & Overview',
    icon: '🏠',
    pages: [
      {
        id: 'dashboard',
        path: '/dashboard',
        title: 'Dashboard',
        purpose:
          'Your home page after login. See your restaurant status at a glance and quickly access main functions.',
        navigation: [
          'Automatic after login',
          'Click GUDBRO logo (from any page)',
          'URL: /dashboard',
        ],
        whatYouSee: [
          {
            title: 'Onboarding Checklist',
            description:
              'If new, shows setup steps: restaurant details, create menu, add dishes, customize QR code.',
          },
          {
            title: 'Organization Cards',
            items: [
              { label: 'Organization', description: 'Your organization name and type' },
              { label: 'Brand', description: 'Active brand with primary color' },
              { label: 'Location', description: 'Selected location with currency and language' },
            ],
          },
          {
            title: 'Quick Stats',
            items: [
              { label: 'Menu Items', description: 'Total dishes in menu' },
              { label: 'Active Items', description: 'Currently visible dishes' },
              { label: 'Categories', description: 'Categories created' },
              { label: 'Ingredients', description: 'Ingredients in database' },
            ],
          },
          {
            title: 'AI Command Center',
            description:
              'AI priorities and suggested actions based on weather, food cost, and operational data.',
          },
          {
            title: 'Recent Activity',
            description: 'List of recently added dishes with name, price, and date.',
          },
          {
            title: 'Quick Actions',
            description:
              'Shortcuts to: add new dish, manage categories, translate content, view analytics.',
          },
        ],
        workflows: [
          {
            title: 'First Access',
            steps: [
              'Complete the onboarding checklist in suggested order',
              'Click each step to be guided to the right page',
              'Step marks automatically as completed',
            ],
          },
          {
            title: 'Daily Check',
            steps: [
              'Review AI priorities for urgent decisions',
              'Check quick stats for anomalies',
              'Review recent activity',
              'Use Quick Actions for common tasks',
            ],
          },
        ],
        faq: [
          {
            q: 'How do I change brand/location?',
            a: 'Use the selector in the sidebar menu to change active brand or location.',
          },
          {
            q: 'Are statistics real-time?',
            a: 'They update on page load. Refresh for updated data.',
          },
          {
            q: 'Can I hide the onboarding checklist?',
            a: 'Complete all steps and it will disappear automatically.',
          },
        ],
        tips: [
          'Use Quick Actions instead of navigating through menu for frequent tasks',
          'Check AI priorities daily - they update based on weather, food costs, and time',
          'On mobile, you get a simplified Command Center view for quick decisions',
        ],
      },
      {
        id: 'analytics',
        path: '/analytics',
        title: 'Analytics',
        purpose:
          'Centralized analytics dashboard showing QR scans, orders, revenue, and customer behavior.',
        navigation: ['Sidebar > Analytics', 'Quick Action from Dashboard', 'URL: /analytics'],
        whatYouSee: [
          {
            title: 'Overview Cards',
            items: [
              { label: 'Total Scans', description: 'QR code scans across all codes' },
              { label: 'Orders', description: 'Total orders placed' },
              { label: 'Revenue', description: 'Total revenue generated' },
              { label: 'Avg Order Value', description: 'Average order amount' },
            ],
          },
          {
            title: 'Charts & Graphs',
            items: [
              { label: 'Scans Over Time', description: 'Line chart of daily/weekly scans' },
              { label: 'Top Products', description: 'Best selling items' },
              { label: 'Peak Hours', description: 'Busiest times of day' },
              { label: 'Device Breakdown', description: 'iOS vs Android vs Desktop' },
            ],
          },
          {
            title: 'QR Analytics Tab',
            description: 'Detailed QR code performance by individual code.',
          },
        ],
        workflows: [
          {
            title: 'Weekly Review',
            steps: [
              'Check overall scan trends vs previous week',
              'Identify top performing products',
              'Review peak hours for staffing decisions',
              'Export data if needed for reports',
            ],
          },
        ],
        faq: [
          {
            q: 'How often does data update?',
            a: 'Analytics update in near real-time. Refresh page for latest data.',
          },
          {
            q: 'Can I export data?',
            a: 'Yes, use the Export button to download CSV or PDF reports.',
          },
        ],
        tips: [
          'Use date range filters to compare time periods',
          'Check "Peak Hours" before scheduling staff',
          'QR Analytics tab helps identify which marketing channels work best',
        ],
      },
      {
        id: 'qr-codes',
        path: '/qr-codes',
        title: 'QR Codes',
        purpose:
          'Create and manage QR codes for your restaurant. Each QR can link to menu, specific pages, or provide WiFi credentials.',
        navigation: ['Sidebar > QR Codes', 'URL: /qr-codes'],
        whatYouSee: [
          {
            title: 'Quick Create (3 presets)',
            items: [
              { label: 'Table QR', description: 'For table prints, opens menu with table number' },
              {
                label: 'Marketing QR',
                description: 'For flyers, social, events - tracked for campaigns',
              },
              { label: 'WiFi QR', description: 'For posters, auto-connects to WiFi' },
            ],
          },
          {
            title: 'QR List',
            description: 'All your QR codes with name, type, scans count, and status.',
          },
          {
            title: 'Filters',
            description:
              'Filter by type (URL, WiFi), context (Table, Marketing), status (Active, Inactive).',
          },
        ],
        actions: [
          { name: 'Download', icon: '⬇️', description: 'Download PNG 512px' },
          { name: 'Edit', icon: '✏️', description: 'Modify settings' },
          { name: 'Copy URL', icon: '📋', description: 'Copy link to clipboard' },
          { name: 'Toggle', icon: '👁️', description: 'Activate/deactivate' },
          { name: 'Delete', icon: '🗑️', description: 'Delete (asks confirmation)' },
        ],
        workflows: [
          {
            title: 'Create QR for all tables',
            steps: [
              'Click "Table QR"',
              'Enter table number (e.g., "5")',
              'Customize design if desired',
              'Save and download',
              'Repeat for each table',
            ],
          },
          {
            title: 'Create marketing campaign QR',
            steps: [
              'Click "Marketing QR"',
              'Give a descriptive name (e.g., "Summer Flyer 2026")',
              'Optional: set scan limit or expiration date',
              'Save and download',
              'Monitor scans in Analytics',
            ],
          },
          {
            title: 'Temporarily disable QR',
            steps: [
              'Find QR in list',
              'Click eye icon (toggle)',
              'QR becomes gray and stops working',
              'Click again to reactivate',
            ],
          },
        ],
        faq: [
          {
            q: 'What happens when someone scans a disabled QR?',
            a: 'They see a "QR Inactive" page with link to menu and restaurant contacts.',
          },
          {
            q: 'Can I modify a QR after printing?',
            a: 'Yes! QR points to a fixed URL (go.gudbro.com/xxx). You can change the destination without reprinting.',
          },
          {
            q: 'How do I see QR statistics?',
            a: 'Click "View Analytics" top right, or go to /analytics?tab=qr.',
          },
          {
            q: 'Can I create QR with my logo?',
            a: 'Yes, Custom QR has options to upload logo and customize colors.',
          },
          {
            q: 'Is there a QR limit?',
            a: 'Depends on plan. Free: 10 QR, Pro: unlimited.',
          },
        ],
        tips: [
          'Use descriptive names for QR codes: "Table 5" is better than "QR 001"',
          'Marketing QRs are great for A/B testing: create 2 different QRs for same flyer and compare',
          'Always download PNG 512px for quality printing',
        ],
      },
      {
        id: 'hot-actions',
        path: '/hot-actions',
        title: 'Hot Actions',
        purpose: 'Quick access panel for frequent operations. Execute common tasks with one click.',
        navigation: ['Sidebar > Hot Actions', 'URL: /hot-actions'],
        whatYouSee: [
          {
            title: 'Action Buttons',
            items: [
              { label: 'Toggle Item Availability', description: 'Quick on/off for menu items' },
              { label: 'Update Prices', description: 'Batch price changes' },
              { label: 'Send Promotion', description: 'Quick promo blast' },
              { label: 'Staff Alert', description: 'Notify team members' },
            ],
          },
        ],
        workflows: [
          {
            title: 'Mark item as sold out',
            steps: [
              'Click "Toggle Item Availability"',
              'Search for the item',
              'Click toggle to mark unavailable',
              'Change reflects immediately on menu',
            ],
          },
        ],
        tips: [
          'Pin your most used actions to the top',
          'Hot Actions are faster than navigating to full pages for simple tasks',
        ],
      },
      {
        id: 'billing',
        path: '/billing',
        title: 'Billing',
        purpose: 'Manage your subscription, view invoices, and update payment methods.',
        navigation: ['Sidebar > Billing', 'URL: /billing'],
        whatYouSee: [
          {
            title: 'Current Plan',
            description: 'Your active subscription with features and limits.',
          },
          {
            title: 'Usage',
            description: 'Current usage vs plan limits (QR codes, orders, etc.).',
          },
          {
            title: 'Invoices',
            description: 'List of past invoices with download option.',
          },
          {
            title: 'Payment Method',
            description: 'Saved credit card or payment method.',
          },
        ],
        workflows: [
          {
            title: 'Upgrade plan',
            steps: [
              'Click "Change Plan"',
              'Select new plan',
              'Review price difference',
              'Confirm upgrade',
              'New features activate immediately',
            ],
          },
        ],
        faq: [
          {
            q: 'When does billing cycle start?',
            a: 'Billing cycle starts on the day you subscribed. Upgrades are prorated.',
          },
        ],
        tips: ['Check usage before hitting limits', 'Annual plans save ~20% compared to monthly'],
      },
      {
        id: 'account',
        path: '/account',
        title: 'Account',
        purpose: 'Manage your personal account settings, password, and profile.',
        navigation: ['Click avatar top-right > Account', 'URL: /account'],
        whatYouSee: [
          {
            title: 'Profile',
            description: 'Your name, email, and avatar.',
          },
          {
            title: 'Security',
            description: 'Password change and two-factor authentication.',
          },
          {
            title: 'Sessions',
            description: 'Active sessions and devices.',
          },
        ],
        workflows: [
          {
            title: 'Change password',
            steps: [
              'Go to Security section',
              'Enter current password',
              'Enter new password twice',
              'Click Save',
            ],
          },
        ],
        tips: ['Enable 2FA for better security', 'Review active sessions periodically'],
      },
      {
        id: 'help',
        path: '/help',
        title: 'Help & Knowledge Base',
        purpose:
          'In-app documentation and help center. Search for answers, browse guides, and learn how to use all features.',
        navigation: ['Sidebar > Help', 'Click ? icon', 'URL: /help'],
        whatYouSee: [
          {
            title: 'Section Navigation',
            description:
              'Browse by topic: Dashboard, Content, Food Cost, Marketing, AI, Orders, etc.',
          },
          {
            title: 'Search',
            description: 'Search across all documentation by keyword.',
          },
          {
            title: 'Page Content',
            items: [
              { label: 'Purpose', description: 'What this page does' },
              { label: 'What You See', description: 'UI elements explained' },
              { label: 'Actions', description: 'Available buttons and functions' },
              { label: 'Workflows', description: 'Step-by-step guides' },
              { label: 'FAQ', description: 'Common questions' },
              { label: 'Tips', description: 'Pro tips for efficiency' },
            ],
          },
        ],
        workflows: [
          {
            title: 'Find help for a feature',
            steps: [
              'Open Help from sidebar',
              'Use search or browse sections',
              'Click on relevant page',
              'Read purpose and workflows',
            ],
          },
        ],
        tips: [
          'Use search for fastest results',
          'Each page has step-by-step workflows',
          'FAQ answers common questions',
          'Help is always available from sidebar',
        ],
      },
    ],
  },

  // ============================================================
  // CONTENT MANAGEMENT
  // ============================================================
  {
    id: 'content',
    title: 'Content Management',
    icon: '📝',
    pages: [
      {
        id: 'content-overview',
        path: '/content',
        title: 'Content Overview',
        purpose:
          'Hub for all content management. Overview of menu items, categories, ingredients, and recipes.',
        navigation: ['Sidebar > Content', 'URL: /content'],
        whatYouSee: [
          {
            title: 'Content Stats',
            items: [
              { label: 'Menu Items', description: 'Total products in your menu' },
              { label: 'Categories', description: 'Menu categories' },
              { label: 'Ingredients', description: 'Master ingredients list' },
              { label: 'Recipes', description: 'Cocktail and drink recipes' },
            ],
          },
          {
            title: 'Quick Links',
            description: 'Cards linking to each content section.',
          },
        ],
        tips: ['Start with Categories, then add Items, then Ingredients for recipes'],
      },
      {
        id: 'menu',
        path: '/content/menu',
        title: 'Menu Items',
        purpose:
          'View and manage all menu items. Search, filter, add new items, and manage availability.',
        navigation: ['Sidebar > Content > Menu', 'URL: /content/menu'],
        whatYouSee: [
          {
            title: 'Item Grid',
            description: 'All menu items with image, name, price, category, and status.',
          },
          {
            title: 'Filters',
            items: [
              { label: 'Category', description: 'Filter by menu category' },
              { label: 'Status', description: 'Active, inactive, out of stock' },
              { label: 'Search', description: 'Search by name' },
            ],
          },
        ],
        actions: [
          { name: 'Add Item', description: 'Create new menu item' },
          { name: 'Bulk Edit', description: 'Edit multiple items at once' },
          { name: 'Export', description: 'Export menu data' },
        ],
        workflows: [
          {
            title: 'Add new menu item',
            steps: [
              'Click "Add Item" button',
              'Fill basic info: name, price, category',
              'Upload image',
              'Add ingredients (for allergen calculation)',
              'Set availability',
              'Save',
            ],
          },
        ],
        tips: [
          'Use categories to organize your menu logically',
          'Always add ingredients for automatic allergen detection',
          'Featured items appear at top of customer menu',
        ],
      },
      {
        id: 'menu-item-editor',
        path: '/content/menu/[slug]',
        title: 'Menu Item Editor',
        purpose:
          'Complete editor for a single menu item. Manage name, price, ingredients, allergens, customizations, and availability.',
        navigation: ['From /content/menu click on item', 'URL: /content/menu/[item-slug]'],
        whatYouSee: [
          {
            title: 'Tab 1: Basic Info',
            items: [
              { label: 'Name', description: 'Item name in multiple languages (EN, VI, IT)' },
              { label: 'Description', description: 'Description in multiple languages' },
              { label: 'Category', description: 'Which category this belongs to' },
              { label: 'Image', description: 'Product photo' },
              { label: 'Pricing', description: 'Price and strikethrough price for discounts' },
            ],
          },
          {
            title: 'Tab 2: Ingredients',
            items: [
              { label: 'Add from library', description: 'Select ingredients from master list' },
              { label: 'Quantity', description: 'Amount in grams per ingredient' },
              {
                label: 'Optional flag',
                description: 'Mark as optional (excluded from allergen calc)',
              },
            ],
          },
          {
            title: 'Tab 3: Safety & Dietary',
            items: [
              {
                label: 'Allergens',
                description: 'EU 14 + Korea 7 + Japan 7 + GUDBRO 2 = 30 total',
              },
              { label: 'Intolerances', description: '10 intolerances' },
              { label: 'Dietary', description: 'Vegan, halal, kosher, etc. (12 types)' },
              { label: 'Spiciness', description: 'Level 0-5' },
              { label: 'Nutrition', description: 'Calories, protein, carbs, fat' },
            ],
          },
          {
            title: 'Tab 4: Customizations',
            items: [
              { label: 'Groups', description: 'Create groups like "Size", "Milk Type"' },
              { label: 'Options', description: 'Options with name and price modifier' },
              { label: 'Required/Optional', description: 'Whether customer must choose' },
              { label: 'Default', description: 'Pre-selected option' },
            ],
          },
          {
            title: 'Tab 5: Availability',
            items: [
              { label: 'Active toggle', description: 'Enable/disable item' },
              { label: 'Available toggle', description: 'In stock or sold out' },
              { label: 'Featured/New', description: 'Highlight badges' },
              { label: 'Time slots', description: 'Available only during certain hours' },
              { label: 'Inventory', description: 'Stock count and low-stock threshold' },
            ],
          },
          {
            title: 'Tab 6: SEO & Tags',
            items: [
              { label: 'URL Slug', description: 'URL-friendly identifier' },
              { label: 'Tags', description: 'For search and filtering' },
              { label: 'Sort order', description: 'Display order in category' },
            ],
          },
        ],
        workflows: [
          {
            title: 'Add complete new item',
            steps: [
              'Basic Info: name (EN required), price, category',
              'Ingredients: add all with quantities',
              'Safety: verify auto-calculated allergens, add manual if needed',
              'Customizations: create options if applicable',
              'Availability: activate and mark as "New"',
              'Save',
            ],
          },
          {
            title: 'Mark item sold out (quick)',
            steps: ['Go to Availability tab', 'Turn off "Available" toggle', 'Save'],
          },
          {
            title: 'Auto-calculate allergens',
            steps: [
              'Go to Ingredients tab',
              'Add all ingredients with quantities',
              'System calculates allergens automatically',
              'Go to Safety tab to verify',
            ],
          },
        ],
        faq: [
          {
            q: 'How does automatic allergen calculation work?',
            a: 'Each ingredient has pre-configured allergens. When you add ingredients, system does logical OR: if any ingredient contains gluten, dish contains gluten.',
          },
          {
            q: 'Can I override auto-calculated allergens?',
            a: 'Yes, go to Safety tab and modify manually. Shows "Computed" or "Manual" source.',
          },
          {
            q: 'How do I add ingredient that does not exist?',
            a: 'Go to /content/ingredients to add new ingredients to master list.',
          },
          {
            q: 'What are "Optional" ingredients?',
            a: 'Not counted in allergen calculation. Useful for optional garnishes.',
          },
        ],
        tips: [
          'Always complete Ingredients tab: calculates allergens AND calories',
          'Use tags to group items (e.g., "summer", "bestseller", "spicy")',
          '"Unsaved changes" badge warns if you have pending edits',
        ],
      },
      {
        id: 'categories',
        path: '/content/categories',
        title: 'Categories',
        purpose: 'Create and manage menu categories. Control display order and visibility.',
        navigation: ['Sidebar > Content > Categories', 'URL: /content/categories'],
        whatYouSee: [
          {
            title: 'Category List',
            description: 'All categories with name, item count, and status.',
          },
          {
            title: 'Drag Handle',
            description: 'Reorder categories by dragging.',
          },
        ],
        actions: [
          { name: 'Add Category', description: 'Create new category' },
          { name: 'Edit', description: 'Modify category details' },
          { name: 'Delete', description: 'Remove category (moves items to uncategorized)' },
        ],
        workflows: [
          {
            title: 'Create category structure',
            steps: [
              'Click "Add Category"',
              'Enter name in all languages',
              'Set icon/emoji',
              'Save',
              'Drag to reorder in menu',
            ],
          },
        ],
        tips: [
          'Category order = menu display order',
          'Use descriptive names customers understand',
          'Limit to 8-10 categories for easy navigation',
        ],
      },
      {
        id: 'ingredients',
        path: '/content/ingredients',
        title: 'Ingredients Library',
        purpose:
          'Master list of all ingredients. Each ingredient has allergens, nutrition, and can be used across menu items.',
        navigation: ['Sidebar > Content > Ingredients', 'URL: /content/ingredients'],
        whatYouSee: [
          {
            title: 'Ingredient List',
            description: 'All ingredients with name, allergens, and usage count.',
          },
          {
            title: 'Search',
            description: 'Search by name or allergen.',
          },
          {
            title: 'Filters',
            description: 'Filter by allergen type or category.',
          },
        ],
        actions: [
          { name: 'Add Ingredient', description: 'Create new ingredient' },
          { name: 'Import', description: 'Bulk import from CSV' },
          { name: 'Export', description: 'Export ingredient data' },
        ],
        workflows: [
          {
            title: 'Add new ingredient',
            steps: [
              'Click "Add Ingredient"',
              'Enter name in all languages',
              'Select allergens this ingredient contains',
              'Add nutrition info if available',
              'Save',
            ],
          },
        ],
        faq: [
          {
            q: 'What happens if I edit ingredient allergens?',
            a: 'All menu items using this ingredient will have allergens recalculated.',
          },
          {
            q: 'Can I see which dishes use an ingredient?',
            a: 'Yes, click ingredient to see usage list.',
          },
        ],
        tips: [
          'Set allergens correctly here - all dishes will inherit them',
          'GUDBRO comes with 2500+ pre-configured ingredients with nutrition',
        ],
      },
      {
        id: 'recipes',
        path: '/content/recipes',
        title: 'Recipes',
        purpose:
          'Manage cocktail and beverage recipes with detailed preparation steps and ingredients.',
        navigation: ['Sidebar > Content > Recipes', 'URL: /content/recipes'],
        whatYouSee: [
          {
            title: 'Recipe Cards',
            description: 'All recipes with image, name, and category.',
          },
          {
            title: 'Filters',
            description: 'Filter by type (cocktails, mocktails, coffee, etc.).',
          },
        ],
        actions: [
          { name: 'Add Recipe', description: 'Create new recipe' },
          { name: 'Import', description: 'Import from template' },
        ],
        tips: ['Recipes are great for training staff on preparation', 'Link recipes to menu items'],
      },
      {
        id: 'recipe-editor',
        path: '/content/recipes/[slug]',
        title: 'Recipe Editor',
        purpose:
          'Detailed editor for individual recipes with ingredients, steps, and serving info.',
        navigation: ['From /content/recipes click on recipe', 'URL: /content/recipes/[slug]'],
        whatYouSee: [
          {
            title: 'Basic Info',
            description: 'Name, description, category, image.',
          },
          {
            title: 'Ingredients',
            description: 'List with quantities and units.',
          },
          {
            title: 'Steps',
            description: 'Ordered preparation steps.',
          },
          {
            title: 'Serving',
            description: 'Glass type, garnish, serving notes.',
          },
        ],
        tips: ['Add photos for each step for visual guides', 'Include timing information'],
      },
      {
        id: 'wines',
        path: '/content/wines',
        title: 'Wine List',
        purpose:
          'Manage wine inventory with detailed information about origin, vintage, and pairing.',
        navigation: ['Sidebar > Content > Wines', 'URL: /content/wines'],
        whatYouSee: [
          {
            title: 'Wine Grid',
            description: 'All wines with label, name, vintage, price.',
          },
          {
            title: 'Filters',
            description: 'By type (red, white, sparkling), region, price range.',
          },
        ],
        tips: ['Add food pairing suggestions', 'Include tasting notes for staff'],
      },
      {
        id: 'modifiers',
        path: '/content/modifiers',
        title: 'Modifiers',
        purpose:
          'Create reusable modifier groups that can be applied to multiple items (e.g., "Size" for all drinks).',
        navigation: ['Sidebar > Content > Modifiers', 'URL: /content/modifiers'],
        whatYouSee: [
          {
            title: 'Modifier Groups',
            description: 'Groups like "Size", "Temperature", "Milk Type".',
          },
          {
            title: 'Options',
            description: 'Options within each group with price modifiers.',
          },
        ],
        workflows: [
          {
            title: 'Create reusable modifier group',
            steps: [
              'Click "Add Modifier Group"',
              'Name it (e.g., "Size")',
              'Add options (Small +0, Medium +15, Large +30)',
              'Save',
              'Apply to menu items',
            ],
          },
        ],
        tips: [
          'Reusable modifiers save time when adding similar items',
          'Price modifiers can be positive or negative',
        ],
      },
      {
        id: 'menu-builder',
        path: '/content/menu-builder',
        title: 'Menu Builder',
        purpose: 'Visual drag-and-drop builder for organizing your digital menu layout.',
        navigation: ['Sidebar > Content > Menu Builder', 'URL: /content/menu-builder'],
        whatYouSee: [
          {
            title: 'Canvas',
            description: 'Visual representation of your menu layout.',
          },
          {
            title: 'Components',
            description: 'Drag sections, items, dividers, and images.',
          },
          {
            title: 'Preview',
            description: 'Live preview of customer view.',
          },
        ],
        tips: [
          'Use the preview to see exactly what customers see',
          'Featured items should be near the top',
        ],
      },
      {
        id: 'contributions',
        path: '/content/contributions',
        title: 'Contributions',
        purpose: 'View and manage user-contributed content like photos and reviews.',
        navigation: ['Sidebar > Content > Contributions', 'URL: /content/contributions'],
        whatYouSee: [
          {
            title: 'User Photos',
            description: 'Photos customers have uploaded.',
          },
          {
            title: 'Moderation Queue',
            description: 'Pending content awaiting approval.',
          },
        ],
        actions: [
          { name: 'Approve', description: 'Publish content' },
          { name: 'Reject', description: 'Remove from queue' },
          { name: 'Feature', description: 'Highlight on menu' },
        ],
        tips: ['User photos add authenticity', 'Review regularly to keep content fresh'],
      },
    ],
  },

  // ============================================================
  // FOOD COSTS
  // ============================================================
  {
    id: 'food-costs',
    title: 'Food Costs',
    icon: '💰',
    pages: [
      {
        id: 'food-cost-dashboard',
        path: '/food-cost',
        title: 'Food Cost Dashboard',
        purpose:
          'Analyze food costs across your menu. See margin analysis, identify high-cost items, and optimize pricing.',
        navigation: ['Sidebar > Food Cost', 'URL: /food-cost'],
        whatYouSee: [
          {
            title: 'AI Insights',
            description: 'AI-generated insights about food cost optimization.',
          },
          {
            title: 'Summary Stats',
            items: [
              { label: 'Average Food Cost', description: 'Overall percentage across menu' },
              { label: 'Items at Risk', description: 'Items above 35% food cost' },
              { label: 'Critical Items', description: 'Items above 45% food cost' },
              {
                label: 'Total Savings Potential',
                description: 'Estimated savings from optimization',
              },
            ],
          },
          {
            title: 'Item Analysis Table',
            description: 'All items with cost breakdown, margin, and recommendations.',
          },
        ],
        workflows: [
          {
            title: 'Identify problem items',
            steps: [
              'Sort by food cost percentage (highest first)',
              'Items >35% are warnings, >45% are critical',
              'Click item for detailed analysis',
              'Review AI suggestions',
            ],
          },
        ],
        faq: [
          {
            q: 'What is a healthy food cost percentage?',
            a: 'Generally 28-32% is healthy. Above 35% needs attention. Above 45% is critical.',
          },
          {
            q: 'How is food cost calculated?',
            a: 'Ingredient costs / selling price × 100. Requires accurate ingredient costs.',
          },
        ],
        tips: [
          'Update ingredient costs regularly for accurate analysis',
          'AI suggestions consider portion size, pricing, and alternatives',
          'Focus on high-volume items first for maximum impact',
        ],
      },
      {
        id: 'food-cost-ingredients',
        path: '/food-costs/ingredients',
        title: 'Ingredient Costs',
        purpose:
          'Set and manage costs for all ingredients. This data powers food cost calculations.',
        navigation: ['Sidebar > Food Cost > Ingredients', 'URL: /food-costs/ingredients'],
        whatYouSee: [
          {
            title: 'Ingredient Cost List',
            description: 'All ingredients with unit, cost per unit, supplier.',
          },
          {
            title: 'Last Updated',
            description: 'When each cost was last updated.',
          },
        ],
        actions: [
          { name: 'Update Cost', description: 'Change ingredient price' },
          { name: 'Bulk Import', description: 'Import costs from supplier CSV' },
          { name: 'Set Supplier', description: 'Associate with supplier' },
        ],
        workflows: [
          {
            title: 'Update ingredient costs after price change',
            steps: [
              'Find ingredient in list',
              'Click "Update Cost"',
              'Enter new cost per unit',
              'Save',
              'Food cost recalculates automatically',
            ],
          },
        ],
        tips: [
          'Set reminder to update costs monthly',
          'Import from supplier invoices for accuracy',
          'Costs affect all dishes using that ingredient',
        ],
      },
      {
        id: 'food-costs-list',
        path: '/food-costs',
        title: 'Menu Item Costs',
        purpose:
          'View all menu items with their food costs and profit margins. Identify items needing attention and track profitability.',
        navigation: ['Sidebar > Food Cost > Item List', 'URL: /food-costs'],
        whatYouSee: [
          {
            title: 'Summary Stats',
            items: [
              { label: 'Total Items', description: 'Menu items with cost data' },
              { label: 'Needs Recipe', description: 'Items without ingredients/cost' },
              { label: 'Avg Margin', description: 'Average profit margin across menu' },
            ],
          },
          {
            title: 'Item Table',
            items: [
              { label: 'Name', description: 'Menu item name' },
              { label: 'Price', description: 'Selling price' },
              { label: 'Food Cost', description: 'Cost to make' },
              { label: 'Margin', description: 'Profit margin percentage' },
              {
                label: 'Status',
                description: 'Color-coded: green (>70%), yellow (50-70%), red (<50%)',
              },
            ],
          },
          {
            title: 'Filters',
            items: [
              { label: 'Search', description: 'Search by item name' },
              { label: 'Category', description: 'Filter by menu category' },
              { label: 'Sort', description: 'By margin or cost (asc/desc)' },
              { label: 'Needs Recipe', description: 'Show only items without cost data' },
            ],
          },
        ],
        actions: [
          { name: 'View Item', description: 'Open item details' },
          { name: 'Add Recipe', description: 'Add ingredients to calculate cost' },
        ],
        workflows: [
          {
            title: 'Find low-margin items',
            steps: [
              'Sort by margin ascending',
              'Red items (<50% margin) need attention',
              'Click item to see ingredient breakdown',
              'Adjust recipe or price',
            ],
          },
          {
            title: 'Complete missing costs',
            steps: [
              'Enable "Needs Recipe" filter',
              'Click item to add ingredients',
              'Add recipe with quantities',
              'Cost calculates automatically',
            ],
          },
        ],
        faq: [
          {
            q: 'Why are some items red?',
            a: 'Red means profit margin below 50% - these items may be losing money or priced too low.',
          },
          {
            q: 'Why is cost showing as "—"?',
            a: 'Item has no recipe/ingredients added. Add a recipe to calculate food cost.',
          },
        ],
        tips: [
          'Focus on red items first - they impact profit most',
          'Yellow items (50-70% margin) may need minor adjustments',
          'Green items (>70% margin) are performing well',
          'Update ingredient costs regularly for accurate margins',
        ],
      },
      {
        id: 'food-cost-onboarding',
        path: '/food-cost/onboarding',
        title: 'Food Cost Setup',
        purpose: 'Guided setup for food cost tracking. Configure suppliers, costs, and targets.',
        navigation: ['First time visiting /food-cost', 'URL: /food-cost/onboarding'],
        whatYouSee: [
          {
            title: 'Setup Wizard',
            description: 'Step-by-step guide to configure food cost tracking.',
          },
        ],
        tips: ['Complete all steps for accurate analysis', 'You can skip and return later'],
      },
    ],
  },

  // ============================================================
  // MARKETING
  // ============================================================
  {
    id: 'marketing',
    title: 'Marketing',
    icon: '📣',
    pages: [
      {
        id: 'promotions',
        path: '/marketing/promotions',
        title: 'Promotions',
        purpose: 'Create and manage promotional offers, discounts, and special deals.',
        navigation: ['Sidebar > Marketing > Promotions', 'URL: /marketing/promotions'],
        whatYouSee: [
          {
            title: 'Active Promotions',
            description: 'Currently running promotions with performance.',
          },
          {
            title: 'Scheduled',
            description: 'Upcoming promotions.',
          },
          {
            title: 'Ended',
            description: 'Past promotions with results.',
          },
        ],
        actions: [
          { name: 'Create Promotion', description: 'New promotional offer' },
          { name: 'Duplicate', description: 'Copy existing promotion' },
          { name: 'End Early', description: 'Stop promotion before end date' },
        ],
        workflows: [
          {
            title: 'Create percentage discount',
            steps: [
              'Click "Create Promotion"',
              'Select type: Percentage Discount',
              'Set percentage (e.g., 15%)',
              'Choose applicable items or categories',
              'Set start and end dates',
              'Optional: add usage limits',
              'Save and activate',
            ],
          },
        ],
        tips: [
          'Limited-time offers create urgency',
          'Track performance in Analytics',
          'Combine with QR marketing campaigns',
        ],
      },
      {
        id: 'loyalty',
        path: '/marketing/loyalty',
        title: 'Loyalty Program',
        purpose: 'Configure and manage customer loyalty rewards. Points, tiers, and redemptions.',
        navigation: ['Sidebar > Marketing > Loyalty', 'URL: /marketing/loyalty'],
        whatYouSee: [
          {
            title: 'Program Overview',
            description: 'Current loyalty program settings.',
          },
          {
            title: 'Tiers',
            description: 'Loyalty levels (Bronze, Silver, Gold).',
          },
          {
            title: 'Rewards Catalog',
            description: 'Rewards customers can redeem.',
          },
          {
            title: 'Member Stats',
            description: 'Active members and points distributed.',
          },
        ],
        workflows: [
          {
            title: 'Set up points system',
            steps: [
              'Configure points earning (e.g., 1 point per $1 spent)',
              'Create rewards with point values',
              'Set tier thresholds',
              'Activate program',
            ],
          },
        ],
        tips: [
          'Simple programs work better than complex ones',
          'Make first reward achievable quickly to hook customers',
        ],
      },
      {
        id: 'events',
        path: '/marketing/events',
        title: 'Events',
        purpose: 'Create and promote special events at your venue.',
        navigation: ['Sidebar > Marketing > Events', 'URL: /marketing/events'],
        whatYouSee: [
          {
            title: 'Event Calendar',
            description: 'Visual calendar of upcoming events.',
          },
          {
            title: 'Event List',
            description: 'All events with RSVPs and details.',
          },
        ],
        actions: [
          { name: 'Create Event', description: 'New event' },
          { name: 'Promote', description: 'Share event' },
          { name: 'Manage RSVPs', description: 'View attendees' },
        ],
        tips: ['Events can boost slow days', 'Share event QR code for easy RSVP'],
      },
      {
        id: 'challenges',
        path: '/marketing/challenges',
        title: 'Challenges',
        purpose:
          'Create gamified challenges to engage customers (e.g., "Try 5 coffees, get 1 free").',
        navigation: ['Sidebar > Marketing > Challenges', 'URL: /marketing/challenges'],
        whatYouSee: [
          {
            title: 'Active Challenges',
            description: 'Currently running challenges.',
          },
          {
            title: 'Participation',
            description: 'How many customers are participating.',
          },
          {
            title: 'Completions',
            description: 'Successful challenge completions.',
          },
        ],
        workflows: [
          {
            title: 'Create a challenge',
            steps: [
              'Click "Create Challenge"',
              'Set goal (e.g., "Order 5 different drinks")',
              'Set reward for completion',
              'Set time limit (optional)',
              'Activate',
            ],
          },
        ],
        tips: ['Challenges drive repeat visits', 'Keep goals achievable but meaningful'],
      },
    ],
  },

  // ============================================================
  // CUSTOMERS
  // ============================================================
  {
    id: 'customers',
    title: 'Customers',
    icon: '👥',
    pages: [
      {
        id: 'customers-overview',
        path: '/customers',
        title: 'Customers Overview',
        purpose: 'View all your customers, their activity, and basic CRM functions.',
        navigation: ['Sidebar > Customers', 'URL: /customers'],
        whatYouSee: [
          {
            title: 'Customer Stats',
            items: [
              { label: 'Total Customers', description: 'All registered customers' },
              { label: 'Active', description: 'Customers active in last 30 days' },
              { label: 'New This Month', description: 'Recently acquired customers' },
            ],
          },
          {
            title: 'Customer List',
            description: 'Searchable list with name, email, last visit, total spent.',
          },
        ],
        actions: [
          { name: 'Add Customer', description: 'Manually add customer' },
          { name: 'Import', description: 'Bulk import from CSV' },
          { name: 'Export', description: 'Export customer data' },
        ],
        tips: [
          'Customers auto-register when they scan QR and enter email',
          'Use segments for targeted marketing',
        ],
      },
      {
        id: 'customer-detail',
        path: '/customers/[accountId]',
        title: 'Customer Profile',
        purpose:
          'Detailed view of individual customer with metrics, churn risk, history, and AI recommendations.',
        navigation: ['From /customers click on customer', 'URL: /customers/[uuid]'],
        whatYouSee: [
          {
            title: 'Header',
            items: [
              { label: 'Avatar', description: 'Customer photo or initials' },
              { label: 'Name & Email', description: 'Contact info' },
              { label: 'Segment', description: 'Champion, Loyal, At Risk, etc.' },
              { label: 'CLV', description: 'Customer Lifetime Value' },
            ],
          },
          {
            title: 'Metrics Cards',
            items: [
              { label: 'Lifetime Value', description: 'Total estimated value' },
              { label: 'Total Orders', description: 'Number of orders' },
              { label: 'Avg Order', description: 'Average order value' },
              { label: 'Loyalty Points', description: 'Accumulated points' },
            ],
          },
          {
            title: 'Churn Risk',
            description: 'Gauge 0-100% with risk factors and predicted next visit.',
          },
          {
            title: 'AI Recommendations',
            description: 'Suggested actions with priority and expected ROI.',
          },
          {
            title: 'Activity Summary',
            description: 'Visits, last visit, feedback count, average rating.',
          },
          {
            title: 'Trigger History',
            description: 'All automated triggers executed for this customer.',
          },
        ],
        actions: [
          { name: 'Message', description: 'Send direct message' },
          { name: 'Send Promo', description: 'Send personalized promotion' },
          { name: 'Execute Action', description: 'Run AI-suggested action' },
        ],
        workflows: [
          {
            title: 'Reactivate dormant customer',
            steps: [
              'Check churn risk score',
              'Read risk factors',
              'Review AI recommendations',
              'Click "Send Promo" with personalized offer',
              'Monitor in Trigger History for conversion',
            ],
          },
          {
            title: 'Analyze VIP customer',
            steps: [
              'Check CLV and segment',
              'Review order frequency and average',
              'Check feedback and ratings',
              'Consider for special loyalty program',
            ],
          },
        ],
        tips: [
          'AI recommendations learn from feedback',
          'Segment changes trigger automated actions if configured',
        ],
      },
      {
        id: 'intelligence',
        path: '/customers/intelligence',
        title: 'Customer Intelligence',
        purpose:
          'AI-powered dashboard analyzing customer base. Segmentation, churn risk, and CLV analysis.',
        navigation: ['Sidebar > Customers > Intelligence', 'URL: /customers/intelligence'],
        whatYouSee: [
          {
            title: 'Summary Stats',
            items: [
              { label: 'Total CLV', description: 'Total customer lifetime value' },
              { label: 'Customers Analyzed', description: 'Customers with AI analysis' },
              { label: 'At Risk', description: 'Customers with high churn risk' },
              { label: 'Average CLV', description: 'Mean customer value' },
            ],
          },
          {
            title: 'Urgent Banner',
            description: 'If at-risk customers exist, shows revenue at risk.',
          },
          {
            title: 'Segments',
            description:
              '7 automatic segments: Champion, Loyal, Potential, New, At Risk, Dormant, Lost.',
          },
          {
            title: 'Top Recommended Actions',
            description: 'AI-suggested actions, clickable to customer profile.',
          },
          {
            title: 'At-Risk Table',
            description: 'At-risk customers sorted by CLV.',
          },
        ],
        actions: [
          { name: 'Sync', description: 'Update data from analytics' },
          { name: 'Analyze All', description: 'Recalculate AI for all customers' },
          { name: 'View Details', description: 'Open customer profile' },
        ],
        workflows: [
          {
            title: 'Weekly customer check',
            steps: [
              'Check urgent banner for revenue at risk',
              'Review top 3 recommended actions',
              'Click on at-risk customers to see details',
              'Use "Send Promo" or "Message" to reactivate',
            ],
          },
          {
            title: 'Initial setup',
            steps: [
              'Click "Sync" to import analytics data',
              'Click "Analyze All" to generate AI intelligence',
              'Wait for calculation',
              'Review segments and actions',
            ],
          },
        ],
        faq: [
          {
            q: 'How is CLV calculated?',
            a: 'Based on order history, visit frequency, average order value, and behavioral patterns.',
          },
          {
            q: 'What is churn risk score?',
            a: 'Probability (0-100%) that customer will stop visiting. High = urgent action needed.',
          },
          {
            q: 'Does data update automatically?',
            a: 'No, use "Sync" and "Analyze All" to update manually.',
          },
        ],
        tips: [
          'Focus on at-risk customers with high CLV first',
          'Champion customers are your advocates - keep them happy',
          'Segment changes can trigger automated actions',
        ],
      },
      {
        id: 'followers',
        path: '/customers/followers',
        title: 'Followers',
        purpose: 'Manage customers who follow your brand for updates and notifications.',
        navigation: ['Sidebar > Customers > Followers', 'URL: /customers/followers'],
        whatYouSee: [
          {
            title: 'Follower Count',
            description: 'Total followers across channels.',
          },
          {
            title: 'Follower List',
            description: 'All followers with join date and engagement.',
          },
        ],
        tips: ['Followers are opted-in for marketing', 'Grow followers with incentives'],
      },
      {
        id: 'feedback',
        path: '/customers/feedback',
        title: 'Feedback',
        purpose: 'View and respond to customer feedback and reviews.',
        navigation: ['Sidebar > Customers > Feedback', 'URL: /customers/feedback'],
        whatYouSee: [
          {
            title: 'Recent Feedback',
            description: 'Latest reviews and comments.',
          },
          {
            title: 'Rating Distribution',
            description: 'Breakdown of ratings (1-5 stars).',
          },
          {
            title: 'Response Status',
            description: 'Pending responses vs answered.',
          },
        ],
        actions: [
          { name: 'Respond', description: 'Reply to feedback' },
          { name: 'Flag', description: 'Mark for attention' },
          { name: 'Archive', description: 'Move to archive' },
        ],
        tips: ['Respond to negative feedback within 24 hours', 'Thank positive reviewers'],
      },
    ],
  },

  // ============================================================
  // AI
  // ============================================================
  {
    id: 'ai',
    title: 'AI Co-Manager',
    icon: '🤖',
    pages: [
      {
        id: 'ai-hub',
        path: '/ai',
        title: 'AI Hub',
        purpose:
          'Central hub for AI features. Access AI chat, see AI activity, and manage AI settings.',
        navigation: ['Sidebar > AI', 'URL: /ai'],
        whatYouSee: [
          {
            title: 'AI Status',
            description: 'Current AI learning status and activity.',
          },
          {
            title: 'Recent AI Actions',
            description: 'What AI has done recently.',
          },
          {
            title: 'Quick Access',
            description: 'Links to Triggers, Intelligence, etc.',
          },
        ],
        tips: ['AI learns from your feedback', 'Chat with AI using the floating button'],
      },
      {
        id: 'triggers',
        path: '/ai/triggers',
        title: 'AI Triggers',
        purpose:
          'Create and manage automated AI triggers. Automate promotions, alerts, and actions based on customer behavior.',
        navigation: ['Sidebar > AI > Triggers', 'URL: /ai/triggers'],
        whatYouSee: [
          {
            title: 'Trigger Types',
            items: [
              {
                label: 'Churn Risk',
                description: 'Activates when customer reaches risk threshold',
              },
              { label: 'Inactivity', description: 'Activates after X days without visit' },
              { label: 'Birthday', description: 'Activates on customer birthday' },
              { label: 'Milestone', description: 'Activates on achievements (10 orders, etc.)' },
              { label: 'Segment Change', description: 'Activates when customer changes segment' },
              { label: 'Custom', description: 'Custom rules with multiple conditions' },
            ],
          },
          {
            title: 'Trigger Cards',
            description: 'Active triggers showing name, type, status, performance.',
          },
          {
            title: 'ROI Stats',
            description: 'Cost, revenue, and ROI for each trigger.',
          },
        ],
        actions: [
          { name: 'Create Trigger', description: 'New automated trigger' },
          { name: 'Edit', description: 'Modify existing trigger' },
          { name: 'Pause', description: 'Temporarily stop trigger' },
          { name: 'Delete', description: 'Remove trigger' },
        ],
        workflows: [
          {
            title: 'Create win-back trigger',
            steps: [
              'Click "Create Trigger"',
              'Step 1: Select "Churn Risk"',
              'Step 2: Set conditions (e.g., High + Critical)',
              'Step 3: Select action "Promo" with 15% discount',
              'Step 4: Set budget (e.g., $500, max 100 uses)',
              'Step 5: Review and activate',
            ],
          },
          {
            title: 'Monitor performance',
            steps: [
              'Check ROI cards on page',
              'Click trigger for details',
              'Review: triggered, converted, conversion rate',
              'Adjust budget or conditions if needed',
            ],
          },
        ],
        faq: [
          {
            q: 'Do triggers run automatically?',
            a: 'Yes, system monitors customers and activates triggers when conditions are met.',
          },
          {
            q: 'Can I pause a trigger?',
            a: 'Yes, use toggle or dropdown menu > Pause.',
          },
          {
            q: 'How do I see trigger ROI?',
            a: 'Each trigger card shows cost, revenue, ROI ratio, conversions.',
          },
          {
            q: 'What happens when budget is exhausted?',
            a: 'Trigger auto-pauses with reason "budget_exhausted".',
          },
        ],
        tips: [
          'Start simple (churn risk) before creating custom triggers',
          'Use budget to control spending',
          'Monitor ROI and disable low-performing triggers',
          '"AI Suggestion" button suggests triggers based on your data',
        ],
      },
    ],
  },

  // ============================================================
  // CUSTOMER CHAT
  // ============================================================
  {
    id: 'chat',
    title: 'Customer Chat',
    icon: '💬',
    pages: [
      {
        id: 'chat-conversation',
        path: '/chat/conversations/[id]',
        title: 'Chat Conversation',
        purpose:
          'View and respond to customer conversations. AI handles initial responses, staff can take over when needed.',
        navigation: [
          'Click on conversation from escalations',
          'URL: /chat/conversations/[conversation-id]',
        ],
        whatYouSee: [
          {
            title: 'Conversation Header',
            items: [
              { label: 'Customer Name', description: 'Name if provided' },
              { label: 'Channel', description: 'WhatsApp, Telegram, LINE, Zalo, or Web Widget' },
              { label: 'Status', description: 'Active, resolved, or escalated' },
              { label: 'Topic', description: 'AI-detected conversation topic' },
            ],
          },
          {
            title: 'Message Thread',
            items: [
              { label: 'Customer messages', description: 'Gray background' },
              { label: 'AI responses', description: 'Blue background' },
              { label: 'Staff responses', description: 'Green background' },
              { label: 'System notes', description: 'Yellow background, smaller text' },
            ],
          },
          {
            title: 'Customer Info Sidebar',
            items: [
              { label: 'Contact', description: 'Phone, email if available' },
              { label: 'Linked Reservation', description: 'If conversation relates to a booking' },
              { label: 'Message Count', description: 'Total messages in conversation' },
            ],
          },
        ],
        actions: [
          { name: 'Send Message', description: 'Reply as staff (green bubble)' },
          { name: 'Back to Escalations', description: 'Return to escalations list' },
        ],
        workflows: [
          {
            title: 'Take over from AI',
            steps: [
              'Read the conversation history',
              'Understand customer question/issue',
              'Type your response in the message box',
              'Click Send',
              'Your message appears as green (staff)',
            ],
          },
          {
            title: 'Handle reservation inquiry',
            steps: [
              'Check "Linked Reservation" in sidebar',
              'Click to view reservation details',
              'Respond with booking confirmation or changes',
              'Customer receives response on their channel',
            ],
          },
        ],
        faq: [
          {
            q: 'Which channels are supported?',
            a: 'WhatsApp, Telegram, LINE, Zalo, and web chat widget. More coming soon.',
          },
          {
            q: 'Can AI handle everything automatically?',
            a: 'AI handles common questions (hours, menu, reservations). Complex issues escalate to staff.',
          },
          {
            q: 'How do I know when to intervene?',
            a: 'Check Escalations page for conversations that need human attention.',
          },
        ],
        tips: [
          'AI learns from your responses - good answers improve future AI behavior',
          'Conversations auto-refresh every 5 seconds',
          'Use quick templates for common responses (coming soon)',
        ],
      },
      {
        id: 'chat-escalations',
        path: '/chat/escalations',
        title: 'Escalations',
        purpose:
          'Manage conversations that need human attention. AI escalates when uncertain, customer requests human, or detects negative sentiment.',
        navigation: ['Sidebar > Chat > Escalations', 'URL: /chat/escalations'],
        whatYouSee: [
          {
            title: 'Escalation Stats',
            items: [
              { label: 'Pending', description: 'Waiting for staff attention' },
              { label: 'In Progress', description: 'Being handled by staff' },
              { label: 'Resolved', description: 'Completed escalations' },
            ],
          },
          {
            title: 'Escalation Cards',
            items: [
              { label: 'Customer Info', description: 'Name, phone, email if available' },
              { label: 'Channel', description: 'WhatsApp, Telegram, LINE, Zalo, Widget' },
              {
                label: 'Reason',
                description: 'Why AI escalated (customer request, uncertainty, complaint)',
              },
              { label: 'AI Summary', description: 'AI-generated summary of the issue' },
              { label: 'Priority', description: 'Low, Normal, High, Urgent' },
              { label: 'Time Waiting', description: 'How long customer has been waiting' },
            ],
          },
          {
            title: 'Filters',
            description: 'Filter by status (pending, assigned, in_progress, resolved, closed).',
          },
        ],
        actions: [
          { name: 'View Conversation', description: 'Open full chat thread' },
          { name: 'Assign', description: 'Assign to staff member' },
          { name: 'Resolve', description: 'Mark as resolved' },
          { name: 'Refresh', description: 'Reload escalation list' },
        ],
        workflows: [
          {
            title: 'Handle escalation',
            steps: [
              'Check pending escalations',
              'Review AI summary for context',
              'Click escalation card to view conversation',
              'Read full thread',
              'Respond to customer',
              'Return and mark as resolved',
            ],
          },
          {
            title: 'Prioritize urgent issues',
            steps: [
              'Sort by priority (urgent first)',
              'Check time waiting (older = more urgent)',
              'Handle complaints and payment issues first',
              'Then customer requests and AI uncertainty',
            ],
          },
        ],
        faq: [
          {
            q: 'What triggers an escalation?',
            a: 'Customer requests human, AI is uncertain, negative sentiment detected, complex issue, complaint, payment problem, or urgent matter.',
          },
          {
            q: 'What do the priorities mean?',
            a: 'Low = minor questions. Normal = standard requests. High = important issues. Urgent = immediate attention needed (complaints, payment).',
          },
          {
            q: 'Can I auto-assign escalations?',
            a: 'Coming soon. Currently manual assignment.',
          },
        ],
        tips: [
          'Check escalations at least every 30 minutes during service',
          'Urgent + Pending = immediate attention needed',
          'AI summaries help you understand the issue quickly',
          'Resolution time affects customer satisfaction',
        ],
      },
    ],
  },

  // ============================================================
  // ORDERS
  // ============================================================
  {
    id: 'orders',
    title: 'Orders',
    icon: '📦',
    pages: [
      {
        id: 'orders-list',
        path: '/orders',
        title: 'Orders',
        purpose:
          'View and manage all orders. Track status, process payments, and handle fulfillment.',
        navigation: ['Sidebar > Orders', 'URL: /orders'],
        whatYouSee: [
          {
            title: 'Order Stats',
            items: [
              { label: 'Today', description: 'Orders today' },
              { label: 'Pending', description: 'Awaiting processing' },
              { label: 'In Progress', description: 'Being prepared' },
              { label: 'Completed', description: 'Finished orders' },
            ],
          },
          {
            title: 'Order List',
            description: 'All orders with number, items, total, status, time.',
          },
          {
            title: 'Filters',
            description: 'By status, date range, payment method.',
          },
        ],
        actions: [
          { name: 'View Details', description: 'Open order details' },
          { name: 'Update Status', description: 'Change order status' },
          { name: 'Print Receipt', description: 'Print order receipt' },
          { name: 'Refund', description: 'Process refund' },
        ],
        tips: ['Use keyboard shortcuts for faster processing', 'Audio alerts notify new orders'],
      },
      {
        id: 'kitchen',
        path: '/orders/kitchen',
        title: 'Kitchen Display (KDS)',
        purpose:
          'Kitchen display system for order preparation. See incoming orders, track cooking time, and mark as complete.',
        navigation: ['Sidebar > Orders > Kitchen', 'URL: /orders/kitchen'],
        whatYouSee: [
          {
            title: 'Order Cards',
            description: 'Orders in preparation with items and timer.',
          },
          {
            title: 'Status Columns',
            description: 'New, In Progress, Ready for pickup.',
          },
          {
            title: 'Timer',
            description: 'Time since order placed.',
          },
        ],
        actions: [
          { name: 'Start', description: 'Begin preparation' },
          { name: 'Bump', description: 'Mark as complete' },
          { name: 'Priority', description: 'Mark as priority' },
        ],
        workflows: [
          {
            title: 'Process order',
            steps: [
              'New order appears in "New" column',
              'Click "Start" to move to "In Progress"',
              'Prepare all items',
              'Click "Bump" when ready',
              'Order moves to "Ready" or disappears',
            ],
          },
        ],
        tips: [
          'Touch-optimized for kitchen tablets',
          'Color coding shows order age',
          'Audio alerts for new orders',
        ],
      },
    ],
  },

  // ============================================================
  // RESERVATIONS
  // ============================================================
  {
    id: 'reservations',
    title: 'Reservations',
    icon: '📅',
    pages: [
      {
        id: 'reservations-calendar',
        path: '/reservations',
        title: 'Reservations Calendar',
        purpose:
          'Manage all restaurant reservations. View bookings in calendar format, filter by status, and handle walk-ins and phone reservations.',
        navigation: ['Sidebar > Reservations', 'URL: /reservations'],
        whatYouSee: [
          {
            title: 'Calendar Views',
            items: [
              {
                label: 'Day View',
                description: 'Hourly timeline for single day, best for busy days',
              },
              {
                label: 'Week View',
                description: 'Overview of the week, good for planning and seeing patterns',
              },
              {
                label: 'Month View',
                description: 'Monthly overview with daily booking counts and highlights',
              },
            ],
          },
          {
            title: 'Reservation Cards',
            items: [
              { label: 'Guest Name', description: 'Name and party size' },
              { label: 'Time Slot', description: 'Reservation time and duration' },
              { label: 'Table', description: 'Assigned table number' },
              {
                label: 'Status Badge',
                description: 'Pending, Confirmed, Seated, Completed, No-Show, Cancelled',
              },
              { label: 'Notes', description: 'Special requests or dietary requirements' },
            ],
          },
          {
            title: 'Filters',
            items: [
              { label: 'Status Filter', description: 'Show only specific statuses' },
              { label: 'Table Filter', description: 'Filter by assigned table' },
              { label: 'Search', description: 'Search by guest name, phone, or email' },
            ],
          },
          {
            title: 'Quick Stats',
            items: [
              { label: "Today's Reservations", description: 'Total bookings for today' },
              { label: 'Covers', description: 'Total guests expected' },
              { label: 'Availability', description: 'Remaining capacity' },
            ],
          },
        ],
        actions: [
          {
            name: 'New Reservation',
            icon: '➕',
            description: 'Create reservation for walk-in or phone booking',
          },
          { name: 'View Details', icon: '👁️', description: 'Open full reservation details' },
          {
            name: 'Edit',
            icon: '✏️',
            description: 'Modify reservation time, party size, or table',
          },
          { name: 'Confirm', icon: '✅', description: 'Mark as confirmed' },
          { name: 'Seat', icon: '🪑', description: 'Mark guest as seated' },
          { name: 'Complete', icon: '🏁', description: 'Mark as completed when guest leaves' },
          { name: 'No-Show', icon: '❌', description: 'Mark as no-show after grace period' },
          { name: 'Cancel', icon: '🚫', description: 'Cancel reservation' },
          { name: 'Floor Plan', icon: '🗺️', description: 'Open floor plan view' },
        ],
        workflows: [
          {
            title: 'Create reservation from phone call',
            steps: [
              'Click "New Reservation" button',
              'Enter guest name and phone number',
              'Select date and time',
              'Enter party size',
              'System suggests available tables',
              'Select table or let system auto-assign',
              'Add any notes (dietary, occasion, preferences)',
              'Save reservation',
              'Optionally send confirmation SMS/email',
            ],
          },
          {
            title: 'Seat a reservation',
            steps: [
              'Guest arrives and gives name',
              'Find reservation in calendar or search',
              'Verify party size and any special requests',
              'Click "Seat" to mark as seated',
              'Timer starts for table turnover tracking',
            ],
          },
          {
            title: 'Complete reservation',
            steps: [
              'Guest finishes dining and pays',
              'Find reservation (filter by "Seated")',
              'Click "Complete"',
              'Reservation moves to completed status',
              'Table becomes available for next reservation',
            ],
          },
          {
            title: 'Handle no-show',
            steps: [
              'Grace period expires (usually 15 min)',
              'Find reservation still showing as "Confirmed"',
              'Click "No-Show"',
              'System records no-show for guest history',
              'Table becomes available for walk-ins',
            ],
          },
          {
            title: 'Modify existing reservation',
            steps: [
              'Find reservation in calendar',
              'Click "Edit"',
              'Change time, party size, or table as needed',
              'Check table availability for new time',
              'Save changes',
              'Optionally notify guest of change',
            ],
          },
          {
            title: 'Check daily capacity',
            steps: [
              'Switch to Day view',
              'Review quick stats for total reservations',
              'Identify peak times in timeline',
              'Plan staffing accordingly',
              'Block times if needed for private events',
            ],
          },
        ],
        faq: [
          {
            q: 'How do I see all reservations for today?',
            a: 'Switch to Day view (click "Day" button) and select today\'s date. All reservations appear on the timeline.',
          },
          {
            q: 'How do I find a specific guest?',
            a: 'Use the search bar at the top. Search by name, phone number, or email.',
          },
          {
            q: 'What do the status colors mean?',
            a: 'Yellow = Pending (not confirmed), Green = Confirmed, Blue = Seated, Gray = Completed, Red = No-Show, Strikethrough = Cancelled.',
          },
          {
            q: 'How do I reassign a table?',
            a: 'Click on the reservation, then Edit. Select a different table from the dropdown. System shows only available tables for that time.',
          },
          {
            q: 'Can I block times for private events?',
            a: 'Yes, create a special reservation marked as "Private Event" with the entire venue or specific tables.',
          },
          {
            q: 'How does overbooking protection work?',
            a: 'System prevents double-booking same table. When adding new reservation, only available tables are shown.',
          },
          {
            q: 'Where do online reservations appear?',
            a: 'Online bookings from your website automatically appear in the calendar with "Online" source tag.',
          },
          {
            q: 'How do I track repeat guests?',
            a: 'Click on guest name to see their history: visit count, preferences, and any notes from previous visits.',
          },
        ],
        tips: [
          'Use Week view on Mondays to plan staffing for the week',
          'Filter by "Pending" status each morning to follow up on unconfirmed reservations',
          'Add notes about dietary restrictions to help kitchen prepare',
          'Mark VIP guests so staff can provide special attention',
          'Check no-show history before accepting large party reservations',
          "Use Day view with Table filter to see a specific table's bookings",
          'Set up SMS confirmations to reduce no-show rate',
        ],
      },
      {
        id: 'reservations-floor-plan',
        path: '/reservations/floor-plan',
        title: 'Floor Plan Editor',
        purpose:
          'Design and manage your restaurant floor plan. Add, position, and configure tables for accurate reservation management and visual seating.',
        navigation: [
          'Sidebar > Reservations > Floor Plan',
          'From /reservations click "Floor Plan" button',
          'URL: /reservations/floor-plan',
        ],
        whatYouSee: [
          {
            title: 'Canvas Area',
            items: [
              {
                label: 'Floor Plan Grid',
                description: 'Visual representation of your restaurant layout',
              },
              { label: 'Tables', description: 'Draggable table shapes with numbers and capacity' },
              { label: 'Walls/Dividers', description: 'Structural elements and room dividers' },
              {
                label: 'Zones',
                description: 'Named areas like "Patio", "Main Room", "Private Dining"',
              },
            ],
          },
          {
            title: 'Toolbar',
            items: [
              { label: 'Edit Mode Toggle', description: 'Switch between view mode and edit mode' },
              { label: 'Add Table', description: 'Add new tables of various shapes' },
              { label: 'Add Zone', description: 'Create named areas' },
              { label: 'Zoom', description: 'Zoom in/out of floor plan' },
              { label: 'Undo/Redo', description: 'Revert or repeat changes' },
            ],
          },
          {
            title: 'Table Shapes',
            items: [
              { label: 'Round', description: 'Circle tables, typically 2-4 seats' },
              { label: 'Square', description: 'Square tables, typically 4 seats' },
              { label: 'Rectangle', description: 'Rectangular tables, 4-8 seats' },
              { label: 'Booth', description: 'U-shaped booths, 4-6 seats' },
              { label: 'Bar', description: 'Bar seating positions' },
            ],
          },
          {
            title: 'Table Properties Panel',
            items: [
              { label: 'Table Number', description: 'Unique identifier displayed on table' },
              { label: 'Capacity', description: 'Minimum and maximum seats' },
              { label: 'Zone Assignment', description: 'Which area this table belongs to' },
              { label: 'Combinable', description: 'Can be combined with adjacent tables' },
              { label: 'Reservable', description: 'Available for reservations or service-only' },
            ],
          },
          {
            title: 'Live Status Overlay',
            items: [
              { label: 'Available', description: 'Green - Table is free' },
              { label: 'Reserved', description: 'Yellow - Has upcoming reservation' },
              { label: 'Occupied', description: 'Red - Currently seated' },
              { label: 'Blocked', description: 'Gray - Not available' },
            ],
          },
        ],
        actions: [
          { name: 'Toggle Edit Mode', icon: '✏️', description: 'Enter/exit floor plan editing' },
          { name: 'Add Round Table', icon: '⭕', description: 'Add circular table' },
          { name: 'Add Square Table', icon: '⬜', description: 'Add square table' },
          { name: 'Add Rectangle Table', icon: '📏', description: 'Add rectangular table' },
          { name: 'Add Booth', icon: '🛋️', description: 'Add booth seating' },
          { name: 'Add Zone', icon: '🏷️', description: 'Create named area' },
          { name: 'Resize Table', icon: '↔️', description: 'Change table size' },
          { name: 'Rotate Table', icon: '🔄', description: 'Rotate table orientation' },
          { name: 'Delete', icon: '🗑️', description: 'Remove selected element' },
          { name: 'Duplicate', icon: '📋', description: 'Copy selected table' },
          { name: 'Save Layout', icon: '💾', description: 'Save floor plan changes' },
          { name: 'Reset', icon: '↩️', description: 'Discard unsaved changes' },
        ],
        workflows: [
          {
            title: 'Initial floor plan setup',
            steps: [
              'Click "Edit Mode" to enable editing',
              'Add zones first (Main Room, Patio, Bar, etc.)',
              'Add tables to each zone',
              'Position tables by dragging',
              'Set capacity for each table',
              'Assign table numbers',
              'Mark combinable tables',
              'Save layout',
            ],
          },
          {
            title: 'Add a new table',
            steps: [
              'Enter Edit Mode',
              'Click "Add Table" and select shape',
              'Click on canvas to place table',
              'Drag to position precisely',
              'Set table number in properties panel',
              'Set min/max capacity',
              'Assign to zone',
              'Save changes',
            ],
          },
          {
            title: 'Resize a table',
            steps: [
              'Enter Edit Mode',
              'Click on table to select',
              'Drag corner handles to resize',
              'Or use properties panel for exact dimensions',
              'Update capacity if size changed significantly',
              'Save changes',
            ],
          },
          {
            title: 'Rotate a table',
            steps: [
              'Enter Edit Mode',
              'Click on table to select',
              'Use rotation handle (circle at top)',
              'Or click Rotate button for 90° increments',
              'Useful for rectangular tables along walls',
              'Save changes',
            ],
          },
          {
            title: 'Create combinable table group',
            steps: [
              'Position tables adjacent to each other',
              'Select first table, enable "Combinable" in properties',
              'Select adjacent table, also enable "Combinable"',
              'When reserving, system can combine for larger parties',
              'Combined capacity = sum of individual capacities',
            ],
          },
          {
            title: 'Use floor plan for seating (view mode)',
            steps: [
              'Exit Edit Mode (view mode is default)',
              'See real-time table status (green/yellow/red)',
              'Click available table to create reservation',
              'Click occupied table to see current guest details',
              'Use for walk-in seating decisions',
            ],
          },
          {
            title: 'Modify existing layout for event',
            steps: [
              'Enter Edit Mode',
              'Rearrange tables for special configuration',
              'Add temporary tables if needed',
              'Mark some tables as "Blocked" if reserved for event',
              'Save as temporary layout',
              'Revert to standard layout after event',
            ],
          },
        ],
        faq: [
          {
            q: 'How do I enter edit mode?',
            a: 'Click the "Edit Mode" toggle in the toolbar. The background changes to show edit grid, and drag handles appear on elements.',
          },
          {
            q: "Why can't I move a table?",
            a: 'Make sure Edit Mode is enabled. In view mode, clicking tables shows their status/reservations instead of allowing movement.',
          },
          {
            q: "What's the difference between zones and tables?",
            a: 'Zones are named areas (Patio, VIP Room). Tables are individual seating units within zones. Zones help organize and filter reservations.',
          },
          {
            q: 'How does table combining work?',
            a: 'Mark adjacent tables as "Combinable". For large parties, system automatically suggests combining. Combined tables appear as one unit during reservation.',
          },
          {
            q: 'Can I have multiple floor plans?',
            a: 'Yes, create different layouts for different occasions (normal, weekend, private event). Switch between saved layouts.',
          },
          {
            q: 'How do I remove a table temporarily?',
            a: 'Instead of deleting, mark it as "Not Reservable" or "Blocked". It stays on the floor plan but won\'t be assigned to reservations.',
          },
          {
            q: 'What do the colors mean in view mode?',
            a: 'Green = Available, Yellow = Reserved (upcoming), Red = Occupied (seated), Gray = Blocked/Unavailable.',
          },
          {
            q: 'Can I undo changes?',
            a: 'Yes, use Undo button (Ctrl+Z) while in Edit Mode. Undo works for moves, additions, deletions. Save to keep changes permanently.',
          },
        ],
        tips: [
          'Set up your floor plan before creating reservations for accurate table management',
          'Use zones to separate indoor/outdoor or different sections for easier filtering',
          'Table numbers should match physical table markers for staff ease',
          'Mark bar seats as lower capacity (1-2) for accurate counting',
          'Enable "Combinable" for all tables that can physically be pushed together',
          'Use view mode during service for quick visual of restaurant status',
          'Create a "Private Event" layout and save it for easy reuse',
          'Position tables to reflect actual spacing for realistic walk-through',
        ],
      },
    ],
  },

  // ============================================================
  // PARTNERSHIPS
  // ============================================================
  {
    id: 'partnerships',
    title: 'Partnerships',
    icon: '🤝',
    pages: [
      {
        id: 'partnerships-overview',
        path: '/partnerships',
        title: 'Partnerships Hub',
        purpose: 'Manage B2B partnerships with hotels, tour operators, and accommodations.',
        navigation: ['Sidebar > Partnerships', 'URL: /partnerships'],
        whatYouSee: [
          {
            title: 'Partner Stats',
            items: [
              { label: 'Active Partners', description: 'Current active partnerships' },
              { label: 'Pending Outreach', description: 'Outreach awaiting response' },
              { label: 'Revenue from Partners', description: 'Revenue attributed to partners' },
            ],
          },
          {
            title: 'Quick Links',
            description: 'Access to each partnership section.',
          },
        ],
        tips: [
          'B2B partnerships can be a significant revenue channel',
          'Track partner performance in Analytics',
        ],
      },
      {
        id: 'accommodations',
        path: '/partnerships/accommodations',
        title: 'Accommodations',
        purpose:
          'Partner with hotels, hostels, and vacation rentals to offer your menu to their guests.',
        navigation: [
          'Sidebar > Partnerships > Accommodations',
          'URL: /partnerships/accommodations',
        ],
        whatYouSee: [
          {
            title: 'Accommodation Partners',
            description: 'List of partner accommodations with status and performance.',
          },
        ],
        actions: [
          { name: 'Add Partner', description: 'Add new accommodation' },
          { name: 'Generate QR', description: 'Create QR for partner' },
          { name: 'View Stats', description: 'See partner performance' },
        ],
        tips: [
          'Create custom QR codes for each partner to track attribution',
          'Offer exclusive deals for partner guests',
        ],
      },
      {
        id: 'tour-operators',
        path: '/partnerships/tour-operators',
        title: 'Tour Operators',
        purpose: 'Partner with tour operators to include your restaurant in tour packages.',
        navigation: [
          'Sidebar > Partnerships > Tour Operators',
          'URL: /partnerships/tour-operators',
        ],
        tips: ['Group bookings can fill slow days', 'Offer tour-specific menus'],
      },
      {
        id: 'outreach',
        path: '/partnerships/outreach',
        title: 'Partner Outreach',
        purpose: 'Manage outreach campaigns to potential partners.',
        navigation: ['Sidebar > Partnerships > Outreach', 'URL: /partnerships/outreach'],
        whatYouSee: [
          {
            title: 'Outreach Pipeline',
            description: 'Status of outreach efforts: Contacted, Interested, Negotiating, Closed.',
          },
        ],
        tips: ['Track all communications', 'Follow up within 3 days'],
      },
      {
        id: 'partnership-products',
        path: '/partnerships/products',
        title: 'Partner Products',
        purpose: 'Create special products or offers for partners.',
        navigation: ['Sidebar > Partnerships > Products', 'URL: /partnerships/products'],
        tips: ['Partner-exclusive items create urgency', 'Track which products perform best'],
      },
      {
        id: 'bookings',
        path: '/partnerships/bookings',
        title: 'Partner Bookings',
        purpose: 'View and manage bookings from partners.',
        navigation: ['Sidebar > Partnerships > Bookings', 'URL: /partnerships/bookings'],
        tips: ['Confirm bookings promptly', 'Prepare for group sizes'],
      },
      {
        id: 'bookings-config',
        path: '/partnerships/bookings/config',
        title: 'Booking Configuration',
        purpose: 'Configure booking settings, availability, and capacity for partners.',
        navigation: [
          'Sidebar > Partnerships > Bookings > Config',
          'URL: /partnerships/bookings/config',
        ],
        tips: ['Set realistic capacity limits', 'Block dates when fully booked'],
      },
      {
        id: 'conventions-hub',
        path: '/partnerships/conventions',
        title: 'Conventions Hub',
        purpose:
          'Central hub for B2B conventions with offices, gyms, schools, and coworking spaces. Offer employee discounts and track redemptions.',
        navigation: ['Sidebar > Partnerships > Conventions', 'URL: /partnerships/conventions'],
        whatYouSee: [
          {
            title: 'Metrics Cards',
            items: [
              { label: 'Office Partners', description: 'Total offices/companies in your network' },
              { label: 'Active Conventions', description: 'Currently active discount agreements' },
              { label: 'Vouchers Generated', description: 'Total vouchers created for employees' },
              { label: 'Redemptions', description: 'Vouchers used this month' },
            ],
          },
          {
            title: 'Quick Links',
            items: [
              { label: 'Discover Offices', description: 'AI-powered discovery of nearby offices' },
              { label: 'Manage Offices', description: 'View and manage office partners' },
              { label: 'Active Conventions', description: 'View all active discount agreements' },
              { label: 'Vouchers', description: 'Generate and manage vouchers' },
              {
                label: 'Staff Verification',
                description: 'Tool for staff to verify and redeem vouchers',
              },
            ],
          },
          {
            title: 'How It Works',
            description:
              'Step-by-step guide: Discover offices → Create convention → Generate vouchers → Employees redeem → Track results.',
          },
        ],
        workflows: [
          {
            title: 'Set up first convention',
            steps: [
              'Click "Discover Offices" to find nearby businesses',
              'Select promising offices and start outreach',
              'Once agreed, create a convention with discount terms',
              'Generate vouchers for employees',
              'Train staff on verification process',
            ],
          },
        ],
        tips: [
          'Conventions with nearby offices drive recurring lunch traffic',
          'Gyms and coworking spaces have health-conscious customers',
          'Start with a simple percentage discount before complex offers',
        ],
      },
      {
        id: 'conventions-offices',
        path: '/partnerships/conventions/offices',
        title: 'Office Partners',
        purpose:
          'Discover and manage office partners. Use AI to find nearby offices, track outreach, and build your B2B network.',
        navigation: [
          'Sidebar > Partnerships > Conventions > Offices',
          'URL: /partnerships/conventions/offices',
        ],
        whatYouSee: [
          {
            title: 'Office List',
            description:
              'All office partners with name, type, employee count, and outreach status.',
          },
          {
            title: 'Filters',
            items: [
              { label: 'Type', description: 'Office, Gym, School, Coworking, Hospital' },
              {
                label: 'Status',
                description: 'Suggested, Contacted, Negotiating, Active, Declined',
              },
              { label: 'Distance', description: 'Filter by proximity to your location' },
            ],
          },
          {
            title: 'AI Discovery',
            description:
              'Button to discover new offices in your area using AI and Google Places data.',
          },
        ],
        actions: [
          {
            name: 'Discover Offices',
            icon: '🔍',
            description: 'AI-powered search for nearby offices',
          },
          { name: 'Add Manually', icon: '➕', description: 'Add an office partner manually' },
          {
            name: 'Start Outreach',
            icon: '📧',
            description: 'Begin outreach to a discovered office',
          },
          { name: 'View Details', icon: '👁️', description: 'See full office profile and history' },
        ],
        workflows: [
          {
            title: 'Discover and contact offices',
            steps: [
              'Click "Discover Offices"',
              'Enter search radius (e.g., 500m)',
              'AI finds offices, gyms, schools nearby',
              'Review suggestions with employee counts',
              'Click "Start Outreach" on promising ones',
              'Track status in pipeline view',
            ],
          },
        ],
        faq: [
          {
            q: 'How does AI Discovery work?',
            a: 'It uses your location to search Google Places for nearby businesses, then enriches data with employee estimates and contact info.',
          },
          {
            q: 'What office types can I target?',
            a: 'Offices, gyms, schools, coworking spaces, hospitals, and more. Each has different employee patterns.',
          },
        ],
        tips: [
          'Offices with 50+ employees are high-value targets',
          'Gyms attract health-conscious customers - highlight healthy options',
          'Schools mean predictable lunch rush - prepare for volume',
        ],
      },
      {
        id: 'conventions-active',
        path: '/partnerships/conventions/active',
        title: 'Active Conventions',
        purpose:
          'View and manage all active discount conventions. Configure benefits, validity periods, and usage limits.',
        navigation: [
          'Sidebar > Partnerships > Conventions > Active',
          'URL: /partnerships/conventions/active',
        ],
        whatYouSee: [
          {
            title: 'Convention Cards',
            items: [
              { label: 'Partner Name', description: 'The office/company this convention is with' },
              {
                label: 'Benefit',
                description: 'Discount type: percentage, fixed amount, free item, special price',
              },
              { label: 'Validity', description: 'Start and end dates' },
              { label: 'Usage', description: 'Redemptions vs usage limit' },
              { label: 'Status', description: 'Active or paused toggle' },
            ],
          },
          {
            title: 'Filters',
            description: 'Filter by partner, benefit type, or status.',
          },
        ],
        actions: [
          {
            name: 'Create Convention',
            icon: '➕',
            description: 'Create new convention with a partner',
          },
          { name: 'Edit', icon: '✏️', description: 'Modify convention terms' },
          { name: 'Toggle Active', icon: '⏸️', description: 'Pause or resume convention' },
          { name: 'View Stats', icon: '📊', description: 'See redemption statistics' },
        ],
        workflows: [
          {
            title: 'Create a new convention',
            steps: [
              'Click "Create Convention"',
              'Select office partner',
              'Choose benefit type (e.g., 15% discount)',
              'Set validity period',
              'Optional: set usage limits',
              'Choose verification method (QR, code, badge)',
              'Save and activate',
            ],
          },
          {
            title: 'Pause convention temporarily',
            steps: [
              'Find convention in list',
              'Click toggle to pause',
              'Convention stops accepting redemptions',
              'Click toggle again to resume',
            ],
          },
        ],
        faq: [
          {
            q: 'What benefit types are available?',
            a: 'Percentage discount (e.g., 15% off), fixed discount (e.g., $5 off), free item (e.g., free coffee), or special price (e.g., lunch menu at $12).',
          },
          {
            q: 'Can I limit usage?',
            a: 'Yes, set max redemptions per day, per user, or total. Convention auto-pauses when limit reached.',
          },
        ],
        tips: [
          'Start with a modest discount (10-15%) and increase if needed',
          'Set per-user limits to prevent abuse',
          'Time-limited conventions create urgency',
        ],
      },
      {
        id: 'conventions-vouchers',
        path: '/partnerships/conventions/vouchers',
        title: 'Vouchers',
        purpose:
          'Generate and manage vouchers for convention employees. Create single or bulk vouchers with QR codes.',
        navigation: [
          'Sidebar > Partnerships > Conventions > Vouchers',
          'URL: /partnerships/conventions/vouchers',
        ],
        whatYouSee: [
          {
            title: 'Convention Selector',
            description: 'Dropdown to select which convention to manage vouchers for.',
          },
          {
            title: 'Voucher Stats',
            items: [
              { label: 'Total Generated', description: 'All vouchers created' },
              { label: 'Active', description: 'Currently valid vouchers' },
              { label: 'Used', description: 'Redeemed vouchers' },
              { label: 'Expired', description: 'Past validity date' },
            ],
          },
          {
            title: 'Voucher List',
            description: 'All vouchers with code, user info, status, and usage history.',
          },
        ],
        actions: [
          {
            name: 'Generate Single',
            icon: '🎫',
            description: 'Create one voucher for specific employee',
          },
          { name: 'Generate Bulk', icon: '📦', description: 'Create multiple anonymous vouchers' },
          { name: 'Download QR', icon: '⬇️', description: 'Download voucher QR code' },
          { name: 'Deactivate', icon: '🚫', description: 'Cancel a voucher' },
        ],
        workflows: [
          {
            title: 'Generate vouchers for new employees',
            steps: [
              'Select convention from dropdown',
              'Click "Generate Single" for named vouchers',
              'Enter employee name and email',
              'Generate and send QR code',
              'Or use "Generate Bulk" for anonymous vouchers',
            ],
          },
          {
            title: 'Distribute bulk vouchers',
            steps: [
              'Select convention',
              'Click "Generate Bulk"',
              'Enter quantity (e.g., 50)',
              'Download PDF with all QR codes',
              'Send to HR contact for distribution',
            ],
          },
        ],
        faq: [
          {
            q: 'What is the difference between single and bulk vouchers?',
            a: 'Single vouchers are tied to a specific person (name/email). Bulk vouchers are anonymous and can be used by anyone.',
          },
          {
            q: 'Can I track who used a bulk voucher?',
            a: 'Bulk vouchers track redemption but not identity. Use single vouchers if you need to know who redeemed.',
          },
        ],
        tips: [
          'Named vouchers reduce abuse but require more setup',
          'Bulk vouchers are easier for HR to distribute',
          'Send QR codes via email for easy mobile access',
        ],
      },
      {
        id: 'conventions-verify',
        path: '/partnerships/conventions/verify',
        title: 'Staff Verification',
        purpose:
          'Tool for front-of-house staff to verify and redeem convention vouchers. Scan QR, enter code, or search by partner.',
        navigation: [
          'Sidebar > Partnerships > Conventions > Verify',
          'URL: /partnerships/conventions/verify',
        ],
        whatYouSee: [
          {
            title: 'Verification Input',
            items: [
              { label: 'Scan QR', description: 'Use camera to scan voucher QR code' },
              { label: 'Enter Code', description: 'Type voucher code manually' },
              { label: 'Daily Codes', description: 'Quick codes for today (e.g., TECHCORP-0115)' },
            ],
          },
          {
            title: 'Verification Result',
            description: 'Shows convention details, discount to apply, and confirmation button.',
          },
          {
            title: 'Recent Redemptions',
            description: 'List of recent redemptions for reference.',
          },
        ],
        actions: [
          { name: 'Verify', icon: '✅', description: 'Check if voucher is valid' },
          {
            name: 'Apply Discount',
            icon: '💰',
            description: 'Confirm redemption and apply discount',
          },
          { name: 'Reject', icon: '❌', description: 'Mark voucher as invalid' },
        ],
        workflows: [
          {
            title: 'Redeem a customer voucher',
            steps: [
              'Customer shows QR code or says code',
              'Scan QR or enter code in verification box',
              'System shows: valid/invalid, discount amount, partner name',
              'If valid, click "Apply Discount"',
              'Apply discount to order in POS',
              'Redemption is logged automatically',
            ],
          },
          {
            title: 'Use daily quick code',
            steps: [
              'Check "Daily Codes" section for today\'s codes',
              'Customer says their company name',
              'Find matching code (e.g., TECHCORP-0115)',
              'Enter code to verify',
              'Apply discount',
            ],
          },
        ],
        faq: [
          {
            q: "What if the QR code won't scan?",
            a: 'Ask customer for the code printed below QR. Enter it manually in the text field.',
          },
          {
            q: 'What are daily codes?',
            a: 'Simple codes that change daily (format: COMPANY-MMDD). Easier than scanning for regular customers.',
          },
          {
            q: 'What if a voucher is already used?',
            a: 'System shows "Already Redeemed" with timestamp. Politely inform customer.',
          },
        ],
        tips: [
          'Keep this page open on a tablet at the counter',
          'Daily codes are faster for regular customers',
          'Check "Recent Redemptions" if customer claims they haven\'t used voucher',
        ],
      },
    ],
  },

  // ============================================================
  // TRANSLATIONS
  // ============================================================
  {
    id: 'translations',
    title: 'Translations',
    icon: '🌐',
    pages: [
      {
        id: 'translations',
        path: '/translations',
        title: 'Translations',
        purpose: 'Manage multilingual content. Translate menu items, descriptions, and UI text.',
        navigation: ['Sidebar > Translations', 'URL: /translations'],
        whatYouSee: [
          {
            title: 'Language Stats',
            description: 'Completion percentage per language.',
          },
          {
            title: 'Translation Queue',
            description: 'Items needing translation.',
          },
          {
            title: 'Recent Translations',
            description: 'Recently translated content.',
          },
        ],
        actions: [
          { name: 'Translate', description: 'Manually translate item' },
          { name: 'Auto-Translate', description: 'AI translation' },
          { name: 'Review', description: 'Review AI translations' },
        ],
        workflows: [
          {
            title: 'Translate menu to new language',
            steps: [
              'Select target language',
              'Click "Auto-Translate All"',
              'AI translates all content',
              'Review translations for accuracy',
              'Approve or edit as needed',
            ],
          },
        ],
        faq: [
          {
            q: 'Which languages are supported?',
            a: 'English, Vietnamese, Korean, Chinese, Japanese, Italian, and more.',
          },
          {
            q: 'Is AI translation accurate?',
            a: 'Generally good. Review specialized terms and proper nouns.',
          },
        ],
        tips: [
          'English is the base language - translate FROM English',
          'Review translations for food-specific terms',
          'Proper nouns (brand names) might not need translation',
        ],
      },
    ],
  },

  // ============================================================
  // TEAM
  // ============================================================
  {
    id: 'team',
    title: 'Team',
    icon: '👨‍👩‍👧‍👦',
    pages: [
      {
        id: 'team',
        path: '/team',
        title: 'Team Management',
        purpose: 'Manage your staff. Add team members, assign roles, and control permissions.',
        navigation: ['Sidebar > Team', 'URL: /team'],
        whatYouSee: [
          {
            title: 'Team Members',
            description: 'All staff with name, role, status, last active.',
          },
          {
            title: 'Roles',
            description: 'Available roles (Admin, Manager, Staff, Kitchen).',
          },
        ],
        actions: [
          { name: 'Invite Member', description: 'Send invitation' },
          { name: 'Change Role', description: 'Update permissions' },
          { name: 'Deactivate', description: 'Remove access' },
        ],
        workflows: [
          {
            title: 'Add new team member',
            steps: [
              'Click "Invite Member"',
              'Enter email address',
              'Select role',
              'Send invitation',
              'They receive email to set up account',
            ],
          },
        ],
        faq: [
          {
            q: 'What permissions does each role have?',
            a: 'Admin: full access. Manager: most features. Staff: limited. Kitchen: KDS only.',
          },
          {
            q: 'Can I create custom roles?',
            a: 'Not yet, but planned for future update.',
          },
        ],
        tips: ['Give minimum necessary permissions', 'Deactivate accounts when staff leaves'],
      },
    ],
  },

  // ============================================================
  // SETTINGS
  // ============================================================
  {
    id: 'settings',
    title: 'Settings',
    icon: '⚙️',
    pages: [
      {
        id: 'settings-general',
        path: '/settings',
        title: 'General Settings',
        purpose: 'Configure business profile, branding, regional settings, and notifications.',
        navigation: ['Sidebar > Settings', 'URL: /settings'],
        whatYouSee: [
          {
            title: 'Business Profile',
            description: 'Logo, name, type, description.',
          },
          {
            title: 'Regional Settings',
            description: 'Timezone, currency, default language.',
          },
          {
            title: 'Branding',
            description: 'Primary color, theme (light/dark).',
          },
          {
            title: 'Notifications',
            description: 'Email preferences, sound settings.',
          },
          {
            title: 'Danger Zone',
            description: 'Delete QR codes, delete account.',
          },
        ],
        tips: ['Primary color appears on QR pages', 'Sound settings affect order alerts'],
      },
      {
        id: 'settings-languages',
        path: '/settings/languages',
        title: 'Language Settings',
        purpose: 'Configure which languages are available for your menu and interface.',
        navigation: ['Sidebar > Settings > Languages', 'URL: /settings/languages'],
        tips: ['Enable only languages you support', 'Customer sees language based on device'],
      },
      {
        id: 'settings-currency',
        path: '/settings/currency',
        title: 'Currency Settings',
        purpose: 'Configure currency display and formatting.',
        navigation: ['Sidebar > Settings > Currency', 'URL: /settings/currency'],
        tips: ['Set correct currency symbol position', 'Configure decimal places'],
      },
      {
        id: 'settings-hours',
        path: '/settings/hours',
        title: 'Business Hours',
        purpose: 'Set your operating hours for each day of the week.',
        navigation: ['Sidebar > Settings > Hours', 'URL: /settings/hours'],
        tips: ['Set different hours for holidays', 'Closed days can hide menu items'],
      },
      {
        id: 'settings-calendar',
        path: '/settings/calendar',
        title: 'Calendar Settings',
        purpose: 'Configure calendar for events, holidays, and special dates.',
        navigation: ['Sidebar > Settings > Calendar', 'URL: /settings/calendar'],
        tips: ['Add local holidays', 'Plan promotions around events'],
      },
      {
        id: 'settings-payments',
        path: '/settings/payments',
        title: 'Payment Settings',
        purpose: 'Configure payment methods, processors, and checkout options.',
        navigation: ['Sidebar > Settings > Payments', 'URL: /settings/payments'],
        tips: ['Test payment flow before going live', 'Enable multiple payment methods'],
      },
      {
        id: 'settings-social',
        path: '/settings/social',
        title: 'Social Media Settings',
        purpose: 'Connect social media accounts for sharing and integration.',
        navigation: ['Sidebar > Settings > Social', 'URL: /settings/social'],
        tips: ['Connect accounts for auto-posting', 'Social links appear on QR pages'],
      },
      {
        id: 'settings-auth',
        path: '/settings/auth',
        title: 'Authentication Settings',
        purpose: 'Configure login options, SSO, and security settings.',
        navigation: ['Sidebar > Settings > Auth', 'URL: /settings/auth'],
        tips: ['Enable 2FA for better security', 'Review login history regularly'],
      },
      {
        id: 'settings-domain',
        path: '/settings/domain',
        title: 'Custom Domain',
        purpose:
          'Configure your own domain for white-label experience. Customers see your domain instead of gudbro.com.',
        navigation: ['Sidebar > Settings > Domain', 'URL: /settings/domain'],
        whatYouSee: [
          {
            title: 'Domain Input',
            description: 'Enter your custom domain (e.g., menu.yourrestaurant.com).',
          },
          {
            title: 'DNS Instructions',
            items: [
              { label: 'CNAME Record', description: 'Point to cname.vercel-dns.com' },
              { label: 'Verification Token', description: 'TXT record for ownership proof' },
            ],
          },
          {
            title: 'Status Indicators',
            items: [
              { label: 'Domain Status', description: 'Pending, Verifying, Verified, or Failed' },
              { label: 'SSL Status', description: 'Certificate provisioning status' },
            ],
          },
        ],
        actions: [
          { name: 'Save Domain', description: 'Register your custom domain' },
          { name: 'Verify', description: 'Check DNS configuration' },
          { name: 'Remove', description: 'Delete custom domain' },
          { name: 'Copy', description: 'Copy DNS records to clipboard' },
        ],
        workflows: [
          {
            title: 'Set up custom domain',
            steps: [
              'Enter your domain (e.g., menu.yourbrand.com)',
              'Click Save Domain',
              'Copy CNAME and TXT records shown',
              'Add records in your DNS provider',
              'Wait 5-10 minutes for propagation',
              'Click Verify to confirm setup',
              'SSL certificate provisions automatically',
            ],
          },
        ],
        faq: [
          {
            q: 'How long does verification take?',
            a: 'DNS propagation takes 5-30 minutes. SSL provisioning takes 5-10 minutes after verification.',
          },
          {
            q: 'Can I use my main domain?',
            a: 'We recommend a subdomain (menu.yourdomain.com) to avoid conflicts with your main website.',
          },
          {
            q: 'What if verification fails?',
            a: 'Check DNS records are correct. Use a DNS checker tool. Wait longer for propagation.',
          },
        ],
        tips: [
          'Use a subdomain like menu.yourdomain.com or order.yourdomain.com',
          'DNS changes can take up to 48 hours in rare cases',
          'Once verified, SSL is automatic and free',
          'Your QR codes will automatically use the new domain',
        ],
      },
    ],
  },

  // ============================================================
  // PARTNER PORTAL
  // ============================================================
  {
    id: 'partner',
    title: 'Partner Portal',
    icon: '🤝',
    pages: [
      {
        id: 'partner-dashboard',
        path: '/partner',
        title: 'Partner Dashboard',
        purpose:
          'Central hub for white-label partners. Manage client organizations, track revenue, and monitor performance.',
        navigation: ['Sidebar > Partner Portal', 'URL: /partner'],
        whatYouSee: [
          {
            title: 'Partner Info',
            description: 'Your partner name and welcome message.',
          },
          {
            title: 'Metrics Grid',
            items: [
              {
                label: 'Total Organizations',
                description: 'All client restaurants under your account',
              },
              { label: 'Active', description: 'Currently active organizations' },
              { label: 'Locations', description: 'Total locations across all clients' },
              { label: 'This Month Revenue', description: 'Revenue generated this month' },
            ],
          },
          {
            title: 'Quick Actions',
            items: [
              { label: 'Organizations', description: 'View and manage client list' },
              { label: 'Billing', description: 'View royalties and payouts' },
              { label: 'Settings', description: 'Update branding and domain' },
            ],
          },
          {
            title: 'Recent Organizations',
            description: 'Latest client organizations added.',
          },
        ],
        actions: [{ name: 'Add Organization', description: 'Onboard a new client restaurant' }],
        workflows: [
          {
            title: 'Onboard new client',
            steps: [
              'Click "Add Organization"',
              'Fill client details (name, email, etc.)',
              'Select subscription plan',
              'Client receives invite email',
              'Track in Organizations list',
            ],
          },
        ],
        tips: [
          'Check metrics weekly to track growth',
          'Revenue shows your commission from client subscriptions',
          'Quick Actions give fast access to common tasks',
        ],
      },
      {
        id: 'partner-organizations',
        path: '/partner/organizations',
        title: 'Partner Organizations',
        purpose:
          'View and manage all client organizations under your partner account. Search, filter, and access client details.',
        navigation: ['Partner Portal > Organizations', 'URL: /partner/organizations'],
        whatYouSee: [
          {
            title: 'Organization List',
            items: [
              { label: 'Name', description: 'Client organization name' },
              { label: 'Status', description: 'Active or Inactive' },
              { label: 'Locations', description: 'Number of locations' },
              { label: 'Created', description: 'When they joined' },
            ],
          },
          {
            title: 'Filters',
            items: [
              { label: 'Search', description: 'Search by organization name' },
              { label: 'Status', description: 'All, Active, or Inactive' },
            ],
          },
          {
            title: 'Pagination',
            description: 'Navigate through client list.',
          },
        ],
        actions: [
          { name: 'Add Organization', description: 'Onboard new client' },
          { name: 'View Details', description: 'Open client organization' },
        ],
        workflows: [
          {
            title: 'Find specific client',
            steps: [
              'Use search box to type client name',
              'Or filter by status (Active/Inactive)',
              'Click on organization to view details',
            ],
          },
        ],
        tips: [
          'Use search for quick access to specific clients',
          'Inactive clients may need follow-up',
          'Total count shows in page header',
        ],
      },
    ],
  },

  // ============================================================
  // PLATFORM (Internal)
  // ============================================================
  {
    id: 'platform',
    title: 'Platform',
    icon: '🔧',
    pages: [
      {
        id: 'platform',
        path: '/platform',
        title: 'Platform Admin',
        purpose: 'Internal platform administration for GUDBRO team only.',
        navigation: ['Sidebar > Platform (admin only)', 'URL: /platform'],
        whatYouSee: [
          {
            title: 'System Stats',
            description: 'Platform-wide statistics.',
          },
          {
            title: 'All Organizations',
            description: 'List of all organizations on platform.',
          },
          {
            title: 'System Health',
            description: 'API status, database status.',
          },
        ],
        tips: [
          'This section is for GUDBRO admins only',
          'Contact support if you need admin access',
        ],
      },
    ],
  },
];

// Helper functions
export function getSection(sectionId: string): KBSection | undefined {
  return KB_SECTIONS.find((s) => s.id === sectionId);
}

export function getPage(pageId: string): KBPage | undefined {
  for (const section of KB_SECTIONS) {
    const page = section.pages.find((p) => p.id === pageId);
    if (page) return page;
  }
  return undefined;
}

export function searchKB(query: string): KBPage[] {
  const q = query.toLowerCase();
  const results: KBPage[] = [];

  for (const section of KB_SECTIONS) {
    for (const page of section.pages) {
      if (
        page.title.toLowerCase().includes(q) ||
        page.purpose.toLowerCase().includes(q) ||
        page.path.toLowerCase().includes(q)
      ) {
        results.push(page);
      }
    }
  }

  return results;
}
