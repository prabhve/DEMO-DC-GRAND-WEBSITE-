import { RoomPerspective, RoomHotspot } from '../types/hotel';

export interface RoomTourData {
  roomId: string;
  roomName: string;
  defaultPerspectiveId: string;
  perspectives: RoomPerspective[];
  hotspots: RoomHotspot[];
}

export const VIRTUAL_TOUR_ROOMS: Record<string, RoomTourData> = {
  'room-super-deluxe': {
    roomId: 'room-super-deluxe',
    roomName: 'Super Deluxe Room',
    defaultPerspectiveId: 'super-deluxe-main',
    perspectives: [
      {
        id: 'super-deluxe-main',
        label: 'Bed Chamber Angle',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85',
        description: 'Centered on the double bed with geometric gold accent wall and warm cove illumination.'
      },
      {
        id: 'super-deluxe-workstation',
        label: 'Workstation & Lounge',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=85',
        description: 'Ergonomic wooden desk, high-speed optical Wi-Fi, and plush armchair seating.'
      },
      {
        id: 'super-deluxe-window',
        label: 'Acoustic City View Bay',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
        description: 'Double-glazed soundproof window overlooking Bhelupur with blackout velvet drapery.'
      },
      {
        id: 'super-deluxe-bath',
        label: 'En-Suite Rain Shower Bath',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=85',
        description: 'Private bathroom with vitreous sanitary fittings, rain shower, and 24/7 hot water.'
      }
    ],
    hotspots: [
      {
        id: 'sd-bed',
        title: 'Plush Double Bed & 400-TC Linens',
        description: 'Engineered for deep restorative rest after temple visits, dressed in crisp white hypoallergenic cotton.',
        tag: 'Comfort Bedding',
        position: [0, -20, -180],
        perspective: 'super-deluxe-main'
      },
      {
        id: 'sd-lighting',
        title: 'Geometric Accent & Ambient Cove Lighting',
        description: 'Warm gold leaf wall treatment designed to create an intimate sanctuary atmosphere at dusk.',
        tag: 'Ambience',
        position: [80, 70, -160],
        perspective: 'super-deluxe-main'
      },
      {
        id: 'sd-ac',
        title: 'Climate-Controlled Air Conditioning',
        description: 'Whisper-quiet inverter AC ensuring your preferred temperature in every season.',
        tag: 'Climate',
        position: [-140, 110, -100],
        perspective: 'super-deluxe-main'
      },
      {
        id: 'sd-desk',
        title: 'Workstation & Tea Station',
        description: 'Equipped with electric kettle, premium tea/coffee selection, and dedicated power sockets.',
        tag: 'Refreshment & Work',
        position: [150, -40, 60],
        perspective: 'super-deluxe-workstation'
      },
      {
        id: 'sd-window',
        title: 'Double-Glazed Soundproof Glass',
        description: 'Shields your suite from street ambient noise while offering bright natural daylight.',
        tag: 'Acoustics & View',
        position: [-170, 10, -50],
        perspective: 'super-deluxe-window'
      },
      {
        id: 'sd-bath',
        title: 'Vitreous En-Suite Bathroom',
        description: 'Contemporary bathroom with rain shower, plush bath towels, and luxury toiletries.',
        tag: 'Sanitary',
        position: [120, -10, -130],
        perspective: 'super-deluxe-bath'
      }
    ]
  },
  'room-villa-deluxe': {
    roomId: 'room-villa-deluxe',
    roomName: 'Villa Deluxe Room',
    defaultPerspectiveId: 'villa-deluxe-main',
    perspectives: [
      {
        id: 'villa-deluxe-main',
        label: 'Villa Bed Chamber',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=85',
        description: 'Peaceful bed chamber with quiet courtyard garden orientation and warm wooden accents.'
      },
      {
        id: 'villa-deluxe-lounge',
        label: 'Lounge & Dresser Bay',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85',
        description: 'Vanity mirror, custom wood wardrobe, and luggage bench.'
      },
      {
        id: 'villa-deluxe-bath',
        label: 'Private Bathroom',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=85',
        description: 'Immaculately clean private en-suite with modern fittings.'
      }
    ],
    hotspots: [
      {
        id: 'vd-bed',
        title: 'Double Bed with Orthopedic Base',
        description: 'Designed for optimal spinal alignment and superior comfort.',
        tag: 'Bedding',
        position: [0, -30, -190],
        perspective: 'villa-deluxe-main'
      },
      {
        id: 'vd-tv',
        title: 'Smart LED Television',
        description: 'Equipped with satellite channels and streaming connectivity.',
        tag: 'Entertainment',
        position: [160, 20, -40],
        perspective: 'villa-deluxe-main'
      },
      {
        id: 'vd-garden',
        title: 'Courtyard Garden View',
        description: 'Peaceful natural daylight filtering through custom drapery.',
        tag: 'Quietude',
        position: [-160, 30, -70],
        perspective: 'villa-deluxe-main'
      }
    ]
  },
  'room-villa-family': {
    roomId: 'room-villa-family',
    roomName: 'Villa Family Room',
    defaultPerspectiveId: 'villa-family-main',
    perspectives: [
      {
        id: 'villa-family-main',
        label: 'Family Suite Main View',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
        description: 'Expansive 200 sq ft chamber with extra plush King Bed for family traveling with a child.'
      },
      {
        id: 'villa-family-wardrobe',
        label: 'Wardrobe & Seating Zone',
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=2000&q=85',
        description: 'Spacious luggage storage, dressing table, and ample floor space.'
      },
      {
        id: 'villa-family-bath',
        label: 'En-Suite Bathroom',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85',
        description: 'Family-friendly bathroom layout with non-slip flooring.'
      }
    ],
    hotspots: [
      {
        id: 'vf-bed',
        title: 'Expanded King Bed',
        description: 'Ample room for two adults and a child with luxury duvet and pillows.',
        tag: 'Family Comfort',
        position: [10, -20, -190],
        perspective: 'villa-family-main'
      },
      {
        id: 'vf-floor',
        title: 'Polished Vitrified Flooring',
        description: 'Cool, hygienic vitrified tiles easy for children to move safely.',
        tag: 'Interior Finish',
        position: [-40, -110, -120],
        perspective: 'villa-family-main'
      },
      {
        id: 'vf-storage',
        title: 'Large Multi-Tier Wardrobe',
        description: 'Generous hanging space and digital safety locker for valuables.',
        tag: 'Storage',
        position: [170, 0, 40],
        perspective: 'villa-family-wardrobe'
      }
    ]
  },
  'room-family-room': {
    roomId: 'room-family-room',
    roomName: 'Family Room',
    defaultPerspectiveId: 'family-room-main',
    perspectives: [
      {
        id: 'family-room-main',
        label: 'Dual Bed Setup Chamber',
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=2000&q=85',
        description: '220 sq ft suite featuring 1 King Bed plus 1 separate Single Bed for comfortable group stays.'
      },
      {
        id: 'family-room-side',
        label: 'Single Bed & Desk Angle',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85',
        description: 'Dedicated individual bedding corner and bedside nightstand.'
      },
      {
        id: 'family-room-view',
        label: 'Bhelupur City Skyline View',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=85',
        description: 'High floor view across Varanasi morning cityscape.'
      }
    ],
    hotspots: [
      {
        id: 'fr-king',
        title: 'Primary King Bed',
        description: 'Luxurious primary sleeping space with bedside electrical charging points.',
        tag: 'Primary Bed',
        position: [-70, -25, -170],
        perspective: 'family-room-main'
      },
      {
        id: 'fr-single',
        title: 'Additional Single Bed',
        description: 'Dedicated single mattress for older children or third adult guest.',
        tag: 'Extra Bed',
        position: [120, -35, -130],
        perspective: 'family-room-main'
      },
      {
        id: 'fr-kettle',
        title: 'In-Room Tea & Coffee Setup',
        description: 'Electric kettle and refreshment supplies for the whole family.',
        tag: 'Amenities',
        position: [160, -10, 60],
        perspective: 'family-room-side'
      }
    ]
  },
  'room-deluxe-room': {
    roomId: 'room-deluxe-room',
    roomName: 'Deluxe Room',
    defaultPerspectiveId: 'deluxe-room-main',
    perspectives: [
      {
        id: 'deluxe-room-main',
        label: 'Deluxe Bed Chamber',
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=85',
        description: 'Warm, cozy room with Queen bed and tasteful lighting for solo pilgrims and couples.'
      },
      {
        id: 'deluxe-room-vanity',
        label: 'Vanity & Acoustic Mirror',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=2000&q=85',
        description: 'Dressing table with mirror, laundry hamper, and iron on request.'
      },
      {
        id: 'deluxe-room-bath',
        label: 'En-Suite Bathroom',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85',
        description: 'Clean, well-ventilated bathroom with hot and cold shower.'
      }
    ],
    hotspots: [
      {
        id: 'dlx-bed',
        title: 'Queen Size Bed',
        description: 'Comfortable mattress with soft pillows and fresh cotton sheets.',
        tag: 'Comfort',
        position: [0, -30, -190],
        perspective: 'deluxe-room-main'
      },
      {
        id: 'dlx-vanity',
        title: 'Dressing & Mirror Console',
        description: 'Functional corner to prepare for early morning Ganga Aarti and temple visits.',
        tag: 'Convenience',
        position: [140, 10, -90],
        perspective: 'deluxe-room-vanity'
      },
      {
        id: 'dlx-wifi',
        title: 'High-Speed Optical Wi-Fi',
        description: 'Uninterrupted fiber internet throughout your stay.',
        tag: 'Connectivity',
        position: [-130, 80, -90],
        perspective: 'deluxe-room-main'
      }
    ]
  }
};
