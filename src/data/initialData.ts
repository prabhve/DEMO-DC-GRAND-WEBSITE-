import { Room, GalleryItem, RestaurantData, EventFacilityData, PolicyData, ContactData, HomeCmsData, ThreeDSettings } from '../types/hotel';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-super-deluxe',
    slug: 'super-deluxe-room',
    name: 'Super Deluxe Room',
    size: '190 sq ft / 18 sq mt',
    maxGuests: 3,
    bed: '1 Double Bed',
    bathrooms: 1,
    view: 'City & Courtyard View',
    description: 'A thoughtfully appointed sanctuary blending refined wood craftsmanship with plush comfort. Features an exquisite geometric gold accent wall, ambient cove lighting, and ergonomic workstation designed for an idyllic stay in sacred Varanasi.',
    amenities: [
      'Mineral Water',
      'High-speed Wi-Fi',
      'Electric Kettle & Tea Kit',
      'Climate-Controlled Air Conditioning',
      'Private En-suite Bathroom',
      'Flat-screen LED TV',
      'Daily Housekeeping',
      'Plush Linens & Pillows'
    ],
    features: ['Soundproof Windows', 'Walnut Wood Accents', 'Digital Safe Box', 'Bedside Reading Lights'],
    coverImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80'
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
    note: 'Generous floor plan with premium ambient warmth.'
  },
  {
    id: 'room-villa-deluxe',
    slug: 'villa-deluxe-room',
    name: 'Villa Deluxe Room',
    size: '180 sq ft / 17 sq mt',
    maxGuests: 3,
    bed: '1 Double Bed',
    bathrooms: 1,
    view: 'Quiet Garden View',
    description: 'Embrace tranquil repose in our Villa Deluxe Room, boasting quiet privacy, contemporary architectural accents, and plush bedding that ensures deep rejuvenation after your spiritual explorations.',
    amenities: [
      'Private En-suite Bathroom',
      'Mineral Water',
      'High-speed Wi-Fi',
      'Electric Kettle',
      'Climate-Controlled Air Conditioning',
      'Smart TV',
      'Vanity Mirror & Wardrobe'
    ],
    features: ['Garden Facing Quietude', 'Custom Wood Millwork', 'Luggage Bench', 'Express Laundry Access'],
    coverImage: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80'
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 2
  },
  {
    id: 'room-villa-family',
    slug: 'villa-family-room',
    name: 'Villa Family Room',
    size: '200 sq ft / 19 sq mt',
    maxGuests: 3,
    bed: '1 King Bed',
    bathrooms: 1,
    view: 'Courtyard & City Skyline',
    description: 'Generously proportioned for couples with a child or small traveling families, the Villa Family Room offers an expansive King Bed, polished vitrified flooring, and seamless room amenities.',
    amenities: [
      'En-suite Luxury Bathroom',
      'Mineral Water',
      'High-speed Wi-Fi',
      'Electric Kettle & Tea Setup',
      'Air Conditioning',
      'Flat-screen TV',
      'Large Wardrobe & Dresser'
    ],
    features: ['Generous Walkway Space', 'Extra Plush King Mattress', 'Direct Elevator Access', 'Child-Friendly Layout'],
    coverImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80'
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 3
  },
  {
    id: 'room-family-room',
    slug: 'family-room',
    name: 'Family Room',
    size: '220 sq ft / 20 sq mt',
    maxGuests: 3,
    bed: '1 Single Bed + 1 King Bed',
    bathrooms: 1,
    view: 'Bhelupur Cityscape',
    description: 'Designed specifically for family pilgrimages and leisure groups, offering dual bedding configuration with a King bed and separate single bed, ample luggage storage, and modern climate control.',
    amenities: [
      'Air Conditioning',
      'Mineral Water (Additional Charge)',
      'Private Bathroom',
      'High-speed Wi-Fi',
      'Kettle & Supplies',
      'TV with Satellite Channels',
      'Full Length Wardrobe'
    ],
    features: ['Dual Bed Setup (King + Single)', 'Spacious Bathroom', 'Multiple Power Charging Outlets', 'Luggage Counter'],
    coverImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80'
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 4,
    note: 'Mineral Water provided with additional charge as per hotel policy.'
  },
  {
    id: 'room-deluxe-room',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    size: '160 sq ft / 15 sq mt',
    maxGuests: 2,
    bed: '1 Queen Bed',
    bathrooms: 1,
    view: 'Atrium View',
    description: 'An intimate, highly functional retreat for solo spiritual travelers and couples. Efficiently styled with warm lighting, dedicated vanity, clean en-suite facilities, and personalized hospitality.',
    amenities: [
      'Laundry Service',
      'Mineral Water',
      'Private Bathroom',
      'Iron / Ironing Board',
      'Daily Housekeeping',
      'Air Conditioning',
      'Wi-Fi Connectivity'
    ],
    features: ['Cozy Acoustic Design', 'Ironing Facilities On Request', 'Dressing Table', 'Reading Nightstands'],
    coverImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80'
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 5
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Hotel Entrance & Amber Facade at Dusk',
    category: 'HOTEL',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    caption: 'The welcoming exterior of D C Grand illuminated warmly against the Varanasi evening sky.',
    featured: true,
    cover: true,
    displayOrder: 1
  },
  {
    id: 'gal-2',
    title: 'Double-Height Lobby & Crystal Chandelier',
    category: 'HOTEL',
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80',
    caption: 'Grand reception foyer with peach velvet seating and illuminated bubble glass pillars.',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'gal-3',
    title: 'Super Deluxe Bed Chamber',
    category: 'ROOMS',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80',
    caption: 'Gold geometric feature wall, tailored warm lighting, and plush double bedding.',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'gal-4',
    title: 'Food Express Dining Hall',
    category: 'RESTAURANT',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    caption: 'Spacious banquet restaurant featuring elegant grey velvet chairs and back-lit amber buffet counter.',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'gal-5',
    title: 'Gourmet Culinary Offerings',
    category: 'RESTAURANT',
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=80',
    caption: 'Exquisite Indian specialties, rich gravies, fresh tandoor breads, and chef-curated delights.',
    featured: false,
    displayOrder: 5
  },
  {
    id: 'gal-6',
    title: 'Celebration & Banquet Celebrations',
    category: 'MEETINGS & EVENTS',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
    caption: 'Custom decorated dining hall for birthday gatherings, anniversaries, and family milestones.',
    featured: true,
    displayOrder: 6
  },
  {
    id: 'gal-7',
    title: 'Executive Meeting & Management Suite',
    category: 'MEETINGS & EVENTS',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    caption: 'Sophisticated executive boardroom with wood acoustic ceiling and warm accent spotlights.',
    featured: false,
    displayOrder: 7
  },
  {
    id: 'gal-8',
    title: 'Intimate Mezzanine Dining Booth',
    category: 'RESTAURANT',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
    caption: 'Private anniversary and family dining table with neon accents overlooking the main hall.',
    featured: false,
    displayOrder: 8
  },
  {
    id: 'gal-9',
    title: 'Modern En-Suite Bathroom',
    category: 'ROOMS',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    caption: 'Spotless tiled bathroom with modern western sanitaryware and health faucet.',
    featured: false,
    displayOrder: 9
  },
  {
    id: 'gal-10',
    title: 'Spiritual Varanasi Heritage Proximity',
    category: 'ABOUT',
    url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
    caption: 'A serene launchpad located just 2 km from Sankat Mochan Temple and the timeless Ganga Ghats.',
    featured: true,
    displayOrder: 10
  }
];

