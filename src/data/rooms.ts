import { Room } from '../types/hotel';
import { HOTEL_ASSETS } from './hotelAssets';

/**
 * HOTEL D.C. GRAND — VARANASI
 * Authentic Room Categories & Verified Specifications
 * Mapped directly to genuine property photography downloaded from https://hoteldcgrand.com/wp-content/uploads/
 * Note: Distinct from D.C. Villa; no cross-property inventory is mixed here.
 */

export const AUTHENTIC_ROOMS: Room[] = [
  {
    id: 'room-deluxe',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    size: 'Comfortable Double Occupancy Layout',
    maxGuests: 2,
    bed: '1 Double Bed',
    bathrooms: 1,
    view: 'Bhelupur Street & Daylight Window View',
    description:
      'Experience extra comfort with warm interiors and a relaxing atmosphere for your stay in Varanasi. Our Deluxe Room features a comfortable double bed with a gold-accented headboard, bright daylight window with privacy blinds, plush armchair seating, and an attached western bathroom.',
    amenities: [
      'Climate-Controlled Split Air Conditioning',
      'Free High-Speed Wi-Fi',
      'Attached Modern Bathroom',
      'Plush Velvet Armchair',
      'Bedside Intercom Telephone',
      '24/7 Front Desk & Room Service',
      'Daily Housekeeping',
      'Fresh Linens & Towels'
    ],
    features: [
      'Large Daylight Window with Zebra Blinds',
      'Gold-Trimmed Tufted Headboard',
      'Bedside Power & Charging Sockets',
      'Quiet Vitrified Tile Flooring'
    ],
    coverImage: HOTEL_ASSETS.deluxeRoomWindowArmchair.optimizedPath,
    images: [
      HOTEL_ASSETS.deluxeRoomWindowArmchair.optimizedPath,
      HOTEL_ASSETS.deluxeRoomEntranceView.optimizedPath,
      HOTEL_ASSETS.deluxeRoomEveningBlinds.optimizedPath
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
    note: 'Contact for availability and current rates.'
  },
  {
    id: 'room-premium',
    slug: 'premium-room',
    name: 'Premium Room',
    size: 'Spacious Double Occupancy Layout',
    maxGuests: 2,
    bed: '1 Queen / Double Bed',
    bathrooms: 1,
    view: 'Interior Courtyard Orientation',
    description:
      'Enjoy spacious Premium Rooms with contemporary interiors, modern comforts, and warm hospitality for memorable stays. Highlighted by a warm backlit arch-scale feature wall, teal cushioned headboard, Voltas split air conditioning, and a built-in dressing vanity with electric kettle.',
    amenities: [
      'Voltas Split Air Conditioning',
      'Electric Kettle & Tea Setup',
      'Built-In Dressing Mirror & Cabinet',
      'Free High-Speed Wi-Fi',
      'Attached Modern Bathroom',
      'Bedside Intercom Telephone',
      '24/7 Room Service',
      'Daily Housekeeping'
    ],
    features: [
      'Warm Amber Backlit Arch Feature Wall',
      'Teal Upholstered Headboard Frame',
      'Dressing Console & Storage Wardrobe',
      'Dual Bedside Reading & Power Points'
    ],
    coverImage: HOTEL_ASSETS.premiumRoomArchFeatureWide.optimizedPath,
    images: [
      HOTEL_ASSETS.premiumRoomArchFeatureWide.optimizedPath,
      HOTEL_ASSETS.premiumRoomAcVanity.optimizedPath,
      HOTEL_ASSETS.deluxeAcRoomRoyalBlue.optimizedPath
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
    note: 'Contact for availability and current rates.'
  },
  {
    id: 'room-family',
    slug: 'family-room',
    name: 'Family Room',
    size: 'Multi-Bed Family & Group Layout',
    maxGuests: 3,
    bed: '1 Double Bed + 1 Separate Single Bed',
    bathrooms: 1,
    view: 'Daylight Window with Zebra Blinds',
    description:
      'Enjoy a spacious and comfortable stay with your loved ones in a welcoming environment. Specifically configured for families and spiritual travel groups visiting Varanasi, the Family Room provides a primary double bed, an additional separate single bed, full-height wood wall paneling, and a dedicated two-seater lounge sofa with coffee table.',
    amenities: [
      'Dual Bedding (Double Bed + Single Bed)',
      'Two-Seater Lounge Sofa & Coffee Table',
      'Climate-Controlled Air Conditioning',
      'Free High-Speed Wi-Fi',
      'Attached Modern Bathroom',
      'Bedside Intercom Telephone',
      '24/7 Room Service',
      'Daily Housekeeping'
    ],
    features: [
      'Full-Height Warm Wood Wall Paneling',
      'Dedicated Family Sitting Area',
      'Natural Daylight Window with Zebra Blinds',
      'Convenient Multi-Device Charging Sockets'
    ],
    coverImage: HOTEL_ASSETS.familyRoomTripleBedSofa.optimizedPath,
    images: [
      HOTEL_ASSETS.familyRoomTripleBedSofa.optimizedPath,
      HOTEL_ASSETS.premiumRoomArchFeatureWide.optimizedPath,
      HOTEL_ASSETS.deluxeRoomWindowArmchair.optimizedPath
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
    note: 'Contact for availability and current rates.'
  },
  {
    id: 'room-honeymoon',
    slug: 'honeymoon-room',
    name: 'Honeymoon / Couple Room',
    size: 'Cozy Couple Sanctuary Layout',
    maxGuests: 2,
    bed: '1 Double Bed',
    bathrooms: 1,
    view: 'Quiet Interior Orientation',
    description:
      'Celebrate your special moments in a serene, welcoming room designed for couples and restful stays. Features soft backlit floral wall decor, a plush tufted headboard, split air conditioning, ceiling fan, electric kettle station, lounge armchair, and built-in vanity mirror.',
    amenities: [
      'Voltas Split Air Conditioning & Ceiling Fan',
      'Electric Kettle & Tea Tray',
      'Plush Lounge Armchair',
      'Built-In Dressing Mirror & Cabinet',
      'Free High-Speed Wi-Fi',
      'Attached Modern Bathroom',
      '24/7 Room Service',
      'Custom Anniversary / Celebration Decor on Request'
    ],
    features: [
      'Backlit Floral Accent Wall',
      'Tufted Dark Brown Headboard',
      'Full-Length Window Drapery',
      'Private En-Suite Washroom'
    ],
    coverImage: HOTEL_ASSETS.honeymoonRoomFloralSwan.optimizedPath,
    images: [
      HOTEL_ASSETS.honeymoonRoomFloralSwan.optimizedPath,
      HOTEL_ASSETS.honeymoonRoom102Interior.optimizedPath,
      HOTEL_ASSETS.honeymoonRoomVerticalView.optimizedPath
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 4,
    note: 'Contact for availability and current rates.'
  },
  {
    id: 'room-super-deluxe',
    slug: 'super-deluxe-room',
    name: 'Super Deluxe AC Room',
    size: 'Executive Double Occupancy Layout',
    maxGuests: 2,
    bed: '1 Double Bed',
    bathrooms: 1,
    view: 'Bhelupur Cityscape View',
    description:
      'Appointed for business travelers, couples, and discerning pilgrims seeking elevated comfort. Combines warm recessed spotlighting, an illuminated LED dressing mirror, wall-mounted flat-screen television, writing desk with armchair seating, and climate-controlled air conditioning.',
    amenities: [
      'Climate-Controlled Air Conditioning',
      'Wall-Mounted Flat-Screen LED TV',
      'Illuminated LED Dressing Mirror',
      'Writing Desk & Armchair Seating',
      'Free High-Speed Wi-Fi',
      'Attached Modern Bathroom',
      'Bedside Intercom Telephone',
      '24/7 Room Service & Housekeeping'
    ],
    features: [
      'Recessed Ceiling Spotlights & Cove Lighting',
      'Walnut Wood TV Console & Desk Unit',
      'Botanical & Gold-Accent Wall Treatments',
      'Full-Length Blackout Curtains'
    ],
    coverImage: HOTEL_ASSETS.superDeluxeRoomLedMirror.optimizedPath,
    images: [
      HOTEL_ASSETS.superDeluxeRoomLedMirror.optimizedPath,
      HOTEL_ASSETS.superDeluxeRoomTvLounge.optimizedPath,
      HOTEL_ASSETS.superDeluxeRoomVanityAngle.optimizedPath,
      HOTEL_ASSETS.deluxeBotanicalRoomWindow.optimizedPath,
      HOTEL_ASSETS.deluxeBotanicalRoomBed.optimizedPath
    ],
    isFeatured: true,
    isActive: true,
    displayOrder: 5,
    note: 'Contact for availability and current rates.'
  }
];
