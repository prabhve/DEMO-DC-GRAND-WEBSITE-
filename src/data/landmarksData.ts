import { LandmarkItem } from '../types/hotel';

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
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Founded by Goswami Tulsidas', 'Tuesday & Saturday Divine Darshan', 'Besan Laddoo Mahaprasad', 'Just 2.0 km from D C Grand']
  },
  {
    id: 'assi-ghat',
    name: 'Assi Ghat & Subah-e-Banaras',
    distance: '2.5 km',
    desc: 'The southernmost sacred ghat where the holy Assi meets the Ganges. Internationally celebrated for the dawn Subah-e-Banaras ceremony with Vedic chanting, classical music, yoga, and tranquil boat rides.',
    category: 'GHAT',
    travelTimeDrive: '8 – 10 mins',
    travelTimeWalk: '28 mins',
    coordinates: { lat: 25.2903, lng: 83.0069 },
    mapPosition: { x: 74, y: 58 },
    bestTimeToVisit: '05:15 AM for Sunrise Ganga Aarti & Morning Rowing Boat Rides',
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Sunrise Subah-e-Banaras Aarti', 'Traditional Hand-Rowed Boats', 'Cultural Pavilions & Cafes', 'Direct straight drive from Bhelupur']
  },
  {
    id: 'kashi-vishwanath',
    name: 'Shri Kashi Vishwanath Temple & Corridor',
    distance: '4.2 km',
    desc: 'The celestial golden-spire Jyotirlinga shrine of Lord Shiva in the eternal city. The newly transformed pedestrian corridor connects the sanctum sanctorum directly to the sacred Ganga ghats.',
    category: 'TEMPLE',
    travelTimeDrive: '15 mins',
    coordinates: { lat: 25.3109, lng: 83.0107 },
    mapPosition: { x: 78, y: 32 },
    bestTimeToVisit: 'Early morning 03:00 AM (Mangala Aarti) or 07:00 AM – 11:00 AM',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    highlights: ['One of 12 Sacred Jyotirlingas', 'Majestic Gold Plated Spires', 'Grand Riverfront Corridor', 'Sugam Darshan access assistance']
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
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    highlights: ['New VT Marble Temple (253 ft)', 'Lush 1,300-Acre Tree Canopy', 'Bharat Kala Bhavan Museum', 'Iconic Banarasi Cold Coffee']
  },
  {
    id: 'dashashwamedh-ghat',
    name: 'Dashashwamedh Ghat & Evening Aarti',
    distance: '3.8 km',
    desc: 'The vibrant heart of sacred Varanasi where Lord Brahma performed the ten-horse sacrifice. Hosts the world-renowned evening Maha Ganga Aarti with synchronized multi-tiered brass lamps.',
    category: 'GHAT',
    travelTimeDrive: '12 – 14 mins',
    coordinates: { lat: 25.3075, lng: 83.0104 },
    mapPosition: { x: 80, y: 38 },
    bestTimeToVisit: '06:15 PM – 07:45 PM for the Grand Evening Maha Aarti',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    highlights: ['World-Famous Evening Ganga Aarti', 'Synchronized Brass Fire Rituals', 'Sunset River Cruise Boats', 'Godowlia Market for Banarasi Silk']
  },
  {
    id: 'durga-kund',
    name: 'Durga Kund Temple & Anandbagh',
    distance: '1.6 km',
    desc: 'Striking 18th-century multi-tiered Nagara-style temple draped in vermilion red, dedicated to Goddess Durga, adjoining the sacred historical Durga Kund pond.',
    category: 'TEMPLE',
    travelTimeDrive: '5 mins',
    travelTimeWalk: '18 mins',
    coordinates: { lat: 25.2891, lng: 82.9961 },
    mapPosition: { x: 38, y: 52 },
    bestTimeToVisit: '06:00 AM – 12:00 PM & 04:00 PM – 09:00 PM',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Ochre Red Nagara Architecture', 'Sacred Durga Kund Tank', 'Navratri Special Celebrations', 'Short stroll from Bhelupur']
  },
  {
    id: 'tulsi-manas',
    name: 'Tulsi Manas Mandir',
    distance: '1.8 km',
    desc: 'Majestic white marble temple standing on the holy ground where Goswami Tulsidas composed the epic Ramcharitmanas, with its verses exquisitely carved into the inner marble walls.',
    category: 'TEMPLE',
    travelTimeDrive: '6 mins',
    travelTimeWalk: '20 mins',
    coordinates: { lat: 25.2863, lng: 82.9975 },
    mapPosition: { x: 44, y: 56 },
    bestTimeToVisit: '06:00 AM – 11:30 AM & 04:00 PM – 09:00 PM',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Engraved Ramcharitmanas Verses', 'Automated Puppet Dioramas', 'Lush Manas Garden Pavilion', 'Peaceful Meditative Grounds']
  },
  {
    id: 'varanasi-cantt',
    name: 'Varanasi Junction (Cantt Railway Station)',
    distance: '5.5 km',
    desc: 'The primary railway gateway of Varanasi connecting to New Delhi, Kolkata, Mumbai, and all major cities with executive Vande Bharat and Rajdhani express trains.',
    category: 'TRANSIT',
    travelTimeDrive: '18 – 20 mins',
    coordinates: { lat: 25.3283, lng: 82.9863 },
    mapPosition: { x: 34, y: 14 },
    bestTimeToVisit: 'Round-the-clock connectivity',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Primary Railway Terminal (BSB)', 'Vande Bharat Express Terminal', 'Direct road route via Bhelupur & Vidyapeeth', 'Prepaid Taxi & Auto services']
  },
  {
    id: 'varanasi-airport',
    name: 'Lal Bahadur Shastri Airport (VNS)',
    distance: '26.0 km',
    desc: 'Varanasi’s modern international air hub connecting to Delhi, Mumbai, Bengaluru, Hyderabad, Dubai, and Kathmandu, accessed easily via the new NH-31 4-lane bypass.',
    category: 'TRANSIT',
    travelTimeDrive: '45 – 50 mins',
    coordinates: { lat: 25.4524, lng: 82.8593 },
    mapPosition: { x: 15, y: 6 },
    bestTimeToVisit: '2 hours prior to scheduled departure',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Direct Domestic & International Flights', 'Express 4-Lane Highway bypass', 'Airport Pick-Up & Drop-Off arranged', 'Comfortable travel time from hotel']
  }
];

export const HOTEL_LOCATION_COORDINATES = {
  lat: 25.2927,
  lng: 82.9839,
  address: '22/24P, Kasmiganj Mohalla, Bhelupur, Varanasi, Uttar Pradesh 221010',
  mapPosition: { x: 38, y: 44 }
};