export const INITIAL_RESTAURANT: RestaurantData = {
  name: 'Food Express',
  tagline: 'Exotic Veg, Non-Veg & Chinese Delicacies',
  description: 'A distinguished culinary haven nestled within D C Grand. Featuring ambient recessed lighting, plush velvet seating, and a glowing amber beverage bar, Food Express curates an unforgettable gastronomic journey for hotel guests and discerning local patrons alike.',
  cuisines: ['Authentic North Indian', 'Tandoori Delicacies', 'Exotic Chinese', 'Vegetarian Specialties', 'Handcrafted Mocktails'],
  timings: 'Breakfast: 07:30 AM – 10:30 AM | Lunch: 12:30 PM – 03:30 PM | Dinner: 07:30 PM – 11:00 PM',
  facilities: [
    'Air-Conditioned Dining Hall',
    'Private Mezzanine Booths for Anniversaries',
    'Custom Celebration Decor (Balloons & Themes)',
    'In-Room Dining Service',
    'Back-lit Amber Beverage Counter',
    'High-Speed Wi-Fi for Diners'
  ],
  images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80'
  ],
  isVisible: true
};

export const INITIAL_EVENTS: EventFacilityData[] = [
  {
    id: 'event-banquet-hall',
    name: 'The Grand Celebration Hall',
    description: 'A refined banquet space accommodating intimate social gatherings, birthdays, wedding anniversaries, and corporate luncheons with tailored balloon arrangements, LED backlight walls, and bespoke catering.',
    capacity: 'Up to 80 Guests',
    facilities: ['Integrated Sound System', 'Central Air Conditioning', 'Flexible Table Formats', 'Celebration Backdrop Framing', 'Buffet Counters'],
    seatingArrangements: ['Banquet Style', 'Cluster Seating', 'U-Shape Discussion', 'Cocktail Reception'],
    timings: 'Available for Morning, Afternoon, and Evening Slots',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'
    ],
    isAvailable: true
  },
  {
    id: 'event-boardroom',
    name: 'Executive Discussion Suite',
    description: 'Sophisticated private venue equipped with rich wood ceiling slats, warm downlights, and comfortable ergonomic seating for executive reviews, client meetings, and private spiritual group talks.',
    capacity: '12 – 20 Delegates',
    facilities: ['High-speed LAN & Wi-Fi', 'HDMI Projection Compatible', 'Executive Leather Chairs', 'Tea & Coffee Service'],
    seatingArrangements: ['Boardroom Classic', 'Hollow Square'],
    timings: 'Hourly or Full-Day Reservations',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    isAvailable: true
  }
];

