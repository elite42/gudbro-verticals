import express from 'express';
import { body, param, validationResult } from 'express-validator';
import axios from 'axios';

const router = express.Router();

// Airtable configuration
const AIRTABLE_API = 'https://api.airtable.com/v0';
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// ============================================================================
// MOCK DATA (Multi-venue, Multi-category)
// ============================================================================

const MOCK_BUSINESS_DATA = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  businessName: 'Da Nang Bike Rentals',
  businessType: 'rental',
  description: 'Best bike & bicycle rentals in Da Nang',
  multiVenue: true,
  primaryPhone: '+84905123456',
  primaryEmail: 'hello@danangbikes.com',
};

const MOCK_LOCATIONS = [
  {
    id: 'loc-001',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    name: 'City Center',
    address: 'Ngo Thi Si Street, Da Nang',
    coordinates: { lat: 16.054, lng: 108.202 },
    phone: '+84905123456',
    email: 'center@danangbikes.com',
    openingHours: {
      mon: '8:00-20:00',
      tue: '8:00-20:00',
      wed: '8:00-20:00',
      thu: '8:00-20:00',
      fri: '8:00-20:00',
      sat: '8:00-20:00',
      sun: '8:00-20:00',
    },
    isPrimary: true,
    isActive: true,
    acceptsPickup: true,
    acceptsReturn: true,
  },
  {
    id: 'loc-002',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    name: 'An Thuong Beach',
    address: 'An Thuong 2, Ngu Hanh Son, Da Nang',
    coordinates: { lat: 16.042, lng: 108.245 },
    phone: '+84905123457',
    email: 'beach@danangbikes.com',
    openingHours: {
      mon: '7:00-19:00',
      tue: '7:00-19:00',
      wed: '7:00-19:00',
      thu: '7:00-19:00',
      fri: '7:00-19:00',
      sat: '7:00-19:00',
      sun: '7:00-19:00',
    },
    isPrimary: false,
    isActive: true,
    acceptsPickup: true,
    acceptsReturn: true,
  },
];

const MOCK_CONTACT_SETTINGS = {
  primaryChannel: 'zalo',
  enabledChannels: ['zalo', 'whatsapp', 'email', 'telegram'],
  phone: '+84905123456',
  email: 'hello@danangbikes.com',
  zaloId: 'danangbikes',
  whatsappNumber: '+84905123456',
  telegramUsername: '@danangbikes',
};

