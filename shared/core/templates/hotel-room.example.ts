/**
 * Hotel Room Template - Example Configuration
 *
 * This template is designed for hotel rooms accessed via QR code.
 * Each room can have its own QR code with room-specific information.
 *
 * Modules enabled:
 * - WiFi (room-specific credentials)
 * - Price List (minibar, laundry)
 * - Services (room service, spa, gym)
 * - Contacts (reception, concierge)
 * - Attractions (nearby places)
 * - Transport (taxi, airport shuttle)
 * - Deals (partner discounts)
 */

import { TemplateConfig } from '../modules/types';

export const hotelRoomTemplate: TemplateConfig = {
  type: 'hotel_room',

  name: {
    en: 'Seaside Luxury Hotel',
    vi: 'Khách sạn Sang trọng Bờ biển',
    ko: '해변 럭셔리 호텔',
  },

  description: {
    en: 'Welcome to your room. Scan for all services and information.',
    vi: 'Chào mừng đến phòng của bạn. Quét để xem tất cả dịch vụ.',
    ko: '객실에 오신 것을 환영합니다. 모든 서비스와 정보를 확인하세요.',
  },

  logo: 'https://example.com/hotel-logo.png',
  primaryColor: '#1e40af', // Deep blue

  enabledModules: [
    'wifi',
    'priceList',
    'services',
    'contacts',
    'attractions',
    'transport',
    'deals',
  ],

  languages: ['en', 'vi', 'ko', 'zh', 'ja'],
  defaultLanguage: 'en',

  currencies: ['VND', 'USD', 'KRW', 'JPY'],
  defaultCurrency: 'VND',

  modules: {
    // ===================
    // WiFi Configuration
    // ===================
    wifi: {
      networks: [
        {
          id: 'room-wifi',
          ssid: 'Seaside_Room_301',
          password: 'Welcome2024!',
          security: 'WPA2',
          bandwidthMbps: 100,
          note: {
            en: 'High-speed fiber connection',
            vi: 'Kết nối cáp quang tốc độ cao',
            ko: '초고속 광섬유 연결',
          },
        },
        {
          id: 'lobby-wifi',
          ssid: 'Seaside_Lobby',
          password: 'seaside2024',
          security: 'WPA2',
          note: {
            en: 'Available in lobby and restaurant',
            vi: 'Có sẵn tại sảnh và nhà hàng',
            ko: '로비 및 레스토랑에서 이용 가능',
          },
        },
      ],
      showPassword: true,
      showQrCode: true,
    },

    // ===================
    // Minibar & Laundry
    // ===================
    priceList: {
      defaultCurrency: 'VND',
      showCurrencyConverter: true,
      supportedCurrencies: ['VND', 'USD'],
      categories: [
        {
          id: 'minibar',
          name: { en: 'Minibar', vi: 'Minibar', ko: '미니바' },
          icon: '🍺',
          sortOrder: 1,
          items: [
            {
              id: 'coca-cola',
              name: { en: 'Coca-Cola', vi: 'Coca-Cola', ko: '코카콜라' },
              price: 35000,
              currency: 'VND',
              category: 'minibar',
              available: true,
            },
            {
              id: 'heineken',
              name: { en: 'Heineken Beer', vi: 'Bia Heineken', ko: '하이네켄 맥주' },
              price: 55000,
              currency: 'VND',
              category: 'minibar',
              available: true,
            },
            {
              id: 'water-evian',
              name: { en: 'Evian Water', vi: 'Nước Evian', ko: '에비앙 생수' },
              price: 45000,
              currency: 'VND',
              category: 'minibar',
              available: true,
            },
            {
              id: 'pringles',
              name: { en: 'Pringles', vi: 'Pringles', ko: '프링글스' },
              price: 65000,
              currency: 'VND',
              category: 'minibar',
              available: true,
            },
            {
              id: 'chocolate',
              name: { en: 'Swiss Chocolate', vi: 'Sô-cô-la Thụy Sĩ', ko: '스위스 초콜릿' },
              price: 85000,
              currency: 'VND',
              category: 'minibar',
              available: true,
              tags: ['popular'],
            },
          ],
        },
        {
          id: 'laundry',
          name: { en: 'Laundry Service', vi: 'Giặt ủi', ko: '세탁 서비스' },
          icon: '👔',
          sortOrder: 2,
          items: [
            {
              id: 'shirt',
              name: { en: 'Shirt', vi: 'Áo sơ mi', ko: '셔츠' },
              price: 45000,
              currency: 'VND',
              unit: { en: 'per item', vi: 'mỗi cái', ko: '개당' },
              category: 'laundry',
              available: true,
            },
            {
              id: 'pants',
              name: { en: 'Pants/Trousers', vi: 'Quần', ko: '바지' },
              price: 55000,
              currency: 'VND',
              unit: { en: 'per item', vi: 'mỗi cái', ko: '개당' },
              category: 'laundry',
              available: true,
            },
            {
              id: 'dress',
              name: { en: 'Dress', vi: 'Váy', ko: '드레스' },
              price: 85000,
              currency: 'VND',
              unit: { en: 'per item', vi: 'mỗi cái', ko: '개당' },
              category: 'laundry',
              available: true,
            },
            {
              id: 'suit',
              name: { en: 'Suit (2 pieces)', vi: 'Bộ vest (2 món)', ko: '정장 (2피스)' },
              price: 150000,
              currency: 'VND',
              unit: { en: 'per set', vi: 'mỗi bộ', ko: '세트당' },
              category: 'laundry',
              available: true,
            },
            {
              id: 'express',
              name: {
                en: 'Express Service (+50%)',
                vi: 'Dịch vụ nhanh (+50%)',
                ko: '급행 서비스 (+50%)',
              },
              description: {
                en: 'Same day return before 6 PM',
                vi: 'Trả trong ngày trước 6 giờ chiều',
                ko: '당일 오후 6시 이전 반환',
              },
              price: 0,
              currency: 'VND',
              category: 'laundry',
              available: true,
              tags: ['popular'],
            },
          ],
        },
      ],
    },

    // ===================
    // Hotel Services
    // ===================
    services: {
      showPrices: true,
      showBookingButton: true,
      categories: [
        {
          id: 'room-service',
          name: { en: 'Room Service', vi: 'Dịch vụ phòng', ko: '룸서비스' },
          icon: '🍽️',
          availableHours: '06:00 - 23:00',
          contactNumber: '0',
          sortOrder: 1,
          items: [
            {
              id: 'breakfast',
              name: { en: 'Breakfast Menu', vi: 'Thực đơn sáng', ko: '조식 메뉴' },
              description: {
                en: 'View our breakfast options',
                vi: 'Xem các lựa chọn bữa sáng',
                ko: '조식 메뉴 보기',
              },
              category: 'room-service',
              available: true,
              icon: '🍳',
            },
            {
              id: 'all-day',
              name: { en: 'All-Day Dining', vi: 'Ăn cả ngày', ko: '종일 식사' },
              description: {
                en: 'Full menu available 6AM-11PM',
                vi: 'Thực đơn đầy đủ 6h-23h',
                ko: '전체 메뉴 오전 6시-오후 11시',
              },
              category: 'room-service',
              available: true,
              icon: '🍝',
            },
          ],
        },
        {
          id: 'spa',
          name: { en: 'Spa & Wellness', vi: 'Spa & Sức khỏe', ko: '스파 & 웰니스' },
          icon: '💆',
          availableHours: '09:00 - 21:00',
          sortOrder: 2,
          items: [
            {
              id: 'thai-massage',
              name: { en: 'Thai Massage', vi: 'Massage Thái', ko: '태국 마사지' },
              price: 800000,
              currency: 'VND',
              unit: { en: '60 min', vi: '60 phút', ko: '60분' },
              category: 'spa',
              available: true,
              bookingRequired: true,
            },
            {
              id: 'facial',
              name: { en: 'Facial Treatment', vi: 'Chăm sóc da mặt', ko: '페이셜 케어' },
              price: 650000,
              currency: 'VND',
              unit: { en: '45 min', vi: '45 phút', ko: '45분' },
              category: 'spa',
              available: true,
              bookingRequired: true,
            },
          ],
        },
        {
          id: 'facilities',
          name: { en: 'Facilities', vi: 'Tiện ích', ko: '시설' },
          icon: '🏊',
          sortOrder: 3,
          items: [
            {
              id: 'pool',
              name: { en: 'Swimming Pool', vi: 'Hồ bơi', ko: '수영장' },
              description: {
                en: 'Rooftop infinity pool, 7th floor',
                vi: 'Hồ bơi vô cực trên sân thượng, tầng 7',
                ko: '루프탑 인피니티 풀, 7층',
              },
              turnaround: { en: '06:00 - 21:00', vi: '06:00 - 21:00', ko: '06:00 - 21:00' },
              category: 'facilities',
              available: true,
              icon: '🏊',
            },
            {
              id: 'gym',
              name: { en: 'Fitness Center', vi: 'Phòng tập', ko: '피트니스 센터' },
              description: {
                en: '24-hour access with room key',
                vi: 'Truy cập 24 giờ bằng thẻ phòng',
                ko: '룸키로 24시간 이용 가능',
              },
              category: 'facilities',
              available: true,
              icon: '🏋️',
            },
          ],
        },
      ],
    },

    // ===================
    // Contacts
    // ===================
    contacts: {
      showCallButton: true,
      showMessageButton: true,
      businessContacts: [
        {
          id: 'reception',
          label: { en: 'Reception', vi: 'Lễ tân', ko: '프론트' },
          number: '0',
          type: 'phone',
          available24h: true,
          isPrimary: true,
        },
        {
          id: 'concierge',
          label: { en: 'Concierge', vi: 'Hỗ trợ khách', ko: '컨시어지' },
          number: '1',
          type: 'phone',
          availableHours: '07:00 - 22:00',
        },
        {
          id: 'whatsapp',
          label: { en: 'WhatsApp Support', vi: 'Hỗ trợ WhatsApp', ko: 'WhatsApp 지원' },
          number: '+84901234567',
          type: 'whatsapp',
          available24h: true,
        },
      ],
      emergencyContacts: [
        {
          id: 'police',
          label: { en: 'Police', vi: 'Công an', ko: '경찰' },
          number: '113',
          icon: '🚔',
        },
        {
          id: 'ambulance',
          label: { en: 'Ambulance', vi: 'Cấp cứu', ko: '응급차' },
          number: '115',
          icon: '🚑',
        },
        {
          id: 'fire',
          label: { en: 'Fire', vi: 'Cứu hỏa', ko: '소방서' },
          number: '114',
          icon: '🚒',
        },
      ],
    },

    // ===================
    // Nearby Attractions
    // ===================
    attractions: {
      showMap: true,
      showDistances: true,
      groupByCategory: true,
      attractions: [
        {
          id: 'my-khe-beach',
          name: { en: 'My Khe Beach', vi: 'Bãi biển Mỹ Khê', ko: '미케 해변' },
          description: {
            en: 'One of the most beautiful beaches in Vietnam',
            vi: 'Một trong những bãi biển đẹp nhất Việt Nam',
            ko: '베트남에서 가장 아름다운 해변 중 하나',
          },
          category: 'beach',
          address: { en: 'Vo Nguyen Giap St', vi: 'Đường Võ Nguyên Giáp', ko: '보응우옌잡 거리' },
          distance: '200m',
          walkingTime: '3 min',
          rating: 4.7,
          externalLinks: {
            googleMaps: 'https://maps.google.com/?q=my+khe+beach+da+nang',
          },
        },
        {
          id: 'dragon-bridge',
          name: { en: 'Dragon Bridge', vi: 'Cầu Rồng', ko: '용 다리' },
          description: {
            en: 'Iconic bridge that breathes fire on weekends',
            vi: 'Cầu biểu tượng phun lửa vào cuối tuần',
            ko: '주말에 불을 뿜는 상징적인 다리',
          },
          category: 'entertainment',
          address: { en: 'Nguyen Van Linh St', vi: 'Đường Nguyễn Văn Linh', ko: '응우옌반린 거리' },
          distance: '2.5km',
          walkingTime: '30 min',
          rating: 4.5,
          externalLinks: {
            googleMaps: 'https://maps.google.com/?q=dragon+bridge+da+nang',
          },
        },
        {
          id: 'roots-cafe',
          name: { en: 'ROOTS Plant-Based Cafe', vi: 'ROOTS Quán Chay', ko: 'ROOTS 비건 카페' },
          description: {
            en: 'Healthy plant-based food and specialty coffee',
            vi: 'Thực phẩm thực vật lành mạnh và cà phê đặc sản',
            ko: '건강한 식물성 음식과 스페셜티 커피',
          },
          category: 'cafe',
          address: {
            en: '27 Tran Bach Dang, Da Nang',
            vi: '27 Trần Bạch Đằng, Đà Nẵng',
            ko: '27 쩐박당, 다낭',
          },
          distance: '800m',
          walkingTime: '10 min',
          priceRange: '$$',
          rating: 4.8,
          partnerDiscount: {
            percentage: 10,
            description: {
              en: '10% off for hotel guests',
              vi: 'Giảm 10% cho khách khách sạn',
              ko: '호텔 투숙객 10% 할인',
            },
            code: 'SEASIDE10',
          },
          externalLinks: {
            googleMaps: 'https://maps.google.com/?q=roots+cafe+da+nang',
            tripAdvisor: 'https://tripadvisor.com/roots-cafe',
          },
        },
      ],
    },

    // ===================
    // Transport
    // ===================
    transport: {
      showPriceEstimates: true,
      airportInfo: {
        name: 'Da Nang International Airport',
        code: 'DAD',
        distance: '5km',
        estimatedTime: '15 min',
        shuttleAvailable: true,
        shuttlePrice: 150000,
      },
      options: [
        {
          id: 'hotel-shuttle',
          type: 'hotel_transfer',
          name: { en: 'Hotel Shuttle', vi: 'Xe đưa đón', ko: '호텔 셔틀' },
          description: {
            en: 'Free shuttle to airport (book 24h ahead)',
            vi: 'Xe đưa đón sân bay miễn phí (đặt trước 24h)',
            ko: '공항 무료 셔틀 (24시간 전 예약)',
          },
          bookingRequired: true,
          available24h: false,
          icon: '🚐',
        },
        {
          id: 'grab',
          type: 'grab',
          name: { en: 'Grab', vi: 'Grab', ko: 'Grab' },
          description: {
            en: 'Ride-hailing app - most popular in Vietnam',
            vi: 'Ứng dụng gọi xe - phổ biến nhất Việt Nam',
            ko: '차량 호출 앱 - 베트남에서 가장 인기',
          },
          appLink: 'grab://',
          estimatedPrice: {
            from: 80000,
            to: 120000,
            currency: 'VND',
            note: { en: 'to airport', vi: 'đến sân bay', ko: '공항까지' },
          },
          available24h: true,
          icon: '🚗',
        },
        {
          id: 'taxi',
          type: 'taxi',
          name: { en: 'Taxi Mai Linh', vi: 'Taxi Mai Linh', ko: '마이린 택시' },
          contactNumber: '0236 3 56 56 56',
          estimatedPrice: {
            from: 100000,
            to: 150000,
            currency: 'VND',
            note: { en: 'to airport', vi: 'đến sân bay', ko: '공항까지' },
          },
          available24h: true,
          icon: '🚕',
        },
      ],
    },

    // ===================
    // Partner Deals
    // ===================
    deals: {
      showExpirationDates: true,
      groupByCategory: true,
      deals: [
        {
          id: 'roots-discount',
          partnerName: { en: 'ROOTS Cafe', vi: 'ROOTS Quán', ko: 'ROOTS 카페' },
          category: 'restaurant',
          title: {
            en: '10% Off All Orders',
            vi: 'Giảm 10% tất cả đơn hàng',
            ko: '전 주문 10% 할인',
          },
          description: {
            en: 'Show your room key to receive discount',
            vi: 'Xuất trình thẻ phòng để được giảm giá',
            ko: '룸키를 보여주시면 할인 적용',
          },
          discountType: 'percentage',
          discountValue: 10,
          discountCode: 'SEASIDE10',
          validUntil: '2025-12-31',
          exclusive: true,
          distance: '800m',
        },
        {
          id: 'spa-deal',
          partnerName: { en: 'Ocean Spa', vi: 'Ocean Spa', ko: 'Ocean Spa' },
          category: 'spa',
          title: {
            en: 'Free Welcome Drink',
            vi: 'Tặng đồ uống chào mừng',
            ko: '웰컴 드링크 무료',
          },
          description: {
            en: 'Complimentary drink with any treatment',
            vi: 'Tặng đồ uống khi sử dụng bất kỳ liệu trình nào',
            ko: '모든 트리트먼트에 음료 무료 제공',
          },
          discountType: 'freebie',
          discountValue: 0,
          exclusive: true,
        },
      ],
    },
  },
};

export default hotelRoomTemplate;