export const INITIAL_POLICIES: PolicyData = {
  cancellation: 'Reservations can be modified or cancelled by notifying our reservations desk at least 48 hours prior to your scheduled check-in time. For peak pilgrimage festivals (Dev Deepawali, Shivratri, Mahashivratri), special notice windows may apply.',
  childPolicy: 'Children up to 5 years stay complimentary when sharing existing bedding with parents. Extra mattress or additional bedding for children above 5 years is arranged upon advance booking request.',
  hotelPolicy: 'Standard Check-in time is 12:00 PM and Check-out is 11:00 AM. Early check-in or late check-out is subject to room availability upon request. Valid government-issued photo identification is mandatory for all staying guests upon arrival.',
  privacyPolicy: 'D C Grand respects your privacy. All contact information, dates of stay, and enquiry communications are handled strictly for guest reservation management and are never shared with third-party marketers.',
  termsAndConditions: 'All room bookings submitted through this platform constitute reservation requests. Formal confirmation is dispatched via WhatsApp, phone, or email by our front desk. The management reserves the right of admission in accordance with local regulations.'
};

export const INITIAL_CONTACT: ContactData = {
  hotelName: 'D C GRAND',
  tagline: 'Newly Opened Boutique Hospitality',
  address: '22/24P, Kasmiganj Mohalla, Bhelupur, Varanasi, Uttar Pradesh, 221010, India',
  phone: '+91 94520 12345',
  whatsapp: '+91 94520 12345',
  email: 'stay@dcgrandvaranasi.com',
  checkInTime: '12:00 PM',
  checkOutTime: '11:00 AM',
  mapUrl: 'https://maps.google.com/?q=Bhelupur+Varanasi+India',
  googleReviewUrl: 'https://google.com/search?q=DC+Grand+Bhelupur+Varanasi',
  tripAdvisorUrl: 'https://tripadvisor.com',
  landmarks: [
    { name: 'Sankat Mochan Hanuman Temple', distance: '2.0 km', desc: 'World-renowned sacred shrine founded by Goswami Tulsidas' },
    { name: 'Assi Ghat & Ganga Aarti', distance: '2.5 km', desc: 'Southernmost historic ghat known for morning Subah-e-Banaras' },
    { name: 'Kashi Vishwanath Temple & Corridor', distance: '4.2 km', desc: 'The golden spire temple of Lord Shiva along the Ganga' },
    { name: 'Banaras Hindu University (BHU)', distance: '3.0 km', desc: 'Asia’s largest residential university campus and New Vishwanath Temple' },
    { name: 'Varanasi Junction (Cantonment Station)', distance: '5.5 km', desc: 'Primary railway terminal with direct transport connectivity' }
  ]
};