// Mock Fleet: 4 categories across 2 locations
const MOCK_FLEET = [
  // SCOOTERS (110-125cc)
  {
    id: 'item-001',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    category: 'scooter',
    itemType: 'rental',
    brand: 'Honda',
    model: 'Wave Alpha',
    year: 2023,
    condition: 'excellent',
    specs: { engine: '110cc', transmission: 'automatic', fuel: 'petrol', seats: 2 },
    photos: ['https://example.com/honda-wave-1.jpg'],
    thumbnailUrl: 'https://example.com/honda-wave-thumb.jpg',
    features: ['helmet', 'lock', 'phone_holder', 'insurance'],
    isActive: true,
    isFeatured: true,
    pricing: {
      'loc-001': {
        dailyRate: 120000,
        weeklyRate: 700000,
        monthlyRate: 2400000,
        longTermRate: 6000000,
        depositAmount: 500000,
      },
      'loc-002': {
        dailyRate: 130000,
        weeklyRate: 750000,
        monthlyRate: 2500000,
        longTermRate: 6200000,
        depositAmount: 500000,
      },
    },
    inventory: {
      'loc-001': {
        quantityTotal: 5,
        quantityAvailable: 3,
        quantityReserved: 2,
        quantityMaintenance: 0,
      },
      'loc-002': {
        quantityTotal: 3,
        quantityAvailable: 2,
        quantityReserved: 1,
        quantityMaintenance: 0,
      },
    },
  },
  {
    id: 'item-002',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    category: 'scooter',
    itemType: 'both',
    brand: 'Honda',
    model: 'Vision',
    year: 2024,
    condition: 'excellent',
    specs: { engine: '110cc', transmission: 'automatic', fuel: 'petrol', seats: 2 },
    photos: ['https://example.com/honda-vision-1.jpg'],
    thumbnailUrl: 'https://example.com/honda-vision-thumb.jpg',
    features: ['helmet', 'lock', 'raincoat', 'insurance'],
    isActive: true,
    isFeatured: false,
    pricing: {
      'loc-001': {
        dailyRate: 130000,
        weeklyRate: 800000,
        monthlyRate: 2600000,
        longTermRate: 6500000,
        depositAmount: 600000,
      },
    },
    salePrice: { price: 25000000, isNegotiable: true, minPrice: 23000000 },
    inventory: {
      'loc-001': {
        quantityTotal: 4,
        quantityAvailable: 4,
        quantityReserved: 0,
        quantityMaintenance: 0,
      },
    },
  },
  // SPORT BIKES (150cc+)
  {
    id: 'item-003',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    category: 'sport',
    itemType: 'rental',
    brand: 'Yamaha',
    model: 'Exciter 155',
    year: 2024,
    condition: 'excellent',
    specs: { engine: '155cc', transmission: 'manual', fuel: 'petrol', seats: 2 },
    photos: ['https://example.com/yamaha-exciter-1.jpg'],
    thumbnailUrl: 'https://example.com/yamaha-exciter-thumb.jpg',
    features: ['helmet', 'lock', 'phone_holder', 'insurance', 'gps'],
    isActive: true,
    isFeatured: true,
    pricing: {
      'loc-001': {
        dailyRate: 200000,
        weeklyRate: 1200000,
        monthlyRate: 4000000,
        longTermRate: 10000000,
        depositAmount: 1000000,
      },
      'loc-002': {
        dailyRate: 220000,
        weeklyRate: 1300000,
        monthlyRate: 4200000,
        longTermRate: 10500000,
        depositAmount: 1000000,
      },
    },
    inventory: {
      'loc-001': {
        quantityTotal: 3,
        quantityAvailable: 1,
        quantityReserved: 2,
        quantityMaintenance: 0,
      },
      'loc-002': {
        quantityTotal: 2,
        quantityAvailable: 2,
        quantityReserved: 0,
        quantityMaintenance: 0,
      },
    },
  },
  // ELECTRIC
  {
    id: 'item-004',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    category: 'electric',
    itemType: 'rental',
    brand: 'VinFast',
    model: 'Evo 200',
    year: 2024,
    condition: 'excellent',
    specs: {
      battery: '60V',
      range: '80km',
      chargingTime: '6h',
      transmission: 'automatic',
      seats: 2,
    },
    photos: ['https://example.com/vinfast-evo-1.jpg'],
    thumbnailUrl: 'https://example.com/vinfast-evo-thumb.jpg',
    features: ['helmet', 'lock', 'phone_holder', 'insurance', 'charger'],
    isActive: true,
    isFeatured: true,
    pricing: {
      'loc-001': {
        dailyRate: 150000,
        weeklyRate: 900000,
        monthlyRate: 3000000,
        longTermRate: 7500000,
        depositAmount: 800000,
      },
      'loc-002': {
        dailyRate: 160000,
        weeklyRate: 950000,
        monthlyRate: 3200000,
        longTermRate: 8000000,
        depositAmount: 800000,
      },
    },
    inventory: {
      'loc-001': {
        quantityTotal: 4,
        quantityAvailable: 3,
        quantityReserved: 1,
        quantityMaintenance: 0,
      },
      'loc-002': {
        quantityTotal: 2,
        quantityAvailable: 1,
        quantityReserved: 0,
        quantityMaintenance: 1,
      },
    },
  },
  // BICYCLES
  {
    id: 'item-005',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    category: 'bicycle',
    itemType: 'rental',
    brand: 'Giant',
    model: 'ATX 810',
    year: 2023,
    condition: 'good',
    specs: { type: 'mountain', gears: 21, frame: 'aluminum', wheelSize: '26 inch' },
    photos: ['https://example.com/giant-atx-1.jpg'],
    thumbnailUrl: 'https://example.com/giant-atx-thumb.jpg',
    features: ['lock', 'water_bottle_holder', 'repair_kit'],
    isActive: true,
    isFeatured: false,
    pricing: {
      'loc-001': {
        dailyRate: 80000,
        weeklyRate: 450000,
        monthlyRate: 1500000,
        longTermRate: 3500000,
        depositAmount: 300000,
      },
      'loc-002': {
        dailyRate: 90000,
        weeklyRate: 500000,
        monthlyRate: 1600000,
        longTermRate: 3800000,
        depositAmount: 300000,
      },
    },
    inventory: {
      'loc-001': {
        quantityTotal: 6,
        quantityAvailable: 5,
        quantityReserved: 1,
        quantityMaintenance: 0,
      },
      'loc-002': {
        quantityTotal: 4,
        quantityAvailable: 4,
        quantityReserved: 0,
        quantityMaintenance: 0,
      },
    },
  },
  {
    id: 'item-006',
    businessId: '550e8400-e29b-41d4-a716-446655440000',
    category: 'bicycle',
    itemType: 'sale',
    brand: 'Trek',
    model: 'FX 2',
    year: 2022,
    condition: 'good',
    specs: { type: 'hybrid', gears: 18, frame: 'aluminum', wheelSize: '700c' },
    photos: ['https://example.com/trek-fx2-1.jpg'],
    thumbnailUrl: 'https://example.com/trek-fx2-thumb.jpg',
    features: ['lock', 'kickstand', 'reflectors'],
    isActive: true,
    isFeatured: false,
    pricing: {},
    salePrice: {
      price: 8000000,
      isNegotiable: true,
      minPrice: 7500000,
      conditionNotes: 'Used for 1 year, good condition, no major scratches',
    },
    inventory: {
      'loc-001': {
        quantityTotal: 1,
        quantityAvailable: 1,
        quantityReserved: 0,
        quantityMaintenance: 0,
      },
    },
  },
];

