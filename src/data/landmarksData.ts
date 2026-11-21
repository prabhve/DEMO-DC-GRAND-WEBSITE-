import { LandmarkItem } from '../types/hotel';
import { HOTEL_ASSETS } from './hotelAssets';
import { OFFICIAL_CONTACT } from './hotelContent';

export const VARANASI_LANDMARKS: LandmarkItem[] = [
  {
    id: 'sankat-mochan',
    name: 'Sankat Mochan Hanuman Temple',
    distance: '2.0 km',
    desc: 'World-renowned sacred sanctuary established by Goswami Tulsidas in the 16th century. Celebrated for its tranquil spiritual energy, divine darshan, and the holy chanting of the Hanuman Chalisa.',
    category: 'TEMPLE',
    travelTimeDrive: '6 – 8 mins',
    travelTimeWalk: '24 mins',
    coordinates: { lat: 25.2818, lng: 82.9984 },
    mapPosition: { x: 42, y: 64 },
    bestTimeToVisit: '05:00 AM – 11:00 AM & 06:30 PM (Tuesday & Saturday special darshan)',
    image: HOTEL_ASSETS.varanasiGhatsSunrise.optimizedPath,
    highlights: [
      'Founded by Goswami Tulsidas',
      'Tuesday & Saturday Divine Darshan',
      'Besan Laddoo Mahaprasad',
      'Just 2.0 km from Hotel D.C. Grand'
    ]
  },
  {
    id: 'assi-ghat',
    name: 'Assi Ghat & Subah-e-Banaras',
    distance: '2.1 km',
    desc: 'The southernmost sacred ghat where the holy Assi meets the Ganges. Internationally celebrated for the dawn Subah-e-Banaras ceremony with Vedic chanting, classical music, yoga, and tranquil boat rides.',
    category: 'GHAT',
    travelTimeDrive: '7 – 9 mins',
    travelTimeWalk: '25 mins',
    coordinates: { lat: 25.2903, lng: 83.0069 },
    mapPosition: { x: 74, y: 58 },
    bestTimeToVisit: '05:15 AM for Sunrise Ganga Aarti & Morning Rowing Boat Rides',
    image: HOTEL_ASSETS.varanasiGangaAartiEvening.optimizedPath,
    highlights: [
      'Sunrise Subah-e-Banaras Aarti',
      'Traditional Hand-Rowed Boats',
      'Cultural Pavilions & Heritage Walks',
      'Direct drive from Bhelupur'
    ]
  },
  {
    id: 'kashi-vishwanath',
    name: 'Shri Kashi Vishwanath Temple & Corridor',
    distance: '2.8 km',
    desc: 'The celestial golden-spire Jyotirlinga shrine of Lord Shiva in the eternal city. The transformed pedestrian corridor connects the sanctum sanctorum directly to the sacred Ganga ghats.',
    category: 'TEMPLE',
    travelTimeDrive: '10 – 12 mins',
    coordinates: { lat: 25.3109, lng: 83.0107 },
    mapPosition: { x: 78, y: 32 },
    bestTimeToVisit: 'Early morning 03:00 AM (Mangala Aarti) or 07:00 AM – 11:00 AM',
    image: HOTEL_ASSETS.kashiVishwanathGoldenTemple.optimizedPath,
    highlights: [
      'One of 12 Sacred Jyotirlingas',
      'Majestic Gold-Plated Spires',
      'Grand Riverfront Corridor',
      'Guide on Demand available at reception'
    ]
  },
  {
    id: 'bhu-campus',
    name: 'Banaras Hindu University (BHU) & New VT',
    distance: '3.0 km',
    desc: 'Asia’s premier residential university campus established by Mahamana Pandit Madan Mohan Malaviya, renowned for its peaceful tree-shaded avenues and the towering marble New Vishwanath Mandir.',
    category: 'CAMPUS',
    travelTimeDrive: '10 mins',
    coordinates: { lat: 25.2677, lng: 82.9913 },
    mapPosition: { x: 30, y: 82 },
    bestTimeToVisit: '08:00 AM – 06:00 PM for temple visit and Bharat Kala Bhavan Museum',
    image: HOTEL_ASSETS.bhuVishwanathTempleCampus.optimizedPath,
    highlights: [
      'New VT Marble Temple (253 ft)',
      'Lush 1,300-Acre Tree Canopy',
      'Bharat Kala Bhavan Museum',
      'Direct access via Gurudham & Lanka'
    ]
  },
  {
    id: 'dashashwamedh-ghat',
    name: 'Dashashwamedh Ghat & Evening Aarti',
    distance: '2.2 km',
    desc: 'The vibrant heart of sacred Varanasi where Lord Brahma performed the ten-horse sacrifice. Hosts the world-renowned evening Maha Ganga Aarti with synchronized multi-tiered brass lamps.',
    category: 'GHAT',
    travelTimeDrive: '8 – 10 mins',
    coordinates: { lat: 25.3075, lng: 83.0104 },
    mapPosition: { x: 80, y: 38 },
    bestTimeToVisit: '06:15 PM – 07:45 PM for the Grand Evening Maha Aarti',
    image: HOTEL_ASSETS.varanasiGangaAartiEvening.optimizedPath,
    highlights: [
      'World-Famous Evening Ganga Aarti',
      'Synchronized Brass Fire Rituals',
      'Sunset River Cruise Boats Arranged by Desk',
      'Godowlia Market for Banarasi Silk'
    ]
  },
  {
    id: 'durga-kund',
    name: 'Durga Kund Temple & Anandbagh',
    distance: '1.4 km',
    desc: 'Striking 18th-century multi-tiered Nagara-style temple draped in vermilion red, dedicated to Goddess Durga, adjoining the sacred historical Durga Kund pond in Bhelupur.',
    category: 'TEMPLE',
    travelTimeDrive: '4 – 5 mins',
    travelTimeWalk: '15 mins',
    coordinates: { lat: 25.2891, lng: 82.9961 },
    mapPosition: { x: 38, y: 52 },
    bestTimeToVisit: '06:00 AM – 12:00 PM & 04:00 PM – 09:00 PM',
    image: HOTEL_ASSETS.durgaKundMandirNight.optimizedPath,
    highlights: [
      'Ochre Red Nagara Architecture',
      'Sacred Durga Kund Tank',
      'Navratri Special Celebrations',
      'Short walk from Kashmiri Ganj, Bhelupur'
    ]
  },
  {
    id: 'tulsi-manas',
    name: 'Tulsi Manas Mandir',
    distance: '1.6 km',
    desc: 'Majestic white marble temple standing on the holy ground where Goswami Tulsidas composed the epic Ramcharitmanas, with its verses exquisitely carved into the inner marble walls.',
    category: 'TEMPLE',
    travelTimeDrive: '5 mins',
    travelTimeWalk: '18 mins',
    coordinates: { lat: 25.2863, lng: 82.9975 },
    mapPosition: { x: 44, y: 56 },
    bestTimeToVisit: '06:00 AM – 11:30 AM & 04:00 PM – 09:00 PM',
    image: HOTEL_ASSETS.varanasiGhatsSunrise.optimizedPath,
    highlights: [
      'Engraved Ramcharitmanas Verses',
      'Cultural Dioramas',
      'Lush Manas Garden Pavilion',
      'Peaceful Meditative Grounds'
    ]
  },
  {
    id: 'varanasi-cantt',
    name: 'Varanasi Junction (Cantt Railway Station)',
    distance: '4.1 km',
    desc: 'The primary railway gateway of Varanasi connecting to New Delhi, Kolkata, Mumbai, and all major cities with Vande Bharat and Rajdhani Express trains.',
    category: 'TRANSIT',
    travelTimeDrive: '14 – 16 mins',
    coordinates: { lat: 25.3283, lng: 82.9863 },
    mapPosition: { x: 34, y: 14 },
    bestTimeToVisit: 'Round-the-clock connectivity · Taxi & Train ticket desk at reception',
    image: HOTEL_ASSETS.travelTourBusService.optimizedPath,
    highlights: [
      'Primary Railway Terminal (BSB)',
      'Vande Bharat Express Terminal',
      'Direct road route via Gurudham & Bhelupur',
      'Car / Taxi pickup arranged by front desk'
    ]
  },
  {
    id: 'varanasi-airport',
    name: 'Lal Bahadur Shastri Airport (VNS)',
    distance: '24.0 km',
    desc: 'Varanasi’s international air hub connecting to Delhi, Mumbai, Bengaluru, Hyderabad, and Kathmandu, accessed easily via the 4-lane highway.',
    category: 'TRANSIT',
    travelTimeDrive: '40 – 45 mins',
    coordinates: { lat: 25.4524, lng: 82.8593 },
    mapPosition: { x: 15, y: 6 },
    bestTimeToVisit: '2 hours prior to scheduled departure · Airport taxi service available',
    image: HOTEL_ASSETS.travelTourBusService.optimizedPath,
    highlights: [
      'Direct Domestic & International Flights',
      'Express 4-Lane Highway Access',
      'Airport Pick-Up & Drop-Off Arranged',
      'Train & Flight Ticket Assistance at Reception'
    ]
  }
];

export const HOTEL_LOCATION_COORDINATES = {
  lat: 25.2927,
  lng: 82.9994,
  address: OFFICIAL_CONTACT.address,
  mapPosition: { x: 38, y: 44 }
};
