export interface RoomHotspot {
  id: string;
  title: string;
  description: string;
  tag: string;
  position: [number, number, number]; // 3D coordinates on sphere
  perspective?: string;
}

export interface RoomPerspective {
  id: string;
  label: string;
  image: string;
  description: string;
}

export interface Room {
  id: string;
  slug: string;
  name: string;
  size: string;
  maxGuests: number;
  bed: string;
  bathrooms: number;
  view: string;
  description: string;
  amenities: string[];
  features: string[];
  images: string[];
  coverImage: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  note?: string;
  panoramas?: RoomPerspective[];
  hotspots?: RoomHotspot[];
}

export interface BookingRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  roomId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  specialRequest?: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  status: 'New' | 'Contacted' | 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  adminNotes?: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  enquiryType: 'General Enquiry' | 'Room Enquiry' | 'Restaurant Enquiry' | 'Meeting / Event Enquiry' | 'Other';
  message: string;
  status: 'New' | 'Contacted' | 'Resolved';
  adminNotes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'HOTEL' | 'ROOMS' | 'RESTAURANT' | 'MEETINGS & EVENTS' | 'ABOUT';
  url: string;
  caption?: string;
  featured?: boolean;
  cover?: boolean;
  displayOrder: number;
}

export interface RestaurantData {
  name: string;
  tagline: string;
  description: string;
  cuisines: string[];
  timings: string;
  facilities: string[];
  images: string[];
  isVisible: boolean;
}

export interface EventFacilityData {
  id: string;
  name: string;
  description: string;
  capacity: string;
  facilities: string[];
  seatingArrangements: string[];
  timings: string;
  images: string[];
  isAvailable: boolean;
}

export interface PolicyData {
  cancellation: string;
  childPolicy: string;
  hotelPolicy: string;
  privacyPolicy: string;
  termsAndConditions: string;
}

export interface LandmarkItem {
  id: string;
  name: string;
  distance: string;
  desc: string;
  category: 'TEMPLE' | 'GHAT' | 'CAMPUS' | 'TRANSIT';
  travelTimeDrive: string;
  travelTimeWalk?: string;
  coordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number }; // percentage on 2D/3D map canvas (0-100)
  bestTimeToVisit: string;
  image: string;
  highlights: string[];
}

export interface ContactData {
  hotelName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  mapUrl: string;
  googleReviewUrl: string;
  tripAdvisorUrl: string;
  landmarks: (LandmarkItem | { name: string; distance: string; desc: string })[];
}

export interface HomeCmsData {
  heroHeadline: string;
  heroSupportingText: string;
  heroCoverImage: string;
  introHeading: string;
  introText: string;
  aboutText: string;
}

export type LODTier = 'high' | 'medium' | 'low';
export type LODMode = 'auto' | 'high' | 'medium' | 'low';

export interface ThreeDSettings {
  heroAnimationEnabled: boolean;
  galleryAnimationEnabled: boolean;
  roomAnimationEnabled: boolean;
  parallaxIntensity: number;
  threeIntensity: number;
  animationSpeed: number;
  lodMode?: LODMode;
  autoLODEnabled?: boolean;
}