// Helper: Calculate price based on duration
function calculateDurationPrice(dailyRate, weeklyRate, monthlyRate, longTermRate, durationDays) {
  if (durationDays >= 90 && longTermRate) {
    return {
      totalPrice: Math.ceil((durationDays / 90) * longTermRate),
      pricePerDay: Math.ceil(longTermRate / 90),
      tier: 'long-term',
    };
  } else if (durationDays >= 30 && monthlyRate) {
    return {
      totalPrice: Math.ceil((durationDays / 30) * monthlyRate),
      pricePerDay: Math.ceil(monthlyRate / 30),
      tier: 'monthly',
    };
  } else if (durationDays >= 7 && weeklyRate) {
    return {
      totalPrice: Math.ceil((durationDays / 7) * weeklyRate),
      pricePerDay: Math.ceil(weeklyRate / 7),
      tier: 'weekly',
    };
  } else {
    return { totalPrice: durationDays * dailyRate, pricePerDay: dailyRate, tier: 'daily' };
  }
}

/**
 * GET /api/rentals/:hubId
 * Get rental hub page data
 */
router.get('/:hubId', param('hubId').isUUID(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { hubId } = req.params;

    // TODO: Fetch hub page data from database
    // For now, return mock data with multi-venue support
    const hubData = {
      ...MOCK_BUSINESS_DATA,
      id: hubId,
      template: 'rental-service',
      logo: 'https://example.com/logo.png',
      coverImage: 'https://example.com/cover.jpg',

      // Locations (multi-venue)
      locations: MOCK_LOCATIONS,

      // Contact Settings (multi-channel)
      contactSettings: MOCK_CONTACT_SETTINGS,

      // Legacy contact for backward compatibility
      contact: {
        phone: MOCK_CONTACT_SETTINGS.phone,
        email: MOCK_CONTACT_SETTINGS.email,
        whatsapp: MOCK_CONTACT_SETTINGS.whatsappNumber,
        zalo: MOCK_CONTACT_SETTINGS.zaloId,
        telegram: MOCK_CONTACT_SETTINGS.telegramUsername,
      },

      // Features
      features: [
        { icon: '✅', text: 'New & Well-Maintained Bikes' },
        { icon: '🛡️', text: 'Full Insurance Coverage' },
        { icon: '⚡', text: 'Instant Booking' },
        { icon: '💰', text: 'Best Rates in Da Nang' },
      ],

      // Pricing Tiers
      pricingTiers: {
        daily: { label: '1 Day', discount: '0%' },
        weekly: { label: '1 Week', discount: '-15% avg' },
        monthly: { label: '1 Month', discount: '-35% avg' },
        longTerm: { label: 'Long-term (3+ months)', discount: '-50% avg' },
      },

      // Integrations
      integrations: {
        calComUrl: process.env.CAL_COM_EMBED_URL,
        vietqrBankBin: process.env.VIETQR_BANK_BIN,
        vietqrAccountNumber: process.env.VIETQR_ACCOUNT_NUMBER,
        vietqrAccountName: process.env.VIETQR_ACCOUNT_NAME,
      },
    };

    res.json(hubData);
  } catch (error) {
    console.error('Error fetching rental hub:', error);
    res.status(500).json({ error: 'Failed to fetch rental hub' });
  }
});

