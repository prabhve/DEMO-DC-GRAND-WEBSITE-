import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Room,
  BookingRequest,
  BookingDraftParams,
  Enquiry,
  GalleryItem,
  RestaurantData,
  EventFacilityData,
  PolicyData,
  ContactData,
  HomeCmsData,
  ThreeDSettings
} from '../types/hotel';
import {
  INITIAL_ROOMS,
  INITIAL_GALLERY,
  INITIAL_RESTAURANT,
  INITIAL_EVENTS,
  INITIAL_POLICIES,
  INITIAL_CONTACT,
  INITIAL_HOME_CMS,
  INITIAL_3D_SETTINGS
} from '../data/initialData';

interface HotelContextType {
  // Data
  rooms: Room[];
  gallery: GalleryItem[];
  restaurant: RestaurantData;
  events: EventFacilityData[];
  policies: PolicyData;
  contact: ContactData;
  homeCms: HomeCmsData;
  threeSettings: ThreeDSettings;
  bookingRequests: BookingRequest[];
  enquiries: Enquiry[];

  // Navigation & Modals
  activeRoomForDetail: Room | null;
  setActiveRoomForDetail: (room: Room | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  preselectedRoomId: string | null;
  bookingDraft: BookingDraftParams | null;
  openBookingModal: (roomIdOrDraft?: string | BookingDraftParams) => void;
  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;
  initialEnquiryType: Enquiry['enquiryType'];
  openEnquiryModal: (type?: Enquiry['enquiryType']) => void;

  // 360 Virtual Tour
  isVirtualTourOpen: boolean;
  virtualTourRoomId: string | null;
  openVirtualTour: (roomId?: string) => void;
  closeVirtualTour: () => void;

  // Admin CMS
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;

  // Actions
  addBookingRequest: (request: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  updateBookingStatus: (id: string, status: BookingRequest['status'], adminNotes?: string) => void;
  deleteBookingRequest: (id: string) => void;

  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  updateEnquiryStatus: (id: string, status: Enquiry['status'], adminNotes?: string) => void;
  deleteEnquiry: (id: string) => void;

  // CMS Content management
  updateRoom: (room: Room) => void;
  addRoom: (room: Omit<Room, 'id' | 'slug'>) => void;
  deleteRoom: (id: string) => void;
  toggleRoomActive: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  updateRestaurant: (data: RestaurantData) => void;
  updateEvents: (events: EventFacilityData[]) => void;
  updateEvent: (event: EventFacilityData) => void;
  addEvent: (event: Omit<EventFacilityData, 'id'>) => void;
  deleteEvent: (id: string) => void;

  updatePolicies: (policies: PolicyData) => void;
  updateContact: (contact: ContactData) => void;
  updateHomeCms: (data: HomeCmsData) => void;
  update3DSettings: (settings: ThreeDSettings) => void;

  resetToDefaults: () => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROOMS: 'dc_grand_authentic_v4_rooms',
  GALLERY: 'dc_grand_authentic_v4_gallery',
  RESTAURANT: 'dc_grand_authentic_v4_restaurant',
  EVENTS: 'dc_grand_authentic_v4_events',
  POLICIES: 'dc_grand_authentic_v4_policies',
  CONTACT: 'dc_grand_authentic_v4_contact',
  HOME_CMS: 'dc_grand_authentic_v4_home_cms',
  THREE_SETTINGS: 'dc_grand_authentic_v4_three_settings',
  BOOKINGS: 'dc_grand_authentic_v4_bookings',
  ENQUIRIES: 'dc_grand_authentic_v4_enquiries'
};

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to defaults
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROOMS);
    if (!saved) return INITIAL_ROOMS;
    try {
      const parsed: Room[] = JSON.parse(saved);
      return parsed.map((r, idx) => {
        const fallbackRoom = INITIAL_ROOMS[idx] || INITIAL_ROOMS[0];
        const cleanImages = (r.images || []).filter((img) => typeof img === 'string' && img.trim().length > 0);
        const finalImages = cleanImages.length > 0 ? cleanImages : fallbackRoom.images;
        const cleanCover = r.coverImage && r.coverImage.trim().length > 0 ? r.coverImage.trim() : finalImages[0];
        return { ...r, images: finalImages, coverImage: cleanCover };
      });
    } catch {
      return INITIAL_ROOMS;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!saved) return INITIAL_GALLERY;
    try {
      const parsed: GalleryItem[] = JSON.parse(saved);
      return parsed.map((g, idx) => ({
        ...g,
        url:
          g.url && g.url.trim().length > 0
            ? g.url.trim()
            : (INITIAL_GALLERY[idx] || INITIAL_GALLERY[0]).url
      }));
    } catch {
      return INITIAL_GALLERY;
    }
  });

  const [restaurant, setRestaurant] = useState<RestaurantData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESTAURANT);
    if (!saved) return INITIAL_RESTAURANT;
    try {
      const parsed: RestaurantData = JSON.parse(saved);
      const cleanImages = (parsed.images || []).filter((img) => typeof img === 'string' && img.trim().length > 0);
      return {
        ...parsed,
        images: cleanImages.length > 0 ? cleanImages : INITIAL_RESTAURANT.images
      };
    } catch {
      return INITIAL_RESTAURANT;
    }
  });

  const [events, setEvents] = useState<EventFacilityData[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!saved) return INITIAL_EVENTS;
    try {
      const parsed: EventFacilityData[] = JSON.parse(saved);
      return parsed.map((ev, idx) => {
        const fallbackEv = INITIAL_EVENTS[idx] || INITIAL_EVENTS[0];
        const cleanImages = (ev.images || []).filter((img) => typeof img === 'string' && img.trim().length > 0);
        return {
          ...ev,
          images: cleanImages.length > 0 ? cleanImages : fallbackEv.images,
          seatingArrangements: ev.seatingArrangements || fallbackEv.seatingArrangements
        };
      });
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [policies, setPolicies] = useState<PolicyData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.POLICIES);
    return saved ? JSON.parse(saved) : INITIAL_POLICIES;
  });

  const [contact, setContact] = useState<ContactData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACT);
    return saved ? JSON.parse(saved) : INITIAL_CONTACT;
  });

  const [homeCms, setHomeCms] = useState<HomeCmsData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HOME_CMS);
    if (!saved) return INITIAL_HOME_CMS;
    try {
      const parsed: HomeCmsData = JSON.parse(saved);
      // Automatically upgrade legacy default hero & intro copy to the Phase 3 & Phase 9 editorial defaults
      const isLegacyHero =
        parsed.heroHeadline === 'Comfortable Stay in the Heart of Varanasi' ||
        !parsed.heroHeadline;
      const isLegacyIntro =
        parsed.introHeading === 'D C Grand' || !parsed.introHeading;
      const isLegacyAbout =
        parsed.aboutHeading === 'A Gracious Base in the Eternal City' || !parsed.aboutHeading;

      return {
        ...INITIAL_HOME_CMS,
        ...parsed,
        ...(isLegacyHero
          ? {
              heroBadge: INITIAL_HOME_CMS.heroBadge,
              heroSubtitle: INITIAL_HOME_CMS.heroSubtitle,
              heroHeadline: INITIAL_HOME_CMS.heroHeadline,
              heroSupportingText: INITIAL_HOME_CMS.heroSupportingText,
              heroExploreBtnText: INITIAL_HOME_CMS.heroExploreBtnText,
              heroBookingBtnText: INITIAL_HOME_CMS.heroBookingBtnText
            }
          : {}),
        ...(isLegacyIntro
          ? {
              introBadge: INITIAL_HOME_CMS.introBadge,
              introHeading: INITIAL_HOME_CMS.introHeading,
              introText: INITIAL_HOME_CMS.introText,
              introPillar1Title: INITIAL_HOME_CMS.introPillar1Title,
              introPillar1Desc: INITIAL_HOME_CMS.introPillar1Desc,
              introPillar2Title: INITIAL_HOME_CMS.introPillar2Title,
              introPillar2Desc: INITIAL_HOME_CMS.introPillar2Desc
            }
          : {}),
        ...(isLegacyAbout
          ? {
              aboutBadge: INITIAL_HOME_CMS.aboutBadge,
              aboutHeading: INITIAL_HOME_CMS.aboutHeading,
              aboutText: INITIAL_HOME_CMS.aboutText,
              aboutSecondaryText: INITIAL_HOME_CMS.aboutSecondaryText,
              aboutFeatures: INITIAL_HOME_CMS.aboutFeatures
            }
          : {}),
        heroCoverImage:
          parsed.heroCoverImage && parsed.heroCoverImage.trim().length > 0
            ? parsed.heroCoverImage.trim()
            : INITIAL_HOME_CMS.heroCoverImage,
        introImage:
          parsed.introImage && parsed.introImage.trim().length > 0
            ? parsed.introImage.trim()
            : INITIAL_HOME_CMS.introImage,
        aboutImage:
          parsed.aboutImage && parsed.aboutImage.trim().length > 0
            ? parsed.aboutImage.trim()
            : INITIAL_HOME_CMS.aboutImage
      };
    } catch {
      return INITIAL_HOME_CMS;
    }
  });

  const [threeSettings, setThreeSettings] = useState<ThreeDSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THREE_SETTINGS);
    return saved ? JSON.parse(saved) : INITIAL_3D_SETTINGS;
  });

  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'DCG-BK-9241',
        customerName: 'Aarav Sharma',
        phone: '+91 98765 43210',
        email: 'aarav.sharma@example.com',
        roomId: 'room-deluxe',
        roomName: 'Deluxe Room',
        checkInDate: '2026-10-15',
        checkOutDate: '2026-10-18',
        guests: 2,
        specialRequest: 'Arriving late afternoon after Ganga Aarti. High floor room preferred.',
        preferredContact: 'whatsapp',
        status: 'New',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'DCG-BK-9240',
        customerName: 'Meera Patel',
        phone: '+91 98111 22334',
        email: 'meera.p@example.com',
        roomId: 'room-family',
        roomName: 'Family Room',
        checkInDate: '2026-10-22',
        checkOutDate: '2026-10-25',
        guests: 3,
        specialRequest: 'Visiting Kashi Vishwanath with elderly parents. Ground or elevator close proximity please.',
        preferredContact: 'phone',
        status: 'Contacted',
        adminNotes: 'Spoke with guest. Assured elevator access.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ];
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'DCG-ENQ-1048',
        name: 'Rajesh Verma',
        phone: '+91 94150 55667',
        email: 'rajesh.v@varanasi.org',
        subject: 'Family Get-together & Dinner Booking',
        enquiryType: 'Restaurant Enquiry',
        message: 'We are planning a family dinner for 25 people on Sunday evening at the Hotel D.C. Grand restaurant. Please let us know buffet options and advance reservation.',
        status: 'New',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'DCG-ENQ-1047',
        name: 'Sunita Mishra',
        phone: '+91 91234 56789',
        email: 'sunita.m@gmail.com',
        subject: 'Anniversary Party Hall Availability',
        enquiryType: 'Meeting / Event Enquiry',
        message: 'Looking to book the Banquet Hall for an anniversary celebration with balloon decoration.',
        status: 'Contacted',
        adminNotes: 'Emailed banquet brochure and decor menu.',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ];
  });

  // UI States
  const [activeRoomForDetail, setActiveRoomForDetail] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [preselectedRoomId, setPreselectedRoomId] = useState<string | null>(null);
  const [bookingDraft, setBookingDraft] = useState<BookingDraftParams | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [initialEnquiryType, setInitialEnquiryType] = useState<Enquiry['enquiryType']>('General Enquiry');
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState<boolean>(false);
  const [virtualTourRoomId, setVirtualTourRoomId] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<string>('dashboard');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESTAURANT, JSON.stringify(restaurant));
  }, [restaurant]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contact));
  }, [contact]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HOME_CMS, JSON.stringify(homeCms));
  }, [homeCms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THREE_SETTINGS, JSON.stringify(threeSettings));
  }, [threeSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookingRequests));
  }, [bookingRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  // Actions
  const openBookingModal = (roomIdOrDraft?: string | BookingDraftParams) => {
    if (typeof roomIdOrDraft === 'string') {
      setPreselectedRoomId(roomIdOrDraft);
      setBookingDraft({ roomId: roomIdOrDraft });
    } else if (roomIdOrDraft && typeof roomIdOrDraft === 'object') {
      setPreselectedRoomId(roomIdOrDraft.roomId || null);
      setBookingDraft(roomIdOrDraft);
    } else {
      setPreselectedRoomId(null);
      setBookingDraft(null);
    }
    setIsBookingModalOpen(true);
  };

  const openEnquiryModal = (type?: Enquiry['enquiryType']) => {
    if (type) setInitialEnquiryType(type);
    setIsEnquiryModalOpen(true);
  };

  const openVirtualTour = (roomId?: string) => {
    setVirtualTourRoomId(roomId || rooms[0]?.id || 'room-deluxe');
    setIsVirtualTourOpen(true);
  };

  const closeVirtualTour = () => {
    setIsVirtualTourOpen(false);
  };

  const addBookingRequest = async (request: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `DCG-BK-${randomSuffix}`;
    const newRecord: BookingRequest = {
      ...request,
      id: newId,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setBookingRequests((prev) => [newRecord, ...prev]);
    return newId;
  };

  const updateBookingStatus = (id: string, status: BookingRequest['status'], adminNotes?: string) => {
    setBookingRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : item))
    );
  };

  const deleteBookingRequest = (id: string) => {
    setBookingRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const addEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `DCG-ENQ-${randomSuffix}`;
    const newRecord: Enquiry = {
      ...enquiry,
      id: newId,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setEnquiries((prev) => [newRecord, ...prev]);
    return newId;
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status'], adminNotes?: string) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : item))
    );
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
  };

  // CMS Handlers
  const updateRoom = (updatedRoom: Room) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  const addRoom = (roomData: Omit<Room, 'id' | 'slug'>) => {
    const slug = roomData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newId = `room-${Date.now()}`;
    const newRoom: Room = {
      ...roomData,
      id: newId,
      slug
    };
    setRooms((prev) => [...prev, newRoom]);
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleRoomActive = (id: string) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  };

  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newId = `gal-${Date.now()}`;
    const newItem: GalleryItem = { ...itemData, id: newId };
    setGallery((prev) => [...prev, newItem]);
  };

  const updateGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => prev.map((g) => (g.id === item.id ? item : g)));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const updateRestaurant = (data: RestaurantData) => {
    setRestaurant(data);
  };

  const updateEvents = (evList: EventFacilityData[]) => {
    setEvents(evList);
  };

  const updateEvent = (updated: EventFacilityData) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const addEvent = (evData: Omit<EventFacilityData, 'id'>) => {
    const newId = `event-${Date.now()}`;
    setEvents((prev) => [...prev, { ...evData, id: newId }]);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const updatePolicies = (p: PolicyData) => {
    setPolicies(p);
  };

  const updateContact = (c: ContactData) => {
    setContact(c);
  };

  const updateHomeCms = (h: HomeCmsData) => {
    setHomeCms(h);
  };

  const update3DSettings = (s: ThreeDSettings) => {
    setThreeSettings(s);
  };

  const resetToDefaults = () => {
    setRooms(INITIAL_ROOMS);
    setGallery(INITIAL_GALLERY);
    setRestaurant(INITIAL_RESTAURANT);
    setEvents(INITIAL_EVENTS);
    setPolicies(INITIAL_POLICIES);
    setContact(INITIAL_CONTACT);
    setHomeCms(INITIAL_HOME_CMS);
    setThreeSettings(INITIAL_3D_SETTINGS);
    localStorage.clear();
  };

  return (
    <HotelContext.Provider
      value={{
        rooms,
        gallery,
        restaurant,
        events,
        policies,
        contact,
        homeCms,
        threeSettings,
        bookingRequests,
        enquiries,
        activeRoomForDetail,
        setActiveRoomForDetail,
        isBookingModalOpen,
        setIsBookingModalOpen,
        preselectedRoomId,
        bookingDraft,
        openBookingModal,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        initialEnquiryType,
        openEnquiryModal,
        isVirtualTourOpen,
        virtualTourRoomId,
        openVirtualTour,
        closeVirtualTour,
        isAdminMode,
        setIsAdminMode,
        adminTab,
        setAdminTab,
        addBookingRequest,
        updateBookingStatus,
        deleteBookingRequest,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        updateRoom,
        addRoom,
        deleteRoom,
        toggleRoomActive,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        updateRestaurant,
        updateEvents,
        updateEvent,
        addEvent,
        deleteEvent,
        updatePolicies,
        updateContact,
        updateHomeCms,
        update3DSettings,
        resetToDefaults
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

export const useHotelContext = useHotel;

