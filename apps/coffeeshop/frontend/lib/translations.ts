/**
 * Translation System for QR Menu Platform
 * Supports: English (EN), Vietnamese (VI), Italian (IT)
 *
 * Future: These translations will be stored in database
 * and editable by manager from backoffice
 */

export type Language = 'en' | 'vi' | 'it';

export interface Translations {
  // Common
  common: {
    cancel: string;
    continue: string;
    back: string;
    submit: string;
    done: string;
    close: string;
    skip: string;
    copy: string;
  };

  // Feedback Rating Modal
  feedback: {
    // Rating Step
    rating: {
      title: string;
      subtitle: string;
      categories: {
        service: string;
        ambiance: string;
        foodBeverage: string;
      };
    };

    // Feedback Step
    feedbackStep: {
      title: string;
      titleWithCategory: string; // "Help us improve {category}"
      subtitle: string;
      subtitleWithCategory: string; // "What didn't meet your expectations about {category}?"
      types: {
        feedback: string;
        suggestion: string;
        request: string;
      };
      placeholder: string;
      placeholderWithCategory: string; // "Please tell us what went wrong with {category}..."
    };

    // Thanks Step
    thanks: {
      title: string;
      message: string;
    };
  };

  // Social Review Prompt
  social: {
    title: string;
    subtitle: string;
    earnPoints: string;
    rewardInfo: {
      title: string;
      description: string;
    };
    maybelater: string;
  };

  // WiFi Quick Connect
  wifi: {
    button: string;
    modalTitle: string;
    networkLabel: string;
    passwordLabel: string;
    shareTitle: string;
    shareSubtitle: string;
  };

  // Homepage
  home: {
    feedbackButton: {
      title: string;
      subtitle: string;
    };
    engagement: {
      title: string;
      subtitle: string;
      actions: {
        review: {
          title: string;
          description: string;
        };
        photo: {
          title: string;
          description: string;
        };
        checkin: {
          title: string;
          description: string;
        };
        follow: {
          title: string;
          description: string;
        };
      };
    };
    sections: {
      openingHours: {
        title: string;
        everyday: string;
        hours: string;
      };
      ourMission: {
        title: string;
      };
      followUs: {
        title: string;
      };
      findUs: {
        title: string;
        buttonText: string;
      };
      contactUs: {
        title: string;
        phone: string;
        zalo: string;
        zaloDescription: string;
        email: string;
      };
    };
  };

  // Auth / Welcome Modal
  auth: {
    benefitsSubtitle: string;
    login: string;
    signup: string;
    goToMenu: string;
  };

  // Menu
  menu: {
    types: {
      food: string;
      drinks: string;
      merchandise: string;
    };
    sections: {
      popular: string;
      seeAll: string;
    };
    tableContext: {
      table: string;
      dineIn: string;
      takeaway: string;
    };
    categories: {
      coffee: string;
      tea: string;
      smoothies: string;
      food: string;
      desserts: string;
      beverages: string;
      hotCoffee: string;
      icedCoffee: string;
      matcha: string;
      milkshake: string;
      bowls: string;
      wellness: string;
      breakfast: string;
      lunch: string;
    };
    promo: {
      happyHour: string;
      happyHourDesc: string;
    };
  };

  // Product Detail / Bottom Sheet
  productDetail: {
    quantity: string;
    addToCart: string;
    removeFromSelections: string;
    addToSelections: string;
    extras: string;
    nutrition: string;
    free: string;
    noCustomizations: string;
  };

  // Call Staff Modal
  callStaff: {
    title: string;
    close: string;
    callStaff: string;
    requestBill: string;
    reasonLabel: string;
    reasonPlaceholder: string;
    paymentMethodLabel: string;
    cash: string;
    card: string;
    sending: string;
    sendRequest: string;
    defaultReason: string;
    billRequest: string;
    payment: string;
    successMessage: string;
    successDetail: string;
    errorMessage: string;
  };

