/**
 * Wellness/Spa Module - API Routes
 * Handles services, staff, bookings for spa/massage/beauty businesses
 */

const express = require('express');
const { param, query, body, validationResult } = require('express-validator');
const router = express.Router();

// =====================================================
// MOCK DATA (Replace with database in Phase 2)
// =====================================================

const MOCK_BUSINESS = {
  hubId: '660e8400-e29b-41d4-a716-446655440000',
  name: 'Da Nang Luxury Spa',
  type: 'spa',
  description: 'Traditional Vietnamese spa and massage services in Da Nang',
  tagline: '🌺 Your Wellness Sanctuary',
  multiVenue: true,
  supportedLanguages: ['vi', 'en', 'ko', 'zh'],
  defaultLanguage: 'vi',
};

const MOCK_LOCATIONS = [
  {
    id: 'loc-city',
    name: 'City Center Spa',
    slug: 'city-center',
    address: {
      street: '123 Tran Phu St',
      city: 'Da Nang',
      coordinates: { lat: 16.0544, lng: 108.2022 },
    },
    phone: '+84905234567',
    hours: [{ days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], open: '09:00', close: '21:00' }],
    amenities: ['wifi', 'parking', 'sauna', 'tea_lounge'],
    isPrimary: true,
  },
  {
    id: 'loc-beach',
    name: 'My Khe Beach Spa',
    slug: 'my-khe-beach',
    address: {
      street: '456 Vo Nguyen Giap St',
      city: 'Da Nang',
      coordinates: { lat: 16.0385, lng: 108.2419 },
    },
    phone: '+84905234568',
    hours: [
      { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], open: '08:00', close: '22:00' },
    ],
    amenities: ['wifi', 'parking', 'ocean_view', 'couples_suite'],
    isPrimary: false,
  },
];

const MOCK_STAFF = [
  {
    id: 'staff-linh',
    name: 'Linh Nguyen',
    slug: 'linh-nguyen',
    title: 'Senior Thai Massage Therapist',
    bio: '10 years experience in traditional Thai massage and deep tissue therapy',
    specialties: ['Thai Massage', 'Deep Tissue', 'Aromatherapy', 'Hot Stone'],
    languages: ['Vietnamese', 'English', 'Thai'],
    locations: ['loc-city', 'loc-beach'],
    rating: { average: 4.9, count: 156 },
    premiumPricing: true,
    premiumPercentage: 15,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400',
  },
  {
    id: 'staff-mai',
    name: 'Mai Tran',
    slug: 'mai-tran',
    title: 'Facial & Skincare Specialist',
    bio: 'Expert in Korean skincare and advanced facial treatments',
    specialties: ['Facial Treatments', 'Microdermabrasion', 'Korean Skincare'],
    languages: ['Vietnamese', 'English', 'Korean'],
    locations: ['loc-city'],
    rating: { average: 4.8, count: 98 },
    premiumPricing: true,
    premiumPercentage: 10,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
  },
  {
    id: 'staff-hoa',
    name: 'Hoa Le',
    slug: 'hoa-le',
    title: 'Reflexology Expert',
    bio: 'Master of Vietnamese traditional reflexology',
    specialties: ['Reflexology', 'Foot Massage', 'Acupressure'],
    languages: ['Vietnamese', 'English'],
    locations: ['loc-city', 'loc-beach'],
    rating: { average: 4.7, count: 124 },
    premiumPricing: false,
    premiumPercentage: 0,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  },
];

const MOCK_SERVICES = [
  {
    id: 'svc-thai',
    name: 'Traditional Thai Massage',
    slug: 'traditional-thai-massage',
    category: 'massage',
    description: 'Authentic Thai massage for stress relief and flexibility',
    duration: 90,
    includes: ['Herbal compress', 'Aromatherapy oil', 'Hot towel', 'Green tea'],
    benefits: ['Stress relief', 'Improved flexibility', 'Better circulation'],
    locations: ['loc-city', 'loc-beach'],
    staffIds: ['staff-linh'],
    pricing: {
      'loc-city': { base: 450000, weekendPremium: 10 },
      'loc-beach': { base: 500000, weekendPremium: 15 },
    },
    isPopular: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
  },
  {
    id: 'svc-deep',
    name: 'Deep Tissue Massage',
    slug: 'deep-tissue-massage',
    category: 'massage',
    description: 'Intensive massage targeting deep muscle layers',
    duration: 60,
    includes: ['Deep pressure', 'Therapeutic oil', 'Hot stones', 'Herbal tea'],
    benefits: ['Pain relief', 'Improved mobility', 'Tension release'],
    locations: ['loc-city', 'loc-beach'],
    staffIds: ['staff-linh'],
    pricing: {
      'loc-city': { base: 400000, weekendPremium: 10 },
      'loc-beach': { base: 450000, weekendPremium: 15 },
    },
    isPopular: true,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800',
  },
  {
    id: 'svc-facial',
    name: 'Korean Glass Skin Facial',
    slug: 'korean-glass-skin-facial',
    category: 'facial',
    description: 'Achieve luminous skin with Korean facial techniques',
    duration: 75,
    includes: ['Double cleanse', 'Exfoliation', 'Sheet masks', 'LED therapy'],
    benefits: ['Radiant skin', 'Deep hydration', 'Pore refinement'],
    locations: ['loc-city'],
    staffIds: ['staff-mai'],
    pricing: {
      'loc-city': { base: 650000, weekendPremium: 10, depositRequired: true, deposit: 100000 },
    },
    isPopular: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800',
  },
  {
    id: 'svc-reflex',
    name: 'Reflexology Foot Massage',
    slug: 'reflexology-foot-massage',
    category: 'reflexology',
    description: 'Traditional Vietnamese reflexology for full body healing',
    duration: 45,
    includes: ['Foot soak', 'Pressure point therapy', 'Herbal balm', 'Ginger tea'],
    benefits: ['Full body relaxation', 'Improved circulation', 'Better sleep'],
    locations: ['loc-city', 'loc-beach'],
    staffIds: ['staff-hoa'],
    pricing: {
      'loc-city': { base: 300000, weekendPremium: 5 },
      'loc-beach': { base: 320000, weekendPremium: 5 },
    },
    isPopular: true,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800',
  },
  {
    id: 'svc-couples',
    name: 'Couples Spa Package',
    slug: 'couples-spa-package',
    category: 'package',
    description: 'Romantic spa experience for two with ocean views',
    duration: 120,
    includes: ['Side-by-side massage', 'Private suite', 'Champagne', 'Strawberries'],
    benefits: ['Romantic experience', 'Shared relaxation', 'Quality time'],
    locations: ['loc-beach'],
    staffIds: ['staff-linh'],
    pricing: {
      'loc-beach': { base: 1200000, weekendPremium: 20, depositRequired: true, deposit: 300000 },
    },
    isPopular: false,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
  },
];

