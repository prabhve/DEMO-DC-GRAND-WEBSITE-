import { RestaurantData, EventFacilityData, AmenityHighlightItem } from '../types/hotel';
import { HOTEL_ASSETS } from './hotelAssets';

/**
 * HOTEL D.C. GRAND — VARANASI
 * Verified Hotel Facilities, In-House Dining & Banquet Data
 * Sourced from https://hoteldcgrand.com/ and the physical reception services board at Hotel D.C. Grand.
 */

export const VERIFIED_HIGHLIGHTS: AmenityHighlightItem[] = [
  {
    id: 'hl-1',
    title: '24/7 Front Desk & Reception',
    subtitle: 'Round-the-Clock Guest Care',
    description:
      'Our reception team at Bhelupur is available 24 hours a day to assist with check-ins, room enquiries, temple darshan guidance, and local travel support.',
    tag: 'Hospitality'
  },
  {
    id: 'hl-2',
    title: 'In-House Restaurant & Dining',
    subtitle: 'Open Daily · 7:00 AM to 11:00 PM',
    description:
      'Enjoy freshly prepared meals, morning tea, and breakfast in our air-conditioned dining space with emerald velvet seating or via prompt room service.',
    tag: 'Dining'
  },
  {
    id: 'hl-3',
    title: 'Free High-Speed Fiber Wi-Fi',
    subtitle: 'Seamless Connectivity',
    description:
      'Complimentary wireless internet connectivity across guest rooms, reception lounge, and banquet areas for families and business travelers.',
    tag: 'Connectivity'
  },
  {
    id: 'hl-4',
    title: 'Car, Taxi & Airport Pick-Up',
    subtitle: 'Effortless Varanasi Transit',
    description:
      'Direct wide-road access in Bhelupur with on-site parking space, airport/railway pick-up & drop arrangements, and local sightseeing cab bookings.',
    tag: 'Transport'
  },
  {
    id: 'hl-5',
    title: 'Ganga Boat Ride & Tour Guide',
    subtitle: 'Curated Spiritual Experiences',
    description:
      'Arranged directly from our front desk: sunrise and evening Ganga Aarti boat rides, verified local guides on demand, and temple darshan logistics.',
    tag: 'Pilgrimage'
  },
  {
    id: 'hl-6',
    title: 'Laundry & Luggage Storage',
    subtitle: 'Convenient Travel Support',
    description:
      'Professional laundry service and secure luggage storage at reception so you can visit Kashi Vishwanath and the ghats stress-free.',
    tag: 'Convenience'
  },
  {
    id: 'hl-7',
    title: 'Train, Flight & Money Exchange',
    subtitle: 'Full Concierge Assistance',
    description:
      'On-desk travel ticketing assistance for train and flight bookings as well as foreign currency money exchange support for international visitors.',
    tag: 'Concierge'
  },
  {
    id: 'hl-8',
    title: 'Doctor on Call & Room Service',
    subtitle: 'Peace of Mind for Families',
    description:
      'Dedicated room service, daily housekeeping, and doctor-on-call medical assistance ensuring a safe, worry-free stay for seniors and families.',
    tag: 'Safety & Care'
  }
];

export const AUTHENTIC_RESTAURANT: RestaurantData = {
  name: 'In-House Restaurant & Dining',
  tagline: 'Freshly Prepared Meals, Tea & Breakfast at Hotel D.C. Grand',
  description:
    'Enjoy delicious meals and a pleasant dining experience during your stay at Hotel D.C. Grand. Our ground-floor dining area features comfortable teal velvet seating, marble-top tables, warm botanical alcove lighting, and attentive table and in-room service.',
  cuisines: [
    'North Indian Meals',
    'Morning Tea & Breakfast',
    'Pure Vegetarian Options',
    'Freshly Prepared Thalis & A La Carte',
    'In-Room Dining Service'
  ],
  timings: 'Open Daily: 07:00 AM – 11:00 PM (Verified at Hotel Reception Desk)',
  facilities: [
    'Air-Conditioned Dining Area',
    'Plush Teal Velvet Seating & Marble Tables',
    'Morning Tea & Breakfast Service',
    'Prompt In-Room Dining Service',
    'Family & Group Seating',
    'Hygienic In-House Kitchen (Outside Food Not Permitted)'
  ],
  images: [
    HOTEL_ASSETS.inHouseRestaurantDining.optimizedPath,
    HOTEL_ASSETS.banquetConferenceHall.optimizedPath,
    HOTEL_ASSETS.anniversaryCelebrationDecor.optimizedPath
  ],
  isVisible: true
};

export const AUTHENTIC_EVENTS: EventFacilityData[] = [
  {
    id: 'event-banquet-hall',
    name: 'Banquet & Conference Hall',
    description:
      'An air-conditioned indoor banquet and conference venue within Hotel D.C. Grand equipped with dressed round tables, upholstered banquet chairs, ceiling cove lighting, and a dedicated full-length buffet catering counter for corporate meetings, family gatherings, and group luncheons.',
    capacity: 'Contact for Group & Event Seating Capacity',
    facilities: [
      'Air-Conditioned Banquet Hall',
      'Full-Length Catering & Buffet Counter',
      'Dressed Round Tables & Banquet Chairs',
      'Conference Notepads & Mineral Water Setup',
      'Free High-Speed Wi-Fi'
    ],
    seatingArrangements: [
      'Round-Table Banquet Setup',
      'Conference & Seminar Seating',
      'Group Dining & Buffet Format'
    ],
    timings: 'Available by Prior Reservation via Front Desk (+91 70840 03000)',
    images: [
      HOTEL_ASSETS.banquetConferenceHall.optimizedPath,
      HOTEL_ASSETS.inHouseRestaurantDining.optimizedPath
    ],
    isAvailable: true
  },
  {
    id: 'event-celebrations',
    name: 'Anniversary & Family Celebrations',
    description:
      'Celebrate milestones, wedding anniversaries, and family occasions during your stay in Varanasi. Our team arranges custom balloon arch decorations, floral table settings, and personalized dining arrangements inside the hotel.',
    capacity: 'Intimate Couples & Family Celebrations',
    facilities: [
      'Custom Balloon Arch & Foil Lettering Decor',
      'Floral Centerpiece & Lounge Seating',
      'In-House Dining & Cake Table Setup',
      'Dedicated Staff Assistance'
    ],
    seatingArrangements: [
      'Private Celebration Lounge Setup',
      'In-Room Honeymoon / Anniversary Decor'
    ],
    timings: 'Arranged on Request Prior to Arrival',
    images: [
      HOTEL_ASSETS.anniversaryCelebrationDecor.optimizedPath,
      HOTEL_ASSETS.honeymoonRoomFloralSwan.optimizedPath
    ],
    isAvailable: true
  }
];