/**
 * GET /api/rentals/:hubId/fleet
 * Get fleet with multi-venue, multi-category, duration pricing support
 *
 * Query params:
 * - location: 'all' (default), 'loc-001', 'loc-002', etc.
 * - category: 'scooter', 'sport', 'electric', 'bicycle' (comma-separated for multiple)
 * - type: 'rental', 'sale', 'both'
 * - duration: number of days (optional, for price calculation)
 */
router.get('/:hubId/fleet', param('hubId').isUUID(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { hubId } = req.params;
    const { location = 'all', category, type, duration } = req.query;

    // Parse categories (comma-separated)
    const categoryFilter = category ? category.split(',') : null;
    const durationDays = duration ? parseInt(duration) : null;

    // If Airtable is configured, fetch from there
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      // TODO: Implement Airtable integration with filters
      // For now, fall through to mock data
    }

    // Fallback: Mock data with filtering
    let fleet = MOCK_FLEET.filter((item) => item.isActive);

    // Filter by category
    if (categoryFilter && categoryFilter.length > 0) {
      fleet = fleet.filter((item) => categoryFilter.includes(item.category));
    }

    // Filter by item type (rental/sale/both)
    if (type) {
      fleet = fleet.filter((item) => item.itemType === type || item.itemType === 'both');
    }

    // Filter by location availability
    if (location && location !== 'all') {
      fleet = fleet.filter(
        (item) => item.inventory[location] && item.inventory[location].quantityAvailable > 0
      );
    }

    // Transform fleet with location-specific pricing
    const transformedFleet = fleet.map((item) => {
      // Get pricing for requested location (or aggregate all locations)
      let pricingData;
      let inventoryData;

      if (location === 'all') {
        // Aggregate all locations - show minimum price
        const allPricing = Object.values(item.pricing);
        if (allPricing.length > 0) {
          pricingData = {
            dailyRate: Math.min(...allPricing.map((p) => p.dailyRate)),
            weeklyRate: allPricing[0].weeklyRate
              ? Math.min(...allPricing.filter((p) => p.weeklyRate).map((p) => p.weeklyRate))
              : null,
            monthlyRate: allPricing[0].monthlyRate
              ? Math.min(...allPricing.filter((p) => p.monthlyRate).map((p) => p.monthlyRate))
              : null,
            longTermRate: allPricing[0].longTermRate
              ? Math.min(...allPricing.filter((p) => p.longTermRate).map((p) => p.longTermRate))
              : null,
            depositAmount: Math.min(
              ...allPricing.filter((p) => p.depositAmount).map((p) => p.depositAmount)
            ),
          };
        }

        // Aggregate inventory
        const allInventory = Object.values(item.inventory);
        inventoryData = {
          totalAvailable: allInventory.reduce((sum, inv) => sum + inv.quantityAvailable, 0),
          totalQuantity: allInventory.reduce((sum, inv) => sum + inv.quantityTotal, 0),
          locations: Object.keys(item.inventory).length,
        };
      } else {
        // Location-specific
        pricingData = item.pricing[location] || {};
        inventoryData = item.inventory[location] || { quantityAvailable: 0 };
      }

      // Calculate duration-based pricing if requested
      let calculatedPrice = null;
      if (durationDays && pricingData && pricingData.dailyRate) {
        calculatedPrice = calculateDurationPrice(
          pricingData.dailyRate,
          pricingData.weeklyRate,
          pricingData.monthlyRate,
          pricingData.longTermRate,
          durationDays
        );
      }

      // Build response object
      const fleetItem = {
        id: item.id,
        category: item.category,
        itemType: item.itemType,
        brand: item.brand,
        model: item.model,
        year: item.year,
        condition: item.condition,
        specs: item.specs,
        photos: item.photos,
        thumbnailUrl: item.thumbnailUrl,
        features: item.features,
        isFeatured: item.isFeatured,

        // Pricing
        pricing: pricingData,

        // Duration calculation (if requested)
        ...(calculatedPrice && {
          durationPricing: {
            duration: durationDays,
            ...calculatedPrice,
            currency: 'VND',
          },
        }),

        // Sale price (if applicable)
        ...(item.salePrice && { salePrice: item.salePrice }),

        // Availability
        availability: inventoryData,
        isAvailable: inventoryData.quantityAvailable > 0 || inventoryData.totalAvailable > 0,
      };

      return fleetItem;
    });

    res.json({
      fleet: transformedFleet,
      filters: {
        location,
        category: categoryFilter,
        type,
        duration: durationDays,
      },
      total: transformedFleet.length,
    });
  } catch (error) {
    console.error('Error fetching fleet:', error);
    res.status(500).json({ error: 'Failed to fetch fleet' });
  }
});

