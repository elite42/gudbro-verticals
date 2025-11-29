/**
 * Airbnb Template - Example Configuration
 *
 * This template is designed for vacation rentals (Airbnb, VRBO, etc.)
 * accessed via QR code placed in the property.
 *
 * Modules enabled:
 * - WiFi (property credentials)
 * - House Rules (check-in/out, policies)
 * - Contacts (host, emergency)
 * - Attractions (local recommendations)
 * - Transport (getting around)
 * - Deals (host's favorite places with discounts)
 */

import { TemplateConfig } from '../modules/types';

export const airbnbTemplate: TemplateConfig = {
  type: 'airbnb',

  name: {
    en: 'Beachfront Studio',
    vi: 'Căn hộ Studio Bờ biển',
    ko: '비치프론트 스튜디오',
  },

  description: {
    en: 'Welcome to your home away from home! Everything you need to know is here.',
    vi: 'Chào mừng đến ngôi nhà thứ hai của bạn! Mọi thông tin bạn cần ở đây.',
    ko: '집처럼 편안한 공간에 오신 것을 환영합니다! 필요한 모든 정보가 여기 있습니다.',
  },

  logo: 'https://example.com/property-logo.png',
  primaryColor: '#FF5A5F', // Airbnb red

  enabledModules: [
    'wifi',
    'houseRules',
    'checkInOut',
    'contacts',
    'attractions',
    'transport',
    'deals',
  ],

  languages: ['en', 'vi', 'ko', 'zh'],
  defaultLanguage: 'en',

  currencies: ['VND', 'USD'],
  defaultCurrency: 'VND',

  modules: {
    // ===================
    // WiFi Configuration
    // ===================
    wifi: {
      networks: [
        {
          id: 'main-wifi',
          ssid: 'BeachStudio_5G',
          password: 'Welcome2024',
          security: 'WPA2',
          bandwidthMbps: 50,
          note: {
            en: 'Fast fiber internet - great for streaming!',
            vi: 'Internet cáp quang nhanh - tuyệt vời để xem phim!',
            ko: '빠른 광섬유 인터넷 - 스트리밍에 최적!',
          },
        },
      ],
      showPassword: true,
      showQrCode: true,
    },

    // ===================
    // House Rules
    // ===================
    houseRules: {
      checkInTime: '14:00',
      checkOutTime: '11:00',
      maxGuests: 4,
      quietHours: { from: '22:00', to: '08:00' },
      emergencyContact: {
        id: 'host-emergency',
        label: { en: 'Host (Emergency)', vi: 'Chủ nhà (Khẩn cấp)', ko: '호스트 (긴급)' },
        number: '+84901234567',
        type: 'whatsapp',
        available24h: true,
      },
      rules: [
        {
          id: 'no-smoking',
          icon: '🚭',
          title: { en: 'No Smoking', vi: 'Không hút thuốc', ko: '금연' },
          description: {
            en: 'Smoking is not allowed inside the property. Please use the balcony.',
            vi: 'Không được hút thuốc trong nhà. Vui lòng sử dụng ban công.',
            ko: '실내 흡연 금지. 발코니를 이용해 주세요.',
          },
          type: 'not_allowed',
          category: 'smoking',
        },
        {
          id: 'no-parties',
          icon: '🎉',
          title: { en: 'No Parties', vi: 'Không tổ chức tiệc', ko: '파티 금지' },
          description: {
            en: 'Parties and events are not allowed. Maximum 4 guests.',
            vi: 'Không được tổ chức tiệc. Tối đa 4 khách.',
            ko: '파티 및 행사 금지. 최대 4명.',
          },
          type: 'not_allowed',
          category: 'guests',
        },
        {
          id: 'quiet-hours',
          icon: '🤫',
          title: { en: 'Quiet Hours', vi: 'Giờ yên tĩnh', ko: '조용한 시간' },
          description: {
            en: 'Please keep noise down between 10 PM and 8 AM.',
            vi: 'Vui lòng giữ yên lặng từ 22h đến 8h.',
            ko: '오후 10시부터 오전 8시까지 소음을 줄여주세요.',
          },
          type: 'info',
          category: 'noise',
        },
        {
          id: 'pets-allowed',
          icon: '🐕',
          title: { en: 'Pets Welcome', vi: 'Cho phép thú cưng', ko: '반려동물 환영' },
          description: {
            en: 'Well-behaved pets are welcome! Please clean up after them.',
            vi: 'Thú cưng ngoan được chào đón! Vui lòng dọn dẹp sau khi chúng.',
            ko: '얌전한 반려동물 환영! 배변 처리를 부탁드립니다.',
          },
          type: 'allowed',
          category: 'pets',
        },
        {
          id: 'trash',
          icon: '🗑️',
          title: { en: 'Trash Disposal', vi: 'Xử lý rác', ko: '쓰레기 처리' },
          description: {
            en: 'Please separate recyclables. Trash pickup is Monday and Thursday.',
            vi: 'Vui lòng phân loại rác tái chế. Rác được thu vào thứ 2 và thứ 5.',
            ko: '재활용품을 분리해 주세요. 쓰레기 수거는 월요일과 목요일.',
          },
          type: 'info',
          category: 'general',
        },
        {
          id: 'ac-usage',
          icon: '❄️',
          title: { en: 'AC & Energy', vi: 'Điều hòa & Năng lượng', ko: '에어컨 & 에너지' },
          description: {
            en: 'Please turn off AC when leaving. Remote is on the nightstand.',
            vi: 'Vui lòng tắt điều hòa khi ra ngoài. Remote ở trên tủ đầu giường.',
            ko: '외출 시 에어컨을 꺼주세요. 리모컨은 협탁 위에 있습니다.',
          },
          type: 'info',
          category: 'general',
        },
        {
          id: 'parking',
          icon: '🅿️',
          title: { en: 'Free Parking', vi: 'Đỗ xe miễn phí', ko: '무료 주차' },
          description: {
            en: 'Free motorbike parking in front. Car parking available nearby (50k/day).',
            vi: 'Đỗ xe máy miễn phí phía trước. Bãi đậu ô tô gần đây (50k/ngày).',
            ko: '오토바이 무료 주차. 근처 자동차 주차 가능 (50k/일).',
          },
          type: 'allowed',
          category: 'parking',
        },
      ],
    },

    // ===================
    // Check-in/out Info
    // ===================
    checkInOut: {
      selfCheckIn: true,
      checkIn: {
        time: '14:00',
        earlyCheckInAvailable: true,
        earlyCheckInFee: 200000,
        instructions: {
          en: 'The lockbox is located next to the main door. Your code is the last 4 digits of your booking confirmation.',
          vi: 'Hộp khóa ở bên cạnh cửa chính. Mã của bạn là 4 chữ số cuối của mã xác nhận đặt phòng.',
          ko: '잠금함은 현관문 옆에 있습니다. 코드는 예약 확인 번호의 마지막 4자리입니다.',
        },
        lockboxLocation: {
          en: 'Gray lockbox next to the door, at knee height',
          vi: 'Hộp khóa màu xám bên cạnh cửa, ngang đầu gối',
          ko: '문 옆 무릎 높이에 회색 잠금함',
        },
      },
      checkOut: {
        time: '11:00',
        lateCheckOutAvailable: true,
        lateCheckOutFee: 150000,
        instructions: {
          en: 'Please leave the keys in the lockbox. Strip the beds and put towels in the bathroom. Take out the trash.',
          vi: 'Vui lòng để chìa khóa trong hộp khóa. Gỡ ga giường và để khăn trong phòng tắm. Đổ rác.',
          ko: '열쇠는 잠금함에 넣어주세요. 침대 시트를 벗기고 수건은 욕실에 두세요. 쓰레기를 버려주세요.',
        },
        keyDropLocation: {
          en: 'Same lockbox as check-in',
          vi: 'Cùng hộp khóa như khi nhận phòng',
          ko: '체크인 시 사용한 잠금함과 동일',
        },
      },
    },

    // ===================
    // Contacts
    // ===================
    contacts: {
      showCallButton: true,
      showMessageButton: true,
      businessContacts: [
        {
          id: 'host-whatsapp',
          label: { en: 'Host (WhatsApp)', vi: 'Chủ nhà (WhatsApp)', ko: '호스트 (WhatsApp)' },
          number: '+84901234567',
          type: 'whatsapp',
          available24h: false,
          availableHours: '08:00 - 22:00',
          isPrimary: true,
        },
        {
          id: 'host-zalo',
          label: { en: 'Host (Zalo)', vi: 'Chủ nhà (Zalo)', ko: '호스트 (Zalo)' },
          number: '0901234567',
          type: 'zalo',
        },
        {
          id: 'cleaning',
          label: { en: 'Cleaning Service', vi: 'Dịch vụ dọn dẹp', ko: '청소 서비스' },
          number: '+84909876543',
          type: 'phone',
          availableHours: '09:00 - 17:00',
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
          id: 'hospital',
          label: { en: 'Nearest Hospital', vi: 'Bệnh viện gần nhất', ko: '가장 가까운 병원' },
          number: '0236 3 123 456',
          description: {
            en: 'Da Nang General Hospital - 2km away',
            vi: 'Bệnh viện Đa khoa Đà Nẵng - cách 2km',
            ko: '다낭 종합병원 - 2km 거리',
          },
          icon: '🏥',
        },
      ],
    },

    // ===================
    // Local Tips & Attractions
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
            en: "The beach is just 2 minutes walk! Best time is 5-7 AM or 5-7 PM to avoid the heat.",
            vi: 'Bãi biển chỉ cách 2 phút đi bộ! Thời gian tốt nhất là 5-7h sáng hoặc 5-7h chiều.',
            ko: '해변까지 도보 2분! 더위를 피하려면 오전 5-7시 또는 오후 5-7시가 좋습니다.',
          },
          category: 'beach',
          address: { en: 'Right in front!', vi: 'Ngay phía trước!', ko: '바로 앞!' },
          distance: '100m',
          walkingTime: '2 min',
          rating: 4.8,
        },
        {
          id: 'banh-mi-shop',
          name: { en: 'Bánh Mì Bà Lan', vi: 'Bánh Mì Bà Lan', ko: '반미 바란' },
          description: {
            en: 'Best bánh mì in the area! Only 25k VND. Get the special with egg.',
            vi: 'Bánh mì ngon nhất khu vực! Chỉ 25k. Nên gọi đặc biệt có trứng.',
            ko: '이 지역 최고의 반미! 25k VND. 계란이 들어간 스페셜 추천.',
          },
          category: 'restaurant',
          address: { en: '45 Nguyen Van Thoai', vi: '45 Nguyễn Văn Thoại', ko: '45 응우옌반토아이' },
          distance: '300m',
          walkingTime: '4 min',
          priceRange: '$',
          rating: 4.9,
          openingHours: '06:00 - 20:00',
        },
        {
          id: 'coffee-shop',
          name: { en: 'ROOTS Plant-Based Cafe', vi: 'ROOTS Quán Chay', ko: 'ROOTS 비건 카페' },
          description: {
            en: 'My favorite coffee spot! Great for working with laptop. Try the coconut latte.',
            vi: 'Quán cà phê yêu thích của tôi! Tuyệt vời để làm việc. Thử cà phê sữa dừa.',
            ko: '제가 좋아하는 카페! 노트북 작업하기 좋아요. 코코넛 라떼 추천.',
          },
          category: 'cafe',
          address: { en: '27 Tran Bach Dang', vi: '27 Trần Bạch Đằng', ko: '27 쩐박당' },
          distance: '800m',
          walkingTime: '10 min',
          priceRange: '$$',
          rating: 4.8,
          partnerDiscount: {
            percentage: 10,
            description: {
              en: 'Show this page for 10% off!',
              vi: 'Xuất trình trang này để được giảm 10%!',
              ko: '이 페이지를 보여주면 10% 할인!',
            },
          },
        },
        {
          id: 'convenience-store',
          name: { en: 'Circle K', vi: 'Circle K', ko: 'Circle K' },
          description: {
            en: 'Closest convenience store. Open 24/7. Has ATM inside.',
            vi: 'Cửa hàng tiện lợi gần nhất. Mở 24/7. Có ATM bên trong.',
            ko: '가장 가까운 편의점. 24시간 영업. ATM 있음.',
          },
          category: 'shopping',
          address: { en: '10 Vo Nguyen Giap', vi: '10 Võ Nguyên Giáp', ko: '10 보응우옌잡' },
          distance: '150m',
          walkingTime: '2 min',
          priceRange: '$',
          openingHours: '24/7',
        },
        {
          id: 'marble-mountains',
          name: { en: 'Marble Mountains', vi: 'Ngũ Hành Sơn', ko: '오행산' },
          description: {
            en: 'Must-visit! Go early morning to avoid crowds. Amazing caves and views.',
            vi: 'Phải đến! Đi sáng sớm để tránh đông. Hang động và cảnh đẹp tuyệt vời.',
            ko: '필수 방문! 혼잡을 피하려면 이른 아침에 가세요. 멋진 동굴과 전망.',
          },
          category: 'nature',
          address: { en: 'Hoa Hai Ward', vi: 'Phường Hòa Hải', ko: '호아하이 구역' },
          distance: '7km',
          rating: 4.6,
          externalLinks: {
            googleMaps: 'https://maps.google.com/?q=marble+mountains+da+nang',
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
        distance: '6km',
        estimatedTime: '15-20 min',
        shuttleAvailable: false,
      },
      options: [
        {
          id: 'grab',
          type: 'grab',
          name: { en: 'Grab', vi: 'Grab', ko: 'Grab' },
          description: {
            en: 'Best option! Download the app. Pay by card or cash.',
            vi: 'Lựa chọn tốt nhất! Tải app. Thanh toán bằng thẻ hoặc tiền mặt.',
            ko: '최고의 선택! 앱 다운로드. 카드 또는 현금 결제.',
          },
          appLink: 'grab://',
          estimatedPrice: {
            from: 90000,
            to: 130000,
            currency: 'VND',
            note: { en: 'to airport', vi: 'đến sân bay', ko: '공항까지' },
          },
          available24h: true,
          icon: '🚗',
        },
        {
          id: 'motorbike-rental',
          type: 'scooter',
          name: {
            en: 'Motorbike Rental',
            vi: 'Thuê xe máy',
            ko: '오토바이 대여',
          },
          description: {
            en: 'Rent from Mr. Tuan next door. 150k/day. Helmet included.',
            vi: 'Thuê từ anh Tuấn nhà bên. 150k/ngày. Bao gồm mũ bảo hiểm.',
            ko: '옆집 뚜안 씨에게 대여. 15만동/일. 헬멧 포함.',
          },
          contactNumber: '+84987654321',
          estimatedPrice: {
            from: 150000,
            to: 150000,
            currency: 'VND',
            note: { en: 'per day', vi: 'mỗi ngày', ko: '일당' },
          },
          icon: '🛵',
        },
      ],
    },

    // ===================
    // Host's Recommended Deals
    // ===================
    deals: {
      showExpirationDates: false,
      groupByCategory: true,
      deals: [
        {
          id: 'roots-deal',
          partnerName: { en: 'ROOTS Cafe', vi: 'ROOTS', ko: 'ROOTS 카페' },
          category: 'restaurant',
          title: {
            en: '10% Off for Guests',
            vi: 'Giảm 10% cho khách',
            ko: '게스트 10% 할인',
          },
          description: {
            en: 'Just show this page to the staff!',
            vi: 'Chỉ cần xuất trình trang này cho nhân viên!',
            ko: '이 페이지를 직원에게 보여주세요!',
          },
          discountType: 'percentage',
          discountValue: 10,
          exclusive: true,
          distance: '800m',
        },
        {
          id: 'spa-deal',
          partnerName: { en: 'Zen Spa', vi: 'Zen Spa', ko: 'Zen Spa' },
          category: 'spa',
          title: {
            en: 'Free foot massage upgrade',
            vi: 'Nâng cấp massage chân miễn phí',
            ko: '발 마사지 무료 업그레이드',
          },
          description: {
            en: 'Mention you are staying at the Beachfront Studio',
            vi: 'Nói bạn đang ở căn hộ Bờ biển',
            ko: '비치프론트 스튜디오 투숙이라고 말씀하세요',
          },
          discountType: 'freebie',
          discountValue: 0,
          exclusive: true,
          distance: '1.2km',
        },
      ],
    },
  },
};

export default airbnbTemplate;
