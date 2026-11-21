import { GalleryItem } from '../types/hotel';
import { HOTEL_ASSETS } from './hotelAssets';

/**
 * HOTEL D.C. GRAND — VARANASI
 * Authentic Photo Gallery Configuration
 * Every image is a verified local asset downloaded from https://hoteldcgrand.com/wp-content/uploads/
 */

export const AUTHENTIC_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '24/7 Reception & Illuminated Front Desk',
    category: 'HOTEL',
    url: HOTEL_ASSETS.receptionFrontDeskWide.optimizedPath,
    caption: 'The welcoming front desk at Hotel D.C. Grand in Bhelupur, Varanasi, featuring our illuminated gold crest and 24/7 guest assistance.',
    featured: true,
    cover: true,
    displayOrder: 1
  },
  {
    id: 'gal-2',
    title: 'Grand Lobby & Designer Ring Chandelier',
    category: 'HOTEL',
    url: HOTEL_ASSETS.grandLobbyChandelierHall.optimizedPath,
    caption: 'Polished marble reception hall illuminated by a contemporary multi-ring chandelier and warm cove lighting.',
    featured: true,
    displayOrder: 2
  },
  {
    id: 'gal-3',
    title: 'Deluxe Room with Daylight Window & Armchair',
    category: 'ROOMS',
    url: HOTEL_ASSETS.deluxeRoomWindowArmchair.optimizedPath,
    caption: 'Bright, climate-controlled Deluxe Room featuring a gold-accented headboard, blue swirl wallpaper, and velvet armchair.',
    featured: true,
    displayOrder: 3
  },
  {
    id: 'gal-4',
    title: 'In-House Restaurant & Dining Area',
    category: 'RESTAURANT',
    url: HOTEL_ASSETS.inHouseRestaurantDining.optimizedPath,
    caption: 'Our on-site dining space featuring plush teal velvet chairs, marble dining tables, and a backlit arched botanical feature wall.',
    featured: true,
    displayOrder: 4
  },
  {
    id: 'gal-5',
    title: 'Premium Room with Backlit Arch Feature Wall',
    category: 'ROOMS',
    url: HOTEL_ASSETS.premiumRoomArchFeatureWide.optimizedPath,
    caption: 'Spacious Premium Room appointed with warm LED cove lighting, teal upholstered headboard, and crisp white bedding.',
    featured: true,
    displayOrder: 5
  },
  {
    id: 'gal-6',
    title: 'Banquet & Conference Hall',
    category: 'MEETINGS & EVENTS',
    url: HOTEL_ASSETS.banquetConferenceHall.optimizedPath,
    caption: 'Air-conditioned banquet and conference venue arranged with round tables, dressed seating, and a full buffet counter.',
    featured: true,
    displayOrder: 6
  },
  {
    id: 'gal-7',
    title: 'Family Room with Double Bed, Single Bed & Sofa',
    category: 'ROOMS',
    url: HOTEL_ASSETS.familyRoomTripleBedSofa.optimizedPath,
    caption: 'Wood-paneled Family Room offering dual beds (1 Double + 1 Single), a two-seater sofa, coffee table, and window blinds.',
    featured: true,
    displayOrder: 7
  },
  {
    id: 'gal-8',
    title: 'Reception Lounge & Teal Velvet Seating',
    category: 'HOTEL',
    url: HOTEL_ASSETS.lobbyTealVelvetLounge.optimizedPath,
    caption: 'Comfortable ground-floor lounge area with teal velvet sofas, marble coffee table, and Kashi Vishwanath artwork.',
    featured: false,
    displayOrder: 8
  },
  {
    id: 'gal-9',
    title: 'Honeymoon / Couple Room with Towel Swan Art',
    category: 'ROOMS',
    url: HOTEL_ASSETS.honeymoonRoomFloralSwan.optimizedPath,
    caption: 'Cozy couple accommodation featuring a backlit floral wall, tufted headboard, Voltas split AC, and vanity mirror.',
    featured: false,
    displayOrder: 9
  },
  {
    id: 'gal-10',
    title: 'Super Deluxe Room with LED Mirror & Spotlights',
    category: 'ROOMS',
    url: HOTEL_ASSETS.superDeluxeRoomLedMirror.optimizedPath,
    caption: 'Executive Super Deluxe Room featuring recessed ceiling spotlights and a vertical LED-lit dressing mirror.',
    featured: false,
    displayOrder: 10
  },
  {
    id: 'gal-11',
    title: 'Custom Anniversary & Milestone Celebration Decor',
    category: 'MEETINGS & EVENTS',
    url: HOTEL_ASSETS.anniversaryCelebrationDecor.optimizedPath,
    caption: 'Bespoke Happy Anniversary balloon arch and floral arrangement prepared for guests celebrating special milestones.',
    featured: false,
    displayOrder: 11
  },
  {
    id: 'gal-12',
    title: 'Guest Waiting Lounge & Traditional Mandir',
    category: 'HOTEL',
    url: HOTEL_ASSETS.guestSittingLoungeMandir.optimizedPath,
    caption: 'Inviting guest sitting area with carved wooden armchairs, glass coffee table, and a serene white temple shrine.',
    featured: false,
    displayOrder: 12
  },
  {
    id: 'gal-13',
    title: 'Illuminated Buddha Sculpture & Fluted Wall',
    category: 'HOTEL',
    url: HOTEL_ASSETS.interiorBuddhaFountainDecor.optimizedPath,
    caption: 'Tasteful interior detailing combining an illuminated meditative Buddha fountain with sacred artwork.',
    featured: false,
    displayOrder: 13
  },
  {
    id: 'gal-14',
    title: 'Ganga Aarti Heritage Mural Along Stairwell',
    category: 'ABOUT',
    url: HOTEL_ASSETS.staircaseGangaAartiMural.optimizedPath,
    caption: 'A large Ganga Aarti photographic mural celebrating the spiritual spirit of Kashi inside Hotel D.C. Grand.',
    featured: false,
    displayOrder: 14
  },
  {
    id: 'gal-15',
    title: 'Warm Family Welcome at Hotel D.C. Grand',
    category: 'ABOUT',
    url: HOTEL_ASSETS.guestWelcomeHospitality.optimizedPath,
    caption: 'Our hosts welcoming visiting families with warm Banarasi hospitality at the Hotel D.C. Grand reception.',
    featured: true,
    displayOrder: 15
  }
];