  // Offers Page
  offers: {
    pageTitle: string;
    pageSubtitle: string;
    happyHourTitle: string;
    comboMenuTitle: string;
    specialOffersTitle: string;
    save: string; // "Risparmi"
    everyday: string; // "Tutti i giorni"
    weekendOnly: string; // "Sabato e Domenica"
    earnExtraDiscounts: string;
    shareExperienceText: string;
    goToEngagementHub: string;
    browseFullMenu: string;
    // Happy Hour
    smoothieHappyHour: {
      title: string;
      description: string;
      time: string;
    };
    // Combo Menus
    lunchCombo: {
      title: string;
      description: string;
    };
    brunchCombo: {
      title: string;
      description: string;
    };
    apertifCombo: {
      title: string;
      description: string;
    };
    // Special Offers
    weekendSpecial: {
      title: string;
      description: string;
      validity: string;
    };
    smoothie3x2: {
      title: string;
      description: string;
      validity: string;
    };
  };

  // Account Page
  account: {
    pageTitle: string;
    privateAreaTitle: string;
    comingSoonMessage: string;
    featuresMessage: string;
    upcomingFeaturesTitle: string;
    features: {
      saveFavorites: string;
      orderHistory: string;
      dietaryPreferences: string;
      loyaltyProgram: string;
    };
  };

  // Empty States
  emptyState: {
    noProducts: string;
    tryDifferentMenuType: string;
    noProductsInCategory: string;
  };
}

