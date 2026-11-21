import { RoomPerspective, RoomHotspot } from '../types/hotel';
import { HOTEL_ASSETS } from './hotelAssets';

export interface RoomTourData {
  roomId: string;
  roomName: string;
  defaultPerspectiveId: string;
  perspectives: RoomPerspective[];
  hotspots: RoomHotspot[];
}

/**
 * HOTEL D.C. GRAND — VARANASI
 * 360° Room & Property Interior Inspector Data
 * Uses 100% locally served, authentic photographs of Hotel D.C. Grand rooms and reception.
 */
export const VIRTUAL_TOUR_ROOMS: Record<string, RoomTourData> = {
  'room-deluxe': {
    roomId: 'room-deluxe',
    roomName: 'Deluxe Room',
    defaultPerspectiveId: 'deluxe-window-angle',
    perspectives: [
      {
        id: 'deluxe-window-angle',
        label: 'Bed Chamber & Daylight Window',
        image: HOTEL_ASSETS.deluxeRoomWindowArmchair.optimizedPath,
        description: 'Authentic view of the Deluxe Room featuring the double bed, blue swirl accent wall, large daylight window, and plush grey armchair.'
      },
      {
        id: 'deluxe-entrance-angle',
        label: 'Entrance & Nightstand Angle',
        image: HOTEL_ASSETS.deluxeRoomEntranceView.optimizedPath,
        description: 'Full angle showing the room entrance door, bedside console with intercom telephone, and double bed.'
      },
      {
        id: 'deluxe-evening-angle',
        label: 'Evening Lighting & Zebra Blinds',
        image: HOTEL_ASSETS.deluxeRoomEveningBlinds.optimizedPath,
        description: 'Warm evening ambience with backlit headboard strip lighting and drawn window zebra blinds.'
      }
    ],
    hotspots: [
      {
        id: 'dlx-bed',
        title: 'Double Bed with Gold-Trimmed Headboard',
        description: 'Comfortable double mattress dressed in clean white cotton linens with quilted runner and pillows.',
        tag: 'Bedding',
        position: [0, -25, -180],
        perspective: 'deluxe-window-angle'
      },
      {
        id: 'dlx-armchair',
        title: 'Plush Velvet Lounge Armchair',
        description: 'Positioned beside the natural daylight window for reading, morning tea, and relaxation.',
        tag: 'Seating',
        position: [130, -40, -110],
        perspective: 'deluxe-window-angle'
      },
      {
        id: 'dlx-intercom',
        title: 'Bedside Intercom & Power Console',
        description: 'Direct telephone connection to our 24/7 reception desk and room service along with bedside charging sockets.',
        tag: 'Convenience',
        position: [-140, -35, -120],
        perspective: 'deluxe-entrance-angle'
      }
    ]
  },
  'room-premium': {
    roomId: 'room-premium',
    roomName: 'Premium Room',
    defaultPerspectiveId: 'premium-arch-main',
    perspectives: [
      {
        id: 'premium-arch-main',
        label: 'Backlit Arch Feature Wall',
        image: HOTEL_ASSETS.premiumRoomArchFeatureWide.optimizedPath,
        description: 'Wide view of the Premium Room showcasing the warm backlit arch-scale wallpaper and teal upholstered headboard.'
      },
      {
        id: 'premium-ac-vanity',
        label: 'Split AC & Vanity Mirror Corner',
        image: HOTEL_ASSETS.premiumRoomAcVanity.optimizedPath,
        description: 'Shows the Voltas split air conditioner, wooden entrance door, and built-in dressing mirror with electric kettle.'
      },
      {
        id: 'premium-royal-blue',
        label: 'Royal Blue Geometric Accent Suite',
        image: HOTEL_ASSETS.deluxeAcRoomRoyalBlue.optimizedPath,
        description: 'Alternate room styling featuring a royal blue and gold geometric feature wall and teal cushioned headboard.'
      }
    ],
    hotspots: [
      {
        id: 'prm-headboard',
        title: 'Teal Upholstered Headboard & Cove Lighting',
        description: 'Wide wooden frame with padded teal headboard panels and warm perimeter LED illumination.',
        tag: 'Interior Design',
        position: [0, 30, -180],
        perspective: 'premium-arch-main'
      },
      {
        id: 'prm-vanity',
        title: 'Dressing Mirror & Electric Kettle Station',
        description: 'Built-in vanity alcove equipped with mirror, storage cabinet, and electric tea kettle.',
        tag: 'In-Room Amenity',
        position: [-90, 10, -150],
        perspective: 'premium-ac-vanity'
      },
      {
        id: 'prm-ac',
        title: 'Voltas Split Air Conditioning',
        description: 'Individual climate control for year-round comfort in Varanasi.',
        tag: 'Climate Control',
        position: [-150, 110, -90],
        perspective: 'premium-ac-vanity'
      }
    ]
  },
  'room-family': {
    roomId: 'room-family',
    roomName: 'Family Room',
    defaultPerspectiveId: 'family-triple-main',
    perspectives: [
      {
        id: 'family-triple-main',
        label: 'Dual Bed & Family Sofa Suite',
        image: HOTEL_ASSETS.familyRoomTripleBedSofa.optimizedPath,
        description: 'Authentic Family Room at Hotel D.C. Grand featuring 1 Double Bed, 1 Separate Single Bed, wood wall paneling, and a two-seater sofa with coffee table.'
      },
      {
        id: 'family-lobby-lounge',
        label: 'Ground-Floor Family Waiting Lounge',
        image: HOTEL_ASSETS.guestSittingLoungeMandir.optimizedPath,
        description: 'Spacious family waiting lounge at Hotel D.C. Grand with wooden seating and traditional white mandir.'
      }
    ],
    hotspots: [
      {
        id: 'fam-double-bed',
        title: 'Primary Double Bed',
        description: 'Main double bed with teal cushioned headboard and full-height wood wall paneling.',
        tag: 'Primary Bedding',
        position: [-100, -30, -150],
        perspective: 'family-triple-main'
      },
      {
        id: 'fam-single-bed',
        title: 'Separate Single Bed',
        description: 'Dedicated third-guest single bed ideal for families traveling with children or senior relatives.',
        tag: 'Family Bedding',
        position: [40, -25, -170],
        perspective: 'family-triple-main'
      },
      {
        id: 'fam-sofa',
        title: 'Two-Seater Lounge Sofa & Table',
        description: 'In-room sitting area with a comfortable teal two-seater sofa and coffee table for family meals and conversation.',
        tag: 'Living Space',
        position: [140, -55, -90],
        perspective: 'family-triple-main'
      }
    ]
  },
  'room-honeymoon': {
    roomId: 'room-honeymoon',
    roomName: 'Honeymoon / Couple Room',
    defaultPerspectiveId: 'honeymoon-swan-main',
    perspectives: [
      {
        id: 'honeymoon-swan-main',
        label: 'Couple Bed Chamber & Floral Wall',
        image: HOTEL_ASSETS.honeymoonRoomFloralSwan.optimizedPath,
        description: 'Couple room featuring blue floral backlit wallpaper, tufted brown headboard, towel swan art, Voltas split AC, and dressing mirror.'
      },
      {
        id: 'honeymoon-102-angle',
        label: 'Room 102 Lounge & Kettle View',
        image: HOTEL_ASSETS.honeymoonRoom102Interior.optimizedPath,
        description: 'View towards Room 102 entrance, plush armchair, and bedside electric kettle tray.'
      },
      {
        id: 'honeymoon-celebration',
        label: 'Anniversary Celebration Setup',
        image: HOTEL_ASSETS.anniversaryCelebrationDecor.optimizedPath,
        description: 'Custom Happy Anniversary balloon arch and floral arrangement available on request.'
      }
    ],
    hotspots: [
      {
        id: 'hm-bed',
        title: 'Couple Double Bed with Swan Towel Art',
        description: 'Prepared with fresh white linens, quilted runner, and celebratory towel presentation.',
        tag: 'Couple Stay',
        position: [20, -30, -180],
        perspective: 'honeymoon-swan-main'
      },
      {
        id: 'hm-kettle',
        title: 'In-Room Electric Kettle & Armchair',
        description: 'Convenient tea/coffee kettle setup and cozy velvet armchair.',
        tag: 'Refreshments',
        position: [90, -15, -150],
        perspective: 'honeymoon-102-angle'
      }
    ]
  },
  'room-super-deluxe': {
    roomId: 'room-super-deluxe',
    roomName: 'Super Deluxe AC Room',
    defaultPerspectiveId: 'super-deluxe-mirror',
    perspectives: [
      {
        id: 'super-deluxe-mirror',
        label: 'Spotlighted Bed & LED Mirror',
        image: HOTEL_ASSETS.superDeluxeRoomLedMirror.optimizedPath,
        description: 'Super Deluxe Room featuring warm ceiling spotlights, botanical feature wall, and vertical LED-lit dressing mirror.'
      },
      {
        id: 'super-deluxe-tv',
        label: 'Walnut TV Console & Seating Area',
        image: HOTEL_ASSETS.superDeluxeRoomTvLounge.optimizedPath,
        description: 'Shows the wall-mounted flat-screen LED TV, walnut wood console desk, and pair of armchairs.'
      },
      {
        id: 'super-deluxe-botanical',
        label: 'Botanical Cove-Lit Chamber',
        image: HOTEL_ASSETS.deluxeBotanicalRoomWindow.optimizedPath,
        description: 'Bright double chamber with recessed ceiling cove lighting, gold botanical wallpaper, and daylight window.'
      }
    ],
    hotspots: [
      {
        id: 'sd-mirror',
        title: 'Illuminated LED Dressing Mirror',
        description: 'Full-height vertical LED vanity mirror with bedside storage cabinet and power outlets.',
        tag: 'Vanity & Lighting',
        position: [110, 15, -140],
        perspective: 'super-deluxe-mirror'
      },
      {
        id: 'sd-tv',
        title: 'Wall-Mounted Flat-Screen TV & Desk',
        description: 'Full-width walnut wood entertainment console with flat-screen television and writing desk.',
        tag: 'Entertainment & Work',
        position: [-120, 20, -130],
        perspective: 'super-deluxe-tv'
      }
    ]
  }
};