export const INITIAL_HOME_CMS: HomeCmsData = {
  // Hero
  heroBadge: 'Bhelupur, Varanasi • Newly Opened Property',
  heroSubtitle: 'Welcome To D C Grand',
  heroHeadline: 'Comfortable Stay in the Heart of Varanasi',
  heroSupportingText: "A convenient stay in Bhelupur, Varanasi, close to the city's spiritual and cultural attractions.",
  heroCoverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85',
  heroExploreBtnText: 'Explore Rooms',
  heroBookingBtnText: 'Request Booking',

  // Intro / Sanctuary
  introBadge: 'The Sanctuary',
  introHeading: 'D C Grand',
  introText: "D C Grand is a newly opened property in Bhelupur, Varanasi, offering a convenient stay for guests exploring the city's spiritual and cultural attractions.",
  introImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
  introImageBadgeTitle: 'Grand Welcome',
  introImageBadgeDesc: 'Double-height reception foyer with crystal chandeliers and warm hospitality.',
  introPillar1Title: 'Peace of Mind',
  introPillar1Desc: '24/7 dedicated security, CCTV surveillance, continuous power backup, and pristine hygiene protocols.',
  introPillar2Title: 'Personalized Service',
  introPillar2Desc: 'Warm, traditional Banarasi care paired with prompt attention for your spiritual itinerary and temple visits.',

  // About / Philosophy
  aboutBadge: 'Our Philosophy',
  aboutHeading: 'A Gracious Base in the Eternal City',
  aboutText: "D C Grand offers a convenient stay in Bhelupur, Varanasi, providing guests with a comfortable base for exploring the city's spiritual and cultural attractions.",
  aboutSecondaryText: 'Varanasi is a sacred convergence of time, devotion, and timeless ghats. Situated in the well-connected neighbourhood of Bhelupur, D C Grand is designed to be your serene oasis—where contemporary comforts, dedicated power backup, and authentic culinary hospitality meet the warmth of Banarasi traditions.',
  aboutImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
  aboutImageCaption: 'Timeless spiritual heritage along the sacred Ganga Ghats, moments from D C Grand',
  aboutFeatures: [
    '2 km from Sankat Mochan Temple',
    'Close to Assi Ghat & BHU',
    'Modern Elevator & Generator Backup',
    'In-House Food Express Dining'
  ],

  // Highlights
  highlightsHeading: 'Modern Conveniences & Banarasi Hospitality',
  highlightsSubtitle: 'Every modern essential curated to make your spiritual voyage and family vacation seamless and deeply relaxing.',
  highlights: [
    {
      id: 'hl-1',
      title: 'Food Express Restaurant',
      subtitle: 'Exquisite In-House Dining',
      description: 'Delight in vegetarian, North Indian, tandoori delicacies, and Chinese specialties prepared fresh daily.',
      tag: 'Cuisine'
    },
    {
      id: 'hl-2',
      title: 'LAN & High-Speed Wi-Fi',
      subtitle: 'Seamless Connectivity',
      description: 'Ultra-fast internet access throughout guest chambers, lobby, and meeting venues.',
      tag: 'Technology'
    },
    {
      id: 'hl-3',
      title: '100% Power Backup',
      subtitle: 'Uninterrupted Comfort',
      description: 'Heavy-duty on-site generator ensuring zero disruption to lighting, elevators, and air conditioning.',
      tag: 'Reliability'
    },
    {
      id: 'hl-4',
      title: 'Modern Elevator / Lift',
      subtitle: 'Effortless Accessibility',
      description: 'Smooth passenger elevator connecting all floor levels, especially comfortable for elders and families.',
      tag: 'Convenience'
    },
    {
      id: 'hl-5',
      title: 'In-Room Refrigerator',
      subtitle: 'Chilled Refreshments',
      description: 'Keep beverages, fruits, and snacks cool and fresh in your private accommodation.',
      tag: 'In-Room'
    },
    {
      id: 'hl-6',
      title: 'Impeccable Housekeeping',
      subtitle: 'Pristine Cleanliness',
      description: 'Daily meticulous linen changes, thorough sanitization, and attentive guest chamber upkeep.',
      tag: 'Sanitation'
    },
    {
      id: 'hl-7',
      title: 'Climate-Controlled AC',
      subtitle: 'Year-Round Serenity',
      description: 'Individual temperature regulation to ensure relaxing cool refuge after sunny temple tours.',
      tag: 'Comfort'
    },
    {
      id: 'hl-8',
      title: 'Dedicated Room Service',
      subtitle: 'At Your Beck and Call',
      description: 'Prompt in-room dining, fresh morning tea, and personalized assistance from our front desk.',
      tag: 'Hospitality'
    }
  ],

  // Final CTA
  finalCtaHeading: 'Your Varanasi Stay Starts Here.',
  finalCtaSubtitle: 'D C Grand — Comfortable hospitality in Bhelupur, Varanasi.',
  finalCtaBookingBtnText: 'Request Booking',
  finalCtaContactBtnText: 'Contact Front Desk'
};

export const INITIAL_3D_SETTINGS: ThreeDSettings = {
  heroAnimationEnabled: true,
  galleryAnimationEnabled: true,
  roomAnimationEnabled: true,
  parallaxIntensity: 3,
  threeIntensity: 3,
  animationSpeed: 1,
  lodMode: 'auto',
  autoLODEnabled: true
};