/**
 * POST /api/rentals/:hubId/inquiry
 * Send inquiry via multi-channel (Zalo, WhatsApp, Email, Telegram)
 *
 * Body params:
 * - name: Customer name
 * - phone: Customer phone
 * - message: Inquiry message
 * - bikeModel: Optional bike model
 * - channel: Optional preferred channel ('zalo', 'whatsapp', 'email', 'telegram')
 * - duration: Optional rental duration
 * - location: Optional pickup location
 */
router.post(
  '/:hubId/inquiry',
  param('hubId').isUUID(),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('bikeModel').optional().trim(),
  body('channel').optional().isIn(['zalo', 'whatsapp', 'email', 'telegram']),
  body('duration').optional().isInt({ min: 1 }),
  body('location').optional().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, phone, message, bikeModel, channel, duration, location } = req.body;

      // Get contact settings (from mock data or database)
      const contactSettings = MOCK_CONTACT_SETTINGS;
      const preferredChannel = channel || contactSettings.primaryChannel;

      // Format message
      const inquiryMessage = `🏍️ New Rental Inquiry

👤 Name: ${name}
📱 Phone: ${phone}
${bikeModel ? `🚲 Bike: ${bikeModel}` : ''}
${duration ? `📅 Duration: ${duration} day${duration > 1 ? 's' : ''}` : ''}
${location ? `📍 Location: ${location}` : ''}

💬 Message:
${message}`;

      // Generate channel-specific contact URLs
      const contactUrls = {};

      // Zalo
      if (contactSettings.zaloId) {
        contactUrls.zalo = `https://zalo.me/${contactSettings.zaloId}`;
      }

      // WhatsApp
      if (contactSettings.whatsappNumber) {
        const cleanNumber = contactSettings.whatsappNumber.replace(/[^0-9]/g, '');
        contactUrls.whatsapp = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(inquiryMessage)}`;
      }

      // Telegram
      if (contactSettings.telegramUsername) {
        const cleanUsername = contactSettings.telegramUsername.replace('@', '');
        contactUrls.telegram = `https://t.me/${cleanUsername}?text=${encodeURIComponent(inquiryMessage)}`;
      }

      // Email
      if (contactSettings.email) {
        const subject = `Rental Inquiry - ${bikeModel || 'Bike Rental'}`;
        contactUrls.email = `mailto:${contactSettings.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryMessage)}`;
      }

      // Get primary channel URL
      const primaryUrl =
        contactUrls[preferredChannel] ||
        contactUrls.zalo ||
        contactUrls.whatsapp ||
        contactUrls.email;

      // TODO: Optionally save inquiry to database/Airtable

      res.json({
        success: true,
        primaryChannel: preferredChannel,
        primaryUrl,
        allChannels: contactUrls,
        contactSettings: {
          enabledChannels: contactSettings.enabledChannels,
          phone: contactSettings.phone,
          email: contactSettings.email,
        },
        message: `Inquiry received. Redirecting to ${preferredChannel}...`,
      });
    } catch (error) {
      console.error('Error processing inquiry:', error);
      res.status(500).json({ error: 'Failed to process inquiry' });
    }
  }
);

/**
 * POST /api/rentals/:hubId/vietqr
 * Generate VietQR payment code
 */
router.post(
  '/:hubId/vietqr',
  param('hubId').isUUID(),
  body('amount').isInt({ min: 1000 }).withMessage('Amount must be at least 1,000 VND'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('customerName').optional().trim(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { amount, description, customerName } = req.body;

      // VietQR format
      const vietqrData = {
        accountNo: process.env.VIETQR_ACCOUNT_NUMBER,
        accountName: process.env.VIETQR_ACCOUNT_NAME,
        acqId: process.env.VIETQR_BANK_BIN,
        amount: amount,
        addInfo: description,
        format: 'text',
        template: 'compact',
      };

      // Generate QR code URL from VietQR API
      const qrUrl = `https://img.vietqr.io/image/${vietqrData.acqId}-${vietqrData.accountNo}-${vietqrData.template}.png?amount=${vietqrData.amount}&addInfo=${encodeURIComponent(vietqrData.addInfo)}&accountName=${encodeURIComponent(vietqrData.accountName)}`;

      res.json({
        success: true,
        qrUrl,
        vietqrData,
      });
    } catch (error) {
      console.error('Error generating VietQR:', error);
      res.status(500).json({ error: 'Failed to generate VietQR code' });
    }
  }
);

export default router;