export const translations: Record<Language, Translations> = {
  // ENGLISH
  en: {
    common: {
      cancel: 'Cancel',
      continue: 'Continue',
      back: 'Back',
      submit: 'Submit',
      done: 'Done',
      close: 'Close',
      skip: 'Skip',
      copy: 'Copy'
    },

    feedback: {
      rating: {
        title: 'How was your experience?',
        subtitle: 'Rate each category to help us improve',
        categories: {
          service: 'Service',
          ambiance: 'Ambiance',
          foodBeverage: 'Food & Beverage'
        }
      },

      feedbackStep: {
        title: 'Tell us more',
        titleWithCategory: 'Help us improve {category}',
        subtitle: 'Your feedback helps us serve you better',
        subtitleWithCategory: "What didn't meet your expectations about {category}?",
        types: {
          feedback: 'Feedback',
          suggestion: 'Suggestion',
          request: 'Request'
        },
        placeholder: 'Share your thoughts, suggestions, or requests...',
        placeholderWithCategory: 'Please tell us what went wrong with {category}...'
      },

      thanks: {
        title: 'Thank you!',
        message: 'Your feedback helps us improve and serve you better'
      }
    },

    social: {
      title: "Fantastic! We're thrilled!",
      subtitle: 'Would you mind sharing your experience on social media?',
      earnPoints: "You'll earn loyalty points for every review!",
      rewardInfo: {
        title: 'Reward for Reviews',
        description: 'Get 100-200 loyalty points + special discounts!'
      },
      maybelater: 'Maybe later'
    },

    wifi: {
      button: 'WiFi Access',
      modalTitle: 'WiFi Network',
      networkLabel: 'Network Name',
      passwordLabel: 'Password',
      shareTitle: 'Share with Friends',
      shareSubtitle: 'Scan this QR code to connect'
    },

    home: {
      feedbackButton: {
        title: 'Leave Feedback & Rate Us',
        subtitle: 'Share your experience and earn rewards'
      },
      engagement: {
        title: 'Love ROOTS? Share the Love!',
        subtitle: 'Complete actions to earn discount codes',
        actions: {
          review: {
            title: 'Rate Experience',
            description: 'Share your feedback'
          },
          photo: {
            title: 'Share Photo',
            description: 'Post & tag us'
          },
          checkin: {
            title: 'Check-In',
            description: 'Tag location'
          },
          follow: {
            title: 'Follow Us',
            description: 'Stay connected'
          }
        }
      },
      sections: {
        openingHours: {
          title: 'Opening Hours',
          everyday: 'Everyday',
          hours: '8:00 AM - 10:45 PM'
        },
        ourMission: {
          title: 'Our Mission'
        },
        followUs: {
          title: 'Follow Us'
        },
        findUs: {
          title: 'Find Us',
          buttonText: 'Open Google Maps'
        },
        contactUs: {
          title: 'Contact Us',
          phone: 'Phone',
          zalo: 'Zalo',
          zaloDescription: 'Chat with us',
          email: 'Email'
        }
      }
    },

    auth: {
      benefitsSubtitle: 'Loyalty, Preferences, Order History',
      login: 'Login',
      signup: 'Sign Up',
      goToMenu: 'Go to Menu →'
    },

    menu: {
      types: {
        food: 'Food',
        drinks: 'Drinks',
        merchandise: 'Merch'
      },
      sections: {
        popular: 'Popular',
        seeAll: 'See all'
      },
      tableContext: {
        table: 'Table',
        dineIn: 'Dine In',
        takeaway: 'Takeaway'
      },
      categories: {
        coffee: 'Coffee',
        tea: 'Tea',
        smoothies: 'Smoothies',
        food: 'Food',
        desserts: 'Desserts',
        beverages: 'Beverages',
        hotCoffee: 'Hot Coffee',
        icedCoffee: 'Iced Coffee',
        matcha: 'Matcha',
        milkshake: 'Milkshake',
        bowls: 'Bowls',
        wellness: 'Wellness',
        breakfast: 'Breakfast',
        lunch: 'Lunch'
      },
      promo: {
        happyHour: 'Happy Hour -10%',
        happyHourDesc: 'Every day from 3pm to 6pm'
      }
    },

    productDetail: {
      quantity: 'Quantity',
      addToCart: 'Add to Cart',
      removeFromSelections: 'Remove from Selections',
      addToSelections: 'Add to Selections',
      extras: 'Extras',
      nutrition: 'Nutrition',
      free: 'Free',
      noCustomizations: 'No customizations available'
    },

    callStaff: {
      title: 'Call Staff',
      close: 'Close',
      callStaff: 'Call Staff',
      requestBill: 'Request Bill',
      reasonLabel: 'Reason (optional)',
      reasonPlaceholder: 'E.g.: I would like another bowl, water, cutlery...',
      paymentMethodLabel: 'Payment method (optional)',
      cash: 'Cash',
      card: 'Card',
      sending: 'Sending...',
      sendRequest: 'Send Request',
      defaultReason: 'General assistance request',
      billRequest: 'Bill request',
      payment: 'Payment',
      successMessage: '✅ Request sent to staff!',
      successDetail: 'Staff will arrive at your table shortly.',
      errorMessage: '❌ Error sending request. Please try again.'
    },

    offers: {
      pageTitle: 'Promo & Combo',
      pageSubtitle: 'Save on your favorite plant-based meals!',
      happyHourTitle: 'Happy Hour',
      comboMenuTitle: 'Combo Menu',
      specialOffersTitle: 'Special Offers',
      save: 'Save',
      everyday: 'Everyday',
      weekendOnly: 'Saturday & Sunday',
      earnExtraDiscounts: 'Earn Extra Discounts!',
      shareExperienceText: 'Share your experience on social media and receive instant discount codes',
      goToEngagementHub: 'Go to Engagement Hub →',
      browseFullMenu: 'Browse Full Menu',
      smoothieHappyHour: {
        title: 'Smoothie Happy Hour',
        description: '10% off all smoothies',
        time: 'Everyday 3:00 PM - 6:00 PM'
      },
      lunchCombo: {
        title: 'Complete Lunch Menu',
        description: 'Appetizer + Main + Drink + Coffee'
      },
      brunchCombo: {
        title: 'Brunch Combo',
        description: 'Bowl + Smoothie + Dessert'
      },
      apertifCombo: {
        title: 'Aperitivo Combo',
        description: '2 Drinks + Sharing Plate'
      },
      weekendSpecial: {
        title: 'Weekend Special',
        description: 'Buy 2 bowls, get the 3rd free',
        validity: 'Saturday & Sunday'
      },
      smoothie3x2: {
        title: 'Smoothie 3x2',
        description: 'Buy 2 smoothies, get the 3rd free',
        validity: 'Everyday'
      }
    },

    account: {
      pageTitle: 'My Account',
      privateAreaTitle: 'Private Area',
      comingSoonMessage: 'Login and registration functionality will be available soon.',
      featuresMessage: 'You will be able to save your favorite dishes, view order history, and much more!',
      upcomingFeaturesTitle: 'Upcoming Features',
      features: {
        saveFavorites: 'Save your favorite dishes',
        orderHistory: 'Order history',
        dietaryPreferences: 'Personalized dietary preferences',
        loyaltyProgram: 'Loyalty program and points'
      }
    },

    emptyState: {
      noProducts: 'No products found',
      tryDifferentMenuType: 'Try changing the menu type',
      noProductsInCategory: 'There are no products in this category'
    }
  },

  // VIETNAMESE
  vi: {
    common: {
      cancel: 'Hủy',
      continue: 'Tiếp tục',
      back: 'Quay lại',
      submit: 'Gửi',
      done: 'Xong',
      close: 'Đóng',
      skip: 'Bỏ qua',
      copy: 'Sao chép'
    },

    feedback: {
      rating: {
        title: 'Trải nghiệm của bạn thế nào?',
        subtitle: 'Đánh giá từng hạng mục để giúp chúng tôi cải thiện',
        categories: {
          service: 'Dịch vụ',
          ambiance: 'Không gian',
          foodBeverage: 'Đồ ăn & Thức uống'
        }
      },

      feedbackStep: {
        title: 'Chia sẻ thêm với chúng tôi',
        titleWithCategory: 'Giúp chúng tôi cải thiện {category}',
        subtitle: 'Phản hồi của bạn giúp chúng tôi phục vụ bạn tốt hơn',
        subtitleWithCategory: 'Điều gì về {category} chưa đáp ứng mong đợi của bạn?',
        types: {
          feedback: 'Phản hồi',
          suggestion: 'Gợi ý',
          request: 'Yêu cầu'
        },
        placeholder: 'Chia sẻ suy nghĩ, gợi ý hoặc yêu cầu của bạn...',
        placeholderWithCategory: 'Vui lòng cho chúng tôi biết vấn đề với {category}...'
      },

      thanks: {
        title: 'Cảm ơn bạn!',
        message: 'Phản hồi của bạn giúp chúng tôi cải thiện và phục vụ bạn tốt hơn'
      }
    },

    social: {
      title: 'Tuyệt vời! Chúng tôi rất vui!',
      subtitle: 'Bạn có thể chia sẻ trải nghiệm trên mạng xã hội không?',
      earnPoints: 'Bạn sẽ nhận điểm thưởng cho mỗi đánh giá!',
      rewardInfo: {
        title: 'Phần thưởng cho Đánh giá',
        description: 'Nhận 100-200 điểm thưởng + giảm giá đặc biệt!'
      },
      maybelater: 'Để sau'
    },

    wifi: {
      button: 'Truy cập WiFi',
      modalTitle: 'Mạng WiFi',
      networkLabel: 'Tên mạng',
      passwordLabel: 'Mật khẩu',
      shareTitle: 'Chia sẻ với bạn bè',
      shareSubtitle: 'Quét mã QR này để kết nối'
    },

    home: {
      feedbackButton: {
        title: 'Để lại Phản hồi & Đánh giá',
        subtitle: 'Chia sẻ trải nghiệm và nhận phần thưởng'
      },
      engagement: {
        title: 'Yêu ROOTS? Chia sẻ tình yêu!',
        subtitle: 'Hoàn thành hành động để nhận mã giảm giá',
        actions: {
          review: {
            title: 'Đánh giá trải nghiệm',
            description: 'Chia sẻ phản hồi'
          },
          photo: {
            title: 'Chia sẻ ảnh',
            description: 'Đăng & gắn thẻ'
          },
          checkin: {
            title: 'Check-In',
            description: 'Gắn thẻ vị trí'
          },
          follow: {
            title: 'Theo dõi chúng tôi',
            description: 'Kết nối'
          }
        }
      },
      sections: {
        openingHours: {
          title: 'Giờ mở cửa',
          everyday: 'Hàng ngày',
          hours: '8:00 SA - 10:45 CH'
        },
        ourMission: {
          title: 'Sứ mệnh của chúng tôi'
        },
        followUs: {
          title: 'Theo dõi chúng tôi'
        },
        findUs: {
          title: 'Tìm chúng tôi',
          buttonText: 'Mở Google Maps'
        },
        contactUs: {
          title: 'Liên hệ',
          phone: 'Điện thoại',
          zalo: 'Zalo',
          zaloDescription: 'Trò chuyện với chúng tôi',
          email: 'Email'
        }
      }
    },

    auth: {
      benefitsSubtitle: 'Tích điểm, Sở thích, Lịch sử đơn hàng',
      login: 'Đăng nhập',
      signup: 'Đăng ký',
      goToMenu: 'Xem Thực Đơn →'
    },

    menu: {
      types: {
        food: 'Đồ ăn',
        drinks: 'Đồ uống',
        merchandise: 'Hàng hóa'
      },
      sections: {
        popular: 'Phổ biến',
        seeAll: 'Xem tất cả'
      },
      tableContext: {
        table: 'Bàn',
        dineIn: 'Tại quán',
        takeaway: 'Mang về'
      },
      categories: {
        coffee: 'Cà phê',
        tea: 'Trà',
        smoothies: 'Sinh tố',
        food: 'Đồ ăn',
        desserts: 'Tráng miệng',
        beverages: 'Đồ uống',
        hotCoffee: 'Cà phê nóng',
        icedCoffee: 'Cà phê đá',
        matcha: 'Matcha',
        milkshake: 'Milkshake',
        bowls: 'Tô',
        wellness: 'Sức khỏe',
        breakfast: 'Bữa sáng',
        lunch: 'Bữa trưa'
      },
      promo: {
        happyHour: 'Happy Hour -10%',
        happyHourDesc: 'Mỗi ngày từ 15h đến 18h'
      }
    },

    productDetail: {
      quantity: 'Số lượng',
      addToCart: 'Thêm vào giỏ',
      removeFromSelections: 'Xóa khỏi danh sách',
      addToSelections: 'Thêm vào danh sách',
      extras: 'Thêm',
      nutrition: 'Dinh dưỡng',
      free: 'Miễn phí',
      noCustomizations: 'Không có tùy chỉnh'
    },

    callStaff: {
      title: 'Gọi Nhân Viên',
      close: 'Đóng',
      callStaff: 'Gọi Nhân Viên',
      requestBill: 'Yêu cầu Thanh toán',
      reasonLabel: 'Lý do (tùy chọn)',
      reasonPlaceholder: 'Ví dụ: Tôi muốn thêm bát, nước, đồ ăn...',
      paymentMethodLabel: 'Phương thức thanh toán (tùy chọn)',
      cash: 'Tiền mặt',
      card: 'Thẻ',
      sending: 'Đang gửi...',
      sendRequest: 'Gửi Yêu cầu',
      defaultReason: 'Yêu cầu hỗ trợ chung',
      billRequest: 'Yêu cầu thanh toán',
      payment: 'Thanh toán',
      successMessage: '✅ Yêu cầu đã gửi đến nhân viên!',
      successDetail: 'Nhân viên sẽ đến bàn của bạn ngay.',
      errorMessage: '❌ Lỗi gửi yêu cầu. Vui lòng thử lại.'
    },

    offers: {
      pageTitle: 'Khuyến Mãi & Combo',
      pageSubtitle: 'Tiết kiệm cho bữa ăn thực vật yêu thích của bạn!',
      happyHourTitle: 'Giờ Vui Vẻ',
      comboMenuTitle: 'Menu Combo',
      specialOffersTitle: 'Ưu Đãi Đặc Biệt',
      save: 'Tiết kiệm',
      everyday: 'Hàng ngày',
      weekendOnly: 'Thứ Bảy & Chủ Nhật',
      earnExtraDiscounts: 'Nhận Thêm Giảm Giá!',
      shareExperienceText: 'Chia sẻ trải nghiệm của bạn trên mạng xã hội và nhận mã giảm giá ngay lập tức',
      goToEngagementHub: 'Đến Hub Tương Tác →',
      browseFullMenu: 'Xem Thực Đơn Đầy Đủ',
      smoothieHappyHour: {
        title: 'Giờ Vui Vẻ Sinh Tố',
        description: 'Giảm 10% cho tất cả sinh tố',
        time: 'Hàng ngày 3:00 CH - 6:00 CH'
      },
      lunchCombo: {
        title: 'Menu Bữa Trưa Đầy Đủ',
        description: 'Khai vị + Món chính + Đồ uống + Cà phê'
      },
      brunchCombo: {
        title: 'Combo Brunch',
        description: 'Bowl + Sinh tố + Tráng miệng'
      },
      apertifCombo: {
        title: 'Combo Aperitivo',
        description: '2 Đồ uống + Đĩa chia sẻ'
      },
      weekendSpecial: {
        title: 'Đặc Biệt Cuối Tuần',
        description: 'Mua 2 bowl, nhận bowl thứ 3 miễn phí',
        validity: 'Thứ Bảy & Chủ Nhật'
      },
      smoothie3x2: {
        title: 'Sinh Tố 3x2',
        description: 'Mua 2 sinh tố, nhận sinh tố thứ 3 miễn phí',
        validity: 'Hàng ngày'
      }
    },

    account: {
      pageTitle: 'Tài Khoản Của Tôi',
      privateAreaTitle: 'Khu Vực Cá Nhân',
      comingSoonMessage: 'Chức năng đăng nhập và đăng ký sẽ sớm có sẵn.',
      featuresMessage: 'Bạn sẽ có thể lưu các món ăn yêu thích, xem lịch sử đơn hàng và nhiều hơn nữa!',
      upcomingFeaturesTitle: 'Tính Năng Sắp Có',
      features: {
        saveFavorites: 'Lưu món ăn yêu thích của bạn',
        orderHistory: 'Lịch sử đơn hàng',
        dietaryPreferences: 'Sở thích ăn uống cá nhân hóa',
        loyaltyProgram: 'Chương trình tích điểm'
      }
    },

    emptyState: {
      noProducts: 'Không tìm thấy sản phẩm',
      tryDifferentMenuType: 'Thử thay đổi loại thực đơn',
      noProductsInCategory: 'Không có sản phẩm trong danh mục này'
    }
  },

  // ITALIAN
  it: {
    common: {
      cancel: 'Annulla',
      continue: 'Continua',
      back: 'Indietro',
      submit: 'Invia',
      done: 'Fatto',
      close: 'Chiudi',
      skip: 'Salta',
      copy: 'Copia'
    },

    feedback: {
      rating: {
        title: 'Come è stata la tua esperienza?',
        subtitle: 'Valuta ogni categoria per aiutarci a migliorare',
        categories: {
          service: 'Servizio',
          ambiance: 'Atmosfera',
          foodBeverage: 'Cibo & Bevande'
        }
      },

      feedbackStep: {
        title: 'Raccontaci di più',
        titleWithCategory: 'Aiutaci a migliorare {category}',
        subtitle: 'Il tuo feedback ci aiuta a servirti meglio',
        subtitleWithCategory: 'Cosa non ha soddisfatto le tue aspettative riguardo a {category}?',
        types: {
          feedback: 'Feedback',
          suggestion: 'Suggerimento',
          request: 'Richiesta'
        },
        placeholder: 'Condividi i tuoi pensieri, suggerimenti o richieste...',
        placeholderWithCategory: 'Per favore dicci cosa non ha funzionato con {category}...'
      },

      thanks: {
        title: 'Grazie!',
        message: 'Il tuo feedback ci aiuta a migliorare e servirti meglio'
      }
    },

    social: {
      title: 'Fantastico! Siamo entusiasti!',
      subtitle: 'Ti dispiacerebbe condividere la tua esperienza sui social media?',
      earnPoints: 'Guadagnerai punti fedeltà per ogni recensione!',
      rewardInfo: {
        title: 'Ricompensa per Recensioni',
        description: 'Ottieni 100-200 punti fedeltà + sconti speciali!'
      },
      maybelater: 'Forse più tardi'
    },

    wifi: {
      button: 'Accesso WiFi',
      modalTitle: 'Rete WiFi',
      networkLabel: 'Nome rete',
      passwordLabel: 'Password',
      shareTitle: 'Condividi con amici',
      shareSubtitle: 'Scansiona questo QR per connetterti'
    },

    home: {
      feedbackButton: {
        title: 'Lascia Feedback & Valutaci',
        subtitle: 'Condividi la tua esperienza e guadagna premi'
      },
      engagement: {
        title: 'Ami ROOTS? Condividi l\'amore!',
        subtitle: 'Completa le azioni per ottenere codici sconto',
        actions: {
          review: {
            title: 'Valuta esperienza',
            description: 'Condividi il tuo feedback'
          },
          photo: {
            title: 'Condividi foto',
            description: 'Posta e taggaci'
          },
          checkin: {
            title: 'Check-In',
            description: 'Tagga la posizione'
          },
          follow: {
            title: 'Seguici',
            description: 'Resta connesso'
          }
        }
      },
      sections: {
        openingHours: {
          title: 'Orari di apertura',
          everyday: 'Tutti i giorni',
          hours: '8:00 - 22:45'
        },
        ourMission: {
          title: 'La nostra missione'
        },
        followUs: {
          title: 'Seguici'
        },
        findUs: {
          title: 'Trovaci',
          buttonText: 'Apri Google Maps'
        },
        contactUs: {
          title: 'Contattaci',
          phone: 'Telefono',
          zalo: 'Zalo',
          zaloDescription: 'Chatta con noi',
          email: 'Email'
        }
      }
    },

    auth: {
      benefitsSubtitle: 'Fidelity, Preferenze, Storico Ordini',
      login: 'Accedi',
      signup: 'Registrati',
      goToMenu: 'Vai al Menu →'
    },

    menu: {
      types: {
        food: 'Cibo',
        drinks: 'Bevande',
        merchandise: 'Merch'
      },
      sections: {
        popular: 'Popolari',
        seeAll: 'Vedi tutti'
      },
      tableContext: {
        table: 'Tavolo',
        dineIn: 'Al Tavolo',
        takeaway: 'Da Asporto'
      },
      categories: {
        coffee: 'Caffè',
        tea: 'Tè',
        smoothies: 'Smoothies',
        food: 'Cibo',
        desserts: 'Dolci',
        beverages: 'Bevande',
        hotCoffee: 'Caffè Caldo',
        icedCoffee: 'Caffè Freddo',
        matcha: 'Matcha',
        milkshake: 'Milkshake',
        bowls: 'Bowls',
        wellness: 'Benessere',
        breakfast: 'Colazione',
        lunch: 'Pranzo'
      },
      promo: {
        happyHour: 'Happy Hour -10%',
        happyHourDesc: 'Ogni giorno dalle 15:00 alle 18:00'
      }
    },

    productDetail: {
      quantity: 'Quantità',
      addToCart: 'Aggiungi al Carrello',
      removeFromSelections: 'Rimuovi dalle Selezioni',
      addToSelections: 'Aggiungi alle Selezioni',
      extras: 'Extra',
      nutrition: 'Nutrizione',
      free: 'Gratis',
      noCustomizations: 'Nessuna personalizzazione disponibile'
    },

    callStaff: {
      title: 'Chiama Staff',
      close: 'Chiudi',
      callStaff: 'Chiama Personale',
      requestBill: 'Richiedi Conto',
      reasonLabel: 'Motivazione (opzionale)',
      reasonPlaceholder: 'Es: Vorrei un\'altra ciotola, acqua, posate...',
      paymentMethodLabel: 'Metodo di pagamento (opzionale)',
      cash: 'Contanti',
      card: 'Carta',
      sending: 'Invio in corso...',
      sendRequest: 'Invia Richiesta',
      defaultReason: 'Richiesta assistenza generale',
      billRequest: 'Richiesta conto',
      payment: 'Pagamento',
      successMessage: '✅ Richiesta inviata allo staff!',
      successDetail: 'Lo staff arriverà a breve al tuo tavolo.',
      errorMessage: '❌ Errore nell\'invio della richiesta. Riprova.'
    },

    offers: {
      pageTitle: 'Promo & Combo',
      pageSubtitle: 'Risparmia sui tuoi piatti vegetali preferiti!',
      happyHourTitle: 'Happy Hour',
      comboMenuTitle: 'Menu Combo',
      specialOffersTitle: 'Offerte Speciali',
      save: 'Risparmi',
      everyday: 'Tutti i giorni',
      weekendOnly: 'Sabato e Domenica',
      earnExtraDiscounts: 'Guadagna Sconti Extra!',
      shareExperienceText: 'Condividi la tua esperienza sui social media e ricevi codici sconto istantanei',
      goToEngagementHub: 'Vai all\'Engagement Hub →',
      browseFullMenu: 'Sfoglia il Menu Completo',
      smoothieHappyHour: {
        title: 'Smoothie Happy Hour',
        description: '10% di sconto su tutti i smoothies',
        time: 'Tutti i giorni 15:00 - 18:00'
      },
      lunchCombo: {
        title: 'Menu Pranzo Completo',
        description: 'Antipasto + Primo + Bibita + Caffè'
      },
      brunchCombo: {
        title: 'Brunch Combo',
        description: 'Bowl + Smoothie + Dessert'
      },
      apertifCombo: {
        title: 'Aperitivo Combo',
        description: '2 Drinks + Sharing Plate'
      },
      weekendSpecial: {
        title: 'Weekend Special',
        description: 'Compra 2 bowls, ricevi il 3° gratis',
        validity: 'Sabato e Domenica'
      },
      smoothie3x2: {
        title: 'Smoothie 3x2',
        description: 'Compra 2 smoothies, il 3° è gratis',
        validity: 'Tutti i giorni'
      }
    },

    account: {
      pageTitle: 'Il Mio Account',
      privateAreaTitle: 'Area Privata',
      comingSoonMessage: 'La funzionalità di accesso e registrazione sarà disponibile a breve.',
      featuresMessage: 'Potrai salvare i tuoi piatti preferiti, visualizzare lo storico degli ordini e molto altro!',
      upcomingFeaturesTitle: 'Funzionalità in arrivo',
      features: {
        saveFavorites: 'Salva i tuoi piatti preferiti',
        orderHistory: 'Storico degli ordini',
        dietaryPreferences: 'Preferenze alimentari personalizzate',
        loyaltyProgram: 'Programma fedeltà e punti'
      }
    },

    emptyState: {
      noProducts: 'Nessun prodotto trovato',
      tryDifferentMenuType: 'Prova a cambiare il tipo di menu',
      noProductsInCategory: 'Non ci sono prodotti in questa categoria'
    }
  }
};

/**
 * Helper function to replace placeholders in translation strings
 * Example: replacePlaceholders("Help us improve {category}", { category: "Service" })
 * Returns: "Help us improve Service"
 */
export function replacePlaceholders(
  text: string,
  values: Record<string, string>
): string {
  let result = text;
  Object.entries(values).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, value);
  });
  return result;
}