const MOCK_CONTACT = {
  primaryChannel: 'zalo',
  zalo: { id: '0905234567' },
  whatsapp: { number: '+84905234567' },
  email: 'info@danangspa.com',
  phone: '+84905234567',
};

// =====================================================
// API ENDPOINTS
// =====================================================

// GET /api/wellness/:hubId - Business Info
router.get('/:hubId', param('hubId').isUUID(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  res.json({
    success: true,
    data: {
      business: MOCK_BUSINESS,
      locations: MOCK_LOCATIONS,
      contact: MOCK_CONTACT,
    },
  });
});

// GET /api/wellness/:hubId/services - List Services
router.get(
  '/:hubId/services',
  param('hubId').isUUID(),
  query('location').optional().isString(),
  query('category').optional().isIn(['massage', 'facial', 'reflexology', 'package']),
  query('staffId').optional().isString(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let services = [...MOCK_SERVICES];
    const { location, category, staffId } = req.query;

    if (location && location !== 'all') {
      services = services.filter((s) => s.locations.includes(location));
    }
    if (category) {
      services = services.filter((s) => s.category === category);
    }
    if (staffId) {
      services = services.filter((s) => s.staffIds.includes(staffId));
    }

    // Enrich with staff info
    services = services.map((service) => ({
      ...service,
      staff: service.staffIds.map((id) => MOCK_STAFF.find((s) => s.id === id)),
    }));

    res.json({ success: true, data: { services, count: services.length } });
  }
);

// GET /api/wellness/:hubId/staff - List Staff
router.get(
  '/:hubId/staff',
  param('hubId').isUUID(),
  query('location').optional().isString(),
  query('featured').optional().isBoolean(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let staff = [...MOCK_STAFF];
    const { location, featured } = req.query;

    if (location) {
      staff = staff.filter((s) => s.locations.includes(location));
    }
    if (featured === 'true') {
      staff = staff.filter((s) => s.isFeatured);
    }

    res.json({ success: true, data: { staff, count: staff.length } });
  }
);

// GET /api/wellness/:hubId/staff/:staffId - Staff Details
router.get('/:hubId/staff/:staffId', param('hubId').isUUID(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const staff = MOCK_STAFF.find(
    (s) => s.id === req.params.staffId || s.slug === req.params.staffId
  );
  if (!staff) return res.status(404).json({ success: false, error: 'Staff member not found' });

  const services = MOCK_SERVICES.filter((s) => s.staffIds.includes(staff.id));

  res.json({ success: true, data: { staff, services } });
});

// POST /api/wellness/:hubId/booking - Create Booking Inquiry
router.post(
  '/:hubId/booking',
  param('hubId').isUUID(),
  body('name').notEmpty(),
  body('phone').notEmpty(),
  body('serviceId').notEmpty(),
  body('staffId').optional(),
  body('locationId').optional(),
  body('message').optional(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, phone, serviceId, staffId, locationId, message, channel } = req.body;
    const service = MOCK_SERVICES.find((s) => s.id === serviceId);
    const staff = staffId ? MOCK_STAFF.find((s) => s.id === staffId) : null;
    const location = locationId
      ? MOCK_LOCATIONS.find((l) => l.id === locationId)
      : MOCK_LOCATIONS[0];

    const inquiryMessage = `🌺 **Spa Booking Inquiry**\n\nName: ${name}\nPhone: ${phone}\nService: ${service?.name || 'N/A'}\nTherapist: ${staff?.name || 'No preference'}\nLocation: ${location?.name || 'N/A'}\n${message ? `\nMessage: ${message}` : ''}`;

    const preferredChannel = channel || MOCK_CONTACT.primaryChannel;
    const contactUrls = {
      zalo: `https://zalo.me/${MOCK_CONTACT.zalo.id}?text=${encodeURIComponent(inquiryMessage)}`,
      whatsapp: `https://wa.me/${MOCK_CONTACT.whatsapp.number}?text=${encodeURIComponent(inquiryMessage)}`,
      email: `mailto:${MOCK_CONTACT.email}?subject=Spa Booking&body=${encodeURIComponent(inquiryMessage)}`,
    };

    res.json({
      success: true,
      data: {
        primaryChannel: preferredChannel,
        primaryUrl: contactUrls[preferredChannel],
        allChannels: contactUrls,
        message: 'Booking inquiry prepared. Click to send via preferred channel.',
      },
    });
  }
);

module.exports = router;
